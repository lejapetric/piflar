// api/controllers/items.js
import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");

async function readJSON(file) {
  const raw = await fs.readFile(join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw);
}

const itemsList = async (req, res) => {
  try {
    const snovi = await readJSON("snovi.json");
    res.status(200).json(snovi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju snovi." });
  }
};

const itemsReadOne = async (req, res) => {
  try {
    const snovi = await readJSON("snovi.json");
    const snov = snovi.find((s) => s.slug === req.params.itemId);
    if (!snov) return res.status(404).json({ message: "Snov ne obstaja." });
    res.status(200).json(snov);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Napaka pri branju snovi." });
  }
};

const itemsCreate = async (req, res) => {
  res.status(501).json({ message: "Dodajanje snovi še ni implementirano." });
};

const itemsUpdateOne = async (req, res) => {
  res.status(501).json({ message: "Urejanje snovi še ni implementirano." });
};

const itemsUpdateExchangeDate = async (req, res) => {
  res.status(501).json({ message: "Ni relevantno za matematiko." });
};

const itemsDeleteOne = async (req, res) => {
  res.status(501).json({ message: "Brisanje snovi še ni implementirano." });
};

const itemsListByUser = async (req, res) => {
  res.status(200).json([]);
};

// EKSPORT
export default {
  itemsList,
  itemsReadOne,
  itemsCreate,
  itemsUpdateOne,
  itemsUpdateExchangeDate,
  itemsDeleteOne,
  itemsListByUser,
};