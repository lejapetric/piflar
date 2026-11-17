# Spomladanski rok 2014 (uradne pole RIC: m141-401-1-1, m141-402-1-1, m141-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2014, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "mnozice", 6,
    r"Dane so množice \(A = \{1, 3, 5, 7, 9\}\), \(B = \{1, 2, 3, 4, 5, 6\}\) in \(C = \{2, 4, 8\}\). Z naštevanjem elementov zapiši množice:<br>"
    r"1.1. \(B \cap C\) (1 točka) &nbsp; 1.2. \(A \cup B\) (1 točka) &nbsp; 1.3. \(A \setminus B\) in \(B \setminus (A \cup C)\) (2 točki)<br>"
    r"1.4. Zapiši vse podmnožice množice \(C\). (2 točki)",
    r"1.1. \(\{2, 4\}\) &nbsp; 1.2. \(\{1, 2, 3, 4, 5, 6, 7, 9\}\) &nbsp; 1.3. \(\{7, 9\}\), \(\{6\}\) &nbsp; 1.4. \(8\) podmnožic",
    [
        ("!B ∩ C = {2, 4}", "Presek: elementi, ki so v obeh množicah."),
        ("!A ∪ B = {1, 2, 3, 4, 5, 6, 7, 9}", "Unija: elementi, ki so vsaj v eni množici."),
        ("!A \\ B = {7, 9}", "Razlika: elementi iz A, ki niso v B."),
        ("A ∪ C = {1, 2, 3, 4, 5, 7, 8, 9}  ⇒  B \\ (A ∪ C) = {6}", ""),
        ("!∅, {2}, {4}, {8}, {2, 4}, {2, 8}, {4, 8}, {2, 4, 8}", "Množica s 3 elementi ima 2³ = 8 podmnožic (potenčna množica)."),
    ],
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 7,
    r"Izračunaj diskriminante in poišči vse rešitve kvadratnih enačb. Rezultate zapiši v preglednico."
    + tabela(["Enačba", "Diskriminanta", "Rešitve"], [["\\(x^2 + 8x + 16 = 0\\)", "", ""], ["\\(x^2 - x - 12 = 0\\)", "", ""],
                                                     ["\\(x^2 - 4x + 13 = 0\\)", "", ""]]),
    r"\(D = 0\): \(x = -4\) &nbsp; \(D = 49\): \(x_1 = 4\), \(x_2 = -3\) &nbsp; \(D = -36\): \(x_{1,2} = 2 \pm 3i\)",
    [
        ("!D = 64 − 64 = 0,  x<sub>1,2</sub> = −4", "Diskriminanta D = b² − 4ac; pri D = 0 je rešitev dvojna."),
        ("!D = 1 + 48 = 49,  x<sub>1,2</sub> = " + U("1 ± 7", "2") + ":  4 in −3", "Rešitve kvadratne enačbe."),
        ("!D = 16 − 52 = −36,  x<sub>1,2</sub> = " + U("4 ± 6i", "2") + " = 2 ± 3i", "Pri D < 0 sta rešitvi konjugirani kompleksni števili."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n3 = naloga(
    3, "potence_koreni", 6,
    r"Brez računala izračunaj \(\sqrt[3]{a^2 \sqrt{a b^3}} : \sqrt[4]{a b^5}\) (\(a, b > 0\)). Rezultat zapiši v obliki \(\sqrt[k]{a^m b^n}\) "
    r"z najmanjšim možnim \(k\).",
    r"\(\sqrt[12]{a^7 b^{-9}}\)",
    [
        ("a<sup>2</sup> · a<sup>1/2</sup>b<sup>3/2</sup> = a<sup>5/2</sup>b<sup>3/2</sup>", "Koren zapišemo s potenco z racionalnim eksponentom."),
        ("(a<sup>5/2</sup>b<sup>3/2</sup>)<sup>1/3</sup> = a<sup>5/6</sup>b<sup>1/2</sup>", "Potenca potence."),
        ("a<sup>5/6 − 1/4</sup>b<sup>1/2 − 5/4</sup> = a<sup>7/12</sup>b<sup>−3/4</sup>", "Deljenje potenc z enako osnovo."),
        ("!" + K("a<sup>7</sup>b<sup>−9</sup>", "12"), "Eksponenta razširimo na skupni imenovalec 12."),
    ],
)

n4 = naloga(
    4, "geometrijski_liki_telesa", 7,
    r"Plašč pokončnega stožca razgrnemo v ravnino in dobimo krožni izsek, ki je tretjina kroga s polmerom \(9\ \mathrm{cm}\). Izračunaj "
    r"površino in prostornino stožca. Rezultata naj bosta točna.",
    r"\(P = 36\pi\ \mathrm{cm^2}\), \(V = 18\sqrt{2}\,\pi\ \mathrm{cm^3}\)",
    [
        ("s = 9 cm", "Polmer izseka je stranski rob (izvodnica) stožca."),
        ("2πr = " + U("1", "3") + " · 2π · 9  ⇒  r = 3 cm", "Lok izseka je obseg osnovne ploskve."),
        ("v = " + K("9<sup>2</sup> − 3<sup>2</sup>") + " = " + K("72") + " = 6" + K("2") + " cm", "Pitagorov izrek v osnem prerezu."),
        ("!P = πr<sup>2</sup> + πrs = 9π + 27π = 36π cm<sup>2</sup>", "Površina stožca."),
        ("!V = " + U("πr<sup>2</sup>v", "3") + " = " + U("9π · 6" + K("2"), "3") + " = 18" + K("2") + " π cm<sup>3</sup>", "Prostornina stožca."),
    ],
)

n5 = naloga(
    5, "vektorji_ravnina_prostor", 6,
    r"V prostoru sta dani točki \(A(2, -1, 0)\) in \(B(4, 1, -1)\) ter vektor \(\vec{c} = (1, -2, -2)\). Zapiši vektor \(\overrightarrow{AB}\) s "
    r"komponentami, izračunaj dolžino vektorja \(\vec{c}\) in dokaži, da sta vektorja \(\overrightarrow{AB}\) in \(\vec{c}\) pravokotna.",
    r"\(\overrightarrow{AB} = (2, 2, -1)\), \(|\vec{c}| = 3\)",
    [
        ("!" + V("AB") + " = (4 − 2, 1 + 1, −1 − 0) = (2, 2, −1)", "Koordinate vektorja: končna minus začetna točka."),
        ("!|" + V("c") + "| = " + K("1 + 4 + 4") + " = 3", "Dolžina vektorja."),
        ("!" + V("AB") + " · " + V("c") + " = 2 − 4 + 2 = 0  ⇒  vektorja sta pravokotna", "Skalarni produkt pravokotnih vektorjev je 0."),
    ],
)

n6 = naloga(
    6, "funkcije", 6,
    r"Brez računala reši enačbo \(\log_3 (x + 6) = 1 + \log_3 (x - 2)\).",
    r"\(x = 6\)",
    [
        ("pogoj: x > 2", "Argumenta logaritmov morata biti pozitivna."),
        ("log<sub>3</sub>(x + 6) = log<sub>3</sub>(3(x − 2))", "1 = log₃ 3; vsota logaritmov je logaritem produkta."),
        ("x + 6 = 3x − 6  ⇒  x = 6", "Logaritemska funkcija je injektivna."),
        ("!x = 6", "Rešitev ustreza pogoju."),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

def f7(x):
    return (x * x - 9) / (x * x - x - 2)

n7 = naloga(
    7, "funkcije", 8,
    r"Na sliki je graf racionalne funkcije \(f(x) = \dfrac{x^2 - a}{x^2 - x + b}\)."
    + graf([(f7, MODRA)], (-6, 6), (-6, 8), tocke=[(-3, 0, ""), (3, 0, ""), (0, 4.5, "")], sirina=340, visina=330)
    + r"7.1. Dopolni (vrednosti odčitaj s slike ali izračunaj): ničli funkcije, pola funkcije, začetna vrednost \(f(0)\) in enačba vodoravne "
      r"asimptote. (4 točke)<br>"
      r"7.2. Izračunaj konstanti \(a\) in \(b\). (4 točke)",
    r"7.1. ničli \(\pm 3\), pola \(x = -1\) in \(x = 2\), \(f(0) = \frac{9}{2}\), \(y = 1\) &nbsp; 7.2. \(a = 9\), \(b = -2\)",
    [
        ("!ničli x<sub>1</sub> = −3, x<sub>2</sub> = 3;  pola x = −1 in x = 2", "Ničle in poli preberemo na osi x."),
        ("!vodoravna asimptota y = 1", "Števec in imenovalec imata enako stopnjo in vodilna koeficienta 1."),
        ("x<sup>2</sup> − a = 0 pri x = 3  ⇒  a = 9", "Ničle funkcije so ničle števca."),
        ("x<sup>2</sup> − x + b = 0 pri x = 2  ⇒  b = −2", "Poli so ničle imenovalca (preverimo: x² − x − 2 = (x − 2)(x + 1))."),
        ("!a = 9,  b = −2,  f(0) = " + U("−9", "−2") + " = " + U("9", "2"), "Začetna vrednost."),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

n8 = naloga(
    8, "funkcije", 7,
    r"Brez računala izračunaj natančni vrednosti izrazov \(\sin 2x\) in \(\cos \left(x - \frac{\pi}{6}\right)\), če je \(\sin x = \frac{2}{3}\) in je "
    r"\(x\) ostri kot.",
    r"\(\sin 2x = \frac{4\sqrt{5}}{9}\), \(\cos\left(x - \frac{\pi}{6}\right) = \frac{\sqrt{15} + 2}{6}\)",
    [
        ("cos x = " + K("1 − " + U("4", "9")) + " = " + U(K("5"), "3"), "sin²x + cos²x = 1; za ostri kot je kosinus pozitiven."),
        ("!sin 2x = 2 · " + U("2", "3") + " · " + U(K("5"), "3") + " = " + U("4" + K("5"), "9"), "Sinus dvojnega kota."),
        ("cos(x − " + U("π", "6") + ") = cos x · " + U(K("3"), "2") + " + sin x · " + U("1", "2"), "Adicijski izrek za kosinus."),
        ("!cos(x − " + U("π", "6") + ") = " + U(K("15"), "6") + " + " + U("1", "3") + " = " + U(K("15") + " + 2", "6"), ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, ["kombinatorika", "verjetnostni_racun"], 7,
    r"V majhnem podjetju je zaposlenih \(7\) moških in \(5\) žensk. Štirje se bodo udeležili seminarja.<br>"
    r"9.1. Na koliko načinov lahko izberejo udeležence, da bosta spola enako zastopana? (2 točki)<br>"
    r"9.2. Na koliko načinov lahko izberejo udeležence, če mora biti moških več kot žensk? (2 točki)<br>"
    r"9.3. Kolikšna je verjetnost, da so v naključno izbrani skupini vsi štirje istega spola? (3 točke)",
    r"9.1. \(210\) &nbsp; 9.2. \(210\) &nbsp; 9.3. \(\frac{8}{99}\)",
    [
        ("!9.1  " + BINOM("7", "2") + " · " + BINOM("5", "2") + " = 21 · 10 = 210", "Dva moška in dve ženski; kombinacije in pravilo produkta."),
        ("!9.2  " + BINOM("7", "3") + " · " + BINOM("5", "1") + " + " + BINOM("7", "4") + " = 175 + 35 = 210", "Trije moški in ena ženska ali štirje moški; pravilo vsote."),
        ("P = " + U(BINOM("7", "4") + " + " + BINOM("5", "4"), BINOM("12", "4")) + " = " + U("35 + 5", "495"), "Klasična definicija verjetnosti."),
        ("!9.3  P = " + U("40", "495") + " = " + U("8", "99"), ""),
    ],
)

n10 = naloga(
    10, "zaporedja_vrste", 7,
    r"Števila \(4, 11, 18, 25\) so prvi štirje členi aritmetičnega zaporedja. Zapiši splošni člen. Kateri člen zaporedja je enak \(1397\)? "
    r"Izračunaj vsoto prvih \(100\) členov.",
    r"\(a_n = 7n - 3\); \(a_{200} = 1397\); \(s_{100} = 35\,050\)",
    [
        ("!d = 7,  a<sub>n</sub> = 4 + (n − 1) · 7 = 7n − 3", "Splošni člen aritmetičnega zaporedja."),
        ("!7n − 3 = 1397  ⇒  n = 200", ""),
        ("!s<sub>100</sub> = " + U("100", "2") + "(a<sub>1</sub> + a<sub>100</sub>) = 50 · (4 + 697) = 35 050", "Vsota členov aritmetičnega zaporedja."),
    ],
)

n11 = naloga(
    11, "integralski_racun", 6,
    r"Dana je funkcija \(f(x) = \dfrac{a}{\sqrt{x}}\), \(a > 0\), \(x > 0\). Izračunaj \(a\), da bo ploščina območja med grafom funkcije, "
    r"abscisno osjo ter premicama \(x = 1\) in \(x = 9\) enaka \(8\).",
    r"\(a = 2\)",
    [
        ("p = " + INT("9", "1") + "a x<sup>−1/2</sup> dx = 2a" + K("x") + MEJA("9", "1"), "Integral potence: ∫ x^(−1/2) dx = 2√x."),
        ("p = 2a(3 − 1) = 4a = 8", "Funkcija je pozitivna, zato je ploščina enaka integralu."),
        ("!a = 2", ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n12 = naloga(
    12, ["geometrijski_liki_telesa", "algebrski_izrazi_enacbe_neenacbe"], 7,
    r"Zunanji rob okvirja slike je pravokotnik \(12\ \mathrm{dm} \times 9\ \mathrm{dm}\). Okvir je ob vseh štirih robovih enako širok. Znotraj "
    r"notranjega roba je slika s ploščino \(78{,}75\ \mathrm{dm^2}\). Izračunaj širino okvirja.",
    r"\(0{,}75\ \mathrm{dm}\)",
    [
        ("(12 − 2x)(9 − 2x) = 78,75", "Slika ima stranici, krajši za dvakratno širino okvirja."),
        ("4x<sup>2</sup> − 42x + 29,25 = 0", ""),
        ("x = " + U("42 ± " + K("1764 − 468"), "8") + " = " + U("42 ± 36", "8"), "Rešitve kvadratne enačbe."),
        ("!x = 0,75 dm", "x = 9,75 dm ni mogoča, saj je večja od polovice stranice 9 dm."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
def f_v1(x):
    return -x * x / 9 + x

v1 = naloga(
    1, ["funkcije", "stoznice", "integralski_racun"], 15,
    r"Dana je kvadratna funkcija \(f(x) = -\frac{x^2}{9} + x\).<br>"
    r"1.1. Nariši graf funkcije \(f\). Dokaži, da sta tangenti na graf v presečiščih z osjo \(x\) pravokotni. (4 točke)<br>"
    r"1.2. Krivulja \(y^2 = f(x)\) je elipsa. Zapiši njeno enačbo v obliki \(\frac{(x - p)^2}{a^2} + \frac{(y - q)^2}{b^2} = 1\), njena temena in "
    r"gorišči. Izračunaj prostornino telesa, ki nastane, ko elipso zavrtimo za \(360^\circ\) okrog osi \(x\). (8 točk)<br>"
    r"1.3. Krivulja \(y^2 = -f(x)\) je hiperbola. Zapiši njeno enačbo v obliki \(\frac{(x - p)^2}{a^2} - \frac{(y - q)^2}{b^2} = 1\) in enačbi "
    r"asimptot. (3 točke)",
    r"1.2. \(\frac{(x - 9/2)^2}{81/4} + \frac{y^2}{9/4} = 1\), \(V = \frac{27\pi}{2}\) &nbsp; 1.3. \(\frac{(x - 9/2)^2}{81/4} - \frac{y^2}{9/4} = 1\), "
    r"\(y = \pm\frac{1}{3}\left(x - \frac{9}{2}\right)\)",
    [
        ("@slika", graf([(f_v1, MODRA)], (-1, 10), (-2, 3), tocke=[(0, 0, ""), (9, 0, ""), (4.5, 2.25, "T")], sirina=360, visina=200)),
        ("ničli 0 in 9;  f '(x) = −" + U("2x", "9") + " + 1", ""),
        ("k<sub>1</sub> = f '(0) = 1,  k<sub>2</sub> = f '(9) = −1", "Smerni koeficient tangente je vrednost odvoda."),
        ("!k<sub>1</sub> · k<sub>2</sub> = −1  ⇒  tangenti sta pravokotni", "Pogoj pravokotnosti premic."),
        (U("x<sup>2</sup> − 9x", "9") + " + y<sup>2</sup> = 0  ⇒  " + U("(x − 9/2)<sup>2</sup>", "9") + " + y<sup>2</sup> = " + U("9", "4"), "Dopolnimo do popolnega kvadrata."),
        ("!" + U("(x − 9/2)<sup>2</sup>", "81/4") + " + " + U("y<sup>2</sup>", "9/4") + " = 1", "a = 9/2, b = 3/2."),
        ("!temena (0, 0), (9, 0), (" + U("9", "2") + ", ±" + U("3", "2") + ")", ""),
        ("e = " + K(U("81", "4") + " − " + U("9", "4")) + " = " + K("18") + " = 3" + K("2"), "Linearna ekscentričnost elipse: e² = a² − b²."),
        ("!gorišči (" + U("9", "2") + " ± 3" + K("2") + ", 0)", ""),
        ("V = π" + INT("9", "0") + "(−" + U("x<sup>2</sup>", "9") + " + x) dx = π(−" + U("x<sup>3</sup>", "27") + " + " + U("x<sup>2</sup>", "2") + ")" + MEJA("9", "0"), "Prostornina vrtenine: V = π∫ y² dx."),
        ("!V = π(−27 + " + U("81", "2") + ") = " + U("27π", "2"), ""),
        ("!" + U("(x − 9/2)<sup>2</sup>", "81/4") + " − " + U("y<sup>2</sup>", "9/4") + " = 1", "Enak račun z nasprotnim predznakom pri y²."),
        ("!asimptoti y = ±" + U("1", "3") + "(x − " + U("9", "2") + ")", "Asimptoti hiperbole: y − q = ±(b/a)(x − p)."),
    ],
)

v2 = naloga(
    2, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Obvezna naloga. Dana je funkcija \(f(x) = 2\sin x + \tan x\).<br>"
    r"2.1. Določi definicijsko območje funkcije in izračunaj njene ničle. (5 točk)<br>"
    r"2.2. Dokaži, da je funkcija \(f\) liha. (2 točki)<br>"
    r"2.3. Ali funkcija v točki z absciso \(x_0 = \frac{\pi}{4}\) narašča ali pada? Utemelji. (3 točke)<br>"
    r"2.4. Izračunaj \(\int f(x)\, dx\). (4 točke)",
    r"2.1. \(x \ne \frac{\pi}{2} + k\pi\); ničle \(x = k\pi\), \(x = \pm\frac{2\pi}{3} + 2k\pi\) &nbsp; 2.3. narašča &nbsp; "
    r"2.4. \(-2\cos x - \ln|\cos x| + C\)",
    [
        ("!D<sub>f</sub> = ℝ \\ {" + U("π", "2") + " + kπ; k ∈ ℤ}", "Tangens ni definiran, kjer je cos x = 0."),
        ("sin x (2 + " + U("1", "cos x") + ") = 0", "Izpostavimo sin x; tan x = sin x / cos x."),
        ("sin x = 0  ⇒  x = kπ", ""),
        ("cos x = −" + U("1", "2") + "  ⇒  x = ±" + U("2π", "3") + " + 2kπ", "Enačbe s kotnimi funkcijami."),
        ("!ničle: x = kπ,  x = ±" + U("2π", "3") + " + 2kπ,  k ∈ ℤ", ""),
        ("!f(−x) = 2 sin(−x) + tan(−x) = −(2 sin x + tan x) = −f(x)", "Sinus in tangens sta lihi funkciji; D je simetrično glede na 0."),
        ("f '(x) = 2 cos x + " + U("1", "cos<sup>2</sup> x"), "Odvod sinusa in tangensa."),
        ("f '(" + U("π", "4") + ") = 2 · " + U(K("2"), "2") + " + 2 = " + K("2") + " + 2 > 0", ""),
        ("!f v x₀ = π/4 narašča", "Pozitiven odvod pomeni naraščanje (stacionarne točke in monotonost)."),
        ("∫ tan x dx = ∫ " + U("sin x", "cos x") + " dx = −ln|cos x| + C", "Uvedba nove spremenljivke t = cos x."),
        ("!∫ f(x) dx = −2 cos x − ln|cos x| + C", ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

v3 = naloga(
    3, ["kombinatorika", "zaporedja_vrste", "mnozice"], 11,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Množica \(A_n = \{1, 5, 9, \dots, 4n - 3\} = \{4k - 3;\ 1 \le k \le n\}\) ima \(n\) elementov.<br>"
    r"3.1. Naj bo \(n = 5\). Koliko je vseh preslikav iz \(A_5\) v \(A_5\)? Koliko med njimi je bijektivnih? (2 točki)<br>"
    r"3.2. Za kateri \(n\) ima množica \(A_n\) natanko \(256\) podmnožic? (2 točki)<br>"
    r"3.3. Za kateri \(n\) ima \(A_n\) štirikrat več tričlenskih kot dvočlenskih podmnožic? (3 točke)<br>"
    r"3.4. S popolno indukcijo dokaži, da je vsota vseh elementov množice \(A_n\) enaka \(n(2n - 1)\). (4 točke)",
    r"3.1. \(3125\), \(120\) &nbsp; 3.2. \(n = 8\) &nbsp; 3.3. \(n = 14\)",
    [
        ("!3.1  5<sup>5</sup> = 3125 preslikav,  5! = 120 bijektivnih", "Vsak od 5 elementov ima 5 možnih slik; bijekcije so permutacije."),
        ("!3.2  2<sup>n</sup> = 256  ⇒  n = 8", "Množica z n elementi ima 2ⁿ podmnožic."),
        (BINOM("n", "3") + " = 4 · " + BINOM("n", "2") + "  ⇒  " + U("n(n − 1)(n − 2)", "6") + " = 2n(n − 1)", "Število k-členskih podmnožic je binomski simbol."),
        ("!3.3  n − 2 = 12  ⇒  n = 14", "Delimo z n(n − 1) ≠ 0."),
        ("n = 1:  1 = 1 · (2 − 1)", "Baza indukcije."),
        ("n(2n − 1) + (4(n + 1) − 3) = 2n<sup>2</sup> + 3n + 1 = (n + 1)(2n + 1)", "Indukcijski korak: vsoti za n prištejemo naslednji element 4n + 1."),
        ("!3.4  (n + 1)(2(n + 1) − 1) – trditev velja za vsak n", ""),
    ],
)

def kroznica_v4(X, Y):
    return (parametricna(X, Y, lambda t: 2 * math.cos(t), lambda t: 2 * math.sin(t), 0, 2 * math.pi, MODRA)
            + f'<circle cx="{X(2):.1f}" cy="{Y(0):.1f}" r="4" fill="white" stroke="{MODRA}" stroke-width="2"/>'
            + f'<circle cx="{X(-2):.1f}" cy="{Y(0):.1f}" r="4" fill="white" stroke="{MODRA}" stroke-width="2"/>')

v4 = naloga(
    4, "stevilske_mnozice", 11,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Števili \(z\) in \(w\) sta kompleksni, \(w = \dfrac{z - 2}{z + 2}\).<br>"
    r"4.1. Naj bo \(z = 1 + 3i\). Izračunaj \(\mathrm{Re}\, w\) in \(\mathrm{Im}\, w\). (3 točke)<br>"
    r"4.2. Naj bo \(z = 2 + yi\), \(y \in \mathbb{R}\). Za katere \(y\) je \(|w| = \frac{3}{5}\)? (3 točke)<br>"
    r"4.3. V kompleksni ravnini nariši množico vseh \(z = x + yi\), za katere je \(w\) čisto imaginarno število. (5 točk)",
    r"4.1. \(\mathrm{Re}\, w = \frac{1}{3}\), \(\mathrm{Im}\, w = \frac{2}{3}\) &nbsp; 4.2. \(y = \pm 3\) &nbsp; 4.3. krožnica \(|z| = 2\) brez točk \(\pm 2\)",
    [
        ("w = " + U("−1 + 3i", "3 + 3i") + " · " + U("3 − 3i", "3 − 3i") + " = " + U("−3 + 3i + 9i − 9i<sup>2</sup>", "18") + " = " + U("6 + 12i", "18"),
         "Ulomek razširimo s konjugirano vrednostjo imenovalca."),
        ("!4.1  Re w = " + U("1", "3") + ",  Im w = " + U("2", "3"), ""),
        ("|w| = " + U("|yi|", "|4 + yi|") + " = " + U("|y|", K("16 + y<sup>2</sup>")) + " = " + U("3", "5"), "Absolutna vrednost kvocienta je kvocient absolutnih vrednosti."),
        ("25y<sup>2</sup> = 144 + 9y<sup>2</sup>  ⇒  y<sup>2</sup> = 9", ""),
        ("!4.2  y = ±3", ""),
        ("(z − 2)(z̄ + 2) = (x<sup>2</sup> + y<sup>2</sup> − 4) + 4yi", "Razširimo z (z̄ + 2); imenovalec |z + 2|² je realen in pozitiven."),
        ("x<sup>2</sup> + y<sup>2</sup> − 4 = 0  in  y ≠ 0", "Čisto imaginarno: realni del je 0, imaginarni ni 0."),
        ("@slika", mreza((-3, 3), (-3, 3), kroznica_v4, sirina=220)),
        ("!4.3  krožnica s središčem 0 in polmerom 2 brez točk 2 in −2", "Pri z = −2 w ni definiran, pri z = 2 je w = 0."),
    ],
)

POLA2 = [v1, v2, v3, v4]
