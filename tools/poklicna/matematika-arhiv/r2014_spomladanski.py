# Spomladanski rok 2014 (uradna pola RIC P141-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2014, "spomladanski", "sobota, 7. junij 2014"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Brez uporabe računala izračunaj: \((-3)^2 - 2 \cdot (4 - 7) + 5^0 - \left(\frac{1}{2}\right)^{-2}\).",
    r"\(12\)",
    [
        ("(−3)<sup>2</sup> = 9,  −2 · (−3) = 6,  5<sup>0</sup> = 1", "", "potence"),
        ("(" + U("1", "2") + ")<sup>−2</sup> = 2<sup>2</sup> = 4", "Negativni eksponent obrne ulomek."),
        ("!9 + 6 + 1 − 4 = 12", ""),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Zapiši enačbo premice, ki poteka skozi točko \(A(2, 0)\) in je vzporedna premici na sliki."
    + graf([(lambda x: 1.5 * x + 3, "currentColor")], (-4, 4), (-3, 5), [(2, 0, "A"), (-2, 0, ""), (0, 3, "")], sirina=260, visina=260),
    r"\(y = \frac{3}{2}x - 3\)",
    [
        ("Premica na sliki gre skozi (−2, 0) in (0, 3)  ⇒  k = " + U("3", "2"), "Odčitamo s slike.", "premica"),
        ("vzporednica: k = " + U("3", "2"), "Vzporedni premici imata enak smerni koeficient."),
        ("y − 0 = " + U("3", "2") + "(x − 2)", ""),
        ("!y = " + U("3", "2") + "x − 3", ""),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Izračunaj, katera naravna števila rešijo neenačbo \(3(x - 1) - 2(x + 4) + x \le 0\).",
    r"\(x \in \{1, 2, 3, 4, 5\}\)",
    [
        ("3x − 3 − 2x − 8 + x ≤ 0", "Odpravimo oklepaje.", "neenacba"),
        ("2x − 11 ≤ 0  ⇒  x ≤ 5,5", ""),
        ("!x ∈ {1, 2, 3, 4, 5}", "Naravna števila, manjša od 5,5."),
    ],
)

a4 = naloga(
    "A4", "kombinatorika_verjetnost", 4,
    r"V šolski košarkarski ekipi je \(14\) igralcev, vsak lahko igra na katerem koli mestu. Na koliko načinov lahko trener izbere začetno peterko?",
    r"\(2002\)",
    [
        ("C<sub>5</sub><sup>14</sup> = " + U("14 · 13 · 12 · 11 · 10", "5 · 4 · 3 · 2 · 1"), "Vrstni red izbranih ni pomemben.", "kombinatorika"),
        ("!= 2002", ""),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Na volišču je registriranih \(2400\) volilnih upravičencev. Volilna udeležba je bila \(62{,}5\,\%\). Oddanih je bilo \(24\) neveljavnih glasovnic. "
    r"Koliko veljavnih glasovnic je bilo oddanih?",
    r"\(1476\)",
    [
        ("0,625 · 2400 = 1500 volivcev", "", "odstotki"),
        ("!1500 − 24 = 1476 veljavnih glasovnic", ""),
    ],
)

a6 = naloga(
    "A6", "kotne_funkcije_pm", 5,
    r"Narisan je graf funkcije \(f(x) = \cos x\) na intervalu \([0, 2\pi]\)."
    + graf([(math.cos, MODRA)], (0, 2 * math.pi), (-1.5, 1.5), [(math.pi / 2, 0, "π/2"), (math.pi, -1, "π"), (3 * math.pi / 2, 0, "3π/2"), (2 * math.pi, 1, "2π")], sirina=320, visina=150)
    + r"Za dani interval zapiši ničle funkcije, zalogo vrednosti, interval naraščanja in vrednosti \(x\), za katere je \(f(x) = 1\).",
    r"ničli \(\frac{\pi}{2}, \frac{3\pi}{2}\); \(Z_f = [-1, 1]\); narašča na \([\pi, 2\pi]\); \(x = 0\) in \(x = 2\pi\)",
    [
        ("!ničli: x = " + U("π", "2") + ",  x = " + U("3π", "2"), "", "kotne"),
        ("!Z<sub>f</sub> = [−1, 1]", ""),
        ("!narašča na [π, 2π]", "Od minimuma pri π do maksimuma pri 2π."),
        ("!f(x) = 1 za x = 0 in x = 2π", ""),
    ],
)

a7 = naloga(
    "A7", "zaporedja_pm", 5,
    r"Izračunaj \(x\) tako, da bodo \(x\), \(x + 4\), \(3x + 4\) tvorili naraščajoče geometrijsko zaporedje.",
    r"\(x = 4\) (zaporedje \(4, 8, 16\))",
    [
        ("(x + 4)<sup>2</sup> = x(3x + 4)", "Kvadrat srednjega člena je produkt sosednjih.", "geometrijsko"),
        ("x<sup>2</sup> + 8x + 16 = 3x<sup>2</sup> + 4x  ⇒  x<sup>2</sup> − 2x − 8 = 0", ""),
        ("(x − 4)(x + 2) = 0", "", "kvadratna"),
        ("!x = 4", "Za x = −2 dobimo −2, 2, −2, kar ni naraščajoče; za x = 4 pa 4, 8, 16."),
    ],
)

a8 = naloga(
    "A8", "polinomi_racionalna", 5,
    r"Skiciraj graf racionalne funkcije \(f(x) = \dfrac{x - 3}{x + 1}\).",
    r"Ničla \(3\), pol \(-1\), asimptota \(y = 1\), \(f(0) = -3\)",
    [
        ("ničla x = 3,  pol x = −1", "", "racionalna"),
        ("vodoravna asimptota y = 1,  f(0) = −3", ""),
        ("@slika", graf([(lambda x: (x - 3) / (x + 1), MODRA), (lambda x: 1, RDECA)], (-7, 6), (-7, 7), [(3, 0, ""), (0, -3, "")], sirina=300, visina=320)),
        ("!Graf ima dve veji ob navpični asimptoti x = −1.", ""),
    ],
)


def trikotnik_a9():
    A, B = (25, 160), (145, 160)
    a, b = math.radians(48), math.radians(67)
    # presečišče krakov iz A (kot 48°) in B (kot 67°)
    t_ = (B[0] - A[0]) * math.sin(b) / math.sin(a + b)
    C = (A[0] + t_ * math.cos(a), A[1] - t_ * math.sin(a))
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{B[0] + 50}" y2="{B[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<path d="M {B[0] + 22} {B[1]} A 22 22 0 0 0 {B[0] - 22 * math.cos(b):.1f} {B[1] - 22 * math.sin(b):.1f}" fill="none" stroke="{RDECA}"/>',
         napis(B[0] + 20, B[1] - 20, "β'", 12, RDECA),
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0], B[1] + 14, "B"), napis(C[0], C[1] - 7, "C"),
         napis(A[0] + 30, A[1] - 8, "48°", 10), napis(B[0] - 26, B[1] - 6, "67°", 10), napis(C[0], C[1] + 20, "γ", 11)]
    return svg(220, 180, "".join(t), opis="Trikotnik z zunanjim kotom pri B")

a9 = naloga(
    "A9", "geometrija_ravnine", 5,
    r"V trikotniku \(ABC\) meri notranji kot pri oglišču \(A\) \(48^\circ\), pri oglišču \(B\) pa \(67^\circ\). Nariši skico, izračunaj notranji kot pri oglišču \(C\), "
    r"na skici z \(\beta'\) označi zunanji kot pri oglišču \(B\) in izračunaj njegovo velikost.",
    r"\(\gamma = 65^\circ\), \(\beta' = 113^\circ\)",
    [
        ("@slika", trikotnik_a9()),
        ("!γ = 180° − 48° − 67° = 65°", "Vsota notranjih kotov je 180°."),
        ("!β' = 180° − 67° = 113°", "Zunanji kot je sokot notranjega (enak je tudi α + γ)."),
    ],
)

# ------------------------------------------------------------------ 2. del
F = lambda x: x ** 3 - 4 * x * x + 4 * x

b1 = naloga(
    "B1", "odvod_pm", 15,
    r"Dana je funkcija \(f(x) = x^3 - 4x^2 + 4x\).<br>"
    r"1.1. Izračunaj ničle in začetno vrednost funkcije \(f\). (5 točk)<br>"
    r"1.2. Izračunaj ekstreme funkcije \(f\). (7 točk)<br>"
    r"1.3. Nariši graf funkcije \(f\). (3 točke)",
    r"1.1. \(0\), \(2\) (dvojna); \(f(0) = 0\) &nbsp; 1.2. \(\max\left(\frac{2}{3}, \frac{32}{27}\right)\), \(\min(2, 0)\)",
    [
        "## 1.1",
        ("f(x) = x(x<sup>2</sup> − 4x + 4) = x(x − 2)<sup>2</sup>", "Izpostavimo x, v oklepaju je popolni kvadrat."),
        ("!x<sub>1</sub> = 0,  x<sub>2,3</sub> = 2", "Ničla 2 je dvojna."),
        ("!f(0) = 0", ""),
        "## 1.2",
        ("f'(x) = 3x<sup>2</sup> − 8x + 4 = (3x − 2)(x − 2)", "", "odvod"),
        ("f'(x) = 0  ⇒  x = " + U("2", "3") + " ali x = 2", ""),
        ("!maksimum: (" + U("2", "3") + ", " + U("32", "27") + ")", "f(2/3) = 2/3 · (4/3)² = 32/27 ≈ 1,19; odvod preide iz + v −."),
        ("!minimum: (2, 0)", "Odvod preide iz − v +."),
        "## 1.3",
        ("@slika", graf([(F, MODRA)], (-1, 4), (-2, 4), [(0, 0, ""), (2, 0, "min"), (2 / 3, 32 / 27, "max")], sirina=280, visina=260)),
    ],
)


def mreza_prizme():
    a = 22
    h = 50
    t = []
    y0 = 70
    for i in range(6):
        t.append(f'<rect x="{20 + i * a}" y="{y0}" width="{a}" height="{h}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor"/>')
    def heks(cx, cy):
        r = a
        pts = " ".join(f"{cx + r * math.cos(math.radians(60 * k)):.1f},{cy + r * math.sin(math.radians(60 * k)):.1f}" for k in range(6))
        return f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor"/>'
    cx = 20 + 2 * a + a / 2
    t.append(heks(cx, y0 - a * math.sqrt(3) / 2))
    t.append(heks(cx, y0 + h + a * math.sqrt(3) / 2))
    t.append(napis(20 + 6 * a + 14, y0 + h / 2 + 4, "v", 11))
    t.append(napis(20 + a / 2, y0 + h + 14, "a", 11))
    t.append(napis(cx - a + 8, y0 - a * math.sqrt(3) / 2 + 4, "φ", 11, RDECA))
    return svg(190, int(y0 + h + a * math.sqrt(3) + 10), "".join(t), opis="Mreža pravilne šeststrane prizme")

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Škatla za bonbone ima obliko pravilne šeststrane prizme z osnovnim robom \(4\) cm in višino \(10\) cm. Na sliki je mreža prizme." + mreza_prizme()
    + r"2.1. Izračunaj ploščino osnovne ploskve in velikost notranjega kota \(\varphi\) šestkotnika. (7 točk)<br>"
    r"2.2. Izračunaj površino prizme. (4 točke)<br>"
    r"2.3. Skupna prostornina bonbonov v škatli je \(300\ \mathrm{cm^3}\). Kolikšen delež prostornine škatle zasedajo bonboni? (4 točke)",
    r"2.1. \(24\sqrt{3} \approx 41{,}57\ \mathrm{cm^2}\), \(\varphi = 120^\circ\) &nbsp; 2.2. \(\approx 323{,}14\ \mathrm{cm^2}\) &nbsp; 2.3. \(\approx 72{,}2\,\%\)",
    [
        "## 2.1",
        ("O = 6 · " + U("a<sup>2</sup>" + K("3"), "4") + " = 6 · " + U("16" + K("3"), "4") + " = 24" + K("3"), "Šestkotnik razdelimo na 6 enakostraničnih trikotnikov.", "ploscine"),
        ("!O ≈ 41,57 cm<sup>2</sup>", ""),
        ("!φ = 2 · 60° = 120°", "Pri vsakem oglišču se stikata kota dveh enakostraničnih trikotnikov."),
        "## 2.2",
        ("P = 2O + 6av = 48" + K("3") + " + 240", "", "telesa"),
        ("!P ≈ 323,14 cm<sup>2</sup>", ""),
        "## 2.3",
        ("V = O · v = 240" + K("3") + " ≈ 415,69 cm<sup>3</sup>", ""),
        ("!" + U("300", "415,69") + " ≈ 0,722 = 72,2 %", "", "odstotki"),
    ],
)

