import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";
import { PARTICIPIO } from "../it-glagoli.mjs";

export default function ({ serija }) {
  serija("participio", 30, (r, i) => {
    const [inf, p, pom, sl] = r.izberi(PARTICIPIO);
    if (i % 2) return besedilo({ tezavnost: p.endsWith("ato") || p.endsWith("ito") || p.endsWith("uto") ? 2 : 3, sprejemljivi: [p], besedilo: `Zapiši participio passato glagola <em>${inf}</em> (${sl}).`, rezultat: p, postopek: `<p>${inf} → ${p} (pomožni glagol ${pom}).</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `S katerim pomožnim glagolom tvori passato prossimo glagol <em>${inf}</em> (${sl})?`, pravilna: pom, napacne: [pom === "essere" ? "avere" : "essere"], postopek: `<p>${inf}: ${pom}. Z essere tvorijo passato prossimo glagoli premikanja in spremembe stanja (andare, venire, nascere …) ter povratni glagoli; deležnik se ujema z osebkom.</p>` });
  });
  vrzeli(serija, "raba", [
    ["Ieri ___ (io, mangiare) una pizza.", "ho mangiato", ["sono mangiato", "mangiavo", "ho mangiare"], "Avere + deležnik.", 2],
    ["Maria ___ (andare) a Roma.", "è andata", ["ha andato", "è andato", "ha andata"], "Essere + ujemanje z osebkom (ženski spol).", 3],
    ["Noi ___ (finire) i compiti.", "abbiamo finito", ["siamo finiti", "abbiamo finiti", "abbiamo finire"], "Avere + finito.", 2],
    ["I ragazzi ___ (partire) alle otto.", "sono partiti", ["hanno partito", "sono partito", "hanno partiti"], "Essere + množina moškega spola.", 3],
    ["Hai ___ (vedere) il film?", "visto", ["veduto", "vedato", "visso"], "Vedere → visto.", 2],
    ["Le mie amiche ___ (arrivare) tardi.", "sono arrivate", ["hanno arrivato", "sono arrivati", "sono arrivata"], "Ženski spol množine: -e.", 4, "visja"],
    ["Stamattina mi ___ (alzarsi) presto. (ženska)", "sono alzata", ["ho alzata", "sono alzato", "ho alzato"], "Povratni glagoli z essere.", 4, "visja"],
    ["Le lettere? Le ho ___ (scrivere) ieri.", "scritte", ["scritto", "scritti", "scritta"], "Pred zaimkom lo/la/li/le se deležnik ujema.", 4, "visja"],
    ["Dante ___ (nascere) a Firenze.", "è nato", ["ha nato", "è nata", "ha nasciuto"], "Nascere z essere.", 3],
    ["Che cosa ___ (voi, fare) ieri sera?", "avete fatto", ["siete fatti", "avete fato", "avete fare"], "Fare → fatto.", 2],
    ["Il film ___ (piacere) molto a tutti.", "è piaciuto", ["ha piaciuto", "è piacuto", "ha piaciato"], "Piacere z essere.", 4, "visja"],
    ["Quanto ___ (tu, spendere)?", "hai speso", ["hai spenduto", "sei speso", "hai spendito"], "Spendere → speso.", 3],
    ["Mentre ___ (io, leggere), è suonato il telefono.", "leggevo", ["ho letto", "leggo", "lessi"], "Trajajoče ozadje v preteklosti: imperfetto.", 4, "visja"],
    ["Da bambino ___ (io, giocare) sempre a calcio.", "giocavo", ["ho giocato", "gioco", "giocai"], "Navada v preteklosti: imperfetto.", 3],
  ]);
}
