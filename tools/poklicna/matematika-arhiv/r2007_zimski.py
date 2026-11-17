# Zimski rok 2007 (uradna pola RIC P073-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2007, "zimski", "sreda, 13. februar 2008"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Z DA označi pravilne enakosti, z NE pa napačne.<br>"
    r"a) \((a + b)^2 = a^2 + b^2\) &nbsp; b) \(9 - x^2 = (3 - x)(3 + x)\)<br>"
    r"c) \((x + 1)(x^2 - x + 1) = x^3 + 1\) &nbsp; č) \(x^2 + x - 6 = (x + 2)(x - 3)\)",
    r"a) NE &nbsp; b) DA &nbsp; c) DA &nbsp; č) NE",
    [
        ("!a) (a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>  ⇒  NE", "Manjka dvojni produkt."),
        ("!b) razlika kvadratov  ⇒  DA", ""),
        ("!c) x<sup>3</sup> − x<sup>2</sup> + x + x<sup>2</sup> − x + 1 = x<sup>3</sup> + 1  ⇒  DA", "Vsota kubov."),
        ("!č) (x + 2)(x − 3) = x<sup>2</sup> − x − 6  ⇒  NE", "Pravilno je x² + x − 6 = (x + 3)(x − 2)."),
    ],
)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Izračunaj natančno vrednost izraza \(\sqrt{5 + \sqrt[3]{64}} - \sqrt[3]{-27}\).",
    r"\(6\)",
    [
        ("∛64 = 4", "", "koreni"),
        (K("5 + 4") + " = " + K("9") + " = 3", ""),
        ("∛(−27) = −3", ""),
        ("!3 − (−3) = 6", ""),
    ],
)

a3 = naloga(
    "A3", "ulomki_odstotki", 4,
    r"Čevlji so stali \(90\) EUR. Med razprodajo so ceno znižali za \(20\,\%\), pri gotovinskem plačilu pa priznajo še \(4\) EUR dodatnega popusta. Koliko plačamo za čevlje na razprodaji z gotovino?",
    r"\(68\) EUR",
    [
        ("0,8 · 90 = 72 EUR", "Cena po 20-odstotnem znižanju.", "odstotki"),
        ("!72 − 4 = 68 EUR", ""),
    ],
)

FA4 = lambda x: (x - 1) * (x - 3) / (x - 2) ** 2

