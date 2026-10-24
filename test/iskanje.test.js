// Iskanje po snovi: indeks besedila strani in API /api/iskanje.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { zlozi, razcleni, zgradiIndeks, isci, povezava } from "../api/utils/iskanje.js";
import ctrl from "../api/controllers/iskanje.js";

const STRAN = `<!DOCTYPE html><html><head><title>x</title></head><body>
<div class="view">
  <header class="page-header"><span class="page-eyebrow">Matematika · Snov · 4.11</span><h1>Stožnice</h1></header>
  <nav class="kazalo"><a href="#sklop-1">Krožnica</a></nav>
  <section id="sklop-1"><h2>Krožnica</h2>
    <p>Krožnica je množica točk \\(T(x, y)\\), ki so enako oddaljene od središča.</p>
    <svg><text>krožnica na sliki</text></svg>
    <div id="tip-1"><h4>Tip 1: Enačba krožnice</h4><p>Krožnica s središčem v izhodišču.</p></div>
  </section>
</div>
<footer>krožnica v nogi</footer>
</body></html>`;

async function zZacasnoStranjo(fn) {
  const mapa = await mkdtemp(join(tmpdir(), "piflar-iskanje-"));
  try {
    await writeFile(join(mapa, "stoznice_razlaga.html"), STRAN);
    await writeFile(join(mapa, "prazna.html"), "");
    return await fn(await zgradiIndeks(mapa));
  } finally {
    await rm(mapa, { recursive: true, force: true });
  }
}

function poklici(query) {
  return new Promise((resolve, reject) => {
    const res = {
      status(s) { this.s = s; return this; },
      json(body) { resolve({ status: this.s, body }); return this; },
    };
    ctrl.iskanje({ query }, res, reject);
  });
}

test("zlozi odstrani strešice in ohrani dolžino niza", () => {
  assert.equal(zlozi("Krožnica ČŠŽ đ"), "kroznica csz d");
  assert.equal(zlozi("Šestkotnik").length, "Šestkotnik".length);
});

test("razcleni izpusti formule, slike, kazalo in vse zunaj .view", () => {
  const r = razcleni(STRAN);
  assert.match(r.S, /množica točk/);
  assert.doesNotMatch(r.S, /T\(x, y\)/);
  assert.doesNotMatch(r.S, /na sliki/);
  assert.doesNotMatch(r.S, /v nogi/);
  assert.equal((r.S.match(/Krožnica/gi) ?? []).length, 3); // h2, odstavek, odstavek v tipu
  assert.match(r.D, /T\(x, y\)/); // prikazno besedilo formule obdrži
  assert.deepEqual(r.razponi.map((x) => [x.id, x.naslov]), [["sklop-1", "Krožnica"], ["tip-1", "Tip 1: Enačba krožnice"]]);
});

test("zadetek pove poglavje, razdelek, sidro in zaporedno številko v sidru", () =>
  zZacasnoStranjo((strani) => {
    assert.equal(strani.length, 1); // prazna datoteka se preskoči
    const zadetki = isci(strani, "kroznic");
    assert.equal(zadetki.length, 4); // tudi "krožnice" v naslovu tipa
    for (const z of zadetki) {
      assert.equal(z.poglavje, "4.11 Stožnice");
      assert.equal(z.predmet, "Matematika");
      assert.equal(z.zadetek.toLowerCase().slice(0, 7), "krožnic");
    }
    const vTipu = zadetki.filter((z) => z.sidro === "tip-1").sort((a, b) => a.polozaj - b.polozaj);
    assert.deepEqual(vTipu.map((z) => z.k), [0, 1]);
    assert.equal(vTipu[1].razdelek, "Krožnica › Tip 1: Enačba krožnice");
    assert.equal(povezava(vTipu[1], " krožnic "), `${vTipu[1].url}?isci=kro%C5%BEnic&k=1#tip-1`);
  }));

test("iskanje več besed ujame tudi presledke in prelome vrstic", () =>
  zZacasnoStranjo((strani) => {
    assert.equal(isci(strani, "enako   oddaljene").length, 1);
    assert.equal(isci(strani, "ni na strani").length, 0);
  }));

test("API: prekratka poizvedba vrne prazen rezultat", async () => {
  const { status, body } = await poklici({ q: " k " });
  assert.equal(status, 200);
  assert.deepEqual(body, { q: "k", skupaj: 0, zadetki: [] });
});

test("API: predlogi vrnejo največ en zadetek na razdelek in povezavo nanj", async () => {
  const vsi = await poklici({ q: "krožnica" });
  assert.ok(vsi.body.skupaj > 10);
  const predlogi = await poklici({ q: "krožnica", predlogi: "1", omejitev: "8" });
  assert.equal(predlogi.body.skupaj, vsi.body.skupaj);
  assert.ok(predlogi.body.zadetki.length <= 8);
  const kljuci = predlogi.body.zadetki.map((z) => `${z.url}#${z.sidro}`);
  assert.equal(new Set(kljuci).size, kljuci.length);
  for (const z of predlogi.body.zadetki) assert.ok(z.povezava.startsWith(`${z.url}?isci=`));
});
