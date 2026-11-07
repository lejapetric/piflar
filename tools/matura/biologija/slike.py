# Risbe za maturitetne pole iz biologije v istem slogu kot slike v snovi
# (public/style/snov.css: razredi .slika, s-os, s-k1 … s-k4, s-lik, s-pou1 … s-pou6, s-crta, s-pom …).
#
#   fig(svg, napis, vrsta)            ovije SVG v <figure class="slika"> z napisom
#   iz_snovi("Nefron", napis)         vzame že narisano sliko iz razlage snovi (po aria-label)
#   crte(...), stolpci(...)            grafa, kot ju nariše dijak
#   rodovnik(...)                      rodovnik z oznakami generacij in oseb
#   diagram(...)                       okvirčki s puščicami (prehranjevalni splet, shema poteka)
#   ploscica(...)                      gojišče v petrijevki (antibiogram)
#   epruvete(...)                      vrsta epruvet ali erlenmajeric z oznakami
#   celica(...)                        poenostavljena celica z označenimi deli (črke ali imena)
import glob, html, math, os, re

KOREN = os.path.dirname(os.path.abspath(__file__))
SNOV = os.path.join(KOREN, "..", "..", "..", "public", "views", "biologija", "snov")

_st = [0]


def _id():
    _st[0] += 1
    return f"mb{_st[0]}"


def _t(s):
    return html.escape(str(s), quote=False)


def _st_fmt(x):
    if isinstance(x, str):
        return x
    return (f"{x:.4g}").replace(".", ",")


def fig(svg, napis=None, vrsta=None):
    razred = "slika" + (f" slika--{vrsta}" if vrsta else "")
    cap = f"<figcaption>{napis}</figcaption>" if napis else ""
    return f'<figure class="{razred}">{svg}{cap}</figure>'


def _svg(w, h, oznaka, telo):
    return (f'<svg viewBox="0 0 {w} {h}" role="img" aria-label="{_t(oznaka)}" '
            f'xmlns="http://www.w3.org/2000/svg">{telo}</svg>')


def _marker(barva="#5B6178"):
    i = _id()
    d = (f'<defs><marker id="{i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
         f'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{barva}"/></marker></defs>')
    return i, d


def _besedilo(x, y, s, razred="s-txt-b", sidro="middle", velikost=11):
    vrstice = str(s).split("\n")
    out = []
    for k, v in enumerate(vrstice):
        out.append(f'<text class="{razred}" x="{x:.1f}" y="{y + k * (velikost + 2):.1f}" text-anchor="{sidro}" '
                   f'style="font-size:{velikost}px">{_t(v)}</text>')
    return "".join(out)


# ------------------------------------------------------------------ slike iz snovi
_SNOV = None


def _snov_svg(oznaka):
    global _SNOV
    if _SNOV is None:
        _SNOV = "".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(os.path.join(SNOV, "*", "*_razlaga.html"))))
    m = re.search(r'<svg[^>]*aria-label="%s".*?</svg>' % re.escape(oznaka), _SNOV, re.S)
    if not m:
        raise KeyError(f"v snovi ni slike {oznaka!r}")
    return m.group(0)


def besedila_snovi(oznaka):
    """Za pripravo: seznam napisov na sliki iz snovi (po vrsti)."""
    return re.findall(r"<text[^>]*>([^<]*)</text>", _snov_svg(oznaka))


def iz_snovi(oznaka, napis=None, vrsta=None, zamenjaj=None, skrij=()):
    """Slika iz snovi. zamenjaj: {stari napis: nov napis} (npr. ime dela → številka ali črka),
    skrij: napisi, ki jih na sliki ne sme biti (odstrani besedilo, črta ostane)."""
    svg = _snov_svg(oznaka)
    zamenjaj = zamenjaj or {}

    def nadomesti(m):
        t = html.unescape(m.group(2))
        if t in skrij:
            return ""
        if t in zamenjaj:
            return f"{m.group(1)}{_t(zamenjaj[t])}</text>"
        return m.group(0)
    svg = re.sub(r"(<text[^>]*>)([^<]*)</text>", nadomesti, svg)
    # id-ji markerjev morajo biti na strani enkratni
    p = _id() + "-"
    svg = re.sub(r'id="([^"]+)"', lambda x: f'id="{p}{x.group(1)}"', svg)
    svg = re.sub(r'url\(#([^)]+)\)', lambda x: f'url(#{p}{x.group(1)})', svg)
    return fig(svg, napis, vrsta)


