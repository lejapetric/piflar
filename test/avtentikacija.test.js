// Celoten potek registracija → prijava → dostop → odjava prek HTTP.
// Baza je nadomeščena s seznamom v pomnilniku (MongoDB v testih ni na voljo).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

process.env.JWT_SECRET = "testna-skrivnost";
const { default: app } = await import("../app.js");
const { default: Uporabnik } = await import("../api/models/uporabnik.js");
const { default: Napredek } = await import("../api/models/napredek.js");

const baza = [];
const zSelect = (v) => ({ select: () => v, then: (ok, err) => Promise.resolve(v).then(ok, err) });
Uporabnik.findOne = (q) => zSelect(baza.find((u) => u.email === q.email) ?? null);
Uporabnik.findById = async (id) => baza.find((u) => String(u._id) === id) ?? null;
Uporabnik.prototype.save = async function () {
  if (baza.some((u) => u.email === this.email)) throw Object.assign(new Error("dup"), { code: 11000 });
  baza.push(this);
  return this;
};
const napredek = [];
Napredek.updateOne = async (filter, posodobitev) => {
  let z = napredek.find((n) => String(n.uporabnik) === String(filter.uporabnik) && n.naloga === filter.naloga);
  if (!z) napredek.push((z = { ...filter, ...posodobitev.$setOnInsert, poskusi: 0, reseno: false }));
  z.poskusi += posodobitev.$inc?.poskusi ?? 0;
  Object.assign(z, posodobitev.$set);
  if (posodobitev.$min && !z.resenoOb) Object.assign(z, posodobitev.$min);
};
Napredek.find = (filter) => {
  const v = napredek.filter((n) => String(n.uporabnik) === String(filter.uporabnik) && (!filter.poglavje || n.poglavje === filter.poglavje));
  return { select: () => ({ lean: async () => v }) };
};
Object.defineProperty(mongoose.connection, "readyState", { get: () => 1, configurable: true });

let server, url;
before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  url = `http://localhost:${server.address().port}/api`;
});
after(() => server.close());

const post = (pot, body, piskotek) =>
  fetch(url + pot, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(piskotek && { cookie: piskotek }) },
    body: JSON.stringify(body),
  });
const get = (pot, piskotek) => fetch(url + pot, { headers: piskotek ? { cookie: piskotek } : {} });
const piskotekIz = (res) => res.headers.get("set-cookie")?.split(";")[0];

test("registracija, prijava, dostop glede na paket, odjava", async () => {
  assert.equal((await post("/registracija", { ime: "Ana", email: "ana@primer.si", geslo: "kratko" })).status, 400);

  const reg = await post("/registracija", { ime: "Ana", email: "Ana@Primer.si", geslo: "skrivnost123" });
  assert.equal(reg.status, 201);
  const telo = await reg.json();
  assert.equal(telo.email, "ana@primer.si");
  assert.equal(telo.gesloHash, undefined);
  assert.match(reg.headers.get("set-cookie"), /HttpOnly/i);

  assert.equal((await post("/registracija", { ime: "Ana", email: "ana@primer.si", geslo: "skrivnost123" })).status, 409);
  assert.equal((await post("/prijava", { email: "ana@primer.si", geslo: "napacno123" })).status, 401);

  const prijava = await post("/prijava", { email: "ana@primer.si", geslo: "skrivnost123" });
  assert.equal(prijava.status, 200);
  const piskotek = piskotekIz(prijava);

  assert.equal((await get("/jaz")).status, 401);
  assert.equal((await (await get("/jaz", piskotek)).json()).ime, "Ana");

  const zaklenjena = "/matura/primer-matematika-osnovna-2024-spomladanski";
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, false);
  baza[0].paket = "osnovni";
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, true);

  assert.equal((await get("/jaz", "piflar_zeton=ponarejen")).status, 401);

  // Napredek: gost ga nima, prijavljenemu se shranijo poskusi in rešene naloge
  assert.equal((await get("/napredek")).status, 401);
  await post("/naloge/mnozice-2/odgovor", { odgovor: "6" }, piskotek);
  await post("/naloge/mnozice-2/odgovor", { odgovor: "7" }, piskotek);
  await post("/naloge/mnozice-3/odgovor", { odgovor: "8" }); // gost: se ne shrani
  const zapisi = await (await get("/napredek?poglavje=mnozice", piskotek)).json();
  assert.equal(zapisi.length, 1);
  assert.equal(zapisi[0].naloga, "mnozice-2");
  assert.equal(zapisi[0].poskusi, 2);
  assert.equal(zapisi[0].reseno, true);

  const odjava = await post("/odjava", {}, piskotek);
  assert.equal(odjava.status, 204);
  assert.match(odjava.headers.get("set-cookie"), /piflar_zeton=;/);
});
