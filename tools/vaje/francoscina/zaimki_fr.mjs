import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

// Zamenjava predmeta z zaimkom: [stavek, del, zaimek, razlaga]
const ZAM = [
  ["Je vois Pierre.", "Pierre", "le", "neposredni predmet, moški spol ednine"],
  ["Je regarde la télé.", "la télé", "la", "neposredni predmet, ženski spol ednine"],
  ["Elle aime ses parents.", "ses parents", "les", "neposredni predmet v množini"],
  ["Je parle à Marie.", "à Marie", "lui", "posredni predmet (à + oseba), ednina"],
  ["Tu téléphones à tes amis.", "à tes amis", "leur", "posredni predmet (à + osebe), množina"],
  ["Nous allons à Paris.", "à Paris", "y", "kraj (à + kraj) → y"],
  ["Je pense à mon examen.", "à mon examen", "y", "à + stvar → y"],
  ["Il mange du pain.", "du pain", "en", "delni člen → en"],
  ["J'ai trois sœurs.", "trois sœurs", "en", "količina → en (j'en ai trois)"],
  ["Elle revient de Rome.", "de Rome", "en", "de + kraj → en"],
  ["Il écrit une lettre à son père.", "à son père", "lui", "posredni predmet, ednina"],
  ["Je connais ces filles.", "ces filles", "les", "neposredni predmet v množini"],
  ["Vous parlez de ce film ?", "de ce film", "en", "de + stvar → en"],
  ["Je donne le livre à Paul.", "le livre", "le", "neposredni predmet"],
  ["Elle prend le bus.", "le bus", "le", "neposredni predmet"],
  ["On répond au professeur.", "au professeur", "lui", "répondre à quelqu'un → lui"],
  ["Je cherche mes clés.", "mes clés", "les", "chercher + neposredni predmet"],
  ["Il boit de l'eau.", "de l'eau", "en", "delni člen → en"],
  ["Nous sommes dans le jardin.", "dans le jardin", "y", "kraj → y"],
  ["J'obéis à mes parents.", "à mes parents", "leur", "obéir à quelqu'un → leur"],
];
const VSI = ["le", "la", "les", "lui", "leur", "y", "en"];

export default function ({ serija }) {
  serija("zamenjaj", 20, (r, i) => {
    const [st, del, z, raz] = ZAM[i];
    return izbira({ r, tezavnost: ["y", "en"].includes(z) ? 3 : 2, besedilo: `S katerim zaimkom nadomestimo <em>${del}</em> v povedi <em>${st}</em>?`, pravilna: z, napacne: r.premesaj(VSI.filter((x) => x !== z)).slice(0, 3), postopek: `<p>${raz}: ${z}.</p>` });
  });
  vrzeli(serija, "polozaj", [
    ["Pierre ? Je ___ vois tous les jours.", "le", ["lui", "la", "en"], "Neposredni predmet, moški spol.", 2],
    ["Marie ? Je ___ téléphone ce soir.", "lui", ["la", "le", "leur"], "Téléphoner à quelqu'un → lui.", 3],
    ["Tes parents ? Tu ___ écris souvent ?", "leur", ["les", "lui", "y"], "Écrire à + osebe → leur.", 3],
    ["Du café ? Oui, j'___ veux bien.", "en", ["y", "le", "la"], "Delni člen → en.", 3],
    ["Paris ? J'___ vais demain.", "y", ["en", "le", "la"], "Kraj → y.", 3],
    ["Ces livres ? Je ___ ai lus.", "les", ["leur", "en", "y"], "Neposredni predmet pred avoir → ujemanje deležnika (lus).", 4, "visja"],
    ["La lettre ? Je l'ai ___ (écrire).", "écrite", ["écrit", "écrits", "écrites"], "Neposredni predmet (la) pred avoir → deležnik v ženskem spolu.", 4, "visja"],
    ["Donne-___ le sel ! (meni)", "moi", ["me", "lui", "toi"], "V trdilnem velelniku: me → moi.", 3],
    ["Ne ___ donne pas le sel ! (meni)", "me", ["moi", "lui", "te"], "V nikalnem velelniku ostane me pred glagolom.", 4, "visja"],
    ["Le livre, je ___ lui donne.", "le", ["lui", "la", "en"], "Vrstni red: le/la/les pred lui/leur.", 4, "visja"],
    ["Des pommes ? Il ___ a acheté trois.", "en", ["les", "y", "leur"], "Količina → en (brez ujemanja deležnika).", 4, "visja"],
    ["C'est ___ qui a raison. (ti)", "toi", ["tu", "te", "ton"], "Naglasni zaimek po c'est.", 2],
    ["Il part avec ___. (ona)", "elle", ["la", "lui", "sa"], "Po predlogu stoji naglasni zaimek.", 2],
    ["___, je préfère le thé. (jaz)", "Moi", ["Je", "Me", "Mon"], "Poudarek: naglasni zaimek moi.", 2],
    ["La femme ___ parle est ma tante.", "qui", ["que", "dont", "où"], "Qui: osebek odvisnega stavka.", 3],
    ["Le film ___ j'ai vu était génial.", "que", ["qui", "dont", "où"], "Que: predmet odvisnega stavka.", 3],
    ["La ville ___ je suis né est petite.", "où", ["que", "qui", "dont"], "Où: kraj ali čas.", 3],
    ["Le livre ___ je parle est ici.", "dont", ["que", "qui", "où"], "Parler de → dont.", 4, "visja"],
    ["Voici le stylo avec ___ j'écris.", "lequel", ["que", "qui", "dont"], "Po predlogu za stvar: lequel/laquelle.", 4, "visja"],
    ["C'est ___ livre, pas le tien. (moj)", "mon", ["ma", "mes", "le mien"], "Svojilni pridevnik pred samostalnikom.", 1],
    ["Ce n'est pas ton vélo, c'est ___. (moje)", "le mien", ["mon", "le mon", "mien"], "Svojilni zaimek nadomešča samostalnik.", 3],
    ["___ amie s'appelle Léa. (moja)", "Mon", ["Ma", "Mes", "Mien"], "Pred samoglasnikom v ženskem spolu: mon (mon amie).", 4, "visja"],
    ["Je ___ lève à sept heures.", "me", ["se", "te", "moi"], "Povratni glagol: je me lève.", 1],
    ["Nous ___ promenons au parc.", "nous", ["se", "vous", "me"], "Povratni glagol: nous nous promenons.", 2],
    ["Ils ___ sont rencontrés à Lyon.", "se", ["s'", "les", "leur"], "Povratni glagol v passé composé z être.", 3],
  ]);
  pomeni(serija, "pomen", [["celui-ci", "ta (tukaj)"], ["quelqu'un", "nekdo"], ["personne", "nihče"], ["rien", "nič"], ["chacun", "vsak (posameznik)"], ["quelque chose", "nekaj"], ["tout le monde", "vsi"], ["aucun", "noben"], ["lequel ?", "kateri?"], ["ceux-là", "tisti (tam)"]], { tez: 1, n: 12 });
}
