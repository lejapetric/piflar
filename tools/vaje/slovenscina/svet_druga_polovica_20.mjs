import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Besede", "Jacques Prévert", "pesniška zbirka"], ["Radost pisanja", "Wisława Szymborska", "pesem"], ["Črni vran v deževnem vremenu", "Sylvia Plath", "pesem"], ["Črna žena", "Léopold Sédar Senghor", "pesem"], ["Tujec", "Albert Camus", "roman"], ["Kuga", "Albert Camus", "roman"], ["Čakajoč Godota", "Samuel Beckett", "drama"], ["Plešasta pevka", "Eugène Ionesco", "drama"], ["Varuh v rži", "Jerome David Salinger", "roman"], ["Sto let samote", "Gabriel García Márquez", "roman"], ["1984", "George Orwell", "roman"], ["Ime rože", "Umberto Eco", "roman"], ["Neznosna lahkost bivanja", "Milan Kundera", "roman"]],
    osebe: [["Albert Camus", "je razvil filozofijo absurda (Mit o Sizifu)"], ["Samuel Beckett", "je irski dramatik gledališča absurda"], ["Gabriel García Márquez", "je mojster magičnega realizma"], ["Wisława Szymborska", "je poljska pesnica, Nobelova nagrajenka leta 1996"], ["George Orwell", "je napisal antiutopijo o Velikem bratu"], ["Umberto Eco", "je semiotik in avtor srednjeveške detektivke"]],
  });
  pojmi([
    ["eksistencializem", "Filozofija, ki poudarja svobodo in odgovornost posameznika v nesmiselnem svetu."],
    ["gledališče absurda", "Drama brez logične zgodbe, ki prikazuje nesmisel bivanja."],
    ["magični realizem", "Pripoved, v kateri se resnično prepleta s čudežnim kot samoumevnim."],
    ["postmodernizem", "Smer, ki se igra z žanri, citati in bralcem."],
    ["antiutopija", "Pripoved o zatiralni družbi prihodnosti."],
    ["intertekstualnost", "Povezovanje besedila z drugimi besedili."],
    ["beat generacija", "Ameriški uporniški pisatelji 1950-ih."],
    ["negritude", "Gibanje za uveljavitev afriške kulture in identitete."],
    ["metafikcija", "Literatura, ki razkriva lastno izmišljenost."],
    ["absurd", "Razkorak med človekovo željo po smislu in molkom sveta."],
    ["izpovedna poezija", "Poezija, ki odkrito izraža osebne stiske (Plath)."],
  ]);
  vprasanja([
    [2, "Na koga čakata Vladimir in Estragon?", "na Godota, ki nikoli ne pride", ["na vlak", "na rešitelja Macondo", "na zdravnika"], "Simbol nesmiselnega čakanja."],
    [3, "Zakaj je Meursault obsojen v Tujcu?", "zaradi umora Arabca, sodniki pa ga obsojajo predvsem zaradi brezbrižnosti", ["zaradi kraje", "zaradi izdaje", "zaradi dezerterstva"], "Ker ni jokal na materinem pogrebu."],
    [4, "Kaj je osrednja tema Orwellovega romana 1984?", "totalitarni nadzor nad mislimi in resnico", ["ljubezen dveh plemičev", "vesoljska potovanja", "kmečko življenje"], "Novorek, Veliki brat, Ministrstvo resnice.", "visja"],
    [4, "Kako Camus odgovori na absurd v Mitu o Sizifu?", "z uporom: »Sizifa si moramo predstavljati srečnega«", ["s samomorom", "z begom v vero", "z ignoranco"], "Upor, svoboda in strast.", "visja"],
  ]);
}
