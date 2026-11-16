# Zimski rok 2021 (uradna pola RIC P213-C101-1-1, izpit 2. februarja 2022)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2021, "zimski", "sreda, 2. februar 2022"

# ------------------------------------------------------------------ 1. del
TEMP = [("2010", "−1,5"), ("2011", "0,3"), ("2012", "−0,6"), ("2013", "−0,9"), ("2014", "0,2"),
        ("2015", "0,7"), ("2016", "−0,2"), ("2017", "−0,4"), ("2018", "0,4"), ("2019", "0,5")]

a1 = naloga(
    "A1", "statistika_pm", 4,
    r"V preglednici je povprečna letna temperatura na planinski postaji od leta 2010 do leta 2019."
    + tabela(["leto", "povprečna letna temperatura [°C]"], [list(v) for v in TEMP])
    + r"Izračunaj aritmetično sredino in mediano povprečne letne temperature za to obdobje. Kolikokrat v drugi polovici obdobja "
    r"(2015–2019) je bila povprečna letna temperatura nad mediano?",
    r"\(\bar{x} = -0{,}15\) °C, \(Me = 0\) °C, trikrat",
    [
        ("vsota = −1,5 + 0,3 − 0,6 − 0,9 + 0,2 + 0,7 − 0,2 − 0,4 + 0,4 + 0,5 = −1,5", ""),
        ("!x̄ = −1,5 : 10 = −0,15 °C", "Vsoto podatkov delimo s številom podatkov.", "statistika"),
        ("urejeno: −1,5; −0,9; −0,6; −0,4; −0,2; 0,2; 0,3; 0,4; 0,5; 0,7", "Za mediano podatke uredimo po velikosti."),
        ("!Me = " + U("−0,2 + 0,2", "2") + " = 0 °C", "Podatkov je 10, zato je mediana povprečje 5. in 6. podatka."),
        ("!2015–2019: 0,7; −0,2; −0,4; 0,4; 0,5 → nad mediano trikrat", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\dfrac{a^2 - 4a}{(a - 4)(a + 4)} : \dfrac{a}{a^2 - 2a - 24}\) za tiste vrednosti \(a\), za katere je izraz definiran.",
    r"\(a - 6\)",
    [
        ("a<sup>2</sup> − 4a = a(a − 4)", "Izpostavimo skupni faktor."),
        ("a<sup>2</sup> − 2a − 24 = (a − 6)(a + 4)", "Vietovo pravilo: −6 · 4 = −24, −6 + 4 = −2.", "vieta"),
        (U("a(a − 4)", "(a − 4)(a + 4)") + " · " + U("(a − 6)(a + 4)", "a"), "Deljenje z ulomkom je množenje z obratno vrednostjo."),
        ("!= a − 6", "Okrajšamo a, (a − 4) in (a + 4)."),
    ],
)


def slika_a3(X, Y):
    return (f'<line x1="{X(-4):.1f}" y1="{Y(-1):.1f}" x2="{X(2):.1f}" y2="{Y(3):.1f}" stroke="{MODRA}" stroke-width="2"/>'
            + tocka(X, Y, -4, -1, "A", -12, -4) + tocka(X, Y, 2, 3, "B", 6, -4))

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Zapiši koordinati središča daljice \(AB\) na sliki in izračunaj dolžino daljice \(AB\)." + mreza((-6, 4), (-3, 5), slika_a3, sirina=280),
    r"\(S(-1, 1)\), \(|AB| = 2\sqrt{13} \approx 7{,}21\)",
    [
        ("A(−4, −1),  B(2, 3)", "Koordinati preberemo s slike."),
        ("!S(" + U("−4 + 2", "2") + ", " + U("−1 + 3", "2") + ") = S(−1, 1)", "Središče daljice: povprečje koordinat."),
        ("|AB| = " + K("(2 + 4)<sup>2</sup> + (3 + 1)<sup>2</sup>") + " = " + K("52"), "", "razdalja"),
        ("!|AB| = 2" + K("13") + " ≈ 7,21", ""),
    ],
)

