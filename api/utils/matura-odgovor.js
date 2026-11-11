// api/utils/matura-odgovor.js
// Preverjanje odgovorov pri maturitetnih nalogah. Pravilni odgovor se ne vpisuje posebej:
// prebere se iz "rezultat" naloge, ki je že v polah.
//
//   izbirna naloga (A–D v besedilu, rezultat je črka)  → { tip: "izbira", pravilne: ["B"] }
//   ostale naloge                                             → { tip: "deli", deli: [...] }
//
// Rezultat z več vprašanji (2.1., 2.2. …) se razdeli na dele. Del, ki je eno samo število
// (npr. "h ≈ 10 m", "\(x = 4\)", "7,9 · 10<sup>−5</sup> mol/L"), strežnik preveri sam
// (stevilo: { vrednost, toleranca, enota }). Pri ostalih delih (besedilo, več vrednosti,
// izraz) dijak dobi rešitev tega dela in jo primerja s svojim odgovorom.

const MINUS = /[−–]/g;

// ---------- pravilni odgovor iz rezultata ----------

// Pravilne črke izbirne naloge: ["B"] ali pri več pravilnih ["B", "D"]
function crkeIzbire(naloga) {
  if (!/class="pola-izbire"/.test(naloga.besedilo ?? "")) return null;
  const r = String(naloga.rezultat ?? "").trim();
  const m = r.match(/^<strong>\s*([A-F])\s*<\/strong>/);
  if (m) return [m[1]];
  const vec = r.match(/^([A-F])((?:\s*,\s*[A-F])*)(?:\s+in\s+([A-F]))?$/);
  if (vec) return [vec[1], ...(vec[2].match(/[A-F]/g) ?? []), ...(vec[3] ? [vec[3]] : [])];
  return null;
}

// Razdeli rezultat na dele z oznako (2.1., 3.4. …)
function razdeliRezultat(rezultat) {
  const r = String(rezultat ?? "").trim();
  // naravoslovje: "<strong>2.1.</strong> … <br><strong>2.2.</strong> …"
  if (/^<strong>\s*\d+\.\d+\.\s*<\/strong>/.test(r)) {
    return r
      .split(/<br\s*\/?>\s*(?=<strong>\s*\d+\.\d+\.\s*<\/strong>)/)
      .map((kos) => {
        const m = kos.match(/^<strong>\s*(\d+\.\d+\.)\s*<\/strong>\s*([\s\S]*)$/);
        return m ? { oznaka: m[1], rezultat: m[2].trim() } : { oznaka: "", rezultat: kos.trim() };
      });
  }
  // matematika: "3.1. \(m = 3\) &nbsp; 3.2. \(m < -1\)"
  if (/^\d+\.\d+\.\s/.test(r)) {
    const deli = [];
    const re = /(?:^|&nbsp;|\s)(\d+\.\d+\.)\s+/g;
    const zacetki = [];
    let m;
    while ((m = re.exec(r))) zacetki.push({ oznaka: m[1], od: m.index, vsebina: m.index + m[0].length });
    zacetki.forEach((z, i) => {
      const konec = i + 1 < zacetki.length ? zacetki[i + 1].od : r.length;
      deli.push({ oznaka: z.oznaka, rezultat: r.slice(z.vsebina, konec).replace(/(&nbsp;|\s)+$/, "").trim() });
    });
    if (deli.length) return deli;
  }
  return [{ oznaka: "", rezultat: r }];
}

// HTML in LaTeX v navaden niz: "7,9 · 10^-5 mol/L"
function vBesedilo(html) {
  return String(html)
    .replace(/<span class="ul"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g, "($1)/($2)")
    .replace(/<sup>([^<]*)<\/sup>/g, "^$1")
    .replace(/<sub>([^<]*)<\/sub>/g, "_$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\\[()[\]]/g, "")
    .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)")
    .replace(/\\cdot|\\times/g, "·")
    .replace(/\\approx/g, "≈")
    .replace(/\\,|\\;|\\!|\\ /g, " ")
    .replace(/\^\{([^{}]*)\}/g, "^$1")
    .replace(/_\{([^{}]*)\}/g, "_$1")
    .replace(/\\(?:mathrm|text)\{([^{}]*)\}/g, "$1")
    .replace(MINUS, "-")
    .replace(/\s+/g, " ")
    .trim();
}

