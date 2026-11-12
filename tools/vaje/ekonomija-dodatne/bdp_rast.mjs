export default [
  { t: 4, b: "Nominalni BDP se je povečal s 40 na 44 mrd €, deflator BDP pa s 100 na 105. Za koliko odstotkov se je povečal realni BDP (na eno decimalko)?", v: 4.8, tol: 0.05, enota: "%", rez: "≈ 4,8 %",
    post: "<p>Realni BDP: 40 → 44/1,05 = 41,90. Rast \\(41{,}90/40 - 1 = 4{,}76\\,\\% ≈ 4{,}8\\,\\%\\).</p>" },
  { t: 4, b: "Gospodarstvo raste po 3,5 % na leto. Po približno koliko letih se BDP podvoji (pravilo 70)?", v: 20, tol: 0.5, rez: "≈ 20 let",
    post: "<p>Pravilo 70: \\(70 / 3{,}5 = 20\\) let. Natančno: \\(\\ln 2 / \\ln 1{,}035 ≈ 20{,}1\\).</p>" },
];
