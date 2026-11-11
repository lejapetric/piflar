import { kolicina, izbira, T, L, zaokrozi } from "../lib.mjs";
const g = 9.81;
const rad = (k) => (k * Math.PI) / 180;

export default function ({ serija, pojmi, vprasanja }) {
  serija("delo", 6, (r, i) => {
    const F = r.int(5, 500), s = r.int(1, 50), k = i < 3 ? 0 : r.izberi([30, 45, 60]);
    const A = F * s * Math.cos(rad(k));
    return kolicina({ tezavnost: k ? 2 : 1, vrednost: zaokrozi(A, 3), enota: "J", besedilo: `Telo premaknemo za ${s} m s silo ${F} N, ki ${k ? `oklepa s smerjo premika kot ${k}°` : "kaže v smeri premika"}. Koliko dela opravimo?`, rezultat: `${T(A, 1)} J`, postopek: `<p>\\(A = Fs${k ? "\\cos\\varphi" : ""} = ${F} \\cdot ${s}${k ? ` \\cdot \\cos ${k}°` : ""} ${k ? "\\approx" : "="} ${L(A, 1)}\\ \\text{J}\\)</p>` });
  });
  serija("kineticna", 6, (r, i) => {
    const m = r.int(1, 1500), v = r.int(1, 40), W = 0.5 * m * v * v;
    if (i % 3 === 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(Math.sqrt((2 * W) / m), 4), enota: "m/s", besedilo: `Telo z maso ${m} kg ima kinetično energijo ${L(W, 0)} J. Kolikšna je njegova hitrost?`, rezultat: `${v} m/s`, postopek: `<p>\\(v = \\sqrt{\\frac{2W_k}{m}} = \\sqrt{\\frac{${2 * W}}{${m}}} = ${v}\\ \\text{m/s}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: W, enota: "J", besedilo: `Kolikšna je kinetična energija telesa z maso ${m} kg, ki se giblje s hitrostjo ${v} m/s?`, rezultat: `${T(W, 1)} J`, postopek: `<p>\\(W_k = \\frac{mv^2}{2} = \\frac{${m} \\cdot ${v * v}}{2} = ${L(W, 1)}\\ \\text{J}\\)</p>` });
  });
  serija("potencialna", 5, (r) => {
    const m = r.int(1, 100), h = r.int(1, 100);
    return kolicina({ tezavnost: 1, vrednost: m * g * h, enota: "J", besedilo: `Za koliko se poveča potencialna energija telesa z maso ${m} kg, če ga dvignemo za ${h} m?`, rezultat: `${T(m * g * h, 1)} J`, postopek: `<p>\\(\\Delta W_p = mgh = ${m} \\cdot 9{,}81 \\cdot ${h} \\approx ${L(m * g * h, 1)}\\ \\text{J}\\)</p>` });
  });
  serija("prozna", 4, (r) => {
    const k = r.int(50, 2000), x = r.int(1, 30) / 100, W = 0.5 * k * x * x;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(W, 4), enota: "J", besedilo: `Koliko prožnostne energije ima vzmet s koeficientom ${k} N/m, raztegnjena za ${L(x * 100, 0)} cm?`, rezultat: `${T(W, 3)} J`, postopek: `<p>\\(W_{pr} = \\frac{kx^2}{2} = \\frac{${k} \\cdot ${L(x, 2)}^2}{2} \\approx ${L(W, 3)}\\ \\text{J}\\)</p>` });
  });
  serija("ohranitev", 6, (r, i) => {
    const h = r.int(1, 60), v0 = i % 2 ? r.int(1, 10) : 0;
    const v = Math.sqrt(v0 * v0 + 2 * g * h);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(v, 4), enota: "m/s", besedilo: `Sani${v0 ? ` z začetno hitrostjo ${v0} m/s` : " iz mirovanja"} zdrsijo brez trenja po hribu z višinsko razliko ${h} m. Kolikšna je hitrost ob vznožju?`, rezultat: `${T(v, 1)} m/s`, postopek: `<p>Ohranitev energije: \\(\\frac{mv_0^2}{2} + mgh = \\frac{mv^2}{2}\\).</p><p>\\(v = \\sqrt{v_0^2 + 2gh} = \\sqrt{${v0 * v0} + 2 \\cdot 9{,}81 \\cdot ${h}} \\approx ${L(v, 1)}\\ \\text{m/s}\\)</p>` });
  });
  serija("moc", 6, (r, i) => {
    const m = r.int(10, 500), h = r.int(2, 30), t = r.int(2, 60), P = (m * g * h) / t;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: zaokrozi(P, 3), enota: "W", besedilo: `Dvigalo dvigne ${m} kg tovora za ${h} m v ${t} s. Kolikšna je moč dvigala?`, rezultat: `${T(P, 0)} W`, postopek: `<p>\\(P = \\frac{A}{t} = \\frac{mgh}{t} = \\frac{${m} \\cdot 9{,}81 \\cdot ${h}}{${t}} \\approx ${L(P, 0)}\\ \\text{W}\\)</p>` });
    const F = r.int(100, 5000), v = r.int(1, 40);
    return kolicina({ tezavnost: 1, vrednost: F * v, enota: "W", besedilo: `Motor vleče avto s silo ${F} N pri stalni hitrosti ${v} m/s. Kolikšna je moč motorja?`, rezultat: `${F * v} W`, postopek: `<p>\\(P = Fv = ${F} \\cdot ${v} = ${F * v}\\ \\text{W}\\)</p>` });
  });
  serija("izkoristek", 5, (r) => {
    const Pv = r.int(100, 5000), eta = r.int(20, 95) / 100;
    return kolicina({ tezavnost: 2, vrednost: Pv * eta, enota: "W", besedilo: `Motor prejme moč ${Pv} W, izkoristek je ${L(eta * 100, 0)} %. Kolikšno koristno moč odda?`, rezultat: `${T(Pv * eta, 0)} W`, postopek: `<p>\\(P_{kor} = \\eta P_{vl} = ${L(eta, 2)} \\cdot ${Pv} = ${L(Pv * eta, 0)}\\ \\text{W}\\)</p>` });
  });
  serija("trenje-energija", 4, (r) => {
    const m = r.int(1, 40), v = r.int(2, 20), kt = r.int(1, 6) / 10, s = (v * v) / (2 * kt * g);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(s, 3), enota: "m", besedilo: `Ploščica z maso ${m} kg drsi po vodoravnih tleh z začetno hitrostjo ${v} m/s. Koeficient trenja je ${L(kt, 1)}. Koliko daleč zdrsi?`, rezultat: `${T(s, 2)} m`, postopek: `<p>Delo trenja porabi kinetično energijo: \\(k_t mgs = \\frac{mv^2}{2}\\) (masa se okrajša).</p><p>\\(s = \\frac{v^2}{2k_tg} = \\frac{${v * v}}{2 \\cdot ${L(kt, 1)} \\cdot 9{,}81} \\approx ${L(s, 2)}\\ \\text{m}\\)</p>` });
  });
  serija("vzmet-hitrost", 3, (r) => {
    const k = r.int(100, 2000), x = r.int(2, 20) / 100, m = r.int(1, 50) / 100;
    const v = x * Math.sqrt(k / m);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v, 4), enota: "m/s", besedilo: `Vzmet s koeficientom ${k} N/m stisnemo za ${L(x * 100, 0)} cm in z njo izstrelimo kroglico z maso ${L(m * 1000, 0)} g. S kolikšno hitrostjo odleti?`, rezultat: `${T(v, 2)} m/s`, postopek: `<p>\\(\\frac{kx^2}{2} = \\frac{mv^2}{2}\\), \\(v = x\\sqrt{\\frac{k}{m}} = ${L(x, 2)} \\cdot \\sqrt{\\frac{${k}}{${L(m, 2)}}} \\approx ${L(v, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("zanka", 3, (r) => {
    const R = r.int(2, 20) / 2, h = 2.5 * R;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: h, enota: "m", besedilo: `Voziček brez trenja zdrsi z višine \\(h\\) v navpično krožno zanko s polmerom ${L(R, 1)} m. Kolikšna je najmanjša višina \\(h\\), da voziček varno opravi zanko?`, rezultat: `\\(h = 2{,}5r = ${L(h, 2)}\\) m`, postopek: `<p>V najvišji točki mora teža zadoščati za radialno silo: \\(\\frac{mv^2}{r} \\ge mg\\), \\(v^2 \\ge gr\\).</p><p>Energija: \\(mgh = mg \\cdot 2r + \\frac{mv^2}{2}\\), torej \\(h \\ge 2r + \\frac{r}{2} = 2{,}5r = ${L(h, 2)}\\ \\text{m}\\).</p>` });
  });
  serija("nihalo-energija", 3, (r) => {
    const l = r.int(5, 30) / 10, k = r.izberi([20, 30, 45, 60]);
    const v = Math.sqrt(2 * g * l * (1 - Math.cos(rad(k))));
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 4), enota: "m/s", besedilo: `Nihalo dolžine ${L(l, 1)} m odmaknemo za ${k}° od navpičnice in spustimo. Kolikšna je hitrost v najnižji točki?`, rezultat: `${T(v, 2)} m/s`, postopek: `<p>Višinska razlika: \\(h = l(1 - \\cos\\alpha) = ${L(l, 1)}(1 - \\cos ${k}°) \\approx ${L(l * (1 - Math.cos(rad(k))), 3)}\\ \\text{m}\\).</p><p>\\(v = \\sqrt{2gh} \\approx ${L(v, 2)}\\ \\text{m/s}\\)</p>` });
  });
  pojmi([
    ["delo", "Produkt sile in premika v smeri sile; meri prenos energije s silo."],
    ["kinetična energija", "Energija, ki jo ima telo zaradi gibanja."],
    ["potencialna energija", "Energija, ki jo ima telo zaradi lege v gravitacijskem polju."],
    ["prožnostna energija", "Energija, shranjena v deformiranem prožnem telesu, npr. vzmeti."],
    ["moč", "Opravljeno delo v enoti časa; merimo jo v vatih."],
    ["izkoristek", "Razmerje med koristno in vloženo energijo (ali močjo)."],
  ]);
  vprasanja([
    [2, "Telo nesemo v vodoravni smeri s stalno hitrostjo. Koliko dela opravi sila, s katero ga držimo (navpično)?", "nič", ["\\(mgs\\)", "\\(mg\\)", "odvisno od hitrosti"], "Sila je pravokotna na premik, \\(\\cos 90° = 0\\)."],
    [3, "Kako se spremeni kinetična energija, če se hitrost podvoji?", "poveča se štirikrat", ["podvoji se", "ostane enaka", "poveča se osemkrat"], "\\(W_k \\propto v^2\\)."],
    [3, "Kaj se zgodi z mehansko energijo telesa, ki drsi po klancu s trenjem?", "zmanjša se, del preide v notranjo energijo", ["ostane enaka", "poveča se", "vsa preide v potencialno"], "Delo trenja zmanjša mehansko energijo."],
  ]);
}
