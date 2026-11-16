# python3 tools/poklicna/pole_kem.py
# Vadbene maturitetne pole poklicne mature iz kemije (2. predmet, kemijski tehnik)
# → api/data/matura-poklicna_kemija.json
#
# Zgradba po katalogu PIK 2 Kemija 2026: ena izpitna pola, 120 minut, 70 točk;
#   1. del (20 točk): naloge zaprtega in polodprtega tipa (tu 20 izbirnih nalog po 1 točko),
#   2. del (50 točk): strukturirane naloge z razčlenjenimi podvprašanji
#     (tu 18 nalog: 14 po 3 točke in 4 po 2 točki).
# Naloge so iz naših vadbenih pol splošne mature iz kemije (izpitna pola 1 in 2), razporejene na
# snovi poklicne mature. Uradne pole poklicne mature izdaja RIC.
import json
import os
import re

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
SM = {p["id"]: p for p in json.load(open(os.path.join(KOREN, "api", "data", "matura-kemija.json"), encoding="utf-8"))}
IZHOD = os.path.join(KOREN, "api", "data", "matura-poklicna_kemija.json")

from snovi import SNOVI  # noqa: E402

NASLOVI = {slug: naslov for _, slug, naslov, _ in SNOVI["poklicna_kemija"]}

# (leto, rok, vir 1. dela, vir 2. dela, dodatni vir za 2. del)
ROKI = [
    (2026, "spomladanski", "kemija-2025-spomladanski-1", "kemija-2025-spomladanski-2", "kemija-2022-spomladanski-2"),
    (2025, "spomladanski", "kemija-2025-jesenski-1", "kemija-2025-jesenski-2", "kemija-2022-jesenski-2"),
    (2025, "jesenski", "kemija-2025-jesenski-2-1", "kemija-2025-jesenski-2-2", "kemija-2022-jesenski-2-2"),
    (2025, "zimski", "kemija-2024-spomladanski-1", "kemija-2024-spomladanski-2", "kemija-2021-spomladanski-2"),
    (2024, "spomladanski", "kemija-2024-jesenski-1", "kemija-2024-jesenski-2", "kemija-2021-jesenski-2"),
    (2024, "jesenski", "kemija-2024-jesenski-2-1", "kemija-2024-jesenski-2-2", "kemija-2021-jesenski-2-2"),
    (2024, "zimski", "kemija-2023-spomladanski-1", "kemija-2023-spomladanski-2", "kemija-2020-spomladanski-2"),
    (2023, "spomladanski", "kemija-2023-jesenski-1", "kemija-2023-jesenski-2", "kemija-2020-jesenski-2"),
]
IME_ROKA = {"spomladanski": "spomladanski rok", "jesenski": "jesenski rok", "zimski": "zimski rok"}

IME = re.compile(r"poimenuj|imenuj|ime spojine|zapišite ime|Stock|grškimi", re.I)
STEH = re.compile(r"množinsk\w* razmerj|prebit|izkoristek|koliko gramov|izračunajte maso|izračunajte množino|teoretičn", re.I)
BIO = re.compile(r"sahar|glukoz|fruktoz|škrob|celuloz|lipid|maščob|milo|umilj|fotosintez|ogljikov\w* hidrat|glikozid|Fischer", re.I)
KONC = re.compile(r"koncentracij|masni delež|redč|mol/L|g/L|pripravi|zmešamo", re.I)
PLIN = re.compile(r"plin|molsk\w* prostornin|tlak|kelvin", re.I)

PRESLIKAVA = {
    "varno_eksperimentalno_delo": "zmesi_laboratorij", "delci_snovi": "atom_periodni_sistem", "hitrost_reakcij": "hitrost_ravnotezje",
    "kemijsko_ravnotezje": "hitrost_ravnotezje", "ravnotezja_v_vodnih_raztopinah": "kisline_baze_pm", "organske_spojine_zgradba": "ogljikovodiki_pm",
    "ogljikovodiki": "ogljikovodiki_pm", "organske_reakcije": "ogljikovodiki_pm", "halogenirani_ogljikovodiki": "halogenirani_kisikove",
    "polimeri": "polimeri_pm",
}


