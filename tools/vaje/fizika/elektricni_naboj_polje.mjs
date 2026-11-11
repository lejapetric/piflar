import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const k = 8.99e9, e0 = 8.85e-12, e = 1.6e-19, me = 9.11e-31;

export default function ({ serija, pojmi, vprasanja }) {
  serija("coulomb", 7, (r, i) => {
    const q1 = r.int(1, 9), q2 = r.int(1, 9), d = r.int(1, 50) / 100;
    const F = (k * q1 * 1e-6 * q2 * 1e-6) / (d * d);
    return kolicina({ tezavnost: i < 4 ? 1 : 2, vrednost: zaokrozi(F, 4), tol: 0.02, enota: "N", besedilo: `Kolikšna je sila med nabojema ${q1} µC in ${i % 2 ? "−" : ""}${q2} µC, ki sta ${L(d * 100, 0)} cm narazen? (\\(k = 9 \\cdot 10^9\\ \\text{Nm}^2/\\text{C}^2\\); vpiši velikost.)`, rezultat: `${T(F, 3)} N (${i % 2 ? "privlačna" : "odbojna"})`, postopek: `<p>\\(F = k\\frac{|q_1q_2|}{r^2} = 9 \\cdot 10^9 \\cdot \\frac{${q1} \\cdot 10^{-6} \\cdot ${q2} \\cdot 10^{-6}}{${L(d, 2)}^2} \\approx ${L(F, 3)}\\ \\text{N}\\)</p><p>Naboja sta ${i % 2 ? "nasprotno predznačena: sila je privlačna" : "istega predznaka: sila je odbojna"}.</p>` });
  });
  serija("razmerje", 4, (r) => {
    const f = r.izberi([2, 3, 0.5, 4]);
    return kolicina({ tezavnost: 2, vrednost: 1 / (f * f), enota: "", besedilo: `Kolikokrat se spremeni električna sila med nabojema, če razdaljo ${f > 1 ? `povečamo ${L(f, 1)}-krat` : `zmanjšamo na polovico`}? (Vpiši faktor.)`, rezultat: `${T(1 / (f * f), 4)}-krat`, postopek: `<p>\\(F \\propto \\frac{1}{r^2}\\): faktor \\(\\frac{1}{${L(f, 1)}^2} = ${L(1 / (f * f), 4)}\\).</p>` });
  });
  serija("jakost-tocka", 5, (r) => {
    const q = r.int(1, 20), d = r.int(5, 100) / 100, E = (k * q * 1e-9) / (d * d);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(E, 3), tol: 0.02, enota: "V/m", besedilo: `Kolikšna je jakost električnega polja ${L(d * 100, 0)} cm od točkastega naboja ${q} nC?`, rezultat: `${T(E, 0)} V/m`, postopek: `<p>\\(E = k\\frac{q}{r^2} = 9 \\cdot 10^9 \\cdot \\frac{${q} \\cdot 10^{-9}}{${L(d, 2)}^2} \\approx ${L(E, 0)}\\ \\text{V/m}\\)</p>` });
  });
  serija("sila-v-polju", 5, (r) => {
    const E = r.int(1, 50) * 1000, q = r.int(1, 20);
    return kolicina({ tezavnost: 1, vrednost: E * q * 1e-6, enota: "N", besedilo: `Naboj ${q} µC je v homogenem električnem polju z jakostjo ${E} V/m. Kolikšna sila deluje nanj?`, rezultat: `${T(E * q * 1e-6, 3)} N`, postopek: `<p>\\(F = qE = ${q} \\cdot 10^{-6} \\cdot ${E} = ${L(E * q * 1e-6, 3)}\\ \\text{N}\\)</p>` });
  });
  serija("plosci", 5, (r, i) => {
    const U = r.int(10, 1000), d = r.int(1, 50) / 1000;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: U / d, enota: "V/m", besedilo: `Med vzporednima ploščama, ki sta ${L(d * 1000, 0)} mm narazen, je napetost ${U} V. Kolikšna je jakost polja?`, rezultat: `${T(U / d, 0)} V/m`, postopek: `<p>\\(E = \\frac{U}{d} = \\frac{${U}}{${L(d, 3)}} \\approx ${L(U / d, 0)}\\ \\text{V/m}\\)</p>` });
    const q = r.int(1, 10);
    return kolicina({ tezavnost: 2, vrednost: q * 1e-6 * U, enota: "J", besedilo: `Koliko dela opravi električna sila, ko se naboj ${q} µC premakne med točkama z napetostjo ${U} V?`, rezultat: `${T(q * 1e-6 * U * 1000, 3)} mJ`, postopek: `<p>\\(A = qU = ${q} \\cdot 10^{-6} \\cdot ${U} = ${sci(q * 1e-6 * U)}\\ \\text{J}\\)</p>` });
  });
  serija("elektron", 4, (r) => {
    const U = r.int(10, 5000), v = Math.sqrt((2 * e * U) / me);
    return kolicina({ tezavnost: 3, vrednost: v, tol: 0.02, enota: "m/s", besedilo: `Elektron iz mirovanja pospešimo z napetostjo ${U} V. Kolikšno hitrost doseže? (\\(e = 1{,}6 \\cdot 10^{-19}\\) C, \\(m_e = 9{,}11 \\cdot 10^{-31}\\) kg; vpiši npr. 2,4e7.)`, rezultat: `\\(${sci(v)}\\) m/s`, postopek: `<p>\\(eU = \\frac{m_ev^2}{2}\\), \\(v = \\sqrt{\\frac{2eU}{m_e}} \\approx ${sci(v)}\\ \\text{m/s}\\)</p>` });
  });
  serija("kondenzator", 6, (r, i) => {
    const C = r.int(1, 1000), U = r.int(5, 400);
    if (i % 3 === 0) return kolicina({ tezavnost: 1, vrednost: C * U, enota: "µC", besedilo: `Kondenzator s kapaciteto ${C} µF priključimo na napetost ${U} V. Koliko naboja je na njem?`, rezultat: `${C * U} µC`, postopek: `<p>\\(e = CU = ${C} \\cdot 10^{-6} \\cdot ${U} = ${sci(C * U * 1e-6)}\\ \\text{C}\\)</p>` });
    if (i % 3 === 1) return kolicina({ tezavnost: 2, vrednost: 0.5 * C * 1e-6 * U * U, enota: "J", besedilo: `Koliko energije je shranjene v kondenzatorju s kapaciteto ${C} µF pri napetosti ${U} V?`, rezultat: `${T(0.5 * C * 1e-6 * U * U, 4)} J`, postopek: `<p>\\(W = \\frac{CU^2}{2} = \\frac{${C} \\cdot 10^{-6} \\cdot ${U * U}}{2} \\approx ${sci(0.5 * C * 1e-6 * U * U)}\\ \\text{J}\\)</p>` });
    const S = r.int(1, 500) / 10000, d = r.int(1, 20) / 1000, Cp = (e0 * S) / d;
    return kolicina({ tezavnost: 3, vrednost: Cp * 1e12, tol: 0.02, enota: "pF", besedilo: `Kolikšna je kapaciteta ploščatega kondenzatorja s ploščama po ${L(S * 10000, 0)} cm², ki sta ${L(d * 1000, 0)} mm narazen (zrak)? (\\(\\varepsilon_0 = 8{,}85 \\cdot 10^{-12}\\) As/Vm)`, rezultat: `${T(Cp * 1e12, 2)} pF`, postopek: `<p>\\(C = \\frac{\\varepsilon_0 S}{d} = \\frac{8{,}85 \\cdot 10^{-12} \\cdot ${sci(S)}}{${L(d, 3)}} \\approx ${sci(Cp)}\\ \\text{F}\\)</p>` });
  });
  serija("vezava-c", 4, (r, i) => {
    const C1 = r.int(1, 20), C2 = r.int(1, 20);
    const vz = i % 2 === 0, C = vz ? C1 + C2 : (C1 * C2) / (C1 + C2);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(C, 4), enota: "µF", besedilo: `Kondenzatorja s kapacitetama ${C1} µF in ${C2} µF vežemo ${vz ? "vzporedno" : "zaporedno"}. Kolikšna je skupna kapaciteta?`, rezultat: `${T(C, 2)} µF`, postopek: vz ? `<p>Vzporedno: \\(C = C_1 + C_2 = ${C1 + C2}\\ \\mu\\text{F}\\)</p>` : `<p>Zaporedno: \\(\\frac1C = \\frac1{C_1} + \\frac1{C_2}\\), \\(C = \\frac{C_1C_2}{C_1 + C_2} = \\frac{${C1 * C2}}{${C1 + C2}} \\approx ${L(C, 2)}\\ \\mu\\text{F}\\)</p>` });
  });
  serija("superpozicija", 4, (r) => {
    const q = r.int(1, 9), d = r.int(10, 50) / 100;
    // enaka naboja q in q na razdalji d; polje na sredini = 0; naboja +q in -q → E = 2 * k q / (d/2)^2
    const E = (2 * k * q * 1e-9) / ((d / 2) ** 2);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(E, 2), tol: 0.02, enota: "V/m", besedilo: `Naboja +${q} nC in −${q} nC sta ${L(d * 100, 0)} cm narazen. Kolikšna je jakost polja na sredini med njima?`, rezultat: `${T(E, 0)} V/m`, postopek: `<p>Na sredini kažeta prispevka obeh nabojev v isto smer (od + proti −).</p><p>\\(E = 2k\\frac{q}{(d/2)^2} = 2 \\cdot 9 \\cdot 10^9 \\cdot \\frac{${q} \\cdot 10^{-9}}{${L(d / 2, 3)}^2} \\approx ${L(E, 0)}\\ \\text{V/m}\\)</p>` });
  });
  serija("odklon", 3, (r) => {
    const U = r.int(50, 500), d = r.int(5, 20) / 1000, l = r.int(2, 10) / 100, v = r.int(1, 5) * 1e7;
    const a = (e * U) / (d * me), t = l / v, y = 0.5 * a * t * t;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(y * 1000, 4), tol: 0.02, enota: "mm", besedilo: `Elektron s hitrostjo \\(${sci(v)}\\) m/s prileti vzporedno s ploščama kondenzatorja (dolžina ${L(l * 100, 0)} cm, razmik ${L(d * 1000, 0)} mm, napetost ${U} V). Za koliko se odkloni pravokotno na plošči, ko jih zapusti?`, rezultat: `${T(y * 1000, 2)} mm`, postopek: `<p>\\(a = \\frac{eU}{m_ed} \\approx ${sci(a)}\\ \\text{m/s}^2\\), \\(t = \\frac{l}{v} = ${sci(t)}\\ \\text{s}\\)</p><p>\\(y = \\frac{at^2}{2} \\approx ${sci(y)}\\ \\text{m}\\)</p>` });
  });
  pojmi([
    ["električni naboj", "Lastnost delcev, zaradi katere delujejo z električno silo; merimo ga v coulombih."],
    ["osnovni naboj", "Najmanjši prosti naboj, velikost naboja elektrona, približno 1,6·10⁻¹⁹ C.", { brezVpisa: true }],
    ["električno polje", "Prostor okoli naboja, v katerem na druge naboje deluje električna sila."],
    ["silnica", "Črta, katere tangenta v vsaki točki kaže smer električne sile na pozitiven naboj."],
    ["napetost", "Delo električne sile pri prenosu naboja med točkama, deljeno z nabojem."],
    ["kapaciteta", "Razmerje med nabojem na kondenzatorju in napetostjo med ploščama."],
    ["influenca", "Prerazporeditev naboja v prevodniku zaradi bližnjega naelektrenega telesa."],
  ]);
  vprasanja([
    [2, "Ali je električno polje v notranjosti naelektrene kovinske krogle enako nič?", "Da", ["Ne"], "V prevodniku v ravnovesju se naboj razporedi po površini, notranjost je brez polja."],
  ]);
}
