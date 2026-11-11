import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, SUBJUNTIVO, SUBJ_IMPERFECTO } from "../es-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "presente", { glagoli: SUBJUNTIVO, osebe: O.map((o) => `que ${o}`), cas: "presente de subjuntivo", tez: 3, n: 24 });
  spregatev(serija, "imperfecto", { glagoli: SUBJ_IMPERFECTO, osebe: O.map((o) => `que ${o}`), cas: "imperfecto de subjuntivo", tez: 3, n: 12, visja: true });
  vrzeli(serija, "raba", [
    ["Quiero que tú ___ (venir).", "vengas", ["vienes", "vendrás", "vinieras"], "Querer que + subjuntivo.", 3],
    ["Espero que ___ (estar) bien.", "estés", ["estás", "estarás", "estuvieras"], "Esperar que + subjuntivo.", 3],
    ["Creo que ___ (tener) razón.", "tienes", ["tengas", "tendrías", "tuvieras"], "Creer que (trdilno) → indicativo.", 4, "visja"],
    ["No creo que ___ (tener) razón.", "tengas", ["tienes", "tendrás", "tuviste"], "No creer que → subjuntivo.", 4, "visja"],
    ["Es importante que todos ___ (saber) la verdad.", "sepan", ["saben", "sabrán", "supieran"], "Es importante que + subjuntivo.", 3],
    ["Cuando ___ (tú, llegar), llámame.", "llegues", ["llegas", "llegarás", "llegaste"], "Cuando za prihodnost → subjuntivo.", 4, "visja"],
    ["Cuando ___ (yo, llegar) a casa, siempre ceno.", "llego", ["llegue", "llegaré", "llegara"], "Cuando za navado → indicativo.", 4, "visja"],
    ["Aunque ___ (llover) mañana, iremos.", "llueva", ["llueve", "lloverá", "lloviera"], "Aunque za negotovo → subjuntivo.", 4, "visja"],
    ["Ojalá ___ (hacer) sol mañana.", "haga", ["hace", "hará", "hizo"], "Ojalá + subjuntivo.", 3],
    ["Si ___ (yo, ser) rico, viajaría.", "fuera", ["soy", "sería", "sea"], "Neresnični pogoj: si + imperfecto de subjuntivo.", 4, "visja"],
    ["Me alegro de que ___ (vosotros, venir).", "vengáis", ["venís", "vendréis", "vinierais"], "Čustva + que → subjuntivo.", 3],
    ["Busco a alguien que ___ (hablar) ruso.", "hable", ["habla", "hablará", "hablara"], "Neznan/neobstoječ predmet → subjuntivo.", 4, "visja"],
    ["Te lo digo para que lo ___ (saber).", "sepas", ["sabes", "sabrás", "supiste"], "Para que + subjuntivo.", 3],
  ]);
}
