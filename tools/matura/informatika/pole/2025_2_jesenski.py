LETO, ROK, DATUM = 2025, "jesenski", "četrtek, 28. avgust 2025"

# ---------------------------------------------------------------- izpitna pola 1
VSTOPNICE = preglednica([
    ["Prodaja vstopnic", "", "", "", "", "", "", ""],
    ["Popust:", "", "20 %", "", "Sedežev v dvorani:", "", "200", ""],
    ["", "", "", "", "", "", "", ""],
    ["Datum", "Predstava", "Prodane", "Cena", "Popust", "Cena s popustom", "Prihodek", "Razprodano"],
    ["3. 10. 2025", "Hamlet", 184, "12,00", "", "", "", ""],
    ["4. 10. 2025", "Hamlet", 200, "12,00", "", "", "", ""],
    ["10. 10. 2025", "Pohujšanje", 156, "10,00", "", "", "", ""],
    ["11. 10. 2025", "Pohujšanje", 200, "10,00", "", "", "", ""],
    ["17. 10. 2025", "Kralj Ubu", 97, "9,00", "", "", "", ""],
    ["", "", "", "", "", "Skupaj:", "", ""],
])

IZLET_HTML = '''<h1>Šolski izlet</h1>
<ol>
  <li>Zbor pred šolo</li>
  <li>Vožnja v Postojno
    <ul>
      <li>avtobus 1</li>
      <li>avtobus 2</li>
    </ul>
  </li>
  <li>Ogled jame</li>
</ol>
<h2>Kaj vzamemo s seboj</h2>
<ul>
  <li>malico</li>
  <ol><li>pijačo</li></ol>
  <li>jakno</li>
</ul>'''

