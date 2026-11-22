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
// in pole poklicne mature matura-poklicna_<predmet>.json (tools/poklicna/)
const polePoklicne = readdirSync(new URL("./", import.meta.url))
  .filter((f) => /^matura-poklicna_[a-z_]+\.json$/.test(f))
  .sort()
  .flatMap((f) => readJSON(`./${f}`));
export const matura = [...readJSON("./matura.json"), ...readJSON("./matura-fizika.json"), ...readJSON("./matura-kemija.json"), ...readJSON("./matura-biologija.json"), ...readJSON("./matura-informatika.json"), ...readJSON("./matura-slovenscina.json"), ...readJSON("./matura-anglescina.json"), ...polePoklicne];

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

// Vprašanja za ustni del mature: ustni/<predmet>.json (tools/ustni/gradi.mjs)
const datotekeUstni = () => {
  try {
    return readdirSync(new URL("./ustni/", import.meta.url));
  } catch {
    return [];
  }
};
export const ustni = datotekeUstni()
  .filter((f) => f.endsWith(".json"))
  .sort()
  .flatMap((f) => readJSON(`./ustni/${f}`));

// Uradni datumi mature po letih (RIC): koledar-mature.json, uporablja ga tedenska priprava
export const koledarMature = readJSON("./koledar-mature.json");
