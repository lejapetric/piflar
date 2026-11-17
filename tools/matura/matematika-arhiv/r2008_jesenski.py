# Jesenski rok 2008 (uradne pole RIC: m082-401-1-1, m082-402-1-1, m082-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2008, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
INTS = "/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html"
ZELENA = "#2a9d4b"
ZLATA = "#B8860B"


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "zaporedja_vrste", 6,
    r"Zapiši prvih deset členov aritmetičnega zaporedja s prvim členom \(3\) in diferenco \(4\). Koliko odstotkov teh desetih števil je "
    r"deljivih s \(3\) in koliko odstotkov je praštevil?",
    r"\(3, 7, 11, 15, 19, 23, 27, 31, 35, 39\); \(40\,\%\) deljivih s \(3\), \(60\,\%\) praštevil",
    [
        ("!3, 7, 11, 15, 19, 23, 27, 31, 35, 39", "Vsak naslednji člen je za 4 večji."),
        ("deljiva s 3: 3, 15, 27, 39", "Vsota števk je deljiva s 3."),
        ("!" + U("4", "10") + " = 40 %", ""),
        ("praštevila: 3, 7, 11, 19, 23, 31", "15, 27, 35 in 39 so sestavljena števila."),
        ("!" + U("6", "10") + " = 60 %", ""),
    ],
)


def premici2(X, Y):
    return (krivulja(X, Y, lambda x: 2 * x - 1, -1, 3.5, MODRA) + krivulja(X, Y, lambda x: (8 - x) / 2, -2, 6, RDECA)
            + tocka(X, Y, 2, 3, "T"))

n2 = naloga(
    2, "pravokotni_koordinatni_sistem_ravnina", 7,
    r"Nariši premici \(2x - y - 1 = 0\) in \(x + 2y - 8 = 0\) ter izračunaj njuno presečišče.",
    r"\(T(2, 3)\)",
    [
        ("y = 2x − 1  in  y = −" + U("1", "2") + "x + 4", "Eksplicitna oblika: začetna vrednost in smerni koeficient."),
        ("@slika", mreza((-2, 6), (-3, 6), premici2, sirina=240)),
        ("x + 2(2x − 1) − 8 = 0  ⇒  5x = 10", "Rešimo sistem z zamenjavo."),
        ("!T(2, 3)", ""),
    ],
)

n3 = naloga(
    3, "stevilske_mnozice", 6,
    r"Reši enačbo \(x^2 + 6x + 13 = 0\) in rešitvi nariši v kompleksni ravnini.",
    r"\(x_{1,2} = -3 \pm 2i\)",
    [
        ("D = 36 − 52 = −16", "Negativna diskriminanta: rešitvi sta konjugirani kompleksni števili."),
        ("x<sub>1,2</sub> = " + U("−6 ± 4i", "2"), "√(−16) = 4i."),
        ("!x<sub>1,2</sub> = −3 ± 2i", ""),
        ("@slika", mreza((-5, 2), (-3, 3), lambda X, Y: tocka(X, Y, -3, 2, "−3 + 2i") + tocka(X, Y, -3, -2, "−3 − 2i"), sirina=220)),
    ],
)

n4 = naloga(
    4, "diferencialni_racun", 7,
    r"Zapiši enačbi tangente in normale na graf funkcije \(f(x) = x^3 - 2x^2\) v točki \(A(-1, y_0)\).",
    r"\(t\colon y = 7x + 4\), \(n\colon y = -\frac{1}{7}x - \frac{22}{7}\)",
    [
        ("y<sub>0</sub> = −1 − 2 = −3", ""),
        ("f '(x) = 3x<sup>2</sup> − 4x,  k<sub>t</sub> = f '(−1) = 7", "Smerni koeficient tangente je odvod v točki."),
        ("!tangenta: y + 3 = 7(x + 1),  y = 7x + 4", ""),
        ("k<sub>n</sub> = −" + U("1", "7"), "Normala je pravokotna na tangento."),
        ("!normala: y + 3 = −" + U("1", "7") + "(x + 1),  y = −" + U("1", "7") + "x − " + U("22", "7"), ""),
    ],
)


def f5(x):
    return (2 * x - 4) / (x - 1)

