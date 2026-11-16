# Spomladanski rok 2009 (uradne pole RIC: m091-401-1-1, m091-402-1-1, m091-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2009, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"
ZELENA = "#2a9d4b"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
def trikotnik1():
    A, C = (20, 165), (200, 165)
    B = (200, 165 - 180 * math.tan(math.radians(37)))
    return svg(250, 190, f'<polygon points="{A[0]},{A[1]} {C[0]},{C[1]} {B[0]:.1f},{B[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               f'<rect x="{C[0] - 12}" y="{C[1] - 12}" width="12" height="12" fill="none" stroke="currentColor"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(C[0] + 10, C[1] + 4, "C") + napis(B[0] + 10, B[1] + 4, "B")
               + napis(A[0] + 38, A[1] - 6, "37°", 11) + napis(110, 182, "b = 8 cm", 11) + napis(C[0] + 14, (B[1] + C[1]) / 2, "a", 12),
               opis="Pravokotni trikotnik ABC")

n1 = naloga(
    1, "geometrijski_liki_telesa", 6,
    r"V pravokotnem trikotniku \(ABC\) s pravim kotom pri oglišču \(C\) meri kateta \(b = |AC| = 8\ \mathrm{cm}\), kot pri oglišču \(A\) pa "
    r"\(\alpha = 37^\circ\). Nariši skico in izračunaj ploščino trikotnika.",
    r"\(S \approx 24{,}11\ \mathrm{cm^2}\)",
    [
        ("@slika", trikotnik1()),
        ("tan α = " + U("a", "b") + "  ⇒  a = 8 · tan 37° ≈ 6,028 cm", "Kotne funkcije v pravokotnem trikotniku."),
        ("!S = " + U("a · b", "2") + " ≈ " + U("6,028 · 8", "2") + " ≈ 24,11 cm<sup>2</sup>", "Kateti sta drug na drugega pravokotni."),
    ],
)

n2 = naloga(
    2, ["potence_koreni", "algebrski_izrazi_enacbe_neenacbe", "kombinatorika"], 8,
    r"Okrajšaj ulomke:<br>a) \(\dfrac{2^{15}}{8^4}\) (3 točke)<br>b) \(\dfrac{x^2 - 5x}{x^2 - 25}\), \(x \ne \pm 5\) (3 točke)<br>"
    r"c) \(\dfrac{(n + 1)!}{(n + 1)! + (n + 2)!}\), \(n \in \mathbb{N}\) (2 točki)",
    r"a) \(8\) &nbsp; b) \(\frac{x}{x + 5}\) &nbsp; c) \(\frac{1}{n + 3}\)",
    [
        ("!a) " + U("2<sup>15</sup>", "(2<sup>3</sup>)<sup>4</sup>") + " = " + U("2<sup>15</sup>", "2<sup>12</sup>") + " = 2<sup>3</sup> = 8", "Potenca potence; deljenje potenc z enako osnovo."),
        ("!b) " + U("x(x − 5)", "(x − 5)(x + 5)") + " = " + U("x", "x + 5"), "Izpostavimo x; razlika kvadratov."),
        ("(n + 2)! = (n + 2)(n + 1)!", "Definicija fakultete."),
        ("!c) " + U("(n + 1)!", "(n + 1)! (1 + n + 2)") + " = " + U("1", "n + 3"), ""),
    ],
)

n3 = naloga(
    3, "statistika", 5,
    r"Smučarska skakalka Nika je na treningu skočila štirikrat: \(102\ \mathrm{m}\), \(96\ \mathrm{m}\), \(99\ \mathrm{m}\) in \(107\ \mathrm{m}\). "
    r"Izračunaj povprečno dolžino skokov. Koliko metrov bi morala skočiti v petem skoku, da bi se povprečje povečalo na \(103\ \mathrm{m}\)?",
    r"\(101\ \mathrm{m}\); \(111\ \mathrm{m}\)",
    [
        ("!μ = " + U("102 + 96 + 99 + 107", "4") + " = " + U("404", "4") + " = 101 m", "Aritmetična sredina."),
        (U("404 + x", "5") + " = 103", ""),
        ("!x = 515 − 404 = 111 m", ""),
    ],
)

