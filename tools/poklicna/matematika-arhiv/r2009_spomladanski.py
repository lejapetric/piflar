# Spomladanski rok 2009 (uradna pola RIC P091-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2009, "spomladanski", "sobota, 6. junij 2009"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"Število \(1155\) razcepi na prafaktorje. Zapiši najmanjše in največje praštevilo, ki deli to število.",
    r"\(1155 = 3 \cdot 5 \cdot 7 \cdot 11\); najmanjše \(3\), največje \(11\)",
    [
        ("1155 : 3 = 385,  385 : 5 = 77,  77 : 7 = 11", "1155 ni sodo; vsota števk je 12, zato je deljivo s 3."),
        ("!1155 = 3 · 5 · 7 · 11", ""),
        ("!najmanjše praštevilo 3, največje 11", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Za \(a = -1\) in \(b = 2\) izračunaj vrednost izraza \((2a + 3b)^2 - 12ab\).",
    r"\(40\)",
    [
        ("2a + 3b = −2 + 6 = 4", ""),
        ("12ab = 12 · (−1) · 2 = −24", ""),
        ("!4<sup>2</sup> − (−24) = 16 + 24 = 40", "Pozor na odštevanje negativnega števila."),
    ],
)

a3 = naloga(
    "A3", "polinomi_racionalna", 4,
    r"Ali je trditev pravilna (DA) ali napačna (NE)?<br>"
    r"a) Polinom \(p(x) = x^3 - 2x + 1\) ima ničlo \(x = 1\).<br>"
    r"b) Graf polinoma \(p(x) = 3x^4 - x^2 + 2x - 4\) seka ordinatno os v točki \(P(0, 4)\).<br>"
    r"c) Racionalna funkcija \(f(x) = \dfrac{x + 1}{3 - x}\) ima pol \(x = 3\).<br>"
    r"d) Abscisna os je vodoravna asimptota funkcije \(f(x) = \dfrac{2x}{x + 1}\).",
    r"a) DA &nbsp; b) NE &nbsp; c) DA &nbsp; d) NE",
    [
        ("!a) p(1) = 1 − 2 + 1 = 0  ⇒  DA", ""),
        ("!b) p(0) = −4, presečišče je (0, −4)  ⇒  NE", ""),
        ("!c) imenovalec 3 − x = 0 pri x = 3, števec tam ni 0  ⇒  DA", "", "racionalna"),
        ("!d) asimptota je y = " + U("2", "1") + " = 2  ⇒  NE", "Števec in imenovalec sta iste stopnje; asimptota je količnik vodilnih koeficientov."),
    ],
)


def trapez_a4():
    A, B, C, D = (20, 120), (220, 120), (170, 25), (70, 25)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 8, C[1] + 2, "C"), napis(D[0] - 8, D[1] + 2, "D"),
         napis(48, 114, "α", 12, RDECA), napis(192, 114, "β", 12, RDECA), napis(162, 44, "γ", 12, RDECA), napis(78, 44, "δ", 12, RDECA),
         napis(42, 70, "b", 12), napis(198, 70, "b", 12)]
    return svg(245, 140, "".join(t), opis="Enakokraki trapez ABCD")


a4 = naloga(
    "A4", "geometrija_ravnine", 4,
    r"V enakokrakem trapezu \(ABCD\) meri kot \(\alpha = 64^\circ\). Nariši skico trapeza, označi vse notranje kote in izračunaj njihove velikosti.",
    r"\(\alpha = \beta = 64^\circ\), \(\gamma = \delta = 116^\circ\)",
    [
        ("@slika", trapez_a4()),
        ("!β = α = 64°", "Kota ob osnovnici enakokrakega trapeza sta enaka."),
        ("!δ = 180° − 64° = 116°,  γ = δ = 116°", "Kota ob istem kraku sta suplementarna."),
    ],
)


