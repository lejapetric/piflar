// Ustvari plonk listke: public/views/<predmet>/snov/<slug>/<slug>_plonk.html
// iz api/data/plonk/<predmet>.txt. Zagon: node tools/plonk/plonk.mjs [predmet ...]
//
// Oblika vira (ena snov za drugo):
//   === <mapa>[/<ime>]            začetek snovi (views/<predmet>/snov/<mapa>/<ime>_razlaga.html)
//   ## Naslov sklopa              nov sklop (oštevilči se sam)
//   formula :: pomen :: primer    vrstica; pomen in primer sta neobvezna
//   ! past                        opozorilo v okvirčku »Pazi« na koncu
//   + <predmet>:<snov>[#1,3]      prevzame sklope (vse ali le naštete, od 1) in pasti
//                                 druge snovi, npr. + matematika:funkcije/kvadratna#1,2
// Besedilo se ubeži (<, >, &); **krepko** postane <strong>. Formule v \( … \).
// Naslov in oznako (Predmet · Snov · 4.12) prebere iz strani z razlago.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const koren = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const virDir = join(koren, "api", "data", "plonk");
const izbrani = process.argv.slice(2);

const ubezi = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
const brezOznak = (s) => s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const dolzina = (s) => s.replace(/\\\(|\\\)|\\[a-zA-Z]+|[{}^_]/g, "").length;

function preberi(predmet) {
  const snovi = [];
  let snov = null, sklop = null;
  readFileSync(join(virDir, `${predmet}.txt`), "utf8").split(/\r?\n/).forEach((vrstica, i) => {
    const v = vrstica.trim();
    if (!v || v.startsWith("//")) return;
    if (v.startsWith("=== ")) {
      snov = { slug: v.slice(4).trim(), sklopi: [], pasti: [] };
      snovi.push(snov);
      sklop = null;
    } else if (!snov) {
      throw new Error(`${predmet}.txt:${i + 1}: vrstica pred prvo snovjo`);
    } else if (v.startsWith("## ")) {
      sklop = { naslov: v.slice(3).trim(), vrstice: [] };
      snov.sklopi.push(sklop);
    } else if (v.startsWith("+ ")) {
      snov.vkljuci = snov.vkljuci ?? [];
      snov.vkljuci.push({ mesto: snov.sklopi.length, ref: v.slice(2).trim() });
      sklop = null;
    } else if (v.startsWith("! ")) {
      snov.pasti.push(v.slice(2).trim());
    } else {
      if (!sklop) throw new Error(`${predmet}.txt:${i + 1}: vrstica brez sklopa`);
      const [f = "", o = "", p = ""] = v.split(" :: ").map((x) => x.trim());
      sklop.vrstice.push({ f, o, p });
    }
  });
  return snovi;
}

