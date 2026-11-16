# Zimski rok 2014 (uradna pola RIC P143-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2014, "zimski", "torek, 3. februar 2015"

# ------------------------------------------------------------------ 1. del
GRAFI = [
    ("A", lambda x: 3 ** x if x < 2.2 else None),
    ("B", lambda x: math.log(x, 3) if x > 0 else None),
    ("C", lambda x: -x * x + 4),
    ("D", lambda x: (x - 2) / (x + 1)),
]
mini = "".join(f'<div style="display:inline-block;margin:0 0.5rem 0.5rem 0;text-align:center"><b>{c}</b>'
               + graf([(f, MODRA)], (-4, 4), (-4, 6), [], sirina=150, visina=150, oznake=False) + "</div>" for c, f in GRAFI)

a1 = naloga(
    "A1", "eksponentna_logaritemska", 4,
    r"Na slikah so grafi nekaterih izmed naslednjih funkcij: \(f(x) = -x^2 + 4\), \(g(x) = \log_3 x\), \(h(x) = 3^x\), \(i(x) = 4^{-x}\), "
    r"\(j(x) = \dfrac{x - 2}{x + 1}\), \(k(x) = -2x + 4\). Pod vsako sliko zapiši funkcijo, katere graf je na sliki.<br>" + mini,
    r"A: \(h\), B: \(g\), C: \(f\), D: \(j\)",
    [
        ("!A: h(x) = 3<sup>x</sup>", "Naraščajoča eksponentna funkcija, gre skozi (0, 1).", "eksponentna"),
        ("!B: g(x) = log<sub>3</sub> x", "Definirana le za x > 0, gre skozi (1, 0).", "logaritem"),
        ("!C: f(x) = −x<sup>2</sup> + 4", "Parabola, odprta navzdol, s temenom (0, 4).", "kvadratna"),
        ("!D: j(x) = " + U("x − 2", "x + 1"), "Ima pol pri x = −1 in vodoravno asimptoto y = 1.", "racionalna"),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Cena prenosnega računalnika v spletni trgovini je bila \(600\) EUR. V akciji so ga pocenili za \(15\,\%\). Pri nakupu zaračunajo še \(12\) EUR poštnine. "
    r"Koliko evrov potrebujemo za nakup?",
    r"\(522\) EUR",
    [
        ("0,85 · 600 = 510 EUR", "Po pocenitvi za 15 % ostane 85 % cene.", "odstotki"),
        ("!510 + 12 = 522 EUR", "Za nakup potrebujemo 522 EUR."),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Brez žepnega računala izračunaj: \(\left(\frac{2}{3} + \frac{1}{4} \cdot \frac{2}{5}\right) \cdot 15 - 4\).",
    r"\(\frac{15}{2}\)",
    [
        (U("1", "4") + " · " + U("2", "5") + " = " + U("1", "10"), "Najprej množenje v oklepaju."),
        (U("2", "3") + " + " + U("1", "10") + " = " + U("20 + 3", "30") + " = " + U("23", "30"), ""),
        (U("23", "30") + " · 15 = " + U("23", "2"), ""),
        ("!" + U("23", "2") + " − 4 = " + U("15", "2"), ""),
    ],
)

a4 = naloga(
    "A4", "izrazi_potence", 4,
    r"Poenostavi izraz \(2^{x+3} \cdot 4^{x-1} : 8^{x}\).",
    r"\(2\)",
    [
        ("4<sup>x−1</sup> = 2<sup>2x−2</sup>,  8<sup>x</sup> = 2<sup>3x</sup>", "Vse zapišemo s potencami z osnovo 2.", "potence"),
        ("2<sup>(x + 3) + (2x − 2) − 3x</sup> = 2<sup>1</sup>", ""),
        ("!= 2", ""),
    ],
)

a5 = naloga(
    "A5", "odvod_pm", 4,
    r"Kvadratna funkcija je dana s predpisom \(f(x) = x^2 - 4x\). Zapiši enačbo tangente na graf funkcije v točki \(A(3, -3)\).",
    r"\(y = 2x - 9\)",
    [
        ("f'(x) = 2x − 4  ⇒  k = f'(3) = 2", "", "odvod"),
        ("y + 3 = 2(x − 3)", "", "tangenta"),
        ("!y = 2x − 9", ""),
    ],
)

a6 = naloga(
    "A6", "polinomi_racionalna", 5,
    r"Skiciraj graf funkcije \(f(x) = \dfrac{6 - 3x}{x + 2}\).",
    r"Ničla \(2\), pol \(-2\), asimptota \(y = -3\), \(f(0) = 3\)",
    [
        ("ničla: 6 − 3x = 0  ⇒  x = 2", "", "racionalna"),
        ("pol: x = −2", ""),
        ("vodoravna asimptota: y = " + U("−3", "1") + " = −3", ""),
        ("začetna vrednost: f(0) = 3", ""),
        ("@slika", graf([(lambda x: (6 - 3 * x) / (x + 2), MODRA), (lambda x: -3, RDECA)], (-9, 6), (-12, 7), [(2, 0, ""), (0, 3, "")], sirina=300, visina=380)),
        ("!Graf ima dve veji ob polu x = −2.", ""),
    ],
)


def trikotnika():
    k = 24
    # pravokotni trikotnik: pravi kot pri C, AC = 3, BC = 5
    C = (40, 100 - 3 * k)
    A, B = (40, 100), (40 + 5 * k, 100 - 3 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<polyline points="{C[0] + 8},{C[1]} {C[0] + 8},{C[1] + 8} {C[0]},{C[1] + 8}" fill="none" stroke="currentColor"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 9, B[1] + 4, "B"), napis(C[0] - 8, C[1] - 2, "C"),
         napis(C[0] - 10, (A[1] + C[1]) / 2 + 4, "3", 12), napis((C[0] + B[0]) / 2, C[1] - 6, "5", 12), napis(B[0] - 28, B[1] + 12, "β", 12)]
    # drugi trikotnik: b = 5, c = 8, alfa = 25
    X0, Y0, s = 190, 100, 18
    Cx, Cy = X0 + 5 * s * math.cos(math.radians(25)), Y0 - 5 * s * math.sin(math.radians(25))
    t += [f'<polygon points="{X0},{Y0} {X0 + 8 * s},{Y0} {Cx:.1f},{Cy:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
          napis(X0 - 8, Y0 + 4, "A"), napis(X0 + 8 * s + 9, Y0 + 4, "B"), napis(Cx, Cy - 6, "C"),
          napis(X0 + 4 * s, Y0 + 15, "8", 12), napis((X0 + Cx) / 2 - 4, (Y0 + Cy) / 2 - 6, "5", 12), napis((X0 + 8 * s + Cx) / 2 + 8, (Y0 + Cy) / 2 - 4, "a", 12),
          napis(X0 + 30, Y0 - 4, "25°", 10)]
    return svg(360, 120, "".join(t), opis="Pravokotni trikotnik in trikotnik s kotom 25°")

a7 = naloga(
    "A7", "trikotnik_kotne", 5,
    r"Na levi sliki izračunaj velikost kota \(\beta\), na desni sliki pa dolžino stranice \(a\)." + trikotnika(),
    r"\(\beta \approx 30{,}96^\circ\), \(a \approx 4{,}06\)",
    [
        ("tan β = " + U("AC", "BC") + " = " + U("3", "5"), "Kateta AC leži nasproti kota β, kateta BC je priležna.", "kotne"),
        ("!β ≈ 30,96°", ""),
        ("a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc cos α = 25 + 64 − 80 cos 25°", "", "kosinusni"),
        ("a<sup>2</sup> ≈ 16,495", ""),
        ("!a ≈ 4,06", ""),
    ],
)

a8 = naloga(
    "A8", "povrsine_prostornine", 5,
    r"Štiri \(12\)-litrska in šest \(5\)-litrskih veder vode prelijemo v sod v obliki pokončnega valja s polmerom \(3\) dm. Kako visoko bo gladina vode v sodu?",
    r"\(\approx 2{,}76\) dm",
    [
        ("V = 4 · 12 + 6 · 5 = 78 ℓ = 78 dm<sup>3</sup>", ""),
        ("πr<sup>2</sup>h = 78  ⇒  9π · h = 78", "", "telesa"),
        ("!h = " + U("78", "9π") + " ≈ 2,76 dm", ""),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Notranji koti trikotnika \(ABC\) tvorijo aritmetično zaporedje z diferenco \(15^\circ\). Izračunaj vse notranje kote trikotnika.",
    r"\(45^\circ, 60^\circ, 75^\circ\)",
    [
        ("α + (α + 15°) + (α + 30°) = 180°", "Vsota notranjih kotov trikotnika je 180°.", "aritmeticno"),
        ("3α = 135°  ⇒  α = 45°", ""),
        ("!45°, 60°, 75°", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dani sta funkciji \(f(x) = x + 2\) in \(g(x) = -2x + 5\).<br>"
    r"1.1. Natančno nariši grafa obeh funkcij. Zapiši, katera funkcija je naraščajoča, in za katere \(x\) je funkcija \(g\) pozitivna. (6 točk)<br>"
    r"1.2. Računsko določi presečišče grafov in izračunaj kot, ki ga oklepata. (6 točk)<br>"
    r"1.3. Izračunaj ploščino trikotnika, ki ga določata grafa funkcij \(f\) in \(g\) ter abscisna os. (3 točke)",
    r"1.1. \(f\); \(x < \frac{5}{2}\) &nbsp; 1.2. \(P(1, 3)\), \(\varphi \approx 71{,}57^\circ\) &nbsp; 1.3. \(6{,}75\)",
    [
        "## 1.1",
        ("@slika", graf([(lambda x: x + 2, MODRA), (lambda x: -2 * x + 5, RDECA)], (-4, 5), (-4, 7), [(-2, 0, ""), (2.5, 0, ""), (1, 3, "P")], sirina=280, visina=340)),
        ("!f je naraščajoča", "Njen smerni koeficient je 1 > 0.", "premica"),
        ("!g(x) > 0 za x < " + U("5", "2"), "−2x + 5 > 0.", "neenacba"),
        "## 1.2",
        ("x + 2 = −2x + 5  ⇒  x = 1,  y = 3", ""),
        ("!P(1, 3)", ""),
        ("tan φ = |" + U("k<sub>2</sub> − k<sub>1</sub>", "1 + k<sub>1</sub>k<sub>2</sub>") + "| = |" + U("−2 − 1", "1 − 2") + "| = 3", "Kot med premicama.", "premica"),
        ("!φ ≈ 71,57°", ""),
        "## 1.3",
        ("ničli: f: x = −2,  g: x = " + U("5", "2"), ""),
        ("osnovnica: " + U("5", "2") + " − (−2) = 4,5;  višina: 3", "Višina je ordinata presečišča P."),
        ("!S = " + U("4,5 · 3", "2") + " = 6,75", "", "ploscine"),
    ],
)

OC = [5, 6, 7, 8, 9, 10]
FR = [10, 7, 5, 4, 2, 2]

b2 = naloga(
    "B2", "statistika_pm", 15,
    r"Izpita se je udeležilo \(30\) študentov in doseglo naslednje ocene:<br>"
    + ", ".join(str(o) for o, f in zip(OC, FR) for _ in range(f)) + ".<br>"
    r"2.1. Izpolni preglednico absolutnih in relativnih frekvenc. (6 točk)" + tabela(["Ocena", "Absolutna frekvenca", "Relativna frekvenca"], [[str(o), "", ""] for o in OC])
    + r"2.2. Podatke prikaži s stolpčnim diagramom. (5 točk)<br>"
    r"2.3. Izračunaj aritmetično sredino, mediano in modus. (4 točke)",
    r"2.3. \(\bar{x} \approx 6{,}57\), \(Me = 6\), \(Mo = 5\)",
    [
        "## 2.1",
        ("@slika", tabela(["Ocena", "f", "f/n"], [[str(o), str(f), f"{f}/30 ≈ {100 * f / 30:.1f} %".replace(".", ",")] for o, f in zip(OC, FR)])),
        (None, "Relativna frekvenca je absolutna frekvenca, deljena s številom vseh podatkov (30)."),
        "## 2.2",
        ("@slika", svg(280, 170, "".join(f'<rect x="{30 + i * 40}" y="{140 - f * 12}" width="28" height="{f * 12}" fill="{MODRA}" fill-opacity="0.75"/>'
                                         + napis(44 + i * 40, 136 - f * 12, str(f), 10) + napis(44 + i * 40, 156, str(o), 11)
                                         for i, (o, f) in enumerate(zip(OC, FR))) + '<line x1="22" y1="140" x2="270" y2="140" stroke="currentColor"/>',
                       opis="Stolpčni diagram ocen")),
        "## 2.3",
        ("x̄ = " + U("50 + 42 + 35 + 32 + 18 + 20", "30") + " = " + U("197", "30"), "", "statistika"),
        ("!x̄ ≈ 6,57", ""),
        ("!Me = 6", "15. in 16. podatek po velikosti sta oba 6 (ocene 5 so na mestih 1–10, ocene 6 na mestih 11–17)."),
        ("!Mo = 5", "Najpogostejša ocena."),
    ],
)


def trapez_b3():
    k = 13
    A, B = (25, 70), (25 + 16 * k, 70)
    D, C = (25 + 4 * k, 70 - 3 * k), (25 + 12 * k, 70 - 3 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{D[0]}" y1="{D[1]}" x2="{D[0]}" y2="{A[1]}" stroke="{RDECA}" stroke-dasharray="3 3"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]}" stroke="currentColor" stroke-dasharray="5 3" stroke-opacity="0.6"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 6, C[1] - 4, "C"), napis(D[0] - 6, D[1] - 4, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "a = 16", 11), napis((C[0] + D[0]) / 2, D[1] - 6, "c = 8", 11),
         napis(A[0] + 14, (A[1] + D[1]) / 2 - 2, "d", 11), napis(B[0] - 14, (A[1] + D[1]) / 2 - 2, "b", 11), napis(D[0] + 8, A[1] - 12, "v", 11, RDECA)]
    return svg(260, 95, "".join(t), opis="Enakokraki trapez ABCD")

b3 = naloga(
    "B3", "trikotnik_kotne", 15,
    r"Dan je enakokraki trapez \(ABCD\) s podatki: \(a = 16\) cm, \(b = d = 5\) cm, \(c = 8\) cm.<br>"
    r"3.1. Nariši skico ter izračunaj obseg in ploščino trapeza. (7 točk)<br>"
    r"3.2. Izračunaj notranja kota pri ogliščih \(A\) in \(B\) v stopinjah in minutah. (5 točk)<br>"
    r"3.3. Izračunaj dolžino diagonale \(AC\). (3 točke)",
    r"3.1. \(o = 34\) cm, \(S = 36\ \mathrm{cm^2}\) &nbsp; 3.2. \(\alpha = \beta \approx 36^\circ 52'\) &nbsp; 3.3. \(AC = 3\sqrt{17} \approx 12{,}37\) cm",
    [
        "## 3.1",
        ("@slika", trapez_b3()),
        ("!o = 16 + 5 + 8 + 5 = 34 cm", ""),
        ("x = " + U("a − c", "2") + " = 4 cm,  v = " + K("5<sup>2</sup> − 4<sup>2</sup>") + " = 3 cm", "Višina iz D odreže pravokotni trikotnik.", "pitagora"),
        ("!S = " + U("16 + 8", "2") + " · 3 = 36 cm<sup>2</sup>", "", "ploscine"),
        "## 3.2",
        ("cos α = " + U("4", "5") + "  ⇒  α ≈ 36,87°", "", "kotne"),
        ("!α = β ≈ 36° 52'", "Trapez je enakokrak, kota ob osnovnici a sta enaka."),
        "## 3.3",
        ("AC = " + K("(a − x)<sup>2</sup> + v<sup>2</sup>") + " = " + K("12<sup>2</sup> + 3<sup>2</sup>") + " = " + K("153"), "", "pitagora"),
        ("!AC = 3" + K("17") + " ≈ 12,37 cm", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
