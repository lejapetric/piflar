import { kolicina, izbira, besedilo, T } from "../lib.mjs";
import { ELEMENTI, E } from "../kemija-lib.mjs";

const PER = (Z) => (Z <= 2 ? 1 : Z <= 10 ? 2 : Z <= 18 ? 3 : Z <= 36 ? 4 : Z <= 54 ? 5 : 6);
const SKUP = { 1: 1, 2: 18, 3: 1, 4: 2, 5: 13, 6: 14, 7: 15, 8: 16, 9: 17, 10: 18, 11: 1, 12: 2, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 1, 20: 2, 35: 17, 53: 17, 56: 2, 30: 12, 29: 11, 26: 8, 47: 11, 82: 14, 25: 7, 24: 6, 79: 11, 50: 14 };
const IME_SKUPINE = { 1: "alkalijske kovine", 2: "zemeljskoalkalijske kovine", 17: "halogeni", 18: "žlahtni plini", 16: "halkogeni" };

export default function ({ serija, pojmi, vprasanja }) {
  serija("simbol", 10, (r, i) => {
    const [s, ime, Z] = r.izberi(ELEMENTI);
    if (i % 2) return besedilo({ tezavnost: 1, sprejemljivi: [s], besedilo: `Kateri je simbol elementa ${ime}?`, rezultat: s, postopek: `<p>${ime.charAt(0).toUpperCase() + ime.slice(1)}: ${s} (\\(Z = ${Z}\\)).</p>` });
    return besedilo({ tezavnost: 1, sprejemljivi: [ime, ime.normalize("NFD").replace(/[̀-ͯ]/g, "")], besedilo: `Kateri element ima simbol ${s}?`, rezultat: ime, postopek: `<p>${s}: ${ime} (\\(Z = ${Z}\\)).</p>` });
  });
  serija("perioda", 8, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI);
    return kolicina({ tezavnost: 1, vrednost: PER(Z), enota: "", besedilo: `V kateri periodi je element ${ime} (${s}, \\(Z = ${Z}\\))?`, rezultat: `${PER(Z)}. perioda`, postopek: `<p>Številka periode je število elektronskih lupin. Periode se končajo pri Z = 2, 10, 18, 36, 54, 86; ${Z} je v ${PER(Z)}. periodi.</p>` });
  });
  serija("skupina", 8, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI.filter(([, , z]) => SKUP[z]));
    return kolicina({ tezavnost: 2, vrednost: SKUP[Z], enota: "", besedilo: `V kateri skupini (1–18) je element ${ime} (${s})?`, rezultat: `${SKUP[Z]}. skupina${IME_SKUPINE[SKUP[Z]] ? ` (${IME_SKUPINE[SKUP[Z]]})` : ""}`, postopek: `<p>${ime.charAt(0).toUpperCase() + ime.slice(1)} je v ${SKUP[Z]}. skupini${IME_SKUPINE[SKUP[Z]] ? `, med elementi, ki jih imenujemo ${IME_SKUPINE[SKUP[Z]]}` : ""}.</p>` });
  });
  serija("trendi", 10, (r) => {
    const pari = [["Na", "Cl"], ["Li", "Cs"], ["F", "I"], ["Mg", "Ca"], ["O", "S"], ["K", "Br"], ["Al", "P"], ["C", "Si"]];
    const [a, b] = r.izberi(pari), lastnost = r.izberi(["polmer", "en", "ion"]);
    const Za = E[a]?.Z ?? 55, Zb = E[b]?.Z ?? 55, ista = PER(Za) === PER(Zb);
    let odg;
    if (lastnost === "polmer") odg = ista ? (Za < Zb ? a : b) : (Za > Zb ? a : b);
    else { odg = ista ? (Za > Zb ? a : b) : (Za < Zb ? a : b); }
    const opis = { polmer: "večji atomski polmer", en: "večjo elektronegativnost", ion: "večjo ionizacijsko energijo" }[lastnost];
    return izbira({ r, tezavnost: 3, besedilo: `Kateri element ima ${opis}: ${a} ali ${b}?`, pravilna: odg, napacne: [odg === a ? b : a], postopek: `<p>V periodi od leve proti desni ${lastnost === "polmer" ? "se polmer zmanjšuje" : "narašča"}, v skupini navzdol ${lastnost === "polmer" ? "se polmer povečuje" : "pada"}. Odgovor: ${odg}.</p>` });
  });
  serija("vrsta-elementa", 6, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI);
    const kov = ["Li", "Be", "Na", "Mg", "Al", "K", "Ca", "Fe", "Cu", "Zn", "Ag", "Ba", "Pb", "Mn", "Cr", "Au", "Sn"].includes(s), pol = ["B", "Si"].includes(s);
    const odg = kov ? "kovina" : pol ? "polkovina" : "nekovina";
    return izbira({ r, tezavnost: 1, besedilo: `Ali je ${ime} (${s}) kovina, nekovina ali polkovina?`, pravilna: odg, napacne: ["kovina", "nekovina", "polkovina"].filter((x) => x !== odg), postopek: `<p>Kovine so levo in v sredini periodnega sistema, nekovine desno zgoraj, polkovine ob meji med njimi. ${ime.charAt(0).toUpperCase() + ime.slice(1)} je ${odg}.</p>` });
  });
  serija("naboj-iona", 6, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI.filter(([, , z]) => [1, 2, 13, 15, 16, 17].includes(SKUP[z]) && z > 2 && z <= 20));
    const g = SKUP[Z], q = g <= 2 ? g : g === 13 ? 3 : g - 18;
    return kolicina({ tezavnost: 2, vrednost: q, enota: "", besedilo: `Kakšen naboj ima najpogostejši ion elementa ${ime} (${s})? (Vpiši število s predznakom, npr. -2.)`, rezultat: `${q > 0 ? "+" : ""}${q}`, postopek: `<p>Element v ${g}. skupini ${q > 0 ? `odda ${q}` : `sprejme ${-q}`} ${Math.abs(q) === 1 ? "elektron" : "elektrone"}, da doseže elektronsko konfiguracijo žlahtnega plina.</p>` });
  });
  pojmi([
    ["perioda", "Vodoravna vrsta periodnega sistema; elementi imajo enako število lupin."],
    ["skupina", "Navpični stolpec periodnega sistema; elementi imajo podobne lastnosti."],
    ["ionizacijska energija", "Energija, potrebna, da atomu v plinastem stanju odvzamemo elektron."],
    ["atomski polmer", "Polovica razdalje med jedroma dveh sosednjih enakih atomov."],
    ["žlahtni plini", "Elementi 18. skupine s polno zunanjo lupino, ki so zelo nereaktivni."],
    ["prehodni elementi", "Elementi od 3. do 12. skupine, pri katerih se polnijo d-orbitale."],
    ["oktetno pravilo", "Atomi težijo k osmim elektronom na zunanji lupini."],
    ["polkovina", "Element z lastnostmi med kovinami in nekovinami, npr. silicij."],
  ]);
  vprasanja([
    [2, "Kdo je sestavil periodni sistem, ki ga uporabljamo kot osnovo danes?", "Dmitrij Mendelejev", ["Antoine Lavoisier", "John Dalton", "Niels Bohr"], "Mendelejev je leta 1869 uredil elemente po atomski masi in napovedal še neodkrite elemente."],
    [3, "Po čem so elementi urejeni v sodobnem periodnem sistemu?", "po naraščajočem vrstnem številu", ["po naraščajoči atomski masi", "po gostoti", "po abecedi"], "Moseley je pokazal, da je pravo merilo število protonov."],
    [4, "Zakaj ima kalij manjšo prvo ionizacijsko energijo kot natrij?", "ker je zunanji elektron dlje od jedra in bolj zasenčen", ["ker ima kalij manj protonov", "ker ima kalij manjši atomski polmer", "ker je kalij nekovina"], "V skupini navzdol se dodaja lupina, zato je valenčni elektron šibkeje vezan.", "visja"],
    [4, "Zakaj je atomski polmer klora manjši od polmera natrija?", "ker ima klor večji naboj jedra pri enakem številu lupin", ["ker ima klor manj elektronov", "ker je klor plin", "ker ima klor več lupin"], "V periodi narašča efektivni naboj jedra, ki elektrone privlači bližje.", "visja"],
    [4, "Kateri ion je večji: Na<sup>+</sup> ali F<sup>−</sup>?", "F<sup>−</sup>", ["Na<sup>+</sup>"], "Oba imata 10 elektronov, a F<sup>−</sup> ima le 9 protonov, zato elektrone privlači šibkeje.", "visja"],
    [4, "Kateri element ima elektronsko konfiguracijo [Ar] 4s<sup>2</sup> 3d<sup>6</sup>?", "železo", ["kobalt", "mangan", "nikelj"], "[Ar] ima 18 elektronov, skupaj 26: železo.", "visja"],
  ]);
}
