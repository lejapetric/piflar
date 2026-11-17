# Jesenski rok 2013 (uradne pole RIC: m132-401-1-1, m132-402-1-1, m132-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2013, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "stevilske_mnozice", 7,
    r"Dano je štirinajstmestno število \(\overline{1111100000555a}\). Zapiši vse možnosti za števko \(a\), pri katerih je število deljivo "
    r"z \(2\), s \(3\), s \(4\), s \(5\), s \(6\), z \(9\) in z \(10\).",
    r"z 2: \(0, 2, 4, 6, 8\); s 3: \(1, 4, 7\); s 4: \(2, 6\); s 5: \(0, 5\); s 6: \(4\); z 9: \(7\); z 10: \(0\)",
    [
        ("!z 2: a ∈ {0, 2, 4, 6, 8}", "Število je deljivo z 2, ko je zadnja števka soda (pravila deljivosti)."),
        ("vsota števk: 5 · 1 + 3 · 5 + a = 20 + a", ""),
        ("!s 3: a ∈ {1, 4, 7}", "Vsota števk mora biti deljiva s 3."),
        ("!s 4: a ∈ {2, 6}", "Število, sestavljeno iz zadnjih dveh števk (52 ali 56), mora biti deljivo s 4."),
        ("!s 5: a ∈ {0, 5}", ""),
        ("!s 6: a = 4", "Deljivo mora biti z 2 in s 3."),
        ("!z 9: a = 7", "Vsota števk 27 je deljiva z 9."),
        ("!z 10: a = 0", ""),
    ],
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Poenostavi izraz \(\dfrac{a}{a - 3} - \dfrac{a^2 + a + 3}{a^2 - a - 6}\), če je \(a \ne 3\) in \(a \ne -2\).",
    r"\(\frac{1}{a + 2}\)",
    [
        ("a<sup>2</sup> − a − 6 = (a − 3)(a + 2)", "Razcep kvadratnega trinoma (Vietovo pravilo)."),
        (U("a(a + 2) − (a<sup>2</sup> + a + 3)", "(a − 3)(a + 2)") + " = " + U("a − 3", "(a − 3)(a + 2)"), "Ulomka razširimo na skupni imenovalec."),
        ("!" + U("1", "a + 2"), "Okrajšamo z a − 3 ≠ 0."),
    ],
)

def resitvi3(X, Y):
    return tocka(X, Y, -2, 3, "−2 + 3i") + tocka(X, Y, -2, -3, "−2 − 3i")

n3 = naloga(
    3, ["stevilske_mnozice", "algebrski_izrazi_enacbe_neenacbe"], 5,
    r"Reši enačbo \(x(x + 4) + 13 = 0\) in nariši rešitvi v kompleksni ravnini.",
    r"\(x_{1,2} = -2 \pm 3i\)",
    [
        ("x<sup>2</sup> + 4x + 13 = 0,  D = 16 − 52 = −36", "Diskriminanta je negativna, rešitvi sta kompleksni."),
        ("!x<sub>1,2</sub> = " + U("−4 ± 6i", "2") + " = −2 ± 3i", "Rešitve kvadratne enačbe."),
        ("@slika", mreza((-4, 2), (-4, 4), resitvi3, sirina=200)),
    ],
)

def trapez4():
    s, ox, oy = 26, 30, 140
    P = lambda x, y: (ox + s * x, oy - s * y)
    A, B, C, D = P(0, 0), P(10, 0), P(7, 4), P(0, 4)
    t = f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-width="1.6"/>'
    t += f'<polyline points="{A[0] + 10},{A[1]} {A[0] + 10},{A[1] - 10} {A[0]},{A[1] - 10}" fill="none" stroke="currentColor"/>'
    for (x, y), n, dx, dy in ((A, "A", -14, 14), (B, "B", 4, 14), (C, "C", 4, -4), (D, "D", -14, -4)):
        t += f'<text x="{x + dx}" y="{y + dy}" font-size="12" fill="currentColor">{n}</text>'
    t += f'<text x="{B[0] - 34}" y="{B[1] - 6}" font-size="12" fill="currentColor">β</text>'
    return svg(320, 170, t)

