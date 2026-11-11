import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Groza", "Edvard Kocbek", "pesniška zbirka"], ["Požgana trava", "Dane Zajc", "pesniška zbirka"], ["Poker", "Tomaž Šalamun", "pesniška zbirka"], ["Odisej", "Gregor Strniša", "pesniška zbirka"], ["Nekoga moraš imeti rad", "Ivan Minatti", "pesem"], ["Južni otok", "Kajetan Kovič", "pesniška zbirka"], ["Pelin žena", "Svetlana Makarovič", "pesniška zbirka"], ["Previharimo viharje", "Matej Bor", "pesniška zbirka"], ["Kajuhove pesmi", "Karel Destovnik Kajuh", "pesniška zbirka"], ["Stiski", "Niko Grafenauer", "pesniška zbirka"]],
    osebe: [["Dane Zajc", "je pesnik temne, eksistencialne poezije in ritualnih ponavljanj"], ["Tomaž Šalamun", "je začetnik slovenskega modernizma z ludizmom in provokacijo"], ["Svetlana Makarovič", "je pesnica in avtorica pravljic o Sapramiški"], ["Edvard Kocbek", "je v Strahu in pogumu odprl vprašanje morale v vojni"], ["Matej Bor", "je avtor partizanskih pesmi in prevajalec Shakespeara"], ["Karel Destovnik Kajuh", "je padel kot partizan leta 1944"]],
  });
  pojmi([
    ["intimizem", "Smer po letu 1950, ki se vrne k osebnim doživetjem."],
    ["eksistencializem", "Smer, ki izraža tesnobo in odtujenost človeka."],
    ["modernizem", "Smer 1960-ih, ki razbija tradicionalno obliko in pomen."],
    ["ludizem", "Igrivost z jezikom in pomeni v modernistični poeziji."],
    ["reizem", "Smer, ki v ospredje postavlja predmete (reči)."],
    ["partizanska poezija", "Poezija iz narodnoosvobodilnega boja."],
    ["Pesmi štirih", "Zbornik štirih intimističnih pesnikov iz leta 1953."],
    ["prosti verz", "Verz brez rime in stalnega metra."],
    ["neoavantgarda", "Ponovna avantgarda 1960-ih z eksperimenti."],
    ["postmodernizem", "Smer, ki se igra s tradicijo in citati."],
    ["balada", "Pripovedna pesem s tragičnim koncem, obujena pri Makarovičevi."],
  ]);
  vprasanja([
    [3, "Kateri štirje pesniki so izdali Pesmi štirih?", "Kovič, Menart, Pavček in Zlobec", ["Zajc, Šalamun, Strniša in Taufer", "Kosovel, Gradnik, Kocbek in Bor", "Župančič, Cankar, Kette in Murn"], "Začetek intimizma."],
    [4, "Kaj je značilno za Šalamunovo zbirko Poker?", "provokativna igra z jezikom in rušenje tradicionalnih vrednot", ["klasični soneti", "partizanske pesmi", "ljudske pesmi"], "Začetek modernizma v slovenski poeziji (1966).", "visja"],
    [4, "Kakšna je Zajčeva poezija v Požgani travi?", "temna, z občutkom ogroženosti, smrti in praznine", ["vesela in otroška", "politično spodbudna", "ljubezenska v sonetih"], "Eksistencialna lirika.", "visja"],
  ]);
}
