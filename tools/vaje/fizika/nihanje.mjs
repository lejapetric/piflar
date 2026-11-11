import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const g = 9.81;

export default function ({ serija, pojmi, vprasanja }) {
  serija("perioda-frekvenca", 6, (r, i) => {
    const n = r.int(5, 100), t = r.int(2, 60);
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: n / t, enota: "Hz", besedilo: `Nihalo naredi ${n} nihajev v ${t} s. Kolikšna je frekvenca?`, rezultat: `${T(n / t, 3)} Hz`, postopek: `<p>\\(\\nu = \\frac{N}{t} = \\frac{${n}}{${t}} \\approx ${L(n / t, 3)}\\ \\text{Hz}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: t / n, enota: "s", besedilo: `Nihalo naredi ${n} nihajev v ${t} s. Kolikšen je nihajni čas?`, rezultat: `${T(t / n, 3)} s`, postopek: `<p>\\(t_0 = \\frac{t}{N} = \\frac{${t}}{${n}} \\approx ${L(t / n, 3)}\\ \\text{s}\\)</p>` });
  });
  serija("vzmetno", 7, (r, i) => {
    const m = r.int(50, 2000) / 1000, k = r.int(5, 500), t0 = 2 * Math.PI * Math.sqrt(m / k);
    if (i % 3 === 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi((4 * Math.PI * Math.PI * m) / (t0 * t0), 4), enota: "N/m", besedilo: `Utež z maso ${L(m * 1000, 0)} g niha na vzmeti z nihajnim časom ${L(t0, 3)} s. Kolikšen je koeficient vzmeti?`, rezultat: `${k} N/m`, postopek: `<p>\\(t_0 = 2\\pi\\sqrt{\\frac{m}{k}}\\), \\(k = \\frac{4\\pi^2 m}{t_0^2} \\approx ${k}\\ \\text{N/m}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t0, 5), enota: "s", besedilo: `Utež z maso ${L(m * 1000, 0)} g niha na vzmeti s koeficientom ${k} N/m. Kolikšen je nihajni čas?`, rezultat: `${T(t0, 3)} s`, postopek: `<p>\\(t_0 = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{${L(m, 3)}}{${k}}} \\approx ${L(t0, 3)}\\ \\text{s}\\)</p>` });
  });
  serija("matematicno", 7, (r, i) => {
    const l = r.int(10, 300) / 100, t0 = 2 * Math.PI * Math.sqrt(l / g);
    if (i % 3 === 2) {
      const tt = r.int(5, 40) / 10, ll = (g * tt * tt) / (4 * Math.PI * Math.PI);
      return kolicina({ tezavnost: 3, vrednost: zaokrozi(ll, 5), enota: "m", besedilo: `Kako dolgo mora biti matematično nihalo, da je njegov nihajni čas ${L(tt, 1)} s?`, rezultat: `${T(ll, 3)} m`, postopek: `<p>\\(l = \\frac{gt_0^2}{4\\pi^2} = \\frac{9{,}81 \\cdot ${L(tt * tt, 2)}}{4\\pi^2} \\approx ${L(ll, 3)}\\ \\text{m}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t0, 5), enota: "s", besedilo: `Kolikšen je nihajni čas matematičnega nihala dolžine ${L(l * 100, 0)} cm?`, rezultat: `${T(t0, 3)} s`, postopek: `<p>\\(t_0 = 2\\pi\\sqrt{\\frac{l}{g}} = 2\\pi\\sqrt{\\frac{${L(l, 2)}}{9{,}81}} \\approx ${L(t0, 3)}\\ \\text{s}\\)</p>` });
  });
  serija("najvecja-hitrost", 5, (r) => {
    const A = r.int(1, 30) / 100, t0 = r.int(2, 40) / 10, v = (2 * Math.PI * A) / t0;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v, 5), enota: "m/s", besedilo: `Telo harmonično niha z amplitudo ${L(A * 100, 0)} cm in nihajnim časom ${L(t0, 1)} s. Kolikšna je največja hitrost?`, rezultat: `${T(v, 3)} m/s`, postopek: `<p>\\(v_0 = \\omega x_0 = \\frac{2\\pi}{t_0}x_0 = \\frac{2\\pi}{${L(t0, 1)}} \\cdot ${L(A, 2)} \\approx ${L(v, 3)}\\ \\text{m/s}\\)</p>` });
  });
  serija("najvecji-pospesek", 4, (r) => {
    const A = r.int(1, 30) / 100, t0 = r.int(2, 40) / 10, w = (2 * Math.PI) / t0, a = w * w * A;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(a, 5), enota: "m/s²", besedilo: `Telo harmonično niha z amplitudo ${L(A * 100, 0)} cm in nihajnim časom ${L(t0, 1)} s. Kolikšen je največji pospešek?`, rezultat: `${T(a, 3)} m/s²`, postopek: `<p>\\(a_0 = \\omega^2 x_0 = \\left(\\frac{2\\pi}{${L(t0, 1)}}\\right)^2 \\cdot ${L(A, 2)} \\approx ${L(a, 3)}\\ \\text{m/s}^2\\)</p>` });
  });
  serija("odmik", 5, (r) => {
    const A = r.int(1, 20), t0 = r.int(1, 8), t = r.int(1, 20) / 10;
    const x = A * Math.sin((2 * Math.PI * t) / t0);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(x, 5) || 0, tol: 0.01, enota: "cm", besedilo: `Odmik nihala je \\(x(t) = ${A}\\ \\text{cm} \\cdot \\sin\\left(\\frac{2\\pi t}{${t0}\\ \\text{s}}\\right)\\). Kolikšen je odmik ob času \\(t = ${L(t, 1)}\\) s?`, rezultat: `${T(x, 2)} cm`, postopek: `<p>\\(x = ${A} \\cdot \\sin\\left(\\frac{2\\pi \\cdot ${L(t, 1)}}{${t0}}\\right) \\approx ${L(x, 2)}\\ \\text{cm}\\) (kot v radianih)</p>` });
  });
  serija("energija", 4, (r) => {
    const k = r.int(10, 500), A = r.int(1, 20) / 100, W = 0.5 * k * A * A;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(W, 6), enota: "J", besedilo: `Utež niha na vzmeti s koeficientom ${k} N/m z amplitudo ${L(A * 100, 0)} cm. Kolikšna je celotna energija nihanja?`, rezultat: `${T(W, 4)} J`, postopek: `<p>\\(W = \\frac{kx_0^2}{2} = \\frac{${k} \\cdot ${L(A, 2)}^2}{2} \\approx ${L(W, 4)}\\ \\text{J}\\)</p>` });
  });
  serija("nihajni-krog", 4, (r) => {
    const Lh = r.int(1, 100) / 1000, C = r.int(1, 1000) * 1e-9, nu = 1 / (2 * Math.PI * Math.sqrt(Lh * C));
    return kolicina({ tezavnost: 3, vrednost: nu, tol: 0.01, enota: "Hz", besedilo: `Kolikšna je lastna frekvenca nihajnega kroga s tuljavo ${L(Lh * 1000, 0)} mH in kondenzatorjem ${L(C * 1e9, 0)} nF?`, rezultat: `${T(nu, 0)} Hz`, postopek: `<p>\\(\\nu = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{${sci(Lh)} \\cdot ${sci(C)}}} \\approx ${L(nu, 0)}\\ \\text{Hz}\\)</p>` });
  });
  serija("sprememba", 4, (r) => {
    const [opis, f] = r.izberi([["dolžino nihala povečamo 4-krat", 2], ["maso uteži na vzmeti povečamo 4-krat", 2], ["koeficient vzmeti povečamo 4-krat", 0.5], ["nihalo prenesemo na Luno, kjer je \\(g\\) 6-krat manjši", Math.sqrt(6)], ["dolžino nihala zmanjšamo na četrtino", 0.5], ["maso uteži matematičnega nihala podvojimo", 1]]);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(f, 4), enota: "", besedilo: `Kolikokrat se spremeni nihajni čas, če ${opis}? (Vpiši faktor.)`, rezultat: `${T(f, 2)}-krat`, postopek: `<p>Vzmet: \\(t_0 = 2\\pi\\sqrt{m/k}\\), matematično nihalo: \\(t_0 = 2\\pi\\sqrt{l/g}\\) (neodvisno od mase). Faktor: ${L(f, 2)}.</p>` });
  });
  serija("visja-fazni", 3, (r) => {
    const A = r.int(2, 10), f = r.izberi([0.5, Math.SQRT1_2, Math.sqrt(3) / 2]);
    const fi = Math.asin(f), t0 = r.int(1, 6), t = (fi / (2 * Math.PI)) * t0;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 5), enota: "s", besedilo: `Telo niha po enačbi \\(x = ${A}\\ \\text{cm} \\cdot \\sin(2\\pi t/${t0}\\ \\text{s})\\). Kdaj prvič po \\(t = 0\\) doseže odmik ${L(A * f, 2)} cm?`, rezultat: `${T(t, 3)} s`, postopek: `<p>\\(\\sin(2\\pi t/${t0}) = ${L(f, 3)}\\), \\(2\\pi t/${t0} = ${L(fi, 4)}\\).</p><p>\\(t = \\frac{${L(fi, 4)} \\cdot ${t0}}{2\\pi} \\approx ${L(t, 3)}\\ \\text{s}\\)</p>` });
  });
  serija("visja-g", 3, (r) => {
    const l = r.int(50, 200) / 100, n = r.int(10, 30), t = n * 2 * Math.PI * Math.sqrt(l / 9.78) * (1 + r.int(-5, 5) / 1000);
    const gg = (4 * Math.PI * Math.PI * l * n * n) / (t * t);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(gg, 4), tol: 0.005, enota: "m/s²", besedilo: `Nihalo dolžine ${L(l * 100, 0)} cm naredi ${n} nihajev v ${L(t, 2)} s. Kolikšen je izmerjeni težni pospešek?`, rezultat: `${T(gg, 2)} m/s²`, postopek: `<p>\\(t_0 = \\frac{${L(t, 2)}}{${n}} \\approx ${L(t / n, 4)}\\ \\text{s}\\)</p><p>\\(g = \\frac{4\\pi^2 l}{t_0^2} \\approx ${L(gg, 2)}\\ \\text{m/s}^2\\)</p>` });
  });
  pojmi([
    ["amplituda", "Največji odmik nihala iz ravnovesne lege."],
    ["nihajni čas", "Čas enega celotnega nihaja."],
    ["frekvenca", "Število nihajev v sekundi; merimo jo v hertzih."],
    ["dušeno nihanje", "Nihanje, pri katerem se amplituda zaradi izgub energije zmanjšuje."],
    ["resonanca", "Pojav, ko je frekvenca vsiljenega nihanja enaka lastni in je amplituda največja."],
    ["harmonično nihanje", "Nihanje, pri katerem je odmik sinusna funkcija časa."],
    ["vsiljeno nihanje", "Nihanje, ki ga povzroča zunanja periodična sila."],
  ]);
}
