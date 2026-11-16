# Zimski rok 2018 (uradna pola RIC P183-C101-1-1, izpit 5. februarja 2019)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2018, "zimski", "torek, 5. februar 2019"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", ["stevila_deljivost", "zaporedja_pm"], 4,
    r"Zapiši vse pozitivne delitelje števila \(81\). Razvrsti jih od najmanjšega do največjega in ugotovi, ali je zaporedje aritmetično, "
    r"geometrijsko ali nič od tega. Odgovor računsko utemelji.",
    r"\(1, 3, 9, 27, 81\); geometrijsko zaporedje s \(q = 3\)",
    [
        ("81 = 3<sup>4</sup>", "", "D_v"),
        ("!1, 3, 9, 27, 81", "Delitelji so potence števila 3."),
        (U("3", "1") + " = " + U("9", "3") + " = " + U("27", "9") + " = " + U("81", "27") + " = 3", "Količnik sosednjih členov je stalen."),
        ("!zaporedje je geometrijsko (q = 3)", "Ni aritmetično: razlike 2, 6, 18, 54 niso enake."),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Luka je imel \(47\) sličic. Razdelil jih je med prijatelje tako, da je vsak dobil \(6\) sličic, njemu pa jih je ostalo \(5\). Med koliko "
    r"prijateljev je razdelil sličice?",
    r"\(7\)",
    [
        ("6x + 5 = 47", "x je število prijateljev."),
        ("6x = 42", ""),
        ("!x = 7", ""),
    ],
)

a3 = naloga(
    "A3", "kombinatorika_verjetnost", 4,
    r"Na šolski prireditvi s šestimi točkami programa nastopi šest dijakov, vsak v eni točki. Kdo nastopi prvi, je že določeno, vrstni red "
    r"ostalih petih pa še ne. Koliko je vseh možnih vrstnih redov nastopajočih?",
    r"\(120\)",
    [
        ("prvo mesto je določeno, ostalih 5 dijakov razporejamo", ""),
        ("!P<sub>5</sub> = 5! = 120", "", "kombinatorika"),
    ],
)

a4 = naloga(
    "A4", "realna_stevila_koreni", 4,
    r"Brez računala natančno izračunaj vrednost izraza \(\left(\frac{25}{4}\right)^{-\frac{1}{2}} - 0{,}3 : \sqrt[4]{81}\).",
    r"\(0{,}3\)",
    [
        ("(" + U("25", "4") + ")<sup>−1/2</sup> = (" + U("4", "25") + ")<sup>1/2</sup> = " + U("2", "5") + " = 0,4", "Negativni eksponent obrne ulomek; eksponent ½ je kvadratni koren.", "potence"),
        (K("81", 4) + " = 3,  0,3 : 3 = 0,1", ""),
        ("!0,4 − 0,1 = 0,3", ""),
    ],
)

a5 = naloga(
    "A5", "kotne_funkcije_pm", 4,
    r"Ali so izjave pravilne? Za vsako zapiši DA ali NE.<br>"
    r"a) Funkcija \(f(x) = \cos x\) je soda funkcija. &nbsp; b) \(\log_5 3 = \dfrac{\log 3}{\log 5}\) &nbsp; "
    r"c) \(\sin(\alpha - 2\pi) = -\sin \alpha\) &nbsp; d) \(\tan \frac{\pi}{3} = \frac{\sqrt{3}}{3}\)",
    r"a) DA &nbsp; b) DA &nbsp; c) NE &nbsp; d) NE",
    [
        ("!a) DA", "cos(−x) = cos x; graf je simetričen glede na os y."),
        ("!b) DA", "Prehod na novo osnovo.", "log_pravila"),
        ("!c) NE", "Sinus ima periodo 2π, zato je sin(α − 2π) = sin α."),
        ("!d) NE", "tan(π/3) = tan 60° = √3."),
    ],
)

