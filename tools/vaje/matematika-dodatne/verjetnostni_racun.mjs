const x = String.raw;
export default [
  { t: 4, b: x`Vržemo tri poštene kocke. Kolikšna je verjetnost, da je vsota pik enaka \(10\)?`, v: 0.125, tol: 1e-6, namig: "Vpiši ulomek ali decimalno število.",
    rez: x`\(P = \frac{27}{216} = \frac18\)`, post: x`<p>Vseh izidov je \(6^3 = 216\). Vsoto 10 dajo razporeditve \(\{1,3,6\}, \{1,4,5\}, \{2,2,6\}, \{2,3,5\}, \{2,4,4\}, \{3,3,4\}\): \(6 + 6 + 3 + 6 + 3 + 3 = 27\) izidov.</p><p>\(P = \frac{27}{216} = \frac18\)</p>` },
  { t: 4, b: x`V posodi je \(5\) rdečih in \(3\) modre kroglice. Brez vračanja izvlečemo \(3\). Kolikšna je verjetnost, da sta natanko dve rdeči? (Na tri decimalke ali z ulomkom.)`, v: 15 / 28, tol: 0.0006,
    rez: x`\(P = \frac{15}{28} \approx 0{,}536\)`, post: x`<p>\(P = \frac{\binom52\binom31}{\binom83} = \frac{10 \cdot 3}{56} = \frac{15}{28}\)</p>` },
  { t: 4, b: x`Kovanec vržemo \(10\)-krat. Kolikšna je verjetnost, da pade grb vsaj \(8\)-krat? (Na tri decimalke ali z ulomkom.)`, v: 7 / 128, tol: 0.0006,
    rez: x`\(P = \frac{56}{1024} = \frac{7}{128} \approx 0{,}055\)`, post: x`<p>Bernoullijevo zaporedje: \(P = \frac{\binom{10}{8} + \binom{10}{9} + \binom{10}{10}}{2^{10}} = \frac{45 + 10 + 1}{1024} = \frac{7}{128}\)</p>` },
  { t: 4, raven: "visja", b: x`Bolezen ima \(1\,\%\) ljudi. Test bolnika odkrije v \(99\,\%\) primerov, pri zdravem pa je lažno pozitiven v \(5\,\%\) primerov. Kolikšna je verjetnost, da je oseba s pozitivnim testom res bolna? (Na tri decimalke ali z ulomkom.)`, v: 1 / 6, tol: 0.0006,
    rez: x`\(P = \frac16 \approx 0{,}167\)`, post: x`<p>\(P(+) = 0{,}01 \cdot 0{,}99 + 0{,}99 \cdot 0{,}05 = 0{,}0099 + 0{,}0495 = 0{,}0594\).</p><p>Bayes: \(P(B \mid +) = \frac{0{,}0099}{0{,}0594} = \frac16 \approx 0{,}167\)</p>` },
  { t: 4, b: x`Kolikšna je verjetnost, da imata med štirimi naključno izbranimi ljudmi vsaj dva rojstni dan v istem mesecu? (Vsi meseci so enako verjetni; na tri decimalke.)`, v: 1 - (12 * 11 * 10 * 9) / 12 ** 4, tol: 0.0006,
    rez: x`\(P \approx 0{,}427\)`, post: x`<p>Nasprotni dogodek: vsi štirje v različnih mesecih, \(\frac{12 \cdot 11 \cdot 10 \cdot 9}{12^4} = \frac{11\,880}{20\,736}\).</p><p>\(P = 1 - \frac{11\,880}{20\,736} \approx 0{,}427\)</p>` },
];
