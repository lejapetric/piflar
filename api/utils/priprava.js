// api/utils/priprava.js
// Tedenska priprava na maturo: izračuni brez baze (tedni po slovenskem času, zgradba strani
// z razlago, kdaj je sklop predelan, izbira snovi za teden, priporočen tempo).
// Kontroler (controllers/priprava.js) jih uporabi s podatki iz baze, testi pa neposredno.
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const VIEWS_DIR = fileURLToPath(new URL("../../public/views", import.meta.url));

// Koliko pravilno rešenih nalog iz snovi je cilj tedna (ali vse, če jih ima snov manj)
export const CILJ_NALOG = 8;
// Delež sklopov, ki jih mora dijak predelati, da šteje razlaga za predelano
export const PRAG_BRANJA = 0.75;
// Delež videa, ki ga mora pogledati, da šteje sklop za predelan
export const PRAG_VIDEA = 0.8;
export const NAJVEC_TEMPO = 5;
// Toliko tednov pred maturo naj bo vsa snov predelana (ostane čas za ponavljanje)
export const TEDNI_ZA_PONAVLJANJE = 3;

// ------------------------------------------------------------
// Tedni (ponedeljek–nedelja po času v Ljubljani)
// ------------------------------------------------------------
const CAS_LJ = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Ljubljana",
  year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  hourCycle: "h23",
});

function deliLj(datum) {
  const d = Object.fromEntries(CAS_LJ.formatToParts(datum).map((p) => [p.type, p.value]));
  return { y: +d.year, m: +d.month, d: +d.day, h: +d.hour, min: +d.minute, s: +d.second };
}

// Koliko ms je Ljubljana pred UTC ob danem trenutku (3600000 pozimi, 7200000 poleti)
function zamikLj(datum) {
  const p = deliLj(datum);
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.min, p.s) - Math.floor(datum.getTime() / 1000) * 1000;
}

const dvomestno = (n) => String(n).padStart(2, "0");
const vNiz = (y, m, d) => `${y}-${dvomestno(m)}-${dvomestno(d)}`;

// "YYYY-MM-DD" (koledarski dan v Ljubljani) → trenutek polnoči tega dne v Ljubljani
export function polnocLj(dan) {
  const [y, m, d] = dan.split("-").map(Number);
  const utc = Date.UTC(y, m - 1, d);
  let t = utc - zamikLj(new Date(utc));
  t = utc - zamikLj(new Date(t)); // ob prehodu na poletni čas popravi še enkrat
  return new Date(t);
}

// Današnji koledarski dan v Ljubljani kot "YYYY-MM-DD"
export function danesLj(datum = new Date()) {
  const p = deliLj(datum);
  return vNiz(p.y, p.m, p.d);
}

