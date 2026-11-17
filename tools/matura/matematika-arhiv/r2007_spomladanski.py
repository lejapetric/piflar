# Spomladanski rok 2007 (uradne pole RIC: m071-401-1-1, m071-402-1-1, m071-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2007, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "stevilske_mnozice", 5,
    r"Ali je število \(98\,765\,432\,150\) deljivo z naslednjimi števili: \(1, 2, 3, 4, 5, 6, 9, 10, 25, 100\)? Za vsako odgovori z DA ali NE.",
    r"DA: \(1, 2, 5, 10, 25\); NE: \(3, 4, 6, 9, 100\)",
    [
        ("vsota števk: 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 + 5 + 0 = 50", "Deljivost s 3 in 9 preverimo z vsoto števk."),
        ("!3: NE,  9: NE,  6: NE", "50 ni deljivo s 3; za deljivost s 6 mora biti deljivo z 2 in s 3."),
        ("!1: DA,  2: DA,  5: DA,  10: DA", "Zadnja števka je 0."),
        ("zadnji dve števki: 50", "Deljivost s 4, 25 in 100 preverimo z zadnjima dvema števkama."),
        ("!4: NE (50 ni deljivo s 4),  25: DA,  100: NE", ""),
    ],
)


def premici2(X, Y):
    return (f'<polygon points="{X(0):.1f},{Y(2):.1f} {X(0):.1f},{Y(-4):.1f} {X(2):.1f},{Y(2):.1f}" fill="{MODRA}" fill-opacity="0.2"/>'
            + krivulja(X, Y, lambda x: 2, -2, 4, RDECA) + krivulja(X, Y, lambda x: 3 * x - 4, -0.3, 2.6, MODRA)
            + tocka(X, Y, 2, 2, "P", dy=-8))

n2 = naloga(
    2, "pravokotni_koordinatni_sistem_ravnina", 6,
    r"Nariši premici \(y = 2\) in \(y = 3x - 4\) ter izračunaj ploščino trikotnika, ki ga premici oklepata z ordinatno osjo.",
    r"\(S = 6\)",
    [
        ("@slika", mreza((-2, 4), (-5, 4), premici2, sirina=200)),
        ("3x − 4 = 2  ⇒  P(2, 2)", "Presečišče premic."),
        ("oglišča (0, 2), (0, −4), (2, 2)", "Presečišči z osjo y."),
        ("!S = " + U("6 · 2", "2") + " = 6", "Osnovnica na osi y je dolga 6, višina je abscisa točke P."),
    ],
)

n3 = naloga(
    3, "stevilske_mnozice", 8,
    r"Dani sta kompleksni števili \(z_1 = 5 - 12i\) in \(z_2 = 2 + i\). Izračunaj \(z_1 + z_2\), \(z_1^2\), \(\overline{z_1} \cdot z_2\) in \(|z_1|\).",
    r"\(7 - 11i\), \(-119 - 120i\), \(-2 + 29i\), \(13\)",
    [
        ("!z<sub>1</sub> + z<sub>2</sub> = 7 − 11i", "Seštevamo realna in imaginarna dela."),
        ("!z<sub>1</sub><sup>2</sup> = 25 − 120i + 144i<sup>2</sup> = −119 − 120i", "Kvadrat dvočlenika, i² = −1."),
        ("z̄<sub>1</sub> = 5 + 12i", "Konjugirano število."),
        ("!z̄<sub>1</sub> · z<sub>2</sub> = 10 + 5i + 24i + 12i<sup>2</sup> = −2 + 29i", ""),
        ("!|z<sub>1</sub>| = " + K("25 + 144") + " = 13", ""),
    ],
)

n4 = naloga(
    4, "geometrijski_liki_telesa", 6,
    r"Izračunaj najmanjšo višino trikotnika s stranicami \(a = 13\ \mathrm{cm}\), \(b = 14\ \mathrm{cm}\) in \(c = 15\ \mathrm{cm}\).",
    r"\(v_c = 11{,}2\ \mathrm{cm}\)",
    [
        ("s = " + U("13 + 14 + 15", "2") + " = 21", "Polovični obseg."),
        ("S = " + K("21 · 8 · 7 · 6") + " = " + K("7056") + " = 84 cm<sup>2</sup>", "Heronov obrazec."),
        ("najmanjša višina pripada najdaljši stranici c", "S = c · v_c / 2: pri stalni ploščini je višina obratno sorazmerna stranici."),
        ("!v<sub>c</sub> = " + U("2S", "c") + " = " + U("168", "15") + " = 11,2 cm", ""),
    ],
)

