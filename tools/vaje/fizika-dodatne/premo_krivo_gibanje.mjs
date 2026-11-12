import { T } from "../lib.mjs";
const x = String.raw, g = 9.81;
const t1 = (() => { const v0 = 20, h = 30; return (v0 * Math.sin(Math.PI / 6) + Math.sqrt((v0 * 0.5) ** 2 + 2 * g * h)) / g; })();
const d1 = 20 * Math.cos(Math.PI / 6) * t1;
const dom = (12 ** 2 * Math.sin(2 * Math.PI / 4)) / g;
const s2 = 30 * 4 + 0;
export default [
  { t: 4, b: x`S strehe, \(30\ \mathrm{m}\) nad tlemi, vržemo kamen s hitrostjo \(20\ \mathrm{m/s}\) pod kotom \(30^\circ\) nad vodoravnico. Kako daleč od vznožja stavbe pade na tla? (\(g = 9{,}81\ \mathrm{m/s^2}\), brez upora zraka)`, v: d1, enota: "m",
    rez: x`\(d \approx ${T(d1, 1)}\ \mathrm{m}\)`, post: x`<p>\(v_x = 20\cos 30^\circ = 17{,}32\ \mathrm{m/s}\), \(v_y = 20\sin 30^\circ = 10\ \mathrm{m/s}\).</p><p>Čas leta iz \(-30 = 10t - \frac{g}{2}t^2\): \(t = \frac{10 + \sqrt{100 + 2 \cdot 9{,}81 \cdot 30}}{9{,}81} \approx ${T(t1, 2)}\ \mathrm{s}\).</p><p>\(d = v_x t \approx ${T(d1, 1)}\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Pod katerim kotom moramo izstreliti telo z ravnih tal, da je največja višina enaka dometu? (V stopinjah, na eno decimalko.)`, v: Math.atan(4) * 180 / Math.PI, enota: "°", tol: 0.06,
    rez: x`\(\alpha = \arctan 4 \approx ${T(Math.atan(4) * 180 / Math.PI, 1)}^\circ\)`, post: x`<p>\(h = \frac{v_0^2\sin^2\alpha}{2g}\), \(D = \frac{v_0^2 \cdot 2\sin\alpha\cos\alpha}{g}\).</p><p>\(h = D\): \(\frac{\sin\alpha}{2} = 2\cos\alpha\), \(\tan\alpha = 4\), \(\alpha \approx 76{,}0^\circ\).</p>` },
  { t: 4, b: x`Avto spelje iz mirovanja s stalnim pospeškom \(2\ \mathrm{m/s^2}\). Ob istem času ga prehiti tovornjak, ki vozi enakomerno s hitrostjo \(15\ \mathrm{m/s}\). Po kolikšni poti avto dohiti tovornjak?`, v: 225, enota: "m",
    rez: x`\(225\ \mathrm{m}\)`, post: x`<p>\(\frac{a}{2}t^2 = vt\) da \(t = \frac{2v}{a} = 15\ \mathrm{s}\).</p><p>\(s = vt = 15 \cdot 15 = 225\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Telo prosto pada. Zadnjo sekundo pred udarcem o tla prepotuje polovico celotne višine. S kolikšne višine pada? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: (g / 2) * (2 + Math.SQRT2) ** 2, enota: "m",
    rez: x`\(h \approx ${T((g / 2) * (2 + Math.SQRT2) ** 2, 1)}\ \mathrm{m}\)`, post: x`<p>\(h = \frac{g}{2}t^2\) in \(\frac{h}{2} = \frac{g}{2}(t - 1)^2\). Deljenje da \(t^2 = 2(t - 1)^2\), \(t = \sqrt2(t - 1)\), \(t = \frac{\sqrt2}{\sqrt2 - 1} = 2 + \sqrt2 \approx 3{,}41\ \mathrm{s}\).</p><p>\(h = \frac{9{,}81}{2}(3{,}41)^2 \approx ${T((g / 2) * (2 + Math.SQRT2) ** 2, 1)}\ \mathrm{m}\)</p>` },
  { t: 4, b: x`Čoln pluje s hitrostjo \(4\ \mathrm{m/s}\) glede na vodo čez reko, široko \(120\ \mathrm{m}\), ki teče s hitrostjo \(3\ \mathrm{m/s}\). Krmar usmeri čoln tako, da prečka reko pravokotno na breg. Koliko časa traja prečkanje?`, v: 120 / Math.sqrt(7), enota: "s",
    rez: x`\(t \approx ${T(120 / Math.sqrt(7), 1)}\ \mathrm{s}\)`, post: x`<p>Del hitrosti čolna mora izničiti tok: hitrost pravokotno na breg je \(\sqrt{4^2 - 3^2} = \sqrt7 \approx 2{,}65\ \mathrm{m/s}\).</p><p>\(t = \frac{120}{\sqrt7} \approx ${T(120 / Math.sqrt(7), 1)}\ \mathrm{s}\)</p>` },
  { t: 4, b: x`Kolo s polmerom \(0{,}35\ \mathrm{m}\) se kotali brez drsenja s hitrostjo \(7\ \mathrm{m/s}\). Kolikšna je hitrost najvišje točke kolesa glede na tla?`, v: 14, enota: "m/s",
    rez: x`\(14\ \mathrm{m/s}\)`, post: x`<p>Pri kotaljenju se točka na tleh trenutno ne giblje, kolo se vrti okoli nje. Najvišja točka je dvakrat dlje od te osi, zato ima dvakratno hitrost središča: \(2 \cdot 7 = 14\ \mathrm{m/s}\).</p>` },
];
