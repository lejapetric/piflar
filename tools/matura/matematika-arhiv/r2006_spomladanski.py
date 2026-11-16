# Spomladanski rok 2006 (uradne pole RIC: m061-401-1-1, m061-402-1-1, m061-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2006, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "funkcije", 7,
    r"Reši enačbe: a) \(8^x = \frac{1}{2}\), b) \(\log_8 x = \frac{2}{3}\), c) \(\sin x = \frac{\sqrt{3}}{2}\).",
    r"a) \(x = -\frac{1}{3}\) &nbsp; b) \(x = 4\) &nbsp; c) \(x = \frac{\pi}{3} + 2k\pi\), \(x = \frac{2\pi}{3} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("2<sup>3x</sup> = 2<sup>−1</sup>", "Obe strani zapišemo kot potenci z osnovo 2."),
        ("!a) x = −" + U("1", "3"), ""),
        ("x = 8<sup>2/3</sup> = (" + K("8", "3") + ")<sup>2</sup>", "Definicija logaritma."),
        ("!b) x = 4", ""),
        ("!c) x = " + U("π", "3") + " + 2kπ,  x = " + U("2π", "3") + " + 2kπ, k ∈ ℤ", "Sinus je pozitiven v 1. in 2. kvadrantu."),
    ],
)

n2 = naloga(
    2, "zaporedja_vrste", 7,
    r"Dopolni manjkajoče člene treh aritmetičnih zaporedij in zapiši diferenco vsakega:<br>"
    r"a) \(3, 7, 11, 15, \square, \square, \dots\)<br>b) \(6, \square, 1, \square, \dots\)<br>c) \(\square, 2, \square, \square, 8, \dots\)",
    r"a) \(19, 23\), \(d = 4\) &nbsp; b) \(\frac{7}{2}, -\frac{3}{2}\), \(d = -\frac{5}{2}\) &nbsp; c) \(0, 4, 6\), \(d = 2\)",
    [
        ("!a) d = 4:  3, 7, 11, 15, 19, 23", "Diferenca je razlika sosednjih členov."),
        ("a<sub>3</sub> = a<sub>1</sub> + 2d:  1 = 6 + 2d  ⇒  d = −" + U("5", "2"), ""),
        ("!b) 6, " + U("7", "2") + ", 1, −" + U("3", "2") + ";  d = −" + U("5", "2"), ""),
        ("a<sub>5</sub> − a<sub>2</sub> = 3d = 6  ⇒  d = 2", ""),
        ("!c) 0, 2, 4, 6, 8;  d = 2", ""),
    ],
)


def f3(x):
    return (3 * x + 2) / (x - 1)

