# Spomladanski rok 2017 (uradne pole RIC: m171-401-1-1, m171-402-1-1, m171-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2017, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
def paral1(X, Y):
    pts = [(0, 0), (2, 0), (4, 4), (2, 4)]
    t = [f'<polygon points="{" ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)}" fill="currentColor" fill-opacity="0.25"/>',
         krivulja(X, Y, lambda x: 2 * x, -0.8, 2.6), krivulja(X, Y, lambda x: 2 * x - 4, 1.2, 4.6),
         krivulja(X, Y, lambda x: 4, -2, 5.5, RDECA)]
    for (x, y), n, dx, dy in [((0, 0), "A", -12, -4), ((2, 0), "B", 4, 12), ((4, 4), "C", 4, -5), ((2, 4), "D", -12, -5)]:
        t.append(tocka(X, Y, x, y, n, dx, dy))
    t.append(f'<text x="{X(2.5):.1f}" y="{Y(5.2):.1f}" font-size="11" fill="{MODRA}">p</text>')
    t.append(f'<text x="{X(4.6):.1f}" y="{Y(5.2):.1f}" font-size="11" fill="{MODRA}">q</text>')
    t.append(f'<text x="{X(-1.8):.1f}" y="{Y(4.3):.1f}" font-size="11" fill="{RDECA}">r</text>')
    return "".join(t)

n1 = naloga(
    1, ["pravokotni_koordinatni_sistem_ravnina", "funkcije", "geometrijski_liki_telesa"], 7,
    r"Premice \(p\), \(q\) in \(r\) skupaj z abscisno osjo oklepajo paralelogram \(ABCD\) z oglišči v mrežnih točkah (glej sliko). "
    r"Zapiši enačbe premic ter izračunaj ploščino in obseg paralelograma. Rezultata naj bosta točna."
    + mreza((-2, 6), (-2, 6), paral1, sirina=260)
    + r"Enačba \(p\) (1 točka), enačba \(q\) (1 točka), enačba \(r\) (1 točka), ploščina (2 točki), obseg (2 točki).",
    r"\(p: y = 2x\), \(q: y = 2x - 4\), \(r: y = 4\), \(S = 8\), \(o = 4 + 4\sqrt{5}\)",
    [
        ("!p: y = 2x", "Premica skozi A(0, 0) in D(2, 4): smerni koeficient 2."),
        ("!q: y = 2x − 4", "Vzporedna premici p, skozi B(2, 0)."),
        ("!r: y = 4", "Vodoravna premica skozi D in C."),
        ("!S = |AB| · v = 2 · 4 = 8", "Ploščina paralelograma: osnovnica krat višina."),
        ("|AD| = " + K("2<sup>2</sup> + 4<sup>2</sup>") + " = 2" + K("5"), "Razdalja med točkama (Pitagorov izrek)."),
        ("!o = 2 · 2 + 2 · 2" + K("5") + " = 4 + 4" + K("5"), "Obseg paralelograma."),
    ],
)

def venn():
    d = [f'<circle cx="95" cy="80" r="52" fill="none" stroke="currentColor"/>',
         f'<circle cx="155" cy="80" r="52" fill="none" stroke="currentColor"/>',
         f'<circle cx="125" cy="130" r="52" fill="none" stroke="currentColor"/>',
         '<text x="38" y="40" font-size="13" fill="currentColor">A</text>',
         '<text x="205" y="40" font-size="13" fill="currentColor">B</text>',
         '<text x="180" y="185" font-size="13" fill="currentColor">C</text>']
    for x, y, s in [(70, 70, "2"), (80, 92, "8"), (125, 60, "6"), (125, 102, "1"), (98, 128, "5"), (180, 70, "3"), (170, 92, "9"),
                    (125, 160, "4"), (152, 128, "7")]:
        d.append(f'<text x="{x}" y="{y}" font-size="13" text-anchor="middle" fill="currentColor">{s}</text>')
    return svg(250, 195, "".join(d), "Vennov diagram")