# ------------------------------------------------------------------ grafa
def _lep_korak(najvec):
    surov = najvec / 5 if najvec > 0 else 1
    red = 10 ** math.floor(math.log10(surov))
    for m in (1, 2, 2.5, 5, 10):
        if m * red >= surov:
            return m * red


def _osi(w, h, L, B, T, R, osx, osy, ymin, ymax, korak, oznake_x):
    W, H = w - L - R, h - T - B
    i, mk = _marker()
    d = [mk]
    Y = lambda y: T + H - (y - ymin) / (ymax - ymin) * H
    v = ymin
    while v <= ymax + 1e-9:
        yy = Y(v)
        d.append(f'<line class="s-mreza" x1="{L}" y1="{yy:.1f}" x2="{L + W}" y2="{yy:.1f}"/>')
        d.append(f'<text class="s-os-txt" x="{L - 5}" y="{yy + 4:.1f}" text-anchor="end">{_st_fmt(round(v, 6))}</text>')
        v += korak
    d.append(f'<line class="s-os" x1="{L}" y1="{T + H}" x2="{L + W + 8}" y2="{T + H}" marker-end="url(#{i})"/>')
    d.append(f'<line class="s-os" x1="{L}" y1="{T + H}" x2="{L}" y2="{T - 8}" marker-end="url(#{i})"/>')
    d.append(f'<text class="s-os-txt" x="{L + W}" y="{h - 4}" text-anchor="end">{_t(osx)}</text>')
    d.append(f'<text class="s-os-txt" x="{L + 6}" y="{T - 2}">{_t(osy)}</text>')
    return d, W, H, Y


def crte(xs, serije, osx, osy, ymin=0, ymax=None, sirina=480, visina=270, oznake_x=None, tocke=True):
    """Črtni graf. serije: [(ime, [y ...]), ...]; y je lahko None (ni meritve)."""
    vse = [y for _, ys in serije for y in ys if y is not None]
    if ymax is None:
        k = _lep_korak((max(vse) - ymin) * 1.05)
        ymax = ymin + 5 * k
    korak = _lep_korak((ymax - ymin) * 0.99)
    L, B, T, R = 50, 34, 26, 16 + (110 if len(serije) > 1 else 0)
    d, W, H, Y = _osi(sirina, visina, L, B, T, R, osx, osy, ymin, ymax, korak, oznake_x)
    xmin, xmax = min(xs), max(xs)
    X = lambda x: L + 10 + (x - xmin) / ((xmax - xmin) or 1) * (W - 20)
    for x, ox in zip(xs, oznake_x or xs):
        d.append(f'<line class="s-os" x1="{X(x):.1f}" y1="{T + H}" x2="{X(x):.1f}" y2="{T + H + 4}"/>')
        d.append(f'<text class="s-os-txt" x="{X(x):.1f}" y="{T + H + 16}" text-anchor="middle">{_t(_st_fmt(ox))}</text>')
    for n, (ime, ys) in enumerate(serije):
        r = f"s-k{n % 4 + 1}"
        pts = [(X(x), Y(y)) for x, y in zip(xs, ys) if y is not None]
        d.append(f'<path class="{r}" d="M' + " L".join(f"{a:.1f},{b:.1f}" for a, b in pts) + '"/>')
        if tocke:
            barva = ["#4F46E5", "#DC2626", "#16A34A", "#D97706"][n % 4]
            d += [f'<circle cx="{a:.1f}" cy="{b:.1f}" r="3.2" fill="{barva}" stroke="#fff" stroke-width="1.2"/>' for a, b in pts]
        if len(serije) > 1:
            ly = T + 10 + n * 18
            d.append(f'<line class="{r}" x1="{L + W + 14}" y1="{ly}" x2="{L + W + 34}" y2="{ly}"/>')
            d.append(_besedilo(L + W + 38, ly + 4, ime, f"s-txt-k{n % 4 + 1}", "start", 10))
    return _svg(sirina, visina, osy + " v odvisnosti od " + osx, "".join(d))


