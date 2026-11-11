const x = String.raw;
export default [
  { t: 1, b: x`Kolikšen je polmer krožnice \(x^2 + y^2 = 49\)?`, v: 7, rez: x`\(r = 7\)`, post: x`<p>\(r^2 = 49\), \(r = 7\)</p>` },
  { t: 1, b: x`Določi abscisno koordinato središča krožnice \((x - 3)^2 + (y + 2)^2 = 16\).`, v: 3, rez: x`\(S(3, -2)\)`, post: x`<p>Enačba \((x - p)^2 + (y - q)^2 = r^2\) ima središče \(S(p, q)\): \(p = 3\), \(q = -2\).</p>` },
  { t: 1, b: x`Ali točka \((3, 4)\) leži na krožnici \(x^2 + y^2 = 25\)?`, p: "Da", n: ["Ne"], post: x`<p>\(3^2 + 4^2 = 25\), enačba velja.</p>` },
  { t: 1, b: x`Katero krivuljo opisuje enačba \(\dfrac{x^2}{4} + \dfrac{y^2}{9} = 1\)?`, p: "elipso", n: ["hiperbolo", "parabolo", "krožnico"], post: x`<p>Vsota dveh kvadratov s pozitivnima, različnima imenovalcema in \(= 1\) je elipsa.</p>` },
  { t: 4, b: x`Premica \(y = kx + 5\) je tangenta krožnice \(x^2 + y^2 = 5\). Določi pozitivno vrednost \(k\).`, v: 2,
    rez: x`\(k = 2\)`, post: x`<p>Razdalja središča \((0, 0)\) od premice \(kx - y + 5 = 0\) mora biti enaka polmeru: \(\frac{5}{\sqrt{k^2 + 1}} = \sqrt5\).</p><p>\(k^2 + 1 = 5\), \(k = \pm 2\); pozitivna je \(k = 2\).</p>` },
  { t: 4, raven: "visja", b: x`Premica \(y = x\) seka elipso \(\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1\) v dveh točkah. Izračunaj dolžino tetive (na dve decimalki).`, v: 30 * Math.SQRT2 / Math.sqrt(34), tol: 0.006,
    rez: x`\(\approx 7{,}28\)`, post: x`<p>Vstavimo \(y = x\): \(x^2\left(\frac{1}{25} + \frac19\right) = 1\), \(x^2 = \frac{225}{34}\), \(x = \pm\frac{15}{\sqrt{34}}\).</p><p>Tetiva je diagonala med \((x, x)\) in \((-x, -x)\): \(2\sqrt2 \cdot \frac{15}{\sqrt{34}} \approx 7{,}28\)</p>` },
  { t: 4, raven: "visja", b: x`Izračunaj numerično ekscentričnost hiperbole \(\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1\).`, v: 1.25, tol: 1e-6,
    rez: x`\(\varepsilon = \frac54\)`, post: x`<p>\(e^2 = a^2 + b^2 = 16 + 9 = 25\), \(e = 5\).</p><p>\(\varepsilon = \frac{e}{a} = \frac54 = 1{,}25\)</p>` },
  { t: 4, b: x`Točka \(T\) leži na paraboli \(y^2 = 8x\) in ima absciso \(6\). Kolikšna je razdalja točke \(T\) od gorišča parabole?`, v: 8,
    rez: x`\(8\)`, post: x`<p>\(y^2 = 2px\) da \(p = 4\), gorišče \(G(2, 0)\), vodnica \(x = -2\).</p><p>Razdalja do gorišča je enaka razdalji do vodnice: \(6 - (-2) = 8\).</p>` },
];
