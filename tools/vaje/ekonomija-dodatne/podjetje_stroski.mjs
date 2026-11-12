export default [
  { t: 4, b: "Podjetje ima fiksne stroške 12 000 €, variabilni strošek na enoto 30 € in prodajno ceno 50 €. Koliko enot mora prodati, da doseže dobiček 8000 €?", v: 1000, rez: "1000 enot",
    post: "<p>Prispevek na enoto 50 − 30 = 20 €. \\((12\\,000 + 8000) / 20 = 1000\\) enot. Prag pokritja je pri 600 enotah.</p>" },
  { t: 4, b: "Skupni stroški so \\(TC = 500 + 10Q + Q^2\\). Pri kateri količini so povprečni skupni stroški najnižji?", v: 22.36, tol: 0.05, rez: "Q ≈ 22,36",
    post: "<p>\\(ATC = 500/Q + 10 + Q\\). Minimum: \\(-500/Q^2 + 1 = 0\\), \\(Q = \\sqrt{500} ≈ 22{,}36\\). Tam je \\(ATC = MC = 10 + 2Q ≈ 54{,}7\\).</p>" },
];
