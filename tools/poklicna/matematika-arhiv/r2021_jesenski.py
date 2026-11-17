# Jesenski rok 2021 (uradna pola RIC P212-C101-1-1)
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2021, "jesenski", "sreda, 25. avgust 2021"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "izrazi_potence", 4,
    r"Za vsako enakost zapiši DA, če je pravilna, in NE, če ni pravilna.<br>"
    r"a) \(x^5 + x^6 = x^{11}\) &nbsp; b) \(\left(x^3\right)^4 = x^{12}\) &nbsp; c) \(2x^4 + 5x^4 = 7x^4\) &nbsp; d) \(x \cdot x \cdot x = 3x\)",
    r"a) NE &nbsp; b) DA &nbsp; c) DA &nbsp; d) NE",
    [
        ("!a) NE", "Potenc z enako osnovo ne moremo sešteti v eno potenco; seštevamo le podobne člene."),
        ("!b) DA", "Potenco potenciramo tako, da eksponenta zmnožimo: 3 · 4 = 12.", "potence"),
        ("!c) DA", "Podobne člene seštejemo: 2 + 5 = 7."),
        ("!d) NE", "x · x · x = x³."),
    ],
)


def premica_stevil(od, do, risbe, sirina=300, visina=120, y0=90):
    L, R = 20, sirina - 20
    X = lambda x: L + (x - od) / (do - od) * (R - L)
    t = [f'<line x1="{L - 10}" y1="{y0}" x2="{R + 10}" y2="{y0}" stroke="currentColor" stroke-width="1.5"/>']
    for i in range(od, do + 1):
        t.append(f'<line x1="{X(i):.1f}" y1="{y0 - 5}" x2="{X(i):.1f}" y2="{y0 + 5}" stroke="currentColor"/>')
        t.append(napis(X(i), y0 + 20, str(i).replace("-", "−"), 11))
    t.append(risbe(X, y0))
    return svg(sirina, visina, "".join(t), opis="Številska premica")


def slika_a(X, y0):
    # daljico od 1 do 2 razdelimo na tri dele s pomožnim poltrakom
    dx, dy = 22, -14
    t = [f'<line x1="{X(1):.1f}" y1="{y0}" x2="{X(1) + 3.6 * dx:.1f}" y2="{y0 + 3.6 * dy:.1f}" stroke="currentColor" stroke-opacity="0.6"/>']
    for k in (1, 2, 3):
        t.append(f'<circle cx="{X(1) + k * dx:.1f}" cy="{y0 + k * dy:.1f}" r="2.5" fill="currentColor"/>')
    t.append(f'<line x1="{X(1) + 3 * dx:.1f}" y1="{y0 + 3 * dy:.1f}" x2="{X(2):.1f}" y2="{y0}" stroke="currentColor" stroke-dasharray="3 3"/>')
    xa = X(1) + 2 * (X(2) - X(1)) / 3
    t.append(f'<line x1="{X(1) + 2 * dx:.1f}" y1="{y0 + 2 * dy:.1f}" x2="{xa:.1f}" y2="{y0}" stroke="currentColor" stroke-dasharray="3 3"/>')
    t.append(f'<circle cx="{xa:.1f}" cy="{y0}" r="3.5" fill="{RDECA}"/>' + napis(xa, y0 - 10, "A", 13, RDECA))
    return "".join(t)


