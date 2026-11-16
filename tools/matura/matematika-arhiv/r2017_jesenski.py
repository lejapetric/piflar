# Jesenski rok 2017 (uradne pole RIC: m172-401-1-1, m172-402-1-1, m172-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2017, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["pravokotni_koordinatni_sistem_ravnina", "funkcije"], 6,
    r"Zapiši enačbo premice \(p\) skozi točki \(T_1(5, 2)\) in \(T_2(-1, 5)\). Določi ordinato \(y_3\) točke \(T_3(-11, y_3)\), da bo "
    r"ležala na premici \(p\).",
    r"\(y = -\frac{1}{2}x + \frac{9}{2}\), \(y_3 = 10\)",
    [
        ("k = " + U("5 − 2", "−1 − 5") + " = −" + U("1", "2"), "Smerni koeficient premice skozi dve točki."),
        ("y − 2 = −" + U("1", "2") + "(x − 5)", "Enačba premice skozi točko T₁."),
        ("!y = −" + U("1", "2") + "x + " + U("9", "2"), ""),
        ("!y<sub>3</sub> = " + U("11", "2") + " + " + U("9", "2") + " = 10", "Vstavimo x = −11."),
    ],
    snov=FUN + "linearna_razlaga.html",
)

def f2(x):
    return 3 / (1 + x * x)

n2 = naloga(
    2, ["funkcije", "diferencialni_racun"], 8,
    r"Na sliki je del grafa odvedljive funkcije \(f\), ki se asimptotično približuje abscisni osi in je simetričen glede na ordinatno os. "
    r"Funkcija nima ničel. Iz grafa razberi zahtevane podatke."
    + graf([(f2, MODRA)], (-5, 5), (-1, 4), tocke=[(-1, 1.5, "(−1; 1,5)"), (0, 3, "")], sirina=320, visina=170)
    + tabela(["Podatek", "Odgovor"], [["Definicijsko območje \\(D_f\\)", ""], ["Zaloga vrednosti \\(Z_f\\)", ""],
                                    ["Presečišče grafa z ordinatno osjo", ""], ["\\(f(-1)\\)", ""], ["Kje ima \\(f\\) globalni maksimum?", ""],
                                    ["Ali je \\(f\\) soda ali liha? Utemelji.", ""], ["\\(f'(0)\\)", ""]]),
    r"\(D_f = \mathbb{R}\), \(Z_f = (0, 3]\), \((0, 3)\), \(f(-1) = 1{,}5\), pri \(x = 0\), soda, \(f'(0) = 0\)",
    [
        ("!D<sub>f</sub> = ℝ", "Graf se razteza nad vso abscisno osjo."),
        ("!Z<sub>f</sub> = (0, 3]", "Funkcija je pozitivna, ničle nima, največja vrednost je 3."),
        ("!N(0, 3),  f(−1) = 1,5", "Preberemo z grafa."),
        ("!globalni maksimum pri x = 0", ""),
        ("!f je soda: f(−x) = f(x)", "Graf je simetričen glede na ordinatno os (sode in lihe funkcije)."),
        ("!f '(0) = 0", "V lokalnem ekstremu odvedljive funkcije je odvod 0 (stacionarne točke)."),
    ],
)

