// api/data/index.js
// Podatki se preberejo enkrat ob zagonu strežnika, ne ob vsaki zahtevi.
import { readFileSync, readdirSync } from "node:fs";

const readJSON = (file) =>
  JSON.parse(readFileSync(new URL(file, import.meta.url), "utf-8"));

export const snovi = readJSON("./snovi.json").map((snov) => ({
  ...snov,
  url: `/views/${snov.predmet}/snov/${snov.slug}/${snov.slug}_razlaga.html`,
}));

// Pole vseh predmetov: matura.json (matematika) in matura-<predmet>.json
export const matura = [...readJSON("./matura.json"), ...readJSON("./matura-fizika.json"), ...readJSON("./matura-kemija.json"), ...readJSON("./matura-biologija.json"), ...readJSON("./matura-informatika.json"), ...readJSON("./matura-slovenscina.json"), ...readJSON("./matura-anglescina.json")];

// Naloge za vajo: naloge.json (prve naloge množic) in vaje/<predmet>.json (tools/vaje/gradi.mjs).
// Vsaka naloga ima predmet, poglavje, težavnost 1–4 (lahka … zelo težka) in raven (osnovna / visja).
const datotekeVaj = () => {
  try {
    return readdirSync(new URL("./vaje/", import.meta.url));
  } catch {
    return [];
  }
};
const vaje = datotekeVaj()
  .filter((f) => f.endsWith(".json"))
  .sort()
  .flatMap((f) => readJSON(`./vaje/${f}`));
export const naloge = [
  ...readJSON("./naloge.json").map((n) => ({ predmet: "matematika", tezavnost: 1, ...n })),
  ...vaje,
].sort((a, b) => (a.tezavnost ?? 1) - (b.tezavnost ?? 1));