def slika_b(X, y0):
    dx, dy = 15, -14
    t = [f'<line x1="{X(-2):.1f}" y1="{y0}" x2="{X(-2) + 4.6 * dx:.1f}" y2="{y0 + 4.6 * dy:.1f}" stroke="currentColor" stroke-opacity="0.6"/>']
    for k in (1, 2, 3, 4):
        t.append(f'<circle cx="{X(-2) + k * dx:.1f}" cy="{y0 + k * dy:.1f}" r="2.5" fill="currentColor"/>')
    t.append(f'<line x1="{X(-2) + 4 * dx:.1f}" y1="{y0 + 4 * dy:.1f}" x2="{X(-1):.1f}" y2="{y0}" stroke="currentColor" stroke-dasharray="3 3"/>')
    xb = X(-2) + (X(-1) - X(-2)) / 4
    t.append(f'<line x1="{X(-2) + dx:.1f}" y1="{y0 + dy:.1f}" x2="{xb:.1f}" y2="{y0}" stroke="currentColor" stroke-dasharray="3 3"/>')
    t.append(f'<circle cx="{xb:.1f}" cy="{y0}" r="3.5" fill="{RDECA}"/>' + napis(xb - 4, y0 - 10, "B", 13, RDECA))
    return "".join(t)


def slika_c(X, y0):
    e = X(1) - X(0)
    t = [f'<rect x="{X(0):.1f}" y="{y0 - e:.1f}" width="{2 * e:.1f}" height="{e:.1f}" fill="none" stroke="currentColor" stroke-opacity="0.7"/>',
         f'<line x1="{X(0):.1f}" y1="{y0}" x2="{X(2):.1f}" y2="{y0 - e:.1f}" stroke="currentColor"/>']
    r = math.sqrt(5) * e
    a = math.atan2(1, 2)
    t.append(f'<path d="M {X(0) + r * math.cos(a):.1f} {y0 - r * math.sin(a):.1f} A {r:.1f} {r:.1f} 0 0 1 {X(0) + r:.1f} {y0}" fill="none" stroke="currentColor" stroke-dasharray="4 3"/>')
    t.append(napis(X(2) + 8, y0 - e - 4, "D", 12) + napis(X(0) - 4, y0 - 8, "O", 12))
    t.append(f'<circle cx="{X(0) + r:.1f}" cy="{y0}" r="3.5" fill="{RDECA}"/>' + napis(X(0) + r + 2, y0 - 10, "C", 13, RDECA))
    return "".join(t)

a2 = naloga(
    "A2", "realna_stevila_koreni", 4,
    r"Točke \(A\), \(B\) in \(C\) na številski premici ponazarjajo realna števila (glej slike). Na pomožnih poltrakih na prvi in drugi sliki "
    r"so označene točke na enakih razdaljah; na tretji sliki je krivulja od \(D\) do \(C\) del krožnice s središčem v \(O\). Natančno zapiši, "
    r"katera števila ponazarjajo točke \(A\), \(B\) in \(C\)."
    + premica_stevil(-1, 3, slika_a) + premica_stevil(-3, 1, slika_b) + premica_stevil(-1, 4, slika_c, visina=110, y0=85),
    r"\(A = \frac{5}{3}\), \(B = -\frac{7}{4}\), \(C = \sqrt{5}\)",
    [
        ("!A = 1 + " + U("2", "3") + " = " + U("5", "3"), "Daljica od 1 do 2 je razdeljena na 3 enake dele, A je na drugi delilni točki."),
        ("!B = −2 + " + U("1", "4") + " = −" + U("7", "4"), "Daljica od −2 do −1 je razdeljena na 4 enake dele, B je na prvi delilni točki."),
        ("|OD| = " + K("2<sup>2</sup> + 1<sup>2</sup>") + " = " + K("5"), "OD je diagonala pravokotnika 2 × 1.", "pitagora"),
        ("!C = " + K("5"), "Lok krožnice prenese dolžino |OD| na številsko premico."),
    ],
)

a3 = naloga(
    "A3", "izrazi_potence", 4,
    r"Zapiši številski izraz in izračunaj njegovo vrednost: »Kvadrat razlike števil \(-3\) in \(2\), deljen z nasprotno vrednostjo števila \(5\).«",
    r"\((-3 - 2)^2 : (-5) = -5\)",
    [
        ("!(−3 − 2)<sup>2</sup> : (−5)", "Najprej razlika, nato kvadrat, nato deljenje z −5."),
        ("= (−5)<sup>2</sup> : (−5) = 25 : (−5)", ""),
        ("!= −5", ""),
    ],
)


