import { T } from "../lib.mjs";
const x = String.raw, g = 9.81;
const v2 = 2 * (0.02 / 0.01) ** 2; // hitrost v ožini
const dp = 0.5 * 1000 * (16 - 4);
export default [
  { t: 4, b: x`Kocka iz lesa z gostoto \(600\ \mathrm{kg/m^3}\) in robom \(10\ \mathrm{cm}\) plava v vodi. Koliko utež moramo položiti nanjo, da bo potopljena ravno v celoti? (Gostota vode \(1000\ \mathrm{kg/m^3}\); v gramih.)`, v: 400, enota: "g",
    rez: x`\(400\ \mathrm{g}\)`, post: x`<p>Vzgon pri popolni potopitvi: \(\rho_v V g = 1000 \cdot 0{,}001 \cdot g\), kar ustreza masi \(1\ \mathrm{kg}\). Kocka ima maso \(0{,}6\ \mathrm{kg}\).</p><p>Utež: \(1 - 0{,}6 = 0{,}4\ \mathrm{kg} = 400\ \mathrm{g}\)</p>` },
  { t: 4, b: x`Ledena gora plava v morju (\(\rho_{led} = 917\ \mathrm{kg/m^3}\), \(\rho_{morje} = 1025\ \mathrm{kg/m^3}\)). Kolikšen odstotek njene prostornine je nad gladino?`, v: 100 * (1 - 917 / 1025), enota: "%",
    rez: x`\(\approx ${T(100 * (1 - 917 / 1025), 1)}\,\%\)`, post: x`<p>Plavanje: \(\rho_{led}V = \rho_{morje}V_{pod}\), \(\frac{V_{pod}}{V} = \frac{917}{1025} \approx 0{,}895\).</p><p>Nad gladino \(\approx 10{,}5\,\%\)</p>` },
  { t: 4, raven: "visja", b: x`Voda teče po vodoravni cevi s premerom \(4\ \mathrm{cm}\) s hitrostjo \(2\ \mathrm{m/s}\). Cev se zoži na premer \(2\ \mathrm{cm}\). Za koliko kPa je tlak v ožini nižji?`, v: 0.5 * 1000 * (64 - 4) / 1000, enota: "kPa",
    rez: x`\(\Delta p = 30\ \mathrm{kPa}\)`, post: x`<p>Kontinuitetna enačba: polovični premer pomeni četrtino preseka, zato \(v_2 = 4v_1 = 8\ \mathrm{m/s}\).</p><p>Bernoulli: \(\Delta p = \frac12\rho(v_2^2 - v_1^2) = \frac12 \cdot 1000 \cdot (64 - 4) = 30\ \mathrm{kPa}\)</p>` },
  { t: 4, b: x`Kamen tehta na zraku \(30\ \mathrm{N}\), potopljen v vodi pa \(18\ \mathrm{N}\). Kolikšna je njegova gostota? (Gostota vode \(1000\ \mathrm{kg/m^3}\).)`, v: 2500, enota: "kg/m^3",
    rez: x`\(\rho = 2500\ \mathrm{kg/m^3}\)`, post: x`<p>Vzgon: \(30 - 18 = 12\ \mathrm{N} = \rho_v V g\).</p><p>\(\frac{\rho}{\rho_v} = \frac{mg}{\rho_v V g} = \frac{30}{12} = 2{,}5\), \(\rho = 2500\ \mathrm{kg/m^3}\)</p>` },
  { t: 4, b: x`Iz luknje na dnu odprtega soda teče voda. Gladina je \(1{,}25\ \mathrm{m}\) nad luknjo. S kolikšno hitrostjo izteka voda? (\(g = 9{,}81\ \mathrm{m/s^2}\))`, v: Math.sqrt(2 * g * 1.25), enota: "m/s",
    rez: x`\(v \approx ${T(Math.sqrt(2 * g * 1.25), 2)}\ \mathrm{m/s}\)`, post: x`<p>Torricellijev zakon (Bernoulli med gladino in luknjo): \(v = \sqrt{2gh} = \sqrt{2 \cdot 9{,}81 \cdot 1{,}25} \approx 4{,}95\ \mathrm{m/s}\)</p>` },
  { t: 4, b: x`V U-cev nalijemo živo srebro (\(13\,600\ \mathrm{kg/m^3}\)). V en krak nato nalijemo \(27{,}2\ \mathrm{cm}\) visok stolpec vode. Za koliko centimetrov je gladina živega srebra v drugem kraku višja kot v prvem?`, v: 2, enota: "cm",
    rez: x`\(2\ \mathrm{cm}\)`, post: x`<p>Hidrostatična tlaka na isti višini (na meji voda–živo srebro) sta enaka: \(\rho_v h_v = \rho_{Hg}\Delta h\).</p><p>\(\Delta h = \frac{1000 \cdot 27{,}2}{13\,600} = 2\ \mathrm{cm}\)</p>` },
];
