import { T } from "../lib.mjs";
const x = String.raw, g = 9.81;
export default [
  { t: 4, b: x`Utež na vzmeti niha z amplitudo \(5\ \mathrm{cm}\) in nihajnim časom \(0{,}8\ \mathrm{s}\). Kolikšna je največja hitrost uteži?`, v: (2 * Math.PI / 0.8) * 0.05, enota: "m/s",
    rez: x`\(v_0 \approx ${T((2 * Math.PI / 0.8) * 0.05, 3)}\ \mathrm{m/s}\)`, post: x`<p>\(\omega = \frac{2\pi}{t_0} \approx 7{,}85\ \mathrm{s^{-1}}\), \(v_0 = \omega x_0 \approx 0{,}393\ \mathrm{m/s}\)</p>` },
  { t: 4, b: x`Utež na vzmeti niha z amplitudo \(5\ \mathrm{cm}\) in nihajnim časom \(0{,}8\ \mathrm{s}\). Kolikšna je hitrost uteži, ko je \(3\ \mathrm{cm}\) od ravnovesne lege?`, v: (2 * Math.PI / 0.8) * 0.04, enota: "m/s",
    rez: x`\(v \approx ${T((2 * Math.PI / 0.8) * 0.04, 3)}\ \mathrm{m/s}\)`, post: x`<p>Iz ohranitve energije: \(v = \omega\sqrt{x_0^2 - x^2} = 7{,}85 \cdot \sqrt{0{,}05^2 - 0{,}03^2} = 7{,}85 \cdot 0{,}04 \approx 0{,}314\ \mathrm{m/s}\)</p>` },
  { t: 4, b: x`Nihalna ura z matematičnim nihalom gre na Zemlji točno. Kolikšen bi moral biti nihajni čas te ure na Luni, kjer je \(g_L = 1{,}62\ \mathrm{m/s^2}\), če ima na Zemlji nihajni čas \(2\ \mathrm{s}\)? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: 2 * Math.sqrt(g / 1.62), enota: "s",
    rez: x`\(t_0 \approx ${T(2 * Math.sqrt(g / 1.62), 2)}\ \mathrm{s}\)`, post: x`<p>\(t_0 = 2\pi\sqrt{\frac{l}{g}}\), dolžina ostane enaka: \(\frac{t_L}{t_Z} = \sqrt{\frac{g}{g_L}}\).</p><p>\(t_L = 2\sqrt{\frac{9{,}81}{1{,}62}} \approx 4{,}92\ \mathrm{s}\)</p>` },
  { t: 4, b: x`Na vzmet obesimo utež in vzmet se raztegne za \(4\ \mathrm{cm}\). Utež nato malo potegnemo navzdol in spustimo. Kolikšen je nihajni čas? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: 2 * Math.PI * Math.sqrt(0.04 / g), enota: "s",
    rez: x`\(t_0 \approx ${T(2 * Math.PI * Math.sqrt(0.04 / g), 3)}\ \mathrm{s}\)`, post: x`<p>V ravnovesju \(kx = mg\), torej \(\frac{m}{k} = \frac{x}{g}\).</p><p>\(t_0 = 2\pi\sqrt{\frac{m}{k}} = 2\pi\sqrt{\frac{0{,}04}{9{,}81}} \approx 0{,}401\ \mathrm{s}\)</p>` },
  { t: 4, b: x`Kolikokrat se spremeni nihajni čas uteži na vzmeti, če maso uteži početverimo in vzmet zamenjamo z dvakrat tršo?`, v: Math.SQRT2, tol: 0.01,
    rez: x`\(\sqrt2 \approx 1{,}41\)-krat daljši`, post: x`<p>\(t_0 \propto \sqrt{\frac{m}{k}}\): \(\sqrt{\frac{4}{2}} = \sqrt2 \approx 1{,}41\)</p>` },
  { t: 4, raven: "visja", b: x`Nihajni krog ima tuljavo z induktivnostjo \(2\ \mathrm{mH}\) in kondenzator s kapaciteto \(50\ \mathrm{nF}\). Kolikšna je lastna frekvenca kroga? (v kHz)`, v: 1 / (2 * Math.PI * Math.sqrt(2e-3 * 50e-9)) / 1000, enota: "kHz",
    rez: x`\(\nu \approx ${T(1 / (2 * Math.PI * Math.sqrt(2e-3 * 50e-9)) / 1000, 2)}\ \mathrm{kHz}\)`, post: x`<p>\(\nu = \frac{1}{2\pi\sqrt{LC}} = \frac{1}{2\pi\sqrt{2 \cdot 10^{-3} \cdot 5 \cdot 10^{-8}}} = \frac{1}{2\pi \cdot 10^{-5}} \approx 15{,}92\ \mathrm{kHz}\)</p>` },
];
