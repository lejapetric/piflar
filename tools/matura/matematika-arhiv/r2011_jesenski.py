# Jesenski rok 2011 (uradne pole RIC: m112-401-1-1, m112-402-1-1, m112-402-1-2)
# Do leta 2011 je imela izpitna pola 2 višje ravni tri obvezne strukturirane naloge.
import math
from lib import (U, K, V, LIM, INT, MEJA, BINOM, SISTEM, naloga, tabela, mreza, krivulja, parametricna,
                 tocka, svg, graf, MODRA, RDECA)

LETO, ROK = 2011, "jesenski"
FUN = "/views/matematika/snov/funkcije/"


def venn(pogoj, tri=False, napis=""):
    """Vennov diagram dveh (ali treh) množic; osenčen je del, kjer velja pogoj(a, b, c)."""
    S = {"A": (62, 62), "B": (108, 62), "C": (85, 100)} if tri else {"A": (65, 62), "B": (115, 62)}
    r = 38
    sir, vis = 180, (150 if tri else 124)
    v = lambda x, y, k: (x - S[k][0]) ** 2 + (y - S[k][1]) ** 2 <= r * r
    t = [f'<rect x="4" y="4" width="{sir - 8}" height="{vis - 8}" fill="none" stroke="currentColor" stroke-width="1"/>']
    korak = 2
    for y in range(6, vis - 6, korak):
        x0 = None
        for x in range(6, sir - 4, korak):
            ok = pogoj(v(x, y, "A"), v(x, y, "B"), v(x, y, "C") if tri else False)
            if ok and x0 is None:
                x0 = x
            if (not ok or x >= sir - 6) and x0 is not None:
                t.append(f'<rect x="{x0}" y="{y}" width="{x - x0}" height="{korak}" fill="{MODRA}" fill-opacity="0.35"/>')
                x0 = None
    for k, (cx, cy) in S.items():
        t.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="currentColor" stroke-width="1.5"/>')
    pos = {"A": (18, 24), "B": (152, 24), "C": (150, 140)} if tri else {"A": (18, 24), "B": (156, 24)}
    for k, (x, y) in pos.items():
        t.append(f'<text x="{x}" y="{y}" font-size="13" fill="currentColor">{k}</text>')
    return svg(sir, vis, "".join(t), opis=napis or "Vennov diagram")


# ------------------------------------------------------------------ izpitna pola 1
n1 = naloga(
    1, "mnozice", 6,
    r"Na Vennovih diagramih označi (osenči) množice:<br>"
    r"a) \(B \setminus A\) &nbsp; b) \(A \cap B\) &nbsp; c) \((A \cup B) \setminus (A \cap B)\) &nbsp; d) \(A \cup B\) &nbsp; "
    r"e) \((A \cap B) \cup C\) &nbsp; f) \((B \cup C) \setminus A\)<br>"
    r"(Pri a)–d) imamo množici \(A\) in \(B\), pri e) in f) pa še množico \(C\).)",
    r"glej osenčene diagrame v rešitvi",
    [
        ("@slika", venn(lambda a, b, c: b and not a)),
        ("!a) B \\ A: del B zunaj A", "Razlika množic."),
        ("@slika", venn(lambda a, b, c: a and b)),
        ("!b) A ∩ B: skupni del", "Presek."),
        ("@slika", venn(lambda a, b, c: a != b)),
        ("!c) (A ∪ B) \\ (A ∩ B): elementi natanko ene množice", "Simetrična razlika."),
        ("@slika", venn(lambda a, b, c: a or b)),
        ("!d) A ∪ B", "Unija."),
        ("@slika", venn(lambda a, b, c: (a and b) or c, tri=True)),
        ("!e) (A ∩ B) ∪ C", "Najprej presek A in B, nato dodamo vso množico C."),
        ("@slika", venn(lambda a, b, c: (b or c) and not a, tri=True)),
        ("!f) (B ∪ C) \\ A", "Iz unije B in C odstranimo vse, kar leži v A."),
    ],
)

