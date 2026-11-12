import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Spojina vsebuje \(40{,}0\,\%\) ogljika, \(6{,}7\,\%\) vodika in \(53{,}3\,\%\) kisika (masni deleži). Njena molska masa je \(180\ \mathrm{g/mol}\). Koliko atomov ogljika je v eni molekuli? (\(A_r\): C 12, H 1, O 16)`, v: 6,
    rez: x`\(6\) (molekulska formula \(\mathrm{C_6H_{12}O_6}\))`, post: x`<p>V \(100\ \mathrm{g}\): \(n(\mathrm C) = \frac{40}{12} = 3{,}33\), \(n(\mathrm H) = 6{,}7\), \(n(\mathrm O) = \frac{53{,}3}{16} = 3{,}33\). Razmerje \(1 : 2 : 1\), empirična formula \(\mathrm{CH_2O}\) (\(M = 30\)).</p><p>\(\frac{180}{30} = 6\): \(\mathrm{C_6H_{12}O_6}\)</p>` },
  { t: 4, b: x`Koliko litrov kisika (pri normnih pogojih, \(V_m = 22{,}4\ \mathrm{L/mol}\)) potrebujemo za popolno sežiganje \(11\ \mathrm{g}\) propana \(\mathrm{C_3H_8}\)? (\(M(\mathrm{C_3H_8}) = 44\ \mathrm{g/mol}\))`, v: 0.25 * 5 * 22.4, enota: "L",
    rez: x`\(28\ \mathrm{L}\)`, post: x`<p>\(\mathrm{C_3H_8 + 5\,O_2 \to 3\,CO_2 + 4\,H_2O}\). \(n(\mathrm{C_3H_8}) = \frac{11}{44} = 0{,}25\ \mathrm{mol}\), \(n(\mathrm{O_2}) = 1{,}25\ \mathrm{mol}\).</p><p>\(V = 1{,}25 \cdot 22{,}4 = 28\ \mathrm{L}\)</p>` },
  { t: 4, b: x`Hidrat bakrovega(II) sulfata \(\mathrm{CuSO_4 \cdot x\,H_2O}\) z maso \(2{,}50\ \mathrm{g}\) po segrevanju tehta \(1{,}60\ \mathrm{g}\). Koliko je \(x\)? (\(M(\mathrm{CuSO_4}) = 159{,}6\ \mathrm{g/mol}\), \(M(\mathrm{H_2O}) = 18\ \mathrm{g/mol}\))`, v: 5,
    rez: x`\(x = 5\)`, post: x`<p>\(n(\mathrm{CuSO_4}) = \frac{1{,}60}{159{,}6} \approx 0{,}0100\ \mathrm{mol}\), \(n(\mathrm{H_2O}) = \frac{0{,}90}{18} = 0{,}050\ \mathrm{mol}\).</p><p>\(x = \frac{0{,}050}{0{,}0100} = 5\)</p>` },
  { t: 4, raven: "visja", b: x`Kolikšna je gostota ogljikovega dioksida pri \(25\ ^\circ\mathrm{C}\) in \(100\ \mathrm{kPa}\)? (\(R = 8{,}314\ \mathrm{J/(mol\,K)}\), \(M = 44\ \mathrm{g/mol}\); v g/L.)`, v: (100e3 * 0.044) / (8.314 * 298), enota: "g/L",
    rez: x`\(\rho \approx ${T((100e3 * 0.044) / (8.314 * 298), 2)}\ \mathrm{g/L}\)`, post: x`<p>\(\rho = \frac{pM}{RT} = \frac{100\,000 \cdot 0{,}044}{8{,}314 \cdot 298} \approx 1{,}78\ \mathrm{kg/m^3} = 1{,}78\ \mathrm{g/L}\)</p>` },
];
