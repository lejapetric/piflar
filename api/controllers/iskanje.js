// api/controllers/iskanje.js
// Iskanje po besedilu strani snovi za iskalnik v glavi in stran /iskanje.html.
import { indeks, isci, povezava } from "../utils/iskanje.js";

const NAJVEC = 500;

// GET /api/iskanje?q=krožnica&omejitev=8&predlogi=1
// predlogi=1: največ en zadetek na razdelek (za spustni seznam v glavi).
const iskanje = async (req, res, next) => {
  try {
    const q = String(req.query.q ?? "").trim().slice(0, 100);
    if (q.length < 2) return res.status(200).json({ q, skupaj: 0, zadetki: [] });
    const omejitev = Math.min(Math.max(parseInt(req.query.omejitev, 10) || NAJVEC, 1), NAJVEC);

    let zadetki = isci(await indeks(), q);
    const skupaj = zadetki.length;
    if (req.query.predlogi === "1") {
      const videni = new Set();
      zadetki = zadetki.filter((z) => {
        const kljuc = `${z.url}#${z.sidro}`;
        if (videni.has(kljuc)) return false;
        videni.add(kljuc);
        return true;
      });
    }
    zadetki = zadetki.slice(0, omejitev).map((z) => ({ ...z, povezava: povezava(z, q) }));
    res.status(200).json({ q, skupaj, zadetki });
  } catch (err) {
    next(err);
  }
};

export default { iskanje };
