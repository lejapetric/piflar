# Spomladanski rok 2019 (uradna pola RIC P191-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2019, "spomladanski", "sobota, 8. junij 2019"

# ------------------------------------------------------------------ 1. del
OCENE = [3, 6, 9, 7, 5]


def stolpci_a1():
    H, L = 200, 40
    t = []
    for v in range(0, 11, 2):
        y = H - 30 - v * 14
        t.append(f'<line x1="{L}" y1="{y}" x2="{L + 250}" y2="{y}" stroke="currentColor" stroke-opacity="0.15"/>' + napis(L - 6, y + 4, str(v), 10, sidro="end"))
    for i, f in enumerate(OCENE):
        x = L + 20 + i * 48
        t.append(f'<rect x="{x}" y="{H - 30 - f * 14}" width="26" height="{f * 14}" fill="{MODRA}" fill-opacity="0.8"/>' + napis(x + 13, H - 14, str(i + 1), 11))
    t.append(napis(L + 240, H - 1, "ocena", 10) + napis(L - 30, 12, "število dijakov", 10, sidro="start"))
    return svg(300, H + 4, "".join(t), opis="Stolpčni diagram ocen")

a1 = naloga(
    "A1", "statistika_pm", 4,
    r"Stolpčni diagram prikazuje ocene pisnega preizkusa iz matematike. Izračunaj aritmetično sredino in zapiši modus ocen." + stolpci_a1(),
    r"\(\bar{x} \approx 3{,}17\), \(Mo = 3\)",
    [
        ("n = 3 + 6 + 9 + 7 + 5 = 30", "Preberemo frekvence s stolpcev."),
        ("x̄ = " + U("1 · 3 + 2 · 6 + 3 · 9 + 4 · 7 + 5 · 5", "30") + " = " + U("95", "30"), "", "statistika"),
        ("!x̄ ≈ 3,17", ""),
        ("!Mo = 3", "Ocena z najvišjim stolpcem."),
    ],
)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Odpravi oklepaj in brez računala natančno izračunaj vrednost izraza \(\sqrt{3} \cdot \left(\sqrt{12} - \sqrt{27} + \sqrt{75}\right)\).",
    r"\(12\)",
    [
        (K("36") + " − " + K("81") + " + " + K("225"), K("a") + " · " + K("b") + " = " + K("ab") + ".", "koreni"),
        ("= 6 − 9 + 15", ""),
        ("!= 12", ""),
    ],
)

TA, TB, TC = (1, 1), (8, 2), (3, 6)


def zrcali(P, Q1, Q2):
    (x, y), (x1, y1), (x2, y2) = P, Q1, Q2
    dx, dy = x2 - x1, y2 - y1
    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
    px, py = x1 + t * dx, y1 + t * dy
    return (2 * px - x, 2 * py - y)