def stolpci(kategorije, serije, osx, osy, ymin=0, ymax=None, sirina=480, visina=270):
    """Stolpčni graf. serije: [(ime, [vrednost za vsako kategorijo]), ...]."""
    vse = [y for _, ys in serije for y in ys]
    if ymax is None:
        k = _lep_korak((max(vse) - ymin) * 1.05)
        ymax = ymin + 5 * k
    korak = _lep_korak((ymax - ymin) * 0.99)
    L, B, T, R = 50, 34, 26, 16 + (110 if len(serije) > 1 else 0)
    d, W, H, Y = _osi(sirina, visina, L, B, T, R, osx, osy, ymin, ymax, korak, None)
    n, m = len(kategorije), len(serije)
    sk = W / n
    sw = min(34, sk * 0.7 / m)
    razredi = ["s-stolpec", "s-pou2", "s-pou3", "s-pou4"]
    for i, kat in enumerate(kategorije):
        x0 = L + i * sk + (sk - sw * m) / 2
        for j, (_, ys) in enumerate(serije):
            y = ys[i]
            d.append(f'<rect class="{razredi[j % 4]}" x="{x0 + j * sw:.1f}" y="{Y(y):.1f}" width="{sw - 2:.1f}" height="{Y(ymin) - Y(y):.1f}"/>')
        d.append(_besedilo(L + i * sk + sk / 2, T + H + 16, kat, "s-os-txt", "middle", 11))
    if m > 1:
        for j, (ime, _) in enumerate(serije):
            ly = T + 10 + j * 18
            d.append(f'<rect class="{razredi[j % 4]}" x="{L + W + 14}" y="{ly - 6}" width="14" height="10"/>')
            d.append(_besedilo(L + W + 34, ly + 3, ime, "s-txt-b", "start", 10))
    return _svg(sirina, visina, osy + " po " + osx, "".join(d))


# ------------------------------------------------------------------ rodovnik
def rodovnik(generacije, poroke, otroci, puscica=None, legenda=("zdrav", "bolan"), prenasalci=False, razmik=56):
    """generacije: seznam generacij, vsaka je seznam oseb (spol "m"/"z", stanje 0 zdrav / 1 bolan / 2 prenašalec).
    poroke: [(generacija, i, j)] partnerja v isti generaciji. otroci: {(generacija, i, j): [indeksi v naslednji generaciji]}.
    puscica: (generacija, i) oseba, označena s puščico."""
    r = 11
    L, T, dy = 44, 26, 74
    sir = max(420, max(len(g) for g in generacije) * razmik + L + 170)
    vis = T + dy * (len(generacije) - 1) + 50
    X = lambda i: L + 20 + i * razmik
    Yg = lambda g: T + g * dy
    d = []
    rim = ["I", "II", "III", "IV", "V"]
    for g, gen in enumerate(generacije):
        d.append(_besedilo(14, Yg(g) + 4, rim[g], "s-txt-k1", "middle", 12))
    for (g, i, j) in poroke:
        d.append(f'<line class="s-crta" x1="{X(i) + r}" y1="{Yg(g)}" x2="{X(j) - r}" y2="{Yg(g)}"/>')
    for (g, i, j), ot in otroci.items():
        sx = (X(i) + X(j)) / 2
        yb = Yg(g) + dy / 2
        d.append(f'<line class="s-crta" x1="{sx}" y1="{Yg(g)}" x2="{sx}" y2="{yb}"/>')
        xs = [X(k) for k in ot]
        d.append(f'<line class="s-crta" x1="{min(xs + [sx])}" y1="{yb}" x2="{max(xs + [sx])}" y2="{yb}"/>')
        for x in xs:
            d.append(f'<line class="s-crta" x1="{x}" y1="{yb}" x2="{x}" y2="{Yg(g + 1) - r}"/>')

    def oseba(x, y, spol, st):
        polno = 'fill="#4F46E5"' if st == 1 else 'class="s-prazna"'
        if spol == "m":
            s = f'<rect {polno} x="{x - r}" y="{y - r}" width="{2 * r}" height="{2 * r}"/>'
        else:
            s = f'<circle {polno} cx="{x}" cy="{y}" r="{r}"/>'
        if st == 2:
            s += f'<circle cx="{x}" cy="{y}" r="3.5" fill="#4F46E5"/>'
        return s

    for g, gen in enumerate(generacije):
        for i, (spol, st) in enumerate(gen):
            if spol is None:
                continue
            d.append(oseba(X(i), Yg(g), spol, st))
            d.append(_besedilo(X(i) - r - 3, Yg(g) - r + 2, i + 1, "s-txt-muted", "end", 10))
    if puscica:
        g, i = puscica
        mi, mk = _marker("#DC2626")
        d.append(mk + f'<line class="s-k2" style="stroke-width:1.8" x1="{X(i) - 34}" y1="{Yg(g) + 26}" x2="{X(i) - r - 4}" y2="{Yg(g) + 6}" marker-end="url(#{mi})"/>')
    lx = sir - 130
    vrst = [("m", 0, f"{legenda[0]} moški"), ("z", 0, f"{legenda[0]}a ženska"), ("m", 1, f"{legenda[1]} moški"), ("z", 1, f"{legenda[1]}a ženska")]
    if prenasalci:
        vrst.append(("z", 2, "prenašalka"))
    for k, (s, st, ime) in enumerate(vrst):
        y = T + k * 26
        d.append(oseba(lx, y, s, st))
        d.append(_besedilo(lx + 18, y + 4, ime, "s-txt-b", "start", 10))
    vis = max(vis, T + len(vrst) * 26 + 6)
    return _svg(sir, vis, "Rodovnik", "".join(d))


