# Spomladanski rok 2018 (uradna pola RIC P181-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2018, "spomladanski", "sobota, 9. junij 2018"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"Na igrišču je \(34\) otrok. Deklic je \(8\) manj kot dečkov. Koliko deklic in koliko dečkov je na igrišču?",
    r"\(21\) dečkov in \(13\) deklic",
    [
        ("x + (x − 8) = 34", "x je število dečkov."),
        ("2x = 42  ⇒  x = 21", ""),
        ("!21 dečkov, 13 deklic", ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Brez računala natančno izračunaj vrednost izraza \(\dfrac{1 + \frac{3}{4}}{2 - \frac{5}{6}}\).",
    r"\(\frac{3}{2}\)",
    [
        ("1 + " + U("3", "4") + " = " + U("7", "4") + ",  2 − " + U("5", "6") + " = " + U("7", "6"), ""),
        (U("7", "4") + " : " + U("7", "6") + " = " + U("7", "4") + " · " + U("6", "7"), "Dvojni ulomek je deljenje ulomkov."),
        ("!= " + U("6", "4") + " = " + U("3", "2"), ""),
    ],
)

P3 = lambda x: (x + 2) * (x - 1) * (x - 3) / 2

a3 = naloga(
    "A3", "odvod_pm", 4,
    r"Na sliki je graf polinoma \(p\) tretje stopnje. Med izraza vstavi enega od znakov \(<\), \(>\) ali \(=\), da bodo trditve pravilne."
    + graf([(P3, MODRA)], (-3, 4), (-5, 6), [(-1, 4, ""), (0, 3, ""), (2, -2, "")], sirina=260, visina=320)
    + r"a) \(p(-1) \ \square\ p(2)\) &nbsp; b) \(p(0) \ \square\ 3\) &nbsp; c) \(p'(2) \ \square\ 0\) &nbsp; d) \(p'(0) \ \square\ p'(3)\)",
    r"a) \(>\) &nbsp; b) \(=\) &nbsp; c) \(<\) &nbsp; d) \(<\)",
    [
        ("!a) p(−1) > p(2)", "S slike: p(−1) = 4, p(2) = −2."),
        ("!b) p(0) = 3", "Graf seka os y v točki (0, 3)."),
        ("!c) p '(2) < 0", "Pri x = 2 graf pada."),
        ("!d) p '(0) < p '(3)", "Pri x = 0 graf pada (odvod je negativen), pri x = 3 strmo narašča (odvod je pozitiven)."),
    ],
)

a4 = naloga(
    "A4", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(\log_{\frac{2}{3}}(x + 1) = -2\).",
    r"\(x = \frac{5}{4}\)",
    [
        ("x + 1 = (" + U("2", "3") + ")<sup>−2</sup>", "Definicija logaritma.", "logaritem"),
        ("x + 1 = (" + U("3", "2") + ")<sup>2</sup> = " + U("9", "4"), ""),
        ("!x = " + U("5", "4"), "Pogoj x + 1 > 0 je izpolnjen."),
    ],
)

a5 = naloga(
    "A5", "kombinatorika_verjetnost", 4,
    r"V škatli je \(15\) kroglic, oštevilčenih od \(1\) do \(15\). Naključno izberemo eno. Kolikšna je verjetnost, da je na njej večkratnik števila \(4\)?",
    r"\(P = \frac{1}{5}\)",
    [
        ("ugodni izidi: 4, 8, 12  ⇒  m = 3", ""),
        ("!P = " + U("3", "15") + " = " + U("1", "5"), "", "verjetnost"),
    ],
)

CASI = ["21:45", "23:10", "24:35", "25:05", "26:20", "29:40", "38:11"]

a6 = naloga(
    "A6", "statistika_pm", 4,
    r"Na rekreativnem teku so udeleženci dosegli čase: " + ", ".join(CASI) + r" (zapis 21:45 pomeni 21 min 45 s). Izračunaj aritmetično sredino "
    r"časov vseh udeležencev. Rezultat zapiši v minutah in sekundah.",
    r"\(26\) min \(58\) s",
    [
        ("v sekundah: 1305, 1390, 1475, 1505, 1580, 1780, 2291", "Minute pomnožimo s 60 in prištejemo sekunde."),
        ("vsota = 11 326 s", ""),
        ("x̄ = 11 326 : 7 = 1618 s", "", "statistika"),
        ("!x̄ = 26 min 58 s", "1618 = 26 · 60 + 58."),
    ],
)

a7 = naloga(
    "A7", "ulomki_odstotki", 4,
    r"Na lončku \(150\)-gramskega jogurta so podatki o hranilni vrednosti v \(100\) g izdelka:"
    + tabela(["hranilna vrednost", "v 100 g"], [["energijska vrednost", "268 kJ / 64 kcal"], ["maščobe", "3,2 g"], ["ogljikovi hidrati", "4,7 g"],
                                                ["beljakovine", "3,4 g"], ["sol", "0,10 g"]])
    + r"Koliko odstotkov in koliko gramov maščob je v \(150\) g jogurta?",
    r"\(3{,}2\,\%\); \(4{,}8\) g",
    [
        ("!delež: " + U("3,2 g", "100 g") + " = 3,2 %", "Delež je enak v vsaki količini jogurta.", "odstotki"),
        ("!masa: 0,032 · 150 g = 4,8 g", ""),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"V preglednici so podatki za linearno funkcijo \(f\). Zapiši predpis funkcije \(f\) in dopolni preglednico."
    + tabela([r"\(x\)", r"\(2\)", r"\(-1\)", "", r"\(\frac{1}{3}\)", r"\(4\)"], [[r"\(f(x)\)", r"\(4\)", r"\(-5\)", r"\(-11\)", "", ""]]),
    r"\(f(x) = 3x - 2\); \(x = -3\), \(f\left(\frac{1}{3}\right) = -1\), \(f(4) = 10\)",
    [
        ("k = " + U("4 − (−5)", "2 − (−1)") + " = 3", "Smerni koeficient iz dveh znanih točk.", "premica"),
        ("4 = 3 · 2 + n  ⇒  n = −2", ""),
        ("!f(x) = 3x − 2", ""),
        ("!3x − 2 = −11  ⇒  x = −3", ""),
        ("!f(" + U("1", "3") + ") = −1,  f(4) = 10", ""),
    ],
)

a9 = naloga(
    "A9", "povrsine_prostornine", 5,
    r"Ploščina osnovne ploskve pravilne tristrane prizme je \(25\sqrt{3}\ \mathrm{cm^2}\), višina prizme pa \(8\) cm. Na dve decimalki natančno "
    r"izračunaj površino prizme.",
    r"\(P \approx 326{,}60\ \mathrm{cm^2}\)",
    [
        (U("a<sup>2</sup>" + K("3"), "4") + " = 25" + K("3") + "  ⇒  a<sup>2</sup> = 100  ⇒  a = 10 cm", "Osnovna ploskev je enakostranični trikotnik."),
        ("P = 2 · 25" + K("3") + " + 3 · 10 · 8 = 50" + K("3") + " + 240", "Dve osnovni ploskvi in tri stranske ploskve (pravokotniki).", "telesa"),
        ("!P ≈ 326,60 cm<sup>2</sup>", ""),
    ],
)


def lik_a10():
    k = 22
    x0, y0 = 30, 240
    a = 6 * k
    leg = 6 * math.tan(math.radians(30)) * k
    t = [f'<path d="M {x0} {y0 - a} L {x0} {y0} L {x0 + a} {y0} L {x0 + a + leg:.1f} {y0 - a} L {x0 + a} {y0 - a} A {a / 2} {a / 2} 0 0 0 {x0} {y0 - a} Z" '
         f'fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.8"/>',
         f'<line x1="{x0}" y1="{y0 - a}" x2="{x0 + a}" y2="{y0 - a}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="{x0 + a}" y1="{y0 - a}" x2="{x0 + a}" y2="{y0}" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<rect x="{x0 + a}" y="{y0 - a}" width="8" height="8" fill="none" stroke="currentColor"/>',
         napis(x0 + a / 2, y0 + 15, "6 cm", 11), napis(x0 - 6, y0 - a / 2, "6 cm", 11, sidro="end"), napis(x0 + a / 2, y0 - a + 14, "6 cm", 11),
         napis(x0 + a - 6, y0 - a / 2, "6 cm", 11, sidro="end"), napis(x0 + a + 10, y0 - 22, "30°", 10)]
    return svg(250, 255, "".join(t), opis="Lik iz kvadrata, polkroga in pravokotnega trikotnika")

a10 = naloga(
    "A10", "obsegi_ploscine", 6,
    r"Izračunaj obseg lika na sliki. Lik je sestavljen iz kvadrata s stranico \(6\) cm, polkroga in pravokotnega trikotnika." + lik_a10(),
    r"\(o \approx 31{,}82\) cm",
    [
        ("polkrožni lok: " + U("2π · 3", "2") + " = 3π ≈ 9,42 cm", "Premer polkroga je stranica kvadrata.", "krog"),
        ("kateta ob zgornjem robu: 6 · tan 30° ≈ 3,46 cm", "Kot 30° leži ob navpični kateti dolžine 6 cm.", "kotne"),
        ("hipotenuza: " + U("6", "cos 30°") + " ≈ 6,93 cm", ""),
        ("o = 6 + 6 + 3π + 3,46 + 6,93", "Levi in spodnji rob kvadrata, lok, kateta in hipotenuza."),
        ("!o ≈ 31,82 cm", ""),
    ],
)

a11 = naloga(
    "A11", "zaporedja_pm", 6,
    r"Znana sta drugi in četrti člen aritmetičnega zaporedja: \(\square, 7, \square, 15, \dots\) Izračunaj diferenco, dopolni prazni okenci in "
    r"izračunaj vsoto prvih \(20\) členov.",
    r"\(d = 4\); \(3\) in \(11\); \(s_{20} = 820\)",
    [
        ("a<sub>4</sub> − a<sub>2</sub> = 2d = 8  ⇒  d = 4", ""),
        ("!a<sub>1</sub> = 3,  a<sub>3</sub> = 11", ""),
        ("!s<sub>20</sub> = " + U("20", "2") + " · (2 · 3 + 19 · 4) = 10 · 82 = 820", "", "aritmeticno"),
    ],
)

# ------------------------------------------------------------------ 2. del
F1 = lambda x: 0.5 * (x + 1) ** 2 - 2

b1 = naloga(
    "B1", ["kvadratna_funkcija", "odvod_pm"], 10,
    r"Na sliki je graf kvadratne funkcije \(f(x) = \frac{1}{2}(x + 1)^2 - 2\)."
    + graf([(F1, MODRA)], (-5, 4), (-3, 6), [(2, 2.5, "A")], sirina=280, visina=290)
    + r"1.1. Zapiši teme grafa, začetno vrednost funkcije in odprti interval, na katerem funkcija pada. (3 točke)<br>"
    r"1.2. Izračunaj koordinato \(y\) točke \(A(2, y)\). V točki \(A\) skiciraj tangento in zapiši njeno enačbo. (7 točk)",
    r"1.1. \(T(-1, -2)\), \(f(0) = -\frac{3}{2}\), pada na \((-\infty, -1)\) &nbsp; 1.2. \(y = \frac{5}{2}\), \(t: y = 3x - \frac{7}{2}\)",
    [
        "## 1.1",
        ("!T(−1, −2)", "Temenska oblika f(x) = a(x − p)² + q."),
        ("!f(0) = " + U("1", "2") + " − 2 = −" + U("3", "2"), ""),
        ("!pada na (−∞, −1)", "Parabola je odprta navzgor; levo od temena pada."),
        "## 1.2",
        ("!y = f(2) = " + U("9", "2") + " − 2 = " + U("5", "2"), ""),
        ("f '(x) = x + 1,  k = f '(2) = 3", "", "odvod"),
        ("y − " + U("5", "2") + " = 3(x − 2)", "", "tangenta"),
        ("!t: y = 3x − " + U("7", "2"), ""),
        ("@slika", graf([(F1, MODRA), (lambda x: 3 * x - 3.5, RDECA)], (-5, 4), (-3, 6), [(2, 2.5, "A")], sirina=280, visina=290)),
    ],
)


def valj_b2():
    cx, w, h = 90, 80, 60
    t = [f'<ellipse cx="{cx}" cy="150" rx="{w}" ry="16" fill="none" stroke="currentColor"/>',
         f'<line x1="{cx - w}" y1="150" x2="{cx - w}" y2="{150 - h}" stroke="currentColor"/>',
         f'<line x1="{cx + w}" y1="150" x2="{cx + w}" y2="{150 - h}" stroke="currentColor"/>',
         f'<ellipse cx="{cx}" cy="{150 - h}" rx="{w}" ry="16" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor"/>',
         f'<path d="M {cx - w} {150 - h} A {w} {w} 0 0 1 {cx + w} {150 - h}" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor"/>',
         napis(cx, 182, "d = 8 cm", 11), napis(cx + w + 6, 150 - h / 2, "v = 6 cm", 11, sidro="start")]
    return svg(240, 190, "".join(t), opis="Valj s polkroglo")

b2 = naloga(
    "B2", "povrsine_prostornine", 10,
    r"Valj ima premer \(8\) cm in višino \(6\) cm.<br>"
    r"2.1. Nariši skico osnega preseka valja in izračunaj njegovo ploščino ter dolžino diagonale. (5 točk)<br>"
    r"2.2. Na valj položimo polkroglo (glej sliko). Natančno izračunaj prostornino nastalega telesa. (5 točk)" + valj_b2(),
    r"2.1. \(S = 48\ \mathrm{cm^2}\), \(d = 10\) cm &nbsp; 2.2. \(V = \frac{416\pi}{3}\ \mathrm{cm^3} \approx 435{,}6\ \mathrm{cm^3}\)",
    [
        "## 2.1",
        ("@slika", svg(200, 120, f'<rect x="20" y="20" width="120" height="90" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5"/>'
                                 f'<line x1="20" y1="110" x2="140" y2="20" stroke="{RDECA}" stroke-width="2"/>' + napis(80, 14, "8 cm", 11) + napis(146, 70, "6 cm", 11, sidro="start"),
                       opis="Osni presek valja")),
        ("!S = 8 · 6 = 48 cm<sup>2</sup>", "Osni presek je pravokotnik s stranicama 2r in v."),
        ("!d = " + K("8<sup>2</sup> + 6<sup>2</sup>") + " = 10 cm", "", "pitagora"),
        "## 2.2",
        ("V<sub>valj</sub> = π · 4<sup>2</sup> · 6 = 96π", "", "telesa"),
        ("V<sub>polkrogla</sub> = " + U("1", "2") + " · " + U("4", "3") + "π · 4<sup>3</sup> = " + U("128π", "3"), ""),
        ("!V = 96π + " + U("128π", "3") + " = " + U("416π", "3") + " ≈ 435,6 cm<sup>3</sup>", ""),
    ],
)

b3 = naloga(
    "B3", ["kombinatorika_verjetnost", "ulomki_odstotki"], 10,
    r"Maja plava dvakrat tedensko, v ponedeljek in četrtek. Ana bi prav tako rada plavala dvakrat tedensko.<br>"
    r"3.1. Na koliko načinov lahko Ana izbere dva dneva v tednu? Kolikšna je verjetnost, da bo plavala ravno na isti dan kot Maja, če dneva "
    r"izbere naključno? (5 točk)<br>"
    r"3.2. Vstopnica za en obisk bazena stane \(6{,}80\) €, od vključno \(13.\) obiska naprej pa velja \(15\,\%\) popust na ceno vstopnice. "
    r"Sezonska vstopnica stane \(180\) €. Najmanj kolikokrat mora Ana obiskati bazen, da se ji splača kupiti sezonsko vstopnico? (5 točk)",
    r"3.1. \(21\), \(P = \frac{1}{21}\) &nbsp; 3.2. najmanj \(30\)-krat",
    [
        "## 3.1",
        ("!C<sub>7</sub><sup>2</sup> = " + U("7 · 6", "2") + " = 21", "Vrstni red dni ni pomemben.", "kombinatorika"),
        ("!P = " + U("1", "21"), "Le ena izbira (ponedeljek in četrtek) je ugodna.", "verjetnost"),
        "## 3.2",
        ("prvih 12 obiskov: 12 · 6,80 = 81,60 €", ""),
        ("s popustom: 0,85 · 6,80 = 5,78 € na obisk", "", "odstotki"),
        ("81,60 + 5,78 · (n − 12) > 180  ⇒  n − 12 > 17,02", "Sezonska se splača, ko bi posamezne vstopnice stale več."),
        ("n = 29: 179,86 €;  n = 30: 185,64 €", "Preverimo mejna primera."),
        ("!najmanj 30 obiskov", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
