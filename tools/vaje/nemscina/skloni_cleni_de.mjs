import { izbira, besedilo } from "../lib.mjs";

// [samostalnik, rodilniška oblika, spol]
const S = [["Mann", "Mannes", "m"], ["Hund", "Hundes", "m"], ["Lehrer", "Lehrers", "m"], ["Frau", "Frau", "f"], ["Katze", "Katze", "f"], ["Lehrerin", "Lehrerin", "f"], ["Kind", "Kindes", "n"], ["Mädchen", "Mädchens", "n"], ["Pferd", "Pferdes", "n"]];
const DOL = { m: ["der", "den", "dem", "des"], f: ["die", "die", "der", "der"], n: ["das", "das", "dem", "des"] };
const NED = { m: ["ein", "einen", "einem", "eines"], f: ["eine", "eine", "einer", "einer"], n: ["ein", "ein", "einem", "eines"] };
const SKL = ["Nominativ", "Akkusativ", "Dativ", "Genitiv"];
const POV = [(a, s) => `${a} ${s[0]} ist hier.`, (a, s) => `Ich sehe ${a} ${s[0]}.`, (a, s) => `Ich spreche mit ${a} ${s[0]}.`, (a, s) => `Das ist das Auto ${a} ${s[1]}.`];

export default function ({ serija, pojmi }) {
  serija("dolocni", 24, (r, i) => {
    const s = r.izberi(S), k = r.int(0, 3), cl = DOL[s[2]][k], vpis = i % 2 === 1;
    const pov = POV[k]("___", s);
    if (vpis) return besedilo({ tezavnost: 3, sprejemljivi: [cl], besedilo: `Vpiši določni člen (${SKL[k]}): <em>${pov.charAt(0).toUpperCase() + pov.slice(1)}</em>`, rezultat: cl, postopek: `<p>${s[2] === "m" ? "der" : s[2] === "f" ? "die" : "das"} ${s[0]} → ${SKL[k]}: ${cl}.</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `Izberi pravilni člen: <em>${pov}</em>`, pravilna: cl, napacne: ["der", "die", "das", "den", "dem", "des"].filter((x) => x !== cl).slice(0, 3), postopek: `<p>${SKL[k]}, spol ${s[2]}: ${cl}.</p>` });
  });
  serija("nedolocni", 18, (r, i) => {
    const s = r.izberi(S), k = r.int(0, 3), cl = NED[s[2]][k];
    const pov = POV[k]("___", s);
    return besedilo({ tezavnost: 3, sprejemljivi: [cl], besedilo: `Vpiši nedoločni člen (${SKL[k]}): <em>${pov.charAt(0).toUpperCase() + pov.slice(1)}</em>`, rezultat: cl, postopek: `<p>${SKL[k]}: ${cl} ${k === 3 ? s[1] : s[0]}.</p>` });
  });
  serija("sklon", 12, (r) => {
    const [p, odg] = r.izberi([["Ich gebe dem Kind ein Buch. (dem Kind)", "Dativ"], ["Ich gebe dem Kind ein Buch. (ein Buch)", "Akkusativ"], ["Der Hund schläft. (Der Hund)", "Nominativ"], ["Das ist die Tasche der Lehrerin. (der Lehrerin)", "Genitiv"], ["Wir besuchen den Onkel. (den Onkel)", "Akkusativ"], ["Ich helfe meiner Mutter. (meiner Mutter)", "Dativ"], ["Trotz des Regens gehen wir spazieren. (des Regens)", "Genitiv"], ["Mein Bruder ist Arzt. (Mein Bruder)", "Nominativ"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katerem sklonu je poudarjeni del: <em>${p}</em>`, pravilna: odg, napacne: SKL.filter((x) => x !== odg), postopek: `<p>${odg}.</p>` });
  });
  pojmi([
    ["Nominativ", "Sklon osebka (wer? was?)."],
    ["Akkusativ", "Sklon premega predmeta (wen? was?)."],
    ["Dativ", "Sklon nepremega predmeta (wem?)."],
    ["Genitiv", "Sklon svojine (wessen?)."],
    ["der", "Določni člen moškega spola v imenovalniku."],
    ["die", "Določni člen ženskega spola in množine v imenovalniku."],
    ["das", "Določni člen srednjega spola v imenovalniku."],
  ], { uvod: "izraz" });
}