# ------------------------------------------------------------------ okvirčki in puščice
def diagram(vozlisca, povezave, sirina=520, visina=300, oznaka="Shema", okvir=True, krog=False):
    """vozlisca: {kljuc: (x, y, "besedilo", razred)} (razred neobvezen: s-lik, s-lik-2, s-pou1 …).
    povezave: [(od, do)] ali [(od, do, "napis")]; puščica kaže od prvega k drugemu."""
    mi, mk = _marker()
    d = [mk]
    vel = {}
    for k, v in vozlisca.items():
        x, y, s = v[:3]
        vrst = str(s).split("\n")
        w = max(len(t) for t in vrst) * 6.4 + 16
        h = len(vrst) * 13 + 10
        vel[k] = (x, y, w / 2, h / 2)

    def rob(a, b):
        x1, y1, w1, h1 = vel[a]
        x2, y2, w2, h2 = vel[b]
        dx, dy_ = x2 - x1, y2 - y1
        def izhod(x, y, w, h, dx, dy_):
            if dx == 0 and dy_ == 0:
                return x, y
            t = min(w / abs(dx) if dx else 1e9, h / abs(dy_) if dy_ else 1e9)
            return x + dx * t, y + dy_ * t
        ax, ay = izhod(x1, y1, w1 + 3, h1 + 3, dx, dy_)
        bx, by = izhod(x2, y2, w2 + 5, h2 + 5, -dx, -dy_)
        return ax, ay, bx, by

    for p in povezave:
        a, b = p[0], p[1]
        ax, ay, bx, by = rob(a, b)
        d.append(f'<line class="s-crta" style="stroke-width:1.2" x1="{ax:.1f}" y1="{ay:.1f}" x2="{bx:.1f}" y2="{by:.1f}" marker-end="url(#{mi})"/>')
        if len(p) > 2:
            vod = abs(by - ay) < 4
            d.append(_besedilo((ax + bx) / 2 + (0 if vod else 5), (ay + by) / 2 - (5 if vod else -3), p[2], "s-txt-muted", "middle" if vod else "start", 10))
    for k, v in vozlisca.items():
        x, y, s = v[:3]
        razred = v[3] if len(v) > 3 else "s-lik"
        _, _, w, h = vel[k]
        if okvir:
            if krog:
                d.append(f'<ellipse class="{razred}" cx="{x}" cy="{y}" rx="{w}" ry="{h}"/>')
            else:
                d.append(f'<rect class="{razred}" x="{x - w:.1f}" y="{y - h:.1f}" width="{2 * w:.1f}" height="{2 * h:.1f}" rx="6"/>')
        vrst = str(s).split("\n")
        d.append(_besedilo(x, y + 4 - (len(vrst) - 1) * 6.5, s, "s-txt-b", "middle", 11))
    return _svg(sirina, visina, oznaka, "".join(d))


