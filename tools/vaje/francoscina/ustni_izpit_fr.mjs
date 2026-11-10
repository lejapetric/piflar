import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const FUN = [
  ["Je suis d'accord avec toi.", "strinjanje"], ["Je ne suis pas du tout d'accord.", "nestrinjanje"], ["À mon avis, …", "izražanje mnenja"], ["Pourriez-vous répéter, s'il vous plaît ?", "prošnja za ponovitev"],
  ["Je suis désolé(e).", "opravičilo"], ["Tu devrais te reposer.", "nasvet"], ["Et si on allait au cinéma ?", "predlog"], ["Félicitations !", "čestitka"],
  ["Ça m'est égal.", "brezbrižnost"], ["Je préfère le thé au café.", "izražanje preference"], ["Qu'est-ce que tu en penses ?", "spraševanje po mnenju"], ["Excusez-moi de vous déranger …", "vljuden začetek pogovora"],
  ["Ça ne me plaît pas du tout.", "izražanje nezadovoljstva"], ["Volontiers !", "sprejem povabila"], ["C'est dommage !", "obžalovanje"], ["Comment dit-on … en français ?", "spraševanje po besedi"],
  ["Je n'en suis pas sûr(e).", "dvom"], ["Bonne chance !", "voščilo"],
];
const F = [...new Set(FUN.map(([, f]) => f))];

export default function ({ serija }) {
  serija("funkcije", 18, (r, i) => {
    const [iz, f] = FUN[i];
    return izbira({ r, tezavnost: 2, besedilo: `Katero sporazumevalno funkcijo izraža <em>${iz}</em>?`, pravilna: f, napacne: r.premesaj(F.filter((x) => x !== f)).slice(0, 3), postopek: `<p><em>${iz}</em> → ${f}.</p>` });
  });
  vrzeli(serija, "pogovor", [
    ["Je ___ appelle Ana et j'ai dix-huit ans.", "m'", ["me", "se", "moi"], "S'appeler: je m'appelle.", 1],
    ["J'habite ___ Slovénie, à Maribor.", "en", ["au", "à", "dans"], "Ženske države: en.", 1],
    ["Pendant mon temps libre, je fais ___ sport.", "du", ["de", "le", "au"], "Faire du sport.", 2],
    ["Je joue ___ guitare depuis cinq ans.", "de la", ["à la", "la", "du"], "Jouer de + glasbilo.", 2],
    ["J'apprends le français ___ six ans.", "depuis", ["pendant", "il y a", "dans"], "Depuis = že (dejanje še traja).", 3],
    ["Après le bac, je voudrais ___ la médecine.", "étudier", ["étudie", "étudié", "étudiant"], "Je voudrais + nedoločnik.", 2],
    ["Si j'avais plus de temps, je ___ plus.", "voyagerais", ["voyagerai", "voyage", "voyageais"], "Si + imparfait → conditionnel.", 4, "visja"],
    ["Sur cette image, on ___ deux personnes.", "voit", ["voie", "voyons", "vu"], "On voit = vidimo.", 2],
    ["Au premier ___, il y a un chien.", "plan", ["place", "fond", "côté"], "Au premier plan = v ospredju.", 3],
    ["À l'arrière-___, on voit des montagnes.", "plan", ["fond", "côté", "place"], "À l'arrière-plan = v ozadju.", 4, "visja"],
    ["Il ___ que ce soit l'hiver.", "semble", ["semblent", "paraître", "voit"], "Il semble que + subjonctif = zdi se.", 4, "visja"],
    ["Je n'ai pas ___ compris la question.", "bien", ["bon", "mieux", "beau"], "Bien je prislov.", 2],
    ["Ce qui me plaît ___ dans ce métier, c'est le contact.", "le plus", ["plus", "la plus", "beaucoup"], "Presežnik prislova: le plus.", 3],
    ["J'ai ___ l'impression que …", "eu", ["été", "avoir", "eue"], "Avoir l'impression (passé composé: j'ai eu).", 3],
    ["___ ce que je sais, c'est un problème global.", "D'après", ["Après", "Depuis", "Pendant"], "D'après = po (tem, kar).", 4, "visja"],
    ["Je vais vous parler ___ problème de la pollution.", "du", ["de", "le", "au"], "Parler de + le = du.", 2],
    ["Pour ___, je dirais que c'est important.", "résumer", ["résume", "résumé", "résumant"], "Pour + nedoločnik.", 3],
    ["Je suis ___ de mon pays.", "fier", ["fière", "fierté", "fiers"], "Être fier de (moški spol, ednina).", 3],
  ]);
  pomeni(serija, "izrazi", [["avoir besoin de", "potrebovati"], ["avoir envie de", "imeti voljo"], ["faire la queue", "čakati v vrsti"], ["prendre une décision", "sprejeti odločitev"], ["se débrouiller", "znajti se"], ["avoir le trac", "imeti tremo"], ["poser une question", "postaviti vprašanje"], ["tenir compte de", "upoštevati"]], { tez: 2, n: 12 });
}
