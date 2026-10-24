// Plačila: checkout, webhook (podpis, enkratno plačilo, naročnina). Stripe in baza sta nadomeščena.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

process.env.JWT_SECRET = "testna-skrivnost";
process.env.STRIPE_SECRET_KEY = "sk_test_nadomestek";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
process.env.STRIPE_CENA_OSNOVNI_MESECNO = "price_osnovni_mesecno";
process.env.STRIPE_CENA_PREMIUM_SOLSKO = "price_premium_solsko";

const { default: app } = await import("../app.js");
const { default: Uporabnik } = await import("../api/models/uporabnik.js");
const { stripeKlient, podaljsaj } = await import("../api/utils/placila.js");
const { nastaviPrijavo } = await import("../api/utils/zeton.js");

// --- nadomestna baza ---
const ana = new Uporabnik({ ime: "Ana", email: "ana@primer.si", gesloHash: "x" });
ana.obdelanaPlacila = [];
const baza = [ana];
const najdi = (f) => baza.find((u) => Object.entries(f).every(([k, v]) => String(u[k]) === String(v))) ?? null;
Uporabnik.findById = async (id) => najdi({ _id: id });
Uporabnik.findOne = async (f) => najdi(f);
Uporabnik.updateOne = async (f, u) => {
  const z = najdi({ _id: f._id });
  if (!z || (f.obdelanaPlacila?.$ne && z.obdelanaPlacila.includes(f.obdelanaPlacila.$ne))) return;
  Object.assign(z, u.$set);
  for (const [k, v] of Object.entries(u.$push ?? {})) z[k].push(v);
};
Object.defineProperty(mongoose.connection, "readyState", { get: () => 1, configurable: true });

// --- nadomestni Stripe ---
const stripe = stripeKlient();
const klici = [];
stripe.customers.create = async (p) => (klici.push(["kupec", p]), { id: "cus_ana" });
stripe.checkout.sessions.create = async (p) => (klici.push(["seja", p]), { url: "https://checkout.stripe.test/s" });

let server, url;
before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  url = `http://localhost:${server.address().port}/api`;
});
after(() => server.close());

function piskotek() {
  let c;
  nastaviPrijavo({ cookie: (k, v) => (c = `${k}=${v}`) }, ana);
  return c;
}

function posljiWebhook(dogodek, podpis) {
  const telo = JSON.stringify(dogodek);
  const header = podpis ?? stripe.webhooks.generateTestHeaderString({ payload: telo, secret: "whsec_test" });
  return fetch(`${url}/placila/webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "stripe-signature": header },
    body: telo,
  });
}

test("checkout zahteva prijavo, preveri paket in ustvari kupca", async () => {
  const post = (body, cookie) => fetch(`${url}/placila/checkout`, {
    method: "POST", headers: { "Content-Type": "application/json", ...(cookie && { cookie }) }, body: JSON.stringify(body),
  });
  assert.equal((await post({ paket: "osnovni", obdobje: "mesecno" })).status, 401);
  assert.equal((await post({ paket: "zlati", obdobje: "mesecno" }, piskotek())).status, 400);
  assert.equal((await post({ paket: "osnovni", obdobje: "letno" }, piskotek())).status, 400); // cena ni nastavljena

  const res = await post({ paket: "osnovni", obdobje: "mesecno" }, piskotek());
  assert.equal(res.status, 200);
  assert.equal((await res.json()).url, "https://checkout.stripe.test/s");
  assert.equal(ana.stripeKupec, "cus_ana");
  const seja = klici.find(([k]) => k === "seja")[1];
  assert.equal(seja.mode, "subscription");
  assert.equal(seja.customer, "cus_ana");
  assert.deepEqual(seja.line_items, [{ price: "price_osnovni_mesecno", quantity: 1 }]);
});

test("webhook zavrne napačen podpis", async () => {
  assert.equal((await posljiWebhook({ type: "invoice.paid" }, "t=1,v1=ponarejeno")).status, 400);
});

test("šolsko leto: +10 mesecev, ponovljen webhook se ne šteje dvakrat", async () => {
  const dogodek = {
    id: "evt_1", type: "checkout.session.completed",
    data: { object: { id: "cs_1", mode: "payment", payment_status: "paid",
      metadata: { uporabnik: String(ana._id), paket: "premium", obdobje: "solsko" } } },
  };
  assert.equal((await posljiWebhook(dogodek)).status, 200);
  const prvic = ana.paketVelja;
  assert.equal(ana.paket, "premium");
  assert.ok(Math.abs(prvic - podaljsaj(null, 10)) < 60_000);
  await posljiWebhook(dogodek);
  assert.equal(ana.paketVelja, prvic);
});

test("plačan račun naročnine nastavi paket do konca obdobja", async () => {
  ana.paket = "brezplacno";
  ana.paketVelja = undefined;
  const konec = Math.floor(Date.now() / 1000) + 30 * 24 * 3600;
  await posljiWebhook({
    id: "evt_2", type: "invoice.paid",
    data: { object: { customer: "cus_ana", lines: { data: [{
      period: { start: konec - 30 * 24 * 3600, end: konec },
      pricing: { type: "price_details", price_details: { price: "price_osnovni_mesecno", product: "prod_1" } },
    }] } } },
  });
  assert.equal(ana.paket, "osnovni");
  assert.equal(+ana.paketVelja, konec * 1000);
});
