# Jesenski rok 2018 (uradna pola RIC P182-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2018, "jesenski", "ponedeljek, 27. avgust 2018"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "ulomki_odstotki", 4,
    r"Brez računala izračunaj: \(\dfrac{5}{6} : \left(\dfrac{1}{3} - 2\right)^{-1}\).",
    r"\(-\frac{25}{18}\)",
    [
        (U("1", "3") + " − 2 = −" + U("5", "3"), ""),
        ("(−" + U("5", "3") + ")<sup>−1</sup> = −" + U("3", "5"), "Potenca z eksponentom −1 je obratna vrednost."),
        (U("5", "6") + " : (−" + U("3", "5") + ") = " + U("5", "6") + " · (−" + U("5", "3") + ")", "Delimo tako, da množimo z obratno vrednostjo."),
        ("!= −" + U("25", "18"), ""),
    ],
)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Poenostavi izraz \(\sqrt{2x^3y^5} \cdot \sqrt{18x^5y}\) za \(x, y \ge 0\).",
    r"\(6x^4y^3\)",
    [
        (K("2x<sup>3</sup>y<sup>5</sup> · 18x<sup>5</sup>y") + " = " + K("36x<sup>8</sup>y<sup>6</sup>"), "Korena z enakim korenskim eksponentom zmnožimo pod enim korenom.", "koreni"),
        ("!= 6x<sup>4</sup>y<sup>3</sup>", "Iz vsakega faktorja s sodim eksponentom korenimo tako, da eksponent razpolovimo."),
    ],
)

a3 = naloga(
    "A3", "stevila_deljivost", 4,
    r"Dano je število \(13579000097531a\), kjer je \(a\) zadnja števka. Za vsako od števil \(2\), \(3\), \(4\) in \(5\) zapiši vse možnosti za "
    r"števko \(a\), pri katerih je dano število deljivo s tem številom.",
    r"z \(2\): \(0, 2, 4, 6, 8\); s \(3\): \(1, 4, 7\); s \(4\): \(2, 6\); s \(5\): \(0, 5\)",
    [
        ("!deljivo z 2: a ∈ {0, 2, 4, 6, 8}", "Zadnja števka je soda."),
        ("vsota števk: 1 + 3 + 5 + 7 + 9 + 9 + 7 + 5 + 3 + 1 + a = 50 + a", ""),
        ("!deljivo s 3: a ∈ {1, 4, 7}", "Vsota števk (51, 54, 57) mora biti deljiva s 3."),
        ("!deljivo s 4: a ∈ {2, 6}", "Dvomestni konec 1a mora biti deljiv s 4: 12 in 16."),
        ("!deljivo s 5: a ∈ {0, 5}", ""),
    ],
)

a4 = naloga(
    "A4", "linearna_funkcija", 4,
    r"Izračunaj presečišče premic \(x + y = 3{,}5\) in \(3x - 2y = 3\).",
    r"\(P(2;\ 1{,}5)\)",
    [
        ("x = 3,5 − y  ⇒  3(3,5 − y) − 2y = 3", "", "sistem"),
        ("10,5 − 5y = 3  ⇒  y = 1,5", ""),
        ("!x = 2,  P(2; 1,5)", ""),
    ],
)

