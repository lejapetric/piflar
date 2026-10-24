// api/models/napredek.js
// En zapis na uporabnika in nalogo: koliko poskusov, ali je rešena, ali je gledal postopek.
import mongoose from "mongoose";

const napredekSchema = new mongoose.Schema(
  {
    uporabnik: { type: mongoose.Schema.Types.ObjectId, ref: "Uporabnik", required: true },
    naloga: { type: String, required: true },
    poglavje: { type: String, required: true },
    poskusi: { type: Number, default: 0 },
    reseno: { type: Boolean, default: false },
    resenoOb: Date,
    postopekOgledan: { type: Boolean, default: false },
  },
  { timestamps: true }
);

napredekSchema.index({ uporabnik: 1, naloga: 1 }, { unique: true });
napredekSchema.index({ uporabnik: 1, poglavje: 1 });

napredekSchema.statics.zabeleziPoskus = function (uporabnikId, naloga, pravilno) {
  const posodobitev = { $inc: { poskusi: 1 }, $setOnInsert: { poglavje: naloga.poglavje } };
  if (pravilno) {
    posodobitev.$set = { reseno: true };
    posodobitev.$min = { resenoOb: new Date() }; // ohrani čas prve rešitve
  }
  return this.updateOne({ uporabnik: uporabnikId, naloga: naloga.id }, posodobitev, { upsert: true });
};

napredekSchema.statics.zabeleziPostopek = function (uporabnikId, naloga) {
  return this.updateOne(
    { uporabnik: uporabnikId, naloga: naloga.id },
    { $set: { postopekOgledan: true }, $setOnInsert: { poglavje: naloga.poglavje } },
    { upsert: true }
  );
};

export default mongoose.model("Napredek", napredekSchema, "napredek");