n5 = naloga(
    5, "funkcije", 7,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{2x - 4}{x - 1}\). Zapiši definicijsko območje, ničlo, enačbi navpične in vodoravne "
    r"asimptote ter presečišče grafa z ordinatno osjo in nariši graf.",
    r"\(D_f = \mathbb{R} \setminus \{1\}\), ničla \(2\), \(x = 1\), \(y = 2\), \((0, 4)\)",
    [
        ("!D<sub>f</sub> = ℝ \\ {1}", "Imenovalec ne sme biti 0."),
        ("!ničla x = 2,  pol x = 1 (navpična asimptota)", "Ničla števca; ničla imenovalca."),
        ("!vodoravna asimptota y = 2", "Stopnji števca in imenovalca sta enaki: količnik vodilnih koeficientov."),
        ("!f(0) = 4:  presečišče (0, 4)", ""),
        ("@slika", graf([(f5, MODRA), (lambda x: 2, "#8a8a8a")], (-5, 6), (-4, 8), tocke=[(2, 0, ""), (0, 4, "")], sirina=260, visina=260)),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n6 = naloga(
    6, ["kombinatorika", "verjetnostni_racun"], 6,
    r"Med štirimi knjigami, petimi igračami in tremi škatlami čokoladnih bonbonov naključno izberemo tri darila. Izračunaj verjetnost, "
    r"da smo izbrali eno knjigo, eno igračo in eno škatlo bonbonov.",
    r"\(\frac{3}{11}\)",
    [
        ("n = " + BINOM("12", "3") + " = 220", "Vseh izbir treh daril izmed 12."),
        ("m = 4 · 5 · 3 = 60", "Pravilo produkta."),
        ("!P = " + U("60", "220") + " = " + U("3", "11") + " ≈ 0,273", ""),
    ],
)


def risba7(kaj):
    def r(X, Y):
        if kaj == "a":
            pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((3, 0), (0, 3), (-3, 0), (0, -3), (3, 0)))
            return f'<polyline points="{pot}" fill="none" stroke="{MODRA}" stroke-width="2"/>'
        if kaj == "b":
            return krivulja(X, Y, lambda x: x * x - 3, -2.6, 2.6, MODRA)
        if kaj == "c":
            return parametricna(X, Y, lambda t: 3 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * math.pi, MODRA)
        return "".join(parametricna(X, Y, lambda u: 2 * math.sinh(u), lambda u, z=z: z * 2 * math.cosh(u), -1.1, 1.1, MODRA) for z in (1, -1)) + \
            "".join(f'<line x1="{X(-4):.1f}" y1="{Y(-4 * k):.1f}" x2="{X(4):.1f}" y2="{Y(4 * k):.1f}" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 3"/>' for k in (1, -1))
    return mreza((-4, 4), (-4, 4), r, sirina=150)

n7 = naloga(
    7, ["pravokotni_koordinatni_sistem_ravnina", "stoznice"], 8,
    r"V koordinatne sisteme nariši množice točk, ki ustrezajo pogojem: a) \(|x| + |y| = 3\), b) \(x^2 - y = 3\), c) \(x^2 + y^2 = 9\), "
    r"d) \(y^2 - x^2 = 4\).",
    r"a) kvadrat z oglišči \((\pm 3, 0)\), \((0, \pm 3)\); b) parabola \(y = x^2 - 3\); c) krožnica s polmerom \(3\); d) hiperbola s temenoma \((0, \pm 2)\)",
    [
        ("a) v vsakem kvadrantu daljica, npr. x + y = 3 za x, y ≥ 0", "Absolutno vrednost obravnavamo po kvadrantih."),
        ("@slika", risba7("a")),
        ("b) y = x<sup>2</sup> − 3: parabola s temenom (0, −3)", "Premik normalne parabole."),
        ("@slika", risba7("b")),
        ("c) krožnica s središčem v izhodišču in polmerom 3", ""),
        ("@slika", risba7("c")),
        ("d) " + U("y<sup>2</sup>", "4") + " − " + U("x<sup>2</sup>", "4") + " = 1: hiperbola s temenoma (0, ±2), asimptoti y = ±x", "Realna os hiperbole je os y."),
        ("@slika", risba7("d")),
    ],
)

