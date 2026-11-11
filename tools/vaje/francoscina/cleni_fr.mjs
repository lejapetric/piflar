import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

// [samostalnik, spol m/f, začne z samoglasnikom, množina?, pomen]
const HRANA = [["pain", "m", 0, 0, "kruh"], ["eau", "f", 1, 0, "voda"], ["fromage", "m", 0, 0, "sir"], ["confiture", "f", 0, 0, "marmelada"], ["huile", "f", 1, 0, "olje"], ["lait", "m", 0, 0, "mleko"], ["beurre", "m", 0, 0, "maslo"], ["salade", "f", 0, 0, "solata"], ["argent", "m", 1, 0, "denar"], ["viande", "f", 0, 0, "meso"], ["riz", "m", 0, 0, "riž"], ["soupe", "f", 0, 0, "juha"], ["café", "m", 0, 0, "kava"], ["farine", "f", 0, 0, "moka"], ["légumes", "m", 0, 1, "zelenjava"], ["fraises", "f", 0, 1, "jagode"], ["chocolat", "m", 0, 0, "čokolada"], ["patience", "f", 0, 0, "potrpežljivost"], ["sucre", "m", 0, 0, "sladkor"], ["pâtes", "f", 0, 1, "testenine"]];
const KRAJI = [["cinéma", "m", 0, 0], ["piscine", "f", 0, 0], ["école", "f", 1, 0], ["hôpital", "m", 1, 0], ["marché", "m", 0, 0], ["toilettes", "f", 0, 1], ["États-Unis", "m", 1, 1], ["bureau", "m", 0, 0], ["gare", "f", 0, 0], ["parc", "m", 0, 0], ["aéroport", "m", 1, 0], ["boulangerie", "f", 0, 0]];
const part = ([, g, v, mn]) => (mn ? "des" : v ? "de l'" : g === "m" ? "du" : "de la");
const doloc = ([, g, v, mn]) => (mn ? "les" : v ? "l'" : g === "m" ? "le" : "la");
const a = ([, g, v, mn]) => (mn ? "aux" : v ? "à l'" : g === "m" ? "au" : "à la");
const de = (x) => part(x);
const VSI = ["du", "de la", "de l'", "des", "de"];

