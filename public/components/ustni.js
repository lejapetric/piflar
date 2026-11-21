// public/components/ustni.js
// Ustni del mature: izpitni listki (vprašanja iz uradnega seznama RIC) z našimi odgovori
// in razlagami (/api/ustni) ter kviz. Dijak izbere osnovno ali višjo raven (?raven=…, zapomni si jo).
//
//   <div id="ustni" data-predmet="matematika" data-nacin="pregled" data-math></div>
//       vsi listki po sklopih in snoveh, odgovor se odpre ob kliku, pri zahtevnejših
//       vprašanjih je pod odgovorom gumb »Razlaga« s podrobnejšo razlago
//   <div id="ustni" data-predmet="matematika" data-nacin="kviz" data-math></div>
//       kviz: izbereš snovi (ali cele sklope), katera vprašanja (vsa, ki jih nisi znal,
//       pri katerih nisi bil prepričan, še neocenjena) in koliko; po vsakem odgovoru se
//       sam oceniš: Znal sem / Nisem bil prepričan / Nisem znal.
//
// Izbira kviza je v naslovu strani: kviz.html?raven=visja&snov=funkcije,stoznice&stanje=ne_znam,negotovo&st=10&zacni=1
// Izpitni listek: kviz.html?raven=osnovna&listek=nakljucen&zacni=1 (ali &listek=42) — vsa vprašanja enega listka po vrsti.
// Ocene prijavljenega se shranijo na strežnik (POST /api/ustni/:id/ocena), gost jih ima samo v tem brskalniku.

const koren = document.getElementById("ustni");
const predmet = koren?.dataset.predmet ?? "matematika";

const SKLOPI = {
  matematika: {
    1: "Logika in množice",
    2: "Algebra in funkcije",
    3: "Geometrija in vektorji",
    4: "Analiza, kombinatorika in statistika",
  },
};
const OCENE = {
  znam: { ime: "Znal sem", kratko: "Znam", znak: "✓" },
  negotovo: { ime: "Nisem bil prepričan", kratko: "Negotovo", znak: "?" },
  ne_znam: { ime: "Nisem znal", kratko: "Ne znam", znak: "✗" },
};
const STANJA = { ne_znam: "Ki jih nisem znal", negotovo: "Pri katerih nisem bil prepričan", znam: "Ki sem jih znal", neocenjeno: "Še neocenjena" };
const STEVILA = [3, 5, 10, 20, 0]; // 0 = vsa
const KLJUC_GOST = `ucilnica-ustni-${predmet}`;
const RAVNI = { osnovna: "Osnovna raven", visja: "Višja raven" };
const KLJUC_RAVEN = `ucilnica-ustni-raven-${predmet}`;

// Raven: iz naslova strani, sicer zadnja izbrana, sicer osnovna
const raven = (() => {
  const izUrl = new URLSearchParams(location.search).get("raven");
  try {
    if (RAVNI[izUrl]) localStorage.setItem(KLJUC_RAVEN, izUrl);
    else return RAVNI[localStorage.getItem(KLJUC_RAVEN)] ? localStorage.getItem(KLJUC_RAVEN) : "osnovna";
  } catch {
    /* brez shrambe */
  }
  return RAVNI[izUrl] ? izUrl : "osnovna";
})();

const urlKviza = (parametri = {}) => `/views/${predmet}/ustni/kviz.html?${new URLSearchParams({ raven, ...parametri })}`;
const urlRazlage = (slug) => `/views/${predmet}/snov/${slug}/${slug}_razlaga.html`;

// ------------------------------------------------------------
// Pomožne funkcije
// ------------------------------------------------------------
function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function gumb(besedilo, razred = "btn btn-secondary") {
  const b = el("button", razred);
  b.type = "button";
  b.textContent = besedilo;
  return b;
}

function povezava(href, besedilo, razred) {
  const a = el("a", razred);
  a.href = href;
  a.textContent = besedilo;
  return a;
}

function typeset(e) {
  const mj = window.MathJax;
  if (mj?.typesetPromise) mj.startup.promise.then(() => mj.typesetPromise([e])).catch(console.error);
}

async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.message || "Napaka na strežniku."), { status: res.status });
  return data;
}

const besediloTock = (n) => (n === 1 ? "1 točka" : n === 2 ? "2 točki" : n === 3 || n === 4 ? `${n} točke` : `${n} točk`);
const besediloListkov = (n) => {
  const d = n % 100;
  return d === 1 ? `${n} listek` : d === 2 ? `${n} listka` : d === 3 || d === 4 ? `${n} listki` : `${n} listkov`;
};