n4 = naloga(
    4, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Dana je kvadratna enačba \(ax^2 - 2x - 4 = 0\), \(a \in \mathbb{R}\), \(a \ne 0\). Reši jo za \(a = 1\) (točni rešitvi). Za katera števila "
    r"\(a\) ima enačba dve različni realni rešitvi?",
    r"\(x = 1 \pm \sqrt{5}\); \(a > -\frac{1}{4}\), \(a \ne 0\)",
    [
        ("x<sup>2</sup> − 2x − 4 = 0:  x = " + U("2 ± " + K("4 + 16"), "2"), "Formula za rešitve kvadratne enačbe."),
        ("!x<sub>1,2</sub> = 1 ± " + K("5"), "√20 = 2√5."),
        ("D = 4 + 16a > 0", "Dve različni realni rešitvi: D > 0."),
        ("!a > −" + U("1", "4") + ",  a ≠ 0", ""),
    ],
)

n5 = naloga(
    5, "potence_koreni", 5,
    r"Poenostavi izraz \(\dfrac{a^{-2} \cdot \sqrt[3]{a^8}}{\sqrt{a}}\), \(a > 0\). Rezultat zapiši s korenom.",
    r"\(\sqrt[6]{a}\)",
    [
        ("a<sup>−2</sup> · a<sup>8/3</sup> : a<sup>1/2</sup>", "Koren zapišemo kot potenco z ulomljenim eksponentom."),
        ("a<sup>−2 + 8/3 − 1/2</sup> = a<sup>(−12 + 16 − 3)/6</sup>", "Seštevanje eksponentov pri množenju, odštevanje pri deljenju."),
        ("!a<sup>1/6</sup> = " + K("a", "6"), ""),
    ],
)

n6 = naloga(
    6, "funkcije", 8,
    r"Reši enačbe: a) \(4 \cdot 9^x = 12\) (2 točki) &nbsp; b) \(4 \log_9 x = 2\) (2 točki) &nbsp; c) \(4 \sin 3x = 2\) (4 točke)",
    r"a) \(x = \frac{1}{2}\) &nbsp; b) \(x = 3\) &nbsp; c) \(x = \frac{\pi}{18} + \frac{2k\pi}{3}\), \(x = \frac{5\pi}{18} + \frac{2k\pi}{3}\), \(k \in \mathbb{Z}\)",
    [
        ("9<sup>x</sup> = 3  ⇒  3<sup>2x</sup> = 3<sup>1</sup>", "Eksponentna enačba z enakima osnovama."),
        ("!a) x = " + U("1", "2"), ""),
        ("log<sub>9</sub> x = " + U("1", "2") + "  ⇒  x = 9<sup>1/2</sup>", "Definicija logaritma."),
        ("!b) x = 3", ""),
        ("sin 3x = " + U("1", "2") + "  ⇒  3x = " + U("π", "6") + " + 2kπ  ali  3x = " + U("5π", "6") + " + 2kπ", ""),
        ("!c) x = " + U("π", "18") + " + " + U("2kπ", "3") + ",  x = " + U("5π", "18") + " + " + U("2kπ", "3") + ", k ∈ ℤ", "Periodo delimo s 3."),
    ],
)

