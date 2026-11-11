import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, SUBJ } from "../fr-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "subj", { glagoli: SUBJ, osebe: O.map((o) => `que ${o}`), cas: "subjonctif présent", tez: 3, n: 30 });
  vrzeli(serija, "raba", [
    ["Il faut que tu ___ (venir).", "viennes", ["viens", "viendras", "venais"], "Il faut que + subjonctif.", 3],
    ["Je veux que vous ___ (être) à l'heure.", "soyez", ["êtes", "serez", "étiez"], "Vouloir que + subjonctif.", 3],
    ["Bien qu'il ___ (pleuvoir), nous sortons.", "pleuve", ["pleut", "pleuvra", "pleuvait"], "Bien que + subjonctif.", 4, "visja"],
    ["Je pense qu'il ___ (avoir) raison.", "a", ["ait", "aura", "avait"], "Penser que v trdilni obliki → indicatif.", 4, "visja"],
    ["Je ne pense pas qu'il ___ (avoir) raison.", "ait", ["a", "aura", "avait"], "Nikalni penser que → subjonctif.", 4, "visja"],
    ["Je suis content que tu ___ (être) là.", "sois", ["es", "seras", "étais"], "Čustva + que → subjonctif.", 3],
    ["Il est important que nous ___ (faire) attention.", "fassions", ["faisons", "ferons", "faisions"], "Il est important que + subjonctif.", 3],
    ["Avant que tu ___ (partir), mange quelque chose.", "partes", ["pars", "partiras", "partais"], "Avant que + subjonctif.", 4, "visja"],
    ["J'espère que tu ___ (aller) bien.", "vas", ["ailles", "iras", "allais"], "Espérer que → indicatif.", 4, "visja"],
    ["Pour que tout le monde ___ (comprendre), parle lentement.", "comprenne", ["comprend", "comprendra", "comprenait"], "Pour que + subjonctif.", 4, "visja"],
  ]);
}
