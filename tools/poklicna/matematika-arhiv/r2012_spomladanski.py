# Spomladanski rok 2012 (uradna pola RIC P121-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2012, "spomladanski", "sobota, 9. junij 2012"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Poenostavi izraz \(\dfrac{4}{u - v} : \dfrac{8u + 8v}{u^2 - v^2}\).",
    r"\(\frac{1}{2}\)",
    [
        (U("4", "u − v") + " · " + U("(u − v)(u + v)", "8(u + v)"), "Delimo tako, da množimo z obratno vrednostjo; razlika kvadratov."),
        ("!= " + U("4", "8") + " = " + U("1", "2"), "Okrajšamo u − v in u + v."),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Maja je \(6\) litrov soka pretočila v stekleničke po \(0{,}5\) litra in po \(0{,}75\) litra. Napolnila je \(6\) stekleničk po \(0{,}5\) litra. "
    r"Koliko stekleničk po \(0{,}75\) litra je napolnila?",
    r"\(4\)",
    [
        ("6 · 0,5 = 3 ℓ", ""),
        ("6 − 3 = 3 ℓ", "Toliko soka ostane za večje stekleničke."),
        ("!3 : 0,75 = 4 stekleničke", ""),
    ],
)


def trikotnik_a3():
    A, B = (20, 170), (200, 170)
    al, be = math.radians(45), math.radians(65)
    t_ = (B[0] - A[0]) * math.sin(be) / math.sin(al + be)
    C = (A[0] + t_ * math.cos(al), A[1] - t_ * math.sin(al))
    lam = 0.5
    E = (C[0] + (A[0] - C[0]) * lam, C[1] + (A[1] - C[1]) * lam)
    F = (C[0] + (B[0] - C[0]) * lam, C[1] + (B[1] - C[1]) * lam)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{E[0]:.1f}" y1="{E[1]:.1f}" x2="{F[0]:.1f}" y2="{F[1]:.1f}" stroke="currentColor" stroke-width="1.5"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 6, "C"),
         napis(E[0] - 9, E[1] + 4, "E"), napis(F[0] + 9, F[1] + 4, "F"),
         napis(A[0] + 28, A[1] - 6, "45°", 10), napis(C[0], C[1] + 22, "70°", 10), napis(B[0] - 26, B[1] - 6, "β", 12),
         napis(F[0] - 8, F[1] + 16, "φ", 12, RDECA)]
    return svg(225, 190, "".join(t), opis="Trikotnik ABC z daljico EF, vzporedno z AB")

a3 = naloga(
    "A3", "geometrija_ravnine", 4,
    r"Dan je trikotnik \(ABC\) s kotoma \(\alpha = 45^\circ\) in \(\gamma = 70^\circ\). Daljica \(EF\) je vzporedna stranici \(AB\). "
    r"Izračunaj kot \(\beta\) in kot \(\varphi = \angle EFB\)." + trikotnik_a3(),
    r"\(\beta = 65^\circ\), \(\varphi = 115^\circ\)",
    [
        ("!β = 180° − 45° − 70° = 65°", "Vsota notranjih kotov trikotnika."),
        ("∠CFE = β = 65°", "Kota ob vzporednicah EF in AB (sorednja kota)."),
        ("!φ = 180° − 65° = 115°", "φ in ∠CFE sta sokota."),
    ],
)


def krozisce():
    c, R, r = (80, 80), 70, 41
    t = [f'<path d="M {c[0] - R} {c[1]} a {R} {R} 0 1 0 {2 * R} 0 a {R} {R} 0 1 0 {-2 * R} 0 Z M {c[0] - r} {c[1]} a {r} {r} 0 1 0 {2 * r} 0 a {r} {r} 0 1 0 {-2 * r} 0 Z" '
         f'fill="{MODRA}" fill-opacity="0.25" fill-rule="evenodd" stroke="currentColor" stroke-width="1.4"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0] + R}" y2="{c[1]}" stroke="{RDECA}"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0]}" y2="{c[1] - r}" stroke="currentColor"/>',
         napis(c[0] + R - 12, c[1] - 5, "R", 12, RDECA), napis(c[0] + 8, c[1] - r / 2, "r", 12)]
    return svg(160, 160, "".join(t), opis="Krožišče: kolobar med polmeroma R in r")

