import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Predmet je \(30\ \mathrm{cm}\) pred zbiralno lečo z goriščno razdaljo \(20\ \mathrm{cm}\). Kolikšna je povečava slike?`, v: 2,
    rez: x`\(2\) (obrnjena, realna)`, post: x`<p>\(\frac1b = \frac1f - \frac1a = \frac{1}{20} - \frac{1}{30} = \frac{1}{60}\), \(b = 60\ \mathrm{cm}\).</p><p>Povečava \(\frac{b}{a} = \frac{60}{30} = 2\)</p>` },
  { t: 4, b: x`Kolikšen je mejni kot totalnega odboja za svetlobo, ki gre iz stekla (\(n = 1{,}5\)) v vodo (\(n = 1{,}33\))? (V stopinjah.)`, v: Math.asin(1.33 / 1.5) * 180 / Math.PI, enota: "°",
    rez: x`\(\alpha_m \approx ${T(Math.asin(1.33 / 1.5) * 180 / Math.PI, 1)}^\circ\)`, post: x`<p>\(\sin\alpha_m = \frac{n_2}{n_1} = \frac{1{,}33}{1{,}5} \approx 0{,}887\), \(\alpha_m \approx 62{,}5^\circ\)</p>` },
  { t: 4, b: x`Riba je \(1{,}2\ \mathrm{m}\) pod gladino. Na kolikšni globini jo vidimo, če gledamo navpično navzdol? (\(n_{vode} = 1{,}33\); v m.)`, v: 1.2 / 1.33, enota: "m",
    rez: x`\(\approx ${T(1.2 / 1.33, 2)}\ \mathrm{m}\)`, post: x`<p>Za majhne kote je navidezna globina \(h' = \frac{h}{n} = \frac{1{,}2}{1{,}33} \approx 0{,}90\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Kje nastane slika predmeta, ki je \(10\ \mathrm{cm}\) pred zbiralno lečo z goriščno razdaljo \(15\ \mathrm{cm}\)? (Vpiši razdaljo od leče v cm.)`, v: 30, enota: "cm",
    rez: x`\(30\ \mathrm{cm}\) pred lečo (navidezna, pokončna, \(3\)-krat povečana)`, post: x`<p>\(\frac1b = \frac{1}{15} - \frac{1}{10} = -\frac{1}{30}\), \(b = -30\ \mathrm{cm}\): slika je navidezna, na isti strani kot predmet. Tako deluje lupa.</p>` },
  { t: 4, raven: "visja", b: x`Pri poskusu z dvema režama z razmikom \(0{,}2\ \mathrm{mm}\) je zaslon \(2\ \mathrm{m}\) stran. Sosednji svetli progi sta \(6\ \mathrm{mm}\) narazen. Kolikšna je valovna dolžina svetlobe? (v nm)`, v: (0.2e-3 * 6e-3) / 2 * 1e9, enota: "nm",
    rez: x`\(\lambda = 600\ \mathrm{nm}\)`, post: x`<p>Razmik prog \(\Delta x = \frac{\lambda L}{d}\), \(\lambda = \frac{d\Delta x}{L} = \frac{2 \cdot 10^{-4} \cdot 6 \cdot 10^{-3}}{2} = 6 \cdot 10^{-7}\ \mathrm{m}\)</p>` },
];
