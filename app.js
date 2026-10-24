// app.js
// Express aplikacija brez zagona strežnika (zažene jo server.js, testi jo uvozijo).
import express from "express";
import { fileURLToPath } from "node:url";

import apiRouter from "./api/routes/api.js";
import errorHandler from "./api/middleware/error-handler.js";

const isProduction = process.env.NODE_ENV === "production";
const publicDir = fileURLToPath(new URL("./public", import.meta.url));

const app = express();
app.disable("x-powered-by");

// API
app.use("/api", express.json(), apiRouter);

// Statične datoteke iz public/ (v produkciji jih brskalnik predpomni 1 dan)
app.use(express.static(publicDir, { maxAge: isProduction ? "1d" : 0 }));

// Vse ostalo: stran ne obstaja
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: publicDir });
});

app.use(errorHandler);

export default app;
