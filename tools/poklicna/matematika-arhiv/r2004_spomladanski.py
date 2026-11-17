# Spomladanski rok 2004 (uradna pola RIC P041-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2004, "spomladanski", "ponedeljek, 31. maj 2004"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Izračunaj natančno vrednost izraza \(\left(\frac{3}{4} \cdot \frac{8}{9} + \frac{1}{3}\right) : \frac{5}{6}\).",
    r"\(\frac{6}{5}\)",
    [
        (U("3", "4") + " · " + U("8", "9") + " = " + U("24", "36") + " = " + U("2", "3"), "Najprej množimo v oklepaju."),
        (U("2", "3") + " + " + U("1", "3") + " = 1", ""),
        ("!1 : " + U("5", "6") + " = " + U("6", "5"), ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Dana sta izraza \(A = 3x^2 - 6x - 24\) in \(B = x^3 + 8\). Razstavi ju v množici realnih števil.",
    r"\(A = 3(x - 4)(x + 2)\), \(B = (x + 2)(x^2 - 2x + 4)\)",
    [
        ("A = 3(x<sup>2</sup> − 2x − 8)", "Izpostavimo 3."),
        ("!A = 3(x − 4)(x + 2)", "Vietovo pravilo: −4 · 2 = −8, −4 + 2 = −2.", "vieta"),
        ("!B = x<sup>3</sup> + 2<sup>3</sup> = (x + 2)(x<sup>2</sup> − 2x + 4)", "Vsota kubov; kvadratni faktor nima realnih ničel (D < 0)."),
    ],
)


def trikotnik_a3():
    A, B, C = (20, 130), (200, 130), (200, 55)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {B[0] - 10} {B[1]} v -10 h 10" fill="none" stroke="currentColor"/>',
         f'<path d="M 46 130 A 26 26 0 0 0 44 120" fill="none" stroke="{RDECA}"/>',
         napis(56, 125, "x", 12, RDECA), napis(100, 82, "12 cm", 11, sidro="end"), napis(206, 96, "5 cm", 11, sidro="start"), napis(110, 146, "y", 12)]
    return svg(245, 155, "".join(t), opis="Pravokotni trikotnik s hipotenuzo 12 cm")


a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"Iz podatkov na skici izračunaj kot \(x\) in stranico \(y\)." + trikotnik_a3(),
    r"\(x \approx 24^\circ 37'\), \(y = \sqrt{119} \approx 10{,}91\) cm",
    [
        ("sin x = " + U("5", "12"), "Kateta 5 cm leži nasproti kota x, 12 cm je hipotenuza.", "kotne"),
        ("!x ≈ 24,62° = 24° 37′", ""),
        ("!y = " + K("12<sup>2</sup> − 5<sup>2</sup>") + " = " + K("119") + " ≈ 10,91 cm", "", "pitagora"),
    ],
)

a4 = naloga(
    "A4", "zaporedja_pm", 4,
    r"Notranji koti štirikotnika so zaporedni členi aritmetičnega zaporedja z razliko \(24^\circ\). Izračunaj vse notranje kote.",
    r"\(54^\circ, 78^\circ, 102^\circ, 126^\circ\)",
    [
        ("α + (α + 24°) + (α + 48°) + (α + 72°) = 360°", "Vsota notranjih kotov štirikotnika je 360°.", "aritmeticno"),
        ("4α + 144° = 360°  ⇒  α = 54°", ""),
        ("!54°, 78°, 102°, 126°", ""),
    ],
)

