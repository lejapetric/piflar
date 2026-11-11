import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Missa Papae Marcelli", "Giovanni Pierluigi da Palestrina"], ["Opus musicum", "Jakob Petelin Gallus"], ["Moralia", "Jakob Petelin Gallus"], ["Messe de Nostre Dame", "Guillaume de Machaut"], ["Lagrime di San Pietro", "Orlando di Lasso"], ["Ave Maria … virgo serena", "Josquin des Prez"], ["Ordo virtutum", "Hildegarda iz Bingna"]],
    osebe: [["Hildegarda iz Bingna", "srednjeveška opatinja, mistikinja in skladateljica enoglasnih spevov"], ["Leonin", "skladatelj šole Notre-Dame, avtor Magnus liber organi"], ["Perotin", "skladatelj šole Notre-Dame, ki je pisal štiriglasne organume"], ["Guillaume de Machaut", "najpomembnejši skladatelj francoske ars nove, avtor prve celovite večglasne maše enega avtorja"], ["Giovanni Pierluigi da Palestrina", "rimski skladatelj, vzor čistega a cappella sloga po tridentinskem koncilu"], ["Jakob Petelin Gallus", "slovenski renesančni skladatelj, ki je deloval v Pragi in na Moravskem"], ["Orlando di Lasso", "nizozemski skladatelj, ki je deloval v Münchnu in napisal več kot 2000 skladb"], ["Claudio Monteverdi", "skladatelj na prehodu v barok, avtor madrigalov in opere Orfej"]],
  });
  pojmi([
    ["gregorijanski koral", "Enoglasno liturgično petje Rimskokatoliške cerkve v latinščini."],
    ["neume", "Znamenja za zapis melodije v srednjem veku, predhodnice not."],
    ["organum", "Najzgodnejša oblika večglasja, v kateri koralni melodiji dodamo glas."],
    ["trubadurji", "Pesniki-pevci južne Francije, ki so peli posvetne pesmi o ljubezni."],
    ["minnesängerji", "Nemški viteški pesniki-pevci, ki so peli o dvorski ljubezni."],
    ["ars nova", "Nova umetnost 14. stoletja z bogatejšim ritmom in izoritmičnim motetom."],
    ["motet", "Večglasna vokalna skladba, navadno na versko besedilo."],
    ["madrigal", "Posvetna večglasna vokalna skladba renesanse na umetniško besedilo."],
    ["maša", "Uglasbitev stalnih delov bogoslužja: Kyrie, Gloria, Credo, Sanctus, Agnus Dei."],
    ["a cappella", "Petje brez inštrumentalne spremljave."],
    ["imitacija", "Ponavljanje melodične misli v drugem glasu."],
    ["polifonija", "Večglasje, v katerem so glasovi enakovredni in samostojni."],
  ]);
  vprasanja([
    [3, "Kdo je po izročilu uredil koralne napeve in dal ime gregorijanskemu koralu?", "papež Gregor I. Veliki", ["Karel Veliki", "Guido iz Arezza", "Palestrina"], "Ime je po izročilu povezano z njim."],
    [4, "Kaj je Guido iz Arezza prispeval k notaciji?", "uvedel je črtovje in solmizacijske zloge ut–re–mi–fa–sol–la", ["izumil je klavir", "napisal je prvo opero", "uvedel je taktnice v 9. stoletju"], "Olajšal je učenje petja.", "visja"],
    [4, "Zakaj je Gallusov Opus musicum pomemben?", "obsežna zbirka motetov za celo cerkveno leto, natisnjena v Pragi (1586–1591)", ["prva slovenska opera", "zbirka ljudskih pesmi", "prvi slovenski učbenik glasbe"], "Vsebuje 374 motetov.", "visja"],
  ]);
}
