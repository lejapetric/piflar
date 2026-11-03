LETO, ROK, DATUM = 2026, "spomladanski", "ponedeljek, 15. junij 2026"

# ---------------------------------------------------------------- izpitna pola 1
SIGNAL = [(0, 0.4), (1, 1.6), (2, 2.7), (3, 2.9), (4, 2.2), (5, 1.1), (6, 0.3), (7, 0.8), (8, 2.1)]
VZORCI = [(0, 0), (1, 2), (2, 3), (3, 3), (4, 2), (5, 1), (6, 0), (7, 1), (8, 2)]

POGOJI = slike_v_vrsti(
    ("A", koda('''
        if x > 0:
            print("+")
        else if x < 0:
            print("-")
        else:
            print(0)''')),
    ("B", koda('''
        if x > 0
            print("+")
        elif x < 0:
            print("-")
        else:
            print(0)''')),
    ("C", koda('''
        if x > 0:
            print("+")
        elif x < 0:
            print("-")
        else:
            print(0)''')),
    ("D", koda('''
        if x > 0:
            print("+")
        elif:
            print("-")
        else x == 0:
            print(0)''')),
)

DREVO = koda('''
    sola
    ├── index.html
    ├── slog
    │   └── glavni.css
    ├── mediji
    │   └── himna.mp3
    └── strani
        ├── predmeti
        │   └── seznam.html
        └── galerija
            └── razred.jpg''')

