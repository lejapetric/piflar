# Zimski rok 2004 (uradna pola RIC P043-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2004, "zimski", "četrtek, 3. februar 2005"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"Reši enačbo \((2x + 1)^2 - 3x(x + 2) - x^2 = 0\).",
    r"\(x = \frac{1}{2}\)",
    [
        ("4x<sup>2</sup> + 4x + 1 − 3x<sup>2</sup> − 6x − x<sup>2</sup> = 0", ""),
        ("−2x + 1 = 0", "Členi z x² se odštejejo."),
        ("!x = " + U("1", "2"), ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Pri poklicni maturi so se dijaki odločali med tujim jezikom in matematiko. Za tuji jezik se jih je odločilo \(72\), za matematiko pa preostalih \(55\,\%\). Koliko je bilo vseh dijakov?",
    r"\(160\)",
    [
        ("tuji jezik: 100 % − 55 % = 45 %", ""),
        ("0,45 · x = 72", "", "odstotki"),
        ("!x = 160 dijakov", ""),
    ],
)

a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"Stranice trikotnika merijo \(6\) cm, \(8\) cm in \(12\) cm. Izračunaj največji kot trikotnika na minuto natančno.",
    r"\(\approx 117^\circ 17'\)",
    [
        (None, "Največji kot leži nasproti najdaljše stranice (12 cm)."),
        ("cos γ = " + U("6<sup>2</sup> + 8<sup>2</sup> − 12<sup>2</sup>", "2 · 6 · 8") + " = " + U("−44", "96") + " ≈ −0,4583", "", "kosinusni"),
        ("!γ ≈ 117,28° = 117° 17′", ""),
    ],
)

a4 = naloga(
    "A4", "povrsine_prostornine", 4,
    r"Določi število robov in število mejnih ploskev pravilne tristrane prizme in pravilne tristrane piramide."
    + tabela(["", "tristrana prizma", "tristrana piramida"], [["število robov", "", ""], ["število mejnih ploskev", "", ""]]),
    r"prizma: \(9\) robov, \(5\) ploskev; piramida: \(6\) robov, \(4\) ploskve",
    [
        ("prizma: 3 + 3 robov osnovnih ploskev + 3 stranski robovi = 9", "Ploskve: 2 osnovni + 3 stranske = 5."),
        ("piramida: 3 robovi osnovne ploskve + 3 stranski robovi = 6", "Ploskve: 1 osnovna + 3 stranske = 4."),
        ("@slika", tabela(["", "tristrana prizma", "tristrana piramida"], [["število robov", "9", "6"], ["število mejnih ploskev", "5", "4"]])),
    ],
)

