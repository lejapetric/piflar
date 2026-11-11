import { kolicina, izbira, T } from "../lib.mjs";
const ORG = [["človek", 46], ["šimpanz", 48], ["pes", 78], ["mačka", 38], ["vinska mušica", 8], ["koruza", 20], ["krompir", 48], ["miš", 40], ["konj", 64], ["grah", 14]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("gamete", 8, (r) => {
    const [o, n2] = r.izberi(ORG);
    return kolicina({ tezavnost: 1, vrednost: n2 / 2, enota: "", besedilo: `Telesne celice organizma (${o}) imajo ${n2} kromosomov. Koliko kromosomov ima njegova spolna celica?`, rezultat: `${n2 / 2}`, postopek: `<p>Spolne celice so haploidne (n): \\(\\frac{${n2}}{2} = ${n2 / 2}\\).</p>` });
  });
  serija("mitoza", 8, (r) => {
    const [o, n2] = r.izberi(ORG), [faza, k, raz] = r.izberi([["v metafazi mitoze", n2, `${n2} kromosomov (vsak iz dveh kromatid)`], ["v anafazi mitoze (v celi celici)", 2 * n2, "kromatidi se ločita, vsaka postane samostojen kromosom"], ["v hčerinski celici po mitozi", n2, "hčerinski celici sta enaki materinski"], ["v celici po prvi mejotski delitvi", n2 / 2, "homologni kromosomi se ločijo"], ["v gameti po mejozi", n2 / 2, "haploidna celica"]]);
    return kolicina({ tezavnost: 2, vrednost: k, enota: "", besedilo: `Telesna celica organizma (${o}) ima ${n2} kromosomov. Koliko kromosomov je ${faza}?`, rezultat: `${k}`, postopek: `<p>${raz.charAt(0).toUpperCase() + raz.slice(1)}: ${k}.</p>` });
  });
  serija("kromatide", 5, (r) => {
    const [o, n2] = r.izberi(ORG), [faza, k] = r.izberi([["v fazi G2", 2 * n2], ["v fazi G1", n2], ["v metafazi mejoze I", 2 * n2], ["v metafazi mejoze II", n2]]);
    return kolicina({ tezavnost: 3, vrednost: k, enota: "", besedilo: `Koliko molekul DNA (kromatid) je v jedru celice organizma (${o}, 2n = ${n2}) ${faza}?`, rezultat: `${k}`, postopek: `<p>Po fazi S je vsak kromosom iz dveh kromatid. ${faza}: ${k} molekul DNA.</p>` });
  });
  serija("kombinacije", 4, (r) => {
    const n = r.int(2, 8);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: 2 ** n, enota: "", besedilo: `Organizem ima ${n} parov homolognih kromosomov. Koliko genetsko različnih gamet lahko nastane samo zaradi neodvisne razporeditve kromosomov (brez prekrižanja)?`, rezultat: `\\(2^{${n}} = ${2 ** n}\\)`, postopek: `<p>Vsak par se v mejozi I razporedi neodvisno na dva načina: \\(2^{${n}} = ${2 ** n}\\).</p>` });
  });
  serija("faza", 8, (r) => {
    const [opis, faza] = r.izberi([["kromosomi se uredijo v ekvatorialni ravnini", "metafaza"], ["sestrski kromatidi se ločita in potujeta k polom", "anafaza"], ["kromosomi se kondenzirajo, jedrna ovojnica razpade", "profaza"], ["okoli kromosomov na polih nastaneta novi jedrni ovojnici", "telofaza"], ["podvoji se DNA", "faza S interfaze"], ["citoplazma se razdeli", "citokineza"], ["homologna kromosoma se parita in pride do prekrižanja", "profaza I mejoze"], ["homologni kromosomi se ločijo k nasprotnima poloma", "anafaza I mejoze"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V kateri fazi celičnega cikla ${opis}?`, pravilna: faza, napacne: ["profaza", "metafaza", "anafaza", "telofaza", "faza S interfaze", "citokineza", "profaza I mejoze", "anafaza I mejoze"].filter((x) => x !== faza).slice(0, 3), postopek: `<p>${opis.charAt(0).toUpperCase() + opis.slice(1)}: ${faza}.</p>` });
  });
  pojmi([
    ["mitoza", "Delitev jedra, pri kateri nastaneta dve genetsko enaki hčerinski jedri."],
    ["mejoza", "Redukcijska delitev, pri kateri iz diploidne celice nastanejo štiri haploidne."],
    ["interfaza", "Del celičnega cikla med delitvama, v katerem celica raste in podvoji DNA."],
    ["kromatida", "Ena od dveh enakih polovic podvojenega kromosoma."],
    ["centromera", "Zoženo mesto, kjer sta sestrski kromatidi povezani."],
    ["homologna kromosoma", "Kromosoma enake oblike in velikosti z geni za iste lastnosti, eden od vsakega starša."],
    ["prekrižanje", "Izmenjava delov med homolognima kromosomoma v profazi I."],
    ["diploidna celica", "Celica z dvema garniturama kromosomov (2n)."],
    ["haploidna celica", "Celica z eno garnituro kromosomov (n)."],
    ["delitveno vreteno", "Struktura iz mikrotubulov, ki razvleče kromosome k polom."],
    ["apoptoza", "Programirana celična smrt."],
    ["tumor", "Skupek celic, ki se nenadzorovano delijo."],
  ]);
}
