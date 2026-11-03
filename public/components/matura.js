// public/components/matura.js
// Maturitetne pole in maturitetne naloge po snovi. Stran potrebuje samo
// <div id="matura" data-nacin="…" data-predmet="matematika" data-math></div>:
//
//   data-nacin="leta"     seznam let s polami (stran Maturitetne pole)
//   data-nacin="pole"     pole enega leta (?leto=2026), brez leta vse pole
//   data-nacin="sklopi"   poglavja po sklopih s prenosi PDF (stran Maturitetne naloge po snovi)
//   data-nacin="snov"     naloge enega poglavja (?poglavje=…) ali sklopa (?sklop=4), brez obojega vse
//
// ?raven=osnovna|visja izbere raven, ?tisk=brez|resitve po izrisu odpre tisk (Shrani kot PDF).
// Rešitve pošlje strežnik samo, če je pola odklenjena (api/utils/dostop.js).

const koren = document.getElementById("matura");
const parametri = new URLSearchParams(location.search);
const predmet = koren?.dataset.predmet ?? "matematika";
const OSNOVA = `/views/${predmet}/matura`;

const SKLOPI_PREDMETA = {
  matematika: {
    1: "Logika in množice",
    2: "Algebra in funkcije",
    3: "Geometrija in vektorji",
    4: "Analiza, kombinatorika in statistika",
  },
  fizika: {
    1: "Mehanika",
    2: "Toplota",
    3: "Elektrika in magnetizem",
    4: "Nihanje, valovanje in optika",
    5: "Moderna fizika in astronomija",
  },
};
const SKLOPI = SKLOPI_PREDMETA[predmet] ?? {};
// Fizika ima eno samo raven ("enotna"): izbire ravni in oznake ravni takrat ne prikažemo
const RAVNI = { osnovna: "Osnovna raven", visja: "Višja raven", enotna: "Splošna matura" };
const ENA_RAVEN = predmet === "fizika";
const imeRavni = (raven) => (raven === "enotna" ? "" : RAVNI[raven]?.toLowerCase() ?? raven);
const ROKI = { predmaturitetni: "Predmaturitetni preizkus", spomladanski: "Spomladanski rok", jesenski: "Jesenski rok" };

// ------------------------------------------------------------
// Pomočniki (enaki kot v naloge.js)
// ------------------------------------------------------------
function typeset(el) {
  const mj = window.MathJax;
  if (mj?.typesetPromise) return mj.startup.promise.then(() => mj.typesetPromise([el])).catch(console.error);
  return Promise.resolve();
}

// Počaka, da se MathJax naloži in obdela vso stran (pred tiskom)
async function mathjaxPripravljen() {
  for (let i = 0; i < 100 && !window.MathJax?.typesetPromise; i++) {
    await new Promise((r) => setTimeout(r, 100));
  }
  await typeset(koren);
}

