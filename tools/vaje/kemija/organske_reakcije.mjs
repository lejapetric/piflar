import { kolicina, izbira, T, L } from "../lib.mjs";
import { F, molska } from "../kemija-lib.mjs";

const REAK = [
  ["CH<sub>4</sub> + Cl<sub>2</sub> → CH<sub>3</sub>Cl + HCl (svetloba)", "radikalska substitucija"],
  ["CH<sub>2</sub>=CH<sub>2</sub> + Br<sub>2</sub> → CH<sub>2</sub>Br–CH<sub>2</sub>Br", "elektrofilna adicija"],
  ["CH<sub>2</sub>=CH<sub>2</sub> + H<sub>2</sub>O → CH<sub>3</sub>CH<sub>2</sub>OH (kislina)", "elektrofilna adicija"],
  ["CH<sub>3</sub>CH<sub>2</sub>Br + OH<sup>−</sup> → CH<sub>3</sub>CH<sub>2</sub>OH + Br<sup>−</sup>", "nukleofilna substitucija"],
  ["CH<sub>3</sub>CH<sub>2</sub>OH → CH<sub>2</sub>=CH<sub>2</sub> + H<sub>2</sub>O (konc. H<sub>2</sub>SO<sub>4</sub>, segrevanje)", "eliminacija"],
  ["C<sub>6</sub>H<sub>6</sub> + HNO<sub>3</sub> → C<sub>6</sub>H<sub>5</sub>NO<sub>2</sub> + H<sub>2</sub>O (H<sub>2</sub>SO<sub>4</sub>)", "elektrofilna substitucija"],
  ["CH<sub>3</sub>COOH + C<sub>2</sub>H<sub>5</sub>OH → CH<sub>3</sub>COOC<sub>2</sub>H<sub>5</sub> + H<sub>2</sub>O", "kondenzacija (esterifikacija)"],
  ["CH<sub>3</sub>CHO + HCN → CH<sub>3</sub>CH(OH)CN", "nukleofilna adicija"],
  ["n CH<sub>2</sub>=CH<sub>2</sub> → (–CH<sub>2</sub>–CH<sub>2</sub>–)<sub>n</sub>", "adicijska polimerizacija"],
  ["CH<sub>3</sub>CH<sub>2</sub>Cl + KOH (etanol, segrevanje) → CH<sub>2</sub>=CH<sub>2</sub> + KCl + H<sub>2</sub>O", "eliminacija"],
  ["CH<sub>3</sub>COOC<sub>2</sub>H<sub>5</sub> + H<sub>2</sub>O → CH<sub>3</sub>COOH + C<sub>2</sub>H<sub>5</sub>OH", "hidroliza"],
  ["C<sub>6</sub>H<sub>6</sub> + Br<sub>2</sub> → C<sub>6</sub>H<sub>5</sub>Br + HBr (FeBr<sub>3</sub>)", "elektrofilna substitucija"],
];
const VRSTE = [...new Set(REAK.map(([, v]) => v))];