a4 = naloga(
    "A4", "obsegi_ploscine", 4,
    r"Krožišče ima zunanji polmer \(R = 12\) m in notranji polmer \(r = 7\) m. Izračunaj ploščino cestišča." + krozisce(),
    r"\(95\pi\ \mathrm{m^2} \approx 298{,}45\ \mathrm{m^2}\)",
    [
        ("p = π(R<sup>2</sup> − r<sup>2</sup>) = π(144 − 49)", "Cestišče je kolobar.", "krog"),
        ("!p = 95π m<sup>2</sup> ≈ 298,45 m<sup>2</sup>", ""),
    ],
)

a5 = naloga(
    "A5", "kombinatorika_verjetnost", 4,
    r"Blaž bo za domače branje prebral \(6\) različnih knjig v vrstnem redu, ki ga izbere sam.<br>"
    r"a) Koliko je različnih vrstnih redov?<br>b) Koliko je vrstnih redov, če najprej prebere najdebelejšo knjigo?",
    r"a) \(720\) &nbsp; b) \(120\)",
    [
        ("!a) P<sub>6</sub> = 6! = 720", "Permutacije šestih knjig.", "kombinatorika"),
        ("!b) P<sub>5</sub> = 5! = 120", "Prva knjiga je določena, razvrščamo ostalih pet."),
    ],
)

a6 = naloga(
    "A6", "izrazi_potence", 5,
    r"Reši enačbo \(3(x - 2)(x + 2) - (x + 2)^2 = 2x^2 - 24\).",
    r"\(x = 2\)",
    [
        ("3(x<sup>2</sup> − 4) − (x<sup>2</sup> + 4x + 4) = 2x<sup>2</sup> − 24", "Razlika kvadratov in kvadrat dvočlenika."),
        ("2x<sup>2</sup> − 4x − 16 = 2x<sup>2</sup> − 24", ""),
        ("−4x = −8", "Kvadratna člena se odštejeta."),
        ("!x = 2", ""),
    ],
)

a7 = naloga(
    "A7", "polinomi_racionalna", 5,
    r"Zapiši ničlo, pol in enačbo vodoravne asimptote funkcije \(f(x) = \dfrac{x + 3}{x - 2}\) ter nariši njen graf.",
    r"ničla \(-3\), pol \(2\), \(y = 1\)",
    [
        ("!ničla x = −3,  pol x = 2", "", "racionalna"),
        ("!asimptota y = 1", ""),
        ("f(0) = −" + U("3", "2"), "Pomaga pri risanju."),
        ("@slika", graf([(lambda x: (x + 3) / (x - 2), MODRA), (lambda x: 1, RDECA)], (-6, 8), (-7, 8), [(-3, 0, ""), (0, -1.5, "")], sirina=300, visina=320)),
    ],
)

a8 = naloga(
    "A8", "zaporedja_pm", 5,
    r"Dopiši manjkajoča člena končnega aritmetičnega zaporedja, zapiši diferenco in nariši graf zaporedja: \(11,\ 7,\ \square,\ -1,\ \square\).",
    r"\(3\) in \(-5\); \(d = -4\)",
    [
        ("!d = 7 − 11 = −4", "", "aritmeticno"),
        ("!11, 7, 3, −1, −5", ""),
        ("@slika", mreza((-1, 7), (-6, 12), lambda X, Y: "".join(tocka(X, Y, n, 15 - 4 * n, f"({n}, {15 - 4 * n})".replace("-", "−")) for n in range(1, 6)), sirina=240)),
        (None, "Graf zaporedja so posamezne točke (n, aₙ), ki jih ne povežemo."),
    ],
)

