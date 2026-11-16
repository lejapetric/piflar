# python3 tools/poklicna/pole_mat.py
# Vadbene pole za poklicno maturo iz matematike → api/data/matura-poklicna_matematika.json
#
# Zgradba vsake pole sledi uradni poli (katalog 2026): 120 minut, 70 točk;
#   1. del: 11 krajših nalog (7 × 4 točke, 2 × 5 točk, 2 × 6 točk) = 50 točk,
#   2. del: 3 sestavljene naloge po 10 točk, kandidat izbere in reši 2 = 20 točk.
# Naloge nastanejo iz predlog spodaj z naključnimi, a ponovljivimi podatki (seme = leto in rok),
# zato so besedila, rezultati in postopki med seboj usklajeni. Vsak postopek je zapisan kot
# rokopis (korak + komentar) z oznako, ali je uporabljena formula na listu s formulami.
import json, math, os, random, re
from fractions import Fraction as F

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
IZHOD = os.path.join(KOREN, "api", "data", "matura-poklicna_matematika.json")
PREDMET = "poklicna_matematika"

# Pole: (leto, rok, datum)
POLE = [
    (2026, "spomladanski", "sobota, 30. maj 2026"),
    (2025, "spomladanski", "sobota, 31. maj 2025"),
    (2025, "jesenski", "četrtek, 28. avgust 2025"),
    (2025, "zimski", "sreda, 4. februar 2026"),
    (2024, "spomladanski", "sobota, 1. junij 2024"),
    (2024, "jesenski", "torek, 27. avgust 2024"),
    (2024, "zimski", "sreda, 5. februar 2025"),
    (2023, "spomladanski", "sobota, 3. junij 2023"),
    (2023, "jesenski", "ponedeljek, 28. avgust 2023"),
    (2023, "zimski", "sreda, 7. februar 2024"),
    (2022, "spomladanski", "sobota, 4. junij 2022"),
    (2022, "jesenski", "ponedeljek, 29. avgust 2022"),
    (2022, "zimski", "sreda, 1. februar 2023"),
    (2021, "spomladanski", "sobota, 5. junij 2021"),
]

# Pravila v postopkih: (ime, ali je formula na listu s formulami, ki je priložen poli)
PRAVILA = {
    "D_v": ("Razcep na prafaktorje, največji skupni delitelj in najmanjši skupni večkratnik", False),
    "odstotki": ("Odstotni račun: delež = osnova · p/100", False),
    "potence": ("Pravila za računanje s potencami", False),
    "koreni": ("Delno korenjenje in racionalizacija imenovalca", False),
    "premica": ("Smerni koeficient k = (y₂ − y₁)/(x₂ − x₁), enačba premice y − y₁ = k(x − x₁)", True),
    "razdalja": ("Razdalja med točkama d = √((x₂ − x₁)² + (y₂ − y₁)²)", True),
    "kvadratna": ("Rešitvi kvadratne enačbe x₁,₂ = (−b ± √D)/(2a), D = b² − 4ac", True),
    "teme": ("Teme parabole T(p, q), p = −b/(2a), q = −D/(4a)", True),
    "vieta": ("Vietovi pravili x₁ + x₂ = −b/a, x₁x₂ = c/a", True),
    "eksponentna": ("Enačba z isto osnovo: aˣ = aʸ ⇒ x = y", False),
    "logaritem": ("Definicija logaritma: logₐ x = y ⇔ aʸ = x", False),
    "log_pravila": ("Pravila za računanje z logaritmi", True),
    "pitagora": ("Pitagorov izrek c² = a² + b²", False),
    "kotne": ("Kotne funkcije v pravokotnem trikotniku", True),
    "sinusni": ("Sinusni izrek a/sin α = b/sin β = c/sin γ = 2R", True),
    "kosinusni": ("Kosinusni izrek a² = b² + c² − 2bc cos α", True),
    "ploscine": ("Ploščine likov", True),
    "krog": ("Obseg in ploščina kroga o = 2πr, S = πr²", True),
    "telesa": ("Površina in prostornina teles", True),
    "aritmeticno": ("Aritmetično zaporedje aₙ = a₁ + (n − 1)d, sₙ = n/2 · (2a₁ + (n − 1)d)", True),
    "geometrijsko": ("Geometrijsko zaporedje aₙ = a₁qⁿ⁻¹, sₙ = a₁(qⁿ − 1)/(q − 1)", True),
    "obresti": ("Obrestno obrestovanje Gₙ = G₀(1 + p/100)ⁿ", True),
    "statistika": ("Aritmetična sredina, mediana in modus", False),
    "kombinatorika": ("Permutacije, variacije in kombinacije", True),
    "verjetnost": ("Verjetnost P(A) = število ugodnih / število vseh izidov", True),
    "odvod": ("Pravila za odvajanje", True),
    "tangenta": ("Tangenta y − f(x₀) = f′(x₀)(x − x₀)", False),
    "horner": ("Hornerjev algoritem", False),
    "racionalna": ("Ničle, poli in vodoravna asimptota racionalne funkcije", False),
    "sistem": ("Reševanje sistema dveh linearnih enačb", False),
    "neenacba": ("Kvadratna neenačba: predznak med ničlama", False),
    "adicijski": ("Adicijski izreki in zveze med kotnimi funkcijami", True),
    "konstrukcija": ("Načrtovanje z geometrijskim orodjem", False),
}


# ---------------------------------------------------------------- oblikovanje
def st(x, d=2):
    """Število v slovenskem zapisu (decimalna vejica, minus, brez nepotrebnih ničel)."""
    if isinstance(x, F):
        if x.denominator == 1:
            x = x.numerator
        else:
            x = float(x)
    if isinstance(x, float):
        x = round(x, d)
        if abs(x - round(x)) < 1e-9:
            x = int(round(x))
    s = f"{x}" if isinstance(x, int) else f"{x:.{d}f}".rstrip("0").rstrip(".")
    if isinstance(x, int) and abs(x) >= 10000:
        s = f"{x:,}".replace(",", " ")
    return s.replace(".", ",").replace("-", "−")


def lst(x, d=2):
    """Število za LaTeX (decimalna vejica {,})."""
    return st(x, d).replace(",", "{,}").replace("−", "-").replace(" ", "\\,")


def ulomek_tex(q):
    q = F(q)
    if q.denominator == 1:
        return lst(q.numerator)
    znak = "-" if q < 0 else ""
    return f"{znak}\\frac{{{abs(q.numerator)}}}{{{q.denominator}}}"


def ulomek_html(q):
    q = F(q)
    if q.denominator == 1:
        return st(q.numerator)
    znak = "−" if q < 0 else ""
    return f'{znak}<span class="ul"><span>{abs(q.numerator)}</span><span>{q.denominator}</span></span>'


def clen(k, x="x", prvi=False):
    """k·x kot del vsote: '+ 3x', '− x', '2x' ..."""
    k = F(k)
    if k == 0:
        return ""
    abs_k = abs(k)
    koef = "" if (abs_k == 1 and x) else (st(abs_k) if abs_k.denominator == 1 else ulomek_html(abs_k))
    if prvi:
        return ("−" if k < 0 else "") + koef + x
    return (" − " if k < 0 else " + ") + koef + x


def polinom_html(koef, x="x"):
    """[a_n, ..., a_0] → 'x³ − 2x + 1' v HTML."""
    n = len(koef) - 1
    deli = []
    for i, a in enumerate(koef):
        p = n - i
        if a == 0:
            continue
        sp = "" if p == 0 else (x if p == 1 else f"{x}<sup>{p}</sup>")
        deli.append(clen(a, sp, prvi=not deli))
    return "".join(deli) or "0"


def polinom_tex(koef, x="x"):
    n = len(koef) - 1
    s = ""
    for i, a in enumerate(koef):
        p = n - i
        if a == 0:
            continue
        a = F(a)
        sp = "" if p == 0 else (x if p == 1 else f"{x}^{{{p}}}")
        absa = abs(a)
        koef_s = "" if (absa == 1 and sp) else ulomek_tex(absa)
        if not s:
            s = ("-" if a < 0 else "") + koef_s + sp
        else:
            s += (" - " if a < 0 else " + ") + koef_s + sp
    return s or "0"


def oznaka_pravila(k):
    ime, na_listu = PRAVILA[k]
    t = "je na listu s formulami" if na_listu else "ni na listu s formulami"
    return (f'<span class="rk-pravilo"><span class="rk-pravilo-ime">{ime}</span>'
            f'<span class="rk-list {"rk-da" if na_listu else "rk-ne"}">{t}</span></span>')


def rokopis(koraki):
    """koraki: (v, komentar[, pravilo]) ali '## naslov' ali ('@slika', svg). v z '!' je končni odgovor."""
    deli, ze = [], set()
    for k in koraki:
        if isinstance(k, str):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{k[2:].strip()}</div></div>')
            continue
        if k[0] == "@slika":
            deli.append(f'<div class="rk-slika">{k[1]}</div>')
            continue
        v, kom, *pr = k
        oz = ""
        for p in pr:
            if p not in ze:
                ze.add(p)
                oz += oznaka_pravila(p)
        if v is None:
            deli.append(f'<div class="rk-kom rk-sam">{kom}{oz}</div>')
            continue
        if v.startswith("!"):
            v = f'<span class="rk-odg">{v[1:]}</span>'
        deli.append(f'<div class="rk-korak"><div class="rk-v">{v}</div><div class="rk-kom">{kom}{oz}</div></div>')
    return '<div class="rokopis">' + "".join(deli) + "</div>"


def opk(x):
    """Število v oklepaju le, če je negativno: 3 ali (−3)."""
    t = st(x) if not isinstance(x, int) else str(x).replace("-", "−")
    return f"({t})" if x < 0 else t


def odst(x):
    """»− x« zapisano kot odštevanje: − 3 ali + 3."""
    t = st(abs(x)) if not isinstance(x, int) else str(abs(x))
    return f"+ {t}" if x < 0 else f"− {t}"


def tocke_txt(t):
    return "1 točka" if t == 1 else "2 točki" if t == 2 else f"{t} točke" if t <= 4 else f"{t} točk"


