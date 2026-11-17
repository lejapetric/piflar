# Jesenski rok 2012 (uradne pole RIC: m122-401-1-1, m122-402-1-1, m122-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2012, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["algebrski_izrazi_enacbe_neenacbe", "potence_koreni"], 6,
    r"V množici realnih števil reši enačbe. Rešitve zapiši točno.<br>"
    r"1.1. \(3x + 1 = 0\) (1 točka) &nbsp; 1.2. \(3x^2 - 1 = 0\) (2 točki) &nbsp; 1.3. \(3x^3 + 1 = 0\) (1 točka) &nbsp; "
    r"1.4. \(3x^4 - 1 = 0\) (2 točki)",
    r"1.1. \(-\frac{1}{3}\) &nbsp; 1.2. \(\pm\frac{\sqrt{3}}{3}\) &nbsp; 1.3. \(-\frac{1}{\sqrt[3]{3}}\) &nbsp; 1.4. \(\pm\frac{1}{\sqrt[4]{3}}\)",
    [
        ("!1.1  x = −" + U("1", "3"), "Linearna enačba."),
        ("!1.2  x<sup>2</sup> = " + U("1", "3") + "  ⇒  x = ±" + U("1", K("3")) + " = ±" + U(K("3"), "3"), "Kvadratni koren ima dve realni rešitvi; racionaliziramo imenovalec."),
        ("!1.3  x<sup>3</sup> = −" + U("1", "3") + "  ⇒  x = −" + U("1", K("3", "3")), "Liha stopnja: natanko ena realna rešitev."),
        ("!1.4  x<sup>4</sup> = " + U("1", "3") + "  ⇒  x = ±" + U("1", K("3", "4")), "Soda stopnja: dve realni rešitvi."),
    ],
)

def premice2(X, Y):
    t = ""
    for f, a, b in ((lambda x: 3 * x + 3, -2, 1 / 3), (lambda x: -3 * x + 3, -1 / 3, 2), (lambda x: x - 1, -2, 3), (lambda x: -x - 1, -3, 2)):
        t += krivulja(X, Y, f, a, b, MODRA)
    pts = [(0, 3), (1, 0), (0, -1), (-1, 0)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)
    return f'<polygon points="{pot}" fill="{RDECA}" fill-opacity="0.2"/>' + t

n2 = naloga(
    2, ["pravokotni_koordinatni_sistem_ravnina", "geometrijski_liki_telesa"], 7,
    r"V koordinatni sistem nariši premice \(y = 3x + 3\), \(y = -3x + 3\), \(y = x - 1\) in \(y = -x - 1\). Natančno izračunaj obseg in "
    r"ploščino lika, ki ga omejujejo te premice.",
    r"\(o = 2\sqrt{10} + 2\sqrt{2}\), \(S = 4\)",
    [
        ("@slika", mreza((-3, 3), (-3, 4), premice2, sirina=240)),
        ("oglišča: (0, 3), (1, 0), (0, −1), (−1, 0)", "Presečišča sosednjih premic (deltoid)."),
        ("stranici " + K("1 + 9") + " = " + K("10") + " in " + K("1 + 1") + " = " + K("2"), "Razdalja med točkama."),
        ("!o = 2" + K("10") + " + 2" + K("2"), ""),
        ("!S = " + U("e · f", "2") + " = " + U("4 · 2", "2") + " = 4", "Diagonali deltoida sta pravokotni (na oseh)."),
    ],
)

n3 = naloga(
    3, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Poenostavi izraz \(\dfrac{2}{a^2 - 4} - \dfrac{1}{a^2 - 2a}\), \(a \ne 2\), \(a \ne -2\), \(a \ne 0\).",
    r"\(\frac{1}{a(a + 2)}\)",
    [
        ("a<sup>2</sup> − 4 = (a − 2)(a + 2),  a<sup>2</sup> − 2a = a(a − 2)", "Razlika kvadratov in izpostavljanje."),
        (U("2a − (a + 2)", "a(a − 2)(a + 2)") + " = " + U("a − 2", "a(a − 2)(a + 2)"), "Skupni imenovalec."),
        ("!" + U("1", "a(a + 2)"), "Okrajšamo z a − 2 ≠ 0."),
    ],
)

