# Zimski rok 2019 (uradna pola RIC P193-C101-1-1, izpit 4. februarja 2020)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2019, "zimski", "torek, 4. februar 2020"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Izpolni preglednico."
    + tabela(["potenca", "eksponent", "osnova", "vrednost potence"],
             [[r"\(5^3\)", "", "", ""], ["", r"\(4\)", r"\(-2\)", ""], ["", r"\(3\)", "", r"\(-27\)"], ["", r"\(2\)", r"\(\frac{1}{3}\)", ""]]),
    r"\(5^3\): \(3\), \(5\), \(125\); \((-2)^4 = 16\); \((-3)^3\), osnova \(-3\); \(\left(\frac{1}{3}\right)^2 = \frac{1}{9}\)",
    [
        ("!5<sup>3</sup>: eksponent 3, osnova 5, vrednost 125", ""),
        ("!(−2)<sup>4</sup> = 16", "Soda potenca negativnega števila je pozitivna."),
        ("!(−3)<sup>3</sup> = −27, osnova −3", "Liha potenca ohrani predznak; 3³ = 27."),
        ("!(" + U("1", "3") + ")<sup>2</sup> = " + U("1", "9"), "Potenciramo števec in imenovalec."),
    ],
)

a2 = naloga(
    "A2", "stevila_deljivost", 4,
    r"Reši naloge.<br>2.1. Število \(\sqrt{18}\) delno koreni. (1 točka)<br>2.2. Število \(18\) razcepi na prafaktorje. (1 točka)<br>"
    r"2.3. Zapiši vse pozitivne delitelje števila \(18\). (2 točki)",
    r"2.1. \(3\sqrt{2}\) &nbsp; 2.2. \(18 = 2 \cdot 3^2\) &nbsp; 2.3. \(1, 2, 3, 6, 9, 18\)",
    [
        "## 2.1", ("!" + K("18") + " = " + K("9 · 2") + " = 3" + K("2"), "", "koreni"),
        "## 2.2", ("!18 = 2 · 3<sup>2</sup>", "", "D_v"),
        "## 2.3", ("!1, 2, 3, 6, 9, 18", "Delitelje iščemo v parih: 1 · 18, 2 · 9, 3 · 6."),
    ],
)

a3 = naloga(
    "A3", "odvod_pm", 4,
    r"Zapiši odvod funkcije \(f(x) = 3x^6 - 5x^4 + 7x - 9\).",
    r"\(f'(x) = 18x^5 - 20x^3 + 7\)",
    [
        ("(x<sup>n</sup>)′ = nx<sup>n−1</sup>", "Odvajamo člen za členom.", "odvod"),
        ("!f '(x) = 18x<sup>5</sup> − 20x<sup>3</sup> + 7", "Odvod konstante −9 je 0."),
    ],
)

a4 = naloga(
    "A4", "polinomi_racionalna", 4,
    r"Izpolni preglednico."
    + tabela(["dano", "izračunaj"],
             [[r"\(p(x) = 3x^2 - 2x + 4\)", r"\(p(-2) =\)"], [r"\(f(x) = -3x + 5\)", r"\(f(x - 2) =\)"],
              [r"\(g_1(x) = 7x - 3\), \(g_2(x) = 4x + 2\)", r"\(g_1(x) - g_2(x) =\)"], [r"\(h(x) = 2x\)", r"\(\left(h(x)\right)^{-3} =\)"]]),
    r"\(p(-2) = 20\), \(f(x - 2) = -3x + 11\), \(g_1(x) - g_2(x) = 3x - 5\), \((h(x))^{-3} = \frac{1}{8x^3}\)",
    [
        ("!p(−2) = 3 · 4 + 4 + 4 = 20", ""),
        ("!f(x − 2) = −3(x − 2) + 5 = −3x + 11", "Namesto x vstavimo x − 2."),
        ("!g<sub>1</sub>(x) − g<sub>2</sub>(x) = 7x − 3 − 4x − 2 = 3x − 5", "Pazimo na minus pred oklepajem."),
        ("!(2x)<sup>−3</sup> = " + U("1", "8x<sup>3</sup>"), "Negativni eksponent: obratna vrednost.", "potence"),
    ],
)

