import { kolicina, izbira, T, L, zaokrozi } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("gibalna", 6, (r, i) => {
    const m = r.int(1, 2000) / (i % 2 ? 1 : 10), v = r.int(1, 40);
    return kolicina({ tezavnost: 1, vrednost: m * v, enota: "kg m/s", besedilo: `Kolikšna je gibalna količina telesa z maso ${L(m, 1)} kg, ki se giblje s hitrostjo ${v} m/s?`, rezultat: `${T(m * v, 1)} kg m/s`, postopek: `<p>\\(G = mv = ${L(m, 1)} \\cdot ${v} = ${L(m * v, 1)}\\ \\text{kg m/s}\\)</p>` });
  });
  serija("sunek", 6, (r, i) => {
    const F = r.int(10, 2000), t = r.int(1, 50) / 100, m = r.int(1, 20) / 10;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (F * t) / m, enota: "m/s", besedilo: `Na mirujočo žogo z maso ${L(m, 1)} kg deluje sila ${F} N v času ${L(t, 2)} s. S kolikšno hitrostjo odleti?`, rezultat: `${T((F * t) / m, 1)} m/s`, postopek: `<p>Sunek sile je sprememba gibalne količine: \\(F\\Delta t = mv\\).</p><p>\\(v = \\frac{F\\Delta t}{m} = \\frac{${F} \\cdot ${L(t, 2)}}{${L(m, 1)}} \\approx ${L((F * t) / m, 1)}\\ \\text{m/s}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: F * t, enota: "Ns", besedilo: `Sila ${F} N deluje ${L(t, 2)} s. Kolikšen je sunek sile?`, rezultat: `${T(F * t, 2)} Ns`, postopek: `<p>\\(I = F\\Delta t = ${F} \\cdot ${L(t, 2)} = ${L(F * t, 2)}\\ \\text{Ns}\\)</p>` });
  });
  serija("sila-trk", 4, (r) => {
    const m = r.int(5, 50) / 100, v1 = r.int(5, 30), v2 = r.int(0, 20), t = r.int(1, 20) / 1000;
    const F = (m * (v1 + v2)) / t;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(F, 2), enota: "N", besedilo: `Žoga z maso ${L(m * 1000, 0)} g prileti pravokotno v steno s hitrostjo ${v1} m/s in se odbije s hitrostjo ${v2} m/s. Trk traja ${L(t * 1000, 0)} ms. Kolikšna je povprečna sila stene na žogo?`, rezultat: `${T(F, 0)} N`, postopek: `<p>Smer se obrne: \\(\\Delta G = m(v_2 + v_1) = ${L(m, 2)} \\cdot ${v1 + v2} = ${L(m * (v1 + v2), 3)}\\ \\text{kg m/s}\\).</p><p>\\(F = \\frac{\\Delta G}{\\Delta t} = \\frac{${L(m * (v1 + v2), 3)}}{${L(t, 3)}} \\approx ${L(F, 0)}\\ \\text{N}\\)</p>` });
  });
  serija("neprozni", 6, (r) => {
    const m1 = r.int(1, 20), m2 = r.int(1, 20), v1 = r.int(1, 20), v2 = r.int(-10, 10);
    const v = (m1 * v1 + m2 * v2) / (m1 + m2);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(v, 4) || 0, enota: "m/s", besedilo: `Voziček z maso ${m1} kg in hitrostjo ${v1} m/s trči v voziček z maso ${m2} kg, ki ${v2 === 0 ? "miruje" : `se giblje s hitrostjo ${Math.abs(v2)} m/s ${v2 > 0 ? "v isti smeri" : "v nasprotni smeri"}`}. Vozička se sprimeta. Kolikšna je njuna skupna hitrost? (Pozitivna smer je smer prvega vozička.)`, rezultat: `${T(v, 2)} m/s`, postopek: `<p>Ohranitev gibalne količine: \\(m_1v_1 + m_2v_2 = (m_1 + m_2)v\\).</p><p>\\(v = \\frac{${m1} \\cdot ${v1} + ${m2} \\cdot ${v2 < 0 ? `(${v2})` : v2}}{${m1 + m2}} \\approx ${L(v, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("izgube", 4, (r) => {
    const m1 = r.int(1, 10), m2 = r.int(1, 10), v1 = r.int(2, 15);
    const v = (m1 * v1) / (m1 + m2), W = 0.5 * m1 * v1 * v1 - 0.5 * (m1 + m2) * v * v;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(W, 3), enota: "J", besedilo: `Telo z maso ${m1} kg in hitrostjo ${v1} m/s se zaleti v mirujoče telo z maso ${m2} kg in se z njim sprime. Koliko kinetične energije se pri trku pretvori v notranjo?`, rezultat: `${T(W, 1)} J`, postopek: `<p>\\(v = \\frac{m_1v_1}{m_1 + m_2} = ${L(v, 3)}\\ \\text{m/s}\\)</p><p>\\(\\Delta W = \\frac{m_1v_1^2}{2} - \\frac{(m_1 + m_2)v^2}{2} = ${L(0.5 * m1 * v1 * v1, 1)} - ${L(0.5 * (m1 + m2) * v * v, 1)} \\approx ${L(W, 1)}\\ \\text{J}\\)</p>` });
  });
  serija("odboj", 4, (r) => {
    const m = r.int(40, 100), M = r.int(1, 10), v = r.int(1, 15);
    const V = (M * v) / m;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(V, 4), enota: "m/s", besedilo: `Drsalec z maso ${m} kg miruje na ledu in vrže žogo z maso ${M} kg s hitrostjo ${v} m/s. S kolikšno hitrostjo se odmakne drsalec?`, rezultat: `${T(V, 2)} m/s`, postopek: `<p>Na začetku je gibalna količina 0: \\(0 = Mv - mV\\).</p><p>\\(V = \\frac{Mv}{m} = \\frac{${M} \\cdot ${v}}{${m}} \\approx ${L(V, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("razpad", 4, (r) => {
    const m = r.int(2, 20), k = r.int(1, m - 1), v1 = r.int(2, 30);
    const v2 = (k * v1) / (m - k);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v2, 4), enota: "m/s", besedilo: `Mirujoče telo z maso ${m} kg razpade na dva dela. Del z maso ${k} kg odleti s hitrostjo ${v1} m/s. S kolikšno hitrostjo odleti drugi del?`, rezultat: `${T(v2, 2)} m/s (v nasprotni smeri)`, postopek: `<p>\\(0 = m_1v_1 - m_2v_2\\), \\(m_2 = ${m - k}\\) kg.</p><p>\\(v_2 = \\frac{${k} \\cdot ${v1}}{${m - k}} \\approx ${L(v2, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("prozni", 4, (r) => {
    const m1 = r.int(1, 10), m2 = r.int(1, 10), v1 = r.int(2, 12);
    const u1 = ((m1 - m2) * v1) / (m1 + m2), u2 = (2 * m1 * v1) / (m1 + m2);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(u2, 4), enota: "m/s", besedilo: `Krogla z maso ${m1} kg in hitrostjo ${v1} m/s centralno in prožno trči v mirujočo kroglo z maso ${m2} kg. S kolikšno hitrostjo se giblje druga krogla po trku?`, rezultat: `${T(u2, 2)} m/s (prva: ${T(u1, 2)} m/s)`, postopek: `<p>Pri prožnem trku se ohranita gibalna količina in kinetična energija. Rešitev za mirujočo drugo kroglo:</p><p>\\(u_2 = \\frac{2m_1}{m_1 + m_2}v_1 = \\frac{${2 * m1}}{${m1 + m2}} \\cdot ${v1} \\approx ${L(u2, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("balisticno", 3, (r) => {
    const m = r.int(5, 30) / 1000, M = r.int(1, 5), h = r.int(2, 20) / 100;
    const V = Math.sqrt(2 * 9.81 * h), v = ((m + M) * V) / m;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 2), tol: 0.02, enota: "m/s", besedilo: `Krogla z maso ${L(m * 1000, 0)} g se zarije v viseči les z maso ${M} kg, ki se nato dvigne za ${L(h * 100, 0)} cm. Kolikšna je bila hitrost krogle?`, rezultat: `${T(v, 0)} m/s`, postopek: `<p>Po trku: \\(V = \\sqrt{2gh} \\approx ${L(V, 3)}\\ \\text{m/s}\\).</p><p>Pri trku se ohrani gibalna količina: \\(mv = (m + M)V\\), \\(v \\approx ${L(v, 0)}\\ \\text{m/s}\\)</p>` });
  });
  serija("raketa", 3, (r) => {
    const dm = r.int(1, 20), u = r.int(500, 3000), F = dm * u;
    return kolicina({ tezavnost: 3, vrednost: F, enota: "N", besedilo: `Raketa vsako sekundo izpusti ${dm} kg plinov s hitrostjo ${u} m/s glede na raketo. Kolikšna je potisna sila?`, rezultat: `${F} N`, postopek: `<p>\\(F = \\frac{\\Delta m}{\\Delta t}u = ${dm} \\cdot ${u} = ${F}\\ \\text{N}\\)</p>` });
  });
  pojmi([
    ["gibalna količina", "Produkt mase in hitrosti telesa; je vektor v smeri hitrosti."],
    ["sunek sile", "Produkt sile in časa delovanja; enak je spremembi gibalne količine."],
    ["prožni trk", "Trk, pri katerem se ohranita gibalna količina in kinetična energija."],
    ["neprožni trk", "Trk, pri katerem se telesi sprimeta in del kinetične energije preide v notranjo."],
    ["zaprt sistem", "Skupina teles, na katero ne delujejo zunanje sile (ali je njihova vsota nič)."],
    ["izrek o ohranitvi gibalne količine", "V zaprtem sistemu je skupna gibalna količina ves čas enaka.", { brezVpisa: true }],
  ]);
  vprasanja([
    [2, "Zakaj ima avto zračne blazine in mečkalne cone?", "podaljšajo čas trka, zato je sila manjša", ["zmanjšajo spremembo gibalne količine na nič", "povečajo hitrost ustavljanja", "zmanjšajo maso potnika"], "Sprememba gibalne količine je enaka, pri daljšem \\(\\Delta t\\) je \\(F = \\Delta G/\\Delta t\\) manjša."],
    [3, "Ali se pri neprožnem trku ohrani gibalna količina?", "Da", ["Ne"], "Gibalna količina se ohrani pri vsakem trku v zaprtem sistemu; ne ohrani se kinetična energija."],
  ]);
}
