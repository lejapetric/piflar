import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { molska, F } from "../kemija-lib.mjs";
const TOPLJENCI = [["NaCl", "natrijev klorid"], ["NaOH", "natrijev hidroksid"], ["KCl", "kalijev klorid"], ["C6H12O6", "glukoza"], ["CuSO4", "bakrov(II) sulfat"], ["KNO3", "kalijev nitrat"], ["H2SO4", "žveplova(VI) kislina"], ["HCl", "klorovodik"], ["Na2CO3", "natrijev karbonat"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("masni-delez", 7, (r, i) => {
    const [f, ime] = r.izberi(TOPLJENCI), mt = r.int(1, 100), mv = r.int(50, 500), w = mt / (mt + mv);
    if (i % 2) {
      const mr = r.int(50, 500), ww = r.int(1, 40) / 100;
      return kolicina({ tezavnost: 1, vrednost: mr * ww, enota: "g", besedilo: `Koliko gramov snovi ${F(f)} (${ime}) potrebujemo za ${mr} g raztopine z masnim deležem ${L(ww * 100, 0)} %?`, rezultat: `${T(mr * ww, 2)} g`, postopek: `<p>\\(m_t = w \\cdot m_r = ${L(ww, 2)} \\cdot ${mr} = ${L(mr * ww, 2)}\\ \\text{g}\\)</p>` });
    }
    return kolicina({ tezavnost: 1, vrednost: w * 100, tol: 0.005, enota: "%", besedilo: `V ${mv} g vode raztopimo ${mt} g snovi ${F(f)} (${ime}). Kolikšen je masni delež topljenca?`, rezultat: `${T(w * 100, 2)} %`, postopek: `<p>\\(w = \\frac{m_t}{m_t + m_v} = \\frac{${mt}}{${mt + mv}} \\approx ${L(w, 4)} = ${L(w * 100, 2)}\\,\\%\\)</p>` });
  });
  serija("koncentracija", 8, (r, i) => {
    const [f, ime] = r.izberi(TOPLJENCI), M = molska(f), m = r.int(1, 100), V = r.int(1, 20) * 50;
    const c = m / M / (V / 1000);
    if (i % 3 === 2) {
      const cc = r.int(1, 40) / 20, VV = r.int(1, 20) * 50;
      return kolicina({ tezavnost: 2, vrednost: cc * (VV / 1000) * M, tol: 0.01, enota: "g", besedilo: `Koliko gramov ${F(f)} (${ime}) potrebujemo za ${VV} mL raztopine s koncentracijo ${L(cc, 2)} mol/L?`, rezultat: `${T(cc * (VV / 1000) * M, 2)} g`, postopek: `<p>\\(n = cV = ${L(cc, 2)} \\cdot ${L(VV / 1000, 3)} = ${L(cc * VV / 1000, 4)}\\ \\text{mol}\\), \\(m = nM \\approx ${L(cc * (VV / 1000) * M, 2)}\\ \\text{g}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: c, tol: 0.01, enota: "mol/L", besedilo: `${m} g snovi ${F(f)} (${ime}) raztopimo in razredčimo do ${V} mL. Kolikšna je množinska koncentracija?`, rezultat: `${T(c, 3)} mol/L`, postopek: `<p>\\(n = \\frac{${m}}{${L(M, 2)}} \\approx ${L(m / M, 4)}\\ \\text{mol}\\)</p><p>\\(c = \\frac{n}{V} = \\frac{${L(m / M, 4)}}{${L(V / 1000, 3)}} \\approx ${L(c, 3)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("redcenje", 7, (r, i) => {
    const c1 = r.int(2, 40) / 10, V1 = r.int(1, 20) * 10, c2 = r.int(1, c1 * 10 - 1) / 10;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (c1 * V1) / c2, tol: 0.01, enota: "mL", besedilo: `Do kolikšne prostornine moramo razredčiti ${V1} mL raztopine s koncentracijo ${L(c1, 1)} mol/L, da dobimo koncentracijo ${L(c2, 1)} mol/L?`, rezultat: `${T((c1 * V1) / c2, 1)} mL`, postopek: `<p>Množina topljenca se ne spremeni: \\(c_1V_1 = c_2V_2\\).</p><p>\\(V_2 = \\frac{${L(c1, 1)} \\cdot ${V1}}{${L(c2, 1)}} \\approx ${L((c1 * V1) / c2, 1)}\\ \\text{mL}\\)</p>` });
    const V2 = r.int(2, 20) * 50;
    return kolicina({ tezavnost: 2, vrednost: (c1 * V1) / V2, tol: 0.01, enota: "mol/L", besedilo: `${V1} mL raztopine s koncentracijo ${L(c1, 1)} mol/L razredčimo z vodo do ${V2} mL. Kolikšna je nova koncentracija?`, rezultat: `${T((c1 * V1) / V2, 3)} mol/L`, postopek: `<p>\\(c_2 = \\frac{c_1V_1}{V_2} = \\frac{${L(c1, 1)} \\cdot ${V1}}{${V2}} \\approx ${L((c1 * V1) / V2, 3)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("mesanje", 5, (r) => {
    const m1 = r.int(50, 300), w1 = r.int(5, 40), m2 = r.int(50, 300), w2 = r.int(1, 30);
    const w = (m1 * w1 + m2 * w2) / (m1 + m2);
    return kolicina({ tezavnost: 3, vrednost: w, tol: 0.005, enota: "%", besedilo: `Zmešamo ${m1} g ${w1}-odstotne in ${m2} g ${w2}-odstotne raztopine iste snovi. Kolikšen je masni delež v novi raztopini?`, rezultat: `${T(w, 2)} %`, postopek: `<p>\\(w = \\frac{m_1w_1 + m_2w_2}{m_1 + m_2} = \\frac{${m1} \\cdot ${w1} + ${m2} \\cdot ${w2}}{${m1 + m2}} \\approx ${L(w, 2)}\\,\\%\\)</p>` });
  });
  serija("gostota", 4, (r) => {
    const [f] = r.izberi([["H2SO4"], ["HCl"], ["HNO3"], ["NaOH"]]), w = r.int(10, 60) / 100, rho = r.int(105, 180) / 100, M = molska(f);
    const c = (w * rho * 1000) / M;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: c, tol: 0.01, enota: "mol/L", besedilo: `Raztopina ${F(f)} ima masni delež ${L(w * 100, 0)} % in gostoto ${L(rho, 2)} g/mL. Kolikšna je množinska koncentracija?`, rezultat: `${T(c, 2)} mol/L`, postopek: `<p>Vzemimo 1 L raztopine: \\(m_r = ${L(rho * 1000, 0)}\\ \\text{g}\\), \\(m_t = ${L(w, 2)} \\cdot ${L(rho * 1000, 0)} = ${L(w * rho * 1000, 1)}\\ \\text{g}\\).</p><p>\\(c = \\frac{${L(w * rho * 1000, 1)}}{${L(M, 2)}} \\approx ${L(c, 2)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("topnost", 5, (r, i) => {
    const s = r.int(10, 200), mv = r.int(50, 500);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (s * mv) / 100, tol: 0.01, enota: "g", besedilo: `Topnost snovi pri 20 °C je ${s} g na 100 g vode. Koliko snovi se največ raztopi v ${mv} g vode?`, rezultat: `${T((s * mv) / 100, 1)} g`, postopek: `<p>\\(m = \\frac{${s}}{100} \\cdot ${mv} = ${L((s * mv) / 100, 1)}\\ \\text{g}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: (100 * s) / (100 + s), tol: 0.005, enota: "%", besedilo: `Topnost snovi je ${s} g na 100 g vode. Kolikšen je masni delež snovi v nasičeni raztopini?`, rezultat: `${T((100 * s) / (100 + s), 2)} %`, postopek: `<p>\\(w = \\frac{${s}}{100 + ${s}} \\approx ${L((100 * s) / (100 + s), 2)}\\,\\%\\)</p>` });
  });
  serija("kristalizacija", 3, (r) => {
    const s1 = r.int(60, 200), s2 = r.int(10, s1 - 20), mv = r.int(1, 5) * 100;
    const m = ((s1 - s2) * mv) / 100;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: m, tol: 0.01, enota: "g", besedilo: `Topnost soli je pri 80 °C ${s1} g, pri 20 °C pa ${s2} g na 100 g vode. Nasičeno raztopino z ${mv} g vode ohladimo z 80 °C na 20 °C. Koliko soli se izloči?`, rezultat: `${T(m, 1)} g`, postopek: `<p>Pri 80 °C je raztopljenih \\(${L((s1 * mv) / 100, 1)}\\) g, pri 20 °C ostane \\(${L((s2 * mv) / 100, 1)}\\) g.</p><p>Izloči se \\(${L(m, 1)}\\ \\text{g}\\).</p>` });
  });
  serija("titracija", 4, (r) => {
    const cb = r.int(1, 20) / 20, Vb = r.int(50, 300) / 10, Va = r.int(10, 30);
    const ca = (cb * Vb) / Va;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: ca, tol: 0.01, enota: "mol/L", besedilo: `Za nevtralizacijo ${Va} mL raztopine HCl porabimo ${L(Vb, 1)} mL raztopine NaOH s koncentracijo ${L(cb, 2)} mol/L. Kolikšna je koncentracija HCl?`, rezultat: `${T(ca, 3)} mol/L`, postopek: `<p>HCl + NaOH → NaCl + H<sub>2</sub>O (razmerje 1 : 1): \\(c_aV_a = c_bV_b\\).</p><p>\\(c_a = \\frac{${L(cb, 2)} \\cdot ${L(Vb, 1)}}{${Va}} \\approx ${L(ca, 3)}\\ \\text{mol/L}\\)</p>` });
  });
  pojmi([
    ["topljenec", "Snov, ki je v raztopini raztopljena, običajno v manjši količini."],
    ["topilo", "Snov, v kateri raztapljamo, običajno v večji količini, npr. voda."],
    ["nasičena raztopina", "Raztopina, v kateri se pri dani temperaturi ne raztopi več topljenca."],
    ["topnost", "Največja masa snovi, ki se pri dani temperaturi raztopi v 100 g topila."],
    ["množinska koncentracija", "Množina topljenca v litru raztopine."],
    ["masni delež", "Razmerje med maso topljenca in maso raztopine."],
    ["hidratacija", "Obdajanje ionov ali molekul topljenca z molekulami vode."],
    ["elektrolit", "Snov, katere raztopina ali talina prevaja električni tok zaradi ionov."],
  ]);
}
