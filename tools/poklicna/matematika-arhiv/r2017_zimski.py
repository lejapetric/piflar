# Zimski rok 2017 (uradna pola RIC P173-C101-1-1, izpit 5. februarja 2018)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2017, "zimski", "ponedeljek, 5. februar 2018"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Brez računala natančno izračunaj vrednost izraza \(\left(4\frac{2}{5} - 2\right) : (1{,}5 + 6 \cdot 0{,}4)\). Rezultat zapiši kot ulomek.",
    r"\(\frac{8}{13}\)",
    [
        ("4" + U("2", "5") + " − 2 = 2" + U("2", "5") + " = 2,4", ""),
        ("1,5 + 6 · 0,4 = 1,5 + 2,4 = 3,9", "Najprej množenje."),
        ("2,4 : 3,9 = " + U("24", "39"), ""),
        ("!= " + U("8", "13"), "Okrajšamo s 3."),
    ],
)


def premica_a2():
    L, R, y0 = 20, 300, 40
    X = lambda x: L + (x + 1) / 8 * (R - L)
    t = [f'<line x1="{L - 5}" y1="{y0}" x2="{R + 5}" y2="{y0}" stroke="currentColor" stroke-width="1.5"/>']
    for i in range(-1, 8):
        t.append(f'<line x1="{X(i):.1f}" y1="{y0 - 4}" x2="{X(i):.1f}" y2="{y0 + 4}" stroke="currentColor"/>' + napis(X(i), y0 + 18, str(i).replace("-", "−"), 10))
    t.append(f'<line x1="{X(4.5):.1f}" y1="{y0}" x2="{R + 5}" y2="{y0}" stroke="{MODRA}" stroke-width="4"/>')
    t.append(f'<circle cx="{X(4.5):.1f}" cy="{y0}" r="5" fill="{MODRA}"/>' + napis(X(4.5), y0 - 10, "4,5", 11, MODRA))
    return svg(320, 70, "".join(t), opis="Rešitev neenačbe na številski premici")

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Reši neenačbo \(2x - (5 - x) \ge 4 + x\) in rešitev prikaži na številski premici.",
    r"\(x \ge \frac{9}{2}\)",
    [
        ("2x − 5 + x ≥ 4 + x  ⇒  2x ≥ 9", ""),
        ("!x ≥ 4,5", ""),
        ("@slika", premica_a2()),
        (None, "Polni krožec pomeni, da 4,5 spada k rešitvi."),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Zapiši enačbo premice, ki poteka skozi točko \(T(2, -1)\) in ima smerni koeficient \(k = \frac{3}{2}\). Premico nariši.",
    r"\(y = \frac{3}{2}x - 4\)",
    [
        ("y + 1 = " + U("3", "2") + "(x − 2)", "", "premica"),
        ("!y = " + U("3", "2") + "x − 4", ""),
        ("@slika", graf([(lambda x: 1.5 * x - 4, MODRA)], (-2, 6), (-5, 5), [(2, -1, "T"), (0, -4, "")], sirina=260, visina=300)),
    ],
)


