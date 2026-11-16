# Spomladanski rok 2005 (uradne pole RIC: m051-401-1-1, m051-402-1-1, m051-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2005, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "pravokotni_koordinatni_sistem_ravnina", 7,
    r"Zapiši enačbo premice \(p\), ki poteka skozi točko \(A(2, 1)\) in je vzporedna premici \(3x - y + 5 = 0\). Zapiši presečišče premice \(p\) "
    r"z ordinatno osjo.",
    r"\(y = 3x - 5\), \((0, -5)\)",
    [
        ("dana premica: y = 3x + 5,  k = 3", "Vzporedni premici imata enaka smerna koeficienta."),
        ("y − 1 = 3(x − 2)", "Enačba premice skozi točko z danim smernim koeficientom."),
        ("!p: y = 3x − 5", ""),
        ("!presečišče z osjo y: (0, −5)", "Pri x = 0."),
    ],
)


def trikotnik2():
    k = 40
    C, B = (30, 130), (30, 130 - 2 * math.sqrt(3) * k)
    A = (30 + 2 * k, 130)
    return svg(160, 150, f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]:.1f} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>'
               f'<rect x="{C[0]}" y="{C[1] - 10}" width="10" height="10" fill="none" stroke="currentColor"/>'
               + napis(A[0] + 10, A[1] + 4, "A") + napis(B[0] - 10, B[1] + 4, "B") + napis(C[0] - 10, C[1] + 4, "C")
               + napis(C[0] - 18, (B[1] + C[1]) / 2, "a", 12) + napis((A[0] + C[0]) / 2, C[1] + 15, "b", 12) + napis(80, 60, "c", 12)
               + napis(A[0] - 14, A[1] - 6, "α", 11) + napis(B[0] + 7, B[1] + 26, "β", 11),
               opis="Pravokotni trikotnik ABC")

n2 = naloga(
    2, "geometrijski_liki_telesa", 6,
    r"V pravokotnem trikotniku \(ABC\) s pravim kotom pri \(C\) merita stranici \(a = 2\sqrt{3}\ \mathrm{cm}\) in \(c = 4\ \mathrm{cm}\). "
    r"Natančno izračunaj stranico \(b\) ter kota \(\alpha\) in \(\beta\). Nariši skico.",
    r"\(b = 2\ \mathrm{cm}\), \(\alpha = 60^\circ\), \(\beta = 30^\circ\)",
    [
        ("@slika", trikotnik2()),
        ("!b = " + K("c<sup>2</sup> − a<sup>2</sup>") + " = " + K("16 − 12") + " = 2 cm", "Pitagorov izrek; c je hipotenuza."),
        ("sin α = " + U("a", "c") + " = " + U(K("3"), "2"), "Kotne funkcije v pravokotnem trikotniku."),
        ("!α = 60°,  β = 90° − 60° = 30°", ""),
    ],
)

n3 = naloga(
    3, "zaporedja_vrste", 6,
    r"Dano je aritmetično zaporedje \(4, 9, 14, \dots\) Izračunaj tisoči člen in vsoto prvih tisoč členov.",
    r"\(a_{1000} = 4999\), \(s_{1000} = 2\,501\,500\)",
    [
        ("a<sub>1</sub> = 4,  d = 5", ""),
        ("!a<sub>1000</sub> = 4 + 999 · 5 = 4999", "Splošni člen aritmetičnega zaporedja."),
        ("!s<sub>1000</sub> = " + U("1000", "2") + "(4 + 4999) = 2 501 500", "Vsota prvih n členov."),
    ],
)

