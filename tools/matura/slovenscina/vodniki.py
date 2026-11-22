# Splošna navodila za pisne naloge mature iz slovenščine (esej in odprta naloga pole 2).
# Uporablja jih gradi.py: vsak esej in vsaka odprta naloga dobi pod postopkom razdelek
# »Kako se lotiš naloge« (zgradba, merila, nasveti, pogoste napake), kontrolni seznam iz
# navodila naloge in zgledno besedilo iz dopolnitve.
#
# Vodnik je seznam (naslov, [alineje]); alineja je niz z oznakami **krepko** in //ležeče//.

ESEJ_SKUPNO = [
    ("Kaj ocenjevalci gledajo", [
        "**Vsebina**: ali si odgovoril na **vsa** vprašanja iz navodila, ali so podatki o delih pravilni (avtor, naslov, "
        "osebe, dogajanje), ali vsako trditev podpreš z **zgledom iz besedila** in ali razmišljaš samostojno, ne le obnavljaš.",
        "**Zgradba**: uvod, jedro in sklep; vsak odstavek ima eno glavno misel; odstavki so med seboj povezani "
        "(povezovalci, navezovanje na prejšnjo misel); esej se drži naslova in teze.",
        "**Jezik in slog**: pravopis (velika začetnica, vejice), slovnica (skloni, dvojina, glagolski časi), besedni red, "
        "knjižni zborni jezik brez pogovornih izrazov, raznoliko besedišče.",
        "**Obseg**: esej, ki je krajši od predpisanega števila besed, izgubi točke. Besede prešteješ na koncu.",
    ]),
    ("Kako si razdeliš 120 minut", [
        "**10 minut**: navodilo dvakrat prebereš, vprašanja oštevilčiš in podčrtaš ključne besede (predstavite, primerjajte, "
        "pojasnite, presodite). Vsako vprašanje bo en odstavek ali del odstavka.",
        "**15 minut**: načrt. Ob vsako vprašanje napišeš 2–3 misli in prizor iz dela, s katerim jih boš dokazal. "
        "Napišeš tezo: eno poved, ki odgovori na problem iz naslova.",
        "**75–80 minut**: pisanje na čisto, odstavek za odstavkom po vrstnem redu vprašanj.",
        "**15 minut**: pregled (začetnice, vejice pred da, ki, ker, ko; skloni lastnih imen; naslovi del) in štetje besed.",
    ]),
    ("Kako zgradiš odstavek v jedru", [
        "**Trditev**: prva poved odstavka odgovori na vprašanje (npr. »Francka se revščine skuša rešiti s pridnim delom.«).",
        "**Zgled**: navedeš konkreten prizor, dogodek ali kratek navedek (»To se pokaže, ko …«).",
        "**Razlaga**: poveš, kaj zgled dokazuje in zakaj je pomemben (»S tem pisatelj pokaže, da …«).",
        "**Povezava**: zadnja poved odstavek poveže s tezo ali z naslednjim odstavkom.",
    ]),
    ("Pogoste napake (zaradi njih izgubiš največ točk)", [
        "**Obnova namesto razlage**: zgodbe ne pripoveduješ po vrsti; iz nje vzameš le prizore, ki dokazujejo tvojo trditev.",
        "**Izpuščeno vprašanje** ali vprašanje, odpravljeno z eno samo povedjo.",
        "**Mnenje brez utemeljitve**: »Delo mi je bilo všeč« ne prinese točk; »… ker …« in zgled ju prineseta.",
        "**Pogovorni jezik** (ful, itak, zgleda, glih) in osebni nagovori (ti, vi) v eseju.",
        "**Napačen čas**: vsebino del povzemaš v **sedanjiku** (Francka teče za vozom), o nastanku dela pišeš v pretekliku.",
        "**Pisanje v alinejah**: esej je sklenjeno besedilo v celih povedih in odstavkih.",
    ]),
]

