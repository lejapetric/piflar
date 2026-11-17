# Spomladanski rok 2011 (uradna pola RIC P111-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2011, "spomladanski", "sobota, 4. junij 2011"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Za \(t = -3\) natančno izračunaj vrednost izraza \(\frac{3}{2} + \frac{5}{3} t : (1 - t)\).",
    r"\(\frac{1}{4}\)",
    [
        (U("5", "3") + " · (−3) = −5", "Najprej množenje in deljenje."),
        ("1 − (−3) = 4  ⇒  −5 : 4 = −" + U("5", "4"), ""),
        ("!" + U("3", "2") + " − " + U("5", "4") + " = " + U("6 − 5", "4") + " = " + U("1", "4"), ""),
    ],
)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Delno koreni in brez žepnega računala poenostavi izraz \(\sqrt{48} - 2\sqrt{27} + 3\sqrt{75}\).",
    r"\(13\sqrt{3}\)",
    [
        (K("48") + " = 4" + K("3") + ",  " + K("27") + " = 3" + K("3") + ",  " + K("75") + " = 5" + K("3"), "Izpostavimo popolne kvadrate.", "koreni"),
        ("4" + K("3") + " − 6" + K("3") + " + 15" + K("3"), ""),
        ("!= 13" + K("3"), ""),
    ],
)

a3 = naloga(
    "A3", "eksponentna_logaritemska", 4,
    r"Brez žepnega računala reši enačbo \(3^{2x + 1} \cdot 9 = 1\).",
    r"\(x = -\frac{3}{2}\)",
    [
        ("3<sup>2x + 1</sup> · 3<sup>2</sup> = 3<sup>0</sup>", "1 = 3⁰.", "eksponentna"),
        ("2x + 3 = 0", ""),
        ("!x = −" + U("3", "2"), ""),
    ],
)

a4 = naloga(
    "A4", "ulomki_odstotki", 4,
    r"Samo je imel v shrambi nekaj jabolk. Tretjino jih je pojedel sam, \(5\) jih je pojedla Tadeja, ostalo pa mu je še \(7\) jabolk. Koliko jabolk je imel?",
    r"\(18\)",
    [
        ("x − " + U("x", "3") + " − 5 = 7", ""),
        (U("2x", "3") + " = 12", ""),
        ("!x = 18 jabolk", ""),
    ],
)


def krog_a5():
    def r(X, Y):
        c = f'<circle cx="{X(0):.1f}" cy="{Y(0):.1f}" r="{X(1) - X(0):.1f}" fill="none" stroke="currentColor" stroke-opacity="0.5"/>'
        P1 = (math.cos(math.radians(120)), math.sin(math.radians(120)))
        P2 = (math.cos(math.radians(-45)), math.sin(math.radians(-45)))
        c += f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(P1[0]):.1f}" y2="{Y(P1[1]):.1f}" stroke="{MODRA}" stroke-width="1.6"/>'
        c += f'<line x1="{X(0)}" y1="{Y(0)}" x2="{X(P2[0]):.1f}" y2="{Y(P2[1]):.1f}" stroke="{RDECA}" stroke-width="1.6"/>'
        c += f'<line x1="{X(P1[0]):.1f}" y1="{Y(P1[1]):.1f}" x2="{X(P1[0]):.1f}" y2="{Y(0)}" stroke="currentColor" stroke-dasharray="3 3"/>'
        c += f'<line x1="{X(P2[0]):.1f}" y1="{Y(P2[1]):.1f}" x2="{X(0)}" y2="{Y(P2[1]):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
        c += tocka(X, Y, P1[0], 0, "A(x, 0)", -30, 16) + tocka(X, Y, 0, P2[1], "B(0, y)", -52, 4)
        c += napis(X(0.25), Y(0.32), "120°", 10, MODRA) + napis(X(0.32), Y(-0.15), "−45°", 10, RDECA)
        return c
    return mreza((-1.4, 1.4), (-1.3, 1.3), r, sirina=260, oznake=True)

