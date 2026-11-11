import { test } from "node:test";
import assert from "node:assert/strict";
import { odgovorNaloge, preveriMaturitetni, parseVnos, steviloIzRezultata } from "../api/utils/matura-odgovor.js";
import { matura } from "../api/data/index.js";

const izbire = '<ol class="pola-izbire"><li><span class="izbira-crka">A</span></li><li><span class="izbira-crka">B</span></li><li><span class="izbira-crka">C</span></li><li><span class="izbira-crka">D</span></li></ol>';

test("vnos števila: decimalna vejica, ulomek, potenca 10, enota, x =", () => {
  assert.equal(parseVnos("3,5"), 3.5);
  assert.equal(parseVnos("7/2"), 3.5);
  assert.equal(parseVnos("−4"), -4);
  assert.ok(Math.abs(parseVnos("7,9·10^-5") - 7.9e-5) < 1e-15);
  assert.ok(Math.abs(parseVnos("7.9*10^(-5)") - 7.9e-5) < 1e-15);
  assert.ok(Math.abs(parseVnos("7,9e-5") - 7.9e-5) < 1e-15);
  assert.equal(parseVnos("2,5 m"), 2.5);
  assert.equal(parseVnos("x = 4"), 4);
  assert.ok(Number.isNaN(parseVnos("ne vem")));
});

test("število iz rezultata: samo ena vrednost, sicer primerjava z rešitvijo", () => {
  assert.deepEqual(steviloIzRezultata("h ≈ 10 m", { predmet: "fizika" }), { vrednost: 10, toleranca: 0.5 + 1e-12, enota: "m" });
  assert.equal(steviloIzRezultata("\\(x = \\dfrac{7}{2}\\)", { predmet: "matematika" }).vrednost, 3.5);
  assert.equal(steviloIzRezultata("[H<sub>3</sub>O<sup>+</sup>] = 7,9 · 10<sup>−5</sup> mol/L", { predmet: "kemija" }).vrednost, 7.9e-5);
  assert.equal(steviloIzRezultata("U<sub>1</sub> = 7,2 V, U<sub>23</sub> = 4,8 V", { predmet: "fizika" }), null);
  assert.equal(steviloIzRezultata("\\(x_1 = 3\\), \\(x_2 = -1\\)", { predmet: "matematika" }), null);
  assert.equal(steviloIzRezultata("\\(\\frac{x^2}{25} + \\frac{y^2}{16} = 1\\)", { predmet: "matematika" }), null);
  assert.equal(steviloIzRezultata("\\(m < -1\\)", { predmet: "matematika" }), null);
  assert.equal(steviloIzRezultata("1,2-dibromopropan", { predmet: "kemija" }), null);
  assert.equal(steviloIzRezultata("točke ležijo na premici", { predmet: "fizika" }), null);
});

test("izbirna naloga: ena ali več pravilnih črk", () => {
  const ena = { besedilo: izbire, rezultat: "<strong>B</strong> &nbsp; 20 m s<sup>−1</sup>" };
  assert.deepEqual(odgovorNaloge(ena, "fizika"), { tip: "izbira", pravilne: ["B"] });
  assert.equal(preveriMaturitetni(ena, "fizika", "b").pravilno, true);
  assert.equal(preveriMaturitetni(ena, "fizika", "C").pravilno, false);
  const vec = { besedilo: izbire, rezultat: "B, D in A" };
  assert.equal(preveriMaturitetni(vec, "informatika", ["D", "A", "B"]).pravilno, true);
  assert.equal(preveriMaturitetni(vec, "informatika", ["B", "D"]).pravilno, false);
});

test("naloga z več deli: številski deli se preverijo, ostali vrnejo rešitev", () => {
  const naloga = { besedilo: "<p>…</p>", rezultat: "<strong>2.1.</strong> h ≈ 10 m<br><strong>2.2.</strong> premica skozi izhodišče<br><strong>2.3.</strong> F = 57 N" };
  const o = preveriMaturitetni(naloga, "fizika", ["10,3", "premica", "50"]);
  assert.deepEqual(o.deli.map((d) => [d.oznaka, d.pravilno]), [["2.1.", true], ["2.2.", null], ["2.3.", false]]);
  assert.equal(o.deli[1].rezultat, "premica skozi izhodišče");
  assert.equal(o.pravilno, null);
});

test("vsaka naloga v polah ima odgovor, izbirne imajo pravilno črko", () => {
  let izbirnih = 0;
  for (const pola of matura) {
    for (const naloga of pola.naloge) {
      const o = odgovorNaloge(naloga, pola.predmet);
      if (naloga.tip === "izbirna") {
        assert.equal(o.tip, "izbira", `${pola.id} ${naloga.id}`);
        izbirnih++;
      }
      if (o.tip === "deli") assert.ok(o.deli.length >= 1 && o.deli.every((d) => d.rezultat), `${pola.id} ${naloga.id}`);
    }
  }
  assert.ok(izbirnih > 1800);
});