n7 = naloga(
    7, "stevilske_mnozice", 7,
    r"Naj bo \(z_1 = 4i - 3i^2 + i^3\), \(z_2 = (2 + i)(1 + i) - 4\) in \(z_3 = \dfrac{9 + 3i}{1 + 2i}\). Izračunaj kompleksna števila "
    r"\(z_1\), \(z_2\) in \(z_3\). Kateri izmed njih sta si nasprotni in kateri konjugirani?",
    r"\(z_1 = 3 + 3i\), \(z_2 = -3 + 3i\), \(z_3 = 3 - 3i\); \(z_3 = -z_2\), \(z_3 = \overline{z_1}\)",
    [
        ("!z<sub>1</sub> = 4i + 3 − i = 3 + 3i", "i² = −1, i³ = −i."),
        ("!z<sub>2</sub> = 2 + 2i + i + i<sup>2</sup> − 4 = −3 + 3i", ""),
        ("z<sub>3</sub> = " + U("(9 + 3i)(1 − 2i)", "(1 + 2i)(1 − 2i)") + " = " + U("9 − 18i + 3i + 6", "5"), "Ulomek razširimo s konjugirano vrednostjo imenovalca."),
        ("!z<sub>3</sub> = " + U("15 − 15i", "5") + " = 3 − 3i", ""),
        ("!z<sub>3</sub> = −z<sub>2</sub> (nasprotni),  z<sub>3</sub> = z̄<sub>1</sub> (konjugirani)", "Nasprotno število: oba dela zamenjata predznak; konjugirano: le imaginarni del."),
    ],
)


def premica8(X, Y):
    return krivulja(X, Y, lambda x: -0.5 * x + 2, -1, 5, MODRA)


def kroznica8(X, Y):
    return parametricna(X, Y, lambda t: -1 + 2 * math.cos(t), lambda t: 2 + 2 * math.sin(t), 0, 2 * math.pi, MODRA)


def elipsa8(X, Y):
    return parametricna(X, Y, lambda t: 3 * math.cos(t), lambda t: 2 * math.sin(t), 0, 2 * math.pi, MODRA)


n8 = naloga(
    8, ["pravokotni_koordinatni_sistem_ravnina", "stoznice"], 7,
    r"Spodaj so narisane premica, krožnica in elipsa. Zapiši njihove enačbe."
    + '<div style="display:flex;flex-wrap:wrap;gap:12px">'
    + mreza((-2, 5), (-2, 4), premica8, sirina=180) + mreza((-4, 2), (-1, 5), kroznica8, sirina=160) + mreza((-4, 4), (-3, 3), elipsa8, sirina=200)
    + '</div>',
    r"\(y = -\frac{1}{2}x + 2\), \((x + 1)^2 + (y - 2)^2 = 4\), \(\frac{x^2}{9} + \frac{y^2}{4} = 1\)",
    [
        ("premica: n = 2, ničla x = 4, k = −" + U("2", "4"), "Začetna vrednost in smerni koeficient preberemo z grafa."),
        ("!y = −" + U("1", "2") + "x + 2", ""),
        ("krožnica: središče (−1, 2), polmer 2", ""),
        ("!(x + 1)<sup>2</sup> + (y − 2)<sup>2</sup> = 4", ""),
        ("elipsa: središče v izhodišču, a = 3, b = 2", "Polosi preberemo iz presečišč z osema."),
        ("!" + U("x<sup>2</sup>", "9") + " + " + U("y<sup>2</sup>", "4") + " = 1", ""),
    ],
)


def sestkotnik9(X, Y):
    r = 4
    P = [(r * math.cos(math.radians(240 + 60 * i)), r * math.sin(math.radians(240 + 60 * i))) for i in range(6)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in P)
    A, B, C = P[0], P[1], P[2]
    E = (2 * C[0] - B[0], 2 * C[1] - B[1])
    t = [OST, parametricna(X, Y, lambda t: r * math.cos(t), lambda t: r * math.sin(t), 0, 2 * math.pi, "#8a8a8a"),
         f'<polygon points="{pot}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{X(A[0]):.1f}" y1="{Y(A[1]):.1f}" x2="{X(B[0]):.1f}" y2="{Y(B[1]):.1f}" stroke="{MODRA}" stroke-width="2.2" marker-end="url(#ost09)"/>',
         f'<line x1="{X(B[0]):.1f}" y1="{Y(B[1]):.1f}" x2="{X(E[0]):.1f}" y2="{Y(E[1]):.1f}" stroke="{RDECA}" stroke-width="2.2" marker-end="url(#ost09)"/>',
         f'<line x1="{X(A[0]):.1f}" y1="{Y(A[1]):.1f}" x2="{X(E[0]):.1f}" y2="{Y(E[1]):.1f}" stroke="{ZELENA}" stroke-width="2.2" marker-end="url(#ost09)"/>']
    for (x, y), s in zip(P, "ABCDEF"):
        t.append(napis(X(x * 1.15), Y(y * 1.15) + 4, s, 12))
    t.append(napis(X(E[0]) + 8, Y(E[1]) + 4, "x⃗", 13, ZELENA, "start"))
    return "".join(t)


