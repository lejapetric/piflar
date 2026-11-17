# Jesenski rok 2006 (uradne pole RIC: m062-401-1-1, m062-402-1-1, m062-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2006, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "funkcije", 6,
    r"Izračunaj presečišči parabole \(y = x^2 - 3x + 1\) in premice \(y = x - 2\).",
    r"\(P_1(1, -1)\), \(P_2(3, 1)\)",
    [
        ("x<sup>2</sup> − 3x + 1 = x − 2  ⇒  x<sup>2</sup> − 4x + 3 = 0", "V presečišču sta y-koordinati enaki."),
        ("(x − 1)(x − 3) = 0", ""),
        ("!P<sub>1</sub>(1, −1),  P<sub>2</sub>(3, 1)", "Ordinati izračunamo iz enačbe premice."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)


def trikotnik2(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((-2, 1), (-2, 7), (4, 1)))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>'
            + f'<line x1="{X(-2):.1f}" y1="{Y(-1):.1f}" x2="{X(-2):.1f}" y2="{Y(8):.1f}" stroke="{MODRA}" stroke-width="2"/>'
            + krivulja(X, Y, lambda x: 1, -4, 6, RDECA) + krivulja(X, Y, lambda x: 5 - x, -3, 6, "#2a9d4b")
            + tocka(X, Y, -2, 1, "A", dx=-14, dy=14) + tocka(X, Y, -2, 7, "B", dx=-14) + tocka(X, Y, 4, 1, "C", dy=14))

n2 = naloga(
    2, "pravokotni_koordinatni_sistem_ravnina", 7,
    r"V koordinatni sistem nariši premice \(x + 2 = 0\), \(y - 1 = 0\) in \(x + y = 5\) ter izračunaj ploščino trikotnika, ki ga oklepajo.",
    r"\(S = 18\)",
    [
        ("@slika", mreza((-4, 6), (-1, 8), trikotnik2, sirina=260)),
        ("!oglišča A(−2, 1),  B(−2, 7),  C(4, 1)", "Presečišča po dveh premic."),
        ("!S = " + U("|AB| · |AC|", "2") + " = " + U("6 · 6", "2") + " = 18", "Trikotnik je pravokoten (navpična in vodoravna premica)."),
    ],
)

n3 = naloga(
    3, "funkcije", 5,
    r"Dana je funkcija \(f(x) = \sqrt{2x + 1}\). Izračunaj \(f(4)\) in \(f(12)\). Zapiši definicijsko območje funkcije.",
    r"\(f(4) = 3\), \(f(12) = 5\), \(D_f = \left[-\frac{1}{2}, \infty\right)\)",
    [
        ("!f(4) = " + K("9") + " = 3,  f(12) = " + K("25") + " = 5", ""),
        ("2x + 1 ≥ 0", "Izraz pod sodim korenom ne sme biti negativen."),
        ("!D<sub>f</sub> = [−" + U("1", "2") + ", ∞)", ""),
    ],
    snov=FUN + "korenska_razlaga.html",
)

