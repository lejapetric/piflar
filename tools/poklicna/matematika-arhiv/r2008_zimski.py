# Zimski rok 2008 (uradna pola RIC P083-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2008, "zimski", "sreda, 11. februar 2009"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"Dano je število \(3\,471\,516\). Za vsako trditev zapiši DA, če je pravilna, in NE, če je napačna. Število je deljivo z: "
    r"\(1\), \(2\), \(3\), \(4\), \(5\), \(6\), \(9\), \(10\).",
    r"\(1, 2, 3, 4, 6, 9\): DA; \(5, 10\): NE",
    [
        ("vsota števk: 3 + 4 + 7 + 1 + 5 + 1 + 6 = 27", "Pravili za deljivost s 3 in 9."),
        ("!z 1: DA,  z 2: DA (sodo),  s 3: DA,  z 9: DA (27 je deljivo z 9)", ""),
        ("!s 4: DA (16 je deljivo s 4),  s 6: DA (deljivo z 2 in 3)", "Pri deljivosti s 4 gledamo zadnji dve števki."),
        ("!s 5: NE,  z 10: NE (zadnja števka je 6)", ""),
    ],
)

a2 = naloga(
    "A2", "polinomi_racionalna", 4,
    r"Dan je polinom \(p(x) = 3x^5 - x^2 + 7\). Zapiši: a) stopnjo polinoma, b) prosti člen, c) vodilni koeficient, d) \(p(0)\).",
    r"a) \(5\) &nbsp; b) \(7\) &nbsp; c) \(3\) &nbsp; d) \(7\)",
    [
        ("!a) stopnja: 5", "Najvišja potenca spremenljivke."),
        ("!b) prosti člen: 7", ""),
        ("!c) vodilni koeficient: 3", "Koeficient pri najvišji potenci."),
        ("!d) p(0) = 7", "Vrednost polinoma v 0 je enaka prostemu členu."),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Reši sistem enačb: \(x + 2y = 7\), \(3x - 4y = 1\).",
    r"\(x = 3\), \(y = 2\)",
    [
        ("x = 7 − 2y", "Iz prve enačbe izrazimo x.", "sistem"),
        ("3(7 − 2y) − 4y = 1  ⇒  21 − 10y = 1", ""),
        ("!y = 2", ""),
        ("!x = 7 − 4 = 3", ""),
    ],
)

a4 = naloga(
    "A4", "trikotnik_kotne", 4,
    r"V trikotniku merita stranici \(c = 12\) cm in \(b = 9\) cm, kot med njima pa \(48^\circ\). Izračunaj dolžino stranice \(a\) na centimeter natančno.",
    r"\(a \approx 9\) cm",
    [
        ("a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc cos α = 81 + 144 − 216 cos 48°", "", "kosinusni"),
        ("a<sup>2</sup> ≈ 225 − 144,53 = 80,47", ""),
        ("!a ≈ 8,97 cm ≈ 9 cm", ""),
    ],
)

a5 = naloga(
    "A5", "kvadratna_funkcija", 4,
    r"Natančno nariši graf funkcije \(f(x) = x^2 + 6x + 9\).",
    r"\(f(x) = (x + 3)^2\), teme \(T(-3, 0)\), \(f(0) = 9\)",
    [
        ("f(x) = (x + 3)<sup>2</sup>", "Popolni kvadrat."),
        ("teme T(−3, 0) je hkrati dvojna ničla", "", "teme"),
        ("f(0) = 9,  f(−6) = 9", "Točki simetrični glede na os x = −3."),
        ("@slika", graf([(lambda x: (x + 3) ** 2, MODRA)], (-6.2, 0.2), (-1, 10), [(-3, 0, "T"), (0, 9, ""), (-6, 9, ""), (-1, 4, ""), (-5, 4, "")], sirina=240, visina=320)),
    ],
)

a6 = naloga(
    "A6", "ulomki_odstotki", 5,
    r"Dani sta števili \(a = 320\) in \(b = 150\). Število \(a\) povečaj za \(12{,}5\,\%\), število \(b\) pa zmanjšaj za \(30\,\%\). Izračunaj vsoto novih števil.",
    r"\(465\)",
    [
        ("a′ = 1,125 · 320 = 360", "", "odstotki"),
        ("b′ = 0,7 · 150 = 105", ""),
        ("!a′ + b′ = 465", ""),
    ],
)

a7 = naloga(
    "A7", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(\log_x (4x - 3) = 2\).",
    r"\(x = 3\)",
    [
        ("x<sup>2</sup> = 4x − 3", "Pogoji: x > 0, x ≠ 1, 4x − 3 > 0.", "logaritem"),
        ("x<sup>2</sup> − 4x + 3 = 0  ⇒  (x − 1)(x − 3) = 0", "", "kvadratna"),
        ("!x = 3", "x = 1 ni dovoljena osnova logaritma."),
    ],
)


def piramida_a8():
    A, B, C, D = (30, 160), (150, 160), (200, 125), (80, 125)
    O = (115, 142.5)
    V = (115, 25)
    ln = lambda P, Q, extra="": f'<line x1="{P[0]}" y1="{P[1]}" x2="{Q[0]}" y2="{Q[1]}" stroke="currentColor" stroke-width="1.3"{extra}/>'
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {V[0]},{V[1]}" fill="{MODRA}" fill-opacity="0.08"/>',
         ln(A, B), ln(B, C), ln(C, D, ' stroke-dasharray="4 3"'), ln(D, A, ' stroke-dasharray="4 3"'),
         ln(V, A), ln(V, B), ln(V, C), ln(V, D, ' stroke-dasharray="4 3"'),
         ln(V, O, ' stroke-dasharray="4 3"'), ln(A, O, f' stroke-dasharray="4 3"'),
         f'<path d="M 52 154.5 A 22 22 0 0 0 44 143" fill="none" stroke="{RDECA}" stroke-width="1.5"/>',
         napis(60, 148, "φ", 12, RDECA, "start"), napis(119, 90, "v", 12, sidro="start"), napis(64, 92, "s", 12, sidro="end"),
         napis(V[0], V[1] - 6, "V")]
    return svg(225, 180, "".join(t), opis="Pravilna štiristrana piramida s kotom med robom in osnovno ploskvijo")


