// api/controllers/matura.js
import { matura } from "../data/index.js";

const findPola = (id) => matura.find((m) => m.id === id);

// GET /api/matura?raven=osnovna&tip=naloge
const maturaList = (req, res) => {
  const { raven, tip } = req.query;
  let result = matura;
  if (raven) result = result.filter((m) => m.raven === raven);
  if (tip) result = result.filter((m) => m.tip === tip);
  res.status(200).json(result);
};

// GET /api/matura/:maturaId
const maturaReadOne = (req, res) => {
  const pola = findPola(req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  res.status(200).json(pola);
};

// GET /api/matura/:maturaId/naloge?status=resene
const nalogeList = (req, res) => {
  const pola = findPola(req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  const naloge = pola.naloge ?? [];
  const { status } = req.query;
  res.status(200).json(status ? naloge.filter((n) => n.status === status) : naloge);
};

// GET /api/matura/:maturaId/naloge/:nalogaId
const nalogaReadOne = (req, res) => {
  const pola = findPola(req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  const naloga = (pola.naloge ?? []).find((n) => n.id === req.params.nalogaId);
  if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
  res.status(200).json(naloga);
};

export default { maturaList, maturaReadOne, nalogeList, nalogaReadOne };
