# Jesenski rok 2010 (uradna pola RIC P102-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2010, "jesenski", "četrtek, 26. avgust 2010"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Okrajšaj ulomek \(\dfrac{x^2 - 9}{3x^2 + 9x}\).",
    r"\(\dfrac{x - 3}{3x}\)",
    [
        ("x<sup>2</sup> − 9 = (x − 3)(x + 3)", "Razlika kvadratov."),
        ("3x<sup>2</sup> + 9x = 3x(x + 3)", "Izpostavimo 3x."),
        ("!" + U("(x − 3)(x + 3)", "3x(x + 3)") + " = " + U("x − 3", "3x"), "Okrajšamo z (x + 3); velja za x ≠ 0 in x ≠ −3."),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"V okvirček zapiši ustrezno število, da bodo veljale enakosti: "
    r"\(\dfrac{1}{a^3} = a^{\square}\), \(\sqrt[4]{a^3} = a^{\square}\), \(\dfrac{1}{\sqrt{a}} = a^{\square}\), \(\sqrt{98} = \square\sqrt{2}\).",
    r"\(-3\), \(\frac{3}{4}\), \(-\frac{1}{2}\), \(7\)",
    [
        ("!" + U("1", "a<sup>3</sup>") + " = a<sup>−3</sup>", "", "potence"),
        ("!∜(a<sup>3</sup>) = a<sup>3/4</sup>", "Koren zapišemo kot potenco z ulomljenim eksponentom."),
        ("!" + U("1", K("a")) + " = " + U("1", "a<sup>1/2</sup>") + " = a<sup>−1/2</sup>", ""),
        ("!" + K("98") + " = " + K("49 · 2") + " = 7" + K("2"), "", "koreni"),
    ],
)

a3 = naloga(
    "A3", "zaporedja_pm", 4,
    r"Dano je zaporedje \(a_n = 23 - 4n\). Izračunaj vsoto vseh pozitivnih členov zaporedja.",
    r"\(55\)",
    [
        ("23 − 4n > 0  ⇒  n < 5,75", "Pozitivni so členi a₁ do a₅.", "aritmeticno"),
        ("a<sub>1</sub> = 19,  a<sub>5</sub> = 3", "Zaporedje je aritmetično z d = −4."),
        ("!s<sub>5</sub> = " + U("5 · (19 + 3)", "2") + " = 55", ""),
    ],
)