a4 = naloga(
    "A4", "kvadratna_funkcija", 4,
    r"Na sliki je graf funkcije \(f(x) = ax^2 + bx + c\). Pri vsaki trditvi izberi pravilni odgovor A, B ali C."
    + graf([(lambda x: x * x - 2 * x - 3, MODRA)], (-3, 5), (-5, 5), sirina=260, visina=260)
    + r"4.1. Diskriminanta \(D\) funkcije \(f\) je: A \(D < 0\), B \(D = 0\), C \(D > 0\).<br>"
    r"4.2. Vodilni koeficient \(a\) funkcije \(f\) je: A \(a < 0\), B \(a = 0\), C \(a > 0\).<br>"
    r"4.3. Odvod funkcije \(f\) pri \(x = -5\) je: A \(f'(-5) < 0\), B \(f'(-5) = 0\), C \(f'(-5) > 0\).<br>"
    r"4.4. Funkcija \(f\) je negativna na intervalu: A \((-\infty, -1)\), B \((-1, 3)\), C \([-1, 3]\).",
    r"4.1. C &nbsp; 4.2. C &nbsp; 4.3. A &nbsp; 4.4. B",
    [
        ("!4.1. C: D > 0", "Graf seka os x v dveh točkah (−1 in 3), zato ima f dve realni ničli."),
        ("!4.2. C: a > 0", "Parabola je odprta navzgor."),
        ("!4.3. A: f '(−5) < 0", "Levo od temena (x = 1) funkcija pada, zato je odvod negativen."),
        ("!4.4. B: (−1, 3)", "Med ničlama je graf pod osjo x; v ničlah je f(x) = 0, zato krajišča ne spadajo zraven."),
    ],
)


def slika_a5(X, Y):
    return (f'<rect x="{X(-2):.1f}" y="{Y(1.5):.1f}" width="{X(1) - X(-2):.1f}" height="{Y(-3) - Y(1.5):.1f}" fill="{MODRA}" fill-opacity="0.25"/>'
            + f'<line x1="{X(-2):.1f}" y1="{Y(1.5):.1f}" x2="{X(-2):.1f}" y2="{Y(-3):.1f}" stroke="{MODRA}" stroke-width="2"/>'
            + f'<line x1="{X(1):.1f}" y1="{Y(1.5):.1f}" x2="{X(1):.1f}" y2="{Y(-3):.1f}" stroke="{MODRA}" stroke-width="2" stroke-dasharray="5 4"/>'
            + f'<line x1="{X(-2):.1f}" y1="{Y(1.5):.1f}" x2="{X(1):.1f}" y2="{Y(1.5):.1f}" stroke="{MODRA}" stroke-width="2"/>')

a5 = naloga(
    "A5", "linearna_funkcija", 4,
    r"V koordinatni sistem nariši množico točk \((x, y)\), za katere velja \(-2 \le x < 1\) in \(y \le \frac{3}{2}\).",
    r"Navpični pas med \(x = -2\) (vključno) in \(x = 1\) (brez), pod premico \(y = \frac{3}{2}\) (vključno).",
    [
        ("−2 ≤ x < 1: navpični pas; premica x = −2 spada zraven (polna), x = 1 ne (črtkana)", ""),
        ("y ≤ " + U("3", "2") + ": točke na premici y = 1,5 in pod njo (polna črta)", ""),
        ("@slika", mreza((-4, 3), (-3, 3), slika_a5, sirina=260)),
        ("!Množica je presek obeh pogojev: osenčeni del, ki se navzdol nadaljuje neomejeno.", ""),
    ],
)