n4 = naloga(
    4, "funkcije", 7,
    r"Reši enačbo \(\log_2(x - 2) + \log_2(x + 5) = 3\).",
    r"\(x = 3\)",
    [
        ("pogoj: x > 2", "Logaritmiramo le pozitivna števila."),
        ("log<sub>2</sub>((x − 2)(x + 5)) = 3  ⇒  (x − 2)(x + 5) = 8", "Vsota logaritmov; definicija logaritma."),
        ("x<sup>2</sup> + 3x − 18 = 0  ⇒  (x + 6)(x − 3) = 0", ""),
        ("!x = 3", "x = −6 ne ustreza pogoju."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n5 = naloga(
    5, ["kombinatorika", "verjetnostni_racun"], 6,
    r"Jan, Luka, Rok, Ana, Eva in Zala se naključno postavijo v vrsto pred blagajno. Kolikšna je verjetnost dogodka \(A\), da na začetku vrste "
    r"stojijo vsa tri dekleta?",
    r"\(P(A) = \frac{1}{20}\)",
    [
        ("n = 6! = 720", "Vse razvrstitve šestih oseb."),
        ("m = 3! · 3! = 36", "Dekleta razvrstimo na prva tri mesta, fante na zadnja tri."),
        ("!P(A) = " + U("36", "720") + " = " + U("1", "20"), ""),
    ],
)


def romb6():
    a = 130
    A, B = (20, 100), (20 + a, 100)
    D = (20 + a * math.cos(math.radians(30)), 100 - a * math.sin(math.radians(30)))
    C = (D[0] + a, D[1])
    return svg(300, 120, f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]:.1f}" y2="{C[1]:.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>'
               f'<line x1="{D[0]:.1f}" y1="{D[1]:.1f}" x2="{D[0]:.1f}" y2="{A[1]}" stroke="currentColor" stroke-opacity="0.6"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(B[0] + 4, B[1] + 14, "B") + napis(C[0] + 10, C[1] + 4, "C") + napis(D[0] - 6, D[1] - 6, "D")
               + napis(A[0] + 30, A[1] - 4, "30°", 10) + napis(D[0] + 8, D[1] + 30, "v", 12) + napis(150, 70, "e", 12, RDECA),
               opis="Romb ABCD z višino in daljšo diagonalo")

n6 = naloga(
    6, "geometrijski_liki_telesa", 8,
    r"Višina romba \(ABCD\) meri \(6\). Kot \(\angle DAB = 30^\circ\). Izračunaj točno dolžino stranice in točno dolžino daljše diagonale romba. "
    r"Nariši skico.",
    r"\(a = 12\), \(e = 6(\sqrt{6} + \sqrt{2}) \approx 23{,}18\)",
    [
        ("@slika", romb6()),
        ("sin 30° = " + U("v", "a") + "  ⇒  a = " + U("6", "1/2"), "Višina, stranica in del osnovnice tvorijo pravokotni trikotnik."),
        ("!a = 12", ""),
        ("daljša diagonala AC leži nasproti topega kota ∢ABC = 150°", "Sosednja kota romba sta suplementarna."),
        ("e<sup>2</sup> = 12<sup>2</sup> + 12<sup>2</sup> − 2 · 144 · cos 150° = 288 + 144" + K("3"), "Kosinusni izrek."),
        ("!e = 12" + K("2 + " + K("3")) + " = 6(" + K("6") + " + " + K("2") + ") ≈ 23,18", "Velja (√6 + √2)² = 8 + 4√3 = 4(2 + √3)."),
    ],
)

n7 = naloga(
    7, "vektorji_ravnina_prostor", 8,
    r"Dana sta vektorja \(\vec{a} = (2, -3)\) in \(\vec{b} = (4, 2)\). Zapiši vektor \(2\vec{a} - \frac{1}{2}\vec{b}\), izračunaj skalarni produkt "
    r"\(\vec{a} \cdot \vec{b}\) in kot \(\varphi\) med vektorjema na stotinko stopinje.",
    r"\((2, -7)\), \(\vec{a} \cdot \vec{b} = 2\), \(\varphi \approx 82{,}87^\circ\)",
    [
        ("2" + V("a") + " = (4, −6),  " + U("1", "2") + V("b") + " = (2, 1)", "Množenje vektorja s skalarjem."),
        ("!2" + V("a") + " − " + U("1", "2") + V("b") + " = (2, −7)", ""),
        ("!" + V("a") + " · " + V("b") + " = 8 − 6 = 2", "Skalarni produkt po komponentah."),
        ("cos φ = " + U("2", K("13") + " · " + K("20")) + " = " + U("2", K("260")) + " ≈ 0,124", ""),
        ("!φ ≈ 82,87°", ""),
    ],
)

n8 = naloga(
    8, "algebrski_izrazi_enacbe_neenacbe", 7,
    r"Če števec nekega ulomka zmanjšamo za \(2\), imenovalec pa pomnožimo z \(2\), dobimo \(\frac{1}{4}\). Če števec istega ulomka pomnožimo z "
    r"\(2\), imenovalec pa zmanjšamo za \(1\), dobimo \(2\). Kateri ulomek je to?",
    r"\(\frac{5}{6}\)",
    [
        (SISTEM(U("x − 2", "2y") + " = " + U("1", "4"), U("2x", "y − 1") + " = 2"), "Ulomek zapišemo kot x/y."),
        (SISTEM("y = 2x − 4", "x = y − 1"), "Odpravimo ulomke."),
        ("x = 2x − 5  ⇒  x = 5,  y = 6", ""),
        ("!" + U("5", "6"), "Preizkus: 3/12 = 1/4 in 10/5 = 2."),
    ],
)

n9 = naloga(
    9, "stevilske_mnozice", 7,
    r"V množici kompleksnih števil reši enačbo \((2 + i)z - 3i = 4\). Zapiši realni in imaginarni del rešitve.",
    r"\(z = \frac{11}{5} + \frac{2}{5}i\)",
    [
        ("(2 + i) z = 4 + 3i  ⇒  z = " + U("4 + 3i", "2 + i"), ""),
        ("z = " + U("(4 + 3i)(2 − i)", "5") + " = " + U("8 − 4i + 6i + 3", "5"), "Razširimo s konjugirano vrednostjo, i² = −1."),
        ("!z = " + U("11", "5") + " + " + U("2", "5") + "i:  Re z = " + U("11", "5") + ",  Im z = " + U("2", "5"), ""),
    ],
)

n10 = naloga(
    10, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Določi število \(a\) tako, da bo ostanek pri deljenju polinoma \(p(x) = x^3 - 3x + a\) s polinomom \(q(x) = x - 2\) enak \(5\). Zapiši "
    r"količnik \(k(x)\) tega deljenja.",
    r"\(a = 3\), \(k(x) = x^2 + 2x + 1\)",
    [
        ("ostanek = p(2) = 8 − 6 + a = 2 + a", "Izrek o ostanku: ostanek pri deljenju z x − c je p(c)."),
        ("!2 + a = 5  ⇒  a = 3", ""),
        ("Horner: 1 | 0 | −3 | 3  →  1 | 2 | 1 | 5", "Koeficienti količnika in ostanek."),
        ("!k(x) = x<sup>2</sup> + 2x + 1", ""),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

n11 = naloga(
    11, ["funkcije", "diferencialni_racun"], 6,
    r"Dana je funkcija \(f(x) = \cos 2x + 2\sin x\). Izračunaj njen odvod in dokaži, da je \(f'(0) + f'\left(\frac{\pi}{3}\right) = 3 - \sqrt{3}\).",
    r"\(f'(x) = -2\sin 2x + 2\cos x\)",
    [
        ("!f '(x) = −2 sin 2x + 2 cos x", "Verižno pravilo: (cos 2x)' = −2 sin 2x."),
        ("f '(0) = 0 + 2 = 2", ""),
        ("f '(" + U("π", "3") + ") = −2 sin " + U("2π", "3") + " + 2 cos " + U("π", "3") + " = −" + K("3") + " + 1", "sin 2π/3 = √3/2, cos π/3 = 1/2."),
        ("!f '(0) + f '(" + U("π", "3") + ") = 3 − " + K("3"), ""),
    ],
)


def odsekoma(x):
    if x < 0:
        return -x
    if x <= 2:
        return 1
    return x - 1


def slika12(X, Y):
    xs = [-2 + 5 * i / 100 for i in range(101)]
    pot = f"{X(-2):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(odsekoma(x)):.1f}" for x in xs if abs(x) > 1e-9) + f" {X(3):.1f},{Y(0):.1f}"
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>'
            + krivulja(X, Y, lambda x: -x, -3, -0.001, MODRA) + krivulja(X, Y, lambda x: 1, 0, 2, MODRA) + krivulja(X, Y, lambda x: x - 1, 2, 4, MODRA)
            + f'<circle cx="{X(0):.1f}" cy="{Y(0):.1f}" r="3.5" fill="white" stroke="{MODRA}" stroke-width="2"/>'
            + f'<circle cx="{X(0):.1f}" cy="{Y(1):.1f}" r="3.5" fill="{MODRA}"/>')

n12 = naloga(
    12, ["funkcije", "integralski_racun"], 7,
    r"Nariši graf funkcije \(f(x) = \begin{cases} -x; & x < 0 \\ 1; & 0 \le x \le 2 \\ x - 1; & x > 2 \end{cases}\) "
    r"in izračunaj \(\displaystyle\int_{-2}^{3} f(x)\,dx\).",
    r"\(\frac{11}{2}\)",
    [
        ("@slika", mreza((-3, 4), (-1, 4), slika12, sirina=260)),
        (INT("0", "−2") + "(−x) dx = −" + U("x<sup>2</sup>", "2") + MEJA("0", "−2") + " = 2", "Integral razdelimo po delih definicije."),
        (INT("2", "0") + "1 dx = 2", ""),
        (INT("3", "2") + "(x − 1) dx = (" + U("x<sup>2</sup>", "2") + " − x)" + MEJA("3", "2") + " = " + U("3", "2") + " − 0 = " + U("3", "2"), ""),
        ("!" + INT("3", "−2") + "f(x) dx = 2 + 2 + " + U("3", "2") + " = " + U("11", "2"), "Aditivnost integrala."),
    ],
    snov=INTS,
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def f_v1(x):
    return x ** 3 - 3 * x - 2


def h_v1(x):
    return (x + 1) ** 2 / x


def slika_h(X, Y):
    return (krivulja(X, Y, h_v1, 0.17, 6, MODRA) + krivulja(X, Y, h_v1, -6, -0.12, MODRA)
            + krivulja(X, Y, lambda x: x + 2, -6, 6, "#8a8a8a")
            + f'<circle cx="{X(2):.1f}" cy="{Y(4.5):.1f}" r="3.5" fill="white" stroke="{MODRA}" stroke-width="2"/>'
            + tocka(X, Y, -1, 0, "") + tocka(X, Y, 1, 4, ""))

v1 = naloga(
    1, ["funkcije", "diferencialni_racun"], 15,
    r"Dani sta funkciji \(f(x) = x^3 - 3x - 2\) in \(g(x) = x^2 - 2x\).<br>"
    r"a) Izračunaj ničli funkcije \(f\) in točki, v katerih ima \(f\) lokalna ekstrema. Nariši graf funkcije \(f\). (6 točk)<br>"
    r"b) Nariši graf racionalne funkcije \(h(x) = \dfrac{f(x)}{g(x)}\). (Stacionarnih točk ni treba računati.) (4 točke)<br>"
    r"c) Izračunaj ničli funkcije \(u(x) = g(|x - 1|) - 3\). (5 točk)",
    r"a) ničli \(-1\) (dvojna) in \(2\); maksimum \((-1, 0)\), minimum \((1, -4)\) &nbsp; b) pol \(x = 0\), poševna asimptota \(y = x + 2\), "
    r"luknja v \(\left(2, \frac{9}{2}\right)\) &nbsp; c) \(x = 4\), \(x = -2\)",
    [
        ("f(−1) = 0;  f(x) = (x + 1)(x<sup>2</sup> − x − 2) = (x + 1)<sup>2</sup>(x − 2)", "Ničlo uganemo med delitelji prostega člena; Hornerjev algoritem."),
        ("!ničli x = −1 (dvojna),  x = 2", ""),
        ("f '(x) = 3x<sup>2</sup> − 3 = 0  ⇒  x = ±1", ""),
        ("!maksimum (−1, 0),  minimum (1, −4)", ""),
        ("@slika", graf([(f_v1, MODRA)], (-2.2, 2.55), (-5, 7), tocke=[(-1, 0, ""), (2, 0, ""), (1, -4, ""), (0, -2, "")], sirina=240, visina=240)),
        ("h(x) = " + U("(x + 1)<sup>2</sup>(x − 2)", "x(x − 2)") + " = " + U("(x + 1)<sup>2</sup>", "x") + ",  x ≠ 2", "Okrajšamo skupni faktor; x = 2 ostane izven definicijskega območja."),
        ("!pol x = 0,  ničla x = −1 (dvojna),  luknja v točki (2, " + U("9", "2") + ")", "Pri x = 2 graf nima točke."),
        ("h(x) = x + 2 + " + U("1", "x") + ":  poševna asimptota y = x + 2", "Deljenje polinomov."),
        ("@slika", mreza((-6, 6), (-8, 10), slika_h, sirina=240)),
        ("t = |x − 1| ≥ 0:  t<sup>2</sup> − 2t − 3 = 0  ⇒  (t − 3)(t + 1) = 0", "Uvedemo novo spremenljivko."),
        ("t = 3  (t = −1 ni mogoče)", "Absolutna vrednost ni negativna."),
        ("!c) |x − 1| = 3  ⇒  x = 4 ali x = −2", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v2 = naloga(
    2, "zaporedja_vrste", 12,
    r"Dana je neskončna geometrijska vrsta \(1 + \dfrac{x + 1}{2x} + \left(\dfrac{x + 1}{2x}\right)^2 + \dots\), \(x \ne 0\).<br>"
    r"a) Izračunaj točno vsoto vrste za \(x = 1 + \sqrt{2}\). (4 točke)<br>"
    r"b) Za katero število \(x\) je vsota vrste enaka \(4\)? (3 točke)<br>"
    r"c) Za katere vrednosti \(x\) je vrsta konvergentna? (5 točk)",
    r"a) \(2 + \sqrt{2}\) &nbsp; b) \(x = 2\) &nbsp; c) \(x \in \left(-\infty, -\frac{1}{3}\right) \cup (1, \infty)\)",
    [
        ("a<sub>1</sub> = 1,  q = " + U("x + 1", "2x") + ",  1 − q = " + U("x − 1", "2x"), ""),
        ("s = " + U("1", "1 − q") + " = " + U("2x", "x − 1"), "Vsota neskončne geometrijske vrste."),
        ("x = 1 + " + K("2") + ":  s = " + U("2(1 + " + K("2") + ")", K("2")) + " = " + K("2") + " + 2", "Racionaliziramo imenovalec. Velja q ≈ 0,71, vrsta konvergira."),
        ("!a) s = 2 + " + K("2"), ""),
        (U("2x", "x − 1") + " = 4  ⇒  2x = 4x − 4", ""),
        ("!b) x = 2", "Preizkus: q = 3/4, |q| < 1."),
        ("|q| < 1:  −1 < " + U("x + 1", "2x") + " < 1", "Pogoj za konvergenco."),
        (U("x + 1", "2x") + " < 1  ⇔  " + U("1 − x", "2x") + " < 0  ⇔  x < 0 ali x > 1", "Neenačbo z ulomkom rešujemo s predznakom števca in imenovalca."),
        (U("x + 1", "2x") + " > −1  ⇔  " + U("3x + 1", "2x") + " > 0  ⇔  x < −" + U("1", "3") + " ali x > 0", ""),
        ("!c) x ∈ (−∞, −" + U("1", "3") + ") ∪ (1, ∞)", "Presek obeh rešitev."),
    ],
)


def vrtenina_v3():
    s = 18
    os_x = 30
    t = [f'<line x1="{os_x}" y1="10" x2="{os_x}" y2="120" stroke="currentColor" stroke-dasharray="6 3"/>',
         f'<rect x="{os_x + 2 * s}" y="40" width="{5 * s}" height="{4 * s}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="1.5"/>',
         napis(os_x + 2 * s - 8, 118, "B", 12), napis(os_x + 7 * s + 8, 118, "A", 12), napis(os_x + 7 * s + 8, 40, "D", 12), napis(os_x + 2 * s - 8, 40, "C", 12),
         napis(os_x + s, 128, "d = 2", 11), napis(os_x + 4.5 * s, 128, "a = 5", 11), napis(os_x + 7 * s + 24, 82, "b = 4", 11), napis(os_x - 10, 18, "o", 12)]
    return svg(220, 135, "".join(t), opis="Pravokotnik in os vrtenja")

v3 = naloga(
    3, ["diferencialni_racun", "geometrijski_liki_telesa", "vektorji_ravnina_prostor"], 13,
    r"V pravokotnikih iz naslednjih nalog označimo \(|AB| = a\) in \(|BC| = b\).<br>"
    r"a) Obseg pravokotnika meri \(600\ \mathrm{cm}\). Izračunaj stranici tako, da bo ploščina največja. (4 točke)<br>"
    r"b) Pravokotnik z \(a = 5\ \mathrm{cm}\) in \(b = 4\ \mathrm{cm}\) zavrtimo za \(360^\circ\) okoli osi zunaj pravokotnika, ki je vzporedna "
    r"stranici \(BC\) in od nje oddaljena \(d = 2\ \mathrm{cm}\). Izračunaj točno prostornino in površino vrtenine. (5 točk)<br>"
    r"c) Točka \(M\) leži na stranici \(BC\) tako, da je \(|BM| : |MC| = 1 : 2\). Presečišče daljice \(DM\) z diagonalo \(AC\) označimo s \(P\). "
    r"V kolikšnem razmerju deli točka \(P\) diagonalo \(AC\)? (4 točke)",
    r"a) \(a = b = 150\ \mathrm{cm}\) &nbsp; b) \(V = 180\pi\ \mathrm{cm^3}\), \(P = 162\pi\ \mathrm{cm^2}\) &nbsp; c) \(|AP| : |PC| = 3 : 2\)",
    [
        ("a + b = 300,  S(a) = a(300 − a) = 300a − a<sup>2</sup>", "Ploščino izrazimo z eno spremenljivko."),
        ("S '(a) = 300 − 2a = 0  ⇒  a = 150", "Ekstrem (ali teme parabole)."),
        ("!a) a = b = 150 cm (kvadrat)", ""),
        ("@slika", vrtenina_v3()),
        ("vrtenina: valj s polmerom r<sub>1</sub> = d + a = 7 brez valja s polmerom r<sub>2</sub> = d = 2, višina v = b = 4", "Pravokotnik opiše debelostenski obroč (cev)."),
        ("!V = π(r<sub>1</sub><sup>2</sup> − r<sub>2</sub><sup>2</sup>) v = π(49 − 4) · 4 = 180π cm<sup>3</sup>", ""),
        ("P = 2πr<sub>1</sub>v + 2πr<sub>2</sub>v + 2π(r<sub>1</sub><sup>2</sup> − r<sub>2</sub><sup>2</sup>) = 56π + 16π + 90π", "Zunanji in notranji plašč ter dva kolobarja."),
        ("!P = 162π cm<sup>2</sup>", ""),
        ("A(0, 0), B(a, 0), C(a, b), D(0, b), M(a, " + U("b", "3") + ")", "Pravokotnik postavimo v koordinatni sistem."),
        ("P = t(a, b) = D + s(M − D) = (sa, b − " + U("2bs", "3") + ")", "Točka P leži na obeh daljicah."),
        ("t = s,  t = 1 − " + U("2t", "3") + "  ⇒  t = " + U("3", "5"), ""),
        ("!c) |AP| : |PC| = 3 : 2", ""),
    ],
)

POLA2 = [v1, v2, v3]
