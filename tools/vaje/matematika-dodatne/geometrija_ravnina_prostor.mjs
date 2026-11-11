const x = String.raw;
export default [
  { t: 4, b: x`Stranice trikotnika so \(a = 7\), \(b = 8\) in \(c = 13\). Koliko stopinj meri kot \(\gamma\)?`, v: 120,
    rez: x`\(\gamma = 120^\circ\)`, post: x`<p>Kosinusni izrek: \(\cos\gamma = \frac{a^2 + b^2 - c^2}{2ab} = \frac{49 + 64 - 169}{112} = -\frac12\).</p><p>\(\gamma = 120^\circ\)</p>` },
  { t: 4, b: x`Stranice trikotnika merijo \(13\), \(14\) in \(15\). Izračunaj polmer trikotniku včrtanega kroga.`, v: 4,
    rez: x`\(r = 4\)`, post: x`<p>Heronov obrazec: \(s = 21\), \(S = \sqrt{21 \cdot 8 \cdot 7 \cdot 6} = 84\).</p><p>\(r = \frac{S}{s} = \frac{84}{21} = 4\)</p>` },
  { t: 4, b: x`Stranice trikotnika merijo \(13\), \(14\) in \(15\). Izračunaj polmer trikotniku očrtanega kroga.`, v: 8.125, tol: 1e-3, namig: "Decimalno število vpiši z vejico.",
    rez: x`\(R = \frac{65}{8} = 8{,}125\)`, post: x`<p>Ploščina po Heronu: \(S = 84\).</p><p>\(R = \frac{abc}{4S} = \frac{13 \cdot 14 \cdot 15}{336} = \frac{2730}{336} = 8{,}125\)</p>` },
  { t: 4, b: x`V krožnici s polmerom \(5\) sta vzporedni tetivi dolžin \(6\) in \(8\), na nasprotnih straneh središča. Kolikšna je razdalja med tetivama?`, v: 7,
    rez: x`\(7\)`, post: x`<p>Razdalja tetive dolžine \(t\) od središča je \(\sqrt{r^2 - (t/2)^2}\): za \(6\) je \(\sqrt{25 - 9} = 4\), za \(8\) je \(\sqrt{25 - 16} = 3\).</p><p>Na nasprotnih straneh: \(4 + 3 = 7\).</p>` },
  { t: 4, b: x`V trikotniku \(ABC\) je \(DE \parallel BC\), \(D\) leži na \(AB\), \(E\) na \(AC\) in \(AD : DB = 2 : 3\). Ploščina trikotnika \(ABC\) je \(50\). Kolikšna je ploščina trapeza \(DBCE\)?`, v: 42,
    rez: x`\(42\)`, post: x`<p>Trikotnika \(ADE\) in \(ABC\) sta podobna s koeficientom \(\frac{AD}{AB} = \frac25\). Razmerje ploščin je \(\left(\frac25\right)^2 = \frac{4}{25}\).</p><p>\(S_{ADE} = 50 \cdot \frac{4}{25} = 8\), trapez: \(50 - 8 = 42\).</p>` },
  { t: 4, b: x`Iz točke \(T\) potegnemo tangenti na krožnico s polmerom \(3\). Razdalja od \(T\) do središča je \(6\). Koliko stopinj meri kot med tangentama?`, v: 60,
    rez: x`\(60^\circ\)`, post: x`<p>Polmer je pravokoten na tangento. V pravokotnem trikotniku \(\sin\frac{\alpha}{2} = \frac{3}{6} = \frac12\), zato \(\frac{\alpha}{2} = 30^\circ\).</p><p>\(\alpha = 60^\circ\)</p>` },
  { t: 4, b: x`V krog s polmerom \(5\) je včrtan pravokotnik z eno stranico dolžine \(6\). Izračunaj ploščino pravokotnika.`, v: 48,
    rez: x`\(48\)`, post: x`<p>Diagonala pravokotnika je premer kroga, \(10\). Druga stranica: \(\sqrt{100 - 36} = 8\).</p><p>\(S = 6 \cdot 8 = 48\)</p>` },
  { t: 4, b: x`V trikotniku je \(a = 10\), \(\alpha = 30^\circ\) in \(\beta = 45^\circ\). Izračunaj stranico \(b\) (na dve decimalki).`, v: 10 * Math.SQRT2, tol: 0.006,
    rez: x`\(b = 10\sqrt2 \approx 14{,}14\)`, post: x`<p>Sinusni izrek: \(\frac{b}{\sin\beta} = \frac{a}{\sin\alpha}\).</p><p>\(b = \frac{10 \cdot \frac{\sqrt2}{2}}{\frac12} = 10\sqrt2 \approx 14{,}14\)</p>` },
];
