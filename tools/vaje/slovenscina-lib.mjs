// Skupne predloge za književnost: dela [naslov, avtor, vrsta], osebe [avtor, opis].
import { izbira, besedilo } from "./lib.mjs";

const veliko = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const priimek = (a) => a.split(" ").slice(-1)[0];

export function literarneSerije(serija, { dela, osebe = [], vrste }) {
  const avtorji = [...new Set([...dela.map(([, a]) => a), ...osebe.map(([a]) => a)])];
  if (avtorji.length >= 4) serija("avtor", Math.min(dela.length, 14), (r) => {
    const [d, a] = r.izberi(dela);
    return izbira({ r, tezavnost: 1, besedilo: `Kdo je avtor dela <em>${d}</em>?`, pravilna: a, napacne: r.premesaj(avtorji.filter((x) => x !== a)).slice(0, 3), postopek: `<p><em>${d}</em> je napisal(a) ${a}.</p>` });
  });
  serija("avtor-vpis", Math.min(dela.length, 10), (r) => {
    const [d, a] = r.izberi(dela);
    return besedilo({ tezavnost: 3, sprejemljivi: [a, priimek(a)], besedilo: `Vpiši avtorja dela <em>${d}</em> (zadošča priimek).`, rezultat: a, postopek: `<p><em>${d}</em>: ${a}.</p>` });
  });
  const vs = vrste ?? [...new Set(dela.map(([, , v]) => v))];
  if (vs.length >= 2) serija("vrsta", Math.min(dela.length, 12), (r) => {
    const [d, a, v] = r.izberi(dela);
    return izbira({ r, tezavnost: 2, besedilo: `Katera literarna vrsta je delo <em>${d}</em> (${a})?`, pravilna: v, napacne: r.premesaj(vs.filter((x) => x !== v)).slice(0, 3), postopek: `<p><em>${d}</em>: ${v}.</p>` });
  });
  if (avtorji.length >= 4) serija("delo", Math.min(dela.length, 10), (r) => {
    const [d, a] = r.izberi(dela), tuja = r.premesaj(dela.filter(([, x]) => x !== a)).slice(0, 3).map(([x]) => `<em>${x}</em>`);
    if (tuja.length < 3) return null;
    return izbira({ r, tezavnost: 2, besedilo: `Katero delo je napisal(a) ${a}?`, pravilna: `<em>${d}</em>`, napacne: tuja, postopek: `<p>${a}: <em>${d}</em>.</p>` });
  });
  if (osebe.length >= 4) serija("oseba", Math.min(osebe.length * 2, 12), (r, i) => {
    const [o, opis] = r.izberi(osebe);
    if (i % 2) return izbira({ r, tezavnost: 2, besedilo: `Kaj velja za avtorja ${o}?`, pravilna: veliko(opis), napacne: r.premesaj(osebe.filter(([x]) => x !== o)).slice(0, 3).map(([, y]) => veliko(y)), postopek: `<p>${o}: ${opis}.</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Kateri avtor ${opis}?`, pravilna: o, napacne: r.premesaj(osebe.filter(([x]) => x !== o)).slice(0, 3).map(([x]) => x), postopek: `<p>${o} ${opis}.</p>` });
  });
}
