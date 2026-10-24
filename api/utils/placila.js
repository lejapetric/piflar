// api/utils/placila.js
// Stripe: cene so nastavljene v Stripe nadzorni plošči, tukaj so samo njihovi id-ji (iz .env).
import Stripe from "stripe";

export const PLACLJIVI_PAKETI = ["osnovni", "premium"];

// mesecno in letno sta naročnini (Stripe ju obnavlja sam),
// solsko je enkratno plačilo za 10 mesecev dostopa.
export const OBDOBJA = {
  mesecno: { naziv: "Mesečno", narocnina: true },
  letno: { naziv: "Letno", narocnina: true },
  solsko: { naziv: "Šolsko leto (10 mesecev)", narocnina: false, meseci: 10 },
};

let klient = null;
export function stripeKlient() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  klient ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return klient;
}

// STRIPE_CENA_OSNOVNI_MESECNO, STRIPE_CENA_PREMIUM_SOLSKO, ...
export function cenaId(paket, obdobje) {
  return process.env[`STRIPE_CENA_${paket.toUpperCase()}_${obdobje.toUpperCase()}`] || null;
}

// Obratno: iz id-ja cene na računu ugotovi paket in obdobje
export function paketZaCeno(id) {
  for (const paket of PLACLJIVI_PAKETI) {
    for (const obdobje of Object.keys(OBDOBJA)) {
      if (id && cenaId(paket, obdobje) === id) return { paket, obdobje };
    }
  }
  return null;
}

// Podaljša dostop za n mesecev od danes ali od konca veljavnega paketa, če je kasnejši
export function podaljsaj(paketVelja, meseci, zdaj = new Date()) {
  const zacetek = paketVelja && new Date(paketVelja) > zdaj ? new Date(paketVelja) : new Date(zdaj);
  const konec = new Date(zacetek);
  konec.setMonth(konec.getMonth() + meseci);
  return konec;
}

export const kasnejsi = (a, b) => (!a ? b : !b ? a : new Date(Math.max(new Date(a), new Date(b))));
