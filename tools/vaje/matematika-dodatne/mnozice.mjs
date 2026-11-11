const x = String.raw;
const sport = x`V razredu je \(30\) dijakov. Košarko jih trenira \(18\), nogomet \(15\), odbojko \(12\). Košarko in nogomet jih trenira \(8\), košarko in odbojko \(6\), nogomet in odbojko \(5\), vse tri športe pa \(2\).`;
export default [
  { t: 4, b: x`${sport} Koliko dijakov ne trenira nobenega od teh športov?`, v: 2,
    rez: x`\(2\)`, post: x`<p>Načelo vključitev in izključitev: \(m(K \cup N \cup O) = 18 + 15 + 12 - 8 - 6 - 5 + 2 = 28\).</p><p>Nobenega športa ne trenira \(30 - 28 = 2\) dijakov.</p>` },
  { t: 4, b: x`${sport} Koliko dijakov trenira natanko en šport?`, v: 13,
    rez: x`\(13\)`, post: x`<p>Vennov diagram izpolnjujemo od sredine navzven. V vseh treh je 2, samo K in N \(8 - 2 = 6\), samo K in O \(6 - 2 = 4\), samo N in O \(5 - 2 = 3\).</p><p>Samo košarka: \(18 - 6 - 4 - 2 = 6\), samo nogomet: \(15 - 6 - 3 - 2 = 4\), samo odbojka: \(12 - 4 - 3 - 2 = 3\).</p><p>Natanko en šport: \(6 + 4 + 3 = 13\).</p>` },
  { t: 4, b: x`Velja \(m(A) = 10\), \(m(B) = 12\) in \(m(A \cup B) = 17\). Koliko elementov ima simetrična razlika \((A \setminus B) \cup (B \setminus A)\)?`, v: 12,
    rez: x`\(12\)`, post: x`<p>\(m(A \cap B) = m(A) + m(B) - m(A \cup B) = 10 + 12 - 17 = 5\).</p><p>Simetrična razlika je unija brez preseka: \(17 - 5 = 12\).</p>` },
  { t: 4, b: x`Koliko podmnožic množice \(\{1, 2, 3, \ldots, 10\}\) vsebuje vsaj eno sodo število?`, v: 992,
    rez: x`\(992\)`, post: x`<p>Vseh podmnožic je \(2^{10} = 1024\).</p><p>Podmnožic brez sodih števil (samo iz \(\{1, 3, 5, 7, 9\}\)) je \(2^5 = 32\).</p><p>Vsaj eno sodo: \(1024 - 32 = 992\).</p>` },
  { t: 4, b: x`Koliko podmnožic množice \(\{1, 2, \ldots, 8\}\) vsebuje število \(1\), ne vsebuje pa števila \(2\)?`, v: 64,
    rez: x`\(64\)`, post: x`<p>O elementih \(1\) in \(2\) je že odločeno. Za vsakega od ostalih \(6\) elementov sta dve možnosti (je ali ga ni).</p><p>\(2^6 = 64\)</p>` },
  { t: 4, b: x`Naj bo \(A = \{x \in \mathbb{N} : x \mid 72\}\) in \(B = \{x \in \mathbb{N} : x \mid 60\}\). Koliko elementov ima \(A \cup B\)?`, v: 18,
    rez: x`\(18\)`, post: x`<p>\(72 = 2^3 \cdot 3^2\) ima \(4 \cdot 3 = 12\) deliteljev, \(60 = 2^2 \cdot 3 \cdot 5\) ima \(3 \cdot 2 \cdot 2 = 12\) deliteljev.</p><p>\(A \cap B\) so skupni delitelji, to so delitelji \(D(72, 60) = 12\): \(6\) jih je.</p><p>\(m(A \cup B) = 12 + 12 - 6 = 18\)</p>` },
  { t: 4, b: x`Naj bo \(m(A) = 2\). Koliko elementov ima potenčna množica potenčne množice, \(\mathcal{P}(\mathcal{P}(A))\)?`, v: 16,
    rez: x`\(16\)`, post: x`<p>\(m(\mathcal{P}(A)) = 2^2 = 4\), zato \(m(\mathcal{P}(\mathcal{P}(A))) = 2^4 = 16\).</p>` },
  { t: 4, b: x`Dani sta \(A = \{1, 2, 3\}\) in \(B = \{2, 3, 4, 5\}\). Koliko urejenih parov \((a, b) \in A \times B\) ima \(a < b\)?`, v: 9,
    rez: x`\(9\)`, post: x`<p>\(a = 1\): \(b \in \{2, 3, 4, 5\}\), 4 pari. \(a = 2\): \(b \in \{3, 4, 5\}\), 3 pari. \(a = 3\): \(b \in \{4, 5\}\), 2 para.</p><p>Skupaj \(4 + 3 + 2 = 9\).</p>` },
];
