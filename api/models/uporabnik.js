// api/models/uporabnik.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { PAKETI, PREDMETI, MAX_PREDMETOV } from "../utils/dostop.js";

const uporabnikSchema = new mongoose.Schema(
  {
    ime: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    gesloHash: { type: String, required: true, select: false },
    paket: { type: String, enum: PAKETI, default: "brezplacno" },
    predmeti: {
      type: [{ type: String, enum: PREDMETI }],
      validate: [(v) => v.length <= MAX_PREDMETOV, `Največ ${MAX_PREDMETOV} predmeti.`],
    },
    // Do kdaj velja plačan paket (nastavi plačilni sistem); prazno = brez omejitve
    paketVelja: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.gesloHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

uporabnikSchema.methods.nastaviGeslo = async function (geslo) {
  this.gesloHash = await bcrypt.hash(geslo, 12);
};

uporabnikSchema.methods.preveriGeslo = function (geslo) {
  return bcrypt.compare(geslo, this.gesloHash);
};

export default mongoose.model("Uporabnik", uporabnikSchema, "uporabniki");
