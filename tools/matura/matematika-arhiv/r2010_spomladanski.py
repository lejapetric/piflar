# Spomladanski rok 2010 (uradne pole RIC: m101-401-1-1, m101-402-1-1, m101-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2010, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
ZELENA = "#2a9d4b"

OST = ('<defs><marker id="ost10" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">'
       '<path d="M0,0 L10,5 L0,10 Z" fill="currentColor"/></marker></defs>')


def puscica(X, Y, x0, y0, x, y, barva, ime, dx=4, dy=-4):
    return (f'<line x1="{X(x0):.1f}" y1="{Y(y0):.1f}" x2="{X(x):.1f}" y2="{Y(y):.1f}" stroke="{barva}" stroke-width="2" marker-end="url(#ost10)"/>'
            f'<text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="12" fill="{barva}">{ime}</text>')


# ------------------------------------------------------------------ izpitna pola 1
def premica1(X, Y):
    return (krivulja(X, Y, lambda x: -2 / 3 * x + 4, -1, 7.5, MODRA) + tocka(X, Y, 0, 4, "A") + tocka(X, Y, 6, 0, "B", dy=-8)
            + tocka(X, Y, 0, 0, "O", dx=-14, dy=14))

n1 = naloga(
    1, "pravokotni_koordinatni_sistem_ravnina", 6,
    r"V koordinatnem sistemu označi točki \(A(0, 4)\) in \(B(6, 0)\) ter skozi njiju nariši premico. Zapiši enačbo premice in izračunaj kot "
    r"\(\angle ABO\) (\(O\) je izhodišče). Rezultat zaokroži na kotne minute.",
    r"\(y = -\frac{2}{3}x + 4\), \(\angle ABO \approx 33^\circ 41'\)",
    [
        ("@slika", mreza((-1, 8), (-1, 6), premica1, sirina=280)),
        ("!" + U("x", "6") + " + " + U("y", "4") + " = 1,  tj. y = −" + U("2", "3") + "x + 4", "Odsekovna oblika enačbe premice."),
        ("tan ∢ABO = " + U("|OA|", "|OB|") + " = " + U("4", "6") + " = " + U("2", "3"), "Pravokotni trikotnik ABO."),
        ("!∢ABO ≈ 33,69° ≈ 33°41'", "Decimalni del stopinje pomnožimo s 60."),
    ],
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 7,
    r"Razstavi izraze v množici realnih števil ali zapiši, da to ni mogoče: \(3x^3 - x^2\), \(x^2 - 49\), \(x^2 + 16\), \(x^2 - 4x + 13\), "
    r"\(x^2 - 7x + 12\), \(x^3 - 2x^2 - 4x + 8\).",
    r"\(x^2(3x - 1)\), \((x - 7)(x + 7)\), ni mogoče, ni mogoče, \((x - 3)(x - 4)\), \((x - 2)^2(x + 2)\)",
    [
        ("!3x<sup>3</sup> − x<sup>2</sup> = x<sup>2</sup>(3x − 1)", "Izpostavljanje skupnega faktorja."),
        ("!x<sup>2</sup> − 49 = (x − 7)(x + 7)", "Razlika kvadratov."),
        ("!x<sup>2</sup> + 16: ni mogoče", "Vsota kvadratov nima realnih ničel."),
        ("!x<sup>2</sup> − 4x + 13: D = 16 − 52 < 0, ni mogoče", "Negativna diskriminanta."),
        ("!x<sup>2</sup> − 7x + 12 = (x − 3)(x − 4)", "Vietovo pravilo: 3 + 4 = 7, 3 · 4 = 12."),
        ("x<sup>3</sup> − 2x<sup>2</sup> − 4x + 8 = x<sup>2</sup>(x − 2) − 4(x − 2) = (x − 2)(x<sup>2</sup> − 4)", "Združevanje členov."),
        ("!= (x − 2)<sup>2</sup>(x + 2)", ""),
    ],
)

