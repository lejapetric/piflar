import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Koliko ton aluminija lahko največ dobimo iz \(10\ \mathrm t\) boksita, ki vsebuje \(51\,\%\) \(\mathrm{Al_2O_3}\)? (\(M\): Al\(_2\)O\(_3\) 102, Al 27 g/mol)`, v: (10 * 0.51 * 54) / 102, enota: "t",
    rez: x`\(2{,}7\ \mathrm t\)`, post: x`<p>\(m(\mathrm{Al_2O_3}) = 5{,}1\ \mathrm t\). Masni delež Al v oksidu: \(\frac{54}{102}\).</p><p>\(m(\mathrm{Al}) = 5{,}1 \cdot \frac{54}{102} = 2{,}7\ \mathrm t\)</p>` },
  { t: 4, b: x`Kolikšen je masni delež dušika v amonijevem nitratu \(\mathrm{NH_4NO_3}\)? (\(A_r\): N 14, H 1, O 16; v odstotkih.)`, v: 35, enota: "%",
    rez: x`\(35\,\%\)`, post: x`<p>\(M = 80\ \mathrm{g/mol}\), dušika \(28\ \mathrm g\): \(\frac{28}{80} = 35\,\%\)</p>` },
  { t: 4, b: x`Zakaj pri redčenju koncentrirane žveplove(VI) kisline vedno vlivamo kislino v vodo in ne obratno?`, p: "pri mešanju se sprosti veliko toplote; voda na kislini bi zavrela in brizgnila", n: ["ker je voda gostejša od kisline", "ker kislina v vodo hitreje izhlapi", "ker se drugače tvori eksploziven plin"],
    post: x`<p>Hidratacija žveplove kisline je močno eksotermna. Če vodo vlivamo v kislino, se tanka plast vode na površini segreje do vrelišča in brizga skupaj s kislino.</p>` },
];
