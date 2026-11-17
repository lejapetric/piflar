# Spomladanski rok 2020 (uradna pola RIC P201-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2020, "spomladanski", "sobota, 6. junij 2020"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "realna_stevila_koreni", 4,
    r"Brez računala izračunaj vrednost izraza \(2 \cdot \sqrt[3]{27} + 7 - \sqrt{36} : \sqrt[4]{81}\).",
    r"\(11\)",
    [
        (K("27", 3) + " = 3,  " + K("36") + " = 6,  " + K("81", 4) + " = 3", "Korene izračunamo na pamet."),
        ("2 · 3 + 7 − 6 : 3", ""),
        ("= 6 + 7 − 2", "Najprej množenje in deljenje, nato seštevanje in odštevanje."),
        ("!= 11", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\left(-2x^{-3}\right) \cdot \left(3x^5y^{-2}\right)^2 : y^{-5}\).",
    r"\(-18x^7y\)",
    [
        ("(3x<sup>5</sup>y<sup>−2</sup>)<sup>2</sup> = 9x<sup>10</sup>y<sup>−4</sup>", "Potenciramo vsak faktor.", "potence"),
        ("−2x<sup>−3</sup> · 9x<sup>10</sup>y<sup>−4</sup> = −18x<sup>7</sup>y<sup>−4</sup>", "Pri množenju eksponente seštejemo."),
        ("!−18x<sup>7</sup>y<sup>−4</sup> : y<sup>−5</sup> = −18x<sup>7</sup>y", "Pri deljenju eksponente odštejemo: −4 − (−5) = 1."),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Reši neenačbo \(2(3 - x) - 3(x - 1) \ge 4\).",
    r"\(x \le 1\)",
    [
        ("6 − 2x − 3x + 3 ≥ 4", "Odpravimo oklepaje."),
        ("9 − 5x ≥ 4  ⇒  −5x ≥ −5", ""),
        ("!x ≤ 1", "Pri deljenju z negativnim številom se neenačaj obrne."),
    ],
)

a4 = naloga(
    "A4", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(3^{x + 1} + 3^x = 108\).",
    r"\(x = 3\)",
    [
        ("3<sup>x</sup> · 3 + 3<sup>x</sup> = 108  ⇒  3<sup>x</sup>(3 + 1) = 108", "Izpostavimo 3ˣ."),
        ("3<sup>x</sup> = 27 = 3<sup>3</sup>", "", "eksponentna"),
        ("!x = 3", ""),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Eva je kupila majico za \(24{,}99\) € in jakno, ki je bila znižana za \(30\,\%\). Za oboje je plačala \(108{,}99\) €. Koliko je plačala za "
    r"jakno in kolikšna je bila cena jakne pred znižanjem?",
    r"\(84\) €; \(120\) €",
    [
        ("!jakna: 108,99 − 24,99 = 84,00 €", ""),
        ("84 € je 70 % prvotne cene", "Po znižanju za 30 % ostane 70 %.", "odstotki"),
        ("!prvotna cena: 84 : 0,7 = 120 €", ""),
    ],
)

a6 = naloga(
    "A6", "odvod_pm", 4,
    r"Dana je funkcija \(f(x) = 2\tan x - 1\). Izračunaj odvod funkcije \(f\) in \(f'\left(\frac{\pi}{4}\right)\).",
    r"\(f'(x) = \frac{2}{\cos^2 x}\), \(f'\left(\frac{\pi}{4}\right) = 4\)",
    [
        ("!f '(x) = " + U("2", "cos<sup>2</sup> x"), "Odvod tangensa je 1/cos² x, odvod konstante je 0.", "odvod"),
        ("cos<sup>2</sup> " + U("π", "4") + " = (" + U(K("2"), "2") + ")<sup>2</sup> = " + U("1", "2"), ""),
        ("!f '(" + U("π", "4") + ") = 2 : " + U("1", "2") + " = 4", ""),
    ],
)

a7 = naloga(
    "A7", "kombinatorika_verjetnost", 4,
    r"Družina dveh staršev in treh otrok se pelje z avtomobilom s petimi sedeži. Na koliko načinov lahko sedijo, če vozi eden od staršev, "
    r"ostali štirje pa sedijo na preostalih štirih sedežih?",
    r"\(48\)",
    [
        ("voznik: 2 možnosti", "Vozi lahko mama ali oče."),
        ("ostali štirje na štirih sedežih: P<sub>4</sub> = 4! = 24", "", "kombinatorika"),
        ("!2 · 24 = 48", "Pravilo produkta."),
    ],
)

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Dana je kvadratna funkcija \(f(x) = x^2 - 0{,}9x - 4{,}86\). Reši enačbo \(f(x) = 0\) in zapiši funkcijo \(f\) v razcepni obliki.",
    r"\(x_1 = 2{,}7\), \(x_2 = -1{,}8\); \(f(x) = (x - 2{,}7)(x + 1{,}8)\)",
    [
        ("D = 0,81 + 4 · 4,86 = 20,25", "", "kvadratna"),
        ("x<sub>1,2</sub> = " + U("0,9 ± 4,5", "2"), K("20,25") + " = 4,5."),
        ("!x<sub>1</sub> = 2,7,  x<sub>2</sub> = −1,8", ""),
        ("!f(x) = (x − 2,7)(x + 1,8)", "Razcepna oblika f(x) = a(x − x₁)(x − x₂), a = 1."),
    ],
)

a9 = naloga(
    "A9", "ulomki_odstotki", 5,
    r"Maša je za zabavo napihnila \(18\) balonov rdeče in modre barve. Razmerje med številom rdečih in modrih balonov je \(4 : 5\). Koliko rdečih "
    r"in koliko modrih balonov je napihnila?",
    r"\(8\) rdečih in \(10\) modrih",
    [
        ("4 + 5 = 9 delov,  en del = 18 : 9 = 2", ""),
        ("!rdeči: 4 · 2 = 8,  modri: 5 · 2 = 10", ""),
    ],
)


def slika_a10(X, Y):
    return krivulja(X, Y, lambda x: 0.75 * x - 3, -2, 8.5) + tocka(X, Y, 4, 0, "(4, 0)", 4, 14) + tocka(X, Y, 0, -3, "(0, −3)", 6, 4)

a10 = naloga(
    "A10", "linearna_funkcija", 6,
    r"Dana je enačba premice v odsekovni obliki \(\dfrac{x}{4} + \dfrac{y}{-3} = 1\).<br>"
    r"10.1. Zapiši enačbo premice v eksplicitni obliki. (2 točki)<br>"
    r"10.2. Nariši premico in računsko preveri, ali točka \(A(16, 9)\) leži na njej. (4 točke)",
    r"10.1. \(y = \frac{3}{4}x - 3\) &nbsp; 10.2. da, \(A\) leži na premici",
    [
        "## 10.1",
        (U("y", "3") + " = " + U("x", "4") + " − 1", "Iz odsekovne oblike izrazimo y (pomnožimo z −3)."),
        ("!y = " + U("3", "4") + "x − 3", ""),
        "## 10.2",
        ("@slika", mreza((-3, 9), (-5, 4), slika_a10, sirina=300)),
        ("y(16) = " + U("3", "4") + " · 16 − 3 = 12 − 3 = 9", "Vstavimo x = 16."),
        ("!točka A(16, 9) leži na premici", "Dobljena ordinata je enaka ordinati točke A."),
    ],
)


def slika_a11(X, Y):
    f = lambda x: -math.log(x, 3)
    return (krivulja(X, Y, f, 0.03, 10) + tocka(X, Y, 1, 0, "B", 4, -6) + tocka(X, Y, 3, -1, "A(3, y₁)", 4, 14)
            + tocka(X, Y, 1 / 9, 2, "C(x₃, 2)", 6, -2))

a11 = naloga(
    "A11", "eksponentna_logaritemska", 6,
    r"Na sliki je graf funkcije \(f(x) = \log_{\frac{1}{3}} x\). Točke \(A(3, y_1)\), \(B(x_2, y_2)\) in \(C(x_3, 2)\) ležijo na grafu; v točki \(B\) graf "
    r"seka abscisno os." + mreza((-1, 10), (-3, 3.5), slika_a11, sirina=320)
    + r"Zapiši koordinati točke \(B\) ter izračunaj neznani koordinati točk \(A\) in \(C\).",
    r"\(B(1, 0)\), \(y_1 = -1\), \(x_3 = \frac{1}{9}\)",
    [
        ("!B(1, 0)", "Logaritem vsake osnove je pri x = 1 enak 0."),
        ("y<sub>1</sub> = log<sub>1/3</sub> 3", "(1/3)^y = 3.", "logaritem"),
        ("!y<sub>1</sub> = −1", "(1/3)⁻¹ = 3."),
        ("2 = log<sub>1/3</sub> x<sub>3</sub>  ⇒  x<sub>3</sub> = (" + U("1", "3") + ")<sup>2</sup>", ""),
        ("!x<sub>3</sub> = " + U("1", "9"), ""),
    ],
)

# ------------------------------------------------------------------ 2. del
def krog_b1():
    kot = [("α", 174, "x² + 30"), ("β", 42, "3x + 6"), ("γ", 56, "5x − 4"), ("δ", 88, "6x + 16")]
    cx, cy, r = 150, 120, 95
    t = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-width="1.5"/>']
    a = 90
    for ime, v, izraz in kot:
        rad = math.radians(a)
        t.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * math.cos(rad):.1f}" y2="{cy - r * math.sin(rad):.1f}" stroke="currentColor"/>')
        s = math.radians(a + v / 2)
        rr = 0.5 * r
        t.append(napis(cx + rr * math.cos(s), cy - rr * math.sin(s) + 5, ime, 14))
        a += v
    t.append(f'<circle cx="{cx}" cy="{cy}" r="2.5" fill="currentColor"/>')
    return svg(300, 240, "".join(t), opis="Krog s štirimi središčnimi koti")

