import { besedilo, izbira } from "../lib.mjs";

const ADJ = ["alt", "jung", "klein", "nett", "groß"];
const NOUN = { m: "Mann", f: "Frau", n: "Kind" };
const DOL = { m: ["der", "den", "dem"], f: ["die", "die", "der"], n: ["das", "das", "dem"] };
const NED = { m: ["ein", "einen", "einem"], f: ["eine", "eine", "einer"], n: ["ein", "ein", "einem"] };
const SIB = { m: ["e", "en", "en"], f: ["e", "e", "en"], n: ["e", "e", "en"] };
const MES = { m: ["er", "en", "en"], f: ["e", "e", "en"], n: ["es", "es", "en"] };
const KON = [(x) => `Das ist ${x}.`, (x) => `Ich sehe ${x}.`, (x) => `Ich spreche mit ${x}.`];
const SKL = ["Nominativ", "Akkusativ", "Dativ"];
const MOC = { m: ["Kaffee", ["er", "en", "em"]], f: ["Milch", ["e", "e", "er"]], n: ["Wasser", ["es", "es", "em"]] };

export default function ({ serija }) {
  serija("sibka", 18, (r) => {
    const g = r.izberi(["m", "f", "n"]), k = r.int(0, 2), a = r.izberi(ADJ), obl = a + SIB[g][k];
    return besedilo({ tezavnost: 3, sprejemljivi: [obl], besedilo: `Dopolni pridevnik (${SKL[k]}): <em>${KON[k](`${DOL[g][k]} ___ (${a}) ${NOUN[g]}`)}</em>`, rezultat: obl, postopek: `<p>Za določnim členom je šibka sklanjatev: ${DOL[g][k]} ${obl} ${NOUN[g]}.</p>` });
  });
  serija("mesana", 18, (r) => {
    const g = r.izberi(["m", "f", "n"]), k = r.int(0, 2), a = r.izberi(ADJ), obl = a + MES[g][k];
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [obl], besedilo: `Dopolni pridevnik (${SKL[k]}): <em>${KON[k](`${NED[g][k]} ___ (${a}) ${NOUN[g]}`)}</em>`, rezultat: obl, postopek: `<p>Za nedoločnim členom je mešana sklanjatev: ${NED[g][k]} ${obl} ${NOUN[g]}.</p>` });
  });
  serija("krepka", 12, (r) => {
    const g = r.izberi(["m", "f", "n"]), k = r.int(0, 2), a = r.izberi(["heiß", "kalt", "frisch"]), [n, e] = MOC[g], obl = a + e[k];
    const pov = [`___ (${a}) ${n} ist gesund.`, `Ich trinke ___ (${a}) ${n}.`, `Ich koche mit ___ (${a}) ${n}.`][k];
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [obl, obl.charAt(0).toUpperCase() + obl.slice(1)], besedilo: `Dopolni pridevnik brez člena (${SKL[k]}): <em>${pov}</em>`, rezultat: obl, postopek: `<p>Brez člena pridevnik prevzame končnico člena (krepka sklanjatev): ${obl} ${n}.</p>` });
  });
  serija("izbira", 12, (r) => {
    const g = r.izberi(["m", "f", "n"]), k = r.int(0, 2), a = r.izberi(ADJ), dol = r.izberi([true, false]);
    const prav = a + (dol ? SIB : MES)[g][k], art = (dol ? DOL : NED)[g][k];
    const nap = [...new Set(["e", "en", "er", "es", "em"].map((e) => a + e))].filter((x) => x !== prav);
    return izbira({ r, tezavnost: 2, besedilo: `Izberi pravilno obliko: <em>${KON[k](`${art} ___ ${NOUN[g]}`)}</em>`, pravilna: prav, napacne: r.premesaj(nap).slice(0, 3), postopek: `<p>${art} ${prav} ${NOUN[g]} (${SKL[k]}).</p>` });
  });
}