a6 = naloga(
    "A6", "zaporedja_pm", 4,
    r"Izračunaj količnik geometrijskega zaporedja, katerega drugi člen je \(6\), tretji člen pa \(4\). Izračunaj tudi prvi in šesti člen tega zaporedja.",
    r"\(q = \frac{2}{3}\), \(a_1 = 9\), \(a_6 = \frac{32}{27}\)",
    [
        ("!q = " + U("a<sub>3</sub>", "a<sub>2</sub>") + " = " + U("4", "6") + " = " + U("2", "3"), "Količnik sosednjih členov."),
        ("!a<sub>1</sub> = " + U("a<sub>2</sub>", "q") + " = 6 : " + U("2", "3") + " = 9", ""),
        ("!a<sub>6</sub> = a<sub>1</sub>q<sup>5</sup> = 9 · " + U("32", "243") + " = " + U("32", "27"), "", "geometrijsko"),
    ],
)

a7 = naloga(
    "A7", "odvod_pm", 4,
    r"Dana je funkcija \(f(x) = 2\cos x + \tan x\). Izračunaj \(f'\left(\frac{\pi}{6}\right)\).",
    r"\(f'\left(\frac{\pi}{6}\right) = \frac{1}{3}\)",
    [
        ("f '(x) = −2 sin x + " + U("1", "cos<sup>2</sup> x"), "Odvoda kosinusa in tangensa sta na listu s formulami.", "odvod"),
        ("sin " + U("π", "6") + " = " + U("1", "2") + ",  cos<sup>2</sup> " + U("π", "6") + " = " + U("3", "4"), ""),
        ("!f '(" + U("π", "6") + ") = −1 + " + U("4", "3") + " = " + U("1", "3"), ""),
    ],
)

a8 = naloga(
    "A8", "ulomki_odstotki", 5,
    r"Jan je za malico pojedel \(140\) g jogurta s sadjem. Razmerje med jogurtom in sadjem je bilo \(5 : 2\). Četrtina sadja so bile banane, "
    r"ostalo pa jagode. Koliko gramov jagod je Jan pojedel?",
    r"\(30\) g",
    [
        ("5 + 2 = 7 delov,  en del = 140 : 7 = 20 g", "Razdelitev v razmerju."),
        ("sadje: 2 · 20 = 40 g", ""),
        ("jagode: " + U("3", "4") + " · 40 g", "Banane so četrtina, jagode tri četrtine sadja."),
        ("!30 g jagod", ""),
    ],
)

a9 = naloga(
    "A9", "polinomi_racionalna", 5,
    r"Reši enačbo \(x^3 - 2x^2 - 3x + 6 = 0\). Zapiši točne rešitve.",
    r"\(x_1 = 2\), \(x_{2,3} = \pm\sqrt{3}\)",
    [
        ("x<sup>2</sup>(x − 2) − 3(x − 2) = 0", "Združimo po dva člena in izpostavimo."),
        ("(x − 2)(x<sup>2</sup> − 3) = 0", ""),
        ("!x<sub>1</sub> = 2,  x<sub>2</sub> = " + K("3") + ",  x<sub>3</sub> = −" + K("3"), "Produkt je 0, ko je vsaj en faktor 0."),
    ],
)

