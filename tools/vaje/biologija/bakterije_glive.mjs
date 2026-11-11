import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("rast", 8, (r, i) => {
    const t = r.izberi([20, 30, 40, 60]), n = r.int(2, 12), N0 = r.int(1, 50) * 10, N = N0 * 2 ** n;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: N, tol: 0.001, enota: "", besedilo: `Bakterija se v ugodnih razmerah deli vsakih ${t} min. Koliko bakterij je po ${(n * t) / 60 >= 1 && (n * t) % 60 === 0 ? `${(n * t) / 60} h` : `${n * t} min`}, če jih je bilo na začetku ${N0}?`, rezultat: `${N}`, postopek: `<p>Število generacij: \\(n = ${n}\\). \\(N = ${N0} \\cdot 2^{${n}} = ${N}\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: n * t, enota: "min", besedilo: `Iz ${N0} bakterij jih je nastalo ${N}. Generacijski čas je ${t} min. Koliko časa je minilo?`, rezultat: `${n * t} min`, postopek: `<p>\\(\\frac{${N}}{${N0}} = ${2 ** n} = 2^{${n}}\\), torej ${n} generacij.</p><p>\\(t = ${n} \\cdot ${t} = ${n * t}\\) min</p>` });
  });
  serija("generacijski", 5, (r) => {
    const n = r.int(3, 10), t = r.izberi([20, 25, 30, 45]), T0 = n * t;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: t, enota: "min", besedilo: `Število bakterij se v ${T0} minutah poveča ${2 ** n}-krat. Kolikšen je generacijski čas?`, rezultat: `${t} min`, postopek: `<p>\\(2^n = ${2 ** n} \\Rightarrow n = \\log_2 ${2 ** n} = ${n}\\)</p><p>\\(g = \\frac{${T0}}{${n}} = ${t}\\) min</p>` });
  });
  serija("razredcitev", 5, (r) => {
    const k = r.int(5, 300), red = r.int(3, 7), v = k * 10 ** red;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: v, tol: 0.01, enota: "CFU/mL", besedilo: `Na plošči zraste ${k} kolonij iz 1 mL vzorca, razredčenega ${10 ** red}-krat. Koliko bakterij (CFU) je bilo v 1 mL nerazredčenega vzorca? (vpiši npr. 2,5e6)`, rezultat: `\\(${L(k, 0)} \\cdot 10^{${red}}\\) CFU/mL`, postopek: `<p>\\(N = ${k} \\cdot 10^{${red}}\\) CFU/mL</p>` });
  });
  serija("oblika", 5, (r) => {
    const [o, odg] = r.izberi([["kroglaste", "koki"], ["paličaste", "bacili"], ["vijačne", "spirili"], ["kroglaste v verižicah", "streptokoki"], ["kroglaste v grozdih", "stafilokoki"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kako imenujemo ${o} bakterije?`, pravilna: odg, napacne: ["koki", "bacili", "spirili", "streptokoki", "stafilokoki"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)} bakterije: ${odg}.</p>` });
  });
  serija("bolezen", 7, (r) => {
    const [b, odg] = r.izberi([["tuberkuloza", "bakterija"], ["gripa", "virus"], ["borelioza", "bakterija"], ["klopni meningoencefalitis", "virus"], ["kandidoza", "gliva"], ["malarija", "praživali (protisti)"], ["tetanus", "bakterija"], ["ošpice", "virus"], ["atletsko stopalo", "gliva"], ["COVID-19", "virus"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj povzroča bolezen ${b}?`, pravilna: odg, napacne: ["bakterija", "virus", "gliva", "praživali (protisti)"].filter((x) => x !== odg), postopek: `<p>${b.charAt(0).toUpperCase() + b.slice(1)}: ${odg}. ${odg === "virus" ? "Antibiotiki niso učinkoviti." : ""}</p>` });
  });
  serija("uporaba", 5, (r) => {
    const [u, odg] = r.izberi([["peka kruha", "kvasovke"], ["izdelava jogurta", "mlečnokislinske bakterije"], ["pridobivanje penicilina", "plesen Penicillium"], ["vezava zračnega dušika v koreninskih gomoljih", "bakterije iz rodu Rhizobium"], ["izdelava vina in piva", "kvasovke"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri mikroorganizmi sodelujejo pri: ${u}?`, pravilna: odg, napacne: ["kvasovke", "mlečnokislinske bakterije", "plesen Penicillium", "bakterije iz rodu Rhizobium"].filter((x) => x !== odg), postopek: `<p>${u.charAt(0).toUpperCase() + u.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["bakterija", "Enocelični prokariontski organizem brez jedra."],
    ["virus", "Nečelični povzročitelj, ki se razmnožuje le v gostiteljski celici."],
    ["bakteriofag", "Virus, ki napada bakterije."],
    ["antibiotik", "Snov, ki zavira rast ali ubija bakterije."],
    ["endospora", "Odporna mirujoča oblika nekaterih bakterij."],
    ["konjugacija", "Prenos DNA med bakterijama prek neposrednega stika."],
    ["hifa", "Nitasta celica ali cevka, ki gradi telo glive."],
    ["micelij", "Prepletene hife, ki tvorijo telo glive."],
    ["mikoriza", "Sožitje gliv s koreninami rastlin."],
    ["lišaj", "Sožitje glive in alge ali cianobakterije."],
    ["kvasovke", "Enocelične glive, ki izvajajo alkoholno vrenje."],
    ["saprofit", "Organizem, ki se prehranjuje z odmrlo organsko snovjo."],
    ["patogen", "Organizem ali virus, ki povzroča bolezen."],
  ]);
  vprasanja([
    [3, "Zakaj antibiotiki ne delujejo na viruse?", "ker virusi nimajo lastne presnove in celične stene, na katere bi antibiotik deloval", ["ker so virusi preveliki", "ker virusi živijo v vodi", "ker so virusi bakterije"], "Antibiotiki napadajo bakterijske strukture, ki jih virusi nimajo."],
    [4, "Kako nastane odpornost bakterij proti antibiotikom?", "z mutacijami in prenosom genov, nato selekcija odpornih bakterij", ["bakterije se antibiotika naučijo", "antibiotik spremeni bakterijo v virus", "bakterije antibiotik razgradijo v hrano"], "Antibiotik deluje kot selekcijski pritisk.", "visja"],
    [4, "Zakaj je retrovirus HIV težko uničiti?", "ker se njegova DNA s pomočjo reverzne transkriptaze vgradi v genom gostitelja", ["ker ima celično steno", "ker je bakterija", "ker ne vsebuje dedne snovi"], "Provirus v kromosomu je za imunski sistem neviden.", "visja"],
    [4, "Kakšna je razlika med Gram-pozitivnimi in Gram-negativnimi bakterijami?", "Gram-pozitivne imajo debelo plast peptidoglikana, Gram-negativne tanko in zunanjo membrano", ["Gram-pozitivne nimajo celične stene", "Gram-negativne imajo jedro", "razlike ni"], "Barvanje po Gramu loči bakterije po zgradbi stene.", "visja"],
    [2, "Kaj potrebujejo kvasovke za alkoholno vrenje?", "sladkor", ["kisik", "svetlobo", "dušik iz zraka"], "Pri vrenju iz sladkorja nastaneta etanol in CO₂."],
  ]);
}