async function api(url) {
  const res = await fetch(url);
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

function povezava(href, besedilo, razred) {
  const a = el("a", razred);
  a.href = href;
  a.textContent = besedilo;
  return a;
}

const tocke = (t) => (t === 1 ? "1 točka" : t === 2 ? "2 točki" : t <= 4 ? `${t} točke` : `${t} točk`);
const steviloNalog = (n) => (n === 1 ? "1 naloga" : n === 2 ? "2 nalogi" : n === 3 || n === 4 ? `${n} naloge` : `${n} nalog`);
// Povezava do razlage snovi: naloga.snov (točna podstran) ali razlaga poglavja
let SNOVI = {};
const urlSnovi = (slug) => `/views/${predmet}/snov/${slug}/${slug}_razlaga.html`;
function povezavaSnov(naloga) {
  const slug = [naloga.poglavje ?? []].flat()[0];
  if (!slug) return null;
  const a = povezava(naloga.snov ?? urlSnovi(slug), `Snov: ${SNOVI[slug]?.naslov ?? "razlaga"} ↗`, "mn-snov");
  a.title = "Odpri razlago snovi za to nalogo";
  return a;
}
const imeRoka = (pola) =>
  `${pola.leto}, ${ROKI[pola.rok]?.toLowerCase() ?? pola.rok}${pola.izvedba > 1 ? ` (${pola.izvedba}. izpitni dan)` : ""}`;

// ------------------------------------------------------------
// Ena naloga: besedilo, gumba Rešitev in Postopek
// ------------------------------------------------------------
// prikaz: "" (nič), "resitev" (samo rešitev), "postopek" (postopek in rešitev)
function nastaviPrikaz(kartica, prikaz) {
  kartica.dataset.prikaz = prikaz;
  const resitev = kartica.querySelector(".mn-resitev");
  const postopek = kartica.querySelector(".mn-postopek");
  if (resitev) resitev.hidden = !prikaz;
  if (postopek) postopek.hidden = prikaz !== "postopek";
  if (kartica.classList.contains("pola-stran")) {
    kartica.querySelectorAll(".mn-rez").forEach((e) => e.toggleAttribute("hidden", prikaz !== "resitev"));
    kartica.querySelectorAll(".mn-post").forEach((e) => e.toggleAttribute("hidden", prikaz !== "postopek"));
    kartica.querySelectorAll(".pola-risba").forEach((e) => e.toggleAttribute("hidden", !prikaz));
    const gR = kartica.querySelector(".pola-gumb-resitev");
    const gP = kartica.querySelector(".pola-gumb-postopek");
    if (gR) gR.textContent = prikaz === "resitev" ? "Skrij rešitev" : "Prikaži rešitev";
    if (gP) gP.textContent = prikaz === "postopek" ? "Skrij postopek" : "Prikaži postopek";
    return;
  }
  const [gResitev, gPostopek] = kartica.querySelectorAll(".naloga-akcije button");
  if (gResitev) gResitev.textContent = prikaz ? "Skrij rešitev" : "Rešitev";
  if (gPostopek) gPostopek.textContent = prikaz === "postopek" ? "Skrij postopek" : "Postopek";
}

function zaklenjeno(naloga) {
  if (!naloga.resena) return el("p", "mn-zaklep", "Rešitve za to polo še pripravljamo.");
  const p = el("p", "mn-zaklep", "Rešitve te pole so na voljo s paketom. ");
  p.append(povezava("/narocnina.html", "Odkleni rešitve"));
  return p;
}

function renderNaloga(naloga, { naslov, vir }) {
  const kartica = el("article", "naloga mn-naloga");
  kartica.id = vir ? `${naloga.pola.id}-${naloga.id}` : `naloga-${naloga.id}`;

  const glava = el("div", "mn-glava");
  glava.append(el("h3", "naloga-naslov", naslov));
  const kot = el("div", "mn-kot");
  if (naloga.tocke) kot.append(el("span", "mn-tocke", tocke(naloga.tocke)));
  const snov = povezavaSnov(naloga);
  if (snov) kot.append(snov);
  glava.append(kot);
  kartica.append(glava);
  if (vir) {
    const p = naloga.pola;
    const kje = [`Matura ${imeRoka(p)}`, imeRavni(p.raven), p.stevilka ? `izpitna pola ${p.stevilka}` : "", `naloga ${naloga.id}`];
    kartica.append(el("p", "mn-vir", kje.filter(Boolean).join(", ")));
  }

  if (naloga.besedilo) {
    kartica.append(el("div", "naloga-besedilo", naloga.besedilo));
  } else {
    const p = el("p", "naloga-besedilo mn-brez-besedila", "Besedilo naloge najdeš v uradni maturitetni poli");
    const pdf = naloga.pola?.pdf ?? naloga.pdf;
    if (pdf) {
      p.append(" (");
      const a = povezava(pdf, "PDF na ric.si");
      a.target = "_blank";
      a.rel = "noopener";
      p.append(a, ")");
    }
    p.append(".");
    kartica.append(p);
  }

  const akcije = el("div", "naloga-akcije");
  const gResitev = gumb("Rešitev");
  const gPostopek = gumb("Postopek");
  akcije.append(gResitev, gPostopek);
  kartica.append(akcije);

  if (naloga.odklenjena && naloga.rezultat) {
    const postopek = el("div", "naloga-postopek mn-postopek");
    postopek.append(el("h4", "", "Postopek"), el("div", "", naloga.razlaga ?? ""));
    const resitev = el("div", "naloga-postopek mn-resitev");
    resitev.append(el("p", "naloga-rezultat", `<strong>Rešitev:</strong> ${naloga.rezultat}`));
    kartica.append(postopek, resitev);
  } else {
    const zaklep = zaklenjeno(naloga);
    zaklep.classList.add("mn-resitev");
    kartica.append(zaklep);
  }

  gResitev.addEventListener("click", () => nastaviPrikaz(kartica, kartica.dataset.prikaz ? "" : "resitev"));
  gPostopek.addEventListener("click", () =>
    nastaviPrikaz(kartica, kartica.dataset.prikaz === "postopek" ? "" : "postopek")
  );
  nastaviPrikaz(kartica, "");
  return kartica;
}

// ------------------------------------------------------------
// Naloga na listu, kot na pravi maturitetni poli: okvir, točke, prostor
// za reševanje. Rešitev se izpiše v prostor za reševanje kot rokopis.
// ------------------------------------------------------------
const DELI = { A: "A) KRATKE NALOGE", B: "B) KRAJŠE STRUKTURIRANE NALOGE", C: "C) STRUKTURIRANE NALOGE" };

function renderList(naloga, { pola, stran, skupaj, prviVDelu }) {
  const kartica = el("article", `mn-naloga pola-stran${naloga.tip === "izbirna" ? " pola-stran-izbirna" : ""}`);
  kartica.id = `${pola.id}-${naloga.id}`;
  const del = /^[ABC]\d/.test(naloga.id) ? naloga.id[0] : null;
  const st = del ? naloga.id.slice(1) : naloga.id;

  const vrh = el("div", "pola-vrh");
  vrh.append(el("span", "pola-oznaka", `Naloga ${naloga.id}`));
  const desno = el("div", "pola-vrh-desno");
  const snov = povezavaSnov(naloga);
  if (snov) desno.append(snov);
  const gR = gumb("Prikaži rešitev", "btn btn-secondary pola-gumb pola-gumb-resitev");
  const gP = gumb("Prikaži postopek", "btn btn-secondary pola-gumb pola-gumb-postopek");
  desno.append(gR, gP);
  vrh.append(desno);

  const list = el("div", "pola-list");
  list.append(el("span", "pola-st-strani", `${stran}/${skupaj}`));
  if (del && prviVDelu) list.append(el("h3", "pola-del", DELI[del]));

  const okvir = el("div", "pola-okvir");
  const besedilo = el("div", "pola-besedilo");
  besedilo.append(el("span", "pola-st", `${st}.`), el("div", "", naloga.besedilo ?? ""));
  okvir.append(besedilo);
  if (naloga.tocke) okvir.append(el("p", "pola-tocke", `(${tocke(naloga.tocke)})`));

  const velikost = naloga.tip === "izbirna" ? " pola-prostor-mali" : del === "B" || del === "C" || naloga.tocke >= 10 ? " pola-prostor-velik" : "";
  const prostor = el("div", `pola-prostor${velikost}`);
  if (naloga.odklenjena && naloga.razlaga) {
    if (naloga.rezultat) {
      const rez = el("div", "mn-rez pola-rezultat");
      rez.append(el("span", "pola-rezultat-oznaka", "Rešitev:"), el("span", "pola-rezultat-vsebina", naloga.rezultat));
      prostor.append(rez);
    }
    prostor.append(el("div", "mn-post pola-resitev", naloga.razlaga));
  } else {
    const zaklep = zaklenjeno(naloga);
    zaklep.classList.add("mn-rez");
    const zaklep2 = zaklenjeno(naloga);
    zaklep2.classList.add("mn-post");
    prostor.append(zaklep, zaklep2);
  }
  okvir.append(prostor);
  // Graf iz rešitve narišemo v prazen koordinatni sistem iz besedila, kot na poli
  const mreza = besedilo.querySelector(".mn-graf.mreza");
  const risba = prostor.querySelector(".mn-graf.v-mrezo");
  if (mreza && risba) {
    risba.classList.add("pola-risba");
    mreza.classList.add("mreza-prazna");
    mreza.after(risba);
  }
  list.append(okvir);
  kartica.append(vrh, list);

  gR.addEventListener("click", () => nastaviPrikaz(kartica, kartica.dataset.prikaz === "resitev" ? "" : "resitev"));
  gP.addEventListener("click", () => nastaviPrikaz(kartica, kartica.dataset.prikaz === "postopek" ? "" : "postopek"));
  nastaviPrikaz(kartica, "");
  return kartica;
}

// ------------------------------------------------------------
// Orodja na vrhu: vse rešitve, vsi postopki, PDF
// (naslovPdf je funkcija, ker se naslov spremeni z izbiro ravni)
// ------------------------------------------------------------
function orodja(naslovPdf, { samoResitve = false, brezPrikaza = false } = {}) {
  const vrstica = el("div", "matura-orodja");
  const levo = el("div", "matura-orodja-skupina");
  const desno = el("div", "matura-orodja-skupina");

  const imeVse = samoResitve ? "Prikaži vse rešitve" : "Pokaži vse rešitve";
  const gResitve = gumb(imeVse);
  const gPostopki = gumb("Pokaži vse postopke");
  const kartice = () => koren.querySelectorAll(".mn-naloga");
  let stanje = "";
  function vse(prikaz) {
    stanje = stanje === prikaz ? "" : prikaz;
    kartice().forEach((k) => nastaviPrikaz(k, stanje));
    if (stanje) koren.querySelectorAll("details.matura-pola").forEach((d) => (d.open = true));
    gResitve.textContent = stanje === "resitev" ? "Skrij vse rešitve" : imeVse;
    gPostopki.textContent = stanje === "postopek" ? "Skrij vse postopke" : "Pokaži vse postopke";
  }
  gResitve.addEventListener("click", () => vse("resitev"));
  gPostopki.addEventListener("click", () => vse("postopek"));
  if (!brezPrikaza) levo.append(gResitve);
  if (!samoResitve && !brezPrikaza) levo.append(gPostopki);

  const gPdf = gumb("PDF brez rešitev", "btn btn-primary");
  const gPdfResitve = gumb("PDF z rešitvami", "btn btn-primary");
  gPdf.addEventListener("click", () => natisni(false, naslovPdf()));
  gPdfResitve.addEventListener("click", () => natisni(true, naslovPdf()));
  desno.append(gPdf, gPdfResitve);

  vrstica.append(levo, desno);
  return vrstica;
}

// PDF: brskalnik natisne stran v svetli temi, brez menija in gumbov.
// V oknu za tisk dijak izbere "Shrani kot PDF".
async function natisni(zResitvami, naslovPdf, sekcija = null) {
  const zlozene = [...koren.querySelectorAll("details.matura-pola")];
  const odprte = zlozene.map((d) => d.open);
  zlozene.forEach((d) => (d.open = !sekcija || d === sekcija));
  if (sekcija) {
    sekcija.classList.add("tisk-izbrana");
    document.documentElement.classList.add("tisk-ena");
  }
  const kartice = [...(sekcija ?? koren).querySelectorAll(".mn-naloga")];
  const prej = kartice.map((k) => k.dataset.prikaz);
  const tema = document.documentElement.dataset.theme;
  const naslov = document.title;

  kartice.forEach((k) => nastaviPrikaz(k, zResitvami ? "postopek" : ""));
  document.documentElement.dataset.theme = "light";
  document.documentElement.classList.toggle("tisk-resitve", zResitvami);
  document.title = `${naslovPdf} (${zResitvami ? "z rešitvami" : "brez rešitev"})`;
  await mathjaxPripravljen();

  window.addEventListener(
    "afterprint",
    () => {
      kartice.forEach((k, i) => nastaviPrikaz(k, prej[i]));
      document.documentElement.dataset.theme = tema;
      document.documentElement.classList.remove("tisk-resitve", "tisk-ena");
      sekcija?.classList.remove("tisk-izbrana");
      zlozene.forEach((d, i) => (d.open = odprte[i]));
      document.title = naslov;
    },
    { once: true }
  );
  window.print();
}

// Izbira ravni (osnovna / višja / vse); izbira se zapiše v naslov strani
function izbiraRavni(ravni, izbrana, obIzbiri) {
  const skupina = el("div", "matura-ravni");
  skupina.setAttribute("role", "group");
  skupina.setAttribute("aria-label", "Raven");
  for (const [vrednost, ime] of ravni) {
    const b = gumb(ime, "matura-raven");
    b.setAttribute("aria-pressed", String(vrednost === izbrana));
    b.addEventListener("click", () => {
      skupina.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const url = new URL(location.href);
      if (vrednost) url.searchParams.set("raven", vrednost);
      else url.searchParams.delete("raven");
      history.replaceState(null, "", url);
      obIzbiri(vrednost);
    });
    skupina.append(b);
  }
  return skupina;
}

async function poIzrisu(vsebina) {
  await typeset(vsebina);
  const tisk = parametri.get("tisk");
  if (tisk === "brez" || tisk === "resitve") {
    koren.querySelector(`.matura-orodja .btn-primary:${tisk === "brez" ? "first-child" : "last-child"}`)?.click();
  }
}

// ------------------------------------------------------------
// Stran: pole enega leta
// ------------------------------------------------------------
// Pola je zložena: v povzetku sta naslov in prenos PDF, klik odpre celotno polo
function renderPola(pola, naslovPdf) {
  const sekcija = el("details", "matura-pola");
  sekcija.id = pola.id;
  if (location.hash && location.hash.slice(1).startsWith(pola.id)) sekcija.open = true;

  const povzetek = el("summary", "matura-pola-povzetek");
  const levo = el("div", "matura-pola-naslov");
  const ime = pola.stevilka ? `Izpitna pola ${pola.stevilka}` : ROKI[pola.rok];
  levo.append(el("h3", "", pola.izvedba > 1 ? `${ime} · ${pola.izvedba}. izpitni dan` : ime));
  const opis = el("p", "", [pola.raven === "enotna" ? "" : RAVNI[pola.raven], pola.datum ?? "", steviloNalog(pola.naloge.length)].filter(Boolean).join(" · "));
  if (pola.navodilo) opis.append(` · ${pola.navodilo}`);
  levo.append(opis);

  const desno = el("div", "matura-pola-prenosi");
  const prikazPole = el("div", "matura-pola-prikaz");
  const gRes = gumb("Prikaži rešitve", "btn btn-secondary");
  const gPost = gumb("Prikaži postopke", "btn btn-secondary");
  function prikaziPolo(prikaz) {
    const novo = sekcija.dataset.prikaz === prikaz ? "" : prikaz;
    sekcija.dataset.prikaz = novo;
    if (novo) sekcija.open = true;
    sekcija.querySelectorAll(".mn-naloga").forEach((k) => nastaviPrikaz(k, novo));
    gRes.textContent = novo === "resitev" ? "Skrij rešitve" : "Prikaži rešitve";
    gPost.textContent = novo === "postopek" ? "Skrij postopke" : "Prikaži postopke";
  }
  for (const [g, prikaz] of [[gRes, "resitev"], [gPost, "postopek"]]) {
    g.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      prikaziPolo(prikaz);
    });
    prikazPole.append(g);
  }
  desno.append(prikazPole);
  for (const [z, ime] of [[false, "PDF brez rešitev"], [true, "PDF z rešitvami"]]) {
    const g = gumb(ime, "btn btn-secondary");
    g.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      natisni(z, `${naslovPdf(pola)}`, sekcija);
    });
    desno.append(g);
  }
  if (pola.pdf) {
    const a = povezava(pola.pdf, "Uradna pola (RIC)", "btn btn-secondary");
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", (e) => e.stopPropagation());
    desno.append(a);
  }
  povzetek.append(levo, desno, el("span", "matura-pola-puscica", "▾"));
  sekcija.append(povzetek);

  const vsebina = el("div", "matura-pola-vsebina");
  if (!pola.naloge.length) vsebina.append(el("p", "mn-prazno", "Naloge te pole še vnašamo."));
  let prejDel = null;
  pola.naloge.forEach((naloga, i) => {
    const del = naloga.id[0];
    vsebina.append(
      renderList(
        { ...naloga, odklenjena: pola.odklenjena, resena: pola.resena, pdf: pola.pdf },
        { pola, stran: i + 1, skupaj: pola.naloge.length, prviVDelu: del !== prejDel }
      )
    );
    prejDel = del;
  });
  if (pola.vir) vsebina.append(el("p", "mn-avtor", pola.vir));
  sekcija.append(vsebina);
  return sekcija;
}

