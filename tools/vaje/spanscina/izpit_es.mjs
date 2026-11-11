import { izpitShema, vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  izpitShema(serija, { t3A: 15, t3B: "20" });
  vrzeli(serija, "mesano", [
    ["Me interesa mucho ___ música.", "la", ["–", "de", "a"], "Pri glagolih kot interesar stoji določni člen.", 3],
    ["Pienso ___ ti.", "en", ["a", "de", "por"], "Pensar en alguien.", 2],
    ["¿Qué piensas ___ esta película?", "de", ["en", "a", "por"], "Pensar de = mnenje o.", 3],
    ["He decidido ___ estudiar más.", "–", ["de", "a", "por"], "Decidir + nedoločnik (brez predloga).", 4, "visja"],
    ["Empiezo ___ entender.", "a", ["de", "por", "–"], "Empezar a + nedoločnik.", 2],
    ["Tengo ___ hermano y dos hermanas.", "un", ["uno", "una", "unos"], "Pred moškim samostalnikom: un.", 1],
    ["Hoy hace más frío ___ ayer.", "que", ["de", "como", "a"], "Primerjava: más … que.", 2],
    ["Tengo más ___ cien libros.", "de", ["que", "como", "a"], "Pred števnikom: más de.", 4, "visja"],
    ["Madrid es la ciudad ___ grande de España.", "más", ["muy", "la más", "mejor"], "Presežnik: la ciudad más grande.", 3],
    ["No he visto a ___.", "nadie", ["alguien", "nada", "ninguno a"], "Dvojna nikalnica: no … nadie.", 3],
    ["No tengo ___ idea.", "ninguna", ["ningún", "nada", "alguna"], "Ninguna + samostalnik ženskega spola.", 3],
    ["Voy al instituto ___ autobús.", "en", ["con", "a", "por"], "Prevozna sredstva: en.", 2],
    ["Voy al instituto ___ pie.", "a", ["en", "con", "de"], "A pie = peš.", 2],
    ["Te presto el libro con tal de que me lo ___.", "devuelvas", ["devuelves", "devolverás", "devolvías"], "Con tal de que + subjuntivo.", 4, "visja"],
    ["Si lo ___ sabido, habría venido.", "hubiera", ["habría", "he", "había"], "Neresnični pogoj v preteklosti: si + pluscuamperfecto de subjuntivo.", 4, "visja"],
    ["Me dijo que ___ al día siguiente.", "vendría", ["vendrá", "viene", "viniera"], "Prihodnost v preteklosti: condicional.", 4, "visja"],
    ["El chico ___ te hablé está aquí.", "del que", ["que", "quien", "cual"], "Hablar de → del que (de quien).", 4, "visja"],
    ["Cuando era pequeño ___ (ir) mucho a la playa.", "iba", ["fui", "he ido", "voy"], "Navada v preteklosti: imperfecto.", 3],
    ["Ayer ___ (yo, ver) a Laura en el centro.", "vi", ["veía", "he visto", "veo"], "Enkratno dejanje v končanem času: indefinido.", 2],
  ]);
}
