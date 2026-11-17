# Jesenski rok 2013 (uradna pola RIC P132-C101-1-1; navodila za ocenjevanje na RIC niso objavljena)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2013, "jesenski", "ponedeljek, 26. avgust 2013"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Izpostavi skupni faktor in razstavi izraz \(a^5 - 5a^4 + 6a^3\).",
    r"\(a^3(a - 2)(a - 3)\)",
    [
        ("a<sup>3</sup>(a<sup>2</sup> − 5a + 6)", "Skupni faktor je a³."),
        ("!= a<sup>3</sup>(a − 2)(a − 3)", "Vietovo pravilo: −2 · (−3) = 6, −2 + (−3) = −5.", "vieta"),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Reši enačbo \(3(x - 2) + 2(x + 1)^2 = 2x^2 + 5\).",
    r"\(x = \frac{9}{7}\)",
    [
        ("3x − 6 + 2x<sup>2</sup> + 4x + 2 = 2x<sup>2</sup> + 5", "Odpravimo oklepaje; (x + 1)² = x² + 2x + 1."),
        ("7x − 4 = 5", "Kvadratna člena se odštejeta."),
        ("!x = " + U("9", "7"), ""),
    ],
)

a3 = naloga(
    "A3", "zaporedja_pm", 4,
    r"Miha riše zaporedje slik: na prvi je en kvadrat, na vsaki naslednji pa vsak najmanjši kvadrat razdeli na \(3 \times 3\) manjših kvadratov. "
    r"Na prvi sliki je torej \(1\), na drugi \(9\), na tretji \(81\) najmanjših kvadratov. Koliko najmanjših kvadratov je na peti sliki?",
    r"\(6561\)",
    [
        ("a<sub>1</sub> = 1, q = 9", "Števila tvorijo geometrijsko zaporedje.", "geometrijsko"),
        ("a<sub>5</sub> = 1 · 9<sup>4</sup>", ""),
        ("!a<sub>5</sub> = 6561", ""),
    ],
)

a4 = naloga(
    "A4", "kombinatorika_verjetnost", 4,
    r"Koda alarma ima štiri mesta. Na vsako mesto lahko postavimo katerokoli števko od \(0\) do \(9\). Koliko različnih kod lahko sestavimo, če je na zadnjem mestu števka \(0\)?",
    r"\(1000\)",
    [
        ("10 · 10 · 10 · 1", "Prva tri mesta so poljubna, zadnje je določeno.", "kombinatorika"),
        ("!1000 kod", ""),
    ],
)

TEC = [("pon", 420), ("tor", 480), ("sre", 610), ("čet", 550), ("pet", 390)]