OST = ('<defs><marker id="ost09" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">'
       '<path d="M0,0 L10,5 L0,10 Z" fill="currentColor"/></marker></defs>')

n9 = naloga(
    9, "vektorji_ravnina_prostor", 7,
    r"V krog s polmerom \(r = 4\ \mathrm{cm}\) včrtaj pravilni šestkotnik \(ABCDEF\). Nariši vektor "
    r"\(\vec{x} = \overrightarrow{AB} + 2\overrightarrow{BC}\) in izračunaj njegovo dolžino. Rezultat zaokroži na milimetre.",
    r"\(|\vec{x}| = 4\sqrt{7}\ \mathrm{cm} \approx 10{,}6\ \mathrm{cm}\)",
    [
        ("@slika", mreza((-5, 7), (-5, 5), sestkotnik9, sirina=280, oznake=False)),
        ("|" + V("AB") + "| = |" + V("BC") + "| = r = 4 cm", "Stranica pravilnega šestkotnika je enaka polmeru očrtanega kroga."),
        ("kot med " + V("AB") + " in " + V("BC") + " je 60°,  " + V("AB") + " · " + V("BC") + " = 4 · 4 · " + U("1", "2") + " = 8", "Zunanji kot pravilnega šestkotnika meri 60°."),
        ("|" + V("x") + "|<sup>2</sup> = |" + V("AB") + "|<sup>2</sup> + 4 " + V("AB") + " · " + V("BC") + " + 4|" + V("BC") + "|<sup>2</sup> = 16 + 32 + 64 = 112", "|x|² = x · x."),
        ("!|" + V("x") + "| = " + K("112") + " = 4" + K("7") + " cm ≈ 10,6 cm", ""),
    ],
)

n10 = naloga(
    10, "zaporedja_vrste", 6,
    r"Drugi člen geometrijskega zaporedja je \(a_2 = -6\), peti pa \(a_5 = 48\). Izračunaj prvi člen, količnik in vsoto prvih osemnajstih členov.",
    r"\(a_1 = 3\), \(q = -2\), \(s_{18} = 1 - 2^{18} = -262\,143\)",
    [
        (SISTEM("a<sub>1</sub> q = −6", "a<sub>1</sub> q<sup>4</sup> = 48"), "Splošni člen geometrijskega zaporedja."),
        ("q<sup>3</sup> = −8", "Enačbi delimo."),
        ("!q = −2,  a<sub>1</sub> = 3", ""),
        ("s<sub>18</sub> = 3 · " + U("(−2)<sup>18</sup> − 1", "−2 − 1") + " = −(2<sup>18</sup> − 1)", "Vsota prvih n členov geometrijskega zaporedja."),
        ("!s<sub>18</sub> = 1 − 2<sup>18</sup> = −262 143", ""),
    ],
)

