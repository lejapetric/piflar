// public/components/components.js
// Skupni del vseh strani: header, sidebar, footer, MathJax, fiksni header,
// temni način in iskanje po snovi.

const MATHJAX_URL = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-chtml.js";
const MOBILE_BREAKPOINT = 768;
const HIDE_HEADER_AFTER = 80; // px
const TEMA_KLJUC = "piflar-tema";

// ============================================================
// 0. TEMA — nastavi se takoj, da stran ne utripne svetlo
// ============================================================
function shranjenaTema() {
  try {
    return localStorage.getItem(TEMA_KLJUC);
  } catch {
    return null;
  }
}

function nastaviTemo(tema) {
  document.documentElement.dataset.theme = tema;
  const gumb = document.getElementById("temaPreklop");
  if (!gumb) return;
  const temna = tema === "dark";
  gumb.setAttribute("aria-pressed", String(temna));
  gumb.setAttribute("aria-label", temna ? "Vklopi svetli način" : "Vklopi temni način");
}

nastaviTemo(
  shranjenaTema() ?? (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light")
);

function initTema() {
  const gumb = document.getElementById("temaPreklop");
  if (!gumb) return;
  nastaviTemo(document.documentElement.dataset.theme);
  gumb.addEventListener("click", () => {
    const nova = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    nastaviTemo(nova);
    try {
      localStorage.setItem(TEMA_KLJUC, nova);
    } catch {
      /* zasebno okno: tema velja do osvežitve */
    }
  });
}

// ============================================================
// 1. MATHJAX — naloži se samo na straneh, ki vsebujejo formule
//    (ali imajo data-math, ker formule naložijo kasneje, npr. naloge)
// ============================================================
function loadMathJax() {
  const text = document.body.textContent;
  const hasMath = text.includes("\\(") || text.includes("\\[") || text.includes("$$");
  if (!hasMath && !document.querySelector("[data-math]")) return;

  // Konfiguracija mora obstajati, preden se skripta naloži.
  window.MathJax = {
    tex: {
      inlineMath: [["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
      processEscapes: true,
      processEnvironments: true,
    },
    options: {
      skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    },
  };

  const script = document.createElement("script");
  script.src = MATHJAX_URL;
  script.async = true;
  script.onerror = () => console.error("MathJax se ni naložil:", MATHJAX_URL);
  document.head.appendChild(script);
}

// ============================================================
// 2. KOMPONENTE (header, sidebar, footer)
// ============================================================
async function loadComponent(url, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url} → ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error("Napaka pri nalaganju komponente:", err);
  }
}

// ============================================================
// 3. SIDEBAR (odpri/zapri, podmeniji, aktivna povezava)
// ============================================================
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");
  const menuBtn = document.getElementById("openSidebar");
  if (!sidebar) return;

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  function setOpen(open) {
    sidebar.classList.toggle("open", open);
    mainContent?.classList.toggle("shifted", open);
    overlay.classList.toggle("visible", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
  }

  menuBtn?.addEventListener("click", () => setOpen(!sidebar.classList.contains("open")));
  document.getElementById("closeSidebar")?.addEventListener("click", () => setOpen(false));
  overlay.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // En poslušalec za vse klike v sidebarju
  sidebar.addEventListener("click", (e) => {
    const toggle = e.target.closest(".dropdown-toggle");
    if (toggle) {
      const target = document.getElementById(toggle.dataset.target);
      if (!target) return;
      const isOpen = target.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      return;
    }
    if (e.target.closest("a") && window.innerWidth <= MOBILE_BREAKPOINT) setOpen(false);
  });

  // Označi aktivno povezavo in odpri vse menije nad njo
  // (strani matura z ?leto= ali ?poglavje= imajo vsaka svojo povezavo)
  const currentPath = window.location.pathname;
  const links = [...sidebar.querySelectorAll(".sidebar-nav a")];
  const active =
    links.find((link) => link.getAttribute("href") === currentPath + window.location.search) ??
    links.find((link) => link.getAttribute("href") === currentPath);
  if (!active) return;

  active.classList.add("active");
  for (let el = active.parentElement; el && el !== sidebar; el = el.parentElement) {
    if (!el.id) continue;
    const toggle = sidebar.querySelector(`.dropdown-toggle[data-target="${el.id}"]`);
    if (!toggle) continue;
    el.classList.add("open");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }
}

// ============================================================
// 4. FIKSNI HEADER — skrij ob drsenju navzdol, pokaži ob drsenju navzgor
// ============================================================
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const dateEl = document.getElementById("currentDate");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("header--scrolled", y > 0);
    if (y <= 0 || y < lastScrollY) header.classList.remove("header--hidden");
    else if (y > HIDE_HEADER_AFTER) header.classList.add("header--hidden");
    lastScrollY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ============================================================
// 5. PRIJAVLJEN UPORABNIK V HEADERJU
// ============================================================
async function initUporabnik() {
  const el = document.getElementById("uporabnik");
  if (!el) return;
  const res = await fetch("/api/jaz").catch(() => null);
  if (!res?.ok) return; // gost: ostane povezava "Prijava"
  const uporabnik = await res.json();

  const ime = document.createElement("span");
  ime.className = "header-ime";
  ime.textContent = uporabnik.ime;
  const odjava = document.createElement("button");
  odjava.type = "button";
  odjava.className = "header-link";
  odjava.textContent = "Odjava";
  odjava.addEventListener("click", async () => {
    await fetch("/api/odjava", { method: "POST" });
    window.location.reload();
  });
  el.replaceChildren(ime, odjava);
}

// ============================================================
// 6. ISKANJE PO SNOVI — predlogi pod iskalnikom v glavi
// ============================================================
// Zlaganje črk mora biti enako kot v api/utils/iskanje.js: male črke,
// brez strešic, enaka dolžina niza.
const STRESICE = { č: "c", ć: "c", š: "s", ž: "z", đ: "d" };
function zlozi(niz) {
  let out = "";
  for (const c of niz) {
    const m = c.toLowerCase();
    const z = m.length === c.length ? m : c;
    out += STRESICE[z] ?? z;
  }
  return out;
}

function iskalniIzraz(q) {
  const deli = zlozi(q.trim()).split(/\s+/).filter(Boolean).map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return deli.length ? new RegExp(deli.join("\\s+"), "g") : null;
}

// Odlomek z obarvano iskano besedo; besedilo gre v textContent, zato HTML iz
// vsebine ne more vstopiti v stran.
function odlomek(z, razred = "") {
  const p = document.createElement("span");
  p.className = `iskanje-odlomek ${razred}`.trim();
  const mark = document.createElement("mark");
  mark.textContent = z.zadetek;
  p.append(z.pred, mark, z.po);
  return p;
}

function initIskanje() {
  const form = document.getElementById("iskalnik");
  const vnos = document.getElementById("iskalnikVnos");
  const seznam = document.getElementById("iskalnikPredlogi");
  const odpri = document.getElementById("iskalnikOdpri");
  const header = document.getElementById("siteHeader");
  if (!form || !vnos || !seznam) return;

  const zacetni = new URLSearchParams(location.search).get(location.pathname === "/iskanje.html" ? "q" : "isci");
  if (zacetni) vnos.value = zacetni;

  let zadnji = "", casovnik = null, aktivni = -1, kontroler = null;

  const elementi = () => [...seznam.querySelectorAll("[role=option]")];
  function zapri() {
    seznam.hidden = true;
    vnos.setAttribute("aria-expanded", "false");
    vnos.removeAttribute("aria-activedescendant");
    aktivni = -1;
  }
  function oznaci(i) {
    const el = elementi();
    if (!el.length) return;
    aktivni = (i + el.length) % el.length;
    el.forEach((e, j) => e.classList.toggle("aktiven", j === aktivni));
    vnos.setAttribute("aria-activedescendant", el[aktivni].id);
    el[aktivni].scrollIntoView({ block: "nearest" });
  }

  function prikazi(q, podatki) {
    seznam.replaceChildren();
    if (!podatki.zadetki.length) {
      const prazno = document.createElement("div");
      prazno.className = "iskalnik-prazno";
      prazno.textContent = `Ni zadetkov za »${q}«.`;
      seznam.append(prazno);
    }
    podatki.zadetki.forEach((z, i) => {
      const a = document.createElement("a");
      a.href = z.povezava;
      a.id = `iskalnikPredlog${i}`;
      a.className = "iskalnik-predlog";
      a.setAttribute("role", "option");
      const kje = document.createElement("span");
      kje.className = "iskalnik-kje";
      kje.textContent = [z.poglavje, z.razdelek].filter(Boolean).join(" › ");
      a.append(odlomek(z), kje);
      seznam.append(a);
    });
    if (podatki.skupaj > 0) {
      const vsi = document.createElement("a");
      vsi.href = `/iskanje.html?q=${encodeURIComponent(q)}`;
      vsi.id = "iskalnikVsi";
      vsi.className = "iskalnik-vsi";
      vsi.setAttribute("role", "option");
      vsi.textContent = `Prikaži vse zadetke (${podatki.skupaj})`;
      seznam.append(vsi);
    }
    seznam.hidden = false;
    vnos.setAttribute("aria-expanded", "true");
    aktivni = -1;
  }

  async function poisci() {
    const q = vnos.value.trim();
    if (q === zadnji) return;
    zadnji = q;
    if (q.length < 2) return zapri();
    kontroler?.abort();
    kontroler = new AbortController();
    try {
      const res = await fetch(`/api/iskanje?predlogi=1&omejitev=8&q=${encodeURIComponent(q)}`, { signal: kontroler.signal });
      if (!res.ok) throw new Error(`iskanje → ${res.status}`);
      if (vnos.value.trim() === q) prikazi(q, await res.json());
    } catch (err) {
      if (err.name !== "AbortError") console.error("Napaka pri iskanju:", err);
    }
  }

  vnos.addEventListener("input", () => {
    clearTimeout(casovnik);
    casovnik = setTimeout(poisci, 160);
  });
  vnos.addEventListener("focus", () => {
    if (seznam.childElementCount && vnos.value.trim().length >= 2) {
      seznam.hidden = false;
      vnos.setAttribute("aria-expanded", "true");
    }
  });
  vnos.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (seznam.hidden) return;
      e.preventDefault();
      oznaci(aktivni + (e.key === "ArrowDown" ? 1 : -1));
    } else if (e.key === "Enter" && aktivni >= 0 && !seznam.hidden) {
      e.preventDefault();
      elementi()[aktivni].click();
    } else if (e.key === "Escape") {
      zapri();
    }
  });
  form.addEventListener("submit", (e) => {
    if (vnos.value.trim().length < 2) e.preventDefault();
  });
  document.addEventListener("click", (e) => {
    if (!form.contains(e.target) && !odpri?.contains(e.target)) {
      zapri();
      if (header?.classList.contains("header--iskanje") && !vnos.value) nastaviMobilno(false);
    }
  });

  // Na ozkem zaslonu je iskalnik skrit za gumbom z lupo.
  function nastaviMobilno(odprt) {
    header?.classList.toggle("header--iskanje", odprt);
    odpri?.setAttribute("aria-expanded", String(odprt));
    if (odprt) vnos.focus();
    else zapri();
  }
  odpri?.addEventListener("click", () => nastaviMobilno(!header?.classList.contains("header--iskanje")));
}

