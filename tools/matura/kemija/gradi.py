# python3 tools/matura/kemija/gradi.py
# Iz virov v tools/matura/kemija/pole/*.py zgradi api/data/matura-kemija.json.
#
# Uporablja iste gradnike kot fizika (tools/matura/fizika/gradi.py):
#   M(poglavje, vprasanje, [A, B, C, D], "C", [koraki])          naloga izbirnega tipa (pola 1, 35 nalog)
#   S("", [poglavja], uvod, [P(1, ...), P(1, ...), P(1, ...)])     strukturirana naloga (pola 2, 15 nalog po 3 točke)
#
# Kemijske formule pišemo med znakoma $ … $: števke za simbolom ali oklepajem postanejo
# podpisane, naboj zapišemo s ^ (npr. $SO4^2-$, $Fe^3+$, $NH4^+$), koeficiente pa pred formulo
# ($2H2O$, $CuSO4·5H2O$). Zunaj $ … $ besedilo ostane, kot je (pH 7, 2 mol …).
import glob, json, os, random, re, sys

KOREN = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(KOREN, "..", "fizika"))
import gradi as g  # noqa: E402

IZHOD = os.path.join(KOREN, "..", "..", "..", "api", "data", "matura-kemija.json")

# Pravila; True pomeni, da je podatek (konstanta, atomske mase) v prilogi s periodnim sistemom.
# Enačb priloga pri kemiji nima, zato si jih je treba zapomniti.
PRAVILA = {
    # ---------- podatek v prilogi ----------
    "Ar": ("Relativne atomske mase iz periodnega sistema", True),
    "Mr": ("Molska masa: vsota relativnih atomskih mas (g/mol)", True),
    "NA": ("Avogadrova konstanta N = nN_A", True),
    "pV=nRT": ("Splošna plinska enačba pV = nRT", True),
    "faraday": ("Faradayev zakon: e = It = zFn", True),
    "pse": ("Zgradba periodnega sistema (skupine, periode)", True),
    # ---------- ni v prilogi ----------
    "n=m/M": ("Množina snovi n = m/M", False),
    "c=n/V": ("Množinska koncentracija c = n/V", False),
    "w": ("Masni delež w = m(topljenec)/m(raztopina)", False),
    "gama": ("Masna koncentracija γ = m/V", False),
    "redcenje": ("Redčenje: c_1V_1 = c_2V_2", False),
    "gostota": ("Gostota ρ = m/V", False),
    "topnost": ("Topnost (g snovi na 100 g vode)", False),
    "stehiometrija": ("Razmerje množin po urejeni enačbi", False),
    "omejujoci": ("Reaktant v prebitku in omejujoči reaktant", False),
    "izkoristek": ("Izkoristek reakcije η = n(dejanski)/n(teoretični)", False),
    "empiricna": ("Empirična in molekulska formula iz sestave", False),
    "zgorevanje": ("Popolno gorenje organskih spojin: CO_2 in H_2O", False),
    "urejanje": ("Urejanje enačb: ohranitev atomov in naboja", False),
    "hess": ("Reakcijska entalpija iz tvorbenih entalpij ΔH = ΣΔH_{tv}(produkti) − ΣΔH_{tv}(reaktanti)", False),
    "vezne": ("Reakcijska entalpija iz veznih energij ΔH = ΣE(pretrgane) − ΣE(nastale)", False),
    "endoekso": ("Eksotermna (ΔH < 0) in endotermna (ΔH > 0) reakcija", False),
    "hitrost": ("Hitrost reakcije v = Δc/Δt in dejavniki, ki nanjo vplivajo", False),
    "K": ("Konstanta ravnotežja K_c = [produkti]/[reaktanti] s potencami koeficientov", False),
    "lechatelier": ("Le Chatelierovo načelo", False),
    "Kw": ("Ionski produkt vode K_w = [H_3O^+][OH^-] = 1,0 · 10^-14", False),
    "pH": ("pH = −log[H_3O^+], pH + pOH = 14", False),
    "Ka": ("Konstanta kisline K_a = [H_3O^+][A^-]/[HA]", False),
    "Kb": ("Konstanta baze K_b = [HB^+][OH^-]/[B]", False),
    "protolit": ("Protolitska reakcija: kislina odda, baza sprejme proton", False),
    "nevtralizacija": ("Nevtralizacija in titracija: n(H_3O^+) = n(OH^-)", False),
    "hidroliza_soli": ("Kislost in bazičnost raztopin soli", False),
    "obarjanje": ("Obarjanje: topne in netopne soli", False),
    "oks_stevilo": ("Določanje oksidacijskih števil", False),
    "redoks": ("Oksidacija je oddajanje, redukcija sprejemanje elektronov", False),
    "clen": ("Galvanski člen: anoda (oksidacija), katoda (redukcija), napetost E = E_{katode} − E_{anode}", False),
    "elektroliza": ("Elektroliza: na katodi redukcija, na anodi oksidacija", False),
    "konfiguracija": ("Elektronska konfiguracija in valenčni elektroni", False),
    "zgradba_atoma": ("Zgradba atoma: Z protonov, A − Z nevtronov", False),
    "trendi": ("Spreminjanje lastnosti v periodnem sistemu (polmer, ionizacijska energija, elektronegativnost)", False),
    "vez": ("Vrsta vezi iz razlike elektronegativnosti", False),
    "vsepr": ("Oblika molekul (teorija VSEPR)", False),
    "polarnost": ("Polarnost molekul", False),
    "medmolekulske": ("Medmolekulske sile in vodikove vezi", False),
    "kristali": ("Vrste kristalov (ionski, kovalentni, molekulski, kovinski)", False),
    "izomerija": ("Strukturna izomerija in stereoizomerija", False),
    "iupac": ("Poimenovanje po IUPAC", False),
    "adicija": ("Adicija na dvojno vez (Markovnikovo pravilo)", False),
    "substitucija": ("Substitucija (radikalska, nukleofilna, elektrofilna aromatska)", False),
    "eliminacija": ("Eliminacija (nastanek dvojne vezi)", False),
    "oksidacija_org": ("Oksidacija alkoholov in aldehidov", False),
    "esterifikacija": ("Estrenje in hidroliza estrov", False),
    "kondenzacija": ("Kondenzacija in hidroliza (amidna, glikozidna vez)", False),
    "polimerizacija": ("Adicijska in kondenzacijska polimerizacija", False),
    "funkcionalne": ("Funkcionalne skupine in razredi organskih spojin", False),
    "biomolekule": ("Ogljikovi hidrati, maščobe in beljakovine", False),
    "varnost": ("Varno delo v laboratoriju in piktogrami za nevarnost", False),
    "lab": ("Laboratorijski pribor in postopki", False),
    "alkalijske": ("Lastnosti alkalijskih kovin in halogenov", False),
    "elementi": ("Lastnosti elementov in njihovih spojin", False),
}

