import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`\(2{,}3\ \mathrm g\) natrija vržemo v \(100\ \mathrm g\) vode. Kolikšen je masni delež NaOH v nastali raztopini? (\(M\): Na 23, NaOH 40, H\(_2\) 2 g/mol; v odstotkih.)`, v: 100 * 4 / (102.3 - 0.1), enota: "%",
    rez: x`\(w \approx ${T(100 * 4 / 102.2, 2)}\,\%\)`, post: x`<p>\(\mathrm{2\,Na + 2\,H_2O \to 2\,NaOH + H_2}\). \(n(\mathrm{Na}) = 0{,}1\ \mathrm{mol}\): nastane \(4\ \mathrm g\) NaOH, uide \(0{,}1\ \mathrm g\) vodika.</p><p>Masa raztopine \(102{,}3 - 0{,}1 = 102{,}2\ \mathrm g\), \(w \approx 3{,}91\,\%\)</p>` },
  { t: 4, b: x`V katerem primeru pride do reakcije?`, p: x`klorovico dodamo raztopini KBr`, n: [x`jod dodamo raztopini NaCl`, x`brom dodamo raztopini KCl`, x`jod dodamo raztopini KBr`],
    post: x`<p>Močnejši oksidant (višje v skupini) izpodrine šibkejši halogen iz njegovih soli: \(\mathrm{Cl_2 + 2\,Br^- \to 2\,Cl^- + Br_2}\).</p>` },
  { t: 4, b: x`Zakaj reaktivnost alkalijskih kovin v skupini narašča, reaktivnost halogenov pa pada?`, p: "kovine lažje oddajo elektron z večjim polmerom, halogeni pa ga ob večjem polmeru težje sprejmejo", n: ["ker v obeh skupinah narašča elektronegativnost", "ker imajo težji elementi več valenčnih elektronov", "ker v obeh skupinah pada polmer atoma"],
    post: x`<p>Navzdol po skupini je valenčni elektron dlje od jedra in bolj zasenčen. Kovine ga zato lažje oddajo, halogeni pa nov elektron šibkeje privlačijo.</p>` },
];
