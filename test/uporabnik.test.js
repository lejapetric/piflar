import { test } from "node:test";
import assert from "node:assert/strict";
import Uporabnik from "../api/models/uporabnik.js";

test("geslo se shrani kot hash in ga je mogoče preveriti", async () => {
  const u = new Uporabnik({ ime: "Ana", email: " Ana@Primer.si " });
  await u.nastaviGeslo("skrivnost123");
  assert.notEqual(u.gesloHash, "skrivnost123");
  assert.equal(await u.preveriGeslo("skrivnost123"), true);
  assert.equal(await u.preveriGeslo("napacno"), false);
  assert.equal(u.email, "ana@primer.si");
  assert.equal(u.paket, "brezplacno");
  assert.equal("gesloHash" in u.toJSON(), false);
});

test("osnovni paket ima največ 3 predmete in samo znane predmete", () => {
  const u = new Uporabnik({ ime: "Ana", email: "a@b.si", gesloHash: "x", paket: "osnovni" });
  u.predmeti = ["matematika", "fizika"];
  assert.equal(u.validateSync(), undefined);
  u.predmeti = ["kemija"];
  assert.ok(u.validateSync()?.errors);
  u.predmeti = ["matematika", "fizika", "matematika", "fizika"];
  assert.ok(u.validateSync()?.errors);
});
