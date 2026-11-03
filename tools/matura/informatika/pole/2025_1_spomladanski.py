LETO, ROK, DATUM = 2025, "spomladanski", "četrtek, 12. junij 2025"

# ---------------------------------------------------------------- izpitna pola 1
RAZVRSTI = tabela(["Pojem", "programska oprema", "V/I enota", "CPE", "pomnilnik"], [
    [p, "", "", "", ""] for p in ["miška", "urejevalnik besedil", "krmilna enota", "delovni pomnilnik (RAM)", "zvočnik",
                                   "prevajalnik", "aritmetično-logična enota", "bliskovni ključek USB", "spletna kamera",
                                   "operacijski sistem", "programski števec", "skener"]])
RAZVRSTI_RES = tabela(["Pojem", "programska oprema", "V/I enota", "CPE", "pomnilnik"], [
    ["miška", "", "X", "", ""], ["urejevalnik besedil", "X", "", "", ""], ["krmilna enota", "", "", "X", ""],
    ["delovni pomnilnik (RAM)", "", "", "", "X"], ["zvočnik", "", "X", "", ""], ["prevajalnik", "X", "", "", ""],
    ["aritmetično-logična enota", "", "", "X", ""], ["bliskovni ključek USB", "", "", "", "X"], ["spletna kamera", "", "X", "", ""],
    ["operacijski sistem", "X", "", "", ""], ["programski števec", "", "", "X", ""], ["skener", "", "X", "", ""]])

DREVO_SPLET = koda('''
    projekt
    ├── index.html
    └── strani
        ├── index.html
        ├── slog
        │   └── glavni.css
        └── predstavitev
            ├── index.html
            └── html
                └── index.html''')

KRIZ = preglednica([[5, 8, 2], [7, 1, 9], [4, 6, 3]])

DREVO_KRIT = koda('''
    DELO
    ├── PLAČILO
    │   ├── urna postavka
    │   └── število ur na teden
    ├── POGOJI
    │   ├── oddaljenost od doma
    │   ├── delovni čas
    │   └── delovno okolje
    └── KORISTNOST
        ├── nove izkušnje
        └── priporočilo za naprej''')

DIAGRAM = diagram([
    ("zacetek",),
    ("ukaz", "i = 3907"),
    ("pogoj", "i > 0", [("izhod", "izpiši i mod 10"), ("ukaz", "i = i / 10")], []),
    ("konec",),
])

