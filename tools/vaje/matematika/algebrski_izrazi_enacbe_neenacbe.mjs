import { izbira, stevilo, polinom, ulomek, T } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const binom = (n, k) => { let x = 1; for (let i = 1; i <= k; i++) x = (x * (n - k + i)) / i; return Math.round(x); };
const dvoclen = (a, b, x = "x") => `${a === 1 ? "" : a === -1 ? "-" : a}${x}${b === 0 ? "" : ` ${b < 0 ? "-" : "+"} ${Math.abs(b)}`}`;
const iv = (meja, smer, vkljucno) => (smer > 0 ? `${vkljucno ? "[" : "("}${meja}, \\infty)` : `(-\\infty, ${meja}${vkljucno ? "]" : ")"}`);

export default function ({ z, slug, serija }) {
  // 1. Vrednost izraza
  serija("vrednost", 6, (r) => {
    const k = [r.nenic(-5, 5), r.int(-9, 9), r.int(-9, 9)], x = r.int(-4, 4);
    const v = k[0] * x * x + k[1] * x + k[2];
    return stevilo({ tezavnost: 1, vrednost: v, besedilo: `Izračunaj vrednost izraza \\(${polinom(k)}\\) pri \\(x = ${x}\\).`, rezultat: `\\(${v}\\)`, postopek: `<p>Vstavimo \\(x = ${x}\\): \\(${k[0]} \\cdot ${okl(x)}^2 + ${okl(k[1])} \\cdot ${okl(x)} + ${okl(k[2])} = ${k[0] * x * x} + ${okl(k[1] * x)} + ${okl(k[2])} = ${v}\\).</p>` });
  });

  // 2. Kvadrat in kub dvočlenika
  serija("kvadrat", 6, (r, i) => {
    const a = r.int(1, 5), b = r.nenic(-7, 7);
    if (i % 3 === 2) {
      const c = 3 * a * a * b;
      return stevilo({ tezavnost: 2, vrednost: c, besedilo: `Kubiraj \\((${dvoclen(a, b)})^3\\). Kolikšen je koeficient pri \\(x^2\\)?`, rezultat: `\\(${c}\\)`, postopek: `<p>\\((A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3\\), kjer je \\(A = ${a === 1 ? "" : a}x\\), \\(B = ${b}\\).</p><p>Člen z \\(x^2\\): \\(3A^2B = 3 \\cdot ${a * a}x^2 \\cdot ${okl(b)} = ${c}x^2\\).</p>` });
    }
    return stevilo({ tezavnost: 1, vrednost: 2 * a * b, besedilo: `Kvadriraj \\((${dvoclen(a, b)})^2\\). Kolikšen je koeficient pri \\(x\\)?`, rezultat: `\\((${dvoclen(a, b)})^2 = ${polinom([a * a, 2 * a * b, b * b])}\\), koeficient je \\(${2 * a * b}\\)`, postopek: `<p>\\((A + B)^2 = A^2 + 2AB + B^2\\).</p><p>\\(2AB = 2 \\cdot ${a === 1 ? "" : a}x \\cdot ${okl(b)} = ${2 * a * b}x\\), torej \\(${polinom([a * a, 2 * a * b, b * b])}\\).</p>` });
  });
  serija("pascal", 4, (r) => {
    const n = r.int(4, 7), a = r.nenic(-3, 3), k = r.int(1, n - 1);
    const c = binom(n, k) * a ** (n - k);
    return stevilo({ tezavnost: 3, vrednost: c, besedilo: `Kolikšen je koeficient pri \\(x^{${k}}\\) v razvoju \\((x ${a < 0 ? "-" : "+"} ${Math.abs(a)})^{${n}}\\)?`, rezultat: `\\(${c}\\)`, postopek: `<p>Splošni člen je \\(\\binom{${n}}{${k}} x^{${k}} \\cdot ${okl(a)}^{${n - k}}\\) (koeficiente beremo iz Pascalovega trikotnika).</p><p>\\(\\binom{${n}}{${k}} = ${binom(n, k)}\\), \\(${okl(a)}^{${n - k}} = ${a ** (n - k)}\\), koeficient: \\(${c}\\).</p>` });
  });

  // 3. Razstavljanje
  serija("razstavi", 8, (r, i) => {
    const p = r.nenic(-8, 8), q = r.nenic(-8, 8);
    if (p === -q || p === q) return null;
    const izraz = polinom([1, p + q, p * q]);
    const f = (u, v) => `(x ${u < 0 ? "-" : "+"} ${Math.abs(u)})(x ${v < 0 ? "-" : "+"} ${Math.abs(v)})`;
    return izbira({ tezavnost: i < 4 ? 1 : 2, r, besedilo: `Razstavi izraz \\(${izraz}\\).`, pravilna: `\\(${f(p, q)}\\)`, napacne: [`\\(${f(-p, -q)}\\)`, `\\(${f(p, -q)}\\)`, `\\(${f(-p, q)}\\)`], postopek: `<p>Vietovo pravilo: iščemo števili z zmnožkom \\(${p * q}\\) in vsoto \\(${p + q}\\). To sta \\(${p}\\) in \\(${q}\\).</p><p>\\(${izraz} = ${f(p, q)}\\)</p>` });
  });
  const razlike = [
    ["x^2 - 49", "(x - 7)(x + 7)", ["(x - 7)^2", "(x + 7)^2", "(x - 49)(x + 1)"], "Razlika kvadratov: \\(a^2 - b^2 = (a - b)(a + b)\\)."],
    ["4a^2 - 9b^2", "(2a - 3b)(2a + 3b)", ["(2a - 3b)^2", "(4a - 9b)(a + b)", "(2a + 3b)^2"], "Razlika kvadratov z \\(A = 2a\\), \\(B = 3b\\)."],
    ["x^3 - 8", "(x - 2)(x^2 + 2x + 4)", ["(x - 2)^3", "(x - 2)(x^2 - 2x + 4)", "(x + 2)(x^2 - 2x + 4)"], "Razlika kubov: \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\)."],
    ["27x^3 + 1", "(3x + 1)(9x^2 - 3x + 1)", ["(3x + 1)^3", "(3x + 1)(9x^2 + 3x + 1)", "(3x - 1)(9x^2 + 3x + 1)"], "Vsota kubov: \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\)."],
    ["x^4 - 16", "(x - 2)(x + 2)(x^2 + 4)", ["(x^2 - 4)^2", "(x - 2)^2(x + 2)^2", "(x - 2)(x + 2)(x^2 - 4)"], "Dvakrat razlika kvadratov: \\(x^4 - 16 = (x^2 - 4)(x^2 + 4) = (x - 2)(x + 2)(x^2 + 4)\\)."],
    ["ax + ay - bx - by", "(a - b)(x + y)", ["(a + b)(x - y)", "(a - b)(x - y)", "(a + b)(x + y)"], "Združevanje: \\(a(x + y) - b(x + y) = (a - b)(x + y)\\)."],
  ];
  serija("razlike", razlike.length, (r, i) => {
    const [f, p, n, razlaga] = razlike[i];
    return izbira({ tezavnost: i < 2 ? 2 : 3, r, besedilo: `Razstavi izraz \\(${f}\\).`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>${razlaga}</p><p>\\(${f} = ${p}\\)</p>` });
  });

  // 4. Krajšanje ulomkov
  serija("krajsanje", 5, (r) => {
    const a = r.nenic(-6, 6), b = r.nenic(-6, 6);
    if (a === b || a === -b) return null;
    const st = polinom([1, -(a + b), a * b]), im = polinom([1, -2 * a, a * a]);
    const izid = `\\frac{${dvoclen(1, -b)}}{${dvoclen(1, -a)}}`;
    return izbira({ tezavnost: 3, r, besedilo: `Okrajšaj ulomek \\(\\dfrac{${st}}{${im}}\\).`, pravilna: `\\(${izid}\\)`, napacne: [`\\(\\frac{${dvoclen(1, b)}}{${dvoclen(1, a)}}\\)`, `\\(\\frac{${dvoclen(1, -a)}}{${dvoclen(1, -b)}}\\)`, `\\(${dvoclen(1, -b)}\\)`], postopek: `<p>Števec: \\(${st} = (${dvoclen(1, -a)})(${dvoclen(1, -b)})\\). Imenovalec: \\(${im} = (${dvoclen(1, -a)})^2\\).</p><p>Okrajšamo \\(${dvoclen(1, -a)}\\) (pogoj \\(x \\ne ${a}\\)): \\(${izid}\\).</p>` });
  });

  // 5. Linearne enačbe
  serija("linearna", 10, (r, i) => {
    const x = r.int(-9, 9), a = r.nenic(-6, 6), c = r.nenic(-6, 6);
    if (a === c) return null;
    const b = r.int(-15, 15), d = (a - c) * x + b;
    if (i < 5) return stevilo({ tezavnost: 1, vrednost: x, besedilo: `Reši enačbo \\(${dvoclen(a, b)} = ${dvoclen(c, d)}\\).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Člene z \\(x\\) prenesemo na levo, števila na desno: \\(${a}x - ${okl(c)}x = ${d} - ${okl(b)}\\).</p><p>\\(${a - c}x = ${d - b}\\), \\(x = ${x}\\).</p>` });
    const p = r.int(2, 5), q = r.int(2, 5);
    if (p === q) return null;
    const m = r.int(1, 6), n = r.int(1, 6);
    // (x + m)/p - (x - n)/q = k
    const k = (x + m) / p - (x - n) / q;
    const rez = x;
    return stevilo({ tezavnost: 2, vrednost: rez, besedilo: `Reši enačbo \\(\\dfrac{x + ${m}}{${p}} - \\dfrac{x - ${n}}{${q}} = ${ulomek(Math.round(k * p * q), p * q).replace("\\frac", "\\dfrac")}\\).`, rezultat: `\\(x = ${rez}\\)`, postopek: `<p>Pomnožimo z najmanjšim skupnim imenovalcem ${p * q}: \\(${q}(x + ${m}) - ${p}(x - ${n}) = ${Math.round(k * p * q)}\\).</p><p>\\(${q}x + ${q * m} - ${p}x + ${p * n} = ${Math.round(k * p * q)}\\), \\(${q - p}x = ${Math.round(k * p * q) - q * m - p * n}\\), \\(x = ${rez}\\).</p>` });
  });

  // 6. Besedilne naloge
  serija("besedilna", 6, (r, i) => {
    const v = i % 3;
    if (v === 0) { const x = r.int(5, 40), d = r.int(2, 12); return stevilo({ tezavnost: 2, vrednost: x, besedilo: `Vsota dveh števil je ${2 * x + d}, eno je za ${d} večje od drugega. Koliko je manjše število?`, rezultat: `${x}`, postopek: `<p>Manjše število \\(x\\), večje \\(x + ${d}\\): \\(x + x + ${d} = ${2 * x + d}\\), \\(2x = ${2 * x}\\), \\(x = ${x}\\).</p>` }); }
    if (v === 1) { const s = r.int(10, 16), o = s + r.int(24, 30), l = r.int(4, 10); return stevilo({ tezavnost: 2, vrednost: l, besedilo: `Oče je star ${o} let, sin ${s}. Čez koliko let bo vsota njunih starosti ${o + s + 2 * l}?`, rezultat: `${l}`, postopek: `<p>Čez \\(x\\) let: \\((${o} + x) + (${s} + x) = ${o + s + 2 * l}\\), \\(2x = ${2 * l}\\), \\(x = ${l}\\).</p>` }); }
    const t = r.int(2, 6), v1 = r.izberi([40, 50, 60, 70]), v2 = v1 + r.izberi([10, 20, 30]);
    return stevilo({ tezavnost: 3, vrednost: t, besedilo: `Iz krajev A in B, ki sta ${(v1 + v2) * t} km narazen, hkrati odpeljeta avtomobila drug proti drugemu s hitrostma ${v1} km/h in ${v2} km/h. Čez koliko ur se srečata?`, enota: "h", rezultat: `${t} h`, postopek: `<p>Skupaj prevozita vso razdaljo: \\(${v1}t + ${v2}t = ${(v1 + v2) * t}\\), \\(${v1 + v2}t = ${(v1 + v2) * t}\\), \\(t = ${t}\\) h.</p>` });
  });

  // 7. Razcepna enačba
  serija("razcepna", 5, (r) => {
    const a = r.nenic(-7, 7), b = r.nenic(-7, 7), c = r.int(1, 4);
    if (a === b || a === 0 || b === 0) return null;
    const k = [c, -c * (a + b), c * a * b];
    return stevilo({ tezavnost: 2, vrednost: Math.max(a, b), besedilo: `Reši enačbo \\(${polinom(k)} = 0\\). Vpiši večjo rešitev.`, rezultat: `\\(x_1 = ${Math.min(a, b)}\\), \\(x_2 = ${Math.max(a, b)}\\)`, postopek: `<p>${c > 1 ? `Izpostavimo ${c}: \\(${c}(${polinom([1, -(a + b), a * b])}) = 0\\). ` : ""}Razstavimo: \\(${c > 1 ? c : ""}(x ${a < 0 ? "+" : "-"} ${Math.abs(a)})(x ${b < 0 ? "+" : "-"} ${Math.abs(b)}) = 0\\).</p><p>Produkt je 0, ko je en faktor 0: \\(x = ${a}\\) ali \\(x = ${b}\\).</p>` });
  });

  // 8. Neenačbe
  serija("neenacba", 8, (r, i) => {
    const a = r.nenic(-6, 6), b = r.int(-12, 12), c = r.int(-12, 12);
    const znak = r.izberi(["<", ">", "\\le", "\\ge"]);
    // a x + b znak c
    const meja = (c - b) / a;
    if (!Number.isInteger(meja * 2)) return null;
    const vecje = (znak === ">" || znak === "\\ge") === a > 0;
    const vklj = znak === "\\le" || znak === "\\ge";
    const m = Number.isInteger(meja) ? `${meja}` : ulomek(c - b, a);
    const prav = iv(m, vecje ? 1 : -1, vklj);
    return izbira({ tezavnost: a < 0 ? 2 : 1, r, besedilo: `Reši neenačbo \\(${dvoclen(a, b)} ${znak} ${c}\\) in rešitev zapiši z intervalom.`, pravilna: `\\(${prav}\\)`, napacne: [iv(m, vecje ? -1 : 1, vklj), iv(m, vecje ? 1 : -1, !vklj), iv(m, vecje ? -1 : 1, !vklj)].map((x) => `\\(${x}\\)`), postopek: `<p>\\(${a}x ${znak} ${c - b}\\). Delimo z \\(${a}\\)${a < 0 ? "; ker je negativno, se znak neenačbe obrne" : ""}.</p><p>\\(x ${vecje ? (vklj ? "\\ge" : ">") : vklj ? "\\le" : "<"} ${m}\\), torej \\(x \\in ${prav}\\).</p>` });
  });

  // 9. Sistemi
  serija("sistem", 8, (r, i) => {
    const x = r.int(-6, 6), y = r.int(-6, 6);
    const a = r.nenic(-5, 5), b = r.nenic(-5, 5), c = r.nenic(-5, 5), d = r.nenic(-5, 5);
    if (a * d - b * c === 0) return null;
    const e = a * x + b * y, f = c * x + d * y;
    const vpr = i % 2 === 0 ? "x" : "y";
    const jed = (p, q, s) => `${p === 1 ? "" : p === -1 ? "-" : p}x ${q < 0 ? "-" : "+"} ${Math.abs(q) === 1 ? "" : Math.abs(q)}y = ${s}`;
    return stevilo({ tezavnost: i < 4 ? 2 : 3, vrednost: vpr === "x" ? x : y, besedilo: `Reši sistem enačb \\(${jed(a, b, e)}\\), \\(${jed(c, d, f)}\\). Vpiši vrednost \\(${vpr}\\).`, rezultat: `\\(x = ${x}\\), \\(y = ${y}\\)`, postopek: `<p>Uporabimo metodo nasprotnih koeficientov: prvo enačbo pomnožimo s \\(${okl(c)}\\), drugo z \\(${okl(a)}\\) in ju odštejemo, da izločimo \\(x\\):</p><p>\\((${b * c} - ${okl(a * d)})y = ${e * c} - ${okl(f * a)}\\), \\(${b * c - a * d}y = ${e * c - f * a}\\), \\(y = ${y}\\).</p><p>Vstavimo v prvo enačbo: \\(${a}x + ${okl(b * y)} = ${e}\\), \\(x = ${x}\\).</p>` });
  });

  // 10. Izražanje neznanke iz formule
  const formule = [
    ["P = \\frac{(a + c) v}{2}", "c", "c = \\frac{2P}{v} - a", ["c = \\frac{2P - a}{v}", "c = \\frac{P}{2v} - a", "c = 2Pv - a"]],
    ["s = v_0 t + \\frac{a t^2}{2}", "a", "a = \\frac{2(s - v_0 t)}{t^2}", ["a = \\frac{2s - v_0 t}{t^2}", "a = \\frac{s - v_0 t}{2t^2}", "a = \\frac{2s}{t^2} - v_0"]],
    ["\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}", "b", "b = \\frac{af}{a - f}", ["b = a - f", "b = \\frac{a - f}{af}", "b = \\frac{af}{f - a}"]],
    ["V = \\frac{\\pi r^2 v}{3}", "r", "r = \\sqrt{\\frac{3V}{\\pi v}}", ["r = \\frac{3V}{\\pi v}", "r = \\sqrt{\\frac{V}{3\\pi v}}", "r = \\frac{\\sqrt{3V}}{\\pi v}"]],
  ];
  serija("formula", formule.length, (r, i) => {
    const [f, n, p, nap] = formule[i];
    return izbira({ tezavnost: 3, r, besedilo: `Iz formule \\(${f}\\) izrazi \\(${n}\\).`, pravilna: `\\(${p}\\)`, napacne: nap.map((x) => `\\(${x}\\)`), postopek: `<p>Neznanko osamimo z enakovrednimi preoblikovanji (množenje z imenovalci, prenos členov, na koncu deljenje ali korenjenje).</p><p>\\(${p}\\)</p>` });
  });

  // 11. Enačba s parametrom (višja raven)
  serija("parameter", 5, (r, i) => {
    const k = r.nenic(-5, 5), m = r.nenic(-6, 6);
    if (i % 2 === 0) {
      // (a - k) x = m → ni rešitve pri a = k
      return stevilo({ tezavnost: 4, raven: "visja", vrednost: k, besedilo: `Za katero vrednost parametra \\(a\\) enačba \\((a ${k < 0 ? "+" : "-"} ${Math.abs(k)})x = ${m}\\) nima rešitve?`, rezultat: `\\(a = ${k}\\)`, postopek: `<p>Če je \\(a ${k < 0 ? "+" : "-"} ${Math.abs(k)} \\ne 0\\), je rešitev \\(x = \\frac{${m}}{a ${k < 0 ? "+" : "-"} ${Math.abs(k)}}\\).</p><p>Pri \\(a = ${k}\\) dobimo \\(0 \\cdot x = ${m}\\), kar ni res za noben \\(x\\): enačba nima rešitve.</p>` });
    }
    // a^2 x - a = 4x - 2 → (a^2 - 4) x = a - 2 → a = -2 ni rešitve, a = 2 neskončno
    const c = r.int(2, 5);
    return izbira({ tezavnost: 4, raven: "visja", r, besedilo: `Obravnavaj enačbo \\(a^2 x - a = ${c * c}x - ${c}\\). Za katero vrednost \\(a\\) ima enačba neskončno rešitev?`, pravilna: `\\(a = ${c}\\)`, napacne: [`\\(a = ${-c}\\)`, `\\(a = 0\\)`, `\\(a = \\pm ${c}\\)`], postopek: `<p>\\((a^2 - ${c * c})x = a - ${c}\\), torej \\((a - ${c})(a + ${c})x = a - ${c}\\).</p><p>Pri \\(a = ${c}\\): \\(0 \\cdot x = 0\\), neskončno rešitev. Pri \\(a = ${-c}\\): \\(0 \\cdot x = ${-2 * c}\\), ni rešitve. Sicer \\(x = \\frac{1}{a + ${c}}\\).</p>` });
  });
}
