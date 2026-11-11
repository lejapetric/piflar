import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Figarova svatba", "Wolfgang Amadeus Mozart"], ["Čarobna piščal", "Wolfgang Amadeus Mozart"], ["Don Giovanni", "Wolfgang Amadeus Mozart"], ["Requiem v d-molu", "Wolfgang Amadeus Mozart"], ["Simfonija s pavko (št. 94)", "Joseph Haydn"], ["Stvarjenje", "Joseph Haydn"], ["Cesarski kvartet", "Joseph Haydn"], ["5. simfonija v c-molu", "Ludwig van Beethoven"], ["9. simfonija z Odo radosti", "Ludwig van Beethoven"], ["Mesečinska sonata", "Ludwig van Beethoven"], ["Fidelio", "Ludwig van Beethoven"], ["Orfej in Evridika (reformna opera)", "Christoph Willibald Gluck"]],
    osebe: [["Joseph Haydn", "»oče simfonije in godalnega kvarteta«, dolga leta kapelnik pri knezih Esterházy"], ["Wolfgang Amadeus Mozart", "čudežni otrok iz Salzburga, avtor več kot 600 del"], ["Ludwig van Beethoven", "skladatelj, ki je kljub gluhoti ustvaril devet simfonij in odprl pot romantiki"], ["Christoph Willibald Gluck", "reformator opere, ki je glasbo podredil dramatiki"], ["Antonio Salieri", "dvorni kapelnik na Dunaju in učitelj Beethovna, Schuberta in Liszta"], ["Carl Philipp Emanuel Bach", "Bachov sin, predstavnik občutenega sloga"]],
  });
  pojmi([
    ["dunajski klasiki", "Haydn, Mozart in Beethoven, ki so delovali na Dunaju."],
    ["sonatna oblika", "Oblika z ekspozicijo, izpeljavo in reprizo."],
    ["godalni kvartet", "Zasedba in skladba za dve violini, violo in violončelo."],
    ["homofonija", "Glasbeni stavek z vodilno melodijo in spremljavo."],
    ["Albertijev bas", "Razloženi akordi v spremljavi levice pri klavirju."],
    ["kadenca", "Virtuozni solistični odsek v koncertu brez orkestra."],
    ["menuet", "Ples v tridobnem taktu, pogosto tretji stavek simfonije."],
    ["opera buffa", "Komična opera."],
    ["opera seria", "Resna opera z zgodovinsko ali mitološko vsebino."],
    ["singspiel", "Nemška opera z govorjenimi dialogi."],
  ]);
  vprasanja([
    [4, "Po čem se klasicistična glasba razlikuje od baročne?", "prevladuje homofonija s spevno melodijo, jasnimi frazami in postopno dinamiko", ["prevladujeta fuga in generalbas", "uporablja le terasasto dinamiko", "piše se samo za čembalo"], "Klavir izpodrine čembalo, crescendo nadomesti terasasto dinamiko.", "visja"],
    [4, "Zakaj Beethovna imenujemo most med klasicizmom in romantiko?", "razširil je klasične oblike in jim dal oseben, dramatičen izraz", ["ker je pisal le opere", "ker je zavračal sonatno obliko", "ker je živel v baroku"], "Npr. 9. simfonija z zborom.", "visja"],
  ]);
}
