# Jesenski rok 2016 (uradne pole RIC: m162-401-1-1, m162-402-1-1, m162-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2016, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Reši sistem dveh linearnih enačb \(3x - 4y = 2\) in \(y = \frac{1}{2}x - 1\).",
    r"\(x = -2\), \(y = -2\)",
    [
        ("3x − 4(" + U("1", "2") + "x − 1) = 2", "Drugo enačbo vstavimo v prvo (metoda zamenjave)."),
        ("3x − 2x + 4 = 2  ⇒  x = −2", ""),
        ("y = " + U("1", "2") + " · (−2) − 1 = −2", ""),
        ("!x = −2,  y = −2", ""),
    ],
)

n2 = naloga(
    2, ["stevilske_mnozice", "potence_koreni"], 8,
    r"Vsak izraz v levem stolpcu preglednice je enak enemu od števil v desnem stolpcu, ki so označena s črkami od A do K. "
    r"V preglednico vpiši črko števila, ki je enako izrazu (prva vrstica je že izpolnjena)."
    + tabela(["Izraz", "Črka"], [["\\(\\sqrt[3]{8}\\)", "D"], ["\\(\\frac{1}{i}\\)", ""], ["\\(\\cos 720^\\circ\\)", ""],
                                 ["\\(15\\,\\%\\) od \\(0{,}8\\)", ""], ["\\(\\binom{5}{2}\\)", ""], ["\\((1 + i)^2\\)", ""],
                                 ["\\(\\log_2 \\frac{1}{8}\\)", ""], ["\\(0{,}\\overline{3}\\)", ""], ["\\(\\frac{4!}{2!}\\)", ""]])
    + r"(A) \(0{,}12\) &nbsp; (B) \(-3\) &nbsp; (C) \(2i\) &nbsp; (D) \(2\) &nbsp; (E) \(10\) &nbsp; (F) \(-i\) &nbsp; (G) \(1\) &nbsp; "
      r"(H) \(\frac{1}{3}\) &nbsp; (I) \(0\) &nbsp; (J) \(i\) &nbsp; (K) \(12\)",
    r"F, G, A, E, C, B, H, K",
    [
        ("!" + U("1", "i") + " = " + U("i", "i<sup>2</sup>") + " = −i  →  F", "Ulomek razširimo z i."),
        ("!cos 720° = cos 0° = 1  →  G", "Kosinus je periodičen s periodo 360°."),
        ("!0,15 · 0,8 = 0,12  →  A", "Odstotek od osnove."),
        ("!" + BINOM("5", "2") + " = " + U("5 · 4", "2") + " = 10  →  E", "Binomski simbol."),
        ("!(1 + i)<sup>2</sup> = 1 + 2i + i<sup>2</sup> = 2i  →  C", "Kvadrat dvočlenika, i² = −1."),
        ("!log<sub>2</sub> " + U("1", "8") + " = log<sub>2</sub> 2<sup>−3</sup> = −3  →  B", "Definicija logaritma."),
        ("!0,333… = " + U("3", "9") + " = " + U("1", "3") + "  →  H", "Periodično decimalno število zapišemo z ulomkom."),
        ("!" + U("4!", "2!") + " = " + U("24", "2") + " = 12  →  K", "Fakulteta."),
    ],
)

def kompleksni(X, Y):
    return (f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(3):.1f}" y2="{Y(-1):.1f}" stroke="{MODRA}" stroke-width="1.5"/>'
            f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(1):.1f}" y2="{Y(2):.1f}" stroke="{RDECA}" stroke-width="1.5"/>'
            + tocka(X, Y, 3, -1, "z") + tocka(X, Y, 1, 2, "w"))