a6 = naloga(
    "A6", "odvod_pm", 4,
    r"Odvajaj funkcijo \(f(x) = 2e^x - x^3 + x^{-2} + 5\).",
    r"\(f'(x) = 2e^x - 3x^2 - 2x^{-3}\)",
    [
        ("(e<sup>x</sup>)′ = e<sup>x</sup>,  (x<sup>n</sup>)′ = nx<sup>n−1</sup>", "", "odvod"),
        ("!f '(x) = 2e<sup>x</sup> − 3x<sup>2</sup> − 2x<sup>−3</sup>", "Odvod konstante 5 je 0."),
    ],
)

a7 = naloga(
    "A7", "ulomki_odstotki", 4,
    r"Kilogram jabolk je pred podražitvijo stal \(2{,}35\) €. Jabolka so se podražila za \(12\,\%\). Za koliko evrov se je podražil kilogram jabolk "
    r"in kolikšna je nova cena?",
    r"za \(\approx 0{,}28\) €; \(\approx 2{,}63\) €",
    [
        ("!podražitev: 0,12 · 2,35 = 0,282 ≈ 0,28 €", "", "odstotki"),
        ("!nova cena: 2,35 · 1,12 = 2,632 ≈ 2,63 €", ""),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Dan je sistem enačb \(2x - y = 7\), \(x + 3y = -7\). Preveri, kateri od urejenih parov je rešitev sistema: "
    r"A \((3, -1)\), B \((2, -3)\), C \((-1, -2)\), D \((4, 1)\). Nato sistem reši z ustreznim postopkom.",
    r"B \((2, -3)\)",
    [
        ("A: 6 + 1 = 7, a 3 − 3 = 0 ≠ −7;  D: 8 − 1 = 7, a 4 + 3 = 7 ≠ −7;  C: −2 + 2 = 0 ≠ 7", "Par mora ustrezati obema enačbama."),
        ("!B: 4 + 3 = 7 in 2 − 9 = −7", ""),
        ("y = 2x − 7  ⇒  x + 3(2x − 7) = −7", "Iz prve enačbe izrazimo y in vstavimo v drugo.", "sistem"),
        ("7x = 14  ⇒  x = 2,  y = −3", ""),
        ("!(x, y) = (2, −3)", ""),
    ],
)

a9 = naloga(
    "A9", "povrsine_prostornine", 5,
    r"Prostornina kvadra z osnovno ploskvijo v obliki kvadrata s ploščino \(36\ \mathrm{cm^2}\) je \(252\ \mathrm{cm^3}\). Izračunaj površino kvadra.",
    r"\(P = 240\ \mathrm{cm^2}\)",
    [
        ("a = " + K("36") + " = 6 cm", ""),
        ("c = " + U("V", "S") + " = " + U("252", "36") + " = 7 cm", "Višina kvadra.", "telesa"),
        ("!P = 2 · 36 + 4 · 6 · 7 = 72 + 168 = 240 cm<sup>2</sup>", "Dve osnovni ploskvi in štiri stranske."),
    ],
)


def skica_a10():
    k = 20
    r = math.radians
    A, B = (0.0, 0.0), (5.0, 0.0)
    D = (7 * math.cos(r(75)), 7 * math.sin(r(75)))
    # C je presečišče poltraka iz B pod kotom 75° in poltraka iz D pod kotom −10° (notranja kota 105° in 95°)
    u, w = (math.cos(r(75)), math.sin(r(75))), (math.cos(r(-10)), math.sin(r(-10)))
    det = u[0] * (-w[1]) - u[1] * (-w[0])
    s_ = ((D[0] - B[0]) * (-w[1]) - (D[1] - B[1]) * (-w[0])) / det
    C = (B[0] + s_ * u[0], B[1] + s_ * u[1])
    M = lambda P: (25 + P[0] * k, 160 - P[1] * k)
    A, B, C, D = M(A), M(B), M(C), M(D)
    p = lambda *T: " ".join(f"{x:.1f},{y:.1f}" for x, y in T)
    t = [f'<polygon points="{p(A, B, C, D)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{B[0]:.1f}" y1="{B[1]:.1f}" x2="{D[0]:.1f}" y2="{D[1]:.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0] + 10, C[1], "C"), napis(D[0] - 8, D[1] - 4, "D"),
         napis(A[0] + 16, A[1] - 6, "75°", 10), napis(B[0] - 4, B[1] - 8, "105°", 10), napis(D[0] + 10, D[1] + 18, "95°", 10),
         napis((A[0] + B[0]) / 2, A[1] + 14, "5 cm", 11), napis((A[0] + D[0]) / 2 - 22, (A[1] + D[1]) / 2, "7 cm", 11)]
    return svg(240, 180, "".join(t), opis="Skica štirikotnika ABCD")

a10 = naloga(
    "A10", "trikotnik_kotne", 6,
    r"V štirikotniku \(ABCD\) merita stranici \(|AB| = 5\) cm in \(|AD| = 7\) cm, koti ob ogliščih \(A\), \(B\) in \(D\) pa \(\alpha = 75^\circ\), "
    r"\(\beta = 105^\circ\) in \(\delta = 95^\circ\). Nariši skico štirikotnika ter izračunaj kot pri oglišču \(C\) in dolžino diagonale \(BD\).",
    r"\(\gamma = 85^\circ\), \(|BD| \approx 7{,}48\) cm",
    [
        ("@slika", skica_a10()),
        ("!γ = 360° − 75° − 105° − 95° = 85°", "Vsota notranjih kotov štirikotnika je 360°."),
        ("|BD|<sup>2</sup> = 5<sup>2</sup> + 7<sup>2</sup> − 2 · 5 · 7 · cos 75° ≈ 55,88", "Kosinusni izrek v trikotniku ABD.", "kosinusni"),
        ("!|BD| ≈ 7,48 cm", ""),
    ],
)

a11 = naloga(
    "A11", "kvadratna_funkcija", 6,
    r"Izračunaj ničli funkcije \(f(x) = x^2 + 6x + 5\) in koordinati temena njenega grafa. Zapiši presečišče grafa z ordinatno osjo in nariši graf.",
    r"\(x_1 = -1\), \(x_2 = -5\), \(T(-3, -4)\), \(N(0, 5)\)",
    [
        ("(x + 1)(x + 5) = 0", "", "vieta"),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = −5", ""),
        ("p = −" + U("6", "2") + " = −3,  q = f(−3) = 9 − 18 + 5 = −4", "", "teme"),
        ("!T(−3, −4),  N(0, 5)", "f(0) = 5."),
        ("@slika", graf([(lambda x: x * x + 6 * x + 5, MODRA)], (-7, 2), (-5, 6), [(-1, 0, ""), (-5, 0, ""), (-3, -4, "T"), (0, 5, "N")], sirina=270, visina=300)),
    ],
)

# ------------------------------------------------------------------ 2. del
def slika_b1(X, Y, tangenta=True):
    f = lambda x: (3 * x - 2) / (x + 2)
    t = [krivulja(X, Y, f, -10, -2.9), krivulja(X, Y, f, -1.6, 6),
         f'<line x1="{X(-2):.1f}" y1="{Y(-8):.1f}" x2="{X(-2):.1f}" y2="{Y(12):.1f}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{X(-10):.1f}" y1="{Y(3):.1f}" x2="{X(6):.1f}" y2="{Y(3):.1f}" stroke="currentColor" stroke-dasharray="4 3"/>',
         tocka(X, Y, -6, 5, "A(−6, 5)", -10, 16)]
    if tangenta:
        t.append(krivulja(X, Y, lambda x: x / 2 + 8, -10, 6, RDECA) + tocka(X, Y, 0, 8, "P", 6, 14))
    return "".join(t)

b1 = naloga(
    "B1", ["polinomi_racionalna", "odvod_pm"], 10,
    r"Na sliki je graf racionalne funkcije \(f(x) = \dfrac{3x - 2}{x + 2}\). V točki \(A(-6, 5)\) je narisana tangenta na graf, ki seka ordinatno os "
    r"v točki \(P\)." + mreza((-10, 6), (-8, 12), slika_b1, sirina=300, oznake=True)
    + r"1.1. Izračunaj ničlo funkcije \(f\) ter zapiši enačbi vodoravne in navpične asimptote. (4 točke)<br>"
    r"1.2. Odvod funkcije je \(f'(x) = \dfrac{8}{(x + 2)^2}\). Zapiši enačbo tangente v točki \(A\) in koordinati točke \(P\). (6 točk)",
    r"1.1. \(x = \frac{2}{3}\), \(y = 3\), \(x = -2\) &nbsp; 1.2. \(y = \frac{1}{2}x + 8\), \(P(0, 8)\)",
    [
        "## 1.1",
        ("!ničla: 3x − 2 = 0  ⇒  x = " + U("2", "3"), "Ničla števca."),
        ("!vodoravna asimptota y = 3,  navpična asimptota x = −2", "Razmerje vodilnih koeficientov; ničla imenovalca.", "racionalna"),
        "## 1.2",
        ("k = f '(−6) = " + U("8", "(−4)<sup>2</sup>") + " = " + U("1", "2"), "Smerni koeficient tangente je odvod v točki.", "odvod"),
        ("y − 5 = " + U("1", "2") + "(x + 6)", "", "tangenta"),
        ("!t: y = " + U("1", "2") + "x + 8", ""),
        ("!P(0, 8)", "Začetna vrednost tangente."),
    ],
)


def trapez_b2():
    k = 22
    A, B = (20, 120), (20 + 10 * k, 120)
    D, C = (20 + 3 * k, 120 - 4 * k), (20 + 7 * k, 120 - 4 * k)
    T = (D[0], 120)
    p = lambda *P: " ".join(f"{x:.1f},{y:.1f}" for x, y in P)
    t = [f'<polygon points="{p(A, B, C, D)}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{p(A, T, D)}" fill="{MODRA}" fill-opacity="0.25"/>',
         f'<line x1="{D[0]}" y1="{D[1]}" x2="{T[0]}" y2="{T[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0] + 8, C[1] - 4, "C"), napis(D[0] - 8, D[1] - 4, "D"),
         napis(T[0], T[1] + 14, "T"), napis(D[0] + 8, (D[1] + T[1]) / 2, "v", 12), napis((A[0] + B[0]) / 2 + 30, A[1] + 14, "a", 12),
         napis((C[0] + D[0]) / 2, C[1] - 6, "c", 12), napis((A[0] + D[0]) / 2 - 10, (A[1] + D[1]) / 2, "b", 12)]
    return svg(260, 140, "".join(t), opis="Enakokraki trapez in trikotnik ATD")

b2 = naloga(
    "B2", ["geometrija_ravnine", "obsegi_ploscine", "ulomki_odstotki"], 10,
    r"V enakokrakem trapezu \(ABCD\) merita osnovnici \(a = 10\) cm in \(c = 4\) cm, višina pa \(v = 4\) cm.<br>"
    r"2.1. Nariši skico trapeza. Izračunaj dolžino kraka in ploščino trapeza. (6 točk)<br>"
    r"2.2. Pravokotni trikotnik \(ATD\) ima pravi kot pri oglišču \(T\), ki leži na stranici \(AB\). Koliko odstotkov ploščine trapeza predstavlja "
    r"ploščina trikotnika \(ATD\)? (4 točke)",
    r"2.1. \(b = 5\) cm, \(S = 28\ \mathrm{cm^2}\) &nbsp; 2.2. \(\approx 21{,}43\,\%\)",
    [
        "## 2.1",
        ("@slika", trapez_b2()),
        ("|AT| = " + U("a − c", "2") + " = 3 cm", "Trapez je enakokrak, zato višini odrežeta enaka kosa."),
        ("!b = " + K("3<sup>2</sup> + 4<sup>2</sup>") + " = 5 cm", "", "pitagora"),
        ("!S = " + U("10 + 4", "2") + " · 4 = 28 cm<sup>2</sup>", "", "ploscine"),
        "## 2.2",
        ("S<sub>ATD</sub> = " + U("3 · 4", "2") + " = 6 cm<sup>2</sup>", ""),
        ("!" + U("6", "28") + " · 100 % ≈ 21,43 %", "", "odstotki"),
    ],
)

SKUPINE = [("oblačila, športna oprema, obutev", 48), ("dobrine za gospodinjstvo", 30), ("hrana in kozmetika", 25), ("elektronska oprema", 22),
           ("vstopnice za prireditve", 19), ("turistične nastanitve", 23), ("računalniška oprema", 17), ("storitve za potovanja", 14)]


def torta_b3():
    cx, cy, r = 100, 95, 80
    d = 360 * 720 / 1550
    a1 = math.radians(90)
    a2 = math.radians(90 - d)
    x1, y1 = cx + r * math.cos(a1), cy - r * math.sin(a1)
    x2, y2 = cx + r * math.cos(a2), cy - r * math.sin(a2)
    t = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{RDECA}" fill-opacity="0.2" stroke="currentColor"/>',
         f'<path d="M {cx} {cy} L {x1:.1f} {y1:.1f} A {r} {r} 0 0 1 {x2:.1f} {y2:.1f} Z" fill="{MODRA}" fill-opacity="0.35" stroke="currentColor"/>',
         napis(cx + 38, cy - 5, "kupovali:", 10) + napis(cx + 38, cy + 9, "720 000", 11),
         napis(cx - 38, cy - 5, "niso kupovali:", 10) + napis(cx - 38, cy + 9, "830 000", 11)]
    return svg(200, 190, "".join(t), opis="Tortni diagram nakupov po internetu")


