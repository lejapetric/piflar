# python3 tools/matura/slovenscina/gradi.py
# Iz virov v tools/matura/slovenscina/pole/*.py zgradi api/data/matura-slovenscina.json.
#
# Vsak vir opiše en izpitni rok: izpitno polo 1 (šolski esej) in izpitno polo 2 (razčlemba
# izhodiščnega neumetnostnega besedila). Vir določi:
#   LETO, ROK, DATUM1, DATUM2           leto, "spomladanski"/"jesenski", datuma pol
#   ESEJI = [E(...), E(...)]            naloge izpitne pole 1 (razpravljalni in interpretativni esej)
#   PRILOGA = B(naslov, avtor, vir, [odstavki])   izhodiščno besedilo izpitne pole 2
#   POLA2 = [N(...), ...]               naloge izpitne pole 2
#
#   N([teme], uvod, [P(...), ...], priloga=False)  ena naloga; priloga=True: naloga potrebuje celo besedilo
#   P(tocke, besedilo, rezultat, [koraki])         vprašanje naloge (1.1., 1.2. …)
#   P(tocke, "", rezultat, [koraki])               naloga brez podvprašanj (vprašanje je v uvodu)
#   P(None, besedilo)                              besedilo med vprašanji
#   E(vrsta, [poglavja], naslov, navodilo, [koraki], rezultat, delo=…, oznaka="1")
#                                                  esej: vrsta "razpravljalni" ali "interpretativni"
#
# Korak je (rokopis, komentar). Rokopis z "!" na začetku je končni odgovor (podčrtan), rokopis
# None pomeni samo komentar, "## …" je vmesni naslov.
#
# Oznake v besedilu: **krepko**, __podčrtano__, //ležeče//, [[uokvirjeno]], ^{…} (nadpisano),
# _{…} (podpisano). Nova vrstica je prelom vrstice, prazna vrstica nov odstavek.
import glob, html, json, os, re, runpy

KOREN = os.path.dirname(os.path.abspath(__file__))
IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-slovenscina.json")

# Podpoglavja snovi (sidrišča #sklop-N na straneh s snovjo); ključi so tudi "teme" v snovi.json
TEME = {
    "vloge_jezika": ("jezik_sporazumevanje", 2, "Vloge jezika in jezikovna zmožnost"),
    "sporazumevanje": ("jezik_sporazumevanje", 3, "Sporazumevalni dejavniki in vrste sporazumevanja"),
    "nacela": ("jezik_sporazumevanje", 4, "Faze in načela uspešnega sporočanja"),
    "knjizni": ("jezikovne_zvrsti", 1, "Knjižni jezik: zborni in pogovorni"),
    "neknjizni": ("jezikovne_zvrsti", 2, "Neknjižni jezik in narečja"),
    "interesne": ("jezikovne_zvrsti", 3, "Interesne govorice"),
    "funkcijske": ("jezikovne_zvrsti", 4, "Funkcijske in druge zvrsti"),
    "zgodovina_jezika": ("jezikovne_zvrsti", 5, "Nastanek in razvoj knjižnega jezika"),
    "glasovi": ("glasoslovje_pravorecje", 1, "Glasovi in črke, samoglasniki"),
    "soglasniki": ("glasoslovje_pravorecje", 2, "Soglasniki"),
    "premene": ("glasoslovje_pravorecje", 3, "Glasovne premene in knjižna izreka"),
    "naglas": ("glasoslovje_pravorecje", 4, "Naglas in stavčna fonetika"),
    "zacetnica": ("pravopis", 1, "Velika in mala začetnica"),
    "skupaj_narazen": ("pravopis", 2, "Pisanje skupaj, narazen in z vezajem"),
    "prevzete": ("pravopis", 3, "Prevzete besede in imena"),
    "krajsave": ("pravopis", 4, "Krajšave, števila in deljenje besed"),
    "locila": ("pravopis", 5, "Ločila"),
    "napake": ("pravopis", 1, "Popravljanje jezikovnih napak"),
    "pomen": ("besedje", 1, "Beseda in pomen"),
    "pomenska_razmerja": ("besedje", 2, "Pomenska razmerja med besedami"),
    "slovarji": ("besedje", 3, "Zaznamovane besede, prevzete besede in slovarji"),
    "frazemi": ("besedje", 4, "Frazemi"),
    "besedotvorje": ("besedje", 5, "Besedotvorje"),
    "besedne_vrste": ("oblikoslovje", 1, "Pregled besednih vrst"),
    "samostalnik": ("oblikoslovje", 2, "Samostalnik"),
    "pridevnik": ("oblikoslovje", 3, "Pridevnik, zaimek, števnik"),
    "glagol": ("oblikoslovje", 4, "Glagol"),
    "nepregibne": ("oblikoslovje", 5, "Nepregibne besedne vrste"),
    "poved": ("skladnja", 1, "Stavek, poved in vrste povedi"),
    "stavcni_cleni": ("skladnja", 2, "Stavčni členi"),
    "priredje": ("skladnja", 3, "Priredno zložena poved"),
    "podredje": ("skladnja", 4, "Podredno zložena poved in vrste odvisnikov"),
    "pretvorbe": ("skladnja", 5, "Pretvorbe povedi in besedni red"),
    "povezanost": ("besedilo", 1, "Besedilna merila in povezanost"),
    "uradna": ("besedilo", 2, "Uradna besedila"),
    "publicisticna": ("besedilo", 3, "Publicistična besedila"),
    "strokovna": ("besedilo", 4, "Strokovna besedila"),
    "razclemba": ("besedilo", 5, "Razčlemba izhodiščnega besedila"),
    "odprta": ("besedilo", 5, "Odprta (tvorbena) naloga"),
    "razpravljalni": ("esej", 2, "Razpravljalni esej"),
    "interpretativni": ("esej", 3, "Razlagalni/interpretativni esej"),
}