n3 = naloga(
    3, "stevilske_mnozice", 7,
    r"Nalogo reši brez računala. Na sliki sta kompleksni števili \(z\) in \(w\). Zapiši ju in izračunaj \(z \cdot w\), \(z \cdot w^{-1}\), "
    r"\(\bar{z}\) in \(|w|\)."
    + mreza((-2, 4), (-2, 3), kompleksni, sirina=260),
    r"\(z = 3 - i\), \(w = 1 + 2i\), \(z w = 5 + 5i\), \(z w^{-1} = \frac{1}{5} - \frac{7}{5}i\), \(\bar{z} = 3 + i\), \(|w| = \sqrt{5}\)",
    [
        ("!z = 3 − i,  w = 1 + 2i", "Realni del preberemo na vodoravni, imaginarni na navpični osi."),
        ("!z · w = 3 + 6i − i − 2i<sup>2</sup> = 5 + 5i", "Množimo člen s členom, i² = −1."),
        ("z · w<sup>−1</sup> = " + U("3 − i", "1 + 2i") + " · " + U("1 − 2i", "1 − 2i") + " = " + U("3 − 6i − i + 2i<sup>2</sup>", "1 + 4"),
         "Ulomek razširimo s konjugirano vrednostjo imenovalca."),
        ("!z · w<sup>−1</sup> = " + U("1", "5") + " − " + U("7", "5") + "i", ""),
        ("!" + "z̄ = 3 + i,  |w| = " + K("1<sup>2</sup> + 2<sup>2</sup>") + " = " + K("5"), "Konjugirana vrednost in absolutna vrednost kompleksnega števila."),
    ],
)

n4 = naloga(
    4, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 7,
    r"Zveza med Fahrenheitovo lestvico \([^\circ\mathrm{F}]\) in Celzijevo lestvico \([^\circ\mathrm{C}]\) je \(F = \frac{9C + 160}{5}\).<br>"
    r"4.1. Koliko stopinj \(^\circ\mathrm{F}\) je pri \(25\ ^\circ\mathrm{C}\)? (1 točka)<br>"
    r"4.2. Koliko stopinj \(^\circ\mathrm{C}\) je pri \(14\ ^\circ\mathrm{F}\)? (2 točki)<br>"
    r"4.3. Pri kateri temperaturi kažeta oba termometra enako vrednost? (4 točke)",
    r"4.1. \(77\ ^\circ\mathrm{F}\) &nbsp; 4.2. \(-10\ ^\circ\mathrm{C}\) &nbsp; 4.3. \(-40^\circ\)",
    [
        ("!4.1  F = " + U("9 · 25 + 160", "5") + " = " + U("385", "5") + " = 77 °F", "Vstavimo C = 25."),
        ("14 = " + U("9C + 160", "5") + "  ⇒  70 = 9C + 160  ⇒  9C = −90", "Vstavimo F = 14 in rešimo linearno enačbo."),
        ("!4.2  C = −10 °C", ""),
        ("C = " + U("9C + 160", "5") + "  ⇒  5C = 9C + 160  ⇒  −4C = 160", "Iščemo temperaturo, pri kateri je F = C."),
        ("!4.3  −40 °C = −40 °F", ""),
    ],
)

def stoznice(X, Y):
    s3 = math.sqrt(3)
    return (parametricna(X, Y, lambda t: math.sqrt(5) * math.cos(t), lambda t: math.sqrt(5) * math.sin(t), 0, 2 * math.pi, MODRA)
            + parametricna(X, Y, lambda t: 4 * math.cos(t), lambda t: 2 * math.sin(t), 0, 2 * math.pi, "#2a9d4b")
            + krivulja(X, Y, lambda x: x * x - 3, -math.sqrt(6.5), math.sqrt(6.5), RDECA)
            + parametricna(X, Y, lambda t: s3 * math.cosh(t), lambda t: s3 * math.sinh(t), -1.25, 1.25, "#b5651d")
            + parametricna(X, Y, lambda t: -s3 * math.cosh(t), lambda t: s3 * math.sinh(t), -1.25, 1.25, "#b5651d")
            + tocka(X, Y, 2, 1, "A") + tocka(X, Y, -2, 1, "B", dx=-14) + tocka(X, Y, 1, -2, "C", dy=13))

