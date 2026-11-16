# Zimski rok 2013 (uradna pola RIC P133-C101-1-1); 1. del 9 nalog (40 točk), 2. del 2 od 3 nalog po 15 točk
import math
from lib import U, K, naloga, mreza, krivulja, tocka, graf, svg, napis, tabela, MODRA, RDECA

LETO, ROK, DATUM = 2013, "zimski", "torek, 4. februar 2014"

# ------------------------------------------------------------------ 1. del
a1 = naloga(
    "A1", "stevila_deljivost", 4,
    r"Ali so izjave pravilne? Odgovori z DA ali NE."
    + tabela(["Izjava", "DA / NE"], [
        [r"\(-3\) je naravno število.", ""],
        [r"\(\sqrt{5}\) je realno število.", ""],
        [r"\(\frac{\pi}{2}\) je iracionalno število.", ""],
        [r"\(\sqrt{9}\) je racionalno število.", ""]]),
    r"NE, DA, DA, DA",
    [
        ("!1. NE", "Naravna števila so 1, 2, 3, …; −3 je celo število."),
        ("!2. DA", "Vsak koren nenegativnega števila je realno število.", "koreni"),
        ("!3. DA", "π je iracionalno, zato je iracionalna tudi njegova polovica."),
        ("!4. DA", "√9 = 3 = 3/1."),
    ],
)

a2 = naloga(
    "A2", "izrazi_potence", 4,
    r"Poenostavi izraz \(\dfrac{a^2 - 4b^2}{a^2 - 2ab}\) in izračunaj njegovo vrednost za \(a = 3\) in \(b = -1\).",
    r"\(\frac{a + 2b}{a}\); \(\frac{1}{3}\)",
    [
        (U("(a − 2b)(a + 2b)", "a(a − 2b)"), "Razlika kvadratov v števcu, izpostavljanje v imenovalcu."),
        ("!= " + U("a + 2b", "a"), "Okrajšamo z a − 2b."),
        ("!" + U("3 − 2", "3") + " = " + U("1", "3"), ""),
    ],
)

a3 = naloga(
    "A3", "kombinatorika_verjetnost", 4,
    r"Črke K, L, M, N, O razvrščamo v nize dolžine \(2\). V nizu se črke ne smejo ponavljati. Koliko različnih nizov dobimo? Zapiši tiste, ki se začnejo z M.",
    r"\(20\); MK, ML, MN, MO",
    [
        ("V<sub>2</sub><sup>5</sup> = 5 · 4", "Vrstni red je pomemben, ponavljanja ni.", "kombinatorika"),
        ("!20 nizov", ""),
        ("!MK, ML, MN, MO", "Za drugo mesto ostanejo štiri črke."),
    ],
)

a4 = naloga(
    "A4", "povrsine_prostornine", 4,
    r"Mama je Juretu v krožnik nalila \(4\) zajemalke juhe. Zajemalka ima obliko polkrogle s polmerom \(4\) cm. Koliko decilitrov juhe je v krožniku?",
    r"\(\approx 5{,}36\) dl",
    [
        ("V<sub>zajemalke</sub> = " + U("1", "2") + " · " + U("4", "3") + "πr<sup>3</sup> = " + U("2", "3") + "π · 64 = " + U("128π", "3") + " cm<sup>3</sup>", "Polovica krogle.", "telesa"),
        ("4 · " + U("128π", "3") + " = " + U("512π", "3") + " ≈ 536,2 cm<sup>3</sup>", ""),
        ("!≈ 5,36 dl", "1 dl = 100 cm³."),
    ],
)

a5 = naloga(
    "A5", "zaporedja_pm", 4,
    r"Starosti sina, hčerke in očeta so zaporedni členi geometrijskega zaporedja s količnikom \(2\). Skupaj so stari \(77\) let. Izračunaj starost očeta.",
    r"\(44\) let",
    [
        ("x + 2x + 4x = 77", "Členi so a₁, 2a₁, 4a₁.", "geometrijsko"),
        ("7x = 77  ⇒  x = 11", ""),
        ("!oče: 4 · 11 = 44 let", "Sin ima 11, hči 22 let."),
    ],
)

