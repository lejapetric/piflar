# Spomladanski rok 2019 (uradne pole RIC: m191-401-1-1, m191-402-1-1, m191-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2019, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["funkcije", "stevilske_mnozice", "pravokotni_koordinatni_sistem_ravnina"], 8,
    "V levem stolpcu so kratke naloge. Reši jih in rešitve zapiši v desni stolpec (prva vrstica je primer)."
    + tabela(["Naloga", "Rešitev"], [
        [r"Zaloga vrednosti funkcije \(f(x) = x^2 - 2\)", r"\(Z_f = [-2, \infty)\)"],
        [r"Najmanjši skupni večkratnik števil \(18\) in \(24\)", r"\(v(18, 24) = \)"],
        [r"Rešitvi enačbe \(|x| = 7\)", r"\(x_1 = \ \ ,\ x_2 = \)"],
        [r"Razdalja med točkama \(A(1, -2)\) in \(B(4, 2)\)", r"\(d(A, B) = \)"],
        [r"Največja množica \(D_f\), na kateri je definirana funkcija \(f(x) = \sqrt{x + 3}\)", r"\(D_f = \)"],
        [r"Realni del kompleksnega števila \(z = i^5 + i^8\)", r"\(\mathrm{Re}(z) = \)"],
    ]),
    r"\(72\); \(x_1 = 7\), \(x_2 = -7\); \(5\); \([-3, \infty)\); \(1\)",
    [
        ("18 = 2 · 3<sup>2</sup>,  24 = 2<sup>3</sup> · 3", "Razcep na prafaktorje."),
        ("!v(18, 24) = 2<sup>3</sup> · 3<sup>2</sup> = 72", "Najmanjši skupni večkratnik: vsak prafaktor z največjo potenco."),
        ("!x<sub>1</sub> = 7,  x<sub>2</sub> = −7", "Absolutna vrednost 7 imata števili 7 in −7."),
        ("!d(A, B) = " + K("(4 − 1)<sup>2</sup> + (2 + 2)<sup>2</sup>") + " = " + K("25") + " = 5", "Razdalja med točkama (Pitagorov izrek)."),
        ("x + 3 ≥ 0", "Pod sodim korenom mora biti nenegativno število."),
        ("!D<sub>f</sub> = [−3, ∞)", ""),
        ("i<sup>5</sup> = i<sup>4</sup> · i = i,  i<sup>8</sup> = (i<sup>4</sup>)<sup>2</sup> = 1", "Potence števila i se ponavljajo s periodo 4 (i⁴ = 1)."),
        ("!z = 1 + i,  Re(z) = 1", ""),
    ],
)

n2 = naloga(
    2, "statistika", 5,
    r"Smučarska skakalka Nika je na treningu v prvih štirih skokih skočila \(102\) m, \(96\) m, \(99\) m in \(95\) m.<br>"
    r"2.1. Izračunaj povprečno dolžino njenih skokov. (2 točki)<br>"
    r"2.2. Koliko metrov mora skočiti v petem skoku, da se bo povprečje dvignilo na \(99\) m? (3 točke)",
    r"2.1. \(98\) m &nbsp; 2.2. \(103\) m",
    [
        ("!2.1  " + U("102 + 96 + 99 + 95", "4") + " = " + U("392", "4") + " = 98 m", "Aritmetična sredina: vsota podatkov, deljena s številom podatkov."),
        ("2.2  " + U("392 + x", "5") + " = 99", "Novo povprečje petih skokov."),
        ("392 + x = 495", ""),
        ("!x = 103 m", ""),
    ],
)

