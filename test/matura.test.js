import { test } from "node:test";
import assert from "node:assert/strict";
import ctrl from "../api/controllers/matura.js";

// Ti testi preverjajo pravila zaklepa, zato ga vklopimo (privzeto je začasno izklopljen).
process.env.ZAKLEP = "1";

function poklici(handler, { params = {}, query = {}, uporabnik = null } = {}) {
  let status, body;
  const res = {
    status(s) { status = s; return this; },
    json(b) { body = b; return this; },
  };
  handler({ params, query, uporabnik }, res);
  return { status, body };
}

test("starejša rešena pola je zaklenjena za goste, odklenjena za plačnike", () => {
  const id = "matematika-osnovna-2024-spomladanski-1";
  const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: id } });
  assert.equal(gost.body.odklenjena, false);
  assert.equal(gost.body.naloge[0].razlaga, undefined);
  assert.equal(gost.body.naloge[0].rezultat, undefined);
  assert.ok(gost.body.naloge[0].besedilo);

  const placnik = poklici(ctrl.maturaReadOne, {
    params: { maturaId: id },
    uporabnik: { paket: "osnovni" },
  });
  assert.equal(placnik.body.odklenjena, true);
  assert.ok(placnik.body.naloge[0].razlaga);
});

test("zadnja rešena pola je odklenjena za vse, seznam ne vsebuje rešitev", () => {
  const zadnja = poklici(ctrl.maturaReadOne, { params: { maturaId: "matematika-osnovna-2026-spomladanski-1" } });
  assert.equal(zadnja.body.odklenjena, true);
  assert.ok(zadnja.body.naloge[0].razlaga);

  const seznam = poklici(ctrl.maturaList, { query: { predmet: "matematika" } });
  assert.ok(seznam.body.length > 0);
  assert.ok(seznam.body.every((p) => p.naloge === undefined));
});

test("pole leta: spomladanski rok pred jesenskim, z nalogami samo na zahtevo", () => {
  const { body } = poklici(ctrl.maturaList, { query: { predmet: "matematika", leto: "2025", raven: "osnovna", naloge: "1" } });
  assert.deepEqual(body.map((p) => p.rok), ["spomladanski", "spomladanski", "jesenski", "jesenski"]);
  assert.deepEqual(body.map((p) => p.stevilka), [1, 2, 1, 2]);
  assert.ok(body.every((p) => p.leto === 2025 && Array.isArray(p.naloge)));
  assert.equal(body[0].naloge[0].razlaga, undefined); // gost, starejša pola

  const zadnje = poklici(ctrl.maturaList, { query: { predmet: "matematika", leto: "2026", raven: "osnovna", naloge: "1" } }).body;
  assert.ok(zadnje.length > 0 && zadnje.every((p) => p.naloge[0].razlaga)); // gost, zadnji rešeni rok
});

test("leto 2021: predmaturitetni preizkus pred spomladanskim in jesenskim rokom", () => {
  const { body } = poklici(ctrl.maturaList, { query: { predmet: "matematika", leto: "2021", raven: "osnovna" } });
  assert.deepEqual(body.map((p) => p.rok), ["predmaturitetni", "predmaturitetni", "spomladanski", "spomladanski", "jesenski", "jesenski"]);
});

test("naloge po snovi: samo izbrano poglavje, rešitve po pravilih pole", () => {
  const gost = poklici(ctrl.maturaNaloge, { query: { predmet: "matematika", poglavje: "diferencialni_racun" } });
  assert.ok(gost.body.length > 1);
  assert.ok(gost.body.every((n) => [n.poglavje].flat().includes("diferencialni_racun")));
  assert.ok(gost.body.every((n) => n.pola.id && n.pola.leto));
  for (const n of gost.body) assert.equal(n.razlaga !== undefined, n.odklenjena);
  // novejša leta najprej
  const leta = gost.body.map((n) => n.pola.leto);
  assert.deepEqual(leta, [...leta].sort((a, b) => b - a));

  const placnik = poklici(ctrl.maturaNaloge, {
    query: { predmet: "matematika", poglavje: "diferencialni_racun,integralski_racun" },
    uporabnik: { paket: "osnovni" },
  });
  assert.ok(placnik.body.length > gost.body.length);
  assert.ok(placnik.body.every((n) => n.odklenjena && n.razlaga));
});

