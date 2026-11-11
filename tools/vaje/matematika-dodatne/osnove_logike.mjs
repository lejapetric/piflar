const x = String.raw;
export default [
  { t: 4, b: x`Za koliko od \(32\) naborov vrednosti izjav \(A, B, C, D, E\) je izjava \((A \Rightarrow B) \land (B \Rightarrow C) \land (C \Rightarrow D) \land (D \Rightarrow E)\) pravilna?`, v: 6,
    rez: x`\(6\)`, post: x`<p>Konjunkcija je pravilna, ko so pravilne vse štiri implikacije. Implikacija je nepravilna le, ko je levo 1 in desno 0, zato se v zaporedju \(A, B, C, D, E\) nikjer ne sme zgoditi, da 1 sledi 0.</p><p>Vrednosti so torej najprej same ničle in nato same enice: 00000, 00001, 00011, 00111, 01111, 11111. To je \(6\) naborov.</p>` },
  { t: 4, b: x`Za koliko od \(16\) naborov vrednosti izjav \(A, B, C, D\) je izjava \((A \lor B) \Rightarrow (C \land D)\) pravilna?`, v: 7,
    rez: x`\(7\)`, post: x`<p>Implikacija je nepravilna, ko je \(A \lor B\) pravilna in \(C \land D\) nepravilna.</p><p>\(A \lor B\) je pravilna v 3 od 4 primerov, \(C \land D\) nepravilna v 3 od 4 primerov, zato je nepravilnih vrstic \(3 \cdot 3 = 9\).</p><p>Pravilnih je \(16 - 9 = 7\).</p>` },
  { t: 4, b: x`Za koliko od \(8\) naborov vrednosti izjav \(A, B, C\) je izjava \(\big((A \Rightarrow B) \Rightarrow C\big) \Rightarrow A\) pravilna?`, v: 6,
    rez: x`\(6\)`, post: x`<p>Zunanja implikacija je nepravilna le, ko je \(A = 0\) in \((A \Rightarrow B) \Rightarrow C\) pravilna.</p><p>Pri \(A = 0\) je \(A \Rightarrow B = 1\), zato je \((A \Rightarrow B) \Rightarrow C\) pravilna natanko pri \(C = 1\). To sta dva nabora (\(B\) je poljuben): \(A = 0, C = 1\).</p><p>Pravilnih je \(8 - 2 = 6\).</p>` },
  { t: 4, b: x`Katera izjava je negacija izjave \(\forall x\, \exists y : \big(P(x, y) \Rightarrow Q(y)\big)\)?`,
    p: x`\(\exists x\, \forall y : \big(P(x, y) \land \lnot Q(y)\big)\)`, n: [x`\(\exists x\, \forall y : \big(\lnot P(x, y) \Rightarrow \lnot Q(y)\big)\)`, x`\(\forall x\, \exists y : \big(P(x, y) \land \lnot Q(y)\big)\)`, x`\(\exists x\, \exists y : \big(\lnot P(x, y) \lor Q(y)\big)\)`],
    post: x`<p>Negacija zamenja kvantifikatorja: \(\lnot \forall x\, \exists y \equiv \exists x\, \forall y\, \lnot\).</p><p>Negacija implikacije: \(\lnot (P \Rightarrow Q) \equiv P \land \lnot Q\).</p>` },
  { t: 4, b: x`Katera izjava je enakovredna izjavi \(\lnot\big(A \Rightarrow (B \lor \lnot C)\big)\)?`,
    p: x`\(A \land \lnot B \land C\)`, n: [x`\(\lnot A \lor B \lor \lnot C\)`, x`\(A \land B \land \lnot C\)`, x`\(\lnot A \land \lnot B \land C\)`],
    post: x`<p>\(\lnot (X \Rightarrow Y) \equiv X \land \lnot Y\), zato dobimo \(A \land \lnot (B \lor \lnot C)\).</p><p>De Morgan: \(\lnot (B \lor \lnot C) \equiv \lnot B \land C\). Skupaj \(A \land \lnot B \land C\).</p>` },
];
