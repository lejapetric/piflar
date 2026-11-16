# python3 tools/poklicna/pole_slo.py
# Vadbene maturitetne pole poklicne mature iz slovenščine → api/data/matura-poklicna_slovenscina.json
#
# Zgradba po katalogu P-SLM-2025:
#   izpitna pola 1 (60 minut, 60 točk, deli se z 1,5 → 40 %): razčlemba izhodiščnega
#     neumetnostnega besedila (okoli 45 točk) in tvorba krajšega neumetnostnega besedila (12–18 točk);
#   izpitna pola 2 (60 minut, 30 točk): vodena interpretacija (odlomka) umetnostnega besedila.
# Izhodiščna besedila, naloge in tvorbe izpitne pole 1 so iz naših vadbenih pol splošne mature
# (izpitna pola 2), skrajšane na obseg poklicne mature. Izpitne pole 2 so napisane na novo, ob
# besedilih s seznama za poklicno maturo; odlomek kandidat poišče v berilu ali v svoji izdaji.
import json
import os
import re

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
SM = json.load(open(os.path.join(KOREN, "api", "data", "matura-slovenscina.json"), encoding="utf-8"))
IZHOD = os.path.join(KOREN, "api", "data", "matura-poklicna_slovenscina.json")

from snovi import SNOVI  # noqa: E402

NASLOVI = {slug: naslov for _, slug, naslov, _ in SNOVI["poklicna_slovenscina"]}

# (leto PM, rok PM) ← vadbena pola 2 splošne mature
ROKI = [
    (2026, "spomladanski", "slovenscina-2026-spomladanski-2"),
    (2025, "spomladanski", "slovenscina-2025-spomladanski-2"),
    (2025, "jesenski", "slovenscina-2025-jesenski-2"),
    (2025, "zimski", "slovenscina-2023-jesenski-2"),
    (2024, "spomladanski", "slovenscina-2024-spomladanski-2"),
    (2024, "jesenski", "slovenscina-2022-jesenski-2"),
    (2024, "zimski", "slovenscina-2021-jesenski-2"),
    (2023, "spomladanski", "slovenscina-2020-jesenski-2"),
]
IME_ROKA = {"spomladanski": "spomladanski rok", "jesenski": "jesenski rok", "zimski": "zimski rok"}


def pm_poglavja(n, tvorba):
    """Poglavja splošne mature → snovi poklicne mature."""
    if tvorba:
        return ["tvorba_besedila"]
    tema = set(n.get("tema", []))
    out = []
    for p in n["poglavje"]:
        if p == "besedilo":
            q = "uradna_javna_besedila" if "uradna" in tema else "publicisticna_strokovna" if tema & {"publicisticna", "strokovna"} else "razclemba_besedila"
        elif p == "jezik_sporazumevanje":
            q = "razclemba_besedila"
        elif p == "besedje":
            q = "besedje_pm"
        elif p in ("skladnja", "oblikoslovje"):
            q = "skladnja_pm"
        elif p in ("pravopis", "glasoslovje_pravorecje"):
            q = "pravopis_slog_pm"
        elif p == "jezikovne_zvrsti":
            q = "pravopis_slog_pm" if tema & {"knjizni", "neknjizni", "funkcijske", "interesne"} else "jezik_v_druzbi"
        else:
            q = "razclemba_besedila"
        if q not in out:
            out.append(q)
    return out


def snov(poglavje):
    return f"/views/poklicna_slovenscina/snov/{poglavje}/{poglavje}_razlaga.html", NASLOVI[poglavje]


def tocke_txt(t):
    return "1 točka" if t == 1 else "2 točki" if t == 2 else f"{t} točke" if t <= 4 else f"{t} točk"


