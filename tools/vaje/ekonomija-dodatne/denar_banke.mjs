export default [
  { t: 4, b: "Obvezna rezerva je 10 %. Banka prejme vlogo 1000 €. Za največ koliko se lahko poveča skupna količina denarja v bančnem sistemu (vključno z vlogo)?", v: 10000, enota: "€", rez: "10 000 €",
    post: "<p>Denarni multiplikator je \\(1/r = 1/0{,}1 = 10\\), torej \\(1000 \\cdot 10 = 10\\,000\\) €.</p>" },
  { t: 4, b: "Varčevalec položi 2000 € za 3 leta z letno obrestno mero 3 % in obrestno obrestovanje. Koliko ima na koncu (na cent)?", v: 2185.45, tol: 0.02, enota: "€", rez: "2185,45 €",
    post: "<p>\\(2000 \\cdot 1{,}03^3 = 2000 \\cdot 1{,}092727 = 2185{,}45\\) €.</p>" },
  { t: 4, b: "Nominalna obrestna mera je 4 %, inflacija pa 6 %. Kolikšna je približno realna obrestna mera?", v: -2, enota: "%", tol: 0.05, rez: "−2 %",
    post: "<p>Realna obrestna mera ≈ nominalna − inflacija = 4 − 6 = −2 %. Varčevalec izgublja kupno moč.</p>" },
];
