// app.js
// Express aplikacija brez zagona strežnika (zažene jo server.js, testi jo uvozijo).
import express from "express";
import { fileURLToPath } from "node:url";

import apiRouter from "./api/routes/api.js";
import ctrlPlacila from "./api/controllers/placila.js";
import errorHandler from "./api/middleware/error-handler.js";

const isProduction = process.env.NODE_ENV === "production";
const publicDir = fileURLToPath(new URL("./public", import.meta.url));

const app = express();
app.disable("x-powered-by");

// Stripe webhook potrebuje surovo telo za preverjanje podpisa, zato je pred express.json()
app.post("/api/placila/webhook", express.raw({ type: "application/json" }), ctrlPlacila.webhook);

// API
// 200 kB: profilna slika (pomanjšana v brskalniku) pride kot data URL
app.use("/api", express.json({ limit: "200kb" }), apiRouter);

// Statične datoteke iz public/. Strani, skripte, slogi in podatki (HTML, JS, CSS, JSON) se
// spreminjajo z vsako objavo, zato jih brskalnik vsakič preveri (no-cache z ETag, 304, če se niso
// spremenili). Sicer bi po objavi še en dan kazal star meni in stare skripte. Slike in pisave
// predpomni 1 dan.
const VEDNO_PREVERI = /\.(html|js|mjs|css|json)$/;
app.use(express.static(publicDir, {
  maxAge: isProduction ? "1d" : 0,
  setHeaders(res, pot) {
    if (VEDNO_PREVERI.test(pot)) res.setHeader("Cache-Control", "no-cache");
  },
}));

// Vse ostalo: stran ne obstaja
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: publicDir });
});

app.use(errorHandler);

export default app;
