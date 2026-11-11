import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Kranjska gramatika", "Marko Pohlin", "slovnica"], ["Županova Micka", "Anton Tomaž Linhart", "komedija"], ["Ta veseli dan ali Matiček se ženi", "Anton Tomaž Linhart", "komedija"], ["Pesme za pokušino", "Valentin Vodnik", "pesniška zbirka"], ["Lublanske novice", "Valentin Vodnik", "časopis"], ["Ilirija oživljena", "Valentin Vodnik", "pesem"], ["Zadovoljni Kranjec", "Valentin Vodnik", "pesem"], ["Slovnica (1808)", "Jernej Kopitar", "slovnica"], ["Poskus zgodovine Kranjske", "Anton Tomaž Linhart", "zgodovinsko delo"]],
    osebe: [["Žiga Zois", "je bil mecen in središče razsvetljenskega kroga"], ["Marko Pohlin", "je bil avguštinec in začetnik narodnega preporoda"], ["Anton Tomaž Linhart", "je napisal prvi slovenski komediji"], ["Valentin Vodnik", "je urejal prvi slovenski časopis"], ["Jernej Kopitar", "je bil jezikoslovec na Dunaju"]],
  });
  pojmi([
    ["narodni preporod", "Gibanje za prebujo narodne zavesti in rabo slovenščine."],
    ["Zoisov krog", "Skupina razsvetljencev okoli barona Žige Zoisa."],
    ["Pisanice", "Prvi slovenski pesniški almanah (1779–1781)."],
    ["almanah", "Zbornik literarnih besedil, ki izhaja periodično."],
    ["komedija", "Dramska vrsta s srečnim koncem in smešnimi prizori."],
    ["priredba", "Delo, ki ga avtor prilagodi slovenskim razmeram po tujem vzoru."],
    ["poučnost", "Značilnost razsvetljenske literature, ki želi izobraziti bralca."],
    ["terezijanske reforme", "Reforme Marije Terezije, med njimi šolska obveznost."],
    ["Lublanske novice", "Prvi slovenski časopis, ki ga je urejal Vodnik."],
    ["razsvetljenski absolutizem", "Vladavina, ki z reformami uvaja razumne novosti."],
    ["Ilirske province", "Napoleonova upravna tvorba, ki jo je opeval Vodnik."],
  ]);
  vprasanja([
    [2, "Po katerem vzoru je Linhart napisal Matička?", "po Beaumarchaisjevi Figarovi svatbi", ["po Molièrovem Skopuhu", "po Shakespearovem Hamletu", "po Goldonijevih komedijah"], "Linhart je dogajanje prenesel na Slovensko."],
    [3, "Kdaj je bila prva uprizoritev Županove Micke?", "leta 1789", ["leta 1550", "leta 1848", "leta 1918"], "Prva slovenska posvetna gledališka predstava."],
    [4, "Zakaj je Vodnik napisal pesem Ilirija oživljena?", "ker je v Ilirskih provincah videl priložnost za razvoj slovenščine", ["ker je sovražil Francoze", "da bi slavil Avstrijo", "ker je bil zaprt"], "Po vrnitvi Avstrije je bil zaradi tega upokojen.", "visja"],
  ]);
}
