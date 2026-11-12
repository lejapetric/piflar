import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Koliko mL koncentrirane žveplove(VI) kisline (\(w = 96\,\%\), \(\rho = 1{,}84\ \mathrm{g/mL}\)) potrebujemo za pripravo \(500\ \mathrm{mL}\) raztopine s koncentracijo \(0{,}5\ \mathrm{mol/L}\)? (\(M = 98\ \mathrm{g/mol}\))`, v: (0.25 * 98) / 0.96 / 1.84, enota: "mL",
    rez: x`\(V \approx ${T((0.25 * 98) / 0.96 / 1.84, 1)}\ \mathrm{mL}\)`, post: x`<p>\(n = 0{,}5 \cdot 0{,}5 = 0{,}25\ \mathrm{mol}\), \(m = 24{,}5\ \mathrm{g}\) čiste kisline.</p><p>Raztopine: \(\frac{24{,}5}{0{,}96} = 25{,}5\ \mathrm{g}\), \(V = \frac{25{,}5}{1{,}84} \approx 13{,}9\ \mathrm{mL}\)</p>` },
  { t: 4, b: x`Zmešamo \(200\ \mathrm{g}\) \(10\)-odstotne in \(300\ \mathrm{g}\) \(25\)-odstotne raztopine soli ter dolijemo \(100\ \mathrm{g}\) vode. Kolikšen je masni delež soli v novi raztopini? (V odstotkih.)`, v: 100 * (20 + 75) / 600, enota: "%",
    rez: x`\(w \approx ${T(100 * 95 / 600, 1)}\,\%\)`, post: x`<p>Soli: \(20 + 75 = 95\ \mathrm{g}\). Raztopine: \(200 + 300 + 100 = 600\ \mathrm{g}\).</p><p>\(w = \frac{95}{600} \approx 15{,}8\,\%\)</p>` },
];
