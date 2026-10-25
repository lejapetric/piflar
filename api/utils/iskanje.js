// api/utils/iskanje.js
// Iskanje po besedilu strani snovi (public/views/**).
//
// Indeks se zgradi iz HTML datotek: za vsako stran hranimo iskalno besedilo
// (brez formul, SVG slik, skript in kazala), enako besedilo, kot ga vidi
// brskalnik v elementu .view. Tako se zaporedna številka zadetka znotraj
// razdelka (k) na strežniku ujema s tisto, ki jo izračuna components.js,
// ko na ciljni strani obarva iskano besedo.
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC_DIR = fileURLToPath(new URL("../../public", import.meta.url));
const VIEWS_DIR = join(PUBLIC_DIR, "views");
const OSVEZI_PO_MS = process.env.NODE_ENV === "production" ? Infinity : 5000;

const PRAZNI = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const PRESKOCI = new Set(["script", "style", "svg", "nav", "template", "noscript", "textarea"]);
const BLOKOVNI = new Set(["p", "li", "td", "th", "tr", "div", "section", "header", "h1", "h2", "h3", "h4", "h5", "h6", "br", "ul", "ol", "table", "figure", "figcaption", "span"]);
const NASLOVI = new Set(["h1", "h2", "h3", "h4"]);

// ------------------------------------------------------------
// Zlaganje črk: male črke, brez strešic. Ohrani dolžino niza, zato se
// indeksi v zloženem nizu ujemajo z indeksi v izvirnem.
// (Enaka funkcija je v public/components/components.js.)
// ------------------------------------------------------------
const STRESICE = { č: "c", ć: "c", š: "s", ž: "z", đ: "d" };
export function zlozi(niz) {
  let out = "";
  for (const c of niz) {
    const m = c.toLowerCase();
    const z = m.length === c.length ? m : c;
    out += STRESICE[z] ?? z;
  }
  return out;
}

// Iskalni izraz: zložen, presledki se ujemajo s katerim koli belim prostorom.
export function izraz(q) {
  const deli = zlozi(q.trim()).split(/\s+/).filter(Boolean).map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return deli.length ? new RegExp(deli.join("\\s+"), "g") : null;
}

// ------------------------------------------------------------
// HTML entitete in LaTeX v berljivo besedilo (za prikaz konteksta)
// ------------------------------------------------------------
const ENTITETE = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rarr: "→", larr: "←", hellip: "…", ndash: "–", mdash: "—", times: "×", middot: "·" };
function dekodiraj(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") return String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITETE[e.toLowerCase()] ?? m;
  });
}

const TEX_ZNAKI = {
  cdot: "·", times: "×", le: "≤", leq: "≤", ge: "≥", geq: "≥", ne: "≠", neq: "≠", pm: "±", mp: "∓", infty: "∞",
  pi: "π", alpha: "α", beta: "β", gamma: "γ", delta: "δ", Delta: "Δ", varepsilon: "ε", epsilon: "ε", varphi: "φ", phi: "φ",
  sigma: "σ", mu: "μ", lambda: "λ", omega: "ω", theta: "θ", rho: "ρ", tau: "τ",
  in: "∈", notin: "∉", subset: "⊂", subseteq: "⊆", cup: "∪", cap: "∩", emptyset: "∅", setminus: "∖",
  to: "→", rightarrow: "→", Rightarrow: "⇒", Leftrightarrow: "⇔", iff: "⇔", approx: "≈", circ: "∘", degree: "°",
  int: "∫", sum: "Σ", sqrt: "√", parallel: "∥", perp: "⊥", angle: "∠", triangle: "△", ldots: "…", cdots: "…", dots: "…",
  neg: "¬", land: "∧", wedge: "∧", lor: "∨", vee: "∨", forall: "∀", exists: "∃", mid: "|",
};
const TEX_BREZ = new Set(["left", "right", "displaystyle", "quad", "qquad", "limits", "big", "Big", "bigg", "Bigg"]);
const MNOZICE = { R: "ℝ", N: "ℕ", Z: "ℤ", Q: "ℚ", C: "ℂ" };
const NADPISI = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "+": "⁺", "-": "⁻", n: "ⁿ", "−": "⁻" };
const PODPISI = { 0: "₀", 1: "₁", 2: "₂", 3: "₃", 4: "₄", 5: "₅", 6: "₆", 7: "₇", 8: "₈", 9: "₉", "+": "₊", "-": "₋", n: "ₙ", k: "ₖ", i: "ᵢ", "−": "₋" };
// x^2 → x², a_1 → a₁; kar se ne da zapisati z znaki, ostane kot x^(n+1) ali a_n+1
const nadpis = (a) => ([...a].every((c) => NADPISI[c]) ? [...a].map((c) => NADPISI[c]).join("") : `^(${a})`);
const podpis = (a) => ([...a].every((c) => PODPISI[c]) ? [...a].map((c) => PODPISI[c]).join("") : `_${a}`);

