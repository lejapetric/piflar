import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, FUTURO, CONDICIONAL } from "../es-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "futuro", { glagoli: FUTURO, osebe: O, cas: "futuro simple", n: 22 });
  spregatev(serija, "condicional", { glagoli: CONDICIONAL, osebe: O, cas: "condicional simple", tez: 3, n: 18 });
  vrzeli(serija, "raba", [
    ["Mañana ___ (hacer) buen tiempo.", "hará", ["hace", "haría", "hacerá"], "Futuro od hacer: hará.", 2],
    ["El año que viene ___ (yo, ir) a España.", "iré", ["voy", "iría", "vaya"], "Futuro od ir: iré.", 2],
    ["Mañana ___ (yo, ir) a ver a mi abuela. (načrt)", ["voy a ir", "iré"], ["iría", "fui", "vaya"], "Ir a + nedoločnik za načrte.", 2],
    ["¿___ (tú, poder) ayudarme, por favor?", "Podrías", ["Podrás", "Puedas", "Pudiste"], "Vljudna prošnja: condicional.", 3],
    ["Yo que tú, no lo ___ (hacer).", "haría", ["haré", "hago", "hacía"], "Nasvet: condicional.", 3],
    ["Si estudias, ___ (aprobar) el examen.", "aprobarás", ["aprobarías", "apruebes", "aprobabas"], "Realni pogoj: si + presente, futuro.", 3],
    ["Si tuviera dinero, ___ (comprar) una casa.", "compraría", ["compraré", "compro", "comprara"], "Si + subjuntivo imperfecto → condicional.", 4, "visja"],
    ["¿Qué hora es? – No sé, ___ las diez.", "serán", ["son", "serían", "eran"], "Futuro za domnevo v sedanjosti.", 4, "visja"],
    ["Cuando llamó, ___ las once.", "serían", ["serán", "son", "fueron"], "Condicional za domnevo v preteklosti.", 4, "visja"],
    ["Me dijo que ___ (venir) al día siguiente.", "vendría", ["vendrá", "viene", "venía"], "Prihodnost v preteklosti: condicional.", 4, "visja"],
  ]);
}
