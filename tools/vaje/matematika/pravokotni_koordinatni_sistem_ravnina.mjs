import { stevilo, izbira, T } from "../lib.mjs";

const L = (x, d = 2) => T(x, d).replace("−", "-").replace(",", "{,}");
const tc = (P) => `(${P[0]}, ${P[1]})`;
const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const d2 = (A, B) => (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2;
const det = (A, B, C) => (B[0] - A[0]) * (C[1] - A[1]) - (C[0] - A[0]) * (B[1] - A[1]);

export default function ({ z, slug, serija }) {
  const tocka = (r, m = 8) => [r.int(-m, m), r.int(-m, m)];

  serija("kvadrant", 5, (r) => {
    const P = [r.nenic(-9, 9), r.nenic(-9, 9)];
    const k = P[0] > 0 ? (P[1] > 0 ? "1." : "4.") : P[1] > 0 ? "2." : "3.";
    return izbira({ tezavnost: 1, r, besedilo: `V katerem kvadrantu leži točka \\(T${tc(P)}\\)?`, pravilna: `v ${k} kvadrantu`, napacne: ["1.", "2.", "3.", "4."].filter((x) => x !== k).map((x) => `v ${x} kvadrantu`), postopek: `<p>Kvadrante štejemo v nasprotni smeri urinega kazalca od pozitivnega dela osi \\(x\\): 1. \\((+, +)\\), 2. \\((-, +)\\), 3. \\((-, -)\\), 4. \\((+, -)\\).</p><p>\\(T${tc(P)}\\) ima predznaka \\((${P[0] > 0 ? "+" : "-"}, ${P[1] > 0 ? "+" : "-"})\\): ${k} kvadrant.</p>` });
  });
  serija("simetrija", 6, (r, i) => {
    const P = [r.nenic(-9, 9), r.nenic(-9, 9)];
    const [kaj, Q, pravilo] = [
      ["os \\(x\\)", [P[0], -P[1]], "Pri zrcaljenju čez os \\(x\\) ostane \\(x\\), \\(y\\) spremeni predznak."],
      ["os \\(y\\)", [-P[0], P[1]], "Pri zrcaljenju čez os \\(y\\) ostane \\(y\\), \\(x\\) spremeni predznak."],
      ["koordinatno izhodišče", [-P[0], -P[1]], "Pri zrcaljenju čez izhodišče obe koordinati spremenita predznak."],
      ["simetralo lihih kvadrantov \\(y = x\\)", [P[1], P[0]], "Pri zrcaljenju čez \\(y = x\\) koordinati zamenjata mesti."],
    ][i % 4];
    const k = i % 2;
    return stevilo({ tezavnost: i < 3 ? 1 : 2, vrednost: Q[k], besedilo: `Točko \\(T${tc(P)}\\) prezrcalimo čez ${kaj}. Kolikšna je ${k ? "ordinata (\\(y\\))" : "abscisa (\\(x\\))"} dobljene točke?`, rezultat: `\\(T'${tc(Q)}\\)`, postopek: `<p>${pravilo}</p><p>\\(T'${tc(Q)}\\)</p>` });
  });
  serija("razdalja", 7, (r) => {
    const A = tocka(r), [dx, dy] = r.izberi([[3, 4], [6, 8], [5, 12], [1, 1], [2, 3], [4, 5], [8, 15]]).map((x) => x * r.izberi([1, -1]));
    const B = [A[0] + dx, A[1] + dy], d = Math.sqrt(d2(A, B));
    return stevilo({ tezavnost: 1, vrednost: d, besedilo: `Izračunaj razdaljo med točkama \\(A${tc(A)}\\) in \\(B${tc(B)}\\)${Number.isInteger(d) ? "" : " (na dve decimalki)"}.`, rezultat: Number.isInteger(d) ? `\\(d = ${d}\\)` : `\\(d = \\sqrt{${d2(A, B)}} \\approx ${L(d)}\\)`, postopek: `<p>\\(d(A, B) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \\sqrt{${okl(dx)}^2 + ${okl(dy)}^2} = \\sqrt{${d2(A, B)}}${Number.isInteger(d) ? ` = ${d}` : ` \\approx ${L(d)}`}\\)</p>` });
  });
  serija("razpolovisce", 6, (r, i) => {
    const A = tocka(r), B = tocka(r);
    if (i % 2 === 0) {
      if ((A[0] + B[0]) % 2 || (A[1] + B[1]) % 2) return null;
      const S = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      return stevilo({ tezavnost: 1, vrednost: S[0], besedilo: `Kolikšna je abscisa razpolovišča daljice z krajiščema \\(A${tc(A)}\\) in \\(B${tc(B)}\\)?`, rezultat: `\\(S${tc(S)}\\)`, postopek: `<p>\\(S\\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right) = ${tc(S)}\\)</p>` });
    }
    const S = A, Bk = [2 * S[0] - B[0], 2 * S[1] - B[1]];
    return stevilo({ tezavnost: 2, vrednost: Bk[1], besedilo: `Točka \\(S${tc(S)}\\) je razpolovišče daljice \\(AB\\), krajišče je \\(A${tc(B)}\\). Kolikšna je ordinata krajišča \\(B\\)?`, rezultat: `\\(B${tc(Bk)}\\)`, postopek: `<p>Iz \\(y_S = \\frac{y_A + y_B}{2}\\) sledi \\(y_B = 2y_S - y_A = 2 \\cdot ${okl(S[1])} - ${okl(B[1])} = ${Bk[1]}\\).</p><p>\\(B${tc(Bk)}\\)</p>` });
  });
  serija("tezisce", 4, (r) => {
    const A = tocka(r), B = tocka(r), C = tocka(r);
    const x = A[0] + B[0] + C[0], y = A[1] + B[1] + C[1];
    if (x % 3 || y % 3) return null;
    return stevilo({ tezavnost: 2, vrednost: y / 3, besedilo: `Kolikšna je ordinata težišča trikotnika z oglišči \\(A${tc(A)}\\), \\(B${tc(B)}\\), \\(C${tc(C)}\\)?`, rezultat: `\\(T(${x / 3}, ${y / 3})\\)`, postopek: `<p>\\(T\\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right) = \\left(\\frac{${x}}{3}, \\frac{${y}}{3}\\right) = (${x / 3}, ${y / 3})\\)</p>` });
  });
  serija("neznana", 5, (r) => {
    const A = tocka(r, 5), [dx, dy] = r.izberi([[3, 4], [6, 8], [5, 12], [4, 3]]);
    const y = A[1] + dy, x = A[0] + dx;
    return stevilo({ tezavnost: 2, vrednost: x, besedilo: `Točka \\(B(x, ${y})\\) je od točke \\(A${tc(A)}\\) oddaljena ${Math.hypot(dx, dy)} enot in leži desno od \\(A\\). Koliko je \\(x\\)?`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>\\((x - ${okl(A[0])})^2 + ${dy}^2 = ${Math.hypot(dx, dy) ** 2}\\), \\((x - ${okl(A[0])})^2 = ${dx * dx}\\), \\(x - ${okl(A[0])} = \\pm ${dx}\\).</p><p>Ker je \\(B\\) desno od \\(A\\), je \\(x = ${A[0]} + ${dx} = ${x}\\).</p>` });
  });
  serija("ploscina", 7, (r) => {
    const A = tocka(r), B = tocka(r), C = tocka(r), D = det(A, B, C);
    if (!D) return null;
    return stevilo({ tezavnost: 2, vrednost: Math.abs(D) / 2, besedilo: `Izračunaj ploščino trikotnika z oglišči \\(A${tc(A)}\\), \\(B${tc(B)}\\) in \\(C${tc(C)}\\).`, rezultat: `\\(P = ${L(Math.abs(D) / 2)}\\)`, postopek: `<p>\\(P = \\frac12 |(x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1)|\\)</p><p>\\(= \\frac12 |${okl(B[0] - A[0])} \\cdot ${okl(C[1] - A[1])} - ${okl(C[0] - A[0])} \\cdot ${okl(B[1] - A[1])}| = \\frac12 \\cdot ${Math.abs(D)} = ${L(Math.abs(D) / 2)}\\)</p>` });
  });
  serija("obseg", 3, (r) => {
    const A = [r.int(-4, 4), r.int(-4, 4)], B = [A[0] + 3, A[1]], C = [A[0], A[1] + 4];
    return stevilo({ tezavnost: 2, vrednost: 12, besedilo: `Izračunaj obseg trikotnika z oglišči \\(A${tc(A)}\\), \\(B${tc(B)}\\), \\(C${tc(C)}\\).`, rezultat: "\\(o = 12\\)", postopek: `<p>\\(|AB| = 3\\), \\(|AC| = 4\\), \\(|BC| = \\sqrt{3^2 + 4^2} = 5\\).</p><p>\\(o = 3 + 4 + 5 = 12\\)</p>` });
  });
  serija("vrsta", 5, (r) => {
    const A = tocka(r, 5), u = r.izberi([[2, 1], [3, 1], [1, 2], [2, 3], [3, 2]]), k = r.izberi([1, 2]);
    const prav = r() < 0.5;
    const B = [A[0] + u[0], A[1] + u[1]], C = prav ? [A[0] - k * u[1], A[1] + k * u[0]] : [A[0] - k * u[1] + 1, A[1] + k * u[0]];
    const ab = d2(A, B), ac = d2(A, C), bc = d2(B, C);
    const [x, y, w] = [ab, ac, bc].sort((p, q) => p - q);
    const je = x + y === w;
    return izbira({ tezavnost: 3, r, besedilo: `Ali je trikotnik z oglišči \\(A${tc(A)}\\), \\(B${tc(B)}\\), \\(C${tc(C)}\\) pravokoten?`, pravilna: je ? "Da" : "Ne", napacne: [je ? "Ne" : "Da"], postopek: `<p>Kvadrati stranic: \\(|AB|^2 = ${ab}\\), \\(|AC|^2 = ${ac}\\), \\(|BC|^2 = ${bc}\\).</p><p>\\(${x} + ${y} ${je ? "=" : "\\ne"} ${w}\\), zato trikotnik ${je ? "je" : "ni"} pravokoten (obrat Pitagorovega izreka).</p>` });
  });
  serija("kolinearnost", 4, (r) => {
    const A = tocka(r, 5), u = [r.nenic(-3, 3), r.nenic(-3, 3)], k = r.int(2, 3);
    const B = [A[0] + u[0], A[1] + u[1]], C = [A[0] + k * u[0], A[1] + k * u[1]];
    return stevilo({ tezavnost: 3, vrednost: C[1], besedilo: `Za katero vrednost \\(y\\) ležijo točke \\(A${tc(A)}\\), \\(B${tc(B)}\\) in \\(C(${C[0]}, y)\\) na isti premici?`, rezultat: `\\(y = ${C[1]}\\)`, postopek: `<p>Točke so kolinearne, ko je ploščina trikotnika \\(ABC\\) enaka 0 (ali ko imata \\(AB\\) in \\(AC\\) enak smerni koeficient).</p><p>\\(k_{AB} = \\frac{${u[1]}}{${u[0]}}\\), zato \\(\\frac{y - ${okl(A[1])}}{${C[0] - A[0]}} = \\frac{${u[1]}}{${u[0]}}\\), \\(y = ${C[1]}\\).</p>` });
  });
  const pogoji = [
    ["\\{(x, y); x > 0, y < 0\\}", "4. kvadrant (brez osi)", ["1. kvadrant", "2. kvadrant (brez osi)", "3. kvadrant (brez osi)"]],
    ["\\{(x, y); |x| \\le 2\\}", "navpični pas med premicama \\(x = -2\\) in \\(x = 2\\), skupaj z njima", ["vodoravni pas med \\(y = -2\\) in \\(y = 2\\)", "kvadrat s stranico 4", "polravnina desno od \\(x = 2\\)"]],
    ["\\{(x, y); y = x\\}", "simetrala lihih kvadrantov", ["simetrala sodih kvadrantov", "os \\(x\\)", "os \\(y\\)"]],
    ["\\{(x, y); x \\cdot y = 0\\}", "unija obeh koordinatnih osi", ["samo izhodišče", "os \\(x\\)", "1. in 3. kvadrant"]],
    ["\\{(x, y); |x| \\le 1, |y| \\le 1\\}", "kvadrat z oglišči \\((\\pm1, \\pm1)\\)", ["krog s polmerom 1", "pas med \\(x = -1\\) in \\(x = 1\\)", "romb z oglišči \\((\\pm1, 0)\\), \\((0, \\pm1)\\)"]],
  ];
  serija("pogoji", pogoji.length, (r, i) => {
    const [m, p, n] = pogoji[i];
    return izbira({ tezavnost: 2, r, besedilo: `Kaj predstavlja množica točk \\(${m}\\)?`, pravilna: p, napacne: n, postopek: `<p>Pogoje beremo po vrsti in narišemo vsakega posebej, nato vzamemo presek. Rezultat: ${p}.</p>` });
  });
  serija("visja", 5, (r) => {
    const A = [0, 0], B = [r.int(2, 8), 0], P = r.int(4, 30);
    const y = (2 * P) / B[0];
    if (!Number.isInteger(y)) return null;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: y, besedilo: `Trikotnik z oglišči \\(A${tc(A)}\\), \\(B${tc(B)}\\) in \\(C(${r.int(-3, 3)}, y)\\), \\(y > 0\\), ima ploščino ${P}. Koliko je \\(y\\)?`, rezultat: `\\(y = ${y}\\)`, postopek: `<p>Osnovnica \\(AB\\) leži na osi \\(x\\) in meri ${B[0]}, višina je \\(y\\): \\(\\frac{${B[0]} \\cdot y}{2} = ${P}\\).</p><p>\\(y = \\frac{2 \\cdot ${P}}{${B[0]}} = ${y}\\)</p>` });
  });
}