POLA1 = [
    N(["temeljni_pojmi"],
      "Na zaslonu pametne ure je velika številka `7845`, pod njo pa napis »korakov danes«. Kaj je na zaslonu podatek in kaj informacija?",
      [P(1, "", [
          ("!Podatek: 7845", "Samo število, ki brez okoliščin nima pomena."),
          ("!Informacija: lastnik ure je danes naredil 7845 korakov.", "Podatek s pomenom, ki ga razumemo in lahko uporabimo."),
      ])]),

    N(["programiranje", "algoritem"],
      "Dana je funkcija:",
      [P(None, "", slika=koda('''
          def nekaj(a, b):
              s = 0
              while a != b:
                  s += a
                  a += 2
              return s''')),
       P(1, "Napišite, kaj vrne klic `nekaj(3, 8)`. Utemeljite.", [
          ("a = 3, 5, 7, 9, 11, …", "a je vedno liho število, b = 8 pa sodo."),
          ("!Ne vrne ničesar: zanka je neskončna.", "Pogoj a != b je vedno resničen, zato funkcija nikoli ne pride do stavka return."),
      ])]),

    N(["druzbeni_vidiki", "programska_oprema"],
      "Kateri od naštetih ni vrsta zlonamerne programske opreme? Obkrožite.",
      [P(1, "", [("!C", "Požarni zid je varnostni program ali naprava, ki nadzoruje promet v omrežje in iz njega. Ostali trije so zlonamerni programi.")],
         slika=izbire("Izsiljevalski program (ransomware).", "Vohunski program (spyware).", "Požarni zid (firewall).", "Trojanski konj."))]),

    N(["strojna_oprema", "zgradba_racunalnika"],
      "Zmogljivost računalnika in zmogljivost procesorja nista isto. Kateri dejavnik vpliva na zmogljivost računalnika, ne pa na zmogljivost procesorja? Obkrožite in utemeljite.",
      [P(1, "", [("!C", "Hitrost diska vpliva na to, kako hitro računalnik naloži programe in podatke, procesor sam pa zaradi nje ne računa nič hitreje. Takt, število jeder in predpomnilnik so lastnosti procesorja.")],
         slika=izbire("Frekvenca sistemske ure (takt).", "Število jeder.", "Hitrost branja diska SSD.", "Velikost predpomnilnika."))]),

    N(["omrezja", "druzbeni_vidiki"],
      "Lana je našla spletno trgovino z ugodnimi cenami na naslovu `http://www.trgovina-poceni.si`. Pri plačilu stran zahteva vpis številke plačilne kartice. "
      "Brat ji je nakup odsvetoval. Smiselno pojasnite, zakaj.",
      [P(1, "", [
          ("!Naslov se začne s http in ne https, zato povezava ni šifrirana.", "Številko kartice bi kdorkoli na poti (npr. v istem brezžičnem omrežju) lahko prestregel. Brez certifikata tudi ne vemo, ali je strežnik res trgovina, za katero se predstavlja."),
      ])]),

    N(["temeljni_pojmi", "zapis_podatkov"],
      "Na parkirišču pred stadionom je 90 parkirnih mest. Mesta želijo označiti s kodami enake dolžine iz štirih različnih znakov: ●, ■, ▲ in ★.",
      [P(1, "Najmanj koliko dolge morajo biti kode, da bo vsako mesto enolično označeno?", [
          ("4^3 = 64 < 90 ≤ 256 = 4^4", "S k znaki iz 4 možnih zapišemo 4^k različnih kod."),
          ("!4 znake", ""),
      ]),
       P(1, "Kolikšno količino informacije dobi voznik, ko izve, na katerem mestu je parkiran njegov avto (vsa mesta so enako verjetna)?", [
          ("I = log_{2} 90", ""),
          ("!≈ 6,49 bita", ""),
      ])]),

    N(["omrezja", "komuniciranje"],
      "Omrežje ponuja storitvi `pošlji(komu, kaj)` in `dobil(od_koga, kaj)`. Sporočilo omrežje razdeli na pakete, ki imajo poleg dela vsebine (kaj) še podatke za delovanje omrežja. "
      "Dron pošlje bazni postaji sporočilo »Baterija 15 %, vračam se«, postaja pa odgovori »Potrjeno«. Paketi potujejo prek več vozlišč.",
      [P(1, "Katere podatke za delovanje omrežja morajo vsebovati paketi prvega sporočila, da jih omrežje dostavi bazni postaji? Utemeljite.", [
          ("!Naslov prejemnika (bazne postaje) in zaporedno številko paketa.", "Vozlišča po naslovu prejemnika izberejo pot. Ker paketi lahko pridejo v drugem vrstnem redu, prejemnik po zaporednih številkah sestavi sporočilo."),
      ]),
       P(1, "Katere podatke morajo vsebovati paketi prvega sporočila, da lahko bazna postaja odgovori? Utemeljite.", [
          ("!Naslov pošiljatelja (drona).", "Postaja mora vedeti, komu poslati odgovor; to je od_koga pri storitvi dobil."),
      ])]),

    N(["baze"],
      "V tabeli `Urnik(razred, dan, ura, predmet, ucilnica)` so zapisane ure pouka, na primer (3.B, ponedeljek, 2, matematika, 14).",
      [P(2, "Določite primarni ključ tabele in utemeljite, zakaj je sestavljen iz več atributov.", [
          ("!(razred, dan, ura)", "Noben atribut sam ne določa vrstice enolično: razred ima veliko ur, na isti dan in uro je pouk v več razredih. Šele kombinacija razreda, dneva in ure se ne ponovi (razred je ob danem času le pri enem predmetu)."),
      ])]),

    N(["zapis_podatkov"],
      "Pri predznačenem zapisu celih števil najbolj levi bit pomeni predznak (0 = +, 1 = −), ostali biti pa absolutno vrednost. Pri k = 7 je 22 zapisano kot `0010110`, −22 pa kot `1010110`.",
      [P(1, "Katere vrednosti predstavljajo naslednji 6-bitni predznačeni zapisi: `000000`, `111111`, `100000`, `011111`, `000101`, `110010`?", [
          ("000000 = +0;  111111 = −31;  100000 = −0 (= 0)", "Pet bitov vrednosti: največ 11111 = 31."),
          ("011111 = 31;  000101 = 5;  110010 = −18", "10010 = 16 + 2 = 18."),
          ("!0, −31, 0 (−0), 31, 5, −18", "V tem zapisu ima ničla dva zapisa."),
      ]),
       P(1, "Senzor meri odstopanje temperature od nastavljene v celih stopinjah od −10 do +10. Najmanj kolikšen k potrebujemo za predznačeni zapis teh vrednosti?", [
          ("10 = 1010 → 4 biti za vrednost + 1 bit za predznak", "Z 3 biti vrednosti bi zapisali le do 7."),
          ("!k = 5", ""),
      ])]),

    N(["programiranje", "omrezja"],
      "Naslov IPv4 zapišemo s štirimi desetiškimi števili med 0 in 255, ločenimi s pikami, na primer `192.168.1.20`.",
      [P(1, "Napišite funkcijo `je_bajt(niz)`, ki vrne True, če je niz sestavljen iz ene do treh števk in predstavlja število med 0 in 255, sicer False.", [
          ("@koda", '''
            def je_bajt(niz):
                return 1 <= len(niz) <= 3 and niz.isdigit() and int(niz) <= 255''', "isdigit preveri, da so vsi znaki števke; šele nato smemo niz pretvoriti z int."),
      ], slika=koda("def je_bajt(niz):")),
       P(2, "Napišite funkcijo `preveri_IPv4(niz)`, ki vrne True, če je niz veljaven naslov IPv4, sicer False. Uporabite lahko `je_bajt`. "
            "Namig: `niz.split(\".\")` razdeli niz pri pikah, npr. `\"1.20.3\".split(\".\")` vrne `[\"1\", \"20\", \"3\"]`.", [
          ("@koda", '''
            def preveri_IPv4(niz):
                deli = niz.split(".")
                if len(deli) != 4:
                    return False
                for d in deli:
                    if not je_bajt(d):
                        return False
                return True''', "Naslov mora imeti natanko štiri dele in vsak mora biti bajt. 192.168.1.256 vrne False, ker 256 > 255."),
      ], slika=koda("def preveri_IPv4(niz):"))]),

    N(["zgradba_racunalnika"],
      "V von Neumannovi arhitekturi CPE ukaze programa enega za drugim prevzema iz pomnilnika in jih izvaja.",
      [P(1, "V programskem števcu je vrednost 2048, v registru R1 vrednost 15, v R2 vrednost 3000. Kje je naslednji ukaz, ki bo izveden?", [
          ("!V pomnilniku na naslovu 2048.", "Programski števec vedno hrani naslov naslednjega ukaza; vrednosti v R1 in R2 so podatki."),
      ]),
       P(1, "Kateri del CPE prevzeti ukaz dekodira in nadzoruje njegovo izvajanje? Obkrožite.", [
          ("!B", "Krmilna enota dekodira ukaz in daje signale drugim delom; ALE samo računa."),
      ], slika=izbire("Aritmetično-logična enota.", "Krmilna enota.", "Registri.", "Vodilo.")),
       P(1, "Izvaja se ukaz `MUL R1, @R2, R3`, ki zmnoži vrednost v registru R1 z vrednostjo v pomnilniku na naslovu, ki je zapisan v R2, in rezultat shrani v R3. "
            "Česa ne poznamo, da bi lahko izračunali vrednost v R3?", [
          ("!Vsebine pomnilnika na naslovu 3000.", "R2 = 3000 je le naslov; množimo s tem, kar je zapisano na tem naslovu."),
      ])]),

    N(["programiranje", "slika"],
      "Za črno-beli tisk mora Lea barvne slike pretvoriti v sivine. Barvo v modelu RGB (tri cela števila od 0 do 255) pretvori v sivino po formuli "
      "Y = 0,299 · R + 0,587 · G + 0,114 · B, ki jo zaokroži na celo število. Siva barva ima vse tri komponente enake Y.",
      [P(3, "Napišite funkcijo `sivina(barva)`, ki dobi seznam `[R, G, B]` in vrne seznam treh komponent sive barve. Za `[200, 100, 50]` vrne `[124, 124, 124]`.", [
          ("0,299 · 200 + 0,587 · 100 + 0,114 · 50 = 124,2 → 124", "Preverimo primer."),
          ("@koda", '''
            def sivina(barva):
                r, g, b = barva
                y = round(0.299 * r + 0.587 * g + 0.114 * b)
                return [y, y, y]''', "V Pythonu pišemo decimalno piko. round zaokroži na celo število."),
      ], slika=koda("def sivina(barva):"))]),

    N(["preglednice"],
      "Gledališče vodi prodajo vstopnic v preglednici.",
      [P(None, "", slika=VSTOPNICE),
       P(1, "Zapišite tipe podatkov v prvih treh stolpcih (Datum, Predstava, Prodane).", [
          ("!Datum: datum; Predstava: besedilo; Prodane: (celo) število", ""),
      ]),
       P(1, "Popust je produkt cene in odstotka popusta v celici C2. Zapišite formulo za celico E5, ki jo lahko kopiramo do E9.", [
          ("!=D5*$C$2", "Naslov C2 mora biti absoluten ($), da se pri kopiranju ne premakne."),
      ]),
       P(1, "Cena s popustom je razlika cene in popusta, prihodek pa produkt prodanih vstopnic in cene s popustom. Zapišite formuli za F5 in G5 (za kopiranje do vrstice 9) ter formulo za G10, ki sešteje prihodek.", [
          ("!F5: =D5-E5;  G5: =C5*F5;  G10: =SUM(G5:G9)", ""),
      ]),
       P(1, "Predstava je razprodana (DA), če je prodanih toliko vstopnic, kot je sedežev (celica G2), sicer NE. Zapišite formulo za H5, ki jo lahko kopiramo do H9.", [
          ("!=IF(C5>=$G$2;\"DA\";\"NE\")", ""),
      ])]),

    N(["splet"],
      "Ema je za razredno spletno stran napisala del kode HTML:",
      [P(None, "", slika=koda(IZLET_HTML)),
       P(4, "Kaj izriše spletni brskalnik? Bodite pozorni na vrsto seznamov.", [
          ("@slika", R('<div class="in-izris">' + IZLET_HTML + '</div>')),
          ("!Naslov, oštevilčen seznam 1.–3. z dvema alinejama pod točko 2, podnaslov in seznam z alinejami, pri katerem je »pijačo« zamaknjena in oštevilčena z 1.", "ol izriše številke, ul alineje. Notranji ol pri »pijačo« je nov seznam, zato začne šteti znova pri 1."),
      ]),
       P(1, "Ema želi, da so vse tri stvari v drugem seznamu izpisane enako, z alinejami. Popravite kodo.", [
          ("@koda", '''
            <ul>
              <li>malico</li>
              <li>pijačo</li>
              <li>jakno</li>
            </ul>''', "Element ol odstranimo; v ul so neposredno le elementi li."),
      ])]),

    N(["programiranje", "algoritem"],
      "Na listku je Žiga našel program:",
      [P(None, "", slika=koda('''
          b = 6
          while b != 1:
              if b % 2 == 0:
                  b = b // 2
              else:
                  b = 3 * b + 1
              print(b)''')),
       P(1, "Zapišite, kaj izpiše program. Vrstice izpisa ločite z vejico.", [
          ("6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1", "Sodo število razpolovimo, liho pomnožimo s 3 in prištejemo 1."),
          ("!3, 10, 5, 16, 8, 4, 2, 1", ""),
      ]),
       P(2, "Žiga je začetno vrednost spremenljivke b nastavil na 2024. Zapišite zadnje štiri vrstice izpisa. Utemeljite.", [
          ("!8, 4, 2, 1", "Program se ustavi, ko b postane 1. Do 1 pa iz sodega števila pridemo le z razpolavljanjem, 2 dobimo samo iz 4, 4 samo iz 8 (iz 1 ne, ker se tam program ustavi). Zato se vsak izpis konča z 8, 4, 2, 1 (če se začne nad 8)."),
      ]),
       P(2, "Kaj naredi algoritem za poljubno naravno število b?", [
          ("!Izpisuje zaporedje (Collatzovo zaporedje), v katerem sodo število razpolovi, liho pa pomnoži s 3 in prišteje 1, dokler ne pride do 1.", "Za vsa preizkušena števila zaporedje pride do 1, dokaza za vsa števila pa ni."),
      ])]),
]