n4 = naloga(
    4, "funkcije", 5,
    r"Pokaži, da velja \(\dfrac{1 - \cos 2x}{\sin 2x} = \tan x\) za vsak \(x \ne \frac{k\pi}{2}\), \(k \in \mathbb{Z}\).",
    r"Leva stran se poenostavi v \(\tan x\).",
    [
        ("1 − cos 2x = 1 − (1 − 2 sin<sup>2</sup> x) = 2 sin<sup>2</sup> x", "Kosinus dvojnega kota."),
        ("sin 2x = 2 sin x cos x", "Sinus dvojnega kota."),
        (U("2 sin<sup>2</sup> x", "2 sin x cos x") + " = " + U("sin x", "cos x"), "Okrajšamo (sin x ≠ 0)."),
        ("!= tan x", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n5 = naloga(
    5, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Gobar ima v košari lisičke, jurčke in mavrahe. Dve tretjini vseh gob je lisičk, \(25\,\%\) je jurčkov, mavrahi pa so trije. Koliko gob "
    r"ima v košari?",
    r"\(36\)",
    [
        (U("2", "3") + "x + " + U("1", "4") + "x + 3 = x", "x je število vseh gob."),
        (U("x", "12") + " = 3", "2/3 + 1/4 = 11/12."),
        ("!x = 36 gob", "24 lisičk, 9 jurčkov in 3 mavrahi."),
    ],
)

n6 = naloga(
    6, "algebrski_izrazi_enacbe_neenacbe", 8,
    r"Reši kvadratno enačbo \(x^2 + ax - a = 0\) za \(a = 4\). Rešitvi zapiši točno in poenostavi. Pri katerih \(a \in \mathbb{R}\) ima enačba "
    r"eno samo rešitev?",
    r"\(x = -2 \pm 2\sqrt{2}\); \(a = 0\) ali \(a = -4\)",
    [
        ("x<sup>2</sup> + 4x − 4 = 0:  x = " + U("−4 ± " + K("16 + 16"), "2"), "Formula za rešitve kvadratne enačbe."),
        ("!x<sub>1,2</sub> = −2 ± 2" + K("2"), "√32 = 4√2."),
        ("D = a<sup>2</sup> + 4a = 0", "Ena sama rešitev: diskriminanta je 0."),
        ("!a = 0  ali  a = −4", ""),
    ],
)

n7 = naloga(
    7, "stevilske_mnozice", 7,
    r"Katero kompleksno število \(z\) zadošča enačbi \((2 - i)z = 3 - 9i\)? Zapiši \(\mathrm{Re}\,z\) in \(\mathrm{Im}\,z\) ter izračunaj "
    r"\(|z|\). Vrednost \(|z|\) delno koreni.",
    r"\(z = 3 - 3i\), \(|z| = 3\sqrt{2}\)",
    [
        ("z = " + U("3 − 9i", "2 − i") + " = " + U("(3 − 9i)(2 + i)", "5") + " = " + U("6 + 3i − 18i + 9", "5"), "Razširimo s konjugirano vrednostjo."),
        ("!z = 3 − 3i:  Re z = 3,  Im z = −3", ""),
        ("!|z| = " + K("18") + " = 3" + K("2"), ""),
    ],
)

n8 = naloga(
    8, "vektorji_ravnina_prostor", 8,
    r"Dane so točke \(A(1, 2)\), \(B(5, 4)\) in \(C(-1, 3)\). Zapiši vektorja \(\overrightarrow{AB}\) in \(\overrightarrow{AC}\) s komponentami, "
    r"izračunaj njun skalarni produkt in kot med njima.",
    r"\(\overrightarrow{AB} = (4, 2)\), \(\overrightarrow{AC} = (-2, 1)\), produkt \(-6\), kot \(\approx 126{,}87^\circ\)",
    [
        ("!" + V("AB") + " = (4, 2),  " + V("AC") + " = (−2, 1)", "Končna točka minus začetna."),
        ("!" + V("AB") + " · " + V("AC") + " = −8 + 2 = −6", ""),
        ("|" + V("AB") + "| = " + K("20") + ",  |" + V("AC") + "| = " + K("5"), ""),
        ("cos φ = " + U("−6", K("100")) + " = −0,6", "Kot med vektorjema."),
        ("!φ ≈ 126,87°", ""),
    ],
)

n9 = naloga(
    9, "stoznice", 7,
    r"Zapiši enačbo elipse s središčem v izhodišču, ki ima teme \(T(0, 2)\) in gorišče \(F(\sqrt{5}, 0)\). Nariši jo.",
    r"\(\frac{x^2}{9} + \frac{y^2}{4} = 1\)",
    [
        ("b = 2,  e = " + K("5"), "Gorišče leži na osi x, zato je velika os na osi x."),
        ("a<sup>2</sup> = b<sup>2</sup> + e<sup>2</sup> = 9  ⇒  a = 3", "Pri elipsi velja e² = a² − b²."),
        ("!" + U("x<sup>2</sup>", "9") + " + " + U("y<sup>2</sup>", "4") + " = 1", ""),
        ("@slika", mreza((-4, 4), (-3, 3), lambda X, Y: parametricna(X, Y, lambda t: 3 * math.cos(t), lambda t: 2 * math.sin(t), 0, 2 * math.pi, MODRA)
                         + tocka(X, Y, math.sqrt(5), 0, "F", dy=14) + tocka(X, Y, -math.sqrt(5), 0, "") + tocka(X, Y, 0, 2, "T"), sirina=220)),
    ],
)

n10 = naloga(
    10, "funkcije", 7,
    r"Poenostavi izraz \(\log_3 a + \log_3 9a - \log_3 \sqrt{3} - \log_3 3a^2\), \(a > 0\).",
    r"\(\frac{1}{2}\)",
    [
        ("log<sub>3</sub> " + U("a · 9a", K("3") + " · 3a<sup>2</sup>"), "Vsota logaritmov je logaritem produkta, razlika logaritem kvocienta."),
        ("= log<sub>3</sub> " + U("3", K("3")) + " = log<sub>3</sub> " + K("3"), ""),
        ("!= " + U("1", "2"), "√3 = 3^{1/2}."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n11 = naloga(
    11, "verjetnostni_racun", 6,
    r"V skupini je \(12\) deklet in \(8\) fantov. Vozniško dovoljenje imajo \(4\) dekleta in \(6\) fantov. Naključno izberemo enega fanta in "
    r"eno dekle. Kolikšna je verjetnost, da ima vsaj eden od njiju vozniško dovoljenje?",
    r"\(\frac{5}{6}\)",
    [
        ("P(dekle nima) = " + U("8", "12") + ",  P(fant nima) = " + U("2", "8"), "Izbiri sta neodvisni."),
        ("P(nihče nima) = " + U("8", "12") + " · " + U("2", "8") + " = " + U("1", "6"), "Nasprotni dogodek."),
        ("!P = 1 − " + U("1", "6") + " = " + U("5", "6") + " ≈ 0,83", ""),
    ],
)

n12 = naloga(
    12, ["funkcije", "diferencialni_racun"], 8,
    r"Izračunaj presečišči krivulj \(y = \dfrac{x + 3}{x - 1}\) in \(y = 3x - 6\) ter kot med njima v vsakem presečišču.",
    r"\((3, 3)\), kot \(\approx 63{,}43^\circ\); \(\left(\frac{1}{3}, -5\right)\), kot \(\approx 24{,}78^\circ\)",
    [
        ("x + 3 = (3x − 6)(x − 1)  ⇒  3x<sup>2</sup> − 10x + 3 = 0", "Odpravimo ulomek (x ≠ 1)."),
        ("!x = 3 ⇒ (3, 3);  x = " + U("1", "3") + " ⇒ (" + U("1", "3") + ", −5)", ""),
        ("y ' = " + U("(x − 1) − (x + 3)", "(x − 1)<sup>2</sup>") + " = −" + U("4", "(x − 1)<sup>2</sup>"), "Odvod kvocienta."),
        ("v (3, 3): k<sub>1</sub> = −1, k<sub>2</sub> = 3,  tan φ = |" + U("3 + 1", "1 − 3") + "| = 2", "Kot med tangentama."),
        ("!φ<sub>1</sub> ≈ 63,43°", ""),
        ("v (" + U("1", "3") + ", −5): k<sub>1</sub> = −9, k<sub>2</sub> = 3,  tan φ = |" + U("3 + 9", "1 − 27") + "| = " + U("6", "13"), ""),
        ("!φ<sub>2</sub> ≈ 24,78°", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]


# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def slika_v1(X, Y):
    x0 = math.log(3) / 2
    xs = [x0 * i / 40 for i in range(41)]
    pot = " ".join(f"{X(x):.1f},{Y(3 * math.exp(-x)):.1f}" for x in xs) + " " + " ".join(f"{X(x):.1f},{Y(math.exp(x)):.1f}" for x in reversed(xs))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.3"/>'
            + krivulja(X, Y, math.exp, -2, 1.6, RDECA) + krivulja(X, Y, lambda x: 3 * math.exp(-x), -0.5, 2, MODRA)
            + tocka(X, Y, x0, math.sqrt(3), "P")
            + f'<text x="{X(1.3):.1f}" y="{Y(4.3):.1f}" font-size="12" fill="{RDECA}">f</text>'
            + f'<text x="{X(1.6):.1f}" y="{Y(0.95):.1f}" font-size="12" fill="{MODRA}">g</text>')

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 15,
    r"Dani sta funkciji \(f(x) = e^x\) in \(g(x) = 3e^{-x}\).<br>"
    r"a) Skiciraj grafa funkcij. Izračunaj kot med grafom funkcije \(g\) in ordinatno osjo na kotne minute. (6 točk)<br>"
    r"b) Izračunaj točni koordinati presečišča grafov. (3 točke)<br>"
    r"c) Lik \(L\) v prvem kvadrantu omejujejo grafa funkcij in ordinatna os. Pokaži, da je ploščina lika \(4 - 2\sqrt{3}\). (3 točke)<br>"
    r"d) Poišči inverzno funkcijo \(g^{-1}\). Pokaži, da je \((g^{-1} \circ f)(x) = \ln 3 - x\). (3 točke)",
    r"a) \(18^\circ 26'\) &nbsp; b) \(P\left(\frac{1}{2}\ln 3, \sqrt{3}\right)\) &nbsp; d) \(g^{-1}(x) = \ln 3 - \ln x\)",
    [
        ("@slika", mreza((-2, 2.2), (-0.5, 5), slika_v1, sirina=260, visina=260, oznake=False)),
        ("g '(x) = −3e<sup>−x</sup>,  g '(0) = −3", "Graf g seka os y v točki (0, 3)."),
        ("tangenta oklepa z osjo x kot arctan 3 ≈ 71,57°", ""),
        ("!a) kot z osjo y: 90° − 71,57° ≈ 18,43° ≈ 18°26'", "Osi sta pravokotni."),
        ("e<sup>x</sup> = 3e<sup>−x</sup>  ⇒  e<sup>2x</sup> = 3  ⇒  x = " + U("1", "2") + " ln 3", ""),
        ("!b) P(" + U("1", "2") + " ln 3, " + K("3") + ")", "e^{(ln 3)/2} = √3."),
        ("S = " + INT("½ ln 3", "0") + "(3e<sup>−x</sup> − e<sup>x</sup>) dx = (−3e<sup>−x</sup> − e<sup>x</sup>)" + MEJA("½ ln 3", "0"), "Na tem intervalu je g nad f."),
        ("= (−" + U("3", K("3")) + " − " + K("3") + ") − (−3 − 1)", "e^{−(ln 3)/2} = 1/√3."),
        ("!c) S = 4 − 2" + K("3"), "3/√3 = √3."),
        ("y = 3e<sup>−x</sup>  ⇒  −x = ln " + U("y", "3") + "  ⇒  x = ln 3 − ln y", "Izrazimo x in zamenjamo vlogi."),
        ("!d) g<sup>−1</sup>(x) = ln 3 − ln x,  g<sup>−1</sup>(e<sup>x</sup>) = ln 3 − x", "ln eˣ = x."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

v2 = naloga(
    2, "vektorji_ravnina_prostor", 12,
    r"V prostoru so dane točke \(A(2, t, -3)\), \(B(t, 5, -1)\) in \(C(4, 7, -4)\). Njihove krajevne vektorje označimo z \(\vec{a}\), \(\vec{b}\) in \(\vec{c}\).<br>"
    r"a) Za kateri vrednosti \(t\) je dolžina vektorja \(\vec{d} = \vec{a} + \vec{b}\) enaka \(9\)? (4 točke)<br>"
    r"b) Izračunaj \(t\), da bo trikotnik \(ABC\) pravokoten s pravim kotom pri \(C\). (4 točke)<br>"
    r"c) Naj bo \(t = 2\). Pokaži, da tedaj vektorji \(\vec{a}\), \(\vec{b}\) in \(\vec{c}\) ležijo v isti ravnini. (4 točke)",
    r"a) \(t = 2\), \(t = -9\) &nbsp; b) \(t = \frac{25}{4}\) &nbsp; c) \(\vec{c} = \vec{a} + \vec{b}\)",
    [
        (V("a") + " + " + V("b") + " = (2 + t, t + 5, −4)", ""),
        ("(t + 2)<sup>2</sup> + (t + 5)<sup>2</sup> + 16 = 81  ⇒  t<sup>2</sup> + 7t − 18 = 0", "Kvadrat dolžine vektorja."),
        ("!a) t = 2  ali  t = −9", ""),
        (V("CA") + " = (−2, t − 7, 1),  " + V("CB") + " = (t − 4, −2, 3)", ""),
        (V("CA") + " · " + V("CB") + " = −2t + 8 − 2t + 14 + 3 = 25 − 4t = 0", "Pravi kot pri C: skalarni produkt je 0."),
        ("!b) t = " + U("25", "4"), ""),
        (V("a") + " = (2, 2, −3),  " + V("b") + " = (2, 5, −1),  " + V("a") + " + " + V("b") + " = (4, 7, −4)", ""),
        ("!c) " + V("c") + " = " + V("a") + " + " + V("b") + ", zato so vektorji komplanarni", "Vektor, ki je linearna kombinacija dveh vektorjev, leži v njuni ravnini."),
    ],
)


def krog_v3():
    r, cx, cy = 70, 100, 95
    M = (cx - r / math.sqrt(2), cy - r / math.sqrt(2))
    N = (cx + r / math.sqrt(2), cy - r / math.sqrt(2))
    Pk = math.radians(250)
    t = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{M[0]:.1f},{M[1]:.1f} {N[0]:.1f},{N[1]:.1f} {cx + r},{cy} {cx - r},{cy}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}"/>',
         f'<line x1="{M[0]:.1f}" y1="{M[1]:.1f}" x2="{cx}" y2="{cy}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<line x1="{N[0]:.1f}" y1="{N[1]:.1f}" x2="{cx}" y2="{cy}" stroke="currentColor" stroke-dasharray="3 3"/>',
         napis(M[0] - 8, M[1] - 4, "M"), napis(N[0] + 8, N[1] - 4, "N"), napis(cx, cy + 15, "S"), f'<circle cx="{cx}" cy="{cy}" r="2.5" fill="currentColor"/>']
    return svg(200, 175, "".join(t), opis="Krog s tetivo MN in trapezom")

v3 = naloga(
    3, "geometrijski_liki_telesa", 13,
    r"V krogu s središčem \(S\) in polmerom \(4\ \mathrm{cm}\) je tetiva \(MN\) dolga \(4\sqrt{2}\ \mathrm{cm}\).<br>"
    r"a) Izračunaj središčni kot \(\varphi = \angle MSN\). (2 točki)<br>"
    r"b) Izračunaj točno ploščino trapeza, ki ima za osnovnici tetivo \(MN\) in premer kroga, vzporeden tetivi. (2 točki)<br>"
    r"c) Koliko odstotkov ploščine kroga predstavlja manjši krožni odsek, ki ga določa tetiva \(MN\)? (4 točke)<br>"
    r"d) Točka \(P\) je tretje oglišče trikotnika \(MNP\), včrtanega krogu, kot \(\angle MPN\) je oster, stranici \(MP\) in \(NP\) pa sta v "
    r"razmerju \(2 : 1\). Izračunaj kot \(\angle MPN\) ter stranici \(MP\) in \(NP\). (5 točk)",
    r"a) \(90^\circ\) &nbsp; b) \(8 + 8\sqrt{2}\ \mathrm{cm^2}\) &nbsp; c) \(\approx 9{,}08\,\%\) &nbsp; d) \(45^\circ\), \(|MP| \approx 7{,}68\ \mathrm{cm}\), \(|NP| \approx 3{,}84\ \mathrm{cm}\)",
    [
        ("sin " + U("φ", "2") + " = " + U("2" + K("2"), "4") + " = " + U(K("2"), "2"), "Polovica tetive, polmer in višina tvorijo pravokotni trikotnik."),
        ("!a) φ = 90°", ""),
        ("@slika", krog_v3()),
        ("razdalja tetive od središča: v = " + K("16 − 8") + " = 2" + K("2"), ""),
        ("!b) S = " + U("8 + 4" + K("2"), "2") + " · 2" + K("2") + " = 8" + K("2") + " + 8 cm<sup>2</sup>", "Osnovnici sta premer (8) in tetiva; višina je razdalja med njima."),
        ("odsek = izsek − trikotnik = " + U("π · 16", "4") + " − " + U("4 · 4", "2") + " = 4π − 8 ≈ 4,57 cm<sup>2</sup>", "Izsek s kotom 90° je četrtina kroga."),
        ("!c) " + U("4π − 8", "16π") + " ≈ 9,08 %", ""),
        ("∢MPN = " + U("φ", "2") + " = 45°", "Obodni kot je polovica središčnega (P na večjem loku, ker je kot oster)."),
        ("|NP| = x, |MP| = 2x:  32 = 4x<sup>2</sup> + x<sup>2</sup> − 4x<sup>2</sup> cos 45°", "Kosinusni izrek v trikotniku MNP."),
        ("x<sup>2</sup> = " + U("32", "5 − 2" + K("2")) + " ≈ 14,74", ""),
        ("!d) ∢MPN = 45°,  |NP| ≈ 3,84 cm,  |MP| ≈ 7,68 cm", ""),
    ],
)

POLA2 = [v1, v2, v3]
