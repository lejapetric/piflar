import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Trpljenje mladega Wertherja", "Johann Wolfgang Goethe", "roman"], ["Faust", "Johann Wolfgang Goethe", "drama"], ["Jevgenij Onjegin", "Aleksander Puškin", "roman v verzih"], ["Notredamski zvonar", "Victor Hugo", "roman"], ["Knjiga pesmi", "Heinrich Heine", "pesniška zbirka"], ["Krokar", "Edgar Allan Poe", "pesem"], ["Gospod Tadej", "Adam Mickiewicz", "ep"], ["Razbojniki", "Friedrich Schiller", "drama"], ["Romanje grofa Harolda", "George Gordon Byron", "pesnitev"], ["Nesrečniki", "Victor Hugo", "roman"]],
    osebe: [["George Gordon Byron", "je umrl v grški osvobodilni vojni"], ["Aleksander Puškin", "je umrl po dvoboju"], ["Heinrich Heine", "je bil nemški pesnik ironije in ljubezni"], ["Edgar Allan Poe", "je začetnik detektivke in grozljive zgodbe"], ["Adam Mickiewicz", "je največji poljski romantični pesnik"], ["Victor Hugo", "je vodja francoske romantike"]],
  });
  pojmi([
    ["romantika", "Smer prve polovice 19. stoletja, ki poudarja čustva in domišljijo."],
    ["svetobolje", "Razpoloženje razočaranega romantika nad svetom."],
    ["romantična ironija", "Zavestno razbijanje iluzije in posmeh lastnim čustvom."],
    ["razdvojenost", "Nasprotje med idealom in resničnostjo."],
    ["byronski junak", "Uporen, osamljen in razočaran junak."],
    ["odvečni človek", "Ruski literarni tip nadarjenega, a nekoristnega plemiča."],
    ["zgodovinski roman", "Roman, postavljen v preteklo zgodovinsko obdobje."],
    ["predromantika", "Prehodno obdobje med razsvetljenstvom in romantiko (vihar in naval)."],
    ["romanca", "Pripovedna pesem z romantično snovjo."],
    ["hrepenenje", "Osrednje romantično čustvo po nedosegljivem."],
    ["subjektivnost", "Postavljanje posameznikovega doživljanja v ospredje."],
  ]);
  vprasanja([
    [2, "S kom sklene Faust pogodbo?", "z Mefistom", ["z Margareto", "z Wagnerjem", "z Bogom"], "Mefisto mu obljubi užitek, Faust pa stavi svojo dušo."],
    [3, "Zakaj si Werther vzame življenje?", "zaradi nesrečne ljubezni do Lotte", ["zaradi revščine", "zaradi vojne", "zaradi bolezni"], "Roman v pismih je sprožil val posnemanja."],
    [4, "Kakšen literarni tip je Jevgenij Onjegin?", "odvečni človek", ["pozitivni junak", "pikaro", "detektiv"], "Plemič, ki ne najde smisla v družbi.", "visja"],
    [4, "Kaj je Faustovo iskanje?", "neskončna želja po spoznanju in polnem življenju", ["iskanje zlata", "maščevanje", "pot domov"], "Faustovski človek nikoli ni zadovoljen s trenutkom.", "visja"],
  ]);
}
