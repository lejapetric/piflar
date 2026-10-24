import { test } from "node:test";
import assert from "node:assert/strict";
import { imaPolniDostop, javneResenePole, lahkoVidiResitve } from "../api/utils/dostop.js";

const zdaj = new Date("2026-10-24");
const pola = (id, predmet, raven, leto, resena = true, rok = "spomladanski") => ({
  id, predmet, raven, leto, rok, naloge: resena ? [{ razlaga: "…" }] : [{}],
});

test("paketi: gost, osnovni (matematika, angleščina, slovenščina), premium, potekel paket", () => {
  assert.equal(imaPolniDostop(null, "matematika", zdaj), false);
  assert.equal(imaPolniDostop({ paket: "brezplacno" }, "matematika", zdaj), false);
  const osnovni = { paket: "osnovni" };
  assert.equal(imaPolniDostop(osnovni, "matematika", zdaj), true);
  assert.equal(imaPolniDostop(osnovni, "slovenscina", zdaj), true);
  assert.equal(imaPolniDostop(osnovni, "fizika", zdaj), false);
  assert.equal(imaPolniDostop({ paket: "premium" }, "fizika", zdaj), true);
  assert.equal(imaPolniDostop({ paket: "premium", paketVelja: "2026-01-01" }, "fizika", zdaj), false);
});

test("javna je samo zadnja rešena pola za vsak predmet in raven", () => {
  const pole = [
    pola("m-o-24", "matematika", "osnovna", 2024),
    pola("m-o-25", "matematika", "osnovna", 2025),
    pola("m-o-25j", "matematika", "osnovna", 2025, true, "jesenski"),
    pola("m-v-24", "matematika", "visja", 2024),
    pola("m-v-25", "matematika", "visja", 2025, false), // nerešena ne šteje
    pola("f-o-23", "fizika", "osnovna", 2023),
  ];
  assert.deepEqual([...javneResenePole(pole)].sort(), ["f-o-23", "m-o-25j", "m-v-24"]);

  const javne = javneResenePole(pole);
  assert.equal(lahkoVidiResitve(null, pole[0], javne, zdaj), false);
  assert.equal(lahkoVidiResitve(null, pole[2], javne, zdaj), true);
  assert.equal(lahkoVidiResitve({ paket: "osnovni" }, pole[0], javne, zdaj), true);
});
