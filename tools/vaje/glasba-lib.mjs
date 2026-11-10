// Skupna predloga za zgodovino glasbe: dela [delo, skladatelj], skladatelji [ime, opis].
import { izbira } from "./lib.mjs";
export function skladateljiSerije(serija, { dela, osebe }) {
  const sk = [...new Set(dela.map(([, s]) => s))];
  serija("delo", Math.min(dela.length * 2, 30), (r, i) => {
    const [d, s] = dela[i % dela.length];
    if (i < dela.length) return izbira({ r, tezavnost: 2, besedilo: `Kdo je skladatelj dela <em>${d}</em>?`, pravilna: s, napacne: r.premesaj(sk.filter((x) => x !== s)).slice(0, 3), postopek: `<p><em>${d}</em>: ${s}.</p>` });
    const nap = r.premesaj(dela.filter(([, x]) => x !== s).map(([x]) => x)).slice(0, 3);
    return izbira({ r, tezavnost: 3, besedilo: `Katero od naštetih del je napisal ${s}?`, pravilna: d, napacne: nap, postopek: `<p>${s}: <em>${d}</em>.</p>` });
  });
  serija("oseba", osebe.length * 2, (r, i) => {
    const [o, op] = osebe[i % osebe.length];
    if (i < osebe.length) return izbira({ r, tezavnost: 2, besedilo: `Kateri skladatelj: ${op}?`, pravilna: o, napacne: r.premesaj(osebe.filter(([x]) => x !== o).map(([x]) => x)).slice(0, 3), postopek: `<p>${o}: ${op}.</p>` });
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kaj velja za skladatelja ${o}?`, pravilna: op, napacne: r.premesaj(osebe.filter(([x]) => x !== o).map(([, y]) => y)).slice(0, 3), postopek: `<p>${o}: ${op}.</p>` });
  });
}
