import { stevilo, izbira, T, zaokrozi } from "../lib.mjs";

const L = (x, d = 2) => T(x, d).replace("−", "-").replace(",", "{,}");
const PI = Math.PI;
// Rezultat s π: vrednost in zapis "12π ≈ 37,70"
const zPi = (k, d = 2) => `${k === 1 ? "" : L(k, 3)}\\pi \\approx ${L(k * PI, d)}`;

export default function ({ z, slug, serija }) {
  // 1. Trikotnik
  serija("trikotnik", 8, (r, i) => {
    if (i % 2 === 0) { const a = r.int(4, 20), v = r.int(3, 15); return stevilo({ tezavnost: 1, vrednost: (a * v) / 2, enota: "cm²", besedilo: `Trikotnik ima stranico \\(a = ${a}\\) cm in višino na to stranico \\(v_a = ${v}\\) cm. Izračunaj ploščino.`, rezultat: `${T((a * v) / 2)} cm²`, postopek: `<p>\\(P = \\frac{a \\cdot v_a}{2} = \\frac{${a} \\cdot ${v}}{2} = ${L((a * v) / 2)}\\) cm²</p>` }); }
    const [a, b, c] = r.izberi([[13, 14, 15], [5, 5, 6], [7, 8, 9], [6, 8, 10], [9, 10, 17], [10, 13, 13], [4, 13, 15]]);
    const s = (a + b + c) / 2, P = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return stevilo({ tezavnost: 2, vrednost: P, enota: "cm²", besedilo: `Izračunaj ploščino trikotnika s stranicami ${a} cm, ${b} cm in ${c} cm.`, rezultat: `${T(P, 2)} cm²`, postopek: `<p>Heronova formula: \\(s = \\frac{a + b + c}{2} = ${L(s)}\\).</p><p>\\(P = \\sqrt{s(s - a)(s - b)(s - c)} = \\sqrt{${L(s)} \\cdot ${L(s - a)} \\cdot ${L(s - b)} \\cdot ${L(s - c)}} = ${L(P)}\\) cm²</p>` });
  });

  // 2. Štirikotniki
  serija("stirikotnik", 6, (r, i) => {
    const v = i % 3;
    if (v === 0) { const e = r.int(4, 20), f = r.int(4, 20); return stevilo({ tezavnost: 1, vrednost: (e * f) / 2, enota: "cm²", besedilo: `Diagonali romba merita ${e} cm in ${f} cm. Izračunaj ploščino romba.`, rezultat: `${T((e * f) / 2)} cm²`, postopek: `<p>\\(P = \\frac{e \\cdot f}{2} = \\frac{${e} \\cdot ${f}}{2} = ${L((e * f) / 2)}\\) cm²</p>` }); }
    if (v === 1) { const a = r.int(8, 20), c = r.int(3, a - 2), h = r.int(3, 12); return stevilo({ tezavnost: 1, vrednost: ((a + c) * h) / 2, enota: "cm²", besedilo: `Trapez ima osnovnici ${a} cm in ${c} cm ter višino ${h} cm. Izračunaj ploščino.`, rezultat: `${T(((a + c) * h) / 2)} cm²`, postopek: `<p>\\(P = \\frac{(a + c) \\cdot v}{2} = \\frac{(${a} + ${c}) \\cdot ${h}}{2} = ${L(((a + c) * h) / 2)}\\) cm²</p>` }); }
    const [x, h, kr] = r.izberi([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]);
    const c = r.int(4, 10), a = c + 2 * x;
    return stevilo({ tezavnost: 2, vrednost: ((a + c) * h) / 2, enota: "cm²", besedilo: `Enakokraki trapez ima osnovnici ${a} cm in ${c} cm ter krak ${kr} cm. Izračunaj ploščino.`, rezultat: `${T(((a + c) * h) / 2)} cm²`, postopek: `<p>Višina: \\(\\frac{a - c}{2} = ${x}\\), \\(v = \\sqrt{${kr}^2 - ${x}^2} = ${h}\\) cm.</p><p>\\(P = \\frac{(${a} + ${c}) \\cdot ${h}}{2} = ${L(((a + c) * h) / 2)}\\) cm²</p>` });
  });

  // 3. Krog
  serija("krog", 9, (r, i) => {
    const rr = r.int(2, 15), v = i % 3;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: PI * rr * rr, enota: "cm²", besedilo: `Izračunaj ploščino kroga s polmerom ${rr} cm.`, rezultat: `\\(${zPi(rr * rr)}\\) cm²`, postopek: `<p>\\(P = \\pi r^2 = \\pi \\cdot ${rr}^2 = ${zPi(rr * rr)}\\) cm²</p>` });
    if (v === 1) { const a = r.izberi([30, 45, 60, 72, 90, 120, 135, 150]); const P = (PI * rr * rr * a) / 360, l = (PI * rr * a) / 180; return i % 2 ? stevilo({ tezavnost: 2, vrednost: P, enota: "cm²", besedilo: `Izračunaj ploščino krožnega izseka s polmerom ${rr} cm in središčnim kotom ${a}°.`, rezultat: `${T(P, 2)} cm²`, postopek: `<p>\\(P_i = \\frac{\\pi r^2 \\alpha}{360°} = \\frac{\\pi \\cdot ${rr * rr} \\cdot ${a}°}{360°} \\approx ${L(P)}\\) cm²</p>` }) : stevilo({ tezavnost: 2, vrednost: l, enota: "cm", besedilo: `Izračunaj dolžino krožnega loka s polmerom ${rr} cm in središčnim kotom ${a}°.`, rezultat: `${T(l, 2)} cm`, postopek: `<p>\\(l = \\frac{\\pi r \\alpha}{180°} = \\frac{\\pi \\cdot ${rr} \\cdot ${a}°}{180°} \\approx ${L(l)}\\) cm</p>` }); }
    const R = rr + r.int(1, 6);
    return stevilo({ tezavnost: 2, vrednost: PI * (R * R - rr * rr), enota: "cm²", besedilo: `Kolobar ima zunanji polmer ${R} cm in notranji ${rr} cm. Izračunaj njegovo ploščino.`, rezultat: `\\(${zPi(R * R - rr * rr)}\\) cm²`, postopek: `<p>\\(P = \\pi(R^2 - r^2) = \\pi(${R * R} - ${rr * rr}) = ${zPi(R * R - rr * rr)}\\) cm²</p>` });
  });
  serija("vcrtan", 5, (r, i) => {
    const [a, b, c] = r.izberi([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]);
    if (i % 2 === 0) return stevilo({ tezavnost: 3, vrednost: c / 2, enota: "cm", besedilo: `Kateti pravokotnega trikotnika merita ${a} cm in ${b} cm. Kolikšen je polmer trikotniku očrtanega kroga?`, rezultat: `${T(c / 2)} cm`, postopek: `<p>Hipotenuza: \\(c = \\sqrt{${a * a} + ${b * b}} = ${c}\\). Središče očrtanega kroga je razpolovišče hipotenuze (Talesov izrek): \\(R = \\frac{c}{2} = ${L(c / 2)}\\) cm.</p>` });
    const P = (a * b) / 2, s = (a + b + c) / 2;
    return stevilo({ tezavnost: 3, vrednost: P / s, enota: "cm", besedilo: `Kateti pravokotnega trikotnika merita ${a} cm in ${b} cm. Kolikšen je polmer trikotniku včrtanega kroga?`, rezultat: `${T(P / s)} cm`, postopek: `<p>\\(c = ${c}\\), \\(P = \\frac{${a} \\cdot ${b}}{2} = ${P}\\), \\(s = \\frac{${a} + ${b} + ${c}}{2} = ${s}\\).</p><p>\\(r = \\frac{P}{s} = \\frac{${P}}{${s}} = ${L(P / s)}\\) cm</p>` });
  });

  // 4. Telesa
  serija("kvader", 7, (r, i) => {
    const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 12), v = i % 3;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: a * b * c, enota: "cm³", besedilo: `Izračunaj prostornino kvadra z robovi ${a} cm, ${b} cm in ${c} cm.`, rezultat: `${a * b * c} cm³`, postopek: `<p>\\(V = abc = ${a} \\cdot ${b} \\cdot ${c} = ${a * b * c}\\) cm³</p>` });
    if (v === 1) return stevilo({ tezavnost: 1, vrednost: 2 * (a * b + a * c + b * c), enota: "cm²", besedilo: `Izračunaj površino kvadra z robovi ${a} cm, ${b} cm in ${c} cm.`, rezultat: `${2 * (a * b + a * c + b * c)} cm²`, postopek: `<p>\\(P = 2(ab + ac + bc) = 2(${a * b} + ${a * c} + ${b * c}) = ${2 * (a * b + a * c + b * c)}\\) cm²</p>` });
    const d = Math.sqrt(a * a + b * b + c * c);
    return stevilo({ tezavnost: 2, vrednost: d, enota: "cm", besedilo: `Izračunaj dolžino telesne diagonale kvadra z robovi ${a} cm, ${b} cm in ${c} cm.`, rezultat: `${T(d, 2)} cm`, postopek: `<p>\\(D = \\sqrt{a^2 + b^2 + c^2} = \\sqrt{${a * a + b * b + c * c}} \\approx ${L(d)}\\) cm</p>` });
  });
  serija("valj", 5, (r, i) => {
    const rr = r.int(2, 10), v = r.int(3, 20);
    if (i % 2 === 0) return stevilo({ tezavnost: 2, vrednost: PI * rr * rr * v, enota: "cm³", besedilo: `Valj ima polmer osnovne ploskve ${rr} cm in višino ${v} cm. Izračunaj prostornino.`, rezultat: `\\(${zPi(rr * rr * v)}\\) cm³`, postopek: `<p>\\(V = \\pi r^2 v = \\pi \\cdot ${rr * rr} \\cdot ${v} = ${zPi(rr * rr * v)}\\) cm³</p>` });
    return stevilo({ tezavnost: 2, vrednost: 2 * PI * rr * (rr + v), enota: "cm²", besedilo: `Valj ima polmer osnovne ploskve ${rr} cm in višino ${v} cm. Izračunaj površino.`, rezultat: `\\(${zPi(2 * rr * (rr + v))}\\) cm²`, postopek: `<p>\\(P = 2\\pi r^2 + 2\\pi r v = 2\\pi r(r + v) = 2\\pi \\cdot ${rr} \\cdot ${rr + v} = ${zPi(2 * rr * (rr + v))}\\) cm²</p>` });
  });
  serija("piramida", 6, (r, i) => {
    const a = 2 * r.int(2, 8), v = r.int(3, 15);
    if (i % 2 === 0) return stevilo({ tezavnost: 2, vrednost: (a * a * v) / 3, enota: "cm³", besedilo: `Pravilna štiristrana piramida ima osnovni rob ${a} cm in višino ${v} cm. Izračunaj prostornino.`, rezultat: `${T((a * a * v) / 3, 2)} cm³`, postopek: `<p>\\(V = \\frac{a^2 v}{3} = \\frac{${a * a} \\cdot ${v}}{3} = ${L((a * a * v) / 3)}\\) cm³</p>` });
    const vs = Math.sqrt(v * v + (a / 2) ** 2), P = a * a + 2 * a * vs;
    return stevilo({ tezavnost: 3, vrednost: P, enota: "cm²", besedilo: `Pravilna štiristrana piramida ima osnovni rob ${a} cm in višino ${v} cm. Izračunaj površino (na dve decimalki).`, rezultat: `${T(P, 2)} cm²`, postopek: `<p>Višina stranske ploskve: \\(v_a = \\sqrt{v^2 + (\\frac a2)^2} = \\sqrt{${v * v} + ${(a / 2) ** 2}} \\approx ${L(vs)}\\) cm.</p><p>\\(P = a^2 + 4 \\cdot \\frac{a v_a}{2} = ${a * a} + 2 \\cdot ${a} \\cdot ${L(vs)} \\approx ${L(P)}\\) cm²</p>` });
  });
  serija("stozec", 6, (r, i) => {
    const [rr, v, s] = r.izberi([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [9, 12, 15]]);
    if (i % 2 === 0) return stevilo({ tezavnost: 2, vrednost: (PI * rr * rr * v) / 3, enota: "cm³", besedilo: `Stožec ima polmer osnovne ploskve ${rr} cm in višino ${v} cm. Izračunaj prostornino.`, rezultat: `\\(${zPi((rr * rr * v) / 3)}\\) cm³`, postopek: `<p>\\(V = \\frac{\\pi r^2 v}{3} = \\frac{\\pi \\cdot ${rr * rr} \\cdot ${v}}{3} = ${zPi((rr * rr * v) / 3)}\\) cm³</p>` });
    return stevilo({ tezavnost: 3, vrednost: PI * rr * (rr + s), enota: "cm²", besedilo: `Stožec ima polmer osnovne ploskve ${rr} cm in višino ${v} cm. Izračunaj površino.`, rezultat: `\\(${zPi(rr * (rr + s))}\\) cm²`, postopek: `<p>Stranica: \\(s = \\sqrt{r^2 + v^2} = \\sqrt{${rr * rr} + ${v * v}} = ${s}\\) cm.</p><p>\\(P = \\pi r^2 + \\pi r s = \\pi \\cdot ${rr}(${rr} + ${s}) = ${zPi(rr * (rr + s))}\\) cm²</p>` });
  });
  serija("krogla", 5, (r, i) => {
    const rr = r.int(2, 12);
    if (i % 2 === 0) return stevilo({ tezavnost: 2, vrednost: (4 / 3) * PI * rr ** 3, enota: "cm³", besedilo: `Izračunaj prostornino krogle s polmerom ${rr} cm.`, rezultat: `\\(${zPi((4 / 3) * rr ** 3)}\\) cm³`, postopek: `<p>\\(V = \\frac{4\\pi r^3}{3} = \\frac{4\\pi \\cdot ${rr ** 3}}{3} = ${zPi((4 / 3) * rr ** 3)}\\) cm³</p>` });
    return stevilo({ tezavnost: 2, vrednost: 4 * PI * rr * rr, enota: "cm²", besedilo: `Izračunaj površino krogle s polmerom ${rr} cm.`, rezultat: `\\(${zPi(4 * rr * rr)}\\) cm²`, postopek: `<p>\\(P = 4\\pi r^2 = 4\\pi \\cdot ${rr * rr} = ${zPi(4 * rr * rr)}\\) cm²</p>` });
  });

  // 5. Enote
  serija("enote", 7, (r, i) => {
    const x = r.int(2, 95) / 10;
    const vse = [
      [`${T(x)} m²`, "cm²", x * 10000, "1 m² = 100 · 100 cm² = 10 000 cm²"],
      [`${T(x)} dm³`, "cm³", x * 1000, "1 dm³ = 1000 cm³"],
      [`${T(x)} l`, "cm³", x * 1000, "1 l = 1 dm³ = 1000 cm³"],
      [`${T(x)} m³`, "l", x * 1000, "1 m³ = 1000 dm³ = 1000 l"],
      [`${T(x * 100)} cm²`, "dm²", x, "1 dm² = 100 cm²"],
      [`${T(x)} ha`, "m²", x * 10000, "1 ha = 10 000 m²"],
      [`${T(x * 1000)} mm³`, "cm³", x, "1 cm³ = 1000 mm³"],
    ];
    const [iz, v, vr, pravilo] = vse[i % vse.length];
    return stevilo({ tezavnost: 1, vrednost: zaokrozi(vr, 6), toleranca: 1e-6, enota: v, besedilo: `Pretvori ${iz} v ${v}.`, rezultat: `${T(vr, 4)} ${v}`, postopek: `<p>${pravilo}, zato je ${iz} = ${T(vr, 4)} ${v}.</p>` });
  });

  // 6. Vrtenine in preoblikovanje
  serija("vrtenina", 4, (r, i) => {
    const a = r.int(2, 9), b = r.int(2, 9);
    if (a === b) return null;
    if (i % 2 === 0) return stevilo({ tezavnost: 3, vrednost: PI * b * b * a, enota: "cm³", besedilo: `Pravokotnik s stranicama \\(a = ${a}\\) cm in \\(b = ${b}\\) cm zavrtimo okoli stranice \\(a\\). Izračunaj prostornino nastale vrtenine.`, rezultat: `\\(${zPi(b * b * a)}\\) cm³`, postopek: `<p>Nastane valj s polmerom \\(r = b = ${b}\\) cm in višino \\(v = a = ${a}\\) cm.</p><p>\\(V = \\pi r^2 v = \\pi \\cdot ${b * b} \\cdot ${a} = ${zPi(b * b * a)}\\) cm³</p>` });
    return stevilo({ tezavnost: 3, vrednost: (PI * b * b * a) / 3, enota: "cm³", besedilo: `Pravokotni trikotnik s katetama \\(a = ${a}\\) cm in \\(b = ${b}\\) cm zavrtimo okoli katete \\(a\\). Izračunaj prostornino nastale vrtenine.`, rezultat: `\\(${zPi((b * b * a) / 3)}\\) cm³`, postopek: `<p>Nastane stožec s polmerom \\(${b}\\) cm in višino \\(${a}\\) cm.</p><p>\\(V = \\frac{\\pi \\cdot ${b * b} \\cdot ${a}}{3} = ${zPi((b * b * a) / 3)}\\) cm³</p>` });
  });
  serija("preoblikovanje", 5, (r, i) => {
    const rr = r.int(2, 6) * 3, R = r.int(3, 9);
    if (i % 2 === 0) { const v = (4 * rr ** 3) / (3 * R * R); return stevilo({ tezavnost: 4, raven: "visja", vrednost: v, enota: "cm", besedilo: `Kovinsko kroglo s polmerom ${rr} cm stalimo in ulijemo valj s polmerom osnovne ploskve ${R} cm. Kolikšna je višina valja? (Na dve decimalki.)`, rezultat: `${T(v, 2)} cm`, postopek: `<p>Prostornina se ohrani: \\(\\frac{4\\pi \\cdot ${rr}^3}{3} = \\pi \\cdot ${R}^2 \\cdot v\\).</p><p>\\(v = \\frac{4 \\cdot ${rr ** 3}}{3 \\cdot ${R * R}} \\approx ${L(v)}\\) cm</p>` }); }
    const a = r.int(4, 12), n = r.int(2, 4);
    const k = Math.cbrt(n);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: a * k, enota: "cm", besedilo: `Kocka ima rob ${a} cm. Kolikšen rob ima kocka z ${n}-krat večjo prostornino? (Na dve decimalki.)`, rezultat: `${T(a * k, 2)} cm`, postopek: `<p>Prostornina je sorazmerna s kubom roba: \\(a' = a\\sqrt[3]{${n}} = ${a} \\cdot ${L(k, 4)} \\approx ${L(a * k)}\\) cm.</p>` });
  });
  serija("koti-telesa", 2, (r) => {
    const a = r.int(2, 10);
    const kot = (Math.atan(1 / Math.SQRT2) * 180) / PI;
    return izbira({ tezavnost: 4, raven: "visja", r, besedilo: `Kolikšen je kot med telesno diagonalo kocke z robom ${a} cm in osnovno ploskvijo?`, pravilna: `${T(kot, 2)}°`, napacne: ["45°", "54,74°", "30°"], postopek: `<p>Kot oklepata telesna diagonala in ploskovna diagonala osnovne ploskve. \\(\\tan\\varphi = \\frac{a}{a\\sqrt2} = \\frac{1}{\\sqrt2}\\).</p><p>\\(\\varphi \\approx ${L(kot)}°\\) (neodvisno od dolžine roba).</p>` });
  });
}
