# Jesenski rok 2008 (uradna pola RIC P082-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2008, "jesenski", "torek, 26. avgust 2008"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "polinomi_racionalna", 4,
    r"Dan je polinom \(p(x) = 2x^6 - x^3 + 3x\). Zapiši: a) stopnjo polinoma, b) prosti člen, c) vodilni koeficient, d) \(p(0)\).",
    r"a) \(6\) &nbsp; b) \(0\) &nbsp; c) \(2\) &nbsp; d) \(0\)",
    [
        ("!a) stopnja: 6", ""),
        ("!b) prosti člen: 0", "Polinom nima člena brez x."),
        ("!c) vodilni koeficient: 2", ""),
        ("!d) p(0) = 0", ""),
    ],
)

a2 = naloga(
    "A2", "stevila_deljivost", 4,
    r"Dano je petmestno število \(\overline{51a74}\). Določi vse števke \(a\), da bo število deljivo s \(3\).",
    r"\(a \in \{1, 4, 7\}\)",
    [
        ("vsota števk: 5 + 1 + a + 7 + 4 = 17 + a", "Število je deljivo s 3, če je vsota njegovih števk deljiva s 3."),
        ("17 + a ∈ {18, 21, 24}", "a je števka od 0 do 9."),
        ("!a = 1, a = 4 ali a = 7", ""),
    ],
)

DNEVI = ["pon.", "tor.", "sre.", "čet.", "pet.", "sob.", "ned."]
TEMP = [17, 19, 21, 20, 18, 23, 24]

a3 = naloga(
    "A3", "statistika_pm", 4,
    r"V preglednici so temperature, izmerjene ob 13. uri za vsak dan v tednu (izmišljeni podatki)."
    + tabela(["dan"] + DNEVI, [["T (°C)"] + [str(t) for t in TEMP]])
    + r"Izračunaj povprečno temperaturo v tem tednu na eno decimalno mesto natančno.",
    r"\(\approx 20{,}3\ ^\circ\mathrm{C}\)",
    [
        ("x̄ = " + U("17 + 19 + 21 + 20 + 18 + 23 + 24", "7") + " = " + U("142", "7"), "", "statistika"),
        ("!x̄ ≈ 20,3 °C", ""),
    ],
)

a4 = naloga(
    "A4", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(3^{x + 2} + 3^x = 90\).",
    r"\(x = 2\)",
    [
        ("3<sup>x</sup> · 3<sup>2</sup> + 3<sup>x</sup> = 90  ⇒  3<sup>x</sup>(9 + 1) = 90", "Izpostavimo 3ˣ.", "eksponentna"),
        ("3<sup>x</sup> = 9 = 3<sup>2</sup>", ""),
        ("!x = 2", ""),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"Aritmetično zaporedje ima diferenco \(d = 3\). Vsota tretjega in četrtega člena je \(29\). Izračunaj prvi člen.",
    r"\(a_1 = 7\)",
    [
        ("(a<sub>1</sub> + 2d) + (a<sub>1</sub> + 3d) = 29  ⇒  2a<sub>1</sub> + 5d = 29", "", "aritmeticno"),
        ("2a<sub>1</sub> + 15 = 29", ""),
        ("!a<sub>1</sub> = 7", ""),
    ],
)


def trikotnik_a6():
    A, B = (20, 130), (240, 130)
    al = math.asin(0.28)
    b = 220 * math.cos(al)
    C = (A[0] + b * math.cos(al), A[1] - b * math.sin(al))
    ux, uy = (A[0] - C[0]) / b, (A[1] - C[1]) / b
    vx, vy = (B[0] - C[0]) / 61.6, (B[1] - C[1]) / 61.6
    k = 9
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {C[0] + k * ux:.1f} {C[1] + k * uy:.1f} L {C[0] + k * ux + k * vx:.1f} {C[1] + k * uy + k * vy:.1f} L {C[0] + k * vx:.1f} {C[1] + k * vy:.1f}" fill="none" stroke="currentColor"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 8, "C"),
         napis(130, 146, "12,5", 11), napis(C[0] + 14, (C[1] + B[1]) / 2, "3,5", 11, sidro="start"),
         napis(62, 126, "α", 12, RDECA), napis(222, 120, "β", 12, RDECA)]
    return svg(265, 155, "".join(t), opis="Pravokotni trikotnik s hipotenuzo 12,5 in kateto 3,5")


