// api/controllers/placila.js
import Uporabnik from "../models/uporabnik.js";
import {
  stripeKlient, cenaId, paketZaCeno, podaljsaj, kasnejsi, OBDOBJA, PLACLJIVI_PAKETI,
} from "../utils/placila.js";

const javniUrl = (req) => process.env.JAVNI_URL || `${req.protocol}://${req.get("host")}`;

function zahtevajStripe(res) {
  const stripe = stripeKlient();
  if (!stripe) res.status(503).json({ message: "Plačila trenutno niso na voljo." });
  return stripe;
}

// GET /api/placila/cenik  → { osnovni: { mesecno: { znesek, valuta }, ... }, premium: { ... } }
let cenik = null;
let cenikOb = 0;
const CENIK_TTL = 60 * 60 * 1000;

const cenikGet = async (req, res) => {
  const stripe = zahtevajStripe(res);
  if (!stripe) return;
  if (!cenik || Date.now() - cenikOb > CENIK_TTL) {
    const nov = {};
    for (const paket of PLACLJIVI_PAKETI) {
      nov[paket] = {};
      for (const [obdobje, { naziv }] of Object.entries(OBDOBJA)) {
        const id = cenaId(paket, obdobje);
        if (!id) continue;
        const cena = await stripe.prices.retrieve(id);
        nov[paket][obdobje] = { naziv, znesek: cena.unit_amount / 100, valuta: cena.currency };
      }
    }
    cenik = nov;
    cenikOb = Date.now();
  }
  res.status(200).json(cenik);
};

// POST /api/placila/checkout  { paket, obdobje }  → { url } na Stripe Checkout
const checkout = async (req, res) => {
  const stripe = zahtevajStripe(res);
  if (!stripe) return;
  const { paket, obdobje } = req.body ?? {};
  if (!PLACLJIVI_PAKETI.includes(paket) || !Object.hasOwn(OBDOBJA, obdobje))
    return res.status(400).json({ message: "Neznan paket ali obdobje." });
  const cena = cenaId(paket, obdobje);
  if (!cena) return res.status(400).json({ message: "Ta paket še ni na voljo." });

  // Kupca ustvarimo vnaprej, da lahko vse kasnejše račune povežemo z uporabnikom
  const uporabnik = req.uporabnik;
  if (!uporabnik.stripeKupec) {
    const kupec = await stripe.customers.create({
      email: uporabnik.email,
      name: uporabnik.ime,
      metadata: { uporabnik: String(uporabnik._id) },
    });
    uporabnik.stripeKupec = kupec.id;
    await Uporabnik.updateOne({ _id: uporabnik._id }, { $set: { stripeKupec: kupec.id } });
  }

  const url = javniUrl(req);
  const seja = await stripe.checkout.sessions.create({
    mode: OBDOBJA[obdobje].narocnina ? "subscription" : "payment",
    customer: uporabnik.stripeKupec,
    client_reference_id: String(uporabnik._id),
    line_items: [{ price: cena, quantity: 1 }],
    metadata: { uporabnik: String(uporabnik._id), paket, obdobje },
    locale: "auto",
    success_url: `${url}/narocnina.html?uspeh=1`,
    cancel_url: `${url}/narocnina.html`,
  });
  res.status(200).json({ url: seja.url });
};

// POST /api/placila/portal  → { url } na Stripe portal (preklic, kartica, računi)
const portal = async (req, res) => {
  const stripe = zahtevajStripe(res);
  if (!stripe) return;
  if (!req.uporabnik.stripeKupec)
    return res.status(400).json({ message: "Nimaš še nobenega plačila." });
  const seja = await stripe.billingPortal.sessions.create({
    customer: req.uporabnik.stripeKupec,
    return_url: `${javniUrl(req)}/narocnina.html`,
  });
  res.status(200).json({ url: seja.url });
};

// Enkratno plačilo (šolsko leto): +10 mesecev, vsako plačilo samo enkrat
async function obdelajEnkratnoPlacilo(seja) {
  const { uporabnik: id, paket, obdobje } = seja.metadata ?? {};
  const meseci = OBDOBJA[obdobje]?.meseci;
  if (!id || !PLACLJIVI_PAKETI.includes(paket) || !meseci) return;
  const uporabnik = await Uporabnik.findById(id);
  if (!uporabnik) return;
  await Uporabnik.updateOne(
    { _id: uporabnik._id, obdelanaPlacila: { $ne: seja.id } },
    {
      $set: { paket, paketVelja: podaljsaj(uporabnik.paketVelja, meseci) },
      $push: { obdelanaPlacila: seja.id },
    }
  );
}

// Plačan račun naročnine (prvi in vsak naslednji): dostop do konca obdobja računa
async function obdelajRacun(racun) {
  const uporabnik = await Uporabnik.findOne({ stripeKupec: racun.customer });
  const vrstica = racun.lines?.data?.[0];
  const placano = paketZaCeno(vrstica?.pricing?.price_details?.price);
  if (!uporabnik || !placano || !vrstica?.period?.end) return;
  const konec = new Date(vrstica.period.end * 1000);
  await Uporabnik.updateOne(
    { _id: uporabnik._id },
    { $set: { paket: placano.paket, paketVelja: kasnejsi(uporabnik.paketVelja, konec) } }
  );
}

// POST /api/placila/webhook  (Stripe kliče ta naslov; telo mora ostati surovo za podpis)
const webhook = async (req, res) => {
  const stripe = zahtevajStripe(res);
  if (!stripe) return;
  let dogodek;
  try {
    dogodek = stripe.webhooks.constructEvent(
      req.body, req.get("stripe-signature"), process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return res.status(400).json({ message: "Neveljaven podpis." });
  }

  const objekt = dogodek.data.object;
  if (dogodek.type === "checkout.session.completed" && objekt.mode === "payment" && objekt.payment_status === "paid")
    await obdelajEnkratnoPlacilo(objekt);
  else if (dogodek.type === "invoice.paid")
    await obdelajRacun(objekt);

  res.status(200).json({ prejeto: true });
};

export default { cenikGet, checkout, portal, webhook };
