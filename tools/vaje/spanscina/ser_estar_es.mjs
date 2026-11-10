import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "ser-estar", [
    ["Madrid ___ la capital de España.", "es", ["está", "hay", "son"], "Ser: istovetnost, definicija.", 1],
    ["Madrid ___ en el centro de España.", "está", ["es", "hay", "son"], "Estar: lega, položaj.", 1],
    ["Mi hermana ___ médica.", "es", ["está", "hay", "tiene"], "Ser: poklic.", 1],
    ["Hoy ___ muy cansado.", "estoy", ["soy", "tengo", "hay"], "Estar: začasno stanje.", 1],
    ["Nosotros ___ de Eslovenia.", "somos", ["estamos", "hay", "tenemos"], "Ser de: izvor.", 1],
    ["La mesa ___ de madera.", "es", ["está", "hay", "tiene"], "Ser de: snov.", 2],
    ["La sopa ___ fría.", "está", ["es", "hay", "tiene"], "Estar: trenutno stanje.", 2],
    ["El hielo ___ frío.", "es", ["está", "hay", "tiene"], "Ser: bistvena lastnost.", 3],
    ["___ las cinco de la tarde.", "Son", ["Están", "Es", "Hay"], "Ura: ser (son las …).", 2],
    ["___ la una.", "Es", ["Son", "Está", "Hay"], "Ura ena: es la una.", 3],
    ["Hoy ___ lunes.", "es", ["está", "hay", "son"], "Dan: ser.", 2],
    ["En la mesa ___ un libro.", "hay", ["está", "es", "son"], "Hay: obstoj nedoločenega predmeta.", 2],
    ["El libro ___ en la mesa.", "está", ["hay", "es", "son"], "Estar: lega določenega predmeta.", 2],
    ["La fiesta ___ en mi casa.", "es", ["está", "hay", "tiene"], "Ser: kraj dogodka.", 4, "visja"],
    ["Mi abuelo ya ___ muerto.", "está", ["es", "ha", "hay"], "Estar muerto (rezultat).", 4, "visja"],
    ["Juan ___ muy listo, saca buenas notas.", "es", ["está", "hay", "tiene"], "Ser listo = biti pameten.", 4, "visja"],
    ["¿___ listos? Nos vamos.", "Estáis", ["Sois", "Hay", "Tenéis"], "Estar listo = biti pripravljen.", 4, "visja"],
    ["Esta manzana ___ verde, no la comas.", "está", ["es", "hay", "tiene"], "Estar verde = nezrel.", 4, "visja"],
    ["Mi coche ___ verde.", "es", ["está", "hay", "tiene"], "Ser verde = zelene barve.", 3],
    ["Ana ___ aburrida en clase.", "está", ["es", "hay", "tiene"], "Estar aburrido = dolgočasiti se.", 3],
    ["Esta película ___ aburrida.", "es", ["está", "hay", "tiene"], "Ser aburrido = biti dolgočasen.", 3],
    ["El museo ___ cerrado los lunes.", "está", ["es", "hay", "tiene"], "Estar + deležnik: stanje.", 3],
    ["La casa ___ construida en 1900.", "fue", ["estuvo", "hubo", "era"], "Trpnik dejanja: ser + deležnik.", 4, "visja"],
    ["Estamos ___ en la biblioteca. (estudiar)", "estudiando", ["estudiado", "estudiar", "estudiamos"], "Estar + gerundij.", 2],
    ["Mi padre ___ alto y moreno.", "es", ["está", "tiene", "hay"], "Ser: opis videza.", 1],
    ["¡Qué guapa ___ hoy!", "estás", ["eres", "hay", "tienes"], "Estar: vtis v danem trenutku.", 4, "visja"],
  ]);
}
