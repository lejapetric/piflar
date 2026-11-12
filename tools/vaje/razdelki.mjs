// tools/vaje/razdelki.mjs — razdelek »Naloge« za vsak predmet z nalogami za vajo:
//   public/views/<predmet>/naloge/naloge.html   (vse naloge predmeta s filtrom po snovi in težavnosti)
//   skupina »Naloge« v components/sidebar.html (za Snovjo, s povezavo na naloge vsake snovi)
//   povezava na razdelek na strani predmeta <predmet>.html
// Ponovni zagon ničesar ne podvoji: stran prepiše, meni in povezavo pa doda le, če ju še ni.
//   node tools/vaje/razdelki.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";

const koren = new URL("../../", import.meta.url);
const pot = (p) => new URL(p, koren);
const beri = (p) => readFileSync(pot(p), "utf8");
const snovi = JSON.parse(beri("api/data/snovi.json"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const predmeti = readdirSync(pot("api/data/vaje/")).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", "")).sort();
let sidebar = beri("public/components/sidebar.html");

for (const predmet of predmeti) {
  const naloge = JSON.parse(beri(`api/data/vaje/${predmet}.json`));
  const imaNaloge = new Set(naloge.map((n) => n.poglavje));
  const teme = snovi.filter((s) => s.predmet === predmet && imaNaloge.has(s.slug));
  const glavna = `public/views/${predmet}/${predmet}.html`;
  const ime = beri(glavna).match(/<title>([^|<]+)/)[1].trim();
  const formule = naloge.some((n) => n.besedilo.includes("\\(") || (n.moznosti ?? []).some((m) => m.includes("\\(")));
  const imaMaturo = existsSync(pot(`public/views/${predmet}/matura/matura.html`));
  const url = `/views/${predmet}/naloge/naloge.html`;

  // 1. Stran razdelka
  mkdirSync(pot(`public/views/${predmet}/naloge/`), { recursive: true });
  writeFileSync(pot(`public/views/${predmet}/naloge/naloge.html`), `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naloge: ${esc(ime.toLowerCase())} | Piflar.si</title>
  <meta name="description" content="${esc(`${ime}: naloge za vajo po snovi in težavnosti, od čisto osnovnih do zelo zahtevnih, z rezultati in postopki.`)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>
  <link rel="stylesheet" href="/style/snov.css">
</head>
<body>
  <div id="header"></div>

  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">

        <header class="page-header">
          <span class="page-eyebrow">${esc(ime)} · Naloge</span>
          <h1>Naloge za vajo</h1>
          <p>
            Lastne naloge iz vse snovi, od čisto osnovnih do zelo zahtevnih in zapletenih. Izberi snov in težavnost
            (privzeto so izbrane vse), nato izberi odgovor ali vpiši rezultat in ga preveri. Če se zatakne, si oglej
            rezultat ali celoten postopek.
          </p>
        </header>

        <div id="naloge" class="naloge" data-predmet="${predmet}"${formule ? " data-math" : ""}>
          <p>Nalagam naloge …</p>
        </div>

        <div class="note-band">
          <p>
            <strong>Nasvet:</strong> Začni z lahkimi nalogami snovi, ki jo ravno ponavljaš, in nadaljuj k težjim.
            Naloge z oznako Višja raven so za višjo raven mature.${imaMaturo ? ` Prave maturitetne naloge najdeš v razdelku
            <a href="/views/${predmet}/matura/matura.html">Matura</a>.` : ""}
          </p>
        </div>

      </div>
    </div>
  </div>

  <div id="footer"></div>

  <script src="/components/components.js"></script>
  <script src="/components/naloge.js" defer></script>
</body>
</html>
`);

  // 2. Skupina v meniju: za skupino Snov (pred Maturo ali na konec predmeta)
  if (!sidebar.includes(`href="${url}"`)) {
    const zacetek = sidebar.indexOf(`<div class="nav-sub" id="${predmet}-sub">`);
    const konec = sidebar.indexOf(`<!-- /#${predmet}-sub -->`, zacetek);
    if (zacetek < 0 || konec < 0) throw new Error(`${predmet}: v meniju ni skupine predmeta`);
    const matura = sidebar.indexOf("      <!-- Matura -->", zacetek);
    const mesto = matura > 0 && matura < konec ? matura : sidebar.lastIndexOf("\n", sidebar.lastIndexOf("</div>", konec)) + 1;
    const povezave = teme.map((s) => `          <a href="${url}?snov=${s.slug}">${esc(s.naslov)}</a>`).join("\n");
    const blok = `      <!-- Naloge za vajo -->
      <div class="nav-sub-group">
        <div class="nav-sub-header">
          <a href="${url}" class="label">Naloge</a>
          <button class="dropdown-toggle" data-target="${predmet}-naloge" aria-label="Razširi naloge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
        <div class="nav-sub-list" id="${predmet}-naloge">
${povezave}
        </div>
      </div>

`;
    sidebar = sidebar.slice(0, mesto) + blok + sidebar.slice(mesto);
  }

  // 3. Povezava na strani predmeta (pred prvim razdelkom)
  let stran = beri(glavna);
  if (!stran.includes(`href="${url}"`)) {
    const i = stran.indexOf('        <section class="subsection">');
    if (i < 0) throw new Error(`${predmet}: na strani predmeta ni razdelka`);
    stran = stran.slice(0, i) + `        <section class="subsection">
          <div class="subsection-head">
            <h2>Naloge za vajo</h2>
            <p>${naloge.length} lastnih nalog iz vse snovi, od čisto osnovnih do zelo zahtevnih.</p>
          </div>
          <div class="link-list">
            <a class="link-item" href="${url}">
              <span class="link-item-text">
                <strong>Naloge</strong>
                <small>Izberi snov in težavnost, odgovor preveriš takoj, ob vsaki nalogi sta rezultat in postopek.</small>
              </span>
              <span class="arrow">→</span>
            </a>
          </div>
        </section>

` + stran.slice(i);
    writeFileSync(pot(glavna), stran);
  }
  console.log(`${predmet.padEnd(22)} ${String(naloge.length).padStart(5)} nalog, ${teme.length} snovi${formule ? ", formule" : ""}`);
}
writeFileSync(pot("public/components/sidebar.html"), sidebar);
