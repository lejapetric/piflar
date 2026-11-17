# Jesenski rok 2016 (uradna pola RIC P162-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2016, "jesenski", "četrtek, 25. avgust 2016"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "geometrija_ravnine", 4,
    r"Za dolžine stranic trikotnika \(ABC\) velja \(a : b : c = 3 : 5 : 6\). Najdaljša stranica podobnega trikotnika \(A'B'C'\) meri \(18\) cm. "
    r"Izračunaj, koliko merita preostali stranici trikotnika \(A'B'C'\).",
    r"\(a' = 9\) cm, \(b' = 15\) cm",
    [
        ("c' = 6k = 18  ⇒  k = 3", "Stranice podobnih trikotnikov so v enakem razmerju."),
        ("!a' = 3 · 3 = 9 cm", ""),
        ("!b' = 5 · 3 = 15 cm", ""),
    ],
)

a2 = naloga(
    "A2", "eksponentna_logaritemska", 4,
    r"V okvirčke zapiši taka števila, da bodo veljale enakosti: "
    r"\(\sqrt{\square} = 5\), \(\log_{\square} 81 = 4\), \(27^{\square} = 3\), \(\cos \square = \frac{1}{2}\) (kot v stopinjah, med \(0^\circ\) in \(90^\circ\)).",
    r"\(25\), \(3\), \(\frac{1}{3}\), \(60^\circ\)",
    [
        ("!" + K("25") + " = 5", "5² = 25.", "koreni"),
        ("!log<sub>3</sub> 81 = 4", "3⁴ = 81.", "logaritem"),
        ("!27<sup>1/3</sup> = ∛27 = 3", "Potenca z eksponentom 1/3 je tretji koren.", "potence"),
        ("!cos 60° = " + U("1", "2"), "", "kotne"),
    ],
)

a3 = naloga(
    "A3", "zaporedja_pm", 4,
    r"Med števili \(13\) in \(62\) vrini šest števil tako, da dobiš končno aritmetično zaporedje z osmimi členi. Zapiši diferenco in vse člene zaporedja.",
    r"\(d = 7\); \(13, 20, 27, 34, 41, 48, 55, 62\)",
    [
        ("a<sub>1</sub> = 13, a<sub>8</sub> = 62", ""),
        ("a<sub>8</sub> = a<sub>1</sub> + 7d  ⇒  62 = 13 + 7d", "", "aritmeticno"),
        ("!d = 7", ""),
        ("!13, 20, 27, 34, 41, 48, 55, 62", ""),
    ],
)

a4 = naloga(
    "A4", "kvadratna_funkcija", 4,
    r"Izračunaj, za katere vrednosti spremenljivke \(x\) velja \(x^2 - 9 < 0\).",
    r"\(x \in (-3, 3)\)",
    [
        ("x<sup>2</sup> − 9 = (x − 3)(x + 3)", "Ničli sta −3 in 3.", "neenacba"),
        ("@slika", graf([(lambda x: x * x - 9, MODRA)], (-5, 5), (-10, 6), [(-3, 0, ""), (3, 0, "")], sirina=260, visina=300)),
        ("Parabola je odprta navzgor, pod osjo x je med ničlama.", ""),
        ("!x ∈ (−3, 3)", "Krajišči nista vključeni, ker je neenakost stroga."),
    ],
)

a5 = naloga(
    "A5", "povrsine_prostornine", 4,
    r"Izračunaj prostornino največje okrogle žoge, ki gre skozi pravokotno okno širine \(0{,}6\) m in višine \(1{,}2\) m.",
    r"\(V \approx 0{,}113\ \mathrm{m^3}\) \((\approx 113\) litrov\()\)",
    [
        ("2r = 0,6 m  ⇒  r = 0,3 m", "Premer žoge ne sme presegati krajše stranice okna."),
        ("V = " + U("4", "3") + "πr<sup>3</sup> = " + U("4", "3") + "π · 0,027 = 0,036π", "", "telesa"),
        ("!V ≈ 0,113 m<sup>3</sup>", "To je približno 113 dm³ oziroma 113 litrov."),
    ],
)