b1 = naloga(
    "B1", "geometrija_ravnine", 10,
    r"Na sliki je krog s središčnimi koti \(\alpha\), \(\beta\), \(\gamma\) in \(\delta\). Velikosti kotov so v stopinjah: \(\alpha = x^2 + 30\), "
    r"\(\beta = 3x + 6\), \(\gamma = 5x - 4\), \(\delta = 6x + 16\)." + krog_b1()
    + r"1.1. Izračunaj velikosti središčnih kotov \(\alpha\), \(\beta\), \(\gamma\) in \(\delta\). (6 točk)<br>"
    r"1.2. Ploščina enega od krožnih izsekov je \(18\pi\) cm². Izračunaj središčni kot tega izseka, če je polmer kroga \(9\) cm. (4 točke)",
    r"1.1. \(\alpha = 174^\circ\), \(\beta = 42^\circ\), \(\gamma = 56^\circ\), \(\delta = 88^\circ\) &nbsp; 1.2. \(80^\circ\)",
    [
        "## 1.1",
        ("x<sup>2</sup> + 30 + 3x + 6 + 5x − 4 + 6x + 16 = 360", "Središčni koti skupaj dajo polni kot."),
        ("x<sup>2</sup> + 14x − 312 = 0  ⇒  (x − 12)(x + 26) = 0", "", "kvadratna"),
        ("x = 12", "Pri x = −26 bi bil kot β negativen."),
        ("!α = 174°,  β = 42°,  γ = 56°,  δ = 88°", "Preizkus: vsota je 360°."),
        "## 1.2",
        (U("π · 81 · α", "360°") + " = 18π", "Ploščina krožnega izseka.", "krog"),
        ("!α = " + U("18 · 360°", "81") + " = 80°", ""),
    ],
)