# ---------------------------------------------------------------- izpitna pola 2
DREVO = koda('''
    splet
    ├── index.html
    ├── podatki
    │   └── stran.html
    ├── slike
    │   ├── ikone
    │   └── fotke
    └── arhiv
        └── 2024
            └── modeli''')

PIZZERIJA = (
    "<p><strong>Kupci</strong></p>" + tabela(["id_kupca", "ime", "naslov", "posta", "id_dostavljavca"], [
        [1, "Maja Novak", "Kidričeva 5", "4000 Kranj", 2], [2, "Luka Bizjak", "Trg 1", "4202 Naklo", 1], [3, "Ana Zupan", "Bleiweisova 12", "4000 Kranj", 2]]) +
    "<p><strong>Dostavljavci</strong></p>" + tabela(["id_dostavljavca", "ime", "telefon"], [[1, "Tim", "040 111 222"], [2, "Eva", "031 333 444"]]) +
    "<p><strong>Izdelki</strong></p>" + tabela(["id_izdelka", "naziv", "cena"], [[10, "Margerita", "8,50"], [11, "Klasika", "10,00"], [12, "Vegi", "9,50"]]) +
    "<p><strong>Narocila</strong></p>" + tabela(["id_narocila", "id_kupca", "id_izdelka", "kolicina", "datum", "naslov", "posta"], [
        [501, 1, 10, 2, "2. 9. 2025", "Kidričeva 5", "4000 Kranj"], [502, 3, 11, 1, "2. 9. 2025", "Ljubljanska 30", "4000 Kranj"],
        [503, 1, 12, 1, "3. 9. 2025", "Šuceva 27", "4000 Kranj"]]))

