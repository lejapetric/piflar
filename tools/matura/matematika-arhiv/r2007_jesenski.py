# Jesenski rok 2007 (uradne pole RIC: m072-401-1-1, m072-402-1-1, m072-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2007, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


# ------------------------------------------------------------------ izpitna pola 1
def lik1(X, Y):
    return f'<rect x="{X(-2):.1f}" y="{Y(4):.1f}" width="{X(2) - X(-2):.1f}" height="{Y(1) - Y(4):.1f}" fill="{MODRA}" fill-opacity="0.25" stroke="{MODRA}" stroke-width="2"/>'

n1 = naloga(
    1, ["mnozice", "pravokotni_koordinatni_sistem_ravnina"], 7,
    r"V koordinatni sistem nariši množico točk \(T(x, y)\), ki ustreza pogojema \(-2 \le x \le 2\) in \(1 \le y \le 4\). Osenči nastali lik in "
    r"izračunaj njegovo ploščino.",
    r"pravokotnik \(4 \times 3\), \(S = 12\)",
    [
        ("meje: premici x = −2 in x = 2 ter premici y = 1 in y = 4", "Pogoj −2 ≤ x ≤ 2 je pas med navpičnima premicama."),
        ("@slika", mreza((-3, 3), (-1, 5), lik1, sirina=200)),
        ("!S = 4 · 3 = 12", "Lik je pravokotnik s stranicama 4 in 3."),
    ],
)

n2 = naloga(
    2, "geometrijski_liki_telesa", 6,
    r"V enakokrakem trikotniku \(ABC\) merijo stranice \(c = |AB| = 6\ \mathrm{cm}\) in \(a = |BC| = b = |AC| = 7\ \mathrm{cm}\). Izračunaj "
    r"točno ploščino in kot \(\beta = \angle ABC\) na stotinko stopinje.",
    r"\(S = 6\sqrt{10}\ \mathrm{cm^2}\), \(\beta \approx 64{,}62^\circ\)",
    [
        ("v<sub>c</sub> = " + K("7<sup>2</sup> − 3<sup>2</sup>") + " = " + K("40") + " = 2" + K("10") + " cm", "Višina na osnovnico jo razpolovi."),
        ("!S = " + U("c · v<sub>c</sub>", "2") + " = 6" + K("10") + " cm<sup>2</sup>", ""),
        ("cos β = " + U("c/2", "a") + " = " + U("3", "7"), "Pravokotni trikotnik iz polovice osnovnice, kraka in višine."),
        ("!β ≈ 64,62°", ""),
    ],
)

n3 = naloga(
    3, "diferencialni_racun", 8,
    r"Izračunaj odvode funkcij \(f(x) = \sqrt[5]{x^2}\), \(g(x) = x^3 \cos x\) in \(h(x) = \dfrac{2 - x}{2 + x}\). Odvod funkcije \(h\) poenostavi.",
    r"\(f'(x) = \frac{2}{5}x^{-3/5}\), \(g'(x) = 3x^2\cos x - x^3\sin x\), \(h'(x) = -\frac{4}{(2 + x)^2}\)",
    [
        ("f(x) = x<sup>2/5</sup>", "Koren zapišemo kot potenco."),
        ("!f '(x) = " + U("2", "5") + "x<sup>−3/5</sup> = " + U("2", "5" + K("x<sup>3</sup>", "5")), "Odvod potence."),
        ("!g '(x) = 3x<sup>2</sup> cos x − x<sup>3</sup> sin x", "Odvod produkta."),
        ("h '(x) = " + U("−(2 + x) − (2 − x)", "(2 + x)<sup>2</sup>"), "Odvod kvocienta."),
        ("!h '(x) = −" + U("4", "(2 + x)<sup>2</sup>"), ""),
    ],
)

n4 = naloga(
    4, "stevilske_mnozice", 7,
    r"V kompleksni ravnini nariši sliko števila \(z = -3 + 4i\). Koliko je \(|z|\)? Izračunaj \(z^2\) in \(\frac{1}{z}\).",
    r"\(|z| = 5\), \(z^2 = -7 - 24i\), \(\frac{1}{z} = -\frac{3}{25} - \frac{4}{25}i\)",
    [
        ("@slika", mreza((-4, 2), (-1, 5), lambda X, Y: tocka(X, Y, -3, 4, "z"), sirina=180)),
        ("!|z| = " + K("9 + 16") + " = 5", "Absolutna vrednost kompleksnega števila."),
        ("!z<sup>2</sup> = 9 − 24i + 16i<sup>2</sup> = −7 − 24i", "Kvadrat dvočlenika, i² = −1."),
        (U("1", "z") + " = " + U("−3 − 4i", "(−3 + 4i)(−3 − 4i)") + " = " + U("−3 − 4i", "25"), "Razširimo s konjugirano vrednostjo."),
        ("!" + U("1", "z") + " = −" + U("3", "25") + " − " + U("4", "25") + "i", ""),
    ],
)

