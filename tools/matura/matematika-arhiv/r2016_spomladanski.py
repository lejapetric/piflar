# Spomladanski rok 2016 (uradne pole RIC: m161-401-1-1, m161-402-1-1, m161-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2016, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "stevilske_mnozice", 8,
    r"Za naravni števili \(m\) in \(n\) označimo z \(D(m, n)\) njun največji skupni delitelj in z \(v(m, n)\) njun najmanjši skupni večkratnik.<br>"
    r"1.1. Razcepi števila \(36\), \(54\) in \(90\) na prafaktorje. (2 točki)<br>"
    r"1.2. Izračunaj \(\left(\frac{D(36, 54)}{D(54, 90)} \cdot \frac{D(7, 13)}{v(6, 9)}\right) \cdot v(3, 12)\). (6 točk)",
    r"1.1. \(36 = 2^2 \cdot 3^2\), \(54 = 2 \cdot 3^3\), \(90 = 2 \cdot 3^2 \cdot 5\) &nbsp; 1.2. \(\frac{2}{3}\)",
    [
        ("!1.1  36 = 2<sup>2</sup> · 3<sup>2</sup>,  54 = 2 · 3<sup>3</sup>,  90 = 2 · 3<sup>2</sup> · 5", "Razcep na prafaktorje."),
        ("D(36, 54) = 2 · 3<sup>2</sup> = 18,  D(54, 90) = 2 · 3<sup>2</sup> = 18", "Največji skupni delitelj: skupni prafaktorji z najmanjšimi eksponenti."),
        ("D(7, 13) = 1,  v(6, 9) = 18,  v(3, 12) = 12", "7 in 13 sta tuji števili; najmanjši skupni večkratnik."),
        ("(" + U("18", "18") + " · " + U("1", "18") + ") · 12 = " + U("12", "18"), ""),
        ("!1.2  " + U("2", "3"), ""),
    ],
)

def premica2(X, Y):
    return (f'<line x1="{X(-2.33):.1f}" y1="{Y(-4):.1f}" x2="{X(4.33):.1f}" y2="{Y(6):.1f}" stroke="{MODRA}" stroke-width="2"/>'
            + tocka(X, Y, -1, -2, "A", dx=6, dy=12) + tocka(X, Y, 3, 4, "B", dx=-14) +
            f'<text x="{X(3.6):.1f}" y="{Y(4.6):.1f}" font-size="11" fill="currentColor">p</text>')

