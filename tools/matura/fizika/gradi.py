# python3 tools/matura/fizika/gradi.py
# Iz virov v tools/matura/fizika/pole/*.py zgradi api/data/matura-fizika.json.
#
# Vsak vir opiše en izpitni dan (pola 1 in pola 2) s funkcijami spodaj:
#   M(poglavje, vprasanje, [A, B, C, D], "C", [koraki])          naloga izbirnega tipa (pola 1)
#   S(naslov, [poglavja], uvod, [P(...), ...])                    strukturirana naloga (pola 2)
#   P(tocke, besedilo, rezultat, [koraki])                         vprašanje strukturirane naloge
#   P(None, besedilo)                                              besedilo med vprašanji
# Korak je (rokopis, komentar) ali (rokopis, komentar, "pravilo"). Rokopis z "!" na začetku je
# končni odgovor (podčrtan), rokopis None pomeni samo komentar.
#
# Oznake v besedilu: ^2, ^-1, ^{…} (nadpisano), _0, _{…} (podpisano), [[števec|imenovalec]] (ulomek).
import glob, html, json, os, random, re, runpy, sys

KOREN = os.path.dirname(os.path.abspath(__file__))
IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-fizika.json")

# Pravila in ali so v prilogi s konstantami in enačbami, ki je priložena poli
PRAVILA = {
    # ---------- v prilogi ----------
    "s=vt": ("Enakomerno gibanje s = vt", True),
    "pospeseno": ("Enakomerno pospešeno gibanje v = v_0 + at, x = v_0t + at^2/2", True),
    "v2": ("Zveza v^2 = v_0^2 + 2ax", True),
    "krozenje": ("Kroženje v = 2πr/t_0, a_r = v^2/r", True),
    "frekvenca": ("Frekvenca ν = 1/t_0", True),
    "grav": ("Gravitacijski zakon F = Gm_1m_2/r^2", True),
    "g(r)": ("Težni pospešek na razdalji r: g(r) = g r_z^2/r^2", True),
    "kepler": ("3. Keplerjev zakon r^3/t_0^2 = konst.", True),
    "F=kx": ("Prožnostna sila F = kx", True),
    "trenje": ("Sila trenja F = k_tF_n", True),
    "vzgon": ("Vzgon F = ρgV", True),
    "F=ma": ("2. Newtonov zakon F = ma", True),
    "G=mv": ("Gibalna količina G = mv", True),
    "sunek": ("Izrek o gibalni količini FΔt = ΔG", True),
    "navor": ("Navor M = rF sin α", True),
    "tlak": ("Tlak p = F/S", True),
    "hidro": ("Hidrostatični tlak p = ρgh", True),
    "delo": ("Delo A = Fs cos φ", True),
    "Wk": ("Kinetična energija W_k = mv^2/2", True),
    "Wp": ("Potencialna energija W_p = mgh", True),
    "Wpr": ("Prožnostna energija W_pr = kx^2/2", True),
    "moc": ("Moč P = A/t", True),
    "izrek": ("Izrek o mehanski energiji A = ΔW_k + ΔW_p + ΔW_pr", True),
    "A=-pV": ("Delo plina A = −pΔV", True),
    "I=e/t": ("Električni tok I = e/t", True),
    "coulomb": ("Coulombov zakon F = e_1e_2/(4πε_0r^2)", True),
    "F=eE": ("Električna sila F = eE", True),
    "U=Es": ("Napetost v homogenem polju U = Es", True),
    "plosca": ("Polje nabite plošče E = e/(2ε_0S)", True),
    "kond": ("Kondenzator e = CU, C = ε_0S/l", True),
    "We": ("Energija kondenzatorja W_e = CU^2/2", True),
    "ohm": ("Ohmov zakon U = RI", True),
    "upor": ("Upor žice R = ζl/S", True),
    "ef": ("Efektivna vrednost U_ef = U_0/√2", True),
    "P=UI": ("Električna moč P = UI", True),
    "IlB": ("Magnetna sila na vodnik F = IlB sin α", True),
    "evB": ("Magnetna sila na delec F = evB", True),
    "Bzica": ("Polje ravnega vodnika B = μ_0I/(2πr)", True),
    "Btuljava": ("Polje dolge tuljave B = μ_0NI/l", True),
    "Mtuljava": ("Navor na tuljavo M = NISB sin α", True),
    "fluks": ("Magnetni pretok Φ = BS cos α", True),
    "lvB": ("Inducirana napetost U_i = lvB", True),
    "generator": ("Napetost generatorja U_i = ωSB sin ωt", True),
    "faraday": ("Indukcijski zakon U_i = −ΔΦ/Δt", True),
    "Wm": ("Energija tuljave W_m = LI^2/2", True),
    "trafo": ("Transformator U_1/U_2 = N_1/N_2", True),
    "nihanje": ("Harmonično nihanje x = x_0 sin ωt, v_0 = ωx_0, a_0 = ω^2x_0", True),
    "vzmnihalo": ("Nihajni čas vzmetnega nihala t_0 = 2π√(m/k)", True),
    "nitnihalo": ("Nihajni čas nitnega nihala t_0 = 2π√(l/g)", True),
    "LC": ("Nihajni krog t_0 = 2π√(LC)", True),
    "c=λν": ("Valovanje c = λν", True),
    "mrezica": ("Uklonska mrežica d sin α = Nλ", True),
    "j=P/S": ("Gostota energijskega toka j = P/(4πr^2)", True),
    "doppler": ("Dopplerjev pojav ν = ν_0/(1 ∓ v/c)", True),
    "vrv": ("Hitrost valovanja na vrvi c = √(Fl/m)", True),
    "lom": ("Lomni zakon sin α/sin β = c_1/c_2 = n_2/n_1", True),
    "n=c/c": ("Lomni količnik n = c_0/c", True),
    "leca": ("Enačba leče 1/f = 1/a + 1/b", True),
    "povecava": ("Povečava s/p = b/a", True),
    "mol": ("Množina snovi n = m/M = N/N_A", True),
    "pV=nRT": ("Plinska enačba pV = nRT", True),
    "raztezanje": ("Temperaturno raztezanje Δl = αlΔT, ΔV = βVΔT", True),
    "1zakon": ("1. zakon termodinamike A + Q = ΔW", True),
    "Q=cmT": ("Toplota Q = cmΔT", True),
    "Q=qm": ("Talilna in izparilna toplota Q = qm", True),
    "3kT/2": ("Povprečna kinetična energija molekul W_k = 3kT/2", True),
    "P=Q/t": ("Toplotni tok P = Q/t", True),
    "prevajanje": ("Prevajanje toplote P = λSΔT/l", True),
    "stefan": ("Stefanov zakon j = σT^4", True),
    "foton": ("Energija fotona W_f = hν", True),
    "fotoefekt": ("Fotoefekt W_f = A_i + W_k", True),
    "prehod": ("Prehod med stanji W_f = W_n − W_m", True),
    "mc2": ("Energija in masa ΔW = Δmc^2", True),
    "razpad": ("Razpadni zakon N = N_0 · 2^{−t/t_{1/2}}", True),
    "aktivnost": ("Aktivnost A = λN, λ = ln 2/t_{1/2}", True),
    # ---------- niso v prilogi ----------
    "teza": ("Teža F_g = mg", False),
    "povprecna": ("Povprečna hitrost: celotna pot / celoten čas", False),
    "a=dv/dt": ("Pospešek a = Δv/Δt", False),
    "met": ("Vodoravni in navpični met (gibanji sta neodvisni)", False),
    "newton1": ("1. Newtonov zakon (ravnovesje sil)", False),
    "newton3": ("3. Newtonov zakon (zakon o vzajemnem učinku)", False),
    "razstavljanje": ("Razstavljanje sile na komponente", False),
    "ravnovesje_navorov": ("Ravnovesje navorov", False),
    "ohranitevG": ("Ohranitev gibalne količine", False),
    "ohranitevW": ("Ohranitev mehanske energije", False),
    "gostota": ("Gostota ρ = m/V", False),
    "vezave": ("Zaporedna in vzporedna vezava upornikov", False),
    "vezaveC": ("Vezave kondenzatorjev", False),
    "enote": ("Pretvarjanje enot in predpone", False),
    "napaka": ("Absolutna in relativna napaka", False),
    "graf": ("Smerni koeficient premice na grafu", False),
    "desna": ("Pravilo desne roke", False),
    "lenz": ("Lenzovo pravilo", False),
    "odboj": ("Odbojni zakon", False),
    "mejni": ("Popolni odboj in mejni kot", False),
    "wien": ("Wienov zakon λ_max T = konst.", False),
    "hubble": ("Hubblov zakon v = H_0r", False),
    "jedro": ("Zgradba jedra: A = Z + N", False),
    "ohranitev_nukleonov": ("Ohranitev naboja in števila nukleonov pri jedrskih reakcijah", False),
    "ravnovesje_T": ("Toplotno ravnovesje: oddana toplota = prejeta toplota", False),
    "eV": ("Elektronvolt 1 eV = 1,6 · 10^-19 J", False),
    "vodik": ("Energijska stanja vodika W_n = −13,6 eV/n^2", False),
    "debroglie": ("De Brogliejeva valovna dolžina λ = h/G", False),
    "svetlobno_leto": ("Svetlobno leto", False),
    "kalorimeter": ("Mešanje snovi z različnima temperaturama", False),
    "superpozicija": ("Seštevanje polj (vektorska vsota)", False),
    "uklon_reza": ("Interferenca na dveh režah / uklon", False),
    "stojece": ("Stoječe valovanje: l = Nλ/2", False),
    "zvok": ("Glasnost in jakost zvoka", False),
}

