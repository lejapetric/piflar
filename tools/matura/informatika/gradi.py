# python3 tools/matura/informatika/gradi.py
# Iz virov v tools/matura/informatika/pole/*.py zgradi api/data/matura-informatika.json.
#
# Vsak vir opiše en izpitni dan (izpitna pola 1 s 15 nalogami za 36 točk in izpitna pola 2 s
# 6 nalogami za 44 točk) s funkcijami spodaj:
#   N([teme], uvod, [P(...), ...], slika=None)       ena naloga (teme so ključi iz TEME)
#   P(tocke, besedilo, rezultat, [koraki])           vprašanje naloge (1.1., 1.2. …)
#   P(tocke, "", rezultat, [koraki])                 naloga brez podvprašanj (vprašanje je v uvodu)
#   P(None, besedilo, slika=…)                       besedilo ali slika med vprašanji
# Rezultat je lahko izpuščen: takrat je rezultat zadnji korak z "!" ali zadnja koda v koraku.
#
# Korak je (rokopis, komentar). Rokopis z "!" na začetku je končni odgovor (podčrtan),
# rokopis None pomeni samo komentar. ("@koda", program, komentar) je program v rešitvi,
# ("@slika", html) slika v rešitvi, "## …" vmesni naslov.
#
# Oznake v besedilu: `koda`, **krepko**, ^{…} ali ^8 (nadpisano), _{…} (podpisano, npr. 110_{2}).
# HTML v besedilu se izpiše kot besedilo (npr. <h2>), slike in tabele so posebni gradniki.
import glob, html, json, math, os, re, runpy

KOREN = os.path.dirname(os.path.abspath(__file__))
IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-informatika.json")

# Podpoglavja snovi (sidrišča #sklop-N na straneh s snovjo)
TEME = {
    "temeljni_pojmi": ("osnove_informatike", 1, "Temeljni pojmi"),
    "druzbeni_vidiki": ("osnove_informatike", 2, "Družbeni vidiki informatike"),
    "komuniciranje": ("osnove_informatike", 3, "Komuniciranje"),
    "vloga_it": ("informacijska_tehnologija", 1, "Namen in vloga informacijske tehnologije"),
    "zgradba_racunalnika": ("informacijska_tehnologija", 2, "Zgradba in delovanje računalnika"),
    "strojna_oprema": ("informacijska_tehnologija", 3, "Strojna oprema"),
    "programska_oprema": ("informacijska_tehnologija", 4, "Programska oprema"),
    "omrezja": ("informacijska_tehnologija", 5, "Računalniška omrežja"),
    "zapis_podatkov": ("predstavitev_informacije", 1, "Zapis in predstavitev podatkov"),
    "pisna": ("predstavitev_informacije", 2, "Pisna predstavitev"),
    "slika": ("predstavitev_informacije", 3, "Slikovna predstavitev"),
    "zvok": ("predstavitev_informacije", 4, "Zvočna predstavitev"),
    "video": ("predstavitev_informacije", 5, "Gibljiva slika"),
    "prosojnice": ("predstavitev_informacije", 6, "Računalniške prosojnice"),
    "splet": ("predstavitev_informacije", 7, "Predstavitev na svetovnem spletu"),
    "obdelava": ("delo_s_podatki", 1, "Računalniška obdelava podatkov"),
    "algoritem": ("delo_s_podatki", 2, "Algoritem"),
    "programski_jezik": ("delo_s_podatki", 3, "Programski jezik"),
    "programiranje": ("delo_s_podatki", 4, "Programiranje"),
    "baze": ("delo_s_podatki", 5, "Podatkovna baza"),
    "preglednice": ("delo_s_podatki", 6, "Preglednica"),
    "odlocanje": ("delo_s_podatki", 7, "Tehnologije znanja in odločanje"),
}

SNOV_URL = "/views/informatika/snov/{p}/{p}_razlaga.html#sklop-{s}"


