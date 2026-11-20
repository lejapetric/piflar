// api/routes/api.js
import { Router } from "express";
import ctrlSnovi from "../controllers/snovi.js";
import ctrlMatura from "../controllers/matura.js";
import ctrlNaloge from "../controllers/naloge.js";
import ctrlAvt from "../controllers/avtentikacija.js";
import ctrlProfil from "../controllers/profil.js";
import ctrlPlacila from "../controllers/placila.js";
import ctrlNapredek from "../controllers/napredek.js";
import ctrlIskanje from "../controllers/iskanje.js";
import ctrlUstni from "../controllers/ustni.js";
import ctrlPriprava from "../controllers/priprava.js";
import { naloziUporabnika, zahtevajPrijavo, zahtevajBazo } from "../middleware/uporabnik.js";

const router = Router();

router.use(naloziUporabnika);

// UPORABNIKI
router.post("/registracija", zahtevajBazo, ctrlAvt.registracija);
router.post("/potrdi-email", zahtevajBazo, ctrlAvt.potrdiEmail);
router.post("/potrdi-email/ponovno", zahtevajBazo, ctrlAvt.ponovnoPotrditev);
router.post("/prijava", zahtevajBazo, ctrlAvt.prijava);
router.post("/odjava", ctrlAvt.odjava);
router.get("/jaz", zahtevajPrijavo, ctrlAvt.jaz);
router.patch("/jaz", zahtevajPrijavo, ctrlProfil.posodobi);
router.post("/jaz/geslo", zahtevajPrijavo, ctrlProfil.spremeniGeslo);
router.delete("/jaz", zahtevajPrijavo, ctrlProfil.izbrisi);

// PLAČILA (webhook je v app.js)
router.get("/placila/cenik", ctrlPlacila.cenikGet);
router.post("/placila/checkout", zahtevajBazo, zahtevajPrijavo, ctrlPlacila.checkout);
router.post("/placila/portal", zahtevajBazo, zahtevajPrijavo, ctrlPlacila.portal);

// SNOV
router.get("/snovi", ctrlSnovi.snoviList);
router.get("/snovi/:slug", ctrlSnovi.snovReadOne);

// NALOGE (interaktivne)
router.get("/naloge", ctrlNaloge.nalogeList);
router.get("/naloge/stevilo", ctrlNaloge.nalogeStevilo);
router.get("/naloge/:id", ctrlNaloge.nalogaReadOne);
router.post("/naloge/:id/odgovor", ctrlNaloge.nalogaPreveri);
router.get("/naloge/:id/postopek", ctrlNaloge.nalogaPostopek);

// NAPREDEK (rešene naloge po predmetih in snoveh)
router.get("/napredek", zahtevajPrijavo, ctrlNapredek.napredekList);

// USTNI DEL MATURE (vprašanja po snoveh in samoocena prijavljenega)
router.get("/ustni", ctrlUstni.ustniList);
router.get("/ustni/stevilo", ctrlUstni.ustniStevilo);
router.get("/ustni/napredek", zahtevajPrijavo, ctrlUstni.ustniNapredek);
router.post("/ustni/:id/ocena", zahtevajBazo, zahtevajPrijavo, ctrlUstni.ustniOcena);
// TEDENSKA PRIPRAVA NA MATURO (načrt snovi po tednih, predelanost razlag)
router.get("/priprava", zahtevajPrijavo, ctrlPriprava.pripravaGet);
router.put("/priprava", zahtevajPrijavo, ctrlPriprava.pripravaPut);
router.post("/priprava/zamenjaj", zahtevajPrijavo, ctrlPriprava.pripravaZamenjaj);
router.get("/priprava/branje", zahtevajPrijavo, ctrlPriprava.branjeGet);
router.post("/priprava/branje", zahtevajPrijavo, ctrlPriprava.branjePost);

// ISKANJE PO SNOVI
router.get("/iskanje", ctrlIskanje.iskanje);

// MATURITETNE POLE
router.get("/matura", ctrlMatura.maturaList);
router.get("/matura/naloge", ctrlMatura.maturaNaloge);
router.get("/matura/stevilo", ctrlMatura.maturaStevilo);
router.post("/matura/odgovor", ctrlMatura.maturaOdgovor);
router.get("/matura/:maturaId", ctrlMatura.maturaReadOne);

// Neznana API pot
router.use((req, res) => {
  res.status(404).json({ message: "API pot ne obstaja." });
});

export default router;
