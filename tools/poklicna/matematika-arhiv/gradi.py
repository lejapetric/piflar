# python3 tools/poklicna/matematika-arhiv/gradi.py
# Vadbene pole poklicne mature iz matematike po uradnih polah RIC → api/data/matura-poklicna_matematika.json
#
# Vsak rok je v svoji datoteki r<leto>_<rok>.py (NALOGE: A1–A11 in B1–B3). Naloge sledijo uradni poli RIC
# (zgradba, tip naloge, točkovanje), podatki in besedila pa so spremenjeni. Pole iz pole_mat.py ostanejo, pola
# istega roka iz tega arhiva pa jo nadomesti.
import glob, importlib.util, json, os

TU = os.path.dirname(os.path.abspath(__file__))
POT = os.path.join(TU, "..", "..", "..", "api", "data", "matura-poklicna_matematika.json")
PREDMET = "poklicna_matematika"
ROK_RED = {"spomladanski": 0, "jesenski": 1, "zimski": 2}
IME_ROKA = {"spomladanski": "spomladanski rok", "jesenski": "jesenski rok", "zimski": "zimski rok"}


def pola(r):
    with open(os.path.join(TU, "ric.json"), encoding="utf-8") as f:
        ric = json.load(f)[f"{r.LETO}-{r.ROK}"]
    a = [n for n in r.NALOGE if n["id"].startswith("A")]
    b = [n for n in r.NALOGE if n["id"].startswith("B")]
    assert len(a) == 11 and sum(n["tocke"] for n in a) == 50, (r.LETO, r.ROK)
    assert len(b) == 3 and all(n["tocke"] == 10 for n in b), (r.LETO, r.ROK)
    ime = IME_ROKA[r.ROK]
    p = {
        "id": f"{PREDMET}-{r.LETO}-{r.ROK}", "predmet": PREDMET, "raven": "enotna", "leto": r.LETO, "rok": r.ROK,
        "pdf": ric["pola"], "datum": r.DATUM,
        "naslov": f"Matematika, poklicna matura, {ime} {r.LETO} (vadbena pola Učilnica.com)",
        "navodilo": "120 minut, 70 točk. 1. del: 11 nalog (50 točk). 2. del: izberi in reši 2 od 3 nalog (20 točk). "
                    "Dovoljeni so računalo, geometrijsko orodje in priložene formule.",
        "vir": f"Vadbena pola Učilnica.com. Zgradba, vrsta nalog in točkovanje sledijo uradni poli poklicne mature iz matematike "
               f"({ime} {r.LETO}), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.",
        "deli": {"A": "1. DEL (11 nalog, 50 točk)", "B": "2. DEL (izberi in reši 2 od 3 nalog, 20 točk)"},
        "naloge": r.NALOGE,
    }
    if ric.get("navodila"):
        p["ocenjevanje"] = ric["navodila"]
    return p


def main():
    roki = []
    for pot in sorted(glob.glob(os.path.join(TU, "r[0-9]*.py"))):
        spec = importlib.util.spec_from_file_location(os.path.basename(pot)[:-3], pot)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        roki.append(m)
    nove = [pola(r) for r in roki]
    idji = {p["id"] for p in nove}
    with open(POT, encoding="utf-8") as f:
        pole = [p for p in json.load(f) if p["id"] not in idji] + nove
    pole.sort(key=lambda p: (-p["leto"], ROK_RED[p["rok"]]))
    with open(POT, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(len(nove), "pol iz arhiva,", len(pole), "pol skupaj,", sum(len(p["naloge"]) for p in nove), "nalog")


if __name__ == "__main__":
    main()