FORMULA = re.compile(r"\$([^$]+)\$")


def _formula(m):
    f = m[1]
    f = re.sub(r"\^(\d*[+-])", lambda x: "^{" + x[1] + "}", f)            # naboj
    f = re.sub(r"(?<=[A-Za-z)\]])(\d+)", lambda x: "_{" + x[1] + "}", f)  # indeksi
    return f


_oblikuj = g.oblikuj


def oblikuj(s):
    return _oblikuj(FORMULA.sub(_formula, s))


def oznaka_pravila(kljuc):
    ime, v_prilogi = PRAVILA[kljuc]
    besedilo = "podatek je v prilogi" if v_prilogi else "ni v prilogi"
    return (f'<span class="rk-pravilo"><span class="rk-pravilo-ime">{oblikuj(ime)}</span>'
            f'<span class="rk-list {"rk-da" if v_prilogi else "rk-ne"}">{besedilo}</span></span>')


g.PRAVILA = PRAVILA
g.oblikuj = oblikuj
g.oznaka_pravila = oznaka_pravila
g.TOCKE_STRUKTURIRANE = 3

VIR = ("Vadbena pola Piflar.si. Zgradba, vrsta nalog in točkovanje sledijo uradni poli splošne mature "
       "({opis}), besedila in podatki pa so naši. Uradne pole izdaja Državni izpitni center (RIC), "
       "ki ima nanje vse avtorske pravice.")
PRIPOMOCKI = "Dovoljena sta računalo in priloga s periodnim sistemom."


def zgradi(pot):
    import runpy
    ns = runpy.run_path(pot, init_globals={"M": g.M, "S": g.S, "P": g.P, "tabela": g.tabela, "graf": g.graf})
    leto, rok, izvedba, datum = ns["LETO"], ns["ROK"], ns.get("IZVEDBA", 1), ns["DATUM"]
    pola1, pola2 = ns["POLA1"], ns["POLA2"]
    assert len(pola1) == 35, f"{pot}: pola 1 ima {len(pola1)} nalog"
    assert len(pola2) == 15, f"{pot}: pola 2 ima {len(pola2)} nalog"
    pripona = "" if izvedba == 1 else f"-{izvedba}"
    cilji = list("ABCD" * 9)[:35]
    random.Random(f"kemija-{leto}-{rok}-{izvedba}").shuffle(cilji)
    opis_roka = f"{rok} rok {leto}" + (f", {izvedba}. izpitni dan" if izvedba > 1 else "")
    skupno = {"predmet": "kemija", "raven": "enotna", "leto": leto, "rok": rok, "izvedba": izvedba, "datum": datum, "pdf": None}
    p1 = {
        "id": f"kemija-{leto}-{rok}{pripona}-1", **skupno, "stevilka": 1,
        "naslov": f"Kemija, {opis_roka}, izpitna pola 1 (vadbena pola Piflar.si)",
        "navodilo": f"90 minut, naloge izbirnega tipa, 35 točk. {PRIPOMOCKI}",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 1"),
        "naloge": [{"id": str(i + 1), **g.izbirna(n, c)} for i, (n, c) in enumerate(zip(pola1, cilji))],
    }
    p2 = {
        "id": f"kemija-{leto}-{rok}{pripona}-2", **skupno, "stevilka": 2,
        "naslov": f"Kemija, {opis_roka}, izpitna pola 2 (vadbena pola Piflar.si)",
        "navodilo": f"90 minut, 15 strukturiranih nalog po 3 točke (45 točk). {PRIPOMOCKI}",
        "vir": VIR.format(opis=f"{opis_roka}, izpitna pola 2"),
        "naloge": [{"id": str(i + 1), **g.strukturirana(i + 1, s)} for i, s in enumerate(pola2)],
    }
    return [p1, p2]


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