a6 = naloga(
    "A6", "izrazi_potence", 5,
    r"Reši enačbo \((x + 2)^2 + (1 - x)(3x + 1) = x(1 - 2x)\).",
    r"\(x = -1\)",
    [
        ("x<sup>2</sup> + 4x + 4 + 3x + 1 − 3x<sup>2</sup> − x = x − 2x<sup>2</sup>", "Kvadrat dvočlenika in množenje dvočlenikov."),
        ("−2x<sup>2</sup> + 6x + 5 = x − 2x<sup>2</sup>", ""),
        ("6x + 5 = x  ⇒  5x = −5", "Kvadratna člena se odštejeta."),
        ("!x = −1", ""),
    ],
)

a7 = naloga(
    "A7", "kombinatorika_verjetnost", 5,
    r"V posodi A je \(8\) modrih in \(4\) rumene kroglice. Iz posode izvlečemo eno kroglico. Izračunaj verjetnost, da je rumena.<br>"
    r"V posodi B je \(12\) rdečih in \(4\) zelene kroglice. V posodo B dodamo nekaj zelenih kroglic in nato izvlečemo eno kroglico. "
    r"Verjetnost, da je zelena, je \(\frac{1}{2}\). Koliko zelenih kroglic smo dodali?",
    r"\(P = \frac{1}{3}\); dodali smo \(8\) kroglic",
    [
        ("!P(rumena) = " + U("4", "12") + " = " + U("1", "3"), "", "verjetnost"),
        (U("4 + n", "16 + n") + " = " + U("1", "2"), "n je število dodanih zelenih kroglic."),
        ("8 + 2n = 16 + n", ""),
        ("!n = 8", "Dodali smo 8 zelenih kroglic (12 zelenih in 12 rdečih)."),
    ],
)

a8 = naloga(
    "A8", "povrsine_prostornine", 5,
    r"Zbiralnik za vodo ima obliko valja s polmerom \(6\) dm in višino \(20\) dm. Izračunaj prostornino zbiralnika. "
    r"V zbiralniku je \(1500\ \ell\) vode. Koliko odstotkov zbiralnika je napolnjenega?",
    r"\(V = 720\pi\ \mathrm{dm^3} \approx 2262\ \ell\); \(\approx 66{,}3\,\%\)",
    [
        ("V = πr<sup>2</sup>h = π · 36 · 20", "", "telesa"),
        ("!V = 720π dm<sup>3</sup> ≈ 2261,9 dm<sup>3</sup> = 2261,9 ℓ", "1 dm³ = 1 ℓ."),
        (U("1500", "2261,9") + " ≈ 0,663", "", "odstotki"),
        ("!≈ 66,3 %", ""),
    ],
)

a9 = naloga(
    "A9", "polinomi_racionalna", 5,
    r"Število \(x_1 = 2\) je ena od rešitev enačbe \(x^3 - 2x^2 - 3x + 6 = 0\). Izračunaj preostali rešitvi.",
    r"\(x_{2,3} = \pm\sqrt{3}\)",
    [
        ("(x<sup>3</sup> − 2x<sup>2</sup> − 3x + 6) : (x − 2) = x<sup>2</sup> − 3", "Hornerjev algoritem s koeficienti 1, −2, −3, 6; ostanek 0.", "horner"),
        ("x<sup>2</sup> − 3 = 0  ⇒  x<sup>2</sup> = 3", ""),
        ("!x<sub>2,3</sub> = ±" + K("3"), ""),
    ],
)

# ------------------------------------------------------------------ 2. del
def pravokotnik_b1(resitev=False):
    def risba(X, Y):
        t = [f'<polygon points="{X(0)},{Y(0)} {X(4)},{Y(0)} {X(4)},{Y(3)} {X(0)},{Y(3)}" fill="{MODRA}" fill-opacity="0.1" stroke="currentColor" stroke-width="1.6"/>',
             krivulja(X, Y, lambda x: -x / 2 + 3, -1.5, 7.5, "currentColor"),
             napis(X(0) - 8, Y(0) + 14, "A", 12), napis(X(4) - 8, Y(0) + 14, "B", 12), napis(X(4) + 8, Y(3) - 4, "C", 12),
             napis(X(0) + 9, Y(3) - 5, "D", 12), napis(X(6), Y(0) + 14, "P", 12), tocka(X, Y, 6, 0), tocka(X, Y, 0, 3), tocka(X, Y, 4, 1, "R", 6, -4)]
        if resitev:
            t.append(f'<polygon points="{X(0)},{Y(0)} {X(6)},{Y(0)} {X(0)},{Y(3)}" fill="{RDECA}" fill-opacity="0.15"/>')
        return "".join(t)
    return mreza((-2, 8), (-2, 5), risba, sirina=320)