const STEVILO = String.raw`-?\d+(?:[.,]\d+)?`;
const RE_VREDNOST = new RegExp(
  String.raw`^(\(?(${STEVILO})\)?\s*/\s*\(?(${STEVILO})\)?|(${STEVILO})(?:\s*[·x*]\s*10\^\(?(-?\d+)\)?)?)\s*(.*)$`
);
// enota: črke, °, %, Ω, /, ·, potence (m^-1, s^2) in »-krat«
const RE_ENOTA = /^(?:[A-Za-zčšžČŠŽµμΩ°%‰/·.\s-]|\^-?\d+)*$/;

const decimalke = (niz) => (niz.split(/[.,]/)[1] ?? "").length;

// Eno samo število (z enoto) ali null
export function steviloIzRezultata(html, { predmet } = {}) {
  const s = vBesedilo(html);
  if (!s || s.length > 120) return null;
  // več vrednosti ali pogojev: x = 3, y = 4 · 2 ali 3 · m < -1 · ±
  if (/[,;]\s|\s(ali|in|oz\.?|oziroma|do)\s|[±<>≤≥≠→]|\.\.\./.test(s)) return null;
  if (/<pre|<code/.test(html)) return null;
  const kosi = s.split(/=|≈/);
  const desno = kosi.pop().trim();
  const levo = kosi.join("=").trim();
  // pretvorba (−45 = 10101101) ni rezultat
  if (levo && /^[-\d.,\s]+$/.test(levo)) return null;
  // pri matematiki je levo lahko samo ime (x, a, s_50, D(84, 180)), sicer je to enačba
  if (predmet === "matematika" && kosi.length > 1) return null;
  if (predmet === "matematika" && levo && !/^[A-Za-z](?:_\w+)?(?:\([^()]*\))?$/.test(levo.replace(/\s/g, ""))) return null;
  const m = desno.match(RE_VREDNOST);
  if (!m) return null;
  let vrednost;
  let natancnost;
  if (m[2] !== undefined) {
    vrednost = Number(m[2].replace(",", ".")) / Number(m[3].replace(",", "."));
    natancnost = 0;
  } else {
    const mantisa = m[4].replace(",", ".");
    const eksponent = m[5] ? Number(m[5]) : 0;
    vrednost = Number(mantisa) * 10 ** eksponent;
    natancnost = 0.5 * 10 ** (eksponent - decimalke(m[4]));
  }
  const surova = m[6].trim().replace(/\.$/, "");
  // »1,2-dibromopropan« je ime spojine, ne število; »25-krat« in »0,9-%« sta število
  if (/^-/.test(surova) && !/^-(%|krat)/.test(surova)) return null;
  const enota = surova.replace(/^-/, "").trim();
  if (!Number.isFinite(vrednost)) return null;
  if (enota && (!RE_ENOTA.test(enota) || enota.length > 20 || /^\d/.test(enota) || /Rh/.test(enota))) return null;
  if (predmet === "matematika" && enota) return null;
  // Toleranca: zaokroževanje zadnje števke pravilnega odgovora ali 1 % (vmesno zaokroževanje).
  // Pri matematiki je točen rezultat celo število ali ulomek, zato sprejmemo 2 decimalki.
  // Pri informatiki in biologiji so to večinoma štetja (biti, osebki), zato samo zaokroževanje.
  let toleranca;
  if (predmet === "matematika") toleranca = Number.isInteger(vrednost) ? 1e-9 : 0.005 + 1e-9;
  else if (predmet === "informatika" && Number.isInteger(vrednost) && natancnost >= 0.5) toleranca = 1e-9;
  else if (predmet === "informatika" || predmet === "biologija") toleranca = natancnost + 1e-12;
  else toleranca = Math.max(natancnost, Math.abs(vrednost) * 0.01) + 1e-12;
  return { vrednost, toleranca, enota };
}

const predpomnilnik = new WeakMap();

