import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("kmh", 6, (r, i) => {
    if (i % 2) {
      const v = r.int(2, 40) * 5;
      return kolicina({ tezavnost: 1, vrednost: v / 3.6, enota: "m/s", besedilo: `Pretvori ${v} km/h v m/s.`, rezultat: `${T(v / 3.6, 2)} m/s`, postopek: `<p>\\(1\\ \\text{km/h} = \\frac{1000\\ \\text{m}}{3600\\ \\text{s}} = \\frac{1}{3{,}6}\\ \\text{m/s}\\)</p><p>\\(${v} : 3{,}6 \\approx ${L(v / 3.6, 2)}\\ \\text{m/s}\\)</p>` });
    }
    const v = r.int(1, 50);
    return kolicina({ tezavnost: 1, vrednost: v * 3.6, enota: "km/h", besedilo: `Pretvori ${v} m/s v km/h.`, rezultat: `${T(v * 3.6, 1)} km/h`, postopek: `<p>\\(${v}\\ \\text{m/s} \\cdot 3{,}6 = ${L(v * 3.6, 1)}\\ \\text{km/h}\\)</p>` });
  });
  serija("predpone", 8, (r) => {
    const [x, iz, v, f, raz] = r.izberi([
      [r.int(2, 900), "mm", "m", 1e-3, "1 mm = 10⁻³ m"], [r.int(2, 900), "µs", "s", 1e-6, "1 µs = 10⁻⁶ s"], [r.int(2, 90), "MW", "W", 1e6, "1 MW = 10⁶ W"],
      [r.int(2, 900), "nm", "m", 1e-9, "1 nm = 10⁻⁹ m"], [r.int(2, 90), "kJ", "J", 1e3, "1 kJ = 10³ J"], [r.int(2, 900), "mA", "A", 1e-3, "1 mA = 10⁻³ A"],
      [r.int(2, 90), "GHz", "Hz", 1e9, "1 GHz = 10⁹ Hz"], [r.int(2, 900), "pF", "F", 1e-12, "1 pF = 10⁻¹² F"], [r.int(2, 90), "kPa", "Pa", 1e3, "1 kPa = 10³ Pa"],
    ]);
    return kolicina({ tezavnost: 1, vrednost: x * f, enota: v, besedilo: `Pretvori ${x} ${iz} v ${v}. (Lahko zapišeš v obliki 3·10^-5.)`, rezultat: `\\(${sci(x * f)}\\) ${v}`, postopek: `<p>${raz}, torej \\(${x}\\ \\text{${iz.replace("µ", "\\mu ")}} = ${sci(x * f)}\\ \\text{${v}}\\).</p>` });
  });
  serija("ploscina-prostornina", 6, (r, i) => {
    const [x, iz, v, f, raz] = [
      [r.int(2, 900), "cm²", "m²", 1e-4, "1 cm² = (10⁻² m)² = 10⁻⁴ m²"], [r.int(2, 900), "cm³", "m³", 1e-6, "1 cm³ = (10⁻² m)³ = 10⁻⁶ m³"],
      [r.int(2, 90), "L", "m³", 1e-3, "1 L = 1 dm³ = 10⁻³ m³"], [r.int(2, 900), "mm²", "m²", 1e-6, "1 mm² = 10⁻⁶ m²"],
      [r.int(2, 90), "dm³", "cm³", 1e3, "1 dm³ = 1000 cm³"], [r.int(2, 90), "km²", "m²", 1e6, "1 km² = 10⁶ m²"],
    ][i % 6];
    return kolicina({ tezavnost: 2, vrednost: x * f, enota: v, besedilo: `Pretvori ${x} ${iz} v ${v}.`, rezultat: `\\(${sci(x * f)}\\) ${v}`, postopek: `<p>${raz}. Pri ploščinah in prostorninah predpono potenciramo.</p><p>\\(${x}\\ \\text{${iz}} = ${sci(x * f)}\\ \\text{${v}}\\)</p>` });
  });
  serija("gostota-enote", 4, (r) => {
    const x = r.int(5, 200) / 10;
    return kolicina({ tezavnost: 2, vrednost: x * 1000, enota: "kg/m³", besedilo: `Gostota snovi je ${L(x, 1)} g/cm³. Koliko je to v kg/m³?`, rezultat: `${T(x * 1000, 0)} kg/m³`, postopek: `<p>\\(1\\ \\frac{\\text{g}}{\\text{cm}^3} = \\frac{10^{-3}\\ \\text{kg}}{10^{-6}\\ \\text{m}^3} = 1000\\ \\frac{\\text{kg}}{\\text{m}^3}\\)</p><p>\\(${L(x, 1)} \\cdot 1000 = ${L(x * 1000, 0)}\\ \\text{kg/m}^3\\)</p>` });
  });
  serija("povprecje-napaka", 6, (r, i) => {
    const s = r.int(200, 900) / 10, m = Array.from({ length: 5 }, () => zaokrozi(s + r.int(-6, 6) / 10, 1));
    const p = m.reduce((a, b) => a + b, 0) / 5, nap = Math.max(...m.map((x) => Math.abs(x - p)));
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(p, 3), tol: 0.002, enota: "cm", besedilo: `Dolžino palice izmerimo petkrat: ${m.map((x) => L(x, 1).replace("{,}", ",")).join(" cm, ")} cm. Kolikšna je povprečna vrednost? (Na dve decimalki.)`, rezultat: `${T(p, 2)} cm`, postopek: `<p>\\(\\bar{l} = \\frac{${m.map((x) => L(x, 1)).join(" + ")}}{5} = ${L(p, 2)}\\ \\text{cm}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(nap, 3), tol: 0.05, enota: "cm", besedilo: `Dolžino palice izmerimo petkrat: ${m.map((x) => L(x, 1).replace("{,}", ",")).join(" cm, ")} cm. Kolikšna je absolutna napaka, če jo ocenimo z največjim odstopanjem od povprečja? (Na dve decimalki.)`, rezultat: `${T(nap, 2)} cm`, postopek: `<p>Povprečje: \\(${L(p, 2)}\\) cm. Največje odstopanje posamezne meritve od povprečja je \\(${L(nap, 2)}\\) cm.</p>` });
  });
  serija("relativna", 5, (r) => {
    const x = r.int(20, 500), d = r.int(1, 10) / 2;
    const rel = (d / x) * 100;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(rel, 4), tol: 0.02, enota: "%", besedilo: `Rezultat meritve je \\((${x} \\pm ${L(d, 1)})\\) g. Kolikšna je relativna napaka v odstotkih?`, rezultat: `${T(rel, 2)} %`, postopek: `<p>\\(\\delta = \\frac{\\Delta m}{m} = \\frac{${L(d, 1)}}{${x}} \\approx ${L(rel / 100, 4)} = ${L(rel, 2)}\\,\\%\\)</p>` });
  });
  serija("napaka-produkt", 4, (r) => {
    const a = r.int(20, 80), b = r.int(10, 50), da = r.int(1, 5) / 10, db = r.int(1, 5) / 10;
    const rel = (da / a + db / b) * 100;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(rel, 4), tol: 0.02, enota: "%", besedilo: `Stranici pravokotnika izmerimo: \\(a = (${a} \\pm ${L(da, 1)})\\) cm in \\(b = (${b} \\pm ${L(db, 1)})\\) cm. Kolikšna je relativna napaka ploščine v odstotkih?`, rezultat: `${T(rel, 2)} %`, postopek: `<p>Pri produktu seštejemo relativni napaki: \\(\\delta_S = \\frac{${L(da, 1)}}{${a}} + \\frac{${L(db, 1)}}{${b}} \\approx ${L(rel, 2)}\\,\\%\\).</p>` });
  });
  pojmi([
    ["skalarna količina", "Količina, ki jo popolnoma določata številska vrednost in enota (npr. masa, čas, temperatura)."],
    ["vektorska količina", "Količina, ki ima poleg velikosti tudi smer (npr. hitrost, sila, pospešek)."],
    ["osnovna enota SI", "Ena od sedmih enot (m, kg, s, A, K, mol, cd), iz katerih izpeljemo vse druge."],
    ["izpeljana enota", "Enota, sestavljena iz osnovnih enot, kot je newton (kg·m/s²)."],
    ["absolutna napaka", "Ocena, za koliko se izmerjena vrednost lahko razlikuje od prave, v enotah merjene količine."],
    ["relativna napaka", "Razmerje med absolutno napako in izmerjeno vrednostjo, pogosto v odstotkih."],
    ["sistematična napaka", "Napaka, ki pri vseh meritvah premakne rezultat v isto smer, npr. zaradi slabo umerjenega instrumenta."],
    ["naključna napaka", "Napaka, zaradi katere se ponovljene meritve razpršijo okoli povprečja."],
  ]);
  vprasanja([
    [2, "Katera je osnovna enota SI za električni tok?", "amper", ["volt", "coulomb", "ohm"], "Amper (A) je ena od sedmih osnovnih enot SI; volt, coulomb in ohm so izpeljane."],
    [2, "Katera je osnovna enota SI za množino snovi?", "mol", ["kilogram", "liter", "kelvin"], "Množino snovi merimo v molih."],
    [3, "Kako se izraža enota joule z osnovnimi enotami SI?", "kg·m²/s²", ["kg·m/s²", "kg·m²/s³", "kg·m/s"], "\\(J = N \\cdot m = \\frac{kg \\cdot m}{s^2} \\cdot m\\)."],
    [3, "Kako se izraža enota watt z osnovnimi enotami SI?", "kg·m²/s³", ["kg·m²/s²", "kg·m/s²", "kg/(m·s²)"], "\\(W = J/s\\)."],
    [3, "Kako se izraža enota pascal z osnovnimi enotami SI?", "kg/(m·s²)", ["kg·m/s²", "kg/m³", "kg·m²/s²"], "\\(Pa = N/m^2\\)."],
    [4, "Izraz za hitrost je \\(v = \\sqrt{\\frac{F l}{m}}\\). Ali je izraz dimenzijsko pravilen?", "Da", ["Ne"], "\\(\\frac{N \\cdot m}{kg} = \\frac{kg \\cdot m^2/s^2}{kg} = m^2/s^2\\), koren da m/s.", "visja"],
    [4, "Nihajni čas nihala je odvisen od dolžine \\(l\\) in \\(g\\). Kateri izraz ima pravo enoto (sekundo)?", "\\(\\sqrt{l/g}\\)", ["\\(\\sqrt{g/l}\\)", "\\(l/g\\)", "\\(l \\cdot g\\)"], "\\(\\sqrt{\\frac{m}{m/s^2}} = \\sqrt{s^2} = s\\).", "visja"],
  ]);
}
