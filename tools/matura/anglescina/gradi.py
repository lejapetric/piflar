# python3 tools/matura/anglescina/gradi.py
# Iz virov v tools/matura/anglescina/pole/*.py zgradi api/data/matura-anglescina.json.
#
# Vsak vir opiše en izpitni dan (rok in izvedbo) za obe ravni. Vir določi:
#   LETO, ROK, IZVEDBA, DATUM            leto, "spomladanski"/"jesenski", 1 ali 2, datum
#   POSNETKI = {"A": REC(...), "B": REC(...)}     besedili posnetkov (pola 2, skupni za obe ravni)
#   OR = {1: [...], 2: [...], 3: [...]}  naloge izpitnih pol osnovne ravni
#   VR = {1: [...], 2: [...], 3: [...]}  naloge izpitnih pol višje ravni
#
# Naloge (vsaka je en "Task" na poli; postavke so seznami (vprašanje, odgovor, razlaga)):
#   SA(naslov, besedilo, postavke, primer)              Short answers (1–5 besed)
#   SC(naslov, besedilo, postavke, primer)              Sentence completion (vrzel ___ v povedi)
#   MC(naslov, besedilo, postavke, primer)              Multiple choice; postavka (vprašanje, [A, B, C, D], črka, razlaga)
#   MATCH(naslov, odstavki, postavke, primeri)          Matching: odstavki {A: (naslov, besedilo)}, postavka (trditev, črka, razlaga)
#   GAPS(naslov, besedilo, deli, odgovori, primer, vrsta)  Gapped sentences/text: [N] v besedilu, deli {črka: besedilo}
#   GF(naslov, besedilo, odgovori, vrsta)               Gap fill: _N_ v besedilu (vrsta "gf", "wf" ali "vb"; pri wf/vb _N_ (WORD))
#   TF(posnetek, postavke, primer)                      poslušanje, true/false; postavka (trditev, "T"/"F", razlaga)
#   LSC(posnetek, postavke, primer)                     poslušanje, dopolnjevanje povedi
#   LNOTE(posnetek, postavke, primer)                   poslušanje, kratki odgovori
#   PIS(vrsta, besedilo, alineje, besede, koraki, rezultat, glava)   pola 3A (e-mail, report …)
#   ESEJ(naslovi, besede, koraki, rezultat)             pola 3B osnovna raven (izbira med dvema naslovoma)
#   LIT(navodilo, delo, besede, koraki, rezultat)       pola 3B višja raven (esej o književnem delu)
#
# Odgovor z več sprejemljivimi rešitvami: "which / that". Pri GF, GAPS, MATCH, MC, TF odgovor
# preveri strežnik (preverjanje "tocno"), pri kratkih odgovorih ga dijak primerja z rešitvijo.
# Korak razlage pri pisanju je (rokopis, komentar); "## …" je vmesni naslov.
# Oznake v besedilu: **krepko**, //ležeče//, __podčrtano__. Prazna vrstica je nov odstavek.
import glob, html, json, os, re, runpy

KOREN = os.path.dirname(os.path.abspath(__file__))
IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-anglescina.json")
SNOV = "/views/anglescina/snov/{p}/{p}_razlaga.html#sklop-{s}"


def oblikuj(s):
    if s is None:
        return ""
    d = html.escape(str(s), quote=False)
    d = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", d)
    d = re.sub(r"__(.+?)__", r"<u>\1</u>", d)
    d = re.sub(r"(?<!:)//(.+?)//", r"<em>\1</em>", d)
    return d.replace("\n", "<br>")


def odstavki(s, razred=""):
    r = f' class="{razred}"' if razred else ""
    return "".join(f"<p{r}>{oblikuj(o.strip())}</p>" for o in s.strip().split("\n\n") if o.strip())


def tocke(t):
    return "1 point" if t == 1 else f"{t} points"


# ---------------------------------------------------------------- gradniki nalog
def _naloga(vrsta, **k):
    return {"vrsta": vrsta, **k}


def SA(naslov, besedilo, postavke, primer):
    return _naloga("sa", naslov=naslov, besedilo=besedilo, postavke=postavke, primer=primer)


