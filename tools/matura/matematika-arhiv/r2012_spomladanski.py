# Spomladanski rok 2012 (uradne pole RIC: m121-401-1-1, m121-402-1-1, m121-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2012, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
def premici1(X, Y):
    return (krivulja(X, Y, lambda x: -1.5 * x + 2, -2.67, 4, MODRA) + krivulja(X, Y, lambda x: -1.5 * x - 3, -4, 0.67, RDECA)
            + tocka(X, Y, -2, 5, "A") + f'<text x="{X(-2.4):.1f}" y="{Y(6.2):.1f}" font-size="11" fill="{MODRA}">p₁</text>'
            + f'<text x="{X(-3.9):.1f}" y="{Y(2.6):.1f}" font-size="11" fill="{RDECA}">p₂</text>')

n1 = naloga(
    1, ["pravokotni_koordinatni_sistem_ravnina", "funkcije"], 8,
    r"V koordinatnem sistemu sta narisani vzporedni premici \(p_1\) in \(p_2\). Premica \(p_1\) poteka skozi točko \(A(-2, 5)\). Zapiši "
    r"smerna koeficienta \(k_1\), \(k_2\), začetni vrednosti \(n_1\), \(n_2\) in enačbi obeh premic."
    + mreza((-4, 4), (-7, 7), premici1, sirina=220),
    r"\(p_1\): \(y = -\frac{3}{2}x + 2\); \(p_2\): \(y = -\frac{3}{2}x - 3\)",
    [
        ("p<sub>1</sub> poteka skozi A(−2, 5) in (0, 2)", "Presečišče z osjo y preberemo s slike."),
        ("!k<sub>1</sub> = " + U("2 − 5", "0 + 2") + " = −" + U("3", "2") + ",  n<sub>1</sub> = 2:  y = −" + U("3", "2") + "x + 2", "Smerni koeficient premice skozi dve točki."),
        ("!k<sub>2</sub> = k<sub>1</sub> = −" + U("3", "2") + ",  n<sub>2</sub> = −3:  y = −" + U("3", "2") + "x − 3", "Vzporedni premici imata enak smerni koeficient; p₂ seka os y v (0, −3)."),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 8,
    r"Okrajšaj ulomka.<br>"
    r"2.1. \(\dfrac{x^2 - x - 6}{x^2 - 9}\), \(x \ne \pm 3\) (3 točke) &nbsp; 2.2. \(\dfrac{x^4 - 9x^2}{x^5 + 3x^4}\), \(x \ne 0\), \(x \ne -3\) (5 točk)",
    r"2.1. \(\frac{x + 2}{x + 3}\) &nbsp; 2.2. \(\frac{x - 3}{x^2}\)",
    [
        ("!2.1  " + U("(x − 3)(x + 2)", "(x − 3)(x + 3)") + " = " + U("x + 2", "x + 3"), "Razcep kvadratnega trinoma in razlika kvadratov."),
        (U("x<sup>2</sup>(x<sup>2</sup> − 9)", "x<sup>4</sup>(x + 3)") + " = " + U("x<sup>2</sup>(x − 3)(x + 3)", "x<sup>4</sup>(x + 3)"), "Izpostavimo skupni faktor."),
        ("!2.2  " + U("x − 3", "x<sup>2</sup>"), "Okrajšamo z x²(x + 3)."),
    ],
)

n3 = naloga(
    3, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Tone je kupil dve čelni svetilki in tri pohodne palice ter plačal \(87\) €. Tina je po enakih cenah kupila štiri čelne svetilke in eno "
    r"pohodno palico ter plačala \(99\) €. Koliko stane čelna svetilka in koliko pohodna palica?",
    r"svetilka \(21\) €, palica \(15\) €",
    [
        (SISTEM("2s + 3p = 87", "4s + p = 99"), "Sistem dveh linearnih enačb."),
        ("p = 99 − 4s  ⇒  2s + 297 − 12s = 87", "Metoda zamenjave."),
        ("s = 21,  p = 15", ""),
        ("!čelna svetilka stane 21 €, pohodna palica 15 €", ""),
    ],
)

def f4(x):
    if x < -3 or x > 3:
        return float("nan")
    if x <= -1:
        return x + 3
    if x <= 1:
        return -1.5 * x + 0.5
    return x - 2

n4 = naloga(
    4, "funkcije", 5,
    r"Na sliki je graf funkcije \(f\) (lomljena črta skozi točke \((-3, 0)\), \((-1, 2)\), \((1, -1)\) in \((3, 1)\)). Nariši še grafe funkcij "
    r"\(g_1(x) = -f(x)\), \(g_2(x) = f(x) - 2\), \(g_3(x) = f(x + 1)\), \(g_4(x) = \frac{1}{2}f(x)\) in \(g_5(x) = |f(x)|\)."
    + graf([(f4, MODRA)], (-5, 5), (-3, 3), tocke=[(-3, 0, ""), (-1, 2, ""), (1, -1, ""), (3, 1, "")], sirina=300, visina=190),
    r"premiki in raztegi grafa (glej rešitev)",
    [
        ("@slika", graf([(f4, MODRA), (lambda x: -f4(x), RDECA)], (-5, 5), (-3, 3), sirina=240, visina=160)),
        ("!g<sub>1</sub> = −f: zrcaljenje čez os x", "Vse ordinate spremenijo predznak."),
        ("@slika", graf([(f4, MODRA), (lambda x: f4(x) - 2, RDECA)], (-5, 5), (-4, 3), sirina=240, visina=180)),
        ("!g<sub>2</sub> = f − 2: premik za 2 navzdol", ""),
        ("@slika", graf([(f4, MODRA), (lambda x: f4(x + 1), RDECA)], (-5, 5), (-3, 3), sirina=240, visina=160)),
        ("!g<sub>3</sub>(x) = f(x + 1): premik za 1 v levo", "Premik vzdolž osi x je v nasprotni smeri predznaka."),
        ("@slika", graf([(f4, MODRA), (lambda x: f4(x) / 2, RDECA)], (-5, 5), (-3, 3), sirina=240, visina=160)),
        ("!g<sub>4</sub> = ½ f: skrčitev v smeri osi y s faktorjem ½", "Ničle ostanejo na mestu."),
        ("@slika", graf([(f4, MODRA), (lambda x: abs(f4(x)), RDECA)], (-5, 5), (-3, 3), sirina=240, visina=160)),
        ("!g<sub>5</sub> = |f|: dele pod osjo x prezrcalimo nad os", ""),
    ],
)

n5 = naloga(
    5, ["stevilske_mnozice", "verjetnostni_racun"], 7,
    r"Zapiši vse naravne delitelje števila \(40\) in prvih šest večkratnikov števila \(4\). Nato naključno izberemo eno od števil od \(1\) do "
    r"\(40\). Izračunaj verjetnosti dogodkov: \(A\) – izberemo število \(7\); \(B\) – izberemo število, ki je delitelj števila \(40\) in hkrati "
    r"večkratnik števila \(4\); \(C\) – izberemo število, ki je delitelj števila \(40\) ali večkratnik števila \(4\).",
    r"delitelji: \(1, 2, 4, 5, 8, 10, 20, 40\); večkratniki: \(4, 8, 12, 16, 20, 24\); \(P(A) = \frac{1}{40}\), \(P(B) = \frac{1}{10}\), \(P(C) = \frac{7}{20}\)",
    [
        ("!D<sub>40</sub> = {1, 2, 4, 5, 8, 10, 20, 40}", "Delitelji v parih: 1 · 40, 2 · 20, 4 · 10, 5 · 8."),
        ("!4, 8, 12, 16, 20, 24", "Večkratniki števila 4."),
        ("!P(A) = " + U("1", "40"), "Klasična definicija verjetnosti."),
        ("!P(B) = " + U("4", "40") + " = " + U("1", "10"), "Delitelji, ki so večkratniki števila 4: 4, 8, 20, 40."),
        ("večkratnikov števila 4 do 40 je 10", ""),
        ("!P(C) = " + U("8 + 10 − 4", "40") + " = " + U("14", "40") + " = " + U("7", "20"), "Verjetnost unije: P(D ∪ V) = P(D) + P(V) − P(D ∩ V)."),
    ],
)

def kvadrat6():
    s, ox, oy = 30, 30, 210
    P = lambda x, y: (ox + s * x, oy - s * y)
    A, B, C, D = P(0, 0), P(6, 0), P(6, 6), P(0, 6)
    pot = f"M{A[0]},{A[1]} A{6 * s},{6 * s} 0 0,1 {C[0]},{C[1]} L{D[0]},{D[1]} Z"
    t = (f'<path d="{pot}" fill="{MODRA}" fill-opacity="0.25"/>'
         f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>'
         f'<path d="M{A[0]},{A[1]} A{6 * s},{6 * s} 0 0,1 {C[0]},{C[1]}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    for (x, y), n, dx, dy in ((A, "A", -14, 14), (B, "B", 4, 14), (C, "C", 4, -4), (D, "D", -14, -4)):
        t += f'<text x="{x + dx}" y="{y + dy}" font-size="12" fill="currentColor">{n}</text>'
    return svg(240, 240, t)

n6 = naloga(
    6, "geometrijski_liki_telesa", 6,
    r"V kvadratu \(ABCD\) s stranico \(6\) narišemo krožni lok s središčem v oglišču \(B\) od \(A\) do \(C\). Natančno izračunaj obseg in "
    r"ploščino osenčenega lika." + kvadrat6(),
    r"\(o = 12 + 3\pi\), \(S = 36 - 9\pi\)",
    [
        ("lok = " + U("1", "4") + " · 2π · 6 = 3π", "Četrtina obsega kroga s polmerom 6."),
        ("!o = 6 + 6 + 3π = 12 + 3π", "Lik omejujeta stranici AD, DC in lok."),
        ("!S = 6<sup>2</sup> − " + U("1", "4") + " · π · 6<sup>2</sup> = 36 − 9π", "Kvadrat brez četrtine kroga."),
    ],
)

n7 = naloga(
    7, "funkcije", 6,
    r"Izračunaj osnovo \(a\) logaritemske funkcije \(f(x) = \log_a x\), katere graf poteka skozi točko \(A\left(\frac{1}{27}, -\frac{3}{2}\right)\).",
    r"\(a = 9\)",
    [
        ("log<sub>a</sub> " + U("1", "27") + " = −" + U("3", "2") + "  ⇒  a<sup>−3/2</sup> = " + U("1", "27"), "Definicija logaritma."),
        ("a<sup>3/2</sup> = 27  ⇒  a = 27<sup>2/3</sup>", ""),
        ("!a = 9", "27^(2/3) = (∛27)² = 9."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

def vektorja8(X, Y):
    def puscica(x, y, barva, ime, dx=4, dy=-4):
        return (f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(x):.1f}" y2="{Y(y):.1f}" stroke="{barva}" stroke-width="2" marker-end="url(#ost)"/>'
                f'<text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="12" fill="{barva}">{ime}</text>')
    return ('<defs><marker id="ost" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="currentColor"/></marker></defs>'
            + puscica(3, 1, MODRA, "a") + puscica(-1, 2, RDECA, "b"))

n8 = naloga(
    8, "vektorji_ravnina_prostor", 7,
    r"V koordinatnem sistemu sta narisana vektorja \(\vec{a}\) in \(\vec{b}\). Zapiši ju s komponentama. Izračunaj vektor "
    r"\(\vec{c} = 2\vec{a} - \vec{b}\) in ga nariši. Izračunaj še vektor \((\vec{a} \cdot \vec{b})\,\vec{a}\)."
    + mreza((-2, 8), (-2, 3), vektorja8, sirina=320),
    r"\(\vec{a} = (3, 1)\), \(\vec{b} = (-1, 2)\), \(\vec{c} = (7, 0)\), \((\vec{a} \cdot \vec{b})\vec{a} = (-3, -1)\)",
    [
        ("!" + V("a") + " = (3, 1),  " + V("b") + " = (−1, 2)", "Komponente preberemo kot premik od začetne do končne točke."),
        ("!" + V("c") + " = (6, 2) − (−1, 2) = (7, 0)", "Množenje s skalarjem in odštevanje po komponentah."),
        (V("a") + " · " + V("b") + " = −3 + 2 = −1", "Skalarni produkt."),
        ("!(" + V("a") + " · " + V("b") + ")" + V("a") + " = −(3, 1) = (−3, −1)", ""),
    ],
)

n9 = naloga(
    9, "geometrijski_liki_telesa", 7,
    r"V trikotniku \(ABC\) je \(\alpha = 40^\circ\), \(\beta = 65^\circ\) in \(a = 8\ \mathrm{cm}\). Na milimeter natančno izračunaj stranico \(b\), "
    r"nato ploščino trikotnika na \(\mathrm{cm^2}\) natančno.",
    r"\(b \approx 11{,}28\ \mathrm{cm}\), \(S \approx 44\ \mathrm{cm^2}\)",
    [
        ("b = " + U("a sin β", "sin α") + " = " + U("8 · sin 65°", "sin 40°"), "Sinusni izrek."),
        ("!b ≈ 11,28 cm", ""),
        ("γ = 180° − 40° − 65° = 75°", "Vsota notranjih kotov trikotnika."),
        ("!S = " + U("1", "2") + " a b sin γ ≈ " + U("1", "2") + " · 8 · 11,28 · sin 75° ≈ 44 cm<sup>2</sup>", "Ploščina trikotnika s sinusom kota."),
    ],
)

n10 = naloga(
    10, "algebrski_izrazi_enacbe_neenacbe", 7,
    r"Pokaži, da je število \(3\) ničla polinoma \(p(x) = x^3 - 5x^2 + 11x - 15\). Poišči preostali ničli. Zapiši presečišče \(N\) grafa z "
    r"ordinatno osjo in točko \(T\) na grafu z absciso \(1\).",
    r"\(x = 1 \pm 2i\); \(N(0, -15)\), \(T(1, -8)\)",
    [
        ("p(3) = 27 − 45 + 33 − 15 = 0", "Ničla polinoma."),
        ("p(x) = (x − 3)(x<sup>2</sup> − 2x + 5)", "Hornerjev algoritem."),
        ("!x = " + U("2 ± " + K("4 − 20"), "2") + " = 1 ± 2i", "Kvadratna enačba z negativno diskriminanto."),
        ("!N(0, −15),  T(1, −8)", "p(0) = −15, p(1) = 1 − 5 + 11 − 15."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

n11 = naloga(
    11, "zaporedja_vrste", 7,
    r"Števila \(x + 4\), \(2x + 3\) in \(5x - 4\) tvorijo končno aritmetično zaporedje. Izračunaj \(x\) in zapiši zaporedje.",
    r"\(x = 3\): \(7, 9, 11\)",
    [
        ("2(2x + 3) = (x + 4) + (5x − 4)", "Srednji člen je aritmetična sredina sosednjih."),
        ("4x + 6 = 6x  ⇒  x = 3", ""),
        ("!7, 9, 11", "Diferenca je 2."),
    ],
)

def f12(x):
    return x + 4 / x

n12 = naloga(
    12, ["diferencialni_racun", "funkcije"], 6,
    r"Na sliki je graf funkcije \(f(x) = x + \frac{4}{x}\). Izračunaj odvod funkcije. V točki \(A\) ima funkcija lokalni maksimum. Zapiši "
    r"razdaljo \(d_1\) točke \(A\) od premice \(x = 3\) in razdaljo \(d_2\) točke \(A\) od premice \(y = 2\)."
    + graf([(f12, MODRA)], (-7, 7), (-9, 9), tocke=[(-2, -4, "A")], sirina=300, visina=330),
    r"\(f'(x) = 1 - \frac{4}{x^2}\); \(A(-2, -4)\), \(d_1 = 5\), \(d_2 = 6\)",
    [
        ("!f '(x) = 1 − " + U("4", "x<sup>2</sup>"), "Odvod potence: (4x⁻¹)' = −4x⁻²."),
        ("f '(x) = 0  ⇒  x = ±2", "Stacionarne točke."),
        ("A(−2, −4)", "Lokalni maksimum je pri x = −2 (s slike; f' preide iz + v −)."),
        ("!d<sub>1</sub> = |−2 − 3| = 5,  d<sub>2</sub> = |−4 − 2| = 6", "Razdalja do navpične oziroma vodoravne premice."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Dani sta funkciji \(f(x) = x^5\) in \(g(x) = \frac{1}{x}\).<br>"
    r"1.1. Nariši grafa funkcij \(f\) in \(g\). (2 točki)<br>"
    r"1.2. Grafa se sekata dvakrat, obakrat pod istim kotom. Izračunaj odvoda funkcij in kot med grafoma v enem od presečišč. (4 točke)<br>"
    r"1.3. Natančno izračunaj število \(b > 1\), za katero je ploščina lika, omejenega z grafoma \(f\) in \(g\), abscisno osjo in premico "
    r"\(x = b\), enaka \(3\). (4 točke)<br>"
    r"1.4. Naj bo \(a > 0\). Graf funkcije \(f_1\) dobimo tako, da graf funkcije \(f\) premaknemo za \(a\) v desno in za \(1\) navzgor. Zapiši "
    r"predpis \(f_1\). Zapiši še asimptoti grafa funkcije \(g_1(x) = \frac{1}{x + a} - 1\). (4 točke)",
    r"1.2. \(\varphi \approx 56{,}31^\circ\) &nbsp; 1.3. \(b = e^{17/6}\) &nbsp; 1.4. \(f_1(x) = (x - a)^5 + 1\); \(x = -a\), \(y = -1\)",
    [
        ("@slika", graf([(lambda x: x ** 5, MODRA), (lambda x: 1 / x, RDECA)], (-3, 3), (-3, 3), tocke=[(1, 1, ""), (-1, -1, "")], sirina=260, visina=260)),
        ("x<sup>5</sup> = " + U("1", "x") + "  ⇒  x<sup>6</sup> = 1  ⇒  x = ±1", "Presečišči (1, 1) in (−1, −1); obe funkciji sta lihi."),
        ("f '(x) = 5x<sup>4</sup>,  g '(x) = −" + U("1", "x<sup>2</sup>"), ""),
        ("pri x = 1: k<sub>1</sub> = 5,  k<sub>2</sub> = −1", "Smerna koeficienta tangent."),
        ("!tan φ = |" + U("5 − (−1)", "1 + 5 · (−1)") + "| = " + U("3", "2") + "  ⇒  φ ≈ 56,31°", "Kot med krivuljama je kot med tangentama."),
        ("p = " + INT("1", "0") + "x<sup>5</sup> dx + " + INT("b", "1") + U("dx", "x") + " = " + U("1", "6") + " + ln b", "Do x = 1 je spodaj graf f, od x = 1 do b graf g."),
        (U("1", "6") + " + ln b = 3  ⇒  ln b = " + U("17", "6"), "Integral 1/x je ln x."),
        ("!b = e<sup>17/6</sup> ≈ 17,0", ""),
        ("!f<sub>1</sub>(x) = (x − a)<sup>5</sup> + 1", "Premik v desno: x zamenjamo z x − a; premik navzgor prištejemo."),
        ("!asimptoti grafa g<sub>1</sub>: x = −a,  y = −1", "Graf g premaknemo za a v levo in za 1 navzdol."),
    ],
)

v2 = naloga(
    2, "stoznice", 14,
    r"Obvezna naloga. Reši naloge o krožnicah.<br>"
    r"2.1. Premica se v točki \(A(3, -4)\) dotika krožnice \(x^2 + y^2 = 25\). Zapiši enačbo premice. (3 točke)<br>"
    r"2.2. Kakšna je medsebojna lega premice \(y = 2x - 1\) in krožnice \(x^2 + y^2 - 6x + 2y + 5 = 0\)? Utemelji. (3 točke)<br>"
    r"2.3. Izračunaj realno število \(a\), da bo os \(x\) tangenta krožnice \(x^2 + y^2 - 2ax + 6y + 2a + 3 = 0\). (4 točke)<br>"
    r"2.4. Izračunaj realno število \(b\), da bo središče krožnice \(x^2 + y^2 - 2bx + 6y + b + 1 = 0\) ležalo na premici \(y = 2x - 1\). (4 točke)",
    r"2.1. \(3x - 4y = 25\) &nbsp; 2.2. premica krožnice ne seka &nbsp; 2.3. \(a = 3\) ali \(a = -1\) &nbsp; 2.4. \(b = -1\)",
    [
        ("tangenta je pravokotna na polmer SA = (3, −4)", "Tangenta na krožnico je pravokotna na polmer v dotikališču."),
        ("!2.1  3x − 4y = 25", "Premica z normalo (3, −4) skozi A: 3 · 3 − 4 · (−4) = 25."),
        ("(x − 3)<sup>2</sup> + (y + 1)<sup>2</sup> = 5:  S(3, −1),  r = " + K("5"), "Dopolnimo do popolnih kvadratov."),
        ("d = " + U("|2 · 3 − (−1) − 1|", K("4 + 1")) + " = " + U("6", K("5")) + " > " + K("5"), "Razdalja središča od premice 2x − y − 1 = 0."),
        ("!2.2  premica in krožnica nimata skupnih točk", "Razdalja je večja od polmera."),
        ("S(a, −3),  r<sup>2</sup> = a<sup>2</sup> + 9 − 2a − 3", ""),
        ("r = |−3| = 3  ⇒  a<sup>2</sup> − 2a − 3 = 0", "Os x se dotika krožnice, ko je polmer enak razdalji središča od osi x."),
        ("!2.3  a = 3 ali a = −1", ""),
        ("S(b, −3):  −3 = 2b − 1", "Središče vstavimo v enačbo premice."),
        ("!2.4  b = −1", "Preverimo r² = 1 + 9 + 1 − 1 = 10 > 0."),
    ],
)

v3 = naloga(
    3, "zaporedja_vrste", 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dano je geometrijsko zaporedje \(1, \frac{1}{3}, \frac{1}{9}, \frac{1}{27}, \dots\) s splošnim "
    r"členom \(a_n\).<br>"
    r"3.1. Izračunaj vsoto geometrijske vrste \(1 + \frac{1}{3} + \frac{1}{9} + \frac{1}{27} + \dots\) (3 točke)<br>"
    r"3.2. Zapiši splošni člen \(a_n\). Kateri člen je enak \(3^{-2012}\)? (3 točke)<br>"
    r"3.3. Kateri členi zaporedja \(b_n = \frac{1}{a_n}\) so večji od \(10\) in manjši od \(10^4\)? (3 točke)<br>"
    r"3.4. Zapiši splošni člen aritmetičnega zaporedja \(c_n = \log_3 \frac{1}{a_n}\) in seštej prvih trideset členov. (3 točke)",
    r"3.1. \(\frac{3}{2}\) &nbsp; 3.2. \(a_n = 3^{1 - n}\), \(n = 2013\) &nbsp; 3.3. \(b_4, \dots, b_9\) &nbsp; 3.4. \(c_n = n - 1\), \(435\)",
    [
        ("!3.1  s = " + U("1", "1 − 1/3") + " = " + U("3", "2"), "Vsota geometrijske vrste s |q| < 1."),
        ("!a<sub>n</sub> = 3<sup>1 − n</sup>", "Splošni člen geometrijskega zaporedja."),
        ("!1 − n = −2012  ⇒  n = 2013", ""),
        ("b<sub>n</sub> = 3<sup>n − 1</sup>:  10 < 3<sup>n − 1</sup> < 10 000", ""),
        ("3<sup>3</sup> = 27,  3<sup>8</sup> = 6561,  3<sup>9</sup> = 19 683", ""),
        ("!3.3  členi b<sub>4</sub> do b<sub>9</sub> (od 27 do 6561)", ""),
        ("!c<sub>n</sub> = log<sub>3</sub> 3<sup>n − 1</sup> = n − 1", "Logaritem potence."),
        ("!3.4  s<sub>30</sub> = " + U("30", "2") + "(0 + 29) = 435", "Vsota členov aritmetičnega zaporedja."),
    ],
)

def simetrala_v4(X, Y):
    return (krivulja(X, Y, lambda x: -3 * x + 5, 0.4, 2.4, RDECA) + tocka(X, Y, 3, 1, "z₁") + tocka(X, Y, 0, 0, "0", dx=-12, dy=13)
            + f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(3):.1f}" y2="{Y(1):.1f}" stroke="currentColor" stroke-dasharray="4 3"/>')

v4 = naloga(
    4, "stevilske_mnozice", 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dano je kompleksno število \(z_1 = 3 + i\).<br>"
    r"4.1. Poišči kompleksno število \(w\), za katero je \(2w + \bar{w} = \frac{10}{z_1} + 4\). (4 točke)<br>"
    r"4.2. Za katera realna števila \(a\) je \(|a + 3i| = |z_1|\)? (3 točke)<br>"
    r"4.3. Za katera realna števila \(b\) je \((b + z_1)^2\) čisto imaginarno število? (2 točki)<br>"
    r"4.4. Nariši množico vseh kompleksnih števil \(z = x + yi\), ki so enako oddaljena od \(z_1\) in od izhodišča. Med \(x\) in \(y\) velja "
    r"zveza \(y = kx + n\). Izračunaj \(k\) in \(n\). (3 točke)",
    r"4.1. \(w = \frac{7}{3} - i\) &nbsp; 4.2. \(a = \pm 1\) &nbsp; 4.3. \(b = -2\) ali \(b = -4\) &nbsp; 4.4. \(k = -3\), \(n = 5\)",
    [
        (U("10", "3 + i") + " = " + U("10(3 − i)", "10") + " = 3 − i", "Ulomek razširimo s konjugirano vrednostjo."),
        ("w = x + yi:  2x + 2yi + x − yi = 3x + yi = 7 − i", ""),
        ("!4.1  w = " + U("7", "3") + " − i", "Primerjamo realna in imaginarna dela."),
        ("a<sup>2</sup> + 9 = 10", "|z₁| = √10; absolutna vrednost kompleksnega števila."),
        ("!4.2  a = ±1", ""),
        ("(b + 3 + i)<sup>2</sup> = (b + 3)<sup>2</sup> − 1 + 2(b + 3)i", ""),
        ("!4.3  (b + 3)<sup>2</sup> = 1  ⇒  b = −2 ali b = −4", "Realni del je 0, imaginarni ni 0."),
        ("x<sup>2</sup> + y<sup>2</sup> = (x − 3)<sup>2</sup> + (y − 1)<sup>2</sup>  ⇒  6x + 2y = 10", "Točke, enako oddaljene od dveh točk, ležijo na simetrali daljice."),
        ("@slika", mreza((-1, 4), (-2, 4), simetrala_v4, sirina=220)),
        ("!4.4  y = −3x + 5:  k = −3,  n = 5", ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
