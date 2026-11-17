# Spomladanski rok 2008 (uradna pola RIC P081-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2008, "spomladanski", "sobota, 7. junij 2008"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "linearna_funkcija", 4,
    r"Reši enačbo \(x - 3(2 - x) = 5(x - 2)\).",
    r"\(x = 4\)",
    [
        ("x − 6 + 3x = 5x − 10", "Odpravimo oklepaje."),
        ("4x − 6 = 5x − 10", ""),
        ("!x = 4", ""),
    ],
)

a2 = naloga(
    "A2", "ulomki_odstotki", 4,
    r"Julija je kolo stalo \(800\) EUR. Avgusta so ga podražili za \(15\,\%\), septembra še za \(5\,\%\), oktobra pa pocenili za \(25\,\%\). Kolikšna je bila cena kolesa po zadnji spremembi?",
    r"\(724{,}50\) EUR",
    [
        ("800 · 1,15 = 920 EUR", "Podražitev za 15 % pomeni množenje z 1,15.", "odstotki"),
        ("920 · 1,05 = 966 EUR", ""),
        ("!966 · 0,75 = 724,50 EUR", "Pocenitev za 25 % pomeni množenje z 0,75."),
    ],
)


def trikotnik_a3():
    A, B, C = (20, 110), (220, 110), (120, 33)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M 105.7 44 A 18 18 0 0 0 134.3 44" fill="none" stroke="{RDECA}"/>',
         napis(A[0] - 8, A[1] + 4, "A"), napis(B[0] + 8, B[1] + 4, "B"), napis(C[0], C[1] - 8, "C"),
         napis(120, 68, "104° 36′", 10, RDECA), napis(50, 106, "α", 12), napis(190, 106, "β", 12)]
    return svg(245, 125, "".join(t), opis="Enakokraki trikotnik ABC")


a3 = naloga(
    "A3", "trikotnik_kotne", 4,
    r"Na skici je enakokraki trikotnik \(ABC\) z \(|AC| = |BC|\) in kotom \(\gamma = 104^\circ 36'\). Izračunaj notranja kota pri \(A\) in \(B\)." + trikotnik_a3(),
    r"\(\alpha = \beta = 37^\circ 42'\)",
    [
        ("α = β", "Kota ob osnovnici enakokrakega trikotnika sta enaka."),
        ("2α = 180° − 104° 36′ = 75° 24′", ""),
        ("!α = β = 37° 42′", ""),
    ],
)

a4 = naloga(
    "A4", "zaporedja_pm", 4,
    r"Dano je zaporedje s splošnim členom \(a_n = 3n - 2^n\). Zapiši prve štiri člene zaporedja.",
    r"\(1, 2, 1, -4\)",
    [
        ("a<sub>1</sub> = 3 − 2 = 1,  a<sub>2</sub> = 6 − 4 = 2", ""),
        ("a<sub>3</sub> = 9 − 8 = 1,  a<sub>4</sub> = 12 − 16 = −4", ""),
        ("!1, 2, 1, −4", ""),
    ],
)

FA5 = lambda x: (3 - x) / (x + 2)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Skiciraj graf funkcije \(f(x) = \dfrac{3 - x}{x + 2}\).",
    r"ničla \(3\), pol \(-2\), asimptota \(y = -1\), \(f(0) = \frac{3}{2}\)",
    [
        ("ničla x = 3,  pol x = −2", "", "racionalna"),
        ("asimptota y = " + U("−1", "1") + " = −1", "Količnik vodilnih koeficientov."),
        ("f(0) = " + U("3", "2"), ""),
        ("@slika", graf([(FA5, MODRA), (lambda x: -1, RDECA)], (-8, 6), (-7, 6), [(3, 0, ""), (0, 1.5, ""), (-3, -6, ""), (-1, 4, "")], sirina=300, visina=280)),
    ],
)

a6 = naloga(
    "A6", "kvadratna_funkcija", 5,
    r"Izračunaj abscisi presečišč parabole \(y = x^2 + 3x + 1\) in premice \(y = 2x + 7\).",
    r"\(x_1 = -3\), \(x_2 = 2\)",
    [
        ("x<sup>2</sup> + 3x + 1 = 2x + 7", "Izenačimo desni strani."),
        ("x<sup>2</sup> + x − 6 = 0  ⇒  (x + 3)(x − 2) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = −3,  x<sub>2</sub> = 2", ""),
    ],
)

