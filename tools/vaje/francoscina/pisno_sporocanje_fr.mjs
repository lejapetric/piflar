import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const REG = [
  ["Salut Marc !", "neformalno"], ["Madame, Monsieur,", "formalno"], ["Bisous !", "neformalno"], ["Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.", "formalno"],
  ["À plus !", "neformalno"], ["Je me permets de vous contacter …", "formalno"], ["Grosses bises", "neformalno"], ["Dans l'attente de votre réponse …", "formalno"],
  ["Coucou !", "neformalno"], ["Veuillez trouver ci-joint …", "formalno"], ["Ça te dit de venir ?", "neformalno"], ["Je vous serais reconnaissant(e) de …", "formalno"],
  ["Je t'embrasse.", "neformalno"], ["Cordialement,", "formalno"], ["T'inquiète !", "neformalno"], ["Monsieur le Directeur,", "formalno"],
];

export default function ({ serija, pojmi }) {
  serija("register", 16, (r, i) => {
    const [f, odg] = REG[i];
    return izbira({ r, tezavnost: 1, besedilo: `Ali je izraz <em>${f}</em> primeren za formalno ali neformalno pismo?`, pravilna: odg, napacne: ["formalno", "neformalno"].filter((x) => x !== odg), postopek: `<p>${odg === "formalno" ? "Uradni slog: vikanje, ustaljene vljudnostne formule." : "Osebni slog: tikanje, pogovorni izrazi."}</p>` });
  });
  vrzeli(serija, "fraze", [
    ["Je vous ___ pour votre lettre du 3 mai.", "remercie", ["remercies", "merci", "remercier"], "Je vous remercie = zahvaljujem se vam.", 2],
    ["Je vous écris ___ sujet de votre annonce.", "au", ["à", "du", "sur"], "Au sujet de = v zvezi z.", 2],
    ["Je ___ m'inscrire au cours de français.", "voudrais", ["veux", "voulais", "voudrai"], "Pogojnik (je voudrais) je vljuden.", 2],
    ["Pourriez-___ m'envoyer des informations ?", "vous", ["tu", "nous", "lui"], "Formalno: vikanje.", 1],
    ["Je vous prie d'___ mes salutations distinguées.", "agréer", ["agréez", "agrée", "accepter"], "Ustaljena formula: je vous prie d'agréer …", 3],
    ["Je suis désolé ___ ne pas pouvoir venir.", "de", ["à", "pour", "que"], "Être désolé de + nedoločnik.", 3],
    ["Merci ___ ton invitation !", "pour", ["à", "de la", "par"], "Merci pour + samostalnik.", 2],
    ["J'ai hâte ___ te revoir.", "de", ["à", "pour", "que"], "Avoir hâte de = komaj čakati.", 3],
    ["Je vous serais reconnaissant de bien vouloir me ___ .", "répondre", ["répondez", "réponds", "répondu"], "Bien vouloir + nedoločnik.", 4, "visja"],
    ["___ part, je pense que … (po eni strani)", "D'une", ["D'un", "De la", "Une"], "D'une part … d'autre part.", 3],
    ["À mon ___, la télé est utile.", "avis", ["opinion", "pensée", "idée"], "À mon avis = po mojem mnenju.", 2],
    ["Il est vrai que …, ___ il faut aussi dire que …", "mais", ["donc", "car", "parce que"], "Popuščanje in nasprotje: il est vrai que … mais …", 2],
    ["___ conclusion, je dirais que …", "En", ["Dans", "À", "Pour"], "En conclusion = za zaključek.", 2],
    ["Bien que ce ___ difficile, j'ai réussi.", "soit", ["est", "était", "sera"], "Bien que + subjonctif.", 4, "visja"],
    ["Je vous écris pour me ___ du service.", "plaindre", ["plains", "plaint", "plaignez"], "Se plaindre de = pritožiti se.", 4, "visja"],
    ["Je tiens à ___ que ce problème est grave.", "souligner", ["souligne", "souligné", "soulignant"], "Tenir à + nedoločnik = želeti poudariti.", 4, "visja"],
    ["N'___ pas à me contacter.", "hésitez", ["hésiter", "hésites", "hésité"], "Velelnik, formalno: n'hésitez pas.", 3],
    ["Il me ___ un peu plus d'informations.", "faudrait", ["faut", "faudra", "fallait"], "Il me faudrait (pogojnik) = potreboval bi.", 4, "visja"],
  ]);
  pomeni(serija, "povezave", [["tout d'abord", "najprej"], ["de plus", "poleg tega"], ["par conséquent", "posledično"], ["en effet", "namreč"], ["néanmoins", "kljub temu"], ["par exemple", "na primer"], ["pour conclure", "za konec"], ["en outre", "poleg tega (knjižno)"]], { tez: 2, n: 10 });
  pojmi([
    ["formalno pismo", "Uradno pismo z vikanjem in ustaljenimi formulami (Madame, Monsieur … salutations distinguées)."],
    ["neformalno pismo", "Osebno pismo prijatelju s tikanjem in pogovornimi izrazi (Salut, Bisous)."],
    ["nagovor", "Uvodni pozdrav naslovniku, npr. Cher Paul, ali Madame,."],
    ["zaključna formula", "Ustaljen pozdrav na koncu pisma, npr. Cordialement."],
    ["vezniki", "Besede, ki povezujejo misli: d'abord, ensuite, cependant, donc."],
    ["argumentativni spis", "Besedilo, v katerem zagovarjamo stališče z argumenti in primeri."],
    ["odstavek", "Vsebinsko zaokrožen del besedila z eno glavno mislijo."],
    ["register", "Raven jezika glede na okoliščine: knjižni, pogovorni, uradni."],
  ]);
}
