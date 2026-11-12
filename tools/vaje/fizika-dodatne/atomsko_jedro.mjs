import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Razpolovni čas joda-131 je \(8\) dni. Koliko odstotkov začetne količine ostane po \(30\) dneh?`, v: 100 * 0.5 ** (30 / 8), enota: "%",
    rez: x`\(\approx ${T(100 * 0.5 ** (30 / 8), 2)}\,\%\)`, post: x`<p>\(\frac{N}{N_0} = 2^{-t/t_{1/2}} = 2^{-3{,}75} \approx 0{,}0743\)</p>` },
  { t: 4, b: x`Vzorec lesa iz izkopanine ima \(25\,\%\) aktivnosti ogljika-14 v živem lesu. Koliko je star? (Razpolovni čas \(^{14}\mathrm{C}\) je \(5730\) let.)`, v: 11460, enota: "let",
    rez: x`\(11\,460\) let`, post: x`<p>\(25\,\% = \left(\frac12\right)^2\): pretekla sta dva razpolovna časa, \(2 \cdot 5730 = 11\,460\) let.</p>` },
  { t: 4, b: x`Aktivnost vzorca v \(6\) urah pade s \(1600\ \mathrm{Bq}\) na \(200\ \mathrm{Bq}\). Kolikšen je razpolovni čas? (v urah)`, v: 2, enota: "h",
    rez: x`\(t_{1/2} = 2\ \mathrm{h}\)`, post: x`<p>\(\frac{1600}{200} = 8 = 2^3\): trije razpolovni časi v 6 urah, torej \(2\ \mathrm{h}\).</p>` },
  { t: 4, b: x`Jedro \(^{238}_{92}\mathrm{U}\) razpade v \(^{206}_{82}\mathrm{Pb}\) preko vrste razpadov alfa in beta minus. Koliko razpadov beta minus je v tej vrsti?`, v: 6,
    rez: x`\(6\) (in \(8\) razpadov alfa)`, post: x`<p>Masno število se spremeni le pri razpadu alfa: \(\frac{238 - 206}{4} = 8\) razpadov alfa, ki zmanjšajo vrstno število za \(16\).</p><p>Vrstno število se je zmanjšalo le za \(10\), zato je bilo \(16 - 10 = 6\) razpadov beta minus (vsak ga poveča za 1).</p>` },
  { t: 4, raven: "visja", b: x`Kolikšna je vezavna energija jedra helija-4? (\(m_p = 1{,}007276\ \mathrm{u}\), \(m_n = 1{,}008665\ \mathrm{u}\), \(m_{jedra} = 4{,}001506\ \mathrm{u}\), \(1\ \mathrm{u} \cdot c^2 = 931{,}5\ \mathrm{MeV}\); v MeV.)`, v: (2 * 1.007276 + 2 * 1.008665 - 4.001506) * 931.5, enota: "MeV",
    rez: x`\(W_v \approx ${T((2 * 1.007276 + 2 * 1.008665 - 4.001506) * 931.5, 1)}\ \mathrm{MeV}\)`, post: x`<p>Masni primanjkljaj: \(\Delta m = 2m_p + 2m_n - m_{jedra} = 0{,}030376\ \mathrm{u}\).</p><p>\(W_v = \Delta m c^2 \approx 28{,}3\ \mathrm{MeV}\) (približno \(7{,}1\ \mathrm{MeV}\) na nukleon)</p>` },
];
