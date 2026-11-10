import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const g = 9.81, G = 6.67e-11, MZ = 5.97e24, RZ = 6.37e6;
const rad = (k) => (k * Math.PI) / 180;

export default function ({ serija, pojmi, vprasanja }) {
  serija("drugi-zakon", 6, (r, i) => {
    const m = r.int(1, 1500), a = r.int(1, 40) / 10, F = m * a;
    if (i % 3 === 0) return kolicina({ tezavnost: 1, vrednost: F, enota: "N", besedilo: `Kolikšna rezultanta sil daje telesu z maso ${m} kg pospešek ${L(a, 1)} m/s²?`, rezultat: `${T(F, 1)} N`, postopek: `<p>\\(F = ma = ${m} \\cdot ${L(a, 1)} = ${L(F, 1)}\\ \\text{N}\\)</p>` });
    if (i % 3 === 1) return kolicina({ tezavnost: 1, vrednost: a, enota: "m/s²", besedilo: `Na telo z maso ${m} kg deluje rezultanta sil ${L(F, 1)} N. Kolikšen je pospešek?`, rezultat: `${T(a, 1)} m/s²`, postopek: `<p>\\(a = \\frac{F}{m} = \\frac{${L(F, 1)}}{${m}} = ${L(a, 1)}\\ \\text{m/s}^2\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: m, enota: "kg", besedilo: `Sila ${L(F, 1)} N daje telesu pospešek ${L(a, 1)} m/s². Kolikšna je masa telesa?`, rezultat: `${m} kg`, postopek: `<p>\\(m = \\frac{F}{a} = ${m}\\ \\text{kg}\\)</p>` });
  });
  serija("vlek-trenje", 5, (r) => {
    const m = r.int(2, 50), F = r.int(20, 300), kt = r.int(1, 5) / 10, Ft = kt * m * g;
    if (F <= Ft) return null;
    const a = (F - Ft) / m;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(a, 4), enota: "m/s²", besedilo: `Zaboj z maso ${m} kg vlečemo po vodoravnih tleh z vodoravno silo ${F} N. Koeficient trenja je ${L(kt, 1)}. Kolikšen je pospešek?`, rezultat: `${T(a, 2)} m/s²`, postopek: `<p>\\(F_t = k_t mg = ${L(Ft, 2)}\\ \\text{N}\\)</p><p>\\(a = \\frac{F - F_t}{m} = \\frac{${F} - ${L(Ft, 2)}}{${m}} \\approx ${L(a, 2)}\\ \\text{m/s}^2\\)</p>` });
  });
  serija("dvigalo", 6, (r, i) => {
    const m = r.int(40, 100), a = r.int(1, 30) / 10, gor = i % 2 === 0;
    const N = m * (g + (gor ? a : -a));
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(N, 4), enota: "N", besedilo: `Človek z maso ${m} kg stoji na tehtnici v dvigalu, ki ${gor ? "pospešuje navzgor" : "pospešuje navzdol"} s pospeškom ${L(a, 1)} m/s². Kolikšno silo kaže tehtnica?`, rezultat: `${T(N, 1)} N`, postopek: `<p>Drugi Newtonov zakon za človeka: \\(N - mg = m \\cdot (${gor ? "+" : "-"}a)\\).</p><p>\\(N = m(g ${gor ? "+" : "-"} a) = ${m} \\cdot (9{,}81 ${gor ? "+" : "-"} ${L(a, 1)}) \\approx ${L(N, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("klanec-pospesek", 4, (r) => {
    const k = r.izberi([10, 15, 20, 25, 30, 40]), kt = r.int(0, 3) / 10;
    const a = g * (Math.sin(rad(k)) - kt * Math.cos(rad(k)));
    if (a <= 0) return null;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(a, 4), enota: "m/s²", besedilo: `Telo drsi po klancu z naklonom ${k}°${kt ? `, koeficient trenja je ${L(kt, 1)}` : " brez trenja"}. Kolikšen je pospešek?`, rezultat: `${T(a, 2)} m/s²`, postopek: `<p>\\(a = g(\\sin\\alpha - k_t\\cos\\alpha) = 9{,}81 \\cdot (\\sin ${k}° - ${L(kt, 1)} \\cdot \\cos ${k}°) \\approx ${L(a, 2)}\\ \\text{m/s}^2\\)</p>` });
  });
  serija("dve-telesi", 4, (r) => {
    const m1 = r.int(1, 10), m2 = r.int(1, 10);
    if (m1 === m2) return null;
    const a = (Math.abs(m1 - m2) * g) / (m1 + m2), F = (2 * m1 * m2 * g) / (m1 + m2);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(a, 4), enota: "m/s²", besedilo: `Uteži z masama ${m1} kg in ${m2} kg visita na lahki vrvici čez lahek škripec brez trenja. Kolikšen je pospešek uteži?`, rezultat: `${T(a, 2)} m/s² (sila v vrvici ${T(F, 1)} N)`, postopek: `<p>Za sistem: \\((m_1 + m_2)a = |m_1 - m_2|g\\).</p><p>\\(a = \\frac{${Math.abs(m1 - m2)} \\cdot 9{,}81}{${m1 + m2}} \\approx ${L(a, 2)}\\ \\text{m/s}^2\\)</p>` });
  });
  serija("vozicka", 3, (r) => {
    const m1 = r.int(1, 10), m2 = r.int(1, 10), F = r.int(5, 60);
    const a = F / (m1 + m2), Fv = m2 * a;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(Fv, 4), enota: "N", besedilo: `Vozička z masama ${m1} kg in ${m2} kg sta povezana z vrvico. Prvega vlečemo s silo ${F} N po gladki podlagi. Kolikšna je sila v vrvici med njima?`, rezultat: `${T(Fv, 2)} N`, postopek: `<p>\\(a = \\frac{F}{m_1 + m_2} = \\frac{${F}}{${m1 + m2}} \\approx ${L(a, 3)}\\ \\text{m/s}^2\\)</p><p>Vrvica pospešuje drugi voziček: \\(F_v = m_2 a \\approx ${L(Fv, 2)}\\ \\text{N}\\)</p>` });
  });
  serija("centripetalna", 4, (r) => {
    const m = r.int(1, 1500), v = r.int(2, 30), R = r.int(5, 200);
    return kolicina({ tezavnost: 2, vrednost: (m * v * v) / R, enota: "N", besedilo: `Avto z maso ${m} kg vozi skozi ovinek s polmerom ${R} m s hitrostjo ${v} m/s. Kolikšna je potrebna radialna sila?`, rezultat: `${T((m * v * v) / R, 1)} N`, postopek: `<p>\\(F_r = \\frac{mv^2}{r} = \\frac{${m} \\cdot ${v * v}}{${R}} \\approx ${L((m * v * v) / R, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("ovinek-trenje", 3, (r) => {
    const R = r.int(10, 200), kt = r.int(2, 9) / 10, v = Math.sqrt(kt * g * R);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v, 4), enota: "m/s", besedilo: `S kolikšno največjo hitrostjo lahko avto pelje skozi vodoravni ovinek s polmerom ${R} m, če je koeficient lepenja ${L(kt, 1)}?`, rezultat: `${T(v, 1)} m/s`, postopek: `<p>Lepenje zagotavlja radialno silo: \\(\\frac{mv^2}{r} \\le k_l mg\\).</p><p>\\(v = \\sqrt{k_l g r} = \\sqrt{${L(kt, 1)} \\cdot 9{,}81 \\cdot ${R}} \\approx ${L(v, 1)}\\ \\text{m/s}\\)</p>` });
  });
  serija("gravitacijska", 5, (r) => {
    const m1 = r.int(1, 100), m2 = r.int(1, 100), d = r.int(1, 20) / 10;
    const F = (G * m1 * m2) / (d * d);
    return kolicina({ tezavnost: 2, vrednost: F, tol: 0.02, enota: "N", besedilo: `Kolikšna je gravitacijska sila med kroglama z masama ${m1} kg in ${m2} kg, katerih središči sta ${L(d, 1)} m narazen? (\\(G = 6{,}67 \\cdot 10^{-11}\\ \\text{Nm}^2/\\text{kg}^2\\); vpiši npr. 3,2e-8.)`, rezultat: `\\(${sci(F)}\\) N`, postopek: `<p>\\(F = G\\frac{m_1 m_2}{r^2} = 6{,}67 \\cdot 10^{-11} \\cdot \\frac{${m1} \\cdot ${m2}}{${L(d * d, 2)}} \\approx ${sci(F)}\\ \\text{N}\\)</p>` });
  });
  serija("razmerje", 5, (r) => {
    const k = r.izberi([2, 3, 4, 0.5]), kaj = r.izberi(["razdalja", "masa"]);
    const f = kaj === "razdalja" ? 1 / (k * k) : k;
    return kolicina({ tezavnost: 2, vrednost: f, enota: "", besedilo: `Kolikokrat se spremeni gravitacijska sila med telesoma, če ${kaj === "razdalja" ? `razdaljo med njima povečamo ${L(k, 1)}-krat` : `maso enega telesa povečamo ${L(k, 1)}-krat`}? (Vpiši faktor, npr. 0,25.)`, rezultat: `${T(f, 4)}-krat`, postopek: kaj === "razdalja" ? `<p>\\(F \\propto \\frac{1}{r^2}\\): faktor \\(\\frac{1}{${L(k, 1)}^2} = ${L(f, 4)}\\)</p>` : `<p>\\(F \\propto m\\): faktor ${L(f, 1)}.</p>` });
  });
  serija("g-visina", 4, (r) => {
    const h = r.int(1, 40) * 100e3, gh = (G * MZ) / (RZ + h) ** 2;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(gh, 4), tol: 0.02, enota: "m/s²", besedilo: `Kolikšen je gravitacijski pospešek na višini ${h / 1000} km nad površjem Zemlje? (\\(M_Z = 5{,}97 \\cdot 10^{24}\\) kg, \\(R_Z = 6370\\) km)`, rezultat: `${T(gh, 2)} m/s²`, postopek: `<p>\\(g(h) = \\frac{GM_Z}{(R_Z + h)^2} = \\frac{6{,}67 \\cdot 10^{-11} \\cdot 5{,}97 \\cdot 10^{24}}{(${sci(RZ + h)})^2} \\approx ${L(gh, 2)}\\ \\text{m/s}^2\\)</p>` });
  });
  serija("satelit", 4, (r, i) => {
    const h = r.int(2, 40) * 100e3, R = RZ + h, v = Math.sqrt((G * MZ) / R), t0 = (2 * Math.PI * R) / v;
    if (i % 2) return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t0 / 60, 3), tol: 0.02, enota: "min", besedilo: `Satelit kroži ${h / 1000} km nad površjem Zemlje. Kolikšen je njegov obhodni čas v minutah? (\\(M_Z = 5{,}97 \\cdot 10^{24}\\) kg, \\(R_Z = 6370\\) km)`, rezultat: `${T(t0 / 60, 1)} min`, postopek: `<p>Gravitacija je radialna sila: \\(v = \\sqrt{\\frac{GM_Z}{r}} \\approx ${L(v, 0)}\\ \\text{m/s}\\).</p><p>\\(t_0 = \\frac{2\\pi r}{v} \\approx ${L(t0, 0)}\\ \\text{s} \\approx ${L(t0 / 60, 1)}\\ \\text{min}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v, 0), tol: 0.02, enota: "m/s", besedilo: `S kolikšno hitrostjo kroži satelit ${h / 1000} km nad površjem Zemlje? (\\(M_Z = 5{,}97 \\cdot 10^{24}\\) kg, \\(R_Z = 6370\\) km)`, rezultat: `${T(v, 0)} m/s`, postopek: `<p>\\(\\frac{mv^2}{r} = \\frac{GmM_Z}{r^2}\\), \\(v = \\sqrt{\\frac{GM_Z}{R_Z + h}} \\approx ${L(v, 0)}\\ \\text{m/s}\\)</p>` });
  });
  serija("kepler", 3, (r) => {
    const a = r.izberi([1.52, 5.2, 9.58, 0.72, 0.39, 19.2]), t = Math.sqrt(a ** 3);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 3), tol: 0.02, enota: "let", besedilo: `Planet kroži okoli Sonca na povprečni razdalji ${L(a, 2)} a.e. Kolikšen je njegov obhodni čas v letih? (Zemlja: 1 a.e., 1 leto)`, rezultat: `${T(t, 2)} let`, postopek: `<p>Tretji Keplerjev zakon: \\(\\frac{t_0^2}{a^3}\\) je enako za vse planete, zato \\(t_0 = \\sqrt{${L(a, 2)}^3} \\approx ${L(t, 2)}\\) let.</p>` });
  });
  pojmi([
    ["prvi Newtonov zakon", "Telo miruje ali se giblje premo enakomerno, dokler je vsota sil nanj enaka nič.", { brezVpisa: true }],
    ["drugi Newtonov zakon", "Pospešek telesa je sorazmeren z rezultanto sil in obratno sorazmeren z maso.", { brezVpisa: true }],
    ["tretji Newtonov zakon", "Če telo A deluje na telo B s silo, deluje B na A z enako veliko, nasprotno usmerjeno silo.", { brezVpisa: true }],
    ["vztrajnost", "Lastnost telesa, da ohranja stanje gibanja; meri jo masa."],
    ["breztežnost", "Stanje, ko telo prosto pada in podlaga nanj ne deluje s silo."],
    ["inercialni sistem", "Opazovalni sistem, v katerem velja prvi Newtonov zakon."],
  ]);
  vprasanja([
    [2, "Avto pelje enakomerno po ravni cesti. Kolikšna je rezultanta sil nanj?", "nič", ["enaka teži avta", "enaka sili motorja", "usmerjena naprej"], "Pri enakomernem premem gibanju je pospešek 0, zato po 2. zakonu tudi rezultanta."],
    [3, "Človek potiska steno s silo 200 N. S kolikšno silo deluje stena nanj?", "200 N, usmerjeno proti človeku", ["0 N", "200 N v smeri stene", "manj kot 200 N"], "Tretji Newtonov zakon: sili sta enako veliki in nasprotno usmerjeni."],
    [3, "Kako se spremeni teža astronavta na Luni v primerjavi z Zemljo?", "zmanjša se, masa ostane enaka", ["zmanjša se tudi masa", "ostane enaka", "poveča se"], "Teža je \\(mg\\), na Luni je \\(g\\) približno šestkrat manjši; masa je lastnost telesa."],
    [4, "Telo kroži enakomerno. Kaj velja za rezultanto sil nanj?", "kaže proti središču kroženja", ["je nič", "kaže v smeri hitrosti", "kaže stran od središča"], "Pri enakomernem kroženju je pospešek radialen, zato tudi rezultanta.", "visja"],
  ]);
}