n4 = naloga(
    4, "funkcije", 7,
    r"Dana je funkcija \(f(x) = \dfrac{3}{x^2 - 1}\). Zapiši definicijsko območje, izračunaj \(f(2)\) in \(f(\sqrt{5})\). Za katere \(x\) ima "
    r"funkcija vrednost \(\frac{3}{8}\)? Vsi rezultati naj bodo točni.",
    r"\(D = \mathbb{R} \setminus \{-1, 1\}\), \(f(2) = 1\), \(f(\sqrt{5}) = \frac{3}{4}\), \(x = \pm 3\)",
    [
        ("!D = ℝ \\ {−1, 1}", "Imenovalec ne sme biti 0."),
        ("!f(2) = " + U("3", "3") + " = 1,  f(" + K("5") + ") = " + U("3", "4"), ""),
        (U("3", "x<sup>2</sup> − 1") + " = " + U("3", "8") + "  ⇒  x<sup>2</sup> − 1 = 8", ""),
        ("!x = ±3", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n5 = naloga(
    5, "diferencialni_racun", 7,
    r"Izračunaj odvode funkcij.<br>"
    r"5.1. \(f_1(x) = 3x^4 - 2x + 5\) (1 točka) &nbsp; 5.2. \(f_2(x) = 5^x\) (1 točka) &nbsp; 5.3. \(f_3(x) = \frac{x}{x + 2}\), \(x \ne -2\) (2 točki)<br>"
    r"5.4. \(f_4(x) = \ln(3x - 2)\), \(x > \frac{2}{3}\) (1 točka) &nbsp; 5.5. \(f_5(x) = (x + 2)e^x\) (2 točki)",
    r"\(12x^3 - 2\); \(5^x \ln 5\); \(\frac{2}{(x + 2)^2}\); \(\frac{3}{3x - 2}\); \((x + 3)e^x\)",
    [
        ("!f<sub>1</sub>'(x) = 12x<sup>3</sup> − 2", "Odvod potence."),
        ("!f<sub>2</sub>'(x) = 5<sup>x</sup> ln 5", "Odvod eksponentne funkcije."),
        ("!f<sub>3</sub>'(x) = " + U("(x + 2) − x", "(x + 2)<sup>2</sup>") + " = " + U("2", "(x + 2)<sup>2</sup>"), "Odvod kvocienta."),
        ("!f<sub>4</sub>'(x) = " + U("3", "3x − 2"), "Odvod logaritma in verižno pravilo."),
        ("!f<sub>5</sub>'(x) = e<sup>x</sup> + (x + 2)e<sup>x</sup> = (x + 3)e<sup>x</sup>", "Odvod produkta."),
    ],
)

n6 = naloga(
    6, "geometrijski_liki_telesa", 5,
    r"Dan je enakokraki trapez \(ABCD\) z osnovnicama \(|AB| = 16\) in \(|CD| = 10\), kraka merita \(6\). Nosilki krakov se sekata v točki \(E\), "
    r"tako da nastane enakokraki trikotnik \(ABE\). Izračunaj dolžino daljice \(BE\). Skica je obvezna.",
    r"\(|BE| = 16\)",
    [
        ("trikotnika DCE in ABE sta podobna", "CD ∥ AB: trikotnika se ujemata v kotih."),
        (U("|CE|", "|BE|") + " = " + U("10", "16") + " = " + U("5", "8"), "Razmerje istoležnih stranic."),
        ("|BE| − |CE| = 6  ⇒  |BE| − " + U("5", "8") + "|BE| = 6", "Krak trapeza je razlika daljic."),
        ("!|BE| = 16", ""),
    ],
)

def elipsa7(X, Y):
    return (parametricna(X, Y, lambda t: 3 + 5 * math.cos(t), lambda t: 1 + 3 * math.sin(t), 0, 2 * math.pi, MODRA)
            + "".join(tocka(X, Y, x, y, n) for x, y, n in ((-2, 1, "A"), (8, 1, "B"), (3, -2, "C"), (3, 4, "D"))))

n7 = naloga(
    7, "stoznice", 7,
    r"Elipsa na sliki ima temena \(A(-2, 1)\), \(B(8, 1)\), \(C(3, -2)\) in \(D(3, 4)\). Zapiši enačbo elipse in izračunaj razdaljo med njenima "
    r"goriščema." + mreza((-3, 9), (-3, 5), elipsa7, sirina=330),
    r"\(\frac{(x - 3)^2}{25} + \frac{(y - 1)^2}{9} = 1\), \(|F_1F_2| = 8\)",
    [
        ("S(3, 1),  a = 5,  b = 3", "Središče je razpolovišče AB; polosi sta polovici AB in CD."),
        ("!" + U("(x − 3)<sup>2</sup>", "25") + " + " + U("(y − 1)<sup>2</sup>", "9") + " = 1", "Premaknjena elipsa."),
        ("e = " + K("25 − 9") + " = 4", "Linearna ekscentričnost elipse."),
        ("!|F<sub>1</sub>F<sub>2</sub>| = 2e = 8", ""),
    ],
)

n8 = naloga(
    8, "funkcije", 8,
    r"Reši enačbo \(2\sin^2 x + 3\cos x - 3 = 0\).",
    r"\(x = 2k\pi\), \(x = \pm\frac{\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("2(1 − cos<sup>2</sup> x) + 3 cos x − 3 = 0", "sin²x + cos²x = 1."),
        ("2cos<sup>2</sup> x − 3 cos x + 1 = 0  ⇒  (2 cos x − 1)(cos x − 1) = 0", "Kvadratna enačba za cos x."),
        ("cos x = 1  ⇒  x = 2kπ", ""),
        ("cos x = " + U("1", "2") + "  ⇒  x = ±" + U("π", "3") + " + 2kπ", "Enačbe s kotnimi funkcijami."),
        ("!x = 2kπ  ali  x = ±" + U("π", "3") + " + 2kπ,  k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, "stevilske_mnozice", 6,
    r"Poišči kompleksno število \(z = a + bi\), \(a, b \in \mathbb{R}\), za katero velja \(3z + i\bar{z} = 9 + 11i\).",
    r"\(z = 2 + 3i\)",
    [
        ("3(a + bi) + i(a − bi) = (3a + b) + (a + 3b)i", "Konjugirana vrednost z̄ = a − bi; i² = −1."),
        (SISTEM("3a + b = 9", "a + 3b = 11"), "Kompleksni števili sta enaki, ko se ujemata realna in imaginarna dela."),
        ("8b = 24  ⇒  b = 3,  a = 2", ""),
        ("!z = 2 + 3i", ""),
    ],
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 6,
    r"Iz črk besede PLANETI sestavljamo nove besede; vsakič uporabimo vse črke, vsako enkrat.<br>"
    r"10.1. Koliko različnih besed lahko sestavimo? (2 točki)<br>"
    r"10.2. V koliko besedah stojijo vsi soglasniki skupaj? (2 točki)<br>"
    r"10.3. Kolikšna je verjetnost, da se naključno sestavljena beseda začne s samoglasnikom in konča s soglasnikom? (2 točki)",
    r"10.1. \(5040\) &nbsp; 10.2. \(576\) &nbsp; 10.3. \(\frac{2}{7}\)",
    [
        ("!10.1  7! = 5040", "Permutacije sedmih različnih črk."),
        ("soglasniki P, L, N, T kot blok + samoglasniki A, E, I", "Blok obravnavamo kot eno črko."),
        ("!10.2  4! · 4! = 576", "Razporedimo 4 enote, nato soglasnike znotraj bloka."),
        ("3 · 4 · 5! = 1440", "Prva črka: 3 samoglasniki, zadnja: 4 soglasniki, vmes 5 poljubnih."),
        ("!10.3  P = " + U("1440", "5040") + " = " + U("2", "7"), ""),
    ],
)

n11 = naloga(
    11, "vektorji_ravnina_prostor", 7,
    r"Dani sta točki \(A(2, 0, -1)\) in \(B(4, 3, 5)\) ter vektor \(\vec{b} = (1, 2, 2)\).<br>"
    r"11.1. Zapiši vektor \(\vec{a} = \overrightarrow{AB}\) s komponentami. (2 točki)<br>"
    r"11.2. Izračunaj skalarni produkt \(\vec{a} \cdot \vec{b}\). (2 točki)<br>"
    r"11.3. Izračunaj dolžino vektorja \(\vec{b}\). (1 točka)<br>"
    r"11.4. Na kotno minuto natančno izračunaj kot med vektorjema \(\vec{a}\) in \(\vec{b}\). (2 točki)",
    r"11.1. \((2, 3, 6)\) &nbsp; 11.2. \(20\) &nbsp; 11.3. \(3\) &nbsp; 11.4. \(17^\circ 45'\)",
    [
        ("!" + V("a") + " = (2, 3, 6)", "Končna minus začetna točka."),
        ("!" + V("a") + " · " + V("b") + " = 2 + 6 + 12 = 20", "Skalarni produkt v koordinatah."),
        ("!|" + V("b") + "| = " + K("1 + 4 + 4") + " = 3", "Dolžina vektorja."),
        ("cos φ = " + U("20", "7 · 3") + " = " + U("20", "21"), "Kot med vektorjema; |a| = √(4 + 9 + 36) = 7."),
        ("!φ ≈ 17°45'", ""),
    ],
)

n12 = naloga(
    12, "integralski_racun", 8,
    r"Izračunaj pozitivno realno število \(a\), da bo ploščina lika med parabolo \(y = x^2 + a\) in abscisno osjo na intervalu \([-1, 2]\) "
    r"enaka \(18\).",
    r"\(a = 5\)",
    [
        ("p = " + INT("2", "−1") + "(x<sup>2</sup> + a) dx = (" + U("x<sup>3</sup>", "3") + " + ax)" + MEJA("2", "−1"), "Parabola leži nad osjo x (a > 0)."),
        ("p = " + U("8 + 1", "3") + " + 3a = 3 + 3a = 18", ""),
        ("!a = 5", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def f_v1(x):
    return 8 * x / (x * x + 4)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun"], 14,
    r"Nalogo reši brez računala. Dana je funkcija \(f(x) = \dfrac{8x}{x^2 + 4}\).<br>"
    r"1.1. Zapiši ničlo, enačbo asimptote in stacionarne točke ter nariši graf funkcije. Zapiši definicijsko območje in zalogo vrednosti. (5 točk)<br>"
    r"1.2. Zapiši vsa presečišča grafa s premico \(y = x\). Izračunaj tangens kota med premico in grafom v presečišču z največjo absciso. (5 točk)<br>"
    r"1.3. Za katera realna števila \(k\) ima premica \(y = kx\) z grafom funkcije tri presečišča? Utemelji. (4 točke)",
    r"1.1. ničla \(0\), asimptota \(y = 0\), \(T_{\max}(2, 2)\), \(T_{\min}(-2, -2)\), \(D_f = \mathbb{R}\), \(Z_f = [-2, 2]\) &nbsp; "
    r"1.2. \((0, 0)\), \((2, 2)\), \((-2, -2)\); \(\tan\varphi = 1\) &nbsp; 1.3. \(0 < k < 2\)",
    [
        ("ničla x = 0;  asimptota y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("f '(x) = " + U("8(x<sup>2</sup> + 4) − 16x<sup>2</sup>", "(x<sup>2</sup> + 4)<sup>2</sup>") + " = " + U("8(4 − x<sup>2</sup>)", "(x<sup>2</sup> + 4)<sup>2</sup>"), "Odvod kvocienta."),
        ("!stacionarni točki: maksimum (2, 2), minimum (−2, −2)", "f' menja predznak pri x = ±2."),
        ("@slika", graf([(f_v1, MODRA), (lambda x: x, RDECA)], (-7, 7), (-3, 3), tocke=[(2, 2, ""), (-2, -2, ""), (0, 0, "")], sirina=360, visina=200)),
        ("!D<sub>f</sub> = ℝ,  Z<sub>f</sub> = [−2, 2]", "Imenovalec ni nikoli 0; funkcija zavzame vrednosti med minimumom in maksimumom."),
        ("8x = x(x<sup>2</sup> + 4)  ⇒  x(x<sup>2</sup> − 4) = 0", ""),
        ("!presečišča (0, 0), (2, 2), (−2, −2)", ""),
        ("f '(2) = 0: tangenta je vodoravna, premica ima naklon 1", ""),
        ("!tan φ = |" + U("1 − 0", "1 + 0") + "| = 1  (φ = 45°)", "Kot med krivuljama je kot med tangentama."),
        ("8x = kx(x<sup>2</sup> + 4)  ⇒  x = 0  ali  x<sup>2</sup> = " + U("8", "k") + " − 4", ""),
        (U("8", "k") + " − 4 > 0  ⇒  0 < k < 2", "Za tri presečišča mora imeti x² = 8/k − 4 dve različni neničelni rešitvi."),
        ("!0 < k < 2", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v2 = naloga(
    2, ["zaporedja_vrste", "geometrijski_liki_telesa"], 14,
    r"Obvezna naloga. Reši naloge iz aritmetičnih zaporedij.<br>"
    r"2.1. Za katera realna števila \(x\) je zaporedje \(x + 1,\ 3x - 1,\ x^2 + 1\) aritmetično? (4 točke)<br>"
    r"2.2. Kolikšna je vsota vseh naravnih števil med \(100\) in \(1000\), ki so deljiva s \(13\)? (3 točke)<br>"
    r"2.3. Dolžine stranic trikotnika tvorijo aritmetično zaporedje, srednja meri \(5\ \mathrm{cm}\). Ploščina trikotnika je "
    r"\(\frac{15\sqrt{7}}{4}\ \mathrm{cm^2}\). Izračunaj dolžini najkrajše in najdaljše stranice. (4 točke)<br>"
    r"2.4. Zapiši prvi člen, diferenco in splošni člen aritmetičnega zaporedja, katerega vsota prvih \(n\) členov je \(S_n = 3n^2 - n\). (3 točke)",
    r"2.1. \(x = 1\) ali \(x = 4\) &nbsp; 2.2. \(37\,674\) &nbsp; 2.3. \(4\ \mathrm{cm}\) in \(6\ \mathrm{cm}\) &nbsp; 2.4. \(a_1 = 2\), \(d = 6\), \(a_n = 6n - 4\)",
    [
        ("2(3x − 1) = (x + 1) + (x<sup>2</sup> + 1)", "Srednji člen je aritmetična sredina sosednjih."),
        ("x<sup>2</sup> − 5x + 4 = 0  ⇒  (x − 1)(x − 4) = 0", ""),
        ("!2.1  x = 1 (2, 2, 2) ali x = 4 (5, 11, 17)", ""),
        ("104 = 13 · 8,  988 = 13 · 76:  76 − 8 + 1 = 69 členov", "Prvi in zadnji večkratnik števila 13 na intervalu."),
        ("!2.2  s = " + U("69", "2") + "(104 + 988) = 69 · 546 = 37 674", "Vsota členov aritmetičnega zaporedja."),
        ("stranice 5 − d, 5, 5 + d;  s = " + U("15", "2"), "Heronov obrazec."),
        ("S<sup>2</sup> = " + U("15", "2") + " · (" + U("5", "2") + " + d) · " + U("5", "2") + " · (" + U("5", "2") + " − d) = " + U("75", "4") + "(" + U("25", "4") + " − d<sup>2</sup>) = " + U("1575", "16"), ""),
        ("d<sup>2</sup> = 1", ""),
        ("!2.3  najkrajša 4 cm, najdaljša 6 cm", ""),
        ("a<sub>1</sub> = S<sub>1</sub> = 2", ""),
        ("a<sub>n</sub> = S<sub>n</sub> − S<sub>n − 1</sub> = 3n<sup>2</sup> − n − 3(n − 1)<sup>2</sup> + (n − 1) = 6n − 4", "Vsota prvih n členov minus vsota prvih n − 1 členov."),
        ("!2.4  a<sub>1</sub> = 2,  d = 6,  a<sub>n</sub> = 6n − 4", ""),
    ],
)

v3 = naloga(
    3, ["kombinatorika", "verjetnostni_racun"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V vrečki je deset listkov s števili od \(1\) do \(10\) (na vsakem drugo število). Andrej "
    r"naključno izvleče dva listka hkrati. Dogodki: \(A\) – na obeh listkih sta lihi števili, \(B\) – vsota števil je liha, \(C\) – zmnožek "
    r"števil je deljiv z \(10\).<br>"
    r"3.1. Izračunaj verjetnosti dogodkov \(A\), \(B\) in \(C\). (7 točk)<br>"
    r"3.2. Izračunaj pogojno verjetnost \(P(C \mid B)\). (2 točki)<br>"
    r"3.3. Andrej izvleče dva listka in ju vrne; poskus ponovi trikrat. Izračunaj verjetnost dogodka \(D\), da je listek s številom \(1\) "
    r"izvlekel natanko dvakrat. (3 točke)",
    r"3.1. \(P(A) = \frac{2}{9}\), \(P(B) = \frac{5}{9}\), \(P(C) = \frac{13}{45}\) &nbsp; 3.2. \(\frac{9}{25}\) &nbsp; 3.3. \(\frac{12}{125}\)",
    [
        (BINOM("10", "2") + " = 45", "Vseh izborov dveh listkov."),
        ("!P(A) = " + U(BINOM("5", "2"), "45") + " = " + U("10", "45") + " = " + U("2", "9"), "Lihih števil je 5."),
        ("!P(B) = " + U("5 · 5", "45") + " = " + U("5", "9"), "Vsota je liha, ko je eno število sodo in drugo liho."),
        ("par z 10: 9 parov;  5 s sodim številom 2, 4, 6, 8: 4 pari", "Zmnožek je deljiv z 10, ko vsebuje faktorja 2 in 5."),
        ("!P(C) = " + U("13", "45"), ""),
        ("C ∩ B: 10 z lihim (5 parov) in 5 s sodim (4 pari) = 9 parov", "Vsi ti pari imajo liho vsoto."),
        ("!3.2  P(C | B) = " + U("9/45", "25/45") + " = " + U("9", "25"), "Pogojna verjetnost."),
        ("p = P(listek 1 je izvlečen) = " + U("9", "45") + " = " + U("1", "5"), "Ugodni so pari, ki vsebujejo 1."),
        ("!3.3  P(D) = " + BINOM("3", "2") + " (" + U("1", "5") + ")<sup>2</sup> · " + U("4", "5") + " = " + U("12", "125"), "Bernoullijevo zaporedje poskusov."),
    ],
)

v4 = naloga(
    4, ["geometrijski_liki_telesa", "funkcije"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Pravilna štiristrana piramida ima osnovni rob dolžine \(4\). Sosednja stranska robova oklepata "
    r"kot \(2\varphi\) (\(0^\circ < \varphi < 45^\circ\)).<br>"
    r"4.1. Izrazi površino piramide s kotom \(\varphi\). (3 točke)<br>"
    r"4.2. Izračunaj kot \(\varphi\), pri katerem je prostornina piramide \(V = 16\). (3 točke)<br>"
    r"4.3. Pokaži, da je prostornina piramide \(V = \dfrac{32\sqrt{\cos 2\varphi}}{3\sin\varphi}\). (4 točke)<br>"
    r"4.4. Naj bo \(\varphi = 30^\circ\). Pokaži, da sta tedaj nasprotna stranska robova piramide pravokotna. (2 točki)",
    r"4.1. \(P = 16 + 16\cot\varphi\) &nbsp; 4.2. \(\varphi \approx 29{,}0^\circ\)",
    [
        ("v<sub>s</sub> = " + U("2", "tan φ") + " = 2 cot φ", "Višina stranske ploskve razpolovi kot 2φ in osnovni rob."),
        ("!4.1  P = 4<sup>2</sup> + 4 · " + U("4 · 2 cot φ", "2") + " = 16 + 16 cot φ", "Površina piramide: osnovna ploskev in štirje trikotniki."),
        ("v<sup>2</sup> = v<sub>s</sub><sup>2</sup> − 2<sup>2</sup> = 4 " + U("cos<sup>2</sup> φ − sin<sup>2</sup> φ", "sin<sup>2</sup> φ") + " = " + U("4 cos 2φ", "sin<sup>2</sup> φ"),
         "Pitagorov izrek v trikotniku z višino piramide in polovico osnovnega roba; kosinus dvojnega kota."),
        ("!4.3  V = " + U("1", "3") + " · 16 · " + U("2" + K("cos 2φ"), "sin φ") + " = " + U("32" + K("cos 2φ"), "3 sin φ"), "Prostornina piramide."),
        (U("32" + K("cos 2φ"), "3 sin φ") + " = 16  ⇒  4(1 − 2 sin<sup>2</sup> φ) = 9 sin<sup>2</sup> φ", "Kvadriramo; cos 2φ = 1 − 2 sin²φ."),
        ("sin<sup>2</sup> φ = " + U("4", "17"), ""),
        ("!4.2  φ ≈ 29,0°", ""),
        ("stranski rob s = " + U("2", "sin φ") + " = 4,  diagonala osnovne ploskve 4" + K("2"), "V stranski ploskvi: polovica osnovnega roba je s · sin φ."),
        ("!4.4  4<sup>2</sup> + 4<sup>2</sup> = (4" + K("2") + ")<sup>2</sup>  ⇒  kot med nasprotnima robovoma je 90°", "Obrat Pitagorovega izreka v diagonalnem prerezu."),
    ],
)

POLA2 = [v1, v2, v3, v4]
