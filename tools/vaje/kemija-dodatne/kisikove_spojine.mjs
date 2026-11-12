import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Koliko gramov estra nastane iz \(30\ \mathrm g\) ocetne kisline in \(46\ \mathrm g\) etanola, če je izkoristek \(60\,\%\)? (\(M\): CH\(_3\)COOH 60, C\(_2\)H\(_5\)OH 46, CH\(_3\)COOC\(_2\)H\(_5\) 88 g/mol)`, v: 0.5 * 0.6 * 88, enota: "g",
    rez: x`\(26{,}4\ \mathrm g\)`, post: x`<p>\(n(\text{kislina}) = 0{,}5\ \mathrm{mol}\), \(n(\text{etanol}) = 1\ \mathrm{mol}\): omejuje kislina.</p><p>\(m = 0{,}5 \cdot 0{,}6 \cdot 88 = 26{,}4\ \mathrm g\) etil etanoata</p>` },
  { t: 4, b: x`Katera spojina se pri oksidaciji s Tollensovim reagentom pokaže s srebrnim zrcalom?`, p: "propanal", n: ["propanon", "propan-2-ol", "propanojska kislina"],
    post: x`<p>Tollensov reagent oksidira aldehide v karboksilne kisline, srebrovi ioni se reducirajo v srebro. Ketoni se ne oksidirajo.</p>` },
  { t: 4, b: x`Koliko molov NaOH je potrebnih za popolno umiljenje enega mola trigliceridne maščobe?`, v: 3,
    rez: x`\(3\ \mathrm{mol}\)`, post: x`<p>Triglicerid je triester glicerola, vsaka estrska vez porabi en hidroksid: nastaneta glicerol in 3 moli mila.</p>` },
  { t: 4, b: x`Katera spojina je najmočnejša kislina?`, p: "trikloroetanojska kislina", n: ["etanojska kislina", "etanol", "fenol"],
    post: x`<p>Trije elektronegativni atomi klora odtegujejo elektrone in stabilizirajo anion. Etanol ni kislina v vodi, fenol je šibkejši od karboksilnih kislin.</p>` },
  { t: 4, b: x`Koliko izomernih alkoholov ima formulo \(\mathrm{C_4H_{10}O}\)?`, v: 4,
    rez: x`\(4\)`, post: x`<p>Butan-1-ol, butan-2-ol, 2-metilpropan-1-ol, 2-metilpropan-2-ol. (Etri s to formulo so še trije, a niso alkoholi.)</p>` },
  { t: 4, b: x`Kako ločimo glukozo od fruktoze s Fehlingovim reagentom?`, p: "ne moremo, obe v bazičnem reducirata Fehlingov reagent", n: ["reagira le glukoza", "reagira le fruktoza", "glukoza da modro, fruktoza rdečo oborino"],
    post: x`<p>Fruktoza je keton, a se v bazičnem mediju pretvarja v aldozo (enolizacija), zato je tudi reducirajoči sladkor. Ločimo ju npr. s Seliwanoffovim reagentom.</p>` },
  { t: 4, b: x`Kateri alkohol se ne oksidira s kalijevim dikromatom v kislem?`, p: "2-metilpropan-2-ol", n: ["butan-1-ol", "butan-2-ol", "2-metilpropan-1-ol"],
    post: x`<p>Terciarni alkohol nima vodika na ogljiku s skupino OH, zato se v blagih pogojih ne oksidira.</p>` },
];
