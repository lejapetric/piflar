# Jesenski rok 2019 (uradna pola RIC P192-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2019, "jesenski", "ponedeljek, 26. avgust 2019"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Razširi ulomke na najmanjši skupni imenovalec: \(-\frac{5}{6}\), \(\frac{3}{8}\), \(\frac{7}{12}\), \(-1\), \(-\frac{1}{4}\), \(\frac{5}{24}\).",
    r"\(-\frac{20}{24}\), \(\frac{9}{24}\), \(\frac{14}{24}\), \(-\frac{24}{24}\), \(-\frac{6}{24}\), \(\frac{5}{24}\)",
    [
        ("v(6, 8, 12, 4, 24) = 24", "Najmanjši skupni večkratnik imenovalcev.", "D_v"),
        ("!−" + U("20", "24") + ",  " + U("9", "24") + ",  " + U("14", "24") + ",  −" + U("24", "24") + ",  −" + U("6", "24") + ",  " + U("5", "24"),
         "Števec in imenovalec pomnožimo z istim številom: 24 : 6 = 4, 24 : 8 = 3, 24 : 12 = 2, 24 : 4 = 6."),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Reši neenačbo \(\frac{1}{2}(x - 4) + x > 3 - (2 - x)\).",
    r"\(x > 6\)",
    [
        (U("x", "2") + " − 2 + x > 3 − 2 + x", "Odpravimo oklepaje."),
        (U("x", "2") + " − 2 > 1  ⇒  " + U("x", "2") + " > 3", "Na obeh straneh odštejemo x."),
        ("!x > 6", ""),
    ],
)

a3 = naloga(
    "A3", "kvadratna_funkcija", 4,
    r"Izračunaj ničli funkcije \(f(x) = 2x^2 + 5x - 3\).",
    r"\(x_1 = \frac{1}{2}\), \(x_2 = -3\)",
    [
        ("D = 25 + 24 = 49", "", "kvadratna"),
        ("x<sub>1,2</sub> = " + U("−5 ± 7", "4"), ""),
        ("!x<sub>1</sub> = " + U("1", "2") + ",  x<sub>2</sub> = −3", ""),
    ],
)

a4 = naloga(
    "A4", "zaporedja_pm", 4,
    r"Zapiši prve štiri člene geometrijskega zaporedja s količnikom \(2\) in sedmim členom \(320\).",
    r"\(5, 10, 20, 40\)",
    [
        ("a<sub>7</sub> = a<sub>1</sub> · 2<sup>6</sup> = 64a<sub>1</sub> = 320", "", "geometrijsko"),
        ("a<sub>1</sub> = 5", ""),
        ("!5, 10, 20, 40", "Vsak naslednji člen je dvakratnik prejšnjega."),
    ],
)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Poenostavi izraz \(\dfrac{2}{x - 4} - \dfrac{16}{(x + 4)(x - 4)}\).",
    r"\(\dfrac{2}{x + 4}\)",
    [
        (U("2(x + 4) − 16", "(x + 4)(x − 4)"), "Razširimo na skupni imenovalec."),
        ("= " + U("2x − 8", "(x + 4)(x − 4)") + " = " + U("2(x − 4)", "(x + 4)(x − 4)"), ""),
        ("!= " + U("2", "x + 4"), "Okrajšamo (x ≠ 4)."),
    ],
)

a6 = naloga(
    "A6", "linearna_funkcija", 4,
    r"Srečanja štiridesetletnikov se je udeležilo \(12\) moških in nekaj žensk. Vsota starosti vseh udeležencev je bila \(1000\) let. Koliko žensk "
    r"se je udeležilo srečanja?",
    r"\(13\)",
    [
        ("vseh udeležencev: 1000 : 40 = 25", "Vsi so stari 40 let."),
        ("!žensk: 25 − 12 = 13", ""),
    ],
)


def romb_a7():
    a, e = 13, 24
    f = 2 * math.sqrt(a * a - (e / 2) ** 2)
    k = 8
    cx, cy = 120, 60
    A, C = (cx - e / 2 * k, cy), (cx + e / 2 * k, cy)
    B, D = (cx, cy + f / 2 * k), (cx, cy - f / 2 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(A[0] - 10, A[1] + 4, "A"), napis(B[0], B[1] + 15, "B"), napis(C[0] + 10, C[1] + 4, "C"), napis(D[0], D[1] - 5, "D"),
         napis(cx + 50, cy - 4, "e = 24", 11), napis(cx - 66, cy + 30, "a = 13", 11), napis(cx, B[1] - 12, "β", 12)]
    return svg(240, 125, "".join(t), opis="Romb ABCD z diagonalama")