ESEJ = {
    "razpravljalni": [
        ("Kaj je razpravljalni esej", [
            "V razpravljalnem eseju razmišljaš o **problemu iz naslova** (npr. zaznamovanost z izvorom, svoboda, krivda) "
            "ob **dveh delih** iz maturitetnega sklopa. Ne pišeš o vsakem delu posebej, ampak ju ves čas **primerjaš**: "
            "kaj je v obeh delih podobno in kaj različno.",
            "Navodilo ima navadno 4–6 vprašanj. Prva zahtevajo **predstavitev** (osebe, okoliščine), srednja **primerjavo in "
            "razlago**, zadnji dve **presojo** (tvoje utemeljeno mnenje) in **aktualizacijo** (povezava z današnjim časom).",
        ]),
        ("Zgradba eseja (okvirni obseg pri 600 besedah)", [
            "**Uvod (60–90 besed)**: predstaviš problem iz naslova, obe deli (avtor, naslov, obdobje ali smer) in napišeš "
            "**tezo**: eno poved, ki že nakaže tvoj odgovor. Uvod ne obnavlja zgodbe.",
            "**Jedro (3–4 odstavki, skupaj 400–450 besed)**: vsak odstavek odgovori na eno vprašanje iz navodila, po vrsti. "
            "V vsakem odstavku omeniš **obe deli** in uporabiš primerjalne povezovalce: //podobno kot//, //za razliko od//, "
            "//medtem ko//, //oba//, //pri obeh//.",
            "**Sklep (80–100 besed)**: odgovoriš na vprašanje o presoji (če ga nisi že v jedru), na aktualizacijsko vprašanje "
            "in se vrneš k tezi. V sklep ne dodajaš novih podatkov o delih.",
        ]),
        ("Uporabni začetki povedi", [
            "Uvod: //Vprašanje, ali …, je staro toliko kot književnost sama.// · //Obe deli odgovarjata na to vprašanje drugače.//",
            "Primerjava: //Medtem ko se Francka …, Eva …// · //Obe junakinji druži …// · //Bistvena razlika je v tem, da …//",
            "Utemeljitev: //To najbolje pokaže prizor, v katerem …// · //Pisatelj s tem poudari, da …//",
            "Presoja: //Menim, da je bolj usodna …, ker …// · //Prepričljivejši se mi zdi …, saj …//",
            "Aktualizacija: //Tudi danes …// · //Iz lastne izkušnje vem, da …//",
        ]),
    ],
    "interpretativni": [
        ("Kaj je razlagalni (interpretativni) esej", [
            "V interpretativnem eseju razlagaš **en odlomek** iz enega dela. Odlomek moraš **umestiti** v celo delo "
            "(kaj se je zgodilo prej, kaj sledi), razložiti dogajanje in osebe v njem ter pokazati, **kako** je napisan "
            "(jezikovno-slogovna sredstva) in **kaj** to pomeni za delo kot celoto.",
            "Navodilo vodi od umestitve prek razlage in sloga do tvojega **vrednotenja** (npr. ali je prizor prepričljiv, "
            "kaj ti je ostalo v spominu).",
        ]),
        ("Zgradba eseja (okvirni obseg pri 600 besedah)", [
            "**Uvod (60–80 besed)**: avtor, delo, obdobje ali smer, tema dela; nato poveš, o katerem odlomku boš pisal.",
            "**Umestitev (80–100 besed)**: na kratko, kaj se zgodi pred odlomkom in zakaj je odlomek pomemben (vrh, preobrat, "
            "začetek, konec). Ne obnavljaj vsega dela.",
            "**Razlaga odlomka (200–250 besed)**: kaj se dogaja, kakšne so osebe, kakšen je njihov odnos; vsako trditev "
            "podpreš z navedkom ali opisom mesta v odlomku.",
            "**Jezik in slog (100–150 besed)**: vsaj tri sredstva (npr. ponavljanje, vzklik, primera, simbol, kratke povedi, "
            "premi govor). Za vsako navedeš **zgled** in **učinek** (kaj ob tem občuti bralec).",
            "**Sklep z vrednotenjem (80–100 besed)**: odgovoriš na zadnje vprašanje navodila in svoje mnenje utemeljiš.",
        ]),
        ("Kako razložiš slogovno sredstvo", [
            "Sredstva ni dovolj našteti. Uporabi vzorec **sredstvo → zgled → učinek**: //Pisatelj trikrat ponovi besedo "
            "»klanec« (ponavljanje), s čimer poudari, da se Francka iz revščine ne more izviti.//",
            "Simbol vedno razložiš: kaj predmet ali prostor pomeni dobesedno in kaj **preneseno** (klanec = pot navzdol, revščina).",
        ]),
    ],
}

