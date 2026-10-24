// api/controllers/naloge.js
// Pravilni odgovor in postopek ostaneta na strežniku: brskalnik dobi samo
// besedilo naloge, odgovor preveri strežnik, postopek pa pošlje na zahtevo.
import { naloge } from "../data/index.js";
import Napredek from "../models/napredek.js";
import { preveriOdgovor } from "../utils/preveri-odgovor.js";

const javnaNaloga = ({ odgovor, rezultat, postopek, ...javno }) => javno;
const findNaloga = (id) => naloge.find((n) => n.id === id);

// GET /api/naloge?poglavje=mnozice&raven=osnovna
const nalogeList = (req, res) => {
  const { poglavje, raven } = req.query;
  let result = naloge;
  if (poglavje) result = result.filter((n) => n.poglavje === poglavje);
  if (raven) result = result.filter((n) => n.raven === raven);
  res.status(200).json(result.map(javnaNaloga));
};

// GET /api/naloge/:id
const nalogaReadOne = (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  res.status(200).json(javnaNaloga(naloga));
};

// POST /api/naloge/:id/odgovor  { "odgovor": "7" }
// Prijavljenemu uporabniku se poskus shrani v napredek.
const nalogaPreveri = async (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  const vnos = req.body?.odgovor;
  if (typeof vnos !== "string" || vnos.trim() === "")
    return res.status(400).json({ message: "Vpiši odgovor." });
  if (vnos.length > 200) return res.status(400).json({ message: "Odgovor je predolg." });
  const pravilno = preveriOdgovor(naloga.odgovor, vnos);
  if (req.uporabnik) await Napredek.zabeleziPoskus(req.uporabnik._id, naloga, pravilno);
  res.status(200).json({ pravilno });
};

// GET /api/naloge/:id/postopek
const nalogaPostopek = async (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  if (req.uporabnik) await Napredek.zabeleziPostopek(req.uporabnik._id, naloga);
  res.status(200).json({ rezultat: naloga.rezultat, postopek: naloga.postopek });
};

// GET /api/napredek?poglavje=mnozice  (samo prijavljeni)
const napredekList = async (req, res) => {
  const filter = { uporabnik: req.uporabnik._id };
  if (req.query.poglavje) filter.poglavje = String(req.query.poglavje);
  const zapisi = await Napredek.find(filter).select("-_id naloga poglavje poskusi reseno resenoOb postopekOgledan").lean();
  res.status(200).json(zapisi);
};

export default { nalogeList, nalogaReadOne, nalogaPreveri, nalogaPostopek, napredekList };