def SC(naslov, besedilo, postavke, primer):
    return _naloga("sc", naslov=naslov, besedilo=besedilo, postavke=postavke, primer=primer)


def MC(naslov, besedilo, postavke, primer):
    return _naloga("mc", naslov=naslov, besedilo=besedilo, postavke=postavke, primer=primer)


def MATCH(naslov, uvod, odstavki_, postavke, primeri):
    return _naloga("match", naslov=naslov, uvod=uvod, odstavki=odstavki_, postavke=postavke, primeri=primeri)


def GAPS(naslov, besedilo, deli, odgovori, primer, vrsta="sentence parts"):
    return _naloga("gaps", naslov=naslov, besedilo=besedilo, deli=deli, odgovori=odgovori, primer=primer, oblika=vrsta)


def GF(naslov, besedilo, odgovori, vrsta="gf", podnaslov=""):
    return _naloga(vrsta, naslov=naslov, besedilo=besedilo, odgovori=odgovori, podnaslov=podnaslov)


def REC(naslov, uvod, besedilo):
    return {"naslov": naslov, "uvod": uvod, "besedilo": besedilo}


def TF(posnetek, postavke, primer):
    return _naloga("tf", posnetek=posnetek, postavke=postavke, primer=primer)


def LSC(posnetek, postavke, primer):
    return _naloga("lsc", posnetek=posnetek, postavke=postavke, primer=primer)


def LNOTE(posnetek, postavke, primer):
    return _naloga("lnote", posnetek=posnetek, postavke=postavke, primer=primer)


def PIS(vrsta, besedilo, alineje, besede, koraki, rezultat, glava=None):
    return _naloga("pis", oblika=vrsta, besedilo=besedilo, alineje=alineje, besede=besede, koraki=koraki,
                   rezultat=rezultat, glava=glava)


def ESEJ(naslovi, besede, koraki, rezultat):
    return _naloga("esej", naslovi=naslovi, besede=besede, koraki=koraki, rezultat=rezultat)


def LIT(navodilo, delo, besede, koraki, rezultat):
    return _naloga("lit", navodilo=navodilo, delo=delo, besede=besede, koraki=koraki, rezultat=rezultat)


GRADNIKI = {k: v for k, v in globals().items() if k in
            ("SA", "SC", "MC", "MATCH", "GAPS", "GF", "REC", "TF", "LSC", "LNOTE", "PIS", "ESEJ", "LIT")}

# ---------------------------------------------------------------- izris
NASLOVI = {
    "sa": "Short answers", "sc": "Sentence completion", "mc": "Multiple choice questions",
    "match": "Matching", "gf": "Gap fill", "wf": "Gap fill (word formation)", "vb": "Gap fill (verbs)",
    "tf": "True or false", "lsc": "Sentence completion", "lnote": "Short answers",
}
SNOVI = {
    "sa": ("bralno_razumevanje", 2, "Bralno razumevanje: kratki odgovori"),
    "sc": ("bralno_razumevanje", 2, "Bralno razumevanje: dopolnjevanje povedi"),
    "mc": ("bralno_razumevanje", 3, "Bralno razumevanje: izbirni tip"),
    "match": ("bralno_razumevanje", 4, "Bralno razumevanje: povezovanje"),
    "gaps": ("bralno_razumevanje", 4, "Bralno razumevanje: vstavljanje"),
    "gf": ("cleni_predlogi_odvisniki", 1, "Členi, predlogi in odvisniki"),
    "wf": ("besedotvorje", 1, "Besedotvorje: pripone in besedne vrste"),
    "vb": ("glagolski_casi", 1, "Glagolski časi"),
    "tf": ("slusno_razumevanje", 2, "Slušno razumevanje: tipi nalog"),
    "lsc": ("slusno_razumevanje", 2, "Slušno razumevanje: tipi nalog"),
    "lnote": ("slusno_razumevanje", 2, "Slušno razumevanje: tipi nalog"),
    "pis": ("krajsi_pisni_sestavek", 1, "Krajši pisni sestavek"),
    "esej": ("daljsi_pisni_sestavek", 1, "Argumentativni esej"),
    "lit": ("daljsi_pisni_sestavek", 2, "Esej na temo iz književnosti"),
}
# Naloge, ki preverjajo tudi druga poglavja (prikaz na straneh po snovi)
DODATNA = {
    "gf": ["glagolski_casi", "modalni_glagoli"],
    "vb": ["trpnik_porocani_govor", "modalni_glagoli", "pogojniki"],
}
TOCNO = {"mc", "match", "gaps", "gf", "wf", "vb", "tf"}