n3 = naloga(
    3, ["funkcije", "potence_koreni"], 6,
    r"Reši enačbi.<br>3.1. \(3^{x + 1} \cdot 3^{x + 2} = 81\) (3 točke)<br>"
    r"3.2. \(3^{x + 1} + 3^{x + 2} = \frac{4}{3}\) (3 točke)",
    r"3.1. \(x = \frac{1}{2}\) &nbsp; 3.2. \(x = -2\)",
    [
        ("3.1  3<sup>2x + 3</sup> = 3<sup>4</sup>", "Pri množenju potenc z isto osnovo eksponente seštejemo; 81 = 3⁴."),
        ("2x + 3 = 4", "Osnovi sta enaki, zato izenačimo eksponenta."),
        ("!x = " + U("1", "2"), ""),
        ("3.2  3<sup>x</sup> · 3 + 3<sup>x</sup> · 9 = 12 · 3<sup>x</sup> = " + U("4", "3"), "Izpostavimo 3ˣ."),
        ("3<sup>x</sup> = " + U("1", "9") + " = 3<sup>−2</sup>", ""),
        ("!x = −2", ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

slika4 = mreza((-3, 3), (-4, 2), lambda X, Y:
    tocka(X, Y, -2, 1, "A", -12, -5) + tocka(X, Y, 2, 1, "B") + tocka(X, Y, 1, -3, "C", 6, 4), sirina=220)
resitev4 = mreza((-3, 3), (-4, 2), lambda X, Y:
    tocka(X, Y, -2, 1, "A", -12, -5) + tocka(X, Y, 2, 1, "B") + tocka(X, Y, 1, -3, "C", 6, 4)
    + f'<line x1="{X(1):.1f}" y1="{Y(-3):.1f}" x2="{X(-2):.1f}" y2="{Y(1):.1f}" stroke="{MODRA}" stroke-width="2"/>'
    + f'<line x1="{X(1):.1f}" y1="{Y(-3):.1f}" x2="{X(2):.1f}" y2="{Y(1):.1f}" stroke="{RDECA}" stroke-width="2"/>', sirina=220)
n4 = naloga(
    4, "vektorji_ravnina_prostor", 8,
    r"Dane so točke \(A(-2, 1)\), \(B(2, 1)\) in \(C(1, -3)\). Na sliki nariši vektorja \(\vec{a} = \overrightarrow{CA}\) in "
    r"\(\vec{b} = \overrightarrow{CB}\). Zapiši ju s komponentami, izračunaj skalarni produkt \(\vec{a} \cdot \vec{b}\) in kot "
    r"\(\alpha\) med vektorjema (v stopinjah, na dve decimalki)." + slika4,
    r"\(\vec{a} = (-3, 4)\), \(\vec{b} = (1, 4)\), \(\vec{a} \cdot \vec{b} = 13\), \(\alpha \approx 50{,}91^\circ\)",
    [
        ("@slika", resitev4),
        ("!" + V("a") + " = (−2 − 1, 1 + 3) = (−3, 4)", "Komponente vektorja: končna točka minus začetna."),
        ("!" + V("b") + " = (2 − 1, 1 + 3) = (1, 4)", ""),
        ("!" + V("a") + " · " + V("b") + " = −3 + 16 = 13", "Skalarni produkt: vsota produktov istoležnih komponent."),
        ("|" + V("a") + "| = 5,  |" + V("b") + "| = " + K("17"), "Dolžina vektorja (Pitagorov izrek)."),
        ("cos α = " + U("13", "5" + K("17")) + " ≈ 0,6306", "Kot med vektorjema iz skalarnega produkta."),
        ("!α ≈ 50,91°", ""),
    ],
)

def lik5(X, Y):
    o = [f'<path d="M{X(0):.1f},{Y(0):.1f} L{X(0):.1f},{Y(8):.1f} A{X(5) - X(0):.1f},{X(5) - X(0):.1f} 0 0 0 {X(0):.1f},{Y(0):.1f} Z" fill="currentColor" fill-opacity="0.25"/>',
         f'<path d="M{X(0):.1f},{Y(0):.1f} L{X(6):.1f},{Y(0):.1f} A{X(5) - X(0):.1f},{X(5) - X(0):.1f} 0 0 1 {X(0):.1f},{Y(0):.1f} Z" fill="currentColor" fill-opacity="0.25"/>',
         parametricna(X, Y, lambda t: 3 + 5 * math.cos(t), lambda t: 4 + 5 * math.sin(t), 0, 2 * math.pi),
         f'<line x1="{X(-0.6):.1f}" y1="{Y(8.8):.1f}" x2="{X(7):.1f}" y2="{Y(-1.33):.1f}" stroke="{RDECA}" stroke-width="2"/>',
         tocka(X, Y, 0, 8, "A"), tocka(X, Y, 6, 0, "B", 4, -6),
         f'<text x="{X(7.6):.1f}" y="{Y(6):.1f}" font-size="12" fill="currentColor">k</text>',
         f'<text x="{X(6.7):.1f}" y="{Y(-1.6):.1f}" font-size="12" fill="{RDECA}">p</text>',
         f'<text x="{X(-0.5):.1f}" y="{Y(8) + 4:.1f}" font-size="10" text-anchor="end" fill="currentColor">8</text>',
         f'<text x="{X(6):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">6</text>']
    return "".join(o)

n5 = naloga(
    5, ["stoznice", "pravokotni_koordinatni_sistem_ravnina", "geometrijski_liki_telesa"], 8,
    r"Premica \(p\) poteka skozi točki \(A(0, 8)\) in \(B(6, 0)\). Daljica \(AB\) je premer krožnice \(k\)." + mreza((-3, 9), (-2, 10), lik5, sirina=300)
    + r"5.1. Zapiši enačbo premice \(p\). (2 točki)<br>5.2. Zapiši enačbo krožnice \(k\). (3 točke)<br>"
    r"5.3. Izračunaj vsoto ploščin osenčenih krožnih odsekov. Nalogo reši brez računala. (3 točke)",
    r"5.1. \(y = -\frac{4}{3}x + 8\) &nbsp; 5.2. \((x - 3)^2 + (y - 4)^2 = 25\) &nbsp; 5.3. \(\frac{25\pi}{2} - 24\)",
    [
        ("k = " + U("0 − 8", "6 − 0") + " = −" + U("4", "3"), "Smerni koeficient premice skozi dve točki."),
        ("!5.1  y = −" + U("4", "3") + "x + 8", "Začetna vrednost n = 8 (presečišče z osjo y)."),
        ("S(3, 4),  r = " + U("|AB|", "2") + " = " + U(K("36 + 64"), "2") + " = 5", "Središče je razpolovišče premera, polmer polovica njegove dolžine."),
        ("!5.2  (x − 3)<sup>2</sup> + (y − 4)<sup>2</sup> = 25", "Enačba krožnice s središčem S(p, q)."),
        ("O(0, 0) leži na krožnici: 9 + 16 = 25", "Kot AOB je pravi, zato O leži na Talesovi krožnici nad AB."),
        ("S<sub>odsekov</sub> = " + U("πr<sup>2</sup>", "2") + " − S<sub>AOB</sub> = " + U("25π", "2") + " − " + U("6 · 8", "2"), "Odseka sta polkrog nad AB brez pravokotnega trikotnika AOB."),
        ("!5.3  S = " + U("25π", "2") + " − 24", ""),
    ],
)

n6 = naloga(
    6, "geometrijski_liki_telesa", 6,
    r"V trikotniku \(ABC\) je \(|AB| = 8\) cm, \(\alpha = \angle BAC = 65^\circ\) in \(\gamma = \angle ACB = 40^\circ\). "
    r"Izračunaj dolžino stranice \(AC\) in ploščino trikotnika. Rezultata zaokroži na dve decimalki.",
    r"\(|AC| \approx 12{,}02\) cm, \(S \approx 43{,}58\ \mathrm{cm^2}\)",
    [
        ("β = 180° − 65° − 40° = 75°", "Vsota notranjih kotov trikotnika je 180°."),
        (U("b", "sin β") + " = " + U("c", "sin γ") + "  ⇒  b = " + U("8 · sin 75°", "sin 40°"), "Sinusni izrek."),
        ("!|AC| = b ≈ 12,02 cm", ""),
        ("S = " + U("1", "2") + " b c sin α = " + U("1", "2") + " · 12,02 · 8 · sin 65°", "Ploščina iz dveh stranic in vmesnega kota."),
        ("!S ≈ 43,58 cm<sup>2</sup>", ""),
    ],
)

def f7(x):
    return (x + 3) / x

n7 = naloga(
    7, ["funkcije", "diferencialni_racun", "integralski_racun"], 8,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x + 3}{x}\).<br>"
    r"7.1. Zapiši enačbi asimptot in nariši graf funkcije \(f\). (3 točke)<br>"
    r"7.2. Izračunaj odvod funkcije \(f\). (2 točki)<br>"
    r"7.3. Izračunaj nedoločeni integral funkcije \(f\). (3 točke)",
    r"7.1. \(x = 0\), \(y = 1\) &nbsp; 7.2. \(f'(x) = -\frac{3}{x^2}\) &nbsp; 7.3. \(x + 3\ln|x| + C\)",
    [
        ("f(x) = 1 + " + U("3", "x"), "Ulomek razdelimo na dva dela."),
        ("!7.1  pol x = 0 (navpična asimptota),  y = 1 (vodoravna asimptota)", "Stopnji števca in imenovalca sta enaki: asimptota je količnik vodilnih koeficientov."),
        ("@slika", graf([(f7, MODRA), (lambda x: 1, RDECA)], (-6, 6), (-5, 7), tocke=[(-3, 0, "")], sirina=260, visina=260)),
        ("!7.2  f '(x) = (1 + 3x<sup>−1</sup>)' = −" + U("3", "x<sup>2</sup>"), "Odvod potence."),
        ("!7.3  ∫ (1 + " + U("3", "x") + ") dx = x + 3 ln|x| + C", "Integral konstante in integral 1/x."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n8 = naloga(
    8, "funkcije", 7,
    r"8.1. Funkcija \(f(x) = A\sin x + C\), \(A, C \in \mathbb{R}\), ima lokalni maksimum \(7\) in lokalni minimum \(1\). Na grafu sta "
    r"točki \(\left(\frac{\pi}{2}, 7\right)\) in \(\left(-\frac{\pi}{2}, 1\right)\). Določi \(A\) in \(C\). (2 točki)"
    + graf([(lambda x: 3 * math.sin(x) + 4, MODRA)], (-4, 4), (-1, 8), tocke=[(math.pi / 2, 7, "(π/2, 7)"), (-math.pi / 2, 1, "(−π/2, 1)")], sirina=300, visina=220)
    + r"8.2. Dana je funkcija \(g(x) = 4\sin x + 1\). Izračunaj vsa presečišča grafa funkcije \(g\) s premico \(y = 3\). (5 točk)",
    r"8.1. \(A = 3\), \(C = 4\) &nbsp; 8.2. \(\left(\frac{\pi}{6} + 2k\pi, 3\right)\), \(\left(\frac{5\pi}{6} + 2k\pi, 3\right)\), \(k \in \mathbb{Z}\)",
    [
        ("A + C = 7,  −A + C = 1", "V točki π/2 je sin x = 1, v −π/2 je sin x = −1."),
        ("!8.1  C = 4,  A = 3", "Enačbi seštejemo in odštejemo."),
        ("8.2  4 sin x + 1 = 3  ⇒  sin x = " + U("1", "2"), "Presečišče: izenačimo g(x) = 3."),
        ("x = " + U("π", "6") + " + 2kπ  ali  x = " + U("5π", "6") + " + 2kπ", "Sinus je 1/2 pri π/6 in π − π/6."),
        ("!T(" + U("π", "6") + " + 2kπ, 3),  T(" + U("5π", "6") + " + 2kπ, 3),  k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, ["kombinatorika", "verjetnostni_racun"], 7,
    r"V škatli je \(60\) srečk, \(45\) jih zadene nagrado, \(15\) pa ne.<br>"
    r"9.1. Naključno izvlečemo eno srečko. Izračunaj verjetnost dogodka \(A\), da zadene nagrado. (1 točka)<br>"
    r"9.2. Naključno hkrati izvlečemo dve srečki. Izračunaj verjetnost dogodka \(B\), da obe zadeneta nagrado. (3 točke)<br>"
    r"9.3. Naključno hkrati izvlečemo tri srečke. Izračunaj verjetnost dogodka \(C\), da vsaj ena zadene nagrado. (3 točke)",
    r"9.1. \(\frac{3}{4}\) &nbsp; 9.2. \(\frac{33}{59}\) &nbsp; 9.3. \(\frac{6753}{6844} \approx 0{,}987\)",
    [
        ("!9.1  P(A) = " + U("45", "60") + " = " + U("3", "4"), "Verjetnost = število ugodnih / število vseh izidov."),
        ("P(B) = " + U(BINOM(45, 2), BINOM(60, 2)) + " = " + U("990", "1770"), "Dve srečki izmed 45 oz. 60 izberemo s kombinacijami."),
        ("!9.2  P(B) = " + U("33", "59"), ""),
        ("P(C) = 1 − P(nobena ne zadene) = 1 − " + U(BINOM(15, 3), BINOM(60, 3)), "Nasprotni dogodek: vse tri srečke so brez nagrade."),
        ("= 1 − " + U("455", "34 220") + " = 1 − " + U("91", "6844"), ""),
        ("!9.3  P(C) = " + U("6753", "6844") + " ≈ 0,987", ""),
    ],
)

n10 = naloga(
    10, "zaporedja_vrste", 5,
    r"Gospod Janez je v banko vložil \(15\,000\) €. Banka obrestuje obrestno obrestno s \(2\,\%\) letno obrestno mero in "
    r"obresti pripiše na koncu vsakega leta. Pogoji se ne spreminjajo, Janez pa tri leta ne dviguje denarja.<br>"
    r"10.1. Koliko obresti mu pripišejo po prvem letu? (2 točki)<br>"
    r"10.2. Koliko denarja ima na računu po treh letih? (3 točke)",
    r"10.1. \(300\) € &nbsp; 10.2. \(15\,918{,}12\) €",
    [
        ("!10.1  15 000 · 0,02 = 300 €", "Obresti prvega leta: 2 % glavnice."),
        ("r = 1 + " + U("2", "100") + " = 1,02", "Obrestovalni faktor."),
        ("G<sub>3</sub> = 15 000 · 1,02<sup>3</sup>", "Pri obrestnem obrestovanju stanje vsako leto pomnožimo z r (geometrijsko zaporedje)."),
        ("!10.2  G<sub>3</sub> ≈ 15 918,12 €", ""),
    ],
)

n11 = naloga(
    11, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Število \(2026\) zapiši kot vsoto dveh realnih števil \(x\) in \(y\) tako, da bo vrednost izraza "
    r"\(xy - 4x - 8y + 50\) največja.",
    r"\(x = 1015\), \(y = 1011\)",
    [
        ("y = 2026 − x", "Iz pogoja x + y = 2026 izrazimo y."),
        ("I(x) = x(2026 − x) − 4x − 8(2026 − x) + 50", "Vstavimo v izraz."),
        ("I(x) = −x<sup>2</sup> + 2030x − 16 158", "Dobimo kvadratno funkcijo z negativnim vodilnim koeficientom."),
        ("p = −" + U("2030", "2 · (−1)") + " = 1015", "Največja vrednost je v temenu; abscisa temena p = −b/(2a)."),
        ("!x = 1015,  y = 1011", ""),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n12 = naloga(
    12, "algebrski_izrazi_enacbe_neenacbe", 6,
    "Kopališče prodaja celodnevne vstopnice za odrasle in za otroke; otroška je za \\(25\\,\\%\\) cenejša od vstopnice za odrasle. "
    "Za mlajše otroke lahko starši plačajo celodnevni plavalni tečaj z vaditeljem, v katerega je vstopnina že všteta.<br>"
    "Družina Kos (dva starša, dvanajstletna hči in dva šestletna sinova, ki gresta na tečaj) je plačala \\(272\\) €. "
    "Družina Zupan (dva starša, dva šolarja in petletna hči na tečaju) je plačala \\(238\\) €.<br>"
    "Koliko stane celodnevna vstopnica za odrasle in koliko celodnevni tečaj za enega otroka?",
    r"vstopnica za odrasle \(48\) €, tečaj \(70\) €",
    [
        ("a … vstopnica za odrasle,  0,75a … otroška,  t … tečaj", "Vpeljemo neznanki."),
        (SISTEM("2a + 0,75a + 2t = 272", "2a + 2 · 0,75a + t = 238"), "Zapišemo sistem dveh linearnih enačb."),
        (SISTEM("2,75a + 2t = 272", "3,5a + t = 238"), "Uredimo."),
        ("t = 238 − 3,5a  ⇒  2,75a + 476 − 7a = 272", "Iz druge enačbe izrazimo t in vstavimo v prvo."),
        ("4,25a = 204", ""),
        ("!a = 48 €,  t = 238 − 168 = 70 €", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
s2 = math.sqrt(2)
v1 = naloga(
    1, ["stoznice", "integralski_racun", "diferencialni_racun"], 14,
    r"Nalogo reši brez računala. Dana je hiperbola z enačbo \(4x^2 - y^2 = 4\).<br>"
    r"1.1. Zapiši enačbi tangent na hiperbolo v točkah \(D_1(\sqrt{2}, 2)\) in \(D_2(\sqrt{2}, -2)\). (3 točke)<br>"
    r"1.2. Tangenta \(t\) z enačbo \(y = 2\sqrt{2}\,x - 2\) seka asimptoto \(y = 2x\) v točki \(P\). Naj bosta \(F_1\) in \(F_2\) "
    r"gorišči hiperbole. Izračunaj \(P\), \(F_1\) in \(F_2\) ter zapiši enačbo krožnice skozi te tri točke. (7 točk)<br>"
    r"1.3. Območje, ki ga omejujejo tangenta \(t\), hiperbola in abscisna os, zavrtimo okrog abscisne osi za \(360^\circ\). "
    r"Izračunaj prostornino nastalega telesa. (4 točke)",
    r"1.1. \(y = 2\sqrt{2}x - 2\), \(y = -2\sqrt{2}x + 2\) &nbsp; 1.2. \(P(\sqrt{2} + 1, 2\sqrt{2} + 2)\), \(F_{1,2}(\pm\sqrt{5}, 0)\), "
    r"\(x^2 + \left(y - \frac{5}{2}\right)^2 = \frac{45}{4}\) &nbsp; 1.3. \(V = \frac{2\pi(3\sqrt{2} - 4)}{3}\)",
    [
        ("x<sup>2</sup> − " + U("y<sup>2</sup>", "4") + " = 1:  a = 1, b = 2", "Enačbo delimo s 4."),
        ("tangenta v T(x<sub>0</sub>, y<sub>0</sub>): x x<sub>0</sub> − " + U("y y<sub>0</sub>", "4") + " = 1", "Enačba tangente na hiperbolo (polarno pravilo)."),
        ("!1.1  " + K("2") + " x − " + U("y", "2") + " = 1 ⇒ y = 2" + K("2") + "x − 2;   y = −2" + K("2") + "x + 2", "Vstavimo D₁ in D₂."),
        ("2" + K("2") + "x − 2 = 2x  ⇒  x = " + U("1", K("2") + " − 1") + " = " + K("2") + " + 1", "Presečišče tangente z asimptoto; ulomek racionaliziramo."),
        ("!P(" + K("2") + " + 1, 2" + K("2") + " + 2)", ""),
        ("e<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> = 5:  F<sub>1,2</sub>(±" + K("5") + ", 0)", "Gorišči hiperbole: e² = a² + b²."),
        ("središče krožnice O<sub>k</sub>(0, q)", "Središče leži na simetrali daljice F₁F₂, to je os y."),
        ("q<sup>2</sup> + 5 = (" + K("2") + " + 1)<sup>2</sup> + (2" + K("2") + " + 2 − q)<sup>2</sup>", "Središče je enako oddaljeno od F₂ in P."),
        ("5 = 15 + 10" + K("2") + " − 4q(" + K("2") + " + 1)  ⇒  q = " + U("5", "2"), "(√2 + 1)² = 3 + 2√2, (2√2 + 2)² = 12 + 8√2."),
        ("!x<sup>2</sup> + (y − " + U("5", "2") + ")<sup>2</sup> = " + U("45", "4"), "r² = q² + 5."),
        ("t seka os x v x = " + U("1", K("2")) + ", hiperbola v x = 1; obe gresta skozi D<sub>1</sub>(" + K("2") + ", 2)", "Območje je med tangento in hiperbolo nad osjo x."),
        ("V<sub>1</sub> = " + U("π", "3") + " · 2<sup>2</sup> · (" + K("2") + " − " + U("1", K("2")) + ") = " + U("2" + K("2") + "π", "3"), "Pod tangento nastane stožec s polmerom 2 in višino 1/√2."),
        ("V<sub>2</sub> = π" + INT(K("2"), "1") + " 4(x<sup>2</sup> − 1) dx = 4π(" + U("x<sup>3</sup>", "3") + " − x) " + MEJA(K("2"), "1") + " = " + U("4π(2 − " + K("2") + ")", "3"), "Prostornina rotacijskega telesa V = π∫ y² dx, y² = 4(x² − 1)."),
        ("!1.3  V = V<sub>1</sub> − V<sub>2</sub> = " + U("2π(3" + K("2") + " − 4)", "3") + " ≈ 0,51", ""),
    ],
)

def predor(r=60, fi=math.pi / 3):
    cx, cy = 90, 80
    a = (math.pi + fi) / 2  # A je spodaj levo
    A = (cx + r * math.cos(a + 0), cy + r * math.sin(a))
    # pravokotnik ABCD v krogu: A spodaj levo, B spodaj desno, C zgoraj desno, D zgoraj levo
    hx, hy = r * math.sin(fi / 2), r * math.cos(fi / 2)
    A, B, C, D = (cx - hx, cy + hy), (cx + hx, cy + hy), (cx + hx, cy - hy), (cx - hx, cy - hy)
    d = [f'<path d="M{A[0]:.1f},{A[1]:.1f} L{B[0]:.1f},{B[1]:.1f} L{C[0]:.1f},{C[1]:.1f} A{r},{r} 0 0 0 {D[0]:.1f},{D[1]:.1f} Z" fill="currentColor" fill-opacity="0.25" stroke="currentColor"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-opacity="0.6"/>',
         f'<line x1="{cx}" y1="{cy}" x2="{C[0]:.1f}" y2="{C[1]:.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<line x1="{cx}" y1="{cy}" x2="{D[0]:.1f}" y2="{D[1]:.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<circle cx="{cx}" cy="{cy}" r="2.5" fill="currentColor"/><text x="{cx + 4}" y="{cy + 12}" font-size="11" fill="currentColor">S</text>',
         f'<text x="{cx - 4}" y="{cy - 10}" font-size="11" fill="currentColor">φ</text>']
    for (x, y), n, dx, dy in [(A, "A", -12, 12), (B, "B", 4, 12), (C, "C", 5, -2), (D, "D", -13, -2)]:
        d.append(f'<text x="{x + dx:.1f}" y="{y + dy:.1f}" font-size="12" fill="currentColor">{n}</text>')
    return svg(190, 160, "".join(d))

v2 = naloga(
    2, ["geometrijski_liki_telesa", "funkcije", "diferencialni_racun"], 14,
    r"Na krožnici s polmerom \(4\) in središčem \(S\) ležijo točke \(A\), \(B\), \(C\) in \(D\), tako da sta kota \(BAD\) in \(ABC\) "
    r"prava. Velikost kota \(\varphi = \angle CSD\) je odvisna od izbire točk (slika kaže eno možnost)." + predor()
    + r"2.1. Dokaži, da je ploščina osenčenega območja v odvisnosti od \(\varphi\) (v radianih) enaka \(S(\varphi) = 24\sin\varphi + 8\varphi\). (4 točke)<br>"
    r"2.2. Pri katerem topem kotu \(\varphi\) je ploščina osenčenega območja največja? Kot zaokroži na desetinko stopinje. (4 točke)<br>"
    r"2.3. Slika kaže tudi prečni prerez predora. Krožnica ima polmer \(4\) m, predor je širok \(|AB| = 4\) m in dolg \(150\) m. "
    r"Ukrivljen strop in obe steni bodo prebarvali; za \(40\ \mathrm{m^2}\) porabijo \(5\) litrov barve. Ali bo \(330\) litrov barve dovolj? "
    r"Odgovor utemelji. (6 točk)",
    r"2.2. \(\varphi \approx 109{,}5^\circ\) &nbsp; 2.3. ne, potrebujejo približno \(338\) litrov",
    [
        ("ABCD je pravokotnik, AC in BD sta premera", "Prava kota pri A in B sta obodna kota nad premeroma BD in AC (Talesov izrek)."),
        ("∠ASB = ∠CSD = φ,  ∠BSC = ∠ASD = π − φ", "Sovršna kota pri S sta enaka; sosednja kota se dopolnjujeta do π."),
        ("S<sub>ASB</sub> + S<sub>BSC</sub> + S<sub>ASD</sub> = 3 · " + U("1", "2") + " · 4 · 4 · sin φ = 24 sin φ", "Ploščina trikotnika iz dveh stranic in vmesnega kota; sin(π − φ) = sin φ."),
        ("S<sub>izsek</sub> = " + U("1", "2") + " · 4<sup>2</sup> · φ = 8φ", "Ploščina krožnega izseka nad lokom CD."),
        ("!2.1  S(φ) = 24 sin φ + 8φ", "Osenčeno območje so trije trikotniki in izsek."),
        ("S '(φ) = 24 cos φ + 8 = 0  ⇒  cos φ = −" + U("1", "3"), "Stacionarne točke: odvod je 0."),
        ("!2.2  φ ≈ 109,5°", "S '' = −24 sin φ < 0, zato je to lokalni maksimum."),
        ("|AB| = 2r sin " + U("φ", "2") + "  ⇒  sin " + U("φ", "2") + " = " + U("1", "2") + ",  φ = " + U("π", "3"), "Tetiva AB pripada središčnemu kotu φ."),
        ("|AD| = " + K("8<sup>2</sup> − 4<sup>2</sup>") + " = 4" + K("3") + " m", "BD je premer dolžine 8; Pitagorov izrek v trikotniku ABD."),
        ("l = 2 · 4" + K("3") + " + 4 · " + U("π", "3") + " ≈ 18,045 m", "Obseg prereza, ki ga barvamo: dve steni in lok CD."),
        ("P = 18,045 · 150 ≈ 2706,8 m<sup>2</sup>", ""),
        ("!2.3  " + U("2706,8", "40") + " · 5 ≈ 338 l > 330 l: barve ne bo dovolj", "Sklepni račun."),
    ],
)

l3 = math.log(3)
v3 = naloga(
    3, ["funkcije", "diferencialni_racun"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dana je funkcija \(f: \mathbb{R} \to \mathbb{R}\), \(f(x) = 3^{-\frac{x}{2}}\).<br>"
    r"3.1. Nariši graf funkcije \(f\). (1 točka)<br>"
    r"3.2. Brez računala izračunaj enačbo normale na graf \(f\) v presečišču grafa s premico \(y = 3\). (5 točk)<br>"
    r"3.3. Zapiši predpis inverzne funkcije \(f^{-1}\). Izračunaj \(f^{-1}\left(\frac{1}{3}\right)\), \(f(1)\) in \(f^{-1}(1)\) ter dokaži, da ima "
    r"enačba \(f(x) = f^{-1}(x)\) na intervalu \(\left[\frac{1}{3}, 1\right]\) vsaj eno rešitev. (4 točke)<br>"
    r"3.4. Izračunaj \(\displaystyle\lim_{h \to 0} \frac{f(-2 + h) - f(-2)}{h}\). (2 točki)",
    r"3.2. \(y = \frac{2}{3\ln 3}(x + 2) + 3\) &nbsp; 3.3. \(f^{-1}(x) = -2\log_3 x\); \(2\), \(\frac{\sqrt{3}}{3}\), \(0\) &nbsp; "
    r"3.4. \(-\frac{3\ln 3}{2}\)",
    [
        ("@slika", graf([(lambda x: 3 ** (-x / 2), MODRA)], (-4, 4), (-1, 6), tocke=[(0, 1, ""), (-2, 3, "")], sirina=240, visina=220)),
        ("!3.1  padajoča eksponentna funkcija skozi (0, 1) in (−2, 3)", "Osnova je 3^(−1/2) < 1."),
        ("3<sup>−x/2</sup> = 3  ⇒  x = −2,  T(−2, 3)", "Osnovi sta enaki, zato izenačimo eksponenta."),
        ("f '(x) = −" + U("ln 3", "2") + " · 3<sup>−x/2</sup>,  f '(−2) = −" + U("3 ln 3", "2"), "Odvod eksponentne funkcije in verižno pravilo."),
        ("k<sub>n</sub> = −" + U("1", "f '(−2)") + " = " + U("2", "3 ln 3"), "Normala je pravokotna na tangento: produkt smernih koeficientov je −1."),
        ("!3.2  y = " + U("2", "3 ln 3") + "(x + 2) + 3", ""),
        ("y = 3<sup>−x/2</sup>  ⇒  −" + U("x", "2") + " = log<sub>3</sub> y  ⇒  x = −2 log<sub>3</sub> y", "Inverzno funkcijo dobimo z zamenjavo vlog x in y (definicija logaritma)."),
        ("!f<sup>−1</sup>(x) = −2 log<sub>3</sub> x;  f<sup>−1</sup>(" + U("1", "3") + ") = 2,  f(1) = " + U("1", K("3")) + ",  f<sup>−1</sup>(1) = 0", ""),
        ("h(x) = f(x) − f<sup>−1</sup>(x):  h(" + U("1", "3") + ") = 3<sup>−1/6</sup> − 2 < 0,  h(1) = " + U("1", K("3")) + " > 0", "Razlika obeh funkcij je zvezna in na krajiščih spremeni predznak."),
        ("!zato ima h na [" + U("1", "3") + ", 1] ničlo: enačba ima rešitev", "Zvezna funkcija, ki spremeni predznak, ima vmes ničlo."),
        ("!3.4  limita = f '(−2) = −" + U("3 ln 3", "2"), "Limita diferenčnega količnika je odvod v točki."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

v4 = naloga(
    4, "zaporedja_vrste", 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Za realno število \(x\) je dano geometrijsko zaporedje s prvim členom \(x\) in "
    r"drugim členom \(x^3 - 2x\).<br>"
    r"4.1. Brez računala poišči vse \(x\), za katere je drugi člen enak \(4\). (2 točki)<br>"
    r"4.2. Brez računala poišči vse \(x\), za katere je pripadajoča geometrijska vrsta konvergentna. (7 točk)<br>"
    r"4.3. Naj bo \(x = \frac{3}{2}\) in \(a_n\) splošni člen zaporedja. Poišči najmanjše naravno število \(n\), za katero je "
    r"\(\displaystyle\sum_{i=1}^{\infty} a_i - \sum_{i=1}^{n} a_i < \frac{1}{100}\). (3 točke)",
    r"4.1. \(x = 2\) &nbsp; 4.2. \(x \in (-\sqrt{3}, -1) \cup \{0\} \cup (1, \sqrt{3})\) &nbsp; 4.3. \(n = 4\)",
    [
        ("4.1  x<sup>3</sup> − 2x − 4 = 0", ""),
        ("(x − 2)(x<sup>2</sup> + 2x + 2) = 0", "Ena ničla je 2 (preizkus), nato deljenje polinomov (Hornerjev algoritem)."),
        ("!x = 2", "Kvadratni faktor ima negativno diskriminanto D = 4 − 8 < 0."),
        ("x = 0: vsi členi so 0, vrsta konvergira", "Poseben primer."),
        ("x ≠ 0: q = " + U("x<sup>3</sup> − 2x", "x") + " = x<sup>2</sup> − 2", "Kvocient geometrijskega zaporedja."),
        ("|x<sup>2</sup> − 2| < 1  ⇔  1 < x<sup>2</sup> < 3", "Geometrijska vrsta konvergira, ko je |q| < 1."),
        ("!x ∈ (−" + K("3") + ", −1) ∪ {0} ∪ (1, " + K("3") + ")", ""),
        ("x = " + U("3", "2") + ":  a<sub>1</sub> = " + U("3", "2") + ",  q = " + U("1", "4") + ",  s = " + U("3/2", "1 − 1/4") + " = 2", "Vsota geometrijske vrste a₁/(1 − q)."),
        ("s − s<sub>n</sub> = " + U("a<sub>1</sub> q<sup>n</sup>", "1 − q") + " = 2 · (" + U("1", "4") + ")<sup>n</sup> < " + U("1", "100"), "Razlika je vsota preostalih členov (vsota geometrijskega zaporedja)."),
        ("4<sup>n</sup> > 200", ""),
        ("!n = 4", "4³ = 64 < 200, 4⁴ = 256 > 200."),
    ],
)

POLA2 = [v1, v2, v3, v4]
