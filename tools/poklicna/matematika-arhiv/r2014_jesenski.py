# Jesenski rok 2014 (uradna pola RIC P142-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2014, "jesenski", "torek, 26. avgust 2014"

# ------------------------------------------------------------------ 1. del
MES = [("jan", 14), ("feb", 12), ("mar", 16), ("apr", 18), ("maj", 20), ("jun", 16)]


def smeti():
    t = [f'<line x1="40" y1="{140 - j * 6}" x2="290" y2="{140 - j * 6}" stroke="currentColor" stroke-opacity="{0.6 if j == 0 else 0.12}"/>'
         + napis(34, 144 - j * 6, str(j), 10, sidro="end") for j in range(0, 21, 5)]
    t += [f'<rect x="{52 + i * 40}" y="{140 - v * 6}" width="24" height="{v * 6}" fill="{MODRA}" fill-opacity="0.75"/>' + napis(64 + i * 40, 156, m, 10)
          for i, (m, v) in enumerate(MES)]
    t.append(napis(12, 12, "masa smeti v kg", 10, sidro="start"))
    return svg(300, 165, "".join(t), opis="Masa bioloških odpadkov po mesecih")

a1 = naloga(
    "A1", "statistika_pm", 4,
    r"Družina je tehtala biološke odpadke. Masa odpadkov v zadnjih šestih mesecih je prikazana v diagramu (vrednosti so cela števila)." + smeti()
    + r"Kateri mesec so odvrgli največ odpadkov in koliko kilogramov? Izračunaj aritmetično sredino mase odpadkov v zadnjih šestih mesecih.",
    r"maj, \(20\) kg; \(\bar{x} = 16\) kg",
    [
        ("!največ: maj", "Najvišji stolpec."),
        ("!20 kg", ""),
        ("x̄ = " + U("14 + 12 + 16 + 18 + 20 + 16", "6") + " = " + U("96", "6"), "", "statistika"),
        ("!x̄ = 16 kg", ""),
    ],
)

a2 = naloga(
    "A2", "kombinatorika_verjetnost", 4,
    r"V računalniški igri ustvariš junaka tako, da mu izbereš oblačilo, pokrivalo in vozilo. Izbiraš lahko med štirimi oblačili, šestimi pokrivali in petimi vozili. "
    r"Koliko različnih junakov lahko ustvariš?",
    r"\(120\)",
    [
        ("4 · 6 · 5", "Osnovni izrek kombinatorike: izbire med seboj množimo.", "kombinatorika"),
        ("!120 različnih junakov", ""),
    ],
)

P3 = lambda x: (x + 2) * (x - 1) ** 2

a3 = naloga(
    "A3", "polinomi_racionalna", 4,
    r"Na sliki je graf polinoma \(p\). Ali so izjave pravilne? Odgovori z DA ali NE."
    + graf([(P3, "currentColor")], (-3, 3), (-2, 6), [], sirina=240, visina=300)
    + tabela(["Izjava", "DA / NE"], [
        [r"V točki z absciso \(-1\) je vrednost polinoma pozitivna.", ""],
        [r"Ničle polinoma \(p\) so \(-2\), \(1\) in \(2\).", ""],
        [r"Predpis polinoma je \(p(x) = (x + 2)(x - 1)^2\).", ""],
        [r"Polinom \(p\) na intervalu \((-1, 1)\) narašča.", ""]]),
    r"DA, NE, DA, NE",
    [
        ("!1. DA", "Graf je pri x = −1 nad osjo x (p(−1) = 4)."),
        ("!2. NE", "Ničli sta −2 in 1 (dvojna); pri x = 2 graf osi ne seka.", "horner"),
        ("!3. DA", "Ničla −2 je enojna, ničla 1 dvojna (graf se osi dotakne), p(0) = 2 se ujema s sliko."),
        ("!4. NE", "Na (−1, 1) graf pada."),
    ],
)

a4 = naloga(
    "A4", "kotne_funkcije_pm", 4,
    r"Natančno izračunaj \(x\): \(\cos 120^\circ = x\), \(3^x = 81\), \(\log_x 49 = 2\), \(x \cdot \sin\frac{\pi}{2} = 3\).",
    r"\(-\frac{1}{2}\); \(4\); \(7\); \(3\)",
    [
        ("!cos 120° = −" + U("1", "2"), "120° je v 2. kvadrantu; cos 120° = −cos 60°.", "kotne"),
        ("!3<sup>x</sup> = 3<sup>4</sup>  ⇒  x = 4", "", "eksponentna"),
        ("!x<sup>2</sup> = 49  ⇒  x = 7", "Osnova logaritma mora biti pozitivna.", "logaritem"),
        ("!sin " + U("π", "2") + " = 1  ⇒  x = 3", ""),
    ],
)