def tecaji():
    X = lambda i: 50 + i * 55
    Y = lambda v: 150 - v * 0.2
    t = [f'<line x1="40" y1="{Y(v)}" x2="290" y2="{Y(v)}" stroke="currentColor" stroke-opacity="{0.6 if v == 0 else 0.12}"/>' + napis(36, Y(v) + 4, str(v), 9, sidro="end")
         for v in range(0, 701, 100)]
    t.append(f'<polyline points="{" ".join(f"{X(i)},{Y(v)}" for i, (_, v) in enumerate(TEC))}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    t += [f'<circle cx="{X(i)}" cy="{Y(v)}" r="3.5" fill="{MODRA}"/>' + napis(X(i), 165, d, 10) for i, (d, v) in enumerate(TEC)]
    t.append(napis(165, 12, "zaključni tečaj delnice (EUR)", 10))
    return svg(300, 175, "".join(t), opis="Zaključni tečaji delnice od ponedeljka do petka")

a5 = naloga(
    "A5", "statistika_pm", 4,
    r"Diagram prikazuje zaključne tečaje delnice od ponedeljka do petka (vrednosti so desetice)." + tecaji()
    + r"Koliko je bil najvišji tečaj? Kolikokrat je bil tečaj nižji od \(500\) EUR? Med katerima zaporednima dnevoma se je tečaj najbolj povečal? "
    r"Kolikšna je izguba vlagatelja, ki je delnico kupil po sredinem in prodal po petkovem tečaju?",
    r"\(610\) EUR; \(3\)-krat; med torkom in sredo; \(220\) EUR",
    [
        ("!najvišji tečaj: 610 EUR (sreda)", ""),
        ("!3-krat (pon 420, tor 480, pet 390)", ""),
        ("!med torkom in sredo (+130 EUR)", "Ponedeljek–torek je samo +60 EUR."),
        ("!izguba: 610 − 390 = 220 EUR", ""),
    ],
)

a6 = naloga(
    "A6", "povrsine_prostornine", 5,
    r"Polmer nogometne žoge je meril \(11\) cm. Ponoči se je na mrazu prostornina žoge zmanjšala za \(8\,\%\). Izračunaj novo prostornino in nov polmer žoge.",
    r"\(V \approx 5129\ \mathrm{cm^3}\), \(r \approx 10{,}70\) cm",
    [
        ("V = " + U("4", "3") + "π · 11<sup>3</sup> ≈ 5575,3 cm<sup>3</sup>", "", "telesa"),
        ("!V' = 0,92 · 5575,3 ≈ 5129,3 cm<sup>3</sup>", "", "odstotki"),
        ("r' = ∛(" + U("3V'", "4π") + ")", ""),
        ("!r' ≈ 10,70 cm", "Tudi r' = 11 · ∛0,92."),
    ],
)

a7 = naloga(
    "A7", "linearna_funkcija", 5,
    r"Reši sistem enačb: \(3x - 2y = 4\) in \(2x + 5y = 9\).",
    r"\(x = 2,\ y = 1\)",
    [
        ("15x − 10y = 20,  4x + 10y = 18", "Prvo enačbo pomnožimo s 5, drugo z 2.", "sistem"),
        ("19x = 38", "Enačbi seštejemo."),
        ("!x = 2", ""),
        ("!y = 1", "Iz 3 · 2 − 2y = 4."),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Na sliki je graf logaritemske funkcije \(f(x) = \log_a x\). Glede na sliko izpolni preglednico in izračunaj osnovo \(a\)."
    + graf([(lambda x: math.log(x, 3) if x > 0 else None, MODRA)], (-1, 10), (-3, 3), [(1, 0, ""), (9, 2, "")], sirina=320, visina=200)
    + tabela([r"\(x\)", r"\(f(x)\)"], [[r"\(1\)", ""], ["", r"\(2\)"]]),
    r"\(f(1) = 0\), \(f(9) = 2\), \(a = 3\)",
    [
        ("!f(1) = 0", "Vsaka logaritemska funkcija gre skozi (1, 0).", "logaritem"),
        ("!f(x) = 2 pri x = 9", "Odčitamo s slike."),
        ("log<sub>a</sub> 9 = 2  ⇒  a<sup>2</sup> = 9", ""),
        ("!a = 3", "Osnova je pozitivna."),
    ],
)


def trikotnik_a9():
    A, B, C = (25, 100), (205, 100), (115, 30)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 6, "C"),
         napis(115, 115, "6x", 11), napis(62, 58, "5x", 11), napis(168, 58, "5x", 11)]
    return svg(230, 125, "".join(t), opis="Enakokraki trikotnik s stranicami 5x, 5x, 6x")

