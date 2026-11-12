import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Gostota zlata je \(19{,}3\ \mathrm{g/cm^3}\). Koliko kilogramov ima kocka zlata z robom \(20\ \mathrm{cm}\)?`, v: 19.3 * 8000 / 1000, enota: "kg",
    rez: x`\(154{,}4\ \mathrm{kg}\)`, post: x`<p>\(V = 20^3 = 8000\ \mathrm{cm^3}\), \(m = 19{,}3 \cdot 8000 = 154\,400\ \mathrm{g} = 154{,}4\ \mathrm{kg}\)</p>` },
  { t: 4, b: x`Dolžino \(l = 12{,}0\ \mathrm{cm}\) izmerimo z absolutno napako \(0{,}1\ \mathrm{cm}\), širino \(b = 5{,}0\ \mathrm{cm}\) z napako \(0{,}1\ \mathrm{cm}\). Kolikšna je relativna napaka ploščine? (V odstotkih.)`, v: 100 * (0.1 / 12 + 0.1 / 5), enota: "%",
    rez: x`\(\approx ${T(100 * (0.1 / 12 + 0.1 / 5), 1)}\,\%\)`, post: x`<p>Pri produktu se relativni napaki seštejeta: \(\frac{0{,}1}{12} + \frac{0{,}1}{5} = 0{,}0083 + 0{,}02 \approx 2{,}8\,\%\)</p>` },
  { t: 4, b: x`Stranico kocke izmerimo z relativno napako \(1\,\%\). Kolikšna je relativna napaka prostornine? (V odstotkih.)`, v: 3, enota: "%",
    rez: x`\(3\,\%\)`, post: x`<p>\(V = a^3\): pri potenciranju se relativna napaka pomnoži z eksponentom, \(3 \cdot 1\,\% = 3\,\%\).</p>` },
  { t: 4, b: x`Kateri izraz ima enoto sile?`, p: x`\(\frac{mv^2}{r}\)`, n: [x`\(\frac{mv}{r^2}\)`, x`\(mv^2\)`, x`\(\frac{m^2 v}{t}\)`],
    post: x`<p>\(\frac{\mathrm{kg} \cdot \mathrm{m^2/s^2}}{\mathrm{m}} = \mathrm{kg\,m/s^2} = \mathrm{N}\)</p>` },
  { t: 4, raven: "visja", b: x`Nihajni čas nihala je odvisen le od dolžine \(l\) in težnega pospeška \(g\): \(t_0 = C\,l^a g^b\). Koliko je \(a\)? (Uporabi dimenzijsko analizo.)`, v: 0.5, tol: 1e-6, namig: "Ulomek vpiši kot 1/2 ali decimalno.",
    rez: x`\(a = \frac12\), \(b = -\frac12\)`, post: x`<p>\([\mathrm{s}] = [\mathrm{m}]^a [\mathrm{m\,s^{-2}}]^b\): za metre \(a + b = 0\), za sekunde \(-2b = 1\).</p><p>\(b = -\frac12\), \(a = \frac12\): \(t_0 \propto \sqrt{l/g}\)</p>` },
  { t: 4, b: x`Svetloba potuje \(3 \cdot 10^8\ \mathrm{m/s}\). Koliko kilometrov je svetlobno leto? (Leto ima \(365{,}25\) dni; v \(10^{12}\ \mathrm{km}\).)`, v: (3e8 * 365.25 * 86400) / 1e3 / 1e12, tol: 0.02,
    rez: x`\(\approx 9{,}47 \cdot 10^{12}\ \mathrm{km}\)`, post: x`<p>\(s = ct = 3 \cdot 10^8 \cdot 365{,}25 \cdot 86\,400\ \mathrm{s} \approx 9{,}47 \cdot 10^{15}\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Kapljica olja s prostornino \(1\ \mathrm{mm^3}\) se na vodi razleze v plast s ploščino \(0{,}5\ \mathrm{m^2}\). Ocenimo velikost molekule kot debelino plasti. Koliko nanometrov je to?`, v: (1e-9 / 0.5) * 1e9, enota: "nm",
    rez: x`\(2\ \mathrm{nm}\)`, post: x`<p>\(d = \frac{V}{S} = \frac{10^{-9}\ \mathrm{m^3}}{0{,}5\ \mathrm{m^2}} = 2 \cdot 10^{-9}\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Kolikšen je tlak \(760\ \mathrm{mm}\) živega srebra v kPa? (\(\rho_{Hg} = 13\,600\ \mathrm{kg/m^3}\), \(g = 9{,}81\ \mathrm{m/s^2}\))`, v: (13600 * 9.81 * 0.76) / 1000, enota: "kPa",
    rez: x`\(\approx ${T((13600 * 9.81 * 0.76) / 1000, 1)}\ \mathrm{kPa}\)`, post: x`<p>\(p = \rho g h = 13\,600 \cdot 9{,}81 \cdot 0{,}76 \approx 101{,}4\ \mathrm{kPa}\)</p>` },
  { t: 4, b: x`Koliko molekul vode je v enem kozarcu (\(0{,}2\ \mathrm{L}\)) vode? (\(M = 18\ \mathrm{g/mol}\), \(N_A = 6{,}02 \cdot 10^{23}\ \mathrm{mol^{-1}}\); v \(10^{24}\).)`, v: (200 / 18) * 6.02e23 / 1e24, tol: 0.05,
    rez: x`\(\approx 6{,}7 \cdot 10^{24}\)`, post: x`<p>\(m = 200\ \mathrm{g}\), \(n = \frac{200}{18} \approx 11{,}1\ \mathrm{mol}\), \(N = nN_A \approx 6{,}7 \cdot 10^{24}\)</p>` },
];
