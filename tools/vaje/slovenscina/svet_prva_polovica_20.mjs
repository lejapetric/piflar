import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Preobrazba", "Franz Kafka", "novela"], ["Proces", "Franz Kafka", "roman"], ["Ulikses", "James Joyce", "roman"], ["Iskanje izgubljenega časa", "Marcel Proust", "roman"], ["Čarobna gora", "Thomas Mann", "roman"], ["Smrt v Benetkah", "Thomas Mann", "novela"], ["Gospa Dalloway", "Virginia Woolf", "roman"], ["Duinske elegije", "Rainer Maria Rilke", "pesniška zbirka"], ["Alkoholi", "Guillaume Apollinaire", "pesniška zbirka"], ["Krvava svatba", "Federico García Lorca", "drama"], ["Pusta dežela", "Thomas Stearns Eliot", "pesnitev"], ["Šest oseb išče avtorja", "Luigi Pirandello", "drama"], ["Mati Korajža in njeni otroci", "Bertolt Brecht", "drama"], ["Mojster in Margareta", "Mihail Bulgakov", "roman"]],
    osebe: [["Franz Kafka", "je praški pisatelj tesnobe in absurdnih sodišč"], ["James Joyce", "je dovršil tehniko toka zavesti v romanu o enem dublinskem dnevu"], ["Marcel Proust", "je opisal spomin, ki ga sproži piškot madlenka"], ["Rainer Maria Rilke", "je avstrijski pesnik, rojen v Pragi"], ["Guillaume Apollinaire", "je pisal kaligrame"], ["Bertolt Brecht", "je razvil epsko (potujitveno) gledališče"]],
  });
  pojmi([
    ["modernizem", "Umetnostne smeri prve polovice 20. stoletja, ki rušijo tradicionalne oblike."],
    ["avantgarda", "Radikalne umetniške smeri, ki zavračajo tradicijo."],
    ["ekspresionizem", "Smer, ki izraža notranje doživljanje s silovitimi podobami."],
    ["futurizem", "Avantgardna smer, ki slavi tehniko, hitrost in prihodnost."],
    ["dadaizem", "Avantgardna smer, ki se upira smislu in logiki."],
    ["nadrealizem", "Smer, ki izraža podzavest, sanje in avtomatično pisavo."],
    ["tok zavesti", "Pripovedna tehnika, ki posnema neurejen tok misli."],
    ["notranji monolog", "Neposreden zapis misli osebe."],
    ["kaligram", "Pesem, katere zapis tvori sliko."],
    ["epsko gledališče", "Brechtovo gledališče, ki gledalca spodbuja k razmisleku."],
    ["absurd", "Občutek nesmiselnosti sveta in človekovega položaja."],
  ]);
  vprasanja([
    [2, "V kaj se zjutraj prebudi Gregor Samsa?", "v ogromnega hrošča", ["v kralja", "v psa", "v otroka"], "Preobrazba, Franz Kafka."],
    [3, "Česa je obtožen Jožef K. v Procesu?", "nikoli ne izve, česa je obtožen", ["umora", "kraje", "izdaje države"], "Absurdna sodna oblast."],
    [4, "Kaj je značilno za Ulikses?", "dogajanje enega dne v Dublinu in tok zavesti", ["potovanje po Grčiji", "zgodovina rodbine skozi stoletja", "detektivska zgodba"], "16. junij 1904 (Bloomsday).", "visja"],
    [4, "Kaj želi doseči Brechtov potujitveni učinek?", "da gledalec kritično razmišlja namesto da se poistoveti z osebami", ["da gledalec joka", "da se zgodba zdi resnična", "da igralci improvizirajo"], "Prekinitve, songi, napisi.", "visja"],
  ]);
}
