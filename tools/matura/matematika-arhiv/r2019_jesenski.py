# Jesenski rok 2019 (uradne pole RIC: m192-401-1-1, m192-402-1-1, m192-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, osi_merilo, svg, graf, MODRA, RDECA)

LETO, ROK = 2019, "jesenski"
RIC = {
    "or1": "https://www.ric.si/mma/m192-401-1-1/2020040112345924/?m=1585737299",
    "vr1": "https://www.ric.si/mma/m192-402-1-1/2020040112350147/?m=1585737301",
    "vr2": "https://www.ric.si/mma/m192-402-1-2/2020040112350277/?m=1585737302",
    "ocenjevanje": "https://www.ric.si/mma/m192-401-1-3/2020040112350038/?m=1585737300",
}
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["funkcije", "stevilske_mnozice", "pravokotni_koordinatni_sistem_ravnina"], 8,
    "V levem stolpcu so kratke naloge. Reši jih in rešitve zapiši v desni stolpec (prva vrstica je primer)."
    + tabela(["Naloga", "Rešitev"], [
        [r"Zaloga vrednosti funkcije \(f: \mathbb{R} \to \mathbb{R}\), \(f(x) = x^2 + 3\)", r"\(Z_f = [3, \infty)\)"],
        [r"Največji skupni delitelj števil \(28\) in \(70\)", r"\(D(28, 70) = \)"],
        [r"Interval \(I\), ki je množica rešitev neenačbe \(|x| \le 5\)", r"\(I = \)"],
        [r"Razpolovišče daljice \(AB\), \(A(-3, 2)\), \(B(5, 6)\)", r"\(S(\ \ ,\ \ )\)"],
        [r"Enačba krožnice s središčem \(S(2, -1)\) in polmerom \(r = 3\)", ""],
        [r"Rešitev enačbe \(2^{x + 1} = 1\)", r"\(x = \)"],
        [r"Vse rešitve enačbe \(\cos x = 1\)", ""],
    ]),
    r"\(14\); \([-5, 5]\); \(S(1, 4)\); \((x - 2)^2 + (y + 1)^2 = 9\); \(x = -1\); \(x = 2k\pi,\ k \in \mathbb{Z}\)",
    [
        ("28 = 2<sup>2</sup> · 7,  70 = 2 · 5 · 7", "Razcep na prafaktorje; skupni prafaktorji so 2 in 7."),
        ("!D(28, 70) = 2 · 7 = 14", "Največji skupni delitelj: zmnožimo skupne prafaktorje z najmanjšo potenco."),
        ("!|x| ≤ 5  ⇔  −5 ≤ x ≤ 5:  I = [−5, 5]", "Absolutna vrednost je razdalja od 0; krajišči sta vključeni."),
        ("!S(" + U("−3 + 5", "2") + ", " + U("2 + 6", "2") + ") = S(1, 4)", "Razpolovišče: aritmetični sredini koordinat krajišč."),
        ("!(x − 2)<sup>2</sup> + (y + 1)<sup>2</sup> = 9", "Enačba krožnice (x − p)² + (y − q)² = r² s središčem S(p, q)."),
        ("2<sup>x + 1</sup> = 2<sup>0</sup>  ⇒  x + 1 = 0", "1 = 2⁰; osnovi sta enaki, zato izenačimo eksponenta."),
        ("!x = −1", ""),
        ("!cos x = 1  ⇒  x = 2kπ, k ∈ ℤ", "Kosinus doseže vrednost 1 pri kotih 0, 2π, 4π … (na vsakih 2π)."),
    ],
)

n2 = naloga(
    2, "stevilske_mnozice", 8,
    r"Dano je kompleksno število \(z_1 = 3 - 2i\).<br>"
    r"2.1. Število \(z_1\) nariši v kompleksni ravnini in izračunaj \(|z_1|\). V isti ravnini nariši še množico "
    r"\(M = \{z \in \mathbb{C};\ \mathrm{Re}\, z = 1\}\). (4 točke)<br>"
    r"2.2. Poišči kompleksno število \(w\), za katero je \(z_1 + w = 7 + 5i\). Zapiši ga v obliki \(w = a + bi\), "
    r"\(a, b \in \mathbb{R}\). (4 točke)",
    r"2.1. \(|z_1| = \sqrt{13}\), \(M\) je navpična premica \(\mathrm{Re}\, z = 1\) &nbsp; 2.2. \(w = 4 + 7i\)",
    [
        ("@slika", mreza((-2, 5), (-4, 3), lambda X, Y:
            f'<line x1="{X(1):.1f}" y1="{Y(3):.1f}" x2="{X(1):.1f}" y2="{Y(-4):.1f}" stroke="{RDECA}" stroke-width="2"/>'
            + tocka(X, Y, 3, -2, "z₁") + f'<text x="{X(1) + 4:.1f}" y="{Y(2.5):.1f}" font-size="11" fill="{RDECA}">M</text>',
            sirina=260)),
        ("2.1  z<sub>1</sub> = 3 − 2i  →  točka (3, −2)", "Realni del na vodoravni osi, imaginarni na navpični."),
        ("!|z<sub>1</sub>| = " + K("3<sup>2</sup> + (−2)<sup>2</sup>") + " = " + K("13"), "Absolutna vrednost: razdalja od izhodišča (Pitagorov izrek)."),
        ("!M: vsa števila z realnim delom 1 → navpična premica skozi 1", "Imaginarni del je poljuben."),
        ("2.2  w = (7 + 5i) − (3 − 2i)", "Iz z₁ + w = 7 + 5i izrazimo w."),
        ("!w = 4 + 7i", "Odštejemo realna in imaginarna dela posebej."),
    ],
)

