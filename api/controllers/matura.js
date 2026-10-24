// api/controllers/matura.js
// Nerešene pole (besedilo, PDF) vidijo vsi. Rešitve so vidne pri zadnji rešeni
// poli vsakega predmeta in ravni, pri ostalih pa samo plačnikom tega predmeta.
import { matura } from "../data/index.js";
import { javneResenePole, lahkoVidiResitve, jeResena } from "../utils/dostop.js";

const javne = javneResenePole(matura);

function prikazPole(pola, uporabnik, zNalogami) {
  const { naloge = [], ...podatki } = pola;
  const odklenjena = lahkoVidiResitve(uporabnik, pola, javne);
  const rezultat = { ...podatki, resena: jeResena(pola), odklenjena };
  if (zNalogami) {
    rezultat.naloge = naloge.map(({ razlaga, rezultat: r, ...naloga }) =>
      odklenjena ? { ...naloga, razlaga, rezultat: r } : naloga
    );
  }
  return rezultat;
}

// GET /api/matura?predmet=matematika&raven=osnovna
const maturaList = (req, res) => {
  const { predmet, raven } = req.query;
  let pole = matura;
  if (predmet) pole = pole.filter((p) => p.predmet === predmet);
  if (raven) pole = pole.filter((p) => p.raven === raven);
  res.status(200).json(pole.map((p) => prikazPole(p, req.uporabnik, false)));
};

// GET /api/matura/:maturaId
const maturaReadOne = (req, res) => {
  const pola = matura.find((p) => p.id === req.params.maturaId);
  if (!pola) return res.status(404).json({ message: "Maturitetna pola ne obstaja." });
  res.status(200).json(prikazPole(pola, req.uporabnik, true));
};

export default { maturaList, maturaReadOne };
