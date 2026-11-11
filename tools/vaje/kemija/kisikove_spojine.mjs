import { kolicina, izbira, besedilo, T, L } from "../lib.mjs";
import { F, KOREN, alkohol, kislina, molska } from "../kemija-lib.mjs";
const pis = (f) => F(f.replace(/^C1H/, "CH"));
const SKUPINE = [["–OH", "hidroksilna", "alkoholi"], ["–CHO", "aldehidna (formilna)", "aldehidi"], ["–CO–", "karbonilna (ketonska)", "ketoni"], ["–COOH", "karboksilna", "karboksilne kisline"], ["–COO–", "estrska", "estri"], ["–O–", "etrska", "etri"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("alkohol-ime", 7, (r, i) => {
    const n = r.int(1, 6), im = n <= 2 ? `${KOREN[n - 1]}anol` : `${KOREN[n - 1]}an-1-ol`;
    if (i % 2) return izbira({ r, tezavnost: 1, besedilo: `Katera je formula alkohola ${im}?`, pravilna: pis(alkohol(n)), napacne: [pis(alkohol(n + 1)), pis(kislina(n)), pis(`C${n}H${2 * n + 2}`)].filter((x) => x !== pis(alkohol(n))), postopek: `<p>Alkoholi: C<sub>n</sub>H<sub>2n+1</sub>OH; za n = ${n}: ${pis(alkohol(n))}.</p>` });
    return besedilo({ tezavnost: 2, sprejemljivi: [im, n > 2 ? `${KOREN[n - 1]}anol` : im, n > 2 ? `1-${KOREN[n - 1]}anol` : im], besedilo: `Kako se imenuje alkohol ${pis(alkohol(n))} (OH na prvem C-atomu)?`, rezultat: im, postopek: `<p>Imenu alkana dodamo končnico -ol in mesto skupine OH.</p>` });
  });
  serija("kislina-ime", 6, (r) => {
    const n = r.int(1, 5), sist = `${KOREN[n - 1]}anojska kislina`, triv = ["mravljinčna kislina", "ocetna kislina", "propionska kislina", "maslena kislina", "valerianska kislina"][n - 1];
    return izbira({ r, tezavnost: 2, besedilo: `Katera kislina ima formulo ${pis(kislina(n))}?`, pravilna: `${sist} (${triv})`, napacne: [1, 2, 3, 4, 5].filter((k) => k !== n).slice(0, 3).map((k) => `${KOREN[k - 1]}anojska kislina (${["mravljinčna kislina", "ocetna kislina", "propionska kislina", "maslena kislina", "valerianska kislina"][k - 1]})`), postopek: `<p>Ogljik karboksilne skupine štejemo v verigo: ${n} C-atom${n === 1 ? "" : "i"}, ${sist}.</p>` });
  });
  serija("skupina", 8, (r, i) => {
    const [z, sk, raz] = r.izberi(SKUPINE);
    if (i % 2) return izbira({ r, tezavnost: 1, besedilo: `Katero funkcionalno skupino vsebujejo ${raz}?`, pravilna: `${z} (${sk})`, napacne: SKUPINE.filter(([zz]) => zz !== z).slice(0, 3).map(([zz, s]) => `${zz} (${s})`), postopek: `<p>${raz.charAt(0).toUpperCase() + raz.slice(1)} vsebujejo ${sk} skupino ${z}.</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Spojina vsebuje skupino ${z}. V katero skupino spojin spada?`, pravilna: raz, napacne: SKUPINE.filter(([zz]) => zz !== z).slice(0, 3).map(([, , rr]) => rr), postopek: `<p>Skupina ${z} je ${sk}, značilna za ${raz}.</p>` });
  });
  serija("oksidacija", 6, (r) => {
    const [zac, odg, nap, raz] = r.izberi([
      ["primarnega alkohola (blago)", "aldehid", ["keton", "eter", "ester"], "Primarni alkohol se oksidira v aldehid, ob nadaljnji oksidaciji v karboksilno kislino."],
      ["sekundarnega alkohola", "keton", ["aldehid", "karboksilna kislina", "eter"], "Sekundarni alkohol se oksidira v keton."],
      ["aldehida", "karboksilna kislina", ["keton", "alkohol", "eter"], "Aldehid se oksidira v karboksilno kislino."],
      ["terciarnega alkohola (pri blagih pogojih)", "ne oksidira se", ["keton", "aldehid", "karboksilna kislina"], "Terciarni alkohol nima vodika na C-atomu s skupino OH."],
      ["etanola (blago)", "etanal", ["etanojska kislina", "propanon", "dietil eter"], "Etanol je primarni alkohol, blaga oksidacija da etanal."],
      ["propan-2-ola", "propanon (aceton)", ["propanal", "propanojska kislina", "propen"], "Propan-2-ol je sekundarni alkohol."],
    ]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj nastane pri oksidaciji ${zac}?`, pravilna: odg, napacne: nap, postopek: `<p>${raz}</p>` });
  });
  serija("ester", 6, (r) => {
    const a = r.int(1, 4), k = r.int(1, 4);
    const kis = `${KOREN[k - 1]}anojske kisline`, alk = `${KOREN[a - 1]}anola`.replace("propanola", "propan-1-ola").replace("butanola", "butan-1-ola");
    const est = `${KOREN[a - 1]}il ${KOREN[k - 1]}anoat`;
    return izbira({ r, tezavnost: 3, besedilo: `Kateri ester nastane pri reakciji ${kis} in ${alk}?`, pravilna: est, napacne: [`${KOREN[k - 1]}il ${KOREN[a - 1]}anoat`, `${KOREN[a - 1]}il ${KOREN[k]}anoat`, `${KOREN[a]}il ${KOREN[k - 1]}anoat`].filter((x) => x !== est), postopek: `<p>Ime estra: najprej alkilna skupina iz alkohola (${KOREN[a - 1]}il), nato ion kisline (${KOREN[k - 1]}anoat).</p>` });
  });
  serija("molska", 5, (r) => {
    const n = r.int(1, 6), [f, im] = r.izberi([[alkohol(n), `${KOREN[n - 1]}anol`], [kislina(n), `${KOREN[n - 1]}anojska kislina`]]);
    const M = molska(f.replace(/^C1H/, "CH"));
    return kolicina({ tezavnost: 2, vrednost: M, tol: 0.003, enota: "g/mol", besedilo: `Izračunaj molsko maso spojine ${pis(f)} (${im}).`, rezultat: `${T(M, 2)} g/mol`, postopek: `<p>Seštejemo relativne atomske mase vseh atomov: \\(M \\approx ${L(M, 2)}\\ \\text{g/mol}\\).</p>` });
  });
  serija("vrsta-alkohola", 5, (r) => {
    const [f, odg] = r.izberi([["CH<sub>3</sub>CH<sub>2</sub>OH", "primarni"], ["CH<sub>3</sub>CH(OH)CH<sub>3</sub>", "sekundarni"], ["(CH<sub>3</sub>)<sub>3</sub>COH", "terciarni"], ["CH<sub>3</sub>CH<sub>2</sub>CH<sub>2</sub>OH", "primarni"], ["CH<sub>3</sub>CH(OH)CH<sub>2</sub>CH<sub>3</sub>", "sekundarni"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšen alkohol je ${f}?`, pravilna: odg, napacne: ["primarni", "sekundarni", "terciarni"].filter((x) => x !== odg), postopek: `<p>Štejemo C-atome, vezane na C-atom s skupino OH: 1 primarni, 2 sekundarni, 3 terciarni.</p>` });
  });
  serija("visja-saponifikacija", 3, (r) => {
    const m = r.int(10, 200), M = 885.4; // triolein
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: (3 * m) / M * 40, tol: 0.01, enota: "g", besedilo: `Koliko gramov NaOH potrebujemo za umiljenje ${m} g trioleina (M = 885,4 g/mol)?`, rezultat: `${T(((3 * m) / M) * 40, 2)} g`, postopek: `<p>Triglicerid reagira s 3 mol NaOH: \\(n(\\text{NaOH}) = 3 \\cdot \\frac{${m}}{885{,}4}\\).</p><p>\\(m = n \\cdot 40{,}0 \\approx ${L(((3 * m) / M) * 40, 2)}\\ \\text{g}\\)</p>` });
  });
  pojmi([
    ["alkohol", "Spojina s hidroksilno skupino, vezano na nasičen C-atom."],
    ["fenol", "Spojina s hidroksilno skupino, vezano neposredno na benzenov obroč."],
    ["aldehid", "Spojina s skupino –CHO na koncu verige."],
    ["keton", "Spojina s karbonilno skupino, vezano na dva C-atoma."],
    ["karboksilna kislina", "Spojina s skupino –COOH."],
    ["ester", "Produkt reakcije karboksilne kisline z alkoholom."],
    ["esterifikacija", "Reakcija kisline in alkohola, pri kateri nastaneta ester in voda."],
    ["eter", "Spojina, v kateri je kisik vezan na dve alkilni skupini."],
    ["maščoba", "Ester glicerola in višjih maščobnih kislin."],
  ]);
}
