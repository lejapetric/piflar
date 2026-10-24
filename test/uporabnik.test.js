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

test("paket je lahko samo brezplacno, osnovni ali premium", () => {
  const u = new Uporabnik({ ime: "Ana", email: "a@b.si", gesloHash: "x", paket: "osnovni" });
  assert.equal(u.validateSync(), undefined);
  u.paket = "zlati";
  assert.ok(u.validateSync()?.errors.paket);
});