a6 = naloga(
    "A6", "trikotnik_kotne", 5,
    r"Na skici je pravokotni trikotnik s pravim kotom pri \(C\); hipotenuza meri \(12{,}5\) cm, kateta \(BC\) pa \(3{,}5\) cm." + trikotnik_a6()
    + r"Izračunaj kota \(\alpha\) in \(\beta\) na minuto natančno.",
    r"\(\alpha \approx 16^\circ 16'\), \(\beta \approx 73^\circ 44'\)",
    [
        ("sin α = " + U("a", "c") + " = " + U("3,5", "12,5") + " = 0,28", "Kateta BC leži nasproti kota α.", "kotne"),
        ("!α ≈ 16,26° = 16° 16′", ""),
        ("!β = 90° − α ≈ 73° 44′", ""),
    ],
)


def stozec():
    cx, r, ry, yo, yv = 100, 60, 12, 160, 20
    t = [f'<path d="M {cx - r} {yo} L {cx} {yv} L {cx + r} {yo} Z" fill="{RDECA}" fill-opacity="0.15"/>',
         f'<line x1="{cx - r}" y1="{yo}" x2="{cx}" y2="{yv}" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{cx + r}" y1="{yo}" x2="{cx}" y2="{yv}" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yo} A {r} {ry} 0 0 0 {cx + r} {yo}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yo} A {r} {ry} 0 0 1 {cx + r} {yo}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{cx - r}" y1="{yo}" x2="{cx + r}" y2="{yo}" stroke="{RDECA}" stroke-width="1.5"/>',
         f'<line x1="{cx}" y1="{yv}" x2="{cx}" y2="{yo}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(cx + 30, yo + 26, "r = 5 cm", 10), napis(cx + 38, 82, "s = 13 cm", 10, sidro="start"), napis(cx + 4, 100, "v", 12, sidro="start")]
    return svg(220, 195, "".join(t), opis="Stožec z osnim presekom")


a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Polmer pokončnega stožca meri \(5\) cm, stranica stožca pa \(13\) cm. Skiciraj stožec in označi osni presek. Izračunaj ploščino osnega preseka.",
    r"\(60\ \mathrm{cm^2}\)",
    [
        ("@slika", stozec()),
        ("v = " + K("s<sup>2</sup> − r<sup>2</sup>") + " = " + K("169 − 25") + " = 12 cm", "Osni presek je enakokraki trikotnik z osnovnico 2r in višino v.", "pitagora"),
        ("!S = " + U("2r · v", "2") + " = r · v = 5 · 12 = 60 cm<sup>2</sup>", "", "ploscine"),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Zapiši enačbo kvadratne funkcije, katere graf seka abscisno os pri \(x_1 = -2\) in \(x_2 = 4\), ordinatno os pa v točki \(A(0, 4)\).",
    r"\(f(x) = -\frac{1}{2}x^2 + x + 4\)",
    [
        ("f(x) = a(x + 2)(x − 4)", "Ničelna oblika.", "kvadratna"),
        ("f(0) = a · 2 · (−4) = −8a = 4  ⇒  a = −" + U("1", "2"), ""),
        ("!f(x) = −" + U("1", "2") + "(x + 2)(x − 4) = −" + U("1", "2") + "x<sup>2</sup> + x + 4", ""),
    ],
)

a9 = naloga(
    "A9", "izrazi_potence", 5,
    r"Za \(a = 9\) in \(b = -8\) izračunaj vrednost izraza \(a^{\frac{1}{2}} \cdot b^{\frac{1}{3}} : a^{-1}\).",
    r"\(-54\)",
    [
        ("a<sup>1/2</sup> = " + K("9") + " = 3", "", "potence"),
        ("b<sup>1/3</sup> = ∛(−8) = −2", "Liha stopnja korena negativnega števila obstaja."),
        ("a<sup>−1</sup> = " + U("1", "9"), ""),
        ("!3 · (−2) : " + U("1", "9") + " = −6 · 9 = −54", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "ulomki_odstotki", 15,
    r"Janez in Meta sta zakonca. Janez na mesec zasluži \(1200\) EUR, Meta pa \(1320\) EUR.<br>"
    r"1.1. Za koliko odstotkov je Metina plača večja od Janezove? (5 točk)<br>"
    r"1.2. Koliko denarja ostane Janezu, če vsak mesec da \(6\,\%\) plače sinu in \(4\,\%\) hčeri? (4 točke)<br>"
    r"1.3. Kdo bi imel večjo plačo in za koliko evrov, če bi se Janezova plača povečala za \(12\,\%\), Metina pa za \(5\,\%\)? (6 točk)",
    r"1.1. \(10\,\%\) &nbsp; 1.2. \(1080\) EUR &nbsp; 1.3. Meta, za \(42\) EUR",
    [
        "## 1.1",
        ("p = " + U("1320 − 1200", "1200") + " · 100 % = " + U("120", "1200") + " · 100 %", "Odstotek računamo glede na Janezovo plačo.", "odstotki"),
        ("!p = 10 %", ""),
        "## 1.2",
        ("6 % + 4 % = 10 %  ⇒  ostane 90 %", ""),
        ("!0,9 · 1200 = 1080 EUR", ""),
        "## 1.3",
        ("Janez: 1,12 · 1200 = 1344 EUR", ""),
        ("Meta: 1,05 · 1320 = 1386 EUR", ""),
        ("!Meta, za 1386 − 1344 = 42 EUR", ""),
    ],
)

b2 = naloga(
    "B2", "linearna_funkcija", 15,
    r"Dani sta funkciji \(f(x) = 3x - 2\) in \(g(x) = 4 - x\).<br>"
    r"2.1. V isti koordinatni sistem natančno nariši grafa obeh funkcij. (5 točk)<br>"
    r"2.2. Izračunaj ostri kot med grafoma na stotinko stopinje natančno. (6 točk)<br>"
    r"2.3. Pri katerem \(x\) ima funkcija \(f\) za \(10\) večjo vrednost kot funkcija \(g\)? (4 točke)",
    r"2.2. \(\approx 63{,}43^\circ\) &nbsp; 2.3. \(x = 4\)",
    [
        "## 2.1",
        ("f: (0, −2), (2, 4);  g: (0, 4), (4, 0)", "", "premica"),
        ("@slika", graf([(lambda x: 3 * x - 2, MODRA), (lambda x: 4 - x, RDECA)], (-2, 5), (-4, 6), [(0, -2, ""), (2, 4, ""), (0, 4, ""), (4, 0, ""), (1.5, 2.5, "P")], sirina=280, visina=400)),
        "## 2.2",
        ("tan φ<sub>1</sub> = 3  ⇒  φ<sub>1</sub> ≈ 71,57°", "Naklonski kot premice f.", "kotne"),
        ("tan φ<sub>2</sub> = −1  ⇒  φ<sub>2</sub> = 135°", "Naklonski kot premice g."),
        ("!φ = 135° − 71,57° ≈ 63,43°", "Razlika naklonskih kotov je ostri kot, zato ga ni treba dopolniti do 180°."),
        "## 2.3",
        ("3x − 2 = (4 − x) + 10", ""),
        ("4x = 16", ""),
        ("!x = 4", "Preizkus: f(4) = 10, g(4) = 0."),
    ],
)

FB3 = lambda x: (2 * x + 4) / (x - 3)

b3 = naloga(
    "B3", "polinomi_racionalna", 15,
    r"Dana je funkcija \(f(x) = \dfrac{2x + 4}{x - 3}\).<br>"
    r"3.1. Zapiši ničlo, pol, enačbo vodoravne asimptote in začetno vrednost funkcije. (5 točk)<br>"
    r"3.2. Nariši graf funkcije. (6 točk)<br>"
    r"3.3. Izračunaj \(f(-1)\) in natančno \(f\left(\sqrt{3}\right)\). (4 točke)",
    r"3.1. ničla \(-2\), pol \(3\), \(y = 2\), \(f(0) = -\frac{4}{3}\) &nbsp; 3.3. \(-\frac{1}{2}\), \(-3 - \frac{5\sqrt{3}}{3}\)",
    [
        "## 3.1",
        ("!ničla x = −2", "", "racionalna"),
        ("!pol x = 3", ""),
        ("!asimptota y = 2", "Količnik vodilnih koeficientov 2 : 1."),
        ("!f(0) = −" + U("4", "3"), ""),
        "## 3.2",
        ("f(5) = 7,  f(4) = 12,  f(1) = −3", "Nekaj dodatnih točk."),
        ("@slika", graf([(FB3, MODRA), (lambda x: 2, RDECA)], (-6, 10), (-8, 12), [(-2, 0, ""), (0, -4 / 3, ""), (5, 7, ""), (1, -3, "")], sirina=320, visina=400)),
        "## 3.3",
        ("!f(−1) = " + U("2", "−4") + " = −" + U("1", "2"), ""),
        ("f(" + K("3") + ") = " + U("2" + K("3") + " + 4", K("3") + " − 3") + " · " + U(K("3") + " + 3", K("3") + " + 3"), "Racionaliziramo imenovalec."),
        ("= " + U("6 + 6" + K("3") + " + 4" + K("3") + " + 12", "3 − 9") + " = " + U("18 + 10" + K("3"), "−6"), ""),
        ("!f(" + K("3") + ") = −3 − " + U("5" + K("3"), "3") + " ≈ −5,89", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
