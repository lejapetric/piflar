// tools/besedisce/gradi.mjs — zgradi stran z besediščem iz tools/besedisce/anglescina.mjs.
//   node tools/besedisce/gradi.mjs
// Po gradnji znova vstavi videe: python3 tools/videi/vstavi_videe.py public/views/anglescina/snov/besedisce/besedisce_razlaga.html anglescina/besedisce
import { writeFileSync } from "node:fs";
import teme from "./anglescina.mjs";

const koren = new URL("../../", import.meta.url);
const E = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const vseTeme = teme.map((t) => [...t.besede, ...(t.dodatne ?? [])]);
const N = vseTeme.reduce((a, b) => a + b.length, 0);
const STOPNJE = [
  ["n", "Nujno", "osnova, ki jo potrebuješ v vsaki poli in pri ustnem izpitu"],
  ["p", "Pogosto", "pogosto v besedilih na polah in v pogovoru o temi"],
  ["o", "Občasno", "bogati besedišče in prinese točke pri sestavkih"],
  ["v", "Višja raven", "besede ravni C1 za esej, književnost in višjo raven"],
];
const stevilo = Object.fromEntries(STOPNJE.map(([k]) => [k, vseTeme.flat().filter((b) => (b[3] ?? "n") === k).length]));

const kazalo = teme
  .map((t, i) => `            <li><a href="#sklop-${i + 1}"><span class="kazalo-st">${i + 1}</span> ${E(t.naslov)}</a></li>`)
  .join("\n");

const vrstica = ([w, p, e, s = "n"]) =>
  `<tr data-stopnja="${s}"><td lang="en"><strong>${E(w)}</strong></td><td>${E(p)}</td><td lang="en"><em>${E(e)}</em></td></tr>`;

const sklopi = teme
  .map((t, i) => {
    const besede = vseTeme[i];
    const skupine = STOPNJE.map(([k, ime]) => {
      const b = besede.filter((x) => (x[3] ?? "n") === k);
      if (!b.length) return "";
      return `            <h3 class="stopnja-naslov" data-stopnja="${k}"><span class="stopnja stopnja-${k}">${ime}</span> ${b.length} ${b.length === 1 ? "beseda" : b.length === 2 ? "besedi" : b.length < 5 ? "besede" : "besed"}</h3>
            <div class="tabela-wrap" data-stopnja="${k}"><table class="tabela besedisce"><thead><tr><th>Beseda</th><th>Prevod</th><th>Primer v povedi</th></tr></thead><tbody>
${b.map(vrstica).join("\n")}
</tbody></table></div>`;
    }).filter(Boolean).join("\n");
    return `        <!-- SKLOP ${i + 1} -->
        <section class="sklop" id="sklop-${i + 1}">
          <header class="sklop-header">
            <span class="sklop-num">16 · ${i + 1}</span>
            <h2>${E(t.naslov)}</h2>
            <p><span lang="en">${E(t.en[0].toUpperCase() + t.en.slice(1))}</span> · ${besede.length} besed</p>
          </header>
          <div class="sklop-teorija">
${skupine}
          </div>
        </section>`;
  })
  .join("\n");

