import { stevilo, izbira, T, L } from "../lib.mjs";

const fak = (n) => (n <= 1 ? 1 : n * fak(n - 1));
const C = (n, k) => (k < 0 || k > n ? 0 : Math.round(fak(n) / (fak(k) * fak(n - k))));
const V = (n, k) => Math.round(fak(n) / fak(n - k));

export default function ({ serija }) {
  serija("fakulteta", 4, (r) => {
    const n = r.int(4, 9), k = r.int(1, 3);
    return stevilo({ tezavnost: 1, vrednost: fak(n) / fak(n - k), besedilo: `Izračunaj \\(\\frac{${n}!}{${n - k}!}\\).`, rezultat: `${fak(n) / fak(n - k)}`, postopek: `<p>Krajšamo: \\(\\frac{${n}!}{${n - k}!} = ${Array.from({ length: k }, (_, i) => n - i).join(" \\cdot ")} = ${fak(n) / fak(n - k)}\\).</p>` });
  });
  serija("produkt", 6, (r) => {
    const [a, b, c] = [r.int(2, 6), r.int(2, 6), r.int(2, 5)];
    const [t, raz] = r.izberi([
      [`Na meniju so ${a} predjedi, ${b} glavnih jedi in ${c} sladice. Koliko različnih kosil (predjed, glavna jed, sladica) lahko sestavimo?`, "predjed, glavna jed in sladica"],
      [`Ana ima ${a} majic, ${b} hlač in ${c} parov čevljev. Na koliko načinov se lahko obleče?`, "majica, hlače in čevlji"],
      [`Iz kraja A v B vodi ${a} poti, iz B v C ${b} poti, iz C v D pa ${c}. Na koliko načinov pridemo iz A v D skozi B in C?`, "posamezni odseki poti"],
    ]);
    return stevilo({ tezavnost: 1, vrednost: a * b * c, besedilo: t, rezultat: `${a * b * c}`, postopek: `<p>Osnovni izrek kombinatorike: izbire (${raz}) so neodvisne, zato števila pomnožimo: \\(${a} \\cdot ${b} \\cdot ${c} = ${a * b * c}\\).</p>` });
  });
  serija("permutacije", 6, (r, i) => {
    const n = r.int(3, 8);
    const t = [`Na koliko načinov se lahko ${n} oseb postavi v vrsto?`, `Koliko različnih ${n}-mestnih števil lahko sestavimo iz števk ${Array.from({ length: n }, (_, j) => j + 1).join(", ")}, če se nobena ne ponovi?`, `Na koliko načinov lahko na polico postavimo ${n} različnih knjig?`][i % 3];
    return stevilo({ tezavnost: 1, vrednost: fak(n), besedilo: t, rezultat: `\\(${n}! = ${fak(n)}\\)`, postopek: `<p>To so permutacije ${n} elementov: \\(P_{${n}} = ${n}! = ${fak(n)}\\).</p>` });
  });
  serija("permutacije-ponav", 4, (r) => {
    const [b, opis] = r.izberi([["MATEMATIKA", "M×2, A×3, T×2, E, I, K"], ["ANANAS", "A×3, N×2, S"], ["BANANA", "B, A×3, N×2"], ["KOKOS", "K×2, O×2, S"], ["PAPIR", "P×2, A, I, R"], ["TATA", "T×2, A×2"], ["LJUBLJANA", "L×2, J×2, U, B, A×2, N"]]);
    const cnt = {}; for (const ch of b.replace("LJ", "Λ").replace("LJ", "Λ")) cnt[ch] = (cnt[ch] ?? 0) + 1;
    const crke = b === "LJUBLJANA" ? ["L", "J", "U", "B", "L", "J", "A", "N", "A"] : [...b];
    const c2 = {}; for (const ch of crke) c2[ch] = (c2[ch] ?? 0) + 1;
    const v = fak(crke.length) / Object.values(c2).reduce((s, x) => s * fak(x), 1);
    return stevilo({ tezavnost: 2, vrednost: v, besedilo: `Koliko različnih »besed« (zaporedij črk) lahko sestavimo iz vseh črk besede ${b}?`, rezultat: `${v}`, postopek: `<p>Permutacije s ponavljanjem: ${crke.length} črk (${opis}).</p><p>\\(\\frac{${crke.length}!}{${Object.values(c2).filter((x) => x > 1).map((x) => `${x}!`).join(" \\cdot ")}} = ${v}\\)</p>` });
  });
  serija("variacije", 6, (r, i) => {
    const n = r.int(5, 12), k = r.int(2, 4);
    const t = [`V teku sodeluje ${n} tekačev. Na koliko načinov so lahko razdeljene medalje (zlata, srebrna, bronasta)?`, `Iz ${n} učencev izberemo predsednika, podpredsednika${k > 2 ? ", tajnika" : ""}${k > 3 ? " in blagajnika" : ""}. Na koliko načinov?`, `Koliko ${k}-mestnih kod z različnimi števkami lahko sestavimo iz ${n} različnih števk?`][i % 3];
    const kk = i % 3 === 0 ? 3 : k;
    return stevilo({ tezavnost: 2, vrednost: V(n, kk), besedilo: t, rezultat: `${V(n, kk)}`, postopek: `<p>Vrstni red je pomemben, ponavljanje ni dovoljeno: variacije \\(V^{${n}}_{${kk}} = ${Array.from({ length: kk }, (_, j) => n - j).join(" \\cdot ")} = ${V(n, kk)}\\).</p>` });
  });
  serija("variacije-ponav", 4, (r, i) => {
    const n = r.izberi([2, 3, 10, 26, 4]), k = r.int(2, 5);
    const t = n === 10 ? `Koliko različnih ${k}-mestnih PIN kod (števke 0–9, ponavljanje dovoljeno) obstaja?` : n === 2 ? `Kovanec vržemo ${k}-krat. Koliko je različnih zaporedij izidov?` : `Koliko različnih ${k}-črkovnih nizov lahko sestavimo iz ${n} črk, če se črke lahko ponavljajo?`;
    return stevilo({ tezavnost: 1, vrednost: n ** k, besedilo: t, rezultat: `\\(${n}^{${k}} = ${n ** k}\\)`, postopek: `<p>Na vsakem od ${k} mest imamo ${n} možnosti: \\(${n}^{${k}} = ${n ** k}\\).</p>` });
  });
  serija("kombinacije", 7, (r, i) => {
    const n = r.int(5, 15), k = r.int(2, Math.min(5, n - 2));
    const t = [`Na koliko načinov lahko iz razreda ${n} dijakov izberemo ${k}-člansko ekipo?`, `Na zabavi je ${n} ljudi in vsak se z vsakim enkrat rokuje. Koliko je rokovanj?`, `Koliko daljic določa ${n} točk, od katerih nobene tri niso kolinearne?`, `Iz ${n} različnih sadežev izberemo ${k} za kompot. Na koliko načinov?`][i % 4];
    const kk = i % 4 === 1 || i % 4 === 2 ? 2 : k;
    return stevilo({ tezavnost: 2, vrednost: C(n, kk), besedilo: t, rezultat: `\\(\\binom{${n}}{${kk}} = ${C(n, kk)}\\)`, postopek: `<p>Vrstni red ni pomemben: kombinacije \\(\\binom{${n}}{${kk}} = \\frac{${n}!}{${kk}! \\, ${n - kk}!} = ${C(n, kk)}\\).</p>` });
  });
  serija("izbira-tipa", 6, (r) => {
    const [t, odg] = r.izberi([
      ["Izbira 3 dijakov za dežurstvo (vsi enakovredni)", "kombinacije"],
      ["Razvrstitev 5 tekmovalcev na stopničke 1., 2., 3. mesto", "variacije"],
      ["Razporeditev 6 oseb okoli … v vrsto pred blagajno", "permutacije"],
      ["Število 4-mestnih PIN kod (števke se smejo ponavljati)", "variacije s ponavljanjem"],
      ["Izbira 6 števil od 39 na loteriji", "kombinacije"],
      ["Določitev predsednika in tajnika izmed 20 članov", "variacije"],
      ["Število vrstnih redov črk besede KOLO", "permutacije s ponavljanjem"],
    ].map(([a, b]) => [a.replace(" okoli … ", " "), b]));
    return izbira({ r, tezavnost: 2, besedilo: `Kateri kombinatorični pojem opisuje primer: ${t}?`, pravilna: odg, napacne: ["kombinacije", "variacije", "permutacije", "variacije s ponavljanjem", "permutacije s ponavljanjem"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>Vprašamo se: ali je vrstni red pomemben, ali izberemo vse elemente in ali se elementi lahko ponavljajo? Tu gre za ${odg}.</p>` });
  });
  serija("binomski", 6, (r) => {
    const n = r.int(4, 8), k = r.int(1, n - 1), a = r.izberi([1, 2, 3]), b = r.izberi([1, -1, 2, -2]);
    // koeficient pri x^k v (a x + b)^n = C(n,k) a^k b^(n-k)
    const v = C(n, k) * a ** k * b ** (n - k);
    return stevilo({ tezavnost: 3, vrednost: v, besedilo: `Kolikšen je koeficient pri \\(x^{${k}}\\) v razvoju \\((${a === 1 ? "" : a}x ${b < 0 ? "-" : "+"} ${Math.abs(b)})^{${n}}\\)?`, rezultat: `${v}`, postopek: `<p>Splošni člen: \\(\\binom{${n}}{${k}}(${a === 1 ? "" : a}x)^{${k}}(${b})^{${n - k}}\\).</p><p>\\(\\binom{${n}}{${k}} \\cdot ${a}^{${k}} \\cdot (${b})^{${n - k}} = ${C(n, k)} \\cdot ${a ** k} \\cdot ${b ** (n - k)} = ${v}\\)</p>` });
  });
  serija("pascal", 3, (r) => {
    const n = r.int(4, 10);
    return stevilo({ tezavnost: 2, vrednost: 2 ** n, besedilo: `Kolikšna je vsota vseh binomskih koeficientov \\(\\binom{${n}}{0} + \\binom{${n}}{1} + \\ldots + \\binom{${n}}{${n}}\\)?`, rezultat: `\\(2^{${n}} = ${2 ** n}\\)`, postopek: `<p>V razvoj \\((1 + 1)^{${n}}\\) vstavimo binomski izrek: vsota je \\(2^{${n}} = ${2 ** n}\\).</p>` });
  });
  serija("pogoj", 5, (r, i) => {
    const f = r.int(4, 9), m = r.int(4, 9), k = r.int(2, 3), l = r.int(1, 3);
    if (i % 2) {
      return stevilo({ tezavnost: 3, vrednost: C(f, k) * C(m, l), besedilo: `V razredu je ${f} deklet in ${m} fantov. Na koliko načinov izberemo skupino ${k} deklet in ${l} ${l === 1 ? "fanta" : "fantov"}?`, rezultat: `${C(f, k) * C(m, l)}`, postopek: `<p>Dekleta izberemo na \\(\\binom{${f}}{${k}} = ${C(f, k)}\\), fante na \\(\\binom{${m}}{${l}} = ${C(m, l)}\\) načinov; zmnožimo: ${C(f, k) * C(m, l)}.</p>` });
    }
    const n = f + m, s = k + l, v = C(n, s) - C(m, s);
    return stevilo({ tezavnost: 3, vrednost: v, besedilo: `V razredu je ${f} deklet in ${m} fantov. Na koliko načinov izberemo ${s} dijakov tako, da je med njimi vsaj eno dekle?`, rezultat: `${v}`, postopek: `<p>Komplement: od vseh izbir \\(\\binom{${n}}{${s}} = ${C(n, s)}\\) odštejemo tiste brez deklet \\(\\binom{${m}}{${s}} = ${C(m, s)}\\).</p><p>\\(${C(n, s)} - ${C(m, s)} = ${v}\\)</p>` });
  });
  serija("stevila", 5, (r, i) => {
    const kaj = i % 3;
    if (kaj === 0) {
      const n = r.int(3, 5);
      const v = 9 * V(9, n - 1);
      return stevilo({ tezavnost: 3, vrednost: v, besedilo: `Koliko je ${n}-mestnih naravnih števil z različnimi števkami?`, rezultat: `${v}`, postopek: `<p>Prva števka ne sme biti 0: 9 možnosti. Za ostala ${n - 1} mesta izbiramo iz preostalih 9 števk: \\(V^9_{${n - 1}} = ${V(9, n - 1)}\\).</p><p>\\(9 \\cdot ${V(9, n - 1)} = ${v}\\)</p>` });
    }
    if (kaj === 1) {
      const n = r.int(3, 6);
      const v = 9 * 10 ** (n - 2) * 5;
      return stevilo({ tezavnost: 3, vrednost: v, besedilo: `Koliko je ${n}-mestnih sodih naravnih števil?`, rezultat: `${v}`, postopek: `<p>Prva števka: 9 možnosti (1–9), zadnja: 5 možnosti (0, 2, 4, 6, 8), vmesnih ${n - 2}: po 10 možnosti.</p><p>\\(9 \\cdot ${10 ** (n - 2)} \\cdot 5 = ${v}\\)</p>` });
    }
    const n = r.int(3, 5), st = [1, 2, 3, 4, 5, 6].slice(0, r.int(n, 6));
    const v = V(st.length, n);
    return stevilo({ tezavnost: 2, vrednost: v, besedilo: `Koliko ${n}-mestnih števil z različnimi števkami lahko sestavimo iz števk ${st.join(", ")}?`, rezultat: `${v}`, postopek: `<p>Variacije brez ponavljanja: \\(V^{${st.length}}_{${n}} = ${v}\\).</p>` });
  });
  serija("krog", 3, (r) => {
    const n = r.int(4, 8);
    return stevilo({ tezavnost: 3, vrednost: fak(n - 1), besedilo: `Na koliko načinov se lahko ${n} oseb posede za okroglo mizo (pomembna je le razporeditev sosedov, ne zasuk)?`, rezultat: `\\((${n} - 1)! = ${fak(n - 1)}\\)`, postopek: `<p>Eno osebo posedemo kamorkoli (vsi zasuki so enaki), ostale razvrstimo: \\((${n} - 1)! = ${fak(n - 1)}\\).</p>` });
  });
  serija("skupaj", 4, (r) => {
    const n = r.int(4, 8);
    const v = 2 * fak(n - 1);
    return stevilo({ tezavnost: 3, vrednost: v, besedilo: `${n} oseb, med njimi Ana in Bor, se postavi v vrsto. Na koliko načinov, če Ana in Bor stojita skupaj?`, rezultat: `${v}`, postopek: `<p>Ano in Bora združimo v en »blok«: razvrščamo ${n - 1} enot na \\(${n - 1}! = ${fak(n - 1)}\\) načinov.</p><p>Znotraj bloka sta dva vrstna reda: \\(2 \\cdot ${fak(n - 1)} = ${v}\\).</p>` });
  });
  serija("diagonale", 3, (r) => {
    const n = r.int(5, 20);
    return stevilo({ tezavnost: 2, vrednost: (n * (n - 3)) / 2, besedilo: `Koliko diagonal ima konveksni ${n}-kotnik?`, rezultat: `${(n * (n - 3)) / 2}`, postopek: `<p>Vseh daljic med oglišči je \\(\\binom{${n}}{2} = ${C(n, 2)}\\), od tega je ${n} stranic.</p><p>\\(${C(n, 2)} - ${n} = ${(n * (n - 3)) / 2}\\)</p>` });
  });
  serija("visja-enacba", 3, (r) => {
    const n = r.int(5, 12);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: n, besedilo: `Reši enačbo \\(\\binom{n}{2} = ${C(n, 2)}\\) (\\(n \\in \\mathbb{N}\\)).`, rezultat: `\\(n = ${n}\\)`, postopek: `<p>\\(\\frac{n(n - 1)}{2} = ${C(n, 2)}\\), \\(n^2 - n - ${2 * C(n, 2)} = 0\\).</p><p>\\(n = \\frac{1 + \\sqrt{1 + ${8 * C(n, 2)}}}{2} = \\frac{1 + ${2 * n - 1}}{2} = ${n}\\)</p>` });
  });
  serija("visja-pot", 3, (r) => {
    const a = r.int(2, 6), b = r.int(2, 6);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: C(a + b, a), besedilo: `Po mreži ulic se iz točke \\((0, 0)\\) v točko \\((${a}, ${b})\\) premikamo samo desno ali gor za eno enoto. Koliko je najkrajših poti?`, rezultat: `${C(a + b, a)}`, postopek: `<p>Vsaka pot je zaporedje ${a} premikov D in ${b} premikov G. Izberemo, kateri izmed ${a + b} korakov so D: \\(\\binom{${a + b}}{${a}} = ${C(a + b, a)}\\).</p>` });
  });
  serija("visja-razdelitev", 3, (r) => {
    const n = r.int(4, 10), k = r.int(2, 4);
    // n enakih kroglic v k škatel: C(n+k-1, k-1)
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: C(n + k - 1, k - 1), besedilo: `Na koliko načinov lahko ${n} enakih bonbonov razdelimo med ${k} otroke (nekateri lahko ne dobijo nič)?`, rezultat: `${C(n + k - 1, k - 1)}`, postopek: `<p>Metoda »zvezdic in pregrad«: ${n} bonbonov in ${k - 1} pregrad, izberemo mesta pregrad: \\(\\binom{${n + k - 1}}{${k - 1}} = ${C(n + k - 1, k - 1)}\\).</p>` });
  });
}
