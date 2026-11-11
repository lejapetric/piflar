import { stevilo, izbira, T, L, zaokrozi, ulomek } from "../lib.mjs";

const fak = (n) => (n <= 1 ? 1 : n * fak(n - 1));
const C = (n, k) => (k < 0 || k > n ? 0 : Math.round(fak(n) / (fak(k) * fak(n - k))));
const U = (s, i) => `\\(${ulomek(s, i)}\\)`;
const ver = (o) => ({ ...o, toleranca: 0.005 }); // verjetnosti vpisujemo kot decimalno število ali ulomek

export default function ({ serija }) {
  serija("kocka", 7, (r) => {
    const [opis, ugodni] = r.izberi([
      ["pade sodo število pik", [2, 4, 6]], ["pade več kot 4 pike", [5, 6]], ["pade praštevilo", [2, 3, 5]],
      ["pade šestica", [6]], ["pade največ 2 piki", [1, 2]], ["pade število, deljivo s 3", [3, 6]], ["ne pade enica", [2, 3, 4, 5, 6]],
    ]);
    const m = ugodni.length;
    return stevilo(ver({ tezavnost: 1, vrednost: m / 6, besedilo: `Vržemo pošteno igralno kocko. Kolikšna je verjetnost, da ${opis}? (Vpiši ulomek ali decimalno število.)`, rezultat: U(m, 6), postopek: `<p>Ugodni izidi: ${ugodni.join(", ")} (${m}), vseh izidov je 6.</p><p>\\(P = \\frac{${m}}{6} = ${ulomek(m, 6)}\\)</p>` }));
  });
  serija("dve-kocki", 6, (r) => {
    const s = r.int(2, 12);
    const m = 6 - Math.abs(7 - s);
    return stevilo(ver({ tezavnost: 2, vrednost: m / 36, besedilo: `Vržemo dve pošteni kocki. Kolikšna je verjetnost, da je vsota pik ${s}?`, rezultat: U(m, 36), postopek: `<p>Vseh parov je \\(6 \\cdot 6 = 36\\). Pari z vsoto ${s}: ${Array.from({ length: 6 }, (_, a) => a + 1).filter((a) => s - a >= 1 && s - a <= 6).map((a) => `(${a}, ${s - a})`).join(", ")} — ${m}.</p><p>\\(P = \\frac{${m}}{36} = ${ulomek(m, 36)}\\)</p>` }));
  });
  serija("kroglice", 6, (r) => {
    const b = r.int(2, 9), c = r.int(2, 9), m = r.int(1, 6), n = b + c + m;
    const [ime, k] = r.izberi([["belo", b], ["črno", c], ["modro", m]]);
    return stevilo(ver({ tezavnost: 1, vrednost: k / n, besedilo: `V posodi je ${b} belih, ${c} črnih in ${m} modrih kroglic. Na slepo izvlečemo eno. Kolikšna je verjetnost, da je ${ime}?`, rezultat: U(k, n), postopek: `<p>\\(P = \\frac{\\text{ugodni}}{\\text{vsi}} = \\frac{${k}}{${n}}${ulomek(k, n) !== `\\frac{${k}}{${n}}` ? ` = ${ulomek(k, n)}` : ""}\\)</p>` }));
  });
  serija("dve-kroglici", 6, (r, i) => {
    const b = r.int(2, 7), c = r.int(2, 7), n = b + c;
    if (i % 2) {
      // brez vračanja, obe beli
      const s = b * (b - 1), im = n * (n - 1);
      return stevilo(ver({ tezavnost: 3, vrednost: s / im, besedilo: `V posodi je ${b} belih in ${c} črnih kroglic. Brez vračanja izvlečemo dve. Kolikšna je verjetnost, da sta obe beli?`, rezultat: U(s, im), postopek: `<p>\\(P = \\frac{${b}}{${n}} \\cdot \\frac{${b - 1}}{${n - 1}} = ${ulomek(s, im)}\\)</p><p>(Ali s kombinacijami: \\(\\frac{\\binom{${b}}{2}}{\\binom{${n}}{2}}\\).)</p>` }));
    }
    const s = 2 * b * c, im = n * n;
    return stevilo(ver({ tezavnost: 3, vrednost: s / im, besedilo: `V posodi je ${b} belih in ${c} črnih kroglic. Z vračanjem izvlečemo dve. Kolikšna je verjetnost, da sta različnih barv?`, rezultat: U(s, im), postopek: `<p>Dve možnosti: bela–črna ali črna–bela.</p><p>\\(P = \\frac{${b}}{${n}} \\cdot \\frac{${c}}{${n}} + \\frac{${c}}{${n}} \\cdot \\frac{${b}}{${n}} = ${ulomek(s, im)}\\)</p>` }));
  });
  serija("nasprotni", 5, (r) => {
    const p = r.int(5, 95);
    return stevilo(ver({ tezavnost: 1, vrednost: (100 - p) / 100, besedilo: `Verjetnost, da bo jutri deževalo, je ${L(p / 100, 2)}. Kolikšna je verjetnost, da jutri ne bo deževalo?`, rezultat: `${T((100 - p) / 100, 2)}`, postopek: `<p>Nasprotni dogodek: \\(P(\\bar{A}) = 1 - P(A) = 1 - ${L(p / 100, 2)} = ${L((100 - p) / 100, 2)}\\).</p>` }));
  });
  serija("vsota", 5, (r) => {
    const a = r.int(1, 5) / 10, b = r.int(1, 4) / 10, ab = r.int(0, Math.min(a, b) * 10) / 10;
    const v = a + b - ab;
    return stevilo(ver({ tezavnost: 2, vrednost: zaokrozi(v, 4), besedilo: `Velja \\(P(A) = ${L(a, 1)}\\), \\(P(B) = ${L(b, 1)}\\) in \\(P(A \\cap B) = ${L(ab, 1)}\\). Izračunaj \\(P(A \\cup B)\\).`, rezultat: `${T(v, 2)}`, postopek: `<p>\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = ${L(a, 1)} + ${L(b, 1)} - ${L(ab, 1)} = ${L(v, 2)}\\)</p>` }));
  });
  serija("neodvisni", 5, (r) => {
    const a = r.int(1, 9) / 10, b = r.int(1, 9) / 10;
    const kaj = r.izberi(["oba", "vsaj"]);
    const v = kaj === "oba" ? a * b : 1 - (1 - a) * (1 - b);
    return stevilo(ver({ tezavnost: 2, vrednost: zaokrozi(v, 4), besedilo: `Strelec A zadene tarčo z verjetnostjo ${L(a, 1)}, strelec B pa z ${L(b, 1)}. Neodvisno ustrelita. Kolikšna je verjetnost, da ${kaj === "oba" ? "zadeneta oba" : "tarčo zadene vsaj eden"}?`, rezultat: `${T(v, 2)}`, postopek: kaj === "oba" ? `<p>Neodvisna dogodka: \\(P = ${L(a, 1)} \\cdot ${L(b, 1)} = ${L(v, 2)}\\).</p>` : `<p>Nasprotni dogodek: nihče ne zadene, \\(${L(1 - a, 1)} \\cdot ${L(1 - b, 1)} = ${L((1 - a) * (1 - b), 2)}\\).</p><p>\\(P = 1 - ${L((1 - a) * (1 - b), 2)} = ${L(v, 2)}\\)</p>` }));
  });
  serija("bernoulli", 6, (r, i) => {
    const n = r.int(3, 8), k = r.int(0, n), [p, pt] = r.izberi([[0.5, "\\frac12"], [1 / 6, "\\frac16"], [0.3, "0{,}3"], [0.2, "0{,}2"], [0.4, "0{,}4"]]);
    const v = C(n, k) * p ** k * (1 - p) ** (n - k);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(v, 6), toleranca: 0.0015, besedilo: `Poskus z verjetnostjo uspeha \\(p = ${pt}\\) ponovimo ${n}-krat. Kolikšna je verjetnost natanko ${k} uspehov? (Na tri decimalke.)`, rezultat: `${T(v, 3)}`, postopek: `<p>Bernoullijeva formula: \\(P = \\binom{${n}}{${k}}p^{${k}}(1 - p)^{${n - k}} = ${C(n, k)} \\cdot ${L(p, 4)}^{${k}} \\cdot ${L(1 - p, 4)}^{${n - k}} \\approx ${L(v, 3)}\\)</p>` });
  });
  serija("kovanci", 4, (r) => {
    const n = r.int(2, 6);
    const kaj = r.izberi(["vsaj", "vse"]);
    const v = kaj === "vse" ? 1 / 2 ** n : 1 - 1 / 2 ** n;
    return stevilo(ver({ tezavnost: 2, vrednost: v, besedilo: `Pošten kovanec vržemo ${n}-krat. Kolikšna je verjetnost, da ${kaj === "vse" ? "pade vsakič grb" : "vsaj enkrat pade grb"}?`, rezultat: kaj === "vse" ? U(1, 2 ** n) : U(2 ** n - 1, 2 ** n), postopek: kaj === "vse" ? `<p>\\(P = \\left(\\frac12\\right)^{${n}} = \\frac{1}{${2 ** n}}\\)</p>` : `<p>Nasprotni dogodek je »nikoli grb«: \\(\\frac{1}{${2 ** n}}\\).</p><p>\\(P = 1 - \\frac{1}{${2 ** n}} = \\frac{${2 ** n - 1}}{${2 ** n}}\\)</p>` }));
  });
  serija("pogojna", 5, (r) => {
    const ab = r.int(1, 4) / 10, b = ab + r.int(1, 5) / 10;
    return stevilo(ver({ tezavnost: 3, vrednost: zaokrozi(ab / b, 6), besedilo: `Velja \\(P(A \\cap B) = ${L(ab, 1)}\\) in \\(P(B) = ${L(b, 1)}\\). Izračunaj pogojno verjetnost \\(P(A \\mid B)\\) (na dve decimalki).`, rezultat: `${T(ab / b, 2)}`, postopek: `<p>\\(P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{${L(ab, 1)}}{${L(b, 1)}} \\approx ${L(ab / b, 2)}\\)</p>` }));
  });
  serija("loterija", 4, (r) => {
    const n = r.int(10, 20), k = r.int(2, 4);
    const v = 1 / C(n, k);
    return stevilo({ tezavnost: 3, vrednost: v, toleranca: v * 0.02, besedilo: `V igri izberemo ${k} različna števila od 1 do ${n}. Žreb izbere ${k} števil. Kolikšna je verjetnost, da zadenemo vsa? (Vpiši ulomek.)`, rezultat: U(1, C(n, k)), postopek: `<p>Vseh možnih izbir je \\(\\binom{${n}}{${k}} = ${C(n, k)}\\), ugodna je ena.</p><p>\\(P = \\frac{1}{${C(n, k)}}\\)</p>` });
  });
  serija("hipergeometrijska", 4, (r) => {
    const d = r.int(2, 5), z = r.int(5, 12), k = r.int(2, 3), j = r.int(1, Math.min(k, d));
    const s = C(d, j) * C(z, k - j), im = C(d + z, k);
    return stevilo(ver({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(s / im, 6), besedilo: `Med ${d + z} izdelki jih je ${d} pokvarjenih. Naključno izberemo ${k}. Kolikšna je verjetnost, da je natanko ${j} pokvarjen${j === 1 ? "" : j === 2 ? "a" : "i"}? (Na tri decimalke.)`, rezultat: `\\(${ulomek(s, im)} \\approx ${L(s / im, 3)}\\)`, postopek: `<p>\\(P = \\frac{\\binom{${d}}{${j}}\\binom{${z}}{${k - j}}}{\\binom{${d + z}}{${k}}} = \\frac{${C(d, j)} \\cdot ${C(z, k - j)}}{${im}} \\approx ${L(s / im, 3)}\\)</p>` }));
  });
  serija("geometrijska", 3, (r) => {
    const R = r.int(2, 5), a = 2 * R + r.int(0, 4);
    const v = (Math.PI * R * R) / (a * a);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(v, 6), toleranca: 0.005, besedilo: `V kvadrat s stranico ${a} je včrtan krog s polmerom ${R} (krog leži v kvadratu). Naključno izberemo točko v kvadratu. Kolikšna je verjetnost, da leži v krogu? (Na dve decimalki.)`, rezultat: `${T(v, 2)}`, postopek: `<p>Geometrijska verjetnost: \\(P = \\frac{\\pi \\cdot ${R}^2}{${a}^2} = \\frac{${R * R}\\pi}{${a * a}} \\approx ${L(v, 2)}\\)</p>` });
  });
  serija("popolna", 3, (r) => {
    const pa = r.int(2, 7) / 10, pb = 1 - pa, da = r.int(1, 9) / 100, db = r.int(1, 9) / 100;
    const v = pa * da + pb * db;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 6), toleranca: 0.0015, besedilo: `Tovarna A izdela ${L(pa * 100, 0)} %, tovarna B pa ${L(pb * 100, 0)} % vseh izdelkov. Pri A je pokvarjenih ${L(da * 100, 0)} %, pri B ${L(db * 100, 0)} % izdelkov. Kolikšna je verjetnost, da je naključno izbran izdelek pokvarjen? (Na tri decimalke.)`, rezultat: `${T(v, 3)}`, postopek: `<p>Formula o popolni verjetnosti: \\(P(K) = P(A)P(K \\mid A) + P(B)P(K \\mid B)\\).</p><p>\\(= ${L(pa, 1)} \\cdot ${L(da, 2)} + ${L(pb, 1)} \\cdot ${L(db, 2)} = ${L(v, 4)}\\)</p>` });
  });
  serija("bayes", 3, (r) => {
    const pa = r.int(2, 7) / 10, pb = 1 - pa, da = r.int(1, 9) / 100, db = r.int(1, 9) / 100;
    const v = (pa * da) / (pa * da + pb * db);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 6), toleranca: 0.005, besedilo: `Tovarna A izdela ${L(pa * 100, 0)} %, tovarna B ${L(pb * 100, 0)} % izdelkov. Pri A je pokvarjenih ${L(da * 100, 0)} %, pri B ${L(db * 100, 0)} %. Izbran izdelek je pokvarjen. Kolikšna je verjetnost, da je iz tovarne A? (Na dve decimalki.)`, rezultat: `${T(v, 2)}`, postopek: `<p>Bayesova formula: \\(P(A \\mid K) = \\frac{P(A)P(K \\mid A)}{P(K)} = \\frac{${L(pa * da, 4)}}{${L(pa * da + pb * db, 4)}} \\approx ${L(v, 2)}\\)</p>` });
  });
  serija("pojmi", 4, (r) => {
    const [vpr, prav, nap, raz] = r.izberi([
      ["Kolikšna je verjetnost gotovega dogodka?", "1", ["0", "0,5", "odvisno od poskusa"], "Gotov dogodek se zgodi vedno, zato \\(P = 1\\)."],
      ["Kolikšna je verjetnost nemogočega dogodka?", "0", ["1", "0,5", "−1"], "Nemogoč dogodek se ne zgodi nikoli, zato \\(P = 0\\)."],
      ["Dogodka A in B sta nezdružljiva. Koliko je \\(P(A \\cap B)\\)?", "0", ["\\(P(A)P(B)\\)", "1", "\\(P(A) + P(B)\\)"], "Nezdružljiva dogodka se ne moreta zgoditi hkrati."],
      ["Kdaj sta dogodka A in B neodvisna?", "ko je \\(P(A \\cap B) = P(A)P(B)\\)", ["ko je \\(P(A \\cap B) = 0\\)", "ko je \\(P(A) = P(B)\\)", "ko je \\(P(A) + P(B) = 1\\)"], "To je definicija neodvisnosti."],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: vpr, pravilna: prav, napacne: nap, postopek: `<p>${raz}</p>` });
  });
}
