# Spomladanski rok 2008 (uradne pole RIC: m081-401-1-1, m081-402-1-1, m081-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2008, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "mnozice", 7,
    r"Naj bo \(A\) množica vseh praštevil, manjših od \(15\), \(B\) množica vseh deliteljev števila \(18\) in \(C\) množica vseh večkratnikov "
    r"števila \(4\), manjših od \(20\). Zapiši množice \(A\), \(B\), \(C\), \(A \cap B\) in \(B \cup C\).",
    r"\(A = \{2, 3, 5, 7, 11, 13\}\), \(B = \{1, 2, 3, 6, 9, 18\}\), \(C = \{4, 8, 12, 16\}\), \(A \cap B = \{2, 3\}\), "
    r"\(B \cup C = \{1, 2, 3, 4, 6, 8, 9, 12, 16, 18\}\)",
    [
        ("!A = {2, 3, 5, 7, 11, 13}", "Praštevilo ima natanko dva delitelja; 1 ni praštevilo."),
        ("!B = {1, 2, 3, 6, 9, 18}", "Delitelje iščemo v parih: 1 · 18, 2 · 9, 3 · 6."),
        ("!C = {4, 8, 12, 16}", "Večkratniki števila 0 ne štejemo (naravna števila)."),
        ("!A ∩ B = {2, 3}", "Presek: skupni elementi."),
        ("!B ∪ C = {1, 2, 3, 4, 6, 8, 9, 12, 16, 18}", "Unija: elementi iz vsaj ene množice."),
    ],
)