n2 = naloga(
    2, ["pravokotni_koordinatni_sistem_ravnina", "funkcije"], 6,
    r"Premica \(p\) na sliki poteka skozi točki \(A\) in \(B\), ki ležita v vozliščih mreže. Zapiši enačbo premice in izračunaj ostri kot, "
    r"ki ga premica oklepa z abscisno osjo. Kot zaokroži na stotinko stopinje."
    + mreza((-3, 5), (-4, 6), premica2, sirina=240),
    r"\(y = \frac{3}{2}x - \frac{1}{2}\), \(\varphi \approx 56{,}31^\circ\)",
    [
        ("A(−1, −2),  B(3, 4)", "Koordinati točk preberemo s slike."),
        ("k = " + U("4 − (−2)", "3 − (−1)") + " = " + U("3", "2"), "Smerni koeficient premice skozi dve točki."),
        ("!y = " + U("3", "2") + "x − " + U("1", "2"), "Enačba premice skozi točko B: y − 4 = 3/2 (x − 3)."),
        ("tan φ = k = 1,5", "Smerni koeficient je tangens naklonskega kota."),
        ("!φ ≈ 56,31°", ""),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n3 = naloga(
    3, ["potence_koreni", "algebrski_izrazi_enacbe_neenacbe"], 5,
    r"Naj bosta \(a\) in \(b\) realni števili, \(a > 0\) in \(b \ne 0\). Vsak izraz v levem stolpcu je enak enemu izrazu v desnem stolpcu, ki so "
    r"označeni s črkami od A do L. V preglednico vpiši črko enakega izraza (prva vrstica je že izpolnjena)."
    + tabela(["Izraz", "Črka"], [["\\(a^0\\)", "L"], ["\\((a^2 b)^3\\)", ""], ["\\((a + b)^2\\)", ""], ["\\((a^2 b) : (ab)^3\\)", ""],
                                 ["\\(\\sqrt{a^4 b^2}\\)", ""], ["\\(\\sqrt[3]{a^6 b^3}\\)", ""]])
    + r"(A) \(a^6 b^3\) &nbsp; (B) \(a^5 b^3\) &nbsp; (C) \(a^2 + b^2\) &nbsp; (D) \(a^2 + 2ab + b^2\) &nbsp; (E) \(a^{-1} b^{-2}\) &nbsp; "
      r"(F) \(a^{-1} b^{-1}\) &nbsp; (G) \(a^2 |b|\) &nbsp; (H) \(a^2 b\) &nbsp; (I) \(a^3 b\) &nbsp; (J) \(-1\) &nbsp; (K) \(b\) &nbsp; (L) \(1\)",
    r"A, D, E, G, H",
    [
        ("!(a<sup>2</sup>b)<sup>3</sup> = a<sup>6</sup>b<sup>3</sup>  →  A", "Potenca produkta in potenca potence."),
        ("!(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>  →  D", "Kvadrat dvočlenika."),
        ("!" + U("a<sup>2</sup>b", "a<sup>3</sup>b<sup>3</sup>") + " = a<sup>−1</sup>b<sup>−2</sup>  →  E", "Deljenje potenc z enako osnovo."),
        ("!" + K("a<sup>4</sup>b<sup>2</sup>") + " = a<sup>2</sup>|b|  →  G", "Kvadratni koren kvadrata je absolutna vrednost: b je lahko negativen."),
        ("!" + K("a<sup>6</sup>b<sup>3</sup>", "3") + " = a<sup>2</sup>b  →  H", "Liha stopnja korena ohrani predznak."),
    ],
)

n4 = naloga(
    4, "zaporedja_vrste", 6,
    r"Med števili \(3\) in \(2187\) vrini pet števil tako, da dobiš a) prvih sedem členov aritmetičnega zaporedja, b) prvih sedem členov "
    r"naraščajočega geometrijskega zaporedja. Izračunaj diferenco \(d\) in kvocient \(q\) ter zapiši vrinjene člene obeh zaporedij.",
    r"a) \(d = 364\): \(367, 731, 1095, 1459, 1823\) &nbsp; b) \(q = 3\): \(9, 27, 81, 243, 729\)",
    [
        ("a<sub>7</sub> = a<sub>1</sub> + 6d:  2187 = 3 + 6d", "Splošni člen aritmetičnega zaporedja."),
        ("!d = 364;  367, 731, 1095, 1459, 1823", ""),
        ("a<sub>7</sub> = a<sub>1</sub>q<sup>6</sup>:  q<sup>6</sup> = " + U("2187", "3") + " = 729 = 3<sup>6</sup>", "Splošni člen geometrijskega zaporedja."),
        ("!q = 3;  9, 27, 81, 243, 729", "Zaporedje je naraščajoče, zato q = −3 ne pride v poštev."),
    ],
)

n5 = naloga(
    5, "stevilske_mnozice", 6,
    r"Določi realni števili \(x\) in \(y\), da bo veljalo \((3 + ix)(4 - i) = 17 + iy\).",
    r"\(x = 5\), \(y = 17\)",
    [
        ("(3 + ix)(4 − i) = 12 − 3i + 4ix − i<sup>2</sup>x = (12 + x) + (4x − 3)i", "Množimo člen s členom, i² = −1."),
        (SISTEM("12 + x = 17", "4x − 3 = y"), "Kompleksni števili sta enaki, ko se ujemata realna in imaginarna dela."),
        ("!x = 5,  y = 17", ""),
    ],
)

def p6(x):
    return 0.5 * (x + 3) * (x + 1) * (x - 2)

n6 = naloga(
    6, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 8,
    r"Na sliki je graf polinoma \(p\) tretje stopnje z ničlami \(x_1 = -3\), \(x_2 = -1\) in \(x_3 = 2\), ki seka ordinatno os v točki \(T(0, -3)\)."
    + graf([(p6, MODRA)], (-4, 3), (-5, 3), tocke=[(-3, 0, ""), (-1, 0, ""), (2, 0, ""), (0, -3, "T")], sirina=300, visina=290)
    + r"6.1. Ali je vodilni koeficient pozitiven ali negativen? Ali je prosti člen pozitiven ali negativen? Koliko realnih rešitev ima "
      r"enačba \(p(x) = 0\)? (2 točki)<br>"
      r"6.2. Zapiši predpis polinoma \(p\). (3 točke)<br>"
      r"6.3. Zapiši ostanek pri deljenju polinoma \(p\) s polinomom \(q(x) = x^2 - 1\). (3 točke)",
    r"6.1. pozitiven, negativen, \(3\) &nbsp; 6.2. \(p(x) = \frac{1}{2}(x + 3)(x + 1)(x - 2)\) &nbsp; 6.3. \(r(x) = -2x - 2\)",
    [
        ("!6.1  vodilni koeficient je pozitiven, prosti člen negativen, enačba ima 3 rešitve",
         "Za velike x so vrednosti pozitivne; prosti člen je p(0) = −3; graf seka os x trikrat."),
        ("p(x) = a(x + 3)(x + 1)(x − 2)", "Ničelna oblika polinoma."),
        ("p(0) = a · 3 · 1 · (−2) = −6a = −3  ⇒  a = " + U("1", "2"), ""),
        ("!6.2  p(x) = " + U("1", "2") + "(x + 3)(x + 1)(x − 2) = " + U("1", "2") + "(x<sup>3</sup> + 2x<sup>2</sup> − 5x − 6)", ""),
        ("p(x) = (x<sup>2</sup> − 1) · k(x) + mx + n", "Ostanek pri deljenju s polinomom 2. stopnje je največ 1. stopnje."),
        (SISTEM("p(1) = m + n = −4", "p(−1) = −m + n = 0"), "Vstavimo ničli delitelja x = ±1."),
        ("!6.3  r(x) = −2x − 2", ""),
    ],
)

n7 = naloga(
    7, "geometrijski_liki_telesa", 8,
    r"V trapezu \(ABCD\) meri osnovnica \(a = |AB| = 10\ \mathrm{cm}\), osnovnica \(c = |CD| = 3\ \mathrm{cm}\), krak \(d = |AD| = 4\ \mathrm{cm}\) "
    r"in kot \(\alpha = 60^\circ\).<br>"
    r"7.1. Načrtaj trapez. Skozi oglišče \(D\) nariši vzporednico \(p\) h kraku \(b = BC\); premica \(p\) seka osnovnico \(AB\) v točki \(E\). "
    r"Zapiši razmerje \(|AE| : |EB|\). (3 točke)<br>"
    r"7.2. Izračunaj obseg in ploščino trapeza. Rezultata naj bosta točna. (5 točk)",
    r"7.1. \(7 : 3\) &nbsp; 7.2. \(o = (17 + \sqrt{37})\ \mathrm{cm}\), \(S = 13\sqrt{3}\ \mathrm{cm^2}\)",
    [
        ("EBCD je paralelogram  ⇒  |EB| = c = 3,  |AE| = 7", "Nasprotni stranici paralelograma sta enako dolgi."),
        ("!7.1  |AE| : |EB| = 7 : 3", ""),
        ("v = d sin 60° = 4 · " + U(K("3"), "2") + " = 2" + K("3") + ",  d cos 60° = 2", "Pravokotni trikotnik ob kraku d."),
        ("b<sup>2</sup> = v<sup>2</sup> + (10 − 3 − 2)<sup>2</sup> = 12 + 25 = 37", "Pitagorov izrek ob kraku b."),
        ("!o = 10 + 3 + 4 + " + K("37") + " = 17 + " + K("37") + " cm", ""),
        ("!S = " + U("a + c", "2") + " · v = " + U("13", "2") + " · 2" + K("3") + " = 13" + K("3") + " cm<sup>2</sup>", "Ploščina trapeza."),
    ],
)

n8 = naloga(
    8, ["geometrijski_liki_telesa", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Zemljišče s ploščino \(391\ \mathrm{m^2}\) ima obliko pravokotnika. Za ograditev bi potrebovali \(80\ \mathrm{m}\) ograje. "
    r"Izračunaj dolžino in širino zemljišča.",
    r"\(23\ \mathrm{m}\) in \(17\ \mathrm{m}\)",
    [
        (SISTEM("2a + 2b = 80", "ab = 391"), "Obseg in ploščina pravokotnika."),
        ("a(40 − a) = 391  ⇒  a<sup>2</sup> − 40a + 391 = 0", ""),
        ("(a − 23)(a − 17) = 0", "Vietovo pravilo: 23 + 17 = 40, 23 · 17 = 391."),
        ("!dolžina 23 m, širina 17 m", ""),
    ],
)

n9 = naloga(
    9, ["stoznice", "diferencialni_racun"], 7,
    r"Dani sta paraboli \(y = x^2 - 4x + 2\) in \(y = x^2 - 2\).<br>"
    r"9.1. Paraboli se sekata v točki \(P\). Izračunaj njeni koordinati. (2 točki)<br>"
    r"9.2. Zapiši enačbi tangent na paraboli v točki \(P\). (3 točke)<br>"
    r"9.3. Izračunaj kot med parabolama. (2 točki)",
    r"9.1. \(P(1, -1)\) &nbsp; 9.2. \(y = -2x + 1\), \(y = 2x - 3\) &nbsp; 9.3. \(\approx 53{,}13^\circ\)",
    [
        ("x<sup>2</sup> − 4x + 2 = x<sup>2</sup> − 2  ⇒  x = 1", ""),
        ("!9.1  P(1, −1)", ""),
        ("k<sub>1</sub> = 2x − 4 = −2,  k<sub>2</sub> = 2x = 2", "Smerni koeficient tangente je vrednost odvoda."),
        ("!9.2  y = −2x + 1,  y = 2x − 3", "Enačba premice skozi P."),
        ("tan φ = |" + U("k<sub>2</sub> − k<sub>1</sub>", "1 + k<sub>1</sub>k<sub>2</sub>") + "| = |" + U("4", "−3") + "| = " + U("4", "3"),
         "Kot med krivuljama je kot med tangentama v presečišču."),
        ("!9.3  φ ≈ 53,13°", ""),
    ],
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 8,
    r"V razredu s \(25\) učenci je \(10\) deklet in \(15\) fantov. Štirim fantom je ime Luka.<br>"
    r"10.1. Učitelj naključno izbere enega učenca. Izračunaj verjetnost dogodka \(A\), da mu je ime Luka. (1 točka)<br>"
    r"10.2. Učitelj naključno izbere dva fanta. Izračunaj verjetnost dogodka \(B\), da je natanko enemu ime Luka. (3 točke)<br>"
    r"10.3. Učitelj naključno izbere tri učence. Izračunaj verjetnost dogodka \(C\), da sta v trojki zastopana oba spola. (4 točke)",
    r"10.1. \(\frac{4}{25}\) &nbsp; 10.2. \(\frac{44}{105}\) &nbsp; 10.3. \(\frac{3}{4}\)",
    [
        ("!10.1  P(A) = " + U("4", "25"), "Klasična definicija verjetnosti."),
        ("P(B) = " + U("4 · 11", BINOM("15", "2")) + " = " + U("44", "105"), "En Luka izmed 4 in en drug fant izmed 11; kombinacije."),
        ("!10.2  P(B) = " + U("44", "105"), ""),
        ("P(C') = " + U(BINOM("10", "3") + " + " + BINOM("15", "3"), BINOM("25", "3")) + " = " + U("120 + 455", "2300") + " = " + U("1", "4"),
         "Nasprotni dogodek: vsi trije so istega spola."),
        ("!10.3  P(C) = 1 − " + U("1", "4") + " = " + U("3", "4"), ""),
    ],
)

def f11(x):
    return x * x if x > 1 else 3 - x

n11 = naloga(
    11, "funkcije", 5,
    r"Dana je funkcija \(f(x) = \begin{cases} x^2 + c; & x > 1 \\ 3 - x; & x \le 1 \end{cases}\).<br>"
    r"11.1. Nariši graf funkcije za \(c = 0\). V katerih točkah je funkcija zvezna? (4 točke)<br>"
    r"11.2. Določi \(c\), da bo funkcija zvezna na vsej realni osi. (1 točka)",
    r"11.1. zvezna za vsak \(x \ne 1\) &nbsp; 11.2. \(c = 1\)",
    [
        ("@slika", graf([(lambda x: x * x if x > 1 else float("nan"), MODRA), (lambda x: 3 - x if x <= 1 else float("nan"), MODRA)],
                        (-2, 3), (-1, 6), tocke=[(1, 2, "(1, 2)")], sirina=260, visina=300)),
        ("f(1) = 2,  " + LIM("x ↓ 1") + " x<sup>2</sup> = 1", "Vrednost in limita z desne v točki x = 1."),
        ("!11.1  f je zvezna povsod razen pri x = 1", "Polinoma sta zvezni funkciji; v x = 1 graf skoči (prazna točka (1, 1))."),
        ("1 + c = 2", "Leva in desna limita se morata ujemati z vrednostjo f(1)."),
        ("!11.2  c = 1", ""),
    ],
)

def slika12():
    lens = '<path d="M210,126 A120,120 0 0,1 210,334 A120,120 0 0,1 210,126 Z" fill="#2F5BD3" fill-opacity="0.18"/>'
    c = ('<circle cx="150" cy="230" r="120" fill="none" stroke="#2F5BD3" stroke-width="1.6"/>'
         '<circle cx="270" cy="230" r="120" fill="none" stroke="#D6293E" stroke-width="1.6"/>')
    t = ('<polygon points="150,230 270,230 210,126" fill="none" stroke="currentColor" stroke-width="1.6"/>'
         '<text x="138" y="246" font-size="12" fill="currentColor">A</text><text x="274" y="246" font-size="12" fill="currentColor">B</text>'
         '<text x="206" y="118" font-size="12" fill="currentColor">C</text><text x="206" y="246" font-size="12" fill="currentColor">a</text>'
         '<text x="40" y="150" font-size="12" fill="#2F5BD3">K₁</text><text x="370" y="150" font-size="12" fill="#D6293E">K₂</text>')
    return svg(420, 370, lens + c + t)

n12 = naloga(
    12, "geometrijski_liki_telesa", 7,
    r"Na sliki je enakostranični trikotnik \(ABC\) s stranico \(a = 3\ \mathrm{cm}\). Krožnica s središčem v \(A\) poteka skozi \(B\) in \(C\) in "
    r"omejuje krog \(K_1\), krožnica s središčem v \(B\) poteka skozi \(A\) in \(C\) in omejuje krog \(K_2\). Izračunaj ploščino preseka "
    r"\(K_1 \cap K_2\). Rezultat naj bo točen." + slika12(),
    r"\(\left(6\pi - \frac{9\sqrt{3}}{2}\right)\ \mathrm{cm^2} \approx 11{,}06\ \mathrm{cm^2}\)",
    [
        ("presek = 2 · krožni odsek", "Presek razdelimo s tetivo CC' na dva skladna krožna odseka."),
        ("∢CAC' = 120°", "Trikotnika ABC in ABC' sta enakostranična (C' je drugo presečišče krožnic)."),
        ("odsek = " + U("120°", "360°") + " · π · 3<sup>2</sup> − " + U("1", "2") + " · 3<sup>2</sup> · sin 120° = 3π − " + U("9" + K("3"), "4"),
         "Krožni odsek: izsek minus enakokraki trikotnik (ploščina trikotnika s sinusom kota)."),
        ("!S = 2 · (3π − " + U("9" + K("3"), "4") + ") = 6π − " + U("9" + K("3"), "2") + " ≈ 11,06 cm<sup>2</sup>", "Oba odseka sta skladna."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["funkcije", "integralski_racun"], 13,
    r"Dani sta funkciji \(f(x) = \sin x + a\) in \(g(x) = b x^2\), \(a \in \mathbb{R}\), \(b > 0\).<br>"
    r"1.1. Zapiši definicijski območji in zalogi vrednosti funkcij \(f\) in \(g\). (3 točke)<br>"
    r"1.2. Določi \(a\) in \(b\), da se bosta grafa sekala pri \(x_1 = 0\) in \(x_2 = \frac{\pi}{2}\). (4 točke)<br>"
    r"1.3. Naj bo \(a = 0\) in \(b = \frac{4}{\pi^2}\). Izračunaj ploščino območja med grafoma med presečiščema. (6 točk)",
    r"1.1. \(D_f = D_g = \mathbb{R}\), \(Z_f = [a - 1, a + 1]\), \(Z_g = [0, \infty)\) &nbsp; 1.2. \(a = 0\), \(b = \frac{4}{\pi^2}\) &nbsp; "
    r"1.3. \(1 - \frac{\pi}{6} \approx 0{,}476\)",
    [
        ("!1.1  D<sub>f</sub> = D<sub>g</sub> = ℝ,  Z<sub>f</sub> = [a − 1, a + 1],  Z<sub>g</sub> = [0, ∞)", "Sinus zavzame vrednosti od −1 do 1; b > 0."),
        ("f(0) = g(0):  a = 0", ""),
        ("f(" + U("π", "2") + ") = g(" + U("π", "2") + "):  1 = b · " + U("π<sup>2</sup>", "4"), ""),
        ("!1.2  a = 0,  b = " + U("4", "π<sup>2</sup>"), ""),
        ("p = " + INT("π/2", "0") + "(sin x − " + U("4", "π<sup>2</sup>") + "x<sup>2</sup>) dx", "Na [0, π/2] leži graf sinusa nad parabolo."),
        ("p = (−cos x − " + U("4x<sup>3</sup>", "3π<sup>2</sup>") + ")" + MEJA("π/2", "0") + " = (0 − " + U("π", "6") + ") − (−1)", "Nedoločeni integral sinusa in potence."),
        ("!1.3  p = 1 − " + U("π", "6") + " ≈ 0,476", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

v2 = naloga(
    2, ["verjetnostni_racun", "geometrijski_liki_telesa"], 14,
    r"Obvezna naloga. Oktaeder je pravilni polieder, omejen z \(8\) enakostraničnimi trikotniki. Na ploskve napišemo števila od \(1\) do \(8\) "
    r"(vsako enkrat).<br>"
    r"2.1. Hkrati vržemo dva taka oktaedra. Kolikšna je verjetnost dogodka \(A\), da je vsota števil na zgornjih ploskvah popoln kvadrat? (4 točke)<br>"
    r"2.2. En oktaeder vržemo \(15\)-krat. Kolikšna je verjetnost dogodka \(B\), da pade število \(5\) natanko dvakrat? Rezultat zaokroži na "
    r"tri decimalna mesta. (4 točke)<br>"
    r"2.3. Rob oktaedra meri \(a = 6\ \mathrm{cm}\). Izračunaj vsoto dolžin vseh robov, površino in prostornino oktaedra. (6 točk)",
    r"2.1. \(\frac{3}{16}\) &nbsp; 2.2. \(\approx 0{,}289\) &nbsp; 2.3. \(72\ \mathrm{cm}\), \(72\sqrt{3}\ \mathrm{cm^2}\), \(72\sqrt{2}\ \mathrm{cm^3}\)",
    [
        ("vseh izidov je 8 · 8 = 64", "Klasična definicija verjetnosti."),
        ("vsota 4: 3 izidi;  vsota 9: (1, 8), …, (8, 1) – 8 izidov;  vsota 16: (8, 8)", "Vsota je med 2 in 16: popolni kvadrati so 4, 9 in 16."),
        ("!2.1  P(A) = " + U("12", "64") + " = " + U("3", "16"), ""),
        ("P(B) = " + BINOM("15", "2") + " · (" + U("1", "8") + ")<sup>2</sup> · (" + U("7", "8") + ")<sup>13</sup>", "Bernoullijevo zaporedje poskusov."),
        ("!2.2  P(B) ≈ 0,289", ""),
        ("!o = 12 · 6 = 72 cm", "Oktaeder ima 12 robov."),
        ("!P = 8 · " + U("a<sup>2</sup>" + K("3"), "4") + " = 2 · 36 " + K("3") + " = 72" + K("3") + " cm<sup>2</sup>", "Ploščina enakostraničnega trikotnika."),
        ("v = " + U("a" + K("2"), "2") + " = 3" + K("2"), "Oktaeder sestavljata dve pravilni štiristrani piramidi; višina iz Pitagorovega izreka."),
        ("!V = 2 · " + U("1", "3") + " · a<sup>2</sup> · v = 2 · " + U("36 · 3" + K("2"), "3") + " = 72" + K("2") + " cm<sup>3</sup>", "Prostornina piramide."),
    ],
)

v3 = naloga(
    3, ["zaporedja_vrste", "algebrski_izrazi_enacbe_neenacbe"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Zaporedje \((a_n)\) je geometrijsko s prvim členom \(a_1 = 1\) in kvocientom \(q = e^3\). "
    r"Zaporedje \((b_n)\) ima splošni člen \(b_n = \ln a_n\).<br>"
    r"3.1. Zapiši splošni člen zaporedja \((a_n)\) in dokaži, da je \((b_n)\) aritmetično zaporedje z diferenco \(3\). (4 točke)<br>"
    r"3.2. Izračunaj vsoto prvih \(100\) členov zaporedja \((b_n)\). (2 točki)<br>"
    r"3.3. Dokaži, da za poljubni naravni števili \(m\), \(n\) števili \(b_m\) in \(b_n\) nista tuji. (3 točke)<br>"
    r"3.4. Za naravno število \(n\) je \(p_n(x) = b_1 + b_2 x + b_3 x^2 + \dots + b_{n+1} x^n\). Dokaži, da ima \(p_n\) na intervalu "
    r"\([0, \infty)\) natanko eno ničlo. (4 točke)",
    r"3.1. \(a_n = e^{3(n - 1)}\), \(b_n = 3(n - 1)\) &nbsp; 3.2. \(14\,850\)",
    [
        ("a<sub>n</sub> = a<sub>1</sub>q<sup>n − 1</sup> = e<sup>3(n − 1)</sup>", "Splošni člen geometrijskega zaporedja."),
        ("b<sub>n</sub> = ln e<sup>3(n − 1)</sup> = 3(n − 1) = 3n − 3", "Logaritem potence."),
        ("!3.1  b<sub>n + 1</sub> − b<sub>n</sub> = 3", "Razlika zaporednih členov je stalna: zaporedje je aritmetično."),
        ("!3.2  s<sub>100</sub> = " + U("100", "2") + "(0 + 297) = 14 850", "Vsota členov aritmetičnega zaporedja."),
        ("!3.3  vsi b<sub>n</sub> = 3(n − 1) so deljivi s 3", "Poljubna dva člena imata skupni delitelj vsaj 3, zato nista tuji števili."),
        ("p<sub>n</sub>(x) = 0 + 3x + 6x<sup>2</sup> + … + 3n x<sup>n</sup>", "b₁ = 0, ostali koeficienti so pozitivni."),
        ("p<sub>n</sub>(0) = 0;  za x > 0 je vsak člen pozitiven  ⇒  p<sub>n</sub>(x) > 0", ""),
        ("!3.4  edina ničla na [0, ∞) je x = 0", ""),
    ],
)

def slika_v4():
    s, ox, oy = 20, 120, 200
    P = lambda x, y: (ox + s * x, oy - s * y)
    A, B, C = (0, 0), (4, 0), (1, 3)
    Bp, Cp, Ap = (12, 0), (-5, 9), (-2, -6)
    def tr(a, b, c, barva, sirina):
        pts = " ".join(f"{P(*q)[0]},{P(*q)[1]}" for q in (a, b, c))
        return f'<polygon points="{pts}" fill="none" stroke="{barva}" stroke-width="{sirina}"/>'
    def napis(q, t, dx=4, dy=-4):
        x, y = P(*q)
        return f'<circle cx="{x}" cy="{y}" r="2.6" fill="currentColor"/><text x="{x + dx}" y="{y + dy}" font-size="11" fill="currentColor">{t}</text>'
    vs = (tr(A, B, C, "currentColor", 1.6) + tr(Ap, Bp, Cp, MODRA, 1.4)
          + "".join(napis(q, t) for q, t in ((A, "A"), (B, "B"), (C, "C"), (Bp, "B'"), (Cp, "C'"), (Ap, "A'"))))
    return svg(400, 340, vs)

v4 = naloga(
    4, "vektorji_ravnina_prostor", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V trikotniku \(ABC\) je \(\vec{a} = \overrightarrow{BC}\), \(\vec{b} = \overrightarrow{CA}\) in "
    r"\(\vec{c} = \overrightarrow{AB}\). Točke \(A'\), \(B'\) in \(C'\) določimo tako, da je \(\overrightarrow{AB'} = 3\overrightarrow{AB}\), "
    r"\(\overrightarrow{BC'} = 3\overrightarrow{BC}\) in \(\overrightarrow{CA'} = 3\overrightarrow{CA}\)." + slika_v4()
    + r"4.1. Izrazi vektorje \(\overrightarrow{A'B'}\), \(\overrightarrow{B'C'}\) in \(\overrightarrow{C'A'}\) z vektorji \(\vec{a}\), \(\vec{b}\), \(\vec{c}\). (3 točke)<br>"
      r"4.2. Naj bo \(|\vec{a}| = 2\), \(|\vec{c}| = 3\) in \(\angle CBB' = 125^\circ\). Izračunaj ploščino in obseg trikotnika \(B'BC'\) "
      r"na 4 mesta natančno. (7 točk)<br>"
      r"4.3. V kakšnem razmerju sta ploščini trikotnikov \(ABC\) in \(A'B'C'\)? (3 točke)",
    r"4.1. \(\overrightarrow{A'B'} = -2\vec{b} + 3\vec{c}\), \(\overrightarrow{B'C'} = -2\vec{c} + 3\vec{a}\), \(\overrightarrow{C'A'} = -2\vec{a} + 3\vec{b}\) "
    r"&nbsp; 4.2. \(S \approx 14{,}74\), \(o \approx 22{,}64\) &nbsp; 4.3. \(1 : 19\)",
    [
        (V("A'A") + " = −2" + V("b") + ",  " + V("AB'") + " = 3" + V("c"), "A' leži na poltraku iz C skozi A: CA' = 3 CA, zato je AA' = 2 CA."),
        ("!" + V("A'B'") + " = −2" + V("b") + " + 3" + V("c") + ",  " + V("B'C'") + " = −2" + V("c") + " + 3" + V("a") + ",  "
         + V("C'A'") + " = −2" + V("a") + " + 3" + V("b"), "Enako za ostali dve stranici (ciklično zamenjamo vektorje)."),
        ("|BB'| = 2|" + V("c") + "| = 6,  |BC'| = 3|" + V("a") + "| = 6,  ∢B'BC' = 125°", "BB' = 2c, BC' = 3a; kot med njima je kot CBB'."),
        ("!S = " + U("1", "2") + " · 6 · 6 · sin 125° ≈ 14,74", "Ploščina trikotnika s sinusom kota."),
        ("|B'C'|<sup>2</sup> = 36 + 36 − 72 cos 125° ≈ 113,30  ⇒  |B'C'| ≈ 10,64", "Kosinusni izrek."),
        ("!o ≈ 6 + 6 + 10,64 = 22,64", ""),
        ("S<sub>B'BC'</sub> = " + U("1", "2") + " · 2|" + V("c") + "| · 3|" + V("a") + "| sin(180° − β) = 6 S<sub>ABC</sub>", "Kot B'BC' je suplement kota β v trikotniku ABC."),
        ("S<sub>A'B'C'</sub> = S<sub>ABC</sub> + 3 · 6 S<sub>ABC</sub> = 19 S<sub>ABC</sub>", "Enako velja za ostala dva kotna trikotnika."),
        ("!4.3  S<sub>ABC</sub> : S<sub>A'B'C'</sub> = 1 : 19", ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