n11 = naloga(
    11, ["funkcije", "diferencialni_racun"], 8,
    r"Pod kolikšnim kotom seka graf funkcije \(f(x) = \dfrac{x - 3}{x^2 + 2}\) abscisno os? Rezultat zaokroži na stotinko stopinje.",
    r"\(\varphi \approx 5{,}19^\circ\)",
    [
        ("f(x) = 0  ⇒  x = 3", "Ničla števca (imenovalec ni nikoli 0)."),
        ("f '(x) = " + U("(x<sup>2</sup> + 2) − (x − 3) · 2x", "(x<sup>2</sup> + 2)<sup>2</sup>") + " = " + U("−x<sup>2</sup> + 6x + 2", "(x<sup>2</sup> + 2)<sup>2</sup>"), "Odvod kvocienta."),
        ("k<sub>t</sub> = f '(3) = " + U("−9 + 18 + 2", "121") + " = " + U("1", "11"), ""),
        ("tan φ = " + U("1", "11"), "Kot med tangento in osjo x."),
        ("!φ ≈ 5,19°", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)


def lik12(X, Y):
    xs = [4 * i / 80 for i in range(81)]
    pot = " ".join(f"{X(x):.1f},{Y(-x * x + 4 * x):.1f}" for x in xs)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.22"/>' + krivulja(X, Y, lambda x: -x * x + 4 * x, -0.4, 4.4, MODRA))

n12 = naloga(
    12, "integralski_racun", 7,
    r"Na sliki je graf funkcije \(f(x) = -x^2 + 4x\). Izračunaj ploščino osenčenega lika med grafom in osjo \(x\)."
    + mreza((-1, 5), (-2, 5), lik12, sirina=220),
    r"\(S = \frac{32}{3}\)",
    [
        ("−x<sup>2</sup> + 4x = 0  ⇒  x = 0, x = 4", "Meji integrala sta ničli."),
        ("S = " + INT("4", "0") + "(−x<sup>2</sup> + 4x) dx = (−" + U("x<sup>3</sup>", "3") + " + 2x<sup>2</sup>)" + MEJA("4", "0"), "Določeni integral."),
        ("= −" + U("64", "3") + " + 32", ""),
        ("!S = " + U("32", "3"), ""),
    ],
    snov=INTS,
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def g_v1(x):
    return 3 * math.sqrt(x) - 6

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 16,
    r"Dana je funkcija \(f(x) = \sqrt{x}\).<br>"
    r"a) Nariši graf funkcije \(g(x) = 3f(x) - 6\). Zapiši definicijsko območje in zalogo vrednosti funkcije \(g\) ter izračunaj njeno ničlo. (4 točke)<br>"
    r"b) V točki \(T(9, y_1)\) položimo normalo na krivuljo \(y = 3\sqrt{x} - 6\). Zapiši enačbo normale. (4 točke)<br>"
    r"c) Naj bo \(h(x) = f(x) + a\), \(a \in \mathbb{R}\). Določi \(a\) tako, da bo ploščina lika med grafom funkcije \(h\) in osjo \(x\) na "
    r"intervalu \([0, 9]\) enaka \(27\). (4 točke)<br>"
    r"d) Naj bo \(u(x) = f(x + b)\), \(b > 0\). Določi \(b\) tako, da bo ploščina lika med grafom funkcije \(u\), osjo \(x\) in osjo \(y\) "
    r"enaka \(18\). (4 točke)",
    r"a) \(D_g = [0, \infty)\), \(Z_g = [-6, \infty)\), ničla \(4\) &nbsp; b) \(y = -2x + 21\) &nbsp; c) \(a = 1\) &nbsp; d) \(b = 9\)",
    [
        ("@slika", graf([(g_v1, MODRA)], (-1, 12), (-7, 5), tocke=[(4, 0, ""), (9, 3, "T")], sirina=300, visina=220)),
        ("!D<sub>g</sub> = [0, ∞),  Z<sub>g</sub> = [−6, ∞)", "Graf korenske funkcije raztegnemo s faktorjem 3 in premaknemo za 6 navzdol."),
        ("3" + K("x") + " = 6  ⇒  " + K("x") + " = 2", ""),
        ("!ničla x = 4", ""),
        ("y<sub>1</sub> = 9 − 6 = 3,  y ' = " + U("3", "2" + K("x")) + ",  y '(9) = " + U("1", "2"), "Odvod korenske funkcije."),
        ("k<sub>n</sub> = −" + U("1", "k<sub>t</sub>") + " = −2", "Normala je pravokotna na tangento."),
        ("!b) y − 3 = −2(x − 9),  y = −2x + 21", ""),
        (INT("9", "0") + "(" + K("x") + " + a) dx = (" + U("2", "3") + "x<sup>3/2</sup> + ax)" + MEJA("9", "0") + " = 18 + 9a", "Integral potence x^{1/2}."),
        ("!c) 18 + 9a = 27  ⇒  a = 1", ""),
        ("S = " + INT("0", "−b") + K("x + b") + " dx = " + U("2", "3") + "(x + b)<sup>3/2</sup>" + MEJA("0", "−b") + " = " + U("2", "3") + "b<sup>3/2</sup>", "Graf u je graf f, premaknjen za b v levo."),
        (U("2", "3") + "b<sup>3/2</sup> = 18  ⇒  b<sup>3/2</sup> = 27", ""),
        ("!d) b = 27<sup>2/3</sup> = 9", ""),
    ],
    snov=FUN + "korenska_razlaga.html",
)

v2 = naloga(
    2, "zaporedja_vrste", 12,
    r"Dana je geometrijska vrsta \(4 - x + \frac{x^2}{4} - \frac{x^3}{16} + \dots\), \(x \in \mathbb{R}\), \(x \ne 0\).<br>"
    r"a) Za katera realna števila \(x\) je vrsta konvergentna? (2 točki)<br>"
    r"b) Izračunaj \(x\), za katerega je vsota vrste enaka \(x + 10\). (3 točke)<br>"
    r"c) Naj bo \(x = -1\). Koliko odstotkov vsote vrste predstavlja vsota prvih petih členov? Rezultat zaokroži na pet mest. (3 točke)<br>"
    r"d) Naj bo \(x = -1\). Kateri členi vrste so manjši od \(10^{-8}\)? (4 točke)",
    r"a) \(x \in (-4, 0) \cup (0, 4)\) &nbsp; b) \(x = -2\) &nbsp; c) \(99{,}902\,\%\) &nbsp; d) členi od \(a_{16}\) naprej",
    [
        ("a<sub>1</sub> = 4,  q = −" + U("x", "4"), "Količnik sosednjih členov."),
        ("|q| < 1  ⇒  |x| < 4", "Konvergenca geometrijske vrste."),
        ("!a) x ∈ (−4, 0) ∪ (0, 4)", ""),
        ("s = " + U("4", "1 + x/4") + " = " + U("16", "4 + x") + " = x + 10", "Vsota neskončne geometrijske vrste."),
        ("(x + 10)(x + 4) = 16  ⇒  x<sup>2</sup> + 14x + 24 = 0  ⇒  x = −2 ali x = −12", ""),
        ("!b) x = −2", "x = −12 ni v območju konvergence."),
        ("x = −1:  q = " + U("1", "4") + ",  s = " + U("16", "3"), ""),
        ("s<sub>5</sub> = 4 · " + U("1 − (1/4)<sup>5</sup>", "1 − 1/4") + " = " + U("16", "3") + " · " + U("1023", "1024"), "Vsota prvih n členov."),
        ("!c) " + U("s<sub>5</sub>", "s") + " = " + U("1023", "1024") + " ≈ 99,902 %", ""),
        ("a<sub>n</sub> = 4 · " + U("1", "4") + "<sup>n − 1</sup> = 4<sup>2 − n</sup> < 10<sup>−8</sup>", ""),
        ("(2 − n) log 4 < −8  ⇒  n > 2 + " + U("8", "log 4") + " ≈ 15,29", "Logaritmiramo; log 4 > 0."),
        ("!d) manjši od 10<sup>−8</sup> so členi a<sub>16</sub>, a<sub>17</sub>, …", ""),
    ],
)


def trikotnik_v3():
    A, B = (20, 130), (230, 130)
    C = (90, 30)
    return svg(260, 150, f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(B[0] + 10, B[1] + 4, "B") + napis(C[0], C[1] - 6, "C")
               + napis(A[0] + 26, A[1] - 8, "α", 12) + napis(B[0] - 30, B[1] - 6, "β", 12)
               + napis(125, 146, "c", 12) + napis(43, 78, "b", 12) + napis(168, 74, "a", 12),
               opis="Trikotnik ABC")


def kota_v3():
    s = 11
    A, C = (20, 110), (20 + 12 * s, 110)
    B, D = (C[0], 110 - 5 * s), (C[0], 110 + 9 * s)
    return svg(200, 220, f'<line x1="{A[0]}" y1="{A[1]}" x2="{C[0]}" y2="{C[1]}" stroke="currentColor" stroke-width="1.5"/>'
               f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]}" y2="{D[1]}" stroke="currentColor" stroke-width="1.5"/>'
               f'<line x1="{A[0]}" y1="{A[1]}" x2="{B[0]}" y2="{B[1]}" stroke="{MODRA}" stroke-width="1.5"/>'
               f'<line x1="{A[0]}" y1="{A[1]}" x2="{D[0]}" y2="{D[1]}" stroke="{RDECA}" stroke-width="1.5"/>'
               f'<rect x="{C[0] - 10}" y="{C[1] - 10}" width="10" height="10" fill="none" stroke="currentColor"/>'
               + napis(A[0] - 10, A[1] + 4, "A") + napis(B[0] + 10, B[1] + 4, "B") + napis(C[0] + 10, C[1] + 4, "C") + napis(D[0] + 10, D[1] + 4, "D")
               + napis(A[0] + 40, A[1] - 6, "ε", 12, MODRA) + napis(A[0] + 40, A[1] + 20, "φ", 12, RDECA),
               opis="Kota ε in φ pri oglišču A")


