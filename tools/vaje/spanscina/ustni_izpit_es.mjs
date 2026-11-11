import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const FUN = [["Estoy de acuerdo contigo.", "strinjanje"], ["No estoy nada de acuerdo.", "nestrinjanje"], ["En mi opinión, …", "izražanje mnenja"], ["¿Puede repetir, por favor?", "prošnja za ponovitev"], ["Lo siento mucho.", "opravičilo"], ["Deberías descansar.", "nasvet"], ["¿Por qué no vamos al cine?", "predlog"], ["¡Enhorabuena!", "čestitka"], ["Me da igual.", "brezbrižnost"], ["Prefiero el té al café.", "izražanje preference"], ["¿Qué te parece?", "spraševanje po mnenju"], ["Perdone que le moleste …", "vljuden začetek pogovora"], ["No me gusta nada.", "izražanje nezadovoljstva"], ["¡Con mucho gusto!", "sprejem povabila"], ["¡Qué pena!", "obžalovanje"], ["¿Cómo se dice … en español?", "spraševanje po besedi"], ["No estoy seguro.", "dvom"], ["¡Mucha suerte!", "voščilo"]];
const F = [...new Set(FUN.map(([, f]) => f))];

export default function ({ serija }) {
  serija("funkcije", 18, (r, i) => {
    const [iz, f] = FUN[i];
    return izbira({ r, tezavnost: 2, besedilo: `Katero sporazumevalno funkcijo izraža <em>${iz}</em>?`, pravilna: f, napacne: r.premesaj(F.filter((x) => x !== f)).slice(0, 3), postopek: `<p><em>${iz}</em> → ${f}.</p>` });
  });
  vrzeli(serija, "pogovor", [
    ["___ llamo Ana y tengo dieciocho años.", "Me", ["Se", "Mi", "Yo"], "Llamarse: me llamo.", 1],
    ["Vivo ___ Eslovenia, en Celje.", "en", ["a", "de", "por"], "Kraj bivanja: en.", 1],
    ["En mi tiempo libre ___ deporte.", "hago", ["juego", "practico a", "tengo"], "Hacer deporte.", 2],
    ["Toco la guitarra ___ hace cinco años.", "desde", ["por", "hace", "durante"], "Desde hace = že (trajanje do zdaj).", 3],
    ["Después del bachillerato me gustaría ___ medicina.", "estudiar", ["estudio", "estudiado", "estudiando"], "Me gustaría + nedoločnik.", 2],
    ["Si tuviera más tiempo, ___ más.", "viajaría", ["viajaré", "viajo", "viajaba"], "Si + imperfecto de subjuntivo → condicional.", 4, "visja"],
    ["En la foto ___ dos personas.", "hay", ["están", "son", "tienen"], "Hay = je/so (obstoj).", 2],
    ["En primer ___ hay un perro.", "plano", ["lugar", "fondo", "sitio"], "En primer plano = v ospredju.", 3],
    ["Al ___ se ven unas montañas.", "fondo", ["plano", "lado", "detrás"], "Al fondo = v ozadju.", 3],
    ["Parece que ___ invierno.", "es", ["sea", "fuera", "será"], "Parece que (trdilno) + indicativo.", 4, "visja"],
    ["No me parece que ___ verano.", "sea", ["es", "será", "era"], "No parece que + subjuntivo.", 4, "visja"],
    ["Voy a hablar ___ problema de la contaminación.", "del", ["de", "el", "al"], "De + el = del.", 2],
  ]);
  pomeni(serija, "izrazi", [["tener que", "morati"], ["tener ganas de", "imeti voljo"], ["hacer cola", "čakati v vrsti"], ["tomar una decisión", "sprejeti odločitev"], ["arreglárselas", "znajti se"], ["tener miedo", "bati se"], ["hacer una pregunta", "postaviti vprašanje"], ["tener en cuenta", "upoštevati"]], { tez: 2, n: 12 });
}
