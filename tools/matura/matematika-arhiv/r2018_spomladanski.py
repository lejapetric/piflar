# Spomladanski rok 2018 (uradne pole RIC: m181-401-1-1, m181-402-1-1, m181-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2018, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
I01 = "1 &nbsp; 0"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["osnove_logike", "stevilske_mnozice", "algebrski_izrazi_enacbe_neenacbe"], 6,
    "Ugotovi logično vrednost izjav: obkroži 1, če je izjava resnična, in 0, če je neresnična (prva vrstica je primer)."
    + tabela(["Izjava", "Vrednost"], [
        [r"Za vsak \(a \in \mathbb{R}\) velja \((-a^3)^2 = a^6\).", "<b>1</b>"],
        [r"Števili \(12\) in \(35\) sta tuji si števili.", I01],
        [r"Število \(3^{10} + 3^{11}\) je večkratnik števila \(4\).", I01],
        [r"Za vsak \(a \in \mathbb{R}\) velja \(\sqrt{a^2} = a\).", I01],
        [r"\(i^{2026} = -1\)", I01],
        [r"Za poljubni \(a, b \in \mathbb{R}\) velja \((a + b)^2 = a^2 + b^2\).", I01],
        [r"Obstajata \(a, b \in \mathbb{R}\), da velja \((a + b)^2 = a^2 + b^2\).", I01],
    ]),
    r"\(1\), \(1\), \(0\), \(1\), \(0\), \(1\)",
    [
        ("!12 = 2<sup>2</sup> · 3, 35 = 5 · 7: D(12, 35) = 1 → 1", "Tuji števili nimata skupnih prafaktorjev."),
        ("!3<sup>10</sup> + 3<sup>11</sup> = 3<sup>10</sup>(1 + 3) = 4 · 3<sup>10</sup> → 1", "Izpostavimo skupni faktor 3¹⁰."),
        ("!" + K("(−2)<sup>2</sup>") + " = 2 ≠ −2 → 0", "Velja √(a²) = |a|; protiprimer z negativnim a."),
        ("!i<sup>2026</sup> = i<sup>4 · 506 + 2</sup> = i<sup>2</sup> = −1 → 1", "Potence števila i se ponavljajo z dolžino 4."),
        ("!(1 + 1)<sup>2</sup> = 4 ≠ 2 → 0", "Kvadrat dvočlenika ima še člen 2ab."),
        ("!a = 0, b = 5: 25 = 0 + 25 → 1", "Dovolj je en primer; enakost velja, ko je ab = 0."),
    ],
)