v3 = naloga(
    3, "geometrijski_liki_telesa", 12,
    r"a) Dokaži, da za trikotnik \(ABC\) na sliki velja \(c = \dfrac{b \sin(\alpha + \beta)}{\sin \beta}\). (3 točke)" + trikotnik_v3()
    + r"b) Izračunaj stranico \(c\) v trikotniku s podatki \(a = 50\), \(b = 40\) in \(\beta = 45^\circ\) (poišči obe možni rešitvi). (5 točk)<br>"
    r"c) Izračunaj točno vrednost \(\cos(\varepsilon + \varphi)\), če sta \(\varepsilon\) in \(\varphi\) kota na spodnji sliki, \(|AC| = 12\), "
    r"\(|BC| = 5\), \(|CD| = 9\), daljici \(AC\) in \(BD\) pa sta pravokotni. (4 točke)" + kota_v3(),
    r"b) \(c_1 \approx 54{,}06\), \(c_2 \approx 16{,}65\) &nbsp; c) \(\frac{33}{65}\)",
    [
        (U("c", "sin γ") + " = " + U("b", "sin β") + "  ⇒  c = " + U("b sin γ", "sin β"), "Sinusni izrek."),
        ("!a) γ = 180° − (α + β)  ⇒  sin γ = sin(α + β)", "sin(180° − x) = sin x."),
        ("40<sup>2</sup> = 50<sup>2</sup> + c<sup>2</sup> − 2 · 50 · c · cos 45°", "Kosinusni izrek za stranico b."),
        ("c<sup>2</sup> − 50" + K("2") + " c + 900 = 0", ""),
        ("c = " + U("50" + K("2") + " ± " + K("5000 − 3600"), "2"), ""),
        ("!b) c<sub>1</sub> ≈ 54,06,  c<sub>2</sub> ≈ 16,65", "Ker je a > b, sta možna dva trikotnika (α ≈ 62,11° ali α ≈ 117,89°)."),
        ("|AB| = " + K("144 + 25") + " = 13,  |AD| = " + K("144 + 81") + " = 15", "Pitagorov izrek v trikotnikih ABC in ACD."),
        ("cos ε = " + U("12", "13") + ",  sin ε = " + U("5", "13") + ",  cos φ = " + U("12", "15") + " = " + U("4", "5") + ",  sin φ = " + U("3", "5"), "Kotne funkcije v pravokotnem trikotniku."),
        ("cos(ε + φ) = cos ε cos φ − sin ε sin φ = " + U("48", "65") + " − " + U("15", "65"), "Adicijski izrek."),
        ("!c) cos(ε + φ) = " + U("33", "65"), ""),
    ],
)

POLA2 = [v1, v2, v3]
