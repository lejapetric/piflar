import { T } from "../lib.mjs";
const x = String.raw, h = 6.63e-34, c = 3e8, e = 1.6e-19, me = 9.11e-31;
const Ef = (h * c) / 400e-9 / e;
export default [
  { t: 4, b: x`Na cezij z izstopnim delom \(2{,}1\ \mathrm{eV}\) posvetimo s svetlobo valovne dolžine \(400\ \mathrm{nm}\). Kolikšna je največja kinetična energija izbitih elektronov? (\(h = 6{,}63 \cdot 10^{-34}\ \mathrm{Js}\), \(c = 3 \cdot 10^8\ \mathrm{m/s}\), \(e = 1{,}6 \cdot 10^{-19}\ \mathrm{C}\); v eV.)`, v: Ef - 2.1, enota: "eV",
    rez: x`\(W_k \approx ${T(Ef - 2.1, 2)}\ \mathrm{eV}\)`, post: x`<p>Energija fotona: \(\frac{hc}{\lambda} = \frac{6{,}63 \cdot 10^{-34} \cdot 3 \cdot 10^8}{4 \cdot 10^{-7}} \approx ${T(Ef, 2)}\ \mathrm{eV}\).</p><p>\(W_k = h\nu - A_i \approx ${T(Ef - 2.1, 2)}\ \mathrm{eV}\)</p>` },
  { t: 4, b: x`Kolikšna je največja valovna dolžina svetlobe, ki še izbije elektrone iz kovine z izstopnim delom \(2{,}1\ \mathrm{eV}\)? (\(hc = 1240\ \mathrm{eV\,nm}\); v nm.)`, v: 1240 / 2.1, enota: "nm",
    rez: x`\(\lambda_{\max} \approx ${T(1240 / 2.1, 0)}\ \mathrm{nm}\)`, post: x`<p>Mejni primer: \(\frac{hc}{\lambda} = A_i\), \(\lambda = \frac{1240}{2{,}1} \approx 590\ \mathrm{nm}\)</p>` },
  { t: 4, b: x`Elektron v vodikovem atomu preskoči iz tretjega v drugo stanje. Kolikšna je valovna dolžina izsevane svetlobe? (Energije \(E_n = -\frac{13{,}6\ \mathrm{eV}}{n^2}\), \(hc = 1240\ \mathrm{eV\,nm}\); v nm.)`, v: 1240 / (13.6 * (1 / 4 - 1 / 9)), enota: "nm",
    rez: x`\(\lambda \approx ${T(1240 / (13.6 * (1 / 4 - 1 / 9)), 0)}\ \mathrm{nm}\) (rdeča črta H\(_\alpha\))`, post: x`<p>\(\Delta E = 13{,}6\left(\frac14 - \frac19\right) \approx 1{,}89\ \mathrm{eV}\).</p><p>\(\lambda = \frac{1240}{1{,}89} \approx 656\ \mathrm{nm}\)</p>` },
  { t: 4, raven: "visja", b: x`Kolikšna je de Brogliejeva valovna dolžina elektrona, pospešenega z napetostjo \(150\ \mathrm{V}\)? (\(h = 6{,}63 \cdot 10^{-34}\ \mathrm{Js}\), \(m_e = 9{,}11 \cdot 10^{-31}\ \mathrm{kg}\), \(e = 1{,}6 \cdot 10^{-19}\ \mathrm{C}\); v nm.)`, v: (h / Math.sqrt(2 * me * e * 150)) * 1e9, enota: "nm",
    rez: x`\(\lambda \approx ${T((h / Math.sqrt(2 * me * e * 150)) * 1e9, 3)}\ \mathrm{nm}\)`, post: x`<p>\(p = \sqrt{2m eU}\), \(\lambda = \frac{h}{p} = \frac{6{,}63 \cdot 10^{-34}}{\sqrt{2 \cdot 9{,}11 \cdot 10^{-31} \cdot 1{,}6 \cdot 10^{-19} \cdot 150}} \approx 0{,}1\ \mathrm{nm}\)</p>` },
  { t: 4, b: x`Koliko različnih spektralnih črt lahko izseva množica vodikovih atomov, vzbujenih v četrto stanje (\(n = 4\))?`, v: 6,
    rez: x`\(6\)`, post: x`<p>Možni preskoki so med vsakim parom stanj \(1, 2, 3, 4\): \(\binom42 = 6\) (4→3, 4→2, 4→1, 3→2, 3→1, 2→1).</p>` },
];
