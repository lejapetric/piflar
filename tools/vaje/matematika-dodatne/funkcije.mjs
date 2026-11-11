const x = String.raw;
export default [
  { t: 4, b: x`Reši enačbo \(\log_2(x - 1) + \log_2(x + 1) = 3\).`, v: 3,
    rez: x`\(x = 3\)`, post: x`<p>Pogoj: \(x > 1\). \(\log_2\big((x - 1)(x + 1)\big) = 3\), \(x^2 - 1 = 8\), \(x = \pm 3\).</p><p>Pogoju ustreza le \(x = 3\).</p>` },
  { t: 4, b: x`Koliko realnih rešitev ima enačba \(|x^2 - 4| = 3\)?`, v: 4,
    rez: x`\(4\)`, post: x`<p>\(x^2 - 4 = 3\) da \(x = \pm\sqrt7\), \(x^2 - 4 = -3\) da \(x = \pm 1\).</p><p>Skupaj \(4\) rešitve.</p>` },
  { t: 4, b: x`Za funkcijo \(f(x) = \dfrac{2x + 1}{x - 3}\) izračunaj \(f^{-1}(5)\).`, v: 16 / 3, tol: 1e-6, namig: "Ulomek vpiši kot 7/2.",
    rez: x`\(f^{-1}(5) = \frac{16}{3}\)`, post: x`<p>Iščemo \(x\), za katerega je \(f(x) = 5\): \(2x + 1 = 5x - 15\), \(x = \frac{16}{3}\).</p>` },
  { t: 4, b: x`Koliko rešitev ima enačba \(2\sin^2 x - 3\sin x + 1 = 0\) na intervalu \([0, 2\pi)\)?`, v: 3,
    rez: x`\(x \in \left\{\frac{\pi}{6}, \frac{\pi}{2}, \frac{5\pi}{6}\right\}\)`, post: x`<p>Uvedemo \(t = \sin x\): \(2t^2 - 3t + 1 = 0\), \(t = 1\) ali \(t = \frac12\).</p><p>\(\sin x = 1\): \(\frac{\pi}{2}\). \(\sin x = \frac12\): \(\frac{\pi}{6}\), \(\frac{5\pi}{6}\). Skupaj \(3\).</p>` },
  { t: 4, b: x`Za katere \(x\) je \(x^3 - 6x^2 + 11x - 6 > 0\)?`,
    p: x`\(x \in (1, 2) \cup (3, \infty)\)`, n: [x`\(x \in (-\infty, 1) \cup (2, 3)\)`, x`\(x \in (1, 3)\)`, x`\(x \in (3, \infty)\)`],
    post: x`<p>\(p(1) = 0\), razcep \(p(x) = (x - 1)(x - 2)(x - 3)\). Vodilni koeficient je pozitiven, vse ničle so enojne.</p><p>Desno od \(3\) je \(p > 0\), nato se predznak menja: \((2, 3)\) −, \((1, 2)\) +, \((-\infty, 1)\) −.</p>` },
  { t: 4, raven: "visja", b: x`Katera trditev o funkciji \(f(x) = \dfrac{x^2 - 4}{x^2 - x - 2}\) drži?`,
    p: x`ima pol pri \(x = -1\), pri \(x = 2\) ni definirana, vodoravna asimptota je \(y = 1\)`, n: [x`ima pola pri \(x = -1\) in \(x = 2\), vodoravna asimptota je \(y = 1\)`, x`ima pol pri \(x = 2\), ničli pri \(x = \pm 2\)`, x`ima pol pri \(x = -1\), ničli pri \(x = \pm 2\), asimptota \(y = 0\)`],
    post: x`<p>\(f(x) = \frac{(x - 2)(x + 2)}{(x - 2)(x + 1)}\). Faktor \(x - 2\) se okrajša, zato pri \(x = 2\) ni pola, le definirana ni (luknja v grafu). Pol je pri \(x = -1\), ničla le \(x = -2\).</p><p>Števec in imenovalec imata isto stopnjo, asimptota \(y = \frac11 = 1\).</p>` },
];
