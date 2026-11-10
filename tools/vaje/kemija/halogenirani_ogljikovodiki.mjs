import { kolicina, izbira, besedilo, T, L } from "../lib.mjs";
import { F, molska, KOREN } from "../kemija-lib.mjs";
const HAL = [["F", "fluoro"], ["Cl", "kloro"], ["Br", "bromo"], ["I", "jodo"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("ime", 10, (r, i) => {
    const n = r.int(1, 4), [h, p] = r.izberi(HAL), poz = n >= 3 ? r.int(1, 2) : 0;
    const ime = `${poz ? `${poz}-` : ""}${p}${KOREN[n - 1]}an`;
    const f = `C${n > 1 ? n : ""}H${2 * n + 1}${h}`;
    if (i % 2) return izbira({ r, tezavnost: 1, besedilo: `Katera je molekulska formula spojine ${ime}?`, pravilna: F(f), napacne: [F(`C${n > 1 ? n : ""}H${2 * n}${h}2`), F(`C${n + 1}H${2 * n + 3}${h}`), F(`C${n > 1 ? n : ""}H${2 * n + 2}`)].filter((x) => x !== F(f)), postopek: `<p>Alkanu ${KOREN[n - 1]}anu en vodik zamenjamo z ${h}: ${F(f)}.</p>` });
    return besedilo({ tezavnost: 2, sprejemljivi: [ime, ime.replace(/^(\d)-/, "$1")], besedilo: `Poimenuj spojino ${n === 1 ? `CH<sub>3</sub>${h}` : n === 2 ? `CH<sub>3</sub>CH<sub>2</sub>${h}` : poz === 1 ? `${h}CH<sub>2</sub>${"CH<sub>2</sub>".repeat(n - 2)}CH<sub>3</sub>` : `CH<sub>3</sub>CH${h}${"CH<sub>2</sub>".repeat(n - 3)}CH<sub>3</sub>`}.`, rezultat: ime, postopek: `<p>Halogen zapišemo kot predpono (${p}-), pred njo položaj, nato ime alkana.</p>` });
  });
  serija("molska", 6, (r) => {
    const [f, ime] = r.izberi([["CH3Cl", "klorometan"], ["CH2Cl2", "diklorometan"], ["CHCl3", "triklorometan (kloroform)"], ["CCl4", "tetraklorometan"], ["C2H5Br", "bromoetan"], ["CF2Cl2", "diklorodifluorometan (freon-12)"], ["C2H4Cl2", "1,2-dikloroetan"]]);
    return kolicina({ tezavnost: 2, vrednost: molska(f), tol: 0.003, enota: "g/mol", besedilo: `Izračunaj molsko maso spojine ${ime} (${F(f)}).`, rezultat: `${T(molska(f), 2)} g/mol`, postopek: `<p>Seštejemo relativne atomske mase: \\(M \\approx ${L(molska(f), 2)}\\ \\text{g/mol}\\).</p>` });
  });
  serija("vrsta", 6, (r) => {
    const [f, odg] = r.izberi([["CH<sub>3</sub>CH<sub>2</sub>Cl", "primarni"], ["CH<sub>3</sub>CHClCH<sub>3</sub>", "sekundarni"], ["(CH<sub>3</sub>)<sub>3</sub>CBr", "terciarni"], ["CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>Br", "primarni"], ["CH<sub>3</sub>CHBrCH<sub>2</sub>CH<sub>3</sub>", "sekundarni"], ["(CH<sub>3</sub>)<sub>2</sub>CClCH<sub>2</sub>CH<sub>3</sub>", "terciarni"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšen halogenoalkan je ${f}?`, pravilna: odg, napacne: ["primarni", "sekundarni", "terciarni"].filter((x) => x !== odg), postopek: `<p>Štejemo alkilne skupine na C-atomu s halogenom: ena primarni, dve sekundarni, tri terciarni.</p>` });
  });
  serija("klor-delez", 4, (r) => {
    const [f, ime] = r.izberi([["CH3Cl", "klorometan"], ["CH2Cl2", "diklorometan"], ["CHCl3", "kloroform"], ["CCl4", "tetraklorometan"]]);
    const n = (f.match(/Cl(\d?)/)[1] || 1) * 1, w = (n * 35.45) / molska(f);
    return kolicina({ tezavnost: 3, vrednost: w * 100, tol: 0.005, enota: "%", besedilo: `Kolikšen je masni delež klora v ${ime} (${F(f)})?`, rezultat: `${T(w * 100, 2)} %`, postopek: `<p>\\(w(\\text{Cl}) = \\frac{${n} \\cdot 35{,}45}{${L(molska(f), 2)}} \\approx ${L(w * 100, 2)}\\,\\%\\)</p>` });
  });
  pojmi([
    ["halogenoalkan", "Spojina, v kateri je en ali več vodikov v alkanu zamenjanih s halogenom."],
    ["freoni", "Kloro-fluoro-ogljikovodiki, ki so nekdaj služili kot hladilna sredstva in razgrajujejo ozon."],
    ["kloroform", "Triklorometan, nekdaj uporabljen kot anestetik."],
    ["PVC", "Polimer vinil klorida, ki se uporablja za cevi, okna in izolacije."],
    ["teflon", "Politetrafluoroeten, polimer z zelo nizkim trenjem in visoko odpornostjo."],
    ["DDT", "Kloriran insekticid, ki se kopiči v prehranjevalnih verigah in je danes prepovedan."],
    ["ozonska luknja", "Območje stanjšane ozonske plasti, ki ga povzročajo tudi freoni."],
  ]);
  vprasanja([
    [2, "Zakaj so freone prepovedali?", "ker razgrajujejo ozon v stratosferi", ["ker so eksplozivni", "ker so dragi", "ker povzročajo kisli dež"], "UV-svetloba iz freonov sprošča klorove radikale, ki razgrajujejo ozon."],
    [3, "Kaj nastane pri reakciji bromoetana z vodno raztopino NaOH?", "etanol", ["eten", "etan", "dietil eter"], "Nukleofilna substitucija: OH<sup>−</sup> zamenja Br."],
    [3, "Kaj nastane pri segrevanju bromoetana s KOH v etanolu?", "eten", ["etanol", "etan", "etin"], "V alkoholnem mediju prevlada eliminacija."],
    [3, "Ali so halogenoalkani topni v vodi?", "slabo, ker ne tvorijo vodikovih vezi z vodo", ["zelo dobro", "le pri visoki temperaturi", "samo fluoroalkani"], "Kljub polarni vezi C–X so slabo topni."],
    [4, "Kateri halogenoalkan najhitreje reagira po mehanizmu S<sub>N</sub>1?", "terciarni", ["primarni", "sekundarni", "metilni"], "Terciarni karbokation je najbolj stabilen.", "visja"],
    [4, "Kateri halogenoalkan najhitreje reagira po mehanizmu S<sub>N</sub>2?", "metilni ali primarni", ["terciarni", "sekundarni", "vsi enako"], "Pri S<sub>N</sub>2 nukleofil napade s hrbtne strani, kar ovirajo velike skupine.", "visja"],
    [4, "Katera vez C–X je najšibkejša?", "C–I", ["C–F", "C–Cl", "C–Br"], "Večji halogen, daljša in šibkejša vez.", "visja"],
  ]);
}
