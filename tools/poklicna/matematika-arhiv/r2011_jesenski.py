# Jesenski rok 2011 (uradna pola RIC P112-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2011, "jesenski", "petek, 26. avgust 2011"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Ulomke \(\frac{7}{12}\), \(\frac{2}{3}\), \(\frac{5}{8}\), \(\frac{1}{2}\) in \(\frac{17}{24}\) razširi na skupni imenovalec in jih uredi po velikosti od najmanjšega do največjega.",
    r"\(\frac{1}{2} < \frac{7}{12} < \frac{5}{8} < \frac{2}{3} < \frac{17}{24}\)",
    [
        ("skupni imenovalec: 24", "Najmanjši skupni večkratnik števil 12, 3, 8, 2, 24."),
        (U("14", "24") + ", " + U("16", "24") + ", " + U("15", "24") + ", " + U("12", "24") + ", " + U("17", "24"), ""),
        ("!" + U("1", "2") + " < " + U("7", "12") + " < " + U("5", "8") + " < " + U("2", "3") + " < " + U("17", "24"), ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\dfrac{x + 2}{4} - \dfrac{2x - 1}{6}\).",
    r"\(\frac{8 - x}{12}\)",
    [
        (U("3(x + 2) − 2(2x − 1)", "12"), "Skupni imenovalec je 12."),
        ("= " + U("3x + 6 − 4x + 2", "12"), "Pozor na minus pred drugim ulomkom."),
        ("!= " + U("8 − x", "12"), ""),
    ],
)

a3 = naloga(
    "A3", "zaporedja_pm", 4,
    r"Jernej gradi stolpe iz kock: prvega iz \(4\) kock, drugega iz \(7\), tretjega iz \(10\) in tako naprej (števila tvorijo aritmetično zaporedje). "
    r"Koliko kock potrebuje za deseti stolp?",
    r"\(31\)",
    [
        ("a<sub>1</sub> = 4,  d = 3", "", "aritmeticno"),
        ("!a<sub>10</sub> = 4 + 9 · 3 = 31 kock", ""),
    ],
)

a4 = naloga(
    "A4", "ulomki_odstotki", 4,
    r"Ana, Luka in Miha so si razdelili \(360\) EUR. Ana je dobila \(25\,\%\) zneska, Luka pa enako kot Miha. Koliko je dobil vsak?",
    r"Ana \(90\) EUR, Luka in Miha po \(135\) EUR",
    [
        ("!Ana: 0,25 · 360 = 90 EUR", "", "odstotki"),
        ("ostane 270 EUR", ""),
        ("!Luka = Miha = 135 EUR", ""),
    ],
)

a5 = naloga(
    "A5", "eksponentna_logaritemska", 4,
    r"Izrazi \(x\) iz enakosti \(\log x = \log(a + b) + 2 \cdot \log a - \log(a^2 - b^2)\).",
    r"\(x = \frac{a^2}{a - b}\)",
    [
        ("log x = log " + U("(a + b) · a<sup>2</sup>", "a<sup>2</sup> − b<sup>2</sup>"), "Pravila za logaritem produkta, potence in kvocienta.", "log_pravila"),
        ("x = " + U("a<sup>2</sup>(a + b)", "(a − b)(a + b)"), ""),
        ("!x = " + U("a<sup>2</sup>", "a − b"), ""),
    ],
)


def trikotnik_a6():
    A, B, C = (20, 120), (200, 120), (200, 16)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<polyline points="{B[0] - 10},{B[1]} {B[0] - 10},{B[1] - 10} {B[0]},{B[1] - 10}" fill="none" stroke="currentColor"/>',
         napis(A[0] + 36, A[1] - 6, "30°", 10), napis(B[0] + 28, 72, "2x + 1", 11), napis(95, 58, "3x + 4", 11)]
    return svg(250, 135, "".join(t), opis="Pravokotni trikotnik s kotom 30°")

a6 = naloga(
    "A6", "trikotnik_kotne", 5,
    r"Izračunaj dolžino hipotenuze pravokotnega trikotnika na skici." + trikotnik_a6(),
    r"\(10\)",
    [
        ("sin 30° = " + U("2x + 1", "3x + 4") + " = " + U("1", "2"), "Kateta 2x + 1 leži nasproti kota 30°.", "kotne"),
        ("4x + 2 = 3x + 4  ⇒  x = 2", ""),
        ("!hipotenuza: 3 · 2 + 4 = 10", "Kateta meri 5, kar je res polovica hipotenuze."),
    ],
)

