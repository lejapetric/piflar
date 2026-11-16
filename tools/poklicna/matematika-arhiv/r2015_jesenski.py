# Jesenski rok 2015 (uradna pola RIC P152-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2015, "jesenski", "torek, 25. avgust 2015"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"Zapiši vse pozitivne delitelje števila \(130\).",
    r"\(1, 2, 5, 10, 13, 26, 65, 130\)",
    [
        ("130 = 2 · 5 · 13", "Razcep na prafaktorje."),
        ("!D<sub>130</sub> = {1, 2, 5, 10, 13, 26, 65, 130}", "Delitelje dobimo kot produkte prafaktorjev; skupaj jih je 2 · 2 · 2 = 8."),
    ],
)

MESECI = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"]
OBISK = [2140, 1980, 2210, 2050, 1890, 1620, 1240, 1180, 2030, 2290, 2350, 1870]

a2 = naloga(
    "A2", "statistika_pm", 4,
    r"V preglednici je število obiskovalcev mestne knjižnice po mesecih v enem letu (izmišljeni podatki). Izračunaj, kolikšen odstotek vseh obiskovalcev "
    r"je knjižnico obiskal v mesecu z največ obiskovalci, in razliko v številu obiskovalcev med mesecema z največ in najmanj obiskovalci."
    + tabela(["Mesec", "Število obiskovalcev"], [[m, str(o)] for m, o in zip(MESECI, OBISK)] + [["Skupaj", "22 850"]]),
    r"\(\approx 10{,}3\,\%\); razlika \(1170\)",
    [
        ("največ: november, 2350", ""),
        ("!" + U("2350", "22 850") + " ≈ 0,1028 = 10,3 %", "", "odstotki"),
        ("najmanj: avgust, 1180", ""),
        ("!2350 − 1180 = 1170", ""),
    ],
)


def mreza_a3(resitev=False):
    k = 34
    X = lambda x: 20 + (x + 1) * k
    Y = lambda y: 150 - (y + 0.5) * k
    t = [f'<line x1="{X(i)}" y1="{Y(-0.5)}" x2="{X(i)}" y2="{Y(3.5)}" stroke="currentColor" stroke-opacity="0.2"/>' for i in range(-1, 6)]
    t += [f'<line x1="{X(-1)}" y1="{Y(j)}" x2="{X(5)}" y2="{Y(j)}" stroke="currentColor" stroke-opacity="0.2"/>' for j in range(0, 4)]
    t.append(f'<polygon points="{X(0)},{Y(0)} {X(3)},{Y(0)} {X(4)},{Y(3)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.8"/>')
    t.append(f'<path d="M {X(3) - 14} {Y(0)} A 14 14 0 0 1 {X(3) + 14 * math.cos(math.radians(71.57)):.1f} {Y(0) - 14 * math.sin(math.radians(71.57)):.1f}" fill="none" stroke="{RDECA}"/>')
    t.append(napis(X(3) - 4, Y(0) - 18, "φ", 12, RDECA))
    if resitev:
        t.append(f'<line x1="{X(3)}" y1="{Y(0)}" x2="{X(5)}" y2="{Y(0)}" stroke="{RDECA}" stroke-dasharray="3 3"/>')
        t.append(napis(X(3.75), Y(0) - 4, "ε", 11, RDECA))
    return svg(240, 160, "".join(t), opis="Trikotnik v kvadratni mreži")

a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"V kvadratni mreži je narisan trikotnik. Izmeri in nato še izračunaj velikost kota \(\varphi\) v trikotniku." + mreza_a3(),
    r"\(\varphi \approx 108{,}43^\circ\)",
    [
        ("Meritev s kotomerom: φ ≈ 108°.", ""),
        ("@slika", mreza_a3(True)),
        ("tan ε = " + U("3", "1") + " = 3  ⇒  ε ≈ 71,57°", "Zunanji kot ε odčitamo iz pravokotnega trikotnika s katetama 1 in 3 kvadratka.", "kotne"),
        ("!φ = 180° − ε ≈ 108,43°", "φ in ε sta sokota."),
    ],
)