a8 = naloga(
    "A8", "povrsine_prostornine", 5,
    r"Pravilna štiristrana piramida je visoka \(12\) cm, stranski rob meri \(13\) cm. Nariši skico piramide, označi kot \(\varphi\) med osnovno ploskvijo in stranskim robom ter ga izračunaj.",
    r"\(\varphi \approx 67^\circ 23'\)",
    [
        ("@slika", piramida_a8()),
        ("sin φ = " + U("v", "s") + " = " + U("12", "13"), "Višina, stranski rob in polovica diagonale tvorijo pravokotni trikotnik.", "kotne"),
        ("!φ ≈ 67,38° = 67° 23′", ""),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Števila \(3, x, 27\) so prvi trije členi geometrijskega zaporedja. Izračunaj \(x\) in zapiši peti člen zaporedja.",
    r"\(x = \pm 9\); \(a_5 = 243\)",
    [
        ("x<sup>2</sup> = 3 · 27 = 81", "Kvadrat srednjega člena je produkt sosednjih.", "geometrijsko"),
        ("!x = 9 ali x = −9", ""),
        ("q = 3 ali q = −3", ""),
        ("!a<sub>5</sub> = 3 · q<sup>4</sup> = 3 · 81 = 243", "V obeh primerih, ker je četrta potenca pozitivna."),
    ],
)

# ------------------------------------------------------------------ 2. del
FB1 = lambda x: (x * x - 4) / (x - 1) ** 2

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dana je funkcija \(f(x) = \dfrac{x^2 - 4}{x^2 - 2x + 1}\).<br>"
    r"1.1. Zapiši ničli in pol funkcije. (4 točke)<br>"
    r"1.2. Zapiši enačbo vodoravne asimptote in nariši graf funkcije. (6 točk)<br>"
    r"1.3. Natančno izračunaj \(f(0)\) in \(f\left(-\frac{1}{2}\right)\). (5 točk)",
    r"1.1. ničli \(\pm 2\), pol \(1\) (dvojni) &nbsp; 1.2. \(y = 1\) &nbsp; 1.3. \(f(0) = -4\), \(f\left(-\frac{1}{2}\right) = -\frac{5}{3}\)",
    [
        "## 1.1",
        ("f(x) = " + U("(x − 2)(x + 2)", "(x − 1)<sup>2</sup>"), "", "racionalna"),
        ("!ničli x = −2 in x = 2", ""),
        ("!pol x = 1 (dvojni)", ""),
        "## 1.2",
        ("!asimptota y = 1", "Števec in imenovalec sta iste stopnje, vodilna koeficienta sta 1."),
        ("graf seka asimptoto pri x = 2,5", "Iz x² − 4 = x² − 2x + 1."),
        ("@slika", graf([(FB1, MODRA), (lambda x: 1, RDECA)], (-6, 7), (-8, 3), [(-2, 0, ""), (2, 0, ""), (0, -4, "")], sirina=320, visina=270)),
        "## 1.3",
        ("!f(0) = " + U("−4", "1") + " = −4", ""),
        ("f(−" + U("1", "2") + ") = " + U(U("1", "4") + " − 4", U("9", "4")) + " = " + U("−" + U("15", "4"), U("9", "4")), ""),
        ("!f(−" + U("1", "2") + ") = −" + U("15", "9") + " = −" + U("5", "3"), ""),
    ],
)


def premici(X, Y):
    t = krivulja(X, Y, lambda x: 0.75 * x + 3, -5.5, 2, MODRA) + krivulja(X, Y, lambda x: -1.5 * x + 3, -1.3, 3.3, RDECA)
    t += tocka(X, Y, -4, 0, "A", -4, 14) + tocka(X, Y, 2, 0, "B", 4, 14) + tocka(X, Y, 0, 3, "C", 6, -4)
    return t


