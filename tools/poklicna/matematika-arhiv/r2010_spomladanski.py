# Spomladanski rok 2010 (uradna pola RIC P101-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2010, "spomladanski", "sobota, 5. junij 2010"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"a) Število \(1260\) zapiši kot produkt praštevil.<br>b) Število \(\sqrt{1260}\) delno koreni.",
    r"a) \(2^2 \cdot 3^2 \cdot 5 \cdot 7\) &nbsp; b) \(6\sqrt{35}\)",
    [
        ("1260 = 2 · 630 = 2 · 2 · 315 = 2 · 2 · 3 · 105 = 2 · 2 · 3 · 3 · 35", "Zaporedoma delimo s praštevili."),
        ("!1260 = 2<sup>2</sup> · 3<sup>2</sup> · 5 · 7", ""),
        ("!" + K("1260") + " = " + K("2<sup>2</sup> · 3<sup>2</sup> · 35") + " = 6" + K("35"), "Iz korena izpeljemo kvadrata.", "koreni"),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\dfrac{1 - a^{-2}}{1 + a^{-1}}\).",
    r"\(\dfrac{a - 1}{a}\)",
    [
        ("1 − a<sup>−2</sup> = " + U("a<sup>2</sup> − 1", "a<sup>2</sup>") + ",  1 + a<sup>−1</sup> = " + U("a + 1", "a"), "", "potence"),
        (U("(a − 1)(a + 1)", "a<sup>2</sup>") + " · " + U("a", "a + 1"), "Delimo tako, da množimo z obratno vrednostjo."),
        ("!" + U("a − 1", "a"), "Okrajšamo z a(a + 1)."),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Ana, Boris in Lovro so si razdelili nagrado \(7200\) EUR. Ana in Boris sta dobila enak znesek, Lovro pa \(36\,\%\) nagrade. Koliko je dobil vsak?",
    r"Lovro \(2592\) EUR, Ana in Boris po \(2304\) EUR",
    [
        ("!Lovro: 0,36 · 7200 = 2592 EUR", "", "odstotki"),
        ("ostanek: 7200 − 2592 = 4608 EUR", ""),
        ("!Ana in Boris: 4608 : 2 = 2304 EUR vsak", ""),
    ],
)

a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"Dana je premica \(4x - 5y + 20 = 0\). Izračunaj presečišči premice s koordinatnima osema in premico nariši.",
    r"\((-5, 0)\) in \((0, 4)\)",
    [
        ("y = 0:  4x + 20 = 0  ⇒  x = −5", "", "premica"),
        ("!N(−5, 0)", ""),
        ("x = 0:  −5y + 20 = 0  ⇒  y = 4", ""),
        ("!(0, 4)", ""),
        ("@slika", graf([(lambda x: 0.8 * x + 4, MODRA)], (-6, 2), (-2, 6), [(-5, 0, ""), (0, 4, "")], sirina=280, visina=280)),
    ],
)


def trikotnik_a5():
    s = 22
    C, A, B = (30, 130), (30, 130 - 4 * s), (30 + 7 * s, 130)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {C[0]} {C[1] - 10} h 10 v 10" fill="none" stroke="currentColor"/>',
         f'<path d="M {B[0] - 24} {B[1]} A 24 24 0 0 1 {B[0] - 24 * math.cos(math.atan(4 / 7)):.1f} {B[1] - 24 * math.sin(math.atan(4 / 7)):.1f}" fill="none" stroke="{RDECA}"/>',
         napis(C[0] - 8, C[1] + 4, "C"), napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"),
         napis(C[0] - 6, (A[1] + C[1]) / 2 + 4, "4 cm", 10, sidro="end"), napis((B[0] + C[0]) / 2, C[1] + 15, "7 cm", 10),
         napis(B[0] - 32, B[1] - 4, "β", 12, RDECA)]
    return svg(200, 150, "".join(t), opis="Pravokotni trikotnik ABC")


a5 = naloga(
    "A5", "trikotnik_kotne", 4,
    r"Natančno nariši pravokotni trikotnik \(ABC\) s pravim kotom pri oglišču \(C\) ter s stranicama \(|AC| = 4\) cm in \(|BC| = 7\) cm. Izračunaj kot pri oglišču \(B\).",
    r"\(\beta \approx 29{,}74^\circ = 29^\circ 45'\)",
    [
        ("@slika", trikotnik_a5()),
        ("tan β = " + U("|AC|", "|BC|") + " = " + U("4", "7"), "Stranica AC je nasprotna kateta kota β, BC pa priležna.", "kotne"),
        ("!β ≈ 29,74° = 29° 45′", ""),
    ],
)