a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Jaka ima \(6\) hrastovih hlodov v obliki valja, vsak je dolg \(4\) m in ima polmer \(0{,}2\) m. Koliko evrov dobi za les, če je cena \(95\) EUR za kubični meter?",
    r"\(\approx 286{,}51\) EUR",
    [
        ("V<sub>1</sub> = πr<sup>2</sup>v = π · 0,04 · 4 = 0,16π m<sup>3</sup>", "", "telesa"),
        ("V = 6 · 0,16π = 0,96π ≈ 3,016 m<sup>3</sup>", ""),
        ("!3,016 · 95 ≈ 286,51 EUR", ""),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Dani sta funkciji \(f(x) = 2x + 1\) in \(g(x) = x^2 - 2\). Izračunaj presečišči njunih grafov.",
    r"\((3, 7)\) in \((-1, -1)\)",
    [
        ("x<sup>2</sup> − 2 = 2x + 1  ⇒  x<sup>2</sup> − 2x − 3 = 0", ""),
        ("(x − 3)(x + 1) = 0", "", "kvadratna"),
        ("!P<sub>1</sub>(3, 7),  P<sub>2</sub>(−1, −1)", "y izračunamo iz f(x) = 2x + 1."),
    ],
)

IMENA = [("Marija", 820), ("Ana", 760), ("Janez", 690), ("Franc", 610), ("Maja", 540)]

a9 = naloga(
    "A9", "ulomki_odstotki", 5,
    r"V preglednici je pet najpogostejših imen v izmišljenem mestu z \(48\,000\) prebivalci. Kolikokrat pogostejše je ime Marija od imena Maja? "
    r"Koliko odstotkov prebivalcev mesta je imelo ime Ana?"
    + tabela(["Ime", "Število oseb"], [[i, str(n)] for i, n in IMENA]),
    r"\(\approx 1{,}52\)-krat; \(\approx 1{,}58\,\%\)",
    [
        ("!" + U("820", "540") + " ≈ 1,52-krat", ""),
        ("!" + U("760", "48 000") + " ≈ 0,0158 = 1,58 %", "", "odstotki"),
    ],
)

# ------------------------------------------------------------------ 2. del
MES = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
ZN = ["42,50", "38,20", "35,90", "40,10", "44,80", "51,30", "58,70", "55,40", "39,60", "37,80", "41,20", "46,50"]