b2 = naloga(
    "B2", "linearna_funkcija", 15,
    r"Na sliki sta narisani premici." + mreza((-6, 4), (-2, 5), premici, sirina=300)
    + r"2.1. Zapiši koordinate točk \(A\), \(B\) in \(C\) ter izračunaj razdaljo med \(A\) in \(C\). (5 točk)<br>"
    r"2.2. Zapiši enačbo premice skozi točki \(B\) in \(C\). (5 točk)<br>"
    r"2.3. Izračunaj velikost kota \(\angle BCA\). (5 točk)",
    r"2.1. \(A(-4, 0)\), \(B(2, 0)\), \(C(0, 3)\), \(|AC| = 5\) &nbsp; 2.2. \(y = -\frac{3}{2}x + 3\) &nbsp; 2.3. \(\approx 86^\circ 49'\)",
    [
        "## 2.1",
        ("!A(−4, 0),  B(2, 0),  C(0, 3)", ""),
        ("!|AC| = " + K("4<sup>2</sup> + 3<sup>2</sup>") + " = 5", "", "razdalja"),
        "## 2.2",
        ("k = " + U("3 − 0", "0 − 2") + " = −" + U("3", "2"), "", "premica"),
        ("!y = −" + U("3", "2") + "x + 3", "Začetna vrednost je ordinata točke C."),
        "## 2.3",
        ("tan α<sub>1</sub> = " + U("3", "4") + "  ⇒  α<sub>1</sub> ≈ 36,87°", "Kot premice AC z osjo x (pri A)."),
        ("tan β<sub>1</sub> = " + U("3", "2") + "  ⇒  β<sub>1</sub> ≈ 56,31°", "Notranji kot trikotnika ABC pri B.", "kotne"),
        ("!∠BCA = 180° − 36,87° − 56,31° ≈ 86,82° = 86° 49′", "Vsota kotov v trikotniku ABC je 180°."),
    ],
)

DATUMI = ["12. 1.", "13. 1.", "14. 1.", "15. 1.", "16. 1.", "17. 1.", "18. 1.", "19. 1."]
CENE = [58, 60, 63, 62, 59, 61, 60, 62]


def nafta():
    L, B, dx = 45, 170, 32
    Y = lambda c: B - (c - 50) / 20 * 150
    t = []
    for c in range(50, 71):
        t.append(f'<line x1="{L}" y1="{Y(c):.1f}" x2="{L + 8 * dx}" y2="{Y(c):.1f}" stroke="currentColor" stroke-opacity="{0.25 if c % 5 == 0 else 0.1}"/>')
        if c % 5 == 0:
            t.append(napis(L - 5, Y(c) + 3, str(c), 9, sidro="end"))
    pts = " ".join(f"{L + dx * (i + 0.5):.1f},{Y(c):.1f}" for i, c in enumerate(CENE))
    t.append(f'<polyline points="{pts}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    for i, c in enumerate(CENE):
        t.append(f'<circle cx="{L + dx * (i + 0.5):.1f}" cy="{Y(c):.1f}" r="2.5" fill="{MODRA}"/>')
        t.append(napis(L + dx * (i + 0.5), B + 14, DATUMI[i], 9))
    t.append(napis(8, 12, "cena (EUR)", 10, sidro="start"))
    return svg(310, 195, "".join(t), opis="Cena soda nafte po dnevih")


b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Diagram prikazuje ceno soda nafte na svetovnem trgu v evrih (izmišljeni podatki)." + nafta()
    + r"3.1. Preberi cene in jih zapiši v preglednico. Izračunaj povprečno ceno nafte od vključno 12. 1. do vključno 19. 1. (6 točk)<br>"
    r"3.2. Izračunaj največji porast cene med zaporednima dnevoma v odstotkih. (4 točke)<br>"
    r"3.3. Koliko bi prihranili pri nakupu \(15\,000\) sodov nafte, če bi jih kupili 12. 1. namesto 14. 1.? (5 točk)",
    r"3.1. \(\approx 60{,}63\) EUR &nbsp; 3.2. \(5\,\%\) &nbsp; 3.3. \(75\,000\) EUR",
    [
        "## 3.1",
        ("@slika", tabela(["datum"] + DATUMI, [["cena (EUR)"] + [str(c) for c in CENE]])),
        ("x̄ = " + U("58 + 60 + 63 + 62 + 59 + 61 + 60 + 62", "8") + " = " + U("485", "8"), "", "statistika"),
        ("!x̄ ≈ 60,63 EUR", ""),
        "## 3.2",
        ("porasti: 12.→13. za 2 EUR, 13.→14. za 3 EUR, 16.→17. za 2 EUR, 18.→19. za 2 EUR", ""),
        ("13.→14.: " + U("63 − 60", "60") + " · 100 % = 5 %", "Odstotek računamo glede na ceno prejšnjega dne.", "odstotki"),
        ("!največji porast: 5 %", "Npr. 12.→13.: 2/58 ≈ 3,45 %."),
        "## 3.3",
        ("razlika v ceni: 63 − 58 = 5 EUR na sod", ""),
        ("!prihranek: 15 000 · 5 = 75 000 EUR", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