n2 = naloga(
    2, "algebrski_izrazi_enacbe_neenacbe", 8,
    r"Izraze razstavi na čim več faktorjev v množici realnih števil.<br>"
    r"a) \(b^2 + 5b\) (1 točka) &nbsp; b) \(x^2 - 3x - 40\) (1 točka) &nbsp; c) \(a^3 - 3a^2 - 4a + 12\) (2 točki) &nbsp; "
    r"d) \(3x^4 - 48x^2\) (2 točki) &nbsp; e) \(8a^3 + 1\) (2 točki)",
    r"a) \(b(b + 5)\) &nbsp; b) \((x - 8)(x + 5)\) &nbsp; c) \((a - 3)(a - 2)(a + 2)\) &nbsp; d) \(3x^2(x - 4)(x + 4)\) &nbsp; "
    r"e) \((2a + 1)(4a^2 - 2a + 1)\)",
    [
        ("!a) b(b + 5)", "Izpostavimo skupni faktor."),
        ("!b) (x − 8)(x + 5)", "Vietovo pravilo: −8 · 5 = −40, −8 + 5 = −3."),
        ("a<sup>2</sup>(a − 3) − 4(a − 3) = (a − 3)(a<sup>2</sup> − 4)", "Združevanje členov."),
        ("!c) (a − 3)(a − 2)(a + 2)", "Razlika kvadratov."),
        ("!d) 3x<sup>2</sup>(x<sup>2</sup> − 16) = 3x<sup>2</sup>(x − 4)(x + 4)", ""),
        ("!e) (2a)<sup>3</sup> + 1<sup>3</sup> = (2a + 1)(4a<sup>2</sup> − 2a + 1)", "Vsota kubov; kvadratni faktor nima realnih ničel."),
    ],
)

n3 = naloga(
    3, "geometrijski_liki_telesa", 6,
    r"V enakokrakem trikotniku meri osnovnica \(10\ \mathrm{cm}\), krak pa \(13\ \mathrm{cm}\). Izračunaj obseg, višino na osnovnico, ploščino "
    r"in kot ob osnovnici na desetinko stopinje.",
    r"\(o = 36\ \mathrm{cm}\), \(v = 12\ \mathrm{cm}\), \(S = 60\ \mathrm{cm^2}\), \(\alpha \approx 67{,}4^\circ\)",
    [
        ("!o = 10 + 2 · 13 = 36 cm", ""),
        ("!v = " + K("13<sup>2</sup> − 5<sup>2</sup>") + " = 12 cm", "Višina razpolovi osnovnico; Pitagorov izrek."),
        ("!S = " + U("10 · 12", "2") + " = 60 cm<sup>2</sup>", ""),
        ("cos α = " + U("5", "13"), "Kotne funkcije v pravokotnem trikotniku."),
        ("!α ≈ 67,4°", ""),
    ],
)

def f4(x):
    return x * x + 2 * x - 8

n4 = naloga(
    4, "funkcije", 8,
    r"Dana je kvadratna funkcija \(f(x) = x^2 + 2x - 8\). Izračunaj ničli in koordinati temena ter zapiši presečišče grafa z osjo \(y\). "
    r"Nariši graf. Na katerem intervalu je funkcija negativna?",
    r"ničli \(-4\) in \(2\), \(T(-1, -9)\), \((0, -8)\); negativna na \((-4, 2)\)",
    [
        ("!(x + 4)(x − 2) = 0:  x<sub>1</sub> = −4,  x<sub>2</sub> = 2", "Vietovo pravilo."),
        ("!T(−1, −9)", "p = −b/(2a) = −1, q = f(−1)."),
        ("!presečišče z osjo y: (0, −8)", ""),
        ("@slika", graf([(f4, MODRA)], (-6, 4), (-10, 4), tocke=[(-4, 0, ""), (2, 0, ""), (-1, -9, "T"), (0, -8, "")], sirina=260, visina=330)),
        ("!f(x) < 0 za x ∈ (−4, 2)", "Parabola z odprtino navzgor je negativna med ničlama."),
    ],
    snov=FUN + "kvadratna_razlaga.html",
)

def krog5(X, Y):
    return (parametricna(X, Y, lambda t: -2 + 3 * math.cos(t), lambda t: 2 + 3 * math.sin(t), 0, 2 * math.pi, MODRA)
            + tocka(X, Y, -2, 2, "S"))

