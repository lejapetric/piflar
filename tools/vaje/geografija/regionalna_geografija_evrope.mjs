import { izbira, besedilo } from "../lib.mjs";

const DR = [["Avstrija", "Dunaj"], ["Italija", "Rim"], ["Hrvaška", "Zagreb"], ["Madžarska", "Budimpešta"], ["Nemčija", "Berlin"], ["Francija", "Pariz"], ["Španija", "Madrid"], ["Portugalska", "Lizbona"], ["Poljska", "Varšava"], ["Češka", "Praga"], ["Slovaška", "Bratislava"], ["Romunija", "Bukarešta"], ["Bolgarija", "Sofija"], ["Grčija", "Atene"], ["Srbija", "Beograd"], ["Bosna in Hercegovina", "Sarajevo"], ["Črna gora", "Podgorica"], ["Severna Makedonija", "Skopje"], ["Albanija", "Tirana"], ["Švica", "Bern"], ["Belgija", "Bruselj"], ["Nizozemska", "Amsterdam"], ["Danska", "København"], ["Švedska", "Stockholm"], ["Norveška", "Oslo"], ["Finska", "Helsinki"], ["Irska", "Dublin"], ["Združeno kraljestvo", "London"], ["Litva", "Vilna"], ["Latvija", "Riga"], ["Estonija", "Talin"], ["Ukrajina", "Kijev"], ["Islandija", "Reykjavík"]];
const REKE = [["Donava", "Črno morje"], ["Ren", "Severno morje"], ["Laba", "Severno morje"], ["Rona", "Sredozemsko morje"], ["Pad", "Jadransko morje"], ["Volga", "Kaspijsko jezero"], ["Visla", "Baltsko morje"], ["Loara", "Atlantski ocean"], ["Temza", "Severno morje"], ["Dneper", "Črno morje"], ["Odra", "Baltsko morje"], ["Tajo", "Atlantski ocean"]];
const EU = ["Avstrija", "Italija", "Hrvaška", "Madžarska", "Nemčija", "Francija", "Španija", "Portugalska", "Poljska", "Češka", "Slovaška", "Romunija", "Bolgarija", "Grčija", "Belgija", "Nizozemska", "Danska", "Švedska", "Finska", "Irska", "Litva", "Latvija", "Estonija"];

