import { zgodovinskeSerije } from "../zgodovina-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  zgodovinskeSerije(serija, {
    dogodki: [
      ["so bile ustanovljene Ilirske province", 1809], ["se je končal dunajski kongres", 1815], ["je bil v Ljubljani kongres Svete alianse", 1821], ["je izšla Prešernova zbirka Poezije", 1847],
      ["je bila marčna revolucija in program Zedinjena Slovenija", 1848], ["je bilo v Avstriji odpravljeno podložništvo", 1848], ["je bila zgrajena južna železnica do Ljubljane", 1849], ["je bila združena Italija (razglasitev kraljevine)", 1861],
      ["se je začela ameriška državljanska vojna", 1861], ["je bila sklenjena avstro-ogrska poravnava", 1867], ["je bil prvi slovenski tabor (Ljutomer)", 1868], ["je bila združena Nemčija", 1871],
      ["je bil berlinski kongres", 1878], ["je bila ustanovljena Slovenska matica", 1864], ["sta Marx in Engels objavila Komunistični manifest", 1848], ["je bila ustanovljena Jugoslovanska socialnodemokratska stranka", 1896],
      ["je bila bitka pri Waterlooju", 1815], ["je bila v ZDA odpravljena sužnost (13. amandma)", 1865],
    ],
    osebe: [["Napoleon Bonaparte", "je ustanovil Ilirske province"], ["Valentin Vodnik", "je urejal prve slovenske časopise (Lublanske novice)"], ["France Prešeren", "je napisal Zdravljico"], ["Janez Bleiweis", "je urejal Kmetijske in rokodelske novice"], ["Klemens von Metternich", "je bil avstrijski kancler in zagovornik restavracije"], ["Otto von Bismarck", "je združil Nemčijo"], ["Giuseppe Garibaldi", "je vodil boj za združitev Italije"], ["Abraham Lincoln", "je vodil ZDA v državljanski vojni"], ["James Watt", "je izboljšal parni stroj"], ["Karl Marx", "je napisal Kapital"], ["Matija Majar Ziljski", "je prvi zahteval Zedinjeno Slovenijo"], ["Franc Jožef I.", "je bil avstrijski cesar med letoma 1848 in 1916"]],
  });
  serija("ideologija", 6, (r) => {
    const [d, odg] = r.izberi([["svoboda posameznika, ustava, prosta trgovina", "liberalizem"], ["ohranjanje tradicije, monarhije in cerkve", "konservativizem"], ["pravica naroda do lastne države in jezika", "nacionalizem"], ["družbena lastnina proizvodnih sredstev", "socializem"], ["vsestranska narodna in kulturna enotnost južnih Slovanov", "jugoslovanstvo (ilirizem)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katera ideologija zagovarja: ${d}?`, pravilna: odg, napacne: ["liberalizem", "konservativizem", "nacionalizem", "socializem", "jugoslovanstvo (ilirizem)"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("industrijska", 6, (r) => {
    const [d, odg] = r.izberi([["parni stroj in premog", "prva industrijska revolucija"], ["elektrika, nafta in kemična industrija", "druga industrijska revolucija"], ["tekstilna industrija v Angliji", "prva industrijska revolucija"], ["tekoči trak in avtomobili", "druga industrijska revolucija"]]);
    return izbira({ r, tezavnost: 2, besedilo: `S katero fazo industrializacije povezujemo: ${d}?`, pravilna: odg, napacne: [odg === "prva industrijska revolucija" ? "druga industrijska revolucija" : "prva industrijska revolucija", "digitalna revolucija"], postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["industrijska revolucija", "Prehod iz ročne v strojno proizvodnjo."],
    ["restavracija", "Obnova predrevolucionarnih razmer po Napoleonovem porazu."],
    ["pomlad narodov", "Revolucije leta 1848 v Evropi."],
    ["Zedinjena Slovenija", "Program združitve vseh Slovencev v eno upravno enoto znotraj Avstrije."],
    ["tabori", "Množična zborovanja na prostem za uveljavitev slovenskega programa."],
    ["čitalnice", "Društva za narodno, kulturno in družabno življenje."],
    ["dualizem", "Razdelitev monarhije na avstrijski in ogrski del po letu 1867."],
    ["imperializem", "Težnja velesil po osvajanju kolonij in vplivnih območij."],
    ["proletariat", "Delavski razred, ki živi od prodaje delovne sile."],
    ["meščanstvo", "Družbeni sloj podjetnikov, trgovcev in izobražencev."],
    ["nacionalno gibanje", "Prizadevanja naroda za jezikovne, kulturne in politične pravice."],
    ["germanizacija", "Ponemčevanje."],
    ["urbanizacija", "Rast mest in selitev prebivalstva v mesta."],
  ]);
  vprasanja([
    [3, "Kaj so zahtevali Slovenci v programu Zedinjena Slovenija leta 1848?", "združitev vseh Slovencev v eno deželo z lastnim deželnim zborom in slovenščino v šolah in uradih", ["samostojno državo zunaj Avstrije", "priključitev k Italiji", "odpravo monarhije"], "Program je ostal nacionalni program do 1918."],
    [4, "Kako so Ilirske province vplivale na Slovence?", "uvedle so slovenščino v osnovne šole in sodobnejšo upravo", ["odpravile so slovenščino", "priključile so Slovence Ogrski", "ustanovile so univerzo v Ljubljani"], "Vodnik je napisal pesem Ilirija oživljena.", "visja"],
    [4, "Zakaj je bila avstro-ogrska poravnava neugodna za Slovence?", "ker je bila slovenska zemlja razdeljena med avstrijski in ogrski del (Prekmurje)", ["ker je odpravila cesarja", "ker je Slovenija postala samostojna", "ker je vse Slovence združila v Ogrski"], "Dualizem je okrepil Nemce in Madžare.", "visja"],
    [4, "Kateri so bili glavni vzroki za imperializem ob koncu 19. stoletja?", "iskanje surovin, tržišč in prestiža velesil", ["pomanjkanje prebivalstva v Evropi", "verska strpnost", "konec industrijske revolucije"], "Berlinska konferenca 1884–1885 je razdelila Afriko.", "visja"],
  ]);
}
