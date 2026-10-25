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
    uporabnik: { paket: "osnovni" },
  });
  assert.equal(placnik.body.odklenjena, true);
  assert.ok(placnik.body.naloge[0].razlaga);
});

test("zadnja rešena pola je odklenjena za vse, seznam ne vsebuje rešitev", () => {
  const zadnja = poklici(ctrl.maturaReadOne, { params: { maturaId: "primer-matematika-osnovna-2026-jesenski" } });
  assert.equal(zadnja.body.odklenjena, true);
  assert.ok(zadnja.body.naloge[0].razlaga);

  const seznam = poklici(ctrl.maturaList, { query: { predmet: "matematika" } });
  assert.ok(seznam.body.length > 0);
  assert.ok(seznam.body.every((p) => p.naloge === undefined));
});

test("pole leta: spomladanski rok pred jesenskim, z nalogami samo na zahtevo", () => {
  const { body } = poklici(ctrl.maturaList, { query: { predmet: "matematika", leto: "2026", raven: "osnovna", naloge: "1" } });
  assert.deepEqual(body.map((p) => p.rok), ["spomladanski", "jesenski"]);
  assert.ok(body.every((p) => p.leto === 2026 && Array.isArray(p.naloge)));
  assert.equal(body[0].naloge[0].razlaga, undefined); // gost, starejša pola
  assert.ok(body[1].naloge[0].razlaga); // gost, zadnja rešena pola
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
