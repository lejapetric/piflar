# Pomožne funkcije za vadbene pole matematike (starejši roki splošne mature).
import math, os, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "poklicna"))
from pole_mat import graf, st, MODRA, RDECA  # noqa: E402,F401


def U(a, b):
    """Ulomek v rokopisu."""
    return f'<span class="ul"><span>{a}</span><span>{b}</span></span>'


def K(x, n=None):
    """Koren v rokopisu."""
    kn = f'<sup class="kn">{n}</sup>' if n else ""
    return f'<span class="koren">{kn}√<span class="pod">{x}</span></span>'


def V(x):
    return f'<span class="vek">{x}</span>'


def LIM(spodaj):
    return f'<span class="lim">lim<small>{spodaj}</small></span>'


def INT(zg, sp):
    return f'<span class="int">∫<span class="meje"><sup>{zg}</sup><sub>{sp}</sub></span></span>'


def MEJA(zg, sp):
    return f'<span class="meja">|<sup>{zg}</sup><sub>{sp}</sub></span>'


def BINOM(n, k):
    return f'<span class="binom">(<span class="ul brez"><span>{n}</span><span>{k}</span></span>)</span>'


def SISTEM(*vrstice):
    return ('<span class="sistem"><span class="zav">{</span><span class="vrst">'
            + "".join(f"<span>{v}</span>" for v in vrstice) + "</span></span>")


def rokopis(koraki):
    """koraki: (v, komentar) ali '## naslov' ali ('@slika', svg). v z '!' je končni odgovor.
    Oznake pravil doda tools/matura/dodaj-pravila.mjs iz komentarjev."""
    deli = []
    for k in koraki:
        if isinstance(k, str):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{k[2:].strip()}</div></div>')
            continue
        if k[0] == "@slika":
            deli.append(f'<div class="rk-slika">{k[1]}</div>')
            continue
        v, kom = k
        if v is None:
            deli.append(f'<div class="rk-kom rk-sam">{kom}</div>')
            continue
        if v.startswith("!"):
            v = f'<span class="rk-odg">{v[1:]}</span>'
        deli.append(f'<div class="rk-korak"><div class="rk-v">{v}</div><div class="rk-kom">{kom}</div></div>')
    return '<div class="rokopis">' + "".join(deli) + "</div>"


def tabela(glava, vrstice):
    h = "".join(f"<th>{g}</th>" for g in glava)
    b = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<table class="mn-tabela"><tr>{h}</tr>{b}</table>'


def svg(sirina, visina, vsebina, opis="Slika k nalogi"):
    return (f'<svg class="mn-graf" viewBox="0 0 {sirina} {visina}" width="{sirina}" role="img" aria-label="{opis}" '
            f'style="max-width:100%;height:auto;display:block;margin:0.6rem 0">{vsebina}</svg>')


def mreza(xr, yr, risbe="", sirina=320, visina=None, korak=1, oznake=True):
    """Prazna mreža s koordinatnima osema za risanje (enota = korak)."""
    x0, x1 = xr
    y0, y1 = yr
    if visina is None:
        visina = round(sirina * (y1 - y0) / (x1 - x0))
    L, T, W, H = 10, 10, sirina - 20, visina - 20
    X = lambda x: L + (x - x0) / (x1 - x0) * W
    Y = lambda y: T + (y1 - y) / (y1 - y0) * H
    d = []
    i = math.ceil(x0)
    while i <= x1:
        d.append(f'<line x1="{X(i):.1f}" y1="{T}" x2="{X(i):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.12"/>')
        i += korak
    j = math.ceil(y0)
    while j <= y1:
        d.append(f'<line x1="{L}" y1="{Y(j):.1f}" x2="{L + W}" y2="{Y(j):.1f}" stroke="currentColor" stroke-opacity="0.12"/>')
        j += korak
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
    pts = []
    for i in range(n + 1):
        x = a + (b - a) * i / n
        pts.append(f"{X(x):.1f},{Y(f(x)):.1f}")
    return f'<polyline points="{" ".join(pts)}" fill="none" stroke="{barva}" stroke-width="2"/>'


def parametricna(X, Y, fx, fy, t0, t1, barva=MODRA, n=300):
    pts = []
    for i in range(n + 1):
        t = t0 + (t1 - t0) * i / n
        pts.append(f"{X(fx(t)):.1f},{Y(fy(t)):.1f}")
    return f'<polyline points="{" ".join(pts)}" fill="none" stroke="{barva}" stroke-width="2"/>'


def tocka(X, Y, x, y, napis="", dx=5, dy=-5):
    t = f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="3" fill="currentColor"/>'
    if napis:
        t += f'<text x="{X(x) + dx:.1f}" y="{Y(y) + dy:.1f}" font-size="11" fill="currentColor">{napis}</text>'
    return t


def osi_merilo(xr, yr, xk, yk, xoz, yoz, sirina=420, visina=260, risbe=""):
    """Koordinatni sistem z oznakami na oseh (npr. čas in višina) in mrežo na vsak xk / yk."""
    x0, x1 = xr
    y0, y1 = yr
    L, T, W, H = 36, 12, sirina - 56, visina - 34
    X = lambda x: L + (x - x0) / (x1 - x0) * W
    Y = lambda y: T + (y1 - y) / (y1 - y0) * H
    d = []
    n = round((x1 - x0) / xk)
    for i in range(n + 1):
        x = x0 + i * xk
        d.append(f'<line x1="{X(x):.1f}" y1="{T}" x2="{X(x):.1f}" y2="{T + H}" stroke="currentColor" stroke-opacity="0.12"/>')
        if i:
            d.append(f'<text x="{X(x):.1f}" y="{T + H + 13}" font-size="9" text-anchor="middle" fill="currentColor">{st(x)}</text>')
    m = round((y1 - y0) / yk)
    for j in range(m + 1):
        y = y0 + j * yk
        d.append(f'<line x1="{L}" y1="{Y(y):.1f}" x2="{L + W}" y2="{Y(y):.1f}" stroke="currentColor" stroke-opacity="0.12"/>')
        if j:
            d.append(f'<text x="{L - 4}" y="{Y(y) + 3:.1f}" font-size="9" text-anchor="end" fill="currentColor">{st(y)}</text>')
    d.append(f'<line x1="{L}" y1="{Y(y0):.1f}" x2="{L + W + 8}" y2="{Y(y0):.1f}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<line x1="{L}" y1="{T + H}" x2="{L}" y2="{T - 4}" stroke="currentColor" stroke-opacity="0.75"/>')
    d.append(f'<text x="{L + W + 10}" y="{Y(y0) + 4:.1f}" font-size="12" fill="currentColor">{xoz}</text>')
    d.append(f'<text x="{L + 5}" y="{T + 2}" font-size="12" fill="currentColor">{yoz}</text>')
    d.append(risbe(X, Y) if callable(risbe) else risbe)
    return svg(sirina, visina, "".join(d))


def naloga(id, poglavje, tocke, besedilo, rezultat, koraki, snov=None):
    n = {"id": str(id), "poglavje": poglavje, "tocke": tocke, "besedilo": besedilo,
         "rezultat": rezultat, "razlaga": rokopis(koraki)}
    if snov:
        n["snov"] = snov
    return n
