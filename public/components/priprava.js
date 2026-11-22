// public/components/priprava.js
// Stran Sprotno učenje (priprava.html): glava na tabli z odštevanjem do mature, snovi tega tedna
// kot seznam opravil (predelaj razlago, reši naloge), stenski koledar do mature z opravljenimi
// tedni in uradnimi datumi izpitov (RIC) ter nastavitve načrta (predmeti, tempo, rok mature).
// Podatki so iz /api/priprava (controllers/priprava.js).

const koren = document.getElementById("priprava");
const glavaStrani = document.getElementById("pripravaGlava");

const PREDMETI = {
  matematika: "Matematika", fizika: "Fizika", kemija: "Kemija", biologija: "Biologija",
  informatika: "Informatika", geografija: "Geografija", zgodovina: "Zgodovina",
  slovenscina: "Slovenščina", anglescina: "Angleščina", nemscina: "Nemščina",
  francoscina: "Francoščina", italijanscina: "Italijanščina", spanscina: "Španščina",
  psihologija: "Psihologija", sociologija: "Sociologija", filozofija: "Filozofija",
  ekonomija: "Ekonomija", glasba: "Glasba", umetnostna_zgodovina: "Umetnostna zgodovina",
  poklicna_matematika: "Matematika", poklicna_slovenscina: "Slovenščina", poklicna_kemija: "Kemija",
};
const imePredmeta = (p) => PREDMETI[p] ?? p.replaceAll("_", " ");
const opisIzpita = (i) => i.opis ?? imePredmeta(i.predmet);

const MESECI = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
const DNEVI = ["pon", "tor", "sre", "čet", "pet", "sob", "ned"];

function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function povezava(href, besedilo, razred) {
  const a = el("a", razred, besedilo);
  a.href = href;
  return a;
}

function gumb(besedilo, razred, ob) {
  const g = el("button", razred, besedilo);
  g.type = "button";
  if (ob) g.addEventListener("click", ob);
  return g;
}

const sklon = (n, ena, dve, tri, pet) => {
  const d = n % 100;
  return `${n} ${d === 1 ? ena : d === 2 ? dve : d === 3 || d === 4 ? tri : pet}`;
};
const besediloSnovi = (n) => sklon(n, "snov", "snovi", "snovi", "snovi");
const besediloTednov = (n) => sklon(n, "teden", "tedna", "tedne", "tednov");
const besediloDni = (n) => sklon(n, "dan", "dneva", "dni", "dni");
const brezStevila = (s) => s.replace(/^\d+ /, "");

// ------------------------------------------------------------
// Koledarski dnevi kot "YYYY-MM-DD" (računano v UTC, da ni težav s poletnim časom)
// ------------------------------------------------------------
const vDatum = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const vNiz = (d) => d.toISOString().slice(0, 10);
const plus = (s, n) => {
  const d = vDatum(s);
  d.setUTCDate(d.getUTCDate() + n);
  return vNiz(d);
};
const razlikaDni = (od, doo) => Math.round((vDatum(doo) - vDatum(od)) / 86_400_000);
const ponedeljek = (s) => plus(s, -((vDatum(s).getUTCDay() + 6) % 7));
const kratekDatum = (s) => {
  const d = vDatum(s);
  return `${d.getUTCDate()}. ${d.getUTCMonth() + 1}.`;
};
const lokalniDanes = () => {
  const z = new Date();
  return vNiz(new Date(Date.UTC(z.getFullYear(), z.getMonth(), z.getDate())));
};

async function zahteva(metoda, url, telo) {
  const res = await fetch(url, {
    method: metoda,
    headers: telo ? { "Content-Type": "application/json" } : {},
    body: telo ? JSON.stringify(telo) : undefined,
  });
  const podatki = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(podatki.message ?? "Napaka"), { status: res.status });
  return podatki;
}

