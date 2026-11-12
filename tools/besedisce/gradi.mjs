// tools/besedisce/gradi.mjs — zgradi stran z besediščem iz tools/besedisce/anglescina.mjs.
//   node tools/besedisce/gradi.mjs
import { writeFileSync } from "node:fs";
import teme from "./anglescina.mjs";

const koren = new URL("../../", import.meta.url);
const E = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
const N = teme.reduce((a, t) => a + t.besede.length, 0);

const kazalo = teme
  .map((t, i) => `            <li><a href="#sklop-${i + 1}"><span class="kazalo-st">${i + 1}</span> ${E(t.naslov)}</a></li>`)
  .join("\n");

const sklopi = teme
  .map((t, i) => {
    const vrstice = t.besede
      .map(([w, p, e]) => `<tr><td lang="en"><strong>${E(w)}</strong></td><td>${E(p)}</td><td lang="en"><em>${E(e)}</em></td></tr>`)
      .join("\n");
    return `        <!-- SKLOP ${i + 1} -->
        <section class="sklop" id="sklop-${i + 1}">
          <header class="sklop-header">
            <span class="sklop-num">13 · ${i + 1}</span>
            <h2>${E(t.naslov)}</h2>
            <p><span lang="en">${E(t.en[0].toUpperCase() + t.en.slice(1))}</span> · ${t.besede.length} besed</p>
          </header>
          <div class="sklop-teorija">
            <div class="tabela-wrap"><table class="tabela besedisce"><thead><tr><th>Beseda</th><th>Prevod</th><th>Primer v povedi</th></tr></thead><tbody>
${vrstice}
            </tbody></table></div>
          </div>
        </section>`;
  })
  .join("\n");

const stran = `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angleščina: besedišče za maturo | Piflar.si</title>
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
          <span class="page-eyebrow">Angleščina · Snov · 13</span>
          <h1>Besedišče za maturo</h1>
          <p>Besede in besedne zveze, ki jih moraš znati do konca srednje šole. Urejene so po tematskih področjih iz kataloga M-ANG-2018, vsaka ima slovenski prevod in primer v angleški povedi.</p>
          <div class="page-meta">
            <div class="page-meta-item"><strong>${teme.length}</strong><span>Področij</span></div>
            <div class="page-meta-item"><strong>${N}</strong><span>Besed in zvez</span></div>
            <div class="page-meta-item"><strong>~40 min</strong><span>Branja</span></div>
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
      vnos.addEventListener('input', function () {
        var q = vnos.value.trim().toLowerCase();
        var skupaj = 0;
        sklopi.forEach(function (s) {
          var vidnih = 0;
          s.querySelectorAll('tbody tr').forEach(function (tr) {
            var c = tr.cells;
            var ujema = !q || (c[0].textContent + ' ' + c[1].textContent).toLowerCase().indexOf(q) !== -1;
            tr.hidden = !ujema;
            if (ujema) vidnih++;
          });
          s.hidden = vidnih === 0;
          skupaj += vidnih;
        });
        stevec.textContent = q ? (skupaj ? 'Zadetkov: ' + skupaj : 'Ni zadetkov.') : '';
      });
    })();
  </script>
</body>
</html>
`;
writeFileSync(new URL("public/views/anglescina/snov/besedisce/besedisce_razlaga.html", koren), stran);
console.log(`besedisce_razlaga.html: ${teme.length} področij, ${N} besed`);
