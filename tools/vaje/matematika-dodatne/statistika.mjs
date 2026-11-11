const x = String.raw;
export default [
  { t: 4, b: x`Izračunaj standardni odklon \(\sigma\) podatkov \(2, 4, 4, 4, 5, 5, 7, 9\) (populacija, deli z \(N\)).`, v: 2,
    rez: x`\(\sigma = 2\)`, post: x`<p>\(\bar x = \frac{40}{8} = 5\). Kvadrati odklonov: \(9, 1, 1, 1, 0, 0, 4, 16\), vsota \(32\).</p><p>\(\sigma^2 = \frac{32}{8} = 4\), \(\sigma = 2\)</p>` },
  { t: 4, b: x`Povprečna ocena \(20\) dijakov skupine A je \(3{,}2\), povprečna ocena \(30\) dijakov skupine B pa \(3{,}8\). Kolikšna je povprečna ocena vseh dijakov?`, v: 3.56, tol: 1e-6,
    rez: x`\(3{,}56\)`, post: x`<p>Tehtano povprečje: \(\frac{20 \cdot 3{,}2 + 30 \cdot 3{,}8}{50} = \frac{64 + 114}{50} = 3{,}56\)</p>` },
  { t: 4, b: x`Podatki imajo povprečje \(10\) in standardni odklon \(3\). Vsakemu podatku prištejemo \(5\) in rezultat pomnožimo z \(2\). Kolikšen je nov standardni odklon?`, v: 6,
    rez: x`\(\sigma' = 6\)`, post: x`<p>Prištevanje ne spremeni razpršenosti, množenje z \(2\) pa podvoji vse odklone: \(\sigma' = 2 \cdot 3 = 6\). (Povprečje postane \(2(10 + 5) = 30\).)</p>` },
  { t: 4, b: x`Pet naravnih števil ima povprečje \(6\), mediano \(5\) in en sam modus \(3\). Največje število je \(11\). Katero je drugo največje število?`, v: 8,
    rez: x`\(8\)`, post: x`<p>Urejeno: \(a \le b \le 5 \le d \le 11\). Edini modus 3 pomeni, da se 3 ponovi: \(a = b = 3\).</p><p>Vsota \(30\): \(3 + 3 + 5 + d + 11 = 30\), \(d = 8\). (8 se ne ponovi, zato je 3 res edini modus.)</p>` },
  { t: 4, b: x`Izračunaj varianco \(\sigma^2\) podatkov \(1, 2, 3, 4, 5, 6, 7\) (populacija).`, v: 4,
    rez: x`\(\sigma^2 = 4\)`, post: x`<p>\(\bar x = 4\). Kvadrati odklonov: \(9, 4, 1, 0, 1, 4, 9\), vsota \(28\).</p><p>\(\sigma^2 = \frac{28}{7} = 4\)</p>` },
];
