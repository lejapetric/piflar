import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, CONGIUNTIVO, CONG_IMPERFETTO } from "../it-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "presente", { glagoli: CONGIUNTIVO, osebe: O.map((o) => `che ${o}`), cas: "congiuntivo presente", tez: 3, n: 22 });
  spregatev(serija, "imperfetto", { glagoli: CONG_IMPERFETTO, osebe: O.map((o) => `che ${o}`), cas: "congiuntivo imperfetto", tez: 3, n: 14, visja: true });
  vrzeli(serija, "raba", [
    ["Penso che Marco ___ (avere) ragione.", "abbia", ["ha", "avrà", "aveva"], "Pensare che + congiuntivo.", 3],
    ["Spero che tu ___ (stare) bene.", "stia", ["stai", "starai", "stessi"], "Sperare che + congiuntivo.", 3],
    ["So che tu ___ (essere) stanco.", "sei", ["sia", "fossi", "saresti"], "Sapere che (gotovost) → indicativo.", 4, "visja"],
    ["Bisogna che voi ___ (fare) attenzione.", "facciate", ["fate", "farete", "faceste"], "Bisogna che + congiuntivo.", 3],
    ["Benché ___ (piovere), usciamo.", "piova", ["piove", "pioverà", "piovesse"], "Benché + congiuntivo.", 4, "visja"],
    ["Se ___ (io, essere) ricco, comprerei una barca.", "fossi", ["sono", "sarei", "sia"], "Neresnični pogoj: se + congiuntivo imperfetto.", 4, "visja"],
    ["Volevo che tu ___ (venire) con me.", "venissi", ["venga", "vieni", "verrai"], "Glavni stavek v preteklosti → congiuntivo imperfetto.", 4, "visja"],
    ["È importante che tutti ___ (capire).", "capiscano", ["capiscono", "capiranno", "capissero"], "È importante che + congiuntivo.", 3],
    ["Credo che loro ___ (partire) domani.", "partano", ["partono", "partiranno", "partissero"], "Credere che + congiuntivo.", 3],
    ["Sono contento che tu ___ (essere) qui.", "sia", ["sei", "fossi", "sarai"], "Čustva + che → congiuntivo.", 3],
    ["Prima che ___ (tu, uscire), chiudi la finestra.", "esca", ["esci", "uscirai", "uscissi"], "Prima che + congiuntivo.", 4, "visja"],
  ]);
}