def krog_a4():
    cx, cy, r = 110, 110, 85
    a1, a2 = math.radians(135), math.radians(150)
    t = [f'<line x1="10" y1="{cy}" x2="210" y2="{cy}" stroke="currentColor"/>', f'<line x1="{cx}" y1="10" x2="{cx}" y2="210" stroke="currentColor"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-opacity="0.6"/>',
         f'<line x1="{cx}" y1="{cy}" x2="{cx + r * math.cos(a1):.1f}" y2="{cy - r * math.sin(a1):.1f}" stroke="{MODRA}" stroke-width="2"/>',
         f'<line x1="{cx}" y1="{cy}" x2="{cx + r * math.cos(a2):.1f}" y2="{cy - r * math.sin(a2):.1f}" stroke="{RDECA}" stroke-width="2"/>',
         f'<line x1="{cx + r * math.cos(a1):.1f}" y1="{cy - r * math.sin(a1):.1f}" x2="{cx}" y2="{cy - r * math.sin(a1):.1f}" stroke="{MODRA}" stroke-dasharray="3 3"/>',
         f'<line x1="{cx + r * math.cos(a2):.1f}" y1="{cy - r * math.sin(a2):.1f}" x2="{cx + r * math.cos(a2):.1f}" y2="{cy}" stroke="{RDECA}" stroke-dasharray="3 3"/>',
         f'<line x1="{cx - 4}" y1="{cy - r * math.sin(a1):.1f}" x2="{cx + 4}" y2="{cy - r * math.sin(a1):.1f}" stroke="{MODRA}" stroke-width="3"/>',
         f'<line x1="{cx + r * math.cos(a2):.1f}" y1="{cy - 4}" x2="{cx + r * math.cos(a2):.1f}" y2="{cy + 4}" stroke="{RDECA}" stroke-width="3"/>',
         napis(cx + 6, cy - r * math.sin(a1) + 4, "sin 135°", 10, MODRA, "start"), napis(cx + r * math.cos(a2) + 4, cy - 8, "cos 150°", 10, RDECA, "start"),
         napis(cx + r + 4, cy + 14, "1", 10), napis(cx - r - 4, cy + 14, "−1", 10), napis(cx + 8, cy - r - 2, "1", 10)]
    return svg(220, 220, "".join(t), opis="Enotska krožnica s kotoma 135° in 150°")

a4 = naloga(
    "A4", "kotne_funkcije_pm", 4,
    r"Izračunaj natančni vrednosti \(\sin 135^\circ\) in \(\cos 150^\circ\) ter ju označi na koordinatnih oseh enotske krožnice.",
    r"\(\sin 135^\circ = \frac{\sqrt{2}}{2}\), \(\cos 150^\circ = -\frac{\sqrt{3}}{2}\)",
    [
        ("!sin 135° = sin(180° − 45°) = sin 45° = " + U(K("2"), "2"), "Sinus je v 2. kvadrantu pozitiven."),
        ("!cos 150° = −cos 30° = −" + U(K("3"), "2"), "Kosinus je v 2. kvadrantu negativen."),
        ("@slika", krog_a4()),
        (None, "Sinus je ordinata, kosinus abscisa točke na enotski krožnici."),
    ],
)


def koti_a5():
    A, B = (90, 120), (190, 120)
    al, be = math.radians(61 + 20 / 60), math.radians(51 + 10 / 60)
    # C: presečišče poltrakov iz A (kot α) in iz B (kot β)
    c = 100 * math.sin(be) / math.sin(math.pi - al - be)
    C = (A[0] + c * math.cos(al), A[1] - c * math.sin(al))
    D = (B[0] + (B[0] - C[0]) * 0.45, B[1] + (B[1] - C[1]) * 0.45)
    t = [f'<line x1="10" y1="120" x2="290" y2="120" stroke="currentColor"/>', f'<line x1="10" y1="{D[1]:.1f}" x2="290" y2="{D[1]:.1f}" stroke="currentColor"/>',
         f'<polyline points="{A[0]},{A[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         napis(A[0] - 6, A[1] + 14, "A", 12), napis(B[0] - 10, B[1] - 6, "B", 12), napis(C[0], C[1] - 6, "C", 12),
         napis(D[0] - 6, D[1] + 14, "D", 12), napis(D[0] + 60, D[1] + 14, "E", 12),
         napis(A[0] - 40, A[1] - 6, "118°40'", 11), napis(D[0] + 40, D[1] - 6, "128°50'", 11), napis(C[0], C[1] + 22, "φ", 13)]
    return svg(300, 175, "".join(t), opis="Kota ob vzporednicah")

