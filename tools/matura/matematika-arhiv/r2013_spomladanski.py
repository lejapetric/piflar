# Spomladanski rok 2013 (uradne pole RIC: m131-401-1-1, m131-402-1-1, m131-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2013, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["pravokotni_koordinatni_sistem_ravnina", "funkcije"], 7,
    r"Zapiši eksplicitno obliko enačbe premice skozi točki \(A(-3, 5)\) in \(B(3, 1)\). Izračunaj ploščino trikotnika, ki ga premica oklepa "
    r"s koordinatnima osema.",
    r"\(y = -\frac{2}{3}x + 3\), \(S = \frac{27}{4}\)",
    [
        ("k = " + U("1 − 5", "3 + 3") + " = −" + U("2", "3"), "Smerni koeficient premice skozi dve točki."),
        ("!y = −" + U("2", "3") + "x + 3", "y − 1 = −2/3 (x − 3)."),
        ("presečišči z osema: (0, 3) in (" + U("9", "2") + ", 0)", "Začetna vrednost in ničla."),
        ("!S = " + U("1", "2") + " · 3 · " + U("9", "2") + " = " + U("27", "4"), "Pravokotni trikotnik s katetama na oseh."),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n2 = naloga(
    2, "geometrijski_liki_telesa", 5,
    r"V enakokrakem trikotniku \(ABC\) meri osnovnica \(c = |AB| = 12\), kot ob vrhu \(C\) pa \(64^\circ\). Izračunaj kota ob osnovnici in "
    r"dolžino kraka. Nariši skico.",
    r"\(\alpha = \beta = 58^\circ\), \(b \approx 11{,}32\)",
    [
        ("!α = β = " + U("180° − 64°", "2") + " = 58°", "Vsota notranjih kotov trikotnika; kota ob osnovnici sta enaka."),
        ("cos α = " + U("c/2", "b") + "  ⇒  b = " + U("6", "cos 58°"), "Višina na osnovnico jo razpolovi: pravokotni trikotnik."),
        ("!b ≈ 11,32", ""),
    ],
)

n3 = naloga(
    3, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Reši sistem neenačb \((x + 3)^2 < x^2 + 21\) in \(\frac{1 - 3x}{2} \le 5\).",
    r"\(x \in [-3, 2)\)",
    [
        ("x<sup>2</sup> + 6x + 9 < x<sup>2</sup> + 21  ⇒  6x < 12  ⇒  x < 2", "Kvadrat dvočlenika; linearna neenačba."),
        ("1 − 3x ≤ 10  ⇒  −3x ≤ 9  ⇒  x ≥ −3", "Pri deljenju z negativnim številom se znak obrne."),
        ("!x ∈ [−3, 2)", "Rešitev sistema je presek obeh rešitev."),
    ],
)

n4 = naloga(
    4, "stevilske_mnozice", 6,
    r"Pokaži, da je kompleksno število \(3 - i\sqrt{2}\) rešitev enačbe \(x^2 - 6x + 11 = 0\). Zapiši še drugo rešitev.",
    r"\(3 + i\sqrt{2}\)",
    [
        ("(3 − i" + K("2") + ")<sup>2</sup> = 9 − 6" + K("2") + " i − 2 = 7 − 6" + K("2") + " i", "Kvadrat dvočlenika, i² = −1."),
        ("7 − 6" + K("2") + " i − 18 + 6" + K("2") + " i + 11 = 0", "Vstavimo v enačbo."),
        ("!druga rešitev je 3 + i" + K("2"), "Enačba z realnimi koeficienti ima konjugirani kompleksni rešitvi (ali Vietovo pravilo: vsota je 6)."),
    ],
)

n5 = naloga(
    5, "diferencialni_racun", 7,
    r"Brez računala zapiši enačbo tangente na graf funkcije \(f(x) = \frac{3}{2}x^2 - 4x + \frac{5}{2}\) v presečišču grafa z osjo \(y\). "
    r"Kje tangenta seka os \(x\)?",
    r"\(y = -4x + \frac{5}{2}\); \(\left(\frac{5}{8}, 0\right)\)",
    [
        ("presečišče z osjo y: (0, " + U("5", "2") + ")", "Začetna vrednost f(0)."),
        ("f '(x) = 3x − 4,  f '(0) = −4", "Smerni koeficient tangente je vrednost odvoda."),
        ("!y = −4x + " + U("5", "2"), "Enačba tangente: y − f(x₀) = f'(x₀)(x − x₀)."),
        ("!−4x + " + U("5", "2") + " = 0  ⇒  x = " + U("5", "8"), "Ničla tangente."),
    ],
)

n6 = naloga(
    6, "funkcije", 8,
    r"Dana je funkcija \(f(x) = 2\sin\left(2x - \frac{\pi}{3}\right) + 1\). Zapiši presečišče grafa z ordinatno osjo in izračunaj ničle funkcije.",
    r"\((0, 1 - \sqrt{3})\); \(x = \frac{\pi}{12} + k\pi\), \(x = \frac{3\pi}{4} + k\pi\)",
    [
        ("!f(0) = 2 sin(−" + U("π", "3") + ") + 1 = −" + K("3") + " + 1:  (0, 1 − " + K("3") + ")", "Sinus je liha funkcija."),
        ("sin(2x − " + U("π", "3") + ") = −" + U("1", "2"), "Ničle: f(x) = 0."),
        ("2x − " + U("π", "3") + " = −" + U("π", "6") + " + 2kπ  ali  2x − " + U("π", "3") + " = " + U("7π", "6") + " + 2kπ", "Enačbe s kotnimi funkcijami."),
        ("!x = " + U("π", "12") + " + kπ  ali  x = " + U("3π", "4") + " + kπ,  k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

def krog7(X, Y):
    r = math.sqrt(5)
    return (parametricna(X, Y, lambda t: -3 + r * math.cos(t), lambda t: 2 + r * math.sin(t), 0, 2 * math.pi, MODRA)
            + f'<line x1="{X(-2):.1f}" y1="{Y(0):.1f}" x2="{X(-4):.1f}" y2="{Y(4):.1f}" stroke="{RDECA}" stroke-width="1.5"/>'
            + tocka(X, Y, -3, 2, "S") + tocka(X, Y, -2, 0, "A", dy=13) + tocka(X, Y, -4, 4, "B", dx=-14))

n7 = naloga(
    7, "stoznice", 8,
    r"Brez računala nariši krožnico \(x^2 + y^2 + 6x - 4y + 8 = 0\). Računsko pokaži, da točka \(A(-2, 0)\) leži na krožnici. Zapiši koordinati "
    r"točke \(B\), če je tetiva \(AB\) premer krožnice.",
    r"\(S(-3, 2)\), \(r = \sqrt{5}\); \(B(-4, 4)\)",
    [
        ("(x + 3)<sup>2</sup> + (y − 2)<sup>2</sup> = 9 + 4 − 8 = 5", "Dopolnimo do popolnih kvadratov: S(−3, 2), r = √5."),
        ("@slika", mreza((-6, 1), (-1, 5), krog7, sirina=260)),
        ("!4 + 0 − 12 − 0 + 8 = 0  ⇒  A leži na krožnici", "Koordinate točke ustrezajo enačbi krožnice."),
        ("S je razpolovišče AB:  " + V("r<sub>B</sub>") + " = 2" + V("r<sub>S</sub>") + " − " + V("r<sub>A</sub>"), "Središče premera je središče krožnice."),
        ("!B(−4, 4)", ""),
    ],
)

n8 = naloga(
    8, "vektorji_ravnina_prostor", 6,
    r"Dana sta vektorja \(\vec{a} = (3, -4)\) in \(\vec{b} = (6, -8)\). Izračunaj \(\vec{a} + \vec{b}\) in brez računala preveri, ali velja "
    r"\(|\vec{a} + \vec{b}| = |\vec{a}| + |\vec{b}|\).",
    r"\((9, -12)\); da, \(15 = 5 + 10\)",
    [
        ("!" + V("a") + " + " + V("b") + " = (9, −12)", "Seštevamo istoležne komponente."),
        ("|" + V("a") + " + " + V("b") + "| = " + K("81 + 144") + " = 15", "Dolžina vektorja."),
        ("|" + V("a") + "| = 5,  |" + V("b") + "| = 10", ""),
        ("!15 = 5 + 10: enakost velja", "Vektorja sta vzporedna in enako usmerjena (b = 2a)."),
    ],
)

n9 = naloga(
    9, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Iz črk besede ŠTEVILKA naključno izberemo tri različne črke. Izračunaj verjetnost dogodka \(A\), da so vse tri izbrane črke soglasniki, "
    r"in verjetnost dogodka \(B\), da je vsaj ena izbrana črka soglasnik.",
    r"\(P(A) = \frac{5}{28}\), \(P(B) = \frac{55}{56}\)",
    [
        ("8 različnih črk: 5 soglasnikov (Š, T, V, L, K) in 3 samoglasniki (E, I, A)", ""),
        (BINOM("8", "3") + " = 56", "Vseh izborov treh črk (kombinacije)."),
        ("!P(A) = " + U(BINOM("5", "3"), "56") + " = " + U("10", "56") + " = " + U("5", "28"), ""),
        ("!P(B) = 1 − " + U(BINOM("3", "3"), "56") + " = " + U("55", "56"), "Nasprotni dogodek: vse tri so samoglasniki."),
    ],
)

n10 = naloga(
    10, "zaporedja_vrste", 7,
    r"Drugi člen aritmetičnega zaporedja je \(\frac{5}{2}\), vsota kvadratov prvih treh členov pa \(\frac{107}{4}\). Izračunaj prvi člen in "
    r"diferenco zaporedja.",
    r"\(a_1 = \frac{1}{2}\), \(d = 2\) ali \(a_1 = \frac{9}{2}\), \(d = -2\)",
    [
        ("(a<sub>2</sub> − d)<sup>2</sup> + a<sub>2</sub><sup>2</sup> + (a<sub>2</sub> + d)<sup>2</sup> = 3a<sub>2</sub><sup>2</sup> + 2d<sup>2</sup>", "Člena ob a₂ izrazimo z a₂ in d."),
        ("3 · " + U("25", "4") + " + 2d<sup>2</sup> = " + U("107", "4") + "  ⇒  d<sup>2</sup> = 4", ""),
        ("!d = 2, a<sub>1</sub> = " + U("1", "2") + "  ali  d = −2, a<sub>1</sub> = " + U("9", "2"), "a₁ = a₂ − d."),
    ],
)

n11 = naloga(
    11, "integralski_racun", 7,
    r"Dana je funkcija \(f(x) = -x^2 + a\), \(a > 16\). Izračunaj \(a\), če je ploščina lika med grafom funkcije in osjo \(x\) na intervalu "
    r"\([1, 4]\) enaka \(33\).",
    r"\(a = 18\)",
    [
        ("p = " + INT("4", "1") + "(a − x<sup>2</sup>) dx = (ax − " + U("x<sup>3</sup>", "3") + ")" + MEJA("4", "1"), "Za a > 16 je funkcija na [1, 4] pozitivna."),
        ("p = 3a − " + U("64 − 1", "3") + " = 3a − 21 = 33", ""),
        ("!a = 18", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n12 = naloga(
    12, "funkcije", 7,
    r"Naj bo \(\log_b a = 3\). Izračunaj vrednost izraza \(\frac{1}{2}\log_b a^4 - 3\log_b \sqrt{a} + \log_b \frac{1}{a} + 2\log_b b^5\).",
    r"\(\frac{17}{2}\)",
    [
        (U("1", "2") + " · 4 · 3 = 6", "Logaritem potence: log aⁿ = n log a."),
        ("3 log<sub>b</sub> a<sup>1/2</sup> = 3 · " + U("1", "2") + " · 3 = " + U("9", "2"), "Koren zapišemo s potenco."),
        ("log<sub>b</sub> " + U("1", "a") + " = −3,  2 log<sub>b</sub> b<sup>5</sup> = 10", "log_b b = 1."),
        ("!6 − " + U("9", "2") + " − 3 + 10 = " + U("17", "2"), ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def f_v1(x):
    return 4 * x / (x * x + 3)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 16,
    r"Nalogo reši brez računala. Dana je funkcija \(f(x) = \dfrac{4x}{x^2 + 3}\).<br>"
    r"1.1. Zapiši definicijsko območje in nariši graf funkcije. (4 točke)<br>"
    r"1.2. Izračunaj tangens kota med grafom funkcije in premico \(y = x\) v presečišču s pozitivno absciso. (4 točke)<br>"
    r"1.3. Natančno izračunaj ploščino lika, ki ga omejujejo premica \(y = x\), graf funkcije \(f\), premica \(x = 3\) in os \(x\). (4 točke)<br>"
    r"1.4. Poišči točke na grafu, ki so od vodoravne asimptote oddaljene za \(1\). (4 točke)",
    r"1.1. \(D_f = \mathbb{R}\) &nbsp; 1.2. \(\frac{1}{3}\) &nbsp; 1.3. \(\frac{1}{2} + 2\ln 3\) &nbsp; 1.4. \((1, 1)\), \((3, 1)\), \((-1, -1)\), \((-3, -1)\)",
    [
        ("!D<sub>f</sub> = ℝ", "Imenovalec x² + 3 nima realnih ničel."),
        ("ničla x = 0, vodoravna asimptota y = 0, f je liha", "Stopnja števca je manjša od stopnje imenovalca."),
        ("@slika", graf([(f_v1, MODRA), (lambda x: x, RDECA)], (-6, 6), (-2, 2), tocke=[(1, 1, ""), (3, 1, "")], sirina=360, visina=180)),
        (U("4x", "x<sup>2</sup> + 3") + " = x  ⇒  x<sup>2</sup> + 3 = 4  ⇒  x = 1", "Presečišče s pozitivno absciso."),
        ("f '(x) = " + U("4(x<sup>2</sup> + 3) − 8x<sup>2</sup>", "(x<sup>2</sup> + 3)<sup>2</sup>") + " = " + U("12 − 4x<sup>2</sup>", "(x<sup>2</sup> + 3)<sup>2</sup>") + ",  f '(1) = " + U("1", "2"), "Odvod kvocienta."),
        ("!tan φ = |" + U("1 − 1/2", "1 + 1 · 1/2") + "| = " + U("1", "3"), "Kot med krivuljama je kot med tangentama."),
        ("p = " + U("1", "2") + " + " + INT("3", "1") + U("4x", "x<sup>2</sup> + 3") + " dx", "Do x = 1 lik omejuje premica y = x (trikotnik), nato graf f."),
        (INT("3", "1") + U("4x", "x<sup>2</sup> + 3") + " dx = 2 ln(x<sup>2</sup> + 3)" + MEJA("3", "1") + " = 2 ln " + U("12", "4"), "Uvedba nove spremenljivke t = x² + 3."),
        ("!p = " + U("1", "2") + " + 2 ln 3", ""),
        (U("4x", "x<sup>2</sup> + 3") + " = ±1", "Vodoravna asimptota je y = 0."),
        ("x<sup>2</sup> − 4x + 3 = 0  ali  x<sup>2</sup> + 4x + 3 = 0", ""),
        ("!(1, 1), (3, 1), (−1, −1), (−3, −1)", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v2 = naloga(
    2, "geometrijski_liki_telesa", 12,
    r"Obvezna naloga. Dan je pokončni krožni stožec s polmerom osnovne ploskve \(5\ \mathrm{cm}\) in višino \(12\ \mathrm{cm}\).<br>"
    r"2.1. Izračunaj točno površino stožca. (3 točke)<br>"
    r"2.2. Stožcu včrtamo pravilno štiristrano piramido (osnovna ploskev piramide je včrtana osnovni ploskvi stožca). Izračunaj njeno "
    r"prostornino. (3 točke)<br>"
    r"2.3. Stožcu očrtamo kroglo. Izračunaj njen polmer. (3 točke)<br>"
    r"2.4. Stožec z dvema pravokotnima ravninama skozi os razrežemo na štiri enake dele. Izračunaj točno površino enega dela. (3 točke)",
    r"2.1. \(90\pi\ \mathrm{cm^2}\) &nbsp; 2.2. \(200\ \mathrm{cm^3}\) &nbsp; 2.3. \(\frac{169}{24}\ \mathrm{cm}\) &nbsp; 2.4. \(\left(\frac{45\pi}{2} + 60\right)\ \mathrm{cm^2}\)",
    [
        ("s = " + K("25 + 144") + " = 13", "Pitagorov izrek v osnem prerezu."),
        ("!P = πr<sup>2</sup> + πrs = 25π + 65π = 90π cm<sup>2</sup>", "Površina stožca."),
        ("a = r" + K("2") + " = 5" + K("2") + ",  a<sup>2</sup> = 50", "Diagonala kvadrata je premer osnovne ploskve stožca."),
        ("!V = " + U("50 · 12", "3") + " = 200 cm<sup>3</sup>", "Prostornina piramide."),
        ("(12 − R)<sup>2</sup> + 5<sup>2</sup> = R<sup>2</sup>", "Središče krogle leži na osi; enako je oddaljeno od vrha in od roba osnovne ploskve."),
        ("!169 − 24R = 0  ⇒  R = " + U("169", "24") + " cm", ""),
        ("četrtina površine stožca + 2 trikotnika s katetama 5 in 12", "Novi ploskvi sta polovici osnega prereza."),
        ("!P = " + U("90π", "4") + " + 2 · " + U("5 · 12", "2") + " = " + U("45π", "2") + " + 60 cm<sup>2</sup>", ""),
    ],
)

v3 = naloga(
    3, ["algebrski_izrazi_enacbe_neenacbe", "stevilske_mnozice"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Reši naloge iz deljivosti.<br>"
    r"3.1. Z računom preveri, ali je polinom \(3x^3 - 5x - 14\) deljiv z \(x - 2\). (3 točke)<br>"
    r"3.2. Dokaži, da je vsota štirih potenc števila \(3\) z zaporednimi naravnimi eksponenti deljiva s \(40\). (3 točke)<br>"
    r"3.3. S popolno indukcijo dokaži, da \(3 \mid (n^3 + 2n)\) za vsako naravno število \(n\). (6 točk)",
    r"3.1. da",
    [
        ("p(2) = 24 − 10 − 14 = 0", "Izrek o ostanku: ostanek pri deljenju z x − 2 je p(2)."),
        ("!3.1  polinom je deljiv z x − 2", ""),
        ("3<sup>n</sup> + 3<sup>n + 1</sup> + 3<sup>n + 2</sup> + 3<sup>n + 3</sup> = 3<sup>n</sup>(1 + 3 + 9 + 27)", "Izpostavimo najnižjo potenco."),
        ("!3.2  = 40 · 3<sup>n</sup>, kar je deljivo s 40", ""),
        ("n = 1:  1 + 2 = 3", "Baza indukcije."),
        ("(n + 1)<sup>3</sup> + 2(n + 1) = (n<sup>3</sup> + 2n) + 3n<sup>2</sup> + 3n + 3", "Indukcijski korak: razvijemo kub dvočlenika."),
        ("!3.3  n³ + 2n je deljiv s 3 (indukcijska predpostavka), 3(n² + n + 1) tudi", "Vsota števil, deljivih s 3, je deljiva s 3."),
    ],
)

v4 = naloga(
    4, ["zaporedja_vrste", "algebrski_izrazi_enacbe_neenacbe"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Reši naloge iz zaporedij.<br>"
    r"4.1. Stranice pravokotnega trikotnika tvorijo aritmetično zaporedje z diferenco \(5\). Izračunaj stranice. (2 točki)<br>"
    r"4.2. Dokaži, da ima enačba \(ax^2 + 2bx + c = 0\) realne rešitve, če so \(a\), \(b\), \(c\) (\(a \ne 0\)) zaporedni členi aritmetičnega "
    r"zaporedja. (3 točke)<br>"
    r"4.3. Koliko rešitev ima enačba \(ax^2 + 2bx + c = 0\), če so \(a\), \(b\), \(c\) zaporedni členi geometrijskega zaporedja? (3 točke)<br>"
    r"4.4. Med štirimi realnimi števili prva tri tvorijo geometrijsko, zadnja tri pa aritmetično zaporedje. Vsota prvega in zadnjega je \(16\), "
    r"vsota srednjih dveh pa \(12\). Izračunaj ta števila. (4 točke)",
    r"4.1. \(15, 20, 25\) &nbsp; 4.3. eno (dvojno) rešitev &nbsp; 4.4. \(16, 8, 4, 0\) ali \(1, 3, 9, 15\)",
    [
        ("(a + 5)<sup>2</sup> = a<sup>2</sup> + (a − 5)<sup>2</sup>  ⇒  a<sup>2</sup> − 20a = 0", "Pitagorov izrek; srednja stranica je a."),
        ("!4.1  15, 20, 25", ""),
        ("D = 4b<sup>2</sup> − 4ac,  b = " + U("a + c", "2"), "Srednji člen aritmetičnega zaporedja je aritmetična sredina."),
        ("!4.2  D = (a + c)<sup>2</sup> − 4ac = (a − c)<sup>2</sup> ≥ 0", "Diskriminanta ni negativna, zato so rešitve realne."),
        ("!4.3  b<sup>2</sup> = ac  ⇒  D = 0: ena (dvojna) rešitev", "Pri geometrijskem zaporedju je b² = ac."),
        ("a, b, c, d:  b<sup>2</sup> = ac,  2c = b + d,  a + d = 16,  b + c = 12", ""),
        ("b = 12 − c,  d = 3c − 12,  a = 28 − 3c", ""),
        ("(12 − c)<sup>2</sup> = (28 − 3c)c  ⇒  c<sup>2</sup> − 13c + 36 = 0", ""),
        ("!c = 4: 16, 8, 4, 0;  c = 9: 1, 3, 9, 15", ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