a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Iz srebrne palice v obliki kvadra z robovi \(8\) cm, \(5\) cm in \(3\) cm izdelujejo polne kroglice s premerom \(0{,}6\) cm. Največ koliko kroglic lahko naredijo iz ene palice?",
    r"\(1061\)",
    [
        ("V<sub>kv</sub> = 8 · 5 · 3 = 120 cm<sup>3</sup>", "", "telesa"),
        ("V<sub>kr</sub> = " + U("4", "3") + " π · 0,3<sup>3</sup> ≈ 0,1131 cm<sup>3</sup>", "Polmer kroglice je 0,3 cm."),
        ("120 : 0,1131 ≈ 1061,03", ""),
        ("!največ 1061 kroglic", "Zaokrožimo navzdol, saj mora biti vsaka kroglica cela."),
    ],
)

a8 = naloga(
    "A8", "izrazi_potence", 5,
    r"Za \(a = 9\) in \(b = 2\) izračunaj natančno vrednost izraza \(\left(\sqrt{a} + b\right)^2 - 4b\sqrt{a} + a^0\).",
    r"\(2\)",
    [
        (K("a") + " = 3,  a<sup>0</sup> = 1", "", "potence"),
        ("(3 + 2)<sup>2</sup> − 4 · 2 · 3 + 1", ""),
        ("!25 − 24 + 1 = 2", ""),
    ],
)

KOSI = [8, 12, 10, 14, 6, 10]


def stolpci_a9():
    L, B, H = 40, 160, 140
    t = []
    for k in range(0, 17, 2):
        y = B - k / 16 * H
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 220}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        t.append(napis(L - 5, y + 3, str(k), 9, sidro="end"))
    for i, v in enumerate(KOSI):
        x = L + 10 + 35 * i
        h = v / 16 * H
        t.append(f'<rect x="{x}" y="{B - h:.1f}" width="24" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.6" stroke="currentColor" stroke-width="0.8"/>')
        t.append(napis(x + 12, B + 14, f"{i + 1}.", 10))
    t.append(f'<line x1="{L}" y1="{B}" x2="{L + 220}" y2="{B}" stroke="currentColor"/>')
    t.append(napis(8, 12, "število košev", 10, sidro="start") + napis(L + 220, B + 28, "tekma", 10, sidro="end"))
    return svg(280, 195, "".join(t), opis="Število košev na šestih tekmah")


