// Matematika: vsaka snov ima svojo datoteko v tools/vaje/matematika/<slug>.mjs.
// Številske naloge so sestavljene iz predlog z naključnimi (a ponovljivimi) podatki,
// rezultat in postopek izračuna program, zato se ujemata z besedilom.
import { readdirSync } from "node:fs";
import { rng } from "../lib.mjs";

export default async function (z) {
  const mapa = new URL("../matematika/", import.meta.url);
  for (const f of readdirSync(mapa).filter((f) => f.endsWith(".mjs")).sort()) {
    const slug = f.replace(".mjs", "");
    const { default: gradi } = await import(new URL(f, mapa));
    const videne = new Set();
    // serija(n, predloga): predlogo pokliče n-krat z različnimi podatki, podvojene naloge izpusti
    const serija = (ime, n, predloga) => {
      const r = rng(`matematika-${slug}-${ime}`);
      let dodanih = 0;
      for (let poskus = 0; dodanih < n && poskus < n * 20; poskus++) {
        const naloga = predloga(r, dodanih);
        if (!naloga || videne.has(naloga.besedilo)) continue;
        videne.add(naloga.besedilo);
        z.dodaj(slug, naloga);
        dodanih++;
      }
    };
    gradi({ z, slug, serija, r: rng(`matematika-${slug}`) });
  }
}
