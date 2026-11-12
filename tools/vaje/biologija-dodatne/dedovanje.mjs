const x = String.raw;
export default [
  { t: 4, b: x`Križamo dva dihibrida \(AaBb \times AaBb\) (geni niso vezani). Kolikšen delež potomcev je homozigotnih za oba gena? (Vpiši ulomek.)`, v: 0.25, tol: 1e-6, namig: "Ulomek vpiši kot 1/16.",
    rez: x`\(\frac{4}{16} = \frac14\)`, post: x`<p>Za vsak gen je verjetnost homozigota \(\frac12\) (AA ali aa). Za oba: \(\frac12 \cdot \frac12 = \frac14\)</p>` },
  { t: 4, b: x`Mati je prenašalka hemofilije, oče je zdrav. Kolikšna je verjetnost, da bo njun prvi otrok sin s hemofilijo? (Vpiši ulomek.)`, v: 0.25, tol: 1e-6, namig: "Ulomek vpiši kot 1/2.",
    rez: x`\(\frac14\)`, post: x`<p>\(X^HX^h \times X^HY\). Otroci: \(X^HX^H, X^HX^h, X^HY, X^hY\), vsak s \(\frac14\). Bolan sin: \(\frac14\) (med sinovi pa \(\frac12\)).</p>` },
];
