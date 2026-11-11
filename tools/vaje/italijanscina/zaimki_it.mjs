import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const ZAM = [
  ["Vedo Marco.", "Marco", "lo", "neposredni predmet, moški spol ednine"], ["Guardo la TV.", "la TV", "la", "neposredni predmet, ženski spol ednine"],
  ["Conosco i tuoi amici.", "i tuoi amici", "li", "neposredni predmet, moški spol množine"], ["Compro le mele.", "le mele", "le", "neposredni predmet, ženski spol množine"],
  ["Telefono a Paolo.", "a Paolo", "gli", "posredni predmet, moški spol"], ["Scrivo a Giulia.", "a Giulia", "le", "posredni predmet, ženski spol"],
  ["Parlo ai miei genitori.", "ai miei genitori", "gli", "posredni predmet v množini (pogovorno gli, knjižno loro)"], ["Vado a Milano.", "a Milano", "ci", "kraj → ci"],
  ["Penso al viaggio.", "al viaggio", "ci", "a + stvar → ci"], ["Mangio del pane.", "del pane", "ne", "delni člen → ne"],
  ["Ho tre fratelli.", "tre fratelli", "ne", "količina → ne (ne ho tre)"], ["Parliamo di politica.", "di politica", "ne", "di + stvar → ne"],
  ["Rispondo al professore.", "al professore", "gli", "rispondere a qualcuno → gli"], ["Prendo il treno.", "il treno", "lo", "neposredni predmet"],
  ["Cerco le chiavi.", "le chiavi", "le", "neposredni predmet, ženski spol množine"], ["Regalo un libro a Sara.", "a Sara", "le", "posredni predmet, ženski spol"],
];
const VSI = ["lo", "la", "li", "le", "gli", "ci", "ne"];

export default function ({ serija }) {
  serija("zamenjaj", 16, (r, i) => {
    const [st, del, z, raz] = ZAM[i];
    return izbira({ r, tezavnost: ["ci", "ne"].includes(z) ? 3 : 2, besedilo: `S katerim zaimkom nadomestimo <em>${del}</em> v povedi <em>${st}</em>?`, pravilna: z, napacne: r.premesaj(VSI.filter((x) => x !== z)).slice(0, 3), postopek: `<p>${raz}: ${z}.</p>` });
  });
  vrzeli(serija, "raba", [
    ["Marco? ___ vedo ogni giorno.", "Lo", ["Gli", "La", "Ne"], "Neposredni predmet, moški spol.", 2],
    ["Giulia? ___ telefono stasera.", "Le", ["La", "Gli", "Lo"], "Telefonare a qualcuno → le (ženski spol).", 3],
    ["Del caffè? Sì, ___ prendo uno.", "ne", ["lo", "ci", "gli"], "Količina → ne.", 3],
    ["Roma? ___ vado domani.", "Ci", ["Ne", "La", "Lo"], "Kraj → ci.", 3],
    ["Il libro? ___ ho letto.", "L'", ["Lo", "Gli", "Ne"], "Lo pred samoglasnikom → l'.", 3],
    ["Le foto? Le ho ___ (vedere).", "viste", ["visto", "visti", "vista"], "Deležnik se ujema z le.", 4, "visja"],
    ["Il libro a Paolo? ___ do domani.", "Glielo", ["Gli lo", "Lo gli", "Gliela"], "Gli + lo → glielo.", 4, "visja"],
    ["La lettera a mia madre? ___ scrivo oggi.", "Gliela", ["Glielo", "Le la", "La le"], "Le/gli + la → gliela.", 4, "visja"],
    ["Me ___ dai? (il libro)", "lo", ["la", "ne", "gli"], "Mi + lo → me lo.", 4, "visja"],
    ["Dammi la penna! – Te ___ do subito.", "la", ["lo", "ne", "le"], "Ti + la → te la.", 4, "visja"],
    ["Vieni con ___? (jaz)", "me", ["mi", "io", "mio"], "Po predlogu: naglasna oblika me.", 2],
    ["A ___ piace il calcio, a me no. (ti)", "te", ["ti", "tu", "tuo"], "Poudarek: a te piace.", 3],
    ["La ragazza ___ parla è mia sorella.", "che", ["cui", "chi", "quale"], "Che: osebek ali predmet.", 2],
    ["Il ragazzo con ___ esco è simpatico.", "cui", ["che", "chi", "quale"], "Po predlogu: cui.", 3],
    ["___ dorme non piglia pesci.", "Chi", ["Che", "Cui", "Quale"], "Chi = kdor.", 4, "visja"],
    ["È ___ casa, non la tua. (moja)", "la mia", ["mia", "il mio", "la mio"], "Svojilni pridevnik s členom.", 2],
    ["Ti presento ___ madre. (moja)", "mia", ["la mia", "mio", "il mio"], "Sorodniki v ednini brez člena.", 4, "visja"],
  ]);
  pomeni(serija, "pomen", [["qualcuno", "nekdo"], ["nessuno", "nihče"], ["niente", "nič"], ["qualcosa", "nekaj"], ["ognuno", "vsak"], ["tutti", "vsi"], ["alcuni", "nekateri"], ["questo", "ta (tukaj)"], ["quello", "tisti"]], { tez: 1, n: 10 });
}
