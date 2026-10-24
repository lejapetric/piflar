// api/utils/dostop.js
// Kdo sme videti kaj. Čiste funkcije brez baze, da jih lahko testiramo.
//
//   brezplacno (gost ali prijavljen): vse nerešene pole + zadnja rešena pola
//                                     za vsak predmet in raven
//   osnovni  (plačnik):  vse za izbrane predmete (največ MAX_PREDMETOV)
//   premium:             vse za vse predmete

export const PREDMETI = ["matematika", "fizika"];
export const PAKETI = ["brezplacno", "osnovni", "premium"];
export const MAX_PREDMETOV = 3;

function paketVeljaven(uporabnik, zdaj) {
  return !uporabnik.paketVelja || new Date(uporabnik.paketVelja) >= zdaj;
}

// Ali ima uporabnik plačan dostop do celotne vsebine predmeta?
export function imaPolniDostop(uporabnik, predmet, zdaj = new Date()) {
  if (!uporabnik || !paketVeljaven(uporabnik, zdaj)) return false;
  if (uporabnik.paket === "premium") return true;
  if (uporabnik.paket === "osnovni") return (uporabnik.predmeti ?? []).includes(predmet);
  return false;
}

const jeResena = (pola) => (pola.naloge ?? []).some((n) => n.razlaga);
const vrstniRed = (pola) => pola.leto * 10 + (pola.rok === "jesenski" ? 1 : 0);

// Id-ji rešenih pol, ki so javne: najnovejša rešena pola za vsak predmet + raven
export function javneResenePole(pole) {
  const najnovejse = new Map();
  for (const pola of pole.filter(jeResena)) {
    const kljuc = `${pola.predmet}|${pola.raven}`;
    const trenutna = najnovejse.get(kljuc);
    if (!trenutna || vrstniRed(pola) > vrstniRed(trenutna)) najnovejse.set(kljuc, pola);
  }
  return new Set([...najnovejse.values()].map((p) => p.id));
}

export function lahkoVidiResitve(uporabnik, pola, javne, zdaj = new Date()) {
  return javne.has(pola.id) || imaPolniDostop(uporabnik, pola.predmet, zdaj);
}

export { jeResena };
