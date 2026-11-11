import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const ZAM = [
  ["Veo a Juan.", "a Juan", "lo", "neposredni predmet, moški spol ednine"], ["Compro la revista.", "la revista", "la", "neposredni predmet, ženski spol ednine"],
  ["Conozco a tus amigos.", "a tus amigos", "los", "neposredni predmet, moški spol množine"], ["Lavo las camisas.", "las camisas", "las", "neposredni predmet, ženski spol množine"],
  ["Escribo a Marta.", "a Marta", "le", "posredni predmet, ednina"], ["Doy un regalo a mis padres.", "a mis padres", "les", "posredni predmet, množina"],
  ["Llamo a mi madre.", "a mi madre", "la", "neposredni predmet (llamar a alguien)"], ["Pido ayuda al profesor.", "al profesor", "le", "posredni predmet"],
  ["Leo el periódico.", "el periódico", "lo", "neposredni predmet"], ["Busco las llaves.", "las llaves", "las", "neposredni predmet, ženski spol množine"],
  ["Explico el problema a los alumnos.", "a los alumnos", "les", "posredni predmet, množina"], ["Tomo los apuntes.", "los apuntes", "los", "neposredni predmet, moški spol množine"],
  ["Envío una carta a Pedro.", "a Pedro", "le", "posredni predmet, ednina"], ["Invito a mis amigas.", "a mis amigas", "las", "neposredni predmet, ženski spol množine"],
];
const VSI = ["lo", "la", "los", "las", "le", "les"];

export default function ({ serija }) {
  serija("zamenjaj", 14, (r, i) => {
    const [st, del, z, raz] = ZAM[i];
    return izbira({ r, tezavnost: z.startsWith("le") ? 3 : 2, besedilo: `S katerim zaimkom nadomestimo <em>${del}</em> v povedi <em>${st}</em>?`, pravilna: z, napacne: r.premesaj(VSI.filter((x) => x !== z)).slice(0, 3), postopek: `<p>${raz}: ${z}.</p>` });
  });
  vrzeli(serija, "raba", [
    ["¿El libro? Ya ___ he leído.", "lo", ["le", "la", "se"], "Neposredni predmet, moški spol.", 2],
    ["¿A Marta? ___ escribo mañana.", "Le", ["La", "Lo", "Se"], "Escribir a alguien → le.", 3],
    ["¿El regalo a Pedro? ___ lo doy mañana.", "Se", ["Le", "Lo", "Les"], "Le/les pred lo/la → se (se lo doy).", 4, "visja"],
    ["¿Las flores a tu madre? Ya se ___ he dado.", "las", ["les", "la", "los"], "Se + las (neposredni predmet, ženski spol množine).", 4, "visja"],
    ["Dáme___ ! (el libro, meni)", "lo", ["le", "la", "se"], "Velelnik: zaimki se pripnejo (dámelo).", 4, "visja"],
    ["No ___ lo digas a nadie. (njemu)", "se", ["le", "lo", "les"], "Nikalni velelnik: zaimki pred glagolom (no se lo digas).", 4, "visja"],
    ["Voy a comprar___ . (la camisa)", "la", ["le", "lo", "se"], "Pri nedoločniku se zaimek pripne.", 3],
    ["¿Vienes con ___? (jaz)", "conmigo", ["con mí", "con yo", "migo"], "Con + mí = conmigo.", 3],
    ["Este regalo es para ___. (ti)", "ti", ["tú", "te", "contigo"], "Po predlogu: ti.", 2],
    ["A ___ me gusta el cine. (jaz)", "mí", ["mi", "yo", "me"], "Poudarek: a mí (z naglasom).", 3],
    ["La chica ___ habla es mi hermana.", "que", ["quien", "cual", "cuyo"], "Que: najpogostejši oziralni zaimek.", 2],
    ["El chico con ___ salgo es simpático.", "quien", ["que", "cual", "cuyo"], "Po predlogu za osebo: quien (tudi el que).", 4, "visja"],
    ["El hombre ___ coche es rojo vive aquí.", "cuyo", ["cuya", "que", "quien"], "Cuyo se ujema s posedovanim (coche).", 4, "visja"],
    ["Es ___ casa, no la tuya. (moja)", "mi", ["mía", "la mía", "mío"], "Svojilni pridevnik pred samostalnikom: mi.", 1],
    ["Esta casa es ___. (moja)", "mía", ["mi", "mío", "la mi"], "Za glagolom: mía.", 2],
    ["Yo ___ ducho por la mañana.", "me", ["se", "te", "mi"], "Povratni glagol: me ducho.", 1],
    ["Ellos ___ levantan temprano.", "se", ["les", "los", "nos"], "Povratni glagol: se levantan.", 1],
    ["A mis padres ___ encanta viajar.", "les", ["los", "le", "se"], "Glagoli kot gustar: posredni predmet (les).", 3],
  ]);
  pomeni(serija, "pomen", [["alguien", "nekdo"], ["nadie", "nihče"], ["nada", "nič"], ["algo", "nekaj"], ["cada uno", "vsak"], ["todos", "vsi"], ["algunos", "nekateri"], ["este", "ta (tukaj)"], ["aquel", "tisti (tam)"]], { tez: 1, n: 10 });
}
