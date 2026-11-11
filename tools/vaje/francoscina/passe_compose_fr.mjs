import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";
import { PART } from "../fr-glagoli.mjs";

export default function ({ serija }) {
  serija("participe", 24, (r, i) => {
    const [inf, p, pom] = r.izberi(PART);
    if (i % 2) return besedilo({ tezavnost: 3, sprejemljivi: [p], besedilo: `Zapiši participe passé glagola <em>${inf}</em>.`, rezultat: p, postopek: `<p>${inf} → ${p} (pomožni glagol ${pom}).</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `S katerim pomožnim glagolom tvori passé composé glagol <em>${inf}</em>?`, pravilna: pom, napacne: [pom === "être" ? "avoir" : "être"], postopek: `<p>${inf}: ${pom}. Z être tvorijo passé composé glagoli premikanja (aller, venir, partir …) in povratni glagoli.</p>` });
  });
  vrzeli(serija, "raba", [
    ["Hier, j'___ (manger) une pizza.", "ai mangé", ["suis mangé", "mangeais", "ai manger"], "Avoir + participe passé.", 2],
    ["Elle ___ (aller) à Paris.", "est allée", ["a allé", "est allé", "a allée"], "Être + ujemanje z osebkom (ženski spol: -e).", 3],
    ["Nous ___ (finir) nos devoirs.", "avons fini", ["sommes finis", "avons finis", "avons finir"], "Avoir + fini.", 2],
    ["Ils ___ (partir) à 8 heures.", "sont partis", ["ont parti", "sont parti", "ont partis"], "Être + ujemanje v množini.", 3],
    ["Tu ___ (voir) le film ?", "as vu", ["es vu", "as voir", "a vu"], "Voir → vu.", 2],
    ["Elles ___ (arriver) en retard.", "sont arrivées", ["ont arrivé", "sont arrivés", "sont arrivé"], "Ženski spol množine: -es.", 4, "visja"],
    ["Je ___ (se lever) tôt ce matin. (ženska)", "me suis levée", ["m'ai levée", "me suis levé", "ai levé"], "Povratni glagoli z être.", 4, "visja"],
    ["Les lettres que j'ai ___ (écrire) …", "écrites", ["écrit", "écrits", "écrite"], "Ujemanje s predhodnim premim predmetom (les lettres).", 4, "visja"],
    ["Il ___ (naître) en 2005.", "est né", ["a né", "est née", "a naît"], "Naître z être.", 3],
    ["Vous ___ (prendre) le bus ?", "avez pris", ["êtes pris", "avez prendu", "avez prit"], "Prendre → pris.", 2],
    ["Nous ___ (rester) à la maison.", "sommes restés", ["avons resté", "sommes resté", "avons restés"], "Rester z être.", 3],
    ["On ___ (faire) une promenade.", "a fait", ["est fait", "a faire", "a fais"], "Faire → fait.", 2],
    ["Elle ___ (lire) ce livre deux fois.", "a lu", ["est lue", "a lit", "a lis"], "Lire → lu.", 2],
  ]);
}