function trak(vrednost, najvec, oznaka) {
  const t = el("div", "sp-trak");
  t.setAttribute("role", "progressbar");
  t.setAttribute("aria-valuemin", "0");
  t.setAttribute("aria-valuemax", String(najvec));
  t.setAttribute("aria-valuenow", String(Math.min(vrednost, najvec)));
  t.setAttribute("aria-label", oznaka);
  const p = el("span");
  p.style.width = `${najvec ? Math.min(100, (vrednost / najvec) * 100) : 100}%`;
  t.append(p);
  return t;
}

// ------------------------------------------------------------
// Glava na tabli
// ------------------------------------------------------------
function glavaUvod() {
  const vsebina = el("div", "sp-glava-levo");
  vsebina.append(el("span", "page-eyebrow", "Sprotno učenje"));
  vsebina.append(el("h1", "", "Do mature sproti, ne zadnji mesec"));
  vsebina.append(el("p", "", "Vsak teden dobiš nekaj snovi: najprej predelaj razlago (preberi jo ali poglej videe), nato reši naloge iz te snovi. Na koledarju vidiš, koliko časa je še do mature."));
  glavaStrani.replaceChildren(vsebina);
}

function stevec(st, opis, razred = "") {
  const s = el("div", `sp-stevec${razred ? ` sp-stevec--${razred}` : ""}`);
  s.append(el("strong", "", st), el("span", "", opis));
  return s;
}

function glavaNacrta(p, danes, datumMature) {
  const levo = el("div", "sp-glava-levo");
  levo.append(el("span", "page-eyebrow", "Sprotno učenje"));
  const h1 = el("h1");
  if (datumMature && razlikaDni(danes, datumMature) > 0) {
    const dni = razlikaDni(danes, datumMature);
    h1.append("Do mature še ", el("span", "sp-glava-st", String(dni)), ` ${brezStevila(besediloDni(dni))}`);
  } else if (datumMature) {
    h1.textContent = "Matura je tu. Srečno!";
  } else {
    h1.textContent = "Do mature sproti";
  }
  levo.append(h1);

  const m = p.matura;
  if (m) {
    const izpiti = el("ul", "sp-glava-izpiti");
    const zacetek = m.mejniki.find((x) => x.vrsta === "zacetek");
    const vrstice = [
      ...(zacetek && !m.izpiti.some((i) => i.datum === zacetek.datum) ? [[zacetek.datum, m.vrsta === "splosna" && m.rok === "spomladanski" ? "esej, začetek mature" : "začetek mature"]] : []),
      ...m.izpiti.map((i) => [i.datum, opisIzpita(i)]),
    ];
    for (const [datum, opis] of vrstice) {
      const li = el("li");
      li.append(el("b", "", kratekDatum(datum)), ` ${opis.charAt(0).toLowerCase()}${opis.slice(1)}`);
      izpiti.append(li);
    }
    levo.append(izpiti);
  }

  const desno = el("div", "sp-glava-desno");
  desno.append(stevec(String(p.niz), `${brezStevila(besediloTednov(p.niz))} zapored opravljen${p.niz === 1 ? "" : p.niz === 2 ? "a" : p.niz <= 4 ? "i" : "ih"}`, p.niz ? "ok" : ""));
  desno.append(stevec(`${p.skupno.opravljene}/${p.skupno.vse}`, "snovi predelanih"));
  if (p.tedniDoMature != null) {
    const t = Math.max(0, p.tedniDoMature);
    desno.append(stevec(String(t), `${brezStevila(besediloTednov(t))} do mature`));
  }
  glavaStrani.classList.add("sp-glava");
  glavaStrani.replaceChildren(levo, desno);
}

// ------------------------------------------------------------
// Ta teden: seznam opravil
// ------------------------------------------------------------
function opravilo({ opravljeno, naslov, opis, vrednost, najvec, akcija, naVrsti }) {
  const o = el("div", `sp-opravilo${opravljeno ? " sp-opravilo--ok" : ""}${!opravljeno && !naVrsti ? " sp-opravilo--caka" : ""}`);
  const kljukica = el("span", "sp-kljukica");
  kljukica.setAttribute("aria-hidden", "true");
  if (opravljeno) kljukica.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 13 l5 5 L20 5"/></svg>';
  const sredina = el("div", "sp-opravilo-sred");
  const vrsta = el("div", "sp-opravilo-vrsta");
  vrsta.append(el("strong", "", naslov), el("span", "", opis));
  sredina.append(vrsta, trak(vrednost, najvec, naslov));
  o.append(kljukica, sredina);
  if (akcija) o.append(povezava(akcija.href, akcija.besedilo, `btn ${naVrsti ? "btn-primary" : "btn-secondary"} sp-gumb`));
  return o;
}

