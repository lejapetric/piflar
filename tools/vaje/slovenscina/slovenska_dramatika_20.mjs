import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Antigona", "Dominik Smole", "drama"], ["Afera", "Primož Kozak", "drama"], ["Dialogi", "Primož Kozak", "drama"], ["Osvoboditev Skopja", "Dušan Jovanović", "drama"], ["Svatba", "Rudi Šeligo", "drama"], ["Veliki briljantni valček", "Drago Jančar", "drama"], ["Pohujšanje v dolini šentflorjanski", "Ivan Cankar", "farsa"], ["Dogodek v mestu Gogi", "Slavko Grum", "drama"], ["Celjski grofje", "Bratko Kreft", "drama"], ["Vladimir", "Matjaž Zupančič", "drama"]],
    osebe: [["Dominik Smole", "je napisal Antigono, v kateri Antigona ne nastopi"], ["Primož Kozak", "je pisal drame o razmerju med posameznikom in revolucijo"], ["Dušan Jovanović", "je režiser in dramatik avantgardnega gledališča"], ["Ivan Cankar", "je v farsi smešil malomeščansko hinavščino"], ["Slavko Grum", "je bil zdravnik in avtor ekspresionistične drame"]],
  });
  pojmi([
    ["drama", "Književna zvrst, namenjena uprizoritvi."],
    ["farsa", "Komedija z grotesknimi prizori in pretiravanjem."],
    ["groteska", "Prepletanje smešnega in grozljivega."],
    ["eksistencialistična drama", "Drama o svobodi, odgovornosti in smislu."],
    ["gledališče absurda", "Drama brez logične zgodbe."],
    ["Oder 57", "Eksperimentalno gledališče v Ljubljani konec 1950-ih."],
    ["Eksperimentalno gledališče Glej", "Alternativno gledališče, ustanovljeno leta 1970."],
    ["didaskalije", "Odrska navodila v dramskem besedilu."],
    ["dramski konflikt", "Spopad nasprotnih teženj v drami."],
    ["postmodernistična drama", "Drama, ki se igra s citati in žanri."],
    ["antična snov", "Snov iz grške mitologije, pogosto obujena v sodobni drami."],
  ]);
  vprasanja([
    [3, "Posebnost Smoletove Antigone je, da …", "Antigona sama ne nastopi na odru", ["se konča srečno", "nastopa le zbor", "je napisana v verzih brez oseb"], "O njej govorijo druge osebe."],
    [4, "Kakšno vprašanje odpira Kozakova Afera?", "razmerje med revolucionarno oblastjo in posameznikovo resnico", ["ljubezen dveh kmetov", "grške bogove", "zgodovino Celjskih grofov"], "Drama ideje.", "visja"],
    [4, "Kaj simbolizira umobolnica v Jančarjevem Velikem briljantnem valčku?", "totalitarno družbo, ki zdravi drugačno mislečo", ["šolo", "cerkev", "vojsko"], "Kritika totalitarizma.", "visja"],
  ]);
}
