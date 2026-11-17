# Spomladanski rok 2013 (uradna pola RIC P131-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2013, "spomladanski", "sobota, 8. junij 2013"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "eksponentna_logaritemska", 4,
    r"V vsaki vrstici izberi pravilni odgovor."
    + tabela(["", "", "", "", ""], [
        [r"\(\log_3 27\) je enak", r"\(\frac{1}{3}\)", r"\(3\)", r"\(9\)", r"\(27\)"],
        [r"\(27^{-\frac{1}{3}}\) je enako", r"\(-3\)", r"\(-9\)", r"\(\frac{1}{3}\)", r"\(\frac{1}{9}\)"],
        [r"Odvod funkcije \(f(x) = 4x^3\) je", r"\(12x^2\)", r"\(4x^2\)", r"\(12x\)", r"\(x^4\)"],
        [r"\(\frac{1 - \cos^2 x}{\sin x}\) je za \(\sin x \ne 0\) enako", r"\(\sin x\)", r"\(\cos x\)", r"\(1\)", r"\(\tan x\)"]]),
    r"\(3\); \(\frac{1}{3}\); \(12x^2\); \(\sin x\)",
    [
        ("!log<sub>3</sub> 27 = 3", "3³ = 27.", "logaritem"),
        ("!27<sup>−1/3</sup> = " + U("1", "∛27") + " = " + U("1", "3"), "", "potence"),
        ("!f'(x) = 12x<sup>2</sup>", "(xⁿ)' = n·xⁿ⁻¹.", "odvod"),
        ("!" + U("1 − cos<sup>2</sup> x", "sin x") + " = " + U("sin<sup>2</sup> x", "sin x") + " = sin x", "sin² x + cos² x = 1.", "kotne"),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Strošek embalaže nekega izdelka znaša \(36\) EUR, kar je \(15\,\%\) cene izdelka. Kolikšna je cena izdelka?",
    r"\(240\) EUR",
    [
        ("0,15 · x = 36", "", "odstotki"),
        ("!x = 240 EUR", ""),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Reši enačbo \(\dfrac{a + 2}{3} - \dfrac{a - 4}{4} = 2\).",
    r"\(a = 4\)",
    [
        ("4(a + 2) − 3(a − 4) = 24", "Enačbo pomnožimo z 12."),
        ("4a + 8 − 3a + 12 = 24", "Pozor na predznak pred oklepajem."),
        ("!a = 4", ""),
    ],
)

a4 = naloga(
    "A4", "kombinatorika_verjetnost", 4,
    r"Pri nakupu novega avtomobila lahko kupec izbira med \(6\) barvami, \(4\) paketi notranje opreme ter dizelskim, bencinskim ali hibridnim motorjem. "
    r"Med koliko različicami avtomobila lahko izbira?",
    r"\(72\)",
    [
        ("6 · 4 · 3", "Osnovni izrek kombinatorike.", "kombinatorika"),
        ("!72 različic", ""),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"Jaka je na počitnicah prvi dan porabil \(90\) EUR, nato vsak dan \(15\) EUR manj kot prejšnji dan. Koliko je porabil četrti dan in koliko skupaj v petih dneh?",
    r"\(45\) EUR; \(300\) EUR",
    [
        ("a<sub>1</sub> = 90, d = −15", "", "aritmeticno"),
        ("!a<sub>4</sub> = 90 + 3 · (−15) = 45 EUR", ""),
        ("S<sub>5</sub> = " + U("5", "2") + " · (2 · 90 + 4 · (−15)) = " + U("5", "2") + " · 120", ""),
        ("!S<sub>5</sub> = 300 EUR", ""),
    ],
)

a6 = naloga(
    "A6", "polinomi_racionalna", 5,
    r"Izračunaj ničlo in pol ter zapiši enačbo vodoravne asimptote funkcije \(f(x) = \dfrac{3x - 3}{x + 2}\). Skiciraj graf funkcije.",
    r"ničla \(1\), pol \(-2\), \(y = 3\)",
    [
        ("!ničla: x = 1", "", "racionalna"),
        ("!pol: x = −2", ""),
        ("!asimptota: y = 3", "Razmerje vodilnih koeficientov 3 : 1."),
        ("@slika", graf([(lambda x: (3 * x - 3) / (x + 2), MODRA), (lambda x: 3, RDECA)], (-9, 6), (-6, 12), [(1, 0, ""), (0, -1.5, "")], sirina=300, visina=360)),
        (None, "Začetna vrednost f(0) = −3/2 pomaga pri skici."),
    ],
)


def izsek():
    r = 70
    t = [f'<path d="M 20 100 L {20 + r} 100 A {r} {r} 0 0 0 20 {100 - r} Z" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {20 + r} 100 A {r} {r} 0 0 0 20 {100 - r}" fill="none" stroke="{RDECA}" stroke-width="2.5"/>',
         '<polyline points="30,100 30,90 20,90" fill="none" stroke="currentColor"/>',
         napis(55, 112, "r", 12), napis(80, 45, "l", 12, RDECA)]
    return svg(110, 120, "".join(t), opis="Krožni izsek s središčnim kotom 90°")

a7 = naloga(
    "A7", "obsegi_ploscine", 5,
    r"Krožni izsek s središčnim kotom \(90^\circ\) ima ploščino \(9\ \mathrm{cm^2}\). Nariši skico in izračunaj natančno dolžino pripadajočega krožnega loka.",
    r"\(l = 3\sqrt{\pi}\) cm \(\approx 5{,}32\) cm",
    [
        ("@slika", izsek()),
        (U("πr<sup>2</sup>", "4") + " = 9  ⇒  r<sup>2</sup> = " + U("36", "π") + "  ⇒  r = " + U("6", K("π")), "Izsek je četrtina kroga.", "krog"),
        ("l = " + U("2πr", "4") + " = " + U("π", "2") + " · " + U("6", K("π")) + " = " + U("3π", K("π")), ""),
        ("!l = 3" + K("π") + " cm", "π/√π = √π; približno 5,32 cm."),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Na sliki je graf eksponentne funkcije \(f(x) = a^x\). Z grafa odčitaj ustrezen podatek, izračunaj osnovo \(a\) in zapiši predpis funkcije. "
    r"Zapiši definicijsko območje in zalogo vrednosti funkcije."
    + graf([(lambda x: (1 / 3) ** x, MODRA)], (-4, 4), (-2, 6), [(-1, 3, ""), (0, 1, "")], sirina=280, visina=290),
    r"\(a = \frac{1}{3}\), \(f(x) = \left(\frac{1}{3}\right)^x\), \(D_f = \mathbb{R}\), \(Z_f = (0, \infty)\)",
    [
        ("graf gre skozi (−1, 3)", "Odčitamo s slike."),
        ("a<sup>−1</sup> = 3  ⇒  a = " + U("1", "3"), "", "eksponentna"),
        ("!f(x) = (" + U("1", "3") + ")<sup>x</sup>", ""),
        ("!D<sub>f</sub> = ℝ,  Z<sub>f</sub> = (0, ∞)", "Graf se z desne bliža osi x, a je ne doseže."),
    ],
)

a9 = naloga(
    "A9", "linearna_funkcija", 5,
    r"Izračunaj ničlo in začetno vrednost funkcije \(f(x) = -3x + 6\) in nariši njen graf. Zapiši interval, na katerem je funkcija negativna.",
    r"ničla \(2\), \(f(0) = 6\), negativna na \((2, \infty)\)",
    [
        ("!ničla: −3x + 6 = 0  ⇒  x = 2", "", "premica"),
        ("!f(0) = 6", ""),
        ("@slika", graf([(lambda x: -3 * x + 6, MODRA)], (-1, 4), (-6, 8), [(2, 0, ""), (0, 6, "")], sirina=220, visina=380)),
        ("!f(x) < 0 za x ∈ (2, ∞)", "Funkcija pada, desno od ničle je graf pod osjo x."),
    ],
)

# ------------------------------------------------------------------ 2. del
P = lambda x: x ** 3 - 3 * x * x - 9 * x - 5

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 - 3x^2 - 9x - 5\).<br>"
    r"1.1. Izračunaj ničle in začetno vrednost polinoma. (6 točk)<br>"
    r"1.2. Skiciraj graf polinoma in zapiši, za katere \(x\) je polinom pozitiven. (4 točke)<br>"
    r"1.3. Izračunaj, pri katerih \(x\) je tangenta na graf vzporedna z abscisno osjo. (5 točk)",
    r"1.1. \(-1\) (dvojna), \(5\); \(p(0) = -5\) &nbsp; 1.2. \(x \in (5, \infty)\) &nbsp; 1.3. \(x = -1\), \(x = 3\)",
    [
        "## 1.1",
        ("p(−1) = −1 − 3 + 9 − 5 = 0", "Ničlo ugibamo med delitelji števila 5.", "horner"),
        ("p(x) = (x + 1)(x<sup>2</sup> − 4x − 5) = (x + 1)<sup>2</sup>(x − 5)", "Hornerjev algoritem: 1, −4, −5, ostanek 0."),
        ("!x<sub>1,2</sub> = −1,  x<sub>3</sub> = 5", ""),
        ("!p(0) = −5", ""),
        "## 1.2",
        ("@slika", graf([(P, MODRA)], (-2.6, 5.3), (-36, 12), [(-1, 0, ""), (5, 0, ""), (0, -5, ""), (3, -32, "")], sirina=300, visina=400)),
        ("!p(x) > 0 za x ∈ (5, ∞)", "Pri dvojni ničli −1 graf ne spremeni predznaka."),
        "## 1.3",
        ("p'(x) = 3x<sup>2</sup> − 6x − 9 = 3(x − 3)(x + 1)", "", "odvod"),
        ("!x = −1 ali x = 3", "Vodoravna tangenta ima smerni koeficient 0.", "tangenta"),
    ],
)


def pravokotnik_b2(X, Y):
    return (f'<polygon points="{X(0)},{Y(1)} {X(9)},{Y(1)} {X(9)},{Y(4)} {X(0)},{Y(4)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.6"/>'
            + f'<line x1="{X(3)}" y1="{Y(1)}" x2="{X(9)}" y2="{Y(2.5)}" stroke="{RDECA}" stroke-width="1.8"/>'
            + tocka(X, Y, 0, 1, "A", -12, 14) + tocka(X, Y, 9, 1, "B", 4, 14) + tocka(X, Y, 9, 4, "C", 4, -4) + tocka(X, Y, 0, 4, "D", 4, -4)
            + tocka(X, Y, 3, 1, "T", -3, 14) + tocka(X, Y, 9, 2.5, "S", 5, 4))

b2 = naloga(
    "B2", "geometrija_ravnine", 15,
    r"Oglišča pravokotnika so \(A(0, 1)\), \(B(9, 1)\), \(C(9, 4)\) in \(D(0, 4)\).<br>"
    r"2.1. Nariši pravokotnik in izračunaj njegov obseg. (5 točk)<br>"
    r"2.2. Točka \(T\) leži na \(AB\) tako, da je \(AT : TB = 1 : 2\), točka \(S\) pa razpolavlja \(BC\). Nariši \(T\) in \(S\) ter izračunaj dolžino \(TS\). (6 točk)<br>"
    r"2.3. Pravokotnik \(ABCD\) je plašč tristrane prizme z višino \(v = 3\) in osnovno ploskvijo v obliki enakostraničnega trikotnika. Izračunaj prostornino prizme. (4 točke)",
    r"2.1. \(o = 24\) &nbsp; 2.2. \(TS \approx 6{,}18\) &nbsp; 2.3. \(V = \frac{27\sqrt{3}}{4} \approx 11{,}69\)",
    [
        "## 2.1",
        ("@slika", mreza((-1, 10), (-1, 5), pravokotnik_b2, sirina=320)),
        ("AB = 9, BC = 3", ""),
        ("!o = 2(9 + 3) = 24", ""),
        "## 2.2",
        ("AT = " + U("1", "3") + " · 9 = 3  ⇒  T(3, 1)", ""),
        ("S je središče BC  ⇒  S(9; 2,5)", ""),
        ("TS = " + K("6<sup>2</sup> + 1,5<sup>2</sup>") + " = " + K("38,25"), "", "razdalja"),
        ("!TS ≈ 6,18", ""),
        "## 2.3",
        ("obseg osnovne ploskve = 9  ⇒  a = 3", "Dolžina plašča (9) je obseg trikotnika, širina (3) je višina prizme."),
        ("O = " + U("a<sup>2</sup>" + K("3"), "4") + " = " + U("9" + K("3"), "4"), "", "ploscine"),
        ("!V = O · v = " + U("27" + K("3"), "4") + " ≈ 11,69", "", "telesa"),
    ],
)

RAZ = ["nad 600 do 700", "nad 700 do 800", "nad 800 do 900", "nad 900 do 1000", "nad 1000 do 1100"]
FR = [120, 200, 160, 80, 40]


def histogram():
    t = [f'<line x1="40" y1="{150 - j * 0.6}" x2="300" y2="{150 - j * 0.6}" stroke="currentColor" stroke-opacity="{0.6 if j == 0 else 0.12}"/>'
         + napis(36, 154 - j * 0.6, str(j), 9, sidro="end") for j in range(0, 201, 50)]
    t += [f'<rect x="{45 + i * 50}" y="{150 - f * 0.6}" width="50" height="{f * 0.6}" fill="{MODRA}" fill-opacity="0.7" stroke="currentColor" stroke-width="0.6"/>'
          + napis(45 + i * 50, 164, str(600 + 100 * i), 9) for i, f in enumerate(FR)]
    t.append(napis(295, 164, "1100", 9))
    t.append(napis(170, 180, "plača (EUR)", 10))
    return svg(310, 188, "".join(t), opis="Histogram plač")

b3 = naloga(
    "B3", "statistika_pm", 15,
    r"V preglednici so plače delavcev nekega podjetja (izmišljeni podatki)."
    + tabela(["Razred", "Plača (EUR)", "Absolutna frekvenca", "Relativna frekvenca"], [[str(i + 1), r, str(f), ""] for i, (r, f) in enumerate(zip(RAZ, FR))])
    + r"3.1. Dopolni preglednico z relativnimi frekvencami in izračunaj, koliko odstotkov delavcev zasluži več kot \(900\) EUR. (6 točk)<br>"
    r"3.2. Izračunaj povprečno plačo (uporabi sredine razredov) in podatke prikaži s histogramom. (6 točk)<br>"
    r"3.3. Kolikšna je verjetnost, da je naključno izbrani delavec v petem plačnem razredu? (3 točke)",
    r"3.1. \(20\,\%\) &nbsp; 3.2. \(\approx 803{,}33\) EUR &nbsp; 3.3. \(\frac{1}{15}\)",
    [
        "## 3.1",
        ("n = 120 + 200 + 160 + 80 + 40 = 600", ""),
        ("@slika", tabela(["Razred", "f", "f/n"], [[str(i + 1), str(f), f"{100 * f / 600:.1f} %".replace(".", ",")] for i, f in enumerate(FR)])),
        ("!nad 900 EUR: " + U("80 + 40", "600") + " = 20 %", "", "odstotki"),
        "## 3.2",
        ("x̄ = " + U("120 · 650 + 200 · 750 + 160 · 850 + 80 · 950 + 40 · 1050", "600") + " = " + U("482 000", "600"), "", "statistika"),
        ("!x̄ ≈ 803,33 EUR", ""),
        ("@slika", histogram()),
        "## 3.3",
        ("!P = " + U("40", "600") + " = " + U("1", "15") + " ≈ 0,067", "", "verjetnost"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
