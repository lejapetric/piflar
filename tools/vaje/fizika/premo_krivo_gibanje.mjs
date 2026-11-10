import { kolicina, izbira, T, L, zaokrozi } from "../lib.mjs";
const g = 9.81;

export default function ({ serija, pojmi }) {
  serija("enakomerno", 6, (r, i) => {
    const v = r.int(2, 30), t = r.int(5, 120), s = v * t;
    const kaj = i % 3;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: s, enota: "m", besedilo: `Kolesar vozi enakomerno s hitrostjo ${v} m/s. Koliko poti opravi v ${t} s?`, rezultat: `${s} m`, postopek: `<p>\\(s = vt = ${v}\\ \\text{m/s} \\cdot ${t}\\ \\text{s} = ${s}\\ \\text{m}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 1, vrednost: v, enota: "m/s", besedilo: `Telo v ${t} s enakomerno prepotuje ${s} m. Kolikšna je njegova hitrost?`, rezultat: `${v} m/s`, postopek: `<p>\\(v = \\frac{s}{t} = \\frac{${s}}{${t}} = ${v}\\ \\text{m/s}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: t, enota: "s", besedilo: `Koliko časa potrebuje telo s hitrostjo ${v} m/s za ${s} m poti?`, rezultat: `${t} s`, postopek: `<p>\\(t = \\frac{s}{v} = \\frac{${s}}{${v}} = ${t}\\ \\text{s}\\)</p>` });
  });
  serija("povprecna", 5, (r) => {
    const s1 = r.int(2, 30), v1 = r.int(20, 60), s2 = r.int(2, 30), v2 = r.int(60, 130);
    const t = s1 / v1 + s2 / v2, vp = (s1 + s2) / t;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(vp, 3), enota: "km/h", besedilo: `Avto prevozi ${s1} km s hitrostjo ${v1} km/h, nato ${s2} km s hitrostjo ${v2} km/h. Kolikšna je povprečna hitrost na celi poti?`, rezultat: `${T(vp, 1)} km/h`, postopek: `<p>\\(t_1 = \\frac{${s1}}{${v1}}\\ \\text{h}\\), \\(t_2 = \\frac{${s2}}{${v2}}\\ \\text{h}\\), skupaj \\(t \\approx ${L(t, 3)}\\ \\text{h}\\).</p><p>\\(\\bar{v} = \\frac{s_1 + s_2}{t} = \\frac{${s1 + s2}}{${L(t, 3)}} \\approx ${L(vp, 1)}\\ \\text{km/h}\\) (ni povprečje hitrosti!)</p>` });
  });
  serija("pospesek", 6, (r, i) => {
    const v0 = r.int(0, 10), a = r.int(1, 6), t = r.int(2, 12), v = v0 + a * t;
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: a, enota: "m/s²", besedilo: `Hitrost avtomobila se v ${t} s enakomerno poveča z ${v0} m/s na ${v} m/s. Kolikšen je pospešek?`, rezultat: `${a} m/s²`, postopek: `<p>\\(a = \\frac{\\Delta v}{\\Delta t} = \\frac{${v} - ${v0}}{${t}} = ${a}\\ \\text{m/s}^2\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: v, enota: "m/s", besedilo: `Telo z začetno hitrostjo ${v0} m/s pospešuje s pospeškom ${a} m/s². Kolikšna je hitrost po ${t} s?`, rezultat: `${v} m/s`, postopek: `<p>\\(v = v_0 + at = ${v0} + ${a} \\cdot ${t} = ${v}\\ \\text{m/s}\\)</p>` });
  });
  serija("pot-pospeseno", 6, (r) => {
    const v0 = r.int(0, 8), a = r.int(1, 5), t = r.int(2, 10), s = v0 * t + (a * t * t) / 2;
    return kolicina({ tezavnost: 2, vrednost: s, enota: "m", besedilo: `Telo z začetno hitrostjo ${v0} m/s enakomerno pospešuje s pospeškom ${a} m/s². Koliko poti opravi v ${t} s?`, rezultat: `${T(s, 1)} m`, postopek: `<p>\\(s = v_0t + \\frac{at^2}{2} = ${v0} \\cdot ${t} + \\frac{${a} \\cdot ${t * t}}{2} = ${L(s, 1)}\\ \\text{m}\\)</p>` });
  });
  serija("zaviranje", 5, (r, i) => {
    const v = r.int(8, 35), a = r.int(2, 8), s = (v * v) / (2 * a), t = v / a;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(t, 3), enota: "s", besedilo: `Avto vozi s hitrostjo ${v} m/s in zavira s pojemkom ${a} m/s². Po kolikšnem času se ustavi?`, rezultat: `${T(t, 2)} s`, postopek: `<p>\\(t = \\frac{v_0}{a} = \\frac{${v}}{${a}} \\approx ${L(t, 2)}\\ \\text{s}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(s, 3), enota: "m", besedilo: `Avto vozi s hitrostjo ${v} m/s in zavira s pojemkom ${a} m/s². Kolikšna je zavorna pot?`, rezultat: `${T(s, 1)} m`, postopek: `<p>Iz \\(v^2 = v_0^2 - 2as\\) pri \\(v = 0\\): \\(s = \\frac{v_0^2}{2a} = \\frac{${v * v}}{${2 * a}} \\approx ${L(s, 1)}\\ \\text{m}\\)</p>` });
  });
  serija("prosti-pad", 6, (r, i) => {
    const h = r.int(2, 80), t = Math.sqrt((2 * h) / g), v = g * t;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(v, 3), enota: "m/s", besedilo: `Kamen spustimo z višine ${h} m. S kolikšno hitrostjo prileti na tla? (Zanemari upor zraka, \\(g = 9{,}81\\ \\text{m/s}^2\\).)`, rezultat: `${T(v, 1)} m/s`, postopek: `<p>\\(v = \\sqrt{2gh} = \\sqrt{2 \\cdot 9{,}81 \\cdot ${h}} \\approx ${L(v, 1)}\\ \\text{m/s}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t, 3), enota: "s", besedilo: `Kamen spustimo z višine ${h} m. Koliko časa pada? (\\(g = 9{,}81\\ \\text{m/s}^2\\))`, rezultat: `${T(t, 2)} s`, postopek: `<p>\\(h = \\frac{gt^2}{2}\\), \\(t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{${2 * h}}{9{,}81}} \\approx ${L(t, 2)}\\ \\text{s}\\)</p>` });
  });
  serija("navpicni-met", 4, (r) => {
    const v0 = r.int(5, 30), h = (v0 * v0) / (2 * g);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(h, 3), enota: "m", besedilo: `Žogo vržemo navpično navzgor s hitrostjo ${v0} m/s. Kako visoko se dvigne? (\\(g = 9{,}81\\ \\text{m/s}^2\\))`, rezultat: `${T(h, 1)} m`, postopek: `<p>V najvišji točki je \\(v = 0\\): \\(h = \\frac{v_0^2}{2g} = \\frac{${v0 * v0}}{19{,}62} \\approx ${L(h, 1)}\\ \\text{m}\\)</p>` });
  });
  serija("vodoravni-met", 5, (r, i) => {
    const h = r.int(2, 50), v0 = r.int(2, 25), t = Math.sqrt((2 * h) / g), d = v0 * t;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(d, 3), enota: "m", besedilo: `Kamen vržemo vodoravno s hitrostjo ${v0} m/s z višine ${h} m. Kako daleč od mesta meta (vodoravno) pade na tla?`, rezultat: `${T(d, 1)} m`, postopek: `<p>Čas padanja: \\(t = \\sqrt{\\frac{2h}{g}} \\approx ${L(t, 3)}\\ \\text{s}\\).</p><p>Domet: \\(d = v_0 t = ${v0} \\cdot ${L(t, 3)} \\approx ${L(d, 1)}\\ \\text{m}\\)</p>` });
  });
  serija("posevni-met", 4, (r) => {
    const v0 = r.int(8, 30), k = r.izberi([15, 30, 45, 60, 75]), d = (v0 * v0 * Math.sin((2 * k * Math.PI) / 180)) / g;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(d, 3), enota: "m", besedilo: `Žogo vržemo s tal s hitrostjo ${v0} m/s pod kotom ${k}° glede na vodoravnico. Kolikšen je domet? (Zanemari upor zraka.)`, rezultat: `${T(d, 1)} m`, postopek: `<p>\\(d = \\frac{v_0^2 \\sin 2\\alpha}{g} = \\frac{${v0 * v0} \\cdot \\sin ${2 * k}°}{9{,}81} \\approx ${L(d, 1)}\\ \\text{m}\\)</p>` });
  });
  serija("krozenje", 6, (r, i) => {
    const R = r.int(1, 20) / 2, t0 = r.int(1, 10), v = (2 * Math.PI * R) / t0, ar = (v * v) / R;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi(ar, 3), enota: "m/s²", besedilo: `Telo enakomerno kroži po krožnici s polmerom ${L(R, 1)} m z obhodnim časom ${t0} s. Kolikšen je radialni pospešek?`, rezultat: `${T(ar, 2)} m/s²`, postopek: `<p>\\(v = \\frac{2\\pi r}{t_0} \\approx ${L(v, 3)}\\ \\text{m/s}\\)</p><p>\\(a_r = \\frac{v^2}{r} \\approx ${L(ar, 2)}\\ \\text{m/s}^2\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(v, 3), enota: "m/s", besedilo: `Telo enakomerno kroži po krožnici s polmerom ${L(R, 1)} m in naredi en obhod v ${t0} s. Kolikšna je obodna hitrost?`, rezultat: `${T(v, 2)} m/s`, postopek: `<p>\\(v = \\frac{2\\pi r}{t_0} = \\frac{2\\pi \\cdot ${L(R, 1)}}{${t0}} \\approx ${L(v, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("frekvenca", 3, (r) => {
    const n = r.int(10, 3000), f = n / 60;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(2 * Math.PI * f, 4), enota: "s⁻¹", besedilo: `Kolo se zavrti ${n}-krat v minuti. Kolikšna je kotna hitrost?`, rezultat: `${T(2 * Math.PI * f, 2)} s⁻¹`, postopek: `<p>\\(\\nu = \\frac{${n}}{60\\ \\text{s}} \\approx ${L(f, 3)}\\ \\text{s}^{-1}\\), \\(\\omega = 2\\pi\\nu \\approx ${L(2 * Math.PI * f, 2)}\\ \\text{s}^{-1}\\)</p>` });
  });
  serija("dohitevanje", 3, (r) => {
    const v1 = r.int(10, 20), v2 = v1 + r.int(2, 10), d = r.int(50, 500);
    const t = d / (v2 - v1);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 3), enota: "s", besedilo: `Avto A vozi s hitrostjo ${v1} m/s, ${d} m za njim pa avto B s hitrostjo ${v2} m/s v isto smer. Po kolikšnem času ga B dohiti?`, rezultat: `${T(t, 1)} s`, postopek: `<p>Relativna hitrost B glede na A: \\(${v2} - ${v1} = ${v2 - v1}\\ \\text{m/s}\\).</p><p>\\(t = \\frac{${d}}{${v2 - v1}} \\approx ${L(t, 1)}\\ \\text{s}\\)</p>` });
  });
  serija("graf", 4, (r) => {
    const [opis, odg] = r.izberi([
      ["graf \\(v(t)\\) je vodoravna premica nad osjo \\(t\\)", "enakomerno gibanje"],
      ["graf \\(v(t)\\) je naraščajoča premica", "enakomerno pospešeno gibanje"],
      ["graf \\(s(t)\\) je naraščajoča premica", "enakomerno gibanje"],
      ["graf \\(s(t)\\) je vodoravna premica", "mirovanje"],
      ["graf \\(s(t)\\) je parabola (veja navzgor)", "enakomerno pospešeno gibanje"],
      ["graf \\(v(t)\\) je padajoča premica do osi \\(t\\)", "enakomerno pojemajoče gibanje"],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: `Kakšno gibanje opisuje ${opis}?`, pravilna: odg, napacne: ["enakomerno gibanje", "enakomerno pospešeno gibanje", "mirovanje", "enakomerno pojemajoče gibanje"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${opis.charAt(0).toUpperCase() + opis.slice(1)}: ${odg}. Ploščina pod grafom \\(v(t)\\) je pot, naklon grafa \\(s(t)\\) je hitrost.</p>` });
  });
}
