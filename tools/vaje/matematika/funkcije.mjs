import { stevilo, izbira, mnozica, T, L, zaokrozi, ulomek, polinom, gcd } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const pr = (k, b) => polinom([k, b]); // kx + b

export default function ({ z, slug, serija }) {
  // ---------- linearna funkcija ----------
  serija("lin-vrednost", 4, (r) => {
    const k = r.nenic(-5, 5), n = r.int(-9, 9), x = r.int(-6, 6);
    return stevilo({ tezavnost: 1, vrednost: k * x + n, besedilo: `Dana je funkcija \\(f(x) = ${pr(k, n)}\\). Izračunaj \\(f(${x})\\).`, rezultat: `\\(f(${x}) = ${k * x + n}\\)`, postopek: `<p>Namesto \\(x\\) vstavimo ${x}: \\(f(${x}) = ${k} \\cdot ${okl(x)} ${n < 0 ? "-" : "+"} ${Math.abs(n)} = ${k * x + n}\\).</p>` });
  });
  serija("lin-nicla", 5, (r) => {
    const k = r.nenic(-6, 6), x0 = r.int(-7, 7), n = -k * x0;
    if (n === 0) return null;
    return stevilo({ tezavnost: 1, vrednost: x0, besedilo: `Izračunaj ničlo funkcije \\(f(x) = ${pr(k, n)}\\).`, rezultat: `\\(x_0 = ${x0}\\)`, postopek: `<p>Ničla je tam, kjer je \\(f(x) = 0\\): \\(${pr(k, n)} = 0\\), \\(${k}x = ${-n}\\), \\(x = ${x0}\\).</p>` });
  });
  serija("lin-skozi-tocki", 5, (r) => {
    const x1 = r.int(-5, 5), x2 = r.int(-5, 5);
    if (x1 === x2) return null;
    const k = r.nenic(-4, 4), n = r.int(-6, 6), y1 = k * x1 + n, y2 = k * x2 + n;
    const vpr = r.izberi(["k", "n"]);
    return stevilo({ tezavnost: 2, vrednost: vpr === "k" ? k : n, besedilo: `Premica gre skozi točki \\(A(${x1}, ${y1})\\) in \\(B(${x2}, ${y2})\\). Koliko je ${vpr === "k" ? "smerni koeficient \\(k\\)" : "začetna vrednost \\(n\\)"}?`, rezultat: `\\(y = ${pr(k, n)}\\), ${vpr === "k" ? `\\(k = ${k}\\)` : `\\(n = ${n}\\)`}`, postopek: `<p>\\(k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${okl(y1)}}{${x2} - ${okl(x1)}} = ${k}\\)</p><p>Iz \\(y_1 = kx_1 + n\\): \\(n = ${y1} - ${okl(k)} \\cdot ${okl(x1)} = ${n}\\).</p>` });
  });
  serija("lin-narasca", 3, (r) => {
    const k = r.nenic(-5, 5), n = r.int(-5, 5);
    return izbira({ r, tezavnost: 1, besedilo: `Ali je funkcija \\(f(x) = ${pr(k, n)}\\) naraščajoča?`, pravilna: k > 0 ? "Da" : "Ne", napacne: [k > 0 ? "Ne" : "Da"], postopek: `<p>Linearna funkcija narašča, če je \\(k > 0\\). Tu je \\(k = ${k}\\), zato ${k > 0 ? "narašča" : "pada"}.</p>` });
  });
  serija("lin-presecisce", 4, (r) => {
    const x = r.int(-4, 4), y = r.int(-6, 6), k1 = r.nenic(-4, 4), k2 = r.nenic(-4, 4);
    if (k1 === k2) return null;
    const n1 = y - k1 * x, n2 = y - k2 * x;
    return stevilo({ tezavnost: 2, vrednost: x, besedilo: `Kolikšna je abscisa presečišča premic \\(y = ${pr(k1, n1)}\\) in \\(y = ${pr(k2, n2)}\\)?`, rezultat: `\\(P(${x}, ${y})\\)`, postopek: `<p>Izenačimo: \\(${pr(k1, n1)} = ${pr(k2, n2)}\\), \\(${k1 - k2}x = ${n2 - n1}\\), \\(x = ${x}\\).</p><p>\\(y = ${y}\\)</p>` });
  });
  serija("lin-vzporedna", 3, (r) => {
    const k = r.nenic(-4, 4), n = r.int(-5, 5), x0 = r.int(-4, 4), y0 = r.int(-6, 6), m = y0 - k * x0;
    return stevilo({ tezavnost: 2, vrednost: m, besedilo: `Premica je vzporedna premici \\(y = ${pr(k, n)}\\) in gre skozi točko \\(T(${x0}, ${y0})\\). Koliko je njena začetna vrednost \\(n\\)?`, rezultat: `\\(y = ${pr(k, m)}\\)`, postopek: `<p>Vzporedni premici imata enak smerni koeficient \\(k = ${k}\\).</p><p>\\(n = y_0 - kx_0 = ${y0} - ${k} \\cdot ${okl(x0)} = ${m}\\)</p>` });
  });
  serija("lin-pravokotna", 3, (r) => {
    const k = r.izberi([2, -2, 3, -3, 1, -1, 4]), k2 = -1 / k;
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(k2, 6), toleranca: 0.001, besedilo: `Kolikšen je smerni koeficient premice, ki je pravokotna na premico \\(y = ${pr(k, r.int(-5, 5))}\\)?`, rezultat: `\\(k_2 = ${ulomek(-1, k)}\\)`, postopek: `<p>Za pravokotni premici velja \\(k_1 \\cdot k_2 = -1\\), zato \\(k_2 = -\\frac{1}{${k}} = ${ulomek(-1, k)}\\).</p>` });
  });

  // ---------- kvadratna funkcija ----------
  serija("kv-teme", 6, (r, i) => {
    const a = r.nenic(-3, 3), p = r.int(-5, 5), q = r.int(-8, 8), b = -2 * a * p, c = a * p * p + q;
    const kaj = i % 2 ? "q" : "p";
    return stevilo({ tezavnost: 2, vrednost: kaj === "p" ? p : q, besedilo: `Kolikšna je ${kaj === "p" ? "abscisa" : "ordinata"} temena parabole \\(f(x) = ${polinom([a, b, c])}\\)?`, rezultat: `\\(T(${p}, ${q})\\)`, postopek: `<p>\\(p = -\\frac{b}{2a} = -\\frac{${b}}{2 \\cdot ${okl(a)}} = ${p}\\)</p><p>\\(q = f(p) = ${q}\\) (ali \\(q = -\\frac{D}{4a}\\))</p>` });
  });
  serija("kv-nicle", 7, (r, i) => {
    const a = i < 4 ? 1 : r.nenic(-2, 2), x1 = r.int(-6, 6), x2 = r.int(-6, 6);
    if (x1 === x2) return null;
    const b = -a * (x1 + x2), c = a * x1 * x2;
    return mnozica({ tezavnost: i < 4 ? 1 : 2, elementi: [...new Set([x1, x2])], besedilo: `Izračunaj ničli funkcije \\(f(x) = ${polinom([a, b, c])}\\). (Vpiši obe, ločeni z vejico.)`, rezultat: `\\(x_1 = ${Math.min(x1, x2)}\\), \\(x_2 = ${Math.max(x1, x2)}\\)`, postopek: `<p>${a === 1 ? `Iščemo števili z vsoto ${-b} in produktom ${c} (Vietovo pravilo)` : `Izpostavimo ${a}: \\(${a}(${polinom([1, b / a, c / a])})\\)`}: \\(f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})\\).</p><p>Ničli: \\(${x1}\\) in \\(${x2}\\).</p>` });
  });
  serija("kv-diskriminanta", 4, (r) => {
    const a = r.nenic(-3, 3), b = r.int(-6, 6), c = r.int(-6, 6), D = b * b - 4 * a * c;
    const st = D > 0 ? 2 : D === 0 ? 1 : 0;
    return stevilo({ tezavnost: 2, vrednost: st, besedilo: `Koliko realnih ničel ima funkcija \\(f(x) = ${polinom([a, b, c])}\\)?`, rezultat: `${st}`, postopek: `<p>\\(D = b^2 - 4ac = ${okl(b)}^2 - 4 \\cdot ${okl(a)} \\cdot ${okl(c)} = ${D}\\)</p><p>${D > 0 ? "D > 0: dve realni ničli." : D === 0 ? "D = 0: ena (dvojna) ničla." : "D < 0: ni realnih ničel."}</p>` });
  });
  serija("kv-zaloga", 4, (r) => {
    const a = r.nenic(-3, 3), p = r.int(-4, 4), q = r.int(-8, 8);
    const prav = a > 0 ? `\\([${q}, \\infty)\\)` : `\\((-\\infty, ${q}]\\)`;
    return izbira({ r, tezavnost: 2, besedilo: `Kakšna je zaloga vrednosti funkcije \\(f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}(x ${p < 0 ? "+" : "-"} ${Math.abs(p)})^2 ${q < 0 ? "-" : "+"} ${Math.abs(q)}\\)?`, pravilna: prav, napacne: [a > 0 ? `\\((-\\infty, ${q}]\\)` : `\\([${q}, \\infty)\\)`, a > 0 ? `\\([${p}, \\infty)\\)` : `\\((-\\infty, ${p}]\\)`, "\\(\\mathbb{R}\\)"].filter((x) => x !== prav), postopek: `<p>Funkcija je v temenski obliki, teme je \\(T(${p}, ${q})\\). Ker je \\(a = ${a} ${a > 0 ? "> 0" : "< 0"}\\), je parabola obrnjena ${a > 0 ? "navzgor in ima v temenu minimum" : "navzdol in ima v temenu maksimum"}.</p>` });
  });
  serija("kv-neenacba", 4, (r) => {
    const x1 = r.int(-6, 2), x2 = x1 + r.int(1, 6), b = -(x1 + x2), c = x1 * x2;
    const zn = r.izberi(["<", ">"]);
    const prav = zn === "<" ? `\\((${x1}, ${x2})\\)` : `\\((-\\infty, ${x1}) \\cup (${x2}, \\infty)\\)`;
    const drug = zn === "<" ? `\\((-\\infty, ${x1}) \\cup (${x2}, \\infty)\\)` : `\\((${x1}, ${x2})\\)`;
    return izbira({ r, tezavnost: 3, besedilo: `Reši neenačbo \\(${polinom([1, b, c])} ${zn} 0\\).`, pravilna: prav, napacne: [drug, `\\([${x1}, ${x2}]\\)`, `\\((${-x2}, ${-x1})\\)`].filter((x) => x !== prav), postopek: `<p>Ničli: \\(${x1}\\) in \\(${x2}\\). Parabola je obrnjena navzgor, zato je ${zn === "<" ? "negativna med ničlama" : "pozitivna zunaj ničel"}.</p>` });
  });
  serija("kv-ekstrem", 3, (r) => {
    const o = r.int(10, 40) * 2;
    const s = o / 4;
    return stevilo({ tezavnost: 3, vrednost: s * s, enota: "m²", besedilo: `Z ${o} m ograje ogradimo pravokoten vrt. Kolikšna je največja možna ploščina vrta?`, rezultat: `${s * s} m²`, postopek: `<p>Stranici: \\(a\\) in \\(b = ${o / 2} - a\\). \\(p(a) = a(${o / 2} - a) = -a^2 + ${o / 2}a\\).</p><p>Teme: \\(a = ${s}\\), \\(p = ${s} \\cdot ${s} = ${s * s}\\) m² (kvadrat).</p>` });
  });
  serija("kv-skozi-tocke", 3, (r) => {
    const a = r.nenic(-2, 2), b = r.int(-4, 4), c = r.int(-5, 5), f = (x) => a * x * x + b * x + c;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: a, besedilo: `Parabola \\(y = ax^2 + bx + c\\) gre skozi točke \\((-1, ${f(-1)})\\), \\((0, ${f(0)})\\) in \\((2, ${f(2)})\\). Koliko je \\(a\\)?`, rezultat: `\\(y = ${polinom([a, b, c])}\\)`, postopek: `<p>Iz \\((0, ${c})\\): \\(c = ${c}\\).</p><p>\\(a - b + ${c} = ${f(-1)}\\) in \\(4a + 2b + ${c} = ${f(2)}\\), torej \\(a - b = ${a - b}\\), \\(2a + b = ${2 * a + b}\\).</p><p>Seštejemo: \\(3a = ${3 * a}\\), \\(a = ${a}\\), \\(b = ${b}\\).</p>` });
  });

  // ---------- eksponentna in logaritemska ----------
  serija("eks-enacba", 6, (r, i) => {
    const a = r.izberi([2, 3, 5]), k = r.int(1, 4), m = r.nenic(-3, 3), n = r.int(-3, 6);
    if (i < 3) {
      return stevilo({ tezavnost: 1, vrednost: k, besedilo: `Reši enačbo \\(${a}^x = ${a ** k}\\).`, rezultat: `\\(x = ${k}\\)`, postopek: `<p>\\(${a ** k} = ${a}^{${k}}\\), zato \\(x = ${k}\\).</p>` });
    }
    // a^(mx+n) = a^k  → x = (k-n)/m
    if ((k - n) % m) return null;
    return stevilo({ tezavnost: 2, vrednost: (k - n) / m, besedilo: `Reši enačbo \\(${a}^{${pr(m, n)}} = ${a ** k}\\).`, rezultat: `\\(x = ${(k - n) / m}\\)`, postopek: `<p>Desno stran zapišemo kot potenco z osnovo ${a}: \\(${a ** k} = ${a}^{${k}}\\).</p><p>Izenačimo eksponenta: \\(${pr(m, n)} = ${k}\\), \\(x = ${(k - n) / m}\\).</p>` });
  });
  serija("eks-ulomek", 3, (r) => {
    const a = r.izberi([2, 3]), k = r.int(1, 4);
    return stevilo({ tezavnost: 2, vrednost: -k, besedilo: `Reši enačbo \\(${a}^x = \\frac{1}{${a ** k}}\\).`, rezultat: `\\(x = ${-k}\\)`, postopek: `<p>\\(\\frac{1}{${a ** k}} = ${a}^{-${k}}\\), zato \\(x = ${-k}\\).</p>` });
  });
  serija("log-vrednost", 6, (r) => {
    const a = r.izberi([2, 3, 5, 10]), k = r.int(-2, 4);
    const arg = k >= 0 ? `${a ** k}` : `\\frac{1}{${a ** -k}}`;
    return stevilo({ tezavnost: 1, vrednost: k, besedilo: `Izračunaj \\(${a === 10 ? "\\log" : `\\log_{${a}}`} ${arg}\\).`, rezultat: `${k}`, postopek: `<p>Iščemo eksponent, s katerim moramo potencirati ${a}, da dobimo \\(${arg}\\): \\(${a}^{${k}} = ${arg}\\).</p>` });
  });
  serija("log-pravila", 4, (r) => {
    const a = r.izberi([2, 3]), p = r.int(1, 3), q = r.int(1, 3), x = a ** (p + q), y = a ** p, zz = a ** q;
    return stevilo({ tezavnost: 2, vrednost: p + q - q, besedilo: `Izračunaj \\(\\log_{${a}} ${x} - \\log_{${a}} ${zz}\\).`, rezultat: `${p}`, postopek: `<p>\\(\\log_{${a}} ${x} - \\log_{${a}} ${zz} = \\log_{${a}} \\frac{${x}}{${zz}} = \\log_{${a}} ${y} = ${p}\\)</p>` });
  });
  serija("log-enacba", 5, (r) => {
    const a = r.izberi([2, 3, 5]), k = r.int(1, 3), m = r.int(1, 4), n = r.int(-6, 6), x = a ** k - n;
    if (x % m) return null;
    const res = x / m;
    if (m * res + n <= 0) return null;
    return stevilo({ tezavnost: 2, vrednost: res, besedilo: `Reši enačbo \\(\\log_{${a}}(${pr(m, n)}) = ${k}\\).`, rezultat: `\\(x = ${res}\\)`, postopek: `<p>Po definiciji logaritma: \\(${pr(m, n)} = ${a}^{${k}} = ${a ** k}\\).</p><p>\\(x = ${res}\\). Preverimo: argument \\(${a ** k} > 0\\).</p>` });
  });
  serija("eks-rast", 4, (r) => {
    const N0 = r.int(2, 9) * 100, p = r.izberi([2, 3, 4, 5, 8]), t = r.int(3, 10);
    const N = N0 * (1 + p / 100) ** t;
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(N, 0), toleranca: Math.max(1, N * 0.005), besedilo: `Število bakterij se vsako uro poveča za ${p} %. Na začetku jih je ${N0}. Koliko jih je po ${t} urah? (Zaokroži na celo število.)`, rezultat: `približno ${zaokrozi(N, 0)}`, postopek: `<p>\\(N(t) = N_0 \\cdot (1 + \\frac{p}{100})^t = ${N0} \\cdot ${L(1 + p / 100, 2)}^{${t}} \\approx ${zaokrozi(N, 0)}\\)</p>` });
  });
  serija("eks-log-cas", 3, (r) => {
    const p = r.izberi([3, 4, 5, 6, 7]), k = r.izberi([2, 3]);
    const t = Math.log(k) / Math.log(1 + p / 100);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 2), toleranca: 0.05, enota: "let", besedilo: `Glavnica se letno obrestuje po ${p} % (obrestno obrestovanje). Po koliko letih se ${k === 2 ? "podvoji" : "potroji"}? (Na dve decimalki.)`, rezultat: `${T(t, 2)} let`, postopek: `<p>\\(${k} = ${L(1 + p / 100, 2)}^t\\)</p><p>\\(t = \\frac{\\log ${k}}{\\log ${L(1 + p / 100, 2)}} \\approx ${L(t, 2)}\\)</p>` });
  });
  serija("log-definicijsko", 3, (r) => {
    const m = r.nenic(-3, 3), n = r.int(-6, 6);
    if (n % m) return null;
    const x0 = -n / m;
    const prav = m > 0 ? `\\((${x0}, \\infty)\\)` : `\\((-\\infty, ${x0})\\)`;
    return izbira({ r, tezavnost: 2, besedilo: `Kakšno je definicijsko območje funkcije \\(f(x) = \\log(${pr(m, n)})\\)?`, pravilna: prav, napacne: [m > 0 ? `\\((-\\infty, ${x0})\\)` : `\\((${x0}, \\infty)\\)`, `\\([${x0}, \\infty)\\)`, "\\(\\mathbb{R}\\)"].filter((x) => x !== prav), postopek: `<p>Argument logaritma mora biti pozitiven: \\(${pr(m, n)} > 0\\), \\(x ${m > 0 ? ">" : "<"} ${x0}\\).</p>` });
  });

  // ---------- kotne funkcije ----------
  const KOTI = [[0, "0", "1", "0"], [30, "\\frac12", "\\frac{\\sqrt3}{2}", "\\frac{\\sqrt3}{3}"], [45, "\\frac{\\sqrt2}{2}", "\\frac{\\sqrt2}{2}", "1"], [60, "\\frac{\\sqrt3}{2}", "\\frac12", "\\sqrt3"], [90, "1", "0", "ni definiran"]];
  serija("kot-vrednost", 6, (r) => {
    const [k, s, c, t] = r.izberi(KOTI), f = r.izberi(["sin", "cos", "tan"]);
    const prav = f === "sin" ? s : f === "cos" ? c : t;
    if (prav === "ni definiran") return null;
    const vse = [...new Set(["0", "1", "\\frac12", "\\frac{\\sqrt2}{2}", "\\frac{\\sqrt3}{2}", "\\sqrt3", "\\frac{\\sqrt3}{3}"])].filter((x) => x !== prav);
    return izbira({ r, tezavnost: 1, besedilo: `Koliko je \\(\\${f} ${k}°\\)?`, pravilna: `\\(${prav}\\)`, napacne: r.premesaj(vse).slice(0, 3).map((x) => `\\(${x}\\)`), postopek: `<p>Vrednosti kotnih funkcij za kot ${k}° si zapomnimo iz tabele ali iz enotske krožnice: \\(\\sin ${k}° = ${s}\\), \\(\\cos ${k}° = ${c}\\), \\(\\tan ${k}° = ${t === "ni definiran" ? "\\text{ni definiran}" : t}\\).</p>` });
  });
  serija("kot-radiani", 4, (r) => {
    const [st, im] = r.izberi([[30, 6], [45, 4], [60, 3], [90, 2], [120, 1.5], [180, 1], [270, 2 / 3], [360, 0.5]]);
    const v = Math.PI / im;
    return stevilo({ tezavnost: 1, vrednost: zaokrozi(v, 4), toleranca: 0.005, enota: "rad", besedilo: `Pretvori ${st}° v radiane (na dve decimalki).`, rezultat: `${T(v, 2)} rad`, postopek: `<p>\\(${st}° \\cdot \\frac{\\pi}{180°} = ${ulomek(st, 180).replace(/^1$/, "")}\\pi \\approx ${L(v, 2)}\\)</p>` });
  });
  serija("kot-perioda", 4, (r) => {
    const f = r.izberi(["sin", "cos", "tan"]), b = r.izberi([2, 3, 4, 6]);
    const P = f === "tan" ? Math.PI / b : (2 * Math.PI) / b;
    const pz = f === "tan" ? `\\frac{\\pi}{${b}}` : { 2: "\\pi", 3: "\\frac{2\\pi}{3}", 4: "\\frac{\\pi}{2}", 6: "\\frac{\\pi}{3}" }[b];
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(P, 4), toleranca: 0.005, besedilo: `Kolikšna je osnovna perioda funkcije \\(f(x) = ${r.izberi(["", 2, 3, 5])}\\${f}(${b}x)\\)? (Vpiši na dve decimalki.)`, rezultat: `\\(${pz}\\) \\(\\approx ${L(P, 2)}\\)`, postopek: `<p>Osnovna perioda \\(\\${f} x\\) je \\(${f === "tan" ? "\\pi" : "2\\pi"}\\). Pri \\(\\${f}(bx)\\) jo delimo z \\(b = ${b}\\): \\(P = ${f === "tan" ? "\\pi" : "2\\pi"}/${b} \\approx ${L(P, 2)}\\).</p>` });
  });
  serija("kot-amplituda", 3, (r) => {
    const a = r.nenic(-5, 5), d = r.int(-3, 3);
    return stevilo({ tezavnost: 2, vrednost: Math.abs(a) + d, besedilo: `Kolikšna je največja vrednost funkcije \\(f(x) = ${a}\\sin x ${d < 0 ? "-" : "+"} ${Math.abs(d)}\\)?`, rezultat: `${Math.abs(a) + d}`, postopek: `<p>\\(\\sin x\\) zavzame vrednosti od \\(-1\\) do 1, zato \\(${a}\\sin x\\) od \\(${-Math.abs(a)}\\) do \\(${Math.abs(a)}\\).</p><p>Največja vrednost: \\(${Math.abs(a)} ${d < 0 ? "-" : "+"} ${Math.abs(d)} = ${Math.abs(a) + d}\\).</p>` });
  });
  serija("kot-pitagora", 3, (r) => {
    const [a, b, c] = r.izberi([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kot \\(\\alpha\\) leži v 2. kvadrantu in \\(\\sin\\alpha = \\frac{${a}}{${c}}\\). Koliko je \\(\\cos\\alpha\\)?`, pravilna: `\\(-\\frac{${b}}{${c}}\\)`, napacne: [`\\(\\frac{${b}}{${c}}\\)`, `\\(-\\frac{${a}}{${c}}\\)`, `\\(\\frac{${c}}{${b}}\\)`], postopek: `<p>\\(\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - \\frac{${a * a}}{${c * c}} = \\frac{${b * b}}{${c * c}}\\)</p><p>V 2. kvadrantu je kosinus negativen: \\(\\cos\\alpha = -\\frac{${b}}{${c}}\\).</p>` });
  });
  serija("kot-enacba", 3, (r) => {
    const [vr, k1, k2] = r.izberi([["\\frac12", 30, 150], ["\\frac{\\sqrt2}{2}", 45, 135], ["\\frac{\\sqrt3}{2}", 60, 120]]);
    return izbira({ r, tezavnost: 3, besedilo: `Katere so vse rešitve enačbe \\(\\sin x = ${vr}\\) na intervalu \\([0°, 360°)\\)?`, pravilna: `${k1}° in ${k2}°`, napacne: [`${k1}° in ${360 - k1}°`, `samo ${k1}°`, `${k1}° in ${180 + k1}°`], postopek: `<p>Osnovna rešitev je ${k1}°. Sinus je pozitiven v 1. in 2. kvadrantu, druga rešitev je \\(180° - ${k1}° = ${k2}°\\).</p>` });
  });

  // ---------- polinomi in racionalne ----------
  serija("pol-ostanek", 4, (r) => {
    const k = [r.nenic(-3, 3), r.int(-5, 5), r.int(-5, 5), r.int(-9, 9)], a = r.nenic(-3, 3);
    const v = k.reduce((s, c) => s * a + c, 0);
    return stevilo({ tezavnost: 2, vrednost: v, besedilo: `Kolikšen je ostanek pri deljenju polinoma \\(p(x) = ${polinom(k)}\\) s \\((x ${a < 0 ? "+" : "-"} ${Math.abs(a)})\\)?`, rezultat: `${v}`, postopek: `<p>Po izreku o ostanku je ostanek enak \\(p(${a})\\).</p><p>\\(p(${a}) = ${v}\\) (Hornerjev algoritem ali vstavljanje).</p>` });
  });
  serija("pol-nicle", 4, (r) => {
    const n = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)];
    if (new Set(n).size < 3) return null;
    const k = [1, -(n[0] + n[1] + n[2]), n[0] * n[1] + n[0] * n[2] + n[1] * n[2], -n[0] * n[1] * n[2]];
    return mnozica({ tezavnost: 3, elementi: n, besedilo: `Poišči vse ničle polinoma \\(p(x) = ${polinom(k)}\\). (Vpiši jih ločene z vejico.)`, rezultat: n.slice().sort((a, b) => a - b).join(", "), postopek: `<p>Cele ničle so delitelji prostega člena ${k[3]}. Poskusimo: \\(p(${n[0]}) = 0\\).</p><p>Delimo s \\((x ${n[0] < 0 ? "+" : "-"} ${Math.abs(n[0])})\\): \\(${polinom([1, -(n[1] + n[2]), n[1] * n[2]])}\\), ničli ${n[1]} in ${n[2]}.</p>` });
  });
  serija("pol-stopnja", 3, (r) => {
    const a = r.int(2, 4), b = r.int(1, 3), c = r.int(1, 3);
    return stevilo({ tezavnost: 1, vrednost: a + b + c, besedilo: `Kolikšna je stopnja polinoma \\(p(x) = (x^{${a}} - 1)(x^{${b}} + x)(2x^{${c}} + 3)\\)?`, rezultat: `${a + b + c}`, postopek: `<p>Stopnja produkta je vsota stopenj faktorjev: \\(${a} + ${b} + ${c} = ${a + b + c}\\).</p>` });
  });
  serija("rac-asimptota", 4, (r, i) => {
    const p = r.nenic(-5, 5), a = r.nenic(-4, 4), q = r.nenic(-5, 5);
    if (p === q) return null;
    if (i % 2 === 0)
      return stevilo({ tezavnost: 2, vrednost: q, besedilo: `Kje ima funkcija \\(f(x) = \\frac{${a}x ${-a * p < 0 ? "-" : "+"} ${Math.abs(a * p)}}{x ${-q < 0 ? "-" : "+"} ${Math.abs(q)}}\\) pol? (Vpiši \\(x\\).)`, rezultat: `\\(x = ${q}\\)`, postopek: `<p>Pol je ničla imenovalca, ki ni hkrati ničla števca: \\(x = ${q}\\).</p>` });
    return stevilo({ tezavnost: 2, vrednost: a, besedilo: `Kolikšna je vodoravna asimptota funkcije \\(f(x) = \\frac{${a}x ${-a * p < 0 ? "-" : "+"} ${Math.abs(a * p)}}{x ${-q < 0 ? "-" : "+"} ${Math.abs(q)}}\\)? (Vpiši \\(y\\).)`, rezultat: `\\(y = ${a}\\)`, postopek: `<p>Števec in imenovalec imata enako stopnjo, zato je asimptota količnik vodilnih koeficientov: \\(y = \\frac{${a}}{1} = ${a}\\).</p>` });
  });
  serija("rac-nicla", 3, (r) => {
    const p = r.nenic(-5, 5), q = r.nenic(-5, 5);
    if (p === q) return null;
    return stevilo({ tezavnost: 2, vrednost: p, besedilo: `Izračunaj ničlo funkcije \\(f(x) = \\frac{x ${-p < 0 ? "-" : "+"} ${Math.abs(p)}}{x ${-q < 0 ? "-" : "+"} ${Math.abs(q)}}\\).`, rezultat: `\\(x = ${p}\\)`, postopek: `<p>Ulomek je 0, ko je števec 0 (in imenovalec ni): \\(x = ${p}\\).</p>` });
  });
  serija("inverzna", 4, (r) => {
    const k = r.nenic(-4, 4), n = r.int(-6, 6), y = r.int(-8, 8);
    if ((y - n) % k) return null;
    return stevilo({ tezavnost: 3, vrednost: (y - n) / k, besedilo: `Dana je funkcija \\(f(x) = ${pr(k, n)}\\). Izračunaj \\(f^{-1}(${y})\\).`, rezultat: `\\(f^{-1}(${y}) = ${(y - n) / k}\\)`, postopek: `<p>\\(f^{-1}(${y})\\) je tisti \\(x\\), za katerega je \\(f(x) = ${y}\\): \\(${pr(k, n)} = ${y}\\), \\(x = ${(y - n) / k}\\).</p>` });
  });
  serija("kompozitum", 4, (r) => {
    const a = r.nenic(-3, 3), b = r.int(-4, 4), x = r.int(-3, 3);
    const g = x * x + b, f = a * g + 1;
    return stevilo({ tezavnost: 3, vrednost: f, besedilo: `Dani sta \\(f(x) = ${pr(a, 1)}\\) in \\(g(x) = ${polinom([1, 0, b])}\\). Izračunaj \\((f \\circ g)(${x})\\).`, rezultat: `${f}`, postopek: `<p>Najprej \\(g(${x}) = ${g}\\), nato \\(f(${g}) = ${a} \\cdot ${okl(g)} + 1 = ${f}\\).</p>` });
  });
  serija("sodost", 4, (r) => {
    const [f, odg, raz] = r.izberi([["x^4 - 3x^2 + 1", "soda", "vsebuje le sode potence"], ["x^3 - 5x", "liha", "vsebuje le lihe potence"], ["x^2 + x", "niti soda niti liha", "vsebuje sode in lihe potence"], ["\\cos x + x^2", "soda", "\\(\\cos\\) in \\(x^2\\) sta sodi"], ["\\sin x \\cdot x^2", "liha", "produkt lihe in sode funkcije je lih"], ["|x| - 2", "soda", "\\(|-x| = |x|\\)"], ["2^x", "niti soda niti liha", "\\(2^{-x} \\neq \\pm 2^x\\)"], ["\\frac{1}{x}", "liha", "\\(\\frac{1}{-x} = -\\frac1x\\)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Ali je funkcija \\(f(x) = ${f}\\) soda, liha ali nič od tega?`, pravilna: odg, napacne: ["soda", "liha", "niti soda niti liha"].filter((x) => x !== odg), postopek: `<p>Izračunamo \\(f(-x)\\) in primerjamo s \\(f(x)\\). Velja: ${raz}, zato je ${odg}.</p>` });
  });
  serija("visja-parameter", 3, (r) => {
    const a = r.int(1, 4), c = r.int(1, 5);
    // x^2 + bx + c ima dvojno ničlo → b^2 = 4c → izberemo c = k^2
    const k = r.int(1, 5);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: 2 * k * a, besedilo: `Za kateri pozitivni \\(m\\) ima funkcija \\(f(x) = ${a === 1 ? "" : a}x^2 + mx + ${a * k * k}\\) natanko eno ničlo?`, rezultat: `\\(m = ${2 * k * a}\\)`, postopek: `<p>Natanko ena ničla pomeni \\(D = 0\\): \\(m^2 - 4 \\cdot ${a} \\cdot ${a * k * k} = 0\\), \\(m^2 = ${4 * a * a * k * k}\\).</p><p>Pozitivna rešitev: \\(m = ${2 * k * a}\\).</p>` });
  });
  serija("visja-log", 3, (r) => {
    const a = r.izberi([2, 3]), p = r.int(1, 4), q = p + r.int(1, 4);
    // log_a(x) + log_a(x + d) = k  z rešitvijo x = a^p
    const x = a ** p, d = a ** q - x;
    const k = Math.log(x * (x + d)) / Math.log(a);
    if (!Number.isInteger(Math.round(k * 1e9) / 1e9)) return null;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: x, besedilo: `Reši enačbo \\(\\log_{${a}} x + \\log_{${a}}(x + ${d}) = ${Math.round(k)}\\).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>\\(\\log_{${a}}(x(x + ${d})) = ${Math.round(k)}\\), torej \\(x^2 + ${d}x - ${x * (x + d)} = 0\\).</p><p>Rešitvi sta \\(${x}\\) in \\(${-(x + d)}\\); negativna ne ustreza (argument logaritma mora biti pozitiven), zato \\(x = ${x}\\).</p>` });
  });
}