a10 = naloga(
    "A10", "stevila_deljivost", 6,
    r"Dani sta števili \(a = 615\) in \(b = 2775\).<br>"
    r"10.1. Zapiši praštevilska razcepa števil \(a\) in \(b\). (2 točki)<br>"
    r"10.2. Zapiši vse pozitivne delitelje števila \(a\) in vse praštevilske delitelje števila \(b\). (2 točki)<br>"
    r"10.3. Izračunaj največji skupni delitelj in najmanjši skupni večkratnik števil \(a\) in \(b\). (2 točki)",
    r"10.1. \(615 = 3 \cdot 5 \cdot 41\), \(2775 = 3 \cdot 5^2 \cdot 37\) &nbsp; 10.2. \(1, 3, 5, 15, 41, 123, 205, 615\); \(3, 5, 37\) &nbsp; "
    r"10.3. \(D = 15\), \(v = 113\,775\)",
    [
        "## 10.1",
        ("!615 = 3 · 5 · 41,  2775 = 3 · 5<sup>2</sup> · 37", "Zaporedno delimo s praštevili.", "D_v"),
        "## 10.2",
        ("!delitelji a: 1, 3, 5, 15, 41, 123, 205, 615", "Vsi produkti prafaktorjev (vsak največ enkrat)."),
        ("!praštevilski delitelji b: 3, 5, 37", ""),
        "## 10.3",
        ("!D(a, b) = 3 · 5 = 15", "Skupni prafaktorji z manjšim eksponentom."),
        ("!v(a, b) = 3 · 5<sup>2</sup> · 37 · 41 = 113 775", "Vsi prafaktorji z večjim eksponentom."),
    ],
)