n3 = naloga(
    3, "funkcije", 6,
    r"Dani sta kvadratna funkcija \(f(x) = -3x^2 + 5x - 2\) in linearna funkcija \(g(x) = 2x - 2\). Izračunaj presečišči njunih grafov.",
    r"\((0, -2)\) in \((1, 0)\)",
    [
        ("−3x<sup>2</sup> + 5x − 2 = 2x − 2", "V presečišču sta vrednosti funkcij enaki."),
        ("−3x<sup>2</sup> + 3x = 0  ⇒  −3x(x − 1) = 0", ""),
        ("x<sub>1</sub> = 0,  x<sub>2</sub> = 1", ""),
        ("!P<sub>1</sub>(0, −2),  P<sub>2</sub>(1, 0)", "Ordinati izračunamo z g(x)."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)


def paralelogram4():
    s = 22
    A = (20, 120)
    B = (A[0] + 8 * s, A[1])
    D = (A[0] + 5 * s * 0.5, A[1] - 5 * s * math.sqrt(3) / 2)
    C = (B[0] + D[0] - A[0], D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]:.1f}" y2="{C[1]:.1f}" stroke="{RDECA}" stroke-width="1.5" stroke-dasharray="5 3"/>']
    for P, s_, dx, dy in ((A, "A", -12, 6), (B, "B", 4, 6), (C, "C", 4, -2), (D, "D", -12, -2)):
        t.append(f'<text x="{P[0] + dx:.1f}" y="{P[1] + dy:.1f}" font-size="13" fill="currentColor">{s_}</text>')
    t.append(f'<text x="{A[0] + 26}" y="{A[1] - 6}" font-size="11" fill="currentColor">60°</text>')
    t.append(f'<text x="{(A[0] + B[0]) / 2:.1f}" y="{A[1] + 15}" font-size="11" text-anchor="middle" fill="currentColor">8 cm</text>')
    t.append(f'<text x="{(A[0] + D[0]) / 2 - 30:.1f}" y="{(A[1] + D[1]) / 2:.1f}" font-size="11" fill="currentColor">5 cm</text>')
    t.append(f'<text x="{(A[0] + C[0]) / 2 + 6:.1f}" y="{(A[1] + C[1]) / 2 + 14:.1f}" font-size="12" fill="{RDECA}">e</text>')
    return svg(300, 140, "".join(t), opis="Paralelogram ABCD")


n4 = naloga(
    4, "geometrijski_liki_telesa", 6,
    r"V paralelogramu \(ABCD\) merita stranici \(8\ \mathrm{cm}\) in \(5\ \mathrm{cm}\), eden od notranjih kotov pa \(60^\circ\). Nariši skico. "
    r"Izračunaj ploščino in dolžino daljše diagonale.",
    r"\(S = 20\sqrt{3}\ \mathrm{cm^2} \approx 34{,}64\ \mathrm{cm^2}\), \(e = \sqrt{129}\ \mathrm{cm} \approx 11{,}36\ \mathrm{cm}\)",
    [
        ("@slika", paralelogram4()),
        ("!S = a · b · sin α = 8 · 5 · " + U(K("3"), "2") + " = 20" + K("3") + " cm<sup>2</sup> ≈ 34,64 cm<sup>2</sup>", "Ploščina paralelograma."),
        ("daljša diagonala leži nasproti topega kota β = 120°", "Sosednja kota paralelograma sta suplementarna."),
        ("e<sup>2</sup> = 8<sup>2</sup> + 5<sup>2</sup> − 2 · 8 · 5 · cos 120° = 89 + 40 = 129", "Kosinusni izrek."),
        ("!e = " + K("129") + " cm ≈ 11,36 cm", ""),
    ],
)


def cos5(X, Y):
    t = [krivulja(X, Y, lambda x: 2 * math.cos(x) + 1, -2 * math.pi, 2 * math.pi, MODRA)]
    for k, s in ((-2, "−2π"), (-1, "−π"), (1, "π"), (2, "2π")):
        t.append(f'<line x1="{X(k * math.pi):.1f}" y1="{Y(0) - 3:.1f}" x2="{X(k * math.pi):.1f}" y2="{Y(0) + 3:.1f}" stroke="currentColor"/>'
                 f'<text x="{X(k * math.pi):.1f}" y="{Y(0) + 14:.1f}" font-size="10" text-anchor="middle" fill="currentColor">{s}</text>')
    for j in (-1, 1, 2, 3):
        t.append(f'<text x="{X(0) - 4:.1f}" y="{Y(j) + 3.5:.1f}" font-size="10" text-anchor="end" fill="currentColor">{str(j).replace("-", "−")}</text>')
    for x0 in (-4 * math.pi / 3, -2 * math.pi / 3, 2 * math.pi / 3, 4 * math.pi / 3):
        t.append(tocka(X, Y, x0, 0))
    return "".join(t)


n5 = naloga(
    5, "funkcije", 8,
    r"Dana je funkcija \(f(x) = 2\cos x + 1\). Izračunaj ničle funkcije in nariši njen graf na intervalu \([-2\pi, 2\pi]\).",
    r"\(x = \pm\frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("2 cos x + 1 = 0  ⇒  cos x = −" + U("1", "2"), ""),
        ("!x = ±" + U("2π", "3") + " + 2kπ, k ∈ ℤ", "Kosinus je negativen v 2. in 3. kvadrantu."),
        ("graf y = cos x raztegnemo v smeri osi y s faktorjem 2 in premaknemo za 1 navzgor", "Zaloga vrednosti je [−1, 3]."),
        ("@slika", mreza((-7, 7), (-2, 4), cos5, sirina=340, oznake=False)),
    ],
    snov=FUN + "kotne_razlaga.html",
)


