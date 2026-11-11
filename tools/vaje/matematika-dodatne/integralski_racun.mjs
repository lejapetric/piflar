const x = String.raw;
export default [
  { t: 1, b: x`Izračunaj \(\displaystyle\int_0^1 2x\,dx\).`, v: 1, rez: x`\(1\)`, post: x`<p>\(\int_0^1 2x\,dx = x^2\Big|_0^1 = 1 - 0 = 1\)</p>` },
  { t: 1, b: x`Kateri je nedoločeni integral \(\displaystyle\int 3\,dx\)?`, p: x`\(3x + C\)`, n: [x`\(3 + C\)`, x`\(\frac{3x^2}{2} + C\)`, x`\(0\)`], post: x`<p>Odvod \(3x + C\) je \(3\).</p>` },
  { t: 1, b: x`Izračunaj \(\displaystyle\int_1^3 1\,dx\).`, v: 2, rez: x`\(2\)`, post: x`<p>\(\int_1^3 1\,dx = x\Big|_1^3 = 3 - 1 = 2\) (ploščina pravokotnika \(2 \times 1\)).</p>` },
  { t: 1, b: x`Kateri je nedoločeni integral \(\displaystyle\int x\,dx\)?`, p: x`\(\frac{x^2}{2} + C\)`, n: [x`\(x^2 + C\)`, x`\(1 + C\)`, x`\(2x^2 + C\)`], post: x`<p>\(\left(\frac{x^2}{2}\right)' = x\)</p>` },
  { t: 1, b: x`Izračunaj \(\displaystyle\int_0^4 5\,dx\).`, v: 20, rez: x`\(20\)`, post: x`<p>\(5x\Big|_0^4 = 20\)</p>` },
  { t: 4, b: x`Izračunaj ploščino lika med parabolo \(y = x^2\) in premico \(y = 2x + 3\) (na dve decimalki).`, v: 32 / 3, tol: 0.006,
    rez: x`\(S = \frac{32}{3} \approx 10{,}67\)`, post: x`<p>Presečišči: \(x^2 = 2x + 3\), \(x = -1\) in \(x = 3\). Med njima je premica nad parabolo.</p><p>\(S = \int_{-1}^{3}(2x + 3 - x^2)\,dx = \left[x^2 + 3x - \frac{x^3}{3}\right]_{-1}^{3} = 9 - \left(-\frac53\right) = \frac{32}{3}\)</p>` },
  { t: 4, raven: "visja", b: x`Lik pod grafom \(y = \sqrt{x}\) na intervalu \([0, 4]\) zavrtimo okoli abscisne osi. Izračunaj prostornino vrtenine (na dve decimalki).`, v: 8 * Math.PI, tol: 0.006,
    rez: x`\(V = 8\pi \approx 25{,}13\)`, post: x`<p>\(V = \pi\int_0^4 (\sqrt x)^2\,dx = \pi\int_0^4 x\,dx = \pi \cdot \frac{16}{2} = 8\pi\)</p>` },
  { t: 4, raven: "visja", b: x`Izračunaj \(\displaystyle\int_0^{\pi/2} \sin x \cos x\,dx\).`, v: 0.5, tol: 1e-6,
    rez: x`\(\frac12\)`, post: x`<p>Uvedemo \(t = \sin x\), \(dt = \cos x\,dx\); meje \(0\) in \(1\).</p><p>\(\int_0^1 t\,dt = \frac12\)</p>` },
];
