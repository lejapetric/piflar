import { stevilo, izbira, T, zaokrozi } from "../lib.mjs";

const L = (x, d = 2) => T(x, d).replace("−", "-").replace(",", "{,}");
const vec = (v) => `(${v.join(", ")})`;
const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const dolz = (v) => Math.hypot(...v);
const skal = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);

export default function ({ z, slug, serija }) {
  const rv = (r, n) => Array.from({ length: n }, () => r.int(-6, 6));

  serija("med-tockama", 5, (r, i) => {
    const n = i < 3 ? 2 : 3, A = rv(r, n), B = rv(r, n);
    const AB = B.map((x, k) => x - A[k]);
    const k = r.int(0, n - 1), ime = "xyz"[k];
    return stevilo({ tezavnost: 1, vrednost: AB[k], besedilo: `Dani sta točki \\(A${vec(A)}\\) in \\(B${vec(B)}\\). Kolikšna je ${ime}-komponenta vektorja \\(\\overrightarrow{AB}\\)?`, rezultat: `\\(\\overrightarrow{AB} = ${vec(AB)}\\)`, postopek: `<p>Od koordinat končne točke odštejemo koordinate začetne: \\(\\overrightarrow{AB} = \\vec{r}_B - \\vec{r}_A = ${vec(AB)}\\).</p>` });
  });
  serija("dolzina", 7, (r, i) => {
    const pit = [[3, 4], [6, 8], [5, 12], [8, 15]], pit3 = [[1, 2, 2], [2, 3, 6], [1, 4, 8], [2, 6, 9], [4, 4, 7]];
    const v = (i < 4 ? r.izberi(pit) : r.izberi(pit3)).map((x) => x * r.izberi([1, -1]));
    return stevilo({ tezavnost: 1, vrednost: dolz(v), besedilo: `Izračunaj dolžino vektorja \\(\\vec{a} = ${vec(v)}\\).`, rezultat: `\\(|\\vec{a}| = ${dolz(v)}\\)`, postopek: `<p>\\(|\\vec{a}| = \\sqrt{${v.map((x) => `${okl(x)}^2`).join(" + ")}} = \\sqrt{${skal(v, v)}} = ${dolz(v)}\\)</p>` });
  });
  serija("kombinacija", 5, (r, i) => {
    const n = i < 3 ? 2 : 3, a = rv(r, n), b = rv(r, n), p = r.nenic(-3, 3), q = r.nenic(-3, 3);
    const c = a.map((x, k) => p * x + q * b[k]);
    const k = r.int(0, n - 1);
    return stevilo({ tezavnost: 1, vrednost: c[k], besedilo: `Dana sta vektorja \\(\\vec{a} = ${vec(a)}\\) in \\(\\vec{b} = ${vec(b)}\\). Kolikšna je ${"xyz"[k]}-komponenta vektorja \\(${p}\\vec{a} ${q < 0 ? "-" : "+"} ${Math.abs(q)}\\vec{b}\\)?`, rezultat: `\\(${vec(c)}\\)`, postopek: `<p>Računamo po komponentah: \\(${p} \\cdot ${vec(a)} ${q < 0 ? "-" : "+"} ${Math.abs(q)} \\cdot ${vec(b)} = ${vec(c)}\\).</p>` });
  });
  serija("skalarni", 7, (r, i) => {
    const n = i < 4 ? 2 : 3, a = rv(r, n), b = rv(r, n);
    return stevilo({ tezavnost: i < 4 ? 1 : 2, vrednost: skal(a, b), besedilo: `Izračunaj skalarni produkt vektorjev \\(\\vec{a} = ${vec(a)}\\) in \\(\\vec{b} = ${vec(b)}\\).`, rezultat: `\\(\\vec{a} \\cdot \\vec{b} = ${skal(a, b)}\\)`, postopek: `<p>\\(\\vec{a} \\cdot \\vec{b} = ${a.map((x, k) => `${okl(x)} \\cdot ${okl(b[k])}`).join(" + ")} = ${skal(a, b)}\\)</p>` });
  });
  serija("brez-koordinat", 4, (r) => {
    const a = r.int(2, 8), b = r.int(2, 8), k = r.izberi([0, 60, 90, 120, 180, 45, 30]);
    const c = { 0: 1, 30: Math.sqrt(3) / 2, 45: Math.SQRT1_2, 60: 0.5, 90: 0, 120: -0.5, 180: -1 }[k];
    const v = a * b * c;
    const ct = { 0: "1", 30: "\\frac{\\sqrt3}{2}", 45: "\\frac{\\sqrt2}{2}", 60: "\\frac12", 90: "0", 120: "-\\frac12", 180: "-1" }[k];
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(v, 4), toleranca: 0.01, besedilo: `Vektorja imata dolžini \\(|\\vec{a}| = ${a}\\) in \\(|\\vec{b}| = ${b}\\) ter oklepata kot ${k}°. Izračunaj \\(\\vec{a} \\cdot \\vec{b}\\)${[30, 45].includes(k) ? " (na dve decimalki)" : ""}.`, rezultat: `${T(v, 2)}`, postopek: `<p>\\(\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\varphi = ${a} \\cdot ${b} \\cdot ${ct} = ${L(v)}\\)</p>` });
  });
  serija("kot", 7, (r, i) => {
    const n = i < 4 ? 2 : 3, a = rv(r, n), b = rv(r, n);
    if (!dolz(a) || !dolz(b)) return null;
    const c = skal(a, b) / (dolz(a) * dolz(b)), k = (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
    return stevilo({ tezavnost: i < 4 ? 2 : 3, vrednost: zaokrozi(k, 2), toleranca: 0.05, enota: "°", besedilo: `Izračunaj kot med vektorjema \\(\\vec{a} = ${vec(a)}\\) in \\(\\vec{b} = ${vec(b)}\\) na dve decimalki.`, rezultat: `${T(k, 2)}°`, postopek: `<p>\\(\\cos\\varphi = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|} = \\frac{${skal(a, b)}}{\\sqrt{${skal(a, a)}} \\cdot \\sqrt{${skal(b, b)}}} \\approx ${L(c, 4)}\\)</p><p>\\(\\varphi \\approx ${L(k)}°\\)</p>` });
  });
  serija("pravokotnost", 6, (r, i) => {
    const n = i < 3 ? 2 : 3, a = rv(r, n), b = rv(r, n), k = n - 1;
    if (a[k] === 0) return null;
    // a·b = 0 → b[k] = -(vsota ostalih)/a[k]
    const ost = a.slice(0, k).reduce((s, x, j) => s + x * b[j], 0);
    if (ost % a[k] !== 0) return null;
    const t = -ost / a[k];
    const bz = b.slice(0, k).concat(["t"]);
    return stevilo({ tezavnost: 2, vrednost: t, besedilo: `Za katero vrednost \\(t\\) sta vektorja \\(\\vec{a} = ${vec(a)}\\) in \\(\\vec{b} = ${vec(bz)}\\) pravokotna?`, rezultat: `\\(t = ${t}\\)`, postopek: `<p>Vektorja sta pravokotna, ko je skalarni produkt 0: \\(${a.slice(0, k).map((x, j) => `${okl(x)} \\cdot ${okl(b[j])}`).join(" + ")} + ${okl(a[k])}t = 0\\).</p><p>\\(${ost} + ${okl(a[k])}t = 0\\), \\(t = ${t}\\)</p>` });
  });
  serija("kolinearnost", 4, (r) => {
    const a = [r.nenic(-5, 5), r.nenic(-5, 5)], k = r.nenic(-3, 3);
    const t = a[1] * k;
    return stevilo({ tezavnost: 3, vrednost: t, besedilo: `Za katero vrednost \\(t\\) sta vektorja \\(\\vec{a} = ${vec(a)}\\) in \\(\\vec{b} = ${vec([a[0] * k, "t"])}\\) kolinearna?`, rezultat: `\\(t = ${t}\\)`, postopek: `<p>Kolinearna sta, ko je \\(\\vec{b} = k\\vec{a}\\). Iz prve komponente: \\(${a[0] * k} = k \\cdot ${okl(a[0])}\\), \\(k = ${k}\\).</p><p>\\(t = ${k} \\cdot ${okl(a[1])} = ${t}\\)</p>` });
  });
  serija("razpolovisce", 6, (r, i) => {
    const A = rv(r, 2), B = rv(r, 2), C = rv(r, 2);
    if (i % 2 === 0) {
      if ((A[0] + B[0]) % 2 || (A[1] + B[1]) % 2) return null;
      const S = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      return stevilo({ tezavnost: 1, vrednost: S[1], besedilo: `Kolikšna je \\(y\\)-koordinata razpolovišča daljice \\(AB\\), \\(A${vec(A)}\\), \\(B${vec(B)}\\)?`, rezultat: `\\(S${vec(S)}\\)`, postopek: `<p>\\(\\vec{r}_S = \\frac{\\vec{r}_A + \\vec{r}_B}{2} = ${vec(S)}\\)</p>` });
    }
    const D = [A[0] + C[0] - B[0], A[1] + C[1] - B[1]];
    return stevilo({ tezavnost: 2, vrednost: D[0], besedilo: `Točke \\(A${vec(A)}\\), \\(B${vec(B)}\\) in \\(C${vec(C)}\\) so zaporedna oglišča paralelograma \\(ABCD\\). Kolikšna je \\(x\\)-koordinata oglišča \\(D\\)?`, rezultat: `\\(D${vec(D)}\\)`, postopek: `<p>V paralelogramu je \\(\\overrightarrow{AD} = \\overrightarrow{BC}\\), zato \\(\\vec{r}_D = \\vec{r}_A + \\vec{r}_C - \\vec{r}_B = ${vec(D)}\\).</p>` });
  });
  serija("projekcija", 4, (r) => {
    const a = rv(r, 2), b = r.izberi([[3, 4], [0, 5], [6, 8], [5, 12]]);
    const p = skal(a, b) / dolz(b);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(p, 4), toleranca: 0.01, besedilo: `Izračunaj (predznačeno) dolžino pravokotne projekcije vektorja \\(\\vec{a} = ${vec(a)}\\) na vektor \\(\\vec{b} = ${vec(b)}\\).`, rezultat: `${T(p, 2)}`, postopek: `<p>\\(a_b = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|} = \\frac{${skal(a, b)}}{${dolz(b)}} = ${L(p)}\\)</p>` });
  });
  serija("ploscina", 5, (r) => {
    const A = rv(r, 2), B = rv(r, 2), C = rv(r, 2);
    const u = [B[0] - A[0], B[1] - A[1]], v = [C[0] - A[0], C[1] - A[1]];
    const d = u[0] * v[1] - u[1] * v[0];
    if (!d) return null;
    return stevilo({ tezavnost: 3, vrednost: Math.abs(d) / 2, enota: "enot²", besedilo: `Izračunaj ploščino trikotnika z oglišči \\(A${vec(A)}\\), \\(B${vec(B)}\\), \\(C${vec(C)}\\).`, rezultat: `${T(Math.abs(d) / 2)}`, postopek: `<p>\\(\\overrightarrow{AB} = ${vec(u)}\\), \\(\\overrightarrow{AC} = ${vec(v)}\\).</p><p>\\(P = \\frac12 |${u[0]} \\cdot ${okl(v[1])} - ${okl(u[1])} \\cdot ${okl(v[0])}| = \\frac12 \\cdot ${Math.abs(d)} = ${L(Math.abs(d) / 2)}\\)</p>` });
  });
  const pojmi = [
    ["Kdaj sta dva vektorja enaka?", "Ko imata enako dolžino, smer in usmerjenost.", ["Ko imata enako dolžino.", "Ko imata enako začetno točko.", "Ko ležita na isti premici."]],
    ["Kaj je \\(\\overrightarrow{AB} + \\overrightarrow{BC}\\)?", "\\(\\overrightarrow{AC}\\)", ["\\(\\overrightarrow{CA}\\)", "\\(\\overrightarrow{BA}\\)", "\\(\\vec{0}\\)"]],
    ["V paralelogramu \\(ABCD\\) je \\(\\overrightarrow{AB} = \\vec{a}\\), \\(\\overrightarrow{AD} = \\vec{b}\\). Kaj je \\(\\overrightarrow{BD}\\)?", "\\(\\vec{b} - \\vec{a}\\)", ["\\(\\vec{a} - \\vec{b}\\)", "\\(\\vec{a} + \\vec{b}\\)", "\\(-\\vec{a} - \\vec{b}\\)"]],
    ["\\(S\\) je razpolovišče stranice \\(BC\\) trikotnika \\(ABC\\), \\(\\overrightarrow{AB} = \\vec{a}\\), \\(\\overrightarrow{AC} = \\vec{b}\\). Kaj je \\(\\overrightarrow{AS}\\)?", "\\(\\frac12(\\vec{a} + \\vec{b})\\)", ["\\(\\vec{a} + \\vec{b}\\)", "\\(\\frac12(\\vec{b} - \\vec{a})\\)", "\\(\\vec{a} + \\frac12\\vec{b}\\)"]],
    ["Koliko je \\(\\vec{a} \\cdot \\vec{a}\\)?", "\\(|\\vec{a}|^2\\)", ["\\(|\\vec{a}|\\)", "\\(0\\)", "\\(2|\\vec{a}|\\)"]],
  ];
  serija("pojmi", pojmi.length, (r, i) => {
    const [b, p, n] = pojmi[i];
    return izbira({ tezavnost: i < 2 ? 1 : 2, r, besedilo: b, pravilna: p, napacne: n, postopek: `<p>Pravilno: ${p}. ${i === 2 ? "Od \\(B\\) do \\(D\\) gremo nazaj po \\(\\vec{a}\\) in naprej po \\(\\vec{b}\\)." : i === 3 ? "\\(\\overrightarrow{AS} = \\vec{a} + \\frac12\\overrightarrow{BC} = \\vec{a} + \\frac12(\\vec{b} - \\vec{a})\\)." : ""}</p>` });
  });
  serija("visja", 5, (r, i) => {
    const a = r.int(2, 7), b = r.int(2, 7), k = r.izberi([60, 120, 90]);
    const c = { 60: 0.5, 90: 0, 120: -0.5 }[k];
    if (i % 2 === 0) return stevilo({ tezavnost: 4, raven: "visja", vrednost: a * a - b * b, besedilo: `Za vektorja velja \\(|\\vec{a}| = ${a}\\) in \\(|\\vec{b}| = ${b}\\). Izračunaj \\((\\vec{a} + \\vec{b}) \\cdot (\\vec{a} - \\vec{b})\\).`, rezultat: `\\(${a * a - b * b}\\)`, postopek: `<p>\\((\\vec{a} + \\vec{b}) \\cdot (\\vec{a} - \\vec{b}) = \\vec{a}^2 - \\vec{b}^2 = ${a * a} - ${b * b} = ${a * a - b * b}\\) (mešana člena se odštejeta).</p>` });
    const d = Math.sqrt(a * a + b * b + 2 * a * b * c);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(d, 4), toleranca: 0.01, besedilo: `Vektorja z dolžinama \\(|\\vec{a}| = ${a}\\) in \\(|\\vec{b}| = ${b}\\) oklepata kot ${k}°. Izračunaj \\(|\\vec{a} + \\vec{b}|\\) na dve decimalki.`, rezultat: `${T(d, 2)}`, postopek: `<p>\\(|\\vec{a} + \\vec{b}|^2 = \\vec{a}^2 + 2\\vec{a}\\cdot\\vec{b} + \\vec{b}^2 = ${a * a} + 2 \\cdot ${a} \\cdot ${b} \\cdot ${L(c)} + ${b * b} = ${L(d * d)}\\)</p><p>\\(|\\vec{a} + \\vec{b}| \\approx ${L(d)}\\)</p>` });
  });
}