def descici():
    tg = math.tan(math.radians(40))
    off = 50 / math.sin(math.radians(40))
    x1 = lambda y: 100 + (130 - y) / tg
    x2 = lambda y: 100 + off + (130 - y) / tg
    t = ['<rect x="20" y="80" width="320" height="50" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<polygon points="{x1(200):.1f},200 {x2(200):.1f},200 {x2(10):.1f},10 {x1(10):.1f},10" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<polygon points="{x1(130):.1f},130 {x2(130):.1f},130 {x2(80):.1f},80 {x1(80):.1f},80" fill="{MODRA}" fill-opacity="0.45" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M 122 130 A 22 22 0 0 0 {100 + 22 * math.cos(math.radians(40)):.1f} {130 - 22 * math.sin(math.radians(40)):.1f}" fill="none" stroke="{RDECA}"/>',
         napis(132, 124, "40°", 10, RDECA, "start"), napis(345, 109, "10 cm", 11, sidro="start")]
    return svg(390, 210, "".join(t), opis="Prekrižani deščici z osenčenim rombom")


a6 = naloga(
    "A6", "obsegi_ploscine", 5,
    r"Enaki pravokotni deščici s širino \(10\) cm oklepata kot \(40^\circ\) (glej sliko). Izračunaj ploščino osenčenega romba." + descici(),
    r"\(S \approx 155{,}57\ \mathrm{cm^2}\)",
    [
        ("v = 10 cm", "Višina romba je širina deščice."),
        ("a = " + U("v", "sin 40°") + " = " + U("10", "sin 40°") + " ≈ 15,56 cm", "Stranica romba je hipotenuza pravokotnega trikotnika z nasprotno kateto v.", "kotne"),
        ("S = a · v = " + U("100", "sin 40°"), "", "ploscine"),
        ("!S ≈ 155,57 cm<sup>2</sup>", ""),
    ],
)

a7 = naloga(
    "A7", "eksponentna_logaritemska", 5,
    r"Reši enačbi: a) \(\dfrac{x - 9}{x + 3} = 5\) &nbsp; b) \(\log_8 2 = x\).",
    r"a) \(x = -6\) &nbsp; b) \(x = \frac{1}{3}\)",
    [
        "## a)",
        ("x − 9 = 5(x + 3)  ⇒  x − 9 = 5x + 15", "Pogoj: x ≠ −3."),
        ("−4x = 24", ""),
        ("!x = −6", "Rešitev ustreza pogoju."),
        "## b)",
        ("8<sup>x</sup> = 2  ⇒  2<sup>3x</sup> = 2<sup>1</sup>", "", "logaritem"),
        ("!x = " + U("1", "3"), ""),
    ],
)