def trikotnik_a3(resitev=False):
    k = 22
    X = lambda x: 20 + (x + 3) * k
    Y = lambda y: 20 + (11 - y) * k
    T = lambda P: f"{X(P[0]):.1f},{Y(P[1]):.1f}"
    t = [f'<polygon points="{T(TA)} {T(TB)} {T(TC)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         napis(X(TA[0]) - 8, Y(TA[1]) + 12, "A"), napis(X(TB[0]) + 10, Y(TB[1]) + 4, "B"), napis(X(TC[0]) - 2, Y(TC[1]) - 8, "C")]
    if resitev:
        A1 = zrcali(TA, TB, TC)
        B1 = (2 * TC[0] - TB[0], 2 * TC[1] - TB[1])
        M = ((TA[0] + TC[0]) / 2, (TA[1] + TC[1]) / 2)
        dx, dy = TC[0] - TA[0], TC[1] - TA[1]
        s1, s2 = (M[0] - dy * 0.9, M[1] + dx * 0.9), (M[0] + dy * 0.9, M[1] - dx * 0.9)
        u = lambda P: (P[0] / math.hypot(*P), P[1] / math.hypot(*P))
        ba, bc = u((TA[0] - TB[0], TA[1] - TB[1])), u((TC[0] - TB[0], TC[1] - TB[1]))
        sm = (TB[0] + 8 * (ba[0] + bc[0]) / 2, TB[1] + 8 * (ba[1] + bc[1]) / 2)
        t += [f'<line x1="{X(TA[0])}" y1="{Y(TA[1])}" x2="{X(A1[0]):.1f}" y2="{Y(A1[1]):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
              tocka(X, Y, *A1, "A'", 6, 4),
              f'<line x1="{X(TB[0])}" y1="{Y(TB[1])}" x2="{X(B1[0])}" y2="{Y(B1[1])}" stroke="currentColor" stroke-dasharray="3 3"/>',
              tocka(X, Y, *B1, "B'", 6, 4),
              f'<line x1="{X(s1[0]):.1f}" y1="{Y(s1[1]):.1f}" x2="{X(s2[0]):.1f}" y2="{Y(s2[1]):.1f}" stroke="{RDECA}" stroke-width="1.8"/>',
              napis(X(s1[0]) - 8, Y(s1[1]), "s", 12, RDECA),
              f'<line x1="{X(TB[0])}" y1="{Y(TB[1])}" x2="{X(sm[0]):.1f}" y2="{Y(sm[1]):.1f}" stroke="#1E9E5A" stroke-width="1.8"/>',
              napis(X(sm[0]) - 6, Y(sm[1]) - 6, "s<tspan font-size=\"9\">β</tspan>", 12, "#1E9E5A")]
    return svg(310, 270, "".join(t), opis="Trikotnik ABC" + (" z rešitvijo" if resitev else ""))

a3 = naloga(
    "A3", "geometrija_ravnine", 4,
    r"Na sliki je trikotnik \(ABC\)." + trikotnik_a3()
    + r"3.1. Prezrcali oglišče \(A\) čez stranico \(BC\); zrcalno sliko označi z \(A'\). (1 točka)<br>"
    r"3.2. Prezrcali oglišče \(B\) čez oglišče \(C\); zrcalno sliko označi z \(B'\). (1 točka)<br>"
    r"3.3. Načrtaj simetralo stranice \(AC\). (1 točka)<br>3.4. Načrtaj simetralo kota \(ABC\). (1 točka)",
    r"Načrtovanje (glej rešitev).",
    [
        ("@slika", trikotnik_a3(True)),
        ("!3.1. A' leži na pravokotnici iz A na BC, enako daleč od BC kot A", "Zrcaljenje čez premico.", "konstrukcija"),
        ("!3.2. C je razpolovišče daljice BB'", "Zrcaljenje čez točko (središčna simetrija)."),
        ("!3.3. simetrala s je pravokotna na AC skozi njeno razpolovišče", "Načrtamo jo s šestilom: krožna loka iz A in C z enakim polmerom."),
        ("!3.4. simetrala kota s<sub>β</sub> razpolovi kot pri B", "Iz B zarišemo lok, iz presečišč s krakoma enaka loka; skozi njuno presečišče in B poteka simetrala."),
    ],
)

a4 = naloga(
    "A4", "kombinatorika_verjetnost", 4,
    r"Pevski zbor bo na nastopu zapel \(9\) različnih pesmi, vsako enkrat.<br>"
    r"4.1. Koliko je vseh različnih vrstnih redov izvajanja teh pesmi? (2 točki)<br>"
    r"4.2. Koliko je vseh vrstnih redov, če zbor najnovejšo pesem zapoje čisto na koncu? (2 točki)",
    r"4.1. \(9! = 362\,880\) &nbsp; 4.2. \(8! = 40\,320\)",
    [
        "## 4.1", ("!P<sub>9</sub> = 9! = 362 880", "Permutacije devetih različnih pesmi.", "kombinatorika"),
        "## 4.2", ("!P<sub>8</sub> = 8! = 40 320", "Zadnje mesto je določeno, ostalih 8 pesmi razporejamo poljubno."),
    ],
)

a5 = naloga(
    "A5", "izrazi_potence", 4,
    r"Ali so izjave pravilne? Za vsako zapiši DA ali NE.<br>"
    r"a) \(\left(2^{-1} + 3^{-1}\right)^{-1} = 2 + 3\) &nbsp; b) \(\left(x^{-3}\right)^{2} = x^{-6}\) &nbsp; "
    r"c) \(\left(x^3y^{-2}\right)^{-2} = x^{-6}y^{4}\) &nbsp; d) \(\left(x^2 + 4\right)^0 = 0\)",
    r"a) NE &nbsp; b) DA &nbsp; c) DA &nbsp; d) NE",
    [
        ("!a) NE", "(1/2 + 1/3)⁻¹ = (5/6)⁻¹ = 6/5 ≠ 5."),
        ("!b) DA", "Eksponenta zmnožimo: (−3) · 2 = −6.", "potence"),
        ("!c) DA", "3 · (−2) = −6 in (−2) · (−2) = 4."),
        ("!d) NE", "Potenca z eksponentom 0 je 1 (osnova x² + 4 ni nikoli 0)."),
    ],
)

a6 = naloga(
    "A6", "zaporedja_pm", 4,
    r"Dano je zaporedje s splošnim členom \(a_n = n^2 + 2\). Koliko členov zaporedja je manjših od \(500\)?",
    r"\(22\)",
    [
        ("n<sup>2</sup> + 2 < 500  ⇒  n<sup>2</sup> < 498", ""),
        ("22<sup>2</sup> = 484 < 498,  23<sup>2</sup> = 529 > 498", "Zaporedje narašča."),
        ("!22 členov", "n = 1, 2, …, 22."),
    ],
)

a7 = naloga(
    "A7", "odvod_pm", 4,
    r"Izračunaj vrednost odvoda funkcije \(f(x) = \frac{1}{9}x^3 - 5x\) za \(x = 6\).",
    r"\(f'(6) = 7\)",
    [
        ("f '(x) = " + U("1", "3") + "x<sup>2</sup> − 5", "", "odvod"),
        ("!f '(6) = " + U("36", "3") + " − 5 = 7", ""),
    ],
)

a8 = naloga(
    "A8", "trikotnik_kotne", 5,
    r"Naj bo \(\alpha\) ostri kot in \(\cos \alpha = \frac{5}{13}\).<br>8.1. Natančno izračunaj \(\sin \alpha\). (3 točke)<br>"
    r"8.2. Izračunaj velikost kota \(\alpha\) v stopinjah in minutah. (2 točki)",
    r"8.1. \(\sin \alpha = \frac{12}{13}\) &nbsp; 8.2. \(\alpha \approx 67^\circ 23'\)",
    [
        "## 8.1",
        ("sin<sup>2</sup> α = 1 − " + U("25", "169") + " = " + U("144", "169"), "", "adicijski"),
        ("!sin α = " + U("12", "13"), "Kot je oster, zato je sinus pozitiven."),
        "## 8.2", ("!α ≈ 67,38° ≈ 67°23'", "0,38° · 60 ≈ 23'."),
    ],
)

a9 = naloga(
    "A9", "kvadratna_funkcija", 5,
    r"Zemljišče ima obliko pravokotnika s ploščino \(1200\ \mathrm{m^2}\). Ena stranica je za \(10\) m daljša od druge. Izračunaj dolžino krajše stranice.",
    r"\(30\) m",
    [
        ("x(x + 10) = 1200  ⇒  x<sup>2</sup> + 10x − 1200 = 0", "x je krajša stranica."),
        ("(x + 40)(x − 30) = 0", "", "vieta"),
        ("!x = 30 m", "Dolžina ne more biti negativna."),
    ],
)


def slika_a10(X, Y):
    a = math.log(7, 3)
    t = [krivulja(X, Y, lambda x: 3 ** x, -3, 1.85), krivulja(X, Y, lambda x: 3 ** -x, -1.85, 3), krivulja(X, Y, lambda x: math.log(x, 3), 0.025, 4, RDECA)]
    t.append(f'<line x1="{X(0):.1f}" y1="{Y(7):.1f}" x2="{X(a):.1f}" y2="{Y(7):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
             f'<line x1="{X(a):.1f}" y1="{Y(7):.1f}" x2="{X(a):.1f}" y2="{Y(0):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
             f'<line x1="{X(-1):.1f}" y1="{Y(0):.1f}" x2="{X(-1):.1f}" y2="{Y(3):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
             f'<line x1="{X(-1):.1f}" y1="{Y(3):.1f}" x2="{X(0):.1f}" y2="{Y(3):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>'
             f'<line x1="{X(0):.1f}" y1="{Y(-2):.1f}" x2="{X(1 / 9):.1f}" y2="{Y(-2):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>')
    t.append(tocka(X, Y, a, 7) + tocka(X, Y, -1, 3) + tocka(X, Y, 1 / 9, -2))
    t.append(napis(X(a), Y(0) + 13, "a", 12) + napis(X(0) + 8, Y(3) + 4, "b", 12, sidro="start") + napis(X(1 / 9) + 10, Y(-2) + 4, "(c, −2)", 11, sidro="start")
             + napis(X(0) - 4, Y(7) + 4, "7", 10, sidro="end") + napis(X(-1), Y(0) + 13, "−1", 10)
             + f'<text x="{X(1.9):.1f}" y="{Y(7.6):.1f}" font-size="11" fill="{MODRA}">f</text>'
             + f'<text x="{X(-2.1):.1f}" y="{Y(7.6):.1f}" font-size="11" fill="{MODRA}">g</text>'
             + f'<text x="{X(3.6):.1f}" y="{Y(1.6):.1f}" font-size="11" fill="{RDECA}">h</text>')
    return "".join(t)

a10 = naloga(
    "A10", "eksponentna_logaritemska", 6,
    r"Na sliki so grafi funkcij \(f(x) = 3^x\), \(g(x) = 3^{-x}\) in \(h(x) = \log_3 x\). Izračunaj vrednosti \(a\), \(b\) in \(c\)."
    + mreza((-3, 4), (-3, 8), slika_a10, sirina=280, visina=400, oznake=False),
    r"\(a = \log_3 7 \approx 1{,}77\), \(b = 3\), \(c = \frac{1}{9}\)",
    [
        ("f(a) = 7  ⇒  3<sup>a</sup> = 7", "Točka (a, 7) leži na grafu f."),
        ("!a = log<sub>3</sub> 7 = " + U("log 7", "log 3") + " ≈ 1,77", "", "log_pravila"),
        ("!b = g(−1) = 3<sup>1</sup> = 3", "Točka (−1, b) leži na grafu g."),
        ("h(c) = −2  ⇒  c = 3<sup>−2</sup>", "", "logaritem"),
        ("!c = " + U("1", "9"), ""),
    ],
)


def nalepke():
    k = 4
    t = [f'<rect x="10" y="10" width="{72 * k}" height="{48 * k}" fill="none" stroke="currentColor" stroke-width="1.5"/>']
    for i in range(6):
        for j in range(4):
            t.append(f'<circle cx="{10 + (12 * i + 6) * k}" cy="{10 + (12 * j + 6) * k}" r="{6 * k}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor" stroke-width="0.8"/>')
    return svg(72 * k + 20, 48 * k + 20, "".join(t), opis="Pola z okroglimi nalepkami")

a11 = naloga(
    "A11", "obsegi_ploscine", 6,
    r"Na samolepilni poli pravokotne oblike, dolgi \(72\) cm in široki \(48\) cm, so natisnjene enako velike okrogle nalepke, kot kaže slika. "
    r"Nalepke se med seboj in z robovi pole dotikajo. Koliko odstotkov površine pole je potiskane z nalepkami?" + nalepke(),
    r"\(\approx 78{,}54\,\%\)",
    [
        ("6 nalepk po dolžini: d = 72 : 6 = 12 cm,  r = 6 cm", "Po širini: 48 : 4 = 12 cm, kar se ujema."),
        ("S<sub>nalepk</sub> = 24 · π · 6<sup>2</sup> = 864π ≈ 2714,3 cm<sup>2</sup>", "Nalepk je 6 · 4 = 24.", "krog"),
        ("S<sub>pole</sub> = 72 · 48 = 3456 cm<sup>2</sup>", ""),
        ("!" + U("864π", "3456") + " · 100 % = " + U("π", "4") + " · 100 % ≈ 78,54 %", "", "odstotki"),
    ],
)

# ------------------------------------------------------------------ 2. del
def kvadrat_b1(X, Y):
    T = [(-3, -2), (3, -2), (3, 4), (-3, 4)]
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in T)
    return (f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>'
            + krivulja(X, Y, lambda x: -x + 1, -4, 5, RDECA)
            + tocka(X, Y, -3, -2, "A", -14, 12) + tocka(X, Y, 3, -2, "B", 6, 12) + tocka(X, Y, 3, 4, "C", 6, -4) + tocka(X, Y, -3, 4, "D", -14, -4)
            + tocka(X, Y, 1, 0) + tocka(X, Y, 0, 1))

