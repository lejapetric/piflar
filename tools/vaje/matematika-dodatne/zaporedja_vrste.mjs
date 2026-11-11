const x = String.raw;
export default [
  { t: 1, b: x`Aritmetično zaporedje ima \(a_1 = 3\) in \(d = 2\). Koliko je \(a_4\)?`, v: 9, rez: x`\(a_4 = 9\)`, post: x`<p>\(a_4 = a_1 + 3d = 3 + 6 = 9\)</p>` },
  { t: 1, b: x`Kateri je naslednji člen zaporedja \(2, 6, 18, \ldots\)?`, v: 54, rez: x`\(54\)`, post: x`<p>Vsak člen je trikratnik prejšnjega (\(q = 3\)): \(18 \cdot 3 = 54\).</p>` },
  { t: 1, b: x`Ali je zaporedje \(5, 10, 15, 20, \ldots\) aritmetično?`, p: "Da", n: ["Ne"], post: x`<p>Razlika zaporednih členov je vedno \(5\).</p>` },
  { t: 4, b: x`Izračunaj vsoto neskončne vrste \(1 + \frac23 + \frac49 + \frac{8}{27} + \ldots\)`, v: 3,
    rez: x`\(3\)`, post: x`<p>Geometrijska vrsta z \(a_1 = 1\) in \(q = \frac23\), \(|q| < 1\).</p><p>\(s = \frac{1}{1 - \frac23} = 3\)</p>` },
  { t: 4, b: x`V naraščajočem aritmetičnem zaporedju je \(a_3 + a_7 = 20\) in \(a_2 \cdot a_8 = 64\). Določi \(a_1\).`, v: 2,
    rez: x`\(a_1 = 2\)`, post: x`<p>\(a_3 + a_7 = 2a_5 = 20\), \(a_5 = 10\). \(a_2 a_8 = (10 - 3d)(10 + 3d) = 100 - 9d^2 = 64\), \(d^2 = 4\), \(d = 2\).</p><p>\(a_1 = a_5 - 4d = 2\)</p>` },
  { t: 4, b: x`Prvi trije členi naraščajočega geometrijskega zaporedja imajo vsoto \(26\) in produkt \(216\). Izračunaj vsoto prvih petih členov.`, v: 242,
    rez: x`\(s_5 = 242\)`, post: x`<p>\(a_1 a_2 a_3 = a_2^3 = 216\), \(a_2 = 6\). Potem \(a_1 + a_3 = 20\) in \(a_1 a_3 = 36\): \(a_1 = 2\), \(a_3 = 18\), \(q = 3\).</p><p>\(s_5 = 2 \cdot \frac{3^5 - 1}{3 - 1} = 242\)</p>` },
  { t: 4, raven: "visja", b: x`Izračunaj vsoto vrste \(\displaystyle\sum_{n=0}^{\infty} \frac{(x - 1)^n}{2^n}\) pri \(x = 2\).`, v: 2,
    rez: x`\(2\)`, post: x`<p>Pri \(x = 2\) je \(q = \frac{1}{2}\), vrsta konvergira (velja za \(|x - 1| < 2\)).</p><p>\(s = \frac{1}{1 - \frac12} = 2\)</p>` },
  { t: 4, b: x`Izračunaj vsoto vseh dvomestnih števil, ki dajo pri deljenju s \(7\) ostanek \(3\).`, v: 676,
    rez: x`\(676\)`, post: x`<p>To so \(10, 17, \ldots, 94\): aritmetično zaporedje z \(d = 7\), \(n = \frac{94 - 10}{7} + 1 = 13\).</p><p>\(s_{13} = \frac{13(10 + 94)}{2} = 676\)</p>` },
  { t: 4, b: x`Zaporedje je podano rekurzivno: \(a_1 = 1\), \(a_{n+1} = 2a_n + 1\). Izračunaj \(a_{10}\).`, v: 1023,
    rez: x`\(a_{10} = 1023\)`, post: x`<p>Prvi členi: \(1, 3, 7, 15, \ldots\) Opazimo \(a_n = 2^n - 1\) (\(a_n + 1\) se vsakič podvoji).</p><p>\(a_{10} = 2^{10} - 1 = 1023\)</p>` },
];