export function texVBesedilo(tex) {
  let s = tex;
  for (let i = 0; i < 4; i++) {
    s = s
      .replace(/\\[dt]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (m, a, b) => `${a.length > 1 ? `(${a})` : a}/${b.length > 1 ? `(${b})` : b}`)
      .replace(/\\d?binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "C($1, $2)")
      .replace(/\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g, "$1√($2)")
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, (m, a) => (a.length > 1 ? `√(${a})` : `√${a}`))
      .replace(/\\mathbb\s*\{(\w)\}/g, (m, a) => MNOZICE[a] ?? a)
      .replace(/\\(?:text|mathrm|mathbf|operatorname|overline|vec|bar|hat)\s*\{([^{}]*)\}/g, "$1");
  }
  return s
    .replace(/\\([a-zA-Z]+)/g, (m, ime) => (TEX_ZNAKI[ime] ?? (TEX_BREZ.has(ime) ? "" : ime)))
    .replace(/\\[,;:!]/g, " ")
    .replace(/\\([{}%&$#_ ])/g, "$1")
    .replace(/\^\{([^{}]*)\}/g, (m, a) => nadpis(a.trim()))
    .replace(/\^([0-9a-zA-Z+−-])/g, (m, a) => nadpis(a))
    .replace(/_\{([^{}]*)\}/g, (m, a) => podpis(a.trim()))
    .replace(/_([0-9a-zA-Z])/g, (m, a) => podpis(a))
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ------------------------------------------------------------
// Razčlenitev ene strani
// ------------------------------------------------------------
// Vrne { S, D, sv (S → D), razponi: [{ id, od, do, globina, naslov }], naslovi: [[od, do]] }
// S: iskalno besedilo (kot textContent elementa .view brez formul in SVG),
// D: berljivo besedilo s formulami, pretvorjenimi v znake.
export function razcleni(html) {
  const zacetek = html.search(/<div[^>]*class="[^"]*\bview\b[^"]*"[^>]*>/);
  if (zacetek < 0) return null;
  const tok = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)/g;
  tok.lastIndex = zacetek;

  let S = "", D = "";
  const sv = [];
  const sklad = [];
  const razponi = [];
  const naslovi = [];
  let vFormuli = null; // zapiralni znak "\\)" ali "\\]", ko smo v formuli
  let formula = "";
  let preskoci = null; // { ime, globina }

  const dodajBesedilo = (t) => {
    for (let i = 0; i < t.length; i++) {
      const c = t[i], n = t[i + 1];
      if (vFormuli) {
        if (c === "\\" && n === vFormuli) { D += ` ${texVBesedilo(formula)} `; formula = ""; vFormuli = null; i++; }
        else formula += c;
        continue;
      }
      if (c === "\\" && (n === "(" || n === "[")) { vFormuli = n === "(" ? ")" : "]"; i++; continue; }
      sv.push(D.length);
      S += c;
      D += c;
    }
  };

  let m;
  while ((m = tok.exec(html))) {
    const [celota, zapri, imeRaw, atributi, samozaprt, besedilo] = m;
    if (celota.startsWith("<!--")) continue;
    if (preskoci) {
      if (imeRaw && imeRaw.toLowerCase() === preskoci.ime) {
        if (zapri) { if (--preskoci.globina === 0) preskoci = null; }
        else if (!samozaprt) preskoci.globina++;
      }
      continue;
    }
    if (besedilo !== undefined) { dodajBesedilo(dekodiraj(besedilo)); continue; }

    const ime = imeRaw.toLowerCase();
    if (BLOKOVNI.has(ime)) D += " ";
    if (zapri) {
      const i = sklad.map((e) => e.ime).lastIndexOf(ime);
      if (i < 0) continue;
      for (const e of sklad.splice(i)) {
        if (e.razpon) e.razpon.do = S.length;
        if (e.naslov) {
          naslovi.push([e.naslov.od, S.length]);
          const lastnik = [...sklad].reverse().find((x) => x.razpon && !x.razpon.naslov);
          if (lastnik) lastnik.razpon.naslov = D.slice(e.naslov.dOd).replace(/\s+/g, " ").trim();
        }
      }
      if (sklad.length === 0) break; // zaprt element .view
      continue;
    }
    if (PRESKOCI.has(ime)) {
      if (!samozaprt) preskoci = { ime, globina: 1 };
      continue;
    }
    if (PRAZNI.has(ime) || samozaprt) continue;
    const e = { ime };
    const id = /\bid\s*=\s*"([^"]+)"/.exec(atributi)?.[1];
    if (id && sklad.length > 0) {
      e.razpon = { id, od: S.length, do: S.length, globina: sklad.length, naslov: "" };
      razponi.push(e.razpon);
    }
    if (NASLOVI.has(ime)) e.naslov = { od: S.length, dOd: D.length };
    sklad.push(e);
  }
  sv.push(D.length);
  return { S, D, sv, razponi, naslovi };
}

