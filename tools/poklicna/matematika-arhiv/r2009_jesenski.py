# Jesenski rok 2009 (uradna pola RIC P092-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2009, "jesenski", "torek, 25. avgust 2009"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Z DA označi pravilne enakosti, z NE pa napačne.<br>"
    r"a) \(y + y + y = y^3\) &nbsp; b) \(3x \cdot 3x = 9x^2\) &nbsp; c) \(a^3 \cdot a^{-3} = 0\) &nbsp; d) \((x^2)^3 = x^6\)",
    r"a) NE &nbsp; b) DA &nbsp; c) NE &nbsp; d) DA",
    [
        ("!a) y + y + y = 3y  ⇒  NE", "Seštevanje enakih členov ni potenciranje."),
        ("!b) 3x · 3x = 9x<sup>2</sup>  ⇒  DA", "", "potence"),
        ("!c) a<sup>3</sup> · a<sup>−3</sup> = a<sup>0</sup> = 1  ⇒  NE", ""),
        ("!d) (x<sup>2</sup>)<sup>3</sup> = x<sup>2 · 3</sup> = x<sup>6</sup>  ⇒  DA", ""),
    ],
)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Izračunaj natančno vrednost izraza \(3 - 2\sqrt[3]{64} + 5\sqrt[4]{81}\).",
    r"\(10\)",
    [
        ("∛64 = 4,  ∜81 = 3", "4³ = 64 in 3⁴ = 81.", "koreni"),
        ("!3 − 2 · 4 + 5 · 3 = 3 − 8 + 15 = 10", ""),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Na kolesarski tekmi je odstopilo \(15\,\%\) tekmovalcev. Skozi cilj je pripeljalo \(102\) kolesarja. Koliko je bilo vseh tekmovalcev?",
    r"\(120\)",
    [
        ("v cilju: 100 % − 15 % = 85 %", ""),
        ("0,85 · x = 102", "", "odstotki"),
        ("!x = " + U("102", "0,85") + " = 120 tekmovalcev", ""),
    ],
)

P4 = lambda x: 0.5 * (x + 2) * (x + 1) * (x - 1) * (x - 3)


def risba_a4(X, Y):
    t = krivulja(X, Y, P4, -2.6, 3.35, MODRA)
    for x in (-2, -1, 1, 3):
        t += tocka(X, Y, x, 0)
    return t + tocka(X, Y, 0, 3)


a4 = naloga(
    "A4", "polinomi_racionalna", 4,
    r"Na sliki je graf polinoma četrte stopnje. Zapiši ničle polinoma in presečišče grafa z ordinatno osjo." + mreza((-3, 4), (-8, 10), risba_a4, sirina=240, visina=380),
    r"ničle \(-2, -1, 1, 3\); \((0, 3)\)",
    [
        ("!x<sub>1</sub> = −2,  x<sub>2</sub> = −1,  x<sub>3</sub> = 1,  x<sub>4</sub> = 3", "Ničle preberemo tam, kjer graf seka os x."),
        ("!presečišče z osjo y: (0, 3)", ""),
        (None, "Iz ničel in točke (0, 3) lahko zapišemo tudi predpis p(x) = ½(x + 2)(x + 1)(x − 1)(x − 3)."),
    ],
)

a5 = naloga(
    "A5", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(\log(3x - 2) = 2\).",
    r"\(x = 34\)",
    [
        ("3x − 2 = 10<sup>2</sup> = 100", "Pogoj: 3x − 2 > 0.", "logaritem"),
        ("!x = 34", "Rešitev ustreza pogoju."),
    ],
)


def trikotnik_a6():
    A, B, C = (55, 130), (235, 130), (55, 55)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {A[0]} {A[1] - 10} h 10 v 10" fill="none" stroke="currentColor"/>',
         napis(A[0] - 4, 97, "x − 7", 11, sidro="end"), napis(145, 145, "x", 12), napis(153, 84, "x + 1", 11, sidro="start")]
    return svg(255, 155, "".join(t), opis="Pravokotni trikotnik s stranicami x − 7, x, x + 1")


a6 = naloga(
    "A6", "trikotnik_kotne", 5,
    r"Stranice pravokotnega trikotnika merijo \(x - 7\), \(x\) in \(x + 1\) (v cm), kakor kaže skica. Izračunaj stranice trikotnika." + trikotnik_a6(),
    r"\(5\) cm, \(12\) cm, \(13\) cm",
    [
        ("(x − 7)<sup>2</sup> + x<sup>2</sup> = (x + 1)<sup>2</sup>", "Najdaljša stranica x + 1 je hipotenuza.", "pitagora"),
        ("x<sup>2</sup> − 14x + 49 + x<sup>2</sup> = x<sup>2</sup> + 2x + 1  ⇒  x<sup>2</sup> − 16x + 48 = 0", ""),
        ("(x − 4)(x − 12) = 0", "", "kvadratna"),
        ("x = 12", "Pri x = 4 bi bila stranica x − 7 negativna."),
        ("!stranice: 5 cm, 12 cm, 13 cm", ""),
    ],
)

