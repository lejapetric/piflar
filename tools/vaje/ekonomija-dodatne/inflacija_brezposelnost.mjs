export default [
  { t: 4, b: "Delovno sposobnih je 1 000 000 ljudi, od tega je 600 000 zaposlenih, 60 000 brezposelnih, ki iščejo delo, ostali so neaktivni. Kolikšna je stopnja brezposelnosti (na eno decimalko)?", v: 9.1, tol: 0.05, enota: "%", rez: "≈ 9,1 %",
    post: "<p>Aktivno prebivalstvo = 600 000 + 60 000 = 660 000. Stopnja = 60 000 / 660 000 = 9,09 %. Neaktivnih v izračunu ni.</p>" },
  { t: 4, b: "Košarica dobrin je stala 250 € v baznem letu in 270 € naslednje leto, tretje leto pa 283,50 €. Kolikšna je inflacija v tretjem letu?", v: 5, enota: "%", tol: 0.01, rez: "5 %",
    post: "<p>Indeksa: 108 in 113,4. Inflacija tretjega leta = 283,50/270 − 1 = 5 %.</p>" },
];
