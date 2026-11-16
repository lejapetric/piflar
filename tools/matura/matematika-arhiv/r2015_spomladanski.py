# Spomladanski rok 2015 (uradne pole RIC: m151-401-1-1, m151-402-1-1, m151-402-1-2)
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2015, "spomladanski"
FUN = "/views/matematika/snov/funkcije/"

# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, ["stevilske_mnozice", "potence_koreni"], 6,
    r"Primerjaj števili \(a\) in \(b\) ter v srednji stolpec vpiši \(>\), \(<\) ali \(=\) (prvi dve vrstici sta že rešeni)."
    + tabela(["število \\(a\\)", "", "število \\(b\\)"], [
        ["\\(-1\\)", "\\(>\\)", "\\(-5\\)"], ["\\(2\\)", "\\(<\\)", "\\(3\\)"],
        ["\\(-\\frac{3}{4}\\)", "", "\\(-\\frac{2}{3}\\)"], ["\\((-2)^3\\)", "", "\\((-3)^2\\)"], ["\\(\\sqrt{2}\\)", "", "\\(1{,}41\\)"],
        ["\\(\\pi\\)", "", "\\(\\frac{22}{7}\\)"], ["\\(0{,}\\overline{9}\\)", "", "\\(1\\)"], ["\\(100^{100}\\)", "", "\\(100!\\)"]]),
    r"\(<\), \(<\), \(>\), \(<\), \(=\), \(>\)",
    [
        ("!−" + U("3", "4") + " = −0,75 < −0,666… = −" + U("2", "3"), "Ulomka pretvorimo v decimalni števili; na številski premici je bolj levo manjše število."),
        ("!(−2)<sup>3</sup> = −8 < 9 = (−3)<sup>2</sup>", "Liha potenca negativnega števila je negativna, soda pozitivna."),
        ("!" + K("2") + " = 1,4142… > 1,41", ""),
        ("!π = 3,14159… < 3,14285… = " + U("22", "7"), "22/7 je le približek števila π."),
        ("!0,999… = 1", "Periodično decimalno število: 0,(9) = 9/9 = 1."),
        ("!100<sup>100</sup> > 100!", "100! = 1 · 2 · … · 100 ima 100 faktorjev, vsak je največ 100, večina pa manjša."),
    ],
)

n2 = naloga(
    2, "vektorji_ravnina_prostor", 8,
    r"Dani so vektorji \(\vec{a} = (2, -1, 3)\), \(\vec{b} = (-3, 4, 1)\) in \(\vec{c} = (x, 5, -2)\).<br>"
    r"2.1. Izračunaj \(2\vec{a} + \vec{b}\). (2 točki)<br>"
    r"2.2. Izračunaj \(\vec{a} \cdot \vec{b}\). (2 točki)<br>"
    r"2.3. Izračunaj dolžino vektorja \(\vec{b}\). (2 točki)<br>"
    r"2.4. Določi \(x\), da bosta vektorja \(\vec{a}\) in \(\vec{c}\) pravokotna. (2 točki)",
    r"2.1. \((1, 2, 7)\) &nbsp; 2.2. \(-7\) &nbsp; 2.3. \(\sqrt{26}\) &nbsp; 2.4. \(x = \frac{11}{2}\)",
    [
        ("!2" + V("a") + " + " + V("b") + " = (4, −2, 6) + (−3, 4, 1) = (1, 2, 7)", "Seštevamo istoležne komponente."),
        ("!" + V("a") + " · " + V("b") + " = −6 − 4 + 3 = −7", "Skalarni produkt v koordinatah."),
        ("!|" + V("b") + "| = " + K("9 + 16 + 1") + " = " + K("26"), "Dolžina vektorja."),
        (V("a") + " · " + V("c") + " = 2x − 5 − 6 = 0", "Pravokotna vektorja imata skalarni produkt 0."),
        ("!x = " + U("11", "2"), ""),
    ],
)

def f3(x):
    return 3 * math.cos(x) + 1

def os_pi(X, Y):
    t = krivulja(X, Y, f3, -math.pi, 2 * math.pi, MODRA)
    for k, n in ((-1, "−π"), (1, "π"), (2, "2π")):
        t += f'<text x="{X(k * math.pi):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">{n}</text>'
    return t

