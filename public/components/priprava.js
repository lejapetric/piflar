// public/components/priprava.js
// Stran Tedenska priprava (priprava.html): nastavitve načrta (predmeti, tempo, datum mature),
// snovi tega tedna s korakoma »predelaj razlago« in »reši naloge«, niz opravljenih tednov
// in pretekli tedni. Podatki so iz /api/priprava (controllers/priprava.js).

const koren = document.getElementById("priprava");

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

const sklon = (n, ena, dve, tri, pet) => {
  const d = n % 100;
  return `${n} ${d === 1 ? ena : d === 2 ? dve : d === 3 || d === 4 ? tri : pet}`;
};
const besediloSnovi = (n) => sklon(n, "snov", "snovi", "snovi", "snovi");
const besediloTednov = (n) => sklon(n, "teden", "tedna", "tedne", "tednov");
const besediloDni = (n) => sklon(n, "dan", "dneva", "dni", "dni");

// "2026-11-16" → "16. 11."
const kratekDatum = (dan) => {
  const [, m, d] = dan.split("-").map(Number);
  return `${d}. ${m}.`;
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

// ------------------------------------------------------------
// Nastavitve načrta
// ------------------------------------------------------------
function obrazecNastavitev({ predmeti, izbrani, tempo, datumMature, priporocen, novNacrt }) {
  const obrazec = el("form", "racun-kartica priprava-nastavitve");
  obrazec.noValidate = true;
  obrazec.append(el("h2", "", novNacrt ? "Sestavi svoj načrt" : "Nastavitve načrta"));
  if (novNacrt)
    obrazec.append(el("p", "", "Izberi predmete, ki jih pišeš na maturi, in datum mature. Snovi bodo razporejene po tednih v vrstnem redu kataloga."));

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
  const datum = el("label", "prijava-polje");
  datum.append(el("span", "", "Datum mature"));
  const datumVnos = el("input");
  datumVnos.type = "date";
  datumVnos.name = "datumMature";
  datumVnos.value = datumMature ? String(datumMature).slice(0, 10) : "";
  datum.append(datumVnos, el("small", "", "Prvi dan spomladanskega roka (približno začetek maja)."));

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
  vrsta.append(datum, tempoPolje);
  obrazec.append(vrsta);

  const napaka = el("p", "prijava-sporocilo");
  napaka.setAttribute("role", "status");
  napaka.hidden = true;
  const gumb = el("button", "btn btn-primary", novNacrt ? "Začni s pripravo" : "Shrani nastavitve");
  gumb.type = "submit";
  obrazec.append(napaka, gumb);

  obrazec.addEventListener("submit", async (e) => {
    e.preventDefault();
    napaka.hidden = true;
    const izbraniPredmeti = [...obrazec.querySelectorAll('input[name="predmet"]:checked')].map((v) => v.value);
    gumb.disabled = true;
    try {
      const podatki = await zahteva("PUT", "/api/priprava", {
        predmeti: izbraniPredmeti,
        tempo: Number(izbira.value),
        datumMature: datumVnos.value || null,
      });
      izrisiNacrt(podatki);
      koren.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      napaka.textContent = err.message;
      napaka.hidden = false;
    } finally {
      gumb.disabled = false;
    }
  });
  return obrazec;
}

// ------------------------------------------------------------
// Načrt
// ------------------------------------------------------------
function trak(vrednost, najvec, oznaka) {
  const t = el("div", "branje-trak");
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

function korak(st, naslov, opis, opravljen, vrednost, najvec, gumb) {
  const k = el("div", `priprava-korak${opravljen ? " priprava-korak--opravljen" : ""}`);
  const glava = el("div", "priprava-korak-glava");
  glava.append(el("span", "priprava-korak-st", opravljen ? "✓" : String(st)), el("strong", "", naslov), el("span", "priprava-korak-stanje", opis));
  k.append(glava, trak(vrednost, najvec, naslov));
  if (gumb) k.append(gumb);
  return k;
}

function karticaSnovi(s, podatki) {
  const k = el("article", `priprava-snov${s.opravljena ? " priprava-snov--opravljena" : ""}`);
  const glava = el("header", "priprava-snov-glava");
  const naslov = el("div");
  naslov.append(el("span", "priprava-snov-predmet", imePredmeta(s.predmet)));
  const h = el("h3");
  if (s.url) h.append(povezava(s.url, [s.stevilka, s.naslov].filter(Boolean).join(" ")));
  else h.textContent = s.naslov;
  naslov.append(h);
  glava.append(naslov);
  if (s.opravljena) glava.append(el("span", "priprava-znacka", "✓ Opravljeno"));
  k.append(glava);

  const b = s.branje;
  k.append(
    korak(1, "Predelaj razlago", b.predelano ? "predelana" : `${b.predelani} od ${b.potrebno} potrebnih sklopov`, b.predelano, b.predelani, b.potrebno,
      s.url && !b.predelano ? povezava(s.url, b.predelani ? "Nadaljuj z razlago" : "Odpri razlago", "btn btn-secondary napredek-gumb") : null)
  );
  const n = s.naloge;
  if (n.cilj) {
    const resene = n.reseno >= n.cilj;
    k.append(
      korak(2, "Reši naloge", resene ? `${n.cilj} rešenih` : `${n.reseno} od ${n.cilj} rešenih`, resene, n.reseno, n.cilj,
        resene ? null : povezava(s.nalogeUrl, "Reši naloge", `btn ${b.predelano ? "btn-primary" : "btn-secondary"} napredek-gumb`))
    );
    if (!b.predelano && !resene)
      k.append(el("p", "priprava-namig", "Naloge šele po razlagi: tako jih rešiš sam, ne po spominu iz postopkov."));
  }

  // Zamenjava snovi (npr. če to snov v šoli obravnavate kasneje)
  if (!s.opravljena && podatki.drugeSnovi.length) {
    const zamenjava = el("details", "priprava-zamenjava");
    zamenjava.append(el("summary", "", "Zamenjaj snov"));
    const izbira = el("select");
    izbira.setAttribute("aria-label", "Nova snov");
    for (const d of podatki.drugeSnovi) {
      const o = el("option", "", `${imePredmeta(d.predmet)}: ${[d.stevilka, d.naslov].filter(Boolean).join(" ")}`);
      o.value = `${d.predmet}/${d.slug}`;
      izbira.append(o);
    }
    const gumb = el("button", "btn btn-secondary napredek-gumb", "Zamenjaj");
    gumb.type = "button";
    gumb.addEventListener("click", async () => {
      gumb.disabled = true;
      try {
        izrisiNacrt(await zahteva("POST", "/api/priprava/zamenjaj", { iz: `${s.predmet}/${s.slug}`, v: izbira.value }));
      } catch (err) {
        gumb.disabled = false;
        gumb.textContent = err.message;
      }
    });
    const vrsta = el("div", "priprava-zamenjava-vrsta");
    vrsta.append(izbira, gumb);
    zamenjava.append(vrsta);
    k.append(zamenjava);
  }
  return k;
}

function izrisiNacrt(podatki) {
  if (!podatki.nastavitve) {
    koren.replaceChildren(
      obrazecNastavitev({ predmeti: podatki.predmeti, izbrani: podatki.privzeto.predmeti, tempo: 2, datumMature: podatki.privzeto.datumMature, novNacrt: true })
    );
    return;
  }
  const { teden, niz, skupno, tedniDoMature, priporocenTempo, nastavitve, zgodovina } = podatki;
  const opravljeneTeden = teden.snovi.filter((s) => s.opravljena).length;

  // Povzetek
  const povzetek = el("div", "napredek-povzetek priprava-povzetek");
  const ploscice = [
    [besediloTednov(niz).replace(/^\d+ /, ""), String(niz), "zapored", niz ? "uspesno" : ""],
    [null, `${opravljeneTeden}/${teden.snovi.length}`, "snovi ta teden", teden.opravljen ? "uspesno" : ""],
    [null, `${skupno.opravljene}/${skupno.vse}`, "vseh snovi opravljenih", ""],
  ];
  if (tedniDoMature != null) ploscice.push([null, String(Math.max(0, tedniDoMature)), `${besediloTednov(Math.max(0, tedniDoMature)).replace(/^\d+ /, "")} do mature`, ""]);
  for (const [enota, st, ime, razred] of ploscice) {
    const k = el("div", `napredek-ploscica${razred ? ` napredek-ploscica--${razred}` : ""}`);
    k.append(el("strong", "", st), el("span", "", enota ? `${enota} ${ime}` : ime));
    povzetek.append(k);
  }

  // Ta teden
  const tedenK = el("section", "racun-kartica priprava-teden");
  const glava = el("div", "priprava-teden-glava");
  glava.append(el("h2", "", `Ta teden · ${kratekDatum(teden.zacetek)} – ${kratekDatum(teden.konec)}`));
  glava.append(el("span", "priprava-teden-rok", teden.opravljen ? "✓ Teden opravljen" : `še ${besediloDni(teden.preostaloDni)}`));
  tedenK.append(glava);

  if (!teden.snovi.length) {
    const p = el("p", "", skupno.vse && skupno.opravljene >= skupno.vse
      ? "Vsa snov izbranih predmetov je opravljena. Zdaj ponavljaj: "
      : "Ta teden nimaš snovi. Izberi več predmetov v nastavitvah ali ponavljaj: ");
    p.append(povezava("/napredek.html", "neuspešne naloge"), ".");
    tedenK.append(p);
  } else {
    if (teden.opravljen) tedenK.append(el("p", "priprava-pohvala", niz > 1 ? `Odlično, to je že ${besediloTednov(niz)} zapored. Naslednji teden dobiš nove snovi.` : "Odlično! Naslednji teden dobiš nove snovi. Ostani v ritmu."));
    const seznam = el("div", "priprava-snovi");
    for (const s of teden.snovi) seznam.append(karticaSnovi(s, podatki));
    tedenK.append(seznam);
  }

  const deli = [povzetek];
  if (priporocenTempo > nastavitve.tempo && skupno.opravljene < skupno.vse) {
    const opozorilo = el("div", "priprava-opozorilo");
    opozorilo.append(
      el("p", "", `S tem tempom (${besediloSnovi(nastavitve.tempo)} na teden) ne boš predelal vse snovi vsaj 3 tedne pred maturo. Priporočamo ${besediloSnovi(priporocenTempo)} na teden.`)
    );
    const gumb = el("button", "btn btn-secondary napredek-gumb", `Nastavi ${besediloSnovi(priporocenTempo)} na teden`);
    gumb.type = "button";
    gumb.addEventListener("click", async () => {
      gumb.disabled = true;
      izrisiNacrt(await zahteva("PUT", "/api/priprava", { ...nastavitve, tempo: priporocenTempo, datumMature: nastavitve.datumMature?.slice(0, 10) ?? null }));
    });
    opozorilo.append(gumb);
    deli.push(opozorilo);
  }
  deli.push(tedenK);

  // Pretekli tedni
  if (zgodovina.length) {
    const z = el("section", "racun-kartica");
    z.append(el("h2", "", "Pretekli tedni"));
    const vrsta = el("ol", "priprava-zgodovina");
    for (const t of zgodovina) {
      const li = el("li", t.opravljen ? "priprava-zgodovina--da" : "priprava-zgodovina--ne", `${t.opravljen ? "✓" : "✗"} ${kratekDatum(t.zacetek)}`);
      li.title = t.opravljen ? "Teden opravljen" : "Teden ni bil opravljen";
      vrsta.append(li);
    }
    z.append(vrsta);
    deli.push(z);
  }

  // Kako se šteje + nastavitve
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
  nastavitveK.append(el("summary", "btn btn-secondary", "Spremeni predmete, tempo ali datum mature"));
  nastavitveK.append(obrazecNastavitev({
    predmeti: podatki.vsiPredmeti ?? nastavitve.predmeti,
    izbrani: nastavitve.predmeti,
    tempo: nastavitve.tempo,
    datumMature: nastavitve.datumMature,
    priporocen: priporocenTempo,
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
      const kartica = el("section", "racun-kartica");
      kartica.append(el("h2", "", "Prijavi se"));
      const p = el("p", "", "Tedenski načrt priprave na maturo je na voljo prijavljenim uporabnikom. ");
      p.append(povezava("/prijava.html", "Prijava ali registracija"), ".");
      kartica.append(p);
      koren.replaceChildren(kartica);
      return;
    }
    koren.textContent = "Načrta ni bilo mogoče naložiti. Poskusi znova čez nekaj trenutkov.";
  }
}

init();
