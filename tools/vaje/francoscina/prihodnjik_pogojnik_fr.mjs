import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, FUTUR, COND } from "../fr-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "futur", { glagoli: FUTUR, osebe: O, cas: "futur simple", n: 24 });
  spregatev(serija, "cond", { glagoli: COND, osebe: O, cas: "conditionnel présent", tez: 3, n: 20 });
  vrzeli(serija, "raba", [
    ["Demain, il ___ (faire) beau.", "fera", ["fait", "ferait", "faisait"], "Futur simple od faire: fera.", 2],
    ["Je ___ (aller) en France l'année prochaine.", "irai", ["vais", "irais", "allerai"], "Futur od aller: irai.", 2],
    ["Je ___ (vouloir) un café, s'il vous plaît.", "voudrais", ["veux", "voudrai", "voulais"], "Vljudna prošnja: conditionnel.", 2],
    ["Si j'étais riche, j'___ (acheter) une maison.", "achèterais", ["achèterai", "achetais", "achète"], "Si + imparfait, conditionnel.", 4, "visja"],
    ["Si tu viens, nous ___ (être) contents.", "serons", ["serions", "sommes", "étions"], "Si + présent, futur.", 3],
    ["Quand tu ___ (arriver), appelle-moi.", "arriveras", ["arrives", "arriverais", "arrivais"], "Quand + futur za prihodnost.", 4, "visja"],
    ["Vous ___ (pouvoir) m'aider ?", "pourriez", ["pourrez", "pouvez", "pourrais"], "Vljudno: pourriez-vous.", 3],
    ["Je vais ___ (partir) demain.", "partir", ["partirai", "parti", "pars"], "Futur proche: aller + infinitif.", 1],
    ["À ta place, je ___ (faire) attention.", "ferais", ["ferai", "fais", "faisais"], "Nasvet: à ta place + conditionnel.", 3],
    ["Ils ___ (avoir) leur bac dans deux ans.", "auront", ["auraient", "ont", "avaient"], "Futur od avoir: auront.", 2],
  ]);
}