function podatkiStrani(html) {
  const brezOznak = (s) => dekodiraj(s.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
  const nadnaslov = /class="page-eyebrow"[^>]*>([\s\S]*?)<\//.exec(html)?.[1];
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1];
  const naslov = h1 ? brezOznak(h1) : brezOznak(/<title>([^<|—]*)/.exec(html)?.[1] ?? "");
  const deli = nadnaslov ? brezOznak(nadnaslov).split("·").map((d) => d.trim()) : [];
  const predmet = deli[0] ?? "";
  const stevilka = /^\d+(\.\d+)*$/.test(deli.at(-1) ?? "") ? deli.at(-1) : "";
  return { predmet, stevilka, naslov, poglavje: stevilka ? `${stevilka} ${naslov}` : naslov };
}

// ------------------------------------------------------------
// Indeks vseh strani
// ------------------------------------------------------------
async function htmlDatoteke(mapa) {
  const vnosi = await readdir(mapa, { withFileTypes: true });
  const out = [];
  for (const v of vnosi) {
    const pot = join(mapa, v.name);
    if (v.isDirectory()) out.push(...(await htmlDatoteke(pot)));
    else if (v.name.endsWith(".html")) out.push(pot);
  }
  return out;
}

const primerjajStevilke = (a, b) => {
  const x = a.split(".").map(Number), y = b.split(".").map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] ?? -1) !== (y[i] ?? -1)) return (x[i] ?? -1) - (y[i] ?? -1);
  return 0;
};

const PREDMETI = ["Matematika", "Fizika", "Informatika", "Geografija", "Zgodovina", "Kemija"];
const vrstniRedPredmeta = (p) => (PREDMETI.includes(p) ? PREDMETI.indexOf(p) : PREDMETI.length);

let predpomnilnik = null;

export async function zgradiIndeks(mapa = VIEWS_DIR) {
  const strani = [];
  for (const pot of await htmlDatoteke(mapa)) {
    if ((await stat(pot)).size === 0) continue;
    const html = await readFile(pot, "utf8");
    const r = razcleni(html);
    if (!r || !r.S.trim()) continue;
    const url = "/" + relative(PUBLIC_DIR, pot).split(sep).join("/");
    strani.push({ url, ...podatkiStrani(html), ...r, Z: zlozi(r.S) });
  }
  strani.sort((a, b) => vrstniRedPredmeta(a.predmet) - vrstniRedPredmeta(b.predmet) || primerjajStevilke(a.stevilka || "999", b.stevilka || "999") || a.url.localeCompare(b.url));
  return strani;
}

