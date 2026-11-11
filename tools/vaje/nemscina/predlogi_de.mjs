import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

const P = [["durch", "Akkusativ"], ["für", "Akkusativ"], ["gegen", "Akkusativ"], ["ohne", "Akkusativ"], ["um", "Akkusativ"], ["aus", "Dativ"], ["bei", "Dativ"], ["mit", "Dativ"], ["nach", "Dativ"], ["seit", "Dativ"], ["von", "Dativ"], ["zu", "Dativ"], ["trotz", "Genitiv"], ["während", "Genitiv"], ["wegen", "Genitiv"], ["in", "Akkusativ ali Dativ"], ["auf", "Akkusativ ali Dativ"], ["an", "Akkusativ ali Dativ"], ["neben", "Akkusativ ali Dativ"], ["über", "Akkusativ ali Dativ"]];
const K = [["zu + dem", "zum"], ["zu + der", "zur"], ["in + dem", "im"], ["an + dem", "am"], ["bei + dem", "beim"], ["von + dem", "vom"], ["in + das", "ins"], ["an + das", "ans"]];

export default function ({ serija }) {
  serija("sklon", 20, (r) => {
    const [p, s] = r.izberi(P);
    return izbira({ r, tezavnost: 2, besedilo: `S katerim sklonom se veže predlog <em>${p}</em>?`, pravilna: s, napacne: ["Akkusativ", "Dativ", "Genitiv", "Akkusativ ali Dativ"].filter((x) => x !== s), postopek: `<p>${p}: ${s}.${s.includes("ali") ? " Wohin? → Akkusativ, Wo? → Dativ." : ""}</p>` });
  });
  serija("krcenje", 8, (r) => {
    const [a, b] = r.izberi(K);
    return besedilo({ tezavnost: 2, sprejemljivi: [b], besedilo: `Kako se skrči <em>${a}</em>?`, rezultat: b, postopek: `<p>${a} = ${b}</p>` });
  });
  vrzeli(serija, "wechsel", [
    ["Ich lege das Buch auf ___ Tisch. (wohin?)", "den", ["dem", "der", "des"], "Wohin? → Akkusativ: auf den Tisch."],
    ["Das Buch liegt auf ___ Tisch. (wo?)", "dem", ["den", "der", "das"], "Wo? → Dativ: auf dem Tisch."],
    ["Wir gehen in ___ Kino.", "das", ["dem", "den", "der"], "Smer → Akkusativ: in das (ins) Kino."],
    ["Wir sind in ___ Kino.", "dem", ["das", "den", "die"], "Mesto → Dativ: in dem (im) Kino."],
    ["Er hängt das Bild an ___ Wand.", "die", ["der", "den", "dem"], "Wohin? → Akkusativ (die Wand)."],
    ["Das Bild hängt an ___ Wand.", "der", ["die", "den", "dem"], "Wo? → Dativ (der Wand)."],
    ["Ich fahre ___ Berlin.", "nach", ["zu", "in", "an"], "Nach pri mestih in državah brez člena.", 1],
    ["Ich gehe ___ Arzt.", "zum", ["nach", "im", "ins"], "Zu + osebe: zum Arzt.", 3],
    ["Ich wohne hier ___ drei Jahren.", "seit", ["für", "vor", "ab"], "Seit + Dativ za trajanje do zdaj.", 3],
    ["Das Geschenk ist ___ meine Mutter.", "für", ["zu", "an", "mit"], "Für + Akkusativ.", 1],
    ["___ des schlechten Wetters bleiben wir zu Hause.", "Wegen", ["Mit", "Für", "Ohne"], "Wegen + Genitiv.", 4, "visja"],
    ["___ des Unterrichts darf man nicht telefonieren.", "Während", ["Seit", "Nach", "Bei"], "Während + Genitiv.", 4, "visja"],
  ]);
}
