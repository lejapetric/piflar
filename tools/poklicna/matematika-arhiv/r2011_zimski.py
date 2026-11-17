# Zimski rok 2011 (uradna pola RIC P113-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2011, "zimski", "torek, 7. februar 2012"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"V izraz vstavi \(a = 3\) in brez žepnega računala izračunaj: \((1 - a)^2 + 3 \cdot a^{-1} - 2^{a - 1}\).",
    r"\(1\)",
    [
        ("(1 − 3)<sup>2</sup> = 4", ""),
        ("3 · 3<sup>−1</sup> = 1,  2<sup>3 − 1</sup> = 4", "", "potence"),
        ("!4 + 1 − 4 = 1", ""),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Reši enačbo \(\dfrac{x + 1}{4} - \dfrac{x - 2}{6} = \dfrac{x + 5}{3}\).",
    r"\(x = -\frac{13}{3}\)",
    [
        ("3(x + 1) − 2(x − 2) = 4(x + 5)", "Pomnožimo s 12."),
        ("x + 7 = 4x + 20", ""),
        ("!x = −" + U("13", "3"), ""),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Dana je premica \(y = \frac{3}{4}x + 2\). Določi \(y\) tako, da bo točka \(T(8, y)\) ležala na premici. Izračunaj razdaljo točke \(T\) od koordinatnega izhodišča.",
    r"\(y = 8\); \(d = 8\sqrt{2} \approx 11{,}31\)",
    [
        ("!y = " + U("3", "4") + " · 8 + 2 = 8", "", "premica"),
        ("d = " + K("8<sup>2</sup> + 8<sup>2</sup>") + " = " + K("128"), "", "razdalja"),
        ("!d = 8" + K("2") + " ≈ 11,31", ""),
    ],
)

a4 = naloga(
    "A4", "ulomki_odstotki", 4,
    r"Meter dolgo palico smo razžagali na pet kosov. Štirje kosi merijo \(280\) mm, \(\frac{1}{2}\) dm, \(\frac{1}{5}\) m in \(0{,}4\) dm. Koliko meri peti kos?",
    r"\(430\) mm",
    [
        (U("1", "2") + " dm = 50 mm,  " + U("1", "5") + " m = 200 mm,  0,4 dm = 40 mm", "Vse pretvorimo v milimetre."),
        ("280 + 50 + 200 + 40 = 570 mm", ""),
        ("!1000 − 570 = 430 mm", "Peti kos meri 43 cm."),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Mama je skuhala \(1{,}5\) kg rižote: \(60\,\%\) je riža, \(25\,\%\) mesa, ostalo je zelenjava. Koliko gramov zelenjave je v rižoti?",
    r"\(225\) g",
    [
        ("zelenjava: 100 % − 60 % − 25 % = 15 %", ""),
        ("!0,15 · 1500 g = 225 g", "", "odstotki"),
    ],
)

a6 = naloga(
    "A6", "zaporedja_pm", 5,
    r"Za aritmetično zaporedje velja \(a_1 = 5\) in \(a_2 + a_3 = 22\). Izračunaj diferenco in vsoto prvih štirih členov.",
    r"\(d = 4\), \(S_4 = 44\)",
    [
        ("(a<sub>1</sub> + d) + (a<sub>1</sub> + 2d) = 22  ⇒  10 + 3d = 22", "", "aritmeticno"),
        ("!d = 4", ""),
        ("!S<sub>4</sub> = 5 + 9 + 13 + 17 = 44", ""),
    ],
)

a7 = naloga(
    "A7", "polinomi_racionalna", 5,
    r"Izračunaj ničlo, pol in vodoravno asimptoto funkcije \(f(x) = \dfrac{3x - 6}{x + 1}\) ter nariši njen graf.",
    r"ničla \(2\), pol \(-1\), \(y = 3\)",
    [
        ("!ničla x = 2,  pol x = −1", "", "racionalna"),
        ("!asimptota y = 3", ""),
        ("f(0) = −6", "Pomaga pri risanju."),
        ("@slika", graf([(lambda x: (3 * x - 6) / (x + 1), MODRA), (lambda x: 3, RDECA)], (-8, 7), (-8, 12), [(2, 0, ""), (0, -6, "")], sirina=300, visina=380)),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(\log x + \log 3 = \log(x^2 + 2)\).",
    r"\(x_1 = 1\), \(x_2 = 2\)",
    [
        ("pogoj: x > 0", ""),
        ("log(3x) = log(x<sup>2</sup> + 2)  ⇒  3x = x<sup>2</sup> + 2", "", "log_pravila"),
        ("x<sup>2</sup> − 3x + 2 = 0  ⇒  (x − 1)(x − 2) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = 1,  x<sub>2</sub> = 2", "Obe rešitvi ustrezata pogoju."),
    ],
)

a9 = naloga(
    "A9", "trikotnik_kotne", 5,
    r"V trikotniku \(ABC\) je \(b = 10\) cm, \(c = 6\) cm in \(\alpha = 120^\circ\). Izračunaj stranico \(a\) in ploščino trikotnika.",
    r"\(a = 14\) cm, \(S = 15\sqrt{3} \approx 25{,}98\ \mathrm{cm^2}\)",
    [
        ("a<sup>2</sup> = 100 + 36 − 2 · 10 · 6 · cos 120° = 136 + 60 = 196", "cos 120° = −1/2.", "kosinusni"),
        ("!a = 14 cm", ""),
        ("S = " + U("1", "2") + " · b · c · sin α = 30 · " + U(K("3"), "2"), "", "ploscine"),
        ("!S = 15" + K("3") + " ≈ 25,98 cm<sup>2</sup>", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
P = lambda x: x ** 3 - 3 * x + 2

b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dan je polinom \(p(x) = x^3 - 3x + 2\).<br>"
    r"1.1. Izračunaj ničle polinoma in presečišče grafa z ordinatno osjo. (6 točk)<br>"
    r"1.2. Nariši graf polinoma. (4 točke)<br>"
    r"1.3. Izračunaj abscise presečišč grafa polinoma s premico \(y = x + 2\). (5 točk)",
    r"1.1. \(1\) (dvojna), \(-2\); \((0, 2)\) &nbsp; 1.3. \(x = 0\), \(x = \pm 2\)",
    [
        "## 1.1",
        ("p(1) = 1 − 3 + 2 = 0", "", "horner"),
        ("p(x) = (x − 1)(x<sup>2</sup> + x − 2) = (x − 1)<sup>2</sup>(x + 2)", "Hornerjev algoritem: 1, 1, −2, ostanek 0."),
        ("!x<sub>1,2</sub> = 1,  x<sub>3</sub> = −2", ""),
        ("!(0, 2)", "p(0) = 2."),
        "## 1.2",
        ("@slika", graf([(P, MODRA), (lambda x: x + 2, RDECA)], (-3, 3), (-3, 6), [(1, 0, ""), (-2, 0, ""), (0, 2, ""), (2, 4, "")], sirina=260, visina=300)),
        "## 1.3",
        ("x<sup>3</sup> − 3x + 2 = x + 2  ⇒  x<sup>3</sup> − 4x = 0", ""),
        ("x(x − 2)(x + 2) = 0", ""),
        ("!x = 0,  x = 2,  x = −2", ""),
    ],
)

b2 = naloga(
    "B2", "obsegi_ploscine", 15,
    r"V kopalnici, ki je dolga \(4\) m, široka \(2{,}5\) m in visoka \(2{,}5\) m, so položili ploščice velikosti \(25\) cm \(\times\) \(40\) cm. "
    r"Popolnoma so prekrili tla in dve sosednji steni.<br>"
    r"2.1. Koliko kvadratnih metrov so prekrili s ploščicami? (5 točk)<br>"
    r"2.2. Koliko ploščic so potrebovali (brez odpada)? (4 točke)<br>"
    r"2.3. Kvadratni meter ploščic stane \(18\) EUR. Koliko bi prihranili, če bi prekrili le tla in manjšo steno? (6 točk)",
    r"2.1. \(26{,}25\ \mathrm{m^2}\) &nbsp; 2.2. \(263\) &nbsp; 2.3. \(180\) EUR",
    [
        "## 2.1",
        ("tla: 4 · 2,5 = 10 m<sup>2</sup>", "", "ploscine"),
        ("večja stena: 4 · 2,5 = 10 m<sup>2</sup>,  manjša stena: 2,5 · 2,5 = 6,25 m<sup>2</sup>", "Sosednji steni sta ena daljša in ena krajša."),
        ("!skupaj 26,25 m<sup>2</sup>", ""),
        "## 2.2",
        ("ploščica: 0,25 · 0,4 = 0,1 m<sup>2</sup>", ""),
        ("26,25 : 0,1 = 262,5", ""),
        ("!263 ploščic", "Zaokrožimo navzgor; zadnjo ploščico razrežemo."),
        "## 2.3",
        ("brez večje stene: 26,25 − 10 = 16,25 m<sup>2</sup>", ""),
        ("!prihranek: 10 · 18 = 180 EUR", ""),
    ],
)

b3 = naloga(
    "B3", "ulomki_odstotki", 15,
    r"Julija je Tina s študentskim delom zaslužila \(240\) EUR, Lea \(120\) EUR, Meta pa \(150\) EUR. Avgusta je Tina zaslužila četrtino manj, "
    r"Lea je zaslužek povečala za \(20\,\%\), Meta pa je zaslužila enako kakor julija.<br>"
    r"3.1. Izpolni preglednico. (5 točk)" + tabela(["", "Tina", "Lea", "Meta"], [["julij (EUR)", "", "", ""], ["avgust (EUR)", "", "", ""]])
    + r"3.2. Izračunaj povprečni zaslužek deklet julija in avgusta. Za koliko evrov je bil avgustovski povprečni zaslužek nižji? (5 točk)<br>"
    r"3.3. Meta je ves zaslužek obeh mesecev naložila v banko, ki obrestuje obrestnoobrestno po letni obrestni meri \(3\,\%\) z letnim pripisom obresti. "
    r"Koliko evrov več bo imela čez tri leta? (5 točk)",
    r"3.2. \(170\) EUR in \(158\) EUR, razlika \(12\) EUR &nbsp; 3.3. \(\approx 27{,}82\) EUR",
    [
        "## 3.1",
        ("Tina avgust: " + U("3", "4") + " · 240 = 180 EUR", ""),
        ("Lea avgust: 1,2 · 120 = 144 EUR", "", "odstotki"),
        ("@slika", tabela(["", "Tina", "Lea", "Meta"], [["julij (EUR)", "240", "120", "150"], ["avgust (EUR)", "180", "144", "150"]])),
        "## 3.2",
        ("!julij: " + U("240 + 120 + 150", "3") + " = 170 EUR", "", "statistika"),
        ("!avgust: " + U("180 + 144 + 150", "3") + " = 158 EUR", ""),
        ("!razlika: 12 EUR", ""),
        "## 3.3",
        ("G = 150 + 150 = 300 EUR", ""),
        ("G<sub>3</sub> = 300 · 1,03<sup>3</sup> ≈ 327,82 EUR", "", "obresti"),
        ("!več za ≈ 27,82 EUR", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
