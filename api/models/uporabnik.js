// api/models/uporabnik.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { PAKETI } from "../utils/dostop.js";

// Tipi šol: srednja strokovna šola bo dodana kasneje (podatek se že lahko shrani).
export const TIPI_SOL = ["gimnazija", "srednja_strokovna"];
export const RAVNI = ["osnovna", "visja"];

const uporabnikSchema = new mongoose.Schema(
  {
    ime: { type: String, required: true, trim: true, maxlength: 100 },
    priimek: { type: String, trim: true, maxlength: 100, default: "" },
    starost: { type: Number, min: 10, max: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    gesloHash: { type: String, required: true, select: false },
    // false = registriran, a e-naslova še ni potrdil. Računi, ustvarjeni pred potrjevanjem
    // e-pošte, polja nimajo in veljajo za potrjene.
    emailPotrjen: Boolean,
    // sha256 žetona iz povezave v e-pošti (sam žeton gre samo v e-pošto)
    potrditevHash: { type: String, select: false, index: { sparse: true } },
    potrditevVelja: { type: Date, select: false },

    // Profil
    slika: { type: String, maxlength: 120_000 }, // data:image/jpeg;base64,… (pomanjšana v brskalniku)
    tipSole: { type: String, enum: TIPI_SOL, default: "gimnazija" },
    letnik: { type: Number, min: 1, max: 4 },
    letoMature: { type: Number, min: 2000, max: 2100 },
    ravenMatematike: { type: String, enum: RAVNI },
    sola: { type: String, trim: true, maxlength: 120, default: "" },

    // Nastavitve
    nastavitve: {
      novice: { type: Boolean, default: false },
      opomniki: { type: Boolean, default: true },
    },

    paket: { type: String, enum: PAKETI, default: "brezplacno" },
    // Do kdaj velja plačan paket (nastavi plačilni sistem); prazno = brez omejitve
    paketVelja: Date,
    // Stripe: id kupca in že obdelana enkratna plačila (da se ponovljen webhook ne šteje dvakrat)
    stripeKupec: { type: String, index: { unique: true, sparse: true } },
    obdelanaPlacila: { type: [String], select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.gesloHash;
        delete ret.potrditevHash;
        delete ret.potrditevVelja;
        delete ret.obdelanaPlacila;
        delete ret.stripeKupec;
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
