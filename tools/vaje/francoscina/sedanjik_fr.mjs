import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, PRESENT } from "../fr-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "present", { glagoli: PRESENT, osebe: O, cas: "présent", n: 40 });
  vrzeli(serija, "raba", [
    ["Nous ___ (habiter) à Ljubljana.", "habitons", ["habitez", "habitent", "habite"], "Nous → -ons.", 1],
    ["Ils ___ (aimer) le chocolat.", "aiment", ["aime", "aimez", "aimons"], "Ils → -ent (neizgovorjeno).", 1],
    ["Je ne ___ (comprendre) pas.", "comprends", ["comprend", "comprenons", "comprennent"], "Comprendre kot prendre.", 3],
    ["Qu'est-ce que tu ___ (faire) ce soir ?", "fais", ["fait", "faites", "font"], "Faire: tu fais.", 2],
    ["Vous ___ (être) français ?", "êtes", ["es", "sont", "sommes"], "Être: vous êtes.", 1],
    ["Elle ___ (avoir) seize ans.", "a", ["est", "as", "ont"], "Starost izražamo z avoir.", 2],
    ["On ___ (aller) au cinéma ?", "va", ["vas", "allons", "vont"], "On + 3. oseba ednine.", 3],
    ["Nous ___ (commencer) à huit heures.", "commençons", ["commencons", "commencez", "commencent"], "Pred -ons dobi c sedij: ç.", 4, "visja"],
    ["Ils ___ (venir) demain.", "viennent", ["venent", "vient", "venons"], "Venir: ils viennent.", 3],
    ["Tu ___ (pouvoir) m'aider ?", "peux", ["peut", "pouvez", "peuvent"], "Pouvoir: tu peux.", 2],
  ]);
}
