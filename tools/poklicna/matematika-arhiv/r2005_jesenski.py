# Jesenski rok 2005 (uradna pola RIC P052-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2005, "jesenski", "ponedeljek, 29. avgust 2005"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "realna_stevila_koreni", 4,
    r"Izračunaj natančno vrednost izraza \(\dfrac{4}{\sqrt{5} - 1} - \sqrt{5}\).",
    r"\(1\)",
    [
        (U("4", K("5") + " − 1") + " · " + U(K("5") + " + 1", K("5") + " + 1") + " = " + U("4(" + K("5") + " + 1)", "5 − 1") + " = " + K("5") + " + 1", "Racionaliziramo imenovalec.", "koreni"),
        ("!" + K("5") + " + 1 − " + K("5") + " = 1", ""),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Izraz \((3x - 1)^2 - 5x(x - 1) - 1\) skrči in rezultat razstavi.",
    r"\(x(4x - 1)\)",
    [
        ("9x<sup>2</sup> − 6x + 1 − 5x<sup>2</sup> + 5x − 1", ""),
        ("= 4x<sup>2</sup> − x", ""),
        ("!x(4x − 1)", "Izpostavimo x."),
    ],
)

a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"V pravokotnem trikotniku \(ABC\) s pravim kotom pri \(C\) meri kateta \(b = 12{,}4\) m, kot \(\alpha = 36^\circ 40'\). Izračunaj ploščino trikotnika.",
    r"\(S \approx 57{,}24\ \mathrm{m^2}\)",
    [
        ("tan α = " + U("a", "b") + "  ⇒  a = 12,4 · tan 36° 40′ ≈ 9,23 m", "Kateta a leži nasproti kota α, b je priležna.", "kotne"),
        ("!S = " + U("a · b", "2") + " ≈ " + U("9,23 · 12,4", "2") + " ≈ 57,24 m<sup>2</sup>", "", "ploscine"),
    ],
)


def steber():
    x, y, w, h, dx, dy = 60, 50, 45, 150, 30, -20
    t = [f'<path d="M {x} {y} h {w} v {h} h {-w} Z" fill="{MODRA}" fill-opacity="0.15" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y} l {dx} {dy} h {w} l {-dx} {-dy}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x + w} {y} l {dx} {dy} v {h} l {-dx} {-dy} Z" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.3"/>',
         f'<path d="M {x} {y + h} l {dx} {dy} h {w} M {x + dx} {y + h + dy} v {-h}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>',
         f'<line x1="10" y1="{y + dy / 2}" x2="210" y2="{y + dy / 2}" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="2 3"/>',
         f'<line x1="10" y1="{y + h + dy / 2}" x2="210" y2="{y + h + dy / 2}" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="2 3"/>',
         napis(x - 5, y + h / 2, "2,80 m", 11, sidro="end"), napis(x + w / 2, y + h + 15, "40 cm", 10), napis(x + w + dx / 2 + 6, y + h + dy / 2 + 12, "60 cm", 10, sidro="start")]
    return svg(220, 220, "".join(t), opis="Steber med stropom in tlemi")


a4 = naloga(
    "A4", "povrsine_prostornine", 4,
    r"Steber v obliki kvadra je vpet v strop in tla sobe. Obložili ga bomo z lesenim opažem. Po podatkih na skici izračunaj, koliko kvadratnih metrov opaža potrebujemo." + steber(),
    r"\(5{,}6\ \mathrm{m^2}\)",
    [
        (None, "Oblagamo le štiri stranske ploskve, ker sta osnovni ploskvi na stropu in tleh."),
        ("obseg prečnega prereza: 2 · (0,4 + 0,6) = 2 m", ""),
        ("!pl = 2 m · 2,8 m = 5,6 m<sup>2</sup>", "", "telesa"),
    ],
)

