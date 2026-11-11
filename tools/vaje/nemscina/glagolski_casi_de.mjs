import { spregatev } from "../jezik-lib.mjs";
import { izbira, besedilo } from "../lib.mjs";

const O = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];
const PRA = [["machen", ["mache", "machst", "macht", "machen", "macht", "machen"]], ["arbeiten", ["arbeite", "arbeitest", "arbeitet", "arbeiten", "arbeitet", "arbeiten"]], ["sein", ["bin", "bist", "ist", "sind", "seid", "sind"]], ["haben", ["habe", "hast", "hat", "haben", "habt", "haben"]], ["fahren", ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"]], ["lesen", ["lese", "liest", "liest", "lesen", "lest", "lesen"]], ["sprechen", ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"]], ["werden", ["werde", "wirst", "wird", "werden", "werdet", "werden"]], ["nehmen", ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"]], ["wissen", ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"]]];
const PRT = [["sein", ["war", "warst", "war", "waren", "wart", "waren"]], ["haben", ["hatte", "hattest", "hatte", "hatten", "hattet", "hatten"]], ["machen", ["machte", "machtest", "machte", "machten", "machtet", "machten"]], ["gehen", ["ging", "gingst", "ging", "gingen", "gingt", "gingen"]], ["kommen", ["kam", "kamst", "kam", "kamen", "kamt", "kamen"]], ["können", ["konnte", "konntest", "konnte", "konnten", "konntet", "konnten"]], ["fahren", ["fuhr", "fuhrst", "fuhr", "fuhren", "fuhrt", "fuhren"]]];
const PERF = [["gehen", "ist gegangen"], ["machen", "hat gemacht"], ["fahren", "ist gefahren"], ["lesen", "hat gelesen"], ["schreiben", "hat geschrieben"], ["essen", "hat gegessen"], ["trinken", "hat getrunken"], ["kommen", "ist gekommen"], ["bleiben", "ist geblieben"], ["sehen", "hat gesehen"], ["studieren", "hat studiert"], ["besuchen", "hat besucht"], ["aufstehen", "ist aufgestanden"], ["einkaufen", "hat eingekauft"], ["verstehen", "hat verstanden"], ["fliegen", "ist geflogen"], ["bringen", "hat gebracht"], ["denken", "hat gedacht"], ["finden", "hat gefunden"]];

export default function ({ serija }) {
  spregatev(serija, "praesens", { glagoli: PRA, osebe: O, cas: "Präsens", n: 24 });
  spregatev(serija, "praeteritum", { glagoli: PRT, osebe: O, cas: "Präteritum", tez: 3, n: 18 });
  serija("perfekt", 24, (r, i) => {
    const [inf, p] = r.izberi(PERF), [pom, del] = p.split(" ");
    if (i % 2) return besedilo({ tezavnost: 3, sprejemljivi: [del], besedilo: `Zapiši Partizip II glagola <em>${inf}</em>.`, rezultat: del, postopek: `<p>${inf} → ${p} (er/sie/es).</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `S katerim pomožnim glagolom tvori Perfekt glagol <em>${inf}</em>?`, pravilna: pom === "ist" ? "sein" : "haben", napacne: [pom === "ist" ? "haben" : "sein"], postopek: `<p>${inf}: er ${p}. Glagoli premikanja in spremembe stanja imajo sein.</p>` });
  });
  serija("cas", 8, (r) => {
    const [p, odg] = r.izberi([["Ich habe gestern Fußball gespielt.", "Perfekt"], ["Er las ein Buch.", "Präteritum"], ["Wir werden morgen kommen.", "Futur I"], ["Sie hatte schon gegessen.", "Plusquamperfekt"], ["Du arbeitest viel.", "Präsens"], ["Ihr seid nach Berlin gefahren.", "Perfekt"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri čas je uporabljen: <em>${p}</em>`, pravilna: odg, napacne: ["Präsens", "Präteritum", "Perfekt", "Plusquamperfekt", "Futur I"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg}.</p>` });
  });
}
