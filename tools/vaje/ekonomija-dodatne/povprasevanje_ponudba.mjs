export default [
  { t: 4, b: "Povpraševanje je \\(Q_d = 120 - 4P\\), ponudba \\(Q_s = 2P\\). Država uvede najvišjo dovoljeno ceno 15 €. Kolikšen je presežek povpraševanja?", v: 30, rez: "30 enot",
    post: "<p>Ravnovesje: \\(120 - 4P = 2P\\), \\(P = 20\\). Pri 15 €: \\(Q_d = 60\\), \\(Q_s = 30\\), primanjkljaj na trgu je 30 enot.</p>" },
  { t: 4, b: "Cena izdelka se zviša z 10 € na 12 €, prodana količina pa pade s 100 na 70 enot. Kolikšna je cenovna elastičnost povpraševanja po metodi središčne točke (absolutna vrednost, na dve decimalki)?", v: 1.94, tol: 0.01, rez: "≈ 1,94",
    post: "<p>\\(\\%\\Delta Q = \\frac{-30}{85} = -0{,}353\\), \\(\\%\\Delta P = \\frac{2}{11} = 0{,}182\\). \\(|E| = 0{,}353 / 0{,}182 ≈ 1{,}94\\); povpraševanje je elastično.</p>" },
];