# ---------------------------------------------------------------- odprta naloga pole 2
ODPRTA_SKUPNO = [
    ("Kaj ocenjevalci gledajo", [
        "**Vsebina**: vsaka zahteva iz navodila (npr. »navedite dva razloga«, »predlagajte termin«) je ena ali več točk. "
        "Če zahteva manjka, točke izgubiš, tudi če je besedilo sicer odlično. Kjer navodilo reče »dva«, napiši **dva jasno ločena**.",
        "**Zgradba in oblika**: besedilna vrsta ima predpisane dele (pri uradnem dopisu glava, zadeva, nagovor, pozdrav, podpis; "
        "pri novici naslov in odgovori na vprašanja kdo, kaj, kdaj, kje). Besedilo je razdeljeno na odstavke.",
        "**Slog**: ustrezen naslovniku in namenu (uradno, vljudno, jedrnato; brez pogovornih besed in čustvenih pretiravanj).",
        "**Jezikovna pravilnost**: pravopis, slovnica, ločila. Ta del prinese veliko točk, zato pusti 5 minut za pregled.",
        "**Obseg**: preštej besede **osrednjega dela** (brez glave, pozdrava in podpisa). Premalo besed pomeni odbitek.",
    ]),
    ("Postopek v 20–25 minutah", [
        "Navodilo preberi in **vsako zahtevo podčrtaj ter oštevilči**. To je tvoj kontrolni seznam (za to nalogo je pripravljen zgoraj).",
        "V nekaj besedah si zapiši, kaj boš napisal pri vsaki zahtevi. Manjkajoče podatke (imena, datume, naslove) si izmisli, "
        "a naj bodo verjetni.",
        "Napiši besedilo: vsaka zahteva dobi svoj odstavek ali vsaj svojo poved.",
        "Preveri: ali je vsaka zahteva odkljukana, ali so začetnice in vejice pravilne, ali je dovolj besed.",
    ]),
]

URADNI_DOPIS = (
    "**Glava**: levo zgoraj pošiljatelj (ime, priimek, funkcija, ustanova, naslov), pod njim ali desno kraj in datum "
    "(//Ljubljana, 3. 3. 2026//), nato naslovnik (naziv, ime, ustanova, naslov). Sledi **zadeva**: kratka samostalniška "
    "zveza brez glagola in brez pike (//Zadeva: Prošnja za predavanje//).",
    "**Nagovor**: //Spoštovani gospod …,// / //Spoštovana gospa …,// ali //Spoštovani,//. Za nagovorom je vejica, "
    "besedilo se nadaljuje v novi vrstici z **malo** začetnico.",
    "**Zaključek**: prošnja za odgovor ali potrditev, zahvala vnaprej, pozdrav (//Lep pozdrav// ali //S spoštovanjem//) "
    "in podpis z imenom in funkcijo.",
)

