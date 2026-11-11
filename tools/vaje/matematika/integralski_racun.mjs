import { stevilo, izbira, T, L, zaokrozi, ulomek, polinom } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
// nedoločeni integral polinoma (koeficienti od najvišje potence) kot ulomki → vrednost v točki
const F = (k, x) => k.reduce((s, c, i) => s + (c * x ** (k.length - i)) / (k.length - i), 0);
const Ftex = (k) => k.map((c, i) => {
  const n = k.length - i;
  if (!c) return "";
  const u = ulomek(c, n);
  const zn = u.startsWith("-") ? "-" : "+";
  const abs = u.replace(/^-/, "");
  return ` ${zn} ${abs === "1" ? "" : abs}x${n > 1 ? `^{${n}}` : ""}`;
}).join("").replace(/^ \+ /, "").replace(/^ - /, "-");

export default function ({ serija }) {
  serija("osnovni", 7, (r) => {
    const [f, prav, nap] = r.izberi([
      ["x^{3}", "\\frac{x^4}{4} + C", ["3x^2 + C", "x^4 + C", "\\frac{x^3}{3} + C"]],
      ["\\cos x", "\\sin x + C", ["-\\sin x + C", "\\cos x + C", "-\\cos x + C"]],
      ["\\sin x", "-\\cos x + C", ["\\cos x + C", "-\\sin x + C", "\\sin x + C"]],
      ["e^x", "e^x + C", ["xe^x + C", "\\frac{e^{x+1}}{x+1} + C", "\\ln x + C"]],
      ["\\frac{1}{x}", "\\ln|x| + C", ["-\\frac{1}{x^2} + C", "\\frac{x^0}{0} + C", "e^x + C"]],
      ["\\sqrt{x}", "\\frac{2}{3}x\\sqrt{x} + C", ["\\frac{1}{2\\sqrt x} + C", "\\frac{3}{2}x\\sqrt{x} + C", "2\\sqrt{x} + C"]],
      ["\\frac{1}{\\cos^2 x}", "\\tan x + C", ["\\cot x + C", "-\\tan x + C", "\\sin x + C"]],
      ["5", "5x + C", ["5 + C", "0 + C", "\\frac{5x^2}{2} + C"]],
      ["x^{-2}", "-\\frac{1}{x} + C", ["\\frac{1}{x} + C", "-2x^{-3} + C", "\\ln x^2 + C"]],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: `Izračunaj nedoločeni integral \\(\\int ${f} \\, dx\\).`, pravilna: `\\(${prav}\\)`, napacne: nap.map((x) => `\\(${x}\\)`), postopek: `<p>Iz tabele integralov: \\(\\int ${f} \\, dx = ${prav}\\). Preverimo z odvajanjem.</p>` });
  });
  serija("polinom-nedoloceni", 5, (r) => {
    const k = [r.int(1, 4) * 3, r.int(-4, 4) * 2, r.int(-6, 6)];
    return izbira({ r, tezavnost: 2, besedilo: `Izračunaj \\(\\int (${polinom(k)}) \\, dx\\).`, pravilna: `\\(${Ftex(k)} + C\\)`, napacne: [`\\(${polinom([k[0] * 2, k[1]])} + C\\)`, `\\(${polinom([k[0], k[1], k[2], 0])} + C\\)`, `\\(${Ftex(k)}\\)`], postopek: `<p>Integriramo člen za členom: \\(\\int x^n dx = \\frac{x^{n+1}}{n+1}\\).</p><p>\\(${Ftex(k)} + C\\)</p>` });
  });
  serija("doloceni", 8, (r, i) => {
    const st = i < 4 ? 1 : 2, k = Array.from({ length: st + 1 }, (_, j) => (j === 0 ? r.nenic(-3, 3) * (st + 1) : r.int(-5, 5)));
    const a = r.int(-2, 2), b = a + r.int(1, 3), v = F(k, b) - F(k, a);
    return stevilo({ tezavnost: i < 4 ? 1 : 2, vrednost: zaokrozi(v, 6), toleranca: 0.01, besedilo: `Izračunaj \\(\\int_{${a}}^{${b}} (${polinom(k)}) \\, dx\\).`, rezultat: `${L(v, 3)}`, postopek: `<p>Nedoločeni integral: \\(F(x) = ${Ftex(k)}\\).</p><p>\\(F(${b}) - F(${a}) = ${L(F(k, b), 3)} - ${okl(L(F(k, a), 3))} = ${L(v, 3)}\\)</p>` });
  });
  serija("doloceni-elem", 5, (r) => {
    const [f, a, b, v, Fs] = r.izberi([
      ["\\cos x", "0", "\\frac{\\pi}{2}", 1, "\\sin x"],
      ["\\sin x", "0", "\\pi", 2, "-\\cos x"],
      ["e^x", "0", "1", Math.E - 1, "e^x"],
      ["\\frac{1}{x}", "1", "e", 1, "\\ln x"],
      ["\\frac{1}{x}", "1", "e^2", 2, "\\ln x"],
      ["\\sin x", "0", "\\frac{\\pi}{2}", 1, "-\\cos x"],
      ["e^x", "0", "\\ln 3", 2, "e^x"],
      ["\\sqrt{x}", "0", "4", 16 / 3, "\\frac{2}{3}x^{3/2}"],
    ]);
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(v, 6), toleranca: 0.01, besedilo: `Izračunaj \\(\\int_{${a}}^{${b}} ${f} \\, dx\\)${Number.isInteger(v) ? "" : " (na dve decimalki)"}.`, rezultat: `${L(v, 3)}`, postopek: `<p>\\(\\int_{${a}}^{${b}} ${f} \\, dx = \\left. ${Fs} \\right|_{${a}}^{${b}} = ${L(v, 3)}\\)</p>` });
  });
  serija("ploscina-os", 6, (r) => {
    const x1 = r.int(-4, 1), x2 = x1 + r.int(2, 5), a = r.izberi([1, -1]);
    // f = a(x - x1)(x - x2); ploščina med grafom in osjo x = |a| (x2-x1)^3/6
    const k = [a, -a * (x1 + x2), a * x1 * x2], P = Math.abs(a) * (x2 - x1) ** 3 / 6;
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(P, 6), toleranca: 0.01, besedilo: `Izračunaj ploščino lika, ki ga omejujeta graf funkcije \\(f(x) = ${polinom(k)}\\) in os \\(x\\) (na dve decimalki).`, rezultat: `${L(P, 3)}`, postopek: `<p>Ničli: \\(${x1}\\) in \\(${x2}\\). Med njima je funkcija ${a > 0 ? "negativna" : "pozitivna"}.</p><p>\\(S = \\left|\\int_{${x1}}^{${x2}} f(x) \\, dx\\right| = |F(${x2}) - F(${x1})| = ${L(P, 3)}\\), kjer je \\(F(x) = ${Ftex(k)}\\).</p>` });
  });
  serija("ploscina-med", 4, (r) => {
    const n = r.int(1, 4), s = r.int(-2, 2);
    // med y = x^2 + s in y = n^2 + s: S = 4n^3/3
    const P = (4 * n ** 3) / 3;
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(P, 6), toleranca: 0.01, besedilo: `Izračunaj ploščino lika med parabolo \\(y = ${polinom([1, 0, s])}\\) in premico \\(y = ${n * n + s}\\) (na dve decimalki).`, rezultat: `\\(${ulomek(4 * n ** 3, 3)} \\approx ${L(P, 2)}\\)`, postopek: `<p>Presečišči: \\(x^2 ${s ? (s < 0 ? `- ${-s}` : `+ ${s}`) : ""} = ${n * n + s}\\), \\(x = \\pm ${n}\\).</p><p>\\(S = \\int_{-${n}}^{${n}} (${n * n} - x^2) \\, dx = \\left. ${n * n}x - \\frac{x^3}{3} \\right|_{-${n}}^{${n}} = ${ulomek(4 * n ** 3, 3)}\\)</p>` });
  });
  serija("substitucija", 4, (r) => {
    const a = r.int(2, 5), n = r.int(2, 4);
    const prav = `\\(\\frac{(${a}x + 1)^{${n + 1}}}{${a * (n + 1)}} + C\\)`;
    return izbira({ r, tezavnost: 3, besedilo: `Izračunaj \\(\\int (${a}x + 1)^{${n}} \\, dx\\).`, pravilna: prav, napacne: [`\\(\\frac{(${a}x + 1)^{${n + 1}}}{${n + 1}} + C\\)`, `\\(${a * n}(${a}x + 1)^{${n - 1}} + C\\)`, `\\(\\frac{${a}(${a}x + 1)^{${n + 1}}}{${n + 1}} + C\\)`], postopek: `<p>Uvedemo \\(t = ${a}x + 1\\), \\(dt = ${a} \\, dx\\): \\(\\frac{1}{${a}}\\int t^{${n}} dt = \\frac{t^{${n + 1}}}{${a * (n + 1)}} + C\\).</p>` });
  });
  serija("substitucija-dol", 3, (r) => {
    const a = r.int(2, 4);
    // ∫_0^1 2x e^{x^2}... uporabimo ∫_0^a 2x/(x^2+1) dx = ln(a^2+1)
    const v = Math.log(a * a + 1);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(v, 6), toleranca: 0.01, besedilo: `Izračunaj \\(\\int_0^{${a}} \\frac{2x}{x^2 + 1} \\, dx\\) (na dve decimalki).`, rezultat: `\\(\\ln ${a * a + 1} \\approx ${L(v, 2)}\\)`, postopek: `<p>Števec je odvod imenovalca, zato \\(\\int \\frac{2x}{x^2 + 1} dx = \\ln(x^2 + 1) + C\\).</p><p>\\(\\ln ${a * a + 1} - \\ln 1 = \\ln ${a * a + 1} \\approx ${L(v, 2)}\\)</p>` });
  });
  serija("per-partes", 3, (r) => {
    const [f, prav, nap, raz] = r.izberi([
      ["xe^x", "(x - 1)e^x + C", ["xe^x + C", "\\frac{x^2}{2}e^x + C", "(x + 1)e^x + C"], "\\(u = x\\), \\(dv = e^x dx\\)"],
      ["x\\cos x", "x\\sin x + \\cos x + C", ["x\\sin x - \\cos x + C", "-x\\sin x + C", "\\frac{x^2}{2}\\sin x + C"], "\\(u = x\\), \\(dv = \\cos x \\, dx\\)"],
      ["\\ln x", "x\\ln x - x + C", ["\\frac{1}{x} + C", "x\\ln x + C", "\\frac{\\ln^2 x}{2} + C"], "\\(u = \\ln x\\), \\(dv = dx\\)"],
      ["x\\sin x", "-x\\cos x + \\sin x + C", ["x\\cos x + \\sin x + C", "-x\\cos x - \\sin x + C", "\\frac{x^2}{2}\\cos x + C"], "\\(u = x\\), \\(dv = \\sin x \\, dx\\)"],
    ]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Izračunaj \\(\\int ${f} \\, dx\\) (integracija po delih).`, pravilna: `\\(${prav}\\)`, napacne: nap.map((x) => `\\(${x}\\)`), postopek: `<p>\\(\\int u \\, dv = uv - \\int v \\, du\\), izberemo ${raz}.</p><p>Rezultat: \\(${prav}\\). Preverimo z odvajanjem.</p>` });
  });
  serija("zacetni-pogoj", 4, (r) => {
    const a = r.nenic(-3, 3) * 2, b = r.int(-4, 4), x0 = r.int(-2, 2), y0 = r.int(-6, 6);
    // F' = a x + b, F(x0) = y0 → C = y0 - (a/2 x0^2 + b x0); vprašamo F(0)
    const C = y0 - ((a / 2) * x0 * x0 + b * x0);
    return stevilo({ tezavnost: 3, vrednost: C, besedilo: `Funkcija \\(F\\) ima odvod \\(F'(x) = ${polinom([a, b])}\\) in velja \\(F(${x0}) = ${y0}\\). Izračunaj \\(F(0)\\).`, rezultat: `\\(F(0) = ${C}\\)`, postopek: `<p>\\(F(x) = ${polinom([a / 2, b, 0]).replace(/^0$/, "")} + C\\).</p><p>\\(F(${x0}) = ${(a / 2) * x0 * x0 + b * x0} + C = ${y0}\\), \\(C = ${C}\\). Torej \\(F(0) = C = ${C}\\).</p>` });
  });
  serija("lastnosti", 4, (r) => {
    const A = r.int(-6, 9), B = r.int(-6, 9), k = r.int(2, 5);
    const tip = r.izberi(["vsota", "obrat", "konst"]);
    if (tip === "vsota") return stevilo({ tezavnost: 1, vrednost: A + B, besedilo: `Velja \\(\\int_0^2 f(x) \\, dx = ${A}\\) in \\(\\int_2^5 f(x) \\, dx = ${B}\\). Izračunaj \\(\\int_0^5 f(x) \\, dx\\).`, rezultat: `${A + B}`, postopek: `<p>Aditivnost glede na meje: \\(\\int_0^5 = \\int_0^2 + \\int_2^5 = ${A} + ${okl(B)} = ${A + B}\\).</p>` });
    if (tip === "obrat") return stevilo({ tezavnost: 1, vrednost: -A, besedilo: `Velja \\(\\int_1^4 f(x) \\, dx = ${A}\\). Izračunaj \\(\\int_4^1 f(x) \\, dx\\).`, rezultat: `${-A}`, postopek: `<p>Zamenjava mej spremeni predznak: \\(\\int_4^1 f = -\\int_1^4 f = ${-A}\\).</p>` });
    return stevilo({ tezavnost: 1, vrednost: k * A + 3 * k, besedilo: `Velja \\(\\int_0^3 f(x) \\, dx = ${A}\\). Izračunaj \\(\\int_0^3 (${k}f(x) + ${k}) \\, dx\\).`, rezultat: `${k * A + 3 * k}`, postopek: `<p>Linearnost: \\(${k}\\int_0^3 f \\, dx + \\int_0^3 ${k} \\, dx = ${k} \\cdot ${okl(A)} + ${k} \\cdot 3 = ${k * A + 3 * k}\\).</p>` });
  });
  serija("prostornina", 4, (r) => {
    const a = r.int(1, 4), b = r.int(1, 3);
    // vrtenje y = a x od 0 do b okoli osi x: stožec V = π a^2 b^3 /3
    const V = (Math.PI * a * a * b ** 3) / 3;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(V, 4), toleranca: 0.05, besedilo: `Lik pod premico \\(y = ${a === 1 ? "" : a}x\\) na intervalu \\([0, ${b}]\\) zavrtimo okoli osi \\(x\\). Izračunaj prostornino nastalega telesa (na dve decimalki).`, rezultat: `\\(${ulomek(a * a * b ** 3, 3)}\\pi \\approx ${L(V, 2)}\\)`, postopek: `<p>\\(V = \\pi\\int_0^{${b}} (${a === 1 ? "" : a}x)^2 \\, dx = \\pi \\cdot ${a * a} \\cdot \\left.\\frac{x^3}{3}\\right|_0^{${b}} = ${ulomek(a * a * b ** 3, 3)}\\pi \\approx ${L(V, 2)}\\)</p><p>(To je stožec z \\(r = ${a * b}\\), \\(v = ${b}\\).)</p>` });
  });
  serija("prostornina-koren", 3, (r) => {
    const b = r.int(1, 6);
    const V = (Math.PI * b * b) / 2;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(V, 4), toleranca: 0.05, besedilo: `Lik pod grafom \\(y = \\sqrt{x}\\) na intervalu \\([0, ${b}]\\) zavrtimo okoli osi \\(x\\). Izračunaj prostornino (na dve decimalki).`, rezultat: `\\(${ulomek(b * b, 2)}\\pi \\approx ${L(V, 2)}\\)`, postopek: `<p>\\(V = \\pi\\int_0^{${b}} x \\, dx = \\pi \\left.\\frac{x^2}{2}\\right|_0^{${b}} = ${ulomek(b * b, 2)}\\pi \\approx ${L(V, 2)}\\)</p>` });
  });
  serija("pot", 4, (r) => {
    const a = r.int(1, 4), b = r.int(0, 6), t = r.int(2, 6);
    const s = (a * t * t) / 2 + b * t;
    return stevilo({ tezavnost: 3, vrednost: s, enota: "m", besedilo: `Hitrost telesa je \\(v(t) = ${polinom([a, b], "t")}\\) m/s. Koliko poti opravi telo v prvih ${t} sekundah?`, rezultat: `${s} m`, postopek: `<p>Pot je integral hitrosti: \\(s = \\int_0^{${t}} (${polinom([a, b], "t")}) \\, dt = \\left. ${Ftex([a, b]).replace(/x/g, "t")} \\right|_0^{${t}} = ${s}\\) m.</p>` });
  });
  serija("visja-parameter", 3, (r) => {
    const a = r.int(1, 4), P = r.izberi([2, 4, 6, 8, 9]);
    // ∫_0^b a x dx = a b^2 /2 = P  → b = sqrt(2P/a)
    const b = Math.sqrt((2 * P) / a);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(b, 6), toleranca: 0.01, besedilo: `Za kateri pozitivni \\(b\\) je \\(\\int_0^b ${a === 1 ? "" : a}x \\, dx = ${P}\\)? (Na dve decimalki.)`, rezultat: `\\(b \\approx ${L(b, 2)}\\)`, postopek: `<p>\\(\\int_0^b ${a === 1 ? "" : a}x \\, dx = \\frac{${a}b^2}{2} = ${P}\\), \\(b^2 = ${L((2 * P) / a, 3)}\\), \\(b \\approx ${L(b, 2)}\\).</p>` });
  });
  serija("povprecna", 3, (r) => {
    const a = r.int(1, 3), b = r.int(1, 4);
    // povprečna vrednost x^2 na [0,b]: b^2/3; skaliramo a
    const v = (a * b * b) / 3;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 6), toleranca: 0.01, besedilo: `Povprečna vrednost funkcije na \\([a, b]\\) je \\(\\frac{1}{b - a}\\int_a^b f(x) \\, dx\\). Izračunaj povprečno vrednost \\(f(x) = ${a === 1 ? "" : a}x^2\\) na \\([0, ${b}]\\) (na dve decimalki).`, rezultat: `${L(v, 2)}`, postopek: `<p>\\(\\frac{1}{${b}}\\int_0^{${b}} ${a === 1 ? "" : a}x^2 \\, dx = \\frac{1}{${b}} \\cdot \\frac{${a * b ** 3}}{3} = ${L(v, 3)}\\)</p>` });
  });
}
