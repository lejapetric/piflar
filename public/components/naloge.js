// public/components/naloge.js
// Naloge za vajo: <div id="naloge" data-predmet="matematika" data-poglavje="mnozice" data-math></div>
// Naloge pridejo iz /api/naloge (od najlažjih do najtežjih), odgovor preveri strežnik,
// rezultat in postopek se naložita na zahtevo.
// Brez data-poglavje je to razdelek »Naloge« predmeta: vse naloge predmeta s filtrom po snovi
// in težavnosti (?snov=funkcije,mnozice&tezavnost=3,4&visja=0&vrstni=nakljucno).

const container = document.getElementById("naloge");

const TEZAVNOSTI = { 1: "Lahka", 2: "Srednja", 3: "Težka", 4: "Zelo težka" };

// Formule v vsebini, ki je bila dodana po nalaganju strani
function typeset(el) {
  const mj = window.MathJax;
  if (mj?.typesetPromise) mj.startup.promise.then(() => mj.typesetPromise([el])).catch(console.error);
  // Sicer se MathJax še nalaga in bo ob zagonu obdelal celo stran.
}

async function api(url, options) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Napaka na strežniku.");
  return data;
}

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

const preveri = (naloga, odgovor) =>
  api(`/api/naloge/${encodeURIComponent(naloga.id)}/odgovor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ odgovor }),
  });

function nastaviStatus(status, razred, besedilo) {
  status.className = `naloga-status ${razred}`.trim();
  status.textContent = besedilo;
}

function oznaciRezultat(card, status, pravilno) {
  if (pravilno) card.classList.add("naloga--resena");
  nastaviStatus(
    status,
    pravilno ? "pravilno" : "napacno",
    pravilno ? "Pravilno!" : "Žal ni pravilno. Poskusi znova ali si oglej postopek."
  );
}

// Izbirna naloga: klik na možnost odda odgovor
function izbire(naloga, card, status) {
  const seznam = el("ol", "naloga-izbire");
  const crke = "ABCDEFGH";
  naloga.moznosti.forEach((moznost, i) => {
    const li = el("li");
    const b = el("button", "naloga-izbira");
    b.type = "button";
    b.append(el("span", "naloga-izbira-crka", crke[i]), el("span", "naloga-izbira-besedilo", moznost));
    b.addEventListener("click", async () => {
      seznam.querySelectorAll(".naloga-izbira").forEach((x) => x.classList.remove("izbrana", "pravilna", "napacna"));
      b.classList.add("izbrana");
      nastaviStatus(status, "", "Preverjam …");
      try {
        const { pravilno } = await preveri(naloga, crke[i]);
        b.classList.add(pravilno ? "pravilna" : "napacna");
        oznaciRezultat(card, status, pravilno);
      } catch (err) {
        nastaviStatus(status, "napacno", err.message);
      }
    });
    li.append(b);
    seznam.append(li);
  });
  return seznam;
}

// Naloga z vpisom: število, besedilo ali množica
function vpis(naloga, card, status) {
  const form = el("form", "naloga-odgovor");
  const inputId = `odgovor-${naloga.id}`;
  form.innerHTML = `
    <label for="${inputId}">Tvoj odgovor</label>
    <div class="naloga-vnos">
      <input id="${inputId}" name="odgovor" type="text" autocomplete="off" required maxlength="500">
      <button type="submit" class="btn btn-primary">Preveri</button>
    </div>`;
  if (naloga.enota) {
    const enota = el("span", "naloga-enota");
    enota.textContent = naloga.enota;
    form.querySelector("input").after(enota);
  }
  if (naloga.tipOdgovora === "stevilo") form.querySelector("input").inputMode = "decimal";
  if (naloga.namig) form.append(el("small", "naloga-namig", naloga.namig));
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    nastaviStatus(status, "", "Preverjam …");
    try {
      const { pravilno } = await preveri(naloga, form.elements.odgovor.value);
      oznaciRezultat(card, status, pravilno);
    } catch (err) {
      nastaviStatus(status, "napacno", err.message);
    }
  });
  return form;
}

function renderNaloga(naloga, i, snov) {
  const card = el("article", "naloga");
  card.id = naloga.id;
  card.dataset.tezavnost = naloga.tezavnost ?? 1;
  card.dataset.raven = naloga.raven ?? "osnovna";

  const glava = el("div", "naloga-glava");
  glava.append(el("h3", "naloga-naslov", `Naloga ${i + 1}`));
  const oznake = el("div", "naloga-oznake");
  const t = naloga.tezavnost ?? 1;
  const tez = el("span", `naloga-tezavnost tez-${t}`);
  tez.title = "Težavnost";
  tez.textContent = TEZAVNOSTI[t];
  oznake.append(tez);
  if (naloga.raven === "visja") oznake.append(el("span", "badge-vr", "Višja raven"));
  if (snov) {
    const a = el("a", "naloga-snov");
    a.href = snov.url;
    a.textContent = snov.naslov;
    a.title = "Razlaga snovi";
    oznake.prepend(a);
  }
  glava.append(oznake);
  card.append(glava);

  card.append(el("div", "naloga-besedilo", naloga.besedilo));

  const status = el("p", "naloga-status");
  status.setAttribute("role", "status");
  card.append(naloga.tipOdgovora === "izbira" ? izbire(naloga, card, status) : vpis(naloga, card, status));
  card.append(status);

  const actions = el("div", "naloga-akcije");
  const gRezultat = gumb("Prikaži rezultat");
  const gPostopek = gumb("Prikaži postopek");
  actions.append(gRezultat, gPostopek);
  card.append(actions);

  const rezultat = el("div", "naloga-postopek naloga-rezultat-okvir");
  rezultat.hidden = true;
  const postopek = el("div", "naloga-postopek");
  postopek.hidden = true;
  card.append(rezultat, postopek);

  if (naloga.povezave?.length) {
    const links = el("div", "naloga-povezave");
    links.append(el("span", "", "Ne veš, kako začeti? Preberi razlago:"));
    for (const p of naloga.povezave) {
      const a = el("a");
      a.href = p.url;
      a.textContent = p.naslov;
      links.append(a);
    }
    card.append(links);
  }

  async function preklopi(okvir, g, besedilo, samoRezultat) {
    if (!okvir.hidden) {
      okvir.hidden = true;
      g.textContent = `Prikaži ${besedilo}`;
      return;
    }
    if (!okvir.hasChildNodes()) {
      try {
        const data = await api(`/api/naloge/${encodeURIComponent(naloga.id)}/postopek${samoRezultat ? "?samo=rezultat" : ""}`);
        okvir.innerHTML = samoRezultat
          ? `<p class="naloga-rezultat"><strong>Rezultat:</strong> ${data.rezultat}</p>`
          : `<h4>Postopek</h4>${data.postopek}<p class="naloga-rezultat"><strong>Rezultat:</strong> ${data.rezultat}</p>`;
        typeset(okvir);
      } catch (err) {
        nastaviStatus(status, "napacno", err.message);
        return;
      }
    }
    okvir.hidden = false;
    g.textContent = `Skrij ${besedilo}`;
  }
  gRezultat.addEventListener("click", () => preklopi(rezultat, gRezultat, "rezultat", true));
  gPostopek.addEventListener("click", () => preklopi(postopek, gPostopek, "postopek", false));

  return card;
}

// Filter: težavnost in višja raven
function filter(kartice) {
  const vrstica = el("div", "naloge-filter");
  const stevila = { 0: kartice.length };
  for (const k of kartice) stevila[k.dataset.tezavnost] = (stevila[k.dataset.tezavnost] ?? 0) + 1;
  const imaVisjo = kartice.some((k) => k.dataset.raven === "visja");
  let izbrana = 0;
  let visja = true;

  const gumbi = el("div", "naloge-filter-gumbi");
  gumbi.setAttribute("role", "group");
  gumbi.setAttribute("aria-label", "Težavnost");
  const izbire = [[0, "Vse"], ...Object.entries(TEZAVNOSTI).map(([k, v]) => [Number(k), v])].filter(([k]) => stevila[k]);
  for (const [k, ime] of izbire) {
    const b = gumb(`${ime} (${stevila[k]})`, "naloge-filter-gumb");
    b.setAttribute("aria-pressed", k === 0);
    b.addEventListener("click", () => {
      izbrana = k;
      gumbi.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      uporabi();
    });
    gumbi.append(b);
  }
  vrstica.append(gumbi);

  if (imaVisjo) {
    const oznaka = el("label", "naloge-filter-visja");
    const cb = el("input");
    cb.type = "checkbox";
    cb.checked = true;
    cb.addEventListener("change", () => {
      visja = cb.checked;
      uporabi();
    });
    oznaka.append(cb, " Pokaži naloge za višjo raven");
    vrstica.append(oznaka);
  }

  function uporabi() {
    let st = 0;
    for (const k of kartice) {
      const vidna = (!izbrana || Number(k.dataset.tezavnost) === izbrana) && (visja || k.dataset.raven !== "visja");
      k.hidden = !vidna;
      if (vidna) k.querySelector(".naloga-naslov").firstChild.textContent = `Naloga ${++st}`;
    }
  }
  return vrstica;
}

// Prijavljenemu uporabniku označi že rešene naloge (gost dobi 401 in ne vidi ničesar)
async function oznaciNapredek(poglavje) {
  const res = await fetch(`/api/napredek?poglavje=${encodeURIComponent(poglavje)}`).catch(() => null);
  if (!res?.ok) return;
  for (const zapis of await res.json()) {
    if (zapis.reseno) document.getElementById(zapis.naloga)?.classList.add("naloga--resena");
  }
}

async function init() {
  if (!container) return;
  const { poglavje, predmet } = container.dataset;
  if (!poglavje) return initRazdelek(predmet);
  try {
    const q = new URLSearchParams({ poglavje, ...(predmet ? { predmet } : {}) });
    const naloge = await api(`/api/naloge?${q}`);
    if (!naloge.length) {
      container.textContent = "Naloge za to poglavje so še v pripravi.";
      return;
    }
    const kartice = naloge.map(renderNaloga);
    const seznam = el("div", "naloge-seznam");
    seznam.append(...kartice);
    container.replaceChildren(filter(kartice), seznam);
    typeset(container);
    oznaciNapredek(poglavje);
  } catch (err) {
    container.textContent = `Nalog ni bilo mogoče naložiti: ${err.message}`;
  }
}

// ============================================================
// RAZDELEK »NALOGE«: vse naloge predmeta, filter po snovi in težavnosti
// ============================================================
const NA_STRAN = 20;

// Spustni seznam z izbiro več možnosti: »Vse« + posamezne vrednosti (privzeto Vse).
// Klik na vrednost, ko je izbrano Vse, izbere samo njo; naslednji kliki dodajajo in odvzemajo.
let odprtSeznam = null;
document.addEventListener("click", (e) => {
  if (odprtSeznam && !odprtSeznam.contains(e.target)) odprtSeznam.zapri();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && odprtSeznam) {
    const gumb = odprtSeznam.querySelector(".naloge-spustni-gumb");
    odprtSeznam.zapri();
    gumb.focus();
  }
});

function izbirnik(naslov, moznosti, izbrane, ob) {
  const id = `spustni-${naslov.normalize("NFD").replace(/[^a-z]/gi, "").toLowerCase()}`;
  const skupina = el("div", "naloge-izbirnik naloge-spustni");
  const oznaka = el("label", "naloge-izbirnik-naslov", naslov);
  oznaka.htmlFor = `${id}-gumb`;
  const gumbSeznam = el("button", "naloge-spustni-gumb");
  gumbSeznam.type = "button";
  gumbSeznam.id = `${id}-gumb`;
  gumbSeznam.setAttribute("aria-expanded", "false");
  gumbSeznam.setAttribute("aria-controls", id);
  const povzetek = el("span", "naloge-spustni-povzetek");
  gumbSeznam.append(povzetek, el("span", "naloge-spustni-puscica", "▾"));
  const plosca = el("div", "naloge-spustni-plosca");
  plosca.id = id;
  plosca.hidden = true;
  plosca.setAttribute("role", "group");
  plosca.setAttribute("aria-label", naslov);

  const vrstica = (ime) => {
    const l = el("label", "naloge-spustni-moznost");
    const cb = el("input");
    cb.type = "checkbox";
    const besedilo = el("span", "naloge-spustni-ime", ime);
    const st = el("span", "naloge-spustni-st");
    l.append(cb, besedilo, st);
    return { l, cb, st };
  };
  const vse = vrstica("Vse");
  vse.l.classList.add("naloge-spustni-moznost--vse");
  vse.cb.addEventListener("change", () => {
    izbrane.clear();
    osvezi();
    ob();
  });
  const posamezni = moznosti.map(([vrednost, ime]) => {
    const v = vrstica(ime);
    v.cb.addEventListener("change", () => {
      if (izbrane.has(vrednost)) izbrane.delete(vrednost);
      else izbrane.add(vrednost);
      if (izbrane.size === moznosti.length) izbrane.clear();
      osvezi();
      ob();
    });
    return { ...v, vrednost };
  });
  plosca.append(vse.l, ...posamezni.map((v) => v.l));
  skupina.append(oznaka, gumbSeznam, plosca);

  skupina.zapri = () => {
    plosca.hidden = true;
    gumbSeznam.setAttribute("aria-expanded", "false");
    skupina.classList.remove("odprt");
    if (odprtSeznam === skupina) odprtSeznam = null;
  };
  gumbSeznam.addEventListener("click", () => {
    if (!plosca.hidden) return skupina.zapri();
    odprtSeznam?.zapri();
    plosca.hidden = false;
    gumbSeznam.setAttribute("aria-expanded", "true");
    skupina.classList.add("odprt");
    odprtSeznam = skupina;
  });

  function osvezi() {
    vse.cb.checked = izbrane.size === 0;
    for (const v of posamezni) v.cb.checked = izbrane.has(v.vrednost);
    const imena = moznosti.filter(([vr]) => izbrane.has(vr)).map(([, ime]) => ime);
    povzetek.textContent = !imena.length ? "Vse" : imena.length <= 2 ? imena.join(", ") : `${imena[0]} in še ${imena.length - 1}`;
    gumbSeznam.title = imena.length ? imena.join(", ") : "Vse";
  }
  osvezi();
  // Števila ob imenih (koliko nalog ustreza ostalim filtrom)
  skupina.stevila = (stevila, skupaj) => {
    vse.st.textContent = skupaj;
    for (const v of posamezni) {
      const n = stevila[v.vrednost] ?? 0;
      v.st.textContent = n;
      v.l.classList.toggle("naloge-spustni-moznost--prazna", n === 0);
    }
  };
  return skupina;
}

// Ponovljivo mešanje (isto seme → isti vrstni red, da se ob »Pokaži več« nič ne premakne)
function premesaj(seznam, seme) {
  let a = seme >>> 0;
  const r = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const s = [...seznam];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

async function initRazdelek(predmet) {
  try {
    const [naloge, snovi] = await Promise.all([
      api(`/api/naloge?${new URLSearchParams({ predmet })}`),
      api(`/api/snovi?${new URLSearchParams({ predmet })}`),
    ]);
    if (!naloge.length) {
      container.textContent = "Naloge za ta predmet so še v pripravi.";
      return;
    }
    const poSlugu = new Map(snovi.map((s, i) => [s.slug, { ...s, red: i }]));
    const imaNaloge = new Set(naloge.map((n) => n.poglavje));
    const snoviZNalogami = snovi.filter((s) => imaNaloge.has(s.slug));
    // Od lažjih do težjih, pri isti težavnosti po vrstnem redu snovi
    naloge.sort((a, b) => (a.tezavnost ?? 1) - (b.tezavnost ?? 1) || (poSlugu.get(a.poglavje)?.red ?? 99) - (poSlugu.get(b.poglavje)?.red ?? 99));

    // Začetno stanje iz naslova strani
    const q = new URLSearchParams(location.search);
    const seznamIz = (k, dovoljeni) => (q.get(k) ?? "").split(",").filter((x) => dovoljeni.includes(x));
    const izbraneSnovi = new Set(seznamIz("snov", snoviZNalogami.map((s) => s.slug)));
    const izbraneTez = new Set(seznamIz("tezavnost", Object.keys(TEZAVNOSTI)));
    if (izbraneSnovi.size === snoviZNalogami.length) izbraneSnovi.clear();
    if (izbraneTez.size === 4) izbraneTez.clear();
    let visja = q.get("visja") !== "0";
    let nakljucno = q.get("vrstni") === "nakljucno";
    let seme = Math.floor(Math.random() * 2 ** 31);

    const resene = new Set();
    let prikazanih = 0;
    let izbrane = [];

    const filtri = el("div", "naloge-filtri");
    const fSnov = izbirnik("Snov", snoviZNalogami.map((s) => [s.slug, s.naslov]), izbraneSnovi, uporabi);
    fSnov.classList.add("naloge-izbirnik--snov");
    const fTez = izbirnik("Težavnost", Object.entries(TEZAVNOSTI), izbraneTez, uporabi);

    const dodatno = el("div", "naloge-filter");
    const oznakaVisja = el("label", "naloge-filter-visja");
    const cb = el("input");
    cb.type = "checkbox";
    cb.checked = visja;
    cb.addEventListener("change", () => {
      visja = cb.checked;
      uporabi();
    });
    oznakaVisja.append(cb, " Pokaži naloge za višjo raven");
    const red = el("label", "naloge-filter-red");
    red.append("Vrstni red ");
    const sel = el("select");
    sel.innerHTML = `<option value="tezavnost">od lažjih do težjih</option><option value="nakljucno">premešano</option>`;
    sel.value = nakljucno ? "nakljucno" : "tezavnost";
    sel.addEventListener("change", () => {
      nakljucno = sel.value === "nakljucno";
      seme = Math.floor(Math.random() * 2 ** 31);
      uporabi();
    });
    red.append(sel);
    dodatno.append(oznakaVisja, red);
    const izbira = el("div", "naloge-filtri-izbira");
    izbira.append(fSnov, fTez);
    filtri.append(izbira, dodatno);

    const povzetek = el("p", "naloge-povzetek");
    povzetek.setAttribute("role", "status");
    const seznam = el("div", "naloge-seznam");
    const vec = gumb("Pokaži več nalog", "btn btn-secondary naloge-vec");
    vec.addEventListener("click", () => pokazi(NA_STRAN));
    container.replaceChildren(filtri, povzetek, seznam, vec);

    const ustrezaSnov = (n) => !izbraneSnovi.size || izbraneSnovi.has(n.poglavje);
    const ustrezaTez = (n) => !izbraneTez.size || izbraneTez.has(String(n.tezavnost ?? 1));
    const ustrezaRaven = (n) => visja || n.raven !== "visja";

    function zapisiNaslov() {
      const p = new URLSearchParams();
      if (izbraneSnovi.size) p.set("snov", [...izbraneSnovi].join(","));
      if (izbraneTez.size) p.set("tezavnost", [...izbraneTez].sort().join(","));
      if (!visja) p.set("visja", "0");
      if (nakljucno) p.set("vrstni", "nakljucno");
      const s = p.toString().replaceAll("%2C", ",");
      history.replaceState(null, "", location.pathname + (s ? `?${s}` : "") + location.hash);
    }

    function pokazi(koliko) {
      const nove = izbrane.slice(prikazanih, prikazanih + koliko).map((n, i) => {
        const k = renderNaloga(n, prikazanih + i, poSlugu.get(n.poglavje));
        if (resene.has(n.id)) k.classList.add("naloga--resena");
        return k;
      });
      prikazanih += nove.length;
      seznam.append(...nove);
      nove.forEach(typeset);
      const ostane = izbrane.length - prikazanih;
      vec.hidden = ostane <= 0;
      vec.textContent = `Pokaži več nalog (še ${ostane})`;
    }

    function uporabi() {
      const stSnovi = {};
      const stTez = {};
      let vSnovi = 0;
      let vTez = 0;
      for (const n of naloge) {
        if (!ustrezaRaven(n)) continue;
        if (ustrezaTez(n)) (stSnovi[n.poglavje] = (stSnovi[n.poglavje] ?? 0) + 1), vSnovi++;
        if (ustrezaSnov(n)) (stTez[n.tezavnost ?? 1] = (stTez[n.tezavnost ?? 1] ?? 0) + 1), vTez++;
      }
      fSnov.stevila(stSnovi, vSnovi);
      fTez.stevila(stTez, vTez);

      izbrane = naloge.filter((n) => ustrezaSnov(n) && ustrezaTez(n) && ustrezaRaven(n));
      if (nakljucno) izbrane = premesaj(izbrane, seme);
      const st = izbrane.length;
      povzetek.textContent = st
        ? `${besediloSt(st)} ustreza izbiri.`
        : "Nobena naloga ne ustreza izbiri. Izberi še kakšno snov ali težavnost.";
      prikazanih = 0;
      seznam.replaceChildren();
      pokazi(NA_STRAN);
      zapisiNaslov();
    }

    uporabi();

    // Prijavljenemu uporabniku označi že rešene naloge
    const res = await fetch("/api/napredek").catch(() => null);
    if (res?.ok) {
      for (const zapis of await res.json()) if (zapis.reseno) resene.add(zapis.naloga);
      for (const id of resene) document.getElementById(id)?.classList.add("naloga--resena");
    }
  } catch (err) {
    container.textContent = `Nalog ni bilo mogoče naložiti: ${err.message}`;
  }
}

const besediloSt = (n) => {
  const d = n % 100;
  return d === 1 ? `${n} naloga` : d === 2 ? `${n} nalogi` : d === 3 || d === 4 ? `${n} naloge` : `${n} nalog`;
};

init();
