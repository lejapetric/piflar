# Jesenski rok 2004 (uradni poli RIC: m042-401-1-1 osnovna raven, m042-402-1-2 višja raven, pola 2)
# Leta 2004 je imela pola 1 osnovne ravni 12 nalog za 72 točk, pola 2 višje ravni pa tri obvezne naloge za 72 točk.
import math
from lib import (U, K, V, INT, MEJA, naloga, mreza, krivulja, tocka, svg, MODRA, RDECA)

LETO, ROK = 2004, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1 (osnovna raven)
def slika1(X, Y):
    T = [(0, -2), (4, 0), (4, 3), (0, 3)]
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in T)
    return (f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>'
            + tocka(X, Y, 0, -2, "A", -14, 4) + tocka(X, Y, 4, 0, "B", 6, 4) + tocka(X, Y, 4, 3, "C", 6, -4) + tocka(X, Y, 0, 3, "D", -14, -4))

n1 = naloga(
    1, "pravokotni_koordinatni_sistem_ravnina", 5,
    r"V koordinatni sistem nariši točke \(A(0, -2)\), \(B(4, 0)\), \(C(4, 3)\) in \(D(0, 3)\) ter izračunaj ploščino štirikotnika \(ABCD\).",
    r"\(S = 16\)",
    [
        ("@slika", mreza((-2, 6), (-3, 4), slika1, sirina=240)),
        ("AD in BC sta vzporedni (obe navpični): |AD| = 5, |BC| = 3", "Štirikotnik je trapez."),
        ("višina trapeza v = 4", "Razdalja med premicama x = 0 in x = 4."),
        ("!S = " + U("5 + 3", "2") + " · 4 = 16", "Ploščina trapeza."),
    ],
)


def slika2(X, Y):
    f = lambda x: 0.5 * x * x - x - 4
    return (krivulja(X, Y, f, -2.9, 4.9) + tocka(X, Y, -2, 0, "−2", -14, -6) + tocka(X, Y, 4, 0, "4", 6, -6)
            + tocka(X, Y, 1, -4.5, "T", 6, 12) + tocka(X, Y, 0, -4, "", 0, 0))

