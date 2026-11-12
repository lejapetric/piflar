import { T } from "../lib.mjs";
const x = String.raw, g = 9.81;
const vk = (0.01 + 2) * Math.sqrt(2 * g * 0.2) / 0.01;
export default [
  { t: 4, b: x`Krogla z maso \(10\ \mathrm{g}\) prileti vodoravno v leseno klado z maso \(2\ \mathrm{kg}\), ki visi na vrvici, in obtiči v njej. Klada se dvigne za \(20\ \mathrm{cm}\). Kolikšna je bila hitrost krogle? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: vk, enota: "m/s",
    rez: x`\(v \approx ${T(vk, 0)}\ \mathrm{m/s}\)`, post: x`<p>Po trku se kinetična energija ohrani v potencialno: \(V = \sqrt{2gh} = \sqrt{2 \cdot 9{,}81 \cdot 0{,}2} \approx 1{,}98\ \mathrm{m/s}\).</p><p>Trk je neprožen, ohrani se gibalna količina: \(mv = (m + M)V\), \(v = \frac{2{,}01}{0{,}01} \cdot 1{,}98 \approx ${T(vk, 0)}\ \mathrm{m/s}\)</p>` },
  { t: 4, b: x`Kroglica z maso \(2\ \mathrm{kg}\) in hitrostjo \(6\ \mathrm{m/s}\) čelno prožno trči v mirujočo kroglico z maso \(4\ \mathrm{kg}\). Kolikšna je hitrost druge kroglice po trku?`, v: 4, enota: "m/s",
    rez: x`\(v_2' = 4\ \mathrm{m/s}\)`, post: x`<p>Pri čelnem prožnem trku z mirujočim telesom: \(v_2' = \frac{2m_1}{m_1 + m_2}v_1 = \frac{4}{6} \cdot 6 = 4\ \mathrm{m/s}\).</p><p>(Prva kroglica se odbije nazaj s hitrostjo \(\frac{m_1 - m_2}{m_1 + m_2}v_1 = -2\ \mathrm{m/s}\).)</p>` },
  { t: 4, b: x`Kroglica z maso \(2\ \mathrm{kg}\) in hitrostjo \(6\ \mathrm{m/s}\) čelno prožno trči v mirujočo kroglico z maso \(4\ \mathrm{kg}\). Kolikšen delež svoje kinetične energije prva kroglica preda drugi? (V odstotkih.)`, v: 100 * (0.5 * 4 * 16) / (0.5 * 2 * 36), enota: "%",
    rez: x`\(\approx ${T(100 * 32 / 36, 1)}\,\%\)`, post: x`<p>Po trku: \(v_2' = 4\ \mathrm{m/s}\). \(W_2 = \frac12 \cdot 4 \cdot 16 = 32\ \mathrm{J}\), začetna \(W_1 = \frac12 \cdot 2 \cdot 36 = 36\ \mathrm{J}\).</p><p>Delež \(\frac{32}{36} \approx 88{,}9\,\%\)</p>` },
  { t: 4, b: x`Topničar z maso \(60\ \mathrm{kg}\) stoji na mirujočem vozičku z maso \(40\ \mathrm{kg}\) (brez trenja) in vrže vodoravno kamen z maso \(5\ \mathrm{kg}\) s hitrostjo \(10\ \mathrm{m/s}\) glede na tla. Nato vrže v isto smer še en enak kamen z enako hitrostjo glede na tla. Kolikšna je končna hitrost vozička s človekom?`, v: 100 / 100, enota: "m/s",
    rez: x`\(1\ \mathrm{m/s}\) v nasprotno smer`, post: x`<p>Skupna gibalna količina ostane nič. Obe kamni skupaj odneseta \(2 \cdot 5 \cdot 10 = 100\ \mathrm{kg\,m/s}\).</p><p>Voziček s človekom (\(100\ \mathrm{kg}\)) ima \(v = \frac{100}{100} = 1\ \mathrm{m/s}\) v nasprotni smeri.</p>` },
  { t: 4, raven: "visja", b: x`Granata, ki leti vodoravno s hitrostjo \(20\ \mathrm{m/s}\), razpade na dva enaka dela. En del pade navpično navzdol z začetno hitrostjo \(0\) (trenutno miruje). Kolikšna je hitrost drugega dela?`, v: 40, enota: "m/s",
    rez: x`\(40\ \mathrm{m/s}\) v smeri prvotnega gibanja`, post: x`<p>\(mv = \frac{m}{2} \cdot 0 + \frac{m}{2}v_2\), \(v_2 = 2v = 40\ \mathrm{m/s}\)</p>` },
];