a5 = naloga(
    "A5", "linearna_funkcija", 4,
    r"Izračunaj kot med premicama \(y = 3x - 1\) in \(y = -x + 2\).",
    r"\(\varphi \approx 63{,}43^\circ\)",
    [
        ("k<sub>1</sub> = 3,  k<sub>2</sub> = −1", ""),
        ("tan φ = |" + U("−1 − 3", "1 + 3 · (−1)") + "| = |" + U("−4", "−2") + "| = 2", "", "premica"),
        ("!φ ≈ 63,43°", ""),
    ],
)

PI = math.pi


def slika_a6(X, Y):
    t = []
    for a in (-PI / 2, PI / 2, 3 * PI / 2):
        t.append(f'<line x1="{X(a):.1f}" y1="{Y(3.4):.1f}" x2="{X(a):.1f}" y2="{Y(-3.4):.1f}" stroke="currentColor" stroke-dasharray="4 3"/>')
    t.append(krivulja(X, Y, math.tan, -1.28, 1.28) + krivulja(X, Y, math.tan, PI - 1.28, PI + 1.28))
    t.append(napis(X(PI), Y(0) + 14, "π", 11) + napis(X(PI / 2) + 10, Y(0) + 14, "π/2", 10))
    t.append(tocka(X, Y, PI / 4, 1, "A(x, 1)", 6, 10) + tocka(X, Y, 7 * PI / 6, math.tan(7 * PI / 6), "B(7π/6, y)", 6, -6))
    return "".join(t)

a6 = naloga(
    "A6", "kotne_funkcije_pm", 4,
    r"Na sliki je graf funkcije \(f(x) = \tan x\) na intervalu \(\left(-\frac{\pi}{2}, \frac{3\pi}{2}\right)\)."
    + mreza((-1.8, 5), (-3.5, 3.5), slika_a6, sirina=320)
    + r"6.1. Zapiši ničli funkcije \(f\) na tem intervalu. (2 točki)<br>6.2. Zapiši absciso točke \(A\). (1 točka)<br>"
    r"6.3. Natančno izračunaj ordinato točke \(B\). (1 točka)",
    r"6.1. \(0\) in \(\pi\) &nbsp; 6.2. \(\frac{\pi}{4}\) &nbsp; 6.3. \(\frac{\sqrt{3}}{3}\)",
    [
        "## 6.1", ("!x<sub>1</sub> = 0,  x<sub>2</sub> = π", "tan x = 0, ko je sin x = 0; tangens ima periodo π."),
        "## 6.2", ("!x = " + U("π", "4"), "tan x = 1 na prvi veji."),
        "## 6.3", ("!y = tan " + U("7π", "6") + " = tan " + U("π", "6") + " = " + U(K("3"), "3"), "Zaradi periode π."),
    ],
)


def skica_a7():
    cx, cy, r = 100, 100, 80
    a1, a2 = math.radians(90 - 62), math.radians(90 + 62)
    A = (cx + r * math.cos(a1), cy - r * math.sin(a1))
    B = (cx + r * math.cos(a2), cy - r * math.sin(a2))
    t = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{cx},{cy} {A[0]:.1f},{A[1]:.1f} {B[0]:.1f},{B[1]:.1f}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor"/>',
         f'<line x1="{A[0]:.1f}" y1="{A[1]:.1f}" x2="{B[0]:.1f}" y2="{B[1]:.1f}" stroke="{RDECA}" stroke-width="2.5"/>',
         napis(cx, cy + 16, "S"), napis(cx, cy - 22, "124°", 11), napis((cx + A[0]) / 2 + 10, (cy + A[1]) / 2 + 6, "r", 12),
         napis(A[0] + 10, A[1], "B"), napis(B[0] - 10, B[1], "A"), napis(cx, A[1] - 8, "t", 13, RDECA)]
    return svg(200, 200, "".join(t), opis="Tetiva v krogu")

a7 = naloga(
    "A7", "trikotnik_kotne", 4,
    r"Izračunaj dolžino tetive, ki pripada središčnemu kotu \(\alpha = 124^\circ\) v krogu s polmerom \(r = 5\) cm. Nariši skico.",
    r"\(t \approx 8{,}83\) cm",
    [
        ("@slika", skica_a7()),
        (U("t", "2") + " = r · sin " + U("α", "2") + " = 5 · sin 62°", "Višina na tetivo razpolovi enakokraki trikotnik ASB.", "kotne"),
        ("!t = 10 · sin 62° ≈ 8,83 cm", ""),
    ],
)


