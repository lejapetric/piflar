// Naloge predmeta, ki ima vsako snov v svoji datoteki: tools/vaje/<predmet>/<slug>.mjs.
// Vsaka datoteka izvozi default({ z, slug, serija, r, vprasanja, pojmi }).
//   serija(ime, n, predloga)   n nalog iz predloge z naključnimi (ponovljivimi) podatki
//   vprasanja([...])           ročno napisana vprašanja (glej lib.vprasanja)
//   pojmi([...])               pojmovnik (glej lib.pojmovnik)
// Za njimi pridejo ročno napisane dodatne naloge iz tools/vaje/<predmet>-dodatne/<slug>.mjs
// (glej matematika-dodatne/README.md); id-ji obstoječih nalog se zato ne spremenijo.
import { readdirSync, existsSync } from "node:fs";
import { rng, vprasanja, pojmovnik, stevilo, izbira } from "./lib.mjs";

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
  await dodatne(predmet, z);
}

// Ročno napisane naloge: { t, b, rez, post, raven?, namig?, enota?, v, tol? } ali { …, p, n }
// Brez tol je pri nalogi z enoto dovoljeno 1 % odstopanja, sicer privzeto iz lib.stevilo.
async function dodatne(predmet, z) {
  const mapa = new URL(`./${predmet}-dodatne/`, import.meta.url);
  if (!existsSync(mapa)) return;
  for (const f of readdirSync(mapa).filter((f) => f.endsWith(".mjs")).sort()) {
    const slug = f.replace(".mjs", "");
    const { default: seznam } = await import(new URL(f, mapa));
    const r = rng(`${predmet}-${slug}-dodatne`);
    for (const { t, b, rez, post, raven = "osnovna", namig, enota, v, tol, p, n } of seznam) {
      const skupno = { tezavnost: t, raven, besedilo: b, postopek: post, ...(namig ? { namig } : {}) };
      if (p !== undefined) z.dodaj(slug, izbira({ ...skupno, r, pravilna: p, napacne: n }));
      else {
        const toleranca = tol ?? (enota ? Math.abs(v) * 0.01 || 1e-9 : undefined);
        z.dodaj(slug, stevilo({ ...skupno, vrednost: v, ...(toleranca !== undefined ? { toleranca } : {}), ...(enota ? { enota } : {}), rezultat: rez }));
      }
    }
  }
}