b2 = naloga(
    "B2", ["povrsine_prostornine", "zaporedja_pm"], 10,
    r"Jure je izdelal model steklene piramide, ki ima obliko pravilne štiristrane piramide. Osnovni rob meri \(16\) cm, višina piramide pa "
    r"\(15\) cm. Vsako stransko ploskev je obložil s ploščicami: ob osnovnem robu je \(7\) skladnih enakokrakih trikotnikov, nad njimi pa so "
    r"rombi v \(6\) vrstah, pri čemer je v najvišji vrsti \(1\) romb, v vsaki naslednji vrsti navzdol pa en romb več (števila rombov tvorijo "
    r"aritmetično zaporedje).<br>"
    r"2.1. Izračunaj prostornino in ploščino plašča piramide. (6 točk)<br>"
    r"2.2. Koliko rombov bi imel plašč podobne piramide, ki bi imela ob vsakem osnovnem robu \(15\) skladnih enakokrakih trikotnikov "
    r"(in zato \(14\) vrst rombov)? (4 točke)",
    r"2.1. \(V = 1280\ \mathrm{cm^3}\), \(S_{pl} = 544\ \mathrm{cm^2}\) &nbsp; 2.2. \(420\) rombov",
    [
        "## 2.1",
        ("!V = " + U("1", "3") + " · 16<sup>2</sup> · 15 = 1280 cm<sup>3</sup>", "", "telesa"),
        ("v<sub>a</sub> = " + K("15<sup>2</sup> + 8<sup>2</sup>") + " = " + K("289") + " = 17 cm", "Višina piramide, polovica osnovnega roba in višina stranske ploskve tvorijo pravokotni trikotnik.", "pitagora"),
        ("!S<sub>pl</sub> = 4 · " + U("16 · 17", "2") + " = 544 cm<sup>2</sup>", "Štirje skladni enakokraki trikotniki."),
        "## 2.2",
        ("na eni ploskvi: 1 + 2 + … + 14 = " + U("14", "2") + " · (1 + 14) = 105", "Vsota aritmetičnega zaporedja z a₁ = 1, d = 1.", "aritmeticno"),
        ("!4 · 105 = 420 rombov", "Plašč ima štiri ploskve."),
    ],
)

