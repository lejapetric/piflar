import { izpitShema, vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  izpitShema(serija, { t3A: 15, t3B: "20" });
  vrzeli(serija, "mesano", [
    ["Mi interesso ___ musica.", "di", ["con", "per", "su"], "Interessarsi di.", 3],
    ["Penso ___ te.", "a", ["di", "su", "per"], "Pensare a qualcuno.", 2],
    ["Cosa ne pensi ___ questo film?", "di", ["a", "su", "per"], "Pensare di (mnenje o nečem).", 3],
    ["Ho deciso ___ partire.", "di", ["a", "per", "–"], "Decidere di + nedoločnik.", 3],
    ["Comincio ___ capire.", "a", ["di", "per", "–"], "Cominciare a + nedoločnik.", 3],
    ["Ho ___ fratello e due sorelle.", "un", ["uno", "una", "un'"], "Moški spol pred soglasnikom: un.", 1],
    ["È ___ zio di Marco.", "lo", ["il", "l'", "la"], "Pred z: lo.", 2],
    ["Oggi fa più freddo ___ ieri.", "di", ["che", "come", "da"], "Primerjava: più … di.", 2],
    ["Roma è la città ___ bella d'Italia.", "più", ["molto", "la più", "meglio"], "Presežnik: la città più bella.", 3],
    ["Non ho ___ tempo.", "–", ["del", "la", "un"], "Non ho tempo.", 3],
    ["Non ho visto ___.", "nessuno", ["qualcuno", "nessun", "alcuni"], "Dvojna nikalnica: non … nessuno.", 3],
    ["Vado a scuola ___ autobus.", "in", ["con il", "a", "da"], "Prevozna sredstva: in.", 2],
    ["Siamo usciti ___ pioveva.", "anche se", ["benché", "perché", "quindi"], "Anche se + indicativo.", 4, "visja"],
    ["Ti presto il libro purché tu me lo ___.", "restituisca", ["restituisci", "restituirai", "restituivi"], "Purché + congiuntivo.", 4, "visja"],
    ["Se lo ___ saputo, sarei venuto.", "avessi", ["avrei", "ho", "avevo"], "Neresnični pogoj v preteklosti: se + congiuntivo trapassato.", 4, "visja"],
    ["Mi ha detto che ___ venuto il giorno dopo.", "sarebbe", ["sarà", "è", "fosse"], "Prihodnost v preteklosti: condizionale passato.", 4, "visja"],
    ["Il ragazzo ___ ti ho parlato è qui.", "di cui", ["che", "cui", "del quale che"], "Parlare di → di cui.", 4, "visja"],
    ["Quando ero piccolo ___ (andare) spesso al mare.", "andavo", ["sono andato", "andai", "vado"], "Navada v preteklosti: imperfetto.", 3],
    ["Ieri ___ (io, incontrare) Paola in centro.", "ho incontrato", ["incontravo", "sono incontrato", "incontro"], "Enkratno dejanje: passato prossimo.", 2],
  ]);
}