n3 = naloga(
    3, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 5,
    r"Reši enačbo \(\log_2 x = 3 - \log_2 (x - 2)\).",
    r"\(x = 4\)",
    [
        ("pogoj: x > 0 in x − 2 > 0  ⇒  x > 2", "Logaritmiramo lahko le pozitivna števila."),
        ("log<sub>2</sub> x + log<sub>2</sub> (x − 2) = 3", "Logaritme prenesemo na levo stran."),
        ("log<sub>2</sub> (x(x − 2)) = 3", "Logaritem produkta je vsota logaritmov."),
        ("x<sup>2</sup> − 2x = 2<sup>3</sup> = 8", "Po definiciji logaritma."),
        ("x<sup>2</sup> − 2x − 8 = (x − 4)(x + 2) = 0", "Kvadratno enačbo razcepimo z Vietovim pravilom."),
        ("!x = 4  (x = −2 ne ustreza pogoju)", "Preverimo pogoj x > 2."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n4 = naloga(
    4, "zaporedja_vrste", 6,
    r"V aritmetičnem zaporedju je tretji člen \(7\), peti člen pa \(13\). Izračunaj diferenco, prvi člen in vsoto "
    r"prvih \(100\) členov.",
    r"\(d = 3\), \(a_1 = 1\), \(s_{100} = 14\,950\)",
    [
        ("a<sub>5</sub> − a<sub>3</sub> = 2d = 13 − 7 = 6", "Med a₃ in a₅ sta dva koraka diference."),
        ("!d = 3", ""),
        ("!a<sub>1</sub> = a<sub>3</sub> − 2d = 7 − 6 = 1", "a₃ = a₁ + 2d."),
        ("a<sub>100</sub> = a<sub>1</sub> + 99d = 1 + 297 = 298", "Splošni člen aritmetičnega zaporedja."),
        ("!s<sub>100</sub> = " + U("100", "2") + " (1 + 298) = 50 · 299 = 14 950", "Vsota prvih n členov aritmetičnega zaporedja."),
    ],
)

bazen = osi_merilo((0, 75), (0, 2.2), 5, 0.2, "t", "h", risbe=lambda X, Y:
    f'<line x1="{X(0):.1f}" y1="{Y(0.5):.1f}" x2="{X(75):.1f}" y2="{Y(2.0):.1f}" stroke="{MODRA}" stroke-width="2"/>'
    + tocka(X, Y, 0, 0.5) + tocka(X, Y, 75, 2.0))
n5 = naloga(
    5, "funkcije", 5,
    "Bazen polnimo z vodo. Na začetku polnjenja je bilo v njem že nekaj vode, nato pa se je gladina dvigovala "
    "enakomerno s časom. Graf kaže višino vode \\(h\\) (v metrih) v odvisnosti od časa \\(t\\) (v minutah)." + bazen
    + "5.1. Kako visoko je segala voda ob začetku polnjenja? (1 točka)<br>"
    "5.2. Kako visoko je segala voda eno uro po začetku polnjenja? (1 točka)<br>"
    "5.3. Za koliko se je gladina dvignila v vsakih 15 minutah? (1 točka)<br>"
    "5.4. Zapiši predpis funkcije \\(f\\), ki opisuje višino vode. (2 točki)",
    r"5.1. \(0{,}5\) m &nbsp; 5.2. \(1{,}7\) m &nbsp; 5.3. \(0{,}3\) m &nbsp; 5.4. \(f(t) = 0{,}02t + 0{,}5\)",
    [
        ("!5.1  h(0) = 0,5 m", "Preberemo presečišče grafa z navpično osjo."),
        ("smerni koeficient k = " + U("2,0 − 0,5", "75 − 0") + " = " + U("1,5", "75") + " = 0,02", "Iz dveh točk grafa: (0; 0,5) in (75; 2,0)."),
        ("!5.2  h(60) = 0,02 · 60 + 0,5 = 1,7 m", "Ena ura je 60 minut."),
        ("!5.3  0,02 · 15 = 0,3 m", "V vsaki minuti se gladina dvigne za k = 0,02 m."),
        ("!5.4  f(t) = 0,02t + 0,5", "Linearna funkcija f(t) = kt + n, n je začetna višina."),
    ],
    snov=FUN + "linearna_razlaga.html",
)

n6 = naloga(
    6, "vektorji_ravnina_prostor", 7,
    r"V ravnini sta dana vektorja \(\vec{i} = (1, 0)\) in \(\vec{j} = (0, 1)\).<br>"
    r"6.1. Določi \(t \in \mathbb{R}\), da bosta vektorja \(\vec{u} = t\vec{i} + \vec{j}\) in \(\vec{v} = 3\vec{i} - 2\vec{j}\) "
    r"pravokotna. (3 točke)<br>"
    r"6.2. Določi vse \(s \in \mathbb{R}\), da bosta vektorja \(\vec{u} = s\vec{i} + 2\vec{j}\) in "
    r"\(\vec{v} = 2\vec{i} + s\vec{j}\) vzporedna. (4 točke)",
    r"6.1. \(t = \frac{2}{3}\) &nbsp; 6.2. \(s = 2\) ali \(s = -2\)",
    [
        ("6.1  " + V("u") + " = (t, 1),  " + V("v") + " = (3, −2)", "Zapišemo komponente vektorjev."),
        (V("u") + " · " + V("v") + " = 3t − 2 = 0", "Vektorja sta pravokotna, ko je skalarni produkt enak 0."),
        ("!t = " + U("2", "3"), ""),
        ("6.2  " + V("u") + " = (s, 2),  " + V("v") + " = (2, s)", ""),
        ("s · s − 2 · 2 = 0", "Vektorja (a, b) in (c, d) sta vzporedna, ko je ad − bc = 0 (komponente so sorazmerne)."),
        ("!s<sup>2</sup> = 4  ⇒  s = 2 ali s = −2", ""),
    ],
)

def f7(x):
    return 4 * x / (x * x + 4)

slika7 = graf([(f7, MODRA)], (-5, 5), (-2, 2), tocke=[(2, 1, ""), (-2, -1, "")], sirina=340, visina=150)
n7 = naloga(
    7, ["funkcije", "integralski_racun"], 8,
    r"Na sliki je del grafa lihe funkcije \(f: \mathbb{R} \to \mathbb{R}\) (označeni točki sta \((2, 1)\) in \((-2, -1)\)). "
    r"Funkcija \(g: \mathbb{R} \to \mathbb{R}\) ima predpis \(g(x) = 3x - 1\)." + slika7
    + r"7.1. Zapiši \(f(-2)\), \(g^{-1}(-4)\) in \(f(g(1))\). (4 točke)<br>"
    r"7.2. Izračunaj \(\displaystyle\int_{-3}^{3} f(x)\,dx\) in \(\displaystyle\int_{0}^{2} g(x)\,dx\). (4 točke)",
    r"7.1. \(f(-2) = -1\), \(g^{-1}(-4) = -1\), \(f(g(1)) = 1\) &nbsp; 7.2. \(0\), \(4\)",
    [
        ("!7.1  f(−2) = −1", "Preberemo z grafa (oglišče na levi)."),
        ("3x − 1 = −4  ⇒  x = −1", "g⁻¹(−4) je tisti x, za katerega je g(x) = −4."),
        ("!g<sup>−1</sup>(−4) = −1", ""),
        ("!f(g(1)) = f(2) = 1", "Najprej g(1) = 3 − 1 = 2, nato f(2) preberemo z grafa."),
        ("!7.2  " + INT("3", "−3") + " f(x) dx = 0", "f je liha: ploščini nad in pod osjo sta enaki, z nasprotnima predznakoma."),
        (INT("2", "0") + " (3x − 1) dx = (" + U("3x<sup>2</sup>", "2") + " − x) " + MEJA("2", "0"), "Integral potence in integral konstante."),
        ("!= 6 − 2 = 4", "Newton-Leibnizova formula: vrednost v zgornji meji minus vrednost v spodnji."),
    ],
)

def f8(x):
    return x ** 4 - 4 * x ** 2

r2 = math.sqrt(2)
n8 = naloga(
    8, ["funkcije", "diferencialni_racun"], 7,
    r"Dana je funkcija \(f(x) = x^4 - 4x^2\).<br>"
    r"8.1. Izračunaj vse ničle funkcije \(f\). (2 točki)<br>"
    r"8.2. Izračunaj odvod \(f'\). (1 točka)<br>"
    r"8.3. Izračunaj lokalne ekstreme funkcije \(f\). (3 točke)<br>"
    r"8.4. Nariši graf funkcije \(f\). (1 točka)",
    r"8.1. \(x_1 = 0\) (dvojna), \(x_{2,3} = \pm 2\) &nbsp; 8.2. \(f'(x) = 4x^3 - 8x\) &nbsp; "
    r"8.3. lokalni maksimum \(T(0, 0)\), lokalna minimuma \(T(\pm\sqrt{2}, -4)\)",
    [
        ("8.1  x<sup>4</sup> − 4x<sup>2</sup> = x<sup>2</sup>(x − 2)(x + 2) = 0", "Izpostavimo x² in uporabimo razliko kvadratov."),
        ("!x<sub>1</sub> = 0 (dvojna),  x<sub>2</sub> = 2,  x<sub>3</sub> = −2", ""),
        ("!8.2  f '(x) = 4x<sup>3</sup> − 8x", "Odvod potence: (xⁿ)' = n xⁿ⁻¹."),
        ("4x(x<sup>2</sup> − 2) = 0  ⇒  x = 0, x = ±" + K("2"), "Stacionarne točke: f '(x) = 0."),
        ("!f(0) = 0: lokalni maksimum T(0, 0)", "Odvod ob x = 0 spremeni predznak iz + v −."),
        ("!f(±" + K("2") + ") = 4 − 8 = −4: lokalna minimuma", "Odvod spremeni predznak iz − v +."),
        ("@slika", graf([(f8, MODRA)], (-3, 3), (-5, 3), tocke=[(0, 0, ""), (r2, -4, ""), (-r2, -4, ""), (2, 0, ""), (-2, 0, "")], sirina=260, visina=260)),
        ("!8.4  graf", "Graf je soda funkcija (simetričen glede na os y), za velike |x| gre proti +∞."),
    ],
    snov=FUN + "polinomska_razlaga.html",
)

elipsa = mreza((-4, 8), (-3, 5), lambda X, Y:
    parametricna(X, Y, lambda t: 2 + 5 * math.cos(t), lambda t: 1 + 3 * math.sin(t), 0, 2 * math.pi)
    + tocka(X, Y, -3, 1, "A", -12, -5) + tocka(X, Y, 2, -2, "B", 5, 12) + tocka(X, Y, 7, 1, "C") + tocka(X, Y, 2, 4, "D"),
    sirina=300)
n9 = naloga(
    9, "stoznice", 7,
    r"V ravnini je narisana elipsa s temeni \(A(-3, 1)\), \(B(2, -2)\), \(C(7, 1)\) in \(D(2, 4)\)." + elipsa
    + r"9.1. Zapiši enačbo elipse. (4 točke)<br>"
    r"9.2. Kolikšna je razdalja levega gorišča elipse od koordinatnega izhodišča? Nalogo reši brez računala. (3 točke)",
    r"9.1. \(\dfrac{(x - 2)^2}{25} + \dfrac{(y - 1)^2}{9} = 1\) &nbsp; 9.2. \(\sqrt{5}\)",
    [
        ("središče S(2, 1)", "Središče je razpolovišče daljice AC (in BD)."),
        ("a = " + U("|AC|", "2") + " = " + U("10", "2") + " = 5,  b = " + U("|BD|", "2") + " = 3", "Polosi sta polovici razdalj med nasprotnima temenoma."),
        ("!9.1  " + U("(x − 2)<sup>2</sup>", "25") + " + " + U("(y − 1)<sup>2</sup>", "9") + " = 1", "Premaknjena elipsa s središčem S(p, q)."),
        ("e<sup>2</sup> = a<sup>2</sup> − b<sup>2</sup> = 25 − 9 = 16,  e = 4", "Linearna ekscentričnost elipse: e² = a² − b²."),
        ("F<sub>1</sub>(2 − 4, 1) = F<sub>1</sub>(−2, 1)", "Gorišči ležita na veliki osi, e od središča."),
        ("!9.2  d = " + K("(−2)<sup>2</sup> + 1<sup>2</sup>") + " = " + K("5"), "Razdalja točke od izhodišča (Pitagorov izrek)."),
    ],
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 7,
    "Imamo pet igralnih kock različnih barv: rdečo, modro, zeleno, rumeno in belo. Izračunaj verjetnosti dogodkov v preglednici."
    + tabela(["Poskus in dogodek", "Verjetnost"], [
        ["10.1. Naključno izberemo eno kocko. Dogodek A: izbrana kocka ni rdeča. (1 točka)", r"\(P(A) = \)"],
        ["10.2. Naključno izberemo dve kocki. Dogodek B: izbrani sta rdeča in modra kocka. (3 točke)", r"\(P(B) = \)"],
        ["10.3. Vržemo modro kocko. Dogodek C: pade število, večje od 4. (1 točka)", r"\(P(C) = \)"],
        ["10.4. Vržemo rumeno in zeleno kocko. Dogodek D: vsota pik je 11. (2 točki)", r"\(P(D) = \)"],
    ]),
    r"10.1. \(\frac{4}{5}\) &nbsp; 10.2. \(\frac{1}{10}\) &nbsp; 10.3. \(\frac{1}{3}\) &nbsp; 10.4. \(\frac{1}{18}\)",
    [
        ("!10.1  P(A) = " + U("4", "5"), "Ugodne so 4 od 5 kock: verjetnost = število ugodnih / število vseh izidov."),
        ("število vseh izbir: " + BINOM(5, 2) + " = 10", "Dve kocki izmed petih izberemo na C(5, 2) načinov (kombinacije)."),
        ("!10.2  P(B) = " + U("1", "10"), "Ugoden je le en par."),
        ("!10.3  P(C) = " + U("2", "6") + " = " + U("1", "3"), "Ugodna izida sta 5 in 6."),
        ("ugodna izida: (5, 6), (6, 5); vseh izidov 6 · 6 = 36", "Kocki sta različni, zato je vrstni red pomemben."),
        ("!10.4  P(D) = " + U("2", "36") + " = " + U("1", "18"), ""),
    ],
)

n11 = naloga(
    11, ["funkcije", "diferencialni_racun"], 5,
    r"Izračunaj limito \(\displaystyle\lim_{x \to 0} \frac{\sin(x - \pi) + 5x}{2x}\).",
    r"\(2\)",
    [
        ("sin(x − π) = −sin x", "Adicijski izrek: sin(x − π) = sin x cos π − cos x sin π."),
        (LIM("x→0") + " " + U("−sin x + 5x", "2x") + " = " + LIM("x→0") + " (−" + U("1", "2") + " · " + U("sin x", "x") + " + " + U("5", "2") + ")", "Ulomek razdelimo na dva dela."),
        ("!= −" + U("1", "2") + " · 1 + " + U("5", "2") + " = 2", "Uporabimo limito sin x / x → 1, ko gre x proti 0."),
    ],
)

def lik12():
    s = 40
    o = 20
    d = [f'<rect x="{o}" y="{o}" width="{4*s}" height="{4*s}" fill="none" stroke="currentColor" stroke-width="1.5"/>']
    siva = 'fill="currentColor" fill-opacity="0.28" stroke="currentColor" stroke-width="1.2"'
    d.append(f'<path d="M{o},{o} A{2*s},{2*s} 0 0 0 {o+4*s},{o} Z" {siva}/>')
    d.append(f'<path d="M{o},{o+4*s} A{2*s},{2*s} 0 0 1 {o+4*s},{o+4*s} Z" {siva}/>')
    d.append(f'<circle cx="{o+s/2}" cy="{o+2*s}" r="{s/2}" {siva}/>')
    d.append(f'<circle cx="{o+4*s-s/2}" cy="{o+2*s}" r="{s/2}" {siva}/>')
    d.append(f'<text x="{o+2*s}" y="{o+4*s+16}" font-size="12" text-anchor="middle" fill="currentColor">4</text>')
    d.append(f'<text x="{o+4*s+8}" y="{o+2*s+4}" font-size="12" fill="currentColor">4</text>')
    return svg(4 * s + 2 * o + 10, 4 * s + 2 * o + 6, "".join(d))

n12 = naloga(
    12, "geometrijski_liki_telesa", 7,
    "V kvadratu s stranico \\(4\\) sta osenčena polkroga s premerom \\(4\\) nad zgornjo in spodnjo stranico ter dva "
    "manjša kroga, ki se dotikata obeh polkrogov in stranske stranice kvadrata. Izračunaj vsoto ploščin vseh osenčenih "
    "likov. Nalogo reši brez računala." + lik12(),
    r"\(\dfrac{9\pi}{2}\)",
    [
        ("polkroga: R = 2,  2 · " + U("πR<sup>2</sup>", "2") + " = 4π", "Polkroga skupaj sestavljata krog s polmerom 2."),
        ("središče malega kroga: (r, 2), središče polkroga: (2, 0)", "Postavimo koordinatni sistem v spodnje levo oglišče; mali krog se dotika leve stranice."),
        ("(2 − r)<sup>2</sup> + 2<sup>2</sup> = (2 + r)<sup>2</sup>", "Krožnici se dotikata od zunaj: razdalja središč je vsota polmerov (Pitagorov izrek)."),
        ("4 − 4r + 4 = 4 + 4r  ⇒  r = " + U("1", "2"), ""),
        ("mala kroga: 2 · π" + "(" + U("1", "2") + ")<sup>2</sup> = " + U("π", "2"), ""),
        ("!S = 4π + " + U("π", "2") + " = " + U("9π", "2"), "Seštejemo ploščine."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def f1(x):
    return 3 * math.tan(x) - 2 * math.sin(2 * x)

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 13,
    r"Nalogo reši brez računala. Dana je funkcija \(f: \mathbb{R} \setminus \{\frac{\pi}{2} + k\pi;\ k \in \mathbb{Z}\} \to \mathbb{R}\), "
    r"\(f(x) = 3\tan x - 2\sin(2x)\).<br>"
    r"1.1. Dokaži, da je \(f\) periodična s periodo \(\pi\), in izračunaj vse ničle funkcije \(f\). (5 točk)<br>"
    r"1.2. V točki \(T\left(\frac{\pi}{4}, y_0\right)\) na grafu funkcije \(f\) položimo tangento. Zapiši njeno enačbo. (4 točke)<br>"
    r"1.3. Poišči funkcijo \(F: \left(\frac{\pi}{2}, \frac{3\pi}{2}\right) \to \mathbb{R}\), za katero je \(F' = f\) in \(F(\pi) = 1\). (4 točke)",
    r"1.1. \(x = k\pi\), \(x = \pm\frac{\pi}{6} + k\pi\) &nbsp; 1.2. \(y = 6x - \frac{3\pi}{2} + 1\) &nbsp; "
    r"1.3. \(F(x) = -3\ln(-\cos x) + \cos(2x)\)",
    [
        ("1.1  f(x + π) = 3 tan(x + π) − 2 sin(2x + 2π) = 3 tan x − 2 sin 2x = f(x)", "Tangens ima periodo π, sin 2x pa periodo π, saj ima sinus periodo 2π."),
        ("3 " + U("sin x", "cos x") + " − 4 sin x cos x = sin x (" + U("3", "cos x") + " − 4 cos x) = 0", "sin 2x = 2 sin x cos x; izpostavimo sin x."),
        ("!sin x = 0  ⇒  x = kπ", ""),
        ("3 = 4 cos<sup>2</sup>x  ⇒  cos x = ±" + U(K("3"), "2"), "Drugi faktor pomnožimo s cos x."),
        ("!x = ±" + U("π", "6") + " + kπ", "Rešitve ±π/6 + 2kπ in ±5π/6 + 2kπ združimo s periodo π."),
        ("1.2  y<sub>0</sub> = f(" + U("π", "4") + ") = 3 · 1 − 2 · 1 = 1", "tan(π/4) = 1, sin(π/2) = 1."),
        ("f '(x) = " + U("3", "cos<sup>2</sup>x") + " − 4 cos(2x)", "Odvod tangensa je 1/cos² x; pri sin 2x uporabimo verižno pravilo."),
        ("f '(" + U("π", "4") + ") = " + U("3", "1/2") + " − 4 · 0 = 6", "Smerni koeficient tangente je odvod v dani točki."),
        ("!y − 1 = 6(x − " + U("π", "4") + ")  ⇒  y = 6x − " + U("3π", "2") + " + 1", ""),
        ("1.3  ∫ 3 tan x dx = −3 ln|cos x|,  ∫ −2 sin(2x) dx = cos(2x)", "Integral tangensa: (ln|cos x|)' = −tan x; integral sinusa."),
        ("F(x) = −3 ln|cos x| + cos(2x) + C", ""),
        ("F(π) = −3 ln 1 + cos 2π + C = 1 + C = 1  ⇒  C = 0", "Konstanto določimo iz pogoja F(π) = 1."),
        ("!F(x) = −3 ln(−cos x) + cos(2x)", "Na intervalu (π/2, 3π/2) je cos x < 0, zato |cos x| = −cos x."),
    ],
)

v2 = naloga(
    2, ["geometrijski_liki_telesa", "geometrija_ravnina_prostor"], 14,
    r"Dan je enakokraki trapez \(ABCD\) z osnovnicama \(a = |AB| = 26\) cm, \(c = |CD| = 10\) cm in krakoma "
    r"\(b = d = 17\) cm.<br>"
    r"2.1. Dokaži, da je višina trapeza \(15\) cm. Izračunaj prostornino pokončne prizme z višino \(4\) cm, ki ima za "
    r"osnovno ploskev trapez \(ABCD\). (4 točke)<br>"
    r"2.2. Trapez raztegnemo s središčem v oglišču \(A\) in faktorjem \(3\). Izračunaj ploščino dobljenega trapeza "
    r"\(A_1B_1C_1D_1\). (2 točki)<br>"
    r"2.3. Trapez zavrtimo za \(180^\circ\) okrog njegove simetrale. Izračunaj površino in prostornino nastale vrtenine. (8 točk)",
    r"2.1. \(V = 1080\ \mathrm{cm^3}\) &nbsp; 2.2. \(2430\ \mathrm{cm^2}\) &nbsp; 2.3. \(P = 500\pi\ \mathrm{cm^2}\), \(V = 1295\pi\ \mathrm{cm^3}\)",
    [
        ("2.1  " + U("a − c", "2") + " = " + U("26 − 10", "2") + " = 8 cm", "Pravokotna projekcija kraka na osnovnico."),
        ("v = " + K("17<sup>2</sup> − 8<sup>2</sup>") + " = " + K("225") + " = 15 cm", "Pitagorov izrek v pravokotnem trikotniku s krakom kot hipotenuzo."),
        ("S = " + U("a + c", "2") + " · v = 18 · 15 = 270 cm<sup>2</sup>", "Ploščina trapeza."),
        ("!V = S · h = 270 · 4 = 1080 cm<sup>3</sup>", "Prostornina prizme: osnovna ploskev krat višina."),
        ("!2.2  S<sub>1</sub> = 3<sup>2</sup> · 270 = 2430 cm<sup>2</sup>", "Pri raztegu s faktorjem k se ploščina pomnoži s k²."),
        ("2.3  R = " + U("a", "2") + " = 13 cm,  r = " + U("c", "2") + " = 5 cm,  v = 15 cm,  s = 17 cm", "Nastane prisekani stožec; polmera sta polovici osnovnic, stranica je krak."),
        ("P = π(R<sup>2</sup> + r<sup>2</sup> + (R + r)s) = π(169 + 25 + 18 · 17)", "Površina prisekanega stožca: osnovni ploskvi in plašč."),
        ("!P = 500π cm<sup>2</sup>", ""),
        ("V = " + U("πv", "3") + " (R<sup>2</sup> + Rr + r<sup>2</sup>) = 5π(169 + 65 + 25)", "Prostornina prisekanega stožca."),
        ("!V = 1295π cm<sup>3</sup>", ""),
    ],
)

v3 = naloga(
    3, ["stevilske_mnozice", "potence_koreni"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Naj bosta \(a, b \in \mathbb{N}\) in<br>"
    r"\(n_1 = 2^a \cdot 3^b \cdot 5^b \cdot 11^b\), \(n_2 = 2^b \cdot 3^a \cdot 5^b \cdot 11^b\), "
    r"\(n_3 = 2^b \cdot 3^b \cdot 5^a \cdot 11^b\), \(n_4 = 2^b \cdot 3^b \cdot 5^b \cdot 11^a\).<br>"
    r"3.1. Razvrsti \(n_1, n_2, n_3, n_4\) po velikosti od najmanjšega do največjega za \(a = 2025,\ b = 2024\) ter za "
    r"\(a = 2024,\ b = 2025\). (4 točke)<br>"
    r"3.2. Dokaži, da \(n_1\) in \(n_2\) nista praštevili in nista tuji si števili. (2 točki)<br>"
    r"3.3. Zapiši \(\frac{n_1}{n_2}\) kot okrajšan ulomek v odvisnosti od \(a\) in \(b\) (za \(a > b\), \(a = b\) in \(a < b\)). (3 točke)<br>"
    r"3.4. Izračunaj največji skupni delitelj in najmanjši skupni večkratnik števil \(n_1, n_2, n_3, n_4\) v odvisnosti od \(a\) in \(b\). (4 točke)",
    r"3.1. \(n_1 < n_2 < n_3 < n_4\); \(n_4 < n_3 < n_2 < n_1\) &nbsp; 3.3. \(\frac{2^{a-b}}{3^{a-b}}\), \(1\), \(\frac{3^{b-a}}{2^{b-a}}\) &nbsp; "
    r"3.4. \(D = 330^{\min(a, b)}\), \(v = 330^{\max(a, b)}\)",
    [
        ("3.1  a = b + 1:  n<sub>i</sub> = 330<sup>b</sup> · p<sub>i</sub>,  p<sub>i</sub> ∈ {2, 3, 5, 11}", "Iz vsakega števila izpostavimo (2 · 3 · 5 · 11)ᵇ = 330ᵇ; ostane prafaktor z eksponentom a."),
        ("!n<sub>1</sub> < n<sub>2</sub> < n<sub>3</sub> < n<sub>4</sub>", "Večji prafaktor da večje število."),
        ("b = a + 1:  n<sub>1</sub> = 330<sup>a</sup> · 3 · 5 · 11 = 330<sup>a</sup> · 165,  n<sub>2</sub> = 330<sup>a</sup> · 110,  n<sub>3</sub> = 330<sup>a</sup> · 66,  n<sub>4</sub> = 330<sup>a</sup> · 30", "Zdaj izpostavimo 330ᵃ."),
        ("!n<sub>4</sub> < n<sub>3</sub> < n<sub>2</sub> < n<sub>1</sub>", ""),
        ("!3.2  5<sup>b</sup> · 11<sup>b</sup> deli n<sub>1</sub> in n<sub>2</sub>, D(n<sub>1</sub>, n<sub>2</sub>) ≥ 55", "Ker je b ≥ 1, imata obe števili skupni delitelj 55 > 1; zato nista tuji, pa tudi praštevili nista (imata več prafaktorjev)."),
        (U("n<sub>1</sub>", "n<sub>2</sub>") + " = " + U("2<sup>a</sup> · 3<sup>b</sup>", "2<sup>b</sup> · 3<sup>a</sup>") + " = 2<sup>a − b</sup> · 3<sup>b − a</sup>", "Skupne faktorje 5ᵇ in 11ᵇ okrajšamo; pravila za računanje s potencami."),
        ("!3.3  a > b: " + U("2<sup>a − b</sup>", "3<sup>a − b</sup>") + ";  a = b: 1;  a < b: " + U("3<sup>b − a</sup>", "2<sup>b − a</sup>"), ""),
        ("vsak prafaktor ima v enem številu eksponent a, v ostalih treh b", "Največji skupni delitelj vzame najmanjši, najmanjši skupni večkratnik največji eksponent."),
        ("!3.4  D = 330<sup>min(a, b)</sup>,  v = 330<sup>max(a, b)</sup>", ""),
    ],
)

def tocke_n2(X, Y):
    return "".join(tocka(X, Y, n, n * n / 2) for n in range(1, 4))

def mnozica_a(X, Y):
    return (f'<rect x="{X(-4):.1f}" y="{Y(1):.1f}" width="{X(4) - X(-4):.1f}" height="{Y(-2) - Y(1):.1f}" fill="{MODRA}" fill-opacity="0.2"/>'
            f'<line x1="{X(-4):.1f}" y1="{Y(-2):.1f}" x2="{X(4):.1f}" y2="{Y(-2):.1f}" stroke="{MODRA}" stroke-width="2"/>'
            f'<line x1="{X(-4):.1f}" y1="{Y(1):.1f}" x2="{X(4):.1f}" y2="{Y(1):.1f}" stroke="{MODRA}" stroke-width="2" stroke-dasharray="5 4"/>')

def mnozica_b(X, Y):
    return f'<line x1="{X(-4):.1f}" y1="{Y(2):.1f}" x2="{X(4):.1f}" y2="{Y(2):.1f}" stroke="{MODRA}" stroke-width="2"/>'

v4 = naloga(
    4, ["funkcije", "zaporedja_vrste", "mnozice"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Reši naloge o funkcijah in zaporedjih.<br>"
    r"4.1. Nariši graf funkcije \(f: \mathbb{N} \to \mathbb{R}\), \(f(n) = \frac{1}{2}n^2\). Ali je \(f\) bijektivna? Utemelji. (3 točke)<br>"
    r"4.2. V ravnini nariši množici \(A = \mathbb{R} \times [-2, 1)\) in \(B = \mathbb{R} \times \{2\}\). Ali je \(A\) graf neke "
    r"funkcije \(f: \mathbb{R} \to \mathbb{R}\)? Ali je \(B\) graf neke take funkcije? Utemelji. (4 točke)<br>"
    r"4.3. Dokaži, da je zaporedje \(f(n) = \frac{2n}{n^2 + 1}\), \(n \in \mathbb{N}\), padajoče in omejeno. (4 točke)<br>"
    r"4.4. Za \(f(n) = \sqrt{n}\) izračunaj \(\displaystyle\lim_{n \to \infty} \big(f(n^2 + 2n) - f(n^2)\big)\). (2 točki)",
    r"4.1. ni bijektivna &nbsp; 4.2. \(A\) ni graf funkcije, \(B\) je graf funkcije \(f(x) = 2\) &nbsp; 4.4. \(1\)",
    [
        ("@slika", mreza((-1, 4), (-1, 5), tocke_n2, sirina=200)),
        ("!4.1  ni bijektivna: npr. število 1 ni slika nobenega n", "Graf so posamezne točke (1; 0,5), (2; 2), (3; 4,5) … Funkcija je injektivna, ni pa surjektivna na ℝ."),
        ("@slika", mreza((-4, 4), (-3, 3), mnozica_a, sirina=220)),
        ("!4.2  A ni graf funkcije", "Vsakemu x pripada neskončno mnogo y iz [−2, 1); funkcija mora vsakemu x prirediti natanko eno vrednost."),
        ("@slika", mreza((-4, 4), (-1, 3), mnozica_b, sirina=220)),
        ("!B je graf konstantne funkcije f(x) = 2", "Vsakemu x pripada natanko en y = 2."),
        ("4.3  f(n + 1) < f(n)  ⇔  " + U("2(n + 1)", "(n + 1)<sup>2</sup> + 1") + " < " + U("2n", "n<sup>2</sup> + 1"), "Padajoče: vsak naslednji člen je manjši."),
        ("(n + 1)(n<sup>2</sup> + 1) < n(n<sup>2</sup> + 2n + 2)  ⇔  0 < n<sup>2</sup> + n − 1", "Pomnožimo z obema (pozitivnima) imenovalcema in poenostavimo."),
        ("!velja za vsak n ≥ 1, zato je zaporedje padajoče", ""),
        ("!0 < f(n) ≤ f(1) = 1", "Vsi členi so pozitivni, največji je prvi, ker zaporedje pada: zaporedje je omejeno."),
        ("4.4  " + K("n<sup>2</sup> + 2n") + " − n = " + U("2n", K("n<sup>2</sup> + 2n") + " + n"), "Razširimo z vsoto korenov (razlika kvadratov)."),
        ("!" + LIM("n→∞") + " " + U("2", K("1 + 2/n") + " + 1") + " = " + U("2", "2") + " = 1", "Števec in imenovalec delimo z n."),
    ],
)

POLA2 = [v1, v2, v3, v4]
