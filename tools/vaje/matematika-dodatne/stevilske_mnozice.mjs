const x = String.raw;
export default [
  { t: 4, b: x`Koliko naravnih števil, manjših od \(1000\), je deljivih s \(3\) ali s \(5\), ni pa deljivih s \(7\)?`, v: 400,
    rez: x`\(400\)`, post: x`<p>Deljivih s 3 ali 5: \(333 + 199 - 66 = 466\).</p><p>Od teh so deljiva s 7 tista, deljiva z \(21\) ali \(35\): \(47 + 28 - 9 = 66\) (\(9\) jih je deljivih z \(105\)).</p><p>\(466 - 66 = 400\)</p>` },
  { t: 4, b: x`Katera je zadnja števka števila \(7^{2026}\)?`, v: 9,
    rez: x`\(9\)`, post: x`<p>Zadnje števke potenc števila 7 se ponavljajo s periodo 4: \(7, 9, 3, 1, 7, 9, \ldots\)</p><p>\(2026 = 4 \cdot 506 + 2\), zato je zadnja števka enaka kot pri \(7^2 = 49\): \(9\).</p>` },
  { t: 4, b: x`Kolikšen je ostanek pri deljenju števila \(2^{100}\) s \(7\)?`, v: 2,
    rez: x`\(2\)`, post: x`<p>\(2^3 = 8\) da ostanek \(1\). \(100 = 3 \cdot 33 + 1\), zato \(2^{100} = (2^3)^{33} \cdot 2\) da ostanek \(1^{33} \cdot 2 = 2\).</p>` },
  { t: 4, b: x`Izračunaj imaginarni del števila \((1 + i)^{10}\).`, v: 32,
    rez: x`\(\operatorname{Im}(1 + i)^{10} = 32\)`, post: x`<p>\((1 + i)^2 = 1 + 2i + i^2 = 2i\).</p><p>\((1 + i)^{10} = (2i)^5 = 32 i^5 = 32i\), imaginarni del je \(32\).</p>` },
  { t: 4, b: x`Kompleksno število \(z\) zadošča enačbi \(z + 2\bar{z} = 6 - 3i\). Izračunaj \(|z|^2\).`, v: 13,
    rez: x`\(|z|^2 = 13\)`, post: x`<p>Naj bo \(z = a + bi\). Potem \(a + bi + 2a - 2bi = 3a - bi = 6 - 3i\).</p><p>\(a = 2\), \(b = 3\), \(|z|^2 = 4 + 9 = 13\).</p>` },
  { t: 4, b: x`Zapiši periodično decimalno število \(0{,}1\overline{36}\) z okrajšanim ulomkom.`, v: 3 / 22, tol: 1e-9, namig: "Ulomek vpiši kot 5/11.",
    rez: x`\(\frac{3}{22}\)`, post: x`<p>\(x = 0{,}1363636\ldots\) Potem \(1000x = 136{,}3636\ldots\) in \(10x = 1{,}3636\ldots\)</p><p>\(990x = 135\), \(x = \frac{135}{990} = \frac{3}{22}\).</p>` },
  { t: 4, b: x`Koliko je urejenih parov naravnih števil \((a, b)\), \(a < b\), za katere velja \(D(a, b) = 6\) in \(v(a, b) = 180\)?`, v: 4,
    rez: x`\(4\)`, post: x`<p>Pišemo \(a = 6m\), \(b = 6n\), kjer sta \(m\) in \(n\) tuji si števili. Potem \(v(a, b) = 6mn = 180\), torej \(mn = 30\).</p><p>Tuja para z \(m < n\): \((1, 30), (2, 15), (3, 10), (5, 6)\). Ustrezni pari so \((6, 180), (12, 90), (18, 60), (30, 36)\), torej \(4\).</p>` },
  { t: 4, b: x`Izračunaj \(i + i^2 + i^3 + \ldots + i^{2027}\).`, v: -1,
    rez: x`\(-1\)`, post: x`<p>Vsaki štirje zaporedni členi dajo \(i - 1 - i + 1 = 0\).</p><p>\(2027 = 4 \cdot 506 + 3\), zato ostanejo prvi trije členi zadnje četvorke: \(i + i^2 + i^3 = i - 1 - i = -1\).</p>` },
];