def pola1(leto, rok, sm_id):
    sm = next(p for p in SM if p["id"] == sm_id)
    naloge, tvorba = sm["naloge"][:-1], sm["naloge"][-1]
    # izpustimo najzahtevnejše naloge (največ točk), dokler razčlemba ne obsega največ 46 točk
    izbrane = list(naloge)
    while sum(int(n["tocke"]) for n in izbrane) > 46:
        izbrane.remove(max(izbrane, key=lambda n: (int(n["tocke"]), naloge.index(n))))
    t_tvorba = 60 - sum(int(n["tocke"]) for n in izbrane)
    assert 12 <= t_tvorba <= 18, (sm_id, t_tvorba)
    out = []
    for i, n in enumerate(izbrane + [tvorba], 1):
        je_tvorba = n is tvorba
        pogl = pm_poglavja(n, je_tvorba)
        url, naslov = snov(pogl[0])
        star = re.escape(str(n["id"]))
        prestevilci = lambda t: re.sub(rf"(?<![\d.]){star}\.(\d+)\.", rf"{i}.\1.", t)
        x = {"id": str(i), "poglavje": pogl, "snov": url, "snovNaslov": naslov,
             "tocke": t_tvorba if je_tvorba else int(n["tocke"]), "besedilo": prestevilci(n["besedilo"]),
             "rezultat": prestevilci(n["rezultat"]), "razlaga": prestevilci(n["razlaga"])}
        if n.get("priloga"):
            x["priloga"] = True
        out.append(x)
    st = len(out)
    priloga = sm.get("priloga", "")
    priloga = re.sub(r"Priloga k izpitni poli 2 \(vadbena pola \d+\)", "Izhodiščno besedilo k izpitni poli 1", priloga)
    return {
        "id": f"poklicna_slovenscina-{leto}-{rok}-1", "predmet": "poklicna_slovenscina", "raven": "enotna",
        "leto": leto, "rok": rok, "izvedba": 1, "pdf": None, "stevilka": 1,
        "naslov": f"Slovenščina, poklicna matura, {IME_ROKA[rok]} {leto}, izpitna pola 1: razčlemba in tvorba (vadbena pola Učilnica.com)",
        "navodilo": f"60 minut, 60 točk (dosežek se deli z 1,5). Naloge se nanašajo na izhodiščno besedilo; zadnja naloga je tvorba krajšega neumetnostnega besedila ({t_tvorba} točk). Dovoljen pripomoček: nalivno pero ali kemični svinčnik.",
        "vir": "Vadbena pola Učilnica.com. Zgradba in točkovanje sledita predmetnemu izpitnemu katalogu za poklicno maturo (izpitna pola 1), izhodiščno besedilo, naloge in rešitve so naši. Uradne pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.",
        "priloga": priloga,
        "naloge": out,
    }


def rokopis(deli):
    """deli: '## naslov' ali (vsebina, komentar)."""
    h = []
    for d in deli:
        if isinstance(d, str):
            h.append(f'<div class="rk-korak rk-naslov"><div class="rk-v">{d[3:]}</div></div>')
        else:
            h.append(f'<div class="rk-korak"><div class="rk-v">{d[0]}</div><div class="rk-kom">{d[1]}</div></div>')
    return '<div class="rokopis">' + "".join(h) + "</div>"