async function stranPole() {
  const leto = parametri.get("leto");
  const [pole, snovi] = await Promise.all([
    api(`/api/matura?predmet=${predmet}&naloge=1${leto ? `&leto=${encodeURIComponent(leto)}` : ""}`),
    api(`/api/snovi?predmet=${predmet}`).catch(() => []),
  ]);
  SNOVI = Object.fromEntries(snovi.map((s) => [s.slug, s]));
  if (leto) {
    document.querySelector(".page-header h1").textContent = `Matura ${leto}`;
    document.title = `Matura ${leto}: maturitetne pole | Piflar.si`;
  }
  if (!pole.length) {
    koren.replaceChildren(el("p", "mn-prazno", "Pole za to leto še pripravljamo."));
    return;
  }

  const ravni = Object.keys(RAVNI).filter((r) => pole.some((p) => p.raven === r));
  let raven = ravni.includes(parametri.get("raven")) ? parametri.get("raven") : ravni[0];
  const vsebina = el("div", "matura-vsebina");

  function izrisi() {
    const izbrane = pole.filter((p) => p.raven === raven);
    const leta = [...new Set(izbrane.map((p) => p.leto))];
    vsebina.replaceChildren();
    const naslovPdf = (p) =>
      [`Matura ${p.leto}`, `${ROKI[p.rok].toLowerCase()}${p.izvedba > 1 ? ` (${p.izvedba}. izpitni dan)` : ""}`, imeRavni(p.raven), `izpitna pola ${p.stevilka ?? ""}`.trim()]
        .filter(Boolean)
        .join(", ");
    for (const l of leta) {
      if (!leto) vsebina.append(el("h2", "matura-leto", `Matura ${l}`));
      for (const rok of Object.keys(ROKI)) {
        const vRoku = izbrane.filter((p) => p.leto === l && p.rok === rok);
        if (!vRoku.length) continue;
        const skupina = el("section", "matura-rok");
        skupina.append(el("h2", "matura-rok-naslov", ROKI[rok]));
        vRoku.forEach((p) => skupina.append(renderPola(p, naslovPdf)));
        vsebina.append(skupina);
      }
    }
    typeset(vsebina);
  }

  const vrstica = orodja(() => [`Matura${leto ? ` ${leto}` : ""}`, predmet, imeRavni(raven)].filter(Boolean).join(", "), { brezPrikaza: true });

  const izbira = izbiraRavni(ravni.map((r) => [r, RAVNI[r]]), raven, (r) => {
    raven = r;
    izrisi();
  });
  koren.replaceChildren(...(ravni.length > 1 ? [izbira] : []), vrstica, vsebina);
  izrisi();
  await poIzrisu(vsebina);
}

