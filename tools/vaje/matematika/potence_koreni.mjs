import { izbira, stevilo, ulomek } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);

export default function ({ z, slug, serija }) {
  // 1. Pravila za potence (eksponent)
  serija("eksponent", 7, (r, i) => {
    const m = r.int(-5, 9), n = r.int(-5, 9), k = r.int(-5, 9), p = r.int(2, 4);
    const izrazi = [
      [`\\dfrac{a^{${m}} \\cdot a^{${n}}}{a^{${k}}}`, m + n - k, `\\(a^{${m} + ${okl(n)} - ${okl(k)}} = a^{${m + n - k}}\\)`],
      [`\\left(a^{${m}}\\right)^{${p}} \\cdot a^{${n}}`, m * p + n, `\\(a^{${m} \\cdot ${p} + ${okl(n)}} = a^{${m * p + n}}\\)`],
      [`\\dfrac{\\left(a^{${n}}\\right)^{${p}}}{a^{${m}} \\cdot a^{${k}}}`, n * p - m - k, `\\(a^{${n * p} - ${okl(m)} - ${okl(k)}} = a^{${n * p - m - k}}\\)`],
    ];
    const [f, e, korak] = izrazi[i % 3];
    return stevilo({ tezavnost: i < 3 ? 1 : 2, vrednost: e, besedilo: `Poenostavi izraz \\(${f}\\) (\\(a \\ne 0\\)) v obliko \\(a^n\\). Koliko je \\(n\\)?`, rezultat: `\\(a^{${e}}\\)`, postopek: `<p>Pri množenju eksponente seštejemo, pri deljenju odštejemo, pri potenciranju potence pomnožimo.</p><p>${korak}</p>` });
  });

  // 2. Negativni eksponenti in ulomki
  serija("negativni", 6, (r, i) => {
    const a = r.int(1, 5), b = r.int(2, 6), n = r.int(1, 3);
    if (a === b) return null;
    if (i % 2 === 0) return stevilo({ tezavnost: 1, vrednost: (b / a) ** n, toleranca: 1e-9, besedilo: `Izračunaj \\(\\left(\\frac{${a}}{${b}}\\right)^{-${n}}\\).`, namig: "Ulomek vpiši kot 9/4.", rezultat: `\\(${ulomek(b ** n, a ** n)}\\)`, postopek: `<p>Negativni eksponent obrne ulomek: \\(\\left(\\frac{${a}}{${b}}\\right)^{-${n}} = \\left(\\frac{${b}}{${a}}\\right)^{${n}} = ${ulomek(b ** n, a ** n)}\\).</p>` });
    const v = 2 ** -n + 3 ** -1;
    return stevilo({ tezavnost: 2, vrednost: v, toleranca: 1e-9, besedilo: `Izračunaj \\(2^{-${n}} + 3^{-1}\\).`, namig: "Ulomek vpiši kot 7/12.", rezultat: `\\(${ulomek(3 + 2 ** n, 3 * 2 ** n)}\\)`, postopek: `<p>\\(2^{-${n}} = \\frac{1}{${2 ** n}}\\), \\(3^{-1} = \\frac13\\).</p><p>\\(\\frac{1}{${2 ** n}} + \\frac{1}{3} = \\frac{3 + ${2 ** n}}{${3 * 2 ** n}} = ${ulomek(3 + 2 ** n, 3 * 2 ** n)}\\)</p>` });
  });

  // 3. Znanstveni zapis
  serija("znanstveni", 6, (r, i) => {
    const m = r.int(11, 99) / 10, e = r.int(-8, 9);
    if (e === 0 || e === 1) return null;
    const desetisko = (m * 10 ** e).toLocaleString("sl-SI", { maximumFractionDigits: 12, useGrouping: false }).replace(".", ",");
    const z = (mm, ee) => `${String(mm).replace(".", "{,}")} \\cdot 10^{${ee}}`;
    const mm = String(m).replace(".", "{,}");
    return izbira({ tezavnost: i < 3 ? 1 : 2, r, besedilo: `Število \\(${desetisko.replace(",", "{,}")}\\) zapiši v znanstvenem zapisu.`, pravilna: `\\(${z(m, e)}\\)`, napacne: [`\\(${z(m, -e)}\\)`, `\\(${z(m, e + 1)}\\)`, `\\(${mm.replace("{,}", "")} \\cdot 10^{${e - 1 === e ? e + 2 : e - 2}}\\)`].map((x) => x), postopek: `<p>Znanstveni zapis je \\(m \\cdot 10^n\\), kjer je \\(1 \\le m < 10\\). Decimalno vejico premaknemo za ${Math.abs(e)} mest ${e > 0 ? "v levo, zato je eksponent pozitiven" : "v desno, zato je eksponent negativen"}.</p><p>\\(${z(m, e)}\\)</p>` });
  });

  // 4. Delno korenjenje
  serija("delno", 7, (r, i) => {
    const a = r.int(2, 9), b = r.izberi([2, 3, 5, 6, 7, 10, 11]);
    if (i < 4) return stevilo({ tezavnost: 1, vrednost: a, besedilo: `Delno koreni \\(\\sqrt{${a * a * b}}\\) v obliko \\(a\\sqrt{${b}}\\). Koliko je \\(a\\)?`, rezultat: `\\(\\sqrt{${a * a * b}} = ${a}\\sqrt{${b}}\\)`, postopek: `<p>\\(${a * a * b} = ${a * a} \\cdot ${b}\\), zato \\(\\sqrt{${a * a * b}} = \\sqrt{${a * a}} \\cdot \\sqrt{${b}} = ${a}\\sqrt{${b}}\\).</p>` });
    const c = r.int(2, 6), d = r.int(1, 5);
    const k = c - d * 2;
    return stevilo({ tezavnost: 2, vrednost: k, besedilo: `Poenostavi \\(${c}\\sqrt{${b}} - ${d}\\sqrt{${4 * b}}\\) v obliko \\(k\\sqrt{${b}}\\). Koliko je \\(k\\)?`, rezultat: `\\(${k}\\sqrt{${b}}\\)`, postopek: `<p>\\(\\sqrt{${4 * b}} = 2\\sqrt{${b}}\\), zato \\(${c}\\sqrt{${b}} - ${2 * d}\\sqrt{${b}} = ${k}\\sqrt{${b}}\\).</p>` });
  });

  // 5. Racionalizacija
  serija("racionalizacija", 5, (r, i) => {
    const a = r.int(1, 6), b = r.izberi([2, 3, 5, 7]);
    if (i % 2 === 0) return izbira({ tezavnost: 2, r, besedilo: `Racionaliziraj imenovalec: \\(\\dfrac{${a * b}}{\\sqrt{${b}}}\\).`, pravilna: `\\(${a === 1 ? "" : a}\\sqrt{${b}}\\)`, napacne: [`\\(${a * b}\\sqrt{${b}}\\)`, `\\(\\frac{${a}}{${b}}\\sqrt{${b}}\\)`, `\\(${a * b * b}\\)`], postopek: `<p>Razširimo s \\(\\sqrt{${b}}\\): \\(\\frac{${a * b}\\sqrt{${b}}}{${b}} = ${a === 1 ? "" : a}\\sqrt{${b}}\\).</p>` });
    const c = r.int(2, 5);
    if (c * c === b) return null;
    const im = c * c - b;
    return izbira({ tezavnost: 3, r, besedilo: `Racionaliziraj imenovalec: \\(\\dfrac{${im}}{${c} - \\sqrt{${b}}}\\).`, pravilna: `\\(${c} + \\sqrt{${b}}\\)`, napacne: [`\\(${c} - \\sqrt{${b}}\\)`, `\\(${im}(${c} + \\sqrt{${b}})\\)`, `\\(\\frac{${c} + \\sqrt{${b}}}{${im}}\\)`], postopek: `<p>Razširimo s \\(${c} + \\sqrt{${b}}\\): imenovalec postane \\(${c}^2 - ${b} = ${im}\\).</p><p>\\(\\frac{${im}(${c} + \\sqrt{${b}})}{${im}} = ${c} + \\sqrt{${b}}\\)</p>` });
  });

  // 6. Racionalni eksponenti
  serija("racionalni", 7, (r, i) => {
    const osnova = r.izberi([2, 3, 4, 5]), q = r.int(2, 3), p = r.int(1, 3);
    const x = osnova ** q;
    const neg = i >= 4;
    const v = neg ? osnova ** -p : osnova ** p;
    return stevilo({ tezavnost: neg ? 2 : 1, vrednost: v, toleranca: 1e-9, besedilo: `Izračunaj \\(${x}^{${neg ? "-" : ""}\\frac{${p}}{${q}}}\\).`, namig: neg ? "Ulomek vpiši kot 1/8." : undefined, rezultat: `\\(${neg ? ulomek(1, osnova ** p) : v}\\)`, postopek: `<p>\\(${x}^{\\frac{${p}}{${q}}} = \\left(\\sqrt[${q}]{${x}}\\right)^{${p}} = ${osnova}^{${p}} = ${osnova ** p}\\)${neg ? `, z negativnim eksponentom pa \\(\\frac{1}{${osnova ** p}}\\)` : ""}.</p>` });
  });

  // 7. x^n = a
  serija("xn", 6, (r, i) => {
    const n = r.int(2, 5), a = r.izberi([-1, 1]) * r.int(1, 4) ** n;
    const resitve = n % 2 === 0 ? (a > 0 ? 2 : 0) : 1;
    if (i % 2 === 0) return izbira({ tezavnost: 2, r, besedilo: `Koliko realnih rešitev ima enačba \\(x^{${n}} = ${a}\\)?`, pravilna: `${resitve}`, napacne: ["0", "1", "2", "3"].filter((x) => x !== `${resitve}`).slice(0, 3), postopek: `<p>${n % 2 === 0 ? `Sodi eksponent: ${a > 0 ? "pozitivno število ima dva realna korena, \\(\\pm\\sqrt[" + n + "]{" + a + "}\\)" : "potenca je vedno nenegativna, zato rešitve ni"}.` : "Lihi eksponent: natanko ena realna rešitev."}</p>` });
    if (n % 2 === 0 && a < 0) return null;
    const x = Math.sign(a) * Math.round(Math.abs(a) ** (1 / n));
    if (n % 2 === 0) return stevilo({ tezavnost: 2, vrednost: Math.abs(x), besedilo: `Reši enačbo \\(x^{${n}} = ${a}\\). Vpiši pozitivno rešitev.`, rezultat: `\\(x = \\pm ${Math.abs(x)}\\)`, postopek: `<p>Sodi eksponent in pozitivna desna stran: \\(x = \\pm\\sqrt[${n}]{${a}} = \\pm ${Math.abs(x)}\\).</p>` });
    return stevilo({ tezavnost: 2, vrednost: x, besedilo: `Reši enačbo \\(x^{${n}} = ${a}\\).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Lihi eksponent: natanko ena rešitev, \\(x = \\sqrt[${n}]{${a}} = ${x}\\)${a < 0 ? " (lihi koren negativnega števila je negativen)" : ""}.</p>` });
  });

  // 8. Koren kvadrata
  const abs = [
    ["\\sqrt{x^2}", "|x|", ["x", "-x", "\\pm x"], "Kvadratni koren je vedno nenegativen, zato \\(\\sqrt{x^2} = |x|\\)."],
    ["\\sqrt{(x - 3)^2} \\text{ za } x < 3", "3 - x", ["x - 3", "|x| - 3", "x + 3"], "\\(\\sqrt{(x - 3)^2} = |x - 3|\\); za \\(x < 3\\) je \\(x - 3 < 0\\), zato \\(|x - 3| = 3 - x\\)."],
    ["\\sqrt[3]{x^3}", "x", ["|x|", "-x", "x^3"], "Lihi koren ohrani predznak: \\(\\sqrt[3]{x^3} = x\\)."],
    ["\\sqrt{x^2 - 6x + 9} \\text{ za } x \\ge 3", "x - 3", ["3 - x", "x + 3", "|x + 3|"], "\\(x^2 - 6x + 9 = (x - 3)^2\\), za \\(x \\ge 3\\) je \\(|x - 3| = x - 3\\)."],
  ];
  serija("abs", abs.length, (r, i) => {
    const [f, p, n, razlaga] = abs[i];
    return izbira({ tezavnost: 3, r, besedilo: `Poenostavi \\(${f}\\).`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>${razlaga}</p>` });
  });

  // 9. Iracionalne enačbe
  serija("iracionalna", 7, (r, i) => {
    if (i < 3) {
      const x = r.int(-3, 12), a = r.int(-5, 10), b = x + a;
      if (b < 0) return null;
      const c = Math.sqrt(b);
      if (!Number.isInteger(c)) return null;
      return stevilo({ tezavnost: 2, vrednost: x, besedilo: `Reši enačbo \\(\\sqrt{x ${a < 0 ? "-" : "+"} ${Math.abs(a)}} = ${c}\\).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Kvadriramo: \\(x ${a < 0 ? "-" : "+"} ${Math.abs(a)} = ${c * c}\\), \\(x = ${x}\\).</p><p>Preizkus: \\(\\sqrt{${b}} = ${c}\\) ✓</p>` });
    }
    // sqrt(x + a) = x + b, ena rešitev odpade
    const x1 = r.int(-2, 8), x2 = r.int(-8, 8);
    if (x1 === x2) return null;
    // (x + b)^2 = x + a  ↔ x^2 + (2b - 1)x + b^2 - a = 0 z ničlama x1, x2: 2b - 1 = -(x1 + x2)
    const b2 = 1 - (x1 + x2);
    if (b2 % 2 !== 0) return null;
    const b = b2 / 2, a = b * b - x1 * x2;
    const ok = (x) => x + b >= 0 && x + a >= 0;
    const veljavne = [x1, x2].filter(ok);
    if (veljavne.length !== 1) return null;
    const [x] = veljavne, nap = x === x1 ? x2 : x1;
    return stevilo({ tezavnost: 3, vrednost: x, besedilo: `Reši enačbo \\(\\sqrt{x ${a < 0 ? "-" : "+"} ${Math.abs(a)}} = x ${b < 0 ? "-" : "+"} ${Math.abs(b)}\\).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Kvadriramo: \\(x ${a < 0 ? "-" : "+"} ${Math.abs(a)} = (x ${b < 0 ? "-" : "+"} ${Math.abs(b)})^2\\), uredimo v \\(x^2 ${2 * b - 1 < 0 ? "-" : "+"} ${Math.abs(2 * b - 1)}x ${b * b - a < 0 ? "-" : "+"} ${Math.abs(b * b - a)} = 0\\).</p><p>Kandidata: \\(x = ${x1}\\) in \\(x = ${x2}\\). Preizkus: pri \\(x = ${nap}\\) je desna stran \\(${nap + b} < 0\\), zato odpade.</p><p>Rešitev: \\(x = ${x}\\).</p>` });
  });

  // 10. Enačbe z racionalnim eksponentom
  serija("enacba-racionalni", 4, (r) => {
    const osnova = r.izberi([2, 3, 4]), p = r.int(2, 3), q = r.izberi([2, 3]);
    if (p === q) return null;
    const x = osnova ** q, desna = osnova ** p;
    return stevilo({ tezavnost: 3, vrednost: x, besedilo: `Reši enačbo \\(x^{\\frac{${p}}{${q}}} = ${desna}\\) (\\(x > 0\\)).`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Obe strani potenciramo na \\(\\frac{${q}}{${p}}\\): \\(x = ${desna}^{\\frac{${q}}{${p}}} = \\left(\\sqrt[${p}]{${desna}}\\right)^{${q}} = ${osnova}^{${q}} = ${x}\\).</p>` });
  });

  // 11. Višja raven: korenjenje izrazov in gnezdeni koreni
  const visja = [
    ["\\sqrt{7 + 4\\sqrt{3}}", "2 + \\sqrt{3}", ["\\sqrt{7} + 2\\sqrt[4]{3}", "4 + \\sqrt{3}", "\\sqrt{3} + \\sqrt{4}"], "Iščemo \\((a + \\sqrt{3})^2 = a^2 + 3 + 2a\\sqrt{3}\\): \\(2a = 4\\), \\(a = 2\\), in res \\(4 + 3 = 7\\)."],
    ["\\sqrt{6 - 2\\sqrt{5}}", "\\sqrt{5} - 1", ["1 - \\sqrt{5}", "\\sqrt{6} - \\sqrt{5}", "\\sqrt{5} + 1"], "\\((\\sqrt5 - 1)^2 = 5 - 2\\sqrt5 + 1 = 6 - 2\\sqrt5\\); ker je \\(\\sqrt5 > 1\\), je koren \\(\\sqrt5 - 1\\)."],
    ["\\sqrt[3]{\\sqrt{x}} \\cdot \\sqrt[6]{x^5}", "x", ["x^{\\frac{5}{6}}", "\\sqrt[6]{x}", "x^2"], "\\(x^{\\frac16} \\cdot x^{\\frac56} = x^{\\frac66} = x\\)."],
    ["\\dfrac{\\sqrt[4]{a^3} \\cdot \\sqrt{a}}{\\sqrt[4]{a}}", "a", ["\\sqrt{a}", "a^{\\frac{3}{2}}", "\\sqrt[4]{a^3}"], "\\(a^{\\frac34} \\cdot a^{\\frac24} : a^{\\frac14} = a^{\\frac{3 + 2 - 1}{4}} = a\\)."],
  ];
  serija("visja", visja.length, (r, i) => {
    const [f, p, n, razlaga] = visja[i];
    return izbira({ tezavnost: 4, raven: "visja", r, besedilo: `Poenostavi \\(${f}\\)${i >= 2 ? " (spremenljivka je pozitivna)" : ""}.`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>${razlaga}</p>` });
  });
}
