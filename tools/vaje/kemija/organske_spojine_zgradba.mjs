import { kolicina, izbira, T, L } from "../lib.mjs";
import { F, molska, E, sestava } from "../kemija-lib.mjs";

const ORG = [["CH4", "metan"], ["C2H6", "etan"], ["C2H4", "eten"], ["C2H2", "etin"], ["C6H6", "benzen"], ["C2H5OH", "etanol"], ["CH3COOH", "ocetna kislina"], ["C3H8", "propan"], ["C6H12O6", "glukoza"], ["CH3OH", "metanol"], ["HCHO", "metanal"], ["CH3COCH3", "propanon"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("empiricna", 6, (r) => {
    const [f, ime, emp] = r.izberi([["C6H12O6", "glukoza", "CH2O"], ["C2H4", "eten", "CH2"], ["C6H6", "benzen", "CH"], ["C2H6", "etan", "CH3"], ["C4H10", "butan", "C2H5"], ["C2H4O2", "ocetna kislina", "CH2O"], ["C8H18", "oktan", "C4H9"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katera je empirična formula spojine ${F(f)} (${ime})?`, pravilna: F(emp), napacne: [F(f), F(emp.replace(/H(\d*)/, (m, k) => `H${(+k || 1) + 1}`)), F("C2H3")].filter((x, i, a) => x !== F(emp) && a.indexOf(x) === i).slice(0, 3), postopek: `<p>Indekse delimo z največjim skupnim deliteljem: ${F(f)} → ${F(emp)}.</p>` });
  });
  serija("st-vezi", 6, (r) => {
    const [f, ime, s, p] = r.izberi([["C2H6", "etan", 7, 0], ["C2H4", "eten", 5, 1], ["C2H2", "etin", 3, 2], ["CH4", "metan", 4, 0], ["C3H6", "propen", 8, 1], ["CO2", "ogljikov dioksid", 2, 2]]);
    const kaj = r.izberi(["σ", "π"]);
    return kolicina({ tezavnost: 3, vrednost: kaj === "σ" ? s : p, enota: "", besedilo: `Koliko ${kaj}-vezi je v molekuli ${F(f)} (${ime})?`, rezultat: `${kaj === "σ" ? s : p}`, postopek: `<p>Vsaka enojna vez je σ, dvojna je σ + π, trojna σ + 2π. ${F(f)}: ${s} σ in ${p} π.</p>` });
  });
  serija("hibridizacija", 6, (r) => {
    const [opis, h] = r.izberi([["ogljika v metanu", "sp<sup>3</sup>"], ["ogljika v etenu", "sp<sup>2</sup>"], ["ogljika v etinu", "sp"], ["ogljika v benzenu", "sp<sup>2</sup>"], ["karbonilnega ogljika v propanonu", "sp<sup>2</sup>"], ["ogljika v CO<sub>2</sub>", "sp"], ["ogljika v etanu", "sp<sup>3</sup>"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kakšna je hibridizacija ${opis}?`, pravilna: h, napacne: ["sp", "sp<sup>2</sup>", "sp<sup>3</sup>"].filter((x) => x !== h), postopek: `<p>Štiri enojne vezi: sp<sup>3</sup> (tetraeder); ena dvojna: sp<sup>2</sup> (trikotnik); trojna ali dve dvojni: sp (linearno).</p>` });
  });
  serija("masni-delez-C", 6, (r) => {
    const [f, ime] = r.izberi(ORG), s = sestava(f), w = (s.C * E.C.Ar) / molska(f);
    return kolicina({ tezavnost: 2, vrednost: w * 100, tol: 0.005, enota: "%", besedilo: `Kolikšen je masni delež ogljika v spojini ${F(f)} (${ime})?`, rezultat: `${T(w * 100, 2)} %`, postopek: `<p>\\(w(\\text{C}) = \\frac{${s.C} \\cdot 12{,}01}{${L(molska(f), 2)}} \\approx ${L(w * 100, 2)}\\,\\%\\)</p>` });
  });
  serija("izomerija", 6, (r) => {
    const [a, b, odg] = r.izberi([["butan", "2-metilpropan", "verižna (konstitucijska) izomera"], ["propan-1-ol", "propan-2-ol", "položajna izomera"], ["etanol", "dimetil eter", "funkcionalna izomera"], ["cis-but-2-en", "trans-but-2-en", "geometrijska (cis-trans) izomera"], ["but-1-en", "but-2-en", "položajna izomera"], ["propanal", "propanon", "funkcionalna izomera"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kakšna izomera sta ${a} in ${b}?`, pravilna: odg, napacne: ["verižna (konstitucijska) izomera", "položajna izomera", "funkcionalna izomera", "geometrijska (cis-trans) izomera", "nista izomera"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>Izomeri imata enako molekulsko formulo in različno zgradbo. ${a} in ${b}: ${odg}.</p>` });
  });
  serija("zgorevanje", 5, (r) => {
    const n = r.int(1, 6), h = r.int(1, 7), mC = n * 44.01, mH = h * 9.008; // ugani formulo CxHy iz CO2 in H2O
    const m = r.int(1, 5) / 10;
    const M = n * 12.01 + 2 * h * 1.008, k = m / M;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: (h * 2) / n, tol: 0.01, enota: "", besedilo: `Pri gorenju ${T(m, 1)} g ogljikovodika nastane ${T(k * n * 44.01, 3)} g CO<sub>2</sub> in ${T(k * h * 18.02, 3)} g H<sub>2</sub>O. Kolikšno je razmerje števila atomov H : C v spojini? (Vpiši eno število, npr. 2,5.)`, rezultat: `${T((h * 2) / n, 3)} (formula ${F(`C${n}H${2 * h}`)} ali njen večkratnik)`, postopek: `<p>\\(n(\\text{C}) = n(\\text{CO}_2) = \\frac{${L(k * n * 44.01, 3)}}{44{,}01}\\), \\(n(\\text{H}) = 2n(\\text{H}_2\\text{O}) = 2 \\cdot \\frac{${L(k * h * 18.02, 3)}}{18{,}02}\\)</p><p>Razmerje \\(\\frac{n(\\text{H})}{n(\\text{C})} \\approx ${L((h * 2) / n, 3)}\\)</p>` });
  });
  pojmi([
    ["organska kemija", "Kemija ogljikovih spojin (razen najpreprostejših, kot so oksidi in karbonati)."],
    ["funkcionalna skupina", "Skupina atomov, ki določa značilne lastnosti organske spojine."],
    ["izomeri", "Spojine z enako molekulsko formulo, a različno zgradbo."],
    ["strukturna formula", "Formula, ki prikazuje vse vezi med atomi v molekuli."],
    ["racionalna formula", "Skrajšan zapis, ki prikazuje skupine atomov, npr. CH<sub>3</sub>CH<sub>2</sub>OH."],
    ["kiralni C-atom", "Ogljikov atom, vezan na štiri različne skupine."],
    ["enantiomera", "Stereoizomera, ki sta si kot zrcalni sliki in se ne prekrivata."],
    ["nasičena spojina", "Spojina s samimi enojnimi vezmi med C-atomi."],
    ["heteroatom", "Atom, ki ni ogljik ali vodik, v organski molekuli, npr. O, N, S."],
  ]);
  vprasanja([
    [2, "Koliko kovalentnih vezi običajno tvori atom ogljika?", "4", ["2", "3", "6"], "Ogljik ima 4 valenčne elektrone."],
    [3, "Ali je butan-2-ol kiralna molekula?", "Da", ["Ne"], "Drugi C-atom je vezan na H, OH, CH<sub>3</sub> in C<sub>2</sub>H<sub>5</sub>."],
    [4, "Koliko stereoizomerov ima molekula z dvema različnima kiralnima centroma?", "4", ["2", "3", "8"], "Največ \\(2^n\\) stereoizomerov za n kiralnih centrov.", "visja"],
  ]);
}
