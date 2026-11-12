import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Uredi enačbo \(\mathrm{MnO_4^- + Fe^{2+} + H^+ \to Mn^{2+} + Fe^{3+} + H_2O}\). Kolikšen je koeficient pred \(\mathrm{H^+}\)?`, v: 8,
    rez: x`\(\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \to Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}\)`, post: x`<p>Mn: \(+\mathrm{VII} \to +\mathrm{II}\), sprejme 5 e\(^-\); Fe odda 1, zato 5 Fe. Kisike uravnamo z 4 \(\mathrm{H_2O}\), vodike z 8 \(\mathrm{H^+}\).</p>` },
  { t: 4, b: x`Kolikšna je standardna napetost galvanskega člena \(\mathrm{Zn | Zn^{2+} || Cu^{2+} | Cu}\)? (\(E^\circ\): Zn \(-0{,}76\ \mathrm V\), Cu \(+0{,}34\ \mathrm V\))`, v: 1.1, enota: "V",
    rez: x`\(1{,}10\ \mathrm V\)`, post: x`<p>\(E = E_{katoda} - E_{anoda} = 0{,}34 - (-0{,}76) = 1{,}10\ \mathrm V\)</p>` },
  { t: 4, raven: "visja", b: x`Koliko gramov bakra se izloči na katodi pri elektrolizi raztopine \(\mathrm{CuSO_4}\), če \(30\ \mathrm{min}\) teče tok \(2\ \mathrm A\)? (\(F = 96\,500\ \mathrm{C/mol}\), \(M(\mathrm{Cu}) = 63{,}5\ \mathrm{g/mol}\))`, v: (2 * 1800 / 96500 / 2) * 63.5, enota: "g",
    rez: x`\(m \approx ${T((2 * 1800 / 96500 / 2) * 63.5, 2)}\ \mathrm g\)`, post: x`<p>\(Q = It = 3600\ \mathrm C\), \(n(e^-) = \frac{3600}{96\,500} \approx 0{,}0373\ \mathrm{mol}\). \(\mathrm{Cu^{2+} + 2\,e^- \to Cu}\): \(n(\mathrm{Cu}) \approx 0{,}0187\ \mathrm{mol}\).</p><p>\(m \approx 1{,}18\ \mathrm g\)</p>` },
  { t: 4, b: x`Kolikšno je oksidacijsko število žvepla v tiosulfatnem ionu \(\mathrm{S_2O_3^{2-}}\) (povprečno na atom)?`, v: 2,
    rez: x`\(+\mathrm{II}\)`, post: x`<p>\(2x + 3(-2) = -2\), \(x = +2\)</p>` },
];