n3 = naloga(
    3, "funkcije", 6,
    r"Nariši graf funkcije \(f(x) = \dfrac{3x + 2}{x - 1}\). Zapiši ničlo, pol, vodoravno asimptoto in presečišče grafa z ordinatno osjo.",
    r"ničla \(-\frac{2}{3}\), pol \(x = 1\), asimptota \(y = 3\), \((0, -2)\)",
    [
        ("!ničla x = −" + U("2", "3") + ",  pol x = 1", "Ničla števca; ničla imenovalca."),
        ("!vodoravna asimptota y = 3,  f(0) = −2", "Enaki stopnji: količnik vodilnih koeficientov."),
        ("@slika", graf([(f3, MODRA), (lambda x: 3, "#8a8a8a")], (-5, 6), (-6, 10), tocke=[(-2 / 3, 0, ""), (0, -2, "")], sirina=260, visina=280)),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n4 = naloga(
    4, "integralski_racun", 7,
    r"Izračunaj točno vrednost določenega integrala \(\displaystyle\int_0^{\pi/3} (4\cos x - 1)\,dx\).",
    r"\(2\sqrt{3} - \frac{\pi}{3}\)",
    [
        ("∫(4 cos x − 1) dx = 4 sin x − x + C", "Osnovna integrala."),
        ("(4 sin x − x)" + MEJA("π/3", "0") + " = 4 · " + U(K("3"), "2") + " − " + U("π", "3") + " − 0", "Newton-Leibnizova formula."),
        ("!2" + K("3") + " − " + U("π", "3"), ""),
    ],
    snov=INTS,
)

n5 = naloga(
    5, "stevilske_mnozice", 8,
    r"V kompleksni ravnini nariši število \(z = 5\,i^{2027}(2 - i)^{-1}\).",
    r"\(z = 1 - 2i\)",
    [
        ("i<sup>2027</sup> = i<sup>3</sup> = −i", "2027 da pri deljenju s 4 ostanek 3."),
        ("z = " + U("−5i", "2 − i") + " = " + U("−5i(2 + i)", "5"), "Razširimo s konjugirano vrednostjo, (2 − i)(2 + i) = 5."),
        ("!z = −i(2 + i) = −2i − i<sup>2</sup> = 1 − 2i", ""),
        ("@slika", mreza((-2, 3), (-3, 2), lambda X, Y: tocka(X, Y, 1, -2, "z = 1 − 2i"), sirina=180)),
    ],
)

n6 = naloga(
    6, "diferencialni_racun", 8,
    r"Zapiši enačbi tangent na graf funkcije \(f(x) = x^3 - 2x\), ki sta vzporedni premici \(x - y + 5 = 0\).",
    r"\(y = x - 2\) in \(y = x + 2\)",
    [
        ("premica: y = x + 5,  k = 1", "Vzporedni premici imata enaka smerna koeficienta."),
        ("f '(x) = 3x<sup>2</sup> − 2 = 1  ⇒  x = ±1", ""),
        ("f(1) = −1,  f(−1) = 1", ""),
        ("!y = x − 2,  y = x + 2", "y − y₀ = k(x − x₀)."),
    ],
)

n7 = naloga(
    7, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Marko je v cvetličarni za \(5\) vrtnic in \(2\) orhideji plačal \(31\) €. Sanja je v isti cvetličarni za \(3\) vrtnice in \(4\) orhideje "
    r"plačala \(41\) €. Koliko stane ena vrtnica in koliko ena orhideja?",
    r"vrtnica \(3\) €, orhideja \(8\) €",
    [
        (SISTEM("5x + 2y = 31", "3x + 4y = 41"), "x je cena vrtnice, y cena orhideje."),
        ("10x + 4y = 62  ⇒  7x = 21", "Prvo enačbo pomnožimo z 2 in odštejemo drugo."),
        ("!x = 3 €,  y = 8 €", ""),
    ],
)


def kvadrat8():
    s, x0, y0 = 150, 20, 170
    A, B, C, D = (x0, y0), (x0 + s, y0), (x0 + s, y0 - s), (x0, y0 - s)
    lec = f'M {B[0]},{B[1]} A {s},{s} 0 0,0 {D[0]},{D[1]} A {s},{s} 0 0,0 {B[0]},{B[1]} Z'
    return svg(200, 190, f'<path d="{lec}" fill="{MODRA}" fill-opacity="0.3" stroke="{MODRA}" stroke-width="1.5"/>'
               f'<rect x="{D[0]}" y="{D[1]}" width="{s}" height="{s}" fill="none" stroke="currentColor" stroke-width="1.5"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(B[0] + 10, B[1] + 4, "B") + napis(C[0] + 10, C[1] + 4, "C") + napis(D[0] - 10, D[1] + 4, "D"),
               opis="Kvadrat z dvema krožnima lokoma")

n8 = naloga(
    8, "geometrijski_liki_telesa", 6,
    r"Stranica kvadrata \(ABCD\) meri \(6\) enot. Narisana sta krožna loka s polmerom \(6\): eden s središčem v \(A\), drugi s središčem v \(C\) "
    r"(glej sliko). Izračunaj točno ploščino osenčenega lika." + kvadrat8(),
    r"\(18\pi - 36\)",
    [
        ("četrtina kroga s središčem A: " + U("π · 36", "4") + " = 9π", "Lok poteka od B do D."),
        ("odsek nad diagonalo BD: 9π − " + U("6 · 6", "2") + " = 9π − 18", "Četrtina kroga minus pravokotni trikotnik ABD."),
        ("osenčeni lik sestavljata dva enaka odseka (za A in za C)", "Simetrija čez diagonalo BD."),
        ("!S = 2(9π − 18) = 18π − 36", ""),
    ],
)

n9 = naloga(
    9, ["kombinatorika", "verjetnostni_racun"], 5,
    r"Črke imena KARMEN naključno razporedimo v vrsto, vsako uporabimo natanko enkrat. Izračunaj verjetnosti dogodkov:<br>"
    r"\(A\) – beseda se začne s črko K,<br>\(B\) – dobimo ime, zapisano od zadaj naprej (NEMRAK).",
    r"\(P(A) = \frac{1}{6}\), \(P(B) = \frac{1}{720}\)",
    [
        ("n = 6! = 720", "Vse črke so različne."),
        ("!P(A) = " + U("5!", "6!") + " = " + U("1", "6"), "Prva črka je določena, ostale razporedimo poljubno."),
        ("!P(B) = " + U("1", "720"), "Ugodna je natanko ena razporeditev."),
    ],
)


def f10(x):
    return 1 if x <= 1 else x * x


def slika10(X, Y):
    xs = [2 * i / 80 for i in range(81)]
    pot = f"{X(0):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(f10(x)):.1f}" for x in xs) + f" {X(2):.1f},{Y(0):.1f}"
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>'
            + krivulja(X, Y, lambda x: 1, -2, 1, MODRA) + krivulja(X, Y, lambda x: x * x, 1, 2.2, MODRA))