a5 = naloga(
    "A5", "odvod_pm", 4,
    r"Z uporabo odvoda izračunaj stacionarne točke funkcije \(f(x) = \dfrac{x}{x^2 + 4}\).",
    r"\(T_1\left(2, \frac{1}{4}\right)\), \(T_2\left(-2, -\frac{1}{4}\right)\)",
    [
        ("f'(x) = " + U("(x<sup>2</sup> + 4) − x · 2x", "(x<sup>2</sup> + 4)<sup>2</sup>") + " = " + U("4 − x<sup>2</sup>", "(x<sup>2</sup> + 4)<sup>2</sup>"), "Odvod kvocienta.", "odvod"),
        ("f'(x) = 0  ⇒  4 − x<sup>2</sup> = 0  ⇒  x = ±2", ""),
        ("!T<sub>1</sub>(2, " + U("1", "4") + "),  T<sub>2</sub>(−2, −" + U("1", "4") + ")", "f(2) = 2/8, f(−2) = −2/8."),
    ],
)

a6 = naloga(
    "A6", "ulomki_odstotki", 5,
    r"Luka ima v telefonu spominsko kartico velikosti \(4096\) MB. \(\frac{1}{4}\) prostora zaseda glasba, \(40\,\%\) prostora pa igre. "
    r"Največ koliko fotografij velikosti \(2{,}5\) MB lahko še shrani?",
    r"\(573\) fotografij",
    [
        ("prosto: 100 % − 25 % − 40 % = 35 %", "1/4 = 25 %."),
        ("0,35 · 4096 = 1433,6 MB", "", "odstotki"),
        ("1433,6 : 2,5 = 573,44", ""),
        ("!573 fotografij", "Zaokrožimo navzdol, ker 574. fotografija ne gre več na kartico."),
    ],
)


def skrinja():
    t = [f'<rect x="30" y="80" width="60" height="50" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor"/>',
         '<path d="M 30 80 A 30 30 0 0 1 90 80" fill="none" stroke="currentColor"/>',
         '<line x1="60" y1="50" x2="180" y2="10" stroke="currentColor"/>', '<path d="M 150 40 A 30 30 0 0 1 210 40" fill="none" stroke="currentColor"/>',
         '<line x1="90" y1="80" x2="210" y2="40" stroke="currentColor"/>', '<line x1="90" y1="130" x2="210" y2="90" stroke="currentColor"/>',
         '<line x1="210" y1="40" x2="210" y2="90" stroke="currentColor"/>', '<line x1="60" y1="80" x2="60" y2="50" stroke="currentColor" stroke-dasharray="3 2"/>',
         napis(60, 145, "60 cm", 10), napis(160, 125, "120 cm", 10), napis(230, 70, "40 cm", 10), napis(75, 70, "30 cm", 10)]
    return svg(260, 150, "".join(t), opis="Skrinja s pokrovom v obliki polovice valja")

a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Skrinja ima obliko kvadra širine \(60\) cm, dolžine \(120\) cm in višine \(40\) cm, njen pokrov pa obliko polovice valja (glej sliko). Izračunaj površino skrinje." + skrinja(),
    r"\(21\,600 + 4500\pi \approx 35\,737\ \mathrm{cm^2} \approx 3{,}57\ \mathrm{m^2}\)",
    [
        ("kvader brez zgornje ploskve: 60 · 120 + 2 · 120 · 40 + 2 · 60 · 40 = 21 600 cm<sup>2</sup>", "Zgornjo ploskev pokriva pokrov.", "telesa"),
        ("pol plašča valja: " + U("1", "2") + " · 2π · 30 · 120 = 3600π cm<sup>2</sup>", "r = 30 cm, dolžina 120 cm."),
        ("dva polkroga: π · 30<sup>2</sup> = 900π cm<sup>2</sup>", "", "krog"),
        ("!P = 21 600 + 4500π ≈ 35 737 cm<sup>2</sup> ≈ 3,57 m<sup>2</sup>", ""),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Zapiši enačbo premice, ki gre skozi točko \(A\left(3, \frac{9}{2}\right)\) in seka ordinatno os v točki \(T\left(0, -\frac{3}{2}\right)\). Premico tudi nariši.",
    r"\(y = 2x - \frac{3}{2}\)",
    [
        ("n = −" + U("3", "2"), "Začetna vrednost je ordinata točke T."),
        ("k = " + U(U("9", "2") + " + " + U("3", "2"), "3 − 0") + " = " + U("6", "3") + " = 2", "", "premica"),
        ("!y = 2x − " + U("3", "2"), ""),
        ("@slika", graf([(lambda x: 2 * x - 1.5, MODRA)], (-2, 4), (-4, 6), [(3, 4.5, "A"), (0, -1.5, "T")], sirina=240, visina=380)),
    ],
)

