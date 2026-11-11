import { izbira, stevilo, mnozica } from "../lib.mjs";

const zapis = (m) => (m.length ? `\\{${m.join(", ")}\\}` : "\\emptyset");
const nakljucnaMnozica = (r, n, od = 1, do_ = 12) => {
  const s = new Set();
  while (s.size < n) s.add(r.int(od, do_));
  return [...s].sort((a, b) => a - b);
};
const binom = (n, k) => { let x = 1; for (let i = 1; i <= k; i++) x = (x * (n - k + i)) / i; return Math.round(x); };

// interval kot [a, b), (−∞, b] …
const iv = (a, b, la, ra) => `${la ? "[" : "("}${a === -Infinity ? "-\\infty" : a}, ${b === Infinity ? "\\infty" : b}${ra ? "]" : ")"}`;

export default function ({ z, slug, serija }) {
  // 1. Operacije s končnimi množicami
  const ops = [
    ["\\cap", "presek", (A, B) => A.filter((x) => B.includes(x)), () => "elementi, ki so v obeh množicah"],
    ["\\cup", "unijo", (A, B) => [...new Set([...A, ...B])].sort((a, b) => a - b), () => "vsi elementi, ki so v vsaj eni od množic"],
    ["\\setminus", "razliko", (A, B) => A.filter((x) => !B.includes(x)), (x, y) => `elementi množice \\(${x}\\), ki niso v \\(${y}\\)`],
  ];
  serija("operacije", 15, (r, i) => {
    const [op, ime, f, opis] = ops[i % 3];
    const A = nakljucnaMnozica(r, r.int(4, 6)), B = nakljucnaMnozica(r, r.int(3, 6));
    const vB = i % 5 === 4;
    const R = vB ? f(B, A) : f(A, B);
    return mnozica({
      tezavnost: 1, elementi: R,
      besedilo: `Dani sta množici \\(A = ${zapis(A)}\\) in \\(B = ${zapis(B)}\\). Zapiši ${ime} \\(${vB ? `B ${op} A` : `A ${op} B`}\\).`,
      namig: "Elemente loči z vejico, npr. 2, 5, 7. Prazno množico zapiši kot {}.",
      rezultat: `\\(${vB ? `B ${op} A` : `A ${op} B`} = ${zapis(R)}\\)`,
      postopek: `<p>${ime[0].toUpperCase() + ime.slice(1)}: ${vB ? opis("B", "A") : opis("A", "B")}.</p><p>\\(${vB ? `B ${op} A` : `A ${op} B`} = ${zapis(R)}\\)</p>`,
    });
  });

  // 2. Komplement v univerzalni množici
  serija("komplement", 6, (r) => {
    const n = r.int(8, 12);
    const U = Array.from({ length: n }, (_, i) => i + 1);
    const A = nakljucnaMnozica(r, r.int(3, 6), 1, n);
    const B = nakljucnaMnozica(r, r.int(3, 5), 1, n);
    const dvojni = r() < 0.5;
    const R = dvojni ? U.filter((x) => !(A.includes(x) || B.includes(x))) : U.filter((x) => !A.includes(x));
    return mnozica({
      tezavnost: dvojni ? 2 : 1, elementi: R,
      besedilo: `Univerzalna množica je \\(\\mathcal{U} = \\{1, 2, \\ldots, ${n}\\}\\), \\(A = ${zapis(A)}\\)${dvojni ? `, \\(B = ${zapis(B)}\\). Zapiši \\((A \\cup B)^c\\).` : `. Zapiši komplement \\(A^c\\).`}`,
      namig: "Elemente loči z vejico. Prazno množico zapiši kot {}.",
      rezultat: `\\(${dvojni ? "(A \\cup B)^c" : "A^c"} = ${zapis(R)}\\)`,
      postopek: dvojni ? `<p>Najprej \\(A \\cup B = ${zapis([...new Set([...A, ...B])].sort((a, b) => a - b))}\\).</p><p>Komplement so elementi iz \\(\\mathcal{U}\\), ki jih v uniji ni: \\(${zapis(R)}\\).</p>` : `<p>Komplement vsebuje elemente univerzalne množice, ki niso v \\(A\\): \\(${zapis(R)}\\).</p>`,
    });
  });

  // 3. Pripadnost in podmnožica
  const trditve = [
    ["3 \\in \\{1, 2, 3\\}", true, "3 je element množice."],
    ["\\{3\\} \\in \\{1, 2, 3\\}", false, "Elementi so števila 1, 2, 3, ne množica \\(\\{3\\}\\). Pravilno je \\(\\{3\\} \\subseteq \\{1, 2, 3\\}\\)."],
    ["\\{3\\} \\subseteq \\{1, 2, 3\\}", true, "Vsak element množice \\(\\{3\\}\\) je v \\(\\{1, 2, 3\\}\\)."],
    ["\\emptyset \\subseteq \\{1, 2\\}", true, "Prazna množica je podmnožica vsake množice."],
    ["\\emptyset \\in \\{1, 2\\}", false, "Prazna množica ni element množice \\(\\{1, 2\\}\\), je pa njena podmnožica."],
    ["\\{1, 2\\} \\subset \\{1, 2\\}", false, "Prava podmnožica mora imeti manj elementov; množica ni prava podmnožica same sebe."],
    ["\\{1\\} \\in \\{\\{1\\}, 2\\}", true, "Množica \\(\\{1\\}\\) je eden od dveh elementov."],
    ["\\mathbb{N} \\subseteq \\mathbb{Z}", true, "Vsako naravno število je celo."],
    ["-2 \\in \\mathbb{N}", false, "Naravna števila so 1, 2, 3 …"],
    ["\\{2, 4\\} \\subseteq \\{x \\in \\mathbb{N}; x \\text{ je sodo}\\}", true, "Oba elementa sta soda naravna števila."],
  ];
  serija("pripadnost", trditve.length, (r, i) => {
    const [t, je, razlaga] = trditve[i];
    return izbira({ tezavnost: i < 5 ? 1 : 2, r, besedilo: `Ali je trditev \\(${t}\\) pravilna?`, pravilna: je ? "Da" : "Ne", napacne: [je ? "Ne" : "Da"], postopek: `<p>${razlaga}</p>` });
  });

  // 4. Moči: unija, potenčna množica, kartezični produkt
  serija("moc-unije", 6, (r) => {
    const mA = r.int(8, 30), mB = r.int(6, 25), mP = r.int(1, Math.min(mA, mB) - 1);
    const kaj = r.int(0, 2);
    if (kaj === 0) return stevilo({ tezavnost: 1, vrednost: mA + mB - mP, besedilo: `Velja \\(m(A) = ${mA}\\), \\(m(B) = ${mB}\\) in \\(m(A \\cap B) = ${mP}\\). Izračunaj \\(m(A \\cup B)\\).`, rezultat: `\\(m(A \\cup B) = ${mA + mB - mP}\\)`, postopek: `<p>\\(m(A \\cup B) = m(A) + m(B) - m(A \\cap B) = ${mA} + ${mB} - ${mP} = ${mA + mB - mP}\\)</p>` });
    if (kaj === 1) return stevilo({ tezavnost: 2, vrednost: mP, besedilo: `Velja \\(m(A) = ${mA}\\), \\(m(B) = ${mB}\\) in \\(m(A \\cup B) = ${mA + mB - mP}\\). Izračunaj \\(m(A \\cap B)\\).`, rezultat: `\\(m(A \\cap B) = ${mP}\\)`, postopek: `<p>Iz \\(m(A \\cup B) = m(A) + m(B) - m(A \\cap B)\\) sledi \\(m(A \\cap B) = ${mA} + ${mB} - ${mA + mB - mP} = ${mP}\\).</p>` });
    return stevilo({ tezavnost: 2, vrednost: mA - mP, besedilo: `Velja \\(m(A) = ${mA}\\), \\(m(B) = ${mB}\\) in \\(m(A \\cup B) = ${mA + mB - mP}\\). Izračunaj \\(m(A \\setminus B)\\).`, rezultat: `\\(m(A \\setminus B) = ${mA - mP}\\)`, postopek: `<p>\\(m(A \\cap B) = ${mA} + ${mB} - ${mA + mB - mP} = ${mP}\\).</p><p>\\(m(A \\setminus B) = m(A) - m(A \\cap B) = ${mA} - ${mP} = ${mA - mP}\\).</p>` });
  });
  serija("potencna", 5, (r) => {
    const n = r.int(2, 7);
    return stevilo({ tezavnost: 1, vrednost: 2 ** n, besedilo: `Množica \\(A\\) ima ${n} elementov. Koliko elementov ima potenčna množica \\(\\mathcal{P}(A)\\)?`, rezultat: `\\(2^{${n}} = ${2 ** n}\\)`, postopek: `<p>Potenčna množica vsebuje vse podmnožice, tudi \\(\\emptyset\\) in \\(A\\). Za vsak element se odločimo, ali je v podmnožici ali ne: \\(2^{${n}} = ${2 ** n}\\).</p>` });
  });
  serija("kartezicni", 5, (r) => {
    const a = r.int(2, 6), b = r.int(2, 7);
    return stevilo({ tezavnost: 1, vrednost: a * b, besedilo: `Množica \\(A\\) ima ${a} elementov, množica \\(B\\) pa ${b}. Koliko urejenih parov vsebuje \\(A \\times B\\)?`, rezultat: `\\(m(A \\times B) = ${a * b}\\)`, postopek: `<p>\\(m(A \\times B) = m(A) \\cdot m(B) = ${a} \\cdot ${b} = ${a * b}\\)</p>` });
  });
  serija("podmnozice-pogoj", 6, (r, i) => {
    const n = r.int(4, 8);
    if (i % 3 === 0) return stevilo({ tezavnost: 3, vrednost: 2 ** (n - 1), besedilo: `Koliko podmnožic množice \\(\\{1, 2, \\ldots, ${n}\\}\\) vsebuje število 1?`, rezultat: `\\(2^{${n - 1}} = ${2 ** (n - 1)}\\)`, postopek: `<p>Element 1 je zagotovo v podmnožici, o ostalih ${n - 1} elementih se odločamo prosto: \\(2^{${n - 1}} = ${2 ** (n - 1)}\\).</p>` });
    if (i % 3 === 1) { const k = r.int(2, n - 2); return stevilo({ tezavnost: 3, vrednost: binom(n, k), besedilo: `Koliko podmnožic z natanko ${k} elementi ima množica z ${n} elementi?`, rezultat: `\\(\\binom{${n}}{${k}} = ${binom(n, k)}\\)`, postopek: `<p>Izbiramo ${k} od ${n} elementov, vrstni red ni pomemben: \\(\\binom{${n}}{${k}} = ${binom(n, k)}\\).</p>` }); }
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: 2 ** n - 2 ** (n - 2), besedilo: `Koliko podmnožic množice \\(\\{1, 2, \\ldots, ${n}\\}\\) vsebuje vsaj enega od števil 1 in 2?`, rezultat: `\\(2^{${n}} - 2^{${n - 2}} = ${2 ** n - 2 ** (n - 2)}\\)`, postopek: `<p>Vseh podmnožic je \\(2^{${n}}\\). Odštejemo tiste, ki ne vsebujejo ne 1 ne 2: teh je \\(2^{${n - 2}}\\).</p><p>\\(2^{${n}} - 2^{${n - 2}} = ${2 ** n} - ${2 ** (n - 2)} = ${2 ** n - 2 ** (n - 2)}\\)</p>` });
  });

  // 5. Intervali
  serija("intervali", 8, (r, i) => {
    const a = r.int(-6, 0), b = r.int(1, 5), c = r.int(a + 1, b - 1 > a + 1 ? b - 1 : a + 1), d = r.int(b + 1, 9);
    if (!(a < c && c < b)) return null;
    const [la, ra, lc, rd] = [r() < 0.5, r() < 0.5, r() < 0.5, r() < 0.5];
    const presek = i % 2 === 0;
    // [a, b) in [c, d) z a < c < b < d
    const prav = presek ? iv(c, b, lc, ra) : iv(a, d, la, rd);
    const nap = presek ? [iv(c, b, !lc, ra), iv(c, b, lc, !ra), iv(a, d, la, rd)] : [iv(a, d, !la, rd), iv(c, b, lc, ra), iv(a, d, la, !rd)];
    return izbira({ tezavnost: 2, r, besedilo: `Dana sta intervala \\(A = ${iv(a, b, la, ra)}\\) in \\(B = ${iv(c, d, lc, rd)}\\). Koliko je \\(A ${presek ? "\\cap" : "\\cup"} B\\)?`, pravilna: `\\(${prav}\\)`, napacne: nap.map((x) => `\\(${x}\\)`), postopek: `<p>Intervala narišemo na številsko premico. ${presek ? "Presek je del, kjer se prekrivata: od večjega levega krajišča do manjšega desnega." : "Unija sega od manjšega levega do večjega desnega krajišča, ker se intervala prekrivata."} Pri krajiščih preverimo, ali pripadata (oglati oklepaj) ali ne (okrogli).</p><p>\\(A ${presek ? "\\cap" : "\\cup"} B = ${prav}\\)</p>` });
  });

  // 6. Anketa z dvema in tremi množicami
  serija("anketa2", 6, (r) => {
    const oba = r.int(3, 15), samoA = r.int(5, 25), samoB = r.int(5, 25), nobeno = r.int(0, 12);
    const vsi = oba + samoA + samoB + nobeno;
    const [sA, sB] = r.izberi([["košarko", "odbojko"], ["angleščino", "nemščino"], ["kavo", "čaj"], ["kino", "gledališče"]]);
    const vpr = r.int(0, 2);
    const dat = `V razredu je ${vsi} dijakov. ${samoA + oba} jih ima rado ${sA}, ${samoB + oba} ${sB}, ${nobeno} pa ne mara ne enega ne drugega.`;
    const presek = `<p>Narišemo Vennov diagram. Vseh, ki imajo rado vsaj eno, je \\(${vsi} - ${nobeno} = ${vsi - nobeno}\\). Tisti, ki imajo rado oboje: \\(${samoA + oba} + ${samoB + oba} - ${vsi - nobeno} = ${oba}\\).</p>`;
    if (vpr === 0) return stevilo({ tezavnost: 2, vrednost: oba, besedilo: `${dat} Koliko dijakov ima rado oboje?`, rezultat: `${oba}`, postopek: presek });
    if (vpr === 1) return stevilo({ tezavnost: 2, vrednost: samoA, besedilo: `${dat} Koliko dijakov ima rado samo ${sA}?`, rezultat: `${samoA}`, postopek: `${presek}<p>Samo ${sA}: \\(${samoA + oba} - ${oba} = ${samoA}\\).</p>` });
    return stevilo({ tezavnost: 3, vrednost: samoA + samoB, besedilo: `${dat} Koliko dijakov ima rado natanko eno od obeh?`, rezultat: `${samoA + samoB}`, postopek: `${presek}<p>Natanko eno: \\((${samoA + oba} - ${oba}) + (${samoB + oba} - ${oba}) = ${samoA + samoB}\\).</p>` });
  });
  serija("anketa3", 6, (r, i) => {
    const abc = r.int(1, 5), ab = r.int(1, 6), ac = r.int(1, 6), bc = r.int(1, 6), a = r.int(2, 10), b = r.int(2, 10), c = r.int(2, 10);
    const mA = a + ab + ac + abc, mB = b + ab + bc + abc, mC = c + ac + bc + abc;
    const unija = a + b + c + ab + ac + bc + abc;
    if (i % 2 === 0) return stevilo({ tezavnost: 3, vrednost: unija, besedilo: `Velja \\(m(A) = ${mA}\\), \\(m(B) = ${mB}\\), \\(m(C) = ${mC}\\), \\(m(A \\cap B) = ${ab + abc}\\), \\(m(A \\cap C) = ${ac + abc}\\), \\(m(B \\cap C) = ${bc + abc}\\) in \\(m(A \\cap B \\cap C) = ${abc}\\). Izračunaj \\(m(A \\cup B \\cup C)\\).`, rezultat: `${unija}`, postopek: `<p>\\(m(A \\cup B \\cup C) = m(A) + m(B) + m(C) - m(A \\cap B) - m(A \\cap C) - m(B \\cap C) + m(A \\cap B \\cap C)\\)</p><p>\\(= ${mA} + ${mB} + ${mC} - ${ab + abc} - ${ac + abc} - ${bc + abc} + ${abc} = ${unija}\\)</p>` });
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: a, besedilo: `Na šoli ${mA} dijakov obiskuje matematični krožek, ${mB} fizikalnega in ${mC} kemijskega. Matematičnega in fizikalnega obiskuje ${ab + abc}, matematičnega in kemijskega ${ac + abc}, fizikalnega in kemijskega ${bc + abc}, vse tri pa ${abc}. Koliko dijakov obiskuje samo matematični krožek?`, rezultat: `${a}`, postopek: `<p>V Vennov diagram vpisujemo od sredine navzven. V presek vseh treh: ${abc}.</p><p>Samo M in F: \\(${ab + abc} - ${abc} = ${ab}\\), samo M in K: \\(${ac + abc} - ${abc} = ${ac}\\).</p><p>Samo M: \\(${mA} - ${ab} - ${ac} - ${abc} = ${a}\\).</p>` });
  });

  // 7. Izrazi z množicami
  const izrazi = [
    ["(A \\cap B) \\cup (A \\cap B^c)", "A", ["B", "A \\cap B", "\\mathcal{U}"], "Distributivnost: \\((A \\cap B) \\cup (A \\cap B^c) = A \\cap (B \\cup B^c) = A \\cap \\mathcal{U} = A\\)."],
    ["(A \\cup B)^c", "A^c \\cap B^c", ["A^c \\cup B^c", "A \\cap B", "A^c \\cup B"], "De Morganov zakon: komplement unije je presek komplementov."],
    ["(A \\cap B)^c", "A^c \\cup B^c", ["A^c \\cap B^c", "A \\cup B", "A \\cap B^c"], "De Morganov zakon: komplement preseka je unija komplementov."],
    ["A \\setminus B", "A \\cap B^c", ["A \\cup B^c", "B \\cap A^c", "A^c \\cap B^c"], "Razlika vsebuje elemente iz \\(A\\), ki niso v \\(B\\), torej \\(A \\cap B^c\\)."],
    ["A \\cup (A \\cap B)", "A", ["B", "A \\cap B", "A \\cup B"], "Absorpcija: vsi elementi \\(A \\cap B\\) so že v \\(A\\)."],
    ["(A \\cup B) \\setminus (A \\cap B)", "(A \\setminus B) \\cup (B \\setminus A)", ["A \\cup B", "\\emptyset", "A \\setminus B"], "Ostanejo elementi, ki so v natanko eni od množic (simetrična razlika)."],
  ];
  serija("izrazi", izrazi.length, (r, i) => {
    const [f, p, n, razlaga] = izrazi[i];
    return izbira({ tezavnost: i < 4 ? 3 : 4, raven: i >= 4 ? "visja" : "osnovna", r, besedilo: `Kateri izraz je enak \\(${f}\\)?`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>${razlaga} Enakost lahko preveriš tudi z Vennovim diagramom.</p>` });
  });

  // 8. Zapis z opisom
  serija("opis", 6, (r) => {
    const n = r.int(10, 30), k = r.int(3, 7);
    const vrsta = r.int(0, 2);
    let R, opis;
    if (vrsta === 0) { R = Array.from({ length: Math.floor(n / k) }, (_, i) => (i + 1) * k); opis = `A = \\{x \\in \\mathbb{N}; x \\le ${n} \\text{ in } ${k} \\mid x\\}`; }
    else if (vrsta === 1) { R = []; for (let d = 1; d <= n; d++) if (n % d === 0) R.push(d); opis = `A = \\{x \\in \\mathbb{N}; x \\mid ${n}\\}`; }
    else { const m = r.int(3, 6); R = Array.from({ length: m }, (_, i) => (i + 1) ** 2); opis = `A = \\{x^2; x \\in \\mathbb{N}, x \\le ${m}\\}`; }
    return mnozica({ tezavnost: 2, elementi: R, besedilo: `Zapiši z naštevanjem elementov množico \\(${opis}\\).`, namig: "Elemente loči z vejico.", rezultat: `\\(A = ${zapis(R)}\\)`, postopek: `<p>${vrsta === 0 ? `Iščemo večkratnike števila ${k}, ki niso večji od ${n}.` : vrsta === 1 ? `Iščemo vse delitelje števila ${n}.` : "Kvadriramo naravna števila do danega."}</p><p>\\(A = ${zapis(R)}\\)</p>` });
  });
}
