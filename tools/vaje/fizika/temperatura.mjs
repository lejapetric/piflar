import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const R = 8.31;

export default function ({ serija, pojmi, vprasanja }) {
  serija("kelvin", 6, (r, i) => {
    const t = r.int(-200, 400);
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: t, enota: "°C", besedilo: `Pretvori ${L(t + 273.15, 2)} K v stopinje Celzija.`, rezultat: `${t} °C`, postopek: `<p>\\(t = T - 273{,}15 = ${t}\\ °\\text{C}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: t + 273.15, tol: 0.002, enota: "K", besedilo: `Pretvori ${t} °C v kelvine.`, rezultat: `${T(t + 273.15, 2)} K`, postopek: `<p>\\(T = t + 273{,}15 = ${L(t + 273.15, 2)}\\ \\text{K}\\)</p>` });
  });
  serija("raztezanje", 7, (r, i) => {
    const [ime, a] = r.izberi([["jeklo", 12e-6], ["aluminij", 23e-6], ["baker", 17e-6], ["beton", 12e-6], ["steklo", 9e-6]]);
    const l = r.int(1, 500), dT = r.int(10, 80), dl = a * l * dT;
    return kolicina({ tezavnost: i < 4 ? 2 : 3, vrednost: dl * 1000, enota: "mm", besedilo: `Za koliko se podaljša ${l} m dolga palica (${ime}, \\(\\alpha = ${sci(a)}\\ \\text{K}^{-1}\\)), če se segreje za ${dT} K? (V milimetrih.)`, rezultat: `${T(dl * 1000, 2)} mm`, postopek: `<p>\\(\\Delta l = \\alpha l \\Delta T = ${sci(a)} \\cdot ${l} \\cdot ${dT} = ${sci(dl)}\\ \\text{m} = ${L(dl * 1000, 2)}\\ \\text{mm}\\)</p>` });
  });
  serija("prostorninsko", 4, (r) => {
    const b = r.izberi([0.18e-3, 0.21e-3, 1.1e-3, 0.95e-3]), V = r.int(1, 100), dT = r.int(10, 60), dV = b * V * dT;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(dV, 6), enota: "L", besedilo: `Za koliko se poveča prostornina ${V} L tekočine s koeficientom prostorninskega raztezanja \\(${sci(b)}\\ \\text{K}^{-1}\\), če jo segrejemo za ${dT} K?`, rezultat: `${T(dV, 3)} L`, postopek: `<p>\\(\\Delta V = \\beta V \\Delta T = ${sci(b)} \\cdot ${V} \\cdot ${dT} \\approx ${L(dV, 3)}\\ \\text{L}\\)</p>` });
  });
  serija("izotermna", 5, (r) => {
    const p1 = r.int(80, 300), V1 = r.int(1, 20), V2 = r.int(1, 20);
    if (V1 === V2) return null;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi((p1 * V1) / V2, 4), enota: "kPa", besedilo: `Plin s tlakom ${p1} kPa in prostornino ${V1} L pri stalni temperaturi ${V2 < V1 ? "stisnemo" : "razpnemo"} na ${V2} L. Kolikšen je nov tlak?`, rezultat: `${T((p1 * V1) / V2, 1)} kPa`, postopek: `<p>Boylov zakon: \\(p_1V_1 = p_2V_2\\).</p><p>\\(p_2 = \\frac{${p1} \\cdot ${V1}}{${V2}} \\approx ${L((p1 * V1) / V2, 1)}\\ \\text{kPa}\\)</p>` });
  });
  serija("izobarna", 4, (r) => {
    const V1 = r.int(1, 20), t1 = r.int(0, 50), t2 = r.int(60, 300);
    const V2 = (V1 * (t2 + 273)) / (t1 + 273);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(V2, 4), enota: "L", besedilo: `Plin s prostornino ${V1} L pri ${t1} °C segrejemo pri stalnem tlaku na ${t2} °C. Kolikšna je nova prostornina?`, rezultat: `${T(V2, 2)} L`, postopek: `<p>\\(\\frac{V_1}{T_1} = \\frac{V_2}{T_2}\\), temperature v kelvinih: \\(T_1 = ${t1 + 273}\\) K, \\(T_2 = ${t2 + 273}\\) K.</p><p>\\(V_2 = ${V1} \\cdot \\frac{${t2 + 273}}{${t1 + 273}} \\approx ${L(V2, 2)}\\ \\text{L}\\)</p>` });
  });
  serija("izohorna", 4, (r) => {
    const p1 = r.int(100, 300), t1 = r.int(0, 30), t2 = r.int(40, 200), p2 = (p1 * (t2 + 273)) / (t1 + 273);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(p2, 4), enota: "kPa", besedilo: `V zaprti jeklenki je plin s tlakom ${p1} kPa pri ${t1} °C. Kolikšen je tlak, ko se segreje na ${t2} °C?`, rezultat: `${T(p2, 1)} kPa`, postopek: `<p>Pri stalni prostornini: \\(\\frac{p_1}{T_1} = \\frac{p_2}{T_2}\\).</p><p>\\(p_2 = ${p1} \\cdot \\frac{${t2 + 273}}{${t1 + 273}} \\approx ${L(p2, 1)}\\ \\text{kPa}\\)</p>` });
  });
  serija("plinska", 6, (r, i) => {
    const n = r.int(1, 50) / 10, t = r.int(-20, 200), V = r.int(1, 100) / 1000;
    const p = (n * R * (t + 273)) / V;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi((p * V) / (R * (t + 273)), 4), enota: "mol", besedilo: `Koliko molov plina je v posodi s prostornino ${L(V * 1000, 0)} L pri tlaku ${L(p / 1000, 1)} kPa in temperaturi ${t} °C? (\\(R = 8{,}31\\ \\text{J/(mol K)}\\))`, rezultat: `${T(n, 2)} mol`, postopek: `<p>\\(n = \\frac{pV}{RT} = \\frac{${sci(p)} \\cdot ${L(V, 3)}}{8{,}31 \\cdot ${t + 273}} \\approx ${L(n, 2)}\\ \\text{mol}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(p, 1), enota: "Pa", besedilo: `V posodi s prostornino ${L(V * 1000, 0)} L je ${L(n, 1)} mol plina pri ${t} °C. Kolikšen je tlak? (\\(R = 8{,}31\\ \\text{J/(mol K)}\\); vpiši v Pa, npr. 2,5e5.)`, rezultat: `\\(${sci(p)}\\) Pa`, postopek: `<p>\\(pV = nRT\\), \\(p = \\frac{nRT}{V} = \\frac{${L(n, 1)} \\cdot 8{,}31 \\cdot ${t + 273}}{${L(V, 3)}} \\approx ${sci(p)}\\ \\text{Pa}\\)</p>` });
  });
  serija("splosna", 4, (r) => {
    const p1 = r.int(100, 200), V1 = r.int(2, 20), t1 = r.int(0, 30), p2 = r.int(150, 600), t2 = r.int(40, 200);
    const V2 = (p1 * V1 * (t2 + 273)) / ((t1 + 273) * p2);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(V2, 4), enota: "L", besedilo: `Plin ima pri ${p1} kPa in ${t1} °C prostornino ${V1} L. Kolikšna je prostornina pri ${p2} kPa in ${t2} °C?`, rezultat: `${T(V2, 2)} L`, postopek: `<p>\\(\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}\\)</p><p>\\(V_2 = \\frac{p_1V_1T_2}{T_1p_2} = \\frac{${p1} \\cdot ${V1} \\cdot ${t2 + 273}}{${t1 + 273} \\cdot ${p2}} \\approx ${L(V2, 2)}\\ \\text{L}\\)</p>` });
  });
  serija("gostota-plina", 3, (r) => {
    const [ime, M] = r.izberi([["kisik", 0.032], ["dušik", 0.028], ["helij", 0.004], ["ogljikov dioksid", 0.044]]), t = r.int(0, 100), p = r.int(80, 300) * 1000;
    const rho = (p * M) / (R * (t + 273));
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(rho, 4), enota: "kg/m³", besedilo: `Kolikšna je gostota plina (${ime}, \\(M = ${M * 1000}\\) g/mol) pri tlaku ${p / 1000} kPa in temperaturi ${t} °C?`, rezultat: `${T(rho, 3)} kg/m³`, postopek: `<p>Iz \\(pV = \\frac{m}{M}RT\\): \\(\\rho = \\frac{pM}{RT} = \\frac{${p} \\cdot ${L(M, 3)}}{8{,}31 \\cdot ${t + 273}} \\approx ${L(rho, 3)}\\ \\text{kg/m}^3\\)</p>` });
  });
  pojmi([
    ["absolutna ničla", "Najnižja možna temperatura, 0 K oziroma −273,15 °C."],
    ["temperaturno raztezanje", "Povečanje dolžine ali prostornine snovi pri segrevanju."],
    ["idealni plin", "Model plina, v katerem so molekule točkaste in med seboj delujejo le ob trkih."],
    ["izotermna sprememba", "Sprememba stanja plina pri stalni temperaturi."],
    ["izobarna sprememba", "Sprememba stanja plina pri stalnem tlaku."],
    ["izohorna sprememba", "Sprememba stanja plina pri stalni prostornini."],
    ["anomalija vode", "Pojav, da ima voda največjo gostoto pri 4 °C."],
  ]);
  vprasanja([
    [2, "Zakaj imajo mostovi dilatacijske reže?", "da se lahko konstrukcija pri segrevanju razteza", ["da je most lažji", "da odteka voda", "zaradi zvočne izolacije"], "Brez rež bi temperaturno raztezanje povzročilo velike napetosti."],
    [3, "Kako se spremeni povprečna kinetična energija molekul plina, če se absolutna temperatura podvoji?", "podvoji se", ["ostane enaka", "poveča se štirikrat", "poveča se za \\(\\sqrt2\\)"], "\\(\\bar{W}_k = \\frac32 kT\\)."],
  ]);
}