const besediloVpr = (n) => {
  const d = n % 100;
  return d === 1 ? `${n} vprašanje` : d === 2 ? `${n} vprašanji` : d === 3 || d === 4 ? `${n} vprašanja` : `${n} vprašanj`;
};

// Pomik na vrh kviza, če je izven zaslona (pod fiksno glavo)
function navrh() {
  const y = koren.getBoundingClientRect().top;
  if (y < 70 || y > window.innerHeight * 0.6) window.scrollBy({ top: y - 90 });
}

function premesaj(seznam) {
  const s = [...seznam];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

// Premešana vprašanja, razvrščena izmenično po snoveh, da si zaporedna vprašanja niso preveč
// podobna (in ima listek s tremi vprašanji tri različne snovi, če je to mogoče).
function izmenicnoPoSnoveh(vprasanja) {
  const skupine = new Map();
  for (const v of premesaj(vprasanja)) {
    if (!skupine.has(v.poglavje)) skupine.set(v.poglavje, []);
    skupine.get(v.poglavje).push(v);
  }
  const vrste = premesaj([...skupine.values()]);
  const rezultat = [];
  while (vrste.some((s) => s.length)) for (const s of vrste) if (s.length) rezultat.push(s.shift());
  return rezultat;
}

// ------------------------------------------------------------
// Ocene: prijavljeni na strežniku, gost v localStorage
// ------------------------------------------------------------
const ocene = new Map(); // id → { ocena, ponovitve, zadnjic }
let prijavljen = false;

function preberiGosta() {
  try {
    return JSON.parse(localStorage.getItem(KLJUC_GOST) ?? "{}") ?? {};
  } catch {
    return {};
  }
}

async function naloziOcene() {
  try {
    const zapisi = await api(`/api/ustni/napredek?${new URLSearchParams({ predmet })}`);
    prijavljen = true;
    for (const z of zapisi) ocene.set(z.vprasanje, z);
  } catch {
    prijavljen = false;
    for (const [id, z] of Object.entries(preberiGosta())) ocene.set(id, z);
  }
}

async function shraniOceno(vprasanje, ocena) {
  const prej = ocene.get(vprasanje.id);
  const zapis = { vprasanje: vprasanje.id, ocena, ponovitve: (prej?.ponovitve ?? 0) + 1, zadnjic: new Date().toISOString() };
  ocene.set(vprasanje.id, zapis);
  window.dispatchEvent(new CustomEvent("ucilnica:ustni-ocena", { detail: { id: vprasanje.id, ocena } }));
  if (prijavljen) {
    try {
      const z = await api(`/api/ustni/${encodeURIComponent(vprasanje.id)}/ocena`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocena }),
      });
      ocene.set(vprasanje.id, z);
    } catch (e) {
      console.error("Ocena se ni shranila:", e);
    }
    return;
  }
  try {
    const vse = preberiGosta();
    vse[vprasanje.id] = zapis;
    localStorage.setItem(KLJUC_GOST, JSON.stringify(vse));
  } catch {
    /* brez shrambe ocena ostane le do osvežitve strani */
  }
}

const stanje = (id) => ocene.get(id)?.ocena ?? "neocenjeno";

function stetje(vprasanja) {
  const st = { znam: 0, negotovo: 0, ne_znam: 0, neocenjeno: 0 };
  for (const v of vprasanja) st[stanje(v.id)]++;
  return st;
}

function znacka(id) {
  const s = stanje(id);
  const z = el("span", `ustni-znacka ustni-znacka--${s}`);
  z.textContent = s === "neocenjeno" ? "Neocenjeno" : `${OCENE[s].znak} ${OCENE[s].kratko}`;
  return z;
}

// Trije gumbi za samooceno
function gumbiOcene(vprasanje, poOceni, oznaciPrej = true) {
  const vrstica = el("div", "ustni-ocena");
  vrstica.append(el("span", "ustni-ocena-vprasanje", "Kako ti je šlo?"));
  const gumbi = el("div", "ustni-ocena-gumbi");
  Object.entries(OCENE).forEach(([kljuc, o], i) => {
    const b = gumb(`${o.znak} ${o.ime}`, `btn ustni-ocena-gumb ustni-ocena-gumb--${kljuc}`);
    b.dataset.ocena = kljuc;
    b.title = `${o.ime} (tipka ${i + 1})`;
    if (oznaciPrej && stanje(vprasanje.id) === kljuc) b.classList.add("izbrana");
    b.addEventListener("click", () => {
      gumbi.querySelectorAll("button").forEach((x) => x.classList.toggle("izbrana", x === b));
      shraniOceno(vprasanje, kljuc);
      poOceni?.(kljuc);
    });
    gumbi.append(b);
  });
  vrstica.append(gumbi);
  return vrstica;
}

