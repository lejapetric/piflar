// api/controllers/ustni.js
// Ustni del mature: vprašanja po snoveh z vzorčnimi odgovori in samoocena prijavljenega
// uporabnika (znam / negotovo / ne_znam), ki jo kviz uporabi za ponavljanje.
import { ustni } from "../data/index.js";
import Ustni, { OCENE } from "../models/ustni.js";

const poId = new Map(ustni.map((v) => [v.id, v]));
const seznam = (x) => String(x ?? "").split(",").map((s) => s.trim()).filter(Boolean);

// GET /api/ustni?predmet=matematika&raven=osnovna&poglavje=funkcije,stoznice&listek=12
// raven: osnovna | visja (izpitni listki ravni); brez nje vsa vprašanja obeh ravni
const ustniList = (req, res) => {
  const { predmet, raven } = req.query;
  const poglavja = new Set(seznam(req.query.poglavje));
  const listki = new Set(seznam(req.query.listek).map(Number));
  const rezultat = ustni.filter(
    (v) =>
      (!predmet || v.predmet === predmet) &&
      (!raven || v.raven === raven) &&
      (!poglavja.size || poglavja.has(v.poglavje)) &&
      (!listki.size || listki.has(v.listek))
  );
  res.status(200).json(rezultat);
};

// GET /api/ustni/stevilo?predmet=matematika&raven=osnovna → { skupaj, poglavja: { slug: n } }
const ustniStevilo = (req, res) => {
  const { predmet, raven } = req.query;
  const poglavja = {};
  let skupaj = 0;
  for (const v of ustni) {
    if ((predmet && v.predmet !== predmet) || (raven && v.raven !== raven)) continue;
    poglavja[v.poglavje] = (poglavja[v.poglavje] ?? 0) + 1;
    skupaj++;
  }
  res.status(200).json({ skupaj, poglavja });
};

// GET /api/ustni/napredek?predmet=matematika  (samo prijavljeni)
const ustniNapredek = async (req, res) => {
  const { predmet } = req.query;
  const zapisi = await Ustni.find({ uporabnik: req.uporabnik._id, ...(predmet ? { predmet } : {}) })
    .select("-_id vprasanje predmet poglavje ocena ponovitve stevci zadnjic")
    .lean();
  // Vprašanja, ki jih ni več med podatki, izpustimo
  res.status(200).json(zapisi.filter((z) => poId.has(z.vprasanje)));
};

// POST /api/ustni/:id/ocena { ocena: "znam" | "negotovo" | "ne_znam" }  (samo prijavljeni)
const ustniOcena = async (req, res) => {
  const vprasanje = poId.get(req.params.id);
  if (!vprasanje) return res.status(404).json({ message: "Vprašanje ne obstaja." });
  const { ocena } = req.body ?? {};
  if (!OCENE.includes(ocena)) return res.status(400).json({ message: "Neveljavna ocena." });
  const z = await Ustni.zabeleziOceno(req.uporabnik._id, vprasanje, ocena);
  res.status(200).json({ vprasanje: z.vprasanje, ocena: z.ocena, ponovitve: z.ponovitve, stevci: z.stevci, zadnjic: z.zadnjic });
};

export default { ustniList, ustniStevilo, ustniNapredek, ustniOcena };
