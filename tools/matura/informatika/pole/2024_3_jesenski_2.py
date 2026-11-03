LETO, ROK, IZVEDBA, DATUM = 2024, "jesenski", 2, "četrtek, 29. avgust 2024"

# ---------------------------------------------------------------- izpitna pola 1
DREVO_STRAN = koda('''
    stran
    ├── strani
    │   └── clani
    └── slog''')

NASLOVI = tabela(["Naslov"], [
    ["192.168.1.256"],
    ["10.20.30.40"],
    ["3c-5a-b4-01-9f-e2"],
    ["3c-5a-g4-01-9f-e2"],
    ["2001:db8::7:1"],
    ["2001::db8::1"],
    ["0a-1b-2c-3d-4e"],
    ["fe80:0:0:0:1:2:3:4"]])

PROGRAM_X = koda('''
    x = 50
    y = 8
    z = 0
    while x > 0:
        x = x - y
        z = z + 1
    x = x * (y - z)''')

KROZEK_HTML = '''<html>
<head>
  <meta charset="utf-8">
  <title>BRALCI</title>
</head>
<body>
  <h1>Knjižne ocene krožka BRALCI</h1>
  <ul>
    <li><a href="../ocene/maja.html">Maja</a></li>
    <li><a href="../ocene/tim.html">Tim</a></li>
    <li><a href="../ocene/zala.html">Zala</a></li>
  </ul>
</body>
</html>'''

