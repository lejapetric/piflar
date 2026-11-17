# Spomladanski rok 2005 (uradna pola RIC P051-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2005, "spomladanski", "ponedeljek, 6. junij 2005"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Z DA označi pravilne enakosti, z NE pa napačne.<br>"
    r"a) \((x - 4)^2 = x^2 - 8x + 16\) &nbsp; b) \(x^2 - 7x + 6 = (x - 6)(x - 1)\)<br>"
    r"c) \((x + 2)^2 = x^2 + 4\) &nbsp; d) \((x + 3)(x^2 - 3x + 9) = x^3 + 27\)",
    r"a) DA &nbsp; b) DA &nbsp; c) NE &nbsp; d) DA",
    [
        ("!a) DA", "Kvadrat razlike: x² − 2 · 4x + 16."),
        ("!b) DA", "(x − 6)(x − 1) = x² − x − 6x + 6."),
        ("!c) NE", "(x + 2)² = x² + 4x + 4."),
        ("!d) DA", "Vsota kubov: a³ + b³ = (a + b)(a² − ab + b²)."),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Izračunaj z ulomki: \(1{,}2 \cdot 2{,}5 - 0{,}75\).",
    r"\(\frac{9}{4}\)",
    [
        ("1,2 = " + U("6", "5") + ",  2,5 = " + U("5", "2") + ",  0,75 = " + U("3", "4"), "Decimalna števila zapišemo z ulomki."),
        (U("6", "5") + " · " + U("5", "2") + " = 3", ""),
        ("!3 − " + U("3", "4") + " = " + U("9", "4"), ""),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Zapiši enačbo premice skozi točki \(A(-2, 1)\) in \(B(4, 4)\).",
    r"\(y = \frac{1}{2}x + 2\)",
    [
        ("k = " + U("4 − 1", "4 − (−2)") + " = " + U("3", "6") + " = " + U("1", "2"), "", "premica"),
        ("1 = " + U("1", "2") + " · (−2) + n  ⇒  n = 2", ""),
        ("!y = " + U("1", "2") + "x + 2", ""),
    ],
)

a4 = naloga(
    "A4", "eksponentna_logaritemska", 4,
    r"V isti koordinatni sistem nariši grafa funkcij \(f(x) = 3^x\) in \(g(x) = 9\). Zapiši koordinati njunega presečišča.",
    r"\(P(2, 9)\)",
    [
        ("@slika", mreza((-3, 4), (-1, 11), lambda X, Y: krivulja(X, Y, lambda x: 3 ** x, -3, math.log(10.6, 3), MODRA)
                         + krivulja(X, Y, lambda x: 9, -3, 4, RDECA) + tocka(X, Y, 2, 9, "P", 6, -6) + tocka(X, Y, 0, 1) + tocka(X, Y, 1, 3), sirina=230)),
        ("3<sup>x</sup> = 9 = 3<sup>2</sup>  ⇒  x = 2", "", "eksponentna"),
        ("!P(2, 9)", ""),
    ],
)

DNI = ["pon.", "tor.", "sre.", "čet.", "pet.", "sob.", "ned."]
URE = [4, 5, 7, 2, 0, 6, 8]

a5 = naloga(
    "A5", "statistika_pm", 4,
    r"Preglednica prikazuje Markov čas učenja v zadnjem tednu pred izpitom (izmišljeni podatki)."
    + tabela(["dan"] + DNI, [["učenje (h)"] + [str(u) for u in URE]])
    + r"Izračunaj povprečni dnevni čas učenja. Koliko odstotkov tedenskega učenja predstavlja nedeljsko učenje?",
    r"\(\approx 4{,}57\) h; \(25\,\%\)",
    [
        ("skupaj: 4 + 5 + 7 + 2 + 0 + 6 + 8 = 32 h", "", "statistika"),
        ("!x̄ = " + U("32", "7") + " ≈ 4,57 h", "Petek z 0 urami šteje kot dan."),
        ("!" + U("8", "32") + " · 100 % = 25 %", "", "odstotki"),
    ],
)


def kocka():
    x, y, a, dx, dy = 30, 50, 90, 40, -30
    t = [f'<path d="M {x} {y} h {a} v {a} h {-a} Z" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y} l {dx} {dy} h {a} l {-dx} {-dy} M {x + a} {y} l {dx} {dy} v {a} l {-dx} {-dy}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y + a} l {dx} {dy} h {a} M {x + dx} {y + a + dy} v {-a}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{x}" y1="{y + a}" x2="{x + a + dx}" y2="{y + dy}" stroke="{RDECA}" stroke-width="2"/>',
         napis(x + a / 2, y + a + 15, "a = 8 cm", 10), napis(x + a / 2 + 30, y + 30, "D", 12, RDECA)]
    return svg(200, 160, "".join(t), opis="Kocka s telesno diagonalo")


a6 = naloga(
    "A6", "povrsine_prostornine", 5,
    r"Izračunaj dolžino žice za žični model kocke z robom \(8\) cm in eno telesno diagonalo. Nariši skico kocke.",
    r"\(96 + 8\sqrt{3} \approx 109{,}86\) cm",
    [
        ("@slika", kocka()),
        ("robovi: 12 · 8 = 96 cm", "Kocka ima 12 robov."),
        ("D = a" + K("3") + " = 8" + K("3") + " ≈ 13,86 cm", "Telesna diagonala kocke.", "pitagora"),
        ("!96 + 8" + K("3") + " ≈ 109,86 cm", ""),
    ],
)

a7 = naloga(
    "A7", "trikotnik_kotne", 5,
    r"Dan je trikotnik \(ABC\) z \(a = 10\) cm, \(\beta = 42^\circ\) in \(\gamma = 105^\circ\). Izračunaj njegovo ploščino.",
    r"\(S \approx 59{,}34\ \mathrm{cm^2}\)",
    [
        ("α = 180° − 42° − 105° = 33°", ""),
        ("b = " + U("a · sin β", "sin α") + " = " + U("10 · sin 42°", "sin 33°") + " ≈ 12,29 cm", "", "sinusni"),
        ("!S = " + U("1", "2") + " · a · b · sin γ ≈ " + U("1", "2") + " · 10 · 12,29 · sin 105° ≈ 59,34 cm<sup>2</sup>", "", "ploscine"),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Dano je zaporedje \(a_n = \dfrac{n + 2}{n}\). Zapiši prve štiri člene in nariši prve štiri točke grafa zaporedja.",
    r"\(3, 2, \frac{5}{3}, \frac{3}{2}\)",
    [
        ("a<sub>1</sub> = 3,  a<sub>2</sub> = " + U("4", "2") + " = 2", ""),
        ("a<sub>3</sub> = " + U("5", "3") + ",  a<sub>4</sub> = " + U("6", "4") + " = " + U("3", "2"), ""),
        ("!3, 2, " + U("5", "3") + ", " + U("3", "2"), ""),
        ("@slika", mreza((-1, 6), (-1, 4), lambda X, Y: "".join(tocka(X, Y, n, (n + 2) / n) for n in range(1, 5)), sirina=240)),
    ],
)

a9 = naloga(
    "A9", "kotne_funkcije_pm", 5,
    r"Poenostavi izraz \(\cos\left(\frac{3\pi}{2} - x\right) + 2\sin(\pi + x)\).",
    r"\(-3\sin x\)",
    [
        ("cos(" + U("3π", "2") + " − x) = cos " + U("3π", "2") + " cos x + sin " + U("3π", "2") + " sin x = −sin x", "cos(3π/2) = 0, sin(3π/2) = −1.", "adicijski"),
        ("sin(π + x) = sin π cos x + cos π sin x = −sin x", ""),
        ("!−sin x − 2 sin x = −3 sin x", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
PB1 = lambda x: x ** 3 - 3 * x * x + 4

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 - 3x^2 + 4\).<br>"
    r"1.1. Določi ničle in presečišče grafa z ordinatno osjo. (6 točk)<br>"
    r"1.2. Skiciraj graf polinoma. (5 točk)<br>"
    r"1.3. Točki \(A(-10, y_1)\) in \(B(1, y_2)\) ležita na grafu polinoma. Izračunaj \(y_1\) in \(y_2\). (4 točke)",
    r"1.1. \(-1\), \(2\) (dvojna); \((0, 4)\) &nbsp; 1.3. \(y_1 = -1296\), \(y_2 = 2\)",
    [
        "## 1.1",
        ("p(−1) = −1 − 3 + 4 = 0", "Kandidati za cele ničle so delitelji števila 4.", "horner"),
        ("p(x) = (x + 1)(x<sup>2</sup> − 4x + 4) = (x + 1)(x − 2)<sup>2</sup>", "Hornerjev algoritem: 1, −4, 4, ostanek 0."),
        ("!x<sub>1</sub> = −1,  x<sub>2,3</sub> = 2 (dvojna)", ""),
        ("!presečišče z osjo y: (0, 4)", ""),
        "## 1.2",
        ("@slika", graf([(PB1, MODRA)], (-1.6, 3.2), (-8, 7), [(-1, 0, ""), (2, 0, ""), (0, 4, ""), (1, 2, "")], sirina=230, visina=340)),
        (None, "Pri x = 2 se graf osi x le dotakne (dvojna ničla)."),
        "## 1.3",
        ("!y<sub>1</sub> = p(−10) = −1000 − 300 + 4 = −1296", ""),
        ("!y<sub>2</sub> = p(1) = 1 − 3 + 4 = 2", ""),
    ],
)


def trapez():
    s = 18
    A = (20, 130)
    B = (A[0] + 12 * s, A[1])
    v = 3 * math.sqrt(3) * s
    D = (A[0] + 3 * s, A[1] - v)
    C = (A[0] + 9 * s, A[1] - v)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]:.1f} {D[0]},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]:.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="{D[0]}" y1="{D[1]:.1f}" x2="{D[0]}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="2 3"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 8, C[1] + 2, "C"), napis(D[0] - 8, D[1] + 2, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "a = 12 cm", 10), napis((C[0] + D[0]) / 2, C[1] - 6, "c = 6 cm", 10),
         napis(A[0] + 22, A[1] - 5, "60°", 10, RDECA, "start"), napis(D[0] + 4, A[1] - 40, "v", 11, sidro="start")]
    return svg(B[0] + 30, 150, "".join(t), opis="Enakokraki trapez ABCD")


