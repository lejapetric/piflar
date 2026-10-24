// api/routes/api.js
import { Router } from "express";
import ctrlSnovi from "../controllers/snovi.js";
import ctrlMatura from "../controllers/matura.js";
import ctrlNaloge from "../controllers/naloge.js";

const router = Router();

// SNOV
router.get("/snovi", ctrlSnovi.snoviList);
router.get("/snovi/:slug", ctrlSnovi.snovReadOne);

// NALOGE (interaktivne)
router.get("/naloge", ctrlNaloge.nalogeList);
router.get("/naloge/:id", ctrlNaloge.nalogaReadOne);
router.post("/naloge/:id/odgovor", ctrlNaloge.nalogaPreveri);
router.get("/naloge/:id/postopek", ctrlNaloge.nalogaPostopek);

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
