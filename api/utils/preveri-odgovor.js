// api/utils/preveri-odgovor.js
// Primerja dijakov odgovor (niz iz obrazca) s pravilnim odgovorom naloge.
//
// Tipi odgovorov v naloge.json:
//   { "tip": "stevilo", "vrednost": 7, "toleranca": 0.01 }   toleranca ni obvezna
//   { "tip": "mnozica", "elementi": ["4", "5"] }              vrstni red ni pomemben
//   { "tip": "besedilo", "sprejemljivi": ["x = 4", "4"] }      presledki, velike črke in pika na koncu niso pomembni
//   { "tip": "izbira", "pravilna": "B" }                       možnosti so v naloga.moznosti (A, B, C …)

// "3,5" -> 3.5, "-1/2" -> -0.5, "7,9·10^-5", "7,9e-5", "2,5 m", "x = 4"; NaN, če niz ni število
export function parseStevilo(niz) {
  let s = String(niz ?? "").trim().replace(/[−–]/g, "-").replace(/\s+/g, "");
  s = s.replace(/^[A-Za-zα-ωΑ-Ω](?:_?\w+)?=(?=[-+\d.,])/, "");
  const m = s.match(/^([+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+))(?:\/([+-]?\d+(?:[.,]\d+)?)|[·*x×]10\^\(?([+-]?\d+)\)?|[eE]([+-]?\d+))?(.*)$/);
  if (!m) return NaN;
  const [, st, imenovalec, eksp10, ekspE, ostanek] = m;
  // za številom sme biti samo enota (m, kJ, m/s^2, %), ne še ena številka
  if (ostanek && !/^[A-Za-zčšžµμΩ°%‰][A-Za-zčšžµμΩ°%‰/·.\-^\d()]*$/.test(ostanek)) return NaN;
  const x = Number(st.replace(",", "."));
  if (imenovalec !== undefined) return x / Number(imenovalec.replace(",", "."));
  const e = eksp10 ?? ekspE;
  return e !== undefined ? x * 10 ** Number(e) : x;
}

const normaliziraj = (niz) =>
  String(niz).toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, "").replace(/[.!]+$/, "");

// "{4, 5}" ali "4; 5" -> ["4", "5"]
function parseMnozica(niz) {
  const s = String(niz).trim().replace(/^\{|\}$/g, "");
  if (s.trim() === "") return [];
  return s.split(/[;,]/).map(normaliziraj).filter(Boolean);
}

export function preveriOdgovor(odgovor, vnos) {
  switch (odgovor.tip) {
    case "stevilo": {
      const x = parseStevilo(vnos);
      const toleranca = odgovor.toleranca ?? 1e-9;
      return Number.isFinite(x) && Math.abs(x - odgovor.vrednost) <= toleranca;
    }
    case "mnozica": {
      const vneseni = new Set(parseMnozica(vnos));
      const pravilni = new Set(odgovor.elementi.map(normaliziraj));
      return vneseni.size === pravilni.size && [...pravilni].every((e) => vneseni.has(e));
    }
    case "besedilo":
      return odgovor.sprejemljivi.map(normaliziraj).includes(normaliziraj(vnos));
    case "izbira":
      return String(vnos).trim().toUpperCase() === odgovor.pravilna;
    default:
      throw new Error(`Neznan tip odgovora: ${odgovor.tip}`);
  }
}
