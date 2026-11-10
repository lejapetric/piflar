import { stevilo, izbira, T, L, zaokrozi, ulomek, polinom } from "../lib.mjs";

const okl = (x) => (x < 0 ? `(${x})` : `${x}`);
const ovr = (k, x) => k.reduce((s, c) => s * x + c, 0); // Horner
const odv = (k) => k.slice(0, -1).map((c, i) => c * (k.length - 1 - i));

export default function ({ serija }) {
  serija("potenca", 6, (r) => {
    const a = r.nenic(-6, 6), n = r.int(3, 8);
    return izbira({ r, tezavnost: 1, besedilo: `Odvajaj funkcijo \\(f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x^{${n}}\\).`, pravilna: `\\(f'(x) = ${a * n}x^{${n - 1}}\\)`, napacne: [`\\(f'(x) = ${a}x^{${n - 1}}\\)`, `\\(f'(x) = ${a * n}x^{${n}}\\)`, `\\(f'(x) = ${a * (n - 1)}x^{${n - 1}}\\)`], postopek: `<p>\\((x^n)' = nx^{n-1}\\), konstanto prepišemo: \\(f'(x) = ${a} \\cdot ${n}x^{${n - 1}} = ${a * n}x^{${n - 1}}\\).</p>` });
  });
  serija("polinom-v-tocki", 7, (r, i) => {
    const st = i < 3 ? 2 : 3, k = Array.from({ length: st + 1 }, (_, j) => (j === 0 ? r.nenic(-4, 4) : r.int(-6, 6))), x = r.int(-3, 3);
    const d = odv(k);
    return stevilo({ tezavnost: i < 3 ? 1 : 2, vrednost: ovr(d, x), besedilo: `Dana je funkcija \\(f(x) = ${polinom(k)}\\). Izračunaj \\(f'(${x})\\).`, rezultat: `\\(f'(${x}) = ${ovr(d, x)}\\)`, postopek: `<p>\\(f'(x) = ${polinom(d)}\\)</p><p>\\(f'(${x}) = ${ovr(d, x)}\\)</p>` });
  });
  serija("elementarne", 6, (r) => {
    const [f, prav, nap] = r.izberi([
      ["\\sin x", "\\cos x", ["-\\cos x", "-\\sin x", "\\tan x"]],
      ["\\cos x", "-\\sin x", ["\\sin x", "\\cos x", "-\\cos x"]],
      ["e^x", "e^x", ["xe^{x-1}", "e^{x-1}", "\\ln x"]],
      ["\\ln x", "\\frac{1}{x}", ["\\ln x", "e^x", "-\\frac{1}{x^2}"]],
      ["\\sqrt{x}", "\\frac{1}{2\\sqrt{x}}", ["\\frac{1}{\\sqrt{x}}", "2\\sqrt{x}", "\\frac{\\sqrt{x}}{2}"]],
      ["\\frac{1}{x}", "-\\frac{1}{x^2}", ["\\frac{1}{x^2}", "\\ln x", "-\\frac{1}{x}"]],
      ["\\tan x", "\\frac{1}{\\cos^2 x}", ["\\frac{1}{\\sin^2 x}", "-\\frac{1}{\\cos^2 x}", "\\cot x"]],
      ["2^x", "2^x \\ln 2", ["x \\cdot 2^{x-1}", "2^x", "\\frac{2^x}{\\ln 2}"]],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri je odvod funkcije \\(f(x) = ${f}\\)?`, pravilna: `\\(${prav}\\)`, napacne: nap.map((x) => `\\(${x}\\)`), postopek: `<p>Iz tabele odvodov elementarnih funkcij: \\((${f})' = ${prav}\\).</p>` });
  });
  serija("produkt", 4, (r) => {
    const a = r.nenic(-4, 4), b = r.int(-5, 5), x = r.int(-2, 2);
    // f = (ax + b) e^x → f' = (ax + a + b)e^x ; f'(0) = a + b
    return stevilo({ tezavnost: 2, vrednost: a + b, besedilo: `Izračunaj \\(f'(0)\\) za \\(f(x) = (${polinom([a, b])})e^x\\).`, rezultat: `\\(f'(0) = ${a + b}\\)`, postopek: `<p>Pravilo za produkt: \\(f'(x) = ${a}e^x + (${polinom([a, b])})e^x = (${polinom([a, a + b])})e^x\\).</p><p>\\(f'(0) = ${a + b}\\)</p>` });
  });
  serija("verizno", 5, (r) => {
    const a = r.nenic(-3, 3), b = r.int(-4, 4), n = r.int(2, 5), x = r.int(-1, 2);
    const u = a * x + b, v = n * u ** (n - 1) * a;
    return stevilo({ tezavnost: 2, vrednost: v, besedilo: `Izračunaj \\(f'(${x})\\) za \\(f(x) = (${polinom([a, b])})^{${n}}\\).`, rezultat: `\\(f'(${x}) = ${v}\\)`, postopek: `<p>Verižno pravilo: \\(f'(x) = ${n}(${polinom([a, b])})^{${n - 1}} \\cdot ${okl(a)}\\).</p><p>\\(f'(${x}) = ${n} \\cdot ${okl(u)}^{${n - 1}} \\cdot ${okl(a)} = ${v}\\)</p>` });
  });
  serija("kvocient", 3, (r) => {
    const a = r.nenic(-3, 3), b = r.int(-4, 4), c = r.nenic(-3, 3);
    // f = (ax+b)/(x+c), f' = (ac - b)/(x+c)^2 ; f'(0) = (ac-b)/c^2
    const v = (a * c - b) / (c * c);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(v, 6), toleranca: 0.005, besedilo: `Izračunaj \\(f'(0)\\) za \\(f(x) = \\frac{${polinom([a, b])}}{${polinom([1, c])}}\\) (na dve decimalki).`, rezultat: `\\(f'(0) = ${ulomek(a * c - b, c * c)}\\)`, postopek: `<p>\\(f'(x) = \\frac{${a}(${polinom([1, c])}) - (${polinom([a, b])}) \\cdot 1}{(${polinom([1, c])})^2} = \\frac{${a * c - b}}{(${polinom([1, c])})^2}\\)</p><p>\\(f'(0) = \\frac{${a * c - b}}{${c * c}} = ${ulomek(a * c - b, c * c)}\\)</p>` });
  });
  serija("tangenta", 6, (r, i) => {
    const k = [r.nenic(-2, 2), r.int(-4, 4), r.int(-5, 5)], x0 = r.int(-3, 3), y0 = ovr(k, x0), kt = ovr(odv(k), x0), n = y0 - kt * x0;
    const kaj = i % 2 ? "n" : "k";
    return stevilo({ tezavnost: 2, vrednost: kaj === "k" ? kt : n, besedilo: `Tangenta na graf funkcije \\(f(x) = ${polinom(k)}\\) v točki z absciso \\(x_0 = ${x0}\\) ima enačbo \\(y = kx + n\\). Koliko je ${kaj === "k" ? "\\(k\\)" : "\\(n\\)"}?`, rezultat: `\\(y = ${polinom([kt, n])}\\)`, postopek: `<p>\\(f(${x0}) = ${y0}\\), \\(f'(x) = ${polinom(odv(k))}\\), \\(k = f'(${x0}) = ${kt}\\).</p><p>\\(n = y_0 - kx_0 = ${y0} - ${okl(kt)} \\cdot ${okl(x0)} = ${n}\\)</p>` });
  });
  serija("kot-tangente", 3, (r) => {
    const k = [1, r.int(-4, 4), r.int(-3, 3)], x0 = r.int(-2, 2), kt = ovr(odv(k), x0);
    const fi = (Math.atan(kt) * 180) / Math.PI;
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(fi, 2), toleranca: 0.05, enota: "°", besedilo: `Pod kolikšnim kotom (glede na pozitivno smer osi \\(x\\)) seka tangenta graf \\(f(x) = ${polinom(k)}\\) v točki \\(x_0 = ${x0}\\)? (Na dve decimalki, kot med \\(-90°\\) in \\(90°\\).)`, rezultat: `${T(fi, 2)}°`, postopek: `<p>\\(k = f'(${x0}) = ${kt}\\), \\(\\tan\\varphi = ${kt}\\), \\(\\varphi = \\arctan(${kt}) \\approx ${L(fi, 2)}°\\).</p>` });
  });
  serija("stacionarne", 6, (r, i) => {
    const a = r.int(-3, 3), b = r.int(-3, 3);
    if (a >= b) return null;
    // f' = 3(x-a)(x-b) → f = x^3 - 3(a+b)/2 x^2 + 3ab x
    if ((3 * (a + b)) % 2) return null;
    const k = [1, (-3 * (a + b)) / 2, 3 * a * b, r.int(-5, 5)];
    return stevilo({ tezavnost: 3, vrednost: i % 2 ? a : b, besedilo: `Funkcija \\(f(x) = ${polinom(k)}\\) ima lokalni ${i % 2 ? "maksimum" : "minimum"}. Pri katerem \\(x\\)?`, rezultat: `\\(x = ${i % 2 ? a : b}\\)`, postopek: `<p>\\(f'(x) = ${polinom(odv(k))} = 3(x ${a < 0 ? "+" : "-"} ${Math.abs(a)})(x ${b < 0 ? "+" : "-"} ${Math.abs(b)})\\). Stacionarni točki: \\(${a}\\) in \\(${b}\\).</p><p>Vodilni koeficient je pozitiven, zato je pri manjši ničli odvoda (\\(x = ${a}\\)) maksimum, pri večji (\\(x = ${b}\\)) minimum.</p>` });
  });
  serija("narascanje", 4, (r) => {
    const k = [1, r.int(-6, 6), r.int(-5, 5)], p = -k[1] / 2;
    const prav = `\\((${L(p, 1)}, \\infty)\\)`;
    return izbira({ r, tezavnost: 2, besedilo: `Na katerem intervalu funkcija \\(f(x) = ${polinom(k)}\\) narašča?`, pravilna: prav, napacne: [`\\((-\\infty, ${L(p, 1)})\\)`, `\\((${L(-p, 1)}, \\infty)\\)`, "\\(\\mathbb{R}\\)"].filter((x) => x !== prav), postopek: `<p>\\(f'(x) = ${polinom(odv(k))} > 0\\), ko je \\(x > ${L(p, 1)}\\).</p>` });
  });
  serija("optimizacija", 4, (r, i) => {
    if (i % 2) {
      const a = r.izberi([12, 18, 24, 30, 36, 48]);
      const x = a / 6, V = (a - 2 * x) ** 2 * x;
      return stevilo({ tezavnost: 4, raven: "visja", vrednost: x, enota: "cm", besedilo: `Iz kvadratnega kartona s stranico ${a} cm izrežemo v vogalih enake kvadratke in zapognemo škatlo brez pokrova. Kolikšna mora biti stranica izrezanih kvadratkov, da bo prostornina največja?`, rezultat: `\\(x = ${x}\\) cm (\\(V = ${V}\\) cm³)`, postopek: `<p>\\(V(x) = (${a} - 2x)^2 x\\), \\(V'(x) = (${a} - 2x)(${a} - 6x)\\).</p><p>\\(V' = 0\\) pri \\(x = ${a / 2}\\) (ni smiselno) ali \\(x = ${x}\\). To je maksimum.</p>` });
    }
    const S = r.int(4, 20) * 2;
    return stevilo({ tezavnost: 3, vrednost: (S / 2) ** 2, besedilo: `Vsota dveh pozitivnih števil je ${S}. Kolikšen je največji možni produkt teh števil?`, rezultat: `${(S / 2) ** 2}`, postopek: `<p>\\(p(x) = x(${S} - x)\\), \\(p'(x) = ${S} - 2x = 0\\), \\(x = ${S / 2}\\).</p><p>\\(p = ${S / 2} \\cdot ${S / 2} = ${(S / 2) ** 2}\\)</p>` });
  });
  serija("hitrost", 4, (r) => {
    const a = r.int(1, 3), b = r.int(-6, 6), c = r.int(0, 10), t = r.int(1, 5);
    const k = [a, b, 0, c];
    return stevilo({ tezavnost: 3, vrednost: ovr(odv(k), t), enota: "m/s", besedilo: `Lega telesa je \\(s(t) = ${polinom(k, "t")}\\) (\\(s\\) v metrih, \\(t\\) v sekundah). Kolikšna je hitrost ob času \\(t = ${t}\\) s?`, rezultat: `${ovr(odv(k), t)} m/s`, postopek: `<p>Hitrost je odvod lege: \\(v(t) = s'(t) = ${polinom(odv(k), "t")}\\).</p><p>\\(v(${t}) = ${ovr(odv(k), t)}\\) m/s</p>` });
  });
  serija("drugi-odvod", 4, (r) => {
    const k = [r.nenic(-2, 2), r.int(-4, 4), r.int(-5, 5), r.int(-5, 5)], d2 = odv(odv(k));
    const x = -d2[1] / d2[0];
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(x, 6), toleranca: 0.01, besedilo: `Kje ima funkcija \\(f(x) = ${polinom(k)}\\) prevoj? (Vpiši \\(x\\), na dve decimalki.)`, rezultat: `\\(x = ${L(x, 2)}\\)`, postopek: `<p>\\(f'(x) = ${polinom(odv(k))}\\), \\(f''(x) = ${polinom(d2)}\\).</p><p>\\(f''(x) = 0\\): \\(x = ${L(x, 2)}\\). Tam \\(f''\\) spremeni predznak, zato je prevoj.</p>` });
  });
  serija("limita", 4, (r) => {
    const a = r.int(-5, 5), b = r.int(-5, 5);
    if (a === b) return null;
    // lim_{x→a} (x-a)(x-b)/(x-a) = a - b
    const k = [1, -(a + b), a * b];
    return stevilo({ tezavnost: 2, vrednost: a - b, besedilo: `Izračunaj \\(\\lim_{x \\to ${a}} \\frac{${polinom(k)}}{${polinom([1, -a])}}\\).`, rezultat: `${a - b}`, postopek: `<p>Števec razstavimo: \\(${polinom(k)} = (${polinom([1, -a])})(${polinom([1, -b])})\\). Okrajšamo:</p><p>\\(\\lim_{x \\to ${a}} (${polinom([1, -b])}) = ${a} - ${okl(b)} = ${a - b}\\)</p>` });
  });
  serija("limita-sin", 3, (r) => {
    const a = r.int(2, 7), b = r.int(1, 5);
    return stevilo({ tezavnost: 3, vrednost: zaokrozi(a / b, 6), toleranca: 0.005, besedilo: `Izračunaj \\(\\lim_{x \\to 0} \\frac{\\sin ${a}x}{${b === 1 ? "" : b}x}\\) (na dve decimalki).`, rezultat: `\\(${ulomek(a, b)}\\)`, postopek: `<p>\\(\\frac{\\sin ${a}x}{${b === 1 ? "" : b}x} = \\frac{${a}}{${b}} \\cdot \\frac{\\sin ${a}x}{${a}x} \\to \\frac{${a}}{${b}} \\cdot 1 = ${ulomek(a, b)}\\)</p>` });
  });
  serija("visja-parameter", 3, (r) => {
    const x0 = r.int(-3, 3), b = r.nenic(-4, 4);
    // f = x^2 + a x + b ima tangento vzporedno z y = kx v x0 → 2x0 + a = k
    const k = r.int(-5, 5), a = k - 2 * x0;
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: a, besedilo: `Za katero vrednost \\(a\\) je tangenta na graf \\(f(x) = x^2 + ax ${b < 0 ? "-" : "+"} ${Math.abs(b)}\\) v točki z absciso ${x0} vzporedna premici \\(y = ${polinom([k, 1])}\\)?`, rezultat: `\\(a = ${a}\\)`, postopek: `<p>Vzporedni premici imata enak smerni koeficient: \\(f'(${x0}) = ${k}\\).</p><p>\\(f'(x) = 2x + a\\), \\(${2 * x0} + a = ${k}\\), \\(a = ${a}\\).</p>` });
  });
  serija("visja-ekstrem-eks", 3, (r) => {
    const a = r.int(1, 4);
    // f = x e^{-ax} max at x = 1/a
    return stevilo({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(1 / a, 6), toleranca: 0.005, besedilo: `Kje ima funkcija \\(f(x) = xe^{-${a === 1 ? "" : a}x}\\) lokalni maksimum? (Vpiši \\(x\\), na dve decimalki.)`, rezultat: `\\(x = ${ulomek(1, a)}\\)`, postopek: `<p>\\(f'(x) = e^{-${a === 1 ? "" : a}x} - ${a === 1 ? "" : a}xe^{-${a === 1 ? "" : a}x} = e^{-${a === 1 ? "" : a}x}(1 - ${a === 1 ? "" : a}x)\\).</p><p>\\(f' = 0\\) pri \\(x = ${ulomek(1, a)}\\); levo je \\(f' > 0\\), desno \\(f' < 0\\): maksimum.</p>` });
  });
}