a4 = naloga(
    "A4", "polinomi_racionalna", 4,
    r"Na sliki je graf racionalne funkcije. Zapiši ničli in pol funkcije ter enačbo vodoravne asimptote."
    + graf([(FA4, MODRA), (lambda x: 1, RDECA)], (-4, 8), (-6, 3), [(1, 0, ""), (3, 0, "")], sirina=300, visina=230),
    r"ničli \(1\) in \(3\); pol \(2\); \(y = 1\)",
    [
        ("!ničli x<sub>1</sub> = 1,  x<sub>2</sub> = 3", "Tam graf seka os x."),
        ("!pol x = 2", "Na obeh straneh pola gre graf proti −∞, zato je pol sode stopnje.", "racionalna"),
        ("!vodoravna asimptota y = 1", ""),
        (None, "Predpis, ki ustreza grafu: f(x) = (x − 1)(x − 3) / (x − 2)²."),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"Dopolni manjkajoče člene aritmetičnih zaporedij.<br>"
    r"a) \(7, 4, 1, \square, \square\) &nbsp; b) \(3, \square, 11, 15, \square\)",
    r"a) \(-2, -5\) &nbsp; b) \(7, 19\)",
    [
        ("a) d = 4 − 7 = −3", "", "aritmeticno"),
        ("!a) 7, 4, 1, −2, −5", ""),
        ("b) d = 15 − 11 = 4", ""),
        ("!b) 3, 7, 11, 15, 19", ""),
    ],
)

a6 = naloga(
    "A6", "polinomi_racionalna", 5,
    r"Ena rešitev enačbe \(x^3 + 4x^2 - 11x - 30 = 0\) je \(x = -2\). Izračunaj še drugi dve rešitvi.",
    r"\(x_2 = -5\), \(x_3 = 3\)",
    [
        ("(x<sup>3</sup> + 4x<sup>2</sup> − 11x − 30) : (x + 2) = x<sup>2</sup> + 2x − 15", "Hornerjev algoritem pri −2: 1, 2, −15, ostanek 0.", "horner"),
        ("x<sup>2</sup> + 2x − 15 = (x + 5)(x − 3)", "", "kvadratna"),
        ("!x<sub>2</sub> = −5,  x<sub>3</sub> = 3", ""),
    ],
)


def lik_a7():
    s, o = 17, 30
    a = 8 * s
    R = a / 2
    t = [f'<path d="M {o} {o} h {a} v {a} h {-a} Z M {o} {o + a} A {R} {R} 0 0 1 {o + a} {o + a} Z" fill="{MODRA}" fill-opacity="0.3" fill-rule="evenodd" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{o}" y1="{o + a}" x2="{o + a}" y2="{o + a}" stroke="currentColor" stroke-dasharray="4 3"/>',
         napis(o + a / 2, o - 6, "8 cm", 11), napis(o - 5, o + a / 2, "8 cm", 11, sidro="end"), napis(o + a + 5, o + a / 2, "8 cm", 11, sidro="start")]
    return svg(o + a + 45, o + a + 12, "".join(t), opis="Kvadrat z izrezanim polkrogom")


a7 = naloga(
    "A7", "obsegi_ploscine", 5,
    r"Na dve decimalni mesti izračunaj ploščino osenčenega lika: iz kvadrata s stranico \(8\) cm je izrezan polkrog, katerega premer je spodnja stranica kvadrata." + lik_a7(),
    r"\(S = 64 - 8\pi \approx 38{,}87\ \mathrm{cm^2}\)",
    [
        ("S<sub>kv</sub> = 8<sup>2</sup> = 64 cm<sup>2</sup>", "", "ploscine"),
        ("S<sub>pk</sub> = " + U("π r<sup>2</sup>", "2") + " = " + U("π · 4<sup>2</sup>", "2") + " = 8π cm<sup>2</sup>", "Polmer polkroga je 4 cm.", "krog"),
        ("!S = 64 − 8π ≈ 38,87 cm<sup>2</sup>", ""),
    ],
)

FA8 = lambda x: x * x - 4 * x - 5

a8 = naloga(
    "A8", "kvadratna_funkcija", 5,
    r"Dana je parabola \(y = x^2 - 4x - 5\). Izračunaj koordinati temena in presečišča s koordinatnima osema. Parabolo nariši.",
    r"\(T(2, -9)\); \((-1, 0)\), \((5, 0)\), \((0, -5)\)",
    [
        ("p = " + U("4", "2") + " = 2,  q = 4 − 8 − 5 = −9", "", "teme"),
        ("!T(2, −9)", ""),
        ("x<sup>2</sup> − 4x − 5 = (x + 1)(x − 5) = 0", "", "kvadratna"),
        ("!(−1, 0),  (5, 0),  (0, −5)", ""),
        ("@slika", graf([(FA8, MODRA)], (-1.6, 5.6), (-10, 5), [(2, -9, "T"), (-1, 0, ""), (5, 0, ""), (0, -5, ""), (4, -5, "")], sirina=240, visina=380)),
    ],
)

a9 = naloga(
    "A9", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(9 \cdot 3^{x - 1} = 1\).",
    r"\(x = -1\)",
    [
        ("3<sup>2</sup> · 3<sup>x − 1</sup> = 3<sup>0</sup>", "", "eksponentna"),
        ("x + 1 = 0", ""),
        ("!x = −1", ""),
    ],
)

# ------------------------------------------------------------------ 2. del


def risba_b1(X, Y):
    t = f'<polygon points="{X(0):.1f},{Y(0):.1f} {X(6):.1f},{Y(0):.1f} {X(2):.1f},{Y(4):.1f}" fill="{MODRA}" fill-opacity="0.15"/>'
    t += krivulja(X, Y, lambda x: 2 * x, -1, 3, MODRA) + krivulja(X, Y, lambda x: -x + 6, -1, 7, RDECA)
    t += tocka(X, Y, 2, 4, "P", 6, -4) + tocka(X, Y, 0, 0) + tocka(X, Y, 6, 0, "Q", 4, 14)
    return t


b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dani sta premici \(y = 2x\) in \(y = -x + 6\).<br>"
    r"1.1. Nariši premici v isti koordinatni sistem in izračunaj njuno presečišče. (6 točk)<br>"
    r"1.2. Izračunaj ploščino trikotnika, ki ga določata premici in abscisna os. (4 točke)<br>"
    r"1.3. Izračunaj največji notranji kot trikotnika na minuto natančno. (5 točk)",
    r"1.1. \(P(2, 4)\) &nbsp; 1.2. \(12\) &nbsp; 1.3. \(\approx 71^\circ 34'\)",
    [
        "## 1.1",
        ("@slika", mreza((-1, 7), (-2, 7), risba_b1, sirina=280)),
        ("2x = −x + 6  ⇒  x = 2", "", "sistem"),
        ("!P(2, 4)", ""),
        "## 1.2",
        ("oglišča: O(0, 0),  Q(6, 0),  P(2, 4)", "Q je ničla druge premice."),
        ("!S = " + U("|OQ| · v", "2") + " = " + U("6 · 4", "2") + " = 12", "Višina je ordinata točke P.", "ploscine"),
        "## 1.3",
        ("kot pri O: tan α = 2  ⇒  α ≈ 63,43°", "", "kotne"),
        ("kot pri Q: tan β = 1  ⇒  β = 45°", "Naklonski kot druge premice je 135°."),
        ("!kot pri P: 180° − 63,43° − 45° ≈ 71,57° = 71° 34′", ""),
    ],
)


