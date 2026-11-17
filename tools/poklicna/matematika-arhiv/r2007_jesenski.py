# Jesenski rok 2007 (uradna pola RIC P072-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2007, "jesenski", "torek, 28. avgust 2007"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"Točka \(A\) je presečišče premice \(y = 3x + 2\) z ordinatno osjo. Izračunaj razdaljo med točko \(A\) in točko \(B(4, 5)\).",
    r"\(d = 5\)",
    [
        ("A(0, 2)", "Na ordinatni osi je x = 0.", "premica"),
        ("d = " + K("(4 − 0)<sup>2</sup> + (5 − 2)<sup>2</sup>") + " = " + K("16 + 9"), "", "razdalja"),
        ("!d = 5", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\left(-3a^{\frac{1}{2}}b^{-1}\right)^2 \cdot \left(a^3 b^{-3}\right)^{-1}\).",
    r"\(9a^{-2}b = \dfrac{9b}{a^2}\)",
    [
        ("(−3a<sup>1/2</sup>b<sup>−1</sup>)<sup>2</sup> = 9ab<sup>−2</sup>", "Kvadriramo vsak faktor.", "potence"),
        ("(a<sup>3</sup>b<sup>−3</sup>)<sup>−1</sup> = a<sup>−3</sup>b<sup>3</sup>", ""),
        ("!9ab<sup>−2</sup> · a<sup>−3</sup>b<sup>3</sup> = 9a<sup>−2</sup>b = " + U("9b", "a<sup>2</sup>"), "Pri množenju potenc z isto osnovo eksponente seštejemo."),
    ],
)


def lik_a3():
    s, o = 18, 20
    x0, y0 = o, o + 2 * s
    w, h = 12 * s, 4 * s
    R = 2 * s
    t = [f'<path d="M {x0} {y0} A {R} {R} 0 0 1 {x0 + 2 * R} {y0} L {x0 + w} {y0} L {x0 + w} {y0 + h} L {x0} {y0 + h} Z" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{x0}" y1="{y0}" x2="{x0 + 2 * R}" y2="{y0}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(x0 + 2 * R + 4 * s, y0 - 5, "8 cm", 11), napis(x0 + w + 5, y0 + h / 2 + 4, "4 cm", 11, sidro="start"),
         napis(x0 + w / 2, y0 + h + 15, "12 cm", 11)]
    return svg(x0 + w + 45, y0 + h + 25, "".join(t), opis="Pravokotnik s polkrogom")


a3 = naloga(
    "A3", "obsegi_ploscine", 4,
    r"Izračunaj obseg lika na skici: pravokotniku \(12\) cm \(\times\) \(4\) cm je na zgornji stranici pridan polkrog. Rezultat zaokroži na milimeter natančno." + lik_a3(),
    r"\(o = 28 + 2\pi \approx 34{,}3\) cm",
    [
        ("premer polkroga: 12 − 8 = 4 cm  ⇒  r = 2 cm", ""),
        ("lok polkroga: πr = 2π cm", "Dolžina polovice krožnice.", "krog"),
        ("o = 12 + 4 + 8 + 4 + 2π", "Premer polkroga ni del roba lika."),
        ("!o = 28 + 2π ≈ 34,3 cm", "To je 343 mm."),
    ],
)

a4 = naloga(
    "A4", "kvadratna_funkcija", 4,
    r"Če osemkratnik nekega števila zmanjšamo za \(16\), dobimo kvadrat tega števila. Izračunaj to število.",
    r"\(4\)",
    [
        ("8x − 16 = x<sup>2</sup>", ""),
        ("x<sup>2</sup> − 8x + 16 = 0  ⇒  (x − 4)<sup>2</sup> = 0", "", "kvadratna"),
        ("!x = 4", "Preizkus: 8 · 4 − 16 = 16 = 4²."),
    ],
)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Dan je polinom \(p(x) = 3(x - 2)^2 (x + 1)\). Zapiši stopnjo polinoma, vodilni člen in prosti člen.",
    r"stopnja \(3\), vodilni člen \(3x^3\), prosti člen \(12\)",
    [
        ("!stopnja: 2 + 1 = 3", "Stopnje faktorjev seštejemo."),
        ("!vodilni člen: 3 · x<sup>2</sup> · x = 3x<sup>3</sup>", "Zmnožimo vodilne člene faktorjev."),
        ("!prosti člen: p(0) = 3 · 4 · 1 = 12", ""),
    ],
)

a6 = naloga(
    "A6", "zaporedja_pm", 5,
    r"Določi \(x\) tako, da bodo \(x + 3\), \(x\), \(x - 2\) prvi trije členi geometrijskega zaporedja. Zapiši člene zaporedja.",
    r"\(x = 6\): \(9, 6, 4\)",
    [
        ("x<sup>2</sup> = (x + 3)(x − 2)", "", "geometrijsko"),
        ("x<sup>2</sup> = x<sup>2</sup> + x − 6  ⇒  x = 6", ""),
        ("!9, 6, 4", "Količnik je q = 2/3."),
    ],
)