n3 = naloga(
    3, ["funkcije", "diferencialni_racun", "integralski_racun"], 8,
    r"Dana je funkcija \(f(x) = 3\cos x + 1\).<br>"
    r"3.1. Nariši graf funkcije \(f\). (3 točke)<br>"
    r"3.2. Izračunaj odvod \(f'(x)\). (2 točki)<br>"
    r"3.3. Izračunaj nedoločeni integral \(\int f(x)\, dx\). (3 točke)",
    r"3.2. \(f'(x) = -3\sin x\) &nbsp; 3.3. \(3\sin x + x + C\)",
    [
        ("Z<sub>f</sub> = [−2, 4],  f(0) = 4,  f(π) = −2", "Graf kosinusa raztegnemo s faktorjem 3 v smeri osi y in premaknemo za 1 navzgor."),
        ("@slika", mreza((-math.pi - 0.3, 2 * math.pi + 0.3), (-3, 5), os_pi, sirina=380, visina=200, oznake=False)),
        ("!f '(x) = −3 sin x", "Odvod kosinusa je −sinus; odvod konstante je 0."),
        ("!∫ (3 cos x + 1) dx = 3 sin x + x + C", "Integral kosinusa je sinus; integral konstante."),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n4 = naloga(
    4, "stevilske_mnozice", 8,
    r"Dano je kompleksno število \(z = 2 + 5i\). Izračunaj:<br>"
    r"4.1. \(z \cdot \bar{z}\) (2 točki) &nbsp; 4.2. \(\bar{z}\) (1 točka) &nbsp; 4.3. \(z^2 + i^{19}\) (3 točke) &nbsp; 4.4. \(z^{-1}\) (2 točki)",
    r"4.1. \(29\) &nbsp; 4.2. \(2 - 5i\) &nbsp; 4.3. \(-21 + 19i\) &nbsp; 4.4. \(\frac{2}{29} - \frac{5}{29}i\)",
    [
        ("!4.1  z · z̄ = 2<sup>2</sup> + 5<sup>2</sup> = 29", "Produkt števila s konjugirano vrednostjo je |z|²."),
        ("!4.2  z̄ = 2 − 5i", "Konjugirana vrednost: spremenimo predznak imaginarnega dela."),
        ("z<sup>2</sup> = 4 + 20i + 25i<sup>2</sup> = −21 + 20i", "Kvadrat dvočlenika, i² = −1."),
        ("i<sup>19</sup> = i<sup>16</sup> · i<sup>3</sup> = −i", "Potence števila i se ponavljajo s periodo 4."),
        ("!4.3  z<sup>2</sup> + i<sup>19</sup> = −21 + 19i", ""),
        ("!4.4  z<sup>−1</sup> = " + U("1", "2 + 5i") + " · " + U("2 − 5i", "2 − 5i") + " = " + U("2", "29") + " − " + U("5", "29") + "i",
         "Ulomek razširimo s konjugirano vrednostjo imenovalca."),
    ],
)

def jezero():
    A, B, C = (40, 170), (320, 150), (150, 30)
    t = (f'<ellipse cx="180" cy="160" rx="130" ry="26" fill="{MODRA}" fill-opacity="0.15"/>'
         f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>'
         f'<line x1="{A[0]}" y1="{A[1]}" x2="{B[0]}" y2="{B[1]}" stroke="{RDECA}" stroke-width="1.5" stroke-dasharray="5 4"/>'
         '<text x="26" y="182" font-size="12" fill="currentColor">A</text><text x="326" y="160" font-size="12" fill="currentColor">B</text>'
         '<text x="146" y="22" font-size="12" fill="currentColor">C</text><text x="64" y="160" font-size="12" fill="currentColor">α</text>')
    return svg(360, 200, t)

n5 = naloga(
    5, "geometrijski_liki_telesa", 5,
    r"Janez meri širino jezera med točkama \(A\) in \(B\). Izmeril je \(|AC| = 240\ \mathrm{m}\), \(|BC| = 290\ \mathrm{m}\) in kot "
    r"\(\alpha = \angle BAC = 62^\circ\). Kolikšna je razdalja \(|AB|\)? Rezultat zaokroži na meter." + jezero(),
    r"\(|AB| \approx 311\ \mathrm{m}\)",
    [
        ("sin β = " + U("|AC| sin α", "|BC|") + " = " + U("240 · sin 62°", "290") + " ≈ 0,7307", "Sinusni izrek: β je kot pri B, nasproti stranice AC."),
        ("β ≈ 46,95°", "β je oster, ker leži nasproti krajše stranice (240 < 290)."),
        ("γ = 180° − 62° − 46,95° ≈ 71,05°", "Vsota notranjih kotov trikotnika."),
        ("|AB| = " + U("|BC| sin γ", "sin α") + " = " + U("290 · sin 71,05°", "sin 62°"), "Še enkrat sinusni izrek."),
        ("!|AB| ≈ 311 m", ""),
    ],
)

n6 = naloga(
    6, ["funkcije", "algebrski_izrazi_enacbe_neenacbe"], 6,
    r"Za katere realne \(x\) leži graf funkcije \(f(x) = 2x^2 - 3x - 4\) pod premico \(y = x + 2\)?",
    r"\(x \in (-1, 3)\)",
    [
        ("2x<sup>2</sup> − 3x − 4 < x + 2  ⇒  2x<sup>2</sup> − 4x − 6 < 0", "Graf leži pod premico, ko je f(x) manjši od vrednosti premice."),
        ("x<sup>2</sup> − 2x − 3 < 0  ⇒  (x − 3)(x + 1) < 0", "Delimo z 2 in razstavimo (Vietovo pravilo)."),
        ("!x ∈ (−1, 3)", "Parabola z odprtino navzgor je negativna med ničlama (kvadratna neenačba)."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

n7 = naloga(
    7, "funkcije", 7,
    r"Eksponentna funkcija ima predpis \(f(x) = 2^{x + 1} - 3\).<br>"
    r"7.1. Natančno izračunaj neznani koordinati točk \(A(-3, y)\) in \(B(x, 13)\) na grafu funkcije \(f\). (5 točk)<br>"
    r"7.2. Zapiši enačbo vodoravne asimptote. Ali je funkcija naraščajoča ali padajoča? Utemelji. (2 točki)",
    r"7.1. \(A\left(-3, -\frac{11}{4}\right)\), \(B(3, 13)\) &nbsp; 7.2. \(y = -3\), naraščajoča",
    [
        ("f(−3) = 2<sup>−2</sup> − 3 = " + U("1", "4") + " − 3", "Negativni eksponent: 2⁻² = 1/4."),
        ("!A(−3, −" + U("11", "4") + ")", ""),
        ("2<sup>x + 1</sup> − 3 = 13  ⇒  2<sup>x + 1</sup> = 16 = 2<sup>4</sup>", "Eksponentna enačba."),
        ("!B(3, 13)", ""),
        ("!7.2  asimptota y = −3;  f je naraščajoča", "Osnova 2 > 1, zato eksponentna funkcija narašča; premik za 3 navzdol premakne asimptoto."),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

n8 = naloga(
    8, "zaporedja_vrste", 7,
    r"V geometrijskem zaporedju s kvocientom \(3\) je vsota prvih osmih členov \(16\,400\). Zapiši splošni člen zaporedja. Koliko začetnih "
    r"členov je manjših od \(20\,000\)?",
    r"\(a_n = 5 \cdot 3^{n - 1}\); \(8\) členov",
    [
        ("s<sub>8</sub> = a<sub>1</sub> · " + U("3<sup>8</sup> − 1", "3 − 1") + " = 3280 a<sub>1</sub> = 16 400", "Vsota členov geometrijskega zaporedja."),
        ("!a<sub>1</sub> = 5,  a<sub>n</sub> = 5 · 3<sup>n − 1</sup>", "Splošni člen geometrijskega zaporedja."),
        ("5 · 3<sup>n − 1</sup> < 20 000  ⇒  3<sup>n − 1</sup> < 4000", ""),
        ("3<sup>7</sup> = 2187 < 4000 < 6561 = 3<sup>8</sup>  ⇒  n − 1 ≤ 7", ""),
        ("!manjših od 20 000 je prvih 8 členov", ""),
    ],
)

n9 = naloga(
    9, ["kombinatorika", "verjetnostni_racun"], 5,
    r"V razredu s \(30\) dijaki je \(18\) deklet in \(12\) fantov.<br>"
    r"9.1. Profesor naključno izbere enega dijaka. Izračunaj verjetnost, da je izbran fant. (2 točki)<br>"
    r"9.2. Naključno izbere dva dijaka. Izračunaj verjetnost, da sta izbrani dve dekleti. (3 točke)",
    r"9.1. \(\frac{2}{5}\) &nbsp; 9.2. \(\frac{51}{145}\)",
    [
        ("!9.1  P = " + U("12", "30") + " = " + U("2", "5"), "Klasična definicija verjetnosti."),
        ("P = " + U(BINOM("18", "2"), BINOM("30", "2")) + " = " + U("153", "435"), "Kombinacije: izberemo 2 izmed 18 deklet oziroma 2 izmed 30 dijakov."),
        ("!9.2  P = " + U("51", "145"), ""),
    ],
)

n10 = naloga(
    10, ["diferencialni_racun", "integralski_racun"], 8,
    r"Parabola ima enačbo \(y = -x^2 + 9\).<br>"
    r"10.1. Zapiši enačbo tangente na parabolo v točki \(A(2, 5)\). (3 točke)<br>"
    r"10.2. Parabola, tangenta v točki \(A\) in abscisna os omejujejo lik. Izračunaj njegovo ploščino. (5 točk)",
    r"10.1. \(y = -4x + 13\) &nbsp; 10.2. \(\frac{11}{24}\)",
    [
        ("y' = −2x,  k = y'(2) = −4", "Smerni koeficient tangente je vrednost odvoda."),
        ("!10.1  y − 5 = −4(x − 2)  ⇒  y = −4x + 13", "Enačba premice skozi točko."),
        ("@slika", graf([(lambda x: -x * x + 9, MODRA), (lambda x: -4 * x + 13, RDECA)], (-1, 4), (-1, 10), tocke=[(2, 5, "A"), (3, 0, ""), (3.25, 0, "")], sirina=260, visina=320)),
        ("tangenta seka os x pri x = " + U("13", "4") + ", parabola pri x = 3", "Ničli premice in parabole (desno od A)."),
        ("p = " + U("1", "2") + " · (" + U("13", "4") + " − 2) · 5 − " + INT("3", "2") + "(9 − x<sup>2</sup>) dx", "Lik je trikotnik pod tangento brez dela pod parabolo."),
        ("p = " + U("25", "8") + " − (9x − " + U("x<sup>3</sup>", "3") + ")" + MEJA("3", "2") + " = " + U("25", "8") + " − " + U("8", "3"), ""),
        ("!10.2  p = " + U("11", "24"), ""),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

n11 = naloga(
    11, "algebrski_izrazi_enacbe_neenacbe", 6,
    r"Na koncertu je bilo razmerje med številom odraslih in številom otrok \(3 : 5\). Otrok je bilo \(520\). Vstopnica za odraslega je bila "
    r"\(1{,}5\)-krat dražja od vstopnice za otroka. Izkupiček od prodaje vstopnic je bil \(9880\) evrov. Kolikšna je bila cena vstopnice za "
    r"odraslega?",
    r"\(15\) evrov",
    [
        ("odraslih: " + U("3", "5") + " · 520 = 312", "Sklepni račun z razmerjem."),
        ("312 · 1,5c + 520c = 9880", "c je cena otroške vstopnice."),
        ("988c = 9880  ⇒  c = 10", ""),
        ("!vstopnica za odraslega je stala 15 evrov", ""),
    ],
)

n12 = naloga(
    12, "funkcije", 6,
    r"Izračunaj limite.<br>"
    r"12.1. \(\displaystyle\lim_{x \to 5} \frac{x^2 - 25}{x^2 - 2x - 15}\) (2 točki) &nbsp; "
    r"12.2. \(\displaystyle\lim_{x \to 0} \frac{\sin 4x}{3x}\) (2 točki) &nbsp; "
    r"12.3. \(\displaystyle\lim_{x \to 9} \frac{\sqrt{x} - 3}{x - 9}\) (2 točki)",
    r"12.1. \(\frac{5}{4}\) &nbsp; 12.2. \(\frac{4}{3}\) &nbsp; 12.3. \(\frac{1}{6}\)",
    [
        ("!12.1  " + LIM("x → 5") + U("(x − 5)(x + 5)", "(x − 5)(x + 3)") + " = " + U("10", "8") + " = " + U("5", "4"), "Razstavimo in okrajšamo faktor x − 5."),
        ("!12.2  " + LIM("x → 0") + U("4", "3") + " · " + U("sin 4x", "4x") + " = " + U("4", "3"), "Znana limita: sin t / t → 1."),
        ("!12.3  " + LIM("x → 9") + U(K("x") + " − 3", "(" + K("x") + " − 3)(" + K("x") + " + 3)") + " = " + U("1", "6"),
         "x − 9 razstavimo kot razliko kvadratov."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven)
v1 = naloga(
    1, ["geometrijski_liki_telesa", "integralski_racun"], 13,
    r"Reši naloge o vrteninah. Rezultati naj bodo točni.<br>"
    r"1.1. Pravokotnik s stranicama \(a = 6\) in \(b = 2\) zavrtimo okrog stranice \(a\). Izračunaj površino in prostornino nastalega telesa. (3 točke)<br>"
    r"1.2. Trikotnik s stranicami \(a = 15\), \(b = 13\) in \(c = 14\) zavrtimo okrog stranice \(c\). Izračunaj površino vrtenine. (6 točk)<br>"
    r"1.3. Krivuljo \(y = \sqrt{9 - x^2}\) na intervalu \([0, 3]\) zavrtimo okrog abscisne osi. Izračunaj prostornino vrtenine. (4 točke)",
    r"1.1. \(P = 32\pi\), \(V = 24\pi\) &nbsp; 1.2. \(336\pi\) &nbsp; 1.3. \(18\pi\)",
    [
        ("valj: r = 2, v = 6", "Pri vrtenju okrog stranice a nastane valj."),
        ("!P = 2πr<sup>2</sup> + 2πrv = 8π + 24π = 32π,  V = πr<sup>2</sup>v = 24π", "Površina in prostornina valja."),
        ("s = 21,  S = " + K("21 · 6 · 8 · 7") + " = 84", "Heronov obrazec."),
        ("v<sub>c</sub> = " + U("2S", "c") + " = 12", "Višina na stranico c je polmer osnovne ploskve obeh stožcev."),
        ("P = πrb + πra = π · 12 · (13 + 15)", "Vrtenina sta dva stožca s skupno osnovno ploskvijo; seštejemo plašča (s = a in s = b)."),
        ("!1.2  P = 336π", ""),
        ("V = π" + INT("3", "0") + "(9 − x<sup>2</sup>) dx = π(9x − " + U("x<sup>3</sup>", "3") + ")" + MEJA("3", "0"), "Prostornina vrtenine: V = π∫ y² dx."),
        ("!1.3  V = π(27 − 9) = 18π", "Nastane polkrogla s polmerom 3."),
    ],
    snov="/views/matematika/snov/integralski_racun/integralski_racun_razlaga.html",
)

def f_v2(x):
    return (x - 2) / (x + 2)

v2 = naloga(
    2, ["funkcije", "diferencialni_racun", "integralski_racun"], 14,
    r"Obvezna naloga. Dana je racionalna funkcija \(f(x) = \dfrac{x - 2}{x + 2}\).<br>"
    r"2.1. Nariši graf funkcije \(f\). Zapiši predpis inverzne funkcije \(f^{-1}\) in njeno definicijsko območje. (4 točke)<br>"
    r"2.2. Premica \(y = 4x + n\) seka graf funkcije \(f\). Dokaži, da abscisi presečišč zadoščata enačbi \(4x^2 + (n + 7)x + 2n + 2 = 0\). (2 točki)<br>"
    r"2.3. Za katere \(n\) je premica \(y = 4x + n\) tangenta na graf funkcije \(f\)? (3 točke)<br>"
    r"2.4. Na sliki je ena od krivulj \(y = |f(x)|\), \(y = f(|x|)\), \(y = f(-x)\), \(y = -f(x)\). Izberi pravo enačbo in izračunaj ploščino lika, "
    r"ki ga krivulja oklepa z abscisno osjo. Rezultat naj bo točen. (5 točk)"
    + graf([(lambda x: f_v2(abs(x)), MODRA)], (-7, 7), (-2, 2), sirina=380, visina=180),
    r"2.1. \(f^{-1}(x) = \frac{2x + 2}{1 - x}\), \(D = \mathbb{R} \setminus \{1\}\) &nbsp; 2.3. \(n = 1\) ali \(n = 17\) &nbsp; "
    r"2.4. \(y = f(|x|)\), \(8\ln 2 - 4\)",
    [
        ("@slika", graf([(f_v2, MODRA)], (-8, 6), (-5, 7), tocke=[(2, 0, ""), (0, -1, "")], sirina=320, visina=290)),
        ("ničla x = 2, začetna vrednost −1, pol x = −2, asimptota y = 1", "Racionalna funkcija."),
        ("y(x + 2) = x − 2  ⇒  x(y − 1) = −2 − 2y", "Inverzno funkcijo dobimo tako, da izrazimo x in zamenjamo vlogi spremenljivk."),
        ("!2.1  f<sup>−1</sup>(x) = " + U("2x + 2", "1 − x") + ",  D = ℝ \\ {1}", "Definicijsko območje inverzne funkcije je zaloga vrednosti funkcije f."),
        ("x − 2 = (4x + n)(x + 2) = 4x<sup>2</sup> + 8x + nx + 2n", "Izenačimo in pomnožimo z x + 2 ≠ 0."),
        ("!2.2  4x<sup>2</sup> + (n + 7)x + 2n + 2 = 0", ""),
        ("D = (n + 7)<sup>2</sup> − 16(2n + 2) = n<sup>2</sup> − 18n + 17 = 0", "Tangenta ima z grafom eno skupno točko: diskriminanta je 0."),
        ("!2.3  n = 1 (dotikališče (−1, −3)) ali n = 17 (dotikališče (−3, 5))", ""),
        ("!y = f(|x|)", "Krivulja je simetrična glede na os y in ima ničli ±2."),
        ("p = 2" + INT("2", "0") + U("2 − x", "x + 2") + " dx = 2" + INT("2", "0") + "(" + U("4", "x + 2") + " − 1) dx", "Na [−2, 2] je krivulja pod osjo x; upoštevamo simetrijo."),
        ("p = 2(4 ln(x + 2) − x)" + MEJA("2", "0") + " = 2(4 ln 4 − 2 − 4 ln 2)", "Integral 1/x je ln|x|."),
        ("!2.4  p = 8 ln 2 − 4 ≈ 1,545", ""),
    ],
    snov=FUN + "racionalna_razlaga.html",
)

v3 = naloga(
    3, ["kombinatorika", "verjetnostni_racun"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). V posodi je \(12\) kroglic: \(6\) rdečih, \(4\) modre in \(2\) beli.<br>"
    r"3.1. Hkrati izvlečemo \(4\) kroglice. Izračunaj verjetnosti dogodkov: \(A\) – vse so rdeče, \(B\) – dve sta rdeči in dve modri, "
    r"\(C\) – vsaj ena je bela. (5 točk)<br>"
    r"3.2. Hkrati izvlečemo \(2\) kroglici. Izračunaj verjetnost, da sta obe modri, če vemo, da je vsaj ena modra. (6 točk)<br>"
    r"3.3. Vse kroglice naključno postavimo v vrsto. Izračunaj verjetnost, da stojijo vse štiri modre skupaj. (2 točki)",
    r"3.1. \(P(A) = \frac{1}{33}\), \(P(B) = \frac{2}{11}\), \(P(C) = \frac{19}{33}\) &nbsp; 3.2. \(\frac{3}{19}\) &nbsp; 3.3. \(\frac{1}{55}\)",
    [
        ("vseh izborov: " + BINOM("12", "4") + " = 495", "Kombinacije brez ponavljanja."),
        ("!P(A) = " + U(BINOM("6", "4"), "495") + " = " + U("15", "495") + " = " + U("1", "33"), ""),
        ("!P(B) = " + U(BINOM("6", "2") + " · " + BINOM("4", "2"), "495") + " = " + U("90", "495") + " = " + U("2", "11"), "Pravilo produkta."),
        ("!P(C) = 1 − " + U(BINOM("10", "4"), "495") + " = 1 − " + U("210", "495") + " = " + U("19", "33"), "Nasprotni dogodek: nobena ni bela."),
        ("P(vsaj ena modra) = 1 − " + U(BINOM("8", "2"), BINOM("12", "2")) + " = 1 − " + U("28", "66") + " = " + U("38", "66"), ""),
        ("P(obe modri) = " + U(BINOM("4", "2"), "66") + " = " + U("6", "66"), ""),
        ("!3.2  P = " + U("6/66", "38/66") + " = " + U("3", "19"), "Pogojna verjetnost: P(A | B) = P(A ∩ B) / P(B)."),
        ("modre zasedejo 4 od 12 mest: " + BINOM("12", "4") + " = 495 enako verjetnih razporedov", "Gledamo le, katera mesta zasedejo modre."),
        ("!3.3  P = " + U("9", "495") + " = " + U("1", "55"), "Štiri zaporedna mesta se lahko začnejo na 1., 2., …, 9. mestu."),
    ],
)

v4 = naloga(
    4, ["funkcije", "diferencialni_racun", "zaporedja_vrste"], 13,
    r"Izbirna naloga (rešiš 3. ali 4. nalogo). Dana je funkcija \(f(x) = 3^x\).<br>"
    r"4.1. Reši enačbo \(f(x) + f(2x) = f(x + 2)\). Rezultat naj bo točen. (3 točke)<br>"
    r"4.2. Dokaži, da velja \((f(1) + f'(1)) \cdot \ln 3 = f'(1) + f''(1)\). (3 točke)<br>"
    r"4.3. Izračunaj vsoto \(\sum_{n=1}^{8} f(n) = f(1) + f(2) + \dots + f(8)\). (3 točke)<br>"
    r"4.4. Kdaj konvergira vrsta \(\sum_{n=1}^{\infty} f(nx)\)? Izračunaj \(x\), pri katerem je vsota vrste enaka \(1\). (4 točke)",
    r"4.1. \(x = \log_3 8\) &nbsp; 4.3. \(9840\) &nbsp; 4.4. za \(x < 0\); \(x = -\log_3 2\)",
    [
        ("3<sup>x</sup> + 9<sup>x</sup> = 9 · 3<sup>x</sup>;  t = 3<sup>x</sup> > 0:  t<sup>2</sup> − 8t = 0", "Uvedemo novo neznanko; 9ˣ = (3ˣ)²."),
        ("!4.1  t = 8  ⇒  x = log<sub>3</sub> 8", "t = 0 ni mogoče, ker je 3ˣ > 0."),
        ("f '(x) = 3<sup>x</sup> ln 3,  f ''(x) = 3<sup>x</sup> ln<sup>2</sup> 3", "Odvod eksponentne funkcije."),
        ("!4.2  (3 + 3 ln 3) ln 3 = 3 ln 3 + 3 ln<sup>2</sup> 3 = f '(1) + f ''(1)", ""),
        ("!4.3  3 · " + U("3<sup>8</sup> − 1", "3 − 1") + " = " + U("3 · 6560", "2") + " = 9840", "Vsota členov geometrijskega zaporedja z a₁ = 3 in q = 3."),
        ("vrsta je geometrijska s kvocientom q = 3<sup>x</sup>", "f(nx) = (3ˣ)ⁿ."),
        ("konvergira za |q| < 1:  3<sup>x</sup> < 1  ⇒  x < 0", "Geometrijska vrsta."),
        (U("3<sup>x</sup>", "1 − 3<sup>x</sup>") + " = 1  ⇒  3<sup>x</sup> = " + U("1", "2"), "Vsota geometrijske vrste a₁ / (1 − q)."),
        ("!4.4  x = −log<sub>3</sub> 2", ""),
    ],
    snov=FUN + "eksponentna_razlaga.html",
)

POLA2 = [v1, v2, v3, v4]
