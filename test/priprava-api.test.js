// Tedenska priprava: kontroler z modeli v pomnilniku (brez prave baze).
import { test, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import Priprava from "../api/models/priprava.js";
import Branje from "../api/models/branje.js";
import Napredek from "../api/models/napredek.js";
import ctrl from "../api/controllers/priprava.js";
import { zgradbaStrani, zacetekTedna, pristejDni } from "../api/utils/priprava.js";

const uporabnik = { _id: new mongoose.Types.ObjectId(), ravenMatematike: "visja", letoMature: 2027 };
let baza;

// Poizvedba, ki podpira .select() in .lean() ter await
const poizvedba = (vrednost) => {
  const q = {
    select: () => q,
    lean: () => Promise.resolve(vrednost && JSON.parse(JSON.stringify(vrednost))),
    then: (ok, ne) => Promise.resolve(vrednost).then(ok, ne),
  };
  return q;
};
const ujema = (doc, pogoj) => Object.entries(pogoj).every(([k, v]) => String(doc[k]) === String(v));

beforeEach(() => {
  baza = { priprava: [], branje: [], napredek: [] };
  mock.method(Priprava, "findOne", (p) => poizvedba(baza.priprava.find((d) => ujema(d, p)) ?? null));
  mock.method(Priprava.prototype, "save", async function () {
    if (!baza.priprava.includes(this)) baza.priprava.push(this);
    return this;
  });
  mock.method(Branje, "find", (p) => poizvedba(baza.branje.filter((d) => ujema(d, p))));
  mock.method(Branje, "findOne", (p) => poizvedba(baza.branje.find((d) => ujema(d, p)) ?? null));
  mock.method(Branje.prototype, "save", async function () {
    if (!baza.branje.includes(this)) baza.branje.push(this);
    return this;
  });
  mock.method(Napredek, "find", (p) => poizvedba(baza.napredek.filter((d) => ujema(d, { uporabnik: p.uporabnik }) && d.reseno)));
});

async function klic(fn, { body, query } = {}) {
  let status = 200, telo;
  const res = { status: (s) => ((status = s), res), json: (t) => ((telo = t), res) };
  await fn({ uporabnik, body, query }, res);
  return { status, telo: JSON.parse(JSON.stringify(telo ?? null)) };
}

test("brez načrta vrne predmete in privzete nastavitve", async () => {
  const { telo } = await klic(ctrl.pripravaGet);
  assert.equal(telo.nastavitve, null);
  assert.ok(telo.predmeti.includes("matematika"));
  assert.equal(telo.privzeto.datumMature, "2027-05-01");
});

test("nastavitve so preverjene", async () => {
  assert.equal((await klic(ctrl.pripravaPut, { body: { predmeti: [], tempo: 1 } })).status, 400);
  assert.equal((await klic(ctrl.pripravaPut, { body: { predmeti: ["izmisljen"], tempo: 1 } })).status, 400);
  assert.equal((await klic(ctrl.pripravaPut, { body: { predmeti: ["matematika"], tempo: 9 } })).status, 400);
  assert.equal((await klic(ctrl.pripravaPut, { body: { predmeti: ["matematika"], tempo: 1, datumMature: "jutri" } })).status, 400);
});

test("načrt: snovi tedna, branje, naloge in opravljen teden", async () => {
  let { status, telo } = await klic(ctrl.pripravaPut, { body: { predmeti: ["matematika", "fizika"], tempo: 2, datumMature: "2027-05-01" } });
  assert.equal(status, 200);
  assert.deepEqual(telo.teden.snovi.map((s) => s.predmet), ["matematika", "fizika"], "predmeta izmenično");
  const [mat] = telo.teden.snovi;
  assert.equal(mat.slug, "osnove_logike");
  assert.equal(mat.branje.predelano, false);
  assert.equal(mat.naloge.cilj, 8);
  assert.match(mat.nalogeUrl, /^\/views\/matematika\/naloge\/naloge\.html\?snov=osnove_logike/);
  assert.ok(telo.drugeSnovi.length > 10);
  assert.ok(telo.tedniDoMature > 0);

  // Branje: prirastki se omejijo, po dovolj časa je razlaga predelana
  const zgradba = zgradbaStrani("matematika", "osnove_logike");
  const odg = await klic(ctrl.branjePost, { body: { predmet: "matematika", slug: "osnove_logike", sklopi: [{ id: zgradba[0].id, cas: 500 }] } });
  assert.equal(odg.status, 200);
  assert.equal(odg.telo.sklopi[0].cas, 60, "prvo poročilo največ 60 s");
  const b = baza.branje[0];
  b.sklopi = zgradba.map((s) => ({ id: s.id, cas: s.minCas, video: 0, trajanje: 0 }));
  b.zadnjaPosodobitev = new Date(Date.now() - 20_000);
  const odg2 = await klic(ctrl.branjePost, { body: { predmet: "matematika", slug: "osnove_logike", sklopi: [] } });
  assert.equal(odg2.telo.predelano, true);
  assert.ok(b.predelanoOb);

  // Naloge: 8 rešenih iz snovi (ena maturitetna nalog šteje v svojo snov)
  for (let i = 0; i < 8; i++)
    baza.napredek.push({ uporabnik: uporabnik._id, naloga: `x-${i}`, vir: "vaja", predmet: "matematika", poglavje: "osnove_logike", poglavja: ["osnove_logike"], reseno: true, resenoOb: new Date() });
  ({ telo } = await klic(ctrl.pripravaGet));
  const mat2 = telo.teden.snovi.find((s) => s.slug === "osnove_logike");
  assert.equal(mat2.opravljena, true);
  assert.equal(mat2.naloge.reseno, 8);
  assert.equal(telo.teden.opravljen, false, "fizika še ni opravljena");
  assert.equal(telo.skupno.opravljene, 1);

  // Zamenjava fizike z drugo snovjo
  const fiz = telo.teden.snovi.find((s) => s.predmet === "fizika");
  const nova = telo.drugeSnovi.find((s) => s.predmet === "fizika");
  ({ telo } = await klic(ctrl.pripravaZamenjaj, { body: { iz: `fizika/${fiz.slug}`, v: `fizika/${nova.slug}` } }));
  assert.ok(telo.teden.snovi.some((s) => s.slug === nova.slug));
  assert.equal((await klic(ctrl.pripravaZamenjaj, { body: { iz: "fizika/ni", v: "fizika/x" } })).status, 400);
});

test("nov teden: neopravljena snov se prenese, opravljena ne", async () => {
  const prejsnji = pristejDni(zacetekTedna(), -7);
  const p = new Priprava({
    uporabnik: uporabnik._id, predmeti: ["matematika"], tempo: 2,
    tedni: [{ zacetek: prejsnji, snovi: [{ predmet: "matematika", slug: "funkcije" }, { predmet: "matematika", slug: "osnove_logike" }] }],
  });
  baza.priprava.push(p);
  // osnove_logike opravljena (cilj 8 rešenih + predelano)
  baza.branje.push(Object.assign(new Branje({ uporabnik: uporabnik._id, predmet: "matematika", slug: "osnove_logike" }), { predelanoOb: new Date(Date.now() - 864e5 * 9) }));
  for (let i = 0; i < 8; i++)
    baza.napredek.push({ uporabnik: uporabnik._id, naloga: `y-${i}`, vir: "vaja", predmet: "matematika", poglavje: "osnove_logike", poglavja: ["osnove_logike"], reseno: true, resenoOb: new Date(Date.now() - 864e5 * 8) });
  const { telo } = await klic(ctrl.pripravaGet);
  assert.deepEqual(telo.teden.snovi.map((s) => s.slug), ["funkcije", "mnozice"]);
  assert.equal(telo.zgodovina[0].zacetek, prejsnji);
  assert.equal(telo.zgodovina[0].opravljen, false);
  assert.equal(telo.niz, 0);
});

test("na osnovni ravni matematike sklopi višje ravni ne štejejo", async () => {
  const osnovna = { ...uporabnik, ravenMatematike: "osnovna" };
  let status, telo;
  const res = { status: (s) => ((status = s), res), json: (t) => ((telo = t), res) };
  await ctrl.branjeGet({ uporabnik: osnovna, query: { predmet: "matematika", slug: "mnozice" } }, res);
  assert.equal(status, 200);
  const vse = zgradbaStrani("matematika", "mnozice");
  assert.equal(telo.skupaj, vse.filter((s) => !s.visja).length);
  assert.ok(telo.skupaj < vse.length);
  await ctrl.branjeGet({ uporabnik: osnovna, query: { predmet: "matematika", slug: "../x" } }, res);
  assert.equal(status, 404);
});
