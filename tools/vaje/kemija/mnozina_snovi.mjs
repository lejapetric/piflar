import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { SPOJINE, E, molska, sestava, F, NA, Vm } from "../kemija-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("molska-masa", 8, (r) => {
    const [f, ime] = r.izberi(SPOJINE), M = molska(f), s = sestava(f);
    return kolicina({ tezavnost: 1, vrednost: zaokrozi(M, 2), tol: 0.003, enota: "g/mol", besedilo: `Izračunaj molsko maso spojine ${F(f)} (${ime}).`, rezultat: `${T(M, 2)} g/mol`, postopek: `<p>\\(M = ${Object.entries(s).map(([e, n]) => `${n > 1 ? `${n} \\cdot ` : ""}${L(E[e].Ar, 2)}`).join(" + ")} \\approx ${L(M, 2)}\\ \\text{g/mol}\\)</p>` });
  });
  serija("mol-iz-mase", 7, (r, i) => {
    const [f, ime] = r.izberi(SPOJINE), M = molska(f), m = r.int(1, 500) / (i % 2 ? 1 : 10);
    return kolicina({ tezavnost: 1, vrednost: m / M, enota: "mol", besedilo: `Koliko molov je ${L(m, 1)} g snovi ${F(f)} (${ime})?`, rezultat: `${T(m / M, 4)} mol`, postopek: `<p>\\(M(${f.replace(/(\d+)/g, "_{$1}")}) = ${L(M, 2)}\\ \\text{g/mol}\\)</p><p>\\(n = \\frac{m}{M} = \\frac{${L(m, 1)}}{${L(M, 2)}} \\approx ${L(m / M, 4)}\\ \\text{mol}\\)</p>` });
  });
  serija("masa-iz-mol", 6, (r) => {
    const [f, ime] = r.izberi(SPOJINE), M = molska(f), n = r.int(1, 100) / 20;
    return kolicina({ tezavnost: 1, vrednost: n * M, enota: "g", besedilo: `Kolikšna je masa ${L(n, 2)} mol snovi ${F(f)} (${ime})?`, rezultat: `${T(n * M, 2)} g`, postopek: `<p>\\(m = nM = ${L(n, 2)} \\cdot ${L(M, 2)} \\approx ${L(n * M, 2)}\\ \\text{g}\\)</p>` });
  });
  serija("delci", 7, (r, i) => {
    const [f, ime] = r.izberi(SPOJINE), M = molska(f), m = r.int(1, 200);
    const n = m / M, N = n * NA;
    if (i % 2) {
      const s = sestava(f), [el, k] = r.izberi(Object.entries(s));
      return kolicina({ tezavnost: 3, vrednost: N * k, enota: "", besedilo: `Koliko atomov ${E[el].ime === "kisik" ? "kisika" : el} je v ${m} g snovi ${F(f)}? (\\(N_A = 6{,}02 \\cdot 10^{23}\\ \\text{mol}^{-1}\\); vpiši npr. 1,2e23)`, rezultat: `\\(${sci(N * k)}\\)`, postopek: `<p>\\(n = \\frac{${m}}{${L(M, 2)}} \\approx ${L(n, 4)}\\ \\text{mol}\\) molekul (formulskih enot), v vsaki je ${k} ${k === 1 ? "atom" : "atomov"} ${el}.</p><p>\\(N = ${k} \\cdot n \\cdot N_A \\approx ${sci(N * k)}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: N, enota: "", besedilo: `Koliko molekul (formulskih enot) je v ${m} g snovi ${F(f)}? (\\(N_A = 6{,}02 \\cdot 10^{23}\\ \\text{mol}^{-1}\\); vpiši npr. 3,3e23)`, rezultat: `\\(${sci(N)}\\)`, postopek: `<p>\\(N = \\frac{m}{M}N_A = \\frac{${m}}{${L(M, 2)}} \\cdot 6{,}02 \\cdot 10^{23} \\approx ${sci(N)}\\)</p>` });
  });
  serija("plin-volumen", 6, (r, i) => {
    const [f, ime] = r.izberi([["CO2", "ogljikov dioksid"], ["O2", "kisik"], ["N2", "dušik"], ["H2", "vodik"], ["NH3", "amoniak"], ["CH4", "metan"], ["Cl2", "klor"], ["SO2", "žveplov dioksid"]]);
    const M = molska(f);
    if (i % 2) {
      const V = r.int(1, 100);
      return kolicina({ tezavnost: 2, vrednost: (V / Vm) * M, enota: "g", besedilo: `Kolikšna je masa ${V} L plina ${F(f)} (${ime}) pri normalnih pogojih? (\\(V_m = 22{,}4\\) L/mol)`, rezultat: `${T((V / Vm) * M, 2)} g`, postopek: `<p>\\(n = \\frac{V}{V_m} = \\frac{${V}}{22{,}4} \\approx ${L(V / Vm, 4)}\\ \\text{mol}\\)</p><p>\\(m = nM \\approx ${L((V / Vm) * M, 2)}\\ \\text{g}\\)</p>` });
    }
    const m = r.int(1, 200);
    return kolicina({ tezavnost: 2, vrednost: (m / M) * Vm, enota: "L", besedilo: `Kolikšno prostornino zavzame ${m} g plina ${F(f)} (${ime}) pri normalnih pogojih? (\\(V_m = 22{,}4\\) L/mol)`, rezultat: `${T((m / M) * Vm, 2)} L`, postopek: `<p>\\(n = \\frac{${m}}{${L(M, 2)}} \\approx ${L(m / M, 4)}\\ \\text{mol}\\), \\(V = nV_m \\approx ${L((m / M) * Vm, 2)}\\ \\text{L}\\)</p>` });
  });
  serija("masni-delez", 7, (r) => {
    const [f, ime] = r.izberi(SPOJINE), s = sestava(f), [el, k] = r.izberi(Object.entries(s)), M = molska(f), w = (k * E[el].Ar) / M;
    return kolicina({ tezavnost: 2, vrednost: w * 100, tol: 0.005, enota: "%", besedilo: `Kolikšen je masni delež elementa ${E[el].ime} (${el}) v spojini ${F(f)}?`, rezultat: `${T(w * 100, 2)} %`, postopek: `<p>\\(w(${el}) = \\frac{${k} \\cdot A_r(${el})}{M_r} = \\frac{${k} \\cdot ${L(E[el].Ar, 2)}}{${L(M, 2)}} \\approx ${L(w, 4)} = ${L(w * 100, 2)}\\,\\%\\)</p>` });
  });
  serija("empiricna", 5, (r) => {
    const [f, raz] = r.izberi([["CH2O", "C : H : O = 1 : 2 : 1"], ["CH4", "C : H = 1 : 4"], ["NO2", "N : O = 1 : 2"], ["Fe2O3", "Fe : O = 2 : 3"], ["C2H6O", "C : H : O = 2 : 6 : 1"], ["SO3", "S : O = 1 : 3"], ["Na2SO4", "Na : S : O = 2 : 1 : 4"]]);
    const s = sestava(f), M = molska(f);
    const del = Object.entries(s).map(([e, n]) => [e, (100 * n * E[e].Ar) / M]);
    return izbira({ r, tezavnost: 3, besedilo: `Spojina vsebuje ${del.map(([e, w]) => `${L(w, 1).replace("{,}", ",")} % ${e}`).join(", ")} (masni deleži). Katera je njena empirična formula?`, pravilna: F(f), napacne: { CH2O: ["C2HO", "CHO2", "CH4O"], CH4: ["CH3", "C2H4", "CH2"], NO2: ["N2O", "NO", "N2O3"], Fe2O3: ["FeO", "Fe3O4", "FeO2"], C2H6O: ["CH3O", "C2H4O", "CH4O"], SO3: ["SO2", "S2O3", "SO4"], Na2SO4: ["NaSO4", "Na2SO3", "Na2S2O3"] }[f].map(F), postopek: `<p>Deleže delimo z relativnimi atomskimi masami in razmerje okrajšamo na najmanjša cela števila: ${del.map(([e, w]) => `\\(${e}: \\frac{${L(w, 1)}}{${L(E[e].Ar, 2)}} \\approx ${L(w / E[e].Ar, 3)}\\)`).join(", ")}.</p><p>Razmerje ${raz}.</p>` });
  });
  serija("molekulska", 3, (r) => {
    const [emp, k, ime] = r.izberi([["CH2O", 6, "glukoza"], ["CH", 6, "benzen"], ["CH2", 4, "buten"], ["C2H5", 2, "butan"], ["NO2", 2, "didušikov tetraoksid"]]);
    const M = molska(emp) * k;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: k, enota: "", besedilo: `Empirična formula spojine je ${F(emp)}, molska masa pa ${L(M, 1)} g/mol. Kolikokrat je molekulska formula »večja« od empirične? (Vpiši faktor.)`, rezultat: `${k} (${ime})`, postopek: `<p>\\(M(${emp.replace(/(\d+)/g, "_{$1}")}) = ${L(molska(emp), 2)}\\ \\text{g/mol}\\), \\(\\frac{${L(M, 1)}}{${L(molska(emp), 2)}} \\approx ${k}\\)</p>` });
  });
  serija("kristalna-voda", 3, (r) => {
    const x = r.izberi([5, 7, 10, 2, 6]), [b, ime] = r.izberi([["CuSO4", "bakrov(II) sulfat"], ["MgSO4", "magnezijev sulfat"], ["Na2CO3", "natrijev karbonat"], ["CaCl2", "kalcijev klorid"]]);
    const Mb = molska(b), Mh = Mb + x * molska("H2O"), w = (x * molska("H2O")) / Mh;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: x, enota: "", besedilo: `Hidrat snovi ${F(b)} (${ime}) vsebuje ${L(w * 100, 1)} % kristalne vode (masni delež). Koliko molekul vode pripada eni formulski enoti?`, rezultat: `${x}`, postopek: `<p>\\(\\frac{x \\cdot 18{,}02}{${L(Mb, 2)} + x \\cdot 18{,}02} = ${L(w, 4)}\\)</p><p>Rešimo: \\(x \\approx ${x}\\), formula ${F(`${b}·${x}H2O`)}.</p>` });
  });
  pojmi([
    ["množina snovi", "Količina, ki pove število delcev v enotah mol."],
    ["mol", "Množina snovi, ki vsebuje \\(6{,}02 \\cdot 10^{23}\\) delcev."],
    ["Avogadrovo število", "Število delcev v enem molu, približno \\(6{,}02 \\cdot 10^{23}\\).", { brezVpisa: true }],
    ["molska masa", "Masa enega mola snovi v gramih na mol."],
    ["molski volumen", "Prostornina enega mola plina; pri normalnih pogojih 22,4 L."],
    ["relativna atomska masa", "Razmerje med povprečno maso atoma elementa in 1/12 mase atoma ogljika-12."],
    ["empirična formula", "Formula z najmanjšim celoštevilskim razmerjem atomov v spojini."],
  ]);
}
