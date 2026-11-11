// Matematika: vsaka snov ima svojo datoteko v tools/vaje/matematika/<slug>.mjs.
// Številske naloge so sestavljene iz predlog z naključnimi (a ponovljivimi) podatki,
// rezultat in postopek izračuna program, zato se ujemata z besedilom.
// Za njimi pridejo ročno napisane dodatne naloge iz tools/vaje/matematika-dodatne/<slug>.mjs
// (čisto osnovne in zelo težke sestavljene naloge); id-ji obstoječih nalog se zato ne spremenijo.
import { readdirSync } from "node:fs";
import { izMape } from "../mapa.mjs";
import { rng, stevilo, izbira } from "../lib.mjs";

export default async (z) => {
  await izMape("matematika", z);
  const mapa = new URL("../matematika-dodatne/", import.meta.url);
  for (const f of readdirSync(mapa).filter((f) => f.endsWith(".mjs")).sort()) {
    const slug = f.replace(".mjs", "");
    const { default: seznam } = await import(new URL(f, mapa));
    const r = rng(`matematika-${slug}-dodatne`);
    for (const { t, b, rez, post, raven = "osnovna", namig, v, tol, p, n } of seznam) {
      const skupno = { tezavnost: t, raven, besedilo: b, postopek: post, ...(namig ? { namig } : {}) };
      if (p !== undefined) z.dodaj(slug, izbira({ ...skupno, r, pravilna: p, napacne: n }));
      else z.dodaj(slug, stevilo({ ...skupno, vrednost: v, ...(tol !== undefined ? { toleranca: tol } : {}), rezultat: rez }));
    }
  }
};