# Izpitna pola 2: (leto, rok, poglavje, avtor in delo, odlomek, vprašanja, rezultat, razlaga)
POLE2 = [
    (2026, "spomladanski", "moderna_pm", "Ivan Cankar: Na klancu",
     "Odlomek iz prvega poglavja romana (Romanje): mala Francka med romanjem teče za vozom, na katerem se peljejo drugi otroci, in ga ne dohiti.",
     ["Predstavite avtorja, obdobje, v katerem je roman nastal, in vrsto besedila. Na kratko povzemite odlomek.",
      "Označite Francko v odlomku: kaj si želi, kako se odzove okolica in kaj doživlja.",
      "Pojasnite simbolni pomen teka za vozom in klanca. Kako se motiv pozneje v romanu ponovi?",
      "Pokažite dve jezikovno-slogovni značilnosti odlomka (npr. ponavljanje, pridevniki, subjektivno pripovedovanje) in njun učinek.",
      "Presodite, ali je usoda ljudi »s klanca« vnaprej določena, in svoje mnenje povežite s sedanjostjo."],
     "Interpretacija umesti roman v slovensko moderno (1902), označi Francko kot otroka, ki hrepeni po skupnosti, a ostane izključen, razloži tek za vozom kot vodilni motiv neuresničenega upanja in klanec kot simbol revščine, pokaže ponavljanje in čustveno obarvane besede ter z utemeljitvijo presodi vpliv okolja danes.",
     [("## Uvod (ZR)", None),
      ("Ivan Cankar, Na klancu (1902), roman slovenske moderne; združuje realistične in simbolistične prvine.", "Avtor, delo, obdobje in vrsta besedila prinesejo točke za znanje in razumevanje."),
      ("Odlomek: Francka med romanjem teče za vozom, ga ne dohiti in ostane sama ob cesti.", "Povzetek naj bo kratek (2–3 povedi), brez obnove celega romana."),
      ("## Jedro (RR, PDS)", None),
      ("Francka: želja po pripadnosti, sram, trma, bolečina; otroci in odrasli se zanjo ne zmenijo.", "Vsako lastnost podpreš z navedkom ali opisom iz odlomka."),
      ("Tek za vozom = vodilni motiv: ponovi se pri Franckinem življenju (Tone odide, sin Lojze …), vedno zaman.", "Povezava odlomka s celim romanom je ključna za višjo oceno."),
      ("Klanec = simbol revščine in socialnega dna, s katerega se ni mogoče rešiti.", "Simbol razložiš, ne le poimenuješ."),
      ("Slog: ponavljanje, stopnjevanje, čustveno nabite besede, pripovedovalec sočustvuje.", "Učinek: bralec doživi Franckino stisko."),
      ("Primerjava: Meta v Samorastnikih tudi ostane na robu družbe, a vztraja.", "Primer iz drugega dela ali iz življenja (PDS)."),
      ("## Sklep (SV)", None),
      ("Usoda ni povsem vnaprej določena, okolje pa jo močno omejuje; danes izobrazba odpre več poti, revščina pa še vedno zmanjša možnosti.", "Presoja + aktualizacija. Preštej besede: vsaj 400.")]),
    (2025, "spomladanski", "romantika_realizem_pm", "France Prešeren: Zdravljica",
     "Celotna pesem Zdravljica (v berilu); posebej se osredinite na 7. kitico: »Žive naj vsi narodi, / ki hrepene dočakat' dan, / da, koder sonce hodi, / prepir iz sveta bo pregnan, …«",
     ["Predstavite pesnika, obdobje in okoliščine nastanka pesmi (cenzura, objava leta 1848).",
      "Razložite zgradbo pesmi: število kitic, oblika kitice (čaša), kdo nagovarja koga.",
      "Pojasnite nacionalno in politično idejo pesmi: kaj si pesnik želi za Slovence in za vse narode.",
      "Na primeru 7. kitice razložite, zakaj je postala slovenska himna.",
      "Presodite, ali je sporočilo pesmi aktualno danes v Evropi in svetu."],
     "Interpretacija predstavi Prešerna in romantiko, pojasni, da je pesem nastala 1844, zaradi cenzure izšla 1848, opiše 8 kitic v obliki čaše in napitnico kot vrsto, razloži idejo zedinjenja Slovencev, svobode in miru med narodi, utemelji izbiro 7. kitice za himno ter ovrednoti sporočilo danes.",
     [("## Uvod (ZR)", None),
      ("France Prešeren (1800–1849), največji slovenski romantični pesnik; Zdravljica je napitnica (lirska pesem).", "Zvrst: lirika, vrsta: napitnica, domovinska in politična pesem."),
      ("Nastala 1844, cenzura je ni dovolila, objavljena 1848 v Kmetijskih in rokodelskih novicah.", "Okoliščine nastanka so del znanja in razumevanja."),
      ("## Jedro (RR, PDS)", None),
      ("Zgradba: 8 kitic; vsaka je oblikovana kot čaša (grafična pesem); pesnik nagovarja prijatelje pri zdravici.", "Opis zunanje zgradbe."),
      ("Ideje: zedinjena Slovenija, svoboda, enakopravnost, pogum mladih, lepota slovenskih deklet, mir med narodi.", "Razvrsti ideje po kiticah: od domovine do vseh narodov."),
      ("7. kitica: želja, naj bodo vsi narodi svobodni in se ne bojujejo, ampak živijo kot sosedje.", "Navedek iz kitice vključi v poved in ga razloži."),
      ("Himna od 1989 (ustava 1991): poudarja mir in sožitje, ne vojaške moči.", "Utemeljitev, zakaj je kitica primerna za himno."),
      ("Primerjava: tudi Vodnikovo Dramilo spodbuja narod, a k delu, ne k svobodi narodov.", "Primer iz drugega dela (PDS)."),
      ("## Sklep (SV)", None),
      ("Sporočilo je aktualno: v Evropi in svetu še vedno potekajo vojne, EU pa temelji prav na sožitju narodov.", "Aktualizacija in osebna presoja; vsaj 400 besed.")]),
    (2025, "jesenski", "knjizevnost_prva_polovica", "Franz Kafka: Preobrazba",
     "Začetek novele: Gregor Samsa se nekega jutra prebudi kot ogromen hrošč in najprej razmišlja o službi in zamujenem vlaku.",
     ["Predstavite avtorja, obdobje in vrsto besedila.",
      "Povzemite odlomek in označite Gregorja: na kaj misli najprej in zakaj je to nenavadno.",
      "Razložite, kako je pripovedovano: vrsta pripovedovalca, ton, razmerje med nenavadnim dogodkom in vsakdanjim pripovedovanjem.",
      "Pojasnite možne simbolne pomene preobrazbe.",
      "Presodite, ali se ljudje tudi danes »spremenijo v hrošče«, ko jih družina ali služba vidi le kot vir zaslužka."],
     "Interpretacija umesti Preobrazbo (1915) v modernizem, označi Gregorja kot trgovskega potnika, ki skrbi za družino in ob preobrazbi najprej misli na službo, razloži hladen, stvaren način pripovedovanja o groteskni preobrazbi, pojasni preobrazbo kot simbol odtujenosti in izkoriščanja ter jo poveže s sedanjostjo.",
     [("## Uvod (ZR)", None),
      ("Franz Kafka (1883–1924), praški pisatelj, ki je pisal v nemščini; Preobrazba (1915) je novela, pripovedna groteska.", "Avtor, vrsta, obdobje (modernizem)."),
      ("## Jedro (RR, PDS)", None),
      ("Gregor je trgovski potnik, ki s plačo vzdržuje starše in sestro; po preobrazbi skrbi le, da bo zamudil vlak in izgubil službo.", "Nenavadnost: ne preseneti ga telo, ampak službene skrbi."),
      ("Pripovedovalec v 3. osebi, ki gleda skozi Gregorjeve oči; ton je miren, stvaren, kot da gre za vsakdanji dogodek.", "Prav nasprotje med grozo in mirnim tonom ustvari grotesknost."),
      ("Simbolni pomeni: odtujenost, izguba človeške vrednosti, ko človek ne more več delati; krivda; odnos z očetom.", "Navedi vsaj dva pomena in ju utemelji z dogajanjem."),
      ("Primerjava: Cankarjev Kačur se tudi »zlomi« pod pritiski okolja.", "Primer iz drugega dela ali življenja."),
      ("## Sklep (SV)", None),
      ("Danes ljudje izgorijo v službi, starejši ali bolni pa se počutijo odveč; preobrazba je zato tudi naša zgodba.", "Aktualizacija in presoja; vsaj 400 besed.")]),
    (2025, "zimski", "moderna_pm", "Dragotin Kette: Na trgu",
     "Celotna pesem Na trgu (v berilu): lirski subjekt ponoči na trgu pod dekletovim oknom izraža svoje hrepenenje.",
     ["Predstavite pesnika in obdobje slovenske moderne.",
      "Opredelite vrsto pesmi (podoknica) in povzemite, kaj lirski subjekt doživlja.",
      "Poiščite impresionistične prvine: čutne vtise, razpoloženje, zvočne učinke.",
      "Razložite, kateri motivi so simbolni in kaj pomenijo.",
      "Presodite, kako bi danes izrazili podobno hrepenenje in ali ima podoknica še mesto v našem času."],
     "Interpretacija predstavi Ketteja kot pesnika slovenske moderne, pesem opredeli kot podoknico (ljubezenska lirika), opiše nočno razpoloženje na trgu, poišče impresionistične vtise (zvoki, svetloba, tišina), razloži simbolne motive in pesem aktualizira.",
     [("## Uvod (ZR)", None),
      ("Dragotin Kette (1876–1899), pesnik slovenske moderne (z Murnom, Župančičem in Cankarjem).", "Obdobje in avtor."),
      ("Pesem Na trgu je podoknica: ljubezenska pesem, ki jo fant poje pod dekletovim oknom.", "Vrsta pesmi in kratek povzetek."),
      ("## Jedro (RR, PDS)", None),
      ("Motivi: noč, trg, okno, dekle, hrepenenje.", "Motive navedeš in razvrstiš po pomenu."),
      ("Impresionizem: čutni vtisi (zvoki, svetloba, temà), razpoloženje je pomembnejše od dogajanja.", "Vsak vtis podpreš s primerom iz pesmi."),
      ("Zvočni učinki: ponavljanje glasov, rima in ritem ustvarjajo melodijo podoknice.", "Učinek: pesem je spevna, skoraj kot glasba."),
      ("Simboli: noč kot čas hrepenenja in samote; okno kot meja med lirskim subjektom in dekletom.", "Razlaga simbolov (RR)."),
      ("Primerjava: Murnov Sneg tudi gradi razpoloženje z naravnimi podobami.", "Primer iz drugega dela."),
      ("## Sklep (SV)", None),
      ("Hrepenenje po ljubljeni osebi je večno, danes ga izražamo s sporočili in pesmimi na spletu.", "Aktualizacija; vsaj 400 besed.")]),
    (2024, "spomladanski", "moderna_pm", "Ivan Cankar: Hlapci",
     "Prizor, v katerem se učitelj Jerman sooči z župnikom in odkloni, da bi se zaradi službe odpovedal svojemu prepričanju.",
     ["Predstavite avtorja, dramo in družbeno-zgodovinsko ozadje (volitve leta 1907).",
      "Povzemite prizor in označite Jermana ter župnika: kaj zagovarja vsak od njiju.",
      "Razložite, kaj v drami pomeni hlapčevstvo in koga Jerman imenuje hlapce.",
      "Pokažite dve značilnosti jezika drame (repilke, ironija, satira) in njun učinek.",
      "Presodite aktualnost drame: kje danes vidite hlapčevstvo?"],
     "Interpretacija umesti Hlapce (1910) v moderno, razloži politično ozadje (zmaga klerikalcev na volitvah), označi Jermana kot idealista, ki zagovarja svobodo misli, in župnika kot predstavnika oblasti, razloži hlapčevstvo kot prilagajanje vsakokratni oblasti, pokaže satirične prvine in dramo aktualizira.",
     [("## Uvod (ZR)", None),
      ("Ivan Cankar (1876–1918), Hlapci (1910), drama v petih dejanjih; satirična družbena drama slovenske moderne.", "Avtor, zvrst (dramatika), vrsta, obdobje."),
      ("Ozadje: po volitvah leta 1907 učitelji, ki so prej zagovarjali svobodomiselne ideje, prestopijo k zmagovalcem.", "Družbeno-zgodovinsko ozadje."),
      ("## Jedro (RR, PDS)", None),
      ("Jerman: idealist, zagovarja svobodo misli in poštenost, pripravljen je izgubiti službo.", "Označitev z navedkom iz prizora."),
      ("Župnik: miren, prepričljiv predstavnik oblasti, ponuja kompromis v zameno za pokorščino.", "Nasprotje med osebama je jedro prizora."),
      ("Hlapčevstvo: prilagajanje mnenja tistemu, ki ima moč; Jerman ga očita sodelavcem in narodu.", "Razlaga ključnega pojma drame."),
      ("Jezik: ostre repilke, ironija, satirično prikazani učitelji.", "Dve prvini z učinkom."),
      ("Primerjava: tudi Antigona se upre oblasti zaradi prepričanja.", "Primer iz drugega dela."),
      ("## Sklep (SV)", None),
      ("Hlapčevstvo danes: molk zaradi strahu za službo, prilagajanje mnenja na družbenih omrežjih; Jerman ostaja zgled poguma.", "Aktualizacija; vsaj 400 besed.")]),
    (2024, "jesenski", "knjizevnost_prva_polovica", "Prežihov Voranc: Samorastniki",
     "Odlomek, v katerem se dekla Meta sooči s starim Hudabivškom, ki ne dovoli, da bi se njegov sin Ožbej poročil z njo.",
     ["Predstavite avtorja, zbirko in smer socialnega realizma.",
      "Povzemite prizor in označite Meto ter starega Hudabivška.",
      "Razložite, kako se v prizoru kaže družbena razslojenost na koroškem podeželju.",
      "Pojasnite simbolni pomen naslova Samorastniki.",
      "Presodite, ali bi bila Metina zgodba mogoča tudi danes."],
     "Interpretacija predstavi Prežihovega Voranca in socialni realizem (zbirka Samorastniki, 1940), označi Meto kot ponosno, trdno ženo in Hudabivška kot trdega gospodarja, razloži prepad med bogatimi kmeti in deklami, pojasni naslov kot podobo otrok, ki rastejo brez pomoči, a so trdni, ter zgodbo aktualizira.",
     [("## Uvod (ZR)", None),
      ("Lovro Kuhar - Prežihov Voranc (1893–1950), novela Samorastniki iz istoimenske zbirke (1940); socialni realizem.", "Avtor, vrsta (novela), smer."),
      ("## Jedro (RR, PDS)", None),
      ("Meta: dekla, ki ljubi Hudabivškovega sina Ožbeja; ponosna, vztrajna, sama skrbi za otroke.", "Označitev z dejanji iz prizora."),
      ("Stari Hudabivšek: bogat gospodar, ki ne dopusti, da bi sin vzel deklo; Meto ponižuje.", "Nasprotje med osebama."),
      ("Razslojenost: premoženje odloča o poroki in časti; dekle in njihovi otroci so brez pravic.", "Družbeno ozadje, podprto z navedkom."),
      ("Naslov: samorastniki so otroci, ki rastejo kot drevesa brez nege, a so trdni in preživijo.", "Simbol razložiš in povežeš z Meto."),
      ("Jezik: koroške narečne besede, epske in dramatske prvine.", "Jezikovno-slogovna prvina."),
      ("Primerjava: Francka v Na klancu je prav tako žrtev revščine.", "Primer iz drugega dela."),
      ("## Sklep (SV)", None),
      ("Danes zakon varuje otroke ne glede na izvor, a revščina in predsodki še vedno ločujejo ljudi.", "Aktualizacija; vsaj 400 besed.")]),
    (2024, "zimski", "knjizevnost_do_razsvetljenstva", "Sofoklej: Antigona",
     "Prizor, v katerem Kreon zasliši Antigono, ki je kljub prepovedi pokopala brata Polinejka, in ona zagovarja svoje dejanje.",
     ["Predstavite avtorja, antično gledališče in mitološko podlago drame.",
      "Povzemite prizor: kaj je Antigona storila in zakaj jo Kreon obtoži.",
      "Primerjajte Antigonino in Kreontovo stališče: kateri zakon zagovarja vsak od njiju.",
      "Razložite vzroke tragičnosti v drami.",
      "Presodite, kdaj je prav, da posameznik ne uboga zakona države."],
     "Interpretacija predstavi Sofokleja in antično tragedijo, razloži tebanski mit (Ojdipovi otroci), povzame prizor zaslišanja, primerja Antigonin božji (nenapisani) in Kreontov državni zakon, razloži tragičnost (spopad dveh upravičenih vrednot, Kreontova trma) in vrednoti pravico do ugovora vesti danes.",
     [("## Uvod (ZR)", None),
      ("Sofoklej (5. st. pr. n. št.), antična grška tragedija Antigona; mitološka podlaga je usoda Ojdipove družine.", "Avtor, zvrst, vrsta, gledališče (zbor, maske, amfiteater)."),
      ("Polinejk je napadel Tebe; Kreon je prepovedal pokop, Antigona ga je kljub temu pokopala.", "Kratek povzetek prizora."),
      ("## Jedro (RR, PDS)", None),
      ("Antigona: zvestoba bratu in božjim, nenapisanim zakonom; pogumna, neuklonljiva.", "Navedek iz njenega zagovora."),
      ("Kreon: red v državi in zakon vladarja; ne prenese ugovora, sploh od ženske.", "Primerjava stališč."),
      ("Tragičnost: obe strani imata razloge; Kreontova trma vodi v smrt Antigone, Hajmona in Evridike.", "Vzroki tragičnosti: značaj in spopad vrednot."),
      ("Primerjava: Smoletova Antigona prenese spor v sodobni čas.", "Primer iz drugega dela."),
      ("## Sklep (SV)", None),
      ("Posameznik sme ugovarjati zakonu, ki krši temeljne človeške pravice, a mora sprejeti posledice; primeri ugovora vesti danes.", "Aktualizacija; vsaj 400 besed.")]),
    (2023, "spomladanski", "romantika_realizem_pm", "Josip Jurčič: Deseti brat",
     "Odlomek, v katerem pripovedovalec prvič predstavi skrivnostnega Martinka Spaka, desetega brata.",
     ["Predstavite avtorja in pomen romana za slovensko književnost.",
      "Povzemite odlomek in označite Martinka Spaka (zunanjost, govor, vedenje).",
      "Razložite ljudsko vražo o desetem bratu in njeno vlogo v romanu.",
      "Poiščite romantične in realistične prvine v odlomku.",
      "Presodite, kako družba danes ravna z ljudmi, ki so drugačni ali brez doma."],
     "Interpretacija predstavi Jurčiča in Desetega brata (1866) kot prvi slovenski roman, označi Martinka kot skrivnostnega, nenavadnega potepuha z modrimi besedami, razloži vražo, da mora deseti brat od doma, loči romantične (skrivnost, usoda, nenavadna oseba) in realistične prvine (kmečko okolje, ljudje) ter Martinkov položaj aktualizira.",
     [("## Uvod (ZR)", None),
      ("Josip Jurčič (1844–1881), Deseti brat (1866), prvi slovenski roman; Levstikovo Popotovanje od Litije do Čateža je spodbudilo pisanje iz domačega okolja.", "Avtor, delo, pomen."),
      ("## Jedro (RR, PDS)", None),
      ("Martinek Spak: nenavaden, raztrgan potepuh, govori v prispodobah, je moder in skrivnosten.", "Označitev z opisom iz odlomka."),
      ("Vraža: deseti sin v družini mora od doma in živeti kot potepuh; Martinek je nezakonski sin graščaka Piškava.", "Vloga vraže in skrivnosti v zgodbi."),
      ("Romantične prvine: skrivnost, usoda, nenavadna oseba, zapleti; realistične: opisi kmečkega življenja in značajev.", "Obe vrsti prvin s primeri."),
      ("Primerjava: Tavčarjeva Visoška kronika tudi zgradi zgodbo na družinski skrivnosti.", "Primer iz drugega dela."),
      ("## Sklep (SV)", None),
      ("Danes so brezdomci in drugačni pogosto odrinjeni; Martinek pokaže, da ima vsak človek dostojanstvo.", "Aktualizacija; vsaj 400 besed.")]),
]


