# Zimski rok 2012 (uradna pola RIC P123-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2012, "zimski", "torek, 5. februar 2013"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Brez uporabe žepnega računala izračunaj: \(\left(\frac{3}{4} - \frac{1}{2}\right) \cdot 8 + \sqrt{16}\).",
    r"\(6\)",
    [
        (U("3", "4") + " − " + U("2", "4") + " = " + U("1", "4"), ""),
        (U("1", "4") + " · 8 = 2,  " + K("16") + " = 4", "", "koreni"),
        ("!2 + 4 = 6", ""),
    ],
)

a2 = naloga(
    "A2", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(\log_x (3x + 10) = 2\).",
    r"\(x = 5\)",
    [
        ("x<sup>2</sup> = 3x + 10", "Po definiciji logaritma.", "logaritem"),
        ("x<sup>2</sup> − 3x − 10 = 0  ⇒  (x − 5)(x + 2) = 0", "", "kvadratna"),
        ("!x = 5", "Osnova logaritma mora biti pozitivna in različna od 1, zato x = −2 odpade."),
    ],
)

a3 = naloga(
    "A3", "linearna_funkcija", 4,
    r"Reši sistem enačb: \(3x - 2y = 8\) in \(6x + 4y = 0\).",
    r"\(x = \frac{4}{3},\ y = -2\)",
    [
        ("6x − 4y = 16", "Prvo enačbo pomnožimo z 2.", "sistem"),
        ("12x = 16  ⇒  x = " + U("4", "3"), "Seštejemo z drugo enačbo."),
        ("!x = " + U("4", "3"), ""),
        ("!y = −2", "Iz 6 · 4/3 + 4y = 0: 8 + 4y = 0."),
    ],
)

a4 = naloga(
    "A4", "ulomki_odstotki", 4,
    r"Plašč so podražili za \(20\,\%\), tako da zdaj stane \(270\) EUR. Koliko je stal pred podražitvijo?",
    r"\(225\) EUR",
    [
        ("1,2 · x = 270", "Podražitev za 20 % pomeni faktor 1,2.", "odstotki"),
        ("!x = 225 EUR", ""),
    ],
)

a5 = naloga(
    "A5", "polinomi_racionalna", 4,
    r"Za katere vrednosti spremenljivke \(x\) funkcija \(f(x) = \dfrac{2x + 6}{x^3 - 16x}\) ni definirana?",
    r"\(x \in \{-4, 0, 4\}\)",
    [
        ("x<sup>3</sup> − 16x = x(x − 4)(x + 4) = 0", "Funkcija ni definirana, kjer je imenovalec 0.", "D_v"),
        ("!x = 0, x = 4, x = −4", ""),
    ],
)


def romb():
    a, al = 8.717, math.radians(70)
    k = 13
    A = (20, 135)
    B = (A[0] + a * k, 135)
    D = (A[0] + a * k * math.cos(al), 135 - a * k * math.sin(al))
    C = (D[0] + a * k, D[1])
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]:.1f},{B[1]} {C[0]:.1f},{C[1]:.1f} {D[0]:.1f},{D[1]:.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="{B[0]:.1f}" y1="{B[1]}" x2="{D[0]:.1f}" y2="{D[1]:.1f}" stroke="{RDECA}" stroke-width="1.5"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 6, B[1] + 12, "B"), napis(C[0] + 8, C[1], "C"), napis(D[0] - 6, D[1] - 6, "D"),
         napis(A[0] + 22, A[1] - 6, "70°", 10), napis((A[0] + B[0]) / 2, A[1] + 15, "a", 12), napis((B[0] + D[0]) / 2 + 12, (B[1] + D[1]) / 2, "f", 12, RDECA)]
    return svg(220, 155, "".join(t), opis="Romb z diagonalo BD")

a6 = naloga(
    "A6", "trikotnik_kotne", 5,
    r"Dan je romb s podatkoma \(f = |BD| = 10\) cm in \(\alpha = 70^\circ\). Nariši skico in izračunaj dolžino stranice \(a\).",
    r"\(a \approx 8{,}72\) cm",
    [
        ("@slika", romb()),
        ("sin " + U("α", "2") + " = " + U(U("f", "2"), "a"), "Diagonali se sekata pravokotno in se razpolavljata; f leži nasproti kota α, ki ga diagonala AC razpolovi.", "kotne"),
        ("a = " + U("5", "sin 35°"), ""),
        ("!a ≈ 8,72 cm", ""),
    ],
)

a7 = naloga(
    "A7", "zaporedja_pm", 5,
    r"V aritmetičnem zaporedju z diferenco \(d = 3\) velja \(a_{10} - 2 \cdot a_5 = 20\). Izračunaj prvi člen zaporedja.",
    r"\(a_1 = -17\)",
    [
        ("a<sub>10</sub> = a<sub>1</sub> + 27,  a<sub>5</sub> = a<sub>1</sub> + 12", "", "aritmeticno"),
        ("a<sub>1</sub> + 27 − 2a<sub>1</sub> − 24 = 20", ""),
        ("−a<sub>1</sub> + 3 = 20", ""),
        ("!a<sub>1</sub> = −17", ""),
    ],
)