a8 = naloga(
    "A8", "polinomi_racionalna", 5,
    r"Izračunaj ničle polinoma \(p(x) = x^3 - 4x^2 + 5x - 2\).",
    r"\(x_{1,2} = 1\), \(x_3 = 2\)",
    [
        ("p(1) = 1 − 4 + 5 − 2 = 0", "Kandidati za cele ničle so delitelji prostega člena: ±1, ±2.", "horner"),
        ("p(x) = (x − 1)(x<sup>2</sup> − 3x + 2)", "Hornerjev algoritem: 1, −3, 2, ostanek 0."),
        ("x<sup>2</sup> − 3x + 2 = (x − 1)(x − 2)", ""),
        ("!x<sub>1,2</sub> = 1 (dvojna),  x<sub>3</sub> = 2", ""),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Dolžine stranic trikotnika so prvi trije členi aritmetičnega zaporedja. Obseg trikotnika meri \(27\) cm, najkrajša stranica pa \(6\) cm. Izračunaj dolžine stranic.",
    r"\(6\) cm, \(9\) cm, \(12\) cm",
    [
        ("a<sub>1</sub> + (a<sub>1</sub> + d) + (a<sub>1</sub> + 2d) = 27  ⇒  18 + 3d = 27", "", "aritmeticno"),
        ("d = 3", ""),
        ("!stranice: 6 cm, 9 cm, 12 cm", "Preverimo trikotniško neenakost: 6 + 9 > 12."),
    ],
)

# ------------------------------------------------------------------ 2. del
FB = lambda x: x * x / 2
GB = lambda x: -x * x + 6 * x


def risba_b1(X, Y):
    t = krivulja(X, Y, FB, -4.45, 4.45, MODRA) + krivulja(X, Y, GB, -0.5, 6.5, RDECA)
    t += tocka(X, Y, 0, 0) + tocka(X, Y, 4, 8, "P", 6, -4) + tocka(X, Y, 3, 9, "T", -4, -8)
    t += napis(X(-3.6), Y(8), "f", 12, MODRA) + napis(X(6.2), Y(-1.5), "g", 12, RDECA)
    return t


b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"Dani sta kvadratni funkciji \(f(x) = \frac{1}{2}x^2\) in \(g(x) = -x^2 + 6x\).<br>"
    r"1.1. Nariši grafa obeh funkcij v isti koordinatni sistem. (6 točk)<br>"
    r"1.2. Izračunaj presečišči grafov. (6 točk)<br>"
    r"1.3. Izračunaj \(f(2) - g(-1)\). (3 točke)",
    r"1.2. \((0, 0)\) in \((4, 8)\) &nbsp; 1.3. \(9\)",
    [
        "## 1.1",
        ("f: teme (0, 0), f(2) = 2, f(4) = 8", ""),
        ("g(x) = −x(x − 6): ničli 0 in 6, teme T(3, 9)", "", "teme"),
        ("@slika", mreza((-5, 7), (-3, 10), risba_b1, sirina=300)),
        "## 1.2",
        (U("1", "2") + "x<sup>2</sup> = −x<sup>2</sup> + 6x  ⇒  " + U("3", "2") + "x<sup>2</sup> − 6x = 0", "", "kvadratna"),
        ("x(" + U("3", "2") + "x − 6) = 0  ⇒  x = 0,  x = 4", ""),
        ("!(0, 0) in (4, 8)", "f(4) = 8."),
        "## 1.3",
        ("f(2) = 2,  g(−1) = −1 − 6 = −7", ""),
        ("!f(2) − g(−1) = 2 + 7 = 9", ""),
    ],
)


def telo():
    cx, r, ry = 100, 40, 8
    yv, yd, ya = 110, 180, 28
    t = [f'<path d="M {cx - r} {yv} L {cx} {ya} L {cx + r} {yv} L {cx + r} {yd} A {r} {ry} 0 0 1 {cx - r} {yd} Z" fill="{MODRA}" fill-opacity="0.08"/>',
         f'<line x1="{cx - r}" y1="{yv}" x2="{cx}" y2="{ya}" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{cx + r}" y1="{yv}" x2="{cx}" y2="{ya}" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{cx - r}" y1="{yv}" x2="{cx - r}" y2="{yd}" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{cx + r}" y1="{yv}" x2="{cx + r}" y2="{yd}" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yv} A {r} {ry} 0 0 0 {cx + r} {yv}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yv} A {r} {ry} 0 0 1 {cx + r} {yv}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<path d="M {cx - r} {yd} A {r} {ry} 0 0 0 {cx + r} {yd}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yd} A {r} {ry} 0 0 1 {cx + r} {yd}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<path d="M {cx - 7.6:.1f} {ya + 15.6:.1f} A 17 17 0 0 0 {cx + 7.6:.1f} {ya + 15.6:.1f}" fill="none" stroke="{RDECA}"/>',
         napis(cx, ya + 32, "50°", 10, RDECA), napis(cx + 26, 66, "13 cm", 11, sidro="start"), napis(cx + r + 6, 148, "10 cm", 11, sidro="start")]
    return svg(200, 200, "".join(t), opis="Telo iz valja in stožca")