ODPRTA = {
    "prosnja": ("Uradna prošnja", [
        ("Zgradba uradne prošnje", [
            *URADNI_DOPIS,
            "**Osrednji del** (najmanj toliko besed, kot zahteva navodilo): 1) kdo prosi in v čigavem imenu, 2) **kaj** natančno "
            "prosiš, 3) **zakaj** (utemeljitev z razlogi, ki jih zahteva navodilo), 4) podrobnosti (termin, število ljudi, "
            "znesek), 5) prošnja za odgovor.",
        ]),
        ("Slog in jezik", [
            "Vljudno, a jasno: //Prosimo vas, da …// · //Obračamo se na vas s prošnjo …// · //Veseli bomo, če …//",
            "Vikanje z **malo** začetnico (vas, vam, vaš); brez skrajšav, pogovornih besed in čustvenih pretiravanj.",
            "Utemeljitve so stvarne: koristi za naslovnika, za dijake, za kraj.",
        ]),
    ]),
    "javno_vabilo": ("Javno vabilo", [
        ("Zgradba javnega vabila", [
            "**Naslov** (privlačen, a stvaren) in **kdo vabi** (društvo, krožek, šola).",
            "**Na kaj vabi**: vrsta dogodka in tema, gost (ime, naziv, kratka predstavitev, zakaj je pravi sogovornik).",
            "**Podteme**: jasno ločene (npr. v dveh povedih ali alinejah), da bralec ve, kaj bo slišal.",
            "**Utemeljitev**: zakaj je tema pomembna in zakaj se splača priti.",
            "**Podatki o dogodku**: kdaj (dan, datum, ura), kje (prostor, naslov), vstopnina ali prijava, kontakt.",
            "**Sklepni poziv**: //Vabljeni vsi, ki …// · //Veseli bomo vašega obiska.//, podpis organizatorja.",
        ]),
        ("Slog in jezik", [
            "Javno vabilo je namenjeno širši javnosti: bolj sproščeno in spodbudno kot uradni dopis, a v knjižnem jeziku.",
            "Bralca nagovoriš v množini (//Vabimo vas …//); vprašanja v uvodu pritegnejo pozornost.",
            "Glave uradnega dopisa (pošiljatelj, naslovnik, zadeva) javno vabilo nima.",
        ]),
    ]),
    "uradno_vabilo": ("Uradno vabilo", [
        ("Zgradba uradnega vabila", [
            *URADNI_DOPIS,
            "**Osrednji del**: kdo vabi, **na kaj** (vrsta dogodka, tema, gost), **kdaj in kje** (datum, ura, prostor), "
            "predstavitev teme s podtemami, utemeljitev, zakaj je dogodek pomemben in zakaj si želite prav naslovnikove udeležbe, "
            "prošnja za potrditev udeležbe do določenega dne.",
        ]),
        ("Slog in jezik", [
            "Uradno in vljudno: //Vljudno vas vabimo …// · //Vašo udeležbo prosimo potrdite do …//",
            "Datumi in ure zapisani natančno in pravilno (//v četrtek, 15. 9. 2026, ob 12.00//).",
        ]),
    ]),
    "zahvala": ("Uradna zahvala", [
        ("Zgradba uradne zahvale", [
            *URADNI_DOPIS,
            "**Osrednji del**: za kaj se zahvaljuješ (konkretna pomoč, znesek, dogodek), kako je dogodek potekal in kaj je "
            "pomoč omogočila, vsebinski del, ki ga zahteva navodilo (npr. predstavitev pesnika), ponovna zahvala in želja po "
            "nadaljnjem sodelovanju.",
        ]),
        ("Slog in jezik", [
            "Hvaležno, a stvarno: //Iskreno se vam zahvaljujemo za …// · //Brez vaše pomoči …// · //Upamo, da bomo sodelovali tudi v prihodnje.//",
            "Izogibaj se pretiravanju (»neskončno, neizmerno, najlepša hvala na svetu«).",
        ]),
    ]),
    "dopis": ("Uradni dopis", [
        ("Zgradba uradnega dopisa", [
            *URADNI_DOPIS,
            "**Osrednji del**: namen dopisa v prvi povedi (prijava, predlog), predstavitev pošiljatelja, vse vsebinske zahteve "
            "iz navodila po vrsti (vsaka v svojem odstavku), na koncu prošnja za odgovor.",
        ]),
        ("Slog in jezik", [
            "Uradno, jedrnato, vljudno; utemeljitve s podatki (iz izhodiščnega besedila, če navodilo to zahteva).",
            "Vprašanja v dopisu zapiši kot vljudne prošnje: //Prosimo, da nam sporočite, …//",
        ]),
    ]),
    "komentar": ("Komentar", [
        ("Zgradba komentarja", [
            "**Naslov**: kratek in zanimiv, lahko že nakaže stališče.",
            "**Uvod**: predstaviš temo in povod (dogodek, predlog, izhodiščno besedilo) ter jasno zapišeš **svoje stališče**.",
            "**Jedro**: argumenti **za** (vsak v svoji povedi ali odstavku, z razlago ali zgledom), argument **proti** in tvoj "
            "**odgovor nanj**. Vsaj en argument povežeš z izhodiščnim besedilom (podatek, navedek).",
            "**Sklep**: ponoviš stališče in dodaš predlog ali poziv. Na koncu ime in priimek avtorja.",
        ]),
        ("Slog in jezik", [
            "Komentar je subjektiven: uporabljaš izraze mnenja (//menim, prepričan sem, zdi se mi//), a argumente utemeljuješ.",
            "Povezovalci: //prvič, drugič, poleg tega, vendar, kljub temu, zato, skratka//.",
            "Knjižni jezik; retorično vprašanje ali duhovita misel sta dovoljena, žaljivke ne.",
        ]),
    ]),
    "odziv": ("Odziv (pismo bralca)", [
        ("Zgradba odziva", [
            "**Naslov**, ki nakaže tvoje stališče.",
            "**Uvod**: na kateri članek se odzivaš (avtor, naslov, medij, datum) in kaj avtor trdi (povzetek njegovega stališča v 1–2 povedih).",
            "**Opredelitev**: jasno poveš, ali se strinjaš, deloma strinjaš ali ne strinjaš.",
            "**Argumenti**: vsaj toliko, kot jih zahteva navodilo; vsak z razlago; eden je lahko osebna izkušnja.",
            "**Sklep** in podpis (ime, priimek, kraj).",
        ]),
        ("Slog in jezik", [
            "Do avtorja si vljuden tudi, ko se ne strinjaš: kritiziraš misli, ne osebe.",
            "Avtorjeve trditve povzemaš s svojimi besedami ali v kratkem navedku v narekovajih.",
        ]),
    ]),
    "novica": ("Novica", [
        ("Zgradba novice", [
            "**Naslov** (in po želji podnaslov): pove bistvo dogodka.",
            "**Prvi odstavek (vodilo)**: odgovori na vprašanja **kdo, kaj, kdaj, kje** (in po možnosti zakaj).",
            "**Jedro**: podrobnosti po pomembnosti (obrnjena piramida), vsebinske zahteve iz navodila (npr. trije nasveti).",
            "**Izjava**: odziv udeleženca v premem govoru z narekovaji (»…,« je povedala dijakinja …).",
            "Avtor novice (ime in priimek) na koncu.",
        ]),
        ("Slog in jezik", [
            "Novica je **objektivna**: brez tvojega mnenja in čustvenih pridevnikov; mnenje izrazi le udeleženec v izjavi.",
            "Glagoli v pretekliku (dogodek se je že zgodil), tretja oseba.",
            "Pazi na ločila v premem govoru: »Predavanje je bilo koristno,« je povedal Jan.",
        ]),
    ]),
    "ocena": ("Ocena knjige", [
        ("Zgradba ocene", [
            "**Naslov** ocene (ne samo naslov knjige).",
            "**Uvod**: avtor (nekaj podatkov) in umestitev knjige (zvrst, tema).",
            "**Vsebina**: kratka predstavitev zgodbe **brez razkritja konca**.",
            "**Vrednotenje**: vsaj dve značilnosti (pripovedovalec, osebe, jezik, zgradba, napetost), vsaka z utemeljitvijo in zgledom.",
            "**Priporočilo**: komu je knjiga namenjena in zakaj jo priporočaš ali odsvetuješ.",
            "**Podatki o knjigi**: avtor, naslov, založba, kraj in leto izida, število strani.",
        ]),
        ("Slog in jezik", [
            "Ocena združuje objektivno (podatki, vsebina) in subjektivno (vrednotenje). Vrednotenje vedno utemelji.",
            "Vsebino povzemaš v sedanjiku.",
        ]),
    ]),
    "porocilo": ("Poročilo", [
        ("Zgradba poročila", [
            "**Naslov** poročila.",
            "**Uvod**: kdaj, kdo, kam in s kakšnim namenom.",
            "**Jedro**: potek po **časovnem zaporedju**, vsak kraj ali znamenitost v svojem odstavku z bistvenimi podatki.",
            "**Sklep**: ocena (kaj je bilo najbolj zanimivo, kaj bi izboljšali) in avtor.",
        ]),
        ("Slog in jezik", [
            "Poročilo je stvarno in pregledno; preteklik, časovni povezovalci (//najprej, nato, po kosilu, na koncu//).",
            "Mnenje je dovoljeno le v sklepni oceni in mora biti utemeljeno.",
        ]),
    ]),
    "poziv": ("Poziv", [
        ("Zgradba poziva", [
            "**Naslov** (kratek, spodbuden).",
            "**Kdo poziva in k čemu**: namen (npr. zbornik spominov) in zakaj je pomemben.",
            "**Navodila**: oštevilčena ali v jasno ločenih povedih (kako zbrati, kako zapisati, kaj priložiti).",
            "**Rok in način oddaje**: natančen datum, kam in komu, v kakšni obliki.",
            "**Spodbuda in podpis**: zahvala vnaprej, ime in funkcija (urednik/urednica).",
        ]),
        ("Slog in jezik", [
            "Bralce nagovoriš neposredno (//Vabimo vas, da …// · //Prosimo, da …//); velelnik je dovoljen v navodilih (//Zapišite …//).",
        ]),
    ]),
}


def vrsta_odprte(besedilo):
    """Iz navodila odprte naloge ugane besedilno vrsto (ključ v ODPRTA)."""
    b = besedilo.lower()
    for kljuc, vzorec in (("odziv", "odziv"), ("zahvala", "zahval"), ("javno_vabilo", "javno vabilo"),
                          ("uradno_vabilo", "uradno vabilo"), ("prosnja", "prošnj"), ("komentar", "komentar"),
                          ("novica", "novico"), ("ocena", "oceno knjige"), ("porocilo", "poročilo"),
                          ("poziv", "poziv"), ("dopis", "dopis")):
        if vzorec in b:
            return kljuc
    raise KeyError(f"neznana besedilna vrsta odprte naloge: {besedilo[:80]!r}")