P8 = lambda x: 0.5 * (x - 1) ** 2 * (x + 3)

a8 = naloga(
    "A8", "polinomi_racionalna", 5,
    r"Zapiši ničli in izračunaj začetno vrednost funkcije \(p(x) = \frac{1}{2}(x - 1)^2 (x + 3)\) ter skiciraj njen graf.",
    r"ničli \(1\) (dvojna) in \(-3\), \(p(0) = \frac{3}{2}\)",
    [
        ("!x<sub>1,2</sub> = 1 (dvojna),  x<sub>3</sub> = −3", "Ničle preberemo iz razcepljene oblike."),
        ("!p(0) = " + U("1", "2") + " · 1 · 3 = " + U("3", "2"), ""),
        ("@slika", graf([(P8, MODRA)], (-4, 3), (-3, 6), [(1, 0, ""), (-3, 0, ""), (0, 1.5, "")], sirina=260, visina=300)),
        (None, "Pri dvojni ničli se graf osi x dotakne, pri enojni jo seka."),
    ],
)

CENE = [32, 38, 45, 45, 52, 60, 68, 75, 95, 120]

a9 = naloga(
    "A9", "statistika_pm", 5,
    r"Cene prenočišč (v EUR) v desetih hostlih so: " + ", ".join(map(str, CENE)) + r". Izračunaj aritmetično sredino, mediano in modus.",
    r"\(\bar{x} = 63\), \(Me = 56\), \(Mo = 45\)",
    [
        ("!x̄ = " + U("630", "10") + " = 63 EUR", "", "statistika"),
        ("!Me = " + U("52 + 60", "2") + " = 56 EUR", "Podatkov je sodo mnogo: povprečje 5. in 6. podatka."),
        ("!Mo = 45 EUR", "Edina cena, ki se ponovi."),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"Dana je kvadratna funkcija \(f(x) = x^2 - 4x - 5\).<br>"
    r"1.1. Izračunaj ničli, začetno vrednost in teme funkcije ter nariši njen graf. (6 točk)<br>"
    r"1.2. Zapiši enačbo tangente na graf funkcije v točki \(D(6, y_0)\). (6 točk)<br>"
    r"1.3. Izračunaj oddaljenost točke \(D\) od koordinatnega izhodišča na dve decimalni mesti. (3 točke)",
    r"1.1. \(-1\), \(5\); \(f(0) = -5\); \(T(2, -9)\) &nbsp; 1.2. \(y = 8x - 41\) &nbsp; 1.3. \(\approx 9{,}22\)",
    [
        "## 1.1",
        ("!x<sup>2</sup> − 4x − 5 = (x − 5)(x + 1)  ⇒  x<sub>1</sub> = −1, x<sub>2</sub> = 5", "", "kvadratna"),
        ("!f(0) = −5", ""),
        ("!T(2, −9)", "p = 4/2 = 2, q = f(2) = 4 − 8 − 5.", "teme"),
        ("@slika", graf([(lambda x: x * x - 4 * x - 5, MODRA)], (-3, 7), (-10, 8), [(-1, 0, ""), (5, 0, ""), (0, -5, ""), (2, -9, "T"), (6, 7, "D")], sirina=280, visina=400)),
        "## 1.2",
        ("y<sub>0</sub> = f(6) = 36 − 24 − 5 = 7", ""),
        ("f'(x) = 2x − 4  ⇒  k = f'(6) = 8", "", "odvod"),
        ("y − 7 = 8(x − 6)", "", "tangenta"),
        ("!y = 8x − 41", ""),
        "## 1.3",
        ("|OD| = " + K("6<sup>2</sup> + 7<sup>2</sup>") + " = " + K("85"), "", "razdalja"),
        ("!|OD| ≈ 9,22", ""),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 15,
    r"Pet tekmovalcev si je razdelilo nagrado \(6200\) EUR.<br>"
    r"2.1. Koliko bi dobil vsak, če bi zneski tvorili aritmetično zaporedje z diferenco \(d = 400\) EUR? (6 točk)<br>"
    r"2.2. Koliko bi dobil vsak, če bi zneski tvorili geometrijsko zaporedje s količnikom \(q = 2\)? (6 točk)<br>"
    r"2.3. Koliko odstotkov nagrade predstavlja znesek \(2480\) EUR? (3 točke)",
    r"2.1. \(440, 840, 1240, 1640, 2040\) &nbsp; 2.2. \(200, 400, 800, 1600, 3200\) &nbsp; 2.3. \(40\,\%\)",
    [
        "## 2.1",
        ("S<sub>5</sub> = " + U("5", "2") + "(2a<sub>1</sub> + 4 · 400) = 6200", "", "aritmeticno"),
        ("5a<sub>1</sub> + 4000 = 6200  ⇒  a<sub>1</sub> = 440", ""),
        ("!440, 840, 1240, 1640, 2040 EUR", ""),
        "## 2.2",
        ("S<sub>5</sub> = a<sub>1</sub> · " + U("2<sup>5</sup> − 1", "2 − 1") + " = 31a<sub>1</sub> = 6200", "", "geometrijsko"),
        ("a<sub>1</sub> = 200", ""),
        ("!200, 400, 800, 1600, 3200 EUR", ""),
        "## 2.3",
        ("!" + U("2480", "6200") + " = 0,4 = 40 %", "", "odstotki"),
    ],
)


def kocki():
    s, dx, dy = 8, 30, 22  # 1 cm = s px; poševni zamik za globino
    x0, y0 = 30, 230
    def kocka(x, y):
        e = 10 * s
        f = [(x, y), (x + e, y), (x + e, y - e), (x, y - e)]
        t = f'<polygon points="{" ".join(f"{a},{b}" for a, b in f)}" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor" stroke-width="1.4"/>'
        t += f'<polygon points="{x},{y - e} {x + dx},{y - e - dy} {x + e + dx},{y - e - dy} {x + e},{y - e}" fill="{MODRA}" fill-opacity="0.06" stroke="currentColor" stroke-width="1.2"/>'
        t += f'<polygon points="{x + e},{y} {x + e + dx},{y - dy} {x + e + dx},{y - e - dy} {x + e},{y - e}" fill="{MODRA}" fill-opacity="0.18" stroke="currentColor" stroke-width="1.2"/>'
        return t
    t = [kocka(x0, y0), kocka(x0 + 3 * s, y0 - 10 * s)]
    A1, F1 = (x0, y0), (x0 + 10 * s, y0 - 10 * s)
    A2, F2 = (x0 + 3 * s, y0 - 10 * s), (x0 + 13 * s, y0 - 20 * s)
    t += [f'<circle cx="{p[0]}" cy="{p[1]}" r="3" fill="currentColor"/>' for p in (A1, F1, A2, F2)]
    t += [napis(A1[0] - 10, A1[1] + 4, "A₁"), napis(F1[0] - 10, F1[1] + 14, "F₁"), napis(A2[0] - 4, A2[1] - 6, "A₂"), napis(F2[0] - 10, F2[1] - 6, "F₂")]
    return svg(200, 245, "".join(t), opis="Telo iz dveh kock")

b3 = naloga(
    "B3", "povrsine_prostornine", 15,
    r"Telo sestavljata dve enaki kocki z robom \(10\) cm, kakor kaže slika. Zgornja kocka je glede na spodnjo premaknjena v desno; "
    r"razdalja med točkama \(A_2\) in \(F_1\) je \(7\) cm. Točke \(A_1\), \(F_1\), \(A_2\), \(F_2\) ležijo v sprednji ravnini telesa." + kocki()
    + r"3.1. Izračunaj prostornino telesa in jo zapiši v \(\mathrm{dm^3}\). (4 točke)<br>"
    r"3.2. Izračunaj površino telesa. (6 točk)<br>"
    r"3.3. Izračunaj razdaljo med točkama \(A_1\) in \(F_2\). (5 točk)",
    r"3.1. \(2\ \mathrm{dm^3}\) &nbsp; 3.2. \(1060\ \mathrm{cm^2}\) &nbsp; 3.3. \(\sqrt{569} \approx 23{,}85\) cm",
    [
        "## 3.1",
        ("V = 2 · 10<sup>3</sup> = 2000 cm<sup>3</sup>", "", "telesa"),
        ("!V = 2 dm<sup>3</sup>", "1 dm³ = 1000 cm³."),
        "## 3.2",
        ("dve kocki: 2 · 6 · 10<sup>2</sup> = 1200 cm<sup>2</sup>", ""),
        ("stična ploskev: 7 · 10 = 70 cm<sup>2</sup>", "Kocki se dotikata v pravokotniku 7 cm × 10 cm, ki ga ni na površju – odštejemo ga pri obeh kockah."),
        ("!P = 1200 − 2 · 70 = 1060 cm<sup>2</sup>", ""),
        "## 3.3",
        ("vodoravno: 3 + 10 = 13 cm,  navpično: 20 cm", "Zgornja kocka je zamaknjena za 10 − 7 = 3 cm."),
        ("A<sub>1</sub>F<sub>2</sub> = " + K("13<sup>2</sup> + 20<sup>2</sup>") + " = " + K("569"), "", "pitagora"),
        ("!≈ 23,85 cm", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