b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Na sliki je pravokotnik \(ABCD\) z oglišči \(A(0, 0)\), \(B(4, 0)\), \(C(4, 3)\), \(D(0, 3)\) in točka \(P(6, 0)\)." + pravokotnik_b1()
    + r"1.1. Zapiši enačbo premice skozi točki \(P\) in \(D\). (6 točk)<br>"
    r"1.2. Izračunaj obseg in ploščino trikotnika \(APD\). (6 točk)<br>"
    r"1.3. Premica skozi točki \(P\) in \(D\) seka daljico \(BC\) v točki \(R\). Izračunaj koordinate točke \(R\). (3 točke)",
    r"1.1. \(y = -\frac{1}{2}x + 3\) &nbsp; 1.2. \(o \approx 15{,}71\), \(p = 9\) &nbsp; 1.3. \(R(4, 1)\)",
    [
        "## 1.1",
        ("k = " + U("3 − 0", "0 − 6") + " = −" + U("1", "2"), "Smerni koeficient skozi dve točki.", "premica"),
        ("n = 3", "Premica gre skozi D(0, 3) na osi y."),
        ("!y = −" + U("1", "2") + "x + 3", ""),
        "## 1.2",
        ("@slika", pravokotnik_b1(True)),
        ("AP = 6, AD = 3", "Trikotnik APD je pravokoten s pravim kotom pri A."),
        ("DP = " + K("6<sup>2</sup> + 3<sup>2</sup>") + " = " + K("45") + " = 3" + K("5") + " ≈ 6,71", "", "pitagora"),
        ("!o = 6 + 3 + 3" + K("5") + " = 9 + 3" + K("5") + " ≈ 15,71", ""),
        ("!p = " + U("6 · 3", "2") + " = 9", "", "ploscine"),
        "## 1.3",
        ("BC leži na premici x = 4", ""),
        ("y = −" + U("1", "2") + " · 4 + 3 = 1", ""),
        ("!R(4, 1)", ""),
    ],
)

F = lambda x: (3 * x - 6) / (x + 2)

b2 = naloga(
    "B2", "polinomi_racionalna", 15,
    r"Dana je racionalna funkcija \(f(x) = \dfrac{3x - 6}{x + 2}\).<br>"
    r"2.1. Izračunaj ničlo, pol, enačbo vodoravne asimptote in začetno vrednost funkcije \(f\). (4 točke)<br>"
    r"2.2. Nariši graf funkcije \(f\). (6 točk)<br>"
    r"2.3. Izračunaj vrednost odvoda funkcije \(f\) v točki \(x = 4\). (5 točk)",
    r"2.1. ničla \(2\), pol \(-2\), \(y = 3\), \(f(0) = -3\) &nbsp; 2.3. \(f'(4) = \frac{1}{3}\)",
    [
        "## 2.1",
        ("!ničla: 3x − 6 = 0  ⇒  x = 2", "", "racionalna"),
        ("!pol: x + 2 = 0  ⇒  x = −2", ""),
        ("!vodoravna asimptota: y = " + U("3", "1") + " = 3", "Števec in imenovalec imata enako stopnjo; delimo vodilna koeficienta."),
        ("!f(0) = " + U("−6", "2") + " = −3", ""),
        "## 2.2",
        ("@slika", graf([(F, MODRA), (lambda x: 3, RDECA)], (-9, 6), (-7, 12), [(2, 0, ""), (0, -3, "")], sirina=320, visina=400)),
        (None, "Navpična asimptota je premica x = −2."),
        "## 2.3",
        ("f'(x) = " + U("3(x + 2) − (3x − 6) · 1", "(x + 2)<sup>2</sup>") + " = " + U("12", "(x + 2)<sup>2</sup>"), "Odvod kvocienta.", "odvod"),
        ("!f'(4) = " + U("12", "36") + " = " + U("1", "3"), ""),
    ],
)

