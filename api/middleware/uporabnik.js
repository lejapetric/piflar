// api/middleware/uporabnik.js
import Uporabnik from "../models/uporabnik.js";
import { bazaPovezana } from "../db.js";
import { preberiZeton } from "../utils/zeton.js";

// Nastavi req.uporabnik (ali null za gosta) na vsaki API zahtevi
export async function naloziUporabnika(req, res, next) {
  req.uporabnik = null;
  if (!bazaPovezana()) return next();
  const id = preberiZeton(req);
  if (id) req.uporabnik = await Uporabnik.findById(id);
  next();
}

export function zahtevajPrijavo(req, res, next) {
  if (!req.uporabnik) return res.status(401).json({ message: "Za to se moraš prijaviti." });
  next();
}

export function zahtevajBazo(req, res, next) {
  if (!bazaPovezana())
    return res.status(503).json({ message: "Prijava trenutno ni na voljo." });
  next();
}
