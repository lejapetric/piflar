import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["freske v kapeli Scrovegni v Padovi", "Giotto"], ["Maestà (sienski oltar)", "Duccio"], ["Oznanjenje (Uffizi)", "Simone Martini"], ["Gentski oltar", "brata van Eyck"], ["Arnolfinijeva poroka", "Jan van Eyck"], ["Mrtvaški ples v Hrastovljah", "Janez iz Kastva"], ["freske na Suhi pri Škofji Loki", "Jernej iz Loke"]],
    osebe: [["Giotto", "slikar, ki je v figure vnesel telesnost in čustva ter napovedal renesanso"], ["Duccio", "glavni slikar sienske šole z bizantinskimi prvinami"], ["Jan van Eyck", "nizozemski slikar, ki je izpopolnil oljno tehniko"], ["Janez iz Kastva", "istrski slikar mrtvaškega plesa v Hrastovljah (1490)"], ["Peter Parler", "praški stavbenik katedrale sv. Vida"]],
  });
  pojmi([
    ["šilasti lok", "Lok iz dveh krožnih lokov, ki se stikata v konici."],
    ["rebrasti obok", "Obok, pri katerem rebra nosijo težo in jo prenašajo na stebre."],
    ["oporni sistem", "Oporniki in oporni loki zunaj stavbe, ki prevzamejo potisk obokov."],
    ["vitraž", "Okno iz barvnih stekel, povezanih s svinčenimi trakovi."],
    ["rozeta", "Okroglo okno s krogovičjem na fasadi."],
    ["krogovičje", "Kamnita okrasna mreža v oknih."],
    ["katedrala", "Škofovska cerkev."],
    ["krilni oltar", "Oltar z vratci, ki jih lahko odpiramo in zapiramo."],
    ["lepa Madona", "Gotski tip nežne Marije z otrokom okoli leta 1400."],
    ["mrtvaški ples", "Prikaz smrti, ki vodi ljudi vseh stanov."],
    ["poznogotska arhitektura na Slovenskem", "Cerkve z zvezdastimi in mrežastimi oboki, npr. Ptujska Gora."],
  ]);
  vprasanja([
    [3, "Katera je prva gotska stavba (kor je bil posvečen 1144)?", "opatijska cerkev Saint-Denis pri Parizu", ["Notre-Dame v Parizu", "katedrala v Kölnu", "Hagija Sofija"], "Opat Suger je želel svetlobo kot simbol Boga."],
    [4, "Zakaj so gotske katedrale lahko imele visoke stene z velikimi okni?", "oporni sistem je prevzel potisk obokov, zato stene niso več nosile vse teže", ["ker so bile lesene", "ker niso imele obokov", "ker so bile nižje od romanskih"], "Skeletna gradnja.", "visja"],
    [4, "Zakaj velja Giotto za predhodnika renesanse?", "figure je upodobil plastično, v prostoru in s čustvi, ne kot ploske simbole", ["izumil je linearno perspektivo", "slikal je le pokrajine", "uporabljal je zlato ozadje"], "Freske v kapeli Scrovegni.", "visja"],
  ]);
}