POLA1 = [
    N(["strojna_oprema"],
      "Kateri pomnilnik ob izklopu napajanja izgubi shranjeno vsebino? Obkrožite.",
      [P(1, "", [("!C", "Dinamični pomnilnik (DRAM) hrani bite kot naboj v kondenzatorjih; brez napajanja (in brez osveževanja) se izprazni. ROM, bliskovni pomnilnik in trdi disk so obstojni.")],
         slika=izbire("Bralni pomnilnik (ROM).", "Bliskovni pomnilnik (SSD).", "Dinamični delovni pomnilnik (DRAM).", "Trdi disk."))]),

    N(["programiranje"],
      "Dana je funkcija:",
      [P(None, "", slika=koda('''
          def nekaj(a, b):
              vsota = 1
              while a < 4 or b < 2:
                  vsota *= a
                  a += 1
              return vsota''')),
       P(1, "Napišite, kaj vrne klic `nekaj(4, 2)`. Odgovor utemeljite.", [
          ("4 < 4 ne velja, 2 < 2 ne velja → pogoj je neresničen", "Pri or mora veljati vsaj en del, tu ne velja nobeden."),
          ("!Funkcija vrne 1.", "Telo zanke se ne izvede niti enkrat, zato ostane začetna vrednost vsota = 1."),
      ])]),

    N(["programska_oprema", "programski_jezik"],
      "Program, ki celoten izvorni program pred izvajanjem prevede v strojno kodo, imenujemo",
      [P(1, "", [("!B", "Prevajalnik prevede ves program vnaprej, tolmač pa ukaze prevaja in izvaja sproti, enega za drugim.")],
         slika=izbire("tolmač (interpreter).", "prevajalnik (compiler).", "urejevalnik besedil.", "gonilnik."))]),

    N(["slika", "zapis_podatkov"],
      "Kateri šestnajstiški zapis barve v modelu RGB je pravilen? Obkrožite.",
      [P(1, "", [("!B", "Zapis ima 6 šestnajstiških števk (po dve za R, G in B), dovoljene so le števke 0–9 in A–F. A vsebuje G, C ima le 5 števk.")],
         slika=izbire("#1F2G3A", "#A0C4FF", "#12345"))]),

    N(["temeljni_pojmi"],
      "Tina ima pet enakih škatlic, v vsaki je šest barvic. Eno barvico je podarila Jaki. Izračunajte količino informacije, ki jo dobi Jaka, "
      "ko izve, iz katere škatlice je barvica. Prikažite izračun.",
      [P(1, "", [
          ("5 enako verjetnih možnosti", "Pomembno je le, katera od petih škatlic; barvice v njej niso del vprašanja."),
          ("I = log_{2} 5 ≈ 2,32 bita", ""),
          ("!≈ 2,32 bita", ""),
      ])]),

    N(["zgradba_racunalnika", "strojna_oprema", "programska_oprema"],
      "Računalniški sistem sestavljata strojna in programska oprema.",
      [P(2, "Vsakemu pojmu v prvem stolpcu z X določite, kateremu delu računalniškega sistema pripada.", [
          ("@slika", RAZVRSTI_RES),
          ("!programska oprema: urejevalnik, prevajalnik, OS; V/I: miška, zvočnik, kamera, skener; CPE: krmilna enota, ALE, programski števec; pomnilnik: RAM, ključek USB",
           "Programski števec je register v CPE. Ključek USB je zunanji pomnilnik."),
      ], slika=RAZVRSTI)]),

    N(["temeljni_pojmi"],
      "Pri komunikaciji pogosto srečamo pojme podatek, informacija, znanje in modrost. Spodaj so štirje zapisi. Vsakemu dodelite enega od pojmov "
      "in izbiro pojasnite. Prvi je že rešen.",
      [P(None, "", slika=tabela(["Zapis", "Pojem"], [
          ["»Ker ima Luka vročino že tri dni, ga peljemo k zdravniku.«", "modrost: znanje in izkušnje uporabimo za smiselno odločitev"],
          ["»38,6«", ""],
          ["»Lukova telesna temperatura je 38,6 °C.«", ""],
          ["»Temperatura nad 38 °C pomeni vročino.«", ""],
      ])),
       P(2, "", [
          ("!»38,6« – podatek", "Samo število brez pomena in okoliščin."),
          ("!»Lukova telesna temperatura je 38,6 °C.« – informacija", "Podatek, ki smo mu dali pomen (kaj, čigava, enota)."),
          ("!»Temperatura nad 38 °C pomeni vročino.« – znanje", "Splošno pravilo, ki ga lahko uporabimo pri različnih informacijah."),
      ])]),

    N(["splet", "pisna"],
      "Pri izdelavi spletnih strani pogosto uporabljamo jezika CSS in XML.",
      [P(1, "Zapišite neokrajšani imeni:", [
          ("!CSS: Cascading Style Sheets (kaskadne slogovne predloge); XML: eXtensible Markup Language (razširljivi označevalni jezik)", ""),
      ]),
       P(1, "Črka X v imenu XML pomeni, da je jezik razširljiv. Kaj lahko v jeziku XML razširjamo? Navedite primer.", [
          ("!Nabor značk: sami določimo nove značke (elemente) in njihovo zgradbo.", "Primer: `<knjiga><naslov>Kekec</naslov><avtor>Vandot</avtor></knjiga>`. HTML ima vnaprej določene značke."),
      ])]),

    N(["preglednice"],
      "V preglednicah lahko funkciji kot argument podamo več s podpičjem ločenih blokov celic. Blok je pravokotnik, ki ga določata zgornja leva in spodnja desna celica.",
      [P(None, "", slika=KRIZ),
       P(1, "Kakšen je rezultat klica `MAX(B1:B3;A2:C2)`?", [
          ("B1:B3 = 8, 1, 6;  A2:C2 = 7, 1, 9", "Prvi blok je stolpec B, drugi vrstica 2."),
          ("!9", ""),
      ]),
       P(1, "Klic `SUM(B1:B3;A2:C2)` vrne 32, čeprav je vsota vseh celic, ki jih bloka pokrivata, 31. Utemeljite, zakaj.", [
          ("8 + 1 + 6 + 7 + 1 + 9 = 32", "Celica B2 je v obeh blokih, zato jo SUM prišteje dvakrat."),
          ("!Celica B2 (vrednost 1) je v presečišču blokov in je šteta dvakrat.", ""),
      ])]),

    N(["splet"],
      "Šolska spletna stran je dostopna na naslovu `https://gim.si/`. Slika prikazuje strukturo map strani:",
      [P(None, "", slika=DREVO_SPLET),
       P(1, "Stran `index.html` v mapi `html` želimo oblikovati s predlogo `glavni.css`. Dopolnite ukaz `<link rel=\"stylesheet\" href=\"…\">` tako, da bo deloval tudi, ko mapo `projekt` premaknemo.", [
          ("html → .. = predstavitev → ../.. = strani", ""),
          ("!../../slog/glavni.css", "Odvisni naslov ostane pravilen, če premaknemo celo mapo projekt."),
      ]),
       P(1, "Iz katere datoteke `index.html` se prikaže stran, ko odpremo naslov `https://gim.si/strani/`?", [
          ("!Iz projekt/strani/index.html.", "Če naslov kaže na mapo, strežnik vrne privzeto datoteko index.html v tej mapi."),
      ]),
       P(1, "V `index.html` v mapi `html` je slika vključena z ukazom `<img src=\"../../logo.gif\">`. V kateri mapi je `logo.gif`?", [
          ("!V mapi strani.", "Prvi .. vodi v mapo predstavitev, drugi v mapo strani."),
      ])]),

    N(["druzbeni_vidiki"],
      "Digitalni razkorak je neenakost, ki nastane, ker nekateri nimajo dostopa do informacijske tehnologije ali je ne znajo uporabljati.",
      [P(1, "Na testu je bilo vprašanje: Obkrožite trditev, ki opisuje digitalni razkorak zaradi dohodka. Tim je obkrožil B. Ali je odgovoril pravilno? Utemeljite.", [
          ("!Ne. Pravilna je trditev A.", "Razkorak nastane, ker si revnejše družine težje privoščijo opremo in hiter internet (ni dostopa). Trditev B je posploševanje o volji ljudi, C pa ni resnična."),
      ], slika=izbire("Družine z nižjimi dohodki si težje privoščijo računalnik in hiter internet.",
                      "Revnejši ljudje ne želijo uporabljati interneta.",
                      "Internet je za ljudi z nižjimi dohodki nekoristen.")),
       P(1, "Zapišite primer digitalnega razkoraka med posamezniki, ki je posledica geografske lege.", [
          ("!Prebivalci oddaljenih hribovskih vasi nimajo širokopasovnega interneta, zato ne morejo delati od doma ali spremljati pouka na daljavo.", ""),
      ]),
       P(1, "Opišite, kako bi na spletu poiskali vremensko napoved za 1. januar 2025 in nato poročilo o vremenu na ta dan. Napovedi in poročila so objavljeni po datumih.", [
          ("!Napoved iščem v arhivu objav z datumom pred 1. 1. 2025 (npr. 31. 12. 2024), poročilo pa v objavah z datumom 1. 1. 2025 ali 2. 1. 2025.",
           "Napoved je objavljena pred dogodkom, poročilo po njem; iščemo po datumu objave, ne po datumu vremena."),
      ])]),

    N(["programiranje", "slika"],
      "Grafična oblikovalka ima barve zapisane v modelu RGB kot seznam treh celih števil med 0 in 255, spletni razvijalec pa jih potrebuje v šestnajstiškem zapisu "
      "`#RRGGBB`, kjer je vsaka komponenta zapisana z dvema šestnajstiškima števkama.",
      [P(3, "Napišite funkcijo `barvaHex(barva)`, ki dobi seznam `[R, G, B]` in vrne niz s šestnajstiškim zapisom barve. Za `[255, 128, 0]` vrne `\"#FF8000\"`. "
            "Vgrajenih funkcij za pretvorbo (`hex`, `format`) ne uporabite.", [
          ("255 = 15 · 16 + 15 → FF;  128 = 8 · 16 + 0 → 80;  0 → 00", "Prva števka je celi del deljenja s 16, druga ostanek."),
          ("@koda", '''
            def barvaHex(barva):
                stevke = "0123456789ABCDEF"
                niz = "#"
                for v in barva:
                    niz += stevke[v // 16] + stevke[v % 16]
                return niz''', "Za vsako komponento dodamo dve števki. Niz stevke služi kot tabela: stevke[11] je \"B\"."),
      ], slika=koda("def barvaHex(barva):"))]),

    N(["odlocanje"],
      "Tehnologija odločanja pomaga ljudem pri racionalnem odločanju. Nina se je prijavila na deset ponudb za študentsko delo, a pri nekaterih ni navedeno ne plačilo ne delovni čas.",
      [P(1, "Katero težavo bo Nina zagotovo imela pri odločanju, če jo sprejmejo povsod? Obkrožite in pojasnite.", [
          ("!B", "Variante (ponudbe) so številne in pomanjkljivo opisane, zato jih ne more zanesljivo oceniti po vseh kriterijih."),
      ], slika=izbire("Nejasen cilj odločitve.", "Številne in slabo opredeljene variante.", "Premalo kriterijev.", "Preveč odločevalcev.")),
       P(1, "Nina je naredila drevo kriterijev (spodaj). Trdi, da je odločitveni model sestavljen iz 9 odločitvenih tabel. Ali ima prav? Utemeljite.", [
          ("Notranja vozlišča: DELO, PLAČILO, POGOJI, KORISTNOST", "Odločitveno tabelo (funkcijo koristnosti) ima vsako sestavljeno vozlišče; listi so osnovni kriteriji, ki jih le ocenimo."),
          ("!Nima prav: tabele so 4.", ""),
      ], slika=DREVO_KRIT),
       P(1, "Ocene treh različic po sestavljenih kriterijih so v preglednici. Izberite najboljšo različico in izbiro pojasnite.", [
          ("!Različica 1", "Po nobenem kriteriju ni slabša od drugih dveh, pri vsaj enem pa je boljša (dominira): 2 je slabša pri pogojih in koristnosti, 3 pri plačilu."),
      ], slika=tabela(["Različica", "PLAČILO", "POGOJI", "KORISTNOST"], [
          ["Različica 1", "dobro", "odlično", "dobro"],
          ["Različica 2", "dobro", "dobro", "slabo"],
          ["Različica 3", "slabo", "odlično", "dobro"],
      ])),
       P(1, "Ninin prijatelj se je prijavil na druge ponudbe. Ali lahko uporabi Ninin odločitveni model? Utemeljite.", [
          ("!Da, če ima enake cilje in enako vrednoti kriterije; v model vnese le ocene svojih ponudb.", "Model (kriteriji in pravila) je neodvisen od variant. Če ima drugačne prioritete, mora spremeniti odločitvene tabele."),
      ])]),

    N(["temeljni_pojmi", "zapis_podatkov", "programiranje"],
      "Maja je 1000-krat vrgla igralno kocko s šestimi ploskvami in vsak met zapisala.",
      [P(1, "Najmanj koliko bitov je porabila za vse mete, če je vsak met zapisala posebej in z enakim številom bitov? Utemeljite z računom.", [
          ("2^2 = 4 < 6 ≤ 8 = 2^3 → 3 biti na met", "Z dvema bitoma zapišemo le štiri različne izide."),
          ("!1000 · 3 = 3000 bitov", ""),
      ]),
       P(1, "Poskus je ponovila z igro kamen, škarje, papir in zapisovala izide (kamen, škarje, papir). Predlagajte kodiranje z različno dolgimi kodami, ki ga lahko nedvoumno dekodiramo.", [
          ("!kamen = 0, škarje = 10, papir = 11", "Nobena koda ni začetek (predpona) druge, zato zaporedje bitov razdelimo enolično: 01011 = kamen, škarje, papir."),
      ], slika=tabela(["Izid", "Koda"], [["kamen", ""], ["škarje", ""], ["papir", ""]])),
       P(1, "Ali bi pri metih kocke iz prvega vprašanja porabili manj prostora, če bi izide zapisali s kodami različnih dolžin? Utemeljite.", [
          ("npr. 1 = 00, 2 = 01, 3 = 100, 4 = 101, 5 = 110, 6 = 111", "Dve kodi skrajšamo na 2 bita, ostale ostanejo 3-bitne; koda je še vedno predponska."),
          ("povprečno (2 · 2 + 4 · 3) / 6 ≈ 2,67 bita → ≈ 2667 bitov", ""),
          ("!Da, povprečno približno 2,67 bita na met namesto 3.", ""),
      ]),
       P(2, "Napišite funkcijo `kodiraj(izidi)`, ki dobi seznam izidov igre, npr. `[\"kamen\", \"papir\", \"papir\", \"škarje\"]`, in vrne niz bitov s kodami iz drugega vprašanja.", [
          ("@koda", '''
            def kodiraj(izidi):
                kode = {"kamen": "0", "škarje": "10", "papir": "11"}
                niz = ""
                for izid in izidi:
                    niz += kode[izid]
                return niz''', "Slovar preslika izid v kodo, kode stikamo v en niz. Za primer funkcija vrne \"0111110\"."),
      ], slika=koda("def kodiraj(izidi):"))]),

    N(["algoritem"],
      "Na listku je Jure našel diagram poteka. Spremenljivka i je celoštevilska. Operator / pri celih številih vrne celi del količnika (`37 / 10 = 3`), "
      "mod pa ostanek pri deljenju (`37 mod 10 = 7`).",
      [P(None, "", slika=DIAGRAM),
       P(2, "Zapišite zadnje tri vrednosti, ki jih izpiše program.", [
          ("i = 3907: izpiše 7, i = 390", ""),
          ("i = 390: izpiše 0, i = 39", ""),
          ("i = 39: izpiše 9, i = 3", ""),
          ("i = 3: izpiše 3, i = 0 → konec", ""),
          ("!0, 9, 3", "Program izpiše 7, 0, 9, 3; zadnje tri so 0, 9 in 3."),
      ]),
       P(2, "Ali je program, predstavljen z diagramom, algoritem? Utemeljite.", [
          ("!Da.", "Je končno zaporedje natančno določenih korakov. Pri vsakem obratu se i zmanjša (deljenje z 10), zato po končno mnogo korakih postane 0 in program se konča z rezultatom."),
      ]),
       P(1, "Kaj naredi program za poljubno pozitivno celo število i?", [
          ("!Izpiše števke števila i v obratnem vrstnem redu (od enic proti višjim mestom).", ""),
      ])]),
]

