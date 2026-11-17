# Spomladanski rok 2007 (uradna pola RIC P071-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2007, "spomladanski", "sobota, 2. junij 2007"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "realna_stevila_koreni", 4,
    r"Izračunaj natančno vrednost izraza \(125^{-\frac{1}{3}} - \sqrt{50} + \sqrt{6} \cdot \sqrt{12}\).",
    r"\(\frac{1}{5} + \sqrt{2}\)",
    [
        ("125<sup>−1/3</sup> = " + U("1", "∛125") + " = " + U("1", "5"), "", "potence"),
        (K("50") + " = 5" + K("2") + ",  " + K("6") + " · " + K("12") + " = " + K("72") + " = 6" + K("2"), "", "koreni"),
        ("!" + U("1", "5") + " − 5" + K("2") + " + 6" + K("2") + " = " + U("1", "5") + " + " + K("2"), ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Na koncu šolskega leta je bilo na neki šoli \(84\) odličnjakov, kar je \(10{,}5\,\%\) vseh dijakov šole. Koliko dijakov je na tej šoli?",
    r"\(800\)",
    [
        ("0,105 · x = 84", "", "odstotki"),
        ("!x = " + U("84", "0,105") + " = 800 dijakov", ""),
    ],
)


def koti_a3():
    def P(c, ang, r):
        a = math.radians(ang)
        return (c[0] + r * math.cos(a), c[1] - r * math.sin(a))

    def lok(c, a0, a1, r, barva):
        pts = " ".join(f"{P(c, a0 + (a1 - a0) * i / 30, r)[0]:.1f},{P(c, a0 + (a1 - a0) * i / 30, r)[1]:.1f}" for i in range(31))
        return f'<polyline points="{pts}" fill="none" stroke="{barva}" stroke-width="1.3"/>'

    L = (130, 150)
    Up = P(L, 84.8, 85)
    t = []
    for c, n in [(L, "p"), (Up, "q")]:
        A, B = P(c, 200, 120), P(c, 20, 120)
        t.append(f'<line x1="{A[0]:.1f}" y1="{A[1]:.1f}" x2="{B[0]:.1f}" y2="{B[1]:.1f}" stroke="currentColor" stroke-width="1.4"/>')
        t.append(napis(B[0] - 4, B[1] - 6, n, 12))
    A, B = P(L, 264.8, 55), P(Up, 84.8, 55)
    t.append(f'<line x1="{A[0]:.1f}" y1="{A[1]:.1f}" x2="{B[0]:.1f}" y2="{B[1]:.1f}" stroke="currentColor" stroke-width="1.4"/>')
    t.append(lok(L, 200, 264.8, 24, RDECA) + lok(L, 264.8, 380, 18, MODRA) + lok(Up, 20, 84.8, 20, MODRA))
    g = P(L, 232, 38)
    y = P(L, 322, 32)
    x = P(Up, 52, 32)
    t.append(napis(g[0], g[1] + 4, "64° 48′", 10, RDECA) + napis(y[0], y[1] + 4, "y", 12, MODRA) + napis(x[0], x[1] + 4, "x", 12, MODRA))
    t.append(napis(20, 30, "p ∥ q", 11, sidro="start"))
    return svg(270, 215, "".join(t), opis="Vzporednici p in q, presekani s premico")


a3 = naloga(
    "A3", "geometrija_ravnine", 4,
    r"Premici \(p\) in \(q\) sta vzporedni. Izračunaj velikost kotov \(x\) in \(y\), prikazanih na skici." + koti_a3(),
    r"\(x = 64^\circ 48'\), \(y = 115^\circ 12'\)",
    [
        ("!y = 180° − 64° 48′ = 115° 12′", "Kota y in 64° 48′ sta sokota (skupaj tvorita iztegnjeni kot)."),
        ("!x = 64° 48′", "Kot ob p, ki je sovršen danemu kotu, in kot x ob q sta skladna kota ob vzporednicah."),
    ],
)

a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"Reši sistem enačb: \(x + y + z = 6\), \(2x - y + z = 3\), \(x + 2y - z = 2\).",
    r"\(x = 1\), \(y = 2\), \(z = 3\)",
    [
        ("(1) + (3): 2x + 3y = 8", "Seštejemo, da odpravimo z.", "sistem"),
        ("(2) + (3): 3x + y = 5", ""),
        ("y = 5 − 3x  ⇒  2x + 15 − 9x = 8  ⇒  x = 1", ""),
        ("!x = 1,  y = 2,  z = 6 − 1 − 2 = 3", ""),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"V vrsti je po masi razvrščenih \(7\) kamnov. Najlažji tehta \(0{,}2\) kg, vsak naslednji pa dvakrat toliko kakor prejšnji. Koliko tehta najtežji kamen in koliko tehtajo vsi skupaj?",
    r"\(12{,}8\) kg; \(25{,}4\) kg",
    [
        ("a<sub>1</sub> = 0,2,  q = 2,  n = 7", "", "geometrijsko"),
        ("!a<sub>7</sub> = 0,2 · 2<sup>6</sup> = 12,8 kg", ""),
        ("!s<sub>7</sub> = 0,2 · " + U("2<sup>7</sup> − 1", "2 − 1") + " = 0,2 · 127 = 25,4 kg", ""),
    ],
)

PA6 = lambda x: -x ** 3 + 4 * x

a6 = naloga(
    "A6", "polinomi_racionalna", 5,
    r"Skiciraj graf polinoma \(p(x) = -x^3 + 4x\).",
    r"ničle \(-2, 0, 2\)",
    [
        ("p(x) = −x(x<sup>2</sup> − 4) = −x(x − 2)(x + 2)", ""),
        ("ničle: −2, 0, 2 (vse enostavne)", "Graf v vsaki ničli seka os x."),
        ("vodilni koeficient −1  ⇒  za velike x gre graf proti −∞", "Za zelo negativne x gre proti +∞."),
        ("p(1) = 3,  p(−1) = −3", "Pomožni točki."),
        ("@slika", graf([(PA6, MODRA)], (-2.6, 2.6), (-8, 8), [(-2, 0, ""), (0, 0, ""), (2, 0, ""), (1, 3, ""), (-1, -3, "")], sirina=220, visina=360)),
    ],
)


def piramida_a7():
    A, B, C, D = (30, 160), (150, 160), (200, 125), (80, 125)
    S = (115, 20)
    O = (115, 142.5)
    M = (175, 142.5)
    ln = lambda P, Q, extra="": f'<line x1="{P[0]}" y1="{P[1]}" x2="{Q[0]}" y2="{Q[1]}" stroke="currentColor" stroke-width="1.3"{extra}/>'
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {S[0]},{S[1]}" fill="{MODRA}" fill-opacity="0.08"/>',
         ln(A, B), ln(B, C), ln(C, D, ' stroke-dasharray="4 3"'), ln(D, A, ' stroke-dasharray="4 3"'),
         ln(S, A), ln(S, B), ln(S, C), ln(S, D, ' stroke-dasharray="4 3"'),
         ln(S, O, ' stroke-dasharray="4 3"'), ln(O, M, ' stroke-dasharray="4 3"'),
         f'<line x1="{S[0]}" y1="{S[1]}" x2="{M[0]}" y2="{M[1]}" stroke="{RDECA}" stroke-width="1.5"/>',
         f'<path d="M 157 142.5 A 18 18 0 0 1 167.1 126.3" fill="none" stroke="{RDECA}" stroke-width="1.3"/>',
         napis(150, 136, "φ", 12, RDECA, "end"), napis(119, 90, "v", 12, sidro="start"), napis(90, 176, "a = 3,6 m", 10)]
    return svg(225, 185, "".join(t), opis="Pravilna štiristrana piramida z naklonskim kotom stranske ploskve")