a6 = naloga(
    "A6", "polinomi_racionalna", 5,
    r"Izračunaj ničle funkcije \(f(x) = x^3 - 4x\) in skiciraj njen graf.",
    r"\(x_1 = 0\), \(x_{2,3} = \pm 2\)",
    [
        ("x<sup>3</sup> − 4x = x(x − 2)(x + 2)", "Izpostavimo x, nato razlika kvadratov."),
        ("!x<sub>1</sub> = 0,  x<sub>2</sub> = 2,  x<sub>3</sub> = −2", ""),
        ("@slika", graf([(lambda x: x ** 3 - 4 * x, MODRA)], (-3, 3), (-5, 5), [(-2, 0, ""), (0, 0, ""), (2, 0, "")], sirina=240, visina=320)),
        (None, "Vodilni koeficient je pozitiven: graf prihaja od spodaj levo in odide zgoraj desno."),
    ],
)

FR = [4, 8, 10, 7, 6]

a7 = naloga(
    "A7", "statistika_pm", 5,
    r"V preglednici so rezultati pisnega ocenjevanja."
    + tabela(["Ocena", "nzd (1)", "zd (2)", "db (3)", "pdb (4)", "odl (5)"], [["Št. dijakov"] + [str(f) for f in FR]])
    + r"Zapiši modus in mediano ter izračunaj aritmetično sredino.",
    r"\(Mo = 3\), \(Me = 3\), \(\bar{x} \approx 3{,}09\)",
    [
        ("!Mo = 3", "Najpogostejša ocena (10 dijakov).", "statistika"),
        ("n = 35, mediana je 18. podatek", ""),
        ("!Me = 3", "Ocene 1 so na mestih 1–4, ocene 2 na 5–12, ocene 3 na 13–22."),
        ("x̄ = " + U("4 + 16 + 30 + 28 + 30", "35") + " = " + U("108", "35"), ""),
        ("!x̄ ≈ 3,09", ""),
    ],
)

a8 = naloga(
    "A8", "eksponentna_logaritemska", 5,
    r"Reši enačbo \(3^{x^2 - 2x} = 27\).",
    r"\(x_1 = 3\), \(x_2 = -1\)",
    [
        ("3<sup>x² − 2x</sup> = 3<sup>3</sup>", "", "eksponentna"),
        ("x<sup>2</sup> − 2x − 3 = 0", ""),
        ("(x − 3)(x + 1) = 0", "", "kvadratna"),
        ("!x<sub>1</sub> = 3,  x<sub>2</sub> = −1", ""),
    ],
)


def pravokotnik():
    k = 14
    t = [f'<rect x="20" y="20" width="{12 * k}" height="{5 * k}" fill="{MODRA}" fill-opacity="0.08" stroke="currentColor" stroke-width="1.6"/>',
         f'<line x1="20" y1="{20 + 5 * k}" x2="{20 + 12 * k}" y2="20" stroke="{RDECA}" stroke-width="1.5"/>',
         napis(20 + 6 * k, 36 + 5 * k, "a = 12 cm", 11), napis(8, 24 + 2.5 * k, "b", 12), napis(20 + 6 * k + 12, 20 + 2.5 * k - 4, "d = 13 cm", 11, RDECA)]
    return svg(210, 115, "".join(t), opis="Pravokotnik z diagonalo")

a9 = naloga(
    "A9", "obsegi_ploscine", 5,
    r"V pravokotniku meri ena stranica \(12\) cm, diagonala pa \(13\) cm. Nariši skico. Izračunaj obseg in ploščino pravokotnika.",
    r"\(o = 34\) cm, \(p = 60\ \mathrm{cm^2}\)",
    [
        ("@slika", pravokotnik()),
        ("b = " + K("13<sup>2</sup> − 12<sup>2</sup>") + " = " + K("25") + " = 5 cm", "", "pitagora"),
        ("!o = 2(12 + 5) = 34 cm", ""),
        ("!p = 12 · 5 = 60 cm<sup>2</sup>", "", "ploscine"),
    ],
)