a9 = naloga(
    "A9", "eksponentna_logaritemska", 5,
    r"Ali so izjave pravilne (P) ali nepravilne (N)?"
    + tabela(["Izjava", "P / N"], [
        [r"a) \(\log_4 2 = 2\)", ""],
        [r"b) Rešitev enačbe \(3^x = -9\) je \(x = -2\).", ""],
        [r"c) \(\sin\frac{\pi}{2} + \cos 0 = 2\)", ""],
        [r"d) \(\cos(-x) = \cos x\) za vsak \(x \in \mathbb{R}\).", ""],
        [r"e) \(-3^2 = -9\)", ""]]),
    r"N, N, P, P, P",
    [
        ("!a) N", "log₄ 2 = 1/2, ker je 4^(1/2) = 2.", "logaritem"),
        ("!b) N", "3^x je vedno pozitivno, enačba nima rešitve.", "eksponentna"),
        ("!c) P", "1 + 1 = 2.", "kotne"),
        ("!d) P", "Kosinus je soda funkcija."),
        ("!e) P", "Najprej potenciramo 3, nato upoštevamo minus."),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"Dana je funkcija \(f(x) = x^2 - 2x - 8\).<br>"
    r"1.1. Zapiši presečišča grafa s koordinatnima osema in teme. (5 točk)<br>"
    r"1.2. Nariši graf in zapiši, za katere \(x\) je funkcija negativna. (4 točke)<br>"
    r"1.3. Zapiši enačbo tangente na krivuljo v točki \(T(3, y_0)\). (6 točk)",
    r"1.1. \((-2, 0)\), \((4, 0)\), \((0, -8)\), \(T(1, -9)\) &nbsp; 1.2. \(x \in (-2, 4)\) &nbsp; 1.3. \(y = 4x - 17\)",
    [
        "## 1.1",
        ("!x<sup>2</sup> − 2x − 8 = (x − 4)(x + 2)  ⇒  (−2, 0), (4, 0)", "", "kvadratna"),
        ("!(0, −8)", ""),
        ("!teme (1, −9)", "p = 1, q = f(1).", "teme"),
        "## 1.2",
        ("@slika", graf([(lambda x: x * x - 2 * x - 8, MODRA)], (-4, 6), (-10, 8), [(-2, 0, ""), (4, 0, ""), (0, -8, ""), (1, -9, ""), (3, -5, "T")], sirina=280, visina=400)),
        ("!f(x) < 0 za x ∈ (−2, 4)", "Med ničlama je graf pod osjo x.", "neenacba"),
        "## 1.3",
        ("y<sub>0</sub> = 9 − 6 − 8 = −5", ""),
        ("f'(x) = 2x − 2  ⇒  k = f'(3) = 4", "", "odvod"),
        ("y + 5 = 4(x − 3)", "", "tangenta"),
        ("!y = 4x − 17", ""),
    ],
)


def stozec():
    t = [f'<polygon points="70,20 20,150 120,150" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         '<ellipse cx="70" cy="150" rx="50" ry="12" fill="none" stroke="currentColor"/>',
         f'<line x1="70" y1="20" x2="70" y2="150" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         '<line x1="70" y1="150" x2="120" y2="150" stroke="currentColor"/>',
         napis(78, 90, "a", 12, RDECA), napis(95, 145, "b", 12), napis(70, 50, "φ", 11)]
    return svg(140, 170, "".join(t), opis="Stožec, nastal z vrtenjem pravokotnega trikotnika")

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Pravokotni trikotnik s katetama \(a = 20\) cm in \(b = 15\) cm zavrtimo okrog katete \(a\) za \(360^\circ\)." + stozec()
    + r"2.1. Izračunaj kot ob vrhu osnega preseka nastalega stožca. (5 točk)<br>"
    r"2.2. Izračunaj ploščino plašča stožca. (5 točk)<br>"
    r"2.3. Izračunaj prostornino stožca in jo izrazi v \(\mathrm{dm^3}\). (5 točk)",
    r"2.1. \(\approx 73{,}74^\circ\) &nbsp; 2.2. \(375\pi \approx 1178{,}1\ \mathrm{cm^2}\) &nbsp; 2.3. \(\approx 4{,}71\ \mathrm{dm^3}\)",
    [
        "## 2.1",
        ("v = a = 20 cm,  r = b = 15 cm", "Kateta a je os vrtenja."),
        ("tan " + U("φ", "2") + " = " + U("15", "20") + " = 0,75  ⇒  " + U("φ", "2") + " ≈ 36,87°", "", "kotne"),
        ("!φ ≈ 73,74°", ""),
        "## 2.2",
        ("s = " + K("20<sup>2</sup> + 15<sup>2</sup>") + " = 25 cm", "Stranica stožca je hipotenuza.", "pitagora"),
        ("!pl = πrs = π · 15 · 25 = 375π ≈ 1178,1 cm<sup>2</sup>", "", "telesa"),
        "## 2.3",
        ("V = " + U("πr<sup>2</sup>v", "3") + " = " + U("π · 225 · 20", "3") + " = 1500π cm<sup>3</sup>", ""),
        ("!V ≈ 4712 cm<sup>3</sup> ≈ 4,71 dm<sup>3</sup>", ""),
    ],
)

