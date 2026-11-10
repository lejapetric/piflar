import { stevilo, izbira, T, L, zaokrozi } from "../lib.mjs";

const vs = (a) => a.reduce((s, x) => s + x, 0);
const pov = (a) => vs(a) / a.length;
const med = (a) => { const b = [...a].sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const odk = (a) => { const m = pov(a); return Math.sqrt(vs(a.map((x) => (x - m) ** 2)) / a.length); };
const niz = (a) => a.join(", ");

export default function ({ serija }) {
  const podatki = (r, n, a = 1, b = 20) => Array.from({ length: n }, () => r.int(a, b));
  serija("povprecje", 7, (r) => {
    const a = podatki(r, r.int(5, 9));
    return stevilo({ tezavnost: 1, vrednost: zaokrozi(pov(a), 4), toleranca: 0.01, besedilo: `Izračunaj aritmetično sredino podatkov: ${niz(a)}. (Na dve decimalki.)`, rezultat: `${T(pov(a), 2)}`, postopek: `<p>\\(\\bar{x} = \\frac{${a.join(" + ")}}{${a.length}} = \\frac{${vs(a)}}{${a.length}} \\approx ${L(pov(a), 2)}\\)</p>` });
  });
  serija("mediana", 7, (r) => {
    const a = podatki(r, r.int(5, 10));
    const b = [...a].sort((x, y) => x - y);
    return stevilo({ tezavnost: 1, vrednost: med(a), besedilo: `Določi mediano podatkov: ${niz(a)}.`, rezultat: `${T(med(a), 1)}`, postopek: `<p>Uredimo po velikosti: ${niz(b)}.</p><p>${b.length % 2 ? `Liho število podatkov (${b.length}), mediana je srednji: ${med(a)}.` : `Sodo število podatkov (${b.length}), mediana je povprečje srednjih dveh: \\(\\frac{${b[b.length / 2 - 1]} + ${b[b.length / 2]}}{2} = ${L(med(a), 1)}\\).`}</p>` });
  });
  serija("modus", 4, (r) => {
    const m = r.int(1, 9), a = r.premesaj([m, m, m, ...[...new Set(podatki(r, 6, 1, 9))].filter((x) => x !== m).slice(0, 5)]);
    return stevilo({ tezavnost: 1, vrednost: m, besedilo: `Določi modus podatkov: ${niz(a)}.`, rezultat: `${m}`, postopek: `<p>Modus je najpogostejša vrednost: ${m} se pojavi trikrat.</p>` });
  });
  serija("razpon", 4, (r) => {
    const a = podatki(r, r.int(6, 10), -10, 30);
    return stevilo({ tezavnost: 1, vrednost: Math.max(...a) - Math.min(...a), besedilo: `Izmerjene temperature (v °C): ${niz(a)}. Kolikšen je variacijski razmik?`, rezultat: `${Math.max(...a) - Math.min(...a)} °C`, postopek: `<p>\\(R = x_{\\max} - x_{\\min} = ${Math.max(...a)} - ${Math.min(...a) < 0 ? `(${Math.min(...a)})` : Math.min(...a)} = ${Math.max(...a) - Math.min(...a)}\\)</p>` });
  });
  serija("odklon", 6, (r) => {
    const a = podatki(r, r.int(4, 6), 1, 12);
    const m = pov(a), s = odk(a);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(s, 4), toleranca: 0.01, besedilo: `Izračunaj standardni odklon \\(\\sigma\\) podatkov ${niz(a)} (populacija, deli z \\(N\\); na dve decimalki).`, rezultat: `\\(\\sigma \\approx ${L(s, 2)}\\)`, postopek: `<p>\\(\\bar{x} = ${L(m, 3)}\\)</p><p>\\(\\sigma^2 = \\frac{1}{${a.length}}\\sum (x_i - \\bar{x})^2 = ${L(s * s, 3)}\\), \\(\\sigma \\approx ${L(s, 2)}\\)</p>` });
  });
  serija("varianca", 4, (r) => {
    const a = podatki(r, r.int(4, 6), 1, 10);
    const s2 = odk(a) ** 2;
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(s2, 4), toleranca: 0.01, besedilo: `Izračunaj varianco podatkov ${niz(a)} (deli z \\(N\\); na dve decimalki).`, rezultat: `${T(s2, 2)}`, postopek: `<p>\\(\\bar{x} = ${L(pov(a), 3)}\\). Odklone kvadriramo in povprečimo: \\(\\sigma^2 = \\frac{${a.map((x) => `(${x} - ${L(pov(a), 2)})^2`).join(" + ")}}{${a.length}} \\approx ${L(s2, 2)}\\)</p>` });
  });
  serija("frekvence", 6, (r) => {
    const vr = [1, 2, 3, 4, 5], f = vr.map(() => r.int(1, 9));
    const n = vs(f), m = vs(vr.map((x, i) => x * f[i])) / n;
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(m, 4), toleranca: 0.01, besedilo: `Ocene na preizkusu: ocena 1 — ${f[0]}×, 2 — ${f[1]}×, 3 — ${f[2]}×, 4 — ${f[3]}×, 5 — ${f[4]}×. Kolikšna je povprečna ocena? (Na dve decimalki.)`, rezultat: `${T(m, 2)}`, postopek: `<p>\\(\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i} = \\frac{${vr.map((x, i) => `${f[i]} \\cdot ${x}`).join(" + ")}}{${n}} = \\frac{${vs(vr.map((x, i) => x * f[i]))}}{${n}} \\approx ${L(m, 2)}\\)</p>` });
  });
  serija("relativna", 4, (r) => {
    const f = [r.int(2, 15), r.int(2, 15), r.int(2, 15), r.int(2, 15)], i = r.int(0, 3), n = vs(f);
    const ime = ["košarka", "nogomet", "odbojka", "rokomet"];
    const v = (100 * f[i]) / n;
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(v, 2), toleranca: 0.1, enota: "%", besedilo: `Anketa o najljubšem športu: košarka ${f[0]}, nogomet ${f[1]}, odbojka ${f[2]}, rokomet ${f[3]}. Kolikšna je relativna frekvenca za ${ime[i]} v odstotkih? (Na eno decimalko.)`, rezultat: `${T(v, 1)} %`, postopek: `<p>\\(f_r = \\frac{${f[i]}}{${n}} \\approx ${L(f[i] / n, 4)} = ${L(v, 1)}\\,\\%\\)</p>` });
  });
  serija("krozni", 4, (r) => {
    const n = r.izberi([20, 30, 36, 40, 60, 90, 120]), k = r.int(1, n - 1);
    const kot = (360 * k) / n;
    return stevilo({ tezavnost: 2, vrednost: zaokrozi(kot, 2), toleranca: 0.1, enota: "°", besedilo: `V razredu je ${n} dijakov, ${k} jih hodi v šolo peš. Kolikšen središčni kot pripada tej skupini v strukturnem krogu?`, rezultat: `${T(kot, 1)}°`, postopek: `<p>\\(\\alpha = \\frac{${k}}{${n}} \\cdot 360° = ${L(kot, 1)}°\\)</p>` });
  });
  serija("manjkajoci", 5, (r) => {
    const a = podatki(r, r.int(4, 6)), x = r.int(1, 20), n = a.length + 1, m = (vs(a) + x) / n;
    if (!Number.isInteger(m * 2)) return null;
    return stevilo({ tezavnost: 3, vrednost: x, besedilo: `Podatki so ${niz(a)} in \\(x\\). Njihova aritmetična sredina je ${L(m, 1)}. Koliko je \\(x\\)?`, rezultat: `\\(x = ${x}\\)`, postopek: `<p>Vsota vseh ${n} podatkov je \\(${n} \\cdot ${L(m, 1)} = ${vs(a) + x}\\).</p><p>\\(x = ${vs(a) + x} - ${vs(a)} = ${x}\\)</p>` });
  });
  serija("dodaj", 4, (r) => {
    const n = r.int(10, 30), m = r.int(50, 90) / 10, x = r.int(1, 10);
    const nov = (n * m + x) / (n + 1);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(nov, 4), toleranca: 0.01, besedilo: `Povprečje ${n} podatkov je ${L(m, 1)}. Dodamo še podatek ${x}. Kolikšno je novo povprečje? (Na dve decimalki.)`, rezultat: `${T(nov, 2)}`, postopek: `<p>Stara vsota: \\(${n} \\cdot ${L(m, 1)} = ${L(n * m, 1)}\\). Nova: \\(${L(n * m + x, 1)}\\).</p><p>\\(\\bar{x}' = \\frac{${L(n * m + x, 1)}}{${n + 1}} \\approx ${L(nov, 2)}\\)</p>` });
  });
  serija("kvartili", 4, (r) => {
    const a = podatki(r, r.izberi([7, 11]), 1, 40).sort((x, y) => x - y);
    const n = a.length, sp = a.slice(0, (n - 1) / 2), zg = a.slice((n + 1) / 2);
    const q1 = med(sp), q3 = med(zg);
    return stevilo({ tezavnost: 3, vrednost: q3 - q1, besedilo: `Urejeni podatki: ${niz(a)}. Izračunaj medkvartilni razmik \\(Q_3 - Q_1\\) (kvartila sta mediani spodnje in zgornje polovice, brez mediane).`, rezultat: `\\(${L(q3, 1)} - ${L(q1, 1)} = ${L(q3 - q1, 1)}\\)`, postopek: `<p>Mediana: ${med(a)}. Spodnja polovica ${niz(sp)}: \\(Q_1 = ${L(q1, 1)}\\). Zgornja ${niz(zg)}: \\(Q_3 = ${L(q3, 1)}\\).</p><p>\\(Q_3 - Q_1 = ${L(q3 - q1, 1)}\\)</p>` });
  });
  serija("vpliv", 4, (r) => {
    const k = r.int(2, 5), d = r.int(1, 10);
    const [vpr, prav, nap, raz] = r.izberi([
      [`Vsem podatkom prištejemo ${d}. Kaj se zgodi s standardnim odklonom?`, "ostane enak", ["poveča se za " + d, `poveča se ${d}-krat`, "zmanjša se"], "Premik vseh podatkov ne spremeni razpršenosti."],
      [`Vse podatke pomnožimo s ${k}. Kaj se zgodi s standardnim odklonom?`, `poveča se ${k}-krat`, ["ostane enak", `poveča se ${k * k}-krat`, `poveča se za ${k}`], `Odkloni od povprečja se ${k}-krat povečajo, zato tudi \\(\\sigma\\).`],
      [`Vse podatke pomnožimo s ${k}. Kaj se zgodi z varianco?`, `poveča se ${k * k}-krat`, ["ostane enaka", `poveča se ${k}-krat`, `poveča se za ${k * k}`], `Varianca je kvadrat odklona: \\(${k}^2 = ${k * k}\\).`],
      [`Vsem podatkom prištejemo ${d}. Kaj se zgodi z aritmetično sredino?`, `poveča se za ${d}`, ["ostane enaka", `poveča se ${d}-krat`, `zmanjša se za ${d}`], "Povprečje se premakne skupaj s podatki."],
    ]);
    return izbira({ r, tezavnost: 2, besedilo: vpr, pravilna: prav, napacne: nap, postopek: `<p>${raz}</p>` });
  });
  serija("pojmi", 4, (r) => {
    const [vpr, prav, nap, raz] = r.izberi([
      ["Katera srednja vrednost je najmanj občutljiva na osamelce (ekstremne vrednosti)?", "mediana", ["aritmetična sredina", "razpon", "varianca"], "Mediana je odvisna le od položaja srednjega podatka."],
      ["Kateri diagram je najprimernejši za prikaz deležev celote?", "strukturni krog", ["razsevni diagram", "škatla z brki", "linijski diagram"], "Strukturni krog prikazuje, kolikšen del celote predstavlja posamezna kategorija."],
      ["Kateri podatek je opisna (kategorialna) spremenljivka?", "barva oči", ["telesna višina", "število bratov", "temperatura"], "Barva oči nima številske vrednosti."],
      ["Kaj prikazuje škatla z brki?", "minimum, kvartile, mediano in maksimum", ["samo povprečje", "frekvence posameznih vrednosti", "korelacijo dveh spremenljivk"], "Škatla z brki je petštevilski povzetek."],
      ["Kateri diagram uporabimo za prikaz povezanosti dveh številskih spremenljivk?", "razsevni diagram", ["strukturni krog", "histogram", "stolpčni diagram"], "Vsak par vrednosti je točka v ravnini."],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: vpr, pravilna: prav, napacne: nap, postopek: `<p>${raz}</p>` });
  });
  serija("visja-dve-skupini", 3, (r) => {
    const n1 = r.int(10, 25), n2 = r.int(10, 25), m1 = r.int(30, 45) / 10, m2 = r.int(30, 45) / 10;
    const m = (n1 * m1 + n2 * m2) / (n1 + n2);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(m, 4), toleranca: 0.01, besedilo: `V razredu A je ${n1} dijakov s povprečno oceno ${L(m1, 1)}, v razredu B ${n2} dijakov s povprečjem ${L(m2, 1)}. Kolikšno je skupno povprečje? (Na dve decimalki.)`, rezultat: `${T(m, 2)}`, postopek: `<p>Tehtano povprečje: \\(\\frac{${n1} \\cdot ${L(m1, 1)} + ${n2} \\cdot ${L(m2, 1)}}{${n1 + n2}} \\approx ${L(m, 2)}\\)</p>` });
  });
  serija("visja-zscore", 3, (r) => {
    const m = r.int(50, 80), s = r.int(5, 12), k = r.izberi([-2, -1, 1, 2, 1.5, -1.5]);
    const x = m + k * s;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: k, toleranca: 0.01, besedilo: `Rezultati testa imajo povprečje ${m} točk in standardni odklon ${s}. Kolikšna je standardizirana vrednost \\(z\\) za rezultat ${L(x, 1)} točk?`, rezultat: `\\(z = ${L(k, 1)}\\)`, postopek: `<p>\\(z = \\frac{x - \\bar{x}}{\\sigma} = \\frac{${L(x, 1)} - ${m}}{${s}} = ${L(k, 1)}\\)</p>` });
  });
  serija("visja-normalna", 3, (r) => {
    const m = r.int(160, 180), s = r.int(5, 10), k = r.izberi([1, 2, 3]);
    const p = { 1: 68.27, 2: 95.45, 3: 99.73 }[k];
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: p, toleranca: 0.5, enota: "%", besedilo: `Višina odraslih je normalno porazdeljena s \\(\\mu = ${m}\\) cm in \\(\\sigma = ${s}\\) cm. Približno kolikšen odstotek ljudi je visokih med ${m - k * s} in ${m + k * s} cm?`, rezultat: `približno ${T(p, 1)} %`, postopek: `<p>Interval je \\(\\mu \\pm ${k}\\sigma\\). Po pravilu 68–95–99,7 je v njem približno ${T(p, 1)} % vrednosti.</p>` });
  });
}
