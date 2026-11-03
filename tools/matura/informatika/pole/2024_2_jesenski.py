LETO, ROK, DATUM = 2024, "jesenski", "sobota, 24. avgust 2024"

# ---------------------------------------------------------------- izpitna pola 1
URNIK_HTML = '''<p>Treningi plavalnega kluba:</p>
<table border="1">
  <tr>
    <th>Dan</th>
    <th>Ura</th>
  </tr>
  <tr>
    <td>ponedeljek<br>sreda</td>
    <td>17.00</td>
  </tr>
</table>'''

ZVOK = [(0, 1), (1, 4), (2, 6), (3, 7), (4, 5), (5, 2), (6, 0), (7, 3), (8, 6)]

DREVO_D = koda('''
    D:/
    └── sola
        ├── splet
        │   ├── index.html
        │   └── css
        ├── slike
        │   └── 2024
        └── arhiv''')

POLA1 = [
    N(["programiranje"],
      "Kaj izpiše spodnji program?",
      [P(1, "", [
          ("15 % 5 = 0 → 3;  10 % 5 = 0 → 2", "Spremenijo se le večkratniki števila 5; deljenje // da celo število."),
          ("![4, 9, 2, 3, 7, 2, 6]", ""),
      ], slika=koda('''
          tabela = [4, 9, 2, 15, 7, 10, 6]
          for i in range(len(tabela)):
              if tabela[i] % 5 == 0:
                  tabela[i] = tabela[i] // 5
          print(tabela)'''))]),

    N(["temeljni_pojmi", "algoritem"],
      "Ugotovite, katere trditve so pravilne (P) in katere nepravilne (N).",
      [P(1, "", [
          ("!N, P, N, P", ""),
          (None, "Algoritem je postopek, program pa njegov zapis v programskem jeziku – algoritem lahko zapišemo tudi z diagramom ali besedami."),
          (None, "Analogni signal ima lahko neskončno mnogo vrednosti; končno mnogo jih ima digitalni."),
          (None, "Pri enako verjetnih izidih je informacija log_{2} n in raste s številom možnosti n."),
      ], slika=tabela(["Trditev", "", ""], [
          ["Vsak algoritem je program.", "P", "N"],
          ["Bit je najmanjša enota informacije.", "P", "N"],
          ["Analogni signal ima lahko le končno mnogo različnih vrednosti.", "P", "N"],
          ["Pri enako verjetnih izidih dobimo več informacije, če je možnih izidov več.", "P", "N"]]))]),

    N(["omrezja"],
      "Skrbnik omrežja je v poročilu o napadu zapisal: izvorni naslov `10.0.0.300`, ponorni naslov `8.8.8.8`. Strokovnjak mu je odgovoril, da je podatek gotovo napačen. Razložite, zakaj.",
      [P(1, "", [
          ("!Naslov 10.0.0.300 ni veljaven naslov IPv4.", "Vsak od štirih delov je en bajt, torej število od 0 do 255; 300 je preveliko."),
      ])]),

    N(["slika"],
      "Opišite konkretno operacijo, ki jo lažje naredite v rastrski (točkovni) kot v vektorski grafiki.",
      [P(1, "", [
          ("!Retuširanje fotografije: npr. odstranimo rdeče oči ali zameglimo ozadje.", "Fotografija je mreža pik različnih barv, ki jih spreminjamo posamično ali s filtri; vektorska slika je sestavljena iz likov in take podrobnosti težko opiše."),
      ])]),

    N(["splet"],
      "Kaj prikaže spletni brskalnik, ko dobi to kodo HTML?",
      [P(1, "", [
          ("@slika", R('<div class="in-izris">' + URNIK_HTML + '</div>')),
          ("!Odstavek in tabela z obrobo z dvema vrsticama: Dan | Ura (krepko) ter »ponedeljek« in »sreda« v dveh vrsticah iste celice | 17.00.", "br v celici prelomi vrstico, a celica ostane ena."),
      ], slika=koda(URNIK_HTML))]),

    N(["temeljni_pojmi"],
      "Igralne karte za igro sedmice so v štirih barvah (♣, ♦, ♥, ♠), v vsaki barvi je 8 kart. Iz premešanega kompleta izvlečemo eno karto.",
      [P(1, "Koliko bitov informacije dobimo, ko izvemo, katere barve je karta? Pojasnite z računom.", [
          ("I = log_{2} 4 = 2 bita", "Štiri enako verjetne barve."),
          ("!2 bita", ""),
      ]),
       P(1, "Koliko bitov dobimo, ko izvemo, katera karta je bila izvlečena?", [
          ("I = log_{2} 32 = 5 bitov", "4 · 8 = 32 kart."),
          ("!5 bitov", ""),
      ])]),

    N(["druzbeni_vidiki", "omrezja"],
      "Daljinec garažnih vrat ob pritisku pošlje vratom vedno isto šifrirano sporočilo »odpri«. Ključa za šifriranje pozna le proizvajalec.",
      [P(2, "Soseda je s posebnim sprejemnikom sporočilo posnela. Ali lahko z njim odpre vrata, čeprav ga ne zna dešifrirati? Utemeljite.", [
          ("!Da: posneto sporočilo preprosto znova predvaja (napad s ponovitvijo).", "Vrata preverijo le, ali je sporočilo pravilno šifrirano, ne pa, ali je novo. Zaščita: vsako sporočilo mora vsebovati števec ali naključno vrednost, ki se ne ponovi (spremenljiva koda)."),
      ])]),

    N(["zgradba_racunalnika"],
      "CPE izvaja ukaze programa, ki so shranjeni v pomnilniku.",
      [P(2, "Čemu služita programski števec in ukazni register?", [
          ("!Programski števec hrani naslov naslednjega ukaza v pomnilniku.", "Po prevzemu ukaza se poveča (ali ob skoku spremeni)."),
          ("!Ukazni register hrani ukaz, ki se trenutno izvaja.", "Krmilna enota ukaz iz njega dekodira."),
      ])]),

    N(["programski_jezik", "programska_oprema"],
      "Programe lahko izvajamo s tolmačem (interpreterjem), ki ukaze prevaja sproti, ali jih vnaprej prevedemo s prevajalnikom.",
      [P(2, "Navedite primer, ko je prevajalnik boljši od tolmača. Utemeljite.", [
          ("!Igra ali program, ki ga uporabniki zaganjajo velikokrat in mora delovati hitro.", "Prevajanje opravimo enkrat; prevedeni program teče neposredno na procesorju, brez sprotnega prevajanja, zato je hitrejši. Uporabnik ne potrebuje izvorne kode ne tolmača."),
      ])]),

    N(["temeljni_pojmi", "zapis_podatkov", "komuniciranje"],
      "Učitelj je na tablo napisal `11 + 1 = 100` in vprašal, ali je račun pravilen. Miha je odgovoril, da ni, Zala pa, da ima premalo podatkov.",
      [P(1, "Kateri podatek še potrebujemo, da lahko nedvoumno odgovorimo?", [
          ("!V katerem številskem sistemu so zapisana števila.", "V dvojiškem sistemu je 11_{2} + 1_{2} = 100_{2} (3 + 1 = 4), v desetiškem pa ne."),
      ]),
       P(1, "Zakaj sta iz istih podatkov dobila različni informaciji?", [
          ("!Podatke sta razložila z različnim predznanjem (Miha je predpostavil desetiški sistem).", "Informacija nastane, ko podatek razložimo; razlaga je odvisna od prejemnika."),
      ]),
       P(1, "Učitelj je Mihovega očeta povabil na govorilne ure. V kakšno komunikacijsko razmerje spada njun pogovor?", [
          ("!Medosebno, ena z enim (dvosmerno, neposredno).", ""),
      ])]),

    N(["zgradba_racunalnika"],
      "Večina današnjih računalnikov je zgrajena po von Neumannovem modelu.",
      [P(1, "Naštejte enote von Neumannovega modela in zapišite, kako so povezane.", [
          ("!Centralna procesna enota (krmilna enota, aritmetično-logična enota, registri), pomnilnik, vhodno-izhodne enote; povezane so z vodilom.", "Program in podatki so v istem pomnilniku."),
      ]),
       P(2, "Opredelite naloge posameznih enot.", [
          ("!Krmilna enota prevzema in dekodira ukaze ter usklajuje delovanje; ALE računa in primerja; registri hranijo vmesne rezultate.", ""),
          ("!Pomnilnik hrani program in podatke; V/I enote povezujejo računalnik z okolico (tipkovnica, zaslon); vodilo prenaša podatke, naslove in krmilne signale.", ""),
      ])]),

    N(["zvok", "zapis_podatkov"],
      "V glasbenem studiu so posneli zvočni signal, ki ga prikazuje graf (vrednosti od 0 do 7).",
      [P(None, "", slika=signal(ZVOK, y_max=7, oznaka_t="t [s]", oznaka_y="jakost")),
       P(1, "Signal vzorčimo s frekvenco 1 Hz. Vsaj koliko bitov potrebujemo za zapis vsakega vzorca?", [
          ("8 različnih vrednosti (0–7) → 2^3 = 8", ""),
          ("!3 bite", ""),
      ]),
       P(1, "Zapišite zaporedje bitov, ki ga dobimo z vzorčenjem od 0 do 8 sekund.", [
          ("1, 4, 6, 7, 5, 2, 0, 3, 6", "Vzorec vzamemo vsako sekundo."),
          ("@slika", signal(ZVOK, y_max=7, oznaka_t="t [s]", oznaka_y="jakost", vzorci=ZVOK)),
          ("!001 100 110 111 101 010 000 011 110", "Vsako vrednost zapišemo s tremi biti."),
      ]),
       P(1, "Kako lahko izboljšamo verodostojnost posnetka, dobljenega z vzorčenjem?", [
          ("!Vzorčimo pogosteje (višja frekvenca vzorčenja) in z več biti na vzorec (večja bitna globina).", ""),
      ])]),

    N(["programiranje"],
      "Parkirna hiša zaračuna prvo začeto uro 2 €, vsako nadaljnjo začeto uro pa 1,50 €. Na dan plačamo največ 15 €.",
      [P(4, "Napišite funkcijo `cena(minute)`, ki za podano število minut parkiranja (do 24 ur) vrne ceno. Za 30 minut vrne 2, za 61 minut 3,5, za 600 minut pa 15.", [
          ("61 min → 2 začeti uri → 2 + 1,5 = 3,5", "Začeto uro štejemo kot celo: število ur zaokrožimo navzgor."),
          ("@koda", '''
            def cena(minute):
                if minute <= 0:
                    return 0
                ure = (minute + 59) // 60
                c = 2 + (ure - 1) * 1.5
                if c > 15:
                    c = 15
                return c''', "Prištejemo 59 in celoštevilsko delimo s 60, da dobimo začete ure. Na koncu upoštevamo zgornjo mejo (ali min(c, 15))."),
      ], slika=koda("def cena(minute):"))]),

    N(["splet"],
      "Dana je struktura map spletne strani. Datoteka `index.html` je v mapi `splet`.",
      [P(None, "", slika=DREVO_D),
       P(4, "V `index.html` uporabljamo sliko `fotka.jpg`. Za vsako od map v tabeli zapišite odvisni (relativni) naslov slike, kot bi ga zapisali v `index.html`.", [
          ("!sola: ../fotka.jpg", ""),
          ("!css: css/fotka.jpg", "Podmapa mape splet, zato .. ne potrebujemo."),
          ("!2024: ../slike/2024/fotka.jpg", ""),
          ("!arhiv: ../arhiv/fotka.jpg", ""),
      ], slika=tabela(["fotka.jpg je v mapi", "odvisni naslov v index.html"], [["sola", ""], ["css", ""], ["2024", ""], ["arhiv", ""]])),
       P(1, "Zapišite absolutni naslov slike, če je v mapi `splet`.", [
          ("!D:/sola/splet/fotka.jpg (v brskalniku file:///D:/sola/splet/fotka.jpg)", "Absolutni naslov vsebuje celotno pot od korena diska."),
      ])]),

    N(["zapis_podatkov", "programiranje"],
      "V klubu ljubiteljev ugank so izumili nov zapis dvojiških števil. Število zapišejo s seznamom celih števil: elemente gledamo v parih od leve proti desni; "
      "par predstavlja bit 1, če je vsota para soda, sicer bit 0. Na primer `[3, 5, 2, 7, 4, 4]` pomeni 101_{2} = 5_{10} (3 + 5 = 8 sodo, 2 + 7 = 9 liho, 4 + 4 = 8 sodo).",
      [P(1, "Zapišite seznam, ki predstavlja število 13_{10}.", [
          ("13 = 1101_{2}", ""),
          ("![2, 4, 3, 5, 1, 2, 7, 7]", "Pari s sodo vsoto za 1 in z liho vsoto za 0; vsak pravilen seznam s štirimi pari je ustrezen."),
      ]),
       P(3, "Dopolnite funkcijo, ki dobi seznam A in vrne zapisano število r. Če ima seznam liho število elementov, naj vrne None.", [
          ("@koda", '''
            def Dekodiraj(A):
                if len(A) % 2 == 1:
                    return None
                else:
                    r = 0
                    i = 0
                    while i < len(A):
                        if (A[i] + A[i + 1]) % 2 == 0:
                            r = 2 * r + 1
                        else:
                            r = 2 * r
                        i += 2
                    return r''', "Bite beremo od leve (najpomembnejši) proti desni: vsak nov bit dodamo tako, da dosedanji r pomnožimo z 2 in prištejemo bit."),
      ], slika=koda('''
          def Dekodiraj(A):
              if len(A) % 2 == 1:

              else:
                  r = 0
                  i = 0
                  while i < len(A):


                  return r''')),
       P(1, "Kaj izpiše naslednji program? Funkcija `random.randint(1, 100)` vrne naključno celo število od 1 do 100, `A.append(x)` doda x na konec seznama.", [
          ("vsi elementi so sodi → vsota vsakega para je soda → vsi biti so 1", "2 · n je vedno sodo."),
          ("10 parov: 1111111111_{2} = 2^{10} − 1", ""),
          ("!1023", ""),
      ], slika=koda('''
          import random
          A = []
          for i in range(20):
              n = random.randint(1, 100)
              A.append(2 * n)
          print(Dekodiraj(A))'''))]),
]