// ------------------------------------------------------------
// Stran: seznam let (Maturitetne pole)
// ------------------------------------------------------------
async function stranLeta() {
  const pole = await api(`/api/matura?predmet=${predmet}`);
  const leta = [...new Set(pole.map((p) => p.leto))];
  const seznam = el("div", "link-list");
  for (const leto of leta) {
    const vLetu = pole.filter((p) => p.leto === leto);
    const roki = [...new Set(vLetu.map((p) => ROKI[p.rok]))].join(", ");
    const ravni = ENA_RAVEN ? "" : ` · ${[...new Set(vLetu.map((p) => RAVNI[p.raven].replace(" raven", "")))].join(" in ")} raven`;
    const a = el("a", "link-item");
    a.href = `${OSNOVA}/pole/leto.html?leto=${leto}`;
    a.innerHTML = `<span class="link-item-text"><strong>Matura ${leto}</strong><small></small></span><span class="arrow">→</span>`;
    a.querySelector("small").textContent = `${roki}${ravni}`;
    seznam.append(a);
  }
  if (!leta.length) seznam.append(el("p", "mn-prazno", "Pole še pripravljamo."));
  koren.replaceChildren(seznam);
}

// ------------------------------------------------------------
// Stran: naloge po snovi (eno poglavje, en sklop ali vse)
// ------------------------------------------------------------
async function stranSnov() {
  const snovi = await api(`/api/snovi?predmet=${predmet}`);
  SNOVI = Object.fromEntries(snovi.map((s) => [s.slug, s]));
  const poglavje = snovi.find((s) => s.slug === parametri.get("poglavje"));
  const sklop = SKLOPI[parametri.get("sklop")] ? Number(parametri.get("sklop")) : null;
  const izbrana = poglavje ? [poglavje] : sklop ? snovi.filter((s) => s.sklop === sklop) : snovi;

  let naslov = "Vse maturitetne naloge";
  if (poglavje) naslov = `${poglavje.stevilka} ${poglavje.naslov}`;
  else if (sklop) naslov = `${sklop}. ${SKLOPI[sklop]}`;
  document.querySelector(".page-header h1").textContent = naslov;
  document.title = `${poglavje?.naslov ?? naslov}: maturitetne naloge | Piflar.si`;
  const opis = document.querySelector(".page-header p");
  if (poglavje && opis) {
    opis.textContent = `Naloge iz preteklih matur, ki preverjajo poglavje ${poglavje.naslov.toLowerCase()}. `;
    opis.append(povezava(urlSnovi(poglavje.slug), "Preberi razlago poglavja"), ".");
  }

  const naloge = await api(`/api/matura/naloge?predmet=${predmet}&poglavje=${izbrana.map((s) => s.slug).join(",")}`);
  const ravni = [["", "Vse ravni"], ["osnovna", "Osnovna"], ["visja", "Višja"]];
  let raven = RAVNI[parametri.get("raven")] ? parametri.get("raven") : "";
  const vsebina = el("div", "matura-vsebina");

  function izrisi() {
    vsebina.replaceChildren();
    const izbrane = naloge.filter((n) => !raven || n.pola.raven === raven);
    // Pri sklopu ali vseh nalogah so naloge razdeljene po poglavjih
    const skupine = poglavje ? [[null, izbrane]] : izbrana.map((s) => [s, izbrane.filter((n) => [n.poglavje].flat().includes(s.slug))]);
    for (const [s, seznam] of skupine) {
      if (!seznam.length) continue;
      if (s) vsebina.append(el("h2", "matura-leto", `${s.stevilka} ${s.naslov}`));
      seznam.forEach((n, i) => vsebina.append(renderNaloga(n, { naslov: `Naloga ${i + 1}`, vir: true })));
    }
    if (!vsebina.hasChildNodes()) vsebina.append(el("p", "mn-prazno", "Za to izbiro še ni maturitetnih nalog."));
    typeset(vsebina);
  }

  const vrstica = orodja(() => `Maturitetne naloge, ${naslov}${raven ? `, ${RAVNI[raven].toLowerCase()}` : ""}`);

  const izbira = izbiraRavni(ravni, raven, (r) => {
    raven = r;
    izrisi();
  });
  koren.replaceChildren(...(ENA_RAVEN ? [] : [izbira]), vrstica, vsebina);
  izrisi();
  await poIzrisu(vsebina);
}