def hiperbola6(X, Y):
    t = []
    for zn in (1, -1):
        t.append(parametricna(X, Y, lambda u, z=zn: z * 3 * math.cosh(u), lambda u: 5 * math.sinh(u), -1.12, 1.12, MODRA))
    for k in (5 / 3, -5 / 3):
        t.append(f'<line x1="{X(-6):.1f}" y1="{Y(-6 * k):.1f}" x2="{X(6):.1f}" y2="{Y(6 * k):.1f}" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>')
    t.append(tocka(X, Y, -math.sqrt(34), 0, "F₁", dx=-6, dy=-8) + tocka(X, Y, 3, 0, "B", dx=5, dy=14))
    return "".join(t)


n6 = naloga(
    6, "stoznice", 8,
    r"Hiperbola s središčem v izhodišču ima gorišče v točki \(F_1(-\sqrt{34}, 0)\) in teme v točki \(B(3, 0)\). Zapiši enačbo hiperbole "
    r"in enačbi njenih asimptot."
    + mreza((-8, 8), (-10, 10), hiperbola6, sirina=240, korak=2, oznake=False),
    r"\(\frac{x^2}{9} - \frac{y^2}{25} = 1\), \(y = \pm\frac{5}{3}x\)",
    [
        ("a = 3,  e = " + K("34"), "Teme in gorišče na osi x."),
        ("b<sup>2</sup> = e<sup>2</sup> − a<sup>2</sup> = 34 − 9 = 25  ⇒  b = 5", "Pri hiperboli velja e² = a² + b²."),
        ("!" + U("x<sup>2</sup>", "9") + " − " + U("y<sup>2</sup>", "25") + " = 1", ""),
        ("!asimptoti y = ±" + U("b", "a") + "x = ±" + U("5", "3") + "x", ""),
    ],
)

