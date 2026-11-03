LETO, ROK, DATUM = 2024, "spomladanski", "sreda, 12. junij 2024"

# ---------------------------------------------------------------- izpitna pola 1
VOZLISCA = {"A": (40, 60), "B": (160, 40), "C": (290, 60), "D": (80, 180), "E": (210, 180), "F": (350, 190)}
POVEZAVE = [("A", "B", ""), ("B", "C", ""), ("A", "D", ""), ("D", "E", ""), ("B", "E", "")]

POLA1 = [
    N(["video", "slika"],
      "Šolsko prireditev posnamemo z digitalno kamero. Od katerih dveh od naštetih podatkov je odvisna kakovost posnete slike? Obkrožite ju.",
      [P(1, "", [("!B in D", "Ločljivost pove, koliko slikovnih točk ima sličica, barvna globina pa, koliko različnih barv lahko ima vsaka točka. Trajanje in ime datoteke na kakovost slike ne vplivata, velikost zaslona predvajalnika pa ni lastnost posnetka.")],
         slika=izbire("trajanje posnetka", "ločljivost sličice", "velikost zaslona, na katerem bomo posnetek gledali", "barvna globina", "ime datoteke"))]),

    N(["druzbeni_vidiki", "komuniciranje"],
      "Ravnateljica je pri Gregi naročila par ključev za šifriranje: javnega in zasebnega. Tajne dokumente je odslej šifrirala s svojim zasebnim ključem, javni ključ pa objavila na spletni strani šole. "
      "Zakaj dokumenti niso tajni? Utemeljite s primerom.",
      [P(1, "", [
          ("!Kar je šifrirano z zasebnim ključem, lahko dešifrira vsak z njenim javnim ključem, ta pa je objavljen.", "Primer: sosed prenese javni ključ s spletne strani in prebere dokument. Tako ravnateljica dokument le podpiše (dokaže, da je od nje). Za tajnost bi morala šifrirati s prejemnikovim javnim ključem."),
      ])]),

    N(["strojna_oprema"],
      "Kje se podatki ohranijo, ko računalnik izklopimo? Obkrožite vse ustrezne odgovore.",
      [P(1, "", [("!B, D in E", "Disk SSD, trdi disk in bliskovni ključek so obstojni pomnilniki. Delovni pomnilnik (RAM) in registri ob izklopu izgubijo vsebino.")],
         slika=izbire("delovni pomnilnik (RAM)", "disk SSD", "procesorski register", "trdi disk", "bliskovni ključek USB"))]),

    N(["zvok", "zapis_podatkov"],
      "Nik je posnel zvočni posnetek koncerta v formatu MP3. Datoteko je stisnil v arhiv ZIP, a se je velikost zmanjšala le za 1 %. Napišite, zakaj.",
      [P(1, "", [
          ("!Format MP3 je že stisnjen.", "Pri stiskanju MP3 so ponavljanja in redundanca že odstranjeni, zato ZIP skoraj nima česa več stisniti. Besedilne datoteke pa se z ZIP stisnejo dobro."),
      ])]),

    N(["zvok"],
      "Teja želi digitalizirati stare gramofonske plošče. S kakšno frekvenco bo tipično vzorčila zvok? Obkrožite in utemeljite.",
      [P(1, "", [("!E", "Človek sliši zvok do približno 20 kHz. Po vzorčnem izreku moramo vzorčiti z vsaj dvakratno najvišjo frekvenco, zato se uporablja 44,1 kHz ali 48 kHz.")],
         slika=izbire("24 Hz", "440 Hz", "4,8 kHz", "20 kHz", "48 kHz", "4,8 MHz"))]),

    N(["druzbeni_vidiki"],
      "Za varno komuniciranje v omrežjih uporabljamo identifikacijo (predstavimo se) in overjanje (dokažemo, da smo res mi).",
      [P(1, "Ana si je za šolsko spletno učilnico nastavila niza `kovac.ana` in `T7#qm!2Lx`, zdaj pa ne ve več, kateri je uporabniško ime in kateri geslo. Ji lahko pomagate? Utemeljite.", [
          ("!Uporabniško ime je kovac.ana, geslo T7#qm!2Lx.", "Uporabniško ime je javno in običajno izpeljano iz imena. Geslo mora biti težko uganljivo: mešanica črk, števk in posebnih znakov."),
      ]),
       P(1, "Jaka je za šolo izdelal spletno učilnico, v kateri imajo vsi uporabniki enake pravice. Zakaj je to pomanjkljivo? Navedite konkreten primer.", [
          ("!Uporabniki potrebujejo različne pravice (avtorizacija).", "Primer: dijak bi lahko spreminjal ocene ali brisal naloge sošolcev; pravico do ocenjevanja mora imeti le učitelj."),
      ])]),

    N(["temeljni_pojmi"],
      "V košarkarski ekipi je 24 igralcev. Trener vsako ime napiše na listek in listke da v škatlo. Najprej izvleče kapetana, nato še podkapetana; izvlečenega listka ne vrne v škatlo.",
      [P(1, "Koliko bitov informacije dobijo igralci, ko izvedo ime kapetana? Utemeljite z računom.", [
          ("I = log_{2} 24", "24 enako verjetnih možnosti."),
          ("!≈ 4,58 bita", ""),
      ]),
       P(1, "Ali dobijo, ko izvedo ime podkapetana, več, manj ali enako informacije kot pri kapetanu? Utemeljite.", [
          ("I = log_{2} 23 ≈ 4,52 bita", "Ostalo je le še 23 listkov."),
          ("!Manj, ker je možnosti manj.", ""),
      ])]),

    N(["slika"],
      "Pri likovni umetnosti so dijaki dobili logotip v datotekah Logo-1 in Logo-2; ena je v formatu SVG, druga v formatu JPEG. Vid je obe močno povečal. "
      "Robovi pri Logo-1 so ostali ostri, pri Logo-2 pa so se pojavili kvadratki in zamegljeni robovi.",
      [P(1, "V katerem formatu je zapisana datoteka Logo-2?", [
          ("!JPEG", "Rastrska slika je sestavljena iz pik; pri povečavi vidimo posamezne pike."),
      ]),
       P(1, "Zapišite dve značilnosti formata datoteke Logo-2, ki ju format datoteke Logo-1 nima.", [
          ("!Rastrski zapis (mreža slikovnih točk) in stiskanje z izgubami.", "SVG je vektorski: like opiše z matematičnimi ukazi in ne izgublja podrobnosti."),
      ])]),

    N(["baze"],
      "Vesna je na spletu našla zapis metamodela podatkovne baze:",
      [P(None, "", slika=koda('''
          Založba
            --- Oznaka založbe
            Ime
            Kraj
                                     Knjiga
                                       --- ISBN
                                       Naslov
                                       Leto izida
                                       Izdala založba''')),
       P(2, "Pomagajte Vesni določiti entiteti, atribute v obeh entitetah, primarna ključa, tuji ključ (in kam kaže) ter števnost odnosa.", [
          ("!Entiteti: Založba, Knjiga", ""),
          ("!Založba: oznaka, ime, kraj; Knjiga: ISBN, naslov, leto izida, izdala založba", ""),
          ("!Primarna ključa: Oznaka založbe, ISBN (označena s ---)", ""),
          ("!Tuji ključ: Knjiga.Izdala založba → Založba.Oznaka založbe", ""),
          ("!Števnost: Založba 1 : N Knjiga", "Založba izda več knjig, knjigo izda ena založba."),
      ])]),

    N(["programiranje"],
      "Jan je našel listek s programsko kodo:",
      [P(None, "", slika=koda('''
          1  def kajpa(y):
          2      k = 2
          3      y = y + k
          4      print(y)
          5      y = y**2 - 3*y
          6      print(y)
          7      if y % 4 != 0:
          8          print(y // k)
          9      elif y % 5 != 0:
          10         print(y)
          11     elif y % 3 == 0:
          12         print(y % 7)
          13     else:
          14         print(y**k)
          15     print(y - k)''')),
       P(2, "Kaj izpiše klic `kajpa(6)`? Utemeljite.", [
          ("y = 6 + 2 = 8 → izpis 8", ""),
          ("y = 8^2 − 3 · 8 = 40 → izpis 40", ""),
          ("40 % 4 = 0, 40 % 5 = 0, 40 % 3 = 1", "Prvi trije pogoji ne veljajo, zato se izvede veja else."),
          ("izpis 40^2 = 1600, nato 40 − 2 = 38", ""),
          ("!8, 40, 1600, 38", ""),
      ]),
       P(1, "Vrstice od 7 do 14 želi Jan nadomestiti s klicem nove funkcije `delaneki`, ki se obnaša enako. Napišite jo.", [
          ("@koda", '''
            def delaneki(y, k):
                if y % 4 != 0:
                    print(y // k)
                elif y % 5 != 0:
                    print(y)
                elif y % 3 == 0:
                    print(y % 7)
                else:
                    print(y**k)''', "Funkcija potrebuje obe vrednosti, y in k, zato ju dobi kot parametra."),
      ]),
       P(1, "Popravite funkcijo `kajpa` tako, da namesto vrstic od 7 do 14 kliče `delaneki`.", [
          ("@koda", '''
            def kajpa(y):
                k = 2
                y = y + k
                print(y)
                y = y**2 - 3*y
                print(y)
                delaneki(y, k)
                print(y - k)''', ""),
      ])]),

    N(["strojna_oprema", "zgradba_racunalnika"],
      "Pomnilniki v računalniku so organizirani v pomnilniško hierarhijo: višje so hitrejši, manjši in dražji, nižje počasnejši in večji. Dopolnite trinivojske izseke hierarhije (A je najvišji).",
      [P(1, "Nivo A: predpomnilnik, nivo B: ___, nivo C: ___", [("!B: glavni (delovni) pomnilnik, C: trdi disk ali SSD", "")]),
       P(1, "Nivo A: ___, nivo B: trdi disk, nivo C: ___", [("!A: glavni pomnilnik, C: shramba v oblaku ali magnetni trak (arhiv)", "")]),
       P(1, "Nivo A: registri, nivo B: ___, nivo C: ___", [("!B: predpomnilnik, C: glavni pomnilnik", "Registri so v CPE in so najhitrejši.")])]),

    N(["zapis_podatkov", "temeljni_pojmi"],
      "Lara mora izdelati kodni tabeli, s katerima bo mogoče enolično zakodirati in odkodirati besedo PAPAGAJ. Kode so sestavljene iz znakov O in X. "
      "V prvi tabeli so vse kode enako dolge, v drugi so lahko različno dolge. V obeh primerih naj bo zapis besede čim krajši.",
      [P(2, "Zapišite kode v tabeli.", [
          ("P = 2-krat, A = 3-krat, G = 1-krat, J = 1-krat", "Štirje različni znaki."),
          ("!enako dolge: P = OO, A = OX, G = XO, J = XX (14 znakov)", "Za 4 znake zadoščata 2 znaka kode."),
          ("!različno dolge: A = O, P = XO, G = XXO, J = XXX (13 znakov)", "Najpogostejši znak dobi najkrajšo kodo; nobena koda ni začetek druge."),
      ], slika=tabela(["Znak", "Enako dolge kode", "Različno dolge kode"], [["P", "", ""], ["A", "", ""], ["G", "", ""], ["J", "", ""]])),
       P(1, "Pri kodah različnih dolžin velja pravilo, da nobena koda ni predpona druge. S primerom pokažite, kaj gre narobe, če pravilo ni izpolnjeno.", [
          ("!Če je A = O, P = OX, G = X, lahko OX pomeni P ali AG.", "Zapisa ne moremo enolično odkodirati."),
      ])]),

    N(["programiranje"],
      "Imamo tri funkcije: `vsota(a, b, c)` vrne vsoto treh števil, `produkt(a, b)` vrne produkt dveh števil, `ostanek(a, b)` pa ostanek pri celoštevilskem deljenju a z b.",
      [P(1, "Kaj vrne `ostanek(23, 5)`?", [("!3", "23 = 4 · 5 + 3")]),
       P(1, "Kaj vrne `produkt(ostanek(14, 4), vsota(3, -1, 2))`?", [
          ("ostanek(14, 4) = 2, vsota(3, −1, 2) = 4", "Najprej izračunamo notranje klice."),
          ("!8", ""),
      ]),
       P(1, "Kaj vrne `produkt(vsota(ostanek(vsota(9, 4, 2), ostanek(30, 7)), -1, -2), 3)`?", [
          ("vsota(9, 4, 2) = 15, ostanek(30, 7) = 2", ""),
          ("ostanek(15, 2) = 1", ""),
          ("vsota(1, −1, −2) = −2", ""),
          ("!produkt(−2, 3) = −6", ""),
      ]),
       P(1, "Kaj vrne `vsota(vsota(1, 2, 3), produkt(-1, 4), 2, 5)`?", [
          ("!Napako: zunanja vsota dobi štiri argumente, sprejme pa tri.", "Python javi TypeError, rezultata ni."),
      ])]),

    N(["omrezja"],
      "Omrežna komunikacija poteka v plasteh; vsaka plast opravlja svoje naloge.",
      [P(2, "Prenosna (transportna) plast skrbi za prenos podatkov med programi na dveh napravah. Kateri od naštetih protokolov spadajo v to plast? Obkrožite.", [
          ("!a) TCP in c) UDP", "HTTP in DNS sta na aplikacijski plasti, IP na mrežni, USB pa ni omrežni protokol."),
      ], slika=izbire("TCP", "HTTP", "UDP", "IP", "USB", "DNS", crke="abcdef")),
       P(None, "Shema prikazuje omrežje z vozlišči A–F in povezavami med njimi:", slika=omrezje(VOZLISCA, POVEZAVE, sirina=400, visina=220)),
       P(2, "Kako imenujemo naprave v vozliščih, ki pakete posredujejo naprej? Naštejte vsaj dva medija za prenos podatkov med vozlišči.", [
          ("!Usmerjevalniki (routerji).", ""),
          ("!Mediji: bakreni kabel (UTP), optično vlakno, radijski valovi (Wi-Fi, mobilno omrežje).", ""),
      ]),
       P(1, "V vozlišču A je paket za vozlišče C, v vozlišču B pa paket za vozlišče F. Ali lahko prideta do cilja? Če ne, popravite shemo.", [
          ("!A → C: da, po poti A–B–C (ali A–D–E–B–C).", ""),
          ("!B → F: ne, F ni povezan z nobenim vozliščem; dodamo npr. povezavo E–F ali C–F.", ""),
      ])]),

    N(["druzbeni_vidiki", "temeljni_pojmi"],
      "Z razvojem digitalne tehnologije je na voljo vedno več informacij.",
      [P(1, "Ko imamo na voljo toliko informacij, da jih ne zmoremo pregledati in smiselno uporabiti, govorimo o (izberite najustreznejši odgovor):", [
          ("!B", ""),
      ], slika=izbire("informacijski pismenosti.", "informacijski preobremenjenosti.", "računalniškem oblaku.", "digitalnem razkoraku.", "podatkovni bazi.")),
       P(3, "Pojasnite preostale štiri pojme, tako da je iz pojasnila razvidno, da pri njih ne gre za preveliko količino informacij.", [
          ("!informacijska pismenost: sposobnost poiskati, ovrednotiti in uporabiti informacije", ""),
          ("!računalniški oblak: storitve in prostor za podatke na oddaljenih strežnikih, dostopni prek interneta", ""),
          ("!digitalni razkorak: neenakost v dostopu do digitalne tehnologije ali znanju za njeno uporabo", ""),
          ("!podatkovna baza: urejena zbirka povezanih podatkov, ki jo upravljamo s sistemom za upravljanje baz", ""),
      ])]),
]

