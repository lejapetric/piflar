// api/db.js
import dns from "node:dns";
import mongoose from "mongoose";

// Javni DNS strežniki za primer, ko lokalni DNS (npr. domači usmerjevalnik na Windows)
// ne zna odgovoriti na SRV poizvedbo, ki jo potrebuje naslov mongodb+srv://.
const JAVNI_DNS = ["1.1.1.1", "8.8.8.8"];
// Če povezava ne uspe, strežnik teče naprej in se znova poskusi povezati na toliko ms.
const PONOVNI_POSKUS_MS = 30_000;

let razlog = "";
let poslusalciNastavljeni = false;
let biloPovezano = false;

// Kratek opis, zakaj baza ni povezana (prazen niz, ko je vse v redu).
export const razlogBrezBaze = () => (bazaPovezana() ? "" : razlog || "povezava z bazo se še vzpostavlja");

// Prevede pogoste napake MongoDB Atlas v navodilo, kaj popraviti.
export function pojasniNapako(napaka) {
  const sporocilo = String(napaka?.message || napaka || "");
  if (napaka?.code === 8000 || /bad auth|authentication failed/i.test(sporocilo))
    return "Atlas zavrne uporabnika ali geslo v MONGODB_URI (Database Access).";
  if (napaka?.syscall === "querySrv" || /ENOTFOUND|querySrv/i.test(sporocilo))
    return "naslova gruče ni mogoče najti (DNS). Preveri MONGODB_URI in internetno povezavo.";
  if (napaka?.name === "MongooseServerSelectionError" || /whitelist|timed out|ETIMEDOUT|ECONNREFUSED/i.test(sporocilo))
    return "do gruče ni mogoče priti. Najverjetneje tvoj trenutni IP naslov ni dovoljen v Atlasu (Network Access → Add Current IP Address) ali pa je gruča ustavljena (Paused).";
  return sporocilo || "neznana napaka";
}

function nastaviPoslusalce() {
  if (poslusalciNastavljeni) return;
  poslusalciNastavljeni = true;
  mongoose.connection.on("disconnected", () => {
    if (!biloPovezano) return;
    biloPovezano = false;
    razlog = "povezava z bazo je bila prekinjena (npr. menjava omrežja ali IP naslova)";
    console.warn(`MongoDB: ${razlog}. Prijava ne deluje, dokler se povezava ne vzpostavi znova.`);
  });
  mongoose.connection.on("reconnected", () => {
    biloPovezano = true;
    razlog = "";
    console.log("MongoDB: povezava znova vzpostavljena.");
  });
}

async function poskusiPovezavo(uri) {
  try {
    await mongoose.connect(uri);
  } catch (napaka) {
    if (napaka?.syscall !== "querySrv") throw napaka;
    console.warn(`Lokalni DNS ne najde baze (${napaka.code}), poskušam z javnim DNS ${JAVNI_DNS.join(", ")}.`);
    dns.setServers(JAVNI_DNS);
    await mongoose.connect(uri);
  }
}

// Brez MONGODB_URI ali ob napaki pri povezavi stran deluje naprej, le prijava in plačljiva
// vsebina nista na voljo. Ob napaki se strežnik sam znova poskusi povezati.
export async function poveziBazo() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    razlog = "MONGODB_URI ni nastavljen v .env";
    console.warn("MONGODB_URI ni nastavljen: prijava ne bo delovala.");
    return false;
  }
  if (!process.env.JWT_SECRET) throw new Error("Nastavi JWT_SECRET v .env (dolg naključen niz).");
  nastaviPoslusalce();
  try {
    await poskusiPovezavo(uri);
  } catch (napaka) {
    await mongoose.disconnect().catch(() => {});
    razlog = pojasniNapako(napaka);
    console.error(`Povezava z MongoDB ni uspela: ${razlog}`);
    console.error(`  (izvirna napaka: ${napaka?.message})`);
    console.error(`  Stran teče naprej brez prijave. Nov poskus čez ${PONOVNI_POSKUS_MS / 1000} s.`);
    setTimeout(() => poveziBazo().catch(() => {}), PONOVNI_POSKUS_MS).unref();
    return false;
  }
  razlog = "";
  biloPovezano = true;
  console.log("Povezan z MongoDB.");
  return true;
}

export const bazaPovezana = () => mongoose.connection.readyState === 1;