n7 = naloga(
    7, "funkcije", 5,
    r"Reši enačbo \(\log(x + 3) - \log x = 1\).",
    r"\(x = \frac{1}{3}\)",
    [
        ("log " + U("x + 3", "x") + " = 1", "Razlika logaritmov je logaritem kvocienta (x > 0)."),
        (U("x + 3", "x") + " = 10", "Desetiški logaritem: log y = 1 ⇔ y = 10."),
        ("x + 3 = 10x  ⇒  9x = 3", ""),
        ("!x = " + U("1", "3"), "Pogoj x > 0 je izpolnjen."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)


def vektorja8(X, Y):
    return OST + puscica(X, Y, 0, 0, 4, 2, MODRA, "a") + puscica(X, Y, 0, 0, -1, 3, RDECA, "b")


def vektorja8r(X, Y):
    return (vektorja8(X, Y) + puscica(X, Y, 0, 0, 2, 1, "#8a8a8a", "½a", dx=2, dy=14)
            + puscica(X, Y, 2, 1, 3, -2, "#8a8a8a", "−b", dx=6, dy=-14) + puscica(X, Y, 0, 0, 3, -2, ZELENA, "c", dx=-14, dy=10))


n8 = naloga(
    8, "vektorji_ravnina_prostor", 8,
    r"V koordinatnem sistemu sta narisana vektorja \(\vec{a}\) in \(\vec{b}\). Nariši vektor \(\vec{c} = \frac{1}{2}\vec{a} - \vec{b}\). "
    r"Kolikšni sta točni dolžini vektorjev \(\vec{a}\) in \(\vec{b}\)? Koliko meri kot \(\varphi\) med njima (na stotinko stopinje)?"
    + mreza((-2, 6), (-3, 4), vektorja8, sirina=280),
    r"\(\vec{c} = (3, -2)\), \(|\vec{a}| = 2\sqrt{5}\), \(|\vec{b}| = \sqrt{10}\), \(\varphi \approx 81{,}87^\circ\)",
    [
        (V("a") + " = (4, 2),  " + V("b") + " = (−1, 3)", "Komponente preberemo z mreže."),
        ("!" + V("c") + " = (2, 1) − (−1, 3) = (3, −2)", "Množenje s skalarjem in odštevanje vektorjev."),
        ("@slika", mreza((-2, 6), (-3, 4), vektorja8r, sirina=280)),
        ("!|" + V("a") + "| = " + K("16 + 4") + " = 2" + K("5") + ",  |" + V("b") + "| = " + K("1 + 9") + " = " + K("10"), "Dolžina vektorja."),
        ("cos φ = " + U("−4 + 6", K("20") + " · " + K("10")) + " = " + U("2", K("200")) + " ≈ 0,1414", "Kot med vektorjema prek skalarnega produkta."),
        ("!φ ≈ 81,87°", ""),
    ],
)

n9 = naloga(
    9, "potence_koreni", 6,
    r"Izračunaj vrednost izraza \(5 \cdot (-1)^{n + 1} + (2 - \sqrt{9})^n - (-1)^{2n + 1} + 4 \cdot 7^0\) za vsako sodo naravno število \(n\).",
    r"\(1\)",
    [
        ("n sod  ⇒  n + 1 lih:  (−1)<sup>n + 1</sup> = −1", "Liha potenca števila −1 je −1, soda pa 1."),
        ("2 − " + K("9") + " = −1,  (−1)<sup>n</sup> = 1", ""),
        ("2n + 1 je vedno lih:  (−1)<sup>2n + 1</sup> = −1", ""),
        ("7<sup>0</sup> = 1", "Vsako neničelno število na potenco 0 je 1."),
        ("!5 · (−1) + 1 − (−1) + 4 · 1 = 1", ""),
    ],
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 6,
    r"Na zabavi je \(18\) oseb: \(5\) zakonskih parov, \(4\) samski moški in \(4\) samske ženske. Za družabno igro naključno izberemo "
    r"\(2\) osebi. Izračunaj verjetnosti dogodkov:<br>\(A\) – izbrani osebi sta zakonski par,<br>"
    r"\(B\) – izbrani osebi sta samski in različnih spolov.",
    r"\(P(A) = \frac{5}{153}\), \(P(B) = \frac{16}{153}\)",
    [
        ("n = " + BINOM("18", "2") + " = 153", "Vseh izbir dveh oseb."),
        ("!P(A) = " + U("5", "153") + " ≈ 0,0327", "Ugodnih izidov je toliko, kolikor je parov."),
        ("m<sub>B</sub> = 4 · 4 = 16", "Pravilo produkta: samski moški in samska ženska."),
        ("!P(B) = " + U("16", "153") + " ≈ 0,1046", ""),
    ],
)

n11 = naloga(
    11, "integralski_racun", 7,
    r"Izračunaj nedoločeni integral \(\displaystyle\int \frac{5x^3 + x^2 - 2}{x^3}\,dx\).",
    r"\(5x + \ln|x| + \frac{1}{x^2} + C\)",
    [
        ("∫ (5 + x<sup>−1</sup> − 2x<sup>−3</sup>) dx", "Vsak člen števca delimo z x³."),
        ("∫ 5 dx = 5x,  ∫ x<sup>−1</sup> dx = ln|x|,  ∫ −2x<sup>−3</sup> dx = −2 · " + U("x<sup>−2</sup>", "−2") + " = x<sup>−2</sup>", "Integral potence; izjema je x⁻¹."),
        ("!5x + ln|x| + " + U("1", "x<sup>2</sup>") + " + C", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n12 = naloga(
    12, "diferencialni_racun", 7,
    r"Tangenta na graf funkcije \(f(x) = a\ln x + x^3 + 1\) v točki z absciso \(x_0 = 1\) je pravokotna na premico \(x + 4y - 3 = 0\). "
    r"Izračunaj realno število \(a\).",
    r"\(a = 1\)",
    [
        ("f '(x) = " + U("a", "x") + " + 3x<sup>2</sup>,  f '(1) = a + 3", "Odvod logaritemske in potenčne funkcije."),
        ("premica: y = −" + U("1", "4") + "x + " + U("3", "4") + ",  k<sub>p</sub> = −" + U("1", "4"), ""),
        ("k<sub>t</sub> = −" + U("1", "k<sub>p</sub>") + " = 4", "Pravokotni premici: k₁ · k₂ = −1."),
        ("a + 3 = 4", "Smerni koeficient tangente je vrednost odvoda."),
        ("!a = 1", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def f_v1(x):
    return (x - 3) ** 2 / x


def slika_v1(X, Y):
    t = [krivulja(X, Y, f_v1, 0.62, 12, MODRA), krivulja(X, Y, f_v1, -12, -0.7, MODRA),
         krivulja(X, Y, lambda x: x - 6, -6, 12, "#8a8a8a"), krivulja(X, Y, lambda x: 4, -12, 12, RDECA)]
    xs = [1 + 8 * i / 100 for i in range(101)]
    pot = " ".join(f"{X(x):.1f},{Y(4):.1f}" for x in (1, 9)) + " " + " ".join(f"{X(x):.1f},{Y(f_v1(x)):.1f}" for x in reversed(xs))
    t.insert(0, f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>')
    t.append(tocka(X, Y, 3, 0, "E₁", dx=4, dy=14) + tocka(X, Y, -3, -12, "E₂", dx=-22, dy=-6))
    return "".join(t)


v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Dana je funkcija \(f(x) = \dfrac{(x - 3)^2}{x}\).<br>"
    r"a) Določi ničle, pole, asimptote in stacionarne točke funkcije. (4 točke)<br>"
    r"b) Nariši graf funkcije \(f\). (3 točke)<br>"
    r"c) Reši neenačbo \(f(x) \le 4\). (2 točki)<br>"
    r"d) Izračunaj ploščino lika, ki ga omejujeta premica \(y = 4\) in graf funkcije \(f\). (5 točk)",
    r"a) ničla \(3\) (dvojna), pol \(0\), asimptota \(y = x - 6\), \(E_1(3, 0)\), \(E_2(-3, -12)\) &nbsp; "
    r"c) \((-\infty, 0) \cup [1, 9]\) &nbsp; d) \(40 - 18\ln 3 \approx 20{,}225\)",
    [
        ("f(x) = " + U("x<sup>2</sup> − 6x + 9", "x") + " = x − 6 + " + U("9", "x"), "Deljenje polinomov."),
        ("!ničla x = 3 (dvojna),  pol x = 0,  poševna asimptota y = x − 6", ""),
        ("f '(x) = 1 − " + U("9", "x<sup>2</sup>") + " = 0  ⇒  x = ±3", "Stacionarne točke: odvod je 0."),
        ("!E<sub>1</sub>(3, 0) minimum,  E<sub>2</sub>(−3, −12) maksimum", ""),
        ("@slika", mreza((-12, 12), (-20, 12), slika_v1, sirina=300, korak=2, oznake=False)),
        ("x < 0: f(x) < 0 ≤ 4,  vsi x < 0 so rešitve", "Števec je nenegativen, imenovalec negativen."),
        ("x > 0: (x − 3)<sup>2</sup> ≤ 4x  ⇒  x<sup>2</sup> − 10x + 9 ≤ 0  ⇒  1 ≤ x ≤ 9", "Pomnožimo s pozitivnim x."),
        ("!c) x ∈ (−∞, 0) ∪ [1, 9]", ""),
        ("S = " + INT("9", "1") + "(4 − f(x)) dx = " + INT("9", "1") + "(10 − x − " + U("9", "x") + ") dx", "Ploščina med krivuljama, meji iz c)."),
        ("= (10x − " + U("x<sup>2</sup>", "2") + " − 9 ln x)" + MEJA("9", "1") + " = (49,5 − 9 ln 9) − 9,5", ""),
        ("!d) S = 40 − 18 ln 3 ≈ 20,225", "ln 9 = 2 ln 3."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)


def trikotnik_v2(X, Y):
    A, B, C, M, A1 = (1, 2), (-2, 6), (9, 8), (21 / 5, 22 / 5), (1 / 5, 32 / 5)
    return (f'<polygon points="{X(A[0]):.1f},{Y(A[1]):.1f} {X(B[0]):.1f},{Y(B[1]):.1f} {X(C[0]):.1f},{Y(C[1]):.1f}" fill="{MODRA}" fill-opacity="0.1" stroke="{MODRA}" stroke-width="1.5"/>'
            + f'<line x1="{X(A[0]):.1f}" y1="{Y(A[1]):.1f}" x2="{X(A1[0]):.1f}" y2="{Y(A1[1]):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>'
            + f'<line x1="{X(B[0]):.1f}" y1="{Y(B[1]):.1f}" x2="{X(M[0]):.1f}" y2="{Y(M[1]):.1f}" stroke="{ZELENA}" stroke-width="1.5"/>'
            + tocka(X, Y, *A, "A", dx=4, dy=14) + tocka(X, Y, *B, "B", dx=-14) + tocka(X, Y, *C, "C") + tocka(X, Y, *A1, "A'", dx=-6, dy=-8)
            + tocka(X, Y, *M, "M", dx=4, dy=14))


v2 = naloga(
    2, ["vektorji_ravnina_prostor", "pravokotni_koordinatni_sistem_ravnina"], 13,
    r"V ravnini so dane točke \(A(1, 2)\), \(B(-2, 6)\) in \(C(9, 8)\).<br>"
    r"a) Dokaži, da je trikotnik \(ABC\) pravokoten. Izračunaj točno ploščino trikotniku očrtanega kroga. (5 točk)<br>"
    r"b) Izračunaj koordinati točke \(A'\), ki je pravokotna projekcija točke \(A\) na daljico \(BC\). (3 točke)<br>"
    r"c) Točka \(M\) leži na daljici \(AC\). Zapiši njeni koordinati tako, da bo ploščina trikotnika \(ABM\) enaka \(10\). (5 točk)",
    r"a) \(S = \frac{125\pi}{4}\) &nbsp; b) \(A'\left(\frac{1}{5}, \frac{32}{5}\right)\) &nbsp; c) \(M\left(\frac{21}{5}, \frac{22}{5}\right)\)",
    [
        (V("AB") + " = (−3, 4),  " + V("AC") + " = (8, 6)", ""),
        ("!" + V("AB") + " · " + V("AC") + " = −24 + 24 = 0  ⇒  pravi kot pri A", "Pravokotna vektorja imata skalarni produkt 0."),
        ("|BC| = " + K("11<sup>2</sup> + 2<sup>2</sup>") + " = " + K("125") + " = 5" + K("5"), "Hipotenuza je premer očrtanega kroga (Talesov izrek)."),
        ("R = " + U("5" + K("5"), "2") + ",  R<sup>2</sup> = " + U("125", "4"), ""),
        ("!a) S = πR<sup>2</sup> = " + U("125π", "4"), ""),
        ("A' = B + t · " + V("BC") + ",  t = " + U(V("BA") + " · " + V("BC"), "|" + V("BC") + "|<sup>2</sup>") + " = " + U("(3, −4) · (11, 2)", "125") + " = " + U("1", "5"), "Pravokotna projekcija točke na premico."),
        ("!b) A'(−2 + " + U("11", "5") + ", 6 + " + U("2", "5") + ") = (" + U("1", "5") + ", " + U("32", "5") + ")", ""),
        ("S<sub>ABC</sub> = " + U("|AB| · |AC|", "2") + " = " + U("5 · 10", "2") + " = 25", "Ploščina pravokotnega trikotnika."),
        ("M = A + s · " + V("AC") + ",  S<sub>ABM</sub> = s · S<sub>ABC</sub> = 25s = 10  ⇒  s = " + U("2", "5"), "Trikotnika imata skupno višino iz B."),
        ("!c) M(1 + " + U("16", "5") + ", 2 + " + U("12", "5") + ") = (" + U("21", "5") + ", " + U("22", "5") + ")", ""),
        ("@slika", mreza((-3, 10), (-1, 9), trikotnik_v2, sirina=300)),
    ],
)


def kompleksna_a(X, Y):
    return tocka(X, Y, 1, -3, "z = 1 − 3i")


def kompleksna_d(X, Y):
    return (parametricna(X, Y, lambda t: 3 * math.cos(t), lambda t: -2 + 3 * math.sin(t), 0, 2 * math.pi, RDECA)
            + tocka(X, Y, 0, -2, "−2i"))


v3 = naloga(
    3, "stevilske_mnozice", 13,
    r"a) V kompleksni ravnini nariši sliko števila \(z = 10(1 + 3i)^{-1}\). (2 točki)<br>"
    r"b) Izračunaj vsa realna števila \(x\), za katera je število "
    r"\(z = 2x^3 i^{2021} + x^2 i^{2023} + 2x\, i^{2027} + i^{2025} + (x^2 + 3)\, i^{2026} + x + 4\) realno. (5 točk)<br>"
    r"c) Dano je število \(w = 1 + i\). Izračunaj vsa kompleksna števila \(z = x + iy\), za katera je \(\mathrm{Re}(w \cdot z) = 0\) "
    r"in \(|z \cdot w| = 4\). (4 točke)<br>"
    r"d) V kompleksni ravnini nariši množico točk, ki ustreza pogoju \(|z + 2i| = 3\). (2 točki)",
    r"a) \(z = 1 - 3i\) &nbsp; b) \(x \in \{1, -1, \frac{1}{2}\}\) &nbsp; c) \(z_1 = 2 + 2i\), \(z_2 = -2 - 2i\) &nbsp; "
    r"d) krožnica s središčem \(-2i\) in polmerom \(3\)",
    [
        ("z = " + U("10", "1 + 3i") + " · " + U("1 − 3i", "1 − 3i") + " = " + U("10(1 − 3i)", "10"), "Razširimo s konjugirano vrednostjo."),
        ("!a) z = 1 − 3i", ""),
        ("@slika", mreza((-2, 4), (-4, 2), kompleksna_a, sirina=200)),
        ("i<sup>2021</sup> = i,  i<sup>2023</sup> = −i,  i<sup>2025</sup> = i,  i<sup>2026</sup> = −1,  i<sup>2027</sup> = −i", "Potence i se ponavljajo s periodo 4 (2020 je deljivo s 4)."),
        ("z = (−x<sup>2</sup> + x + 1) + (2x<sup>3</sup> − x<sup>2</sup> − 2x + 1) i", "Ločimo realni in imaginarni del."),
        ("2x<sup>3</sup> − x<sup>2</sup> − 2x + 1 = 0", "Število je realno, ko je imaginarni del 0."),
        ("x<sup>2</sup>(2x − 1) − (2x − 1) = (2x − 1)(x − 1)(x + 1) = 0", "Združevanje členov."),
        ("!b) x<sub>1</sub> = 1,  x<sub>2</sub> = −1,  x<sub>3</sub> = " + U("1", "2"), ""),
        ("w · z = (1 + i)(x + iy) = (x − y) + (x + y) i", ""),
        ("Re(w · z) = 0  ⇒  y = x", ""),
        ("|z · w| = |z| · |w| = " + K("2") + " · " + K("2x<sup>2</sup>") + " = 4  ⇒  x<sup>2</sup> = 4", "Absolutna vrednost produkta je produkt absolutnih vrednosti."),
        ("!c) z<sub>1</sub> = 2 + 2i,  z<sub>2</sub> = −2 − 2i", ""),
        ("|z − (−2i)| = 3: točke, ki so od −2i oddaljene za 3", "Absolutna vrednost razlike je razdalja v kompleksni ravnini."),
        ("!d) krožnica s središčem (0, −2) in polmerom 3", ""),
        ("@slika", mreza((-4, 4), (-6, 2), kompleksna_d, sirina=220)),
    ],
)

POLA2 = [v1, v2, v3]