n2 = naloga(
    2, "mnozice", 5,
    r"Na sliki so množice \(A\), \(B\) in \(C\). Zapiši z naštevanjem elementov: \(A\), \(B \cap C\), \(B \cup A\), \(A - C\) in "
    r"\(B \times (A \cap B \cap C)\). (vsaka po 1 točka)" + venn(),
    r"\(A = \{1, 2, 5, 6, 8\}\), \(B \cap C = \{1, 7\}\), \(B \cup A = \{1, 2, 3, 5, 6, 7, 8, 9\}\), \(A - C = \{2, 6, 8\}\), "
    r"\(B \times (A \cap B \cap C) = \{(1, 1), (3, 1), (6, 1), (7, 1), (9, 1)\}\)",
    [
        ("!A = {1, 2, 5, 6, 8}", "Vsi elementi znotraj kroga A."),
        ("!B ∩ C = {1, 7}", "Elementi v obeh krogih B in C."),
        ("!B ∪ A = {1, 2, 3, 5, 6, 7, 8, 9}", "Elementi v vsaj enem od krogov."),
        ("!A − C = {2, 6, 8}", "Elementi iz A, ki niso v C."),
        ("A ∩ B ∩ C = {1},  B = {1, 3, 6, 7, 9}", ""),
        ("!B × {1} = {(1, 1), (3, 1), (6, 1), (7, 1), (9, 1)}", "Kartezični produkt: urejeni pari (prvi iz B, drugi iz A ∩ B ∩ C)."),
    ],
)

n3 = naloga(
    3, ["algebrski_izrazi_enacbe_neenacbe", "funkcije"], 7,
    r"Reši enačbe. Rezultati naj bodo točni.<br>3.1. \(x^2 + 4x = 1\) (2 točki)<br>3.2. \(9^x = 3\) (1 točka)<br>"
    r"3.3. \(\log_2 x = -3\) (1 točka)<br>3.4. \(2\cos x = \sqrt{3}\) (3 točke)",
    r"3.1. \(x = -2 \pm \sqrt{5}\) &nbsp; 3.2. \(x = \frac{1}{2}\) &nbsp; 3.3. \(x = \frac{1}{8}\) &nbsp; 3.4. \(x = \pm\frac{\pi}{6} + 2k\pi\)",
    [
        ("x<sup>2</sup> + 4x + 4 = 5  ⇒  (x + 2)<sup>2</sup> = 5", "Dopolnimo do popolnega kvadrata."),
        ("!3.1  x = −2 ± " + K("5"), ""),
        ("!3.2  3<sup>2x</sup> = 3<sup>1</sup>  ⇒  x = " + U("1", "2"), "9 = 3²; izenačimo eksponenta."),
        ("!3.3  x = 2<sup>−3</sup> = " + U("1", "8"), "Definicija logaritma."),
        ("cos x = " + U(K("3"), "2"), ""),
        ("!3.4  x = ±" + U("π", "6") + " + 2kπ, k ∈ ℤ", "Kosinus je soda funkcija; ponavlja se na 2π."),
    ],
)

def zmaj():
    # deltoid: A(−3, 0), C(3, 0), D(0, 3√3), B(0, −√91)
    s = 13
    X = lambda x: 120 + x * s
    Y = lambda y: 80 - y * s
    A, C, D, B = (-3, 0), (3, 0), (0, 3 * math.sqrt(3)), (0, -math.sqrt(91))
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in (A, D, C, B))
    d = [f'<polygon points="{pts}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{X(-3):.1f}" y1="{Y(0):.1f}" x2="{X(3):.1f}" y2="{Y(0):.1f}" stroke="currentColor"/>']
    for (x, y), n, dx, dy in [(A, "A", -14, 4), (C, "C", 6, 4), (D, "D", 5, -2), (B, "B", 5, 12)]:
        d.append(f'<text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="12" fill="currentColor">{n}</text>')
    for x, y, t in [(-2.6, 2.8, "6 cm"), (1.4, 2.8, "6 cm"), (0, -0.9, "6 cm"), (-3.8, -5, "10 cm"), (1.6, -5, "10 cm")]:
        d.append(f'<text x="{X(x):.1f}" y="{Y(y):.1f}" font-size="10" fill="currentColor">{t}</text>')
    return svg(240, 220, "".join(d), "Štirikotnik ABCD")