// Prišteje dneve koledarskemu dnevu "YYYY-MM-DD"
export function pristejDni(dan, n) {
  const [y, m, d] = dan.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return vNiz(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

// Ponedeljek tedna, v katerem je trenutek (po času v Ljubljani), kot "YYYY-MM-DD"
export function zacetekTedna(datum = new Date()) {
  const p = deliLj(datum);
  const danVTednu = (new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay() + 6) % 7; // 0 = ponedeljek
  return pristejDni(vNiz(p.y, p.m, p.d), -danVTednu);
}

// Meje tedna: od ponedeljka 00:00 do naslednjega ponedeljka 00:00 (izključno)
export function mejeTedna(zacetek) {
  return { od: polnocLj(zacetek), do: polnocLj(pristejDni(zacetek, 7)) };
}

// ------------------------------------------------------------
// Zgradba strani z razlago: sklopi, število besed, ali ima sklop video
// ------------------------------------------------------------
export function potRazlage(predmet, slug) {
  return join(VIEWS_DIR, predmet, "snov", slug, `${slug}_razlaga.html`);
}

export function imaRazlago(predmet, slug) {
  return /^[a-z_]+$/.test(predmet) && /^[a-z0-9_]+$/.test(slug) && existsSync(potRazlage(predmet, slug));
}

const besedilo = (html) =>
  html
    .replace(/<(script|style|svg|nav|video)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");

// Najkrajši čas branja sklopa: okoli 5 besed na sekundo (hitro, a pozorno branje), vsaj 20 s, največ 3 min
export const najmanjCasa = (besede) => Math.min(180, Math.max(20, Math.round(besede / 5)));

// HTML strani → [{ id: "sklop-1", naslov, besede, minCas, video, visja }]
export function zgradbaIzHtml(html) {
  const odpiranja = [...html.matchAll(/<section\b[^>]*class="sklop\b[^"]*"[^>]*>/g)];
  return odpiranja.map((m, i) => {
    const id = m[0].match(/\bid="([^"]+)"/)?.[1];
    const konec = i + 1 < odpiranja.length ? odpiranja[i + 1].index : html.length;
    let del = html.slice(m.index, konec);
    const zaprtje = del.indexOf("</section>");
    if (zaprtje > 0) del = del.slice(0, zaprtje);
    const besede = besedilo(del).split(/\s+/).filter((b) => /[\p{L}\p{N}]/u.test(b)).length;
    const naslov = besedilo(del.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/)?.[1] ?? "").replace(/\s+/g, " ").trim();
    const visja = /class="sklop\b[^"]*\bsklop--visja\b/.test(m[0]);
    return { id, naslov, besede, minCas: najmanjCasa(besede), video: /<video\b/.test(del), visja };
  }).filter((s) => s.id);
}

const predpomnilnik = new Map();
export function zgradbaStrani(predmet, slug) {
  const kljuc = `${predmet}/${slug}`;
  if (!predpomnilnik.has(kljuc)) {
    let zgradba = [];
    if (imaRazlago(predmet, slug)) zgradba = zgradbaIzHtml(readFileSync(potRazlage(predmet, slug), "utf-8"));
    predpomnilnik.set(kljuc, zgradba);
  }
  return predpomnilnik.get(kljuc);
}

// ------------------------------------------------------------
// Predelanost razlage
// ------------------------------------------------------------
// Sklop je predelan, če ga je dijak dovolj dolgo bral (aktiven zavihek, sklop na zaslonu)
// ali pogledal vsaj 80 % videa.
export function sklopPredelan(sklop, stanje) {
  if (!stanje) return false;
  if ((stanje.cas ?? 0) >= sklop.minCas) return true;
  const trajanje = stanje.trajanje ?? 0;
  return sklop.video && trajanje >= 10 && (stanje.video ?? 0) >= PRAG_VIDEA * trajanje;
}

// zgradba: [{id, minCas, video}], sklopi: [{id, cas, video, trajanje}]
export function povzetekBranja(zgradba, sklopi = []) {
  const poId = new Map(sklopi.map((s) => [s.id, s]));
  const podrobno = zgradba.map((s) => {
    const st = poId.get(s.id);
    return {
      id: s.id,
      naslov: s.naslov,
      minCas: s.minCas,
      video: s.video,
      cas: Math.round(st?.cas ?? 0),
      gledano: Math.round(st?.video ?? 0),
      trajanje: Math.round(st?.trajanje ?? 0),
      predelan: sklopPredelan(s, st),
    };
  });
  const predelani = podrobno.filter((s) => s.predelan).length;
  const potrebno = Math.max(1, Math.ceil(PRAG_BRANJA * zgradba.length));
  return {
    skupaj: zgradba.length,
    predelani,
    potrebno,
    predelano: zgradba.length > 0 && predelani >= potrebno,
    sklopi: podrobno,
  };
}

// Prištej poročilo iz brskalnika (prirastki v sekundah). Prirastki skupaj ne smejo preseči
// časa, ki je minil od zadnjega poročila (video do 2×, ker ga lahko gleda pospešeno).
export function pristejBranje(obstojeci, porocilo, { zgradba, sekundOdZadnjega }) {
  const veljavni = new Set(zgradba.map((s) => s.id));
  const dovoljeno = Math.min(60, Math.max(0, sekundOdZadnjega ?? Infinity) + 5);
  const st = (v, max) => (Number.isFinite(+v) ? Math.min(Math.max(+v, 0), max) : 0);
  const prirastki = (Array.isArray(porocilo) ? porocilo : [])
    .filter((p) => p && veljavni.has(p.id))
    .slice(0, 100)
    .map((p) => ({ id: p.id, cas: st(p.cas, 60), video: st(p.video, 120), trajanje: st(p.trajanje, 3600) }));
  const vsotaCas = prirastki.reduce((a, p) => a + p.cas, 0);
  const vsotaVideo = prirastki.reduce((a, p) => a + p.video, 0);
  const kCas = vsotaCas > dovoljeno ? dovoljeno / vsotaCas : 1;
  const kVideo = vsotaVideo > 2 * dovoljeno ? (2 * dovoljeno) / vsotaVideo : 1;

  const sklopi = new Map((obstojeci ?? []).map((s) => [s.id, { id: s.id, cas: s.cas ?? 0, video: s.video ?? 0, trajanje: s.trajanje ?? 0 }]));
  for (const p of prirastki) {
    const s = sklopi.get(p.id) ?? { id: p.id, cas: 0, video: 0, trajanje: 0 };
    s.cas += p.cas * kCas;
    s.video += p.video * kVideo;
    s.trajanje = Math.max(s.trajanje, p.trajanje);
    sklopi.set(p.id, s);
  }
  return [...sklopi.values()];
}

// ------------------------------------------------------------
// Načrt
// ------------------------------------------------------------
// Snovi izbranih predmetov izmenično (matematika 1, fizika 1, matematika 2 …), vsak predmet v
// vrstnem redu kataloga. kandidati: [{predmet, slug}] v vrstnem redu snovi.json.
export function izmenicno(kandidati, predmeti) {
  const vrste = predmeti.map((p) => kandidati.filter((s) => s.predmet === p));
  const izid = [];
  for (let i = 0; vrste.some((v) => i < v.length); i++) for (const v of vrste) if (i < v.length) izid.push(v[i]);
  return izid;
}

// Število tednov od zacetek (ponedeljek) do maturiteta (Date), brez tednov za ponavljanje
export function tedniDoMature(zacetek, datumMature) {
  if (!datumMature) return null;
  const dni = (new Date(datumMature) - polnocLj(zacetek)) / 86_400_000;
  return Math.floor(dni / 7);
}

// Koliko snovi na teden je treba predelati, da bo vse predelano 3 tedne pred maturo
export function priporocenTempo(preostale, tedni) {
  if (!preostale) return 1;
  if (tedni == null) return 2;
  const na = Math.max(1, tedni - TEDNI_ZA_PONAVLJANJE);
  return Math.min(NAJVEC_TEMPO, Math.max(1, Math.ceil(preostale / na)));
}

// Kdaj je snov opravljena: razlaga predelana in rešenih vsaj `cilj` nalog. Vrne čas, ko je bil
// izpolnjen zadnji pogoj, ali null. reseneOb: časi prvih rešitev nalog iz snovi.
export function casOpravljene({ predelanoOb, reseneOb = [], cilj }) {
  if (!predelanoOb) return null;
  if (!cilj) return new Date(predelanoOb);
  const casi = reseneOb.map((d) => new Date(d).getTime()).sort((a, b) => a - b);
  if (casi.length < cilj) return null;
  return new Date(Math.max(new Date(predelanoOb).getTime(), casi[cilj - 1]));
}

// Zaporedni opravljeni tedni do vključno prejšnjega tedna (in tega, če je že opravljen).
// tedni: [{ zacetek, opravljen }], trenutni: "YYYY-MM-DD"
export function niz(tedni, trenutni) {
  const opravljeni = new Set(tedni.filter((t) => t.opravljen).map((t) => t.zacetek));
  let n = opravljeni.has(trenutni) ? 1 : 0;
  for (let t = pristejDni(trenutni, -7); opravljeni.has(t); t = pristejDni(t, -7)) n++;
  return n;
}

// ------------------------------------------------------------
// Koledar mature (uradni datumi RIC iz data/koledar-mature.json)
// ------------------------------------------------------------
export const ROKI = ["spomladanski", "jesenski"];

// Leto mature: iz profila, sicer konec tega šolskega leta (od julija naprej naslednje leto)
export function letoMature(uporabnik, zdaj = new Date()) {
  if (uporabnik?.letoMature) return uporabnik.letoMature;
  const { y, m } = deliLj(zdaj);
  return m >= 7 ? y + 1 : y;
}

// Datumi mature za izbrane predmete: { vrsta, leto, rok, vir, zacetek, izpiti, mejniki } ali null,
// če za to leto in rok podatkov še ni. Poklicna matura, če so vsi predmeti poklicni.
export function maturaZa(koledar, { predmeti = [], leto, rok = "spomladanski" }) {
  const vrsta = predmeti.length && predmeti.every((p) => p.startsWith("poklicna_")) ? "poklicna" : "splosna";
  const podatki = koledar?.[leto]?.[vrsta];
  const k = podatki?.[rok];
  if (!k) return null;
  const izpiti = [];
  for (const predmet of predmeti) {
    const v = k.izpiti?.[predmet];
    if (typeof v === "string") izpiti.push({ predmet, datum: v, opis: null });
    else if (Array.isArray(v)) for (const i of v) izpiti.push({ predmet, datum: i.datum, opis: i.opis ?? null });
    else if (k.ostali) izpiti.push({ predmet, datum: k.ostali.od, do: k.ostali.do, opis: null, opomba: k.ostali.opis });
  }
  izpiti.sort((a, b) => a.datum.localeCompare(b.datum));
  const mejniki = [];
  if (k.prijava) mejniki.push({ vrsta: "rok", datum: k.prijava, opis: "Zadnji dan za prijavo na maturo" });
  if (k.zacetek) mejniki.push({ vrsta: "zacetek", datum: k.zacetek, opis: k.zacetekOpis ?? "Začetek mature" });
  if (k.ustni) mejniki.push({ vrsta: "ustni", datum: k.ustni.od, do: k.ustni.do, opis: "Ustni izpiti" });
  if (k.rezultati) mejniki.push({ vrsta: "rezultati", datum: k.rezultati, opis: "Rezultati mature" });
  const prvi = [k.zacetek, ...izpiti.map((i) => i.datum)].filter(Boolean).sort()[0];
  return { vrsta, leto, rok, vir: podatki.vir, zacetek: prvi, izpiti, mejniki };
}
