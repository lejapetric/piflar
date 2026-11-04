// api/controllers/matura.js
// Nerešene pole (besedilo, PDF) vidijo vsi. Rešitve so vidne pri zadnji rešeni
// poli vsakega predmeta in ravni, pri ostalih pa samo plačnikom tega predmeta.
import { matura } from "../data/index.js";
import { javneResenePole, lahkoVidiResitve, jeResena } from "../utils/dostop.js";

const javne = javneResenePole(matura);

// Vrstni red: novejša leta najprej, v letu predmaturitetni preizkus, nato spomladanski in jesenski rok
const ROKI = ["predmaturitetni", "spomladanski", "jesenski"];
const poVrsti = (a, b) => b.leto - a.leto || ROKI.indexOf(a.rok) - ROKI.indexOf(b.rok);
const razvrscene = [...matura].sort(poVrsti);

// Naloga lahko spada v več poglavij: "poglavje": "funkcije" ali ["funkcije", "diferencialni_racun"]
const poglavjaNaloge = (naloga) => [naloga.poglavje ?? []].flat();

function prikazNaloge({ razlaga, rezultat, ...naloga }, odklenjena) {
  return odklenjena ? { ...naloga, razlaga, rezultat } : naloga;
}

function prikazPole(pola, uporabnik, zNalogami) {
  const { naloge = [], ...podatki } = pola;
  const odklenjena = lahkoVidiResitve(uporabnik, pola, javne);
  const rezultat = { ...podatki, resena: jeResena(pola), odklenjena };
  if (zNalogami) rezultat.naloge = naloge.map((n) => prikazNaloge(n, odklenjena));
  return rezultat;
}

function filtriraj(pole, { predmet, raven, leto }) {
  if (predmet) pole = pole.filter((p) => p.predmet === predmet);
  if (raven) pole = pole.filter((p) => p.raven === raven);
  if (leto) pole = pole.filter((p) => String(p.leto) === String(leto));
  return pole;
}

// GET /api/matura?predmet=matematika&raven=osnovna&leto=2026&naloge=1
const maturaList = (req, res) => {
  const zNalogami = req.query.naloge === "1";
  const pole = filtriraj(razvrscene, req.query);
  res.status(200).json(pole.map((p) => prikazPole(p, req.uporabnik, zNalogami)));
};

// GET /api/matura/naloge?predmet=matematika&poglavje=diferencialni_racun,integralski_racun&raven=visja
// Naloge iz vseh pol, ki spadajo v izbrana poglavja (brez poglavja: vse naloge predmeta).
const maturaNaloge = (req, res) => {
  const izbrana = req.query.poglavje ? new Set(req.query.poglavje.split(",")) : null;
  const naloge = [];
  for (const pola of filtriraj(razvrscene, req.query)) {
    const odklenjena = lahkoVidiResitve(req.uporabnik, pola, javne);
    const vir = {
      id: pola.id, leto: pola.leto, rok: pola.rok, raven: pola.raven, stevilka: pola.stevilka,
      izvedba: pola.izvedba, pdf: pola.pdf ?? null, vir: pola.vir,
    };
    for (const naloga of pola.naloge ?? []) {
      if (izbrana && !poglavjaNaloge(naloga).some((p) => izbrana.has(p))) continue;
      // Naloga, ki potrebuje celotno izhodiščno besedilo (slovenščina, pola 2), dobi tudi prilogo pole
      const pola_ = naloga.priloga && pola.priloga ? { ...vir, priloga: pola.priloga } : vir;
      naloge.push({ ...prikazNaloge(naloga, odklenjena), resena: Boolean(naloga.razlaga), odklenjena, pola: pola_ });
    }
  }
  res.status(200).json(naloge);
};

// GET /api/matura/:maturaId
const maturaReadOne = (req, res) => {
  const pola = matura.find((p) => p.id === req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  res.status(200).json(prikazPole(pola, req.uporabnik, true));
};

export default { maturaList, maturaNaloge, maturaReadOne };
