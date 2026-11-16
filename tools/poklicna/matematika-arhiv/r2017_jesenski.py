# Jesenski rok 2017 (uradna pola RIC P172-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2017, "jesenski", "petek, 25. avgust 2017"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Brez računala natančno izračunaj \(\frac{2}{5} \cdot 2^{-1} + \frac{7}{10}\).",
    r"\(\frac{9}{10}\)",
    [
        ("2<sup>−1</sup> = " + U("1", "2"), ""),
        (U("2", "5") + " · " + U("1", "2") + " = " + U("1", "5") + " = " + U("2", "10"), ""),
        ("!" + U("2", "10") + " + " + U("7", "10") + " = " + U("9", "10"), ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"V anketi so ljudi vprašali, kako pogosto obiščejo kino. \(30\,\%\) jih je odgovorilo »redko«, \(8\,\%\) »vsak teden«, \(744\) pa »nikoli«. "
    r"Koliko oseb je sodelovalo v anketi?",
    r"\(1200\)",
    [
        ("»nikoli«: 100 % − 30 % − 8 % = 62 %", ""),
        ("0,62 · x = 744", "", "odstotki"),
        ("!x = 1200 oseb", ""),
    ],
)


def kvadrat_a3():
    k = 22
    A, B, C, D = (20, 160), (20 + 6 * k, 160), (20 + 6 * k, 160 - 6 * k), (20, 160 - 6 * k)
    P = (20 + 3 * k, 160)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-opacity="0.5"/>',
         f'<polyline points="{A[0]},{A[1]} {D[0]},{D[1]} {P[0]},{P[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="none" stroke="{MODRA}" stroke-width="2.5"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0] + 8, C[1] - 2, "C"), napis(D[0] - 8, D[1] - 2, "D"), napis(P[0], P[1] + 14, "P")]
    return svg(180, 180, "".join(t), opis="Kvadrat ABCD s točko P")

a3 = naloga(
    "A3", "geometrija_ravnine", 4,
    r"V kvadratu \(ABCD\) točka \(P\) razpolavlja stranico \(AB\). Dolžina daljice \(DP\) je \(3\sqrt{5}\) cm. Na desetinko natančno izračunaj "
    r"dolžino lomljene črte \(AD + DP + PB + BC\)." + kvadrat_a3(),
    r"\(\approx 21{,}7\) cm",
    [
        ("a<sup>2</sup> + (" + U("a", "2") + ")<sup>2</sup> = (3" + K("5") + ")<sup>2</sup> = 45", "Trikotnik APD je pravokoten.", "pitagora"),
        (U("5a<sup>2</sup>", "4") + " = 45  ⇒  a<sup>2</sup> = 36  ⇒  a = 6 cm", ""),
        ("AD + DP + PB + BC = 6 + 3" + K("5") + " + 3 + 6", ""),
        ("!≈ 21,7 cm", "3√5 ≈ 6,71."),
    ],
)

a4 = naloga(
    "A4", "trikotnik_kotne", 4,
    r"Pravokotni trikotnik \(ABC\) (pravi kot pri \(C\)) ima ploščino \(54\ \mathrm{cm^2}\) in kateto \(a = 9\) cm. Izračunaj drugo kateto in kot \(\alpha\) pri oglišču \(A\).",
    r"\(b = 12\) cm, \(\alpha \approx 36{,}87^\circ\)",
    [
        (U("a · b", "2") + " = 54  ⇒  b = " + U("108", "9") + " = 12 cm", "Ploščina pravokotnega trikotnika je polovica produkta katet."),
        ("tan α = " + U("a", "b") + " = " + U("9", "12") + " = 0,75", "Kateta a leži nasproti kota α.", "kotne"),
        ("!α ≈ 36,87°", ""),
    ],
)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Dana sta polinoma \(p(x) = -x^3 + 3x^2 - 7\) in \(q(x) = x - 2\). Deli \(p\) s \(q\), zapiši količnik \(k\) in ostanek \(o\). Ali je \(p\) deljiv s \(q\)?",
    r"\(k(x) = -x^2 + x + 2\), \(o = -3\); ni deljiv",
    [
        ("Hornerjev algoritem pri x = 2: −1 | 3 | 0 | −7  →  −1 | 1 | 2 | −3", "Koeficient pri x je 0.", "horner"),
        ("!k(x) = −x<sup>2</sup> + x + 2,  o = −3", ""),
        ("!p ni deljiv s q", "Ostanek ni 0 (tudi p(2) = −8 + 12 − 7 = −3)."),
    ],
)

a6 = naloga(
    "A6", "odvod_pm", 4,
    r"Dana je funkcija \(f(x) = x^4 - 3x^2\). Izračunaj odvod funkcije in \(f'(-2)\).",
    r"\(f'(x) = 4x^3 - 6x\), \(f'(-2) = -20\)",
    [
        ("!f '(x) = 4x<sup>3</sup> − 6x", "", "odvod"),
        ("!f '(−2) = 4 · (−8) + 12 = −20", ""),
    ],
)

