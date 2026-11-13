// api/controllers/naloge.js
// Pravilni odgovor in postopek ostaneta na strežniku: brskalnik dobi samo
// besedilo naloge, odgovor preveri strežnik, postopek pa pošlje na zahtevo.
import { naloge } from "../data/index.js";
import Napredek from "../models/napredek.js";
import { preveriOdgovor } from "../utils/preveri-odgovor.js";

// Brskalnik dobi besedilo, možnosti izbirne naloge in enoto, ne pa pravilnega odgovora
const javnaNaloga = ({ odgovor, rezultat, postopek, ...javno }) => ({
  ...javno,
  tipOdgovora: odgovor.tip,
  ...(odgovor.enota ? { enota: odgovor.enota } : {}),
});
const poId = new Map(naloge.map((n) => [n.id, n]));
const findNaloga = (id) => poId.get(id);

// GET /api/naloge?predmet=matematika&poglavje=mnozice&raven=osnovna  (od najlažjih do najtežjih)
const nalogeList = (req, res) => {
  const { predmet, poglavje, raven } = req.query;
  let result = naloge;
  if (predmet) result = result.filter((n) => n.predmet === predmet);
  if (poglavje) result = result.filter((n) => n.poglavje === poglavje);
  if (raven) result = result.filter((n) => n.raven === raven);
  res.status(200).json(result.map(javnaNaloga));
};

// GET /api/naloge/stevilo?predmet=fizika → { nihanje: 60, … }
const nalogeStevilo = (req, res) => {
  const stevilo = {};
  for (const n of naloge) {
    if (req.query.predmet && n.predmet !== req.query.predmet) continue;
    stevilo[n.poglavje] = (stevilo[n.poglavje] ?? 0) + 1;
  }
  res.status(200).json(stevilo);
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
  if (vnos.length > 500) return res.status(400).json({ message: "Odgovor je predolg." });
  const pravilno = preveriOdgovor(naloga.odgovor, vnos);
  if (req.uporabnik) await Napredek.zabeleziPoskus(req.uporabnik._id, naloga, pravilno);
  res.status(200).json({ pravilno });
};

// GET /api/naloge/:id/postopek  (?samo=rezultat: samo rezultat, ne šteje kot ogled postopka)
const nalogaPostopek = async (req, res) => {
  const naloga = findNaloga(req.params.id);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  if (req.query.samo === "rezultat") return res.status(200).json({ rezultat: naloga.rezultat });
  if (req.uporabnik) await Napredek.zabeleziPostopek(req.uporabnik._id, naloga);
  res.status(200).json({ rezultat: naloga.rezultat, postopek: naloga.postopek });
};

export default { nalogeList, nalogeStevilo, nalogaReadOne, nalogaPreveri, nalogaPostopek };
