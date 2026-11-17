# Jesenski rok 2006 (uradna pola RIC P062-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2006, "jesenski", "ponedeljek, 28. avgust 2006"

# ------------------------------------------------------------------ 1. del


def daljica(X, Y):
    return (f'<line x1="{X(-1):.1f}" y1="{Y(-2):.1f}" x2="{X(3):.1f}" y2="{Y(1):.1f}" stroke="{MODRA}" stroke-width="2.5"/>'
            + tocka(X, Y, -1, -2, "A", -14, 4) + tocka(X, Y, 3, 1, "B", 6, -4))


a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"V koordinatni sistem nariši daljico s krajiščema \(A(-1, -2)\) in \(B(3, 1)\) ter izračunaj njeno dolžino.",
    r"\(|AB| = 5\)",
    [
        ("@slika", mreza((-3, 5), (-3, 3), daljica, sirina=260)),
        ("|AB| = " + K("(3 + 1)<sup>2</sup> + (1 + 2)<sup>2</sup>") + " = " + K("16 + 9"), "", "razdalja"),
        ("!|AB| = 5", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Za \(a = 3\) in \(b = -1\) izračunaj vrednost izraza \(\dfrac{(a + b)^2}{ab} - \dfrac{(a - b)^2}{ab}\).",
    r"\(4\)",
    [
        ("(a + b)<sup>2</sup> = 2<sup>2</sup> = 4,  (a − b)<sup>2</sup> = 4<sup>2</sup> = 16,  ab = −3", ""),
        ("!" + U("4 − 16", "−3") + " = " + U("−12", "−3") + " = 4", ""),
        (None, "Splošno: (a + b)² − (a − b)² = 4ab, zato je vrednost izraza vedno 4."),
    ],
)

a3 = naloga(
    "A3", "izrazi_potence", 4,
    r"Poenostavi izraz \(\sqrt[3]{x^2\sqrt{x^6}} \cdot \sqrt[3]{x}\) (\(x > 0\)).",
    r"\(x^2\)",
    [
        (K("x<sup>6</sup>") + " = x<sup>3</sup>", "", "koreni"),
        ("∛(x<sup>2</sup> · x<sup>3</sup>) = ∛(x<sup>5</sup>) = x<sup>5/3</sup>", "", "potence"),
        ("!x<sup>5/3</sup> · x<sup>1/3</sup> = x<sup>6/3</sup> = x<sup>2</sup>", ""),
    ],
)


def presek_valja():
    t = ['<rect x="60" y="15" width="60" height="120" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<rect x="60" y="15" width="60" height="120" fill="{MODRA}" fill-opacity="0.12"/>',
         napis(90, 150, "6 cm", 11), napis(126, 79, "1,2 dm", 11, sidro="start")]
    return svg(190, 160, "".join(t), opis="Osni presek valja")


a4 = naloga(
    "A4", "povrsine_prostornine", 4,
    r"Na skici je osni presek pokončnega valja s širino \(6\) cm in višino \(1{,}2\) dm. Natančno izračunaj površino valja." + presek_valja(),
    r"\(P = 90\pi\ \mathrm{cm^2}\)",
    [
        ("r = 3 cm,  v = 12 cm", "Širina osnega preseka je premer; 1,2 dm = 12 cm."),
        ("P = 2πr(r + v) = 2π · 3 · 15", "", "telesa"),
        ("!P = 90π cm<sup>2</sup> ≈ 282,74 cm<sup>2</sup>", ""),
    ],
)

a5 = naloga(
    "A5", "eksponentna_logaritemska", 4,
    r"Določi \(x\), če je \(\log_2\left(\frac{x}{3} + 1\right) = 3\).",
    r"\(x = 21\)",
    [
        (U("x", "3") + " + 1 = 2<sup>3</sup> = 8", "", "logaritem"),
        ("!x = 21", ""),
    ],
)


def daljice_a6():
    s = 16
    A, B, O = (30, 150), (30 + 3 * s, 150), (30 + 12 * s, 150)
    D = (65, 30)
    C = (O[0] + 0.75 * (D[0] - O[0]), O[1] + 0.75 * (D[1] - O[1]))
    ln = lambda P, Q, b="currentColor": f'<line x1="{P[0]:.1f}" y1="{P[1]:.1f}" x2="{Q[0]:.1f}" y2="{Q[1]:.1f}" stroke="{b}" stroke-width="1.4"/>'
    t = [ln(A, O), ln(A, D), ln(D, O), ln(B, C, RDECA),
         napis(A[0] - 6, A[1] + 15, "A"), napis(B[0], B[1] + 15, "B"), napis(O[0] + 6, O[1] + 15, "O"),
         napis(D[0] - 6, D[1] - 4, "D"), napis(C[0] + 4, C[1] - 6, "C"),
         napis((A[0] + B[0]) / 2, A[1] + 14, "3", 11), napis((B[0] + O[0]) / 2, A[1] + 14, "9", 11),
         napis((A[0] + D[0]) / 2 - 8, (A[1] + D[1]) / 2, "8", 11), napis((D[0] + C[0]) / 2, (D[1] + C[1]) / 2 - 6, "4", 11),
         napis((B[0] + C[0]) / 2 - 8, (B[1] + C[1]) / 2 + 4, "x", 12, RDECA), napis((C[0] + O[0]) / 2 + 6, (C[1] + O[1]) / 2 - 6, "y", 12),
         napis(200, 40, "AD ∥ BC", 11)]
    return svg(250, 172, "".join(t), opis="Trikotnik z vzporednico")


a6 = naloga(
    "A6", "geometrija_ravnine", 5,
    r"Izračunaj dolžini neznanih daljic \(x = |BC|\) in \(y = |CO|\) na skici, kjer je \(AD \parallel BC\), \(|AD| = 8\), \(|DC| = 4\), \(|AB| = 3\), \(|BO| = 9\)." + daljice_a6(),
    r"\(x = 6\), \(y = 12\)",
    [
        ("trikotnika OBC in OAD sta podobna", "Ker je BC ∥ AD, imata enake kote."),
        (U("x", "8") + " = " + U("|OB|", "|OA|") + " = " + U("9", "12") + "  ⇒  x = 6", ""),
        ("!x = 6", ""),
        (U("y", "y + 4") + " = " + U("9", "12") + "  ⇒  12y = 9y + 36", "Enako razmerje velja za kraka na premici OD."),
        ("!y = 12", ""),
    ],
)

a7 = naloga(
    "A7", "polinomi_racionalna", 5,
    r"Določi stopnjo, vodilni člen in konstantni člen polinoma \(p(x) = (3x^2 - 1)(2x^3 + x - 4)\).",
    r"stopnja \(5\), vodilni člen \(6x^5\), konstantni člen \(4\)",
    [
        ("!stopnja: 2 + 3 = 5", ""),
        ("!vodilni člen: 3x<sup>2</sup> · 2x<sup>3</sup> = 6x<sup>5</sup>", ""),
        ("!konstantni člen: (−1) · (−4) = 4", "Produkt prostih členov faktorjev."),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Seštej vsa naravna števila, manjša od \(120\), ki so deljiva s \(7\).",
    r"\(1071\)",
    [
        ("7, 14, 21, …, 119", "Aritmetično zaporedje z d = 7; 119 = 7 · 17.", "aritmeticno"),
        ("n = 17", ""),
        ("!s<sub>17</sub> = " + U("17", "2") + " · (7 + 119) = 17 · 63 = 1071", ""),
    ],
)

OC = [(1, 3), (2, 6), (3, 12), (4, 9), (5, 6)]

a9 = naloga(
    "A9", "statistika_pm", 5,
    r"V preglednici so rezultati šolske naloge (izmišljeni podatki). Izračunaj povprečno oceno in dopolni preglednico z relativnimi frekvencami."
    + tabela(["ocena", "frekvenca", "relativna frekvenca"], [[str(o), str(f), ""] for o, f in OC]),
    r"\(3{,}25\)",
    [
        ("N = 3 + 6 + 12 + 9 + 6 = 36", ""),
        ("x̄ = " + U("1 · 3 + 2 · 6 + 3 · 12 + 4 · 9 + 5 · 6", "36") + " = " + U("117", "36"), "", "statistika"),
        ("!x̄ = 3,25", ""),
        ("@slika", tabela(["ocena", "frekvenca", "relativna frekvenca"],
                          [["1", "3", "3/36 ≈ 8,3 %"], ["2", "6", "6/36 ≈ 16,7 %"], ["3", "12", "12/36 ≈ 33,3 %"], ["4", "9", "9/36 = 25 %"], ["5", "6", "6/36 ≈ 16,7 %"]])),
    ],
)

# ------------------------------------------------------------------ 2. del


def kosinus2(X, Y):
    f = lambda x: 2 * math.cos(x)
    t = krivulja(X, Y, f, -math.pi, 2 * math.pi, MODRA)
    for k, s in [(-1, "−π"), (-0.5, "−π/2"), (0.5, "π/2"), (1, "π"), (1.5, "3π/2"), (2, "2π")]:
        x = k * math.pi
        t += f'<line x1="{X(x):.1f}" y1="{Y(0) - 3:.1f}" x2="{X(x):.1f}" y2="{Y(0) + 3:.1f}" stroke="currentColor"/>' + napis(X(x), Y(0) + 15, s, 9)
    t += napis(X(0) - 5, Y(2) + 4, "2", 10, sidro="end") + napis(X(0) - 5, Y(-2) + 4, "−2", 10, sidro="end")
    t += tocka(X, Y, -math.pi, -2) + tocka(X, Y, 0, 2) + tocka(X, Y, math.pi, -2) + tocka(X, Y, 2 * math.pi, 2)
    return t


b1 = naloga(
    "B1", "kotne_funkcije_pm", 15,
    r"Dana je funkcija \(f(x) = 2\cos x\).<br>"
    r"1.1. Določi zalogo vrednosti, ničle ter abscise minimumov in maksimumov funkcije. (5 točk)<br>"
    r"1.2. Nariši graf funkcije na intervalu \([-\pi, 2\pi]\). (6 točk)<br>"
    r"1.3. Izračunaj natančno vrednost \(f(780^\circ)\). (4 točke)",
    r"1.1. \([-2, 2]\); ničle \(\frac{\pi}{2} + k\pi\); maksimumi \(2k\pi\), minimumi \(\pi + 2k\pi\) &nbsp; 1.3. \(1\)",
    [
        "## 1.1",
        ("!Z<sub>f</sub> = [−2, 2]", "Kosinus zavzame vrednosti od −1 do 1, faktor 2 jih raztegne.", "D_v"),
        ("!ničle: x = " + U("π", "2") + " + kπ,  k ∈ ℤ", ""),
        ("!maksimumi (vrednost 2): x = 2kπ;  minimumi (vrednost −2): x = π + 2kπ", ""),
        "## 1.2",
        ("@slika", mreza((-3.6, 6.8), (-2.6, 2.6), kosinus2, sirina=360, visina=170, oznake=False)),
        "## 1.3",
        ("780° = 2 · 360° + 60°", "Kosinus je periodičen s periodo 360°.", "kotne"),
        ("!f(780°) = 2 cos 60° = 2 · " + U("1", "2") + " = 1", ""),
    ],
)

PB2 = lambda x: x * x - 4 * x + 3


def risba_b2(X, Y):
    t = krivulja(X, Y, PB2, -1.2, 5.2, MODRA)
    t += f'<line x1="{X(-2):.1f}" y1="{Y(-1):.1f}" x2="{X(6):.1f}" y2="{Y(-1):.1f}" stroke="currentColor" stroke-dasharray="4 3"/>'
    t += f'<line x1="{X(-2):.1f}" y1="{Y(8):.1f}" x2="{X(6):.1f}" y2="{Y(8):.1f}" stroke="{RDECA}"/>'
    t += f'<line x1="{X(-1):.1f}" y1="{Y(8):.1f}" x2="{X(5):.1f}" y2="{Y(8):.1f}" stroke="{RDECA}" stroke-width="3"/>'
    t += tocka(X, Y, 2, -1, "T", 6, 12) + tocka(X, Y, 1, 0) + tocka(X, Y, 3, 0) + tocka(X, Y, 0, 3) + tocka(X, Y, -1, 8, "P", -4, -6) + tocka(X, Y, 5, 8, "Q", 6, -6)
    return t


b2 = naloga(
    "B2", "kvadratna_funkcija", 15,
    r"Dana je parabola \(y = x^2 - 4x + 3\).<br>"
    r"2.1. Parabolo natančno nariši. (6 točk)<br>"
    r"2.2. Zapiši enačbo premice, ki gre skozi teme parabole in je vzporedna abscisni osi. (3 točke)<br>"
    r"2.3. Izračunaj dolžino daljice, ki jo parabola odreže na premici \(y = 8\). (6 točk)",
    r"2.1. \(T(2, -1)\), ničli \(1\) in \(3\) &nbsp; 2.2. \(y = -1\) &nbsp; 2.3. \(6\)",
    [
        "## 2.1",
        ("teme: p = 2,  q = 4 − 8 + 3 = −1  ⇒  T(2, −1)", "", "teme"),
        ("ničli: (x − 1)(x − 3) = 0  ⇒  x = 1, x = 3;  presečišče z osjo y: (0, 3)", "", "kvadratna"),
        ("@slika", mreza((-2, 6), (-2, 10), risba_b2, sirina=260)),
        "## 2.2",
        ("!y = −1", "Vodoravna premica skozi T ima enačbo y = q."),
        "## 2.3",
        ("x<sup>2</sup> − 4x + 3 = 8  ⇒  x<sup>2</sup> − 4x − 5 = 0", ""),
        ("(x + 1)(x − 5) = 0  ⇒  P(−1, 8),  Q(5, 8)", ""),
        ("!|PQ| = 5 − (−1) = 6", ""),
    ],
)

b3 = naloga(
    "B3", "ulomki_odstotki", 15,
    r"Janez je na bančni račun položil \(5000\) EUR. Letna obrestna mera je \(3\,\%\), pripis obresti je letni, obrestovanje obrestnoobrestno.<br>"
    r"3.1. Koliko denarja bo imel Janez po dveh letih? (5 točk)<br>"
    r"3.2. Koliko denarja bo imel po sedmih letih, če po dveh letih položi še \(2000\) EUR? (4 točke)<br>"
    r"3.3. Kolikšna bi morala biti letna obrestna mera, da bi se začetna vloga podvojila v \(12\) letih? (6 točk)",
    r"3.1. \(5304{,}50\) EUR &nbsp; 3.2. \(\approx 8467{,}92\) EUR &nbsp; 3.3. \(\approx 5{,}95\,\%\)",
    [
        "## 3.1",
        ("!G<sub>2</sub> = 5000 · 1,03<sup>2</sup> = 5304,50 EUR", "", "obresti"),
        "## 3.2",
        ("5304,50 + 2000 = 7304,50 EUR", "Novi znesek se obrestuje še 5 let."),
        ("!G<sub>7</sub> = 7304,50 · 1,03<sup>5</sup> ≈ 8467,92 EUR", ""),
        "## 3.3",
        ("G<sub>0</sub> · r<sup>12</sup> = 2G<sub>0</sub>  ⇒  r<sup>12</sup> = 2", "Začetna vloga se pokrajša."),
        ("r = ¹²" + K("2") + " ≈ 1,0595", "", "potence"),
        ("!p ≈ 5,95 %", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