n5 = naloga(
    5, "funkcije", 6,
    r"Graf kvadratne funkcije \(f(x) = ax^2 + bx + c\) poteka skozi točke \(A(-1, 2)\), \(B(0, 1)\) in \(C(2, 11)\). Izračunaj \(a\), \(b\) in \(c\) "
    r"ter zapiši predpis funkcije.",
    r"\(f(x) = 2x^2 + x + 1\)",
    [
        (SISTEM("a − b + c = 2", "c = 1", "4a + 2b + c = 11"), "Koordinate točk vstavimo v predpis."),
        (SISTEM("a − b = 1", "2a + b = 5"), ""),
        ("a = 2,  b = 1,  c = 1", "Seštejemo enačbi."),
        ("!f(x) = 2x<sup>2</sup> + x + 1", ""),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)


def hiperbola6(X, Y):
    t = [parametricna(X, Y, lambda u, z=z: z * 2 * math.cosh(u), lambda u: math.sinh(u), -1.6, 1.6, MODRA) for z in (1, -1)]
    t += [f'<line x1="{X(-6):.1f}" y1="{Y(-6 * k):.1f}" x2="{X(6):.1f}" y2="{Y(6 * k):.1f}" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="4 3"/>' for k in (0.5, -0.5)]
    t.append(krivulja(X, Y, lambda x: x - 2, -1, 6, RDECA) + tocka(X, Y, 2, 0, "P₁", dx=-2, dy=14) + tocka(X, Y, 10 / 3, 4 / 3, "P₂", dx=-16))
    return "".join(t)

n6 = naloga(
    6, "stoznice", 8,
    r"V koordinatni sistem nariši hiperbolo \(x^2 - 4y^2 = 4\) in njeni asimptoti. Izračunaj presečišči hiperbole in premice \(y = x - 2\).",
    r"\(P_1(2, 0)\), \(P_2\left(\frac{10}{3}, \frac{4}{3}\right)\)",
    [
        (U("x<sup>2</sup>", "4") + " − y<sup>2</sup> = 1:  a = 2,  b = 1,  asimptoti y = ±" + U("1", "2") + "x", "Enačbo delimo s 4."),
        ("@slika", mreza((-6, 6), (-4, 4), hiperbola6, sirina=280)),
        ("x<sup>2</sup> − 4(x − 2)<sup>2</sup> = 4  ⇒  3x<sup>2</sup> − 16x + 20 = 0", "Vstavimo y = x − 2."),
        ("x = " + U("16 ± 4", "6") + ":  x<sub>1</sub> = 2,  x<sub>2</sub> = " + U("10", "3"), ""),
        ("!P<sub>1</sub>(2, 0),  P<sub>2</sub>(" + U("10", "3") + ", " + U("4", "3") + ")", ""),
    ],
)

n7 = naloga(
    7, "funkcije", 5,
    r"Reši enačbo \(\log_x(x + 42) = 2\).",
    r"\(x = 7\)",
    [
        ("x<sup>2</sup> = x + 42", "Definicija logaritma."),
        ("(x − 7)(x + 6) = 0", ""),
        ("!x = 7", "Osnova logaritma mora biti pozitivna in različna od 1, zato x = −6 ne ustreza."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n8 = naloga(
    8, "zaporedja_vrste", 8,
    r"V aritmetičnem zaporedju \(a_1, a_2, 3, a_4, 11, \dots\) izračunaj \(a_1\), \(a_2\), \(a_4\), \(a_{501}\) in vsoto prvih \(501\) členov.",
    r"\(a_1 = -5\), \(a_2 = -1\), \(a_4 = 7\), \(a_{501} = 1995\), \(s_{501} = 498\,495\)",
    [
        ("a<sub>5</sub> − a<sub>3</sub> = 2d = 8  ⇒  d = 4", ""),
        ("!a<sub>1</sub> = −5,  a<sub>2</sub> = −1,  a<sub>4</sub> = 7", ""),
        ("!a<sub>501</sub> = −5 + 500 · 4 = 1995", "Splošni člen aritmetičnega zaporedja."),
        ("!s<sub>501</sub> = " + U("501", "2") + "(−5 + 1995) = 501 · 995 = 498 495", "Vsota prvih n členov."),
    ],
)

n9 = naloga(
    9, "funkcije", 5,
    r"Pokaži, da je za vsak \(x\) vrednost izraza \(2\cos^2\left(x + \frac{\pi}{4}\right) + \sin 2x\) enaka \(1\).",
    r"Izraz je enak \(1\).",
    [
        ("cos(x + " + U("π", "4") + ") = " + U(K("2"), "2") + "(cos x − sin x)", "Adicijski izrek, cos π/4 = sin π/4 = √2/2."),
        ("2 cos<sup>2</sup>(x + " + U("π", "4") + ") = (cos x − sin x)<sup>2</sup> = 1 − 2 sin x cos x", "sin² x + cos² x = 1."),
        ("= 1 − sin 2x", "Sinus dvojnega kota."),
        ("!1 − sin 2x + sin 2x = 1", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 6,
    r"V posodi je \(5\) rdečih in \(3\) zelene kroglice. Na slepo izvlečemo \(2\) kroglici. Izračunaj verjetnost, da sta kroglici iste barve.",
    r"\(\frac{13}{28}\)",
    [
        ("n = " + BINOM("8", "2") + " = 28", ""),
        ("m = " + BINOM("5", "2") + " + " + BINOM("3", "2") + " = 10 + 3 = 13", "Obe rdeči ali obe zeleni (nezdružljiva dogodka)."),
        ("!P = " + U("13", "28") + " ≈ 0,464", ""),
    ],
)

n11 = naloga(
    11, "vektorji_ravnina_prostor", 8,
    r"Dan je vektor \(\vec{a} = (3, -4)\). Izračunaj njegovo dolžino. Zapiši komponenti vektorja \(\vec{b}\), če je \(|\vec{b}| = 10\) in "
    r"\(\vec{a} \cdot \vec{b} = -50\).",
    r"\(|\vec{a}| = 5\), \(\vec{b} = (-6, 8)\)",
    [
        ("!|" + V("a") + "| = " + K("9 + 16") + " = 5", ""),
        ("cos φ = " + U("−50", "5 · 10") + " = −1  ⇒  φ = 180°", "Kot med vektorjema prek skalarnega produkta."),
        (V("b") + " je nasprotno usmerjen kot " + V("a") + " in dvakrat daljši:  " + V("b") + " = −2" + V("a"), ""),
        ("!" + V("b") + " = (−6, 8)", "Preizkus: (3, −4) · (−6, 8) = −18 − 32 = −50."),
    ],
)

n12 = naloga(
    12, "stevilske_mnozice", 6,
    r"Število \(a = 1{,}\overline{36}\) zapiši kot okrajšan ulomek. Brez računala izračunaj vrednost izraza \(\left(1 - a^{-1}\right)^{-1}\) in jo "
    r"zapiši kot okrajšan ulomek.",
    r"\(a = \frac{15}{11}\); \(\frac{15}{4}\)",
    [
        ("100a − a = 136,36… − 1,36… = 135", "Periodo dveh števk odpravimo z množenjem s 100."),
        ("!a = " + U("135", "99") + " = " + U("15", "11"), ""),
        ("a<sup>−1</sup> = " + U("11", "15") + ",  1 − a<sup>−1</sup> = " + U("4", "15"), ""),
        ("!(1 − a<sup>−1</sup>)<sup>−1</sup> = " + U("15", "4"), "Obratna vrednost ulomka."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def slika_v1(X, Y):
    return (krivulja(X, Y, lambda x: x - x * x, -0.6, 1.6, MODRA) + krivulja(X, Y, lambda x: (x ** 4 - x * x) / 2, -1.38, 1.38, RDECA)
            + tocka(X, Y, 0.5, 0.25, "") + tocka(X, Y, 1, 0, "P", dx=4, dy=14)
            + tocka(X, Y, math.sqrt(0.5), -0.125, "") + tocka(X, Y, -math.sqrt(0.5), -0.125, "")
            + f'<text x="{X(-0.55):.1f}" y="{Y(-0.75):.1f}" font-size="12" fill="{MODRA}">f</text>'
            + f'<text x="{X(1.3):.1f}" y="{Y(0.45):.1f}" font-size="12" fill="{RDECA}">g</text>')

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 16,
    r"Dani sta funkciji \(f(x) = \frac{a}{2}x - \frac{a}{2}x^2\) in \(g(x) = \dfrac{x^4 - x^2}{a}\), \(a > 0\).<br>"
    r"a) Naj bo \(a = 2\). Izračunaj ekstreme in ničle funkcij \(f\) in \(g\) ter nariši njuna grafa v isti koordinatni sistem. (7 točk)<br>"
    r"b) Dokaži, da se grafa v točki \(P(1, 0)\) sekata pod pravim kotom za vsak \(a > 0\). (3 točke)<br>"
    r"c) Dokaži, da je ploščina lika, ki ga grafa oklepata na intervalu \([0, 1]\), enaka \(\frac{a}{12} + \frac{2}{15a}\). (3 točke)<br>"
    r"d) Pri katerem \(a\) je ta ploščina najmanjša? (3 točke)",
    r"a) \(f\): ničli \(0, 1\), maksimum \(\left(\frac{1}{2}, \frac{1}{4}\right)\); \(g\): ničle \(0, \pm 1\), maksimum \((0, 0)\), minima "
    r"\(\left(\pm\frac{\sqrt{2}}{2}, -\frac{1}{8}\right)\) &nbsp; d) \(a = \frac{2\sqrt{10}}{5} \approx 1{,}26\)",
    [
        ("f(x) = x − x<sup>2</sup> = x(1 − x):  ničli 0 in 1", ""),
        ("!f: maksimum (" + U("1", "2") + ", " + U("1", "4") + ")", "Teme parabole leži na sredini med ničlama."),
        ("g(x) = " + U("x<sup>2</sup>(x − 1)(x + 1)", "2") + ":  ničle 0 (dvojna), ±1", ""),
        ("g '(x) = 2x<sup>3</sup> − x = x(2x<sup>2</sup> − 1) = 0  ⇒  x = 0, x = ±" + U(K("2"), "2"), ""),
        ("!g: maksimum (0, 0),  minima (±" + U(K("2"), "2") + ", −" + U("1", "8") + ")", "g(√2/2) = (1/4 − 1/2)/2."),
        ("@slika", mreza((-1.5, 1.8), (-1, 1), slika_v1, sirina=300, visina=200, korak=0.5, oznake=False)),
        ("f '(x) = " + U("a", "2") + " − ax,  f '(1) = −" + U("a", "2") + ";  g '(x) = " + U("4x<sup>3</sup> − 2x", "a") + ",  g '(1) = " + U("2", "a"), ""),
        ("!b) f '(1) · g '(1) = −" + U("a", "2") + " · " + U("2", "a") + " = −1", "Tangenti sta pravokotni, ko je produkt smernih koeficientov −1."),
        ("S = " + INT("1", "0") + "(f(x) − g(x)) dx = " + U("a", "2") + "(" + U("1", "2") + " − " + U("1", "3") + ") − " + U("1", "a") + "(" + U("1", "5") + " − " + U("1", "3") + ")", "Na [0, 1] je f ≥ 0 ≥ g."),
        ("!c) S = " + U("a", "12") + " + " + U("2", "15a"), ""),
        ("S '(a) = " + U("1", "12") + " − " + U("2", "15a<sup>2</sup>") + " = 0  ⇒  a<sup>2</sup> = " + U("8", "5"), "Ekstrem: odvod po a je 0."),
        ("!d) a = " + K(U("8", "5")) + " = " + U("2" + K("10"), "5") + " ≈ 1,26", "S' preide iz − v +, zato je to minimum."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

v2 = naloga(
    2, "zaporedja_vrste", 13,
    r"Naj bo \(a_1, 3, a_3, \frac{1}{3}, \dots\) geometrijsko zaporedje s samimi pozitivnimi členi.<br>"
    r"a) Izračunaj člena \(a_1\) in \(a_3\) ter zapiši splošni člen zaporedja. (3 točke)<br>"
    r"b) Med katerima zaporednima členoma leži število \(10^{-6}\)? (4 točke)<br>"
    r"c) Dokaži, da je vsota \(a_2 + a_4 + a_6 + \dots + a_{100}\) enaka \(\frac{27}{8}\left(1 - 3^{-100}\right)\). (3 točke)<br>"
    r"d) Izračunaj vsoto vrste \(a_1^3 + a_2^3 + a_3^3 + \dots\) (3 točke)",
    r"a) \(a_1 = 9\), \(a_3 = 1\), \(a_n = 3^{3 - n}\) &nbsp; b) med \(a_{15}\) in \(a_{16}\) &nbsp; d) \(\frac{19683}{26} \approx 757{,}04\)",
    [
        ("a<sub>4</sub> = a<sub>2</sub> q<sup>2</sup>:  " + U("1", "3") + " = 3q<sup>2</sup>  ⇒  q = " + U("1", "3"), "Členi so pozitivni, zato q > 0."),
        ("!a) a<sub>1</sub> = 9,  a<sub>3</sub> = 1,  a<sub>n</sub> = 9 · 3<sup>1 − n</sup> = 3<sup>3 − n</sup>", ""),
        ("3<sup>3 − n</sup> = 10<sup>−6</sup>  ⇒  (3 − n) log 3 = −6  ⇒  n = 3 + " + U("6", "log 3") + " ≈ 15,58", "Logaritmiramo."),
        ("a<sub>15</sub> = 3<sup>−12</sup> ≈ 1,9 · 10<sup>−6</sup>,  a<sub>16</sub> = 3<sup>−13</sup> ≈ 6,3 · 10<sup>−7</sup>", ""),
        ("!b) 10<sup>−6</sup> leži med a<sub>15</sub> in a<sub>16</sub>", ""),
        ("sodi členi: 3, " + U("1", "3") + ", " + U("1", "27") + ", …  (prvi člen 3, količnik " + U("1", "9") + ", 50 členov)", ""),
        ("!c) 3 · " + U("1 − (1/9)<sup>50</sup>", "1 − 1/9") + " = " + U("27", "8") + "(1 − 3<sup>−100</sup>)", "Vsota prvih n členov geometrijskega zaporedja."),
        ("kubi: 729, 27, 1, …  (količnik " + U("1", "27") + ")", "Kubi geometrijskega zaporedja so spet geometrijsko zaporedje."),
        ("!d) s = " + U("729", "1 − 1/27") + " = " + U("19683", "26") + " ≈ 757,04", ""),
    ],
)

v3 = naloga(
    3, ["kombinatorika", "verjetnostni_racun"], 11,
    r"Odbojkarsko ekipo sestavlja \(12\) igralk: \(6\) napadalk, \(4\) blokerke in \(2\) podajalki. Eni izmed napadalk je ime Maja, eni izmed "
    r"podajalk pa Tina. Druge igralke imajo drugačna imena.<br>"
    r"a) Na koliko načinov se lahko vse igralke postavijo v vrsto, če mora Maja stati prva in morata podajalki stati skupaj? (3 točke)<br>"
    r"b) Na koliko načinov lahko trener sestavi začetno šesterko, če so v njej \(3\) napadalke, \(2\) blokerki in \(1\) podajalka? (2 točki)<br>"
    r"c) Trener igralke naključno razdeli v tri skupine po \(4\): prva bo vadila servis, druga sprejem, tretja napad. Izračunaj verjetnosti "
    r"dogodkov \(A\) – Maja in Tina bosta vadili sprejem, \(B\) – Maja bo vadila servis, Tina pa napad. (6 točk)",
    r"a) \(7\,257\,600\) &nbsp; b) \(240\) &nbsp; c) \(P(A) = \frac{1}{11}\), \(P(B) = \frac{4}{33}\)",
    [
        ("Maja je fiksna; podajalki zlepimo v en blok: 10 enot", "Blok obravnavamo kot eno osebo."),
        ("!a) 10! · 2! = 7 257 600", "Permutacije enot in razvrstitev znotraj bloka."),
        ("!b) " + BINOM("6", "3") + " · " + BINOM("4", "2") + " · " + BINOM("2", "1") + " = 20 · 6 · 2 = 240", "Kombinacije in pravilo produkta."),
        ("P(Maja v sprejemu) = " + U("4", "12") + ",  nato P(Tina v sprejemu) = " + U("3", "11"), "Ostanejo 3 mesta med 11 igralkami."),
        ("!P(A) = " + U("4", "12") + " · " + U("3", "11") + " = " + U("1", "11"), "Pogojna verjetnost."),
        ("!P(B) = " + U("4", "12") + " · " + U("4", "11") + " = " + U("4", "33"), "V napadu so po Majini razvrstitvi še 4 prosta mesta med 11."),
    ],
)

POLA2 = [v1, v2, v3]
