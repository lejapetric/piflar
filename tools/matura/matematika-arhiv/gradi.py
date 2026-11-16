# python3 tools/matura/matematika-arhiv/gradi.py && node tools/matura/dodaj-pravila.mjs
# Vadbene pole matematike za starejše roke splošne mature (2019 in prej) → api/data/matura.json
#
# Vsak rok je v svoji datoteki r<leto>_<rok>.py. Naloge sledijo uradnim polam RIC (zgradba,
# tip naloge, točkovanje), podatki in besedila pa so spremenjeni. Do leta 2020 sta bili na
# osnovni in višji ravni enaki izpitni poli 1 (osnovna 120 minut, višja 90 minut), višja raven
# je imela še izpitno polo 2 s štirimi strukturiranimi nalogami (dve obvezni, ena izbirna).
import glob, importlib.util, json, os

TU = os.path.dirname(os.path.abspath(__file__))
POT = os.path.join(TU, "..", "..", "..", "api", "data", "matura.json")
ROK_RED = {"spomladanski": 0, "jesenski": 1}
VIR = ("Vadbena pola Učilnica.com. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({rok} rok {leto}, {raven} raven), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni "
       "center (RIC), ki ima nanje vse avtorske pravice.")


def pola(r, raven, stevilka, naloge, navodilo, pdf):
    ime = "osnovna" if raven == "osnovna" else "višja"
    return {
        "id": f"matematika-{raven}-{r.LETO}-{r.ROK}-{stevilka}",
        "predmet": "matematika", "raven": raven, "leto": r.LETO, "rok": r.ROK, "stevilka": stevilka,
        "naslov": f"Matematika, {ime} raven, {r.ROK} rok {r.LETO}, izpitna pola {stevilka} (vadbena pola Učilnica.com)",
        "navodilo": navodilo, "pdf": pdf, "ocenjevanje": r.RIC["ocenjevanje"],
        "vir": VIR.format(rok=r.ROK, leto=r.LETO, raven=ime),
        "naloge": naloge,
    }


def pole_roka(r):
    assert sum(n["tocke"] for n in r.POLA1) == 80, (r.LETO, r.ROK)
    assert sum(n["tocke"] for n in r.POLA2[:3]) == 40, (r.LETO, r.ROK)
    nav1 = "{} minut, 12 kratkih nalog, 80 točk. Računalo je dovoljeno, razen pri nalogah, kjer piše drugače."
    nav2 = ("90 minut, 4 strukturirane naloge, 40 točk. Prvi dve nalogi sta obvezni, med 3. in 4. izberi eno. "
            "Računalo je dovoljeno, razen pri nalogah, kjer piše drugače.")
    return [
        pola(r, "osnovna", 1, r.POLA1, nav1.format(120), r.RIC["or1"]),
        pola(r, "visja", 1, json.loads(json.dumps(r.POLA1)), nav1.format(90), r.RIC["vr1"]),
        pola(r, "visja", 2, r.POLA2, nav2, r.RIC["vr2"]),
    ]


def main():
    roki = []
    for pot in sorted(glob.glob(os.path.join(TU, "r[0-9]*.py"))):
        spec = importlib.util.spec_from_file_location(os.path.basename(pot)[:-3], pot)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        roki.append(m)
    nove = [p for r in roki for p in pole_roka(r)]
    idji = {p["id"] for p in nove}
    with open(POT, encoding="utf-8") as f:
        pole = [p for p in json.load(f) if p["id"] not in idji]
    pole += nove
    kljuc = lambda p: (-p["leto"], ROK_RED.get(p["rok"], -1), p["raven"] != "osnovna", p["stevilka"])
    stare = [p for p in pole if p["predmet"] != "matematika" or p["leto"] >= 2020]
    arhiv = sorted([p for p in pole if p not in stare], key=kljuc)
    with open(POT, "w", encoding="utf-8") as f:
        json.dump(stare + arhiv, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(len(roki), "rokov,", len(nove), "pol,", sum(len(p["naloge"]) for p in nove), "nalog")


if __name__ == "__main__":
    main()
