# Zimski rok 2005 (uradna pola RIC P053-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2005, "zimski", "ponedeljek, 13. februar 2006"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "geometrija_ravnine", 4,
    r"Ali je trditev pravilna (DA) ali napačna (NE)?<br>"
    r"a) Višina trikotnika vedno razpolavlja nasprotno stranico.<br>"
    r"b) Vsota zunanjih kotov trikotnika je \(360^\circ\).<br>"
    r"c) Sokot topega kota je ostri kot.<br>"
    r"d) V enakostraničnem trikotniku meri vsak notranji kot \(60^\circ\).",
    r"a) NE &nbsp; b) DA &nbsp; c) DA &nbsp; d) DA",
    [
        ("!a) NE", "Stranico razpolavlja težiščnica; višina jo razpolovi le v enakokrakem trikotniku (na osnovnico)."),
        ("!b) DA", "Vsak zunanji kot je 180° minus notranji: 3 · 180° − 180° = 360°."),
        ("!c) DA", "Sokot topega kota je 180° minus kot, večji od 90°, torej manj kot 90°."),
        ("!d) DA", "180° : 3 = 60°."),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Natančno izračunaj: \(1{,}5 : \left(1 + \frac{1}{4}\right) - 4^0\).",
    r"\(\frac{1}{5}\)",
    [
        ("1 + " + U("1", "4") + " = " + U("5", "4"), ""),
        (U("3", "2") + " : " + U("5", "4") + " = " + U("3", "2") + " · " + U("4", "5") + " = " + U("6", "5"), ""),
        ("!" + U("6", "5") + " − 1 = " + U("1", "5"), "Vsaka neničelna osnova na potenco 0 je 1."),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Dijak je prebral \(\frac{3}{10}\) knjige. Ko je prebral še \(45\) strani, mu je ostala polovica knjige. Koliko strani ima knjiga?",
    r"\(225\)",
    [
        (U("3", "10") + "x + 45 + " + U("1", "2") + "x = x", "x je število strani."),
        ("45 = x · (1 − " + U("3", "10") + " − " + U("1", "2") + ") = " + U("1", "5") + "x", ""),
        ("!x = 225 strani", ""),
    ],
)


def premica_a4():
    L, R, y = 20, 280, 40
    X = lambda v: L + (v + 1) * (R - L) / 8
    t = [f'<line x1="{L}" y1="{y}" x2="{R}" y2="{y}" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{X(3):.1f}" y1="{y}" x2="{R}" y2="{y}" stroke="{MODRA}" stroke-width="4"/>',
         f'<circle cx="{X(3):.1f}" cy="{y}" r="4.5" fill="none" stroke="{MODRA}" stroke-width="2"/>']
    for v in range(-1, 8):
        t.append(f'<line x1="{X(v):.1f}" y1="{y - 4}" x2="{X(v):.1f}" y2="{y + 4}" stroke="currentColor"/>' + napis(X(v), y + 18, str(v).replace("-", "−"), 10))
    return svg(300, 65, "".join(t), opis="Rešitev neenačbe na številski premici")


a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"Reši neenačbo \(\dfrac{x}{3} + 2 < 2x - 3\). Rešitev ponazori na številski premici.",
    r"\(x > 3\)",
    [
        ("x + 6 < 6x − 9", "Pomnožimo s 3.", "neenacba"),
        ("15 < 5x", ""),
        ("!x > 3,  x ∈ (3, ∞)", ""),
        ("@slika", premica_a4()),
    ],
)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Nariši krivuljo \(y = x^3\) in premico \(x = -2\) ter zapiši koordinati njunega presečišča.",
    r"\(P(-2, -8)\)",
    [
        ("@slika", mreza((-3, 3), (-9, 9), lambda X, Y: krivulja(X, Y, lambda x: x ** 3, -2.08, 2.08, MODRA)
                         + f'<line x1="{X(-2):.1f}" y1="{Y(9):.1f}" x2="{X(-2):.1f}" y2="{Y(-9):.1f}" stroke="{RDECA}" stroke-width="2"/>'
                         + tocka(X, Y, -2, -8, "P", 6, 4) + tocka(X, Y, 1, 1) + tocka(X, Y, -1, -1) + tocka(X, Y, 2, 8), sirina=200, visina=360)),
        ("y = (−2)<sup>3</sup> = −8", ""),
        ("!P(−2, −8)", ""),
    ],
)


