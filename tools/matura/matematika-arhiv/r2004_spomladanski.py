# Spomladanski rok 2004 (uradni poli RIC: m041-401-1-1 osnovna raven, m041-402-1-2 višja raven, pola 2)
# Leta 2004 je imela pola 1 osnovne ravni 12 nalog za 72 točk, pola 2 višje ravni pa tri obvezne naloge za 72 točk.
import math
from lib import (U, K, V, INT, MEJA, naloga, tabela, mreza, krivulja, tocka, svg, MODRA, RDECA)

LETO, ROK = 2004, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1 (osnovna raven)
def slika1(X, Y):
    return (f'<polygon points="{X(-2):.1f},{Y(0):.1f} {X(4):.1f},{Y(0):.1f} {X(1):.1f},{Y(3):.1f}" fill="{MODRA}" fill-opacity="0.15"/>'
            + krivulja(X, Y, lambda x: x + 2, -3, 3, MODRA) + krivulja(X, Y, lambda x: -x + 4, -1, 5, RDECA)
            + tocka(X, Y, -2, 0, "", 0, 0) + tocka(X, Y, 4, 0, "", 0, 0) + tocka(X, Y, 1, 3, "(1, 3)", 8, 0))

n1 = naloga(
    1, "pravokotni_koordinatni_sistem_ravnina", 5,
    r"Nariši premici \(y = x + 2\) in \(y = -x + 4\). Izračunaj ploščino trikotnika, ki ga premici oklepata z abscisno osjo.",
    r"\(S = 9\)",
    [
        ("@slika", mreza((-3, 5), (-1, 5), slika1, sirina=260)),
        ("ničli premic: x = −2 in x = 4", "Presečišči z abscisno osjo."),
        ("x + 2 = −x + 4  ⇒  x = 1,  y = 3", "Presečišče premic je tretje oglišče."),
        ("osnovnica 6, višina 3", ""),
        ("!S = " + U("6 · 3", "2") + " = 9", ""),
    ],
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Cena izdelka po \(20\)-odstotni podražitvi znaša \(54\) €. Izračunaj prvotno ceno izdelka. Za koliko evrov preveč je trgovina podražila "
    r"izdelek, če je bila dovoljena le \(15\)-odstotna podražitev?",
    r"\(45\) €; za \(2{,}25\) €",
    [
        ("1,20 · x = 54", "Podražena cena je 120 % prvotne."),
        ("!x = 45 €", ""),
        ("dovoljena cena: 1,15 · 45 = 51,75 €", ""),
        ("!54 − 51,75 = 2,25 € preveč", ""),
    ],
)

n3 = naloga(
    3, "zaporedja_vrste", 6,
    r"Izračunaj, za katere \(x\) so števila \(x^2 + 2\), \(2 - x\) in \(2\) zaporedni členi padajočega geometrijskega zaporedja.",
    r"\(x = -4\) (členi \(18, 6, 2\))",
    [
        ("(2 − x)<sup>2</sup> = 2(x<sup>2</sup> + 2)", "Kvadrat srednjega člena je produkt sosednjih."),
        ("4 − 4x + x<sup>2</sup> = 2x<sup>2</sup> + 4  ⇒  x<sup>2</sup> + 4x = 0", ""),
        ("x = 0  ali  x = −4", ""),
        ("x = 0: 2, 2, 2 je konstantno zaporedje (ni padajoče)", ""),
        ("!x = −4: 18, 6, 2 (q = " + U("1", "3") + ")", ""),
    ],
)


