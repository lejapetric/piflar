// Skupne predloge za tuje jezike.
import { izbira, besedilo } from "./lib.mjs";

// Vrzeli: [poved z ___, pravilno (niz ali [niz, ...sprejemljive]), [napačne], razlaga, težavnost=2, "visja"?]
// Vsaka postavka da izbirno nalogo in nalogo z vpisom (težavnost +1).
export function vrzeli(serija, ime, postavke) {
  const n = postavke.length;
  const del = (p) => { const [pov, prav, nap, raz, tez = 2, rav] = p; const sp = [].concat(prav); return { pov, sp, nap, raz, tez, visja: rav === "visja" }; };
  serija(ime, n, (r, i) => {
    const { pov, sp, nap, raz, tez, visja } = del(postavke[i]);
    return izbira({ r, tezavnost: visja ? 4 : tez, ...(visja ? { raven: "visja" } : {}), besedilo: `Izberi pravilno možnost: <em>${pov}</em>`, pravilna: sp[0], napacne: nap, postopek: `<p><em>${pov.replace("___", `<strong>${sp[0]}</strong>`)}</em></p><p>${raz}</p>` });
  });
  serija(`${ime}-vpis`, n, (r, i) => {
    const { pov, sp, nap, raz, tez, visja } = del(postavke[i]);
    const t = Math.min(4, tez + 1), nic = sp.includes("–") || nap.includes("–");
    return besedilo({ tezavnost: visja ? 4 : t, ...(visja || t === 4 ? { raven: "visja" } : {}), sprejemljivi: sp.includes("–") ? [...sp, "-", "0", "/", "x"] : sp, besedilo: `Vpiši manjkajoči del: <em>${pov}</em>${nic ? " (če ne manjka nič, vpiši 0)" : ""}`, rezultat: sp[0], postopek: `<p><em>${pov.replace("___", `<strong>${sp[0]}</strong>`)}</em></p><p>${raz}</p>` });
  });
}

// Spregatev: glagoli [[nedoločnik, [6 oblik]]], osebe [6 zaimkov]; opis časa v slovenščini.
export function spregatev(serija, ime, { glagoli, osebe, cas, tez = 2, n = 24, visja = false, jezik = "" }) {
  serija(ime, n, (r, i) => {
    const [inf, obl] = r.izberi(glagoli), k = r.int(0, 5), prav = obl[k];
    if (!prav) return null;
    const vpis = i % 2 === 1;
    const opis = `Glagol <em>${inf}</em>${jezik ? ` (${jezik})` : ""} v času ${cas}, oseba <em>${osebe[k]}</em>`;
    const post = `<p>${osebe.map((o, j) => `${o} ${obl[j]}`).join(", ")}</p>`;
    const rav = visja ? { raven: "visja" } : {};
    if (vpis) return besedilo({ tezavnost: visja ? 4 : Math.min(4, tez + 1), ...(visja || tez >= 3 ? { raven: "visja" } : rav), sprejemljivi: [prav], besedilo: `Vpiši pravilno obliko. ${opis}:`, rezultat: `${osebe[k]} ${prav}`, postopek: post });
    const nap = [...new Set(obl.filter((x) => x !== prav))].slice(0, 3);
    if (nap.length < 2) return null;
    return izbira({ r, tezavnost: visja ? 4 : tez, ...rav, besedilo: `Izberi pravilno obliko. ${opis}:`, pravilna: prav, napacne: r.premesaj(nap).slice(0, 3), postopek: post });
  });
}

// Pomen: [izraz, pomen] → izbira (tuji izraz → slovenski pomen) in obratno.
export function pomeni(serija, ime, pari, { tez = 1, n } = {}) {
  const N = n ?? Math.min(pari.length * 2, 24);
  serija(ime, N, (r, i) => {
    const [t, s] = r.izberi(pari), obrni = i % 2 === 1;
    const druge = r.premesaj(pari.filter(([x]) => x !== t)).slice(0, 3);
    if (obrni) return izbira({ r, tezavnost: tez + 1, besedilo: `Kako se reče »${s}«?`, pravilna: t, napacne: druge.map(([x]) => x), postopek: `<p>${s} = <em>${t}</em></p>` });
    return izbira({ r, tezavnost: tez, besedilo: `Kaj pomeni <em>${t}</em>?`, pravilna: s, napacne: druge.map(([, y]) => y), postopek: `<p><em>${t}</em> = ${s}</p>` });
  });
}

// Bralni odlomki: [{besedilo, vprasanja: [[vprašanje, pravilno, [napačne], tez?, "visja"?]]}]
export function odlomki(serija, ime, seznam) {
  const vse = seznam.flatMap((o, k) => o.vprasanja.map((v) => [k, ...v]));
  serija(ime, vse.length, (r, i) => {
    const [k, v, prav, nap, tez = 2, rav] = vse[i];
    return izbira({ r, tezavnost: rav === "visja" ? 4 : tez, ...(rav === "visja" ? { raven: "visja" } : {}), besedilo: `<blockquote>${seznam[k].besedilo}</blockquote>${v}`, pravilna: prav, napacne: nap, postopek: `<p>Pravilno: ${prav}</p>` });
  });
}
