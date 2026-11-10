import { izbira, besedilo } from "../lib.mjs";
import { spregatev, vrzeli } from "../jezik-lib.mjs";
import { O, INDEFINIDO, IMPERFECTO, PARTICIPIO } from "../es-glagoli.mjs";

export default function ({ serija }) {
  spregatev(serija, "indefinido", { glagoli: INDEFINIDO, osebe: O, cas: "pretérito indefinido", tez: 3, n: 20 });
  spregatev(serija, "imperfecto", { glagoli: IMPERFECTO, osebe: O, cas: "pretérito imperfecto", n: 12 });
  serija("participio", 10, (r, i) => {
    const [inf, p, sl] = PARTICIPIO[i];
    const nepr = !/(ado|ido)$/.test(p);
    return besedilo({ tezavnost: nepr ? 3 : 2, sprejemljivi: [p], besedilo: `Zapiši participio glagola <em>${inf}</em> (${sl}) za pretérito perfecto (he …).`, rezultat: `he ${p}`, postopek: `<p>${inf} → ${p}${nepr ? " (nepravilni deležnik)" : ""}</p>` });
  });
  vrzeli(serija, "raba", [
    ["Ayer ___ (yo, comer) paella.", "comí", ["comía", "he comido", "como"], "Zaključeno dejanje v končanem času (ayer): indefinido.", 2],
    ["Esta mañana ___ (yo, desayunar) tarde.", "he desayunado", ["desayuné", "desayunaba", "desayuno"], "Čas, ki še traja (esta mañana): pretérito perfecto (v Španiji).", 3],
    ["Cuando era niño, ___ (vivir) en Sevilla.", "vivía", ["viví", "he vivido", "vivo"], "Opis in navade v preteklosti: imperfecto.", 3],
    ["Mientras ___ (yo, leer), sonó el teléfono.", "leía", ["leí", "he leído", "leo"], "Trajajoče ozadje: imperfecto; prekinitev: indefinido.", 4, "visja"],
    ["En 1492 Colón ___ (llegar) a América.", "llegó", ["llegaba", "ha llegado", "llega"], "Zgodovinski dogodek: indefinido.", 2],
    ["¿Alguna vez ___ (tú, estar) en México?", "has estado", ["estuviste", "estabas", "estás"], "Izkušnja (alguna vez): pretérito perfecto.", 3],
    ["Cuando llegué, la película ya ___ (empezar).", "había empezado", ["empezó", "empezaba", "ha empezado"], "Predpreteklost: pluscuamperfecto.", 4, "visja"],
    ["Antes ___ (nosotros, ir) a la playa cada verano.", "íbamos", ["fuimos", "hemos ido", "vamos"], "Navada: imperfecto.", 3],
    ["El año pasado ___ (ellos, hacer) un viaje a Perú.", "hicieron", ["hacían", "han hecho", "hacieron"], "Hacer v indefinido: hicieron.", 3],
    ["Hacía sol y los niños ___ (jugar) en el parque.", "jugaban", ["jugaron", "han jugado", "juegan"], "Opis prizora: imperfecto.", 3],
    ["De repente ___ (empezar) a llover.", "empezó", ["empezaba", "ha empezado", "empieza"], "Nenaden dogodek: indefinido.", 3],
    ["Nunca ___ (yo, ver) una película tan mala.", "he visto", ["vi", "veía", "veo"], "Izkušnja do zdaj: pretérito perfecto.", 3],
    ["Me dijo que ya ___ (comer).", "había comido", ["comió", "ha comido", "comía"], "Poročani govor: pluscuamperfecto.", 4, "visja"],
    ["¿Dónde ___ (tú, poner) las llaves? No las encuentro.", "has puesto", ["pusiste", "ponías", "pones"], "Posledica v sedanjosti: pretérito perfecto.", 4, "visja"],
  ]);
}