a5 = naloga(
    "A5", "kotne_funkcije_pm", 4,
    r"Na sliki je enotska krožnica. Točka \(A\) je pravokotna projekcija točke na krožnici pri kotu \(120^\circ\) na os \(x\), točka \(B\) pa projekcija točke "
    r"pri kotu \(-45^\circ\) na os \(y\). Natančno izračunaj manjkajoči koordinati točk \(A\) in \(B\)." + krog_a5(),
    r"\(A\left(-\frac{1}{2}, 0\right)\), \(B\left(0, -\frac{\sqrt{2}}{2}\right)\)",
    [
        ("x = cos 120° = −" + U("1", "2"), "Na enotski krožnici je abscisa kosinus kota.", "kotne"),
        ("!A(−" + U("1", "2") + ", 0)", ""),
        ("y = sin(−45°) = −" + U(K("2"), "2"), "Ordinata je sinus kota; sinus je liha funkcija."),
        ("!B(0, −" + U(K("2"), "2") + ")", ""),
    ],
)

OC = ["nzd (1)", "zd (2)", "db (3)", "pdb (4)", "odl (5)"]
DE = [2, 3, 6, 5, 4]
FA = [3, 5, 4, 3, 2]


def stolpci_a6():
    t = [f'<line x1="30" y1="{140 - j * 18}" x2="290" y2="{140 - j * 18}" stroke="currentColor" stroke-opacity="{0.6 if j == 0 else 0.12}"/>'
         + napis(26, 144 - j * 18, str(j), 9, sidro="end") for j in range(0, 7)]
    for i in range(5):
        x = 40 + i * 50
        t.append(f'<rect x="{x}" y="{140 - DE[i] * 18}" width="18" height="{DE[i] * 18}" fill="{RDECA}" fill-opacity="0.65"/>')
        t.append(f'<rect x="{x + 18}" y="{140 - FA[i] * 18}" width="18" height="{FA[i] * 18}" fill="{MODRA}" fill-opacity="0.65"/>')
        t.append(napis(x + 18, 155, OC[i], 9))
    t.append(f'<rect x="210" y="8" width="10" height="10" fill="{RDECA}" fill-opacity="0.65"/>' + napis(224, 17, "učenke", 10, sidro="start"))
    t.append(f'<rect x="210" y="24" width="10" height="10" fill="{MODRA}" fill-opacity="0.65"/>' + napis(224, 33, "učenci", 10, sidro="start"))
    return svg(300, 165, "".join(t), opis="Ocene učenk in učencev")

a6 = naloga(
    "A6", "statistika_pm", 5,
    r"Stolpčni diagram prikazuje ocene učenk in učencev devetega razreda pri matematiki (izmišljeni podatki)." + stolpci_a6()
    + r"a) Koliko učenk je doseglo pozitivno oceno? b) Katera ocena je bila najpogostejša? c) Koliko učenk je doseglo višjo oceno od dobro? "
    r"d) Koliko odstotkov vseh učenk in učencev ni dobilo pozitivne ocene?",
    r"a) \(18\) b) dobro (3) c) \(9\) d) \(\approx 13{,}5\,\%\)",
    [
        ("!a) 3 + 6 + 5 + 4 = 18 učenk", "Pozitivne so ocene od 2 naprej."),
        ("!b) dobro (3): 6 + 4 = 10", "Druge ocene skupaj: 1 → 5, 2 → 8, 4 → 8, 5 → 6.", "statistika"),
        ("!c) 5 + 4 = 9 učenk", "Višje od dobro sta prav dobro in odlično."),
        ("vseh: 20 + 17 = 37,  nezadostnih: 2 + 3 = 5", ""),
        ("!d) " + U("5", "37") + " ≈ 13,5 %", "", "odstotki"),
    ],
)


def trikotnik_a7():
    t = [f'<polygon points="20,110 180,110 100,30" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         '<polyline points="92,38 100,46 108,38" fill="none" stroke="currentColor"/>',
         napis(12, 114, "A"), napis(188, 114, "B"), napis(100, 22, "C"), napis(100, 126, "c = 8√2 cm", 11), napis(50, 64, "a", 12), napis(150, 64, "a", 12)]
    return svg(200, 132, "".join(t), opis="Enakokraki pravokotni trikotnik")