a7 = naloga(
    "A7", "eksponentna_logaritemska", 5,
    r"Tabeliraj funkcijo \(f(x) = \log_2 x\) za \(x = 1\), \(x = 4\) in \(x = 10\)." + tabela(["x", "1", "4", "10"], [["f(x)", "", "", ""]]),
    r"\(0\), \(2\), \(\approx 3{,}32\)",
    [
        ("log<sub>2</sub> 1 = 0,  log<sub>2</sub> 4 = 2", "2⁰ = 1, 2² = 4.", "logaritem"),
        ("log<sub>2</sub> 10 = " + U("log 10", "log 2") + " = " + U("1", "log 2") + " ≈ 3,32", "Prehod na desetiški logaritem.", "log_pravila"),
        ("@slika", tabela(["x", "1", "4", "10"], [["f(x)", "0", "2", "≈ 3,32"]])),
    ],
)


def presek():
    A, B, V = (30, 170), (190, 170), (110, 20)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {V[0]},{V[1]}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{V[0]}" y1="{V[1]}" x2="{V[0]}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<path d="M 103.8 31.6 A 13 13 0 0 0 116.2 31.6" fill="none" stroke="{RDECA}"/>',
         napis(110, 52, "φ", 12, RDECA), napis(158, 90, "17 cm", 11, sidro="start"), napis(110, 186, "16 cm", 11), napis(115, 120, "v", 12, sidro="start")]
    return svg(225, 195, "".join(t), opis="Osni presek stožca")


a8 = naloga(
    "A8", "povrsine_prostornine", 5,
    r"Osni presek pokončnega stožca je enakokraki trikotnik z osnovnico \(16\) cm in krakoma \(17\) cm. Izračunaj višino stožca in kot pri vrhu osnega preseka." + presek(),
    r"\(v = 15\) cm, \(\varphi \approx 56^\circ 9'\)",
    [
        ("v = " + K("17<sup>2</sup> − 8<sup>2</sup>") + " = " + K("225"), "Višina razpolovi osnovnico.", "pitagora"),
        ("!v = 15 cm", ""),
        ("sin " + U("φ", "2") + " = " + U("8", "17") + "  ⇒  " + U("φ", "2") + " ≈ 28,07°", "", "kotne"),
        ("!φ ≈ 56,14° = 56° 9′", ""),
    ],
)

TEK = {12: 1, 13: 3, 14: 6, 15: 4, 16: 4, 17: 2}

a9 = naloga(
    "A9", "statistika_pm", 5,
    r"Na razrednem tekmovanju v teku na \(100\) m so dosegli naslednje rezultate v sekundah (izmišljeni podatki): "
    r"\(12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17\). "
    r"Izračunaj povprečni rezultat in odstotek tekmovalcev, ki so dosegli boljši rezultat od povprečja.",
    r"\(14{,}65\) s; \(50\,\%\)",
    [
        ("vsota: 12 + 3 · 13 + 6 · 14 + 4 · 15 + 4 · 16 + 2 · 17 = 293", "", "statistika"),
        ("!x̄ = 293 : 20 = 14,65 s", ""),
        ("boljši od povprečja: 12, 13 in 14 s  ⇒  1 + 3 + 6 = 10 tekmovalcev", "Boljši rezultat pomeni krajši čas."),
        ("!" + U("10", "20") + " · 100 % = 50 %", "", "odstotki"),
    ],
)

# ------------------------------------------------------------------ 2. del


def stirikotnik(X, Y):
    P = [(0, 0), (6, 0), (6, 4), (0, 6)]
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in P)
    t = f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>'
    t += f'<line x1="{X(6):.1f}" y1="{Y(0):.1f}" x2="{X(0):.1f}" y2="{Y(6):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>'
    for (x, y), n, dx, dy in zip(P, ["O", "A", "B", "C"], [-12, 5, 6, 6], [14, 14, -4, -4]):
        t += tocka(X, Y, x, y, n, dx, dy)
    return t