// Stikalo osnovna / višja raven (ob menjavi se stran naloži znova z ?raven=…)
function stikaloRavni() {
  const s = el("div", "ustni-raven");
  s.setAttribute("role", "group");
  s.setAttribute("aria-label", "Raven");
  for (const [k, ime] of Object.entries(RAVNI)) {
    const b = gumb(ime, `ustni-raven-gumb${k === raven ? " izbrana" : ""}`);
    b.setAttribute("aria-pressed", String(k === raven));
    b.addEventListener("click", () => {
      if (k === raven) return;
      try {
        localStorage.setItem(KLJUC_RAVEN, k);
      } catch {
        /* brez shrambe */
      }
      const p = new URLSearchParams(location.search);
      p.set("raven", k);
      for (const x of ["zacni", "listek"]) p.delete(x);
      location.search = p;
    });
    s.append(b);
  }
  return s;
}

// Vzorčni odgovor; če ima vprašanje podrobnejšo razlago, pod odgovorom gumb »Razlaga«
function teloOdgovora(v) {
  const telo = el("div", "ustni-vpr-odgovor");
  telo.innerHTML = v.odgovor;
  if (v.razlaga) {
    const b = gumb("Razlaga", "ustni-razlaga-gumb");
    b.setAttribute("aria-expanded", "false");
    const r = el("div", "ustni-razlaga");
    r.hidden = true;
    b.addEventListener("click", () => {
      if (!r.dataset.nalozeno) {
        r.dataset.nalozeno = "1";
        r.innerHTML = v.razlaga;
        r.hidden = false;
        typeset(r);
      } else r.hidden = !r.hidden;
      b.setAttribute("aria-expanded", String(!r.hidden));
      b.textContent = r.hidden ? "Razlaga" : "Skrij razlago";
    });
    telo.append(b, r);
  }
  return telo;
}

function obvestiloGost() {
  if (prijavljen) return null;
  const p = el("p", "ustni-gost");
  p.innerHTML = `Tvoje ocene se shranjujejo samo v tem brskalniku. <a href="/prijava.html">Prijavi se</a>, da jih shraniš v svoj račun in jih vidiš na vseh napravah.`;
  return p;
}

// Povzetek ocen (✓ ? ✗ in neocenjena)
function stevci(st) {
  const v = el("div", "ustni-stevci");
  for (const k of ["znam", "negotovo", "ne_znam", "neocenjeno"]) {
    const s = el("span", `ustni-stevec ustni-stevec--${k}`);
    s.innerHTML = `<strong>${st[k]}</strong> ${k === "neocenjeno" ? "neocenjenih" : OCENE[k].kratko.toLowerCase()}`;
    v.append(s);
  }
  return v;
}

// ------------------------------------------------------------
// PREGLED: vsa vprašanja po sklopih in snoveh
// ------------------------------------------------------------
function karticaVprasanja(v, st) {
  const d = el("details", "ustni-vpr");
  d.id = v.id;
  const s = el("summary", "ustni-vpr-glava");
  const besedilo = el("span", "ustni-vpr-besedilo");
  besedilo.innerHTML = `<span class="ustni-vpr-st">${st}.</span> ${v.vprasanje}`;
  s.append(besedilo);
  const oznake = el("span", "ustni-vpr-oznake");
  oznake.append(el("span", "ustni-tocke", besediloTock(v.tocke)), znacka(v.id));
  s.append(oznake);
  const telo = teloOdgovora(v);
  d.append(s, telo);
  d.addEventListener("toggle", () => {
    if (d.open && !telo.dataset.ocena) {
      telo.dataset.ocena = "1";
      telo.append(gumbiOcene(v, () => oznake.lastChild.replaceWith(znacka(v.id))));
    }
  });
  return d;
}

