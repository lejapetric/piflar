# Zimski rok 2009 (uradna pola RIC P093-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2009, "zimski", "četrtek, 11. februar 2010"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"a) Kvadriraj: \((3x - 2)^2\).<br>b) Kubiraj: \((x - 1)^3\).",
    r"a) \(9x^2 - 12x + 4\) &nbsp; b) \(x^3 - 3x^2 + 3x - 1\)",
    [
        ("(3x − 2)<sup>2</sup> = (3x)<sup>2</sup> − 2 · 3x · 2 + 2<sup>2</sup>", "(a − b)² = a² − 2ab + b²."),
        ("!9x<sup>2</sup> − 12x + 4", ""),
        ("(x − 1)<sup>3</sup> = x<sup>3</sup> − 3 · x<sup>2</sup> · 1 + 3 · x · 1<sup>2</sup> − 1<sup>3</sup>", "(a − b)³ = a³ − 3a²b + 3ab² − b³."),
        ("!x<sup>3</sup> − 3x<sup>2</sup> + 3x − 1", ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Ob koncu ocenjevalnega obdobja je bilo v oddelku z \(32\) dijaki \(87{,}5\,\%\) uspešnih, drugi so bili neuspešni. Koliko dijakov je bilo neuspešnih?",
    r"\(4\) dijaki",
    [
        ("neuspešnih: 100 % − 87,5 % = 12,5 %", ""),
        ("!0,125 · 32 = 4 dijaki", "", "odstotki"),
    ],
)

a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"V pravokotnem trikotniku \(ABC\) meri notranji kot \(\alpha = 41^\circ 27'\). Izračunaj vse notranje in zunanje kote trikotnika.",
    r"\(\beta = 48^\circ 33'\), \(\gamma = 90^\circ\); \(\alpha_1 = 138^\circ 33'\), \(\beta_1 = 131^\circ 27'\), \(\gamma_1 = 90^\circ\)",
    [
        ("γ = 90°", "Pravi kot je pri oglišču C."),
        ("β = 90° − 41° 27′ = 48° 33′", "Ostra kota pravokotnega trikotnika sta komplementarna."),
        ("α<sub>1</sub> = 180° − α", "Zunanji kot je sokot notranjega."),
        ("@slika", tabela(["notranji kot", "zunanji kot"], [["α = 41° 27′", "α₁ = 138° 33′"], ["β = 48° 33′", "β₁ = 131° 27′"], ["γ = 90°", "γ₁ = 90°"]])),
    ],
)

a4 = naloga(
    "A4", "zaporedja_pm", 4,
    r"Ali je trditev pravilna (DA) ali napačna (NE)?<br>"
    r"a) Če so \(2, 5, 8, \ldots\) prvi trije členi aritmetičnega zaporedja, je peti člen \(14\).<br>"
    r"b) Diferenca aritmetičnega zaporedja \(5, 2, -1, -4, \ldots\) je \(d = 3\).<br>"
    r"c) Prvi člen geometrijskega zaporedja je \(a_1 = 3\), drugi \(a_2 = 6\). Četrti člen je \(24\).<br>"
    r"d) Količnik geometrijskega zaporedja \(9, 3, 1, \ldots\) je \(q = 3\).",
    r"a) DA &nbsp; b) NE &nbsp; c) DA &nbsp; d) NE",
    [
        ("!a) a<sub>5</sub> = 2 + 4 · 3 = 14  ⇒  DA", "", "aritmeticno"),
        ("!b) d = 2 − 5 = −3  ⇒  NE", ""),
        ("!c) q = 2,  a<sub>4</sub> = 3 · 2<sup>3</sup> = 24  ⇒  DA", "", "geometrijsko"),
        ("!d) q = " + U("3", "9") + " = " + U("1", "3") + "  ⇒  NE", ""),
    ],
)