def besedilo_bralno(naslov, besedilo):
    """Besedilo z naslovom (prva vrstica, ki se začne z '# ') in odstavki."""
    deli = []
    vrstice = besedilo.strip().split("\n")
    if vrstice[0].startswith("# "):
        deli.append(f'<h4 class="ang-naslov">{oblikuj(vrstice[0][2:])}</h4>')
        vrstice = vrstice[1:]
        if vrstice and vrstice[0].startswith("## "):
            deli.append(f'<p class="ang-podnaslov">{oblikuj(vrstice[0][3:])}</p>')
            vrstice = vrstice[1:]
    telo = "\n".join(vrstice)
    vir = None
    m = re.search(r"\n\(([^()\n]*Piflar[^()\n]*)\)\s*$", telo)
    if m:
        vir, telo = m.group(1), telo[: m.start()]
    html_ = odstavki(telo)
    html_ = re.sub(r"_(\d+)_ \(([A-Z][A-Z\- ]*)\)",
                   lambda x: f'<span class="ang-vrzel">({x.group(1)})</span> <span class="ang-beseda">({x.group(2)})</span>', html_)
    html_ = re.sub(r"_(\d+)_", lambda x: f'<span class="ang-vrzel">({x.group(1)})</span>', html_)
    html_ = re.sub(r"\[(\d+)\]", lambda x: f'<span class="ang-vrzel">[{x.group(1)}]</span>', html_)
    deli.append(html_)
    if vir:
        deli.append(f'<p class="ang-vir">({oblikuj(vir)})</p>')
    return '<div class="ang-besedilo">' + "".join(deli) + "</div>"


def seznam_vprasanj(postavke, primer, oblika="vprasanje"):
    li = []
    if primer:
        li.append(f'<li class="ang-primer"><span class="ang-st">0.</span><span>{oblikuj(primer[0])}'
                  f'<br><em class="ang-primer-odg">{oblikuj(primer[1])}</em></span></li>')
    for i, p in enumerate(postavke, 1):
        li.append(f'<li><span class="ang-st">{i}.</span><span>{oblikuj(p[0])}</span></li>')
    return f'<ol class="ang-vprasanja">{"".join(li)}</ol>'


def odgovori_html(odgovori):
    return "<br>".join(f"<strong>{i}.</strong> {oblikuj(o)}" for i, o in enumerate(odgovori, 1))


def rokopis_postavk(odgovori, razlage):
    deli = []
    for i, (o, r) in enumerate(zip(odgovori, razlage), 1):
        deli.append(f'<div class="rk-korak"><div class="rk-v">{i}. <span class="rk-odg">{oblikuj(o)}</span></div>'
                    f'<div class="rk-kom">{oblikuj(r)}</div></div>')
    return '<div class="rokopis">' + "".join(deli) + "</div>"


def rokopis(koraki):
    deli = []
    for k in koraki:
        if isinstance(k, tuple) and len(k) == 1:
            k = k[0]
        if isinstance(k, str) and k.startswith("##"):
            deli.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{oblikuj(k[2:].strip())}</div></div>')
            continue
        v, kom = k[0], k[1] if len(k) > 1 else ""
        if v is None:
            deli.append(f'<div class="rk-kom rk-sam">{oblikuj(kom)}</div>')
            continue
        deli.append(f'<div class="rk-korak"><div class="rk-v">{oblikuj(v)}</div><div class="rk-kom">{oblikuj(kom)}</div></div>')
    return '<div class="rokopis">' + "".join(deli) + "</div>"


