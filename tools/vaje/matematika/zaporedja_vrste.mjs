import { stevilo, izbira, T, L, zaokrozi, ulomek, polinom } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);

export default function ({ serija }) {
  // ---------- splošno ----------
  serija("clen-formula", 5, (r) => {
    const a = r.nenic(-3, 3), b = r.int(-5, 5), c = r.int(-5, 5), n = r.int(2, 10);
    return stevilo({ tezavnost: 1, vrednost: a * n * n + b * n + c, besedilo: `Zaporedje je dano s splošnim členom \\(a_n = ${polinom([a, b, c], "n")}\\). Izračunaj \\(a_{${n}}\\).`, rezultat: `\\(a_{${n}} = ${a * n * n + b * n + c}\\)`, postopek: `<p>Vstavimo \\(n = ${n}\\): \\(a_{${n}} = ${a} \\cdot ${n * n} ${b < 0 ? "-" : "+"} ${Math.abs(b)} \\cdot ${n} ${c < 0 ? "-" : "+"} ${Math.abs(c)} = ${a * n * n + b * n + c}\\).</p>` });
  });
  serija("rekurzivno", 4, (r) => {
    const a1 = r.int(-3, 5), p = r.izberi([2, -1, 3, -2]), q = r.int(-3, 3);
    const cl = [a1];
    for (let i = 1; i < 5; i++) cl.push(p * cl[i - 1] + q);
    return stevilo({ tezavnost: 2, vrednost: cl[4], besedilo: `Zaporedje je podano rekurzivno: \\(a_1 = ${a1}\\), \\(a_{n+1} = ${p}a_n ${q < 0 ? "-" : "+"} ${Math.abs(q)}\\). Izračunaj \\(a_5\\).`, rezultat: `\\(a_5 = ${cl[4]}\\)`, postopek: `<p>Računamo člen za členom: ${cl.map((x, i) => `\\(a_{${i + 1}} = ${x}\\)`).join(", ")}.</p>` });
  });
  serija("monotonost", 3, (r) => {
    const [f, odg, raz] = r.izberi([["\\frac{n}{n+1}", "naraščajoče", "\\(a_{n+1} - a_n = \\frac{1}{(n+1)(n+2)} > 0\\)"], ["\\frac{1}{n}", "padajoče", "imenovalec raste, ulomek pada"], ["(-1)^n", "ni monotono", "členi izmenično menjajo predznak"], ["n^2 - 10n", "ni monotono", "najprej pada (do \\(n = 5\\)), potem narašča"], ["3 - 2n", "padajoče", "razlika zaporednih členov je \\(-2\\)"], ["2^n", "naraščajoče", "vsak člen je dvakratnik prejšnjega"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšno je zaporedje \\(a_n = ${f}\\)?`, pravilna: odg, napacne: ["naraščajoče", "padajoče", "ni monotono"].filter((x) => x !== odg), postopek: `<p>${raz}, zato je zaporedje ${odg === "ni monotono" ? "nemonotono" : odg}.</p>` });
  });

  // ---------- aritmetično ----------
  serija("ar-clen", 6, (r, i) => {
    const a1 = r.int(-10, 10), d = r.nenic(-6, 6), n = r.int(8, 40);
    return stevilo({ tezavnost: 1, vrednost: a1 + (n - 1) * d, besedilo: `Aritmetično zaporedje ima \\(a_1 = ${a1}\\) in diferenco \\(d = ${d}\\). Izračunaj \\(a_{${n}}\\).`, rezultat: `\\(a_{${n}} = ${a1 + (n - 1) * d}\\)`, postopek: `<p>\\(a_n = a_1 + (n - 1)d = ${a1} + ${n - 1} \\cdot ${okl(d)} = ${a1 + (n - 1) * d}\\)</p>` });
  });
  serija("ar-iz-clenov", 5, (r) => {
    const a1 = r.int(-10, 10), d = r.nenic(-5, 5), m = r.int(2, 5), k = m + r.int(2, 6);
    const am = a1 + (m - 1) * d, ak = a1 + (k - 1) * d;
    const kaj = r.izberi(["d", "a1"]);
    return stevilo({ tezavnost: 2, vrednost: kaj === "d" ? d : a1, besedilo: `V aritmetičnem zaporedju je \\(a_{${m}} = ${am}\\) in \\(a_{${k}} = ${ak}\\). ${kaj === "d" ? "Kolikšna je diferenca?" : "Koliko je \\(a_1\\)?"}`, rezultat: `\\(d = ${d}\\), \\(a_1 = ${a1}\\)`, postopek: `<p>\\(a_{${k}} - a_{${m}} = ${k - m}d\\), torej \\(${ak - am} = ${k - m}d\\), \\(d = ${d}\\).</p><p>\\(a_1 = a_{${m}} - ${m - 1}d = ${am} - ${m - 1} \\cdot ${okl(d)} = ${a1}\\)</p>` });
  });
  serija("ar-vsota", 6, (r) => {
    const a1 = r.int(-10, 15), d = r.nenic(-4, 6), n = r.int(5, 30);
    const S = (n * (2 * a1 + (n - 1) * d)) / 2;
    return stevilo({ tezavnost: 2, vrednost: S, besedilo: `Izračunaj vsoto prvih ${n} členov aritmetičnega zaporedja z \\(a_1 = ${a1}\\) in \\(d = ${d}\\).`, rezultat: `\\(S_{${n}} = ${S}\\)`, postopek: `<p>\\(S_n = \\frac{n}{2}(2a_1 + (n - 1)d) = \\frac{${n}}{2}(${2 * a1} + ${n - 1} \\cdot ${okl(d)}) = ${S}\\)</p>` });
  });
  serija("ar-katero", 4, (r) => {
    const a1 = r.int(-5, 10), d = r.int(2, 7), n = r.int(10, 60), an = a1 + (n - 1) * d;
    return stevilo({ tezavnost: 2, vrednost: n, besedilo: `Kateri člen aritmetičnega zaporedja \\(${a1}, ${a1 + d}, ${a1 + 2 * d}, \\ldots\\) je enak ${an}?`, rezultat: `${n}. člen`, postopek: `<p>\\(d = ${d}\\). \\(${an} = ${a1} + (n - 1) \\cdot ${d}\\), \\(n - 1 = ${n - 1}\\), \\(n = ${n}\\).</p>` });
  });
  serija("ar-besedilna", 4, (r) => {
    const a1 = r.int(5, 20), d = r.int(1, 5), n = r.int(10, 30), S = (n * (2 * a1 + (n - 1) * d)) / 2;
    return stevilo({ tezavnost: 3, vrednost: S, besedilo: `V prvi vrsti dvorane je ${a1} sedežev, v vsaki naslednji ${d} ${d === 1 ? "sedež" : d === 2 ? "sedeža" : d < 5 ? "sedeži" : "sedežev"} več. Koliko sedežev je v dvorani, če ima ${n} vrst?`, rezultat: `${S} sedežev`, postopek: `<p>Aritmetično zaporedje z \\(a_1 = ${a1}\\), \\(d = ${d}\\), \\(n = ${n}\\).</p><p>\\(S_{${n}} = \\frac{${n}}{2}(2 \\cdot ${a1} + ${n - 1} \\cdot ${d}) = ${S}\\)</p>` });
  });
  serija("ar-vsota-stevil", 3, (r) => {
    const k = r.izberi([3, 4, 5, 6, 7]), meja = r.izberi([100, 200, 500]);
    const n = Math.floor(meja / k), S = (k * n * (n + 1)) / 2;
    return stevilo({ tezavnost: 3, vrednost: S, besedilo: `Izračunaj vsoto vseh naravnih števil, manjših ali enakih ${meja}, ki so deljiva s ${k}.`, rezultat: `${S}`, postopek: `<p>Števila \\(${k}, ${2 * k}, \\ldots, ${n * k}\\) tvorijo aritmetično zaporedje z ${n} členi.</p><p>\\(S = \\frac{${n}}{2}(${k} + ${n * k}) = ${S}\\)</p>` });
  });

  // ---------- geometrijsko ----------
  serija("geo-clen", 6, (r) => {
    const a1 = r.nenic(-5, 5), q = r.izberi([2, 3, -2, -3, 2, 0.5]), n = r.int(4, q === 0.5 ? 6 : 8);
    const an = a1 * q ** (n - 1);
    return stevilo({ tezavnost: 1, vrednost: an, besedilo: `Geometrijsko zaporedje ima \\(a_1 = ${a1}\\) in količnik \\(q = ${L(q, 2)}\\). Izračunaj \\(a_{${n}}\\).`, rezultat: `\\(a_{${n}} = ${L(an, 4)}\\)`, postopek: `<p>\\(a_n = a_1 q^{n-1} = ${a1} \\cdot ${okl(L(q, 2))}^{${n - 1}} = ${L(an, 4)}\\)</p>` });
  });
  serija("geo-kolicnik", 5, (r) => {
    const a1 = r.nenic(-4, 4), q = r.izberi([2, 3, -2, -3, 4]), m = r.int(1, 3), k = m + 2;
    const am = a1 * q ** (m - 1), ak = a1 * q ** (k - 1);
    return stevilo({ tezavnost: 2, vrednost: q, besedilo: `V geometrijskem zaporedju je \\(a_{${m}} = ${am}\\) in \\(a_{${k}} = ${ak}\\). Kolikšen je količnik, če je ${q > 0 ? "pozitiven" : "negativen"}?`, rezultat: `\\(q = ${q}\\)`, postopek: `<p>\\(\\frac{a_{${k}}}{a_{${m}}} = q^2 = \\frac{${ak}}{${am}} = ${q * q}\\), \\(q = \\pm ${Math.abs(q)}\\).</p><p>Ker je ${q > 0 ? "pozitiven" : "negativen"}: \\(q = ${q}\\).</p>` });
  });
  serija("geo-vsota", 5, (r) => {
    const a1 = r.nenic(-5, 5), q = r.izberi([2, 3, -2]), n = r.int(4, 8);
    const S = (a1 * (q ** n - 1)) / (q - 1);
    return stevilo({ tezavnost: 2, vrednost: S, besedilo: `Izračunaj vsoto prvih ${n} členov geometrijskega zaporedja z \\(a_1 = ${a1}\\) in \\(q = ${q}\\).`, rezultat: `\\(S_{${n}} = ${S}\\)`, postopek: `<p>\\(S_n = a_1 \\frac{q^n - 1}{q - 1} = ${a1} \\cdot \\frac{${okl(q)}^{${n}} - 1}{${q} - 1} = ${a1} \\cdot \\frac{${q ** n - 1}}{${q - 1}} = ${S}\\)</p>` });
  });
  serija("geo-obresti", 4, (r) => {
    const G = r.int(1, 20) * 500, p = r.izberi([1.5, 2, 2.5, 3, 4]), n = r.int(3, 15);
    const K = G * (1 + p / 100) ** n;
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(K, 2), toleranca: 0.5, enota: "€", besedilo: `Na banko naložimo ${G} € po ${L(p, 1)} % letni obrestni meri z letnim obrestnim obrestovanjem. Koliko imamo po ${n} letih? (Na cent natančno.)`, rezultat: `${T(K, 2)} €`, postopek: `<p>Glavnica vsako leto naraste za faktor \\(r = 1 + \\frac{${L(p, 1)}}{100} = ${L(1 + p / 100, 3)}\\) (geometrijsko zaporedje).</p><p>\\(G_{${n}} = ${G} \\cdot ${L(1 + p / 100, 3)}^{${n}} \\approx ${L(K, 2)}\\) €</p>` });
  });
  serija("geo-vrsta", 6, (r) => {
    const a1 = r.nenic(-9, 9), [s, i] = r.izberi([[1, 2], [1, 3], [-1, 2], [2, 3], [1, 4], [-1, 3], [3, 4]]);
    const q = s / i, S = a1 / (1 - q);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(S, 6), toleranca: 0.01, besedilo: `Izračunaj vsoto neskončne geometrijske vrste z \\(a_1 = ${a1}\\) in \\(q = ${ulomek(s, i)}\\).`, rezultat: `\\(S = ${ulomek(a1 * i, i - s)}\\)`, postopek: `<p>Ker je \\(|q| < 1\\), vrsta konvergira: \\(S = \\frac{a_1}{1 - q} = \\frac{${a1}}{1 - ${okl(ulomek(s, i))}} = ${ulomek(a1 * i, i - s)}\\).</p>` });
  });
  serija("geo-konvergenca", 4, (r) => {
    const [q, odg] = r.izberi([["\\frac{3}{2}", "Ne"], ["-\\frac{1}{2}", "Da"], ["1", "Ne"], ["0{,}9", "Da"], ["-1", "Ne"], ["\\frac{2}{5}", "Da"], ["-\\frac{4}{3}", "Ne"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Ali konvergira neskončna geometrijska vrsta s količnikom \\(q = ${q}\\)?`, pravilna: odg, napacne: [odg === "Da" ? "Ne" : "Da"], postopek: `<p>Geometrijska vrsta konvergira natanko tedaj, ko je \\(|q| < 1\\). Tu je \\(|q| ${odg === "Da" ? "<" : "\\geq"} 1\\).</p>` });
  });
  serija("periodicno", 4, (r) => {
    const d = r.int(1, 98);
    if (d % 11 === 0) return null;
    const dd = String(d).padStart(2, "0");
    return izbira({ r, tezavnost: 3, besedilo: `Zapiši periodično decimalno število \\(0{,}\\overline{${dd}}\\) z okrajšanim ulomkom.`, pravilna: `\\(${ulomek(d, 99)}\\)`, napacne: [`\\(${ulomek(d, 100)}\\)`, `\\(${ulomek(d, 90)}\\)`, `\\(${ulomek(d + 1, 99)}\\)`].filter((x) => x !== `\\(${ulomek(d, 99)}\\)`), postopek: `<p>\\(0{,}\\overline{${dd}} = \\frac{${d}}{100} + \\frac{${d}}{100^2} + \\ldots\\) je geometrijska vrsta z \\(q = \\frac{1}{100}\\).</p><p>\\(S = \\frac{${d}/100}{1 - 1/100} = \\frac{${d}}{99} = ${ulomek(d, 99)}\\)</p>` });
  });
  serija("geo-trije", 3, (r) => {
    const a = r.int(1, 5), q = r.int(2, 4);
    return stevilo({ tezavnost: 3, vrednost: a * q, besedilo: `Števila \\(${a}\\), \\(x\\) in \\(${a * q * q}\\) so zaporedni členi geometrijskega zaporedja s pozitivnimi členi. Koliko je \\(x\\)?`, rezultat: `\\(x = ${a * q}\\)`, postopek: `<p>Srednji člen je geometrijska sredina sosednjih: \\(x^2 = ${a} \\cdot ${a * q * q} = ${a * a * q * q}\\), \\(x = ${a * q}\\).</p>` });
  });
  serija("ar-trije", 3, (r) => {
    const a = r.int(-5, 10), d = r.nenic(-4, 6);
    return stevilo({ tezavnost: 2, vrednost: a + d, besedilo: `Števila \\(${a}\\), \\(x\\) in \\(${a + 2 * d}\\) so zaporedni členi aritmetičnega zaporedja. Koliko je \\(x\\)?`, rezultat: `\\(x = ${a + d}\\)`, postopek: `<p>Srednji člen je aritmetična sredina sosednjih: \\(x = \\frac{${a} + ${okl(a + 2 * d)}}{2} = ${a + d}\\).</p>` });
  });
  serija("limita", 6, (r) => {
    const a = r.nenic(-6, 6), b = r.int(-5, 5), c = r.nenic(1, 5), d = r.int(-5, 5);
    const tip = r.izberi(["enaka", "manjsa"]);
    if (tip === "enaka")
      return stevilo({ tezavnost: 3, vrednost: zaokrozi(a / c, 6), toleranca: 0.005, besedilo: `Izračunaj limito zaporedja \\(a_n = \\frac{${polinom([a, b], "n")}}{${polinom([c, d], "n")}}\\) (na dve decimalki).`, rezultat: `\\(\\lim a_n = ${ulomek(a, c)}\\)`, postopek: `<p>Števec in imenovalec delimo z \\(n\\): \\(a_n = \\frac{${a} ${b < 0 ? "-" : "+"} \\frac{${Math.abs(b)}}{n}}{${c} ${d < 0 ? "-" : "+"} \\frac{${Math.abs(d)}}{n}} \\to \\frac{${a}}{${c}} = ${ulomek(a, c)}\\).</p>` });
    return stevilo({ tezavnost: 3, vrednost: 0, besedilo: `Izračunaj limito zaporedja \\(a_n = \\frac{${polinom([a, b], "n")}}{${polinom([c, 0, d], "n")}}\\).`, rezultat: "0", postopek: `<p>Stopnja imenovalca je večja od stopnje števca, zato gre ulomek proti 0 (delimo z \\(n^2\\)).</p>` });
  });
  serija("visja-limita-e", 3, (r) => {
    const k = r.izberi([1, 2, 3, -1, -2]);
    const v = Math.exp(k);
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(v, 4), toleranca: 0.01, besedilo: `Izračunaj \\(\\lim_{n \\to \\infty} \\left(1 ${k < 0 ? "-" : "+"} \\frac{${Math.abs(k)}}{n}\\right)^n\\) (na dve decimalki).`, rezultat: `\\(e^{${k}} \\approx ${L(v, 2)}\\)`, postopek: `<p>Velja \\(\\lim \\left(1 + \\frac{a}{n}\\right)^n = e^a\\), tu \\(a = ${k}\\): \\(e^{${k}} \\approx ${L(v, 2)}\\).</p>` });
  });
  serija("visja-kombinirano", 3, (r) => {
    // a, a+d, a+2d aritm; a, a+d, a+2d+k geo ... preprosteje: vsota prvih n in a_n
    const a1 = r.int(1, 5), d = r.int(1, 4), n = r.int(5, 12);
    const S = (n * (2 * a1 + (n - 1) * d)) / 2, an = a1 + (n - 1) * d;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: n, besedilo: `Vsota prvih \\(n\\) členov aritmetičnega zaporedja z \\(a_1 = ${a1}\\) in \\(d = ${d}\\) je ${S}. Koliko je \\(n\\)?`, rezultat: `\\(n = ${n}\\)`, postopek: `<p>\\(\\frac{n}{2}(2 \\cdot ${a1} + (n - 1) \\cdot ${d}) = ${S}\\), \\(${d}n^2 + ${2 * a1 - d}n - ${2 * S} = 0\\).</p><p>Pozitivna rešitev kvadratne enačbe je \\(n = ${n}\\) (zadnji člen \\(a_{${n}} = ${an}\\)).</p>` });
  });
  serija("visja-geo-ar", 3, (r) => {
    const q = r.int(2, 4), a = r.int(1, 4);
    // a, aq, aq^2 geo; a, aq, aq^2 - x aritm → 2aq = a + aq^2 - x → x = a(q-1)^2
    const x = a * (q - 1) ** 2;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: x, besedilo: `Števila \\(${a}, ${a * q}, ${a * q * q}\\) tvorijo geometrijsko zaporedje. Za koliko moramo zmanjšati tretje število, da dobimo aritmetično zaporedje?`, rezultat: `za ${x}`, postopek: `<p>Želimo \\(${a}, ${a * q}, ${a * q * q} - x\\) aritmetično: \\(2 \\cdot ${a * q} = ${a} + ${a * q * q} - x\\).</p><p>\\(x = ${a + a * q * q} - ${2 * a * q} = ${x}\\)</p>` });
  });
}