def petkotnik():
    s = 18  # px na cm
    o = 20
    P = [(o, o), (o + 5 * s, o), (o + 8 * s, o + 3 * s), (o + 8 * s, o + 8 * s), (o, o + 8 * s)]
    pts = " ".join(f"{x},{y}" for x, y in P)
    t = [f'<polygon points="{o + 5 * s},{o} {o + 8 * s},{o} {o + 8 * s},{o + 3 * s}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         napis(o + 4 * s, o + 8 * s + 15, "8 cm", 11), napis(o + 6.5 * s, o - 5, "3 cm", 10), napis(o + 8 * s + 5, o + 1.7 * s, "3 cm", 10, sidro="start")]
    return svg(o + 8 * s + 45, o + 8 * s + 25, "".join(t), opis="Kvadrat z odrezanim vogalom")


a4 = naloga(
    "A4", "obsegi_ploscine", 4,
    r"Kvadratu s stranico \(8\) cm odrežemo vogal: enakokraki pravokotni trikotnik s krakoma \(3\) cm (glej sliko). Izračunaj obseg nastalega petkotnika." + petkotnik(),
    r"\(o = 26 + 3\sqrt{2} \approx 30{,}24\) cm",
    [
        ("hipotenuza: " + K("3<sup>2</sup> + 3<sup>2</sup>") + " = 3" + K("2") + " cm", "Nova stranica je hipotenuza odrezanega trikotnika.", "pitagora"),
        ("o = 8 + 8 + 5 + 5 + 3" + K("2"), "Dve stranici kvadrata ostaneta celi, dve se skrajšata za 3 cm."),
        ("!o = 26 + 3" + K("2") + " ≈ 30,24 cm", "", "ploscine"),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Eva je v banko vložila \(2000\) EUR. Banka obrestuje obrestnoobrestno po letni obrestni meri \(3\,\%\) z letnim pripisom obresti. Koliko denarja bo imela Eva čez \(4\) leta?",
    r"\(\approx 2251{,}02\) EUR",
    [
        ("r = 1 + " + U("3", "100") + " = 1,03", "", "obresti"),
        ("G<sub>4</sub> = 2000 · 1,03<sup>4</sup>", ""),
        ("!G<sub>4</sub> ≈ 2251,02 EUR", ""),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 5,
    r"Dani sta premici \(y = 2x - 1\) in \(2x - y + 3 = 0\). Nariši ju v koordinatni sistem in opiši njuno medsebojno lego.",
    r"premici sta vzporedni",
    [
        ("2x − y + 3 = 0  ⇒  y = 2x + 3", "Drugo premico zapišemo v eksplicitni obliki.", "premica"),
        ("@slika", graf([(lambda x: 2 * x - 1, MODRA), (lambda x: 2 * x + 3, RDECA)], (-3.5, 3), (-4, 5), [(0, -1, ""), (0, 3, "")], sirina=260, visina=300)),
        ("k<sub>1</sub> = k<sub>2</sub> = 2,  n<sub>1</sub> = −1 ≠ n<sub>2</sub> = 3", ""),
        ("!premici sta vzporedni (in različni)", "Enaka smerna koeficienta, različni začetni vrednosti."),
    ],
)

a7 = naloga(
    "A7", "kotne_funkcije_pm", 5,
    r"Izračunaj natančno vrednost \(\cos\alpha\), če je \(\sin\alpha = \frac{2}{5}\) in je \(\alpha\) ostri kot.",
    r"\(\cos\alpha = \frac{\sqrt{21}}{5}\)",
    [
        ("cos<sup>2</sup>α = 1 − sin<sup>2</sup>α = 1 − " + U("4", "25") + " = " + U("21", "25"), "", "kotne"),
        ("!cos α = " + U(K("21"), "5"), "Za ostri kot je kosinus pozitiven."),
    ],
)

F8 = lambda x: 2 * x * x + 4 * x - 6

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Nariši graf kvadratne funkcije \(f(x) = 2x^2 + 4x - 6\).",
    r"ničli \(-3\), \(1\); teme \(T(-1, -8)\); \(f(0) = -6\)",
    [
        ("2x<sup>2</sup> + 4x − 6 = 2(x + 3)(x − 1)  ⇒  x<sub>1</sub> = −3,  x<sub>2</sub> = 1", "", "kvadratna"),
        ("p = −" + U("4", "4") + " = −1,  q = f(−1) = −8  ⇒  T(−1, −8)", "", "teme"),
        ("f(0) = −6", "Presečišče z osjo y."),
        ("@slika", graf([(F8, MODRA)], (-3.6, 1.6), (-9, 6), [(-3, 0, ""), (1, 0, ""), (-1, -8, "T"), (0, -6, "")], sirina=220, visina=320)),
    ],
)


def trikotnik_a9():
    A, B, C, N = (20, 150), (192, 150), (120, 25), (120, 150)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{C[0]}" y1="{C[1]}" x2="{N[0]}" y2="{N[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<path d="M {N[0]} {N[1] - 10} h 10 v 10" fill="none" stroke="currentColor"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 7, "C"),
         napis(N[0] + 8, 100, "v", 12, RDECA, "start"), napis(110, 58, "35°", 10, sidro="end"),
         napis(48, 145, "α", 12), napis(172, 145, "60°", 10), napis(66, 84, "b", 12)]
    return svg(215, 168, "".join(t), opis="Trikotnik z višino na stranico c")


a9 = naloga(
    "A9", "trikotnik_kotne", 5,
    r"V ostrokotnem trikotniku \(ABC\) meri kot med višino \(v_c\) in stranico \(b\) \(35^\circ\), kot \(\beta\) pa \(60^\circ\). Nariši skico in izračunaj preostala notranja kota trikotnika.",
    r"\(\alpha = 55^\circ\), \(\gamma = 65^\circ\)",
    [
        ("@slika", trikotnik_a9()),
        ("α = 180° − 90° − 35°", "Višina v_c, stranica b in del stranice c tvorijo pravokotni trikotnik s pravim kotom ob nožišču."),
        ("!α = 55°", ""),
        ("!γ = 180° − 55° − 60° = 65°", "Vsota notranjih kotov trikotnika je 180°."),
    ],
)

# ------------------------------------------------------------------ 2. del


def exp_log(X, Y):
    t = krivulja(X, Y, lambda x: 3 ** x, -3, math.log(9.5, 3), MODRA)
    t += krivulja(X, Y, lambda x: math.log(x, 3), 3 ** -2.9, 9.5, RDECA)
    for x, y in [(-1, 1 / 3), (0, 1), (1, 3), (2, 9), (1 / 3, -1), (1, 0), (3, 1), (9, 2)]:
        t += tocka(X, Y, x, y)
    t += napis(X(1.6) , Y(8), "f", 12, MODRA) + napis(X(8), Y(2.6), "g", 12, RDECA)
    return t


b1 = naloga(
    "B1", "eksponentna_logaritemska", 15,
    r"Dani sta funkciji \(f(x) = 3^x\) in \(g(x) = \log_3 x\).<br>"
    r"1.1. Dopolni preglednici in nariši grafa obeh funkcij v isti koordinatni sistem. (8 točk)"
    + tabela(["x", "f(x)", "", "x", "g(x)"], [["−1", "", "", "", "−1"], ["0", "", "", "1", ""], ["1", "", "", "", "1"], ["2", "", "", "9", ""]])
    + r"1.2. Izračunaj \(f(-1) \cdot f(-2) + f(-3)\). (4 točke)<br>"
    r"1.3. Reši enačbo \(g(x) = 3\). (3 točke)",
    r"1.2. \(\frac{2}{27}\) &nbsp; 1.3. \(x = 27\)",
    [
        "## 1.1",
        ("@slika", tabela(["x", "f(x)", "", "x", "g(x)"], [["−1", "1/3", "", "1/3", "−1"], ["0", "1", "", "1", "0"], ["1", "3", "", "3", "1"], ["2", "9", "", "9", "2"]])),
        (None, "g je inverzna funkcija k f, zato v drugi preglednici x in y zamenjata vlogi."),
        ("@slika", mreza((-3, 10), (-3, 10), exp_log, sirina=300)),
        (None, "Grafa sta simetrična glede na premico y = x."),
        "## 1.2",
        ("f(−1) · f(−2) = " + U("1", "3") + " · " + U("1", "9") + " = " + U("1", "27"), "", "potence"),
        ("!" + U("1", "27") + " + " + U("1", "27") + " = " + U("2", "27"), "f(−3) = 1/27."),
        "## 1.3",
        ("log<sub>3</sub> x = 3  ⇒  x = 3<sup>3</sup>", "", "logaritem"),
        ("!x = 27", ""),
    ],
)

MES = [("jan.", 40500), ("feb.", 52000), ("mar.", 39000), ("apr.", 60500)]


def stolpci():
    t = []
    L, B, H = 55, 175, 150
    for k in range(0, 70001, 10000):
        y = B - k / 70000 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 230}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, f"{k // 1000} 000" if k else "0", 9, sidro="end"))
    for i, (m, v) in enumerate(MES):
        x = L + 15 + 55 * i
        h = v / 70000 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="40" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x + 20, B + 14, m, 10))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 230}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(12, 12, "EUR", 10, sidro="start"))
    return svg(300, 195, "".join(t), opis="Mesečni dohodek podjetja")