export default function ({ serija, pojmi, vprasanja }) {
  serija("glavno-mesto", 14, (r, i) => {
    const [d, m] = r.izberi(DR);
    if (i % 3 === 2) return besedilo({ tezavnost: 2, sprejemljivi: [m, ...(m === "København" ? ["Kopenhagen", "Koebenhavn"] : []), ...(m === "Reykjavík" ? ["Reykjavik"] : [])], besedilo: `Vpiši glavno mesto države ${d}.`, rezultat: m, postopek: `<p>${d}: ${m}.</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Katero je glavno mesto države ${d}?`, pravilna: m, napacne: r.premesaj(DR.filter(([x]) => x !== d).map(([, y]) => y)).slice(0, 3), postopek: `<p>Glavno mesto države ${d} je ${m}.</p>` });
  });
  serija("izliv", 10, (r) => {
    const [rk, m] = r.izberi(REKE);
    return izbira({ r, tezavnost: 2, besedilo: `Kam se izliva reka ${rk}?`, pravilna: m, napacne: r.premesaj([...new Set(REKE.map(([, y]) => y))].filter((x) => x !== m)).slice(0, 3), postopek: `<p>${rk} se izliva v ${m}.</p>` });
  });
  serija("eu", 10, (r) => {
    const d = r.izberi([...EU.slice(0, 12), "Švica", "Norveška", "Islandija", "Srbija", "Združeno kraljestvo", "Ukrajina", "Albanija"]), je = EU.includes(d);
    return izbira({ r, tezavnost: 2, besedilo: `Ali je ${d} članica Evropske unije (stanje 2025)?`, pravilna: je ? "Da" : "Ne", napacne: [je ? "Ne" : "Da"], postopek: `<p>${d} ${je ? "je" : "ni"} članica EU.${d === "Združeno kraljestvo" ? " Izstopilo je leta 2020." : ""}</p>` });
  });
  serija("regija", 8, (r) => {
    const [d, reg] = r.izberi([["Švedska", "Severna Evropa"], ["Norveška", "Severna Evropa"], ["Finska", "Severna Evropa"], ["Španija", "Južna Evropa"], ["Grčija", "Južna Evropa"], ["Poljska", "Srednja Evropa"], ["Češka", "Srednja Evropa"], ["Francija", "Zahodna Evropa"], ["Irska", "Zahodna Evropa"], ["Ukrajina", "Vzhodna Evropa"], ["Romunija", "Jugovzhodna Evropa"], ["Bolgarija", "Jugovzhodna Evropa"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katero regijo Evrope navadno uvrščamo državo ${d}?`, pravilna: reg, napacne: r.premesaj(["Severna Evropa", "Južna Evropa", "Srednja Evropa", "Zahodna Evropa", "Vzhodna Evropa", "Jugovzhodna Evropa"].filter((x) => x !== reg)).slice(0, 3), postopek: `<p>${d}: ${reg}.</p>` });
  });
  serija("pojav", 7, (r) => {
    const [o, odg] = r.izberi([["Islandija", "vulkani in gejzirji"], ["Norveška", "fjordi"], ["Nizozemska", "polderji"], ["Toskana", "sredozemsko kmetijstvo (vinogradi, oljke)"], ["Porurje", "nekdanja premogovniška in jeklarska regija"], ["Panonska nižina", "intenzivno poljedelstvo"], ["Švicarske Alpe", "visokogorski turizem in ledeniki"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj je značilno za območje ${o}?`, pravilna: odg, napacne: r.premesaj(["vulkani in gejzirji", "fjordi", "polderji", "sredozemsko kmetijstvo (vinogradi, oljke)", "nekdanja premogovniška in jeklarska regija", "intenzivno poljedelstvo", "visokogorski turizem in ledeniki"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${o}: ${odg}.</p>` });
  });
  pojmi([
    ["Evropska unija", "Politična in gospodarska zveza evropskih držav."],
    ["schengensko območje", "Območje držav brez nadzora na notranjih mejah."],
    ["evroobmočje", "Države EU, ki uporabljajo evro."],
    ["polder", "Z nasipi zavarovano kopno, pridobljeno z izsuševanjem morja."],
    ["fjord", "Ozek, globok morski zaliv, ki ga je izdolbel ledenik."],
    ["maritimno podnebje", "Podnebje z milimi zimami in hladnimi poletji pod vplivom oceana."],
    ["Sredozemlje", "Območje okoli Sredozemskega morja s sredozemskim podnebjem."],
    ["deindustrializacija", "Upadanje industrije in zaposlenosti v njej."],
    ["transhumanca", "Sezonsko seljenje živine med nižinami in planinami."],
    ["Golfski tok", "Topel morski tok, ki ogreva zahodno in severno Evropo."],
    ["staranje prebivalstva", "Povečevanje deleža starejših v prebivalstvu."],
    ["regionalna politika EU", "Politika zmanjševanja razlik v razvitosti med regijami EU."],
    ["Benelux", "Skupno ime za Belgijo, Nizozemsko in Luksemburg."],
  ]);
  vprasanja([
    [2, "Katera je najvišja gora Alp?", "Mont Blanc", ["Triglav", "Matterhorn", "Grossglockner"], "Mont Blanc (≈ 4806 m) na meji Francije in Italije."],
    [3, "Katera reka teče skozi največ evropskih prestolnic?", "Donava", ["Ren", "Laba", "Volga"], "Dunaj, Bratislava, Budimpešta, Beograd."],
    [3, "Leta kateri je Slovenija vstopila v EU?", { vpis: ["2004"] }, [], "1. maja 2004, skupaj z devetimi drugimi državami."],
    [4, "Zakaj je v Skandinaviji poseljena predvsem južna obala?", "zaradi milejšega podnebja, nižin in prometne dostopnosti", ["zaradi puščav na severu", "zaradi vulkanov na severu", "ker je sever pod morjem"], "Sever je gorat, hladen in slabo dostopen.", "visja"],
    [4, "Zakaj se v zahodni Evropi povečuje delež priseljencev?", "zaradi staranja prebivalstva, potrebe po delovni sili in razvitosti", ["zaradi visoke rodnosti", "zaradi pomanjkanja delovnih mest", "zaradi hladnega podnebja"], "Priseljevanje nadomešča upad delovno aktivnega prebivalstva.", "visja"],
  ]);
}
