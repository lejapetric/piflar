import { T } from "../lib.mjs";
const x = String.raw, g = 9.81, G = 6.67e-11, M = 5.97e24, R = 6.37e6;
const a = ((5 - 3) * g) / 8, F = (2 * 5 * 3 * g) / 8;
const hGeo = Math.cbrt((G * M * 86164 ** 2) / (4 * Math.PI ** 2)) - R;
export default [
  { t: 4, b: x`Čez lahek škripec je napeljana vrvica, na koncih visita uteži z masama \(5\ \mathrm{kg}\) in \(3\ \mathrm{kg}\). Kolikšna je sila v vrvici, ko se uteži gibljeta? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: F, enota: "N",
    rez: x`\(F \approx ${T(F, 1)}\ \mathrm{N}\)`, post: x`<p>Pospešek: \(a = \frac{(m_1 - m_2)g}{m_1 + m_2} = \frac{2 \cdot 9{,}81}{8} \approx ${T(a, 2)}\ \mathrm{m/s^2}\).</p><p>Za lažjo utež: \(F - m_2 g = m_2 a\), \(F = m_2(g + a) = \frac{2m_1m_2g}{m_1 + m_2} \approx ${T(F, 1)}\ \mathrm{N}\)</p>` },
  { t: 4, raven: "visja", b: x`Na kolikšni višini nad površjem Zemlje kroži geostacionarni satelit? (Siderični dan \(86\,164\ \mathrm{s}\), \(M_Z = 5{,}97 \cdot 10^{24}\ \mathrm{kg}\), \(R_Z = 6370\ \mathrm{km}\), \(G = 6{,}67 \cdot 10^{-11}\ \mathrm{Nm^2/kg^2}\); v km.)`, v: hGeo / 1000, enota: "km",
    rez: x`\(h \approx ${T(hGeo / 1000, 0)}\ \mathrm{km}\)`, post: x`<p>Gravitacija je centripetalna sila: \(\frac{GMm}{r^2} = m\frac{4\pi^2}{t_0^2}r\), zato \(r = \sqrt[3]{\frac{GMt_0^2}{4\pi^2}} \approx ${T((hGeo + R) / 1000, 0)}\ \mathrm{km}\).</p><p>\(h = r - R_Z \approx ${T(hGeo / 1000, 0)}\ \mathrm{km}\)</p>` },
];