SK = ["0–10", "10–20", "20–30", "30–40", "40–50", "50–60", "60–70", "70–80"]
FJ = [4, 18, 24, 15, 12, 8, 6, 3]


def stolpci():
    t = [f'<line x1="36" y1="{150 - j * 5}" x2="300" y2="{150 - j * 5}" stroke="currentColor" stroke-opacity="{0.6 if j == 0 else 0.12}"/>'
         + napis(32, 154 - j * 5, str(j), 9, sidro="end") for j in range(0, 26, 5)]
    t += [f'<rect x="{40 + i * 32}" y="{150 - f * 5}" width="32" height="{f * 5}" fill="{MODRA}" fill-opacity="0.7" stroke="currentColor" stroke-width="0.6"/>'
          + napis(56 + i * 32, 164, SK[i], 8) for i, f in enumerate(FJ)]
    t.append(napis(170, 178, "starost (let)", 10))
    return svg(310, 185, "".join(t), opis="Starost članov društva")

b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Stolpčni diagram prikazuje starost članov prostovoljnega gasilskega društva (izmišljeni podatki; razred \(10\)–\(20\) pomeni nad \(10\) do \(20\) let)." + stolpci()
    + r"3.1. Podatke zapiši v preglednico s frekvencami in relativnimi frekvencami. (4 točke)<br>"
    r"3.2. Koliko članov ima društvo in koliko odstotkov članov je starih nad \(40\) let? (5 točk)<br>"
    r"3.3. Izračunaj aritmetično sredino starosti članov (uporabi sredine razredov). Koliko novih članov iz skupine nad \(20\) do \(30\) let bi se moralo včlaniti, "
    r"da bi bila aritmetična sredina \(30\) let? (6 točk)",
    r"3.2. \(90\) članov, \(\approx 32{,}2\,\%\) &nbsp; 3.3. \(\bar{x} \approx 33{,}4\) let; \(62\) novih članov",
    [
        "## 3.1",
        ("@slika", tabela(["starost", "f", "f/n"], [[s, str(f), f"{100 * f / 90:.1f} %".replace(".", ",")] for s, f in zip(SK, FJ)])),
        (None, "Relativna frekvenca je f/90."),
        "## 3.2",
        ("!n = 4 + 18 + 24 + 15 + 12 + 8 + 6 + 3 = 90 članov", ""),
        ("nad 40 let: 12 + 8 + 6 + 3 = 29", ""),
        ("!" + U("29", "90") + " ≈ 32,2 %", "", "odstotki"),
        "## 3.3",
        ("x̄ = " + U("4 · 5 + 18 · 15 + 24 · 25 + 15 · 35 + 12 · 45 + 8 · 55 + 6 · 65 + 3 · 75", "90") + " = " + U("3010", "90"), "Sredine razredov so 5, 15, …, 75.", "statistika"),
        ("!x̄ ≈ 33,4 let", ""),
        (U("3010 + 25k", "90 + k") + " = 30", "k novih članov ima sredino razreda 25 let."),
        ("3010 + 25k = 2700 + 30k  ⇒  5k = 310", ""),
        ("!k = 62", "Včlaniti bi se moralo 62 novih članov."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