a5 = naloga(
    "A5", "eksponentna_logaritemska", 4,
    r"Naj bo \(a > 1\). Poenostavi izraz \(3\log_a a^2 - \log_a a^4 + \log_a 1\).",
    r"\(2\)",
    [
        ("log<sub>a</sub> a<sup>2</sup> = 2,  log<sub>a</sub> a<sup>4</sup> = 4,  log<sub>a</sub> 1 = 0", "", "log_pravila"),
        ("!3 · 2 − 4 + 0 = 2", ""),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 5,
    r"Na dvorišču so kokoši in kunci. Skupaj smo našteli \(40\) glav in \(112\) nog. Koliko je kokoši in koliko kuncev?",
    r"\(24\) kokoši, \(16\) kuncev",
    [
        ("k + z = 40,  2k + 4z = 112", "k je število kokoši, z število kuncev.", "sistem"),
        ("2k + 4z − 2(k + z) = 112 − 80  ⇒  2z = 32", ""),
        ("!z = 16 kuncev,  k = 24 kokoši", ""),
    ],
)

FA7 = lambda x: (x + 2) / x

a7 = naloga(
    "A7", "polinomi_racionalna", 5,
    r"Skiciraj graf funkcije \(f(x) = \dfrac{x + 2}{x}\).",
    r"ničla \(-2\), pol \(0\), asimptota \(y = 1\)",
    [
        ("ničla x = −2,  pol x = 0", "", "racionalna"),
        ("asimptota y = 1", "f(x) = 1 + 2/x."),
        ("f(1) = 3,  f(2) = 2,  f(−1) = −1,  f(−4) = " + U("1", "2"), "Pomožne točke."),
        ("@slika", graf([(FA7, MODRA), (lambda x: 1, RDECA)], (-6, 6), (-5, 6), [(-2, 0, ""), (1, 3, ""), (2, 2, ""), (-1, -1, ""), (-4, 0.5, "")], sirina=280, visina=260)),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Izračunaj pozitivno število \(x\), da bodo \(x\), \(6\), \(x^2\) prvi trije členi aritmetičnega zaporedja. Zapiši prvih pet členov.",
    r"\(x = 3\): \(3, 6, 9, 12, 15\)",
    [
        ("2 · 6 = x + x<sup>2</sup>  ⇒  x<sup>2</sup> + x − 12 = 0", "Srednji člen je aritmetična sredina sosednjih.", "aritmeticno"),
        ("(x + 4)(x − 3) = 0", "", "kvadratna"),
        ("x = 3", "Iščemo pozitivno rešitev."),
        ("!3, 6, 9, 12, 15", "d = 3."),
    ],
)

a9 = naloga(
    "A9", "kotne_funkcije_pm", 5,
    r"Izračunaj \(\sin x\) in \(\cos x\), če je \(\tan x = -\frac{3}{4}\) in \(\frac{\pi}{2} < x < \pi\).",
    r"\(\sin x = \frac{3}{5}\), \(\cos x = -\frac{4}{5}\)",
    [
        ("1 + tan<sup>2</sup>x = " + U("1", "cos<sup>2</sup>x") + "  ⇒  cos<sup>2</sup>x = " + U("1", "1 + 9/16") + " = " + U("16", "25"), "", "kotne"),
        ("!cos x = −" + U("4", "5"), "V drugem kvadrantu je kosinus negativen."),
        ("!sin x = tan x · cos x = (−" + U("3", "4") + ") · (−" + U("4", "5") + ") = " + U("3", "5"), "Sinus je v drugem kvadrantu pozitiven."),
    ],
)

# ------------------------------------------------------------------ 2. del
FB = lambda x: 4 - x * x
GB = lambda x: (x - 2) * (x + 4)


def risba_b1(X, Y):
    t = krivulja(X, Y, FB, -3.3, 3.3, MODRA) + krivulja(X, Y, GB, -4.9, 2.9, RDECA)
    t += tocka(X, Y, 0, 4, "T₁", 6, -4) + tocka(X, Y, -1, -9, "T₂", 6, 12) + tocka(X, Y, 2, 0, "P", 6, -6) + tocka(X, Y, -3, -5, "Q", -18, -2)
    t += napis(X(3.1), Y(-7.5), "f", 12, MODRA) + napis(X(3.0), Y(6.2), "g", 12, RDECA)
    return t


b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"Dani sta funkciji \(f(x) = 4 - x^2\) in \(g(x) = (x - 2)(x + 4)\).<br>"
    r"1.1. Izračunaj ničle in temeni obeh funkcij. (5 točk)<br>"
    r"1.2. Nariši grafa obeh funkcij v isti koordinatni sistem. (6 točk)<br>"
    r"1.3. Izračunaj presečišči grafov. (4 točke)",
    r"1.1. \(f\): \(\pm 2\), \(T_1(0, 4)\); \(g\): \(2, -4\), \(T_2(-1, -9)\) &nbsp; 1.3. \((2, 0)\), \((-3, -5)\)",
    [
        "## 1.1",
        ("!f: ničli ±2,  teme T<sub>1</sub>(0, 4)", "4 − x² = (2 − x)(2 + x).", "kvadratna"),
        ("!g: ničli 2 in −4,  teme T<sub>2</sub>(−1, −9)", "Abscisa temena je sredina ničel; g(−1) = (−3) · 3 = −9.", "teme"),
        "## 1.2",
        ("@slika", mreza((-5, 4), (-10, 7), risba_b1, sirina=260)),
        "## 1.3",
        ("4 − x<sup>2</sup> = x<sup>2</sup> + 2x − 8  ⇒  2x<sup>2</sup> + 2x − 12 = 0", ""),
        ("x<sup>2</sup> + x − 6 = (x + 3)(x − 2) = 0", ""),
        ("!P(2, 0),  Q(−3, −5)", "f(−3) = 4 − 9 = −5."),
    ],
)

OA = [(5, 6), (4, 9), (3, 10), (2, 4), (1, 1)]
OB = [(5, 4), (4, 7), (3, 12), (2, 5), (1, 2)]


def stolpci():
    L, B, H = 40, 150, 125
    t = []
    for k in range(0, 13, 2):
        y = B - k / 12 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 220}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    for i, (o, f) in enumerate(sorted(OA)):
        x = L + 12 + 42 * i
        h = f / 12 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="30" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x + 15, B + 14, str(o), 10))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 220}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 12, "število dijakov", 10, sidro="start") + napis(L + 220, B + 28, "ocena", 10, sidro="end"))
    return svg(275, 185, "".join(t), opis="Ocene eseja v oddelku A")