def paralelogram():
    s = 18
    al = math.radians(64 + 20 / 60)
    A = (60, 120)
    B = (A[0] + 8 * s, A[1])
    D = (A[0] + 5 * s * math.cos(al), A[1] - 5 * s * math.sin(al))
    C = (B[0] + D[0] - A[0], D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{D[0]:.1f}" y1="{D[1]:.1f}" x2="{D[0]:.1f}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 8, C[1] + 4, "C"), napis(D[0] - 8, D[1] + 2, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "a = 8 cm", 10), napis(72, 76, "b = 5 cm", 10, sidro="end"),
         napis(D[0] + 4, 90, "v", 11, sidro="start"), napis(A[0] + 22, A[1] - 5, "α", 12, RDECA)]
    return svg(265, 140, "".join(t), opis="Paralelogram ABCD")


a6 = naloga(
    "A6", "obsegi_ploscine", 5,
    r"Dan je paralelogram \(ABCD\) z \(a = 8\) cm, \(b = 5\) cm in \(\alpha = 64^\circ 20'\). Nariši skico ter izračunaj obseg in ploščino paralelograma.",
    r"\(o = 26\) cm, \(S \approx 36{,}05\ \mathrm{cm^2}\)",
    [
        ("@slika", paralelogram()),
        ("!o = 2(a + b) = 26 cm", ""),
        ("v = b · sin α ≈ 5 · 0,9013 ≈ 4,51 cm", "", "kotne"),
        ("!S = a · v = a · b · sin α ≈ 36,05 cm<sup>2</sup>", "", "ploscine"),
    ],
)

a7 = naloga(
    "A7", "zaporedja_pm", 5,
    r"Dano je zaporedje \(a_n = -n^2 + 5n - 2\). Zapiši prve štiri člene zaporedja in nariši prve štiri točke grafa zaporedja.",
    r"\(2, 4, 4, 2\)",
    [
        ("a<sub>1</sub> = −1 + 5 − 2 = 2,  a<sub>2</sub> = −4 + 10 − 2 = 4", ""),
        ("a<sub>3</sub> = −9 + 15 − 2 = 4,  a<sub>4</sub> = −16 + 20 − 2 = 2", ""),
        ("!2, 4, 4, 2", ""),
        ("@slika", mreza((-1, 6), (-1, 6), lambda X, Y: "".join(tocka(X, Y, n, -n * n + 5 * n - 2) for n in range(1, 5)), sirina=220)),
        (None, "Točke grafa so (1, 2), (2, 4), (3, 4), (4, 2); ne povezujemo jih."),
    ],
)

a8 = naloga(
    "A8", "kotne_funkcije_pm", 5,
    r"Poenostavi izraz \(\sin\left(\frac{\pi}{2} + x\right) + 3\cos(\pi - x)\).",
    r"\(-2\cos x\)",
    [
        ("sin(" + U("π", "2") + " + x) = sin " + U("π", "2") + " cos x + cos " + U("π", "2") + " sin x = cos x", "", "adicijski"),
        ("cos(π − x) = cos π cos x + sin π sin x = −cos x", ""),
        ("!cos x − 3 cos x = −2 cos x", ""),
    ],
)

PA9 = lambda x: -x ** 3 + 2 * x * x

a9 = naloga(
    "A9", "polinomi_racionalna", 5,
    r"Določi ničle polinoma \(p(x) = -x^3 + 2x^2\) in skiciraj njegov graf.",
    r"\(x_{1,2} = 0\), \(x_3 = 2\)",
    [
        ("p(x) = −x<sup>2</sup>(x − 2)", "Izpostavimo −x²."),
        ("!x<sub>1,2</sub> = 0 (dvojna),  x<sub>3</sub> = 2", "V dvojni ničli se graf osi x le dotakne."),
        ("p(−1) = 3,  p(1) = 1", "Vodilni koeficient je negativen: levo gre graf proti +∞, desno proti −∞."),
        ("@slika", graf([(PA9, MODRA)], (-1.5, 2.8), (-7, 8), [(0, 0, ""), (2, 0, ""), (-1, 3, ""), (1, 1, "")], sirina=220, visina=340)),
    ],
)