# ---------------------------------------------------------------- izpitna pola 2
VASI = {"A": (40, 60), "B": (150, 30), "C": (140, 140), "D": (250, 120), "E": (330, 60), "F": (370, 190), "G": (220, 225)}
CESTE = [("A", "B", 4), ("A", "C", 7), ("B", "C", 3), ("B", "D", 6), ("C", "D", 5), ("C", "E", 8), ("D", "E", 2),
         ("D", "F", 9), ("E", "F", 4), ("D", "G", 6), ("F", "G", 3), ("A", "G", 12)]
DREVO_MIN = [("D", "E"), ("B", "C"), ("F", "G"), ("A", "B"), ("E", "F"), ("C", "D")]

KNJIZNICA = preglednica([
    ["Član", "Naslov člana", "Telefon", "Naslov knjige", "Avtor", "ISBN", "Izposoja", "Vrnitev"],
    ["Eva Kos", "Cankarjeva 3, Kranj", "041 222 333", "Kekec", "J. Vandot", "961-01", "3. 2. 2025", "17. 2. 2025"],
    ["Eva Kos", "Cankarjeva 3, Kranj", "041 222 333", "Martin Krpan", "F. Levstik", "961-02", "3. 2. 2025", ""],
    ["Rok Zupan", "Gorenjska 8, Kranj", "031 444 555", "Kekec", "J. Vandot", "961-01", "20. 2. 2025", ""],
    ["Eva Kos", "Prešernova 1, Kranj", "041 222 333", "Deseti brat", "J. Jurčič", "961-03", "1. 3. 2025", ""],
])

