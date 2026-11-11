import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const REG = [["¡Hola, Pablo!", "neformalno"], ["Estimada señora:", "formalno"], ["¡Un beso!", "neformalno"], ["Atentamente,", "formalno"], ["¡Hasta pronto!", "neformalno"], ["Me dirijo a usted para …", "formalno"], ["Un abrazo", "neformalno"], ["A la espera de su respuesta …", "formalno"], ["¿Qué tal todo?", "neformalno"], ["Le adjunto …", "formalno"], ["¿Te apetece venir?", "neformalno"], ["Le agradecería que …", "formalno"], ["Besos", "neformalno"], ["Un cordial saludo", "formalno"], ["¡No te preocupes!", "neformalno"], ["Muy señor mío:", "formalno"]];

export default function ({ serija, pojmi }) {
  serija("register", 16, (r, i) => {
    const [f, odg] = REG[i];
    return izbira({ r, tezavnost: 1, besedilo: `Ali je izraz <em>${f}</em> primeren za formalno ali neformalno pismo?`, pravilna: odg, napacne: ["formalno", "neformalno"].filter((x) => x !== odg), postopek: `<p>${odg === "formalno" ? "Uradni slog: vikanje (usted), ustaljene vljudnostne formule." : "Osebni slog: tikanje, pogovorni izrazi."}</p>` });
  });
  vrzeli(serija, "fraze", [
    ["Le ___ su carta del 3 de mayo.", "agradezco", ["agradeces", "gracias", "agradecer"], "Le agradezco = zahvaljujem se Vam.", 2],
    ["Le escribo en ___ con su anuncio.", "relación", ["respecto", "cuanto", "base"], "En relación con = v zvezi z.", 3],
    ["Me ___ inscribirme en el curso.", "gustaría", ["gusta", "gustó", "gustará"], "Pogojnik je vljuden.", 2],
    ["¿Podría ___ más información?", "enviarme", ["me enviar", "envíame", "enviarlo"], "Zaimek se pripne nedoločniku.", 3],
    ["Siento no ___ ir a tu fiesta.", "poder", ["puedo", "pueda", "podido"], "Sentir + nedoločnik.", 3],
    ["Gracias ___ la invitación.", "por", ["para", "de", "a"], "Gracias por.", 1],
    ["Tengo muchas ganas ___ verte.", "de", ["a", "para", "por"], "Tener ganas de.", 3],
    ["Le agradecería que me ___ cuanto antes.", "contestara", ["contesta", "contestará", "contestaría"], "Agradecería que + imperfecto de subjuntivo.", 4, "visja"],
    ["Por un ___ …, por otro … (po eni strani)", "lado", ["parte", "punto", "momento"], "Por un lado … por otro.", 3],
    ["En mi ___, la televisión es útil.", "opinión", ["parecer", "idea", "pienso"], "En mi opinión = po mojem mnenju.", 2],
    ["Es verdad que …, ___ también hay que decir que …", "pero", ["porque", "por eso", "es decir"], "Popuščanje in nasprotje.", 2],
    ["En ___, creo que …", "conclusión", ["final", "fin de", "resumen de"], "En conclusión = za zaključek.", 2],
    ["Aunque ___ difícil, lo conseguí.", "era", ["sea", "es", "será"], "Aunque + dejstvo v preteklosti → indicativo.", 4, "visja"],
    ["Le escribo para ___ del servicio.", "quejarme", ["quejar", "quejándome", "quejado"], "Quejarse de = pritožiti se.", 4, "visja"],
  ]);
  pomeni(serija, "povezave", [["en primer lugar", "najprej"], ["además", "poleg tega"], ["por consiguiente", "posledično"], ["de hecho", "pravzaprav"], ["no obstante", "kljub temu"], ["por ejemplo", "na primer"], ["para terminar", "za konec"], ["por otra parte", "po drugi strani"]], { tez: 2, n: 12 });
  pojmi([
    ["formalno pismo", "Uradno pismo z vikanjem (usted) in ustaljenimi formulami (Estimado/a …, Atentamente)."],
    ["neformalno pismo", "Osebno pismo prijatelju s tikanjem in pogovornimi izrazi (¡Hola!, Un abrazo)."],
    ["nagovor", "Uvodni pozdrav naslovniku; v španščini v formalnem pismu sledi dvopičje (Estimada señora:)."],
    ["zaključna formula", "Ustaljen pozdrav na koncu pisma, npr. Un cordial saludo."],
    ["obrnjena vprašaj in klicaj", "V španščini vprašalno in vzklično poved začnemo z ¿ oz. ¡."],
    ["vezniki", "Besede, ki povezujejo misli: en primer lugar, además, sin embargo, por lo tanto."],
    ["argumentativni spis", "Besedilo, v katerem zagovarjamo stališče z argumenti in primeri."],
    ["register", "Raven jezika glede na okoliščine: knjižni, pogovorni, uradni."],
  ]);
}
