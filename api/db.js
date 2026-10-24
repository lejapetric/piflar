// api/db.js
import mongoose from "mongoose";

// Brez MONGODB_URI stran deluje naprej, le prijava in plačljiva vsebina nista na voljo.
export async function poveziBazo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI ni nastavljen: prijava ne bo delovala.");
    return false;
  }
  if (!process.env.JWT_SECRET) throw new Error("Nastavi JWT_SECRET v .env (dolg naključen niz).");
  await mongoose.connect(uri);
  console.log("Povezan z MongoDB.");
  return true;
}

export const bazaPovezana = () => mongoose.connection.readyState === 1;