PROGRAM_PLOSCICE = koda('''
    def CelePloscice(zid, ploscica):
        # ████████████████████████
        # ████████████████████████

    dol = int(input("Dolžina zidu > "))
    vis = int(input("Višina zidu > "))
    vod = CelePloscice(dol, 4) * CelePloscice(vis, 3)
    nav = CelePloscice(dol, 3) * CelePloscice(vis, 4)
    print("Ploščic v vodoravni postavitvi:", vod)
    print("Ploščic v navpični postavitvi:", ████''')

POLA2 = [
    N(["omrezja", "algoritem"],
      "Sedem vasi (A–G) želi zgraditi optično omrežje. Shema prikazuje možne povezave med vasmi in ceno izgradnje posamezne povezave (v deset tisoč evrih).",
      [P(None, "", slika=omrezje(VASI, CESTE)),
       P(4, "Načrtujte čim cenejše omrežje, ki bo omogočalo pošiljanje sporočil med vsemi vasmi (prek drugih vasi). Narišite ga.", [
          ("Povezave uredimo po ceni: DE 2, BC 3, FG 3, AB 4, EF 4, CD 5, BD 6, DG 6, AC 7 …", "Uporabimo Kruskalov postopek: vedno vzamemo najcenejšo povezavo, ki ne zapre kroga."),
          ("DE, BC, FG, AB, EF ✓", "Nobena ne zapre kroga."),
          ("CD ✓ → vseh 7 vasi je povezanih", "Za n vasi potrebujemo n − 1 = 6 povezav; ostale (BD, DG …) bi zaprle krog."),
          ("@slika", omrezje(VASI, CESTE, izbrane=DREVO_MIN)),
          ("!povezave DE, BC, FG, AB, EF, CD", ""),
      ]),
       P(1, "Kolikšna je cena najcenejšega omrežja?", [
          ("2 + 3 + 3 + 4 + 4 + 5", ""),
          ("!21 (210 000 €)", ""),
      ])]),

    N(["splet"],
      "Na spletni strani želimo obrazec za registracijo z naslovom Nov račun, poljem za uporabniško ime, poljem za geslo (znaki se ne vidijo), "
      "potrditvenim poljem Strinjam se s pogoji in gumbom Ustvari račun, ki podatke pošlje strežniku.",
      [P(5, "Dopolnite manjkajoče dele kode HTML.", [
          ("@koda", '''
            <form action="/registracija" method="post">
              <h2>Nov račun</h2>
              <label for="ime">Uporabniško ime</label>
              <input type="text" id="ime" name="ime">
              <label for="geslo">Geslo</label>
              <input type="password" id="geslo" name="geslo">
              <label><input type="checkbox" name="pogoji"> Strinjam se s pogoji</label>
              <button type="submit">Ustvari račun</button>
            </form>''', "Obrazec je element form; polje za vnos je input; type=\"password\" skrije znake; gumb s type=\"submit\" odda obrazec."),
          ("!form, /h2, input, password, submit", ""),
      ], slika=koda('''
          <_____ action="/registracija" method="post">
            <h2>Nov račun<_____>
            <label for="ime">Uporabniško ime</label>
            <_____ type="text" id="ime" name="ime">
            <label for="geslo">Geslo</label>
            <input type="_____" id="geslo" name="geslo">
            <label><input type="checkbox" name="pogoji"> Strinjam se s pogoji</label>
            <button type="_____">Ustvari račun</button>
          </form>'''))]),

    N(["baze", "preglednice"],
      "Mestna knjižnica izposojo vodi v eni sami preglednici. Knjižničarka Ana se je odločila, da podatke razdeli v več tabel in uporabi relacijsko podatkovno bazo.",
      [P(None, "", slika=KNJIZNICA),
       P(2, "Navedite in utemeljite dva razloga za takšno preoblikovanje.", [
          ("!1. Odpravimo podvajanje (redundanco): podatki o članu in knjigi so zapisani le enkrat.", "V preglednici se Eva Kos pojavi trikrat, Kekec dvakrat."),
          ("!2. Preprečimo neskladja (anomalije): naslov spremenimo na enem mestu.", "V zadnji vrstici ima Eva drug naslov kot prej – ne vemo, kateri je pravi. Baza omogoča tudi hitrejše poizvedbe in hkratno delo več uporabnikov."),
      ]),
       P(3, "Oblikujte tabele relacijske podatkovne baze z atributi. Vsaka tabela naj ima primarni ključ.", [
          ("@slika", entitete(
              ("Clan", ["#id_clana", "ime", "priimek", "naslov", "telefon"]),
              ("Knjiga", ["#ISBN", "naslov", "avtor"]),
              ("Izposoja", ["#id_izposoje", "→id_clana", "→ISBN", "datum_izposoje", "datum_vrnitve"]),
              razmerja=["Clan 1 : N Izposoja", "Knjiga 1 : N Izposoja"])),
          ("!Clan(id_clana, ime, priimek, naslov, telefon), Knjiga(ISBN, naslov, avtor), Izposoja(id_izposoje, id_clana, ISBN, datum_izposoje, datum_vrnitve)",
           "Izposoja povezuje člana in knjigo (razmerje N : M razrešeno z vezno tabelo). Če ima knjižnica več izvodov iste knjige, dodamo še tabelo Izvod."),
      ])]),

    N(["programiranje"],
      "Keramičar Matic polaga ploščice velikosti 4 × 3 enote, vodoravno (dolžina 4, višina 3) ali navpično (dolžina 3, višina 4). "
      "Zadnjo ploščico v vrsti ali stolpcu mora pogosto odrezati, ostanka pa ne more uporabiti. Program mu za dane mere zidu izpiše, koliko ploščic potrebuje:",
      [P(None, "", slika=koda('''
          Dolžina zidu > 10
          Višina zidu > 7
          Ploščic v vodoravni postavitvi: 9
          Ploščic v navpični postavitvi: 8''')),
       P(None, "Na izpisu programa je Matic s kavo polil funkcijo `CelePloscice`, ki vrne, koliko ploščic je potrebnih v eni vrsti oziroma stolpcu, in del zadnjega stavka print:", slika=PROGRAM_PLOSCICE),
       P(4, "Napišite funkcijo `CelePloscice` in dopolnite manjkajoči del stavka print.", [
          ("10 / 4 = 2,5 → 3 ploščice, 7 / 3 = 2,33 → 3 ploščice", "Število zaokrožimo navzgor, ker tudi odrezano ploščico porabimo celo."),
          ("@koda", '''
            def CelePloscice(zid, ploscica):
                n = zid // ploscica
                if zid % ploscica != 0:
                    n += 1
                return n''', "Celoštevilsko deljenje in še ena ploščica, če ostane kos zidu. Enako: (zid + ploscica - 1) // ploscica."),
          ("@koda", 'print("Ploščic v navpični postavitvi:", nav)', "Manjka spremenljivka nav."),
      ]),
       P(5, "Rezanje ploščic je drago, zato želi Matic vedeti še, koliko ploščic mora prerezati. Za zid 10 × 7 v vodoravni postavitvi jih mora prerezati 5, "
            "za zid 12 × 9 pa nobene. Napišite funkcijo `RezanihPloscic(zid_dol, zid_vis, plo_a, plo_b)`, ki vrne število prerezanih ploščic "
            "(prva dva parametra sta mere zidu, druga dva mere ploščice).", [
          ("10 × 7: vseh 3 · 3 = 9, celih 2 · 2 = 4 → 5 rezanih", "Cele ostanejo samo ploščice, ki v celoti pokrivajo zid po obeh smereh."),
          ("@koda", '''
            def RezanihPloscic(zid_dol, zid_vis, plo_a, plo_b):
                vse = CelePloscice(zid_dol, plo_a) * CelePloscice(zid_vis, plo_b)
                cele = (zid_dol // plo_a) * (zid_vis // plo_b)
                return vse - cele''', "Vse potrebne ploščice minus tiste, ki jih ni treba rezati."),
          ("12 × 9: 3 · 3 − 3 · 3 = 0", "Preverimo drugi primer."),
      ], slika=koda("def RezanihPloscic(zid_dol, zid_vis, plo_a, plo_b):"))]),

    N(["baze", "programiranje"],
      "Planinsko društvo vodi register planinskih koč in poti. Koče so oštevilčene od 0 do n − 1, poti od 0 do m − 1. Vsaka pot povezuje dve koči, "
      "po vsaki poti lahko hodimo v obe smeri. Register mora omogočati poizvedbi: kateri koči povezuje dana pot in katere poti se začnejo pri dani koči.",
      [P(3, "Predlagajte model relacijske podatkovne baze z entitetami, atributi ter primarnimi in tujimi ključi, ki omogoča obe poizvedbi.", [
          ("@slika", entitete(
              ("Koca", ["#id_koce", "ime", "nadmorska_visina"]),
              ("Pot", ["#id_poti", "oznaka", "cas_hoje", "→id_koce_1", "→id_koce_2"]),
              razmerja=["Koca 1 : N Pot (kot prva koča)", "Koca 1 : N Pot (kot druga koča)"])),
          ("!Koca(id_koce, ime, …), Pot(id_poti, …, id_koce_1, id_koce_2) – oba tuja ključa kažeta na Koca.id_koce", "Koči poti preberemo iz vrstice poti; poti koče x so vse vrstice z id_koce_1 = x ali id_koce_2 = x."),
      ]),
       P(None, "Programerka Lara je pripravila knjižnico `register.py` s funkcijami: `steviloKoc()` in `steviloPoti()` vrneta n in m, "
               "`PovezujeKoci(idPoti)` vrne seznam dveh koč, ki ju povezuje pot, `PotiIzKoce(idKoce)` pa seznam poti, ki se začnejo pri koči. Primer uporabe:",
         slika=koda('''
            from register import *
            for idPoti in range(steviloPoti()):
                koci = PovezujeKoci(idPoti)
                print("pot", idPoti, "povezuje koči", koci[0], "in", koci[1])''')),
       P(4, "Velikost koče je število poti, ki se začnejo pri njej. Z Larino knjižnico napišite funkcijo `NajvecjiKoci()`, ki vrne dve največji koči. "
            "(Za iskanje samo največje koče dobite del točk.)", [
          ("@koda", '''
            def NajvecjiKoci():
                prva, druga = -1, -1          # indeksa največje in druge največje
                vel1, vel2 = -1, -1           # njuni velikosti
                for k in range(steviloKoc()):
                    v = len(PotiIzKoce(k))
                    if v > vel1:
                        prva, druga = k, prva
                        vel1, vel2 = v, vel1
                    elif v > vel2:
                        druga, vel2 = k, v
                return prva, druga''', "Hranimo dve najboljši vrednosti. Ko najdemo novo največjo, dosedanja prva postane druga."),
      ], slika=koda("def NajvecjiKoci():")),
       P(3, "Izkazalo se je, da je v registru napaka: nekatere poti, ki naj bi povezovale koči p in q, niso navedene med potmi obeh koč. Napišite program, ki izpiše takšne poti.", [
          ("@koda", '''
            for idPoti in range(steviloPoti()):
                p, q = PovezujeKoci(idPoti)
                if idPoti not in PotiIzKoce(p) or idPoti not in PotiIzKoce(q):
                    print(idPoti)''', "Za vsako pot preverimo, ali jo vsebujeta seznama obeh koč. Če manjka vsaj pri eni, je zapis napačen."),
      ])]),

    N(["programiranje", "algoritem"],
      "Sošolci računajo stopnjo prijateljstva po nenavadnem postopku.\n\n"
      "**Skrči.** Imamo seznam števk. Vsak par sosednjih števk zamenjamo z zadnjo števko njune vsote, s čimer dobimo seznam, krajši za eno. "
      "Postopek ponavljamo, dokler ne ostaneta dve števki; ti preberemo kot dvomestno število. Na primer: 3 1 1 1 2 → 4 2 2 3 → 6 4 5 → 0 9, rezultat je 9.\n\n"
      "**Seznam števk.** Imeni obeh prijateljev zapišemo z velikimi črkami, združimo vse črke, jih uredimo po slovenski abecedi in za vsako črko, ki se pojavi, "
      "zapišemo, kolikokrat se pojavi. Za MIHA in MAJA dobimo A = 3, H = 1, I = 1, J = 1, M = 2, torej seznam 3 1 1 1 2 in stopnjo prijateljstva 9.",
      [P(3, "Izračunajte stopnjo prijateljstva med Žanom in Laro (ŽAN in LARA).", [
          ("Ž A N L A R A → A = 3, L = 1, N = 1, R = 1, Ž = 1", "Ž je zadnja črka slovenske abecede."),
          ("3 1 1 1 1 → 4 2 2 2 → 6 4 4 → 0 8", "4 + 4 = 8, 6 + 4 = 10 → 0."),
          ("!8", ""),
      ]),
       P(3, "Napišite funkcijo `skrci(seznam)`, ki dobi seznam števk (vsaj dve) in vrne rezultat postopka Skrči kot število med 0 in 99.", [
          ("@koda", '''
            def skrci(seznam):
                while len(seznam) > 2:
                    nov = []
                    for i in range(len(seznam) - 1):
                        nov.append((seznam[i] + seznam[i + 1]) % 10)
                    seznam = nov
                return seznam[0] * 10 + seznam[1]''', "% 10 vrne zadnjo števko vsote. Vsak obrat skrajša seznam za ena, zato se zanka konča."),
      ], slika=koda("def skrci(seznam):")),
       P(4, "Napišite funkcijo `prijateljstvo(ime1, ime2)`, ki vrne stopnjo prijateljstva. Predpostavite, da funkcija `skrci` deluje.", [
          ("@koda", '''
            abeceda = "ABCČDEFGHIJKLMNOPRSŠTUVZŽ"

            def prijateljstvo(ime1, ime2):
                imeni = ime1.upper() + ime2.upper()
                stevke = []
                for crka in abeceda:
                    n = imeni.count(crka)
                    if n > 0:
                        stevke.append(n)
                return skrci(stevke)''', "Gremo po abecedi (tako je seznam urejen) in za vsako črko preštejemo pojavitve; črk, ki jih ni, ne zapišemo."),
      ], slika=koda('''
          abeceda = "ABCČDEFGHIJKLMNOPRSŠTUVZŽ"
          def prijateljstvo(ime1, ime2):'''))]),
]
