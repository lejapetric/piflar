// api/controllers/avtentikacija.js
import crypto from "node:crypto";
import Uporabnik from "../models/uporabnik.js";
import { nastaviPrijavo, pobrisiPrijavo } from "../utils/zeton.js";
import { posljiPotrditev } from "../utils/eposta.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POTRDITEV_VELJA_MS = 24 * 60 * 60 * 1000;

// Geslo: vsaj 8 znakov, vsaj ena velika črka in vsaj ena številka.
export function napakaGesla(geslo) {
  if (typeof geslo !== "string" || geslo.length < 8) return "Geslo mora imeti vsaj 8 znakov.";
  if (geslo.length > 200) return "Geslo je predolgo.";
  if (!/\p{Lu}/u.test(geslo)) return "Geslo mora vsebovati vsaj eno veliko tiskano črko.";
  if (!/\d/.test(geslo)) return "Geslo mora vsebovati vsaj eno številko.";
  return null;
}

const javniUrl = (req) => process.env.JAVNI_URL || `${req.protocol}://${req.get("host")}`;
const hash = (zeton) => crypto.createHash("sha256").update(zeton).digest("hex");

// Shrani nov žeton in pošlje e-pošto. Napaka pri pošiljanju (npr. Resend zavrne pošiljatelja)
// ne podre registracije: izpiše se v konzolo strežnika skupaj s povezavo, vrne pa false.
async function posljiNovoPotrditev(req, uporabnik) {
  const zeton = crypto.randomBytes(32).toString("base64url");
  uporabnik.potrditevHash = hash(zeton);
  uporabnik.potrditevVelja = new Date(Date.now() + POTRDITEV_VELJA_MS);
  await uporabnik.save();
  const povezava = `${javniUrl(req)}/potrdi.html?zeton=${zeton}`;
  try {
    return await posljiPotrditev(uporabnik, povezava);
  } catch (err) {
    console.error(
      `E-pošte za potrditev (${uporabnik.email}) ni bilo mogoče poslati: ${err.message}\n` +
        `Povezava za potrditev: ${povezava}`
    );
    return false;
  }
}

// POST /api/registracija  { ime, priimek, starost?, email, geslo }
// Račun se ustvari nepotrjen; prijava je mogoča šele po kliku na povezavo v e-pošti.
// Če nepotrjen račun s tem e-naslovom že obstaja, se podatki in geslo prepišejo in
// pošlje se nova povezava (npr. ko prva e-pošta ni prišla).
const registracija = async (req, res) => {
  const { ime, priimek, starost, email, geslo } = req.body ?? {};
  if ([ime, priimek, email].some((v) => typeof v !== "string" || !v.trim()))
    return res.status(400).json({ message: "Izpolni ime, priimek, e-naslov in geslo." });
  if (!EMAIL.test(email)) return res.status(400).json({ message: "E-naslov ni veljaven." });
  const napaka = napakaGesla(geslo);
  if (napaka) return res.status(400).json({ message: napaka });
  let leta;
  if (starost !== undefined && starost !== null && starost !== "") {
    leta = Number(starost);
    if (!Number.isInteger(leta) || leta < 10 || leta > 120)
      return res.status(400).json({ message: "Starost ni veljavna." });
  }

  const obstojec = await Uporabnik.findOne({ email: email.toLowerCase().trim() });
  if (obstojec && obstojec.emailPotrjen !== false)
    return res.status(409).json({ message: "Uporabnik s tem e-naslovom že obstaja." });
  const uporabnik = obstojec ?? new Uporabnik({ email, emailPotrjen: false });
  Object.assign(uporabnik, { ime, priimek, starost: leta });
  await uporabnik.nastaviGeslo(geslo);
  let poslano;
  try {
    poslano = await posljiNovoPotrditev(req, uporabnik);
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Uporabnik s tem e-naslovom že obstaja." });
    throw err;
  }
  res.status(201).json({ email: uporabnik.email, potrditev: true, poslano });
};

// POST /api/potrdi-email  { zeton }  → potrdi e-naslov in prijavi uporabnika
const potrdiEmail = async (req, res) => {
  const { zeton } = req.body ?? {};
  if (typeof zeton !== "string" || zeton.length < 20 || zeton.length > 100)
    return res.status(400).json({ message: "Povezava ni veljavna." });
  const uporabnik = await Uporabnik.findOne({ potrditevHash: hash(zeton) }).select("+potrditevVelja");
  if (!uporabnik || !(uporabnik.potrditevVelja > new Date()))
    return res.status(400).json({ message: "Povezava ni veljavna ali je potekla. Zahtevaj novo." });
  uporabnik.emailPotrjen = true;
  uporabnik.potrditevHash = undefined;
  uporabnik.potrditevVelja = undefined;
  await uporabnik.save();
  nastaviPrijavo(res, uporabnik);
  res.status(200).json(uporabnik);
};

// POST /api/potrdi-email/ponovno  { email }  → nova povezava (odgovor je vedno enak,
// da se ne da ugotoviti, kateri e-naslovi imajo račun)
const ponovnoPotrditev = async (req, res) => {
  const { email } = req.body ?? {};
  if (typeof email === "string" && EMAIL.test(email)) {
    const uporabnik = await Uporabnik.findOne({ email: email.toLowerCase().trim() });
    if (uporabnik && uporabnik.emailPotrjen === false) await posljiNovoPotrditev(req, uporabnik);
  }
  res.status(200).json({ message: "Če račun čaka na potrditev, smo ti poslali novo povezavo." });
};

// POST /api/prijava  { email, geslo }
const prijava = async (req, res) => {
  const { email, geslo } = req.body ?? {};
  if (typeof email !== "string" || typeof geslo !== "string")
    return res.status(400).json({ message: "Vpiši e-naslov in geslo." });
  const uporabnik = await Uporabnik.findOne({ email: email.toLowerCase().trim() }).select("+gesloHash");
  if (!uporabnik || !(await uporabnik.preveriGeslo(geslo)))
    return res.status(401).json({ message: "Napačen e-naslov ali geslo." });
  if (uporabnik.emailPotrjen === false)
    return res.status(403).json({
      message: "E-naslov še ni potrjen. Klikni na povezavo, ki smo ti jo poslali po e-pošti.",
      potrditev: true,
    });
  nastaviPrijavo(res, uporabnik);
  res.status(200).json(uporabnik);
};

// POST /api/odjava
const odjava = (req, res) => {
  pobrisiPrijavo(res);
  res.status(204).end();
};

// GET /api/jaz
const jaz = (req, res) => {
  res.status(200).json(req.uporabnik);
};

export default { registracija, potrdiEmail, ponovnoPotrditev, prijava, odjava, jaz };
