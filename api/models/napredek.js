// api/models/napredek.js
// En zapis na uporabnika in nalogo: koliko poskusov, ali je bil zadnji poskus uspešen,
// ali je naloga kdaj rešena in ali je gledal postopek. Zapisi so po predmetih in snoveh,
// da lahko dijak ponovi neuspešne ali pregleda uspešne naloge (stran Moje naloge).
//
// vir: "vaja" (naloge za vajo, naloga = id naloge) ali "matura" (naloga = "<pola>-<naloga>").
import mongoose from "mongoose";

const napredekSchema = new mongoose.Schema(
  {
    uporabnik: { type: mongoose.Schema.Types.ObjectId, ref: "Uporabnik", required: true },
    naloga: { type: String, required: true },
    vir: { type: String, enum: ["vaja", "matura"], default: "vaja" },
    predmet: String,
    poglavje: { type: String, required: true }, // prvo poglavje (snov) naloge
    poglavja: [String], // vsa poglavja (maturitetna naloga lahko spada v več snovi)
    poskusi: { type: Number, default: 0 },
    napacni: { type: Number, default: 0 },
    zadnjiPravilno: Boolean,
    zadnjiPoskus: Date,
    reseno: { type: Boolean, default: false },
    resenoOb: Date,
    postopekOgledan: { type: Boolean, default: false },
  },
  { timestamps: true }
);

napredekSchema.index({ uporabnik: 1, naloga: 1 }, { unique: true });
napredekSchema.index({ uporabnik: 1, poglavje: 1 });

// Podatki o nalogi, ki se zapišejo ob vsakem poskusu (tudi starim zapisom brez predmeta)
const opisNaloge = (naloga) => {
  const poglavja = [naloga.poglavje ?? []].flat();
  return { vir: naloga.vir ?? "vaja", predmet: naloga.predmet, poglavja };
};

// naloga: { id, predmet, poglavje (niz ali seznam), vir? }
napredekSchema.statics.zabeleziPoskus = function (uporabnikId, naloga, pravilno) {
  const opis = opisNaloge(naloga);
  const posodobitev = {
    $inc: { poskusi: 1, napacni: pravilno ? 0 : 1 },
    $set: { ...opis, zadnjiPravilno: Boolean(pravilno), zadnjiPoskus: new Date() },
    $setOnInsert: { poglavje: opis.poglavja[0] },
  };
  if (pravilno) {
    posodobitev.$set.reseno = true;
    posodobitev.$min = { resenoOb: new Date() }; // ohrani čas prve rešitve
  }
  return this.updateOne({ uporabnik: uporabnikId, naloga: naloga.id }, posodobitev, { upsert: true });
};

napredekSchema.statics.zabeleziPostopek = function (uporabnikId, naloga) {
  const opis = opisNaloge(naloga);
  return this.updateOne(
    { uporabnik: uporabnikId, naloga: naloga.id },
    { $set: { postopekOgledan: true, ...opis }, $setOnInsert: { poglavje: opis.poglavja[0] } },
    { upsert: true }
  );
};

// "uspesno" (zadnji poskus pravilen), "neuspesno" (zadnji poskus napačen) ali null (samo ogled postopka).
// Zapisi izpred beleženja zadnjega poskusa: rešena naloga je uspešna, nerešena s poskusi neuspešna.
export function stanjeNapredka(z) {
  if (typeof z.zadnjiPravilno === "boolean") return z.zadnjiPravilno ? "uspesno" : "neuspesno";
  if (z.reseno) return "uspesno";
  return z.poskusi > 0 ? "neuspesno" : null;
}

export default mongoose.model("Napredek", napredekSchema, "napredek");