n5 = naloga(
    5, "stoznice", 8,
    r"Na sliki so štiri stožnice: krožnica, elipsa, hiperbola in parabola (vse z enotami na mreži).<br>"
    r"5.1. Zapiši enačbe vseh štirih stožnic. (4 točke)<br>"
    r"5.2. Zapiši koordinate označenih točk \(A\), \(B\) in \(C\). (4 točke)"
    + mreza((-5, 5), (-3.5, 3.5), stoznice, sirina=380),
    r"5.1. \(x^2 + y^2 = 5\), \(\frac{x^2}{16} + \frac{y^2}{4} = 1\), \(x^2 - y^2 = 3\), \(y = x^2 - 3\) &nbsp; "
    r"5.2. \(A(2, 1)\), \(B(-2, 1)\), \(C(1, -2)\)",
    [
        ("!elipsa: " + U("x<sup>2</sup>", "16") + " + " + U("y<sup>2</sup>", "4") + " = 1", "Polosi preberemo na oseh: a = 4, b = 2."),
        ("!parabola: y = x<sup>2</sup> − 3", "Teme je v (0, −3), parabola gre skozi (±2, 1)."),
        ("!krožnica: x<sup>2</sup> + y<sup>2</sup> = 5", "Gre skozi (2, 1) in (1, −2), zato je r² = 4 + 1 = 5."),
        ("!hiperbola: x<sup>2</sup> − y<sup>2</sup> = 3", "Enakoosna hiperbola skozi (2, 1): a² = 4 − 1 = 3."),
        ("!A(2, 1),  B(−2, 1),  C(1, −2)", "Točke ležijo v vozliščih mreže; preverimo, da ustrezajo enačbam stožnic, na katerih ležijo."),
    ],
)

n6 = naloga(
    6, "geometrijski_liki_telesa", 7,
    r"V enakokrakem trikotniku \(ABC\) merita kraka \(AC\) in \(BC\) po \(5\ \mathrm{cm}\), osnovnica \(AB\) pa \(6\ \mathrm{cm}\). Točka \(D\) je "
    r"razpolovišče osnovnice, točka \(E\) pa nožišče višine iz oglišča \(B\) na stranico \(AC\). Nariši skico.<br>"
    r"6.1. Dokaži, da sta trikotnika \(ADC\) in \(AEB\) podobna. (2 točki)<br>"
    r"6.2. Brez računala izračunaj razdaljo oglišča \(B\) od kraka \(AC\). (5 točk)",
    r"6.2. \(\frac{24}{5}\ \mathrm{cm} = 4{,}8\ \mathrm{cm}\)",
    [
        ("∢ADC = ∢AEB = 90°,  kot pri A je skupen", "CD je višina na osnovnico, BE višina na krak."),
        ("!6.1  trikotnika sta podobna", "Ujemata se v dveh kotih."),
        ("|CD| = " + K("5<sup>2</sup> − 3<sup>2</sup>") + " = 4", "Pitagorov izrek v trikotniku ADC."),
        (U("|BE|", "|AB|") + " = " + U("|CD|", "|AC|") + "  ⇒  |BE| = " + U("6 · 4", "5"), "Razmerja istoležnih stranic podobnih trikotnikov."),
        ("!6.2  |BE| = " + U("24", "5") + " cm = 4,8 cm", "Enako dobimo iz ploščine: 6 · 4 = 5 · |BE|."),
    ],
)

def f7(x):
    return math.log2(x + 4) - 1

