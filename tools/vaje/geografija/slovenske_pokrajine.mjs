import { izbira } from "../lib.mjs";

const POK = ["alpske pokrajine", "predalpske pokrajine", "dinarskokraške pokrajine", "obsredozemske pokrajine", "obpanonske pokrajine"];
const KRAJI = [["Jesenice", 0], ["Kranjska Gora", 0], ["Bovec", 0], ["Bled", 0], ["Kamnik", 1], ["Celje", 1], ["Velenje", 1], ["Škofja Loka", 1], ["Idrija", 1], ["Postojna", 2], ["Kočevje", 2], ["Cerknica", 2], ["Ribnica", 2], ["Koper", 3], ["Piran", 3], ["Nova Gorica", 3], ["Sežana", 3], ["Murska Sobota", 4], ["Ptuj", 4], ["Lendava", 4], ["Ljutomer", 4], ["Novo mesto", 2], ["Ajdovščina", 3]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("kraj", 16, (r) => {
    const [k, i] = r.izberi(KRAJI);
    return izbira({ r, tezavnost: 1, besedilo: `V katero skupino pokrajin spada ${k}?`, pravilna: POK[i], napacne: r.premesaj(POK.filter((_, j) => j !== i)).slice(0, 3), postopek: `<p>${k}: ${POK[i]}.</p>` });
  });
  serija("znacilnost", 12, (r) => {
    const [z, i] = r.izberi([["ledeniško preoblikovane doline in visokogorje", 0], ["planšarstvo in visokogorski turizem", 0], ["hribovja in kotline, razpršena poselitev", 1], ["veliko kraških polj, vrtač in ponikalnic", 2], ["obsežni gozdovi in redka poselitev", 2], ["burja, oljke in vinogradi", 3], ["fliš in apnenec, submediteransko podnebje", 3], ["ravnine, intenzivno poljedelstvo in termalni izviri", 4], ["najtoplejša poletja in najmanj padavin v notranjosti", 4], ["rudarska tradicija (premog, živo srebro)", 1]]);
    return izbira({ r, tezavnost: 2, besedilo: `Za katere pokrajine je značilno: ${z}?`, pravilna: POK[i], napacne: r.premesaj(POK.filter((_, j) => j !== i)).slice(0, 3), postopek: `<p>${z.charAt(0).toUpperCase() + z.slice(1)}: ${POK[i]}.</p>` });
  });
  serija("pokrajina", 12, (r) => {
    const [p, i] = r.izberi([["Julijske Alpe", 0], ["Karavanke", 0], ["Kamniško-Savinjske Alpe", 0], ["Pohorje", 1], ["Škofjeloško hribovje", 1], ["Celjska kotlina", 1], ["Notranjsko podolje", 2], ["Bela krajina", 2], ["Kočevsko", 2], ["Kras", 3], ["Goriška brda", 3], ["Slovenska Istra", 3], ["Vipavska dolina", 3], ["Prekmurje", 4], ["Slovenske gorice", 4], ["Dravsko-Ptujsko polje", 4], ["Haloze", 4]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katero skupino pokrajin uvrščamo ${p}?`, pravilna: POK[i], napacne: r.premesaj(POK.filter((_, j) => j !== i)).slice(0, 3), postopek: `<p>${p}: ${POK[i]}.</p>` });
  });
  serija("problem", 6, (r) => {
    const [z, odg] = r.izberi([["onesnaženost zraka v Zasavju zaradi termoelektrarne in cementarne", "težka industrija in energetika v zaprti kotlini"], ["pomanjkanje vode poleti v Slovenski Istri", "suša in visoka poraba vode zaradi turizma"], ["onesnaženje podtalnice z nitrati na Dravskem polju", "intenzivno kmetijstvo"], ["izseljevanje iz Kočevskega in Bele krajine", "odmaknjenost in slabše zaposlitvene možnosti"], ["prometna obremenjenost alpskih dolin", "turizem in tranzitni promet"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kaj je glavni vzrok za težavo: ${z}?`, pravilna: odg, napacne: r.premesaj(["težka industrija in energetika v zaprti kotlini", "suša in visoka poraba vode zaradi turizma", "intenzivno kmetijstvo", "odmaknjenost in slabše zaposlitvene možnosti", "turizem in tranzitni promet"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["ledeniška dolina", "Dolina v obliki črke U, ki jo je izoblikoval ledenik."],
    ["morena", "Kopičina gradiva, ki ga je odložil ledenik."],
    ["planšarstvo", "Sezonska paša živine na visokogorskih planinah."],
    ["fliš", "Plastovita kamnina iz laporja in peščenjaka, slabo prepustna za vodo."],
    ["terasiranje", "Urejanje pobočij v stopnice za obdelovanje."],
    ["kraško polje", "Velika kraška uravnava z ravnim dnom, ki jo občasno poplavlja."],
    ["termalni izvir", "Izvir tople podzemne vode."],
    ["prodna ravnina", "Ravnina iz rečnih nanosov proda, npr. Dravsko polje."],
    ["obpanonske gorice", "Gričevja na severovzhodu Slovenije z vinogradi."],
    ["zatrep", "Zaključek ledeniške doline s strmimi stenami."],
    ["soline", "Plitvi bazeni ob morju za pridobivanje soli."],
    ["kotlina", "Uravnava, obdana z višjim svetom."],
  ]);
  vprasanja([
    [3, "Zakaj je v Sečoveljskih solinah mogoče pridobivati sol?", "zaradi plitve obale, sončnega in vetrovnega poletja", ["zaradi solnih rudnikov", "zaradi ledenikov", "zaradi termalnih izvirov"], "Morska voda izhlapeva v plitvih bazenih."],
    [4, "Zakaj je na Dravskem in Ptujskem polju podtalnica ogrožena?", "ker je prod zelo prepusten in onesnaževala hitro pronicajo", ["ker je prst ilovnata", "ker je območje kraško", "ker ni padavin"], "Gnojila in pesticidi hitro dosežejo podtalnico.", "visja"],
    [4, "Zakaj so obsredozemske pokrajine razvojno privlačne?", "zaradi pristanišča, turizma, ugodnega podnebja in bližine Italije", ["zaradi rudnikov premoga", "zaradi obsežnih ravnin za poljedelstvo", "zaradi visokogorja"], "Luka Koper je pomembno prometno vozlišče.", "visja"],
    [4, "Kaj so glavni razlogi za nastanek ledeniškega jezera, kot je Bohinjsko?", "ledenik je izdolbel kotanjo, ki jo je zajezila morena", ["vulkanski krater", "tektonski jarek", "umetna pregrada"], "Jezero je ledeniškega izvora.", "visja"],
  ]);
}