def piramida():
    t = [f'<polygon points="30,140 150,140 200,105 80,105" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.6"/>',
         '<polyline points="30,140 115,25 150,140" fill="none" stroke="currentColor" stroke-width="1.4"/>',
         '<polyline points="200,105 115,25" fill="none" stroke="currentColor" stroke-width="1.4"/>',
         '<line x1="80" y1="105" x2="115" y2="25" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<line x1="115" y1="25" x2="115" y2="122" stroke="{RDECA}" stroke-dasharray="3 3"/>',
         f'<line x1="115" y1="25" x2="175" y2="122" stroke="{MODRA}" stroke-width="1.6"/>',
         napis(108, 85, "v", 12, RDECA), napis(156, 78, "v<tspan font-size=\"9\">a</tspan>", 12, MODRA), napis(90, 156, "a", 12), napis(185, 135, "a", 12)]
    return svg(230, 165, "".join(t), opis="Pravilna štiristrana piramida")

a4 = naloga(
    "A4", "povrsine_prostornine", 4,
    r"Dana je pravilna štiristrana piramida. Osnovni rob meri \(10\) m, višina stranske ploskve pa \(13\) m. Izračunaj prostornino piramide." + piramida(),
    r"\(V = 400\ \mathrm{m^3}\)",
    [
        ("v = " + K("v<sub>a</sub><sup>2</sup> − (" + U("a", "2") + ")<sup>2</sup>") + " = " + K("169 − 25") + " = 12 m", "Višina, višina stranske ploskve in polovica osnovnega roba tvorijo pravokotni trikotnik.", "pitagora"),
        ("V = " + U("1", "3") + " · a<sup>2</sup> · v = " + U("1", "3") + " · 100 · 12", "", "telesa"),
        ("!V = 400 m<sup>3</sup>", ""),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Družina je kupila zaboj jabolk. Prvi teden so pojedli \(\frac{1}{3}\) kupljenih jabolk, drugi teden polovico preostanka, tretji teden pa še preostale \(4\) kg. "
    r"Koliko kilogramov jabolk so kupili?",
    r"\(12\) kg",
    [
        ("po 1. tednu ostane " + U("2", "3") + "x", ""),
        ("po 2. tednu ostane " + U("1", "2") + " · " + U("2", "3") + "x = " + U("1", "3") + "x", ""),
        (U("1", "3") + "x = 4", ""),
        ("!x = 12 kg", "Kupili so 12 kg jabolk."),
    ],
)

a6 = naloga(
    "A6", "odvod_pm", 5,
    r"Funkcija \(f\) je dana s predpisom \(f(x) = x^2 + 4x + 1\). Izračunaj, za katere vrednosti spremenljivke \(x\) je \(f(x) = f'(x)\).",
    r"\(x_1 = 1\), \(x_2 = -3\)",
    [
        ("f'(x) = 2x + 4", "", "odvod"),
        ("x<sup>2</sup> + 4x + 1 = 2x + 4", ""),
        ("x<sup>2</sup> + 2x − 3 = 0  ⇒  (x − 1)(x + 3) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = 1,  x<sub>2</sub> = −3", ""),
    ],
)

a7 = naloga(
    "A7", "izrazi_potence", 5,
    r"Brez uporabe računala izračunaj vrednost izraza \(3^0 + 2 \cdot \left|3^{-1} - 1\right| - 27^{\frac{2}{3}}\).",
    r"\(-\frac{20}{3}\)",
    [
        ("3<sup>0</sup> = 1", "", "potence"),
        ("|3<sup>−1</sup> − 1| = |" + U("1", "3") + " − 1| = " + U("2", "3"), "Absolutna vrednost negativnega števila je nasprotno število."),
        ("27<sup>2/3</sup> = (∛27)<sup>2</sup> = 9", "", "koreni"),
        ("1 + 2 · " + U("2", "3") + " − 9 = " + U("3 + 4 − 27", "3"), ""),
        ("!= −" + U("20", "3"), ""),
    ],
)

a8 = naloga(
    "A8", "polinomi_racionalna", 5,
    r"Izračunaj ničle funkcije \(f(x) = \dfrac{x^3 - 2x^2 - 5x + 6}{x^2 + 4}\).",
    r"\(x_1 = 1\), \(x_2 = 3\), \(x_3 = -2\)",
    [
        ("Ničle funkcije so ničle števca, imenovalec x<sup>2</sup> + 4 ni nikoli 0.", "", "racionalna"),
        ("števec pri x = 1: 1 − 2 − 5 + 6 = 0", "Ugibamo med delitelji prostega člena 6.", "horner"),
        ("x<sup>3</sup> − 2x<sup>2</sup> − 5x + 6 = (x − 1)(x<sup>2</sup> − x − 6) = (x − 1)(x − 3)(x + 2)", "Hornerjev algoritem: 1, −1, −6, ostanek 0."),
        ("!x<sub>1</sub> = 1,  x<sub>2</sub> = 3,  x<sub>3</sub> = −2", ""),
    ],
)

a9 = naloga(
    "A9", "linearna_funkcija", 5,
    r"Družini Kos in Zupan sta šli na smučanje. Družina Kos je kupila \(3\) odrasle in \(1\) otroško vozovnico ter plačala \(115\) EUR. "
    r"Družina Zupan je kupila \(2\) odrasli in \(4\) otroške vozovnice ter plačala \(130\) EUR. Koliko stane ena odrasla in koliko ena otroška vozovnica?",
    r"odrasla \(33\) EUR, otroška \(16\) EUR",
    [
        ("3x + y = 115,  2x + 4y = 130", "x je cena odrasle, y cena otroške vozovnice.", "sistem"),
        ("y = 115 − 3x", "Iz prve enačbe izrazimo y."),
        ("2x + 460 − 12x = 130  ⇒  −10x = −330", ""),
        ("!x = 33 EUR", ""),
        ("!y = 115 − 99 = 16 EUR", "Odrasla vozovnica stane 33 EUR, otroška 16 EUR."),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dani sta točki \(A(-3, 5)\) in \(B(3, -1)\) v pravokotnem koordinatnem sistemu.<br>"
    r"1.1. Izračunaj razdaljo med točkama \(A\) in \(B\). Zapiši razdaljo točke \(A\) od osi \(x\) in razdaljo točke \(B\) od osi \(y\). (5 točk)<br>"
    r"1.2. Zapiši enačbo premice skozi točki \(A\) in \(B\). (4 točke)<br>"
    r"1.3. V koordinatni sistem nariši premico \(y = 3x - 4\). Zapiši enačbo premice, ki je vzporedna premici \(y = 3x - 4\) in poteka skozi točko \(A\). (6 točk)",
    r"1.1. \(6\sqrt{2} \approx 8{,}49\); \(5\); \(3\) &nbsp; 1.2. \(y = -x + 2\) &nbsp; 1.3. \(y = 3x + 14\)",
    [
        "## 1.1",
        ("d(A, B) = " + K("(3 + 3)<sup>2</sup> + (−1 − 5)<sup>2</sup>") + " = " + K("72"), "", "razdalja"),
        ("!d(A, B) = 6" + K("2") + " ≈ 8,49", ""),
        ("!razdalja A od osi x: 5", "Absolutna vrednost ordinate."),
        ("!razdalja B od osi y: 3", "Absolutna vrednost abscise."),
        "## 1.2",
        ("k = " + U("−1 − 5", "3 + 3") + " = −1", "", "premica"),
        ("y − 5 = −(x + 3)", ""),
        ("!y = −x + 2", ""),
        "## 1.3",
        ("@slika", graf([(lambda x: 3 * x - 4, MODRA), (lambda x: 3 * x + 14, RDECA)], (-6, 4), (-6, 8), [(-3, 5, "A"), (0, -4, ""), (2, 2, "")], sirina=280, visina=380)),
        ("Vzporedni premici imata enak smerni koeficient: k = 3.", ""),
        ("y − 5 = 3(x + 3)", ""),
        ("!y = 3x + 14", ""),
    ],
)


def trapez_b2(resitev=False):
    k = 11
    y0 = 110 + (9 * k if resitev else 0)
    A, B = (25, y0), (25 + 20 * k, y0)
    D, C = (25, y0 - 6 * k), (25 + 12 * k, y0 - 6 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<polyline points="{A[0] + 8},{A[1]} {A[0] + 8},{A[1] - 8} {A[0]},{A[1] - 8}" fill="none" stroke="currentColor"/>',
         f'<polyline points="{D[0] + 8},{D[1]} {D[0] + 8},{D[1] + 8} {D[0]},{D[1] + 8}" fill="none" stroke="currentColor"/>',
         napis(A[0] - 9, A[1] + 4, "A"), napis(B[0] + 9, B[1] + 4, "B"), napis(C[0] + 6, C[1] - 6, "C"), napis(D[0] - 9, D[1] + 2, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "a", 12), napis((D[0] + C[0]) / 2, D[1] - 6, "c", 12), napis(A[0] - 10, (A[1] + D[1]) / 2 + 4, "d", 12),
         napis((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 4, "b", 12)]
    if resitev:
        E = (25, y0 - 15 * k)
        t += [f'<line x1="{D[0]}" y1="{D[1]}" x2="{E[0]}" y2="{E[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
              f'<line x1="{C[0]}" y1="{C[1]}" x2="{E[0]}" y2="{E[1]}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
              napis(E[0] - 9, E[1] + 4, "E", 12, RDECA), napis(E[0] - 10, (E[1] + D[1]) / 2, "x", 12, RDECA)]
    return svg(270, y0 + 25, "".join(t), opis="Pravokotni trapez ABCD" + (" s točko E" if resitev else ""))


b2 = naloga(
    "B2", "geometrija_ravnine", 15,
    r"Dan je pravokotni trapez \(ABCD\) na sliki: \(a = 20\) cm, \(c = 12\) cm in \(d = 6\) cm." + trapez_b2()
    + r"2.1. Izračunaj dolžino stranice \(b\) in obseg trapeza. (6 točk)<br>"
    r"2.2. Izračunaj ploščino trapeza. (3 točke)<br>"
    r"2.3. Skozi točki \(A\) in \(D\) ter \(B\) in \(C\) nariši premici. Njuno presečišče označi z \(E\). Izračunaj dolžino daljice \(DE\). (6 točk)",
    r"2.1. \(b = 10\) cm, \(o = 48\) cm &nbsp; 2.2. \(S = 96\ \mathrm{cm^2}\) &nbsp; 2.3. \(DE = 9\) cm",
    [
        "## 2.1",
        ("b je hipotenuza pravokotnega trikotnika s katetama a − c = 8 cm in d = 6 cm", ""),
        ("!b = " + K("8<sup>2</sup> + 6<sup>2</sup>") + " = 10 cm", "", "pitagora"),
        ("!o = 20 + 10 + 12 + 6 = 48 cm", ""),
        "## 2.2",
        ("!S = " + U("a + c", "2") + " · d = " + U("32", "2") + " · 6 = 96 cm<sup>2</sup>", "Krak d je višina trapeza.", "ploscine"),
        "## 2.3",
        ("@slika", trapez_b2(True)),
        (U("x", "x + 6") + " = " + U("12", "20"), "Trikotnika DCE in ABE sta podobna (DC ∥ AB)."),
        ("20x = 12x + 72", ""),
        ("!DE = x = 9 cm", ""),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Brata Luka in Nik ter sestra Ema živijo s staršema v petčlanski družini.<br>"
    r"3.1. Starosti družinskih članov so členi aritmetičnega zaporedja. Najmlajši Luka je star \(14\) let; njegova starost je prvi člen zaporedja. "
    r"Oče je star \(47\) let; njegova starost je dvanajsti člen. Starosti Nika, Eme in mame so po vrsti drugi, tretji in deseti člen. Dopolni preglednico. (6 točk)"
    + tabela(["Luka", "Nik", "Ema", "Mama", "Oče"], [[r"\(a_1\)", r"\(a_2\)", r"\(a_3\)", r"\(a_{10}\)", r"\(a_{12}\)"], ["14", "", "", "", "47"]])
    + r"3.2. Luka, Nik in Ema so skupaj dobili \(238\) EUR štipendije. Luka je dobil enako kot Nik, Ema pa \(50\,\%\) več kot Nik. Koliko je dobil vsak? (5 točk)<br>"
    r"3.3. Starša sta za tri leta v banko vložila \(12\,000\) EUR, ki so narasli na \(13\,112{,}72\) EUR. Banka obrestuje obrestnoobrestno z letnim pripisom obresti. "
    r"Izračunaj letno obrestno mero. (4 točke)",
    r"3.1. \(17, 20, 41\) &nbsp; 3.2. Luka in Nik po \(68\) EUR, Ema \(102\) EUR &nbsp; 3.3. \(3\,\%\)",
    [
        "## 3.1",
        ("a<sub>12</sub> = a<sub>1</sub> + 11d  ⇒  47 = 14 + 11d  ⇒  d = 3", "", "aritmeticno"),
        ("@slika", tabela(["Luka", "Nik", "Ema", "Mama", "Oče"], [["14", "17", "20", "41", "47"]])),
        ("!a<sub>2</sub> = 17, a<sub>3</sub> = 20, a<sub>10</sub> = 14 + 27 = 41", ""),
        "## 3.2",
        ("x + x + 1,5x = 238  ⇒  3,5x = 238", "x je Nikova štipendija."),
        ("!Luka in Nik: x = 68 EUR", ""),
        ("!Ema: 1,5 · 68 = 102 EUR", ""),
        "## 3.3",
        ("12 000 · r<sup>3</sup> = 13 112,72", "r je obrestovalni faktor.", "obresti"),
        ("r = ∛(1,09273) ≈ 1,03", ""),
        ("!p = 3 %", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