POLA2 = [
    N(["druzbeni_vidiki"],
      "Digitalna tehnologija prinaša prednosti, na primer večjo produktivnost, hitrejšo komunikacijo, nove oblike dela, manj ponavljajočega dela in lažji dostop do znanja. "
      "Prinaša pa tudi nevarnosti: odvisnost od tehnologije, vplive na zdravje, ogroženo varnost podatkov in zasebnost, digitalni razkorak in vpliv na okolje.",
      [P(2, "Izberite tri nevarnosti in opišite situacijo, v kateri se vse tri pojavijo hkrati in so med seboj povezane. Utemeljite.", [
          ("!Najstnik vsak večer do dveh zjutraj igra spletno igro (odvisnost), zato slabo spi in ga bolijo oči (zdravje); v igri je shranil podatke starševske kartice, ki jih napadalci ukradejo, ko vdrejo v strežnik igre (varnost podatkov).",
           "Povezava: ker je v igri veliko časa in pogosto kupuje dodatke, je kartico shranil v igro; dolgo igranje je vzrok za zdravstvene težave. Primer je pravilen, če so nevarnosti vzročno povezane."),
      ]),
       P(3, "Izberite dve prednosti in dve nevarnosti ter opišite situacijo, v kateri se pojavijo vse štiri. Utemeljite.", [
          ("!Podjetje uvede delo od doma prek videokonferenc (nove oblike dela, hitrejša komunikacija). Zaposleni brez dobre povezave na podeželju ne morejo sodelovati (digitalni razkorak), "
           "zaupni dokumenti pa krožijo prek osebnih računalnikov brez zaščite (varnost podatkov).",
           "Vse štiri izhajajo iz iste odločitve – dela na daljavo –, zato so povezane in ne naštete ločeno."),
      ])]),

    N(["splet"],
      "Spletišče je objavljeno na naslovu `https://www.splet.si/`, korenska mapa spletišča je `splet`. Struktura map:",
      [P(None, "", slika=DREVO),
       P(None, "Spletna stran `stran.html` v mapi `podatki` prikazuje sliko `slika1.jpg`."),
       P(2, "Zapišite odvisni (relativni) naslov slike v datoteki `stran.html`, če je slika v mapi `modeli` oziroma v mapi `ikone`.", [
          ("!modeli: ../arhiv/2024/modeli/slika1.jpg", "Iz mape podatki gremo z .. v mapo splet in nato navzdol."),
          ("!ikone: ../slike/ikone/slika1.jpg", ""),
      ]),
       P(2, "Zapišite neodvisni (absolutni) naslov slike, če je slika v mapi `podatki` oziroma v mapi `fotke`.", [
          ("!podatki: https://www.splet.si/podatki/slika1.jpg", "Absolutni naslov vsebuje protokol, strežnik in celotno pot od korena spletišča."),
          ("!fotke: https://www.splet.si/slike/fotke/slika1.jpg", ""),
      ]),
       P(1, "Slika je v mapi `fotke`. Stran `stran1.html` vsebuje `<img src=\"../slike/ikone/../fotke/slika1.jpg\">`. V katere mape lahko shranimo `stran1.html`, da se slika prikaže?", [
          ("../slike/ikone/../fotke = ../slike/fotke", "ikone/.. se izničita."),
          ("!V mapo podatki, slike ali arhiv.", "Naslov se začne z .., zato mora biti stran v mapi, ki je neposredno v mapi splet."),
      ])]),

    N(["programiranje", "obdelava"],
      "Športna ura prek programskega vmesnika ponuja funkcijo `zadnji_utripi(n)`, ki vrne zadnjih n izmerjenih srčnih utripov (cela števila, udarci na minuto).",
      [P(1, "Kateri podatkovni tip je najprimernejši za vrnjeni rezultat? Utemeljite.", [
          ("!Seznam (tabela) celih števil.", "Vrniti mora več vrednosti istega tipa v časovnem vrstnem redu, število vrednosti pa je odvisno od n."),
      ]),
       P(1, "Napišite primer vrnjenega rezultata za n = 4.", [
          ("![72, 75, 71, 80]", ""),
      ]),
       P(3, "Napišite funkcijo `povprecni_utrip(utripi)`, ki dobi seznam utripov in vrne njihovo povprečje. Uporabimo jo takole:", [
          ("@koda", '''
            def povprecni_utrip(utripi):
                vsota = 0
                for u in utripi:
                    vsota += u
                return vsota / len(utripi)''', "Seštejemo vse vrednosti in delimo s številom vrednosti. Krajše: sum(utripi) / len(utripi)."),
      ], slika=koda('''
          n = 30
          utripi = zadnji_utripi(n)
          print("Povprečni utrip:", povprecni_utrip(utripi))

          def povprecni_utrip(utripi):'''))]),

    N(["baze"],
      "Pizzerija ima kupce, ki naročajo izdelke. Vsak kupec ima izbranega enega dostavljavca. Študent Tilen je narisal model E-R, po njem izdelal bazo in vnesel podatke, "
      "nato pa načrt modela po nesreči zavrgel. Tabele baze:",
      [P(None, "", slika=PIZZERIJA),
       P(4, "Narišite diagram E-R z entitetami, atributi, razmerji s števnostmi in primarnimi ključi.", [
          ("@slika", entitete(
              ("Dostavljavec", ["#id_dostavljavca", "ime", "telefon"]),
              ("Kupec", ["#id_kupca", "ime", "naslov", "posta", "→id_dostavljavca"]),
              ("Izdelek", ["#id_izdelka", "naziv", "cena"]),
              ("Narocilo", ["#id_narocila", "→id_kupca", "→id_izdelka", "kolicina", "datum", "naslov", "posta"]),
              razmerja=["Dostavljavec 1 : N Kupec", "Kupec 1 : N Narocilo", "Izdelek 1 : N Narocilo"])),
          ("!Dostavljavec 1 : N Kupec, Kupec 1 : N Narocilo, Izdelek 1 : N Narocilo", "Dostavljavec dostavlja več kupcem, kupec ima enega dostavljavca. Kupec odda več naročil, izdelek je v več naročilih."),
      ]),
       P(3, "Za vsak tuji ključ navedite entiteto in atribut ter entiteto in primarni ključ, na katerega se nanaša.", [
          ("@slika", tabela(["Tuji ključ: entiteta", "atribut", "Primarni ključ: entiteta", "atribut"], [
              ["Kupec", "id_dostavljavca", "Dostavljavec", "id_dostavljavca"],
              ["Narocilo", "id_kupca", "Kupec", "id_kupca"],
              ["Narocilo", "id_izdelka", "Izdelek", "id_izdelka"]])),
          ("!Kupec.id_dostavljavca → Dostavljavec, Narocilo.id_kupca → Kupec, Narocilo.id_izdelka → Izdelek", ""),
      ]),
       P(2, "Atributa naslov in posta sta v tabelah Kupci in Narocila. Tilnova mentorica pravi, da ju ne sme izbrisati iz tabele Narocila, ker imata drugačen pomen. S primerom razložite razliko.", [
          ("!V Kupci je stalni naslov kupca, v Narocila pa naslov dostave tega naročila.", "Maja (kupec 1) je naročilo 503 naročila v službo na Šucevo 27, čeprav živi na Kidričevi 5. Tudi če se kupec preseli, mora pri starih naročilih ostati naslov, kamor je bila pica res dostavljena."),
      ])]),

    N(["programiranje", "algoritem"],
      "Nejc je od Klare dobil datoteko `najvecji.py`. Funkcije omogočajo ustvariti spremenljivko (`Ustvari`), dodajati vanjo cela števila (`Vstavi`), "
      "izvedeti, koliko vrednosti vsebuje (`Koliko`) in katera je največja (`Najvecja`), ter največjo vrednost odstraniti (`Izloci`). Klara mu je dala programček in njegov izpis:",
      [P(None, "", slika=slike_v_vrsti(("program", koda('''
          from najvecji import *
          vrednosti = Ustvari()
          Vstavi(vrednosti, 30)
          Vstavi(vrednosti, 8)
          print("A>", Koliko(vrednosti), Najvecja(vrednosti))
          Vstavi(vrednosti, 50)
          print("B>", Koliko(vrednosti), Najvecja(vrednosti))
          Izloci(vrednosti)
          print("C>", Koliko(vrednosti), Najvecja(vrednosti))''')), ("izpis", koda('''
          A> 2 30
          B> 3 50
          C> 2 30''')))),
       P(1, "Na konec programčka dodajte klice Klarinih funkcij, da bo izpis zadnje vrstice `D> 3 64`.", [
          ("Po C> sta v spremenljivki 30 in 8.", ""),
          ("@koda", '''
            Vstavi(vrednosti, 64)
            print("D>", Koliko(vrednosti), Najvecja(vrednosti))''', "Vrednosti so 30, 8, 64: tri vrednosti, največja je 64."),
      ]),
       P(2, "Kaj izpiše naslednji programček?", [
          ("v = 5, 10, 2, 7", "(5 + 5) % 13 = 10, (10 + 5) % 13 = 2, (2 + 5) % 13 = 7."),
          ("!G> 4 10", "Vstavljene so 5, 10, 2, 7; največja je 10."),
          ("!H> 3 7", "Ko izločimo 10, ostanejo 5, 2, 7."),
      ], slika=koda('''
          from najvecji import *
          vrednosti = Ustvari()
          v = 5
          for i in range(4):
              Vstavi(vrednosti, v)
              v = (v + 5) % 13
          print("G>", Koliko(vrednosti), Najvecja(vrednosti))
          Izloci(vrednosti)
          print("H>", Koliko(vrednosti), Najvecja(vrednosti))''')),
       P(4, "S Klarinimi funkcijami napišite program, ki seznam `[442, 689, 162, 414, 974, 277, 161]` uredi naraščajoče.", [
          ("@koda", '''
            from najvecji import *
            stevila = [442, 689, 162, 414, 974, 277, 161]
            vrednosti = Ustvari()
            for x in stevila:
                Vstavi(vrednosti, x)
            urejena = []
            while Koliko(vrednosti) > 0:
                urejena.insert(0, Najvecja(vrednosti))
                Izloci(vrednosti)
            print(urejena)''', "Vse vstavimo, nato večkrat vzamemo največjo. Ker dobivamo od največje proti najmanjši, vsako vstavimo na začetek seznama (urejanje s kopico)."),
      ]),
       P(3, "Dopolnite manjkajoče dele Klarine kode. Klara hrani vrednosti v seznamu, urejenem padajoče. "
            "Pomagate si lahko z `len(t)`, `t.insert(i, x)` (vstavi x na mesto i) in `t.pop(i)` (odstrani element na mestu i).", [
          ("@koda", '''
            def Vstavi(vrsta, p):
                i = 0
                while i < len(vrsta) and vrsta[i] > p:
                    i += 1
                vrsta.insert(i, p)

            def Najvecja(vrsta):
                return vrsta[0]

            def Izloci(vrsta):
                vrsta.pop(0)''', "Novo vrednost vstavimo pred prvo manjšo ali enako, da seznam ostane urejen. Največja je zato vedno na mestu 0."),
      ], slika=koda('''
          def Ustvari():
              return []

          def Vstavi(vrsta, p):
              i = 0
              # DOPIŠITE KODO
              vrsta.insert(i, p)

          def Koliko(vrsta):
              return len(vrsta)

          def Najvecja(vrsta):
              # DOPIŠITE KODO

          def Izloci(vrsta):
              # DOPIŠITE KODO'''))]),

    N(["splet"],
      "Hana izdeluje spletno stran z recepti za kuharski krožek. Na spletu je našla vzorec, v katerem manjka 10 delov, in namig: "
      "»Nekaj manjkajočih delov: html, sl, id, article, /article, section, /section, /h2, main, /main. Morda niso vsi potrebni, kakšen pa tudi manjka.«",
      [P(10, "Dopolnite manjkajoče dele vzorca.", [
          ("@koda", '''
            <!DOCTYPE html>
            <html lang="sl">
            <head>
              <title>Recepti krožka</title>
            </head>
            <body>
              <nav>
                <a href="#juhe">Juhe</a>
                <a href="#sladice">Sladice</a>
              </nav>
              <main>
                <section id="juhe">
                  <article>
                    <h2>Bučna juha</h2>
                    <p>Buča, čebula, smetana.</p>
                  </article>
                  <article>
                    <h2>Gobova juha</h2>
                    <p>Jurčki, krompir, peteršilj.</p>
                  </article>
                </section>
                <section id="sladice">
                  <article>
                    <h2>Palačinke</h2>
                    <p><strong>Za 4 osebe</strong></p>
                  </article>
                </section>
              </main>
            </body>
            </html>''', "Vsak manjkajoči del je 1 točka: html, sl, id, article, /article, /h2, section, /strong, /p, /main."),
          ("!html, sl, id, article, /article, /h2, section, /strong, /p, /main", "Povezava #sladice skoči na element z id=\"sladice\". Znački /strong in /p v namigu nista bili, zato ju je bilo treba dodati."),
      ], slika=koda('''
          <!DOCTYPE _____>
          <html lang="___">
          <head>
            <title>Recepti krožka</title>
          </head>
          <body>
            <nav>
              <a href="#juhe">Juhe</a>
              <a href="#sladice">Sladice</a>
            </nav>
            <main>
              <section ___="juhe">
                <article>
                  <h2>Bučna juha</h2>
                  <p>Buča, čebula, smetana.</p>
                </article>
                <_______>
                  <h2>Gobova juha</h2>
                  <p>Jurčki, krompir, peteršilj.</p>
                <________>
              </section>
              <section id="sladice">
                <article>
                  <h2>Palačinke<_____>
                  <p><strong>Za 4 osebe<_______><____>
                </article>
              </_______>
            <_____>
          </body>
          </html>'''))]),
]