a5 = naloga(
    "A5", "geometrija_ravnine", 4,
    r"Izračunaj velikost kota \(\varphi\) pri oglišču \(C\) na sliki, če je \(AB \parallel DE\). Kot \(118^\circ 40'\) je zunanji kot pri \(A\) "
    r"(med premico \(AB\) levo od \(A\) in daljico \(AC\)), kot \(128^\circ 50'\) pa kot \(BDE\) (točke \(C\), \(B\), \(D\) so kolinearne)." + koti_a5(),
    r"\(\varphi = 67^\circ 30'\)",
    [
        ("α = 180° − 118°40' = 61°20'", "Sokota."),
        ("∢ABD = ∢BDE = 128°50'", "Izmenična kota ob vzporednicah AB in DE."),
        ("β = ∢ABC = 180° − 128°50' = 51°10'", "C, B, D ležijo na premici."),
        ("!φ = 180° − 61°20' − 51°10' = 67°30'", "Vsota kotov v trikotniku."),
    ],
)

a6 = naloga(
    "A6", "izrazi_potence", 4,
    r"Razstavi izraza \(x^2 - 49\) in \(x^2 - 7x + 10\).",
    r"\((x - 7)(x + 7)\); \((x - 2)(x - 5)\)",
    [
        ("!x<sup>2</sup> − 49 = (x − 7)(x + 7)", "Razlika kvadratov."),
        ("!x<sup>2</sup> − 7x + 10 = (x − 2)(x − 5)", "Iščemo števili s produktom 10 in vsoto −7.", "vieta"),
    ],
)

