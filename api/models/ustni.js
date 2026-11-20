// api/models/ustni.js
// Samoocena pri vprašanjih za ustni del mature: en zapis na uporabnika in vprašanje.
// Dijak po odgovoru sam oceni, ali je vprašanje znal ("znam"), ni bil prepričan ("negotovo")
// ali ga ni znal ("ne_znam"). Shrani se zadnja ocena in koliko krat je dal katero oceno,
// da lahko v kvizu ponovi samo vprašanja, ki jih ni znal ali pri katerih ni bil prepričan.
import mongoose from "mongoose";

export const OCENE = ["znam", "negotovo", "ne_znam"];

const ustniSchema = new mongoose.Schema(
  {
    uporabnik: { type: mongoose.Schema.Types.ObjectId, ref: "Uporabnik", required: true },
    vprasanje: { type: String, required: true },
    predmet: String,
    poglavje: String,
    ocena: { type: String, enum: OCENE, required: true },
    ponovitve: { type: Number, default: 0 },
    stevci: {
      znam: { type: Number, default: 0 },
      negotovo: { type: Number, default: 0 },
      ne_znam: { type: Number, default: 0 },
    },
    zadnjic: Date,
  },
  { timestamps: true }
);

ustniSchema.index({ uporabnik: 1, vprasanje: 1 }, { unique: true });

// vprasanje: { id, predmet, poglavje }
ustniSchema.statics.zabeleziOceno = function (uporabnikId, vprasanje, ocena) {
  return this.findOneAndUpdate(
    { uporabnik: uporabnikId, vprasanje: vprasanje.id },
    {
      $set: { ocena, predmet: vprasanje.predmet, poglavje: vprasanje.poglavje, zadnjic: new Date() },
      $inc: { ponovitve: 1, [`stevci.${ocena}`]: 1 },
    },
    { upsert: true, new: true, lean: true }
  );
};

export default mongoose.model("Ustni", ustniSchema, "ustni");
