import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Kovinska palica dolžine \(0{,}5\ \mathrm{m}\) drsi s hitrostjo \(4\ \mathrm{m/s}\) po vodoravnih tračnicah, pravokotno na navpično magnetno polje \(0{,}3\ \mathrm{T}\). Tračnici sta zvezani z uporom \(2\ \mathrm{\Omega}\). S kolikšno silo moramo vleči palico, da se giblje enakomerno? (Upor palice in trenje zanemarimo.)`, v: (0.3 * 0.5 * 4 / 2) * 0.5 * 0.3, enota: "N",
    rez: x`\(F = 0{,}045\ \mathrm{N}\)`, post: x`<p>Inducirana napetost \(U = Blv = 0{,}3 \cdot 0{,}5 \cdot 4 = 0{,}6\ \mathrm{V}\), tok \(I = 0{,}3\ \mathrm{A}\).</p><p>Magnetna sila na palico zavira gibanje: \(F = IlB = 0{,}3 \cdot 0{,}5 \cdot 0{,}3 = 0{,}045\ \mathrm{N}\)</p>` },
  { t: 4, b: x`Tuljava s \(200\) ovoji in presekom \(10\ \mathrm{cm^2}\) je v magnetnem polju, ki je vzporedno z osjo tuljave. Gostota polja enakomerno pade s \(0{,}5\ \mathrm{T}\) na \(0\) v \(0{,}1\ \mathrm{s}\). Kolikšna napetost se inducira?`, v: (200 * 1e-3 * 0.5) / 0.1, enota: "V",
    rez: x`\(U_i = 1\ \mathrm{V}\)`, post: x`<p>\(U_i = N\frac{\Delta\Phi}{\Delta t} = 200 \cdot \frac{10^{-3} \cdot 0{,}5}{0{,}1} = 1\ \mathrm{V}\)</p>` },
  { t: 4, b: x`Generator ima tuljavo s \(100\) ovoji in presekom \(200\ \mathrm{cm^2}\), ki se vrti s frekvenco \(50\ \mathrm{Hz}\) v polju \(0{,}1\ \mathrm{T}\). Kolikšna je amplituda inducirane napetosti?`, v: 100 * 0.02 * 0.1 * 2 * Math.PI * 50, enota: "V",
    rez: x`\(U_0 \approx ${T(100 * 0.02 * 0.1 * 2 * Math.PI * 50, 1)}\ \mathrm{V}\)`, post: x`<p>\(U_0 = NSB\omega = 100 \cdot 0{,}02 \cdot 0{,}1 \cdot 2\pi \cdot 50 \approx 62{,}8\ \mathrm{V}\)</p>` },
  { t: 4, b: x`Transformator ima \(1200\) ovojev v primarni in \(60\) v sekundarni tuljavi. Primarna je priključena na \(230\ \mathrm{V}\), na sekundarno je priključen porabnik z uporom \(5\ \mathrm{\Omega}\). Kolikšen tok teče v primarni tuljavi (idealen transformator)? (v mA)`, v: ((230 / 20) ** 2 / 5 / 230) * 1000, enota: "mA",
    rez: x`\(I_1 \approx ${T(((230 / 20) ** 2 / 5 / 230) * 1000, 0)}\ \mathrm{mA}\)`, post: x`<p>\(U_2 = 230 \cdot \frac{60}{1200} = 11{,}5\ \mathrm{V}\), \(I_2 = 2{,}3\ \mathrm{A}\), \(P = 26{,}45\ \mathrm{W}\).</p><p>\(I_1 = \frac{P}{U_1} = 0{,}115\ \mathrm{A}\)</p>` },
  { t: 4, raven: "visja", b: x`Skozi tuljavo z induktivnostjo \(0{,}2\ \mathrm{H}\) teče tok \(3\ \mathrm{A}\). Tok v \(10\ \mathrm{ms}\) enakomerno pade na nič. Kolikšna napetost se inducira?`, v: (0.2 * 3) / 0.01, enota: "V",
    rez: x`\(U_i = 60\ \mathrm{V}\)`, post: x`<p>\(U_i = L\frac{\Delta I}{\Delta t} = 0{,}2 \cdot \frac{3}{0{,}01} = 60\ \mathrm{V}\)</p>` },
  { t: 4, raven: "visja", b: x`Koliko energije je shranjene v magnetnem polju tuljave z induktivnostjo \(0{,}2\ \mathrm{H}\), po kateri teče \(3\ \mathrm{A}\)?`, v: 0.5 * 0.2 * 9, enota: "J",
    rez: x`\(W = 0{,}9\ \mathrm{J}\)`, post: x`<p>\(W = \frac12 LI^2 = \frac12 \cdot 0{,}2 \cdot 9 = 0{,}9\ \mathrm{J}\)</p>` },
];
