import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const h = 6.63e-34, c = 3e8, e = 1.6e-19, me = 9.11e-31;

export default function ({ serija, pojmi, vprasanja }) {
  serija("foton-energija", 6, (r, i) => {
    const nu = r.int(4, 30) * 1e14;
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: h * nu, tol: 0.01, enota: "J", besedilo: `Kolikšna je energija fotona s frekvenco \\(${sci(nu)}\\) Hz? (\\(h = 6{,}63 \\cdot 10^{-34}\\) Js)`, rezultat: `\\(${sci(h * nu)}\\) J`, postopek: `<p>\\(E = h\\nu = 6{,}63 \\cdot 10^{-34} \\cdot ${sci(nu)} \\approx ${sci(h * nu)}\\ \\text{J}\\)</p>` });
    const lam = r.int(100, 900) * 1e-9;
    return kolicina({ tezavnost: 2, vrednost: (h * c) / lam / e, tol: 0.01, enota: "eV", besedilo: `Kolikšna je energija fotona z valovno dolžino ${L(lam * 1e9, 0)} nm v eV?`, rezultat: `${T((h * c) / lam / e, 2)} eV`, postopek: `<p>\\(E = \\frac{hc}{\\lambda} = \\frac{6{,}63 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{${sci(lam)}} \\approx ${sci((h * c) / lam)}\\ \\text{J} = ${L((h * c) / lam / e, 2)}\\ \\text{eV}\\)</p>` });
  });
  serija("fotoefekt", 7, (r, i) => {
    const [ime, A] = r.izberi([["cezij", 2.1], ["kalij", 2.3], ["natrij", 2.3], ["cink", 4.3], ["baker", 4.7]]), lam = r.int(150, 500) * 1e-9;
    const Ef = (h * c) / lam / e, Wk = Ef - A;
    if (Wk <= 0) return null;
    if (i % 3 === 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi(Wk, 4), tol: 0.01, enota: "V", besedilo: `Kovino (${ime}, izstopno delo ${L(A, 1)} eV) obsevamo s svetlobo valovne dolžine ${L(lam * 1e9, 0)} nm. Kolikšna je zaporna napetost?`, rezultat: `${T(Wk, 2)} V`, postopek: `<p>\\(E_f = \\frac{hc}{\\lambda} \\approx ${L(Ef, 2)}\\ \\text{eV}\\), \\(W_k = E_f - A_i = ${L(Wk, 2)}\\ \\text{eV}\\).</p><p>\\(eU_z = W_k\\), \\(U_z = ${L(Wk, 2)}\\ \\text{V}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(Wk, 4), tol: 0.01, enota: "eV", besedilo: `Kovino (${ime}, izstopno delo ${L(A, 1)} eV) obsevamo s svetlobo valovne dolžine ${L(lam * 1e9, 0)} nm. Kolikšna je največja kinetična energija izbitih elektronov?`, rezultat: `${T(Wk, 2)} eV`, postopek: `<p>Einsteinova enačba: \\(W_k = h\\nu - A_i = ${L(Ef, 2)} - ${L(A, 1)} = ${L(Wk, 2)}\\ \\text{eV}\\)</p>` });
  });
  serija("mejna", 4, (r) => {
    const A = r.int(15, 50) / 10, lam = (h * c) / (A * e);
    return kolicina({ tezavnost: 3, vrednost: lam * 1e9, tol: 0.01, enota: "nm", besedilo: `Izstopno delo kovine je ${L(A, 1)} eV. Kolikšna je največja valovna dolžina svetlobe, ki še izbija elektrone?`, rezultat: `${T(lam * 1e9, 0)} nm`, postopek: `<p>\\(\\lambda_m = \\frac{hc}{A_i} = \\frac{6{,}63 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{${L(A, 1)} \\cdot 1{,}6 \\cdot 10^{-19}} \\approx ${L(lam * 1e9, 0)}\\ \\text{nm}\\)</p>` });
  });
  serija("vodik-nivoji", 6, (r) => {
    const n = r.int(1, 6);
    return kolicina({ tezavnost: 1, vrednost: zaokrozi(-13.6 / (n * n), 5), tol: 0.01, enota: "eV", besedilo: `Kolikšna je energija elektrona v vodikovem atomu v stanju \\(n = ${n}\\)? (\\(E_n = -\\frac{13{,}6\\ \\text{eV}}{n^2}\\))`, rezultat: `${T(-13.6 / (n * n), 3)} eV`, postopek: `<p>\\(E_{${n}} = -\\frac{13{,}6}{${n * n}} \\approx ${L(-13.6 / (n * n), 3)}\\ \\text{eV}\\)</p>` });
  });
  serija("prehod", 8, (r, i) => {
    const n2 = r.int(1, 3), n1 = n2 + r.int(1, 4);
    const E = 13.6 * (1 / (n2 * n2) - 1 / (n1 * n1)), lam = (h * c) / (E * e);
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: lam * 1e9, tol: 0.01, enota: "nm", besedilo: `Kolikšna je valovna dolžina fotona, ki ga izseva vodikov atom ob prehodu iz \\(n = ${n1}\\) v \\(n = ${n2}\\)?`, rezultat: `${T(lam * 1e9, 0)} nm`, postopek: `<p>\\(E = 13{,}6\\ \\text{eV}\\left(\\frac{1}{${n2 * n2}} - \\frac{1}{${n1 * n1}}\\right) \\approx ${L(E, 3)}\\ \\text{eV}\\)</p><p>\\(\\lambda = \\frac{hc}{E} \\approx ${L(lam * 1e9, 0)}\\ \\text{nm}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(E, 5), tol: 0.01, enota: "eV", besedilo: `Kolikšna je energija fotona, ki ga izseva vodikov atom ob prehodu iz \\(n = ${n1}\\) v \\(n = ${n2}\\)?`, rezultat: `${T(E, 3)} eV`, postopek: `<p>\\(E = E_{${n1}} - E_{${n2}} = 13{,}6\\left(\\frac{1}{${n2 * n2}} - \\frac{1}{${n1 * n1}}\\right) \\approx ${L(E, 3)}\\ \\text{eV}\\)</p>` });
  });
  serija("ionizacija", 3, (r) => {
    const n = r.int(1, 4);
    return kolicina({ tezavnost: 2, vrednost: 13.6 / (n * n), tol: 0.01, enota: "eV", besedilo: `Koliko energije potrebujemo, da ioniziramo vodikov atom, ki je v stanju \\(n = ${n}\\)?`, rezultat: `${T(13.6 / (n * n), 2)} eV`, postopek: `<p>Elektron moramo spraviti z \\(E_{${n}} = ${L(-13.6 / (n * n), 2)}\\) eV na 0: potrebujemo ${L(13.6 / (n * n), 2)} eV.</p>` });
  });
  serija("de-broglie", 4, (r) => {
    const U = r.int(10, 1000), p = Math.sqrt(2 * me * e * U), lam = h / p;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: lam * 1e12, tol: 0.01, enota: "pm", besedilo: `Kolikšna je de Brogliejeva valovna dolžina elektrona, pospešenega z napetostjo ${U} V? (V pm.)`, rezultat: `${T(lam * 1e12, 1)} pm`, postopek: `<p>\\(p = \\sqrt{2m_eeU} \\approx ${sci(p)}\\ \\text{kg m/s}\\)</p><p>\\(\\lambda = \\frac{h}{p} \\approx ${sci(lam)}\\ \\text{m}\\)</p>` });
  });
  serija("rentgen", 4, (r) => {
    const U = r.int(10, 150) * 1000, lam = (h * c) / (e * U);
    return kolicina({ tezavnost: 3, vrednost: lam * 1e12, tol: 0.01, enota: "pm", besedilo: `Rentgenska cev deluje pri napetosti ${U / 1000} kV. Kolikšna je najkrajša valovna dolžina izsevane svetlobe? (V pm.)`, rezultat: `${T(lam * 1e12, 1)} pm`, postopek: `<p>Vsa kinetična energija elektrona preide v en foton: \\(eU = \\frac{hc}{\\lambda_{min}}\\).</p><p>\\(\\lambda_{min} = \\frac{hc}{eU} \\approx ${sci(lam)}\\ \\text{m}\\)</p>` });
  });
  serija("st-crt", 3, (r) => {
    const n = r.int(3, 6);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: (n * (n - 1)) / 2, enota: "", besedilo: `Vodikovi atomi so vzbujeni v stanje \\(n = ${n}\\). Koliko različnih spektralnih črt lahko izsevajo pri prehodih v nižja stanja?`, rezultat: `${(n * (n - 1)) / 2}`, postopek: `<p>Vsak par nivojev da eno črto: \\(\\binom{${n}}{2} = ${(n * (n - 1)) / 2}\\).</p>` });
  });
  pojmi([
    ["foton", "Kvant elektromagnetnega valovanja z energijo \\(h\\nu\\)."],
    ["fotoefekt", "Izbijanje elektronov iz kovine s svetlobo."],
    ["izstopno delo", "Najmanjša energija, potrebna, da elektron zapusti kovino."],
    ["osnovno stanje", "Stanje atoma z najnižjo energijo."],
    ["emisijski spekter", "Spekter svetlih črt, ki jih izsevajo vzbujeni atomi."],
    ["absorpcijski spekter", "Temne črte v zveznem spektru, kjer atomi absorbirajo fotone."],
    ["Bohrov model", "Model atoma, v katerem elektroni krožijo le po dovoljenih tirih z določeno energijo.", { brezVpisa: true }],
    ["laser", "Vir koherentne enobarvne svetlobe, ki nastane s stimulirano emisijo."],
  ]);
  vprasanja([
    [3, "Ali se pri fotoefektu kinetična energija izbitih elektronov poveča, če povečamo gostoto svetlobnega toka (pri enaki frekvenci)?", "Ne", ["Da"], "Večja gostota pomeni več fotonov in več elektronov, energija posameznega fotona pa ostane enaka."],
  ]);
}