def torta_b1():
    del_ = [("naročnina", 15), ("SMS", 20), ("pogovori", 65)]
    barve = [MODRA, RDECA, "#1E9E5A"]
    t, z = [], -90
    for (n, p), b in zip(del_, barve):
        k = 3.6 * p
        a0, a1 = math.radians(z), math.radians(z + k)
        big = 1 if k > 180 else 0
        t.append(f'<path d="M 80 80 L {80 + 65 * math.cos(a0):.1f} {80 + 65 * math.sin(a0):.1f} A 65 65 0 {big} 1 {80 + 65 * math.cos(a1):.1f} {80 + 65 * math.sin(a1):.1f} Z" '
                 f'fill="{b}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        am = math.radians(z + k / 2)
        t.append(napis(80 + 42 * math.cos(am), 84 + 42 * math.sin(am), f"{p} %", 10))
        z += k
    t += [f'<rect x="165" y="{30 + 22 * i}" width="10" height="10" fill="{b}" fill-opacity="0.6"/>' + napis(180, 39 + 22 * i, n, 11, sidro="start")
          for i, ((n, _), b) in enumerate(zip(del_, barve))]
    return svg(260, 160, "".join(t), opis="Deleži letnega zneska za telefon")

b1 = naloga(
    "B1", "statistika_pm", 15,
    r"Nika je lani za mobilni telefon plačala mesečne zneske iz preglednice (izmišljeni podatki)."
    + tabela(["Mesec", "Znesek (EUR)"], [[m, z] for m, z in zip(MES, ZN)])
    + r"1.1. Izračunaj povprečni mesečni znesek. Koliko mesecev je plačala več od povprečja? (4 točke)<br>"
    r"1.2. Nika ima \(200\) EUR mesečne štipendije. Koliko odstotkov letne štipendije je porabila za telefon? (4 točke)<br>"
    r"1.3. Krožni diagram prikazuje deleže letnega zneska za naročnino, SMS in pogovore. Koliko evrov je plačala za posamezno storitev? (7 točk)" + torta_b1(),
    r"1.1. \(\approx 44{,}33\) EUR, \(5\) mesecev &nbsp; 1.2. \(\approx 22{,}17\,\%\) &nbsp; 1.3. \(79{,}80\), \(106{,}40\), \(345{,}80\) EUR",
    [
        "## 1.1",
        ("vsota: 532,00 EUR", ""),
        ("!x̄ = " + U("532", "12") + " ≈ 44,33 EUR", "", "statistika"),
        ("!5 mesecev (maj, junij, julij, avgust, december)", ""),
        "## 1.2",
        ("letna štipendija: 12 · 200 = 2400 EUR", ""),
        ("!" + U("532", "2400") + " ≈ 22,17 %", "", "odstotki"),
        "## 1.3",
        ("!naročnina: 0,15 · 532 = 79,80 EUR", ""),
        ("!SMS: 0,20 · 532 = 106,40 EUR", ""),
        ("!pogovori: 0,65 · 532 = 345,80 EUR", ""),
    ],
)


def kocka():
    t = [f'<rect x="20" y="50" width="100" height="100" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="20,50 60,15 160,15 120,50" fill="{MODRA}" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="120,50 160,15 160,115 120,150" fill="{MODRA}" fill-opacity="0.18" stroke="currentColor" stroke-width="1.5"/>',
         napis(70, 166, "a", 12)]
    return svg(180, 175, "".join(t), opis="Kocka z robom a")

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Vsota dolžin vseh robov lesene kocke meri \(120\) cm.<br>"
    r"2.1. Nariši skico in izračunaj dolžino roba kocke. (4 točke)<br>"
    r"2.2. Izračunaj površino kocke v kvadratnih milimetrih in prostornino v litrih. (6 točk)<br>"
    r"2.3. Izračunaj prostornino največje krogle, ki jo lahko s struženjem naredimo iz te kocke. (5 točk)",
    r"2.1. \(10\) cm &nbsp; 2.2. \(60\,000\ \mathrm{mm^2}\), \(1\ \ell\) &nbsp; 2.3. \(\frac{500\pi}{3} \approx 523{,}6\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("@slika", kocka()),
        ("!12a = 120  ⇒  a = 10 cm", "Kocka ima 12 enako dolgih robov."),
        "## 2.2",
        ("P = 6a<sup>2</sup> = 600 cm<sup>2</sup>", "", "telesa"),
        ("!P = 60 000 mm<sup>2</sup>", "1 cm² = 100 mm²."),
        ("!V = a<sup>3</sup> = 1000 cm<sup>3</sup> = 1 dm<sup>3</sup> = 1 ℓ", ""),
        "## 2.3",
        ("r = " + U("a", "2") + " = 5 cm", "Krogla se dotika vseh ploskev kocke."),
        ("!V = " + U("4", "3") + "π · 125 = " + U("500π", "3") + " ≈ 523,6 cm<sup>3</sup>", ""),
    ],
)

F = lambda x: (x - 3) / (x - 2) ** 2

b3 = naloga(
    "B3", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x - 3}{x^2 - 4x + 4}\).<br>"
    r"3.1. Izračunaj ničlo, pol in presečišče z ordinatno osjo ter zapiši enačbo vodoravne asimptote. (5 točk)<br>"
    r"3.2. Nariši graf funkcije in zapiši, za katere \(x\) je \(f(x) > 0\). (7 točk)<br>"
    r"3.3. Natančno izračunaj \(f(1) - f(-1)\). (3 točke)",
    r"3.1. ničla \(3\), pol \(2\), \(\left(0, -\frac{3}{4}\right)\), \(y = 0\) &nbsp; 3.2. \(x \in (3, \infty)\) &nbsp; 3.3. \(-\frac{14}{9}\)",
    [
        "## 3.1",
        ("x<sup>2</sup> − 4x + 4 = (x − 2)<sup>2</sup>", "", "racionalna"),
        ("!ničla x = 3,  pol x = 2 (dvojni)", ""),
        ("!(0, −" + U("3", "4") + ")", "f(0) = −3/4."),
        ("!y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        "## 3.2",
        ("@slika", graf([(F, MODRA)], (-4, 9), (-6, 2), [(3, 0, ""), (0, -0.75, "")], sirina=320, visina=240)),
        ("!f(x) > 0 za x ∈ (3, ∞)", "Imenovalec je pozitiven povsod, kjer je definiran.", "neenacba"),
        "## 3.3",
        ("f(1) = " + U("−2", "1") + " = −2,  f(−1) = " + U("−4", "9"), ""),
        ("!f(1) − f(−1) = −2 + " + U("4", "9") + " = −" + U("14", "9"), ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