export default function ({ serija, pojmi, vprasanja }) {
  serija("vrsta", 14, (r) => {
    const [en, v] = r.izberi(REAK);
    return izbira({ r, tezavnost: 2, besedilo: `Katera vrsta reakcije je ${en}?`, pravilna: v, napacne: r.premesaj(VRSTE.filter((x) => x !== v)).slice(0, 3), postopek: `<p>${v.charAt(0).toUpperCase() + v.slice(1)}. ${v.includes("adicija") ? "Na dvojno (ali trojno) vez se adirata dva dela reagenta." : v.includes("substitucija") ? "En atom ali skupina se zamenja z drugim." : v === "eliminacija" ? "Iz molekule se odcepi majhna molekula, nastane dvojna vez." : v.includes("kondenzacija") ? "Dve molekuli se povežeta, odcepi se voda." : v === "hidroliza" ? "Molekula se razcepi z vodo." : "Monomeri se povežejo v dolgo verigo."}</p>` });
  });
  serija("adicija-masa", 5, (r) => {
    const m = r.int(1, 50), n = m / molska("C2H4"), mp = n * (molska("C2H4") + 2 * 79.9);
    return kolicina({ tezavnost: 3, vrednost: mp, tol: 0.01, enota: "g", besedilo: `Koliko gramov 1,2-dibromoetana nastane, ko ${m} g etena zreagira s presežkom broma?`, rezultat: `${T(mp, 1)} g`, postopek: `<p>C<sub>2</sub>H<sub>4</sub> + Br<sub>2</sub> → C<sub>2</sub>H<sub>4</sub>Br<sub>2</sub> (razmerje 1 : 1)</p><p>\\(n = \\frac{${m}}{28{,}05}\\), \\(M(\\text{C}_2\\text{H}_4\\text{Br}_2) = 187{,}9\\ \\text{g/mol}\\), \\(m \\approx ${L(mp, 1)}\\ \\text{g}\\)</p>` });
  });
  serija("esterifikacija-masa", 5, (r) => {
    const m = r.int(5, 100), n = m / 60.05, eta = r.int(50, 90) / 100, mp = n * 88.11 * eta;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: mp, tol: 0.01, enota: "g", besedilo: `Iz ${m} g ocetne kisline in presežka etanola pripravimo etil etanoat (M = 88,11 g/mol). Izkoristek je ${L(eta * 100, 0)} %. Koliko estra dobimo?`, rezultat: `${T(mp, 1)} g`, postopek: `<p>\\(n(\\text{kisline}) = \\frac{${m}}{60{,}05} \\approx ${L(n, 4)}\\ \\text{mol}\\)</p><p>\\(m = ${L(n, 4)} \\cdot 88{,}11 \\cdot ${L(eta, 2)} \\approx ${L(mp, 1)}\\ \\text{g}\\)</p>` });
  });
  serija("produkt", 8, (r) => {
    const [vpr, odg, nap] = r.izberi([
      ["Kaj nastane pri adiciji vodika na eten (katalizator Ni)?", "etan", ["etin", "etanol", "kloroetan"]],
      ["Kaj nastane pri adiciji HCl na eten?", "kloroetan", ["1,2-dikloroetan", "etanol", "etan"]],
      ["Kaj nastane pri adiciji vode na eten (kisla kataliza)?", "etanol", ["etanal", "etanojska kislina", "etan"]],
      ["Kaj nastane pri hidrolizi bromoetana z NaOH?", "etanol", ["eten", "etan", "etanal"]],
      ["Kaj nastane pri nitriranju benzena?", "nitrobenzen", ["anilin", "fenol", "toluen"]],
      ["Kaj nastane pri adiciji HBr na propen (Markovnikovo pravilo)?", "2-bromopropan", ["1-bromopropan", "1,2-dibromopropan", "propan"]],
      ["Kaj nastane pri dehidrataciji etanola?", "eten", ["etan", "etanal", "dietil eter in voda vedno"]],
      ["Kaj nastane pri popolni oksidaciji etanola?", "etanojska kislina", ["etanal", "eten", "etan"]],
    ]);
    return izbira({ r, tezavnost: 2, besedilo: vpr, pravilna: odg, napacne: nap, postopek: `<p>Produkt: ${odg}.</p>` });
  });
  pojmi([
    ["adicija", "Reakcija, pri kateri se na nenasičeno vez veže drugi reagent."],
    ["substitucija", "Reakcija, pri kateri se atom ali skupina zamenja z drugim atomom ali skupino."],
    ["eliminacija", "Reakcija, pri kateri se iz molekule odcepi majhna molekula in nastane dvojna vez."],
    ["nukleofil", "Delec s prostim elektronskim parom, ki napade elektronsko reven atom."],
    ["elektrofil", "Delec s pomanjkanjem elektronov, ki napade elektronsko bogato mesto."],
    ["radikal", "Delec z neparnim elektronom."],
    ["Markovnikovo pravilo", "Pri adiciji HX se vodik veže na C-atom dvojne vezi, ki že ima več vodikov.", { brezVpisa: true }],
    ["hidroliza", "Razcep spojine z vodo."],
    ["kondenzacija", "Spajanje dveh molekul ob odcepu majhne molekule, običajno vode."],
  ]);
  vprasanja([
    [3, "Kako ločimo alkan od alkena z bromovico?", "alken razbarva bromovico, alkan ne (v temi)", ["alkan razbarva bromovico, alken ne", "oba razbarvata", "nobeden ne razbarva"], "Brom se adira na dvojno vez."],
    [4, "Zakaj benzen raje vstopa v substitucijo kot v adicijo?", "ker se pri substituciji ohrani stabilen aromatski sistem", ["ker nima dvojnih vezi", "ker je nasičen", "ker je zelo polaren"], "Delokalizirani π-elektroni dajejo obroču dodatno stabilnost.", "visja"],
    [4, "V kateri stopnji radikalske substitucije nastanejo radikali iz molekule klora?", "iniciacija", ["propagacija", "terminacija", "eliminacija"], "Svetloba razcepi Cl<sub>2</sub> na dva radikala.", "visja"],
  ]);
}
