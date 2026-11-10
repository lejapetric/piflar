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

// Vprašanja o shemi maturitetnega izpita iz tujega jezika (podatki s strani »Izpit«).
export function izpitShema(serija, { t3A, t3B }) {
  const V = [
    ["Koliko časa traja pola 1A (bralno razumevanje)?", "35 minut", ["25 minut", "20 minut", "60 minut"]],
    ["Koliko časa traja pola 1B (poznavanje in raba jezika)?", "25 minut", ["35 minut", "30 minut", "60 minut"]],
    ["Koliko časa traja pola 2 (slušno razumevanje)?", "do 20 minut", ["35 minut", "60 minut", "10 minut"]],
    ["Koliko časa traja krajši pisni sestavek (3A)?", "30 minut", ["60 minut", "20 minut", "45 minut"]],
    ["Koliko časa traja daljši pisni sestavek (3B)?", "60 minut", ["30 minut", "90 minut", "45 minut"]],
    ["Koliko časa traja ustni izpit?", "do 20 minut", ["60 minut", "5 minut", "45 minut"]],
    ["Koliko minut prekinitve je po poli 1?", "10 minut", ["30 minut", "5 minut", "ni prekinitve"]],
    ["Koliko minut odmora je po poli 2?", "30 minut", ["10 minut", "60 minut", "ni odmora"]],
    ["Kakšen delež ocene prinese ustni izpit?", "20 %", ["10 %", "35 %", "50 %"]],
    ["Kakšen delež ocene prinese krajši pisni sestavek (3A)?", "10 %", ["20 %", "15 %", "30 %"]],
    ["Koliko točk največ prinese krajši pisni sestavek (3A)?", String(t3A), [12, 25, 30, 18, 15, 20].filter((x) => x !== t3A).slice(0, 3).map(String)],
    ["Koliko točk največ prinese daljši pisni sestavek (3B)?", t3B, ["10", "40", "30"]],
    ["Kaj piše kandidat višje ravni v poli 3B?", "sestavek na temo iz književnosti", ["pismo prijatelju", "poročilo", "povzetek"]],
  ];
  serija("shema", V.length, (r, i) => {
    const [v, odg, nap] = V[i];
    return izbira({ r, tezavnost: 1, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg}.</p>` });
  });
}