def kosinus(X, Y):
    t = krivulja(X, Y, math.cos, -math.pi, 3 * math.pi, MODRA)
    t += f'<circle cx="{X(-math.pi):.1f}" cy="{Y(-1):.1f}" r="3" fill="none" stroke="{MODRA}"/>'
    t += f'<circle cx="{X(3 * math.pi):.1f}" cy="{Y(-1):.1f}" r="3" fill="none" stroke="{MODRA}"/>'
    for k, s in [(-1, "−π"), (1, "π"), (2, "2π"), (3, "3π")]:
        x = k * math.pi
        t += f'<line x1="{X(x):.1f}" y1="{Y(0) - 3:.1f}" x2="{X(x):.1f}" y2="{Y(0) + 3:.1f}" stroke="currentColor"/>' + napis(X(x), Y(0) - 6, s, 10)
    t += napis(X(0) - 5, Y(1) + 4, "1", 10, sidro="end") + napis(X(0) - 5, Y(-1) + 4, "−1", 10, sidro="end")
    return t


a5 = naloga(
    "A5", "kotne_funkcije_pm", 4,
    r"Nariši graf funkcije \(f(x) = \cos x\) na intervalu \((-\pi, 3\pi)\). Zapiši definicijsko območje in zalogo vrednosti funkcije na tem intervalu.",
    r"\(D_f = (-\pi, 3\pi)\), \(Z_f = [-1, 1]\)",
    [
        ("@slika", mreza((-3.6, 10), (-1.6, 1.6), kosinus, sirina=360, visina=130, oznake=False)),
        ("!D<sub>f</sub> = (−π, 3π)", "", "D_v"),
        ("!Z<sub>f</sub> = [−1, 1]", "Vrednost 1 doseže pri 0 in 2π, vrednost −1 pri π; robni točki −π in 3π nista vključeni."),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 5,
    r"Tone je za \(2\) kg banan in \(1\) kg mandarin plačal \(4{,}90\) EUR, Jože pa je v isti trgovini za \(1\) kg banan in \(3\) kg mandarin plačal \(6{,}20\) EUR. Koliko stane kilogram banan in koliko kilogram mandarin?",
    r"banane \(1{,}70\) EUR/kg, mandarine \(1{,}50\) EUR/kg",
    [
        ("2b + m = 4,90,  b + 3m = 6,20", "b je cena kilograma banan, m cena kilograma mandarin.", "sistem"),
        ("m = 4,90 − 2b  ⇒  b + 14,70 − 6b = 6,20", "Iz prve enačbe izrazimo m in vstavimo v drugo."),
        ("!b = 1,70 EUR", ""),
        ("!m = 4,90 − 3,40 = 1,50 EUR", ""),
    ],
)

a7 = naloga(
    "A7", "eksponentna_logaritemska", 5,
    r"Reši enačbi: a) \(\sqrt{2x - 1} = 3\) &nbsp; b) \(5^{x + 1} = 1\).",
    r"a) \(x = 5\) &nbsp; b) \(x = -1\)",
    [
        "## a)",
        ("2x − 1 = 9", "Kvadriramo obe strani."),
        ("!x = 5", "Preizkus: √9 = 3."),
        "## b)",
        ("5<sup>x + 1</sup> = 5<sup>0</sup>  ⇒  x + 1 = 0", "", "eksponentna"),
        ("!x = −1", ""),
    ],
)

a8 = naloga(
    "A8", "ulomki_odstotki", 5,
    r"Vrt ima obliko pravokotnika z dolžino \(12\) m in širino \(8\) m. Lastnik bo vrt po dolžini povečal za \(25\,\%\), po širini pa zmanjšal za \(10\,\%\). Za koliko kvadratnih metrov se bo spremenila ploščina vrta?",
    r"poveča se za \(12\ \mathrm{m^2}\)",
    [
        ("S<sub>1</sub> = 12 · 8 = 96 m<sup>2</sup>", "", "ploscine"),
        ("nova dolžina 1,25 · 12 = 15 m,  nova širina 0,9 · 8 = 7,2 m", "", "odstotki"),
        ("S<sub>2</sub> = 15 · 7,2 = 108 m<sup>2</sup>", ""),
        ("!ploščina se poveča za 12 m<sup>2</sup>", ""),
    ],
)


def zaporedje(X, Y):
    t = ""
    for n in range(1, 5):
        t += tocka(X, Y, n, 16 * 0.5 ** n - 2, f"a{'₁₂₃₄'[n - 1]}", 6, -4)
    return t


a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Dan je splošni člen zaporedja \(a_n = 16 \cdot \left(\frac{1}{2}\right)^n - 2\). Izračunaj prve štiri člene in nariši graf zaporedja.",
    r"\(6, 2, 0, -1\)",
    [
        ("a<sub>1</sub> = 16 · " + U("1", "2") + " − 2 = 6", ""),
        ("a<sub>2</sub> = 16 · " + U("1", "4") + " − 2 = 2", ""),
        ("a<sub>3</sub> = 16 · " + U("1", "8") + " − 2 = 0,  a<sub>4</sub> = 16 · " + U("1", "16") + " − 2 = −1", ""),
        ("!6, 2, 0, −1", ""),
        ("@slika", mreza((-1, 6), (-2, 7), zaporedje, sirina=220)),
        (None, "Graf zaporedja so posamezne točke (n, aₙ), ki jih ne povežemo."),
    ],
)