n4 = naloga(
    4, "geometrijski_liki_telesa", 8,
    r"V štirikotniku \(ABCD\) je \(|AD| = |DC| = |AC| = 6\) cm in \(|AB| = |BC| = 10\) cm. Izračunaj velikosti notranjih kotov "
    r"štirikotnika in dolžino diagonale \(f = |BD|\)." + zmaj(),
    r"\(\delta = 60^\circ\), \(\beta \approx 34{,}92^\circ\), \(\alpha = \gamma \approx 132{,}54^\circ\), \(f \approx 14{,}74\) cm",
    [
        ("!δ = 60°", "Trikotnik ACD je enakostraničen."),
        ("cos β = " + U("10<sup>2</sup> + 10<sup>2</sup> − 6<sup>2</sup>", "2 · 10 · 10") + " = 0,82", "Kosinusni izrek v trikotniku ABC."),
        ("!β ≈ 34,92°", ""),
        ("!α = γ = " + U("360° − 60° − 34,92°", "2") + " ≈ 132,54°", "Štirikotnik je simetričen glede na BD; vsota kotov štirikotnika je 360°."),
        ("v<sub>ACD</sub> = " + U("6" + K("3"), "2") + " = 3" + K("3") + ",  v<sub>ABC</sub> = " + K("10<sup>2</sup> − 3<sup>2</sup>") + " = " + K("91"), "Diagonala BD je pravokotna na AC in jo razpolavlja; Pitagorov izrek."),
        ("!f = 3" + K("3") + " + " + K("91") + " ≈ 14,74 cm", ""),
    ],
)

n5 = naloga(
    5, "stevilske_mnozice", 5,
    r"Naj bo \(z = x(3 - 2i) + 4i + i^2\), \(x \in \mathbb{R}\). Izračunaj \(x\), da bo \(\mathrm{Re}\, z = \mathrm{Im}\, z\).",
    r"\(x = 1\)",
    [
        ("z = 3x − 2xi + 4i − 1 = (3x − 1) + (4 − 2x)i", "i² = −1; ločimo realni in imaginarni del."),
        ("3x − 1 = 4 − 2x", ""),
        ("!x = 1", ""),
    ],
)

n6 = naloga(
    6, "vektorji_ravnina_prostor", 7,
    r"Dani so vektorji \(\vec{a} = (2, 1, -2)\), \(\vec{b} = (1, 2, 2)\) in \(\vec{c} = (2, -1, 1)\).<br>"
    r"6.1. Računsko pokaži, da sta \(\vec{a}\) in \(\vec{b}\) pravokotna. (2 točki)<br>"
    r"6.2. Izračunaj dolžini vektorjev \(\vec{a}\) in \(\vec{c}\) ter kot \(\varphi\) med njima na dve decimalki. (5 točk)",
    r"6.2. \(|\vec{a}| = 3\), \(|\vec{c}| = \sqrt{6}\), \(\varphi \approx 82{,}18^\circ\)",
    [
        ("!6.1  " + V("a") + " · " + V("b") + " = 2 + 2 − 4 = 0", "Skalarni produkt pravokotnih vektorjev je 0."),
        ("!|" + V("a") + "| = " + K("4 + 1 + 4") + " = 3,  |" + V("c") + "| = " + K("4 + 1 + 1") + " = " + K("6"), "Dolžina vektorja."),
        (V("a") + " · " + V("c") + " = 4 − 1 − 2 = 1", "Skalarni produkt."),
        ("cos φ = " + U("1", "3" + K("6")) + " ≈ 0,1361", "Kot med vektorjema iz skalarnega produkta."),
        ("!φ ≈ 82,18°", ""),
    ],
)