def slika_a4():
    r, ox, oy = 150, 20, 170
    t = [f'<path d="M {ox + r} {oy} A {r} {r} 0 0 0 {ox} {oy - r} L {ox} {oy} A {r / 2} {r / 2} 0 0 1 {ox + r} {oy} Z" fill="{MODRA}" fill-opacity="0.25"/>',
         f'<path d="M {ox} {oy} L {ox + r} {oy} A {r} {r} 0 0 0 {ox} {oy - r} Z" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<path d="M {ox} {oy} A {r / 2} {r / 2} 0 0 1 {ox + r} {oy}" fill="none" stroke="currentColor" stroke-width="1.5"/>',
         f'<line x1="{ox + r / 2}" y1="{oy}" x2="{ox + r / 2}" y2="{oy - r / 2}" stroke="currentColor" stroke-dasharray="3 3"/>',
         napis(ox + r / 2 + 10, oy - r / 4, "r₁", 12), napis(ox - 8, oy - r / 2, "r", 12)]
    return svg(190, 190, "".join(t), opis="Četrtina kroga z včrtanim polkrogom")

a4 = naloga(
    "A4", "obsegi_ploscine", 4,
    r"V četrtino kroga s polmerom \(r = 12\) cm je včrtan polkrog s polmerom \(r_1 = 6\) cm (glej sliko). Izračunaj ploščino osenčenega dela." + slika_a4(),
    r"\(S = 18\pi\ \mathrm{cm^2} \approx 56{,}55\ \mathrm{cm^2}\)",
    [
        ("S<sub>1</sub> = " + U("π · 12<sup>2</sup>", "4") + " = 36π cm<sup>2</sup>", "Četrtina kroga.", "krog"),
        ("S<sub>2</sub> = " + U("π · 6<sup>2</sup>", "2") + " = 18π cm<sup>2</sup>", "Polkrog."),
        ("!S = 36π − 18π = 18π ≈ 56,55 cm<sup>2</sup>", "Od četrtine kroga odštejemo polkrog."),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"Pet zaporednih sodih števil sestavlja aritmetično zaporedje. Njihova vsota je \(110\). Izračunaj teh pet števil.",
    r"\(18, 20, 22, 24, 26\)",
    [
        ("d = 2,  s<sub>5</sub> = " + U("5", "2") + "(2a<sub>1</sub> + 4 · 2) = 110", "Zaporedna soda števila se razlikujejo za 2.", "aritmeticno"),
        ("5a<sub>1</sub> + 20 = 110  ⇒  a<sub>1</sub> = 18", ""),
        ("!18, 20, 22, 24, 26", ""),
    ],
)

a6 = naloga(
    "A6", "eksponentna_logaritemska", 4,
    r"Reši enačbo \(5 + 2\log(3x) = 9\).",
    r"\(x = \frac{100}{3}\)",
    [
        ("2 log(3x) = 4  ⇒  log(3x) = 2", ""),
        ("3x = 10<sup>2</sup> = 100", "log je desetiški logaritem.", "logaritem"),
        ("!x = " + U("100", "3"), "Pogoj 3x > 0 je izpolnjen."),
    ],
)

a7 = naloga(
    "A7", "polinomi_racionalna", 4,
    r"V koordinatnem sistemu je graf racionalne funkcije \(f(x) = \dfrac{x + a}{x + b}\)."
    + graf([(lambda x: (x - 2) / (x + 3), MODRA), (lambda x: 1, RDECA)], (-10, 6), (-8, 9), sirina=320, visina=330)
    + r"Zapiši ničlo funkcije \(f\), pol funkcije \(f\), enačbo vodoravne asimptote in vsa realna števila \(x\), za katera je \(f(x)\) negativna.",
    r"ničla \(x = 2\), pol \(x = -3\), asimptota \(y = 1\), \(f(x) < 0\) za \(-3 < x < 2\)",
    [
        ("!ničla: x = 2", "Graf seka os x v točki (2, 0)."),
        ("!pol: x = −3", "Ob navpični premici x = −3 gre graf čez vse meje."),
        ("!vodoravna asimptota: y = 1", "Za velike |x| se graf približuje premici y = 1.", "racionalna"),
        ("!f(x) < 0 za x ∈ (−3, 2)", "Tam je graf pod osjo x. (Sledi f(x) = (x − 2)/(x + 3).)"),
    ],
)

a8 = naloga(
    "A8", "kombinatorika_verjetnost", 5,
    r"Na taboru je deset fantov: sedem iz Slovenije in trije iz tujine. Spali bodo v koči, kjer so tri dvoposteljne sobe (\(A\), \(B\) in \(C\)) "
    r"in ena štiriposteljna soba (\(D\)).<br>"
    r"8.1. Na koliko načinov lahko izmed sedmih slovenskih fantov izberemo štiri, ki bodo spali v štiriposteljni sobi? (2 točki)<br>"
    r"8.2. Na koliko načinov se lahko fantje razporedijo v sobe, tako da bo v vsaki dvoposteljni sobi en fant iz Slovenije in en iz tujine? (3 točke)",
    r"8.1. \(35\) &nbsp; 8.2. \(1260\)",
    [
        "## 8.1",
        ("!C<sub>7</sub><sup>4</sup> = " + U("7!", "4! · 3!") + " = 35", "Vrstni red v sobi ni pomemben: kombinacije.", "kombinatorika"),
        "## 8.2",
        ("Slovenci v sobah A, B, C: V<sub>7</sub><sup>3</sup> = 7 · 6 · 5 = 210", "Za vsako sobo izberemo drugega fanta, vrstni red sob je pomemben."),
        ("tujci v sobah A, B, C: 3! = 6", "Preostali štirje Slovenci gredo v sobo D."),
        ("!210 · 6 = 1260", "Pravilo produkta."),
    ],
)

a9 = naloga(
    "A9", "eksponentna_logaritemska", 5,
    r"Na ribniku se širi vodna rastlina. Funkcija \(P(t) = 12 \cdot 2^t\) opisuje, kako se povečuje površina, ki jo prekriva rastlina; čas \(t\) "
    r"merimo v tednih, površino \(P\) pa v m². Izpolni preglednico za \(t = 1, 2, 3, 4, 5\) in skiciraj graf funkcije \(P\). Najmanj koliko tednov "
    r"potrebuje rastlina, da prekrije več kot \(300\) m² ribnika?",
    r"\(24, 48, 96, 192, 384\) m²; po \(5\) tednih",
    [
        ("@slika", tabela(["t (tedni)", "1", "2", "3", "4", "5"], [["P (m²)", "24", "48", "96", "192", "384"]])),
        ("@slika", graf([(lambda t: 12 * 2 ** t / 50, MODRA)], (-0.5, 5.5), (-0.5, 8.5), [(t, 12 * 2 ** t / 50, "") for t in range(1, 6)], sirina=260, visina=260)),
        (None, "Na navpični osi je ena enota 50 m²."),
        ("12 · 2<sup>t</sup> > 300  ⇒  2<sup>t</sup> > 25", ""),
        ("t > " + U("log 25", "log 2") + " ≈ 4,64", "", "log_pravila"),
        ("!najmanj 5 tednov", "Po 4 tednih je 192 m², po 5 tednih 384 m²."),
    ],
)

a10 = naloga(
    "A10", "odvod_pm", 6,
    r"Funkcija \(f\) je dana s predpisom \(f(x) = \frac{1}{4}x^4 - \frac{2}{3}x^3 - \frac{3}{2}x^2 + 7\). Reši enačbo \(f'(x) = 0\).",
    r"\(x_1 = -1\), \(x_2 = 0\), \(x_3 = 3\)",
    [
        ("f '(x) = x<sup>3</sup> − 2x<sup>2</sup> − 3x", "Odvajamo člen za členom; odvod konstante je 0.", "odvod"),
        ("x(x<sup>2</sup> − 2x − 3) = 0", "Izpostavimo x."),
        ("x(x − 3)(x + 1) = 0", "", "vieta"),
        ("!x<sub>1</sub> = −1,  x<sub>2</sub> = 0,  x<sub>3</sub> = 3", ""),
    ],
)

a11 = naloga(
    "A11", "kvadratna_funkcija", 6,
    r"Zapiši ničli funkcije \(f(x) = \frac{1}{2}(x + 2)(x - 4)\) in izračunaj koordinati temena njenega grafa. Nariši graf funkcije \(f\).",
    r"\(x_1 = -2\), \(x_2 = 4\), \(T\left(1, -\frac{9}{2}\right)\)",
    [
        ("!x<sub>1</sub> = −2,  x<sub>2</sub> = 4", "Funkcija je v razcepni obliki."),
        ("p = " + U("−2 + 4", "2") + " = 1", "Abscisa temena je sredina med ničlama."),
        ("q = f(1) = " + U("1", "2") + " · 3 · (−3) = −" + U("9", "2"), ""),
        ("!T(1, −" + U("9", "2") + ")", ""),
        ("@slika", graf([(lambda x: 0.5 * (x + 2) * (x - 4), MODRA)], (-4, 6), (-5, 6), [(-2, 0, ""), (4, 0, ""), (1, -4.5, "T"), (0, -4, "")], sirina=280, visina=300)),
        (None, "Presečišče z osjo y: f(0) = −4."),
    ],
)

# ------------------------------------------------------------------ 2. del
def stolpci_b1():
    vr = [("ženske", 1910), ("povprečje", 2000), ("moški", 2070)]
    H = 200
    t = []
    for i, (ime, v) in enumerate(vr):
        h = (v - 1500) / 700 * 140
        x = 40 + i * 80
        t.append(f'<rect x="{x}" y="{H - 30 - h:.1f}" width="50" height="{h:.1f}" fill="{MODRA}" fill-opacity="{0.5 + 0.2 * i}"/>')
        t.append(napis(x + 25, H - 34 - h, f"{v} €", 11) + napis(x + 25, H - 14, ime, 11))
    t.append(f'<line x1="30" y1="{H - 30}" x2="290" y2="{H - 30}" stroke="currentColor"/>')
    t.append(napis(30, H - 34, "1500", 9, sidro="end"))
    return svg(300, H, "".join(t), opis="Stolpčni diagram plač")

b1 = naloga(
    "B1", ["ulomki_odstotki", "statistika_pm"], 10,
    r"Povprečna mesečna bruto plača v nekem podjetju je bila \(2000\) evrov. Ženske so zaslužile v povprečju \(4{,}5\,\%\) manj od povprečja, "
    r"moški pa \(3{,}5\,\%\) več od povprečja.<br>"
    r"1.1. Izračunaj povprečno mesečno bruto plačo žensk in moških ter rezultat prikaži s stolpčnim diagramom. (6 točk)<br>"
    r"1.2. Za koliko odstotkov je bila povprečna plača moških višja od povprečne plače žensk? (4 točke)",
    r"1.1. ženske \(1910\) €, moški \(2070\) € &nbsp; 1.2. za približno \(8{,}38\,\%\)",
    [
        "## 1.1",
        ("!ženske: 2000 · (1 − 0,045) = 1910 €", "", "odstotki"),
        ("!moški: 2000 · (1 + 0,035) = 2070 €", ""),
        ("@slika", stolpci_b1()),
        (None, "Navpična os se začne pri 1500 €, zato so razlike bolje vidne."),
        "## 1.2",
        (U("2070", "1910") + " ≈ 1,0838", "Osnova je plača žensk."),
        ("!moški so zaslužili približno 8,38 % več", ""),
    ],
)

b2 = naloga(
    "B2", "povrsine_prostornine", 10,
    r"Tina ima posodo v obliki valja. Posoda je visoka \(25\) cm, premer osnovne ploskve pa je \(16\) cm.<br>"
    r"2.1. Izračunaj ploščino osnovne ploskve in površino posode brez pokrova. Površino zaokroži na štiri mesta natančno. (6 točk)<br>"
    r"2.2. Tina v posodo nalije \(1{,}5\) litra vode. Kako visoko sega gladina vode? (4 točke)",
    r"2.1. \(S = 64\pi \approx 201{,}1\ \mathrm{cm^2}\), \(P \approx 1458\ \mathrm{cm^2}\) &nbsp; 2.2. \(h \approx 7{,}46\) cm",
    [
        "## 2.1",
        ("r = 8 cm", "Polmer je polovica premera."),
        ("!S = π · 8<sup>2</sup> = 64π ≈ 201,1 cm<sup>2</sup>", "", "krog"),
        ("P = S + 2πrv = 64π + 2π · 8 · 25 = 464π", "Brez pokrova: ena osnovna ploskev in plašč.", "telesa"),
        ("!P ≈ 1458 cm<sup>2</sup>", "1457,7 zaokrožimo na štiri mesta."),
        "## 2.2",
        ("1,5 L = 1500 cm<sup>3</sup>", "1 L = 1 dm³ = 1000 cm³."),
        ("h = " + U("V", "S") + " = " + U("1500", "64π"), "V = S · h."),
        ("!h ≈ 7,46 cm", ""),
    ],
)


def slika_b3(X, Y):
    return (krivulja(X, Y, lambda x: 3 - x / 2, -3, 9, MODRA) + krivulja(X, Y, lambda x: x / 3 - 2, -3, 9, RDECA)
            + f'<text x="{X(-2.6):.1f}" y="{Y(5):.1f}" font-size="12" fill="{MODRA}">p</text>'
            + f'<text x="{X(8.3):.1f}" y="{Y(1.2):.1f}" font-size="12" fill="{RDECA}">q</text>'
            + tocka(X, Y, 6, 0) + tocka(X, Y, 0, 3))


def slika_b3r(X, Y):
    return (slika_b3(X, Y) + krivulja(X, Y, lambda x: -2 * x + 4, -1, 5, "#1E9E5A")
            + f'<text x="{X(-0.8):.1f}" y="{Y(5.5):.1f}" font-size="12" fill="#1E9E5A">r</text>' + tocka(X, Y, 18 / 7, -8 / 7))

b3 = naloga(
    "B3", "linearna_funkcija", 10,
    r"Na sliki sta premica \(p\) in premica \(q\) z enačbo \(y = \frac{1}{3}x - 2\)." + mreza((-3, 9), (-6, 6), slika_b3, sirina=320)
    + r"3.1. Zapiši odsekovno obliko enačbe premice \(p\). (3 točke)<br>"
    r"3.2. V isti koordinatni sistem nariši premico \(r\) z enačbo \(y = -2x + 4\) in izračunaj kot med premicama \(r\) in \(q\). (7 točk)",
    r"3.1. \(\frac{x}{6} + \frac{y}{3} = 1\) &nbsp; 3.2. \(\varphi \approx 81{,}87^\circ\)",
    [
        "## 3.1",
        ("odseka: m = 6 (na osi x), n = 3 (na osi y)", "Premica p seka osi v točkah (6, 0) in (0, 3)."),
        ("!" + U("x", "6") + " + " + U("y", "3") + " = 1", ""),
        "## 3.2",
        ("@slika", mreza((-3, 9), (-6, 6), slika_b3r, sirina=320)),
        ("k<sub>r</sub> = −2,  k<sub>q</sub> = " + U("1", "3"), ""),
        ("tan φ = |" + U("k<sub>q</sub> − k<sub>r</sub>", "1 + k<sub>q</sub>k<sub>r</sub>") + "| = |" + U(U("1", "3") + " + 2", "1 − " + U("2", "3")) + "| = " + U(U("7", "3"), U("1", "3")) + " = 7", "Kot med premicama.", "premica"),
        ("!φ ≈ 81,87°", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, b1, b2, b3]
