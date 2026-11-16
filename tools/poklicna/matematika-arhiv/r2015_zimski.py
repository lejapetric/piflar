# Zimski rok 2015 (uradna pola RIC P153-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2015, "zimski", "torek, 2. februar 2016"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "zaporedja_pm", 4,
    r"Natančno izračunaj diferenco in deseti člen aritmetičnega zaporedja, če velja \(a_1 = 3\) in \(a_2 = 3 - \sqrt{2}\).",
    r"\(d = -\sqrt{2}\), \(a_{10} = 3 - 9\sqrt{2}\)",
    [
        ("!d = a<sub>2</sub> − a<sub>1</sub> = 3 − " + K("2") + " − 3 = −" + K("2"), "", "aritmeticno"),
        ("a<sub>10</sub> = a<sub>1</sub> + 9d", ""),
        ("!a<sub>10</sub> = 3 − 9" + K("2"), "Rezultat pustimo v natančni obliki."),
    ],
)


def krogi_a2():
    c, R = 80, 60
    pot = lambda cx, cy, r: f"M {cx - r} {cy} a {r} {r} 0 1 0 {2 * r} 0 a {r} {r} 0 1 0 {-2 * r} 0 Z"
    t = [f'<circle cx="{c}" cy="{c}" r="{R}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="{pot(c, c - 30, 30)} {pot(c, c + 30, 30)}" fill="{MODRA}" fill-opacity="0.35" stroke="currentColor" stroke-width="1.2"/>',
         f'<line x1="{c}" y1="{c - R}" x2="{c}" y2="{c + R}" stroke="currentColor"/>',
         napis(c - 12, c - 26, "S₁", 11), napis(c - 14, c + 4, "S", 11), napis(c - 12, c + 34, "S₂", 11),
         f'<circle cx="{c}" cy="{c}" r="2" fill="currentColor"/>']
    return svg(160, 160, "".join(t), opis="Velik krog z dvema osenčenima manjšima krogoma")

a2 = naloga(
    "A2", "obsegi_ploscine", 4,
    r"Izračunaj ploščino osenčenega lika na sliki, če je premer velikega kroga \(12\) cm." + krogi_a2(),
    r"\(18\pi\ \mathrm{cm^2} \approx 56{,}55\ \mathrm{cm^2}\)",
    [
        ("R = 6 cm,  r = " + U("R", "2") + " = 3 cm", "Premera malih krogov skupaj tvorita premer velikega kroga."),
        ("p = 2 · πr<sup>2</sup> = 2 · 9π", "", "krog"),
        ("!p = 18π cm<sup>2</sup> ≈ 56,55 cm<sup>2</sup>", ""),
    ],
)

a3 = naloga(
    "A3", "stevila_deljivost", 4,
    r"Števili \(84\) in \(120\) zapiši kot produkt praštevil in izračunaj njun največji skupni delitelj.",
    r"\(84 = 2^2 \cdot 3 \cdot 7\), \(120 = 2^3 \cdot 3 \cdot 5\), \(D(84, 120) = 12\)",
    [
        ("!84 = 2<sup>2</sup> · 3 · 7", ""),
        ("!120 = 2<sup>3</sup> · 3 · 5", ""),
        ("!D(84, 120) = 2<sup>2</sup> · 3 = 12", "Vzamemo skupne prafaktorje z najmanjšimi eksponenti."),
    ],
)

a4 = naloga(
    "A4", "kotne_funkcije_pm", 4,
    r"Izračunaj vrednosti \(\sin\alpha\) in \(\tan\alpha\), če je \(\cos\alpha = -\frac{2}{5}\) in \(90^\circ < \alpha < 180^\circ\).",
    r"\(\sin\alpha = \frac{\sqrt{21}}{5}\), \(\tan\alpha = -\frac{\sqrt{21}}{2}\)",
    [
        ("sin<sup>2</sup> α = 1 − cos<sup>2</sup> α = 1 − " + U("4", "25") + " = " + U("21", "25"), "", "kotne"),
        ("!sin α = " + U(K("21"), "5"), "V 2. kvadrantu je sinus pozitiven."),
        ("!tan α = " + U("sin α", "cos α") + " = " + U(K("21"), "5") + " : (−" + U("2", "5") + ") = −" + U(K("21"), "2"), ""),
    ],
)

