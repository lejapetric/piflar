// node tools/matura/dodaj-pravila.mjs [api/data/matura.json]
// Pod sive komentarje rešitev doda uporabljena pravila in ali so na listu s formulami.
import fs from "node:fs";
import { dodajPravila } from "./pravila.mjs";
const pot = process.argv[2] ?? new URL("../../api/data/matura.json", import.meta.url);
const pole = JSON.parse(fs.readFileSync(pot, "utf8"));
for (const pola of pole) pola.naloge = pola.naloge.map((n) => (n.razlaga ? { ...n, razlaga: dodajPravila(n.razlaga, pola.raven) } : n));
fs.writeFileSync(pot, JSON.stringify(pole, null, 2) + "\n");
console.log("pravila dodana:", pole.length, "pol");
