# Zimski rok 2006 (uradna pola RIC P063-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2006, "zimski", "sobota, 17. februar 2007"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"Kaj je sestavljeno število? Število \(252\) zapiši kot produkt samih praštevil.",
    r"\(252 = 2^2 \cdot 3^2 \cdot 7\)",
    [
        (None, "Sestavljeno število je naravno število, večje od 1, ki ima poleg 1 in samega sebe še vsaj en delitelj."),
        ("252 = 2 · 126 = 2 · 2 · 63 = 2 · 2 · 3 · 21 = 2 · 2 · 3 · 3 · 7", ""),
        ("!252 = 2<sup>2</sup> · 3<sup>2</sup> · 7", ""),
    ],
)

a2 = naloga(
    "A2", "linearna_funkcija", 4,
    r"Reši enačbo \((x - 3)^2 + (3x - 1)(3x + 1) = 10x(x - 1)\).",
    r"\(x = -2\)",
    [
        ("x<sup>2</sup> − 6x + 9 + 9x<sup>2</sup> − 1 = 10x<sup>2</sup> − 10x", "Kvadrat razlike in razlika kvadratov."),
        ("−6x + 8 = −10x", "Členi z x² se odštejejo."),
        ("!x = −2", ""),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Mama je skuhala \(1\frac{3}{4}\) kg korenja, \(2\frac{1}{2}\) kg graha in \(3\frac{1}{4}\) kg krompirja. Mešano zelenjavo je shranila v vrečke po \(\frac{2}{3}\) kg. Najmanj koliko vrečk je potrebovala?",
    r"\(12\) vrečk",
    [
        ("1" + U("3", "4") + " + 2" + U("1", "2") + " + 3" + U("1", "4") + " = 7" + U("1", "2") + " kg", "Najprej seštejemo cele, nato ulomke: 3/4 + 1/2 + 1/4 = 3/2."),
        (U("15", "2") + " : " + U("2", "3") + " = " + U("15", "2") + " · " + U("3", "2") + " = " + U("45", "4") + " = 11,25", ""),
        ("!12 vrečk", "Enajst vrečk ni dovolj, zato zaokrožimo navzgor."),
    ],
)

a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"Zapiši enačbo premice skozi točki \(A(2, 5)\) in \(B(-1, -4)\).",
    r"\(y = 3x - 1\)",
    [
        ("k = " + U("−4 − 5", "−1 − 2") + " = " + U("−9", "−3") + " = 3", "", "premica"),
        ("5 = 3 · 2 + n  ⇒  n = −1", "Vstavimo točko A."),
        ("!y = 3x − 1", ""),
    ],
)


def lik_a5():
    s, o = 22, 30
    a = 6 * s
    t = [f'<path d="M {o} {o} h {a} v {4 * s} h {-4 * s} v {2 * s} h {-2 * s} Z" fill="{MODRA}" fill-opacity="0.3" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {o + 2 * s} {o + 4 * s} h {4 * s} v {2 * s} h {-4 * s}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(o + a / 2, o - 6, "6 cm", 11), napis(o - 5, o + a / 2 + 4, "6 cm", 11, sidro="end"),
         napis(o + a + 5, o + 2 * s + 4, "4 cm", 11, sidro="start"), napis(o + 4 * s, o + 4 * s - 5, "4 cm", 11)]
    return svg(o + a + 40, o + a + 15, "".join(t), opis="Kvadrat z izrezanim pravokotnikom v vogalu")


a5 = naloga(
    "A5", "obsegi_ploscine", 4,
    r"Po podatkih na skici izračunaj obseg in ploščino osenčenega lika. Iz kvadrata s stranico \(6\) cm je v spodnjem desnem vogalu izrezan pravokotnik \(4\) cm \(\times\) \(2\) cm." + lik_a5(),
    r"\(o = 24\) cm, \(S = 28\ \mathrm{cm^2}\)",
    [
        ("o = 6 + 4 + 4 + 2 + 2 + 6", "Robovi lika: zgoraj 6, desno 4, vodoravno 4, navpično 2, spodaj 2, levo 6."),
        ("!o = 24 cm", "Enako kot obseg kvadrata, ker izrez v vogalu obsega ne spremeni."),
        ("!S = 6<sup>2</sup> − 4 · 2 = 36 − 8 = 28 cm<sup>2</sup>", "", "ploscine"),
    ],
)