SNOV_URL = "/views/slovenscina/snov/{p}/{p}_razlaga.html#sklop-{s}"
ESEJ_URL = "/views/slovenscina/snov/esej/esej_razlaga.html#dela-{leto}"


# ---------------------------------------------------------------- besedilo
def oblikuj(s):
    """Preprosta oznaka → HTML (najprej ubežimo HTML)."""
    if s is None:
        return ""
    d = html.escape(str(s), quote=False)
    d = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", d)
    d = re.sub(r"__(.+?)__", r"<u>\1</u>", d)
    d = re.sub(r"(?<!:)//(.+?)//", r"<em>\1</em>", d)
    d = re.sub(r"\[\[(.+?)\]\]", r'<span class="sl-okvir">\1</span>', d)
    d = re.sub(r"\^\{(.+?)\}", r"<sup>\1</sup>", d)
    d = re.sub(r"_\{(.+?)\}", r"<sub>\1</sub>", d)
    return d.replace("\n", "<br>")


def odstavki(s):
    if s.lstrip().startswith("<"):  # že izdelan HTML (citat, slovar, tabela …)
        return s
    return "".join(f"<p>{oblikuj(o)}</p>" for o in s.split("\n\n") if o.strip())


def tabela(glava, vrstice):
    th = "".join(f"<th>{oblikuj(g)}</th>" for g in glava) if glava else ""
    tr = "".join("<tr>" + "".join(f"<td>{oblikuj(c)}</td>" for c in v) + "</tr>" for v in vrstice)
    return f'<div class="mn-preglednica-ovoj"><table class="mn-tabela">{"<tr>" + th + "</tr>" if th else ""}{tr}</table></div>'


def izbire(*moznosti, crke="ABCČDEFGH"):
    li = "".join(f'<li><span class="izbira-crka">{c}</span><span>{oblikuj(t)}</span></li>' for c, t in zip(crke, moznosti))
    return f'<ol class="pola-izbire">{li}</ol>'


def slovar(s):
    """Slovarski sestavek (geslo v krepkem na začetku)."""
    return f'<blockquote class="sl-slovar">{oblikuj(s)}</blockquote>'


def citat(s):
    return f'<blockquote class="sl-citat">{oblikuj(s)}</blockquote>'


def R(surovo):
    return surovo


# ---------------------------------------------------------------- naloge
def tocke(t):
    return "1 točka" if t == 1 else "2 točki" if t == 2 else f"{t} točke" if t <= 4 else f"{t} točk"