def sinus(X, Y):
    t = krivulja(X, Y, math.sin, -math.pi, 3 * math.pi, MODRA)
    t += f'<circle cx="{X(-math.pi):.1f}" cy="{Y(0):.1f}" r="3" fill="none" stroke="{MODRA}"/>'
    t += f'<circle cx="{X(3 * math.pi):.1f}" cy="{Y(0):.1f}" r="3" fill="none" stroke="{MODRA}"/>'
    for k, s in [(-1, "−π"), (1, "π"), (2, "2π"), (3, "3π")]:
        x = k * math.pi
        t += f'<line x1="{X(x):.1f}" y1="{Y(0) - 3:.1f}" x2="{X(x):.1f}" y2="{Y(0) + 3:.1f}" stroke="currentColor"/>' + napis(X(x), Y(0) + 15, s, 10)
    t += napis(X(0) - 5, Y(1) + 4, "1", 10, sidro="end") + napis(X(0) - 5, Y(-1) + 4, "−1", 10, sidro="end")
    return t


a5 = naloga(
    "A5", "kotne_funkcije_pm", 4,
    r"Nariši graf funkcije \(f(x) = \sin x\) na intervalu \((-\pi, 3\pi)\). Zapiši definicijsko območje in zalogo vrednosti funkcije na tem intervalu.",
    r"\(D_f = (-\pi, 3\pi)\), \(Z_f = [-1, 1]\)",
    [
        ("@slika", mreza((-3.6, 10), (-1.6, 1.6), sinus, sirina=360, visina=130, oznake=False)),
        ("!D<sub>f</sub> = (−π, 3π)", "", "D_v"),
        ("!Z<sub>f</sub> = [−1, 1]", "Na tem intervalu sinus doseže vrednosti 1 (pri π/2, 5π/2) in −1 (pri −π/2, 3π/2)."),
    ],
)


