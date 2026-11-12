const x = String.raw;
export default [
  { t: 4, b: x`V molekuli dvoverižne DNA je \(30\,\%\) adenina. Kolikšen je delež gvanina? (V odstotkih.)`, v: 20, enota: "%",
    rez: x`\(20\,\%\)`, post: x`<p>A = T = \(30\,\%\), skupaj \(60\,\%\). Ostane \(40\,\%\) za G in C, ki sta enaka: \(20\,\%\).</p>` },
  { t: 4, b: x`Zaporedje matrične verige DNA je \(3'\text{-TAC GGA CTT ATC-}5'\). Katero je zaporedje aminokislin? (AUG Met, CCU Pro, GAA Glu, UAG stop)`, p: "Met–Pro–Glu (nato stop)", n: ["Met–Pro–Glu–Ile", "Tyr–Gly–Leu", "Met–Glu–Pro"],
    post: x`<p>mRNA je komplementarna matrični verigi: \(5'\text{-AUG CCU GAA UAG-}3'\). Prevod: Met, Pro, Glu, stop.</p>` },
  { t: 4, b: x`Gen kodira beljakovino iz \(300\) aminokislin. Koliko nukleotidov ima najmanj kodirajoči del mRNA (vključno s stop kodonom)?`, v: 903,
    rez: x`\(903\)`, post: x`<p>\(300\) kodonov po \(3\) nukleotide in še stop kodon: \((300 + 1) \cdot 3 = 903\)</p>` },
  { t: 4, b: x`Katera mutacija ima najverjetneje najhujše posledice za beljakovino?`, p: "delecija enega nukleotida blizu začetka gena", n: ["zamenjava tretjega nukleotida v kodonu", "delecija treh zaporednih nukleotidov na koncu gena", "zamenjava nukleotida v intronu"],
    post: x`<p>Delecija enega nukleotida premakne bralni okvir, zato se spremenijo vsi nadaljnji kodoni (pogosto nastane zgodnji stop kodon). Zamenjava tretjega nukleotida je zaradi degeneriranosti kode pogosto tiha.</p>` },
  { t: 4, b: x`DNA podvajamo v gojišču s težkim dušikom \(^{15}\mathrm N\), nato celice prenesemo v gojišče z lahkim \(^{14}\mathrm N\). Kolikšen delež molekul DNA je po dveh delitvah hibridnih (\(^{15}\mathrm N/^{14}\mathrm N\))? (Vpiši ulomek.)`, v: 0.5, tol: 1e-6, namig: "Ulomek vpiši kot 1/4.",
    rez: x`\(\frac12\)`, post: x`<p>Semikonservativno podvajanje: po prvi delitvi sta obe molekuli hibridni, po drugi sta od štirih dve hibridni in dve lahki.</p>` },
  { t: 4, b: x`Koliko vodikovih vezi je med bazami v odseku dvoverižne DNA z \(100\) baznimi pari, od katerih je \(40\) parov G–C?`, v: 40 * 3 + 60 * 2,
    rez: x`\(240\)`, post: x`<p>G–C ima 3 vodikove vezi, A–T 2: \(40 \cdot 3 + 60 \cdot 2 = 240\)</p>` },
];