def krog_b2():
    c, R = (100, 110), 80
    f = math.radians(34.92)
    A = (c[0] + R * math.sin(-f / 2), c[1] - R * math.cos(f / 2))
    B = (c[0] + R * math.sin(f / 2), c[1] - R * math.cos(f / 2))
    t = [f'<circle cx="{c[0]}" cy="{c[1]}" r="{R}" fill="none" stroke="currentColor" stroke-width="1.3"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{A[0]:.1f}" y2="{A[1]:.1f}" stroke="currentColor"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{B[0]:.1f}" y2="{B[1]:.1f}" stroke="currentColor"/>',
         f'<line x1="{A[0]:.1f}" y1="{A[1]:.1f}" x2="{B[0]:.1f}" y2="{B[1]:.1f}" stroke="{RDECA}" stroke-width="2"/>',
         f'<line x1="{c[0]}" y1="{c[1]}" x2="{c[0]}" y2="{A[1]:.1f}" stroke="currentColor" stroke-dasharray="3 3"/>',
         f'<circle cx="{c[0]}" cy="{c[1]}" r="2.5" fill="currentColor"/>',
         napis(c[0], A[1] - 6, "6 cm", 10, RDECA), napis(c[0] - 18, 80, "r", 12), napis(c[0] + 7, 94, "φ", 12, sidro="start"), napis(c[0] + 5, c[1] + 14, "S", 11)]
    return svg(200, 198, "".join(t), opis="Krog s tetivo in središčnim kotom")


b2 = naloga(
    "B2", "obsegi_ploscine", 15,
    r"Dan je krog s polmerom \(10\) cm.<br>"
    r"2.1. Izračunaj središčni kot, ki pripada \(6\) cm dolgi tetivi. Nariši skico. (4 točke)<br>"
    r"2.2. \(64\,\%\) kroga je pobarvanega z rdečo barvo. Koliko \(\mathrm{cm^2}\) meri pobarvani del? (6 točk)<br>"
    r"2.3. Izračunaj obseg in ploščino kvadrata, ki je krogu očrtan. (5 točk)",
    r"2.1. \(\varphi \approx 34^\circ 55'\) &nbsp; 2.2. \(\approx 201{,}06\ \mathrm{cm^2}\) &nbsp; 2.3. \(o = 80\) cm, \(S = 400\ \mathrm{cm^2}\)",
    [
        "## 2.1",
        ("@slika", krog_b2()),
        ("sin " + U("φ", "2") + " = " + U("3", "10") + " = 0,3", "Višina na tetivo jo razpolovi; dobimo pravokotni trikotnik s hipotenuzo r.", "kotne"),
        (U("φ", "2") + " ≈ 17,46°", ""),
        ("!φ ≈ 34,92° = 34° 55′", ""),
        "## 2.2",
        ("S<sub>k</sub> = π · 10<sup>2</sup> = 100π ≈ 314,16 cm<sup>2</sup>", "", "krog"),
        ("!0,64 · 100π = 64π ≈ 201,06 cm<sup>2</sup>", "", "odstotki"),
        "## 2.3",
        ("a = 2r = 20 cm", "Stranica očrtanega kvadrata je enaka premeru kroga."),
        ("!o = 4a = 80 cm,  S = a<sup>2</sup> = 400 cm<sup>2</sup>", "", "ploscine"),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Cene in Urška sta imela na začetku študija enako mesečno štipendijo, vsak po \(250\) EUR. Štipendija se jima je povečala vsakih \(12\) mesecev: Cenetu za \(10\,\%\), Urški pa za \(30\) EUR.<br>"
    r"3.1. Kolikšno mesečno štipendijo bo imel Cene po \(25\) mesecih? (4 točke)<br>"
    r"3.2. Kdo bo imel po \(30\) mesecih višjo mesečno štipendijo in za koliko odstotkov? (7 točk)<br>"
    r"3.3. Izračunaj vsoto vseh štipendij, ki jih bo Cene prejel v treh letih. (4 točke)",
    r"3.1. \(302{,}50\) EUR &nbsp; 3.2. Urška, za \(\approx 2{,}48\,\%\) &nbsp; 3.3. \(9930\) EUR",
    [
        "## 3.1",
        ("po 25 mesecih sta bili 2 povišici", "Povišici po 12 in po 24 mesecih."),
        ("!250 · 1,1<sup>2</sup> = 302,50 EUR", "Cenetova štipendija je geometrijsko zaporedje s q = 1,1.", "geometrijsko"),
        "## 3.2",
        ("po 30 mesecih: Cene 302,50 EUR,  Urška 250 + 2 · 30 = 310 EUR", "Urškina štipendija je aritmetično zaporedje z d = 30.", "aritmeticno"),
        ("p = " + U("310 − 302,50", "302,50") + " · 100 %", "Primerjamo s Cenetovo štipendijo.", "odstotki"),
        ("!Urška, za ≈ 2,48 %", ""),
        "## 3.3",
        ("12 · (250 + 275 + 302,50) = 12 · 827,50", "V vsakem letu prejme 12 enakih štipendij."),
        ("!9930 EUR", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