# ------------------------------------------------------------------ 2. del


def risba_b1(X, Y):
    t = krivulja(X, Y, lambda x: 2 ** x, -3, math.log2(12.8), MODRA) + krivulja(X, Y, lambda x: x * x - x + 2, -2.8, 4.1, RDECA)
    for x in (1, 2, 3):
        t += tocka(X, Y, x, 2 ** x, f"P{'₁₂₃'[x - 1]}", -20, -2)
    t += napis(X(3.4), Y(12.4), "f", 12, MODRA) + napis(X(-2.4), Y(10.6), "g", 12, RDECA)
    return t


b1 = naloga(
    "B1", "eksponentna_logaritemska", 15,
    r"Dani sta funkciji \(f(x) = 2^x\) in \(g(x) = x^2 - x + 2\).<br>"
    r"1.1. Nariši grafa obeh funkcij v isti koordinatni sistem. (7 točk)<br>"
    r"1.2. Označi presečišča grafov in z računom pokaži, da so \(P_1(1, 2)\), \(P_2(2, 4)\) in \(P_3(3, 8)\) presečišča. (5 točk)<br>"
    r"1.3. Izračunaj \(f(4) - g(-2)\). (3 točke)",
    r"1.3. \(8\)",
    [
        "## 1.1",
        ("f: (−1, ½), (0, 1), (1, 2), (2, 4), (3, 8)", "", "eksponentna"),
        ("g: teme p = ½, q = 1¾;  g(0) = 2,  g(−2) = 8", "Parabola je odprta navzgor.", "teme"),
        ("@slika", mreza((-3, 4), (-1, 13), risba_b1, sirina=230, visina=400)),
        "## 1.2",
        ("f(1) = 2,  g(1) = 1 − 1 + 2 = 2", "Točka leži na obeh grafih, če jo izpolnjujeta obe enačbi."),
        ("f(2) = 4,  g(2) = 4 − 2 + 2 = 4", ""),
        ("f(3) = 8,  g(3) = 9 − 3 + 2 = 8", ""),
        ("!P<sub>1</sub>(1, 2), P<sub>2</sub>(2, 4) in P<sub>3</sub>(3, 8) so presečišča", ""),
        "## 1.3",
        ("f(4) = 16,  g(−2) = 4 + 2 + 2 = 8", ""),
        ("!f(4) − g(−2) = 8", ""),
    ],
)

DAT = ["2. 12.", "5. 12.", "9. 12.", "16. 12.", "18. 12.", "24. 12.", "30. 12.", "5. 1.", "8. 1.", "12. 1."]
IND = [3980, 4060, 3990, 3940, 3930, 3950, 3970, 4040, 4070, 4020]


