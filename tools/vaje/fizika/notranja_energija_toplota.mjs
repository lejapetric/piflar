import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const SNOVI = [["voda", 4200], ["aluminij", 880], ["železo", 450], ["baker", 390], ["led", 2100], ["olje", 2000]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("toplota", 7, (r, i) => {
    const [ime, c] = r.izberi(SNOVI), m = r.int(1, 50) / 10, dT = r.int(5, 80), Q = m * c * dT;
    if (i % 3 === 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(Q / (c * m), 4), enota: "K", besedilo: `Snovi (${ime}, \\(c = ${c}\\ \\text{J/(kg K)}\\)) z maso ${L(m, 1)} kg dovedemo ${L(Q / 1000, 1)} kJ toplote. Za koliko se ji zviša temperatura?`, rezultat: `${dT} K`, postopek: `<p>\\(\\Delta T = \\frac{Q}{mc} = \\frac{${L(Q, 0)}}{${L(m, 1)} \\cdot ${c}} = ${dT}\\ \\text{K}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: Q, enota: "J", besedilo: `Koliko toplote potrebujemo, da ${L(m, 1)} kg snovi (${ime}, \\(c = ${c}\\ \\text{J/(kg K)}\\)) segrejemo za ${dT} K?`, rezultat: `${T(Q / 1000, 2)} kJ`, postopek: `<p>\\(Q = mc\\Delta T = ${L(m, 1)} \\cdot ${c} \\cdot ${dT} = ${L(Q, 0)}\\ \\text{J}\\)</p>` });
  });
  serija("mesanje", 6, (r) => {
    const m1 = r.int(1, 20) / 10, t1 = r.int(5, 30), m2 = r.int(1, 20) / 10, t2 = r.int(50, 95);
    const t = (m1 * t1 + m2 * t2) / (m1 + m2);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t, 4), enota: "°C", besedilo: `Zmešamo ${L(m1, 1)} kg vode s temperaturo ${t1} °C in ${L(m2, 1)} kg vode s temperaturo ${t2} °C. Kolikšna je končna temperatura (brez izgub)?`, rezultat: `${T(t, 1)} °C`, postopek: `<p>Oddana toplota = prejeta toplota: \\(m_1c(t - t_1) = m_2c(t_2 - t)\\).</p><p>\\(t = \\frac{m_1t_1 + m_2t_2}{m_1 + m_2} = \\frac{${L(m1 * t1, 1)} + ${L(m2 * t2, 1)}}{${L(m1 + m2, 1)}} \\approx ${L(t, 1)}\\ °\\text{C}\\)</p>` });
  });
  serija("mesanje-kovina", 4, (r) => {
    const [ime, c] = r.izberi(SNOVI.slice(1, 4)), mk = r.int(1, 10) / 10, tk = r.int(80, 300), mv = r.int(2, 20) / 10, tv = r.int(10, 25);
    const t = (mk * c * tk + mv * 4200 * tv) / (mk * c + mv * 4200);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(t, 4), enota: "°C", besedilo: `Kos snovi (${ime}, \\(c = ${c}\\) J/(kg K)) z maso ${L(mk, 1)} kg in temperaturo ${tk} °C vržemo v ${L(mv, 1)} kg vode s temperaturo ${tv} °C. Kolikšna je končna temperatura? (\\(c_v = 4200\\) J/(kg K))`, rezultat: `${T(t, 1)} °C`, postopek: `<p>\\(m_kc_k(t_k - t) = m_vc_v(t - t_v)\\)</p><p>\\(t = \\frac{m_kc_kt_k + m_vc_vt_v}{m_kc_k + m_vc_v} \\approx ${L(t, 1)}\\ °\\text{C}\\)</p>` });
  });
  serija("talilna", 5, (r, i) => {
    const m = r.int(1, 50) / 10;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: m * 2.26e6, enota: "J", besedilo: `Koliko toplote potrebujemo, da izparimo ${L(m, 1)} kg vode pri 100 °C? (\\(q_i = 2{,}26\\) MJ/kg)`, rezultat: `${T(m * 2.26, 2)} MJ`, postopek: `<p>\\(Q = mq_i = ${L(m, 1)} \\cdot 2{,}26 \\cdot 10^6 \\approx ${sci(m * 2.26e6)}\\ \\text{J}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: m * 336000, enota: "J", besedilo: `Koliko toplote potrebujemo, da stalimo ${L(m, 1)} kg ledu pri 0 °C? (\\(q_t = 336\\) kJ/kg)`, rezultat: `${T(m * 336, 1)} kJ`, postopek: `<p>\\(Q = mq_t = ${L(m, 1)} \\cdot 336\\,000 = ${L(m * 336000, 0)}\\ \\text{J}\\)</p>` });
  });
  serija("led-v-paro", 3, (r) => {
    const m = r.int(1, 20) / 10, t0 = -r.int(5, 30);
    const Q = m * (2100 * -t0 + 336000 + 4200 * 100);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: Q, enota: "J", besedilo: `Koliko toplote potrebujemo, da ${L(m, 1)} kg ledu s temperaturo ${t0} °C spremenimo v vodo s temperaturo 100 °C? (\\(c_l = 2100\\), \\(c_v = 4200\\) J/(kg K), \\(q_t = 336\\) kJ/kg)`, rezultat: `${T(Q / 1000, 1)} kJ`, postopek: `<p>Segrevanje ledu: \\(${L(m * 2100 * -t0, 0)}\\) J; taljenje: \\(${L(m * 336000, 0)}\\) J; segrevanje vode: \\(${L(m * 420000, 0)}\\) J.</p><p>Skupaj \\(Q \\approx ${L(Q / 1000, 1)}\\ \\text{kJ}\\)</p>` });
  });
  serija("led-v-vodi", 3, (r) => {
    const mv = r.int(5, 30) / 10, tv = r.int(30, 80), ml = r.int(1, 5) / 10;
    // privzamemo, da se ves led stali
    const t = (mv * 4200 * tv - ml * 336000) / ((mv + ml) * 4200);
    if (t <= 0) return null;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 4), enota: "°C", besedilo: `V ${L(mv, 1)} kg vode s temperaturo ${tv} °C vržemo ${L(ml, 1)} kg ledu z 0 °C. Kolikšna je končna temperatura? (\\(q_t = 336\\) kJ/kg, \\(c_v = 4200\\) J/(kg K))`, rezultat: `${T(t, 1)} °C`, postopek: `<p>\\(m_vc_v(t_v - t) = m_lq_t + m_lc_v(t - 0)\\)</p><p>\\(t = \\frac{m_vc_vt_v - m_lq_t}{(m_v + m_l)c_v} \\approx ${L(t, 1)}\\ °\\text{C}\\) (ves led se stali, ker je \\(t > 0\\)).</p>` });
  });
  serija("prvi-zakon", 6, (r, i) => {
    const Q = r.int(-500, 1000), A = r.int(-500, 500);
    return kolicina({ tezavnost: 2, vrednost: Q + A, enota: "J", besedilo: `Plin ${Q >= 0 ? `prejme ${Q} J toplote` : `odda ${-Q} J toplote`}, okolica pa ${A >= 0 ? `nad njim opravi ${A} J dela` : `plin opravi ${-A} J dela`}. Za koliko se spremeni notranja energija plina?`, rezultat: `${Q + A} J`, postopek: `<p>Prvi zakon termodinamike: \\(\\Delta W_n = Q + A\\) (A je delo okolice nad plinom).</p><p>\\(\\Delta W_n = ${Q} + ${A < 0 ? `(${A})` : A} = ${Q + A}\\ \\text{J}\\)</p>` });
  });
  serija("delo-plina", 3, (r) => {
    const p = r.int(100, 500) * 1000, dV = r.int(1, 50) / 1000;
    return kolicina({ tezavnost: 3, vrednost: p * dV, enota: "J", besedilo: `Plin se pri stalnem tlaku ${p / 1000} kPa razpne za ${L(dV * 1000, 0)} L. Koliko dela opravi?`, rezultat: `${T(p * dV, 0)} J`, postopek: `<p>\\(A = p\\Delta V = ${p} \\cdot ${L(dV, 3)} = ${L(p * dV, 0)}\\ \\text{J}\\)</p>` });
  });
  serija("prevajanje", 4, (r) => {
    const lam = r.izberi([0.04, 0.8, 1.0, 0.6]), S = r.int(1, 20), d = r.int(1, 30) / 100, dT = r.int(5, 30);
    const P = (lam * S * dT) / d;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(P, 3), enota: "W", besedilo: `Kolikšen toplotni tok teče skozi steno s ploščino ${S} m², debelino ${L(d * 100, 0)} cm in toplotno prevodnostjo ${L(lam, 2)} W/(m K), če je temperaturna razlika ${dT} K?`, rezultat: `${T(P, 1)} W`, postopek: `<p>\\(P = \\lambda\\frac{S\\Delta T}{d} = ${L(lam, 2)} \\cdot \\frac{${S} \\cdot ${dT}}{${L(d, 2)}} \\approx ${L(P, 1)}\\ \\text{W}\\)</p>` });
  });
  serija("grelnik", 4, (r) => {
    const P = r.izberi([1000, 1500, 2000, 2200]), m = r.int(5, 20) / 10, dT = r.int(20, 80);
    const t = (m * 4200 * dT) / P;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t, 3), enota: "s", besedilo: `Grelnik z močjo ${P} W segreva ${L(m, 1)} kg vode. Koliko časa traja, da se voda segreje za ${dT} K (brez izgub)?`, rezultat: `${T(t, 0)} s`, postopek: `<p>\\(Pt = mc\\Delta T\\), \\(t = \\frac{${L(m, 1)} \\cdot 4200 \\cdot ${dT}}{${P}} \\approx ${L(t, 0)}\\ \\text{s}\\)</p>` });
  });
  serija("toplotni-stroj", 3, (r) => {
    const T1 = r.int(400, 900), T2 = r.int(270, 350), eta = 1 - T2 / T1;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(eta * 100, 3), enota: "%", besedilo: `Kolikšen je največji (Carnotov) izkoristek toplotnega stroja, ki deluje med ${T1} K in ${T2} K?`, rezultat: `${T(eta * 100, 1)} %`, postopek: `<p>\\(\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{${T2}}{${T1}} \\approx ${L(eta, 3)}\\)</p>` });
  });
  pojmi([
    ["notranja energija", "Vsota kinetičnih in potencialnih energij vseh gradnikov snovi."],
    ["specifična toplota", "Toplota, ki jo potrebuje 1 kg snovi, da se segreje za 1 K."],
    ["talilna toplota", "Toplota, ki je potrebna, da se 1 kg snovi pri tališču stali."],
    ["izparilna toplota", "Toplota, ki je potrebna, da 1 kg tekočine pri vrelišču izpari."],
    ["prevajanje toplote", "Prenos toplote skozi snov brez prenosa snovi, s trki gradnikov."],
    ["konvekcija", "Prenos toplote s tokom tekočine ali plina."],
    ["sevanje", "Prenos toplote z elektromagnetnim valovanjem, tudi skozi vakuum."],
  ]);
  vprasanja([
    [3, "Med taljenjem ledu dovajamo toploto. Kaj se dogaja s temperaturo mešanice?", "ostane 0 °C, dokler se ves led ne stali", ["enakomerno narašča", "pada", "najprej pada, nato raste"], "Toplota se porablja za spremembo agregatnega stanja."],
  ]);
}