a5 = naloga(
    "A5", "statistika_pm", 4,
    r"Isto razdaljo je izmerilo \(5\) dijakov. Meritve so: \(2{,}45\) m, \(2{,}51\) m, \(2{,}48\) m, \(2{,}53\) m in \(2{,}43\) m. Izračunaj srednjo vrednost meritev in standardni odklon.",
    r"\(\bar{x} = 2{,}48\) m, \(\sigma \approx 0{,}037\) m",
    [
        ("!x̄ = " + U("2,45 + 2,51 + 2,48 + 2,53 + 2,43", "5") + " = " + U("12,40", "5") + " = 2,48 m", "", "statistika"),
        ("odkloni: −0,03; 0,03; 0; 0,05; −0,05", ""),
        ("σ<sup>2</sup> = " + U("0,0009 + 0,0009 + 0 + 0,0025 + 0,0025", "5") + " = 0,00136", ""),
        ("!σ ≈ 0,037 m", ""),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 5,
    r"Na dve decimalni mesti natančno reši enačbi: a) \(3^x = 11\) &nbsp; b) \(\log_3 x = 2{,}5\).",
    r"a) \(x \approx 2{,}18\) &nbsp; b) \(x \approx 15{,}59\)",
    [
        "## a)",
        ("x = log<sub>3</sub> 11 = " + U("log 11", "log 3"), "Logaritmiramo.", "log_pravila"),
        ("!x ≈ 2,18", ""),
        "## b)",
        ("x = 3<sup>2,5</sup> = 9" + K("3"), "Po definiciji logaritma.", "logaritem"),
        ("!x ≈ 15,59", ""),
    ],
)

FA7 = lambda x: -x * x - 2 * x + 1

a7 = naloga(
    "A7", "kvadratna_funkcija", 5,
    r"Zapiši enačbo kvadratne funkcije, katere graf je na sliki."
    + graf([(FA7, MODRA)], (-3.6, 1.6), (-6, 3), [(-1, 2, "T"), (0, 1, "")], sirina=230, visina=320),
    r"\(f(x) = -x^2 - 2x + 1\)",
    [
        ("teme T(−1, 2),  presečišče z osjo y (0, 1)", "Preberemo z grafa."),
        ("f(x) = a(x + 1)<sup>2</sup> + 2", "Temenska oblika.", "teme"),
        ("f(0) = a + 2 = 1  ⇒  a = −1", ""),
        ("!f(x) = −(x + 1)<sup>2</sup> + 2 = −x<sup>2</sup> − 2x + 1", ""),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Janez je kupil \(6\) vreč cementa in \(10\) vreč apna ter plačal \(79{,}00\) EUR. Jože je v isti trgovini kupil \(9\) vreč cementa in \(4\) vreče apna ter plačal \(74{,}50\) EUR. Izračunaj ceno vreče cementa in vreče apna.",
    r"cement \(6{,}50\) EUR, apno \(4{,}00\) EUR",
    [
        ("6c + 10a = 79,  9c + 4a = 74,5", "", "sistem"),
        ("18c + 30a = 237,  18c + 8a = 149", "Prvo enačbo pomnožimo s 3, drugo z 2."),
        ("22a = 88  ⇒  a = 4", ""),
        ("!a = 4,00 EUR,  c = " + U("79 − 40", "6") + " = 6,50 EUR", ""),
    ],
)

a9 = naloga(
    "A9", "povrsine_prostornine", 5,
    r"Lonec valjaste oblike je do \(\frac{3}{4}\) višine napolnjen z vodo. Koliko litrov vode je v loncu, če je visok \(28\) cm in ima premer \(24\) cm?",
    r"\(\approx 9{,}50\) l",
    [
        ("r = 12 cm,  višina vode: " + U("3", "4") + " · 28 = 21 cm", ""),
        ("V = π r<sup>2</sup> h = π · 144 · 21 = 3024π cm<sup>3</sup>", "", "telesa"),
        ("!V ≈ 9500 cm<sup>3</sup> ≈ 9,50 l", "1 l = 1 dm³ = 1000 cm³."),
    ],
)

# ------------------------------------------------------------------ 2. del


def premici(X, Y):
    t = f'<polygon points="{X(0):.1f},{Y(0):.1f} {X(0):.1f},{Y(10):.1f} {X(4):.1f},{Y(2):.1f}" fill="{MODRA}" fill-opacity="0.12"/>'
    t += krivulja(X, Y, lambda x: x / 2, -2, 7, MODRA) + krivulja(X, Y, lambda x: -2 * x + 10, -0.5, 6, RDECA)
    t += tocka(X, Y, 4, 2, "P", 6, -4) + tocka(X, Y, 0, 10, "N", 6, 4) + tocka(X, Y, 0, 0, "O", -14, 14)
    return t


b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dani sta premici \(x - 2y = 0\) in \(2x + y - 10 = 0\).<br>"
    r"1.1. Nariši premici v isti koordinatni sistem, označi presečišče in izračunaj njegovi koordinati. (6 točk)<br>"
    r"1.2. Izračunaj kot med premicama. (4 točke)<br>"
    r"1.3. Premici in ordinatna os določajo trikotnik. Izračunaj dolžino najkrajše stranice in ploščino trikotnika. (5 točk)",
    r"1.1. \(P(4, 2)\) &nbsp; 1.2. \(90^\circ\) &nbsp; 1.3. \(2\sqrt{5} \approx 4{,}47\); \(S = 20\)",
    [
        "## 1.1",
        ("y = " + U("1", "2") + "x,  y = −2x + 10", "Premici zapišemo v eksplicitni obliki.", "premica"),
        ("@slika", mreza((-2, 7), (-2, 11), premici, sirina=260)),
        (U("1", "2") + "x = −2x + 10  ⇒  " + U("5", "2") + "x = 10", "", "sistem"),
        ("!P(4, 2)", ""),
        "## 1.2",
        ("k<sub>1</sub> · k<sub>2</sub> = " + U("1", "2") + " · (−2) = −1", "Premici sta pravokotni, če je produkt smernih koeficientov −1."),
        ("!kot med premicama je 90°", ""),
        "## 1.3",
        ("oglišča: O(0, 0),  N(0, 10),  P(4, 2)", "Prva premica gre skozi izhodišče, druga seka os y pri 10."),
        ("|OP| = " + K("16 + 4") + " = 2" + K("5") + ",  |NP| = " + K("16 + 64") + " = 4" + K("5") + ",  |ON| = 10", "", "razdalja"),
        ("!najkrajša stranica: |OP| = 2" + K("5") + " ≈ 4,47", ""),
        ("!S = " + U("|ON| · 4", "2") + " = " + U("10 · 4", "2") + " = 20", "Višina na stranico ON je abscisa točke P.", "ploscine"),
    ],
)

FB2 = lambda x: (x * x - 9) / (x * x - 4)

b2 = naloga(
    "B2", "polinomi_racionalna", 15,
    r"Dana je funkcija \(f(x) = \dfrac{x^2 - 9}{x^2 - 4}\).<br>"
    r"2.1. Določi ničli, pola, vodoravno asimptoto in presečišče grafa z ordinatno osjo. (5 točk)<br>"
    r"2.2. Nariši graf funkcije. (6 točk)<br>"
    r"2.3. Reši neenačbo \(\dfrac{x - 3}{x^2 - 4} < 0\). (4 točke)",
    r"2.1. ničli \(\pm 3\), pola \(\pm 2\), \(y = 1\), \(\left(0, \frac{9}{4}\right)\) &nbsp; 2.3. \(x \in (-\infty, -2) \cup (2, 3)\)",
    [
        "## 2.1",
        ("!ničli x = ±3,  pola x = ±2", "", "racionalna"),
        ("!asimptota y = 1,  presečišče (0, " + U("9", "4") + ")", ""),
        "## 2.2",
        ("f(±1) = " + U("8", "3") + ",  f(±4) = " + U("7", "12"), "Funkcija je soda."),
        ("@slika", graf([(FB2, MODRA), (lambda x: 1, RDECA)], (-7, 7), (-6, 7), [(-3, 0, ""), (3, 0, ""), (0, 2.25, ""), (1, 8 / 3, ""), (-1, 8 / 3, "")], sirina=300, visina=280)),
        "## 2.3",
        ("ničle in poli: x = −2, x = 2, x = 3", "", "neenacba"),
        ("predznaki: (−∞, −2): −,  (−2, 2): +,  (2, 3): −,  (3, ∞): +", "Na vsakem intervalu preverimo predznak števca in imenovalca."),
        ("!x ∈ (−∞, −2) ∪ (2, 3)", ""),
    ],
)

VISINE = [101, 102, 103, 104, 105, 105, 106, 107, 107, 108, 108, 109, 109, 110, 110, 111, 111, 111,
          112, 112, 113, 113, 114, 114, 115, 115, 116, 117, 118, 119]
RAZ = [("[100, 104)", 102, 3), ("[104, 108)", 106, 6), ("[108, 112)", 110, 9), ("[112, 116)", 114, 8), ("[116, 120)", 118, 4)]


def histogram():
    L, B, H = 40, 160, 135
    t = []
    for k in range(0, 11, 2):
        y = B - k / 10 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 230}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    for i, (_, m, f) in enumerate(RAZ):
        x = L + 10 + 42 * i
        h = f / 10 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="42" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x, B + 14, str(m - 2), 9))
    t.append(napis(L + 10 + 42 * 5, B + 14, "120", 9))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 230}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 12, "število dečkov", 10, sidro="start") + napis(L + 230, B + 28, "višina (cm)", 10, sidro="end"))
    return svg(285, 195, "".join(t), opis="Histogram telesnih višin")