OCENE = preglednica([
    ["Ocene Nike Kovač", "", "", "", "", "", "", "", ""],
    ["Predmet", "1.", "2.", "3.", "4.", "5.", "6.", "Povprečje", "Št. ocen"],
    ["matematika", 4, 5, 3, 4, "", "", "", ""],
    ["slovenščina", 3, 4, 4, "", "", "", "", ""],
    ["angleščina", 5, 5, 4, 5, 5, "", "", ""],
    ["informatika", 5, 4, 5, 5, "", "", "", ""],
    ["fizika", 2, 3, 1, 4, 3, "", "", ""],
    ["kemija", 4, 3, "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["Št. petic", "", "", "", "", "", "", "Skupno povprečje", ""],
    ["Ocene pod 3", "", "", "", "", "", "", "", ""],
])

DIAGRAM = diagram([
    ("zacetek",),
    ("ukaz", "k = 0\nt = 1\nn = 50"),
    ("pogoj", "n > t", [("ukaz", "n = n - t\nt = t * 2\nk = k + 1")], [("izhod", "izpiši k, t, n")]),
    ("konec",),
])

POLA1 = [
    N(["zvok", "zapis_podatkov"],
      "Ana ima program, ki analogni signal digitalizira tako, da ga vzorči vsako milisekundo (perioda vzorčenja je 1 ms) "
      "z dvobitno globino. Vrednost vsakega vzorca zaokroži na najbližjo od štirih ravni 0, 1, 2 ali 3.\n\n"
      "V koordinatni sistem narišite, kaj za spodnji analogni signal izriše Anin program.",
      [P(1, "", [
          ("Dvobitna globina: 2^2 = 4 ravni (0, 1, 2, 3).", "Vsak vzorec lahko zavzame samo eno od štirih vrednosti."),
          ("t = 0, 1, 2, … , 8 ms", "Signal odčitamo v vsaki milisekundi."),
          ("0,4 → 0;  1,6 → 2;  2,7 → 3;  2,9 → 3;  2,2 → 2;  1,1 → 1;  0,3 → 0;  0,8 → 1;  2,1 → 2", "Vsako vrednost zaokrožimo na najbližjo raven."),
          ("@slika", signal(SIGNAL, y_max=3, vzorci=VZORCI)),
          ("!vzorci: 0, 2, 3, 3, 2, 1, 0, 1, 2 (stopničast signal)", "Program med dvema vzorcema drži zadnjo vrednost, zato je izris stopničast."),
      ])],
      slika=signal(SIGNAL, y_max=3)),

    N(["programski_jezik", "programiranje"],
      "Samo eden od štirih pogojnih stavkov v jeziku Python je sintaktično pravilen. Kateri? Obkrožite ga.",
      [P(1, "", [
          (None, "A: `else if` v Pythonu ne obstaja, pravilno je `elif`."),
          (None, "B: za pogojem `if x > 0` manjka dvopičje."),
          (None, "D: `elif` mora imeti pogoj, `else` pa ga ne sme imeti."),
          ("!C", "Pravilna je samo zgradba if – elif – else, kjer imata if in elif pogoj in dvopičje, else pa samo dvopičje."),
      ])],
      slika=POGOJI),

    N(["omrezja"],
      "Spodnji naslov IPv6 napišite na najkrajši možen način:\n\n`2A01:0260:0000:0000:0000:00F0:0000:0001`",
      [P(1, "", [
          ("2A01:260:0:0:0:F0:0:1", "V vsaki skupini izpustimo vodilne ničle."),
          ("!2A01:260::F0:0:1", "Najdaljše zaporedje skupin z ničlami (tri skupine) nadomestimo z ::. To smemo storiti samo enkrat, zato ostane predzadnja ničla zapisana."),
      ])]),

    N(["splet"],
      "Tine je za spletno stran napisal spodnjo kodo HTML. Želel je, da se na vrhu strani v velikih črkah izpiše "
      "naslov Naši izleti, nato pa seznam izletov. Ko je stran odprl v brskalniku, se je izpisal le seznam.\n\n"
      "Nedvoumno popravite kodo tako, da se bo naslov Naši izleti prikazal na vrhu spletne strani.",
      [P(1, "", [
          (None, "Besedilo v atributu `title` se na strani ne izpiše (pokaže se le kot namig ob miški), element `<h1>` pa je prazen."),
          ("@koda", '<h1>Naši izleti</h1>', "Besedilo naslova mora biti med začetno in končno značko h1."),
          ("!<h1>Naši izleti</h1> namesto <h1 title=\"Naši izleti\"></h1>", ""),
      ])],
      slika=koda('''
        <html>
          <head>
            <title>Izleti</title>
          </head>
          <body>
            <h1 title="Naši izleti"></h1>
            <ol>
              <li><a href="izleti/triglav.html">Triglav</a></li>
              <li><a href="izleti/snežnik.html">Snežnik</a></li>
              <li><a href="izleti/pohorje.html">Pohorje</a></li>
            </ol>
          </body>
        </html>''')),

    N(["zapis_podatkov"],
      "Zapišite desetiško vrednost, ki jo kot nepredznačeno število hrani osembitni register z vsebino `11010011`.",
      [P(1, "", [
          ("1·128 + 1·64 + 0·32 + 1·16 + 0·8 + 0·4 + 1·2 + 1·1", "Vsak bit pomnožimo z ustrezno potenco števila 2 (od 2^7 do 2^0)."),
          ("!211", ""),
      ])]),

    N(["omrezja", "druzbeni_vidiki"],
      "Mina na letališču čaka na let. Letališče ponuja brezplačno brezžično omrežje, a povezava med njenim telefonom in "
      "dostopno točko ni šifrirana, zato lahko promet prestreže kdorkoli v bližini. Mina se želi prijaviti v svojo spletno pošto.",
      [P(1, "Kaj morata Minin brskalnik in poštni strežnik izmenjati najprej, preden Mina vpiše geslo, in zakaj?", [
          ("!Strežnik pošlje svoj certifikat z javnim ključem, nato se dogovorita za skupni (sejni) ključ za šifriranje.",
           "Ker omrežje samo ne šifrira prometa, mora šifriranje poskrbeti povezava med brskalnikom in strežnikom. Certifikat dokaže, da je strežnik pravi, s ključem pa šifrirata vse nadaljnje podatke (tudi geslo)."),
      ]),
       P(1, "Kateri protokol naj Mina uporabi, da bo komunicirala varno?", [
          ("!HTTPS (HTTP prek TLS)", "Naslov se mora začeti s https:// (ključavnica v brskalniku)."),
      ])]),

    N(["zapis_podatkov", "druzbeni_vidiki"],
      "Babica si ne zapomni gesla za domače brezžično omrežje (`Sonce-na-vrtu-42`) in svoje številke naročnika pri "
      "operaterju (`3815520477`). Vnuk ji je oboje natisnil na listek: geslo kot QR-kodo, številko naročnika pa kot črtno kodo. "
      "Na babičin telefon je namestil aplikacijo za branje kod.",
      [P(1, "S katero kodo je zapisal geslo? Utemeljite.", [
          ("!S QR-kodo.", "Navadna črtna koda (na primer EAN) hrani le kratko zaporedje števk, QR-koda je dvodimenzionalna in lahko hrani daljše besedilo s črkami in ločili."),
      ]),
       P(1, "Babica misli, da sta podatka na listku šifrirana in zato varna. Ali ima prav? Utemeljite.", [
          ("!Nima. Podatka sta le kodirana, ne šifrirana.", "Kodiranje je javno znan način zapisa, ki ga prebere vsak z bralnikom kod. Šifrirani podatki bi bili berljivi samo s skrivnim ključem."),
      ])]),

    N(["programiranje"],
      "Gal ima seznam meritev hitrosti vetra (cela števila). Meritve bi rad prikazal kot vodoravne stolpce: za vsako meritev "
      "v svojo vrstico izpiše toliko pomišljajev, kolikor je vrednost meritve, na koncu pa navpično črto. "
      "Za meritve `[3, 0, 5, 1]` naj program izpiše:",
      [P(None, "", slika=koda('''
          ---|
          |
          -----|
          -|''')),
       P(2, "Napišite funkcijo `Stolpci(meritve)`, ki meritve izpiše kot zgoraj.", [
          ("@koda", '''
            def Stolpci(meritve):
                for m in meritve:
                    print("-" * m + "|")''', "Za vsako meritev sestavimo niz: m-krat ponovljen pomišljaj in navpična črta."),
          (None, "Enako dobimo z notranjo zanko: `for i in range(m): print(\"-\", end=\"\")` in nato `print(\"|\")`."),
      ], slika=koda("def Stolpci(meritve):"))]),

    N(["baze"],
      "Pri relacijskih podatkovnih bazah pogosto srečamo izraza primarni ključ in tuji ključ.",
      [P(1, "Pojasnite, kaj je tuji ključ.", [
          ("!Atribut (ali več atributov) v eni tabeli, katerega vrednosti so vrednosti primarnega ključa druge (ali iste) tabele.",
           "Primer: v tabeli Ocena je atribut id_dijaka, ki kaže na dijaka v tabeli Dijak."),
      ]),
       P(1, "Za kaj uporabljamo tuji ključ in kako je povezan s primarnim ključem?", [
          ("!S tujim ključem povežemo tabeli: vrednost tujega ključa se mora ujemati z obstoječo vrednostjo primarnega ključa v povezani tabeli.",
           "Tako vemo, kateri vrstici druge tabele pripada zapis (referenčna celovitost)."),
      ])]),

    N(["splet"],
      "Na sliki je drevesna struktura map spletne strani šole.",
      [P(None, "", slika=DREVO),
       P(1, "V datoteki `seznam.html` želimo uporabiti slogovno predlogo `glavni.css`. Dopolnite ukaz "
            "`<link rel=\"stylesheet\" href=\"…\">` tako, da bo deloval tudi, ko mapo `sola` z vsemi podmapami prestavimo drugam.", [
          ("seznam.html je v mapi predmeti → .. je strani → ../.. je sola", "Uporabimo odvisni (relativni) naslov, ki se ne spremeni, če premaknemo celo mapo sola."),
          ("!../../slog/glavni.css", ""),
      ]),
       P(1, "V `seznam.html` želimo vključiti še posnetek `himna.mp3`. Dopolnite `<audio controls src=\"…\">`.", [
          ("!../../mediji/himna.mp3", "Iz mape predmeti gremo dve ravni navzgor v mapo sola in nato v mapo mediji."),
      ]),
       P(1, "V `seznam.html` je slika vključena z ukazom `<img src=\"../../znak.png\">`. V kateri mapi je datoteka `znak.png`?", [
          ("!V mapi sola.", "Prvi .. vodi iz mape predmeti v mapo strani, drugi .. iz mape strani v mapo sola."),
      ])]),

    N(["druzbeni_vidiki", "vloga_it"],
      "Digitalne tehnologije vplivajo na naše življenje. Na levi so naštete tri tehnologije, na desni trije opisi vpliva.",
      [P(None, "", slika=tabela(["Tehnologija", "Opis vpliva"], [
          ["internet stvari", "sledljiv zapis transakcij, ki ga ni mogoče naknadno spremeniti"],
          ["veriženje blokov (blockchain)", "ogled muzeja na drugem koncu sveta brez potovanja"],
          ["navidezna resničnost", "termostat sam prilagodi ogrevanje, ko se bližamo domu"],
      ])),
       P(3, "Vsako tehnologijo povežite z opisom njenega najustreznejšega vpliva.", [
          ("!internet stvari – termostat sam prilagodi ogrevanje", "Naprave so povezane v omrežje in si izmenjujejo podatke (lokacija telefona, termostat)."),
          ("!veriženje blokov – sledljiv zapis transakcij, ki ga ni mogoče spremeniti", "Vsak blok vsebuje povzetek (zgoščeno vrednost) prejšnjega, zato bi sprememba porušila verigo."),
          ("!navidezna resničnost – ogled muzeja brez potovanja", "Uporabnik se z očali za VR sprehaja po računalniško ustvarjenem prostoru."),
      ])]),

    N(["pisna", "programiranje"],
      "V 8-bitni kodni tabeli ASCII ima vsak znak svojo številsko kodo.",
      [P(1, "Števka 0 ima kodo 48. Zapišite kode števk 1, 2 in 3 v dvojiškem zapisu.", [
          ("49 = 00110001, 50 = 00110010, 51 = 00110011", "Števke si v tabeli sledijo po vrsti, zato so kode 49, 50 in 51."),
          ("!1 = 00110001, 2 = 00110010, 3 = 00110011", ""),
      ]),
       P(1, "Velika črka A ima kodo 65, mala črka a pa 97. Za koliko se razlikujeta kodi velike in male črke? Razliko zapišite tudi dvojiško.", [
          ("97 − 65 = 32 = 00100000", "Razlika je enaka za vse črke angleške abecede: koda male črke ima prižgan bit z vrednostjo 32."),
          ("!32 = 00100000_{2}", ""),
      ]),
       P(1, "Napišite funkcijo `MaleCrke(crka)`, ki velike črke angleške abecede spremeni v male, vse druge znake pa pusti nespremenjene. "
            "Uporabite lahko funkciji `ord` in `chr` (`ord(\"A\")` vrne 65, `chr(97)` vrne `\"a\"`).", [
          ("@koda", '''
            def MaleCrke(crka):
                if "A" <= crka <= "Z":
                    return chr(ord(crka) + 32)
                return crka''', "Samo za velike črke prištejemo 32 h kodi, druge znake vrnemo, kot so."),
      ], slika=koda("def MaleCrke(crka):"))]),

    N(["algoritem", "programiranje"],
      "Jan je od sestre dobil diagram poteka in vprašanje: kaj bo program izpisal?",
      [P(None, "", slika=DIAGRAM),
       P(1, "Kakšne so vrednosti spremenljivk k, t in n ob koncu izvajanja programa?", [
          ("n = 50, t = 1, k = 0", "Začetne vrednosti."),
          ("50 > 1: n = 49, t = 2, k = 1", "Pogoj velja, izvedemo telo zanke."),
          ("49 > 2: n = 47, t = 4, k = 2", ""),
          ("47 > 4: n = 43, t = 8, k = 3", ""),
          ("43 > 8: n = 35, t = 16, k = 4", ""),
          ("35 > 16: n = 19, t = 32, k = 5", ""),
          ("19 > 32 ne velja → konec zanke", "Zanka se konča, ko n ni več večji od t."),
          ("!k = 5, t = 32, n = 19", ""),
      ]),
       P(3, "Program, zapisan z diagramom poteka, zapišite v poljubnem programskem jeziku.", [
          ("@koda", '''
            k = 0
            t = 1
            n = 50
            while n > t:
                n = n - t
                t = t * 2
                k = k + 1
            print(k, t, n)''', "Romb s puščico nazaj je zanka while: telo se ponavlja, dokler pogoj velja. Izpis je za zanko."),
      ])]),

    N(["strojna_oprema", "zgradba_racunalnika", "zapis_podatkov"],
      "Petra obdeluje zapis genoma pšenice, ki ima približno 16 milijard nukleotidov. Vsak nukleotid je zapisan z eno od "
      "ASCII-črk A, C, G ali T, zato je zapis velik približno 16 milijard bajtov (16 GB).",
      [P(2, "Program pri obdelavi 300-krat pregleda vse nukleotide in deluje zelo počasi. Petrin računalnik ima procesor s 3,2 GHz, "
            "8 GB delovnega pomnilnika (RAM), 32 MB predpomnilnika in trdi disk HDD z 1 TB. "
            "Katera komponenta je kritična in zakaj?", [
          ("!Delovni pomnilnik (RAM): 16 GB podatkov ne gre v 8 GB RAM.", "Ker zapis ne gre v pomnilnik, ga mora program pri vsakem od 300 pregledov znova brati s počasnega trdega diska, ki je več tisočkrat počasnejši od RAM-a."),
      ]),
       P(1, "Na istem računalniku teče program, ki za svoje spremenljivke porabi 2 kB. Zakaj predpomnilnik poveča hitrost tega programa? Obkrožite.", [
          ("!B", "Predpomnilnik ima veliko krajši dostopni čas kot delovni pomnilnik; 2 kB spremenljivk gre v celoti vanj."),
      ], slika=R('<ol class="pola-izbire">'
                 '<li><span class="izbira-crka">A</span><span>Ker je predpomnilnik večji od delovnega pomnilnika.</span></li>'
                 '<li><span class="izbira-crka">B</span><span>Ker ima predpomnilnik krajši čas dostopa do podatkov.</span></li>'
                 '<li><span class="izbira-crka">C</span><span>Ker se podatki v predpomnilniku ob izklopu ohranijo.</span></li>'
                 '<li><span class="izbira-crka">D</span><span>Ker se v predpomnilnik vedno prenese celoten disk.</span></li></ol>')),
       P(2, "Vsi štirje nukleotidi se pojavljajo približno enako pogosto. Predlagajte zapis, ki porabi manj prostora. Za koliko se zmanjša velikost zapisa?", [
          ("4 možnosti → log_{2} 4 = 2 bita na nukleotid", "Za štiri enako verjetne znake zadoščata 2 bita, npr. A = 00, C = 01, G = 10, T = 11."),
          ("16 · 10^9 · 2 bita = 4 · 10^9 B = 4 GB", "Namesto 8 bitov (en bajt ASCII) porabimo 2 bita."),
          ("!2 bita na nukleotid: zapis je 4-krat manjši (4 GB namesto 16 GB).", ""),
      ])]),

    N(["preglednice"],
      "Nika v preglednici beleži ocene pri maturitetnih predmetih (največ šest ocen na predmet). Pri odgovorih lahko uporabite funkcije:\n\n"
      "`AVERAGE(obseg)` vrne povprečje števil v obsegu; `COUNT(obseg)` prešteje celice s števili; "
      "`COUNTA(obseg)` prešteje neprazne celice; `COUNTIF(obseg; pogoj)` prešteje celice, ki ustrezajo pogoju; "
      "`SUM(obseg)` sešteje števila v obsegu.",
      [P(None, "", slika=OCENE),
       P(1, "Napišite formulo za celico H3, ki izračuna povprečno oceno predmeta in jo lahko kopiramo navzdol do H8.", [
          ("!=AVERAGE(B3:G3)", "Relativni naslovi se pri kopiranju v vrstico 4 spremenijo v B4:G4. Prazne celice AVERAGE ne upošteva."),
      ]),
       P(1, "Kakšno formulo zapišemo v celico I10, da izračuna povprečje vseh povprečnih ocen?", [
          ("!=AVERAGE(H3:H8)", ""),
      ]),
       P(1, "Napišite formulo za celico I3, ki prešteje ocene predmeta in jo lahko kopiramo navzdol.", [
          ("!=COUNT(B3:G3)", "COUNT šteje samo celice s števili, prazne izpusti."),
      ]),
       P(1, "Napišite formulo za celico B10, ki prešteje petice pri 1. ocenjevanju, tako da jo lahko kopiramo v desno do G10.", [
          ("!=COUNTIF(B3:B8; 5)", "Pri kopiranju v desno se stolpec spremeni (C3:C8, D3:D8 …)."),
      ]),
       P(1, "Napišite formulo za celico B11, ki prešteje vse ocene, nižje od 3, pri vseh predmetih.", [
          ("!=COUNTIF(B3:G8; \"<3\")", "Pogoj s primerjavo zapišemo v narekovajih. Obseg zajame vse ocene."),
      ])]),
]

# ---------------------------------------------------------------- izpitna pola 2
SL_A = [[3, 3, 0, 0], [3, 3, 0, 0], [1, 1, 0, 3], [1, 1, 1, 2]]
SL_B = [[0, 3, 3, 0], [1, 2, 2, 1], [3, 0, 0, 3], [2, 1, 1, 2]]
SL_C = [[2, 2, 3, 0], [2, 2, 2, 1], [3, 0, 1, 1], [2, 1, 1, 1]]
SL_D = [[0, 0, 0, 0], [0, 0, 0, 0], [3, 3, 3, 3], [3, 3, 3, 3]]

PREGL_1 = preglednica([
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["2", "=IF(A6>15;A6;A6+B7)", "", "=D5+1", "=IF(D6>15;D6;D6+E7)", "", "=G5+1", "=IF(G6>5;G6;G6+H7)"],
    ["", "", "", "", "", "", "", ""],
])

POLA2 = [
    N(["preglednice"],
      "V preglednici so v vrstici 6 vpisane spodnje vrednosti in formule (prazne celice imajo vrednost 0).",
      [P(None, "", slika=PREGL_1),
       P(2, "V celici A6 je vrednost 2, v celici B6 pa formula `=IF(A6>15;A6;A6+B7)`. Celici A6 in B6 kopiramo navzgor do vrstice 2. "
            "Kaj se izpiše v celici B2? Utemeljite.", [
          ("A2 … A6 = 2", "Vrednost se pri kopiranju ne spremeni."),
          ("B6 = 2 + B7 = 2 + 0 = 2", "B7 je prazna. Pogoj 2 > 15 nikoli ne velja, zato vsaka celica prišteje vrednost celice pod sabo."),
          ("B5 = 2 + B6 = 4, B4 = 6, B3 = 8", "Pri kopiranju navzgor se naslova spremenita v A5 in B6, A4 in B5 …"),
          ("!B2 = 2 + B3 = 10", ""),
      ]),
       P(2, "V celici D6 je formula `=D5+1`, v celici E6 pa `=IF(D6>15;D6;D6+E7)`. Celici kopiramo navzgor do vrstice 2. "
            "Kaj se izpiše v celici D2? Utemeljite.", [
          ("D2 = D1 + 1 = 0 + 1", "Celica D2 vsebuje =D1+1, D1 pa je prazna (vrednost 0)."),
          ("D3 = 2, D4 = 3, D5 = 4, D6 = 5", "Vsaka naslednja celica je za 1 večja od celice nad njo."),
          ("!D2 = 1", ""),
      ]),
       P(1, "V celici G6 je formula `=G5+1`, v celici H6 pa `=IF(G6>5;G6;G6+H7)`. Celici kopiramo navzgor do vrstice 2 in navzdol do konca stolpca. "
            "Kaj se izpiše v celici H2?", [
          ("G2 = 1, G3 = 2, G4 = 3, G5 = 4, G6 = 5, G7 = 6, …", "V stolpcu G so števila 1, 2, 3 … (Gn = n − 1)."),
          ("H7 = G7 = 6", "Od vrstice 7 naprej je G > 5, zato formula vrne kar G."),
          ("H6 = 5 + 6 = 11, H5 = 4 + 11 = 15, H4 = 3 + 15 = 18, H3 = 2 + 18 = 20", ""),
          ("!H2 = 1 + 20 = 21", "H2 = 1 + 2 + 3 + 4 + 5 + 6."),
      ])]),

    N(["omrezja"],
      "V šolski knjižnici želijo dvanajst računalnikov s kabli povezati v krajevno omrežje, ki bo povezano v internet.",
      [P(2, "Katero topologijo naj uporabijo? Utemeljite odgovor.", [
          ("!Zvezdo: vsak računalnik je s svojim kablom povezan na osrednje stikalo.", "Danes krajevna omrežja (Ethernet) gradimo s stikali. Okvara enega kabla ali računalnika ne vpliva na druge, računalnike lahko preprosto dodajamo, stikalo pa hkrati prenaša promet med več pari računalnikov."),
      ]),
       P(2, "Navedite največjo slabost izbrane topologije in jo utemeljite.", [
          ("!Osrednje stikalo je edina točka odpovedi.", "Če se stikalo pokvari, ne deluje nobena povezava. Potrebujemo tudi več kablov kot pri vodilu."),
      ]),
       P(1, "Računalnike imajo tudi v učilnicah, ki so v svojih krajevnih omrežjih. Katero napravo naj uporabijo za pošiljanje paketov med omrežji različnih prostorov? Razložite.", [
          ("!Usmerjevalnik (router).", "Usmerjevalnik povezuje različna omrežja in na podlagi naslova IP izbere pot, po kateri paket pošlje naprej."),
      ])]),

    N(["zvok", "slika"],
      "Dijaki pripravljajo šolski radio in novo celostno podobo šole. Na voljo imajo formate: "
      "MP3, WAV, FLAC, OGG, BMP, GIF, JPEG, PNG, SVG, TIFF, AVI, MP4.",
      [P(2, "Oddaje šolskega radia bodo objavljali na spletni strani, poslušalci jih bodo poslušali na telefonih. Kateri format je najprimernejši? Opišite lastnosti, zaradi katerih je boljši od drugih.", [
          ("!MP3 (ali OGG)", "Stisnjen zapis z izgubami: zavrže dele zvoka, ki jih uho slabo zazna, zato je datoteka okoli desetkrat manjša od WAV. Vsi brskalniki in telefoni ga predvajajo, prenos po mobilnem omrežju je hiter."),
      ]),
       P(2, "Posnetke koncerta šolskega zbora bodo hranili v arhivu, da jih bodo lahko pozneje še urejali. Kateri format izberejo in zakaj?", [
          ("!WAV ali FLAC", "Zapis brez izgub: WAV je nestisnjen, FLAC pa stisnjen brez izgub. Pri večkratnem urejanju in shranjevanju kakovost ne pade, kar pri MP3 ne velja."),
      ]),
       P(1, "Logotip šole bodo uporabili na majhni ikoni spletne strani in na velikem transparentu 3 m × 1 m. Kateri format je najprimernejši in zakaj?", [
          ("!SVG", "Vektorski zapis opisuje like matematično, zato ga lahko poljubno povečamo brez izgube kakovosti (ni vidnih pik)."),
      ])]),

    N(["zapis_podatkov", "slika", "programiranje"],
      "V mestu so postavili kvadratni prikazovalnik s 16 lučkami (4 × 4). Vsaka lučka sveti s štirimi jakostmi: "
      "0 (črna), 1 (temno siva), 2 (svetlo siva) in 3 (bela). Prikazovalnik je razdeljen na štiri kvadrante (rdeči črti).",
      [P(None, "", slika=slike_v_vrsti(("Slika A", luci(SL_A)), ("Slika B", luci(SL_B)), ("Slika C", luci(SL_C)), ("Slika D", luci(SL_D)))),
       P(1, "Najmanj koliko bitov moramo poslati eni lučki, da povsem izkoristimo njene zmožnosti? Utemeljite.", [
          ("!2 bita", "Štiri jakosti: 2^2 = 4, zato zadoščata dva bita (00, 01, 10, 11)."),
      ]),
       P(1, "Koliko bitov moramo poslati celotnemu prikazovalniku za niz petih povsem neodvisnih slik? Utemeljite.", [
          ("16 lučk · 2 bita · 5 slik", "Vsaka slika potrebuje 32 bitov."),
          ("!160 bitov", ""),
      ]),
       P(None, "Ukaz za prikazovalnik je sestavljen iz štirih četvork, ločenih s podpičji: najprej zgornji levi kvadrant, nato zgornji desni, "
               "spodnji levi in spodnji desni. Tudi v kvadrantu so lučke naštete v vrstnem redu zgoraj levo, zgoraj desno, spodaj levo, spodaj desno. "
               "Za sliko B računalnik pošlje ukaz `0312;3021;3021;0312`."),
       P(1, "Zapišite ukaz za prikaz slike A.", [
          ("ZL: 3 3 3 3, ZD: 0 0 0 0, SL: 1 1 1 1, SD: 0 3 1 2", "Vsak kvadrant beremo v vrstnem redu zgoraj levo, zgoraj desno, spodaj levo, spodaj desno."),
          ("!3333;0000;1111;0312", ""),
      ]),
       P(1, "Če neki kvadrant ostane enak kot na prejšnji sliki, njegovo četvorko izpustimo. Za sliko C, ki sledi sliki B, tako pošljemo `2222;;;1111`. "
            "Zapišite najkrajši ukaz za prikaz slike B, ki sledi sliki A.", [
          ("A: 3333;0000;1111;0312   B: 0312;3021;3021;0312", "Primerjamo kvadrante. Enak je samo spodnji desni (0312)."),
          ("!0312;3021;3021;", ""),
      ]),
       P(3, "Zaporedje enakih jakosti v kvadrantu imenujemo četa. Zgornji levi kvadrant slike A (3, 3, 3, 3) lahko zapišemo kot `4 x 3`, slika B pa je s četami: "
            "`1 x 0, 1 x 3, 1 x 1, 1 x 2; 1 x 3, 1 x 0, 1 x 2, 1 x 1; 1 x 3, 1 x 0, 1 x 2, 1 x 1; 1 x 0, 1 x 3, 1 x 1, 1 x 2`. "
            "Zapišite ukaza za sliki D in A s četami in ocenite, koliko bitov potrebujemo za ukaz za sliko A. Utemeljite.", [
          ("!D: 4 x 0; 4 x 0; 4 x 3; 4 x 3", "Vsak kvadrant slike D je enobarven."),
          ("!A: 4 x 3; 4 x 0; 4 x 1; 1 x 0, 1 x 3, 1 x 1, 1 x 2", ""),
          ("dolžina čete 1–4 → 2 bita, jakost 0–3 → 2 bita, skupaj 4 biti na četo", "Dolžino zapišemo kot d − 1 (00 = 1, 11 = 4)."),
          ("!A ima 1 + 1 + 1 + 4 = 7 čet → 7 · 4 = 28 bitov", "Ločil ne potrebujemo, ker vemo, da se kvadrant konča, ko vsota dolžin doseže 4. Brez čet bi potrebovali 32 bitov."),
      ]),
       P(2, "Obstajajo prikazovalniki, kjer ima vsak kvadrant 256 lučk. Napišite funkcijo `razdeli_na_cete(kvad)`, ki dobi seznam jakosti lučk kvadranta "
            "in za vsako četo izpiše `d x b` (d je dolžina, b jakost). Za `kvad = [1, 1, 0, 0, 0, 3, 2, 2, 2, 2, 1]` izpiše vrstice "
            "`2 x 1`, `3 x 0`, `1 x 3`, `4 x 2`, `1 x 1`.", [
          ("@koda", '''
            def razdeli_na_cete(kvad):
                dolzina = 1
                for i in range(1, len(kvad)):
                    if kvad[i] == kvad[i - 1]:
                        dolzina += 1
                    else:
                        print(dolzina, "x", kvad[i - 1])
                        dolzina = 1
                print(dolzina, "x", kvad[-1])''', "Štejemo, dokler je jakost enaka prejšnji. Ob spremembi izpišemo končano četo in začnemo novo. Zadnjo četo izpišemo po zanki."),
      ], slika=koda("def razdeli_na_cete(kvad):"))]),

    N(["baze"],
      "Planinsko društvo organizira izlete. Izlet opisujejo: ime izleta, zahtevnost, trajanje v urah in cena. Isti izlet se ponovi v več terminih; "
      "vsak termin ima datum in zbirno mesto. Vsak termin vodi natanko en vodnik, en vodnik pa lahko vodi več terminov. "
      "O vodnikih hranijo ime, priimek, telefon in številko licence. Udeleženci (ime, priimek, datum rojstva, telefon) se prijavijo "
      "na termine; pri prijavi zabeležijo, ali je plačana. En udeleženec se lahko prijavi na več terminov, na en termin pa se prijavi več udeležencev.\n\n"
      "Analitik je začel risati diagram E-R, a ga ni dokončal. Dopolnite ga.",
      [P(None, "", slika=entitete(
          ("Izlet", ["ime", "zahtevnost", "trajanje", "cena"]),
          ("Termin", ["datum", "zbirno_mesto"]),
          ("Vodnik", ["ime", "priimek", "telefon", "licenca"]),
          ("Udeleženec", ["ime", "priimek", "datum_rojstva", "telefon"]),
          ("Prijava", ["placano"]))),
       P(3, "Določite razmerja med entitetami.", [
          ("!Izlet – Termin (izlet se izvaja v terminih)", ""),
          ("!Vodnik – Termin (vodnik vodi termin)", ""),
          ("!Udeleženec – Prijava – Termin (udeleženec se prijavi na termin)", "Prijava je vezna entiteta med udeležencem in terminom."),
      ]),
       P(3, "Razmerjem določite števnosti.", [
          ("!Izlet 1 : N Termin", "En izlet ima več terminov, termin pripada enemu izletu."),
          ("!Vodnik 1 : N Termin", "Termin vodi en vodnik, vodnik vodi več terminov."),
          ("!Udeleženec 1 : N Prijava N : 1 Termin", "Razmerje N : M med udeležencem in terminom razrešimo z vezno entiteto Prijava."),
      ]),
       P(2, "Označite ali dodajte primarne ključe.", [
          ("!Izlet: id_izleta, Termin: id_termina, Vodnik: id_vodnika (ali licenca), Udeleženec: id_udelezenca", "Umetni ključ je enoličen in se ne spreminja (dva udeleženca imata lahko enako ime)."),
          ("!Prijava: (id_udelezenca, id_termina) ali id_prijave", "Sestavljeni ključ prepreči, da bi se isti udeleženec na isti termin prijavil dvakrat."),
      ]),
       P(2, "Označite ali dodajte tuje ključe.", [
          ("!Termin: id_izleta → Izlet, id_vodnika → Vodnik", ""),
          ("!Prijava: id_udelezenca → Udeleženec, id_termina → Termin", "Tuji ključ je vedno na strani N."),
          ("@slika", entitete(
              ("Izlet", ["#id_izleta", "ime", "zahtevnost", "trajanje", "cena"]),
              ("Termin", ["#id_termina", "datum", "zbirno_mesto", "→id_izleta", "→id_vodnika"]),
              ("Vodnik", ["#id_vodnika", "ime", "priimek", "telefon", "licenca"]),
              ("Udeleženec", ["#id_udelezenca", "ime", "priimek", "datum_rojstva", "telefon"]),
              ("Prijava", ["#→id_udelezenca", "#→id_termina", "placano"]),
              razmerja=["Izlet 1 : N Termin", "Vodnik 1 : N Termin", "Udeleženec 1 : N Prijava", "Termin 1 : N Prijava"])),
      ])]),

    N(["programiranje", "algoritem"],
      "Na vhodu v muzej števec ob koncu vsake ure sporoči, koliko obiskovalcev je vstopilo v tej uri. Števila se shranjujejo v seznam `obiski`; "
      "`obiski[0]` je število obiskovalcev v prvi uri, `obiski[1]` v drugi in tako naprej.\n\n"
      "Kustosinja mora pogosto sporočiti, koliko obiskovalcev je vstopilo v nekem obdobju.",
      [P(1, "Koliko obiskovalcev je vstopilo od konca druge do konca pete ure, če je `obiski = [12, 30, 25, 18, 40, 22, 15, 8]`?", [
          ("3., 4. in 5. ura: 25 + 18 + 40", "Od konca 2. do konca 5. ure so 3., 4. in 5. ura (indeksi 2, 3, 4)."),
          ("!83 obiskovalcev", ""),
      ]),
       P(3, "Napišite funkcijo `obiskovalci(i, j)`, ki vrne število obiskovalcev od konca i-te do konca j-te ure (seznam `obiski` je globalna spremenljivka).", [
          ("@koda", '''
            def obiskovalci(i, j):
                vsota = 0
                for k in range(i, j):
                    vsota += obiski[k]
                return vsota''', "Ure od i + 1 do j imajo indekse od i do j − 1, kar je ravno range(i, j). Krajše: return sum(obiski[i:j])."),
      ], slika=koda("def obiskovalci(i, j):")),
       P(None, "Ker je seštevanje pri vsakem vprašanju zamudno, je Tim vnaprej izračunal, koliko obiskovalcev je vstopilo od odprtja do konca prve, druge, tretje … ure, "
               "in rezultate shranil v seznam `skupno`:"),
       P(1, "Dopolnite manjkajoče vrednosti: `skupno = [12, 42, 67, 85, __, __, __, __]`", [
          ("85 + 40 = 125, 125 + 22 = 147, 147 + 15 = 162, 162 + 8 = 170", "Vsaka vrednost je prejšnja vsota, povečana za obisk v tej uri."),
          ("!125, 147, 162, 170", ""),
      ]),
       P(3, "Napišite čim bolj učinkovito funkcijo `izracunaj_skupno(obiski)`, ki vrne seznam `skupno`.", [
          ("@koda", '''
            def izracunaj_skupno(obiski):
                skupno = []
                vsota = 0
                for x in obiski:
                    vsota += x
                    skupno.append(vsota)
                return skupno''', "Vsoto le nadaljujemo, zato vsak element preberemo samo enkrat (linearna časovna zahtevnost). Če bi za vsako uro znova seštevali od začetka, bi bilo dela kvadratno veliko."),
      ], slika=koda("def izracunaj_skupno(obiski):")),
       P(2, "Ko imamo seznam `skupno`, lahko funkcijo za obdobje napišemo z enim samim odštevanjem. Pokažite, kako.", [
          ("@koda", '''
            def obiskovalci_2(i, j):
                if i == 0:
                    return skupno[j - 1]
                return skupno[j - 1] - skupno[i - 1]''', "skupno[j − 1] je obisk do konca j-te ure, skupno[i − 1] pa do konca i-te ure; razlika je obisk vmes."),
          ("obiskovalci_2(2, 5) = skupno[4] − skupno[1] = 125 − 42 = 83", "Preverimo s prvim vprašanjem."),
      ], slika=koda("def obiskovalci_2(i, j):"))]),
]
