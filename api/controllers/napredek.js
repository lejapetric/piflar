// api/controllers/napredek.js
// Napredek prijavljenega uporabnika: katere naloge je reševal, po predmetih in snoveh,
// in ali je bil zadnji poskus uspešen. Stran Moje naloge (public/napredek.html) iz tega
// sestavi povzetek, strani z nalogami pa filter Neuspešne / Uspešne / Nerešene.
import { naloge, matura } from "../data/index.js";
import Napredek, { stanjeNapredka } from "../models/napredek.js";

const vaje = new Map(naloge.map((n) => [n.id, n]));
const maturitetne = new Map();
for (const pola of matura)
  for (const n of pola.naloge ?? []) maturitetne.set(`${pola.id}-${n.id}`, { pola, naloga: n });

// Predmet in snovi vzamemo iz trenutnih podatkov (stari zapisi jih nimajo shranjenih)
function opis(z) {
  const vir = z.vir ?? "vaja";
  if (vir === "matura") {
    const m = maturitetne.get(z.naloga);
    if (!m) return { vir, predmet: z.predmet, poglavja: z.poglavja?.length ? z.poglavja : [z.poglavje] };
    return { vir, predmet: m.pola.predmet, poglavja: [m.naloga.poglavje ?? []].flat() };
  }
  const n = vaje.get(z.naloga);
  if (!n) return { vir, predmet: z.predmet, poglavja: z.poglavja?.length ? z.poglavja : [z.poglavje] };
  return { vir, predmet: n.predmet, poglavja: [n.poglavje] };
}

const STANJA = ["uspesno", "neuspesno"];

// GET /api/napredek?predmet=fizika&poglavje=nihanje&vir=vaja&stanje=neuspesno  (samo prijavljeni)
const napredekList = async (req, res) => {
  const { predmet, poglavje, vir, stanje } = req.query;
  const zapisi = await Napredek.find({ uporabnik: req.uporabnik._id })
    .select("-_id naloga vir predmet poglavje poglavja poskusi napacni zadnjiPravilno zadnjiPoskus reseno resenoOb postopekOgledan")
    .lean();
  const rezultat = [];
  for (const z of zapisi) {
    const o = opis(z);
    if (!o.predmet) continue;
    const zapis = {
      naloga: z.naloga,
      ...o,
      poglavje: o.poglavja[0] ?? z.poglavje,
      stanje: stanjeNapredka(z),
      poskusi: z.poskusi ?? 0,
      napacni: z.napacni ?? 0,
      reseno: Boolean(z.reseno),
      resenoOb: z.resenoOb ?? null,
      zadnjiPoskus: z.zadnjiPoskus ?? null,
      postopekOgledan: Boolean(z.postopekOgledan),
    };
    if (predmet && zapis.predmet !== predmet) continue;
    if (poglavje && !zapis.poglavja.includes(String(poglavje))) continue;
    if (vir && zapis.vir !== vir) continue;
    if (STANJA.includes(stanje) && zapis.stanje !== stanje) continue;
    rezultat.push(zapis);
  }
  rezultat.sort((a, b) => new Date(b.zadnjiPoskus ?? 0) - new Date(a.zadnjiPoskus ?? 0));
  res.status(200).json(rezultat);
};

export default { napredekList };
