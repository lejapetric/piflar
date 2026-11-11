const x = String.raw;
export default [
  { t: 4, b: x`Koliko je petmestnih sodih števil z različnimi števkami?`, v: 13776,
    rez: x`\(13\,776\)`, post: x`<p>Zadnja števka \(0\): ostale štiri izbiramo iz 9 števk: \(9 \cdot 8 \cdot 7 \cdot 6 = 3024\).</p><p>Zadnja števka \(2, 4, 6\) ali \(8\): prva ne sme biti 0 niti zadnja (8 možnosti), nato \(8 \cdot 7 \cdot 6\): \(4 \cdot 8 \cdot 8 \cdot 7 \cdot 6 = 10\,752\).</p><p>Skupaj \(13\,776\).</p>` },
  { t: 4, b: x`Na koliko načinov lahko \(8\) oseb sede za okroglo mizo, če Ana in Bor ne smeta sedeti drug ob drugem? (Razporeditve, ki se razlikujejo le za vrtenje, štejemo za enake.)`, v: 3600,
    rez: x`\(3600\)`, post: x`<p>Vseh razporeditev okoli mize: \((8 - 1)! = 5040\).</p><p>Ana in Bor skupaj: ju zlepimo v en blok, \(6! \cdot 2 = 1440\).</p><p>\(5040 - 1440 = 3600\)</p>` },
  { t: 4, b: x`Koliko različnih besed (tudi nesmiselnih) dobimo s premetavanjem črk besede MATEMATIKA?`, v: 151200,
    rez: x`\(151\,200\)`, post: x`<p>10 črk: M dvakrat, A trikrat, T dvakrat, E, I, K po enkrat.</p><p>\(\frac{10!}{2!\,3!\,2!} = \frac{3\,628\,800}{24} = 151\,200\)</p>` },
  { t: 4, b: x`Iz \(6\) fantov in \(4\) deklet izberemo petčlanski odbor, v katerem sta vsaj dve dekleti. Na koliko načinov?`, v: 186,
    rez: x`\(186\)`, post: x`<p>Vseh odborov: \(\binom{10}{5} = 252\). Brez deklet: \(\binom65 = 6\). Z eno: \(4 \cdot \binom64 = 60\).</p><p>\(252 - 6 - 60 = 186\)</p>` },
  { t: 4, b: x`Koliko rešitev v naravnih številih (\(x, y, z \ge 1\)) ima enačba \(x + y + z = 10\)?`, v: 36,
    rez: x`\(36\)`, post: x`<p>Deset enic v vrsti razdelimo z dvema pregradama v \(9\) vrzeli med njimi: \(\binom92 = 36\).</p>` },
  { t: 4, raven: "visja", b: x`Določi koeficient pri \(x^4\) v razvoju \(\left(2x - \dfrac{1}{x}\right)^8\).`, v: 1792,
    rez: x`\(1792\)`, post: x`<p>Splošni člen: \(\binom8k (2x)^{8-k}\left(-\frac1x\right)^k = \binom8k 2^{8-k}(-1)^k x^{8-2k}\).</p><p>\(8 - 2k = 4\), \(k = 2\): \(\binom82 \cdot 2^6 = 28 \cdot 64 = 1792\)</p>` },
];
