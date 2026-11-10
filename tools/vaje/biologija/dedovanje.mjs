import { kolicina, izbira, T, L, ulomek } from "../lib.mjs";

const GENI = [["A", "a", "rdeči cvetovi", "beli cvetovi"], ["B", "b", "rjave oči", "modre oči"], ["R", "r", "okrogla semena", "nagubana semena"], ["T", "t", "visoka rast", "nizka rast"], ["G", "g", "rumena semena", "zelena semena"]];
const gamete = (g) => [g[0], g[1]];
function krizanje(p1, p2) {
  const izid = {};
  for (const a of gamete(p1)) for (const b of gamete(p2)) { const k = [a, b].sort().join(""); izid[k] = (izid[k] ?? 0) + 1; }
  return izid; // od 4
}

export default function ({ serija, pojmi, vprasanja }) {
  serija("monohibrid-fenotip", 8, (r) => {
    const [D, d, dom, rec] = r.izberi(GENI), gen = [`${D}${D}`, `${D}${d}`, `${d}${d}`];
    const p1 = r.izberi(gen), p2 = r.izberi(gen), izid = krizanje(p1, p2);
    const recN = izid[`${d}${d}`] ?? 0, kaj = r.izberi(["dom", "rec"]);
    const st = kaj === "rec" ? recN : 4 - recN;
    return kolicina({ tezavnost: 2, vrednost: (st / 4) * 100, tol: 0.001, enota: "%", besedilo: `Alel ${D} (${dom}) je dominanten nad ${d} (${rec}). Križamo osebka ${p1} × ${p2}. Kolikšen odstotek potomcev bo imel ${kaj === "dom" ? dom : rec}?`, rezultat: `${T((st / 4) * 100, 0)} %`, postopek: `<p>Gamete: ${gamete(p1).join(", ")} × ${gamete(p2).join(", ")}. Kombinacije (Punnettov kvadrat): ${Object.entries(izid).map(([g, n]) => `${g} ×${n}`).join(", ")}.</p><p>${kaj === "dom" ? dom : rec}: ${st} od 4 = ${T((st / 4) * 100, 0)} %.</p>` });
  });
  serija("monohibrid-genotip", 6, (r) => {
    const [D, d] = r.izberi(GENI), gen = [`${D}${D}`, `${D}${d}`, `${d}${d}`];
    const p1 = r.izberi(gen), p2 = r.izberi(gen), izid = krizanje(p1, p2), g = r.izberi(gen), n = izid[g] ?? 0;
    return kolicina({ tezavnost: 2, vrednost: n / 4, tol: 0.001, enota: "", besedilo: `Križamo ${p1} × ${p2}. Kolikšna je verjetnost, da ima potomec genotip ${g}? (Vpiši ulomek ali decimalno število.)`, rezultat: `\\(${ulomek(n, 4)}\\)`, postopek: `<p>Punnettov kvadrat: ${Object.entries(izid).map(([gg, k]) => `${gg} ×${k}`).join(", ")} (od 4).</p>` });
  });
  serija("testno", 4, (r) => {
    const [D, d, dom] = r.izberi(GENI), het = r.izberi([true, false]);
    return izbira({ r, tezavnost: 3, besedilo: `Osebek z lastnostjo ${dom} križamo z ${d}${d}. ${het ? "Polovica" : "Vsi"} potomci ${het ? "ima" : "imajo"} lastnost ${dom}. Kakšen je genotip osebka?`, pravilna: het ? `${D}${d}` : `${D}${D}`, napacne: [het ? `${D}${D}` : `${D}${d}`, `${d}${d}`], postopek: `<p>Testno križanje z recesivnim homozigotom: ${het ? "pojavijo se recesivni potomci, torej je osebek heterozigot" : "vsi potomci so dominantnega fenotipa, torej je osebek homozigot"}.</p>` });
  });
  serija("dihibrid", 6, (r) => {
    const [vz, st, raz] = r.izberi([["dominantna v obeh lastnostih", 9, "9 : 3 : 3 : 1"], ["dominantna v prvi, recesivna v drugi lastnosti", 3, "9 : 3 : 3 : 1"], ["recesivna v obeh lastnostih", 1, "9 : 3 : 3 : 1"]]);
    return kolicina({ tezavnost: 3, vrednost: st / 16, tol: 0.001, enota: "", besedilo: `Križamo dva dihibrida AaBb × AaBb (geni niso vezani). Kolikšna je verjetnost, da je potomec ${vz}?`, rezultat: `\\(${ulomek(st, 16)}\\)`, postopek: `<p>Neodvisno dedovanje: fenotipsko razmerje ${raz}. Iskana skupina: ${st}/16.</p>` });
  });
  serija("dihibrid-genotip", 4, (r) => {
    const a = r.izberi(["AA", "Aa", "aa"]), b = r.izberi(["BB", "Bb", "bb"]);
    const pa = { AA: 1, Aa: 2, aa: 1 }[a], pb = { BB: 1, Bb: 2, bb: 1 }[b];
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: (pa * pb) / 16, tol: 0.001, enota: "", besedilo: `Pri križanju AaBb × AaBb (nevezana gena) izračunaj verjetnost genotipa ${a}${b}.`, rezultat: `\\(${ulomek(pa * pb, 16)}\\)`, postopek: `<p>Gena obravnavamo ločeno: \\(P(${a}) = ${ulomek(pa, 4)}\\), \\(P(${b}) = ${ulomek(pb, 4)}\\).</p><p>\\(P = ${ulomek(pa, 4)} \\cdot ${ulomek(pb, 4)} = ${ulomek(pa * pb, 16)}\\)</p>` });
  });
  serija("spol", 5, (r) => {
    const [opis, v, raz] = r.izberi([
      ["Mati je prenašalka barvne slepote (X<sup>B</sup>X<sup>b</sup>), oče vidi normalno (X<sup>B</sup>Y). Kolikšna je verjetnost, da bo sin barvno slep?", 0.5, "Sin dobi Y od očeta in enega od dveh X materinih kromosomov."],
      ["Mati je prenašalka hemofilije (X<sup>H</sup>X<sup>h</sup>), oče je zdrav. Kolikšna je verjetnost, da bo hči bolna?", 0, "Hči dobi od očeta zdrav X<sup>H</sup>."],
      ["Mati je prenašalka hemofilije, oče je zdrav. Kolikšna je verjetnost, da bo naključni otrok bolan?", 0.25, "Bolan je lahko le sin z X<sup>h</sup>: 1/2 · 1/2."],
      ["Oče je barvno slep (X<sup>b</sup>Y), mati je homozigotno zdrava. Kolikšna je verjetnost, da bo hči prenašalka?", 1, "Vse hčere dobijo očetov X<sup>b</sup>."],
      ["Kolikšna je verjetnost, da bo otrok deček?", 0.5, "Oče prenese X ali Y z enako verjetnostjo."],
    ]);
    return kolicina({ tezavnost: 3, vrednost: v, tol: 0.001, enota: "", besedilo: `${opis} (Vpiši ulomek ali decimalno število.)`, rezultat: `${T(v, 2)}`, postopek: `<p>${raz}</p>` });
  });
  serija("krvne", 5, (r) => {
    const [m, o, sk, v] = r.izberi([["I<sup>A</sup>i", "I<sup>B</sup>i", "0", 0.25], ["I<sup>A</sup>i", "I<sup>B</sup>i", "AB", 0.25], ["I<sup>A</sup>I<sup>A</sup>", "I<sup>B</sup>i", "AB", 0.5], ["I<sup>A</sup>i", "ii", "A", 0.5], ["I<sup>A</sup>I<sup>B</sup>", "ii", "0", 0], ["I<sup>A</sup>I<sup>B</sup>", "I<sup>A</sup>I<sup>B</sup>", "AB", 0.5]]);
    return kolicina({ tezavnost: 3, vrednost: v, tol: 0.001, enota: "", besedilo: `Starša imata genotipa ${m} in ${o}. Kolikšna je verjetnost, da ima otrok krvno skupino ${sk}?`, rezultat: `${T(v, 2)}`, postopek: `<p>Alela I<sup>A</sup> in I<sup>B</sup> sta kodominantna, i je recesiven. Kombinacije gamet staršev dajo verjetnost ${T(v, 2)}.</p>` });
  });
  serija("hardy", 4, (r) => {
    const q2 = r.izberi([0.01, 0.04, 0.09, 0.16, 0.25, 0.36]), q = Math.sqrt(q2), p = 1 - q;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: 2 * p * q * 100, tol: 0.002, enota: "%", besedilo: `V populaciji v Hardy-Weinbergovem ravnotežju ima ${L(q2 * 100, 0)} % osebkov recesivni fenotip. Kolikšen odstotek je heterozigotov?`, rezultat: `${T(2 * p * q * 100, 1)} %`, postopek: `<p>\\(q^2 = ${L(q2, 2)}\\), \\(q = ${L(q, 2)}\\), \\(p = ${L(p, 2)}\\)</p><p>\\(2pq = 2 \\cdot ${L(p, 2)} \\cdot ${L(q, 2)} = ${L(2 * p * q, 3)}\\)</p>` });
  });
  pojmi([
    ["gen", "Odsek DNA, ki nosi zapis za določeno lastnost."],
    ["alel", "Ena od različic istega gena."],
    ["genotip", "Celota alelov, ki jih ima osebek za določeno lastnost."],
    ["fenotip", "Opazne lastnosti osebka, ki so posledica genotipa in okolja."],
    ["homozigot", "Osebek z dvema enakima aleloma za dani gen."],
    ["heterozigot", "Osebek z dvema različnima aleloma za dani gen."],
    ["dominantni alel", "Alel, ki se izrazi tudi v heterozigotu."],
    ["recesivni alel", "Alel, ki se izrazi le v homozigotu."],
    ["kodominanca", "Dedovanje, pri katerem se v heterozigotu izrazita oba alela, npr. krvna skupina AB."],
    ["nepopolna dominanca", "Heterozigot ima vmesen fenotip, npr. rožnati cvetovi."],
    ["vezani geni", "Geni na istem kromosomu, ki se dedujejo skupaj."],
    ["mutacija", "Trajna sprememba dedne snovi."],
  ]);
}
