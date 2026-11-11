import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
const G = 6.67e-11, c = 3e8, ae = 1.5e11, sl = 9.46e15, pc = 3.09e16, sigma = 5.67e-8;

export default function ({ serija, pojmi, vprasanja }) {
  serija("svetlobno-leto", 5, (r, i) => {
    const d = r.int(1, 1000) / 10;
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: d * sl, tol: 0.01, enota: "m", besedilo: `Zvezda je ${L(d, 1)} svetlobnih let daleč. Koliko je to metrov? (1 sv. l. = \\(9{,}46 \\cdot 10^{15}\\) m)`, rezultat: `\\(${sci(d * sl)}\\) m`, postopek: `<p>\\(${L(d, 1)} \\cdot 9{,}46 \\cdot 10^{15} \\approx ${sci(d * sl)}\\ \\text{m}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: d * pc / sl, tol: 0.01, enota: "sv. l.", besedilo: `Koliko svetlobnih let je ${L(d, 1)} pc? (1 pc = 3,26 sv. l.)`, rezultat: `${T((d * pc) / sl, 1)} sv. l.`, postopek: `<p>\\(${L(d, 1)} \\cdot 3{,}26 \\approx ${L((d * pc) / sl, 1)}\\) sv. l.</p>` });
  });
  serija("cas-svetlobe", 5, (r) => {
    const [ime, d] = r.izberi([["Sonca", ae], ["Lune", 3.84e8], ["Marsa (najbližja lega)", 5.6e10], ["Jupitra (povprečno)", 6.3e11], ["Saturna (povprečno)", 1.28e12]]);
    const t = d / c;
    return kolicina({ tezavnost: 1, vrednost: t, tol: 0.01, enota: "s", besedilo: `Koliko časa potuje svetloba od ${ime} do Zemlje? Razdalja je \\(${sci(d)}\\) m.`, rezultat: `${T(t, 1)} s`, postopek: `<p>\\(t = \\frac{d}{c} = \\frac{${sci(d)}}{3 \\cdot 10^8} \\approx ${L(t, 1)}\\ \\text{s}\\)</p>` });
  });
  serija("paralaksa", 5, (r) => {
    const p = r.int(5, 800) / 1000;
    return kolicina({ tezavnost: 2, vrednost: 1 / p, tol: 0.01, enota: "pc", besedilo: `Paralaksa zvezde je ${L(p, 3)}″. Kako daleč je zvezda v parsekih?`, rezultat: `${T(1 / p, 2)} pc`, postopek: `<p>\\(d = \\frac{1}{p} = \\frac{1}{${L(p, 3)}} \\approx ${L(1 / p, 2)}\\ \\text{pc}\\)</p>` });
  });
  serija("kepler", 5, (r, i) => {
    const a = r.int(3, 400) / 10, t = Math.sqrt(a ** 3);
    if (i % 2) {
      const tt = r.int(2, 200);
      return kolicina({ tezavnost: 3, vrednost: zaokrozi(Math.cbrt(tt * tt), 4), tol: 0.01, enota: "a.e.", besedilo: `Obhodni čas asteroida okoli Sonca je ${tt} let. Kolikšna je velika polos njegovega tira?`, rezultat: `${T(Math.cbrt(tt * tt), 2)} a.e.`, postopek: `<p>\\(a^3 = t_0^2\\) (v a.e. in letih): \\(a = \\sqrt[3]{${tt * tt}} \\approx ${L(Math.cbrt(tt * tt), 2)}\\) a.e.</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(t, 4), tol: 0.01, enota: "let", besedilo: `Telo kroži okoli Sonca z veliko polosjo ${L(a, 1)} a.e. Kolikšen je obhodni čas?`, rezultat: `${T(t, 2)} let`, postopek: `<p>Tretji Keplerjev zakon: \\(t_0^2 = a^3\\), \\(t_0 = \\sqrt{${L(a, 1)}^3} \\approx ${L(t, 2)}\\) let.</p>` });
  });
  serija("masa-centralnega", 4, (r) => {
    const [ime, R, t] = r.izberi([["Sonca (iz tira Zemlje)", ae, 3.156e7], ["Zemlje (iz tira Lune)", 3.84e8, 2.36e6], ["Jupitra (iz tira Io)", 4.22e8, 1.53e5], ["Marsa (iz tira Fobosa)", 9.38e6, 2.76e4]]);
    const M = (4 * Math.PI * Math.PI * R ** 3) / (G * t * t);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: M, tol: 0.02, enota: "kg", besedilo: `Izračunaj maso ${ime}: polmer tira je \\(${sci(R)}\\) m, obhodni čas \\(${sci(t)}\\) s.`, rezultat: `\\(${sci(M)}\\) kg`, postopek: `<p>\\(\\frac{GMm}{r^2} = m\\frac{4\\pi^2 r}{t_0^2}\\), \\(M = \\frac{4\\pi^2r^3}{Gt_0^2} \\approx ${sci(M)}\\ \\text{kg}\\)</p>` });
  });
  serija("ubezna", 4, (r) => {
    const [ime, M, R] = r.izberi([["Zemlje", 5.97e24, 6.37e6], ["Lune", 7.35e22, 1.74e6], ["Marsa", 6.42e23, 3.39e6], ["Jupitra", 1.9e27, 6.99e7]]);
    const v = Math.sqrt((2 * G * M) / R);
    return kolicina({ tezavnost: 3, vrednost: v / 1000, tol: 0.02, enota: "km/s", besedilo: `Kolikšna je ubežna hitrost s površja ${ime}? (\\(M = ${sci(M)}\\) kg, \\(R = ${sci(R)}\\) m)`, rezultat: `${T(v / 1000, 1)} km/s`, postopek: `<p>\\(\\frac{mv^2}{2} = \\frac{GMm}{R}\\), \\(v = \\sqrt{\\frac{2GM}{R}} \\approx ${L(v / 1000, 1)}\\ \\text{km/s}\\)</p>` });
  });
  serija("wien", 5, (r, i) => {
    const Tz = r.int(30, 300) * 100, lam = 2.9e-3 / Tz;
    if (i % 2) {
      const l = r.int(200, 1000);
      return kolicina({ tezavnost: 2, vrednost: 2.9e-3 / (l * 1e-9), tol: 0.01, enota: "K", besedilo: `Zvezda najmočneje seva pri valovni dolžini ${l} nm. Kolikšna je temperatura njenega površja? (\\(k_W = 2{,}9 \\cdot 10^{-3}\\) mK)`, rezultat: `${T(2.9e-3 / (l * 1e-9), 0)} K`, postopek: `<p>Wienov zakon: \\(T = \\frac{k_W}{\\lambda_{max}} = \\frac{2{,}9 \\cdot 10^{-3}}{${l} \\cdot 10^{-9}} \\approx ${L(2.9e-3 / (l * 1e-9), 0)}\\ \\text{K}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: lam * 1e9, tol: 0.01, enota: "nm", besedilo: `Pri kateri valovni dolžini najmočneje seva zvezda s površinsko temperaturo ${Tz} K?`, rezultat: `${T(lam * 1e9, 0)} nm`, postopek: `<p>\\(\\lambda_{max} = \\frac{2{,}9 \\cdot 10^{-3}}{${Tz}} \\approx ${L(lam * 1e9, 0)}\\ \\text{nm}\\)</p>` });
  });
  serija("izsev", 4, (r) => {
    const R = r.int(1, 30) / 10 * 6.96e8, Tz = r.int(30, 120) * 100, P = 4 * Math.PI * R * R * sigma * Tz ** 4;
    return kolicina({ tezavnost: 3, vrednost: P, tol: 0.02, enota: "W", besedilo: `Kolikšen je izsev zvezde s polmerom \\(${sci(R)}\\) m in površinsko temperaturo ${Tz} K? (\\(\\sigma = 5{,}67 \\cdot 10^{-8}\\) W/m²K⁴)`, rezultat: `\\(${sci(P)}\\) W`, postopek: `<p>\\(P = 4\\pi R^2\\sigma T^4 \\approx ${sci(P)}\\ \\text{W}\\)</p>` });
  });
  serija("solarna", 4, (r) => {
    const d = r.izberi([0.39, 0.72, 1, 1.52, 5.2]), j = 1360 / (d * d);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(j, 3), tol: 0.01, enota: "W/m²", besedilo: `Na razdalji Zemlje (1 a.e.) je gostota sončnega svetlobnega toka 1360 W/m². Kolikšna je na razdalji ${L(d, 2)} a.e.?`, rezultat: `${T(j, 0)} W/m²`, postopek: `<p>Gostota pada s kvadratom razdalje: \\(j = \\frac{1360}{${L(d, 2)}^2} \\approx ${L(j, 0)}\\ \\text{W/m}^2\\)</p>` });
  });
  serija("hubble", 4, (r, i) => {
    const H = 70, v = r.int(1, 100) * 100, d = v / H;
    return kolicina({ tezavnost: 3, vrednost: d, tol: 0.01, enota: "Mpc", besedilo: `Galaksija se oddaljuje s hitrostjo ${v} km/s. Kako daleč je, če je Hubblova konstanta 70 km/(s Mpc)?`, rezultat: `${T(d, 1)} Mpc`, postopek: `<p>Hubblov zakon: \\(v = H_0 d\\), \\(d = \\frac{${v}}{70} \\approx ${L(d, 1)}\\ \\text{Mpc}\\)</p>` });
  });
  serija("rdeci-premik", 3, (r) => {
    const l0 = 656.3, dl = r.int(1, 30), v = (c * dl) / l0;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: v / 1000, tol: 0.01, enota: "km/s", besedilo: `Vodikova črta (\\(\\lambda_0 = 656{,}3\\) nm) je v spektru galaksije premaknjena na ${L(l0 + dl, 1)} nm. S kolikšno hitrostjo se galaksija oddaljuje?`, rezultat: `${T(v / 1000, 0)} km/s`, postopek: `<p>Za \\(v \\ll c\\): \\(\\frac{\\Delta\\lambda}{\\lambda_0} = \\frac{v}{c}\\), \\(v = 3 \\cdot 10^5 \\cdot \\frac{${dl}}{656{,}3} \\approx ${L(v / 1000, 0)}\\ \\text{km/s}\\)</p>` });
  });
  pojmi([
    ["svetlobno leto", "Razdalja, ki jo svetloba prepotuje v enem letu."],
    ["astronomska enota", "Povprečna razdalja med Zemljo in Soncem, približno 150 milijonov km."],
    ["parsek", "Razdalja, s katere se polmer Zemljinega tira vidi pod kotom ene ločne sekunde."],
    ["rdeča orjakinja", "Velika hladnejša zvezda v pozni fazi razvoja, ki je v jedru porabila vodik."],
    ["bela pritlikavka", "Majhen, gost ostanek zvezde podobne Soncu, ki ne zliva več jeder."],
    ["nevtronska zvezda", "Izredno gost ostanek eksplozije supernove, sestavljen pretežno iz nevtronov."],
    ["črna luknja", "Območje, iz katerega zaradi gravitacije ne uide niti svetloba."],
    ["galaksija", "Velik sistem zvezd, plina, prahu in temne snovi, povezan z gravitacijo."],
    ["Hertzsprung-Russellov diagram", "Diagram, ki prikazuje izsev zvezd v odvisnosti od njihove površinske temperature.", { brezVpisa: true }],
  ]);
  vprasanja([
    [2, "Zakaj vidimo vedno isto stran Lune?", "ker je njen čas vrtenja okoli osi enak obhodnemu času okoli Zemlje", ["ker se Luna ne vrti okoli svoje osi", "ker Zemlja zakriva drugo stran", "ker Sonce osvetljuje le eno stran"], "Vezana rotacija: obe periodi sta približno 27,3 dneva."],
    [3, "Kaj je vir energije zvezd na glavni veji?", "zlivanje vodika v helij v jedru", ["cepitev urana", "gravitacijsko krčenje", "kemično gorenje"], "Na glavni veji zvezde v jedru zlivajo vodik."],
  ]);
}