LETA = [1965, 1975, 1985, 1995, 2005, 2015]
OBISK = [845200, 1132600, 1784300, 2356900, 2918400, 3402600]
CENE = [(2006, 16), (2008, 19), (2010, 22), (2012, 25), (2014, 28), (2016, 31), (2018, 34)]
fmt = lambda n: f"{n:,}".replace(",", " ")


def cene_graf():
    X = lambda l: 50 + (l - 2006) * 18
    Y = lambda c: 200 - c * 4.5
    t = [f'<line x1="{X(2006) - 10}" y1="{Y(j)}" x2="{X(2018) + 10}" y2="{Y(j)}" stroke="currentColor" stroke-opacity="{0.6 if j == 0 else 0.12}"/>'
         + napis(X(2006) - 16, Y(j) + 4, str(j), 10, sidro="end") for j in range(0, 41, 5)]
    t += [napis(X(l), Y(0) + 15, str(l), 10) + f'<circle cx="{X(l)}" cy="{Y(c)}" r="3.5" fill="{MODRA}"/>' for l, c in CENE]
    t.append(napis(X(2012), 12, "Cena vstopnice (EUR) od leta 2006 do 2018", 11))
    return svg(300, 222, "".join(t), opis="Cene vstopnic po letih")


def stolpci():
    t = []
    for i, (l, o) in enumerate(zip(LETA, OBISK)):
        h = o / 3500000 * 150
        t.append(f'<rect x="{40 + i * 42}" y="{170 - h:.1f}" width="30" height="{h:.1f}" fill="{MODRA}" fill-opacity="0.75"/>' + napis(55 + i * 42, 186, str(l), 10))
    t += [f'<line x1="34" y1="{170 - m / 3.5 * 150:.1f}" x2="290" y2="{170 - m / 3.5 * 150:.1f}" stroke="currentColor" stroke-opacity="{0.6 if m == 0 else 0.15}"/>'
          + napis(30, 174 - m / 3.5 * 150, f"{m:g} M", 9, sidro="end") for m in (0, 1, 2, 3)]
    return svg(300, 195, "".join(t), opis="Stolpčni diagram števila obiskovalcev")

b3 = naloga(
    "B3", "statistika_pm", 15,
    r"V preglednici je število obiskovalcev zabaviščnega parka v izbranih letih, v diagramu pa cene vstopnic od leta 2006 do 2018 (izmišljeni podatki)."
    + tabela(["Leto", "Število obiskovalcev"], [[str(l), fmt(o)] for l, o in zip(LETA, OBISK)]) + cene_graf()
    + r"3.1. Izračunaj aritmetično sredino letnega števila obiskovalcev v teh letih. Za koliko odstotkov se je število obiskovalcev leta 2015 povečalo glede na leto 1965? (5 točk)<br>"
    r"3.2. Ponazori število obiskovalcev s stolpčnim diagramom. (5 točk)<br>"
    r"3.3. Zapiši cene vstopnic po letih v preglednico. Kolikšna bi lahko bila cena vstopnice leta 2024? Utemelji. (5 točk)",
    r"3.1. \(\bar{x} \approx 2\,073\,333\); \(\approx 302{,}6\,\%\) &nbsp; 3.3. \(\approx 43\) EUR",
    [
        "## 3.1",
        ("x̄ = " + U("12 440 000", "6"), "Vsota šestih podatkov.", "statistika"),
        ("!x̄ ≈ 2 073 333", ""),
        (U("3 402 600", "845 200") + " ≈ 4,026", "", "odstotki"),
        ("!povečanje ≈ 302,6 %", "Število obiskovalcev se je več kot početverilo."),
        "## 3.2",
        ("@slika", stolpci()),
        "## 3.3",
        ("@slika", tabela(["Leto"] + [str(l) for l, _ in CENE], [["Cena (EUR)"] + [str(c) for _, c in CENE]])),
        ("Cena se vsaki dve leti poveča za 3 EUR.", "Točke na diagramu ležijo na premici."),
        ("2024 = 2018 + 6 let  ⇒  34 + 3 · 3", ""),
        ("!≈ 43 EUR", "Če se bo cena še naprej enakomerno večala."),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