b2 = naloga(
    "B2", "statistika_pm", 15,
    r"V oddelkih A in B so pisali esej (izmišljeni podatki). V oddelku A je bilo \(6\) odličnih ocen, \(9\) prav dobrih, \(10\) dobrih, \(4\) zadostne in \(1\) nezadostna. "
    r"V oddelku B je bilo \(4\) odlične, \(7\) prav dobrih, \(12\) dobrih, \(5\) zadostnih in \(2\) nezadostni.<br>"
    r"2.1. Izračunaj povprečno oceno v vsakem oddelku in standardni odklon v oddelku A. (9 točk)<br>"
    r"2.2. Za koliko odstotkov je povprečna ocena v A višja od povprečne ocene v B? (3 točke)<br>"
    r"2.3. Uspeh v oddelku A prikaži grafično. (3 točke)",
    r"2.1. A: \(3{,}5\), B: \(3{,}2\); \(\sigma_A \approx 1{,}06\) &nbsp; 2.2. \(\approx 9{,}38\,\%\)",
    [
        "## 2.1",
        ("A: x̄ = " + U("5 · 6 + 4 · 9 + 3 · 10 + 2 · 4 + 1 · 1", "30") + " = " + U("105", "30"), "V oddelku A je 30 dijakov.", "statistika"),
        ("!x̄<sub>A</sub> = 3,5", ""),
        ("B: x̄ = " + U("5 · 4 + 4 · 7 + 3 · 12 + 2 · 5 + 1 · 2", "30") + " = " + U("96", "30"), "Tudi v B je 30 dijakov."),
        ("!x̄<sub>B</sub> = 3,2", ""),
        ("σ<sub>A</sub><sup>2</sup> = " + U("6 · 1,5<sup>2</sup> + 9 · 0,5<sup>2</sup> + 10 · 0,5<sup>2</sup> + 4 · 1,5<sup>2</sup> + 1 · 2,5<sup>2</sup>", "30") + " = " + U("33,5", "30") + " ≈ 1,117", ""),
        ("!σ<sub>A</sub> ≈ 1,06", ""),
        "## 2.2",
        ("p = " + U("3,5 − 3,2", "3,2") + " · 100 %", "Primerjamo s povprečjem oddelka B.", "odstotki"),
        ("!p ≈ 9,38 %", ""),
        "## 2.3",
        ("@slika", stolpci()),
    ],
)


def sestkotnik():
    c, R = (90, 80), 60
    pts = " ".join(f"{c[0] + R * math.cos(math.radians(60 * k)):.1f},{c[1] - R * math.sin(math.radians(60 * k)):.1f}" for k in range(6))
    t = [f'<path d="M {pts.replace(" ", " L ")} Z M {c[0] - 15} {c[1]} a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0 Z" fill="{MODRA}" fill-opacity="0.2" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0] + R}" y2="{c[1]}" stroke="currentColor" stroke-dasharray="3 3"/>',
         napis(c[0] + 30, c[1] - 9, "a = 4 cm", 9), napis(c[0], c[1] + 30, "2r = 2 cm", 9)]
    return svg(185, 160, "".join(t), opis="Osnovna ploskev šeststrane prizme z odprtino")


b3 = naloga(
    "B3", "povrsine_prostornine", 15,
    r"Pravilna šeststrana prizma ima osnovni rob \(4\) cm in višino \(10\) cm. Prizmo so prevrtali skozi središči osnovnih ploskev; premer valjaste odprtine je \(2\) cm." + sestkotnik()
    + r"3.1. Nariši skico prvotne prizme in izračunaj njeno površino. (5 točk)<br>"
    r"3.2. Izračunaj prostornino prvotne prizme. (5 točk)<br>"
    r"3.3. Za koliko odstotkov je prostornina prevrtanega telesa manjša od prostornine prvotne prizme? (5 točk)",
    r"3.1. \(48\sqrt{3} + 240 \approx 323{,}14\ \mathrm{cm^2}\) &nbsp; 3.2. \(240\sqrt{3} \approx 415{,}69\ \mathrm{cm^3}\) &nbsp; 3.3. \(\approx 7{,}56\,\%\)",
    [
        "## 3.1",
        ("O = 6 · " + U("a<sup>2</sup>" + K("3"), "4") + " = 6 · " + U("16" + K("3"), "4") + " = 24" + K("3") + " cm<sup>2</sup>", "Osnovna ploskev je sestavljena iz 6 enakostraničnih trikotnikov.", "ploscine"),
        ("pl = 6 · a · v = 6 · 4 · 10 = 240 cm<sup>2</sup>", "", "telesa"),
        ("!P = 2O + pl = 48" + K("3") + " + 240 ≈ 323,14 cm<sup>2</sup>", ""),
        "## 3.2",
        ("!V = O · v = 24" + K("3") + " · 10 = 240" + K("3") + " ≈ 415,69 cm<sup>3</sup>", ""),
        "## 3.3",
        ("V<sub>odprtine</sub> = π · 1<sup>2</sup> · 10 = 10π ≈ 31,42 cm<sup>3</sup>", "Polmer odprtine je 1 cm, dolžina pa enaka višini prizme."),
        ("p = " + U("10π", "240" + K("3")) + " · 100 %", "", "odstotki"),
        ("!p ≈ 7,56 %", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
