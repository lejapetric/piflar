import { izbira, stevilo, T, zaokrozi } from "../lib.mjs";

const rad = (x) => (x * Math.PI) / 180;
const deg = (x) => (x * 180) / Math.PI;
const L = (x, d = 2) => T(x, d).replace("−", "-").replace(",", "{,}");

export default function ({ z, slug, serija }) {
  // 1. Odnosi med koti
  serija("koti", 6, (r, i) => {
    const a = r.int(12, 78);
    const v = i % 3;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: 90 - a, enota: "°", besedilo: `Kot meri ${a}°. Koliko meri njegov komplementarni kot?`, rezultat: `${90 - a}°`, postopek: `<p>Komplementarna kota se dopolnjujeta do 90°: \\(90° - ${a}° = ${90 - a}°\\).</p>` });
    if (v === 1) return stevilo({ tezavnost: 1, vrednost: 180 - a, enota: "°", besedilo: `Kot meri ${a}°. Koliko meri njegov suplementarni kot?`, rezultat: `${180 - a}°`, postopek: `<p>Suplementarna kota se dopolnjujeta do 180°: \\(180° - ${a}° = ${180 - a}°\\).</p>` });
    const k = r.int(2, 4);
    const x = 180 / (k + 1);
    if (!Number.isInteger(x)) return null;
    return stevilo({ tezavnost: 2, vrednost: x, enota: "°", besedilo: `Suplementarna kota sta v razmerju \\(1 : ${k}\\). Koliko meri manjši kot?`, rezultat: `${x}°`, postopek: `<p>\\(x + ${k}x = 180°\\), \\(${k + 1}x = 180°\\), \\(x = ${x}°\\).</p>` });
  });
  serija("minute", 4, (r, i) => {
    const a1 = r.int(20, 80), a2 = r.int(5, 55), b1 = r.int(10, 60), b2 = r.int(10, 55);
    const vs = (a1 + b1) * 60 + a2 + b2;
    const st = Math.floor(vs / 60), mi = vs % 60;
    return stevilo({ tezavnost: 1, vrednost: mi, besedilo: `Seštej kota \\(${a1}°\\,${a2}'\\) in \\(${b1}°\\,${b2}'\\). Rezultat zapiši v stopinjah in minutah. Koliko minut ima rezultat?`, rezultat: `\\(${st}°\\,${mi}'\\)`, postopek: `<p>Stopinje: \\(${a1 + b1}°\\), minute: \\(${a2 + b2}'\\).${a2 + b2 >= 60 ? ` Ker je \\(${a2 + b2}' = 1°\\,${a2 + b2 - 60}'\\), prenesemo 1° k stopinjam.` : ""}</p><p>\\(${st}°\\,${mi}'\\)</p>` });
  });

  // 2. Koti v trikotniku in večkotniku
  serija("trikotnik-koti", 6, (r, i) => {
    const a = r.int(25, 85), b = r.int(25, 85);
    if (a + b >= 170) return null;
    if (i % 2 === 0) return stevilo({ tezavnost: 1, vrednost: 180 - a - b, enota: "°", besedilo: `V trikotniku meri kot \\(\\alpha = ${a}°\\) in kot \\(\\beta = ${b}°\\). Koliko meri kot \\(\\gamma\\)?`, rezultat: `${180 - a - b}°`, postopek: `<p>Vsota notranjih kotov trikotnika je 180°: \\(\\gamma = 180° - ${a}° - ${b}° = ${180 - a - b}°\\).</p>` });
    return stevilo({ tezavnost: 1, vrednost: a + b, enota: "°", besedilo: `V trikotniku meri kot \\(\\alpha = ${a}°\\) in kot \\(\\beta = ${b}°\\). Koliko meri zunanji kot pri oglišču \\(C\\)?`, rezultat: `${a + b}°`, postopek: `<p>Zunanji kot je enak vsoti notranjih kotov ob drugih dveh ogliščih: \\(${a}° + ${b}° = ${a + b}°\\).</p>` });
  });
  serija("veckotnik", 7, (r, i) => {
    const n = r.int(5, 12);
    const v = i % 3;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: (n - 2) * 180, enota: "°", besedilo: `Kolikšna je vsota notranjih kotov ${n}-kotnika?`, rezultat: `${(n - 2) * 180}°`, postopek: `<p>\\((n - 2) \\cdot 180° = ${n - 2} \\cdot 180° = ${(n - 2) * 180}°\\)</p>` });
    if (v === 1) return stevilo({ tezavnost: 2, vrednost: (n * (n - 3)) / 2, besedilo: `Koliko diagonal ima ${n}-kotnik?`, rezultat: `${(n * (n - 3)) / 2}`, postopek: `<p>Iz vsakega oglišča gre \\(n - 3\\) diagonal, vsako štejemo dvakrat: \\(\\frac{n(n - 3)}{2} = \\frac{${n} \\cdot ${n - 3}}{2} = ${(n * (n - 3)) / 2}\\).</p>` });
    const kot = ((n - 2) * 180) / n;
    return stevilo({ tezavnost: 2, vrednost: kot, toleranca: 0.01, enota: "°", besedilo: `Koliko meri notranji kot pravilnega ${n}-kotnika? (Na dve decimalki natančno.)`, rezultat: `${T(kot, 2)}°`, postopek: `<p>Vsi koti so enaki: \\(\\frac{(n - 2) \\cdot 180°}{n} = \\frac{${(n - 2) * 180}°}{${n}} = ${L(kot)}°\\).</p>` });
  });

  // 3. Ali trikotnik obstaja
  serija("obstaja", 6, (r) => {
    const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 22);
    const ob = a + b > c && a + c > b && b + c > a;
    return izbira({ tezavnost: 2, r, besedilo: `Ali obstaja trikotnik s stranicami ${a} cm, ${b} cm in ${c} cm?`, pravilna: ob ? "Da" : "Ne", napacne: [ob ? "Ne" : "Da"], postopek: `<p>Trikotniška neenakost: vsota poljubnih dveh stranic mora biti večja od tretje. Dovolj je preveriti najdaljšo stranico (${Math.max(a, b, c)} cm): vsota ostalih je ${a + b + c - Math.max(a, b, c)} cm, kar ${ob ? "je" : "ni"} več.</p>` });
  });
  serija("vrsta", 4, (r) => {
    const [a, b, c] = r.izberi([[3, 4, 5], [5, 12, 13], [4, 5, 6], [2, 3, 4], [6, 8, 10], [5, 6, 9], [7, 8, 9], [3, 5, 7]]);
    const s = c * c - a * a - b * b;
    const vrsta = s === 0 ? "pravokoten" : s > 0 ? "topokoten" : "ostrokoten";
    return izbira({ tezavnost: 3, r, besedilo: `Trikotnik ima stranice ${a}, ${b} in ${c}. Kakšen je glede na kote?`, pravilna: vrsta, napacne: ["pravokoten", "topokoten", "ostrokoten"].filter((x) => x !== vrsta), postopek: `<p>Primerjamo kvadrat najdaljše stranice z vsoto kvadratov ostalih: \\(${c}^2 = ${c * c}\\), \\(${a}^2 + ${b}^2 = ${a * a + b * b}\\).</p><p>${s === 0 ? "Enaka: pravokoten." : s > 0 ? "Kvadrat najdaljše je večji: topokoten." : "Kvadrat najdaljše je manjši: ostrokoten."}</p>` });
  });

  // 4. Pitagorov izrek
  serija("pitagora", 8, (r, i) => {
    const [a, b, c] = r.izberi([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29], [12, 16, 20]]).map((x) => x * r.izberi([1, 1, 2]));
    const v = i % 4;
    if (v === 0) return stevilo({ tezavnost: 1, vrednost: c, enota: "cm", besedilo: `Kateti pravokotnega trikotnika merita ${a} cm in ${b} cm. Koliko meri hipotenuza?`, rezultat: `${c} cm`, postopek: `<p>\\(c = \\sqrt{a^2 + b^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${c * c}} = ${c}\\) cm</p>` });
    if (v === 1) return stevilo({ tezavnost: 1, vrednost: b, enota: "cm", besedilo: `Hipotenuza pravokotnega trikotnika meri ${c} cm, ena kateta ${a} cm. Koliko meri druga kateta?`, rezultat: `${b} cm`, postopek: `<p>\\(b = \\sqrt{c^2 - a^2} = \\sqrt{${c * c} - ${a * a}} = ${b}\\) cm</p>` });
    if (v === 2) { const d = Math.hypot(a, b); return stevilo({ tezavnost: 2, vrednost: d, enota: "cm", besedilo: `Pravokotnik ima stranici ${a} cm in ${b} cm. Kolikšna je diagonala?`, rezultat: `${T(d, 2)} cm`, postopek: `<p>Diagonala je hipotenuza trikotnika s katetama ${a} in ${b}: \\(d = \\sqrt{${a * a} + ${b * b}} = ${L(d)}\\) cm.</p>` }); }
    const s = 2 * r.int(3, 9);
    const vis = (s * Math.sqrt(3)) / 2;
    return stevilo({ tezavnost: 2, vrednost: vis, enota: "cm", besedilo: `Kolikšna je višina enakostraničnega trikotnika s stranico ${s} cm? (Na dve decimalki.)`, rezultat: `\\(v = ${s / 2}\\sqrt{3} \\approx ${L(vis)}\\) cm`, postopek: `<p>Višina razpolovi stranico: \\(v = \\sqrt{${s}^2 - ${s / 2}^2} = \\sqrt{${s * s - (s * s) / 4}} = ${s / 2}\\sqrt3 \\approx ${L(vis)}\\) cm.</p>` });
  });
  serija("evklid", 5, (r, i) => {
    const p = r.int(2, 9), q = r.int(2, 9);
    if (i % 2 === 0) { const v = Math.sqrt(p * q); return stevilo({ tezavnost: 3, vrednost: v, enota: "cm", besedilo: `Višina na hipotenuzo deli hipotenuzo pravokotnega trikotnika na odseka ${p} cm in ${q} cm. Kolikšna je višina? (Na dve decimalki.)`, rezultat: `${T(v, 2)} cm`, postopek: `<p>Višinski izrek: \\(v_c^2 = p \\cdot q = ${p * q}\\), \\(v_c = \\sqrt{${p * q}} \\approx ${L(v)}\\) cm.</p>` }); }
    const a = Math.sqrt(p * (p + q));
    return stevilo({ tezavnost: 3, vrednost: a, enota: "cm", besedilo: `Hipotenuza pravokotnega trikotnika meri ${p + q} cm. Pravokotna projekcija katete \\(a\\) na hipotenuzo meri ${p} cm. Kolikšna je kateta \\(a\\)? (Na dve decimalki.)`, rezultat: `${T(a, 2)} cm`, postopek: `<p>Evklidov izrek: \\(a^2 = c \\cdot a_1 = ${p + q} \\cdot ${p} = ${p * (p + q)}\\), \\(a = \\sqrt{${p * (p + q)}} \\approx ${L(a)}\\) cm.</p>` });
  });

  // 5. Podobnost
  serija("podobnost", 8, (r, i) => {
    const a = r.int(3, 9), b = r.int(4, 12), k = r.izberi([1.5, 2, 2.5, 3, 4]);
    if (i % 2 === 0) return stevilo({ tezavnost: 2, vrednost: b * k, enota: "cm", besedilo: `Trikotnika sta podobna. Stranici prvega merita ${a} cm in ${b} cm, istoležna stranica k prvi (${a} cm) v drugem trikotniku pa ${T(a * k)} cm. Koliko meri v drugem trikotniku stranica, istoležna stranici ${b} cm?`, rezultat: `${T(b * k)} cm`, postopek: `<p>Razmerje podobnosti: \\(k = \\frac{${L(a * k)}}{${a}} = ${L(k)}\\).</p><p>\\(${b} \\cdot ${L(k)} = ${L(b * k)}\\) cm</p>` });
    const P = r.int(5, 40);
    return stevilo({ tezavnost: 3, vrednost: P * k * k, enota: "cm²", besedilo: `Lik ima ploščino ${P} cm². Vse njegove dolžine povečamo s faktorjem ${T(k)}. Kolikšna je ploščina povečanega lika?`, rezultat: `${T(P * k * k)} cm²`, postopek: `<p>Pri podobnosti se ploščina spremeni s kvadratom razmerja: \\(P' = k^2 P = ${L(k * k)} \\cdot ${P} = ${L(P * k * k)}\\) cm².</p>` });
  });
  serija("merilo", 4, (r) => {
    const m = r.izberi([10000, 25000, 50000, 100000]), d = r.int(2, 15) + r.izberi([0, 0.5]);
    const km = (d * m) / 100000;
    return stevilo({ tezavnost: 2, vrednost: km, enota: "km", besedilo: `Na zemljevidu v merilu 1 : ${m.toLocaleString("sl-SI")} sta kraja oddaljena ${T(d)} cm. Kolikšna je dejanska razdalja v km?`, rezultat: `${T(km)} km`, postopek: `<p>\\(${L(d)} \\text{ cm} \\cdot ${m} = ${L(d * m)} \\text{ cm} = ${L(km)}\\) km</p>` });
  });

  // 6. Krožnica: središčni in obodni kot, Tales, tetiva
  serija("obodni", 6, (r, i) => {
    const a = 2 * r.int(15, 85);
    if (i % 3 === 0) return stevilo({ tezavnost: 2, vrednost: a / 2, enota: "°", besedilo: `Središčni kot nad tetivo meri ${a}°. Koliko meri obodni kot nad isto tetivo (na isti strani tetive kot središče)?`, rezultat: `${a / 2}°`, postopek: `<p>Obodni kot je polovica središčnega kota nad istim lokom: \\(${a}° : 2 = ${a / 2}°\\).</p>` });
    if (i % 3 === 1) return stevilo({ tezavnost: 2, vrednost: 90, enota: "°", besedilo: `Daljica \\(AB\\) je premer krožnice, točka \\(C\\) leži na krožnici. Koliko meri kot \\(\\angle ACB\\), če je \\(\\angle CAB = ${a / 2 > 89 ? 40 : a / 2}°\\)?`, rezultat: `90°`, postopek: `<p>Talesov izrek: obodni kot nad premerom je pravi kot, ne glede na ostale kote.</p>` });
    const b = a / 2;
    return stevilo({ tezavnost: 3, vrednost: 180 - b, enota: "°", besedilo: `Štirikotnik \\(ABCD\\) je tetiven. Kot pri oglišču \\(A\\) meri ${b}°. Koliko meri kot pri oglišču \\(C\\)?`, rezultat: `${180 - b}°`, postopek: `<p>V tetivnem štirikotniku sta nasprotna kota suplementarna: \\(\\gamma = 180° - ${b}° = ${180 - b}°\\).</p>` });
  });
  serija("tetiva", 5, (r, i) => {
    const [d, h, rr] = r.izberi([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15]]);
    if (i % 2 === 0) return stevilo({ tezavnost: 3, vrednost: 2 * h, enota: "cm", besedilo: `Krožnica ima polmer ${rr} cm. Tetiva je od središča oddaljena ${d} cm. Kako dolga je tetiva?`, rezultat: `${2 * h} cm`, postopek: `<p>Pravokotnica iz središča razpolovi tetivo: \\(\\frac{t}{2} = \\sqrt{${rr}^2 - ${d}^2} = ${h}\\), \\(t = ${2 * h}\\) cm.</p>` });
    return stevilo({ tezavnost: 3, vrednost: h, enota: "cm", besedilo: `Iz točke \\(T\\), ki je ${rr} cm oddaljena od središča krožnice s polmerom ${d} cm, potegnemo tangento. Kako dolg je tangentni odsek?`, rezultat: `${h} cm`, postopek: `<p>Tangenta je pravokotna na polmer v dotikališču: \\(t = \\sqrt{${rr}^2 - ${d}^2} = ${h}\\) cm.</p>` });
  });

  // 7. Sinusni in kosinusni izrek
  serija("sinusni", 5, (r) => {
    const a = r.int(5, 15), al = r.int(30, 80), be = r.int(30, 80);
    if (al + be >= 170) return null;
    const b = (a * Math.sin(rad(be))) / Math.sin(rad(al));
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(b, 2), toleranca: 0.02, enota: "cm", besedilo: `V trikotniku je \\(a = ${a}\\) cm, \\(\\alpha = ${al}°\\) in \\(\\beta = ${be}°\\). Izračunaj stranico \\(b\\) na dve decimalki.`, rezultat: `${T(b, 2)} cm`, postopek: `<p>Sinusni izrek: \\(\\frac{b}{\\sin\\beta} = \\frac{a}{\\sin\\alpha}\\).</p><p>\\(b = \\frac{${a} \\cdot \\sin ${be}°}{\\sin ${al}°} \\approx ${L(b)}\\) cm</p>` });
  });
  serija("kosinusni", 6, (r, i) => {
    const a = r.int(4, 12), b = r.int(4, 12), g = r.izberi([30, 45, 60, 75, 100, 120, 135]);
    if (i % 2 === 0) { const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(g))); return stevilo({ tezavnost: 3, vrednost: zaokrozi(c, 2), toleranca: 0.02, enota: "cm", besedilo: `V trikotniku je \\(a = ${a}\\) cm, \\(b = ${b}\\) cm in \\(\\gamma = ${g}°\\). Izračunaj stranico \\(c\\) na dve decimalki.`, rezultat: `${T(c, 2)} cm`, postopek: `<p>Kosinusni izrek: \\(c^2 = a^2 + b^2 - 2ab\\cos\\gamma = ${a * a} + ${b * b} - 2 \\cdot ${a} \\cdot ${b} \\cdot \\cos ${g}° \\approx ${L(c * c)}\\).</p><p>\\(c \\approx ${L(c)}\\) cm</p>` }); }
    const [x, y, w] = r.izberi([[5, 7, 8], [4, 5, 6], [6, 7, 9], [7, 8, 13], [3, 5, 7]]);
    const k = deg(Math.acos((x * x + y * y - w * w) / (2 * x * y)));
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(k, 2), toleranca: 0.05, enota: "°", besedilo: `Trikotnik ima stranice \\(a = ${x}\\), \\(b = ${y}\\), \\(c = ${w}\\). Izračunaj kot \\(\\gamma\\) na dve decimalki.`, rezultat: `${T(k, 2)}°`, postopek: `<p>\\(\\cos\\gamma = \\frac{a^2 + b^2 - c^2}{2ab} = \\frac{${x * x} + ${y * y} - ${w * w}}{${2 * x * y}} = ${L((x * x + y * y - w * w) / (2 * x * y), 4)}\\)</p><p>\\(\\gamma \\approx ${L(k)}°\\)</p>` });
  });

  // 8. Višja raven: ploščina iz dveh stranic in kota, polmer očrtanega kroga
  serija("visja", 6, (r, i) => {
    const a = r.int(5, 14), b = r.int(5, 14), g = r.izberi([30, 45, 60, 120, 135, 150]);
    if (i % 2 === 0) { const P = 0.5 * a * b * Math.sin(rad(g)); return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(P, 2), toleranca: 0.02, enota: "cm²", besedilo: `Trikotnik ima stranici ${a} cm in ${b} cm, kot med njima pa meri ${g}°. Izračunaj ploščino na dve decimalki.`, rezultat: `${T(P, 2)} cm²`, postopek: `<p>\\(P = \\frac12 ab\\sin\\gamma = \\frac12 \\cdot ${a} \\cdot ${b} \\cdot \\sin ${g}° \\approx ${L(P)}\\) cm²</p>` }); }
    const R = a / (2 * Math.sin(rad(g)));
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(R, 2), toleranca: 0.02, enota: "cm", besedilo: `V trikotniku meri stranica \\(a = ${a}\\) cm, nasproti ležeči kot pa \\(\\alpha = ${g}°\\). Kolikšen je polmer trikotniku očrtanega kroga? (Na dve decimalki.)`, rezultat: `${T(R, 2)} cm`, postopek: `<p>Sinusni izrek: \\(\\frac{a}{\\sin\\alpha} = 2R\\), zato \\(R = \\frac{${a}}{2\\sin ${g}°} \\approx ${L(R)}\\) cm.</p>` });
  });
}
