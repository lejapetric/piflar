import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { molska, F, Vm } from "../kemija-lib.mjs";

// [reaktanti [[koef, formula]...], produkti, ime]
const ENACBE = [
  [[[2, "H2"], [1, "O2"]], [[2, "H2O"]], "gorenje vodika"],
  [[[1, "CH4"], [2, "O2"]], [[1, "CO2"], [2, "H2O"]], "gorenje metana"],
  [[[1, "C3H8"], [5, "O2"]], [[3, "CO2"], [4, "H2O"]], "gorenje propana"],
  [[[2, "Mg"], [1, "O2"]], [[2, "MgO"]], "gorenje magnezija"],
  [[[1, "CaCO3"]], [[1, "CaO"], [1, "CO2"]], "termični razpad apnenca"],
  [[[1, "N2"], [3, "H2"]], [[2, "NH3"]], "sinteza amoniaka"],
  [[[2, "Na"], [1, "Cl2"]], [[2, "NaCl"]], "nastanek natrijevega klorida"],
  [[[4, "Fe"], [3, "O2"]], [[2, "Fe2O3"]], "oksidacija železa"],
  [[[1, "Zn"], [2, "HCl"]], [[1, "ZnCl2"], [1, "H2"]], "cink in klorovodikova kislina"],
  [[[2, "KClO3"]], [[2, "KCl"], [3, "O2"]], "razpad kalijevega klorata"],
  [[[1, "C6H12O6"], [6, "O2"]], [[6, "CO2"], [6, "H2O"]], "celično dihanje"],
  [[[2, "Al"], [3, "Cl2"]], [[2, "AlCl3"]], "aluminij in klor"],
  [[[1, "NaOH"], [1, "HCl"]], [[1, "NaCl"], [1, "H2O"]], "nevtralizacija"],
  [[[2, "C2H6"], [7, "O2"]], [[4, "CO2"], [6, "H2O"]], "gorenje etana"],
  [[[1, "Fe2O3"], [3, "CO"]], [[2, "Fe"], [3, "CO2"]], "redukcija železove rude"],
];
const zapis = (str) => str.map(([k, f]) => `${k > 1 ? k + " " : ""}${F(f)}`).join(" + ");
const enacba = ([re, pr]) => `${zapis(re)} → ${zapis(pr)}`;
const vse = ([re, pr]) => [...re, ...pr];