n2 = naloga(
    2, "funkcije", 6,
    r"Izračunaj vse ničle funkcije \(f(x) = \tan x + \sqrt{3}\) in presečišče njenega grafa z ordinatno osjo.",
    r"\(x = -\frac{\pi}{3} + k\pi\), \(k \in \mathbb{Z}\); \((0, \sqrt{3})\)",
    [
        ("tan x = −" + K("3"), ""),
        ("!x = −" + U("π", "3") + " + kπ, k ∈ ℤ", "Tangens ima periodo π."),
        ("!f(0) = tan 0 + " + K("3") + " = " + K("3") + ":  presečišče (0, " + K("3") + ")", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n3 = naloga(
    3, "funkcije", 7,
    r"Zapiši enačbo kvadratne funkcije, ki ima pri \(x = 3\) ekstremno vrednost \(-2\) in ničlo \(x_1 = 5\).",
    r"\(f(x) = \frac{1}{2}(x - 3)^2 - 2 = \frac{1}{2}x^2 - 3x + \frac{5}{2}\)",
    [
        ("f(x) = a(x − 3)<sup>2</sup> − 2", "Temenska oblika: teme T(3, −2)."),
        ("f(5) = 4a − 2 = 0  ⇒  a = " + U("1", "2"), "Ničla zadošča enačbi f(x) = 0."),
        ("!f(x) = " + U("1", "2") + "(x − 3)<sup>2</sup> − 2 = " + U("1", "2") + "x<sup>2</sup> − 3x + " + U("5", "2"), "Druga ničla je simetrična: x₂ = 1."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n4 = naloga(
    4, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Štorklje so odletele na jug v treh jatah. Število ptic v jatah je v razmerju \(2 : 7 : 12\). V največji jati je \(45\) ptic več kakor v "
    r"obeh manjših jatah skupaj. Koliko štorkelj je v vsaki jati?",
    r"\(30\), \(105\) in \(180\)",
    [
        ("x = 2k,  y = 7k,  z = 12k", "Razmerje zapišemo s skupnim faktorjem k."),
        ("12k = 2k + 7k + 45  ⇒  3k = 45  ⇒  k = 15", ""),
        ("!30, 105 in 180 štorkelj", ""),
    ],
)

n5 = naloga(
    5, "integralski_racun", 6,
    r"Izračunaj točno vrednost določenega integrala \(\displaystyle\int_0^{\pi} (3\sin x + 2\cos x - x)\,dx\).",
    r"\(6 - \frac{\pi^2}{2}\)",
    [
        ("∫(3 sin x + 2 cos x − x) dx = −3 cos x + 2 sin x − " + U("x<sup>2</sup>", "2") + " + C", "Osnovni integrali."),
        ("(−3 cos x + 2 sin x − " + U("x<sup>2</sup>", "2") + ")" + MEJA("π", "0") + " = (3 + 0 − " + U("π<sup>2</sup>", "2") + ") − (−3)", "Newton-Leibnizova formula; cos π = −1."),
        ("!6 − " + U("π<sup>2</sup>", "2"), ""),
    ],
    snov=INTS,
)

n6 = naloga(
    6, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Reši enačbo \(\sqrt{3x + 7} = x + 1\).",
    r"\(x = 3\)",
    [
        ("3x + 7 = x<sup>2</sup> + 2x + 1", "Enačbo kvadriramo."),
        ("x<sup>2</sup> − x − 6 = 0  ⇒  (x − 3)(x + 2) = 0", ""),
        ("x = −2:  " + K("1") + " = 1 ≠ −1", "Pri kvadriranju se lahko pojavijo navidezne rešitve, zato preizkusimo."),
        ("!x = 3", "Preizkus: √16 = 4 = 3 + 1."),
    ],
)

n7 = naloga(
    7, ["algebrski_izrazi_enacbe_neenacbe", "stevilske_mnozice"], 7,
    r"Preveri, da je število \(1\) dvojna ničla polinoma \(p(x) = x^4 + 2x^3 + 6x^2 - 22x + 13\). Poišči še preostali (kompleksni) ničli.",
    r"\(x_{3,4} = -2 \pm 3i\)",
    [
        ("p(x) : (x − 1) = x<sup>3</sup> + 3x<sup>2</sup> + 9x − 13,  ostanek 0", "Hornerjev algoritem."),
        ("(x<sup>3</sup> + 3x<sup>2</sup> + 9x − 13) : (x − 1) = x<sup>2</sup> + 4x + 13,  ostanek 0", "Ponovno delimo: 1 je dvojna ničla."),
        ("x<sup>2</sup> + 4x + 13 = 0:  x = " + U("−4 ± " + K("−36"), "2"), ""),
        ("!x<sub>3,4</sub> = −2 ± 3i", "√(−36) = 6i."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)


def elipsa8(X, Y):
    return (parametricna(X, Y, lambda t: 4 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -4, 0, "A(−4, 0)", dx=-52, dy=-6) + tocka(X, Y, 4, 0, "B(4, 0)", dx=5, dy=-6)
            + tocka(X, Y, 0, -3, "C(0, −3)", dx=5, dy=14) + tocka(X, Y, 0, 3, "D(0, 3)", dx=5, dy=-6))

n8 = naloga(
    8, "stoznice", 8,
    r"Slika prikazuje elipso s temeni \(A\), \(B\), \(C\) in \(D\). Zapiši točne koordinate gorišč elipse. Zapiši tudi enačbo krožnice, ki ima "
    r"središče v točki \(D\) in poteka skozi izhodišče." + mreza((-6, 6), (-5, 5), elipsa8, sirina=260, oznake=False),
    r"\(F_{1,2}(\pm\sqrt{7}, 0)\); \(x^2 + (y - 3)^2 = 9\)",
    [
        ("a = 4,  b = 3", "Polosi preberemo iz temen."),
        ("e = " + K("a<sup>2</sup> − b<sup>2</sup>") + " = " + K("7"), "Linearna ekscentričnost elipse."),
        ("!F<sub>1</sub>(−" + K("7") + ", 0),  F<sub>2</sub>(" + K("7") + ", 0)", ""),
        ("r = |DO| = 3", "Polmer je razdalja od središča do točke na krožnici."),
        ("!x<sup>2</sup> + (y − 3)<sup>2</sup> = 9", ""),
    ],
)


def pravokotnik9():
    a, b = 220, 220 * math.tan(math.radians(25))
    x0, y0 = 20, 120
    A, B, C, D = (x0, y0), (x0 + a, y0), (x0 + a, y0 - b), (x0, y0 - b)
    S = (x0 + a / 2, y0 - b / 2)
    return svg(270, 145, f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]:.1f} {D[0]},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]:.1f}" stroke="currentColor" stroke-opacity="0.6"/>'
               f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]:.1f}" stroke="currentColor" stroke-opacity="0.6"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(B[0] + 10, B[1] + 4, "B") + napis(C[0] + 10, C[1] + 4, "C") + napis(D[0] - 10, D[1] + 4, "D")
               + napis(S[0], S[1] - 8, "S") + napis(S[0] + 26, S[1] + 4, "φ", 12, RDECA) + napis(S[0], y0 + 15, "a = 12 cm", 11)
               + napis(A[0] + 34, A[1] - 5, "25°", 10), opis="Pravokotnik ABCD z diagonalama")

n9 = naloga(
    9, "geometrijski_liki_telesa", 6,
    r"Diagonali pravokotnika \(ABCD\) se sekata v točki \(S\). Stranica \(|AB| = a = 12\ \mathrm{cm}\), kot \(\angle BSC = \varphi = 50^\circ\). "
    r"Nariši skico in izračunaj obseg pravokotnika. Rezultat zaokroži na tri mesta.",
    r"\(o \approx 35{,}2\ \mathrm{cm}\)",
    [
        ("@slika", pravokotnik9()),
        ("∢ASB = 180° − 50° = 130°", "Sokota."),
        ("∢BAC = " + U("180° − 130°", "2") + " = 25°", "Trikotnik ASB je enakokrak (diagonali se razpolavljata in sta enako dolgi)."),
        ("b = a · tan 25° ≈ 5,596 cm", "Pravokotni trikotnik ABC."),
        ("!o = 2(a + b) ≈ 35,2 cm", ""),
    ],
)

n10 = naloga(
    10, "funkcije", 6,
    r"Izračunaj osnovo \(a\) logaritemske funkcije \(f(x) = \log_a x\), katere graf poteka skozi točko \(A\left(\frac{1}{27}, -\frac{3}{2}\right)\).",
    r"\(a = 9\)",
    [
        ("log<sub>a</sub> " + U("1", "27") + " = −" + U("3", "2"), "Točka leži na grafu."),
        ("a<sup>−3/2</sup> = " + U("1", "27") + "  ⇒  a<sup>3/2</sup> = 27", "Definicija logaritma."),
        ("!a = 27<sup>2/3</sup> = 9", ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n11 = naloga(
    11, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Iz skupine \(6\) fantov in \(4\) deklet naključno izberemo \(4\) osebe. Izračunaj verjetnost dogodka \(A\), da bosta izbrana dva fanta in "
    r"dve dekleti.",
    r"\(P(A) = \frac{3}{7} \approx 0{,}43\)",
    [
        ("n = " + BINOM("10", "4") + " = 210", "Vseh izborov štirih oseb."),
        ("m = " + BINOM("6", "2") + " · " + BINOM("4", "2") + " = 15 · 6 = 90", "Pravilo produkta."),
        ("!P(A) = " + U("90", "210") + " = " + U("3", "7") + " ≈ 0,43", ""),
    ],
)

n12 = naloga(
    12, "zaporedja_vrste", 8,
    r"Peti člen geometrijskega zaporedja je \(27\)-kratnik drugega člena, produkt drugega in četrtega člena pa je \(324\). Izračunaj prvi člen "
    r"\(a_1\) in količnik \(q\).",
    r"\(q = 3\), \(a_1 = \pm 2\)",
    [
        ("a<sub>1</sub>q<sup>4</sup> = 27 a<sub>1</sub>q  ⇒  q<sup>3</sup> = 27", "Splošni člen a_n = a₁qⁿ⁻¹."),
        ("!q = 3", ""),
        ("a<sub>1</sub>q · a<sub>1</sub>q<sup>3</sup> = a<sub>1</sub><sup>2</sup> q<sup>4</sup> = 81 a<sub>1</sub><sup>2</sup> = 324", ""),
        ("!a<sub>1</sub><sup>2</sup> = 4  ⇒  a<sub>1</sub> = 2 ali a<sub>1</sub> = −2", "Obe zaporedji ustrezata."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def p_v1(x):
    return -x ** 3 / 8 + 3 * x ** 2 / 4


def slika_v1(X, Y):
    xs1 = [2 * i / 40 for i in range(41)]
    xs2 = [2 + 2 * i / 40 for i in range(41)]
    lik1 = " ".join(f"{X(x):.1f},{Y(p_v1(x)):.1f}" for x in xs1) + " " + " ".join(f"{X(x):.1f},{Y(x):.1f}" for x in reversed(xs1))
    lik2 = " ".join(f"{X(x):.1f},{Y(p_v1(x)):.1f}" for x in xs2) + " " + " ".join(f"{X(x):.1f},{Y(x):.1f}" for x in reversed(xs2))
    return (f'<polygon points="{lik1}" fill="{RDECA}" fill-opacity="0.2"/><polygon points="{lik2}" fill="{MODRA}" fill-opacity="0.25"/>'
            + krivulja(X, Y, p_v1, -1.6, 6.4, MODRA) + krivulja(X, Y, lambda x: x, -2, 6, "#8a8a8a")
            + tocka(X, Y, 0, 0) + tocka(X, Y, 4, 4, "(4, 4)") + tocka(X, Y, 6, 0, "6", dx=4, dy=14))


v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 15,
    r"Dan je polinom \(p(x) = -\frac{x^3}{8} + \frac{3x^2}{4}\).<br>"
    r"a) Izračunaj ničle in ekstrema ter nariši graf polinoma. (5 točk)<br>"
    r"b) Simetrala lihih kvadrantov omejuje z grafom polinoma dva lika. Dokaži, da sta njuni ploščini enaki. (6 točk)<br>"
    r"c) Naj bo \(T(x, y)\), \(0 < x < 6\), točka na grafu polinoma in \(T'\) njena pravokotna projekcija na abscisno os. Izračunaj absciso "
    r"točke \(T\), pri kateri je ploščina trikotnika \(OT'T\) največja (\(O\) je izhodišče). (4 točke)",
    r"a) ničli \(0\) (dvojna) in \(6\); minimum \((0, 0)\), maksimum \((4, 4)\) &nbsp; b) obe ploščini sta \(\frac{1}{2}\) &nbsp; c) \(x = \frac{9}{2}\)",
    [
        ("p(x) = " + U("x<sup>2</sup>", "8") + "(6 − x)", "Izpostavimo x²."),
        ("!ničli x = 0 (dvojna),  x = 6", ""),
        ("p '(x) = −" + U("3x<sup>2</sup>", "8") + " + " + U("3x", "2") + " = −" + U("3x", "8") + "(x − 4)", ""),
        ("!minimum (0, 0),  maksimum (4, 4)", "p' menja predznak iz − v + pri 0 in iz + v − pri 4."),
        ("@slika", mreza((-2, 7), (-2, 6), slika_v1, sirina=280)),
        ("p(x) = x  ⇒  −" + U("x", "8") + "(x<sup>2</sup> − 6x + 8) = 0  ⇒  x ∈ {0, 2, 4}", "Presečišča s premico y = x."),
        ("S<sub>1</sub> = " + INT("2", "0") + "(x − p(x)) dx = (" + U("x<sup>4</sup>", "32") + " − " + U("x<sup>3</sup>", "4") + " + " + U("x<sup>2</sup>", "2") + ")" + MEJA("2", "0") + " = " + U("1", "2") + " − 2 + 2 = " + U("1", "2"), "Na [0, 2] je premica nad grafom."),
        ("S<sub>2</sub> = " + INT("4", "2") + "(p(x) − x) dx = −(" + U("x<sup>4</sup>", "32") + " − " + U("x<sup>3</sup>", "4") + " + " + U("x<sup>2</sup>", "2") + ")" + MEJA("4", "2") + " = −(0 − " + U("1", "2") + ") = " + U("1", "2"), "Vrednost oklepaja: pri 4 je 8 − 16 + 8 = 0, pri 2 je 1/2."),
        ("!b) S<sub>1</sub> = S<sub>2</sub> = " + U("1", "2"), ""),
        ("S(x) = " + U("x · p(x)", "2") + " = " + U("x<sup>3</sup>(6 − x)", "16") + " = " + U("6x<sup>3</sup> − x<sup>4</sup>", "16"), "Kateti trikotnika sta x in p(x)."),
        ("S '(x) = " + U("18x<sup>2</sup> − 4x<sup>3</sup>", "16") + " = " + U("x<sup>2</sup>(18 − 4x)", "16") + " = 0", "Ekstrem: odvod je 0."),
        ("!c) x = " + U("9", "2"), "S' preide iz + v −, zato je to maksimum."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)


def kroznica_v2(X, Y):
    return (parametricna(X, Y, lambda t: 2 * math.cos(t), lambda t: 2 * math.sin(t), 0, 2 * math.pi, MODRA)
            + f'<circle cx="{X(2):.1f}" cy="{Y(0):.1f}" r="4" fill="white" stroke="{MODRA}" stroke-width="2"/>')


v2 = naloga(
    2, "stevilske_mnozice", 11,
    r"Števili \(z\) in \(w\) sta kompleksni.<br>"
    r"a) Naj bo \(z = 2 + 4i\) in \(w = \dfrac{z + 2}{z - 2}\). Izračunaj \(\mathrm{Re}\,w\) in \(\mathrm{Im}\,w\). (3 točke)<br>"
    r"b) Naj bo \(z = 2 + yi\). Za katera realna števila \(y\) je \(\left|\dfrac{z + 2}{z - 2}\right| = \sqrt{5}\)? (3 točke)<br>"
    r"c) V kompleksni ravnini ponazori vsa števila \(z = x + yi\), za katera je \(w = \dfrac{z + 2}{z - 2}\) čisto imaginarno število. (5 točk)",
    r"a) \(\mathrm{Re}\,w = 1\), \(\mathrm{Im}\,w = -1\) &nbsp; b) \(y = \pm 2\) &nbsp; c) krožnica \(x^2 + y^2 = 4\) brez točke \((2, 0)\)",
    [
        ("w = " + U("4 + 4i", "4i") + " = " + U("(4 + 4i)(−i)", "4") + " = " + U("4 − 4i", "4"), "Delimo z imaginarnim številom: razširimo z −i."),
        ("!a) w = 1 − i:  Re w = 1,  Im w = −1", ""),
        ("|w| = " + U("|4 + yi|", "|yi|") + " = " + U(K("16 + y<sup>2</sup>"), "|y|") + " = " + K("5"), "Absolutna vrednost kvocienta je kvocient absolutnih vrednosti."),
        ("16 + y<sup>2</sup> = 5y<sup>2</sup>  ⇒  y<sup>2</sup> = 4", ""),
        ("!b) y = ±2", ""),
        ("w = " + U("(x + 2 + yi)(x − 2 − yi)", "(x − 2)<sup>2</sup> + y<sup>2</sup>") + " = " + U("x<sup>2</sup> + y<sup>2</sup> − 4 − 4yi", "(x − 2)<sup>2</sup> + y<sup>2</sup>"), "Razširimo s konjugirano vrednostjo imenovalca."),
        ("Re w = 0  ⇒  x<sup>2</sup> + y<sup>2</sup> = 4", "Čisto imaginarno število ima realni del 0."),
        ("!c) krožnica s središčem 0 in polmerom 2, brez točke z = 2", "Pri z = 2 izraz ni definiran; pri z = −2 je w = 0."),
        ("@slika", mreza((-3, 3), (-3, 3), kroznica_v2, sirina=200)),
    ],
)


def piramida_v3():
    A, B, C, D = (30, 150), (200, 160), (240, 90), (130, 20)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="none"/>',
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]}" stroke="currentColor" stroke-dasharray="4 3"/>']
    for P, Q in ((A, B), (B, C), (A, D), (B, D), (C, D)):
        t.append(f'<line x1="{P[0]}" y1="{P[1]}" x2="{Q[0]}" y2="{Q[1]}" stroke="currentColor" stroke-width="1.5"/>')
    t += [napis(A[0] - 10, A[1] + 4, "A"), napis(B[0], B[1] + 16, "B"), napis(C[0] + 10, C[1] + 4, "C"), napis(D[0], D[1] - 6, "D")]
    return svg(270, 180, "".join(t), opis="Tristrana piramida ABCD")


v3 = naloga(
    3, "vektorji_ravnina_prostor", 14,
    r"Dana je tristrana piramida \(ABCD\)." + piramida_v3()
    + r"a) V trikotniku \(ABC\) je \(\alpha = \angle BAC = 50^\circ\), \(\beta = \angle ABC = 70^\circ\), polmer očrtane krožnice pa "
    r"\(R = 3\ \mathrm{cm}\). Točka \(S\) je središče očrtane krožnice. Izračunaj skalarni produkt \(\overrightarrow{SA} \cdot \overrightarrow{SB}\). (4 točke)<br>"
    r"b) Izrazi vektorja \(\overrightarrow{AC}\) in \(\overrightarrow{BC}\) z vektorji \(\vec{a} = \overrightarrow{DA}\), \(\vec{b} = \overrightarrow{DB}\) "
    r"in \(\vec{c} = \overrightarrow{DC}\). Dokaži, da velja \(\overrightarrow{AC} + \overrightarrow{BD} = \overrightarrow{AD} + \overrightarrow{BC}\). (4 točke)<br>"
    r"c) Naj bo piramida \(ABCD\) enakoroba. Dokaži, da sta nasprotna robova \(AC\) in \(BD\) pravokotna. (6 točk)",
    r"a) \(-\frac{9}{2}\ \mathrm{cm^2}\) &nbsp; b) \(\overrightarrow{AC} = \vec{c} - \vec{a}\), \(\overrightarrow{BC} = \vec{c} - \vec{b}\) &nbsp; "
    r"c) \(\overrightarrow{AC} \cdot \overrightarrow{BD} = 0\)",
    [
        ("γ = 180° − 50° − 70° = 60°", ""),
        ("∢ASB = 2γ = 120°", "Središčni kot je dvakratnik obodnega kota nad isto tetivo."),
        ("!a) " + V("SA") + " · " + V("SB") + " = R · R · cos 120° = 9 · (−" + U("1", "2") + ") = −" + U("9", "2") + " cm<sup>2</sup>", "|SA| = |SB| = R."),
        ("!" + V("AC") + " = " + V("AD") + " + " + V("DC") + " = −" + V("a") + " + " + V("c") + ",  " + V("BC") + " = −" + V("b") + " + " + V("c"), "Pot od A do C prek oglišča D."),
        (V("AC") + " + " + V("BD") + " = " + V("c") + " − " + V("a") + " − " + V("b"), "BD = −b, ker je b = DB."),
        ("!b) " + V("AD") + " + " + V("BC") + " = −" + V("a") + " + " + V("c") + " − " + V("b") + ":  obe strani sta enaki", ""),
        (V("AC") + " · " + V("BD") + " = (" + V("c") + " − " + V("a") + ") · (−" + V("b") + ") = " + V("a") + " · " + V("b") + " − " + V("c") + " · " + V("b"), "Pravokotnost dokažemo s skalarnim produktom."),
        ("|" + V("a") + "| = |" + V("b") + "| = |" + V("c") + "| = s,  vsi koti med njimi so 60°", "Stranske ploskve enakorobe piramide so enakostranični trikotniki."),
        (V("a") + " · " + V("b") + " = " + V("c") + " · " + V("b") + " = s<sup>2</sup> cos 60° = " + U("s<sup>2</sup>", "2"), ""),
        ("!c) " + V("AC") + " · " + V("BD") + " = " + U("s<sup>2</sup>", "2") + " − " + U("s<sup>2</sup>", "2") + " = 0  ⇒  AC ⊥ BD", ""),
    ],
)

POLA2 = [v1, v2, v3]
