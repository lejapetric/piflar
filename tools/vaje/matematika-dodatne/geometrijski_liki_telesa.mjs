const x = String.raw;
export default [
  { t: 4, b: x`Kolikšen kot oklepa telesna diagonala kocke z osnovno ploskvijo? (V stopinjah, na dve decimalki.)`, v: Math.atan(1 / Math.SQRT2) * 180 / Math.PI, tol: 0.006,
    rez: x`\(\varphi \approx 35{,}26^\circ\)`, post: x`<p>Za kocko z robom \(a\) je projekcija telesne diagonale na osnovno ploskev ploskovna diagonala \(a\sqrt2\), višina pa \(a\).</p><p>\(\tan\varphi = \frac{a}{a\sqrt2} = \frac{1}{\sqrt2}\), \(\varphi \approx 35{,}26^\circ\)</p>` },
  { t: 4, b: x`Pravilna štiristrana piramida ima osnovni rob \(6\) in stranski rob \(5\). Izračunaj njeno prostornino (na dve decimalki).`, v: 12 * Math.sqrt(7), tol: 0.006,
    rez: x`\(V = 12\sqrt7 \approx 31{,}75\)`, post: x`<p>Polovica diagonale osnovne ploskve: \(\frac{6\sqrt2}{2} = 3\sqrt2\).</p><p>Višina: \(v = \sqrt{25 - 18} = \sqrt7\).</p><p>\(V = \frac13 \cdot 36 \cdot \sqrt7 = 12\sqrt7 \approx 31{,}75\)</p>` },
  { t: 4, b: x`Plašč pokončnega stožca s polmerom \(r = 3\) in višino \(v = 4\) razgrnemo v ravnino. Koliko stopinj meri središčni kot dobljenega krožnega izseka?`, v: 216,
    rez: x`\(216^\circ\)`, post: x`<p>Stranica stožca \(s = \sqrt{9 + 16} = 5\) je polmer izseka. Lok izseka je obseg osnovne ploskve \(2\pi \cdot 3\).</p><p>\(\frac{\alpha}{360^\circ} = \frac{2\pi \cdot 3}{2\pi \cdot 5}\), \(\alpha = 216^\circ\)</p>` },
  { t: 4, b: x`V kocko je včrtana krogla. Kolikšen del prostornine kocke zavzema krogla? (Na tri decimalke.)`, v: Math.PI / 6, tol: 0.0006,
    rez: x`\(\frac{\pi}{6} \approx 0{,}524\)`, post: x`<p>Pri robu \(a\) je polmer krogle \(\frac{a}{2}\): \(V_k = \frac43\pi\frac{a^3}{8} = \frac{\pi a^3}{6}\).</p><p>\(\frac{V_k}{a^3} = \frac{\pi}{6} \approx 0{,}524\)</p>` },
  { t: 4, b: x`Vsem trem robovom kvadra povečamo dolžino za \(20\,\%\). Za koliko odstotkov se poveča prostornina?`, v: 72.8, tol: 0.01,
    rez: x`\(72{,}8\,\%\)`, post: x`<p>\(V' = 1{,}2a \cdot 1{,}2b \cdot 1{,}2c = 1{,}728\,abc\).</p><p>Prostornina se poveča za \(72{,}8\,\%\).</p>` },
  { t: 4, b: x`Stožec s polmerom \(6\) in višino \(8\) prerežemo z ravnino, vzporedno osnovni ploskvi, na polovici višine. Izračunaj prostornino spodnjega dela (prisekanega stožca), na dve decimalki.`, v: 84 * Math.PI, tol: 0.006,
    rez: x`\(84\pi \approx 263{,}89\)`, post: x`<p>Prostornina stožca: \(V = \frac13\pi \cdot 36 \cdot 8 = 96\pi\).</p><p>Odrezani vrh je podoben s koeficientom \(\frac12\), njegova prostornina je \(\left(\frac12\right)^3 V = 12\pi\).</p><p>Spodnji del: \(96\pi - 12\pi = 84\pi \approx 263{,}89\)</p>` },
  { t: 4, b: x`Izračunaj prostornino pravilnega tetraedra z robom \(6\) (na dve decimalki).`, v: 18 * Math.SQRT2, tol: 0.006,
    rez: x`\(18\sqrt2 \approx 25{,}46\)`, post: x`<p>Višina tetraedra: \(v = a\sqrt{\frac23} = 2\sqrt6\). Osnovna ploskev: \(\frac{a^2\sqrt3}{4} = 9\sqrt3\).</p><p>\(V = \frac13 \cdot 9\sqrt3 \cdot 2\sqrt6 = 6\sqrt{18} = 18\sqrt2 \approx 25{,}46\)</p>` },
];
