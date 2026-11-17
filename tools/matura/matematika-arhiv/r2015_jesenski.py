# Jesenski rok 2015 (uradne pole RIC: m152-401-1-1, m152-402-1-1, m152-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2015, "jesenski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
def stevilska():
    X = lambda x: 30 + (x + 4) * 34
    t = []
    for y0, (a, b, za, zb, barva, ime) in ((40, (-3, 2, True, False, MODRA, "A")), (95, (0, 4, True, True, RDECA, "B"))):
        t.append(f'<line x1="{X(-4)}" y1="{y0}" x2="{X(5)}" y2="{y0}" stroke="currentColor" stroke-width="1.2"/>')
        for i in range(-4, 6):
            t.append(f'<line x1="{X(i)}" y1="{y0 - 4}" x2="{X(i)}" y2="{y0 + 4}" stroke="currentColor"/>'
                     f'<text x="{X(i)}" y="{y0 + 17}" font-size="10" text-anchor="middle" fill="currentColor">{str(i).replace("-", "−")}</text>')
        t.append(f'<line x1="{X(a)}" y1="{y0 - 8}" x2="{X(b)}" y2="{y0 - 8}" stroke="{barva}" stroke-width="3"/>')
        for x, z in ((a, za), (b, zb)):
            t.append(f'<circle cx="{X(x)}" cy="{y0 - 8}" r="4.5" fill="{barva if z else "white"}" stroke="{barva}" stroke-width="2"/>')
        t.append(f'<text x="8" y="{y0 + 4}" font-size="12" fill="{barva}">{ime}</text>')
    return svg(360, 120, "".join(t))

n1 = naloga(
    1, "mnozice", 5,
    r"Dana sta intervala \(A = [-3, 2)\) in \(B = [0, 4]\).<br>"
    r"1.1. Ponazori množici \(A\) in \(B\) na številski premici. (2 točki)<br>"
    r"1.2. Zapiši intervale \(A \cup B\), \(A \cap B\) in \(A \setminus B\). (3 točke)",
    r"1.2. \(A \cup B = [-3, 4]\), \(A \cap B = [0, 2)\), \(A \setminus B = [-3, 0)\)",
    [
        ("@slika", stevilska()),
        ("!1.1  polna pika: krajišče je vključeno, prazna: ni vključeno", "Oglati oklepaj pomeni zaprto, okrogli odprto krajišče."),
        ("!A ∪ B = [−3, 4]", "Unija: števila, ki so v A ali v B."),
        ("!A ∩ B = [0, 2)", "Presek: števila, ki so v obeh množicah."),
        ("!A \\ B = [−3, 0)", "Razlika: števila iz A, ki niso v B."),
    ],
)

n2 = naloga(
    2, "geometrijski_liki_telesa", 6,
    r"Izračunaj neznane količine \(a\), \(x\) in \(y\). Rezultate zaokroži na eno decimalno mesto.<br>"
    r"2.1. V pravokotnem trikotniku meri hipotenuza \(8\), ena kateta pa \(3\). Druga kateta je \(a\). (2 točki)<br>"
    r"2.2. V pravokotnem trikotniku meri kateta ob kotu \(58^\circ\) \(6\). Hipotenuza je \(x\). (2 točki)<br>"
    r"2.3. V trikotniku merita stranici \(8\) in \(5\), kot med njima pa \(75^\circ\). Tretja stranica je \(y\). (2 točki)",
    r"\(a \approx 7{,}4\), \(x \approx 11{,}3\), \(y \approx 8{,}3\)",
    [
        ("!a = " + K("8<sup>2</sup> − 3<sup>2</sup>") + " = " + K("55") + " ≈ 7,4", "Pitagorov izrek."),
        ("!cos 58° = " + U("6", "x") + "  ⇒  x = " + U("6", "cos 58°") + " ≈ 11,3", "Kotne funkcije v pravokotnem trikotniku: priležna kateta / hipotenuza."),
        ("y<sup>2</sup> = 8<sup>2</sup> + 5<sup>2</sup> − 2 · 8 · 5 · cos 75° ≈ 68,29", "Kosinusni izrek."),
        ("!y ≈ 8,3", ""),
    ],
)

