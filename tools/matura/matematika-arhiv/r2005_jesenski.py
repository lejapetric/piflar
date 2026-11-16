# Jesenski rok 2005 (uradne pole RIC: m052-401-1-1, m052-402-1-1, m052-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2005, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
def premici1(X, Y):
    return krivulja(X, Y, lambda x: 3 * x - 3, 0.35, 2.3, MODRA) + krivulja(X, Y, lambda x: 3 - x, -1, 4.5, RDECA)


def premici1r(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((1, 0), (3, 0), (1.5, 1.5)))
    return f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25"/>' + premici1(X, Y) + tocka(X, Y, 1.5, 1.5, "P")

n1 = naloga(
    1, "pravokotni_koordinatni_sistem_ravnina", 6,
    r"V koordinatnem sistemu sta narisani dve premici. Zapiši njuni enačbi in izračunaj ploščino trikotnika, ki ga premici oklepata z osjo \(x\)."
    + mreza((-1, 5), (-2, 4), premici1, sirina=220),
    r"\(y = 3x - 3\), \(y = -x + 3\), \(S = \frac{3}{2}\)",
    [
        ("modra: skozi (0, −3) in (1, 0):  y = 3x − 3", "Začetna vrednost in smerni koeficient preberemo z mreže."),
        ("rdeča: skozi (0, 3) in (3, 0):  y = −x + 3", ""),
        ("3x − 3 = −x + 3  ⇒  P(" + U("3", "2") + ", " + U("3", "2") + ")", "Presečišče premic je vrh trikotnika."),
        ("@slika", mreza((-1, 5), (-2, 4), premici1r, sirina=220)),
        ("!S = " + U("2 · 3/2", "2") + " = " + U("3", "2"), "Osnovnica od 1 do 3 na osi x, višina je ordinata točke P."),
    ],
)


def trikotnik2():
    k = 12
    B = (0.0, 0.0)
    E = (5.0, 0.0)
    A = (5.0, 5 * math.tan(math.radians(50)))
    C = (5 + A[1] / math.tan(math.radians(20)), 0.0)
    t = A[1] / (A[1] + 0)  # pomožno
    # D leži na AC, DE vzporedna AB: D = E + s (A − B)
    dx, dy = A[0] - B[0], A[1] - B[1]
    # presek premice E + s(dx, dy) in A + u(C − A)
    cx, cy = C[0] - A[0], C[1] - A[1]
    det = dx * (-cy) - dy * (-cx)
    s = ((A[0] - E[0]) * (-cy) - (A[1] - E[1]) * (-cx)) / det
    D = (E[0] + s * dx, E[1] + s * dy)
    P = lambda p: (15 + p[0] * k, 95 - p[1] * k)
    a, b, c, d, e = P(A), P(B), P(C), P(D), P(E)
    return svg(290, 115, f'<polygon points="{a[0]:.1f},{a[1]:.1f} {b[0]:.1f},{b[1]:.1f} {c[0]:.1f},{c[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               f'<line x1="{a[0]:.1f}" y1="{a[1]:.1f}" x2="{e[0]:.1f}" y2="{e[1]:.1f}" stroke="currentColor"/>'
               f'<line x1="{d[0]:.1f}" y1="{d[1]:.1f}" x2="{e[0]:.1f}" y2="{e[1]:.1f}" stroke="{RDECA}" stroke-width="1.5"/>'
               f'<rect x="{e[0]:.1f}" y="{e[1] - 7:.1f}" width="7" height="7" fill="none" stroke="currentColor"/>'
               + napis(a[0], a[1] - 6, "A") + napis(b[0] - 8, b[1] + 4, "B") + napis(c[0] + 8, c[1] + 4, "C")
               + napis(d[0] + 4, d[1] - 6, "D") + napis(e[0], e[1] + 14, "E")
               + napis(e[0] + 13, e[1] - 18, "40°", 9) + napis(d[0] - 2, d[1] + 13, "70°", 9),
               opis="Trikotnik ABC z višino AE in vzporednico DE")

