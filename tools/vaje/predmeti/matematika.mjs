// Matematika: vsaka snov ima svojo datoteko v tools/vaje/matematika/<slug>.mjs.
// Številske naloge so sestavljene iz predlog z naključnimi (a ponovljivimi) podatki,
// rezultat in postopek izračuna program, zato se ujemata z besedilom.
// Ročno napisane dodatne naloge so v tools/vaje/matematika-dodatne/<slug>.mjs.
import { izMape } from "../mapa.mjs";
export default (z) => izMape("matematika", z);
