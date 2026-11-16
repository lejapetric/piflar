# Spomladanski rok 2011 (uradne pole RIC: m111-401-1-1, m111-402-1-1, m111-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2011, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "funkcije", 8,
    r"Dana je funkcija \(f(x) = -2x + 7\). Izračunaj \(f(-3)\). Za kateri \(x\) je vrednost funkcije enaka \(\frac{1}{2}\)? Za katere \(x\) so "
    r"vrednosti funkcije negativne?",
    r"\(f(-3) = 13\); \(x = \frac{13}{4}\); \(x > \frac{7}{2}\)",
    [
        ("!f(−3) = 6 + 7 = 13", ""),
        ("−2x + 7 = " + U("1", "2") + "  ⇒  −2x = −" + U("13", "2"), "Linearna enačba."),
        ("!x = " + U("13", "4"), ""),
        ("−2x + 7 < 0  ⇒  x > " + U("7", "2"), "Pri deljenju z negativnim številom se neenačaj obrne."),
        ("!f(x) < 0 za x ∈ (" + U("7", "2") + ", ∞)", ""),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n2 = naloga(
    2, "zaporedja_vrste", 5,
    r"Prvi člen aritmetičnega zaporedja je \(7\), šesti člen pa \(-8\). Izračunaj diferenco in stoti člen.",
    r"\(d = -3\), \(a_{100} = -290\)",
    [
        ("a<sub>6</sub> = a<sub>1</sub> + 5d:  −8 = 7 + 5d", "Splošni člen aritmetičnega zaporedja."),
        ("!d = −3", ""),
        ("!a<sub>100</sub> = 7 + 99 · (−3) = −290", ""),
    ],
)

n3 = naloga(
    3, "potence_koreni", 5,
    r"Poenostavi izraz \(\left((-a)^3\right)^2 \cdot (-a)^{-5} : a^{-2}\), \(a \ne 0\).",
    r"\(-a^3\)",
    [
        ("((−a)<sup>3</sup>)<sup>2</sup> = (−a)<sup>6</sup> = a<sup>6</sup>", "Potenca potence; soda potenca negativnega števila je pozitivna."),
        ("(−a)<sup>−5</sup> = −a<sup>−5</sup>", "Liha potenca ohrani predznak."),
        ("a<sup>6</sup> · (−a<sup>−5</sup>) : a<sup>−2</sup> = −a<sup>6 − 5 + 2</sup>", "Množenje in deljenje potenc z enako osnovo."),
        ("!−a<sup>3</sup>", ""),
    ],
)

n4 = naloga(
    4, "geometrijski_liki_telesa", 8,
    r"V ostrokotnem trikotniku, v katerem je stranica \(b\) daljša od stranice \(a\), je \(a = 2\sqrt{10}\ \mathrm{cm}\), višina "
    r"\(v_c = 6\ \mathrm{cm}\) in težiščnica \(t_c = 3\sqrt{5}\ \mathrm{cm}\). Izračunaj stranico \(c\) in ploščino trikotnika. Nariši skico.",
    r"\(c = 10\ \mathrm{cm}\), \(S = 30\ \mathrm{cm^2}\)",
    [
        ("|BH| = " + K("40 − 36") + " = 2", "H je nožišče višine v_c; Pitagorov izrek v trikotniku BCH."),
        ("|HM| = " + K("45 − 36") + " = 3", "M je razpolovišče stranice c (konec težiščnice)."),
        ("" + U("c", "2") + " = |BH| + |HM| = 5", "Ker je b > a, leži H med B in M."),
        ("!c = 10 cm", ""),
        ("!S = " + U("c · v<sub>c</sub>", "2") + " = " + U("10 · 6", "2") + " = 30 cm<sup>2</sup>", "Ploščina trikotnika."),
    ],
)

n5 = naloga(
    5, "stevilske_mnozice", 6,
    r"Kompleksno število \((3 - 4i)^2 (1 + 2i)^{-1}\) zapiši v obliki \(a + bi\), \(a, b \in \mathbb{R}\).",
    r"\(-11 - 2i\)",
    [
        ("(3 − 4i)<sup>2</sup> = 9 − 24i + 16i<sup>2</sup> = −7 − 24i", "Kvadrat dvočlenika, i² = −1."),
        (U("−7 − 24i", "1 + 2i") + " · " + U("1 − 2i", "1 − 2i") + " = " + U("−7 + 14i − 24i + 48i<sup>2</sup>", "5"), "Ulomek razširimo s konjugirano vrednostjo imenovalca."),
        ("!" + U("−55 − 10i", "5") + " = −11 − 2i", ""),
    ],
)

def p6(x):
    return 0.5 * (x + 2) * (x - 1) ** 2

n6 = naloga(
    6, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Zapiši polinom tretje stopnje, katerega graf je narisan (ničli \(-2\) in \(1\), graf seka os \(y\) v točki \((0, 1)\))."
    + graf([(p6, MODRA)], (-3, 3), (-2, 4), tocke=[(-2, 0, ""), (1, 0, ""), (0, 1, "")], sirina=260, visina=220),
    r"\(p(x) = \frac{1}{2}(x + 2)(x - 1)^2\)",
    [
        ("pri x = 1 se graf dotika osi x  ⇒  dvojna ničla", "Pri sodi stopnji ničle polinom ne menja predznaka."),
        ("p(x) = a(x + 2)(x − 1)<sup>2</sup>", "Ničelna oblika polinoma."),
        ("p(0) = 2a = 1  ⇒  a = " + U("1", "2"), ""),
        ("!p(x) = " + U("1", "2") + "(x + 2)(x − 1)<sup>2</sup>", ""),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

n7 = naloga(
    7, "stoznice", 7,
    r"Elipsa s središčem v izhodišču ima temeni \(T_1(4, 0)\) in \(T_2(-4, 0)\) ter poteka skozi točko \(A\left(2, \frac{3\sqrt{3}}{2}\right)\). "
    r"Zapiši njeno enačbo in drugi dve temeni.",
    r"\(\frac{x^2}{16} + \frac{y^2}{9} = 1\), \((0, \pm 3)\)",
    [
        (U("x<sup>2</sup>", "16") + " + " + U("y<sup>2</sup>", "b<sup>2</sup>") + " = 1", "Temeni na osi x dajo a = 4."),
        (U("4", "16") + " + " + U("27/4", "b<sup>2</sup>") + " = 1  ⇒  " + U("27", "4b<sup>2</sup>") + " = " + U("3", "4"), "Vstavimo točko A."),
        ("b<sup>2</sup> = 9", ""),
        ("!" + U("x<sup>2</sup>", "16") + " + " + U("y<sup>2</sup>", "9") + " = 1,  temeni (0, 3) in (0, −3)", ""),
    ],
)

n8 = naloga(
    8, "vektorji_ravnina_prostor", 8,
    r"Vektorja \(\vec{a}\) in \(\vec{b}\) sta dolga \(6\) enot in oklepata kot \(60^\circ\). Skiciraj vektor \(\vec{c} = \vec{a} - \frac{1}{3}\vec{b}\) "
    r"in izračunaj skalarna produkta \(\vec{a} \cdot \vec{b}\) in \(\vec{a} \cdot \vec{c}\).",
    r"\(\vec{a} \cdot \vec{b} = 18\), \(\vec{a} \cdot \vec{c} = 30\)",
    [
        ("c = a − ⅓ b: od konca vektorja a nanesemo tretjino vektorja b v nasprotni smeri", "Seštevanje vektorjev in množenje s skalarjem."),
        ("!" + V("a") + " · " + V("b") + " = 6 · 6 · cos 60° = 18", "Definicija skalarnega produkta."),
        ("!" + V("a") + " · " + V("c") + " = " + V("a") + " · " + V("a") + " − " + U("1", "3") + V("a") + " · " + V("b") + " = 36 − 6 = 30", "Skalarni produkt je distributiven."),
    ],
)

n9 = naloga(
    9, "funkcije", 7,
    r"Naj bo \(f(x) = a \cdot 2^{x + 1} + b\), \(a, b \in \mathbb{R}\). Določi \(a\) in \(b\), da bo \(f(0) = 5\) in \(f(2) = 17\). Zapiši še "
    r"definicijsko območje in zalogo vrednosti dobljene funkcije.",
    r"\(a = 2\), \(b = 1\), \(D_f = \mathbb{R}\), \(Z_f = (1, \infty)\)",
    [
        (SISTEM("2a + b = 5", "8a + b = 17"), "Vstavimo x = 0 in x = 2."),
        ("6a = 12  ⇒  a = 2,  b = 1", ""),
        ("!f(x) = 2 · 2<sup>x + 1</sup> + 1 = 2<sup>x + 2</sup> + 1", ""),
        ("!D<sub>f</sub> = ℝ,  Z<sub>f</sub> = (1, ∞)", "Eksponentna funkcija je pozitivna; premik za 1 navzgor."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n10 = naloga(
    10, "funkcije", 7,
    r"Izračunaj ničle funkcij \(f(x) = \cos 2x\) in \(g(x) = 2\cos x - \sqrt{3}\).",
    r"\(f\): \(x = \frac{\pi}{4} + \frac{k\pi}{2}\); \(g\): \(x = \pm\frac{\pi}{6} + 2k\pi\), \(k \in \mathbb{Z}\)",
    [
        ("cos 2x = 0  ⇒  2x = " + U("π", "2") + " + kπ", "Ničle kosinusa."),
        ("!x = " + U("π", "4") + " + " + U("kπ", "2") + ", k ∈ ℤ", ""),
        ("cos x = " + U(K("3"), "2"), ""),
        ("!x = ±" + U("π", "6") + " + 2kπ, k ∈ ℤ", "Enačbe s kotnimi funkcijami."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n11 = naloga(
    11, ["kombinatorika", "verjetnostni_racun"], 6,
    r"Lara ima \(15\) prijateljic in \(9\) prijateljev (le enemu je ime Jan in le enemu Miha). Na zabavo bo povabila \(4\) prijateljice in "
    r"\(3\) prijatelje. Na koliko načinov lahko to stori? Kolikšna je verjetnost, da bosta med povabljenimi Jan in Miha, če izbira naključno?",
    r"\(114\,660\); \(\frac{1}{12}\)",
    [
        ("!" + BINOM("15", "4") + " · " + BINOM("9", "3") + " = 1365 · 84 = 114 660", "Kombinacije in pravilo produkta."),
        ("ugodno: Jan, Miha in še eden izmed 7 fantov: " + BINOM("7", "1") + " = 7", "Izbor prijateljic ne vpliva na verjetnost."),
        ("!P = " + U("7", BINOM("9", "3")) + " = " + U("7", "84") + " = " + U("1", "12"), ""),
    ],
)

def senca12(X, Y):
    a = 5 / math.log(3)
    pts = [(2, 0)] + [(2 + 4 * i / 60, a / (2 + 4 * i / 60)) for i in range(61)] + [(6, 0)]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25"/>'
            + krivulja(X, Y, lambda x: a / x, 0.8, 8, MODRA)
            + f'<text x="{X(2):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">2</text>'
            + f'<text x="{X(6):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">6</text>')

n12 = naloga(
    12, "integralski_racun", 7,
    r"Na sliki je graf funkcije \(f(x) = \frac{a}{x}\), \(a > 0\). Osenčeni lik leži pod grafom med premicama \(x = 2\) in \(x = 6\). Na dve "
    r"decimalki izračunaj \(a\), če je ploščina osenčenega lika \(5\)."
    + mreza((-0.5, 8), (-0.6, 6), senca12, sirina=300, oznake=False),
    r"\(a \approx 4{,}55\)",
    [
        ("p = " + INT("6", "2") + U("a", "x") + " dx = a ln x" + MEJA("6", "2") + " = a ln 3", "Integral 1/x je ln x; logaritem kvocienta."),
        ("a ln 3 = 5  ⇒  a = " + U("5", "ln 3"), ""),
        ("!a ≈ 4,55", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def h_v1(x):
    return (x * x - 1) / (x * x - 4)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "algebrski_izrazi_enacbe_neenacbe"], 15,
    r"Dani sta funkciji \(f(x) = x^2 - 2\) in \(g(x) = \dfrac{x + 1}{x - 2}\).<br>"
    r"a) Zapiši predpis inverzne funkcije \(g^{-1}\). (2 točki)<br>"
    r"b) Naj bo \(h(x) = (g \circ f)(x) = g(f(x))\). Pokaži, da je \(h(x) = \dfrac{x^2 - 1}{x^2 - 4}\). (2 točki)<br>"
    r"c) Izračunaj ničli, ekstrem in vodoravno asimptoto funkcije \(h\) ter nariši njen graf. (5 točk)<br>"
    r"d) Reši neenačbo \(h(x) < 2\). (6 točk)",
    r"a) \(g^{-1}(x) = \frac{2x + 1}{x - 1}\) &nbsp; c) ničli \(\pm 1\), maksimum \(\left(0, \frac{1}{4}\right)\), \(y = 1\) &nbsp; "
    r"d) \(x \in (-\infty, -\sqrt{7}) \cup (-2, 2) \cup (\sqrt{7}, \infty)\)",
    [
        ("y(x − 2) = x + 1  ⇒  x(y − 1) = 2y + 1", "Izrazimo x in zamenjamo vlogi spremenljivk."),
        ("!a) g<sup>−1</sup>(x) = " + U("2x + 1", "x − 1"), ""),
        ("!b) h(x) = " + U("(x<sup>2</sup> − 2) + 1", "(x<sup>2</sup> − 2) − 2") + " = " + U("x<sup>2</sup> − 1", "x<sup>2</sup> − 4"), "Kompozitum: v g vstavimo f(x)."),
        ("ničli x = ±1,  pola x = ±2,  vodoravna asimptota y = 1", "Ničle števca, ničle imenovalca; enaki stopnji."),
        ("h '(x) = " + U("2x(x<sup>2</sup> − 4) − 2x(x<sup>2</sup> − 1)", "(x<sup>2</sup> − 4)<sup>2</sup>") + " = " + U("−6x", "(x<sup>2</sup> − 4)<sup>2</sup>"), "Odvod kvocienta."),
        ("!lokalni maksimum (0, " + U("1", "4") + ")", "h' preide iz + v − pri x = 0."),
        ("@slika", graf([(h_v1, MODRA)], (-6, 6), (-4, 5), tocke=[(-1, 0, ""), (1, 0, ""), (0, 0.25, "")], sirina=320, visina=260)),
        (U("x<sup>2</sup> − 1", "x<sup>2</sup> − 4") + " − 2 = " + U("7 − x<sup>2</sup>", "x<sup>2</sup> − 4") + " < 0", "Vse prenesemo na eno stran in razširimo na skupni imenovalec."),
        ("ničle števca ±" + K("7") + ", ničle imenovalca ±2", "Predznak racionalne funkcije se menja pri enojnih ničlah in polih."),
        ("!d) x ∈ (−∞, −" + K("7") + ") ∪ (−2, 2) ∪ (" + K("7") + ", ∞)", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v2 = naloga(
    2, "zaporedja_vrste", 11,
    r"Dano je zaporedje s splošnim členom \(a_n = \sqrt{n^2 + 6n} - n\), \(n \in \mathbb{N}\).<br>"
    r"a) Računsko pokaži, da število \(2{,}95\) ni člen zaporedja. (3 točke)<br>"
    r"b) Izračunaj limito zaporedja. (4 točke)<br>"
    r"c) Kateri členi niso v \(\varepsilon\)-okolici limite, če je \(\varepsilon = 0{,}5\)? (4 točke)",
    r"b) \(3\) &nbsp; c) \(a_1, \dots, a_6\)",
    [
        (K("n<sup>2</sup> + 6n") + " = n + 2,95  ⇒  n<sup>2</sup> + 6n = n<sup>2</sup> + 5,9n + 8,7025", "Kvadriramo (obe strani sta pozitivni)."),
        ("!a) 0,1n = 8,7025  ⇒  n = 87,025 ∉ ℕ", ""),
        ("a<sub>n</sub> = " + U("(n<sup>2</sup> + 6n) − n<sup>2</sup>", K("n<sup>2</sup> + 6n") + " + n") + " = " + U("6", K("1 + 6/n") + " + 1"), "Razširimo z vsoto in delimo z n (limita zaporedja)."),
        ("!b) " + LIM("n → ∞") + " a<sub>n</sub> = " + U("6", "2") + " = 3", ""),
        ("a<sub>n</sub> < 3 za vsak n;  zunaj okolice: a<sub>n</sub> ≤ 2,5", "Zaporedje narašča proti 3 od spodaj."),
        (K("n<sup>2</sup> + 6n") + " ≤ n + 2,5  ⇒  6n ≤ 5n + 6,25  ⇒  n ≤ 6,25", ""),
        ("!c) členi a<sub>1</sub> do a<sub>6</sub>", "Npr. a₆ = √72 − 6 ≈ 2,49, a₇ = √91 − 7 ≈ 2,54."),
    ],
)

def krog_v3(X, Y):
    return (parametricna(X, Y, lambda t: 10 + 10 * math.cos(t), lambda t: 20 + 10 * math.sin(t), 0, 2 * math.pi, MODRA)
            + krivulja(X, Y, lambda x: 7 * x, -0.2, 4.6, RDECA) + krivulja(X, Y, lambda x: 0.75 * x, -1, 22, "#2a9d4b")
            + tocka(X, Y, 10, 20, "S") + tocka(X, Y, 2, 14, "A", dx=-14) + tocka(X, Y, 4, 28, "B", dx=-14) + tocka(X, Y, 16, 12, "D"))

v3 = naloga(
    3, "stoznice", 14,
    r"Krožnica \(K\) ima središče v točki \(S(10, 20)\) in se dotika ordinatne osi. Premica \(y = 7x\) seka krožnico v točkah \(A\) in \(B\).<br>"
    r"a) Zapiši enačbo krožnice in izračunaj koordinate točk \(A\) in \(B\). (5 točk)<br>"
    r"b) Pokaži, da je kot \(ASB\) pravi. (3 točke)<br>"
    r"c) Iz izhodišča načrtamo na krožnico obe tangenti; ena je ordinatna os. Zapiši enačbo druge tangente in koordinati njenega "
    r"dotikališča. (6 točk)",
    r"a) \((x - 10)^2 + (y - 20)^2 = 100\), \(A(2, 14)\), \(B(4, 28)\) &nbsp; c) \(y = \frac{3}{4}x\), \(D(16, 12)\)",
    [
        ("r = 10", "Polmer je razdalja središča od osi y, ki se je krožnica dotika."),
        ("!(x − 10)<sup>2</sup> + (y − 20)<sup>2</sup> = 100", ""),
        ("(x − 10)<sup>2</sup> + (7x − 20)<sup>2</sup> = 100  ⇒  50x<sup>2</sup> − 300x + 400 = 0", "Vstavimo y = 7x."),
        ("x<sup>2</sup> − 6x + 8 = 0  ⇒  x = 2 ali x = 4", ""),
        ("!A(2, 14),  B(4, 28)", ""),
        (V("SA") + " = (−8, −6),  " + V("SB") + " = (−6, 8)", ""),
        ("!b) " + V("SA") + " · " + V("SB") + " = 48 − 48 = 0  ⇒  ∢ASB = 90°", "Skalarni produkt pravokotnih vektorjev je 0."),
        ("y = kx:  " + U("|10k − 20|", K("k<sup>2</sup> + 1")) + " = 10", "Tangenta je od središča oddaljena za polmer (razdalja točke od premice)."),
        ("(k − 2)<sup>2</sup> = k<sup>2</sup> + 1  ⇒  k = " + U("3", "4"), ""),
        ("!y = " + U("3", "4") + "x", ""),
        ("dotikališče je pravokotna projekcija S na tangento: smer (4, 3), S · (4, 3)/5 = 20", ""),
        ("!D = 20 · " + U("(4, 3)", "5") + " = (16, 12)", "Preverimo: |SD| = |(6, −8)| = 10."),
        ("@slika", mreza((-2, 22), (-2, 32), krog_v3, sirina=260, korak=2)),
    ],
)

POLA2 = [v1, v2, v3]
