// api/utils/dostop.js
// Kdo sme videti kaj. Čiste funkcije brez baze, da jih lahko testiramo.
//
//   brezplacno (gost ali prijavljen): snov, interaktivne naloge, vse nerešene
//                 pole in zadnja rešena pola za vsak predmet in raven
//   osnovni:      vse za predmete v PAKET_OSNOVNI
//   premium:      vse za vse predmete
//
// ZAČASNO: dokler prijava in plačila ne delujejo, je zaklep izklopljen in vsi
// vidijo vse rešitve. Zaklep vklopiš z ZAKLEP=1 v .env (in ponovnim zagonom).

export const PREDMETI = ["matematika", "fizika", "anglescina", "slovenscina"];
export const PAKETI = ["brezplacno", "osnovni", "premium"];
export const PAKET_OSNOVNI = ["matematika", "anglescina", "slovenscina"];

function paketVeljaven(uporabnik, zdaj) {
  return !uporabnik.paketVelja || new Date(uporabnik.paketVelja) >= zdaj;
}

// Ali ima uporabnik plačan dostop do celotne vsebine predmeta?
export function imaPolniDostop(uporabnik, predmet, zdaj = new Date()) {
  if (!uporabnik || !paketVeljaven(uporabnik, zdaj)) return false;
  if (uporabnik.paket === "premium") return true;
  if (uporabnik.paket === "osnovni") return PAKET_OSNOVNI.includes(predmet);
  return false;
}

const jeResena = (pola) => (pola.naloge ?? []).some((n) => n.razlaga);
const ROK_RED = { predmaturitetni: -1, spomladanski: 0, jesenski: 1 };
const vrstniRed = (pola) => pola.leto * 10 + (ROK_RED[pola.rok] ?? 0);

// Id-ji rešenih pol, ki so javne: najnovejši rešeni rok za vsak predmet + raven
// (vse izpitne pole tega roka, npr. pola 1 in pola 2)
export function javneResenePole(pole) {
  const najnovejse = new Map();
  for (const pola of pole.filter(jeResena)) {
    const kljuc = `${pola.predmet}|${pola.raven}`;
    najnovejse.set(kljuc, Math.max(najnovejse.get(kljuc) ?? -Infinity, vrstniRed(pola)));
  }
  return new Set(
    pole.filter((p) => jeResena(p) && vrstniRed(p) === najnovejse.get(`${p.predmet}|${p.raven}`)).map((p) => p.id)
  );
}

// Ali je zaklep plačljivih rešitev vklopljen? Bere se ob vsakem klicu, da ga
// lahko testi vklopijo/izklopijo.
export const zaklepVklopljen = () => process.env.ZAKLEP === "1";

export function lahkoVidiResitve(uporabnik, pola, javne, zdaj = new Date()) {
  if (!zaklepVklopljen()) return true;
  return javne.has(pola.id) || imaPolniDostop(uporabnik, pola.predmet, zdaj);
}

export { jeResena };
