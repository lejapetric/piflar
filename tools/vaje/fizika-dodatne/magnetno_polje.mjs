import { T } from "../lib.mjs";
const x = String.raw, e = 1.6e-19, me = 9.11e-31, mu = 4 * Math.PI * 1e-7;
const v = Math.sqrt((2 * e * 1000) / me), r = (me * v) / (e * 0.01);
export default [
  { t: 4, raven: "visja", b: x`Elektron, pospešen z napetostjo \(1\ \mathrm{kV}\), prileti pravokotno v homogeno magnetno polje z gostoto \(10\ \mathrm{mT}\). Kolikšen je polmer njegove krožnice? (\(e = 1{,}6 \cdot 10^{-19}\ \mathrm{C}\), \(m_e = 9{,}11 \cdot 10^{-31}\ \mathrm{kg}\); v mm.)`, v: r * 1000, enota: "mm",
    rez: x`\(r \approx ${T(r * 1000, 1)}\ \mathrm{mm}\)`, post: x`<p>\(v = \sqrt{\frac{2eU}{m}} \approx ${T(v / 1e7, 2)} \cdot 10^7\ \mathrm{m/s}\).</p><p>\(evB = \frac{mv^2}{r}\), \(r = \frac{mv}{eB} \approx ${T(r * 1000, 1)}\ \mathrm{mm}\)</p>` },
  { t: 4, b: x`Dva dolga vzporedna vodnika sta \(10\ \mathrm{cm}\) narazen, po vsakem teče \(20\ \mathrm{A}\) v isti smeri. Kolikšna sila deluje na \(1\ \mathrm{m}\) dolžine enega vodnika? (\(\mu_0 = 4\pi \cdot 10^{-7}\ \mathrm{Vs/Am}\); v mN.)`, v: ((mu * 20 * 20) / (2 * Math.PI * 0.1)) * 1000, enota: "mN",
    rez: x`\(F = 0{,}8\ \mathrm{mN}\), privlačna`, post: x`<p>Polje prvega vodnika pri drugem: \(B = \frac{\mu_0 I}{2\pi r} = 4 \cdot 10^{-5}\ \mathrm{T}\).</p><p>\(F = IlB = 20 \cdot 1 \cdot 4 \cdot 10^{-5} = 8 \cdot 10^{-4}\ \mathrm{N}\); tokova v isti smeri se privlačita.</p>` },
  { t: 4, b: x`Tuljava ima \(500\) ovojev, dolga je \(25\ \mathrm{cm}\), po njej teče \(2\ \mathrm{A}\). Kolikšna je gostota magnetnega polja v njej? (\(\mu_0 = 4\pi \cdot 10^{-7}\ \mathrm{Vs/Am}\); v mT.)`, v: ((mu * 500 * 2) / 0.25) * 1000, enota: "mT",
    rez: x`\(B \approx ${T(((mu * 500 * 2) / 0.25) * 1000, 2)}\ \mathrm{mT}\)`, post: x`<p>\(B = \frac{\mu_0 N I}{l} = \frac{4\pi \cdot 10^{-7} \cdot 500 \cdot 2}{0{,}25} \approx 5{,}03\ \mathrm{mT}\)</p>` },
  { t: 4, b: x`Vodoravna palica z maso \(20\ \mathrm{g}\) in dolžino \(40\ \mathrm{cm}\) leži v vodoravnem magnetnem polju \(0{,}1\ \mathrm{T}\), pravokotnem na palico. Kolikšen tok mora teči po palici, da lebdi? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: (0.02 * 9.81) / (0.4 * 0.1), enota: "A",
    rez: x`\(I \approx ${T((0.02 * 9.81) / (0.04), 2)}\ \mathrm{A}\)`, post: x`<p>Magnetna sila mora uravnovesiti težo: \(IlB = mg\).</p><p>\(I = \frac{0{,}02 \cdot 9{,}81}{0{,}4 \cdot 0{,}1} \approx 4{,}91\ \mathrm{A}\)</p>` },
  { t: 4, b: x`Proton in delec alfa z enako hitrostjo prileti pravokotno v isto magnetno polje. Kolikšno je razmerje polmerov njunih krožnic \(r_\alpha : r_p\)? (Delec alfa ima 4-kratno maso in 2-kratni naboj protona.)`, v: 2,
    rez: x`\(r_\alpha : r_p = 2\)`, post: x`<p>\(r = \frac{mv}{qB}\): \(\frac{r_\alpha}{r_p} = \frac{4m}{2e}\cdot\frac{e}{m} = 2\)</p>` },
  { t: 4, raven: "visja", b: x`Pravokotna zanka \(5\ \mathrm{cm} \times 8\ \mathrm{cm}\) s \(100\) ovoji, po kateri teče \(0{,}5\ \mathrm{A}\), je v magnetnem polju \(0{,}2\ \mathrm{T}\). Kolikšen je največji navor na zanko? (v mNm)`, v: 100 * 0.5 * 0.004 * 0.2 * 1000, enota: "mNm",
    rez: x`\(M = 40\ \mathrm{mNm}\)`, post: x`<p>\(M = NISB\sin\varphi\), največji pri \(\varphi = 90^\circ\): \(100 \cdot 0{,}5 \cdot 0{,}004 \cdot 0{,}2 = 0{,}04\ \mathrm{Nm}\)</p>` },
];
