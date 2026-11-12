import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Struna kitare je dolga \(65\ \mathrm{cm}\) in ima osnovno frekvenco \(110\ \mathrm{Hz}\). Kolikšna je hitrost valovanja na struni?`, v: 2 * 0.65 * 110, enota: "m/s",
    rez: x`\(c = 143\ \mathrm{m/s}\)`, post: x`<p>Pri osnovnem nihanju je na struni polovica valovne dolžine: \(\lambda = 2l = 1{,}3\ \mathrm{m}\).</p><p>\(c = \lambda\nu = 1{,}3 \cdot 110 = 143\ \mathrm{m/s}\)</p>` },
  { t: 4, b: x`Struna z osnovno frekvenco \(110\ \mathrm{Hz}\) je napeta s silo \(80\ \mathrm{N}\). S kolikšno silo jo moramo napeti, da bo imela osnovno frekvenco \(165\ \mathrm{Hz}\)?`, v: 80 * (165 / 110) ** 2, enota: "N",
    rez: x`\(F = 180\ \mathrm{N}\)`, post: x`<p>\(c = \sqrt{F/\mu}\) in \(\nu = \frac{c}{2l}\), zato \(\nu \propto \sqrt F\).</p><p>\(F_2 = 80 \cdot \left(\frac{165}{110}\right)^2 = 80 \cdot 2{,}25 = 180\ \mathrm{N}\)</p>` },
  { t: 4, b: x`Rešilni avto s sireno \(700\ \mathrm{Hz}\) se nam približuje s hitrostjo \(30\ \mathrm{m/s}\). Kolikšno frekvenco slišimo? (Hitrost zvoka \(340\ \mathrm{m/s}\).)`, v: 700 * 340 / 310, enota: "Hz",
    rez: x`\(\nu' \approx ${T(700 * 340 / 310, 0)}\ \mathrm{Hz}\)`, post: x`<p>Dopplerjev pojav, izvir se približuje: \(\nu' = \nu\frac{c}{c - v} = 700 \cdot \frac{340}{310} \approx 768\ \mathrm{Hz}\)</p>` },
  { t: 4, b: x`Za koliko decibelov se poveča raven hrupa, če namesto enega hkrati igra \(10\) enakih trobent?`, v: 10, enota: "dB",
    rez: x`za \(10\ \mathrm{dB}\)`, post: x`<p>Gostota energijskega toka se poveča 10-krat. \(\Delta L = 10\log\frac{j_2}{j_1} = 10\log 10 = 10\ \mathrm{dB}\)</p>` },
  { t: 4, b: x`Na eni strani zaprta cev (orgelska piščal) je dolga \(85\ \mathrm{cm}\). Kolikšna je frekvenca drugega lastnega nihanja (prvega višjega tona)? (Hitrost zvoka \(340\ \mathrm{m/s}\).)`, v: (3 * 340) / (4 * 0.85), enota: "Hz",
    rez: x`\(\nu_2 = 300\ \mathrm{Hz}\)`, post: x`<p>Zaprta cev ima le lihe večkratnike osnovne frekvence: \(\nu_n = (2n - 1)\frac{c}{4l}\).</p><p>Osnovna: \(\frac{340}{3{,}4} = 100\ \mathrm{Hz}\), naslednja \(3 \cdot 100 = 300\ \mathrm{Hz}\)</p>` },
  { t: 4, raven: "visja", b: x`Svetloba z valovno dolžino \(600\ \mathrm{nm}\) pade pravokotno na uklonsko mrežico s \(500\) režami na milimeter. Koliko ojačitev (vključno z ničtim redom) lahko največ vidimo?`, v: 7,
    rez: x`\(7\) (redi od \(-3\) do \(3\))`, post: x`<p>\(d = \frac{1}{500}\ \mathrm{mm} = 2\ \mathrm{\mu m}\). \(d\sin\varphi = N\lambda\), \(\sin\varphi \le 1\): \(N \le \frac{2000}{600} = 3{,}33\).</p><p>Redi \(0, \pm1, \pm2, \pm3\): skupaj \(7\).</p>` },
];
