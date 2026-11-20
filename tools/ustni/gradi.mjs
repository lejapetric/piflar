// tools/ustni/gradi.mjs — zgradi api/data/ustni/<predmet>.json iz tools/ustni/<predmet>/
//   node tools/ustni/gradi.mjs              vsi predmeti
//   node tools/ustni/gradi.mjs matematika   en predmet
//
// Vprašanja so iz uradnega seznama RIC (Vprašanja za ustni izpit, splošna matura 2026),
// odgovori in razlage so naši. Mapa predmeta vsebuje osnovna-*.mjs (listki osnovne ravni)
// in visja-*.mjs (listki višje ravni; vprašanje, enako vprašanju osnovne ravni, je zapisano
// kot ref(st, i) in prevzame besedilo, točke, odgovor in razlago).
// Id vprašanja je <kratica>-u-<or|vr>-<listek>-<zaporedna številka na listku>; napredek
// uporabnikov je vezan na id, zato številčenja ne spreminjaj.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";

const koren = new URL("../../", import.meta.url);
const snovi = JSON.parse(readFileSync(new URL("api/data/snovi.json", koren)));
const izbrani = process.argv.slice(2);
const KRATICE = { matematika: "mat" };
const predmeti = readdirSync(new URL("./", import.meta.url)).filter(
  (f) => statSync(new URL(f, import.meta.url)).isDirectory() && (!izbrani.length || izbrani.includes(f))
);
mkdirSync(new URL("api/data/ustni/", koren), { recursive: true });

async function preberi(predmet, predpona) {
  const mapa = new URL(`${predmet}/`, import.meta.url);
  const listki = [];
  for (const f of readdirSync(mapa).filter((f) => f.startsWith(predpona) && f.endsWith(".mjs")).sort())
    listki.push(...(await import(new URL(f, mapa))).default);
  listki.sort((a, b) => a.st - b.st);
  listki.forEach((l, i) => {
    if (l.st !== i + 1) throw new Error(`${predmet}/${predpona}: manjka ali se ponavlja listek ${i + 1}`);
  });
  return listki;
}

for (const predmet of predmeti) {
  const k = KRATICE[predmet] ?? predmet;
  const slugi = new Set(snovi.filter((s) => s.predmet === predmet).map((s) => s.slug));
  const osnovna = await preberi(predmet, "osnovna");
  const visja = await preberi(predmet, "visja");
  const vprasanja = [];
  const dodaj = (raven, l, v, i) => {
    if (!slugi.has(l.snov)) throw new Error(`${predmet}: neznana snov ${l.snov} (listek ${l.st})`);
    if (!v.vprasanje || !v.odgovor || !(v.tocke >= 1)) throw new Error(`${predmet}: nepopolno vprašanje ${raven} ${l.st}.${i + 1}`);
    vprasanja.push({
      id: `${k}-u-${raven === "osnovna" ? "or" : "vr"}-${l.st}-${i + 1}`,
      predmet,
      raven,
      listek: l.st,
      listekNaslov: l.naslov,
      poglavje: l.snov,
      tocke: v.tocke,
      vprasanje: v.vprasanje.trim(),
      odgovor: v.odgovor.trim(),
      ...(v.razlaga ? { razlaga: v.razlaga.trim() } : {}),
    });
  };
  for (const l of osnovna) l.vprasanja.forEach((v, i) => dodaj("osnovna", l, v, i));
  for (const l of visja) {
    const o = osnovna[l.st - 1];
    const pol = { st: l.st, naslov: l.naslov ?? o.naslov, snov: l.snov ?? o.snov };
    l.vprasanja.forEach((v, i) => {
      if (v.ref) {
        const [st, j] = v.ref;
        const izvor = osnovna[st - 1]?.vprasanja[j - 1];
        if (!izvor) throw new Error(`${predmet}: neveljaven ref ${st}.${j} (višja ${l.st}.${i + 1})`);
        v = { ...izvor, ...(v.tocke ? { tocke: v.tocke } : {}) };
      }
      dodaj("visja", pol, v, i);
    });
  }
  writeFileSync(new URL(`api/data/ustni/${predmet}.json`, koren), JSON.stringify(vprasanja, null, 1) + "\n");
  const n = (r) => vprasanja.filter((v) => v.raven === r).length;
  console.log(`${predmet}: osnovna ${osnovna.length} listkov / ${n("osnovna")} vprašanj, višja ${visja.length} listkov / ${n("visja")} vprašanj`);
  console.log(`  z razlago: ${vprasanja.filter((v) => v.razlaga).length}`);
}