// ------------------------------------------------------------
// Stran: poglavja po sklopih (Maturitetne naloge po snovi)
// ------------------------------------------------------------
async function stranSklopi() {
  const [snovi, naloge] = await Promise.all([
    api(`/api/snovi?predmet=${predmet}`),
    api(`/api/matura/naloge?predmet=${predmet}`),
  ]);
  const stevilo = (slug) => naloge.filter((n) => [n.poglavje].flat().includes(slug)).length;
  const strani = `${OSNOVA}/po_snovi/naloge.html`;

  const prenosi = (poizvedba, besedilo) => {
    const vrstica = el("div", "matura-prenosi");
    if (besedilo) vrstica.append(el("span", "matura-prenosi-oznaka", besedilo));
    for (const [tisk, ime] of [["brez", "PDF brez rešitev"], ["resitve", "PDF z rešitvami"]]) {
      const a = povezava(`${strani}?${poizvedba}${poizvedba ? "&" : ""}tisk=${tisk}`, ime, "btn btn-secondary");
      a.target = "_blank";
      vrstica.append(a);
    }
    return vrstica;
  };

  const mreza = el("div", "two-col");
  for (const [st, ime] of Object.entries(SKLOPI)) {
    const vSklopu = snovi.filter((s) => s.sklop === Number(st));
    const kartica = el("div", "info-card");
    kartica.append(el("h3", "", `${st}. ${ime}`));
    const ul = el("ul");
    for (const s of vSklopu) {
      const li = el("li");
      li.append(povezava(`${strani}?poglavje=${s.slug}`, `${s.stevilka} ${s.naslov}`));
      li.append(el("span", "mn-stevec", ` · ${steviloNalog(stevilo(s.slug))}`));
      ul.append(li);
    }
    kartica.append(ul, prenosi(`sklop=${st}`, "Vse naloge sklopa:"));
    mreza.append(kartica);
  }

  const vse = el("div", "intro-card matura-vse");
  vse.append(el("h3", "", "Vse maturitetne naloge na enem mestu"));
  vse.append(el("p", "", `Zbirka vseh ${steviloNalog(naloge.length)}, razvrščenih po poglavjih.`));
  vse.append(prenosi("", ""));
  koren.replaceChildren(mreza, vse);
}

const NACINI = { leta: stranLeta, pole: stranPole, sklopi: stranSklopi, snov: stranSnov };

async function init() {
  if (!koren) return;
  try {
    await NACINI[koren.dataset.nacin]?.();
  } catch (err) {
    koren.textContent = `Vsebine ni bilo mogoče naložiti: ${err.message}`;
  }
}

init();