n2 = naloga(
    2, "funkcije", 7,
    r"Izračunaj ničli, teme in presečišče z ordinatno osjo ter nariši graf kvadratne funkcije \(f(x) = \frac{1}{2}x^2 - x - 4\).",
    r"\(x_1 = -2\), \(x_2 = 4\), \(T(1, -\frac{9}{2})\), \((0, -4)\)",
    [
        (U("1", "2") + "x<sup>2</sup> − x − 4 = 0  ⇒  x<sup>2</sup> − 2x − 8 = 0  ⇒  (x − 4)(x + 2) = 0", "Pomnožimo z 2."),
        ("!x<sub>1</sub> = −2,  x<sub>2</sub> = 4", ""),
        ("p = −" + U("b", "2a") + " = 1,  q = f(1) = −" + U("9", "2"), "Abscisa temena je tudi sredina med ničlama."),
        ("!T(1, −" + U("9", "2") + "),  presečišče z osjo y: (0, −4)", "f(0) = −4."),
        ("@slika", mreza((-3, 5), (-5, 4), slika2, sirina=240)),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n3 = naloga(
    3, "pravokotni_koordinatni_sistem_ravnina", 5,
    r"Premica \(p\) poteka skozi točki \(A(-1, -2)\) in \(B(3, 1)\). Na stotinko stopinje natančno izračunaj kot \(\alpha\), pod katerim premica seka "
    r"os \(x\), in kot \(\beta\), pod katerim seka os \(y\).",
    r"\(\alpha \approx 36{,}87^\circ\), \(\beta \approx 53{,}13^\circ\)",
    [
        ("k = " + U("1 − (−2)", "3 − (−1)") + " = " + U("3", "4"), "Smerni koeficient premice."),
        ("tan α = k = " + U("3", "4"), ""),
        ("!α ≈ 36,87°", ""),
        ("!β = 90° − α ≈ 53,13°", "Osi sta pravokotni, zato se kota dopolnjujeta do 90°."),
    ],
)

n4 = naloga(
    4, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Reši enačbo \(\dfrac{x}{x - 2} + \dfrac{2}{x + 2} = \dfrac{8}{x^2 - 4}\).",
    r"\(x = -6\)",
    [
        ("x ≠ 2,  x ≠ −2", "Imenovalci ne smejo biti 0."),
        ("x(x + 2) + 2(x − 2) = 8", "Pomnožimo s skupnim imenovalcem x² − 4 = (x − 2)(x + 2)."),
        ("x<sup>2</sup> + 4x − 12 = 0  ⇒  (x + 6)(x − 2) = 0", ""),
        ("x = 2 ni rešitev (ni v definicijskem območju)", ""),
        ("!x = −6", ""),
    ],
)

n5 = naloga(
    5, "potence_koreni", 6,
    r"Poenostavi izraz \(\left(\dfrac{a\sqrt{a}\cdot b^{-1}}{\sqrt[3]{a^3 b^{-3}}}\right)^{2} \cdot \dfrac{a^0 + b^0}{2b}\); \(a, b > 0\).",
    r"\(\dfrac{a}{b}\)",
    [
        ("a" + K("a") + " = a<sup>3/2</sup>", ""),
        (K("a<sup>3</sup>b<sup>−3</sup>", 3) + " = a b<sup>−1</sup>", ""),
        (U("a<sup>3/2</sup> b<sup>−1</sup>", "a b<sup>−1</sup>") + " = a<sup>1/2</sup>,  (a<sup>1/2</sup>)<sup>2</sup> = a", "Potence z enako osnovo delimo tako, da eksponente odštejemo."),
        ("a<sup>0</sup> + b<sup>0</sup> = 1 + 1 = 2", ""),
        ("!a · " + U("2", "2b") + " = " + U("a", "b"), ""),
    ],
)

n6 = naloga(
    6, "funkcije", 6,
    r"Reši enačbo \(\cos 2x - \cos x = 0\).",
    r"\(x = 2k\pi\), \(x = \pm\frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("cos 2x = 2 cos<sup>2</sup> x − 1", "Kosinus dvojnega kota."),
        ("2 cos<sup>2</sup> x − cos x − 1 = 0  ⇒  (cos x − 1)(2 cos x + 1) = 0", "Kvadratna enačba za cos x."),
        ("!cos x = 1:  x = 2kπ", ""),
        ("!cos x = −" + U("1", "2") + ":  x = ±" + U("2π", "3") + " + 2kπ,  k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n7 = naloga(
    7, "stoznice", 6,
    r"Zapiši enačbo krožnice, ki poteka skozi izhodišče koordinatnega sistema, njeno središče pa je v presečišču premic \(x + 2y - 7 = 0\) in \(y - 2 = 0\).",
    r"\((x - 3)^2 + (y - 2)^2 = 13\)",
    [
        ("y = 2  ⇒  x + 4 − 7 = 0  ⇒  x = 3", "Presečišče premic."),
        ("S(3, 2)", ""),
        ("r<sup>2</sup> = 3<sup>2</sup> + 2<sup>2</sup> = 13", "Polmer je razdalja od S do izhodišča."),
        ("!(x − 3)<sup>2</sup> + (y − 2)<sup>2</sup> = 13", ""),
    ],
)

n8 = naloga(
    8, "funkcije", 6,
    r"Reši enačbo \(\log_{27}(x^2 - 8x) = \frac{2}{3}\).",
    r"\(x_1 = 9\), \(x_2 = -1\)",
    [
        ("x<sup>2</sup> − 8x = 27<sup>2/3</sup>", "Definicija logaritma."),
        ("27<sup>2/3</sup> = (" + K("27", 3) + ")<sup>2</sup> = 9", ""),
        ("x<sup>2</sup> − 8x − 9 = 0  ⇒  (x − 9)(x + 1) = 0", ""),
        ("!x<sub>1</sub> = 9,  x<sub>2</sub> = −1", "Pri obeh je x² − 8x = 9 > 0, zato obe ustrezata."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n9 = naloga(
    9, "verjetnostni_racun", 6,
    r"Zapiši prvih deset členov zaporedja \(a_n = n^2 + 3\). Kolikšna je verjetnost dogodka, da je naključno izbrano število izmed teh desetih "
    r"členov deljivo s \(3\)?",
    r"\(4, 7, 12, 19, 28, 39, 52, 67, 84, 103\); \(P = 0{,}3\)",
    [
        ("!4, 7, 12, 19, 28, 39, 52, 67, 84, 103", "Vstavimo n = 1, 2, …, 10."),
        ("vseh izidov: n = 10", ""),
        ("deljivi s 3: 12, 39, 84,  m = 3", "n² + 3 je deljivo s 3 natanko tedaj, ko je n deljivo s 3."),
        ("!P = " + U("3", "10") + " = 0,3", ""),
    ],
)

n10 = naloga(
    10, "stevilske_mnozice", 6,
    r"Izračunaj realno število \(x\) tako, da bo tudi število \(z = 4i^3 - 2x\,i^2 + (x + 1)\,i - 3\) realno (\(i\) je imaginarna enota).",
    r"\(x = 3\)",
    [
        ("i<sup>2</sup> = −1,  i<sup>3</sup> = −i", ""),
        ("z = −4i + 2x + (x + 1)i − 3 = (2x − 3) + (x − 3)i", "Uredimo na realni in imaginarni del."),
        ("Im z = x − 3 = 0", "Število je realno, če je imaginarni del 0."),
        ("!x = 3", ""),
    ],
)

n11 = naloga(
    11, "diferencialni_racun", 7,
    r"Polinom \(p(x) = x^3 - 3x^2 + ax + 4\) ima lokalni minimum v točki \(A(3, y_1)\). Izračunaj realno število \(a\) in ordinato \(y_1\).",
    r"\(a = -9\), \(y_1 = -23\)",
    [
        ("p '(x) = 3x<sup>2</sup> − 6x + a", ""),
        ("p '(3) = 27 − 18 + a = 0", "V lokalnem ekstremu je odvod 0."),
        ("!a = −9", ""),
        ("!y<sub>1</sub> = p(3) = 27 − 27 − 27 + 4 = −23", "p ''(3) = 12 > 0, zato je to res minimum."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)


def slika12(X, Y):
    xs = [9 * i / 60 for i in range(61)]
    pot = f"{X(0):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(2 * math.sqrt(x)):.1f}" for x in xs) + f" {X(9):.1f},{Y(0):.1f}"
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>' + krivulja(X, Y, lambda x: 2 * math.sqrt(x), 0, 10.5)
            + tocka(X, Y, 1, 2, "(1, 2)", 4, -6) + tocka(X, Y, 4, 4, "(4, 4)", 4, -6) + tocka(X, Y, 9, 6, "(9, 6)", -10, -8))

n12 = naloga(
    12, "integralski_racun", 7,
    r"Nariši graf funkcije \(f(x) = 2\sqrt{x}\) in izračunaj ploščino lika, ki ga na intervalu \([0, 9]\) omejujeta graf funkcije \(f\) in abscisna os.",
    r"\(S = 36\)",
    [
        ("@slika", mreza((-1, 11), (-1, 8), slika12, sirina=300)),
        ("S = " + INT("9", "0") + "2" + K("x") + " dx", ""),
        ("∫ 2x<sup>1/2</sup> dx = " + U("4", "3") + "x<sup>3/2</sup> + C", ""),
        ("!S = " + U("4", "3") + " · 27 − 0 = 36", "9^{3/2} = 27."),
    ],
    snov=INTS,
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def trikotnik_v1():
    s = 150
    A, B = (25, 160), (25 + s, 160)
    C = (25 + s / 2, 160 - s * math.sqrt(3) / 2)
    D = (B[0] + (C[0] - B[0]) / 3, B[1] + (C[1] - B[1]) / 3)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{D[0]:.1f}" y2="{D[1]:.1f}" stroke="{RDECA}" stroke-width="2"/>',
         f'<circle cx="{D[0]:.1f}" cy="{D[1]:.1f}" r="3" fill="currentColor"/>',
         napis(A[0] - 10, A[1] + 4, "A"), napis(B[0] + 10, B[1] + 4, "B"), napis(C[0], C[1] - 7, "C"), napis(D[0] + 11, D[1] + 2, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "a⃗", 12), napis((A[0] + C[0]) / 2 - 12, (A[1] + C[1]) / 2, "b⃗", 12)]
    return svg(200, 185, "".join(t), opis="Enakostranični trikotnik ABC s točko D na stranici BC")

v1 = naloga(
    1, "vektorji_ravnina_prostor", 21,
    r"V enakostraničnem trikotniku \(ABC\) s stranico dolžine \(6\) naj bosta \(\vec{AB} = \vec{a}\) in \(\vec{AC} = \vec{b}\). Točka \(D\) leži na "
    r"stranici \(BC\) tako, da je \(BD : DC = 1 : 2\).<br>"
    r"a) Izrazi vektor \(\vec{AD}\) z vektorjema \(\vec{a}\) in \(\vec{b}\) ter izračunaj njegovo točno dolžino. (5 točk)<br>"
    r"b) Izračunaj kot med vektorjema \(\vec{AD}\) in \(\vec{AC}\) na minuto natančno. (5 točk)<br>"
    r"c) Izračunaj število \(x\) tako, da bo vektor \(x\vec{a} + 2\vec{b}\) vzporeden vektorju \(3\vec{a} - \vec{b}\). (5 točk)<br>"
    r"d) Izračunaj število \(y\) tako, da bo vektor \(\vec{a} + y\vec{b}\) pravokoten na vektor \(4\vec{a} - 3\vec{b}\). (6 točk)",
    r"a) \(\vec{AD} = \frac{2}{3}\vec{a} + \frac{1}{3}\vec{b}\), \(|\vec{AD}| = 2\sqrt{7}\) &nbsp; b) \(40^\circ 54'\) &nbsp; c) \(x = -6\) &nbsp; d) \(y = \frac{5}{2}\)",
    [
        ("@slika", trikotnik_v1()),
        (V("AD") + " = " + V("a") + " + " + U("1", "3") + V("BC") + " = " + V("a") + " + " + U("1", "3") + "(" + V("b") + " − " + V("a") + ")", ""),
        ("!a) " + V("AD") + " = " + U("2", "3") + V("a") + " + " + U("1", "3") + V("b"), ""),
        (V("a") + " · " + V("b") + " = 6 · 6 · cos 60° = 18", "Kot v enakostraničnem trikotniku je 60°."),
        ("|" + V("AD") + "|<sup>2</sup> = " + U("4", "9") + " · 36 + 2 · " + U("2", "9") + " · 18 + " + U("1", "9") + " · 36 = 16 + 8 + 4 = 28", "Kvadriramo skalarno."),
        ("!|" + V("AD") + "| = 2" + K("7"), ""),
        (V("AD") + " · " + V("b") + " = " + U("2", "3") + " · 18 + " + U("1", "3") + " · 36 = 24", ""),
        ("cos φ = " + U("24", "2" + K("7") + " · 6") + " = " + U("2", K("7")) + " ≈ 0,7559", ""),
        ("!b) φ ≈ 40,893° ≈ 40°54'", ""),
        ("x" + V("a") + " + 2" + V("b") + " = m(3" + V("a") + " − " + V("b") + ")  ⇒  x = 3m,  2 = −m", "Vektorja a in b nista vzporedna, zato primerjamo koeficienta."),
        ("!c) m = −2,  x = −6", ""),
        ("(" + V("a") + " + y" + V("b") + ") · (4" + V("a") + " − 3" + V("b") + ") = 0", "Pravokotna vektorja imata skalarni produkt 0."),
        ("4 · 36 − 3 · 18 + 4y · 18 − 3y · 36 = 90 − 36y = 0", "a·a = b·b = 36, a·b = 18."),
        ("!d) y = " + U("5", "2"), ""),
    ],
)


def graf_v2(X, Y):
    f = lambda x: x + 27 / (x * x)
    xs = [1 + 2 * i / 40 for i in range(41)]
    pot = " ".join(f"{X(x):.1f},{Y(min(f(x), 10)):.1f}" for x in xs) + " " + " ".join(f"{X(x):.1f},{Y(x):.1f}" for x in reversed(xs))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25"/>'
            + krivulja(X, Y, lambda x: x, -5, 7, RDECA)
            + krivulja(X, Y, f, -5, -1.57) + krivulja(X, Y, f, 1.82, 7)
            + tocka(X, Y, -3, 0, "N(−3, 0)", -10, 16) + tocka(X, Y, 54 ** (1 / 3), 4.5 * 2 ** (1 / 3), "T", 0, -8)
            + f'<text x="{X(6.2):.1f}" y="{Y(4.6):.1f}" font-size="12" fill="{RDECA}">y = x</text>')


def slika_v2c(X, Y):
    f = lambda x: x + 27 / (x * x)
    x0 = 2.38
    return (krivulja(X, Y, f, 1.82, 6)
            + f'<polygon points="{X(0):.1f},{Y(0):.1f} {X(x0):.1f},{Y(0):.1f} {X(0):.1f},{Y(f(x0)):.1f}" fill="{MODRA}" fill-opacity="0.25" stroke="{MODRA}"/>'
            + f'<line x1="{X(0):.1f}" y1="{Y(f(x0)):.1f}" x2="{X(x0):.1f}" y2="{Y(f(x0)):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
            + f'<line x1="{X(x0):.1f}" y1="{Y(0):.1f}" x2="{X(x0):.1f}" y2="{Y(f(x0)):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
            + tocka(X, Y, x0, f(x0), "P", 6, -4) + tocka(X, Y, x0, 0, "M", 4, 14) + tocka(X, Y, 0, f(x0), "N", -16, 4))

v2 = naloga(
    2, ["funkcije", "diferencialni_racun", "integralski_racun"], 27,
    r"Dana je funkcija \(f(x) = \dfrac{x^3 + 27}{x^2}\).<br>"
    r"a) Zapiši definicijsko območje, ničlo, pol, poševno asimptoto in stacionarno točko. (Obe koordinati stacionarne točke zapiši na eno decimalko natančno.) (10 točk)<br>"
    r"b) Nariši graf funkcije \(f\). Izračunaj ploščino lika, ki ga oklepajo graf funkcije \(f\) ter premice \(y = x\), \(x = 1\) in \(x = 3\). (10 točk)<br>"
    r"c) Točka \(P(x, f(x))\), \(x > 0\), leži na grafu funkcije \(f\). Vzporednica abscisni osi skozi \(P\) seka ordinatno os v točki \(N\), vzporednica "
    r"ordinatni osi skozi \(P\) pa seka abscisno os v točki \(M\). Izračunaj natančno absciso točke \(P\), za katero je ploščina trikotnika \(OMN\) "
    r"ekstremna. Nariši sliko. (7 točk)",
    r"a) \(D = \mathbb{R}\setminus\{0\}\), ničla \(-3\), pol \(x = 0\), asimptota \(y = x\), \(T(3{,}8;\ 5{,}7)\) &nbsp; b) \(S = 18\) &nbsp; "
    r"c) \(x = \sqrt[3]{\frac{27}{2}} = \frac{3}{2}\sqrt[3]{4}\)",
    [
        ("!a) D = ℝ \\ {0}", "Imenovalec x² ne sme biti 0."),
        ("x<sup>3</sup> + 27 = 0  ⇒  x = −3", ""),
        ("!ničla x = −3,  pol x = 0 (sode stopnje)", ""),
        ("f(x) = x + " + U("27", "x<sup>2</sup>"), "Delimo števec z imenovalcem."),
        ("!poševna asimptota y = x", "Ostanek 27/x² gre proti 0, ko gre x proti ±∞."),
        ("f '(x) = 1 − " + U("54", "x<sup>3</sup>") + " = 0  ⇒  x<sup>3</sup> = 54", ""),
        ("!T(" + K("54", 3) + ", f(" + K("54", 3) + ")) ≈ T(3,8; 5,7)", "f(∛54) = ∛54 + 27/∛2916 ≈ 3,78 + 1,89."),
        ("@slika", mreza((-5, 7), (-5, 10), graf_v2, sirina=300, visina=360, oznake=True)),
        ("S = " + INT("3", "1") + "(f(x) − x) dx = " + INT("3", "1") + U("27", "x<sup>2</sup>") + " dx", "Na [1, 3] je graf f nad premico y = x."),
        ("= −" + U("27", "x") + MEJA("3", "1") + " = −9 + 27", ""),
        ("!b) S = 18", ""),
        ("@slika", mreza((-1, 6), (-1, 10), slika_v2c, sirina=200, visina=280, oznake=True)),
        ("S(x) = " + U("1", "2") + " · x · f(x) = " + U("1", "2") + "(x<sup>2</sup> + " + U("27", "x") + ")", "Trikotnik OMN je pravokoten; kateti sta x in f(x)."),
        ("S '(x) = x − " + U("27", "2x<sup>2</sup>") + " = 0  ⇒  x<sup>3</sup> = " + U("27", "2"), ""),
        ("!c) x = " + K(U("27", "2"), 3) + " = " + U("3", "2") + K("4", 3) + " ≈ 2,38", "S ''(x) = 1 + 27/x³ > 0, zato je ploščina tu najmanjša."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v3 = naloga(
    3, "zaporedja_vrste", 24,
    r"Prva dva člena neskončne geometrijske vrste sta \(a_1 = x\) in \(a_2 = x^2 - 2x\) (\(x \in \mathbb{R}\), \(x \ne 0\), \(x \ne 2\)).<br>"
    r"a) Za katere vrednosti \(x\) je vrsta konvergentna (ima vsoto)? (5 točk)<br>"
    r"b) Izračunaj \(x\) tako, da bo vsota vrste enaka \(5\). (4 točke)<br>"
    r"c) Izračunaj \(x\) tako, da bo \(a_1 a_2 = a_1 - 2\). (5 točk)<br>"
    r"d) Naj bo \(x = \frac{5}{2}\). Koliko začetnih členov vrste moramo sešteti, da se bo njihova vsota za manj kot \(10^{-6}\) razlikovala od "
    r"vsote neskončne vrste? Odgovor zapiši s stavkom. (10 točk)",
    r"a) \(1 < x < 3\), \(x \ne 2\) &nbsp; b) \(x = \frac{5}{2}\) &nbsp; c) \(x = 1\), \(x = -1\) &nbsp; d) vsaj \(23\) členov",
    [
        ("q = " + U("a<sub>2</sub>", "a<sub>1</sub>") + " = x − 2", ""),
        ("|x − 2| < 1  ⇒  −1 < x − 2 < 1", "Geometrijska vrsta konvergira, ko je |q| < 1."),
        ("!a) 1 < x < 3,  x ≠ 2", ""),
        ("s = " + U("a<sub>1</sub>", "1 − q") + " = " + U("x", "3 − x") + " = 5", ""),
        ("!b) x = 15 − 5x  ⇒  x = " + U("5", "2"), "Vrednost leži v območju konvergence."),
        ("x(x<sup>2</sup> − 2x) = x − 2  ⇒  x<sup>3</sup> − 2x<sup>2</sup> − x + 2 = 0", ""),
        ("(x − 2)(x<sup>2</sup> − 1) = 0", "Hornerjev algoritem z ničlo x = 2 ali razčlenitev v parih."),
        ("!c) x = 1  ali  x = −1", "x = 2 ne pride v poštev (tedaj je a₂ = 0)."),
        ("x = " + U("5", "2") + ":  a<sub>1</sub> = " + U("5", "2") + ",  q = " + U("1", "2") + ",  s = 5", ""),
        ("s − s<sub>n</sub> = " + U("a<sub>1</sub>q<sup>n</sup>", "1 − q") + " = 5 · (" + U("1", "2") + ")<sup>n</sup> < 10<sup>−6</sup>", "Vsota n členov je s_n = s(1 − qⁿ)."),
        ("2<sup>n</sup> > 5 · 10<sup>6</sup>  ⇒  n > " + U("log (5 · 10<sup>6</sup>)", "log 2") + " ≈ 22,25", ""),
        ("!d) Sešteti moramo vsaj 23 členov.", ""),
    ],
)

POLA2 = [v1, v2, v3]