function zamenjava(s, podatki) {
  const z = el("details", "priprava-zamenjava");
  z.append(el("summary", "", "Zamenjaj snov"));
  const izbira = el("select");
  izbira.setAttribute("aria-label", "Nova snov");
  for (const d of podatki.drugeSnovi) {
    const o = el("option", "", `${imePredmeta(d.predmet)}: ${[d.stevilka, d.naslov].filter(Boolean).join(" ")}`);
    o.value = `${d.predmet}/${d.slug}`;
    izbira.append(o);
  }
  const g = gumb("Zamenjaj", "btn btn-secondary sp-gumb", async () => {
    g.disabled = true;
    try {
      izrisiNacrt(await zahteva("POST", "/api/priprava/zamenjaj", { iz: `${s.predmet}/${s.slug}`, v: izbira.value }));
    } catch (err) {
      g.disabled = false;
      g.textContent = err.message;
    }
  });
  const vrsta = el("div", "priprava-zamenjava-vrsta");
  vrsta.append(izbira, g);
  z.append(vrsta);
  return z;
}

function snovTedna(s, podatki) {
  const k = el("article", `sp-snov${s.opravljena ? " sp-snov--opravljena" : ""}`);
  const glava = el("div", "sp-snov-glava");
  glava.append(el("span", "sp-snov-predmet", imePredmeta(s.predmet)));
  const naslov = [s.stevilka, s.naslov].filter(Boolean).join(" ");
  glava.append(s.url ? povezava(s.url, naslov, "sp-snov-naslov") : el("span", "sp-snov-naslov", naslov));
  if (s.opravljena) glava.append(el("span", "sp-znacka", "✓ opravljeno"));
  k.append(glava);

  const b = s.branje;
  k.append(opravilo({
    opravljeno: b.predelano,
    naslov: "Predelaj razlago",
    opis: `${Math.min(b.predelani, b.potrebno)} od ${b.potrebno} sklopov`,
    vrednost: b.predelani,
    najvec: b.potrebno,
    akcija: s.url && !b.predelano ? { href: s.url, besedilo: b.predelani ? "Nadaljuj" : "Odpri razlago" } : null,
    naVrsti: true,
  }));
  const n = s.naloge;
  if (n.cilj) {
    const resene = n.reseno >= n.cilj;
    k.append(opravilo({
      opravljeno: resene,
      naslov: "Reši naloge",
      opis: `${n.reseno} od ${n.cilj} rešenih`,
      vrednost: n.reseno,
      najvec: n.cilj,
      akcija: resene ? null : { href: s.nalogeUrl, besedilo: "Reši naloge" },
      naVrsti: b.predelano,
    }));
    if (!b.predelano && !resene && b.predelani === 0)
      k.append(el("p", "priprava-namig", "Naloge šele po razlagi: tako jih rešiš sam, ne po spominu iz postopkov."));
  }
  if (!s.opravljena && podatki.drugeSnovi.length) k.append(zamenjava(s, podatki));
  return k;
}

