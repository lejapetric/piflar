import { izbira, besedilo } from "../lib.mjs";

const BV = [["miza", "samostalnik"], ["lep", "pridevnik"], ["teči", "glagol"], ["hitro", "prislov"], ["jaz", "zaimek"], ["pet", "števnik"], ["na", "predlog"], ["in", "veznik"], ["tudi", "členek"], ["joj", "medmet"], ["ljubezen", "samostalnik"], ["zelen", "pridevnik"], ["pisati", "glagol"], ["včeraj", "prislov"], ["njegov", "zaimek"], ["tretji", "števnik"], ["pod", "predlog"], ["ker", "veznik"], ["le", "členek"], ["au", "medmet"]];
// samostalnik: [imenovalnik, rod, daj, tož, mest, orod]
const S = [["miza", "mize", "mizi", "mizo", "mizi", "mizo"], ["knjiga", "knjige", "knjigi", "knjigo", "knjigi", "knjigo"], ["hiša", "hiše", "hiši", "hišo", "hiši", "hišo"], ["sestra", "sestre", "sestri", "sestro", "sestri", "sestro"], ["stol", "stola", "stolu", "stol", "stolu", "stolom"], ["brat", "brata", "bratu", "brata", "bratu", "bratom"], ["učitelj", "učitelja", "učitelju", "učitelja", "učitelju", "učiteljem"], ["nož", "noža", "nožu", "nož", "nožu", "nožem"], ["mesto", "mesta", "mestu", "mesto", "mestu", "mestom"], ["okno", "okna", "oknu", "okno", "oknu", "oknom"], ["polje", "polja", "polju", "polje", "polju", "poljem"]];
const PRED = [["brez", 1, "rodilnik"], ["iz", 1, "rodilnik"], ["do", 1, "rodilnik"], ["zaradi", 1, "rodilnik"], ["proti", 2, "dajalnik"], ["o", 4, "mestnik"], ["pri", 4, "mestnik"]];
const STOP = [["lep", "lepši", "najlepši"], ["velik", "večji", "največji"], ["dober", "boljši", "najboljši"], ["slab", "slabši", "najslabši"], ["visok", "višji", "najvišji"], ["mlad", "mlajši", "najmlajši"], ["star", "starejši", "najstarejši"], ["nizek", "nižji", "najnižji"], ["širok", "širši", "najširši"], ["drag", "dražji", "najdražji"], ["kratek", "krajši", "najkrajši"], ["lahek", "lažji", "najlažji"], ["težek", "težji", "najtežji"], ["majhen", "manjši", "najmanjši"], ["globok", "globlji", "najgloblji"]];
const GL = [["pisati", "pišem", "pisal", "piši"], ["brati", "berem", "bral", "beri"], ["delati", "delam", "delal", "delaj"], ["govoriti", "govorim", "govoril", "govori"], ["hoditi", "hodim", "hodil", "hodi"], ["peti", "pojem", "pel", "poj"], ["nesti", "nesem", "nesel", "nesi"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("besedna-vrsta", 16, (r) => {
    const [b, v] = r.izberi(BV);
    return izbira({ r, tezavnost: 1, besedilo: `Katera besedna vrsta je beseda »${b}«?`, pravilna: v, napacne: r.premesaj([...new Set(BV.map(([, x]) => x))].filter((x) => x !== v)).slice(0, 3), postopek: `<p>${b}: ${v}.</p>` });
  });
  serija("sklon", 12, (r) => {
    const s = r.izberi(S), [p, k, ime] = r.izberi(PRED), o = s[k];
    return besedilo({ tezavnost: 2, sprejemljivi: [o], besedilo: `Dopolni z ustrezno obliko: ${p} ___ (${s[0]}).`, rezultat: `${p} ${o}`, postopek: `<p>Predlog <em>${p}</em> zahteva ${ime}: ${p} ${o}.</p>` });
  });
  serija("kateri-sklon", 10, (r) => {
    const s = r.izberi(S), [p, k, ime] = r.izberi(PRED);
    return izbira({ r, tezavnost: 2, besedilo: `V katerem sklonu je samostalnik v zvezi »${p} ${s[k]}«?`, pravilna: ime, napacne: ["rodilnik", "dajalnik", "tožilnik", "mestnik", "orodnik"].filter((x) => x !== ime).slice(0, 3), postopek: `<p>Predlog <em>${p}</em> se veže z ${ime === "rodilnik" ? "rodilnikom" : ime === "dajalnik" ? "dajalnikom" : "mestnikom"}.</p>` });
  });
  serija("stopnjevanje", 12, (r, i) => {
    const [o, p, s] = r.izberi(STOP), pres = i % 2 === 1;
    return besedilo({ tezavnost: pres ? 2 : 3, sprejemljivi: [pres ? s : p], besedilo: `Zapiši ${pres ? "presežnik" : "primernik"} pridevnika »${o}«.`, rezultat: pres ? s : p, postopek: `<p>${o} – ${p} – ${s}</p>` });
  });
  serija("cas", 12, (r) => {
    const [n, sed, del, vel] = r.izberi(GL), [obl, odg] = r.izberi([[sed, "sedanjik"], [`sem ${del}`, "preteklik"], [`bom ${del}`, "prihodnjik"], [`bi ${del}`, "pogojnik"], [vel, "velelnik"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katera glagolska oblika je »${obl}« (glagol ${n})?`, pravilna: odg, napacne: ["sedanjik", "preteklik", "prihodnjik", "pogojnik", "velelnik"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${obl}: ${odg}.</p>` });
  });
  serija("stevilo", 6, (r) => {
    const s = r.izberi(S.slice(0, 4)), [z, odg] = r.izberi([[`dve ${s[2]}`, "dvojina"], [`tri ${s[1].replace(/e$/, "e")}`, "množina"], [`ena ${s[0]}`, "ednina"]]);
    return izbira({ r, tezavnost: 1, besedilo: `V katerem številu je samostalnik v zvezi »${z}«?`, pravilna: odg, napacne: ["ednina", "dvojina", "množina"].filter((x) => x !== odg), postopek: `<p>${z}: ${odg}.</p>` });
  });
  pojmi([
    ["besedna vrsta", "Skupina besed z enakimi slovničnimi lastnostmi."],
    ["sklon", "Oblika pregibne besede, ki izraža njeno vlogo v stavku."],
    ["sklanjatev", "Pregibanje samostalniških besed po sklonih, številih in spolih."],
    ["spregatev", "Pregibanje glagola po osebah, številih, časih in naklonih."],
    ["dvojina", "Slovnično število za dva predmeta ali osebi."],
    ["glagolski vid", "Lastnost glagola, ki izraža dovršnost ali nedovršnost dejanja."],
    ["naklon", "Glagolska kategorija, ki izraža odnos govorca do dejanja (povedni, velelni, pogojni)."],
    ["primernik", "Druga stopnja pridevnika, ki izraža večjo mero lastnosti."],
    ["presežnik", "Najvišja stopnja pridevnika."],
    ["nepregibna beseda", "Beseda, ki ne spreminja oblike, npr. predlog ali veznik."],
    ["deležnik", "Glagolska oblika z lastnostmi pridevnika, npr. »pisal«, »napisan«."],
    ["nedoločnik", "Osnovna oblika glagola na -ti ali -či."],
    ["osebni zaimek", "Zaimek, ki nadomešča osebo, npr. jaz, ti, on."],
  ]);
  vprasanja([
    [2, "Koliko sklonov ima slovenščina?", { vpis: ["6", "šest"] }, [], "Imenovalnik, rodilnik, dajalnik, tožilnik, mestnik, orodnik."],
    [3, "Kateri glagol je dovršen?", "napisati", ["pisati", "brati", "delati"], "Dovršni glagol izraža končano dejanje."],
    [4, "V kateri povedi je napaka v dvojini?", "Midva sta šla v kino.", ["Midva sva šla v kino.", "Onadva sta šla v kino.", "Vidva sta šla v kino."], "Pravilno: midva sva.", "visja"],
    [4, "Kateri pridevnik navadno stopnjujemo opisno (z »bolj«, »najbolj«)?", "rdeč", ["lep", "visok", "star"], "Pridevnike za barve in tiste brez priponskega primernika stopnjujemo opisno: bolj rdeč.", "visja"],
  ]);
}