a7 = naloga(
    "A7", "linearna_funkcija", 5,
    r"Nariši premico z enačbo \(y = 3x - 2\) in izračunaj njen naklonski kot na minuto natančno.",
    r"\(\varphi \approx 71^\circ 34'\)",
    [
        ("x = 0: y = −2,  x = 2: y = 4", "", "premica"),
        ("@slika", graf([(lambda x: 3 * x - 2, MODRA)], (-2, 3), (-4, 5), [(0, -2, ""), (2, 4, "")], sirina=220, visina=360)),
        ("tan φ = k = 3", "Naklonski kot ima tangens enak smernemu koeficientu.", "kotne"),
        ("!φ ≈ 71,57° = 71° 34′", ""),
    ],
)


def lik_a8():
    s = 17
    o = 30
    a = 8 * s
    vh = a * math.sqrt(3) / 2
    T = (o + a / 2, o + a - vh)
    t = [f'<path d="M {o} {o} h {a} v {a} h {-a} Z M {o} {o + a} L {T[0]:.1f} {T[1]:.1f} L {o + a} {o + a} Z" fill="{MODRA}" fill-opacity="0.3" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{o}" y1="{o + a}" x2="{o + a}" y2="{o + a}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(o + a / 2, o - 6, "8 cm", 11), napis(o - 5, o + a / 2, "8 cm", 11, sidro="end"),
         napis(o + a / 2 - 32, o + a / 2 + 30, "8 cm", 10), napis(o + a / 2 + 32, o + a / 2 + 30, "8 cm", 10)]
    return svg(o + a + 20, o + a + 15, "".join(t), opis="Kvadrat brez enakostraničnega trikotnika")


