import { T } from "../lib.mjs";
const x = String.raw, k = 9e9;
const E = k * 4e-9 / 0.03 ** 2 + k * 4e-9 / 0.03 ** 2;
export default [
  { t: 4, b: x`Točkasta naboja \(+4\ \mathrm{nC}\) in \(-4\ \mathrm{nC}\) sta \(6\ \mathrm{cm}\) narazen. Kolikšna je jakost električnega polja na sredini med njima? (\(k = 9 \cdot 10^9\ \mathrm{Nm^2/C^2}\); v kN/C.)`, v: E / 1000, enota: "kN/C",
    rez: x`\(E = 80\ \mathrm{kN/C}\)`, post: x`<p>Vsak naboj ustvari na sredini \(E_1 = \frac{kq}{r^2} = \frac{9 \cdot 10^9 \cdot 4 \cdot 10^{-9}}{0{,}03^2} = 40\ \mathrm{kN/C}\). Obe polji kažeta proti negativnemu naboju in se seštejeta.</p><p>\(E = 80\ \mathrm{kN/C}\)</p>` },
  { t: 4, b: x`Naboja \(+q\) in \(+4q\) sta \(30\ \mathrm{cm}\) narazen. Kako daleč od naboja \(+q\) je točka med njima, v kateri je električno polje enako nič? (v cm)`, v: 10, enota: "cm",
    rez: x`\(10\ \mathrm{cm}\)`, post: x`<p>\(\frac{kq}{x^2} = \frac{k \cdot 4q}{(0{,}3 - x)^2}\), \(0{,}3 - x = 2x\), \(x = 0{,}1\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Elektron pospešimo iz mirovanja z napetostjo \(500\ \mathrm{V}\). Kolikšno hitrost doseže? (\(e = 1{,}6 \cdot 10^{-19}\ \mathrm{C}\), \(m_e = 9{,}11 \cdot 10^{-31}\ \mathrm{kg}\); v \(10^6\ \mathrm{m/s}\).)`, v: Math.sqrt((2 * 1.6e-19 * 500) / 9.11e-31) / 1e6, tol: 0.15,
    rez: x`\(v \approx ${T(Math.sqrt((2 * 1.6e-19 * 500) / 9.11e-31) / 1e6, 1)} \cdot 10^6\ \mathrm{m/s}\)`, post: x`<p>\(eU = \frac12 m v^2\), \(v = \sqrt{\frac{2eU}{m}} = \sqrt{\frac{2 \cdot 1{,}6 \cdot 10^{-19} \cdot 500}{9{,}11 \cdot 10^{-31}}} \approx 1{,}33 \cdot 10^7\ \mathrm{m/s}\)</p>` },
  { t: 4, raven: "visja", b: x`Ploščati kondenzator s kapaciteto \(2\ \mathrm{\mu F}\) nabijemo na \(100\ \mathrm{V}\) in ga odklopimo od vira. Nato razmik med ploščama povečamo na dvakratnik. Kolikšna je nova napetost?`, v: 200, enota: "V",
    rez: x`\(200\ \mathrm{V}\)`, post: x`<p>Kondenzator je odklopljen, zato naboj ostane enak. Kapaciteta \(C = \frac{\varepsilon_0 S}{d}\) se razpolovi.</p><p>\(U = \frac{e}{C}\) se podvoji: \(200\ \mathrm{V}\). (Energija se tudi podvoji, razliko prispeva delo pri razmikanju plošč.)</p>` },
  { t: 4, b: x`Kondenzatorja \(3\ \mathrm{\mu F}\) in \(6\ \mathrm{\mu F}\) sta zaporedno priključena na \(90\ \mathrm{V}\). Kolikšna napetost je na kondenzatorju \(3\ \mathrm{\mu F}\)?`, v: 60, enota: "V",
    rez: x`\(60\ \mathrm{V}\)`, post: x`<p>Zaporedno: \(C = \frac{3 \cdot 6}{9} = 2\ \mathrm{\mu F}\), naboj \(e = CU = 180\ \mathrm{\mu C}\) je na obeh enak.</p><p>\(U_1 = \frac{180}{3} = 60\ \mathrm{V}\) (na drugem \(30\ \mathrm{V}\))</p>` },
];