def paral(X, Y):
    A, B, D = (0, 0), (6, 0), (2, 4)
    C = (8, 4)
    E, F, G, H = (3, 0), (7, 2), (5, 4), (1, 2)
    S = (4, 2)
    t = [f'<polygon points="{" ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in (A, B, C, D))}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(6):.1f}" y2="{Y(0):.1f}" stroke="{MODRA}" stroke-width="2.5"/>',
         f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(2):.1f}" y2="{Y(4):.1f}" stroke="{RDECA}" stroke-width="2.5"/>',
         f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(8):.1f}" y2="{Y(4):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<line x1="{X(6):.1f}" y1="{Y(0):.1f}" x2="{X(2):.1f}" y2="{Y(4):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<text x="{X(3):.1f}" y="{Y(0) + 14:.1f}" font-size="12" fill="{MODRA}">a</text>',
         f'<text x="{X(0.6):.1f}" y="{Y(2.6):.1f}" font-size="12" fill="{RDECA}">b</text>']
    for (x, y), n, dx, dy in [(A, "A", -12, 12), (B, "B", 4, 12), (C, "C", 4, -4), (D, "D", -12, -4), (E, "E", -4, 14), (F, "F", 6, 4),
                              (G, "G", -4, -6), (H, "H", -14, 4), (S, "S", 4, -5)]:
        t.append(f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="2.5" fill="currentColor"/><text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="12" fill="currentColor">{n}</text>')
    return "".join(t)

L_, T_ = 20, 20
PARAL = svg(330, 190, paral(lambda x: L_ + x * 36, lambda y: 160 - y * 36), "Paralelogram ABCD")

n2 = naloga(
    2, "vektorji_ravnina_prostor", 5,
    r"V paralelogramu \(ABCD\) je \(\vec{a} = \overrightarrow{AB}\) in \(\vec{b} = \overrightarrow{AD}\). Točke \(E\), \(F\), \(G\) in \(H\) so "
    r"razpolovišča stranic \(AB\), \(BC\), \(CD\) in \(DA\), \(S\) pa je presečišče diagonal." + PARAL
    + r"Vsak vektor zapiši kot linearno kombinacijo vektorjev \(\vec{a}\) in \(\vec{b}\) (primer: \(\overrightarrow{AC} = \vec{a} + \vec{b}\)).<br>"
    r"2.1. \(\overrightarrow{BD}\) &nbsp; 2.2. \(\overrightarrow{AF}\) &nbsp; 2.3. \(\overrightarrow{HG}\) &nbsp; 2.4. \(\overrightarrow{SB}\) &nbsp; "
    r"2.5. \(\overrightarrow{EG}\) (vsak po 1 točka)",
    r"2.1. \(\vec{b} - \vec{a}\) &nbsp; 2.2. \(\vec{a} + \frac{1}{2}\vec{b}\) &nbsp; 2.3. \(\frac{1}{2}\vec{a} + \frac{1}{2}\vec{b}\) &nbsp; "
    r"2.4. \(\frac{1}{2}\vec{a} - \frac{1}{2}\vec{b}\) &nbsp; 2.5. \(\vec{b}\)",
    [
        ("!2.1  " + V("BD") + " = " + V("BA") + " + " + V("AD") + " = −" + V("a") + " + " + V("b"), "Pot od B do D gre čez A."),
        ("!2.2  " + V("AF") + " = " + V("AB") + " + " + U("1", "2") + V("BC") + " = " + V("a") + " + " + U("1", "2") + V("b"), "BC je vzporeden in enako dolg kot AD."),
        ("!2.3  " + V("HG") + " = " + U("1", "2") + V("AC") + " = " + U("1", "2") + V("a") + " + " + U("1", "2") + V("b"), "Srednjica trikotnika ACD je vzporedna AC in pol krajša."),
        ("!2.4  " + V("SB") + " = " + U("1", "2") + V("DB") + " = " + U("1", "2") + V("a") + " − " + U("1", "2") + V("b"), "Diagonali se v paralelogramu razpolavljata."),
        ("!2.5  " + V("EG") + " = " + V("b"), "EG povezuje razpolovišči nasprotnih stranic, zato je vzporeden in enako dolg kot AD."),
    ],
)

n3 = naloga(
    3, "zaporedja_vrste", 7,
    r"Dano je aritmetično zaporedje \(\frac{7}{3}, 3, \frac{11}{3}, \dots\) Izračunaj trinajsti člen in vsoto prvih trinajstih členov. "
    r"Koliko členov zaporedja je manjših od \(1000\)?",
    r"\(a_{13} = \frac{31}{3}\), \(s_{13} = \frac{247}{3}\), \(1497\) členov",
    [
        ("d = 3 − " + U("7", "3") + " = " + U("2", "3"), "Diferenca je razlika zaporednih členov."),
        ("!a<sub>13</sub> = " + U("7", "3") + " + 12 · " + U("2", "3") + " = " + U("31", "3"), "Splošni člen aritmetičnega zaporedja."),
        ("!s<sub>13</sub> = " + U("13", "2") + " (" + U("7", "3") + " + " + U("31", "3") + ") = " + U("247", "3"), "Vsota prvih n členov aritmetičnega zaporedja."),
        ("a<sub>n</sub> = " + U("7", "3") + " + (n − 1)" + U("2", "3") + " = " + U("2n + 5", "3") + " < 1000", ""),
        ("2n + 5 < 3000  ⇒  n < 1497,5", ""),
        ("!manjših od 1000 je 1497 členov", "Zaporedje narašča, zato so to členi a₁ do a₁₄₉₇."),
    ],
)

n4 = naloga(
    4, ["funkcije", "diferencialni_racun"], 6,
    r"Dana je funkcija \(f(x) = \dfrac{3}{x}\).<br>4.1. Nariši graf funkcije \(f\). (2 točki)<br>"
    r"4.2. Zapiši enačbo tangente na graf funkcije \(f\) v točki z absciso \(x_0 = \frac{3}{2}\). (4 točke)",
    r"4.2. \(y = -\frac{4}{3}x + 4\)",
    [
        ("@slika", graf([(lambda x: 3 / x, MODRA)], (-6, 6), (-6, 6), tocke=[(1.5, 2, "")], sirina=240, visina=240)),
        ("!4.1  hiperbola v 1. in 3. kvadrantu", "Osi sta asimptoti."),
        ("f(" + U("3", "2") + ") = 2", ""),
        ("f '(x) = −" + U("3", "x<sup>2</sup>") + ",  f '(" + U("3", "2") + ") = −" + U("3", "9/4") + " = −" + U("4", "3"), "Smerni koeficient tangente je odvod v dani točki."),
        ("y − 2 = −" + U("4", "3") + "(x − " + U("3", "2") + ")", "Enačba premice skozi točko z danim smernim koeficientom."),
        ("!y = −" + U("4", "3") + "x + 4", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n5 = naloga(
    5, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Naj bo \(\mathbb{N}_{24} = \{1, 2, 3, \dots, 24\}\).<br>"
    r"5.1. Iz \(\mathbb{N}_{24}\) naključno izberemo eno število. Izračunaj verjetnosti dogodkov \(A\): število je deljivo s \(4\), in "
    r"\(B\): število je deljivo z \(2\) in s \(3\). (4 točke)<br>"
    r"5.2. Iz \(\mathbb{N}_{24}\) izberemo dve števili. Izračunaj verjetnost dogodka \(C\), da je vsaj eno od njiju deljivo s \(4\). (3 točke)",
    r"5.1. \(P(A) = \frac{1}{4}\), \(P(B) = \frac{1}{6}\) &nbsp; 5.2. \(P(C) = \frac{41}{92}\)",
    [
        ("A = {4, 8, 12, 16, 20, 24}", "Večkratniki števila 4."),
        ("!P(A) = " + U("6", "24") + " = " + U("1", "4"), "Verjetnost = število ugodnih / število vseh izidov."),
        ("B = {6, 12, 18, 24}", "Deljivo z 2 in s 3 pomeni deljivo s 6."),
        ("!P(B) = " + U("4", "24") + " = " + U("1", "6"), ""),
        ("P(C) = 1 − " + U(BINOM(18, 2), BINOM(24, 2)) + " = 1 − " + U("153", "276"), "Nasprotni dogodek: nobeno izmed izbranih ni deljivo s 4 (18 takih števil)."),
        ("!P(C) = " + U("41", "92"), ""),
    ],
)

n6 = naloga(
    6, ["stevilske_mnozice", "algebrski_izrazi_enacbe_neenacbe"], 7,
    r"Dana sta polinoma \(p(x) = x^3 + x\) in \(q(x) = -x^2 - 1\). Reši enačbo \(p(x) = q(x)\) v množici kompleksnih števil in dokaži, "
    r"da ima vsaka rešitev absolutno vrednost \(1\).",
    r"\(x_1 = -1\), \(x_2 = i\), \(x_3 = -i\)",
    [
        ("x<sup>3</sup> + x<sup>2</sup> + x + 1 = 0", "Vse člene prenesemo na levo."),
        ("x<sup>2</sup>(x + 1) + (x + 1) = (x + 1)(x<sup>2</sup> + 1) = 0", "Izpostavimo skupni faktor po skupinah."),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = i,  x<sub>3</sub> = −i", "x² = −1 ima rešitvi ±i."),
        ("!|−1| = 1,  |i| = |−i| = " + K("0<sup>2</sup> + 1<sup>2</sup>") + " = 1", "Absolutna vrednost kompleksnega števila."),
    ],
)

ZA7 = ("A: \\(\\sin 2x\\), B: \\(\\cos^2 x - \\sin^2 x\\), C: \\(-\\cos x\\), D: \\(\\cos x\\), E: \\(\\sin x\\), F: \\(-\\sin x\\), G: \\(1\\), "
       "H: \\(0\\), I: \\(\\tan x + \\cot x\\), J: \\(\\tan x\\)")
n7 = naloga(
    7, "funkcije", 6,
    "Izrazi v levem stolpcu so funkcijski predpisi. Vsakemu pripiši črko enakega izraza z desnega seznama (prva vrstica je primer).<br>"
    + ZA7 + tabela(["Izraz", "Črka"], [
        [r"\(\sin(-x)\)", "<b>F</b>"], [r"\(2\sin x \cos x\)", ""], [r"\(\cos(\pi - x)\)", ""], [r"\(\sin^2 x + \cos^2 x\)", ""],
        [r"\(\dfrac{1}{\sin x \cos x}\)", ""], [r"\(\sin\left(\frac{\pi}{2} - x\right)\)", ""], [r"\(\cos^4 x - \sin^4 x\)", ""]]),
    r"A, C, G, I, D, B",
    [
        ("!2 sin x cos x = sin 2x → A", "Sinus dvojnega kota."),
        ("!cos(π − x) = −cos x → C", "Adicijski izrek: cos π cos x + sin π sin x."),
        ("!sin<sup>2</sup>x + cos<sup>2</sup>x = 1 → G", "Osnovna zveza med sinusom in kosinusom."),
        ("tan x + cot x = " + U("sin<sup>2</sup>x + cos<sup>2</sup>x", "sin x cos x") + " = " + U("1", "sin x cos x"), "Ulomka spravimo na skupni imenovalec."),
        ("!→ I", ""),
        ("!sin(" + U("π", "2") + " − x) = cos x → D", ""),
        ("!cos<sup>4</sup>x − sin<sup>4</sup>x = (cos<sup>2</sup>x − sin<sup>2</sup>x) · 1 → B", "Razlika kvadratov."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n8 = naloga(
    8, "stoznice", 8,
    r"Dan je pravokotnik z oglišči \(A(-4, -3)\), \(B(4, -3)\), \(C(4, 3)\) in \(D(-4, 3)\).<br>"
    r"8.1. Zapiši enačbo elipse v središčni legi, ki je včrtana pravokotniku in se dotika vseh štirih stranic. (3 točke)<br>"
    r"8.2. Zapiši enačbo hiperbole v središčni legi s temenom \(T(0, 3)\), katere asimptoti sta nosilki diagonal pravokotnika. (3 točke)<br>"
    r"8.3. Zapiši enačbo krožnice s središčem v \(C\), ki poteka skozi \(A\). (2 točki)",
    r"8.1. \(\frac{x^2}{16} + \frac{y^2}{9} = 1\) &nbsp; 8.2. \(\frac{x^2}{16} - \frac{y^2}{9} = -1\) &nbsp; 8.3. \((x - 4)^2 + (y - 3)^2 = 100\)",
    [
        ("a = 4,  b = 3", "Polosi sta polovici stranic pravokotnika."),
        ("!8.1  " + U("x<sup>2</sup>", "16") + " + " + U("y<sup>2</sup>", "9") + " = 1", "Enačba elipse v središčni legi."),
        ("diagonali: y = ±" + U("3", "4") + "x", "Smerna koeficienta diagonal skozi izhodišče."),
        ("teme na osi y: " + U("x<sup>2</sup>", "a<sup>2</sup>") + " − " + U("y<sup>2</sup>", "b<sup>2</sup>") + " = −1, b = 3, " + U("b", "a") + " = " + U("3", "4") + " ⇒ a = 4", "Hiperbola s temenoma na ordinatni osi; asimptoti y = ±(b/a)x."),
        ("!8.2  " + U("x<sup>2</sup>", "16") + " − " + U("y<sup>2</sup>", "9") + " = −1", ""),
        ("r = |CA| = " + K("8<sup>2</sup> + 6<sup>2</sup>") + " = 10", "Razdalja med točkama (Pitagorov izrek)."),
        ("!8.3  (x − 4)<sup>2</sup> + (y − 3)<sup>2</sup> = 100", ""),
    ],
)

def slika9(X, Y):
    return (krivulja(X, Y, lambda x: x * x - 2 * x, -2.3, 4.2) + krivulja(X, Y, lambda x: -2 * x / 3 + 5, -2.5, 6, RDECA)
            + tocka(X, Y, 3, 3, "A(3, 3)") + tocka(X, Y, -5 / 3, 55 / 9, "B", -14, -4) + tocka(X, Y, 0, 5, "", 0, 0) + tocka(X, Y, 1, -1, "", 0, 0)
            + f'<text x="{X(0) - 4:.1f}" y="{Y(5) + 4:.1f}" font-size="10" text-anchor="end" fill="currentColor">5</text>')

n9 = naloga(
    9, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 7,
    r"Ana je skušala presečišči premice in parabole na sliki poiskati grafično, vendar točke \(B\) ni mogla natančno odčitati. "
    r"Teme parabole je v točki \((1, -1)\), premica pa seka ordinatno os v točki \((0, 5)\). Zapiši enačbi premice in parabole ter "
    r"izračunaj koordinati točke \(B\)." + mreza((-3, 6), (-2, 8), slika9, sirina=280),
    r"\(y = -\frac{2}{3}x + 5\), \(y = x^2 - 2x\), \(B\left(-\frac{5}{3}, \frac{55}{9}\right)\)",
    [
        ("!premica: k = " + U("3 − 5", "3 − 0") + " = −" + U("2", "3") + ",  y = −" + U("2", "3") + "x + 5", "Smerni koeficient iz točk (0, 5) in A(3, 3)."),
        ("parabola: y = a(x − 1)<sup>2</sup> − 1,  A: 3 = 4a − 1 ⇒ a = 1", "Temenska oblika kvadratne funkcije."),
        ("!y = (x − 1)<sup>2</sup> − 1 = x<sup>2</sup> − 2x", ""),
        ("x<sup>2</sup> − 2x = −" + U("2", "3") + "x + 5  ⇒  3x<sup>2</sup> − 4x − 15 = 0", "Presečišči: izenačimo predpisa in pomnožimo s 3."),
        ("x<sub>1,2</sub> = " + U("4 ± 14", "6") + ":  x = 3 (točka A),  x = −" + U("5", "3"), "Rešitve kvadratne enačbe."),
        ("!B(−" + U("5", "3") + ", " + U("55", "9") + ")", "y = (−2/3)(−5/3) + 5 = 10/9 + 45/9."),
    ],
)

def slika10(X, Y):
    return (krivulja(X, Y, lambda x: 0.5 * math.log(x + 1) / math.log(0.5), -0.995, 8)
            + f'<line x1="{X(-1):.1f}" y1="{Y(3):.1f}" x2="{X(-1):.1f}" y2="{Y(-3):.1f}" stroke="currentColor" stroke-dasharray="5 4"/>'
            + tocka(X, Y, 3, -1, "A(3, −1)", -10, 16))

n10 = naloga(
    10, "funkcije", 6,
    r"Na sliki je graf funkcije \(f(x) = a\log_{\frac{1}{2}}(x + b)\) z navpično asimptoto \(x = -1\) in točka \(A(3, -1)\) na grafu. "
    r"Poišči \(a\) in \(b\) ter izračunaj, za kateri \(x_0\) je \(f(x_0) = -3\)." + mreza((-2, 8), (-3, 3), slika10, sirina=300),
    r"\(b = 1\), \(a = \frac{1}{2}\), \(x_0 = 63\)",
    [
        ("x + b = 0 pri x = −1  ⇒  b = 1", "Navpična asimptota logaritemske funkcije je tam, kjer je argument 0."),
        ("a log<sub>1/2</sub> 4 = −2a = −1  ⇒  a = " + U("1", "2"), "Vstavimo točko A; log₁/₂ 4 = −2."),
        ("!a = " + U("1", "2") + ",  b = 1", ""),
        (U("1", "2") + " log<sub>1/2</sub>(x + 1) = −3  ⇒  log<sub>1/2</sub>(x + 1) = −6", ""),
        ("x + 1 = (" + U("1", "2") + ")<sup>−6</sup> = 64", "Definicija logaritma."),
        ("!x<sub>0</sub> = 63", ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

def slika11(X, Y):
    f = lambda x: 0.12 * x * (x - 3) * (x - 6) * (1 + 0.06 * x)
    pts1 = " ".join(f"{X(x):.1f},{Y(f(x)):.1f}" for x in [i * 3 / 60 for i in range(61)])
    pts2 = " ".join(f"{X(x):.1f},{Y(f(x)):.1f}" for x in [3 + i * 3 / 60 for i in range(61)])
    return (f'<polygon points="{X(0):.1f},{Y(0):.1f} {pts1} {X(3):.1f},{Y(0):.1f}" fill="currentColor" fill-opacity="0.18"/>'
            f'<polygon points="{X(3):.1f},{Y(0):.1f} {pts2} {X(6):.1f},{Y(0):.1f}" fill="currentColor" fill-opacity="0.4"/>'
            + krivulja(X, Y, f, -0.4, 6.5)
            + f'<text x="{X(1):.1f}" y="{Y(0.6):.1f}" font-size="11" fill="currentColor">S₁ = 2,4</text>'
            f'<text x="{X(3.8):.1f}" y="{Y(-1.4):.1f}" font-size="11" fill="currentColor">S₂ = 4,5</text>'
            + "".join(f'<text x="{X(v):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">{v}</text>' for v in (3, 6)))

n11 = naloga(
    11, "integralski_racun", 8,
    r"Zvezna funkcija \(f\) ima natanko tri ničle: \(x_1 = 0\), \(x_2 = 3\) in \(x_3 = 6\). Območje med grafom in abscisno osjo na "
    r"\([0, 3]\) ima ploščino \(S_1 = 2{,}4\), na \([3, 6]\) pa \(S_2 = 4{,}5\) (glej sliko)." + mreza((-1, 7), (-3, 2), slika11, sirina=320)
    + r"S slike preberi ali izračunaj: \(\int_0^3 f(x)\,dx\), \(\int_3^6 f(x)\,dx\), \(\int_0^6 f(x)\,dx\), \(\int_0^3 3f(x)\,dx\), "
    r"\(\int_3^6 \big(f(x) + 2x\big)\,dx\) in \(\int_1^4 f(x - 1)\,dx\).",
    r"\(2{,}4\); \(-4{,}5\); \(-2{,}1\); \(7{,}2\); \(22{,}5\); \(2{,}4\)",
    [
        ("!" + INT("3", "0") + " f dx = 2,4", "Graf je nad osjo: integral je enak ploščini."),
        ("!" + INT("6", "3") + " f dx = −4,5", "Graf je pod osjo: integral je nasprotna vrednost ploščine."),
        ("!" + INT("6", "0") + " f dx = 2,4 − 4,5 = −2,1", "Aditivnost integrala po intervalih."),
        ("!" + INT("3", "0") + " 3f dx = 3 · 2,4 = 7,2", "Konstanto izpostavimo pred integral."),
        (INT("6", "3") + " 2x dx = x<sup>2</sup> " + MEJA("6", "3") + " = 36 − 9 = 27", "Integral potence."),
        ("!" + INT("6", "3") + " (f + 2x) dx = −4,5 + 27 = 22,5", "Integral vsote je vsota integralov."),
        ("!" + INT("4", "1") + " f(x − 1) dx = " + INT("3", "0") + " f(t) dt = 2,4", "Uvedemo novo spremenljivko t = x − 1; meji se premakneta za 1."),
    ],
)

n12 = naloga(
    12, ["funkcije", "geometrijski_liki_telesa"], 7,
    r"Kurilno olje lahko naročimo v trgovini \(A\) ali \(B\); prevoz je treba doplačati in ni odvisen od količine."
    + tabela(["", "Trgovina A", "Trgovina B"], [["Cena za liter olja", "0,82 €", "0,80 €"], ["Cena prevoza", "40 €", "55 €"]])
    + r"12.1. Rezervoar za olje ima obliko kvadra s širino \(9\) dm, dolžino \(16\) dm in višino \(12\) dm. Olje sega do višine "
    r"\(2{,}5\) dm. Lastnica bo dokupila toliko olja, da bo rezervoar poln. V kateri trgovini bo olje s prevozom cenejše in koliko bo "
    r"plačala? (5 točk)<br>"
    r"12.2. Pri kateri količini olja je nakup v obeh trgovinah enako drag? V kateri trgovini je nakup cenejši za večje in v kateri za "
    r"manjše količine? (2 točki)",
    r"12.1. v trgovini B, \(1149{,}40\) € &nbsp; 12.2. pri \(750\) litrih; za večje količine B, za manjše A",
    [
        ("V = 9 · 16 · (12 − 2,5) = 1368 dm<sup>3</sup> = 1368 l", "Manjkajoči del kvadra; 1 dm³ = 1 l."),
        ("A: 1368 · 0,82 + 40 = 1161,76 €", ""),
        ("B: 1368 · 0,80 + 55 = 1149,40 €", ""),
        ("!12.1  ceneje v trgovini B: 1149,40 €", ""),
        ("0,82x + 40 = 0,80x + 55  ⇒  0,02x = 15", "Izenačimo linearni funkciji cene."),
        ("!12.2  x = 750 l; nad 750 l je cenejša B, pod 750 l pa A", "B ima nižjo ceno na liter, A pa cenejši prevoz."),
    ],
    snov=FUN + "linearna_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def fv1(x):
    return (2 * x + 2) / (x * x - 4 * x + 3)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun"], 14,
    r"Za funkcijo \(f\) velja \(f(2x + 1) = \dfrac{x + 1}{x^2 - x}\) za vsak \(x \in \mathbb{R} \setminus \{0, 1\}\).<br>"
    r"1.1. Dokaži, da ima \(f\) predpis \(f(x) = \dfrac{2x + 2}{x^2 - 4x + 3}\). (2 točki)<br>"
    r"1.2. Izračunaj, pri katerih \(x\) ima \(f\) stacionarne točke. (4 točke)<br>"
    r"1.3. Določi ničle in pole funkcije \(f\), nariši njen graf in zapiši enačbo vodoravne asimptote. (6 točk)<br>"
    r"1.4. Nariši krivulji \(y = |f(x)|\) in \(y = f(|x|)\). (2 točki)",
    r"1.2. \(x = -1 \pm 2\sqrt{2}\) &nbsp; 1.3. ničla \(x = -1\), pola \(x = 1\), \(x = 3\), asimptota \(y = 0\)",
    [
        ("t = 2x + 1  ⇒  x = " + U("t − 1", "2"), "Uvedemo novo spremenljivko."),
        ("f(t) = " + U(U("t + 1", "2"), U("t − 1", "2") + " · " + U("t − 3", "2")) + " = " + U("2(t + 1)", "(t − 1)(t − 3)"), "x − 1 = (t − 3)/2."),
        ("!1.1  f(x) = " + U("2x + 2", "x<sup>2</sup> − 4x + 3"), ""),
        ("f '(x) = " + U("2(x<sup>2</sup> − 4x + 3) − (2x + 2)(2x − 4)", "(x<sup>2</sup> − 4x + 3)<sup>2</sup>") + " = " + U("−2x<sup>2</sup> − 4x + 14", "(x<sup>2</sup> − 4x + 3)<sup>2</sup>"), "Pravilo za odvod količnika."),
        ("x<sup>2</sup> + 2x − 7 = 0", "Stacionarne točke: števec odvoda je 0."),
        ("!1.2  x = −1 ± 2" + K("2"), "Rešitve kvadratne enačbe."),
        ("!1.3  ničla x = −1;  pola x = 1, x = 3;  y = 0", "Ničle števca, ničle imenovalca; stopnja števca je manjša od stopnje imenovalca."),
        ("@slika", graf([(fv1, MODRA)], (-5, 7), (-6, 6), tocke=[(-1, 0, "")], sirina=280, visina=260)),
        ("!1.4  y = |f(x)|: dele grafa pod osjo x prezrcalimo čez os x", ""),
        ("@slika", graf([(lambda x: abs(fv1(x)), MODRA)], (-5, 7), (-1, 6), sirina=280, visina=160)),
        ("!y = f(|x|): desni del grafa (x ≥ 0) prezrcalimo čez os y", "Funkcija f(|x|) je soda."),
        ("@slika", graf([(lambda x: fv1(abs(x)), MODRA)], (-6, 6), (-6, 6), sirina=280, visina=260)),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

def obmocje_a(X, Y):
    pts = [(-1, -2), (5, -2), (5, -1), (-1, 5)]
    return (f'<polygon points="{" ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)}" fill="{MODRA}" fill-opacity="0.22" stroke="{MODRA}" stroke-dasharray="5 4"/>')

def krogi(X, Y):
    return (parametricna(X, Y, lambda t: 1 + 0.5 * math.cos(t), lambda t: 0.5 * math.sin(t), 0, 2 * math.pi)
            + parametricna(X, Y, lambda t: 2 + 0.25 * math.cos(t), lambda t: 0.25 * math.sin(t), 0, 2 * math.pi, RDECA))

v2 = naloga(
    2, ["mnozice", "pravokotni_koordinatni_sistem_ravnina", "zaporedja_vrste"], 13,
    r"Reši naloge o množicah točk v ravnini.<br>"
    r"2.1. Nariši množico \(A = \{(x, y) \in \mathbb{R}^2;\ |x - 2| < 3 \wedge y > -2 \wedge x + y < 4\}\). (4 točke)<br>"
    r"2.2. Izračunaj ploščino območja \(B = \{(x, y) \in \mathbb{R}^2;\ |x - 2| \le 3 \wedge y \ge -2 \wedge x + y \le 2026\}\). (3 točke)<br>"
    r"2.3. Nariši množici \(C_1 = \{(x, y);\ (x - 1)^2 + y^2 = 4^{-1}\}\) in \(C_2 = \{(x, y);\ (x - 2)^2 + y^2 = 4^{-2}\}\). (2 točki)<br>"
    r"2.4. Za vsak \(n \in \mathbb{N}\) je \(D_n = \{(x, y);\ (x - n)^2 + y^2 \le 4^{-n}\}\). Izračunaj ploščino unije "
    r"\(D_1 \cup D_2 \cup D_3 \cup \dots\) (4 točke)",
    r"2.2. \(12\,156\) &nbsp; 2.4. \(\frac{\pi}{3}\)",
    [
        ("|x − 2| < 3  ⇔  −1 < x < 5", "Absolutna neenačba je pas med navpičnicama."),
        ("y > −2: nad premico y = −2;  x + y < 4: pod premico y = −x + 4", ""),
        ("@slika", mreza((-2, 6), (-3, 6), obmocje_a, sirina=240)),
        ("!2.1  notranjost štirikotnika z oglišči (−1, −2), (5, −2), (5, −1), (−1, 5); robovi niso vključeni", ""),
        ("B: −1 ≤ x ≤ 5,  −2 ≤ y ≤ 2026 − x", "Območje je trapez z vzporednima navpičnima stranicama."),
        ("stranici: pri x = −1 je 2029, pri x = 5 je 2023; višina 6", "Dolžini navpičnih stranic sta 2026 − x − (−2)."),
        ("!2.2  S = " + U("2029 + 2023", "2") + " · 6 = 12 156", "Ploščina trapeza."),
        ("@slika", mreza((-1, 3), (-1, 1), krogi, sirina=280, oznake=True)),
        ("!2.3  C<sub>1</sub>: krožnica s središčem (1, 0) in r = " + U("1", "2") + ";  C<sub>2</sub>: središče (2, 0), r = " + U("1", "4"), "Enačba krožnice; polmer je koren desne strani."),
        ("D<sub>n</sub>: krog s središčem (n, 0) in polmerom 2<sup>−n</sup>; krogi so disjunktni", "Razdalja središč je 1, vsota polmerov je manjša od 1."),
        ("S = π(4<sup>−1</sup> + 4<sup>−2</sup> + …) = π · " + U("1/4", "1 − 1/4"), "Vsota geometrijske vrste s q = 1/4."),
        ("!2.4  S = " + U("π", "3"), ""),
    ],
)

v3 = naloga(
    3, "zaporedja_vrste", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Zaporedje je dano rekurzivno: \(a_{n+2} = 2a_{n+1} - a_n\), \(a_1 = 3\), \(a_2 = 5\).<br>"
    r"3.1. S popolno indukcijo dokaži, da je \(a_n = 2n + 1\) za vsak \(n \in \mathbb{N}\). (3 točke)<br>"
    r"3.2. Izračunaj vsoto vrste \(\displaystyle\sum_{n=1}^{\infty} \frac{1}{a_n a_{n+1}}\). (4 točke)<br>"
    r"3.3. Izračunaj limite \(\displaystyle\lim_{n \to \infty} \frac{2a_n}{a_n + 1}\), \(\displaystyle\lim_{n \to \infty} \frac{\sin x}{a_n x}\) "
    r"(za \(x \ne 0\)) in \(\displaystyle\lim_{x \to 0} \frac{\sin x}{a_n x}\) (za \(n \in \mathbb{N}\)). (6 točk)",
    r"3.2. \(\frac{1}{6}\) &nbsp; 3.3. \(2\); \(0\); \(\frac{1}{2n + 1}\)",
    [
        ("a<sub>1</sub> = 3 = 2 · 1 + 1,  a<sub>2</sub> = 5 = 2 · 2 + 1", "Baza indukcije: trditev velja za n = 1 in n = 2."),
        ("a<sub>n+2</sub> = 2(2n + 3) − (2n + 1) = 2n + 5 = 2(n + 2) + 1", "Indukcijski korak: predpostavimo, da velja za n in n + 1."),
        ("!a<sub>n</sub> = 2n + 1 za vsak n", ""),
        (U("1", "(2n + 1)(2n + 3)") + " = " + U("1", "2") + " (" + U("1", "2n + 1") + " − " + U("1", "2n + 3") + ")", "Razcep na parcialne ulomke."),
        ("s<sub>n</sub> = " + U("1", "2") + " (" + U("1", "3") + " − " + U("1", "2n + 3") + ")", "Vsota je teleskopska: vmesni členi se odštejejo."),
        ("!3.2  " + LIM("n→∞") + " s<sub>n</sub> = " + U("1", "6"), ""),
        ("!" + LIM("n→∞") + " " + U("4n + 2", "2n + 2") + " = 2", "Števec in imenovalec delimo z n."),
        ("!" + LIM("n→∞") + " " + U("sin x", "x") + " · " + U("1", "2n + 1") + " = 0", "Za fiksen x je sin x / x konstanta, 1/(2n + 1) gre proti 0."),
        ("!" + LIM("x→0") + " " + U("1", "2n + 1") + " · " + U("sin x", "x") + " = " + U("1", "2n + 1"), "Limita sin x / x je 1."),
    ],
)

v4 = naloga(
    4, ["kombinatorika", "verjetnostni_racun"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V učilnici je \(36\) stolov v \(4\) vrstah po \(9\). Šest dijakov (Ana, Bor, Cene, Dora, Eva "
    r"in Filip) se naključno posede.<br>"
    r"4.1. Izračunaj verjetnosti dogodkov \(A\): prva vrsta ostane prazna, \(B\): v prvi vrsti sta zasedena natanko dva stola, \(C\): vsi "
    r"sedijo v isti vrsti. (7 točk)<br>"
    r"4.2. Vsak od šestih dijakov enkrat vrže pošteno igralno kocko. Izračunaj verjetnosti dogodkov \(D\): nihče ne vrže šestice, "
    r"\(E\): natanko dva vržeta šestico, \(F\): vsaj dva vržeta šestico, \(H\): šestico vržeta le Ana in Bor. (6 točk)",
    r"4.1. \(P(A) \approx 0{,}152\), \(P(B) \approx 0{,}324\), \(P(C) = \frac{1}{5797}\) &nbsp; 4.2. \(P(D) \approx 0{,}335\), "
    r"\(P(E) \approx 0{,}201\), \(P(F) \approx 0{,}263\), \(P(H) \approx 0{,}013\)",
    [
        ("vseh razporeditev (izbor stolov): " + BINOM(36, 6) + " = 1 947 792", "Zasedeni stoli so kombinacija 6 izmed 36 (vrstni red dijakov se v števcu in imenovalcu okrajša)."),
        ("!P(A) = " + U(BINOM(27, 6), BINOM(36, 6)) + " = " + U("296 010", "1 947 792") + " ≈ 0,152", "Vsi sedijo v ostalih treh vrstah (27 stolov)."),
        ("!P(B) = " + U(BINOM(9, 2) + " · " + BINOM(27, 4), BINOM(36, 6)) + " ≈ 0,324", "Dva stola v prvi vrsti, štirje drugje."),
        ("!P(C) = " + U("4 · " + BINOM(9, 6), BINOM(36, 6)) + " = " + U("336", "1 947 792") + " = " + U("1", "5797"), "Izberemo vrsto in v njej 6 stolov."),
        ("!P(D) = (" + U("5", "6") + ")<sup>6</sup> ≈ 0,335", "Neodvisni meti."),
        ("!P(E) = " + BINOM(6, 2) + " (" + U("1", "6") + ")<sup>2</sup> (" + U("5", "6") + ")<sup>4</sup> ≈ 0,201", "Bernoullijeva formula."),
        ("!P(F) = 1 − P(D) − 6 · " + U("1", "6") + " (" + U("5", "6") + ")<sup>5</sup> ≈ 0,263", "Nasprotni dogodek: nobena ali natanko ena šestica."),
        ("!P(H) = (" + U("1", "6") + ")<sup>2</sup> (" + U("5", "6") + ")<sup>4</sup> ≈ 0,013", "Določena dva vržeta šestico, ostali štirje ne."),
    ],
)

POLA2 = [v1, v2, v3, v4]
