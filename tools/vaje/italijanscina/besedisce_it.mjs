import { vrzeli, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  pomeni(serija, "osnovno", [["la spesa", "nakupovanje živil"], ["il negozio", "trgovina"], ["la camera", "soba"], ["il bagno", "kopalnica"], ["l'orario", "urnik"], ["la stazione", "postaja"], ["il biglietto", "vozovnica"], ["lo sconto", "popust"], ["il conto", "račun (v restavraciji)"], ["la ricetta", "recept"], ["il lavoro", "delo"], ["la salute", "zdravje"], ["il tempo libero", "prosti čas"], ["l'ambiente", "okolje"], ["la vacanza", "počitnice"]], { tez: 1, n: 26 });
  pomeni(serija, "laziprijatelji", [["la camera", "soba (ne kamera)"], ["il burro", "maslo (ne osel)"], ["la morbidezza", "mehkoba"], ["il caldo", "vročina"], ["la fattoria", "kmetija"], ["la firma", "podpis"], ["la libreria", "knjigarna"], ["il magazzino", "skladišče"], ["la parentela", "sorodstvo"], ["il palazzo", "stavba"], ["il convitto", "dijaški dom"], ["la tasca", "žep"]], { tez: 3, n: 20 });
  vrzeli(serija, "izrazi", [
    ["Ho ___ di un caffè.", "bisogno", ["voglia", "fame", "sete"], "Avere bisogno di = potrebovati.", 2],
    ["Ho ___ di andare al cinema.", "voglia", ["bisogno", "paura", "fame"], "Avere voglia di = imeti voljo.", 2],
    ["In bocca al ___! – Crepi!", "lupo", ["leone", "cane", "gatto"], "In bocca al lupo = srečno.", 3],
    ["Non vedo l'___ di vederti!", "ora", ["tempo", "attesa", "orario"], "Non vedo l'ora = komaj čakam.", 3],
    ["Faccio ___ colazione alle sette.", "–", ["la", "una", "il"], "Fare colazione (brez člena).", 4, "visja"],
    ["Mi dispiace, ma non ___ la pena.", "vale", ["va", "fa", "ha"], "Valere la pena = biti vredno.", 4, "visja"],
    ["Facciamo ___ ! (vsak plača svoje)", "alla romana", ["all'italiana", "alla pari", "a metà"], "Pagare alla romana = vsak plača svoje.", 4, "visja"],
  ]);
}
