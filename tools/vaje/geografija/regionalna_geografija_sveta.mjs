import { izbira, besedilo } from "../lib.mjs";

const DR = [["Kanada", "Ottawa", "Severna Amerika"], ["ZDA", "Washington", "Severna Amerika"], ["Mehika", "Ciudad de México", "Severna Amerika"], ["Brazilija", "Brasília", "Južna Amerika"], ["Argentina", "Buenos Aires", "Južna Amerika"], ["Čile", "Santiago", "Južna Amerika"], ["Peru", "Lima", "Južna Amerika"], ["Egipt", "Kairo", "Afrika"], ["Nigerija", "Abuja", "Afrika"], ["Kenija", "Nairobi", "Afrika"], ["Južnoafriška republika", "Pretoria", "Afrika"], ["Maroko", "Rabat", "Afrika"], ["Etiopija", "Adis Abeba", "Afrika"], ["Kitajska", "Peking", "Azija"], ["Japonska", "Tokio", "Azija"], ["Indija", "New Delhi", "Azija"], ["Indonezija", "Džakarta", "Azija"], ["Turčija", "Ankara", "Azija"], ["Savdska Arabija", "Rijad", "Azija"], ["Iran", "Teheran", "Azija"], ["Avstralija", "Canberra", "Avstralija in Oceanija"], ["Nova Zelandija", "Wellington", "Avstralija in Oceanija"], ["Južna Koreja", "Seul", "Azija"], ["Tajska", "Bangkok", "Azija"], ["Vietnam", "Hanoj", "Azija"], ["Pakistan", "Islamabad", "Azija"]];
const REKE = [["Amazonka", "Južna Amerika"], ["Nil", "Afrika"], ["Mississippi", "Severna Amerika"], ["Jangce", "Azija"], ["Ganges", "Azija"], ["Kongo", "Afrika"], ["Niger", "Afrika"], ["Mekong", "Azija"], ["Murray", "Avstralija in Oceanija"], ["Parana", "Južna Amerika"], ["Jenisej", "Azija"], ["Rumena reka (Huang He)", "Azija"]];
const GORE = [["Himalaja", "Azija"], ["Andi", "Južna Amerika"], ["Skalno gorovje", "Severna Amerika"], ["Atlas", "Afrika"], ["Veliko razvodno gorovje", "Avstralija in Oceanija"], ["Apalači", "Severna Amerika"], ["Ural", "na meji med Evropo in Azijo"]];
const CEL = ["Severna Amerika", "Južna Amerika", "Afrika", "Azija", "Avstralija in Oceanija"];

