// tools/vaje/gradi.mjs — zgradi api/data/vaje/<predmet>.json iz tools/vaje/predmeti/<predmet>.mjs
//   node tools/vaje/gradi.mjs            vsi predmeti
//   node tools/vaje/gradi.mjs fizika     en predmet
// Preveri, da ima vsaka snov predmeta vsaj 50 nalog, in izpiše število po težavnostih.
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { zbirka } from "./lib.mjs";

const koren = new URL("../../", import.meta.url);
const snovi = JSON.parse(readFileSync(new URL("api/data/snovi.json", koren)));
const izbrani = process.argv.slice(2);
const moduli = readdirSync(new URL("predmeti/", import.meta.url))
  .filter((f) => f.endsWith(".mjs"))
  .map((f) => f.replace(".mjs", ""))
  .filter((p) => !izbrani.length || izbrani.includes(p));

mkdirSync(new URL("api/data/vaje/", koren), { recursive: true });
let napake = 0;
for (const predmet of moduli) {
  const { default: gradi } = await import(new URL(`predmeti/${predmet}.mjs`, import.meta.url));
  const z = zbirka(predmet);
  await gradi(z);
  const slugi = new Set(snovi.filter((s) => s.predmet === predmet).map((s) => s.slug));
  const poPoglavjih = {};
  for (const n of z.naloge) {
    if (!slugi.has(n.poglavje)) throw new Error(`${predmet}: neznana snov ${n.poglavje}`);
    (poPoglavjih[n.poglavje] ??= [0, 0, 0, 0, 0, 0])[n.tezavnost]++;
    if (n.raven === "visja") poPoglavjih[n.poglavje][5]++;
  }
  console.log(`\n${predmet}: ${z.naloge.length} nalog`);
  for (const slug of slugi) {
    const st = poPoglavjih[slug] ?? [0, 0, 0, 0, 0, 0];
    const skupaj = st[1] + st[2] + st[3] + st[4];
    if (skupaj < 50) napake++;
    console.log(`  ${skupaj < 50 ? "✗" : "✓"} ${slug.padEnd(40)} ${String(skupaj).padStart(3)}  (L ${st[1]}, S ${st[2]}, T ${st[3]}, ZT ${st[4]}; višja ${st[5]})`);
  }
  const json = "[\n" + z.naloge.map((n) => JSON.stringify(n)).join(",\n") + "\n]\n";
  writeFileSync(new URL(`api/data/vaje/${predmet}.json`, koren), json);
}
if (napake) console.log(`\n${napake} snovi ima manj kot 50 nalog.`);
