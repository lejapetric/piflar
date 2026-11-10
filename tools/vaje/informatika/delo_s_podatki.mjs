import { izbira, kolicina, besedilo, T, L } from "../lib.mjs";

const koda = (s) => `<pre class="koda"><code>${s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
const BESEDE = ["informatika", "programiranje", "matura", "podatki", "algoritem", "python", "tabela", "seznam", "piflar", "racunalnik"];
const IMENA = ["Ana", "Bor", "Cene", "Eva", "Jan", "Lara", "Miha", "Nika", "Tim", "Zala"];

export default function ({ serija, pojmi, vprasanja }) {
  serija("rezina", 8, (r) => {
    const s = r.izberi(BESEDE), a = r.int(0, 3), b = r.int(a + 2, Math.min(s.length, a + 6)), neg = r.int(0, 2) === 0;
    const izraz = neg ? `s[-${b - a}:]` : `s[${a}:${b}]`, res = neg ? s.slice(-(b - a)) : s.slice(a, b);
    return besedilo({ tezavnost: 2, sprejemljivi: [res, `'${res}'`, `"${res}"`], besedilo: `Kaj izpiše program?${koda(`s = "${s}"\nprint(${izraz})`)}`, rezultat: res, postopek: `<p>${neg ? `Negativni indeks šteje od konca: zadnjih ${b - a} znakov.` : `Znaki od indeksa ${a} do vključno ${b - 1} (indeksi se začnejo z 0).`} Rezultat: ${res}.</p>` });
  });
  serija("zanka-vsota", 8, (r, i) => {
    const a = r.int(0, 5), b = r.int(a + 3, a + 12), k = r.izberi([1, 1, 2, 3]);
    const vals = []; for (let x = a; x < b; x += k) vals.push(x);
    const s = vals.reduce((p, q) => p + q, 0);
    return kolicina({ tezavnost: 2, vrednost: s, enota: "", besedilo: `Kaj izpiše program?${koda(`vsota = 0\nfor i in range(${a}, ${b}${k > 1 ? `, ${k}` : ""}):\n    vsota += i\nprint(vsota)`)}`, rezultat: `${s}`, postopek: `<p>i zavzame vrednosti ${vals.join(", ")} (zgornja meja ${b} ni vključena). Vsota: ${s}.</p>` });
  });
  serija("seznam", 8, (r, i) => {
    const x = Array.from({ length: r.int(4, 7) }, () => r.int(1, 30));
    const [izraz, v, raz] = r.izberi([
      ["max(x) - min(x)", Math.max(...x) - Math.min(...x), `${Math.max(...x)} − ${Math.min(...x)}`],
      ["len(x)", x.length, "število elementov"],
      ["sum(x[::2])", x.filter((_, j) => j % 2 === 0).reduce((a, b) => a + b, 0), `vsota elementov na sodih indeksih: ${x.filter((_, j) => j % 2 === 0).join(" + ")}`],
      ["x[-1] + x[0]", x[x.length - 1] + x[0], `zadnji ${x[x.length - 1]} + prvi ${x[0]}`],
      ["x[2] * 2", x[2] * 2, `x[2] = ${x[2]}`],
      ["sum(x) // len(x)", Math.floor(x.reduce((a, b) => a + b, 0) / x.length), `celoštevilsko deljenje ${x.reduce((a, b) => a + b, 0)} // ${x.length}`],
    ]);
    return kolicina({ tezavnost: 2, vrednost: v, enota: "", besedilo: `Kaj izpiše program?${koda(`x = [${x.join(", ")}]\nprint(${izraz})`)}`, rezultat: `${v}`, postopek: `<p>${raz}: ${v}.</p>` });
  });
  serija("deljenje", 6, (r) => {
    const a = r.int(10, 99), b = r.int(2, 9), op = r.izberi(["//", "%"]), v = op === "//" ? Math.floor(a / b) : a % b;
    return kolicina({ tezavnost: 1, vrednost: v, enota: "", besedilo: `Kaj izpiše ukaz?${koda(`print(${a} ${op} ${b})`)}`, rezultat: `${v}`, postopek: `<p>${op === "//" ? "Celoštevilsko deljenje" : "Ostanek pri deljenju"}: ${a} = ${Math.floor(a / b)} · ${b} + ${a % b}, rezultat ${v}.</p>` });
  });
  serija("while", 6, (r) => {
    const N = r.int(10, 1000); let n = N, k = 0; while (n > 1) { n = Math.floor(n / 2); k++; }
    return kolicina({ tezavnost: 3, vrednost: k, enota: "", besedilo: `Kaj izpiše program?${koda(`n = ${N}\nk = 0\nwhile n > 1:\n    n = n // 2\n    k += 1\nprint(k)`)}`, rezultat: `${k}`, postopek: `<p>Število razpolavljanj do 1 je \\(\\lfloor \\log_2 ${N} \\rfloor = ${k}\\).</p>` });
  });
  serija("funkcija", 6, (r) => {
    const a = r.int(2, 5), b = r.int(1, 9), x = r.int(1, 6), v = a * (a * x + b) + b;
    return kolicina({ tezavnost: 3, vrednost: v, enota: "", besedilo: `Kaj izpiše program?${koda(`def f(x):\n    return ${a} * x + ${b}\n\nprint(f(f(${x})))`)}`, rezultat: `${v}`, postopek: `<p>\\(f(${x}) = ${a * x + b}\\), \\(f(${a * x + b}) = ${v}\\)</p>` });
  });
  serija("rekurzija", 4, (r) => {
    const n = r.int(3, 7); let f = 1; for (let k = 2; k <= n; k++) f *= k;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: f, enota: "", besedilo: `Kaj izpiše program?${koda(`def g(n):\n    if n <= 1:\n        return 1\n    return n * g(n - 1)\n\nprint(g(${n}))`)}`, rezultat: `${f}`, postopek: `<p>Funkcija rekurzivno računa \\(${n}! = ${f}\\).</p>` });
  });
  serija("sql", 10, (r) => {
    const imena = r.premesaj(IMENA).slice(0, 7), vrst = imena.map((ime) => [ime, r.izberi(["3a", "3b", "4a"]), r.int(1, 5)]);
    const tab = `<table class="tabela"><tr><th>ime</th><th>razred</th><th>ocena</th></tr>${vrst.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`).join("")}</table>`;
    const raz = r.izberi(["3a", "3b", "4a"]), k = r.int(2, 4);
    const [q, v, tez] = r.izberi([
      [`SELECT COUNT(*) FROM dijaki WHERE ocena >= ${k};`, vrst.filter((x) => x[2] >= k).length, 2],
      [`SELECT COUNT(*) FROM dijaki WHERE razred = '${raz}';`, vrst.filter((x) => x[1] === raz).length, 2],
      [`SELECT MAX(ocena) FROM dijaki WHERE razred = '${raz}';`, vrst.filter((x) => x[1] === raz).length ? Math.max(...vrst.filter((x) => x[1] === raz).map((x) => x[2])) : null, 3],
      [`SELECT SUM(ocena) FROM dijaki WHERE ocena < ${k} OR razred = '${raz}';`, vrst.filter((x) => x[2] < k || x[1] === raz).reduce((a, x) => a + x[2], 0), 4],
      [`SELECT AVG(ocena) FROM dijaki;`, vrst.reduce((a, x) => a + x[2], 0) / vrst.length, 3],
    ]);
    if (v === null) return null;
    return kolicina({ tezavnost: tez, ...(tez === 4 ? { raven: "visja" } : {}), vrednost: v, tol: 0.01, enota: "", besedilo: `Tabela <code>dijaki</code>:${tab}Kaj vrne poizvedba?${koda(q)}`, rezultat: `${T(v, 2)}`, postopek: `<p>Upoštevamo le vrstice, ki ustrezajo pogoju, in uporabimo agregatno funkcijo: ${T(v, 2)}.</p>` });
  });
  serija("preglednica", 8, (r) => {
    const x = Array.from({ length: 5 }, () => r.int(1, 20)), k = r.int(5, 15);
    const [f, v, raz] = r.izberi([
      ["=SUM(A1:A5)", x.reduce((a, b) => a + b, 0), "vsota"],
      ["=AVERAGE(A1:A5)", x.reduce((a, b) => a + b, 0) / 5, "povprečje"],
      ["=MAX(A1:A5)-MIN(A1:A5)", Math.max(...x) - Math.min(...x), "razlika največje in najmanjše"],
      [`=COUNTIF(A1:A5;">${k}")`, x.filter((y) => y > k).length, `število celic, večjih od ${k}`],
      ["=A2*2+A4", x[1] * 2 + x[3], "A2 · 2 + A4"],
    ]);
    return kolicina({ tezavnost: 2, vrednost: v, tol: 0.01, enota: "", besedilo: `V celicah A1 do A5 so vrednosti ${x.join(", ")}. Kaj izračuna formula <code>${f.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>?`, rezultat: `${T(v, 2)}`, postopek: `<p>${raz.charAt(0).toUpperCase() + raz.slice(1)}: ${T(v, 2)}.</p>` });
  });
  serija("iskanje", 6, (r, i) => {
    const n = r.izberi([10, 50, 100, 500, 1000, 1024, 10000, 1e6]), k = Math.ceil(Math.log2(n + 1));
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: k, enota: "", besedilo: `Največ koliko primerjav potrebuje bisekcija (dvojiško iskanje) v urejenem seznamu z ${n} elementi?`, rezultat: `${k}`, postopek: `<p>\\(\\lceil \\log_2(${n} + 1) \\rceil = ${k}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: n, enota: "", besedilo: `Največ koliko primerjav potrebuje zaporedno (linearno) iskanje v seznamu z ${n} elementi?`, rezultat: `${n}`, postopek: `<p>V najslabšem primeru pregledamo vse elemente: ${n}.</p>` });
  });
  serija("zahtevnost", 5, (r) => {
    const [a, odg] = r.izberi([["dvojiško iskanje", "O(log n)"], ["zaporedno iskanje", "O(n)"], ["urejanje z mehurčki", "O(n²)"], ["urejanje z zlivanjem", "O(n log n)"], ["dostop do elementa seznama po indeksu", "O(1)"]]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kakšna je časovna zahtevnost (najslabši primer) algoritma: ${a}?`, pravilna: odg, napacne: ["O(log n)", "O(n)", "O(n²)", "O(n log n)", "O(1)"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${a.charAt(0).toUpperCase() + a.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["algoritem", "Končno zaporedje natančnih navodil za rešitev problema."],
    ["spremenljivka", "Poimenovano mesto v pomnilniku, ki hrani vrednost."],
    ["zanka", "Programski stavek, ki ponavlja ukaze."],
    ["pogojni stavek", "Stavek, ki izvede ukaze le, če je pogoj izpolnjen."],
    ["funkcija", "Poimenovan del programa, ki ga lahko večkrat pokličemo."],
    ["rekurzija", "Postopek, pri katerem funkcija kliče samo sebe."],
    ["prevajalnik", "Program, ki izvorno kodo pred izvajanjem prevede v strojno kodo."],
    ["tolmač", "Program, ki izvorno kodo izvaja vrstico za vrstico."],
    ["podatkovna baza", "Organizirana zbirka povezanih podatkov."],
    ["primarni ključ", "Atribut, ki enolično določa vsako vrstico tabele."],
    ["tuji ključ", "Atribut, ki se sklicuje na primarni ključ druge tabele."],
    ["SQL", "Jezik za poizvedbe in delo s podatki v relacijskih bazah."],
    ["absolutni sklic", "Sklic na celico v preglednici, ki se pri kopiranju ne spremeni, npr. $A$1."],
    ["diagram poteka", "Grafični prikaz algoritma s simboli in puščicami."],
  ]);
  vprasanja([
    [2, "Kaj izpiše <code>print(type(3.0))</code> v Pythonu?", "&lt;class 'float'&gt;", ["&lt;class 'int'&gt;", "&lt;class 'str'&gt;", "3"], "3.0 je realno število (float)."],
    [3, "Kaj izpiše <code>print(\"ab\" * 3)</code>?", { vpis: ["ababab"] }, [], "Množenje niza s celim številom ga ponovi."],
    [3, "Katera SQL-poizvedba uredi rezultate padajoče po stolpcu ocena?", "SELECT * FROM dijaki ORDER BY ocena DESC;", ["SELECT * FROM dijaki SORT ocena;", "SELECT * FROM dijaki ORDER BY ocena ASC;", "SELECT DESC ocena FROM dijaki;"], "ORDER BY … DESC uredi padajoče."],
    [4, "Kaj se zgodi s formulo =A1*$B$1, če jo iz C1 kopiramo v C2?", "postane =A2*$B$1", ["postane =A2*$B$2", "ostane =A1*$B$1", "postane =B1*$C$1"], "Relativni sklic se premakne, absolutni ostane.", "visja"],
    [4, "Zakaj je dvojiško iskanje hitrejše od zaporednega?", "ker v vsakem koraku izloči polovico preostalih elementov", ["ker pregleda vse elemente", "ker ne potrebuje urejenih podatkov", "ker uporablja rekurzijo"], "Število korakov raste logaritemsko, a seznam mora biti urejen.", "visja"],
    [4, "Kaj izpiše program <code>x = [1, 2, 3]; y = x; y.append(4); print(len(x))</code>?", { vpis: ["4"] }, [], "x in y kažeta na isti seznam.", "visja"],
  ]);
}