b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Iz valja in stožca sestavimo telo na sliki. Stranica stožca meri \(13\) cm, višina valja \(10\) cm, kot pri vrhu osnega preseka stožca pa \(50^\circ\)." + telo()
    + r"2.1. Izračunaj višino telesa. (5 točk)<br>"
    r"2.2. Izračunaj polmer osnovne ploskve valja. (3 točke)<br>"
    r"2.3. Izračunaj površino in prostornino telesa. (7 točk)",
    r"2.1. \(\approx 21{,}78\) cm &nbsp; 2.2. \(\approx 5{,}49\) cm &nbsp; 2.3. \(P \approx 664{,}4\ \mathrm{cm^2}\), \(V \approx 1320{,}7\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("h<sub>s</sub> = 13 · cos 25° ≈ 11,78 cm", "Višina osnega preseka razpolovi kot pri vrhu na 25°.", "kotne"),
        ("!višina telesa: 10 + 11,78 ≈ 21,78 cm", ""),
        "## 2.2",
        ("!r = 13 · sin 25° ≈ 5,49 cm", "Valj in stožec imata isti polmer."),
        "## 2.3",
        ("plašč stožca: π r s ≈ π · 5,494 · 13 ≈ 224,38 cm<sup>2</sup>", "", "telesa"),
        ("plašč valja: 2π r v ≈ 345,20 cm<sup>2</sup>,  osnovna ploskev: π r<sup>2</sup> ≈ 94,83 cm<sup>2</sup>", "Telo ima le eno osnovno ploskev, spodnjo."),
        ("!P ≈ 224,38 + 345,20 + 94,83 ≈ 664,4 cm<sup>2</sup>", ""),
        ("V = π r<sup>2</sup> v + " + U("π r<sup>2</sup> h<sub>s</sub>", "3") + " ≈ 948,27 + 372,42", ""),
        ("!V ≈ 1320,7 cm<sup>3</sup>", ""),
    ],
)

MESECI = ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."]
CENE = ["3,20", "3,20", "2,80", "2,40", "1,80", "1,20", "0,80", "0,80", "1,00", "1,60", "2,40", "2,80"]
KOL = [200, 250, 300, 300, 350, 450, 500, 450, 400, 300, 250, 200]


def crte():
    L, B, H, dx = 45, 185, 160, 22
    t = []
    for k in range(0, 551, 50):
        y = B - k / 550 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 12 * dx + 5}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        if k % 100 == 0:
            t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    pts = " ".join(f"{L + dx * (i + 0.5):.1f},{B - q / 550 * H:.1f}" for i, q in enumerate(KOL))
    t.append(f'<polyline points="{pts}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    for i, q in enumerate(KOL):
        t.append(f'<circle cx="{L + dx * (i + 0.5):.1f}" cy="{B - q / 550 * H:.1f}" r="2.5" fill="{MODRA}"/>')
        t.append(napis(L + dx * (i + 0.5), B + 13, MESECI[i], 8))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 12 * dx + 5}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 14, "količina [kg]", 10, sidro="start"))
    return svg(320, 200, "".join(t), opis="Mesečna prodaja paradižnika")


b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Cena kilograma paradižnika se je v enem letu gibala, kakor prikazuje preglednica (izmišljeni podatki):"
    + tabela(["Mesec"] + MESECI, [["Cena za kg (EUR)"] + CENE])
    + r"3.1. Izračunaj povprečno ceno kilograma paradižnika od januarja do decembra. (3 točke)<br>"
    r"3.2. Za koliko odstotkov je povprečna cena nižja od najvišje cene? (5 točk)<br>"
    r"3.3. Izračunaj iztržek od prodanega paradižnika v celem letu, če mesečno prodajo prikazuje diagram: (7 točk)" + crte(),
    r"3.1. \(2{,}00\) EUR &nbsp; 3.2. \(37{,}5\,\%\) &nbsp; 3.3. \(6970\) EUR",
    [
        "## 3.1",
        ("vsota cen: 24,00 EUR", "", "statistika"),
        ("!povprečje: 24 : 12 = 2,00 EUR", ""),
        "## 3.2",
        ("najvišja cena: 3,20 EUR", ""),
        ("p = " + U("3,20 − 2,00", "3,20") + " · 100 %", "", "odstotki"),
        ("!za 37,5 % nižja", ""),
        "## 3.3",
        ("@slika", tabela(["Mesec"] + MESECI, [["kg"] + [str(q) for q in KOL],
                                                ["EUR"] + ["640", "800", "840", "720", "630", "540", "400", "360", "400", "480", "600", "560"]])),
        (None, "Za vsak mesec pomnožimo količino s ceno, npr. januar: 200 · 3,20 = 640 EUR."),
        ("!skupaj: 6970 EUR", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