SUP = str.maketrans({"-": "−"})


def oblikuj(s):
    """Preprosta oznaka → HTML (nadpisano, podpisano, ulomki, minus)."""
    if s is None:
        return ""
    s = re.sub(r"\[\[(.+?)\|(.+?)\]\]", lambda m: f'<span class="ul"><span>{m[1]}</span><span>{m[2]}</span></span>', s)
    s = re.sub(r"_\{(.+?)\}", lambda m: f"<sub>{m[1]}</sub>", s)
    s = re.sub(r"\^\{(.+?)\}", lambda m: f"<sup>{m[1].translate(SUP)}</sup>", s)
    s = re.sub(r"\^(-?[0-9]+|[a-zA-Z])", lambda m: f"<sup>{m[1].translate(SUP)}</sup>", s)
    s = re.sub(r"\^([+-])", lambda m: f"<sup>{m[1].translate(SUP)}</sup>", s)
    s = re.sub(r"(?<=[A-Za-zα-ωΦΔ])_(pr|tr|max|ion|pod|ef|odd|el|vz|prej)(?![A-Za-z])", lambda m: f"<sub>{m[1]}</sub>", s)
    s = re.sub(r"(?<=[A-Za-zα-ωΦΔ>])_([0-9A-Za-z])", lambda m: f"<sub>{m[1]}</sub>", s)
    s = re.sub(r"(?<=[\s(=])-(?=[\s0-9(a-zα-ω])", "−", s)
    return s