a5 = naloga(
    "A5", "kombinatorika_verjetnost", 4,
    r"Eva ima pet knjig: rumeno, rdečo, zeleno in dve različni modri. Na koliko načinov jih lahko zloži na kup, eno na drugo, če želi, da sta "
    r"modri knjigi skupaj?",
    r"\(48\)",
    [
        ("modri knjigi združimo v en »blok«: razporejamo 4 enote", ""),
        ("4! = 24", "", "kombinatorika"),
        ("znotraj bloka: 2! = 2", "Modri knjigi lahko zamenjamo."),
        ("!24 · 2 = 48", ""),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 4,
    r"Miha je na začetku leta na varčevalni račun položil \(4000\) €. Banka ob koncu vsakega leta pripiše \(3\,\%\) obresti (obrestno obrestovanje). "
    r"Najmanj koliko let mora varčevati, da bo na računu več kot \(5000\) €?",
    r"\(8\) let",
    [
        ("4000 · 1,03<sup>n</sup> > 5000  ⇒  1,03<sup>n</sup> > 1,25", "", "obresti"),
        ("n > " + U("log 1,25", "log 1,03") + " ≈ 7,55", "", "log_pravila"),
        ("!najmanj 8 let", ""),
    ],
)

a7 = naloga(
    "A7", "odvod_pm", 4,
    r"Zapiši smerni koeficient tangente na graf funkcije \(f(x) = \dfrac{x + 3}{x - 2}\) v točki \(T(3, 6)\).",
    r"\(k = -5\)",
    [
        ("f '(x) = " + U("(x − 2) − (x + 3)", "(x − 2)<sup>2</sup>") + " = " + U("−5", "(x − 2)<sup>2</sup>"), "Odvod kvocienta.", "odvod"),
        ("!k = f '(3) = −5", "Smerni koeficient tangente je vrednost odvoda v dotikališču."),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(\log(x + 2) + \log(x - 1) = \log(2x + 4)\).",
    r"\(x = 3\)",
    [
        ("pogoj: x > 1", "Vsi logaritmandi morajo biti pozitivni."),
        ("log((x + 2)(x − 1)) = log(2x + 4)", "Vsota logaritmov je logaritem produkta.", "log_pravila"),
        ("x<sup>2</sup> + x − 2 = 2x + 4  ⇒  x<sup>2</sup> − x − 6 = 0", ""),
        ("(x − 3)(x + 2) = 0", ""),
        ("!x = 3", "x = −2 ne ustreza pogoju."),
    ],
)

a9 = naloga(
    "A9", "trikotnik_kotne", 5,
    r"Izračunaj velikost največjega kota v trikotniku s stranicami \(a = 5\) cm, \(b = 8\) cm in \(c = 11\) cm.",
    r"\(\gamma \approx 113{,}58^\circ\)",
    [
        ("največji kot leži nasproti najdaljše stranice c", ""),
        ("cos γ = " + U("5<sup>2</sup> + 8<sup>2</sup> − 11<sup>2</sup>", "2 · 5 · 8") + " = " + U("−32", "80") + " = −0,4", "", "kosinusni"),
        ("!γ ≈ 113,58°", ""),
    ],
)

a10 = naloga(
    "A10", "kvadratna_funkcija", 6,
    r"Parabola je dana z enačbo \(y = x^2 - 6x + 8\). Izračunaj teme parabole in presečišča s koordinatnima osema ter parabolo nariši.",
    r"\(T(3, -1)\); \((2, 0)\), \((4, 0)\), \((0, 8)\)",
    [
        ("p = " + U("6", "2") + " = 3,  q = 9 − 18 + 8 = −1", "", "teme"),
        ("!T(3, −1)", ""),
        ("(x − 2)(x − 4) = 0", "", "vieta"),
        ("!presečišči z osjo x: (2, 0), (4, 0);  z osjo y: (0, 8)", ""),
        ("@slika", graf([(lambda x: x * x - 6 * x + 8, MODRA)], (-1, 7), (-2, 9), [(2, 0, ""), (4, 0, ""), (3, -1, "T"), (0, 8, "")], sirina=260, visina=300)),
    ],
)


def cvet():
    a = 60
    cx, cy = 110, 100
    x0, y0 = cx - a / 2, cy - a / 2
    r = a / 2
    t = [f'<path d="M {x0} {y0} A {r} {r} 0 0 1 {x0 + a} {y0} Z" fill="{MODRA}" fill-opacity="0.55" stroke="currentColor"/>',
         f'<path d="M {x0 + a} {y0} A {r} {r} 0 0 1 {x0 + a} {y0 + a} Z" fill="{MODRA}" fill-opacity="0.55" stroke="currentColor"/>',
         f'<path d="M {x0 + a} {y0 + a} A {r} {r} 0 0 1 {x0} {y0 + a} Z" fill="{MODRA}" fill-opacity="0.55" stroke="currentColor"/>',
         f'<path d="M {x0} {y0 + a} A {r} {r} 0 0 1 {x0} {y0} Z" fill="{MODRA}" fill-opacity="0.55" stroke="currentColor"/>',
         f'<rect x="{x0}" y="{y0}" width="{a}" height="{a}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{x0}" y1="{y0 + a}" x2="{x0 + a}" y2="{y0}" stroke="currentColor" stroke-dasharray="3 3"/>']
    return svg(220, 200, "".join(t), opis="Kvadrat s štirimi polkrogi")

a11 = naloga(
    "A11", "obsegi_ploscine", 6,
    r"Na sliki je kvadrat z diagonalo dolžine \(5\sqrt{2}\) cm in štirje polkrogi, katerih premer je enak stranici kvadrata. Izračunaj ploščino "
    r"osenčenega dela (polkrogov)." + cvet(),
    r"\(S = 12{,}5\pi \approx 39{,}27\ \mathrm{cm^2}\)",
    [
        ("a" + K("2") + " = 5" + K("2") + "  ⇒  a = 5 cm", "Diagonala kvadrata je a√2."),
        ("r = " + U("a", "2") + " = 2,5 cm", ""),
        ("S = 4 · " + U("π r<sup>2</sup>", "2") + " = 2π · 2,5<sup>2</sup>", "Štirje polkrogi skupaj sta dva kroga.", "krog"),
        ("!S = 12,5π ≈ 39,27 cm<sup>2</sup>", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
def palica():
    t = [f'<polygon points="20,110 80,110 70,60 30,60" fill="{MODRA}" fill-opacity="0.25" stroke="currentColor"/>',
         f'<polygon points="30,60 70,60 190,20 150,20" fill="{MODRA}" fill-opacity="0.12" stroke="currentColor"/>',
         f'<polygon points="80,110 70,60 190,20 200,70" fill="{MODRA}" fill-opacity="0.18" stroke="currentColor"/>',
         napis(130, 100, "d", 12),
         f'<polygon points="240,110 360,110 323,50 277,50" fill="{MODRA}" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="277" y1="50" x2="277" y2="110" stroke="currentColor" stroke-dasharray="3 3"/>',
         napis(236, 122, "A", 12), napis(364, 122, "B", 12), napis(330, 46, "C", 12), napis(270, 46, "D", 12),
         napis(300, 124, "a", 12), napis(300, 45, "c", 12), napis(284, 84, "v", 12)]
    return svg(380, 130, "".join(t), opis="Zlata palica in njena osnovna ploskev")

b1 = naloga(
    "B1", ["povrsine_prostornine", "ulomki_odstotki"], 10,
    r"Zlata palica ima obliko štiristrane pokončne prizme. Osnovna ploskev je enakokraki trapez z osnovnicama \(a = 12\) cm in \(c = 7\) cm ter "
    r"višino \(v = 6\) cm. Dolžina palice je \(d = 30\) cm." + palica()
    + r"1.1. Izračunaj maso palice, če je gostota zlata \(\rho = 19\,300\ \mathrm{kg/m^3}\) (\(m = V \cdot \rho\)). (6 točk)<br>"
    r"1.2. Kolikšna bi bila cena zlate palice z maso \(12{,}5\) kg, če gram zlata stane \(52{,}40\) €? (4 točke)",
    r"1.1. \(m \approx 33{,}0\) kg &nbsp; 1.2. \(655\,000\) €",
    [
        "## 1.1",
        ("S = " + U("12 + 7", "2") + " · 6 = 57 cm<sup>2</sup>", "Ploščina trapeza.", "ploscine"),
        ("V = S · d = 57 · 30 = 1710 cm<sup>3</sup> = 0,00171 m<sup>3</sup>", "1 m³ = 1 000 000 cm³.", "telesa"),
        ("!m = 0,00171 · 19 300 ≈ 33,0 kg", ""),
        "## 1.2",
        ("12,5 kg = 12 500 g", ""),
        ("!cena = 12 500 · 52,40 = 655 000 €", ""),
    ],
)

b2 = naloga(
    "B2", "zaporedja_pm", 10,
    r"Dano je aritmetično zaporedje s splošnim členom \(a_n = \frac{1}{3}n + 1\).<br>"
    r"2.1. Izračunaj prve štiri člene zaporedja in nariši njegov graf. (5 točk)<br>"
    r"2.2. Izračunaj vsoto členov od vključno \(51.\) do vključno \(100.\) člena. (5 točk)",
    r"2.1. \(\frac{4}{3}, \frac{5}{3}, 2, \frac{7}{3}\) &nbsp; 2.2. \(\frac{3925}{3} \approx 1308{,}33\)",
    [
        "## 2.1",
        ("!a<sub>1</sub> = " + U("4", "3") + ",  a<sub>2</sub> = " + U("5", "3") + ",  a<sub>3</sub> = 2,  a<sub>4</sub> = " + U("7", "3"), "Vstavimo n = 1, 2, 3, 4."),
        ("@slika", graf([], (-0.5, 5.5), (-0.5, 3), [(n, n / 3 + 1, "") for n in range(1, 5)], sirina=260, visina=180)),
        (None, "Graf zaporedja so posamezne točke (n, aₙ), ne sklenjena premica."),
        "## 2.2",
        ("a<sub>51</sub> = 17 + 1 = 18,  a<sub>100</sub> = " + U("100", "3") + " + 1 = " + U("103", "3"), ""),
        ("s = " + U("50", "2") + " · (18 + " + U("103", "3") + ") = 25 · " + U("157", "3"), "Teh členov je 50; vsota aritmetičnega zaporedja.", "aritmeticno"),
        ("!s = " + U("3925", "3") + " ≈ 1308,33", ""),
    ],
)

DNEVI = ["ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota", "nedelja"]
LUKA = [14, 16, 12, 10, 18, 20, 10]
BLAZ = [32, 30, 24, None, 36, 40, 20]


def torta_b3():
    cx, cy, r = 105, 105, 88
    t, a = [], 90.0
    for i, (d, p) in enumerate(zip(DNEVI, LUKA)):
        da = 3.6 * p
        a1, a2 = math.radians(a), math.radians(a - da)
        t.append(f'<path d="M {cx} {cy} L {cx + r * math.cos(a1):.1f} {cy - r * math.sin(a1):.1f} A {r} {r} 0 0 1 {cx + r * math.cos(a2):.1f} {cy - r * math.sin(a2):.1f} Z" '
                 f'fill="{MODRA}" fill-opacity="{0.12 + 0.08 * i:.2f}" stroke="currentColor" stroke-width="0.8"/>')
        s = math.radians(a - da / 2)
        t.append(napis(cx + 0.64 * r * math.cos(s), cy - 0.64 * r * math.sin(s) - 2, d[:3] + ".", 9.5) + napis(cx + 0.64 * r * math.cos(s), cy - 0.64 * r * math.sin(s) + 10, f"{p} %", 10))
        a -= da
    return svg(210, 210, "".join(t), opis="Luka: deleži kilometrov po dnevih")


def stolpci_b3():
    H = 190
    t = []
    for i, (d, v) in enumerate(zip(DNEVI, BLAZ)):
        x = 20 + i * 38
        if v:
            t.append(f'<rect x="{x}" y="{H - 30 - v * 3.5:.1f}" width="24" height="{v * 3.5:.1f}" fill="{MODRA}" fill-opacity="0.75"/>' + napis(x + 12, H - 34 - v * 3.5, str(v), 10))
        else:
            t.append(napis(x + 12, H - 36, "?", 13))
        t.append(napis(x + 12, H - 14, d[:3] + ".", 10))
    t.append(f'<line x1="14" y1="{H - 30}" x2="{20 + 7 * 38}" y2="{H - 30}" stroke="currentColor"/>')
    return svg(290, H, "".join(t), opis="Blaž: kilometri po dnevih")


def linijski_b3():
    vr = [32, 30, 24, 18, 36, 40, 20]
    H, L = 200, 30
    t = []
    for v in range(0, 41, 10):
        y = H - 30 - v * 3.8
        t.append(f'<line x1="{L}" y1="{y:.1f}" x2="{L + 6 * 38 + 10}" y2="{y:.1f}" stroke="currentColor" stroke-opacity="0.15"/>' + napis(L - 4, y + 3, str(v), 9, sidro="end"))
    pts = " ".join(f"{L + 5 + i * 38},{H - 30 - v * 3.8:.1f}" for i, v in enumerate(vr))
    t.append(f'<polyline points="{pts}" fill="none" stroke="{MODRA}" stroke-width="2"/>')
    for i, v in enumerate(vr):
        t.append(f'<circle cx="{L + 5 + i * 38}" cy="{H - 30 - v * 3.8:.1f}" r="3" fill="{MODRA}"/>' + napis(L + 5 + i * 38, H - 14, DNEVI[i][:3] + ".", 9))
    return svg(L + 6 * 38 + 30, H, "".join(t), opis="Linijski diagram Blaževih kilometrov")

b3 = naloga(
    "B3", "statistika_pm", 10,
    r"Luka in Blaž sta se pripravljala na tek. Ugotovila sta, da sta v zadnjem tednu pretekla enako število kilometrov. Tortni diagram kaže, koliko "
    r"odstotkov vseh svojih kilometrov je Luka pretekel na posamezen dan:" + torta_b3()
    + r"Stolpčni diagram kaže, koliko kilometrov je pretekel Blaž (podatek za četrtek manjka):" + stolpci_b3()
    + r"3.1. Izračunaj, koliko kilometrov je Luka pretekel na posamezen dan, če sta v sredo oba pretekla enako. (5 točk)<br>"
    r"3.2. Izračunaj, koliko kilometrov je Blaž pretekel v četrtek, in njegove kilometre po dnevih prikaži z linijskim diagramom. (5 točk)",
    r"3.1. \(28, 32, 24, 20, 36, 40, 20\) km &nbsp; 3.2. \(18\) km",
    [
        "## 3.1",
        ("12 % vseh Lukovih km = 24 km  ⇒  vseh = 24 : 0,12 = 200 km", "V sredo je Blaž pretekel 24 km.", "odstotki"),
        ("@slika", tabela(["dan"] + [d[:3] + "." for d in DNEVI], [["km"] + [str(p * 2) for p in LUKA]])),
        (None, "Vsak odstotek pomnožimo z 200 km."),
        "## 3.2",
        ("Blaž skupaj tudi 200 km", "Pretekla sta enako."),
        ("!četrtek: 200 − (32 + 30 + 24 + 36 + 40 + 20) = 200 − 182 = 18 km", ""),
        ("@slika", linijski_b3()),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