def navodilo(s):
    return f'<p class="ang-navodilo"><strong>{oblikuj(s)}</strong></p>'


def posnetek_html(rec, oznaka):
    """Uvod, gumb za poslušanje (bralnik brskalnika) in zloženo besedilo posnetka."""
    govor = odstavki(rec["besedilo"])
    return (f'<p class="ang-navodilo">{oblikuj(rec["uvod"])} You will hear the recording twice. Now read the task.</p>'
            f'<div class="ang-posnetek" data-oznaka="{html.escape(oznaka)}">'
            f'<button type="button" class="btn btn-secondary ang-poslusaj">▶ Poslušaj posnetek</button>'
            f'<span class="ang-posnetek-opis">Posnetek prebere bralnik v brskalniku (angleški glas). Poslušaj ga dvakrat.</span>'
            f'<details class="ang-transkript"><summary>Besedilo posnetka (odpri šele po reševanju)</summary>'
            f'<div class="ang-govor">{govor}</div></details></div>'
            f'<h4 class="ang-naslov">{oblikuj(rec["naslov"])}</h4>')


def izdelaj(n, st, raven):
    v = n["vrsta"]
    zgoraj = []
    odgovori, razlage = [], []
    if v in ("sa", "sc", "mc"):
        if v == "sa":
            zgoraj.append(navodilo("Read the text and answer the questions in note form in the spaces below. Use 1–5 words for each answer. "
                                   "All contracted forms with the exception of can’t count as two words. There is an example at the beginning: Answer 0."))
        elif v == "sc":
            zgoraj.append(navodilo("Read the text and complete the sentences below. Use 1–5 words in each gap. All contracted forms with the "
                                   "exception of can’t count as two words. There is an example at the beginning: Sentence 0."))
        else:
            zgoraj.append(navodilo("Read the text below and choose the correct answer (A, B, C or D). There is an example at the beginning (0)."))
        zgoraj.append(besedilo_bralno(n["naslov"], n["besedilo"]))
        if v == "mc":
            li = []
            pr = n["primer"]
            moz = lambda m: "".join(f'<span class="ang-moznost"><b>{c}</b> {oblikuj(t)}</span>' for c, t in zip("ABCD", m))
            li.append(f'<li class="ang-primer"><span class="ang-st">0.</span><span>{oblikuj(pr[0])}<br>{moz(pr[1])}'
                      f'<br><em class="ang-primer-odg">Answer: {pr[2]}</em></span></li>')
            for i, (q, m, c, r) in enumerate(n["postavke"], 1):
                li.append(f'<li><span class="ang-st">{i}.</span><span>{oblikuj(q)}<br>{moz(m)}</span></li>')
                odgovori.append(c)
                razlage.append(r)
            zgoraj.append(f'<ol class="ang-vprasanja ang-mc">{"".join(li)}</ol>')
        else:
            zgoraj.append(seznam_vprasanj(n["postavke"], n["primer"]))
            for q, o, r in n["postavke"]:
                odgovori.append(o)
                razlage.append(r)
    elif v == "match":
        primeri = n["primeri"]
        oz = ", ".join(f"Example {'0' * (i + 1)}" for i in range(len(primeri)))
        zgoraj.append(navodilo(f"Read the text and match the statements with the paragraphs. More than one statement may refer to the same "
                               f"paragraph. There {'is an example' if len(primeri) == 1 else 'are examples'} at the beginning: {oz}."))
        deli = [besedilo_bralno(n["naslov"], n["uvod"])]
        for c, (nasl, bes) in n["odstavki"].items():
            deli.append(f'<div class="ang-odstavek"><h5><span class="ang-crka">{c}</span> {oblikuj(nasl)}</h5>{odstavki(bes)}</div>')
        zgoraj.append('<div class="ang-besedilo">' + "".join(deli) + "</div>")
        li = []
        for i, (q, c) in enumerate(primeri):
            li.append(f'<li class="ang-primer"><span class="ang-st">{"0" * (i + 1)}.</span><span>{oblikuj(q)} '
                      f'<em class="ang-primer-odg">({c})</em></span></li>')
        for i, (q, c, r) in enumerate(n["postavke"], 1):
            li.append(f'<li><span class="ang-st">{i}.</span><span>{oblikuj(q)}</span></li>')
            odgovori.append(c)
            razlage.append(r)
        zgoraj.append(f'<p class="ang-navodilo"><strong>Which paragraph …</strong></p><ol class="ang-vprasanja">{"".join(li)}</ol>')
    elif v == "gaps":
        kaj = "sentence parts" if n["oblika"] == "sentence parts" else "sentences"
        ena = "sentence part" if kaj == "sentence parts" else "sentence"
        zgoraj.append(navodilo(f"Read the text and choose from the {kaj} below the one that fits each gap. Each {ena} can be used only once. "
                               f"There are two extra {kaj} which you do not need to use. There is an example at the beginning: Gap 0 ({n['primer']})."))
        zgoraj.append(besedilo_bralno(n["naslov"], n["besedilo"]))
        li = "".join(f'<li><span class="ang-crka">{c}</span><span>{oblikuj(t)}</span></li>' for c, t in n["deli"].items())
        zgoraj.append(f'<ol class="ang-deli">{li}</ol>')
        for o, r in n["odgovori"]:
            odgovori.append(o)
            razlage.append(r)
        stevilo_vrzeli = len(re.findall(r"\[(\d+)\]", n["besedilo"])) - 1
        assert stevilo_vrzeli == len(odgovori), f"{n['naslov']}: {stevilo_vrzeli} vrzeli, {len(odgovori)} odgovorov"
        assert len(n["deli"]) == len(odgovori) + 3, f"{n['naslov']}: delov mora biti za 2 več (+ primer)"
        assert len(set(odgovori + [n["primer"]])) == len(odgovori) + 1, f"{n['naslov']}: ponovljena črka"
    elif v in ("gf", "wf", "vb"):
        if v == "gf":
            zgoraj.append(navodilo("Read the text below and write the missing words in the spaces provided. There is one word missing in each gap. "
                                   "All contracted forms with the exception of can’t count as two words. There is an example at the beginning: Gap 0."))
        elif v == "wf":
            zgoraj.append(navodilo("Read the text below and change the words in brackets so that they fit in the gaps. Write your answers in the "
                                   "spaces provided. There is an example at the beginning: Gap 0."))
        else:
            zgoraj.append(navodilo("Read the text below and write the correct form of the verbs in brackets in the spaces provided. "
                                   "There is an example at the beginning: Gap 0."))
        zgoraj.append(besedilo_bralno(n["naslov"], n["besedilo"]))
        prim = n["odgovori"][0]
        zgoraj.append(f'<p class="ang-primer-vrstica">Example: <strong>0.</strong> <em>{oblikuj(prim[0])}</em></p>')
        for o, r in n["odgovori"][1:]:
            odgovori.append(o)
            razlage.append(r)
        vrzeli = sorted({int(x) for x in re.findall(r"_(\d+)_", n["besedilo"])})
        assert vrzeli == list(range(len(odgovori) + 1)), f"{n['naslov']}: vrzeli {vrzeli} in {len(odgovori)} odgovorov"
    elif v in ("tf", "lsc", "lnote"):
        rec = n["posnetek"]
        zgoraj.append(posnetek_html(rec, f"{st}"))
        if v == "tf":
            zgoraj.append(navodilo("As you listen to the recording, decide whether the following statements are true (T) or false (F)."))
            li = [f'<li class="ang-primer"><span class="ang-st">0.</span><span>{oblikuj(n["primer"][0])} '
                  f'<em class="ang-primer-odg">({n["primer"][1]})</em></span></li>']
            for i, (q, o, r) in enumerate(n["postavke"], 1):
                li.append(f'<li><span class="ang-st">{i}.</span><span>{oblikuj(q)} <span class="ang-tf">T / F</span></span></li>')
                odgovori.append(o)
                razlage.append(r)
            zgoraj.append(f'<ol class="ang-vprasanja">{"".join(li)}</ol>')
        else:
            if v == "lsc":
                zgoraj.append(navodilo("As you listen to the recording, complete the sentences. Use 1–5 words for each answer. "
                                       "All contracted forms with the exception of can’t count as two words."))
            else:
                zgoraj.append(navodilo("As you listen to the recording, answer in note form in the spaces below."))
            zgoraj.append(seznam_vprasanj(n["postavke"], n["primer"]))
            for q, o, r in n["postavke"]:
                odgovori.append(o)
                razlage.append(r)
    else:
        raise ValueError(v)

    poglavje, sklop, snov_naslov = SNOVI[v if v != "gaps" else "gaps"]
    izid = {
        "oznaka": f"Task {st}: {NASLOVI.get(v) or ('Gapped sentences' if n.get('oblika') == 'sentence parts' else 'Gapped text')}",
        "poglavje": [poglavje, *DODATNA.get(v, [])],
        "snov": SNOV.format(p=poglavje, s=sklop),
        "snovNaslov": snov_naslov,
        "tocke": len(odgovori),
        "besedilo": "".join(zgoraj),
        "rezultat": odgovori_html(odgovori),
        "razlaga": rokopis_postavk(odgovori, razlage),
    }
    if v in TOCNO:
        izid["preverjanje"] = "tocno"
    return izid