a9 = naloga(
    "A9", "obsegi_ploscine", 5,
    r"Na sliki je trikotnik z obsegom \(48\) cm. Izračunaj dolžine stranic in ploščino trikotnika." + trikotnik_a9(),
    r"\(15\) cm, \(15\) cm, \(18\) cm; \(S = 108\ \mathrm{cm^2}\)",
    [
        ("5x + 5x + 6x = 48  ⇒  x = 3", ""),
        ("!a = b = 15 cm,  c = 18 cm", ""),
        ("v = " + K("15<sup>2</sup> − 9<sup>2</sup>") + " = 12 cm", "Višina na osnovnico jo razpolovi.", "pitagora"),
        ("!S = " + U("18 · 12", "2") + " = 108 cm<sup>2</sup>", "", "ploscine"),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dan je trikotnik \(ABC\) z oglišči \(A(-4, -2)\), \(B(2, -2)\) in \(C(0, 4)\)."
    + mreza((-6, 4), (-4, 6), lambda X, Y: f'<polygon points="{X(-4)},{Y(-2)} {X(2)},{Y(-2)} {X(0)},{Y(4)}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.6"/>'
           + tocka(X, Y, -4, -2, "A", -12, 14) + tocka(X, Y, 2, -2, "B", 4, 14) + tocka(X, Y, 0, 4, "C", 6, -4), sirina=260)
    + r"1.1. Izračunaj obseg in ploščino trikotnika \(ABC\). (7 točk)<br>"
    r"1.2. Zapiši enačbo premice skozi točki \(B\) in \(C\). (4 točke)<br>"
    r"1.3. Enačba premice skozi \(A\) in \(C\) je \(y = \frac{3}{2}x + 4\). Izračunaj kot trikotnika pri oglišču \(A\). (4 točke)",
    r"1.1. \(o \approx 19{,}54\), \(S = 18\) &nbsp; 1.2. \(y = -3x + 4\) &nbsp; 1.3. \(\alpha \approx 56{,}31^\circ\)",
    [
        "## 1.1",
        ("AB = 6", "Točki imata enako ordinato."),
        ("AC = " + K("4<sup>2</sup> + 6<sup>2</sup>") + " = " + K("52") + " ≈ 7,21", "", "razdalja"),
        ("BC = " + K("2<sup>2</sup> + 6<sup>2</sup>") + " = " + K("40") + " ≈ 6,32", ""),
        ("!o ≈ 19,54", ""),
        ("!S = " + U("6 · 6", "2") + " = 18", "Višina na AB je razlika ordinat: 4 − (−2) = 6.", "ploscine"),
        "## 1.2",
        ("k = " + U("4 − (−2)", "0 − 2") + " = −3,  n = 4", "C leži na osi y.", "premica"),
        ("!y = −3x + 4", ""),
        "## 1.3",
        ("tan α = " + U("3", "2"), "AB je vzporedna z osjo x, zato je α naklonski kot premice AC.", "kotne"),
        ("!α ≈ 56,31°", ""),
    ],
)

F = lambda x: (2 * x - 6) / x ** 2

b2 = naloga(
    "B2", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{2x - 6}{x^2}\).<br>"
    r"2.1. Izračunaj ničlo in pol ter zapiši enačbo vodoravne asimptote. (3 točke)<br>"
    r"2.2. Izračunaj ekstrem funkcije \(f\). (8 točk)<br>"
    r"2.3. Nariši graf funkcije \(f\). (4 točke)",
    r"2.1. ničla \(3\), pol \(0\), \(y = 0\) &nbsp; 2.2. maksimum \(\left(6, \frac{1}{6}\right)\)",
    [
        "## 2.1",
        ("!ničla: x = 3", "", "racionalna"),
        ("!pol: x = 0 (dvojni)", ""),
        ("!vodoravna asimptota: y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        "## 2.2",
        ("f'(x) = " + U("2x<sup>2</sup> − (2x − 6) · 2x", "x<sup>4</sup>") + " = " + U("−2x + 12", "x<sup>3</sup>"), "Odvod kvocienta, okrajšamo z x.", "odvod"),
        ("f'(x) = 0  ⇒  x = 6", ""),
        ("!maksimum T(6, " + U("1", "6") + ")", "f(6) = 6/36; odvod preide iz + v −."),
        "## 2.3",
        ("@slika", graf([(F, MODRA)], (-4, 14), (-3, 1), [(3, 0, ""), (6, 1 / 6, "T")], sirina=340, visina=260)),
        (None, "Ob dvojnem polu x = 0 gresta obe veji proti −∞; za velike |x| se graf bliža osi x."),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Janez je za jutranjo telovadbo delal počepe. Prvi dan jih je naredil \(10\), nato vsak dan \(3\) več kakor prejšnji dan, dokler ni prišel do \(70\). "
    r"Od takrat jih dela vsak dan po \(70\).<br>"
    r"3.1. Kateri dan je Janez prvič naredil \(70\) počepov? (5 točk)<br>"
    r"3.2. Koliko počepov je naredil skupaj v prvih \(40\) dneh? (5 točk)<br>"
    r"3.3. Za vsak počep porabi \(2{,}5\) sekunde. Ali sta bili dve minuti dovolj za vse počepe \(15.\) dne? Utemelji z računom. (5 točk)",
    r"3.1. \(21.\) dan &nbsp; 3.2. \(2170\) &nbsp; 3.3. ne (potreboval je \(130\) s)",
    [
        "## 3.1",
        ("10 + 3(n − 1) = 70  ⇒  n − 1 = 20", "", "aritmeticno"),
        ("!n = 21: 21. dan", ""),
        "## 3.2",
        ("prvih 21 dni: S<sub>21</sub> = " + U("21", "2") + " · (10 + 70) = 840", ""),
        ("od 22. do 40. dne: 19 · 70 = 1330", ""),
        ("!skupaj 2170 počepov", ""),
        "## 3.3",
        ("a<sub>15</sub> = 10 + 14 · 3 = 52 počepov", ""),
        ("52 · 2,5 s = 130 s", ""),
        ("!Ne, 130 s > 120 s.", "Dve minuti sta 120 sekund."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
