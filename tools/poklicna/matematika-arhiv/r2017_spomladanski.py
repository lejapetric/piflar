# Spomladanski rok 2017 (uradna pola RIC P171-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2017, "spomladanski", "sobota, 3. junij 2017"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Za \(a = 8\) in \(b = 5\) z uporabo žepnega računala izračunaj vrednosti izrazov: "
    r"\(\sqrt[3]{a}\), \(a^3 b^{-2}\), \(\frac{1}{a} + \frac{2}{b}\) in \(\log_2 a\).",
    r"\(2\); \(20{,}48\); \(\frac{21}{40} = 0{,}525\); \(3\)",
    [
        ("!∛8 = 2", "2³ = 8.", "koreni"),
        ("!8³ · 5<sup>−2</sup> = " + U("512", "25") + " = 20,48", "Negativni eksponent pomeni recipročno vrednost.", "potence"),
        ("!" + U("1", "8") + " + " + U("2", "5") + " = " + U("5", "40") + " + " + U("16", "40") + " = " + U("21", "40") + " = 0,525", ""),
        ("!log<sub>2</sub> 8 = 3", "2³ = 8.", "logaritem"),
    ],
)


def trikotnik_a2(resitev=False):
    k = 30
    A, B = (25, 150), (25 + 7 * k, 150)
    C = (25 + 3.5 * k, 150 - 3.5 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         napis(A[0] - 10, A[1] + 4, "A"), napis(B[0] + 10, B[1] + 4, "B"), napis(C[0], C[1] - 8, "C")]
    if resitev:
        r = 40
        t += [f'<line x1="{A[0]}" y1="{A[1]}" x2="{A[0]}" y2="{A[1] - 70}" stroke="currentColor" stroke-dasharray="3 3"/>',
              f'<line x1="{B[0]}" y1="{B[1]}" x2="{B[0]}" y2="{B[1] - 70}" stroke="currentColor" stroke-dasharray="3 3"/>',
              f'<path d="M {A[0] + r} {A[1]} A {r} {r} 0 0 0 {A[0]} {A[1] - r}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>',
              f'<path d="M {B[0] - r} {B[1]} A {r} {r} 0 0 1 {B[0]} {B[1] - r}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>',
              napis(A[0] + 34, A[1] - 8, "45°", 10, RDECA), napis(B[0] - 34, B[1] - 8, "45°", 10, RDECA),
              napis((A[0] + B[0]) / 2, A[1] + 16, "c = 7 cm", 11)]
    else:
        t += [napis((A[0] + B[0]) / 2, A[1] + 16, "c", 12), napis(A[0] + 30, A[1] - 6, "α", 11), napis(B[0] - 30, B[1] - 6, "α", 11),
              napis((A[0] + C[0]) / 2 - 10, (A[1] + C[1]) / 2, "b", 12), napis((B[0] + C[0]) / 2 + 10, (B[1] + C[1]) / 2, "a", 12),
              napis(C[0], C[1] + 18, "γ", 11)]
    return svg(270, 175, "".join(t), opis="Enakokraki trikotnik ABC" + (" – konstrukcija" if resitev else " – skica"))

a2 = naloga(
    "A2", "geometrija_ravnine", 4,
    r"Dan je enakokraki trikotnik \(ABC\) z osnovnico \(c = 7\) cm in kotom ob osnovnici \(\alpha = 45^\circ\). "
    r"Nariši skico in konstruiraj trikotnik \(ABC\). Kot \(\alpha\) konstruiraj s šestilom in ravnilom.",
    r"Konstrukcija (glej rešitev).",
    [
        ("@slika", trikotnik_a2()),
        (None, "Skica: osnovnica c, ob njej oba kota α, kraka a = b."),
        ("Narišemo osnovnico AB = 7 cm.", "", "konstrukcija"),
        ("V A in B konstruiramo pravokotnico, nato pravi kot razpolovimo: 90° : 2 = 45°.", "Simetrala pravega kota da kot 45°."),
        ("@slika", trikotnik_a2(True)),
        ("!Kraka kotov se sekata v oglišču C.", "Ker je α = β = 45°, je γ = 90°."),
    ],
)

a3 = naloga(
    "A3", "kvadratna_funkcija", 4,
    r"Zapiši predpis kvadratne funkcije \(f\), ki doseže največjo vrednost \(5\) pri \(x = 2\) in za katero velja \(f(3) = 3\).",
    r"\(f(x) = -2(x-2)^2 + 5 = -2x^2 + 8x - 3\)",
    [
        ("T(2, 5) je teme  ⇒  f(x) = a(x − 2)<sup>2</sup> + 5", "Temenska oblika.", "teme"),
        ("f(3) = a · 1 + 5 = 3  ⇒  a = −2", "a < 0, zato ima funkcija res največjo vrednost."),
        ("!f(x) = −2(x − 2)<sup>2</sup> + 5 = −2x<sup>2</sup> + 8x − 3", ""),
    ],
)

