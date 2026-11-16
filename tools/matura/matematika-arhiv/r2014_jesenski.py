# Jesenski rok 2014 (uradne pole RIC: m142-401-1-1, m142-402-1-1, m142-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2014, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Števec nekega ulomka je za \(3\) manjši od imenovalca. Če števec pomnožimo z \(2\), imenovalec pa povečamo za \(5\), dobimo ulomek, "
    r"ki je enak \(\frac{4}{3}\). Poišči prvotni ulomek.",
    r"\(\frac{16}{19}\)",
    [
        ("ulomek " + U("n − 3", "n"), "Imenovalec označimo z n."),
        (U("2(n − 3)", "n + 5") + " = " + U("4", "3") + "  ⇒  6n − 18 = 4n + 20", "Ulomka sta enaka: navzkrižno množimo."),
        ("n = 19", ""),
        ("!prvotni ulomek je " + U("16", "19"), ""),
    ],
)

def trikotnik2(X, Y):
    pts = [(4, -1, "A"), (-2, 3, "B"), (4, 3, "C")]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y, _ in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>'
            + "".join(tocka(X, Y, x, y, n) for x, y, n in pts))

n2 = naloga(
    2, ["pravokotni_koordinatni_sistem_ravnina", "geometrijski_liki_telesa"], 8,
    r"V koordinatni sistem nariši točke \(A(4, -1)\), \(B(-2, 3)\) in \(C(4, 3)\). Natančno izračunaj obseg in ploščino trikotnika \(ABC\). "
    r"Na stotinko stopinje izračunaj kot \(\beta = \angle ABC\).",
    r"\(o = 10 + 2\sqrt{13}\), \(S = 12\), \(\beta \approx 33{,}69^\circ\)",
    [
        ("@slika", mreza((-3, 5), (-2, 4), trikotnik2, sirina=260)),
        ("|AC| = 4,  |BC| = 6,  ∢ACB = 90°", "AC je navpična, BC vodoravna daljica."),
        ("|AB| = " + K("6<sup>2</sup> + 4<sup>2</sup>") + " = " + K("52") + " = 2" + K("13"), "Razdalja med točkama (Pitagorov izrek)."),
        ("!o = 10 + 2" + K("13") + ",  S = " + U("4 · 6", "2") + " = 12", "Ploščina pravokotnega trikotnika je polovica produkta katet."),
        ("tan β = " + U("|AC|", "|BC|") + " = " + U("4", "6"), "Kotne funkcije v pravokotnem trikotniku."),
        ("!β ≈ 33,69°", ""),
    ],
)

n3 = naloga(
    3, "funkcije", 7,
    r"Dana je linearna funkcija \(f(x) = (2m + 1)x - 3\).<br>"
    r"3.1. Za \(m = \frac{1}{2}\) izračunaj ničlo funkcije in presečišče grafa z ordinatno osjo. (4 točke)<br>"
    r"3.2. Izračunaj \(m\), da bo graf funkcije vzporeden premici \(2x + y - 5 = 0\). (3 točke)",
    r"3.1. \(x = \frac{3}{2}\), \((0, -3)\) &nbsp; 3.2. \(m = -\frac{3}{2}\)",
    [
        ("f(x) = 2x − 3", "Vstavimo m = 1/2."),
        ("!ničla x = " + U("3", "2") + ",  presečišče z osjo y: (0, −3)", "f(x) = 0 oziroma začetna vrednost f(0)."),
        ("y = −2x + 5  ⇒  k = −2", "Premico zapišemo v eksplicitni obliki."),
        ("2m + 1 = −2", "Vzporedni premici imata enaka smerna koeficienta."),
        ("!m = −" + U("3", "2"), ""),
    ],
    snov=FUN + "linearna_razlaga.html",
)

def f4(x):
    if x < -3 or x > 2:
        return 0
    if x <= -1:
        return x + 3
    if x <= 1:
        return 2
    return -2 * x + 4