def izdelaj_pisanje(n, raven):
    v = n["vrsta"]
    poglavje, sklop, snov_naslov = SNOVI[v]
    if v == "pis":
        b = [f'<p class="pola-naslov-naloge"><strong>{oblikuj(n["oblika"])}</strong></p>', odstavki(n["besedilo"])]
        if n["alineje"]:
            b.append("<ul>" + "".join(f"<li>{oblikuj(a)}</li>" for a in n["alineje"]) + "</ul>")
        if n["glava"]:
            b.append(f'<div class="ang-glava">{oblikuj(n["glava"])}</div>')
        tocke_ = 20
        oznaka = f'A) {n["oblika"]} ({n["besede"]} words)'
    elif v == "esej":
        b = ['<p class="ang-navodilo"><strong>Choose ONE essay title.</strong></p>',
             "<ol>" + "".join(f"<li><strong>{oblikuj(t)}</strong></li>" for t in n["naslovi"]) + "</ol>",
             f'<p>Underline the essay title you have chosen. How far do you agree or disagree with the statement? '
             f'Support your opinion in {n["besede"]} words.</p>']
        tocke_ = 20
        oznaka = f'B) Essay ({n["besede"]} words)'
    else:
        b = [f'<p><strong>{oblikuj(n["navodilo"])}</strong></p>',
             f'<p class="ang-delo">{oblikuj(n["delo"])}</p>',
             f'<p>Write an essay of {n["besede"]} words. Do not write about the text and/or the author in general.</p>']
        tocke_ = 25
        oznaka = f'B) Literary essay ({n["besede"]} words)'
    return {
        "oznaka": oznaka,
        "poglavje": [poglavje],
        "snov": SNOV.format(p=poglavje, s=sklop),
        "snovNaslov": snov_naslov,
        "tocke": tocke_,
        "tip": "esej",
        "besedilo": "".join(b),
        "rezultat": oblikuj(n["rezultat"]),
        "razlaga": rokopis(n["koraki"]),
    }