a7 = naloga(
    "A7", "zaporedja_pm", 4,
    r"V aritmetičnem zaporedju s prvim členom \(7\) je dvanajsti člen enak \(51\). Izračunaj diferenco in štirideseti člen.",
    r"\(d = 4\), \(a_{40} = 163\)",
    [
        ("51 = 7 + 11d", "", "aritmeticno"),
        ("!d = 4", ""),
        ("!a<sub>40</sub> = 7 + 39 · 4 = 163", ""),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Izračunaj ničle funkcij \(f(x) = 3^x - 9\), \(g(x) = x^3 - 4x\) in \(h(x) = \log_3 x\).",
    r"\(f\): \(x = 2\); \(g\): \(x = 0, \pm 2\); \(h\): \(x = 1\)",
    [
        ("!3<sup>x</sup> = 9 = 3<sup>2</sup>  ⇒  x = 2", "", "eksponentna"),
        ("!x(x<sup>2</sup> − 4) = x(x − 2)(x + 2) = 0  ⇒  x ∈ {−2, 0, 2}", ""),
        ("!log<sub>3</sub> x = 0  ⇒  x = 3<sup>0</sup> = 1", "", "logaritem"),
    ],
)

a9 = naloga(
    "A9", "kombinatorika_verjetnost", 5,
    r"Izračunaj število vseh permutacij črk v besedi KOLESAR. V tej besedi na slepo prečrtamo eno črko. Kolikšna je verjetnost, da je to črka E?",
    r"\(5040\); \(P = \frac{1}{7}\)",
    [
        ("!vse črke so različne: P<sub>7</sub> = 7! = 5040", "", "kombinatorika"),
        ("!P = " + U("1", "7"), "Ena ugodna od sedmih enako verjetnih črk.", "verjetnost"),
    ],
)

a10 = naloga(
    "A10", "linearna_funkcija", 6,
    r"Izračunaj koordinati presečišča premic \(y = -3x + 5\) in \(y = 2x - 5\). Premici nariši.",
    r"\(P(2, -1)\)",
    [
        ("−3x + 5 = 2x − 5  ⇒  5x = 10", "", "sistem"),
        ("!x = 2,  y = −1,  P(2, −1)", ""),
        ("@slika", graf([(lambda x: -3 * x + 5, MODRA), (lambda x: 2 * x - 5, RDECA)], (-2, 5), (-6, 6), [(2, -1, "P")], sirina=260, visina=320)),
    ],
)

a11 = naloga(
    "A11", "izrazi_potence", 6,
    r"Skrči izraz in rezultat razstavi: \((x - 1)^2 + 3(x - 2)(x + 2) - 2x(x - 4) + 3\).",
    r"\(2(x + 4)(x - 1)\)",
    [
        ("x<sup>2</sup> − 2x + 1 + 3x<sup>2</sup> − 12 − 2x<sup>2</sup> + 8x + 3", "Kvadrat razlike, razlika kvadratov, množenje."),
        ("= 2x<sup>2</sup> + 6x − 8", "Seštejemo podobne člene."),
        ("= 2(x<sup>2</sup> + 3x − 4)", "Izpostavimo 2."),
        ("!= 2(x + 4)(x − 1)", "", "vieta"),
    ],
)

# ------------------------------------------------------------------ 2. del
def valja():
    k = 10
    t = [f'<rect x="20" y="{150 - 4 * k}" width="{10 * k}" height="{4 * k}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>',
         f'<rect x="{20 + 2 * k}" y="{150 - 7 * k}" width="{6 * k}" height="{3 * k}" fill="{MODRA}" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>',
         napis(70, 165, "10 cm", 11), napis(70, 150 - 7 * k - 5, "6 cm", 11), napis(126, 132, "4 cm", 11, sidro="start"), napis(86, 96, "3 cm", 11, sidro="start"),
         f'<circle cx="230" cy="100" r="{5 * k}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>',
         f'<circle cx="230" cy="100" r="{3 * k}" fill="{MODRA}" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>',
         napis(70, 20, "pogled s strani", 10), napis(230, 20, "pogled od zgoraj", 10)]
    return svg(300, 175, "".join(t), opis="Dva valja drug na drugem")

b1 = naloga(
    "B1", ["povrsine_prostornine", "ulomki_odstotki"], 10,
    r"Lesena valja postavimo drugega na drugega. Spodnji ima premer \(10\) cm in višino \(4\) cm, zgornji premer \(6\) cm in višino \(3\) cm. Levo je "
    r"pogled s strani, desno pogled od zgoraj." + valja()
    + r"1.1. Izračunaj prostornino zgornjega in spodnjega valja. (6 točk)<br>"
    r"1.2. Kolikšen delež osnovne ploskve spodnjega valja prekriva zgornji valj? (4 točke)",
    r"1.1. \(V_z = 27\pi \approx 84{,}8\ \mathrm{cm^3}\), \(V_s = 100\pi \approx 314{,}2\ \mathrm{cm^3}\) &nbsp; 1.2. \(\frac{9}{25} = 36\,\%\)",
    [
        "## 1.1",
        ("!V<sub>z</sub> = π · 3<sup>2</sup> · 3 = 27π ≈ 84,8 cm<sup>3</sup>", "", "telesa"),
        ("!V<sub>s</sub> = π · 5<sup>2</sup> · 4 = 100π ≈ 314,2 cm<sup>3</sup>", ""),
        "## 1.2",
        (U("π · 3<sup>2</sup>", "π · 5<sup>2</sup>") + " = " + U("9", "25"), "Razmerje ploščin osnovnih ploskev.", "krog"),
        ("!36 %", ""),
    ],
)

F2 = lambda x: (x * x - 9) / (x * x + 2 * x - 8)

b2 = naloga(
    "B2", "polinomi_racionalna", 10,
    r"Dana je funkcija \(f(x) = \dfrac{x^2 - 9}{x^2 + 2x - 8}\).<br>"
    r"2.1. Izračunaj ničli in pola, zapiši presečišče z ordinatno osjo, enačbo vodoravne asimptote in definicijsko območje. (7 točk)<br>"
    r"2.2. Nariši graf funkcije \(f\). (3 točke)",
    r"2.1. ničli \(\pm 3\), pola \(-4\) in \(2\), \(N\left(0, \frac{9}{8}\right)\), \(y = 1\), \(D_f = \mathbb{R} \setminus \{-4, 2\}\)",
    [
        "## 2.1",
        ("f(x) = " + U("(x − 3)(x + 3)", "(x + 4)(x − 2)"), "Razstavimo števec in imenovalec.", "vieta"),
        ("!ničli: x = −3, x = 3;  pola: x = −4, x = 2", "", "racionalna"),
        ("!N(0, " + U("9", "8") + ")", "f(0) = −9/(−8)."),
        ("!vodoravna asimptota: y = 1", "Števec in imenovalec sta iste stopnje, vodilna koeficienta sta 1."),
        ("!D<sub>f</sub> = ℝ \\ {−4, 2}", ""),
        "## 2.2",
        ("@slika", graf([(F2, MODRA), (lambda x: 1, RDECA)], (-8, 7), (-6, 6), [(-3, 0, ""), (3, 0, ""), (0, 9 / 8, "")], sirina=320, visina=280)),
    ],
)

b3 = naloga(
    "B3", "statistika_pm", 10,
    r"Tina je zbrala podatke o tem, koliko časa so nekateri sošolci konec tedna gledali televizijo:"
    + tabela(["", "petek", "sobota", "nedelja"], [["Tina", "2 h", "1,5 h", "3,5 h"], ["Rok", "45 min", "90 min", "120 min"],
                                                 ["Maja", "150 min", "210 min", "60 min"], ["Luka", "1 h", "0 h", "2,5 h"]])
    + r"3.1. Rokove podatke prikaži s stolpčnim diagramom in izračunaj aritmetično sredino njegovega časa gledanja televizije. (5 točk)<br>"
    r"3.2. Izračunaj aritmetično sredino in mediano časa gledanja televizije v nedeljo. (5 točk)",
    r"3.1. \(85\) min &nbsp; 3.2. \(\bar{x} = 135\) min, \(Me = 135\) min",
    [
        "## 3.1",
        ("@slika", svg(220, 170, "".join(f'<rect x="{30 + i * 60}" y="{140 - v}" width="36" height="{v}" fill="{MODRA}" fill-opacity="0.75"/>'
                                         + napis(48 + i * 60, 136 - v, f"{v} min", 10) + napis(48 + i * 60, 156, d, 10)
                                         for i, (d, v) in enumerate([("petek", 45), ("sobota", 90), ("nedelja", 120)]))
                       + '<line x1="20" y1="140" x2="210" y2="140" stroke="currentColor"/>', opis="Rokov čas gledanja televizije")),
        ("!x̄ = " + U("45 + 90 + 120", "3") + " = 85 min", "", "statistika"),
        "## 3.2",
        ("nedelja: 210, 120, 60, 150 min", "Vse pretvorimo v minute (3,5 h = 210 min, 2,5 h = 150 min)."),
        ("!x̄ = " + U("540", "4") + " = 135 min", ""),
        ("urejeno: 60, 120, 150, 210", ""),
        ("!Me = " + U("120 + 150", "2") + " = 135 min", "Povprečje srednjih dveh podatkov."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
