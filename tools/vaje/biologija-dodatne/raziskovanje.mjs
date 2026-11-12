import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Celica na mikroskopski sliki meri \(30\ \mathrm{mm}\), povečava je \(600\)-kratna. Kolikšna je dejanska velikost celice (v µm)?`, v: 50, enota: "µm",
    rez: x`\(50\ \mathrm{\mu m}\)`, post: x`<p>\(\frac{30\ \mathrm{mm}}{600} = 0{,}05\ \mathrm{mm} = 50\ \mathrm{\mu m}\)</p>` },
  { t: 4, b: x`Pri kromatografiji pigmentov je topilo prepotovalo \(8{,}0\ \mathrm{cm}\), pigment pa \(5{,}2\ \mathrm{cm}\). Kolikšna je vrednost \(R_f\)?`, v: 0.65, tol: 0.005,
    rez: x`\(R_f = 0{,}65\)`, post: x`<p>\(R_f = \frac{5{,}2}{8{,}0} = 0{,}65\)</p>` },
  { t: 4, b: x`Dijaki merijo vpliv svetlobe na fotosintezo vodne kuge (štetje mehurčkov). Katera spremenljivka mora biti nadzorovana?`, p: "temperatura vode in koncentracija CO₂", n: ["jakost svetlobe", "število mehurčkov", "čas meritve kot odvisna spremenljivka"],
    post: x`<p>Neodvisna je jakost svetlobe, odvisno je število mehurčkov. Temperatura in \(\mathrm{CO_2}\) prav tako vplivata na fotosintezo, zato ju moramo ohranjati enaki.</p>` },
];
