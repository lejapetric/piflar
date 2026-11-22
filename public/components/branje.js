// public/components/branje.js
// Tedenska priprava: na strani z razlago meri, koliko je prijavljen dijak predelal posamezen sklop.
// Šteje čas, ko je zavihek odprt, dijak je v zadnji minuti premaknil miško, drsal ali tipkal in je
// sklop na sredini zaslona, ter čas predvajanega videa sklopa (preskakovanje ne šteje).
// Prirastke pošilja strežniku (/api/priprava/branje) vsakih 15 s in ob zapiranju strani.
// Strežnik odloči, kdaj je sklop predelan, in omeji prirastke na čas, ki je res minil.
// Naloži ga components.js samo na straneh /views/<predmet>/snov/<slug>/<slug>_razlaga.html.
(() => {
  const m = location.pathname.match(/^\/views\/([^/]+)\/snov\/([^/]+)\/\2_razlaga\.html$/);
  if (!m) return;
  const [, predmet, slug] = m;
  const POSILJAJ_MS = 15_000;
  const NEAKTIVEN_PO_MS = 60_000;

  let stanje = null; // zadnji odgovor strežnika
  const prirastki = new Map(); // id sklopa → { cas, video, trajanje }
  let zadnjaAktivnost = Date.now();
  let okvir, oznake = new Map();

  const sklopi = () => [...document.querySelectorAll(".view section.sklop[id]")];
  const prirastek = (id) => {
    if (!prirastki.has(id)) prirastki.set(id, { cas: 0, video: 0, trajanje: 0 });
    return prirastki.get(id);
  };

  function el(tag, className, text) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  // ---------------- merjenje ----------------
  function aktiven() {
    return document.visibilityState === "visible" && Date.now() - zadnjaAktivnost < NEAKTIVEN_PO_MS;
  }

  // Sklop, ki pokriva vodoravno črto pri 40 % višine zaslona
  function sklopNaZaslonu() {
    const crta = window.innerHeight * 0.4;
    return sklopi().find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= crta && r.bottom >= crta;
    });
  }

  function vsakoSekundo() {
    if (!stanje || !aktiven()) return;
    const s = sklopNaZaslonu();
    if (!s || !stanje.sklopi.some((x) => x.id === s.id)) return;
    prirastek(s.id).cas += 1;
    osveziOznako(s.id);
  }

  function spremljajVideo(video) {
    const sklop = video.closest("section.sklop[id]");
    if (!sklop) return;
    let zadnji = video.currentTime;
    video.addEventListener("seeking", () => (zadnji = video.currentTime));
    video.addEventListener("play", () => (zadnji = video.currentTime));
    video.addEventListener("timeupdate", () => {
      const d = video.currentTime - zadnji;
      zadnji = video.currentTime;
      if (video.paused || !(d > 0) || d > 2.5 || !stanje) return; // skok (preskakovanje) ne šteje
      const p = prirastek(sklop.id);
      p.video += d;
      if (Number.isFinite(video.duration)) p.trajanje = Math.max(p.trajanje, video.duration);
      zadnjaAktivnost = Date.now(); // gledanje videa je aktivnost
      osveziOznako(sklop.id);
    });
  }

  // ---------------- strežnik ----------------
  async function poslji(zapiranje = false) {
    if (!stanje || !prirastki.size) return;
    const sklopiPorocila = [...prirastki].map(([id, p]) => ({ id, cas: p.cas, video: Math.round(p.video * 10) / 10, trajanje: Math.round(p.trajanje) }));
    prirastki.clear();
    try {
      const res = await fetch("/api/priprava/branje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ predmet, slug, sklopi: sklopiPorocila }),
        keepalive: zapiranje,
      });
      if (res.ok && !zapiranje) {
        stanje = await res.json();
        izrisi();
      }
    } catch {
      /* brez povezave: prirastki se izgubijo, kar je bolje kot dvojno štetje */
    }
  }

  // ---------------- prikaz ----------------
  function delez(s) {
    const p = prirastki.get(s.id);
    const cas = s.cas + (p?.cas ?? 0);
    const trajanje = Math.max(s.trajanje, p?.trajanje ?? 0);
    const gledano = s.gledano + (p?.video ?? 0);
    const izVidea = s.video && trajanje >= 10 ? gledano / (0.8 * trajanje) : 0;
    return Math.min(1, Math.max(cas / s.minCas, izVidea));
  }

  function osveziOznako(id) {
    const s = stanje?.sklopi.find((x) => x.id === id);
    const o = oznake.get(id);
    if (!s || !o) return;
    const d = s.predelan ? 1 : delez(s);
    o.hidden = d === 0;
    o.classList.toggle("branje-oznaka--predelano", s.predelan);
    o.textContent = s.predelan ? "✓ Predelano" : d >= 1 ? "✓ Predelano (shranjujem …)" : `Predelano ${Math.floor(d * 100)} %`;
  }

  function izrisi() {
    const glava = document.querySelector(".view .page-header");
    if (!glava || !stanje?.skupaj) return;
    if (!okvir) {
      okvir = el("aside", "branje-napredek");
      okvir.setAttribute("aria-live", "polite");
      glava.after(okvir);
      for (const s of sklopi()) {
        if (!stanje.sklopi.some((x) => x.id === s.id)) continue;
        const o = el("span", "branje-oznaka");
        o.hidden = true;
        (s.querySelector(".sklop-header") ?? s).append(o);
        oznake.set(s.id, o);
      }
    }
    const { predelani, potrebno, skupaj, predelano } = stanje;
    const vrh = el("div", "branje-napredek-vrh");
    const naslov = el("strong", "", predelano ? "Razlaga je predelana" : "Sprotno učenje: predelaj razlago");
    const st = el("span", "branje-napredek-st", `${predelani} od ${skupaj} sklopov`);
    vrh.append(naslov, st);
    const trak = el("div", "branje-trak");
    trak.setAttribute("role", "progressbar");
    trak.setAttribute("aria-valuemin", "0");
    trak.setAttribute("aria-valuemax", String(potrebno));
    trak.setAttribute("aria-valuenow", String(Math.min(predelani, potrebno)));
    trak.setAttribute("aria-label", "Predelani sklopi");
    const polnilo = el("span");
    polnilo.style.width = `${Math.min(100, (predelani / potrebno) * 100)}%`;
    trak.append(polnilo);
    const opis = el("p", "branje-napredek-opis");
    if (predelano) {
      opis.append("Zdaj utrdi snov z nalogami. ");
      const a = el("a", "", "Na tedenski načrt");
      a.href = "/priprava.html";
      opis.append(a, ".");
    } else {
      opis.textContent =
        `Za predelano razlago potrebuješ ${potrebno} od ${skupaj} sklopov. Sklop šteje, ko ga v miru prebereš ` +
        "(stran je odprta in sklop je na zaslonu) ali pogledaš vsaj 80 % njegovega videa.";
    }
    okvir.classList.toggle("branje-napredek--predelano", predelano);
    okvir.replaceChildren(vrh, trak, opis);
    for (const id of oznake.keys()) osveziOznako(id);
  }

  // ---------------- zagon ----------------
  async function zagon() {
    let res;
    try {
      res = await fetch(`/api/priprava/branje?predmet=${encodeURIComponent(predmet)}&slug=${encodeURIComponent(slug)}`);
    } catch {
      return;
    }
    if (!res.ok) return; // gost ali snov brez razlage: nič ne merimo
    stanje = await res.json();
    izrisi();

    for (const dogodek of ["scroll", "wheel", "mousemove", "keydown", "pointerdown", "touchstart"])
      window.addEventListener(dogodek, () => (zadnjaAktivnost = Date.now()), { passive: true });
    document.querySelectorAll(".view section.sklop video").forEach(spremljajVideo);
    setInterval(vsakoSekundo, 1000);
    setInterval(() => poslji(), POSILJAJ_MS);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") poslji(true);
    });
    window.addEventListener("pagehide", () => poslji(true));
  }

  zagon();
})();