// ============================================================
// 7. OBARVANJE ISKANE BESEDE NA CILJNI STRANI (?isci=…&k=…#sidro)
// ============================================================
const BREZ_ISKANJA = "svg, script, style, nav, template, noscript, textarea, mjx-container";

function poMathJaxu() {
  return new Promise((resolve) => {
    if (!window.MathJax) return resolve();
    let poskusi = 0;
    const cakaj = () => {
      const obljuba = window.MathJax?.startup?.promise;
      if (obljuba) return obljuba.then(resolve, resolve);
      if (++poskusi > 100) return resolve(); // MathJax se ni naložil: obarvamo vseeno
      setTimeout(cakaj, 100);
    };
    cakaj();
  });
}

// Besedilna vozlišča v enakem vrstnem redu in z enakimi izjemami, kot jih
// upošteva indeks na strežniku (brez formul, slik in kazala).
function besedilnaVozlisca(koren) {
  const sprehod = document.createTreeWalker(koren, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest(BREZ_ISKANJA) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  const vozlisca = [];
  while (sprehod.nextNode()) vozlisca.push(sprehod.currentNode);
  return vozlisca;
}

async function oznaciIskanje() {
  const parametri = new URLSearchParams(location.search);
  const q = parametri.get("isci");
  const re = q && iskalniIzraz(q);
  const view = document.querySelector(".view");
  if (!re || !view) return;
  await poMathJaxu();

  const vozlisca = besedilnaVozlisca(view);
  const zacetki = [];
  let besedilo = "";
  for (const v of vozlisca) {
    zacetki.push(besedilo.length);
    besedilo += v.data;
  }
  const zlozeno = zlozi(besedilo);

  // Vsak zadetek razdelimo na kose po besedilnih vozliščih.
  const zadetki = [];
  let m;
  while ((m = re.exec(zlozeno))) {
    if (!m[0].length) { re.lastIndex++; continue; }
    const od = m.index, do_ = od + m[0].length, kosi = [];
    for (let i = 0; i < vozlisca.length; i++) {
      const a = zacetki[i], b = a + vozlisca[i].data.length;
      if (b <= od) continue;
      if (a >= do_) break;
      kosi.push({ vozlisce: vozlisca[i], od: Math.max(od, a) - a, do: Math.min(do_, b) - a });
    }
    zadetki.push(kosi);
  }
  if (!zadetki.length) return;

  // Izbrani zadetek: k-ti v razdelku iz sidra (ali na vsej strani).
  const sidro = decodeURIComponent(location.hash.slice(1));
  const koren = (sidro && document.getElementById(sidro)) || view;
  const vKorenu = zadetki.filter((kosi) => koren.contains(kosi[0].vozlisce));
  const izbrani = vKorenu[Number(parametri.get("k")) || 0] ?? vKorenu[0] ?? zadetki[0];

  let prvaOznaka = null;
  for (let i = zadetki.length - 1; i >= 0; i--) {
    const kosi = zadetki[i];
    for (let j = kosi.length - 1; j >= 0; j--) {
      const { vozlisce, od, do: d } = kosi[j];
      if (d < vozlisce.data.length) vozlisce.splitText(d);
      const sredina = od > 0 ? vozlisce.splitText(od) : vozlisce;
      const mark = document.createElement("mark");
      mark.className = "iskanje-oznaka";
      if (kosi === izbrani) {
        mark.classList.add("iskanje-oznaka--izbrana");
        prvaOznaka = mark;
      }
      sredina.replaceWith(mark);
      mark.append(sredina);
    }
  }
  prvaOznaka?.scrollIntoView({ block: "center" });
}

// ============================================================
// 8. KAZALO STRANI — lepljivo kazalo poglavij in podpoglavij na
//    straneh z razlago snovi (desni rob; na ozkem zaslonu gumb)
// ============================================================
const KAZALO_SPLOSNI = /^(razlaga|tipi nalog( v tem sklopu)?)$/i;
const KAZALO_IZPUSTI = /^(naslednje|prejšnje) poglavje$/i;

function naslovBesedilo(h) {
  // Brez oznak (PZ, VR …) in brez formul, ki jih MathJax še ni izrisal.
  const kopija = h.cloneNode(true);
  kopija.querySelectorAll("[class^='badge'], [class*=' badge'], script").forEach((el) => el.remove());
  return kopija.textContent.replace(/\s+/g, " ").trim();
}

function sidroZa(h, predpona, zasedena) {
  if (h.id) return h.id;
  const osnova =
    predpona +
    "-" +
    (zlozi(naslovBesedilo(h)).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || "razdelek");
  let id = osnova;
  for (let i = 2; zasedena.has(id) || document.getElementById(id); i++) id = `${osnova}-${i}`;
  zasedena.add(id);
  h.id = id;
  return id;
}

// Zgradi drevo: [{ naslov, sidro, el, otroci: [{ naslov, sidro, el, otroci }] }]
function drevoKazala(view) {
  const zasedena = new Set();
  const poglavja = [];
  const h2ji = [...view.querySelectorAll("h2")].filter(
    (h) => !h.closest("nav, .kazalo") && !KAZALO_IZPUSTI.test(naslovBesedilo(h))
  );

  const formule = view.querySelector(".matura-formule > h3");
  if (formule && (!h2ji.length || formule.compareDocumentPosition(h2ji[0]) & Node.DOCUMENT_POSITION_FOLLOWING)) {
    poglavja.push({ naslov: naslovBesedilo(formule), sidro: sidroZa(formule, "uvod", zasedena), el: formule, otroci: [] });
  }

  h2ji.forEach((h2, i) => {
    const okvir = h2.closest("section, .sklop, .subsection") ?? h2.parentElement;
    const cilj = okvir.id ? okvir : h2;
    const sidro = cilj.id || sidroZa(h2, "razdelek", zasedena);
    const naslednji = h2ji[i + 1];
    const otroci = [];
    let starsh3 = null; // zadnji h3, ki je v kazalu (h4 pod njim gredo en nivo nižje)
    for (const h of okvir.querySelectorAll("h3, h4")) {
      if (h.closest("nav, .kazalo, .tip-primeri, .resitev, details")) continue;
      if (!(h2.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      if (naslednji && !(naslednji.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_PRECEDING)) break;
      const naslov = naslovBesedilo(h);
      if (!naslov) continue;
      if (h.tagName === "H3") {
        if (/^razlaga$/i.test(naslov)) {
          starsh3 = null; // h4 pod »Razlaga« so podpoglavja
          continue;
        }
        const tip = KAZALO_SPLOSNI.test(naslov);
        starsh3 = { naslov: tip ? "Tipi nalog" : naslov, sidro: sidroZa(h, sidro, zasedena), el: h, otroci: [] };
        otroci.push(starsh3);
      } else if (starsh3) {
        starsh3.otroci.push({ naslov, sidro: sidroZa(h, sidro, zasedena), el: h, otroci: [] });
      } else {
        otroci.push({ naslov, sidro: sidroZa(h, sidro, zasedena), el: h, otroci: [] });
      }
    }
    poglavja.push({ naslov: naslovBesedilo(h2), sidro, el: cilj, otroci });
  });
  return poglavja;
}

// Drevo preberemo, preden MathJax izriše formule, da naslovi v kazalu
// obdržijo LaTeX, ki ga MathJax nato izriše še v kazalu.
function pripraviKazaloStrani() {
  if (!/\/snov\/[^/]+\/[^/]+_razlaga\.html$/.test(location.pathname)) return null;
  const view = document.querySelector(".view");
  if (!view?.parentElement) return null;
  const poglavja = drevoKazala(view);
  return poglavja.length >= 2 ? poglavja : null;
}

function initKazaloStrani(poglavja) {
  const vsebnik = document.querySelector(".view")?.parentElement;
  if (!poglavja || !vsebnik) return;

  const aside = document.createElement("aside");
  aside.className = "stran-kazalo";
  aside.id = "stranKazalo";
  aside.setAttribute("aria-label", "Kazalo strani");

  const glava = document.createElement("div");
  glava.className = "stran-kazalo-glava";
  const naslov = document.createElement("a");
  naslov.href = "#";
  naslov.className = "stran-kazalo-naslov";
  naslov.textContent = "Na tej strani";
  naslov.addEventListener("click", (e) => {
    e.preventDefault();
    history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo({ top: 0 });
    zapriPredal();
  });
  const zapri = document.createElement("button");
  zapri.type = "button";
  zapri.className = "stran-kazalo-zapri";
  zapri.setAttribute("aria-label", "Zapri kazalo");
  zapri.textContent = "×";
  glava.append(naslov, zapri);

  const povezave = new Map(); // sidro → <a>
  const elementi = []; // [el, sidro, poglavje-li] v vrstnem redu na strani

  function seznam(vozlisca, nivo, poglavjeLi) {
    const ol = document.createElement("ol");
    ol.className = `stran-kazalo-nivo${nivo}`;
    for (const v of vozlisca) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${v.sidro}`;
      a.textContent = v.naslov;
      povezave.set(v.sidro, a);
      const pli = poglavjeLi ?? li;
      elementi.push([v.el, v.sidro, pli]);
      if (nivo === 1 && v.otroci.length) {
        const vrstica = document.createElement("div");
        vrstica.className = "stran-kazalo-vrstica";
        const gumb = document.createElement("button");
        gumb.type = "button";
        gumb.className = "stran-kazalo-razsiri";
        gumb.setAttribute("aria-expanded", "false");
        gumb.setAttribute("aria-label", `Pokaži podpoglavja: ${v.naslov}`);
        gumb.innerHTML =
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        gumb.addEventListener("click", () => {
          const odprt = !li.classList.contains("odprto");
          li.classList.toggle("odprto", odprt);
          gumb.setAttribute("aria-expanded", String(odprt));
        });
        vrstica.append(a, gumb);
        li.append(vrstica, seznam(v.otroci, 2, li));
      } else {
        li.append(a);
        if (v.otroci.length) li.append(seznam(v.otroci, nivo + 1, pli));
      }
      ol.append(li);
    }
    return ol;
  }

  const drevo = seznam(poglavja, 1, null);
  aside.append(glava, drevo);
  vsebnik.classList.add("view-container--kazalo");
  vsebnik.append(aside);

  // Gumb za ozke zaslone: kazalo se odpre kot predal z desne
  const odpri = document.createElement("button");
  odpri.type = "button";
  odpri.className = "stran-kazalo-odpri";
  odpri.setAttribute("aria-controls", "stranKazalo");
  odpri.setAttribute("aria-expanded", "false");
  odpri.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg><span>Kazalo</span>';
  document.body.append(odpri);

  function zapriPredal() {
    aside.classList.remove("predal-odprt");
    odpri.setAttribute("aria-expanded", "false");
  }
  odpri.addEventListener("click", () => {
    const odprt = aside.classList.toggle("predal-odprt");
    odpri.setAttribute("aria-expanded", String(odprt));
    if (odprt) povezave.get(aktivno)?.scrollIntoView({ block: "center" });
  });
  zapri.addEventListener("click", zapriPredal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") zapriPredal();
  });
  document.addEventListener("click", (e) => {
    if (aside.classList.contains("predal-odprt") && !aside.contains(e.target) && !odpri.contains(e.target)) zapriPredal();
  });
  drevo.addEventListener("click", (e) => {
    if (e.target.closest("a")) zapriPredal();
  });

  // Aktivni razdelek: zadnji naslov, ki je že nad tretjino zaslona
  let aktivno = null;
  let odprtoSamodejno = null;
  function osvezi() {
    const meja = window.innerHeight / 3;
    let trenutni = elementi[0];
    for (const e of elementi) {
      if (e[0].getBoundingClientRect().top <= meja) trenutni = e;
      else break;
    }
    if (!trenutni || trenutni[1] === aktivno) return;
    povezave.get(aktivno)?.classList.remove("aktivno");
    povezave.get(aktivno)?.removeAttribute("aria-current");
    aktivno = trenutni[1];
    const a = povezave.get(aktivno);
    a.classList.add("aktivno");
    a.setAttribute("aria-current", "location");

    drevo.querySelectorAll(".trenutno").forEach((li) => li.classList.remove("trenutno"));
    const li = trenutni[2];
    li.classList.add("trenutno");
    if (odprtoSamodejno && odprtoSamodejno !== li && odprtoSamodejno.dataset.rocno !== "1") {
      odprtoSamodejno.classList.remove("odprto");
      odprtoSamodejno.querySelector(".stran-kazalo-razsiri")?.setAttribute("aria-expanded", "false");
    }
    if (li.querySelector(".stran-kazalo-razsiri") && !li.classList.contains("odprto")) {
      li.classList.add("odprto");
      li.querySelector(".stran-kazalo-razsiri").setAttribute("aria-expanded", "true");
      odprtoSamodejno = li;
    }

    // Aktivna povezava naj ostane vidna v kazalu (brez premikanja strani)
    const okvir = aside.getBoundingClientRect();
    const r = a.getBoundingClientRect();
    if (r.top < okvir.top + 40 || r.bottom > okvir.bottom - 16) {
      aside.scrollTop += r.top - okvir.top - okvir.height / 3;
    }
  }
  drevo.addEventListener("click", (e) => {
    const gumb = e.target.closest(".stran-kazalo-razsiri");
    if (gumb) gumb.closest("li").dataset.rocno = gumb.closest("li").classList.contains("odprto") ? "1" : "";
  });

  let caka = false;
  window.addEventListener(
    "scroll",
    () => {
      if (caka) return;
      caka = true;
      requestAnimationFrame(() => {
        caka = false;
        osvezi();
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", osvezi, { passive: true });
  osvezi();

  // Formule v naslovih (\( … \)) izriše MathJax še v kazalu.
  if (drevo.textContent.includes("\\(")) {
    poMathJaxu().then(() => window.MathJax?.typesetPromise?.([drevo]).catch(() => {}));
  }
}

// ============================================================
// ZAGON
// ============================================================
async function init() {
  const kazalo = pripraviKazaloStrani();
  loadMathJax();

  await Promise.all([
    loadComponent("/components/header.html", "header"),
    loadComponent("/components/sidebar.html", "sidebar"),
    loadComponent("/components/footer.html", "footer"),
  ]);

  initHeader();
  initSidebar();
  initUporabnik();
  initTema();
  initIskanje();
  initKazaloStrani(kazalo);
  oznaciIskanje();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