a9 = naloga(
    "A9", "izrazi_potence", 5,
    r"Poenostavi izraz in rezultat zapiši kot produkt linearnih faktorjev: \(a^3 - (a + 3)^2 + 5a^2 + 10a + 9\).",
    r"\(a(a + 2)^2\)",
    [
        ("(a + 3)<sup>2</sup> = a<sup>2</sup> + 6a + 9", "Kvadrat dvočlenika."),
        ("a<sup>3</sup> − a<sup>2</sup> − 6a − 9 + 5a<sup>2</sup> + 10a + 9 = a<sup>3</sup> + 4a<sup>2</sup> + 4a", ""),
        ("= a(a<sup>2</sup> + 4a + 4)", "Izpostavimo a."),
        ("!= a(a + 2)<sup>2</sup>", "Popolni kvadrat."),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "kvadratna_funkcija", 15,
    r"Dana je funkcija \(f(x) = -x^2 + 3\).<br>"
    r"1.1. Izračunaj ničli, teme in začetno vrednost funkcije \(f\). (6 točk)<br>"
    r"1.2. Nariši graf funkcije \(f\). Kako ga imenujemo? (4 točke)<br>"
    r"1.3. Izračunaj presečišči grafa funkcije \(f\) in premice \(y = 2x\). (5 točk)",
    r"1.1. \(\pm\sqrt{3}\), \(T(0, 3)\), \(f(0) = 3\) &nbsp; 1.2. parabola &nbsp; 1.3. \((1, 2)\), \((-3, -6)\)",
    [
        "## 1.1",
        ("!−x<sup>2</sup> + 3 = 0  ⇒  x<sub>1,2</sub> = ±" + K("3"), "", "kvadratna"),
        ("!T(0, 3)", "b = 0, zato je p = 0, q = f(0).", "teme"),
        ("!f(0) = 3", ""),
        "## 1.2",
        ("@slika", graf([(lambda x: -x * x + 3, MODRA), (lambda x: 2 * x, RDECA)], (-4, 3), (-7, 4), [(0, 3, "T"), (1, 2, ""), (-3, -6, "")], sirina=260, visina=380)),
        ("!Graf je parabola.", "Odprta je navzdol, ker je vodilni koeficient negativen."),
        "## 1.3",
        ("−x<sup>2</sup> + 3 = 2x  ⇒  x<sup>2</sup> + 2x − 3 = 0", ""),
        ("(x − 1)(x + 3) = 0", "", "kvadratna"),
        ("!P<sub>1</sub>(1, 2),  P<sub>2</sub>(−3, −6)", "y izračunamo iz y = 2x."),
    ],
)


def kvadrat_b2():
    k = 13
    A, B, C, D = (25, 180), (25 + 12 * k, 180), (25 + 12 * k, 180 - 12 * k), (25, 180 - 12 * k)
    F, E = (25 + 4 * k, D[1]), (B[0], 180 - 3 * k)
    t = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<polygon points="{A[0]},{A[1]} {E[0]},{E[1]} {F[0]},{F[1]}" fill="{MODRA}" fill-opacity="0.15" stroke="{MODRA}" stroke-width="1.8"/>',
         napis(A[0] - 8, A[1] + 12, "A"), napis(B[0] + 8, B[1] + 12, "B"), napis(C[0] + 8, C[1] - 2, "C"), napis(D[0] - 8, D[1] - 2, "D"),
         napis(F[0], F[1] - 6, "F"), napis(E[0] + 9, E[1] + 4, "E"),
         napis((D[0] + F[0]) / 2, D[1] - 6, "a/3", 10), napis(B[0] + 16, (B[1] + E[1]) / 2 + 4, "a/4", 10), napis((A[0] + B[0]) / 2, A[1] + 14, "a", 11),
         napis(E[0] - 14, E[1] - 12, "φ", 11, RDECA), napis(A[0] + 22, A[1] - 24, "α", 11, RDECA)]
    return svg(220, 200, "".join(t), opis="Kvadrat ABCD s trikotnikom AEF")

