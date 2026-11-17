# Zimski rok 2016 (uradna pola RIC P163-C101-1-1); zgradba tega obdobja: 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2016, "zimski", "petek, 3. februar 2017"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "zaporedja_pm", 4,
    r"Maja je prvi teden pretekla \(12\) km. Vsak naslednji teden je pretekla \(2\) km več kakor teden pred tem. "
    r"Izračunaj, koliko kilometrov je pretekla peti teden in za koliko odstotkov več je pretekla peti teden kakor prvi teden.",
    r"\(20\) km, \(\approx 66{,}67\,\%\) več",
    [
        ("a<sub>1</sub> = 12, d = 2", "Razdalje tvorijo aritmetično zaporedje.", "aritmeticno"),
        ("!a<sub>5</sub> = a<sub>1</sub> + 4d = 12 + 8 = 20 km", ""),
        (U("20", "12") + " ≈ 1,6667", "Peti teden je pretekla 166,67 % razdalje prvega tedna.", "odstotki"),
        ("!≈ 66,67 % več", ""),
    ],
)


def trikotnik_a2(resitev=False):
    k = 34
    b = 6 * math.sin(math.radians(45)) / math.sin(math.radians(75))
    Cx, Cy = b * math.cos(math.radians(60)), b * math.sin(math.radians(60))
    X = lambda x: 25 + x * k
    Y = lambda y: 165 - y * k
    t = [f'<polygon points="{X(0)},{Y(0)} {X(6)},{Y(0)} {X(Cx):.1f},{Y(Cy):.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         napis(X(0) - 10, Y(0) + 4, "A"), napis(X(6) + 10, Y(0) + 4, "B"), napis(X(Cx), Y(Cy) - 8, "C")]
    if resitev:
        r = 1.2 * k
        # 60°: lok s središčem A in enako velik lok s središčem v presečišču
        t += [f'<path d="M {X(0) + r} {Y(0)} A {r} {r} 0 0 0 {X(0) + r * 0.5:.1f} {Y(0) - r * 0.866:.1f}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>',
              f'<path d="M {X(0) + r * 0.2:.1f} {Y(0) - r * 0.6:.1f} A {r} {r} 0 0 0 {X(0) + r * 0.7:.1f} {Y(0) - r * 0.95:.1f}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>',
              f'<line x1="{X(6)}" y1="{Y(0)}" x2="{X(6)}" y2="{Y(2.6)}" stroke="currentColor" stroke-dasharray="3 3"/>',
              f'<path d="M {X(6) - r} {Y(0)} A {r} {r} 0 0 1 {X(6)} {Y(0) - r}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>',
              napis(X(0) + 30, Y(0) - 6, "60°", 10, RDECA), napis(X(6) - 26, Y(0) - 6, "45°", 10, RDECA),
              napis(X(3), Y(0) + 16, "c = 6 cm", 11)]
    else:
        t += [napis(X(3), Y(0) + 16, "c", 12), napis(X(0) + 26, Y(0) - 6, "α", 11), napis(X(6) - 24, Y(0) - 6, "β", 11),
              napis(X(Cx / 2) - 10, Y(Cy / 2), "b", 12), napis(X((6 + Cx) / 2) + 10, Y(Cy / 2), "a", 12)]
    return svg(260, 190, "".join(t), opis="Trikotnik ABC" + (" – konstrukcija" if resitev else " – skica"))

a2 = naloga(
    "A2", "geometrija_ravnine", 4,
    r"Dan je trikotnik \(ABC\) s podatki: \(c = 6\) cm, \(\alpha = 60^\circ\) in \(\beta = 45^\circ\). Nariši skico in konstruiraj trikotnik \(ABC\). "
    r"Kota \(\alpha\) in \(\beta\) konstruiraj s šestilom in ravnilom.",
    r"Konstrukcija (glej rešitev).",
    [
        ("@slika", trikotnik_a2()),
        ("Narišemo stranico AB = 6 cm.", "", "konstrukcija"),
        ("Kot 60° v A: lok s središčem A seka AB; z istim polmerom iz presečišča odmerimo lok.", "Tako dobimo enakostranični trikotnik, njegov kot je 60°."),
        ("Kot 45° v B: konstruiramo pravokotnico na AB in pravi kot razpolovimo.", ""),
        ("@slika", trikotnik_a2(True)),
        ("!Kraka kotov se sekata v oglišču C.", "Preverimo: γ = 180° − 60° − 45° = 75°."),
    ],
)

a3 = naloga(
    "A3", "izrazi_potence", 4,
    r"Brez uporabe žepnega računala izračunaj vrednost izraza \(\left(1 + \frac{a}{b}\right)^2 - 2b + b^{-2}\) za \(a = -3\) in \(b = 2\).",
    r"\(-\frac{7}{2}\)",
    [
        ("(1 − " + U("3", "2") + ")<sup>2</sup> = (−" + U("1", "2") + ")<sup>2</sup> = " + U("1", "4"), ""),
        ("2b = 4,  b<sup>−2</sup> = " + U("1", "4"), "", "potence"),
        (U("1", "4") + " − 4 + " + U("1", "4") + " = " + U("1", "2") + " − 4", ""),
        ("!= −" + U("7", "2"), ""),
    ],
)

a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"V koordinatnem sistemu osenči množico točk \((x, y)\), za katere velja \(-1 \le x \le 2\) in \(1 \le y \le 3\), in izračunaj ploščino osenčenega območja.",
    r"\(p = 6\)",
    [
        ("@slika", mreza((-3, 4), (-2, 5), lambda X, Y: f'<rect x="{X(-1):.1f}" y="{Y(3):.1f}" width="{X(2) - X(-1):.1f}" height="{Y(1) - Y(3):.1f}" '
                                                       f'fill="{MODRA}" fill-opacity="0.35" stroke="{MODRA}" stroke-width="2"/>', sirina=260)),
        ("Območje je pravokotnik s stranicama 2 − (−1) = 3 in 3 − 1 = 2.", "Meje so vključene, zato so stranice narisane s polno črto."),
        ("!p = 3 · 2 = 6", "Ploščina v kvadratnih enotah."),
    ],
)