def poligon4():
    vr = [8, 14, 10, 6, 12]
    L, T, W, H = 34, 12, 220, 150
    X = lambda i: L + i * W / 5.5
    Y = lambda v: T + H - v * H / 16
    d = []
    for v in range(0, 17, 2):
        d.append(f'<line x1="{L}" y1="{Y(v):.1f}" x2="{L + W}" y2="{Y(v):.1f}" stroke="currentColor" stroke-opacity="0.12"/>')
        d.append(napis(L - 6, Y(v) + 4, str(v), 10, sidro="end"))
    for i in range(1, 6):
        d.append(napis(X(i), T + H + 14, str(i), 10))
    d.append(f'<line x1="{L}" y1="{T + H}" x2="{L + W}" y2="{T + H}" stroke="currentColor"/>')
    d.append(f'<line x1="{L}" y1="{T + H}" x2="{L}" y2="{T - 4}" stroke="currentColor"/>')
    d.append(f'<polyline points="{" ".join(f"{X(i + 1):.1f},{Y(v):.1f}" for i, v in enumerate(vr))}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    d += [f'<circle cx="{X(i + 1):.1f}" cy="{Y(v):.1f}" r="3" fill="{MODRA}"/>' for i, v in enumerate(vr)]
    d.append(napis(L + W - 10, T + H + 28, "tekma", 11, sidro="end"))
    d.append(napis(L + 4, T - 2, "koši", 11, sidro="start"))
    return svg(270, 200, "".join(d), opis="Frekvenčni poligon košev na petih tekmah")

n4 = naloga(
    4, "statistika", 6,
    r"Ana in Bor igrata košarko. Ana je odigrala pet tekem, Bor pa tri. Število košev, ki jih je Ana dosegla na posameznih tekmah, kaže "
    r"frekvenčni poligon:" + poligon4()
    + r"Število Borovih košev pa kaže tabela:"
    + tabela(["", "1. tekma", "2. tekma", "3. tekma"], [["število košev", r"\(x\)", "13", "11"]])
    + r"Koliko košev je Bor dosegel na prvi tekmi, če sta imela oba enako povprečje na tekmo?",
    r"\(x = 6\)",
    [
        ("Ana: 8, 14, 10, 6, 12", "Preberemo vrednosti s poligona."),
        ("povprečje = " + U("8 + 14 + 10 + 6 + 12", "5") + " = " + U("50", "5") + " = 10", ""),
        (U("x + 13 + 11", "3") + " = 10  ⇒  x + 24 = 30", ""),
        ("!x = 6 košev", ""),
    ],
)

n5 = naloga(
    5, "geometrijski_liki_telesa", 5,
    r"Diagonali romba \(ABCD\) merita \(e = |AC| = 24\ \mathrm{cm}\) in \(f = |BD| = 10\ \mathrm{cm}\). Izračunaj dolžino stranice romba in njegovo ploščino.",
    r"\(a = 13\ \mathrm{cm}\), \(S = 120\ \mathrm{cm^2}\)",
    [
        ("a<sup>2</sup> = (" + U("e", "2") + ")<sup>2</sup> + (" + U("f", "2") + ")<sup>2</sup> = 12<sup>2</sup> + 5<sup>2</sup> = 169", "Diagonali romba se razpolavljata pod pravim kotom."),
        ("!a = 13 cm", ""),
        ("!S = " + U("e · f", "2") + " = " + U("24 · 10", "2") + " = 120 cm<sup>2</sup>", ""),
    ],
)

n6 = naloga(
    6, "stoznice", 6,
    r"Točki \(A(-3, 4)\) in \(B(5, -2)\) sta krajišči enega od premerov krožnice. Izračunaj središče in polmer krožnice ter zapiši njeno enačbo.",
    r"\(S(1, 1)\), \(r = 5\), \((x - 1)^2 + (y - 1)^2 = 25\)",
    [
        ("!S(" + U("−3 + 5", "2") + ", " + U("4 − 2", "2") + ") = S(1, 1)", "Središče je razpolovišče premera."),
        ("|AB| = " + K("8<sup>2</sup> + 6<sup>2</sup>") + " = 10", ""),
        ("!r = 5", "Polmer je polovica premera."),
        ("!(x − 1)<sup>2</sup> + (y − 1)<sup>2</sup> = 25", ""),
    ],
)

n7 = naloga(
    7, "funkcije", 6,
    r"Reši enačbo \(\cos x + \cos^2 x - \sin^2 x = -1\).",
    r"\(x = \frac{\pi}{2} + k\pi\), \(x = \pm\frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("cos<sup>2</sup> x − sin<sup>2</sup> x = 2 cos<sup>2</sup> x − 1", "Uporabimo sin² x = 1 − cos² x."),
        ("cos x + 2 cos<sup>2</sup> x − 1 = −1  ⇒  cos x (1 + 2 cos x) = 0", ""),
        ("!cos x = 0:  x = " + U("π", "2") + " + kπ", ""),
        ("!cos x = −" + U("1", "2") + ":  x = ±" + U("2π", "3") + " + 2kπ,  k ∈ ℤ", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n8 = naloga(
    8, "funkcije", 6,
    r"Reši enačbo \(\dfrac{\log 2 + \log x}{\log(x - 4)} = 2\).",
    r"\(x = 8\)",
    [
        ("x > 4,  x ≠ 5", "Logaritmanda morata biti pozitivna, imenovalec različen od 0."),
        ("log 2x = 2 log(x − 4) = log (x − 4)<sup>2</sup>", "Pravila za računanje z logaritmi."),
        ("2x = x<sup>2</sup> − 8x + 16  ⇒  x<sup>2</sup> − 10x + 16 = 0  ⇒  (x − 2)(x − 8) = 0", ""),
        ("x = 2 ne ustreza pogoju x > 4", ""),
        ("!x = 8", ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)


def kvadrat9(z_vektorjem=False):
    s = 34
    A = (30, 160)
    P = lambda u, v: (A[0] + u * s, A[1] - v * s)
    B, C, D = P(4, 0), P(4, 4), P(0, 4)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         napis(A[0] - 10, A[1] + 12, "A"), napis(B[0] + 10, B[1] + 12, "B"), napis(C[0] + 10, C[1] - 4, "C"), napis(D[0] - 10, D[1] - 4, "D")]
    if z_vektorjem:
        E = P(6, -2)
        t.append(f'<defs><marker id="pu9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="{RDECA}"/></marker></defs>')
        t.append(f'<line x1="{A[0]}" y1="{A[1]}" x2="{E[0]}" y2="{E[1]}" stroke="{RDECA}" stroke-width="2" marker-end="url(#pu9)"/>')
        t.append(f'<line x1="{P(6, 0)[0]}" y1="{A[1]}" x2="{E[0]}" y2="{E[1]}" stroke="currentColor" stroke-dasharray="3 3"/>')
        t.append(f'<line x1="{B[0]}" y1="{B[1]}" x2="{P(6, 0)[0]}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="3 3"/>')
        t.append(napis(E[0] - 4, E[1] + 16, "x⃗", 13, RDECA))
    return svg(260, 250 if z_vektorjem else 190, "".join(t), opis="Kvadrat ABCD" + (" z vektorjem x" if z_vektorjem else ""))

n9 = naloga(
    9, "vektorji_ravnina_prostor", 7,
    r"Na sliki je kvadrat \(ABCD\) s stranico dolžine \(4\)." + kvadrat9()
    + r"Nariši vektor \(\vec{x} = \frac{3}{2}\vec{AB} - \frac{1}{2}\vec{AD}\). Izračunaj natančno dolžino vektorja \(\vec{x}\) ter na minuto natančno "
    r"kot \(\varphi\) med vektorjema \(\vec{x}\) in \(\vec{AB}\).",
    r"\(|\vec{x}| = 2\sqrt{10}\), \(\varphi \approx 18^\circ 26'\)",
    [
        ("@slika", kvadrat9(True)),
        (V("x") + " ima komponento 6 v smeri AB in −2 v smeri AD", "3/2 · 4 = 6 in 1/2 · 4 = 2."),
        ("!|" + V("x") + "| = " + K("6<sup>2</sup> + 2<sup>2</sup>") + " = " + K("40") + " = 2" + K("10"), "AB in AD sta pravokotna."),
        ("tan φ = " + U("2", "6") + " = " + U("1", "3"), ""),
        ("!φ ≈ 18,43° ≈ 18°26'", ""),
    ],
)

n10 = naloga(
    10, "stevilske_mnozice", 7,
    r"Dano je kompleksno število \(z = 1 + 2i\). Izračunaj kompleksno število \(w = z^2 - 10z^{-1}\). Rezultat zapiši v obliki \(w = a + bi\) (\(a, b \in \mathbb{R}\)).",
    r"\(w = -5 + 8i\)",
    [
        ("z<sup>2</sup> = 1 + 4i + 4i<sup>2</sup> = −3 + 4i", ""),
        ("z<sup>−1</sup> = " + U("1", "1 + 2i") + " = " + U("1 − 2i", "(1 + 2i)(1 − 2i)") + " = " + U("1 − 2i", "5"), "Razširimo s konjugiranim številom."),
        ("10z<sup>−1</sup> = 2 − 4i", ""),
        ("!w = −3 + 4i − 2 + 4i = −5 + 8i", ""),
    ],
)

n11 = naloga(
    11, "diferencialni_racun", 6,
    r"Izračunaj kot, pod katerim graf funkcije \(f(x) = \dfrac{x - 3}{x + 1}\) seka abscisno os. Kot zapiši na stotinko stopinje natančno.",
    r"\(\varphi \approx 14{,}04^\circ\)",
    [
        ("ničla: x = 3", ""),
        ("f '(x) = " + U("(x + 1) − (x − 3)", "(x + 1)<sup>2</sup>") + " = " + U("4", "(x + 1)<sup>2</sup>"), "Odvod kvocienta."),
        ("f '(3) = " + U("4", "16") + " = " + U("1", "4") + " = tan φ", "Smerni koeficient tangente v ničli."),
        ("!φ ≈ 14,04°", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)


def slika12(X, Y):
    xs = [-2 + 4 * i / 60 for i in range(61)]
    pot = " ".join(f"{X(x):.1f},{Y(4 - x * x):.1f}" for x in xs) + " " + " ".join(f"{X(x):.1f},{Y(x * x - 4):.1f}" for x in reversed(xs))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>'
            + krivulja(X, Y, lambda x: 4 - x * x, -2.8, 2.8, MODRA) + krivulja(X, Y, lambda x: x * x - 4, -2.8, 2.8, RDECA)
            + tocka(X, Y, -2, 0, "−2", -16, -6) + tocka(X, Y, 2, 0, "2", 6, -6))

n12 = naloga(
    12, "integralski_racun", 7,
    r"V koordinatni sistem nariši paraboli \(y = 4 - x^2\) in \(y = x^2 - 4\). Izračunaj ploščino lika, ki ga omejujeta dani paraboli.",
    r"\(S = \frac{64}{3}\)",
    [
        ("@slika", mreza((-3, 3), (-4.5, 4.5), slika12, sirina=220, oznake=True)),
        ("4 − x<sup>2</sup> = x<sup>2</sup> − 4  ⇒  x = ±2", "Presečišči parabol."),
        ("S = " + INT("2", "−2") + "((4 − x<sup>2</sup>) − (x<sup>2</sup> − 4)) dx = " + INT("2", "−2") + "(8 − 2x<sup>2</sup>) dx", "Zgornja minus spodnja funkcija."),
        ("= (8x − " + U("2x<sup>3</sup>", "3") + ")" + MEJA("2", "−2") + " = 2(16 − " + U("16", "3") + ")", "Funkcija je soda."),
        ("!S = " + U("64", "3"), ""),
    ],
    snov=INTS,
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 24,
    r"Dani sta funkciji \(f(x) = \ln(x - 2) + 1\) in \(g(x) = e^{x - 1} + 2\).<br>"
    r"a) V tabelo zapiši definicijski območji in zalogi vrednosti funkcij \(f\) in \(g\). (6 točk)<br>"
    r"b) Izračunaj koordinati točke na grafu funkcije \(f\), v kateri je tangenta na graf vzporedna premici \(x - 3y + 6 = 0\). (6 točk)<br>"
    r"c) Izračunaj ploščino lika, ki ga omejujejo abscisna os, premici \(x = 0\) in \(x = 1\) ter graf funkcije \(g\). (8 točk)<br>"
    r"d) Dokaži, da sta funkciji \(f\) in \(g\) druga drugi inverzni. (4 točke)",
    r"a) \(D_f = (2, \infty)\), \(Z_f = \mathbb{R}\), \(D_g = \mathbb{R}\), \(Z_g = (2, \infty)\) &nbsp; b) \(T(5, 1 + \ln 3)\) &nbsp; c) \(S = 3 - \frac{1}{e} \approx 2{,}632\)",
    [
        ("@slika", tabela(["", "definicijsko območje", "zaloga vrednosti"], [["f", "(2, ∞)", "ℝ"], ["g", "ℝ", "(2, ∞)"]])),
        ("!a) logaritem je definiran za x − 2 > 0; e<sup>x−1</sup> > 0, zato g(x) > 2", ""),
        ("premica: y = " + U("1", "3") + "x + 2,  k = " + U("1", "3"), ""),
        ("f '(x) = " + U("1", "x − 2") + " = " + U("1", "3") + "  ⇒  x = 5", "Vzporedni premici imata enaka smerna koeficienta."),
        ("!b) T(5, 1 + ln 3) ≈ T(5; 2,10)", ""),
        ("S = " + INT("1", "0") + "(e<sup>x−1</sup> + 2) dx = (e<sup>x−1</sup> + 2x)" + MEJA("1", "0"), "Graf g leži nad abscisno osjo."),
        ("= (1 + 2) − (e<sup>−1</sup> + 0)", ""),
        ("!c) S = 3 − " + U("1", "e") + " ≈ 2,632", ""),
        ("y = ln(x − 2) + 1  ⇒  y − 1 = ln(x − 2)  ⇒  x − 2 = e<sup>y−1</sup>", "Izrazimo x."),
        ("x = e<sup>y−1</sup> + 2  ⇒  f<sup>−1</sup>(x) = e<sup>x−1</sup> + 2", "Zamenjamo vlogi x in y."),
        ("!d) f<sup>−1</sup> = g, zato sta f in g druga drugi inverzni", "Ujemata se tudi D_f = Z_g in Z_f = D_g."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)


def slika_v2(X, Y):
    elipsa = " ".join(f"{X(2 + 3 * math.cos(t)):.1f},{Y(-1 + 2 * math.sin(t)):.1f}" for t in [2 * math.pi * i / 120 for i in range(121)])
    return (f'<polyline points="{elipsa}" fill="none" stroke="{MODRA}" stroke-width="2"/>'
            + krivulja(X, Y, lambda x: (7 - 2 * x) / 3, -1, 6.5, RDECA)
            + f'<rect x="{X(-2):.1f}" y="{Y(0):.1f}" width="{X(7) - X(-2):.1f}" height="{Y(-4) - Y(0):.1f}" fill="currentColor" fill-opacity="0.06"/>'
            + f'<circle cx="{X(5):.1f}" cy="{Y(-1):.1f}" r="4" fill="none" stroke="currentColor"/>'
            + f'<circle cx="{X(2):.1f}" cy="{Y(1):.1f}" r="5" fill="{RDECA}"/>'
            + f'<text x="{X(2) + 8:.1f}" y="{Y(1) - 8:.1f}" font-size="12" fill="currentColor">(2, 1)</text>')

v2 = naloga(
    2, ["mnozice", "algebrski_izrazi_enacbe_neenacbe", "stoznice"], 23,
    r"Reši naslednje naloge.<br>"
    r"a) Naj bosta \(A = \{x \in \mathbb{R};\ 27x^3 - 27x^2 + 9x - 1 = 0\}\) in \(B = \{x \in \mathbb{R};\ \sqrt{2x + 7} = x + 2\}\). Zapiši množico "
    r"\(C = A \cup B\) tako, da našteješ vse njene elemente. (7 točk)<br>"
    r"b) Naj bo \(D = \{x \in [0, 2\pi];\ \sqrt{3}\sin x - \cos x = 0\}\) in \(E\) množica abscis točk, v katerih funkcija \(f(x) = \sin 3x\) na "
    r"intervalu \([0, 2\pi]\) doseže maksimum. Zapiši množico \(F = D \cup E\). Koliko elementov ima potenčna množica množice \(F\)? (8 točk)<br>"
    r"c) Dane so množice točk v ravnini: \(K = \{(x, y);\ 4x^2 + 9y^2 - 16x + 18y - 11 = 0\}\), \(L = \{(x, y);\ 2x + 3y - 7 = 0\}\) in "
    r"\(M = \{(x, y);\ y < 0\}\). V koordinatni sistem nariši množico točk \(N = (K \cap L) \setminus M\). (8 točk)",
    r"a) \(C = \{\frac{1}{3}, 1\}\) &nbsp; b) \(F = \{\frac{\pi}{6}, \frac{5\pi}{6}, \frac{7\pi}{6}, \frac{3\pi}{2}\}\), \(2^4 = 16\) elementov &nbsp; c) \(N = \{(2, 1)\}\)",
    [
        ("27x<sup>3</sup> − 27x<sup>2</sup> + 9x − 1 = (3x − 1)<sup>3</sup> = 0  ⇒  A = {" + U("1", "3") + "}", "Kub razlike."),
        ("2x + 7 = x<sup>2</sup> + 4x + 4  ⇒  x<sup>2</sup> + 2x − 3 = 0  ⇒  x = 1 ali x = −3", "Kvadriramo."),
        ("preizkus: x = −3 da " + K("1") + " = −1, kar ne drži  ⇒  B = {1}", "Pri kvadriranju lahko dobimo navidezne rešitve."),
        ("!a) C = {" + U("1", "3") + ", 1}", ""),
        ("tan x = " + U("1", K("3")) + "  ⇒  D = {" + U("π", "6") + ", " + U("7π", "6") + "}", "Delimo s cos x (cos x = 0 ni rešitev)."),
        ("sin 3x = 1  ⇒  3x = " + U("π", "2") + " + 2kπ  ⇒  x = " + U("π", "6") + " + " + U("2kπ", "3"), ""),
        ("E = {" + U("π", "6") + ", " + U("5π", "6") + ", " + U("3π", "2") + "}", "Vrednosti na [0, 2π]."),
        ("!b) F = {" + U("π", "6") + ", " + U("5π", "6") + ", " + U("7π", "6") + ", " + U("3π", "2") + "},  |P(F)| = 2<sup>4</sup> = 16", ""),
        ("4(x − 2)<sup>2</sup> + 9(y + 1)<sup>2</sup> = 36  ⇒  " + U("(x − 2)<sup>2</sup>", "9") + " + " + U("(y + 1)<sup>2</sup>", "4") + " = 1", "Dopolnimo do popolnih kvadratov: K je elipsa s središčem (2, −1), a = 3, b = 2."),
        ("y + 1 = " + U("10 − 2x", "3") + ":  4(x − 2)<sup>2</sup> + (10 − 2x)<sup>2</sup> = 36", "Iz enačbe premice izrazimo y in vstavimo."),
        ("8x<sup>2</sup> − 56x + 80 = 0  ⇒  x<sup>2</sup> − 7x + 10 = 0  ⇒  x = 2 ali x = 5", ""),
        ("K ∩ L = {(2, 1), (5, −1)}", "Premica poteka skozi temeni elipse."),
        ("!c) N = {(2, 1)}", "Točka (5, −1) ima y < 0, zato jo odstranimo."),
        ("@slika", mreza((-2, 7), (-4, 3), slika_v2, sirina=300)),
    ],
)


def trapez_v3():
    k = 9
    A, B = (15, 120), (15 + 25 * k, 120)
    D, C = (15 + 6 * k, 120 - 8 * k), (15 + 10 * k, 120 - 8 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{D[0]}" y1="{D[1]}" x2="{D[0]}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<line x1="{C[0]}" y1="{C[1]}" x2="{C[0]}" y2="{A[1]}" stroke="currentColor" stroke-dasharray="3 3"/>',
         napis(A[0] - 2, A[1] + 15, "A"), napis(B[0], B[1] + 15, "B"), napis(C[0] + 6, C[1] - 5, "C"), napis(D[0] - 6, D[1] - 5, "D"),
         napis((A[0] + D[0]) / 2 - 10, (A[1] + D[1]) / 2, "d", 12), napis((B[0] + C[0]) / 2 + 8, (B[1] + C[1]) / 2 - 4, "b", 12),
         napis(D[0] + 8, (D[1] + A[1]) / 2, "v", 12), napis((A[0] + D[0]) / 2, A[1] + 15, "p", 11), napis((C[0] + B[0]) / 2, A[1] + 15, "q", 11)]
    return svg(250, 140, "".join(t), opis="Trapez z vrisanima višinama")

v3 = naloga(
    3, "geometrijski_liki_telesa", 25,
    r"Imamo štiri trapeze \(ABCD\). V vsakem merita osnovnici \(|AB| = a = 25\ \mathrm{cm}\) in \(|CD| = c = 4\ \mathrm{cm}\).<br>"
    r"a) V prvem trapezu tvorijo dolžine stranic \(c, d, b, a\) aritmetično zaporedje. Izračunaj dolžini krakov \(b = |BC|\) in \(d = |AD|\). (5 točk)<br>"
    r"b) V drugem trapezu se nosilki krakov sekata v točki \(E\). Izračunaj dolžino kraka \(b\), če merita daljici \(|CE| = 2\ \mathrm{cm}\) in \(|DE| = 1{,}5\ \mathrm{cm}\). (5 točk)<br>"
    r"c) V tretjem trapezu meri kot \(DAB\) \(\alpha = 70^\circ\), kot \(ABC\) pa \(\beta = 50^\circ\). Izračunaj dolžino kraka \(d\). (6 točk)<br>"
    r"d) V četrtem trapezu je krak \(b\) za \(7\ \mathrm{cm}\) daljši od kraka \(d\), ploščina trapeza pa meri \(116\ \mathrm{cm^2}\). Izračunaj dolžini krakov \(b\) in \(d\). (9 točk)",
    r"a) \(d = 11\ \mathrm{cm}\), \(b = 18\ \mathrm{cm}\) &nbsp; b) \(b = 10{,}5\ \mathrm{cm}\) &nbsp; c) \(d \approx 18{,}58\ \mathrm{cm}\) &nbsp; d) \(d = 10\ \mathrm{cm}\), \(b = 17\ \mathrm{cm}\)",
    [
        ("4 + 3δ = 25  ⇒  δ = 7", "Med c in a so trije koraki diference."),
        ("!a) d = 11 cm,  b = 18 cm", ""),
        (U("|CE|", "|BE|") + " = " + U("c", "a") + " = " + U("4", "25") + "  ⇒  |BE| = " + U("2 · 25", "4") + " = 12,5 cm", "Trikotnika DCE in ABE sta podobna (CD ∥ AB)."),
        ("!b) b = |BE| − |CE| = 12,5 − 2 = 10,5 cm", ""),
        ("vzporedni premik kraka b skozi D: trikotnik s stranico a − c = 21 cm in kotoma 70° in 50°", "Tretji kot je 180° − 70° − 50° = 60°."),
        ("d = " + U("21 · sin 50°", "sin 60°"), "Sinusni izrek: d leži nasproti kota 50°."),
        ("!c) d ≈ 18,58 cm", ""),
        ("S = " + U("a + c", "2") + " · v  ⇒  116 = 14,5 · v  ⇒  v = 8 cm", ""),
        ("@slika", trapez_v3()),
        ("p + q = a − c = 21,  d<sup>2</sup> = p<sup>2</sup> + 64,  (d + 7)<sup>2</sup> = q<sup>2</sup> + 64", "Višini razdelita daljšo osnovnico; p in q sta projekciji krakov."),
        ("odštejemo: 14d + 49 = q<sup>2</sup> − p<sup>2</sup> = 21(q − p)  ⇒  d = 28 − 3p", "q = 21 − p."),
        ("(28 − 3p)<sup>2</sup> = p<sup>2</sup> + 64  ⇒  p<sup>2</sup> − 21p + 90 = 0  ⇒  p = 6 ali p = 15", ""),
        ("p = 15 da d = −17 < 0, zato p = 6", ""),
        ("!d) d = 10 cm,  b = 17 cm", "Preizkus: 10² = 6² + 8², 17² = 15² + 8²."),
    ],
)

POLA2 = [v1, v2, v3]