a4 = naloga(
    "A4", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(3^{x-2} \cdot 6 = 162\).",
    r"\(x = 5\)",
    [
        ("3<sup>x−2</sup> = " + U("162", "6") + " = 27", ""),
        ("3<sup>x−2</sup> = 3<sup>3</sup>", "Obe strani zapišemo kot potenci z osnovo 3.", "eksponentna"),
        ("x − 2 = 3", ""),
        ("!x = 5", ""),
    ],
)

a5 = naloga(
    "A5", "kotne_funkcije_pm", 4,
    r"Dan je splošni člen zaporedja \(a_n = \cos\frac{n\pi}{3}\), \(n \in \mathbb{N}\). Natančno izračunaj prve tri člene zaporedja.",
    r"\(a_1 = \frac{1}{2}\), \(a_2 = -\frac{1}{2}\), \(a_3 = -1\)",
    [
        ("!a<sub>1</sub> = cos " + U("π", "3") + " = " + U("1", "2"), "", "kotne"),
        ("!a<sub>2</sub> = cos " + U("2π", "3") + " = −" + U("1", "2"), "Kot 120° leži v 2. kvadrantu, kosinus je negativen."),
        ("!a<sub>3</sub> = cos π = −1", ""),
    ],
)


def tarce(zadete):
    t = []
    for i in range(6):
        cx = 25 + i * 42
        if i in zadete:
            t.append(f'<circle cx="{cx}" cy="28" r="16" fill="none" stroke="currentColor" stroke-width="1.5"/>')
        else:
            t.append(f'<circle cx="{cx}" cy="28" r="16" fill="currentColor" fill-opacity="0.85"/>')
    return svg(270, 56, "".join(t), opis="Šest tarč, zadete so prazne")

a6 = naloga(
    "A6", "kombinatorika_verjetnost", 4,
    r"Biatlonec Jure je zadel 4 izmed 6 tarč (glej sliko, zadeta tarča je prazna). Izračunaj verjetnost, da je zadel prav "
    r"razporeditev zadetih tarč na sliki, če so vse razporeditve zadetih tarč enako verjetne." + tarce({0, 1, 3, 5}),
    r"\(P = \frac{1}{15}\)",
    [
        ("število razporeditev: C<sub>4</sub><sup>6</sup> = " + U("6 · 5", "2") + " = 15", "Izbiramo, katere 4 od 6 tarč so zadete.", "kombinatorika"),
        ("!P = " + U("1", "15"), "Ugodna je natanko ena razporeditev.", "verjetnost"),
    ],
)

a7 = naloga(
    "A7", "linearna_funkcija", 4,
    r"Zapiši enačbo premice, ki gre skozi točko \(T(-1, 4)\) in ima smerni koeficient \(k = -2\). Premico tudi nariši v koordinatni sistem.",
    r"\(y = -2x + 2\)",
    [
        ("y − 4 = −2(x + 1)", "Enačba premice skozi točko z danim smernim koeficientom.", "premica"),
        ("!y = −2x + 2", ""),
        (None, "Za risanje: začetna vrednost 2, ničla x = 1."),
        ("@slika", graf([(lambda x: -2 * x + 2, MODRA)], (-2, 4), (-6, 6), [(-1, 4, "T"), (1, 0, ""), (0, 2, "")], sirina=220, visina=420)),
    ],
)

a8 = naloga(
    "A8", "ulomki_odstotki", 5,
    r"Ana je v štirih dneh prebrala knjigo s \(160\) stranmi. Prvi dan je prebrala \(25\,\%\) knjige, drugi dan \(\frac{1}{5}\) knjige, "
    r"zadnja dva dneva pa vsak dan enako število strani. Koliko strani je prebrala zadnji dan?",
    r"\(44\) strani",
    [
        ("1. dan: 0,25 · 160 = 40 strani", "", "odstotki"),
        ("2. dan: " + U("1", "5") + " · 160 = 32 strani", ""),
        ("ostane: 160 − 40 − 32 = 88 strani", ""),
        ("!zadnji dan: 88 : 2 = 44 strani", "Zadnji dan je Ana prebrala 44 strani."),
    ],
)

