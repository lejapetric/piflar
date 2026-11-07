// Celoten potek registracija → prijava → dostop → odjava prek HTTP.
// Baza je nadomeščena s seznamom v pomnilniku (MongoDB v testih ni na voljo).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

process.env.JWT_SECRET = "testna-skrivnost";
process.env.NODE_ENV ??= "test";
process.env.ZAKLEP = "1";
const { default: app } = await import("../app.js");
const { default: Uporabnik } = await import("../api/models/uporabnik.js");
const { default: Napredek } = await import("../api/models/napredek.js");
const eposta = await import("../api/utils/eposta.js");

const baza = [];
const zSelect = (v) => ({ select: () => v, then: (ok, err) => Promise.resolve(v).then(ok, err) });
Uporabnik.findOne = (q) =>
  zSelect(baza.find((u) => (q.email ? u.email === q.email : u.potrditevHash === q.potrditevHash)) ?? null);
Uporabnik.findById = (id) => zSelect(baza.find((u) => String(u._id) === String(id)) ?? null);
Uporabnik.prototype.save = async function () {
  if (baza.includes(this)) return this;
  if (baza.some((u) => u.email === this.email)) throw Object.assign(new Error("dup"), { code: 11000 });
  baza.push(this);
  return this;
};
Uporabnik.deleteOne = async (q) => {
  const i = baza.findIndex((u) => String(u._id) === String(q._id));
  if (i >= 0) baza.splice(i, 1);
};
const napredek = [];
Napredek.updateOne = async (filter, posodobitev) => {
  let z = napredek.find((n) => String(n.uporabnik) === String(filter.uporabnik) && n.naloga === filter.naloga);
  if (!z) napredek.push((z = { ...filter, ...posodobitev.$setOnInsert, poskusi: 0, reseno: false }));
  z.poskusi += posodobitev.$inc?.poskusi ?? 0;
  Object.assign(z, posodobitev.$set);
  if (posodobitev.$min && !z.resenoOb) Object.assign(z, posodobitev.$min);
};
Napredek.find = (filter) => {
  const v = napredek.filter((n) => String(n.uporabnik) === String(filter.uporabnik) && (!filter.poglavje || n.poglavje === filter.poglavje));
  return { select: () => ({ lean: async () => v }) };
};
Napredek.deleteMany = async (q) => {
  for (let i = napredek.length - 1; i >= 0; i--)
    if (String(napredek[i].uporabnik) === String(q.uporabnik)) napredek.splice(i, 1);
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
const zahteva = (metoda, pot, body, piskotek) =>
  fetch(url + pot, {
    method: metoda,
    headers: { "Content-Type": "application/json", ...(piskotek && { cookie: piskotek }) },
    body: JSON.stringify(body),
  });
const zetonIzEposte = () => eposta.zadnjaEposta.besedilo.match(/zeton=([\w-]+)/)[1];
const get = (pot, piskotek) => fetch(url + pot, { headers: piskotek ? { cookie: piskotek } : {} });
const piskotekIz = (res) => res.headers.get("set-cookie")?.split(";")[0];

test("registracija, potrditev e-naslova, prijava, dostop glede na paket, odjava", async () => {
  const geslo = "Skrivnost123";
  assert.equal((await post("/registracija", { ime: "Ana", priimek: "Novak", email: "ana@primer.si", geslo: "kratko" })).status, 400);
  assert.equal((await post("/registracija", { ime: "Ana", priimek: "Novak", email: "ana@primer.si", geslo: "skrivnost123" })).status, 400, "brez velike črke");
  assert.equal((await post("/registracija", { ime: "Ana", priimek: "Novak", email: "ana@primer.si", geslo: "Skrivnost" })).status, 400, "brez številke");
  assert.equal((await post("/registracija", { ime: "Ana", email: "ana@primer.si", geslo })).status, 400, "brez priimka");

  const reg = await post("/registracija", { ime: "Ana", priimek: "Novak", starost: "18", email: "Ana@Primer.si", geslo });
  assert.equal(reg.status, 201);
  assert.equal((await reg.json()).email, "ana@primer.si");
  assert.equal(reg.headers.get("set-cookie"), null, "pred potrditvijo ni prijave");
  assert.equal(baza[0].starost, 18);
  assert.equal(eposta.zadnjaEposta.za, "ana@primer.si");
  assert.match(eposta.zadnjaEposta.html, /Potrdi e-naslov/);

  // Ponovna registracija nepotrjenega e-naslova pošlje novo povezavo (stara ne velja več)
  const prvi = zetonIzEposte();
  const ponovna = await post("/registracija", { ime: "Ana", priimek: "Novak", starost: "18", email: "ana@primer.si", geslo });
  assert.equal(ponovna.status, 201);
  assert.equal(baza.length, 1);
  assert.notEqual(zetonIzEposte(), prvi);
  assert.equal((await post("/prijava", { email: "ana@primer.si", geslo: "napacno123" })).status, 401);
  const nepotrjen = await post("/prijava", { email: "ana@primer.si", geslo });
  assert.equal(nepotrjen.status, 403);
  assert.equal((await nepotrjen.json()).potrditev, true);

  // Nova povezava razveljavi staro
  const stari = zetonIzEposte();
  assert.equal((await post("/potrdi-email/ponovno", { email: "ana@primer.si" })).status, 200);
  assert.equal((await post("/potrdi-email", { zeton: stari })).status, 400);
  assert.equal((await post("/potrdi-email", { zeton: "x".repeat(43) })).status, 400);

  const potrditev = await post("/potrdi-email", { zeton: zetonIzEposte() });
  assert.equal(potrditev.status, 200);
  const potrjen = await potrditev.json();
  assert.equal(potrjen.emailPotrjen, true);
  assert.equal(potrjen.gesloHash, undefined);
  assert.equal(potrjen.potrditevHash, undefined);
  assert.match(potrditev.headers.get("set-cookie"), /HttpOnly/i);
  assert.equal((await (await get("/jaz", piskotekIz(potrditev))).json()).priimek, "Novak");

  assert.equal((await post("/registracija", { ime: "Ana", priimek: "Novak", email: "ana@primer.si", geslo })).status, 409);
  const prijava = await post("/prijava", { email: "ana@primer.si", geslo });
  assert.equal(prijava.status, 200);
  const piskotek = piskotekIz(prijava);

  assert.equal((await get("/jaz")).status, 401);
  assert.equal((await (await get("/jaz", piskotek)).json()).ime, "Ana");

  const zaklenjena = "/matura/matematika-osnovna-2024-spomladanski-1";
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, false);
  baza[0].paket = "osnovni";
  assert.equal((await (await get(zaklenjena, piskotek)).json()).odklenjena, true);

  assert.equal((await get("/jaz", "piflar_zeton=ponarejen")).status, 401);

  // Napredek: gost ga nima, prijavljenemu se shranijo poskusi in rešene naloge
  assert.equal((await get("/napredek")).status, 401);
  await post("/naloge/mnozice-2/odgovor", { odgovor: "6" }, piskotek);
  await post("/naloge/mnozice-2/odgovor", { odgovor: "7" }, piskotek);
  await post("/naloge/mnozice-3/odgovor", { odgovor: "8" }); // gost: se ne shrani
  const zapisi = await (await get("/napredek?poglavje=mnozice", piskotek)).json();
  assert.equal(zapisi.length, 1);
  assert.equal(zapisi[0].naloga, "mnozice-2");
  assert.equal(zapisi[0].poskusi, 2);
  assert.equal(zapisi[0].reseno, true);

  const odjava = await post("/odjava", {}, piskotek);
  assert.equal(odjava.status, 204);
  assert.match(odjava.headers.get("set-cookie"), /piflar_zeton=;/);
});