def romb():
    c = (110, 70)
    e, f = 90, 60
    P = [(c[0] - e, c[1]), (c[0], c[1] - f), (c[0] + e, c[1]), (c[0], c[1] + f)]
    pts = " ".join(f"{x},{y}" for x, y in P)
    t = [f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{P[0][0]}" y1="{c[1]}" x2="{P[2][0]}" y2="{c[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{c[0]}" y1="{P[1][1]}" x2="{c[0]}" y2="{P[3][1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{P[2][0]}" y2="{c[1]}" stroke="{RDECA}" stroke-width="2"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0]}" y2="{P[1][1]}" stroke="{RDECA}" stroke-width="2"/>',
         napis(c[0] + 45, c[1] + 14, "e/2", 10, RDECA), napis(c[0] + 5, c[1] - 28, "f/2", 10, RDECA, "start"),
         napis(c[0] + 52, c[1] - 36, "a", 12)]
    return svg(220, 140, "".join(t), opis="Romb z diagonalama")


a6 = naloga(
    "A6", "geometrija_ravnine", 5,
    r"V rombu merita diagonali \(e = 24\) cm in \(f = 10\) cm. Nariši skico romba in izračunaj njegov obseg.",
    r"\(o = 52\) cm",
    [
        ("@slika", romb()),
        ("a<sup>2</sup> = (" + U("e", "2") + ")<sup>2</sup> + (" + U("f", "2") + ")<sup>2</sup> = 12<sup>2</sup> + 5<sup>2</sup> = 169", "Diagonali romba se razpolavljata in sta pravokotni.", "pitagora"),
        ("a = 13 cm", ""),
        ("!o = 4a = 52 cm", ""),
    ],
)

a7 = naloga(
    "A7", "linearna_funkcija", 5,
    r"V trgovini stanejo \(3\) kg pomaranč in \(2\) kg banan \(9{,}40\) EUR, \(5\) kg pomaranč in \(3\) kg banan pa \(15{,}10\) EUR. Koliko stane kilogram pomaranč in koliko kilogram banan?",
    r"pomaranče \(2{,}00\) EUR/kg, banane \(1{,}70\) EUR/kg",
    [
        ("3p + 2b = 9,40,  5p + 3b = 15,10", "p je cena kilograma pomaranč, b cena kilograma banan.", "sistem"),
        ("9p + 6b = 28,20,  10p + 6b = 30,20", "Prvo enačbo pomnožimo s 3, drugo z 2."),
        ("!p = 2,00 EUR", "Odštejemo enačbi."),
        ("!b = " + U("9,40 − 6", "2") + " = 1,70 EUR", ""),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Reši enačbi: a) \(27^x = 3\) &nbsp; b) \(\log(2x) = 2\).",
    r"a) \(x = \frac{1}{3}\) &nbsp; b) \(x = 50\)",
    [
        "## a)",
        ("3<sup>3x</sup> = 3<sup>1</sup>  ⇒  3x = 1", "", "eksponentna"),
        ("!x = " + U("1", "3"), ""),
        "## b)",
        ("2x = 10<sup>2</sup> = 100", "Desetiški logaritem: log a = 2 pomeni a = 10².", "logaritem"),
        ("!x = 50", ""),
    ],
)

a9 = naloga(
    "A9", "polinomi_racionalna", 5,
    r"Dan je polinom \(p(x) = x^3 + 2x^2 - 9x - 18\). Izračunaj ničle polinoma.",
    r"\(-3\), \(-2\), \(3\)",
    [
        ("p(x) = x<sup>2</sup>(x + 2) − 9(x + 2)", "Razstavimo z združevanjem členov."),
        ("p(x) = (x + 2)(x<sup>2</sup> − 9) = (x + 2)(x − 3)(x + 3)", ""),
        ("!x<sub>1</sub> = −3,  x<sub>2</sub> = −2,  x<sub>3</sub> = 3", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "zaporedja_pm", 15,
    r"Prvi trije členi zaporedja so \(x - 3\), \(x\), \(4x\), pri čemer je \(x \neq 0\).<br>"
    r"1.1. Izračunaj \(x\), da bo zaporedje geometrijsko, in zapiši člene. (6 točk)<br>"
    r"1.2. Izračunaj \(x\), da bo zaporedje aritmetično, in zapiši člene. (5 točk)<br>"
    r"1.3. Izračunaj vsoto prvih osmih členov geometrijskega zaporedja iz 1.1. (4 točke)",
    r"1.1. \(x = 4\): \(1, 4, 16\) &nbsp; 1.2. \(x = 1\): \(-2, 1, 4\) &nbsp; 1.3. \(21\,845\)",
    [
        "## 1.1",
        ("x<sup>2</sup> = (x − 3) · 4x", "Pri geometrijskem zaporedju je kvadrat srednjega člena enak produktu sosednjih.", "geometrijsko"),
        ("3x<sup>2</sup> − 12x = 0  ⇒  3x(x − 4) = 0", ""),
        ("!x = 4:  1, 4, 16", "x = 0 ni dovoljen; količnik je q = 4."),
        "## 1.2",
        ("2x = (x − 3) + 4x  ⇒  2x = 5x − 3", "Srednji člen aritmetičnega zaporedja je aritmetična sredina sosednjih.", "aritmeticno"),
        ("!x = 1:  −2, 1, 4", "Diferenca je d = 3."),
        "## 1.3",
        ("s<sub>8</sub> = 1 · " + U("4<sup>8</sup> − 1", "4 − 1") + " = " + U("65 535", "3"), ""),
        ("!s<sub>8</sub> = 21 845", ""),
    ],
)

FB2 = lambda x: (x - 3) ** 2
GB2 = lambda x: x + 3


def risba_b2(X, Y):
    t = krivulja(X, Y, FB2, -0.3, 6.3, MODRA) + krivulja(X, Y, GB2, -1, 7, RDECA)
    t += tocka(X, Y, 3, 0, "T", 5, 14) + tocka(X, Y, 1, 4, "A", -14, -4) + tocka(X, Y, 6, 9, "B", -16, -4) + tocka(X, Y, 0, 9)
    t += napis(X(6.6), Y(10.4), "g", 12, RDECA) + napis(X(5.6), Y(4.5), "f", 12, MODRA)
    return t


b2 = naloga(
    "B2", "kvadratna_funkcija", 15,
    r"Dani sta funkciji \(f(x) = x^2 - 6x + 9\) in \(g(x) = x + 3\).<br>"
    r"2.1. Izračunaj ničli in teme funkcije \(f\) ter natančno nariši grafa obeh funkcij v isti koordinatni sistem. (7 točk)<br>"
    r"2.2. Izračunaj presečišči grafov funkcij \(f\) in \(g\). (4 točke)<br>"
    r"2.3. Izračunaj razdaljo med presečiščema. Rezultat delno koreni. (4 točke)",
    r"2.1. ničla \(3\) (dvojna), \(T(3, 0)\) &nbsp; 2.2. \((1, 4)\), \((6, 9)\) &nbsp; 2.3. \(5\sqrt{2}\)",
    [
        "## 2.1",
        ("f(x) = (x − 3)<sup>2</sup>", "Popolni kvadrat."),
        ("!ničla x<sub>1,2</sub> = 3 (dvojna)", "", "kvadratna"),
        ("!T(3, 0)", "Graf se v temenu dotakne osi x.", "teme"),
        ("@slika", mreza((-1, 8), (-1, 11), risba_b2, sirina=270)),
        "## 2.2",
        ("x<sup>2</sup> − 6x + 9 = x + 3  ⇒  x<sup>2</sup> − 7x + 6 = 0", ""),
        ("(x − 1)(x − 6) = 0", ""),
        ("!A(1, 4),  B(6, 9)", "Ordinati izračunamo z g: g(1) = 4, g(6) = 9."),
        "## 2.3",
        ("d(A, B) = " + K("(6 − 1)<sup>2</sup> + (9 − 4)<sup>2</sup>") + " = " + K("50"), "", "razdalja"),
        ("!d = 5" + K("2"), ""),
    ],
)


def trapez():
    s = 22
    A, B = (20, 100), (20 + 9 * s, 100)
    C, D = (B[0], 100 - 3 * s), (B[0] - 5 * s, 100 - 3 * s)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<path d="M {B[0] - 9} {B[1]} v -9 h 9" fill="none" stroke="currentColor"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 8, C[1] + 4, "C"), napis(D[0] - 8, D[1] + 4, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 16, "9 cm", 11), napis((C[0] + D[0]) / 2, C[1] - 6, "5 cm", 11),
         napis(B[0] + 6, (B[1] + C[1]) / 2 + 4, "3 cm", 11, sidro="start")]
    return svg(B[0] + 45, 122, "".join(t), opis="Pravokotni trapez ABCD")


b3 = naloga(
    "B3", "geometrija_ravnine", 15,
    r"Na skici je trapez \(ABCD\) s pravim kotom pri \(B\): \(|AB| = 9\) cm, \(|CD| = 5\) cm, \(|BC| = 3\) cm." + trapez()
    + r"3.1. Izračunaj obseg in ploščino trapeza. (7 točk)<br>"
    r"3.2. Izračunaj notranja kota trapeza pri ogliščih \(A\) in \(D\). (5 točk)<br>"
    r"3.3. Izračunaj natančno dolžino diagonale \(BD\). (3 točke)",
    r"3.1. \(o = 22\) cm, \(S = 21\ \mathrm{cm^2}\) &nbsp; 3.2. \(\alpha \approx 36^\circ 52'\), \(\delta \approx 143^\circ 8'\) &nbsp; 3.3. \(\sqrt{34}\) cm",
    [
        "## 3.1",
        ("|AD|<sup>2</sup> = (9 − 5)<sup>2</sup> + 3<sup>2</sup> = 25  ⇒  |AD| = 5 cm", "Iz D spustimo višino na AB; dobimo pravokotni trikotnik s katetama 4 cm in 3 cm.", "pitagora"),
        ("!o = 9 + 3 + 5 + 5 = 22 cm", ""),
        ("!S = " + U("9 + 5", "2") + " · 3 = 21 cm<sup>2</sup>", "", "ploscine"),
        "## 3.2",
        ("tan α = " + U("3", "4"), "", "kotne"),
        ("!α ≈ 36,87° = 36° 52′", ""),
        ("!δ = 180° − α ≈ 143° 8′", "Kota ob istem kraku trapeza sta suplementarna."),
        "## 3.3",
        ("|BD|<sup>2</sup> = |BC|<sup>2</sup> + |CD|<sup>2</sup> = 9 + 25 = 34", "Trikotnik BCD je pravokoten pri C."),
        ("!|BD| = " + K("34") + " cm", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
