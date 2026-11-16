# Skupni pripomočki za vadbene pole poklicne mature iz matematike po uradnih polah RIC.
# Rokopis, graf in oznake pravil so iz tools/poklicna/pole_mat.py, da so razlage enake kot pri drugih polah.
import importlib.util, math, os

_pot = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "pole_mat.py")
_spec = importlib.util.spec_from_file_location("pole_mat", _pot)
pm = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(pm)

rokopis, graf, st, MODRA, RDECA = pm.rokopis, pm.graf, pm.st, pm.MODRA, pm.RDECA


def U(a, b):
    """Ulomek v rokopisu."""
    return f'<span class="ul"><span>{a}</span><span>{b}</span></span>'


def K(x, n=None):
    """Koren v rokopisu."""
    kn = f'<sup class="kn">{n}</sup>' if n else ""
    return f'<span class="koren">{kn}√<span class="pod">{x}</span></span>'


def naloga(id, poglavje, tocke, besedilo, rezultat, koraki):
    return {"id": id, "poglavje": poglavje, "tocke": tocke, "besedilo": besedilo, "rezultat": rezultat, "razlaga": rokopis(koraki)}


def svg(sirina, visina, vsebina, opis="Slika k nalogi"):
    return (f'<svg class="mn-graf" viewBox="0 0 {sirina} {visina}" width="{sirina}" role="img" aria-label="{opis}" '
            f'style="max-width:100%;height:auto;display:block;margin:0.4rem 0">{vsebina}</svg>')


def napis(x, y, s, vel=13, barva="currentColor", sidro="middle"):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{vel}" text-anchor="{sidro}" fill="{barva}">{s}</text>'


def mreza(xr, yr, risbe="", sirina=300, visina=None, oznake=True):
    """Prazna mreža s koordinatnima osema; risbe(X, Y) doda vsebino."""
    x0, x1 = xr
    y0, y1 = yr
    if visina is None:
        visina = round(sirina * (y1 - y0) / (x1 - x0))
    L, T, W, H = 10, 10, sirina - 20, visina - 20
    X = lambda x: L + (x - x0) / (x1 - x0) * W
    Y = lambda y: T + (y1 - y) / (y1 - y0) * H
    d = []
    for i in range(math.ceil(x0), math.floor(x1) + 1):
        d.append(f'<line x1="{X(i):.1f}" y1="{T}" x2="{X(i):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.12"/>')
    for j in range(math.ceil(y0), math.floor(y1) + 1):
        d.append(f'<line x1="{L}" y1="{Y(j):.1f}" x2="{L + W}" y2="{Y(j):.1f}" stroke="currentColor" stroke-opacity="0.12"/>')
    d.append(f'<line x1="{L}" y1="{Y(0):.1f}" x2="{L + W}" y2="{Y(0):.1f}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<line x1="{X(0):.1f}" y1="{T}" x2="{X(0):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<text x="{L + W - 2}" y="{Y(0) - 5:.1f}" font-size="12" text-anchor="end" fill="currentColor">x</text>')
    d.append(f'<text x="{X(0) + 5:.1f}" y="{T + 10}" font-size="12" fill="currentColor">y</text>')
    if oznake:
        d.append(f'<text x="{X(1):.1f}" y="{Y(0) + 13:.1f}" font-size="10" text-anchor="middle" fill="currentColor">1</text>')
        d.append(f'<text x="{X(0) - 4:.1f}" y="{Y(1) + 3.5:.1f}" font-size="10" text-anchor="end" fill="currentColor">1</text>')
    d.append(risbe(X, Y) if callable(risbe) else risbe)
    return svg(sirina, visina, "".join(d))


def krivulja(X, Y, f, a, b, barva=MODRA, n=300):
    pts = " ".join(f"{X(a + (b - a) * i / n):.1f},{Y(f(a + (b - a) * i / n)):.1f}" for i in range(n + 1))
    return f'<polyline points="{pts}" fill="none" stroke="{barva}" stroke-width="2"/>'


def tocka(X, Y, x, y, ime="", dx=5, dy=-5):
    t = f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="3" fill="currentColor"/>'
    if ime:
        t += f'<text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="11" fill="currentColor">{ime}</text>'
    return t


def tabela(glava, vrstice):
    h = "".join(f"<th>{g}</th>" for g in glava)
    b = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<table class="mn-tabela"><tr>{h}</tr>{b}</table>'