n3 = naloga(
    3, "zaporedja_vrste", 8,
    r"Dani sta števili \(a_1 = 2\) in \(a_2 = 6\).<br>"
    r"3.1. Števili sta prva dva člena aritmetičnega zaporedja. Zapiši peti člen in izračunaj vsoto prvih sto členov. (4 točke)<br>"
    r"3.2. Števili sta prva dva člena geometrijskega zaporedja. Zapiši četrti člen in izračunaj vsoto prvih petnajst členov. (4 točke)",
    r"3.1. \(a_5 = 18\), \(s_{100} = 20\,000\) &nbsp; 3.2. \(a_4 = 54\), \(s_{15} = 3^{15} - 1 = 14\,348\,906\)",
    [
        ("d = 6 − 2 = 4", "Diferenca aritmetičnega zaporedja."),
        ("!a<sub>5</sub> = 2 + 4 · 4 = 18", "Splošni člen aritmetičnega zaporedja."),
        ("!s<sub>100</sub> = " + U("100", "2") + "(2 · 2 + 99 · 4) = 50 · 400 = 20 000", "Vsota členov aritmetičnega zaporedja."),
        ("q = " + U("6", "2") + " = 3", "Kvocient geometrijskega zaporedja."),
        ("!a<sub>4</sub> = 2 · 3<sup>3</sup> = 54", "Splošni člen geometrijskega zaporedja."),
        ("!s<sub>15</sub> = 2 · " + U("3<sup>15</sup> − 1", "3 − 1") + " = 3<sup>15</sup> − 1 = 14 348 906", "Vsota členov geometrijskega zaporedja."),
    ],
)