def veriga(clenovi, oznaka="Shema", sirina=None, navpicno=False):
    """Členi v vrsti, povezani s puščicami (npr. potek procesa)."""
    n = len(clenovi)
    if navpicno:
        sir = sirina or 300
        voz = {i: (sir / 2, 24 + i * 52, c) for i, c in enumerate(clenovi)}
        return diagram(voz, [(i, i + 1) for i in range(n - 1)], sir, 24 + (n - 1) * 52 + 30, oznaka)
    dolz = max(len(max(str(c).split("\n"), key=len)) for c in clenovi) * 6.4 + 46
    sir = max(sirina or 0, int(n * dolz + 20))
    korak = (sir - 20) / n
    voz = {i: (10 + korak * (i + 0.5), 40, c) for i, c in enumerate(clenovi)}
    return diagram(voz, [(i, i + 1) for i in range(n - 1)], sir, 84, oznaka)


# ------------------------------------------------------------------ laboratorij
def ploscica(diski, oznaka="Antibiogram", napis_desno=None):
    """Petrijevka z bakterijami; diski: [(oznaka, polmer inhibicijske cone v mm)] (0 = ni cone)."""
    cx, cy, R = 130, 120, 100
    d = [f'<circle class="s-pou4" cx="{cx}" cy="{cy}" r="{R}" style="opacity:.35"/>',
         f'<circle class="s-crta" style="fill:none;stroke-width:2" cx="{cx}" cy="{cy}" r="{R}"/>']
    n = len(diski)
    for k, (ime, mm) in enumerate(diski):
        if n == 1:
            x, y = cx, cy
        else:
            a = -math.pi / 2 + 2 * math.pi * k / n
            x, y = cx + 52 * math.cos(a), cy + 52 * math.sin(a)
        if mm:
            d.append(f'<circle class="s-prazna" cx="{x:.1f}" cy="{y:.1f}" r="{8 + mm * 1.6:.1f}" style="fill:#fff;stroke-width:1"/>')
        d.append(f'<circle class="s-lik" cx="{x:.1f}" cy="{y:.1f}" r="8"/>')
        d.append(_besedilo(x, y + 4, ime, "s-txt-b", "middle", 10))
    if napis_desno:
        d.append(_besedilo(250, 70, napis_desno, "s-txt-muted", "start", 11))
    return _svg(420 if napis_desno else 260, 240, oznaka, "".join(d))


def epruvete(oznake, vsebine=None, polnila=None, oznaka="Poskus", erlenmajerice=False, baloni=None):
    """Vrsta epruvet (ali erlenmajeric) z oznakami pod njimi in kratkim opisom vsebine.
    polnila: razred tekočine za vsako (npr. s-voda, s-pou1, s-pou3). baloni: velikost balona (0–1) na vratu."""
    n = len(oznake)
    korak = 92
    sir = n * korak + 20
    vis = 230 if vsebine else 200
    d = []
    zamik = 50 if baloni else 0
    for i, ime in enumerate(oznake):
        x = 20 + i * korak + korak / 2
        razred = (polnila[i] if polnila else "s-voda")
        if erlenmajerice:
            d.append(f'<path class="s-ps" d="M{x - 9},50 L{x - 9},95 L{x - 34},165 L{x + 34},165 L{x + 9},95 L{x + 9},50 z"/>')
            d.append(f'<path class="{razred}" d="M{x - 19},125 L{x - 34},163 L{x + 34},163 L{x + 19},125 z"/>')
            if baloni:
                b = baloni[i]
                d.append(f'<ellipse class="s-pou3" cx="{x}" cy="{48 - 8 - 22 * b}" rx="{8 + 20 * b:.1f}" ry="{10 + 22 * b:.1f}"/>')
        else:
            d.append(f'<path class="s-ps" d="M{x - 12},40 L{x - 12},150 a12,12 0 0 0 24,0 L{x + 12},40 z"/>')
            d.append(f'<path class="{razred}" d="M{x - 11},100 L{x - 11},150 a11,11 0 0 0 22,0 L{x + 11},100 z"/>')
        d.append(_besedilo(x, 188, ime, "s-txt-b", "middle", 12))
        if vsebine:
            d.append(_besedilo(x, 205, vsebine[i], "s-txt-muted", "middle", 9))
    telo = "".join(d)
    if zamik:
        telo = f'<g transform="translate(0,{zamik})">{telo}</g>'
    return _svg(sir, vis + zamik + (12 * (max(str(v).count("\n") for v in vsebine) if vsebine else 0)), oznaka, telo)