a5 = naloga(
    "A5", "linearna_funkcija", 4,
    r"Dana je premica z enačbo \(3x + 2y = 6\). Zapiši njeno enačbo v eksplicitni obliki in jo nariši v koordinatni sistem.",
    r"\(y = -\frac{3}{2}x + 3\)",
    [
        ("2y = −3x + 6", "", "premica"),
        ("!y = −" + U("3", "2") + "x + 3", ""),
        (None, "Začetna vrednost 3, ničla x = 2."),
        ("@slika", graf([(lambda x: -1.5 * x + 3, MODRA)], (-2, 5), (-4, 6), [(0, 3, ""), (2, 0, "")], sirina=260, visina=340)),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(\log_3 (x - 6) + \log_3 x = 3\).",
    r"\(x = 9\)",
    [
        ("pogoj: x > 6", "Logaritmiramo lahko le pozitivna števila."),
        ("log<sub>3</sub> (x(x − 6)) = 3", "Vsota logaritmov je logaritem produkta.", "log_pravila"),
        ("x<sup>2</sup> − 6x = 27  ⇒  x<sup>2</sup> − 6x − 27 = 0", "", "logaritem"),
        ("(x − 9)(x + 3) = 0", "", "kvadratna"),
        ("!x = 9", "x = −3 ne ustreza pogoju."),
    ],
)

LETA = list(range(2016, 2025))
OBISK = [12450, 12890, 13320, 13870, 6540, 8910, 12210, 14060, 14750]

a7 = naloga(
    "A7", "statistika_pm", 5,
    r"V preglednici je število obiskovalcev nekega muzeja od leta 2016 do leta 2024 (izmišljeni podatki). Izračunaj aritmetično sredino števila obiskovalcev "
    r"v tem obdobju in ugotovi, katerega leta se je število obiskovalcev najbolj razlikovalo od aritmetične sredine."
    + tabela(["Leto", "Število obiskovalcev"], [[str(l), f"{o:,}".replace(",", " ")] for l, o in zip(LETA, OBISK)]),
    r"\(\bar{x} \approx 12\,111\), leta 2020",
    [
        ("x̄ = " + U("109 000", "9"), "Vsota vseh devetih podatkov je 109 000.", "statistika"),
        ("!x̄ ≈ 12 111", ""),
        ("2020: 6540 − 12 111 ≈ −5571", "Odstopanje leta 2020 je največje (2021: ≈ −3201, 2024: ≈ +2639)."),
        ("!leta 2020", ""),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Slika prikazuje graf kvadratne funkcije \(f(x) = ax^2 + 6x + c\). Izračunaj vrednosti koeficientov \(a\) in \(c\)."
    + graf([(lambda x: -3 * x * x + 6 * x + 9, MODRA)], (-2, 4), (-3, 13), [(-1, 0, "−1"), (3, 0, "3"), (0, 9, "9"), (1, 12, "T(1, 12)")], sirina=240, visina=420),
    r"\(a = -3\), \(c = 9\)",
    [
        ("!c = f(0) = 9", "Graf seka ordinatno os v točki (0, 9).", "kvadratna"),
        ("ničli x<sub>1</sub> = −1, x<sub>2</sub> = 3  ⇒  teme pri p = 1", "Teme leži na sredini med ničlama."),
        ("p = −" + U("b", "2a") + " = −" + U("6", "2a") + " = 1", "", "teme"),
        ("!a = −3", "Preizkus: f(3) = −27 + 18 + 9 = 0."),
    ],
)


def trapez_a9():
    k = 20
    sa = 5 / 7
    ae = math.sqrt(49 - 25)
    A, E = (20, 130), (20 + ae * k, 130)
    D, B, C = (E[0], 130 - 5 * k), (20 + 13 * k, 130), (20 + 11 * k, 130 - 5 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]:.1f},{D[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{E[0]:.1f}" y1="{E[1]}" x2="{D[0]:.1f}" y2="{D[1]}" stroke="{RDECA}" stroke-width="1.6"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0] + 8, C[1] - 4, "C"),
         napis(D[0] - 4, D[1] - 6, "D"), napis(E[0], E[1] + 14, "E"),
         napis(E[0] + 18, (E[1] + D[1]) / 2, "5 cm", 10, RDECA), napis((A[0] + D[0]) / 2 - 18, (A[1] + D[1]) / 2, "7 cm", 10)]
    return svg(300, 150, "".join(t), opis="Trapez ABCD z višino ED")

a9 = naloga(
    "A9", "trikotnik_kotne", 5,
    r"V trapezu \(ABCD\) meri višina \(ED\) \(5\) cm, stranica \(AD\) pa \(7\) cm. Kot pri oglišču \(A\) je oster. "
    r"Izračunaj velikosti kotov pri ogliščih \(A\) in \(D\)." + trapez_a9(),
    r"\(\alpha \approx 45{,}58^\circ\), \(\delta \approx 134{,}42^\circ\)",
    [
        ("sin α = " + U("ED", "AD") + " = " + U("5", "7"), "Trikotnik AED je pravokoten s pravim kotom pri E.", "kotne"),
        ("!α ≈ 45,58°", ""),
        ("!δ = 180° − α ≈ 134,42°", "Kota ob istem kraku trapeza sta suplementarna (AB ∥ CD)."),
    ],
)

# ------------------------------------------------------------------ 2. del
P = lambda x: x ** 3 + 3 * x * x - 4

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 + 3x^2 - 4\).<br>"
    r"1.1. Izračunaj ničle in začetno vrednost polinoma \(p\). (5 točk)<br>"
    r"1.2. Izračunaj koordinate točk, v katerih polinom \(p\) doseže ekstrema. (6 točk)<br>"
    r"1.3. V koordinatni sistem nariši graf polinoma \(p\). (4 točke)",
    r"1.1. \(x_1 = 1\), \(x_{2,3} = -2\), \(p(0) = -4\) &nbsp; 1.2. \(\max(-2, 0)\), \(\min(0, -4)\)",
    [
        "## 1.1",
        ("p(1) = 1 + 3 − 4 = 0  ⇒  x<sub>1</sub> = 1", "Celoštevilske ničle iščemo med delitelji prostega člena.", "horner"),
        ("p(x) = (x − 1)(x<sup>2</sup> + 4x + 4) = (x − 1)(x + 2)<sup>2</sup>", "Hornerjev algoritem: koeficienti 1, 4, 4, ostanek 0."),
        ("!x<sub>1</sub> = 1,  x<sub>2,3</sub> = −2 (dvojna ničla)", ""),
        ("!p(0) = −4", "Začetna vrednost je prosti člen."),
        "## 1.2",
        ("p'(x) = 3x<sup>2</sup> + 6x = 3x(x + 2)", "", "odvod"),
        ("p'(x) = 0  ⇒  x = 0 ali x = −2", "Stacionarni točki."),
        ("!lokalni maksimum: (−2, 0)", "p(−2) = −8 + 12 − 4 = 0; odvod se tu spremeni iz + v −."),
        ("!lokalni minimum: (0, −4)", "Odvod se tu spremeni iz − v +."),
        "## 1.3",
        ("@slika", graf([(P, MODRA)], (-4, 3), (-6, 6), [(1, 0, ""), (-2, 0, "max"), (0, -4, "min")], sirina=280, visina=440)),
        (None, "Pri dvojni ničli −2 se graf osi dotakne, pri x = 1 jo seka."),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 15,
    r"Izrazi \(x - 1\), \(3x\), \(36\) so prvi trije členi geometrijskega zaporedja.<br>"
    r"2.1. Izračunaj \(x\) in zapiši prvih pet členov zaporedja. (6 točk)<br>"
    r"2.2. Izračunaj količnik \(q\) zaporedja za \(x = 2\). Kateri člen zaporedja je enak \(279\,936\)? (6 točk)<br>"
    r"2.3. Izračunaj vsoto prvih devetih členov zaporedja za \(x = 2\). (3 točke)",
    r"2.1. \(x = 2\); \(1, 6, 36, 216, 1296\) &nbsp; 2.2. \(q = 6\), \(a_8\) &nbsp; 2.3. \(S_9 = 2\,015\,539\)",
    [
        "## 2.1",
        ("(3x)<sup>2</sup> = (x − 1) · 36", "Srednji člen na kvadrat je produkt sosednjih.", "geometrijsko"),
        ("9x<sup>2</sup> − 36x + 36 = 0  ⇒  x<sup>2</sup> − 4x + 4 = 0", ""),
        ("!x = 2", "(x − 2)² = 0."),
        ("!1, 6, 36, 216, 1296", ""),
        "## 2.2",
        ("!q = " + U("6", "1") + " = 6", ""),
        ("a<sub>n</sub> = 1 · 6<sup>n−1</sup> = 279 936 = 6<sup>7</sup>", "", "eksponentna"),
        ("!n − 1 = 7  ⇒  n = 8", "Osmi člen je 279 936."),
        "## 2.3",
        ("S<sub>9</sub> = a<sub>1</sub> · " + U("q<sup>9</sup> − 1", "q − 1") + " = " + U("6<sup>9</sup> − 1", "5") + " = " + U("10 077 695", "5"), ""),
        ("!S<sub>9</sub> = 2 015 539", ""),
    ],
)


def miza_b3():
    k = 1.0
    V, A, B = (150, 15), (75, 240), (225, 240)
    D, C, M, N = (100, 165), (200, 165), (150, 165), (150, 240)
    t = [f'<polyline points="{A[0]},{A[1]} {V[0]},{V[1]} {B[0]},{B[1]}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{V[0]}" y1="{V[1]}" x2="{N[0]}" y2="{N[1]}" stroke="currentColor" stroke-dasharray="2 3" stroke-opacity="0.6"/>',
         f'<line x1="40" y1="240" x2="260" y2="240" stroke="currentColor"/>',
         f'<polyline points="{D[0]},{A[1]} {D[0]},{D[1]} {C[0]},{C[1]} {C[0]},{A[1]}" fill="none" stroke="{MODRA}" stroke-width="3"/>',
         napis(V[0], V[1] - 4, "V"), napis(A[0] - 4, A[1] + 14, "A"), napis(B[0] + 4, B[1] + 14, "B"),
         napis(D[0] - 10, D[1] - 4, "D"), napis(C[0] + 10, C[1] - 4, "C"), napis(M[0] + 10, M[1] - 4, "M"), napis(N[0], N[1] + 14, "N"),
         napis(A[0] + 14, A[1] - 5, "α", 11), napis(B[0] - 14, B[1] - 5, "α", 11)]
    return svg(300, 262, "".join(t), opis="Pogled s strani: luč V, miza DC in senca AB")

b3 = naloga(
    "B3", "trikotnik_kotne", 15,
    r"Rob \(DC\) kvadratne mize meri \(100\) cm, višina mize \(MN\) pa \(75\) cm." + miza_b3()
    + r"3.1. Luč v točki \(V\) na \(225\) cm visokem stropu (navpično nad središčem mize) oriše senco mize na tleh; na sliki je pogled s strani. "
    r"Izračunaj dolžino sence \(AB\) in velikost kota \(\alpha\). (8 točk)<br>"
    r"3.2. Na mizo položimo okrogel prt s polmerom \(40\) cm. Največ koliko odstotkov mize lahko prekrijemo s prtom? (5 točk)<br>"
    r"3.3. Na mizi stoji šest kozarcev različnih barv. Na koliko načinov lahko izberemo dva kozarca? (2 točki)",
    r"3.1. \(AB = 150\) cm, \(\alpha \approx 71{,}57^\circ\) &nbsp; 3.2. \(\approx 50{,}27\,\%\) &nbsp; 3.3. \(15\)",
    [
        "## 3.1",
        ("VM = 225 − 75 = 150 cm", "Razdalja od luči do mize."),
        (U("AB", "DC") + " = " + U("VN", "VM") + "  ⇒  AB = 100 · " + U("225", "150"), "Trikotnika VDC in VAB sta podobna."),
        ("!AB = 150 cm", ""),
        ("A je od navpičnice skozi D oddaljena " + U("150 − 100", "2") + " = 25 cm", ""),
        ("tan α = " + U("75", "25") + " = 3", "Kot α je kot med žarkom in tlemi; nasproti mu leži višina mize.", "kotne"),
        ("!α ≈ 71,57°", ""),
        "## 3.2",
        ("p<sub>prta</sub> = π · 40<sup>2</sup> = 1600π cm<sup>2</sup>", "Prt leži v celoti na mizi, ko je njegov premer 80 cm manjši od roba.", "krog"),
        ("p<sub>mize</sub> = 100<sup>2</sup> = 10 000 cm<sup>2</sup>", ""),
        ("!" + U("1600π", "10 000") + " ≈ 0,5027 = 50,27 %", ""),
        "## 3.3",
        ("!C<sub>2</sub><sup>6</sup> = " + U("6 · 5", "2") + " = 15", "Vrstni red izbire ni pomemben.", "kombinatorika"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
