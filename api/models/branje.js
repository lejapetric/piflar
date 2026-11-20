// api/models/branje.js
// Koliko je dijak predelal razlago snovi: po sklopih čas branja (zavihek aktiven, sklop na
// zaslonu) in čas gledanja videa. Iz tega se izračuna, ali je razlaga predelana (utils/priprava.js).
import mongoose from "mongoose";

const sklopSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // "sklop-3"
    cas: { type: Number, default: 0 }, // sekunde branja
    video: { type: Number, default: 0 }, // sekunde predvajanega videa
    trajanje: { type: Number, default: 0 }, // dolžina videa v sekundah
  },
  { _id: false }
);

const branjeSchema = new mongoose.Schema(
  {
    uporabnik: { type: mongoose.Schema.Types.ObjectId, ref: "Uporabnik", required: true },
    predmet: { type: String, required: true },
    slug: { type: String, required: true },
    sklopi: { type: [sklopSchema], default: [] },
    zadnjaPosodobitev: Date,
    predelanoOb: Date, // prvič izpolnjen prag (utils/priprava.js PRAG_BRANJA)
  },
  { timestamps: true }
);

branjeSchema.index({ uporabnik: 1, predmet: 1, slug: 1 }, { unique: true });

export default mongoose.model("Branje", branjeSchema, "branje");