n5 = naloga(
    5, "stoznice", 7,
    r"Nariši krožnico \(x^2 + y^2 + 4x - 4y - 1 = 0\). Izračunaj abscisi presečišč krožnice z osjo \(x\).",
    r"\(S(-2, 2)\), \(r = 3\); \(x = -2 \pm \sqrt{5}\)",
    [
        ("(x + 2)<sup>2</sup> + (y − 2)<sup>2</sup> = 1 + 4 + 4 = 9", "Dopolnimo do popolnih kvadratov: S(−2, 2), r = 3."),
        ("@slika", mreza((-6, 2), (-2, 6), krog5, sirina=240)),
        ("y = 0:  x<sup>2</sup> + 4x − 1 = 0", ""),
        ("!x = " + U("−4 ± " + K("20"), "2") + " = −2 ± " + K("5"), "Rešitve kvadratne enačbe."),
    ],
)

n6 = naloga(
    6, "stevilske_mnozice", 7,
    r"Kompleksno število \(z\) je rešitev enačbe \(3z + i^{102} = 2iz + 12\). Izračunaj \(z\) in \(|z|\).",
    r"\(z = 3 + 2i\), \(|z| = \sqrt{13}\)",
    [
        ("i<sup>102</sup> = i<sup>100</sup> · i<sup>2</sup> = −1", "Potence števila i se ponavljajo s periodo 4."),
        ("3z − 2iz = 13  ⇒  z(3 − 2i) = 13", ""),
        ("z = " + U("13", "3 − 2i") + " · " + U("3 + 2i", "3 + 2i") + " = " + U("13(3 + 2i)", "13"), "Ulomek razširimo s konjugirano vrednostjo."),
        ("!z = 3 + 2i,  |z| = " + K("9 + 4") + " = " + K("13"), "Absolutna vrednost kompleksnega števila."),
    ],
)

n7 = naloga(
    7, "vektorji_ravnina_prostor", 7,
    r"V enakostraničnem trikotniku \(ABC\) s stranico \(4\) leži točka \(M\) na stranici \(BC\), tako da je \(|BM| : |MC| = 3 : 1\). Izrazi "
    r"vektor \(\overrightarrow{AM}\) z vektorjema \(\overrightarrow{AB} = \vec{a}\) in \(\overrightarrow{BC} = \vec{b}\) ter izračunaj skalarni "
    r"produkt \(\overrightarrow{AM} \cdot \overrightarrow{AB}\).",
    r"\(\overrightarrow{AM} = \vec{a} + \frac{3}{4}\vec{b}\), \(\overrightarrow{AM} \cdot \overrightarrow{AB} = 10\)",
    [
        ("!" + V("AM") + " = " + V("AB") + " + " + V("BM") + " = " + V("a") + " + " + U("3", "4") + V("b"), "BM je 3/4 stranice BC."),
        (V("a") + " · " + V("b") + " = 4 · 4 · cos 120° = −8", "Kot med vektorjema AB in BC je zunanji kot trikotnika, 120°."),
        ("!" + V("AM") + " · " + V("a") + " = 16 + " + U("3", "4") + " · (−8) = 10", "Skalarni produkt je distributiven."),
    ],
)

n8 = naloga(
    8, "funkcije", 8,
    r"Kota \(\alpha\) in \(\beta\) sta ostra, \(\sin \alpha = \frac{2}{3}\) in \(\sin \beta = \frac{3}{5}\). Izračunaj \(\sin(\alpha + \beta)\) na dva načina:<br>"
    r"a) z računalom, tako da najprej izračunaš kota, rezultat zaokroži na dve decimalki; (3 točke)<br>"
    r"b) brez računala in brez računanja kotov, rezultat naj bo točen. (5 točk)",
    r"a) \(\approx 0{,}98\) &nbsp; b) \(\frac{8 + 3\sqrt{5}}{15}\)",
    [
        ("α ≈ 41,81°,  β ≈ 36,87°,  sin(78,68°) ≈ 0,98", "Arkus sinus na računalu."),
        ("!a) ≈ 0,98", ""),
        ("cos α = " + U(K("5"), "3") + ",  cos β = " + U("4", "5"), "sin²x + cos²x = 1; kota sta ostra."),
        ("sin(α + β) = " + U("2", "3") + " · " + U("4", "5") + " + " + U(K("5"), "3") + " · " + U("3", "5"), "Adicijski izrek za sinus."),
        ("!b) " + U("8 + 3" + K("5"), "15"), ""),
    ],
    snov=FUN + "kotne_razlaga.html",
)

