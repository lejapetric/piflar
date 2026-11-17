# Jesenski rok 2018 (uradne pole RIC: m182-401-1-1, m182-402-1-1, m182-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2018, "jesenski"
FUN = "/views/matematika/snov/funkcije/"
DN = "DA &nbsp; NE"
ZNAKI = "negativna &nbsp; enaka nič &nbsp; pozitivna"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "stevilske_mnozice", 7,
    r"S katerimi izmed števil \(2, 3, 4, 5, 6, 8\) in \(9\) je deljivo število \(112233445566\)? Za vsako število obkroži DA ali NE."
    + tabela(["Število 112233445566 je deljivo", ""], [[f"z {d}" if d in (2, 8, 9) else f"s {d}", DN] for d in (2, 3, 4, 5, 6, 8, 9)]),
    r"z 2: DA, s 3: DA, s 4: NE, s 5: NE, s 6: DA, z 8: NE, z 9: NE",
    [
        ("!z 2: DA", "Zadnja števka 6 je soda."),
        ("1 + 1 + 2 + 2 + 3 + 3 + 4 + 4 + 5 + 5 + 6 + 6 = 42", "Vsota števk za deljivost s 3 in 9."),
        ("!s 3: DA,  z 9: NE", "42 je deljivo s 3, ni pa z 9."),
        ("!s 4: NE", "Zadnji dve števki 66 nista deljivi s 4."),
        ("!s 5: NE", "Zadnja števka ni 0 ali 5."),
        ("!s 6: DA", "Število je deljivo z 2 in s 3."),
        ("!z 8: NE", "Če število ni deljivo s 4, tudi z 8 ni."),
    ],
)

def premice2(X, Y):
    t = []
    for f, ime, barva, xi in [(lambda x: x + 3, "p₁", MODRA, -0.6), (lambda x: x / 2 + 2, "p₂", RDECA, 1.4), (lambda x: 1, "p₃", "currentColor", 2.3)]:
        t.append(krivulja(X, Y, f, -5, 2.5, barva))
        t.append(f'<text x="{X(xi) + 4:.1f}" y="{Y(f(xi)) - 4:.1f}" font-size="11" fill="{barva}">{ime}</text>')
    t.append(f'<text x="{X(0) - 4:.1f}" y="{Y(2) + 4:.1f}" font-size="10" text-anchor="end" fill="currentColor">2</text>')
    t.append(f'<text x="{X(0) - 4:.1f}" y="{Y(3) + 4:.1f}" font-size="10" text-anchor="end" fill="currentColor">3</text>')
    t.append(f'<text x="{X(-3):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">−3</text>')
    t.append(f'<text x="{X(-4):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">−4</text>')
    return "".join(t)

n2 = naloga(
    2, ["pravokotni_koordinatni_sistem_ravnina", "funkcije", "mnozice"], 7,
    r"Na sliki so premice \(p_1\), \(p_2\) in \(p_3\)." + mreza((-5, 3), (-1, 5), premice2, sirina=300)
    + r"2.1. Zapiši enačbe premic \(p_1\), \(p_2\) in \(p_3\). (4 točke)<br>"
    r"2.2. Zapiši element množice \(p_1 \cap p_2 \cap p_3\). (1 točka)<br>"
    r"2.3. Izračunaj ploščino štirikotnika z oglišči \((-3, 0)\), \((-1, 0)\), \((0, 1)\) in \((0, 3)\). (2 točki)",
    r"2.1. \(p_1: y = x + 3\), \(p_2: y = \frac{1}{2}x + 2\), \(p_3: y = 1\) &nbsp; 2.2. \((-2, 1)\) &nbsp; 2.3. \(4\)",
    [
        ("p<sub>1</sub>: skozi (−3, 0) in (0, 3):  k = 1", "Smerni koeficient iz dveh točk, začetna vrednost je presečišče z osjo y."),
        ("!p<sub>1</sub>: y = x + 3", ""),
        ("!p<sub>2</sub>: skozi (−4, 0) in (0, 2):  y = " + U("1", "2") + "x + 2", ""),
        ("!p<sub>3</sub>: y = 1", "Vodoravna premica."),
        ("!2.2  (−2, 1)", "Vse tri premice gredo skozi točko (−2, 1): −2 + 3 = 1 in −1 + 2 = 1."),
        ("S = " + U("3 · 3", "2") + " − " + U("1 · 1", "2") + " = 4", "Štirikotnik je razlika pravokotnih trikotnikov z ogliščema (−3, 0), (0, 3) in (−1, 0), (0, 1)."),
        ("!2.3  S = 4", ""),
    ],
)