b1 = naloga(
    "B1", ["linearna_funkcija", "obsegi_ploscine"], 10,
    r"Oglišči kvadrata \(ABCD\) sta \(B(3, -2)\) in \(D(-3, 4)\). Stranica \(AB\) je vzporedna abscisni osi.<br>"
    r"1.1. Nariši kvadrat v koordinatni sistem in izračunaj njegov obseg. (4 točke)<br>"
    r"1.2. Zapiši enačbo premice skozi točki \(B\) in \(D\) ter koordinati točk, v katerih premica seka koordinatni osi. (6 točk)",
    r"1.1. \(A(-3, -2)\), \(C(3, 4)\), \(o = 24\) &nbsp; 1.2. \(y = -x + 1\), \((1, 0)\) in \((0, 1)\)",
    [
        "## 1.1",
        ("A(−3, −2),  C(3, 4)", "AB je vodoravna, zato ima A enako ordinato kot B in enako absciso kot D."),
        ("@slika", mreza((-5, 6), (-4, 6), kvadrat_b1, sirina=300)),
        ("a = |AB| = 3 − (−3) = 6", ""),
        ("!o = 4 · 6 = 24", ""),
        "## 1.2",
        ("k = " + U("4 − (−2)", "−3 − 3") + " = −1", "", "premica"),
        ("y + 2 = −1 · (x − 3)", ""),
        ("!y = −x + 1", ""),
        ("!presečišči z osema: (1, 0) in (0, 1)", "Za os x vstavimo y = 0, za os y pa x = 0."),
    ],
)