b2 = naloga(
    "B2", "geometrija_ravnine", 15,
    r"Dan je enakokraki trapez \(ABCD\) z osnovnicama \(a = 12\) cm, \(c = 6\) cm in kotom \(\angle DAB = 60^\circ\).<br>"
    r"2.1. Nariši skico trapeza in izračunaj njegovo ploščino. (5 točk)<br>"
    r"2.2. Izračunaj dolžino diagonale \(BD\). (3 točke)<br>"
    r"2.3. Izračunaj površino in prostornino pokončne prizme z višino \(8\) cm, ki ima za osnovno ploskev dani trapez. (7 točk)",
    r"2.1. \(27\sqrt{3} \approx 46{,}77\ \mathrm{cm^2}\) &nbsp; 2.2. \(6\sqrt{3} \approx 10{,}39\) cm &nbsp; 2.3. \(P \approx 333{,}53\ \mathrm{cm^2}\), \(V \approx 374{,}12\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("@slika", trapez()),
        ("(a − c) : 2 = 3 cm", "Odsek osnovnice med A in nožiščem višine iz D."),
        ("v = 3 · tan 60° = 3" + K("3") + " cm,  b = 3 : cos 60° = 6 cm", "", "kotne"),
        ("!S = " + U("12 + 6", "2") + " · 3" + K("3") + " = 27" + K("3") + " ≈ 46,77 cm<sup>2</sup>", "", "ploscine"),
        "## 2.2",
        ("|BD|<sup>2</sup> = (12 − 3)<sup>2</sup> + (3" + K("3") + ")<sup>2</sup> = 81 + 27 = 108", "Pravokotni trikotnik z nožiščem višine iz D.", "pitagora"),
        ("!|BD| = " + K("108") + " = 6" + K("3") + " ≈ 10,39 cm", ""),
        "## 2.3",
        ("o = 12 + 6 + 6 + 6 = 30 cm", ""),
        ("!P = 2S + o · h = 54" + K("3") + " + 240 ≈ 333,53 cm<sup>2</sup>", "", "telesa"),
        ("!V = S · h = 27" + K("3") + " · 8 = 216" + K("3") + " ≈ 374,12 cm<sup>3</sup>", ""),
    ],
)