# ------------------------------------------------------------------ 2. del
OCENE = [("nezadostno", 5), ("zadostno", 20), ("dobro", 35), ("prav dobro", 25), ("odlično", 15)]


def torta():
    t, z = [], -90
    barve = [RDECA, "#C98A0B", "#1E9E5A", MODRA, "#7A4FC9"]
    for (n, p), b in zip(OCENE, barve):
        k = 3.6 * p
        a0, a1 = math.radians(z), math.radians(z + k)
        t.append(f'<path d="M 90 90 L {90 + 70 * math.cos(a0):.1f} {90 + 70 * math.sin(a0):.1f} A 70 70 0 0 1 {90 + 70 * math.cos(a1):.1f} {90 + 70 * math.sin(a1):.1f} Z" '
                 f'fill="{b}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        am = math.radians(z + k / 2)
        t.append(napis(90 + 50 * math.cos(am), 94 + 50 * math.sin(am), f"{p} %", 10))
        z += k
    leg = "".join(f'<rect x="185" y="{20 + 22 * i}" width="10" height="10" fill="{b}" fill-opacity="0.6"/>' + napis(200, 29 + 22 * i, n, 11, sidro="start")
                  for i, ((n, _), b) in enumerate(zip(OCENE, barve)))
    return svg(290, 180, "".join(t) + leg, opis="Ocene pri matematiki")


b1 = naloga(
    "B1", "statistika_pm", 15,
    r"Na šoli je \(400\) dijakov. Strukturni krog prikazuje njihove ocene pri matematiki (izmišljeni podatki)." + torta()
    + r"1.1. Zapiši frekvence (število dijakov) za vsako oceno v preglednico. (5 točk)<br>"
    r"1.2. Izračunaj povprečno oceno pri matematiki na tej šoli. (4 točke)<br>"
    r"1.3. Izračunaj središčne kote, ki pripadajo posameznim ocenam v strukturnem krogu. (6 točk)",
    r"1.1. \(20, 80, 140, 100, 60\) &nbsp; 1.2. \(3{,}25\) &nbsp; 1.3. \(18^\circ, 72^\circ, 126^\circ, 90^\circ, 54^\circ\)",
    [
        "## 1.1",
        ("nezadostno: 0,05 · 400 = 20", "", "odstotki"),
        ("@slika", tabela(["ocena", "nzd (1)", "zd (2)", "db (3)", "pdb (4)", "odl (5)"], [["število dijakov", "20", "80", "140", "100", "60"]])),
        "## 1.2",
        ("x̄ = " + U("1 · 20 + 2 · 80 + 3 · 140 + 4 · 100 + 5 · 60", "400") + " = " + U("1300", "400"), "", "statistika"),
        ("!x̄ = 3,25", ""),
        "## 1.3",
        ("kot = delež · 360°, npr. 0,05 · 360° = 18°", ""),
        ("@slika", tabela(["ocena", "nzd", "zd", "db", "pdb", "odl"], [["središčni kot", "18°", "72°", "126°", "90°", "54°"]])),
        (None, "Preverimo: 18° + 72° + 126° + 90° + 54° = 360°."),
    ],
)

PB = lambda x: x * x - 4 * x + 5
LB = lambda x: 2 * x - 3


def risba_b2(X, Y):
    t = krivulja(X, Y, PB, -0.8, 4.8, MODRA) + krivulja(X, Y, LB, -0.5, 6, RDECA)
    t += tocka(X, Y, 2, 1, "A", 6, 12) + tocka(X, Y, 4, 5, "B", -16, -4)
    t += napis(X(-0.5), Y(8.3), "p", 12, MODRA) + napis(X(5.6), Y(7.2), "q", 12, RDECA)
    return t


b2 = naloga(
    "B2", "kvadratna_funkcija", 15,
    r"Dani sta parabola \(y = x^2 - 4x + 5\) in premica \(y = 2x - 3\).<br>"
    r"2.1. Izračunaj koordinate presečišč parabole in premice. (5 točk)<br>"
    r"2.2. Parabolo in premico natančno nariši v isti koordinatni sistem. (6 točk)<br>"
    r"2.3. Izračunaj kot, ki ga premica oklepa z abscisno osjo, v stopinjah in minutah. (4 točke)",
    r"2.1. \(A(2, 1)\), \(B(4, 5)\) &nbsp; 2.3. \(\varphi \approx 63^\circ 26'\)",
    [
        "## 2.1",
        ("x<sup>2</sup> − 4x + 5 = 2x − 3  ⇒  x<sup>2</sup> − 6x + 8 = 0", "", "kvadratna"),
        ("(x − 2)(x − 4) = 0", ""),
        ("!A(2, 1),  B(4, 5)", "Ordinati izračunamo iz enačbe premice."),
        "## 2.2",
        ("teme parabole T(2, 1),  presečišče z osjo y (0, 5)", "Premica se parabole v A ne dotika, temveč jo seka; A je hkrati teme.", "teme"),
        ("@slika", mreza((-1, 7), (-4, 9), risba_b2, sirina=260)),
        "## 2.3",
        ("tan φ = 2", "", "premica"),
        ("!φ ≈ 63,43° = 63° 26′", ""),
    ],
)

b3 = naloga(
    "B3", "povrsine_prostornine", 15,
    r"List papirja ima obliko pravokotnika z dolžino \(40\) cm in širino \(25\) cm.<br>"
    r"3.1. List zvijemo v plašč valja tako, da je krajša stranica višina valja. Izračunaj površino tako nastalega valja. (6 točk)<br>"
    r"3.2. List naj bo plašč pravilne štiristrane prizme z višino, enako krajši stranici. Izračunaj površino prizme. (6 točk)<br>"
    r"3.3. Za koliko odstotkov je površina valja večja od površine prizme? (3 točke)",
    r"3.1. \(\approx 1254{,}65\ \mathrm{cm^2}\) &nbsp; 3.2. \(1200\ \mathrm{cm^2}\) &nbsp; 3.3. \(\approx 4{,}55\,\%\)",
    [
        "## 3.1",
        ("2πr = 40 cm  ⇒  r = " + U("20", "π") + " ≈ 6,37 cm", "Dolžina lista je obseg osnovne ploskve.", "krog"),
        ("pl = 40 · 25 = 1000 cm<sup>2</sup>,  2 · πr<sup>2</sup> = " + U("800", "π") + " ≈ 254,65 cm<sup>2</sup>", "", "telesa"),
        ("!P ≈ 1254,65 cm<sup>2</sup>", ""),
        "## 3.2",
        ("4a = 40 cm  ⇒  a = 10 cm", "Obseg osnovne ploskve je spet 40 cm."),
        ("!P = 2a<sup>2</sup> + pl = 200 + 1000 = 1200 cm<sup>2</sup>", ""),
        "## 3.3",
        (U("1254,65 − 1200", "1200") + " · 100 %", "", "odstotki"),
        ("!≈ 4,55 % večja", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
