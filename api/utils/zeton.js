// api/utils/zeton.js
// Prijava se hrani v piškotku httpOnly, da ga JavaScript na strani ne more prebrati.
import jwt from "jsonwebtoken";

export const PISKOTEK = "piflar_zeton";
const TRAJANJE_S = 7 * 24 * 60 * 60; // 7 dni

export function nastaviPrijavo(res, uporabnik) {
  const zeton = jwt.sign({ sub: String(uporabnik._id) }, process.env.JWT_SECRET, {
    expiresIn: TRAJANJE_S,
  });
  res.cookie(PISKOTEK, zeton, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: TRAJANJE_S * 1000,
    path: "/",
  });
}

export function pobrisiPrijavo(res) {
  res.clearCookie(PISKOTEK, { path: "/" });
}

// Vrne id uporabnika ali null, če žetona ni ali ni veljaven
export function preberiZeton(req) {
  const piskotki = Object.fromEntries(
    (req.headers.cookie ?? "")
      .split(";")
      .map((p) => p.trim().split("="))
      .filter(([k, v]) => k && v)
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
  const zeton = piskotki[PISKOTEK];
  if (!zeton) return null;
  try {
    return jwt.verify(zeton, process.env.JWT_SECRET).sub;
  } catch {
    return null;
  }
}
