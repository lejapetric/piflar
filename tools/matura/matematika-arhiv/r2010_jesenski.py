# Jesenski rok 2010 (uradne pole RIC: m102-401-1-1, m102-402-1-1, m102-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2010, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "mnozice", 8,
    r"Dane so množice \(A = \{2, 3\}\), \(B = \{2, 5, 6, 7\}\) in \(C = \{3, 6, 7\}\). Z naštevanjem elementov zapiši množice "
    r"\(A \cup B\), \(A \cap B\), \(A \setminus B\), \(B \setminus A\), \((A \cap C) \cup B\), \((A \cup B) \setminus (A \cap B)\) in \(A \times C\).",
    r"\(\{2, 3, 5, 6, 7\}\), \(\{2\}\), \(\{3\}\), \(\{5, 6, 7\}\), \(\{2, 3, 5, 6, 7\}\), \(\{3, 5, 6, 7\}\), "
    r"\(\{(2,3), (2,6), (2,7), (3,3), (3,6), (3,7)\}\)",
    [
        ("!A ∪ B = {2, 3, 5, 6, 7}", "Unija: elementi, ki so v A ali v B."),
        ("!A ∩ B = {2}", "Presek: skupni elementi."),
        ("!A \\ B = {3},  B \\ A = {5, 6, 7}", "Razlika: elementi prve množice, ki jih v drugi ni."),
        ("A ∩ C = {3}", ""),
        ("!(A ∩ C) ∪ B = {2, 3, 5, 6, 7}", ""),
        ("!(A ∪ B) \\ (A ∩ B) = {3, 5, 6, 7}", ""),
        ("!A × C = {(2, 3), (2, 6), (2, 7), (3, 3), (3, 6), (3, 7)}", "Kartezični produkt: vsi urejeni pari (prvi iz A, drugi iz C)."),
    ],
)


def premica3():
    X = lambda x: 30 + (x + 3) * 40
    y0 = 40
    t = [f'<line x1="{X(-3.5)}" y1="{y0}" x2="{X(5.5)}" y2="{y0}" stroke="currentColor" stroke-width="1.2"/>']
    for i in range(-3, 6):
        t.append(f'<line x1="{X(i)}" y1="{y0 - 4}" x2="{X(i)}" y2="{y0 + 4}" stroke="currentColor"/>'
                 f'<text x="{X(i)}" y="{y0 + 17}" font-size="10" text-anchor="middle" fill="currentColor">{str(i).replace("-", "−")}</text>')
    t.append(f'<line x1="{X(-3.5)}" y1="{y0 - 9}" x2="{X(3)}" y2="{y0 - 9}" stroke="{MODRA}" stroke-width="3"/>')
    t.append(f'<circle cx="{X(3)}" cy="{y0 - 9}" r="4.5" fill="{MODRA}" stroke="{MODRA}" stroke-width="2"/>')
    return svg(400, 70, "".join(t), opis="Številska premica")


n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Reši neenačbo \((2x - 3)^2 - x \ge (2x - 3)(2x + 3) - 21\). Množico rešitev zapiši kot interval in jo ponazori na številski premici.",
    r"\(x \in (-\infty, 3]\)",
    [
        ("4x<sup>2</sup> − 12x + 9 − x ≥ 4x<sup>2</sup> − 9 − 21", "Kvadrat razlike in razlika kvadratov."),
        ("−13x ≥ −39", "Kvadratna člena se odštejeta."),
        ("x ≤ 3", "Pri deljenju z negativnim številom se neenačaj obrne."),
        ("!x ∈ (−∞, 3]", ""),
        ("@slika", premica3()),
    ],
)