a7 = naloga(
    "A7", "kombinatorika_verjetnost", 4,
    r"Nejc sestavlja petmestno kodo iz števk \(0\)–\(9\) za ključavnico. Koliko različnih kod lahko sestavi, če se števke lahko ponavljajo, in "
    r"koliko, če se ne smejo ponavljati?",
    r"\(100\,000\); \(30\,240\)",
    [
        ("!s ponavljanjem: 10<sup>5</sup> = 100 000", "Za vsako mesto 10 možnosti.", "kombinatorika"),
        ("!brez ponavljanja: V<sub>10</sub><sup>5</sup> = 10 · 9 · 8 · 7 · 6 = 30 240", "Variacije brez ponavljanja."),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Izračunaj vrednosti \(x\), za katere velja \(\log_2\left(x^2 - 3x + 4\right) = 1\).",
    r"\(x_1 = 1\), \(x_2 = 2\)",
    [
        ("x<sup>2</sup> − 3x + 4 = 2<sup>1</sup>", "", "logaritem"),
        ("x<sup>2</sup> − 3x + 2 = 0  ⇒  (x − 1)(x − 2) = 0", ""),
        ("!x<sub>1</sub> = 1,  x<sub>2</sub> = 2", "Pri obeh je logaritmand 2 > 0."),
    ],
)

a9 = naloga(
    "A9", "obsegi_ploscine", 5,
    r"Kvadratu s stranico \(a = 10\) cm je včrtan krog. Izračunaj ploščino osenčenega dela kvadrata (del kvadrata zunaj kroga)."
    + svg(160, 160, f'<path d="M 10 10 H 150 V 150 H 10 Z M 80 10 A 70 70 0 1 0 80 150 A 70 70 0 1 0 80 10 Z" fill="{MODRA}" fill-opacity="0.35" '
                    f'fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>', opis="Kvadrat z včrtanim krogom"),
    r"\(S = 100 - 25\pi \approx 21{,}46\ \mathrm{cm^2}\)",
    [
        ("r = " + U("a", "2") + " = 5 cm", "Premer včrtanega kroga je stranica kvadrata."),
        ("S = a<sup>2</sup> − πr<sup>2</sup> = 100 − 25π", "", "krog"),
        ("!S ≈ 21,46 cm<sup>2</sup>", ""),
    ],
)

a10 = naloga(
    "A10", "odvod_pm", 6,
    r"Dani sta funkciji \(f(x) = 3x^3 + 2x^2 - 4x + 5\) in \(g(x) = \dfrac{x + 3}{x - 1}\). Izračunaj odvoda funkcij \(f\) in \(g\) ter \(f'(0)\) in \(g'(0)\).",
    r"\(f'(x) = 9x^2 + 4x - 4\), \(g'(x) = -\frac{4}{(x - 1)^2}\), \(f'(0) = g'(0) = -4\)",
    [
        ("!f '(x) = 9x<sup>2</sup> + 4x − 4", "", "odvod"),
        ("!g '(x) = " + U("(x − 1) − (x + 3)", "(x − 1)<sup>2</sup>") + " = −" + U("4", "(x − 1)<sup>2</sup>"), "Odvod kvocienta."),
        ("!f '(0) = −4,  g '(0) = −4", ""),
    ],
)

a11 = naloga(
    "A11", "zaporedja_pm", 6,
    r"Tim plava v bazenu, dolgem \(50\) m. Preplaval ga je štirikrat: prvič v \(40\) s, nato vsakič \(2\) s počasneje. V kolikšnem času je "
    r"preplaval \(200\) m? V kolikšnem času bi preplaval \(1000\) m, če bi vsako dolžino plaval \(2\) s počasneje kot prejšnjo?",
    r"\(172\) s \(= 2\) min \(52\) s; \(1180\) s \(= 19\) min \(40\) s",
    [
        ("40, 42, 44, 46: aritmetično zaporedje z a<sub>1</sub> = 40, d = 2", "", "aritmeticno"),
        ("!s<sub>4</sub> = 172 s = 2 min 52 s", ""),
        ("1000 m = 20 dolžin", ""),
        ("s<sub>20</sub> = " + U("20", "2") + " · (2 · 40 + 19 · 2) = 10 · 118", ""),
        ("!s<sub>20</sub> = 1180 s = 19 min 40 s", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "kvadratna_funkcija", 10,
    r"Dana je funkcija \(f(x) = -x^2 + 4x + 5\).<br>1.1. Izračunaj ničli, začetno vrednost in teme. (5 točk)<br>"
    r"1.2. Nariši graf funkcije in zapiši njeno definicijsko območje in zalogo vrednosti. (5 točk)",
    r"1.1. \(x_1 = -1\), \(x_2 = 5\), \(f(0) = 5\), \(T(2, 9)\) &nbsp; 1.2. \(D_f = \mathbb{R}\), \(Z_f = (-\infty, 9]\)",
    [
        "## 1.1",
        ("−(x<sup>2</sup> − 4x − 5) = −(x − 5)(x + 1) = 0", "", "vieta"),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = 5,  f(0) = 5", ""),
        ("p = −" + U("4", "−2") + " = 2,  q = f(2) = −4 + 8 + 5 = 9", "", "teme"),
        ("!T(2, 9)", ""),
        "## 1.2",
        ("@slika", graf([(lambda x: -x * x + 4 * x + 5, MODRA)], (-3, 7), (-4, 10), [(-1, 0, ""), (5, 0, ""), (2, 9, "T"), (0, 5, "")], sirina=280, visina=340)),
        ("!D<sub>f</sub> = ℝ,  Z<sub>f</sub> = (−∞, 9]", "Parabola je odprta navzdol; največja vrednost je q = 9."),
    ],
)


def stozec():
    t = [f'<ellipse cx="100" cy="150" rx="70" ry="16" fill="none" stroke="currentColor"/>',
         f'<polygon points="30,150 100,20 170,150" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="100" y1="20" x2="100" y2="150" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         f'<line x1="30" y1="150" x2="170" y2="150" stroke="{MODRA}" stroke-width="2"/>',
         napis(108, 95, "v = 12 cm", 11, RDECA, "start"), napis(100, 182, "2r = 10 cm", 11, MODRA), napis(150, 80, "s", 12)]
    return svg(220, 190, "".join(t), opis="Skica stožca")

b2 = naloga(
    "B2", "povrsine_prostornine", 10,
    r"Dan je pokončni stožec s premerom osnovne ploskve \(10\) cm in višino \(12\) cm.<br>"
    r"2.1. Nariši skico stožca in na njej označi premer in višino. (2 točki)<br>"
    r"2.2. Izračunaj površino in prostornino stožca. Prostornino izrazi v dm³. (8 točk)",
    r"2.2. \(P = 90\pi \approx 282{,}74\ \mathrm{cm^2}\), \(V = 100\pi\ \mathrm{cm^3} \approx 0{,}314\ \mathrm{dm^3}\)",
    [
        "## 2.1", ("@slika", stozec()),
        "## 2.2",
        ("r = 5 cm,  s = " + K("5<sup>2</sup> + 12<sup>2</sup>") + " = 13 cm", "Stranica stožca iz pravokotnega trikotnika.", "pitagora"),
        ("!P = π · 5<sup>2</sup> + π · 5 · 13 = 90π ≈ 282,74 cm<sup>2</sup>", "", "telesa"),
        ("V = " + U("1", "3") + " · π · 25 · 12 = 100π ≈ 314,16 cm<sup>3</sup>", ""),
        ("!V ≈ 0,314 dm<sup>3</sup>", "1 dm³ = 1000 cm³."),
    ],
)

VISINE = [158, 172, 176, 165, 161, 170, 169, 165, 174, 179, 181, 163, 159, 168, 162, 165, 171, 177, 166, 173]
RAZREDI = [("nad 155 do 160", 2), ("nad 160 do 165", 6), ("nad 165 do 170", 4), ("nad 170 do 175", 4), ("nad 175 do 180", 3), ("nad 180 do 185", 1)]


def stolpci_b3():
    H = 190
    t = []
    for i, (ime, f) in enumerate(RAZREDI):
        x = 30 + i * 42
        t.append(f'<rect x="{x}" y="{H - 30 - f * 22}" width="42" height="{f * 22}" fill="{MODRA}" fill-opacity="0.7" stroke="currentColor" stroke-width="0.6"/>'
                 + napis(x + 21, H - 34 - f * 22, str(f), 10) + napis(x, H - 16, str(155 + 5 * i), 9))
    t.append(napis(30 + 6 * 42, H - 16, "185", 9) + napis(160, H - 2, "telesna višina [cm]", 10))
    return svg(310, H + 4, "".join(t), opis="Stolpčni diagram telesnih višin")

b3 = naloga(
    "B3", "statistika_pm", 10,
    r"V razredu so izmerili telesne višine dijakov v centimetrih:"
    + tabela([""] * 10, [[str(v) for v in VISINE[:10]], [str(v) for v in VISINE[10:]]])
    + r"3.1. Izračunaj aritmetično sredino, mediano in modus. (5 točk)<br>"
    r"3.2. Podatke razvrsti v razrede in nariši stolpčni diagram."
    + tabela(["j", "telesna višina [cm]", r"\(f_j\)"], [[str(i + 1), ime, ""] for i, (ime, _) in enumerate(RAZREDI)]) + "(5 točk)",
    r"3.1. \(\bar{x} = 168{,}7\) cm, \(Me = 168{,}5\) cm, \(Mo = 165\) cm &nbsp; 3.2. \(f_j\): \(2, 6, 4, 4, 3, 1\)",
    [
        "## 3.1",
        ("!x̄ = " + U("3374", "20") + " = 168,7 cm", "", "statistika"),
        ("urejeno: 158, 159, 161, 162, 163, 165, 165, 165, 166, 168, 169, 170, …", ""),
        ("!Me = " + U("168 + 169", "2") + " = 168,5 cm", "Povprečje 10. in 11. podatka."),
        ("!Mo = 165 cm", "Pojavi se trikrat."),
        "## 3.2",
        ("!frekvence: 2, 6, 4, 4, 3, 1", "»Nad 160 do 165« pomeni 160 < x ≤ 165."),
        ("@slika", stolpci_b3()),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