n5 = naloga(
    5, "funkcije", 5,
    r"Reši enačbo \(3^{x + 2} - 2 \cdot 3^{x + 1} = \frac{1}{9}\).",
    r"\(x = -3\)",
    [
        ("9 · 3<sup>x</sup> − 6 · 3<sup>x</sup> = " + U("1", "9"), "Pravila za potence: 3^{x+2} = 9 · 3ˣ."),
        ("3 · 3<sup>x</sup> = " + U("1", "9") + "  ⇒  3<sup>x</sup> = " + U("1", "27") + " = 3<sup>−3</sup>", ""),
        ("!x = −3", ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n6 = naloga(
    6, "kombinatorika", 6,
    r"Iz števk \(2, 3, 5, 6, 8, 9\) sestavljamo trimestna števila z različnimi števkami. a) Koliko števil lahko sestavimo? b) Koliko sodih "
    r"števil lahko sestavimo? c) Koliko števil, večjih od \(500\) in manjših od \(700\), lahko sestavimo?",
    r"a) \(120\) &nbsp; b) \(60\) &nbsp; c) \(40\)",
    [
        ("!a) 6 · 5 · 4 = 120", "Variacije brez ponavljanja."),
        ("zadnja števka je soda: 2, 6 ali 8", "Najprej izberemo mesto z omejitvijo."),
        ("!b) 3 · 5 · 4 = 60", ""),
        ("prva števka je 5 ali 6", ""),
        ("!c) 2 · 5 · 4 = 40", ""),
    ],
)


def trikotnik7(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((0, 0), (9, 0), (6, 4)))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.1" stroke="{MODRA}" stroke-width="1.5"/>'
            + tocka(X, Y, 0, 0, "A", dx=-12, dy=14) + tocka(X, Y, 9, 0, "B", dy=14) + tocka(X, Y, 6, 4, "C"))

n7 = naloga(
    7, "vektorji_ravnina_prostor", 7,
    r"Točke \(A(0, 0)\), \(B(9, 0)\) in \(C(6, 4)\) so oglišča trikotnika. Nariši jih v koordinatni sistem. Izračunaj točno dolžino stranice "
    r"\(a = |BC|\), velikost kota \(\beta = \angle ABC\) na minute in točen skalarni produkt \(\overrightarrow{AB} \cdot \overrightarrow{AC}\).",
    r"\(a = 5\), \(\beta \approx 53^\circ 8'\), \(\overrightarrow{AB} \cdot \overrightarrow{AC} = 54\)",
    [
        ("@slika", mreza((-1, 10), (-1, 5), trikotnik7, sirina=280)),
        ("!a = " + K("(6 − 9)<sup>2</sup> + 4<sup>2</sup>") + " = 5", "Razdalja med točkama."),
        ("cos β = " + U("(−9, 0) · (−3, 4)", "9 · 5") + " = " + U("27", "45") + " = 0,6", "Kot med vektorjema BA in BC."),
        ("!β ≈ 53,13° ≈ 53°8'", ""),
        ("!" + V("AB") + " · " + V("AC") + " = (9, 0) · (6, 4) = 54", "Skalarni produkt po komponentah."),
    ],
)

n8 = naloga(
    8, "diferencialni_racun", 8,
    r"Krivulja \(y = \dfrac{9}{x}\) ima dve tangenti z naklonskim kotom \(135^\circ\). Zapiši enačbi teh tangent.",
    r"\(y = -x + 6\) in \(y = -x - 6\)",
    [
        ("k<sub>t</sub> = tan 135° = −1", "Smerni koeficient je tangens naklonskega kota."),
        ("y ' = −" + U("9", "x<sup>2</sup>") + " = −1  ⇒  x<sup>2</sup> = 9", "Odvod potence x⁻¹."),
        ("dotikališči D<sub>1</sub>(3, 3),  D<sub>2</sub>(−3, −3)", ""),
        ("!y = −x + 6,  y = −x − 6", "Premica skozi točko z danim smernim koeficientom."),
    ],
)

n9 = naloga(
    9, "integralski_racun", 8,
    r"Izračunaj abscisi presečišč grafov funkcij \(f(x) = 3x^2 - x\) in \(g(x) = x^2 - x + 8\) ter ploščino lika, ki ga grafa omejujeta.",
    r"\(x_{1,2} = \pm 2\), \(S = \frac{64}{3}\)",
    [
        ("3x<sup>2</sup> − x = x<sup>2</sup> − x + 8  ⇒  x<sup>2</sup> = 4", ""),
        ("!x<sub>1,2</sub> = ±2", ""),
        ("S = " + INT("2", "−2") + "(g(x) − f(x)) dx = " + INT("2", "−2") + "(8 − 2x<sup>2</sup>) dx", "Na [−2, 2] je g nad f (npr. g(0) = 8 > 0 = f(0))."),
        ("= (8x − " + U("2x<sup>3</sup>", "3") + ")" + MEJA("2", "−2") + " = 2(16 − " + U("16", "3") + ")", ""),
        ("!S = " + U("64", "3"), ""),
    ],
    snov=INTS,
)

n10 = naloga(
    10, "funkcije", 6,
    r"Naj bo \(\sin 2x \ne 0\). Poenostavi izraz \(\dfrac{\cos\left(\frac{\pi}{2} - x\right) - \sin^3 x}{\sin 2x}\) in ga zapiši kot enočlenik.",
    r"\(\frac{1}{2}\cos x\)",
    [
        ("cos(" + U("π", "2") + " − x) = sin x,  sin 2x = 2 sin x cos x", "Adicijski izrek; sinus dvojnega kota."),
        (U("sin x (1 − sin<sup>2</sup> x)", "2 sin x cos x") + " = " + U("sin x cos<sup>2</sup> x", "2 sin x cos x"), "1 − sin² x = cos² x."),
        ("!" + U("1", "2") + " cos x", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n11 = naloga(
    11, "zaporedja_vrste", 8,
    r"Izračunaj prvi člen in količnik naraščajočega geometrijskega zaporedja, za katerega je \(a_2 + a_3 = 20\) in \(a_4 - a_3 = 48\). Zapiši prve "
    r"štiri člene.",
    r"\(a_1 = 1\), \(q = 4\); \(1, 4, 16, 64\)",
    [
        (SISTEM("a<sub>1</sub>q(1 + q) = 20", "a<sub>1</sub>q<sup>2</sup>(q − 1) = 48"), "Splošni člen a_n = a₁qⁿ⁻¹."),
        (U("q(q − 1)", "1 + q") + " = " + U("12", "5") + "  ⇒  5q<sup>2</sup> − 17q − 12 = 0", "Drugo enačbo delimo s prvo."),
        ("q = 4  ali  q = −" + U("3", "5"), ""),
        ("!q = 4,  a<sub>1</sub> = " + U("20", "4 · 5") + " = 1", "Zaporedje narašča, zato q = −3/5 ne ustreza."),
        ("!1, 4, 16, 64", ""),
    ],
)


def f12(x):
    return (x - 2) / ((x - 4) * (x + 2))

n12 = naloga(
    12, "funkcije", 7,
    r"Brez uporabe odvoda nariši graf funkcije \(f(x) = \dfrac{x - 2}{x^2 - 2x - 8}\). Zapiši presečišči grafa s koordinatnima osema, pola in "
    r"enačbo vodoravne asimptote.",
    r"\((2, 0)\), \(\left(0, \frac{1}{4}\right)\); pola \(x = -2\), \(x = 4\); \(y = 0\)",
    [
        ("f(x) = " + U("x − 2", "(x − 4)(x + 2)"), "Razcep imenovalca."),
        ("!ničla (2, 0),  f(0) = " + U("−2", "−8") + " = " + U("1", "4") + ":  (0, " + U("1", "4") + ")", ""),
        ("!pola x = −2 in x = 4,  vodoravna asimptota y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("predznak: − na (−∞, −2), + na (−2, 2), − na (2, 4), + na (4, ∞)", "Vse ničle in poli so enojni."),
        ("@slika", graf([(f12, MODRA)], (-6, 8), (-3, 3), tocke=[(2, 0, ""), (0, 0.25, "")], sirina=300, visina=200)),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def slika_v1(X, Y):
    t = [parametricna(X, Y, lambda t: 1 + 5 * math.cos(t), lambda t: 4 + 5 * math.sin(t), 0, 2 * math.pi, MODRA),
         krivulja(X, Y, lambda x: 5 - x, -1, 6, "#8a8a8a"),
         f'<polygon points="{X(-2):.1f},{Y(0):.1f} {X(4):.1f},{Y(0):.1f} {X(5):.1f},{Y(7):.1f} {X(-3):.1f},{Y(7):.1f}" fill="{RDECA}" fill-opacity="0.12" stroke="{RDECA}"/>']
    for x, y, s, dx, dy in ((-2, 0, "A", -14, 14), (4, 0, "B", 4, 14), (1, 4, "S", 5, -5), (5, 7, "E", 5, -5), (-3, 7, "F", -14, -5),
                            (5, 1, "C₁", 5, 4), (-3, 1, "C₂", -20, 4), (1, -1, "C₃", 5, 14), (1, 9, "C'", 5, -5)):
        t.append(tocka(X, Y, x, y, s, dx=dx, dy=dy))
    return "".join(t)

v1 = naloga(
    1, ["stoznice", "pravokotni_koordinatni_sistem_ravnina"], 15,
    r"Krožnica \(K\) poteka skozi točki \(A(-2, 0)\) in \(B(4, 0)\), njeno središče pa leži na premici \(x + y - 5 = 0\).<br>"
    r"a) Zapiši središče, polmer in enačbo krožnice. Pomagaj si s skico. (4 točke)<br>"
    r"b) Poišči vse točke \(C\) na krožnici, za katere je ploščina trikotnika \(ABC\) enaka \(3\). (4 točke)<br>"
    r"c) Krožnici je včrtan trapez \(ABEF\) z osnovnico \(AB\). Oglišče \(E\) leži v prvem kvadrantu na premici \(y = x + 2\). Zapiši oglišči "
    r"\(E\) in \(F\) ter izračunaj ploščino trapeza. (5 točk)<br>"
    r"d) Med vsemi trikotniki, včrtanimi krožnici, s stranico \(AB\) izberi tistega z največjo ploščino. Zapiši njegovo oglišče \(C'\). (2 točki)",
    r"a) \(S(1, 4)\), \(r = 5\), \((x - 1)^2 + (y - 4)^2 = 25\) &nbsp; b) \((5, 1)\), \((-3, 1)\), \((1, -1)\) &nbsp; "
    r"c) \(E(5, 7)\), \(F(-3, 7)\), \(S = 49\) &nbsp; d) \(C'(1, 9)\)",
    [
        ("središče leži na simetrali daljice AB: x = 1", "Središče je enako oddaljeno od A in B."),
        ("1 + y − 5 = 0  ⇒  S(1, 4)", ""),
        ("!r = |SA| = " + K("9 + 16") + " = 5,  (x − 1)<sup>2</sup> + (y − 4)<sup>2</sup> = 25", ""),
        ("|AB| = 6,  " + U("6 · |y|", "2") + " = 3  ⇒  y = ±1", "Višina na AB je oddaljenost točke C od osi x."),
        ("y = 1: (x − 1)<sup>2</sup> = 16;  y = −1: (x − 1)<sup>2</sup> = 0", ""),
        ("!b) C<sub>1</sub>(5, 1),  C<sub>2</sub>(−3, 1),  C<sub>3</sub>(1, −1)", ""),
        ("(x − 1)<sup>2</sup> + (x − 2)<sup>2</sup> = 25  ⇒  x<sup>2</sup> − 3x − 10 = 0  ⇒  x = 5 (ali x = −2)", "Vstavimo y = x + 2; x = −2 da točko A."),
        ("E(5, 7),  F je zrcalna slika E čez premico x = 1:  F(−3, 7)", "Trapez, včrtan krožnici, je enakokrak."),
        ("!c) S = " + U("6 + 8", "2") + " · 7 = 49", "Osnovnici 6 in 8, višina 7."),
        ("!d) C'(1, 9)", "Največja višina: točka na krožnici, najbolj oddaljena od AB, leži na simetrali x = 1."),
        ("@slika", mreza((-5, 7), (-2, 10), slika_v1, sirina=280)),
    ],
)

v2 = naloga(
    2, ["zaporedja_vrste", "funkcije"], 13,
    r"Reši naslednje naloge iz aritmetičnih zaporedij.<br>"
    r"a) Izračunaj \(x\) in \(y\), če so \(8, x, y, 3\) zaporedni členi aritmetičnega zaporedja. (3 točke)<br>"
    r"b) Izračunaj \(n\), če velja \(\log 2 + \log 4 + \log 8 + \dots + \log 2^{79} = \log 2^n\). (4 točke)<br>"
    r"c) Vsota prvih petih členov aritmetičnega zaporedja je \(35\). Med takimi zaporedji izberi tisto, ki ima najmanjšo vsoto kvadratov prvih "
    r"treh členov, in zapiši njegovih prvih pet členov. (6 točk)",
    r"a) \(x = \frac{19}{3}\), \(y = \frac{14}{3}\) &nbsp; b) \(n = 3160\) &nbsp; c) \(-\frac{7}{5}, \frac{14}{5}, 7, \frac{56}{5}, \frac{77}{5}\)",
    [
        ("3 = 8 + 3d  ⇒  d = −" + U("5", "3"), "a₄ = a₁ + 3d."),
        ("!a) x = " + U("19", "3") + ",  y = " + U("14", "3"), ""),
        ("log 2 + 2 log 2 + … + 79 log 2 = (1 + 2 + … + 79) log 2", "Logaritem potence."),
        ("1 + 2 + … + 79 = " + U("79 · 80", "2") + " = 3160", "Vsota aritmetičnega zaporedja."),
        ("!b) n = 3160", ""),
        ("s<sub>5</sub> = 5a<sub>3</sub> = 35  ⇒  a<sub>3</sub> = 7,  a<sub>1</sub> = 7 − 2d,  a<sub>2</sub> = 7 − d", "a₁ + a₅ = a₂ + a₄ = 2a₃."),
        ("v(d) = (7 − 2d)<sup>2</sup> + (7 − d)<sup>2</sup> + 49 = 5d<sup>2</sup> − 42d + 147", ""),
        ("minimum v temenu: d = " + U("42", "10") + " = " + U("21", "5"), "Teme kvadratne funkcije."),
        ("!c) −" + U("7", "5") + ", " + U("14", "5") + ", 7, " + U("56", "5") + ", " + U("77", "5"), ""),
    ],
)

v3 = naloga(
    3, "funkcije", 12,
    r"Dana je funkcija \(f(x) = \sin x\).<br>"
    r"a) Izračunaj ničle funkcije \(f_1(x) = f(2x) - 1\). (2 točki)<br>"
    r"b) Za katera števila \(x\) funkcija \(f_2(x) = \dfrac{1}{2(f(x))^2 - 1}\) ni definirana? (3 točke)<br>"
    r"c) Izberi števili \(a > 0\) in \(b\) tako, da bo interval \([-1, 5]\) zaloga vrednosti funkcije \(f_3(x) = a f(x) + b\). (2 točki)<br>"
    r"d) Reši enačbo \(2(f(x))^2 + f\left(\frac{\pi}{2} - 2x\right) = 2 f(2x)\). (5 točk)",
    r"a) \(x = \frac{\pi}{4} + k\pi\) &nbsp; b) \(x = \frac{\pi}{4} + \frac{k\pi}{2}\) &nbsp; c) \(a = 3\), \(b = 2\) &nbsp; "
    r"d) \(x = \frac{\pi}{12} + k\pi\), \(x = \frac{5\pi}{12} + k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("sin 2x = 1  ⇒  2x = " + U("π", "2") + " + 2kπ", ""),
        ("!a) x = " + U("π", "4") + " + kπ, k ∈ ℤ", ""),
        ("2 sin<sup>2</sup> x − 1 = 0  ⇒  sin x = ±" + U(K("2"), "2"), "Imenovalec ne sme biti 0."),
        ("!b) x = " + U("π", "4") + " + " + U("kπ", "2") + ", k ∈ ℤ", "Rešitve so na vsakih π/2."),
        ("Z = [b − a, b + a] = [−1, 5]", "Zaloga vrednosti sin x je [−1, 1]."),
        ("!c) a = 3,  b = 2", ""),
        ("sin(" + U("π", "2") + " − 2x) = cos 2x = 1 − 2 sin<sup>2</sup> x", "Kosinus dvojnega kota."),
        ("2 sin<sup>2</sup> x + 1 − 2 sin<sup>2</sup> x = 2 sin 2x  ⇒  sin 2x = " + U("1", "2"), ""),
        ("2x = " + U("π", "6") + " + 2kπ  ali  2x = " + U("5π", "6") + " + 2kπ", ""),
        ("!d) x = " + U("π", "12") + " + kπ,  x = " + U("5π", "12") + " + kπ, k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

POLA2 = [v1, v2, v3]
