import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { F, E } from "../kemija-lib.mjs";
const Fd = 96500;

// [formula, element, oksidacijsko število]
const OKS = [["H2SO4", "S", 6], ["SO2", "S", 4], ["H2S", "S", -2], ["KMnO4", "Mn", 7], ["MnO2", "Mn", 4], ["HNO3", "N", 5], ["NH3", "N", -3], ["NO2", "N", 4], ["N2O", "N", 1], ["K2Cr2O7", "Cr", 6], ["Cr2O3", "Cr", 3], ["H2O2", "O", -1], ["Fe2O3", "Fe", 3], ["FeO", "Fe", 2], ["HClO4", "Cl", 7], ["HClO", "Cl", 1], ["NaClO3", "Cl", 5], ["CO", "C", 2], ["CH4", "C", -4], ["CO2", "C", 4], ["H3PO4", "P", 5], ["Na2S2O3", "S", 2], ["Cl2", "Cl", 0], ["NaH", "H", -1]];
// standardni elektrodni potenciali
const POT = [["Li", "Li^+", -3.04, 1], ["K", "K^+", -2.93, 1], ["Mg", "Mg^2+", -2.37, 2], ["Al", "Al^3+", -1.66, 3], ["Zn", "Zn^2+", -0.76, 2], ["Fe", "Fe^2+", -0.44, 2], ["Ni", "Ni^2+", -0.26, 2], ["Pb", "Pb^2+", -0.13, 2], ["Cu", "Cu^2+", 0.34, 2], ["Ag", "Ag^+", 0.8, 1], ["Au", "Au^3+", 1.5, 3]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("oksidacijsko", 12, (r) => {
    const [f, el, o] = r.izberi(OKS);
    return kolicina({ tezavnost: 1, vrednost: o, enota: "", besedilo: `Kolikšno je oksidacijsko število ${el === "O" ? "kisika" : el === "H" ? "vodika" : `elementa ${el}`} v ${F(f)}?`, rezultat: `${o > 0 ? "+" : ""}${o}`, postopek: `<p>Vsota oksidacijskih števil v nevtralni spojini je 0. ${el === "O" ? "V peroksidih ima kisik −1." : el === "H" ? "V kovinskih hidridih ima vodik −1." : "Kisik ima običajno −2, vodik +1, alkalijske kovine +1."}</p><p>Oksidacijsko število ${el} je ${o > 0 ? "+" : ""}${o}.</p>` });
  });
  serija("galvanski", 7, (r, i) => {
    const a = r.izberi(POT), b = r.izberi(POT);
    if (a === b) return null;
    const [an, ka] = a[2] < b[2] ? [a, b] : [b, a], U = ka[2] - an[2];
    if (i % 2) return izbira({ r, tezavnost: 2, besedilo: `Galvanski člen sestavljata elektrodi ${an[0]}|${F(an[1])} in ${ka[0]}|${F(ka[1])}. Katera kovina je anoda (se oksidira)?`, pravilna: an[0], napacne: [ka[0]], postopek: `<p>Anoda je elektroda z bolj negativnim standardnim potencialom: \\(E°(${an[0]}) = ${L(an[2], 2)}\\) V, \\(E°(${ka[0]}) = ${L(ka[2], 2)}\\) V.</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(U, 3), tol: 0.005, enota: "V", besedilo: `Kolikšna je standardna napetost galvanskega člena iz elektrod ${a[0]}|${F(a[1])} (\\(E° = ${L(a[2], 2)}\\) V) in ${b[0]}|${F(b[1])} (\\(E° = ${L(b[2], 2)}\\) V)?`, rezultat: `${T(U, 2)} V`, postopek: `<p>\\(U = E°_{katoda} - E°_{anoda} = ${L(ka[2], 2)} - (${L(an[2], 2)}) = ${L(U, 2)}\\ \\text{V}\\)</p>` });
  });
  serija("izpodrivanje", 6, (r) => {
    const a = r.izberi(POT.slice(2)), b = r.izberi(POT.slice(2));
    if (a === b) return null;
    const odg = a[2] < b[2] ? "Da" : "Ne";
    return izbira({ r, tezavnost: 2, besedilo: `Ali reagira kovina ${E[a[0]]?.ime ?? a[0]} (${a[0]}) z raztopino, ki vsebuje ione ${F(b[1])}?`, pravilna: odg, napacne: [odg === "Da" ? "Ne" : "Da"], postopek: `<p>Kovina z bolj negativnim potencialom izpodrine iz raztopine ione kovine z bolj pozitivnim. \\(E°(${a[0]}) = ${L(a[2], 2)}\\) V, \\(E°(${b[0]}) = ${L(b[2], 2)}\\) V: ${odg === "Da" ? "reakcija poteče" : "reakcija ne poteče"}.</p>` });
  });
  serija("elektroliza", 7, (r, i) => {
    const [el, ion, , z] = r.izberi(POT.filter(([s]) => ["Cu", "Ag", "Zn", "Ni", "Al", "Pb"].includes(s))), I = r.int(1, 20) / 2, t = r.int(5, 120) * 60;
    const m = (I * t * E[el === "Ni" ? "Fe" : el]?.Ar) / (z * Fd);
    const Ar = { Cu: 63.55, Ag: 107.87, Zn: 65.38, Ni: 58.69, Al: 26.98, Pb: 207.2 }[el];
    const mm = (I * t * Ar) / (z * Fd);
    if (i % 2) return kolicina({ tezavnost: 4, raven: "visja", vrednost: (mm * z * Fd) / (Ar * I) / 60, tol: 0.01, enota: "min", besedilo: `Koliko časa mora teči tok ${T(I, 1)} A, da se pri elektrolizi raztopine z ioni ${F(ion)} izloči ${T(mm, 3)} g kovine ${el}? (\\(F = 96\\,500\\) C/mol, \\(M = ${L(Ar, 2)}\\) g/mol)`, rezultat: `${t / 60} min`, postopek: `<p>\\(n = \\frac{m}{M}\\), potrebni naboj \\(e = z \\cdot n \\cdot F\\), \\(t = \\frac{e}{I}\\).</p><p>\\(t = \\frac{${z} \\cdot ${L(mm, 3)} \\cdot 96\\,500}{${L(Ar, 2)} \\cdot ${L(I, 1)}} \\approx ${t}\\ \\text{s} = ${t / 60}\\ \\text{min}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: mm, tol: 0.01, enota: "g", besedilo: `Skozi raztopino z ioni ${F(ion)} teče tok ${T(I, 1)} A ${t / 60} minut. Koliko gramov kovine ${el} se izloči na katodi? (\\(F = 96\\,500\\) C/mol, \\(M = ${L(Ar, 2)}\\) g/mol)`, rezultat: `${T(mm, 3)} g`, postopek: `<p>\\(e = It = ${L(I, 1)} \\cdot ${t} = ${L(I * t, 0)}\\ \\text{C}\\)</p><p>\\(n(e^-) = \\frac{e}{F} \\approx ${L((I * t) / Fd, 4)}\\ \\text{mol}\\), \\(n(\\text{${el}}) = \\frac{n(e^-)}{${z}}\\)</p><p>\\(m = nM \\approx ${L(mm, 3)}\\ \\text{g}\\)</p>` });
  });
  serija("oks-red", 6, (r) => {
    const [en, oks, red] = r.izberi([
      [`${F("Zn")} + ${F("Cu^2+")} → ${F("Zn^2+")} + ${F("Cu")}`, "Zn", "Cu<sup>2+</sup>"],
      [`2 ${F("Na")} + ${F("Cl2")} → 2 NaCl`, "Na", "Cl<sub>2</sub>"],
      [`${F("Fe2O3")} + 3 CO → 2 Fe + 3 ${F("CO2")}`, "CO", "Fe<sub>2</sub>O<sub>3</sub>"],
      [`${F("Mg")} + 2 ${F("H^+")} → ${F("Mg^2+")} + ${F("H2")}`, "Mg", "H<sup>+</sup>"],
      [`${F("Cl2")} + 2 ${F("Br^-")} → 2 ${F("Cl^-")} + ${F("Br2")}`, "Br<sup>−</sup>", "Cl<sub>2</sub>"],
      [`2 ${F("H2")} + ${F("O2")} → 2 ${F("H2O")}`, "H<sub>2</sub>", "O<sub>2</sub>"],
    ]);
    const kaj = r.izberi(["oks", "red"]);
    const prav = kaj === "oks" ? red : oks;
    return izbira({ r, tezavnost: 2, besedilo: `Kateri delec je ${kaj === "oks" ? "oksidant (oksidacijsko sredstvo)" : "reducent (redukcijsko sredstvo)"} v reakciji ${en}?`, pravilna: prav, napacne: [kaj === "oks" ? oks : red, ...["e<sup>−</sup>", "voda"]], postopek: `<p>Reducent (${oks}) odda elektrone in se oksidira, oksidant (${red}) jih sprejme in se reducira.</p>` });
  });
  serija("elektroni", 5, (r) => {
    const [pol, n, raz] = r.izberi([[`${F("MnO4^-")} → ${F("Mn^2+")}`, 5, "Mn: +7 → +2"], [`${F("Cr2O7^2-")} → 2 ${F("Cr^3+")}`, 6, "2 Cr: +6 → +3"], [`${F("Fe^2+")} → ${F("Fe^3+")}`, 1, "Fe: +2 → +3"], [`${F("NO3^-")} → NO`, 3, "N: +5 → +2"], [`${F("SO4^2-")} → ${F("SO2")}`, 2, "S: +6 → +4"], [`${F("Cl2")} → 2 ${F("Cl^-")}`, 2, "2 Cl: 0 → −1"]]);
    return kolicina({ tezavnost: 3, vrednost: n, enota: "", besedilo: `Koliko elektronov se izmenja v polreakciji ${pol}?`, rezultat: `${n}`, postopek: `<p>Sprememba oksidacijskega števila: ${raz}, torej ${n} ${n === 1 ? "elektron" : n === 2 ? "elektrona" : n < 5 ? "elektroni" : "elektronov"}.</p>` });
  });
  serija("visja-urejanje", 3, (r) => {
    const [en, x, raz] = r.izberi([
      [`2 ${F("MnO4^-")} + x ${F("Fe^2+")} + 16 ${F("H^+")} → 2 ${F("Mn^2+")} + x ${F("Fe^3+")} + 8 ${F("H2O")}`, 10, "Vsak Mn sprejme 5 e⁻, vsak Fe odda 1 e⁻; 2 · 5 = 10."],
      [`${F("Cr2O7^2-")} + x ${F("Fe^2+")} + 14 ${F("H^+")} → 2 ${F("Cr^3+")} + x ${F("Fe^3+")} + 7 ${F("H2O")}`, 6, "Dva Cr sprejmeta 2 · 3 = 6 e⁻."],
      [`3 Cu + x ${F("HNO3")} → 3 ${F("Cu(NO3)2")} + 2 NO + 4 ${F("H2O")}`, 8, "Šteti atome N: 3 · 2 + 2 = 8."],
    ]);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: x, enota: "", besedilo: `Uredi redoks enačbo: ${en}. Koliko je x?`, rezultat: `x = ${x}`, postopek: `<p>Število oddanih elektronov mora biti enako številu sprejetih. ${raz}</p>` });
  });
  pojmi([
    ["oksidacija", "Oddajanje elektronov; oksidacijsko število se poveča."],
    ["redukcija", "Sprejemanje elektronov; oksidacijsko število se zmanjša."],
    ["oksidant", "Snov, ki sprejema elektrone in se pri tem reducira."],
    ["reducent", "Snov, ki oddaja elektrone in se pri tem oksidira."],
    ["anoda", "Elektroda, na kateri poteka oksidacija."],
    ["katoda", "Elektroda, na kateri poteka redukcija."],
    ["elektroliza", "Razkroj snovi z električnim tokom."],
    ["korozija", "Postopno razkrajanje kovin zaradi redoks reakcij z okolico."],
  ]);
}