n7 = naloga(
    7, "funkcije", 7,
    r"Dana je funkcija \(f(x) = \log_2 (x + 4) - 1\). Izračunaj ničlo, začetno vrednost in absciso točke \(A(x, 2)\) na grafu. "
    r"Nariši graf funkcije ter zapiši definicijsko območje in enačbo asimptote.",
    r"ničla \(x = -2\), \(f(0) = 1\), \(A(4, 2)\), \(D_f = (-4, \infty)\), asimptota \(x = -4\)",
    [
        ("log<sub>2</sub>(x + 4) = 1  ⇒  x + 4 = 2", "Ničla: f(x) = 0; definicija logaritma."),
        ("!ničla x = −2", ""),
        ("!f(0) = log<sub>2</sub> 4 − 1 = 1", "Začetna vrednost."),
        ("log<sub>2</sub>(x + 4) = 3  ⇒  x + 4 = 8", "f(x) = 2."),
        ("!A(4, 2)", ""),
        ("@slika", graf([(f7, MODRA)], (-5, 6), (-3, 3), tocke=[(-2, 0, "−2"), (0, 1, ""), (4, 2, "A")], sirina=340, visina=200)),
        ("!D<sub>f</sub> = (−4, ∞),  asimptota x = −4", "Argument logaritma mora biti pozitiven: x + 4 > 0."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n8 = naloga(
    8, "diferencialni_racun", 5,
    r"Kolikšen mora biti parameter \(a\), da bo imela funkcija \(f(x) = \frac{ax^4 + 4}{x^2}\) ekstrem pri \(x = 2\)?",
    r"\(a = \frac{1}{4}\)",
    [
        ("f(x) = ax<sup>2</sup> + 4x<sup>−2</sup>", "Ulomek razdelimo na dva člena."),
        ("f '(x) = 2ax − 8x<sup>−3</sup>", "Odvod potence."),
        ("f '(2) = 4a − 1 = 0", "V ekstremu odvedljive funkcije je odvod 0 (stacionarne točke)."),
        ("!a = " + U("1", "4"), "Pri tem a je f ''(2) > 0, zato ima f v x = 2 res (lokalni minimum)."),
    ],
)

n9 = naloga(
    9, "vektorji_ravnina_prostor", 7,
    r"V pravilnem šestkotniku \(ABCDEF\) meri stranica \(6\). Vektorja \(\overrightarrow{AC}\) in \(\overrightarrow{AD}\) zapiši kot linearno "
    r"kombinacijo vektorjev \(\overrightarrow{AB} = \vec{a}\) in \(\overrightarrow{AF} = \vec{b}\). Izračunaj natančno dolžino vektorja "
    r"\(\overrightarrow{AC}\) in skalarni produkt \(\overrightarrow{AC} \cdot \overrightarrow{AD}\).",
    r"\(\overrightarrow{AC} = 2\vec{a} + \vec{b}\), \(\overrightarrow{AD} = 2\vec{a} + 2\vec{b}\), \(|\overrightarrow{AC}| = 6\sqrt{3}\), "
    r"\(\overrightarrow{AC} \cdot \overrightarrow{AD} = 108\)",
    [
        (V("AO") + " = " + V("a") + " + " + V("b") + ",  " + V("BC") + " = " + V("AO"), "O je središče šestkotnika; šestkotnik sestavlja šest enakostraničnih trikotnikov."),
        ("!" + V("AC") + " = " + V("a") + " + (" + V("a") + " + " + V("b") + ") = 2" + V("a") + " + " + V("b"), ""),
        ("!" + V("AD") + " = 2" + V("AO") + " = 2" + V("a") + " + 2" + V("b"), ""),
        (V("a") + " · " + V("b") + " = 6 · 6 · cos 120° = −18", "Kot med AB in AF je notranji kot šestkotnika, 120°."),
        ("|" + V("AC") + "|<sup>2</sup> = 4 · 36 + 4 · (−18) + 36 = 108", "Kvadrat dolžine izrazimo s skalarnim produktom."),
        ("!|" + V("AC") + "| = " + K("108") + " = 6" + K("3"), ""),
        ("!" + V("AC") + " · " + V("AD") + " = (2" + V("a") + " + " + V("b") + ") · (2" + V("a") + " + 2" + V("b") + ") = 4 · 36 + 6 · (−18) + 2 · 36 = 108",
         "Skalarni produkt je distributiven."),
    ],
)

n10 = naloga(
    10, ["funkcije", "integralski_racun"], 8,
    r"Graf funkcije \(f: [0, \infty) \to \mathbb{R}\), \(f(x) = \frac{x^2}{2}\), prezrcalimo čez simetralo lihih kvadrantov \(y = x\) in dobimo graf "
    r"funkcije \(g\).<br>"
    r"10.1. Zapiši predpis funkcije \(g\). (2 točki)<br>"
    r"10.2. Izračunaj ploščino območja, ki ga oklepata grafa funkcij \(f\) in \(g\). (6 točk)",
    r"10.1. \(g(x) = \sqrt{2x}\) &nbsp; 10.2. \(\frac{4}{3}\)",
    [
        ("x = " + U("y<sup>2</sup>", "2") + "  ⇒  y = " + K("2x"), "Zrcaljenje čez y = x zamenja vlogi x in y (inverzna funkcija)."),
        ("!10.1  g(x) = " + K("2x") + ",  x ≥ 0", ""),
        (U("x<sup>2</sup>", "2") + " = x  ⇒  x = 0 ali x = 2", "Grafa se sekata na premici y = x."),
        ("@slika", graf([(lambda x: x * x / 2 if x >= 0 else float("nan"), MODRA), (lambda x: math.sqrt(2 * x) if x >= 0 else float("nan"), RDECA)],
                        (-1, 4), (-1, 4), tocke=[(2, 2, "(2, 2)")], sirina=240, visina=240)),
        ("p = " + INT("2", "0") + "(" + K("2x") + " − " + U("x<sup>2</sup>", "2") + ") dx", "Ploščina med grafoma: integral razlike zgornje in spodnje funkcije."),
        ("p = (" + K("2") + " · " + U("2", "3") + "x" + K("x") + " − " + U("x<sup>3</sup>", "6") + ")" + MEJA("2", "0") + " = " + U("8", "3") + " − " + U("4", "3"), ""),
        ("!10.2  p = " + U("4", "3"), ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n11 = naloga(
    11, "verjetnostni_racun", 5,
    r"Hkrati vržemo dve pošteni igralni kocki. Izračunaj verjetnosti dogodkov: \(A\) – kocki pokažeta različno število pik, "
    r"\(B\) – na obeh kockah pade liho število pik, \(C\) – vsota pik je \(9\).",
    r"\(P(A) = \frac{5}{6}\), \(P(B) = \frac{1}{4}\), \(P(C) = \frac{1}{9}\)",
    [
        ("vseh izidov je 6 · 6 = 36", "Klasična definicija verjetnosti."),
        ("!P(A) = 1 − " + U("6", "36") + " = " + U("5", "6"), "Nasprotni dogodek: enako število pik (6 izidov)."),
        ("!P(B) = " + U("3 · 3", "36") + " = " + U("1", "4"), "Na vsaki kocki so 3 liha števila."),
        ("!P(C) = " + U("4", "36") + " = " + U("1", "9"), "Ugodni izidi: (3, 6), (4, 5), (5, 4), (6, 3)."),
    ],
)

n12 = naloga(
    12, "zaporedja_vrste", 6,
    r"Izračunaj vsoto \(a_{11} + a_{12} + \dots + a_{100}\) členov aritmetičnega zaporedja, če je \(a_3 = 8\) in \(a_6 + a_8 = 40\).",
    r"\(14\,895\)",
    [
        (SISTEM("a<sub>1</sub> + 2d = 8", "2a<sub>1</sub> + 12d = 40"), "Splošni člen aritmetičnega zaporedja."),
        ("a<sub>1</sub> + 6d = 20  ⇒  4d = 12,  d = 3,  a<sub>1</sub> = 2", ""),
        ("a<sub>11</sub> = 2 + 10 · 3 = 32,  a<sub>100</sub> = 2 + 99 · 3 = 299", ""),
        ("s = " + U("90", "2") + " (32 + 299) = 45 · 331", "Vsota zaporednih členov: od 11. do 100. člena jih je 90."),
        ("!s = 14 895", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["geometrijski_liki_telesa", "zaporedja_vrste"], 13,
    r"Reši naloge iz geometrije.<br>"
    r"1.1. V krog s polmerom \(6{,}5\ \mathrm{cm}\) včrtamo pravokotnik, katerega stranici sta v razmerju \(12 : 5\). Izračunaj obseg "
    r"pravokotnika. Koliko odstotkov ploščine kroga pokriva pravokotnik? (3 točke)<br>"
    r"1.2. V rombu je razlika dolžin diagonal \(2\ \mathrm{cm}\), ploščina pa \(10\ \mathrm{cm^2}\). Izračunaj dolžini diagonal in stranico. "
    r"Rezultati naj bodo točni. (6 točk)<br>"
    r"1.3. Dolžine stranic trikotnika so prvi trije členi aritmetičnega zaporedja z diferenco \(3\). Ploščina trikotnika je \(54\ \mathrm{cm^2}\). "
    r"Izračunaj dolžine stranic. (4 točke)",
    r"1.1. \(34\ \mathrm{cm}\), \(\approx 45{,}2\,\%\) &nbsp; 1.2. \(e = (1 + \sqrt{21})\ \mathrm{cm}\), \(f = (\sqrt{21} - 1)\ \mathrm{cm}\), "
    r"\(a = \sqrt{11}\ \mathrm{cm}\) &nbsp; 1.3. \(9\), \(12\), \(15\ \mathrm{cm}\)",
    [
        ("(12k)<sup>2</sup> + (5k)<sup>2</sup> = 13<sup>2</sup>  ⇒  k = 1", "Diagonala včrtanega pravokotnika je premer kroga, d = 13 cm."),
        ("!o = 2(12 + 5) = 34 cm", ""),
        (U("12 · 5", "π · 6,5<sup>2</sup>") + " = " + U("60", "132,73") + " ≈ 0,452", "Ploščina kroga πr²."),
        ("!1.1  pravokotnik pokriva ≈ 45,2 % kroga", ""),
        (SISTEM("e − f = 2", U("e · f", "2") + " = 10"), "Ploščina romba s diagonalama."),
        ("f<sup>2</sup> + 2f − 20 = 0  ⇒  f = −1 + " + K("21"), "Kvadratna enačba; negativna rešitev ne pride v poštev."),
        ("!e = 1 + " + K("21") + " cm,  f = " + K("21") + " − 1 cm", ""),
        ("a<sup>2</sup> = (" + U("e", "2") + ")<sup>2</sup> + (" + U("f", "2") + ")<sup>2</sup> = " + U("(22 + 2" + K("21") + ") + (22 − 2" + K("21") + ")", "4") + " = 11",
         "Diagonali romba se razpolavljata pod pravim kotom; Pitagorov izrek."),
        ("!1.2  a = " + K("11") + " cm", ""),
        ("stranice a − 3, a, a + 3;  s = " + U("3a", "2"), "Heronov obrazec."),
        ("54<sup>2</sup> = " + U("3a", "2") + " · (" + U("a", "2") + " + 3) · " + U("a", "2") + " · (" + U("a", "2") + " − 3) = " + U("3a<sup>2</sup>", "4") + " (" + U("a<sup>2</sup>", "4") + " − 9)", ""),
        ("a<sup>4</sup> − 36a<sup>2</sup> − 15 552 = 0  ⇒  a<sup>2</sup> = 144", "Bikvadratna enačba."),
        ("!1.3  9 cm, 12 cm, 15 cm", "Trikotnik je pravokoten: 9 · 12 / 2 = 54."),
    ],
)

v2 = naloga(
    2, ["funkcije", "diferencialni_racun"], 13,
    r"Obvezna naloga. Dani sta funkciji \(f, g: \mathbb{R} \to \mathbb{R}\), \(f(x) = \frac{3x^2}{2} + \cos x\) in \(g(x) = \frac{x^3}{3}\). "
    r"Funkcija \(h\) je definirana s predpisom \(h(x) = \frac{x \cdot f'(x)}{g'(x)}\).<br>"
    r"2.1. Dokaži, da je \(h(x) = 3 - \frac{\sin x}{x}\), in zapiši definicijsko območje funkcije \(h\). (4 točke)<br>"
    r"2.2. Izračunaj \(\lim\limits_{x \to 0} h(x)\). (3 točke)<br>"
    r"2.3. Dokaži, da je funkcija \(h\) soda. (2 točki)<br>"
    r"2.4. Dokaži, da funkcija \(h\) nima ničel. (4 točke)",
    r"2.1. \(D_h = \mathbb{R} \setminus \{0\}\) &nbsp; 2.2. \(2\)",
    [
        ("f '(x) = 3x − sin x,  g '(x) = x<sup>2</sup>", "Odvod potence in kosinusa."),
        ("h(x) = " + U("x(3x − sin x)", "x<sup>2</sup>") + " = " + U("3x − sin x", "x") + " = 3 − " + U("sin x", "x"), "Krajšamo z x ≠ 0."),
        ("!2.1  D<sub>h</sub> = ℝ \\ {0}", "Imenovalec g '(x) = x² je enak 0 pri x = 0."),
        (LIM("x → 0") + " (3 − " + U("sin x", "x") + ") = 3 − 1", "Znana limita: sin x / x → 1."),
        ("!2.2  " + LIM("x → 0") + " h(x) = 2", ""),
        ("h(−x) = 3 − " + U("sin(−x)", "−x") + " = 3 − " + U("−sin x", "−x") + " = h(x)", "Sinus je liha funkcija."),
        ("!2.3  h je soda", "Definicijsko območje je simetrično glede na 0."),
        ("|sin x| < |x|  za x ≠ 0  ⇒  " + U("sin x", "x") + " < 1", "Za x ≠ 0 je |sin x| < |x|."),
        ("!2.4  h(x) > 3 − 1 = 2 > 0, zato h nima ničel", ""),
    ],
)

def f_abs(x):
    return abs(x + 1) + abs(x - 3)

v3 = naloga(
    3, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 14,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dana je funkcija \(f: \mathbb{R} \to \mathbb{R}\), \(f(x) = |x + 1| + |x - 3|\).<br>"
    r"3.1. Zapiši predpis funkcije \(f\) brez absolutne vrednosti. (3 točke)<br>"
    r"3.2. Nariši graf funkcije \(f\). (3 točke)<br>"
    r"3.3. Reši enačbo \(f(x) = 7\). (4 točke)<br>"
    r"3.4. Za katere vrednosti parametra \(a\) enačba \(|x + 1| + |x - 3| = a - 5\) nima rešitve? (4 točke)",
    r"3.3. \(x = -\frac{5}{2}\) ali \(x = \frac{9}{2}\) &nbsp; 3.4. \(a < 9\)",
    [
        ("x < −1:  f(x) = −(x + 1) − (x − 3) = −2x + 2", "Absolutno vrednost razpišemo na intervalih, ki jih določata ničli −1 in 3."),
        ("−1 ≤ x ≤ 3:  f(x) = (x + 1) − (x − 3) = 4", ""),
        ("!3.1  x > 3:  f(x) = (x + 1) + (x − 3) = 2x − 2", ""),
        ("@slika", graf([(f_abs, MODRA)], (-4, 6), (-1, 9), tocke=[(-1, 4, "(−1, 4)"), (3, 4, "(3, 4)")], sirina=320, visina=280)),
        ("−2x + 2 = 7  ⇒  x = −" + U("5", "2") + " < −1", "Na srednjem intervalu je f(x) = 4 ≠ 7."),
        ("2x − 2 = 7  ⇒  x = " + U("9", "2") + " > 3", ""),
        ("!3.3  x = −" + U("5", "2") + " ali x = " + U("9", "2"), ""),
        ("Z<sub>f</sub> = [4, ∞)", "Najmanjša vrednost funkcije je 4 (z grafa)."),
        ("a − 5 < 4", "Enačba f(x) = a − 5 nima rešitve, ko desna stran ni v zalogi vrednosti."),
        ("!3.4  a < 9", ""),
    ],
)

v4 = naloga(
    4, ["kombinatorika", "verjetnostni_racun"], 14,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo).<br>"
    r"4.1. V vreči je \(12\) kroglic, označenih s števili od \(1\) do \(12\) (vsaka z drugim številom). Naključno izvlečemo \(2\) kroglici.<br>"
    r"Izračunaj verjetnost \(P(A)\), da je vsota števil na izvlečenih kroglicah enaka \(7\). (3 točke)<br>"
    r"Izračunaj verjetnost \(P(B)\), da je vsota števil vsaj \(7\). (2 točki)<br>"
    r"Izračunaj verjetnost \(P(C)\), da je vsota enaka \(10\), če sta na izvlečenih kroglicah sodi števili. (2 točki)<br>"
    r"Izračunaj verjetnost \(P(D)\), da je vsota števil najmanjša možna. (2 točki)<br>"
    r"4.2. V vreči je \(k\) kroglic, označenih s števili od \(1\) do \(k\). Naključno izvlečemo \(2\) kroglici. Verjetnost, da je vsota števil "
    r"najmanjša možna, je \(\frac{1}{28}\). Izračunaj \(k\). (5 točk)",
    r"4.1. \(P(A) = \frac{1}{22}\), \(P(B) = \frac{10}{11}\), \(P(C) = \frac{2}{15}\), \(P(D) = \frac{1}{66}\) &nbsp; 4.2. \(k = 8\)",
    [
        ("vseh izborov je " + BINOM("12", "2") + " = 66", "Kombinacije brez ponavljanja."),
        ("!P(A) = " + U("3", "66") + " = " + U("1", "22"), "Ugodni pari: {1, 6}, {2, 5}, {3, 4}."),
        ("vsota ≤ 6: {1, 2}, {1, 3}, {1, 4}, {2, 3}, {1, 5}, {2, 4}", "Nasprotni dogodek."),
        ("!P(B) = 1 − " + U("6", "66") + " = " + U("10", "11"), ""),
        ("sodih kroglic je 6:  " + BINOM("6", "2") + " = 15", "Pogojna verjetnost: omejimo se na izbore dveh sodih števil."),
        ("!P(C) = " + U("2", "15"), "Ugodna para: {2, 8} in {4, 6}."),
        ("!P(D) = " + U("1", "66"), "Najmanjšo vsoto 3 da le par {1, 2}."),
        (U("1", BINOM("k", "2")) + " = " + U("1", "28") + "  ⇒  " + U("k(k − 1)", "2") + " = 28", "Najmanjšo vsoto spet da le par {1, 2}."),
        ("k<sup>2</sup> − k − 56 = 0  ⇒  (k − 8)(k + 7) = 0", ""),
        ("!4.2  k = 8", ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
