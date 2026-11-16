// Poklicna matura, matematika: naloge za vajo po snoveh poklicne mature.
// Snov poklicne mature je podmnožica osnovne ravni splošne mature, zato vsaka snov vzame
// izbrane predloge (serije) iz tools/vaje/matematika/<slug>.mjs, z lastnimi naključnimi podatki
// (seme poklicna_matematika-…), zato besedila niso enaka kot pri splošni maturi.
// Serija se ponovi tolikokrat, da ima snov vsaj 60 nalog. Vse naloge so na eni ravni.
import { rng } from "../lib.mjs";

const SNOVI = {
  stevila_deljivost: { stevilske_mnozice: ["cela", "Dv", "besedilna-Dv", "delitelji", "stevka", "ostanki", "iz-Dv"] },
  izrazi_potence: {
    potence_koreni: ["eksponent", "negativni", "znanstveni"],
    algebrski_izrazi_enacbe_neenacbe: ["vrednost", "kvadrat", "razstavi", "krajsanje"],
  },
  ulomki_odstotki: { stevilske_mnozice: ["ulomki", "periodicne", "procenti"] },
  realna_stevila_koreni: { potence_koreni: ["delno", "racionalizacija", "racionalni", "xn", "abs"], mnozice: ["intervali"] },
  geometrija_ravnine: { geometrija_ravnina_prostor: ["koti", "minute", "trikotnik-koti", "veckotnik", "obstaja", "vrsta", "podobnost", "merilo", "obodni", "tetiva"] },
  trikotnik_kotne: { geometrija_ravnina_prostor: ["pitagora", "evklid", "sinusni", "kosinusni"], funkcije: ["kot-pitagora"] },
  obsegi_ploscine: { geometrijski_liki_telesa: ["trikotnik", "stirikotnik", "krog", "vcrtan"] },
  povrsine_prostornine: { geometrijski_liki_telesa: ["kvader", "valj", "piramida", "stozec", "krogla", "enote", "koti-telesa"] },
  linearna_funkcija: {
    funkcije: ["lin-vrednost", "lin-nicla", "lin-skozi-tocki", "lin-narasca", "lin-presecisce", "lin-vzporedna", "lin-pravokotna"],
    pravokotni_koordinatni_sistem_ravnina: ["kvadrant", "razdalja", "razpolovisce"],
    algebrski_izrazi_enacbe_neenacbe: ["linearna", "besedilna", "neenacba", "sistem"],
  },
  kvadratna_funkcija: {
    funkcije: ["kv-teme", "kv-nicle", "kv-diskriminanta", "kv-zaloga", "kv-neenacba", "kv-skozi-tocke"],
    algebrski_izrazi_enacbe_neenacbe: ["razcepna"],
  },
  polinomi_racionalna: { funkcije: ["pol-ostanek", "pol-nicle", "pol-stopnja", "rac-asimptota", "rac-nicla"] },
  eksponentna_logaritemska: { funkcije: ["eks-enacba", "eks-ulomek", "log-vrednost", "log-pravila", "log-enacba", "eks-rast", "eks-log-cas", "log-definicijsko"] },
  kotne_funkcije_pm: { funkcije: ["kot-vrednost", "kot-radiani", "kot-perioda", "kot-amplituda", "kot-pitagora", "kot-enacba"] },
  zaporedja_pm: { zaporedja_vrste: ["clen-formula", "rekurzivno", "monotonost", "ar-clen", "ar-iz-clenov", "ar-vsota", "ar-katero", "ar-besedilna", "ar-vsota-stevil", "geo-clen", "geo-kolicnik", "geo-vsota", "geo-obresti", "geo-trije", "ar-trije"] },
  statistika_pm: { statistika: ["povprecje", "mediana", "modus", "razpon", "frekvence", "relativna", "krozni", "manjkajoci", "dodaj", "pojmi"] },
  odvod_pm: { diferencialni_racun: ["potenca", "polinom-v-tocki", "elementarne", "produkt", "verizno", "kvocient", "tangenta", "kot-tangente", "stacionarne", "narascanje", "optimizacija"] },
  kombinatorika_verjetnost: {
    kombinatorika: ["fakulteta", "produkt", "permutacije", "variacije", "variacije-ponav", "kombinacije", "izbira-tipa", "pogoj", "stevila"],
    verjetnostni_racun: ["kocka", "dve-kocki", "kroglice", "dve-kroglici", "nasprotni", "vsota", "kovanci", "loterija"],
  },
};
const NAJMANJ = 60;

// Zbere serije enega modula splošne mature: { ime: [n, predloga] }
async function serijeModula(modul) {
  const { default: gradi } = await import(new URL(`../matematika/${modul}.mjs`, import.meta.url));
  const serije = {};
  const nic = () => {};
  await gradi({ z: { dodaj: nic }, slug: modul, serija: (ime, n, predloga) => { serije[ime] = [n, predloga]; }, r: rng(modul), vprasanja: nic, pojmi: nic });
  return serije;
}

export default async function (z) {
  const moduli = {};
  for (const [slug, viri] of Object.entries(SNOVI)) {
    const izbrane = [];
    for (const [modul, imena] of Object.entries(viri)) {
      moduli[modul] ??= await serijeModula(modul);
      for (const ime of imena) {
        if (!moduli[modul][ime]) throw new Error(`${modul}: serija ${ime} ne obstaja`);
        izbrane.push([modul, ime, ...moduli[modul][ime]]);
      }
    }
    const skupaj = izbrane.reduce((s, x) => s + x[2], 0);
    const krat = Math.max(1, Math.ceil(NAJMANJ / skupaj));
    const videne = new Set();
    for (const [modul, ime, n, predloga] of izbrane) {
      const r = rng(`poklicna_matematika-${slug}-${modul}-${ime}`);
      let dodanih = 0;
      const cilj = n * krat;
      for (let poskus = 0; dodanih < cilj && poskus < cilj * 20; poskus++) {
        // nekatere serije so seznami z n elementi (predloga(r, i) bere i-ti element): ko se
        // seznam izteče, serija konča
        let naloga;
        try {
          naloga = predloga(r, dodanih);
        } catch {
          break;
        }
        if (!naloga || videne.has(naloga.besedilo)) continue;
        videne.add(naloga.besedilo);
        z.dodaj(slug, { ...naloga, raven: "osnovna" });
        dodanih++;
      }
    }
  }
}
