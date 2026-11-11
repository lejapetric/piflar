import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { preveriOdgovor, parseStevilo } from "../api/utils/preveri-odgovor.js";
import { naloge } from "../api/data/index.js";

const snovi = JSON.parse(readFileSync(new URL("../api/data/snovi.json", import.meta.url)));
const vaje = naloge.filter((n) => n.id.includes("-v"));

test("izbira: pravilna je črka, velike in male črke ter presledki niso pomembni", () => {
  const odg = { tip: "izbira", pravilna: "B" };
  assert.ok(preveriOdgovor(odg, "B"));
  assert.ok(preveriOdgovor(odg, " b "));
  assert.ok(!preveriOdgovor(odg, "A"));
  assert.ok(!preveriOdgovor(odg, ""));
});

test("števila: znanstveni zapis, enote in nesmiselni vnosi", () => {
  assert.equal(parseStevilo("2,8e5"), 280000);
  assert.ok(Math.abs(parseStevilo("7,9·10^-5") - 7.9e-5) < 1e-15);
  assert.equal(parseStevilo("2,5 m"), 2.5);
  assert.equal(parseStevilo("x = 4"), 4);
  assert.equal(parseStevilo("12 %"), 12);
  assert.ok(Number.isNaN(parseStevilo("abc")));
});

test("naloge za vajo: shema, težavnost in raven", () => {
  assert.ok(vaje.length > 10000, `premalo nalog za vajo: ${vaje.length}`);
  for (const n of vaje) {
    assert.ok(Number.isInteger(n.tezavnost) && n.tezavnost >= 1 && n.tezavnost <= 4, `${n.id}: težavnost ${n.tezavnost}`);
    assert.ok(["osnovna", "visja"].includes(n.raven), `${n.id}: raven ${n.raven}`);
    assert.ok(n.rezultat, `${n.id}: manjka rezultat`);
    assert.ok(n.postopek, `${n.id}: manjka postopek`);
  }
});

test("naloge za vajo: pravilni odgovor je sprejet", () => {
  for (const n of vaje) {
    const o = n.odgovor;
    if (o.tip === "izbira") {
      assert.ok(Array.isArray(n.moznosti) && n.moznosti.length >= 2, `${n.id}: premalo možnosti`);
      assert.equal(new Set(n.moznosti).size, n.moznosti.length, `${n.id}: podvojena možnost`);
      const i = o.pravilna.charCodeAt(0) - 65;
      assert.ok(i >= 0 && i < n.moznosti.length, `${n.id}: pravilna ${o.pravilna} ni med možnostmi`);
      assert.ok(preveriOdgovor(o, o.pravilna.toLowerCase()), n.id);
    } else if (o.tip === "stevilo") {
      assert.ok(Number.isFinite(o.vrednost), `${n.id}: vrednost ni število`);
      assert.ok(preveriOdgovor(o, String(o.vrednost)), `${n.id}: ${o.vrednost} ni sprejet`);
    } else if (o.tip === "besedilo") {
      assert.ok(o.sprejemljivi.length > 0, `${n.id}: ni sprejemljivih odgovorov`);
      assert.ok(preveriOdgovor(o, o.sprejemljivi[0]), n.id);
    }
  }
});

test("naloge za vajo: vsaka snov ima vsaj 50 nalog in svojo stran", () => {
  const stevec = {};
  for (const n of vaje) stevec[`${n.predmet}/${n.poglavje}`] = (stevec[`${n.predmet}/${n.poglavje}`] ?? 0) + 1;
  const predmeti = new Set(vaje.map((n) => n.predmet));
  for (const s of snovi.filter((x) => predmeti.has(x.predmet))) {
    const k = `${s.predmet}/${s.slug}`;
    assert.ok((stevec[k] ?? 0) >= 50, `${k}: le ${stevec[k] ?? 0} nalog`);
    const stran = new URL(`../public/views/${s.predmet}/snov/${s.slug}/${s.slug}_naloge.html`, import.meta.url);
    assert.ok(existsSync(stran), `${k}: manjka stran z nalogami`);
  }
});

test("naloge za vajo: besedila so v snovi edinstvena", () => {
  const videne = new Set();
  for (const n of vaje) {
    const k = `${n.predmet}/${n.poglavje}/${n.besedilo}`;
    assert.ok(!videne.has(k), `${n.id}: podvojeno besedilo`);
    videne.add(k);
  }
});