a5 = naloga(
    "A5", "statistika_pm", 4,
    r"Osem planincev je pred turo stehtalo nahrbtnike. Trije so tehtali po \(14\) kg, dva po \(11\) kg, dva po \(16\) kg in eden \(20\) kg. Kolikšna je povprečna masa nahrbtnika? Koliko odstotkov skupne mase predstavlja najtežji nahrbtnik?",
    r"\(14{,}5\) kg; \(\approx 17{,}24\,\%\)",
    [
        ("skupaj: 3 · 14 + 2 · 11 + 2 · 16 + 20 = 116 kg", "", "statistika"),
        ("!x̄ = 116 : 8 = 14,5 kg", ""),
        ("!" + U("20", "116") + " · 100 % ≈ 17,24 %", "", "odstotki"),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 5,
    r"Reši enačbi: a) \(2^{x + 1} - 2^{x - 1} = 24\) &nbsp; b) \(\log_{\frac{1}{3}} x = -2\).",
    r"a) \(x = 4\) &nbsp; b) \(x = 9\)",
    [
        "## a)",
        ("2<sup>x</sup> · (2 − " + U("1", "2") + ") = 24  ⇒  " + U("3", "2") + " · 2<sup>x</sup> = 24", "Izpostavimo 2ˣ.", "eksponentna"),
        ("2<sup>x</sup> = 16 = 2<sup>4</sup>", ""),
        ("!x = 4", ""),
        "## b)",
        ("x = (" + U("1", "3") + ")<sup>−2</sup> = 3<sup>2</sup>", "", "logaritem"),
        ("!x = 9", ""),
    ],
)

FA7 = lambda x: -x * x + 2 * x + 3

a7 = naloga(
    "A7", "kvadratna_funkcija", 5,
    r"Zapiši enačbo kvadratne funkcije, katere graf je na sliki."
    + graf([(FA7, MODRA)], (-1.8, 3.8), (-4, 5), [(-1, 0, ""), (3, 0, ""), (0, 3, ""), (1, 4, "")], sirina=230, visina=330),
    r"\(f(x) = -x^2 + 2x + 3\)",
    [
        ("ničli: x<sub>1</sub> = −1,  x<sub>2</sub> = 3;  presečišče z osjo y: (0, 3)", "Preberemo z grafa."),
        ("f(x) = a(x + 1)(x − 3)", "Ničelna oblika.", "kvadratna"),
        ("f(0) = −3a = 3  ⇒  a = −1", ""),
        ("!f(x) = −(x + 1)(x − 3) = −x<sup>2</sup> + 2x + 3", "Preverimo teme: T(1, 4) se ujema s sliko."),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Oče je za šopek iz \(12\) tulipanov in \(5\) vrtnic plačal \(36{,}75\) EUR. Enak znesek bi plačal za \(7\) tulipanov in \(7\) vrtnic. Izračunaj ceno tulipana in ceno vrtnice.",
    r"tulipan \(1{,}50\) EUR, vrtnica \(3{,}75\) EUR",
    [
        ("12t + 5r = 36,75,  7t + 7r = 36,75", "", "sistem"),
        ("t + r = 5,25", "Drugo enačbo delimo s 7."),
        ("12t + 5(5,25 − t) = 36,75  ⇒  7t = 10,50", ""),
        ("!t = 1,50 EUR,  r = 3,75 EUR", ""),
    ],
)

a9 = naloga(
    "A9", "zaporedja_pm", 5,
    r"Izračunaj vsoto členov končnega aritmetičnega zaporedja \(90, 83, 76, \ldots, -50\).",
    r"\(420\)",
    [
        ("d = −7", "", "aritmeticno"),
        ("−50 = 90 + (n − 1)(−7)  ⇒  n − 1 = 20  ⇒  n = 21", ""),
        ("!s<sub>21</sub> = " + U("21", "2") + " · (90 + (−50)) = 420", ""),
    ],
)

# ------------------------------------------------------------------ 2. del


def trikotnik_b1(X, Y):
    P = [(-3, 1), (4, 2), (0, 4)]
    pts = " ".join(f"{X(x):.1f},{Y(y):.1f}" for x, y in P)
    t = f'<polygon points="{pts}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="2"/>'
    for (x, y), n, dx, dy in zip(P, "ABC", [-14, 6, 6], [-4, 4, -6]):
        t += tocka(X, Y, x, y, n, dx, dy)
    return t


b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Točke \(A(-3, 1)\), \(B(4, 2)\) in \(C(0, 4)\) določajo trikotnik \(ABC\).<br>"
    r"1.1. Natančno nariši trikotnik in izračunaj dolžino najdaljše stranice na dve decimalni mesti. (5 točk)<br>"
    r"1.2. Zapiši enačbo nosilke stranice \(AB\). (5 točk)<br>"
    r"1.3. Na minuto natančno izračunaj kot \(\angle ACB\). (5 točk)",
    r"1.1. \(|AB| = \sqrt{50} \approx 7{,}07\) &nbsp; 1.2. \(y = \frac{1}{7}x + \frac{10}{7}\) &nbsp; 1.3. \(\approx 108^\circ 26'\)",
    [
        "## 1.1",
        ("@slika", mreza((-4, 5), (-1, 5), trikotnik_b1, sirina=300)),
        ("|AB| = " + K("49 + 1") + " = " + K("50") + ",  |BC| = " + K("16 + 4") + " = " + K("20") + ",  |AC| = " + K("9 + 9") + " = " + K("18"), "", "razdalja"),
        ("!najdaljša: |AB| = " + K("50") + " ≈ 7,07", ""),
        "## 1.2",
        ("k = " + U("2 − 1", "4 − (−3)") + " = " + U("1", "7"), "", "premica"),
        ("1 = " + U("1", "7") + " · (−3) + n  ⇒  n = " + U("10", "7"), ""),
        ("!y = " + U("1", "7") + "x + " + U("10", "7") + "  (oziroma x − 7y + 10 = 0)", ""),
        "## 1.3",
        ("cos γ = " + U("a<sup>2</sup> + b<sup>2</sup> − c<sup>2</sup>", "2ab") + " = " + U("20 + 18 − 50", "2 · " + K("20") + " · " + K("18")) + " = " + U("−12", "2" + K("360")) + " ≈ −0,3162", "Kosinusni izrek za kot pri C.", "kosinusni"),
        ("!γ ≈ 108,43° = 108° 26′", ""),
    ],
)

FB2 = lambda x: 3 * x * x / (x * x - 9)

b2 = naloga(
    "B2", "polinomi_racionalna", 15,
    r"Dana je funkcija \(f(x) = \dfrac{3x^2}{x^2 - 9}\).<br>"
    r"2.1. Določi ničlo, pola in vodoravno asimptoto funkcije. (4 točke)<br>"
    r"2.2. Nariši graf funkcije. (6 točk)<br>"
    r"2.3. Za katere \(x\) leži graf funkcije nad premico \(y = -3\)? (5 točk)",
    r"2.1. ničla \(0\) (dvojna), pola \(\pm 3\), \(y = 3\) &nbsp; 2.3. \(x \in (-\infty, -3) \cup \left(-\frac{3\sqrt{2}}{2}, \frac{3\sqrt{2}}{2}\right) \cup (3, \infty)\)",
    [
        "## 2.1",
        ("!ničla x = 0 (dvojna)", "", "racionalna"),
        ("!pola x = −3 in x = 3", "x² − 9 = (x − 3)(x + 3)."),
        ("!asimptota y = 3", "Količnik vodilnih koeficientov 3 : 1."),
        "## 2.2",
        ("f(±1) = −" + U("3", "8") + ",  f(±2) = −" + U("12", "5") + ",  f(±4) = " + U("48", "7"), "Funkcija je soda, graf je simetričen glede na os y."),
        ("@slika", graf([(FB2, MODRA), (lambda x: 3, RDECA), (lambda x: -3, "#1E9E5A")], (-9, 9), (-9, 12), [(0, 0, ""), (2, -2.4, ""), (-2, -2.4, ""), (4, 48 / 7, ""), (-4, 48 / 7, "")], sirina=320, visina=330)),
        "## 2.3",
        (U("3x<sup>2</sup>", "x<sup>2</sup> − 9") + " + 3 > 0  ⇒  " + U("6x<sup>2</sup> − 27", "x<sup>2</sup> − 9") + " > 0", "", "neenacba"),
        ("ničli števca: x = ±" + K("4,5") + " = ±" + U("3" + K("2"), "2") + " ≈ ±2,12;  pola ±3", ""),
        ("!x ∈ (−∞, −3) ∪ (−" + U("3" + K("2"), "2") + ", " + U("3" + K("2"), "2") + ") ∪ (3, ∞)", "Predznak ulomka preverimo na vsakem intervalu."),
    ],
)

MET = [(1, 45), (2, 40), (3, 45), (4, 50), (5, 60), (6, 60)]


def histogram():
    L, B, H = 40, 160, 135
    t = []
    for k in range(0, 71, 10):
        y = B - k / 70 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 230}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    for i, (p, f) in enumerate(MET):
        x = L + 8 + 37 * i
        h = f / 70 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="30" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x + 15, B + 14, str(p), 10))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 230}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 12, "frekvenca", 10, sidro="start") + napis(L + 230, B + 28, "število pik", 10, sidro="end"))
    return svg(285, 195, "".join(t), opis="Histogram metov kocke")


