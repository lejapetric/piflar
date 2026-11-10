import { izbira, besedilo } from "../lib.mjs";

const FIG = [["Bel je kot sneg.", "primera"], ["Življenje je pot.", "metafora"], ["Veter poje žalostno pesem.", "poosebitev"], ["zeleni gaj, sinje nebo", "okrasni pridevek"], ["Kaj bi bilo, ko bi bilo?", "retorično vprašanje"], ["Mrmra, šumlja, buči potok.", "stopnjevanje"], ["Bum, tresk! se je zrušilo.", "onomatopeja (zvočno slikanje)"], ["Pod mostom plava, plava, plava.", "ponavljanje"], ["Pil je kozarec do dna.", "metonimija"], ["Leden ogenj", "oksimoron"], ["Rekel sem ti že tisočkrat!", "hiperbola (pretiravanje)"], ["Ni slab = je dober", "litota"]];
const VSE = [...new Set(FIG.map(([, f]) => f))];
const RIME = [["-ica, -ela, -ica, -ela", "prestopna (abab)"], ["-ica, -ica, -ela, -ela", "zaporedna (aabb)"], ["-ica, -ela, -ela, -ica", "oklepajoča (abba)"], ["-ica, -ica, -ica, -ica", "enaka (aaaa)"]];
const KIT = [[2, "dvovrstičnica (distih)"], [3, "tristišje (tercina)"], [4, "četverostišje (kvartina)"], [8, "osmerostišje (stanca)"]];
const VRSTE = [["sonet", "lirika"], ["balada", "lirika in epika (pripovedna pesem)"], ["roman", "epika"], ["novela", "epika"], ["tragedija", "dramatika"], ["komedija", "dramatika"], ["elegija", "lirika"], ["basen", "epika"], ["ep", "epika"], ["himna", "lirika"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("figura", 16, (r) => {
    const [p, f] = r.izberi(FIG);
    return izbira({ r, tezavnost: 2, besedilo: `Katero slogovno sredstvo je uporabljeno: »${p}«`, pravilna: f, napacne: r.premesaj(VSE.filter((x) => x !== f)).slice(0, 3), postopek: `<p>${f.charAt(0).toUpperCase() + f.slice(1)}.</p>` });
  });
  serija("rima", 8, (r) => {
    const [k, odg] = r.izberi(RIME);
    return izbira({ r, tezavnost: 2, besedilo: `Kitica ima konce verzov ${k}. Katera rima je to?`, pravilna: odg, napacne: RIME.map(([, x]) => x).filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("kitica", 6, (r) => {
    const [n, odg] = r.izberi(KIT);
    return izbira({ r, tezavnost: 1, besedilo: `Kako imenujemo kitico s ${n} verzi?`, pravilna: odg, napacne: KIT.map(([, x]) => x).filter((x) => x !== odg), postopek: `<p>${n} verzi: ${odg}.</p>` });
  });
  serija("zvrst", 10, (r) => {
    const [v, z] = r.izberi(VRSTE);
    return izbira({ r, tezavnost: 1, besedilo: `V katero književno zvrst uvrščamo literarno vrsto ${v}?`, pravilna: z, napacne: ["lirika", "epika", "dramatika", "lirika in epika (pripovedna pesem)"].filter((x) => x !== z), postopek: `<p>${v.charAt(0).toUpperCase() + v.slice(1)}: ${z}.</p>` });
  });
  serija("sonet", 6, (r, i) => {
    const [v, odg, raz] = r.izberi([["Koliko verzov ima sonet?", "14", "Dve kvartini in dve tercini."], ["Koliko sonetov sestavlja sonetni venec?", "15", "14 sonetov in magistrale."], ["Koliko verzov ima stanca?", "8", "Osemvrstična kitica."], ["Koliko zlogov ima laški enajsterec?", "11", "Enajst zlogov z ženskim izglasjem."]]);
    return besedilo({ tezavnost: 3, sprejemljivi: [odg], besedilo: v, rezultat: odg, postopek: `<p>${raz}</p>` });
  });
  pojmi([
    ["lirika", "Književna zvrst, ki izraža čustva in razpoloženja."],
    ["epika", "Književna zvrst, ki pripoveduje zgodbo."],
    ["dramatika", "Književna zvrst, namenjena uprizoritvi na odru."],
    ["pripovedovalec", "Glas, ki v epskem besedilu pripoveduje zgodbo."],
    ["lirski subjekt", "Govorec v pesmi, ki izraža čustva."],
    ["verz", "Vrstica v pesmi."],
    ["kitica", "Skupina verzov, ločena od drugih s presledkom."],
    ["rima", "Glasovno ujemanje koncev verzov."],
    ["ritem", "Urejeno izmenjavanje poudarjenih in nepoudarjenih zlogov."],
    ["sonet", "Pesem iz štirinajstih verzov, dveh kvartin in dveh tercin."],
    ["motiv", "Najmanjša vsebinska enota literarnega dela."],
    ["tema", "Osrednja misel ali snov literarnega dela."],
    ["dramski konflikt", "Spopad nasprotnih teženj, ki poganja dramsko dogajanje."],
    ["katarza", "Očiščenje gledalca ob doživljanju tragedije."],
  ]);
  vprasanja([
    [3, "Kaj je akrostih?", "začetne črke verzov dajo besedo ali ime", ["pesem brez rime", "ponavljanje istega verza", "pesem v prozi"], "Prešernov Sonetni venec: PRIMICOVI JULJI."],
    [4, "Kakšna je razlika med prvoosebnim in vsevednim pripovedovalcem?", "prvoosebni pripoveduje iz svojega zornega kota, vsevedni pozna misli vseh oseb", ["vsevedni je vedno glavna oseba", "prvoosebni pozna misli vseh oseb", "razlike ni"], "Zorni kot vpliva na to, kaj bralec izve.", "visja"],
    [4, "Kateri so deli klasične zgradbe drame?", "zasnova, zaplet, vrh, razplet, razsnova", ["uvod, jedro, zaključek", "teza, antiteza, sinteza", "prolog, epilog"], "Petstopenjska zgradba (Freytag).", "visja"],
  ]);
}
