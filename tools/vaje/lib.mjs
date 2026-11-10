// tools/vaje/lib.mjs
// Pomočniki za pisanje nalog za vajo. Vsak predmet je v predmeti/<predmet>.mjs in
// izvozi funkcijo (z) => { … }, ki z z.dodaj(poglavje, naloga) doda naloge.
// gradi.mjs jih zapiše v api/data/vaje/<predmet>.json.
//
// Naloga: { besedilo, odgovor, rezultat, postopek, tezavnost: 1–4, raven: "osnovna" | "visja",
//           moznosti? (izbirna), namig?, povezave? }

// ---------- naključnost (ponovljiva: isto seme → iste naloge) ----------
export function rng(seme) {
  let h = 1779033703 ^ seme.length;
  for (let i = 0; i < seme.length; i++) h = Math.imul(h ^ seme.charCodeAt(i), 3432918353), (h = (h << 13) | (h >>> 19));
  let a = h >>> 0;
  const r = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  r.int = (od, do_) => od + Math.floor(r() * (do_ - od + 1));
  r.izberi = (seznam) => seznam[Math.floor(r() * seznam.length)];
  r.premesaj = (seznam) => {
    const s = [...seznam];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };
  r.nenic = (od, do_) => {
    let x = 0;
    while (x === 0) x = r.int(od, do_);
    return x;
  };
  return r;
}

// ---------- števila ----------
export const zaokrozi = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
// besedilo: 3,5 · −2 (minus kot −)
export function T(x, d = 3) {
  const z = zaokrozi(x, d);
  const s = String(Math.abs(z)).replace(".", ",");
  return (z < 0 ? "−" : "") + s;
}
// LaTeX: 3{,}5
export const L = (x, d = 3) => T(x, d).replace("−", "-").replace(",", "{,}");
// ulomek v LaTeX-u (okrajšan)
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export function ulomek(s, i) {
  if (i < 0) (s = -s), (i = -i);
  const g = gcd(s, i) || 1;
  s /= g;
  i /= g;
  if (i === 1) return `${s}`;
  return `${s < 0 ? "-" : ""}\\frac{${Math.abs(s)}}{${i}}`;
}
// predznak za člen: +3, -3 (LaTeX)
export const clen = (k, x = "", prvi = false) => {
  if (k === 0) return "";
  const a = Math.abs(k);
  const kk = x && a === 1 ? "" : `${a}`;
  if (prvi) return `${k < 0 ? "-" : ""}${kk}${x}`;
  return ` ${k < 0 ? "-" : "+"} ${kk}${x}`;
};
// polinom ax^2 + bx + c v LaTeX
export function polinom(koef, x = "x") {
  const n = koef.length - 1;
  let s = "";
  koef.forEach((k, i) => {
    const st = n - i;
    const pot = st === 0 ? "" : st === 1 ? x : `${x}^{${st}}`;
    if (k === 0) return;
    if (st === 0) s += s ? ` ${k < 0 ? "-" : "+"} ${Math.abs(k)}` : `${k}`;
    else s += clen(k, pot, s === "");
  });
  return s || "0";
}

// ---------- vrste nalog ----------
const CRKE = "ABCDEFGH";

export function stevilo({ vrednost, toleranca, enota, ...n }) {
  const tol = toleranca ?? (Number.isInteger(vrednost) ? 1e-9 : Math.max(Math.abs(vrednost) * 0.01, 0.005));
  return { ...n, odgovor: { tip: "stevilo", vrednost, toleranca: tol, ...(enota ? { enota } : {}) } };
}

export function besedilo({ sprejemljivi, ...n }) {
  return { ...n, odgovor: { tip: "besedilo", sprejemljivi } };
}

export function mnozica({ elementi, ...n }) {
  return { ...n, odgovor: { tip: "mnozica", elementi: elementi.map(String) } };
}

// Izbirna naloga: pravilna + napačne, vrstni red premeša r (ponovljivo)
export function izbira({ pravilna, napacne, r, rezultat, ...n }) {
  // Da/Ne in pravilna/nepravilna ostaneta v stalnem vrstnem redu, ostalo se premeša
  const dve = napacne.length === 1 && /^(Da|Ne|pravilna|nepravilna)\b/.test(pravilna);
  const moznosti = dve ? [pravilna, ...napacne].sort((a, b) => /^(Da|pravilna)/.test(b) - /^(Da|pravilna)/.test(a)) : r.premesaj([pravilna, ...napacne]);
  if (new Set(moznosti).size !== moznosti.length) throw new Error(`Podvojena možnost: ${n.besedilo}`);
  const crka = CRKE[moznosti.indexOf(pravilna)];
  return {
    ...n,
    moznosti,
    odgovor: { tip: "izbira", pravilna: crka },
    rezultat: rezultat ?? `<strong>${crka}</strong> &nbsp; ${pravilna}`,
  };
}

// Strnjen zapis vprašanj za teoretične predmete:
// [težavnost, vprašanje, pravilni odgovor, [napačni …], razlaga, "visja"?]
// Če je tretji element { vpis: ["odgovor", "drug zapis"] }, je naloga z vpisom besedila.
export function vprasanja(z, poglavje, seznam, { seme = poglavje } = {}) {
  const r = rng(`${z.predmet}-${seme}`);
  for (const [tezavnost, vpr, pravilna, napacne, razlaga, raven] of seznam) {
    const skupno = {
      tezavnost,
      raven: raven === "visja" ? "visja" : "osnovna",
      besedilo: vpr,
      postopek: razlaga.startsWith("<") ? razlaga : `<p>${razlaga}</p>`,
    };
    if (pravilna && typeof pravilna === "object" && pravilna.vpis) {
      z.dodaj(poglavje, besedilo({ ...skupno, sprejemljivi: pravilna.vpis, rezultat: pravilna.vpis[0], namig: pravilna.namig }));
    } else {
      z.dodaj(poglavje, izbira({ ...skupno, pravilna, napacne, r }));
    }
  }
}

// Zbirka nalog enega predmeta
export function zbirka(predmet) {
  const naloge = [];
  const stevci = {};
  return {
    predmet,
    naloge,
    dodaj(poglavje, naloga) {
      for (const k of ["besedilo", "odgovor", "rezultat", "postopek", "tezavnost"])
        if (naloga[k] === undefined || naloga[k] === "") throw new Error(`${predmet}/${poglavje}: manjka ${k} (${naloga.besedilo})`);
      stevci[poglavje] = (stevci[poglavje] ?? 0) + 1;
      naloge.push({
        id: `${predmet}-${poglavje}-v${stevci[poglavje]}`,
        predmet,
        poglavje,
        tezavnost: naloga.tezavnost,
        raven: naloga.raven ?? "osnovna",
        ...naloga,
      });
    },
  };
}