b2 = naloga(
    "B2", "statistika_pm", 15,
    r"Podjetje je načrtovalo, da bo imelo v prvi tretjini leta povprečni mesečni dohodek \(48\,000\) EUR (izmišljeni podatki). "
    r"Januarja je ustvarilo \(40\,500\) EUR dohodka, februarja \(52\,000\) EUR, marca pa tri četrtine februarskega dohodka. Aprilski dohodek je bil ravno tolikšen, da je bil načrt dosežen.<br>"
    r"2.1. Izračunaj aprilski dohodek podjetja. (7 točk)<br>"
    r"2.2. S stolpčnim diagramom prikaži mesečni dohodek podjetja v prvih štirih mesecih. (4 točke)<br>"
    r"2.3. Koliko odstotkov celotnega dohodka v prvi tretjini leta je podjetje ustvarilo februarja? (4 točke)",
    r"2.1. \(60\,500\) EUR &nbsp; 2.3. \(\approx 27{,}08\,\%\)",
    [
        "## 2.1",
        ("marec: " + U("3", "4") + " · 52 000 = 39 000 EUR", ""),
        ("skupaj po načrtu: 4 · 48 000 = 192 000 EUR", "Povprečje 4 mesecev je 48 000 EUR.", "statistika"),
        ("40 500 + 52 000 + 39 000 = 131 500 EUR", ""),
        ("!april: 192 000 − 131 500 = 60 500 EUR", ""),
        "## 2.2",
        ("@slika", stolpci()),
        "## 2.3",
        ("p = " + U("52 000", "192 000") + " · 100 %", "", "odstotki"),
        ("!p ≈ 27,08 %", ""),
    ],
)


