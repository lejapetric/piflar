import { kolicina, izbira, T, L } from "../lib.mjs";
import { F, molska, E, sestava } from "../kemija-lib.mjs";
const AK = [["glicin", "Gly", "C2H5NO2"], ["alanin", "Ala", "C3H7NO2"], ["valin", "Val", "C5H11NO2"], ["serin", "Ser", "C3H7NO3"], ["cistein", "Cys", "C3H7NO2S"], ["levcin", "Leu", "C6H13NO2"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("amin-vrsta", 6, (r) => {
    const [f, odg] = r.izberi([["CH<sub>3</sub>NH<sub>2</sub>", "primarni"], ["(CH<sub>3</sub>)<sub>2</sub>NH", "sekundarni"], ["(CH<sub>3</sub>)<sub>3</sub>N", "terciarni"], ["C<sub>2</sub>H<sub>5</sub>NH<sub>2</sub>", "primarni"], ["C<sub>6</sub>H<sub>5</sub>NH<sub>2</sub>", "primarni"], ["(C<sub>2</sub>H<sub>5</sub>)<sub>2</sub>NH", "sekundarni"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšen amin je ${f}?`, pravilna: odg, napacne: ["primarni", "sekundarni", "terciarni"].filter((x) => x !== odg), postopek: `<p>Štejemo organske skupine na dušiku: ena primarni, dve sekundarni, tri terciarni.</p>` });
  });
  serija("peptid", 8, (r, i) => {
    const n = r.int(2, 5), izb = Array.from({ length: n }, () => r.izberi(AK));
    const M = izb.reduce((s, [, , f]) => s + molska(f), 0) - (n - 1) * molska("H2O");
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: n - 1, enota: "", besedilo: `Koliko peptidnih vezi je v peptidu ${izb.map(([, k]) => k).join("–")}?`, rezultat: `${n - 1}`, postopek: `<p>Med ${n} aminokislinami je ${n - 1} peptidnih vezi.</p>` });
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: M, tol: 0.003, enota: "g/mol", besedilo: `Izračunaj molsko maso peptida ${izb.map(([ime, k]) => `${k}`).join("–")} (${izb.map(([ime, k, f]) => `${k}: ${F(f)}`).join(", ")}).`, rezultat: `${T(M, 2)} g/mol`, postopek: `<p>Seštejemo molske mase aminokislin in odštejemo ${n - 1} molekul vode (pri vsaki peptidni vezi se odcepi ena):</p><p>\\(M \\approx ${izb.map(([, , f]) => L(molska(f), 2)).join(" + ")} - ${n - 1} \\cdot 18{,}02 = ${L(M, 2)}\\ \\text{g/mol}\\)</p>` });
  });
  serija("dusik-delez", 5, (r) => {
    const [ime, k, f] = r.izberi(AK.concat([["sečnina", "", "CH4N2O"], ["amoniak", "", "NH3"]])), s = sestava(f), w = (s.N * E.N.Ar) / molska(f);
    return kolicina({ tezavnost: 2, vrednost: w * 100, tol: 0.005, enota: "%", besedilo: `Kolikšen je masni delež dušika v spojini ${ime} (${F(f)})?`, rezultat: `${T(w * 100, 2)} %`, postopek: `<p>\\(w(\\text{N}) = \\frac{${s.N} \\cdot 14{,}01}{${L(molska(f), 2)}} \\approx ${L(w * 100, 2)}\\,\\%\\)</p>` });
  });
  serija("zaporedja", 4, (r) => {
    const n = r.int(2, 4);
    const fak = (k) => (k <= 1 ? 1 : k * fak(k - 1));
    return kolicina({ tezavnost: 3, vrednost: fak(n), enota: "", besedilo: `Koliko različnih peptidov lahko nastane iz ${n} različnih aminokislin, če vsako uporabimo natanko enkrat?`, rezultat: `${fak(n)}`, postopek: `<p>Zaporedje je pomembno (N-konec in C-konec sta različna): \\(${n}! = ${fak(n)}\\).</p>` });
  });
  pojmi([
    ["amin", "Organska spojina, izpeljana iz amoniaka z zamenjavo vodikov z organskimi skupinami."],
    ["amid", "Spojina s skupino –CONH<sub>2</sub>, izpeljana iz karboksilne kisline."],
    ["aminokislina", "Spojina z amino in karboksilno skupino na isti molekuli."],
    ["peptidna vez", "Amidna vez med karboksilno skupino ene in amino skupino druge aminokisline."],
    ["beljakovina", "Biološka makromolekula iz verige aminokislin."],
    ["denaturacija", "Porušenje prostorske zgradbe beljakovine, npr. s segrevanjem."],
    ["anilin", "Najpreprostejši aromatski amin, C<sub>6</sub>H<sub>5</sub>NH<sub>2</sub>."],
    ["sečnina", "Spojina CO(NH<sub>2</sub>)<sub>2</sub>, ki jo izločamo z urinom in uporabljamo kot gnojilo."],
    ["ion dvojček", "Oblika aminokisline z naboji +NH<sub>3</sub> in COO<sup>−</sup> na isti molekuli."],
    ["nitro spojina", "Organska spojina s skupino –NO<sub>2</sub>."],
  ]);
  vprasanja([
    [2, "Zakaj so amini bazični?", "ker ima dušik prosti elektronski par, ki veže proton", ["ker vsebujejo skupino OH", "ker oddajajo protone", "ker so ionske spojine"], "Kot amoniak sprejmejo H<sup>+</sup>."],
    [3, "Kaj opisuje primarna zgradba beljakovine?", "zaporedje aminokislin v verigi", ["zvijanje v vijačnico", "prostorsko obliko celotne verige", "povezovanje več verig"], "Sekundarna je vijačnica/nagubana ploskev, terciarna prostorska oblika, kvartarna več verig."],
    [3, "Katere vezi stabilizirajo α-vijačnico beljakovine?", "vodikove vezi", ["ionske vezi", "disulfidni mostički", "kovinske vezi"], "Vodikove vezi med skupinami C=O in N–H v verigi."],
    [4, "Kakšen naboj ima glicin pri pH, nižjem od izoelektrične točke?", "pozitiven", ["negativen", "brez naboja", "odvisno od koncentracije"], "V kislem je amino skupina protonirana, karboksilna pa nevtralna.", "visja"],
    [4, "Katera aminokislina lahko tvori disulfidne mostičke?", "cistein", ["glicin", "alanin", "valin"], "Cistein ima skupino –SH.", "visja"],
  ]);
}
