// Naloge za besedišče: podatki so v tools/besedisce/anglescina.mjs (isti kot na strani).
import { izbira, besedilo } from "../lib.mjs";
import teme from "../../besedisce/anglescina.mjs";

const vse = teme.flatMap((t, k) => t.besede.map(([w, p, e]) => ({ w, p, e, k })));
// Beseda se v primeru pojavi v natanko taki obliki (npr. »recycle« v »We recycle paper«).
const vrzel = (b) => {
  const m = new RegExp(`\\b${b.w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").exec(b.e);
  return m ? b.e.slice(0, m.index) + "___" + b.e.slice(m.index + m[0].length) : null;
};
const zVrzeljo = vse.filter((b) => vrzel(b));
const drugeIzTeme = (r, b, polje, sez = vse) => {
  const ista = sez.filter((x) => x.k === b.k && x[polje] !== b[polje]);
  return [...new Set(r.premesaj(ista).map((x) => x[polje]))].slice(0, 3);
};
const post = (b) => `<p><em>${b.w}</em> = ${b.p}</p><p><em>${b.e}</em></p>`;

export default function ({ serija }) {
  serija("pomen", 40, (r) => {
    const b = r.izberi(vse);
    return izbira({ r, tezavnost: 1, besedilo: `Kaj pomeni <em>${b.w}</em>?`, pravilna: b.p, napacne: drugeIzTeme(r, b, "p"), postopek: post(b) });
  });
  serija("prevod", 40, (r) => {
    const b = r.izberi(vse);
    return izbira({ r, tezavnost: 2, besedilo: `Kako se po angleško reče »${b.p}«?`, pravilna: b.w, napacne: drugeIzTeme(r, b, "w"), postopek: post(b) });
  });
  serija("vrzel", 30, (r) => {
    const b = r.izberi(zVrzeljo);
    return izbira({ r, tezavnost: 3, besedilo: `Izberi besedo, ki manjka: <em>${vrzel(b)}</em>`, pravilna: b.w, napacne: drugeIzTeme(r, b, "w", zVrzeljo), postopek: post(b) });
  });
  serija("vpis", 30, (r) => {
    const b = r.izberi(zVrzeljo);
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [b.w], besedilo: `Vpiši manjkajočo besedo (${b.p}): <em>${vrzel(b)}</em>`, rezultat: b.w, postopek: post(b) });
  });
}
