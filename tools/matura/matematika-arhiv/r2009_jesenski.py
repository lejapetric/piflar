# Jesenski rok 2009 (uradne pole RIC: m092-401-1-1, m092-402-1-1, m092-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2009, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


# ------------------------------------------------------------------ izpitna pola 1
def kompleksna1(X, Y):
    return (f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(2):.1f}" y2="{Y(6):.1f}" stroke="{MODRA}" stroke-width="1.5"/>'
            + tocka(X, Y, 2, 6, "z = 2 + 6i"))

n1 = naloga(
    1, "stevilske_mnozice", 6,
    r"Zapiši kompleksno število \(z = (2 + i)(2 + 2i)\) v obliki \(a + bi\), \(a, b \in \mathbb{R}\). Število nariši v kompleksni ravnini in "
    r"izračunaj \(|z|\). Rezultat delno koreni.",
    r"\(z = 2 + 6i\), \(|z| = 2\sqrt{10}\)",
    [
        ("z = 4 + 4i + 2i + 2i<sup>2</sup>", "Množimo vsak člen z vsakim."),
        ("!z = 2 + 6i", "i² = −1."),
        ("@slika", mreza((-1, 4), (-1, 7), kompleksna1, sirina=160)),
        ("!|z| = " + K("2<sup>2</sup> + 6<sup>2</sup>") + " = " + K("40") + " = 2" + K("10"), "Absolutna vrednost; delno korenjenje √40 = √4 · √10."),
    ],
)

