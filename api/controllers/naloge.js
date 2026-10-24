// api/controllers/naloge.js
// Pravilni odgovor in postopek ostaneta na strežniku: brskalnik dobi samo
// besedilo naloge, odgovor preveri strežnik, postopek pa pošlje na zahtevo.
import { naloge } from "../data/index.js";
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
const nalogaPreveri = (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  const vnos = req.body?.odgovor;
  if (typeof vnos !== "string" || vnos.trim() === "")
    return res.status(400).json({ message: "Vpiši odgovor." });
  if (vnos.length > 200) return res.status(400).json({ message: "Odgovor je predolg." });
  res.status(200).json({ pravilno: preveriOdgovor(naloga.odgovor, vnos) });
};

// GET /api/naloge/:id/postopek
const nalogaPostopek = (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  res.status(200).json({ rezultat: naloga.rezultat, postopek: naloga.postopek });
};

export default { nalogeList, nalogaReadOne, nalogaPreveri, nalogaPostopek };