def pm_snov(poglavje, besedilo):
    if poglavje in PRESLIKAVA:
        return PRESLIKAVA[poglavje]
    if poglavje == "periodni_sistem_elementov":
        return "kovine_pm" if re.search(r"prehodn|koordinac|kompleks|ligand", besedilo, re.I) else "atom_periodni_sistem"
    if poglavje == "kemijske_vezi":
        return "anorganska_nomenklatura" if IME.search(besedilo) else "vezi_zgradba_molekul"
    if poglavje == "mnozina_snovi":
        return "agregatna_stanja" if PLIN.search(besedilo) else "mnozina_stehiometrija"
    if poglavje == "raztopine":
        return "racunanje_raztopine" if KONC.search(besedilo) else "raztopine_pm"
    if poglavje == "kemijska_reakcija":
        return "mnozina_stehiometrija" if STEH.search(besedilo) else "reakcije_energija"
    if poglavje == "oksidacija_redukcija":
        if re.search(r"oksidacijsk\w* štev", besedilo, re.I) and not re.search(r"uredi|galvan|elektroliz", besedilo, re.I):
            return "anorganska_nomenklatura"
        return "kovine_pm" if re.search(r"pridobivanj|plavž|rud[ae]", besedilo, re.I) else "redoks_elektrokemija"
    if poglavje == "alkalijske_kovine_halogeni":
        return "zrak_voda_nekovine" if re.search(r"halogen|klor|fluor|brom|jod", besedilo, re.I) else "kovine_pm"
    if poglavje == "elementi_spojine_tehnologije":
        return "kovine_pm" if re.search(r"alumin|boksit|amfoter", besedilo, re.I) else "zrak_voda_nekovine"
    if poglavje == "kisikove_spojine":
        return "biomolekule_pm" if BIO.search(besedilo) else "halogenirani_kisikove"
    if poglavje == "dusikove_spojine":
        return "biomolekule_pm" if re.search(r"aminokislin|peptid|beljakovin|protein", besedilo, re.I) else "halogenirani_kisikove"
    raise KeyError(poglavje)


def poglavja(n):
    besedilo = f"{n['besedilo']} {n['rezultat']}"
    out = []
    for p in [n["poglavje"]] if isinstance(n["poglavje"], str) else n["poglavje"]:
        q = pm_snov(p, besedilo)
        if q not in out:
            out.append(q)
    return out


def skrajsaj(n):
    """Strukturirani nalogi odstrani zadnje (3.) podvprašanje: 3 → 2 točki."""
    st = n["id"]
    b = re.sub(rf'<p class="pola-vprasanje"><strong>{st}\.3\.</strong>.*?</p>', "", n["besedilo"], flags=re.S)
    r = n["rezultat"].rsplit("<br>", 1)[0]
    i = n["razlaga"].find(f'<div class="rk-korak rk-naslov"><div class="rk-v">{st}.3.</div></div>')
    assert b != n["besedilo"] and i > 0, n["id"]
    return {**n, "tocke": 2, "besedilo": b, "rezultat": r, "razlaga": n["razlaga"][:i] + "</div>"}


def prestevilci(t, star, nov):
    return re.sub(rf"(?<![\d.]){re.escape(str(star))}\.(\d+)\.", rf"{nov}.\1.", t)


def pola(leto, rok, vir1, vir2, vir3):
    izbirne = SM[vir1]["naloge"]
    a = [izbirne[round(i * (len(izbirne) - 1) / 19)] for i in range(20)]
    b = SM[vir2]["naloge"] + SM[vir3]["naloge"][:3]
    # štiri naloge skrajšamo na 2 točki (vsaka četrta), da je 2. del vreden 50 točk
    b = [skrajsaj(n) if i in (3, 7, 11, 15) else n for i, n in enumerate(b)]
    assert sum(int(n["tocke"]) for n in a) == 20 and sum(int(n["tocke"]) for n in b) == 50
    naloge = []
    for pre, sez in (("A", a), ("B", b)):
        for i, n in enumerate(sez, 1):
            pogl = poglavja(n)
            x = {"id": f"{pre}{i}", "poglavje": pogl,
                 "snov": f"/views/poklicna_kemija/snov/{pogl[0]}/{pogl[0]}_razlaga.html", "snovNaslov": NASLOVI[pogl[0]],
                 "tocke": int(n["tocke"]),
                 "besedilo": prestevilci(n["besedilo"], n["id"], i), "rezultat": prestevilci(n["rezultat"], n["id"], i),
                 "razlaga": prestevilci(n["razlaga"], n["id"], i)}
            if n.get("tip"):
                x["tip"] = n["tip"]
            naloge.append(x)
    return {
        "id": f"poklicna_kemija-{leto}-{rok}", "predmet": "poklicna_kemija", "raven": "enotna",
        "leto": leto, "rok": rok, "izvedba": 1, "pdf": None,
        "naslov": f"Kemija, poklicna matura (kemijski tehnik), {IME_ROKA[rok]} {leto} (vadbena pola Učilnica.com)",
        "navodilo": "120 minut, 70 točk. 1. del: 20 nalog zaprtega tipa (20 točk). 2. del: strukturirane naloge s podvprašanji (50 točk). Dovoljeni so nalivno pero ali kemični svinčnik, žepno računalo brez grafičnega zaslona in priloženi periodni sistem.",
        "vir": "Vadbena pola Učilnica.com. Zgradba in točkovanje sledita predmetnemu izpitnemu katalogu za poklicno maturo (kemija, 2. predmet), naloge in rešitve so naše. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.",
        "deli": {"A": "1. DEL (20 nalog, 20 točk)", "B": "2. DEL (strukturirane naloge, 50 točk)"},
        "naloge": naloge,
    }


if __name__ == "__main__":
    pole = [pola(*r) for r in ROKI]
    with open(IZHOD, "w", encoding="utf-8") as f:
        f.write("[\n" + ",\n".join(json.dumps(p, ensure_ascii=False) for p in pole) + "\n]\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog")
    import collections
    print(collections.Counter(q for p in pole for n in p["naloge"] for q in n["poglavje"]))
