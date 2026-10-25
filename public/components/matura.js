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

const SKLOPI = {
  1: "Logika in množice",
  2: "Algebra in funkcije",
  3: "Geometrija in vektorji",
  4: "Analiza, kombinatorika in statistika",
};
const RAVNI = { osnovna: "Osnovna raven", visja: "Višja raven" };
const ROKI = { spomladanski: "Spomladanski rok", jesenski: "Jesenski rok" };

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
const imeRoka = (pola) => `${pola.leto}, ${ROKI[pola.rok]?.toLowerCase() ?? pola.rok}`;

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
  if (naloga.tocke) glava.append(el("span", "mn-tocke", tocke(naloga.tocke)));
  kartica.append(glava);
  if (vir) {
    const p = naloga.pola;
    kartica.append(el("p", "mn-vir", `Matura ${imeRoka(p)}, ${RAVNI[p.raven]?.toLowerCase() ?? p.raven}, naloga ${naloga.id}`));
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
// Orodja na vrhu: vse rešitve, vsi postopki, PDF
// (naslovPdf je funkcija, ker se naslov spremeni z izbiro ravni)
// ------------------------------------------------------------
function orodja(naslovPdf) {
  const vrstica = el("div", "matura-orodja");
  const levo = el("div", "matura-orodja-skupina");
  const desno = el("div", "matura-orodja-skupina");

  const gResitve = gumb("Pokaži vse rešitve");
  const gPostopki = gumb("Pokaži vse postopke");
  const kartice = () => koren.querySelectorAll(".mn-naloga");
  let stanje = "";
  function vse(prikaz) {
    stanje = stanje === prikaz ? "" : prikaz;
    kartice().forEach((k) => nastaviPrikaz(k, stanje));
    gResitve.textContent = stanje === "resitev" ? "Skrij vse rešitve" : "Pokaži vse rešitve";
    gPostopki.textContent = stanje === "postopek" ? "Skrij vse postopke" : "Pokaži vse postopke";
  }
  gResitve.addEventListener("click", () => vse("resitev"));
  gPostopki.addEventListener("click", () => vse("postopek"));
  levo.append(gResitve, gPostopki);

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
async function natisni(zResitvami, naslovPdf) {
  const kartice = [...koren.querySelectorAll(".mn-naloga")];
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
      document.documentElement.classList.remove("tisk-resitve");
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
function renderPola(pola) {
  const sekcija = el("section", "matura-pola");
  sekcija.id = pola.id;
  const glava = el("div", "subsection-head");
  glava.append(el("h2", "", pola.stevilka ? `${ROKI[pola.rok]}, izpitna pola ${pola.stevilka}` : ROKI[pola.rok]));
  const opis = el("p", "", `${RAVNI[pola.raven]}, ${steviloNalog(pola.naloge.length)}`);
  if (pola.pdf) {
    opis.append(" · ");
    const a = povezava(pola.pdf, "uradna pola (PDF, RIC)");
    a.target = "_blank";
    a.rel = "noopener";
    opis.append(a);
  }
  glava.append(opis);
  sekcija.append(glava);

  if (!pola.naloge.length) sekcija.append(el("p", "mn-prazno", "Naloge te pole še vnašamo."));
  for (const naloga of pola.naloge) {
    sekcija.append(renderNaloga({ ...naloga, odklenjena: pola.odklenjena, resena: pola.resena, pdf: pola.pdf }, { naslov: `Naloga ${naloga.id}` }));
  }
  if (pola.vir) sekcija.append(el("p", "mn-avtor", pola.vir));
  return sekcija;
}

async function stranPole() {
  const leto = parametri.get("leto");
  const pole = await api(`/api/matura?predmet=${predmet}&naloge=1${leto ? `&leto=${encodeURIComponent(leto)}` : ""}`);
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
    for (const l of leta) {
      if (!leto) vsebina.append(el("h2", "matura-leto", `Matura ${l}`));
      izbrane.filter((p) => p.leto === l).forEach((p) => vsebina.append(renderPola(p)));
    }
    typeset(vsebina);
  }

  const vrstica = orodja(() => `Matura${leto ? ` ${leto}` : ""}, ${predmet}, ${RAVNI[raven].toLowerCase()}`);

  koren.replaceChildren(
    izbiraRavni(ravni.map((r) => [r, RAVNI[r]]), raven, (r) => {
      raven = r;
      izrisi();
    }),
    vrstica,
    vsebina
  );
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
    const ravni = [...new Set(vLetu.map((p) => RAVNI[p.raven].replace(" raven", "")))].join(" in ");
    const a = el("a", "link-item");
    a.href = `${OSNOVA}/pole/leto.html?leto=${leto}`;
    a.innerHTML = `<span class="link-item-text"><strong>Matura ${leto}</strong><small></small></span><span class="arrow">→</span>`;
    a.querySelector("small").textContent = `${roki} · ${ravni} raven`;
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
    opis.append(povezava(poglavje.url, "Preberi razlago poglavja"), ".");
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

  koren.replaceChildren(
    izbiraRavni(ravni, raven, (r) => {
      raven = r;
      izrisi();
    }),
    vrstica,
    vsebina
  );
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