function izrisiPregled(vprasanja, snovi) {
  koren.innerHTML = "";
  const imaVpr = new Set(vprasanja.map((v) => v.poglavje));
  const snoviZVpr = snovi.filter((s) => imaVpr.has(s.slug));

  // Zgoraj: kviz in povzetek
  const zgoraj = el("div", "ustni-zgoraj");
  const st = stetje(vprasanja);
  const glavaZgoraj = el("div", "ustni-zgoraj-glava");
  glavaZgoraj.append(el("h2", "ustni-zgoraj-naslov", "Tvoja priprava"), stikaloRavni());
  zgoraj.append(glavaZgoraj);
  const listkov = new Set(vprasanja.map((v) => v.listek)).size;
  zgoraj.append(el("p", "ustni-zgoraj-opis", `${RAVNI[raven]}: ${besediloListkov(listkov)}, ${besediloVpr(vprasanja.length)}.`));
  let stevciEl = stevci(st);
  zgoraj.append(stevciEl);
  const akcije = el("div", "ustni-akcije");
  akcije.append(povezava(urlKviza(), "Začni kviz", "btn btn-primary"));
  akcije.append(povezava(urlKviza({ listek: "nakljucen", zacni: 1 }), "Izvleci listek", "btn btn-secondary"));
  const ponovi = povezava("#", "", "btn btn-secondary");
  const osveziPonovi = () => {
    const n = vprasanja.filter((v) => ["ne_znam", "negotovo"].includes(stanje(v.id))).length;
    ponovi.textContent = `Ponovi, kar še ne znaš (${n})`;
    ponovi.href = urlKviza({ stanje: "ne_znam,negotovo", st: 0, zacni: 1 });
    ponovi.hidden = !n;
  };
  osveziPonovi();
  akcije.append(ponovi);
  zgoraj.append(akcije);
  const gost = obvestiloGost();
  if (gost) zgoraj.append(gost);
  koren.append(zgoraj);

  window.addEventListener("ucilnica:ustni-ocena", () => {
    const nov = stevci(stetje(vprasanja));
    stevciEl.replaceWith(nov);
    stevciEl = nov;
    osveziPonovi();
    document.querySelectorAll(".ustni-snov").forEach((sekcija) => {
      const vpr = vprasanja.filter((v) => v.poglavje === sekcija.dataset.slug);
      sekcija.querySelector(".ustni-snov-napredek").replaceWith(napredekSnovi(vpr));
    });
  });

  // Kazalo snovi
  const sklopi = SKLOPI[predmet] ?? {};
  const poSklopih = new Map();
  for (const s of snoviZVpr) {
    const k = sklopi[s.sklop] ? s.sklop : 0;
    if (!poSklopih.has(k)) poSklopih.set(k, []);
    poSklopih.get(k).push(s);
  }

  for (const [sklop, seznamSnovi] of poSklopih) {
    const sek = el("section", "ustni-sklop");
    const glava = el("div", "ustni-sklop-glava");
    glava.append(el("h2", null, sklopi[sklop] ?? "Snov"));
    glava.append(povezava(urlKviza({ snov: seznamSnovi.map((s) => s.slug).join(",") }), "Kviz iz sklopa", "ustni-povezava"));
    sek.append(glava);
    for (const snov of seznamSnovi) {
      const vpr = vprasanja.filter((v) => v.poglavje === snov.slug);
      const s = el("div", "ustni-snov");
      s.id = snov.slug;
      s.dataset.slug = snov.slug;
      const g = el("div", "ustni-snov-glava");
      const naslov = el("h3", null);
      naslov.textContent = snov.naslov;
      g.append(naslov, napredekSnovi(vpr));
      const pov = el("div", "ustni-snov-povezave");
      pov.append(povezava(urlKviza({ snov: snov.slug }), "Kviz iz te snovi", "ustni-povezava"));
      pov.append(povezava(urlRazlage(snov.slug), "Preberi razlago", "ustni-povezava"));
      g.append(pov);
      s.append(g);
      const poListkih = new Map();
      for (const v of vpr) {
        if (!poListkih.has(v.listek)) poListkih.set(v.listek, []);
        poListkih.get(v.listek).push(v);
      }
      for (const [stListka, lv] of poListkih) {
        const blok = el("div", "ustni-listek");
        blok.id = `listek-${stListka}`;
        const gl = el("div", "ustni-listek-glava");
        const h = el("h4", null);
        h.append(el("span", "ustni-listek-st", `Listek ${stListka}`), ` ${lv[0].listekNaslov}`);
        const tock = lv.reduce((a, v) => a + v.tocke, 0);
        gl.append(h, el("span", "ustni-listek-tocke", besediloTock(tock)), povezava(urlKviza({ listek: stListka, zacni: 1 }), "Vadi listek", "ustni-povezava"));
        const seznam = el("div", "ustni-seznam");
        lv.forEach((v, i) => seznam.append(karticaVprasanja(v, i + 1)));
        blok.append(gl, seznam);
        s.append(blok);
      }
      sek.append(s);
    }
    koren.append(sek);
  }
  typeset(koren);

  // Povezava z #id vprašanja odpre to vprašanje
  const cilj = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
  if (cilj?.tagName === "DETAILS") cilj.open = true;
  cilj?.scrollIntoView({ block: "start" });
}