def indeks():
    L, B, dx = 50, 175, 26
    Y = lambda v: B - (v - 3900) / 200 * 155
    t = []
    for v in range(3900, 4101, 20):
        t.append(f'<line x1="{L}" y1="{Y(v):.1f}" x2="{L + 10 * dx}" y2="{Y(v):.1f}" stroke="currentColor" stroke-opacity="{0.25 if v % 100 == 0 else 0.1}"/>')
        if v % 40 == 0 or v == 4100:
            t.append(napis(L - 5, Y(v) + 3, str(v), 9, sidro="end"))
    pts = " ".join(f"{L + dx * (i + 0.5):.1f},{Y(v):.1f}" for i, v in enumerate(IND))
    t.append(f'<polyline points="{pts}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    for i, v in enumerate(IND):
        t.append(f'<circle cx="{L + dx * (i + 0.5):.1f}" cy="{Y(v):.1f}" r="2.5" fill="{MODRA}"/>')
        t.append(napis(L + dx * (i + 0.5), B + 13, DAT[i], 8))
    t.append(napis(8, 12, "indeks (točke)", 10, sidro="start"))
    return svg(320, 195, "".join(t), opis="Vrednost borznega indeksa po datumih")


b2 = naloga(
    "B2", "statistika_pm", 15,
    r"Slika prikazuje vrednost borznega indeksa (v točkah) med 2. 12. in 12. 1. (izmišljeni podatki)." + indeks()
    + r"2.1. Določi datum in vrednost največje in najmanjše vrednosti indeksa v tem obdobju. (4 točke)<br>"
    r"2.2. Med katerima zaporednima datumoma je bila sprememba indeksa največja? Kolikšna je bila v točkah? (5 točk)<br>"
    r"2.3. Kolikšna je bila sprememba indeksa med 18. 12. in 5. 1. v točkah? Za koliko odstotkov se je indeks v tem času povečal? (6 točk)",
    r"2.1. največ 8. 1. (\(4070\)), najmanj 18. 12. (\(3930\)) &nbsp; 2.2. med 2. 12. in 5. 12., \(+80\) točk &nbsp; 2.3. \(+110\) točk, \(\approx 2{,}80\,\%\)",
    [
        "## 2.1",
        ("@slika", tabela(["datum"] + DAT, [["indeks"] + [str(v) for v in IND]])),
        ("!največja vrednost: 8. 1., 4070 točk", ""),
        ("!najmanjša vrednost: 18. 12., 3930 točk", ""),
        "## 2.2",
        ("spremembe: +80, −70, −50, −10, +20, +20, +70, +30, −50", "Razlike med zaporednima vrednostma."),
        ("!največja: med 2. 12. in 5. 12., +80 točk", ""),
        "## 2.3",
        ("!4040 − 3930 = 110 točk", ""),
        ("p = " + U("110", "3930") + " · 100 %", "Glede na vrednost 18. 12.", "odstotki"),
        ("!p ≈ 2,80 %", ""),
    ],
)


def trikotnik_b3():
    s = 16
    A = (60, 150)
    al = math.radians(70)
    B = (A[0] + 8.537 * s, A[1])
    C = (A[0] + 7 * s * math.cos(al), A[1] - 7 * s * math.sin(al))
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]:.1f},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 7, "C"),
         napis(A[0] + 20, A[1] - 6, "70°", 10, RDECA, "start"), napis((A[0] + C[0]) / 2 - 6, (A[1] + C[1]) / 2, "b = 7 cm", 10, sidro="end"),
         napis((B[0] + C[0]) / 2 + 6, (B[1] + C[1]) / 2, "a = 9 cm", 10, sidro="start"), napis((A[0] + B[0]) / 2, A[1] + 15, "c", 11)]
    return svg(270, 170, "".join(t), opis="Trikotnik ABC")


b3 = naloga(
    "B3", "trikotnik_kotne", 15,
    r"Dan je trikotnik \(ABC\) z \(a = 9\) cm, \(b = 7\) cm in \(\alpha = 70^\circ\).<br>"
    r"3.1. Nariši skico in načrtaj trikotnik. (5 točk)<br>"
    r"3.2. Na desetinko centimetra natančno izračunaj tretjo stranico in na desetinko stopinje natančno kot \(\beta\). (7 točk)<br>"
    r"3.3. Izračunaj ploščino trikotnika. (3 točke)",
    r"3.2. \(c \approx 8{,}5\) cm, \(\beta \approx 47{,}0^\circ\) &nbsp; 3.3. \(S \approx 28{,}08\ \mathrm{cm^2}\)",
    [
        "## 3.1",
        ("@slika", trikotnik_b3()),
        (None, "Načrtamo kot α = 70° z vrhom A, na en krak nanesemo b = 7 cm (dobimo C), nato iz C s šestilom zarišemo lok s polmerom 9 cm, ki seka drugi krak v B."),
        "## 3.2",
        ("sin β = " + U("b · sin α", "a") + " = " + U("7 · sin 70°", "9") + " ≈ 0,7309", "β je oster, ker je b < a.", "sinusni"),
        ("!β ≈ 47,0°", ""),
        ("γ = 180° − 70° − 46,96° ≈ 63,04°", ""),
        ("!c = " + U("a · sin γ", "sin α") + " ≈ 8,5 cm", ""),
        "## 3.3",
        ("!S = " + U("1", "2") + " · a · b · sin γ ≈ " + U("1", "2") + " · 9 · 7 · sin 63,04° ≈ 28,08 cm<sup>2</sup>", "", "ploscine"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
