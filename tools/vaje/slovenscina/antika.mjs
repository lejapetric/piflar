import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Iliada", "Homer", "ep"], ["Odiseja", "Homer", "ep"], ["Kralj Ojdip", "Sofoklej", "tragedija"], ["Antigona", "Sofoklej", "tragedija"], ["Oresteja", "Ajshil", "tragedija"], ["Medeja", "Evripid", "tragedija"], ["Lizistrata", "Aristofan", "komedija"], ["Ptiči", "Aristofan", "komedija"], ["Eneida", "Vergil", "ep"], ["Himna Afroditi", "Sapfo", "lirska pesem"], ["Dvojčka", "Plavt", "komedija"], ["Metamorfoze", "Ovid", "ep"]],
    osebe: [["Homer", "je po izročilu slepi pesnik, avtor dveh velikih grških epov"], ["Sofoklej", "je v tragedijo uvedel tretjega igralca"], ["Aristotel", "je v Poetiki opredelil tragedijo in katarzo"], ["Sapfo", "je pesnica z otoka Lezbos"], ["Vergil", "je napisal rimski nacionalni ep o Eneju"], ["Horac", "je avtor izreka »carpe diem«"], ["Ovid", "je bil izgnan v Tomis ob Črnem morju"]],
  });
  pojmi([
    ["ep", "Obsežna pripovedna pesnitev o junakih in bogovih."],
    ["heksameter", "Šestomerni verz antičnih epov."],
    ["tragedija", "Dramska vrsta, v kateri junak propade v spopadu z višjimi silami."],
    ["komedija", "Dramska vrsta s smešnimi osebami in srečnim koncem."],
    ["zbor", "Skupina, ki v grški drami komentira dogajanje."],
    ["tragična krivda", "Junakova napaka ali zmota, ki vodi v propad."],
    ["mitologija", "Zbirka zgodb o bogovih in junakih."],
    ["lirika", "Pesništvo, ki izraža čustva, v antiki spremljano z liro."],
    ["Olimp", "Gora, na kateri so po grških verovanjih živeli bogovi."],
    ["usoda", "Neizogibna višja sila, ki vodi življenje junaka."],
    ["epitet", "Stalni okrasni pridevek, npr. »brzonogi Ahil«."],
  ]);
  vprasanja([
    [2, "O čem pripoveduje Iliada?", "o zadnjih tednih trojanske vojne in Ahilovi jezi", ["o Odisejevem vračanju domov", "o ustanovitvi Rima", "o Ojdipovi usodi"], "Iliada se začne z Ahilovo jezo."],
    [3, "Zakaj Antigona krši Kreontov ukaz?", "ker po božjih zakonih želi pokopati brata Polinejka", ["ker želi postati kraljica", "ker sovraži Ismeno", "ker je Kreon ubil njenega očeta"], "Spopad božjega (nenapisanega) in državnega zakona."],
    [4, "V čem je tragična ironija Kralja Ojdipa?", "Ojdip išče morilca in ugotovi, da je to on sam", ["Ojdip ne ve, kdo je Kreon", "Ojdip zmaga v vojni", "Ojdip se poroči s Sfingo"], "Gledalec ve več kot junak.", "visja"],
    [4, "Kakšna je vloga katarze po Aristotelu?", "gledalec se ob strahu in sočutju očisti", ["gledalec se nasmeje", "igralec se pokori", "zbor razloži zgodbo"], "Poetika: tragedija vzbuja strah in sočutje.", "visja"],
  ]);
}