def oznaka_pravila(kljuc):
    ime, v_prilogi = PRAVILA[kljuc]
    besedilo = "je v prilogi z enačbami" if v_prilogi else "ni v prilogi z enačbami"
    return (f'<span class="rk-pravilo"><span class="rk-pravilo-ime">{oblikuj(ime)}</span>'
            f'<span class="rk-list {"rk-da" if v_prilogi else "rk-ne"}">{besedilo}</span></span>')


def rokopis(koraki, ze=None):
    ze = set() if ze is None else ze
    deli = []
    for k in koraki:
        if isinstance(k, str) and k.startswith("##"):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oblikuj(k[2:].strip())}</div></div>')
            continue
        if k[0] == "@slika":
            deli.append(f'<div class="rk-slika">{k[1]}</div>')
            continue
        v, kom, *pravilo = k
        oznake = ""
        for p in pravilo:
            if p not in PRAVILA:
                raise KeyError(f"neznano pravilo {p!r}")
            if p not in ze:
                ze.add(p)
                oznake += oznaka_pravila(p)
        if v is None:
            deli.append(f'<div class="rk-kom rk-sam">{oblikuj(kom)}{oznake}</div>')
            continue
        odg = v.startswith("!")
        v = oblikuj(v.lstrip("!"))
        if odg:
            v = f'<span class="rk-odg">{v}</span>'
        deli.append(f'<div class="rk-korak"><div class="rk-v">{v}</div><div class="rk-kom">{oblikuj(kom)}{oznake}</div></div>')
    return deli