def P(tocke_, besedilo="", rezultat=None, koraki=None, slika=None):
    if isinstance(rezultat, list):
        rezultat, koraki = None, rezultat
    return {"t": tocke_, "b": besedilo, "r": rezultat, "k": koraki or [], "s": slika}


def N(teme, uvod, deli, slika=None, priloga=False):
    for t in teme:
        if t not in TEME:
            raise KeyError(f"neznana tema {t!r}")
    return {"teme": teme, "uvod": uvod, "deli": deli, "slika": slika, "priloga": priloga}


def B(naslov, avtor, vir, odstavki_, podnaslov=""):
    return {"naslov": naslov, "avtor": avtor, "vir": vir, "odstavki": odstavki_, "podnaslov": podnaslov}


def E(vrsta, poglavja, naslov, navodilo, koraki, rezultat, delo="", oznaka=None, besede=600):
    assert vrsta in ("razpravljalni", "interpretativni"), vrsta
    return {"vrsta": vrsta, "poglavja": poglavja, "naslov": naslov, "navodilo": navodilo, "koraki": koraki,
            "rezultat": rezultat, "delo": delo, "oznaka": oznaka, "besede": besede}


def rokopis(koraki):
    deli = []
    for k in koraki:
        if isinstance(k, str) and k.startswith("##"):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oblikuj(k[2:].strip())}</div></div>')
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
    if d["r"] is not None:
        return oblikuj(d["r"])
    odg = [k[0][1:] for k in d["k"] if isinstance(k, tuple) and isinstance(k[0], str) and k[0].startswith("!")]
    assert odg, f"{oznaka}: ni rezultata"
    return "; ".join(oblikuj(o) for o in odg)


def naloga(st, n):
    besedilo = []
    if n["uvod"]:
        besedilo.append(odstavki(n["uvod"]))
    if n["slika"]:
        besedilo.append(n["slika"])
    rezultati, koraki, skupaj, k = [], [], 0, 0
    vprasanja = [d for d in n["deli"] if d["t"] is not None]
    for d in n["deli"]:
        if d["t"] is None:
            if d["b"]:
                besedilo.append(odstavki(d["b"]))
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
    izid = {
        "poglavje": poglavja,
        "tema": n["teme"],
        "snov": SNOV_URL.format(p=prva[0], s=prva[1]),
        "snovNaslov": prva[2],
        "tocke": skupaj,
        "besedilo": "".join(besedilo),
        "rezultat": "<br>".join(rezultati),
        "razlaga": '<div class="rokopis">' + "".join(koraki) + "</div>",
    }
    if n["priloga"]:
        izid["priloga"] = True
    return izid


def esej(e, leto):
    ime = "RAZPRAVLJALNI ESEJ" if e["vrsta"] == "razpravljalni" else "RAZLAGALNI/INTERPRETATIVNI ESEJ"
    besedilo = f'<p class="pola-naslov-naloge"><strong>{ime}</strong></p>'
    besedilo += f'<p><strong>{oblikuj(e["naslov"])}</strong></p>'
    if e["delo"]:
        besedilo += f'<p class="sl-delo">{oblikuj(e["delo"])}</p>'
    besedilo += odstavki(e["navodilo"])
    besedilo += f'<p>Pazite na jezik, zgradbo in slog svojega pisanja.<br>Esej naj obsega najmanj {e["besede"]} besed.</p>'
    return {
        "poglavje": ["esej", *e["poglavja"]],
        "tema": [e["vrsta"]],
        "snov": ESEJ_URL.format(leto=leto),
        "snovNaslov": f"Esej: maturitetna dela {leto}",
        "tocke": 50,
        "tip": "esej",
        "besedilo": besedilo,
        "rezultat": oblikuj(e["rezultat"]),
        "razlaga": '<div class="rokopis">' + "".join(rokopis(e["koraki"])) + "</div>",
    }


