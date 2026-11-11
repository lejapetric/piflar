// public/components/naloge.js
// Naloge za vajo: <div id="naloge" data-predmet="matematika" data-poglavje="mnozice" data-math></div>
// Naloge pridejo iz /api/naloge (od najlažjih do najtežjih), odgovor preveri strežnik,
// rezultat in postopek se naložita na zahtevo.

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

function renderNaloga(naloga, i) {
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

init();