RAVNI = {"OR": "osnovna", "VR": "visja"}
VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), {nase} pa so naši. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.")
DELI = {
    1: {"A": "A) BRALNO RAZUMEVANJE", "B": "B) POZNAVANJE IN RABA JEZIKA"},
    2: {"A": "SECTION A", "B": "SECTION B"},
    3: {"A": "A) PISNI SESTAVEK (V ENI OD STALNIH SPOROČANJSKIH OBLIK)", "B": "B) DALJŠI PISNI SESTAVEK"},
}
NASLOVI_POL = {1: "bralno razumevanje ter poznavanje in raba jezika", 2: "slušno razumevanje", 3: "pisno sporočanje"}


def zgradi(pot):
    ns = runpy.run_path(pot, init_globals=dict(GRADNIKI))
    leto, rok, izvedba, datum = ns["LETO"], ns["ROK"], ns.get("IZVEDBA", 1), ns["DATUM"]
    pole = []
    for kljuc, raven in RAVNI.items():
        vsebina = ns[kljuc]
        for st in (1, 2, 3):
            seznam = vsebina[st]
            if st == 3:
                naloge = [{"id": f"{d}1", **izdelaj_pisanje(n, raven)} for d, n in zip("AB", seznam)]
            else:
                naloge = []
                stevci = {}
                for n in seznam:
                    d = "A" if (st == 1 and n["vrsta"] in ("sa", "sc", "mc", "match", "gaps")) or (st == 2 and not naloge) else "B"
                    stevci[d] = stevci.get(d, 0) + 1
                    naloge.append({"id": f"{d}{stevci[d]}", **izdelaj(n, stevci[d], raven)})
            vsota = sum(n["tocke"] for n in naloge)
            if st == 1:
                pricakovano = ns.get(f"TOCKE1_{kljuc}", 50)
                assert vsota == pricakovano, f"{pot} {kljuc} pola 1: {vsota} točk namesto {pricakovano}"
                assert [n["id"] for n in naloge] == ["A1", "A2", "B1", "B2"], f"{pot} {kljuc}: {[n['id'] for n in naloge]}"
                cas, opis = "60 minut (35 + 25)", f"2 nalogi v delu A in 2 v delu B, {vsota} točk, vsaka pravilna rešitev je vredna 1 točko."
            elif st == 2:
                assert 15 <= vsota <= 20, f"{pot} {kljuc} pola 2: {vsota} točk"
                cas, opis = "do 20 minut", f"Dva posnetka, vsakega poslušaš dvakrat, {vsota} točk."
            else:
                cas = "90 minut (30 + 60)"
                opis = ("Del A 120–150 besed (20 točk), del B esej 220–250 besed (20 točk)." if raven == "osnovna"
                        else "Del A 150–180 besed (20 točk), del B esej o književnem delu 250–300 besed (25 točk).")
            opis_roka = f"{rok} rok {leto}{', ' + str(izvedba) + '. izpitni dan' if izvedba > 1 else ''}, {raven} raven"
            nase = {1: "besedila, naloge in rešitve", 2: "besedila posnetkov, naloge in rešitve",
                    3: "naslovi, navodila in rešitve"}[st]
            deli = dict(DELI[st])
            if st == 3 and raven == "visja":
                deli["B"] = "B) PISNI SESTAVEK NA TEMO IZ KNJIŽEVNOSTI"
            pid = f"anglescina-{raven}-{leto}-{rok}{'-' + str(izvedba) if izvedba > 1 else ''}-{st}"
            pole.append({
                "id": pid, "predmet": "anglescina", "raven": raven, "leto": leto, "rok": rok, "izvedba": izvedba,
                "pdf": None, "datum": datum, "stevilka": st,
                "naslov": f"Angleščina, {raven} raven, {rok} rok {leto}, izpitna pola {st}: {NASLOVI_POL[st]} (vadbena pola Piflar.si)",
                "navodilo": f"{cas}. {opis}",
                "vir": VIR.format(opis=f"{opis_roka}, izpitna pola {st}", nase=nase)
                       + (" Besedila posnetkov so naša, prebere jih bralnik v brskalniku." if st == 2 else ""),
                "deli": deli,
                "naloge": naloge,
            })
    return pole


ROKI = {"spomladanski": 0, "jesenski": 1}

if __name__ == "__main__":
    viri = sorted(glob.glob(os.path.join(KOREN, "pole", "*.py")))
    pole = []
    for v in viri:
        pole += zgradi(v)
    pole.sort(key=lambda p: (-p["leto"], ROKI[p["rok"]], p["izvedba"], p["raven"] != "osnovna", p["stevilka"]))
    with open(IZHOD, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog, "
          f"{sum(n['tocke'] for p in pole for n in p['naloge'] if p['stevilka'] < 3)} točk v polah 1 in 2 → {os.path.relpath(IZHOD)}")