def stolpci_b3():
    H = 230
    t = []
    for i, (ime, v) in enumerate(SKUPINE):
        x = 30 + i * 34
        t.append(f'<rect x="{x}" y="{H - 30 - v * 3.6:.1f}" width="22" height="{v * 3.6:.1f}" fill="{MODRA}" fill-opacity="0.75"/>'
                 + napis(x + 11, H - 34 - v * 3.6, f"{v} %", 9) + napis(x + 11, H - 14, f"{i + 1}.", 10))
    t.append(f'<line x1="24" y1="{H - 30}" x2="{30 + 8 * 34}" y2="{H - 30}" stroke="currentColor"/>' + napis(170, H, "skupina izdelkov", 10))
    return svg(310, H + 4, "".join(t), opis="Stolpčni diagram deležev")

b3 = naloga(
    "B3", ["statistika_pm", "ulomki_odstotki"], 10,
    r"Tortni diagram prikazuje, koliko oseb, starih od \(16\) do \(74\) let, je v enem letu v neki državi kupovalo po internetu." + torta_b3()
    + r"Osebe, ki so kupovale po internetu, so kupovale izdelke iz različnih skupin; nekatere so kupile izdelke iz več skupin. Preglednica kaže, "
    r"kolikšen delež kupcev po internetu je kupil izdelek iz posamezne skupine."
    + tabela(["skupina", "izdelki", "delež [%]"], [[f"{i + 1}.", ime, str(v)] for i, (ime, v) in enumerate(SKUPINE)])
    + r"3.1. Kolikšen delež oseb, starih od \(16\) do \(74\) let, je kupoval po internetu? Koliko oseb je po internetu kupilo vstopnice za prireditve? (5 točk)<br>"
    r"3.2. S stolpčnim diagramom prikaži deleže kupcev po skupinah izdelkov iz preglednice. (5 točk)",
    r"3.1. \(\approx 46{,}45\,\%\); \(136\,800\) oseb &nbsp; 3.2. stolpčni diagram",
    [
        "## 3.1",
        ("vseh: 720 000 + 830 000 = 1 550 000", ""),
        ("!" + U("720 000", "1 550 000") + " ≈ 0,4645 = 46,45 %", "", "odstotki"),
        ("!vstopnice: 0,19 · 720 000 = 136 800 oseb", "Delež je izražen glede na kupce po internetu."),
        "## 3.2",
        ("@slika", stolpci_b3()),
        (None, "Vsota deležev je več kot 100 %, ker so nekateri kupili izdelke iz več skupin; zato tortni diagram tu ni primeren."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