def tabela(glava, vrstice):
    """Preglednica: glava je seznam naslovov stolpcev, vrstice seznam seznamov."""
    th = "".join(f"<th>{oblikuj(str(g))}</th>" for g in glava)
    tr = "".join("<tr>" + "".join(f"<td>{oblikuj(str(c))}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<table class="mn-tabela"><tr>{th}</tr>{tr}</table>'


def _korak(najvec):
    """Lep korak mreže (1, 2, 2,5 ali 5 · 10^n), da 5 razdelkov pokrije vrednost."""
    import math
    surov = najvec / 5
    red = 10 ** math.floor(math.log10(surov))
    for m in (1, 2, 2.5, 5, 10):
        if m * red >= surov:
            return m * red


def _stevilo(x):
    return f"{x:.4g}".replace(".", ",")


def graf(xs, ys, xoznaka, yoznaka, premica=None, sirina=340, visina=230):
    """Točke meritev in (neobvezno) premica y = k x + n, kot bi jih narisal dijak."""
    kx = _korak(max(xs) * 1.05)
    ky = _korak(max(max(ys), (premica[0] * kx * 5 + premica[1]) if premica else 0) * 1.02)
    xmax, ymax = 5 * kx, 5 * ky
    L, B = 44, 30
    W, H = sirina - L - 14, visina - B - 12
    X = lambda x: L + x / xmax * W
    Y = lambda y: 12 + H - y / ymax * H
    deli = [f'<svg class="mn-graf" viewBox="0 0 {sirina} {visina}" width="{sirina}" role="img" aria-label="Graf" '
            'style="max-width:100%;height:auto;display:block;margin:0.4rem 0">']
    for i in range(1, 6):
        gx, gy = X(i * kx), Y(i * ky)
        deli.append(f'<line x1="{gx:.1f}" y1="12" x2="{gx:.1f}" y2="{12 + H}" stroke="currentColor" stroke-opacity="0.15"/>')
        deli.append(f'<line x1="{L}" y1="{gy:.1f}" x2="{L + W}" y2="{gy:.1f}" stroke="currentColor" stroke-opacity="0.15"/>')
        deli.append(f'<text x="{gx:.1f}" y="{12 + H + 14}" font-size="11" text-anchor="middle" fill="currentColor">{_stevilo(i * kx)}</text>')
        deli.append(f'<text x="{L - 5}" y="{gy + 4:.1f}" font-size="11" text-anchor="end" fill="currentColor">{_stevilo(i * ky)}</text>')
    deli.append(f'<text x="{L - 5}" y="{12 + H + 14}" font-size="11" text-anchor="end" fill="currentColor">0</text>')
    deli.append(f'<line x1="{L}" y1="{12 + H}" x2="{L + W}" y2="{12 + H}" stroke="currentColor"/>')
    deli.append(f'<line x1="{L}" y1="12" x2="{L}" y2="{12 + H}" stroke="currentColor"/>')
    deli.append(f'<text x="{L + W}" y="{visina - 1}" font-size="12" text-anchor="end" fill="currentColor">{xoznaka}</text>')
    deli.append(f'<text x="{L + 5}" y="10" font-size="12" fill="currentColor">{yoznaka}</text>')
    if premica:
        k, n = premica
        x2 = min(xmax, (ymax - n) / k) if k > 0 else xmax
        deli.append(f'<line x1="{X(0):.1f}" y1="{Y(n):.1f}" x2="{X(x2):.1f}" y2="{Y(k * x2 + n):.1f}" stroke="currentColor" stroke-width="1.6"/>')
    for x, y in zip(xs, ys):
        deli.append(f'<g stroke="currentColor" stroke-width="1.6"><line x1="{X(x) - 4:.1f}" y1="{Y(y) - 4:.1f}" x2="{X(x) + 4:.1f}" y2="{Y(y) + 4:.1f}"/>'
                    f'<line x1="{X(x) - 4:.1f}" y1="{Y(y) + 4:.1f}" x2="{X(x) + 4:.1f}" y2="{Y(y) - 4:.1f}"/></g>')
    deli.append("</svg>")
    return "".join(deli)


def tocke(t):
    return "1 točka" if t == 1 else "2 točki" if t == 2 else f"{t} točke" if t <= 4 else f"{t} točk"


# ---------------------------------------------------------------- naloge
def M(poglavje, vprasanje, izbire, pravilna, koraki, slika=None):
    """Naloga izbirnega tipa. Končna oblika nastane v izbirna(), ko je znano mesto pravilnega odgovora."""
    assert len(izbire) == 4 and pravilna in "ABCD", vprasanje
    return {"_M": (poglavje, vprasanje, list(izbire), pravilna, koraki, slika)}


# Izbire, ki morajo ostati na svojem mestu (zadnja izbira tipa "nobena od naštetih")
FIKSNE = re.compile(r"^(Nobena|Vse |Ni mogoče|Vseeno|Nič posebnega|Ni dovolj|Na vprašanje|Nikoli|Povsod|Vsi |Oba |Nobeden|Obe )")


def izbirna(n, cilj=None):
    """Pravilni odgovor premakne na mesto cilj (zamenja dve izbiri), da so odgovori A–D enakomerno porazdeljeni."""
    poglavje, vprasanje, izbire, pravilna, koraki, slika = n["_M"]
    i = "ABCD".index(pravilna)
    if cilj and not any(FIKSNE.match(t) for t in izbire):
        j = "ABCD".index(cilj)
        izbire[i], izbire[j] = izbire[j], izbire[i]
        i, pravilna = j, cilj
    koraki = [k for k in koraki if not (isinstance(k, tuple) and k[0] in ("!A", "!B", "!C", "!D"))]
    koraki.append((f"!{pravilna}", ""))
    li = "".join(f'<li><span class="izbira-crka">{c}</span><span>{oblikuj(t)}</span></li>' for c, t in zip("ABCD", izbire))
    besedilo = f"{oblikuj(vprasanje)}{slika or ''}<ol class=\"pola-izbire\">{li}</ol>"
    return {
        "poglavje": poglavje,
        "tocke": 1,
        "tip": "izbirna",
        "besedilo": besedilo,
        "rezultat": f"<strong>{pravilna}</strong> &nbsp; {oblikuj(izbire[i])}",
        "razlaga": '<div class="rokopis">' + "".join(rokopis(koraki)) + "</div>",
    }


def P(tocke_, besedilo, rezultat=None, koraki=None, slika=None):
    if isinstance(rezultat, list):  # P(tocke, besedilo, [koraki]): rezultat je zadnji odgovor z "!"
        rezultat, koraki = None, rezultat
    return {"t": tocke_, "b": besedilo, "r": rezultat, "k": koraki or [], "s": slika}


def S(naslov, poglavja, uvod, deli, slika=None):
    return {"naslov": naslov, "poglavja": poglavja, "uvod": uvod, "deli": deli, "slika": slika}


def strukturirana(st, s):
    besedilo = [f'<p class="pola-naslov-naloge"><strong>{s["naslov"]}</strong></p>']
    if s["uvod"]:
        besedilo.append(f"<p>{oblikuj(s['uvod'])}</p>")
    if s["slika"]:
        besedilo.append(s["slika"])
    rezultati, koraki, skupaj, n = [], [], 0, 0
    ze = set()
    for d in s["deli"]:
        if d["t"] is None:
            if d["b"]:
                besedilo.append(f"<p>{oblikuj(d['b'])}</p>")
            if d["s"]:
                besedilo.append(d["s"])
            continue
        n += 1
        skupaj += d["t"]
        oznaka = f"{st}.{n}."
        besedilo.append(f'<p class="pola-vprasanje"><strong>{oznaka}</strong> {oblikuj(d["b"])} <em>({tocke(d["t"])})</em></p>')
        if d["s"]:
            besedilo.append(d["s"])
        r = d["r"]
        if r is None:
            odg = [k[0] for k in d["k"] if isinstance(k, tuple) and isinstance(k[0], str) and k[0].startswith("!")]
            assert odg, f"naloga {st}, {oznaka}: ni rezultata"
            r = odg[-1][1:]
        rezultati.append(f"<strong>{oznaka}</strong> {oblikuj(r)}")
        koraki.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oznaka}</div></div>')
        koraki += rokopis(d["k"], ze)
    assert skupaj == 15, f"naloga {st} {s['naslov']}: {skupaj} točk"
    return {
        "poglavje": s["poglavja"],
        "tocke": skupaj,
        "besedilo": "".join(besedilo),
        "rezultat": "<br>".join(rezultati),
        "razlaga": '<div class="rokopis">' + "".join(koraki) + "</div>",
    }


VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni center (RIC), "
       "ki ima nanje vse avtorske pravice.")