def mozaik(koraki):
    k = 9
    t = []
    for n in range(1, koraki + 1):
        siva = n % 2 == 1
        for i in range(n):
            for j in range(n):
                if max(i, j) == n - 1:
                    t.append(f'<rect x="{i * k}" y="{j * k}" width="{k}" height="{k}" fill="{"#9AA3B0" if siva else "currentColor"}" stroke="currentColor" stroke-width="0.4"/>')
    return t


def mozaiki():
    out = []
    for s in range(1, 6):
        ox = 10 + (s - 1) * 62
        out.append(f'<g transform="translate({ox},10)">' + "".join(mozaik(s)) + f'<rect x="0" y="0" width="54" height="54" fill="none" stroke="currentColor" stroke-opacity="0.3"/></g>')
        out.append(napis(ox + 27, 80, f"{s}. korak", 10))
    return svg(330, 90, "".join(out), opis="Mozaik po korakih")

b2 = naloga(
    "B2", ["zaporedja_pm", "kombinatorika_verjetnost"], 10,
    r"Iz sivih in črnih kvadratnih ploščic sestavljamo mozaik. V prvem koraku položimo eno sivo ploščico, v drugem dodamo tri črne, v tretjem "
    r"pet sivih in tako naprej (barvi se izmenjujeta), kot kaže slika." + mozaiki()
    + r"2.1. Koliko ploščic dodamo v šestem, koliko v petindvajsetem in koliko v \(n\)-tem koraku? (6 točk)<br>"
    r"2.2. Vse ploščice mozaika po petem koraku damo v škatlo in naključno hkrati izvlečemo tri. Kolikšna je verjetnost, da so vse tri črne? (4 točke)",
    r"2.1. \(11\), \(49\), \(2n - 1\) &nbsp; 2.2. \(P = \frac{6}{115} \approx 0{,}052\)",
    [
        "## 2.1",
        ("1, 3, 5, 7, …  je aritmetično zaporedje z a<sub>1</sub> = 1, d = 2", "V vsakem koraku dodamo vrstico in stolpec okoli kvadrata.", "aritmeticno"),
        ("!a<sub>6</sub> = 11,  a<sub>25</sub> = 1 + 24 · 2 = 49", ""),
        ("!a<sub>n</sub> = 1 + (n − 1) · 2 = 2n − 1", ""),
        "## 2.2",
        ("vseh: 1 + 3 + 5 + 7 + 9 = 25,  črnih: 3 + 7 = 10", "Črne ploščice dodamo v sodih korakih."),
        ("P = " + U("C<sub>10</sub><sup>3</sup>", "C<sub>25</sub><sup>3</sup>") + " = " + U("120", "2300"), "Vlečemo hkrati: kombinacije.", "verjetnost"),
        ("!P = " + U("6", "115") + " ≈ 0,052", ""),
    ],
)

