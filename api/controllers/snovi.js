// api/controllers/snovi.js
import { snovi } from "../data/index.js";

// GET /api/snovi?predmet=matematika
const snoviList = (req, res) => {
  const { predmet } = req.query;
  res.status(200).json(predmet ? snovi.filter((s) => s.predmet === predmet) : snovi);
};

// GET /api/snovi/:slug
const snovReadOne = (req, res) => {
  const snov = snovi.find((s) => s.slug === req.params.slug);
  if (!snov) return res.status(404).json({ message: "Snov ne obstaja." });
  res.status(200).json(snov);
};

export default { snoviList, snovReadOne };