# ---------------------------------------------------------------- graf funkcije
def graf(funkcije, xr, yr, tocke=(), sirina=340, visina=260, oznake=True):
    """Koordinatni sistem z mrežo in grafi funkcij. funkcije: [(f, barva_razred)], tocke: [(x, y, napis)]."""
    x0, x1 = xr
    y0, y1 = yr
    L, T = 10, 10
    W, H = sirina - 20, visina - 20
    X = lambda x: L + (x - x0) / (x1 - x0) * W
    Y = lambda y: T + (y1 - y) / (y1 - y0) * H
    d = [f'<svg class="mn-graf" viewBox="0 0 {sirina} {visina}" width="{sirina}" role="img" aria-label="Graf funkcije" '
         'style="max-width:100%;height:auto;display:block;margin:0.4rem 0">']
    korak_x = 1 if x1 - x0 <= 16 else 2
    korak_y = 1 if y1 - y0 <= 16 else (2 if y1 - y0 <= 32 else 5)
    for i in range(math.ceil(x0), math.floor(x1) + 1):
        if i % korak_x:
            continue
        d.append(f'<line x1="{X(i):.1f}" y1="{T}" x2="{X(i):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.12"/>')
        if oznake and i != 0:
            d.append(f'<text x="{X(i):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">{st(i)}</text>')
    for j in range(math.ceil(y0), math.floor(y1) + 1):
        if j % korak_y:
            continue
        d.append(f'<line x1="{L}" y1="{Y(j):.1f}" x2="{L + W}" y2="{Y(j):.1f}" stroke="currentColor" stroke-opacity="0.12"/>')
        if oznake and j != 0:
            d.append(f'<text x="{X(0) - 4:.1f}" y="{Y(j) + 3.5:.1f}" font-size="10" text-anchor="end" fill="currentColor">{st(j)}</text>')
    d.append(f'<line x1="{L}" y1="{Y(0):.1f}" x2="{L + W}" y2="{Y(0):.1f}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<line x1="{X(0):.1f}" y1="{T}" x2="{X(0):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<text x="{L + W - 2}" y="{Y(0) - 5:.1f}" font-size="12" text-anchor="end" fill="currentColor">x</text>')
    d.append(f'<text x="{X(0) + 5:.1f}" y="{T + 10}" font-size="12" fill="currentColor">y</text>')
    for f, barva in funkcije:
        poti, tren = [], []
        n = 400
        for i in range(n + 1):
            x = x0 + (x1 - x0) * i / n
            try:
                y = f(x)
            except (ZeroDivisionError, ValueError, OverflowError):
                y = None
            if y is None or not math.isfinite(y) or y < y0 - (y1 - y0) or y > y1 + (y1 - y0):
                if len(tren) > 1:
                    poti.append(tren)
                tren = []
                continue
            tren.append((X(x), Y(max(min(y, y1 + 1), y0 - 1))))
        if len(tren) > 1:
            poti.append(tren)
        for p in poti:
            pts = " ".join(f"{a:.1f},{b:.1f}" for a, b in p)
            d.append(f'<polyline points="{pts}" fill="none" stroke="{barva}" stroke-width="2"/>')
    for x, y, napis in tocke:
        d.append(f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="3.2" fill="currentColor"/>')
        if napis:
            d.append(f'<text x="{X(x) + 5:.1f}" y="{Y(y) - 5:.1f}" font-size="11" fill="currentColor">{napis}</text>')
    d.append(f'<clipPath id="x"><rect x="{L}" y="{T}" width="{W}" height="{H}"/></clipPath></svg>')
    return "".join(d)


MODRA, RDECA = "#2F5BD3", "#D6293E"


# ---------------------------------------------------------------- predloge: 1. del
# Vsaka predloga: f(r) → dict(poglavje, besedilo, rezultat, koraki)

def p_D_v(r):
    while True:
        g = r.choice([6, 8, 10, 12, 14, 15, 18, 20, 24])
        a, b = r.sample([2, 3, 4, 5, 7], 2)
        if math.gcd(a, b) == 1:
            break
    A, B = g * a, g * b
    v = A * B // math.gcd(A, B)

    def razcep(n):
        f, k, out = n, 2, []
        while f > 1:
            while f % k == 0:
                out.append(k)
                f //= k
            k += 1
        return out

    def zapis(n):
        f = razcep(n)
        return " · ".join(f"{p}<sup>{f.count(p)}</sup>" if f.count(p) > 1 else f"{p}" for p in sorted(set(f)))
    kontekst = r.choice([
        (f"Z avtobusne postaje odpelje avtobus linije 1 vsakih {A} minut, avtobus linije 2 pa vsakih {B} minut. Ob 7.00 odpeljeta hkrati. Čez koliko minut bosta spet odpeljala hkrati?", "minut", "v"),
        (f"V skladišču je {A} rdečih in {B} modrih kock. Razdeliti jih želimo v čim več enakih paketov, tako da je v vsakem paketu enako število rdečih in enako število modrih kock in da nobena kocka ne ostane. Koliko paketov dobimo?", "paketov", "D"),
    ])
    besedilo = (f"Števili \\({A}\\) in \\({B}\\) razcepi na prafaktorje ter izračunaj njun največji skupni delitelj in najmanjši skupni večkratnik.<br>"
                f"{kontekst[0]}")
    odg = v if kontekst[2] == "v" else g
    koraki = [(f"{A} = {zapis(A)}", f"{A} zaporedno delimo s praštevili.", "D_v"),
              (f"{B} = {zapis(B)}", f"Enako razcepimo {B}."),
              (f"D({A}, {B}) = {g}", "Skupni prafaktorji z manjšim eksponentom."),
              (f"v({A}, {B}) = {v}", "Vsi prafaktorji z večjim eksponentom (ali v = a · b / D)."),
              (f"!{odg} {kontekst[1]}", "Hkratni odhod je skupni večkratnik časov." if kontekst[2] == "v" else "Število paketov mora deliti obe števili, iščemo največje tako število.")]
    return dict(poglavje="stevila_deljivost", besedilo=besedilo,
                rezultat=f"\\(D = {g}\\), \\(v = {v}\\), {odg} {kontekst[1]}", koraki=koraki)


def p_odstotki(r):
    cena = r.choice([40, 60, 80, 120, 150, 200, 250, 320])
    p1 = r.choice([10, 15, 20, 25])
    p2 = r.choice([10, 20, 30])
    izdelek = r.choice(["kolo", "telefon", "par čevljev", "jakna", "slušalke", "tiskalnik"])
    c1 = F(cena) * (100 + p1) / 100
    c2 = c1 * (100 - p2) / 100
    rel = (c2 - cena) / cena * 100
    besedilo = (f"Cena izdelka ({izdelek}) je bila \\({cena}\\) €. Najprej so ga podražili za \\({p1}\\,\\%\\), nato pa novo ceno znižali za \\({p2}\\,\\%\\).<br>"
                "Kolikšna je končna cena? Za koliko odstotkov se je končna cena razlikuje od prvotne?")
    koraki = [(f"c₁ = {cena} · {st(F(100 + p1, 100))} = {st(c1)} €", f"Podražitev za {p1} %: novo ceno dobimo, ko pomnožimo z {st(F(100 + p1, 100))}.", "odstotki"),
              (f"c₂ = {st(c1)} · {st(F(100 - p2, 100))} = {st(c2)} €", f"Znižanje za {p2} % računamo od nove cene."),
              (f"{st(c2)} − {cena} = {st(c2 - cena)} €", "Razlika glede na prvotno ceno."),
              (f"!{st(c2 - cena)} / {cena} · 100 % = {st(rel)} %", "Relativna sprememba glede na osnovo (prvotno ceno)." + (" Končna cena je nižja." if rel < 0 else " Končna cena je višja." if rel > 0 else ""))]
    return dict(poglavje="ulomki_odstotki", besedilo=besedilo.replace("se je končna cena razlikuje", "se končna cena razlikuje"),
                rezultat=f"{st(c2)} €, {'nižja' if rel < 0 else 'višja'} za {st(abs(rel))} %" if rel != 0 else f"{st(c2)} €, enaka", koraki=koraki)


def p_sklepni(r):
    delavci = r.choice([4, 5, 6, 8])
    dni = r.choice([6, 9, 10, 12, 15])
    novi = r.choice([d for d in [2, 3, 4, 10, 12] if (delavci * dni) % d == 0 and d != delavci])
    dela = delavci * dni
    besedilo = (f"{delavci} delavcev opravi delo v \\({dni}\\) dneh. V koliko dneh bi enako delo opravilo {novi} delavcev, če delajo enako hitro?<br>"
                f"Razmerje stroškov za material in za delo je \\(2 : 3\\). Skupni stroški so \\({dela * 50}\\) €. Koliko stane delo?")
    delo = F(dela * 50) * 3 / 5
    koraki = [(f"{delavci} · {dni} = {dela} delovnih dni", "Več delavcev, manj dni: obratno sorazmerje. Produkt je stalen."),
              (f"!{dela} : {novi} = {st(F(dela, novi))} dni", f"Isto število delovnih dni razdelimo med {novi} delavcev."),
              (f"{dela * 50} : 5 = {dela * 10} €", "Razmerje 2 : 3 ima skupaj 5 delov."),
              (f"!3 · {dela * 10} = {st(delo)} €", "Delo so 3 deli.")]
    return dict(poglavje="ulomki_odstotki", besedilo=besedilo, rezultat=f"{st(F(dela, novi))} dni, {st(delo)} €", koraki=koraki)


def p_izraz(r):
    a = r.choice([2, 3, 4, 5])
    b = r.choice([1, 2, 3])
    # (a x + b)^2 - (a x - b)^2 = 4ab x ; razcep a^2x^2 - b^2
    besedilo = (f"Poenostavi izraz \\((\\,{a}x + {b})^2 - ({a}x - {b})^2\\) in razstavi izraz \\({a * a}x^2 - {b * b}\\).<br>"
                f"Okrajšaj ulomek \\(\\dfrac{{{a * a}x^2 - {b * b}}}{{{a}x^2 + {b}x}}\\).").replace("\\,", "")
    koraki = [(f"({a}x + {b})<sup>2</sup> = {a * a}x<sup>2</sup> + {2 * a * b}x + {b * b}", "Kvadrat dvočlenika (a + b)² = a² + 2ab + b²."),
              (f"({a}x − {b})<sup>2</sup> = {a * a}x<sup>2</sup> − {2 * a * b}x + {b * b}", "Kvadrat razlike."),
              (f"!{4 * a * b}x", "Odštejemo: kvadratna in prosta člena se odštejeta."),
              (f"!{a * a}x<sup>2</sup> − {b * b} = ({a}x − {b})({a}x + {b})", "Razlika kvadratov a² − b² = (a − b)(a + b)."),
              (f"{a}x<sup>2</sup> + {b}x = x({a}x + {b})", "V imenovalcu izpostavimo x."),
              (f"!<span class=\"ul\"><span>{a}x − {b}</span><span>x</span></span>", f"Krajšamo s ({a}x + {b}), pogoj x ≠ 0 in x ≠ −{st(F(b, a))}.")]
    return dict(poglavje="izrazi_potence", besedilo=besedilo,
                rezultat=f"\\({4 * a * b}x\\), \\(({a}x - {b})({a}x + {b})\\), \\(\\dfrac{{{a}x - {b}}}{{x}}\\)", koraki=koraki)


def p_potence(r):
    a, b = r.choice([(2, 3), (3, 2), (2, 5), (5, 2), (3, 4)])
    m, n = r.choice([(3, 2), (4, 3), (5, 2)])
    besedilo = (f"Izraz \\(\\dfrac{{{a}^{{{m + 1}}} \\cdot {b}^{{-{n}}}}}{{{a}^{{{m - 1}}} \\cdot {b}^{{-{n + 1}}}}}\\) zapiši kot naravno število.<br>"
                f"Poenostavi \\(\\left(\\dfrac{{x^{{{m}}} y^{{-2}}}}{{x^{{-1}} y}}\\right)^{{2}}\\) in rezultat zapiši brez negativnih eksponentov.")
    vr = a ** 2 * b
    koraki = [(f"{a}<sup>{m + 1} − {m - 1}</sup> = {a}<sup>2</sup>", "Potenci z isto osnovo delimo tako, da eksponenta odštejemo.", "potence"),
              (f"{b}<sup>−{n} − (−{n + 1})</sup> = {b}<sup>1</sup>", "Enako za osnovo " + str(b) + "."),
              (f"!{a * a} · {b} = {vr}", ""),
              (f"x<sup>{m} − (−1)</sup> y<sup>−2 − 1</sup> = x<sup>{m + 1}</sup> y<sup>−3</sup>", "Najprej poenostavimo ulomek v oklepaju."),
              (f"!(x<sup>{m + 1}</sup> y<sup>−3</sup>)<sup>2</sup> = <span class=\"ul\"><span>x<sup>{2 * m + 2}</sup></span><span>y<sup>6</sup></span></span>", "Potenco potenciramo tako, da eksponenta zmnožimo; y⁻⁶ = 1/y⁶.")]
    return dict(poglavje="izrazi_potence", besedilo=besedilo, rezultat=f"\\({vr}\\), \\(\\dfrac{{x^{{{2 * m + 2}}}}}{{y^6}}\\)", koraki=koraki)


def p_koreni(r):
    a = r.choice([2, 3, 5])
    k1, k2 = r.choice([(3, 2), (4, 3), (5, 2), (2, 3)])
    s1, s2 = k1 * k1 * a, k2 * k2 * a
    m = r.choice([2, 3, 6])
    besedilo = (f"Delno koreni in izračunaj \\(\\sqrt{{{s1}}} + \\sqrt{{{s2}}}\\).<br>"
                f"Racionaliziraj imenovalec ulomka \\(\\dfrac{{{m}}}{{\\sqrt{{{a}}}}}\\).")
    koraki = [(f"√{s1} = √({k1 * k1} · {a}) = {k1}√{a}", f"{k1 * k1} je popolni kvadrat.", "koreni"),
              (f"√{s2} = {k2}√{a}", ""),
              (f"!{k1}√{a} + {k2}√{a} = {k1 + k2}√{a}", "Seštevamo »enake« korene."),
              (f"<span class=\"ul\"><span>{m}</span><span>√{a}</span></span> · <span class=\"ul\"><span>√{a}</span><span>√{a}</span></span> = <span class=\"ul\"><span>{m}√{a}</span><span>{a}</span></span>", "Števec in imenovalec pomnožimo z √" + str(a) + "."),
              (f"!{('√' + str(a)) if m == a else (ulomek_html(F(m, a)) + '√' + str(a)) if F(m, a).denominator != 1 else (st(F(m, a)) + '√' + str(a))}", "Okrajšamo, če je mogoče.")]
    rez = f"\\(\\sqrt{{{a}}}\\)" if m == a else (f"\\({ulomek_tex(F(m, a))}\\sqrt{{{a}}}\\)")
    return dict(poglavje="realna_stevila_koreni", besedilo=besedilo, rezultat=f"\\({k1 + k2}\\sqrt{{{a}}}\\), {rez}", koraki=koraki)


def p_absolutna(r):
    a = r.choice([1, 2, 3, -1, -2])
    b = r.choice([3, 4, 5, 6])
    besedilo = (f"Reši enačbo \\(|x {'+' if a < 0 else '-'} {abs(a)}| = {b}\\) in neenačbo \\(|x| \\le {b - 1}\\). Rešitev neenačbe zapiši z intervalom in jo prikaži na številski premici.")
    x1, x2 = a - b, a + b
    koraki = [(f"x {'+' if a < 0 else '−'} {abs(a)} = {b} ali x {'+' if a < 0 else '−'} {abs(a)} = −{b}", "Absolutna vrednost je b, če je izraz b ali −b."),
              (f"!x₁ = {st(x2)}, x₂ = {st(x1)}", ""),
              (f"!−{b - 1} ≤ x ≤ {b - 1}, x ∈ [−{b - 1}, {b - 1}]", "Razdalja do 0 je največ " + str(b - 1) + "; krajišči sta vključeni (oglati oklepaj).")]
    return dict(poglavje="realna_stevila_koreni", besedilo=besedilo, rezultat=f"\\(x_1 = {x2}\\), \\(x_2 = {x1}\\); \\(x \\in [-{b - 1}, {b - 1}]\\)", koraki=koraki)


def p_premica(r):
    while True:
        x1, y1 = r.randint(-3, 2), r.randint(-3, 4)
        dx, dy = r.choice([1, 2, 3, 4]), r.choice([-6, -4, -3, -2, 2, 3, 4, 6])
        if dy % dx == 0:
            break
    x2, y2 = x1 + dx, y1 + dy
    k = F(dy, dx)
    n = y1 - k * x1
    nicla = -n / k
    besedilo = (f"Premica poteka skozi točki \\(A({x1}, {y1})\\) in \\(B({x2}, {y2})\\). Zapiši njeno enačbo v eksplicitni obliki, "
                "izračunaj ničlo in začetno vrednost ter dolžino daljice \\(AB\\).")
    d2 = dx * dx + dy * dy
    kor = math.isqrt(d2)
    dolzina = st(kor) if kor * kor == d2 else f"√{d2} ≈ {st(math.sqrt(d2))}"
    koraki = [(f"k = <span class=\"ul\"><span>{y2} {odst(y1)}</span><span>{x2} {odst(x1)}</span></span> = {st(k)}", "Smerni koeficient iz dveh točk.", "premica"),
              (f"y {odst(y1)} = {opk(k)}(x {odst(x1)})", "Enačba premice skozi točko A."),
              (f"!y = {st(k)}x{clen(n, '') if n else ''}", "Uredimo v eksplicitno obliko y = kx + n."),
              (f"!n = {st(n)}, x₀ = {ulomek_html(nicla)}", "Začetna vrednost je n; ničla: 0 = kx + n."),
              (f"!d(A, B) = √({dx}² + {dy}²) = {dolzina}", "Razdalja med točkama.", "razdalja")]
    nt = f"x_0 = {ulomek_tex(nicla)}"
    return dict(poglavje="linearna_funkcija", besedilo=besedilo,
                rezultat=f"\\(y = {lst(k)}x {'+' if n >= 0 else '-'} {lst(abs(n))}\\), \\(n = {lst(n)}\\), \\({nt}\\), \\(d = {'\\sqrt{' + str(d2) + '}' if kor * kor != d2 else kor}\\)".replace(" + 0", ""),
                koraki=koraki)


def p_sistem(r):
    a, b = r.choice([(3, 5), (2, 7), (4, 3), (5, 2), (6, 4)])
    x, y = r.randint(3, 12), r.randint(2, 10)
    c1, c2 = r.choice([("zvezek", "svinčnik"), ("kava", "rogljiček"), ("vstopnica za odrasle", "otroška vstopnica")])
    s1 = x + y
    s2 = a * x + b * y
    besedilo = (f"V trgovini so prodali {s1} izdelkov, in sicer {c1} po {a} € in {c2} po {b} €. Skupaj so iztržili {s2} €. "
                f"Koliko je bilo kosov vsakega izdelka? Zapiši sistem enačb in ga reši.")
    koraki = [(f"x + y = {s1}, {a}x + {b}y = {s2}", f"x je število kosov ({c1}), y število kosov ({c2})."),
              (f"y = {s1} − x", "Iz prve enačbe izrazimo y.", "sistem"),
              (f"{a}x + {b}({s1} − x) = {s2}", "Vstavimo v drugo enačbo."),
              (f"{a - b}x = {s2 - b * s1}", ""),
              (f"!x = {x}, y = {y}", "")]
    return dict(poglavje="linearna_funkcija", besedilo=besedilo, rezultat=f"{c1}: {x}, {c2}: {y}", koraki=koraki)


def p_kvadratna_enacba(r):
    x1, x2 = r.sample([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6], 2)
    a = r.choice([1, 2])
    b, c = -a * (x1 + x2), a * x1 * x2
    D = b * b - 4 * a * c
    besedilo = (f"Reši kvadratno enačbo \\({polinom_tex([a, b, c])} = 0\\). Preveri rešitvi z Vietovima praviloma.")
    lo, hi = sorted([x1, x2])
    koraki = [(f"D = {opk(b)}<sup>2</sup> − 4 · {a} · {opk(c)} = {D}", "Diskriminanta.", "kvadratna"),
              (f"x<sub>1,2</sub> = <span class=\"ul\"><span>{-b} ± {math.isqrt(D)}</span><span>{2 * a}</span></span>", ""),
              (f"!x₁ = {lo}, x₂ = {hi}", ""),
              (f"x₁ + x₂ = {lo + hi} = −b/a, x₁x₂ = {lo * hi} = c/a", "Preizkus z Vietovima praviloma se ujema.", "vieta")]
    return dict(poglavje="kvadratna_funkcija", besedilo=besedilo, rezultat=f"\\(x_1 = {lo}\\), \\(x_2 = {hi}\\)", koraki=koraki)


def p_kvadratna_teme(r):
    p, q = r.randint(-3, 3), r.choice([-4, -3, -2, 2, 3, 4])
    a = r.choice([1, -1, 2])
    while True:
        p, q = r.randint(-3, 3), r.choice([-8, -4, -2, 2, 4, 8])
        if (-q / a) > 0 and math.isqrt(int(-q / a)) ** 2 == int(-q / a) and (q % a == 0):
            break
    b, c = -2 * a * p, a * p * p + q
    s = math.isqrt(-q // a)
    besedilo = (f"Dana je kvadratna funkcija \\(f(x) = {polinom_tex([a, b, c])}\\). Izračunaj teme, ničli in začetno vrednost ter funkcijo zapiši v temenski obliki.")
    koraki = [(f"p = −b/(2a) = {st(F(-b, 2 * a))}", "Abscisa temena.", "teme"),
              (f"q = f({p}) = {q}", "Ordinata temena je vrednost funkcije v p."),
              (f"!T({p}, {q})", ""),
              (f"!x₁ = {p - s}, x₂ = {p + s}", f"a(x − {p})² + {q} = 0 ⇒ (x − {p})² = {-q // a}."),
              (f"!f(0) = {c}", "Začetna vrednost je prosti člen."),
              (f"!f(x) = {st(a) if a not in (1, -1) else ('−' if a < 0 else '')}(x {'−' if p >= 0 else '+'} {abs(p)})<sup>2</sup> {'−' if q < 0 else '+'} {abs(q)}", "Temenska oblika a(x − p)² + q.")]
    return dict(poglavje="kvadratna_funkcija", besedilo=besedilo,
                rezultat=f"\\(T({p}, {q})\\), \\(x_1 = {p - s}\\), \\(x_2 = {p + s}\\), \\(f(0) = {c}\\)", koraki=koraki)


def p_eksponentna(r):
    a = r.choice([2, 3, 5])
    k = r.choice([2, 3])
    m = r.randint(1, 3)
    # a^(x+1) + a^x = (a+1)a^x = (a+1)a^m
    desna = (a + 1) * a ** m
    besedilo = (f"Reši enačbi \\({a}^{{{k}x - 1}} = {a ** (k * 2 - 1)}\\) in \\({a}^{{x + 1}} + {a}^x = {desna}\\).")
    koraki = [(f"{a ** (k * 2 - 1)} = {a}<sup>{k * 2 - 1}</sup>", "Desno stran zapišemo kot potenco z isto osnovo.", "eksponentna"),
              (f"{k}x − 1 = {2 * k - 1}", "Osnovi sta enaki, zato sta enaka eksponenta."),
              ("!x = 2", ""),
              (f"{a}<sup>x</sup>({a} + 1) = {desna}", f"Izpostavimo {a}ˣ (ker {a}ˣ⁺¹ = {a} · {a}ˣ)."),
              (f"{a}<sup>x</sup> = {a ** m}", ""),
              (f"!x = {m}", "")]
    return dict(poglavje="eksponentna_logaritemska", besedilo=besedilo, rezultat=f"\\(x = 2\\), \\(x = {m}\\)", koraki=koraki)


def p_logaritem(r):
    a = r.choice([2, 3])
    k = r.choice([2, 3, 4])
    c = r.choice([1, 3, 5, 7])
    besedilo = (f"Izračunaj \\(\\log_{{{a}}} {a ** k} + \\log 1000 - \\log_{{{a}}} 1\\) in reši enačbo \\(\\log_{{{a}}}(x - {c}) = {k}\\).")
    koraki = [(f"log<sub>{a}</sub> {a ** k} = {k}, log 1000 = 3, log<sub>{a}</sub> 1 = 0", f"{a}^{k} = {a ** k}, 10³ = 1000, a⁰ = 1.", "logaritem"),
              (f"!{k + 3}", ""),
              (f"x − {c} = {a}<sup>{k}</sup> = {a ** k}", "Po definiciji logaritma."),
              (f"!x = {a ** k + c}", f"Preizkus: x − {c} = {a ** k} > 0, rešitev ustreza.")]
    return dict(poglavje="eksponentna_logaritemska", besedilo=besedilo, rezultat=f"\\({k + 3}\\), \\(x = {a ** k + c}\\)", koraki=koraki)


def p_pravokotni(r):
    c = r.choice([5, 6, 8, 10, 12])
    alfa = r.choice([25, 32, 38, 41, 53, 64])
    a = c * math.sin(math.radians(alfa))
    b = c * math.cos(math.radians(alfa))
    S = a * b / 2
    besedilo = (f"Lestev, dolga \\({c}\\) m, je naslonjena na navpično steno in s tlemi oklepa kot \\({alfa}^\\circ\\). "
                "Kako visoko seže lestev in kako daleč od stene je njen spodnji konec? Rezultata zaokroži na centimeter.")
    koraki = [(f"h = {c} · sin {alfa}° = {st(a)} m", "Višina je kateta nasproti kota.", "kotne"),
              (f"d = {c} · cos {alfa}° = {st(b)} m", "Razdalja od stene je priležna kateta."),
              (f"!h ≈ {st(a)} m, d ≈ {st(b)} m", "Preizkus s Pitagorovim izrekom: h² + d² = " + st(c * c) + ".", "pitagora")]
    return dict(poglavje="trikotnik_kotne", besedilo=besedilo, rezultat=f"\\(h \\approx {lst(a)}\\) m, \\(d \\approx {lst(b)}\\) m", koraki=koraki)


def p_kosinusni(r):
    b, c = r.choice([(5, 7), (6, 8), (4, 9), (7, 10), (8, 5)])
    alfa = r.choice([40, 50, 60, 70, 110, 120])
    a = math.sqrt(b * b + c * c - 2 * b * c * math.cos(math.radians(alfa)))
    S = b * c * math.sin(math.radians(alfa)) / 2
    besedilo = (f"Dve cesti se od križišča A razhajata pod kotom \\({alfa}^\\circ\\). Točka B je na prvi cesti \\({c}\\) km od križišča, točka C na drugi \\({b}\\) km. "
                "Kolikšna je zračna razdalja med B in C? Kolikšna je ploščina trikotnika ABC? Zaokroži na dve decimalki.")
    koraki = [(f"a² = {b}² + {c}² − 2 · {b} · {c} · cos {alfa}°", "Znani sta dve stranici in vmesni kot: kosinusni izrek.", "kosinusni"),
              (f"!a ≈ {st(a)} km", ""),
              (f"!S = ½ · {b} · {c} · sin {alfa}° ≈ {st(S)} km²", "Ploščina iz dveh stranic in vmesnega kota.", "ploscine")]
    return dict(poglavje="trikotnik_kotne", besedilo=besedilo, rezultat=f"\\(a \\approx {lst(a)}\\) km, \\(S \\approx {lst(S)}\\) km²", koraki=koraki)


def p_ploscina(r):
    a = r.choice([6, 8, 10, 12])
    b = r.choice([4, 5, 6, 8])
    besedilo = (f"Okno ima obliko pravokotnika s stranicama \\({a}\\) dm in \\({b}\\) dm, nad katerim je polkrog s premerom \\({a}\\) dm. "
                "Izračunaj ploščino stekla v m² in obseg okna v dm. Zaokroži na dve decimalki.")
    S = a * b + math.pi * (a / 2) ** 2 / 2
    o = a + 2 * b + math.pi * a / 2
    koraki = [(f"S₁ = {a} · {b} = {a * b} dm²", "Pravokotnik.", "ploscine"),
              (f"S₂ = ½ · π · {st(a / 2)}² ≈ {st(math.pi * (a / 2) ** 2 / 2)} dm²", "Polovica kroga s polmerom " + st(a / 2) + " dm.", "krog"),
              (f"!S ≈ {st(S)} dm² = {st(S / 100, 4)} m² ≈ {st(S / 100)} m²", "1 m² = 100 dm²."),
              (f"!o = {a} + 2 · {b} + ½ · π · {a} ≈ {st(o)} dm", "Zgornje stranice pravokotnika ni na obsegu, namesto nje je polovica obsega kroga.")]
    return dict(poglavje="obsegi_ploscine", besedilo=besedilo, rezultat=f"\\(S \\approx {lst(S / 100)}\\) m², \\(o \\approx {lst(o)}\\) dm", koraki=koraki)


def p_telo(r):
    vrsta = r.choice(["valj", "stozec", "prizma", "piramida"])
    if vrsta == "valj":
        rr, v = r.choice([3, 4, 5, 6]), r.choice([8, 10, 12, 15])
        V = math.pi * rr * rr * v
        P = 2 * math.pi * rr * rr + 2 * math.pi * rr * v
        besedilo = f"Kovinska posoda ima obliko valja s polmerom osnovne ploskve \\({rr}\\) dm in višino \\({v}\\) dm. Koliko litrov vode drži? Koliko dm² pločevine potrebujemo za posodo s pokrovom?"
        koraki = [(f"V = π · {rr}² · {v} ≈ {st(V)} dm³", "Prostornina valja V = πr²v.", "telesa"),
                  (f"!V ≈ {st(V)} L", "1 dm³ = 1 L."),
                  (f"!P = 2π · {rr}² + 2π · {rr} · {v} ≈ {st(P)} dm²", "Dve osnovni ploskvi in plašč.")]
        rez = f"\\(V \\approx {lst(V)}\\) L, \\(P \\approx {lst(P)}\\) dm²"
    elif vrsta == "stozec":
        rr, v = r.choice([(3, 4), (6, 8), (5, 12), (9, 12)])
        s = math.hypot(rr, v)
        V = math.pi * rr * rr * v / 3
        P = math.pi * rr * rr + math.pi * rr * s
        besedilo = f"Pokončni stožec ima polmer osnovne ploskve \\({rr}\\) cm in višino \\({v}\\) cm. Izračunaj stranski rob (izvodnico), površino in prostornino stožca."
        koraki = [(f"s = √({rr}² + {v}²) = {st(s)} cm", "Pitagorov izrek v osnem preseku.", "pitagora"),
                  (f"!P = π · {rr}² + π · {rr} · {st(s)} ≈ {st(P)} cm²", "Površina stožca P = πr² + πrs.", "telesa"),
                  (f"!V = ⅓ · π · {rr}² · {v} ≈ {st(V)} cm³", "")]
        rez = f"\\(s = {lst(s)}\\) cm, \\(P \\approx {lst(P)}\\) cm², \\(V \\approx {lst(V)}\\) cm³"
    elif vrsta == "prizma":
        a, b, c = r.choice([(3, 4, 12), (2, 3, 6), (4, 4, 7), (6, 8, 10)])
        D = math.sqrt(a * a + b * b + c * c)
        besedilo = f"Kvader ima robove \\({a}\\) cm, \\({b}\\) cm in \\({c}\\) cm. Izračunaj njegovo površino, prostornino in dolžino telesne diagonale."
        koraki = [(f"!P = 2({a} · {b} + {a} · {c} + {b} · {c}) = {2 * (a * b + a * c + b * c)} cm²", "", "telesa"),
                  (f"!V = {a} · {b} · {c} = {a * b * c} cm³", ""),
                  (f"!D = √({a}² + {b}² + {c}²) = {st(D)} cm", "Telesna diagonala.")]
        rez = f"\\(P = {2 * (a * b + a * c + b * c)}\\) cm², \\(V = {a * b * c}\\) cm³, \\(D = {lst(D)}\\) cm"
    else:
        a, v = r.choice([(6, 4), (8, 3), (10, 12), (6, 8)])
        vs = math.hypot(a / 2, v)
        P = a * a + 2 * a * vs
        V = a * a * v / 3
        besedilo = f"Pravilna štiristrana piramida ima osnovni rob \\({a}\\) m in višino \\({v}\\) m. Izračunaj višino stranske ploskve, površino in prostornino piramide."
        koraki = [(f"v<sub>a</sub> = √({st(a / 2)}² + {v}²) = {st(vs)} m", "Višina stranske ploskve iz pravokotnega trikotnika (polovica roba, višina).", "pitagora"),
                  (f"!P = {a}² + 4 · ½ · {a} · {st(vs)} ≈ {st(P)} m²", "Osnovna ploskev in štirje trikotniki.", "telesa"),
                  (f"!V = ⅓ · {a}² · {v} = {st(V)} m³", "")]
        rez = f"\\(v_a = {lst(vs)}\\) m, \\(P \\approx {lst(P)}\\) m², \\(V = {lst(V)}\\) m³"
    return dict(poglavje="povrsine_prostornine", besedilo=besedilo, rezultat=rez, koraki=koraki)


def p_zaporedje(r):
    if r.random() < 0.5:
        a1, d = r.randint(2, 9), r.choice([2, 3, 4, 5, -2, -3])
        m, n = r.choice([(3, 8), (4, 10), (2, 7)])
        am, an = a1 + (m - 1) * d, a1 + (n - 1) * d
        N = r.choice([10, 12, 15, 20])
        s = F(N, 2) * (2 * a1 + (N - 1) * d)
        besedilo = f"V aritmetičnem zaporedju je \\(a_{{{m}}} = {am}\\) in \\(a_{{{n}}} = {an}\\). Izračunaj prvi člen, diferenco in vsoto prvih \\({N}\\) členov."
        koraki = [(f"a₁ + {m - 1}d = {am}, a₁ + {n - 1}d = {an}", "Splošni člen aₙ = a₁ + (n − 1)d.", "aritmeticno"),
                  (f"{n - m}d = {an - am}", "Odštejemo enačbi."),
                  (f"!d = {d}, a₁ = {a1}", ""),
                  (f"!s<sub>{N}</sub> = <span class=\"ul\"><span>{N}</span><span>2</span></span>(2 · {a1} + {N - 1} · {opk(d)}) = {st(s)}", "")]
        rez = f"\\(a_1 = {a1}\\), \\(d = {d}\\), \\(s_{{{N}}} = {lst(s)}\\)"
    else:
        a1, q = r.choice([1, 2, 3, 5]), r.choice([2, 3, -2])
        n = r.choice([4, 5, 6])
        an = a1 * q ** (n - 1)
        s = a1 * (q ** n - 1) // (q - 1)
        besedilo = f"Geometrijsko zaporedje ima prvi člen \\({a1}\\) in količnik \\({q}\\). Izračunaj \\(a_{{{n}}}\\) in vsoto prvih \\({n}\\) členov. Ali je zaporedje monotono?"
        koraki = [(f"!a<sub>{n}</sub> = {a1} · {opk(q)}<sup>{n - 1}</sup> = {an}", "", "geometrijsko"),
                  (f"!s<sub>{n}</sub> = {a1} · <span class=\"ul\"><span>{opk(q)}<sup>{n}</sup> − 1</span><span>{q} − 1</span></span> = {s}", ""),
                  ("!" + ("zaporedje je naraščajoče" if q > 1 else "zaporedje ni monotono"), "Pri q > 1 in a₁ > 0 členi naraščajo; pri negativnem q se predznaki izmenjujejo.")]
        rez = f"\\(a_{{{n}}} = {an}\\), \\(s_{{{n}}} = {s}\\), {'naraščajoče' if q > 1 else 'ni monotono'}"
    return dict(poglavje="zaporedja_pm", besedilo=besedilo, rezultat=rez, koraki=koraki)


def p_obresti(r):
    G0 = r.choice([1000, 2000, 5000, 8000])
    p = r.choice([2, 3, 4, 5])
    n = r.choice([3, 5, 8, 10])
    Gn = G0 * (1 + p / 100) ** n
    besedilo = f"Na banko vložimo \\({G0}\\) € pri \\({p}\\,\\%\\) letni obrestni meri z letnim obrestnim pripisom. Koliko denarja bomo imeli po \\({n}\\) letih? Koliko so znašale obresti?"
    koraki = [(f"q = 1 + {p}/100 = {st(1 + p / 100)}", "Letni obrestovalni faktor.", "obresti"),
              (f"!G<sub>{n}</sub> = {G0} · {st(1 + p / 100)}<sup>{n}</sup> ≈ {st(Gn)} €", "Glavnica se vsako leto pomnoži s q: geometrijsko zaporedje."),
              (f"!o = {st(Gn)} − {G0} = {st(Gn - G0)} €", "Obresti so razlika.")]
    return dict(poglavje="zaporedja_pm", besedilo=besedilo, rezultat=f"\\({lst(Gn)}\\) €, obresti \\({lst(Gn - G0)}\\) €", koraki=koraki)


def p_statistika(r):
    while True:
        n = r.choice([7, 8, 9])
        data = sorted(r.randint(1, 5) for _ in range(n))
        if len(set(data)) >= 3 and max(data.count(x) for x in data) == sorted([data.count(x) for x in set(data)])[-1] and [data.count(x) for x in set(data)].count(max(data.count(x) for x in data)) == 1:
            break
    r.shuffle(data)
    s = sorted(data)
    povp = F(sum(data), n)
    med = s[n // 2] if n % 2 else F(s[n // 2 - 1] + s[n // 2], 2)
    mod = max(set(data), key=data.count)
    besedilo = (f"Dijaki so ocenili zadovoljstvo s šolsko prehrano z ocenami od 1 do 5: \\({', '.join(map(str, data))}\\).<br>"
                "Uredi podatke ter določi modus, mediano in aritmetično sredino (zaokroži na dve decimalki). Koliko odstotkov dijakov je dalo oceno 4 ali 5?")
    vec = sum(1 for x in data if x >= 4)
    koraki = [(", ".join(map(str, s)), "Podatke uredimo po velikosti.", "statistika"),
              (f"!Mo = {mod}", "Najpogostejša vrednost."),
              (f"!Me = {st(med)}", "Srednji podatek urejenega niza" + (" (povprečje dveh srednjih)." if n % 2 == 0 else ".")),
              (f"!x̄ = {sum(data)}/{n} ≈ {st(povp)}", "Vsota vseh ocen, deljena s številom ocen."),
              (f"!{vec}/{n} · 100 % ≈ {st(F(vec * 100, n))} %", "")]
    return dict(poglavje="statistika_pm", besedilo=besedilo,
                rezultat=f"\\(Mo = {mod}\\), \\(Me = {lst(med)}\\), \\(\\bar x \\approx {lst(povp)}\\), \\({lst(F(vec * 100, n))}\\,\\%\\)", koraki=koraki)


def p_kombinatorika(r):
    n = r.choice([6, 7, 8, 9, 10])
    k = r.choice([2, 3])
    C = math.comb(n, k)
    V = math.perm(n, 3)
    besedilo = (f"V razredu je {n} dijakov za tekmovanje. Na koliko načinov lahko izberemo {k}-člansko ekipo? "
                f"Na koliko načinov lahko podelimo zlato, srebrno in bronasto medaljo, če lahko vsak dobi največ eno?<br>"
                f"Kolikšna je verjetnost, da bo Ana (ena izmed {n} dijakov) v naključno izbrani {k}-članski ekipi?")
    P = F(math.comb(n - 1, k - 1), C)
    koraki = [(f"!C = <span class=\"ul\"><span>{n}!</span><span>{k}! · {n - k}!</span></span> = {C}", "Vrstni red v ekipi ni pomemben: kombinacije.", "kombinatorika"),
              (f"!V = {n} · {n - 1} · {n - 2} = {V}", "Medalje so različne, vrstni red je pomemben: variacije."),
              (f"ugodnih: {math.comb(n - 1, k - 1)}", f"Ana je v ekipi, ostalih {k - 1} izberemo izmed {n - 1}."),
              (f"!P = {math.comb(n - 1, k - 1)}/{C} = {ulomek_html(P)}", "", "verjetnost")]
    return dict(poglavje="kombinatorika_verjetnost", besedilo=besedilo, rezultat=f"\\({C}\\), \\({V}\\), \\(P = {ulomek_tex(P)}\\)", koraki=koraki)


def p_verjetnost(r):
    rd, mo, ze = r.choice([3, 4, 5]), r.choice([2, 3, 5]), r.choice([1, 2, 4])
    n = rd + mo + ze
    besedilo = (f"V škatli je {rd} rdečih, {mo} modrih in {ze} zelenih kroglic. Na slepo izvlečemo eno kroglico. Kolikšna je verjetnost, da je rdeča? Kolikšna, da ni modra?<br>"
                "Nato izvlečemo dve kroglici hkrati. Kolikšna je verjetnost, da sta obe rdeči?")
    p1 = F(rd, n)
    p2 = 1 - F(mo, n)
    p3 = F(math.comb(rd, 2), math.comb(n, 2))
    koraki = [(f"!P(R) = {rd}/{n}" + (f" = {ulomek_html(p1)}" if F(rd, n).denominator != n else ""), "Ugodni izidi / vsi izidi.", "verjetnost"),
              (f"!P(ni M) = 1 − {mo}/{n} = {ulomek_html(p2)}", "Nasprotni dogodek."),
              (f"!P(RR) = <span class=\"ul\"><span>C({rd}, 2)</span><span>C({n}, 2)</span></span> = {math.comb(rd, 2)}/{math.comb(n, 2)} = {ulomek_html(p3)}", "Izberemo 2 izmed rdečih, vseh izborov 2 izmed " + str(n) + ".", "kombinatorika")]
    return dict(poglavje="kombinatorika_verjetnost", besedilo=besedilo,
                rezultat=f"\\({ulomek_tex(p1)}\\), \\({ulomek_tex(p2)}\\), \\({ulomek_tex(p3)}\\)", koraki=koraki)


def p_tangenta(r):
    a = r.choice([1, -1, 2])
    b = r.randint(-4, 4)
    c = r.randint(-3, 5)
    x0 = r.choice([-1, 1, 2])
    f = lambda x: a * x ** 3 + b * x + c
    fd = 3 * a * x0 ** 2 + b
    y0 = f(x0)
    n = y0 - fd * x0
    besedilo = f"Dana je funkcija \\(f(x) = {polinom_tex([a, 0, b, c])}\\). Izračunaj odvod \\(f'(x)\\) in zapiši enačbo tangente na graf funkcije v točki z absciso \\(x_0 = {x0}\\)."
    koraki = [(f"!f′(x) = {polinom_html([3 * a, 0, b])}", "Odvod potence (xⁿ)′ = nxⁿ⁻¹, odvod konstante je 0.", "odvod"),
              (f"f({x0}) = {y0}, f′({x0}) = {fd}", "Točka dotika in smerni koeficient tangente."),
              (f"y {odst(y0)} = {opk(fd)}(x {odst(x0)})", "", "tangenta"),
              (f"!y = {polinom_html([fd, n])}", "")]
    return dict(poglavje="odvod_pm", besedilo=besedilo, rezultat=f"\\(f'(x) = {polinom_tex([3 * a, 0, b])}\\), \\(y = {polinom_tex([fd, n])}\\)", koraki=koraki)


def p_kotne(r):
    a, b, c = r.choice([(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25)])
    besedilo = (f"Kot \\(\\alpha\\) je v drugem kvadrantu in \\(\\sin \\alpha = \\dfrac{{{a}}}{{{c}}}\\). Izračunaj \\(\\cos \\alpha\\) in \\(\\tan \\alpha\\).<br>"
                f"Izračunaj natančno vrednost \\(\\sin 75^\\circ\\) z adicijskim izrekom.")
    koraki = [(f"cos² α = 1 − ({a}/{c})² = {b * b}/{c * c}", "Zveza sin² α + cos² α = 1.", "adicijski"),
              (f"!cos α = −{b}/{c}", "V drugem kvadrantu je kosinus negativen."),
              (f"!tan α = sin α / cos α = −{a}/{b}", ""),
              ("sin 75° = sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30°", "Adicijski izrek."),
              ("!= <span class=\"ul\"><span>√6 + √2</span><span>4</span></span>", "√2/2 · √3/2 + √2/2 · 1/2.")]
    return dict(poglavje="kotne_funkcije_pm", besedilo=besedilo,
                rezultat=f"\\(\\cos\\alpha = -\\frac{{{b}}}{{{c}}}\\), \\(\\tan\\alpha = -\\frac{{{a}}}{{{b}}}\\), \\(\\sin 75^\\circ = \\frac{{\\sqrt6 + \\sqrt2}}{{4}}\\)", koraki=koraki)


def p_kot_premic(r):
    k1, k2 = r.choice([(1, 3), (2, F(1, 3)), (3, -2), (F(1, 2), 3), (-1, 2)])
    tan = abs((k2 - k1) / (1 + k1 * k2))
    kot = math.degrees(math.atan(tan))
    besedilo = f"Izračunaj ostri kot med premicama \\(y = {lst(k1) if F(k1).denominator == 1 else ulomek_tex(k1)}x + 1\\) in \\(y = {lst(k2) if F(k2).denominator == 1 else ulomek_tex(k2)}x - 2\\). Rezultat zaokroži na stotinko stopinje."
    koraki = [(f"tan φ = |(k₂ − k₁)/(1 + k₁k₂)| = {st(tan, 4) if F(tan).denominator > 10 else ulomek_html(tan)}", "Kot med premicama iz smernih koeficientov.", "adicijski"),
              (f"!φ ≈ {st(kot)}°", "")]
    return dict(poglavje="kotne_funkcije_pm", besedilo=besedilo, rezultat=f"\\(\\varphi \\approx {lst(kot)}^\\circ\\)", koraki=koraki)


def p_konstrukcija(r):
    a, b, kot = r.choice([(6, 5, 60), (7, 4, 45), (5, 6, 75), (8, 5, 30)])
    besedilo = (f"Načrtaj trikotnik \\(ABC\\) s podatki \\(c = {a}\\) cm, \\(b = {b}\\) cm in \\(\\alpha = {kot}^\\circ\\). Trikotniku očrtaj krog. "
                "Opiši postopek načrtovanja. Uporabi geometrijsko orodje.")
    a_ = math.sqrt(a * a + b * b - 2 * a * b * math.cos(math.radians(kot)))
    R = a_ / (2 * math.sin(math.radians(kot)))
    koraki = [("1. Narišemo daljico AB dolžine " + str(a) + " cm.", "Osnovnica.", "konstrukcija"),
              (f"2. V točki A nanesemo kot {kot}° (s šestilom ali geotrikotnikom).", ""),
              (f"3. Na krak kota od A nanesemo {b} cm in dobimo C.", ""),
              ("4. Načrtamo simetrali dveh stranic; presečišče je središče S očrtanega kroga.", "Središče očrtanega kroga je presečišče simetral stranic."),
              (f"!R ≈ {st(R)} cm", "Preverimo z računom: a = " + st(a_) + " cm, R = a/(2 sin α).", "sinusni")]
    return dict(poglavje="geometrija_ravnine", besedilo=besedilo, rezultat=f"načrt in opis postopka; \\(R \\approx {lst(R)}\\) cm", koraki=koraki)


def p_koti(r):
    n = r.choice([5, 6, 8, 10, 12])
    vsota = (n - 2) * 180
    a = r.choice([40, 50, 64, 70])
    besedilo = (f"Izračunaj velikost notranjega kota pravilnega {n}-kotnika.<br>"
                f"V krogu je središčni kot nad lokom \\(AB\\) enak \\({2 * a}^\\circ\\). Kolikšen je obodni kot nad istim lokom?")
    koraki = [(f"({n} − 2) · 180° = {vsota}°", "Vsota notranjih kotov n-kotnika."),
              (f"!{vsota}° : {n} = {st(F(vsota, n))}°", "Pri pravilnem večkotniku so vsi koti enaki."),
              (f"!β = {2 * a}° : 2 = {a}°", "Obodni kot je polovica središčnega kota nad istim lokom.")]
    return dict(poglavje="geometrija_ravnine", besedilo=besedilo, rezultat=f"\\({lst(F(vsota, n))}^\\circ\\), \\({a}^\\circ\\)", koraki=koraki)


def p_racionalna(r):
    a, b = r.sample([-3, -2, -1, 1, 2, 3, 4], 2)
    besedilo = (f"Dana je funkcija \\(f(x) = \\dfrac{{x {'-' if a > 0 else '+'} {abs(a)}}}{{x {'-' if b > 0 else '+'} {abs(b)}}}\\). "
                "Zapiši definicijsko območje, ničlo, pol in enačbo vodoravne asimptote ter izračunaj začetno vrednost.")
    koraki = [(f"!D<sub>f</sub> = ℝ \\ {{{b}}}", "Imenovalec ne sme biti 0.", "racionalna"),
              (f"!ničla x = {a}, pol x = {b}", "Ničla števca je ničla funkcije, ničla imenovalca je pol."),
              ("!y = 1", "Števec in imenovalec sta iste stopnje: asimptota je količnik vodilnih koeficientov."),
              (f"!f(0) = {ulomek_html(F(-a, -b))}", "")]
    return dict(poglavje="polinomi_racionalna", besedilo=besedilo,
                rezultat=f"\\(D_f = \\mathbb{{R}} \\setminus \\{{{b}\\}}\\), ničla \\({a}\\), pol \\({b}\\), \\(y = 1\\), \\(f(0) = {ulomek_tex(F(-a, -b))}\\)", koraki=koraki)


# Mesta v 1. delu: (točke, [predloge]) — vsako mesto ima drugo snov
MESTA = [
    (4, [p_D_v]),
    (4, [p_odstotki, p_sklepni]),
    (4, [p_izraz, p_potence, p_koreni, p_absolutna]),
    (4, [p_premica, p_sistem]),
    (5, [p_kvadratna_enacba, p_kvadratna_teme]),
    (4, [p_eksponentna, p_logaritem]),
    (5, [p_pravokotni, p_kosinusni]),
    (6, [p_ploscina, p_telo, p_konstrukcija, p_koti]),
    (4, [p_zaporedje, p_obresti]),
    (4, [p_statistika, p_kotne, p_kot_premic, p_racionalna]),
    (6, [p_kombinatorika, p_verjetnost, p_tangenta]),
]


# ---------------------------------------------------------------- 2. del: sestavljene naloge (10 točk)
def s_kvadratna(r):
    x1, x2 = sorted(r.sample([-4, -3, -2, -1, 1, 2, 3, 4, 5], 2))
    a = r.choice([1, -1])
    b, c = -a * (x1 + x2), a * x1 * x2
    p = F(x1 + x2, 2)
    q = a * (p - x1) * (p - x2)
    k = r.choice([1, 2, -1])
    n = r.randint(-3, 3)
    # presečišče s premico y = kx + n: a x^2 + (b - k) x + (c - n) = 0
    A, B, C = a, b - k, c - n
    D = B * B - 4 * A * C
    while D < 0 or math.isqrt(D) ** 2 != D:
        n = r.randint(-8, 8)
        C = c - n
        D = B * B - 4 * A * C
    s = math.isqrt(D)
    t1, t2 = sorted([F(-B - s, 2 * A), F(-B + s, 2 * A)])
    besedilo = (f"Dana je kvadratna funkcija \\(f(x) = {polinom_tex([a, b, c])}\\).<br>"
                f"1.1. Izračunaj ničli in teme funkcije \\(f\\). (3 točke)<br>"
                f"1.2. Nariši graf funkcije \\(f\\). (2 točki)<br>"
                f"1.3. Reši neenačbo \\(f(x) {'\\ge' if a > 0 else '\\le'} 0\\). (2 točki)<br>"
                f"1.4. Izračunaj presečišči grafa funkcije \\(f\\) s premico \\(y = {polinom_tex([k, n])}\\). (3 točke)")
    xs = [float(x1) - 2, float(x2) + 2]
    yv = [f(float(x)) for f in [lambda x: a * x * x + b * x + c] for x in (xs[0], xs[1], float(p))]
    ylo, yhi = min(yv + [0]) - 1, max(yv + [0]) + 1
    sl = graf([(lambda x: a * x * x + b * x + c, MODRA)], (xs[0], xs[1]), (max(ylo, -12), min(yhi, 12)),
              [(x1, 0, str(x1)), (x2, 0, str(x2)), (float(p), float(q), "T")])
    neen = f"x ≤ {x1} ali x ≥ {x2}" if a > 0 else f"x ≤ {x1} ali x ≥ {x2}"
    koraki = ["## 1.1",
              (f"!x₁ = {x1}, x₂ = {x2}", f"Rešimo {polinom_html([a, b, c])} = 0 (razcep ali formula).", "kvadratna"),
              (f"!T({st(p)}, {st(q)})", "p = (x₁ + x₂)/2, q = f(p).", "teme"),
              "## 1.2", ("@slika", sl), (None, "Parabola je odprta " + ("navzgor" if a > 0 else "navzdol") + f", seka os x v ničlah, os y v točki (0, {c})."),
              "## 1.3", (f"!{neen}", "Parabola je nad osjo x (oziroma pod njo) zunaj intervala med ničlama.", "neenacba"),
              "## 1.4", (f"{polinom_html([a, b, c])} = {polinom_html([k, n])}", "Izenačimo funkcijski vrednosti."),
              (f"{polinom_html([A, B, C])} = 0", ""),
              (f"!P₁({st(t1)}, {st(k * t1 + n)}), P₂({st(t2)}, {st(k * t2 + n)})", "Rešitvi vstavimo v enačbo premice.")]
    rez = (f"1.1. \\(x_1 = {x1}\\), \\(x_2 = {x2}\\), \\(T({lst(p)}, {lst(q)})\\) &nbsp; 1.2. graf &nbsp; "
           f"1.3. \\(x \\le {x1}\\) ali \\(x \\ge {x2}\\) &nbsp; 1.4. \\(P_1({lst(t1)}, {lst(k * t1 + n)})\\), \\(P_2({lst(t2)}, {lst(k * t2 + n)})\\)")
    if a < 0:
        rez = rez.replace(f"1.3. \\(x \\le {x1}\\) ali \\(x \\ge {x2}\\)", f"1.3. \\(x \\le {x1}\\) ali \\(x \\ge {x2}\\)")
    return dict(poglavje=["kvadratna_funkcija", "linearna_funkcija"], besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_polinom(r):
    while True:
        n1, n2, n3 = sorted(r.sample([-3, -2, -1, 1, 2, 3, 4], 3))
        if n1 * n2 * n3 != 0:
            break
    a = 1
    koef = [1, -(n1 + n2 + n3), n1 * n2 + n1 * n3 + n2 * n3, -n1 * n2 * n3]
    p = lambda x: (x - n1) * (x - n2) * (x - n3)
    # Horner za n1
    h = [koef[0]]
    for k in koef[1:]:
        h.append(k + h[-1] * n1)
    besedilo = (f"Dan je polinom \\(p(x) = {polinom_tex(koef)}\\).<br>"
                f"2.1. S Hornerjevim algoritmom pokaži, da je \\(x = {n1}\\) ničla polinoma. (2 točki)<br>"
                f"2.2. Izračunaj ostali ničli in polinom zapiši v obliki produkta linearnih faktorjev. (3 točke)<br>"
                f"2.3. Izračunaj začetno vrednost in nariši graf polinoma. (3 točke)<br>"
                f"2.4. Reši neenačbo \\(p(x) > 0\\). (2 točki)")
    lo, hi = n1 - 1, n3 + 1
    vals = [p(lo + (hi - lo) * i / 50) for i in range(51)]
    sl = graf([(p, MODRA)], (lo - 0.3, hi + 0.3), (max(min(vals) - 1, -20), min(max(vals) + 1, 20)),
              [(n1, 0, str(n1)), (n2, 0, str(n2)), (n3, 0, str(n3)), (0, p(0), "")])
    tabela = (f'<table class="mn-tabela"><tr><td></td>' + "".join(f"<td>{k}</td>" for k in koef) + "</tr>"
              f'<tr><td>{n1}</td><td></td>' + "".join(f"<td>{h[i] * n1}</td>" for i in range(3)) + "</tr>"
              "<tr><td></td>" + "".join(f"<td>{x}</td>" for x in h) + "</tr></table>")
    k2 = h[:3]
    koraki = ["## 2.1", ("@slika", tabela), (f"!ostanek = {h[3]} = 0", f"Ostanek je 0, zato je {n1} ničla.", "horner"),
              "## 2.2", (f"q(x) = {polinom_html(k2)}", "Količnik iz zadnje vrstice Hornerjeve sheme."),
              (f"!x₂ = {n2}, x₃ = {n3}", "Rešimo kvadratno enačbo q(x) = 0.", "kvadratna"),
              (f"!p(x) = (x {'−' if n1 > 0 else '+'} {abs(n1)})(x {'−' if n2 > 0 else '+'} {abs(n2)})(x {'−' if n3 > 0 else '+'} {abs(n3)})", ""),
              "## 2.3", (f"!p(0) = {p(0)}", "Začetna vrednost je prosti člen."), ("@slika", sl),
              (None, "Vodilni koeficient je pozitiven in stopnja liha: graf pride od spodaj in gre navzgor. Vse ničle so enojne, graf v njih seka os x."),
              "## 2.4", (f"!x ∈ ({n1}, {n2}) ∪ ({n3}, ∞)", "Iz grafa preberemo, kje je nad osjo x.")]
    rez = (f"2.1. ostanek \\(0\\) &nbsp; 2.2. \\(x_2 = {n2}\\), \\(x_3 = {n3}\\) &nbsp; 2.3. \\(p(0) = {p(0)}\\), graf &nbsp; "
           f"2.4. \\(x \\in ({n1}, {n2}) \\cup ({n3}, \\infty)\\)")
    return dict(poglavje="polinomi_racionalna", besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_odvod(r):
    # f(x) = x^3 + b x^2 + c x + d z ekstremoma v celih x
    while True:
        e1, e2 = sorted(r.sample([-3, -2, -1, 0, 1, 2, 3], 2))
        # f'(x) = 3(x-e1)(x-e2) = 3x^2 - 3(e1+e2)x + 3e1e2
        b = F(-3 * (e1 + e2), 2)
        if b.denominator == 1:
            break
    c = 3 * e1 * e2
    d = r.randint(-3, 3)
    f = lambda x: x ** 3 + float(b) * x * x + c * x + d
    besedilo = (f"Dana je funkcija \\(f(x) = {polinom_tex([1, b, c, d])}\\).<br>"
                f"3.1. Izračunaj odvod funkcije. (1 točka)<br>"
                f"3.2. Izračunaj stacionarni točki in ugotovi, kateri sta ekstrema. (4 točke)<br>"
                f"3.3. Zapiši intervale naraščanja in padanja. (2 točki)<br>"
                f"3.4. Nariši graf funkcije na intervalu \\([{e1 - 1}, {e2 + 1}]\\). (3 točke)")
    y1, y2 = F(e1) ** 3 + b * e1 * e1 + c * e1 + d, F(e2) ** 3 + b * e2 * e2 + c * e2 + d
    vals = [f(e1 - 1 + (e2 - e1 + 2) * i / 40) for i in range(41)]
    sl = graf([(f, MODRA)], (e1 - 1.3, e2 + 1.3), (max(min(vals) - 1, -25), min(max(vals) + 1, 25)),
              [(e1, float(y1), "max"), (e2, float(y2), "min")])
    koraki = ["## 3.1", (f"!f′(x) = {polinom_html([3, 2 * b, c])}", "", "odvod"),
              "## 3.2", (f"3(x {'−' if e1 >= 0 else '+'} {abs(e1)})(x {'−' if e2 >= 0 else '+'} {abs(e2)}) = 0", "Stacionarne točke so ničle odvoda."),
              (f"!T₁({e1}, {st(y1)}) lokalni maksimum, T₂({e2}, {st(y2)}) lokalni minimum", "Odvod pred x₁ pozitiven, med ničlama negativen, za x₂ pozitiven."),
              "## 3.3", (f"!narašča na (−∞, {e1}) in ({e2}, ∞), pada na ({e1}, {e2})", "Kjer je f′ > 0, funkcija narašča."),
              "## 3.4", ("@slika", sl)]
    rez = (f"3.1. \\(f'(x) = {polinom_tex([3, 2 * b, c])}\\) &nbsp; 3.2. \\(T_1({e1}, {lst(y1)})\\) maksimum, \\(T_2({e2}, {lst(y2)})\\) minimum &nbsp; "
           f"3.3. narašča na \\((-\\infty, {e1})\\) in \\(({e2}, \\infty)\\), pada na \\(({e1}, {e2})\\) &nbsp; 3.4. graf")
    return dict(poglavje="odvod_pm", besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_ekstremalni(r):
    L = r.choice([40, 60, 80, 100, 120])
    besedilo = (f"Kmet ima \\({L}\\) m ograje. Z njo želi ob ravnem zidu ograditi pravokotni vrt, tako da ob zidu ne postavi ograje.<br>"
                f"4.1. Ploščino vrta izrazi kot funkcijo širine \\(x\\) (stranice, pravokotne na zid). (3 točke)<br>"
                f"4.2. Kolikšni naj bosta stranici, da bo ploščina največja? (5 točk)<br>"
                f"4.3. Kolikšna je največja ploščina? (2 točki)")
    x = F(L, 4)
    y = L - 2 * x
    koraki = ["## 4.1", (f"y = {L} − 2x", "Ograja gre po dveh širinah in eni dolžini."), (f"!S(x) = x({L} − 2x) = {L}x − 2x²", ""),
              "## 4.2", (f"S′(x) = {L} − 4x = 0", "Največjo ploščino ima v stacionarni točki.", "odvod"),
              (f"!x = {st(x)} m, y = {st(y)} m", "S″ = −4 < 0, zato je to maksimum (parabola, odprta navzdol)."),
              "## 4.3", (f"!S = {st(x)} · {st(y)} = {st(x * y)} m²", "")]
    rez = f"4.1. \\(S(x) = {L}x - 2x^2\\) &nbsp; 4.2. \\(x = {lst(x)}\\) m, \\(y = {lst(y)}\\) m &nbsp; 4.3. \\(S = {lst(x * y)}\\) m²"
    return dict(poglavje=["odvod_pm", "kvadratna_funkcija"], besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_rezervoar(r):
    rr = r.choice([1, 1.5, 2])
    v = r.choice([3, 4, 5])
    pretok = r.choice([20, 25, 40, 50])
    V = math.pi * rr * rr * v
    besedilo = (f"Rezervoar za kurilno olje ima obliko pokončnega valja s premerom osnovne ploskve \\({lst(2 * rr)}\\) m in višino \\({v}\\) m.<br>"
                f"5.1. Koliko litrov olja drži poln rezervoar? (3 točke)<br>"
                f"5.2. Rezervoar polnimo s črpalko, ki načrpa \\({pretok}\\) litrov na minuto. Koliko ur in minut traja polnjenje praznega rezervoarja? (3 točke)<br>"
                f"5.3. Rezervoar želimo zunaj prebarvati (plašč in zgornjo osnovno ploskev). Koliko m² površine barvamo? (2 točki)<br>"
                f"5.4. Do katere višine sega olje, ko je v rezervoarju \\(10\\,000\\) litrov? (2 točki)")
    L_ = V * 1000
    t = L_ / pretok
    h, m = int(t // 60), round(t - 60 * (t // 60))
    if m == 60:
        h, m = h + 1, 0
    Pb = 2 * math.pi * rr * v + math.pi * rr * rr
    h10 = 10 / (math.pi * rr * rr)
    koraki = ["## 5.1", (f"V = π · {st(rr)}² · {v} ≈ {st(V, 3)} m³", "Polmer je polovica premera.", "telesa"),
              (f"!V ≈ {st(L_, 0)} L", "1 m³ = 1000 L."),
              "## 5.2", (f"t = {st(L_, 0)} : {pretok} ≈ {st(t, 1)} min", ""), (f"!t ≈ {h} h {m} min", ""),
              "## 5.3", (f"!P = 2π · {st(rr)} · {v} + π · {st(rr)}² ≈ {st(Pb)} m²", "Plašč in ena osnovna ploskev."),
              "## 5.4", (f"!h = 10 m³ : (π · {st(rr)}²) ≈ {st(h10)} m", "10 000 L = 10 m³; V = πr²h.")]
    rez = f"5.1. \\(\\approx {lst(L_, 0)}\\) L &nbsp; 5.2. \\(\\approx {h}\\) h {m} min &nbsp; 5.3. \\(\\approx {lst(Pb)}\\) m² &nbsp; 5.4. \\(h \\approx {lst(h10)}\\) m"
    return dict(poglavje="povrsine_prostornine", besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_zaporedje_varcevanje(r):
    G0 = r.choice([500, 1000, 2000])
    p = r.choice([2, 3, 4])
    n = r.choice([5, 6, 8])
    d = r.choice([50, 100, 150])
    a1 = r.choice([200, 300, 400])
    besedilo = (f"Maja začne varčevati. Prvi mesec da na stran \\({a1}\\) €, vsak naslednji mesec \\({d}\\) € več.<br>"
                f"6.1. Koliko denarja da na stran v 12. mesecu? (2 točki)<br>"
                f"6.2. Koliko je skupaj privarčevala v prvem letu? (3 točke)<br>"
                f"6.3. Na začetku drugega leta položi \\({G0}\\) € na banko pri \\({p}\\,\\%\\) letnih obrestih z letnim pripisom. Koliko bo imela po {n} letih? (3 točke)<br>"
                f"6.4. Po koliko letih bi se vloga pri isti obrestni meri podvojila? (2 točki)")
    a12 = a1 + 11 * d
    s12 = 6 * (2 * a1 + 11 * d)
    Gn = G0 * (1 + p / 100) ** n
    leta = math.log(2) / math.log(1 + p / 100)
    koraki = ["## 6.1", (f"!a₁₂ = {a1} + 11 · {d} = {a12} €", "Aritmetično zaporedje z diferenco " + str(d) + ".", "aritmeticno"),
              "## 6.2", (f"!s₁₂ = 12/2 · ({a1} + {a12}) = {s12} €", ""),
              "## 6.3", (f"!G<sub>{n}</sub> = {G0} · {st(1 + p / 100)}<sup>{n}</sup> ≈ {st(Gn)} €", "", "obresti"),
              "## 6.4", (f"{st(1 + p / 100)}<sup>n</sup> = 2", "Iščemo n, ko je G = 2G₀."),
              (f"n = log 2 / log {st(1 + p / 100)} ≈ {st(leta)}", "Enačbo logaritmiramo.", "log_pravila"),
              (f"!po {math.ceil(leta)} letih", "Obresti se pripišejo konec leta, zato zaokrožimo navzgor.")]
    rez = f"6.1. \\({a12}\\) € &nbsp; 6.2. \\({s12}\\) € &nbsp; 6.3. \\(\\approx {lst(Gn)}\\) € &nbsp; 6.4. po \\({math.ceil(leta)}\\) letih"
    return dict(poglavje=["zaporedja_pm", "eksponentna_logaritemska"], besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_statistika_verjetnost(r):
    ocene = [1, 2, 3, 4, 5]
    f = [r.randint(1, 4), r.randint(3, 7), r.randint(5, 10), r.randint(4, 9), r.randint(1, 5)]
    n = sum(f)
    povp = F(sum(o * k for o, k in zip(ocene, f)), n)
    vse = [o for o, k in zip(ocene, f) for _ in range(k)]
    med = vse[n // 2] if n % 2 else F(vse[n // 2 - 1] + vse[n // 2], 2)
    mod = ocene[f.index(max(f))]
    besedilo = ("V preglednici so ocene pisnega preizkusa v razredu.<br>"
                + '<table class="mn-tabela"><tr><td>ocena</td>' + "".join(f"<td>{o}</td>" for o in ocene) + "</tr><tr><td>število dijakov</td>" + "".join(f"<td>{k}</td>" for k in f) + "</tr></table>"
                + "7.1. Koliko dijakov je pisalo preizkus in koliko odstotkov jih je bilo negativnih (ocena 1)? (2 točki)<br>"
                "7.2. Določi modus in mediano ter izračunaj povprečno oceno na dve decimalki. (4 točke)<br>"
                "7.3. Ocene prikaži s stolpčnim diagramom. (2 točki)<br>"
                "7.4. Naključno izberemo dva dijaka. Kolikšna je verjetnost, da sta oba dobila oceno 5? (2 točki)")
    W, H = 300, 170
    mx = max(f)
    stolpci = "".join(f'<rect x="{30 + i * 52}" y="{H - 25 - k / mx * 120:.1f}" width="34" height="{k / mx * 120:.1f}" fill="{MODRA}" fill-opacity="0.75"/>'
                      f'<text x="{47 + i * 52}" y="{H - 10}" font-size="11" text-anchor="middle" fill="currentColor">{o}</text>'
                      f'<text x="{47 + i * 52}" y="{H - 30 - k / mx * 120:.1f}" font-size="11" text-anchor="middle" fill="currentColor">{k}</text>' for i, (o, k) in enumerate(zip(ocene, f)))
    sl = f'<svg class="mn-graf" viewBox="0 0 {W} {H}" width="{W}" role="img" aria-label="Stolpčni diagram" style="max-width:100%;height:auto;display:block;margin:0.4rem 0">{stolpci}<line x1="20" y1="{H - 25}" x2="{W - 10}" y2="{H - 25}" stroke="currentColor"/></svg>'
    p5 = F(math.comb(f[4], 2), math.comb(n, 2))
    koraki = ["## 7.1", (f"!n = {n}", "Seštejemo frekvence."), (f"!{f[0]}/{n} · 100 % ≈ {st(F(f[0] * 100, n))} %", "", "odstotki"),
              "## 7.2", (f"!Mo = {mod}", "Ocena z največjo frekvenco.", "statistika"),
              (f"!Me = {st(med)}", f"Srednji podatek med {n} urejenimi ocenami."),
              (f"!x̄ = {sum(o * k for o, k in zip(ocene, f))}/{n} ≈ {st(povp)}", "Vsota ocena · frekvenca, deljena z n."),
              "## 7.3", ("@slika", sl),
              "## 7.4", (f"!P = C({f[4]}, 2)/C({n}, 2) = {math.comb(f[4], 2)}/{math.comb(n, 2)}" + (f" = {ulomek_html(p5)}" if p5 != 0 else " = 0"), "Ugodni pari / vsi pari.", "verjetnost")]
    rez = (f"7.1. \\({n}\\), \\({lst(F(f[0] * 100, n))}\\,\\%\\) &nbsp; 7.2. \\(Mo = {mod}\\), \\(Me = {lst(med)}\\), \\(\\bar x \\approx {lst(povp)}\\) &nbsp; 7.3. diagram &nbsp; "
           f"7.4. \\(P = {ulomek_tex(p5)}\\)")
    return dict(poglavje=["statistika_pm", "kombinatorika_verjetnost"], besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_trikotnik(r):
    a, b, gama = r.choice([(8, 6, 50), (10, 7, 64), (12, 9, 38), (9, 5, 72)])
    c = math.sqrt(a * a + b * b - 2 * a * b * math.cos(math.radians(gama)))
    alfa = math.degrees(math.asin(a * math.sin(math.radians(gama)) / c))
    beta = 180 - gama - alfa
    S = a * b * math.sin(math.radians(gama)) / 2
    vc = 2 * S / c
    besedilo = (f"Parcela ima obliko trikotnika \\(ABC\\) s stranicama \\(a = {a}\\) m, \\(b = {b}\\) m in kotom \\(\\gamma = {gama}^\\circ\\) med njima.<br>"
                f"8.1. Izračunaj stranico \\(c\\). (2 točki)<br>"
                f"8.2. Izračunaj kota \\(\\alpha\\) in \\(\\beta\\). (3 točke)<br>"
                f"8.3. Izračunaj ploščino parcele in višino na stranico \\(c\\). (3 točke)<br>"
                f"8.4. Parcelo ogradimo; meter ograje stane 12 €. Koliko stane ograja? (2 točki)")
    o = a + b + c
    koraki = ["## 8.1", (f"!c = √({a}² + {b}² − 2 · {a} · {b} · cos {gama}°) ≈ {st(c)} m", "", "kosinusni"),
              "## 8.2", (f"sin α = {a} · sin {gama}° / {st(c)}", "Sinusni izrek. α je nasproti krajše od stranic a, c? Preverimo, da je ostri kot.", "sinusni"),
              (f"!α ≈ {st(alfa)}°, β = 180° − {gama}° − {st(alfa)}° ≈ {st(beta)}°", "Vsota kotov v trikotniku je 180°."),
              "## 8.3", (f"!S = ½ · {a} · {b} · sin {gama}° ≈ {st(S)} m²", "", "ploscine"),
              (f"!v<sub>c</sub> = 2S/c ≈ {st(vc)} m", ""),
              "## 8.4", (f"!o ≈ {st(o)} m, cena ≈ {st(o * 12)} €", "")]
    rez = (f"8.1. \\(c \\approx {lst(c)}\\) m &nbsp; 8.2. \\(\\alpha \\approx {lst(alfa)}^\\circ\\), \\(\\beta \\approx {lst(beta)}^\\circ\\) &nbsp; "
           f"8.3. \\(S \\approx {lst(S)}\\) m², \\(v_c \\approx {lst(vc)}\\) m &nbsp; 8.4. \\(\\approx {lst(o * 12)}\\) €")
    return dict(poglavje="trikotnik_kotne", besedilo=besedilo, rezultat=rez, koraki=koraki)


def s_eksponentna_rast(r):
    N0 = r.choice([200, 500, 1000])
    k = r.choice([2, 3])
    T = r.choice([2, 3, 4])
    besedilo = (f"Število bakterij v kulturi se vsakih \\({T}\\) ure {'podvoji' if k == 2 else 'potroji'}. Na začetku je bilo \\({N0}\\) bakterij.<br>"
                f"9.1. Zapiši funkcijo \\(N(t)\\), ki pove število bakterij po \\(t\\) urah. (2 točki)<br>"
                f"9.2. Koliko bakterij je po 12 urah? (2 točki)<br>"
                f"9.3. Nariši graf funkcije za \\(t \\in [0, {3 * T}]\\). (3 točke)<br>"
                f"9.4. Po koliko urah bo bakterij \\(100\\,000\\)? (3 točke)")
    N12 = N0 * k ** (12 / T)
    t = T * math.log(100000 / N0) / math.log(k)
    fun = lambda t_: N0 * k ** (t_ / T) / 1000
    ymax = fun(3 * T)
    sl = graf([(fun, MODRA)], (-0.5, 3 * T + 0.5), (-0.1 * ymax, ymax * 1.1), [(0, N0 / 1000, f"{N0}")], oznake=True)
    koraki = ["## 9.1", (f"!N(t) = {N0} · {k}<sup>t/{T}</sup>", "Vsakih " + str(T) + " ure se število pomnoži s " + str(k) + "."),
              "## 9.2", (f"!N(12) = {N0} · {k}<sup>{st(12 / T)}</sup> = {st(N12, 0)}", ""),
              "## 9.3", ("@slika", sl), (None, "Na navpični osi so tisoči bakterij."),
              "## 9.4", (f"{k}<sup>t/{T}</sup> = {st(100000 / N0)}", "Delimo z " + str(N0) + "."),
              (f"t = {T} · log {st(100000 / N0)} / log {k} ≈ {st(t)} h", "Logaritmiramo.", "log_pravila"),
              (f"!t ≈ {st(t, 1)} ure", "")]
    rez = f"9.1. \\(N(t) = {N0} \\cdot {k}^{{t/{T}}}\\) &nbsp; 9.2. \\({lst(N12, 0)}\\) &nbsp; 9.3. graf &nbsp; 9.4. \\(t \\approx {lst(t, 1)}\\) h"
    return dict(poglavje="eksponentna_logaritemska", besedilo=besedilo, rezultat=rez, koraki=koraki)


SESTAVLJENE = [s_kvadratna, s_polinom, s_odvod, s_ekstremalni, s_rezervoar, s_zaporedje_varcevanje, s_statistika_verjetnost, s_trikotnik, s_eksponentna_rast]


# ---------------------------------------------------------------- sestava pole
def pola(leto, rok, datum):
    r = random.Random(f"pm-matematika-{leto}-{rok}")
    naloge = []
    for i, (t, predloge) in enumerate(MESTA, 1):
        n = r.choice(predloge)(r)
        n["tocke"] = t
        naloge.append((f"A{i}", n))
    izbrane = r.sample(SESTAVLJENE, 3)
    for i, s in enumerate(izbrane, 1):
        n = s(r)
        n["tocke"] = 10
        # oštevilčenje delov naloge po mestu v poli (1.1., 2.1. …)
        st_ = re.search(r"(\d+)\.1\. ", n["besedilo"]).group(1)
        for kljuc in ("besedilo", "rezultat"):
            n[kljuc] = re.sub(rf"(?<![\d.]){st_}\.(\d)\. ", rf"{i}.\1. ", n[kljuc])
        n["koraki"] = [re.sub(rf"^## {st_}\.", f"## {i}.", k) if isinstance(k, str) else k for k in n["koraki"]]
        naloge.append((f"B{i}", n))
    out = []
    for nid, n in naloge:
        besedilo = n["besedilo"]
        out.append({"id": nid, "poglavje": n["poglavje"], "tocke": n["tocke"], "besedilo": besedilo,
                    "rezultat": n["rezultat"], "razlaga": rokopis(n["koraki"])})
    ime_roka = {"spomladanski": "spomladanski rok", "jesenski": "jesenski rok", "zimski": "zimski rok"}[rok]
    return {
        "id": f"{PREDMET}-{leto}-{rok}", "predmet": PREDMET, "raven": "enotna", "leto": leto, "rok": rok,
        "pdf": None, "datum": datum,
        "naslov": f"Matematika, poklicna matura, {ime_roka} {leto} (vadbena pola Učilnica.com)",
        "navodilo": "120 minut, 70 točk. 1. del: 11 nalog (50 točk). 2. del: izberi in reši 2 od 3 nalog (20 točk). Dovoljeni so računalo, geometrijsko orodje in priložene formule.",
        "vir": f"Vadbena pola Učilnica.com. Zgradba, vrsta nalog in točkovanje sledijo uradni poli poklicne mature iz matematike ({ime_roka} {leto}), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.",
        "deli": {"A": "1. DEL (11 nalog, 50 točk)", "B": "2. DEL (izberi in reši 2 od 3 nalog, 20 točk)"},
        "naloge": out,
    }


if __name__ == "__main__":
    pole = [pola(*p) for p in POLE]
    for p in pole:
        assert sum(n["tocke"] for n in p["naloge"] if n["id"].startswith("A")) == 50, p["id"]
    with open(IZHOD, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(len(pole), "pol,", sum(len(p["naloge"]) for p in pole), "nalog")