n2 = naloga(
    2, "geometrijski_liki_telesa", 8,
    r"Na sliki je \(DE \parallel AB\), \(\angle DEA = 40^\circ\), \(\angle ADE = 70^\circ\), daljica \(AE\) pa je višina na stranico \(BC\) "
    r"trikotnika \(ABC\). Izračunaj notranje kote \(\alpha\), \(\beta\) in \(\gamma\) trikotnika \(ABC\) ter dolžino stranice \(AB\), če je "
    r"\(|BE| = 5\ \mathrm{cm}\). Rezultat zaokroži na milimetre." + trikotnik2(),
    r"\(\alpha = 110^\circ\), \(\beta = 50^\circ\), \(\gamma = 20^\circ\), \(|AB| \approx 7{,}8\ \mathrm{cm}\)",
    [
        ("∢BAE = ∢DEA = 40°", "Izmenična kota ob vzporednicah AB in DE (prečnica AE)."),
        ("!β = 90° − 40° = 50°", "Trikotnik ABE je pravokoten (AE je višina)."),
        ("!α = 180° − 70° = 110°", "Kota ∢ADE in ∢DAB sta ob vzporednicah na isti strani prečnice AD, zato sta suplementarna."),
        ("!γ = 180° − 110° − 50° = 20°", "Vsota notranjih kotov trikotnika."),
        ("!|AB| = " + U("|BE|", "cos β") + " = " + U("5", "cos 50°") + " ≈ 7,8 cm", "Pravokotni trikotnik ABE."),
    ],
)


def f3(x):
    return x * x + 2 * x - 8