def trikotnik3():
    L = 150
    B = (30, 170)
    A = (B[0] + L, B[1])
    b = math.radians(56)
    C = (B[0] + L * math.cos(b), B[1] - L * math.sin(b))

    def po(P, kot, r):
        k = math.radians(kot)
        return P[0] + r * math.cos(k), P[1] - r * math.sin(k)

    def nap(P, kot, r, s, vel=13):
        x, y = po(P, kot, r)
        return f'<text x="{x:.1f}" y="{y + 4:.1f}" font-size="{vel}" text-anchor="middle" fill="currentColor">{s}</text>'

    Cpod = po(C, 56, 38)
    t = [f'<polygon points="{B[0]},{B[1]} {A[0]},{A[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{A[0] + 50}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{C[0]:.1f}" y1="{C[1]:.1f}" x2="{Cpod[0]:.1f}" y2="{Cpod[1]:.1f}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{C[0]:.1f}" y1="{C[1]:.1f}" x2="{C[0] + 150:.1f}" y2="{C[1]:.1f}" stroke="{RDECA}" stroke-width="1.5"/>',
         f'<circle cx="{C[0] + 150:.1f}" cy="{C[1]:.1f}" r="2.5" fill="currentColor"/>',
         nap(B, 200, 14, "B"), nap(A, 270, 14, "A"), nap(C, 150, 14, "C"), nap((C[0] + 150, C[1]), 90, 12, "E"),
         nap(B, 28, 30, "β"), nap(A, 149, 28, "α"), nap(A, 59, 32, "118°", 11),
         nap(C, 267, 30, "γ"), nap(C, -31, 30, "δ"), nap(C, 28, 28, "ε")]
    return svg(300, 190, "".join(t), opis="Enakokraki trikotnik ABC in vzporednica CE")


n3 = naloga(
    3, "geometrijski_liki_telesa", 5,
    r"Trikotnik \(ABC\) na skici je enakokrak (\(|AB| = |BC|\)). Zunanji kot pri oglišču \(A\) meri \(118^\circ\). Daljica \(CE\) je vzporedna "
    r"stranici \(AB\). Izračunaj velikosti kotov \(\alpha\), \(\beta\), \(\gamma\), \(\delta\) in \(\varepsilon\)."
    + trikotnik3(),
    r"\(\alpha = 62^\circ\), \(\beta = 56^\circ\), \(\gamma = 62^\circ\), \(\delta = 62^\circ\), \(\varepsilon = 56^\circ\)",
    [
        ("!α = 180° − 118° = 62°", "Notranji in zunanji kot sta sokota."),
        ("!γ = α = 62°", "|AB| = |BC|: kota ob osnovnici AC sta enaka."),
        ("!β = 180° − 2 · 62° = 56°", "Vsota notranjih kotov trikotnika je 180°."),
        ("!δ = α = 62°", "Izmenična kota ob vzporednicah CE in AB (prečnica AC)."),
        ("!ε = β = 56°", "Kota z vzporednimi kraki ob vzporednicah CE in AB (prečnica BC)."),
    ],
)

n4 = naloga(
    4, "stevilske_mnozice", 6,
    r"Dano je kompleksno število \(z = 8 + 6i\). Izračunaj število \(z^2 - i\,\overline{z} + 2|z|\).",
    r"\(42 + 88i\)",
    [
        ("z<sup>2</sup> = 64 + 96i + 36i<sup>2</sup> = 28 + 96i", "Kvadrat dvočlenika, i² = −1."),
        ("z̄ = 8 − 6i,  i z̄ = 8i − 6i<sup>2</sup> = 6 + 8i", "Konjugirano število."),
        ("|z| = " + K("64 + 36") + " = 10", "Absolutna vrednost kompleksnega števila."),
        ("!z<sup>2</sup> − i z̄ + 2|z| = 28 + 96i − 6 − 8i + 20 = 42 + 88i", ""),
    ],
)


def f5(x):
    return 2 ** x - 2

