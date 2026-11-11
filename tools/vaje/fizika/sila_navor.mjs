import { kolicina, izbira, T, L, zaokrozi } from "../lib.mjs";
const g = 9.81;
const rad = (k) => (k * Math.PI) / 180;

export default function ({ serija, pojmi, vprasanja }) {
  serija("teza", 4, (r) => {
    const m = r.int(1, 120);
    return kolicina({ tezavnost: 1, vrednost: m * g, enota: "N", besedilo: `Kolikšna je teža telesa z maso ${m} kg? (\\(g = 9{,}81\\ \\text{m/s}^2\\))`, rezultat: `${T(m * g, 1)} N`, postopek: `<p>\\(F_g = mg = ${m} \\cdot 9{,}81 = ${L(m * g, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("vzmet", 6, (r, i) => {
    const k = r.int(10, 500), x = r.int(1, 20) / 100;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: k, enota: "N/m", besedilo: `Vzmet se pod silo ${L(k * x, 2)} N raztegne za ${L(x * 100, 0)} cm. Kolikšen je koeficient vzmeti?`, rezultat: `${k} N/m`, postopek: `<p>\\(k = \\frac{F}{x} = \\frac{${L(k * x, 2)}}{${L(x, 2)}} = ${k}\\ \\text{N/m}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: k * x, enota: "N", besedilo: `Vzmet s koeficientom ${k} N/m raztegnemo za ${L(x * 100, 0)} cm. Kolikšna je sila vzmeti?`, rezultat: `${T(k * x, 2)} N`, postopek: `<p>Hookov zakon: \\(F = kx = ${k} \\cdot ${L(x, 2)} = ${L(k * x, 2)}\\ \\text{N}\\)</p>` });
  });
  serija("rezultanta", 6, (r, i) => {
    const a = r.int(2, 30), b = r.int(2, 30), k = [0, 180, 90, 60, 120, 90][i % 6];
    const R = Math.sqrt(a * a + b * b + 2 * a * b * Math.cos(rad(k)));
    return kolicina({ tezavnost: k % 180 === 0 ? 1 : k === 90 ? 2 : 3, vrednost: zaokrozi(R, 4) || 0, enota: "N", besedilo: `Na telo delujeta sili ${a} N in ${b} N, ki oklepata kot ${k}°. Kolikšna je velikost rezultante?`, rezultat: `${T(R, 2)} N`, postopek: k === 0 ? `<p>Sili kažeta v isto smer: \\(F = ${a} + ${b} = ${a + b}\\ \\text{N}\\).</p>` : k === 180 ? `<p>Nasprotni smeri: \\(F = |${a} - ${b}| = ${Math.abs(a - b)}\\ \\text{N}\\).</p>` : `<p>Kosinusni izrek: \\(F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\varphi} = \\sqrt{${a * a} + ${b * b} + 2 \\cdot ${a} \\cdot ${b} \\cdot \\cos ${k}°} \\approx ${L(R, 2)}\\ \\text{N}\\)</p>` });
  });
  serija("komponente", 4, (r, i) => {
    const F = r.int(5, 100), k = r.izberi([20, 30, 37, 45, 53, 60, 70]);
    const kaj = i % 2 ? "navpična" : "vodoravna", v = kaj === "vodoravna" ? F * Math.cos(rad(k)) : F * Math.sin(rad(k));
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(v, 4), enota: "N", besedilo: `Sila ${F} N oklepa z vodoravnico kot ${k}°. Kolikšna je njena ${kaj} komponenta?`, rezultat: `${T(v, 2)} N`, postopek: `<p>\\(F_${kaj === "vodoravna" ? "x = F\\cos" : "y = F\\sin"}\\alpha = ${F} \\cdot ${kaj === "vodoravna" ? "\\cos" : "\\sin"} ${k}° \\approx ${L(v, 2)}\\ \\text{N}\\)</p>` });
  });
  serija("navor", 6, (r, i) => {
    const F = r.int(5, 200), rr = r.int(5, 80) / 100, k = i % 2 ? 90 : r.izberi([30, 45, 60]);
    const M = F * rr * Math.sin(rad(k));
    return kolicina({ tezavnost: k === 90 ? 1 : 2, vrednost: zaokrozi(M, 4), enota: "Nm", besedilo: `S silo ${F} N delujemo na ključ na razdalji ${L(rr * 100, 0)} cm od osi. Sila oklepa s ključem kot ${k}°. Kolikšen je navor?`, rezultat: `${T(M, 2)} Nm`, postopek: `<p>\\(M = rF\\sin\\varphi = ${L(rr, 2)} \\cdot ${F} \\cdot \\sin ${k}° \\approx ${L(M, 2)}\\ \\text{Nm}\\)</p>` });
  });
  serija("vzvod", 6, (r) => {
    const m1 = r.int(2, 40), r1 = r.int(10, 100), r2 = r.int(10, 150);
    const m2 = (m1 * r1) / r2;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(m2, 4), enota: "kg", besedilo: `Na gugalnici sedi otrok z maso ${m1} kg ${r1} cm od osi. Kolikšno maso mora imeti otrok na drugi strani ${r2} cm od osi, da je gugalnica v ravnovesju?`, rezultat: `${T(m2, 2)} kg`, postopek: `<p>Ravnovesje navorov: \\(m_1 g r_1 = m_2 g r_2\\).</p><p>\\(m_2 = \\frac{m_1 r_1}{r_2} = \\frac{${m1} \\cdot ${r1}}{${r2}} \\approx ${L(m2, 2)}\\ \\text{kg}\\)</p>` });
  });
  serija("klanec", 5, (r, i) => {
    const m = r.int(1, 50), k = r.izberi([10, 15, 20, 30, 40, 45]);
    const Fd = m * g * Math.sin(rad(k)), Fn = m * g * Math.cos(rad(k));
    const kaj = i % 2;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(kaj ? Fn : Fd, 4), enota: "N", besedilo: `Telo z maso ${m} kg leži na klancu z naklonom ${k}°. Kolikšna je ${kaj ? "pravokotna komponenta teže (sila na podlago)" : "dinamična komponenta teže (vzporedna s klancem)"}?`, rezultat: `${T(kaj ? Fn : Fd, 1)} N`, postopek: `<p>\\(F_${kaj ? "\\perp = mg\\cos" : "\\parallel = mg\\sin"}\\alpha = ${m} \\cdot 9{,}81 \\cdot ${kaj ? "\\cos" : "\\sin"} ${k}° \\approx ${L(kaj ? Fn : Fd, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("trenje", 5, (r) => {
    const m = r.int(2, 80), kt = r.int(1, 8) / 10;
    return kolicina({ tezavnost: 2, vrednost: kt * m * g, enota: "N", besedilo: `S kolikšno silo moramo vleči zaboj z maso ${m} kg po vodoravnih tleh, da se giblje enakomerno? Koeficient trenja je ${L(kt, 1)}.`, rezultat: `${T(kt * m * g, 1)} N`, postopek: `<p>Pri enakomernem gibanju je vlečna sila enaka sili trenja: \\(F = k_t mg = ${L(kt, 1)} \\cdot ${m} \\cdot 9{,}81 \\approx ${L(kt * m * g, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("vrv", 3, (r) => {
    const m = r.int(2, 30), k = r.izberi([10, 20, 30, 45, 60]);
    const F = (m * g) / (2 * Math.sin(rad(k)));
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(F, 4), enota: "N", besedilo: `Svetilka z maso ${m} kg visi na sredini vrvi. Vsaka polovica vrvi oklepa z vodoravnico kot ${k}°. Kolikšna je sila v vrvi?`, rezultat: `${T(F, 1)} N`, postopek: `<p>Navpični komponenti obeh sil nosita težo: \\(2F\\sin\\alpha = mg\\).</p><p>\\(F = \\frac{mg}{2\\sin\\alpha} = \\frac{${L(m * g, 1)}}{2\\sin ${k}°} \\approx ${L(F, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("tram", 3, (r) => {
    const l = r.int(2, 8), m = r.int(10, 100), x = r.int(1, l * 10 - 1) / 10;
    // breme na razdalji x od levega podpornika, teža tramu zanemarjena → desna sila = mg x / l
    const F = (m * g * x) / l;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(F, 4), enota: "N", besedilo: `Lahek tram dolžine ${l} m leži na dveh podporah na koncih. Breme z maso ${m} kg je ${L(x, 1)} m od leve podpore. S kolikšno silo deluje desna podpora?`, rezultat: `${T(F, 1)} N`, postopek: `<p>Navore računamo glede na levo podporo: \\(F_D \\cdot ${l} = mg \\cdot ${L(x, 1)}\\).</p><p>\\(F_D = \\frac{${L(m * g, 1)} \\cdot ${L(x, 1)}}{${l}} \\approx ${L(F, 1)}\\ \\text{N}\\)</p>` });
  });
  pojmi([
    ["sila", "Vektorska količina, ki opisuje delovanje enega telesa na drugo; merimo jo v newtonih."],
    ["navor", "Produkt ročice in sile, ki opisuje vrtilni učinek sile okoli osi."],
    ["ročica", "Pravokotna razdalja od osi vrtenja do nosilke sile."],
    ["težišče", "Prijemališče rezultante sil teže vseh delov telesa."],
    ["rezultanta", "Ena sila, ki ima enak učinek kot več sil skupaj."],
    ["labilna lega", "Ravnovesna lega, iz katere se telo po majhnem odmiku ne vrne, ampak se odmakne še bolj."],
    ["stabilna lega", "Ravnovesna lega, v katero se telo po majhnem odmiku samo vrne."],
    ["sila trenja", "Sila med dotikajočima se ploskvama, ki nasprotuje relativnemu gibanju."],
  ]);
  vprasanja([
    [3, "Kdaj je togo telo v ravnovesju?", "ko sta vsota sil in vsota navorov enaki nič", ["ko je vsota sil enaka nič", "ko je vsota navorov enaka nič", "ko na telo ne deluje nobena sila"], "Za ravnovesje togega telesa morata biti izpolnjena oba pogoja."],
    [3, "Kako se spremeni navor, če ročico podvojimo, silo pa razpolovimo?", "ostane enak", ["podvoji se", "razpolovi se", "poveča se štirikrat"], "\\(M = rF\\): \\(2r \\cdot F/2 = rF\\)."],
  ]);
}
