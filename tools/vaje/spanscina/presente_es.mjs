import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, PRESENTE } from "../es-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "presente", { glagoli: PRESENTE, osebe: O, cas: "presente de indicativo", n: 36 });
  vrzeli(serija, "raba", [
    ["Yo ___ (llamarse) Ana.", "me llamo", ["se llamo", "llamo", "me llama"], "Povratni glagol: yo me llamo.", 2],
    ["Nosotros ___ (levantarse) a las siete.", "nos levantamos", ["se levantamos", "levantamos", "nos levantan"], "Povratni glagol: nos levantamos.", 3],
    ["Me ___ el chocolate.", "gusta", ["gustan", "gusto", "gustas"], "Me gusta + ednina.", 2],
    ["Me ___ los perros.", "gustan", ["gusta", "gusto", "gustamos"], "Me gustan + množina.", 3],
    ["¿Qué ___ (hacer) vosotros esta tarde?", "hacéis", ["hacen", "haces", "hacemos"], "Hacer: vosotros hacéis.", 2],
    ["Mis padres ___ (volver) a casa a las ocho.", "vuelven", ["volven", "vuelvan", "volvemos"], "Diftongizacija o → ue.", 3],
    ["Yo no ___ (conocer) a tu hermano.", "conozco", ["conoco", "conoce", "conozo"], "Conocer: yo conozco.", 3],
    ["Hace dos años que ___ (estudiar) español.", "estudio", ["estudié", "estudiaba", "he estudiado"], "Hace … que + presente = že (trajanje do zdaj).", 4, "visja"],
    ["¿Cuánto ___ (costar) este libro?", "cuesta", ["costa", "cuestan", "coste"], "Costar: o → ue.", 3],
    ["Ahora mismo ___ (yo, estar) comiendo.", "estoy", ["soy", "estó", "está"], "Estar + gerundij = dejanje v teku.", 2],
    ["Siempre ___ (tú, seguir) las reglas.", "sigues", ["segues", "sigas", "sigue"], "Seguir: e → i.", 4, "visja"],
    ["Mi hermano ___ (tener) quince años.", "tiene", ["tene", "tiena", "es"], "Starost: tener … años.", 1],
  ]);
}