n9 = naloga(
    9, "funkcije", 6,
    r"Izračunaj vrednost izraza \(\log_a a^3 - \log_b \frac{1}{b^2} + \log_c \sqrt{c} - 4\log_d \sqrt[8]{d}\), kjer so \(a\), \(b\), \(c\) in \(d\) "
    r"pozitivna realna števila, različna od \(1\).",
    r"\(5\)",
    [
        ("log<sub>a</sub> a<sup>3</sup> = 3,  log<sub>b</sub> b<sup>−2</sup> = −2", "Logaritem potence z enako osnovo."),
        ("log<sub>c</sub> c<sup>1/2</sup> = " + U("1", "2") + ",  4 log<sub>d</sub> d<sup>1/8</sup> = " + U("1", "2"), "Koren zapišemo s potenco."),
        ("!3 + 2 + " + U("1", "2") + " − " + U("1", "2") + " = 5", ""),
    ],
    snov=FUN + "logaritemska_razlaga.html",
)

n10 = naloga(
    10, ["kombinatorika", "verjetnostni_racun"], 5,
    r"Iz črk besede OSTANKI sestavljamo sedemčrkovne besede; vsako črko uporabimo natanko enkrat. Koliko različnih besed lahko sestavimo? "
    r"Če naključno izberemo eno od njih, izračunaj verjetnosti dogodkov: \(A\) – soglasniki stojijo skupaj, \(B\) – v besedi se vidi beseda "
    r"TANK (črke T, A, N, K stojijo skupaj in v tem vrstnem redu).",
    r"\(5040\); \(P(A) = \frac{4}{35}\), \(P(B) = \frac{1}{210}\)",
    [
        ("!7! = 5040 besed", "Permutacije sedmih različnih črk."),
        ("soglasniki S, T, N, K kot blok + samoglasniki O, A, I:  4! · 4! = 576", "Blok štejemo kot eno črko, nato permutiramo znotraj bloka."),
        ("!P(A) = " + U("576", "5040") + " = " + U("4", "35"), ""),
        ("blok TANK + O, S, I:  4! = 24", "Vrstni red v bloku je določen."),
        ("!P(B) = " + U("24", "5040") + " = " + U("1", "210"), ""),
    ],
)

n11 = naloga(
    11, "diferencialni_racun", 6,
    r"Dana je funkcija \(f(x) = x^3 - 2x + 4\). Zapiši enačbo tangente na graf funkcije v točki \(A(2, y_1)\).",
    r"\(y = 10x - 12\)",
    [
        ("y<sub>1</sub> = f(2) = 8 − 4 + 4 = 8", ""),
        ("f '(x) = 3x<sup>2</sup> − 2,  f '(2) = 10", "Smerni koeficient tangente je vrednost odvoda."),
        ("!y − 8 = 10(x − 2)  ⇒  y = 10x − 12", "Enačba tangente."),
    ],
)

n12 = naloga(
    12, "zaporedja_vrste", 6,
    r"Prvi trije členi geometrijskega zaporedja so \(3\), \(\sqrt{6}\), \(2\). Izračunaj kvocient in četrti člen. Izračunaj še vsoto "
    r"geometrijske vrste \(3 + \sqrt{6} + 2 + \dots\) Rezultat naj bo točen, brez korena v imenovalcu.",
    r"\(q = \frac{\sqrt{6}}{3}\), \(a_4 = \frac{2\sqrt{6}}{3}\), \(s = 9 + 3\sqrt{6}\)",
    [
        ("!q = " + U(K("6"), "3"), "Kvocient zaporednih členov."),
        ("!a<sub>4</sub> = 2 · " + U(K("6"), "3") + " = " + U("2" + K("6"), "3"), ""),
        ("s = " + U("3", "1 − " + K("6") + "/3") + " = " + U("9", "3 − " + K("6")), "Vsota geometrijske vrste; |q| ≈ 0,82 < 1."),
        ("!s = " + U("9(3 + " + K("6") + ")", "9 − 6") + " = 9 + 3" + K("6"), "Racionaliziramo imenovalec."),
    ],
)

