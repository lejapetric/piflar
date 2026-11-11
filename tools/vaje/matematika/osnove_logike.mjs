import { izbira, stevilo } from "../lib.mjs";

// Izjavni izrazi: [op, levo, desno] ali ime spremenljivke
const OP = { "¬": "\\neg", "∧": "\\land", "∨": "\\lor", "⇒": "\\Rightarrow", "⇔": "\\Leftrightarrow" };
const IME = { "∧": "konjunkcija", "∨": "disjunkcija", "⇒": "implikacija", "⇔": "ekvivalenca" };
function vr(f, v) {
  if (typeof f === "string") return v[f];
  const [op, a, b] = f;
  if (op === "¬") return !vr(a, v);
  const x = vr(a, v), y = vr(b, v);
  return op === "∧" ? x && y : op === "∨" ? x || y : op === "⇒" ? !x || y : x === y;
}
function tex(f, zun = true) {
  if (typeof f === "string") return f;
  const [op, a, b] = f;
  if (op === "¬") return `\\neg ${typeof a === "string" ? a : `(${tex(a, false)})`}`;
  const s = `${tex(a, false)} ${OP[op]} ${tex(b, false)}`;
  return zun ? s : `(${s})`;
}
const spremenljivke = (f, s = new Set()) => (typeof f === "string" ? s.add(f) : (f.slice(1).forEach((g) => spremenljivke(g, s)), s));
function vrednosti(imena) {
  const n = imena.length, out = [];
  for (let i = 0; i < 2 ** n; i++) out.push(Object.fromEntries(imena.map((x, j) => [x, Boolean((i >> (n - 1 - j)) & 1)])));
  return out;
}
const tavtologija = (f) => vrednosti([...spremenljivke(f)].sort()).every((v) => vr(f, v));
const enakovredni = (f, g) => vrednosti([...new Set([...spremenljivke(f), ...spremenljivke(g)])].sort()).every((v) => vr(f, v) === vr(g, v));
const V = (b) => (b ? "pravilna (1)" : "nepravilna (0)");
const vrStr = (v) => Object.entries(v).map(([k, b]) => `\\(${k}\\) je ${b ? "pravilna" : "nepravilna"}`).join(", ");

function nakljucna(r, globina, imena) {
  if (globina === 0 || r() < 0.25) return r.izberi(imena);
  const op = r.izberi(["∧", "∨", "⇒", "⇔", "¬", "∧", "∨", "⇒"]);
  if (op === "¬") return ["¬", nakljucna(r, globina - 1, imena)];
  return [op, nakljucna(r, globina - 1, imena), nakljucna(r, globina - 1, imena)];
}