STAR = [("50–60", 55, 30), ("60–70", 65, 70), ("70–80", 75, 60), ("80–90", 85, 40)]


def histogram():
    L, B, H = 40, 160, 135
    t = []
    for k in range(0, 81, 10):
        y = B - k / 80 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 220}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    for i, (r, _, f) in enumerate(STAR):
        x = L + 10 + 50 * i
        h = f / 80 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="50" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x, B + 14, r.split("–")[0], 9))
    t.append(napis(L + 210, B + 14, "90", 9))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 220}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 12, "število oskrbovancev", 10, sidro="start") + napis(L + 220, B + 28, "starost (leta)", 10, sidro="end"))
    return svg(280, 195, "".join(t), opis="Histogram starosti oskrbovancev")


b3 = naloga(
    "B3", "statistika_pm", 15,
    r"V domu za starejše je \(200\) oskrbovancev (izmišljeni podatki). \(15\,\%\) jih je starih od \(50\) do \(60\) let, \(70\) jih je starih od \(60\) do \(70\) let, \(60\) od \(70\) do \(80\) let, drugi pa od \(80\) do \(90\) let.<br>"
    r"3.1. Iz grupiranih podatkov izračunaj povprečno starost oskrbovancev. (5 točk)<br>"
    r"3.2. Izračunaj standardni odklon starosti. (5 točk)<br>"
    r"3.3. Starost oskrbovancev prikaži grafično. (5 točk)",
    r"3.1. \(70{,}5\) leta &nbsp; 3.2. \(\sigma \approx 9{,}73\) leta",
    [
        "## 3.1",
        ("50–60: 0,15 · 200 = 30,  80–90: 200 − 30 − 70 − 60 = 40", "", "odstotki"),
        ("@slika", tabela(["razred (leta)", "sredina", "frekvenca"], [[r, str(m), str(f)] for r, m, f in STAR])),
        ("x̄ = " + U("30 · 55 + 70 · 65 + 60 · 75 + 40 · 85", "200") + " = " + U("14 100", "200"), "Vsak razred predstavimo z njegovo sredino.", "statistika"),
        ("!x̄ = 70,5 leta", ""),
        "## 3.2",
        ("σ<sup>2</sup> = " + U("30 · 15,5<sup>2</sup> + 70 · 5,5<sup>2</sup> + 60 · 4,5<sup>2</sup> + 40 · 14,5<sup>2</sup>", "200"), "Odkloni sredin razredov od povprečja."),
        ("σ<sup>2</sup> = " + U("7207,5 + 2117,5 + 1215 + 8410", "200") + " = " + U("18 950", "200") + " = 94,75", ""),
        ("!σ = " + K("94,75") + " ≈ 9,73 leta", ""),
        "## 3.3",
        ("@slika", histogram()),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
