// tools/ustni/matematika/lib.mjs — pomožne funkcije za zapis listkov ustnega izpita.
//
// listek(st, naslov, snov, [vprašanja])   en izpitni listek (številka in naslov kot v uradnem seznamu RIC)
// q(tocke, vprasanje, odgovor, razlaga?)    vprašanje; razlaga je podrobnejša razlaga (gumb »Razlaga«),
//                                           napišemo jo samo pri zahtevnejših vprašanjih
// ref(st, i)                                (samo višja raven) enako vprašanje kot i-to vprašanje
//                                           listka st osnovne ravni: prevzame besedilo, točke in odgovor
export const R = String.raw;
export const listek = (st, naslov, snov, vprasanja) => ({ st, naslov, snov, vprasanja });
export const q = (tocke, vprasanje, odgovor, razlaga) => ({ tocke, vprasanje, odgovor, razlaga });
export const ref = (st, i, tocke) => ({ ref: [st, i], ...(tocke ? { tocke } : {}) }); // tocke: če se na višji ravni razlikujejo

// Graf funkcij kot inline SVG (izriše se ob gradnji, barve in temni način iz snov.css):
// graf({ x: [-3, 3], y: [-2, 4], f: [[(x) => x ** 2, "s-k1"], …], asim: [{ x: 0 }, { y: 1 }],
//        tocke: [[0, 0, "O"]], xOznake: [[Math.PI, "π"]], napis: "…" })
export function graf({ x: [x0, x1], y: [y0, y1], f = [], asim = [], tocke = [], xOznake, yOznake, napis, enota = 34 }) {
  const W = (x1 - x0) * enota, H = (y1 - y0) * enota, m = 14;
  const X = (x) => +(m + (x - x0) * enota).toFixed(1), Y = (y) => +(m + (y1 - y) * enota).toFixed(1);
  const mreza = [];
  for (let i = Math.ceil(x0); i <= x1; i++) mreza.push(`M${X(i)},${Y(y0)}V${Y(y1)}`);
  for (let j = Math.ceil(y0); j <= y1; j++) mreza.push(`M${X(x0)},${Y(j)}H${X(x1)}`);
  const deli = [];
  const id = `p${Math.round(Math.abs(x0 * 7 + x1 * 13 + y0 * 17 + y1 * 19 + f.length * 23))}`;
  deli.push(`<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" class="s-os-txt"/></marker></defs>`);
  deli.push(`<path class="s-mreza" d="${mreza.join("")}"/>`);
  if (y0 <= 0 && y1 >= 0) deli.push(`<line class="s-os" x1="${X(x0)}" y1="${Y(0)}" x2="${X(x1) + 8}" y2="${Y(0)}" marker-end="url(#${id})"/>`);
  if (x0 <= 0 && x1 >= 0) deli.push(`<line class="s-os" x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(y1) - 8}" marker-end="url(#${id})"/>`);
  if (y0 <= 0 && y1 >= 0) deli.push(`<text class="s-os-txt" x="${X(x1) + 2}" y="${Y(0) - 6}">x</text>`);
  if (x0 <= 0 && x1 >= 0) deli.push(`<text class="s-os-txt" x="${X(0) + 6}" y="${Y(y1) - 2}">y</text>`);
  const xo = xOznake ?? [1].filter((v) => v <= x1).map((v) => [v, String(v)]);
  const yo = yOznake ?? [1].filter((v) => v <= y1).map((v) => [v, String(v)]);
  if (y0 <= 0 && y1 >= 0) for (const [v, t] of xo) deli.push(`<line class="s-os" x1="${X(v)}" y1="${Y(0) - 3}" x2="${X(v)}" y2="${Y(0) + 3}"/><text class="s-os-txt" x="${X(v) - 4}" y="${Y(0) + 15}">${t}</text>`);
  if (x0 <= 0 && x1 >= 0) for (const [v, t] of yo) deli.push(`<line class="s-os" x1="${X(0) - 3}" y1="${Y(v)}" x2="${X(0) + 3}" y2="${Y(v)}"/><text class="s-os-txt" x="${X(0) - 14}" y="${Y(v) + 4}">${t}</text>`);
  for (const a of asim) {
    if ("x" in a) deli.push(`<line class="s-asim" x1="${X(a.x)}" y1="${Y(y0)}" x2="${X(a.x)}" y2="${Y(y1)}"/>`);
    else deli.push(`<line class="s-asim" x1="${X(x0)}" y1="${Y(a.y)}" x2="${X(x1)}" y2="${Y(a.y)}"/>`);
  }
  for (const [fn, cls = "s-k1", od = x0, doo = x1] of f) {
    const n = 400, poti = [];
    let pot = [];
    for (let i = 0; i <= n; i++) {
      const x = od + ((doo - od) * i) / n, y = fn(x);
      if (!Number.isFinite(y) || y < y0 - 2 || y > y1 + 2) {
        if (pot.length > 1) poti.push(pot);
        pot = [];
        continue;
      }
      pot.push(`${X(x)},${Y(Math.max(y0 - 0.5, Math.min(y1 + 0.5, y)))}`);
    }
    if (pot.length > 1) poti.push(pot);
    deli.push(`<path class="${cls}" d="${poti.map((p) => "M" + p.join("L")).join("")}"/>`);
  }
  for (const [x, y, t] of tocke) deli.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="3.2" class="s-tocka"/>${t ? `<text x="${X(x) + 6}" y="${Y(y) - 6}">${t}</text>` : ""}`);
  const svg = `<svg viewBox="0 0 ${W + 2 * m + 10} ${H + 2 * m}" role="img" aria-label="${napis ?? "graf"}" style="max-width:${Math.min(420, W + 2 * m + 10)}px">${deli.join("")}<clipPath id="${id}c"><rect x="${m}" y="${m}" width="${W}" height="${H}"/></clipPath></svg>`;
  return `<figure class="slika ustni-slika">${svg}${napis ? `<figcaption>${napis}</figcaption>` : ""}</figure>`;
}

// Višja raven: naslov in snov se prevzameta iz istoštevilčnega listka osnovne ravni (razen če je naslov podan).
export const vr = (st, vprasanja, naslov) => ({ st, vprasanja, ...(naslov ? { naslov } : {}) });