b1 = naloga(
    "B1", "geometrija_ravnine", 15,
    r"Točke \(A(6, 0)\), \(B(6, 4)\), \(C(0, 6)\) in koordinatno izhodišče \(O\) so oglišča štirikotnika.<br>"
    r"1.1. Natančno nariši štirikotnik in izračunaj njegovo ploščino. (6 točk)<br>"
    r"1.2. Izračunaj vse notranje kote štirikotnika. (6 točk)<br>"
    r"1.3. Kolikšna je dolžina daljše diagonale? (3 točke)",
    r"1.1. \(30\) &nbsp; 1.2. \(90^\circ, 90^\circ, \approx 108^\circ 26', \approx 71^\circ 34'\) &nbsp; 1.3. \(6\sqrt{2} \approx 8{,}49\)",
    [
        "## 1.1",
        ("@slika", mreza((-1, 8), (-1, 7), stirikotnik, sirina=280)),
        ("OABC je pravokotni trapez z vzporednima stranicama OC = 6 in AB = 4 ter višino OA = 6", ""),
        ("!S = " + U("6 + 4", "2") + " · 6 = 30", "", "ploscine"),
        "## 1.2",
        ("∠O = ∠A = 90°", "Stranici ležita na koordinatnih oseh oziroma sta vzporedni z njima."),
        ("k<sub>BC</sub> = " + U("6 − 4", "0 − 6") + " = −" + U("1", "3"), "", "premica"),
        ("BC z vodoravnico oklepa kot δ: tan δ = " + U("1", "3") + "  ⇒  δ ≈ 18,43°", "Kot pri C dopolnjuje δ do 90°, ker je stranica CO navpična.", "kotne"),
        ("!∠C ≈ 90° − 18,43° = 71,57° = 71° 34′", ""),
        ("!∠B ≈ 180° − 71,57° = 108,43° = 108° 26′", "Kota ob kraku BC trapeza sta suplementarna."),
        "## 1.3",
        ("|OB| = " + K("36 + 16") + " = " + K("52") + " ≈ 7,21", "", "razdalja"),
        ("!|AC| = " + K("36 + 36") + " = 6" + K("2") + " ≈ 8,49", "Daljša je diagonala AC."),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 15,
    r"Pri zidavi \(30\) m visokega tovarniškega dimnika stane prvi meter \(6000\) EUR, vsak naslednji meter pa \(2500\) EUR več od prejšnjega.<br>"
    r"2.1. Koliko stane zadnji meter dimnika? (6 točk)<br>"
    r"2.2. Koliko stane zidava celega dimnika? (4 točke)<br>"
    r"2.3. Ali bi lahko za \(160\,000\) EUR zgradili prvih deset metrov dimnika? Odgovor računsko utemelji. (5 točk)",
    r"2.1. \(78\,500\) EUR &nbsp; 2.2. \(1\,267\,500\) EUR &nbsp; 2.3. ne, potrebovali bi \(172\,500\) EUR",
    [
        "## 2.1",
        ("a<sub>1</sub> = 6000,  d = 2500,  n = 30", "Cene metrov tvorijo aritmetično zaporedje.", "aritmeticno"),
        ("!a<sub>30</sub> = 6000 + 29 · 2500 = 78 500 EUR", ""),
        "## 2.2",
        ("!s<sub>30</sub> = " + U("30", "2") + " · (6000 + 78 500) = 1 267 500 EUR", ""),
        "## 2.3",
        ("s<sub>10</sub> = " + U("10", "2") + " · (2 · 6000 + 9 · 2500) = 5 · 34 500 = 172 500 EUR", ""),
        ("!ne, 172 500 EUR > 160 000 EUR", "Manjkalo bi 12 500 EUR."),
    ],
)

PB3 = lambda x: 0.5 * x * x - 2 * x - 1
LB3 = lambda x: x - 1


def risba_b3(X, Y):
    t = krivulja(X, Y, PB3, -1.9, 6.9, MODRA) + krivulja(X, Y, LB3, -2, 8, RDECA)
    t += tocka(X, Y, 0, -1, "A", -14, -4) + tocka(X, Y, 6, 5, "B", -16, -4) + tocka(X, Y, 2, -3, "T", 6, 12)
    return t


b3 = naloga(
    "B3", "kvadratna_funkcija", 15,
    r"Dani sta parabola \(y = \frac{1}{2}x^2 - 2x - 1\) in premica \(y = x - 1\).<br>"
    r"3.1. Parabolo in premico natančno nariši v isti koordinatni sistem. (8 točk)<br>"
    r"3.2. Izračunaj abscisi presečišč parabole in premice. (4 točke)<br>"
    r"3.3. Za katere \(x\) leži premica nad parabolo? (3 točke)",
    r"3.2. \(x_1 = 0\), \(x_2 = 6\) &nbsp; 3.3. \(x \in (0, 6)\)",
    [
        "## 3.1",
        ("teme: p = " + U("2", "2 · ½") + " = 2,  q = 2 − 4 − 1 = −3  ⇒  T(2, −3)", "", "teme"),
        ("ničli: x<sup>2</sup> − 4x − 2 = 0  ⇒  x = 2 ± " + K("6") + " (≈ −0,45 in 4,45)", "Enačbo pomnožimo z 2.", "kvadratna"),
        ("@slika", mreza((-2, 8), (-4, 10), risba_b3, sirina=280)),
        "## 3.2",
        (U("1", "2") + "x<sup>2</sup> − 2x − 1 = x − 1  ⇒  " + U("1", "2") + "x<sup>2</sup> − 3x = 0", ""),
        ("x(" + U("1", "2") + "x − 3) = 0", ""),
        ("!x<sub>1</sub> = 0,  x<sub>2</sub> = 6", ""),
        "## 3.3",
        ("!x ∈ (0, 6)", "Med presečiščema je parabola pod premico, ker je odprta navzgor.", "neenacba"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
