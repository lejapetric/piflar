// Ustni del mature: vprašanja po snoveh, API in samoocena
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

process.env.JWT_SECRET = "testna-skrivnost";
const { default: app } = await import("../app.js");
const { ustni } = await import("../api/data/index.js");
const { default: Ustni, OCENE } = await import("../api/models/ustni.js");

const snovi = JSON.parse(readFileSync(new URL("../api/data/snovi.json", import.meta.url)));

let server, url;
before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  url = `http://localhost:${server.address().port}`;
});
after(() => server.close());

test("vprašanja: shema, edinstveni id-ji in vsaka snov matematike ima vsaj 7 vprašanj", () => {
  const slugi = new Set(snovi.filter((s) => s.predmet === "matematika").map((s) => s.slug));
  const ids = new Set();
  const poSnoveh = {};
  for (const v of ustni) {
    assert.ok(!ids.has(v.id), `podvojen id ${v.id}`);
    ids.add(v.id);
    assert.ok(v.vprasanje && v.odgovor, `${v.id}: manjka vprašanje ali odgovor`);
    assert.ok(["osnovna", "visja"].includes(v.raven), `${v.id}: raven ${v.raven}`);
    if (v.predmet === "matematika") {
      assert.ok(slugi.has(v.poglavje), `${v.id}: neznana snov ${v.poglavje}`);
      poSnoveh[v.poglavje] = (poSnoveh[v.poglavje] ?? 0) + 1;
    }
    // HTML v odgovoru: znak < mora biti zapisan kot &lt; (sicer ga brskalnik razume kot oznako)
    assert.ok(!/<(?![a-z\/])/.test(v.odgovor), `${v.id}: neubežan znak <`);
  }
  for (const slug of slugi) assert.ok((poSnoveh[slug] ?? 0) >= 7, `${slug}: samo ${poSnoveh[slug] ?? 0} vprašanj`);
});

test("GET /api/ustni filtrira po predmetu, snovi in ravni", async () => {
  const vsa = await (await fetch(`${url}/api/ustni?predmet=matematika`)).json();
  assert.equal(vsa.length, ustni.filter((v) => v.predmet === "matematika").length);
  const dve = await (await fetch(`${url}/api/ustni?predmet=matematika&poglavje=funkcije,stoznice`)).json();
  assert.ok(dve.length > 0 && dve.every((v) => ["funkcije", "stoznice"].includes(v.poglavje)));
  const osnovna = await (await fetch(`${url}/api/ustni?predmet=matematika&raven=osnovna`)).json();
  assert.ok(osnovna.length < vsa.length && osnovna.every((v) => v.raven === "osnovna"));
  const st = await (await fetch(`${url}/api/ustni/stevilo?predmet=matematika`)).json();
  assert.equal(st.skupaj, vsa.length);
  assert.equal(Object.values(st.poglavja).reduce((a, b) => a + b, 0), vsa.length);
});

test("samoocena in napredek sta samo za prijavljene", async () => {
  assert.equal((await fetch(`${url}/api/ustni/napredek`)).status, 401);
  const res = await fetch(`${url}/api/ustni/${ustni[0].id}/ocena`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ocena: "znam" }),
  });
  assert.ok([401, 503].includes(res.status));
});

test("model: ocena je lahko samo znam, negotovo ali ne_znam", () => {
  assert.deepEqual(OCENE, ["znam", "negotovo", "ne_znam"]);
  const z = new Ustni({ uporabnik: "64b000000000000000000001", vprasanje: "mat-u-mnozice-1", ocena: "negotovo" });
  assert.equal(z.validateSync(), undefined);
  z.ocena = "mogoce";
  assert.ok(z.validateSync()?.errors.ocena);
});

test("strani ustnega dela obstajajo", async () => {
  for (const pot of ["/views/matematika/ustni/ustni.html", "/views/matematika/ustni/kviz.html", "/components/ustni.js", "/style/ustni.css"]) {
    assert.equal((await fetch(url + pot)).status, 200, pot);
  }
});