def priloga(b, pola_oznaka):
    deli = [f'<p class="sl-priloga-oznaka">Priloga k izpitni poli 2 ({pola_oznaka})</p>',
            f'<h3 class="sl-priloga-naslov">{oblikuj(b["naslov"])}</h3>']
    if b["podnaslov"]:
        deli.append(f'<p class="sl-priloga-podnaslov">{oblikuj(b["podnaslov"])}</p>')
    deli.append(f'<p class="sl-priloga-avtor">{oblikuj(b["avtor"])}</p>')
    for i, o in enumerate(b["odstavki"], 1):
        deli.append(f'<p class="sl-odstavek"><span class="sl-odst-st">{i}</span>{oblikuj(o)}</p>')
    deli.append(f'<p class="sl-priloga-vir">{oblikuj(b["vir"])}</p>')
    return '<div class="sl-priloga">' + "".join(deli) + "</div>"


VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), {nase} pa so naši. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.")
GRADNIKI = {"N": N, "P": P, "B": B, "E": E, "tabela": tabela, "izbire": izbire, "slovar": slovar, "citat": citat, "R": R}


def zgradi(pot):
    ns = runpy.run_path(pot, init_globals=GRADNIKI)
    leto, rok = ns["LETO"], ns["ROK"]
    eseji, pola2, tock2 = ns["ESEJI"], ns["POLA2"], ns.get("TOCKE2", 90)
    besede = 700 if leto <= 2020 else 600
    opis_roka = f"{rok} rok {leto}"
    skupno = {"predmet": "slovenscina", "raven": "enotna", "leto": leto, "rok": rok, "izvedba": 1, "pdf": None}
    oznaka = f"{leto % 100}{1 if rok == 'spomladanski' else 2}"
    # pola 1: eseji
    naloge1 = []
    razp = [e for e in eseji if e["vrsta"] == "razpravljalni"]
    for e in eseji:
        e["besede"] = besede
        if e["vrsta"] == "razpravljalni":
            st = "1" if len(razp) == 1 else f"1{'ab'[razp.index(e)]}"
        else:
            st = "2"
        naloge1.append({"id": st, **esej(e, leto)})
    assert any(n["id"] == "2" for n in naloge1), f"{pot}: ni interpretativnega eseja"
    izbira = "dveh razpravljalnih tem in interpretativnega eseja" if len(razp) > 1 else "razpravljalnega in interpretativnega eseja"
    pole = [{
        "id": f"slovenscina-{leto}-{rok}-1", **skupno, "datum": ns["DATUM1"], "stevilka": 1,
        "naslov": f"Slovenščina, {opis_roka}, izpitna pola 1: šolski esej (vadbena pola Piflar.si)",
        "navodilo": f"120 minut, šolski esej (najmanj {besede} besed), 50 točk. Izberete enega od {izbira}.",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 1", nase="naslovi in navodila esejev ter rešitve")
               + " Izhodiščnih odlomkov ne objavljamo; poiščeš jih v svoji izdaji dela.",
        "naloge": naloge1,
    }]
    # pola 2: razčlemba
    izdelane = [{"id": str(i + 1), **naloga(i + 1, n)} for i, n in enumerate(pola2)]
    vsota = sum(n["tocke"] for n in izdelane)
    assert vsota == tock2, f"{pot}: pola 2 ima {vsota} točk namesto {tock2}"
    pole.append({
        "id": f"slovenscina-{leto}-{rok}-2", **skupno, "datum": ns["DATUM2"], "stevilka": 2,
        "naslov": f"Slovenščina, {opis_roka}, izpitna pola 2: razčlemba izhodiščnega besedila (vadbena pola Piflar.si)",
        "navodilo": f"90 minut, {len(izdelane)} nalog, {tock2} točk.",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 2", nase="izhodiščno besedilo, naloge in rešitve"),
        "priloga": priloga(ns["PRILOGA"], f"vadbena pola {oznaka}"),
        "naloge": izdelane,
    })
    return pole


ROKI = {"spomladanski": 0, "jesenski": 1}

if __name__ == "__main__":
    viri = sorted(glob.glob(os.path.join(KOREN, "pole", "*.py")))
    pole = []
    for v in viri:
        pole += zgradi(v)
    pole.sort(key=lambda p: (-p["leto"], ROKI[p["rok"]], p["stevilka"]))
    with open(IZHOD, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog → {os.path.relpath(IZHOD)}")