def trikotnik_a11():
    k = 11
    A, B, C = (30, 170), (30 + 8 * k, 170), (30, 170 - 12 * k)
    D = (30, C[1] + 9 * k)
    E = (30 + 6 * k, D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {E[0]},{E[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.12"/>',
         f'<line x1="{D[0]}" y1="{D[1]}" x2="{E[0]}" y2="{E[1]}" stroke="{MODRA}" stroke-width="2"/>',
         f'<rect x="{A[0]}" y="{A[1] - 10}" width="10" height="10" fill="none" stroke="currentColor"/>',
         napis(A[0] - 10, A[1] + 4, "A"), napis(B[0] + 10, B[1] + 4, "B"), napis(C[0] - 10, C[1] + 4, "C"),
         napis(D[0] - 10, D[1] + 4, "D"), napis(E[0] + 10, E[1] + 2, "E")]
    return svg(150, 185, "".join(t), opis="Pravokotni trikotnik ABC z daljico DE")

a11 = naloga(
    "A11", "trikotnik_kotne", 6,
    r"Pravokotni trikotnik \(ABC\) ima pravi kot v oglišču \(A\). Stranici merita \(|AB| = 8\) cm in \(|AC| = 12\) cm. Daljica \(DE\), vzporedna "
    r"stranici \(AB\), je dolga \(6\) cm (glej sliko)." + trikotnik_a11()
    + r"Kako imenujemo štirikotnik \(ABED\)? Izračunaj dolžino daljice \(DC\) in velikost kota \(CBA\).",
    r"pravokotni trapez; \(|DC| = 9\) cm; \(\beta \approx 56{,}31^\circ\)",
    [
        ("!ABED je (pravokotni) trapez", "Ima par vzporednih stranic AB ∥ DE, krak AD je pravokoten na osnovnici."),
        (U("|DC|", "|AC|") + " = " + U("|DE|", "|AB|") + "  ⇒  |DC| = 12 · " + U("6", "8"), "Trikotnika DEC in ABC sta podobna (vzporedni stranici)."),
        ("!|DC| = 9 cm", ""),
        ("tan β = " + U("|AC|", "|AB|") + " = " + U("12", "8") + " = 1,5", "Nasprotna in priležna kateta kota pri B.", "kotne"),
        ("!β ≈ 56,31° ≈ 56°19'", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", ["zaporedja_pm", "kombinatorika_verjetnost"], 10,
    r"Lan ima \(12\) različnih palčk, katerih dolžine se zaporedoma razlikujejo za \(2\) cm. Najkrajša palčka je dolga \(1\) cm, najdaljša pa "
    r"\(23\) cm. Palčke polaga drugo za drugo v ravno vrsto in tako sestavlja nize.<br>"
    r"1.1. Izračunaj dolžino niza iz štirih najkrajših palčk in dolžino niza iz vseh \(12\) palčk. (4 točke)<br>"
    r"1.2. Lan sestavi niz iz vseh \(12\) palčk v naključnem vrstnem redu. Na koliko načinov lahko to stori? Kolikšna je verjetnost, da na "
    r"začetku niza ležijo štiri najkrajše palčke po vrsti od najkrajše do daljše (\(1\) cm, \(3\) cm, \(5\) cm, \(7\) cm)? (6 točk)",
    r"1.1. \(16\) cm, \(144\) cm &nbsp; 1.2. \(12! = 479\,001\,600\), \(P = \frac{1}{11\,880}\)",
    [
        "## 1.1",
        ("!1 + 3 + 5 + 7 = 16 cm", ""),
        ("s<sub>12</sub> = " + U("12", "2") + " · (2 · 1 + 11 · 2) = 6 · 24", "Dolžine tvorijo aritmetično zaporedje z a₁ = 1 in d = 2.", "aritmeticno"),
        ("!s<sub>12</sub> = 144 cm", ""),
        "## 1.2",
        ("!P<sub>12</sub> = 12! = 479 001 600", "Vrstni red 12 različnih palčk: permutacije.", "kombinatorika"),
        ("ugodni: prva štiri mesta so določena, ostalih 8 palčk poljubno: 8! = 40 320", ""),
        ("!P = " + U("8!", "12!") + " = " + U("1", "12 · 11 · 10 · 9") + " = " + U("1", "11 880"), "", "verjetnost"),
    ],
)


def slika_b2(X, Y):
    return (krivulja(X, Y, lambda x: 0.5 ** x, -2.3, 5, MODRA) + krivulja(X, Y, lambda x: math.log2(x), 0.2, 5, RDECA)
            + tocka(X, Y, 0, 1, "f(0) = 1", 6, -4) + tocka(X, Y, 1, 0)
            + f'<text x="{X(-2.2):.1f}" y="{Y(4.6):.1f}" font-size="12" fill="{MODRA}">f</text>'
            + f'<text x="{X(4.5):.1f}" y="{Y(2.6):.1f}" font-size="12" fill="{RDECA}">g</text>')

b2 = naloga(
    "B2", "eksponentna_logaritemska", 10,
    r"Dani sta funkciji \(f(x) = \left(\frac{1}{2}\right)^x\) in \(g(x) = \log_2 x\).<br>"
    r"2.1. Izračunaj vrednost izraza \(f(-3) - \frac{1}{2} \cdot g(16)\). (4 točke)<br>"
    r"2.2. Zapiši začetno vrednost funkcije \(f\) in ničlo funkcije \(g\). Nariši grafa funkcij \(f\) in \(g\) v isti koordinatni sistem. (6 točk)",
    r"2.1. \(6\) &nbsp; 2.2. \(f(0) = 1\), ničla \(g\): \(x = 1\)",
    [
        "## 2.1",
        ("f(−3) = (" + U("1", "2") + ")<sup>−3</sup> = 2<sup>3</sup> = 8", "Negativni eksponent obrne ulomek."),
        ("g(16) = log<sub>2</sub> 16 = 4", "2⁴ = 16.", "logaritem"),
        ("!8 − " + U("1", "2") + " · 4 = 6", ""),
        "## 2.2",
        ("!začetna vrednost f(0) = 1", "Vsaka potenca z eksponentom 0 je 1."),
        ("!ničla g: log<sub>2</sub> x = 0  ⇒  x = 1", ""),
        ("@slika", mreza((-3, 5), (-3, 5), slika_b2, sirina=280)),
        (None, "f pada in ima vodoravno asimptoto y = 0; g narašča, je definirana za x > 0 in ima navpično asimptoto x = 0."),
    ],
)


def mreza_b3():
    k = 5
    a, b, v1, v2 = 24 * k, 18 * k, 15 * k, 16.97 * k
    x0, y0 = 30 + v2, 20 + v1
    t = [f'<rect x="{x0:.1f}" y="{y0:.1f}" width="{a}" height="{b}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{x0:.1f},{y0:.1f} {x0 + a:.1f},{y0:.1f} {x0 + a / 2:.1f},{y0 - v1:.1f}" fill="none" stroke="currentColor"/>',
         f'<polygon points="{x0:.1f},{y0 + b:.1f} {x0 + a:.1f},{y0 + b:.1f} {x0 + a / 2:.1f},{y0 + b + v1:.1f}" fill="none" stroke="currentColor"/>',
         f'<polygon points="{x0:.1f},{y0:.1f} {x0:.1f},{y0 + b:.1f} {x0 - v2:.1f},{y0 + b / 2:.1f}" fill="none" stroke="currentColor"/>',
         f'<polygon points="{x0 + a:.1f},{y0:.1f} {x0 + a:.1f},{y0 + b:.1f} {x0 + a + v2:.1f},{y0 + b / 2:.1f}" fill="none" stroke="currentColor"/>',
         f'<line x1="{x0 + a / 2:.1f}" y1="{y0:.1f}" x2="{x0 + a / 2:.1f}" y2="{y0 - v1:.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="{x0 + a:.1f}" y1="{y0 + b / 2:.1f}" x2="{x0 + a + v2:.1f}" y2="{y0 + b / 2:.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         napis(x0 + a / 2 + 14, y0 - v1 / 2, "v₁", 12, RDECA), napis(x0 + a + v2 / 2, y0 + b / 2 - 6, "v₂", 12, RDECA),
         napis(x0 + a / 2, y0 + 16, "a", 12), napis(x0 + 10, y0 + b / 2 + 4, "b", 12)]
    return svg(round(2 * v2 + a + 60), round(2 * v1 + b + 40), "".join(t), opis="Mreža piramide s pravokotno osnovno ploskvijo")

b3 = naloga(
    "B3", "povrsine_prostornine", 10,
    r"Podjetje pakira bonbone v škatle v obliki piramide. Osnovna ploskev je pravokotnik s stranicama \(a = 24\) cm in \(b = 18\) cm. Stranski "
    r"višini merita \(v_1 = 15\) cm (na stranico \(a\)) in \(v_2 = 16{,}97\) cm (na stranico \(b\)). Na sliki je mreža piramide."
    + mreza_b3()
    + r"3.1. Izračunaj površino piramide. (4 točke)<br>"
    r"3.2. Bonboni zasedejo \(55\,\%\) prostornine škatle. Izračunaj prostornino, ki jo zavzamejo bonboni. (6 točk)",
    r"3.1. \(P \approx 1097{,}5\ \mathrm{cm^2}\) &nbsp; 3.2. \(V_b \approx 950{,}4\ \mathrm{cm^3}\)",
    [
        "## 3.1",
        ("S = a · b = 24 · 18 = 432 cm<sup>2</sup>", "Osnovna ploskev."),
        ("S<sub>pl</sub> = 2 · " + U("a · v<sub>1</sub>", "2") + " + 2 · " + U("b · v<sub>2</sub>", "2") + " = 24 · 15 + 18 · 16,97 = 360 + 305,46", "Plašč so štirje trikotniki, po dva skladna."),
        ("!P = 432 + 665,46 ≈ 1097,5 cm<sup>2</sup>", "", "telesa"),
        "## 3.2",
        ("v<sup>2</sup> = v<sub>1</sub><sup>2</sup> − (" + U("b", "2") + ")<sup>2</sup> = 225 − 81 = 144  ⇒  v = 12 cm", "Višina piramide, stranska višina v₁ in polovica stranice b tvorijo pravokotni trikotnik.", "pitagora"),
        ("V = " + U("1", "3") + " · 432 · 12 = 1728 cm<sup>3</sup>", ""),
        ("!V<sub>b</sub> = 0,55 · 1728 ≈ 950,4 cm<sup>3</sup>", "", "odstotki"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
