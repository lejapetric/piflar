# Zimski rok 2010 (uradna pola RIC P103-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2010, "zimski", "četrtek, 10. februar 2011"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"Reši enačbo \(\dfrac{x}{2} - \dfrac{2x - 1}{5} = \dfrac{3x - 14}{10}\).",
    r"\(x = 8\)",
    [
        ("5x − 2(2x − 1) = 3x − 14", "Pomnožimo z 10."),
        ("5x − 4x + 2 = 3x − 14  ⇒  x + 2 = 3x − 14", ""),
        ("!x = 8", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Natančno izračunaj: \(\left(\sqrt{2}\right)^{-4} - 12 \cdot 2^{-2}\).",
    r"\(-\frac{11}{4}\)",
    [
        ("(" + K("2") + ")<sup>−4</sup> = " + U("1", "(" + K("2") + ")<sup>4</sup>") + " = " + U("1", "4"), "", "potence"),
        ("12 · 2<sup>−2</sup> = 12 · " + U("1", "4") + " = 3", ""),
        ("!" + U("1", "4") + " − 3 = −" + U("11", "4"), ""),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"V piškotih s čokoladnim nadevom je \(40\,\%\) nadeva. Petina nadeva je čisti kakav. Koliko gramov čistega kakava je v \(150\) g piškotov?",
    r"\(12\) g",
    [
        ("nadev: 0,40 · 150 g = 60 g", "", "odstotki"),
        ("!kakav: " + U("1", "5") + " · 60 g = 12 g", ""),
    ],
)


def lestev():
    t = ['<line x1="20" y1="150" x2="230" y2="150" stroke="currentColor" stroke-width="1.5"/>',
         '<rect x="170" y="30" width="16" height="120" fill="currentColor" fill-opacity="0.15" stroke="currentColor"/>',
         f'<line x1="80" y1="150" x2="170" y2="30" stroke="{RDECA}" stroke-width="2.5"/>',
         '<path d="M 102 150 A 22 22 0 0 0 93.2 132.4" fill="none" stroke="currentColor"/>',
         napis(106, 140, "α", 12), napis(118, 82, "4,5 m", 11, RDECA, "end"), napis(196, 94, "3,6 m", 11, sidro="start")]
    return svg(250, 165, "".join(t), opis="Lestev, prislonjena na zid")


a4 = naloga(
    "A4", "trikotnik_kotne", 4,
    r"Navpični zid je visok \(3{,}6\) m. Ana ima \(4{,}5\) m dolgo lestev. Pod kolikšnim kotom glede na vodoravna tla jo mora prisloniti, da bo z njo dosegla natanko vrh zidu? Nariši skico.",
    r"\(\alpha \approx 53{,}13^\circ = 53^\circ 8'\)",
    [
        ("@slika", lestev()),
        ("sin α = " + U("3,6", "4,5") + " = 0,8", "Zid je kateta nasproti kota α, lestev je hipotenuza.", "kotne"),
        ("!α ≈ 53,13° = 53° 8′", ""),
    ],
)

F5 = lambda x: x * x - 2 * x - 3

a5 = naloga(
    "A5", "kvadratna_funkcija", 4,
    r"Na sliki je graf kvadratne funkcije." + graf([(F5, MODRA)], (-2.4, 4.4), (-5, 4), [], sirina=260, visina=300)
    + r"Za to funkcijo zapiši ničli, teme, kje funkcija narašča in kje je pozitivna.",
    r"ničli \(-1\) in \(3\); \(T(1, -4)\); narašča na \((1, \infty)\); pozitivna na \((-\infty, -1) \cup (3, \infty)\)",
    [
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = 3", "Graf seka os x v teh dveh točkah."),
        ("!T(1, −4)", "Abscisa temena leži na sredini med ničlama.", "teme"),
        ("!narašča za x ∈ (1, ∞)", "Parabola je odprta navzgor."),
        ("!pozitivna za x ∈ (−∞, −1) ∪ (3, ∞)", ""),
        (None, "Iz grafa lahko preberemo tudi predpis f(x) = (x + 1)(x − 3) = x² − 2x − 3."),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 5,
    r"V koordinatni sistem nariši premico z enačbo \(y = -\frac{2}{3}x + 2\). Računsko preveri, ali točka \(A(9, -4)\) leži na tej premici.",
    r"da, \(A\) leži na premici",
    [
        ("x = 0: y = 2,  x = 3: y = 0", "Dve točki zadoščata za risanje premice.", "premica"),
        ("@slika", graf([(lambda x: -2 * x / 3 + 2, MODRA)], (-2, 10), (-5, 4), [(0, 2, ""), (3, 0, ""), (9, -4, "A")], sirina=320, visina=250)),
        ("y(9) = −" + U("2", "3") + " · 9 + 2 = −6 + 2 = −4", ""),
        ("!točka A leži na premici", "Izračunana ordinata je enaka −4."),
    ],
)

a7 = naloga(
    "A7", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(2^{3x + 1} \cdot \dfrac{1}{4} = 32\).",
    r"\(x = 2\)",
    [
        ("2<sup>3x + 1</sup> · 2<sup>−2</sup> = 2<sup>5</sup>", "", "eksponentna"),
        ("2<sup>3x − 1</sup> = 2<sup>5</sup>  ⇒  3x − 1 = 5", ""),
        ("!x = 2", ""),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Določi manjkajoči člen tako, da bo zaporedje \(3, 6, \square, 24, \ldots\) geometrijsko. Izračunaj vsoto prvih osmih členov zaporedja.",
    r"\(12\); \(s_8 = 765\)",
    [
        ("q = " + U("6", "3") + " = 2", "", "geometrijsko"),
        ("!manjkajoči člen: 6 · 2 = 12", "Preverimo: 12 · 2 = 24."),
        ("s<sub>8</sub> = 3 · " + U("2<sup>8</sup> − 1", "2 − 1") + " = 3 · 255", ""),
        ("!s<sub>8</sub> = 765", ""),
    ],
)

a9 = naloga(
    "A9", "realna_stevila_koreni", 5,
    r"Natančno izračunaj in rezultat racionaliziraj: \(\dfrac{\left(\sqrt{3} + 3\right)^2}{2\sqrt{3}}\).",
    r"\(2\sqrt{3} + 3\)",
    [
        ("(" + K("3") + " + 3)<sup>2</sup> = 3 + 6" + K("3") + " + 9 = 12 + 6" + K("3"), "", "koreni"),
        (U("12 + 6" + K("3"), "2" + K("3")) + " = " + U("6 + 3" + K("3"), K("3")), "Okrajšamo z 2."),
        (U("(6 + 3" + K("3") + ") · " + K("3"), "3") + " = " + U("6" + K("3") + " + 9", "3"), "Racionaliziramo: števec in imenovalec pomnožimo s √3."),
        ("!2" + K("3") + " + 3", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
FILMI = [("Gorski vrh", 32), ("Zadnji vlak", 26), ("Modro morje", 18), ("Tihi gozd", 15), ("Zimska pravljica", 9)]


def torta():
    t, z = [], -90
    barve = [MODRA, RDECA, "#1E9E5A", "#C98A0B", "#7A4FC9"]
    for (n, p), b in zip(FILMI, barve):
        k = 3.6 * p
        a0, a1 = math.radians(z), math.radians(z + k)
        t.append(f'<path d="M 90 90 L {90 + 70 * math.cos(a0):.1f} {90 + 70 * math.sin(a0):.1f} A 70 70 0 0 1 {90 + 70 * math.cos(a1):.1f} {90 + 70 * math.sin(a1):.1f} Z" '
                 f'fill="{b}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        am = math.radians(z + k / 2)
        t.append(napis(90 + 46 * math.cos(am), 94 + 46 * math.sin(am), f"{p} %", 10))
        z += k
    leg = "".join(f'<rect x="185" y="{20 + 22 * i}" width="10" height="10" fill="{b}" fill-opacity="0.6"/>' + napis(200, 29 + 22 * i, n, 11, sidro="start")
                  for i, ((n, _), b) in enumerate(zip(FILMI, barve)))
    return svg(300, 180, "".join(t) + leg, opis="Deleži gledalcev filmskih predstav")


b1 = naloga(
    "B1", "statistika_pm", 15,
    r"V kinodvorani so v novembru predvajali pet filmskih predstav. Strukturni krog prikazuje delež gledalcev posamezne predstave glede na vse gledalce v novembru (izmišljeni podatki). "
    r"Najbolj obiskano predstavo si je ogledalo \(1600\) ljudi." + torta()
    + r"1.1. Za vsako predstavo zapiši relativno in absolutno frekvenco. (8 točk)<br>"
    r"1.2. Koliko je bilo vseh gledalcev v novembru? Koliko gledalcev si je ogledalo tri najmanj obiskane predstave? (4 točke)<br>"
    r"1.3. Vstopnica stane \(6\) EUR. Koliko evrov več so iztržili z najbolj obiskano predstavo kakor z najmanj obiskano? (3 točke)",
    r"1.2. \(5000\) gledalcev, \(2100\) gledalcev &nbsp; 1.3. \(6900\) EUR",
    [
        "## 1.1",
        ("N = " + U("1600", "0,32") + " = 5000", "Najbolj obiskana predstava (Gorski vrh) ima 32 % gledalcev.", "odstotki"),
        ("@slika", tabela(["Predstava", "f (relativna)", "f (absolutna)"],
                          [["Gorski vrh", "0,32", "1600"], ["Zadnji vlak", "0,26", "1300"], ["Modro morje", "0,18", "900"],
                           ["Tihi gozd", "0,15", "750"], ["Zimska pravljica", "0,09", "450"]])),
        (None, "Absolutna frekvenca je relativna frekvenca krat 5000, npr. 0,26 · 5000 = 1300."),
        "## 1.2",
        ("!vseh gledalcev: 5000", "", "statistika"),
        ("!900 + 750 + 450 = 2100 gledalcev", "Tri najmanj obiskane so Modro morje, Tihi gozd in Zimska pravljica."),
        "## 1.3",
        ("1600 − 450 = 1150 gledalcev več", ""),
        ("!1150 · 6 = 6900 EUR", ""),
    ],
)


def prizma():
    A, B, C = (25, 175), (100, 195), (225, 172)
    h = 115
    D, E, Fp = (A[0], A[1] - h), (B[0], B[1] - h), (C[0], C[1] - h)
    ln = lambda P, Q, extra="": f'<line x1="{P[0]}" y1="{P[1]}" x2="{Q[0]}" y2="{Q[1]}" stroke="currentColor" stroke-width="1.3"{extra}/>'
    t = [f'<path d="M {A[0]} {A[1]} L {B[0]} {B[1]} L {C[0]} {C[1]} L {Fp[0]} {Fp[1]} L {D[0]} {D[1]} Z" fill="{MODRA}" fill-opacity="0.08"/>',
         ln(A, B), ln(B, C), ln(A, C, ' stroke-dasharray="4 3"'), ln(D, E), ln(E, Fp), ln(D, Fp),
         ln(A, D), ln(B, E), ln(C, Fp),
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]}" stroke="{RDECA}" stroke-width="1.6"/>',
         '<path d="M 86.5 191.4 A 14 14 0 0 1 113.8 192.5" fill="none" stroke="currentColor"/>',
         napis(A[0] - 10, A[1] + 4, "A"), napis(B[0], B[1] + 16, "B"), napis(C[0] + 10, C[1] + 4, "C"),
         napis(D[0] - 10, D[1] + 2, "D"), napis(B[0] + 4, E[1] - 6, "E"), napis(Fp[0] + 10, Fp[1] + 2, "F"),
         napis(114, 182, "150°", 10, sidro="start")]
    return svg(250, 215, "".join(t), opis="Pokončna tristrana prizma")


b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Na skici je pokončna tristrana prizma \(ABCDEF\). Kot \(ABC\) meri \(150^\circ\), \(|AB| = 12\) cm in \(|BC| = 20\) cm. Višina prizme je \(35\) cm." + prizma()
    + r"2.1. Izračunaj dolžino daljice \(BD\). (3 točke)<br>"
    r"2.2. Izračunaj prostornino prizme. Rezultat zapiši v \(\mathrm{dm^3}\). (6 točk)<br>"
    r"2.3. Izračunaj ploščino plašča prizme. Rezultat zapiši v \(\mathrm{dm^2}\). (6 točk)",
    r"2.1. \(37\) cm &nbsp; 2.2. \(2{,}1\ \mathrm{dm^3}\) &nbsp; 2.3. \(\approx 22{,}04\ \mathrm{dm^2}\)",
    [
        "## 2.1",
        ("|BD|<sup>2</sup> = |AB|<sup>2</sup> + |AD|<sup>2</sup> = 144 + 1225 = 1369", "Trikotnik ABD je pravokoten s pravim kotom pri A.", "pitagora"),
        ("!|BD| = 37 cm", ""),
        "## 2.2",
        ("O = " + U("1", "2") + " · 12 · 20 · sin 150° = 120 · " + U("1", "2") + " = 60 cm<sup>2</sup>", "sin 150° = sin 30° = 1/2.", "ploscine"),
        ("V = O · v = 60 · 35 = 2100 cm<sup>3</sup>", "", "telesa"),
        ("!V = 2,1 dm<sup>3</sup>", "1 dm³ = 1000 cm³."),
        "## 2.3",
        ("|AC|<sup>2</sup> = 144 + 400 − 2 · 12 · 20 · cos 150° = 544 + 240" + K("3") + " ≈ 959,69", "cos 150° = −√3/2.", "kosinusni"),
        ("|AC| ≈ 30,98 cm", ""),
        ("pl = (12 + 20 + 30,98) · 35 ≈ 2204,3 cm<sup>2</sup>", "Plašč so trije pravokotniki z višino 35 cm."),
        ("!pl ≈ 22,04 dm<sup>2</sup>", "1 dm² = 100 cm²."),
    ],
)

F3 = lambda x: (x - 3) / (x - 1) ** 2

b3 = naloga(
    "B3", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x - 3}{x^2 - 2x + 1}\).<br>"
    r"3.1. Izračunaj ničlo, pol, enačbo vodoravne asimptote in presečišče grafa z ordinatno osjo. (5 točk)<br>"
    r"3.2. Skiciraj graf funkcije. (6 točk)<br>"
    r"3.3. Natančno izračunaj \(f(4) - f(-1)\). (4 točke)",
    r"3.1. ničla \(3\), pol \(1\) (dvojni), \(y = 0\), \((0, -3)\) &nbsp; 3.3. \(\frac{10}{9}\)",
    [
        "## 3.1",
        ("f(x) = " + U("x − 3", "(x − 1)<sup>2</sup>"), "Imenovalec je popolni kvadrat.", "racionalna"),
        ("!ničla x = 3", ""),
        ("!pol x = 1 (dvojni)", "Funkcija ob polu ne spremeni predznaka."),
        ("!vodoravna asimptota y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("!presečišče z osjo y: (0, −3)", "f(0) = −3 : 1 = −3."),
        "## 3.2",
        ("f(−1) = −1,  f(2) = −1,  f(5) = " + U("1", "8"), "Nekaj dodatnih točk za risanje."),
        ("@slika", graf([(F3, MODRA), (lambda x: 0, RDECA)], (-4, 7), (-7, 2), [(3, 0, ""), (0, -3, ""), (-1, -1, ""), (2, -1, "")], sirina=300, visina=260)),
        "## 3.3",
        ("f(4) = " + U("1", "9") + ",  f(−1) = " + U("−4", "4") + " = −1", ""),
        ("!f(4) − f(−1) = " + U("1", "9") + " + 1 = " + U("10", "9"), ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
