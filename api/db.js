// api/db.js
import dns from "node:dns";
import mongoose from "mongoose";

// Javni DNS strežniki za primer, ko lokalni DNS (npr. domači usmerjevalnik na Windows)
// ne zna odgovoriti na SRV poizvedbo, ki jo potrebuje naslov mongodb+srv://.
const JAVNI_DNS = ["1.1.1.1", "8.8.8.8"];

// Brez MONGODB_URI stran deluje naprej, le prijava in plačljiva vsebina nista na voljo.
export async function poveziBazo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI ni nastavljen: prijava ne bo delovala.");
    return false;
  }
  if (!process.env.JWT_SECRET) throw new Error("Nastavi JWT_SECRET v .env (dolg naključen niz).");
  try {
    await mongoose.connect(uri);
  } catch (napaka) {
    if (napaka?.syscall !== "querySrv") throw napaka;
    console.warn(`Lokalni DNS ne najde baze (${napaka.code}), poskušam z javnim DNS ${JAVNI_DNS.join(", ")}.`);
    dns.setServers(JAVNI_DNS);
    await mongoose.connect(uri);
  }
  console.log("Povezan z MongoDB.");
  return true;
}

export const bazaPovezana = () => mongoose.connection.readyState === 1;