a8 = naloga(
    "A8", "obsegi_ploscine", 5,
    r"Na eno decimalno mesto natančno izračunaj ploščino osenčenega lika. Lik je kvadrat s stranico \(8\) cm, iz katerega je izrezan enakostranični trikotnik s stranico \(8\) cm." + lik_a8(),
    r"\(S \approx 36{,}3\ \mathrm{cm^2}\)",
    [
        ("S<sub>kv</sub> = 8<sup>2</sup> = 64 cm<sup>2</sup>", "", "ploscine"),
        ("S<sub>tr</sub> = " + U("a<sup>2</sup>" + K("3"), "4") + " = " + U("64" + K("3"), "4") + " = 16" + K("3") + " ≈ 27,71 cm<sup>2</sup>", "Ploščina enakostraničnega trikotnika."),
        ("!S = 64 − 16" + K("3") + " ≈ 36,3 cm<sup>2</sup>", ""),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Dopolni manjkajoče člene geometrijskih zaporedij in zapiši njuna količnika.<br>"
    r"a) \(64, 16, 4, \square\) &nbsp; b) \(3, \square, 12, 24\)",
    r"a) \(1\), \(q = \frac{1}{4}\) &nbsp; b) \(6\), \(q = 2\)",
    [
        ("a) q = " + U("16", "64") + " = " + U("1", "4"), "", "geometrijsko"),
        ("!a) manjkajoči člen: 4 · " + U("1", "4") + " = 1,  q = " + U("1", "4"), ""),
        ("b) q = " + U("24", "12") + " = 2", ""),
        ("!b) manjkajoči člen: 3 · 2 = 6,  q = 2", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
FB1 = lambda x: (x + 3) / (x + 1) ** 2

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x + 3}{x^2 + 2x + 1}\).<br>"
    r"1.1. Določi ničlo, pol, enačbo vodoravne asimptote in presečišče grafa z ordinatno osjo. (4 točke)<br>"
    r"1.2. Nariši graf funkcije. (5 točk)<br>"
    r"1.3. Reši enačbo \(f(x) = \dfrac{2}{x + 1}\). (6 točk)",
    r"1.1. ničla \(-3\), pol \(-1\) (dvojni), \(y = 0\), \((0, 3)\) &nbsp; 1.3. \(x = 1\)",
    [
        "## 1.1",
        ("f(x) = " + U("x + 3", "(x + 1)<sup>2</sup>"), "", "racionalna"),
        ("!ničla x = −3", ""),
        ("!pol x = −1 (dvojni)", "Ob polu graf ne spremeni predznaka."),
        ("!asimptota y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("!presečišče z osjo y: (0, 3)", ""),
        "## 1.2",
        ("f(1) = 1,  f(−2) = 1,  f(−5) = −" + U("1", "8"), "Nekaj dodatnih točk."),
        ("@slika", graf([(FB1, MODRA), (lambda x: 0, RDECA)], (-7, 4), (-2, 6), [(-3, 0, ""), (0, 3, ""), (1, 1, ""), (-2, 1, "")], sirina=300, visina=230)),
        "## 1.3",
        (U("x + 3", "(x + 1)<sup>2</sup>") + " = " + U("2", "x + 1"), "Pogoj: x ≠ −1."),
        ("x + 3 = 2(x + 1)  ⇒  x + 3 = 2x + 2", "Pomnožimo z (x + 1)²."),
        ("!x = 1", "Rešitev ustreza pogoju."),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 15,
    r"Dijaki so zbirali prostovoljne prispevke. Sodelovalo je \(12\) dijakov. Zbrani zneski tvorijo naraščajoče aritmetično zaporedje. Najmanjši znesek je bil \(8\) EUR, peti pa \(14\) EUR.<br>"
    r"2.1. Kolikšen je dvanajsti (največji) znesek? (6 točk)<br>"
    r"2.2. Koliko so zbrali vsi skupaj? (4 točke)<br>"
    r"2.3. Koliko odstotkov zbranih sredstev predstavlja največji znesek? (5 točk)",
    r"2.1. \(24{,}50\) EUR &nbsp; 2.2. \(195\) EUR &nbsp; 2.3. \(\approx 12{,}56\,\%\)",
    [
        "## 2.1",
        ("a<sub>5</sub> = a<sub>1</sub> + 4d  ⇒  14 = 8 + 4d", "", "aritmeticno"),
        ("d = 1,50 EUR", ""),
        ("!a<sub>12</sub> = 8 + 11 · 1,5 = 24,50 EUR", ""),
        "## 2.2",
        ("!s<sub>12</sub> = " + U("12 · (8 + 24,5)", "2") + " = 195 EUR", ""),
        "## 2.3",
        ("p = " + U("24,5", "195") + " · 100 %", "", "odstotki"),
        ("!p ≈ 12,56 %", ""),
    ],
)


def valj():
    cx, r, ry, yv, yd = 100, 60, 12, 30, 170
    t = [f'<path d="M {cx - r} {yv} L {cx - r} {yd} A {r} {ry} 0 0 0 {cx + r} {yd} L {cx + r} {yv} A {r} {ry} 0 0 0 {cx - r} {yv} Z" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.3"/>',
         f'<ellipse cx="{cx}" cy="{yv}" rx="{r}" ry="{ry}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {cx - r} {yd} A {r} {ry} 0 0 1 {cx + r} {yd}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{cx - r}" y1="{yd}" x2="{cx + r}" y2="{yv}" stroke="{RDECA}" stroke-width="2"/>',
         f'<line x1="{cx - r}" y1="{yd}" x2="{cx + r}" y2="{yd}" stroke="currentColor" stroke-dasharray="3 2"/>',
         f'<line x1="{cx}" y1="{yv}" x2="{cx}" y2="{yd}" stroke="currentColor" stroke-dasharray="2 3" stroke-opacity="0.6"/>',
         f'<path d="M {cx - r + 22} {yd} A 22 22 0 0 0 {cx - r + 22 * 0.64:.1f} {yd - 22 * 0.768:.1f}" fill="none" stroke="{RDECA}"/>',
         napis(cx - r + 26, yd - 12, "φ", 12, RDECA, "start"), napis(cx + r + 6, 100, "v = 12 cm", 11, sidro="start"),
         napis(cx + 30, yd + 26, "2r = 10 cm", 11), napis(cx + 18, 92, "d", 12, RDECA)]
    return svg(240, 200, "".join(t), opis="Valj z diagonalo osnega preseka")


b3 = naloga(
    "B3", "povrsine_prostornine", 15,
    r"Pravokotnik s stranicama \(12\) cm in \(5\) cm zavrtimo okoli daljše stranice za \(360^\circ\).<br>"
    r"3.1. Nariši skico in izračunaj površino nastalega valja. (6 točk)<br>"
    r"3.2. Izračunaj dolžino najdaljše toge palice, ki jo še lahko skrijemo v ta valj. (4 točke)<br>"
    r"3.3. Kolikšen kot oklepa ta palica z osnovno ploskvijo valja? Kot označi na skici. (5 točk)",
    r"3.1. \(170\pi \approx 534{,}07\ \mathrm{cm^2}\) &nbsp; 3.2. \(2\sqrt{61} \approx 15{,}62\) cm &nbsp; 3.3. \(\approx 50^\circ 12'\)",
    [
        "## 3.1",
        ("r = 5 cm,  v = 12 cm", "Daljša stranica je os in višina valja, krajša je polmer."),
        ("@slika", valj()),
        ("P = 2πr(r + v) = 2π · 5 · 17 = 170π", "", "telesa"),
        ("!P ≈ 534,07 cm<sup>2</sup>", ""),
        "## 3.2",
        ("d<sup>2</sup> = (2r)<sup>2</sup> + v<sup>2</sup> = 100 + 144 = 244", "Najdaljša palica je diagonala osnega preseka.", "pitagora"),
        ("!d = " + K("244") + " = 2" + K("61") + " ≈ 15,62 cm", ""),
        "## 3.3",
        ("tan φ = " + U("v", "2r") + " = " + U("12", "10") + " = 1,2", "", "kotne"),
        ("!φ ≈ 50,19° = 50° 12′", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