export default function ({ serija, pojmi, vprasanja }) {
  serija("glavno-mesto", 14, (r, i) => {
    const [d, m] = r.izberi(DR);
    if (i % 3 === 2) return besedilo({ tezavnost: 3, sprejemljivi: [m], besedilo: `Vpiši glavno mesto države ${d}.`, rezultat: m, postopek: `<p>${d}: ${m}.</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Katero je glavno mesto države ${d}?`, pravilna: m, napacne: r.premesaj(DR.filter(([x]) => x !== d).map(([, y]) => y)).slice(0, 3), postopek: `<p>Glavno mesto države ${d} je ${m}.</p>` });
  });
  serija("celina", 10, (r) => {
    const [d, , c] = r.izberi(DR);
    return izbira({ r, tezavnost: 1, besedilo: `Na kateri celini leži država ${d}?`, pravilna: c, napacne: CEL.filter((x) => x !== c).slice(0, 3), postopek: `<p>${d}: ${c}.</p>` });
  });
  serija("reka", 8, (r) => {
    const [rk, c] = r.izberi(REKE);
    return izbira({ r, tezavnost: 2, besedilo: `Na kateri celini teče reka ${rk}?`, pravilna: c, napacne: CEL.filter((x) => x !== c).slice(0, 3), postopek: `<p>${rk}: ${c}.</p>` });
  });
  serija("gorovje", 6, (r) => {
    const [g, c] = r.izberi(GORE);
    return izbira({ r, tezavnost: 2, besedilo: `Kje leži gorovje ${g}?`, pravilna: c, napacne: [...CEL, "na meji med Evropo in Azijo"].filter((x) => x !== c).slice(0, 3), postopek: `<p>${g}: ${c}.</p>` });
  });
  serija("podnebje", 8, (r) => {
    const [o, odg] = r.izberi([["porečje Amazonke", "tropsko deževno (ekvatorialno)"], ["Sahara", "puščavsko (suho)"], ["savane vzhodne Afrike", "tropsko izmenično vlažno (savansko)"], ["Sibirija", "subpolarno (borealno) celinsko"], ["Grenlandija", "polarno"], ["južna Indija", "monsunsko"], ["obale Sredozemskega morja", "sredozemsko"], ["osrednja Avstralija", "puščavsko (suho)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšno podnebje prevladuje na območju: ${o}?`, pravilna: odg, napacne: r.premesaj(["tropsko deževno (ekvatorialno)", "puščavsko (suho)", "tropsko izmenično vlažno (savansko)", "subpolarno (borealno) celinsko", "polarno", "monsunsko", "sredozemsko"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${odg}.</p>` });
  });
  serija("rekord", 6, (r) => {
    const [v, odg, nap] = r.izberi([["Katera je najvišja gora na svetu?", "Mount Everest", ["Kilimandžaro", "Aconcagua", "Mont Blanc"]], ["Katera je najvišja gora Afrike?", "Kilimandžaro", ["Mount Everest", "Aconcagua", "Mount Kenya"]], ["Katera je najvišja gora Južne Amerike?", "Aconcagua", ["Kilimandžaro", "Denali", "Chimborazo"]], ["Kateri je največji ocean?", "Tihi ocean", ["Atlantski ocean", "Indijski ocean", "Arktični ocean"]], ["Katera je največja puščava na kopnem z vročim podnebjem?", "Sahara", ["Gobi", "Kalahari", "Atacama"]], ["Katera država ima največ prebivalcev (2023)?", "Indija", ["Kitajska", "ZDA", "Indonezija"]], ["Katera država ima največjo površino?", "Rusija", ["Kanada", "Kitajska", "ZDA"]], ["Katero je najgloblje jezero na svetu?", "Bajkalsko jezero", ["Kaspijsko jezero", "Viktorijino jezero", "Tanganjiško jezero"]]]);
    return izbira({ r, tezavnost: 2, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg}.</p>` });
  });
  serija("razvitost", 5, (r) => {
    const [k, odg] = r.izberi([["visok delež zaposlenih v kmetijstvu in visoka rodnost", "manj razvita država"], ["visok delež zaposlenih v storitvah in staranje prebivalstva", "razvita država"], ["visok BDP na prebivalca in visok indeks človekovega razvoja", "razvita država"], ["visoka umrljivost dojenčkov in nizka pismenost", "manj razvita država"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Za kakšno državo je značilno: ${k}?`, pravilna: odg, napacne: [odg === "razvita država" ? "manj razvita država" : "razvita država"], postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["monsun", "Veter, ki sezonsko spreminja smer in prinaša deževno in suho dobo."],
    ["savana", "Travnato rastje z redkimi drevesi v tropskem izmenično vlažnem podnebju."],
    ["tajga", "Iglasti gozd v subpolarnem pasu."],
    ["tundra", "Brezdrevesno rastje v polarnem pasu z zmrznjenimi tlemi."],
    ["dezertifikacija", "Širjenje puščav zaradi podnebja in človekovih posegov."],
    ["permafrost", "Trajno zamrznjena tla."],
    ["megalopolis", "Zraslo območje več velemest."],
    ["BDP na prebivalca", "Vrednost vseh proizvedenih dobrin in storitev, deljena s številom prebivalcev."],
    ["indeks človekovega razvoja", "Kazalnik razvitosti, ki združuje dohodek, izobrazbo in pričakovano življenjsko dobo."],
    ["plantaža", "Velik kmetijski obrat z eno tržno kulturo, npr. kavo ali sladkornim trsom."],
    ["fjord", "Ozek, globok morski zaliv, ki ga je izdolbel ledenik."],
    ["slum", "Neurejeno revno mestno naselje."],
    ["deforestacija", "Krčenje gozdov."],
  ]);
  vprasanja([
    [3, "Zakaj je puščava Atacama ena najbolj suhih na svetu?", "zaradi hladnega Humboldtovega toka in lege v zavetrju Andov", ["zaradi bližine ekvatorja", "zaradi monsunov", "zaradi vulkanov"], "Hladen tok stabilizira ozračje in preprečuje padavine."],
    [4, "Zakaj je tropski deževni gozd kljub bujnemu rastju na revnih prsteh?", "hranila so večinoma v rastlinah in jih padavine hitro spirajo iz prsti", ["ker tam ni razkrojevalcev", "ker je prst zamrznjena", "ker ni padavin"], "Hiter razkroj in spiranje; po izsekavanju prst hitro osiromaši.", "visja"],
    [4, "Kaj povzroča pojav El Niño?", "oslabitev pasatov in segrevanje vzhodnega Tihega oceana", ["okrepitev pasatov", "taljenje Antarktike", "monsun v Indiji"], "Spremeni padavine in ribolov na zahodni obali Južne Amerike.", "visja"],
    [4, "Zakaj se svetovno prebivalstvo najhitreje povečuje v podsaharski Afriki?", "zaradi visoke rodnosti in upadanja smrtnosti", ["zaradi priseljevanja iz Evrope", "zaradi nizke rodnosti", "zaradi staranja prebivalstva"], "Druga faza demografskega prehoda.", "visja"],
  ]);
}