def zgradi(pot):
    ns = runpy.run_path(pot, init_globals={"M": M, "S": S, "P": P, "tabela": tabela, "graf": graf})
    leto, rok, izvedba, datum = ns["LETO"], ns["ROK"], ns.get("IZVEDBA", 1), ns["DATUM"]
    pola1, pola2 = ns["POLA1"], ns["POLA2"]
    assert len(pola1) == 35, f"{pot}: pola 1 ima {len(pola1)} nalog"
    assert len(pola2) == 6, f"{pot}: pola 2 ima {len(pola2)} nalog"
    pripona = "" if izvedba == 1 else f"-{izvedba}"
    # Mesta pravilnih odgovorov: vsaka črka 8- ali 9-krat, v naključnem (a stalnem) vrstnem redu
    cilji = list("ABCD" * 9)[:35]
    random.Random(f"{leto}-{rok}-{izvedba}").shuffle(cilji)
    opis_roka = f"{rok} rok {leto}" + (f", {izvedba}. izpitni dan" if izvedba > 1 else "")
    skupno = {"predmet": "fizika", "raven": "enotna", "leto": leto, "rok": rok, "izvedba": izvedba, "datum": datum, "pdf": None}
    p1 = {
        "id": f"fizika-{leto}-{rok}{pripona}-1", **skupno, "stevilka": 1,
        "naslov": f"Fizika, {opis_roka}, izpitna pola 1 (vadbena pola Piflar.si)",
        "navodilo": "90 minut, naloge izbirnega tipa, 35 točk. Dovoljena sta računalo in priloga s konstantami in enačbami.",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 1"),
        "naloge": [{"id": str(i + 1), **izbirna(n, c)} for i, (n, c) in enumerate(zip(pola1, cilji))],
    }
    p2 = {
        "id": f"fizika-{leto}-{rok}{pripona}-2", **skupno, "stevilka": 2,
        "naslov": f"Fizika, {opis_roka}, izpitna pola 2 (vadbena pola Piflar.si)",
        "navodilo": "90 minut, strukturirane naloge, izberi in reši 3 (45 točk). Dovoljena sta računalo in priloga s konstantami in enačbami.",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 2"),
        "naloge": [{"id": str(i + 1), **strukturirana(i + 1, s)} for i, s in enumerate(pola2)],
    }
    return [p1, p2]


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