a5 = naloga(
    "A5", "ulomki_odstotki", 4,
    r"Avtomobil je v treh letih izgubil \(35\,\%\) svoje vrednosti, tako da je zdaj vreden \(7280\) EUR. Kolikšna je bila njegova cena pred tremi leti?",
    r"\(11\,200\) EUR",
    [
        ("zdaj: 100 % − 35 % = 65 %", ""),
        ("0,65 · x = 7280", "", "odstotki"),
        ("!x = 11 200 EUR", "Pred tremi leti je avtomobil stal 11 200 EUR."),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(2^{x^2} \cdot 2^{x} = 64\).",
    r"\(x_1 = 2\), \(x_2 = -3\)",
    [
        ("2<sup>x² + x</sup> = 2<sup>6</sup>", "Pri množenju potenc z isto osnovo eksponente seštejemo.", "eksponentna"),
        ("x<sup>2</sup> + x − 6 = 0", ""),
        ("(x − 2)(x + 3) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = 2,  x<sub>2</sub> = −3", ""),
    ],
)

a7 = naloga(
    "A7", "povrsine_prostornine", 5,
    r"Kup peska v obliki pokončnega stožca z višino \(1{,}5\) m in polmerom \(2\) m bomo porabili za zasutje jarka v obliki kvadra "
    r"z globino \(0{,}5\) m in širino \(0{,}6\) m. Koliko metrov jarka bomo lahko zasuli?",
    r"\(\approx 20{,}9\) m",
    [
        ("V<sub>stožca</sub> = " + U("1", "3") + "πr<sup>2</sup>v = " + U("1", "3") + "π · 4 · 1,5 = 2π m<sup>3</sup> ≈ 6,283 m<sup>3</sup>", "", "telesa"),
        ("V<sub>jarka</sub> = 0,5 · 0,6 · d = 0,3d", "d je dolžina jarka."),
        ("0,3d = 2π  ⇒  d ≈ 20,94 m", ""),
        ("!Zasuli bomo približno 20,9 m jarka.", ""),
    ],
)

a8 = naloga(
    "A8", "linearna_funkcija", 5,
    r"Zapiši enačbo premice na sliki in izračunaj ploščino lika med premico in koordinatnima osema."
    + graf([(lambda x: 4 / 3 * x + 4, "currentColor")], (-6, 3), (-4, 7), [], sirina=260, visina=310),
    r"\(y = \frac{4}{3}x + 4\), \(p = 6\)",
    [
        ("presečišči: (−3, 0) in (0, 4)", "Odčitamo s slike."),
        ("k = " + U("4 − 0", "0 − (−3)") + " = " + U("4", "3") + ",  n = 4", "", "premica"),
        ("!y = " + U("4", "3") + "x + 4", ""),
        ("!p = " + U("3 · 4", "2") + " = 6", "Lik je pravokotni trikotnik s katetama 3 in 4."),
    ],
)

a9 = naloga(
    "A9", "kvadratna_funkcija", 5,
    r"Nariši graf kvadratne funkcije \(f(x) = -x^2 + 2x + 3\).",
    r"Ničli \(-1\) in \(3\), teme \(T(1, 4)\), \(f(0) = 3\)",
    [
        ("−x<sup>2</sup> + 2x + 3 = −(x − 3)(x + 1)  ⇒  x<sub>1</sub> = −1, x<sub>2</sub> = 3", "Ničli.", "kvadratna"),
        ("p = −" + U("2", "−2") + " = 1,  q = f(1) = 4", "", "teme"),
        ("f(0) = 3", "Začetna vrednost."),
        ("@slika", graf([(lambda x: -x * x + 2 * x + 3, MODRA)], (-3, 5), (-5, 5), [(-1, 0, ""), (3, 0, ""), (1, 4, "T"), (0, 3, "")], sirina=280, visina=330)),
        ("!a = −1 < 0: parabola je odprta navzdol.", ""),
    ],
)

# ------------------------------------------------------------------ 2. del
def trikotnik_b1(resitev=False):
    k = 26
    X = lambda x: 20 + x * k
    Y = lambda y: 150 - y * k
    C = ((64 + 36 - 25) / 16, math.sqrt(36 - ((64 + 36 - 25) / 16) ** 2))
    t = [f'<polygon points="{X(0)},{Y(0)} {X(8)},{Y(0)} {X(C[0]):.1f},{Y(C[1]):.1f}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         napis(X(0) - 9, Y(0) + 4, "A"), napis(X(8) + 9, Y(0) + 4, "B"), napis(X(C[0]), Y(C[1]) - 8, "C")]
    if resitev:
        for (sx, sy), r in (((0, 0), 6), ((8, 0), 5)):
            ang = math.degrees(math.atan2(C[1] - sy, C[0] - sx))
            a0, a1 = math.radians(ang - 14), math.radians(ang + 14)
            t.append(f'<path d="M {X(sx + r * math.cos(a0)):.1f} {Y(sy + r * math.sin(a0)):.1f} A {r * k} {r * k} 0 0 0 '
                     f'{X(sx + r * math.cos(a1)):.1f} {Y(sy + r * math.sin(a1)):.1f}" fill="none" stroke="{RDECA}" stroke-width="1.2"/>')
        t.append(napis(X(4), Y(0) + 16, "c = 8 cm", 11))
    else:
        t += [napis(X(4), Y(0) + 16, "c = 8", 11), napis(X(C[0] / 2) - 14, Y(C[1] / 2), "b = 6", 11), napis(X((8 + C[0]) / 2) + 18, Y(C[1] / 2), "a = 5", 11),
              napis(X(C[0]), Y(C[1]) + 18, "γ", 11)]
    return svg(250, 175, "".join(t), opis="Trikotnik ABC" + (" – konstrukcija" if resitev else " – skica"))

b1 = naloga(
    "B1", "trikotnik_kotne", 15,
    r"Dan je trikotnik \(ABC\) s stranicami \(a = 5\) cm, \(b = 6\) cm in \(c = 8\) cm.<br>"
    r"1.1. Nariši skico in konstruiraj trikotnik \(ABC\) z ravnilom in šestilom. (3 točke)<br>"
    r"1.2. Izračunaj obseg in ploščino trikotnika \(ABC\). (6 točk)<br>"
    r"1.3. Izračunaj velikost kota \(\gamma\) v stopinjah in minutah. (6 točk)",
    r"1.1. konstrukcija &nbsp; 1.2. \(o = 19\) cm, \(p \approx 14{,}98\ \mathrm{cm^2}\) &nbsp; 1.3. \(\gamma \approx 92^\circ 52'\)",
    [
        "## 1.1",
        ("@slika", trikotnik_b1()),
        ("Narišemo AB = 8 cm; lok s središčem A in polmerom 6 cm ter lok s središčem B in polmerom 5 cm se sekata v C.", "", "konstrukcija"),
        ("@slika", trikotnik_b1(True)),
        "## 1.2",
        ("!o = 5 + 6 + 8 = 19 cm", ""),
        ("s = " + U("19", "2") + " = 9,5 cm", "Heronov obrazec.", "ploscine"),
        ("p = " + K("9,5 · 4,5 · 3,5 · 1,5") + " = " + K("224,4375"), ""),
        ("!p ≈ 14,98 cm<sup>2</sup>", ""),
        "## 1.3",
        ("cos γ = " + U("a<sup>2</sup> + b<sup>2</sup> − c<sup>2</sup>", "2ab") + " = " + U("25 + 36 − 64", "60") + " = −0,05", "", "kosinusni"),
        ("γ ≈ 92,866°", "Kosinus je negativen, kot je top."),
        ("!γ ≈ 92° 52'", "0,866° · 60 ≈ 52'."),
    ],
)

F = lambda x: (x - 3) / (x - 1) ** 2

b2 = naloga(
    "B2", "polinomi_racionalna", 15,
    r"Racionalna funkcija \(f\) je dana s predpisom \(f(x) = \dfrac{x - 3}{x^2 - 2x + 1}\).<br>"
    r"2.1. Zapiši ničlo, pol, začetno vrednost, enačbo vodoravne asimptote in definicijsko območje. (5 točk)<br>"
    r"2.2. Nariši graf funkcije \(f\). Ekstrema ni treba izračunati. (6 točk)<br>"
    r"2.3. Zapiši, za katere \(x\) je funkcija \(f\) pozitivna. Ali je funkcija navzgor omejena? Ali je navzdol omejena? (4 točke)",
    r"2.1. ničla \(3\), pol \(1\) (dvojni), \(f(0) = -3\), \(y = 0\), \(D_f = \mathbb{R} \setminus \{1\}\) &nbsp; 2.3. \(x \in (3, \infty)\); navzgor omejena, navzdol ne",
    [
        "## 2.1",
        ("x<sup>2</sup> − 2x + 1 = (x − 1)<sup>2</sup>", "", "racionalna"),
        ("!ničla: x = 3", ""),
        ("!pol: x<sub>1,2</sub> = 1 (dvojni pol)", "Funkcija na obeh straneh pola ohrani predznak."),
        ("!f(0) = " + U("−3", "1") + " = −3", ""),
        ("!vodoravna asimptota: y = 0", "Stopnja števca je manjša od stopnje imenovalca."),
        ("!D<sub>f</sub> = ℝ − {1}", "", "D_v"),
        "## 2.2",
        ("@slika", graf([(F, MODRA)], (-4, 8), (-6, 3), [(3, 0, ""), (0, -3, "")], sirina=320, visina=260)),
        (None, "Ob dvojnem polu x = 1 gresta obe veji proti −∞."),
        "## 2.3",
        ("!f(x) > 0 za x ∈ (3, ∞)", "Imenovalec je vedno pozitiven, zato odloča števec x − 3.", "neenacba"),
        ("!navzgor omejena: da", "Za x > 3 doseže največjo vrednost (pri x = 5 je f = 1/8) in se nato bliža 0."),
        ("!navzdol omejena: ne", "Ob polu gre graf proti −∞."),
    ],
)

b3 = naloga(
    "B3", "kombinatorika_verjetnost", 15,
    r"V razredu je \(30\) dijakov, od tega \(12\) fantov in \(18\) deklet.<br>"
    r"3.1. Z avtobusom se v šolo vozi \(25\,\%\) fantov, deklet pa se z avtobusom vozi \(4\) več kot fantov. Koliko fantov in koliko deklet se vozi z avtobusom? (4 točke)<br>"
    r"3.2. Koliko je vseh mogočih izborov predsednika, tajnika in blagajnika razreda, če vsak dijak lahko opravlja le eno funkcijo? (5 točk)<br>"
    r"3.3. Šest dijakov ni imelo domače naloge. Učitelj za pregled naloge naključno izbere dva dijaka. Izračunaj verjetnost, da oba izbrana nista imela domače naloge. (6 točk)",
    r"3.1. \(3\) fantje, \(7\) deklet &nbsp; 3.2. \(24\,360\) &nbsp; 3.3. \(P = \frac{1}{29} \approx 0{,}034\)",
    [
        "## 3.1",
        ("!fantje: 0,25 · 12 = 3", "", "odstotki"),
        ("!dekleta: 3 + 4 = 7", ""),
        "## 3.2",
        ("V<sub>3</sub><sup>30</sup> = 30 · 29 · 28", "Vrstni red je pomemben (različne funkcije), ponavljanja ni.", "kombinatorika"),
        ("!24 360 izborov", ""),
        "## 3.3",
        ("vse možnosti: C<sub>2</sub><sup>30</sup> = " + U("30 · 29", "2") + " = 435", ""),
        ("ugodne: C<sub>2</sub><sup>6</sup> = 15", ""),
        ("!P = " + U("15", "435") + " = " + U("1", "29") + " ≈ 0,034", "", "verjetnost"),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
