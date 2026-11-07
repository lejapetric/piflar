# python3 tools/matura/biologija/gradi.py
# Iz virov v tools/matura/biologija/pole/*.py zgradi api/data/matura-biologija.json.
#
# Uporablja iste gradnike kot fizika (tools/matura/fizika/gradi.py), le krajše zapisane:
#   M(poglavje, vprasanje, [A, B, C, D], "C", "razlaga")      naloga izbirnega tipa (pola 1, 40 nalog po 1 točko)
#   S(naslov, [poglavja], uvod, [P(...), ...])                 strukturirana naloga (pola 2, 7 nalog po 10 točk)
#   P(tocke, besedilo, "rezultat", "razlaga")                  vprašanje strukturirane naloge
#   P(None, besedilo)                                          besedilo ali preglednica med vprašanji
# Razlaga je lahko niz (en komentar) ali seznam korakov kot pri fiziki.
#
# Pola 2 ima del A (naloge 1–5, izbereš in rešiš 3) in del B (nalogi 6 in 7, izbereš 1).
# Vir izpitnega dne ima POLA1 in/ali POLA2: kjer uradna pola tega dne ni bila podlaga, je vir nima.
import glob, json, os, random, runpy, sys

KOREN = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(KOREN, "..", "fizika"))
import gradi as g  # noqa: E402

IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-biologija.json")

g.PRAVILA = {}
g.TOCKE_STRUKTURIRANE = 10


def _koraki(k):
    if k is None or k == "":
        return []
    return [(None, k)] if isinstance(k, str) else list(k)


def M(poglavje, vprasanje, izbire, pravilna, razlaga, slika=None):
    return g.M(poglavje, vprasanje, izbire, pravilna, _koraki(razlaga), slika)


def P(tocke_, besedilo, rezultat=None, razlaga=None, slika=None):
    if tocke_ is None:
        return g.P(None, besedilo, slika=slika)
    koraki = [("!" + rezultat, razlaga if isinstance(razlaga, str) else "")]
    if isinstance(razlaga, list):
        koraki += razlaga
    return g.P(tocke_, besedilo, rezultat, koraki, slika)


def S(naslov, poglavja, uvod, deli, slika=None):
    return g.S(naslov, poglavja, uvod, deli, slika)


VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni center (RIC), "
       "ki ima nanje vse avtorske pravice.")


def zgradi(pot):
    ns = runpy.run_path(pot, init_globals={"M": M, "S": S, "P": P, "tabela": g.tabela, "graf": g.graf})
    leto, rok, izvedba, datum = ns["LETO"], ns["ROK"], ns.get("IZVEDBA", 1), ns["DATUM"]
    pripona = "" if izvedba == 1 else f"-{izvedba}"
    opis_roka = f"{rok} rok {leto}" + (f", {izvedba}. izpitni dan" if izvedba > 1 else "")
    skupno = {"predmet": "biologija", "raven": "enotna", "leto": leto, "rok": rok, "izvedba": izvedba, "datum": datum, "pdf": None}
    pole = []
    if "POLA1" in ns:
        pola1 = ns["POLA1"]
        assert len(pola1) == 40, f"{pot}: pola 1 ima {len(pola1)} nalog"
        cilji = list("ABCD" * 10)
        random.Random(f"biologija-{leto}-{rok}-{izvedba}").shuffle(cilji)
        pole.append({
            "id": f"biologija-{leto}-{rok}{pripona}-1", **skupno, "stevilka": 1,
            "naslov": f"Biologija, {opis_roka}, izpitna pola 1 (vadbena pola Piflar.si)",
            "navodilo": "90 minut, 40 nalog izbirnega tipa, vsaka je vredna 1 točko (40 točk). Dovoljeno je računalo.",
            "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 1"),
            "naloge": [{"id": str(i + 1), **g.izbirna(n, c)} for i, (n, c) in enumerate(zip(pola1, cilji))],
        })
    if "POLA2" in ns:
        pola2 = ns["POLA2"]
        assert len(pola2) == 7, f"{pot}: pola 2 ima {len(pola2)} nalog"
        naloge = []
        for i, s in enumerate(pola2):
            s = dict(s, naslov=f"{'Del A' if i < 5 else 'Del B'} · {s['naslov']}")
            naloge.append({"id": str(i + 1), **g.strukturirana(i + 1, s)})
        pole.append({
            "id": f"biologija-{leto}-{rok}{pripona}-2", **skupno, "stevilka": 2,
            "naslov": f"Biologija, {opis_roka}, izpitna pola 2 (vadbena pola Piflar.si)",
            "navodilo": ("90 minut, 7 strukturiranih nalog po 10 točk. V delu A (naloge 1–5) izberi in reši 3, "
                         "v delu B (nalogi 6 in 7) izberi in reši 1 (40 točk). Dovoljeno je računalo."),
            "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 2"),
            "naloge": naloge,
        })
    return pole


if __name__ == "__main__":
    viri = sorted(glob.glob(os.path.join(KOREN, "pole", "*.py")))
    pole = []
    for v in viri:
        pole += zgradi(v)
    pole.sort(key=lambda p: (-p["leto"], g.ROKI[p["rok"]], p["izvedba"], p["stevilka"]))
    with open(IZHOD, "w", encoding="utf-8") as f:
        json.dump(pole, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog → {os.path.relpath(IZHOD)}")