export default function ({ serija, pojmi, vprasanja }) {
  serija("koeficient", 8, (r) => {
    const e = r.izberi(ENACBE), snovi = vse(e), j = r.int(0, snovi.length - 1), [k, f] = snovi[j];
    const s = (arr) => arr.map(([kk, ff], i) => `${snovi.indexOf(arr[i]) === j ? "<strong>x</strong> " : kk > 1 ? kk + " " : ""}${F(ff)}`).join(" + ");
    return kolicina({ tezavnost: 1, vrednost: k, enota: "", besedilo: `Uredi enačbo (${e[2]}): ${s(e[0])} → ${s(e[1])}. Koliko je x?`, rezultat: `${k}`, postopek: `<p>Urejena enačba: ${enacba(e)}.</p><p>Na obeh straneh mora biti enako število atomov vsakega elementa.</p>` });
  });
  serija("masa-produkta", 8, (r, i) => {
    const e = r.izberi(ENACBE), [k1, f1] = r.izberi(e[0]), [k2, f2] = r.izberi(e[1]);
    const m1 = r.int(1, 200), n1 = m1 / molska(f1), n2 = (n1 * k2) / k1, m2 = n2 * molska(f2);
    return kolicina({ tezavnost: 2, vrednost: m2, tol: 0.01, enota: "g", besedilo: `Pri reakciji ${enacba(e)} zreagira ${m1} g ${F(f1)}. Koliko gramov ${F(f2)} nastane?`, rezultat: `${T(m2, 2)} g`, postopek: `<p>\\(n(\\text{${f1}}) = \\frac{${m1}}{${L(molska(f1), 2)}} \\approx ${L(n1, 4)}\\ \\text{mol}\\)</p><p>Razmerje koeficientov ${k1} : ${k2}, \\(n(\\text{${f2}}) = ${L(n1, 4)} \\cdot \\frac{${k2}}{${k1}} \\approx ${L(n2, 4)}\\ \\text{mol}\\)</p><p>\\(m = nM \\approx ${L(n2, 4)} \\cdot ${L(molska(f2), 2)} \\approx ${L(m2, 2)}\\ \\text{g}\\)</p>` });
  });
  serija("masa-reaktanta", 5, (r) => {
    const e = r.izberi(ENACBE), [k1, f1] = r.izberi(e[0]), [k2, f2] = r.izberi(e[1]);
    const m2 = r.int(1, 200), n2 = m2 / molska(f2), n1 = (n2 * k1) / k2, m1 = n1 * molska(f1);
    return kolicina({ tezavnost: 2, vrednost: m1, tol: 0.01, enota: "g", besedilo: `Koliko gramov ${F(f1)} potrebujemo, da pri reakciji ${enacba(e)} nastane ${m2} g ${F(f2)}?`, rezultat: `${T(m1, 2)} g`, postopek: `<p>\\(n(\\text{${f2}}) = \\frac{${m2}}{${L(molska(f2), 2)}} \\approx ${L(n2, 4)}\\ \\text{mol}\\), \\(n(\\text{${f1}}) = ${L(n2, 4)} \\cdot \\frac{${k1}}{${k2}} \\approx ${L(n1, 4)}\\ \\text{mol}\\)</p><p>\\(m \\approx ${L(m1, 2)}\\ \\text{g}\\)</p>` });
  });
  serija("plin", 5, (r) => {
    const e = r.izberi(ENACBE.filter(([, pr]) => pr.some(([, f]) => ["CO2", "H2", "O2", "NH3"].includes(f)))), [k2, f2] = e[1].find(([, f]) => ["CO2", "H2", "O2", "NH3"].includes(f)), [k1, f1] = e[0][0];
    const m1 = r.int(1, 100), V = ((m1 / molska(f1)) * k2 * Vm) / k1;
    return kolicina({ tezavnost: 3, vrednost: V, tol: 0.01, enota: "L", besedilo: `Pri reakciji ${enacba(e)} zreagira ${m1} g ${F(f1)}. Koliko litrov ${F(f2)} nastane pri normalnih pogojih?`, rezultat: `${T(V, 2)} L`, postopek: `<p>\\(n(\\text{${f1}}) = \\frac{${m1}}{${L(molska(f1), 2)}}\\), \\(n(\\text{${f2}}) = n(\\text{${f1}}) \\cdot \\frac{${k2}}{${k1}}\\)</p><p>\\(V = n \\cdot 22{,}4\\ \\text{L/mol} \\approx ${L(V, 2)}\\ \\text{L}\\)</p>` });
  });
  serija("izkoristek", 5, (r) => {
    const e = r.izberi(ENACBE), [k1, f1] = e[0][0], [k2, f2] = e[1][0];
    const m1 = r.int(10, 200), mt = ((m1 / molska(f1)) * k2 * molska(f2)) / k1, eta = r.int(50, 98) / 100, md = mt * eta;
    return kolicina({ tezavnost: 3, vrednost: eta * 100, tol: 0.01, enota: "%", besedilo: `Pri reakciji ${enacba(e)} iz ${m1} g ${F(f1)} dobimo ${L(md, 2).replace("{,}", ",")} g ${F(f2)}. Kolikšen je izkoristek reakcije?`, rezultat: `${T(eta * 100, 1)} %`, postopek: `<p>Teoretična masa: \\(m_t = \\frac{${m1}}{${L(molska(f1), 2)}} \\cdot \\frac{${k2}}{${k1}} \\cdot ${L(molska(f2), 2)} \\approx ${L(mt, 2)}\\ \\text{g}\\)</p><p>\\(\\eta = \\frac{${L(md, 2)}}{${L(mt, 2)}} \\approx ${L(eta * 100, 1)}\\,\\%\\)</p>` });
  });
  serija("omejujoci", 5, (r) => {
    const e = r.izberi(ENACBE.filter(([re]) => re.length === 2)), [[ka, fa], [kb, fb]] = e[0], [kp, fp] = e[1][0];
    const ma = r.int(5, 100), mb = r.int(5, 100), na = ma / molska(fa), nb = mb / molska(fb);
    const omej = na / ka < nb / kb ? fa : fb, np = (Math.min(na / ka, nb / kb)) * kp, mp = np * molska(fp);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: mp, tol: 0.01, enota: "g", besedilo: `Pri reakciji ${enacba(e)} zmešamo ${ma} g ${F(fa)} in ${mb} g ${F(fb)}. Koliko gramov ${F(fp)} lahko največ nastane?`, rezultat: `${T(mp, 2)} g (omejujoči reaktant je ${F(omej)})`, postopek: `<p>\\(n(\\text{${fa}}) = ${L(na, 4)}\\ \\text{mol}\\), \\(n(\\text{${fb}}) = ${L(nb, 4)}\\ \\text{mol}\\)</p><p>Delimo s koeficientoma: \\(${L(na / ka, 4)}\\) in \\(${L(nb / kb, 4)}\\). Manjša vrednost določa omejujoči reaktant (${omej}).</p><p>\\(m = ${L(Math.min(na / ka, nb / kb), 4)} \\cdot ${kp} \\cdot ${L(molska(fp), 2)} \\approx ${L(mp, 2)}\\ \\text{g}\\)</p>` });
  });
  serija("ohranitev-mase", 4, (r) => {
    const a = r.int(5, 80), b = r.int(5, 80), c = r.int(1, a + b - 1);
    return kolicina({ tezavnost: 1, vrednost: a + b - c, enota: "g", besedilo: `V zaprti posodi zreagira ${a} g snovi A z ${b} g snovi B. Nastaneta snovi C in D, mase C je ${c} g. Kolikšna je masa D?`, rezultat: `${a + b - c} g`, postopek: `<p>Zakon o ohranitvi mase: \\(m_A + m_B = m_C + m_D\\), \\(m_D = ${a} + ${b} - ${c} = ${a + b - c}\\ \\text{g}\\)</p>` });
  });
  serija("vrsta", 6, (r) => {
    const [en, odg] = r.izberi([
      [`${F("CaCO3")} → ${F("CaO")} + ${F("CO2")}`, "razkroj (analiza)"], [`2 ${F("H2")} + ${F("O2")} → 2 ${F("H2O")}`, "sinteza"],
      [`${F("Zn")} + ${F("CuSO4")} → ${F("ZnSO4")} + ${F("Cu")}`, "izpodrivanje"], [`${F("AgNO3")} + ${F("NaCl")} → ${F("AgCl")} + ${F("NaNO3")}`, "obarjanje (dvojna zamenjava)"],
      [`${F("HCl")} + ${F("NaOH")} → ${F("NaCl")} + ${F("H2O")}`, "nevtralizacija"], [`2 ${F("H2O2")} → 2 ${F("H2O")} + ${F("O2")}`, "razkroj (analiza)"],
      [`${F("Fe")} + ${F("S")} → ${F("FeS")}`, "sinteza"], [`${F("Mg")} + 2 ${F("HCl")} → ${F("MgCl2")} + ${F("H2")}`, "izpodrivanje"],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: `Katera vrsta reakcije je ${en}?`, pravilna: odg, napacne: ["sinteza", "razkroj (analiza)", "izpodrivanje", "nevtralizacija", "obarjanje (dvojna zamenjava)"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}: ${{ "sinteza": "iz dveh snovi nastane ena", "razkroj (analiza)": "iz ene snovi nastane več snovi", "izpodrivanje": "bolj reaktiven element izpodrine manj reaktivnega iz spojine", "nevtralizacija": "kislina in baza dasta sol in vodo", "obarjanje (dvojna zamenjava)": "ioni zamenjajo partnerja, nastane slabo topna snov" }[odg]}.</p>` });
  });
  serija("energija", 4, (r) => {
    const dH = r.izberi([-286, -890, -2220, -394, -92, 178, 131, -57]), n = r.int(1, 10) / 2;
    return kolicina({ tezavnost: 3, vrednost: dH * n, enota: "kJ", besedilo: `Reakcijska entalpija reakcije je \\(\\Delta H = ${dH}\\) kJ (na en mol pretvorb, kot jo opisuje enačba). Koliko toplote se ${dH < 0 ? "sprosti" : "porabi"} pri ${L(n, 1)} mol pretvorb? (Vpiši \\(\\Delta H\\) s predznakom.)`, rezultat: `${T(dH * n, 1)} kJ (${dH < 0 ? "eksotermna" : "endotermna"})`, postopek: `<p>\\(\\Delta H = ${L(n, 1)} \\cdot (${dH}) = ${L(dH * n, 1)}\\ \\text{kJ}\\)</p>` });
  });
  pojmi([
    ["reaktant", "Snov, ki vstopa v kemijsko reakcijo."],
    ["produkt", "Snov, ki nastane pri kemijski reakciji."],
    ["stehiometrijski koeficient", "Število pred formulo v urejeni enačbi, ki pove razmerje množin snovi.", { brezVpisa: true }],
    ["omejujoči reaktant", "Reaktant, ki se pri reakciji prvi porabi in določa množino produkta."],
    ["eksotermna reakcija", "Reakcija, pri kateri se toplota sprošča v okolico."],
    ["endotermna reakcija", "Reakcija, ki iz okolice porablja toploto."],
    ["izkoristek reakcije", "Razmerje med dejansko in teoretično maso produkta."],
  ]);
}