n4 = naloga(
    4, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 7,
    r"Reši enačbi brez računala.<br>"
    r"4.1. \(3^{x + 1} + 2 \cdot 3^x = \frac{5}{27}\) (3 točke)<br>"
    r"4.2. \(\log (x + 3) = 1 - \log x\) (4 točke)",
    r"4.1. \(x = -3\) &nbsp; 4.2. \(x = 2\)",
    [
        ("3<sup>x</sup>(3 + 2) = " + U("5", "27") + "  ⇒  3<sup>x</sup> = " + U("1", "27") + " = 3<sup>−3</sup>", "Izpostavimo skupni faktor 3ˣ."),
        ("!4.1  x = −3", "Eksponentna funkcija je injektivna."),
        ("log(x + 3) + log x = 1  ⇒  log(x(x + 3)) = log 10", "Vsota logaritmov je logaritem produkta."),
        ("x<sup>2</sup> + 3x − 10 = 0  ⇒  (x + 5)(x − 2) = 0", ""),
        ("!4.2  x = 2", "x = −5 ni v definicijskem območju (x > 0)."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n5 = naloga(
    5, "funkcije", 8,
    r"Poenostavi izraza.<br>"
    r"5.1. \(\dfrac{1 + \cos (2x)}{\sin (2x)}\) (4 točke)<br>"
    r"5.2. \(\sin (x + 60^\circ) + \cos (x + 30^\circ) - \cos (180^\circ - x)\) (4 točke)",
    r"5.1. \(\cot x\) &nbsp; 5.2. \((\sqrt{3} + 1)\cos x\)",
    [
        (U("1 + cos<sup>2</sup> x − sin<sup>2</sup> x", "2 sin x cos x") + " = " + U("2 cos<sup>2</sup> x", "2 sin x cos x"),
         "Kotne funkcije dvojnega kota; sin²x + cos²x = 1."),
        ("!5.1  cot x", ""),
        ("sin(x + 60°) = " + U("1", "2") + " sin x + " + U(K("3"), "2") + " cos x", "Adicijski izrek za sinus."),
        ("cos(x + 30°) = " + U(K("3"), "2") + " cos x − " + U("1", "2") + " sin x", "Adicijski izrek za kosinus."),
        ("cos(180° − x) = −cos x", "Prehod na ostri kot."),
        ("!5.2  " + K("3") + " cos x + cos x = (" + K("3") + " + 1) cos x", ""),
    ],
)

n6 = naloga(
    6, "vektorji_ravnina_prostor", 7,
    r"V prostoru sta dani točki \(A(2, -1, 3)\) in \(B(-4, 2, 0)\).<br>"
    r"6.1. Izračunaj koordinate točke \(M\), za katero je \(\overrightarrow{AM} = 2\overrightarrow{AB}\). (3 točke)<br>"
    r"6.2. Dan je vektor \(\vec{b} = (x + 1, 3, -2x)\). Izračunaj \(x\), da bo \(\vec{b}\) pravokoten na krajevni vektor \(\vec{r}_A\) točke \(A\). (4 točke)",
    r"6.1. \(M(-10, 5, -3)\) &nbsp; 6.2. \(x = -\frac{1}{4}\)",
    [
        (V("AB") + " = (−6, 3, −3)", "Koordinate vektorja: končna minus začetna točka."),
        (V("r<sub>M</sub>") + " = " + V("r<sub>A</sub>") + " + 2" + V("AB") + " = (2, −1, 3) + (−12, 6, −6)", ""),
        ("!6.1  M(−10, 5, −3)", ""),
        (V("b") + " · " + V("r<sub>A</sub>") + " = 2(x + 1) − 3 − 6x = −4x − 1 = 0", "Pravokotna vektorja imata skalarni produkt 0."),
        ("!6.2  x = −" + U("1", "4"), ""),
    ],
)

def f7(x):
    return (x + 2) / (x - 1)

n7 = naloga(
    7, ["funkcije", "diferencialni_racun"], 8,
    r"Nariši graf funkcije \(f(x) = \dfrac{x + 2}{x - 1}\). Zapiši presečišči grafa s koordinatnima osema ter enačbi navpične in vodoravne "
    r"asimptote. Računsko dokaži, da funkcija nima stacionarnih točk.",
    r"\((-2, 0)\), \((0, -2)\), \(x = 1\), \(y = 1\); \(f'(x) = -\frac{3}{(x - 1)^2} \ne 0\)",
    [
        ("!N(−2, 0),  Z(0, −2)", "Ničla števca in začetna vrednost f(0)."),
        ("!pol x = 1,  vodoravna asimptota y = 1", "Ničla imenovalca; razmerje vodilnih koeficientov enako visokih stopenj."),
        ("@slika", graf([(f7, MODRA)], (-5, 6), (-5, 6), tocke=[(-2, 0, ""), (0, -2, "")], sirina=300, visina=300)),
        ("f '(x) = " + U("(x − 1) − (x + 2)", "(x − 1)<sup>2</sup>") + " = −" + U("3", "(x − 1)<sup>2</sup>"), "Odvod kvocienta."),
        ("!f '(x) ≠ 0 za vsak x ≠ 1, zato f nima stacionarnih točk", "Števec odvoda je konstanta −3."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n8 = naloga(
    8, ["kombinatorika", "verjetnostni_racun"], 7,
    r"Na izbiro imamo črke K, O, R, A, U in T.<br>"
    r"8.1. Koliko različnih besed, v katerih vsaka črka nastopi natanko enkrat, lahko zapišemo? (2 točki)<br>"
    r"8.2. Koliko različnih dvočrkovnih besed lahko sestavimo, če se črke ne ponavljajo? (2 točki)<br>"
    r"8.3. Naključno izberemo tri različne črke. Kolikšna je verjetnost, da smo izbrali vse tri samoglasnike? (3 točke)",
    r"8.1. \(720\) &nbsp; 8.2. \(30\) &nbsp; 8.3. \(\frac{1}{20}\)",
    [
        ("!8.1  P<sub>6</sub> = 6! = 720", "Permutacije brez ponavljanja."),
        ("!8.2  V<sub>6</sub><sup>2</sup> = 6 · 5 = 30", "Variacije brez ponavljanja."),
        (BINOM("6", "3") + " = 20", "Izbor treh črk je kombinacija; samoglasniki so O, A, U."),
        ("!8.3  P = " + U("1", "20"), "Ugoden je en sam izbor."),
    ],
)

n9 = naloga(
    9, "algebrski_izrazi_enacbe_neenacbe", 5,
    r"Reši neenačbo \(x^2(x + 2) < 3x\).",
    r"\(x \in (-\infty, -3) \cup (0, 1)\)",
    [
        ("x<sup>3</sup> + 2x<sup>2</sup> − 3x < 0", "Vse člene prenesemo na levo stran."),
        ("x(x + 3)(x − 1) < 0", "Izpostavimo x in razstavimo kvadratni trinom (Vietovo pravilo)."),
        ("ničle: −3, 0, 1 (enojne)", "Polinom tretje stopnje s pozitivnim vodilnim koeficientom je za velike x pozitiven, pri enojnih ničlah menja predznak."),
        ("!x ∈ (−∞, −3) ∪ (0, 1)", ""),
    ],
)

def krog10(X, Y):
    sx, sy, r = -3, 4, 5
    def odsek(pogoj):
        pts = []
        for i in range(721):
            t = 2 * math.pi * i / 720
            x, y = sx + r * math.cos(t), sy + r * math.sin(t)
            if pogoj(x, y):
                pts.append((x, y))
        return pts
    spodaj = sorted(odsek(lambda x, y: y <= 0), key=lambda p: p[0])
    desno = sorted(odsek(lambda x, y: x >= 0), key=lambda p: p[1])
    pot = lambda ps: " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in ps)
    return (f'<polygon points="{pot(spodaj)}" fill="{MODRA}" fill-opacity="0.25"/>'
            f'<polygon points="{pot(desno)}" fill="{MODRA}" fill-opacity="0.25"/>'
            + parametricna(X, Y, lambda t: sx + r * math.cos(t), lambda t: sy + r * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -6, 0, "A", dx=-12, dy=-6) + tocka(X, Y, 0, 8, "B", dx=6) + tocka(X, Y, -3, 4, "S"))

n10 = naloga(
    10, ["stoznice", "geometrijski_liki_telesa"], 6,
    r"Nalogo reši brez računala. Na sliki je krožnica \(x^2 + y^2 + 6x - 8y = 0\), ki seka koordinatni osi v izhodišču ter v točkah \(A\) in \(B\)."
    + mreza((-9, 3), (-2, 10), krog10, sirina=300)
    + r"10.1. Zapiši koordinati točk \(A\) in \(B\). (2 točki)<br>"
      r"10.2. Zapiši središče in polmer krožnice. (2 točki)<br>"
      r"10.3. Izračunaj ploščino osenčenega dela (oba krožna odseka). Rezultat naj bo točen. (2 točki)",
    r"10.1. \(A(-6, 0)\), \(B(0, 8)\) &nbsp; 10.2. \(S(-3, 4)\), \(r = 5\) &nbsp; 10.3. \(\frac{25\pi}{2} - 24\)",
    [
        ("y = 0:  x<sup>2</sup> + 6x = 0;  x = 0:  y<sup>2</sup> − 8y = 0", "Presečišča z osema."),
        ("!10.1  A(−6, 0),  B(0, 8)", ""),
        ("(x + 3)<sup>2</sup> + (y − 4)<sup>2</sup> = 9 + 16 = 25", "Dopolnimo do popolnih kvadratov."),
        ("!10.2  S(−3, 4),  r = 5", ""),
        ("∢AOB = 90°  ⇒  AB je premer", "Obodni kot nad premerom je pravi (Talesov izrek)."),
        ("!10.3  p = " + U("π · 25", "2") + " − " + U("6 · 8", "2") + " = " + U("25π", "2") + " − 24", "Polkrog minus pravokotni trikotnik OAB."),
    ],
)

n11 = naloga(
    11, "integralski_racun", 7,
    r"Izračunaj ploščino lika, ki ga omejujeta krivulji \(y = 2x + 3\) in \(y = x^2 - 2x + 3\).",
    r"\(\frac{32}{3}\)",
    [
        ("x<sup>2</sup> − 2x + 3 = 2x + 3  ⇒  x(x − 4) = 0", "Presečišči: x = 0 in x = 4."),
        ("@slika", graf([(lambda x: 2 * x + 3, RDECA), (lambda x: x * x - 2 * x + 3, MODRA)], (-2, 6), (-1, 12), tocke=[(0, 3, ""), (4, 11, "(4, 11)")], sirina=280, visina=320)),
        ("p = " + INT("4", "0") + "((2x + 3) − (x<sup>2</sup> − 2x + 3)) dx = " + INT("4", "0") + "(4x − x<sup>2</sup>) dx", "Na [0, 4] je premica nad parabolo."),
        ("p = (2x<sup>2</sup> − " + U("x<sup>3</sup>", "3") + ")" + MEJA("4", "0") + " = 32 − " + U("64", "3"), ""),
        ("!p = " + U("32", "3"), ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n12 = naloga(
    12, "geometrijski_liki_telesa", 6,
    r"Z vrha Triglava (nadmorska višina \(2864\ \mathrm{m}\)) se v lepem vremenu odpre čudovit razgled.<br>"
    r"12.1. Kočo, ki je od vrha (po zračni črti) oddaljena \(1530\ \mathrm{m}\), vidimo pod depresijskim kotom \(52^\circ 24'\). Izračunaj "
    r"nadmorsko višino koče na meter natančno. (3 točke)<br>"
    r"12.2. Na zemljevidu v merilu \(1 : 50\,000\) je razdalja med vrhom Triglava in vrhom Mangarta (nadmorska višina \(2679\ \mathrm{m}\)) "
    r"\(36{,}8\ \mathrm{cm}\). Na meter natančno izračunaj, koliko sta vrhova oddaljena v naravi. (3 točke)",
    r"12.1. \(\approx 1652\ \mathrm{m}\) &nbsp; 12.2. \(\approx 18\,401\ \mathrm{m}\)",
    [
        ("h = 1530 · sin 52°24' ≈ 1212 m", "Višinska razlika je kateta nasproti kota v pravokotnem trikotniku s hipotenuzo 1530 m."),
        ("!12.1  2864 − 1212 = 1652 m", ""),
        ("36,8 cm · 50 000 = 1 840 000 cm = 18 400 m", "Merilo: 1 cm na zemljevidu je 50 000 cm v naravi (vodoravna razdalja)."),
        ("d = " + K("18 400<sup>2</sup> + 185<sup>2</sup>"), "Višinska razlika 2864 − 2679 = 185 m; Pitagorov izrek."),
        ("!12.2  d ≈ 18 401 m", ""),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def f_v1(x):
    return x * math.cos(2 * x)

def senca_v1():
    s = graf([(f_v1, MODRA)], (-0.3, 2.2), (-1.4, 0.8), sirina=340, visina=200, oznake=False)
    return s

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Dana je funkcija \(f(x) = x \cos (2x)\).<br>"
    r"1.1. Izračunaj ničle funkcije \(f\). (3 točke)<br>"
    r"1.2. Zapiši enačbo tangente na graf funkcije v točki z absciso \(x = \frac{\pi}{2}\). (4 točke)<br>"
    r"1.3. Izračunaj natančno ploščino območja, ki ga graf funkcije \(f\) na intervalu \(\left[0, \frac{\pi}{4}\right]\) oklepa z abscisno osjo. (7 točk)",
    r"1.1. \(x = 0\), \(x = \frac{\pi}{4} + \frac{k\pi}{2}\), \(k \in \mathbb{Z}\) &nbsp; 1.2. \(y = -x\) &nbsp; 1.3. \(\frac{\pi}{8} - \frac{1}{4}\)",
    [
        ("x = 0  ali  cos 2x = 0  ⇒  2x = " + U("π", "2") + " + kπ", "Produkt je 0, ko je en faktor 0."),
        ("!1.1  x = 0,  x = " + U("π", "4") + " + " + U("kπ", "2") + ", k ∈ ℤ", ""),
        ("f '(x) = cos 2x − 2x sin 2x", "Odvod produkta in verižno pravilo."),
        ("f(" + U("π", "2") + ") = " + U("π", "2") + " cos π = −" + U("π", "2") + ",  f '(" + U("π", "2") + ") = −1 − π · 0 = −1", ""),
        ("y + " + U("π", "2") + " = −(x − " + U("π", "2") + ")", "Enačba tangente: y − f(x₀) = f'(x₀)(x − x₀)."),
        ("!1.2  y = −x", ""),
        ("p = " + INT("π/4", "0") + "x cos 2x dx", "Na [0, π/4] je f(x) ≥ 0."),
        ("u = x, dv = cos 2x dx  ⇒  du = dx, v = " + U("1", "2") + " sin 2x", "Integracija po delih (per partes)."),
        ("∫ x cos 2x dx = " + U("x", "2") + " sin 2x − " + U("1", "2") + "∫ sin 2x dx = " + U("x", "2") + " sin 2x + " + U("1", "4") + " cos 2x + C", ""),
        ("p = (" + U("x", "2") + " sin 2x + " + U("1", "4") + " cos 2x)" + MEJA("π/4", "0") + " = (" + U("π", "8") + " + 0) − (0 + " + U("1", "4") + ")", ""),
        ("!1.3  p = " + U("π", "8") + " − " + U("1", "4"), ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

def mnozica_v2(X, Y):
    pts = [(3 + 2 * math.cos(t), 4 + 2 * math.sin(t)) for t in [math.pi / 4 + math.pi * i / 180 for i in range(181)]]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.25" stroke="{MODRA}" stroke-width="2"/>'
            + krivulja(X, Y, lambda x: x + 1, -1, 6, RDECA) + tocka(X, Y, 3, 4, "z₁"))

v2 = naloga(
    2, "stevilske_mnozice", 14,
    r"Obvezna naloga. Dano je kompleksno število \(z_1 = 3 + 4i\).<br>"
    r"2.1. Za katera kompleksna števila \(u = x + yi\) (\(x, y \in \mathbb{R}\)) velja \(|z_1 - \mathrm{Re}(u)| = 5\) in \(u \cdot \bar{u} = 40\)? (6 točk)<br>"
    r"2.2. Dana je enačba \(x^3 + ax^2 + bx + c = 0\), \(a, b, c \in \mathbb{R}\). Izračunaj \(a\), \(b\) in \(c\), da bosta števili \(z_1 = 3 + 4i\) "
    r"in \(z_2 = 1\) rešitvi enačbe. (4 točke)<br>"
    r"2.3. V kompleksni ravnini nariši množico \(A = \{w \in \mathbb{C};\ |w - z_1| \le 2 \wedge \mathrm{Im}(w) \ge \mathrm{Re}(w) + 1\}\) in "
    r"izračunaj njeno ploščino. Rezultat naj bo točen. (4 točke)",
    r"2.1. \(u = \pm 2\sqrt{10}\,i\), \(u = 6 \pm 2i\) &nbsp; 2.2. \(a = -7\), \(b = 31\), \(c = -25\) &nbsp; 2.3. \(2\pi\)",
    [
        ("|(3 − x) + 4i| = 5  ⇒  (3 − x)<sup>2</sup> + 16 = 25", "Re(u) = x je realno število; absolutna vrednost kompleksnega števila."),
        ("3 − x = ±3  ⇒  x = 0 ali x = 6", ""),
        ("u · ū = x<sup>2</sup> + y<sup>2</sup> = 40", "Produkt števila s konjugirano vrednostjo je |u|²."),
        ("x = 0: y = ±2" + K("10") + ";  x = 6: y = ±2", ""),
        ("!2.1  u = ±2" + K("10") + " i,  u = 6 ± 2i", ""),
        ("z̄<sub>1</sub> = 3 − 4i je tudi rešitev", "Polinom z realnimi koeficienti ima s kompleksno ničlo tudi konjugirano."),
        ("(x − 3 − 4i)(x − 3 + 4i) = x<sup>2</sup> − 6x + 25", ""),
        ("(x<sup>2</sup> − 6x + 25)(x − 1) = x<sup>3</sup> − 7x<sup>2</sup> + 31x − 25", ""),
        ("!2.2  a = −7,  b = 31,  c = −25", ""),
        ("@slika", mreza((-1, 6), (0, 7), mnozica_v2, sirina=260)),
        ("premica y = x + 1 poteka skozi središče (3, 4)", "4 = 3 + 1: premica razpolovi krog s središčem z₁ in polmerom 2."),
        ("!2.3  p = " + U("π · 2<sup>2</sup>", "2") + " = 2π", "A je polkrog nad premico."),
    ],
)

def kocka():
    A, B, C, D = (40, 200), (190, 200), (250, 150), (100, 150)
    E, F, G, H = (40, 50), (190, 50), (250, 0 + 0), (100, 0)
    sh = lambda p: (p[0] + 10, p[1] + 20)
    A, B, C, D, E, F, G, H = map(sh, (A, B, C, D, E, F, G, H))
    crta = lambda p, q, crt="": (f'<line x1="{p[0]}" y1="{p[1]}" x2="{q[0]}" y2="{q[1]}" stroke="currentColor" stroke-width="1.5"'
                                 + (' stroke-dasharray="4 3"' if crt else "") + "/>")
    t = "".join(crta(p, q) for p, q in ((A, B), (B, C), (E, F), (F, G), (G, H), (H, E), (A, E), (B, F), (C, G)))
    t += "".join(crta(p, q, 1) for p, q in ((A, D), (D, C), (D, H)))
    for p, n, dx, dy in ((A, "A", -12, 12), (B, "B", 4, 14), (C, "C", 6, 6), (D, "D", -14, -4), (E, "E", -14, 0), (F, "F", 4, 14),
                         (G, "G", 6, 0), (H, "H", -14, -2)):
        t += f'<text x="{p[0] + dx}" y="{p[1] + dy}" font-size="12" fill="currentColor">{n}</text>'
    return svg(300, 240, t)

v3 = naloga(
    3, ["vektorji_ravnina_prostor", "geometrijski_liki_telesa"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dana je kocka \(ABCDEFGH\) z robom \(a\). Točka \(P\) je razpolovišče roba \(EH\), točka \(S\) pa "
    r"presečišče diagonal kvadrata \(CDHG\)." + kocka()
    + r"3.1. Z vektorji \(\overrightarrow{AB} = \vec{a}\), \(\overrightarrow{AD} = \vec{b}\) in \(\overrightarrow{AE} = \vec{c}\) izrazi vektorja "
      r"\(\overrightarrow{BS}\) in \(\overrightarrow{CP}\), izračunaj njun skalarni produkt in kot med njima. (5 točk)<br>"
      r"3.2. Izračunaj največji notranji kot trikotnika \(BPH\). (4 točke)<br>"
      r"3.3. Kocki očrtamo kroglo. Za koliko odstotkov je prostornina krogle večja od prostornine kocke? (3 točke)",
    r"3.1. \(\overrightarrow{BS} = -\frac{1}{2}\vec{a} + \vec{b} + \frac{1}{2}\vec{c}\), \(\overrightarrow{CP} = -\vec{a} - \frac{1}{2}\vec{b} + \vec{c}\), "
    r"\(\overrightarrow{BS} \cdot \overrightarrow{CP} = \frac{a^2}{2}\), \(\varphi \approx 74{,}21^\circ\) &nbsp; 3.2. \(\approx 109{,}47^\circ\) &nbsp; "
    r"3.3. za \(\approx 172\,\%\)",
    [
        ("!" + V("BS") + " = −" + U("1", "2") + V("a") + " + " + V("b") + " + " + U("1", "2") + V("c"), "S je središče stranske ploskve CDHG: od B gremo do C, nato pol poti proti D in proti G."),
        ("!" + V("CP") + " = −" + V("a") + " − " + U("1", "2") + V("b") + " + " + V("c"), "Od C do D, nato do H in pol poti nazaj proti E."),
        ("!" + V("BS") + " · " + V("CP") + " = " + U("a<sup>2</sup>", "2") + " − " + U("a<sup>2</sup>", "2") + " + " + U("a<sup>2</sup>", "2") + " = " + U("a<sup>2</sup>", "2"),
         "Bazni vektorji so paroma pravokotni in dolgi a."),
        ("|" + V("BS") + "| = " + U("a" + K("6"), "2") + ",  |" + V("CP") + "| = " + U("3a", "2"), "Dolžina vektorja."),
        ("cos φ = " + U("a<sup>2</sup>/2", "(a" + K("6") + "/2)(3a/2)") + " = " + U("2", "3" + K("6")), "Kot med vektorjema."),
        ("!φ ≈ 74,21°", ""),
        ("|BP| = " + U("3a", "2") + ",  |BH| = a" + K("3") + ",  |PH| = " + U("a", "2"), "Največji kot leži nasproti najdaljše stranice BH."),
        ("cos ∢BPH = " + U(V("PB") + " · " + V("PH"), "|PB| · |PH|") + " = " + U("−a<sup>2</sup>/4", "3a<sup>2</sup>/4") + " = −" + U("1", "3"),
         "PB = a − ½b − c, PH = ½b."),
        ("!∢BPH ≈ 109,47°", ""),
        ("R = " + U("a" + K("3"), "2") + "  ⇒  V<sub>k</sub> = " + U("4π", "3") + " · " + U("3" + K("3") + " a<sup>3</sup>", "8") + " = " + U(K("3") + " π", "2") + " a<sup>3</sup> ≈ 2,72 a<sup>3</sup>",
         "Premer očrtane krogle je telesna diagonala kocke; prostornina krogle."),
        ("!3.3  krogla ima za ≈ 172 % večjo prostornino", ""),
    ],
)

def tocke_v4(X, Y):
    pts = [(2, 2, "A"), (6, 2, "B"), (8, 8, "C"), (2, 6, "D")]
    pot = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y, _ in pts)
    return (f'<polygon points="{pot}" fill="{MODRA}" fill-opacity="0.12" stroke="{MODRA}" stroke-width="1.5"/>'
            + parametricna(X, Y, lambda t: 4 + math.sqrt(20) * math.cos(t), lambda t: 6 + math.sqrt(20) * math.sin(t), 0, 2 * math.pi, RDECA)
            + krivulja(X, Y, lambda x: x, 0, 10, "#888")
            + "".join(tocka(X, Y, x, y, n) for x, y, n in pts))

v4 = naloga(
    4, ["pravokotni_koordinatni_sistem_ravnina", "stoznice", "geometrijski_liki_telesa"], 12,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V ravnini so dane točke \(A(2, 2)\), \(B(6, 2)\) in \(C(8, 8)\). Z zrcaljenjem točke \(B\) čez "
    r"premico \(y = x\) dobimo točko \(D\).<br>"
    r"4.1. Nariši točke \(A\), \(B\), \(C\), \(D\) in zapiši enačbo trikotniku \(ABC\) očrtane krožnice. (4 točke)<br>"
    r"4.2. Izračunaj ploščino štirikotnika \(ABCD\). (2 točki)<br>"
    r"4.3. Trikotnik \(ABC\) zavrtimo za \(360^\circ\) okrog stranice \(AC\). Dokaži, da je prostornina nastalega telesa "
    r"\(V = \frac{\pi e f^2}{12}\), kjer je \(e = |AC|\) in \(f = |BD|\). (2 točki)<br>"
    r"4.4. Izračunaj absciso točke \(T\) na osi \(x\), za katero je vsota kvadratov razdalj \(|TA|^2 + |TC|^2\) najmanjša. (4 točke)",
    r"4.1. \((x - 4)^2 + (y - 6)^2 = 20\) &nbsp; 4.2. \(24\) &nbsp; 4.4. \(T(5, 0)\)",
    [
        ("D(2, 6)", "Zrcaljenje čez y = x zamenja koordinati."),
        ("@slika", mreza((-1, 10), (-1, 11), tocke_v4, sirina=280)),
        ("središče na simetrali AB: x = 4;  (4 − 2)<sup>2</sup> + (q − 2)<sup>2</sup> = (4 − 8)<sup>2</sup> + (q − 8)<sup>2</sup>", "Središče očrtane krožnice je enako oddaljeno od vseh oglišč."),
        ("12q = 72  ⇒  q = 6,  r<sup>2</sup> = 4 + 16 = 20", ""),
        ("!4.1  (x − 4)<sup>2</sup> + (y − 6)<sup>2</sup> = 20", "Enačba krožnice."),
        ("e = |AC| = 6" + K("2") + ",  f = |BD| = 4" + K("2") + ",  AC ⊥ BD", "ABCD je deltoid: B in D sta simetrični glede na premico AC."),
        ("!4.2  S = " + U("e · f", "2") + " = " + U("6" + K("2") + " · 4" + K("2"), "2") + " = 24", "Ploščina štirikotnika s pravokotnima diagonalama."),
        ("telo sta dva stožca s skupno osnovno ploskvijo, r = " + U("f", "2"), "Razdalja točke B od osi AC je polovica diagonale BD."),
        ("!4.3  V = " + U("1", "3") + "π(" + U("f", "2") + ")<sup>2</sup> v<sub>1</sub> + " + U("1", "3") + "π(" + U("f", "2") + ")<sup>2</sup> v<sub>2</sub> = " + U("π f<sup>2</sup>", "12") + "(v<sub>1</sub> + v<sub>2</sub>) = " + U("π e f<sup>2</sup>", "12"),
         "Prostornina stožca; višini stožcev se seštejeta v e."),
        ("d(t) = (t − 2)<sup>2</sup> + 4 + (t − 8)<sup>2</sup> + 64 = 2t<sup>2</sup> − 20t + 136", "Razdalja med točkama."),
        ("d '(t) = 4t − 20 = 0  ⇒  t = 5", "Teme parabole oziroma stacionarna točka."),
        ("!4.4  T(5, 0)", ""),
    ],
)

POLA2 = [v1, v2, v3, v4]