# ---------------------------------------------------------------- izpitna pola 2
SODCI_1 = tabela(["Minuta", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [["Prostornina (L)", 3, 6, 8, 12, 19, 22, 23, 24, 30, 33, 34]])
SODCI_2 = tabela(["Minuta", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [["Prostornina (L)", 2, 5, 6, 9, 10, 14, 13, 11, 8, 10, 12]])

JEDILNIK_HTML = '''<html>
<head>
  <title>Šolska kuhinja</title>
</head>
<body>
  <table border="1">
    <tr>
      <th colspan="2"><h1>Jedilnik tedna</h1></th>
    </tr>
    <tr>
      <td>
        <ul>
          <li>ponedeljek: ričet</li>
          <li>torek: testenine</li>
          <li>sreda: pica</li>
        </ul>
      </td>
      <td>
        <img src="kosilo.jpg" alt="Fotografija kosila">
      </td>
    </tr>
    <tr>
      <td colspan="2">
        Spletna stran šole: <a href="https://www.sola.si">www.sola.si</a><br>
        Kuharica: <a href="mailto:kuhinja@sola.si">Marta Kuhar</a>
      </td>
    </tr>
  </table>
</body>
</html>'''

KNJIGARNA = preglednica([
    ["Knjigarna Bukvica", "", "", "", "", "", "", ""],
    ["DDV:", "5 %", "", "Marža:", "30 %", "", "Mejna zaloga:", 10],
    ["", "", "", "", "", "", "", ""],
    ["Koda", "Naslov", "Zaloga", "Nabavna cena", "Leto izida", "Prodajna cena", "Nova koda", ""],
    ["LJ-1042", "Kekec", 14, "12,00", 2019, "", "", ""],
    ["MB-2210", "Martin Krpan", 6, "9,50", 2021, "", "", ""],
    ["LJ-3307", "Pod svobodnim soncem", 22, "18,00", 2015, "", "", ""],
    ["CE-0815", "Deseti brat", 6, "15,00", 2020, "", "", ""],
    ["KP-5521", "Alamut", 3, "21,00", 2023, "", "", ""],
    ["LJ-6012", "Cvetje v jeseni", 9, "11,00", 2018, "", "", ""],
])

POLA2 = [
    N(["obdelava", "strojna_oprema"],
      "Podatki so v pomnilnikih računalnika zapisani dvojiško. Da jih lahko uporabljamo, so urejeni v datoteke z imeni.",
      [P(1, "Tina je slišala, da so datoteke v računalniku shranjene na trdem disku. V svoji tablici trdega diska ni našla. Na katerem mediju so shranjene fotografije v tablici?", [
          ("!Na bliskovnem pomnilniku (vgrajeni pomnilnik flash, npr. eMMC ali UFS).", "Nima gibljivih delov, je majhen, hiter in porabi malo energije."),
      ]),
       P(1, "V datotekah so shranjeni različni podatki. Poleg besedila naštejte še tri vrste podatkov.", [
          ("!slika, zvok, video (tudi preglednica, program …)", ""),
      ]),
       P(1, "Ime datoteke je sestavljeno iz imena in podaljška, ločenih s piko. Kaj nam običajno pove podaljšek?", [
          ("!Vrsto (format) podatkov v datoteki in s tem, s katerim programom jo odpremo.", "Npr. .jpg slika, .mp3 zvok, .docx dokument."),
      ]),
       P(2, "Tina je datoteko `izlet.jpg` preimenovala v `izlet.txt`. Ali se je vsebina datoteke spremenila? Ali nam podaljšek vedno zanesljivo pove, kaj je v datoteki? Utemeljite s primerom.", [
          ("!Vsebina se ni spremenila, spremenilo se je le ime.", "Ob dvokliku jo zdaj računalnik odpre z urejevalnikom besedil, ki pokaže nesmiselne znake."),
          ("!Podatek ni zanesljiv: podaljšek lahko poljubno spremenimo.", "Primer: datoteka .docx je v resnici stisnjen arhiv ZIP; zlonamerni program se lahko skriva kot račun.pdf.exe."),
      ])]),

    N(["omrezja"],
      "Trgovina ima osem blagajn in dva strežnika. Lastnik se mora odločiti za topologijo omrežja: vodilo, zvezda ali drevo (več stikal, povezanih med seboj). "
      "Primerjamo prepustnost omrežja (koliko podatkov na sekundo prenese celo omrežje) in zakasnitev (koliko časa potuje podatek). "
      "Upoštevajte, da se podatek v vsakem stikalu nekoliko zakasni in da stikalo hkrati prenaša podatke med več pari priključkov.",
      [P(1, "Kdaj je topologija vodila boljša od zvezde?", [
          ("!Kadar podatke pošilja le ena naprava naenkrat: vodilo ima manjšo zakasnitev (ni stikala) in potrebuje manj kabla.", ""),
      ]),
       P(1, "Kdaj je zvezda boljša od vodila?", [
          ("!Kadar hkrati komunicira več parov naprav: stikalo jih prenaša vzporedno, pri vodilu pa si vsi delijo en medij in nastajajo trki.", ""),
      ]),
       P(1, "Kdaj je drevo boljše od zvezde?", [
          ("!Kadar so naprave razporejene po več prostorih ali je naprav več, kot ima stikalo priključkov: več manjših stikal povežemo med seboj.", "Promet znotraj ene veje tudi ne obremenjuje drugih vej."),
      ]),
       P(2, "Blagajne pošiljajo podatke strežnikoma. Predlagajte topologijo in razporeditev blagajn in strežnikov, da bo prepustnost čim večja.", [
          ("!Zvezda: vse blagajne in oba strežnika na eno stikalo; ali drevo z dvema stikaloma, pri čemer je pri vsakem stikalu en strežnik in štiri blagajne.",
           "Ker stikalo prenaša več pogovorov hkrati, lahko oba strežnika sprejemata podatke istočasno. Pri drevesu je promet razdeljen in povezava med stikaloma ni ozko grlo."),
      ])]),

    N(["obdelava", "algoritem"],
      "Lovro je ob vrtni lopi postavil pameten sod za deževnico. Senzor vsako minuto izmeri prostornino vode v sodu. "
      "Če se prostornina v zadnjih štirih minutah poveča za 15 litrov ali več, se sproži alarm, da bo sod kmalu poln.",
      [P(None, "", slika=SODCI_1),
       P(1, "Kdaj se je sprožil alarm?", [
          ("V(4) − V(0) = 19 − 3 = 16 ✓", "Primerjamo vrednost z vrednostjo pred štirimi minutami."),
          ("V(5) − V(1) = 16 ✓, V(6) − V(2) = 15 ✓, V(7) − V(3) = 12 ✗", "Od 7. minute naprej je razlika manjša od 15."),
          ("!V 4., 5. in 6. minuti.", ""),
      ]),
       P(None, "Lovro je v sod vgradil črpalko, ki odčrpa 2 litra vode na minuto. Senzor je zdaj izmeril:", slika=SODCI_2),
       P(2, "Ali je možno, da je bila črpalka vključena med 4. in 5. minuto? Utemeljite.", [
          ("V(5) − V(4) = 14 − 10 = +4", ""),
          ("!Da. Če je v tej minuti priteklo 6 litrov in je črpalka odčrpala 2, se je prostornina povečala za 4.", "Iz meritev ne vemo, koliko vode je priteklo, zato vključene črpalke ne moremo izključiti."),
      ]),
       P(2, "Najmanj koliko vode je črpalka odčrpala med 5. in 8. minuto? Utemeljite.", [
          ("14 → 13 → 11 → 8: prostornina se zmanjša za 6 L", "Dež lahko vodo le dodaja, zato je črpalka odčrpala vsaj toliko, za kolikor se je prostornina zmanjšala."),
          ("v 3 minutah lahko odčrpa največ 3 · 2 = 6 L", "Črpalka je torej delovala ves čas, dotoka pa ni bilo."),
          ("!6 litrov", ""),
      ])]),

    N(["splet"],
      "Kuharica Marta izdeluje spletno stran z jedilnikom. Stran naj ima v zavihku naslov Šolska kuhinja, v tabeli pa v prvi vrstici čez oba stolpca naslov Jedilnik tedna, "
      "v drugi vrstici levo seznam z alinejami, desno fotografijo, v tretji vrstici čez oba stolpca pa povezavi na spletno stran šole in na e-poštni naslov kuharice.",
      [P(9, "Dopolnite kodo HTML.", [
          ("@koda", JEDILNIK_HTML, "Vsako pravilno dopolnjeno mesto je 1 točka: title, table, 2, h1, ul, img src, alt, a href, mailto (in zaključne značke)."),
          ("@slika", R('<div class="in-izris"><table border="1"><tr><th colspan="2"><h1>Jedilnik tedna</h1></th></tr><tr><td><ul><li>ponedeljek: ričet</li><li>torek: testenine</li><li>sreda: pica</li></ul></td><td>[slika kosila]</td></tr><tr><td colspan="2">Spletna stran šole: <u>www.sola.si</u><br>Kuharica: <u>Marta Kuhar</u></td></tr></table></div>')),
      ], slika=koda('''
          <html>
          <head>
            <_____>Šolska kuhinja</title>
          </head>
          <body>
            <_____ border="1">
              <tr>
                <th colspan="___"><_____>Jedilnik tedna</h1></th>
              </tr>
              <tr>
                <td>
                  <_____>
                    <li>ponedeljek: ričet</li>
                    <li>torek: testenine</li>
                    <li>sreda: pica</li>
                  </ul>
                </td>
                <td>
                  <img _____="kosilo.jpg" _____="Fotografija kosila">
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  Spletna stran šole: <_____="https://www.sola.si">www.sola.si</a><br>
                  Kuharica: <a href="_____:kuhinja@sola.si">Marta Kuhar</a>
                </td>
              </tr>
            </table>
          </body>
          </html>'''))]),

    N(["baze"],
      "Veterinarska ambulanta potrebuje informacijski sistem. V ambulanti delajo veterinarji (ime, priimek, telefon). Vsak veterinar ima lahko več specializacij "
      "(npr. male živali, ptice, zobozdravstvo), za vsako specializacijo pa je lahko več veterinarjev. O lastnikih hranijo ime, priimek, naslov in telefon, "
      "o živalih ime, vrsto in datum rojstva; vsaka žival ima enega lastnika, lastnik ima lahko več živali. Žival pride na pregled ob določenem datumu in uri, "
      "pregleda jo en veterinar, ki zapiše diagnozo in zdravljenje.\n\n"
      "Odgovore narišite ali označite na diagramu.",
      [P(4, "Narišite relacijski podatkovni model. Entitete naj vsebujejo vse omenjene atribute; po potrebi jih dodajte.", [
          ("@slika", entitete(
              ("Veterinar", ["#id_veterinarja", "ime", "priimek", "telefon"]),
              ("Specializacija", ["#id_specializacije", "naziv"]),
              ("Vet_spec", ["#→id_veterinarja", "#→id_specializacije"]),
              ("Lastnik", ["#id_lastnika", "ime", "priimek", "naslov", "telefon"]),
              ("Zival", ["#id_zivali", "ime", "vrsta", "datum_rojstva", "→id_lastnika"]),
              ("Pregled", ["#id_pregleda", "datum", "ura", "diagnoza", "zdravljenje", "→id_zivali", "→id_veterinarja"]))),
          ("!Entitete: Veterinar, Specializacija, Lastnik, Žival, Pregled (in vezna Vet_spec)", ""),
      ]),
       P(2, "Na diagramu označite števnosti in vsa razmerja N : M ustrezno razrešite.", [
          ("!Veterinar N : M Specializacija → Veterinar 1 : N Vet_spec N : 1 Specializacija", "Razmerje N : M razrešimo z vezno entiteto."),
          ("!Lastnik 1 : N Žival, Žival 1 : N Pregled, Veterinar 1 : N Pregled", ""),
      ]),
       P(2, "Za vsako entiteto označite primarni ključ in za dva od njih utemeljite izbiro.", [
          ("!Žival: id_zivali – ime živali ni enolično (veliko psov je Rex), zato uporabimo umetni ključ.", ""),
          ("!Vet_spec: (id_veterinarja, id_specializacije) – par se ne sme ponoviti, posamezen atribut pa se lahko.", ""),
      ]),
       P(2, "Označite vse tuje ključe.", [
          ("!Vet_spec: id_veterinarja, id_specializacije; Žival: id_lastnika; Pregled: id_zivali, id_veterinarja", ""),
      ])]),

    N(["preglednice"],
      "Knjigarna Bukvica vodi zalogo v preglednici. Pomagate si lahko s funkcijami:\n\n"
      "`MID(besedilo; zacetek; stevilo)` izlušči podniz, ki se začne na mestu zacetek in je dolg stevilo znakov (`=MID(\"avtomehanik\"; 5; 3)` vrne »meh«); "
      "`CONCAT(besedilo1; besedilo2; …)` stakne besedila; `IF(pogoj; A; B)` vrne A, če pogoj velja, sicer B; "
      "`COUNTIF(obseg; pogoj)` prešteje celice, ki ustrezajo pogoju; `SUMIF(obseg; pogoj; obseg_seštevanja)` sešteje vrednosti iz obsega seštevanja, pri katerih ustrezna celica obsega ustreza pogoju. "
      "Pogoj, ki uporablja vrednost iz celice, zapišemo kot `\"<\"&H2`.",
      [P(None, "", slika=KNJIGARNA),
       P(2, "V celico F5 vpišite formulo za prodajno ceno, ki jo lahko kopiramo navzdol: prodajna cena = nabavna cena · (1 + DDV) · (1 + marža).", [
          ("!=D5*(1+$B$2)*(1+$E$2)", "DDV in marža sta v eni celici, zato ju naslovimo absolutno."),
      ]),
       P(3, "Nova koda knjige je sestavljena iz prvih treh znakov stare kode, prve črke naslova in zadnjih dveh števk leta izida (Kekec: »LJ-K19«). Vpišite formulo v G5, ki jo lahko kopiramo navzdol.", [
          ("!=CONCAT(MID(A5;1;3);MID(B5;1;1);MID(E5;3;2))", "Leto 2019 ima števke na mestih 3 in 4."),
      ]),
       P(1, "V celico F12 vpišite formulo, ki prešteje, pri koliko knjigah je zaloga manjša od mejne zaloge v H2.", [
          ("!=COUNTIF(C5:C10;\"<\"&H2)", "Rezultat je 4 (6, 6, 3 in 9)."),
      ]),
       P(2, "V celico F13 vpišite formulo, ki primerja zalogo knjig Martin Krpan in Deseti brat ter izpiše »Več je Martina Krpana.«, »Več je Desetega brata.« ali »Obeh je enako.«.", [
          ("!=IF(C6>C8;\"Več je Martina Krpana.\";IF(C6<C8;\"Več je Desetega brata.\";\"Obeh je enako.\"))", "Za tri možnosti gnezdimo dva IF. Tu se izpiše »Obeh je enako.«"),
      ]),
       P(2, "V celico F14 vpišite formulo, ki sešteje prodajne cene knjig z zalogo, manjšo od mejne zaloge v H2.", [
          ("!=SUMIF(C5:C10;\"<\"&H2;F5:F10)", "Pogoj preverjamo v stolpcu C, seštevamo pa stolpec F."),
      ])]),
]
