// api/routes/api.js
import { Router } from "express";
import ctrlSnovi from "../controllers/snovi.js";
import ctrlMatura from "../controllers/matura.js";
import ctrlNaloge from "../controllers/naloge.js";
import ctrlAvt from "../controllers/avtentikacija.js";
import ctrlPlacila from "../controllers/placila.js";
import ctrlIskanje from "../controllers/iskanje.js";
import { naloziUporabnika, zahtevajPrijavo, zahtevajBazo } from "../middleware/uporabnik.js";

const router = Router();

router.use(naloziUporabnika);

// UPORABNIKI
router.post("/registracija", zahtevajBazo, ctrlAvt.registracija);
router.post("/prijava", zahtevajBazo, ctrlAvt.prijava);
router.post("/odjava", ctrlAvt.odjava);
router.get("/jaz", zahtevajPrijavo, ctrlAvt.jaz);

// PLAČILA (webhook je v app.js)
router.get("/placila/cenik", ctrlPlacila.cenikGet);
router.post("/placila/checkout", zahtevajBazo, zahtevajPrijavo, ctrlPlacila.checkout);
router.post("/placila/portal", zahtevajBazo, zahtevajPrijavo, ctrlPlacila.portal);

// SNOV
router.get("/snovi", ctrlSnovi.snoviList);
router.get("/snovi/:slug", ctrlSnovi.snovReadOne);

// NALOGE (interaktivne)
router.get("/naloge", ctrlNaloge.nalogeList);
router.get("/naloge/:id", ctrlNaloge.nalogaReadOne);
router.post("/naloge/:id/odgovor", ctrlNaloge.nalogaPreveri);
router.get("/naloge/:id/postopek", ctrlNaloge.nalogaPostopek);
router.get("/napredek", zahtevajPrijavo, ctrlNaloge.napredekList);

// ISKANJE PO SNOVI
router.get("/iskanje", ctrlIskanje.iskanje);

// MATURITETNE POLE
router.get("/matura", ctrlMatura.maturaList);
router.get("/matura/naloge", ctrlMatura.maturaNaloge);
router.get("/matura/:maturaId", ctrlMatura.maturaReadOne);

// Neznana API pot
router.use((req, res) => {
  res.status(404).json({ message: "API pot ne obstaja." });
});

export default router;