a9 = naloga(
    "A9", "statistika_pm", 5,
    r"Diagram prikazuje število košev, ki jih je dosegel prvi strelec košarkarskega turnirja na šestih tekmah (izmišljeni podatki)." + stolpci_a9()
    + r"Kolikšno je povprečno število košev na teh šestih tekmah?",
    r"\(10\)",
    [
        ("koši: 8, 12, 10, 14, 6, 10", "Preberemo višine stolpcev."),
        ("x̄ = " + U("8 + 12 + 10 + 14 + 6 + 10", "6") + " = " + U("60", "6"), "", "statistika"),
        ("!x̄ = 10 košev", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "polinomi_racionalna", 15,
    r"Dana sta polinoma \(p(x) = x^3 + x^2 - 12x\) in \(q(x) = x^2 - 9\).<br>"
    r"1.1. Deli polinom \(p\) s polinomom \(q\) ter zapiši količnik in ostanek. (6 točk)<br>"
    r"1.2. Izračunaj skupno ničlo obeh polinomov. (5 točk)<br>"
    r"1.3. Izračunaj vrednost izraza \(2 \cdot p(-1) + q(2)\). (4 točke)",
    r"1.1. \(k(x) = x + 1\), \(r(x) = -3x + 9\) &nbsp; 1.2. \(x = 3\) &nbsp; 1.3. \(19\)",
    [
        "## 1.1",
        ("(x<sup>3</sup> + x<sup>2</sup> − 12x) : (x<sup>2</sup> − 9) = x + 1", ""),
        ("x · (x<sup>2</sup> − 9) = x<sup>3</sup> − 9x;  ostane x<sup>2</sup> − 3x", "Prvi korak deljenja."),
        ("1 · (x<sup>2</sup> − 9) = x<sup>2</sup> − 9;  ostane −3x + 9", "Drugi korak deljenja."),
        ("!količnik x + 1,  ostanek −3x + 9", "Preizkus: (x + 1)(x² − 9) + (−3x + 9) = p(x)."),
        "## 1.2",
        ("p(x) = x(x<sup>2</sup> + x − 12) = x(x + 4)(x − 3)", "", "kvadratna"),
        ("q(x) = (x − 3)(x + 3)", ""),
        ("!skupna ničla x = 3", ""),
        "## 1.3",
        ("p(−1) = −1 + 1 + 12 = 12,  q(2) = 4 − 9 = −5", ""),
        ("!2 · 12 + (−5) = 19", ""),
    ],
)

b2 = naloga(
    "B2", "trikotnik_kotne", 15,
    r"V trikotniku \(ABC\) je \(a = 30\) cm, \(b = 40\) cm in \(\gamma = 76^\circ\).<br>"
    r"2.1. Izračunaj dolžino stranice \(c\) na centimeter natančno. (4 točke)<br>"
    r"2.2. Izračunaj kot \(\alpha\) na stopinjo natančno. (4 točke)<br>"
    r"2.3. Izračunaj ploščino trikotnika in ploščino trikotniku včrtanega kroga. (7 točk)",
    r"2.1. \(c \approx 44\) cm &nbsp; 2.2. \(\alpha \approx 42^\circ\) &nbsp; 2.3. \(S \approx 582{,}18\ \mathrm{cm^2}\), \(S_k \approx 328{,}8\ \mathrm{cm^2}\)",
    [
        "## 2.1",
        ("c<sup>2</sup> = 30<sup>2</sup> + 40<sup>2</sup> − 2 · 30 · 40 · cos 76° ≈ 2500 − 580,62 = 1919,38", "", "kosinusni"),
        ("!c ≈ 43,81 cm ≈ 44 cm", ""),
        "## 2.2",
        ("sin α = " + U("a · sin γ", "c") + " = " + U("30 · sin 76°", "43,81") + " ≈ 0,6644", "", "sinusni"),
        ("!α ≈ 41,6° ≈ 42°", "α je nasproti krajše stranice od c, zato je oster."),
        "## 2.3",
        ("!S = " + U("1", "2") + " · a · b · sin γ = 600 · sin 76° ≈ 582,18 cm<sup>2</sup>", "", "ploscine"),
        ("r = " + U("2S", "a + b + c") + " ≈ " + U("1164,35", "113,81") + " ≈ 10,23 cm", "Polmer včrtanega kroga: S = r · s, kjer je s polovica obsega."),
        ("!S<sub>k</sub> = πr<sup>2</sup> ≈ 328,8 cm<sup>2</sup>", "", "krog"),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Dani so prvi štirje členi aritmetičnega zaporedja: \(-7, -2, 3, 8\).<br>"
    r"3.1. Zapiši naslednja dva člena in dvajseti člen zaporedja. (5 točk)<br>"
    r"3.2. Kolikšna je vsota prvih tridesetih členov? (4 točke)<br>"
    r"3.3. Od vključno katerega člena naprej so vsi členi večji od \(100\)? (6 točk)",
    r"3.1. \(13, 18\); \(a_{20} = 88\) &nbsp; 3.2. \(1965\) &nbsp; 3.3. od \(a_{23}\) naprej",
    [
        "## 3.1",
        ("d = −2 − (−7) = 5", "", "aritmeticno"),
        ("!a<sub>5</sub> = 13,  a<sub>6</sub> = 18", ""),
        ("!a<sub>20</sub> = −7 + 19 · 5 = 88", ""),
        "## 3.2",
        ("s<sub>30</sub> = " + U("30", "2") + " · (2 · (−7) + 29 · 5) = 15 · 131", ""),
        ("!s<sub>30</sub> = 1965", ""),
        "## 3.3",
        ("−7 + (n − 1) · 5 > 100  ⇒  5n − 12 > 100", "", "neenacba"),
        ("n > 22,4", ""),
        ("!od 23. člena naprej (a<sub>23</sub> = 103)", "a₂₂ = 98 je še manjši od 100."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