n4 = naloga(
    4, "funkcije", 6,
    r"Na sliki je graf odsekoma linearne funkcije \(f\)."
    + graf([(f4, MODRA)], (-5, 4), (-2, 3), tocke=[(-3, 0, ""), (-1, 2, ""), (1, 2, ""), (2, 0, "")], sirina=340, visina=200)
    + r"4.1. Izračunaj ploščino trapeza med grafom funkcije in abscisno osjo. (2 točki)<br>"
      r"4.2. Dopolni predpis: \(f(x) = 0\) za \(x < -3\); \(f(x) = \ \_\_\_\) za \(-3 \le x \le -1\); \(f(x) = \ \_\_\_\) za \(\_\_\_\); "
      r"\(f(x) = -2x + 4\) za \(1 \le x \le 2\); \(f(x) = \ \_\_\_\) za \(x > 2\). (4 točke)",
    r"4.1. \(7\) &nbsp; 4.2. \(x + 3\); \(2\) za \(-1 < x < 1\); \(0\)",
    [
        ("!4.1  S = " + U("5 + 2", "2") + " · 2 = 7", "Osnovnici trapeza merita 5 (od −3 do 2) in 2 (od −1 do 1), višina je 2."),
        ("!−3 ≤ x ≤ −1:  f(x) = x + 3", "Premica skozi (−3, 0) in (−1, 2) ima smerni koeficient 1."),
        ("!−1 < x < 1:  f(x) = 2", "Vodoravni del grafa."),
        ("!x > 2:  f(x) = 0", ""),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n5 = naloga(
    5, "funkcije", 5,
    r"Nalogo reši brez računala. Reši enačbo \(\log_2 (3 - x) + \log_2 (-3 - x) = 4\).",
    r"\(x = -5\)",
    [
        ("pogoja: 3 − x > 0 in −3 − x > 0  ⇒  x < −3", "Argument logaritma mora biti pozitiven."),
        ("log<sub>2</sub>((3 − x)(−3 − x)) = 4  ⇒  x<sup>2</sup> − 9 = 16", "Vsota logaritmov je logaritem produkta; definicija logaritma."),
        ("x = ±5", ""),
        ("!x = −5", "x = 5 ne ustreza pogoju x < −3."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n6 = naloga(
    6, "stoznice", 6,
    r"Izračunaj presečišči elipse \(3x^2 + y^2 - 28 = 0\) in parabole \(y^2 = 8x\).",
    r"\((2, 4)\) in \((2, -4)\)",
    [
        ("3x<sup>2</sup> + 8x − 28 = 0", "y² iz enačbe parabole vstavimo v enačbo elipse."),
        ("x = " + U("−8 ± " + K("64 + 336"), "6") + " = " + U("−8 ± 20", "6"), "Rešitve kvadratne enačbe."),
        ("x = 2  (x = −" + U("14", "3") + " ne pride v poštev)", "Pri paraboli y² = 8x mora biti x ≥ 0."),
        ("!y<sup>2</sup> = 16:  presečišči (2, 4) in (2, −4)", ""),
    ],
)

n7 = naloga(
    7, "stevilske_mnozice", 6,
    r"Izračunaj realno število \(x\), za katero je kompleksno število \(z = (3 + i)^2 + i^{15} + xi\) realno.",
    r"\(x = -5\)",
    [
        ("(3 + i)<sup>2</sup> = 9 + 6i + i<sup>2</sup> = 8 + 6i", "Kvadrat dvočlenika, i² = −1."),
        ("i<sup>15</sup> = i<sup>12</sup> · i<sup>3</sup> = −i", "Potence števila i se ponavljajo s periodo 4."),
        ("z = 8 + (5 + x)i", ""),
        ("!5 + x = 0  ⇒  x = −5", "Število je realno, ko je imaginarni del 0."),
    ],
)

n8 = naloga(
    8, "zaporedja_vrste", 7,
    r"Števila \(\frac{3}{4}\), \(x\), \(y\) so prvi trije členi aritmetičnega zaporedja, njihova vsota je \(\frac{9}{2}\). Izračunaj \(x\), \(y\) in "
    r"četrti člen \(a_4\) ter zapiši splošni člen \(a_n\).",
    r"\(x = \frac{3}{2}\), \(y = \frac{9}{4}\), \(a_4 = 3\), \(a_n = \frac{3n}{4}\)",
    [
        (U("3", "4") + " + x + y = 3x = " + U("9", "2"), "Srednji člen je aritmetična sredina sosednjih, zato je vsota treh členov 3x."),
        ("!x = " + U("3", "2") + ",  d = " + U("3", "4") + ",  y = " + U("9", "4"), "Diferenca aritmetičnega zaporedja."),
        ("!a<sub>4</sub> = " + U("9", "4") + " + " + U("3", "4") + " = 3", ""),
        ("!a<sub>n</sub> = " + U("3", "4") + " + (n − 1) · " + U("3", "4") + " = " + U("3n", "4"), "Splošni člen aritmetičnega zaporedja."),
    ],
)

n9 = naloga(
    9, "algebrski_izrazi_enacbe_neenacbe", 8,
    r"Število \(3\) je dvakratna ničla polinoma \(p(x) = 2x^4 - 7x^3 - 10x^2 + ax + 18\). Izračunaj koeficient \(a\) in preostali ničli polinoma.",
    r"\(a = 33\), \(x_3 = -2\), \(x_4 = -\frac{1}{2}\)",
    [
        ("p(3) = 162 − 189 − 90 + 3a + 18 = 3a − 99 = 0", "Ničla polinoma: p(3) = 0."),
        ("!a = 33", ""),
        ("p(x) : (x − 3)<sup>2</sup> = p(x) : (x<sup>2</sup> − 6x + 9) = 2x<sup>2</sup> + 5x + 2", "Deljenje polinomov (ali dvakrat Hornerjev algoritem)."),
        ("2x<sup>2</sup> + 5x + 2 = (2x + 1)(x + 2)", ""),
        ("!x<sub>3</sub> = −2,  x<sub>4</sub> = −" + U("1", "2"), ""),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

n10 = naloga(
    10, "vektorji_ravnina_prostor", 8,
    r"Vektorja \(\vec{a} = (x, -2, 4)\) in \(\vec{b} = (2, y, 1)\) sta pravokotna, dolžina vektorja \(\vec{a}\) je \(6\). Izračunaj \(x\) in \(y\).",
    r"\(x = 4, y = 6\) ali \(x = -4, y = -2\)",
    [
        ("|" + V("a") + "|<sup>2</sup> = x<sup>2</sup> + 4 + 16 = 36  ⇒  x = ±4", "Dolžina vektorja."),
        (V("a") + " · " + V("b") + " = 2x − 2y + 4 = 0  ⇒  y = x + 2", "Pravokotna vektorja imata skalarni produkt 0."),
        ("!x = 4, y = 6  ali  x = −4, y = −2", ""),
    ],
)

n11 = naloga(
    11, ["kombinatorika", "verjetnostni_racun"], 5,
    r"V razredu je \(12\) deklet in \(8\) fantov. Izžrebali bodo tričlanski odbor za pripravo maturantskega plesa. Izračunaj verjetnost, da "
    r"bosta v odboru zastopana oba spola.",
    r"\(\frac{72}{95}\)",
    [
        (BINOM("20", "3") + " = 1140", "Vseh možnih odborov (kombinacije)."),
        ("P(en spol) = " + U(BINOM("12", "3") + " + " + BINOM("8", "3"), "1140") + " = " + U("220 + 56", "1140") + " = " + U("276", "1140"), "Nasprotni dogodek: sama dekleta ali sami fantje."),
        ("!P = 1 − " + U("276", "1140") + " = " + U("864", "1140") + " = " + U("72", "95"), ""),
    ],
)

n12 = naloga(
    12, "diferencialni_racun", 8,
    r"Tangenta na graf funkcije \(f(x) = \ln (x + 3) + x^2\) je vzporedna premici \(y = -3x + 2\). Takšni tangenti sta dve. Natančno izračunaj "
    r"koordinate dotikališč \(D_1\) in \(D_2\).",
    r"\(D_1(-2, 4)\), \(D_2\left(-\frac{5}{2}, \frac{25}{4} - \ln 2\right)\)",
    [
        ("f '(x) = " + U("1", "x + 3") + " + 2x", "Odvod logaritma (verižno pravilo) in potence."),
        (U("1", "x + 3") + " + 2x = −3", "Vzporedna premica ima enak smerni koeficient; tangenta ima smerni koeficient f'(x₀)."),
        ("1 + 2x(x + 3) = −3(x + 3)  ⇒  2x<sup>2</sup> + 9x + 10 = 0", "Pomnožimo z x + 3 > 0."),
        ("(2x + 5)(x + 2) = 0  ⇒  x = −2 ali x = −" + U("5", "2"), "Obe rešitvi sta v definicijskem območju x > −3."),
        ("!D<sub>1</sub>(−2, 4)", "f(−2) = ln 1 + 4."),
        ("!D<sub>2</sub>(−" + U("5", "2") + ", " + U("25", "4") + " − ln 2)", "f(−5/2) = ln ½ + 25/4 = 25/4 − ln 2."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["funkcije", "integralski_racun", "diferencialni_racun"], 14,
    r"Nalogo reši brez računala. Dana je družina kvadratnih funkcij \(f(x) = ax^2 - (a - 3)x + 5\), \(a \in \mathbb{R} \setminus \{0\}\).<br>"
    r"1.1. Za \(a = -1\) zapiši predpis, ničli in maksimum ter nariši parabolo. (3 točke)<br>"
    r"1.2. Za \(a = -1\) izračunaj ploščino odseka med parabolo in tetivo, ki povezuje teme in desno ničlo parabole. (4 točke)<br>"
    r"1.3. Natančno izračunaj, pri katerem \(a\) ima funkcija ekstrem pri \(x = -\frac{3}{2}\). (3 točke)<br>"
    r"1.4. Pri katerem \(a\) je premica \(y = 3x + 1\) tangenta na graf funkcije? Izračunaj dotikališče. (4 točke)",
    r"1.1. \(f(x) = -x^2 + 4x + 5\), ničli \(-1\) in \(5\), maksimum \(9\) pri \(x = 2\) &nbsp; 1.2. \(\frac{9}{2}\) &nbsp; "
    r"1.3. \(a = \frac{3}{4}\) &nbsp; 1.4. \(a = 16\), \(\left(\frac{1}{2}, \frac{5}{2}\right)\)",
    [
        ("!f(x) = −x<sup>2</sup> + 4x + 5 = −(x + 1)(x − 5)", "Ničli: x = −1 in x = 5."),
        ("!teme T(2, 9): maksimum 9", "Abscisa temena je sredina med ničlama."),
        ("@slika", graf([(lambda x: -x * x + 4 * x + 5, MODRA), (lambda x: -3 * x + 15 if 2 <= x <= 5 else float("nan"), RDECA)],
                        (-2, 6), (-1, 10), tocke=[(2, 9, "T"), (5, 0, ""), (-1, 0, "")], sirina=280, visina=320)),
        ("tetiva skozi (2, 9) in (5, 0):  y = −3x + 15", "Premica skozi dve točki."),
        ("p = " + INT("5", "2") + "(−x<sup>2</sup> + 4x + 5 + 3x − 15) dx = " + INT("5", "2") + "(−x<sup>2</sup> + 7x − 10) dx", "Parabola je nad tetivo."),
        ("p = (−" + U("x<sup>3</sup>", "3") + " + " + U("7x<sup>2</sup>", "2") + " − 10x)" + MEJA("5", "2") + " = −" + U("25", "6") + " − (−" + U("26", "3") + ")", ""),
        ("!1.2  p = " + U("9", "2"), ""),
        (U("a − 3", "2a") + " = −" + U("3", "2"), "Ekstrem kvadratne funkcije je v temenu, p = −b/(2a)."),
        ("!1.3  a − 3 = −3a  ⇒  a = " + U("3", "4"), ""),
        ("ax<sup>2</sup> − (a − 3)x + 5 = 3x + 1  ⇒  ax<sup>2</sup> − ax + 4 = 0", "Presečišča premice in parabole."),
        ("D = a<sup>2</sup> − 16a = 0  ⇒  a = 16", "Tangenta ima eno skupno točko: diskriminanta je 0 (a ≠ 0)."),
        ("16x<sup>2</sup> − 16x + 4 = 0  ⇒  x = " + U("1", "2"), ""),
        ("!1.4  a = 16, dotikališče (" + U("1", "2") + ", " + U("5", "2") + ")", ""),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

v2 = naloga(
    2, "geometrijski_liki_telesa", 13,
    r"Obvezna naloga. Reši naloge.<br>"
    r"2.1. V trikotniku \(MNP\) je \(|MP| = 8\), \(|PN| = 7{,}5\) in \(\angle PMN = 50^\circ\). Izračunaj obe mogoči dolžini stranice \(MN\) na dve "
    r"decimalki. (4 točke)<br>"
    r"2.2. Dolžine stranic trikotnika so trije zaporedni členi aritmetičnega zaporedja z diferenco \(d = 2\). Največji kot meri \(120^\circ\). "
    r"Izračunaj dolžine stranic. (4 točke)<br>"
    r"2.3. V trikotniku \(ABC\) je \(a = 6\), \(b = 5\) in \(\alpha = 2\beta\). Izračunaj ploščino trikotnika na dve decimalki. (5 točk)",
    r"2.1. \(\approx 0{,}82\) ali \(\approx 9{,}47\) &nbsp; 2.2. \(3, 5, 7\) &nbsp; 2.3. \(5{,}28\)",
    [
        ("7,5<sup>2</sup> = 8<sup>2</sup> + x<sup>2</sup> − 2 · 8 · x · cos 50°", "Kosinusni izrek za stranico PN, x = |MN|."),
        ("x<sup>2</sup> − 10,2846 x + 7,75 = 0", ""),
        ("!2.1  |MN| ≈ 0,82  ali  |MN| ≈ 9,47", "Obe rešitvi kvadratne enačbe sta pozitivni."),
        ("stranice a − 2, a, a + 2", "Največji kot leži nasproti najdaljše stranice."),
        ("(a + 2)<sup>2</sup> = (a − 2)<sup>2</sup> + a<sup>2</sup> − 2a(a − 2) cos 120°", "Kosinusni izrek, cos 120° = −1/2."),
        ("a<sup>2</sup> + 4a + 4 = 3a<sup>2</sup> − 6a + 4  ⇒  2a<sup>2</sup> − 10a = 0  ⇒  a = 5", ""),
        ("!2.2  3, 5, 7", ""),
        (U("6", "sin 2β") + " = " + U("5", "sin β") + "  ⇒  6 = 10 cos β", "Sinusni izrek; sin 2β = 2 sin β cos β."),
        ("cos β = " + U("3", "5") + ",  sin β = " + U("4", "5"), ""),
        ("sin γ = sin(180° − 3β) = sin 3β = 3 sin β − 4 sin<sup>3</sup> β = 0,352", "Vsota kotov; sinus trojnega kota (ali računalo: β ≈ 53,13°, γ ≈ 20,61°)."),
        ("!2.3  S = " + U("1", "2") + " · 6 · 5 · 0,352 = 5,28", "Ploščina trikotnika s sinusom kota."),
    ],
)

def slika_v3(X, Y):
    return (parametricna(X, Y, lambda t: 2 + 5 * math.cos(t), lambda t: 4 + 5 * math.sin(t), 0, 2 * math.pi, RDECA)
            + parametricna(X, Y, lambda t: 2 + 9 * math.cos(t), lambda t: math.sqrt(72) * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -1, 0, "A", dx=-12) + tocka(X, Y, 5, 0, "B") + tocka(X, Y, 5, 8, "C"))

v3 = naloga(
    3, ["stoznice", "diferencialni_racun"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dane so točke \(A(-1, 0)\), \(B(5, 0)\) in \(C(5, 8)\).<br>"
    r"3.1. Zapiši enačbo krožnice skozi točke \(A\), \(B\) in \(C\). (3 točke)<br>"
    r"3.2. Točki \(A\) in \(B\) sta gorišči elipse, ki poteka skozi \(C\). Zapiši njeno enačbo in temena. (5 točk)<br>"
    r"3.3. Zapiši enačbo parabole s temenom \(A\) in goriščem \(B\). Premica \(x = a\), \(0 < a < 5\), seka parabolo v točkah \(T_1\) in \(T_2\). "
    r"Določi \(a\), da bo ploščina trikotnika \(T_1 C T_2\) največja. (5 točk)",
    r"3.1. \((x - 2)^2 + (y - 4)^2 = 25\) &nbsp; 3.2. \(\frac{(x - 2)^2}{81} + \frac{y^2}{72} = 1\) &nbsp; 3.3. \(y^2 = 24(x + 1)\), \(a = 1\)",
    [
        ("∢ABC = 90°  ⇒  AC je premer", "Talesov izrek: AB je vodoravna, BC navpična."),
        ("!3.1  S(2, 4),  r = " + U("|AC|", "2") + " = " + U("10", "2") + " = 5:  (x − 2)<sup>2</sup> + (y − 4)<sup>2</sup> = 25", "Središče je razpolovišče AC."),
        ("|CA| + |CB| = 10 + 8 = 18 = 2a  ⇒  a = 9", "Definicija elipse: vsota razdalj do gorišč je 2a."),
        ("središče (2, 0),  e = 3,  b<sup>2</sup> = a<sup>2</sup> − e<sup>2</sup> = 72", "Linearna ekscentričnost je polovica razdalje med goriščema."),
        ("!3.2  " + U("(x − 2)<sup>2</sup>", "81") + " + " + U("y<sup>2</sup>", "72") + " = 1", "Premaknjena elipsa."),
        ("!temena (−7, 0), (11, 0), (2, ±6" + K("2") + ")", ""),
        ("@slika", mreza((-8, 12), (-9, 10), slika_v3, sirina=320)),
        (U("p", "2") + " = |AB| = 6  ⇒  y<sup>2</sup> = 4 · 6 · (x + 1) = 24(x + 1)", "Parabola s temenom (−1, 0), odprta v desno."),
        ("|T<sub>1</sub>T<sub>2</sub>| = 2" + K("24(a + 1)") + ",  višina = 5 − a", "Razdalja točke C od premice x = a."),
        ("S(a) = " + K("24(a + 1)") + " (5 − a);  maksimum ima tudi g(a) = (a + 1)(5 − a)<sup>2</sup>", "S je pozitivna, zato je največja tam, kjer je največji S²."),
        ("g '(a) = (5 − a)<sup>2</sup> − 2(a + 1)(5 − a) = (5 − a)(3 − 3a) = 0", "Stacionarne točke."),
        ("!3.3  a = 1,  S<sub>max</sub> = " + K("48") + " · 4 = 16" + K("3"), "a = 5 ni na intervalu; g'(a) pri a = 1 spremeni predznak iz + v −."),
    ],
)

v4 = naloga(
    4, ["kombinatorika", "verjetnostni_racun"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V mošnjičku je \(15\) draguljev: \(10\) smaragdov in \(5\) rubinov.<br>"
    r"4.1. Drugega za drugim (brez vračanja) izvlečemo tri dragulje. Izračunaj verjetnosti dogodkov: \(A\) – izvlekli smo tri smaragde, "
    r"\(B\) – najprej rubin, nato smaragd in nazadnje rubin. (3 točke)<br>"
    r"4.2. Hkrati izvlečemo tri dragulje. Izračunaj verjetnost, da smo izvlekli natanko dva smaragda, če vemo, da smo izvlekli vsaj en rubin. (5 točk)<br>"
    r"4.3. Zlikovec je ukradel nekaj smaragdov. Če nato hkrati izvlečemo dva dragulja, je verjetnost, da izvlečemo en smaragd in en rubin, "
    r"enaka \(\frac{5}{9}\). Koliko smaragdov je ukradel? (5 točk)",
    r"4.1. \(P(A) = \frac{24}{91}\), \(P(B) = \frac{20}{273}\) &nbsp; 4.2. \(\frac{45}{67}\) &nbsp; 4.3. \(5\) ali \(6\)",
    [
        ("!P(A) = " + U("10", "15") + " · " + U("9", "14") + " · " + U("8", "13") + " = " + U("24", "91"), "Odvisni dogodki: produkt pogojnih verjetnosti."),
        ("!P(B) = " + U("5", "15") + " · " + U("10", "14") + " · " + U("4", "13") + " = " + U("20", "273"), ""),
        (BINOM("15", "3") + " = 455,  P(vsaj en rubin) = 1 − " + U(BINOM("10", "3"), "455") + " = " + U("335", "455"), "Nasprotni dogodek: sami smaragdi."),
        ("P(dva smaragda) = " + U(BINOM("10", "2") + " · 5", "455") + " = " + U("225", "455"), "Ta dogodek že vsebuje en rubin."),
        ("!4.2  P = " + U("225", "335") + " = " + U("45", "67"), "Pogojna verjetnost."),
        ("m smaragdov:  " + U("5m", BINOM("m + 5", "2")) + " = " + U("5", "9"), "Ostalo je m smaragdov in 5 rubinov."),
        ("90m = 5(m + 5)(m + 4)  ⇒  m<sup>2</sup> − 9m + 20 = 0", ""),
        ("m = 4 ali m = 5", ""),
        ("!4.3  ukradel je 6 ali 5 smaragdov", "Obe rešitvi ustrezata."),
    ],
)

POLA2 = [v1, v2, v3, v4]
