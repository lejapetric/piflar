// server.js
import express from "express";
import passport from "passport";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import apiRouter from "./api/routes/api.js";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDocument = swaggerJsDoc({
  definition: {
    openapi: "3.1.1",
    info: {
      title: "Piflar.si API Documentation",
      version: "0.1.0",
      description: "API za maturitetno stran (matematika, fizika).",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Development server" },
    ],
  },
  apis: ["./api/models/*", "./api/controllers/*.js"],
});

const port = process.env.PORT || 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());

// Serviraj statične datoteke iz public/
app.use(express.static(join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.get("/api/swagger.json", (req, res) =>
  res.status(200).json(swaggerDocument)
);

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// API routing
app.use("/api", apiRouter);

// Catch-all — pošlji index.html za vse ostale poti (SPA fallback)
app.get(/.*/, (req, res) => {
  res.sendFile(join(__dirname, "public", "views", "index.html"));
});

app.listen(port, () => {
  console.log(
    `Piflar.si started in ${process.env.NODE_ENV || "development"} listening on port ${port}!`
  );
});