a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Osnovni rob pravilne štiristrane piramide meri \(3{,}6\) m. Stranska ploskev je proti osnovni ploskvi nagnjena za kot \(\varphi = 78^\circ\). Nariši skico, označi kot \(\varphi\) in izračunaj prostornino piramide.",
    r"\(V \approx 36{,}58\ \mathrm{m^3}\)",
    [
        ("@slika", piramida_a7()),
        ("tan φ = " + U("v", "a/2") + "  ⇒  v = 1,8 · tan 78° ≈ 8,47 m", "Višina piramide, polovica osnovnega roba in višina stranske ploskve tvorijo pravokotni trikotnik.", "kotne"),
        ("V = " + U("a<sup>2</sup> · v", "3") + " = " + U("12,96 · 8,468", "3"), "", "telesa"),
        ("!V ≈ 36,58 m<sup>3</sup>", ""),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Izračunaj abscisi presečišč parabole \(y = -x^2 + 2x + 3\) in premice \(y = -x + 3\).",
    r"\(x_1 = 0\), \(x_2 = 3\)",
    [
        ("−x<sup>2</sup> + 2x + 3 = −x + 3", ""),
        ("−x<sup>2</sup> + 3x = 0  ⇒  −x(x − 3) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = 0,  x<sub>2</sub> = 3", ""),
    ],
)