b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Pred vpisom v šolo so izmerili telesno višino \(30\) dečkov (izmišljeni podatki, v cm, urejeni po velikosti): "
    + ", ".join(str(v) for v in VISINE) + r".<br>"
    r"3.1. Podatke uredi v \(5\) frekvenčnih razredov širine \(4\) cm, od \(100\) cm naprej. (5 točk)<br>"
    r"3.2. Iz grupiranih podatkov izračunaj povprečno višino dečkov. (5 točk)<br>"
    r"3.3. Podatke prikaži s histogramom ali frekvenčnim poligonom. (5 točk)",
    r"3.2. \(\approx 110{,}53\) cm",
    [
        "## 3.1",
        ("@slika", tabela(["razred (cm)", "sredina", "frekvenca"], [[r, str(m), str(f)] for r, m, f in RAZ])),
        (None, "Vsak podatek štejemo v razred, ki vsebuje spodnjo mejo in ne vsebuje zgornje; vsota frekvenc je 30."),
        "## 3.2",
        ("x̄ = " + U("3 · 102 + 6 · 106 + 9 · 110 + 8 · 114 + 4 · 118", "30") + " = " + U("3316", "30"), "Vsak razred predstavimo z njegovo sredino.", "statistika"),
        ("!x̄ ≈ 110,53 cm", ""),
        "## 3.3",
        ("@slika", histogram()),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