MESECI = [310, 295, 330, 345, 360, 402, 455, 470, 440, 430, 485, 520]
TRI = [("1. trimesečje", 312), ("2. trimesečje", 380), ("3. trimesečje", 455), ("4. trimesečje", 490)]


def stolpci_a():
    H, L = 210, 34
    t = []
    for v in range(0, 601, 100):
        y = H - 30 - v / 600 * 160
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 12 * 24}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.12"/>' + napis(L - 4, y + 3, str(v), 9, sidro="end"))
    for i, v in enumerate(MESECI):
        h = v / 600 * 160
        x = L + 4 + i * 24
        t.append(f'<rect x="{x}" y="{H - 30 - h:.1f}" width="16" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.75"/>')
        t.append(napis(x + 8, H - 34 - h, str(v), 8) + napis(x + 8, H - 16, str(i + 1), 9))
    t.append(napis(L + 144, H - 2, "mesec", 10))
    return svg(L + 12 * 24 + 10, H, "".join(t), opis="Podjetje A: prodani telefoni po mesecih")


def torta_b():
    cx, cy, r = 110, 105, 85
    vs = sum(v for _, v in TRI)
    t, a = [], 90.0
    barve = [MODRA, RDECA, "#1E9E5A", "#C9871A"]
    for (ime, v), b in zip(TRI, barve):
        da = 360 * v / vs
        a1, a2 = math.radians(a), math.radians(a - da)
        x1, y1 = cx + r * math.cos(a1), cy - r * math.sin(a1)
        x2, y2 = cx + r * math.cos(a2), cy - r * math.sin(a2)
        t.append(f'<path d="M {cx} {cy} L {x1:.1f} {y1:.1f} A {r} {r} 0 0 1 {x2:.1f} {y2:.1f} Z" fill="{b}" fill-opacity="0.45" stroke="currentColor" stroke-width="0.8"/>')
        s = math.radians(a - da / 2)
        t.append(napis(cx + 0.6 * r * math.cos(s), cy - 0.6 * r * math.sin(s) - 2, ime.replace(" trimesečje", ". trim.").replace("..", "."), 9.5)
                 + napis(cx + 0.6 * r * math.cos(s), cy - 0.6 * r * math.sin(s) + 11, str(v), 11))
        a -= da
    return svg(220, 210, "".join(t), opis="Podjetje B: povprečna mesečna prodaja po trimesečjih")

b3 = naloga(
    "B3", "statistika_pm", 10,
    r"Podjetji, ki prodajata mobilne telefone, sta lansko prodajo prikazali vsako na svoj način. Podjetje A je prikazalo število prodanih "
    r"telefonov po mesecih:" + stolpci_a()
    + r"Podjetje B pa je s tortnim diagramom prikazalo povprečno mesečno število prodanih telefonov v posameznem trimesečju:" + torta_b()
    + r"3.1. V podjetju B so v 4. trimesečju v povprečju prodali \(490\) telefonov na mesec. Oktobra so jih prodali \(478\), novembra \(465\). "
    r"Koliko telefonov so prodali decembra? (4 točke)<br>"
    r"3.2. Katero podjetje je prodalo več telefonov v 2. trimesečju? Katero podjetje je lani prodalo več telefonov? (6 točk)",
    r"3.1. \(527\) &nbsp; 3.2. v 2. trimesečju podjetje B (\(1140 > 1107\)); v vsem letu podjetje B (\(4911 > 4842\))",
    [
        "## 3.1",
        ("4. trimesečje skupaj: 3 · 490 = 1470", "Povprečje treh mesecev pomnožimo s 3.", "statistika"),
        ("!december: 1470 − 478 − 465 = 527", ""),
        "## 3.2",
        ("A, 2. trimesečje: 345 + 360 + 402 = 1107", "Meseci april, maj, junij."),
        ("B, 2. trimesečje: 3 · 380 = 1140", ""),
        ("!v 2. trimesečju je več prodalo podjetje B", ""),
        ("A v letu: 935 + 1107 + 1365 + 1435 = 4842", "Seštejemo vse mesece (po trimesečjih)."),
        ("B v letu: 3 · (312 + 380 + 455 + 490) = 3 · 1637 = 4911", ""),
        ("!lani je več telefonov prodalo podjetje B", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
