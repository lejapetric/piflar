// Naloge predmeta, ki ima vsako snov v svoji datoteki: tools/vaje/<predmet>/<slug>.mjs.
// Vsaka datoteka izvozi default({ z, slug, serija, r, vprasanja, pojmi }).
//   serija(ime, n, predloga)   n nalog iz predloge z naključnimi (ponovljivimi) podatki
//   vprasanja([...])           ročno napisana vprašanja (glej lib.vprasanja)
//   pojmi([...])               pojmovnik (glej lib.pojmovnik)
import { readdirSync, existsSync } from "node:fs";
import { rng, vprasanja, pojmovnik } from "./lib.mjs";

export async function izMape(predmet, z) {
  const mapa = new URL(`./${predmet}/`, import.meta.url);
  if (!existsSync(mapa)) return;
  for (const f of readdirSync(mapa).filter((f) => f.endsWith(".mjs")).sort()) {
    const slug = f.replace(".mjs", "");
    const { default: gradi } = await import(new URL(f, mapa));
    const videne = new Set();
    const serija = (ime, n, predloga) => {
      const r = rng(`${predmet}-${slug}-${ime}`);
      let dodanih = 0;
      for (let poskus = 0; dodanih < n && poskus < n * 20; poskus++) {
        const naloga = predloga(r, dodanih);
        if (!naloga || videne.has(naloga.besedilo)) continue;
        videne.add(naloga.besedilo);
        z.dodaj(slug, naloga);
        dodanih++;
      }
    };
    await gradi({
      z, slug, serija, r: rng(`${predmet}-${slug}`),
      vprasanja: (seznam, o) => vprasanja(z, slug, seznam, o),
      pojmi: (seznam, o) => pojmovnik(z, slug, seznam, o),
    });
  }
}