b2 = naloga(
    "B2", "trikotnik_kotne", 15,
    r"Na sliki je kvadrat \(ABCD\) s stranico \(a = 12\) cm. Točka \(F\) leži na \(DC\) z \(DF = \frac{a}{3}\), točka \(E\) pa na \(BC\) z \(BE = \frac{a}{4}\)." + kvadrat_b2()
    + r"2.1. Izračunaj dolžine stranic trikotnika \(AEF\). (6 točk)<br>"
    r"2.2. Izračunaj velikosti kotov \(\varphi = \angle FEC\) in \(\alpha = \angle EAF\). (6 točk)<br>"
    r"2.3. Izračunaj ploščino trikotnika \(AEF\). (3 točke)",
    r"2.1. \(AE \approx 12{,}37\), \(AF \approx 12{,}65\), \(EF \approx 12{,}04\) cm &nbsp; 2.2. \(\varphi \approx 41{,}63^\circ\), \(\alpha \approx 57{,}53^\circ\) &nbsp; 2.3. \(66\ \mathrm{cm^2}\)",
    [
        "## 2.1",
        ("DF = 4 cm, FC = 8 cm, BE = 3 cm, EC = 9 cm", ""),
        ("!AE = " + K("12<sup>2</sup> + 3<sup>2</sup>") + " = " + K("153") + " ≈ 12,37 cm", "Trikotnik ABE je pravokoten.", "pitagora"),
        ("!AF = " + K("12<sup>2</sup> + 4<sup>2</sup>") + " = " + K("160") + " ≈ 12,65 cm", "Trikotnik ADF."),
        ("!EF = " + K("8<sup>2</sup> + 9<sup>2</sup>") + " = " + K("145") + " ≈ 12,04 cm", "Trikotnik ECF."),
        "## 2.2",
        ("tan φ = " + U("FC", "EC") + " = " + U("8", "9"), "", "kotne"),
        ("!φ ≈ 41,63°", ""),
        ("∠BAE: tan = " + U("3", "12") + "  ⇒  14,04°;  ∠DAF: tan = " + U("4", "12") + "  ⇒  18,43°", ""),
        ("!α = 90° − 14,04° − 18,43° ≈ 57,53°", ""),
        "## 2.3",
        ("S = 144 − " + U("12 · 3", "2") + " − " + U("12 · 4", "2") + " − " + U("9 · 8", "2") + " = 144 − 18 − 24 − 36", "Od kvadrata odštejemo tri pravokotne trikotnike.", "ploscine"),
        ("!S = 66 cm<sup>2</sup>", ""),
    ],
)


def mozaik():
    s = 9
    t, x0 = [], 40
    for n in (1, 2, 3):
        m = 2 * n
        y0 = 70 - m * s / 2
        for i in range(m):
            for j in range(m):
                nov = n == 1 or i in (0, m - 1) or j in (0, m - 1)
                t.append(f'<rect x="{x0 + i * s}" y="{y0 + j * s}" width="{s}" height="{s}" fill="{MODRA}" fill-opacity="{0.6 if nov else 0.12}" stroke="currentColor" stroke-width="0.7"/>')
        t.append(napis(x0 + m * s / 2, 140, f"po {n}. koraku", 10))
        x0 += m * s + 45
    return svg(int(x0), 150, "".join(t), opis="Mozaik po prvih treh korakih")

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Otroci so sestavljali mozaik iz kamenčkov v obliki kocke. V prvem koraku so položili \(4\) kamenčke v kvadrat, v vsakem naslednjem koraku pa so okrog "
    r"mozaika položili nov pas kamenčkov (glej sliko; temneje so na novo dodani). Števila na novo dodanih kamenčkov tvorijo aritmetično zaporedje." + mozaik()
    + r"3.1. Zapiši prve tri člene zaporedja in formulo za splošni člen. Z njo izračunaj sedmi člen. (5 točk)<br>"
    r"3.2. En kamenček tehta \(25\) g. Koliko kilogramov tehtajo kamenčki mozaika iz desetih korakov? (5 točk)<br>"
    r"3.3. Izračunaj največjo razdaljo med dvema točkama mozaika po treh korakih, če imajo kamenčki rob \(3\) cm. (5 točk)",
    r"3.1. \(4, 12, 20\); \(a_n = 8n - 4\); \(a_7 = 52\) &nbsp; 3.2. \(10\) kg &nbsp; 3.3. \(18\sqrt{2} \approx 25{,}46\) cm",
    [
        "## 3.1",
        ("a<sub>1</sub> = 4,  a<sub>2</sub> = 16 − 4 = 12,  a<sub>3</sub> = 36 − 16 = 20", "Po n korakih je mozaik kvadrat 2n × 2n kamenčkov."),
        ("d = 8", "", "aritmeticno"),
        ("!a<sub>n</sub> = 4 + 8(n − 1) = 8n − 4", ""),
        ("!a<sub>7</sub> = 56 − 4 = 52", ""),
        "## 3.2",
        ("po 10 korakih: 20 · 20 = 400 kamenčkov", "Isto da vsota S₁₀ = 10/2 · (4 + 76) = 400."),
        ("!400 · 25 g = 10 000 g = 10 kg", ""),
        "## 3.3",
        ("po 3 korakih: kvadrat 6 × 6 kamenčkov, stranica 6 · 3 = 18 cm", ""),
        ("!d = 18" + K("2") + " ≈ 25,46 cm", "Največja razdalja je diagonala kvadrata.", "pitagora"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