export default function ({ serija }) {
  serija("delni", 20, (r, i) => {
    const h = r.izberi(HRANA), neg = i % 4 === 3, gl = r.izberi(["Je mange", "Nous achetons", "Tu veux", "Elle prend", "Ils boivent", "Vous avez"]);
    const prav = neg ? (h[2] ? "d'" : "de") : part(h);
    const pov = neg ? `${gl.replace(/^(\S+) /, "$1 ne ").replace(/^(\S+ ne )(\S+)/, "$1$2 pas").replace(/ ne ([aeiouéèh])/, " n'$1")} ___ ${h[0]}.` : `${gl} ___ ${h[0]}.`;
    const raz = neg ? "Po nikalnici (ne … pas) se delni člen spremeni v de (d')." : `Delni člen: ${h[0]} (${h[4]}) je ${h[3] ? "v množini → des" : h[1] === "m" ? "moškega spola → du" : "ženskega spola → de la"}${h[2] && !h[3] ? ", začne s samoglasnikom → de l'" : ""}.`;
    const nap = [...new Set([...VSI, "d'", "le", "la"])].filter((x) => x !== prav);
    if (i % 2) return besedilo({ tezavnost: neg ? 3 : 2, sprejemljivi: [prav], besedilo: `Vpiši delni člen: <em>${pov}</em>`, rezultat: prav, postopek: `<p>${raz}</p>` });
    return izbira({ r, tezavnost: neg ? 3 : 1, besedilo: `Izberi pravilni člen: <em>${pov}</em>`, pravilna: prav, napacne: r.premesaj(nap).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  serija("zlitje-a", 14, (r, i) => {
    const k = r.izberi(KRAJI), gl = r.izberi(["Je vais", "On va", "Nous allons", "Ils sont"]), prav = a(k);
    const raz = `à + ${doloc(k)} → ${prav}`;
    if (i % 2) return besedilo({ tezavnost: 2, sprejemljivi: [prav], besedilo: `Vpiši à + člen: <em>${gl} ___ ${k[0]}.</em>`, rezultat: prav, postopek: `<p>${raz}</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Izberi pravilno: <em>${gl} ___ ${k[0]}.</em>`, pravilna: prav, napacne: ["au", "à la", "à l'", "aux", "à le"].filter((x) => x !== prav).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  serija("zlitje-de", 12, (r, i) => {
    const k = r.izberi(KRAJI), gl = r.izberi(["Je reviens", "Elle sort", "Nous venons", "Il est loin"]), prav = de(k);
    const raz = `de + ${doloc(k)} → ${prav}`;
    if (i % 2) return besedilo({ tezavnost: 3, sprejemljivi: [prav], besedilo: `Vpiši de + člen: <em>${gl} ___ ${k[0]}.</em>`, rezultat: prav, postopek: `<p>${raz}</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `Izberi pravilno: <em>${gl} ___ ${k[0]}.</em>`, pravilna: prav, napacne: ["du", "de la", "de l'", "des", "de le"].filter((x) => x !== prav).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  serija("dolocni", 10, (r, i) => {
    const h = r.izberi([...HRANA, ...KRAJI.map((k) => [...k, ""])]), prav = doloc(h);
    if (i % 2) return besedilo({ tezavnost: 2, sprejemljivi: [prav], besedilo: `Vpiši določni člen pred samostalnikom <em>${h[0]}</em>.`, rezultat: `${prav === "l'" ? "l'" : prav + " "}${h[0]}`, postopek: `<p>${h[3] ? "množina → les" : h[2] ? "samoglasnik/nemi h → l'" : h[1] === "m" ? "moški spol → le" : "ženski spol → la"}</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Kateri določni člen sodi pred <em>${h[0]}</em>?`, pravilna: prav, napacne: ["le", "la", "l'", "les"].filter((x) => x !== prav), postopek: `<p>${h[0]}: ${prav}</p>` });
  });
  vrzeli(serija, "raba", [
    ["J'aime ___ chocolat.", "le", ["du", "de", "un"], "Po glagolih okusa (aimer, adorer, détester) stoji določni člen.", 3],
    ["Il n'a pas ___ voiture.", ["de", "d'"], ["une", "la", "des"], "Nikalnica: un/une/des → de.", 3],
    ["C'est ___ livre de Marie.", "le", ["un", "du", "de"], "Določena stvar (knjiga od Marie) → le.", 2],
    ["Elle est ___ médecin.", "–", ["une", "la", "de"], "Pri poklicih po être člena ne pišemo.", 4, "visja"],
    ["Il y a beaucoup ___ monde ici.", "de", ["du", "des", "le"], "Po količinskih izrazih (beaucoup, peu, trop) stoji de.", 3],
    ["J'ai acheté un kilo ___ pommes.", "de", ["des", "les", "du"], "Un kilo de, une bouteille de … → de.", 3],
    ["Ce sont ___ amis de Paul.", "des", ["les", "de", "un"], "Nedoločni člen v množini: des.", 2],
    ["Elle a ___ beaux yeux.", "de", ["des", "les", "du"], "Pred pridevnikom v množini se des v knjižnem jeziku spremeni v de.", 4, "visja"],
    ["Je joue ___ piano.", "du", ["au", "le", "de"], "Jouer de + glasbilo (de + le = du).", 3],
    ["Je joue ___ football.", "au", ["du", "le", "de"], "Jouer à + šport (à + le = au).", 3],
    ["Il habite ___ France.", "en", ["à", "au", "dans"], "Ženske države: en.", 3],
    ["Il habite ___ Portugal.", "au", ["en", "à", "le"], "Moške države: au.", 3],
    ["Il habite ___ Ljubljana.", "à", ["en", "au", "de"], "Mesta: à.", 2],
    ["Le lundi, ___ je vais à la piscine.", "–", ["le", "un", "du"], "Ob ponovljenih dnevih je člen že pred dnem (le lundi = ob ponedeljkih).", 4, "visja"],
    ["Je n'aime pas ___ café.", "le", ["de", "du", "un"], "Po aimer v nikalnici ostane določni člen.", 4, "visja"],
  ]);
}
