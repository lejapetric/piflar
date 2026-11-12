import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Mars obkroži Sonce na razdalji \(1{,}52\ \mathrm{a.e.}\) Koliko let traja njegovo leto?`, v: 1.52 ** 1.5, enota: "let",
    rez: x`\(\approx ${T(1.52 ** 1.5, 2)}\) leta`, post: x`<p>Tretji Keplerjev zakon: \(\frac{t^2}{a^3}\) je za vse planete enak, za Zemljo \(1\ \mathrm{leto}^2/\mathrm{a.e.}^3\).</p><p>\(t = 1{,}52^{3/2} \approx 1{,}87\) leta</p>` },
  { t: 4, raven: "visja", b: x`Zvezda ima paralakso \(0{,}2''\). Kako daleč je v svetlobnih letih? (\(1\ \mathrm{pc} = 3{,}26\ \mathrm{sv.\,l.}\))`, v: 5 * 3.26, enota: "sv. l.",
    rez: x`\(5\ \mathrm{pc} \approx 16{,}3\ \mathrm{sv.\,l.}\)`, post: x`<p>\(r = \frac{1}{p} = \frac{1}{0{,}2} = 5\ \mathrm{pc} = 16{,}3\) svetlobnega leta</p>` },
  { t: 4, raven: "visja", b: x`Zvezda A ima \(2\)-krat večji polmer in \(2\)-krat višjo površinsko temperaturo kot zvezda B. Kolikokrat večji je izsev zvezde A?`, v: 64,
    rez: x`\(64\)-krat`, post: x`<p>Stefanov zakon: \(L = 4\pi R^2\sigma T^4\), \(\frac{L_A}{L_B} = 2^2 \cdot 2^4 = 64\)</p>` },
  { t: 4, b: x`Kolikšna je hitrost satelita na krožnem tiru \(400\ \mathrm{km}\) nad površjem Zemlje? (\(g_0 = 9{,}81\ \mathrm{m/s^2}\), \(R_Z = 6370\ \mathrm{km}\); v km/s.)`, v: Math.sqrt((9.81 * 6370e3 ** 2) / 6770e3) / 1000, enota: "km/s",
    rez: x`\(v \approx ${T(Math.sqrt((9.81 * 6370e3 ** 2) / 6770e3) / 1000, 2)}\ \mathrm{km/s}\)`, post: x`<p>\(GM = g_0R_Z^2\). \(v = \sqrt{\frac{GM}{r}} = \sqrt{\frac{9{,}81 \cdot (6{,}37 \cdot 10^6)^2}{6{,}77 \cdot 10^6}} \approx 7{,}67\ \mathrm{km/s}\)</p>` },
  { t: 4, raven: "visja", b: x`Galaksija se oddaljuje od nas s hitrostjo \(7000\ \mathrm{km/s}\). Kako daleč je po Hubblovem zakonu? (\(H_0 = 70\ \mathrm{km/(s\,Mpc)}\); v Mpc.)`, v: 100, enota: "Mpc",
    rez: x`\(100\ \mathrm{Mpc}\)`, post: x`<p>\(v = H_0 r\), \(r = \frac{7000}{70} = 100\ \mathrm{Mpc}\)</p>` },
];