n10 = naloga(
    10, ["funkcije", "integralski_racun"], 8,
    r"Funkcija \(f\) je dana s predpisom \(f(x) = \begin{cases} 1; & x \le 1 \\ x^2; & x > 1 \end{cases}\). Nariši graf in izračunaj ploščino "
    r"lika med grafom in abscisno osjo na intervalu \([0, 2]\).",
    r"\(S = \frac{10}{3}\)",
    [
        ("@slika", mreza((-2, 3), (-1, 5), slika10, sirina=200)),
        ("S = " + INT("1", "0") + "1 dx + " + INT("2", "1") + "x<sup>2</sup> dx", "Integral razdelimo na intervala, kjer velja posamezen predpis."),
        ("= 1 + " + U("x<sup>3</sup>", "3") + MEJA("2", "1") + " = 1 + " + U("8 − 1", "3"), ""),
        ("!S = " + U("10", "3"), ""),
    ],
    snov=INTS,
)

n11 = naloga(
    11, "vektorji_ravnina_prostor", 6,
    r"Dana sta vektorja \(\vec{a} = (1, -2, 3)\) in \(\vec{b} = (2, 1, -1)\). Izračunaj njun skalarni produkt, vektor \(\vec{x} = 2\vec{a} - \vec{b}\) "
    r"in točno dolžino vektorja \(\vec{x}\).",
    r"\(\vec{a} \cdot \vec{b} = -3\), \(\vec{x} = (0, -5, 7)\), \(|\vec{x}| = \sqrt{74}\)",
    [
        ("!" + V("a") + " · " + V("b") + " = 2 − 2 − 3 = −3", "a · b = a₁b₁ + a₂b₂ + a₃b₃."),
        ("!" + V("x") + " = (2, −4, 6) − (2, 1, −1) = (0, −5, 7)", ""),
        ("!|" + V("x") + "| = " + K("0 + 25 + 49") + " = " + K("74"), ""),
    ],
)

