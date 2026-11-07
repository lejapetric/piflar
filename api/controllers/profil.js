// api/controllers/profil.js
// Urejanje profila, nastavitev, sprememba gesla in izbris računa prijavljenega uporabnika.
import Uporabnik, { TIPI_SOL, RAVNI } from "../models/uporabnik.js";
import Napredek from "../models/napredek.js";
import { napakaGesla } from "./avtentikacija.js";
import { pobrisiPrijavo } from "../utils/zeton.js";

const SLIKA = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const MAX_SLIKA = 120_000;

class Napaka extends Error {
  status = 400;
}

const besedilo = (v, ime, max = 100, obvezno = false) => {
  if (typeof v !== "string") throw new Napaka(`${ime} ni veljavno.`);
  const t = v.trim();
  if (obvezno && !t) throw new Napaka(`${ime} je obvezno.`);
  if (t.length > max) throw new Napaka(`${ime} je predolgo.`);
  return t;
};

// Prazno ("" ali null) pobriše podatek
const celo = (v, ime, min, max) => {
  if (v === "" || v === null) return undefined;
  const n = Number(v);
  if (!Number.isInteger(n) || n < min || n > max) throw new Napaka(`${ime} ni veljavna vrednost.`);
  return n;
};

const izbira = (v, ime, mozne) => {
  if (v === "" || v === null) return undefined;
  if (!mozne.includes(v)) throw new Napaka(`${ime} ni veljavna izbira.`);
  return v;
};

// PATCH /api/jaz  { ime?, priimek?, starost?, sola?, tipSole?, letnik?, letoMature?,
//                   ravenMatematike?, slika?, nastavitve?: { novice?, opomniki? } }
const posodobi = async (req, res) => {
  const p = req.body ?? {};
  const u = req.uporabnik;
  try {
    if ("ime" in p) u.ime = besedilo(p.ime, "Ime", 100, true);
    if ("priimek" in p) u.priimek = besedilo(p.priimek, "Priimek", 100, true);
    if ("sola" in p) u.sola = besedilo(p.sola, "Šola", 120);
    if ("starost" in p) u.starost = celo(p.starost, "Starost", 10, 120);
    if ("letnik" in p) u.letnik = celo(p.letnik, "Letnik", 1, 4);
    if ("letoMature" in p) u.letoMature = celo(p.letoMature, "Leto mature", 2000, 2100);
    if ("tipSole" in p) u.tipSole = izbira(p.tipSole, "Tip šole", TIPI_SOL) ?? "gimnazija";
    if ("ravenMatematike" in p) u.ravenMatematike = izbira(p.ravenMatematike, "Raven matematike", RAVNI);
    if ("slika" in p) {
      if (p.slika === null || p.slika === "") u.slika = undefined;
      else if (typeof p.slika !== "string" || !SLIKA.test(p.slika) || p.slika.length > MAX_SLIKA)
        throw new Napaka("Slika mora biti JPG, PNG ali WEBP in manjša od 90 KB.");
      else u.slika = p.slika;
    }
    if (p.nastavitve && typeof p.nastavitve === "object") {
      for (const k of ["novice", "opomniki"])
        if (typeof p.nastavitve[k] === "boolean") u.nastavitve[k] = p.nastavitve[k];
    }
  } catch (err) {
    if (err instanceof Napaka) return res.status(400).json({ message: err.message });
    throw err;
  }
  await u.save();
  res.status(200).json(u);
};

// POST /api/jaz/geslo  { staro, novo }
const spremeniGeslo = async (req, res) => {
  const { staro, novo } = req.body ?? {};
  const u = await Uporabnik.findById(req.uporabnik._id).select("+gesloHash");
  if (typeof staro !== "string" || !(await u.preveriGeslo(staro)))
    return res.status(400).json({ message: "Trenutno geslo ni pravilno." });
  const napaka = napakaGesla(novo);
  if (napaka) return res.status(400).json({ message: napaka });
  await u.nastaviGeslo(novo);
  await u.save();
  res.status(200).json({ message: "Geslo je spremenjeno." });
};

// DELETE /api/jaz  { geslo }  → izbriše račun in napredek
const izbrisi = async (req, res) => {
  const { geslo } = req.body ?? {};
  const u = await Uporabnik.findById(req.uporabnik._id).select("+gesloHash");
  if (typeof geslo !== "string" || !(await u.preveriGeslo(geslo)))
    return res.status(400).json({ message: "Geslo ni pravilno." });
  await Napredek.deleteMany({ uporabnik: u._id });
  await Uporabnik.deleteOne({ _id: u._id });
  pobrisiPrijavo(res);
  res.status(204).end();
};

export default { posodobi, spremeniGeslo, izbrisi };