NACINI = [("Peš", 15), ("Vlak", 10), ("Kolo", 20), ("Avtobus", 25), ("Osebni avto", 30)]


def torta():
    t, z = [], -90
    barve = [MODRA, RDECA, "#1E9E5A", "#C98A0B", "#7A4FC9"]
    for (n, p), b in zip(NACINI, barve):
        k = 3.6 * p
        a0, a1 = math.radians(z), math.radians(z + k)
        t.append(f'<path d="M 90 90 L {90 + 70 * math.cos(a0):.1f} {90 + 70 * math.sin(a0):.1f} A 70 70 0 0 1 {90 + 70 * math.cos(a1):.1f} {90 + 70 * math.sin(a1):.1f} Z" '
                 f'fill="{b}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        am = math.radians(z + k / 2)
        t.append(napis(90 + 46 * math.cos(am), 94 + 46 * math.sin(am), f"{p} %", 10))
        z += k
    leg = "".join(f'<rect x="185" y="{20 + 22 * i}" width="10" height="10" fill="{b}" fill-opacity="0.6"/>' + napis(200, 29 + 22 * i, n, 11, sidro="start")
                  for i, ((n, _), b) in enumerate(zip(NACINI, barve)))
    t2 = "".join(t) + leg
    return svg(290, 180, t2, opis="Načini prihoda v šolo")

b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Diagram prikazuje načine prihoda dijakov v šolo (izmišljeni podatki)." + torta()
    + r"3.1. Z avtobusom se pripelje \(150\) dijakov. Izračunaj število dijakov za vsak način prihoda in število vseh dijakov. (6 točk)<br>"
    r"3.2. Izračunaj velikosti središčnih kotov v stopinjah. (6 točk)<br>"
    r"3.3. Izračunaj verjetnost, da naključno izbrani dijak ni prišel v šolo peš. (3 točke)",
    r"3.1. \(600\) dijakov &nbsp; 3.2. \(54^\circ, 36^\circ, 72^\circ, 90^\circ, 108^\circ\) &nbsp; 3.3. \(0{,}85\)",
    [
        "## 3.1",
        ("25 % = 150  ⇒  100 % = 600", "", "odstotki"),
        ("@slika", tabela(["Način", "Peš", "Vlak", "Kolo", "Avtobus", "Osebni avto"], [["Št. dijakov", "90", "60", "120", "150", "180"]])),
        ("!vseh dijakov: 600", ""),
        "## 3.2",
        ("kot = odstotek · 3,6°", "100 % ustreza 360°.", "statistika"),
        ("@slika", tabela(["Način", "Peš", "Vlak", "Kolo", "Avtobus", "Osebni avto"], [["Kot", "54°", "36°", "72°", "90°", "108°"]])),
        "## 3.3",
        ("!P = 1 − 0,15 = 0,85", "Nasprotni dogodek dogodku »peš«.", "verjetnost"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