a9 = naloga(
    "A9", "linearna_funkcija", 5,
    r"Reši sistem enačb: \(3x + 4y = 10\) in \(5x + 7y = 17\).",
    r"\(x = 2,\ y = 1\)",
    [
        ("15x + 20y = 50", "Prvo enačbo pomnožimo s 5.", "sistem"),
        ("15x + 21y = 51", "Drugo enačbo pomnožimo s 3."),
        ("!y = 1", "Odštejemo prvo enačbo od druge."),
        ("!x = 2", "Vstavimo y = 1 v prvo enačbo: 3x + 4 = 10. Preizkus: 10 + 7 = 17."),
    ],
)

a10 = naloga(
    "A10", "statistika_pm", 6,
    r"V podjetju ima plačo \(780\) EUR en zaposleni, \(860\) EUR trije zaposleni, \(1100\) EUR sedem zaposlenih, \(1900\) EUR en zaposleni "
    r"in \(3900\) EUR en zaposleni. Izračunaj mediano, modus in aritmetično sredino plač.",
    r"\(Me = 1100\) EUR, \(Mo = 1100\) EUR, \(\bar{x} \approx 1296{,}92\) EUR",
    [
        ("n = 1 + 3 + 7 + 1 + 1 = 13", ""),
        ("!Me = 1100 EUR", "Mediana je 7. podatek po velikosti; 5. do 11. podatek so 1100 EUR.", "statistika"),
        ("!Mo = 1100 EUR", "Najpogostejša vrednost."),
        ("x̄ = " + U("780 + 3 · 860 + 7 · 1100 + 1900 + 3900", "13") + " = " + U("16 860", "13"), ""),
        ("!x̄ ≈ 1296,92 EUR", ""),
    ],
)


def pravokotni_a11():
    A, B, C = (20, 130), (230, 130), (20 + 210 * math.cos(math.radians(62)) ** 2, 130 - 210 * math.cos(math.radians(62)) * math.sin(math.radians(62)))
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0], C[1] - 8, "C"),
         napis(125, A[1] + 16, "c = 8 cm", 11), napis(A[0] + 22, A[1] - 6, "62°", 10), napis(B[0] - 26, B[1] - 6, "β", 11),
         napis((A[0] + C[0]) / 2 - 8, (A[1] + C[1]) / 2, "b", 12), napis((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 4, "a", 12)]
    return svg(255, 160, "".join(t), opis="Pravokotni trikotnik s pravim kotom pri C")

a11 = naloga(
    "A11", "trikotnik_kotne", 6,
    r"Dan je pravokotni trikotnik \(ABC\) s pravim kotom pri oglišču \(C\). Kot pri oglišču \(A\) meri \(62^\circ\), hipotenuza \(c\) pa \(8\) cm. "
    r"Nariši skico ter izračunaj dolžini katet in velikost kota pri oglišču \(B\).",
    r"\(a \approx 7{,}06\) cm, \(b \approx 3{,}76\) cm, \(\beta = 28^\circ\)",
    [
        ("@slika", pravokotni_a11()),
        ("!a = c · sin α = 8 · sin 62° ≈ 7,06 cm", "Kateta a leži nasproti kota α.", "kotne"),
        ("!b = c · cos α = 8 · cos 62° ≈ 3,76 cm", "Kateta b je priležna kotu α."),
        ("!β = 90° − 62° = 28°", "Ostra kota pravokotnega trikotnika se dopolnjujeta do 90°."),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "polinomi_racionalna", 10,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{2x - 1}{-x + 3}\).<br>"
    r"1.1. Izračunaj manjkajoče vrednosti v preglednici. (5 točk)"
    + tabela([r"\(x\)", r"\(1\)", "", r"\(5\)"], [[r"\(f(x)\)", "", r"\(3\)", ""]])
    + r"1.2. Zapiši enačbo tangente na graf funkcije \(f\) v točki \(T\left(0, -\frac{1}{3}\right)\). (5 točk)",
    r"1.1. \(f(1) = \frac{1}{2}\), \(x = 2\), \(f(5) = -\frac{9}{2}\) &nbsp; 1.2. \(y = \frac{5}{9}x - \frac{1}{3}\)",
    [
        "## 1.1",
        ("!f(1) = " + U("2 − 1", "−1 + 3") + " = " + U("1", "2"), "", "racionalna"),
        (U("2x − 1", "−x + 3") + " = 3  ⇒  2x − 1 = −3x + 9  ⇒  !x = 2", ""),
        ("!f(5) = " + U("9", "−2") + " = −" + U("9", "2"), ""),
        ("@slika", tabela(["x", "1", "2", "5"], [["f(x)", "1/2", "3", "−9/2"]])),
        "## 1.2",
        ("f'(x) = " + U("2(−x + 3) − (2x − 1)(−1)", "(−x + 3)<sup>2</sup>") + " = " + U("5", "(3 − x)<sup>2</sup>"), "Pravilo za odvod kvocienta.", "odvod"),
        ("k = f'(0) = " + U("5", "9"), ""),
        ("y + " + U("1", "3") + " = " + U("5", "9") + "(x − 0)", "", "tangenta"),
        ("!y = " + U("5", "9") + "x − " + U("1", "3"), ""),
    ],
)


