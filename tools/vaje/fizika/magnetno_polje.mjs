import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const mu0 = 4 * Math.PI * 1e-7, e = 1.6e-19, me = 9.11e-31, mp = 1.67e-27;
const rad = (k) => (k * Math.PI) / 180;

export default function ({ serija, pojmi, vprasanja }) {
  serija("sila-vodnik", 7, (r, i) => {
    const I = r.int(1, 50), l = r.int(5, 100) / 100, B = r.int(1, 100) / 100, k = i < 4 ? 90 : r.izberi([30, 45, 60]);
    const F = I * l * B * Math.sin(rad(k));
    return kolicina({ tezavnost: k === 90 ? 1 : 2, vrednost: zaokrozi(F, 5), enota: "N", besedilo: `Vodnik dolžine ${L(l * 100, 0)} cm, po katerem teče tok ${I} A, je v magnetnem polju z gostoto ${L(B, 2)} T${k === 90 ? ", pravokotno na silnice" : ` pod kotom ${k}° glede na silnice`}. Kolikšna sila deluje nanj?`, rezultat: `${T(F, 3)} N`, postopek: `<p>\\(F = IlB${k === 90 ? "" : "\\sin\\alpha"} = ${I} \\cdot ${L(l, 2)} \\cdot ${L(B, 2)}${k === 90 ? "" : ` \\cdot \\sin ${k}°`} \\approx ${L(F, 3)}\\ \\text{N}\\)</p>` });
  });
  serija("lorentz", 5, (r) => {
    const v = r.int(1, 50) * 1e5, B = r.int(1, 100) / 100;
    const F = e * v * B;
    return kolicina({ tezavnost: 2, vrednost: F, tol: 0.02, enota: "N", besedilo: `Elektron se giblje s hitrostjo \\(${sci(v)}\\) m/s pravokotno na magnetno polje z gostoto ${L(B, 2)} T. Kolikšna sila deluje nanj? (vpiši npr. 1,2e-13)`, rezultat: `\\(${sci(F)}\\) N`, postopek: `<p>\\(F = evB = 1{,}6 \\cdot 10^{-19} \\cdot ${sci(v)} \\cdot ${L(B, 2)} \\approx ${sci(F)}\\ \\text{N}\\)</p>` });
  });
  serija("krozenje", 6, (r, i) => {
    const [ime, m] = i % 2 ? ["proton", mp] : ["elektron", me], v = r.int(1, 50) * 1e5, B = r.int(1, 100) / 1000;
    const R = (m * v) / (e * B);
    return kolicina({ tezavnost: 3, vrednost: R, tol: 0.02, enota: "m", besedilo: `${ime === "proton" ? "Proton" : "Elektron"} s hitrostjo \\(${sci(v)}\\) m/s prileti pravokotno v magnetno polje z gostoto ${L(B * 1000, 0)} mT. Kolikšen je polmer krožnice? (\\(m_${ime === "proton" ? "p" : "e"} = ${sci(m)}\\) kg)`, rezultat: `\\(${sci(R)}\\) m`, postopek: `<p>Magnetna sila je radialna: \\(evB = \\frac{mv^2}{r}\\).</p><p>\\(r = \\frac{mv}{eB} = \\frac{${sci(m)} \\cdot ${sci(v)}}{1{,}6 \\cdot 10^{-19} \\cdot ${sci(B)}} \\approx ${sci(R)}\\ \\text{m}\\)</p>` });
  });
  serija("ravni-vodnik", 6, (r) => {
    const I = r.int(1, 100), d = r.int(1, 50) / 100, B = (mu0 * I) / (2 * Math.PI * d);
    return kolicina({ tezavnost: 2, vrednost: B * 1e6, tol: 0.02, enota: "µT", besedilo: `Kolikšna je gostota magnetnega polja ${L(d * 100, 0)} cm od dolgega ravnega vodnika, po katerem teče tok ${I} A? (\\(\\mu_0 = 4\\pi \\cdot 10^{-7}\\) Vs/Am)`, rezultat: `${T(B * 1e6, 2)} µT`, postopek: `<p>\\(B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{4\\pi \\cdot 10^{-7} \\cdot ${I}}{2\\pi \\cdot ${L(d, 2)}} \\approx ${sci(B)}\\ \\text{T}\\)</p>` });
  });
  serija("tuljava", 6, (r, i) => {
    const N = r.int(100, 2000), l = r.int(10, 50) / 100, I = r.int(1, 50) / 10, B = (mu0 * N * I) / l;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: zaokrozi((B * l) / (mu0 * N), 6), enota: "A", besedilo: `Kolikšen tok mora teči skozi tuljavo z ${N} ovoji in dolžino ${L(l * 100, 0)} cm, da je gostota polja v njej ${L(B * 1000, 2)} mT?`, rezultat: `${T(I, 2)} A`, postopek: `<p>\\(B = \\frac{\\mu_0 NI}{l}\\), \\(I = \\frac{Bl}{\\mu_0 N} \\approx ${L(I, 2)}\\ \\text{A}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: B * 1000, tol: 0.02, enota: "mT", besedilo: `Dolga tuljava ima ${N} ovojev in dolžino ${L(l * 100, 0)} cm. Teče tok ${L(I, 1)} A. Kolikšna je gostota magnetnega polja v njej?`, rezultat: `${T(B * 1000, 2)} mT`, postopek: `<p>\\(B = \\frac{\\mu_0 NI}{l} = \\frac{4\\pi \\cdot 10^{-7} \\cdot ${N} \\cdot ${L(I, 1)}}{${L(l, 2)}} \\approx ${L(B * 1000, 2)}\\ \\text{mT}\\)</p>` });
  });
  serija("dva-vodnika", 4, (r) => {
    const I1 = r.int(1, 50), I2 = r.int(1, 50), d = r.int(1, 20) / 100, l = 1;
    const F = (mu0 * I1 * I2 * l) / (2 * Math.PI * d);
    return kolicina({ tezavnost: 3, vrednost: F * 1e6, tol: 0.02, enota: "µN", besedilo: `Vzporedna vodnika sta ${L(d * 100, 0)} cm narazen, po njiju tečeta toka ${I1} A in ${I2} A v isti smeri. Kolikšna sila deluje na 1 m dolžine? (V µN.)`, rezultat: `${T(F * 1e6, 1)} µN (privlačna)`, postopek: `<p>\\(\\frac{F}{l} = \\frac{\\mu_0 I_1 I_2}{2\\pi d} = \\frac{2 \\cdot 10^{-7} \\cdot ${I1} \\cdot ${I2}}{${L(d, 2)}} \\approx ${sci(F)}\\ \\text{N/m}\\)</p><p>Toka v isti smeri se privlačita.</p>` });
  });
  serija("navor-zanka", 4, (r) => {
    const N = r.int(10, 200), S = r.int(1, 100) / 10000, I = r.int(1, 30) / 10, B = r.int(1, 50) / 100;
    const M = N * I * S * B;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(M, 7), enota: "Nm", besedilo: `Tuljavica z ${N} ovoji in ploščino ${L(S * 10000, 0)} cm² je v magnetnem polju ${L(B, 2)} T, njena ravnina je vzporedna s silnicami. Teče tok ${L(I, 1)} A. Kolikšen je navor?`, rezultat: `${T(M, 4)} Nm`, postopek: `<p>\\(M = NISB = ${N} \\cdot ${L(I, 1)} \\cdot ${sci(S)} \\cdot ${L(B, 2)} \\approx ${sci(M)}\\ \\text{Nm}\\)</p>` });
  });
  serija("masni-spektrometer", 3, (r) => {
    const U = r.int(100, 5000), B = r.int(5, 50) / 100;
    const v = Math.sqrt((2 * e * U) / mp), R = (mp * v) / (e * B);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: R * 100, tol: 0.02, enota: "cm", besedilo: `Proton pospešimo z napetostjo ${U} V in usmerimo pravokotno v magnetno polje ${L(B, 2)} T. Kolikšen je polmer njegove krožnice v centimetrih?`, rezultat: `${T(R * 100, 2)} cm`, postopek: `<p>\\(v = \\sqrt{\\frac{2eU}{m_p}} \\approx ${sci(v)}\\ \\text{m/s}\\)</p><p>\\(r = \\frac{m_pv}{eB} \\approx ${sci(R)}\\ \\text{m}\\)</p>` });
  });
  serija("hitrostni-filter", 3, (r) => {
    const E = r.int(1, 100) * 1000, B = r.int(1, 50) / 100;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: E / B, tol: 0.01, enota: "m/s", besedilo: `V hitrostnem filtru sta električno polje ${E} V/m in magnetno polje ${L(B, 2)} T pravokotna. S kolikšno hitrostjo gredo delci skozi neodklonjeni?`, rezultat: `\\(${sci(E / B)}\\) m/s`, postopek: `<p>Sili se izničita: \\(eE = evB\\), \\(v = \\frac{E}{B} = ${sci(E / B)}\\ \\text{m/s}\\)</p>` });
  });
  serija("smer", 4, (r) => {
    const [opis, odg] = r.izberi([
      ["Po vodniku teče tok proti severu, magnetno polje kaže navzgor. V katero smer deluje sila na vodnik?", "proti vzhodu"],
      ["Po vodniku teče tok proti vzhodu, magnetno polje kaže proti severu. V katero smer deluje sila?", "navzgor"],
      ["Pozitiven delec se giblje proti vzhodu, polje kaže navzgor. V katero smer deluje sila?", "proti jugu"],
      ["Elektron se giblje proti vzhodu, polje kaže navzgor. V katero smer deluje sila?", "proti severu"],
    ]);
    return izbira({ r, tezavnost: 3, besedilo: opis, pravilna: odg, napacne: ["proti zahodu", "navzgor", "proti jugu", "proti severu", "navzdol", "proti vzhodu"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>Smer sile določimo z vektorskim produktom \\(\\vec{F} = q\\vec{v} \\times \\vec{B}\\) (pravilo desne roke); pri negativnem naboju je smer obratna. Rezultat: ${odg}.</p>` });
  });
  pojmi([
    ["gostota magnetnega polja", "Vektorska količina, ki opisuje magnetno polje; merimo jo v teslah."],
    ["magnetna silnica", "Sklenjena črta, katere tangenta kaže smer magnetnega polja."],
    ["Lorentzova sila", "Sila magnetnega polja na naboj, ki se giblje v polju."],
    ["feromagnetna snov", "Snov, ki jo magnet močno privlači in se lahko trajno namagneti, npr. železo."],
    ["elektromagnet", "Tuljava z železnim jedrom, ki je magnet le, ko teče tok."],
    ["magnetni pol", "Mesto na magnetu, kjer je magnetno polje najmočnejše."],
  ]);
  vprasanja([
    [2, "Ali magnetna sila spremeni velikost hitrosti nabitega delca?", "Ne", ["Da"], "Sila je ves čas pravokotna na hitrost, zato ne opravlja dela; spreminja se le smer."],
    [3, "Kaj se zgodi s polmerom kroženja delca v magnetnem polju, če podvojimo njegovo hitrost?", "podvoji se", ["razpolovi se", "poveča se štirikrat", "ostane enak"], "\\(r = \\frac{mv}{eB}\\), polmer je sorazmeren s hitrostjo."],
  ]);
}