b3 = naloga(
    "B3", "polinomi_racionalna", 10,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{x^2 - 9}{16 - x^2}\).<br>"
    r"3.1. Izračunaj ničli, pola in začetno vrednost funkcije \(f\). Zapiši enačbo vodoravne asimptote in nariši graf funkcije. (7 točk)<br>"
    r"3.2. Ali točka \(T\left(5, -\frac{16}{9}\right)\) leži na grafu funkcije \(f\)? Odgovor utemelji z računom. (3 točke)",
    r"3.1. ničli \(\pm 3\), pola \(\pm 4\), \(f(0) = -\frac{9}{16}\), asimptota \(y = -1\) &nbsp; 3.2. da",
    [
        "## 3.1",
        ("!ničli: x<sup>2</sup> − 9 = 0  ⇒  x = ±3", "Ničle števca."),
        ("!pola: 16 − x<sup>2</sup> = 0  ⇒  x = ±4", "Ničle imenovalca.", "racionalna"),
        ("!f(0) = −" + U("9", "16"), ""),
        ("!vodoravna asimptota: y = " + U("1", "−1") + " = −1", "Števec in imenovalec sta iste stopnje: razmerje vodilnih koeficientov."),
        ("@slika", graf([(lambda x: (x * x - 9) / (16 - x * x), MODRA), (lambda x: -1, RDECA)], (-8, 8), (-6, 5), [(-3, 0, ""), (3, 0, ""), (0, -9 / 16, "")], sirina=320, visina=240)),
        "## 3.2",
        ("f(5) = " + U("25 − 9", "16 − 25") + " = " + U("16", "−9"), ""),
        ("!f(5) = −" + U("16", "9") + ", zato T leži na grafu", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