def tehtnici():
    def kocka(x, y):
        return f'<rect x="{x}" y="{y}" width="14" height="14" fill="{MODRA}" fill-opacity="0.7" stroke="currentColor" stroke-width="0.6"/>'

    def kroglica(x, y):
        return f'<circle cx="{x + 7}" cy="{y + 7}" r="7" fill="{RDECA}" fill-opacity="0.7" stroke="currentColor" stroke-width="0.6"/>'

    def tehtnica(ox, levo, desno):
        t = [f'<line x1="{ox}" y1="60" x2="{ox + 200}" y2="60" stroke="currentColor" stroke-width="2"/>',
             f'<line x1="{ox + 100}" y1="60" x2="{ox + 100}" y2="95" stroke="currentColor" stroke-width="2"/>',
             f'<path d="M {ox + 75} 105 Q {ox + 100} 88 {ox + 125} 105 Z" fill="currentColor" fill-opacity="0.25"/>']
        return "".join(t) + levo + desno

    l1 = "".join(kocka(10 + 16 * i, 44) for i in range(3)) + "".join(kroglica(58 + 16 * i, 44) for i in range(2))
    d1 = f'<path d="M 170 58 L 174 36 L 196 36 L 200 58 Z" fill="currentColor" fill-opacity="0.7"/>' + napis(185, 52, "1 kg", 9, "white")
    l2 = "".join(kocka(240 + 16 * i, 44) for i in range(5))
    d2 = "".join(kroglica(395 + 16 * i, 44) for i in range(2))
    return svg(450, 115, tehtnica(5, l1, d1) + tehtnica(235, l2, d2), opis="Tehtnici v ravnovesju")

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Obe tehtnici na sliki sta v ravnovesju. Izračunaj maso kocke in maso kroglice." + tehtnici(),
    r"kocka \(125\) g, kroglica \(312{,}5\) g",
    [
        ("3k + 2m = 1 kg,  5k = 2m", "k je masa kocke, m masa kroglice; zapišemo ravnovesji."),
        ("3k + 5k = 1  ⇒  8k = 1 kg", "Namesto 2m vstavimo 5k.", "sistem"),
        ("!k = 0,125 kg = 125 g", ""),
        ("!m = " + U("5 · 125", "2") + " = 312,5 g", ""),
    ],
)

a9 = naloga(
    "A9", "realna_stevila_koreni", 5,
    r"Brez računala natančno izračunaj vrednost izraza \(|a - 3| - |a| + 2a + 1\), če je:<br>9.1. \(a = -4\) (2 točki)<br>9.2. \(a = \sqrt{3}\) (3 točke)",
    r"9.1. \(-4\) &nbsp; 9.2. \(4\)",
    [
        "## 9.1",
        ("|−7| − |−4| − 8 + 1 = 7 − 4 − 8 + 1", "Absolutna vrednost je razdalja od 0."),
        ("!= −4", ""),
        "## 9.2",
        ("|" + K("3") + " − 3| = 3 − " + K("3"), K("3") + " ≈ 1,73 < 3, zato je izraz v absolutni vrednosti negativen."),
        ("3 − " + K("3") + " − " + K("3") + " + 2" + K("3") + " + 1", ""),
        ("!= 4", ""),
    ],
)


def slika_a10(X, Y):
    return (krivulja(X, Y, lambda x: x ** 4, -1.75, 1.75)
            + f'<line x1="{X(-1):.1f}" y1="{Y(9.4):.1f}" x2="{X(-1):.1f}" y2="{Y(-1.4):.1f}" stroke="{RDECA}" stroke-width="2"/>'
            + tocka(X, Y, -1, 1, "(−1, 1)", -44, -6) + tocka(X, Y, 3 ** 0.25, 3, "", 0, 0) + tocka(X, Y, -(3 ** 0.25), 3, "", 0, 0)
            + f'<line x1="{X(-3):.1f}" y1="{Y(3):.1f}" x2="{X(3):.1f}" y2="{Y(3):.1f}" stroke="currentColor" stroke-dasharray="3 3"/>')

