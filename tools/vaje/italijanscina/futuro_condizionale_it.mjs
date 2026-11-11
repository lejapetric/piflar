import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, FUTURO, CONDIZIONALE } from "../it-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "futuro", { glagoli: FUTURO, osebe: O, cas: "futuro semplice", n: 22 });
  spregatev(serija, "condizionale", { glagoli: CONDIZIONALE, osebe: O, cas: "condizionale presente", tez: 3, n: 20 });
  vrzeli(serija, "raba", [
    ["Domani ___ (fare) bel tempo.", "farà", ["fa", "farebbe", "faceva"], "Futuro od fare: farà.", 2],
    ["L'anno prossimo ___ (io, andare) in Italia.", "andrò", ["vado", "andrei", "anderò"], "Futuro od andare: andrò.", 2],
    ["___ (io, volere) un caffè, per favore.", "Vorrei", ["Voglio", "Vorrò", "Volevo"], "Vljudna prošnja: condizionale.", 2],
    ["Al tuo posto, non lo ___ (fare).", "farei", ["farò", "faccio", "facevo"], "Nasvet: condizionale.", 3],
    ["Se avessi tempo, ___ (io, viaggiare) di più.", "viaggerei", ["viaggerò", "viaggio", "viaggiavo"], "Se + congiuntivo imperfetto → condizionale.", 4, "visja"],
    ["Se studi, ___ (tu, superare) l'esame.", "supererai", ["supereresti", "superi", "superavi"], "Realni pogoj: se + presente, futuro.", 3],
    ["Che ore sono? – Non so, ___ le dieci.", "saranno", ["sono", "sarebbero", "erano"], "Futuro za domnevo.", 4, "visja"],
    ["Secondo il giornale, il ministro ___ (dimettersi).", "si dimetterebbe", ["si dimetterà", "si dimette", "si dimetteva"], "Condizionale za nepotrjeno novico.", 4, "visja"],
    ["Ti ___ (io, telefonare) domani.", "telefonerò", ["telefonarò", "telefonerei", "telefono"], "Glagoli na -are: -erò.", 3],
    ["Ieri ___ (io, dovere) studiare, ma sono uscito.", "avrei dovuto", ["dovrei", "dovrò", "devo"], "Condizionale passato za neuresničeno.", 4, "visja"],
  ]);
}