# ------------------------------------------------------------------ 2. del
b1 = naloga(
    "B1", "linearna_funkcija", 15,
    r"Dana je premica z enačbo \(y = -3x + 6\).<br>"
    r"1.1. Zapiši koordinate presečišč premice s koordinatnima osema in jo nariši. (5 točk)<br>"
    r"1.2. Zapiši enačbo premice, ki je vzporedna dani premici in poteka skozi točko \(T(0, -2)\). (5 točk)<br>"
    r"1.3. Izračunaj presečišče premice \(y = -3x + 6\) in premice \(y = 2x + 1\). (5 točk)",
    r"1.1. \((2, 0)\), \((0, 6)\) &nbsp; 1.2. \(y = -3x - 2\) &nbsp; 1.3. \((1, 3)\)",
    [
        "## 1.1",
        ("!z osjo x: −3x + 6 = 0  ⇒  (2, 0)", "", "premica"),
        ("!z osjo y: (0, 6)", ""),
        ("@slika", graf([(lambda x: -3 * x + 6, MODRA), (lambda x: -3 * x - 2, RDECA), (lambda x: 2 * x + 1, "#1E9E5A")], (-3, 4), (-6, 8),
                        [(2, 0, ""), (0, 6, ""), (0, -2, "T"), (1, 3, "P")], sirina=260, visina=420)),
        "## 1.2",
        ("k = −3, n = −2", "Vzporedna premica ima enak smerni koeficient, T leži na osi y."),
        ("!y = −3x − 2", ""),
        "## 1.3",
        ("−3x + 6 = 2x + 1  ⇒  5x = 5  ⇒  x = 1", "", "sistem"),
        ("!P(1, 3)", "y = 2 · 1 + 1 = 3."),
    ],
)

b2 = naloga(
    "B2", "povrsine_prostornine", 15,
    r"Klavdija je kupila stekleničko valjaste oblike s polmerom \(2\) cm in višino \(12\) cm.<br>"
    r"2.1. V stekleničko je nalila \(45\) ml parfuma. Kako visoko nad dnom je gladina? (5 točk)<br>"
    r"2.2. Steklenička je v embalaži v obliki kvadra. Izračunaj površino embalaže, če je ta najmanjša možna. (5 točk)<br>"
    r"2.3. Po enem mesecu je Klavdija porabila \(20\,\%\) parfuma. Kako visoko je bila gladina po enem mesecu? (5 točk)",
    r"2.1. \(\approx 3{,}58\) cm &nbsp; 2.2. \(224\ \mathrm{cm^2}\) &nbsp; 2.3. \(\approx 2{,}86\) cm",
    [
        "## 2.1",
        ("45 ml = 45 cm<sup>3</sup>", ""),
        ("πr<sup>2</sup>h = 45  ⇒  h = " + U("45", "4π"), "", "telesa"),
        ("!h ≈ 3,58 cm", ""),
        "## 2.2",
        ("kvader 4 cm × 4 cm × 12 cm", "Osnovna ploskev je kvadrat s stranico, enako premeru valja."),
        ("P = 2 · 4 · 4 + 4 · 4 · 12 = 32 + 192", ""),
        ("!P = 224 cm<sup>2</sup>", ""),
        "## 2.3",
        ("ostane 0,8 · 45 = 36 ml", "", "odstotki"),
        ("!h = " + U("36", "4π") + " ≈ 2,86 cm", ""),
    ],
)

b3 = naloga(
    "B3", "zaporedja_pm", 15,
    r"Dano je aritmetično zaporedje \(-7, -4, -1, 2, 5, \ldots\)<br>"
    r"3.1. Zapiši prvi člen in diferenco ter izračunaj deseti člen. (4 točke)<br>"
    r"3.2. Kateri člen zaporedja je enak \(287\)? (5 točk)<br>"
    r"3.3. Koliko začetnih členov moramo sešteti, da bo vsota enaka \(430\)? (6 točk)",
    r"3.1. \(a_1 = -7\), \(d = 3\), \(a_{10} = 20\) &nbsp; 3.2. \(a_{99}\) &nbsp; 3.3. \(20\)",
    [
        "## 3.1",
        ("!a<sub>1</sub> = −7,  d = 3", "", "aritmeticno"),
        ("!a<sub>10</sub> = −7 + 9 · 3 = 20", ""),
        "## 3.2",
        ("−7 + (n − 1) · 3 = 287  ⇒  n − 1 = 98", ""),
        ("!n = 99", "287 je 99. člen."),
        "## 3.3",
        ("S<sub>n</sub> = " + U("n", "2") + "(2 · (−7) + (n − 1) · 3) = " + U("n(3n − 17)", "2") + " = 430", ""),
        ("3n<sup>2</sup> − 17n − 860 = 0", ""),
        ("n = " + U("17 + " + K("289 + 10 320"), "6") + " = " + U("17 + 103", "6") + " = 20", "Negativna rešitev ne pride v poštev.", "kvadratna"),
        ("!n = 20", ""),
    ],
)

NALOGE = [a1, a2, a3, a4, a5, a6, a7, a8, a9, b1, b2, b3]