export default function ({ z, slug, serija }) {
  const d = (n) => z.dodaj(slug, n);

  // 1. Vrednost osnovne povezave
  serija("osnovne", 10, (r) => {
    const op = r.izberi(["∧", "∨", "⇒", "⇔"]);
    const v = { A: r() < 0.5, B: r() < 0.5 };
    const f = [op, "A", "B"];
    const res = vr(f, v);
    return izbira({
      tezavnost: 1, r,
      besedilo: `Izjava \\(A\\) je ${v.A ? "pravilna" : "nepravilna"}, izjava \\(B\\) pa ${v.B ? "pravilna" : "nepravilna"}. Kakšna je ${IME[op]} \\(${tex(f)}\\)?`,
      pravilna: V(res), napacne: [V(!res)],
      postopek: `<p>${{
        "∧": "Konjunkcija je pravilna samo, ko sta pravilni obe izjavi.",
        "∨": "Disjunkcija je nepravilna samo, ko sta obe izjavi nepravilni.",
        "⇒": "Implikacija je nepravilna samo, ko je predpostavka \\(A\\) pravilna in posledica \\(B\\) nepravilna.",
        "⇔": "Ekvivalenca je pravilna, ko imata izjavi enako vrednost.",
      }[op]}</p><p>Pri \\(A = ${+v.A}\\), \\(B = ${+v.B}\\) je \\(${tex(f)} = ${+res}\\).</p>`,
    });
  });

  // 2. Število vrstic pravilnostne tabele
  for (const n of [2, 3, 4, 5]) {
    d(stevilo({
      tezavnost: 1, vrednost: 2 ** n,
      besedilo: `Koliko vrstic (brez glave) ima pravilnostna tabela izjave, v kateri nastopa ${n} različnih enostavnih izjav?`,
      rezultat: `\\(2^{${n}} = ${2 ** n}\\)`,
      postopek: `<p>Vsaka enostavna izjava ima 2 možni vrednosti, zato je vseh kombinacij \\(2 \\cdot 2 \\cdots 2 = 2^{${n}} = ${2 ** n}\\).</p>`,
    }));
  }

  // 3. Ali je poved izjava
  const povedi = [
    ["Ljubljana je glavno mesto Slovenije.", true, "Poved je trditev, ki je pravilna."],
    ["Število 15 je praštevilo.", true, "Je trditev (nepravilna, ker je 15 = 3 · 5), torej je izjava."],
    ["Zapri vrata!", false, "Ukaz ni ne pravilen ne nepraviln, zato ni izjava."],
    ["Ali je danes ponedeljek?", false, "Vprašanje ni izjava, ker mu ne moremo pripisati logične vrednosti."],
    ["\\(x + 3 = 7\\)", false, "To je izjavna forma: vrednost je odvisna od \\(x\\), zato sama zase ni izjava."],
    ["\\(2 + 3 = 7\\)", true, "Je trditev (nepravilna), torej je izjava."],
    ["Matematika je lepa.", false, "Mnenje: ni objektivno pravilno ali nepravilno, zato ni izjava."],
    ["Vsako sodo število je deljivo z 2.", true, "Trditev s kvantifikatorjem, ki je pravilna, je izjava."],
    ["Obstaja realno število, katerega kvadrat je negativen.", true, "Trditev je nepravilna, a je izjava."],
    ["Naj bo \\(n\\) naravno število.", false, "Dogovor (oznaka) ni trditev, zato ni izjava."],
  ];
  serija("izjava", povedi.length, (r, i) => {
    const [p, je, razlaga] = povedi[i];
    return izbira({ tezavnost: 1, r, besedilo: `Ali je naslednja poved izjava? <em>${p}</em>`, pravilna: je ? "Da, je izjava." : "Ne, ni izjava.", napacne: [je ? "Ne, ni izjava." : "Da, je izjava."], postopek: `<p>Izjava je poved, ki je bodisi pravilna bodisi nepravilna. ${razlaga}</p>` });
  });

  // 4. Izjave o številih
  const lastnosti = [
    [(n) => n % 2 === 0, (n) => `\\(${n}\\) je sodo število`],
    [(n) => { for (let k = 2; k * k <= n; k++) if (n % k === 0) return false; return n > 1; }, (n) => `\\(${n}\\) je praštevilo`],
    [(n) => n % 3 === 0, (n) => `\\(${n}\\) je deljivo s 3`],
    [(n) => Number.isInteger(Math.sqrt(n)), (n) => `\\(${n}\\) je popoln kvadrat`],
  ];
  serija("stevila", 8, (r) => {
    const [p1, i1] = r.izberi(lastnosti), [p2, i2] = r.izberi(lastnosti);
    const a = r.int(2, 50), b = r.int(2, 50);
    const op = r.izberi(["∧", "∨", "⇒"]);
    const x = p1(a), y = p2(b);
    const res = vr([op, "A", "B"], { A: x, B: y });
    const vez = { "∧": "in", "∨": "ali", "⇒": "potem" }[op];
    const stavek = op === "⇒" ? `Če ${i1(a)}, potem ${i2(b)}.` : `${i1(a)[0].toUpperCase()}${i1(a).slice(1)} ${vez} ${i2(b)}.`;
    return izbira({ tezavnost: 2, r, besedilo: `Določi logično vrednost izjave: <em>${stavek}</em>`, pravilna: V(res), napacne: [V(!res)], postopek: `<p>Prva izjava je ${x ? "pravilna" : "nepravilna"}, druga je ${y ? "pravilna" : "nepravilna"}.</p><p>${IME[op][0].toUpperCase() + IME[op].slice(1)} \\(${+x} ${OP[op]} ${+y}\\) je ${res ? "pravilna" : "nepravilna"}.</p>` });
  });

  // 5. Vrednost sestavljene izjave s tremi spremenljivkami
  serija("sestavljena", 10, (r, i) => {
    const f = nakljucna(r, i < 5 ? 2 : 3, ["A", "B", "C"]);
    if (typeof f === "string" || spremenljivke(f).size < 2) return null;
    const v = { A: r() < 0.5, B: r() < 0.5, C: r() < 0.5 };
    const imena = [...spremenljivke(f)].sort();
    const vv = Object.fromEntries(imena.map((k) => [k, v[k]]));
    const res = vr(f, vv);
    return izbira({ tezavnost: i < 5 ? 2 : 3, r, besedilo: `Naj bo ${vrStr(vv)}. Kakšna je vrednost izjave \\(${tex(f)}\\)?`, pravilna: V(res), napacne: [V(!res)], postopek: `<p>Vstavimo vrednosti (${imena.map((k) => `\\(${k} = ${+vv[k]}\\)`).join(", ")}) in računamo od notranjih oklepajev navzven. Negacija ima prednost, nato konjunkcija in disjunkcija, nato implikacija in ekvivalenca.</p><p>Vrednost izjave je \\(${+res}\\).</p>` });
  });

  // 6. Negacija sestavljene izjave
  const neg = [
    [["∧", "A", "B"], "\\neg A \\lor \\neg B", ["\\neg A \\land \\neg B", "A \\lor B", "\\neg A \\land B"], "De Morganov zakon: negacija konjunkcije je disjunkcija negacij."],
    [["∨", "A", "B"], "\\neg A \\land \\neg B", ["\\neg A \\lor \\neg B", "A \\land B", "\\neg A \\lor B"], "De Morganov zakon: negacija disjunkcije je konjunkcija negacij."],
    [["⇒", "A", "B"], "A \\land \\neg B", ["\\neg A \\Rightarrow \\neg B", "B \\Rightarrow A", "\\neg A \\land B"], "Implikacija je nepravilna samo, ko je \\(A\\) pravilna in \\(B\\) nepravilna, zato \\(\\neg(A \\Rightarrow B) \\sim A \\land \\neg B\\)."],
    [["⇔", "A", "B"], "A \\Leftrightarrow \\neg B", ["\\neg A \\Leftrightarrow \\neg B", "A \\land \\neg B", "\\neg A \\lor B"], "Ekvivalenca je nepravilna, ko imata izjavi različni vrednosti, kar je isto kot \\(A \\Leftrightarrow \\neg B\\)."],
    [["∧", "A", ["¬", "B"]], "\\neg A \\lor B", ["\\neg A \\land B", "A \\lor \\neg B", "A \\Rightarrow \\neg B"], "De Morgan: \\(\\neg(A \\land \\neg B) \\sim \\neg A \\lor \\neg\\neg B \\sim \\neg A \\lor B\\)."],
    [["∨", ["¬", "A"], "B"], "A \\land \\neg B", ["\\neg A \\land B", "A \\lor \\neg B", "\\neg A \\land \\neg B"], "De Morgan: \\(\\neg(\\neg A \\lor B) \\sim \\neg\\neg A \\land \\neg B \\sim A \\land \\neg B\\)."],
  ];
  serija("negacija", neg.length, (r, i) => {
    const [f, p, n, razlaga] = neg[i];
    return izbira({ tezavnost: 2, r, besedilo: `Katera izjava je enakovredna negaciji \\(\\neg(${tex(f)})\\)?`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>${razlaga}</p>` });
  });

  // 7. Kvantifikatorji
  const kvant = [
    ["\\forall x \\in \\mathbb{N}: x^2 \\ge x", true, "Za vsako naravno število \\(x \\ge 1\\) je \\(x^2 = x \\cdot x \\ge x\\)."],
    ["\\forall x \\in \\mathbb{R}: x^2 > 0", false, "Protiprimer: \\(x = 0\\), saj \\(0^2 = 0\\)."],
    ["\\exists x \\in \\mathbb{Z}: x^2 = 2", false, "Kvadrati celih števil so 0, 1, 4, 9 …, 2 med njimi ni."],
    ["\\exists x \\in \\mathbb{R}: x^2 = 2", true, "\\(x = \\sqrt{2}\\) je realno število."],
    ["\\forall x \\in \\mathbb{R}: |x| \\ge x", true, "Če je \\(x \\ge 0\\), je \\(|x| = x\\), sicer je \\(|x| > 0 > x\\)."],
    ["\\exists n \\in \\mathbb{N}: n + 1 < n", false, "Za vsako število je \\(n + 1 > n\\)."],
    ["\\forall n \\in \\mathbb{N}: 2n \\text{ je sodo}", true, "\\(2n\\) je po definiciji večkratnik števila 2."],
    ["\\forall x \\in \\mathbb{R}: \\frac{1}{x} < x", false, "Protiprimer: \\(x = \\tfrac12\\) da \\(2 < \\tfrac12\\), kar ne drži (pri \\(x = 0\\) izraz niti ni definiran)."],
  ];
  serija("kvantifikatorji", kvant.length, (r, i) => {
    const [f, je, razlaga] = kvant[i];
    return izbira({ tezavnost: 2, r, besedilo: `Ali je izjava \\(${f}\\) pravilna?`, pravilna: je ? "Da, je pravilna." : "Ne, je nepravilna.", napacne: [je ? "Ne, je nepravilna." : "Da, je pravilna."], postopek: `<p>${razlaga}</p>` });
  });
  const negKv = [
    ["\\forall x \\in \\mathbb{R}: x^2 \\ge 0", "\\exists x \\in \\mathbb{R}: x^2 < 0", ["\\forall x \\in \\mathbb{R}: x^2 < 0", "\\exists x \\in \\mathbb{R}: x^2 \\ge 0", "\\forall x \\in \\mathbb{R}: x^2 \\le 0"]],
    ["\\exists n \\in \\mathbb{N}: n > 100", "\\forall n \\in \\mathbb{N}: n \\le 100", ["\\forall n \\in \\mathbb{N}: n > 100", "\\exists n \\in \\mathbb{N}: n \\le 100", "\\exists n \\in \\mathbb{N}: n < 100"]],
    ["\\forall x \\in \\mathbb{Z}: x \\text{ je sodo}", "\\exists x \\in \\mathbb{Z}: x \\text{ je liho}", ["\\forall x \\in \\mathbb{Z}: x \\text{ je liho}", "\\exists x \\in \\mathbb{Z}: x \\text{ je sodo}", "\\neg \\exists x \\in \\mathbb{Z}: x \\text{ je sodo}"]],
    ["\\exists x \\in \\mathbb{R}: x + 1 = x", "\\forall x \\in \\mathbb{R}: x + 1 \\ne x", ["\\exists x \\in \\mathbb{R}: x + 1 \\ne x", "\\forall x \\in \\mathbb{R}: x + 1 = x", "\\forall x \\in \\mathbb{R}: x + 1 < x"]],
  ];
  serija("negacija-kvantifikatorja", negKv.length, (r, i) => {
    const [f, p, n] = negKv[i];
    return izbira({ tezavnost: 2, r, besedilo: `Katera izjava je negacija izjave \\(${f}\\)?`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>Pri negaciji zamenjamo \\(\\forall\\) z \\(\\exists\\) (in obratno) ter negiramo trditev za dvopičjem.</p><p>Negacija: \\(${p}\\).</p>` });
  });

  // 8. Sklepanje nazaj
  const nazaj = [
    ["Implikacija \\(A \\Rightarrow B\\) je nepravilna. Kakšna je izjava \\(A\\)?", "pravilna", ["nepravilna", "ne moremo vedeti"], "Implikacija je nepravilna samo v primeru \\(A = 1\\), \\(B = 0\\)."],
    ["Implikacija \\(A \\Rightarrow B\\) je nepravilna. Kakšna je izjava \\(B\\)?", "nepravilna", ["pravilna", "ne moremo vedeti"], "Implikacija je nepravilna samo v primeru \\(A = 1\\), \\(B = 0\\)."],
    ["Disjunkcija \\(A \\lor B\\) je nepravilna. Kakšna je izjava \\(A\\)?", "nepravilna", ["pravilna", "ne moremo vedeti"], "Disjunkcija je nepravilna samo, ko sta obe izjavi nepravilni."],
    ["Konjunkcija \\(A \\land B\\) je pravilna. Kakšna je izjava \\(\\neg B\\)?", "nepravilna", ["pravilna", "ne moremo vedeti"], "Konjunkcija je pravilna samo, ko sta obe izjavi pravilni, torej \\(B = 1\\) in \\(\\neg B = 0\\)."],
    ["Izjava \\(A \\Rightarrow B\\) je pravilna in \\(A\\) je pravilna. Kakšna je \\(B\\)?", "pravilna", ["nepravilna", "ne moremo vedeti"], "Če bi bila \\(B\\) nepravilna, bi bila implikacija nepravilna. Torej \\(B = 1\\) (sklep modus ponens)."],
    ["Izjava \\(A \\Rightarrow B\\) je pravilna in \\(B\\) je pravilna. Kakšna je \\(A\\)?", "ne moremo vedeti", ["pravilna", "nepravilna"], "Pri \\(B = 1\\) je implikacija pravilna ne glede na \\(A\\), zato \\(A\\) ne moremo določiti."],
    ["Izjava \\((A \\land B) \\Rightarrow C\\) je nepravilna. Kakšna je \\(C\\)?", "nepravilna", ["pravilna", "ne moremo vedeti"], "Implikacija je nepravilna, ko je predpostavka \\(A \\land B\\) pravilna in posledica \\(C\\) nepravilna."],
    ["Izjava \\(A \\lor (B \\Rightarrow C)\\) je nepravilna. Kakšna je \\(B\\)?", "pravilna", ["nepravilna", "ne moremo vedeti"], "Disjunkcija je nepravilna, ko sta \\(A = 0\\) in \\(B \\Rightarrow C = 0\\). Zadnje velja samo pri \\(B = 1\\), \\(C = 0\\)."],
  ];
  serija("nazaj", nazaj.length, (r, i) => {
    const [b, p, n, razlaga] = nazaj[i];
    return izbira({ tezavnost: i < 4 ? 2 : 3, r, besedilo: b, pravilna: p, napacne: n, postopek: `<p>${razlaga}</p>` });
  });

  // 9. Ali je izjava tavtologija
  serija("tavtologija", 10, (r, i) => {
    const vzorci = [
      ["∨", "A", ["¬", "A"]], ["⇒", ["∧", "A", "B"], "A"], ["⇒", "A", ["∨", "A", "B"]], ["⇒", ["∧", "A", ["⇒", "A", "B"]], "B"],
      ["⇔", ["¬", ["∧", "A", "B"]], ["∨", ["¬", "A"], ["¬", "B"]]], ["⇔", ["⇒", "A", "B"], ["⇒", ["¬", "B"], ["¬", "A"]]],
    ];
    const f = i < vzorci.length && r() < 0.6 ? vzorci[i] : nakljucna(r, 2 + (i % 2), ["A", "B"]);
    if (typeof f === "string" || spremenljivke(f).size < 2) return null;
    const je = tavtologija(f);
    const protiprimer = je ? null : vrednosti([...spremenljivke(f)].sort()).find((v) => !vr(f, v));
    return izbira({ tezavnost: 3, r, besedilo: `Ali je izjava \\(${tex(f)}\\) tavtologija?`, pravilna: je ? "Da" : "Ne", napacne: [je ? "Ne" : "Da"], postopek: je ? `<p>V pravilnostni tabeli za vse štiri kombinacije vrednosti \\(A\\) in \\(B\\) dobimo vrednost 1, zato je izjava tavtologija.</p>` : `<p>Tavtologija mora biti pravilna pri vseh vrednostih. Protiprimer: ${vrStr(protiprimer)}; takrat je izjava nepravilna.</p>` });
  });

  // 10. Enakovrednost
  const pari = [
    [["⇒", "A", "B"], ["∨", ["¬", "A"], "B"]], [["⇒", "A", "B"], ["⇒", "B", "A"]], [["⇒", "A", "B"], ["⇒", ["¬", "B"], ["¬", "A"]]],
    [["⇒", "A", "B"], ["⇒", ["¬", "A"], ["¬", "B"]]], [["¬", ["∨", "A", "B"]], ["∧", ["¬", "A"], ["¬", "B"]]], [["¬", ["∧", "A", "B"]], ["∧", ["¬", "A"], ["¬", "B"]]],
    [["∧", "A", ["∨", "B", "C"]], ["∨", ["∧", "A", "B"], ["∧", "A", "C"]]], [["∨", "A", ["∧", "B", "C"]], ["∧", ["∨", "A", "B"], "C"]],
    [["⇔", "A", "B"], ["∧", ["⇒", "A", "B"], ["⇒", "B", "A"]]], [["⇒", ["∧", "A", "B"], "C"], ["⇒", "A", ["⇒", "B", "C"]]],
  ];
  serija("enakovrednost", pari.length, (r, i) => {
    const [f, g] = pari[i];
    const je = enakovredni(f, g);
    return izbira({ tezavnost: i < 6 ? 3 : 4, raven: i >= 6 ? "visja" : "osnovna", r, besedilo: `Ali sta izjavi \\(${tex(f)}\\) in \\(${tex(g)}\\) enakovredni?`, pravilna: je ? "Da" : "Ne", napacne: [je ? "Ne" : "Da"], postopek: je ? "<p>Izjavi imata v pravilnostni tabeli v vseh vrsticah enaki vrednosti, zato sta enakovredni (njuna ekvivalenca je tavtologija).</p>" : `<p>Poiščemo vrstico, v kateri se vrednosti razlikujeta: ${vrStr(vrednosti([...new Set([...spremenljivke(f), ...spremenljivke(g)])].sort()).find((v) => vr(f, v) !== vr(g, v)))}. Tam je prva izjava ${vr(f, vrednosti([...new Set([...spremenljivke(f), ...spremenljivke(g)])].sort()).find((v) => vr(f, v) !== vr(g, v))) ? "pravilna" : "nepravilna"}, druga pa ne, zato nista enakovredni.</p>` });
  });

  // 11. Obrat in kontrapozicija
  const impl = [
    ["Če je število deljivo s 4, je sodo.", "Če število ni sodo, ni deljivo s 4.", "Če je število sodo, je deljivo s 4.", "Če število ni deljivo s 4, ni sodo."],
    ["Če dežuje, so ceste mokre.", "Če ceste niso mokre, ne dežuje.", "Če so ceste mokre, dežuje.", "Če ne dežuje, ceste niso mokre."],
    ["Če je trikotnik enakostraničen, je enakokrak.", "Če trikotnik ni enakokrak, ni enakostraničen.", "Če je trikotnik enakokrak, je enakostraničen.", "Če trikotnik ni enakostraničen, ni enakokrak."],
    ["Če je \\(x > 3\\), je \\(x^2 > 9\\).", "Če je \\(x^2 \\le 9\\), je \\(x \\le 3\\).", "Če je \\(x^2 > 9\\), je \\(x > 3\\).", "Če je \\(x \\le 3\\), je \\(x^2 \\le 9\\)."],
  ];
  for (const [kaj, t] of [["kontrapozicija", 3], ["obrat", 3]]) {
    serija(kaj, impl.length, (r, i) => {
      const [izj, kontra, obrat, nasp] = impl[i];
      const p = kaj === "kontrapozicija" ? kontra : obrat;
      return izbira({ tezavnost: t, r, besedilo: `Katera izjava je ${kaj === "kontrapozicija" ? "kontrapozicija" : "obrat"} izjave: <em>${izj}</em>`, pravilna: p, napacne: [kontra, obrat, nasp].filter((x) => x !== p), postopek: kaj === "kontrapozicija" ? "<p>Kontrapozicija izjave \\(A \\Rightarrow B\\) je \\(\\neg B \\Rightarrow \\neg A\\): zamenjamo vrstni red in obe izjavi negiramo. Je enakovredna prvotni izjavi.</p>" : "<p>Obrat izjave \\(A \\Rightarrow B\\) je \\(B \\Rightarrow A\\): samo zamenjamo predpostavko in posledico. Obrat ni nujno enakovreden prvotni izjavi.</p>" });
    });
  }

  // 12. Poenostavi izjavo (višja raven)
  const poenostavi = [
    [["∨", ["∧", "A", "B"], ["∧", "A", ["¬", "B"]]], "A", ["B", "A \\land B", "1"]],
    [["∧", ["∨", "A", "B"], ["∨", "A", ["¬", "B"]]], "A", ["B", "A \\lor B", "0"]],
    [["∨", "A", ["∧", "A", "B"]], "A", ["B", "A \\land B", "A \\lor B"]],
    [["∧", "A", ["∨", ["¬", "A"], "B"]], "A \\land B", ["A", "B", "A \\lor B"]],
    [["¬", ["⇒", "A", ["¬", "B"]]], "A \\land B", ["\\neg A \\lor B", "A \\lor \\neg B", "\\neg A \\land \\neg B"]],
    [["∨", ["¬", ["∨", "A", "B"]], "A"], "A \\lor \\neg B", ["\\neg A", "A \\land \\neg B", "\\neg B"]],
  ];
  serija("poenostavi", poenostavi.length, (r, i) => {
    const [f, p, n] = poenostavi[i];
    return izbira({ tezavnost: 4, raven: "visja", r, besedilo: `Poenostavi izjavo \\(${tex(f)}\\). Kateri izraz ji je enakovreden?`, pravilna: `\\(${p}\\)`, napacne: n.map((x) => `\\(${x}\\)`), postopek: `<p>Uporabimo zakone logike (distributivnost, absorpcija, De Morganova zakona, \\(A \\lor \\neg A \\sim 1\\), \\(A \\land \\neg A \\sim 0\\)) ali preverimo s pravilnostno tabelo: izraz ima v vseh vrsticah enako vrednost kot \\(${p}\\).</p>` });
  });
}
