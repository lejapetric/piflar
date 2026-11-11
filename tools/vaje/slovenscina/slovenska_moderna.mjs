import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Na klancu", "Ivan Cankar", "roman"], ["Hlapec Jernej in njegova pravica", "Ivan Cankar", "povest"], ["Hlapci", "Ivan Cankar", "drama"], ["Kralj na Betajnovi", "Ivan Cankar", "drama"], ["Skodelica kave", "Ivan Cankar", "črtica"], ["Erotika", "Ivan Cankar", "pesniška zbirka"], ["Čaša opojnosti", "Oton Župančič", "pesniška zbirka"], ["Duma", "Oton Župančič", "pesnitev"], ["Ciciban", "Oton Župančič", "pesniška zbirka"], ["Na Jordanu", "Dragotin Kette", "sonet"], ["Pesmi in romance", "Josip Murn", "pesniška zbirka"], ["Pesem o ajdi", "Josip Murn", "pesem"]],
    osebe: [["Ivan Cankar", "je bil rojen na Vrhniki in je največji pisatelj moderne"], ["Oton Župančič", "je bil rojen v Vinici v Beli krajini"], ["Dragotin Kette", "je umrl v ljubljanski Cukrarni, star 23 let"], ["Josip Murn", "je pisal pod psevdonimom Aleksandrov"]],
  });
  pojmi([
    ["slovenska moderna", "Obdobje slovenske književnosti od 1899 do 1918."],
    ["Cukrarna", "Nekdanja tovarna v Ljubljani, kjer so stanovali mladi pesniki moderne."],
    ["simbol matere", "Značilen Cankarjev motiv požrtvovalnosti in krivde."],
    ["hrepenenje", "Osrednji motiv Cankarjeve proze."],
    ["impresionizem", "Smer, ki izraža trenutna razpoloženja z zvočnostjo in barvami."],
    ["simbolizem", "Smer, ki izraža skrite pomene s simboli."],
    ["dekadenca", "Smer, ki poudarja propadanje in utrujenost."],
    ["črtica", "Kratka pripoved z enim dogodkom ali razpoloženjem."],
    ["satira", "Smešenje družbenih napak (npr. Cankarjevi Hlapci)."],
    ["mladinska poezija", "Poezija za otroke, npr. Župančičev Ciciban."],
    ["Domovina in tujina", "Osrednje nasprotje Župančičeve Dume."],
  ]);
  vprasanja([
    [2, "Kaj se zgodi s Francko v romanu Na klancu?", "vse življenje teče za vozom in hrepeni po sreči, ki je ne doseže", ["postane bogata", "se izseli v Ameriko", "postane učiteljica"], "Simbol teka za vozom."],
    [3, "Zakaj gre hlapec Jernej po pravico vse do cesarja?", "ker mu po gospodarjevi smrti ne priznajo dela na kmetiji", ["ker ga je okradel sosed", "ker so mu požgali hišo", "ker je bil krivo obsojen umora"], "Na koncu sam požge hišo in ga ljudje vržejo v ogenj."],
    [4, "Kaj kritizira Cankar v drami Hlapci?", "hlapčevstvo izobražencev, ki se prilagajajo vsaki oblasti", ["kmečko revščino", "vojno", "cerkev v srednjem veku"], "Učitelji po volitvah spremenijo prepričanje.", "visja"],
    [4, "Kako je v Dumi prikazano razmerje med domovino in tujino?", "dvom med zvestobo domu in izseljevanjem, ki ga razreši vera v delo in prihodnost", ["poveličevanje tujine", "zavrnitev domovine", "potopis po Ameriki"], "»Kam, domovina, kam?«", "visja"],
  ]);
}
