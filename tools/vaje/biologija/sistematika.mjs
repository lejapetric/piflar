import { izbira } from "../lib.mjs";

const ORG = [["volk", "sesalci", "strunarji"], ["krap", "ribe", "strunarji"], ["sinica", "ptiči", "strunarji"], ["kuščarica", "plazilci", "strunarji"], ["sekulja", "dvoživke", "strunarji"], ["čebela", "žuželke", "členonožci"], ["križevec", "pajkovci", "členonožci"], ["rak jelševec", "raki", "členonožci"], ["vrtni polž", "polži", "mehkužci"], ["klapavica", "školjke", "mehkužci"], ["deževnik", "maloščetinci", "kolobarniki"], ["meduza", "klobučnjaki", "ožigalkarji"], ["svinjska trakulja", "trakulje", "ploski črvi"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("razred", 8, (r) => {
    const [o, raz] = r.izberi(ORG);
    return izbira({ r, tezavnost: 1, besedilo: `V katero skupino (razred) uvrščamo organizem ${o}?`, pravilna: raz, napacne: r.premesaj([...new Set(ORG.map(([, x]) => x))].filter((x) => x !== raz)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${raz}.</p>` });
  });
  serija("deblo", 8, (r) => {
    const [o, , d] = r.izberi(ORG);
    return izbira({ r, tezavnost: 2, besedilo: `V katero deblo uvrščamo organizem ${o}?`, pravilna: d, napacne: r.premesaj([...new Set(ORG.map(([, , x]) => x))].filter((x) => x !== d)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)} spada v deblo ${d}.</p>` });
  });
  serija("hierarhija", 6, (r) => {
    const H = ["domena", "kraljestvo", "deblo", "razred", "red", "družina", "rod", "vrsta"];
    const i = r.int(0, H.length - 2);
    return izbira({ r, tezavnost: 2, besedilo: `Katera taksonomska kategorija sledi neposredno pod kategorijo »${H[i]}«?`, pravilna: H[i + 1], napacne: r.premesaj(H.filter((x, j) => j !== i + 1 && j !== i)).slice(0, 3), postopek: `<p>${H.join(" → ")}</p>` });
  });
  serija("znak", 8, (r) => {
    const [z, odg] = r.izberi([["telo iz glave, oprsja in zadka, 3 pari nog", "žuželke"], ["4 pari nog, glavoprsje in zadek", "pajkovci"], ["perje in kljun", "ptiči"], ["dlaka in mlečne žleze", "sesalci"], ["luske in jajca z lupino, menjava temperature", "plazilci"], ["gola vlažna koža, ličinke v vodi", "dvoživke"], ["ožigalke in dve plasti celic", "ožigalkarji"], ["telo iz kolobarjev, ščetine", "kolobarniki"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Za katero skupino je značilno: ${z}?`, pravilna: odg, napacne: r.premesaj(["žuželke", "pajkovci", "ptiči", "sesalci", "plazilci", "dvoživke", "ožigalkarji", "kolobarniki"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${z.charAt(0).toUpperCase() + z.slice(1)}: ${odg}.</p>` });
  });
  serija("rastline", 6, (r) => {
    const [z, odg] = r.izberi([["nimajo prevajalnih tkiv, prevladuje gametofit", "mahovi"], ["imajo prevajalna tkiva, razmnožujejo se s trosi", "praprotnice"], ["semena niso zaprta v plodnici", "golosemenke"], ["semena so zaprta v plodu, imajo cvetove", "kritosemenke"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katero skupino rastlin opisuje: ${z}?`, pravilna: odg, napacne: ["mahovi", "praprotnice", "golosemenke", "kritosemenke"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}: ${z}.</p>` });
  });
  pojmi([
    ["sistematika", "Veda o razvrščanju organizmov v skupine po sorodnosti."],
    ["takson", "Skupina organizmov na določeni ravni razvrstitve."],
    ["vrsta", "Skupina osebkov, ki se med seboj plodno razmnožujejo."],
    ["binomsko poimenovanje", "Znanstveno ime iz imena rodu in vrstnega pridevka."],
    ["filogenetsko drevo", "Diagram, ki prikazuje sorodstvene odnose med organizmi."],
    ["domena", "Najvišja taksonomska kategorija: bakterije, arheje, evkarionti."],
    ["kladogram", "Razvejan diagram skupin s skupnimi izpeljanimi znaki."],
    ["določevalni ključ", "Pripomoček za določanje organizmov z izbiro med nasprotnimi znaki."],
    ["vretenčarji", "Živali s hrbtenico."],
    ["nevretenčarji", "Živali brez hrbtenice."],
    ["strunarji", "Deblo živali, ki imajo vsaj v razvoju hrbtno struno."],
    ["arheje", "Prokariontski organizmi, ki pogosto živijo v skrajnih okoljih."],
    ["protisti", "Raznolika skupina večinoma enoceličnih evkariontov."],
  ]);
  vprasanja([
    [2, "Kako se pravilno zapiše znanstveno ime človeka?", "Homo sapiens", ["homo Sapiens", "Homo Sapiens", "HOMO SAPIENS"], "Rod z veliko začetnico, vrstni pridevek z malo, poševno."],
    [3, "Kateri organizmi so si najbolj sorodni?", "organizmi istega rodu", ["organizmi istega razreda", "organizmi istega debla", "organizmi istega kraljestva"], "Nižja skupna kategorija pomeni bližjo sorodnost."],
    [4, "Zakaj kit ne spada med ribe?", "ker diha s pljuči, je toplokrven in doji mladiče", ["ker živi v morju", "ker ima plavuti", "ker je velik"], "Podobnost z ribami je posledica konvergentne evolucije.", "visja"],
    [4, "Na čem temelji sodobna razvrstitev organizmov v tri domene?", "na primerjavi zaporedij ribosomske RNA", ["na obliki telesa", "na načinu prehranjevanja", "na velikosti celic"], "Carl Woese je arheje ločil od bakterij po rRNA.", "visja"],
    [4, "Zakaj glive niso rastline?", "ker so heterotrofne in imajo celično steno iz hitina", ["ker so enocelične", "ker nimajo celic", "ker so prokarionti"], "Glive so po DNA bližje živalim kot rastlinam.", "visja"],
  ]);
}
