import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Ulovimo in označimo \(40\) polžev, jih izpustimo, čez teden ulovimo \(50\), od katerih jih je \(8\) označenih. Kolikšna je ocenjena velikost populacije?`, v: 250,
    rez: x`\(250\)`, post: x`<p>Metoda ulova in ponovnega ulova: \(N = \frac{40 \cdot 50}{8} = 250\)</p>` },
  { t: 4, b: x`Populacija ima \(1000\) osebkov in letno stopnjo rasti \(r = 0{,}2\) (eksponentna rast). Koliko osebkov bo imela čez \(5\) let (diskretno, \(N_t = N_0(1 + r)^t\))?`, v: 1000 * 1.2 ** 5,
    rez: x`\(\approx ${T(1000 * 1.2 ** 5, 0)}\)`, post: x`<p>\(N_5 = 1000 \cdot 1{,}2^5 \approx 2488\)</p>`, tol: 1 },
  { t: 4, b: x`Kaj velja za populacijo pri nosilni kapaciteti okolja K?`, p: "rodnost in smrtnost sta približno enaki, rast je ničelna", n: ["rast je največja", "rodnost je bistveno večja od smrtnosti", "populacija izumre"],
    post: x`<p>Pri logistični rasti je hitrost rasti največja pri \(\frac{K}{2}\), pri \(K\) pa se rast ustavi, ker okoljski upor uravnoteži rodnost.</p>` },
];