a7 = naloga(
    "A7", "obsegi_ploscine", 5,
    r"V enakokrakem pravokotnem trikotniku \(ABC\) meri hipotenuza \(c = 8\sqrt{2}\) cm. Nariši skico in natančno izračunaj ploščino trikotnika.",
    r"\(32\ \mathrm{cm^2}\)",
    [
        ("@slika", trikotnik_a7()),
        ("a<sup>2</sup> + a<sup>2</sup> = (8" + K("2") + ")<sup>2</sup> = 128  ⇒  a = 8 cm", "", "pitagora"),
        ("!S = " + U("a<sup>2</sup>", "2") + " = 32 cm<sup>2</sup>", "Kateti sta hkrati osnovnica in višina.", "ploscine"),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Brez žepnega računala reši neenačbo \(x^2 - 5x + 6 < 0\).",
    r"\(x \in (2, 3)\)",
    [
        ("x<sup>2</sup> − 5x + 6 = (x − 2)(x − 3)", "Ničli sta 2 in 3.", "neenacba"),
        ("Parabola je odprta navzgor, negativna je med ničlama.", ""),
        ("!x ∈ (2, 3)", ""),
    ],
)


def sled():
    t = [f'<rect x="20" y="30" width="230" height="10" fill="{MODRA}" fill-opacity="0.35"/>',
         f'<rect x="20" y="85" width="230" height="10" fill="{MODRA}" fill-opacity="0.35"/>',
         '<line x1="20" y1="110" x2="250" y2="110" stroke="currentColor"/>',
         '<line x1="20" y1="104" x2="20" y2="116" stroke="currentColor"/>', '<line x1="250" y1="104" x2="250" y2="116" stroke="currentColor"/>',
         napis(135, 126, "1,5 m", 11), napis(281, 66, "70 cm", 10), '<line x1="258" y1="35" x2="258" y2="90" stroke="currentColor" stroke-dasharray="3 2"/>',
         napis(281, 42, "3 cm", 10)]
    return svg(300, 135, "".join(t), opis="Sledi koles v snegu")

a9 = naloga(
    "A9", "obsegi_ploscine", 5,
    r"Kolesi na sliki sta se enkrat zavrteli in v snegu pustili sled. Izpiši podatek, ki ga potrebuješ za izračun polmera kolesa, in izračunaj polmer na centimeter natančno." + sled(),
    r"\(1{,}5\) m; \(r \approx 24\) cm",
    [
        ("!potreben podatek: dolžina sledi 1,5 m", "Pri enem obratu kolo prevozi svoj obseg; širina sledi in razmik med kolesoma nista potrebna."),
        ("2πr = 150 cm", "", "krog"),
        ("!r = " + U("150", "2π") + " ≈ 24 cm", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "zaporedja_pm", 15,
    r"Dani so prvi trije členi zaporedja: \(a_1 = x + 2\), \(a_2 = 3x + 2\), \(a_3 = 9x - 2\).<br>"
    r"1.1. Določi \(x\) tako, da bo zaporedje aritmetično. (4 točke)<br>"
    r"1.2. Določi \(x\) tako, da bo zaporedje geometrijsko. (5 točk)<br>"
    r"1.3. Za \(x = 2\) so členi geometrijskega zaporedja. Izračunaj \(a_1\), \(a_2\), \(a_3\), količnik in šesti člen. (6 točk)",
    r"1.1. \(x = 1\) &nbsp; 1.2. \(x = 2\) &nbsp; 1.3. \(4, 8, 16\); \(q = 2\); \(a_6 = 128\)",
    [
        "## 1.1",
        ("2a<sub>2</sub> = a<sub>1</sub> + a<sub>3</sub>  ⇒  6x + 4 = 10x", "Srednji člen je povprečje sosednjih.", "aritmeticno"),
        ("!x = 1", "Zaporedje 3, 5, 7."),
        "## 1.2",
        ("a<sub>2</sub><sup>2</sup> = a<sub>1</sub> · a<sub>3</sub>  ⇒  (3x + 2)<sup>2</sup> = (x + 2)(9x − 2)", "", "geometrijsko"),
        ("9x<sup>2</sup> + 12x + 4 = 9x<sup>2</sup> + 16x − 4", ""),
        ("!x = 2", ""),
        "## 1.3",
        ("!a<sub>1</sub> = 4, a<sub>2</sub> = 8, a<sub>3</sub> = 16", ""),
        ("!q = 2", ""),
        ("!a<sub>6</sub> = 4 · 2<sup>5</sup> = 128", ""),
    ],
)


def sestkotnik():
    c, r = (80, 75), 55
    pts = [(c[0] + r * math.cos(math.radians(60 * k + 180)), c[1] - r * math.sin(math.radians(60 * k + 180))) for k in range(6)]
    t = [f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>']
    t += [f'<line x1="{c[0]}" y1="{c[1]}" x2="{x:.1f}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.4"/>' for x, y in pts]
    t.append(f'<line x1="{pts[0][0]:.1f}" y1="{pts[0][1]:.1f}" x2="{pts[3][0]:.1f}" y2="{pts[3][1]:.1f}" stroke="{RDECA}" stroke-width="1.5"/>')
    for (x, y), n in zip(pts, ["A", "F", "E", "D", "C", "B"]):
        t.append(napis(x + (x - c[0]) * 0.18, y + (y - c[1]) * 0.18 + 4, n, 11))
    return svg(160, 150, "".join(t), opis="Pravilni šestkotnik s 6 enakostraničnimi trikotniki")

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Pravilna šeststrana prizma \(ABCDEFA'B'C'D'E'F'\) ima obseg osnovne ploskve \(24\) cm in višino \(10\) cm.<br>"
    r"2.1. Nariši skico osnovne ploskve in izračunaj dolžino osnovnega roba. (3 točke)<br>"
    r"2.2. Izračunaj ploščino plašča in jo izrazi v kvadratnih metrih. (4 točke)<br>"
    r"2.3. Natančno izračunaj prostornino prizme in dolžino telesne diagonale \(AD'\). (8 točk)",
    r"2.1. \(a = 4\) cm &nbsp; 2.2. \(0{,}024\ \mathrm{m^2}\) &nbsp; 2.3. \(V = 240\sqrt{3}\ \mathrm{cm^3}\), \(AD' = 2\sqrt{41}\) cm",
    [
        "## 2.1",
        ("@slika", sestkotnik()),
        ("!a = " + U("24", "6") + " = 4 cm", ""),
        "## 2.2",
        ("pl = 6 · a · v = 6 · 4 · 10 = 240 cm<sup>2</sup>", "", "telesa"),
        ("!pl = 0,024 m<sup>2</sup>", "1 m² = 10 000 cm²."),
        "## 2.3",
        ("O = 6 · " + U("a<sup>2</sup>" + K("3"), "4") + " = 24" + K("3") + " cm<sup>2</sup>", "Šest enakostraničnih trikotnikov.", "ploscine"),
        ("!V = O · v = 240" + K("3") + " cm<sup>3</sup>", ""),
        ("AD = 2a = 8 cm", "Najdaljša diagonala šestkotnika (rdeča) je dvakratnik roba."),
        ("!AD' = " + K("8<sup>2</sup> + 10<sup>2</sup>") + " = " + K("164") + " = 2" + K("41") + " cm", "", "pitagora"),
    ],
)

P = lambda x: x ** 3 - 2 * x * x - 3 * x

b3 = naloga(
    "B3", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 - 2x^2 - 3x\).<br>"
    r"3.1. Izračunaj ničle in začetno vrednost polinoma. (6 točk)<br>"
    r"3.2. Nariši skico grafa polinoma. (5 točk)<br>"
    r"3.3. Za katere \(x\) je polinom pozitiven? (4 točke)",
    r"3.1. \(-1, 0, 3\); \(p(0) = 0\) &nbsp; 3.3. \(x \in (-1, 0) \cup (3, \infty)\)",
    [
        "## 3.1",
        ("p(x) = x(x<sup>2</sup> − 2x − 3) = x(x − 3)(x + 1)", "Izpostavimo x.", "vieta"),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = 0,  x<sub>3</sub> = 3", ""),
        ("!p(0) = 0", ""),
        "## 3.2",
        ("@slika", graf([(P, MODRA)], (-2, 4), (-7, 5), [(-1, 0, ""), (0, 0, ""), (3, 0, "")], sirina=260, visina=320)),
        "## 3.3",
        ("!p(x) > 0 za x ∈ (−1, 0) ∪ (3, ∞)", "Vse ničle so enojne, predznak se v vsaki spremeni.", "neenacba"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
