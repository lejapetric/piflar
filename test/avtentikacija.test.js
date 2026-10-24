// Celoten potek registracija → prijava → dostop → odjava prek HTTP.
// Baza je nadomeščena s seznamom v pomnilniku (MongoDB v testih ni na voljo).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

process.env.JWT_SECRET = "testna-skrivnost";
const { default: app } = await import("../app.js");
const { default: Uporabnik } = await import("../api/models/uporabnik.js");

const baza = [];
const zSelect = (v) => ({ select: () => v, then: (ok, err) => Promise.resolve(v).then(ok, err) });
Uporabnik.findOne = (q) => zSelect(baza.find((u) => u.email === q.email) ?? null);
Uporabnik.findById = async (id) => baza.find((u) => String(u._id) === id) ?? null;
Uporabnik.prototype.save = async function () {
  if (baza.some((u) => u.email === this.email)) throw Object.assign(new Error("dup"), { code: 11000 });
  baza.push(this);
  return this;
};
Object.defineProperty(mongoose.connection, "readyState", { get: () => 1, configurable: true });

let server, url;
before(async () => {
  server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  url = `http://localhost:${server.address().port}/api`;
});
after(() => server.close());

const post = (pot, body, piskotek) =>
  fetch(url + pot, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(piskotek && { cookie: piskotek }) },
    body: JSON.stringify(body),
  });
const get = (pot, piskotek) => fetch(url + pot, { headers: piskotek ? { cookie: piskotek } : {} });
const piskotekIz = (res) => res.headers.get("set-cookie")?.split(";")[0];

test("registracija, prijava, dostop glede na paket, odjava", async () => {
  assert.equal((await post("/registracija", { ime: "Ana", email: "ana@primer.si", geslo: "kratko" })).status, 400);

  const reg = await post("/registracija", { ime: "Ana", email: "Ana@Primer.si", geslo: "skrivnost123" });
  assert.equal(reg.status, 201);
  const telo = await reg.json();
  assert.equal(telo.email, "ana@primer.si");
  assert.equal(telo.gesloHash, undefined);
  assert.match(reg.headers.get("set-cookie"), /HttpOnly/i);

  assert.equal((await post("/registracija", { ime: "Ana", email: "ana@primer.si", geslo: "skrivnost123" })).status, 409);
  assert.equal((await post("/prijava", { email: "ana@primer.si", geslo: "napacno123" })).status, 401);

  const prijava = await post("/prijava", { email: "ana@primer.si", geslo: "skrivnost123" });
  assert.equal(prijava.status, 200);
  const piskotek = piskotekIz(prijava);

  assert.equal((await get("/jaz")).status, 401);
  assert.equal((await (await get("/jaz", piskotek)).json()).ime, "Ana");

  const zaklenjena = "/matura/primer-matematika-osnovna-2024-spomladanski";
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, false);
  baza[0].paket = "osnovni";
  baza[0].predmeti = ["matematika"];
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, true);

  assert.equal((await get("/jaz", "piflar_zeton=ponarejen")).status, 401);

  const odjava = await post("/odjava", {}, piskotek);
  assert.equal(odjava.status, 204);
  assert.match(odjava.headers.get("set-cookie"), /piflar_zeton=;/);
});