n5 = naloga(
    5, "funkcije", 8,
    r"Nariši graf funkcije \(f(x) = 2^x - 2\) in njeno asimptoto. Zapiši ničlo funkcije in enačbo asimptote. Točki \(T_1(-1, y_1)\) in "
    r"\(T_2(x_2, 6)\) ležita na grafu funkcije \(f\). Izračunaj neznani koordinati \(y_1\) in \(x_2\).",
    r"ničla \(x = 1\), asimptota \(y = -2\), \(y_1 = -\frac{3}{2}\), \(x_2 = 3\)",
    [
        ("graf y = 2<sup>x</sup> premaknemo za 2 navzdol", "Premik grafa eksponentne funkcije."),
        ("@slika", graf([(f5, MODRA), (lambda x: -2, RDECA)], (-4, 4), (-3, 7),
                        tocke=[(1, 0, ""), (-1, -1.5, "T₁"), (3, 6, "T₂")], sirina=280, visina=260)),
        ("!asimptota y = −2", ""),
        ("2<sup>x</sup> − 2 = 0  ⇒  2<sup>x</sup> = 2<sup>1</sup>", ""),
        ("!ničla x = 1", ""),
        ("!y<sub>1</sub> = 2<sup>−1</sup> − 2 = −" + U("3", "2"), ""),
        ("2<sup>x</sup> − 2 = 6  ⇒  2<sup>x</sup> = 8 = 2<sup>3</sup>", "Eksponentna enačba z enakima osnovama."),
        ("!x<sub>2</sub> = 3", ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n6 = naloga(
    6, "stoznice", 6,
    r"Premica z enačbo \(3x - 4y - 12 = 0\) seka os \(x\) v točki \(S\). Zapiši enačbo tiste krožnice s središčem \(S\), ki poteka skozi "
    r"točko \(T(0, 2)\).",
    r"\((x - 4)^2 + y^2 = 20\)",
    [
        ("y = 0:  3x = 12  ⇒  S(4, 0)", "Presečišče z osjo x ima ordinato 0."),
        ("r<sup>2</sup> = |ST|<sup>2</sup> = 4<sup>2</sup> + 2<sup>2</sup> = 20", "Razdalja med točkama."),
        ("!(x − 4)<sup>2</sup> + y<sup>2</sup> = 20", "Enačba krožnice s središčem S in polmerom r."),
    ],
)

n7 = naloga(
    7, "diferencialni_racun", 7,
    r"Izračunaj abscisi stacionarnih točk funkcije \(f(x) = \frac{2}{3}x^3 + \frac{1}{2}x^2 - 3x + 1\).",
    r"\(x_1 = 1\), \(x_2 = -\frac{3}{2}\)",
    [
        ("f '(x) = 2x<sup>2</sup> + x − 3", "Odvod polinoma (členoma)."),
        ("2x<sup>2</sup> + x − 3 = 0", "V stacionarni točki je odvod enak 0."),
        ("(2x + 3)(x − 1) = 0", "Razcep kvadratnega trinoma."),
        ("!x<sub>1</sub> = 1,  x<sub>2</sub> = −" + U("3", "2"), ""),
    ],
)

n8 = naloga(
    8, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Prodajalec ima v škatli \(12\) srečk: \(4\) dobitne in \(8\) praznih. Kupimo \(3\) naključno izbrane srečke. Izračunaj verjetnosti dogodkov:<br>"
    r"\(A\) – vsaj ena kupljena srečka bo dobitna,<br>\(B\) – dve kupljeni srečki bosta dobitni, ena pa ne.",
    r"\(P(A) = \frac{41}{55} \approx 0{,}7455\), \(P(B) = \frac{12}{55} \approx 0{,}2182\)",
    [
        ("n = " + BINOM("12", "3") + " = 220", "Vseh izbir treh srečk (kombinacije)."),
        ("A': nobena ni dobitna,  " + BINOM("8", "3") + " = 56", "Nasprotni dogodek."),
        ("!P(A) = 1 − " + U("56", "220") + " = " + U("41", "55") + " ≈ 0,7455", ""),
        ("m<sub>B</sub> = " + BINOM("4", "2") + " · " + BINOM("8", "1") + " = 6 · 8 = 48", "Pravilo produkta."),
        ("!P(B) = " + U("48", "220") + " = " + U("12", "55") + " ≈ 0,2182", ""),
    ],
)

n9 = naloga(
    9, "funkcije", 7,
    r"Reši enačbo \(\sin\left(\frac{\pi}{2} - x\right) + \cos x + 1 = 0\).",
    r"\(x = \pm\frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("sin(" + U("π", "2") + " − x) = cos x", "Adicijski izrek ali zveza med kotnima funkcijama komplementarnih kotov."),
        ("2 cos x + 1 = 0", ""),
        ("cos x = −" + U("1", "2"), ""),
        ("!x = ±" + U("2π", "3") + " + 2kπ, k ∈ ℤ", "Enačbe s kotnimi funkcijami."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n10 = naloga(
    10, "vektorji_ravnina_prostor", 8,
    r"Dana sta vektorja \(\vec{a} = (t, 3, -4)\) in \(\vec{b} = (2, t, 5)\). Za katero realno število \(t\) sta vektorja pravokotna? "
    r"Za kateri realni števili \(t\) je dolžina vektorja \(\vec{a}\) enaka \(13\)?",
    r"\(t = 4\); \(t = \pm 12\)",
    [
        (V("a") + " · " + V("b") + " = 2t + 3t − 20 = 0", "Pravokotna vektorja imata skalarni produkt 0."),
        ("!t = 4", ""),
        ("t<sup>2</sup> + 9 + 16 = 169", "Dolžina vektorja: |a|² = a₁² + a₂² + a₃²."),
        ("t<sup>2</sup> = 144", ""),
        ("!t<sub>1</sub> = 12,  t<sub>2</sub> = −12", ""),
    ],
)

n11 = naloga(
    11, "zaporedja_vrste", 7,
    r"Vsota prvih treh členov aritmetičnega zaporedja je \(27\), vsota prvega in petega člena pa \(14\). Izračunaj prvi člen in diferenco. "
    r"Koliko je vsota prvih sto členov tega zaporedja?",
    r"\(a_1 = 11\), \(d = -2\), \(s_{100} = -8800\)",
    [
        (SISTEM("3a<sub>1</sub> + 3d = 27", "2a<sub>1</sub> + 4d = 14"), "Splošni člen a_n = a₁ + (n − 1)d."),
        (SISTEM("a<sub>1</sub> + d = 9", "a<sub>1</sub> + 2d = 7"), ""),
        ("!d = −2,  a<sub>1</sub> = 11", ""),
        ("!s<sub>100</sub> = " + U("100", "2") + "(2 · 11 + 99 · (−2)) = 50 · (−176) = −8800", "Vsota prvih n členov aritmetičnega zaporedja."),
    ],
)

n12 = naloga(
    12, "integralski_racun", 5,
    r"Pokaži, da je \(\displaystyle\int \frac{\cos 2x}{\sin^2 x \cos^2 x}\,dx = -\cot x - \tan x + C\).",
    r"Odvod desne strani je enak funkciji pod integralom.",
    [
        ("cos 2x = cos<sup>2</sup> x − sin<sup>2</sup> x", "Kosinus dvojnega kota."),
        (U("cos<sup>2</sup> x − sin<sup>2</sup> x", "sin<sup>2</sup> x cos<sup>2</sup> x") + " = " + U("1", "sin<sup>2</sup> x") + " − " + U("1", "cos<sup>2</sup> x"), "Ulomek razstavimo na dva."),
        ("∫ " + U("dx", "sin<sup>2</sup> x") + " − ∫ " + U("dx", "cos<sup>2</sup> x"), ""),
        ("!= −cot x − tan x + C", "Osnovna integrala: ∫dx/sin²x = −cot x, ∫dx/cos²x = tan x."),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
v1 = naloga(
    1, "zaporedja_vrste", 14,
    r"Dana je geometrijska vrsta \(9^x + 9^{2x} + 9^{3x} + \dots\)<br>"
    r"a) Za katera realna števila \(x\) vrsta konvergira? (3 točke)<br>"
    r"b) Izračunaj \(x\), da bo vsota vrste za polovico večja od prvega člena. (3 točke)<br>"
    r"c) Izračunaj \(x\) tako, da bo kvadrat prvega člena enak petkratniku petega člena. Rezultat zaokroži na pet decimalk. (3 točke)<br>"
    r"d) Za \(x = -\frac{1}{2}\) zapiši vsoto \(s_n\) prvih \(n\) členov vrste. Najmanj koliko členov moramo sešteti, da se bo \(s_n\) od "
    r"vsote neskončne vrste razlikovala za manj kot \(10^{-10}\)? (5 točk)",
    r"a) \(x < 0\) &nbsp; b) \(x = -\frac{1}{2}\) &nbsp; c) \(x \approx -0{,}24416\) &nbsp; d) \(s_n = \frac{1}{2}(1 - 3^{-n})\), \(n \ge 21\)",
    [
        ("a<sub>1</sub> = 9<sup>x</sup>,  q = 9<sup>x</sup>", "Količnik sosednjih členov."),
        ("|q| < 1:  0 < 9<sup>x</sup> < 1", "Geometrijska vrsta konvergira, ko je |q| < 1."),
        ("!a) x < 0", ""),
        (U("a<sub>1</sub>", "1 − q") + " = " + U("3", "2") + "a<sub>1</sub>  ⇒  1 − q = " + U("2", "3") + "  ⇒  q = " + U("1", "3"), "Vsota neskončne geometrijske vrste."),
        ("9<sup>x</sup> = 3<sup>−1</sup>  ⇒  3<sup>2x</sup> = 3<sup>−1</sup>", ""),
        ("!b) x = −" + U("1", "2"), ""),
        ("(9<sup>x</sup>)<sup>2</sup> = 5 · 9<sup>5x</sup>  ⇒  9<sup>−3x</sup> = 5", "Peti člen je a₁q⁴ = 9^{5x}."),
        ("x = −" + U("log 5", "3 log 9"), "Logaritmiramo."),
        ("!c) x ≈ −0,24416", ""),
        ("x = −" + U("1", "2") + ":  a<sub>1</sub> = q = " + U("1", "3") + ",  s = " + U("1/3", "2/3") + " = " + U("1", "2"), ""),
        ("!s<sub>n</sub> = " + U("1", "3") + " · " + U("1 − 3<sup>−n</sup>", "1 − 1/3") + " = " + U("1", "2") + "(1 − 3<sup>−n</sup>)", "Vsota prvih n členov geometrijskega zaporedja."),
        ("s − s<sub>n</sub> = " + U("1", "2") + " · 3<sup>−n</sup> < 10<sup>−10</sup>  ⇒  3<sup>n</sup> > 5 · 10<sup>9</sup>", ""),
        ("n > " + U("log(5 · 10<sup>9</sup>)", "log 3") + " ≈ 20,33", "Logaritemska neenačba (osnova večja od 1 ohrani neenačaj)."),
        ("!d) sešteti moramo vsaj 21 členov", ""),
    ],
)


def p_v2(x):
    return x ** 3 - 7 * x + 6

v2 = naloga(
    2, ["algebrski_izrazi_enacbe_neenacbe", "funkcije", "diferencialni_racun"], 14,
    r"Dan je polinom \(p(x) = x^3 + ax^2 + bx + 6\); \(a, b \in \mathbb{R}\).<br>"
    r"a) Za \(a = 0\) in \(b = -7\) izračunaj ničle polinoma. Določi definicijsko območje funkcije \(f(x) = \sqrt{x^3 - 7x + 6}\). (6 točk)<br>"
    r"b) Izračunaj \(a\) in \(b\), če je ena od ničel polinoma \(p\) število \(1 + i\). (4 točke)<br>"
    r"c) Izračunaj \(a\) in \(b\), če je tangenta na graf polinoma \(p\) v točki \(T(1, 4)\) vzporedna premici \(3x - y + 2 = 0\). (4 točke)",
    r"a) \(1, 2, -3\); \(D_f = [-3, 1] \cup [2, \infty)\) &nbsp; b) \(a = 1\), \(b = -4\) &nbsp; c) \(a = 3\), \(b = -6\)",
    [
        ("p(1) = 1 − 7 + 6 = 0  ⇒  p(x) = (x − 1)(x<sup>2</sup> + x − 6)", "Celoštevilsko ničlo poiščemo med delitelji 6; Hornerjev algoritem."),
        ("!ničle x<sub>1</sub> = 1, x<sub>2</sub> = 2, x<sub>3</sub> = −3", ""),
        ("x<sup>3</sup> − 7x + 6 ≥ 0", "Izraz pod sodim korenom ne sme biti negativen."),
        ("@slika", graf([(p_v2, MODRA)], (-3.3, 3.1), (-8, 16), tocke=[(-3, 0, ""), (1, 0, ""), (2, 0, "")], sirina=260, visina=240)),
        ("!D<sub>f</sub> = [−3, 1] ∪ [2, ∞)", "Vse ničle so enojne, polinom menja predznak."),
        ("druga ničla 1 − i:  (x − 1 − i)(x − 1 + i) = x<sup>2</sup> − 2x + 2", "Polinom z realnimi koeficienti ima tudi konjugirano ničlo."),
        ("p(x) = (x<sup>2</sup> − 2x + 2)(x + 3) = x<sup>3</sup> + x<sup>2</sup> − 4x + 6", "Prosti člen 6 = 2 · 3."),
        ("!b) a = 1,  b = −4", ""),
        ("p '(x) = 3x<sup>2</sup> + 2ax + b,  smerni koeficient premice k = 3", "Vzporedni premici imata enaka smerna koeficienta."),
        (SISTEM("p(1) = 1 + a + b + 6 = 4", "p '(1) = 3 + 2a + b = 3"), "Točka T leži na grafu; odvod je smerni koeficient tangente."),
        (SISTEM("a + b = −3", "2a + b = 0"), ""),
        ("!c) a = 3,  b = −6", ""),
    ],
    snov=FUN + "polinomska_razlaga.html",
)


def parabola_v3(X, Y):
    par = parametricna(X, Y, lambda s: 3 + s * s / 12, lambda s: -1 + s, -8, 7, MODRA)
    kro = parametricna(X, Y, lambda t: 3 + 5 * math.cos(t), lambda t: -1 + 5 * math.sin(t), 0, 2 * math.pi, RDECA)
    vod = f'<line x1="{X(0):.1f}" y1="{Y(-8):.1f}" x2="{X(0):.1f}" y2="{Y(7):.1f}" stroke="#2a9d4b" stroke-width="2"/>'
    return (par + kro + vod + tocka(X, Y, 3, -1, "T") + tocka(X, Y, 0, 3, "") + tocka(X, Y, 0, -5, "")
            + tocka(X, Y, 37 / 12, 0, "P", dx=6))


v3 = naloga(
    3, "stoznice", 12,
    r"Parabola ima teme \(T(3, -1)\) in premico vodnico z enačbo \(x = 0\).<br>"
    r"a) Zapiši enačbo parabole in poišči njeno presečišče z abscisno osjo. (4 točke)<br>"
    r"b) Zapiši enačbo krožnice s središčem v temenu parabole, ki od premice vodnice odreže tetivo dolžine \(8\). (3 točke)<br>"
    r"c) Pokaži, da eno od gorišč hiperbole z enačbo \(3x^2 - y^2 - 12x - 2y + 8 = 0\) leži na premici vodnici dane parabole. (5 točk)",
    r"a) \((y + 1)^2 = 12(x - 3)\), \(P\left(\frac{37}{12}, 0\right)\) &nbsp; b) \((x - 3)^2 + (y + 1)^2 = 25\) &nbsp; "
    r"c) gorišče \(F_1(0, -1)\)",
    [
        (U("p", "2") + " = 3  (razdalja temena od vodnice),  p = 6", "Teme je na sredini med goriščem in vodnico."),
        ("!(y + 1)<sup>2</sup> = 12(x − 3)", "Premaknjena parabola z osjo, vzporedno osi x: (y − q)² = 2p(x − p₀)."),
        ("y = 0:  1 = 12(x − 3)", ""),
        ("!P(" + U("37", "12") + ", 0)", ""),
        ("razdalja T od vodnice d = 3,  pol tetive 4", ""),
        ("r = " + K("3<sup>2</sup> + 4<sup>2</sup>") + " = 5", "Pitagorov izrek: polmer, polovica tetive in razdalja do tetive."),
        ("!b) (x − 3)<sup>2</sup> + (y + 1)<sup>2</sup> = 25", ""),
        ("@slika", mreza((-2, 9), (-9, 8), parabola_v3, sirina=240)),
        ("3(x − 2)<sup>2</sup> − (y + 1)<sup>2</sup> = 3", "Dopolnimo do popolnih kvadratov: 3(x² − 4x + 4) − (y² + 2y + 1) = −8 + 12 − 1."),
        ("(x − 2)<sup>2</sup> − " + U("(y + 1)<sup>2</sup>", "3") + " = 1", ""),
        ("središče S(2, −1),  a = 1,  b = " + K("3"), "Premaknjena hiperbola."),
        ("e = " + K("a<sup>2</sup> + b<sup>2</sup>") + " = 2", "Linearna ekscentričnost hiperbole."),
        ("F<sub>1,2</sub> = (2 ∓ 2, −1)", ""),
        ("!c) F<sub>1</sub>(0, −1) leži na premici x = 0", ""),
    ],
)

POLA2 = [v1, v2, v3]