test("vse izpitne pole zadnjega rešenega roka so javne", async () => {
  const { javneResenePole } = await import("../api/utils/dostop.js");
  const pola = (id, stevilka) => ({ id, predmet: "matematika", raven: "osnovna", leto: 2027, rok: "spomladanski", stevilka, naloge: [{ razlaga: "x" }] });
  const javne = javneResenePole([pola("a", 1), pola("b", 2), { ...pola("c", 1), leto: 2025 }]);
  assert.deepEqual([...javne].sort(), ["a", "b"]);
});

test("fizika: 36 pol, zadnji rok je javen, starejši zaklenjen (fizika ni v osnovnem paketu)", () => {
  const seznam = poklici(ctrl.maturaList, { query: { predmet: "fizika" } });
  assert.equal(seznam.body.length, 36);
  assert.ok(seznam.body.every((p) => p.raven === "enotna"));

  const javna = poklici(ctrl.maturaReadOne, { params: { maturaId: "fizika-2025-jesenski-2-2" } });
  assert.equal(javna.body.odklenjena, true);
  assert.equal(javna.body.naloge.length, 6);

  const id = "fizika-2020-spomladanski-1";
  const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: id } });
  assert.equal(gost.body.odklenjena, false);
  assert.equal(gost.body.naloge.length, 35);
  const osnovni = poklici(ctrl.maturaReadOne, { params: { maturaId: id }, uporabnik: { paket: "osnovni" } });
  assert.equal(osnovni.body.odklenjena, false);
  const premium = poklici(ctrl.maturaReadOne, { params: { maturaId: id }, uporabnik: { paket: "premium" } });
  assert.equal(premium.body.odklenjena, true);
  assert.ok(premium.body.naloge[0].razlaga);
});

test("kemija: 36 pol, zadnji rok je javen, starejši zaklenjen (kemija ni v osnovnem paketu)", () => {
  const seznam = poklici(ctrl.maturaList, { query: { predmet: "kemija" } });
  assert.equal(seznam.body.length, 36);
  assert.ok(seznam.body.every((p) => p.raven === "enotna"));

  const javna = poklici(ctrl.maturaReadOne, { params: { maturaId: "kemija-2025-jesenski-2-2" } });
  assert.equal(javna.body.odklenjena, true);
  assert.equal(javna.body.naloge.length, 15);

  const id = "kemija-2020-spomladanski-1";
  const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: id } });
  assert.equal(gost.body.odklenjena, false);
  assert.equal(gost.body.naloge.length, 35);
  const osnovni = poklici(ctrl.maturaReadOne, { params: { maturaId: id }, uporabnik: { paket: "osnovni" } });
  assert.equal(osnovni.body.odklenjena, false);
  const premium = poklici(ctrl.maturaReadOne, { params: { maturaId: id }, uporabnik: { paket: "premium" } });
  assert.equal(premium.body.odklenjena, true);
  assert.ok(premium.body.naloge[0].razlaga);
});

test("z izklopljenim zaklepom (ZAKLEP ni 1) gost vidi rešitve vseh rešenih pol", () => {
  process.env.ZAKLEP = "0";
  try {
    const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: "matematika-osnovna-2024-spomladanski-1" } });
    assert.equal(gost.body.odklenjena, true);
    assert.ok(gost.body.naloge[0].razlaga);
    const naloge = poklici(ctrl.maturaNaloge, { query: { predmet: "matematika" } });
    assert.ok(naloge.body.filter((n) => n.resena).every((n) => n.odklenjena && n.razlaga));
  } finally {
    process.env.ZAKLEP = "1";
  }
});

test("informatika: 12 pol, zadnji rok je javen, starejši zaklenjen (informatika ni v osnovnem paketu)", () => {
  const seznam = poklici(ctrl.maturaList, { query: { predmet: "informatika" } });
  assert.equal(seznam.body.length, 12);
  assert.ok(seznam.body.every((p) => p.raven === "enotna"));

  const javna = poklici(ctrl.maturaReadOne, { params: { maturaId: "informatika-2026-spomladanski-2" } });
  assert.equal(javna.body.odklenjena, true);
  assert.equal(javna.body.naloge.length, 6);
  assert.equal(javna.body.naloge.reduce((s, n) => s + n.tocke, 0), 44);

  const id = "informatika-2024-spomladanski-1";
  const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: id } });
  assert.equal(gost.body.odklenjena, false);
  assert.equal(gost.body.naloge.length, 15);
  assert.equal(gost.body.naloge[0].razlaga, undefined);
  const premium = poklici(ctrl.maturaReadOne, { params: { maturaId: id }, uporabnik: { paket: "premium" } });
  assert.equal(premium.body.odklenjena, true);
  assert.ok(premium.body.naloge[0].razlaga);
  assert.ok(premium.body.naloge.every((n) => n.snov && n.tema?.length));
});
