import { stevilo, izbira, T, L, zaokrozi } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const zam = (v, x) => (v === 0 ? `${x}^2` : `(${x} ${v < 0 ? "+" : "-"} ${Math.abs(v)})^2`);

export default function ({ serija }) {
  // ---------- krožnica ----------
  serija("kr-polmer", 6, (r, i) => {
    const p = r.int(-6, 6), q = r.int(-6, 6), R = r.int(1, 9);
    const kaj = ["R", "p", "q"][i % 3];
    return stevilo({ tezavnost: 1, vrednost: kaj === "R" ? R : kaj === "p" ? p : q, besedilo: `Krožnica ima enačbo \\(${zam(p, "x")} + ${zam(q, "y")} = ${R * R}\\). ${kaj === "R" ? "Kolikšen je njen polmer?" : `Kolikšna je ${kaj === "p" ? "abscisa" : "ordinata"} njenega središča?`}`, rezultat: `\\(S(${p}, ${q})\\), \\(r = ${R}\\)`, postopek: `<p>Enačba krožnice: \\((x - p)^2 + (y - q)^2 = r^2\\), središče \\(S(p, q)\\), polmer \\(r\\).</p><p>Tu: \\(S(${p}, ${q})\\), \\(r = \\sqrt{${R * R}} = ${R}\\).</p>` });
  });
  serija("kr-splosna", 6, (r, i) => {
    const p = r.int(-5, 5), q = r.int(-5, 5), R = r.int(1, 7);
    const D = -2 * p, E = -2 * q, F = p * p + q * q - R * R;
    const s = `x^2 + y^2${D ? ` ${D < 0 ? "-" : "+"} ${Math.abs(D)}x` : ""}${E ? ` ${E < 0 ? "-" : "+"} ${Math.abs(E)}y` : ""}${F ? ` ${F < 0 ? "-" : "+"} ${Math.abs(F)}` : ""} = 0`;
    const kaj = i % 2 ? "R" : "p";
    return stevilo({ tezavnost: 2, vrednost: kaj === "R" ? R : p, besedilo: `Krožnica ima enačbo \\(${s}\\). ${kaj === "R" ? "Kolikšen je njen polmer?" : "Kolikšna je abscisa njenega središča?"}`, rezultat: `\\(S(${p}, ${q})\\), \\(r = ${R}\\)`, postopek: `<p>Dopolnimo do popolnih kvadratov: \\(${zam(p, "x")} - ${p * p} + ${zam(q, "y")} - ${q * q}${F ? ` ${F < 0 ? "-" : "+"} ${Math.abs(F)}` : ""} = 0\\).</p><p>\\(${zam(p, "x")} + ${zam(q, "y")} = ${R * R}\\), torej \\(S(${p}, ${q})\\), \\(r = ${R}\\).</p>` });
  });
  serija("kr-skozi-tocko", 5, (r) => {
    const p = r.int(-4, 4), q = r.int(-4, 4), [a, b, c] = r.izberi([[3, 4, 5], [0, 3, 3], [6, 8, 10], [5, 12, 13], [4, 0, 4]]);
    const T0 = [p + a * r.izberi([1, -1]), q + b * r.izberi([1, -1])];
    return stevilo({ tezavnost: 2, vrednost: c, besedilo: `Krožnica s središčem \\(S(${p}, ${q})\\) gre skozi točko \\(A(${T0[0]}, ${T0[1]})\\). Kolikšen je njen polmer?`, rezultat: `\\(r = ${c}\\)`, postopek: `<p>Polmer je razdalja med \\(S\\) in \\(A\\): \\(r = \\sqrt{${okl(T0[0] - p)}^2 + ${okl(T0[1] - q)}^2} = \\sqrt{${c * c}} = ${c}\\).</p>` });
  });
  serija("kr-lega-tocke", 6, (r) => {
    const p = r.int(-4, 4), q = r.int(-4, 4), R = r.int(2, 6), A = [r.int(-8, 8), r.int(-8, 8)];
    const d2 = (A[0] - p) ** 2 + (A[1] - q) ** 2;
    const odg = d2 < R * R ? "znotraj krožnice" : d2 === R * R ? "na krožnici" : "zunaj krožnice";
    return izbira({ r, tezavnost: 2, besedilo: `Kje leži točka \\(A(${A[0]}, ${A[1]})\\) glede na krožnico \\(${zam(p, "x")} + ${zam(q, "y")} = ${R * R}\\)?`, pravilna: odg, napacne: ["znotraj krožnice", "na krožnici", "zunaj krožnice"].filter((x) => x !== odg), postopek: `<p>Vstavimo točko v levo stran: \\(${okl(A[0] - p)}^2 + ${okl(A[1] - q)}^2 = ${d2}\\), kar je ${d2 < R * R ? "manj kot" : d2 === R * R ? "enako" : "več kot"} \\(r^2 = ${R * R}\\).</p>` });
  });
  serija("kr-premer", 4, (r) => {
    const A = [r.int(-6, 6), r.int(-6, 6)], [a, b] = r.izberi([[6, 8], [0, 10], [8, 6], [10, 0], [4, 0], [0, 6]]);
    const B = [A[0] + a, A[1] + b], S = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], R = Math.hypot(a, b) / 2;
    return stevilo({ tezavnost: 3, vrednost: R * R, besedilo: `Daljica \\(AB\\), \\(A(${A[0]}, ${A[1]})\\), \\(B(${B[0]}, ${B[1]})\\), je premer krožnice. Enačba krožnice je \\((x - p)^2 + (y - q)^2 = r^2\\). Koliko je \\(r^2\\)?`, rezultat: `\\(${zam(S[0], "x")} + ${zam(S[1], "y")} = ${R * R}\\)`, postopek: `<p>Središče je razpolovišče: \\(S(${S[0]}, ${S[1]})\\).</p><p>\\(r = \\frac{|AB|}{2} = \\frac{${Math.hypot(a, b)}}{2} = ${R}\\), \\(r^2 = ${R * R}\\).</p>` });
  });
  serija("kr-premica", 5, (r) => {
    const R = r.int(2, 6), d = r.int(0, 9), k = r.izberi(["x", "y"]);
    const odg = d < R ? "jo seka v dveh točkah" : d === R ? "se je dotika" : "je ne seka";
    return izbira({ r, tezavnost: 3, besedilo: `Kakšna je lega premice \\(${k} = ${d}\\) glede na krožnico \\(x^2 + y^2 = ${R * R}\\)? Premica …`, pravilna: odg, napacne: ["jo seka v dveh točkah", "se je dotika", "je ne seka"].filter((x) => x !== odg), postopek: `<p>Razdalja premice od središča \\((0, 0)\\) je ${d}, polmer je ${R}.</p><p>${d < R ? "Razdalja je manjša od polmera: sekanta." : d === R ? "Razdalja je enaka polmeru: tangenta." : "Razdalja je večja od polmera: mimobežnica."}</p>` });
  });
  serija("kr-tangenta", 4, (r) => {
    const [a, b, c] = r.izberi([[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10]]), sx = r.izberi([1, -1]), sy = r.izberi([1, -1]);
    const x0 = sx * a, y0 = sy * b, R2 = c * c;
    // tangenta: x0 x + y0 y = r^2  → y = (r^2 - x0 x)/y0 ; vprašamo za presečišče z osjo y: r^2/y0
    const n = R2 / y0;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(n, 6), toleranca: 0.01, besedilo: `V točki \\(T(${x0}, ${y0})\\) na krožnici \\(x^2 + y^2 = ${R2}\\) narišemo tangento. V kateri točki seka tangenta os \\(y\\)? (Vpiši ordinato, na dve decimalki.)`, rezultat: `\\(y = ${L(n, 2)}\\)`, postopek: `<p>Tangenta na \\(x^2 + y^2 = r^2\\) v točki \\(T(x_0, y_0)\\): \\(x_0x + y_0y = r^2\\).</p><p>\\(${x0}x ${y0 < 0 ? "-" : "+"} ${Math.abs(y0)}y = ${R2}\\). Pri \\(x = 0\\): \\(y = \\frac{${R2}}{${y0}} \\approx ${L(n, 2)}\\).</p>` });
  });

  // ---------- elipsa ----------
  serija("el-polosi", 6, (r, i) => {
    const a = r.int(3, 9), b = r.int(1, a - 1);
    const kaj = ["a", "b", "e"][i % 3], e = Math.sqrt(a * a - b * b);
    const v = kaj === "a" ? a : kaj === "b" ? b : e;
    return stevilo({ tezavnost: kaj === "e" ? 2 : 1, vrednost: zaokrozi(v, 4), toleranca: kaj === "e" ? 0.01 : 1e-9, besedilo: `Elipsa ima enačbo \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\). ${kaj === "a" ? "Kolikšna je velika polos?" : kaj === "b" ? "Kolikšna je mala polos?" : "Kolikšna je linearna ekscentričnost \\(e\\)? (Na dve decimalki.)"}`, rezultat: kaj === "e" ? `\\(e = \\sqrt{${a * a - b * b}} \\approx ${L(e, 2)}\\)` : `${v}`, postopek: `<p>Iz enačbe: \\(a^2 = ${a * a}\\), \\(b^2 = ${b * b}\\), torej \\(a = ${a}\\), \\(b = ${b}\\).</p>${kaj === "e" ? `<p>\\(e = \\sqrt{a^2 - b^2} = \\sqrt{${a * a - b * b}} \\approx ${L(e, 2)}\\)</p>` : ""}` });
  });
  serija("el-gorisca", 4, (r) => {
    const [a, b, e] = r.izberi([[5, 4, 3], [5, 3, 4], [13, 12, 5], [13, 5, 12], [10, 8, 6], [10, 6, 8], [17, 15, 8]]);
    return stevilo({ tezavnost: 2, vrednost: e, besedilo: `Elipsa \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\) ima gorišči \\(F_1(-e, 0)\\) in \\(F_2(e, 0)\\). Koliko je \\(e\\)?`, rezultat: `\\(e = ${e}\\)`, postopek: `<p>\\(e = \\sqrt{a^2 - b^2} = \\sqrt{${a * a} - ${b * b}} = \\sqrt{${e * e}} = ${e}\\)</p>` });
  });
  serija("el-numericna", 3, (r) => {
    const [a, b, e] = r.izberi([[5, 4, 3], [5, 3, 4], [13, 12, 5], [10, 6, 8], [25, 24, 7]]);
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(e / a, 4), toleranca: 0.005, besedilo: `Izračunaj numerično ekscentričnost elipse \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\) (na dve decimalki).`, rezultat: `\\(\\varepsilon = \\frac{${e}}{${a}} \\approx ${L(e / a, 2)}\\)`, postopek: `<p>\\(e = \\sqrt{${a * a} - ${b * b}} = ${e}\\)</p><p>\\(\\varepsilon = \\frac{e}{a} = \\frac{${e}}{${a}} \\approx ${L(e / a, 2)}\\)</p>` });
  });
  serija("el-vsota", 3, (r) => {
    const a = r.int(3, 10), b = r.int(1, a - 1);
    return stevilo({ tezavnost: 2, vrednost: 2 * a, besedilo: `Točka \\(T\\) leži na elipsi \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\). Kolikšna je vsota razdalj točke \\(T\\) do obeh gorišč?`, rezultat: `${2 * a}`, postopek: `<p>Po definiciji elipse je vsota razdalj do gorišč konstantna in enaka \\(2a = 2 \\cdot ${a} = ${2 * a}\\).</p>` });
  });
  serija("el-tocka", 4, (r) => {
    const [a, b] = r.izberi([[5, 4], [5, 3], [10, 6], [10, 8], [13, 12]]);
    const [x, y] = { "5,4": [3, 16 / 5], "5,3": [4, 9 / 5], "10,6": [6, 24 / 5], "10,8": [6, 32 / 5], "13,12": [5, 144 / 13] }[`${a},${b}`];
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(y, 4), toleranca: 0.01, besedilo: `Točka \\(T(${x}, y)\\), \\(y > 0\\), leži na elipsi \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\). Koliko je \\(y\\)? (Na dve decimalki.)`, rezultat: `\\(y = ${L(y, 2)}\\)`, postopek: `<p>\\(\\frac{y^2}{${b * b}} = 1 - \\frac{${x * x}}{${a * a}} = \\frac{${a * a - x * x}}{${a * a}}\\)</p><p>\\(y = ${b} \\cdot \\frac{\\sqrt{${a * a - x * x}}}{${a}} = ${L(y, 2)}\\)</p>` });
  });
  serija("el-ploscina", 3, (r) => {
    const a = r.int(2, 9), b = r.int(1, a);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(Math.PI * a * b, 4), toleranca: 0.05, besedilo: `Ploščina elipse s polosema \\(a\\) in \\(b\\) je \\(\\pi ab\\). Izračunaj ploščino elipse \\(${b * b}x^2 + ${a * a}y^2 = ${a * a * b * b}\\) (na dve decimalki).`, rezultat: `\\(${a * b}\\pi \\approx ${L(Math.PI * a * b, 2)}\\)`, postopek: `<p>Delimo z ${a * a * b * b}: \\(\\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1\\), \\(a = ${a}\\), \\(b = ${b}\\).</p><p>\\(S = \\pi \\cdot ${a} \\cdot ${b} \\approx ${L(Math.PI * a * b, 2)}\\)</p>` });
  });

  // ---------- hiperbola ----------
  serija("hip-polosi", 4, (r, i) => {
    const a = r.int(1, 8), b = r.int(1, 8), e = Math.sqrt(a * a + b * b);
    if (i % 2)
      return stevilo({ tezavnost: 2, vrednost: zaokrozi(e, 4), toleranca: 0.01, besedilo: `Izračunaj linearno ekscentričnost hiperbole \\(\\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1\\) (na dve decimalki).`, rezultat: `\\(e \\approx ${L(e, 2)}\\)`, postopek: `<p>Pri hiperboli velja \\(e^2 = a^2 + b^2 = ${a * a} + ${b * b} = ${a * a + b * b}\\).</p><p>\\(e \\approx ${L(e, 2)}\\)</p>` });
    return stevilo({ tezavnost: 1, vrednost: 2 * a, besedilo: `Kolikšna je razdalja med temenoma hiperbole \\(\\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1\\)?`, rezultat: `\\(2a = ${2 * a}\\)`, postopek: `<p>Temeni sta \\((\\pm a, 0) = (\\pm ${a}, 0)\\), razdalja \\(2a = ${2 * a}\\).</p>` });
  });
  serija("hip-asimptota", 5, (r) => {
    const a = r.int(1, 6), b = r.int(1, 6);
    const prav = `\\(y = \\pm ${b % a === 0 ? (b / a === 1 ? "" : b / a) : `\\frac{${b}}{${a}}`}x\\)`;
    const dr = `\\(y = \\pm ${a % b === 0 ? (a / b === 1 ? "" : a / b) : `\\frac{${a}}{${b}}`}x\\)`;
    if (a === b) return null;
    return izbira({ r, tezavnost: 2, besedilo: `Kateri sta asimptoti hiperbole \\(\\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1\\)?`, pravilna: prav, napacne: [dr, `\\(y = \\pm ${b * b}x\\)`, `\\(x = \\pm ${a}\\)`], postopek: `<p>Asimptoti hiperbole \\(\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1\\) sta \\(y = \\pm\\frac{b}{a}x\\). Tu \\(a = ${a}\\), \\(b = ${b}\\).</p>` });
  });
  serija("hip-razlika", 3, (r) => {
    const a = r.int(2, 9), b = r.int(1, 9);
    return stevilo({ tezavnost: 2, vrednost: 2 * a, besedilo: `Točka \\(T\\) leži na hiperboli \\(\\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1\\). Kolikšna je absolutna vrednost razlike razdalj točke \\(T\\) do gorišč?`, rezultat: `${2 * a}`, postopek: `<p>Po definiciji hiperbole je \\(||TF_1| - |TF_2|| = 2a = ${2 * a}\\).</p>` });
  });

  // ---------- parabola ----------
  serija("par-gorisce", 6, (r, i) => {
    const p = r.int(1, 8), sm = r.izberi(["x", "y"]), zn = r.izberi([1, -1]);
    const en = sm === "x" ? `y^2 = ${zn * 2 * p}x` : `x^2 = ${zn * 2 * p}y`;
    const F = zn * p / 2;
    const kaj = i % 2 ? "vodnica" : "gorisce";
    return stevilo({ tezavnost: 2, vrednost: kaj === "gorisce" ? F : -F, besedilo: `Parabola ima enačbo \\(${en}\\). ${kaj === "gorisce" ? `Kolikšna je ${sm === "x" ? "abscisa" : "ordinata"} gorišča?` : `Vodnica ima enačbo \\(${sm} = c\\). Koliko je \\(c\\)?`}`, rezultat: sm === "x" ? `\\(F(${T(F, 2)}, 0)\\), vodnica \\(x = ${T(-F, 2)}\\)` : `\\(F(0, ${T(F, 2)})\\), vodnica \\(y = ${T(-F, 2)}\\)`, postopek: `<p>Parabola \\(${sm === "x" ? "y^2 = 2px" : "x^2 = 2py"}\\) ima gorišče v \\(${sm === "x" ? "(\\frac p2, 0)" : "(0, \\frac p2)"}\\) in vodnico \\(${sm} = -\\frac p2\\).</p><p>\\(2p = ${zn * 2 * p}\\), \\(p = ${zn * p}\\), \\(\\frac p2 = ${L(F, 2)}\\).</p>` });
  });
  serija("par-tocka", 4, (r) => {
    const p = r.int(1, 6), y = r.int(1, 6) * 2;
    const x = (y * y) / (2 * p);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(x + p / 2, 4), toleranca: 0.01, besedilo: `Točka \\(T(x, ${y})\\) leži na paraboli \\(y^2 = ${2 * p}x\\). Kolikšna je njena razdalja do gorišča? (Na dve decimalki.)`, rezultat: `${T(x + p / 2, 2)}`, postopek: `<p>\\(x = \\frac{${y * y}}{${2 * p}} = ${L(x, 2)}\\).</p><p>Razdalja do gorišča je enaka razdalji do vodnice \\(x = -\\frac{p}{2} = ${L(-p / 2, 2)}\\): \\(d = x + \\frac p2 = ${L(x + p / 2, 2)}\\).</p>` });
  });

  // ---------- prepoznavanje ----------
  serija("vrsta", 6, (r) => {
    const a = r.int(1, 6), b = r.int(1, 6), c = r.int(1, 30);
    const [en, odg] = r.izberi([
      [`${a}x^2 + ${a}y^2 = ${c}`, "krožnica"],
      [`${a}x^2 + ${a + b}y^2 = ${c}`, "elipsa"],
      [`${a}x^2 - ${b}y^2 = ${c}`, "hiperbola"],
      [`y^2 = ${a + b}x`, "parabola"],
      [`${b}y^2 - ${a}x^2 = ${c}`, "hiperbola"],
      [`x^2 = ${-a}y`, "parabola"],
      [`${a + b}x^2 + ${a}y^2 = ${c}`, "elipsa"],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: `Katero krivuljo predstavlja enačba \\(${en}\\)?`, pravilna: odg, napacne: ["krožnica", "elipsa", "hiperbola", "parabola"].filter((x) => x !== odg), postopek: `<p>Gledamo kvadratna člena: ${odg === "krožnica" ? "enaka koeficienta pri \\(x^2\\) in \\(y^2\\) — krožnica" : odg === "elipsa" ? "različna pozitivna koeficienta — elipsa" : odg === "hiperbola" ? "koeficienta z različnima predznakoma — hiperbola" : "samo ena spremenljivka je kvadrirana — parabola"}.</p>` });
  });
  serija("presek", 4, (r) => {
    const R = r.izberi([5, 10, 13, 25]), [a, b] = { 5: [3, 4], 10: [6, 8], 13: [5, 12], 25: [7, 24] }[R];
    return stevilo({ tezavnost: 3, vrednost: 2, besedilo: `V koliko točkah se sekata krožnica \\(x^2 + y^2 = ${R * R}\\) in premica \\(x = ${a}\\)?`, rezultat: `V dveh: \\((${a}, ${b})\\) in \\((${a}, ${-b})\\).`, postopek: `<p>\\(y^2 = ${R * R} - ${a * a} = ${b * b}\\), \\(y = \\pm ${b}\\): dve točki.</p>` });
  });
  serija("visja-presek", 4, (r) => {
    const R = r.izberi([5, 10, 13]), k = r.izberi([1, -1]);
    // krožnica x^2+y^2=R^2 in premica y = kx + n skozi točko (a,b)
    const [a, b] = { 5: [3, 4], 10: [6, 8], 13: [5, 12] }[R];
    const n = b - k * a;
    // x^2 + (kx+n)^2 = R^2 → 2x^2 + 2knx + n^2 - R^2 = 0; ena rešitev je a, druga x2 = -kn - a
    const x2 = -k * n - a, y2 = k * x2 + n;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: x2, besedilo: `Premica \\(y = ${k === 1 ? "" : "-"}x ${n < 0 ? "-" : "+"} ${Math.abs(n)}\\) seka krožnico \\(x^2 + y^2 = ${R * R}\\) v točkah \\(A(${a}, ${b})\\) in \\(B\\). Kolikšna je abscisa točke \\(B\\)?`, rezultat: `\\(B(${x2}, ${y2})\\)`, postopek: `<p>Vstavimo \\(y\\) v enačbo krožnice: \\(x^2 + (${k === 1 ? "" : "-"}x ${n < 0 ? "-" : "+"} ${Math.abs(n)})^2 = ${R * R}\\), \\(2x^2 ${2 * k * n < 0 ? "-" : "+"} ${Math.abs(2 * k * n)}x ${n * n - R * R < 0 ? "-" : "+"} ${Math.abs(n * n - R * R)} = 0\\).</p><p>Po Vietu je \\(x_1 + x_2 = ${-k * n}\\), ker je \\(x_1 = ${a}\\), je \\(x_2 = ${x2}\\).</p>` });
  });
  serija("visja-elipsa", 3, (r) => {
    const [a, b, e] = r.izberi([[5, 4, 3], [5, 3, 4], [13, 12, 5], [10, 8, 6]]);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: b * b, besedilo: `Elipsa s središčem v izhodišču ima gorišči \\((\\pm ${e}, 0)\\) in gre skozi točko \\((${a}, 0)\\). Enačba je \\(\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1\\). Koliko je \\(b^2\\)?`, rezultat: `\\(b^2 = ${b * b}\\)`, postopek: `<p>Točka \\((${a}, 0)\\) je teme, zato \\(a = ${a}\\).</p><p>\\(b^2 = a^2 - e^2 = ${a * a} - ${e * e} = ${b * b}\\)</p>` });
  });
}
