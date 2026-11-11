import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const c = 3e8;
const rad = (k) => (k * Math.PI) / 180, deg = (x) => (x * 180) / Math.PI;
const SN = [["voda", 1.33], ["steklo", 1.5], ["diamant", 2.42], ["led", 1.31], ["kremenovo steklo", 1.46]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("hitrost", 5, (r) => {
    const [ime, n] = r.izberi(SN);
    return kolicina({ tezavnost: 1, vrednost: c / n, enota: "m/s", besedilo: `Kolikšna je hitrost svetlobe v snovi (${ime}, \\(n = ${L(n, 2)}\\))? (vpiši npr. 2,25e8)`, rezultat: `\\(${sci(c / n)}\\) m/s`, postopek: `<p>\\(c_s = \\frac{c_0}{n} = \\frac{3 \\cdot 10^8}{${L(n, 2)}} \\approx ${sci(c / n)}\\ \\text{m/s}\\)</p>` });
  });
  serija("lom", 8, (r, i) => {
    const [ime, n] = r.izberi(SN), a = r.int(10, 80);
    const b = deg(Math.asin(Math.sin(rad(a)) / n));
    if (i % 3 === 2) {
      return kolicina({ tezavnost: 3, vrednost: zaokrozi(Math.sin(rad(a)) / Math.sin(rad(b)), 4), tol: 0.01, enota: "", besedilo: `Žarek vpada iz zraka na snov pod kotom ${a}° in se lomi pod kotom ${L(b, 1)}°. Kolikšen je lomni količnik snovi?`, rezultat: `${T(n, 2)}`, postopek: `<p>\\(n = \\frac{\\sin\\alpha}{\\sin\\beta} = \\frac{\\sin ${a}°}{\\sin ${L(b, 1)}°} \\approx ${L(n, 2)}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(b, 4), tol: 0.005, enota: "°", besedilo: `Žarek vpada iz zraka na gladino (${ime}, \\(n = ${L(n, 2)}\\)) pod vpadnim kotom ${a}°. Kolikšen je lomni kot?`, rezultat: `${T(b, 1)}°`, postopek: `<p>Lomni zakon: \\(\\sin\\alpha = n\\sin\\beta\\).</p><p>\\(\\sin\\beta = \\frac{\\sin ${a}°}{${L(n, 2)}} \\approx ${L(Math.sin(rad(a)) / n, 4)}\\), \\(\\beta \\approx ${L(b, 1)}°\\)</p>` });
  });
  serija("totalni", 5, (r) => {
    const [ime, n] = r.izberi(SN), m = deg(Math.asin(1 / n));
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(m, 4), tol: 0.005, enota: "°", besedilo: `Kolikšen je mejni kot totalnega odboja na meji med snovjo (${ime}, \\(n = ${L(n, 2)}\\)) in zrakom?`, rezultat: `${T(m, 1)}°`, postopek: `<p>Pri mejnem kotu je lomni kot 90°: \\(n\\sin\\alpha_m = 1\\).</p><p>\\(\\alpha_m = \\arcsin\\frac{1}{${L(n, 2)}} \\approx ${L(m, 1)}°\\)</p>` });
  });
  serija("zbiralna", 8, (r, i) => {
    const f = r.int(5, 30), a = f + r.int(2, 40);
    const b = (a * f) / (a - f), M = b / a;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(M, 4), enota: "", besedilo: `Predmet je ${a} cm pred zbiralno lečo z goriščno razdaljo ${f} cm. Kolikšna je povečava slike?`, rezultat: `${T(M, 2)}`, postopek: `<p>\\(b = \\frac{af}{a - f} = \\frac{${a} \\cdot ${f}}{${a - f}} \\approx ${L(b, 2)}\\ \\text{cm}\\)</p><p>\\(M = \\frac{b}{a} \\approx ${L(M, 2)}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(b, 4), enota: "cm", besedilo: `Predmet postavimo ${a} cm pred zbiralno lečo z goriščno razdaljo ${f} cm. Kako daleč za lečo nastane slika?`, rezultat: `${T(b, 1)} cm`, postopek: `<p>Enačba leče: \\(\\frac1a + \\frac1b = \\frac1f\\).</p><p>\\(b = \\frac{af}{a - f} = \\frac{${a} \\cdot ${f}}{${a - f}} \\approx ${L(b, 1)}\\ \\text{cm}\\)</p>` });
  });
  serija("navidezna", 4, (r) => {
    const f = r.int(10, 30), a = r.int(2, f - 1), b = (a * f) / (a - f);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(b, 4), enota: "cm", besedilo: `Predmet je ${a} cm pred zbiralno lečo z goriščno razdaljo ${f} cm. Kje je slika? (Navidezna slika ima negativno \\(b\\).)`, rezultat: `${T(b, 1)} cm (navidezna, pokončna)`, postopek: `<p>\\(b = \\frac{af}{a - f} = \\frac{${a} \\cdot ${f}}{${a - f}} \\approx ${L(b, 1)}\\ \\text{cm}\\)</p><p>Predmet je znotraj goriščne razdalje: slika je navidezna in povečana (lupa).</p>` });
  });
  serija("razprsilna", 3, (r) => {
    const f = -r.int(5, 30), a = r.int(5, 60), b = (a * f) / (a - f);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(b, 4), enota: "cm", besedilo: `Predmet je ${a} cm pred razpršilno lečo z goriščno razdaljo ${f} cm. Kje nastane slika?`, rezultat: `${T(b, 1)} cm (navidezna)`, postopek: `<p>\\(b = \\frac{af}{a - f} = \\frac{${a} \\cdot (${f})}{${a - f}} \\approx ${L(b, 1)}\\ \\text{cm}\\)</p>` });
  });
  serija("dioptrija", 4, (r) => {
    const f = r.izberi([-50, -25, 20, 25, 40, 50, 100, -100, 200]);
    return kolicina({ tezavnost: 1, vrednost: 100 / f, enota: "dpt", besedilo: `Kolikšna je lomnost leče z goriščno razdaljo ${f} cm?`, rezultat: `${T(100 / f, 2)} dpt`, postopek: `<p>\\(D = \\frac{1}{f} = \\frac{1}{${L(f / 100, 2)}\\ \\text{m}} = ${L(100 / f, 2)}\\ \\text{dpt}\\)</p>` });
  });
  serija("ogledalo", 4, (r) => {
    const R = r.int(10, 60), f = R / 2, a = f + r.int(2, 30), b = (a * f) / (a - f);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(b, 4), enota: "cm", besedilo: `Predmet je ${a} cm pred vbočenim zrcalom s krivinskim polmerom ${R} cm. Kje nastane slika?`, rezultat: `${T(b, 1)} cm`, postopek: `<p>\\(f = \\frac{R}{2} = ${L(f, 1)}\\ \\text{cm}\\), \\(b = \\frac{af}{a - f} \\approx ${L(b, 1)}\\ \\text{cm}\\)</p>` });
  });
  serija("uklonska", 5, (r, i) => {
    const N = r.izberi([100, 300, 500, 600]), d = 1e-3 / N, lam = r.int(400, 700) * 1e-9, m = r.int(1, 2);
    const s = (m * lam) / d;
    if (s >= 1) return null;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(deg(Math.asin(s)), 4), tol: 0.005, enota: "°", besedilo: `Svetloba z valovno dolžino ${L(lam * 1e9, 0)} nm pade na uklonsko mrežico s ${N} režami na milimeter. Pod kolikšnim kotom je ${m}. ojačitev?`, rezultat: `${T(deg(Math.asin(s)), 1)}°`, postopek: `<p>\\(d = \\frac{1\\ \\text{mm}}{${N}} = ${sci(d)}\\ \\text{m}\\), \\(\\sin\\alpha = \\frac{m\\lambda}{d} = ${L(s, 4)}\\)</p><p>\\(\\alpha \\approx ${L(deg(Math.asin(s)), 1)}°\\)</p>` });
  });
  serija("dve-reze", 4, (r) => {
    const lam = r.int(400, 700) * 1e-9, d = r.int(1, 10) / 10000, Ld = r.int(1, 5);
    const x = (lam * Ld) / d;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: x * 1000, tol: 0.01, enota: "mm", besedilo: `Svetloba z valovno dolžino ${L(lam * 1e9, 0)} nm pade na dve reži, ki sta ${L(d * 1000, 1)} mm narazen. Kolikšen je razmik med sosednjima svetlima progama na zaslonu ${Ld} m stran?`, rezultat: `${T(x * 1000, 2)} mm`, postopek: `<p>Za majhne kote: \\(\\Delta x = \\frac{\\lambda L}{d} = \\frac{${sci(lam)} \\cdot ${Ld}}{${sci(d)}} \\approx ${L(x * 1000, 2)}\\ \\text{mm}\\)</p>` });
  });
  serija("foton", 4, (r) => {
    const lam = r.int(300, 800) * 1e-9, E = (6.63e-34 * c) / lam;
    return kolicina({ tezavnost: 3, vrednost: E / 1.6e-19, tol: 0.01, enota: "eV", besedilo: `Kolikšna je energija fotona svetlobe z valovno dolžino ${L(lam * 1e9, 0)} nm v elektronvoltih? (\\(h = 6{,}63 \\cdot 10^{-34}\\) Js)`, rezultat: `${T(E / 1.6e-19, 2)} eV`, postopek: `<p>\\(E = \\frac{hc}{\\lambda} \\approx ${sci(E)}\\ \\text{J} = ${L(E / 1.6e-19, 2)}\\ \\text{eV}\\)</p>` });
  });
  serija("visja-planparalelna", 3, (r) => {
    const n = 1.5, a = r.int(20, 70), d = r.int(1, 10);
    const b = Math.asin(Math.sin(rad(a)) / n), s = (d * Math.sin(rad(a) - b)) / Math.cos(b);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(s, 5), tol: 0.01, enota: "cm", besedilo: `Žarek vpade pod kotom ${a}° na ${d} cm debelo stekleno ploščo (\\(n = 1{,}5\\)). Za koliko se vzporedno premakne?`, rezultat: `${T(s, 2)} cm`, postopek: `<p>\\(\\beta = \\arcsin\\frac{\\sin ${a}°}{1{,}5} \\approx ${L(deg(b), 2)}°\\)</p><p>\\(s = \\frac{d\\sin(\\alpha - \\beta)}{\\cos\\beta} \\approx ${L(s, 2)}\\ \\text{cm}\\)</p>` });
  });
  pojmi([
    ["lomni količnik", "Razmerje med hitrostjo svetlobe v vakuumu in v snovi."],
    ["totalni odboj", "Pojav, ko se svetloba na meji z optično redkejšo snovjo v celoti odbije."],
    ["gorišče", "Točka, v kateri se zberejo žarki, ki vpadajo vzporedno z optično osjo."],
    ["realna slika", "Slika, ki jo lahko ujamemo na zaslon, ker se žarki res sekajo."],
    ["disperzija", "Razklon svetlobe na barve, ker je lomni količnik odvisen od valovne dolžine."],
    ["polarizacija", "Usmerjenost nihanja električnega polja svetlobe v eni ravnini."],
    ["kratkovidnost", "Napaka očesa, pri kateri nastane slika oddaljenih predmetov pred mrežnico; popravimo jo z razpršilno lečo."],
  ]);
}
