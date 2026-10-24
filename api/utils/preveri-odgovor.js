// api/utils/preveri-odgovor.js
// Primerja dijakov odgovor (niz iz obrazca) s pravilnim odgovorom naloge.
//
// Tipi odgovorov v naloge.json:
//   { "tip": "stevilo", "vrednost": 7, "toleranca": 0.01 }   toleranca ni obvezna
//   { "tip": "mnozica", "elementi": ["4", "5"] }              vrstni red ni pomemben
//   { "tip": "besedilo", "sprejemljivi": ["x = 4", "4"] }      presledki in velike črke niso pomembni

// "3,5" -> 3.5, "-1/2" -> -0.5; NaN, če niz ni število
export function parseStevilo(niz) {
  const s = String(niz).trim().replace(/\s+/g, "").replace(",", ".");
  const ulomek = s.match(/^([+-]?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (ulomek) return Number(ulomek[1]) / Number(ulomek[2]);
  return s === "" ? NaN : Number(s);
}

const normaliziraj = (niz) => String(niz).toLowerCase().replace(/\s+/g, "");

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
    default:
      throw new Error(`Neznan tip odgovora: ${odgovor.tip}`);
  }
}
