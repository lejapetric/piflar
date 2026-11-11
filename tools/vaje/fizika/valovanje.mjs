import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("osnovna", 8, (r, i) => {
    const nu = r.int(1, 2000), lam = r.int(1, 500) / 100, c = nu * lam;
    const kaj = i % 3;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: c, enota: "m/s", besedilo: `Valovanje ima frekvenco ${nu} Hz in valovno dolžino ${L(lam, 2)} m. Kolikšna je hitrost?`, rezultat: `${T(c, 1)} m/s`, postopek: `<p>\\(c = \\lambda\\nu = ${L(lam, 2)} \\cdot ${nu} = ${L(c, 1)}\\ \\text{m/s}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 1, vrednost: zaokrozi(340 / nu, 6), enota: "m", besedilo: `Kolikšna je valovna dolžina zvoka s frekvenco ${nu} Hz v zraku (\\(c = 340\\) m/s)?`, rezultat: `${T(340 / nu, 3)} m`, postopek: `<p>\\(\\lambda = \\frac{c}{\\nu} = \\frac{340}{${nu}} \\approx ${L(340 / nu, 3)}\\ \\text{m}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: zaokrozi(1500 / lam, 4), enota: "Hz", besedilo: `Ultrazvok ima v vodi (\\(c = 1500\\) m/s) valovno dolžino ${L(lam, 2)} m. Kolikšna je frekvenca?`, rezultat: `${T(1500 / lam, 1)} Hz`, postopek: `<p>\\(\\nu = \\frac{c}{\\lambda} = \\frac{1500}{${L(lam, 2)}} \\approx ${L(1500 / lam, 1)}\\ \\text{Hz}\\)</p>` });
  });
  serija("odmev", 5, (r, i) => {
    const t = r.int(2, 60) / 10, s = (340 * t) / 2;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: s, enota: "m", besedilo: `Odmev zaslišimo ${L(t, 1)} s po kriku. Kako daleč je stena? (\\(c = 340\\) m/s)`, rezultat: `${T(s, 0)} m`, postopek: `<p>Zvok prepotuje pot dvakrat: \\(2s = ct\\), \\(s = \\frac{340 \\cdot ${L(t, 1)}}{2} = ${L(s, 0)}\\ \\text{m}\\)</p>` });
    const tb = r.int(2, 20);
    return kolicina({ tezavnost: 1, vrednost: 340 * tb, enota: "m", besedilo: `Grom zaslišimo ${tb} s po blisku. Kako daleč je udarila strela? (\\(c = 340\\) m/s)`, rezultat: `${340 * tb} m`, postopek: `<p>Svetloba pride praktično takoj, zvok potrebuje ${tb} s: \\(s = ct = ${340 * tb}\\ \\text{m}\\)</p>` });
  });
  serija("struna", 6, (r, i) => {
    const l = r.int(30, 120) / 100, F = r.int(20, 500), mu = r.int(1, 30) / 10000;
    const c = Math.sqrt(F / mu), nu = c / (2 * l);
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi(nu, 3), enota: "Hz", besedilo: `Struna dolžine ${L(l * 100, 0)} cm je napeta s silo ${F} N, njena dolžinska gostota je ${L(mu * 1000, 1)} g/m. Kolikšna je osnovna frekvenca?`, rezultat: `${T(nu, 1)} Hz`, postopek: `<p>\\(c = \\sqrt{\\frac{F}{\\mu}} = \\sqrt{\\frac{${F}}{${sci(mu)}}} \\approx ${L(c, 1)}\\ \\text{m/s}\\)</p><p>\\(\\nu_1 = \\frac{c}{2l} \\approx ${L(nu, 1)}\\ \\text{Hz}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(c, 3), enota: "m/s", besedilo: `Struna je napeta s silo ${F} N, njena dolžinska gostota je ${L(mu * 1000, 1)} g/m. Kolikšna je hitrost valovanja na struni?`, rezultat: `${T(c, 1)} m/s`, postopek: `<p>\\(c = \\sqrt{\\frac{F}{\\mu}} = \\sqrt{\\frac{${F}}{${sci(mu)}}} \\approx ${L(c, 1)}\\ \\text{m/s}\\)</p>` });
  });
  serija("ubrano", 5, (r) => {
    const nu1 = r.int(50, 500), n = r.int(2, 5);
    return kolicina({ tezavnost: 2, vrednost: n * nu1, enota: "Hz", besedilo: `Osnovna frekvenca strune je ${nu1} Hz. Kolikšna je frekvenca ${n}. lastnega nihanja (${n - 1}. višjega harmonika)?`, rezultat: `${n * nu1} Hz`, postopek: `<p>Lastne frekvence strune so večkratniki osnovne: \\(\\nu_n = n\\nu_1 = ${n} \\cdot ${nu1} = ${n * nu1}\\ \\text{Hz}\\)</p>` });
  });
  serija("pipa", 4, (r, i) => {
    const l = r.int(10, 200) / 100, odprta = i % 2 === 0, nu = odprta ? 340 / (2 * l) : 340 / (4 * l);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(nu, 3), enota: "Hz", besedilo: `Kolikšna je osnovna frekvenca piščali dolžine ${L(l * 100, 0)} cm, ki je ${odprta ? "odprta na obeh koncih" : "na enem koncu zaprta"}? (\\(c = 340\\) m/s)`, rezultat: `${T(nu, 1)} Hz`, postopek: `<p>${odprta ? "Odprta piščal: \\(\\lambda_1 = 2l\\)" : "Zaprta piščal: \\(\\lambda_1 = 4l\\)"}, \\(\\nu_1 = \\frac{c}{\\lambda_1} \\approx ${L(nu, 1)}\\ \\text{Hz}\\)</p>` });
  });
  serija("doppler", 5, (r, i) => {
    const nu0 = r.int(200, 1000), v = r.int(10, 40), proti = i % 2 === 0;
    const nu = proti ? nu0 / (1 - v / 340) : nu0 / (1 + v / 340);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(nu, 3), enota: "Hz", besedilo: `Rešilec s sireno ${nu0} Hz se pelje s hitrostjo ${v} m/s ${proti ? "proti mirujočemu opazovalcu" : "stran od mirujočega opazovalca"}. Kolikšno frekvenco sliši opazovalec? (\\(c = 340\\) m/s)`, rezultat: `${T(nu, 1)} Hz`, postopek: `<p>Gibajoč izvir: \\(\\nu = \\frac{\\nu_0}{1 ${proti ? "-" : "+"} v/c} = \\frac{${nu0}}{1 ${proti ? "-" : "+"} ${v}/340} \\approx ${L(nu, 1)}\\ \\text{Hz}\\)</p>` });
  });
  serija("jakost-zvoka", 5, (r, i) => {
    const P = r.int(1, 100) / 1000, d = r.int(1, 50), j = P / (4 * Math.PI * d * d), Ldb = 10 * Math.log10(j / 1e-12);
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi(Ldb, 3), tol: 0.005, enota: "dB", besedilo: `Izvir izseva zvočno moč ${L(P * 1000, 0)} mW enakomerno na vse strani. Kolikšna je raven jakosti zvoka ${d} m stran? (\\(j_0 = 10^{-12}\\) W/m²)`, rezultat: `${T(Ldb, 1)} dB`, postopek: `<p>\\(j = \\frac{P}{4\\pi r^2} \\approx ${sci(j)}\\ \\text{W/m}^2\\)</p><p>\\(L = 10\\log\\frac{j}{j_0} \\approx ${L(Ldb, 1)}\\ \\text{dB}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: j, tol: 0.01, enota: "W/m²", besedilo: `Izvir izseva zvočno moč ${L(P * 1000, 0)} mW enakomerno na vse strani. Kolikšna je gostota zvočnega toka ${d} m stran? (vpiši npr. 3,2e-6)`, rezultat: `\\(${sci(j)}\\) W/m²`, postopek: `<p>\\(j = \\frac{P}{4\\pi r^2} = \\frac{${sci(P)}}{4\\pi \\cdot ${d * d}} \\approx ${sci(j)}\\ \\text{W/m}^2\\)</p>` });
  });
  serija("decibeli", 4, (r) => {
    const n = r.izberi([2, 10, 100, 4]);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(10 * Math.log10(n), 4), tol: 0.01, enota: "dB", besedilo: `Za koliko decibelov se poveča raven jakosti zvoka, če namesto enega igra ${n} enakih glasbil?`, rezultat: `${T(10 * Math.log10(n), 1)} dB`, postopek: `<p>Jakost se poveča ${n}-krat: \\(\\Delta L = 10\\log ${n} \\approx ${L(10 * Math.log10(n), 1)}\\ \\text{dB}\\)</p>` });
  });
  serija("utripanje", 3, (r) => {
    const a = r.int(400, 450), b = a + r.int(1, 8);
    return kolicina({ tezavnost: 2, vrednost: b - a, enota: "Hz", besedilo: `Hkrati zvenita glasbili s frekvencama ${a} Hz in ${b} Hz. Kolikšna je frekvenca utripanja?`, rezultat: `${b - a} Hz`, postopek: `<p>\\(\\nu_u = |\\nu_1 - \\nu_2| = ${b - a}\\ \\text{Hz}\\)</p>` });
  });
  serija("visja-mach", 3, (r) => {
    const M = r.int(12, 30) / 10, fi = (Math.asin(1 / M) * 180) / Math.PI;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(fi, 3), tol: 0.01, enota: "°", besedilo: `Letalo leti s hitrostjo ${L(M, 1)}-kratne hitrosti zvoka. Kolikšen je polovični kot udarnega (Machovega) stožca?`, rezultat: `${T(fi, 1)}°`, postopek: `<p>\\(\\sin\\alpha = \\frac{c}{v} = \\frac{1}{${L(M, 1)}}\\), \\(\\alpha \\approx ${L(fi, 1)}°\\)</p>` });
  });
  serija("visja-interferenca", 3, (r) => {
    const lam = r.int(10, 100) / 100, d1 = r.int(2, 20);
    const n = r.int(1, 4), d2 = d1 + n * lam;
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Dva zvočnika v fazi oddajata ton z valovno dolžino ${L(lam, 2)} m. Poslušalec je ${d1} m od prvega in ${L(d2, 2)} m od drugega. Kaj sliši?`, pravilna: "ojačitev (konstruktivna interferenca)", napacne: ["oslabitev (destruktivna interferenca)", "utripanje", "nič, valova se izničita"], postopek: `<p>Razlika poti je \\(${L(d2 - d1, 2)}\\ \\text{m} = ${n}\\lambda\\), celo število valovnih dolžin: ojačitev.</p>` });
  });
  pojmi([
    ["transverzalno valovanje", "Valovanje, pri katerem delci nihajo pravokotno na smer širjenja."],
    ["longitudinalno valovanje", "Valovanje, pri katerem delci nihajo v smeri širjenja, npr. zvok v zraku."],
    ["valovna dolžina", "Razdalja med sosednjima točkama valovanja, ki nihata v isti fazi."],
    ["stoječe valovanje", "Valovanje z mirujočimi vozli in hrbti, ki nastane ob prekrivanju vpadnega in odbitega vala."],
    ["interferenca", "Prekrivanje valovanj, pri katerem se odmiki seštevajo."],
    ["uklon", "Širjenje valovanja za oviro ali skozi režo v območje sence."],
    ["Dopplerjev pojav", "Sprememba zaznane frekvence zaradi gibanja izvira ali opazovalca.", { brezVpisa: true }],
  ]);
}