n8 = naloga(
    8, "funkcije", 8,
    r"Reši enačbo \(\cos(\pi - x) + \sin^2 x = 1\).",
    r"\(x = \frac{\pi}{2} + k\pi\), \(x = \pi + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("cos(π − x) = −cos x,  sin<sup>2</sup> x = 1 − cos<sup>2</sup> x", "Adicijski izrek; osnovna zveza."),
        ("−cos x + 1 − cos<sup>2</sup> x = 1  ⇒  cos x (1 + cos x) = 0", ""),
        ("cos x = 0  ali  cos x = −1", ""),
        ("!x = " + U("π", "2") + " + kπ,  x = π + 2kπ, k ∈ ℤ", "Enačbe s kotnimi funkcijami."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, "geometrijski_liki_telesa", 6,
    r"Osnovna ploskev pokončne prizme je romb z diagonalama \(e = 12\ \mathrm{cm}\) in \(f = 16\ \mathrm{cm}\). Diagonala stranske ploskve meri "
    r"\(26\ \mathrm{cm}\). Izračunaj površino prizme.",
    r"\(P = 1152\ \mathrm{cm^2}\)",
    [
        ("a = " + K("6<sup>2</sup> + 8<sup>2</sup>") + " = 10 cm", "Diagonali romba se razpolavljata pod pravim kotom."),
        ("v = " + K("26<sup>2</sup> − 10<sup>2</sup>") + " = 24 cm", "Stranska ploskev je pravokotnik a × v."),
        ("O = " + U("e · f", "2") + " = 96 cm<sup>2</sup>,  pl = 4 · a · v = 960 cm<sup>2</sup>", "Ploščina romba; plašč so štirje pravokotniki."),
        ("!P = 2 · 96 + 960 = 1152 cm<sup>2</sup>", "Površina prizme."),
    ],
)


def trapez10(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((0, 0), (8, 0), (5, 4), (0, 4)))
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.1" stroke="{MODRA}" stroke-width="1.5"/>'
            + f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(5):.1f}" y2="{Y(4):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>'
            + tocka(X, Y, 0, 0, "A", dx=-14, dy=14) + tocka(X, Y, 8, 0, "B", dy=14) + tocka(X, Y, 5, 4, "C") + tocka(X, Y, 0, 4, "D", dx=-14))

n10 = naloga(
    10, "vektorji_ravnina_prostor", 7,
    r"Točke \(A(0, 0)\), \(B(8, 0)\), \(C(5, 4)\) in \(D(0, 4)\) so oglišča trapeza. Nariši ga. Izračunaj točno dolžino stranice "
    r"\(b = |BC|\), točen skalarni produkt \(\overrightarrow{AB} \cdot \overrightarrow{AC}\) in velikost kota \(\beta = \angle ABC\), "
    r"zaokroženo na minute.",
    r"\(b = 5\), \(\overrightarrow{AB} \cdot \overrightarrow{AC} = 40\), \(\beta \approx 53^\circ 8'\)",
    [
        ("@slika", mreza((-1, 9), (-1, 5), trapez10, sirina=280)),
        ("!b = " + K("(5 − 8)<sup>2</sup> + 4<sup>2</sup>") + " = 5", "Razdalja med točkama."),
        ("!" + V("AB") + " · " + V("AC") + " = (8, 0) · (5, 4) = 40", "Skalarni produkt po komponentah."),
        ("cos β = " + U(V("BA") + " · " + V("BC"), "|BA| · |BC|") + " = " + U("(−8, 0) · (−3, 4)", "8 · 5") + " = " + U("24", "40") + " = 0,6", "Kot med vektorjema z začetkom v B."),
        ("!β ≈ 53,13° ≈ 53°8'", ""),
    ],
)


def logi11(vse):
    def r(X, Y):
        t = krivulja(X, Y, lambda x: math.log(x, 3), 0.06, 10, MODRA) + tocka(X, Y, 3, 1, "(3, 1)", dx=4, dy=-6)
        if vse:
            t += krivulja(X, Y, lambda x: math.log(x + 3, 3), -2.94, 10, RDECA) + krivulja(X, Y, lambda x: math.log(x, 3) - 2, 0.12, 10, ZELENA)
            t += (f'<text x="{X(8.2):.1f}" y="{Y(2.6):.1f}" font-size="11" fill="{RDECA}">g</text>'
                  f'<text x="{X(8.5):.1f}" y="{Y(1.35):.1f}" font-size="11" fill="{MODRA}">f</text>'
                  f'<text x="{X(8.5):.1f}" y="{Y(-0.65):.1f}" font-size="11" fill="{ZELENA}">h</text>')
        return t
    return mreza((-4, 10), (-4, 3), r, sirina=320)