POLA1 = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]

# ------------------------------------------------------------------ izpitna pola 2 (višja raven, tri obvezne naloge)
def f_v1(x):
    return x * x - x

def g_v1(x):
    return 4 - 4 / x

v1 = naloga(
    1, ["funkcije", "diferencialni_racun", "integralski_racun"], 16,
    r"Dani sta funkciji \(f(x) = x^2 - x\) in \(g(x) = 4 - \frac{4}{x}\).<br>"
    r"a) Izračunaj vsa tri presečišča grafov in nariši oba grafa. (6 točk)<br>"
    r"b) Izračunaj kot, pod katerim se grafa sekata v presečišču z najmanjšo absciso. (4 točke)<br>"
    r"c) Izračunaj ploščino lika med grafoma. (4 točke)<br>"
    r"d) Zapiši definicijsko območje funkcije \(h(x) = g(f(x))\). (2 točki)",
    r"a) \((-2, 6)\), \((1, 0)\), \((2, 2)\) &nbsp; b) \(\approx 56{,}31^\circ\) &nbsp; c) \(\frac{19}{6} - 4\ln 2\) &nbsp; d) \(\mathbb{R} \setminus \{0, 1\}\)",
    [
        ("x<sup>2</sup> − x = 4 − " + U("4", "x") + "  ⇒  x<sup>3</sup> − x<sup>2</sup> − 4x + 4 = 0", "Pomnožimo z x ≠ 0."),
        ("x<sup>2</sup>(x − 1) − 4(x − 1) = (x − 1)(x − 2)(x + 2) = 0", "Združevanje členov."),
        ("!presečišča (−2, 6), (1, 0), (2, 2)", ""),
        ("@slika", graf([(f_v1, MODRA), (g_v1, RDECA)], (-4, 4), (-4, 8), tocke=[(-2, 6, ""), (1, 0, ""), (2, 2, "")], sirina=280, visina=320)),
        ("f '(x) = 2x − 1,  g '(x) = " + U("4", "x<sup>2</sup>"), ""),
        ("x = −2:  k<sub>1</sub> = −5,  k<sub>2</sub> = 1", ""),
        ("!tan φ = |" + U("1 − (−5)", "1 + (−5) · 1") + "| = " + U("3", "2") + "  ⇒  φ ≈ 56,31°", "Kot med krivuljama je kot med tangentama."),
        ("p = " + INT("2", "1") + "(4 − " + U("4", "x") + " − x<sup>2</sup> + x) dx", "Omejen lik leži med x = 1 in x = 2, kjer je g nad f."),
        ("p = (4x − 4 ln x − " + U("x<sup>3</sup>", "3") + " + " + U("x<sup>2</sup>", "2") + ")" + MEJA("2", "1"), "Integral 1/x je ln x."),
        ("!p = " + U("19", "6") + " − 4 ln 2 ≈ 0,39", ""),
        ("!D<sub>h</sub> = ℝ \\ {0, 1}", "f(x) = x(x − 1) ne sme biti 0, ker g ni definirana v 0."),
    ],
)