POLA1 = [
    N(["zapis_podatkov", "omrezja"],
      "Naprave si izmenjujejo pakete ničel in enic. Med prenosom se lahko kakšen bit spremeni. Najpreprostejša zaščita je paritetni bit – vsota vseh bitov po modulu 2. "
      "Na primer: paritetna vsota 110100111010 je 1, paritetna vsota 110100111000 pa 0. "
      "Čim splošneje opišite napako v paketu, ki je s paritetno vsoto ne moremo zaznati.",
      [P(1, "", [
          ("!Napake ne zaznamo, če se spremeni sodo število bitov (2, 4, 6 …).", "Vsaka sprememba enega bita obrne paritetno vsoto; dve spremembi jo obrneta dvakrat, zato ostane enaka in prejemnik misli, da je paket pravilen."),
      ])]),

    N(["zapis_podatkov"],
      "Števke v številskih sistemih so po vrsti 0, 1 … 9, nato pa nadaljujemo s črkami A, B, C … "
      "Katero je najmanjše desetiško število, ki je v neznanem številskem sistemu zapisano kot `7C`? Utemeljite odgovor.",
      [P(1, "", [
          ("C pomeni 12, zato mora imeti sistem vsaj 13 števk.", "Najmanjšo vrednost dobimo pri najmanjši možni osnovi, torej 13."),
          ("7 · 13 + 12 = 91 + 12", ""),
          ("!103", ""),
      ])]),

    N(["splet"],
      "Na sliki je struktura map, ki jo uporabljamo pri izdelavi spletišča. V katerih mapah je lahko spletna stran, če je v njej naslov stilne predloge zapisan kot `../slog/glavni.css`? Obkrožite vse pravilne odgovore.",
      [P(1, "", [
          (None, "../ pomeni »pojdi v nadrejeno mapo«; tam mora biti mapa slog."),
          ("strani → ../ → stran → stran/slog/glavni.css obstaja", ""),
          ("slog → ../ → stran → stran/slog/glavni.css obstaja", ""),
          ("clani → ../ → strani, ki nima podmape slog; stran → ../ je že zunaj spletišča", ""),
          ("!B in D", ""),
      ], slika=R(DREVO_STRAN + izbire("stran", "strani", "clani", "slog")))]),

    N(["slika", "zapis_podatkov"],
      "Nina ima ključek USB z 2 MiB prostora. Nanj bi rada shranila sivinsko sliko velikosti 1280 × 800 slikovnih točk, pri kateri za vsako točko porabi 16 bitov. "
      "Ali lahko sliko shrani v nestisnjeni obliki? Utemeljite odgovor.",
      [P(1, "", [
          ("1280 · 800 · 2 B = 2 048 000 B", "16 bitov je 2 bajta."),
          ("2 048 000 B / 1 048 576 = 1,95 MiB", "1 MiB = 2^{20} B."),
          ("!Da, slika (1,95 MiB) gre na ključek, ker je manjša od 2 MiB.", ""),
      ])]),

    N(["slika", "zapis_podatkov"],
      "Luka je narisal črno-belo sliko (vsaka točka je bela ali črna) s 436 207 616 slikovnimi točkami in jo brez stiskanja in brez metapodatkov shranil v datoteko `risba.bmp`. Kolikšna je velikost datoteke?",
      [P(1, "", [
          ("Za vsako točko zadošča 1 bit.", ""),
          ("436 207 616 / 8 = 54 525 952 B", ""),
          ("54 525 952 / 1024 / 1024 = 52 MiB", ""),
          ("!A", "B dobimo, če narobe delimo s 1000 (54,53 MB), C pa, če bi vsaka točka porabila cel bajt."),
      ], slika=izbire("52 MiB", "54,53 MiB", "0,41 GiB"))]),

    N(["omrezja"],
      "Po internetu pošiljamo podatke v paketih omejene dolžine. Protokol TCP zagotavlja, da prejemnik dobi vse podatke v enakem vrstnem redu, kot so bili poslani. Mojca po spletu pošilja prijatelju 300 MB velik posnetek.",
      [P(1, "Kaj mora protokol TCP narediti s posnetkom, da ga lahko pošlje po paketnem omrežju IP?", [
          ("!Razdeli ga na manjše dele (segmente), ki gredo v posamezne pakete IP, in vsakega oštevilči.", "Paket IP je omejeno dolg, posnetek pa je mnogo daljši."),
      ]),
       P(1, "Kako protokol TCP pri prejemniku zagotovi pravilni vrstni red podatkov?", [
          ("!Prejemnik segmente po zaporednih številkah zloži v pravilni vrstni red; prejem potrdi, manjkajoče pa pošiljatelj pošlje znova.", "Paketi lahko potujejo po različnih poteh in prispejo v drugačnem vrstnem redu ali se izgubijo."),
      ])]),

    N(["temeljni_pojmi", "omrezja"],
      "V šolskem omrežju je pet stikal (angl. switch), vsako ima 24 vtičnic UTP. Ena od vtičnic ne deluje.",
      [P(1, "Najmanj koliko bitov je dolgo sporočilo skrbniku, ki pove, katera vtičnica ne deluje?", [
          ("5 · 24 = 120 vtičnic", ""),
          ("2^{6} = 64 < 120 ≤ 128 = 2^{7}", ""),
          ("!7 bitov", ""),
      ]),
       P(1, "Najmanj koliko bitov je dolgo sporočilo, ki pove le, na katerem stikalu je pokvarjena vtičnica?", [
          ("2^{2} = 4 < 5 ≤ 8 = 2^{3}", ""),
          ("!3 biti", ""),
      ])]),

    N(["omrezja"],
      "V omrežjih uporabljamo različne naslove. Spodaj je osem naslovov, nekateri so zapisani napačno. "
      "Za vsak pravilno zapisani naslov napišite, kateri plasti (povezavna, mrežna) in kateremu protokolu (Ethernet/MAC, IPv4, IPv6) pripada. Napačne naslove prečrtajte.",
      [P(2, "", [
          ("@slika", tabela(["Naslov", "Plast", "Protokol"], [
              ["192.168.1.256", "napačen", "256 > 255"],
              ["10.20.30.40", "mrežna", "IPv4"],
              ["3c-5a-b4-01-9f-e2", "povezavna", "Ethernet (MAC)"],
              ["3c-5a-g4-01-9f-e2", "napačen", "g ni šestnajstiška števka"],
              ["2001:db8::7:1", "mrežna", "IPv6"],
              ["2001::db8::1", "napačen", ":: se sme pojaviti le enkrat"],
              ["0a-1b-2c-3d-4e", "napačen", "MAC ima 6 bajtov"],
              ["fe80:0:0:0:1:2:3:4", "mrežna", "IPv6"]])),
          ("!Pravilni: 10.20.30.40 (mrežna, IPv4), 3c-5a-b4-01-9f-e2 (povezavna, MAC), 2001:db8::7:1 in fe80:0:0:0:1:2:3:4 (mrežna, IPv6).", "IPv4: 4 bajti desetiško; MAC: 6 bajtov šestnajstiško; IPv6: 8 skupin po 16 bitov, zaporedje ničelnih skupin skrajšamo z :: enkrat."),
      ], slika=NASLOVI)]),

    N(["programiranje"],
      "Kako se spreminja vrednost spremenljivke `x` med izvajanjem spodnjega programa? Zapišite vse vrednosti po vrsti.",
      [P(2, "", [
          ("V zanki x vsakič zmanjšamo za 8, z pa šteje obhode.", ""),
          ("50, 42, 34, 26, 18, 10, 2, −6", "Po 7. obhodu je x = −6 in zanka se konča; z = 7."),
          ("x = −6 · (8 − 7) = −6", ""),
          ("!50, 42, 34, 26, 18, 10, 2, −6, −6", ""),
      ], slika=PROGRAM_X)]),

    N(["komuniciranje"],
      "Vsak proces komuniciranja je sestavljen iz več osnovnih elementov.",
      [P(1, "Izberite primer komuniciranja, v katerem nastopa šest osnovnih elementov komuniciranja.", [
          ("!Trenerka po telefonu sporoči igralki, da je tekma prestavljena.", ""),
      ]),
       P(2, "Za izbrani primer opredelite vseh šest elementov.", [
          ("!pošiljatelj: trenerka; prejemnik: igralka; sporočilo: tekma je prestavljena; kanal: telefonska zveza; šum: hrup na avtobusu, slab signal; povratna zveza: igralka odgovori »Razumem, pridem ob šestih.«", ""),
      ])]),

    N(["druzbeni_vidiki", "omrezja"],
      "Varnost v omrežju pomeni, da so uporabniki zaščiteni drug pred drugim in da jih sistemi pravilno prepoznajo. Pri tem srečamo pojme identifikacija, avtentikacija in avtorizacija.",
      [P(2, "V preglednici vsakemu opisu pripišite ustrezni pojem.", [
          ("@slika", tabela(["Opis pojma", "Pojem"], [
              ["Sistem določi, katere mape sme uporabnik brati in v katere pisati.", "avtorizacija"],
              ["Uporabnik vpiše svoje uporabniško ime.", "identifikacija"],
              ["Sistem preveri, ali je vpisano geslo pravo.", "avtentikacija"]])),
          ("!avtorizacija, identifikacija, avtentikacija", "Najprej povemo, kdo smo, nato to dokažemo, šele nato dobimo pravice."),
      ], slika=tabela(["Opis pojma", "Pojem"], [
          ["Sistem določi, katere mape sme uporabnik brati in v katere pisati.", ""],
          ["Uporabnik vpiše svoje uporabniško ime.", ""],
          ["Sistem preveri, ali je vpisano geslo pravo.", ""]])),
       P(1, "Kam spada prijava, pri kateri po geslu vpišemo še kodo, ki jo dobimo v SMS-sporočilu?", [
          ("!B", "Gre za dvostopenjsko preverjanje pristnosti, torej za avtentikacijo."),
      ], slika=izbire("Identifikacija.", "Avtentikacija.", "Avtorizacija."))]),

    N(["pisna", "slika"],
      "Ana je na morju fotografirala sončni zahod. Fotografijo je prek družbenega omrežja poslala prijatelju Tilnu, babici, ki bere le SMS-sporočila, pa je napisala: "
      "»Sonce je zahajalo za otokom, nebo je bilo rdeče, pred obalo pa je plula bela jadrnica.«",
      [P(2, "Poimenujte in opišite, v kakšni obliki je informacijo dobil Tilen in v kakšni babica. Poudarite razliko med oblikama.", [
          ("!Tilen: slikovna (grafična) predstavitev – vse naenkrat vidi barve, oblike in razporeditev. Babica: pisna (besedilna) predstavitev – zaporedje znakov, ki prizor opiše z besedami.", "Slika prenese veliko podrobnosti naenkrat, besedilo le tiste, ki jih avtor izbere in opiše."),
      ]),
       P(1, "Babica je zagotovo dobila slabšo predstavitev. Kaj bi Ana lahko naredila, da bi jo izboljšala?", [
          ("!Prizor bi opisala podrobneje (barve, razporeditev, razpoloženje) ali babici poklicala in ga opisala z govorom.", "Če babičin telefon podpira MMS, ji lahko pošlje tudi fotografijo."),
      ])]),

    N(["programska_oprema", "strojna_oprema"],
      "Računalnik mora poskrbeti, da so priključene zunanje naprave dostopne aplikacijam. Uporabnik pričakuje, da bo lahko tiskal na tiskalnik, ki ga je priključil.",
      [P(1, "Na Gregorjevem računalniku dva programa hkrati tiskata vsak svoj dokument. Na papirju je besedilo obeh dokumentov pomešano. V katerem delu programske opreme je napaka? Zakaj?", [
          ("!V operacijskem sistemu.", "Operacijski sistem upravlja zunanje naprave in razporeja dostop do njih; dokumente bi moral postaviti v vrsto (tiskalniško vrsto) in jih tiskati enega za drugim."),
      ]),
       P(1, "Gregor je tiskalnik znamke AX zamenjal s tiskalnikom znamke BT in moral zamenjati tudi gonilnik. Zakaj?", [
          ("!Vsak tiskalnik razume svoje ukaze; gonilnik ukaze operacijskega sistema prevede v jezik prav tega tiskalnika.", "Gonilnik za AX pošilja ukaze, ki jih BT ne razume."),
      ]),
       P(2, "Gregor je slišal za standarda PDF in PostScript. Mu lahko znanje o njiju pomaga pri nakupu naslednjega tiskalnika? Utemeljite.", [
          ("!Da. Kupi tiskalnik, ki neposredno razume standard PostScript ali PDF.", "To sta standardna jezika za opis strani."),
          ("Računalnik mu dokument pošlje v standardni obliki, zato ne potrebuje posebnega gonilnika proizvajalca.", "Deluje s splošnim gonilnikom na vseh sistemih in ob menjavi tiskalnika ni težav."),
      ])]),

    N(["omrezja"],
      "Jure se je učil, da naprave v omrežju izmenjujejo podatke po različnih protokolih, ki so razporejeni po plasteh.",
      [P(3, "Navedite po en protokol na mrežni, aplikacijski in prenosni plasti in zapišite, kakšno storitev ponuja.", [
          ("!mrežna plast: IP – usmerja pakete od izvornega do ciljnega računalnika po naslovih IP.", ""),
          ("!aplikacijska plast: HTTP – prenaša spletne strani med brskalnikom in strežnikom.", "Lahko tudi DNS, SMTP, FTP …"),
          ("!prenosna plast: TCP – zanesljiv prenos podatkov v pravilnem vrstnem redu med dvema programoma.", "Lahko tudi UDP: hiter prenos brez zagotovila dostave."),
      ]),
       P(1, "Naslov URL `https://www.knjiznica.si:8443/katalog/iskanje` vsebuje vrata 8443. Na kateri plasti so vrata naslov in čemu so namenjena?", [
          ("!Vrata so naslov na prenosni plasti: določajo, kateremu programu (storitvi) na ciljnem računalniku so podatki namenjeni.", "Naslov IP pove, kateri računalnik; vrata pa, kateri program na njem."),
      ]),
       P(1, "Večina naslovov URL vrat sploh nima. Zakaj?", [
          ("!Če vrat ne zapišemo, se uporabijo privzeta vrata protokola (HTTP 80, HTTPS 443).", "Vrata pišemo le, kadar storitev teče na nestandardnih vratih."),
      ])]),

    N(["splet"],
      "Mentorica Saša želi izdelati spletno stran `index.html` za knjižni krožek BRALCI. V zavihku brskalnika naj se izpiše BRALCI. "
      "Stran bo shranjena v mapi `splet`, ki je tako kot mapa `ocene` podmapa mape `krozek`. Na vrhu strani naj bo naslov Knjižne ocene krožka BRALCI, pod njim pa seznam imen članov. "
      "Vsako ime naj bo povezava na stran s članovimi ocenami knjig. Te strani so v mapi `ocene`: Majine ocene so na strani `maja.html`, Timove na `tim.html`, Zaline na `zala.html`.",
      [P(5, "Dopolnite kodo HTML.", [
          ("@koda", KROZEK_HTML, "title v glavi (1), naslov h1 (1), seznam ul/li (1), povezave a href (1), pravilni relativni naslovi ../ocene/… (1)."),
          ("@slika", R('<div class="in-izris"><h1>Knjižne ocene krožka BRALCI</h1><ul><li><u>Maja</u></li><li><u>Tim</u></li><li><u>Zala</u></li></ul></div>')),
      ], slika=koda('''
          <html>
          <head>

          </head>
          <body>

          </body>
          </html>'''))]),
]

