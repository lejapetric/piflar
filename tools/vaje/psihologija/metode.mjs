import { izbira } from "../lib.mjs";
const EKS = [
  ["Raziskovalec preverja, ali glasba med učenjem vpliva na število zapomnjenih besed. Ena skupina se uči ob glasbi, druga v tišini.", "glasba med učenjem", "število zapomnjenih besed", "skupina, ki se uči v tišini"],
  ["Raziskovalka preverja, ali kofein skrajša reakcijski čas. Ena skupina dobi kavo s kofeinom, druga kavo brez kofeina.", "kofein", "reakcijski čas", "skupina, ki dobi kavo brez kofeina"],
  ["Psiholog preverja, ali pomanjkanje spanja poslabša reševanje matematičnih nalog. Ena skupina spi 4 ure, druga 8 ur.", "trajanje spanja", "uspeh pri reševanju nalog", "skupina, ki spi 8 ur"],
  ["Raziskovalec preverja, ali pohvala poveča vztrajnost otrok pri sestavljanki. Ena skupina dobiva pohvale, druga ne.", "pohvala", "vztrajnost pri sestavljanki", "skupina, ki ne dobiva pohval"],
  ["Raziskovalka preverja, ali barva sobe vpliva na razpoloženje. Ena skupina sedi v rumeni sobi, druga v sivi.", "barva sobe", "razpoloženje", "skupina v sivi sobi"],
  ["Psihologinja preverja, ali hrup zmanjša število rešenih ugank. Ena skupina rešuje ob hrupu, druga v tišini.", "hrup", "število rešenih ugank", "skupina, ki rešuje v tišini"],
];
export default function ({ serija, pojmi, vprasanja }) {
  serija("eksperiment", 18, (r, i) => {
    const [opis, nsp, osp, kon] = EKS[i % 6], kaj = Math.floor(i / 6);
    const vpr = ["Kaj je neodvisna spremenljivka?", "Kaj je odvisna spremenljivka?", "Katera je kontrolna skupina?"][kaj];
    const prav = [nsp, osp, kon][kaj];
    const nap = kaj === 2 ? ["skupina, ki je izpostavljena neodvisni spremenljivki", "vsi udeleženci skupaj", "raziskovalec"] : [kaj === 0 ? osp : nsp, "starost udeležencev", "raziskovalčeva hipoteza"];
    return izbira({ r, tezavnost: kaj === 2 ? 3 : 2, besedilo: `${opis} ${vpr}`, pravilna: prav, napacne: nap, postopek: `<p>Neodvisna spremenljivka je tisto, kar raziskovalec spreminja (${nsp}); odvisna je tisto, kar meri (${osp}); kontrolna skupina ni izpostavljena neodvisni spremenljivki (${kon}).</p>` });
  });
  pojmi([
    ["znanstvena metoda", "Sistematičen postopek od problema in hipoteze prek zbiranja podatkov do preverjanja in sklepa."],
    ["hipoteza", "Preverljiva domneva o povezavi med spremenljivkami."],
    ["ekstraspekcija", "Opazovanje vedenja drugih ljudi od zunaj."],
    ["introspekcija", "Opazovanje lastnega doživljanja, samoopazovanje."],
    ["eksperiment", "Metoda, pri kateri raziskovalec spreminja eno spremenljivko in meri učinek na drugo ob nadzoru drugih pogojev."],
    ["neodvisna spremenljivka", "Spremenljivka, ki jo raziskovalec v eksperimentu načrtno spreminja."],
    ["odvisna spremenljivka", "Spremenljivka, ki jo v eksperimentu merimo in je odvisna od spreminjanja druge."],
    ["eksperimentalna skupina", "Skupina, ki je izpostavljena neodvisni spremenljivki."],
    ["kontrolna skupina", "Skupina, ki ni izpostavljena neodvisni spremenljivki in služi za primerjavo."],
    ["moteča spremenljivka", "Dejavnik, ki ga raziskovalec ne nadzoruje in lahko vpliva na odvisno spremenljivko."],
    ["placebo", "Neučinkovita snov ali postopek, ki ga udeleženec doživlja kot pravo obravnavo."],
    ["dvojno slepi poskus", "Poskus, pri katerem niti udeleženci niti izvajalci ne vedo, kdo je v kateri skupini."],
    ["naravno opazovanje", "Opazovanje vedenja v vsakdanjem okolju brez poseganja raziskovalca."],
    ["študija primera", "Poglobljena raziskava enega posameznika ali majhne skupine."],
  ]);
  vprasanja([
    [3, "Zakaj udeležence v eksperimentu naključno razporedimo v skupine?", "da sta skupini v vseh drugih lastnostih čim bolj enaki", ["da je poskus hitrejši", "da udeleženci ne vedo za poskus", "da dobimo več podatkov"], "Naključna razporeditev izenači moteče spremenljivke med skupinama."],
    [4, "Raziskovalec ugotovi, da imajo dijaki, ki več berejo, boljše ocene. Kaj lahko sklepa?", "da sta branje in ocene povezana, ne pa nujno vzročno", ["da branje povzroča boljše ocene", "da boljše ocene povzročajo branje", "da povezave ni"], "Povezanost (korelacija) ne dokazuje vzročnosti; to lahko pokaže le eksperiment.", "visja"],
    [4, "Kaj je učinek pričakovanja raziskovalca (Rosenthalov učinek)?", "raziskovalčeva pričakovanja nehote vplivajo na izid raziskave", ["udeleženci pričakujejo nagrado", "rezultati so vedno pričakovani", "raziskovalec ponovi poskus"], "Zato uporabljamo dvojno slepe poskuse.", "visja"],
    [2, "Katera je glavna prednost eksperimenta pred opazovanjem?", "omogoča ugotavljanje vzročno-posledičnih odnosov", ["je cenejši", "poteka v naravnem okolju", "ne potrebuje hipoteze"], "Z nadzorom pogojev lahko sklepamo o vzroku."],
  ]);
}