n11 = naloga(
    11, "funkcije", 6,
    r"V koordinatnem sistemu je narisan graf logaritemske funkcije \(f(x) = \log_a x\). Zapiši osnovo logaritma. V isti koordinatni sistem "
    r"nariši še grafa funkcij \(g(x) = \log_a(x + 3)\) in \(h(x) = \log_a x - 2\) in ju nedvoumno označi." + logi11(False),
    r"\(a = 3\)",
    [
        ("graf poteka skozi (3, 1):  log<sub>a</sub> 3 = 1", "log_a a = 1."),
        ("!a = 3", ""),
        ("g: graf f premaknemo za 3 v levo (asimptota x = −3)", "f(x + 3) premakne graf vzdolž osi x."),
        ("h: graf f premaknemo za 2 navzdol", "f(x) − 2 premakne graf vzdolž osi y."),
        ("@slika", logi11(True)),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n12 = naloga(
    12, "integralski_racun", 6,
    r"Izračunaj pozitivno realno število \(a\) tako, da bo ploščina lika, ki ga graf funkcije \(f(x) = a\cos x\) oklepa z osjo \(x\) na "
    r"intervalu \(\left[0, \frac{\pi}{6}\right]\), enaka \(3\).",
    r"\(a = 6\)",
    [
        ("S = " + INT("π/6", "0") + "a cos x dx = a sin x" + MEJA("π/6", "0"), "Na danem intervalu je a cos x > 0."),
        ("= a (sin " + U("π", "6") + " − sin 0) = " + U("a", "2"), ""),
        ("!" + U("a", "2") + " = 3  ⇒  a = 6", ""),
    ],
    snov=INTS,
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
v1 = naloga(
    1, "vektorji_ravnina_prostor", 15,
    r"Dana sta vektorja \(\vec{a} = (x, x + 2, 3)\) in \(\vec{b} = (x^2 - 2x - 5, x - 1, 2)\).<br>"
    r"a) Izračunaj kot med vektorjema, če je \(x = 0\). (4 točke)<br>"
    r"b) Poišči vsa realna števila \(x\), za katera sta vektorja pravokotna. (5 točk)<br>"
    r"c) Za katera realna števila \(x\) je \(|\vec{a}| = \sqrt{29}\)? (3 točke)<br>"
    r"d) Za kateri \(x\) je dolžina vektorja \(\vec{a}\) najmanjša? Kolikšna je ta dolžina? (3 točke)",
    r"a) \(\varphi \approx 78{,}31^\circ\) &nbsp; b) \(x \in \{1, 2, -2\}\) &nbsp; c) \(x = 2\), \(x = -4\) &nbsp; d) \(x = -1\), \(|\vec{a}| = \sqrt{11}\)",
    [
        (V("a") + " = (0, 2, 3),  " + V("b") + " = (−5, −1, 2),  " + V("a") + " · " + V("b") + " = −2 + 6 = 4", ""),
        ("|" + V("a") + "| = " + K("13") + ",  |" + V("b") + "| = " + K("30"), ""),
        ("cos φ = " + U("4", K("390")) + " ≈ 0,2026", "Kot med vektorjema prek skalarnega produkta."),
        ("!a) φ ≈ 78,31° ≈ 78°19'", ""),
        (V("a") + " · " + V("b") + " = x<sup>3</sup> − 2x<sup>2</sup> − 5x + x<sup>2</sup> + x − 2 + 6 = x<sup>3</sup> − x<sup>2</sup> − 4x + 4", ""),
        ("x<sup>2</sup>(x − 1) − 4(x − 1) = (x − 1)(x − 2)(x + 2) = 0", "Pravokotna vektorja: skalarni produkt je 0; združevanje členov."),
        ("!b) x ∈ {1, 2, −2}", ""),
        ("|" + V("a") + "|<sup>2</sup> = x<sup>2</sup> + (x + 2)<sup>2</sup> + 9 = 2x<sup>2</sup> + 4x + 13 = 29", ""),
        ("x<sup>2</sup> + 2x − 8 = 0  ⇒  (x + 4)(x − 2) = 0", ""),
        ("!c) x = 2,  x = −4", ""),
        ("2x<sup>2</sup> + 4x + 13 ima minimum v temenu x = −" + U("4", "4") + " = −1", "Teme kvadratne funkcije: p = −b/(2a)."),
        ("!d) x = −1,  |" + V("a") + "| = " + K("2 − 4 + 13") + " = " + K("11"), ""),
    ],
)


def f_v2(x):
    return math.exp(2 * x) - 3 * x

def slika_v2(X, Y):
    xs = [i / 60 for i in range(61)]
    pot = f"{X(0):.1f},{Y(0):.1f} " + " ".join(f"{X(x):.1f},{Y(f_v2(x)):.1f}" for x in xs) + f" {X(1):.1f},{Y(0):.1f}"
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.2"/>' + krivulja(X, Y, f_v2, -1.5, 1.2, MODRA)
            + tocka(X, Y, math.log(1.5) / 2, 1.5 - 1.5 * math.log(1.5), "T", dx=4, dy=14))

v2 = naloga(
    2, ["funkcije", "diferencialni_racun", "integralski_racun"], 12,
    r"Dana je funkcija \(f(x) = e^{2x} - 3x\).<br>"
    r"a) Izračunaj točni koordinati stacionarne točke funkcije. (4 točke)<br>"
    r"b) Izračunaj ploščino lika, ki ga oklepajo graf funkcije, koordinatni osi in premica \(x = 1\). (3 točke)<br>"
    r"c) Izračunaj kot med grafom funkcije in osjo \(y\). (2 točki)<br>"
    r"d) Dokaži, da se premica \(y + 3x - 7 = 0\) in graf funkcije sekata v točki z absciso \(x = \dfrac{\log 7}{\log e^2}\). (3 točke)",
    r"a) \(T\left(\frac{1}{2}\ln\frac{3}{2}, \frac{3}{2} - \frac{3}{2}\ln\frac{3}{2}\right)\) &nbsp; b) \(\frac{e^2 - 4}{2} \approx 1{,}695\) &nbsp; c) \(45^\circ\)",
    [
        ("f '(x) = 2e<sup>2x</sup> − 3 = 0  ⇒  e<sup>2x</sup> = " + U("3", "2"), "Odvod eksponentne funkcije (verižno pravilo)."),
        ("x = " + U("1", "2") + " ln " + U("3", "2"), ""),
        ("!a) T(" + U("1", "2") + " ln " + U("3", "2") + ", " + U("3", "2") + " − " + U("3", "2") + " ln " + U("3", "2") + ")", "f(x) = 3/2 − 3x."),
        ("@slika", mreza((-1.5, 1.5), (-1, 6), slika_v2, sirina=300, visina=260)),
        ("S = " + INT("1", "0") + "(e<sup>2x</sup> − 3x) dx = (" + U("1", "2") + "e<sup>2x</sup> − " + U("3", "2") + "x<sup>2</sup>)" + MEJA("1", "0"), "Na [0, 1] je f > 0 (minimum ≈ 0,89)."),
        ("= " + U("e<sup>2</sup>", "2") + " − " + U("3", "2") + " − " + U("1", "2"), ""),
        ("!b) S = " + U("e<sup>2</sup> − 4", "2") + " ≈ 1,695", ""),
        ("k = f '(0) = 2 − 3 = −1", "Graf seka os y v točki (0, 1)."),
        ("tangenta oklepa z osjo x kot 45°, zato tudi z osjo y", "Osi sta pravokotni."),
        ("!c) 45°", ""),
        ("e<sup>2x</sup> − 3x = 7 − 3x  ⇒  e<sup>2x</sup> = 7", "Izenačimo y = 7 − 3x in f(x)."),
        ("log e<sup>2x</sup> = log 7  ⇒  x · log e<sup>2</sup> = log 7", "Logaritmiramo z desetiškim logaritmom."),
        ("!d) x = " + U("log 7", "log e<sup>2</sup>"), ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)


def elipse_v3(X, Y):
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ((0, -4), (6, -4), (6, 0), (0, 0)))
    return (f'<polygon points="{pot}" fill="none" stroke="currentColor" stroke-width="1.3"/>'
            + parametricna(X, Y, lambda t: 3 + 3 * math.cos(t), lambda t: -2 + 2 * math.sin(t), 0, 2 * math.pi, MODRA)
            + parametricna(X, Y, lambda t: 3 + math.sqrt(18) * math.cos(t), lambda t: -2 + math.sqrt(8) * math.sin(t), 0, 2 * math.pi, RDECA)
            + tocka(X, Y, 3 - math.sqrt(5), -2, "F₁", dx=-6, dy=14) + tocka(X, Y, 3 + math.sqrt(5), -2, "F₂", dx=-6, dy=14)
            + tocka(X, Y, 3, -2 + 2 * math.sqrt(2), "T"))

v3 = naloga(
    3, "stoznice", 13,
    r"Točke \(A(0, -4)\), \(B(6, -4)\), \(C(6, 0)\) in \(D(0, 0)\) so oglišča pravokotnika.<br>"
    r"a) Zapiši enačbo elipse, ki je včrtana pravokotniku in ima osi vzporedni koordinatnima osema. Zapiši njeni gorišči. (4 točke)<br>"
    r"b) Zapiši enačbo elipse, ki je pravokotniku očrtana, ima osi vzporedni koordinatnima osema in poteka skozi točko "
    r"\(T(3, 2\sqrt{2} - 2)\). (4 točke)<br>"
    r"c) Izračunaj točki na elipsi \((x - 3)^2 + 4(y + 2)^2 = 40\), v katerih je tangenta vzporedna premici \(3x - 2y + 1 = 0\). (5 točk)",
    r"a) \(\frac{(x - 3)^2}{9} + \frac{(y + 2)^2}{4} = 1\), \(F_{1,2}(3 \mp \sqrt{5}, -2)\) &nbsp; "
    r"b) \(\frac{(x - 3)^2}{18} + \frac{(y + 2)^2}{8} = 1\) &nbsp; c) \((-3, -1)\) in \((9, -3)\)",
    [
        ("središče S(3, −2),  a = 3,  b = 2", "Središče pravokotnika; polosi sta polovici stranic."),
        ("!" + U("(x − 3)<sup>2</sup>", "9") + " + " + U("(y + 2)<sup>2</sup>", "4") + " = 1", "Premaknjena elipsa."),
        ("e = " + K("9 − 4") + " = " + K("5"), "Linearna ekscentričnost elipse: e² = a² − b²."),
        ("!F<sub>1</sub>(3 − " + K("5") + ", −2),  F<sub>2</sub>(3 + " + K("5") + ", −2)", ""),
        ("T leži na navpični osi: b = 2" + K("2") + ",  b<sup>2</sup> = 8", "T je teme na krajši osi."),
        ("D(0, 0):  " + U("9", "a<sup>2</sup>") + " + " + U("4", "8") + " = 1  ⇒  a<sup>2</sup> = 18", "Oglišča pravokotnika ležijo na elipsi."),
        ("!b) " + U("(x − 3)<sup>2</sup>", "18") + " + " + U("(y + 2)<sup>2</sup>", "8") + " = 1", ""),
        ("@slika", mreza((-2, 8), (-5.5, 1.5), elipse_v3, sirina=280)),
        ("2(x − 3) + 8(y + 2) y ' = 0  ⇒  y ' = −" + U("x − 3", "4(y + 2)"), "Implicitno odvajanje."),
        ("y ' = " + U("3", "2") + "  ⇒  x − 3 = −6(y + 2)", "Smerni koeficient premice je 3/2."),
        ("36(y + 2)<sup>2</sup> + 4(y + 2)<sup>2</sup> = 40  ⇒  (y + 2)<sup>2</sup> = 1", "Vstavimo v enačbo elipse."),
        ("!c) T<sub>1</sub>(−3, −1),  T<sub>2</sub>(9, −3)", "y + 2 = 1 ⇒ x − 3 = −6;  y + 2 = −1 ⇒ x − 3 = 6."),
    ],
)

POLA2 = [v1, v2, v3]