a7 = naloga(
    "A7", "trikotnik_kotne", 4,
    r"Obseg romba meri \(52\) cm, diagonala \(e = |AC|\) pa \(24\) cm. Nariši skico romba in izračunaj velikost notranjega kota pri oglišču \(B\).",
    r"\(\beta \approx 134{,}76^\circ\)",
    [
        ("@slika", romb_a7()),
        ("a = 52 : 4 = 13 cm", ""),
        ("sin " + U("β", "2") + " = " + U("e/2", "a") + " = " + U("12", "13"), "Diagonali se razpolavljata pod pravim kotom; BD razpolavlja kot β.", "kotne"),
        (U("β", "2") + " ≈ 67,38°", ""),
        ("!β ≈ 134,76°", ""),
    ],
)

KNJIGE = [3, 1, 2, 4, 2, 0, 5, 2, 17]

a8 = naloga(
    "A8", "statistika_pm", 5,
    r"V preglednici je število knjig, ki jih je prebral vsak od \(9\) učencev."
    + tabela(["učenec"] + [str(i) for i in range(1, 10)], [["knjige"] + [str(k) for k in KNJIGE]])
    + r"Izračunaj aritmetično sredino in mediano. Koliko učencev je prebralo več knjig od aritmetične sredine in koliko več od mediane?",
    r"\(\bar{x} = 4\), \(Me = 2\); več od sredine \(2\) učenca, več od mediane \(4\) učenci",
    [
        ("!x̄ = " + U("36", "9") + " = 4", "Vsota podatkov je 36.", "statistika"),
        ("urejeno: 0, 1, 2, 2, 2, 3, 4, 5, 17", ""),
        ("!Me = 2", "Srednji (5.) podatek."),
        ("!več od 4: 5 in 17 → 2 učenca", ""),
        ("!več od 2: 3, 4, 5, 17 → 4 učenci", "Skrajna vrednost 17 dvigne sredino, mediane pa ne."),
    ],
)

a9 = naloga(
    "A9", "polinomi_racionalna", 5,
    r"Zapiši polinom tretje stopnje, ki ima ničle \(x_1 = 2\), \(x_2 = -1\), \(x_3 = 4\), pri \(x = 3\) pa ima vrednost \(-2\).",
    r"\(p(x) = \frac{1}{2}(x - 2)(x + 1)(x - 4)\)",
    [
        ("p(x) = a(x − 2)(x + 1)(x − 4)", "Zapis polinoma z ničlami."),
        ("p(3) = a · 1 · 4 · (−1) = −4a = −2", ""),
        ("a = " + U("1", "2"), ""),
        ("!p(x) = " + U("1", "2") + "(x − 2)(x + 1)(x − 4)", "Lahko tudi zmnoženo: ½x³ − 5/2x² + x + 4."),
    ],
)

a10 = naloga(
    "A10", "eksponentna_logaritemska", 6,
    r"Nina je v banki vezala \(6000\) evrov za \(4\) leta. Banka uporablja obrestno obrestovanje z letno obrestno mero \(1{,}2\,\%\) in letnim "
    r"pripisom obresti. Koliko bo imela na računu ob koncu vezave? Za najmanj koliko let bi morala vezati \(6000\) evrov, da bi ji banka pripisala "
    r"vsaj \(500\) evrov obresti?",
    r"\(\approx 6293{,}23\) €; najmanj \(7\) let",
    [
        ("r = 1 + " + U("1,2", "100") + " = 1,012", "", "obresti"),
        ("!G<sub>4</sub> = 6000 · 1,012<sup>4</sup> ≈ 6293,23 €", ""),
        ("6000 · 1,012<sup>n</sup> ≥ 6500  ⇒  1,012<sup>n</sup> ≥ 1,0833", "Glavnica in vsaj 500 € obresti."),
        ("n ≥ " + U("log 1,0833", "log 1,012") + " ≈ 6,71", "", "log_pravila"),
        ("!najmanj 7 let", "Obresti se pripisujejo ob koncu leta."),
    ],
)


