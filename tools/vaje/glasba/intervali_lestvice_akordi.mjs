import { izbira, besedilo, kolicina } from "../lib.mjs";
const N = ["c", "d", "e", "f", "g", "a", "h"], P = [0, 2, 4, 5, 7, 9, 11];
const IME = { 1: ["mala sekunda", "velika sekunda"], 2: ["mala terca", "velika terca"], 3: ["čista kvarta", "zvečana kvarta"], 4: ["zmanjšana kvinta", "čista kvinta"], 5: ["mala seksta", "velika seksta"], 6: ["mala septima", "velika septima"] };
const OSN = { 1: 1, 2: 3, 3: 5, 4: 6, 5: 8, 6: 10 };
const DUR = [["C-dur", 0, "", "a-mol"], ["G-dur", 1, "#", "e-mol"], ["D-dur", 2, "#", "h-mol"], ["A-dur", 3, "#", "fis-mol"], ["E-dur", 4, "#", "cis-mol"], ["H-dur", 5, "#", "gis-mol"], ["F-dur", 1, "b", "d-mol"], ["B-dur", 2, "b", "g-mol"], ["Es-dur", 3, "b", "c-mol"], ["As-dur", 4, "b", "f-mol"], ["Des-dur", 5, "b", "b-mol"]];
const TRI = [["C", "c – e – g"], ["G", "g – h – d"], ["F", "f – a – c"], ["D", "d – fis – a"], ["A", "a – cis – e"], ["E", "e – gis – h"], ["B", "b – d – f"]];
const MOL = [["a", "a – c – e"], ["e", "e – g – h"], ["d", "d – f – a"], ["h", "h – d – fis"], ["g", "g – b – d"], ["c", "c – es – g"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("interval", 30, (r, i) => {
    const a = r.int(0, 6), k = r.int(1, 6), b = (a + k) % 7, s = (P[b] - P[a] + 12) % 12;
    const ime = IME[k][s - OSN[k]];
    if (!ime) return null;
    const vsi = Object.values(IME).flat();
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: s, tol: 0.001, enota: "poltonov", besedilo: `Koliko poltonov obsega interval od ${N[a]} navzgor do ${N[b]}?`, rezultat: `${s}`, postopek: `<p>Med e–f in h–c sta polotna; ostali sosednji toni so oddaljeni za cel ton. ${N[a]}–${N[b]}: ${s} poltonov (${ime}).</p>` });
    return izbira({ r, tezavnost: k === 3 || k === 4 ? 4 : 3, ...(k === 3 || k === 4 ? { raven: "visja" } : {}), besedilo: `Kateri interval je od ${N[a]} navzgor do ${N[b]}?`, pravilna: ime, napacne: r.premesaj(vsi.filter((x) => x !== ime)).slice(0, 3), postopek: `<p>${k + 1}. stopnja (${["", "sekunda", "terca", "kvarta", "kvinta", "seksta", "septima"][k]}), ${s} poltonov → ${ime}.</p>` });
  });
  serija("predznaki", 22, (r, i) => {
    const [d, n, z, m] = DUR[i % 11];
    if (i < 11) return kolicina({ tezavnost: 2, vrednost: n, tol: 0.001, enota: "", besedilo: `Koliko ${z === "b" ? "nižajev" : "višajev"} ima ${d}${z ? "" : " (vpiši 0, če nima predznakov)"}?`, rezultat: `${n}`, postopek: `<p>${d}: ${n} ${z === "b" ? "nižaj(ev)" : z ? "višaj(ev)" : "predznakov"}. Kvintni krog: vsaka kvinta navzgor doda višaj.</p>` });
    return besedilo({ tezavnost: 3, sprejemljivi: [m, m.replace("-mol", "")], besedilo: `Katera molova lestvica je vzporedna lestvici ${d}? (npr. a-mol)`, rezultat: m, postopek: `<p>Vzporedna molova lestvica je mala terca nižje in ima enake predznake: ${d} ↔ ${m}.</p>` });
  });
  serija("trozvok", 13, (r, i) => {
    if (i < 7) { const [t, z] = TRI[i]; return izbira({ r, tezavnost: 3, besedilo: `Kateri toni sestavljajo durov trozvok na tonu ${t.toLowerCase()} (${t}-dur)?`, pravilna: z, napacne: r.premesaj(TRI.filter(([x]) => x !== t).map(([, y]) => y)).slice(0, 3), postopek: `<p>Durov trozvok: velika terca + mala terca. ${t}: ${z}.</p>` }); }
    const [t, z] = MOL[i - 7]; return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kateri toni sestavljajo molov trozvok na tonu ${t}?`, pravilna: z, napacne: r.premesaj(MOL.filter(([x]) => x !== t).map(([, y]) => y)).slice(0, 3), postopek: `<p>Molov trozvok: mala terca + velika terca. ${t}: ${z}.</p>` });
  });
  pojmi([
    ["polton", "Najmanjša razdalja med tonoma v evropskem tonskem sistemu."],
    ["interval", "Razdalja med dvema tonoma."],
    ["durova lestvica", "Lestvica z zaporedjem cel ton, cel ton, polton, cel ton, cel ton, cel ton, polton (poltona med 3. in 4. ter 7. in 8. stopnjo)."],
    ["kvintni krog", "Razporeditev tonalitet po čistih kvintah, ki kaže število predznakov."],
    ["trozvok", "Akord iz treh tonov, zloženih v tercah."],
    ["tonika", "Prva stopnja lestvice in akord na njej."],
  ]);
}
