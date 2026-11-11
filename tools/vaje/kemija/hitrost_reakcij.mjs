import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { F } from "../kemija-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("povprecna", 8, (r, i) => {
    const c1 = r.int(50, 200) / 100, c2 = r.int(1, c1 * 100 - 1) / 100, t = r.int(5, 300);
    const v = (c1 - c2) / t;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(c1 - v * t, 6), tol: 0.01, enota: "mol/L", besedilo: `Reaktant se porablja s povprečno hitrostjo \\(${sci(v)}\\) mol/(L s). Začetna koncentracija je ${T(c1, 2)} mol/L. Kolikšna je koncentracija po ${t} s?`, rezultat: `${T(c2, 2)} mol/L`, postopek: `<p>\\(c = c_0 - vt = ${L(c1, 2)} - ${sci(v)} \\cdot ${t} = ${L(c2, 2)}\\ \\text{mol/L}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: v, tol: 0.01, enota: "mol/(L s)", besedilo: `Koncentracija reaktanta se v ${t} s zmanjša s ${T(c1, 2)} mol/L na ${T(c2, 2)} mol/L. Kolikšna je povprečna hitrost reakcije? (vpiši npr. 2,5e-3)`, rezultat: `\\(${sci(v)}\\) mol/(L s)`, postopek: `<p>\\(v = -\\frac{\\Delta c}{\\Delta t} = \\frac{${L(c1, 2)} - ${L(c2, 2)}}{${t}} \\approx ${sci(v)}\\ \\text{mol/(L s)}\\)</p>` });
  });
  serija("razmerje", 5, (r) => {
    const [en, a, fa, b, fb] = r.izberi([[`2 ${F("H2")} + ${F("O2")} → 2 ${F("H2O")}`, 1, "O2", 2, "H2O"], [`${F("N2")} + 3 ${F("H2")} → 2 ${F("NH3")}`, 3, "H2", 2, "NH3"], [`2 ${F("SO2")} + ${F("O2")} → 2 ${F("SO3")}`, 1, "O2", 2, "SO3"], [`2 ${F("N2O5")} → 4 ${F("NO2")} + ${F("O2")}`, 2, "N2O5", 4, "NO2"]]);
    const v = r.int(1, 50) / 1000;
    return kolicina({ tezavnost: 2, vrednost: (v * b) / a, tol: 0.01, enota: "mol/(L s)", besedilo: `Pri reakciji ${en} se ${F(fa)} porablja s hitrostjo ${L(v, 3)} mol/(L s). S kolikšno hitrostjo nastaja ${F(fb)}?`, rezultat: `${T((v * b) / a, 4)} mol/(L s)`, postopek: `<p>Hitrosti so v razmerju koeficientov: \\(v(\\text{${fb}}) = v(\\text{${fa}}) \\cdot \\frac{${b}}{${a}} = ${L((v * b) / a, 4)}\\ \\text{mol/(L s)}\\)</p>` });
  });
  serija("temperatura", 6, (r, i) => {
    const k = r.izberi([2, 3]), dT = r.int(1, 5) * 10, f = k ** (dT / 10);
    if (i % 2) {
      const t0 = r.int(10, 200), t = t0 / f;
      return kolicina({ tezavnost: 2, vrednost: t, tol: 0.01, enota: "min", besedilo: `Reakcija pri 20 °C poteče v ${t0} min. Koliko časa traja pri ${20 + dT} °C, če se hitrost pri dvigu za 10 °C poveča ${k}-krat?`, rezultat: `${T(t, 2)} min`, postopek: `<p>Hitrost se poveča \\(${k}^{${dT / 10}} = ${f}\\)-krat, čas se toliko skrajša: \\(\\frac{${t0}}{${f}} \\approx ${L(t, 2)}\\) min.</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: f, enota: "", besedilo: `Hitrost reakcije se pri dvigu temperature za 10 °C poveča ${k}-krat. Kolikokrat se poveča, če temperaturo dvignemo za ${dT} °C?`, rezultat: `${f}-krat`, postopek: `<p>\\(${k}^{${dT}/10} = ${k}^{${dT / 10}} = ${f}\\)</p>` });
  });
  serija("zakon-hitrosti", 6, (r, i) => {
    const m = r.int(0, 2), n = r.int(0, 2), fa = r.izberi([2, 3]), fb = r.izberi([2, 3]);
    const f = fa ** m * fb ** n;
    return kolicina({ tezavnost: 3, vrednost: f, enota: "", besedilo: `Za reakcijo velja \\(v = k[\\text{A}]^{${m}}[\\text{B}]^{${n}}\\). Kolikokrat se spremeni hitrost, če koncentracijo A povečamo ${fa}-krat, koncentracijo B pa ${fb}-krat?`, rezultat: `${f}-krat`, postopek: `<p>\\(\\frac{v_2}{v_1} = ${fa}^{${m}} \\cdot ${fb}^{${n}} = ${f}\\)</p>` });
  });
  serija("red-iz-podatkov", 4, (r) => {
    const n = r.int(0, 2), c = r.int(1, 5) / 10, v = r.int(1, 9) / 1000;
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Pri koncentraciji reaktanta ${T(c, 1)} mol/L je začetna hitrost ${T(v, 3)} mol/(L s), pri ${T(2 * c, 1)} mol/L pa ${T(v * 2 ** n, 3)} mol/(L s). Kolikšen je red reakcije glede na ta reaktant?`, pravilna: `${n}. red`, napacne: ["0. red", "1. red", "2. red", "3. red"].filter((x) => x !== `${n}. red`).slice(0, 3), postopek: `<p>Koncentracija se podvoji, hitrost se spremeni \\(${2 ** n}\\)-krat: \\(2^n = ${2 ** n}\\), \\(n = ${n}\\).</p>` });
  });
  serija("konstanta", 4, (r) => {
    const k = r.int(1, 50) / 1000, a = r.int(1, 10) / 10, b = r.int(1, 10) / 10;
    return kolicina({ tezavnost: 3, vrednost: k * a * b, tol: 0.01, enota: "mol/(L s)", besedilo: `Za reakcijo velja \\(v = k[\\text{A}][\\text{B}]\\), \\(k = ${L(k, 3)}\\) L/(mol s). Kolikšna je hitrost pri [A] = ${T(a, 1)} mol/L in [B] = ${T(b, 1)} mol/L?`, rezultat: `\\(${sci(k * a * b)}\\) mol/(L s)`, postopek: `<p>\\(v = ${L(k, 3)} \\cdot ${L(a, 1)} \\cdot ${L(b, 1)} = ${sci(k * a * b)}\\ \\text{mol/(L s)}\\)</p>` });
  });
  serija("razpolovni", 4, (r) => {
    const t12 = r.int(1, 30), n = r.int(1, 5), c0 = r.int(1, 20) / 10;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: c0 / 2 ** n, tol: 0.01, enota: "mol/L", besedilo: `Reakcija prvega reda ima razpolovni čas ${t12} min. Začetna koncentracija je ${T(c0, 1)} mol/L. Kolikšna je koncentracija po ${t12 * n} min?`, rezultat: `${T(c0 / 2 ** n, 4)} mol/L`, postopek: `<p>Pri reakciji 1. reda je razpolovni čas stalen; mine ${n} razpolovnih časov: \\(c = \\frac{${L(c0, 1)}}{2^{${n}}} = ${L(c0 / 2 ** n, 4)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("vpliv", 6, (r) => {
    const [opis, odg, raz] = r.izberi([
      ["Kaj se zgodi s hitrostjo reakcije, če kos cinka zdrobimo v prah?", "poveča se", "Večja površina pomeni več trkov."],
      ["Kaj se zgodi s hitrostjo reakcije, če reakcijsko zmes ohladimo?", "zmanjša se", "Manj delcev ima dovolj energije za učinkovit trk."],
      ["Kaj naredi katalizator?", "zniža aktivacijsko energijo", "Reakcija poteka po drugi poti z nižjo aktivacijsko energijo."],
      ["Ali katalizator spremeni lego ravnotežja?", "ne, ravnotežje se le hitreje vzpostavi", "Pospeši obe smeri reakcije enako."],
      ["Kaj se zgodi s hitrostjo reakcije med plini, če povečamo tlak?", "poveča se", "Večja koncentracija pomeni več trkov."],
      ["Zakaj hrano hranimo v hladilniku?", "ker pri nižji temperaturi reakcije kvarjenja potekajo počasneje", "Hitrost reakcij pada z nižanjem temperature."],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: opis, pravilna: odg, napacne: ["poveča se", "zmanjša se", "ostane enaka", "zniža aktivacijsko energijo", "zviša aktivacijsko energijo", "ne, ravnotežje se le hitreje vzpostavi", "da, premakne ga v smer produktov"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  serija("visja-arrhenius", 3, (r) => {
    const Ea = r.int(30, 120) * 1000, T1 = r.int(280, 320), T2 = T1 + r.int(10, 40);
    const f = Math.exp((Ea / 8.31) * (1 / T1 - 1 / T2));
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: f, tol: 0.02, enota: "", besedilo: `Aktivacijska energija reakcije je ${Ea / 1000} kJ/mol. Kolikokrat se poveča konstanta hitrosti, če temperaturo zvišamo s ${T1} K na ${T2} K? (\\(R = 8{,}31\\) J/(mol K))`, rezultat: `${T(f, 2)}-krat`, postopek: `<p>Arrheniusova enačba: \\(\\frac{k_2}{k_1} = e^{\\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)} \\approx ${L(f, 2)}\\)</p>` });
  });
  pojmi([
    ["hitrost reakcije", "Sprememba koncentracije reaktanta ali produkta v časovni enoti."],
    ["aktivacijska energija", "Najmanjša energija, ki jo morajo imeti delci, da je trk učinkovit."],
    ["katalizator", "Snov, ki pospeši reakcijo, a se pri tem ne porabi."],
    ["inhibitor", "Snov, ki upočasni kemijsko reakcijo."],
    ["učinkovit trk", "Trk delcev z dovolj energije in ustrezno orientacijo, da nastane produkt."],
    ["aktivirani kompleks", "Nestabilno prehodno stanje z najvišjo energijo med reaktanti in produkti."],
    ["red reakcije", "Vsota eksponentov koncentracij v zakonu hitrosti."],
    ["encim", "Biološki katalizator, večinoma beljakovina."],
  ]);
}