v2 = naloga(
    2, ["geometrijski_liki_telesa", "funkcije"], 12,
    r"Pri nalogah lahko uporabiš natančni vrednosti \(\sin 75^\circ = \frac{\sqrt{6} + \sqrt{2}}{4}\) in \(\sin 15^\circ = \frac{\sqrt{6} - \sqrt{2}}{4}\).<br>"
    r"a) Natančno izračunaj ploščino trikotnika \(ABC\) s stranicama \(b = |AC| = 4\), \(c = |AB| = 6\) in kotom \(\alpha = 75^\circ\). (4 točke)<br>"
    r"b) Natančno izračunaj stranico in ploščino pravilnega dvanajstkotnika, včrtanega krogu s polmerom \(4\). (4 točke)<br>"
    r"c) Daljica \(PR\) je premer kroga, točka \(T\) leži na krožnici. Kot \(\angle RPT\) meri \(75^\circ\), daljica \(RT\) pa \(3(\sqrt{6} + \sqrt{2})\). "
    r"Izračunaj polmer in ploščino kroga. (4 točke)",
    r"a) \(3(\sqrt{6} + \sqrt{2})\) &nbsp; b) \(a = 2(\sqrt{6} - \sqrt{2})\), \(S = 48\) &nbsp; c) \(r = 6\), \(S = 36\pi\)",
    [
        ("!a) S = " + U("1", "2") + " · 4 · 6 · sin 75° = 12 · " + U(K("6") + " + " + K("2"), "4") + " = 3(" + K("6") + " + " + K("2") + ")", "Ploščina trikotnika s sinusom kota."),
        ("osrednji kot dvanajstkotnika je 30°;  a = 2r sin 15°", "Enakokraki trikotnik s krakoma r; višina razpolovi kot in osnovnico."),
        ("!b) a = 8 · " + U(K("6") + " − " + K("2"), "4") + " = 2(" + K("6") + " − " + K("2") + ")", ""),
        ("!S = 12 · " + U("1", "2") + " r<sup>2</sup> sin 30° = 12 · " + U("1", "2") + " · 16 · " + U("1", "2") + " = 48", "Dvanajst skladnih trikotnikov."),
        ("∢PTR = 90°  ⇒  |RT| = |PR| sin 75° = 2r sin 75°", "Talesov izrek: obodni kot nad premerom je pravi."),
        ("3(" + K("6") + " + " + K("2") + ") = 2r · " + U(K("6") + " + " + K("2"), "4") + "  ⇒  r = 6", ""),
        ("!c) r = 6,  S = 36π", ""),
    ],
)

v3 = naloga(
    3, "kombinatorika", 12,
    r"Pri nalogah upoštevaj lastnosti binomskih simbolov.<br>"
    r"a) Za katera naravna števila \(n\) so \(3n\), \(\binom{n}{2}\), \(\binom{n}{3}\) prvi trije členi geometrijskega zaporedja? (4 točke)<br>"
    r"b) Polinom \(p(x) = (1 + 2x)^n = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0\). Za katero naravno število \(n > 1\) sta koeficienta "
    r"\(a_{n-1}\) in \(a_{n-2}\) enaka? (4 točke)<br>"
    r"c) V ravnini so tri različne vzporedne premice \(p\), \(q\) in \(r\) ter \(12\) točk: \(6\) na premici \(p\), \(4\) na \(q\) in \(2\) na \(r\). "
    r"Koliko trikotnikov z oglišči v teh točkah lahko narišemo, če ena stranica leži na \(p\)? Koliko trapezov, če ena osnovnica leži na \(p\)? (4 točke)",
    r"a) \(n = 3\) &nbsp; b) \(n = 5\) &nbsp; c) \(90\) trikotnikov, \(105\) trapezov",
    [
        (BINOM("n", "2") + "<sup>2</sup> = 3n · " + BINOM("n", "3"), "Pri geometrijskem zaporedju je kvadrat srednjega člena produkt sosednjih."),
        (U("n<sup>2</sup>(n − 1)<sup>2</sup>", "4") + " = 3n · " + U("n(n − 1)(n − 2)", "6") + "  ⇒  " + U("n − 1", "4") + " = " + U("n − 2", "2"), "Delimo z n²(n − 1) ≠ 0 (n ≥ 3)."),
        ("!a) n = 3: zaporedje 9, 3, 1", ""),
        ("a<sub>n − 1</sub> = " + BINOM("n", "n − 1") + " 2<sup>n − 1</sup> = n · 2<sup>n − 1</sup>,  a<sub>n − 2</sub> = " + BINOM("n", "2") + " 2<sup>n − 2</sup>", "Binomski izrek."),
        ("n · 2<sup>n − 1</sup> = " + U("n(n − 1)", "2") + " · 2<sup>n − 2</sup>  ⇒  2 = " + U("n − 1", "2"), ""),
        ("!b) n = 5", ""),
        ("trikotniki: " + BINOM("6", "2") + " · (4 + 2) = 15 · 6 = 90", "Dve oglišči na p, tretje na q ali r (ne sme biti kolinearno)."),
        ("trapezi: " + BINOM("6", "2") + " · (" + BINOM("4", "2") + " + " + BINOM("2", "2") + ") = 15 · 7 = 105", "Dve oglišči na p in dve na isti drugi vzporednici."),
        ("!c) 90 trikotnikov, 105 trapezov", ""),
    ],
)

POLA2 = [v1, v2, v3]