n7 = naloga(
    7, "stoznice", 7,
    r"Nariši elipso z enačbo \(9x^2 + 25y^2 - 225 = 0\) in zapiši njeni gorišči. Zapiši enačbo krožnice s središčem v desnem temenu elipse, "
    r"ki se dotika ordinatne osi.",
    r"\(F_{1,2}(\pm 4, 0)\), \((x - 5)^2 + y^2 = 25\)",
    [
        (U("x<sup>2</sup>", "25") + " + " + U("y<sup>2</sup>", "9") + " = 1:  a = 5,  b = 3", "Enačbo delimo z 225."),
        ("@slika", mreza((-6, 11), (-6, 6), lambda X, Y: parametricna(X, Y, lambda t: 5 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * math.pi)
                         + parametricna(X, Y, lambda t: 5 + 5 * math.cos(t), lambda t: 5 * math.sin(t), 0, 2 * math.pi, RDECA)
                         + tocka(X, Y, 4, 0, "F₂", 3, 12) + tocka(X, Y, -4, 0, "F₁", -14, 12), sirina=300)),
        ("e<sup>2</sup> = 25 − 9 = 16,  e = 4", "Ekscentričnost elipse (e² = a² − b²)."),
        ("!F<sub>1</sub>(−4, 0),  F<sub>2</sub>(4, 0)", ""),
        ("središče (5, 0),  r = 5", "Polmer je razdalja središča od ordinatne osi."),
        ("!(x − 5)<sup>2</sup> + y<sup>2</sup> = 25", "Enačba krožnice."),
    ],
)

n8 = naloga(
    8, ["zaporedja_vrste", "algebrski_izrazi_enacbe_neenacbe"], 5,
    r"Za katere \(x\) so \(x^2 - 3\), \(x + 1\) in \(5 - 3x\) zaporedni členi aritmetičnega zaporedja?",
    r"\(x = 0\) ali \(x = 5\)",
    [
        ("2(x + 1) = (x<sup>2</sup> − 3) + (5 − 3x)", "Srednji člen je aritmetična sredina sosednjih (aritmetično zaporedje)."),
        ("x<sup>2</sup> − 5x = 0  ⇒  x(x − 5) = 0", "Izpostavimo x."),
        ("!x = 0 (−3, 1, 5) ali x = 5 (22, 6, −10)", "Preizkus: razliki sta enaki."),
    ],
)

def p9(x):
    return -0.5 * (x + 2) ** 2 * (x - 1)