a9 = naloga(
    "A9", "eksponentna_logaritemska", 5,
    r"Skiciraj graf funkcije \(f(x) = \left(\frac{1}{3}\right)^x\). Za kateri \(x\) velja \(f(x) = 27\)?",
    r"\(x = -3\)",
    [
        ("f(0) = 1,  f(−1) = 3,  f(1) = " + U("1", "3") + ",  f(−2) = 9", "Funkcija pada; asimptota je os x.", "eksponentna"),
        ("@slika", graf([(lambda x: (1 / 3) ** x, MODRA)], (-2.1, 4), (-1, 10), [(0, 1, ""), (-1, 3, ""), (-2, 9, ""), (1, 1 / 3, "")], sirina=240, visina=330)),
        ("3<sup>−x</sup> = 3<sup>3</sup>  ⇒  −x = 3", "(1/3)ˣ = 3⁻ˣ."),
        ("!x = −3", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
FB1 = lambda x: (x - 4) / (x + 1) ** 2

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x - 4}{x^2 + 2x + 1}\).<br>"
    r"1.1. Zapiši ničlo, presečišče z ordinatno osjo, pol in enačbo vodoravne asimptote. (5 točk)<br>"
    r"1.2. Nariši graf funkcije. (5 točk)<br>"
    r"1.3. Za kateri \(x\) velja \(f(x) = \dfrac{3}{x + 1}\)? (5 točk)",
    r"1.1. ničla \(4\), \((0, -4)\), pol \(-1\) (dvojni), \(y = 0\) &nbsp; 1.3. \(x = -\frac{7}{2}\)",
    [
        "## 1.1",
        ("f(x) = " + U("x − 4", "(x + 1)<sup>2</sup>"), "", "racionalna"),
        ("!ničla x = 4,  presečišče (0, −4)", ""),
        ("!pol x = −1 (dvojni),  asimptota y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        "## 1.2",
        ("f(−3) = −" + U("7", "4") + ",  f(1) = −" + U("3", "4") + ",  f(9) = " + U("1", "20"), "Desno od 4 je graf nad osjo x in se ji spet približuje."),
        ("@slika", graf([(FB1, MODRA), (lambda x: 0, RDECA)], (-7, 10), (-6, 2), [(4, 0, ""), (0, -4, ""), (-3, -1.75, ""), (1, -0.75, "")], sirina=320, visina=230)),
        "## 1.3",
        (U("x − 4", "(x + 1)<sup>2</sup>") + " = " + U("3", "x + 1"), "Pogoj: x ≠ −1."),
        ("x − 4 = 3(x + 1)  ⇒  −2x = 7", "Pomnožimo z (x + 1)²."),
        ("!x = −" + U("7", "2"), "Rešitev ustreza pogoju."),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 15,
    r"Prvi trije členi aritmetičnega zaporedja so \(a_1 = 12\), \(a_2 = 11{,}5\) in \(a_3 = 11\).<br>"
    r"2.1. Izračunaj vrednost izraza \(a_{20} - 2a_{50}\). (5 točk)<br>"
    r"2.2. Koliko začetnih členov moramo sešteti, da bo vsota enaka \(0\)? (5 točk)<br>"
    r"2.3. Kateri člen zaporedja ima vrednost \(-10\)? (5 točk)",
    r"2.1. \(27{,}5\) &nbsp; 2.2. \(49\) &nbsp; 2.3. \(a_{45}\)",
    [
        "## 2.1",
        ("d = 11,5 − 12 = −0,5", "", "aritmeticno"),
        ("a<sub>20</sub> = 12 + 19 · (−0,5) = 2,5,  a<sub>50</sub> = 12 + 49 · (−0,5) = −12,5", ""),
        ("!a<sub>20</sub> − 2a<sub>50</sub> = 2,5 + 25 = 27,5", ""),
        "## 2.2",
        (U("n", "2") + " · (2 · 12 + (n − 1)(−0,5)) = 0", ""),
        ("24 − 0,5(n − 1) = 0  ⇒  n − 1 = 48", "n ≠ 0, zato je nič drugi faktor."),
        ("!n = 49", ""),
        "## 2.3",
        ("12 − 0,5(n − 1) = −10  ⇒  n − 1 = 44", ""),
        ("!n = 45, torej a<sub>45</sub> = −10", ""),
    ],
)


def trikotnik_b3():
    s = 22
    A = (20, 168)
    al = math.radians(52.3)
    B = (A[0] + 4.1 * s, A[1])
    C = (A[0] + 8.024 * s * math.cos(al), A[1] - 8.024 * s * math.sin(al))
    Mc = ((A[0] + B[0]) / 2, A[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]:.1f},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{C[0]:.1f}" y1="{C[1]:.1f}" x2="{Mc[0]:.1f}" y2="{Mc[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 6, C[1] - 4, "C"),
         napis(Mc[0], A[1] + 15, "c = 4,1 cm", 10), napis((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2, "a = 6,4 cm", 10, sidro="start"),
         napis(40, 160, "α", 12), napis(Mc[0] + 12, 138, "tc", 11, RDECA, "start")]
    return svg(220, 188, "".join(t), opis="Trikotnik ABC s težiščnico na stranico c")


b3 = naloga(
    "B3", "trikotnik_kotne", 15,
    r"Dan je trikotnik \(ABC\) s podatki \(a = 6{,}4\) cm, \(c = 4{,}1\) cm in \(\alpha = 52^\circ 18'\).<br>"
    r"3.1. Nariši skico trikotnika in izračunaj njegovo ploščino. (8 točk)<br>"
    r"3.2. Izračunaj dolžino težiščnice na stranico \(c\). (4 točke)<br>"
    r"3.3. Ali je trikotnik enakokrak? Odgovor utemelji. (3 točke)",
    r"3.1. \(S \approx 13{,}02\ \mathrm{cm^2}\) &nbsp; 3.2. \(t_c \approx 6{,}96\) cm &nbsp; 3.3. ne",
    [
        "## 3.1",
        ("@slika", trikotnik_b3()),
        ("sin γ = " + U("c · sin α", "a") + " = " + U("4,1 · sin 52° 18′", "6,4") + " ≈ 0,5069", "γ je oster, ker je c < a.", "sinusni"),
        ("γ ≈ 30° 27′,  β = 180° − α − γ ≈ 97° 15′", ""),
        ("b = " + U("a · sin β", "sin α") + " ≈ 8,02 cm", ""),
        ("!S = " + U("1", "2") + " · a · c · sin β ≈ 13,02 cm<sup>2</sup>", "", "ploscine"),
        "## 3.2",
        ("t<sub>c</sub><sup>2</sup> = " + U("2a<sup>2</sup> + 2b<sup>2</sup> − c<sup>2</sup>", "4") + " ≈ " + U("81,92 + 128,78 − 16,81", "4") + " ≈ 48,47", "Formula za težiščnico."),
        ("!t<sub>c</sub> ≈ 6,96 cm", ""),
        "## 3.3",
        ("!ne", "Vse tri stranice (6,4 cm, 8,02 cm, 4,1 cm) so različne, prav tako vsi trije koti."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