# ---------------------------------------------------------------- izpitna pola 2
TRGOVINA = preglednica([
    ["Zdrava shramba", "", "", "", "", "", ""],
    ["DDV:", "9,5 %", "Marža:", "20 %", "Rok:", "12", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["Koda", "Naziv", "Rok uporabe (mesecev)", "Proizvodna cena", "Prodajna cena", "Nova koda", "Besedilo"],
    ["Z7K4", "Ajdova kaša", "18", "1,40", "", "", ""],
    ["B2M9", "Ovseni kosmiči", "12", "1,10", "", "", ""],
    ["R5T1", "Lešnikovo maslo", "9", "3,20", "", "", ""],
    ["K3P6", "Rjavi riž", "24", "1,60", "", "", ""],
    ["M8S2", "Chia semena", "15", "2,40", "", "", ""],
    ["T1L7", "Kokosovo olje", "20", "4,10", "", "", ""],
    ["V6D3", "Suhe slive", "6", "2,05", "", "", ""],
])

POLA2 = [
    N(["baze"],
      "Ljudje si iz okolice zapomnimo posamezne dele – entitete. Da bi v množici entitet ločili vsako od njih, si zapomnimo nekaj njenih lastnosti (atributov). "
      "Predstavljajte si šolsko knjižnico: za pultom sedi knjižničarka, ob mizah berejo dijaki, na policah so knjige, dijaki si jih izposojajo in vračajo.",
      [P(2, "Smiselno določite tri entitete.", [
          ("!DIJAK, KNJIGA, IZPOSOJA", "Lahko tudi POLICA, KNJIŽNIČARKA …"),
      ]),
       P(2, "Za vsako entiteto določite po tri atribute.", [
          ("!DIJAK: ime, priimek, razred; KNJIGA: naslov, avtor, leto izdaje; IZPOSOJA: datum izposoje, datum vračila, zamudnina", ""),
      ]),
       P(1, "Kako rešimo težavo, ko imata dva predstavnika entitete vse vrednosti atributov enake (npr. dva izvoda iste knjige)?", [
          ("!Dodamo atribut, ki je za vsakega predstavnika drugačen (ključ), npr. inventarno številko izvoda ali šifro dijaka.", ""),
      ])]),

    N(["temeljni_pojmi", "zapis_podatkov", "omrezja"],
      "V podjetju so postavili šest stikal (angl. switch) s po 32 vtičnicami UTP. Skrbnica Vesna je predlagala, da vsaka vtičnica dobi enolično oznako "
      "`številka stikala + 6 · številka vtičnice`. Stikala so oštevilčena od 0 do 5, vtičnice na stikalu od 0 do 31.",
      [P(1, "Katero vtičnico označuje številka 101? Utemeljite odgovor.", [
          ("101 = 5 + 6 · 16", "Ostanek pri deljenju s 6 je številka stikala, količnik pa številka vtičnice."),
          ("!Vtičnica 16 na stikalu 5.", ""),
      ]),
       P(1, "Na stikalu 2 se je pokvarila vtičnica 19. Kakšno oznako ima?", [
          ("2 + 6 · 19 = 2 + 114", ""),
          ("!116", ""),
      ]),
       P(1, "Koliko bitov potrebujemo za oznake vtičnic? Utemeljite odgovor.", [
          ("Največja oznaka: 5 + 6 · 31 = 191", "Oznake gredo od 0 do 191."),
          ("2^{7} = 128 < 192 ≤ 256 = 2^{8}", ""),
          ("!8 bitov", ""),
      ]),
       P(1, "Ali bi lahko vtičnice enolično označili z manj biti? Utemeljite odgovor.", [
          ("!Ne. Vtičnic je 6 · 32 = 192, s 7 biti pa ločimo le 128 različnih oznak.", "Vesnin obrazec porabi prav vse oznake od 0 do 191, zato ni nobene izgube."),
      ]),
       P(1, "Dodali so še tri stikala; oznake računajo enako, le da množijo z 9, stikala pa so od 0 do 8. Ali bi oznako lahko zapisali z manj biti kot po tem obrazcu? Utemeljite odgovor.", [
          ("Največja oznaka: 8 + 9 · 31 = 287 → 9 bitov", ""),
          ("Vtičnic je 9 · 32 = 288; 2^{8} = 256 < 288", ""),
          ("!Ne, tudi najboljši zapis potrebuje 9 bitov, kar je enako kot po obrazcu.", ""),
      ])]),

    N(["slika", "zapis_podatkov"],
      "Tjaša je s fotoaparatom slikala slap. Izbrala je zapis RAW z ločljivostjo 4608 × 3456 točk. Ko je sliko želela po e-pošti poslati prijatelju Urbanu, je strežnik pošto zavrnil, ker je bila priponka večja od dovoljenih 25 MiB.",
      [P(1, "Izračunajte velikost datoteke, če je vsaka točka zapisana s 24 biti.", [
          ("4608 · 3456 · 3 B = 47 775 744 B", "24 bitov so 3 bajti."),
          ("47 775 744 / 1 048 576", ""),
          ("!≈ 45,6 MiB, kar je več kot 25 MiB.", ""),
      ]),
       P(2, "Na podlagi izračuna predlagajte dva bistveno različna načina, kako lahko Tjaša Urbanu pošlje datoteko RAW v enem kosu. Utemeljite.", [
          ("!1. Datoteko naloži v oblačno shrambo (ali storitev za prenos velikih datotek) in Urbanu pošlje povezavo.", "Omejitev 25 MiB velja le za priponke e-pošte."),
          ("!2. Datoteko brez izgub stisne (npr. ZIP); če je stisnjena manjša od 25 MiB, jo pošlje kot priponko.", "Stiskanje brez izgub ohrani vse podatke RAW."),
      ]),
       P(1, "Tjaša je slap znova slikala z enako ločljivostjo in globino, a v zapisu JPEG. To sliko je lahko poslala. Zakaj?", [
          ("!JPEG sliko stisne z izgubami, zato je datoteka mnogo manjša.", "Zavrže podrobnosti, ki jih oko slabo opazi."),
      ]),
       P(1, "Urban je primerjal sliki in se mu zdi slika JPEG najlepša. Je to mogoče? Utemeljite.", [
          ("!Da. Fotoaparat sliko JPEG že sam obdela (barve, kontrast, ostrina), RAW pa so neobdelani podatki senzorja.", "Po podatkih vsebuje RAW več informacije, a je brez obdelave lahko videti bledo."),
      ])]),

    N(["programiranje", "obdelava"],
      "Petra ima ob hiši pameten zbiralnik deževnice. Senzor vsako minuto izmeri prostornino vode. Če se prostornina v zadnjih petih minutah poveča za kritično vrednost ali več, se sproži alarm in izpiše opozorilo pred poplavo. Kritična vrednost je 15 litrov.",
      [P(2, "Senzor je izmeril spodnje vrednosti. Kdaj se je sprožil alarm?", [
          ("Primerjamo vsako meritev z meritvijo 5 minut prej.", ""),
          ("5: 16 − 2 = 14;  6: 18 − 6 = 12;  7: 19 − 9 = 10", ""),
          ("8: 27 − 10 = 17 ≥ 15;  9: 28 − 12 = 16 ≥ 15;  10: 30 − 16 = 14", ""),
          ("!V 8. in 9. minuti.", ""),
      ], slika=tabela(["Minuta", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], [
          ["Prostornina (L)", "2", "6", "9", "10", "12", "16", "18", "19", "27", "28", "30"]])),
       P(3, "Napišite funkcijo `monitor(podatki)`, ki sproži alarm s funkcijo `start_alarm()` in izpiše opozorilo, kadar se prostornina v zadnjih petih minutah poveča za kritično vrednost ali več.", [
          ("@koda", '''
            podatki = [2, 6, 9, 10, 12, 16, 18, 19, 27, 28, 30]

            def monitor(podatki):
                kriticna_vrednost = 15
                for i in range(5, len(podatki)):
                    if podatki[i] - podatki[i - 5] >= kriticna_vrednost:
                        start_alarm()
                        print("Minuta", i, "- možne so poplave!")''', "Zanka začne pri indeksu 5, da obstaja meritev 5 minut prej."),
      ]),
       P(2, "Petra je vgradila črpalko, ki izčrpa 3 litre vode na minuto. Senzor je nato izmeril spodnje vrednosti. Kdaj se je črpalka zagotovo vklopila? Utemeljite.", [
          ("Dež lahko prostornino le povečuje; zmanjša jo lahko samo črpalka.", ""),
          ("Prvo zmanjšanje: 13 L v 5. minuti → 11 L v 6. minuti", ""),
          ("!Med 5. in 6. minuto, ker se je prostornina takrat prvič zmanjšala.", ""),
      ], slika=tabela(["Minuta", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], [
          ["Prostornina (L)", "2", "5", "6", "8", "9", "13", "11", "10", "8", "11", "12", "15", "17"]])),
       P(2, "Najmanj koliko vode je izčrpala črpalka? Utemeljite.", [
          ("Prostornina se zmanjša v treh minutah: 13→11, 11→10, 10→8.", "V teh minutah je črpalka zagotovo delovala."),
          ("3 min · 3 L/min = 9 L", "V drugih minutah ne vemo, ali je delovala, saj je dež lahko pritekal hitreje."),
          ("!Najmanj 9 litrov.", ""),
      ])]),

    N(["zapis_podatkov", "programiranje"],
      "Časovno vrsto (zaporedje meritev) lahko zapišemo z absolutnimi vrednostmi ali z relativnimi – razlikami od prejšnje vrednosti, pri čemer je prva vrednost enaka prvi absolutni.",
      [P(2, "Dopolnite manjkajoče relativne vrednosti.", [
          ("57 − 61 = −4;  70 − 57 = 13;  93 − 70 = 23;  61 − 20 = 41", ""),
          ("!48, −13, 17, −32, 41, −4, 13, 23", ""),
      ], slika=tabela(["Absolutna", "48", "35", "52", "20", "61", "57", "70", "93"], [
          ["Relativna", "48", "−13", "17", "−32", "", "", "", ""]])),
       P(3, "Napišite funkcijo `izpis_rel_vrednosti(tabela)`, ki izpiše relativne vrednosti za absolutno časovno vrsto v seznamu `tabela`.", [
          ("@koda", '''
            tabela = [48, 35, 52, 20, 61, 57, 70, 93]

            def izpis_rel_vrednosti(tabela):
                print(tabela[0])
                for i in range(1, len(tabela)):
                    print(tabela[i] - tabela[i - 1])''', "Prva vrednost ostane, nato izpisujemo razlike sosednjih."),
      ]),
       P(3, "Cela števila lahko zapišemo tako, da skrajno levi bit pomeni predznak (1 = negativno), preostali pa absolutno vrednost. Pri 8 bitih je 1 = 00000001 in −1 = 10000001. V tem zapisu zapišite 101, 140 in −45.", [
          ("101 = 64 + 32 + 4 + 1", ""),
          ("!101 = 01100101", ""),
          ("!140 se ne da zapisati", "Za vrednost ostane 7 bitov, največ 127."),
          ("45 = 32 + 8 + 4 + 1 = 0101101", ""),
          ("!−45 = 10101101", ""),
      ]),
       P(2, "Meritve so zapisane s 16 biti v istem zapisu (predznak + vrednost). Obseg je razlika med največjo in najmanjšo vrednostjo. Kateri zapis – absolutni ali relativni – ima lahko večji obseg? Utemeljite.", [
          ("Absolutne vrednosti so od −32767 do 32767.", ""),
          ("Razlika dveh takih vrednosti je lahko od −65534 do 65534.", ""),
          ("!Relativni zapis: njegov obseg je lahko do dvakrat večji, zato razlik ne moremo vedno zapisati s 16 biti.", "V našem primeru: absolutni obseg 93 − 20 = 73, relativni 41 − (−32) = 80."),
      ])]),

    N(["preglednice"],
      "Trgovina z zdravo prehrano vodi seznam artiklov v preglednici. Pri formulah si lahko pomagate s funkcijami: "
      "`MID(besedilo; začetek; število)` vrne podniz dolžine število od mesta začetek (=MID(\"avtomehanik\"; 5; 3) vrne »meh«); "
      "`CONCAT(b1; b2; …)` stakne besedila; `IF(pogoj; A; B)`; `COUNTIF(obseg; pogoj)` prešteje celice, ki ustrezajo pogoju; "
      "`SUMIF(obseg; pogoj; obseg_seštevanja)` sešteje vrednosti, pri katerih ustrezna celica v obsegu ustreza pogoju.",
      [P(None, "", slika=TRGOVINA),
       P(2, "V celico E6 vpišite formulo za prodajno ceno, ki jo lahko kopiramo navzdol. Prodajna cena = proizvodna cena + proizvodna cena · DDV + (proizvodna cena + proizvodna cena · DDV) · marža.", [
          ("!=D6+D6*$B$2+(D6+D6*$B$2)*$D$2", "DDV in marža sta v eni celici, zato ju naslovimo absolutno. Krajše: =D6*(1+$B$2)*(1+$D$2). Za ajdovo kašo: 1,84 €."),
      ]),
       P(2, "Nova koda je sestavljena iz drugega in zadnjega znaka stare kode, tretjega znaka naziva in roka uporabe (vse stare kode imajo 4 znake). V F6 vpišite formulo.", [
          ("!=CONCAT(MID(A6;2;1);MID(A6;4;1);MID(B6;3;1);C6)", "Za ajdovo kašo: 7, 4, d, 18 → 74d18."),
      ]),
       P(2, "V G6 vpišite formulo, ki izpiše npr. »Nova koda artikla Ajdova kaša je 74d18.« in jo lahko kopiramo navzdol.", [
          ("!=CONCAT(\"Nova koda artikla \";B6;\" je \";F6;\".\")", "Presledke in piko zapišemo v besedilne konstante."),
      ]),
       P(2, "V E14 vpišite formulo, ki prešteje artikle s prodajno ceno, nižjo od 2 €.", [
          ("!=COUNTIF(E6:E12;\"<2\")", "Rezultat je 2 (ajdova kaša 1,84 €, ovseni kosmiči 1,45 €)."),
      ]),
       P(2, "V E15 vpišite formulo, ki sešteje prodajne cene artiklov z rokom uporabe, krajšim od roka v celici F2.", [
          ("!=SUMIF(C6:C12;\"<\"&F2;E6:E12)", "Pogoj sestavimo iz znaka < in vrednosti v F2. Rezultat: 4,20 + 2,69 ≈ 6,90 € (lešnikovo maslo in suhe slive)."),
      ])]),
]
