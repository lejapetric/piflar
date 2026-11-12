import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Koliko bitov informacije dobimo, ko izvemo, katera od \(32\) enako verjetnih možnosti se je zgodila?`, v: 5, enota: "bit",
    rez: x`\(5\ \mathrm{bitov}\)`, post: x`<p>\(I = \log_2 32 = 5\ \mathrm{bitov}\)</p>` },
  { t: 4, b: x`Pri metu poštenega kovanca dvakrat zapored izvemo izid obeh metov. Koliko bitov informacije smo dobili, in koliko, če bi izvedeli le, da sta oba izida enaka?`, p: "2 bita; 1 bit", n: ["1 bit; 2 bita", "2 bita; 2 bita", "4 bite; 1 bit"],
    post: x`<p>Štirje enako verjetni izidi: \(\log_2 4 = 2\). »Oba enaka« ima verjetnost \(\frac12\): \(\log_2 2 = 1\ \mathrm{bit}\).</p>` },
];