function napredekSnovi(vpr) {
  const st = stetje(vpr);
  const ocenjenih = vpr.length - st.neocenjeno;
  const e = el("div", "ustni-snov-napredek");
  const trak = el("div", "ustni-trak");
  for (const k of ["znam", "negotovo", "ne_znam"]) {
    if (!st[k]) continue;
    const del = el("span", `ustni-trak-del ustni-trak-del--${k}`);
    del.style.width = `${(100 * st[k]) / vpr.length}%`;
    trak.append(del);
  }
  e.append(trak, el("span", "ustni-snov-st", `${st.znam} / ${vpr.length} znam${ocenjenih ? "" : " · še neponovljeno"}`));
  e.title = `Znam: ${st.znam}, negotovo: ${st.negotovo}, ne znam: ${st.ne_znam}, neocenjena: ${st.neocenjeno}`;
  return e;
}

// ------------------------------------------------------------
// KVIZ
// ------------------------------------------------------------
function izrisiKviz(vprasanja, snovi) {
  const imaVpr = new Set(vprasanja.map((v) => v.poglavje));
  const snoviZVpr = snovi.filter((s) => imaVpr.has(s.slug));
  const slugi = snoviZVpr.map((s) => s.slug);
  const q = new URLSearchParams(location.search);
  const seznamIz = (k, dovoljeni) => (q.get(k) ?? "").split(",").filter((x) => dovoljeni.includes(x));

  const izbira = {
    snovi: new Set(seznamIz("snov", slugi)),
    stanja: new Set(seznamIz("stanje", Object.keys(STANJA))),
    st: STEVILA.includes(Number(q.get("st"))) && q.has("st") ? Number(q.get("st")) : 10,
  };
  if (!izbira.snovi.size) slugi.forEach((s) => izbira.snovi.add(s));
  if (!izbira.stanja.size) Object.keys(STANJA).forEach((s) => izbira.stanja.add(s));

  const izbrana = () =>
    vprasanja.filter(
(v) => izbira.snovi.has(v.poglavje) && izbira.stanja.has(stanje(v.id)));

  function zapisiVNaslov(zacni) {
    const p = new URLSearchParams({ raven });
    if (izbira.snovi.size < slugi.length) p.set("snov", [...izbira.snovi].join(","));
    if (izbira.stanja.size < Object.keys(STANJA).length) p.set("stanje", [...izbira.stanja].join(","));
    p.set("st", izbira.st);
    if (zacni) p.set("zacni", "1");
    history.replaceState(null, "", `${location.pathname}?${p}`);
  }

  // ---------- Nastavitve kviza ----------
  function nastavitve() {
    koren.innerHTML = "";
    const vrhNastavitev = el("div", "ustni-nastavitve-vrh");
    vrhNastavitev.append(stikaloRavni(), el("span", "ustni-zgoraj-opis", `${besediloListkov(new Set(vprasanja.map((v) => v.listek)).size)}, ${besediloVpr(vprasanja.length)}`));
    koren.append(vrhNastavitev);
    const obrazec = el("form", "ustni-nastavitve");
    obrazec.addEventListener("submit", (e) => e.preventDefault());

    // Snovi po sklopih
    const fsSnovi = el("fieldset", "ustni-polje");
    fsSnovi.append(el("legend", null, "Snov"));
    const hitro = el("div", "ustni-hitro");
    const vse = gumb("Vse snovi", "ustni-cip");
    const nic = gumb("Počisti", "ustni-cip");
    hitro.append(vse, nic);
    fsSnovi.append(hitro);
    const sklopi = SKLOPI[predmet] ?? {};
    const skupine = new Map();
    for (const s of snoviZVpr) {
      const k = sklopi[s.sklop] ? s.sklop : 0;
      if (!skupine.has(k)) skupine.set(k, []);
      skupine.get(k).push(s);
    }
    const potrditve = [];
    const sklopiPolja = [];
    const mreza = el("div", "ustni-sklopi");
    for (const [k, seznam] of skupine) {
      const blok = el("div", "ustni-sklop-izbira");
      const glava = el("label", "ustni-sklop-izbira-glava");
      const cbSklop = el("input");
      cbSklop.type = "checkbox";
      glava.append(cbSklop, ` ${sklopi[k] ?? "Snov"}`);
      blok.append(glava);
      const cbji = [];
      for (const s of seznam) {
        const l = el("label", "ustni-snov-izbira");
        const cb = el("input");
        cb.type = "checkbox";
        cb.value = s.slug;
        cb.checked = izbira.snovi.has(s.slug);
        cb.addEventListener("change", () => {
          cb.checked ? izbira.snovi.add(s.slug) : izbira.snovi.delete(s.slug);
          posodobi();
        });
        const n = vprasanja.filter((v) => v.poglavje === s.slug).length;
        l.append(cb, ` ${s.naslov} `, el("small", null, `(${n})`));
        blok.append(l);
        cbji.push(cb);
        potrditve.push(cb);
      }
      cbSklop.addEventListener("change", () => {
        for (const cb of cbji) {
          cb.checked = cbSklop.checked;
          cbSklop.checked ? izbira.snovi.add(cb.value) : izbira.snovi.delete(cb.value);
        }
        posodobi();
      });
      sklopiPolja.push([cbSklop, cbji]);
      mreza.append(blok);
    }
    fsSnovi.append(mreza);
    vse.addEventListener("click", () => {
      slugi.forEach((s) => izbira.snovi.add(s));
      potrditve.forEach((cb) => (cb.checked = true));
      posodobi();
    });
    nic.addEventListener("click", () => {
      izbira.snovi.clear();
      potrditve.forEach((cb) => (cb.checked = false));
      posodobi();
    });

    // Katera vprašanja
    const fsStanja = el("fieldset", "ustni-polje");
    fsStanja.append(el("legend", null, "Vprašanja"));
    const hitroS = el("div", "ustni-hitro");
    const sVsa = gumb("Vsa", "ustni-cip");
    const sNapacna = gumb("Samo ki jih ne znam ali nisem prepričan", "ustni-cip");
    hitroS.append(sVsa, sNapacna);
    fsStanja.append(hitroS);
    const stanjaCb = {};
    const stanjaSeznam = el("div", "ustni-stanja");
    for (const [k, ime] of Object.entries(STANJA)) {
      const l = el("label", `ustni-stanje-izbira ustni-stanje-izbira--${k}`);
      const cb = el("input");
      cb.type = "checkbox";
      cb.checked = izbira.stanja.has(k);
      cb.addEventListener("change", () => {
        cb.checked ? izbira.stanja.add(k) : izbira.stanja.delete(k);
        posodobi();
      });
      stanjaCb[k] = cb;
      const n = el("small", "ustni-stanje-st");
      l.append(cb, ` ${ime} `, n);
      stanjaSeznam.append(l);
    }
    fsStanja.append(stanjaSeznam);
    const nastaviStanja = (kljuci) => {
      izbira.stanja = new Set(kljuci);
      for (const [k, cb] of Object.entries(stanjaCb)) cb.checked = izbira.stanja.has(k);
      posodobi();
    };
    sVsa.addEventListener("click", () => nastaviStanja(Object.keys(STANJA)));
    sNapacna.addEventListener("click", () => nastaviStanja(["ne_znam", "negotovo"]));

    // Število in raven
    const fsOstalo = el("fieldset", "ustni-polje");
    fsOstalo.append(el("legend", null, "Kviz"));
    const vrsta = el("div", "ustni-ostalo");
    const lSt = el("label", "ustni-st-izbira", "Število vprašanj ");
    const sel = el("select");
    for (const n of STEVILA) {
      const o = el("option");
      o.value = n;
      o.textContent = n === 0 ? "vsa" : String(n);
      o.selected = n === izbira.st;
      sel.append(o);
    }
    sel.addEventListener("change", () => {
      izbira.st = Number(sel.value);
      posodobi();
    });
    lSt.append(sel);
    vrsta.append(lSt);
    fsOstalo.append(vrsta);

    const dno = el("div", "ustni-zacni");
    const info = el("p", "ustni-zacni-info");
    const zacni = gumb("Začni kviz", "btn btn-primary");
    zacni.type = "submit";
    zacni.addEventListener("click", () => {
      const vpr = izbrana();
      if (!vpr.length) return;
      zapisiVNaslov(true);
      kviz(vpr);
    });
    const listek = gumb("Izvleci naključni listek", "btn btn-secondary");
    listek.title = "Vsa vprašanja enega izpitnega listka po vrsti, kot na izpitu";
    listek.addEventListener("click", () => zacniListek("nakljucen"));
    const gumbiDno = el("div", "ustni-zacni-gumbi");
    gumbiDno.append(zacni, listek);
    dno.append(info, gumbiDno);

    obrazec.append(fsSnovi, fsStanja, fsOstalo, dno);
    koren.append(obrazec);
    const gost = obvestiloGost();
    if (gost) koren.append(gost);

    function posodobi() {
      for (const [cbSklop, cbji] of sklopiPolja) {
        const izbranih = cbji.filter((c) => c.checked).length;
        cbSklop.checked = izbranih === cbji.length;
        cbSklop.indeterminate = izbranih > 0 && izbranih < cbji.length;
      }
      const vSnoveh = vprasanja.filter((v) => izbira.snovi.has(v.poglavje));
      const st = stetje(vSnoveh);
      for (const [k, cb] of Object.entries(stanjaCb)) cb.parentElement.querySelector(".ustni-stanje-st").textContent = `(${st[k]})`;
      const n = izbrana().length;
      const vKvizu = izbira.st ? Math.min(izbira.st, n) : n;
      info.textContent = n
        ? `Izbranim pogojem ustreza ${besediloVpr(n)}. V kvizu: ${besediloVpr(vKvizu)}.`
        : izbira.snovi.size
          ? "Izbranim pogojem ne ustreza nobeno vprašanje. Izberi še katero vrsto vprašanj ali snov."
          : "Izberi vsaj eno snov.";
      zacni.disabled = !n;
      zapisiVNaslov(false);
    }
    posodobi();
  }

  // ---------- Potek kviza ----------
  // Izpitni listek: vsa njegova vprašanja po vrsti (st je številka ali "nakljucen")
  function zacniListek(st) {
    const stevilke = [...new Set(vprasanja.map((v) => v.listek))];
    const n = stevilke.includes(Number(st)) ? Number(st) : stevilke[Math.floor(Math.random() * stevilke.length)];
    history.replaceState(null, "", `${location.pathname}?${new URLSearchParams({ raven, listek: n, zacni: 1 })}`);
    kviz(vprasanja.filter((v) => v.listek === n), n);
  }

  // listek: številka listka, če kviz sledi enemu listku (vrstni red ostane)
  function kviz(izbor, listek) {
    const vrsta = listek ? izbor : izmenicnoPoSnoveh(izbor).slice(0, izbira.st || undefined);
    const rezultati = new Map(); // id → ocena
    const imeSnovi = new Map(snovi.map((s) => [s.slug, s.naslov]));
    let i = 0;
    let odprto = false;
    let karticaKviza = null;

    const tipke = (e) => {
      if (!karticaKviza?.isConnected || e.target.closest("input, textarea, select")) return;
      if (!odprto && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        karticaKviza.querySelector(".ustni-pokazi")?.click();
      } else if (odprto && ["1", "2", "3"].includes(e.key)) {
        karticaKviza.querySelectorAll(".ustni-ocena-gumb")[Number(e.key) - 1]?.click();
      }
    };
    document.addEventListener("keydown", tipke);

    function naslednje() {
      i++;
      if (i < vrsta.length) prikazi();
      else konec();
    }

    function prikazi() {
      odprto = false;
      const v = vrsta[i];
      koren.innerHTML = "";
      const vrh = el("div", "ustni-kviz-vrh");
      vrh.append(el("span", "ustni-kviz-st", `${listek ? `Listek ${listek} · ` : ""}Vprašanje ${i + 1} / ${vrsta.length}`));
      const trak = el("div", "ustni-kviz-trak");
      const polno = el("span");
      polno.style.width = `${(100 * i) / vrsta.length}%`;
      trak.append(polno);
      const koncaj = gumb("Končaj kviz", "ustni-povezava ustni-koncaj");
      koncaj.addEventListener("click", konec);
      vrh.append(trak, koncaj);

      const k = el("article", "ustni-kartica");
      const oznake = el("div", "ustni-kartica-oznake");
      const snov = el("span", "ustni-kartica-snov");
      snov.textContent = imeSnovi.get(v.poglavje) ?? v.poglavje;
      oznake.append(snov, el("span", "ustni-kartica-listek", `Listek ${v.listek}: ${v.listekNaslov}`), el("span", "ustni-tocke", besediloTock(v.tocke)));
      if (stanje(v.id) !== "neocenjeno") {
        const prej = znacka(v.id);
        prej.title = "Tvoja zadnja ocena";
        oznake.append(prej);
      }
      k.append(oznake);
      k.append(el("h2", "ustni-kartica-vprasanje", v.vprasanje));
      k.append(el("p", "ustni-kartica-navodilo", "Odgovori na glas, kot bi na izpitu, ali si zapiši ključne točke. Nato odpri vzorčni odgovor in se oceni."));
      const opombe = el("textarea", "ustni-opombe");
      opombe.rows = 3;
      opombe.placeholder = "Tvoje opombe (se ne shranijo)";
      k.append(opombe);
      const gumbi = el("div", "ustni-kartica-gumbi");
      const pokazi = gumb("Pokaži odgovor", "btn btn-primary ustni-pokazi");
      pokazi.title = "Preslednica";
      const preskoci = gumb("Preskoči", "btn btn-secondary");
      gumbi.append(pokazi, preskoci);
      k.append(gumbi);
      preskoci.addEventListener("click", naslednje);
      pokazi.addEventListener("click", () => {
        odprto = true;
        gumbi.remove();
        const odg = el("div", "ustni-kartica-odgovor");
        odg.append(el("h3", null, "Vzorčni odgovor"));
        odg.append(teloOdgovora(v));
        const razlaga = povezava(urlRazlage(v.poglavje), "Preberi razlago snovi →", "ustni-povezava");
        razlaga.target = "_blank";
        odg.append(razlaga);
        odg.append(
          gumbiOcene(v, (ocena) => {
            rezultati.set(v.id, ocena);
            setTimeout(naslednje, 150);
          }, false)
        );
        k.append(odg);
        typeset(odg);
        odg.querySelector(".ustni-ocena-gumb")?.focus({ preventScroll: true });
      });
      koren.append(vrh, k);
      karticaKviza = k;
      typeset(k);
      navrh();
    }

    function konec() {
      document.removeEventListener("keydown", tipke);
      karticaKviza = null;
      koren.innerHTML = "";
      const ocenjena = vrsta.filter((v) => rezultati.has(v.id));
      const st = { znam: 0, negotovo: 0, ne_znam: 0 };
      for (const v of ocenjena) st[rezultati.get(v.id)]++;
      const k = el("section", "ustni-konec");
      k.append(el("h2", null, "Kviz je končan"));
      k.append(
        el(
          "p",
          null,
          ocenjena.length
            ? `Ocenil si ${besediloVpr(ocenjena.length)} od ${vrsta.length}.`
            : "Nobenega vprašanja nisi ocenil."
        )
      );
      const povz = el("div", "ustni-stevci");
      for (const kljuc of Object.keys(st)) {
        const s = el("span", `ustni-stevec ustni-stevec--${kljuc}`);
        s.innerHTML = `<strong>${st[kljuc]}</strong> ${OCENE[kljuc].kratko.toLowerCase()}`;
        povz.append(s);
      }
      k.append(povz);

      const slabi = ocenjena.filter((v) => rezultati.get(v.id) !== "znam");
      const akcije = el("div", "ustni-akcije");
      if (slabi.length) {
        const ponovi = gumb(`Ponovi, česar nisi znal ali nisi bil prepričan (${slabi.length})`, "btn btn-primary");
        ponovi.addEventListener("click", () => {
          izbira.st = 0;
          kviz(slabi);
        });
        akcije.append(ponovi);
      }
      if (listek) {
        const drug = gumb("Izvleci nov listek", slabi.length ? "btn btn-secondary" : "btn btn-primary");
        drug.addEventListener("click", () => zacniListek("nakljucen"));
        akcije.append(drug);
      }
      const znova = gumb("Nov kviz", slabi.length || listek ? "btn btn-secondary" : "btn btn-primary");
      znova.addEventListener("click", () => {
        zapisiVNaslov(false);
        nastavitve();
      });
      akcije.append(znova, povezava(`/views/${predmet}/ustni/ustni.html?raven=${raven}`, "Vsi listki", "btn btn-secondary"));
      k.append(akcije);

      if (ocenjena.length) {
        const seznam = el("div", "ustni-seznam");
        ocenjena.forEach((v, n) => seznam.append(karticaVprasanja(v, n + 1)));
        k.append(el("h3", "ustni-konec-podnaslov", "Pregled odgovorov"), seznam);
      }
      const gost = obvestiloGost();
      if (gost) k.append(gost);
      koren.append(k);
      typeset(k);
      navrh();
    }

    prikazi();
  }

  if (q.get("zacni") === "1" && q.get("listek")) zacniListek(q.get("listek"));
  else if (q.get("zacni") === "1" && izbrana().length) kviz(izbrana());
  else nastavitve();
}

// ------------------------------------------------------------
// Zagon
// ------------------------------------------------------------
async function init() {
  if (!koren) return;
  try {
    const [vprasanja, snovi] = await Promise.all([
      api(`/api/ustni?${new URLSearchParams({ predmet, raven })}`),
      api(`/api/snovi?${new URLSearchParams({ predmet })}`),
      naloziOcene(),
    ]);
    if (!vprasanja.length) {
      koren.textContent = "Vprašanja za ustni del so še v pripravi.";
      return;
    }
    const red = new Map(snovi.map((s, i) => [s.slug, i]));
    vprasanja.sort((a, b) => (red.get(a.poglavje) ?? 99) - (red.get(b.poglavje) ?? 99));
    if (koren.dataset.nacin === "kviz") izrisiKviz(vprasanja, snovi);
    else izrisiPregled(vprasanja, snovi);
  } catch (e) {
    console.error(e);
    koren.textContent = "Vprašanj ni bilo mogoče naložiti. Poskusi znova čez nekaj trenutkov.";
  }
}

init();
