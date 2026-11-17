# Jesenski rok 2012 (uradna pola RIC P122-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2012, "jesenski", "ponedeljek, 27. avgust 2012"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Poenostavi izraz \(a + 1 - \dfrac{a^2 + 2}{a - 1}\).",
    r"\(-\frac{3}{a - 1}\)",
    [
        (U("(a + 1)(a − 1) − (a<sup>2</sup> + 2)", "a − 1"), "Razširimo na skupni imenovalec."),
        ("= " + U("a<sup>2</sup> − 1 − a<sup>2</sup> − 2", "a − 1"), "Razlika kvadratov; pozor na minus pred ulomkom."),
        ("!= −" + U("3", "a − 1"), ""),
    ],
)


def romb_a2():
    a, phi = 8, math.radians(40)
    k = 16
    A = (20, 110)
    B = (A[0] + a * k, 110)
    D = (A[0] + a * k * math.cos(phi), 110 - a * k * math.sin(phi))
    C = (D[0] + a * k, D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{D[0]:.1f}" y1="{D[1]:.1f}" x2="{D[0]:.1f}" y2="{A[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         napis(A[0] + 26, A[1] - 6, "φ", 12), napis(B[0] - 4, B[1] - 8, "β", 12), napis(D[0] + 8, (D[1] + A[1]) / 2, "v", 12, RDECA),
         napis((A[0] + B[0]) / 2 + 30, A[1] + 15, "a", 12), napis((A[0] + D[0]) / 2 - 10, (A[1] + D[1]) / 2, "a", 12)]
    return svg(270, 125, "".join(t), opis="Romb s kotom φ in višino v")

a2 = naloga(
    "A2", "trikotnik_kotne", 4,
    r"Na sliki je romb s stranico \(a = 8\) cm in kotom \(\varphi = 40^\circ\). Izračunaj kot \(\beta\) in višino \(v\)." + romb_a2(),
    r"\(\beta = 140^\circ\), \(v \approx 5{,}14\) cm",
    [
        ("!β = 180° − 40° = 140°", "Sosednja kota romba sta suplementarna."),
        ("v = a · sin φ = 8 · sin 40°", "Višina je kateta pravokotnega trikotnika s hipotenuzo a.", "kotne"),
        ("!v ≈ 5,14 cm", ""),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Ana je v treh dneh nabrala \(30\) kg kostanjev. Prvi dan je nabrala \(\frac{1}{5}\) celotne količine, drugi dan \(45\,\%\) celotne količine. "
    r"Koliko kilogramov je nabrala vsak dan?",
    r"\(6\) kg, \(13{,}5\) kg, \(10{,}5\) kg",
    [
        ("!1. dan: " + U("1", "5") + " · 30 = 6 kg", ""),
        ("!2. dan: 0,45 · 30 = 13,5 kg", "", "odstotki"),
        ("!3. dan: 30 − 6 − 13,5 = 10,5 kg", ""),
    ],
)

a4 = naloga(
    "A4", "trikotnik_kotne", 4,
    r"Dan je trikotnik \(ABC\) s stranicama \(b = 6\) cm, \(c = 10\) cm in kotom \(\alpha = 55^\circ\). Izračunaj dolžino stranice \(a\) na dve decimalni mesti.",
    r"\(a \approx 8{,}20\) cm",
    [
        ("a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc cos α = 36 + 100 − 120 cos 55°", "", "kosinusni"),
        ("a<sup>2</sup> ≈ 67,17", ""),
        ("!a ≈ 8,20 cm", ""),
    ],
)

a5 = naloga(
    "A5", "eksponentna_logaritemska", 4,
    r"Reši enačbi: a) \(\log_2 x = -3\) &nbsp; b) \(x^2 - 7x + 10 = 0\).",
    r"a) \(x = \frac{1}{8}\) &nbsp; b) \(x_1 = 2\), \(x_2 = 5\)",
    [
        ("!a) x = 2<sup>−3</sup> = " + U("1", "8"), "Po definiciji logaritma.", "logaritem"),
        ("b) (x − 2)(x − 5) = 0", "", "vieta"),
        ("!x<sub>1</sub> = 2,  x<sub>2</sub> = 5", ""),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 5,
    r"Zapiši enačbo premice, ki je vzporedna premici \(y = 2x - 1\), ordinatno os pa seka v točki \(N\left(0, -\frac{3}{2}\right)\). Obe premici nariši.",
    r"\(y = 2x - \frac{3}{2}\)",
    [
        ("k = 2", "Vzporedni premici imata enak smerni koeficient.", "premica"),
        ("n = −" + U("3", "2"), ""),
        ("!y = 2x − " + U("3", "2"), ""),
        ("@slika", graf([(lambda x: 2 * x - 1, MODRA), (lambda x: 2 * x - 1.5, RDECA)], (-2, 4), (-5, 6), [(0, -1.5, "N"), (0, -1, "")], sirina=240, visina=380)),
    ],
)


def drevo():
    t = []
    juhe, glavne, sladice = ["J1", "J2", "J3"], ["G1", "G2"], ["S1", "S2"]
    t.append('<circle cx="15" cy="130" r="3" fill="currentColor"/>')
    yj = [45, 130, 215]
    for i, j in enumerate(juhe):
        t.append(f'<line x1="15" y1="130" x2="70" y2="{yj[i]}" stroke="currentColor" stroke-opacity="0.6"/>' + napis(80, yj[i] + 4, j, 10))
        for g in range(2):
            yg = yj[i] - 20 + 40 * g
            t.append(f'<line x1="92" y1="{yj[i]}" x2="150" y2="{yg}" stroke="currentColor" stroke-opacity="0.6"/>' + napis(160, yg + 4, glavne[g], 10))
            for s in range(2):
                ys = yg - 9 + 18 * s
                t.append(f'<line x1="172" y1="{yg}" x2="225" y2="{ys}" stroke="currentColor" stroke-opacity="0.6"/>' + napis(235, ys + 4, sladice[s], 9))
    return svg(260, 255, "".join(t), opis="Kombinatorično drevo: juha, glavna jed, sladica")

a7 = naloga(
    "A7", "kombinatorika_verjetnost", 5,
    r"Mateja je pri sestavi kosila izbirala med \(3\) juhami, \(2\) glavnima jedema in \(2\) sladicama. Nariši kombinatorično drevo in zapiši, na koliko načinov je lahko sestavila kosilo.",
    r"\(12\)",
    [
        ("@slika", drevo()),
        ("3 · 2 · 2", "Vsaka pot od korena do lista je eno kosilo.", "kombinatorika"),
        ("!12 načinov", ""),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Petra je prvi teden počitnic zaslužila \(25\) EUR, vsak naslednji teden pa \(1{,}1\)-krat toliko kakor teden pred tem. Koliko je zaslužila v \(8\) tednih?",
    r"\(\approx 285{,}90\) EUR",
    [
        ("a<sub>1</sub> = 25,  q = 1,1,  n = 8", "Zaslužki tvorijo geometrijsko zaporedje.", "geometrijsko"),
        ("S<sub>8</sub> = 25 · " + U("1,1<sup>8</sup> − 1", "1,1 − 1"), ""),
        ("!S<sub>8</sub> ≈ 285,90 EUR", ""),
    ],
)

LETA = [2019, 2020, 2021, 2022]
DIJ = [112, 104, 98, 110]

a9 = naloga(
    "A9", "statistika_pm", 5,
    r"V preglednici je število dijakov 1. letnika neke srednje šole po letih (izmišljeni podatki)."
    + tabela(["Leto"] + [str(l) for l in LETA], [["Število dijakov"] + [str(d) for d in DIJ]])
    + r"Nariši stolpčni diagram in izračunaj aritmetično sredino.",
    r"\(\bar{x} = 106\)",
    [
        ("@slika", svg(240, 170, "".join(f'<rect x="{30 + i * 50}" y="{150 - d}" width="32" height="{d}" fill="{MODRA}" fill-opacity="0.75"/>'
                                         + napis(46 + i * 50, 146 - d, str(d), 10) + napis(46 + i * 50, 164, str(l), 10)
                                         for i, (l, d) in enumerate(zip(LETA, DIJ))) + '<line x1="22" y1="150" x2="230" y2="150" stroke="currentColor"/>',
                       opis="Stolpčni diagram števila dijakov")),
        ("!x̄ = " + U("112 + 104 + 98 + 110", "4") + " = " + U("424", "4") + " = 106", "", "statistika"),
    ],
)

# ------------------------------------------------------------------ 2. del
TAB = [(-1, -8), (0, -3), (1, 0), (2, 1), (3, 0), (4, -3), (5, -8)]

b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"V preglednici je tabelirana kvadratna funkcija \(f\)."
    + tabela([r"\(x\)"] + [str(x) for x, _ in TAB], [[r"\(f(x)\)"] + [str(y) for _, y in TAB]])
    + r"1.1. Iz preglednice odčitaj ničli, teme in presečišče grafa z osjo \(y\). Nariši graf. (6 točk)<br>"
    r"1.2. Zapiši enačbo kvadratne funkcije \(f\). (5 točk)<br>"
    r"1.3. Zapiši enačbo tangente na graf funkcije \(f\) v točki \(T(4, -3)\). (4 točke)",
    r"1.1. \(1\), \(3\); \(T(2, 1)\); \((0, -3)\) &nbsp; 1.2. \(f(x) = -x^2 + 4x - 3\) &nbsp; 1.3. \(y = -4x + 13\)",
    [
        "## 1.1",
        ("!ničli: x<sub>1</sub> = 1, x<sub>2</sub> = 3", "Kjer je f(x) = 0."),
        ("!teme: (2, 1)", "Vrednosti so simetrične glede na x = 2.", "teme"),
        ("!presečišče z osjo y: (0, −3)", ""),
        ("@slika", graf([(lambda x: -x * x + 4 * x - 3, MODRA)], (-2, 6), (-9, 3), [(x, y, "") for x, y in TAB], sirina=280, visina=330)),
        "## 1.2",
        ("f(x) = a(x − 1)(x − 3)", "Ničelna oblika."),
        ("f(0) = 3a = −3  ⇒  a = −1", ""),
        ("!f(x) = −x<sup>2</sup> + 4x − 3", "", "kvadratna"),
        "## 1.3",
        ("f'(x) = −2x + 4  ⇒  k = f'(4) = −4", "", "odvod"),
        ("y + 3 = −4(x − 4)", "", "tangenta"),
        ("!y = −4x + 13", ""),
    ],
)


def osnova_b2():
    r, k = 5, 14
    c = (90, 85)
    s = 3 * k
    t = [f'<path d="M {c[0] - r * k} {c[1]} a {r * k} {r * k} 0 1 0 {2 * r * k} 0 a {r * k} {r * k} 0 1 0 {-2 * r * k} 0 Z '
         f'M {c[0] - s} {c[1] - s} h {2 * s} v {2 * s} h {-2 * s} Z" fill="{MODRA}" fill-opacity="0.2" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0] + r * k * math.cos(math.radians(-60)):.1f}" y2="{c[1] + r * k * math.sin(math.radians(-60)):.1f}" stroke="{RDECA}"/>',
         napis(c[0] - 6, c[1] + 4, "S", 11), napis(c[0] + r * k * 0.5 + 6, c[1] - r * k * 0.87, "C", 11, RDECA),
         napis(c[0] - s - 6, c[1] + s + 12, "A", 11), napis(c[0] + s + 6, c[1] + s + 12, "B", 11)]
    return svg(180, 170, "".join(t), opis="Osnovna ploskev: krog s kvadratno odprtino")

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Valjasto telo ima v sredini kvadratno odprtino skozi celo višino. Višina telesa meri \(10\) cm, stranica kvadrata \(AB = 6\) cm, polmer kroga \(SC = 5\) cm. "
    r"Na sliki je osnovna ploskev." + osnova_b2()
    + r"2.1. Izračunaj ploščino osnovne ploskve. (3 točke)<br>"
    r"2.2. Izračunaj površino telesa. (6 točk)<br>"
    r"2.3. Izračunaj prostornino telesa. (6 točk)",
    r"2.1. \(\approx 42{,}54\ \mathrm{cm^2}\) &nbsp; 2.2. \(\approx 639{,}24\ \mathrm{cm^2}\) &nbsp; 2.3. \(\approx 425{,}4\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("O = πr<sup>2</sup> − a<sup>2</sup> = 25π − 36", "Od kroga odštejemo kvadrat.", "krog"),
        ("!O ≈ 42,54 cm<sup>2</sup>", ""),
        "## 2.2",
        ("zunanji plašč: 2πrv = 100π ≈ 314,16 cm<sup>2</sup>", "", "telesa"),
        ("notranji plašč: 4 · 6 · 10 = 240 cm<sup>2</sup>", "Stene kvadratne odprtine."),
        ("P = 2O + 100π + 240 ≈ 85,08 + 314,16 + 240", ""),
        ("!P ≈ 639,24 cm<sup>2</sup>", ""),
        "## 2.3",
        ("!V = O · v ≈ 42,54 · 10 ≈ 425,4 cm<sup>3</sup>", ""),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Andraž ima črtast zvezek s \(16\) vrsticami na strani. V prvo vrstico prve strani je napisal \(2\) črki, v vsako naslednjo pa \(4\) črke več kakor v prejšnjo.<br>"
    r"3.1. Koliko črk je napisal v \(10.\) vrstico prve strani? (5 točk)<br>"
    r"3.2. Koliko črk je napisal na prvo stran? Ali je bilo na prvi strani kdaj (po končani vrstici) skupaj natanko \(300\) črk? (5 točk)<br>"
    r"3.3. Andraž je nehal pisati, ko je v neko vrstico zapisal \(62\) črk. Koliko vrstic je popisal? (5 točk)",
    r"3.1. \(38\) &nbsp; 3.2. \(512\); ne &nbsp; 3.3. \(16\)",
    [
        "## 3.1",
        ("a<sub>10</sub> = 2 + 9 · 4", "", "aritmeticno"),
        ("!a<sub>10</sub> = 38", ""),
        "## 3.2",
        ("S<sub>n</sub> = " + U("n", "2") + "(2 · 2 + (n − 1) · 4) = 2n<sup>2</sup>", ""),
        ("!S<sub>16</sub> = 2 · 256 = 512 črk", ""),
        ("2n<sup>2</sup> = 300  ⇒  n<sup>2</sup> = 150", "150 ni popolni kvadrat, zato n ni naravno število."),
        ("!Ne, natanko 300 črk ni bilo nikoli.", ""),
        "## 3.3",
        ("2 + (n − 1) · 4 = 62  ⇒  n − 1 = 15", ""),
        ("!n = 16 vrstic", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
