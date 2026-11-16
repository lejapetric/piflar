# Spomladanski rok 2015 (uradna pola RIC P151-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2015, "spomladanski", "sobota, 6. junij 2015"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "zaporedja_pm", 4,
    r"V kvadratke vpiši manjkajoča števila, če sta zapisani števili zaporedna člena geometrijskega zaporedja. Zapiši tudi količnik zaporedja.<br>"
    r"\(\square,\ 2,\ 6,\ \square,\ \square\)",
    r"\(\frac{2}{3}, 2, 6, 18, 54\); \(q = 3\)",
    [
        ("!q = " + U("6", "2") + " = 3", "", "geometrijsko"),
        ("a<sub>1</sub> = " + U("2", "3") + ",  a<sub>4</sub> = 6 · 3 = 18,  a<sub>5</sub> = 18 · 3 = 54", ""),
        ("!" + U("2", "3") + ", 2, 6, 18, 54", ""),
    ],
)

a2 = naloga(
    "A2", "kvadratna_funkcija", 4,
    r"Ali so navedene izjave pravilne? Odgovori z DA ali NE."
    + tabela(["Izjava", "DA / NE"], [
        [r"\(x^2 - 13x + 42 = (x - 6)(x - 7)\)", ""],
        [r"Ničli kvadratne funkcije \(f(x) = 3x^2 - 6x\) sta \(x_1 = 0\) in \(x_2 = -2\).", ""],
        [r"Začetna vrednost funkcije \(f(x) = \cos x\) je \(1\).", ""],
        [r"Točka \(T(3, -1)\) je presečišče premic \(x + y = 2\) in \(2x - 3y - 8 = 0\).", ""]]),
    r"DA, NE, DA, NE",
    [
        ("!1. DA", "(x − 6)(x − 7) = x² − 13x + 42."),
        ("!2. NE", "3x² − 6x = 3x(x − 2), ničli sta 0 in 2.", "kvadratna"),
        ("!3. DA", "cos 0 = 1.", "kotne"),
        ("!4. NE", "Točka leži na prvi premici, za drugo pa 6 + 3 − 8 = 1 ≠ 0.", "sistem"),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Reši enačbo \(\dfrac{x - 2}{4} - 1 = 0{,}5 - x\).",
    r"\(x = \frac{8}{5}\)",
    [
        ("x − 2 − 4 = 2 − 4x", "Enačbo pomnožimo s 4."),
        ("5x = 8", ""),
        ("!x = " + U("8", "5") + " = 1,6", ""),
    ],
)

a4 = naloga(
    "A4", "izrazi_potence", 4,
    r"Odpravi oklepaja in poenostavi izraz \(\left(3a^2b^{-1}\right)^2 \cdot \left(9a^{-1}b\right)^{-1}\).",
    r"\(a^5 b^{-3} = \frac{a^5}{b^3}\)",
    [
        ("(3a<sup>2</sup>b<sup>−1</sup>)<sup>2</sup> = 9a<sup>4</sup>b<sup>−2</sup>", "Potenciramo vsak faktor.", "potence"),
        ("(9a<sup>−1</sup>b)<sup>−1</sup> = " + U("1", "9") + "a b<sup>−1</sup>", ""),
        ("9 · " + U("1", "9") + " · a<sup>4 + 1</sup> · b<sup>−2 − 1</sup>", ""),
        ("!= a<sup>5</sup>b<sup>−3</sup> = " + U("a<sup>5</sup>", "b<sup>3</sup>"), ""),
    ],
)

a5 = naloga(
    "A5", "kvadratna_funkcija", 4,
    r"Na sliki je graf kvadratne funkcije \(f\). Reši neenačbo \(f(x) \ge 0\)."
    + graf([(lambda x: x * x - 2 * x - 3, "currentColor")], (-3, 5), (-5, 5), [], sirina=260, visina=320),
    r"\(x \in (-\infty, -1] \cup [3, \infty)\)",
    [
        ("ničli: x<sub>1</sub> = −1, x<sub>2</sub> = 3", "Odčitamo s slike."),
        ("f(x) ≥ 0 tam, kjer graf leži na osi x ali nad njo", "", "neenacba"),
        ("!x ∈ (−∞, −1] ∪ [3, ∞)", "Ničli sta vključeni, ker neenakost ni stroga."),
    ],
)

a6 = naloga(
    "A6", "kotne_funkcije_pm", 5,
    r"Nariši graf funkcije \(f(x) = 2\cos x\) na intervalu \([-\pi, \pi]\). Točka \(T\) je presečišče grafa z ordinatno osjo. Zapiši koordinati točke \(T\).",
    r"\(T(0, 2)\)",
    [
        ("amplituda 2, perioda 2π", "Graf kosinusa raztegnemo v smeri osi y za faktor 2.", "kotne"),
        ("ničli: x = ±" + U("π", "2") + ",  minimuma pri x = ±π: y = −2", ""),
        ("@slika", graf([(lambda x: 2 * math.cos(x), MODRA)], (-math.pi, math.pi), (-3, 3),
                        [(-math.pi, -2, "−π"), (math.pi, -2, "π"), (-math.pi / 2, 0, ""), (math.pi / 2, 0, ""), (0, 2, "T")], sirina=300, visina=200)),
        ("!T(0, 2)", "f(0) = 2 cos 0 = 2."),
    ],
)

a7 = naloga(
    "A7", "ulomki_odstotki", 5,
    r"Marjetka je danes stara \(29\) let. Aleksander je bil pred petimi leti \(25\,\%\) starejši od Marjetke. Koliko je danes star Aleksander?",
    r"\(35\) let",
    [
        ("Marjetka pred petimi leti: 29 − 5 = 24 let", ""),
        ("Aleksander takrat: 1,25 · 24 = 30 let", "25 % več pomeni faktor 1,25.", "odstotki"),
        ("!danes: 30 + 5 = 35 let", "Aleksander je danes star 35 let."),
    ],
)


def paralelogram():
    k = 22
    ang = math.acos((49 + 25 - 36) / 70)
    A, B = (20, 120), (20 + 7 * k, 120)
    D = (20 + 5 * k * math.cos(ang), 120 - 5 * k * math.sin(ang))
    C = (D[0] + 7 * k, D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{B[0]}" y1="{B[1]}" x2="{D[0]:.1f}" y2="{D[1]:.1f}" stroke="{RDECA}" stroke-width="1.5"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 4, B[1] + 14, "B"), napis(C[0] + 8, C[1] - 2, "C"), napis(D[0] - 6, D[1] - 6, "D"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "7 cm", 11), napis((A[0] + D[0]) / 2 - 18, (A[1] + D[1]) / 2, "5 cm", 11),
         napis((B[0] + D[0]) / 2 + 10, (B[1] + D[1]) / 2 - 2, "6 cm", 11, RDECA)]
    return svg(260, 145, "".join(t), opis="Paralelogram s krajšo diagonalo")

a8 = naloga(
    "A8", "obsegi_ploscine", 5,
    r"Stranici paralelograma merita \(7\) cm in \(5\) cm, krajša diagonala pa \(6\) cm. Nariši skico in izračunaj ploščino paralelograma.",
    r"\(S = 12\sqrt{6}\ \mathrm{cm^2} \approx 29{,}39\ \mathrm{cm^2}\)",
    [
        ("@slika", paralelogram()),
        ("Diagonala BD razdeli paralelogram na skladna trikotnika s stranicami 7, 5 in 6 cm.", ""),
        ("s = 9,  S<sub>ABD</sub> = " + K("9 · 2 · 4 · 3") + " = " + K("216") + " = 6" + K("6"), "Heronov obrazec.", "ploscine"),
        ("!S = 2 · 6" + K("6") + " = 12" + K("6") + " cm<sup>2</sup> ≈ 29,39 cm<sup>2</sup>", ""),
    ],
)

a9 = naloga(
    "A9", "odvod_pm", 5,
    r"Izračunaj koordinati točke, v kateri je tangenta na krivuljo \(y = x^2 - 4x + 2\) vzporedna premici \(y = 2x + 1\).",
    r"\(T(3, -1)\)",
    [
        ("y' = 2x − 4", "", "odvod"),
        ("2x − 4 = 2", "Vzporedni premici imata enak smerni koeficient.", "tangenta"),
        ("x = 3,  y = 9 − 12 + 2 = −1", ""),
        ("!T(3, −1)", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
P = lambda x: x ** 3 - 2 * x * x - 9 * x + 18

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 - 2x^2 - 9x + 18\).<br>"
    r"1.1. Izračunaj ničle in začetno vrednost polinoma \(p\). (5 točk)<br>"
    r"1.2. Skiciraj graf polinoma \(p\) in izračunaj \(p(4)\). (5 točk)<br>"
    r"1.3. Polinom \(p\) deli s polinomom \(q(x) = x + 1\). Zapiši količnik in ostanek. (5 točk)",
    r"1.1. \(2, 3, -3\); \(p(0) = 18\) &nbsp; 1.2. \(p(4) = 14\) &nbsp; 1.3. \(k(x) = x^2 - 3x - 6\), \(r = 24\)",
    [
        "## 1.1",
        ("p(x) = x<sup>2</sup>(x − 2) − 9(x − 2) = (x − 2)(x<sup>2</sup> − 9)", "Izpostavljanje po delih.", "horner"),
        ("= (x − 2)(x − 3)(x + 3)", ""),
        ("!x<sub>1</sub> = 2,  x<sub>2</sub> = 3,  x<sub>3</sub> = −3", ""),
        ("!p(0) = 18", ""),
        "## 1.2",
        ("@slika", graf([(P, MODRA)], (-3.6, 4.5), (-25, 30), [(-3, 0, ""), (2, 0, ""), (3, 0, ""), (0, 18, ""), (4, 14, "")], sirina=280, visina=400)),
        ("!p(4) = 64 − 32 − 36 + 18 = 14", ""),
        "## 1.3",
        ("@slika", tabela(["", "1", "−2", "−9", "18"], [["−1", "", "−1", "3", "6"], ["", "1", "−3", "−6", "24"]])),
        ("!k(x) = x<sup>2</sup> − 3x − 6,  r = 24", "Hornerjev algoritem z x = −1. Preizkus: p(−1) = −1 − 2 + 9 + 18 = 24."),
    ],
)

OKR = [120, 96, 144, 108, 132]
OGL = [85, 110, 95, 120, 90]
DNI = ["Pon", "Tor", "Sre", "Čet", "Pet"]


def drogova():
    t = ['<ellipse cx="45" cy="95" rx="22" ry="22" fill="none" stroke="currentColor"/>',
         '<ellipse cx="135" cy="35" rx="22" ry="22" fill="none" stroke="currentColor" stroke-opacity="0.5"/>',
         '<line x1="45" y1="73" x2="135" y2="13" stroke="currentColor"/>', '<line x1="45" y1="117" x2="135" y2="57" stroke="currentColor"/>',
         '<line x1="45" y1="95" x2="67" y2="95" stroke="currentColor"/>', napis(56, 90, "0,2 m", 9), napis(100, 92, "10 m", 10),
         '<rect x="175" y="95" width="30" height="30" fill="none" stroke="currentColor"/>',
         '<polyline points="175,95 255,40 285,40 285,70 205,125" fill="none" stroke="currentColor"/>', '<line x1="205" y1="95" x2="285" y2="40" stroke="currentColor"/>',
         napis(190, 138, "0,3 m", 9), napis(218, 112, "0,3 m", 9), napis(255, 92, "10 m", 10)]
    return svg(300, 145, "".join(t), opis="Okrogel in oglat drog")


def krozni():
    vs = sum(OKR)
    t, z = [], -90
    barve = [MODRA, RDECA, "#1E9E5A", "#C98A0B", "#7A4FC9"]
    for d, v, b in zip(DNI, OKR, barve):
        k = 360 * v / vs
        a0, a1 = math.radians(z), math.radians(z + k)
        x0, y0, x1, y1 = 90 + 70 * math.cos(a0), 90 + 70 * math.sin(a0), 90 + 70 * math.cos(a1), 90 + 70 * math.sin(a1)
        t.append(f'<path d="M 90 90 L {x0:.1f} {y0:.1f} A 70 70 0 0 1 {x1:.1f} {y1:.1f} Z" fill="{b}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        am = math.radians(z + k / 2)
        t.append(napis(90 + 45 * math.cos(am), 94 + 45 * math.sin(am), d, 10))
        t.append(napis(205, 30 + 22 * DNI.index(d), f"{d}: {k:.1f}°".replace(".", ","), 11, sidro="start"))
        z += k
    return svg(300, 180, "".join(t), opis="Krožni diagram okroglih drogov")

b2 = naloga(
    "B2", "statistika_pm", 15,
    r"V podjetju izdelujejo lesene drogove dveh oblik, kakor kaže slika: okrogel drog (valj s polmerom \(0{,}2\) m) in oglat drog (kvader z osnovno ploskvijo "
    r"\(0{,}3\) m \(\times\) \(0{,}3\) m); oba sta dolga \(10\) m." + drogova()
    + r"Preglednica prikazuje število izdelanih drogov po dnevih v enem tednu:"
    + tabela(["Dan v tednu"] + DNI, [["Okrogli drogovi"] + [str(v) for v in OKR], ["Oglati drogovi"] + [str(v) for v in OGL]])
    + r"2.1. Število izdelanih okroglih drogov prikaži s krožnim diagramom. (5 točk)<br>"
    r"2.2. Koliko odstotkov tedenske proizvodnje oglatih drogov predstavlja petkova proizvodnja? (4 točke)<br>"
    r"2.3. Izračunaj površino okroglega in površino oglatega droga. (6 točk)",
    r"2.2. \(18\,\%\) &nbsp; 2.3. \(\approx 12{,}82\ \mathrm{m^2}\) in \(12{,}18\ \mathrm{m^2}\)",
    [
        "## 2.1",
        ("vseh okroglih: 120 + 96 + 144 + 108 + 132 = 600", ""),
        ("en drog: " + U("360°", "600") + " = 0,6°", "Središčni kot je sorazmeren deležu.", "statistika"),
        ("Pon 72°, Tor 57,6°, Sre 86,4°, Čet 64,8°, Pet 79,2°", ""),
        ("@slika", krozni()),
        "## 2.2",
        ("vseh oglatih: 85 + 110 + 95 + 120 + 90 = 500", ""),
        ("!" + U("90", "500") + " = 0,18 = 18 %", "", "odstotki"),
        "## 2.3",
        ("P<sub>valja</sub> = 2πr<sup>2</sup> + 2πrv = 2π · 0,04 + 2π · 0,2 · 10 = 4,08π", "", "telesa"),
        ("!P<sub>valja</sub> ≈ 12,82 m<sup>2</sup>", ""),
        ("P<sub>kvadra</sub> = 2 · 0,3<sup>2</sup> + 4 · 0,3 · 10 = 0,18 + 12", ""),
        ("!P<sub>kvadra</sub> = 12,18 m<sup>2</sup>", ""),
    ],
)


def sal():
    k = 8
    t, x = [], 10
    for n in range(1, 6):
        b = 2 * n * k
        t.append(f'<polygon points="{x},100 {x + b},100 {x + b / 2},{100 - b}" fill="{MODRA}" fill-opacity="0.75"/>')
        t.append(napis(x + b / 2, 116, f"{n}.", 10))
        x += b + k
    t.append(f'<line x1="5" y1="100" x2="{x + 5}" y2="100" stroke="currentColor"/>')
    t.append('<line x1="10" y1="12" x2="10" y2="100" stroke="currentColor" stroke-opacity="0.5"/>')
    return svg(int(x + 15), 125, "".join(t), opis="Zaporedje enakokrakih trikotnikov na šalu")


b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Špela je na pravokoten šal naslikala zaporedje enakokrakih trikotnikov. Osnovnica \(n\)-tega trikotnika meri \(2n\) cm, njegova višina je enaka osnovnici. "
    r"Osnovnice so na spodnjem robu šala, med sosednjima trikotnikoma je \(1\) cm razmika, prvi trikotnik ima levo oglišče v levem spodnjem kotu šala." + sal()
    + r"3.1. Izračunaj ploščino petega trikotnika. (4 točke)<br>"
    r"3.2. Izračunaj obseg petega trikotnika. (5 točk)<br>"
    r"3.3. Koliko trikotnikov zaporedja lahko Špela nariše na šal, ki je dolg \(1{,}2\) m? (6 točk)",
    r"3.1. \(50\ \mathrm{cm^2}\) &nbsp; 3.2. \(\approx 32{,}36\) cm &nbsp; 3.3. \(10\)",
    [
        "## 3.1",
        ("a<sub>5</sub> = 2 · 5 = 10 cm,  v = 10 cm", ""),
        ("!S = " + U("10 · 10", "2") + " = 50 cm<sup>2</sup>", "", "ploscine"),
        "## 3.2",
        ("krak: b = " + K("5<sup>2</sup> + 10<sup>2</sup>") + " = " + K("125") + " = 5" + K("5") + " ≈ 11,18 cm", "Višina razpolovi osnovnico.", "pitagora"),
        ("!o = 10 + 2 · 5" + K("5") + " ≈ 32,36 cm", ""),
        "## 3.3",
        ("vsota osnovnic: 2 + 4 + … + 2n = n(n + 1)", "Vsota aritmetičnega zaporedja.", "aritmeticno"),
        ("dolžina n trikotnikov z razmiki: n(n + 1) + (n − 1) = n<sup>2</sup> + 2n − 1", ""),
        ("n<sup>2</sup> + 2n − 1 ≤ 120  ⇒  n<sup>2</sup> + 2n − 121 ≤ 0", "", "neenacba"),
        ("n ≤ −1 + " + K("122") + " ≈ 10,05", ""),
        ("!n = 10", "Preizkus: 10 trikotnikov zavzame 119 cm, 11 trikotnikov pa 142 cm."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
