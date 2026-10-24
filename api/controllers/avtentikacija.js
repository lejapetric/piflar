// api/controllers/avtentikacija.js
import Uporabnik from "../models/uporabnik.js";
import { nastaviPrijavo, pobrisiPrijavo } from "../utils/zeton.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_GESLO = 8;

// POST /api/registracija  { ime, email, geslo }
const registracija = async (req, res) => {
  const { ime, email, geslo } = req.body ?? {};
  if (typeof ime !== "string" || !ime.trim() || typeof email !== "string" || typeof geslo !== "string")
    return res.status(400).json({ message: "Izpolni vsa polja." });
  if (!EMAIL.test(email)) return res.status(400).json({ message: "E-naslov ni veljaven." });
  if (geslo.length < MIN_GESLO)
    return res.status(400).json({ message: `Geslo mora imeti vsaj ${MIN_GESLO} znakov.` });
  if (geslo.length > 200) return res.status(400).json({ message: "Geslo je predolgo." });

  const uporabnik = new Uporabnik({ ime, email });
  await uporabnik.nastaviGeslo(geslo);
  try {
    await uporabnik.save();
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Uporabnik s tem e-naslovom že obstaja." });
    throw err;
  }
  nastaviPrijavo(res, uporabnik);
  res.status(201).json(uporabnik);
};

// POST /api/prijava  { email, geslo }
const prijava = async (req, res) => {
  const { email, geslo } = req.body ?? {};
  if (typeof email !== "string" || typeof geslo !== "string")
    return res.status(400).json({ message: "Vpiši e-naslov in geslo." });
  const uporabnik = await Uporabnik.findOne({ email: email.toLowerCase().trim() }).select("+gesloHash");
  if (!uporabnik || !(await uporabnik.preveriGeslo(geslo)))
    return res.status(401).json({ message: "Napačen e-naslov ali geslo." });
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

export default { registracija, prijava, odjava, jaz };