n9 = naloga(
    9, ["funkcije"], 6,
    r"Na sliki je graf polinoma \(p\) tretje stopnje." + graf([(p9, MODRA)], (-4, 3), (-3, 4), tocke=[(-2, 0, ""), (1, 0, ""), (0, 2, "")], sirina=240, visina=240)
    + r"9.1. Zapiši predpis polinoma \(p\) v ničelni obliki. (5 točk)<br>9.2. Nariši graf polinoma \(s(x) = p(x) + 1\). (1 točka)",
    r"9.1. \(p(x) = -\frac{1}{2}(x + 2)^2(x - 1)\)",
    [
        ("ničli: x = −2 (dvojna, graf se os dotakne), x = 1 (enojna)", "Pri sodi stopnji ničle graf ne seka osi."),
        ("p(x) = a(x + 2)<sup>2</sup>(x − 1)", "Ničelna oblika polinoma."),
        ("p(0) = 2:  a · 4 · (−1) = 2  ⇒  a = −" + U("1", "2"), "Začetno vrednost preberemo z grafa."),
        ("!9.1  p(x) = −" + U("1", "2") + "(x + 2)<sup>2</sup>(x − 1)", ""),
        ("@slika", graf([(p9, MODRA), (lambda x: p9(x) + 1, RDECA)], (-4, 3), (-3, 4), sirina=240, visina=240)),
        ("!9.2  graf p premaknemo za 1 navzgor", "Premik grafa v smeri osi y."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

n10 = naloga(
    10, ["funkcije", "diferencialni_racun"], 8,
    r"Racionalna funkcija ima predpis \(f(x) = \dfrac{x^2 + 8}{x + 1}\). Zapiši točki \(E_1\) in \(E_2\), v katerih ima \(f\) lokalna ekstrema. "
    r"V kateri je lokalni minimum in v kateri lokalni maksimum? Utemelji.",
    r"lokalni maksimum \(E_1(-4, -8)\), lokalni minimum \(E_2(2, 4)\)",
    [
        ("f '(x) = " + U("2x(x + 1) − (x<sup>2</sup> + 8)", "(x + 1)<sup>2</sup>") + " = " + U("x<sup>2</sup> + 2x − 8", "(x + 1)<sup>2</sup>"), "Pravilo za odvod količnika."),
        ("x<sup>2</sup> + 2x − 8 = (x + 4)(x − 2) = 0", "Stacionarne točke: f '(x) = 0; Vietovo pravilo."),
        ("f(−4) = " + U("24", "−3") + " = −8,  f(2) = " + U("12", "3") + " = 4", ""),
        ("f ' > 0 za x < −4,  f ' < 0 na (−4, −1) in (−1, 2),  f ' > 0 za x > 2", "Predznak odvoda določa števec (imenovalec je pozitiven)."),
        ("!E<sub>1</sub>(−4, −8): lokalni maksimum", "Odvod spremeni predznak iz + v −."),
        ("!E<sub>2</sub>(2, 4): lokalni minimum", "Odvod spremeni predznak iz − v +."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n11 = naloga(
    11, "integralski_racun", 7,
    r"Dani sta funkciji \(f(x) = x^2\) in \(g(x) = 12 - x\). Izračunaj ploščino lika, ki ga omejujeta njuna grafa.",
    r"\(\frac{343}{6}\)",
    [
        ("x<sup>2</sup> = 12 − x  ⇒  (x + 4)(x − 3) = 0", "Presečišči grafov."),
        ("x<sub>1</sub> = −4,  x<sub>2</sub> = 3", ""),
        ("S = " + INT("3", "−4") + " (12 − x − x<sup>2</sup>) dx", "Ploščina med grafoma je integral razlike (premica je nad parabolo)."),
        ("= (12x − " + U("x<sup>2</sup>", "2") + " − " + U("x<sup>3</sup>", "3") + ") " + MEJA("3", "−4") + " = " + U("45", "2") + " − (−" + U("104", "3") + ")", "Integral potence."),
        ("!S = " + U("343", "6"), ""),
    ],
)

def kvadrat12():
    s = 120
    o = 20
    d = [f'<rect x="{o}" y="{o}" width="{s}" height="{s}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{o},{o + s} {o},{o} {o + 0.4 * s},{o}" fill="currentColor" fill-opacity="0.2"/>',
         f'<line x1="{o}" y1="{o + s}" x2="{o + 0.4 * s}" y2="{o}" stroke="currentColor" stroke-width="1.5"/>']
    for x, y, n in [(o - 14, o + s + 12, "A"), (o + s + 4, o + s + 12, "B"), (o + s + 4, o - 4, "C"), (o - 14, o - 4, "D"), (o + 0.4 * s - 3, o - 5, "T")]:
        d.append(f'<text x="{x}" y="{y}" font-size="12" fill="currentColor">{n}</text>')
    d.append(f'<text x="{o + s / 2}" y="{o + s + 16}" font-size="11" fill="currentColor">a</text>')
    return svg(170, 170, "".join(d), "Kvadrat ABCD z daljico AT")

n12 = naloga(
    12, ["geometrijski_liki_telesa", "algebrski_izrazi_enacbe_neenacbe"], 8,
    r"V kvadratu \(ABCD\) s stranico \(a\) je narisana daljica \(AT\), kjer točka \(T\) leži na stranici \(CD\). Daljica razdeli kvadrat na "
    r"trikotnik in trapez, katerih ploščini sta v razmerju \(1 : 4\). Izračunaj razmerje \(|DT| : |TC|\)." + kvadrat12(),
    r"\(|DT| : |TC| = 2 : 3\)",
    [
        ("S<sub>ATD</sub> = " + U("1", "5") + " a<sup>2</sup>", "Kvadrat razdelimo na 5 enakih delov: trikotnik dobi 1, trapez 4."),
        (U("a · |DT|", "2") + " = " + U("a<sup>2</sup>", "5") + "  ⇒  |DT| = " + U("2a", "5"), "Ploščina pravokotnega trikotnika ADT s katetama a in DT."),
        ("|TC| = a − " + U("2a", "5") + " = " + U("3a", "5"), ""),
        ("!|DT| : |TC| = 2 : 3", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
CH = r"\(f(x) = \frac{1}{2}(e^x + e^{-x})\)"
SH = r"\(g(x) = \frac{1}{2}(e^x - e^{-x})\)"
v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Dani sta funkciji " + CH + " in " + SH + r".<br>"
    r"1.1. Zapiši definicijski območji in zalogi vrednosti obeh funkcij ter dokaži, da za vsak \(x \in \mathbb{R}\) velja \(f'(x) = g(x)\) in "
    r"\(g'(x) = f(x)\). (5 točk)<br>"
    r"1.2. Dokaži, da je \(f\) soda in \(g\) naraščajoča funkcija. (2 točki)<br>"
    r"1.3. Tangenta na graf funkcije \(f\) v točki z absciso \(x_0 = 2\) seka ordinatno os v točki \(N\). Dokaži, da je ordinata točke "
    r"\(N\) enaka \(\frac{3e^{-2} - e^2}{2}\). (3 točke)<br>"
    r"1.4. Izračunaj nedoločeni integral \(\displaystyle\int \frac{g(x)}{f(x)}\,dx\). (4 točke)",
    r"1.1. \(D_f = D_g = \mathbb{R}\), \(Z_f = [1, \infty)\), \(Z_g = \mathbb{R}\) &nbsp; 1.4. \(\ln(e^x + e^{-x}) + C\)",
    [
        ("!D<sub>f</sub> = D<sub>g</sub> = ℝ,  Z<sub>f</sub> = [1, ∞),  Z<sub>g</sub> = ℝ", "f(x) ≥ 1 po neenakosti med aritmetično in geometrijsko sredino (e^x · e^(−x) = 1); g zavzame vse vrednosti."),
        ("f '(x) = " + U("1", "2") + "(e<sup>x</sup> − e<sup>−x</sup>) = g(x)", "Odvod eksponentne funkcije; (e^(−x))' = −e^(−x) po verižnem pravilu."),
        ("!g '(x) = " + U("1", "2") + "(e<sup>x</sup> + e<sup>−x</sup>) = f(x)", ""),
        ("!f(−x) = " + U("1", "2") + "(e<sup>−x</sup> + e<sup>x</sup>) = f(x): f je soda", "Sode in lihe funkcije."),
        ("!g '(x) = f(x) > 0: g je naraščajoča", "Funkcija s pozitivnim odvodom narašča."),
        ("tangenta: y = f(2) + g(2)(x − 2)", "Smerni koeficient tangente je odvod f '(2) = g(2)."),
        ("y<sub>N</sub> = f(2) − 2g(2) = " + U("e<sup>2</sup> + e<sup>−2</sup>", "2") + " − (e<sup>2</sup> − e<sup>−2</sup>)", "Vstavimo x = 0."),
        ("!y<sub>N</sub> = " + U("3e<sup>−2</sup> − e<sup>2</sup>", "2"), ""),
        ("∫ " + U("g(x)", "f(x)") + " dx = ∫ " + U("f '(x)", "f(x)") + " dx = ln f(x) + C", "Števec je odvod imenovalca: uvedemo novo spremenljivko u = f(x)."),
        ("!= ln(e<sup>x</sup> + e<sup>−x</sup>) + C<sub>1</sub>", "Konstanta ln(1/2) se vključi v C."),
    ],
)

v2 = naloga(
    2, ["geometrijski_liki_telesa", "diferencialni_racun"], 13,
    r"Obravnavamo štiri trapeze z osnovnicama \(a = |AB| = 8\) cm in \(c = |CD| = 5\) cm ter krakom \(d = |AD| = 6\) cm.<br>"
    r"2.1. V prvem trapezu se nosilki krakov sekata v točki \(E\). Izračunaj \(|DE|\). (2 točki)<br>"
    r"2.2. V drugem je kot \(\beta = \angle ABC = 70^\circ\). Izračunaj kot \(\alpha = \angle BAD\) na minuto natančno. (3 točke)<br>"
    r"2.3. V tretjem meri diagonala \(|BD| = 9\) cm. Izračunaj dolžino kraka \(b = |BC|\). (4 točke)<br>"
    r"2.4. V četrtem je \(\alpha = 60^\circ\). Točka \(T\) leži na \(AD\), točka \(V\) pa na \(AB\), tako da je \(|AT| = |AV|\). Pri kateri dolžini "
    r"\(|AT|\) je ploščina trikotnika \(VBT\) največja? (4 točke)",
    r"2.1. \(10\) cm &nbsp; 2.2. \(\alpha \approx 81^\circ 59'\) &nbsp; 2.3. \(b \approx 6{,}15\) cm &nbsp; 2.4. \(|AT| = 4\) cm",
    [
        (U("|DE|", "|AE|") + " = " + U("c", "a") + "  ⇒  " + U("x", "x + 6") + " = " + U("5", "8"), "Trikotnika DCE in ABE sta podobna (CD ∥ AB)."),
        ("!2.1  8x = 5x + 30  ⇒  |DE| = 10 cm", ""),
        ("vzporednica h kraku BC skozi D seka AB v P:  |AP| = a − c = 3,  ∠APD = β = 70°", "Dobimo trikotnik APD z znanima stranicama AD in AP."),
        ("sin ∠ADP = " + U("3 · sin 70°", "6") + " ≈ 0,4698  ⇒  ∠ADP ≈ 28,02°", "Sinusni izrek; kot je oster, ker leži nasproti krajše stranice."),
        ("!2.2  α = 180° − 70° − 28,02° ≈ 81,98° = 81° 59'", "Vsota notranjih kotov trikotnika."),
        ("cos α = " + U("8<sup>2</sup> + 6<sup>2</sup> − 9<sup>2</sup>", "2 · 8 · 6") + " = " + U("19", "96"), "Kosinusni izrek v trikotniku ABD."),
        ("b<sup>2</sup> = |DP|<sup>2</sup> = 6<sup>2</sup> + 3<sup>2</sup> − 2 · 6 · 3 · " + U("19", "96") + " = 37,875", "Kosinusni izrek v trikotniku APD; DP je vzporeden in enako dolg kot BC."),
        ("!2.3  b ≈ 6,15 cm", ""),
        ("S(x) = " + U("1", "2") + " (8 − x) · x sin 60° = " + U(K("3"), "4") + " (8x − x<sup>2</sup>)", "Ploščina trikotnika VBT: osnovnica VB = 8 − x, višina iz T je x sin 60°."),
        ("S '(x) = " + U(K("3"), "4") + "(8 − 2x) = 0  ⇒  x = 4", "Teme parabole oziroma stacionarna točka."),
        ("!2.4  |AT| = 4 cm (≤ 6 cm, točka T leži na kraku)", ""),
    ],
)

v3 = naloga(
    3, "funkcije", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo).<br>"
    r"3.1. Reši enačbo \(\sin x - \cos x = 1\). (5 točk)<br>"
    r"3.2. Za katere \(m \in \mathbb{R}\) ima enačba \(\tan x + 4\cot x = m\) realne rešitve? (4 točke)<br>"
    r"3.3. Za katere \(a \in \mathbb{R}\) ima enačba \((3 - a)\cos x = 3a - 1\) realne rešitve? (4 točke)",
    r"3.1. \(x = \frac{\pi}{2} + 2k\pi\), \(x = \pi + 2k\pi\) &nbsp; 3.2. \(m \le -4\) ali \(m \ge 4\) &nbsp; 3.3. \(-1 \le a \le 1\)",
    [
        (K("2") + " sin(x − " + U("π", "4") + ") = 1", "sin x − cos x = √2 sin(x − π/4) (adicijski izrek)."),
        ("x − " + U("π", "4") + " = " + U("π", "4") + " + 2kπ  ali  x − " + U("π", "4") + " = " + U("3π", "4") + " + 2kπ", ""),
        ("!3.1  x = " + U("π", "2") + " + 2kπ,  x = π + 2kπ", ""),
        ("t = tan x ≠ 0:  t + " + U("4", "t") + " = m", "cot x = 1/tan x; tan x zavzame vse realne vrednosti razen 0 (kjer je cot definiran)."),
        ("t > 0: t + " + U("4", "t") + " ≥ 2" + K("4") + " = 4;  t < 0: t + " + U("4", "t") + " ≤ −4", "Neenakost med aritmetično in geometrijsko sredino."),
        ("!3.2  m ≤ −4 ali m ≥ 4", ""),
        ("a = 3: 0 = 8 ni rešitev;  a ≠ 3: cos x = " + U("3a − 1", "3 − a"), ""),
        ("|3a − 1| ≤ |3 − a|  ⇔  9a<sup>2</sup> − 6a + 1 ≤ 9 − 6a + a<sup>2</sup>", "Kosinus zavzame vrednosti iz [−1, 1]; obe strani kvadriramo."),
        ("!3.3  8a<sup>2</sup> ≤ 8  ⇔  −1 ≤ a ≤ 1", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

v4 = naloga(
    4, ["kombinatorika", "verjetnostni_racun"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Mali Niko, ki še ne zna brati, se igra s starim pisalnim strojem s \(45\) enako velikimi "
    r"tipkami: \(25\) velikih črk slovenske abecede, \(10\) števk in \(10\) simbolov.<br>"
    r"4.1. Niko na slepo pritisne eno tipko. Kolikšna je verjetnost dogodka \(A\), da pritisne eno od črk svojega imena NIKO? (3 točke)<br>"
    r"4.2. Na slepo natipka \(4\) znake. Kolikšna je verjetnost dogodka \(B\), da napiše NIKO, in dogodka \(C\), da natipka vse štiri črke "
    r"svojega imena v kakršnem koli vrstnem redu? (4 točke)<br>"
    r"4.3. Na slepo natipka \(3\) znake. Kolikšna je verjetnost dogodka \(D\), da natipka tri enake števke, če vemo, da je najprej pritisnil "
    r"sodo števko? (3 točke)<br>"
    r"4.4. Na slepo natipka \(12\) znakov. Kolikšna je verjetnost dogodka \(E\), da je natanko desetkrat natipkal črko? (3 točke)",
    r"4.1. \(\frac{4}{45}\) &nbsp; 4.2. \(\frac{1}{45^4}\), \(\frac{24}{45^4}\) &nbsp; 4.3. \(\frac{1}{2025}\) &nbsp; 4.4. \(\approx 0{,}0365\)",
    [
        ("!4.1  P(A) = " + U("4", "45"), "Ugodne so 4 tipke (N, I, K, O)."),
        ("!P(B) = (" + U("1", "45") + ")<sup>4</sup> ≈ 2,4 · 10<sup>−7</sup>", "Vsak znak mora biti točno določen; pritiski so neodvisni."),
        ("!P(C) = " + U("4!", "45<sup>4</sup>") + " ≈ 5,9 · 10<sup>−6</sup>", "Štiri črke lahko natipka v 4! vrstnih redih (permutacije)."),
        ("!4.3  P(D) = (" + U("1", "45") + ")<sup>2</sup> = " + U("1", "2025"), "Pogojna verjetnost: prva števka je dana, naslednji dve morata biti enaki njej."),
        ("p = " + U("25", "45") + " = " + U("5", "9"), "Verjetnost, da posamezen znak je črka."),
        ("!4.4  P(E) = " + BINOM(12, 10) + " (" + U("5", "9") + ")<sup>10</sup> (" + U("4", "9") + ")<sup>2</sup> ≈ 0,0365", "Bernoullijeva formula."),
    ],
)

POLA2 = [v1, v2, v3, v4]