# ---------------------------------------------------------------- izpitna pola 2
MENI = '''<nav class="meni">
  <a href="index.html">Domov</a>
  <a href="clani/ana.html">Ana Kos</a>
  <a href="clani/bor.html">Bor Vidmar</a>
  <a href="tekme/2024/rezultati.html">Rezultati 2024</a>
  <a href="tekme/2024/koledar.html">Koledar tekem</a>
</nav>'''

RAZPRODAJA = preglednica([
    ["Razprodaja", "", "", "", "", ""],
    ["Popust:", "", "20 %", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["Šifra", "Izdelek", "Velikost", "Redna cena", "Cena s popustom", "Nalepka"],
    ["T-102", "Tekaški copati", "42", "89,99", "71,992", "Prej 89,99 € – zdaj 71,99 €"],
    ["T-215", "Majica", "M", "24,50", "19,6", "Prej 24,5 € – zdaj 19,6 €"],
    ["K-007", "Kolesarska čelada", "L", "64,90", "", ""],
    ["P-330", "Plavalna očala", "–", "15,00", "", ""],
])

REZULTATI = koda('''
    rezultati = [612, 598, 640, 605, 633, 590,
                 655, 601, 620, 648, 597, 615]''')

POLA2 = [
    N(["splet"],
      "Člani šahovskega kluba izdelujejo spletišče. Vstopno stran `index.html` je izdelal Rok in vanjo vstavil meni:",
      [P(None, "", slika=koda(MENI)),
       P(2, "Narišite strukturo map spletišča (korenska mapa je `klub`).", [
          ("@slika", koda('''
              klub
              ├── index.html
              ├── clani
              │   ├── ana.html
              │   └── bor.html
              └── tekme
                  └── 2024
                      ├── rezultati.html
                      └── koledar.html''')),
          ("!klub: index.html, mapa clani (ana.html, bor.html), mapa tekme z mapo 2024 (rezultati.html, koledar.html)", "Strukturo razberemo iz relativnih naslovov v meniju."),
      ]),
       P(1, "Nina je meni preprosto skopirala v datoteko `bor.html`. Njen meni ne deluje. Zakaj?", [
          ("!Relativni naslovi se razlagajo glede na mapo, v kateri je stran (clani).", "Povezava clani/ana.html v bor.html kaže na klub/clani/clani/ana.html, ki ne obstaja; index.html pa na klub/clani/index.html."),
      ]),
       P(2, "Popravite meni, da bo deloval v datoteki `bor.html`.", [
          ("@koda", '''
            <nav class="meni">
              <a href="../index.html">Domov</a>
              <a href="ana.html">Ana Kos</a>
              <a href="bor.html">Bor Vidmar</a>
              <a href="../tekme/2024/rezultati.html">Rezultati 2024</a>
              <a href="../tekme/2024/koledar.html">Koledar tekem</a>
            </nav>''', "Za strani zunaj mape clani gremo z .. eno raven navzgor; strani v isti mapi naslovimo kar z imenom."),
      ])]),

    N(["preglednice"],
      "Športna trgovina ima razprodajo. Redne cene so v stolpcu D, odstotek popusta pa v celici C2.",
      [P(None, "", slika=RAZPRODAJA),
       P(2, "V celico E6 vpišite formulo za ceno s popustom, ki jo lahko kopiramo navzdol.", [
          ("!=D6*(1-$C$2)", "Ali =D6-D6*$C$2. Naslov popusta mora biti absoluten."),
      ]),
       P(1, "Katero naslavljanje celic ste uporabili v zgornji formuli?", [
          ("!Oboje: D6 je relativni naslov, $C$2 absolutni.", "Pri kopiranju navzdol se D6 spremeni v D7, D8 …, $C$2 pa ostane."),
      ]),
       P(2, "Na nalepki želijo obe ceni, kot kaže stolpec F. Napišite formulo za F6, ki jo lahko kopiramo navzdol; ceno s popustom zaokrožite na dve decimalki. "
            "Uporabite `CONCATENATE(del1; del2; …)` (stakne besedila in vrednosti) in `ROUND(število; št_decimalk)`.", [
          ("!=CONCATENATE(\"Prej \";D6;\" € – zdaj \";ROUND(E6;2);\" €\")", "Besedilo je v narekovajih, vrednosti celic pa ne; paziti moramo na presledke."),
      ])]),

    N(["zapis_podatkov", "programiranje"],
      "Dijaki so pognali naslednji program in se čudili izpisu `1e+17`:",
      [P(None, "", slika=koda('''
          def Povecaj(a, b, k):
              for i in range(k):
                  a = a + b
              return a

          print(Povecaj(1e17, 4.0, 1000))''')),
       P(2, "Pojasnite, zakaj se izpiše 1e+17 in ne 10^{17} + 4000.", [
          ("!Števila s plavajočo vejico imajo omejeno število veljavnih mest (okoli 16 desetiških).", "Pri 10^{17} je razmik med sosednjima predstavljivima številoma 16. Vsota 10^{17} + 4 se zaokroži nazaj na 10^{17}, zato vsak korak ne spremeni ničesar."),
      ]),
       P(1, "Ali bi se izpis spremenil, če bi namesto 1000 seštevanj naredili milijon seštevanj? Utemeljite.", [
          ("!Ne. Vsako posamezno prištevanje 4 se izgubi, ne glede na to, kolikokrat ga ponovimo.", ""),
      ]),
       P(2, "Miha je funkcijo spremenil. Kaj se izpiše zdaj in zakaj?", [
          ("r = 4 + 4 + … = 4000", "Majhna števila najprej seštejemo med seboj, kjer ni izgube natančnosti."),
          ("10^{17} + 4000", "4000 je večje od razmika 16, zato se ohrani."),
          ("!1.00000000000004e+17", ""),
      ], slika=koda('''
          def Povecaj(a, b, k):
              r = 0
              for i in range(k):
                  r = r + b
              return a + r

          print(Povecaj(1e17, 4.0, 1000))'''))]),

    N(["slika"],
      "Gal je s telefonom fotografiral šolsko prireditev in fotografijo uredil v programu za obdelavo slik.",
      [P(2, "Med naštetimi formati označite tiste, v katerih lahko shrani sliko: PNG, CSV, TIFF, WAV, GIF, PPTX, JPEG, MP4.", [
          ("!PNG, TIFF, GIF, JPEG", "CSV je preglednica v besedilu, WAV zvok, PPTX prosojnice, MP4 video."),
      ]),
       P(2, "V katerem od teh formatov naj shrani fotografijo za tisk plakata velikosti A2? Utemeljite.", [
          ("!TIFF (ali PNG)", "Zapis brez izgub ohrani vse podrobnosti, ki so pri velikem tisku vidne; TIFF podpira tudi barvni model CMYK za tisk."),
      ]),
       P(2, "V katerem formatu naj fotografijo objavi na spletni strani? Utemeljite.", [
          ("!JPEG", "Stiskanje z izgubami fotografije zelo zmanjša, razlike oko skoraj ne opazi; stran se hitro naloži."),
      ]),
       P(1, "Gal pravi, da je barvna globina slike 32 bitov (RGBA). Kaj lahko sklepamo iz tega podatka?", [
          ("!Vsaka točka ima po 8 bitov za rdečo, zeleno, modro in prosojnost: 2^{24} ≈ 16,7 milijona barv in 256 stopenj prosojnosti.", ""),
      ]),
       P(1, "Koliko prostora zasede nestisnjena slika velikosti 1920 × 1080 točk s 32-bitno globino?", [
          ("1920 · 1080 · 4 B = 8 294 400 B", ""),
          ("!≈ 7,91 MiB", "8 294 400 / 1024^2"),
      ]),
       P(1, "Na stran bo dodal še logotip v štirih barvah. V katerem formatu naj ga shrani, da bo zasedel čim manj prostora?", [
          ("!PNG ali GIF s paleto barv", "Pri 4 barvah zadoščata 2 bita na točko, enobarvne ploskve pa se stisnejo brez izgub."),
      ])]),

    N(["odlocanje"],
      "Dani so trije odločitveni problemi: 1. izbira študija, 2. nakup prenosnega računalnika za študij, 3. izbira kampa za družino s psom in otrokom na vozičku. "
      "Izberite enega in zanj odgovorite na vprašanja. (Rešitev je prikazana za nakup prenosnika.)",
      [P(1, "Določite tri najpomembnejše cilje odločanja.", [
          ("!Prenosnik naj bo dovolj zmogljiv za študijske programe, lahek za prenašanje in cenovno dostopen.", ""),
      ]),
       P(2, "Določite vsaj pet kriterijev.", [
          ("!cena, procesor, delovni pomnilnik, masa, trajanje baterije, velikost zaslona", ""),
      ]),
       P(2, "Kriterije strukturirajte in narišite drevo kriterijev.", [
          ("@slika", koda('''
              PRENOSNIK
              ├── CENA
              ├── ZMOGLJIVOST
              │   ├── procesor
              │   └── delovni pomnilnik
              └── PRENOSLJIVOST
                  ├── masa
                  ├── trajanje baterije
                  └── velikost zaslona''')),
          ("!Drevo s korenom PRENOSNIK in podkriteriji CENA, ZMOGLJIVOST in PRENOSLJIVOST.", "Sorodne osnovne kriterije združimo v skupine; liste drevesa so osnovni kriteriji."),
      ]),
       P(1, "Določite vsaj en izločitveni kriterij.", [
          ("!Cena: prenosnik, dražji od 1000 €, je nesprejemljiv ne glede na druge lastnosti.", ""),
      ]),
       P(1, "Določite merske lestvice za kriterije, s katerimi boste pokazali, da je izbrani kriterij izločitveni.", [
          ("!CENA: nesprejemljiva (nad 1000 €), sprejemljiva, ugodna; ZMOGLJIVOST: slaba, dobra, odlična; PRENOSLJIVOST: slaba, dobra, odlična; PRENOSNIK: neprimeren, primeren, zelo primeren", ""),
      ]),
       P(2, "S tabelo odločitvenih pravil pokažite, da je kriterij res izločitveni.", [
          ("@slika", tabela(["CENA", "ZMOGLJIVOST", "PRENOSLJIVOST", "PRENOSNIK"], [
              ["nesprejemljiva", "*", "*", "neprimeren"],
              ["sprejemljiva", "dobra", "dobra", "primeren"],
              ["sprejemljiva", "odlična", "odlična", "zelo primeren"],
              ["ugodna", "dobra", "odlična", "zelo primeren"],
              ["ugodna", "slaba", "*", "neprimeren"]])),
          ("!Pri nesprejemljivi ceni je rezultat vedno neprimeren (* pomeni katerokoli vrednost).", ""),
      ]),
       P(1, "Kako lahko povečate občutljivost odločitvenega modela?", [
          ("!Z več vrednostmi na merskih lestvicah (bolj drobno ocenjevanje) ali z dodatnimi kriteriji.", "Tako model loči tudi različice, ki bi sicer dobile enako oceno."),
      ])]),

    N(["programiranje"],
      "Na šolskem krosu na 3000 m je teklo 12 tekačev. Njihovi časi v sekundah so v seznamu `rezultati` (prvi tekač je tekel 612 s, drugi 598 s …).",
      [P(None, "", slika=REZULTATI),
       P(1, "Kakšen čas je dosegel najhitrejši tekač?", [("!590 s", "Najmanjša vrednost v seznamu (šesti tekač).")]),
       P(1, "Najhitrejši tekač je dobil kazen 10 sekund, ker je skrajšal progo. Zapišite stavek, ki ustrezno spremeni njegov rezultat v seznamu.", [
          ("@koda", "rezultati[rezultati.index(min(rezultati))] += 10", "Ali kar rezultati[5] += 10, ker je najhitrejši šesti tekač (indeks 5)."),
      ]),
       P(2, "Napišite funkcijo `povprecje(rezultati)`, ki vrne povprečni čas. Rešitev naj deluje za seznam poljubne dolžine.", [
          ("@koda", '''
            def povprecje(rezultati):
                vsota = 0
                for r in rezultati:
                    vsota += r
                return vsota / len(rezultati)''', "Namesto števila 12 uporabimo len(rezultati)."),
      ]),
       P(1, "Napišite program, ki izpiše povprečni čas, zaokrožen na desetinko sekunde. Uporabite `round(stevilo, decimalke)`.", [
          ("@koda", "print(round(povprecje(rezultati), 1))", "Za prvotne rezultate izpiše 617.8."),
      ]),
       P(1, "V finale se uvrstijo tekači, ki so tekli največ 10 minut in 10 sekund. Koliko jih je (pri prvotnih rezultatih)?", [
          ("10 min 10 s = 610 s", ""),
          ("598, 605, 590, 601, 597 ≤ 610", ""),
          ("!5 tekačev", ""),
      ]),
       P(3, "Napišite funkcijo `uvrsceni(rezultati, dovoljen_cas)`, ki vrne, koliko tekačev je teklo največ dovoljen_cas sekund.", [
          ("@koda", '''
            def uvrsceni(rezultati, dovoljen_cas):
                n = 0
                for r in rezultati:
                    if r <= dovoljen_cas:
                        n += 1
                return n''', "Preštejemo rezultate, ki ustrezajo pogoju."),
      ]),
       P(1, "Napišite program, ki izpiše skupno število tekačev in število uvrščenih v finale, ločeni z vejico in presledkom.", [
          ("@koda", "print(len(rezultati), uvrsceni(rezultati, 610), sep=\", \")", "Izpis: 12, 5. Enako: print(str(len(rezultati)) + \", \" + str(uvrsceni(rezultati, 610)))."),
      ])]),
]