n12 = naloga(
    12, "funkcije", 7,
    r"Kvadratna funkcija ima vodilni koeficient \(a = -1\), eno od ničel \(x_1 = 4\) in ekstremno vrednost pri \(x = 1\). Zapiši to funkcijo.",
    r"\(f(x) = -(x - 1)^2 + 9 = -x^2 + 2x + 8\)",
    [
        ("f(x) = −(x − 1)<sup>2</sup> + d", "Temenska oblika: abscisa temena je 1."),
        ("f(4) = −9 + d = 0  ⇒  d = 9", ""),
        ("!f(x) = −(x − 1)<sup>2</sup> + 9 = −x<sup>2</sup> + 2x + 8", "Druga ničla je x₂ = −2 (simetrično glede na x = 1)."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def slika_v1(X, Y):
    return (parametricna(X, Y, lambda t: -1 + 5 * math.cos(t), lambda t: 5 * math.sin(t), 0, 2 * math.pi, "#8a8a8a")
            + parametricna(X, Y, lambda t: -1 + math.sqrt(40) * math.cos(t), lambda t: 3 + math.sqrt(24) * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -5, 3, "A", dx=-4, dy=-8) + tocka(X, Y, 3, 3, "B", dy=-8) + tocka(X, Y, 4, 0, "C", dy=14) + tocka(X, Y, -1, 0, "S", dy=14))

v1 = naloga(
    1, ["stoznice", "pravokotni_koordinatni_sistem_ravnina"], 14,
    r"V koordinatnem sistemu so dane točke \(A(-5, 3)\), \(B(3, 3)\) in \(C(4, 0)\).<br>"
    r"a) Izračunaj kot med daljicama \(OB\) in \(AC\) (\(O\) je izhodišče) na kotno minuto. (3 točke)<br>"
    r"b) Zapiši enačbo krožnice skozi točke \(A\), \(B\) in \(C\). Koliko meri njen polmer? (5 točk)<br>"
    r"c) Zapiši enačbo elipse z goriščema \(A\) in \(B\), ki poteka skozi \(C\). Nariši jo. (6 točk)",
    r"a) \(63^\circ 26'\) &nbsp; b) \((x + 1)^2 + y^2 = 25\), \(r = 5\) &nbsp; c) \(\frac{(x + 1)^2}{40} + \frac{(y - 3)^2}{24} = 1\)",
    [
        ("k<sub>OB</sub> = 1,  k<sub>AC</sub> = " + U("0 − 3", "4 + 5") + " = −" + U("1", "3"), "Smerna koeficienta nosilk."),
        ("tan φ = |" + U("−1/3 − 1", "1 − 1/3") + "| = 2", "Kot med premicama."),
        ("!a) φ ≈ 63,43° ≈ 63°26'", ""),
        ("središče na simetrali AB: x = −1;  S(−1, q)", "Središče je enako oddaljeno od A in B."),
        ("|SA| = |SC|:  16 + (3 − q)<sup>2</sup> = 25 + q<sup>2</sup>  ⇒  −6q = 0  ⇒  q = 0", ""),
        ("!b) (x + 1)<sup>2</sup> + y<sup>2</sup> = 25,  r = 5", ""),
        ("središče elipse (−1, 3),  e = 4", "Središče je razpolovišče goriščne daljice."),
        ("2a = |CA| + |CB| = " + K("90") + " + " + K("10") + " = 4" + K("10") + "  ⇒  a<sup>2</sup> = 40", "Definicija elipse: vsota razdalj do gorišč je 2a."),
        ("b<sup>2</sup> = a<sup>2</sup> − e<sup>2</sup> = 24", ""),
        ("!c) " + U("(x + 1)<sup>2</sup>", "40") + " + " + U("(y − 3)<sup>2</sup>", "24") + " = 1", "Preizkus s C: 25/40 + 9/24 = 1."),
        ("@slika", mreza((-9, 6), (-6, 9), slika_v1, sirina=280)),
    ],
)


def mnozica_v2(X, Y):
    r = 3
    th0, th1 = math.pi / 4, math.pi - math.acos(1 / 3)
    lok = [(r * math.cos(th0 + (th1 - th0) * i / 40), r * math.sin(th0 + (th1 - th0) * i / 40)) for i in range(41)]
    pts = [(-1, -1), (r / math.sqrt(2), r / math.sqrt(2))] + lok + [(-1, math.sqrt(8))]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.35" stroke="{MODRA}" stroke-width="1.5"/>'
            + parametricna(X, Y, lambda t: 3 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * math.pi, "#8a8a8a")
            + krivulja(X, Y, lambda x: x, -4, 4, "#8a8a8a")
            + f'<line x1="{X(-1):.1f}" y1="{Y(-4):.1f}" x2="{X(-1):.1f}" y2="{Y(4):.1f}" stroke="#8a8a8a"/>')

v2 = naloga(
    2, "stevilske_mnozice", 13,
    r"Reši naloge iz kompleksnih števil.<br>"
    r"a) V kompleksni ravnini so dane množice \(\mathcal{A} = \{z;\ |z| \le 3\}\), \(\mathcal{B} = \{z;\ \mathrm{Im}\,z \ge \mathrm{Re}\,z\}\) in "
    r"\(\mathcal{C} = \{z;\ \mathrm{Re}\,z \ge -1\}\). Nariši množico \(\mathcal{A} \cap \mathcal{B} \cap \mathcal{C}\). (4 točke)<br>"
    r"b) Izračunaj realni števili \(a\) in \(b\), da bo \((2 + ai)(b - 2i) = 14 + 8i\). (4 točke)<br>"
    r"c) Dokaži, da število \(z = \log_2(a - 1) + i \log_3(a^2 - 4a + 7)\) ni realno za noben \(a > 1\). Za kateri \(a\) je \(\mathrm{Re}\,z = 0\)? (5 točk)",
    r"b) \(a = 3, b = 4\) ali \(a = 4, b = 3\) &nbsp; c) \(a = 2\)",
    [
        ("𝒜: krog s središčem 0 in polmerom 3;  ℬ: polravnina nad premico y = x;  𝒞: polravnina desno od x = −1", "|z| je razdalja od izhodišča."),
        ("@slika", mreza((-4, 4), (-4, 4), mnozica_v2, sirina=240)),
        ("(2 + ai)(b − 2i) = 2b + 2a + (ab − 4) i", "Množenje, i² = −1."),
        (SISTEM("2a + 2b = 14", "ab − 4 = 8"), "Kompleksni števili sta enaki, ko se ujemata realna in imaginarna dela."),
        ("a + b = 7,  ab = 12  ⇒  a, b sta rešitvi t<sup>2</sup> − 7t + 12 = 0", "Vietovo pravilo."),
        ("!b) a = 3, b = 4  ali  a = 4, b = 3", ""),
        ("a<sup>2</sup> − 4a + 7 = (a − 2)<sup>2</sup> + 3 ≥ 3", "Dopolnimo do popolnega kvadrata."),
        ("Im z = log<sub>3</sub>((a − 2)<sup>2</sup> + 3) ≥ log<sub>3</sub> 3 = 1 > 0", "Logaritem z osnovo 3 je naraščajoč."),
        ("!z ni realno za noben a > 1", ""),
        ("Re z = log<sub>2</sub>(a − 1) = 0  ⇒  a − 1 = 1", ""),
        ("!c) a = 2 (tedaj je z = i)", ""),
    ],
)


def slika_v3(X, Y):
    xs = [math.pi / 6 + (math.pi / 3) * i / 50 for i in range(51)]
    pot = " ".join(f"{X(x):.1f},{Y(math.sin(2 * x)):.1f}" for x in xs) + " " + " ".join(f"{X(x):.1f},{Y(math.cos(x)):.1f}" for x in reversed(xs))
    t = [f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25"/>',
         krivulja(X, Y, lambda x: math.sin(2 * x), 0, math.pi, MODRA), krivulja(X, Y, math.cos, 0, math.pi, RDECA)]
    for x in (math.pi / 6, math.pi / 2, 5 * math.pi / 6):
        t.append(tocka(X, Y, x, math.cos(x)))
    for k, s in ((1, "π/2"), (2, "π")):
        t.append(napis(X(k * math.pi / 2), Y(0) + 14, s, 10))
    return "".join(t)

v3 = naloga(
    3, ["funkcije", "diferencialni_racun", "integralski_racun"], 13,
    r"Dani sta funkciji \(f(x) = \sin 2x\) in \(g(x) = \cos x\).<br>"
    r"a) Nariši grafa na intervalu \([0, \pi]\) in izračunaj njuna presečišča na tem intervalu. (4 točke)<br>"
    r"b) Izračunaj kot, pod katerim se grafa sekata v presečišču z najmanjšo absciso. (4 točke)<br>"
    r"c) Izračunaj ploščino lika, ki ga grafa oklepata med presečiščema z abscisama \(\frac{\pi}{6}\) in \(\frac{\pi}{2}\). (3 točke)<br>"
    r"d) Za katera od \(0\) različna realna števila \(a\) se krivulji \(y = a\sin 2x\) in \(y = \cos x\) sekata na intervalu \(\left(0, \frac{\pi}{2}\right)\)? (2 točki)",
    r"a) \(\left(\frac{\pi}{6}, \frac{\sqrt{3}}{2}\right)\), \(\left(\frac{\pi}{2}, 0\right)\), \(\left(\frac{5\pi}{6}, -\frac{\sqrt{3}}{2}\right)\) &nbsp; "
    r"b) \(\arctan 3 \approx 71{,}57^\circ\) &nbsp; c) \(\frac{1}{4}\) &nbsp; d) \(a > \frac{1}{2}\)",
    [
        ("2 sin x cos x = cos x  ⇒  cos x (2 sin x − 1) = 0", "Sinus dvojnega kota."),
        ("cos x = 0 ⇒ x = " + U("π", "2") + ";  sin x = " + U("1", "2") + " ⇒ x = " + U("π", "6") + ", " + U("5π", "6"), ""),
        ("!a) (" + U("π", "6") + ", " + U(K("3"), "2") + "),  (" + U("π", "2") + ", 0),  (" + U("5π", "6") + ", −" + U(K("3"), "2") + ")", ""),
        ("@slika", mreza((-0.3, 3.4), (-1.3, 1.3), slika_v3, sirina=320, visina=200, korak=0.5, oznake=False)),
        ("f '(x) = 2 cos 2x,  k<sub>1</sub> = f '(" + U("π", "6") + ") = 1;  g '(x) = −sin x,  k<sub>2</sub> = −" + U("1", "2"), "Kot med krivuljama je kot med tangentama."),
        ("tan φ = |" + U("1 + 1/2", "1 − 1/2") + "| = 3", "Kot med premicama."),
        ("!b) φ = arctan 3 ≈ 71,57°", ""),
        ("S = " + INT("π/2", "π/6") + "(sin 2x − cos x) dx = (−" + U("cos 2x", "2") + " − sin x)" + MEJA("π/2", "π/6"), "Na tem intervalu je sin 2x ≥ cos x."),
        ("= (" + U("1", "2") + " − 1) − (−" + U("1", "4") + " − " + U("1", "2") + ")", ""),
        ("!c) S = " + U("1", "4"), ""),
        ("cos x (2a sin x − 1) = 0;  na (0, " + U("π", "2") + ") je cos x ≠ 0", ""),
        ("sin x = " + U("1", "2a") + " mora biti v (0, 1)", "Na (0, π/2) sinus zavzame vse vrednosti med 0 in 1."),
        ("!d) a > " + U("1", "2"), ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

POLA2 = [v1, v2, v3]