# ------------------------------------------------------------------ celice in organi
def oznacbe(tocke):
    """Označevalne črte: [(x točke, y točke, x napisa, y napisa, "besedilo")]."""
    d = []
    for x, y, tx, ty, s in tocke:
        sidro = "start" if tx > x + 4 else "end" if tx < x - 4 else "middle"
        d.append(f'<line class="s-pom" style="stroke-dasharray:none" x1="{x}" y1="{y}" x2="{tx}" y2="{ty}"/>')
        d.append(f'<circle cx="{x}" cy="{y}" r="2" class="s-par"/>')
        dy = -4 if ty < y else 12 if ty > y else 4
        dx = 3 if sidro == "start" else -3 if sidro == "end" else 0
        d.append(_besedilo(tx + dx, ty + dy, s, "s-txt-b", sidro, 11))
    return "".join(d)


def svg(w, h, oznaka, telo):
    return _svg(w, h, oznaka, telo)


def preglednica(glava, vrstice):
    th = "".join(f"<th>{c}</th>" for c in glava)
    tr = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<table class="mn-tabela"><tr>{th}</tr>{tr}</table>'


# ------------------------------------------------------------------ posamezni organizmi
def paramecij(oznake=True):
    """Paramecij (vrtinčar) z označenimi deli."""
    d = ['<path class="s-lik" d="M40,120 C40,70 120,45 220,52 C300,58 335,90 330,125 C325,165 270,185 190,182 C100,180 40,165 40,120 z"/>']
    # migetalke
    import math as _m
    for k in range(64):
        t = k / 64 * 2 * _m.pi
        x = 187 + 148 * _m.cos(t) * 0.99
        y = 118 + 66 * _m.sin(t) * 0.98
        nx, ny = _m.cos(t), _m.sin(t) * 2.2
        n = (nx * nx + ny * ny) ** 0.5
        d.append(f'<line class="s-crta" style="stroke-width:0.8" x1="{x:.1f}" y1="{y:.1f}" x2="{x + 7 * nx / n:.1f}" y2="{y + 7 * ny / n:.1f}"/>')
    d.append('<ellipse class="s-pou1" cx="190" cy="112" rx="34" ry="20"/>')            # makronukleus
    d.append('<ellipse class="s-pou6" cx="228" cy="100" rx="7" ry="5"/>')               # mikronukleus
    d.append('<path class="s-crta" d="M160,175 Q175,140 200,135"/>')                    # celična usta (žleb)
    for cx, cy in ((95, 112), (285, 118)):                                               # krčljivi vakuoli
        d.append(f'<circle class="s-voda" cx="{cx}" cy="{cy}" r="11"/>')
        for a in range(0, 360, 45):
            r = _m.radians(a)
            d.append(f'<line class="s-crta" style="stroke-width:0.8;stroke:#3B82F6" x1="{cx + 11 * _m.cos(r):.1f}" y1="{cy + 11 * _m.sin(r):.1f}" x2="{cx + 22 * _m.cos(r):.1f}" y2="{cy + 22 * _m.sin(r):.1f}"/>')
    for cx, cy, r in ((140, 145, 9), (250, 150, 7), (135, 85, 7)):                       # prebavne vakuole
        d.append(f'<circle class="s-pou3" cx="{cx}" cy="{cy}" r="{r}"/>')
    if oznake:
        d.append(oznacbe([(95, 112, 60, 20, "krčljiva vakuola"), (190, 112, 190, 20, "makronukleus"),
                          (228, 100, 300, 30, "mikronukleus"), (140, 145, 90, 215, "prebavna vakuola"),
                          (180, 140, 210, 215, "celična usta"), (330, 128, 350, 190, "migetalke")]))
    return _svg(520, 230, "Paramecij", '<g transform="translate(60,0)">' + "".join(d) + "</g>")