test("urejanje profila, nastavitve, sprememba gesla in izbris računa", async () => {
  const geslo = "Profil1234";
  await post("/registracija", { ime: "Bor", priimek: "Kos", email: "bor@primer.si", geslo });
  await post("/potrdi-email", { zeton: zetonIzEposte() });
  const piskotek = piskotekIz(await post("/prijava", { email: "bor@primer.si", geslo }));

  assert.equal((await zahteva("PATCH", "/jaz", { ime: "Bor" })).status, 401);
  assert.equal((await zahteva("PATCH", "/jaz", { letnik: 7 }, piskotek)).status, 400);
  assert.equal((await zahteva("PATCH", "/jaz", { tipSole: "fakulteta" }, piskotek)).status, 400);
  assert.equal((await zahteva("PATCH", "/jaz", { ime: " " }, piskotek)).status, 400);
  assert.equal((await zahteva("PATCH", "/jaz", { slika: "javascript:alert(1)" }, piskotek)).status, 400);

  const slika = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
  const res = await zahteva("PATCH", "/jaz", {
    ime: "Bor", priimek: "Kos", letnik: "4", tipSole: "srednja_strokovna", letoMature: "2027",
    ravenMatematike: "visja", sola: "Gimnazija Kranj", starost: "", slika, nastavitve: { novice: true },
  }, piskotek);
  assert.equal(res.status, 200);
  const u = await res.json();
  assert.equal(u.letnik, 4);
  assert.equal(u.tipSole, "srednja_strokovna");
  assert.equal(u.ravenMatematike, "visja");
  assert.equal(u.slika, slika);
  assert.equal(u.nastavitve.novice, true);
  assert.equal(u.nastavitve.opomniki, true);

  assert.equal((await post("/jaz/geslo", { staro: "napacno", novo: "Novo12345" }, piskotek)).status, 400);
  assert.equal((await post("/jaz/geslo", { staro: geslo, novo: "slabo" }, piskotek)).status, 400);
  assert.equal((await post("/jaz/geslo", { staro: geslo, novo: "Novo12345" }, piskotek)).status, 200);
  assert.equal((await post("/prijava", { email: "bor@primer.si", geslo: "Novo12345" })).status, 200);

  assert.equal((await zahteva("DELETE", "/jaz", { geslo }, piskotek)).status, 400);
  assert.equal((await zahteva("DELETE", "/jaz", { geslo: "Novo12345" }, piskotek)).status, 204);
  assert.equal(baza.some((x) => x.email === "bor@primer.si"), false);
  assert.equal((await post("/prijava", { email: "bor@primer.si", geslo: "Novo12345" })).status, 401);
});

