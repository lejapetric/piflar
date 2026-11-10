// tools/vaje/strani.mjs — za vsako snov z nalogami naredi stran z nalogami za vajo:
// public/views/<predmet>/snov/<slug>/<slug>_naloge.html (naslov je enak kot pri snovi).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";

const koren = new URL("../../", import.meta.url);
const snovi = JSON.parse(readFileSync(new URL("api/data/snovi.json", koren)));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let st = 0;
for (const s of snovi) {
  const mapa = `public/views/${s.predmet}/snov/${s.slug}/`;
  const razlaga = new URL(`${mapa}${s.slug}_razlaga.html`, koren);
  const imaRazlago = existsSync(razlaga);
  if (!imaRazlago && !existsSync(new URL(`tools/vaje/${s.predmet}/${s.slug}.mjs`, koren))) continue;
  const glavna = new URL(`public/views/${s.predmet}/${s.predmet}.html`, koren);
  const html = imaRazlago ? readFileSync(razlaga, "utf8") : "";
  const predmet = (html.match(/<span class="page-eyebrow">([^·<]+)/)?.[1] ?? (existsSync(glavna) ? readFileSync(glavna, "utf8").match(/<title>([^|<]+)/)?.[1] : null) ?? s.predmet).trim();
  mkdirSync(new URL(mapa, koren), { recursive: true });
  const naslov = esc(s.naslov);
  const stran = `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${naslov}: naloge za vajo | Piflar.si</title>
  <meta name="description" content="${esc(`${predmet}, ${s.naslov.toLowerCase()}: naloge za vajo od lahkih do zelo težkih, z rezultati in postopki.`)}">
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
          <span class="page-eyebrow">${esc(predmet)} · Naloge za vajo${s.stevilka ? ` · ${esc(String(s.stevilka))}` : ""}</span>
          <h1>${naslov}</h1>
          <p>
            Naloge so razvrščene od lahkih do zelo težkih, težavnost piše v desnem kotu vsake naloge.
            Izberi odgovor ali vpiši rezultat in ga preveri. Če se zatakne, si oglej rezultat ali celoten postopek.
          </p>
        </header>

        <div id="naloge" class="naloge" data-predmet="${s.predmet}" data-poglavje="${s.slug}" data-math>
          <p>Nalagam naloge …</p>
        </div>

        <div class="note-band">
          <p>
            ${imaRazlago ? `<strong>Nasvet:</strong> Najprej predelaj
            <a href="/views/${s.predmet}/snov/${s.slug}/${s.slug}_razlaga.html">razlago snovi</a>,
            nato rešuj naloge brez pogledovanja v postopek.` : `<strong>Nasvet:</strong> Razlaga te snovi je še v pripravi. Rešuj naloge brez pogledovanja v postopek; ob vsaki napaki preberi postopek in nalogo reši še enkrat.`} Naloge z oznako Višja raven so za višjo raven mature.
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
`;
  writeFileSync(new URL(`${mapa}${s.slug}_naloge.html`, koren), stran);
  st++;
}
console.log(`${st} strani z nalogami`);