def mreza_valja():
    r, h = 3, 10
    s = 9
    W = 2 * math.pi * r * s
    x0, y0 = 20, 20 + 2 * r * s
    t = [f'<circle cx="{x0 + W / 2:.1f}" cy="{y0 - r * s}" r="{r * s}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor"/>',
         f'<rect x="{x0}" y="{y0}" width="{W:.1f}" height="{h * s}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor"/>',
         f'<circle cx="{x0 + W / 2:.1f}" cy="{y0 + h * s + r * s}" r="{r * s}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor"/>',
         f'<line x1="{x0 + W / 2:.1f}" y1="{y0 - r * s}" x2="{x0 + W / 2 + r * s:.1f}" y2="{y0 - r * s}" stroke="{RDECA}"/>',
         napis(x0 + W / 2 + r * s / 2, y0 - r * s - 4, "r", 12, RDECA),
         napis(x0 + W / 2, y0 + h * s / 2 + 4, "o = 2πr", 12), napis(x0 + W + 14, y0 + h * s / 2 + 4, "h", 12)]
    return svg(int(W + 50), int(y0 + h * s + 2 * r * s + 10), "".join(t), opis="Mreža valja: dva kroga in pravokotnik")

b2 = naloga(
    "B2", "povrsine_prostornine", 10,
    r"Pločevinka ima obliko valja s prostornino \(90\pi\ \mathrm{cm^3}\) in višino \(10\) cm.<br>"
    r"2.1. Nariši skico mreže valja, ki je sestavljena iz dveh krogov in pravokotnika. Izračunaj polmer kroga in dolžini stranic pravokotnika. (7 točk)<br>"
    r"2.2. V prazno pločevinko smo do \(\frac{2}{3}\) višine nalili vodo. Izračunaj, koliko decilitrov vode smo nalili. (3 točke)",
    r"2.1. \(r = 3\) cm, stranici \(6\pi \approx 18{,}85\) cm in \(10\) cm &nbsp; 2.2. \(\approx 1{,}88\) dl",
    [
        "## 2.1",
        ("@slika", mreza_valja()),
        ("V = πr<sup>2</sup>h  ⇒  90π = πr<sup>2</sup> · 10", "", "telesa"),
        ("!r<sup>2</sup> = 9  ⇒  r = 3 cm", ""),
        ("!dolžina pravokotnika: o = 2πr = 6π ≈ 18,85 cm", "Plašč se razvije v pravokotnik, katerega ena stranica je obseg osnovne ploskve.", "krog"),
        ("!širina pravokotnika: h = 10 cm", ""),
        "## 2.2",
        ("V<sub>vode</sub> = " + U("2", "3") + " · 90π = 60π cm<sup>3</sup> ≈ 188,5 cm<sup>3</sup>", ""),
        ("!≈ 1,88 dl", "1 dl = 100 cm³."),
    ],
)

b3 = naloga(
    "B3", "kombinatorika_verjetnost", 10,
    r"V 1. A razredu neke šole je \(14\) fantov in \(18\) deklet.<br>"
    r"3.1. V 1. A razredu je trikrat toliko deklet, kolikor je deklet v 2. A razredu. Razmerje deklet in fantov v 2. A razredu je \(3 : 7\). "
    r"Koliko fantov in koliko deklet je v 2. A razredu? (5 točk)<br>"
    r"3.2. Učitelj je v 1. A razredu za spraševanje naključno izbral \(3\) dijake. Kolikšna je verjetnost, da je izbral dva fanta in eno dekle? (5 točk)",
    r"3.1. \(6\) deklet in \(14\) fantov &nbsp; 3.2. \(P = \frac{819}{2480} \approx 0{,}330\)",
    [
        "## 3.1",
        ("dekleta v 2. A: 18 : 3 = 6", ""),
        ("6 : f = 3 : 7  ⇒  f = " + U("6 · 7", "3") + " = 14", "Sorazmerje."),
        ("!V 2. A razredu je 6 deklet in 14 fantov.", ""),
        "## 3.2",
        ("vse možnosti: C<sub>3</sub><sup>32</sup> = " + U("32 · 31 · 30", "6") + " = 4960", "V razredu je 32 dijakov.", "kombinatorika"),
        ("ugodne: C<sub>2</sub><sup>14</sup> · C<sub>1</sub><sup>18</sup> = 91 · 18 = 1638", ""),
        ("!P = " + U("1638", "4960") + " = " + U("819", "2480") + " ≈ 0,330", "", "verjetnost"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