a10 = naloga(
    "A10", "polinomi_racionalna", 6,
    r"Dana je funkcija \(f(x) = x^4\).<br>10.1. Nariši graf funkcije \(f\) in premico \(x = -1\) ter zapiši koordinati njunega presečišča. (4 točke)<br>"
    r"10.2. Natančno izračunaj vse vrednosti \(x\), pri katerih ima funkcija \(f\) vrednost \(3\). (2 točki)",
    r"10.1. \((-1, 1)\) &nbsp; 10.2. \(x = \pm\sqrt[4]{3}\)",
    [
        "## 10.1",
        ("@slika", mreza((-3, 3), (-1.5, 9.5), slika_a10, sirina=240, visina=300)),
        ("!presečišče: (−1, 1)", "f(−1) = (−1)⁴ = 1."),
        "## 10.2",
        ("x<sup>4</sup> = 3", ""),
        ("!x = " + K("3", 4) + "  ali  x = −" + K("3", 4), "Soda potenca: dve rešitvi (vidimo ju na grafu)."),
    ],
)

a11 = naloga(
    "A11", "zaporedja_pm", 6,
    r"Drugi člen geometrijskega zaporedja je \(a_2 = 6\), peti člen pa \(a_5 = 162\). Izračunaj prvi člen, količnik in vsoto prvih petnajstih členov.",
    r"\(a_1 = 2\), \(q = 3\), \(s_{15} = 14\,348\,906\)",
    [
        (U("a<sub>5</sub>", "a<sub>2</sub>") + " = q<sup>3</sup> = " + U("162", "6") + " = 27", "", "geometrijsko"),
        ("!q = 3,  a<sub>1</sub> = " + U("6", "3") + " = 2", ""),
        ("s<sub>15</sub> = 2 · " + U("3<sup>15</sup> − 1", "3 − 1") + " = 3<sup>15</sup> − 1", ""),
        ("!s<sub>15</sub> = 14 348 906", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", ["kombinatorika_verjetnost", "statistika_pm", "ulomki_odstotki"], 10,
    r"Ana, Bor, Cene, Dan in Eva vsako nedeljo tekmujejo, kdo bo hitreje preplaval progo na jezeru.<br>"
    r"1.1. Koliko je vseh različnih vrstnih redov prihoda na cilj, če nobena dva ne prispeta hkrati? (3 točke)<br>"
    r"1.2. Neko nedeljo je Ana za progo potrebovala \(52\) minut, Bor \(0{,}85\) ure, Cene \(3180\) sekund, Dan pa \(\frac{7}{8}\) ure. Eva je "
    r"odstopila. Izrazi vse čase v minutah in izračunaj aritmetično sredino časov Ane, Bora, Ceneta in Dana. Ana je predvidela, da bo "
    r"potrebovala \(50\) minut. Koliko odstotkov predvidenega časa je dejansko porabila? (7 točk)",
    r"1.1. \(120\) &nbsp; 1.2. \(52\), \(51\), \(53\), \(52{,}5\) min; \(\bar{x} = 52{,}125\) min; \(104\,\%\)",
    [
        "## 1.1", ("!P<sub>5</sub> = 5! = 120", "Vrstni red petih tekmovalcev: permutacije.", "kombinatorika"),
        "## 1.2",
        ("Bor: 0,85 · 60 = 51 min,  Cene: 3180 : 60 = 53 min,  Dan: " + U("7", "8") + " · 60 = 52,5 min", ""),
        ("x̄ = " + U("52 + 51 + 53 + 52,5", "4") + " = " + U("208,5", "4"), "", "statistika"),
        ("!x̄ = 52,125 min", ""),
        ("!" + U("52", "50") + " · 100 % = 104 %", "Osnova je predvideni čas.", "odstotki"),
    ],
)


def jame():
    t = [f'<rect x="20" y="30" width="110" height="110" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         napis(75, 22, "70 cm", 11), napis(145, 90, "70 cm", 11, sidro="start"), napis(75, 160, "Slika 1", 11),
         f'<circle cx="290" cy="85" r="60" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="230" y1="85" x2="350" y2="85" stroke="currentColor" stroke-dasharray="4 3"/>', napis(290, 78, "80 cm", 11),
         napis(290, 160, "Slika 2", 11)]
    return svg(370, 170, "".join(t), opis="Osnovni ploskvi sadilnih jam")


def prerez_b2():
    s = 150
    w, h = 0.8 * s, 0.6 * s
    x0, y0 = 40, 30
    t = [f'<path d="M {x0} {y0} L {x0} {y0 + h} L {x0 + w} {y0 + h} L {x0 + w} {y0}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{x0 - 20}" y1="{y0}" x2="{x0 + w + 20}" y2="{y0}" stroke="currentColor" stroke-opacity="0.5"/>',
         f'<line x1="{x0}" y1="{y0 + h}" x2="{x0 + 0.8 * 1.3 * s:.1f}" y2="{y0 + h - 0.6 * 1.3 * s:.1f}" stroke="{RDECA}" stroke-width="3"/>',
         napis(x0 + w / 2, y0 + h + 15, "80 cm", 11), napis(x0 - 6, y0 + h / 2, "60 cm", 11, sidro="end"), napis(x0 + w / 2 - 6, y0 + h / 2 - 2, "d", 13, RDECA)]
    return svg(300, 140, "".join(t), opis="Osni prerez jame s palico")

b2 = naloga(
    "B2", "povrsine_prostornine", 10,
    r"Maj je izkopal dve sadilni jami, globoki \(60\) cm. Prva ima obliko kvadra z osnovno ploskvijo na sliki 1, druga pa obliko valja s "
    r"premerom osnovne ploskve \(80\) cm (slika 2)." + jame()
    + r"2.1. Koliko kubičnih metrov zemlje je izkopal iz prve in koliko iz druge jame? (5 točk)<br>"
    r"2.2. V drugo jamo na različne načine polaga \(2\) m dolgo palico, ki se dotika dna jame (palice ne zapiči v zemljo). Največ koliko metrov "
    r"palice je lahko v jami? Odgovor utemelji z izračunom in skico. Najmanj koliko metrov palice je lahko v jami? (5 točk)",
    r"2.1. \(0{,}294\ \mathrm{m^3}\) in \(\approx 0{,}302\ \mathrm{m^3}\) &nbsp; 2.2. največ \(1\) m, najmanj \(0{,}6\) m",
    [
        "## 2.1",
        ("!V<sub>1</sub> = 0,7 · 0,7 · 0,6 = 0,294 m<sup>3</sup>", "Kvader; mere pretvorimo v metre.", "telesa"),
        ("!V<sub>2</sub> = π · 0,4<sup>2</sup> · 0,6 ≈ 0,302 m<sup>3</sup>", "Valj s polmerom 0,4 m."),
        "## 2.2",
        ("@slika", prerez_b2()),
        ("d = " + K("0,8<sup>2</sup> + 0,6<sup>2</sup>") + " = " + K("1") + " = 1 m", "Najdaljša daljica v jami je diagonala osnega prereza valja.", "pitagora"),
        ("!največ 1 m palice", "Palica gre od roba dna do nasprotnega roba odprtine."),
        ("!najmanj 0,6 m palice", "Palica stoji navpično; v jami je toliko, kolikor je jama globoka."),
    ],
)

b3 = naloga(
    "B3", "kvadratna_funkcija", 10,
    r"Dana je kvadratna funkcija \(f(x) = -\frac{1}{2}(x + 1)(x - 5)\).<br>"
    r"3.1. Zapiši ničli funkcije \(f\). Izračunaj koordinati temena in zapiši točko, v kateri graf seka ordinatno os. Nariši graf funkcije. (8 točk)<br>"
    r"3.2. Zapiši vsa realna števila \(x\), za katera je \(f(x) \le 0\). (2 točki)",
    r"3.1. \(x_1 = -1\), \(x_2 = 5\), \(T\left(2, \frac{9}{2}\right)\), \(N\left(0, \frac{5}{2}\right)\) &nbsp; 3.2. \(x \le -1\) ali \(x \ge 5\)",
    [
        "## 3.1",
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = 5", "Razcepna oblika."),
        ("p = " + U("−1 + 5", "2") + " = 2,  q = f(2) = −" + U("1", "2") + " · 3 · (−3) = " + U("9", "2"), "", "teme"),
        ("!T(2, " + U("9", "2") + "),  N(0, " + U("5", "2") + ")", "f(0) = −½ · 1 · (−5) = 5/2."),
        ("@slika", graf([(lambda x: -0.5 * (x + 1) * (x - 5), MODRA)], (-3, 7), (-4, 6), [(-1, 0, ""), (5, 0, ""), (2, 4.5, "T"), (0, 2.5, "N")], sirina=300, visina=300)),
        "## 3.2",
        ("!x ∈ (−∞, −1] ∪ [5, ∞)", "Parabola je odprta navzdol, zato je pod osjo x zunaj ničel; v ničlah je f(x) = 0.", "neenacba"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
