import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, PRESENTE } from "../it-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "presente", { glagoli: PRESENTE, osebe: O, cas: "presente", n: 36 });
  vrzeli(serija, "raba", [
    ["Io ___ (chiamarsi) Luca.", "mi chiamo", ["si chiamo", "chiamo", "mi chiama"], "Povratni glagol: io mi chiamo.", 2],
    ["Noi ___ (alzarsi) alle sette.", "ci alziamo", ["si alziamo", "alziamo", "ci alzano"], "Povratni glagol: noi ci alziamo.", 3],
    ["Che cosa ___ (fare) voi stasera?", "fate", ["fanno", "facete", "fai"], "Fare je nepravilen: voi fate.", 2],
    ["Loro ___ (andare) al mare in agosto.", "vanno", ["vando", "andano", "va"], "Andare: loro vanno.", 2],
    ["Mi ___ la pizza.", "piace", ["piacciono", "piaccio", "piaci"], "Mi piace + ednina.", 2],
    ["Mi ___ gli spaghetti.", "piacciono", ["piace", "piaccio", "piacono"], "Mi piacciono + množina.", 3],
    ["Da quanto tempo ___ (studiare) l'italiano?", "studi", ["studii", "studia", "studio"], "Glagoli na -iare izgubijo i: tu studi.", 3],
    ["Tu ___ (pagare) sempre in contanti.", "paghi", ["pagi", "paga", "paghe"], "Glagoli na -gare dobijo h: tu paghi.", 4, "visja"],
    ["Io non ___ (sapere) nuotare.", "so", ["sapo", "sa", "sai"], "Sapere: io so.", 2],
    ["Ci ___ molte persone in piazza.", "sono", ["è", "hanno", "stanno"], "Ci sono + množina.", 2],
    ["Ogni mattina ___ (io, bere) un caffè.", "bevo", ["bero", "beve", "bevi"], "Bere: io bevo.", 3],
    ["Che cosa ___ (dire) tu?", "dici", ["dichi", "dice", "dite"], "Dire: tu dici.", 3],
  ]);
}
