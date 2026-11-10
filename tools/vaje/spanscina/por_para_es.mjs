import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "por-para", [
    ["Este regalo es ___ ti.", "para", ["por", "a", "de"], "Para: prejemnik.", 1],
    ["Gracias ___ tu ayuda.", "por", ["para", "de", "a"], "Gracias por: vzrok.", 1],
    ["Estudio ___ aprobar el examen.", "para", ["por", "a", "de"], "Para + nedoločnik: namen.", 2],
    ["Paseamos ___ el parque.", "por", ["para", "en", "a"], "Por: gibanje skozi prostor.", 2],
    ["Salimos ___ Madrid mañana.", "para", ["por", "en", "de"], "Para: smer, cilj.", 3],
    ["Te llamo ___ teléfono.", "por", ["para", "con", "en"], "Por: sredstvo.", 2],
    ["Trabajo ___ la mañana.", "por", ["para", "en", "a"], "Por la mañana = zjutraj.", 1],
    ["Necesito el informe ___ el lunes.", "para", ["por", "a", "hasta"], "Para: rok.", 3],
    ["Compré el libro ___ diez euros.", "por", ["para", "de", "con"], "Por: cena, menjava.", 3],
    ["___ mí, es la mejor película.", "Para", ["Por", "A", "De"], "Para mí = po mojem mnenju.", 3],
    ["El Quijote fue escrito ___ Cervantes.", "por", ["para", "de", "con"], "Trpnik: vršilec s por.", 3],
    ["No salí ___ la lluvia.", "por", ["para", "de", "con"], "Por: vzrok.", 3],
    ["Lo hago ___ ti, porque me lo pediste.", "por", ["para", "a", "de"], "Por: zaradi koga, v korist koga.", 4, "visja"],
    ["___ ser extranjero, habla muy bien.", "Para", ["Por", "A", "De"], "Para: primerjava s pričakovanim.", 4, "visja"],
    ["Voy ___ pan. (grem po kruh)", "por", ["para", "a", "de"], "Ir por = iti po nekaj.", 4, "visja"],
    ["Estoy ___ salir. (ravno grem)", "para", ["por", "a", "de"], "Estar para + nedoločnik = biti tik pred.", 4, "visja"],
    ["Quedan muchas cosas ___ hacer.", "por", ["para", "a", "de"], "Por hacer = še nenarejeno.", 4, "visja"],
    ["Vamos al cine dos veces ___ semana.", "por", ["para", "en", "de"], "Por: pogostost (na).", 2],
    ["Viajamos a Lima ___ avión.", "en", ["por", "para", "con"], "Prevozna sredstva: en avión.", 3],
    ["Me quedo en Valencia ___ dos semanas.", "por", ["para", "en", "de"], "Por: trajanje (pogosto se izpusti).", 4, "visja"],
    ["¿___ qué estudias español? – Porque me gusta.", "Por", ["Para", "De", "A"], "¿Por qué? = zakaj (vzrok).", 2],
    ["¿___ qué sirve esto? – Para abrir latas.", "Para", ["Por", "De", "A"], "¿Para qué? = čemu (namen).", 3],
    ["Pasaré ___ tu casa a las seis.", "por", ["para", "a", "en"], "Pasar por = oglasiti se pri.", 3],
    ["Este tren va ___ Barcelona, sin paradas.", "para", ["por", "de", "en"], "Smer: para.", 3],
    ["Cambié mi bici ___ una guitarra.", "por", ["para", "a", "con"], "Menjava: por.", 3],
    ["Estudia mucho ___ ser médico.", "para", ["por", "a", "de"], "Namen: para.", 2],
  ]);
}