def pola2(leto, rok, poglavje, delo, odlomek, vprasanja, rezultat, razlaga):
    v = "".join(f"<li>{x}</li>" for x in vprasanja)
    besedilo = (f'<p class="pola-naslov-naloge"><strong>VODENA INTERPRETACIJA</strong></p>'
                f'<p class="sl-delo">{delo}</p>'
                f"<p>{odlomek}</p>"
                f"<p>Odlomek preberite v berilu ali v svoji izdaji. Napišite interpretacijo v obliki povezanega besedila (najmanj 400 besed). V njej upoštevajte naslednje:</p>"
                f"<ol>{v}</ol>"
                f"<p>Ocenjujejo se znanje in razumevanje, razčlemba in razlaga, predstavitev dejstev in stališč, sinteza in vrednotenje ter jezikovna pravilnost in slogovna ustreznost (po 6 točk).</p>")
    url, naslov = snov(poglavje)
    naloga = {"id": "1", "poglavje": ["interpretacija_pm", poglavje], "snov": url, "snovNaslov": naslov, "tocke": 30, "tip": "esej",
              "besedilo": besedilo, "rezultat": rezultat,
              "razlaga": rokopis([d[0] if d[1] is None else d for d in razlaga])}
    return {
        "id": f"poklicna_slovenscina-{leto}-{rok}-2", "predmet": "poklicna_slovenscina", "raven": "enotna",
        "leto": leto, "rok": rok, "izvedba": 1, "pdf": None, "stevilka": 2,
        "naslov": f"Slovenščina, poklicna matura, {IME_ROKA[rok]} {leto}, izpitna pola 2: interpretacija (vadbena pola Učilnica.com)",
        "navodilo": "60 minut, 30 točk. Vodena interpretacija (odlomka) umetnostnega besedila v obliki povezanega besedila, najmanj 400 besed. Dovoljen pripomoček: nalivno pero ali kemični svinčnik.",
        "vir": "Vadbena pola Učilnica.com. Zgradba in merila sledijo predmetnemu izpitnemu katalogu za poklicno maturo (izpitna pola 2), besedilo je s seznama za poklicno maturo, navodila in vzorčna rešitev so naši. Uradne pole izdaja Državni izpitni center (RIC).",
        "naloge": [naloga],
    }


if __name__ == "__main__":
    pole = []
    for leto, rok, sm_id in ROKI:
        pole.append(pola1(leto, rok, sm_id))
        p2 = next(p for p in POLE2 if p[0] == leto and p[1] == rok)
        pole.append(pola2(*p2))
    with open(IZHOD, "w", encoding="utf-8") as f:
        f.write("[\n" + ",\n".join(json.dumps(p, ensure_ascii=False) for p in pole) + "\n]\n")
    print(f"{len(pole)} pol, {sum(len(p['naloge']) for p in pole)} nalog")
    for p in pole:
        print(p["id"], len(p["naloge"]), sum(n["tocke"] for n in p["naloge"]))