export function odgovorNaloge(naloga, predmet) {
  if (predpomnilnik.has(naloga)) return predpomnilnik.get(naloga);
  let odgovor;
  const crke = crkeIzbire(naloga);
  if (crke) odgovor = { tip: "izbira", pravilne: crke };
  else if (naloga.tip === "esej") odgovor = { tip: "esej", deli: [{ oznaka: "", rezultat: naloga.rezultat }] };
  else {
    const deli = razdeliRezultat(naloga.rezultat).map((d) => {
      // del izbirne podnaloge (13.1. B)
      if (/class="pola-izbire"/.test(naloga.besedilo ?? "") && /^[A-F]$/.test(d.rezultat)) return { ...d, crka: d.rezultat };
      const stevilo = steviloIzRezultata(d.rezultat, { predmet });
      return stevilo ? { ...d, stevilo } : d;
    });
    odgovor = { tip: "deli", deli };
  }
  predpomnilnik.set(naloga, odgovor);
  return odgovor;
}

// Kaj o odgovoru sme vedeti brskalnik, preden dijak odda: tip, oznake delov in enote
export function oblikaOdgovora(naloga, predmet) {
  const o = odgovorNaloge(naloga, predmet);
  if (o.tip === "izbira") return { tip: "izbira", vec: o.pravilne.length > 1 };
  return {
    tip: o.tip,
    deli: o.deli.map((d) => ({
      oznaka: d.oznaka,
      ...(d.stevilo ? { stevilo: true, enota: d.stevilo.enota } : {}),
      ...(d.crka ? { crka: true } : {}),
    })),
  };
}

// ---------- dijakov vnos ----------

// "3,5", "-1/2", "7,9e-5", "7,9·10^-5", "7.9*10^(-5)", "2,5 m" → število ali NaN
export function parseVnos(niz) {
  let s = String(niz ?? "").trim().replace(MINUS, "-").replace(/\s+/g, "");
  s = s.replace(/^[A-Za-zα-ωΑ-Ω](?:_?\w+)?=(?=[-+\d.,])/, ""); // "x=4" → "4"
  const m = s.match(/^([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))(?:\/(\d+(?:[.,]\d+)?)|[·*x×]10\^\(?([+-]?\d+)\)?|[eE]([+-]?\d+))?(.*)$/);
  if (!m) return NaN;
  const [, st, imenovalec, eksp10, ekspE, ostanek] = m;
  // za številom sme biti samo enota (m, kJ, m/s^2, %), ne še ena številka
  if (ostanek && (!/^[A-Za-zčšžµμΩ°%‰][A-Za-zčšžµμΩ°%‰/·.\-^\d()]*$/.test(ostanek))) return NaN;
  const x = Number(st.replace(",", "."));
  if (imenovalec !== undefined) return x / Number(imenovalec.replace(",", "."));
  const e = eksp10 ?? ekspE;
  return e !== undefined ? x * 10 ** Number(e) : x;
}

// odgovori: izbira → "B" ali ["B", "D"]; deli → ["…", "…"] (po vrsti delov)
// Vrne { pravilno, deli: [{ pravilno: true|false|null, rezultat }] }; null = primerjaj sam
export function preveriMaturitetni(naloga, predmet, odgovori) {
  const o = odgovorNaloge(naloga, predmet);
  if (o.tip === "izbira") {
    // "B" ali ["B", "D"] (vrstni red ni pomemben)
    const izbrane = [...new Set([odgovori ?? []].flat().map((c) => String(c).trim().toUpperCase()))].sort();
    const pravilne = [...o.pravilne].sort();
    return { pravilno: izbrane.join() === pravilne.join(), pravilne };
  }
  const vneseni = Array.isArray(odgovori) ? odgovori : [odgovori];
  const deli = o.deli.map((d, i) => {
    const vnos = String(vneseni[i] ?? "");
    let pravilno = null;
    if (d.crka) pravilno = vnos.trim().toUpperCase() === d.crka;
    else if (d.stevilo) {
      const x = parseVnos(vnos);
      pravilno = Number.isFinite(x) && Math.abs(x - d.stevilo.vrednost) <= d.stevilo.toleranca;
    }
    return { oznaka: d.oznaka, pravilno, rezultat: d.rezultat };
  });
  const preverjeni = deli.filter((d) => d.pravilno !== null);
  const pravilno = preverjeni.length === deli.length ? preverjeni.every((d) => d.pravilno) : null;
  return { pravilno, deli };
}
