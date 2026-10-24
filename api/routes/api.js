// api/routes/api.js
import { Router } from "express";
import ctrlSnovi from "../controllers/snovi.js";
import ctrlMatura from "../controllers/matura.js";

const router = Router();

// SNOV
router.get("/snovi", ctrlSnovi.snoviList);
router.get("/snovi/:slug", ctrlSnovi.snovReadOne);

// MATURITETNE POLE
router.get("/matura", ctrlMatura.maturaList);
router.get("/matura/:maturaId", ctrlMatura.maturaReadOne);
router.get("/matura/:maturaId/naloge", ctrlMatura.nalogeList);
router.get("/matura/:maturaId/naloge/:nalogaId", ctrlMatura.nalogaReadOne);

// Neznana API pot
router.use((req, res) => {
  res.status(404).json({ message: "API pot ne obstaja." });
});

export default router;