def slika_a11(X, Y, q=False):
    t = krivulja(X, Y, lambda x: 2 * x + 1, -3.4, 2.4) + tocka(X, Y, -2, -3) + tocka(X, Y, 2, 5)
    t += f'<text x="{X(2.3):.1f}" y="{Y(5.6):.1f}" font-size="12" fill="{MODRA}">p</text>'
    if q:
        t += krivulja(X, Y, lambda x: x / 3 - 1, -6, 6, RDECA) + f'<text x="{X(5.3):.1f}" y="{Y(1.3):.1f}" font-size="12" fill="{RDECA}">q</text>'
    return t

a11 = naloga(
    "A11", "linearna_funkcija", 6,
    r"V koordinatnem sistemu je narisana premica \(p\) skozi označeni točki. Izračunaj smerni koeficient premice \(p\). V isti koordinatni "
    r"sistem nariši premico \(q\) z enačbo \(y = \frac{1}{3}x - 1\) in izračunaj kot med premicama \(p\) in \(q\)."
    + mreza((-6, 6), (-6, 6), slika_a11, sirina=300),
    r"\(k_p = 2\), \(\varphi = 45^\circ\)",
    [
        ("točki na p: (−2, −3) in (2, 5)", ""),
        ("!k<sub>p</sub> = " + U("5 − (−3)", "2 − (−2)") + " = 2", "", "premica"),
        ("@slika", mreza((-6, 6), (-6, 6), lambda X, Y: slika_a11(X, Y, True), sirina=300)),
        ("tan φ = |" + U(U("1", "3") + " − 2", "1 + " + U("1", "3") + " · 2") + "| = " + U(U("5", "3"), U("5", "3")) + " = 1", ""),
        ("!φ = 45°", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
def kvadrata_b1():
    k = 13
    cx, cy = 120, 110
    R, r = 5 * math.sqrt(2) * k, 3 * math.sqrt(2) * k
    A, B, C, D = (cx, cy - R), (cx - R, cy), (cx, cy + R), (cx + R, cy)
    E, F, G, H = (cx, cy - r), (cx - r, cy), (cx, cy + r), (cx + r, cy)
    p = lambda *T: " ".join(f"{x:.1f},{y:.1f}" for x, y in T)
    t = [f'<polygon points="{p(A, B, C, D)}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{p(E, F, G, H)}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{p(E, G, H)}" fill="{MODRA}" fill-opacity="0.3"/>',
         f'<line x1="{A[0]}" y1="{A[1]:.1f}" x2="{C[0]}" y2="{C[1]:.1f}" stroke="currentColor"/>',
         napis(A[0], A[1] - 5, "A"), napis(B[0] - 9, B[1] + 4, "B"), napis(C[0], C[1] + 14, "C"), napis(D[0] + 9, D[1] + 4, "D"),
         napis(E[0] - 9, E[1] + 2, "E"), napis(F[0] - 9, F[1] + 4, "F"), napis(G[0] - 9, G[1] + 10, "G"), napis(H[0] + 9, H[1] + 4, "H")]
    return svg(240, 225, "".join(t), opis="Kvadrata s skupnim središčem")

b1 = naloga(
    "B1", ["obsegi_ploscine", "ulomki_odstotki"], 10,
    r"Na sliki sta kvadrata \(ABCD\) in \(EFGH\) s skupnim središčem. Ploščina osenčenega dela je \(18\ \mathrm{cm^2}\), dolžina daljice \(AC\) pa "
    r"\(10\sqrt{2}\) cm." + kvadrata_b1()
    + r"1.1. Izračunaj ploščino kvadrata \(EFGH\) in dolžino njegove stranice. Izračunaj še dolžino stranice kvadrata \(ABCD\). (6 točk)<br>"
    r"1.2. Koliko odstotkov ploščine kvadrata \(ABCD\) predstavlja ploščina kvadrata \(EFGH\)? (4 točke)",
    r"1.1. \(36\ \mathrm{cm^2}\), \(6\) cm, \(10\) cm &nbsp; 1.2. \(36\,\%\)",
    [
        "## 1.1",
        ("!S<sub>EFGH</sub> = 2 · 18 = 36 cm<sup>2</sup>", "Diagonala EG razdeli kvadrat na dva skladna trikotnika; osenčen je eden."),
        ("!stranica EFGH: " + K("36") + " = 6 cm", ""),
        ("AC je diagonala: a" + K("2") + " = 10" + K("2"), "Diagonala kvadrata je a√2."),
        ("!stranica ABCD: 10 cm", ""),
        "## 1.2",
        ("!" + U("36", "100") + " · 100 % = 36 %", "S_ABCD = 100 cm².", "odstotki"),
    ],
)


def slika_b2(X, Y):
    return (krivulja(X, Y, lambda x: math.log(x, 4), 0.02, 10.5) + tocka(X, Y, 1, 0, "", 0, 0)
            + tocka(X, Y, 4, 1, "(4, 1)", -6, -8) + tocka(X, Y, 8, 1.5, "A(8, 3/2)", -30, -9) + tocka(X, Y, 10, math.log(10, 4), "B", 4, 14))

b2 = naloga(
    "B2", "eksponentna_logaritemska", 10,
    r"Dana je funkcija \(f(x) = \log_4 x\).<br>"
    r"2.1. Nariši njen graf. Zapiši definicijsko območje funkcije \(f\) in interval, na katerem je \(f\) negativna. (6 točk)<br>"
    r"2.2. Točki \(A\left(x, \frac{3}{2}\right)\) in \(B(10, y)\) ležita na grafu funkcije \(f\). Natančno izračunaj absciso točke \(A\) in na dve "
    r"decimalki natančno ordinato točke \(B\). (4 točke)",
    r"2.1. \(D_f = (0, \infty)\), negativna na \((0, 1)\) &nbsp; 2.2. \(x = 8\), \(y \approx 1{,}66\)",
    [
        "## 2.1",
        ("@slika", mreza((-1, 11), (-3, 3), slika_b2, sirina=330)),
        ("!D<sub>f</sub> = (0, ∞)", "Logaritmiramo lahko le pozitivna števila."),
        ("!f(x) < 0 za x ∈ (0, 1)", "Osnova 4 > 1: graf narašča in seka os x pri x = 1."),
        "## 2.2",
        (U("3", "2") + " = log<sub>4</sub> x  ⇒  x = 4<sup>3/2</sup> = (" + K("4") + ")<sup>3</sup>", "", "logaritem"),
        ("!x = 8", ""),
        ("y = log<sub>4</sub> 10 = " + U("log 10", "log 4") + " = " + U("1", "log 4"), "Prehod na desetiški logaritem.", "log_pravila"),
        ("!y ≈ 1,66", ""),
    ],
)

STOP = [("−300°", r"-\frac{5\pi}{3}", r"\frac{\sqrt{3}}{2}"), ("−60°", r"-\frac{\pi}{3}", r"-\frac{\sqrt{3}}{2}"),
        ("45°", r"\frac{\pi}{4}", r"\frac{\sqrt{2}}{2}"), ("135°", r"\frac{3\pi}{4}", r"\frac{\sqrt{2}}{2}"), ("225°", r"\frac{5\pi}{4}", r"-\frac{\sqrt{2}}{2}")]

b3 = naloga(
    "B3", ["kotne_funkcije_pm", "zaporedja_pm"], 10,
    r"V preglednici so vrednosti spremenljivke \(x\) v stopinjah."
    + tabela(["x v stopinjah", "x v radianih", r"\(\sin x\)"], [[s, "", ""] for s, _, _ in STOP])
    + r"3.1. Izpolni preglednico. (5 točk)<br>"
    r"3.2. Izmed petih danih vrednosti v stopinjah izberi tri, ki so prvi trije členi naraščajočega aritmetičnega zaporedja. Izračunaj diferenco, "
    r"zapiši četrti člen in izračunaj vsoto prvih desetih členov. (5 točk)",
    r"3.1. glej preglednico &nbsp; 3.2. \(45^\circ, 135^\circ, 225^\circ\); \(d = 90^\circ\), \(a_4 = 315^\circ\), \(s_{10} = 4500^\circ\)",
    [
        "## 3.1",
        ("@slika", tabela(["x [°]", "x [rad]", "sin x"], [["−300°", "−5π/3", "√3/2"], ["−60°", "−π/3", "−√3/2"], ["45°", "π/4", "√2/2"],
                                                         ["135°", "3π/4", "√2/2"], ["225°", "5π/4", "−√2/2"]])),
        (None, "Radiane dobimo z x · π/180°; sin preberemo na enotski krožnici (npr. sin(−300°) = sin 60°)."),
        "## 3.2",
        ("!45°, 135°, 225°  ⇒  d = 90°", "Med −300°, −60° in drugimi ni enakih razmikov."),
        ("!a<sub>4</sub> = 225° + 90° = 315°", ""),
        ("!s<sub>10</sub> = " + U("10", "2") + " · (2 · 45° + 9 · 90°) = 5 · 900° = 4500°", "", "aritmeticno"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
