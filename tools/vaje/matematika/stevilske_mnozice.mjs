import { izbira, stevilo, besedilo, gcd, ulomek, T } from "../lib.mjs";

const lcm = (a, b) => (a * b) / gcd(a, b);
function razcep(n) {
  const f = {};
  for (let p = 2; p * p <= n; p++) while (n % p === 0) (f[p] = (f[p] ?? 0) + 1), (n /= p);
  if (n > 1) f[n] = (f[n] ?? 0) + 1;
  return f;
}
const razcepTex = (n) => Object.entries(razcep(n)).map(([p, e]) => (e > 1 ? `${p}^{${e}}` : p)).join(" \\cdot ");
const stDeliteljev = (n) => Object.values(razcep(n)).reduce((a, e) => a * (e + 1), 1);
const okl = (x) => (x < 0 ? `(${x})` : `${x}`);

export default function ({ z, slug, serija }) {
  // 1. Računanje s celimi števili
  serija("cela", 8, (r, i) => {
    const a = r.int(-20, 20), b = r.nenic(-9, 9), c = r.int(-9, 9), d = r.nenic(-9, 9);
    const v = i % 2 ? a - b * (c - d) : (a + b) * c - d * d;
    const izraz = i % 2 ? `${a} - ${okl(b)} \\cdot (${c} - ${okl(d)})` : `(${a} + ${okl(b)}) \\cdot ${okl(c)} - ${okl(d)}^2`;
    return stevilo({ tezavnost: 1, vrednost: v, besedilo: `Izračunaj \\(${izraz}\\).`, rezultat: `\\(${v}\\)`, postopek: i % 2 ? `<p>Najprej oklepaj: \\(${c} - ${okl(d)} = ${c - d}\\). Nato množenje: \\(${okl(b)} \\cdot ${okl(c - d)} = ${b * (c - d)}\\).</p><p>\\(${a} - ${okl(b * (c - d))} = ${v}\\)</p>` : `<p>Oklepaj: \\(${a} + ${okl(b)} = ${a + b}\\). Množenje: \\(${okl(a + b)} \\cdot ${okl(c)} = ${(a + b) * c}\\). Potenca: \\(${okl(d)}^2 = ${d * d}\\).</p><p>\\(${(a + b) * c} - ${d * d} = ${v}\\)</p>` });
  });

  // 2. D in v
  serija("Dv", 10, (r, i) => {
    const g = r.izberi([2, 3, 4, 5, 6, 7, 8, 9, 12, 15]);
    let x = r.int(2, 12), y = r.int(2, 12);
    if (gcd(x, y) !== 1 || x === y) return null;
    const a = g * x, b = g * y;
    const D = i % 2 === 0;
    return stevilo({ tezavnost: 1, vrednost: D ? gcd(a, b) : lcm(a, b), besedilo: `Izračunaj ${D ? "največji skupni delitelj" : "najmanjši skupni večkratnik"} \\(${D ? "D" : "v"}(${a}, ${b})\\).`, rezultat: `\\(${D ? "D" : "v"}(${a}, ${b}) = ${D ? gcd(a, b) : lcm(a, b)}\\)`, postopek: `<p>Razcep: \\(${a} = ${razcepTex(a)}\\), \\(${b} = ${razcepTex(b)}\\).</p><p>${D ? "Vzamemo skupne prafaktorje z manjšim eksponentom" : "Vzamemo vse prafaktorje z večjim eksponentom"}: \\(${D ? "D" : "v"}(${a}, ${b}) = ${razcepTex(D ? gcd(a, b) : lcm(a, b))} = ${D ? gcd(a, b) : lcm(a, b)}\\).</p>` });
  });
  serija("besedilna-Dv", 6, (r, i) => {
    if (i % 2 === 0) {
      const a = r.izberi([12, 15, 18, 20, 24, 30]), b = r.izberi([16, 20, 25, 36, 40, 45]);
      if (a === b) return null;
      return stevilo({ tezavnost: 2, vrednost: lcm(a, b), besedilo: `Avtobus številka 1 odpelje s postaje vsakih ${a} minut, avtobus številka 2 pa vsakih ${b} minut. Ob 7.00 odpeljeta hkrati. Čez koliko minut bosta spet odpeljala hkrati?`, enota: "min", rezultat: `${lcm(a, b)} min`, postopek: `<p>Iščemo najmanjši skupni večkratnik: \\(v(${a}, ${b}) = ${lcm(a, b)}\\).</p>` });
    }
    const g = r.izberi([6, 8, 9, 12, 15]), a = g * r.int(3, 7), b = g * r.int(8, 12);
    if (gcd(a, b) !== g) return null;
    return stevilo({ tezavnost: 2, vrednost: g, besedilo: `Pravokotno ploščo velikosti ${a} cm × ${b} cm želimo brez ostanka razrezati na čim večje enake kvadrate. Kolikšna je stranica kvadrata?`, enota: "cm", rezultat: `${g} cm`, postopek: `<p>Stranica mora deliti ${a} in ${b}, največja taka je \\(D(${a}, ${b}) = ${g}\\).</p>` });
  });
  serija("delitelji", 5, (r) => {
    const n = r.izberi([12, 18, 24, 36, 48, 60, 72, 90, 96, 100, 120, 144, 180, 200]);
    return stevilo({ tezavnost: 2, vrednost: stDeliteljev(n), besedilo: `Koliko naravnih deliteljev ima število ${n}?`, rezultat: `${stDeliteljev(n)}`, postopek: `<p>\\(${n} = ${razcepTex(n)}\\). Število deliteljev je produkt (eksponent + 1): \\(${Object.values(razcep(n)).map((e) => e + 1).join(" \\cdot ")} = ${stDeliteljev(n)}\\).</p>` });
  });

  // 3. Manjkajoča števka
  serija("stevka", 6, (r) => {
    const k = r.izberi([3, 9, 4, 6]);
    const st = [r.int(1, 9), r.int(0, 9), r.int(0, 9)];
    const poz = r.int(0, 2);
    const kandidati = [];
    for (let x = poz === 0 ? 1 : 0; x <= 9; x++) {
      const n = Number(st.map((c, j) => (j === poz ? x : c)).join("") + (k === 4 || k === 6 ? "" : "5"));
      if (n % k === 0) kandidati.push(x);
    }
    const zapis = st.map((c, j) => (j === poz ? "*" : c)).join("") + (k === 4 || k === 6 ? "" : "5");
    if (!kandidati.length) return null;
    const pravilo = { 3: "vsota števk deljiva s 3", 9: "vsota števk deljiva z 9", 4: "zadnji dve števki tvorita število, deljivo s 4", 6: "je sodo in ima vsoto števk deljivo s 3" }[k];
    return stevilo({ tezavnost: 2, vrednost: kandidati[0], besedilo: `Katera je najmanjša števka, ki jo lahko vstavimo namesto *, da bo število ${zapis} deljivo s ${k}?`, rezultat: `${kandidati[0]} (vse možnosti: ${kandidati.join(", ")})`, postopek: `<p>Število je deljivo s ${k}, če ${pravilo}.</p><p>Preverimo števke od 0 naprej: ustrezajo ${kandidati.join(", ")}. Najmanjša je ${kandidati[0]}.</p>` });
  });

  // 4. Ostanki
  serija("ostanki", 6, (r, i) => {
    const m = r.izberi([3, 4, 5, 7, 9, 10]);
    if (i % 2 === 0) {
      const a = r.int(20, 99), b = r.int(20, 99);
      return stevilo({ tezavnost: 2, vrednost: (a * b) % m, besedilo: `Število ${a} da pri deljenju z ${m} ostanek ${a % m}, število ${b} pa ostanek ${b % m}. Kolikšen ostanek da produkt ${a} · ${b} pri deljenju z ${m}?`, rezultat: `${(a * b) % m}`, postopek: `<p>Ostanek produkta je enak ostanku produkta ostankov: \\(${a % m} \\cdot ${b % m} = ${(a % m) * (b % m)}\\), ta da pri deljenju z ${m} ostanek ${(a * b) % m}.</p>` });
    }
    const a = r.int(2, 9), n = r.int(10, 60);
    if (a % m === 0) return null;
    let o = 1; for (let k = 0; k < n; k++) o = (o * a) % m;
    const cikel = []; let t = a % m;
    while (!cikel.includes(t)) cikel.push(t), (t = (t * a) % m);
    const zac = cikel.indexOf(t);
    if (zac !== 0) return null;
    const L = cikel.length, idx = ((n - 1) % L) + 1;
    return stevilo({ tezavnost: 3, vrednost: o, besedilo: `Kolikšen ostanek da \\(${a}^{${n}}\\) pri deljenju z ${m}?`, rezultat: `${o}`, postopek: `<p>Ostanki potenc \\(${a}^1, ${a}^2, ${a}^3, \\ldots\\) pri deljenju z ${m} so ${cikel.join(", ")} in se nato ponavljajo s periodo ${L}.</p><p>\\(${n} = ${L} \\cdot ${Math.floor((n - 1) / L)} + ${idx}\\), zato ima \\(${a}^{${n}}\\) enak ostanek kot \\(${a}^{${idx}}\\): ${o}.</p>` });
  });

  // 5. Dvojiški sestav
  serija("dvojiski", 8, (r, i) => {
    const n = r.int(5, 200);
    const bin = n.toString(2);
    if (i % 2 === 0) return stevilo({ tezavnost: 1, vrednost: n, besedilo: `Število \\((${bin})_2\\) zapiši v desetiškem sestavu.`, rezultat: `${n}`, postopek: `<p>\\((${bin})_2 = ${[...bin].map((c, j) => (c === "1" ? `2^{${bin.length - 1 - j}}` : null)).filter(Boolean).join(" + ")} = ${n}\\)</p>` });
    return besedilo({ tezavnost: 2, sprejemljivi: [bin, `(${bin})_2`, `${bin}_2`], besedilo: `Število ${n} zapiši v dvojiškem sestavu.`, namig: "Vpiši samo ničle in enice, npr. 1011.", rezultat: `\\(${n} = (${bin})_2\\)`, postopek: `<p>Zaporedno delimo z 2 in zapisujemo ostanke, nato jih beremo od spodaj navzgor.</p><p>\\(${n} = (${bin})_2\\)</p>` });
  });

  // 6. Ulomki
  serija("ulomki", 8, (r, i) => {
    const a = r.int(1, 7), b = r.int(2, 9), c = r.int(1, 7), d = r.int(2, 9);
    if (a >= b || c >= d) return null;
    const op = ["+", "-", "\\cdot", ":"][i % 4];
    const [s, im] = op === "+" ? [a * d + c * b, b * d] : op === "-" ? [a * d - c * b, b * d] : op === "\\cdot" ? [a * c, b * d] : [a * d, b * c];
    return stevilo({ tezavnost: i < 4 ? 1 : 2, vrednost: s / im, toleranca: 1e-9, besedilo: `Izračunaj \\(\\frac{${a}}{${b}} ${op} \\frac{${c}}{${d}}\\) in rezultat zapiši kot okrajšan ulomek.`, namig: "Ulomek vpiši kot 7/12.", rezultat: `\\(${ulomek(s, im)}\\)`, postopek: op === "+" || op === "-" ? `<p>Razširimo na skupni imenovalec ${b * d}: \\(\\frac{${a * d}}{${b * d}} ${op} \\frac{${c * b}}{${b * d}} = \\frac{${s}}{${im}} = ${ulomek(s, im)}\\).</p>` : op === "\\cdot" ? `<p>Števec s števcem, imenovalec z imenovalcem: \\(\\frac{${a * c}}{${b * d}} = ${ulomek(s, im)}\\).</p>` : `<p>Delimo tako, da množimo z obratno vrednostjo: \\(\\frac{${a}}{${b}} \\cdot \\frac{${d}}{${c}} = \\frac{${s}}{${im}} = ${ulomek(s, im)}\\).</p>` });
  });

  // 7. Periodične decimalke
  serija("periodicne", 6, (r, i) => {
    if (i % 2 === 0) {
      const p = r.int(1, 98);
      const per = String(p).padStart(2, "0");
      return stevilo({ tezavnost: 3, vrednost: p / 99, toleranca: 1e-9, besedilo: `Zapiši periodično decimalko \\(0{,}\\overline{${per}}\\) kot okrajšan ulomek.`, namig: "Ulomek vpiši kot 7/33.", rezultat: `\\(${ulomek(p, 99)}\\)`, postopek: `<p>\\(x = 0{,}\\overline{${per}}\\), \\(100x = ${per}{,}\\overline{${per}}\\). Odštejemo: \\(99x = ${p}\\), torej \\(x = \\frac{${p}}{99} = ${ulomek(p, 99)}\\).</p>` });
    }
    const a = r.int(1, 9), p = r.int(1, 9);
    if (a === p) return null;
    return stevilo({ tezavnost: 3, vrednost: (9 * a + p) / 90, toleranca: 1e-9, besedilo: `Zapiši periodično decimalko \\(0{,}${a}\\overline{${p}}\\) kot okrajšan ulomek.`, namig: "Ulomek vpiši kot 7/30.", rezultat: `\\(${ulomek(9 * a + p, 90)}\\)`, postopek: `<p>\\(x = 0{,}${a}\\overline{${p}}\\). \\(100x = ${a}${p}{,}\\overline{${p}}\\), \\(10x = ${a}{,}\\overline{${p}}\\).</p><p>\\(90x = ${a * 10 + p} - ${a} = ${9 * a + p}\\), \\(x = \\frac{${9 * a + p}}{90} = ${ulomek(9 * a + p, 90)}\\).</p>` });
  });

  // 8. Procenti
  serija("procenti", 10, (r, i) => {
    const c = r.int(20, 400), p = r.izberi([5, 8, 10, 12, 15, 20, 25, 30, 40]);
    const v = i % 5;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: (c * p) / 100, besedilo: `Koliko je ${p} % od ${c}?`, rezultat: T((c * p) / 100), postopek: `<p>\\(${p}\\,\\% \\text{ od } ${c} = 0{,}${String(p).padStart(2, "0")} \\cdot ${c} = ${T((c * p) / 100).replace(",", "{,}")}\\)</p>` });
    if (v === 1) return stevilo({ tezavnost: 1, vrednost: c * (1 + p / 100), besedilo: `Cena izdelka je ${c} €. Podražijo ga za ${p} %. Kolikšna je nova cena?`, enota: "€", rezultat: `${T(c * (1 + p / 100), 2)} €`, postopek: `<p>Nova cena je \\(${100 + p}\\,\\%\\) stare: \\(${c} \\cdot ${T(1 + p / 100).replace(",", "{,}")} = ${T(c * (1 + p / 100), 2).replace(",", "{,}")}\\) €.</p>` });
    if (v === 2) return stevilo({ tezavnost: 2, vrednost: c, besedilo: `Po ${p}-odstotnem znižanju stane jakna ${T(c * (1 - p / 100), 2)} €. Koliko je stala pred znižanjem?`, enota: "€", rezultat: `${c} €`, postopek: `<p>Znižana cena je \\(${100 - p}\\,\\%\\) prvotne: \\(x \\cdot ${T(1 - p / 100).replace(",", "{,}")} = ${T(c * (1 - p / 100), 2).replace(",", "{,}")}\\), \\(x = ${c}\\) €.</p>` });
    if (v === 3) { const q = r.izberi([10, 20, 25, 50]); const k = (1 + p / 100) * (1 - q / 100); return stevilo({ tezavnost: 3, vrednost: (k - 1) * 100, toleranca: 0.05, besedilo: `Ceno najprej povišamo za ${p} %, nato novo ceno znižamo za ${q} %. Za koliko odstotkov se je cena spremenila glede na prvotno? (Znižanje zapiši z minusom.)`, enota: "%", rezultat: `${T((k - 1) * 100, 2)} %`, postopek: `<p>Faktor spremembe: \\(${T(1 + p / 100).replace(",", "{,}")} \\cdot ${T(1 - q / 100).replace(",", "{,}")} = ${T(k, 4).replace(",", "{,}")}\\).</p><p>Sprememba: \\((${T(k, 4).replace(",", "{,}")} - 1) \\cdot 100\\,\\% = ${T((k - 1) * 100, 2).replace(",", "{,}")}\\,\\%\\).</p>` }); }
    const a = r.int(10, 40), b = a + r.int(2, 15);
    return stevilo({ tezavnost: 2, vrednost: b - a, besedilo: `Delež volivcev stranke je zrasel s ${a} % na ${b} %. Za koliko odstotnih točk je zrasel?`, rezultat: `${b - a} odstotnih točk`, postopek: `<p>Odstotne točke so razlika odstotkov: \\(${b} - ${a} = ${b - a}\\). (Relativno je to \\(${T(((b - a) / a) * 100, 1)}\\,\\%\\) povečanje.)</p>` });
  });

  // 9. V katero množico spada število
  const stevila = [
    ["\\sqrt{16}", "\\mathbb{N}", "\\(\\sqrt{16} = 4\\) je naravno število."],
    ["-7", "\\mathbb{Z} \\setminus \\mathbb{N}", "Negativno celo število."],
    ["\\frac{3}{4}", "\\mathbb{Q} \\setminus \\mathbb{Z}", "Ulomek, ki ni celo število."],
    ["\\sqrt{2}", "\\mathbb{R} \\setminus \\mathbb{Q}", "\\(\\sqrt{2}\\) je iracionalno število."],
    ["0{,}\\overline{3}", "\\mathbb{Q} \\setminus \\mathbb{Z}", "Periodična decimalka je racionalno število (\\(\\frac13\\))."],
    ["\\pi", "\\mathbb{R} \\setminus \\mathbb{Q}", "\\(\\pi\\) je iracionalno število."],
    ["\\frac{12}{4}", "\\mathbb{N}", "\\(\\frac{12}{4} = 3\\)."],
    ["2 + 3i", "\\mathbb{C} \\setminus \\mathbb{R}", "Število ima neničelni imaginarni del."],
  ];
  serija("mnozica-stevila", stevila.length, (r, i) => {
    const [x, p, razlaga] = stevila[i];
    const vse = ["\\mathbb{N}", "\\mathbb{Z} \\setminus \\mathbb{N}", "\\mathbb{Q} \\setminus \\mathbb{Z}", "\\mathbb{R} \\setminus \\mathbb{Q}", "\\mathbb{C} \\setminus \\mathbb{R}"];
    return izbira({ tezavnost: 1, r, besedilo: `V katero množico spada število \\(${x}\\)?`, pravilna: `\\(${p}\\)`, napacne: vse.filter((m) => m !== p).slice(0, 3).map((m) => `\\(${m}\\)`), postopek: `<p>${razlaga}</p>` });
  });

  // 10. Kompleksna števila
  serija("kompleksna", 10, (r, i) => {
    const a = r.nenic(-6, 6), b = r.nenic(-6, 6), c = r.nenic(-6, 6), d = r.nenic(-6, 6);
    const zt = (x, y) => `${x} ${y < 0 ? "-" : "+"} ${Math.abs(y) === 1 ? "" : Math.abs(y)}i`;
    const v = i % 5;
    if (v === 0) { const k = r.izberi([1, 2, 3]); const [x, y] = r.izberi([[3, 4], [5, 12], [8, 6]]).map((t) => t * k); return stevilo({ tezavnost: 2, vrednost: Math.hypot(x, y), besedilo: `Izračunaj absolutno vrednost kompleksnega števila \\(z = ${zt(x, -y)}\\).`, rezultat: `\\(|z| = ${Math.hypot(x, y)}\\)`, postopek: `<p>\\(|z| = \\sqrt{${x}^2 + ${y}^2} = \\sqrt{${x * x + y * y}} = ${Math.hypot(x, y)}\\)</p>` }); }
    if (v === 1) return stevilo({ tezavnost: 2, vrednost: a * c - b * d, besedilo: `Izračunaj realni del produkta \\((${zt(a, b)})(${zt(c, d)})\\).`, rezultat: `\\(${a * c - b * d}\\)`, postopek: `<p>\\((${zt(a, b)})(${zt(c, d)}) = ${a * c} + ${okl(a * d)}i + ${okl(b * c)}i + ${okl(b * d)}i^2\\).</p><p>Ker je \\(i^2 = -1\\), je realni del \\(${a * c} - ${okl(b * d)} = ${a * c - b * d}\\), imaginarni pa \\(${a * d + b * c}\\).</p>` });
    if (v === 2) return stevilo({ tezavnost: 2, vrednost: a * d + b * c, besedilo: `Izračunaj imaginarni del produkta \\((${zt(a, b)})(${zt(c, d)})\\).`, rezultat: `\\(${a * d + b * c}\\)`, postopek: `<p>Imaginarni del: \\(${a} \\cdot ${okl(d)} + ${okl(b)} \\cdot ${okl(c)} = ${a * d + b * c}\\).</p>` });
    if (v === 3) { const n = r.int(10, 99); const o = [1, "i", -1, "-i"][n % 4]; return izbira({ tezavnost: 2, r, besedilo: `Koliko je \\(i^{${n}}\\)?`, pravilna: `\\(${o}\\)`, napacne: [1, "i", -1, "-i"].filter((x) => x !== o).map((x) => `\\(${x}\\)`), postopek: `<p>Potence \\(i\\) se ponavljajo s periodo 4: \\(i, -1, -i, 1\\). \\(${n} = 4 \\cdot ${Math.floor(n / 4)} + ${n % 4}\\), zato \\(i^{${n}} = i^{${n % 4}} = ${o}\\).</p>` }); }
    const im = c * c + d * d, re = a * c + b * d;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: re / im, toleranca: 1e-6, besedilo: `Izračunaj realni del količnika \\(\\dfrac{${zt(a, b)}}{${zt(c, d)}}\\).`, namig: "Rezultat lahko vpišeš kot ulomek.", rezultat: `\\(${ulomek(re, im)}\\)`, postopek: `<p>Ulomek razširimo s konjugirano vrednostjo imenovalca \\(${zt(c, -d)}\\).</p><p>Imenovalec: \\(${c}^2 + ${okl(d)}^2 = ${im}\\). Realni del števca: \\(${a} \\cdot ${okl(c)} + ${okl(b)} \\cdot ${okl(d)} = ${re}\\).</p><p>Realni del: \\(\\frac{${re}}{${im}} = ${ulomek(re, im)}\\).</p>` });
  });

  // 11. Iskanje števil iz D in v, indukcija
  serija("iz-Dv", 4, (r) => {
    const g = r.int(2, 9), x = r.int(2, 7), y = r.int(2, 9);
    if (gcd(x, y) !== 1 || x >= y) return null;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: g * g * x * y, besedilo: `Največji skupni delitelj dveh naravnih števil je ${g}, najmanjši skupni večkratnik pa ${g * x * y}. Kolikšen je produkt teh dveh števil?`, rezultat: `${g * g * x * y}`, postopek: `<p>Za vsaki naravni števili velja \\(D(a, b) \\cdot v(a, b) = a \\cdot b\\).</p><p>\\(a \\cdot b = ${g} \\cdot ${g * x * y} = ${g * g * x * y}\\)</p>` });
  });
  const ind = [
    ["Kaj je prvi korak (baza) dokaza z matematično indukcijo?", "Preverimo, da trditev velja za najmanjše naravno število (običajno \\(n = 1\\)).", ["Predpostavimo, da trditev velja za vse \\(n\\).", "Preverimo trditev za \\(n = 1, 2, 3, 4\\) in sklepamo naprej.", "Pokažemo, da iz \\(n + 1\\) sledi \\(n\\)."]],
    ["Kaj dokazujemo v indukcijskem koraku?", "Če trditev velja za \\(n\\), velja tudi za \\(n + 1\\).", ["Trditev velja za \\(n = 1\\).", "Če trditev velja za \\(n + 1\\), velja za \\(n\\).", "Trditev velja za vse sode \\(n\\)."]],
    ["Pri dokazu, da je \\(6 \\mid n^3 - n\\), smo v indukcijskem koraku dobili \\((n+1)^3 - (n+1) = (n^3 - n) + 3n(n + 1)\\). Zakaj je \\(3n(n + 1)\\) deljivo s 6?", "Ker je \\(n(n+1)\\) produkt dveh zaporednih števil in je zato sod.", ["Ker je \\(n\\) vedno deljiv s 3.", "Ker je \\(n + 1\\) vedno sod.", "Ker je 3 deljivo s 6."]],
  ];
  serija("indukcija", ind.length, (r, i) => {
    const [b, p, n] = ind[i];
    return izbira({ tezavnost: i < 2 ? 3 : 4, raven: "visja", r, besedilo: b, pravilna: p, napacne: n, postopek: `<p>Dokaz z indukcijo ima dva dela: bazo (trditev velja za prvo število) in indukcijski korak (iz veljavnosti za \\(n\\) sledi veljavnost za \\(n + 1\\)).</p><p>Pravilno: ${p}</p>` });
  });
}
