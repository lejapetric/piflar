// tools/ustni/gradi.mjs — zgradi api/data/ustni/<predmet>.json iz tools/ustni/<predmet>.mjs
//   node tools/ustni/gradi.mjs              vsi predmeti
//   node tools/ustni/gradi.mjs matematika   en predmet
// Id vprašanja je <predmet>-u-<snov>-<zaporedna številka v snovi>, zato nova vprašanja
// dodajaj na konec seznama snovi (napredek uporabnikov je vezan na id).
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";

const koren = new URL("../../", import.meta.url);
const snovi = JSON.parse(readFileSync(new URL("api/data/snovi.json", koren)));
const izbrani = process.argv.slice(2);
const predmeti = readdirSync(new URL("./", import.meta.url))
  .filter((f) => f.endsWith(".mjs") && f !== "gradi.mjs")
  .map((f) => f.replace(".mjs", ""))
  .filter((p) => !izbrani.length || izbrani.includes(p));

const KRATICE = { matematika: "mat" };
mkdirSync(new URL("api/data/ustni/", koren), { recursive: true });

for (const predmet of predmeti) {
  const { default: poSnoveh } = await import(new URL(`${predmet}.mjs`, import.meta.url));
  const slugi = snovi.filter((s) => s.predmet === predmet).map((s) => s.slug);
  const vprasanja = [];
  for (const slug of slugi) {
    const seznam = poSnoveh[slug] ?? [];
    seznam.forEach(([vprasanje, odgovor, raven], i) => {
      vprasanja.push({
        id: `${KRATICE[predmet] ?? predmet}-u-${slug}-${i + 1}`,
        predmet,
        poglavje: slug,
        raven: raven === "visja" ? "visja" : "osnovna",
        vprasanje,
        odgovor: odgovor.trim(),
      });
    });
    console.log(`${slug.padEnd(40)} ${seznam.length}`);
  }
  for (const slug of Object.keys(poSnoveh))
    if (!slugi.includes(slug)) throw new Error(`${predmet}: neznana snov ${slug}`);
  writeFileSync(new URL(`api/data/ustni/${predmet}.json`, koren), JSON.stringify(vprasanja, null, 1) + "\n");
  console.log(`\n${predmet}: ${vprasanja.length} vprašanj → api/data/ustni/${predmet}.json`);
}