n3 = naloga(
    3, "funkcije", 8,
    r"Nariši graf funkcije \(f(x) = x^2 + 2x - 8\). Zapiši interval, na katerem je funkcija padajoča.",
    r"padajoča na \((-\infty, -1]\)",
    [
        ("(x + 4)(x − 2) = 0:  ničli −4 in 2", "Razcep (Vietovo pravilo)."),
        ("teme T(−1, −9),  f(0) = −8", "Abscisa temena je na sredini med ničlama."),
        ("@slika", graf([(f3, MODRA)], (-5.5, 3.5), (-10, 12), tocke=[(-4, 0, ""), (2, 0, ""), (-1, -9, "T"), (0, -8, "")], sirina=240, visina=280)),
        ("!f je padajoča na (−∞, −1]", "Parabola je odprta navzgor: levo od temena pada."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n4 = naloga(
    4, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Naj bosta \(x_1\) in \(x_2\) rešitvi enačbe \(2x^2 - 6x + \sqrt{3} = 0\). Brez reševanja enačbe izračunaj \(x_1^2 + x_2^2\).",
    r"\(9 - \sqrt{3}\)",
    [
        ("x<sub>1</sub> + x<sub>2</sub> = " + U("6", "2") + " = 3,  x<sub>1</sub> x<sub>2</sub> = " + U(K("3"), "2"), "Vietovi formuli: x₁ + x₂ = −b/a, x₁x₂ = c/a."),
        ("x<sub>1</sub><sup>2</sup> + x<sub>2</sub><sup>2</sup> = (x<sub>1</sub> + x<sub>2</sub>)<sup>2</sup> − 2x<sub>1</sub>x<sub>2</sub>", "Kvadrat vsote."),
        ("!= 9 − " + K("3"), ""),
    ],
)


def kroga5(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((1, -3), (7, -3), (7, 3), (1, 3)))
    return (f'<polygon points="{pot}" fill="none" stroke="currentColor" stroke-width="1.5"/>'
            + parametricna(X, Y, lambda t: 4 + 3 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * math.pi, MODRA)
            + parametricna(X, Y, lambda t: 4 + math.sqrt(18) * math.cos(t), lambda t: math.sqrt(18) * math.sin(t), 0, 2 * math.pi, RDECA)
            + tocka(X, Y, 4, 0, "S"))

n5 = naloga(
    5, "stoznice", 6,
    r"Kvadratu z oglišči \(A(1, -3)\), \(B(7, -3)\), \(C(7, 3)\) in \(D(1, 3)\) včrtamo in očrtamo krožnico. Za vsako zapiši središče, polmer in "
    r"enačbo. Nariši skico.",
    r"\(S(4, 0)\); \((x - 4)^2 + y^2 = 9\) in \((x - 4)^2 + y^2 = 18\)",
    [
        ("!S(4, 0)", "Središče kvadrata je presečišče diagonal."),
        ("!včrtana: r<sub>1</sub> = 3,  (x − 4)<sup>2</sup> + y<sup>2</sup> = 9", "Polmer včrtane krožnice je polovica stranice."),
        ("!očrtana: r<sub>2</sub> = 3" + K("2") + ",  (x − 4)<sup>2</sup> + y<sup>2</sup> = 18", "Polmer očrtane krožnice je polovica diagonale."),
        ("@slika", mreza((-1, 9), (-5, 5), kroga5, sirina=240)),
    ],
)

n6 = naloga(
    6, "zaporedja_vrste", 7,
    r"Zapiši prve tri člene zaporedja s splošnim členom \(a_n = 50 - 3n\). Dokaži, da je zaporedje aritmetično, in izračunaj vsoto prvih "
    r"\(1000\) členov.",
    r"\(47, 44, 41\); \(d = -3\); \(s_{1000} = -1\,451\,500\)",
    [
        ("!a<sub>1</sub> = 47,  a<sub>2</sub> = 44,  a<sub>3</sub> = 41", ""),
        ("!a<sub>n+1</sub> − a<sub>n</sub> = (50 − 3n − 3) − (50 − 3n) = −3", "Razlika sosednjih členov je stalna, zato je zaporedje aritmetično."),
        ("a<sub>1000</sub> = 50 − 3000 = −2950", ""),
        ("!s<sub>1000</sub> = " + U("1000", "2") + "(47 − 2950) = −1 451 500", "Vsota prvih n členov."),
    ],
)

n7 = naloga(
    7, "stevilske_mnozice", 7,
    r"Kompleksno število \(10(2 + i)^2(1 - 3i)^{-1}\) zapiši v obliki \(a + bi\), \(a, b \in \mathbb{R}\).",
    r"\(-9 + 13i\)",
    [
        ("(2 + i)<sup>2</sup> = 4 + 4i + i<sup>2</sup> = 3 + 4i", "Kvadrat dvočlenika."),
        ("(1 − 3i)<sup>−1</sup> = " + U("1 + 3i", "(1 − 3i)(1 + 3i)") + " = " + U("1 + 3i", "10"), "Obratna vrednost: razširimo s konjugirano vrednostjo."),
        ("10 · (3 + 4i) · " + U("1 + 3i", "10") + " = 3 + 9i + 4i + 12i<sup>2</sup>", ""),
        ("!−9 + 13i", ""),
    ],
)

n8 = naloga(
    8, "diferencialni_racun", 6,
    r"Zapiši enačbo tangente na graf funkcije \(f(x) = \dfrac{4}{x} + 1\) v točki z absciso \(x = 2\).",
    r"\(y = -x + 5\)",
    [
        ("f(2) = 3", ""),
        ("f '(x) = −" + U("4", "x<sup>2</sup>") + ",  k = f '(2) = −1", "Odvod potence x⁻¹."),
        ("!y − 3 = −(x − 2),  y = −x + 5", ""),
    ],
)


def f9(x):
    return x + 2 * math.sin(x)


def slika9(X, Y):
    xs = [math.pi * i / 80 for i in range(81)]
    pot = f"{X(0):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(f9(x)):.1f}" for x in xs) + f" {X(math.pi):.1f},{Y(0):.1f}"
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>' + krivulja(X, Y, f9, -0.3, 4, MODRA)
            + napis(X(math.pi), Y(0) + 14, "π", 11) + napis(X(math.pi / 2), Y(0) + 14, "π/2", 10))

n9 = naloga(
    9, "integralski_racun", 6,
    r"Izračunaj ploščino lika med grafom funkcije \(f(x) = x + 2\sin x\), abscisno osjo in premicama \(x = 0\) in \(x = \pi\)."
    + mreza((-0.5, 4), (-1, 4), slika9, sirina=240, oznake=False),
    r"\(S = \frac{\pi^2}{2} + 4 \approx 8{,}93\)",
    [
        ("S = " + INT("π", "0") + "(x + 2 sin x) dx", "Na [0, π] je f(x) ≥ 0."),
        ("= (" + U("x<sup>2</sup>", "2") + " − 2 cos x)" + MEJA("π", "0") + " = (" + U("π<sup>2</sup>", "2") + " + 2) − (0 − 2)", "Osnovna integrala."),
        ("!S = " + U("π<sup>2</sup>", "2") + " + 4 ≈ 8,93", ""),
    ],
    snov=INTS,
)

n10 = naloga(
    10, "funkcije", 6,
    r"Izračunaj presečišče grafov funkcij \(f(x) = 3^{x + 1}\) in \(g(x) = 9^{x - 1}\).",
    r"\(P(3, 81)\)",
    [
        ("3<sup>x + 1</sup> = 3<sup>2(x − 1)</sup>", "9 = 3²."),
        ("x + 1 = 2x − 2  ⇒  x = 3", "Eksponentna funkcija je injektivna."),
        ("!P(3, 81)", "f(3) = 3⁴ = 81."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n11 = naloga(
    11, "funkcije", 8,
    r"Dana je funkcija \(f(x) = \tan\left(2x - \frac{\pi}{3}\right)\). Zapiši definicijsko območje, izračunaj ničle in presečišče grafa z ordinatno osjo.",
    r"\(x \ne \frac{5\pi}{12} + \frac{k\pi}{2}\); ničle \(x = \frac{\pi}{6} + \frac{k\pi}{2}\); \((0, -\sqrt{3})\)",
    [
        ("2x − " + U("π", "3") + " ≠ " + U("π", "2") + " + kπ", "Tangens ni definiran, kjer je kosinus 0."),
        ("!D<sub>f</sub>: x ≠ " + U("5π", "12") + " + " + U("kπ", "2") + ", k ∈ ℤ", ""),
        ("2x − " + U("π", "3") + " = kπ", "Ničle tangensa so kπ."),
        ("!ničle x = " + U("π", "6") + " + " + U("kπ", "2") + ", k ∈ ℤ", ""),
        ("!f(0) = tan(−" + U("π", "3") + ") = −" + K("3") + ":  (0, −" + K("3") + ")", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n12 = naloga(
    12, "vektorji_ravnina_prostor", 6,
    r"Kot med vektorjema \(\vec{a}\) in \(\vec{b}\) meri \(60^\circ\). Skalarni produkt \(\vec{a} \cdot \vec{b}\) je \(12\), skalarni produkt "
    r"vektorjev \(\vec{a}\) in \(\vec{a} + \vec{b}\) pa \(48\). Izračunaj dolžini vektorjev.",
    r"\(|\vec{a}| = 6\), \(|\vec{b}| = 4\)",
    [
        (V("a") + " · (" + V("a") + " + " + V("b") + ") = |" + V("a") + "|<sup>2</sup> + " + V("a") + " · " + V("b"), "Distributivnost skalarnega produkta."),
        ("|" + V("a") + "|<sup>2</sup> = 48 − 12 = 36", ""),
        ("!|" + V("a") + "| = 6", ""),
        ("12 = 6 · |" + V("b") + "| · cos 60° = 3|" + V("b") + "|", "Definicija skalarnega produkta."),
        ("!|" + V("b") + "| = 4", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def f_v1(x):
    return (x * x - 2 * x + 5) / (x - 1)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun"], 15,
    r"Dana je funkcija \(f(x) = \dfrac{x^2 - 2x + 5}{x - 1}\).<br>"
    r"a) Izračunaj lokalna ekstrema funkcije. (5 točk)<br>"
    r"b) Izračunaj ničle, pole in asimptote ter nariši graf. (6 točk)<br>"
    r"c) Dokaži, da je funkcija \(g(x) = f(x + 1)\) liha. (4 točke)",
    r"a) maksimum \((-1, -4)\), minimum \((3, 4)\) &nbsp; b) ničel ni, pol \(x = 1\), asimptoti \(x = 1\) in \(y = x - 1\) &nbsp; c) \(g(x) = x + \frac{4}{x}\)",
    [
        ("f(x) = x − 1 + " + U("4", "x − 1"), "Deljenje polinomov."),
        ("f '(x) = 1 − " + U("4", "(x − 1)<sup>2</sup>") + " = 0  ⇒  (x − 1)<sup>2</sup> = 4", ""),
        ("x = 3 ali x = −1", ""),
        ("!a) maksimum (−1, −4),  minimum (3, 4)", "f' menja predznak iz + v − pri −1 in iz − v + pri 3."),
        ("x<sup>2</sup> − 2x + 5: D = 4 − 20 < 0", "Števec nima realnih ničel."),
        ("!b) ničel ni,  pol x = 1,  poševna asimptota y = x − 1", ""),
        ("@slika", graf([(f_v1, MODRA), (lambda x: x - 1, "#8a8a8a")], (-6, 8), (-10, 10), tocke=[(-1, -4, ""), (3, 4, "")], sirina=260, visina=300)),
        ("g(x) = (x + 1) − 1 + " + U("4", "x + 1 − 1") + " = x + " + U("4", "x"), "Vstavimo x + 1 namesto x."),
        ("!c) g(−x) = −x − " + U("4", "x") + " = −g(x)", "Funkcija je liha, če velja g(−x) = −g(x)."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)


def kroznica_v2(X, Y):
    r = math.sqrt(13)
    th0, th1 = math.atan2(2, -3), math.atan2(2, 3)
    lok = [(3 + r * math.cos(th0 + (th1 - th0) * i / 40), -2 + r * math.sin(th0 + (th1 - th0) * i / 40)) for i in range(41)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in lok)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.3"/>'
            + parametricna(X, Y, lambda t: 3 + r * math.cos(t), lambda t: -2 + r * math.sin(t), 0, 2 * math.pi, MODRA)
            + krivulja(X, Y, lambda x: (18 - 3 * x) / 2, 3.5, 8, RDECA)
            + tocka(X, Y, 0, 0, "A", dx=-14, dy=-6) + tocka(X, Y, 6, 0, "B", dx=4, dy=14) + tocka(X, Y, 3, -2, "S"))

v2 = naloga(
    2, "stoznice", 13,
    r"Krožnica \(\mathcal{K}\) z enačbo \(x^2 + y^2 - 6x + 4y = 0\) seka os \(x\) v dveh točkah; levo označimo z \(A\), desno z \(B\).<br>"
    r"a) Izračunaj koordinate točk \(A\) in \(B\). (2 točki)<br>"
    r"b) Izračunaj ploščino manjšega krožnega odseka, ki ga odreže tetiva \(AB\). Rezultat zaokroži na dve decimalki. (5 točk)<br>"
    r"c) Zapiši enačbo tangente na krožnico v točki \(B\). (3 točke)<br>"
    r"d) Za katera realna števila \(m\) enačba \(x^2 + y^2 - 6x + 4y + m^2 - 5m + 7 = 0\) predstavlja krožnico? (3 točke)",
    r"a) \(A(0, 0)\), \(B(6, 0)\) &nbsp; b) \(\approx 6{,}78\) &nbsp; c) \(3x + 2y - 18 = 0\) &nbsp; d) \(-1 < m < 6\)",
    [
        ("y = 0:  x<sup>2</sup> − 6x = 0", ""),
        ("!a) A(0, 0),  B(6, 0)", ""),
        ("(x − 3)<sup>2</sup> + (y + 2)<sup>2</sup> = 13:  S(3, −2),  r = " + K("13"), "Dopolnimo do popolnih kvadratov."),
        ("sin " + U("φ", "2") + " = " + U("3", K("13")) + "  ⇒  φ ≈ 112,62° ≈ 1,9656 rad", "Središčni kot nad tetivo AB (polovica tetive je 3)."),
        ("p = " + U("r<sup>2</sup>", "2") + "(φ − sin φ) = " + U("13", "2") + "(1,9656 − 0,9231)", "Ploščina krožnega odseka; kot v radianih."),
        ("!b) p ≈ 6,78", ""),
        (V("SB") + " = (3, 2)", "Tangenta je pravokotna na polmer v dotikališču."),
        ("!c) 3(x − 6) + 2y = 0,  3x + 2y − 18 = 0", ""),
        ("@slika", mreza((-2, 8), (-6, 4), kroznica_v2, sirina=240)),
        ("(x − 3)<sup>2</sup> + (y + 2)<sup>2</sup> = 13 − (m<sup>2</sup> − 5m + 7) = −m<sup>2</sup> + 5m + 6", ""),
        ("−m<sup>2</sup> + 5m + 6 > 0  ⇒  (m − 6)(m + 1) < 0", "Kvadrat polmera mora biti pozitiven."),
        ("!d) −1 < m < 6", ""),
    ],
)

v3 = naloga(
    3, ["kombinatorika", "verjetnostni_racun"], 12,
    r"V posodi je \(12\) kroglic: \(6\) rdečih, \(4\) modre in \(2\) beli.<br>"
    r"a) Hkrati izvlečemo \(4\) kroglice. Izračunaj verjetnosti dogodkov \(A\) – vse so rdeče, \(B\) – dve sta rdeči in dve modri, "
    r"\(C\) – vsaj ena je bela. (5 točk)<br>"
    r"b) Hkrati izvlečemo \(2\) kroglici. Kolikšna je verjetnost, da sta obe modri, če vemo, da je vsaj ena modra? (5 točk)<br>"
    r"c) Vse kroglice naključno postavimo v vrsto. Kolikšna je verjetnost, da stojijo vse štiri modre skupaj? (2 točki)",
    r"a) \(P(A) = \frac{1}{33}\), \(P(B) = \frac{2}{11}\), \(P(C) = \frac{19}{33}\) &nbsp; b) \(\frac{3}{19}\) &nbsp; c) \(\frac{1}{55}\)",
    [
        ("n = " + BINOM("12", "4") + " = 495", ""),
        ("!P(A) = " + U(BINOM("6", "4"), "495") + " = " + U("15", "495") + " = " + U("1", "33"), ""),
        ("!P(B) = " + U(BINOM("6", "2") + " · " + BINOM("4", "2"), "495") + " = " + U("90", "495") + " = " + U("2", "11"), "Pravilo produkta."),
        ("!P(C) = 1 − " + U(BINOM("10", "4"), "495") + " = 1 − " + U("210", "495") + " = " + U("19", "33"), "Nasprotni dogodek: nobena ni bela."),
        ("vsaj ena modra: " + BINOM("12", "2") + " − " + BINOM("8", "2") + " = 66 − 28 = 38", "Pogojna verjetnost: računamo le med izidi, kjer je vsaj ena modra."),
        ("obe modri: " + BINOM("4", "2") + " = 6", ""),
        ("!b) P = " + U("6", "38") + " = " + U("3", "19"), ""),
        ("modre zlepimo v blok: 9 enot, znotraj bloka 4! razporeditev", ""),
        ("!c) P = " + U("9! · 4!", "12!") + " = " + U("24", "12 · 11 · 10") + " = " + U("1", "55"), ""),
    ],
)

POLA2 = [v1, v2, v3]
