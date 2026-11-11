import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, IMPARFAIT } from "../fr-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "imparfait", { glagoli: IMPARFAIT, osebe: O, cas: "imparfait", n: 30 });
  vrzeli(serija, "raba", [
    ["Quand j'étais petit, je ___ (jouer) au foot tous les jours.", "jouais", ["ai joué", "jouerai", "joue"], "Imparfait za pretekle navade.", 2],
    ["Il ___ (pleuvoir) quand je suis sorti.", "pleuvait", ["a plu", "pleut", "pleuvra"], "Imparfait za ozadje/opis.", 3],
    ["Je lisais quand le téléphone ___ (sonner).", "a sonné", ["sonnait", "sonne", "sonnera"], "Passé composé za dogodek, ki prekine dogajanje.", 3],
    ["Hier, nous ___ (visiter) le musée.", "avons visité", ["visitions", "visitons", "visiterons"], "Passé composé za zaključeno dejanje.", 2],
    ["La maison ___ (être) grande et belle.", "était", ["a été", "est", "sera"], "Imparfait za opis v preteklosti.", 2],
    ["Si j'___ (avoir) le temps, je viendrais.", "avais", ["ai", "aurais", "aurai"], "Si + imparfait, conditionnel.", 4, "visja"],
    ["Elle ___ (avoir) 10 ans quand elle a déménagé.", "avait", ["a eu", "a", "aura"], "Starost v preteklosti: imparfait.", 3],
    ["Nous ___ (commencer) toujours à 8 heures.", "commencions", ["commençions", "commencons", "commençons"], "Pred -i- ni sedija: commencions.", 4, "visja"],
    ["Avant, on ___ (manger) beaucoup de pain.", "mangeait", ["mangait", "a mangé", "mange"], "Pred -a- obdržimo e: mangeait.", 4, "visja"],
    ["Pendant que tu ___ (dormir), j'ai préparé le dîner.", "dormais", ["as dormi", "dors", "dormiras"], "Pendant que + imparfait za trajajoče dejanje.", 3],
    ["Qu'est-ce que tu ___ (faire) hier à 20 heures ?", "faisais", ["as fait", "fais", "feras"], "Imparfait za dejanje v teku ob določenem času.", 3],
  ]);
}