n3 = naloga(
    3, ["geometrijski_liki_telesa", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Vsota dolžin katet pravokotnega trikotnika je \(46\), hipotenuza meri \(34\). Izračunaj dolžini katet.",
    r"\(16\) in \(30\)",
    [
        (SISTEM("a + b = 46", "a<sup>2</sup> + b<sup>2</sup> = 34<sup>2</sup> = 1156"), "Pitagorov izrek."),
        ("(a + b)<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> + 2ab  ⇒  2ab = 2116 − 1156", "Kvadrat dvočlenika."),
        ("ab = 480", ""),
        ("t<sup>2</sup> − 46t + 480 = (t − 16)(t − 30) = 0", "Kateti sta rešitvi kvadratne enačbe (Vietovo pravilo)."),
        ("!a = 16,  b = 30", ""),
    ],
)

def mnozica_a(X, Y):
    return (f'<rect x="{X(-2):.1f}" y="{Y(2):.1f}" width="{X(1) - X(-2):.1f}" height="{Y(0) - Y(2):.1f}" fill="{MODRA}" fill-opacity="0.25"/>'
            f'<polyline points="{X(1):.1f},{Y(0):.1f} {X(-2):.1f},{Y(0):.1f} {X(-2):.1f},{Y(2):.1f}" fill="none" stroke="{MODRA}" stroke-width="2"/>'
            f'<polyline points="{X(-2):.1f},{Y(2):.1f} {X(1):.1f},{Y(2):.1f} {X(1):.1f},{Y(0):.1f}" fill="none" stroke="{MODRA}" stroke-width="2" stroke-dasharray="4 3"/>'
            + tocka(X, Y, -1, 1, "z₁"))

def mnozica_b(X, Y):
    return (f'<circle cx="{X(0):.1f}" cy="{Y(0):.1f}" r="{X(2) - X(0):.1f}" fill="{RDECA}" fill-opacity="0.2" stroke="{RDECA}" stroke-width="2"/>')

n4 = naloga(
    4, "stevilske_mnozice", 6,
    r"V kompleksni ravnini nariši množici \(A = \{z \in \mathbb{C};\ -2 \le \mathrm{Re}\, z < 1 \wedge 0 \le \mathrm{Im}\, z < 2\}\) in "
    r"\(B = \{z \in \mathbb{C};\ |z| \le 2\}\). Iz množice \(A\) izberi eno število \(z_1\) in ga zapiši v obliki \(z_1 = a + bi\).",
    r"npr. \(z_1 = -1 + i\)",
    [
        ("@slika", mreza((-3, 3), (-3, 3), mnozica_a, sirina=220)),
        ("!A: pravokotnik −2 ≤ Re z < 1, 0 ≤ Im z < 2", "Spodnji in levi rob sta vključena (polna črta), zgornji in desni nista (črtkano)."),
        ("@slika", mreza((-3, 3), (-3, 3), mnozica_b, sirina=220)),
        ("!B: krog s središčem 0 in polmerom 2 (z robom)", "|z| je razdalja od izhodišča."),
        ("!z<sub>1</sub> = −1 + i", "Re z₁ = −1 in Im z₁ = 1 ustrezata pogojema."),
    ],
)

n5 = naloga(
    5, "integralski_racun", 8,
    r"Izračunaj nedoločeni integral \(\displaystyle\int \left(\frac{4}{x^3} + 2\sqrt{x} - e^x + 3\right) dx\).",
    r"\(-\frac{2}{x^2} + \frac{4}{3}x\sqrt{x} - e^x + 3x + C\)",
    [
        ("∫ 4x<sup>−3</sup> dx = 4 · " + U("x<sup>−2</sup>", "−2") + " = −" + U("2", "x<sup>2</sup>"), "Integral potence: ∫ xⁿ dx = xⁿ⁺¹/(n + 1)."),
        ("∫ 2x<sup>1/2</sup> dx = 2 · " + U("x<sup>3/2</sup>", "3/2") + " = " + U("4", "3") + " x" + K("x"), "Koren zapišemo kot potenco."),
        ("∫ e<sup>x</sup> dx = e<sup>x</sup>,  ∫ 3 dx = 3x", "Integral eksponentne funkcije in integral konstante."),
        ("!−" + U("2", "x<sup>2</sup>") + " + " + U("4", "3") + "x" + K("x") + " − e<sup>x</sup> + 3x + C", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n6 = naloga(
    6, "vektorji_ravnina_prostor", 7,
    r"Točka \(S\left(\frac{3}{2}, \frac{5}{2}\right)\) je razpolovišče daljice \(AB\), kjer je \(A(4, 1)\). Zapiši koordinati točke \(B\). "
    r"Ali sta krajevna vektorja \(\vec{r}_A\) in \(\vec{r}_B\) pravokotna? Utemelji.",
    r"\(B(-1, 4)\); da, \(\vec{r}_A \cdot \vec{r}_B = 0\)",
    [
        (U("4 + x", "2") + " = " + U("3", "2") + ",  " + U("1 + y", "2") + " = " + U("5", "2"), "Razpolovišče: aritmetični sredini koordinat."),
        ("!B(−1, 4)", ""),
        (V("r<sub>A</sub>") + " · " + V("r<sub>B</sub>") + " = 4 · (−1) + 1 · 4 = 0", "Skalarni produkt."),
        ("!vektorja sta pravokotna", "Skalarni produkt neničelnih vektorjev je 0."),
    ],
)

n7 = naloga(
    7, "geometrijski_liki_telesa", 7,
    r"Osnovna ploskev pokončne piramide je pravokotnik s stranicama \(a = 8\) in \(b = 6\), višina piramide je \(12\). Nariši skico in "
    r"označi kot \(\varphi\) med stranskim robom in osnovno ploskvijo. Izračunaj prostornino piramide in kot \(\varphi\) na desetinko stopinje.",
    r"\(V = 192\), \(\varphi \approx 67{,}4^\circ\)",
    [
        ("!V = " + U("a · b · v", "3") + " = " + U("8 · 6 · 12", "3") + " = 192", "Prostornina piramide."),
        ("d = " + K("8<sup>2</sup> + 6<sup>2</sup>") + " = 10,  " + U("d", "2") + " = 5", "Vrh je nad presečiščem diagonal; Pitagorov izrek."),
        ("tan φ = " + U("v", "d/2") + " = " + U("12", "5"), "Kot φ je v pravokotnem trikotniku z višino in polovico diagonale."),
        ("!φ ≈ 67,4°", ""),
    ],
)

def kroga8(X, Y):
    return (f'<path d="M{X(-6):.1f},{Y(0):.1f} A{X(4) - X(0):.1f},{X(4) - X(0):.1f} 0 1 1 {X(2):.1f},{Y(0):.1f} A{X(4) - X(0):.1f},{X(4) - X(0):.1f} 0 1 1 {X(-6):.1f},{Y(0):.1f} Z '
            f'M{X(-4):.1f},{Y(2):.1f} A{X(2) - X(0):.1f},{X(2) - X(0):.1f} 0 1 0 {X(0):.1f},{Y(2):.1f} A{X(2) - X(0):.1f},{X(2) - X(0):.1f} 0 1 0 {X(-4):.1f},{Y(2):.1f} Z" '
            f'fill="currentColor" fill-opacity="0.25" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>')

n8 = naloga(
    8, ["stoznice", "geometrijski_liki_telesa"], 6,
    r"Osenčeno območje omejujeta krivulji z enačbama \((x + 2)^2 + y^2 = 16\) in \(x^2 + y^2 + 4x - 4y + 4 = 0\). Izračunaj ploščino "
    r"osenčenega območja. Rezultat naj bo točen." + mreza((-7, 3), (-5, 5), kroga8, sirina=260),
    r"\(12\pi\)",
    [
        ("(x + 2)<sup>2</sup> + y<sup>2</sup> = 16:  S<sub>1</sub>(−2, 0),  r<sub>1</sub> = 4", "Enačba krožnice v središčni obliki."),
        ("x<sup>2</sup> + 4x + 4 + y<sup>2</sup> − 4y + 4 = 4  ⇒  (x + 2)<sup>2</sup> + (y − 2)<sup>2</sup> = 4", "Dopolnimo do popolnega kvadrata."),
        ("S<sub>2</sub>(−2, 2),  r<sub>2</sub> = 2", "Manjši krog leži v večjem (razdalja središč 2 = r₁ − r₂)."),
        ("!S = π · 4<sup>2</sup> − π · 2<sup>2</sup> = 12π", "Ploščina kolobarja med krogoma."),
    ],
)

n9 = naloga(
    9, "funkcije", 6,
    r"Koti \(\alpha\), \(\beta\) in \(\gamma\) trikotnika so ostri. Brez računala dokaži, da je \(\sin\gamma = \frac{\sqrt{30} + \sqrt{2}}{8}\), če je "
    r"\(\cos\alpha = \frac{1}{4}\) in \(\beta = 45^\circ\).",
    r"dokaz",
    [
        ("sin α = " + K("1 − " + U("1", "16")) + " = " + U(K("15"), "4"), "sin² α + cos² α = 1; α je oster, zato je sin α > 0."),
        ("γ = 180° − (α + β)  ⇒  sin γ = sin(α + β)", "Vsota notranjih kotov; sin(180° − x) = sin x."),
        ("sin(α + β) = sin α cos β + cos α sin β", "Adicijski izrek."),
        ("= " + U(K("15"), "4") + " · " + U(K("2"), "2") + " + " + U("1", "4") + " · " + U(K("2"), "2"), ""),
        ("!= " + U(K("30") + " + " + K("2"), "8"), ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Izmed prvih \(40\) naravnih števil naključno izberemo dve. Izračunaj verjetnosti dogodkov \(A\): obe števili sta sodi, in "
    r"\(B\): vsaj eno število je večkratnik števila \(4\).",
    r"\(P(A) = \frac{19}{78}\), \(P(B) = \frac{23}{52}\)",
    [
        ("vseh izbir: " + BINOM(40, 2) + " = 780", "Dve števili izberemo s kombinacijami."),
        ("!P(A) = " + U(BINOM(20, 2), "780") + " = " + U("190", "780") + " = " + U("19", "78"), "Sodih števil je 20."),
        ("P(B) = 1 − " + U(BINOM(30, 2), "780") + " = 1 − " + U("435", "780"), "Nasprotni dogodek: nobeno ni večkratnik 4 (takih je 30)."),
        ("!P(B) = " + U("345", "780") + " = " + U("23", "52"), ""),
    ],
)

n11 = naloga(
    11, "stevilske_mnozice", 5,
    r"Ceno jakne so najprej znižali za \(25\,\%\), nato pa še za \(20\,\%\). Po drugem znižanju jo je Maja kupila za \(36{,}60\) €. "
    r"Odgovori s povedmi: Koliko odstotkov prvotne cene je plačala? Kolikšna je bila prvotna cena? Kolikšna je bila cena tik pred drugim znižanjem?",
    r"\(60\,\%\); \(61\) €; \(45{,}75\) €",
    [
        ("0,75 · 0,80 = 0,60", "Zaporedni znižanji: ceno pomnožimo z 0,75 in nato z 0,80."),
        ("!Maja je plačala 60 % prvotne cene.", ""),
        ("!x = " + U("36,60", "0,60") + " = 61 €: prvotna cena je bila 61 €.", "Sklepni račun."),
        ("!61 · 0,75 = 45,75 €: pred drugim znižanjem je jakna stala 45,75 €.", ""),
    ],
)

n12 = naloga(
    12, "zaporedja_vrste", 8,
    r"Zaporedje ima splošni člen \(a_n = \dfrac{2^n + 1}{3^n}\).<br>12.1. Izračunaj prve tri člene. (2 točki)<br>"
    r"12.2. Izračunaj limito zaporedja. (1 točka)<br>"
    r"12.3. Zapiši zaporedje kot vsoto dveh geometrijskih zaporedij in izračunaj vsoto vrste \(\displaystyle\sum_{n=1}^{\infty} a_n\). (5 točk)",
    r"12.1. \(1\), \(\frac{5}{9}\), \(\frac{1}{3}\) &nbsp; 12.2. \(0\) &nbsp; 12.3. \(\frac{5}{2}\)",
    [
        ("!12.1  a<sub>1</sub> = " + U("3", "3") + " = 1,  a<sub>2</sub> = " + U("5", "9") + ",  a<sub>3</sub> = " + U("9", "27") + " = " + U("1", "3"), ""),
        ("a<sub>n</sub> = (" + U("2", "3") + ")<sup>n</sup> + (" + U("1", "3") + ")<sup>n</sup>", "Ulomek razdelimo na dva dela."),
        ("!12.2  " + LIM("n→∞") + " a<sub>n</sub> = 0 + 0 = 0", "Geometrijsko zaporedje z |q| < 1 gre proti 0."),
        ("Σ (" + U("2", "3") + ")<sup>n</sup> = " + U("2/3", "1 − 2/3") + " = 2,  Σ (" + U("1", "3") + ")<sup>n</sup> = " + U("1/3", "1 − 1/3") + " = " + U("1", "2"), "Vsota geometrijske vrste a₁/(1 − q)."),
        ("!12.3  Σ a<sub>n</sub> = 2 + " + U("1", "2") + " = " + U("5", "2"), "Konvergentni vrsti seštejemo člen za členom."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["algebrski_izrazi_enacbe_neenacbe", "funkcije"], 13,
    r"Dana je kvadratna enačba \((m^2 + 2)x^2 + (2m^2 + 1)x + m^2 - 1 = 0\) z neznanko \(x\) in realnim parametrom \(m\).<br>"
    r"1.1. Dokaži, da ima enačba za vsak \(m\) realni rešitvi. (3 točke)<br>"
    r"1.2. Izračunaj rešitvi enačbe. Določi vse \(m\), pri katerih sta obe rešitvi negativni. (6 točk)<br>"
    r"1.3. Pri katerem \(m\) je vsota rešitev največja? Izračunaj rešitvi v tem primeru. (4 točke)",
    r"1.2. \(x_1 = -1\), \(x_2 = \frac{1 - m^2}{m^2 + 2}\); \(|m| > 1\) &nbsp; 1.3. \(m = 0\), \(x_1 = -1\), \(x_2 = \frac{1}{2}\)",
    [
        ("D = (2m<sup>2</sup> + 1)<sup>2</sup> − 4(m<sup>2</sup> + 2)(m<sup>2</sup> − 1)", "Diskriminanta kvadratne enačbe."),
        ("= 4m<sup>4</sup> + 4m<sup>2</sup> + 1 − 4m<sup>4</sup> − 4m<sup>2</sup> + 8 = 9", ""),
        ("!1.1  D = 9 > 0 za vsak m: rešitvi sta realni", "Vodilni koeficient m² + 2 ni nikoli 0."),
        ("x<sub>1,2</sub> = " + U("−(2m<sup>2</sup> + 1) ± 3", "2(m<sup>2</sup> + 2)"), "Rešitve kvadratne enačbe."),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = " + U("1 − m<sup>2</sup>", "m<sup>2</sup> + 2"), ""),
        ("x<sub>2</sub> < 0  ⇔  1 − m<sup>2</sup> < 0", "Imenovalec je pozitiven."),
        ("!1.2  m < −1 ali m > 1", ""),
        ("x<sub>1</sub> + x<sub>2</sub> = −" + U("2m<sup>2</sup> + 1", "m<sup>2</sup> + 2") + " = −2 + " + U("3", "m<sup>2</sup> + 2"), "Vietovo pravilo ali vsota obeh rešitev."),
        ("največja, ko je m<sup>2</sup> + 2 najmanjši: m = 0", "Ulomek 3/(m² + 2) je največji pri najmanjšem imenovalcu."),
        ("!1.3  m = 0:  x<sub>1</sub> = −1,  x<sub>2</sub> = " + U("1", "2"), "Enačba je 2x² + x − 1 = 0."),
    ],
)

v2 = naloga(
    2, ["zaporedja_vrste", "geometrijski_liki_telesa", "algebrski_izrazi_enacbe_neenacbe"], 14,
    r"Reši naloge o zaporedjih.<br>"
    r"2.1. Trije zaporedni členi naraščajočega geometrijskega zaporedja imajo vsoto \(42\). Če prvemu prištejemo \(1\), drugemu \(8\), od "
    r"tretjega pa odštejemo \(3\), dobimo zaporedne člene aritmetičnega zaporedja. Izračunaj te člene obeh zaporedij (uganjene rešitve se "
    r"ne točkujejo). (6 točk)<br>"
    r"2.2. Notranji koti \(\alpha\), \(\beta\), \(\gamma\) trikotnika so zaporedni členi aritmetičnega zaporedja. Dokaži, da za stranice velja "
    r"\(a^2 - ac + c^2 = b^2\). (3 točke)<br>"
    r"2.3. Izračunaj vse \(m > 0\), pri katerih so rešitve enačbe \(x^4 - (4 + m^2)x^2 + 4m^2 = 0\) zaporedni členi aritmetičnega zaporedja. (5 točk)",
    r"2.1. \(2, 8, 32\) in \(3, 16, 29\) &nbsp; 2.3. \(m = \frac{2}{3}\) ali \(m = 6\)",
    [
        (SISTEM("a + aq + aq<sup>2</sup> = 42", "2(aq + 8) = (a + 1) + (aq<sup>2</sup> − 3)"), "Srednji člen aritmetičnega zaporedja je aritmetična sredina sosednjih."),
        ("a(q<sup>2</sup> − 2q + 1) = 18  ⇒  a(q − 1)<sup>2</sup> = 18", "Uredimo drugo enačbo."),
        (U("1 + q + q<sup>2</sup>", "(q − 1)<sup>2</sup>") + " = " + U("42", "18") + "  ⇒  4q<sup>2</sup> − 17q + 4 = 0", "Enačbi delimo."),
        ("q = 4 ali q = " + U("1", "4") + ";  naraščajoče: q = 4, a = 2", "Rešitve kvadratne enačbe."),
        ("!2.1  geometrijsko: 2, 8, 32;  aritmetično: 3, 16, 29", ""),
        ("α + γ = 2β,  α + β + γ = 180°  ⇒  β = 60°", "Vsota notranjih kotov trikotnika."),
        ("b<sup>2</sup> = a<sup>2</sup> + c<sup>2</sup> − 2ac cos 60°", "Kosinusni izrek."),
        ("!2.2  b<sup>2</sup> = a<sup>2</sup> + c<sup>2</sup> − ac", "cos 60° = 1/2."),
        ("(x<sup>2</sup> − 4)(x<sup>2</sup> − m<sup>2</sup>) = 0:  x = ±2,  x = ±m", "Bikvadratna enačba; razcep z Vietovim pravilom."),
        ("m < 2: −2, −m, m, 2:  2m = 2 − m  ⇒  m = " + U("2", "3"), "Rešitve uredimo po velikosti; zaporedni razliki morata biti enaki."),
        ("m > 2: −m, −2, 2, m:  4 = m − 2  ⇒  m = 6", ""),
        ("!2.3  m = " + U("2", "3") + " ali m = 6", "Pri m = 2 sta le dve različni rešitvi."),
    ],
)

v3 = naloga(
    3, ["funkcije", "zaporedja_vrste"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dana je funkcija \(f: (0, \infty) \to \mathbb{R}\), \(f(x) = 2\ln x\).<br>"
    r"3.1. Reši enačbo \(3f(x) = f(4x)\). (3 točke)<br>"
    r"3.2. Dokaži, da je \(f\left(\frac{2}{3}\right) + f\left(\frac{3}{4}\right) = f\left(\frac{1}{2}\right)\). (3 točke)<br>"
    r"3.3. S popolno indukcijo dokaži, da za vsak \(n \in \mathbb{N}\) velja "
    r"\(f\left(\frac{2}{3}\right) + f\left(\frac{3}{4}\right) + \dots + f\left(\frac{n + 1}{n + 2}\right) = f\left(\frac{2}{n + 2}\right)\). (4 točke)<br>"
    r"3.4. Ali je vrsta \(\displaystyle\sum_{n=1}^{\infty} f\left(\frac{n + 1}{n + 2}\right)\) konvergentna? Utemelji. (3 točke)",
    r"3.1. \(x = 2\) &nbsp; 3.4. ni konvergentna",
    [
        ("6 ln x = 2 ln(4x)  ⇒  ln x<sup>3</sup> = ln(4x)", "Logaritem potence."),
        ("x<sup>3</sup> = 4x  ⇒  x<sup>2</sup> = 4", "x > 0, zato smemo deliti z x."),
        ("!3.1  x = 2", "x = −2 ni v definicijskem območju."),
        ("!3.2  2 ln " + U("2", "3") + " + 2 ln " + U("3", "4") + " = 2 ln(" + U("2", "3") + " · " + U("3", "4") + ") = 2 ln " + U("1", "2"), "Logaritem produkta je vsota logaritmov."),
        ("n = 1: f(" + U("2", "3") + ") = f(" + U("2", "3") + ")", "Baza indukcije."),
        ("f(" + U("2", "n + 2") + ") + f(" + U("n + 2", "n + 3") + ") = 2 ln(" + U("2", "n + 2") + " · " + U("n + 2", "n + 3") + ") = f(" + U("2", "n + 3") + ")", "Indukcijski korak: k vsoti za n prištejemo naslednji člen."),
        ("!3.3  trditev velja za vsak n", ""),
        ("s<sub>n</sub> = 2 ln " + U("2", "n + 2") + " → −∞", "Delne vsote smo izračunali v 3.3."),
        ("!3.4  vrsta ni konvergentna", "Zaporedje delnih vsot nima končne limite."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

v4 = naloga(
    4, "vektorji_ravnina_prostor", 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Vektorja \(\overrightarrow{AB} = \vec{a}\) in \(\overrightarrow{AD} = \vec{b}\) določata paralelogram \(ABCD\).<br>"
    r"4.1. Naj bo \(\vec{a} = (x - 2, 2)\) in \(\vec{b} = (3, x - 1)\). Pri katerem \(x\) je paralelogram pravokotnik? (4 točke)<br>"
    r"4.2. Točka \(E\) leži na stranici \(BC\), tako da je \(|BE| : |EC| = 1 : 2\), točka \(F\) je razpolovišče stranice \(CD\). Daljici \(AE\) in "
    r"\(BF\) se sekata v točki \(S\). Izračunaj razmerje \(|AS| : |SE|\). (5 točk)<br>"
    r"4.3. Kot med \(\vec{a}\) in \(\vec{b}\) meri \(60^\circ\), \(|\vec{a}| = 3\), \(|2\vec{a} - \vec{b}| = 2\sqrt{7}\) in \(|\vec{a}| < |\vec{b}|\). "
    r"Izračunaj dolžino vektorja \(\vec{c} = \vec{a} + 2\vec{b}\). (4 točke)",
    r"4.1. \(x = \frac{8}{5}\) &nbsp; 4.2. \(6 : 1\) &nbsp; 4.3. \(\sqrt{97}\)",
    [
        (V("a") + " · " + V("b") + " = 3(x − 2) + 2(x − 1) = 5x − 8 = 0", "Pravokotnik: sosednji stranici sta pravokotni, skalarni produkt je 0."),
        ("!4.1  x = " + U("8", "5"), ""),
        (V("AE") + " = " + V("a") + " + " + U("1", "3") + V("b") + ",  " + V("BF") + " = −" + U("1", "2") + V("a") + " + " + V("b"), "Izrazimo vektorja z baznima vektorjema."),
        (V("AS") + " = t" + V("AE") + " = " + V("a") + " + s" + V("BF"), "S leži na obeh daljicah."),
        (SISTEM("t = 1 − " + U("s", "2"), U("t", "3") + " = s"), "Primerjamo koeficienta pri a in b (vektorja sta nekolinearna)."),
        ("t = " + U("6", "7"), ""),
        ("!4.2  |AS| : |SE| = 6 : 1", ""),
        ("|2" + V("a") + " − " + V("b") + "|<sup>2</sup> = 4 · 9 − 4 · 3 · y · " + U("1", "2") + " + y<sup>2</sup> = 28,  y = |" + V("b") + "|", "Kvadrat dolžine izrazimo s skalarnim produktom."),
        ("y<sup>2</sup> − 6y + 8 = 0  ⇒  y = 4 (ker je |" + V("b") + "| > 3)", ""),
        ("|" + V("c") + "|<sup>2</sup> = 9 + 4 · 3 · 4 · " + U("1", "2") + " + 4 · 16 = 97", "|a + 2b|² = |a|² + 4 a·b + 4|b|²."),
        ("!4.3  |" + V("c") + "| = " + K("97"), ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