FA6 = lambda x: -x * x - 2 * x + 3

a6 = naloga(
    "A6", "kvadratna_funkcija", 5,
    r"Z grafa kvadratne funkcije določi: a) ničli, b) zalogo vrednosti, c) za katere \(x\) je funkcija negativna."
    + graf([(FA6, MODRA)], (-4, 2), (-3, 5), [], sirina=240, visina=320),
    r"a) \(-3\), \(1\) &nbsp; b) \((-\infty, 4]\) &nbsp; c) \(x \in (-\infty, -3) \cup (1, \infty)\)",
    [
        ("!a) x<sub>1</sub> = −3,  x<sub>2</sub> = 1", ""),
        ("teme T(−1, 4)", "Parabola je odprta navzdol; teme leži na sredini med ničlama.", "teme"),
        ("!b) Z<sub>f</sub> = (−∞, 4]", ""),
        ("!c) f(x) < 0 za x ∈ (−∞, −3) ∪ (1, ∞)", "Graf je pod osjo x zunaj intervala med ničlama.", "neenacba"),
    ],
)

a7 = naloga(
    "A7", "kotne_funkcije_pm", 5,
    r"Izračunaj natančno vrednost \(\cos 75^\circ\).",
    r"\(\dfrac{\sqrt{6} - \sqrt{2}}{4}\)",
    [
        ("cos 75° = cos(45° + 30°) = cos 45° cos 30° − sin 45° sin 30°", "", "adicijski"),
        ("= " + U(K("2"), "2") + " · " + U(K("3"), "2") + " − " + U(K("2"), "2") + " · " + U("1", "2"), ""),
        ("!cos 75° = " + U(K("6") + " − " + K("2"), "4"), ""),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"V isti koordinatni sistem nariši graf funkcije \(f(x) = 3^x\) in premico \(x = -2\). Zapiši koordinati presečišča premice in grafa.",
    r"\(P\left(-2, \frac{1}{9}\right)\)",
    [
        ("f(−1) = " + U("1", "3") + ",  f(0) = 1,  f(1) = 3,  f(2) = 9", "", "eksponentna"),
        ("@slika", mreza((-4, 3), (-1, 10), lambda X, Y: krivulja(X, Y, lambda x: 3 ** x, -4, math.log(9.6, 3), MODRA)
                         + f'<line x1="{X(-2):.1f}" y1="{Y(10):.1f}" x2="{X(-2):.1f}" y2="{Y(-1):.1f}" stroke="{RDECA}" stroke-width="2"/>'
                         + tocka(X, Y, -2, 1 / 9, "P", -16, -6) + tocka(X, Y, 0, 1) + tocka(X, Y, 1, 3) + tocka(X, Y, 2, 9), sirina=240)),
        ("!P(−2, " + U("1", "9") + ")", "f(−2) = 3⁻² = 1/9."),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Prvi štirje členi aritmetičnega zaporedja so \(5, 2, -1, -4\). Zapiši splošni člen in izračunaj vsoto prvih \(100\) členov.",
    r"\(a_n = 8 - 3n\); \(s_{100} = -14\,350\)",
    [
        ("d = −3", "", "aritmeticno"),
        ("!a<sub>n</sub> = 5 + (n − 1)(−3) = 8 − 3n", ""),
        ("s<sub>100</sub> = " + U("100", "2") + " · (2 · 5 + 99 · (−3)) = 50 · (−287)", ""),
        ("!s<sub>100</sub> = −14 350", ""),
    ],
)

# ------------------------------------------------------------------ 2. del


def rezervoar():
    x, y, w, h, dx, dy = 48, 60, 150, 70, 50, -35
    t = [f'<path d="M {x} {y} h {w} v {h} h {-w} Z" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y} l {dx} {dy} h {w} l {-dx} {-dy}" fill="{MODRA}" fill-opacity="0.06" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x + w} {y + h} l {dx} {dy} v {-h}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y + h} l {dx} {dy} h {w} M {x + dx} {y + h + dy} v {-h}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(x + w / 2, y + h + 15, "2 m", 11), napis(x + w + dx / 2 + 8, y + h + dy / 2 + 6, "1,2 m", 11, sidro="start"), napis(x - 5, y + h / 2 + 4, "1,5 m", 11, sidro="end")]
    return svg(285, 150, "".join(t), opis="Rezervoar v obliki kvadra")


b1 = naloga(
    "B1", "ulomki_odstotki", 15,
    r"Leta 2019 je liter kurilnega olja stal \(1{,}02\) EUR, leta 2023 pa \(0{,}87\) EUR (izmišljeni podatki).<br>"
    r"1.1. Za koliko odstotkov je bila cena leta 2023 nižja od cene leta 2019? (5 točk)<br>"
    r"1.2. Koliko evrov je družina leta 2019 plačala za poln rezervoar v obliki kvadra z merami \(2\) m, \(1{,}2\) m in \(1{,}5\) m? Nariši skico rezervoarja. (5 točk)<br>"
    r"1.3. Ali zadošča \(2600\) litrov olja za ogrevanje od 1. oktobra do vključno 15. marca naslednjega leta (ne prestopno leto), če je dnevna poraba \(16\) litrov? (5 točk)",
    r"1.1. \(\approx 14{,}71\,\%\) &nbsp; 1.2. \(3672\) EUR &nbsp; 1.3. ne, potrebnih je \(2656\) l",
    [
        "## 1.1",
        ("p = " + U("1,02 − 0,87", "1,02") + " · 100 %", "Primerjamo s ceno leta 2019.", "odstotki"),
        ("!p ≈ 14,71 %", ""),
        "## 1.2",
        ("@slika", rezervoar()),
        ("V = 2 · 1,2 · 1,5 = 3,6 m<sup>3</sup> = 3600 l", "1 m³ = 1000 l.", "telesa"),
        ("!3600 · 1,02 = 3672 EUR", ""),
        "## 1.3",
        ("31 + 30 + 31 + 31 + 28 + 15 = 166 dni", "Oktober, november, december, januar, februar in 15 dni marca."),
        ("166 · 16 = 2656 l", ""),
        ("!ne zadošča, manjka 56 l", ""),
    ],
)


def trikotnik_b2():
    s = 11
    A, B = (20, 150), (20 + 14 * s, 150)
    an = math.radians(180 - 110)
    C = (B[0] + 9 * s * math.cos(an), B[1] - 9 * s * math.sin(an))
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]:.1f},{C[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {B[0] - 16} {B[1]} A 16 16 0 0 1 {B[0] + 16 * math.cos(an):.1f} {B[1] - 16 * math.sin(an):.1f}" fill="none" stroke="{RDECA}"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0] + 6, C[1] - 4, "C"),
         napis((A[0] + B[0]) / 2, A[1] + 15, "14 cm", 10), napis((B[0] + C[0]) / 2 + 6, (B[1] + C[1]) / 2 + 4, "9 cm", 10, sidro="start"),
         napis(B[0] - 4, B[1] - 20, "110°", 10, RDECA, "end"), napis(48, 145, "α", 12)]
    return svg(245, 168, "".join(t), opis="Trikotnik ABC s topim kotom pri B")


b2 = naloga(
    "B2", "trikotnik_kotne", 15,
    r"Na skici je trikotnik \(ABC\) z \(|AB| = 14\) cm, \(|BC| = 9\) cm in \(\beta = 110^\circ\)." + trikotnik_b2()
    + r"2.1. Izračunaj dolžino stranice \(b = |AC|\) in kot \(\alpha\) v stopinjah in minutah. (6 točk)<br>"
    r"2.2. Izračunaj ploščino trikotnika na \(\mathrm{cm^2}\) natančno. (4 točke)<br>"
    r"2.3. Izračunaj površino in prostornino prizme, katere osnovna ploskev je dani trikotnik, višina pa \(1\) m. (5 točk)",
    r"2.1. \(b \approx 19{,}06\) cm, \(\alpha \approx 26^\circ 21'\) &nbsp; 2.2. \(S \approx 59\ \mathrm{cm^2}\) &nbsp; 2.3. \(P \approx 4324\ \mathrm{cm^2}\), \(V \approx 5920\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("b<sup>2</sup> = 9<sup>2</sup> + 14<sup>2</sup> − 2 · 9 · 14 · cos 110° ≈ 277 + 86,19 = 363,19", "cos 110° je negativen.", "kosinusni"),
        ("!b ≈ 19,06 cm", ""),
        ("sin α = " + U("a · sin β", "b") + " = " + U("9 · sin 110°", "19,06") + " ≈ 0,4438", "", "sinusni"),
        ("!α ≈ 26,34° = 26° 21′", "α je oster, ker je β top."),
        "## 2.2",
        ("S = " + U("1", "2") + " · 9 · 14 · sin 110° ≈ 59,20 cm<sup>2</sup>", "", "ploscine"),
        ("!S ≈ 59 cm<sup>2</sup>", ""),
        "## 2.3",
        ("v = 1 m = 100 cm", ""),
        ("!P = 2S + (a + b + c) · v ≈ 118,4 + 42,06 · 100 ≈ 4324 cm<sup>2</sup>", "", "telesa"),
        ("!V = S · v ≈ 59,2 · 100 = 5920 cm<sup>3</sup> = 5,92 dm<sup>3</sup>", ""),
    ],
)

STREL = [(10, 6), (9, 8), (7, 14), (5, 6), (3, 4), (0, 2)]

b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Na strelskem tekmovanju je sodelovalo \(40\) strelcev. Izidi po prvem poskusu so v preglednici (izmišljeni podatki)."
    + tabela(["zadetki (točke)", "število strelcev"], [[str(x), str(f)] for x, f in STREL])
    + r"3.1. Izračunaj povprečno število točk v tem poskusu. (5 točk)<br>"
    r"3.2. Koliko strelcev je doseglo podpovprečni izid? Koliko odstotkov strelcev je doseglo nadpovprečni izid? (5 točk)<br>"
    r"3.3. Izračunaj standardni odklon dosežkov. (5 točk)",
    r"3.1. \(6{,}8\) &nbsp; 3.2. \(12\) strelcev; \(70\,\%\) &nbsp; 3.3. \(\sigma = 2{,}6\)",
    [
        "## 3.1",
        ("x̄ = " + U("10 · 6 + 9 · 8 + 7 · 14 + 5 · 6 + 3 · 4 + 0 · 2", "40") + " = " + U("272", "40"), "", "statistika"),
        ("!x̄ = 6,8 točke", ""),
        "## 3.2",
        ("!podpovprečno (5, 3 ali 0 točk): 6 + 4 + 2 = 12 strelcev", ""),
        ("nadpovprečno (10, 9 ali 7 točk): 6 + 8 + 14 = 28 strelcev", ""),
        ("!" + U("28", "40") + " · 100 % = 70 %", "", "odstotki"),
        "## 3.3",
        ("σ<sup>2</sup> = " + U("6 · 3,2<sup>2</sup> + 8 · 2,2<sup>2</sup> + 14 · 0,2<sup>2</sup> + 6 · 1,8<sup>2</sup> + 4 · 3,8<sup>2</sup> + 2 · 6,8<sup>2</sup>", "40"), "Odkloni od povprečja: 3,2; 2,2; 0,2; −1,8; −3,8; −6,8."),
        ("σ<sup>2</sup> = " + U("61,44 + 38,72 + 0,56 + 19,44 + 57,76 + 92,48", "40") + " = " + U("270,4", "40") + " = 6,76", ""),
        ("!σ = " + K("6,76") + " = 2,6", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