n4 = naloga(
    4, "geometrijski_liki_telesa", 5,
    r"Na sliki je štirikotnik \(ABCD\) z \(|AB| = 10\), \(|AD| = 4\), \(|DC| = 7\); stranica \(AB\) je vzporedna s \(CD\), kot \(\angle BAD = 90^\circ\). "
    r"Kako se imenuje tak štirikotnik? Izračunaj natančno dolžino stranice \(BC\) in kot \(\beta = \angle ABC\) na desetinko stopinje." + trapez4(),
    r"pravokotni trapez, \(|BC| = 5\), \(\beta \approx 53{,}1^\circ\)",
    [
        ("!pravokotni trapez", "Par vzporednih stranic in pravi kot ob kraku."),
        ("|BC|<sup>2</sup> = 4<sup>2</sup> + (10 − 7)<sup>2</sup> = 25", "Višina iz C razdeli trapez na pravokotnik in pravokotni trikotnik; Pitagorov izrek."),
        ("!|BC| = 5", ""),
        ("tan β = " + U("4", "3"), "Kotne funkcije v pravokotnem trikotniku."),
        ("!β ≈ 53,1°", ""),
    ],
)

def f5(x):
    return x * x / 2 - x - 4

def g5(x):
    return x / 2 + 1

n5 = naloga(
    5, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 8,
    r"Na sliki sta grafa funkcij \(f(x) = \frac{x^2}{2} - x - 4\) in \(g(x) = \frac{x}{2} + 1\). Brez računala izračunaj presečišči grafov in reši "
    r"neenačbo \(f(x) > g(x)\)."
    + graf([(f5, MODRA), (g5, RDECA)], (-4, 7), (-6, 8), sirina=300, visina=330),
    r"\((-2, 0)\), \(\left(5, \frac{7}{2}\right)\); \(x \in (-\infty, -2) \cup (5, \infty)\)",
    [
        (U("x<sup>2</sup>", "2") + " − x − 4 = " + U("x", "2") + " + 1  ⇒  x<sup>2</sup> − 3x − 10 = 0", "Izenačimo predpisa in pomnožimo z 2."),
        ("(x − 5)(x + 2) = 0", "Vietovo pravilo."),
        ("!presečišči (−2, 0) in (5, " + U("7", "2") + ")", ""),
        ("x<sup>2</sup> − 3x − 10 > 0", "f(x) > g(x): parabola leži nad premico."),
        ("!x ∈ (−∞, −2) ∪ (5, ∞)", "Kvadratna neenačba: parabola z odprtino navzgor je pozitivna zunaj ničel."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

def elipsa6(X, Y):
    return (parametricna(X, Y, lambda t: -2 + 4 * math.cos(t), lambda t: 1 + 2 * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -2, 1, "S") + "".join(tocka(X, Y, x, y) for x, y in ((-6, 1), (2, 1), (-2, 3), (-2, -1))))

n6 = naloga(
    6, "stoznice", 8,
    r"V koordinatni sistem nariši elipso \(x^2 + 4y^2 + 4x - 8y - 8 = 0\). Zapiši središče in temena elipse.",
    r"\(S(-2, 1)\); temena \((-6, 1)\), \((2, 1)\), \((-2, 3)\), \((-2, -1)\)",
    [
        ("(x + 2)<sup>2</sup> − 4 + 4(y − 1)<sup>2</sup> − 4 − 8 = 0", "Dopolnimo do popolnih kvadratov."),
        (U("(x + 2)<sup>2</sup>", "16") + " + " + U("(y − 1)<sup>2</sup>", "4") + " = 1", "Delimo s 16: a = 4, b = 2."),
        ("!S(−2, 1)", "Premaknjena elipsa."),
        ("!temena (−6, 1), (2, 1), (−2, 3), (−2, −1)", "Od središča gremo za a vodoravno in za b navpično."),
        ("@slika", mreza((-7, 3), (-2, 4), elipsa6, sirina=320)),
    ],
)

n7 = naloga(
    7, "vektorji_ravnina_prostor", 8,
    r"Pravokotnik \(ABCD\) ima stranici \(|AB| = 6\) in \(|AD| = 4\). Točka \(T\) leži na stranici \(AD\), tako da je \(|AT| = 1\). Naj bo "
    r"\(\overrightarrow{AB} = \vec{a}\) in \(\overrightarrow{AD} = \vec{b}\). Nariši skico z označenimi vektorji \(\vec{a}\), \(\vec{b}\) in "
    r"\(\overrightarrow{BT}\). Izrazi \(\overrightarrow{BT}\) z \(\vec{a}\) in \(\vec{b}\) ter dokaži, da sta vektorja \(\overrightarrow{BT}\) in "
    r"\(\vec{a} + 9\vec{b}\) pravokotna.",
    r"\(\overrightarrow{BT} = -\vec{a} + \frac{1}{4}\vec{b}\)",
    [
        ("!" + V("BT") + " = " + V("BA") + " + " + V("AT") + " = −" + V("a") + " + " + U("1", "4") + V("b"), "AT je četrtina stranice AD."),
        (V("a") + " · " + V("b") + " = 0,  |" + V("a") + "|<sup>2</sup> = 36,  |" + V("b") + "|<sup>2</sup> = 16", "Stranici pravokotnika sta pravokotni."),
        (V("BT") + " · (" + V("a") + " + 9" + V("b") + ") = −36 + " + U("9", "4") + " · 16 = −36 + 36 = 0", "Skalarni produkt je distributiven."),
        ("!vektorja sta pravokotna", "Skalarni produkt je 0."),
    ],
)

n8 = naloga(
    8, "funkcije", 6,
    r"Nalogo reši brez računala. Natančno izračunaj \(\sin 2x\), če je \(\sin x = -\frac{3}{4}\) in \(x \in \left(\frac{3\pi}{2}, 2\pi\right)\).",
    r"\(-\frac{3\sqrt{7}}{8}\)",
    [
        ("cos x = " + K("1 − " + U("9", "16")) + " = " + U(K("7"), "4"), "sin²x + cos²x = 1; v četrtem kvadrantu je kosinus pozitiven."),
        ("!sin 2x = 2 · (−" + U("3", "4") + ") · " + U(K("7"), "4") + " = −" + U("3" + K("7"), "8"), "Sinus dvojnega kota."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, "funkcije", 6,
    r"Nalogo reši brez računala. Reši enačbi:<br>"
    r"9.1. \(\log_x 4 = \frac{2}{3}\) (2 točki) &nbsp; 9.2. \(2^{x + 1} + 2^{x - 1} = \frac{5}{8}\) (4 točke)",
    r"9.1. \(x = 8\) &nbsp; 9.2. \(x = -2\)",
    [
        ("x<sup>2/3</sup> = 4  ⇒  x = 4<sup>3/2</sup>", "Definicija logaritma."),
        ("!9.1  x = 8", ""),
        ("2<sup>x</sup>(2 + " + U("1", "2") + ") = " + U("5", "8") + "  ⇒  2<sup>x</sup> = " + U("1", "4"), "Izpostavimo 2ˣ."),
        ("!9.2  x = −2", "Eksponentna enačba."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n10 = naloga(
    10, "zaporedja_vrste", 8,
    r"Vsi členi aritmetičnega zaporedja so pozitivni. Produkt prvega in tretjega člena je \(8\), vsota četrtega in šestega člena je \(12\). "
    r"Izračunaj prvi člen in diferenco, zapiši splošni člen in tristoti člen.",
    r"\(a_1 = 2\), \(d = 1\), \(a_n = n + 1\), \(a_{300} = 301\)",
    [
        (SISTEM("a<sub>1</sub>(a<sub>1</sub> + 2d) = 8", "2a<sub>1</sub> + 8d = 12"), "Splošni člen aritmetičnega zaporedja."),
        ("a<sub>1</sub> = 6 − 4d:  (6 − 4d)(6 − 2d) = 8  ⇒  2d<sup>2</sup> − 9d + 7 = 0", ""),
        ("d = 1 ali d = " + U("7", "2"), ""),
        ("!a<sub>1</sub> = 2,  d = 1", "Pri d = 7/2 je a₁ = −8, kar ni pozitivno."),
        ("!a<sub>n</sub> = n + 1,  a<sub>300</sub> = 301", ""),
    ],
)

def senca11(X, Y):
    a = math.pi / 3
    pts = [(0, 0)] + [(a * i / 60, 3 * math.sin(a * i / 60)) for i in range(61)] + [(a, 0)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25"/>'
            + krivulja(X, Y, lambda x: 3 * math.sin(x), -0.3, math.pi + 0.3, MODRA)
            + f'<line x1="{X(a):.1f}" y1="{Y(-0.3):.1f}" x2="{X(a):.1f}" y2="{Y(3.3):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>'
            + f'<text x="{X(a) + 3:.1f}" y="{Y(0) + 13:.1f}" font-size="11" fill="currentColor">a</text>'
            + f'<text x="{X(math.pi):.1f}" y="{Y(0) + 13:.1f}" font-size="11" fill="currentColor">π</text>')

n11 = naloga(
    11, ["integralski_racun", "funkcije"], 7,
    r"Na sliki je graf funkcije \(f(x) = 3\sin x\). Izračunaj število \(a \in (0, \pi)\), da bo ploščina osenčenega lika med grafom funkcije, "
    r"abscisno osjo in premico \(x = a\) enaka \(\frac{3}{2}\)."
    + mreza((-0.4, math.pi + 0.4), (-0.6, 3.6), senca11, sirina=320, visina=200, oznake=False),
    r"\(a = \frac{\pi}{3}\)",
    [
        ("p = " + INT("a", "0") + "3 sin x dx = −3 cos x" + MEJA("a", "0") + " = 3 − 3 cos a", "Integral sinusa; na (0, π) je sinus pozitiven."),
        ("3 − 3 cos a = " + U("3", "2") + "  ⇒  cos a = " + U("1", "2"), ""),
        ("!a = " + U("π", "3"), "Edina rešitev na (0, π)."),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n12 = naloga(
    12, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Na kongresu je \(9\) fizikov in \(7\) kemikov. Le enemu fiziku je ime Ana, le enemu kemiku Bor. Izbrali bodo petčlansko predsedstvo "
    r"s \(3\) fiziki in \(2\) kemikoma.<br>"
    r"12.1. Na koliko načinov lahko izberejo predsedstvo? (2 točki)<br>"
    r"12.2. Izračunaj verjetnost dogodka \(A\), da bo v naključno izbranem predsedstvu vsaj eden od Ane in Bora. (5 točk)",
    r"12.1. \(1764\) &nbsp; 12.2. \(\frac{11}{21}\)",
    [
        ("!12.1  " + BINOM("9", "3") + " · " + BINOM("7", "2") + " = 84 · 21 = 1764", "Kombinacije in pravilo produkta."),
        ("brez Ane in Bora: " + BINOM("8", "3") + " · " + BINOM("6", "2") + " = 56 · 15 = 840", "Nasprotni dogodek: nobenega od njiju ni v predsedstvu."),
        ("!12.2  P(A) = 1 − " + U("840", "1764") + " = 1 − " + U("10", "21") + " = " + U("11", "21"), ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["pravokotni_koordinatni_sistem_ravnina", "vektorji_ravnina_prostor", "geometrijski_liki_telesa"], 14,
    r"V ravnini so dane točke \(A(-1, 1)\), \(B(5, -1)\) in \(C(2, 4)\).<br>"
    r"1.1. Koliko je točka \(C\) oddaljena od premice skozi \(A\) in \(B\)? Rezultat naj bo točen. (3 točke)<br>"
    r"1.2. Zapiši enačbo nosilke težiščnice na stranico \(AC\) trikotnika \(ABC\) in izračunaj kot pri oglišču \(A\). (5 točk)<br>"
    r"1.3. Izračunaj oglišče \(D\), da bo \(ABCD\) paralelogram. (2 točki)<br>"
    r"1.4. Na desetinko natančno izračunaj prostornino vrtenine, ki nastane z vrtenjem paralelograma \(ABCD\) okrog stranice \(AB\). (4 točke)",
    r"1.1. \(\frac{6\sqrt{10}}{5}\) &nbsp; 1.2. \(7x + 9y - 26 = 0\), \(\alpha \approx 63{,}43^\circ\) &nbsp; 1.3. \(D(-4, 6)\) &nbsp; 1.4. \(\approx 286{,}1\)",
    [
        ("premica AB: k = −" + U("1", "3") + ",  x + 3y − 2 = 0", "Enačba premice skozi dve točki v implicitni obliki."),
        ("!d = " + U("|2 + 12 − 2|", K("1 + 9")) + " = " + U("12", K("10")) + " = " + U("6" + K("10"), "5"), "Razdalja točke od premice."),
        ("razpolovišče AC: M(" + U("1", "2") + ", " + U("5", "2") + ")", "Težiščnica poteka skozi B in razpolovišče nasprotne stranice."),
        ("k = " + U("5/2 + 1", "1/2 − 5") + " = −" + U("7", "9"), ""),
        ("!težiščnica: 7x + 9y − 26 = 0", "y + 1 = −7/9 (x − 5)."),
        ("cos α = " + U(V("AB") + " · " + V("AC"), "|AB| |AC|") + " = " + U("(6, −2) · (3, 3)", K("40") + " · " + K("18")) + " = " + U("12", "12" + K("5")), "Kot med vektorjema."),
        ("!α ≈ 63,43°", ""),
        ("!" + V("r<sub>D</sub>") + " = " + V("r<sub>A</sub>") + " + " + V("r<sub>C</sub>") + " − " + V("r<sub>B</sub>") + ":  D(−4, 6)", "V paralelogramu je AD = BC."),
        ("V = π d<sup>2</sup> · |AB|", "Vrtenina je valj z eno vbočeno in eno izbočeno stožčasto osnovno ploskvijo; stožca imata enako prostornino."),
        ("!V = π · " + U("144", "10") + " · 2" + K("10") + " ≈ 286,1", "|AB| = √40 = 2√10, polmer je razdalja d iz 1.1."),
    ],
)

v2 = naloga(
    2, ["funkcije", "diferencialni_racun", "integralski_racun"], 13,
    r"Obvezna naloga. Dana je funkcija \(f(x) = a\cos x + 3\), \(a \in \mathbb{R}\).<br>"
    r"2.1. Za katere \(a\) se graf funkcije dotika osi \(x\)? Za katere \(a\) jo seka? (2 točki)<br>"
    r"2.2. Določi \(a\), da bo tangenta na graf v točki z absciso \(\frac{\pi}{6}\) vzporedna premici \(2x - y + 5 = 0\). (3 točke)<br>"
    r"2.3. Število \(\frac{\pi}{3}\) je ničla funkcije \(f\). Izračunaj \(a\) in zapiši vse ničle funkcije. (4 točke)<br>"
    r"2.4. Določi \(a > 0\), da bo ploščina lika med grafom funkcije in abscisno osjo na intervalu \(\left[0, \frac{\pi}{3}\right]\) enaka "
    r"\(2\sqrt{3} + \pi\). (4 točke)",
    r"2.1. dotika: \(a = \pm 3\), seka: \(|a| > 3\) &nbsp; 2.2. \(a = -4\) &nbsp; 2.3. \(a = -6\), \(x = \pm\frac{\pi}{3} + 2k\pi\) &nbsp; 2.4. \(a = 4\)",
    [
        ("Z<sub>f</sub> = [3 − |a|, 3 + |a|]", "Kosinus zavzame vrednosti od −1 do 1."),
        ("!dotika se pri a = ±3, seka pri |a| > 3", "Najmanjša vrednost je 0 oziroma negativna."),
        ("f '(x) = −a sin x,  f '(" + U("π", "6") + ") = −" + U("a", "2"), "Odvod kosinusa."),
        ("!−" + U("a", "2") + " = 2  ⇒  a = −4", "Premica y = 2x + 5 ima smerni koeficient 2."),
        (U("a", "2") + " + 3 = 0  ⇒  a = −6", "f(π/3) = 0; cos(π/3) = 1/2."),
        ("−6 cos x + 3 = 0  ⇒  cos x = " + U("1", "2"), ""),
        ("!a = −6,  ničle x = ±" + U("π", "3") + " + 2kπ, k ∈ ℤ", ""),
        ("p = " + INT("π/3", "0") + "(a cos x + 3) dx = (a sin x + 3x)" + MEJA("π/3", "0") + " = " + U("a" + K("3"), "2") + " + π", "Za a > 0 je f na intervalu pozitivna."),
        ("!" + U("a" + K("3"), "2") + " = 2" + K("3") + "  ⇒  a = 4", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

def kvadrat_v3(X, Y):
    k = [(0, 0), (6, 0), (6, -6), (0, -6)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in k)
    return (f'<polygon points="{pot}" fill="none" stroke="currentColor" stroke-width="1.6"/>'
            + parametricna(X, Y, lambda t: 3 + math.sqrt(18) * math.cos(t), lambda t: -3 + math.sqrt(18) * math.sin(t), 0, 2 * math.pi, RDECA)
            + parametricna(X, Y, lambda t: 3 + math.sqrt(45) * math.cos(t), lambda t: -3 + math.sqrt(11.25) * math.sin(t), 0, 2 * math.pi, MODRA)
            + parametricna(X, Y, lambda t: 3 - 3 * (t * t), lambda t: -3 + 3 * t * 1.0, -1.6, 1.6, "#2a9d4b"))

v3 = naloga(
    3, "stoznice", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Kvadrat s stranico \(6\) postavimo v četrti kvadrant tako, da je eno oglišče v izhodišču, dve "
    r"oglišči pa ležita na koordinatnih oseh.<br>"
    r"3.1. Zapiši enačbo kvadratu očrtane krožnice. (3 točke)<br>"
    r"3.2. Zapiši enačbo elipse s središčem v središču kvadrata, ki ima vodoravno os dvakrat daljšo od navpične in poteka skozi oglišča "
    r"kvadrata. Zapiši njeni gorišči. (4 točke)<br>"
    r"3.3. Zapiši enačbo hiperbole, ki se dotika navpičnih stranic kvadrata, njeni asimptoti pa sta nosilki diagonal kvadrata. (2 točki)<br>"
    r"3.4. Zapiši enačbo parabole s temenom v presečišču diagonal kvadrata, ki poteka skozi oglišči na osi \(y\). Izračunaj kot, pod katerim "
    r"parabola seka abscisno os. (4 točke)",
    r"3.1. \((x - 3)^2 + (y + 3)^2 = 18\) &nbsp; 3.2. \(\frac{(x - 3)^2}{45} + \frac{(y + 3)^2}{45/4} = 1\), \(F\left(3 \pm \frac{3\sqrt{15}}{2}, -3\right)\) &nbsp; "
    r"3.3. \((x - 3)^2 - (y + 3)^2 = 9\) &nbsp; 3.4. \((y + 3)^2 = -3(x - 3)\), \(\approx 26{,}57^\circ\)",
    [
        ("oglišča (0, 0), (6, 0), (6, −6), (0, −6);  središče S(3, −3)", ""),
        ("!3.1  (x − 3)<sup>2</sup> + (y + 3)<sup>2</sup> = 18", "Polmer je polovica diagonale: r = 3√2."),
        (U("(x − 3)<sup>2</sup>", "4b<sup>2</sup>") + " + " + U("(y + 3)<sup>2</sup>", "b<sup>2</sup>") + " = 1 skozi (0, 0):  " + U("9", "4b<sup>2</sup>") + " + " + U("9", "b<sup>2</sup>") + " = 1", "a = 2b."),
        ("b<sup>2</sup> = " + U("45", "4") + ",  a<sup>2</sup> = 45", ""),
        ("!" + U("(x − 3)<sup>2</sup>", "45") + " + " + U("(y + 3)<sup>2</sup>", "45/4") + " = 1", "Premaknjena elipsa."),
        ("!e = " + K("45 − " + U("45", "4")) + " = " + U("3" + K("15"), "2") + ":  F(3 ± " + U("3" + K("15"), "2") + ", −3)", "Linearna ekscentričnost elipse."),
        ("a = 3 (temeni na x = 0 in x = 6),  b = a = 3", "Diagonali kvadrata imata smerna koeficienta ±1, zato je b/a = 1."),
        ("!3.3  " + U("(x − 3)<sup>2</sup>", "9") + " − " + U("(y + 3)<sup>2</sup>", "9") + " = 1", "Enakoosna hiperbola."),
        ("(y + 3)<sup>2</sup> = 2p(x − 3) skozi (0, 0):  9 = −6p", "Parabola z vodoravno osjo, ker gre skozi (0, 0) in (0, −6)."),
        ("!(y + 3)<sup>2</sup> = −3(x − 3)", "Parabola je odprta v levo."),
        ("y = 0  ⇒  x = 0;  2(y + 3)y' = −3  ⇒  y'(0, 0) = −" + U("1", "2"), "Parabola seka os x v izhodišču; odvod implicitno podane krivulje."),
        ("!tan φ = " + U("1", "2") + "  ⇒  φ ≈ 26,57°", "Kot med tangento in osjo x."),
        ("@slika", mreza((-4, 10), (-10, 3), kvadrat_v3, sirina=300)),
    ],
)

def f_v4(x):
    return 3 * 4 ** (1 - x)

v4 = naloga(
    4, ["funkcije", "zaporedja_vrste"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Na sliki je graf funkcije \(f(x) = 3 \cdot a^{1 - bx}\), ki poteka skozi točki \(A(0, 12)\) in "
    r"\(B(1, 3)\)."
    + graf([(f_v4, MODRA)], (-1, 4), (-1, 14), tocke=[(0, 12, "A"), (1, 3, "B")], sirina=240, visina=330)
    + r"4.1. Izračunaj \(a\) in \(b\). (4 točke)<br>"
      r"4.2. Tabeliraj funkcijo \(h: \mathbb{N} \to \mathbb{R}\), \(h(n) = 3 \cdot 4^{1 - n}\), za \(n = 1, 2, 3, 4\). Vrednosti zapiši z ulomki. (1 točka)<br>"
      r"4.3. Pokaži, da vrednosti \(a_n = h(n)\) tvorijo geometrijsko zaporedje, in izračunaj kvocient. Koliko členov je večjih od "
      r"\(3 \cdot 10^{-2013}\)? (4 točke)<br>"
      r"4.4. S popolno indukcijo dokaži, da je vsota prvih \(n\) členov enaka \(S_n = 4 - 4^{1 - n}\). (4 točke)",
    r"4.1. \(a = 4\), \(b = 1\) &nbsp; 4.2. \(3, \frac{3}{4}, \frac{3}{16}, \frac{3}{64}\) &nbsp; 4.3. \(q = \frac{1}{4}\), \(3344\) členov",
    [
        ("f(0) = 3a = 12  ⇒  a = 4", ""),
        ("f(1) = 3 · 4<sup>1 − b</sup> = 3  ⇒  1 − b = 0", "Eksponentna enačba."),
        ("!4.1  a = 4,  b = 1", ""),
        ("!4.2  h(1) = 3,  h(2) = " + U("3", "4") + ",  h(3) = " + U("3", "16") + ",  h(4) = " + U("3", "64"), ""),
        (U("a<sub>n + 1</sub>", "a<sub>n</sub>") + " = " + U("3 · 4<sup>−n</sup>", "3 · 4<sup>1 − n</sup>") + " = " + U("1", "4"), "Kvocient zaporednih členov je stalen."),
        ("3 · 4<sup>1 − n</sup> > 3 · 10<sup>−2013</sup>  ⇒  (n − 1) log 4 < 2013", "Logaritmiramo neenačbo."),
        ("n − 1 < " + U("2013", "log 4") + " ≈ 3343,5", ""),
        ("!4.3  q = " + U("1", "4") + ";  večjih je prvih 3344 členov", ""),
        ("n = 1:  S<sub>1</sub> = 4 − 1 = 3 = a<sub>1</sub>", "Baza indukcije."),
        ("S<sub>n + 1</sub> = 4 − 4<sup>1 − n</sup> + 3 · 4<sup>−n</sup> = 4 − 4 · 4<sup>−n</sup> + 3 · 4<sup>−n</sup> = 4 − 4<sup>−n</sup>", "Indukcijski korak."),
        ("!4.4  S<sub>n + 1</sub> = 4 − 4<sup>1 − (n + 1)</sup> – trditev velja za vsak n", ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

POLA2 = [v1, v2, v3, v4]
