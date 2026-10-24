// api/data/index.js
// Podatki se preberejo enkrat ob zagonu strežnika, ne ob vsaki zahtevi.
import { readFileSync } from "node:fs";

const readJSON = (file) =>
  JSON.parse(readFileSync(new URL(file, import.meta.url), "utf-8"));

export const snovi = readJSON("./snovi.json").map((snov) => ({
  ...snov,
  url: `/views/${snov.predmet}/snov/${snov.slug}/${snov.slug}_razlaga.html`,
}));

export const matura = readJSON("./matura.json");
