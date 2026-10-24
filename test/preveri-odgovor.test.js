import { test } from "node:test";
import assert from "node:assert/strict";
import { preveriOdgovor, parseStevilo } from "../api/utils/preveri-odgovor.js";
import { naloge } from "../api/data/index.js";

test("števila: decimalna vejica, ulomki, toleranca", () => {
  assert.equal(parseStevilo("3,5"), 3.5);
  assert.equal(parseStevilo(" -1/2 "), -0.5);
  assert.ok(Number.isNaN(parseStevilo("")));
  assert.ok(preveriOdgovor({ tip: "stevilo", vrednost: 7 }, " 7 "));
  assert.ok(preveriOdgovor({ tip: "stevilo", vrednost: 0.5 }, "1/2"));
  assert.ok(preveriOdgovor({ tip: "stevilo", vrednost: 3.14159, toleranca: 0.01 }, "3,14"));
  assert.ok(!preveriOdgovor({ tip: "stevilo", vrednost: 7 }, "8"));
  assert.ok(!preveriOdgovor({ tip: "stevilo", vrednost: 0 }, ""));
});

test("množice: vrstni red in zavite oklepaje ni pomemben", () => {
  const odg = { tip: "mnozica", elementi: ["4", "5"] };
  assert.ok(preveriOdgovor(odg, "{5, 4}"));
  assert.ok(preveriOdgovor(odg, "4;5"));
  assert.ok(!preveriOdgovor(odg, "4"));
  assert.ok(!preveriOdgovor(odg, "4, 5, 6"));
  assert.ok(preveriOdgovor({ tip: "mnozica", elementi: [] }, "{}"));
});

test("besedilo: presledki in velike črke niso pomembni", () => {
  assert.ok(preveriOdgovor({ tip: "besedilo", sprejemljivi: ["x = 4"] }, "X=4"));
  assert.ok(!preveriOdgovor({ tip: "besedilo", sprejemljivi: ["x = 4"] }, "x=5"));
});

test("vse naloge v naloge.json so veljavne", () => {
  const ids = new Set();
  for (const n of naloge) {
    assert.ok(!ids.has(n.id), `podvojen id ${n.id}`);
    ids.add(n.id);
    for (const polje of ["poglavje", "besedilo", "odgovor", "postopek"]) {
      assert.ok(n[polje], `${n.id}: manjka ${polje}`);
    }
    assert.doesNotThrow(() => preveriOdgovor(n.odgovor, ""), `${n.id}: neznan tip odgovora`);
  }
});
