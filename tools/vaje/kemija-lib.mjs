// Podatki in pomočniki za naloge iz kemije.
export const NA = 6.02e23, Vm = 22.4;

// [simbol, ime, Z, Ar, elektronegativnost]
export const ELEMENTI = [
  ["H", "vodik", 1, 1.008, 2.2], ["He", "helij", 2, 4.003, null], ["Li", "litij", 3, 6.94, 1.0], ["Be", "berilij", 4, 9.012, 1.6],
  ["B", "bor", 5, 10.81, 2.0], ["C", "ogljik", 6, 12.01, 2.6], ["N", "dušik", 7, 14.01, 3.0], ["O", "kisik", 8, 16.0, 3.4],
  ["F", "fluor", 9, 19.0, 4.0], ["Ne", "neon", 10, 20.18, null], ["Na", "natrij", 11, 22.99, 0.9], ["Mg", "magnezij", 12, 24.31, 1.3],
  ["Al", "aluminij", 13, 26.98, 1.6], ["Si", "silicij", 14, 28.09, 1.9], ["P", "fosfor", 15, 30.97, 2.2], ["S", "žveplo", 16, 32.06, 2.6],
  ["Cl", "klor", 17, 35.45, 3.2], ["Ar", "argon", 18, 39.95, null], ["K", "kalij", 19, 39.1, 0.8], ["Ca", "kalcij", 20, 40.08, 1.0],
  ["Fe", "železo", 26, 55.85, 1.8], ["Cu", "baker", 29, 63.55, 1.9], ["Zn", "cink", 30, 65.38, 1.7], ["Br", "brom", 35, 79.9, 3.0],
  ["Ag", "srebro", 47, 107.87, 1.9], ["I", "jod", 53, 126.9, 2.7], ["Ba", "barij", 56, 137.33, 0.9], ["Pb", "svinec", 82, 207.2, 2.3],
  ["Mn", "mangan", 25, 54.94, 1.6], ["Cr", "krom", 24, 52.0, 1.7], ["Au", "zlato", 79, 196.97, 2.5], ["Sn", "kositer", 50, 118.71, 2.0],
];
export const E = Object.fromEntries(ELEMENTI.map(([s, ime, Z, Ar, en]) => [s, { s, ime, Z, Ar, en }]));

// Razčleni formulo (tudi z oklepaji in kristalno vodo ·5H2O) v { simbol: število }
export function sestava(f) {
  const [glavni, ...hidrat] = f.split(/[·.]/);
  const skupaj = {};
  const dodaj = (o, k = 1) => { for (const [s, n] of Object.entries(o)) skupaj[s] = (skupaj[s] ?? 0) + n * k; };
  const parse = (s) => {
    const sklad = [{}];
    for (const t of s.matchAll(/([A-Z][a-z]?)(\d*)|(\()|\)(\d*)/g)) {
      if (t[1]) { const v = sklad.at(-1); v[t[1]] = (v[t[1]] ?? 0) + (t[2] ? +t[2] : 1); }
      else if (t[3]) sklad.push({});
      else { const v = sklad.pop(), k = t[4] ? +t[4] : 1, z = sklad.at(-1); for (const [e, n] of Object.entries(v)) z[e] = (z[e] ?? 0) + n * k; }
    }
    return sklad[0];
  };
  dodaj(parse(glavni));
  for (const h of hidrat) { const m = h.match(/^(\d*)(.*)$/); dodaj(parse(m[2]), m[1] ? +m[1] : 1); }
  return skupaj;
}
export const molska = (f) => Object.entries(sestava(f)).reduce((s, [e, n]) => s + E[e].Ar * n, 0);
// H2SO4 → H<sub>2</sub>SO<sub>4</sub>; naboj: SO4^2- → SO<sub>4</sub><sup>2−</sup>
export const F = (f) => f.replace(/\^(\d*[+-])/, (_, q) => `<sup>${q.replace("-", "−")}</sup>`).replace(/([A-Za-z)])(\d+)/g, "$1<sub>$2</sub>").replace("·", "·");

// Spojine: [formula, ime]
export const SPOJINE = [
  ["H2O", "voda"], ["CO2", "ogljikov dioksid"], ["NaCl", "natrijev klorid"], ["H2SO4", "žveplova(VI) kislina"], ["HCl", "klorovodikova kislina"],
  ["NaOH", "natrijev hidroksid"], ["CaCO3", "kalcijev karbonat"], ["NH3", "amoniak"], ["CH4", "metan"], ["C6H12O6", "glukoza"],
  ["HNO3", "dušikova(V) kislina"], ["KMnO4", "kalijev manganat(VII)"], ["Ca(OH)2", "kalcijev hidroksid"], ["Al2O3", "aluminijev oksid"],
  ["Fe2O3", "železov(III) oksid"], ["MgCl2", "magnezijev klorid"], ["Na2CO3", "natrijev karbonat"], ["CuSO4·5H2O", "bakrov(II) sulfat pentahidrat"],
  ["C2H5OH", "etanol"], ["H3PO4", "fosforjeva(V) kislina"], ["KCl", "kalijev klorid"], ["Ca3(PO4)2", "kalcijev fosfat"], ["NaHCO3", "natrijev hidrogenkarbonat"],
  ["SO2", "žveplov dioksid"], ["Mg(OH)2", "magnezijev hidroksid"], ["AgNO3", "srebrov nitrat"], ["BaSO4", "barijev sulfat"], ["C12H22O11", "saharoza"],
];

// Organska kemija: korenska imena po številu C-atomov
export const KOREN = ["met", "et", "prop", "but", "pent", "heks", "hept", "okt", "non", "dek"];
// strnjene formule
export const alkan = (n) => `C${n > 1 ? n : ""}H${2 * n + 2}`;
export const alken = (n) => `C${n}H${2 * n}`;
export const alkin = (n) => `C${n}H${2 * n - 2}`;
export const alkohol = (n) => `C${n > 1 ? n : ""}H${2 * n + 1}OH`;
export const kislina = (n) => (n === 1 ? "HCOOH" : `C${n - 1 > 1 ? n - 1 : ""}H${2 * n - 1}COOH`);