export async function indeks() {
  if (!predpomnilnik || Date.now() - predpomnilnik.cas > OSVEZI_PO_MS) {
    predpomnilnik = { cas: Date.now(), strani: await zgradiIndeks() };
  }
  return predpomnilnik.strani;
}

// ------------------------------------------------------------
// Iskanje
// ------------------------------------------------------------
const KONTEKST = 70;

function kontekst(stran, od, do_) {
  const dOd = stran.sv[od], dDo = stran.sv[do_ - 1] + 1;
  let a = Math.max(0, dOd - KONTEKST), b = Math.min(stran.D.length, dDo + KONTEKST);
  if (a > 0) a = stran.D.indexOf(" ", a) + 1 || a;
  if (b < stran.D.length) { const p = stran.D.lastIndexOf(" ", b); if (p > dDo) b = p; }
  const cisti = (s) => s.replace(/\s+/g, " ");
  return {
    pred: (a > 0 ? "… " : "") + cisti(stran.D.slice(a, dOd)).trimStart(),
    zadetek: cisti(stran.D.slice(dOd, dDo)),
    po: cisti(stran.D.slice(dDo, b)).trimEnd() + (b < stran.D.length ? " …" : ""),
  };
}

// Indeks prvega zadetka, ki se začne pri poz ali kasneje (zadetki so urejeni).
function prviOd(najdeni, poz) {
  let lo = 0, hi = najdeni.length;
  while (lo < hi) { const mid = (lo + hi) >> 1; if (najdeni[mid][0] < poz) lo = mid + 1; else hi = mid; }
  return lo;
}

// Vrne vse zadetke, urejene po pomembnosti, nato po vrstnem redu poglavij.
export function isci(strani, q) {
  const re = izraz(q);
  if (!re) return [];
  const zadetki = [];
  strani.forEach((stran, iStrani) => {
    re.lastIndex = 0;
    const najdeni = [];
    let m;
    while ((m = re.exec(stran.Z))) {
      if (m[0].length === 0) { re.lastIndex++; continue; }
      najdeni.push([m.index, m.index + m[0].length]);
    }
    for (const [od, do_] of najdeni) {
      const vsebujejo = stran.razponi.filter((r) => r.od <= od && od < r.do);
      const notranji = vsebujejo.reduce((a, r) => (!a || r.globina > a.globina ? r : a), null);
      const meja = notranji ?? { od: 0, do: stran.S.length };
      const k = prviOd(najdeni, od) - prviOd(najdeni, meja.od);
      const vNaslovu = stran.naslovi.some(([a, b]) => a <= od && od < b);
      const zacetekBesede = od === 0 || !/[\p{L}\p{N}]/u.test(stran.Z[od - 1]);
      const konecBesede = do_ >= stran.Z.length || !/[\p{L}\p{N}]/u.test(stran.Z[do_]);
      zadetki.push({
        url: stran.url,
        sidro: notranji?.id ?? "",
        k,
        polozaj: od,
        predmet: stran.predmet,
        poglavje: stran.poglavje,
        razdelek: vsebujejo.sort((a, b) => a.globina - b.globina).map((r) => r.naslov).filter(Boolean).join(" › "),
        ...kontekst(stran, od, do_),
        _tocke: (zacetekBesede ? 3 : 0) + (konecBesede ? 2 : 0) + (vNaslovu ? 2 : 0),
        _red: iStrani * 1e7 + od,
      });
    }
  });
  zadetki.sort((a, b) => b._tocke - a._tocke || a._red - b._red);
  return zadetki.map(({ _tocke, _red, ...z }) => z);
}

// Povezava, ki odpre stran na izbranem zadetku (components.js ga obarva).
export function povezava(z, q) {
  const p = new URLSearchParams({ isci: q.trim(), k: String(z.k) });
  return `${z.url}?${p}${z.sidro ? `#${z.sidro}` : ""}`;
}
