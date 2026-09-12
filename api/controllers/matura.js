// api/controllers/matura.js
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");

async function readJSON(file) {
  const raw = await fs.readFile(join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw);
}

const maturaList = async (req, res) => {
  try {
    let matura = await readJSON("matura.json");
    const { raven, tip } = req.query;
    if (raven) matura = matura.filter((m) => m.raven === raven);
    if (tip) matura = matura.filter((m) => m.tip === tip);
    res.status(200).json(matura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju maturitetnih pol." });
  }
};

const maturaReadOne = async (req, res) => {
  try {
    const matura = await readJSON("matura.json");
    const pola = matura.find((m) => m.id === req.params.maturaId);
    if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
    res.status(200).json(pola);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju maturitetne pole." });
  }
};

const nalogeList = async (req, res) => {
  try {
    const matura = await readJSON("matura.json");
    const pola = matura.find((m) => m.id === req.params.maturaId);
    if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
    let naloge = pola.naloge || [];
    if (req.query.status) naloge = naloge.filter((n) => n.status === req.query.status);
    res.status(200).json(naloge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju nalog." });
  }
};

const nalogaReadOne = async (req, res) => {
  try {
    const matura = await readJSON("matura.json");
    const pola = matura.find((m) => m.id === req.params.maturaId);
    if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
    const naloga = (pola.naloge || []).find((n) => n.id === req.params.nalogaId);
    if (!naloga) return res.status(404).json({ message: "Naloga ne obstaja." });
    res.status(200).json(naloga);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju naloge." });
  }
};

export default {
  maturaList,
  maturaReadOne,
  nalogeList,
  nalogaReadOne,
};