# ---------------------------------------------------------------- besedilo
def oblikuj(s):
    """Preprosta oznaka → HTML. Najprej ubežimo HTML, nato `koda`, **krepko**, ^{…}, _{…}."""
    if s is None:
        return ""
    deli = re.split(r"(`[^`]*`)", str(s))
    izhod = []
    for d in deli:
        if d.startswith("`") and d.endswith("`") and len(d) >= 2:
            izhod.append(f'<code class="k">{html.escape(d[1:-1], quote=False)}</code>')
            continue
        d = html.escape(d, quote=False)
        d = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", d)
        d = re.sub(r"\^\{(.+?)\}", r"<sup>\1</sup>", d)
        d = re.sub(r"(?<=[0-9A-Za-z)])\^(-?[0-9]+)", r"<sup>\1</sup>", d)
        d = re.sub(r"_\{(.+?)\}", r"<sub>\1</sub>", d)
        izhod.append(d)
    return "".join(izhod)


def koda(program, razred=""):
    """Programska koda, izpis ali drevo map (ohrani presledke)."""
    program = program.strip("\n")
    # skupni zamik odstranimo, da lahko kodo v virih zamaknemo
    vrstice = program.split("\n")
    zamik = min((len(v) - len(v.lstrip(" ")) for v in vrstice if v.strip()), default=0)
    program = "\n".join(v[zamik:] for v in vrstice)
    return f'<pre class="koda{(" " + razred) if razred else ""}"><code>{html.escape(program, quote=False)}</code></pre>'