b3 = naloga(
    "B3", "statistika_pm", 15,
    r"Igralno kocko smo vrgli \(300\)-krat in zabeležili: \(45\)-krat 1 piko, \(40\)-krat 2 piki, v \(15\,\%\) metov 3 pike, v šestini metov 4 pike, v \(60\) metih 5 pik, v preostalih metih 6 pik.<br>"
    r"3.1. Kolikokrat so padle 3 pike, kolikokrat 4 in kolikokrat 6 pik? (6 točk)<br>"
    r"3.2. V preglednici prikaži absolutne in relativne frekvence. (4 točke)<br>"
    r"3.3. Rezultate prikaži grafično. (5 točk)",
    r"3.1. \(45\), \(50\), \(60\)",
    [
        "## 3.1",
        ("!3 pike: 0,15 · 300 = 45-krat", "", "odstotki"),
        ("!4 pike: " + U("300", "6") + " = 50-krat", ""),
        ("!6 pik: 300 − 45 − 40 − 45 − 50 − 60 = 60-krat", ""),
        "## 3.2",
        ("@slika", tabela(["pike", "f (absolutna)", "f (relativna)"],
                          [["1", "45", "0,15"], ["2", "40", "≈ 0,133"], ["3", "45", "0,15"], ["4", "50", "≈ 0,167"], ["5", "60", "0,20"], ["6", "60", "0,20"]])),
        (None, "Relativna frekvenca je absolutna frekvenca deljena s 300; vsota relativnih frekvenc je 1."),
        "## 3.3",
        ("@slika", histogram()),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