def vektorji3(X, Y):
    t = []
    for (x, y), ime, b in [((3, -1), "a", MODRA), ((-2, 3), "b", RDECA), ((-3, 1), "−a", "#2E8B57"), ((1, 2), "a + b", "#B8860B")]:
        t.append(f'<line x1="{X(0):.1f}" y1="{Y(0):.1f}" x2="{X(x):.1f}" y2="{Y(y):.1f}" stroke="{b}" stroke-width="2"/>')
        t.append(f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="3" fill="{b}"/>')
        t.append(f'<text x="{X(x) + 4:.1f}" y="{Y(y) - 4:.1f}" font-size="11" fill="{b}">{ime}</text>')
    return "".join(t)

n3 = naloga(
    3, "vektorji_ravnina_prostor", 7,
    r"V koordinatni sistem nariši vektorje \(\vec{a} = (3, -1)\), \(\vec{b} = (-2, 3)\), nasprotni vektor vektorja \(\vec{a}\) in "
    r"vsoto \(\vec{a} + \vec{b}\). Izračunaj dolžino najdaljšega izmed teh štirih vektorjev.",
    r"najdaljši je \(\vec{b}\), \(|\vec{b}| = \sqrt{13}\)",
    [
        ("@slika", mreza((-4, 4), (-2, 4), vektorji3, sirina=260)),
        ("−" + V("a") + " = (−3, 1),  " + V("a") + " + " + V("b") + " = (1, 2)", "Nasprotni vektor ima nasprotne komponente; vsoto računamo po komponentah."),
        ("|" + V("a") + "| = |−" + V("a") + "| = " + K("10") + ",  |" + V("b") + "| = " + K("13") + ",  |" + V("a") + " + " + V("b") + "| = " + K("5"), "Dolžina vektorja (Pitagorov izrek)."),
        ("!najdaljši: " + V("b") + ",  |" + V("b") + "| = " + K("13"), ""),
    ],
)

n4 = naloga(
    4, ["algebrski_izrazi_enacbe_neenacbe", "funkcije"], 6,
    r"Brez računala poišči vse rešitve enačb.<br>4.1. \(x^2 + 4x + 5 = 0\) (2 točki)<br>4.2. \(2\cos x - 1 = 0\) (2 točki)<br>"
    r"4.3. \(\tan x - 1 = 0\) (1 točka)<br>4.4. \(x^2 = 9\) (1 točka)",
    r"4.1. ni realnih rešitev (\(x = -2 \pm i\)) &nbsp; 4.2. \(x = \pm\frac{\pi}{3} + 2k\pi\) &nbsp; 4.3. \(x = \frac{\pi}{4} + k\pi\) &nbsp; 4.4. \(x = \pm 3\)",
    [
        ("4.1  D = 16 − 20 = −4 < 0", "Diskriminanta je negativna."),
        ("!ni realnih rešitev;  x<sub>1,2</sub> = " + U("−4 ± 2i", "2") + " = −2 ± i", "V kompleksnih številih: rešitve kvadratne enačbe."),
        ("4.2  cos x = " + U("1", "2"), ""),
        ("!x = ±" + U("π", "3") + " + 2kπ", "Kosinus je 1/2 pri ±π/3, ponavlja se na 2π."),
        ("!4.3  tan x = 1  ⇒  x = " + U("π", "4") + " + kπ", "Tangens se ponavlja na π."),
        ("!4.4  x = 3 ali x = −3", ""),
    ],
)

def f5(x):
    return x * x - 3 * x - 4

n5 = naloga(
    5, "funkcije", 7,
    r"Graf kvadratne funkcije \(f\) poteka skozi točke \(A(0, -4)\), \(B(-1, 0)\) in \(C(4, 0)\)."
    + graf([(f5, MODRA)], (-3, 6), (-7, 6), tocke=[(0, -4, "A"), (-1, 0, "B"), (4, 0, "C")], sirina=260, visina=300)
    + r"5.1. Zapiši predpis funkcije \(f\). (3 točke)<br>5.2. Izračunaj koordinati temena. (2 točki)<br>"
    r"5.3. V koliko točkah se sekata graf funkcije \(f\) in premica \(y = 0\)? (1 točka)<br>"
    r"5.4. Za katere \(m \in \mathbb{R}\) se graf funkcije \(f\) in premica \(y = m\) sekata v dveh različnih točkah? (1 točka)",
    r"5.1. \(f(x) = x^2 - 3x - 4\) &nbsp; 5.2. \(T\left(\frac{3}{2}, -\frac{25}{4}\right)\) &nbsp; 5.3. v dveh &nbsp; 5.4. \(m > -\frac{25}{4}\)",
    [
        ("f(x) = a(x + 1)(x − 4)", "Ničelna oblika kvadratne funkcije z ničlama −1 in 4."),
        ("f(0) = −4a = −4  ⇒  a = 1", "Točka A je začetna vrednost."),
        ("!5.1  f(x) = x<sup>2</sup> − 3x − 4", ""),
        ("p = " + U("−1 + 4", "2") + " = " + U("3", "2") + ",  q = f(" + U("3", "2") + ") = " + U("9", "4") + " − " + U("9", "2") + " − 4", "Abscisa temena je na sredini med ničlama."),
        ("!5.2  T(" + U("3", "2") + ", −" + U("25", "4") + ")", ""),
        ("!5.3  v dveh točkah (B in C)", "Premica y = 0 je abscisna os."),
        ("!5.4  m > −" + U("25", "4"), "Parabola je odprta navzgor; vodoravna premica nad temenom jo seka dvakrat."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

def f6(x):
    return 4 * x / (x * x - 9)

n6 = naloga(
    6, ["funkcije", "diferencialni_racun"], 8,
    r"Dana je funkcija \(f(x) = \dfrac{4x}{x^2 - 9}\). Zapiši ničlo, pola in enačbo vodoravne asimptote. Izračunaj odvod funkcije \(f\) "
    r"in nariši njen graf.",
    r"ničla \(x = 0\), pola \(x = \pm 3\), asimptota \(y = 0\), \(f'(x) = \dfrac{-4x^2 - 36}{(x^2 - 9)^2}\)",
    [
        ("!ničla: x = 0", "Ničle so ničle števca."),
        ("!pola: x = 3, x = −3", "Poli so ničle imenovalca (x² − 9 = (x − 3)(x + 3))."),
        ("!vodoravna asimptota: y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("f '(x) = " + U("4(x<sup>2</sup> − 9) − 4x · 2x", "(x<sup>2</sup> − 9)<sup>2</sup>"), "Pravilo za odvod količnika."),
        ("!f '(x) = " + U("−4x<sup>2</sup> − 36", "(x<sup>2</sup> − 9)<sup>2</sup>"), "Odvod je povsod negativen: f pada na vsakem intervalu definicijskega območja."),
        ("@slika", graf([(f6, MODRA)], (-7, 7), (-6, 6), tocke=[(0, 0, "")], sirina=280, visina=260)),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n7 = naloga(
    7, "geometrijski_liki_telesa", 6,
    r"Dve prazni cisterni imata obliko pokončnega valja.<br>"
    r"7.1. Prva ima polmer \(4\) dm. Ko vanjo nalijemo \(150\) litrov soka, je napolnjena do treh četrtin. Izračunaj višino cisterne "
    r"in jo zaokroži na desetinko decimetra. (3 točke)<br>"
    r"7.2. Druga je enakostranični valj (osni presek je kvadrat). Ko vanjo nalijemo \(150\) litrov soka, je polna do vrha. Izračunaj "
    r"njen polmer in ga zaokroži na desetinko decimetra. (3 točke)",
    r"7.1. \(v \approx 4{,}0\) dm &nbsp; 7.2. \(r \approx 2{,}9\) dm",
    [
        ("V = " + U("4", "3") + " · 150 = 200 dm<sup>3</sup>", "150 l = 150 dm³ so tri četrtine prostornine."),
        ("π · 4<sup>2</sup> · v = 200", "Prostornina valja V = πr²v."),
        ("!7.1  v = " + U("200", "16π") + " ≈ 4,0 dm", ""),
        ("v = 2r:  π r<sup>2</sup> · 2r = 2πr<sup>3</sup> = 150", "Pri enakostraničnem valju je višina enaka premeru."),
        ("!7.2  r = " + K(U("75", "π"), 3) + " ≈ 2,9 dm", ""),
    ],
)

n8 = naloga(
    8, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Dani sta funkciji \(f(x) = 2\log_2(x + 3) - 1\) in \(g(x) = 2\log_2(x - 1) + 1\). Izračunaj koordinati presečišča njunih grafov.",
    r"\(P(5, 5)\)",
    [
        ("2 log<sub>2</sub>(x + 3) − 1 = 2 log<sub>2</sub>(x − 1) + 1,  x > 1", "Izenačimo predpisa; oba logaritma morata biti definirana."),
        ("log<sub>2</sub>(x + 3) − log<sub>2</sub>(x − 1) = 1", "Delimo z 2."),
        ("log<sub>2</sub> " + U("x + 3", "x − 1") + " = 1  ⇒  " + U("x + 3", "x − 1") + " = 2", "Logaritem količnika; definicija logaritma."),
        ("x + 3 = 2x − 2  ⇒  x = 5", ""),
        ("y = g(5) = 2 log<sub>2</sub> 4 + 1 = 5", ""),
        ("!P(5, 5)", ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

def f9(x):
    return x ** 3 / 9 - 3 * x

n9 = naloga(
    9, ["funkcije", "diferencialni_racun", "integralski_racun"], 6,
    r"Na sliki je graf lihe funkcije \(f\), ki je polinom tretje stopnje. Lokalna ekstrema ima pri \(x_1 = -3\) in \(x_2 = 3\). "
    r"Za vsako vrednost označi, ali je negativna, enaka nič ali pozitivna (prva vrstica je primer)."
    + graf([(f9, MODRA)], (-7, 7), (-8, 8), tocke=[(-3, 6, "(−3, 6)"), (3, -6, "(3, −6)")], sirina=280, visina=280)
    + tabela(["Vrednost", ""], [[r"\(f(3)\)", "<b>negativna</b>"], [r"\(f(0)\)", ZNAKI], [r"\(f'(5)\)", ZNAKI], [r"\(f'(-3)\)", ZNAKI],
                                [r"\(f(1) - f(0)\)", ZNAKI], [r"\(\int_0^3 f(x)\,dx\)", ZNAKI], [r"\(\int_{-3}^{3} f(x)\,dx\)", ZNAKI]]),
    r"\(f(0)\): enaka nič; \(f'(5)\): pozitivna; \(f'(-3)\): enaka nič; \(f(1) - f(0)\): negativna; \(\int_0^3 f\): negativna; \(\int_{-3}^3 f\): enaka nič",
    [
        ("!f(0) = 0", "Liha funkcija gre skozi izhodišče."),
        ("!f '(5) > 0", "Desno od lokalnega minimuma pri x = 3 funkcija narašča."),
        ("!f '(−3) = 0", "V lokalnem ekstremu je odvod 0 (stacionarne točke)."),
        ("!f(1) − f(0) < 0", "Na [−3, 3] funkcija pada, zato je f(1) < f(0)."),
        ("!" + INT("3", "0") + " f(x) dx < 0", "Na (0, 3] je graf pod abscisno osjo."),
        ("!" + INT("3", "−3") + " f(x) dx = 0", "Liha funkcija: ploščini levo in desno od izhodišča se odštejeta."),
    ],
)

n10 = naloga(
    10, ["mnozice", "kombinatorika", "verjetnostni_racun"], 7,
    r"V razredu je \(32\) dijakov. Matematični krožek obiskuje \(18\) dijakov, šahovskega \(20\), štirje dijaki pa ne obiskujejo nobenega od "
    r"teh dveh krožkov.<br>"
    r"10.1. Koliko dijakov obiskuje oba krožka? (2 točki)<br>"
    r"10.2. Izračunaj verjetnost dogodka \(A\), da naključno izbran dijak obiskuje šahovski, ne pa matematičnega krožka. (2 točki)<br>"
    r"10.3. Izračunaj verjetnost dogodka \(B\), da med tremi naključno izbranimi dijaki vsaj eden obiskuje matematični krožek. (3 točke)",
    r"10.1. \(10\) &nbsp; 10.2. \(\frac{5}{16}\) &nbsp; 10.3. \(\frac{1149}{1240}\)",
    [
        ("|M ∪ Š| = 32 − 4 = 28", "Vsaj en krožek obiskuje 28 dijakov."),
        ("|M ∩ Š| = 18 + 20 − 28", "Moč unije: |M ∪ Š| = |M| + |Š| − |M ∩ Š|."),
        ("!10.1  10 dijakov", ""),
        ("!10.2  P(A) = " + U("20 − 10", "32") + " = " + U("5", "16"), "Le šahovski krožek obiskuje 10 dijakov."),
        ("P(B) = 1 − " + U(BINOM(14, 3), BINOM(32, 3)) + " = 1 − " + U("364", "4960"), "Nasprotni dogodek: nihče od treh ne obiskuje matematičnega krožka (14 dijakov)."),
        ("!10.3  P(B) = " + U("1149", "1240") + " ≈ 0,93", ""),
    ],
)

def elipsa11(X, Y):
    return (parametricna(X, Y, lambda t: 5 + 5 * math.cos(t), lambda t: 3 + 3.75 * math.sin(t), 0, 2 * math.pi)
            + tocka(X, Y, 5, 3, "S") + tocka(X, Y, 2, 0, "", 0, 0) + tocka(X, Y, 8, 0, "", 0, 0))

n11 = naloga(
    11, "stoznice", 7,
    r"Elipsa s središčem \(S(5, 3)\) se dotika ordinatne osi, na abscisni osi pa odreže daljico dolžine \(6\). Izračunaj polosi "
    r"elipse, zapiši njeno enačbo in nariši skico. Rezultati naj bodo točni.",
    r"\(a = 5\), \(b = \frac{15}{4}\), \(\dfrac{(x - 5)^2}{25} + \dfrac{16(y - 3)^2}{225} = 1\)",
    [
        ("a = 5", "Elipsa se dotika osi y, zato je vodoravna polos enaka oddaljenosti središča od osi y."),
        ("na osi x: točki (5 − 3, 0) = (2, 0) in (8, 0)", "Odrezana daljica je simetrična glede na navpičnico skozi središče."),
        (U("(8 − 5)<sup>2</sup>", "25") + " + " + U("(0 − 3)<sup>2</sup>", "b<sup>2</sup>") + " = 1  ⇒  " + U("9", "b<sup>2</sup>") + " = " + U("16", "25"), "Točka (8, 0) leži na elipsi."),
        ("!b<sup>2</sup> = " + U("225", "16") + ",  b = " + U("15", "4"), ""),
        ("!" + U("(x − 5)<sup>2</sup>", "25") + " + " + U("16(y − 3)<sup>2</sup>", "225") + " = 1", "Premaknjena elipsa s središčem S(p, q)."),
        ("@slika", mreza((-1, 11), (-2, 8), elipsa11, sirina=280)),
    ],
)

n12 = naloga(
    12, ["geometrijski_liki_telesa", "zaporedja_vrste"], 6,
    r"Osnovna ploskev pokončne piramide s prostornino \(20\ \mathrm{cm^3}\) je pravokotnik s stranicama \(a\) in \(b\), višina piramide je \(v\). "
    r"Števila \(a\), \(b\) in \(v\) so v tem vrstnem redu zaporedni členi naraščajočega aritmetičnega zaporedja z diferenco \(1\). "
    r"Izračunaj dolžine osnovnih robov in višino piramide.",
    r"\(a = 3\) cm, \(b = 4\) cm, \(v = 5\) cm",
    [
        ("b = a + 1,  v = a + 2", "Zaporedni členi aritmetičnega zaporedja z diferenco 1."),
        (U("1", "3") + " a(a + 1)(a + 2) = 20", "Prostornina piramide V = S·v/3."),
        ("a(a + 1)(a + 2) = 60 = 3 · 4 · 5", "Iščemo tri zaporedna naravna števila; funkcija je za a > 0 naraščajoča, zato je rešitev ena sama."),
        ("!a = 3 cm,  b = 4 cm,  v = 5 cm", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Dana je funkcija \(f(x) = \dfrac{1 + \cos x}{\sin^2 x}\).<br>"
    r"1.1. Zapiši definicijsko območje funkcije \(f\) in izračunaj \(\displaystyle\lim_{x \to \pi} f(x)\). (3 točke)<br>"
    r"1.2. Izračunaj abscise vseh presečišč grafov funkcij \(f\) in \(g(x) = \dfrac{1}{\sin x}\). (3 točke)<br>"
    r"1.3. Dokaži, da \(f\) nima lokalnih ekstremov, in zapiši vse intervale, na katerih \(f\) narašča. (4 točke)<br>"
    r"1.4. Brez računala dokaži, da je ploščina območja med grafom \(f\), abscisno osjo ter premicama \(x = \frac{\pi}{2}\) in "
    r"\(x = \frac{2\pi}{3}\) enaka \(\frac{3 - \sqrt{3}}{3}\). (4 točke)",
    r"1.1. \(D_f = \mathbb{R} \setminus \{k\pi;\ k \in \mathbb{Z}\}\), limita \(\frac{1}{2}\) &nbsp; 1.2. \(x = \frac{\pi}{2} + 2k\pi\) &nbsp; "
    r"1.3. narašča na \((\pi + 2k\pi, 2\pi + 2k\pi)\)",
    [
        ("!D<sub>f</sub> = ℝ \\ {kπ; k ∈ ℤ}", "Imenovalec sin² x ne sme biti 0."),
        ("f(x) = " + U("1 + cos x", "1 − cos<sup>2</sup>x") + " = " + U("1 + cos x", "(1 − cos x)(1 + cos x)") + " = " + U("1", "1 − cos x"), "sin² x = 1 − cos² x; razlika kvadratov."),
        ("!" + LIM("x→π") + " f(x) = " + U("1", "1 − (−1)") + " = " + U("1", "2"), "Po okrajšanju je funkcija zvezna pri π."),
        (U("1", "1 − cos x") + " = " + U("1", "sin x") + "  ⇒  sin x + cos x = 1", "Izenačimo predpisa (x ≠ kπ)."),
        (K("2") + " sin(x + " + U("π", "4") + ") = 1  ⇒  x + " + U("π", "4") + " = " + U("π", "4") + " ali " + U("3π", "4") + " (+ 2kπ)", "Adicijski izrek."),
        ("!x = " + U("π", "2") + " + 2kπ", "Rešitev x = 2kπ ni v definicijskem območju."),
        ("f '(x) = −" + U("sin x", "(1 − cos x)<sup>2</sup>"), "Odvod sestavljene funkcije (verižno pravilo)."),
        ("f '(x) = 0  ⇔  sin x = 0  ⇔  x = kπ ∉ D<sub>f</sub>", "Stacionarnih točk ni, zato tudi lokalnih ekstremov ni."),
        ("!f '(x) > 0  ⇔  sin x < 0:  narašča na (π + 2kπ, 2π + 2kπ)", ""),
        ("f(x) = " + U("1", "2 sin<sup>2</sup>(x/2)"), "Kotne funkcije polovičnih kotov: 1 − cos x = 2 sin²(x/2)."),
        ("∫ " + U("dx", "2 sin<sup>2</sup>(x/2)") + " = −cot " + U("x", "2") + " + C", "Integral 1/sin² u je −cot u."),
        ("S = −cot " + U("π", "3") + " + cot " + U("π", "4") + " = 1 − " + U(K("3"), "3"), "Določeni integral (f > 0, zato je ploščina enaka integralu)."),
        ("!1.4  S = " + U("3 − " + K("3"), "3"), ""),
    ],
)

v2 = naloga(
    2, ["stevilske_mnozice", "geometrijski_liki_telesa", "verjetnostni_racun"], 13,
    r"Reši naloge o kompleksnih številih.<br>"
    r"2.1. Števila \(z_1 = 2\), \(z_2 = 2 + 2i\), \(z_3 = 2 + 2i + 2i^2\) in \(z_4 = 2 + 2i + 2i^2 + 2i^3\) so oglišča štirikotnika v "
    r"kompleksni ravnini. Izračunaj prostornino telesa \(T_1\), ki nastane, če štirikotnik zavrtimo za \(360^\circ\) okrog ene od "
    r"njegovih stranic, in prostornino telesa \(T_2\), ki nastane pri vrtenju okrog diagonale. (4 točke)<br>"
    r"2.2. Izračunaj \(i \cdot i^2 \cdot i^3 \cdots i^{2026}\). (4 točke)<br>"
    r"2.3. Za vsako naravno število \(n\) izračunaj \(1 + i + i^2 + \dots + i^n\). (3 točke)<br>"
    r"2.4. Naključno izberemo naravno število \(n\), \(1 \le n \le 2026\). Izračunaj verjetnost, da je \(1 + i + i^2 + \dots + i^n = 0\). (2 točki)",
    r"2.1. \(V_1 = 8\pi\), \(V_2 = \frac{4\sqrt{2}\pi}{3}\) &nbsp; 2.2. \(-i\) &nbsp; 2.3. \(1\), \(1 + i\), \(i\), \(0\) za \(n = 4k, 4k+1, 4k+2, 4k+3\) &nbsp; "
    r"2.4. \(\frac{253}{1013}\)",
    [
        ("z<sub>1</sub> = 2,  z<sub>2</sub> = 2 + 2i,  z<sub>3</sub> = 2i,  z<sub>4</sub> = 0", "i² = −1, i³ = −i."),
        ("štirikotnik je kvadrat s stranico 2", "Oglišča (2, 0), (2, 2), (0, 2), (0, 0)."),
        ("!V<sub>1</sub> = π · 2<sup>2</sup> · 2 = 8π", "Okrog stranice nastane valj s polmerom in višino 2."),
        ("!V<sub>2</sub> = 2 · " + U("1", "3") + "π(" + K("2") + ")<sup>2</sup> · " + K("2") + " = " + U("4" + K("2") + "π", "3"), "Okrog diagonale nastaneta dva stožca s polmerom in višino √2 (polovica diagonale)."),
        ("i<sup>1 + 2 + … + 2026</sup> = i<sup>2026 · 2027/2</sup> = i<sup>2 053 351</sup>", "Pri množenju potenc z isto osnovo eksponente seštejemo; vsota prvih n členov aritmetičnega zaporedja."),
        ("!2.2  2 053 351 = 4 · 513 337 + 3  ⇒  i<sup>3</sup> = −i", "Potence števila i se ponavljajo z dolžino 4."),
        ("1 + i + i<sup>2</sup> + i<sup>3</sup> = 0", "Vsaki štirje zaporedni členi se odštejejo."),
        ("!2.3  n = 4k: 1;  n = 4k + 1: 1 + i;  n = 4k + 2: i;  n = 4k + 3: 0", ""),
        ("n ∈ {3, 7, 11, …, 2023}: 506 števil", "Vsota je 0, ko je n = 4k + 3."),
        ("!2.4  P(A) = " + U("506", "2026") + " = " + U("253", "1013"), ""),
    ],
)

v3 = naloga(
    3, "zaporedja_vrste", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Za vsak \(n \in \mathbb{N}\) je vsota prvih \(n\) členov zaporedja "
    r"\(S_n = a_1 + a_2 + \dots + a_n = -3n^2 + 30n\).<br>"
    r"3.1. Dokaži, da je splošni člen \(a_n = 33 - 6n\) in da je zaporedje aritmetično. (4 točke)<br>"
    r"3.2. Najmanj koliko členov moramo sešteti, da bo vsota \(S_n\) negativna? (3 točke)<br>"
    r"3.3. Za kateri \(n\) je \(S_n\) največja in kolikšna je takrat? (2 točki)<br>"
    r"3.4. Naj bo \(b_n = \dfrac{a_n}{a_{n+1}}\). Izračunaj \(\displaystyle\lim_{n \to \infty} b_n\). Koliko členov zaporedja \((b_n)\) leži zunaj "
    r"\(\varepsilon\)-okolice limite za \(\varepsilon = 0{,}01\)? (4 točke)",
    r"3.2. \(n = 11\) &nbsp; 3.3. \(n = 5\), \(S_5 = 75\) &nbsp; 3.4. \(\lim b_n = 1\), \(104\) členi",
    [
        ("a<sub>1</sub> = S<sub>1</sub> = 27,  a<sub>n</sub> = S<sub>n</sub> − S<sub>n−1</sub> (n ≥ 2)", "Člen je razlika zaporednih delnih vsot."),
        ("a<sub>n</sub> = −3n<sup>2</sup> + 30n + 3(n − 1)<sup>2</sup> − 30(n − 1) = 33 − 6n", "Formula velja tudi za n = 1: 33 − 6 = 27."),
        ("!a<sub>n+1</sub> − a<sub>n</sub> = −6: zaporedje je aritmetično z d = −6", "Razlika zaporednih členov je konstantna."),
        ("−3n<sup>2</sup> + 30n < 0  ⇔  −3n(n − 10) < 0  ⇔  n > 10", "Izpostavimo −3n; n je pozitiven."),
        ("!3.2  n = 11", ""),
        ("!3.3  n = 5,  S<sub>5</sub> = −75 + 150 = 75", "S(n) je kvadratna funkcija s temenom pri n = 5 (abscisa temena)."),
        ("b<sub>n</sub> = " + U("33 − 6n", "27 − 6n") + " → 1", "Števec in imenovalec delimo z n."),
        ("|b<sub>n</sub> − 1| = " + U("6", "|27 − 6n|") + " ≥ 0,01  ⇔  |27 − 6n| ≤ 600", "Člen je zunaj okolice, ko je razdalja do limite vsaj ε."),
        ("−600 ≤ 27 − 6n  ⇔  n ≤ 104,5", "Za n ≥ 5 je 27 − 6n negativno; za n ≤ 4 je |27 − 6n| ≤ 21, zato so ti členi tudi zunaj."),
        ("!3.4  lim b<sub>n</sub> = 1;  zunaj okolice je 104 členov", ""),
    ],
)

def trapez4(X, Y):
    B = (0.8, 2 * math.sqrt(1 - 0.16))
    C = (-B[1], B[0])  # zrcalna slika D čez simetralo osnovnic
    A, D = (2, 0), (0, -2)
    t = [parametricna(X, Y, lambda s: 2 * math.cos(s), lambda s: 2 * math.sin(s), 0, 2 * math.pi, "currentColor")]
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in (A, B, C, D))
    t.append(f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>')
    t.append(f'<line x1="{X(A[0]):.1f}" y1="{Y(A[1]):.1f}" x2="{X(C[0]):.1f}" y2="{Y(C[1]):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>')
    t.append(f'<line x1="{X(B[0]):.1f}" y1="{Y(B[1]):.1f}" x2="{X(D[0]):.1f}" y2="{Y(D[1]):.1f}" stroke="{RDECA}" stroke-dasharray="4 3"/>')
    for (x, y), n in zip((A, B, C, D), "ABCD"):
        t.append(tocka(X, Y, x, y, n))
    return "".join(t)

v4 = naloga(
    4, ["geometrijski_liki_telesa", "funkcije"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Štirikotnik je ortodiagonalen, če sta njegovi diagonali pravokotni; njegova ploščina je "
    r"\(S = \frac{ef}{2}\), kjer sta \(e\) in \(f\) dolžini diagonal.<br>"
    r"Na krožnici s središčem \(O(0, 0)\) in polmerom \(2\) so točke \(A(2, 0)\), \(D(0, -2)\), \(B(x_1, y_1)\) z \(y_1 > 0\) in \(C(x_2, y_2)\), "
    r"tako da je \(ABCD\) trapez z osnovnicama \(AB\) in \(CD\). Diagonali se sekata v točki \(P\), \(\varphi\) pa je velikost kota \(AOB\).<br>"
    r"4.1. Dokaži, da je trapez enakokrak, in nariši skico. (2 točki)<br>"
    r"4.2. Izračunaj kote \(DCA\), \(DBA\), \(BAC\) in \(BDC\) ter dokaži, da je trapez ortodiagonalen. (3 točke)<br>"
    r"4.3. Koordinati točke \(B\) in dolžino diagonale \(f = |BD|\) izrazi s \(\varphi\). (3 točke)<br>"
    r"4.4. Ploščino trapeza izrazi s \(\varphi\). Pri kateri točki \(B\) je ploščina največja? Utemelji. (5 točk)",
    r"4.2. vsi štirje koti merijo \(45^\circ\) &nbsp; 4.3. \(B(2\cos\varphi, 2\sin\varphi)\), \(f = 2\sqrt{2}\sqrt{1 + \sin\varphi}\) &nbsp; "
    r"4.4. \(S = 4(1 + \sin\varphi)\), največja pri \(B(0, 2)\), \(S = 8\)",
    [
        ("@slika", mreza((-3, 3), (-3, 3), trapez4, sirina=240)),
        ("!4.1  vzporedni tetivi AB in CD odrežeta enaka loka AD in BC  ⇒  |AD| = |BC|", "Trapez, včrtan v krožnico, je enakokrak (simetričen glede na simetralo osnovnic)."),
        ("∠DOA = 90°  ⇒  ∠DCA = ∠DBA = 45°", "Obodni kot je polovica središčnega kota nad istim lokom."),
        ("∠BAC = ∠ACD = 45°,  ∠BDC = ∠ABD = 45°", "Izmenična kota ob vzporednicah AB in CD."),
        ("!4.2  v trikotniku ABP: ∠APB = 180° − 45° − 45° = 90°", "Vsota notranjih kotov: diagonali sta pravokotni."),
        ("!4.3  B(2 cos φ, 2 sin φ)", "Točka na krožnici s polmerom 2."),
        ("f<sup>2</sup> = 4cos<sup>2</sup>φ + (2 sin φ + 2)<sup>2</sup> = 8 + 8 sin φ", "Razdalja točk B in D(0, −2); sin² + cos² = 1."),
        ("!f = 2" + K("2") + K("1 + sin φ"), ""),
        ("e = |AC| = f", "Diagonali enakokrakega trapeza sta enako dolgi."),
        ("!S = " + U("f<sup>2</sup>", "2") + " = 4(1 + sin φ)", "Ploščina ortodiagonalnega štirikotnika."),
        ("!največja pri sin φ = 1: φ = 90°, B(0, 2), S = 8", "Takrat je ABCD kvadrat."),
    ],
)

POLA2 = [v1, v2, v3, v4]