test("star račun brez polja emailPotrjen se lahko prijavi", async () => {
  const star = new Uporabnik({ ime: "Star", email: "star@primer.si" });
  await star.nastaviGeslo("staro123");
  baza.push(star);
  assert.equal((await post("/prijava", { email: "star@primer.si", geslo: "staro123" })).status, 200);
});

test("napaka pri pošiljanju e-pošte ne podre registracije", async () => {
  const fetchPrej = globalThis.fetch;
  process.env.RESEND_API_KEY = "re_test";
  globalThis.fetch = async (u, o) =>
    String(u).startsWith("https://api.resend.com")
      ? new Response('{"message":"You can only send testing emails to your own email address"}', { status: 403 })
      : fetchPrej(u, o);
  const napakePrej = console.error;
  const izpis = [];
  console.error = (...a) => izpis.push(a.join(" "));
  try {
    const res = await post("/registracija", { ime: "Eva", priimek: "Zupan", email: "eva@primer.si", geslo: "Geslo1234" });
    assert.equal(res.status, 201);
    assert.equal((await res.json()).poslano, false);
    assert.match(izpis.join("\n"), /403[\s\S]*potrdi\.html\?zeton=/);
  } finally {
    globalThis.fetch = fetchPrej;
    console.error = napakePrej;
    delete process.env.RESEND_API_KEY;
  }
});