n2 = naloga(
    2, "funkcije", 6,
    r"Reši enačbo \(\log(x + 21) + \log x = 2\).",
    r"\(x = 4\)",
    [
        ("log (x(x + 21)) = 2", "Vsota logaritmov je logaritem produkta."),
        ("x<sup>2</sup> + 21x = 100", "log y = 2 ⇔ y = 10²."),
        ("(x + 25)(x − 4) = 0  ⇒  x = −25 ali x = 4", ""),
        ("!x = 4", "x = −25 ne ustreza, ker mora biti x > 0."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n3 = naloga(
    3, "algebrski_izrazi_enacbe_neenacbe", 7,
    r"Dan je polinom \(p(x) = 4x^3 - 4x^2 + ax + 6\). Določi realno število \(a\) tako, da bo \(2\) ničla polinoma. Nato izračunaj še "
    r"preostali ničli.",
    r"\(a = -11\); ničli \(\frac{1}{2}\) in \(-\frac{3}{2}\)",
    [
        ("p(2) = 32 − 16 + 2a + 6 = 22 + 2a = 0", "Število je ničla, če je vrednost polinoma v njem 0."),
        ("!a = −11", ""),
        ("p(x) : (x − 2) = 4x<sup>2</sup> + 4x − 3", "Hornerjev algoritem."),
        ("4x<sup>2</sup> + 4x − 3 = (2x − 1)(2x + 3) = 0", ""),
        ("!x = " + U("1", "2") + ",  x = −" + U("3", "2"), ""),
    ],
    snov=FUN + "polinomska_razlaga.html",
)


def premica4(X, Y):
    return (krivulja(X, Y, lambda x: 3 * x - 3, -0.6, 2.6, MODRA) + tocka(X, Y, 2, 3, "A", dx=-14)
            + f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(2):.1f}" y2="{Y(3):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>')

n4 = naloga(
    4, "pravokotni_koordinatni_sistem_ravnina", 7,
    r"V koordinatnem sistemu nariši premico \(y = 3x - 3\). Na premici označi točko \(A\) z ordinato \(3\). Zapiši absciso točke \(A\) in "
    r"izračunaj točno razdaljo točke \(A\) od izhodišča.",
    r"\(A(2, 3)\), \(|OA| = \sqrt{13}\)",
    [
        ("@slika", mreza((-2, 4), (-5, 5), premica4, sirina=200)),
        ("3x − 3 = 3  ⇒  x = 2", "Točka leži na premici, zato zadošča njeni enačbi."),
        ("!A(2, 3)", ""),
        ("!|OA| = " + K("2<sup>2</sup> + 3<sup>2</sup>") + " = " + K("13"), "Razdalja med točkama."),
    ],
)

n5 = naloga(
    5, "geometrijski_liki_telesa", 6,
    r"V enakokrakem trikotniku meri višina na osnovnico \(v_c = 6\ \mathrm{cm}\), kot \(\alpha\) ob osnovnici pa \(48^\circ\). Izračunaj "
    r"osnovnico, krak in ploščino trikotnika. Rezultate zaokroži na tri mesta.",
    r"\(c \approx 10{,}8\ \mathrm{cm}\), \(a \approx 8{,}07\ \mathrm{cm}\), \(S \approx 32{,}4\ \mathrm{cm^2}\)",
    [
        ("tan α = " + U("v<sub>c</sub>", "c/2") + "  ⇒  " + U("c", "2") + " = " + U("6", "tan 48°") + " ≈ 5,402 cm", "Višina razdeli trikotnik na dva pravokotna."),
        ("!c ≈ 10,8 cm", ""),
        ("!a = " + U("v<sub>c</sub>", "sin α") + " = " + U("6", "sin 48°") + " ≈ 8,07 cm", ""),
        ("!S = " + U("c · v<sub>c</sub>", "2") + " ≈ 32,4 cm<sup>2</sup>", "Računamo z nezaokroženo vrednostjo c."),
    ],
)

n6 = naloga(
    6, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Poenostavi izraz \(\dfrac{2}{x - 3} - \dfrac{1}{x + 3} - 6(x^2 - 9)^{-1}\); \(x \ne \pm 3\).",
    r"\(\frac{1}{x - 3}\)",
    [
        ("6(x<sup>2</sup> − 9)<sup>−1</sup> = " + U("6", "(x − 3)(x + 3)"), "Negativni eksponent; razlika kvadratov."),
        (U("2(x + 3) − (x − 3) − 6", "(x − 3)(x + 3)"), "Skupni imenovalec."),
        (U("x + 3", "(x − 3)(x + 3)"), ""),
        ("!" + U("1", "x − 3"), "Okrajšamo z x + 3."),
    ],
)


def sin7(X, Y):
    t = [krivulja(X, Y, lambda x: 2 * math.sin(x) - math.sqrt(3), -0.3, 2 * math.pi + 0.3, MODRA)]
    for k, s in ((1, "π"), (2, "2π")):
        t.append(f'<text x="{X(k * math.pi):.1f}" y="{Y(0) - 5:.1f}" font-size="10" text-anchor="middle" fill="currentColor">{s}</text>')
    for j in (-3, 1):
        t.append(f'<text x="{X(0) - 4:.1f}" y="{Y(j) + 3.5:.1f}" font-size="10" text-anchor="end" fill="currentColor">{str(j).replace("-", "−")}</text>')
    t.append(tocka(X, Y, math.pi / 3, 0) + tocka(X, Y, 2 * math.pi / 3, 0))
    return "".join(t)

n7 = naloga(
    7, "funkcije", 8,
    r"Izračunaj ničle funkcije \(f(x) = 2\sin x - \sqrt{3}\) in nariši njen graf vsaj na intervalu \([0, 2\pi]\).",
    r"\(x = \frac{\pi}{3} + 2k\pi\), \(x = \frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("sin x = " + U(K("3"), "2"), ""),
        ("!x<sub>1</sub> = " + U("π", "3") + " + 2kπ,  x<sub>2</sub> = " + U("2π", "3") + " + 2kπ, k ∈ ℤ", "Sinus je pozitiven v 1. in 2. kvadrantu."),
        ("graf y = sin x raztegnemo s faktorjem 2 in premaknemo za " + K("3") + " navzdol", "Zaloga vrednosti je [−2 − √3, 2 − √3]."),
        ("@slika", mreza((-1, 7), (-4, 1), sin7, sirina=320, oznake=False)),
    ],
    snov=FUN + "kotne_razlaga.html",
)


def kvadrat8():
    s, x0, y0 = 120, 30, 140
    A, B, C, D = (x0, y0), (x0 + s, y0), (x0 + s, y0 - s), (x0, y0 - s)
    M = (x0 + s, y0 - s / 2)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{M[0]}" y2="{M[1]}" stroke="{MODRA}" stroke-dasharray="4 3"/>',
         f'<circle cx="{M[0]}" cy="{M[1]}" r="3" fill="currentColor"/>']
    for P, s_, dx, dy in ((A, "A", -14, 12), (B, "B", 4, 12), (C, "C", 4, -2), (D, "D", -14, -2), (M, "M", 6, 4)):
        t.append(f'<text x="{P[0] + dx}" y="{P[1] + dy}" font-size="13" fill="currentColor">{s_}</text>')
    t.append(f'<text x="{x0 + s / 2}" y="{y0 + 15}" font-size="12" text-anchor="middle" fill="currentColor">a</text>')
    return svg(200, 160, "".join(t), opis="Kvadrat ABCD z razpoloviščem M stranice BC")

n8 = naloga(
    8, "vektorji_ravnina_prostor", 5,
    r"V kvadratu \(ABCD\) s stranico \(a\) je točka \(M\) razpolovišče stranice \(BC\). Izračunaj skalarne produkte "
    r"\(\overrightarrow{AB} \cdot \overrightarrow{AD}\), \(\overrightarrow{AD} \cdot \overrightarrow{AD}\), \(\overrightarrow{AB} \cdot \overrightarrow{DC}\), "
    r"\(\overrightarrow{AC} \cdot \overrightarrow{BD}\) in \(\overrightarrow{AD} \cdot \overrightarrow{AM}\)." + kvadrat8(),
    r"\(0\), \(a^2\), \(a^2\), \(0\), \(\frac{a^2}{2}\)",
    [
        ("postavimo A(0, 0), B(a, 0), C(a, a), D(0, a), M(a, " + U("a", "2") + ")", "Koordinatni sistem poenostavi računanje."),
        ("!" + V("AB") + " · " + V("AD") + " = 0", "Stranici kvadrata sta pravokotni."),
        ("!" + V("AD") + " · " + V("AD") + " = |" + V("AD") + "|<sup>2</sup> = a<sup>2</sup>", ""),
        ("!" + V("AB") + " · " + V("DC") + " = a<sup>2</sup>", "Vektorja sta enaka (enako usmerjena)."),
        ("!" + V("AC") + " · " + V("BD") + " = (a, a) · (−a, a) = 0", "Diagonali kvadrata sta pravokotni."),
        ("!" + V("AD") + " · " + V("AM") + " = (0, a) · (a, " + U("a", "2") + ") = " + U("a<sup>2</sup>", "2"), "Skalarni produkt po komponentah."),
    ],
)

n9 = naloga(
    9, ["funkcije", "diferencialni_racun"], 8,
    r"Izračunaj presečišči parabole \(y = x^2 + x - 4\) in premice \(y = 2x + 2\). Izračunaj še kot, pod katerim se sekata v prvem kvadrantu. "
    r"Rezultat zaokroži na stotinko stopinje.",
    r"\(T_1(3, 8)\), \(T_2(-2, -2)\), \(\varphi \approx 18{,}43^\circ\)",
    [
        ("x<sup>2</sup> + x − 4 = 2x + 2  ⇒  x<sup>2</sup> − x − 6 = 0", ""),
        ("(x − 3)(x + 2) = 0", ""),
        ("!T<sub>1</sub>(3, 8),  T<sub>2</sub>(−2, −2)", ""),
        ("v T<sub>1</sub>: k<sub>1</sub> = 2,  k<sub>2</sub> = y '(3) = 2 · 3 + 1 = 7", "Kot med krivuljama je kot med tangentama; smerni koeficient tangente je odvod."),
        ("tan φ = |" + U("7 − 2", "1 + 2 · 7") + "| = " + U("1", "3"), "Kot med premicama."),
        ("!φ ≈ 18,43°", ""),
    ],
)


def paraboli10(X, Y):
    xs = [-2 + 4 * i / 80 for i in range(81)]
    pot = " ".join(f"{X(x):.1f},{Y(4 - x * x):.1f}" for x in xs) + " " + " ".join(f"{X(x):.1f},{Y(x * x - 4):.1f}" for x in reversed(xs))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.18"/>'
            + krivulja(X, Y, lambda x: 4 - x * x, -3, 3, MODRA) + krivulja(X, Y, lambda x: x * x - 4, -3, 3, RDECA))

n10 = naloga(
    10, ["funkcije", "integralski_racun"], 8,
    r"V koordinatni sistem nariši grafa funkcij \(f(x) = -x^2 + 4\) in \(g(x) = x^2 - 4\). Izračunaj ploščino lika, ki ga omejujeta grafa.",
    r"\(S = \frac{64}{3}\)",
    [
        ("@slika", mreza((-4, 4), (-6, 6), paraboli10, sirina=220)),
        ("−x<sup>2</sup> + 4 = x<sup>2</sup> − 4  ⇒  x = ±2", "Meji integrala sta abscisi presečišč."),
        ("S = " + INT("2", "−2") + "((−x<sup>2</sup> + 4) − (x<sup>2</sup> − 4)) dx = " + INT("2", "−2") + "(8 − 2x<sup>2</sup>) dx", "Ploščina med krivuljama: zgornja minus spodnja."),
        ("= (8x − " + U("2x<sup>3</sup>", "3") + ")" + MEJA("2", "−2") + " = 2 (16 − " + U("16", "3") + ")", ""),
        ("!S = " + U("64", "3"), ""),
    ],
    snov=INTS,
)

n11 = naloga(
    11, "zaporedja_vrste", 8,
    r"Izračunaj prve tri člene zaporedja s splošnim členom \(a_n = \dfrac{n + 2}{3n}\). Kateri člen je enak \(0{,}335\)? Dokaži, da je "
    r"zaporedje padajoče.",
    r"\(a_1 = 1\), \(a_2 = \frac{2}{3}\), \(a_3 = \frac{5}{9}\); \(a_{400}\)",
    [
        ("!a<sub>1</sub> = 1,  a<sub>2</sub> = " + U("4", "6") + " = " + U("2", "3") + ",  a<sub>3</sub> = " + U("5", "9"), ""),
        (U("n + 2", "3n") + " = 0,335  ⇒  n + 2 = 1,005n  ⇒  0,005n = 2", ""),
        ("!n = 400:  a<sub>400</sub> = 0,335", ""),
        ("a<sub>n</sub> − a<sub>n+1</sub> = " + U("n + 2", "3n") + " − " + U("n + 3", "3(n + 1)") + " = " + U("(n + 2)(n + 1) − n(n + 3)", "3n(n + 1)"), "Zaporedje pada, če je a_n − a_{n+1} > 0."),
        ("!= " + U("2", "3n(n + 1)") + " > 0, zaporedje je padajoče", ""),
    ],
)

n12 = naloga(
    12, ["kombinatorika", "verjetnostni_racun"], 5,
    r"Učiteljica bo med \(10\) dijakov (med njimi so Ana, Bor in Cene) naključno razdelila teste dveh vrst: \(5\) dijakov bo pisalo test "
    r"\(A\), \(5\) pa test \(B\). Kolikšna je verjetnost, da bodo vsi trije (Ana, Bor in Cene) pisali test \(A\)? Kolikšna je verjetnost, "
    r"da bo vsaj eden od njih pisal test \(B\)?",
    r"\(\frac{1}{12}\); \(\frac{11}{12}\)",
    [
        ("n = " + BINOM("10", "5") + " = 252", "Izberemo petorico, ki piše test A."),
        ("m = " + BINOM("7", "2") + " = 21", "Trojica je v petorici, izbrati moramo še 2 izmed ostalih 7."),
        ("!P(vsi trije A) = " + U("21", "252") + " = " + U("1", "12"), ""),
        ("!P(vsaj eden B) = 1 − " + U("1", "12") + " = " + U("11", "12"), "Nasprotni dogodek."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def trapez_v1():
    s, x0, y0 = 22, 20, 120
    A, B = (x0, y0), (x0 + 9 * s, y0)
    D, C = (x0 + 3 * s, y0 - 4 * s), (x0 + 6 * s, y0 - 4 * s)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="{D[0]}" y1="{D[1]}" x2="{D[0]}" y2="{y0}" stroke="currentColor" stroke-opacity="0.6"/>']
    for P, s_, dx, dy in ((A, "A", -12, 12), (B, "B", 4, 12), (C, "C", 4, -4), (D, "D", -12, -4)):
        t.append(f'<text x="{P[0] + dx}" y="{P[1] + dy}" font-size="13" fill="currentColor">{s_}</text>')
    t.append(f'<text x="{D[0] + 4}" y="{y0 - 40}" font-size="12" fill="currentColor">v</text>')
    t.append(f'<text x="{(A[0] + B[0]) / 2}" y="{y0 + 15}" font-size="12" text-anchor="middle" fill="currentColor">a = 9</text>')
    t.append(f'<text x="{(C[0] + D[0]) / 2}" y="{D[1] - 6}" font-size="12" text-anchor="middle" fill="currentColor">c = 3</text>')
    return svg(250, 140, "".join(t), opis="Enakokraki trapez ABCD z diagonalama")

v1 = naloga(
    1, "geometrijski_liki_telesa", 14,
    r"V enakokrakem trapezu \(ABCD\) merita osnovnici \(a = |AB| = 9\) in \(c = |CD| = 3\), diagonali pa \(e = f = 2\sqrt{13}\).<br>"
    r"a) Izračunaj točni višino \(v\) in krak \(b\) trapeza. (5 točk)<br>"
    r"b) Izračunaj kot med diagonalama (na stotinko stopinje). (3 točke)<br>"
    r"c) Trapez zavrtimo okoli krajše osnovnice \(c\). Izračunaj točni površino in prostornino nastalega rotacijskega telesa. (6 točk)",
    r"a) \(v = 4\), \(b = 5\) &nbsp; b) \(67{,}38^\circ\) (oz. \(112{,}62^\circ\)) &nbsp; c) \(P = 112\pi\), \(V = 112\pi\)",
    [
        ("@slika", trapez_v1()),
        ("h = " + U("a − c", "2") + " = 3", "Pravokotna projekcija kraka na daljšo osnovnico."),
        ("projekcija diagonale na AB: c + h = 6", ""),
        ("v<sup>2</sup> = e<sup>2</sup> − 6<sup>2</sup> = 52 − 36 = 16", "Pitagorov izrek."),
        ("!v = 4", ""),
        ("!b = " + K("h<sup>2</sup> + v<sup>2</sup>") + " = " + K("9 + 16") + " = 5", ""),
        ("tan φ = " + U("v", "c + h") + " = " + U("4", "6") + "  ⇒  φ ≈ 33,69°", "φ je kot med diagonalo in osnovnico AB."),
        ("!b) ω = 2φ ≈ 67,38°  (sokot 112,62°)", "Diagonali in osnovnica tvorijo enakokraki trikotnik; zunanji kot je vsota notranjih nepriležnih."),
        ("telo: valj (r = v = 4, višina a = 9), iz katerega izdolbemo dva stožca (r = 4, višina h = 3, plašč s = b = 5)", "Os vrtenja je nosilka stranice CD."),
        ("P = 2πra + 2 · πrs = 72π + 40π", "Plašč valja in plašča obeh stožcev (osnovnih ploskev ni)."),
        ("!P = 112π", ""),
        ("V = πr<sup>2</sup>a − 2 · " + U("πr<sup>2</sup>h", "3") + " = 144π − 32π", "Prostornina valja minus prostornini stožcev."),
        ("!V = 112π", ""),
    ],
)


def g_v2(x):
    return 3 ** (x + 2) - 2

v2 = naloga(
    2, "funkcije", 13,
    r"Dana je funkcija \(f(x) = 3^x\).<br>"
    r"a) Reši enačbo \(f(2x) + 27 = 4 f(x + 1)\). (4 točke)<br>"
    r"b) Naj bo \(g(x) = f(x + 2) - 2\). Izračunaj presečišči grafa funkcije \(g\) s koordinatnima osema in nariši graf. (4 točke)<br>"
    r"c) Naj bo \(f^{-1}\) inverzna funkcija funkcije \(f\). Reši enačbo \(2 f^{-1}(-x) - f^{-1}(x + 6) = 1\). (5 točk)",
    r"a) \(x_1 = 1\), \(x_2 = 2\) &nbsp; b) \((\log_3 2 - 2, 0)\), \((0, 7)\) &nbsp; c) \(x = -3\)",
    [
        ("3<sup>2x</sup> + 27 = 12 · 3<sup>x</sup>", "f(x + 1) = 3 · 3ˣ."),
        ("t = 3<sup>x</sup>:  t<sup>2</sup> − 12t + 27 = 0  ⇒  (t − 3)(t − 9) = 0", "Uvedemo novo neznanko."),
        ("!a) 3<sup>x</sup> = 3 ⇒ x = 1;  3<sup>x</sup> = 9 ⇒ x = 2", ""),
        ("g(0) = 9 − 2 = 7", ""),
        ("3<sup>x + 2</sup> = 2  ⇒  x + 2 = log<sub>3</sub> 2", "Logaritem kot rešitev eksponentne enačbe."),
        ("!b) N(log<sub>3</sub> 2 − 2, 0) ≈ (−1,37; 0),  P(0, 7);  asimptota y = −2", ""),
        ("@slika", graf([(g_v2, MODRA), (lambda x: -2, RDECA)], (-5, 2), (-3, 9), tocke=[(math.log(2, 3) - 2, 0, ""), (0, 7, "")], sirina=240, visina=280)),
        ("f<sup>−1</sup>(x) = log<sub>3</sub> x", "Inverzna funkcija eksponentne je logaritemska."),
        ("2 log<sub>3</sub>(−x) − log<sub>3</sub>(x + 6) = 1  ⇒  log<sub>3</sub> " + U("x<sup>2</sup>", "x + 6") + " = 1", "Pravila za računanje z logaritmi; pogoj −6 < x < 0."),
        ("x<sup>2</sup> = 3x + 18  ⇒  (x − 6)(x + 3) = 0", ""),
        ("!c) x = −3", "x = 6 ne ustreza pogoju −x > 0."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)


def slika_v3(X, Y):
    xs = [3 * i / 60 for i in range(61)]
    pot = f"{X(0):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(-(x - 3) ** 2):.1f}" for x in xs)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>'
            + krivulja(X, Y, lambda x: -(x - 3) ** 2, -0.3, 6, MODRA)
            + parametricna(X, Y, lambda t: 3 + 5 * math.cos(t), lambda t: -5 + 5 * math.sin(t), 0, 2 * math.pi, RDECA)
            + tocka(X, Y, 0, -9, "A") + tocka(X, Y, 3, 0, "B", dy=-8))

v3 = naloga(
    3, ["funkcije", "diferencialni_racun", "integralski_racun", "stoznice"], 13,
    r"V koordinatnem sistemu sta dani točki \(A(0, -9)\) in \(B(3, 0)\).<br>"
    r"a) Določi koeficienta \(a\) in \(b\) tako, da bo graf polinoma \(p(x) = -x^3 + ax^2 + b\) potekal skozi točki \(A\) in \(B\). "
    r"Izračunaj stacionarni točki polinoma. (5 točk)<br>"
    r"b) Zapiši kvadratno funkcijo, katere graf poteka skozi \(A\) in se v točki \(B\) dotika osi \(x\). Izračunaj ploščino lika, ki ga "
    r"omejujejo graf kvadratne funkcije in obe koordinatni osi. (5 točk)<br>"
    r"c) Zapiši enačbo krožnice, ki poteka skozi točko \(A\) in se v točki \(B\) dotika osi \(x\). (3 točke)",
    r"a) \(a = 4\), \(b = -9\); \((0, -9)\), \(\left(\frac{8}{3}, \frac{13}{27}\right)\) &nbsp; b) \(y = -(x - 3)^2\), \(S = 9\) &nbsp; "
    r"c) \((x - 3)^2 + (y + 5)^2 = 25\)",
    [
        ("p(0) = b = −9;  p(3) = −27 + 9a − 9 = 0", "Točki ležita na grafu."),
        ("!a = 4,  b = −9", ""),
        ("p '(x) = −3x<sup>2</sup> + 8x = −x(3x − 8) = 0", ""),
        ("!T<sub>1</sub>(0, −9),  T<sub>2</sub>(" + U("8", "3") + ", " + U("13", "27") + ")", "p(8/3) = −512/27 + 768/27 − 243/27."),
        ("y = k(x − 3)<sup>2</sup>,  −9 = 9k  ⇒  k = −1", "Dotik osi x v B: dvojna ničla x = 3."),
        ("!f(x) = −(x − 3)<sup>2</sup>", ""),
        ("S = " + INT("3", "0") + "(x − 3)<sup>2</sup> dx = " + U("(x − 3)<sup>3</sup>", "3") + MEJA("3", "0") + " = 0 − (−9)", "Lik leži pod osjo x, zato integriramo −f."),
        ("!S = 9", ""),
        ("središče S(3, q), polmer r = |q|", "Dotik v B: središče leži na pravokotnici na os x skozi B."),
        ("|SA| = r:  9 + (−9 − q)<sup>2</sup> = q<sup>2</sup>  ⇒  90 + 18q = 0  ⇒  q = −5", ""),
        ("!c) (x − 3)<sup>2</sup> + (y + 5)<sup>2</sup> = 25", ""),
        ("@slika", mreza((-2, 9), (-11, 2), slika_v3, sirina=240)),
    ],
)

POLA2 = [v1, v2, v3]