def tabela(glava, vrstice, razred="mn-tabela"):
    th = "".join(f"<th>{oblikuj(g)}</th>" for g in glava) if glava else ""
    tr = "".join("<tr>" + "".join(f"<td>{oblikuj(c)}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<div class="mn-preglednica-ovoj"><table class="{razred}">{"<tr>" + th + "</tr>" if th else ""}{tr}</table></div>'


def preglednica(vrstice, prva=1, stolpci=None):
    """Preglednica kot v programu za preglednice: črke stolpcev zgoraj, številke vrstic levo.
    vrstice je seznam seznamov (prazen niz je prazna celica)."""
    n = max(len(v) for v in vrstice)
    stolpci = stolpci or [chr(ord("A") + i) for i in range(n)]
    glava = '<tr><th class="pr-kot"></th>' + "".join(f"<th>{c}</th>" for c in stolpci) + "</tr>"
    telo = ""
    for i, v in enumerate(vrstice):
        celice = "".join(f"<td>{oblikuj(c)}</td>" for c in list(v) + [""] * (n - len(v)))
        telo += f"<tr><th>{prva + i}</th>{celice}</tr>"
    return f'<div class="mn-preglednica-ovoj"><table class="mn-tabela mn-preglednica">{glava}{telo}</table></div>'


def izbire(*moznosti, crke="ABCDEFGH"):
    """Izbire A, B, C … za obkroževanje."""
    li = "".join(f'<li><span class="izbira-crka">{c}</span><span>{oblikuj(t)}</span></li>' for c, t in zip(crke, moznosti))
    return f'<ol class="pola-izbire">{li}</ol>'


def R(surovo):
    """Surov HTML (za posebne slike)."""
    return surovo


# ---------------------------------------------------------------- slike (SVG)
def _svg(sirina, visina, vsebina, oznaka="Slika"):
    return (f'<svg class="mn-graf in-slika" viewBox="0 0 {sirina} {visina}" width="{sirina}" role="img" aria-label="{html.escape(oznaka)}" '
            f'style="max-width:100%;height:auto;display:block;margin:0.5rem 0">{vsebina}</svg>')


def signal(vrednosti, t_korak=1, y_max=None, oznaka_t="t [ms]", oznaka_y="U", vzorci=None, nivoji=None):
    """Analogni signal (gladka črta skozi točke) na mreži. vzorci: seznam (t, y) pik, ki jih
    nariše rešitev (stopničasto); nivoji: vodoravne črte kvantizacijskih nivojev."""
    y_max = y_max or max(v for _, v in vrednosti)
    t_max = max(t for t, _ in vrednosti)
    L, B, W, H = 40, 26, 360, 180
    X = lambda t: L + t / t_max * W
    Y = lambda y: 10 + H - y / y_max * H
    d = []
    for i in range(int(t_max / t_korak) + 1):
        x = X(i * t_korak)
        d.append(f'<line x1="{x:.1f}" y1="10" x2="{x:.1f}" y2="{10 + H}" stroke="currentColor" stroke-opacity="0.15"/>')
        d.append(f'<text x="{x:.1f}" y="{10 + H + 15}" font-size="11" text-anchor="middle" fill="currentColor">{i * t_korak:g}</text>')
    for y in range(0, int(y_max) + 1):
        yy = Y(y)
        d.append(f'<line x1="{L}" y1="{yy:.1f}" x2="{L + W}" y2="{yy:.1f}" stroke="currentColor" stroke-opacity="{0.35 if nivoji else 0.15}"/>')
        d.append(f'<text x="{L - 6}" y="{yy + 4:.1f}" font-size="11" text-anchor="end" fill="currentColor">{y}</text>')
    d.append(f'<line x1="{L}" y1="{10 + H}" x2="{L + W + 6}" y2="{10 + H}" stroke="currentColor"/>')
    d.append(f'<line x1="{L}" y1="4" x2="{L}" y2="{10 + H}" stroke="currentColor"/>')
    d.append(f'<text x="{L + W}" y="{10 + H + 26}" font-size="12" text-anchor="end" fill="currentColor">{oznaka_t}</text>')
    d.append(f'<text x="{L + 6}" y="12" font-size="12" fill="currentColor">{oznaka_y}</text>')
    # gladka krivulja (Catmull-Rom → Bézier)
    p = [(X(t), Y(y)) for t, y in vrednosti]
    pot = f"M{p[0][0]:.1f},{p[0][1]:.1f}"
    for i in range(len(p) - 1):
        p0, p1, p2, p3 = p[max(i - 1, 0)], p[i], p[i + 1], p[min(i + 2, len(p) - 1)]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        pot += f" C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]:.1f},{p2[1]:.1f}"
    d.append(f'<path d="{pot}" fill="none" stroke="currentColor" stroke-width="2"/>')
    if vzorci:
        crta = []
        for i, (t, y) in enumerate(vzorci):
            t2 = vzorci[i + 1][0] if i + 1 < len(vzorci) else t + t_korak
            crta.append(f"{X(t):.1f},{Y(y):.1f} {X(min(t2, t_max)):.1f},{Y(y):.1f}")
            d.append(f'<circle cx="{X(t):.1f}" cy="{Y(y):.1f}" r="3.5" style="fill:var(--crnilo, #1D3C9E)"/>')
        d.append(f'<polyline points="{" ".join(crta)}" fill="none" style="stroke:var(--crnilo, #1D3C9E)" stroke-width="2.4"/>')
    return _svg(L + W + 20, H + 44, "".join(d), "Graf signala")


def omrezje(vozlisca, povezave, izbrane=None, sirina=420, visina=260):
    """Graf z utežmi: vozlisca {ime: (x, y)}, povezave [(a, b, cena)].
    izbrane: povezave, ki jih poudarimo (rešitev)."""
    izbrane = {frozenset((a, b)) for a, b, *_ in (izbrane or [])}
    d = []
    for a, b, c in povezave:
        (x1, y1), (x2, y2) = vozlisca[a], vozlisca[b]
        poud = frozenset((a, b)) in izbrane
        barva = "var(--crnilo, #1D3C9E)" if poud else "currentColor"
        d.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" style="stroke:{barva}" stroke-width="{3.5 if poud else 1.4}"'
                 f'{"" if poud or not izbrane else " stroke-opacity=\"0.3\" stroke-dasharray=\"4 4\""}/>')
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        if c in ("", None):
            continue
        d.append(f'<rect x="{mx - 11}" y="{my - 9}" width="22" height="16" rx="3" style="fill:var(--papir, var(--bg-card))" stroke="none"/>'
                 f'<text x="{mx}" y="{my + 4}" font-size="12" text-anchor="middle" style="fill:{barva}" font-weight="700">{c}</text>')
    for ime, (x, y) in vozlisca.items():
        d.append(f'<circle cx="{x}" cy="{y}" r="15" style="fill:var(--papir, var(--bg-card))" stroke="currentColor" stroke-width="1.6"/>'
                 f'<text x="{x}" y="{y + 4.5}" font-size="13" text-anchor="middle" fill="currentColor" font-weight="700">{ime}</text>')
    return _svg(sirina, visina, "".join(d), "Shema omrežja")


def luci(mreza, velikost=26):
    """Prikazovalnik lučk: mreza je seznam vrstic z jakostmi 0–3 (0 = črna, 3 = bela)."""
    sive = {0: "#111111", 1: "#6E6E6E", 2: "#BDBDBD", 3: "#FAFAFA"}
    d = []
    for i, vrsta in enumerate(mreza):
        for j, v in enumerate(vrsta):
            d.append(f'<rect x="{2 + j * velikost}" y="{2 + i * velikost}" width="{velikost}" height="{velikost}" '
                     f'fill="{sive[v]}" stroke="#555555" stroke-width="1"/>')
    n = len(mreza) * velikost
    d.append(f'<line x1="{2 + n / 2}" y1="0" x2="{2 + n / 2}" y2="{n + 4}" stroke="#D02020" stroke-width="2"/>'
             f'<line x1="0" y1="{2 + n / 2}" x2="{n + 4}" y2="{2 + n / 2}" stroke="#D02020" stroke-width="2"/>')
    return (f'<svg class="in-luci" viewBox="0 0 {n + 4} {n + 4}" width="{n + 4}" role="img" aria-label="Prikazovalnik" '
            f'style="display:inline-block;vertical-align:top;margin:0.3rem 0.8rem 0.3rem 0">{"".join(d)}</svg>')


def slike_v_vrsti(*pari):
    """Več slik z napisi v eni vrsti: slike_v_vrsti(("A", svg), ("B", svg))."""
    return ('<div class="in-vrsta">' + "".join(f'<figure>{s}<figcaption>{oblikuj(n)}</figcaption></figure>' for n, s in pari) + "</div>")


def diagram(koraki, sirina=380):
    """Diagram poteka z eno zanko. koraki: seznam
       ("zacetek",) ("konec",) ("vhod", besedilo) ("izhod", besedilo) ("ukaz", besedilo)
       ("pogoj", besedilo, [koraki v zanki], [koraki za "ne"]) – če je pogoj resničen (da),
       izvedemo telo in se vrnemo na pogoj; ko ni (ne), gremo naprej.
       ("ce", besedilo, [koraki za da], [koraki za ne]) – razvejitev brez vračanja."""
    d = []
    y = [12]
    cx = sirina / 2 - 30

    def tekst(x, yy, s, velikost=12):
        return f'<text x="{x}" y="{yy}" font-size="{velikost}" text-anchor="middle" fill="currentColor" font-family="ui-monospace, Menlo, Consolas, monospace">{html.escape(s)}</text>'

    def puscica(x1, y1, x2, y2):
        d.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="currentColor" stroke-width="1.3" marker-end="url(#pk)"/>')

    def blok(k, x):
        tip = k[0]
        vrh = y[0]
        if tip in ("zacetek", "konec"):
            s = "ZAČETEK" if tip == "zacetek" else "KONEC"
            d.append(f'<rect x="{x - 50}" y="{vrh}" width="100" height="28" rx="14" style="fill:var(--papir, var(--bg-card))" stroke="currentColor" stroke-width="1.4"/>')
            d.append(tekst(x, vrh + 18, s))
            y[0] += 28
        elif tip in ("ukaz", "vhod", "izhod"):
            vrstice = k[1].split("\n")
            h = 10 + 15 * len(vrstice)
            sir = max(110, 8 * max(len(v) for v in vrstice) + 24)
            if tip == "ukaz":
                d.append(f'<rect x="{x - sir / 2}" y="{vrh}" width="{sir}" height="{h}" style="fill:var(--papir, var(--bg-card))" stroke="currentColor" stroke-width="1.4"/>')
            else:
                z = 10
                d.append(f'<polygon points="{x - sir / 2 + z},{vrh} {x + sir / 2 + z},{vrh} {x + sir / 2 - z},{vrh + h} {x - sir / 2 - z},{vrh + h}" style="fill:var(--papir, var(--bg-card))" stroke="currentColor" stroke-width="1.4"/>')
            for i, v in enumerate(vrstice):
                d.append(tekst(x, vrh + 18 + 15 * i, v))
            y[0] += h
        elif tip in ("pogoj", "ce"):
            s = k[1]
            sir = max(120, 8 * len(s) + 40)
            h = 46
            d.append(f'<polygon points="{x},{vrh} {x + sir / 2},{vrh + h / 2} {x},{vrh + h} {x - sir / 2},{vrh + h / 2}" style="fill:var(--papir, var(--bg-card))" stroke="currentColor" stroke-width="1.4"/>')
            d.append(tekst(x, vrh + h / 2 + 4, s))
            sredina = vrh + h / 2
            y[0] += h
            if tip == "pogoj":
                d.append(f'<text x="{x + 6}" y="{y[0] + 14}" font-size="11" fill="currentColor">da</text>')
                for kk in k[2]:
                    puscica(x, y[0], x, y[0] + 18)
                    y[0] += 18
                    blok(kk, x)
                # nazaj na pogoj (levo)
                lx = x - sir / 2 - 24
                d.append(f'<polyline points="{x},{y[0]} {x},{y[0] + 12} {lx},{y[0] + 12} {lx},{sredina} {x - sir / 2 - 2},{sredina}" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#pk)"/>')
                y[0] += 12
                # "ne": desno in navzdol
                rx = x + sir / 2 + 30
                d.append(f'<text x="{x + sir / 2 + 4}" y="{sredina - 6}" font-size="11" fill="currentColor">ne</text>')
                d.append(f'<polyline points="{x + sir / 2},{sredina} {rx},{sredina} {rx},{y[0] + 14} {x},{y[0] + 14}" fill="none" stroke="currentColor" stroke-width="1.3"/>')
                y[0] += 14
                for kk in k[3]:
                    puscica(x, y[0], x, y[0] + 18)
                    y[0] += 18
                    blok(kk, x)
            else:
                # da: levo, ne: desno, nato združi
                lx, rx = x - sir / 2 - 10, x + sir / 2 + 10
                zac = y[0]
                konci = []
                for stran, xx, oz in ((k[2], x - 95, "da"), (k[3], x + 95, "ne")):
                    y[0] = zac
                    d.append(f'<text x="{(x - sir / 2 - 14) if oz == "da" else (x + sir / 2 + 2)}" y="{sredina - 6}" font-size="11" fill="currentColor">{oz}</text>')
                    kx = x - sir / 2 if oz == "da" else x + sir / 2
                    d.append(f'<polyline points="{kx},{sredina} {xx},{sredina} {xx},{y[0] + 14}" fill="none" stroke="currentColor" stroke-width="1.3" marker-end="url(#pk)"/>')
                    y[0] += 14
                    for kk in stran:
                        blok(kk, xx)
                        puscica(xx, y[0], xx, y[0] + 14) if kk is not stran[-1] else None
                        if kk is not stran[-1]:
                            y[0] += 14
                    konci.append((xx, y[0]))
                dno = max(yy for _, yy in konci) + 14
                for xx, yy in konci:
                    d.append(f'<polyline points="{xx},{yy} {xx},{dno} {x},{dno}" fill="none" stroke="currentColor" stroke-width="1.3"/>')
                y[0] = dno

    prvi = True
    for k in koraki:
        if not prvi:
            puscica(cx, y[0], cx, y[0] + 18)
            y[0] += 18
        blok(k, cx)
        prvi = False
    defs = ('<defs><marker id="pk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            '<path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>')
    return _svg(sirina, y[0] + 10, defs + "".join(d), "Diagram poteka")


def entitete(*ent, razmerja=None):
    """Entitete z atributi kot okvirji (osnutek diagrama E-R). ent: (ime, [atributi]).
    Atribut, ki se začne s "#", je primarni ključ (podčrtan), s "→" tuji ključ."""
    def atr(a):
        if a.startswith("#"):
            return f'<li><u>{oblikuj(a[1:])}</u> <small>(PK)</small></li>'
        if a.startswith("→"):
            return f'<li><em>{oblikuj(a[1:])}</em> <small>(FK)</small></li>'
        return f"<li>{oblikuj(a)}</li>"
    skatle = "".join(f'<div class="in-entiteta"><strong>{oblikuj(i)}</strong><ul>{"".join(atr(a) for a in at)}</ul></div>' for i, at in ent)
    rel = ""
    if razmerja:
        rel = '<ul class="in-razmerja">' + "".join(f"<li>{oblikuj(r)}</li>" for r in razmerja) + "</ul>"
    return f'<div class="in-er">{skatle}</div>{rel}'


# ---------------------------------------------------------------- naloge
def tocke(t):
    return "1 točka" if t == 1 else "2 točki" if t == 2 else f"{t} točke" if t <= 4 else f"{t} točk"


def P(tocke_, besedilo="", rezultat=None, koraki=None, slika=None):
    if isinstance(rezultat, list):
        rezultat, koraki = None, rezultat
    return {"t": tocke_, "b": besedilo, "r": rezultat, "k": koraki or [], "s": slika}


def N(teme, uvod, deli, slika=None):
    for t in teme:
        if t not in TEME:
            raise KeyError(f"neznana tema {t!r}")
    return {"teme": teme, "uvod": uvod, "deli": deli, "slika": slika}


def rokopis(koraki):
    deli = []
    for k in koraki:
        if isinstance(k, str) and k.startswith("##"):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oblikuj(k[2:].strip())}</div></div>')
            continue
        if k[0] == "@slika":
            deli.append(f'<div class="rk-slika">{k[1]}</div>')
            continue
        if k[0] == "@koda":
            kom = k[2] if len(k) > 2 else ""
            deli.append(f'<div class="rk-korak rk-koda"><div class="rk-v">{koda(k[1])}</div><div class="rk-kom">{oblikuj(kom)}</div></div>')
            continue
        v, kom = k[0], k[1] if len(k) > 1 else ""
        if v is None:
            deli.append(f'<div class="rk-kom rk-sam">{oblikuj(kom)}</div>')
            continue
        odg = v.startswith("!")
        v = oblikuj(v.lstrip("!"))
        if odg:
            v = f'<span class="rk-odg">{v}</span>'
        deli.append(f'<div class="rk-korak"><div class="rk-v">{v}</div><div class="rk-kom">{oblikuj(kom)}</div></div>')
    return deli


def _rezultat(d, oznaka):
    r = d["r"]
    if r is not None:
        return koda(r[1]) if isinstance(r, tuple) and r[0] == "@koda" else oblikuj(r)
    odg = [k[0][1:] for k in d["k"] if isinstance(k, tuple) and isinstance(k[0], str) and k[0].startswith("!")]
    if odg:
        return oblikuj(odg[-1])
    kode = [k[1] for k in d["k"] if isinstance(k, tuple) and k[0] == "@koda"]
    assert kode, f"{oznaka}: ni rezultata"
    return koda(kode[-1])


def naloga(st, n):
    besedilo = []
    if n["uvod"]:
        for odst in n["uvod"].split("\n\n"):
            besedilo.append(f"<p>{oblikuj(odst)}</p>")
    if n["slika"]:
        besedilo.append(n["slika"])
    rezultati, koraki, skupaj, k = [], [], 0, 0
    vprasanja = [d for d in n["deli"] if d["t"] is not None]
    for d in n["deli"]:
        if d["t"] is None:
            if d["b"]:
                besedilo.append(f"<p>{oblikuj(d['b'])}</p>")
            if d["s"]:
                besedilo.append(d["s"])
            continue
        k += 1
        skupaj += d["t"]
        brez = len(vprasanja) == 1 and not d["b"]
        oznaka = "" if brez else f"{st}.{k}."
        if not brez:
            besedilo.append(f'<p class="pola-vprasanje"><strong>{oznaka}</strong> {oblikuj(d["b"])} <em>({tocke(d["t"])})</em></p>')
        if d["s"]:
            besedilo.append(d["s"])
        r = _rezultat(d, f"naloga {st} {oznaka}")
        rezultati.append(f"<strong>{oznaka}</strong> {r}" if oznaka else r)
        if oznaka:
            koraki.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oznaka}</div></div>')
        koraki += rokopis(d["k"])
    poglavja = list(dict.fromkeys(TEME[t][0] for t in n["teme"]))
    prva = TEME[n["teme"][0]]
    return {
        "poglavje": poglavja,
        "tema": n["teme"],
        "snov": SNOV_URL.format(p=prva[0], s=prva[1]),
        "snovNaslov": prva[2],
        "tocke": skupaj,
        "besedilo": "".join(besedilo),
        "rezultat": "<br>".join(rezultati),
        "razlaga": '<div class="rokopis">' + "".join(koraki) + "</div>",
    }


VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), besedila, podatki in programi pa so naši. Uradne pole izdaja Državni izpitni center (RIC), "
       "ki ima nanje vse avtorske pravice.")
PRIPOMOCKI = "Dovoljeno je računalo."
GRADNIKI = {"N": N, "P": P, "koda": koda, "tabela": tabela, "preglednica": preglednica, "R": R, "izbire": izbire,
            "signal": signal, "omrezje": omrezje, "luci": luci, "slike_v_vrsti": slike_v_vrsti,
            "diagram": diagram, "entitete": entitete}


def zgradi(pot):
    ns = runpy.run_path(pot, init_globals=GRADNIKI)
    leto, rok, izvedba, datum = ns["LETO"], ns["ROK"], ns.get("IZVEDBA", 1), ns["DATUM"]
    pola1, pola2 = ns["POLA1"], ns["POLA2"]
    assert len(pola1) == 15, f"{pot}: pola 1 ima {len(pola1)} nalog"
    assert len(pola2) == 6, f"{pot}: pola 2 ima {len(pola2)} nalog"
    pripona = "" if izvedba == 1 else f"-{izvedba}"
    opis_roka = f"{rok} rok {leto}" + (f", {izvedba}. izpitni dan" if izvedba > 1 else "")
    skupno = {"predmet": "informatika", "raven": "enotna", "leto": leto, "rok": rok, "izvedba": izvedba, "datum": datum, "pdf": None}
    pole = []
    for st, naloge, tock, opis in ((1, pola1, 36, "15 nalog"), (2, pola2, 44, "6 strukturiranih nalog")):
        izdelane = [{"id": str(i + 1), **naloga(i + 1, n)} for i, n in enumerate(naloge)]
        vsota = sum(n["tocke"] for n in izdelane)
        assert vsota == tock, f"{pot}: pola {st} ima {vsota} točk namesto {tock}"
        pole.append({
            "id": f"informatika-{leto}-{rok}{pripona}-{st}", **skupno, "stevilka": st,
            "naslov": f"Informatika, {opis_roka}, izpitna pola {st} (vadbena pola Piflar.si)",
            "navodilo": f"90 minut, {opis}, {tock} točk. {PRIPOMOCKI}",
            "vir": VIR.format(opis=f"{opis_roka}, izpitna pola {st}"),
            "naloge": izdelane,
        })
    return pole


ROKI = {"spomladanski": 0, "jesenski": 1}

if __name__ == "__main__":
    viri = sorted(glob.glob(os.path.join(KOREN, "pole", "*.py")))
    pole = []
    for v in viri:
        pole += zgradi(v)
    pole.sort(key=lambda p: (-p["leto"], ROKI[p["rok"]], p["izvedba"], p["stevilka"]))
    with open(IZHOD, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog → {os.path.relpath(IZHOD)}")