def piramida():
    A, B, C, D = (30, 170), (160, 170), (215, 130), (85, 130)
    S = (122, 20)
    O = (122, 150)
    ln = lambda P, Q, extra="": f'<line x1="{P[0]}" y1="{P[1]}" x2="{Q[0]}" y2="{Q[1]}" stroke="currentColor" stroke-width="1.3"{extra}/>'
    M = ((A[0] + B[0]) / 2, 170)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {S[0]},{S[1]}" fill="{MODRA}" fill-opacity="0.08"/>',
         ln(A, B), ln(B, C), ln(C, D, ' stroke-dasharray="4 3"'), ln(D, A, ' stroke-dasharray="4 3"'),
         ln(S, A), ln(S, B), ln(S, C), ln(S, D, ' stroke-dasharray="4 3"'),
         f'<line x1="{S[0]}" y1="{S[1]}" x2="{O[0]}" y2="{O[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="{S[0]}" y1="{S[1]}" x2="{M[0]}" y2="{M[1]}" stroke="{MODRA}" stroke-width="1.3"/>',
         napis(O[0] + 5, 95, "v", 12, RDECA, "start"), napis(M[0] - 6, 115, "vₐ", 12, MODRA, "end"),
         napis(M[0], 186, "a = 4 dm", 11), napis(S[0], S[1] - 6, "V"), napis(196, 85, "s", 12)]
    return svg(240, 195, "".join(t), opis="Pravilna štiristrana piramida")


b3 = naloga(
    "B3", "povrsine_prostornine", 15,
    r"Osnovna ploskev pokončne štiristrane piramide je kvadrat s stranico \(4\) dm. Višina piramide je \(6\) dm.<br>"
    r"3.1. Nariši skico in izračunaj prostornino piramide. (5 točk)<br>"
    r"3.2. Izračunaj površino piramide. (7 točk)<br>"
    r"3.3. Izračunaj dolžino stranskega roba piramide. (3 točke)",
    r"3.1. \(32\ \mathrm{dm^3}\) &nbsp; 3.2. \(16 + 16\sqrt{10} \approx 66{,}60\ \mathrm{dm^2}\) &nbsp; 3.3. \(2\sqrt{11} \approx 6{,}63\) dm",
    [
        "## 3.1",
        ("@slika", piramida()),
        ("V = " + U("a<sup>2</sup> · v", "3") + " = " + U("16 · 6", "3"), "", "telesa"),
        ("!V = 32 dm<sup>3</sup>", ""),
        "## 3.2",
        ("v<sub>a</sub> = " + K("v<sup>2</sup> + (a/2)<sup>2</sup>") + " = " + K("36 + 4") + " = 2" + K("10") + " dm", "Višina stranske ploskve, iz pravokotnega trikotnika z v in a/2.", "pitagora"),
        ("pl = 4 · " + U("a · v<sub>a</sub>", "2") + " = 2 · 4 · 2" + K("10") + " = 16" + K("10") + " dm<sup>2</sup>", ""),
        ("!P = a<sup>2</sup> + pl = 16 + 16" + K("10") + " ≈ 66,60 dm<sup>2</sup>", ""),
        "## 3.3",
        ("s<sup>2</sup> = v<sup>2</sup> + (" + U("a" + K("2"), "2") + ")<sup>2</sup> = 36 + 8 = 44", "Polovica diagonale osnovne ploskve je 2√2 dm."),
        ("!s = " + K("44") + " = 2" + K("11") + " ≈ 6,63 dm", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
