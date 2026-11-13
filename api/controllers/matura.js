// api/controllers/matura.js
// Nerešene pole (besedilo, PDF) vidijo vsi. Rešitve so vidne pri zadnji rešeni
// poli vsakega predmeta in ravni, pri ostalih pa samo plačnikom tega predmeta.
import { matura } from "../data/index.js";
import { javneResenePole, lahkoVidiResitve, jeResena } from "../utils/dostop.js";
import { oblikaOdgovora, preveriMaturitetni } from "../utils/matura-odgovor.js";
import Napredek from "../models/napredek.js";

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
      naloge.push({
        ...prikazNaloge(naloga, odklenjena), resena: Boolean(naloga.razlaga), odklenjena, pola: pola_,
        odgovor: naloga.rezultat ? oblikaOdgovora(naloga, pola.predmet) : null,
      });
    }
  }
  res.status(200).json(naloge);
};

// GET /api/matura/stevilo?predmet=fizika → { nihanje: 42, … }
// Koliko maturitetnih nalog je v vsakem poglavju (za povezavo na straneh z razlago).
const maturaStevilo = (req, res) => {
  const stevilo = {};
  for (const pola of filtriraj(razvrscene, req.query)) {
    for (const naloga of pola.naloge ?? []) {
      for (const slug of new Set(poglavjaNaloge(naloga))) stevilo[slug] = (stevilo[slug] ?? 0) + 1;
    }
  }
  res.status(200).json(stevilo);
};

// POST /api/matura/odgovor  { "pola": "fizika-2025-spomladanski-1", "naloga": "26", "odgovor": "B" }
// Izbirna naloga: odgovor je črka (ali seznam črk). Ostale: seznam odgovorov po delih (2.1., 2.2. …).
// Številske dele preveri strežnik, pri ostalih vrne rešitev dela, da jo dijak primerja s svojo.
// Prijavljenemu se poskus shrani v napredek, ko je jasno, ali je uspešen: vse pravilno ali
// vsaj en samodejno preverjen del napačen. Če mora dele primerjati sam, se ne shrani.
const maturaOdgovor = async (req, res) => {
  const { pola: polaId, naloga: nalogaId, odgovor } = req.body ?? {};
  const pola = matura.find((p) => p.id === polaId);
  const naloga = pola?.naloge?.find((n) => n.id === String(nalogaId));
  if (!naloga || !naloga.rezultat) return res.status(404).json({ message: "Naloga ne obstaja." });
  if (!lahkoVidiResitve(req.uporabnik, pola, javne))
    return res.status(403).json({ message: "Rešitve te pole so na voljo s paketom." });
  const vneseni = [odgovor ?? []].flat();
  if (vneseni.length > 30 || vneseni.some((v) => typeof v !== "string" || v.length > 2000))
    return res.status(400).json({ message: "Odgovor ni veljaven." });
  if (vneseni.every((v) => v.trim() === "")) return res.status(400).json({ message: "Vpiši ali izberi odgovor." });
  const rezultat = preveriMaturitetni(naloga, pola.predmet, odgovor);
  const uspeh = rezultat.pravilno ?? (rezultat.deli?.some((d) => d.pravilno === false) ? false : null);
  if (req.uporabnik && uspeh !== null) {
    const zapis = { id: `${pola.id}-${naloga.id}`, vir: "matura", predmet: pola.predmet, poglavje: naloga.poglavje };
    if ([zapis.poglavje ?? []].flat().length) await Napredek.zabeleziPoskus(req.uporabnik._id, zapis, uspeh);
  }
  res.status(200).json(rezultat);
};

// GET /api/matura/:maturaId
const maturaReadOne = (req, res) => {
  const pola = matura.find((p) => p.id === req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  res.status(200).json(prikazPole(pola, req.uporabnik, true));
};

export default { maturaList, maturaNaloge, maturaStevilo, maturaOdgovor, maturaReadOne };
