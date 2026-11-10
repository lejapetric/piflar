import { izbira } from "../lib.mjs";

const POVEDI = [
  ["Mama v kuhinji peče pecivo.", [["Mama", "osebek"], ["peče", "povedek"], ["pecivo", "predmet"], ["v kuhinji", "prislovno določilo kraja"]]],
  ["Včeraj je Luka hitro pretekel sto metrov.", [["Luka", "osebek"], ["je pretekel", "povedek"], ["Včeraj", "prislovno določilo časa"], ["hitro", "prislovno določilo načina"]]],
  ["Zaradi dežja smo ostali doma.", [["smo ostali", "povedek"], ["Zaradi dežja", "prislovno določilo vzroka"], ["doma", "prislovno določilo kraja"]]],
  ["Moj brat igra kitaro.", [["brat", "osebek"], ["Moj", "prilastek"], ["igra", "povedek"], ["kitaro", "predmet"]]],
  ["Učiteljica je pohvalila pridne dijake.", [["Učiteljica", "osebek"], ["je pohvalila", "povedek"], ["dijake", "predmet"], ["pridne", "prilastek"]]],
  ["Ana je zdravnica.", [["Ana", "osebek"], ["je zdravnica", "povedek"]]],
  ["Zjutraj sem srečal prijatelja na avtobusu.", [["sem srečal", "povedek"], ["prijatelja", "predmet"], ["Zjutraj", "prislovno določilo časa"], ["na avtobusu", "prislovno določilo kraja"]]],
  ["Stari dedek počasi hodi po parku.", [["dedek", "osebek"], ["Stari", "prilastek"], ["hodi", "povedek"], ["počasi", "prislovno določilo načina"], ["po parku", "prislovno določilo kraja"]]],
];
const VSI = ["osebek", "povedek", "predmet", "prilastek", "prislovno določilo kraja", "prislovno določilo časa", "prislovno določilo načina", "prislovno določilo vzroka"];
const ODV = [["Vem, da prideš.", "predmetni odvisnik"], ["Ko je zazvonilo, smo odšli.", "časovni odvisnik"], ["Ostal je doma, ker je bil bolan.", "vzročni odvisnik"], ["Kdor ne dela, naj ne je.", "osebkov odvisnik"], ["Grem tja, kjer je toplo.", "krajevni odvisnik"], ["Knjiga, ki jo bereš, je moja.", "prilastkov odvisnik"], ["Če bo lepo, gremo na izlet.", "pogojni odvisnik"], ["Učil se je, da bi naredil izpit.", "namerni odvisnik"], ["Čeprav je deževalo, smo šli ven.", "dopustni odvisnik"], ["Kadar dežuje, ostanemo v hiši.", "časovni odvisnik"], ["Povej mi, kaj se je zgodilo.", "predmetni odvisnik"], ["Kjer je volja, je tudi pot.", "krajevni odvisnik"]];
const PRI = [["Zunaj sneži in piha veter.", "vezalno priredje"], ["Rad bi prišel, ampak nimam časa.", "protivno priredje"], ["Ali greš z nami ali ostaneš doma?", "ločno priredje"], ["Bil je bolan, zato ni prišel.", "sklepalno priredje"], ["Vzemi dežnik, saj bo deževalo.", "vzročno priredje"], ["Kupili smo sadje, in sicer jabolka in hruške.", "pojasnjevalno priredje"], ["Sonce sije, toda zrak je mrzel.", "protivno priredje"], ["Pojedel je kosilo in odšel.", "vezalno priredje"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("clen", 20, (r) => {
    const [p, cl] = r.izberi(POVEDI), [b, odg] = r.izberi(cl);
    const tez = odg.startsWith("prislovno") || odg === "prilastek" ? 3 : 2;
    return izbira({ r, tezavnost: tez, besedilo: `Kateri stavčni člen je »${b}« v povedi: ${p}`, pravilna: odg, napacne: r.premesaj(VSI.filter((x) => x !== odg)).slice(0, 3), postopek: `<p>»${b}«: ${odg}.</p>` });
  });
  serija("odvisnik", 14, (r) => {
    const [p, odg] = r.izberi(ODV);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Katera vrsta odvisnika je v povedi: ${p}`, pravilna: odg, napacne: r.premesaj([...new Set(ODV.map(([, x]) => x))].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("priredje", 10, (r) => {
    const [p, odg] = r.izberi(PRI);
    return izbira({ r, tezavnost: 3, besedilo: `Katera vrsta priredja je v povedi: ${p}`, pravilna: odg, napacne: r.premesaj([...new Set(PRI.map(([, x]) => x))].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("stavki", 8, (r) => {
    const [p, n] = r.izberi([["Pridi.", 1], ["Ko pridem domov, bom jedel.", 2], ["Vem, da veš, kaj želim.", 3], ["Zunaj sneži in piha veter.", 2], ["Mama kuha kosilo.", 1], ["Rekel je, da bo prišel, ko bo končal.", 3]]);
    return izbira({ r, tezavnost: 2, besedilo: `Koliko stavkov ima poved: »${p}«`, pravilna: String(n), napacne: ["1", "2", "3", "4"].filter((x) => x !== String(n)), postopek: `<p>Število stavkov je enako številu osebnih glagolskih oblik: ${n}.</p>` });
  });
  pojmi([
    ["poved", "Zaključena enota besedila od velike začetnice do končnega ločila."],
    ["stavek", "Enota, ki ima osebno glagolsko obliko."],
    ["stavčni člen", "Del stavka, ki ga ugotovimo z vprašalnico."],
    ["osebek", "Stavčni člen, ki odgovarja na vprašanje kdo ali kaj."],
    ["povedek", "Stavčni člen, ki pove, kaj osebek dela ali kakšen je."],
    ["predmet", "Stavčni člen v odvisnem sklonu, ki dopolnjuje povedek."],
    ["prislovno določilo", "Stavčni člen, ki izraža okoliščine dejanja, npr. kraj ali čas."],
    ["prilastek", "Del stavčnega člena, ki natančneje določa samostalnik."],
    ["priredje", "Zveza enakovrednih stavkov."],
    ["podredje", "Zveza glavnega stavka in odvisnika."],
    ["odvisnik", "Stavek, ki je podrejen glavnemu stavku."],
    ["veznik", "Nepregibna beseda, ki povezuje stavke ali dele stavka."],
    ["besedni red", "Vrstni red besed v povedi."],
  ]);
  vprasanja([
    [2, "Kateri stavčni člen je nujen v vsakem stavku?", "povedek", ["osebek", "predmet", "prilastek"], "Brez osebne glagolske oblike ni stavka; osebek je lahko izpuščen."],
    [3, "Kaj je zamolčani osebek v povedi »Grem domov.«?", "jaz", ["domov", "grem", "ti"], "Osebek razberemo iz glagolske oblike."],
    [4, "Kateri veznik uvaja dopustni odvisnik?", "čeprav", ["ker", "ko", "da"], "Dopustni odvisnik izraža okoliščino, ki bi lahko preprečila dejanje.", "visja"],
    [4, "Kakšen odvisnik je v povedi »Kdor laže, tudi krade«?", "osebkov", ["predmetni", "časovni", "prilastkov"], "Odvisnik nadomešča osebek: kdo krade?", "visja"],
  ]);
}
