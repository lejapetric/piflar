import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const g = 9.81;
const SNOVI = [["voda", 1000], ["morska voda", 1030], ["olje", 900], ["živo srebro", 13600], ["alkohol", 790]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("tlak", 6, (r, i) => {
    const F = r.int(10, 5000), S = r.int(1, 500) / 100;
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: F / S, enota: "Pa", besedilo: `Sila ${F} N deluje pravokotno na ploskev ${L(S, 2)} m². Kolikšen je tlak?`, rezultat: `${T(F / S, 1)} Pa`, postopek: `<p>\\(p = \\frac{F}{S} = \\frac{${F}}{${L(S, 2)}} \\approx ${L(F / S, 1)}\\ \\text{Pa}\\)</p>` });
    const m = r.int(40, 100), S2 = r.int(100, 600) / 10000;
    return kolicina({ tezavnost: 2, vrednost: (m * g) / S2, enota: "Pa", besedilo: `Človek z maso ${m} kg stoji na eni nogi. Ploščina podplata je ${L(S2 * 10000, 0)} cm². Kolikšen tlak povzroča na tla?`, rezultat: `${T((m * g) / S2, 0)} Pa`, postopek: `<p>\\(S = ${L(S2 * 10000, 0)}\\ \\text{cm}^2 = ${L(S2, 4)}\\ \\text{m}^2\\)</p><p>\\(p = \\frac{mg}{S} = \\frac{${L(m * g, 1)}}{${L(S2, 4)}} \\approx ${L((m * g) / S2, 0)}\\ \\text{Pa}\\)</p>` });
  });
  serija("hidrostaticni", 7, (r, i) => {
    const [ime, rho] = r.izberi(SNOVI), h = r.int(1, 200) / (ime === "živo srebro" ? 100 : 10);
    if (i % 3 === 2) {
      const p = r.int(10, 500) * 1000;
      return kolicina({ tezavnost: 2, vrednost: zaokrozi(p / (rho * g), 4), enota: "m", besedilo: `Na kateri globini v tekočini (${ime}, \\(\\rho = ${rho}\\ \\text{kg/m}^3\\)) je hidrostatični tlak ${p / 1000} kPa?`, rezultat: `${T(p / (rho * g), 2)} m`, postopek: `<p>\\(h = \\frac{p}{\\rho g} = \\frac{${p}}{${rho} \\cdot 9{,}81} \\approx ${L(p / (rho * g), 2)}\\ \\text{m}\\)</p>` });
    }
    return kolicina({ tezavnost: 1, vrednost: rho * g * h, enota: "Pa", besedilo: `Kolikšen je hidrostatični tlak na globini ${L(h, 2)} m v tekočini (${ime}, \\(\\rho = ${rho}\\ \\text{kg/m}^3\\))?`, rezultat: `${T(rho * g * h, 0)} Pa`, postopek: `<p>\\(p = \\rho gh = ${rho} \\cdot 9{,}81 \\cdot ${L(h, 2)} \\approx ${L(rho * g * h, 0)}\\ \\text{Pa}\\)</p>` });
  });
  serija("skupni-tlak", 3, (r) => {
    const h = r.int(1, 50), p = 101300 + 1000 * g * h;
    return kolicina({ tezavnost: 2, vrednost: p, enota: "Pa", besedilo: `Kolikšen je skupni tlak na globini ${h} m v jezeru, če je zračni tlak 101,3 kPa?`, rezultat: `${T(p / 1000, 1)} kPa`, postopek: `<p>\\(p = p_0 + \\rho gh = 101\\,300 + 1000 \\cdot 9{,}81 \\cdot ${h} \\approx ${L(p, 0)}\\ \\text{Pa}\\)</p>` });
  });
  serija("vzgon", 7, (r, i) => {
    const [ime, rho] = r.izberi(SNOVI.slice(0, 3)), V = r.int(1, 200) / 1000;
    if (i % 2) {
      const m = r.int(1, 50), rt = r.int(2, 11) * 1000, Vt = m / rt, Fv = rho * g * Vt;
      return kolicina({ tezavnost: 3, vrednost: zaokrozi(m * g - Fv, 4), enota: "N", besedilo: `Kovinski kos z maso ${m} kg in gostoto ${rt} kg/m³ obesimo na silomer in potopimo v ${ime === "voda" ? "vodo" : ime === "olje" ? "olje" : "morsko vodo"} (\\(\\rho = ${rho}\\ \\text{kg/m}^3\\)). Kaj kaže silomer?`, rezultat: `${T(m * g - Fv, 1)} N`, postopek: `<p>\\(V = \\frac{m}{\\rho_t} = ${sci(Vt)}\\ \\text{m}^3\\), \\(F_{vz} = \\rho_t gV = ${L(Fv, 2)}\\ \\text{N}\\).</p><p>\\(F = mg - F_{vz} = ${L(m * g, 2)} - ${L(Fv, 2)} \\approx ${L(m * g - Fv, 1)}\\ \\text{N}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: rho * g * V, enota: "N", besedilo: `Kolikšen je vzgon na telo s prostornino ${L(V * 1000, 0)} dm³, popolnoma potopljeno v tekočino z gostoto ${rho} kg/m³?`, rezultat: `${T(rho * g * V, 2)} N`, postopek: `<p>\\(F_{vz} = \\rho_t gV = ${rho} \\cdot 9{,}81 \\cdot ${L(V, 3)} \\approx ${L(rho * g * V, 2)}\\ \\text{N}\\)</p>` });
  });
  serija("plavanje", 4, (r) => {
    const rt = r.int(300, 950), rho = 1000, f = rt / rho;
    return kolicina({ tezavnost: 3, vrednost: f * 100, enota: "%", besedilo: `Kos lesa z gostoto ${rt} kg/m³ plava na vodi. Kolikšen delež prostornine je pod vodo?`, rezultat: `${T(f * 100, 1)} %`, postopek: `<p>Pri plavanju je vzgon enak teži: \\(\\rho_v g V_{pod} = \\rho_t g V\\).</p><p>\\(\\frac{V_{pod}}{V} = \\frac{${rt}}{1000} = ${L(f, 3)}\\), torej ${L(f * 100, 1)} %.</p>` });
  });
  serija("hidravlika", 5, (r) => {
    const S1 = r.int(1, 20), S2 = r.int(50, 2000), F2 = r.int(1000, 20000);
    const F1 = (F2 * S1) / S2;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(F1, 4), enota: "N", besedilo: `Hidravlična stiskalnica ima bata s ploščinama ${S1} cm² in ${S2} cm². S kolikšno silo moramo pritisniti na manjši bat, da dvignemo breme ${F2} N na večjem?`, rezultat: `${T(F1, 1)} N`, postopek: `<p>Tlak je v tekočini enak: \\(\\frac{F_1}{S_1} = \\frac{F_2}{S_2}\\).</p><p>\\(F_1 = F_2\\frac{S_1}{S_2} = ${F2} \\cdot \\frac{${S1}}{${S2}} \\approx ${L(F1, 1)}\\ \\text{N}\\)</p>` });
  });
  serija("kontinuiteta", 5, (r) => {
    const d1 = r.int(2, 10), d2 = r.int(1, d1 - 1), v1 = r.int(1, 30) / 10;
    const v2 = v1 * (d1 / d2) ** 2;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(v2, 4), enota: "m/s", besedilo: `Voda teče po cevi s premerom ${d1} cm s hitrostjo ${L(v1, 1)} m/s. Cev se zoži na premer ${d2} cm. Kolikšna je hitrost v ožjem delu?`, rezultat: `${T(v2, 2)} m/s`, postopek: `<p>Kontinuitetna enačba: \\(S_1v_1 = S_2v_2\\), \\(S \\propto d^2\\).</p><p>\\(v_2 = v_1\\left(\\frac{d_1}{d_2}\\right)^2 = ${L(v1, 1)} \\cdot \\left(\\frac{${d1}}{${d2}}\\right)^2 \\approx ${L(v2, 2)}\\ \\text{m/s}\\)</p>` });
  });
  serija("pretok", 4, (r) => {
    const d = r.int(1, 10), v = r.int(5, 40) / 10, S = Math.PI * (d / 200) ** 2, Q = S * v;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(Q * 1000, 4), enota: "L/s", besedilo: `Voda teče po cevi s premerom ${d} cm s hitrostjo ${L(v, 1)} m/s. Kolikšen je prostorninski pretok v litrih na sekundo?`, rezultat: `${T(Q * 1000, 3)} L/s`, postopek: `<p>\\(S = \\frac{\\pi d^2}{4} \\approx ${sci(S)}\\ \\text{m}^2\\)</p><p>\\(\\Phi_V = Sv \\approx ${sci(Q)}\\ \\text{m}^3/\\text{s} = ${L(Q * 1000, 3)}\\ \\text{L/s}\\)</p>` });
  });
  serija("bernoulli", 3, (r) => {
    const v1 = r.int(1, 5), v2 = v1 + r.int(1, 8), dp = 0.5 * 1000 * (v2 * v2 - v1 * v1);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: dp, enota: "Pa", besedilo: `Voda teče po vodoravni cevi. V širšem delu je hitrost ${v1} m/s, v ožjem ${v2} m/s. Za koliko je tlak v ožjem delu manjši?`, rezultat: `${T(dp, 0)} Pa`, postopek: `<p>Bernoullijeva enačba (vodoravno): \\(p_1 + \\frac{\\rho v_1^2}{2} = p_2 + \\frac{\\rho v_2^2}{2}\\).</p><p>\\(\\Delta p = \\frac{\\rho}{2}(v_2^2 - v_1^2) = 500 \\cdot (${v2 * v2} - ${v1 * v1}) = ${L(dp, 0)}\\ \\text{Pa}\\)</p>` });
  });
  serija("torricelli", 3, (r) => {
    const h = r.int(2, 50) / 10, v = Math.sqrt(2 * g * h);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 4), enota: "m/s", besedilo: `Iz majhne odprtine ${L(h, 1)} m pod gladino vode v široki posodi izteka voda. S kolikšno hitrostjo?`, rezultat: `${T(v, 2)} m/s`, postopek: `<p>Torricellijev izrek (iz Bernoullijeve enačbe): \\(v = \\sqrt{2gh} = \\sqrt{2 \\cdot 9{,}81 \\cdot ${L(h, 1)}} \\approx ${L(v, 2)}\\ \\text{m/s}\\)</p>` });
  });
  pojmi([
    ["tlak", "Razmerje med silo, ki deluje pravokotno na ploskev, in ploščino ploskve."],
    ["hidrostatični tlak", "Tlak v mirujoči tekočini zaradi teže tekočine nad dano globino."],
    ["vzgon", "Sila tekočine na potopljeno telo, enaka teži izpodrinjene tekočine."],
    ["Pascalov zakon", "Tlak, ki ga povzročimo v zaprti tekočini, se enako razširi na vse strani.", { brezVpisa: true }],
    ["kontinuitetna enačba", "Pri toku nestisljive tekočine je produkt preseka in hitrosti povsod enak.", { brezVpisa: true }],
    ["zračni tlak", "Tlak, ki ga povzroča teža ozračja; ob morju je približno 101 kPa."],
  ]);
  vprasanja([
    [2, "Zakaj so kolesa traktorja široka?", "večja ploskev zmanjša tlak na tla", ["zmanjšajo težo traktorja", "povečajo vzgon", "povečajo tlak na tla"], "\\(p = F/S\\): pri večji ploščini je tlak manjši."],
    [3, "Telo potonemo v vodo in nato v olje. Kje je vzgon večji?", "v vodi", ["v olju", "enak je", "odvisno od oblike telesa"], "Vzgon je \\(\\rho_t gV\\), voda ima večjo gostoto."],
  ]);
}
