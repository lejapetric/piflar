// api/models/priprava.js
// Tedenska priprava na maturo: en zapis na uporabnika. Nastavitve (predmeti, tempo, datum mature)
// in snovi, ki jih je dobil za posamezen teden. Seznam tedna se zapiše, ko teden prvič odpre,
// in se med tednom ne spreminja sam od sebe (lahko pa snov zamenja ali spremeni nastavitve).
import mongoose from "mongoose";

const snovTednaSchema = new mongoose.Schema(
  { predmet: { type: String, required: true }, slug: { type: String, required: true } },
  { _id: false }
);

const tedenSchema = new mongoose.Schema(
  {
    zacetek: { type: String, required: true }, // ponedeljek "YYYY-MM-DD" (čas v Ljubljani)
    snovi: [snovTednaSchema],
  },
  { _id: false }
);

const pripravaSchema = new mongoose.Schema(
  {
    uporabnik: { type: mongoose.Schema.Types.ObjectId, ref: "Uporabnik", required: true, unique: true },
    predmeti: { type: [String], default: [] },
    tempo: { type: Number, min: 1, max: 5, default: 1 }, // snovi na teden
    rok: { type: String, enum: ["spomladanski", "jesenski"], default: "spomladanski" }, // rok mature (datumi iz koledarja RIC)
    datumMature: Date, // le, če za leto mature še ni uradnega koledarja
    tedni: { type: [tedenSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Priprava", pripravaSchema, "priprava");