function taTeden(p) {
  const { teden, niz, skupno } = p;
  const s = el("section", "sp-teden sp-list");
  s.setAttribute("aria-labelledby", "spTedenNaslov");
  const glava = el("div", "sp-teden-glava");
  const naslov = el("div", "sp-teden-naslov");
  const h2 = el("h2", "", `${kratekDatum(teden.zacetek)} – ${kratekDatum(teden.konec)}`);
  h2.id = "spTedenNaslov";
  naslov.append(el("span", "sp-roka", "ta teden"), h2);
  glava.append(naslov);

  const koraki = teden.snovi.flatMap((x) => [x.branje.predelano, ...(x.naloge.cilj ? [x.naloge.reseno >= x.naloge.cilj] : [])]);
  if (teden.snovi.length) {
    glava.append(el("span", `sp-rok${teden.opravljen ? " sp-rok--ok" : ""}`,
      teden.opravljen ? "✓ teden opravljen" : teden.preostaloDni <= 1 ? "zadnji dan!" : `še ${besediloDni(teden.preostaloDni)}`));
    const opr = koraki.filter(Boolean).length;
    const krog = el("div", "sp-krog");
    krog.style.setProperty("--delez", String(koraki.length ? (opr / koraki.length) * 100 : 0));
    krog.setAttribute("role", "img");
    krog.setAttribute("aria-label", `Opravljenih ${opr} od ${koraki.length} korakov`);
    krog.append(el("strong", "", `${opr}/${koraki.length}`), el("span", "", "korakov"));
    glava.append(krog);
  }
  s.append(glava);

  if (!teden.snovi.length) {
    const t = el("p", "", skupno.vse && skupno.opravljene >= skupno.vse
      ? "Vsa snov izbranih predmetov je opravljena. Zdaj ponavljaj: "
      : "Ta teden nimaš snovi. Izberi več predmetov v nastavitvah ali ponavljaj: ");
    t.append(povezava("/napredek.html", "neuspešne naloge"), ".");
    s.append(t);
  } else {
    if (teden.opravljen)
      s.append(el("p", "priprava-pohvala", niz > 1 ? `Odlično, to je že ${besediloTednov(niz)} zapored. Naslednji teden dobiš nove snovi.` : "Odlično! Naslednji teden dobiš nove snovi. Ostani v ritmu."));
    for (const x of teden.snovi) s.append(snovTedna(x, p));
  }

  const noga = el("div", "sp-teden-noga");
  noga.append(el("span", "", "Kar ne opraviš do nedelje, se prenese v naslednji teden."));
  noga.append(gumb("Nastavitve načrta", "sp-povezava", () => {
    const n = document.getElementById("spNastavitve");
    n.open = true;
    n.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  s.append(noga);
  return s;
}

// ------------------------------------------------------------
// Stenski koledar
// ------------------------------------------------------------
const LEGENDA = {
  ok: "teden opravljen", ne: "teden ni opravljen", zdaj: "ta teden", ponavljanje: "ponavljanje",
  izpit: "tvoj izpit", zacetek: "začetek mature", rok: "rok za prijavo", ustni: "ustni izpiti",
};
const KRATKO = { zacetek: "esej", rok: "prijava", ustni: "ustni", rezultati: "rezultati" };

// Stanje tedna (ponedeljek) na koledarju
function stanjeTedna(p, pon, zacetekMature) {
  const z = p.zgodovina.find((t) => t.zacetek === pon);
  if (z) return z.opravljen ? "ok" : "ne";
  if (pon === p.teden.zacetek) return p.teden.opravljen ? "ok" : "zdaj";
  if (pon < p.teden.zacetek) return "";
  if (zacetekMature) {
    if (pon >= ponedeljek(zacetekMature)) return "";
    if (pon >= plus(ponedeljek(zacetekMature), -21)) return "ponavljanje";
  }
  return "plan";
}

function dogodkiDne(m, dan) {
  if (!m) return [];
  const izid = [];
  for (const i of m.izpiti) {
    if (i.datum === dan) izid.push({ vrsta: "izpit", opis: i.do ? `${opisIzpita(i)} (${i.opomba ?? `do ${kratekDatum(i.do)}`})` : opisIzpita(i), kratko: imePredmeta(i.predmet), prvi: true });
  }
  for (const x of m.mejniki) {
    const vObdobju = x.do && dan > x.datum && dan <= x.do;
    if (x.datum === dan || vObdobju) izid.push({ vrsta: x.vrsta, opis: x.opis, kratko: KRATKO[x.vrsta], prvi: x.datum === dan });
  }
  return izid;
}

function mesec(p, leto, m, danes, zacetekMature) {
  const box = el("div", "sp-mesec");
  box.append(el("h3", "sp-mesec-ime", `${MESECI[m]} ${leto}`));
  const mreza = el("div", "sp-mreza");
  mreza.setAttribute("role", "grid");
  mreza.setAttribute("aria-label", `${MESECI[m]} ${leto}`);
  const glava = el("div", "sp-vrsta");
  glava.setAttribute("role", "row");
  glava.append(el("span", "sp-tst"));
  for (const d of DNEVI) {
    const h = el("span", "sp-dan-ime", d);
    h.setAttribute("role", "columnheader");
    glava.append(h);
  }
  mreza.append(glava);

  const prvi = vNiz(new Date(Date.UTC(leto, m, 1)));
  for (let pon = ponedeljek(prvi); vDatum(pon).getUTCMonth() === m || pon < prvi; pon = plus(pon, 7)) {
    const st = stanjeTedna(p, pon, zacetekMature);
    const vrsta = el("div", "sp-vrsta");
    vrsta.setAttribute("role", "row");
    const oznaka = el("span", `sp-tst${st ? ` sp-tst--${st}` : ""}`, st === "ok" ? "✓" : st === "ne" ? "✗" : st === "zdaj" ? "●" : "");
    const opisTedna = { ok: "Teden opravljen", ne: "Teden ni bil opravljen", zdaj: "Ta teden" }[st];
    if (opisTedna) oznaka.title = opisTedna;
    vrsta.append(oznaka);
    for (let i = 0; i < 7; i++) {
      const dan = plus(pon, i);
      const vMesecu = vDatum(dan).getUTCMonth() === m;
      const c = el("span", "sp-dan");
      c.setAttribute("role", "gridcell");
      if (!vMesecu) {
        c.classList.add("sp-dan--izven");
        vrsta.append(c);
        continue;
      }
      if (st) c.classList.add(`sp-dan--${st}`);
      if (i >= 5) c.classList.add("sp-dan--vikend");
      if (dan === danes) {
        c.classList.add("sp-dan--danes");
        c.setAttribute("aria-current", "date");
      }
      c.append(el("b", "", String(vDatum(dan).getUTCDate())));
      const dogodki = dogodkiDne(p.matura, dan);
      for (const e of dogodki) {
        c.classList.add(`sp-dan--${e.vrsta}`);
        if (e.prvi) c.append(el("small", "", e.kratko));
      }
      const opisi = [opisTedna, ...dogodki.map((e) => e.opis)].filter(Boolean);
      if (opisi.length) c.title = opisi.join(" · ");
      c.setAttribute("aria-label", [`${vDatum(dan).getUTCDate()}. ${MESECI[m]}`, ...opisi].join(", "));
      vrsta.append(c);
    }
    mreza.append(vrsta);
  }
  box.append(mreza);
  return box;
}

function koledar(p, danes, zacetekMature) {
  const s = el("section", "sp-koledar sp-list");
  s.setAttribute("aria-labelledby", "spKoledarNaslov");
  s.append(el("div", "sp-spirala"));
  const glava = el("div", "sp-koledar-glava");
  const h2 = el("h2", "", "Koledar do mature");
  h2.id = "spKoledarNaslov";
  glava.append(h2);

  // Meseci od začetka načrta do zadnjega izpita (ali rezultatov)
  const zacetek = [p.zacetekNacrta ?? p.teden.zacetek, danes].sort()[0];
  const m = p.matura;
  const konecDatumi = m ? [...m.izpiti.map((i) => i.do ?? i.datum), ...m.mejniki.filter((x) => x.vrsta !== "rezultati").map((x) => x.do ?? x.datum)] : [];
  const konec = [...konecDatumi, zacetekMature ?? plus(danes, 60)].filter(Boolean).sort().at(-1);
  const indeks = (s) => vDatum(s).getUTCFullYear() * 12 + vDatum(s).getUTCMonth();
  const prviMesec = indeks(zacetek), zadnjiMesec = Math.max(indeks(konec), indeks(danes) + 1);
  const naEnkrat = window.matchMedia("(max-width: 820px)").matches ? 1 : 2;
  let trenutni = Math.min(indeks(danes), zadnjiMesec - naEnkrat + 1);

  const nav = el("div", "sp-nav");
  const nazaj = gumb("‹", "sp-nav-gumb", () => premakni(trenutni - 1));
  nazaj.setAttribute("aria-label", "Prejšnji mesec");
  const naprej = gumb("›", "sp-nav-gumb", () => premakni(trenutni + 1));
  naprej.setAttribute("aria-label", "Naslednji mesec");
  const danesG = gumb("danes", "sp-povezava", () => premakni(indeks(danes)));
  const naMaturo = gumb("skoči na maturo", "sp-povezava", () => premakni(indeks(zacetekMature)));
  nav.append(nazaj, naprej, danesG);
  if (zacetekMature) nav.append(naMaturo);
  glava.append(nav);
  s.append(glava);

  const meseci = el("div", "sp-meseci");
  meseci.setAttribute("aria-live", "polite");
  function premakni(i) {
    trenutni = Math.max(prviMesec, Math.min(i, zadnjiMesec - naEnkrat + 1));
    const izris = [];
    for (let k = 0; k < naEnkrat; k++) {
      const x = trenutni + k;
      izris.push(mesec(p, Math.floor(x / 12), x % 12, danes, zacetekMature));
    }
    meseci.replaceChildren(...izris);
    nazaj.disabled = trenutni <= prviMesec;
    naprej.disabled = trenutni >= zadnjiMesec - naEnkrat + 1;
  }
  premakni(trenutni);
  s.append(meseci);

  const vrste = ["ok", "ne", "zdaj", ...(zacetekMature ? ["ponavljanje"] : []), ...(m ? ["izpit", "zacetek", "rok", "ustni"].filter((v) => v === "izpit" ? m.izpiti.length : m.mejniki.some((x) => x.vrsta === v)) : [])];
  const legenda = el("ul", "sp-legenda");
  for (const v of vrste) {
    const li = el("li");
    li.append(el("i", `sp-leg sp-leg--${v}`), LEGENDA[v]);
    legenda.append(li);
  }
  s.append(legenda);

  if (m) {
    const vir = el("p", "sp-vir");
    const a = povezava(m.vir, `Državni izpitni center (RIC), koledar ${m.vrsta === "poklicna" ? "poklicne" : "splošne"} mature ${m.leto}`);
    a.target = "_blank";
    a.rel = "noopener";
    vir.append(`Datumi ${m.rok === "jesenski" ? "jesenskega" : "spomladanskega"} roka: `, a, ". Zadnje 3 tedne pred maturo so namenjeni ponavljanju.");
    if (m.izpiti.some((i) => i.do)) vir.append(" Točen dan izpitov iz tujih jezikov in izbirnih predmetov v jesenskem roku ti sporoči šola.");
    s.append(vir);
  } else {
    s.append(el("p", "sp-vir", `Uradnih datumov mature za leto ${p.leto} še ni. Odštevamo do datuma iz nastavitev.`));
  }
  return s;
}

// ------------------------------------------------------------
// Nastavitve načrta
// ------------------------------------------------------------
function obrazecNastavitev({ predmeti, izbrani, tempo, rok, datumMature, priporocen, novNacrt, imaKoledar, leto }) {
  const obrazec = el("form", "racun-kartica priprava-nastavitve");
  obrazec.noValidate = true;
  obrazec.append(el("h2", "", novNacrt ? "Sestavi svoj načrt" : "Nastavitve načrta"));
  if (novNacrt)
    obrazec.append(el("p", "", "Izberi predmete, ki jih pišeš na maturi. Snovi bodo razporejene po tednih v vrstnem redu kataloga, datume izpitov pa vzamemo iz uradnega koledarja mature."));

  const skupine = [
    ["Splošna matura", predmeti.filter((p) => !p.startsWith("poklicna_"))],
    ["Poklicna matura", predmeti.filter((p) => p.startsWith("poklicna_"))],
  ].filter(([, s]) => s.length);
  for (const [ime, seznam] of skupine) {
    const skupina = el("fieldset", "priprava-predmeti");
    skupina.append(el("legend", "", ime));
    for (const p of seznam) {
      const label = el("label", "priprava-predmet");
      const vnos = el("input");
      vnos.type = "checkbox";
      vnos.name = "predmet";
      vnos.value = p;
      vnos.checked = izbrani.includes(p);
      label.append(vnos, el("span", "", imePredmeta(p)));
      skupina.append(label);
    }
    obrazec.append(skupina);
  }

  const vrsta = el("div", "prijava-polja-vrsta");
  const rokPolje = el("label", "prijava-polje");
  rokPolje.append(el("span", "", `Rok mature ${leto ?? ""}`.trim()));
  const rokIzbira = el("select");
  rokIzbira.name = "rok";
  for (const [v, t] of [["spomladanski", "Spomladanski (maj, junij)"], ["jesenski", "Jesenski (avgust)"]]) {
    const o = el("option", "", t);
    o.value = v;
    o.selected = v === (rok ?? "spomladanski");
    rokIzbira.append(o);
  }
  rokPolje.append(rokIzbira);
  if (leto) rokPolje.append(el("small", "", "Leto mature spremeniš v profilu (Uredi podatke)."));
  vrsta.append(rokPolje);

  // Ročni datum le, če za leto mature še ni uradnega koledarja
  let datumVnos = null;
  if (!imaKoledar) {
    const datum = el("label", "prijava-polje");
    datum.append(el("span", "", "Datum mature"));
    datumVnos = el("input");
    datumVnos.type = "date";
    datumVnos.name = "datumMature";
    datumVnos.value = datumMature ? String(datumMature).slice(0, 10) : "";
    datum.append(datumVnos, el("small", "", "Uradnega koledarja za to leto še ni. Vpiši prvi dan mature (približno začetek maja)."));
    vrsta.append(datum);
  }

  const tempoPolje = el("label", "prijava-polje");
  tempoPolje.append(el("span", "", "Snovi na teden"));
  const izbira = el("select");
  izbira.name = "tempo";
  for (let i = 1; i <= 5; i++) {
    const o = el("option", "", besediloSnovi(i));
    o.value = String(i);
    o.selected = i === tempo;
    izbira.append(o);
  }
  tempoPolje.append(izbira);
  if (priporocen) tempoPolje.append(el("small", "", `Priporočeno: ${besediloSnovi(priporocen)} na teden.`));
  vrsta.append(tempoPolje);
  obrazec.append(vrsta);

  const napaka = el("p", "prijava-sporocilo");
  napaka.setAttribute("role", "status");
  napaka.hidden = true;
  const shrani = el("button", "btn btn-primary", novNacrt ? "Začni s pripravo" : "Shrani nastavitve");
  shrani.type = "submit";
  obrazec.append(napaka, shrani);

  obrazec.addEventListener("submit", async (e) => {
    e.preventDefault();
    napaka.hidden = true;
    const izbraniPredmeti = [...obrazec.querySelectorAll('input[name="predmet"]:checked')].map((v) => v.value);
    shrani.disabled = true;
    try {
      const telo = { predmeti: izbraniPredmeti, tempo: Number(izbira.value), rok: rokIzbira.value };
      if (datumVnos) telo.datumMature = datumVnos.value || null;
      izrisiNacrt(await zahteva("PUT", "/api/priprava", telo));
      glavaStrani.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      napaka.textContent = err.message;
      napaka.hidden = false;
    } finally {
      shrani.disabled = false;
    }
  });
  return obrazec;
}

// ------------------------------------------------------------
// Celotna stran
// ------------------------------------------------------------
function izrisiNacrt(podatki) {
  if (!podatki.nastavitve) {
    glavaUvod();
    koren.replaceChildren(obrazecNastavitev({
      predmeti: podatki.predmeti,
      izbrani: podatki.privzeto.predmeti,
      tempo: 2,
      rok: podatki.privzeto.rok,
      datumMature: podatki.privzeto.datumMature,
      novNacrt: true,
      imaKoledar: podatki.imaKoledar,
      leto: podatki.leto,
    }));
    return;
  }
  const { skupno, priporocenTempo, nastavitve } = podatki;
  const danes = podatki.danes ?? lokalniDanes();
  const zacetekMature = podatki.matura?.zacetek ?? (nastavitve.datumMature ? String(nastavitve.datumMature).slice(0, 10) : null);

  glavaNacrta(podatki, danes, zacetekMature);

  const deli = [];
  if (priporocenTempo > nastavitve.tempo && skupno.opravljene < skupno.vse) {
    const opozorilo = el("div", "priprava-opozorilo");
    opozorilo.append(el("p", "", `S tem tempom (${besediloSnovi(nastavitve.tempo)} na teden) ne boš predelal vse snovi vsaj 3 tedne pred maturo. Priporočamo ${besediloSnovi(priporocenTempo)} na teden.`));
    const g = gumb(`Nastavi ${besediloSnovi(priporocenTempo)} na teden`, "btn btn-secondary sp-gumb", async () => {
      g.disabled = true;
      izrisiNacrt(await zahteva("PUT", "/api/priprava", { predmeti: nastavitve.predmeti, tempo: priporocenTempo, rok: nastavitve.rok }));
    });
    opozorilo.append(g);
    deli.push(opozorilo);
  }
  deli.push(taTeden(podatki), koledar(podatki, danes, zacetekMature));

  const kako = el("details", "racun-kartica priprava-kako");
  kako.append(el("summary", "", "Kako se šteje napredek?"));
  const ul = el("ul");
  for (const t of [
    "Razlaga je predelana, ko predelaš vsaj tri četrtine sklopov. Sklop šteje, ko je dovolj dolgo na zaslonu, medtem ko si na strani (bereš, drsiš), ali ko pogledaš vsaj 80 % njegovega videa. Preskakovanje videa in odprt zavihek v ozadju ne štejeta.",
    "Naloge štejejo, ko jih prvič rešiš pravilno: naloge za vajo in maturitetne naloge iz te snovi.",
    "Snov, ki je ne opraviš, se prenese v naslednji teden. Teden je opravljen, ko do nedelje opraviš vse snovi tedna.",
  ]) ul.append(el("li", "", t));
  kako.append(ul);
  deli.push(kako);

  const nastavitveK = el("details", "priprava-nastavitve-ovoj");
  nastavitveK.id = "spNastavitve";
  nastavitveK.append(el("summary", "btn btn-secondary", "Spremeni predmete, tempo ali rok mature"));
  nastavitveK.append(obrazecNastavitev({
    predmeti: podatki.vsiPredmeti ?? nastavitve.predmeti,
    izbrani: nastavitve.predmeti,
    tempo: nastavitve.tempo,
    rok: nastavitve.rok,
    datumMature: nastavitve.datumMature,
    priporocen: priporocenTempo,
    imaKoledar: Boolean(podatki.matura),
    leto: podatki.leto,
  }));
  deli.push(nastavitveK);

  koren.replaceChildren(...deli);
}

async function init() {
  if (!koren) return;
  try {
    izrisiNacrt(await zahteva("GET", "/api/priprava"));
  } catch (err) {
    if (err.status === 401 || err.status === 503) {
      glavaUvod();
      const kartica = el("section", "racun-kartica");
      kartica.append(el("h2", "", "Prijavi se"));
      const p = el("p", "", "Sprotno učenje s tedenskim načrtom in koledarjem do mature je na voljo prijavljenim uporabnikom. ");
      p.append(povezava("/prijava.html", "Prijava ali registracija"), ".");
      kartica.append(p);
      koren.replaceChildren(kartica);
      return;
    }
    koren.textContent = "Načrta ni bilo mogoče naložiti. Poskusi znova čez nekaj trenutkov.";
  }
}

init();
