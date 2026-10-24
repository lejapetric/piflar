import { test } from "node:test";
import assert from "node:assert/strict";
import ctrl from "../api/controllers/matura.js";

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
  const id = "primer-matematika-osnovna-2024-spomladanski";
  const gost = poklici(ctrl.maturaReadOne, { params: { maturaId: id } });
  assert.equal(gost.body.odklenjena, false);
  assert.equal(gost.body.naloge[0].razlaga, undefined);
  assert.equal(gost.body.naloge[0].rezultat, undefined);
  assert.ok(gost.body.naloge[0].besedilo);

  const placnik = poklici(ctrl.maturaReadOne, {
    params: { maturaId: id },
    uporabnik: { paket: "osnovni", predmeti: ["matematika"] },
  });
  assert.equal(placnik.body.odklenjena, true);
  assert.ok(placnik.body.naloge[0].razlaga);
});

test("zadnja rešena pola je odklenjena za vse, seznam ne vsebuje rešitev", () => {
  const zadnja = poklici(ctrl.maturaReadOne, { params: { maturaId: "primer-matematika-osnovna-2025-spomladanski" } });
  assert.equal(zadnja.body.odklenjena, true);
  assert.ok(zadnja.body.naloge[0].razlaga);

  const seznam = poklici(ctrl.maturaList, { query: { predmet: "matematika" } });
  assert.equal(seznam.body.length, 3);
  assert.ok(seznam.body.every((p) => p.naloge === undefined));
});