const prebrani = {};
function poisci(ref) {
  const [, predmet, slug, izbor] = ref.match(/^([a-z_]+):([^#]+)(?:#(.+))?$/) ?? [];
  if (!predmet) throw new Error(`napačna vključitev: ${ref}`);
  prebrani[predmet] ??= preberi(predmet);
  const snov = prebrani[predmet].find((s) => s.slug === slug);
  if (!snov) throw new Error(`vključitev ${ref}: ni snovi`);
  razresi(snov);
  const sklopi = izbor ? izbor.split(",").map((i) => snov.sklopi[Number(i) - 1]) : snov.sklopi;
  if (sklopi.some((s) => !s)) throw new Error(`vključitev ${ref}: ni sklopa`);
  return { sklopi, pasti: izbor ? [] : snov.pasti };
}
function razresi(snov) {
  if (!snov.vkljuci) return;
  const vkljuci = snov.vkljuci;
  delete snov.vkljuci;
  for (const { mesto, ref } of vkljuci.reverse()) {
    const { sklopi, pasti } = poisci(ref);
    snov.sklopi.splice(mesto, 0, ...sklopi);
    snov.pasti.push(...pasti.filter((p) => !snov.pasti.includes(p)));
  }
}

function stran(predmet, snov) {
  razresi(snov);
  // slug je »mapa« ali »mapa/ime« (npr. funkcije/kvadratna: več razlag v eni mapi)
  const [imeMape, ime = imeMape] = snov.slug.split("/");
  const mapa = join(koren, "public", "views", predmet, "snov", imeMape);
  const razlaga = join(mapa, `${ime}_razlaga.html`);
  if (!existsSync(razlaga)) throw new Error(`${predmet}/${snov.slug}: ni strani z razlago`);
  const html = readFileSync(razlaga, "utf8");
  const naslov = brezOznak(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? snov.slug);
  const oznaka = brezOznak(html.match(/class="page-eyebrow">([\s\S]*?)<\/span>/)?.[1] ?? "");
  const [imePredmeta, , stevilka] = oznaka.split(" · ");
  const vrh = `Plonk listek · ${[imePredmeta, stevilka].filter(Boolean).join(" ")}`;

  const sklopi = snov.sklopi.map((s, i) => {
    const vrstice = s.vrstice.map(({ f, o, p }) => {
      const dolga = dolzina(f) + dolzina(o) > 58 || (f && dolzina(f) > 34);
      const deli = [];
      if (f) deli.push(`<div class="pl-f">${ubezi(f)}</div>`);
      if (o) deli.push(`<div class="pl-o">${ubezi(o)}</div>`);
      if (p) deli.push(`<div class="pl-p">${ubezi(p)}</div>`);
      return `              <div class="pl-r${dolga ? " pl-r--dolga" : ""}">${deli.join("")}</div>`;
    });
    return `            <section class="pl-sklop">
              <h2><span class="pl-st">${i + 1}</span>${ubezi(s.naslov)}</h2>
${vrstice.join("\n")}
            </section>`;
  });
  if (snov.pasti.length) {
    sklopi.push(`            <section class="pl-sklop pl-pasti">
              <h2><span class="pl-st">!</span>Pazi</h2>
              <ul>
${snov.pasti.map((p) => `                <li>${ubezi(p)}</li>`).join("\n")}
              </ul>
            </section>`);
  }

  const izhod = `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${ubezi(naslov)} — plonk listek | Učilnica.com</title>
  <meta name="description" content="Plonk listek za maturo: ${ubezi(naslov)} na enem listu A4, vsaka formula ali pojem s kratkim primerom.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Kalam:wght@400;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>
  <link rel="stylesheet" href="/style/snov.css">
  <link rel="stylesheet" href="/style/plonk.css">
</head>
<body>
  <div id="header"></div>
  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">

        <!-- Ustvari tools/plonk/plonk.mjs iz api/data/plonk/${predmet}.txt; ne urejaj ročno. -->
        <article class="plonk">
          <header class="pl-glava">
            <div>
              <span class="pl-oznaka">${ubezi(vrh)}</span>
              <h1>${ubezi(naslov)}</h1>
            </div>
            <div class="pl-gumbi">
              <a class="pl-gumb pl-gumb--tiho" href="${ime}_razlaga.html">Cela razlaga</a>
              <button type="button" class="pl-gumb" onclick="window.print()">Natisni</button>
            </div>
          </header>

          <div class="pl-vsebina">
${sklopi.join("\n\n")}
          </div>
          <footer class="pl-noga">piflar.si · plonk listek · ${ubezi(naslov)}</footer>
        </article>

      </div>
    </div>
  </div>

  <div id="footer"></div>
  <script src="/components/components.js"></script>
</body>
</html>
`;
  writeFileSync(join(mapa, `${ime}_plonk.html`), izhod);
}

const predmeti = izbrani.length ? izbrani : readdirSync(virDir).filter((f) => f.endsWith(".txt")).map((f) => f.slice(0, -4));
let n = 0;
for (const predmet of predmeti) {
  for (const snov of preberi(predmet)) {
    stran(predmet, snov);
    n++;
  }
}
console.log(`Ustvarjenih plonk listkov: ${n}`);