const stran = `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angleščina: besedišče za maturo | Učilnica.com</title>
  <meta name="description" content="${N} angleških besed in zvez, ki jih moraš znati v srednji šoli in na maturi: slovenski prevod in primer v povedi, urejeno po tematskih področjih kataloga M-ANG-2018.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>
  <link rel="stylesheet" href="/style/snov.css">
  <style>
    .besedisce-iskanje { margin: 0 0 24px; }
    .besedisce-iskanje label { display: block; font-weight: 600; margin-bottom: 6px; }
    .besedisce-iskanje input { width: 100%; box-sizing: border-box; padding: 12px 14px; font: inherit; color: var(--text-primary); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); }
    .besedisce-iskanje input:focus { outline: 2px solid var(--primary); outline-offset: 1px; }
    .besedisce-iskanje p { margin: 6px 0 0; color: var(--text-secondary); font-size: var(--text-sm); min-height: 1.4em; }
    .tabela.besedisce { width: 100%; }
    .stopnja { display: inline-block; padding: 2px 9px; border-radius: 999px; font-size: var(--text-xs, 0.75rem); font-weight: 700; letter-spacing: .02em; vertical-align: middle; }
    .stopnja-n { background: #dcfce7; color: #166534; }
    .stopnja-p { background: #dbeafe; color: #1e40af; }
    .stopnja-o { background: #fef3c7; color: #92400e; }
    .stopnja-v { background: #fce7f3; color: #9d174d; }
    :root[data-theme="dark"] .stopnja-n { background: #14532d; color: #bbf7d0; }
    :root[data-theme="dark"] .stopnja-p { background: #1e3a8a; color: #bfdbfe; }
    :root[data-theme="dark"] .stopnja-o { background: #78350f; color: #fde68a; }
    :root[data-theme="dark"] .stopnja-v { background: #831843; color: #fbcfe8; }
    .stopnja-naslov { margin: 22px 0 8px; font-size: var(--text-base, 1rem); color: var(--text-secondary); font-weight: 600; }
    .stopnja-naslov:first-child { margin-top: 0; }
    .stopnje-legenda ul { list-style: none; padding: 0; margin: 0 0 10px; }
    .stopnje-legenda li { margin: 6px 0; }
    .stopnje-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .stopnje-filter .filter-btn { font: inherit; padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border-color); background: var(--bg-card); color: var(--text-primary); cursor: pointer; }
    .stopnje-filter .filter-btn.aktiven { background: var(--primary); color: #fff; border-color: var(--primary); }
    .tabela.besedisce th, .tabela.besedisce td { text-align: left; }
    .tabela.besedisce td:first-child { white-space: nowrap; }
    .tabela.besedisce td:nth-child(2) { min-width: 9em; }
    @media (max-width: 640px) {
      .tabela.besedisce, .tabela.besedisce tbody, .tabela.besedisce tr, .tabela.besedisce td { display: block; width: auto; }
      .tabela.besedisce thead { display: none; }
      .tabela.besedisce tr { padding: 10px 12px; border-bottom: 1px solid var(--border-color); }
      .tabela.besedisce td { border: 0; padding: 2px 0; white-space: normal; min-width: 0; }
      .tabela.besedisce td:nth-child(2) { color: var(--text-secondary); }
    }
  </style>
</head>
<body>

  <div id="header"></div>

  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">

        <header class="page-header">
          <span class="page-eyebrow">Angleščina · Snov · 16</span>
          <h1>Besedišče za maturo</h1>
          <p>Besede in besedne zveze, ki jih moraš znati do konca srednje šole. Urejene so po tematskih področjih iz kataloga M-ANG-2018, znotraj vsakega področja pa po pomembnosti: nujno, pogosto, občasno in samo za višjo raven. Vsaka ima slovenski prevod in primer v angleški povedi.</p>
          <div class="page-meta">
            <div class="page-meta-item"><strong>${teme.length}</strong><span>Področij</span></div>
            <div class="page-meta-item"><strong>${N}</strong><span>Besed in zvez</span></div>
            <div class="page-meta-item"><strong>${stevilo.n}</strong><span>Nujnih</span></div>
          </div>
        </header>

        <div class="matura-formule">
          <h3>Kako se učiti besede</h3>
          <div class="matura-levo">
            <ul>
              <li>uči se cele zveze, ne posameznih besed: <em>make a decision</em>, <em>apply for a job</em>, <em>be keen on</em></li>
              <li>pri vsaki besedi preberi primer na glas in si izmisli še svojo poved</li>
              <li>vsak dan ponovi eno področje; prevod pokrij z roko in preveri, ali se ga spomniš</li>
              <li>zapomni si predlog, ki gre z besedo: <em>rely on</em>, <em>addicted to</em>, <em>cope with</em></li>
              <li>besede iz zadnjega sklopa (<em>however, whereas, therefore</em>) uporabljaj v vsakem sestavku</li>
              <li>besedotvorje (pripone, predpone) je razloženo v temi <a href="/views/anglescina/snov/besedotvorje/besedotvorje_razlaga.html">Besedotvorje in besedišče</a></li>
            </ul>
          </div>
        </div>

        <div class="besedisce-iskanje">
          <label for="isci-besedo">Poišči besedo</label>
          <input id="isci-besedo" type="search" placeholder="npr. pollution ali onesnaženje" autocomplete="off">
          <p id="isci-stevec" aria-live="polite"></p>
        </div>

        <div class="info-card stopnje-legenda">
          <h3>Kako so besede razvrščene</h3>
          <ul>
${STOPNJE.map(([k, ime, opis]) => `            <li><span class="stopnja stopnja-${k}">${ime}</span> ${opis} (${stevilo[k]})</li>`).join("\n")}
          </ul>
          <p>Začni z nujnimi besedami vseh področij, nato dodaj pogoste. Za oceno 4 ali 5 pri pisnih sestavkih in ustnem izpitu potrebuješ tudi občasne, na višji ravni pa še besede ravni C1. Besede za opis slike pri ustnem izpitu so na strani <a href="/views/anglescina/snov/opis_slike/opis_slike_razlaga.html">Opis slike in pogovor po temah</a>.</p>
          <div class="stopnje-filter" role="group" aria-label="Pokaži stopnje">
            <button type="button" class="filter-btn aktiven" data-filter="vse">Vse</button>
${STOPNJE.map(([k, ime]) => `            <button type="button" class="filter-btn" data-filter="${k}">${ime}</button>`).join("\n")}
          </div>
        </div>

        <nav class="kazalo" aria-label="Tematska področja">
          <h2>Tematska področja</h2>
          <ol>
${kazalo}
          </ol>
        </nav>

${sklopi}

        <div class="note-band">
          <p>
            <strong>Vaja:</strong> Besede utrdiš z
            <a href="/views/anglescina/snov/besedisce/besedisce_naloge.html">nalogami za vajo</a>:
            prevod v obe smeri in vstavljanje besede v poved.
          </p>
        </div>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Vse teme</h2>
          </div>
          <div class="link-list">
            <a class="link-item" href="/views/anglescina/snov/snov.html">
              <span class="link-item-text"><strong>Pregled snovi: angleščina</strong><small>Vse teme predmeta na enem mestu.</small></span>
              <span class="arrow">→</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  </div>

  <div id="footer"></div>

  <script src="/components/components.js"></script>
  <script>
    (function () {
      var vnos = document.getElementById('isci-besedo');
      var stevec = document.getElementById('isci-stevec');
      var sklopi = Array.prototype.slice.call(document.querySelectorAll('.sklop'));
      var gumbi = Array.prototype.slice.call(document.querySelectorAll('.stopnje-filter .filter-btn'));
      var filter = 'vse';
      function osvezi() {
        var q = vnos.value.trim().toLowerCase();
        var skupaj = 0;
        sklopi.forEach(function (s) {
          var vidnihSklop = 0;
          s.querySelectorAll('.tabela-wrap[data-stopnja]').forEach(function (wrap) {
            var st = wrap.getAttribute('data-stopnja');
            var vidnih = 0;
            wrap.querySelectorAll('tbody tr').forEach(function (tr) {
              var c = tr.cells;
              var ujema = (filter === 'vse' || filter === st) && (!q || (c[0].textContent + ' ' + c[1].textContent).toLowerCase().indexOf(q) !== -1);
              tr.hidden = !ujema;
              if (ujema) vidnih++;
            });
            wrap.hidden = vidnih === 0;
            var h = wrap.previousElementSibling;
            if (h && h.classList.contains('stopnja-naslov')) h.hidden = vidnih === 0;
            vidnihSklop += vidnih;
          });
          s.hidden = vidnihSklop === 0;
          skupaj += vidnihSklop;
        });
        stevec.textContent = (q || filter !== 'vse') ? (skupaj ? 'Prikazanih besed: ' + skupaj : 'Ni zadetkov.') : '';
      }
      vnos.addEventListener('input', osvezi);
      gumbi.forEach(function (g) {
        g.addEventListener('click', function () {
          filter = g.getAttribute('data-filter');
          gumbi.forEach(function (x) { x.classList.toggle('aktiven', x === g); });
          osvezi();
        });
      });
    })();
  </script>
</body>
</html>
`;
writeFileSync(new URL("public/views/anglescina/snov/besedisce/besedisce_razlaga.html", koren), stran);
console.log(`besedisce_razlaga.html: ${teme.length} področij, ${N} besed`, stevilo);
