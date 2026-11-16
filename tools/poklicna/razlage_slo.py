# python3 tools/poklicna/razlage_slo.py
# Strani z razlago za poklicno maturo iz slovenščine (public/views/poklicna_slovenscina/snov/<slug>/).
# Vsaka stran je sestavljena v vrstnem redu predmetnega izpitnega kataloga za poklicno maturo
# (P-SLM-2025): iz sklopov obstoječih razlag splošne mature (le tisti, ki jih katalog poklicne
# mature zajema) in iz lastnih sklopov za dele, ki jih ima samo poklicna matura (zgradba izpita,
# izpitna pola 1 z razčlembo in tvorbo, izpitna pola 2 z interpretacijo, ustni izpit).
import os
import re

import razlage_mat as rm
import videi_pm

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
rm.SM = os.path.join(KOREN, "public", "views", "slovenscina", "snov")
rm.IZHOD = os.path.join(KOREN, "public", "views", "poklicna_slovenscina", "snov")
rm.PREDMET, rm.SLUG, rm.IZ = "Slovenščina", "poklicna_slovenscina", "iz slovenščine"
rm.DODATEK = ""

SM_SLUGI = ["antika", "besedilo", "besedje", "evropska_moderna", "evropska_romantika", "glasoslovje_pravorecje",
            "jezik_sporazumevanje", "jezikovne_zvrsti", "ljudsko_slovstvo", "med_romantiko_realizmom", "oblikoslovje",
            "orient", "pravopis", "preseren", "razsvetljenstvo", "realizem", "reformacija_barok", "renesansa", "skladnja",
            "slovenska_dramatika_20", "slovenska_moderna", "slovenska_prva_polovica_20", "slovensko_pesnistvo_20",
            "slovensko_pripovednistvo_20", "srednji_vek", "svet_druga_polovica_20", "svet_prva_polovica_20", "uvod_knjizevnost"]
rm.VIRI = {s: f"{s}/{s}" for s in SM_SLUGI}

# Besedila splošne mature govorijo o »2. izpitni poli« (razčlemba neumetnostnega besedila);
# na poklicni maturi je to izpitna pola 1.
ZAMENJAVE = [
    ("2. izpitna pola ima eno (včasih dve) <strong>izhodiščno besedilo</strong>",
     "Izpitna pola 1 na poklicni maturi ima eno <strong>izhodiščno besedilo</strong>"),
    ("Kako se lotiš 2. izpitne pole", "Kako se lotiš izpitne pole 1"),
    ("2. izpitne pole", "izpitne pole 1"),
    ("2. izpitni poli", "izpitni poli 1"),
]
_predelaj = rm.predelaj


def predelaj(*a):
    h, tipi = _predelaj(*a)
    for x, y in ZAMENJAVE:
        h = h.replace(x, y)
    return h, tipi


rm.predelaj = predelaj


def tip(n, naslov, naloga, prepoznaj, kljucne, koraki):
    """Tip naloge v lastnem sklopu: koraki so pari (korak, primer na nalogi)."""
    kl = "".join(f"<li>„{k}“</li>" for k in kljucne)
    ko = "".join(f'\n              <li><p class="korak">{k}</p><div class="na-nalogi"><p>{p}</p></div></li>' for k, p in koraki)
    return f"""
            <div class="tip-naloge" id="tip-{n}">
              <h4>Tip {n}: {naslov}</h4>
              <div class="tip-naloga"><span class="tip-naloga-oznaka">Naloga</span><p>{naloga}</p></div>
              <div class="prepoznaj"><p><strong>Kako prepoznaš:</strong> {prepoznaj}</p><ul class="kljucne">{kl}</ul></div>
              <h5>Univerzalni postopek</h5><ol class="postopek">{ko}
              </ol>
            </div>
"""


def sklop(naslov, podnaslov, teorija, tipi=""):
    naloge = f"""
          <div class="sklop-naloge">
            <h3>Tipi nalog v tem sklopu</h3>
{tipi}          </div>""" if tipi else ""
    return f"""<section class="sklop" id="sklop-0">
          <header class="sklop-header">
            <span class="sklop-num">0</span>
            <h2>{naslov}</h2>
            <p>{podnaslov}</p>
          </header>
          <div class="sklop-teorija">
            <h3>Razlaga</h3>
{teorija}
          </div>{naloge}
        </section>"""


# ------------------------------------------------------------------ lastni sklopi

IZPIT_ZGRADBA = sklop(
    "Zgradba izpita in točkovanje", "Pisni del (dve izpitni poli) in ustni izpit: kaj se ocenjuje in koliko šteje.",
    """            <p>Izpit iz slovenščine je <strong>obvezen</strong> za vse kandidate poklicne mature. Sestavljen je iz <strong>pisnega</strong> (70 %) in <strong>ustnega</strong> dela (30 %). Pisni del traja 120 minut, vsaka pola 60 minut. Dovoljeno je le nalivno pero ali kemični svinčnik.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Del izpita</th><th>Kaj delaš</th><th>Čas</th><th>Delež</th></tr></thead>
                <tbody>
                  <tr><td>Izpitna pola 1 (IP 1)</td><td>razčlemba neumetnostnega besedila in tvorba krajšega neumetnostnega besedila</td><td>60 minut</td><td>40 %</td></tr>
                  <tr><td>Izpitna pola 2 (IP 2)</td><td>vodena ali samostojna interpretacija (odlomka) umetnostnega besedila</td><td>60 minut</td><td>30 %</td></tr>
                  <tr><td>Ustni izpit</td><td>glasno branje, vodena interpretacija, povezava z jezikovnimi temami, govorni nastop</td><td>do 20 minut (+ 15 minut priprave)</td><td>30 %</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Izpitna pola 1: 60 točk, preračunanih na 40</h4>
            <p>Naloge v IP 1 so vredne skupaj <strong>60 točk</strong>; ocenjevalec dosežek deli z 1,5. Naloge so razvrščene po taksonomskih stopnjah:</p>
            <ul>
              <li><strong>I. stopnja (12–18 točk)</strong>: prepoznavanje okoliščin, namena, podatkov, nebesednih prvin, poznavanje besedilne vrste, strokovnih izrazov in pravil.</li>
              <li><strong>II. stopnja (30–36 točk)</strong>: razumevanje vsebine, tema in podteme, vloga nebesednih prvin, razčlemba (pomenska, besedno-slovnična, metajezikovna), preoblikovanje povedi, raba pravil.</li>
              <li><strong>III. stopnja (12–18 točk)</strong>: tvorjenje krajšega besedila, vrednotenje učinkovitosti, ustreznosti in pravilnosti izhodiščnega besedila in utemeljevanje mnenja.</li>
            </ul>
            <h4>Izpitna pola 2: 30 točk</h4>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Element interpretacije</th><th>Kaj ocenjujejo</th><th>Točke</th></tr></thead>
                <tbody>
                  <tr><td>Znanje in razumevanje (ZR)</td><td>opredelitev zvrsti/vrste, povzetek besedila</td><td>6</td></tr>
                  <tr><td>Razčlemba in razlaga (RR)</td><td>tema, motivi, osebe, dogajanje, prostor, čas</td><td>6</td></tr>
                  <tr><td>Predstavitev dejstev in stališč (PDS)</td><td>utemeljevanje s primeri iz besedila, iz drugih del ali življenja; zgradba</td><td>6</td></tr>
                  <tr><td>Sinteza in vrednotenje (SV)</td><td>povzetek ugotovitev, presoja problema v besedilu in na splošno (aktualizacija)</td><td>6</td></tr>
                  <tr><td>Jezikovna pravilnost in slogovna ustreznost (JPSU)</td><td>slovnica, pravopis, slog</td><td>6</td></tr>
                </tbody>
              </table>
            </div>
            <div class="pazi"><strong>Pazi na obseg:</strong> z manj kot <strong>400 besedami</strong> dobiš za zgradbo največ 1 točko (od 2); z manj kot <strong>200 besedami</strong> za zgradbo ne dobiš točk, pri jezikovni pravilnosti pa največ 3 od 6.</div>
            <h4>Ustni izpit: 30 točk</h4>
            <ul>
              <li><strong>Glasno branje</strong> odlomka (4 točke): tekoče, razločno, pravorečno ustrezno, z ustreznimi premori in poudarki.</li>
              <li><strong>Vodena interpretacija</strong> (15 točk): avtor in obdobje oziroma smer, zvrst in vrsta, tema in motivi, jezik in slog, uvrstitev v kontekst.</li>
              <li><strong>Aktualizacija ali jezikovna tema</strong> (5 točk): npr. položaj slovenščine, jezikovne zvrsti, razvoj knjižnega jezika.</li>
              <li><strong>Govorno nastopanje in kultura dialoga</strong> (6 točk): knjižni jezik, vikanje, celi odgovori, očesni stik.</li>
            </ul>
            <p>Izpitne listke za ustni izpit pripravijo učitelji na šoli iz besedil, ki jih predlaga državna predmetna komisija (seznam je v razdelku <a href="#kazalo">književnost</a>).</p>""",
    tip(1, "Načrt priprave na izpit", "Do mature imaš osem tednov. Sestavi načrt priprave za slovenščino.",
        "»kako se pripravim«, »koliko časa«, »kaj se ocenjuje«.", ["priprava", "načrt"],
        [("Razdeli čas po delih izpita glede na delež.", "IP 1 (40 %): 3 tedne, IP 2 (30 %): 2 tedna, ustni (30 %): 3 tedne, a ustna besedila beri sproti ves čas."),
         ("Za IP 1 vsak teden reši eno celo polo v 60 minutah in jo preveri z rešitvami.", "Pola iz rubrike <em>Maturitetne pole</em>, nato popravi napake po tipih nalog."),
         ("Za IP 2 napiši vsaj štiri interpretacije (400–600 besed) in jih daj učitelju v pregled.", "Odlomek iz romana, drame, pesmi in kratke proze."),
         ("Za ustni izpit naredi kartice za vsako besedilo s seznama: avtor, obdobje, zvrst, tema, motivi, slog, ena aktualizacija.", "Kartica: Cankar, Hlapci, moderna, drama, Jermanov boj za svobodo misli, aktualno: pritisk oblasti na zaposlene.")]))

IZPIT_POLA1 = sklop(
    "Izpitna pola 1 korak za korakom", "Kako v 60 minutah rešiš razčlembo in tvorbo.",
    """            <p>V IP 1 dobiš <strong>izhodiščno neumetnostno besedilo</strong>: publicistično ali strokovno (npr. intervju, novico, poročilo, oceno, komentar, poljudnoznanstveni članek, predstavitev postopka ali naprave) ali uradni dopis oziroma javno besedilo (npr. vabilo, zahvalo, opravičilo, življenjepis, zapisnik, obvestilo, oglas). Nalogam sledi <strong>tvorba krajšega besedila</strong> dane besedilne vrste.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Čas</th><th>Kaj narediš</th></tr></thead>
                <tbody>
                  <tr><td>0–5 min</td><td>Preletiš vse naloge, nato prvič prebereš besedilo (tema, namen, vrsta).</td></tr>
                  <tr><td>5–10 min</td><td>Drugič prebereš besedilo s svinčnikom: podčrtaš ključne podatke, obkrožiš besede, o katerih sprašujejo naloge.</td></tr>
                  <tr><td>10–40 min</td><td>Rešuješ naloge po vrsti; če se zatakneš, nalogo označiš in greš naprej.</td></tr>
                  <tr><td>40–55 min</td><td>Tvorba besedila: načrt (2 min), pisanje, štetje besed.</td></tr>
                  <tr><td>55–60 min</td><td>Pregled: vejice, velika začetnica, rodilnik zanikanja, s/z, k/h, celi odgovori.</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Vrste nalog v IP 1</h4>
            <ul>
              <li><strong>Zaprtega tipa</strong>: DA/NE, obkroževanje, povezovanje, razvrščanje, dopolnjevanje, popravljanje napak, kratki odgovori.</li>
              <li><strong>Polodprtega tipa</strong>: kratki odgovori s svojimi besedami, pretvorbe povedi, povzetek, vprašanja z več podvprašanji.</li>
              <li><strong>Odprtega tipa</strong>: tvorba krajšega neumetnostnega besedila.</li>
            </ul>
            <div class="pazi"><strong>Navodilo beri dobesedno.</strong> »Izpiši iz besedila« pomeni prepiši točno tako, kot piše; »s svojimi besedami« pomeni preoblikuj; »utemelji« pomeni dodaj razlog s »ker« ali primer iz besedila; »v povedi« pomeni celo poved z veliko začetnico in piko.</div>""",
    tip(1, "Določi sporazumevalne okoliščine izhodiščnega besedila", "Kdo je tvorec besedila, komu je namenjeno, kje je bilo objavljeno in s kakšnim namenom?",
        "»kdo je sporočevalec«, »naslovnik«, »kje je objavljeno«, »namen«.", ["sporočevalec", "naslovnik", "namen"],
        [("Sporočevalca poišči v podpisu, glavi ali viru pod besedilom.", "»Besedilo je napisala novinarka Ana Novak (podpis pod člankom).«"),
         ("Naslovnika sklepaj iz medija, nagovora in izbire besed.", "»Namenjeno je bralcem regionalnega časopisa, ki jih zanima dogajanje v kraju.«"),
         ("Namen poimenuj z glagolom: obvestiti, prepričati, pozvati, predstaviti, zahvaliti se.", "»Namen besedila je bralce obvestiti o odprtju knjižnice in jih povabiti na dogodek.«")]) +
    tip(2, "Ovrednoti učinkovitost izhodiščnega besedila", "Ali je oglas učinkovit? Svoje mnenje utemelji z dvema razlogoma.",
        "»ovrednoti«, »ali je ustrezno«, »utemelji svoje mnenje«.", ["ovrednoti", "utemelji"],
        [("Zapiši jasno oceno (da/ne/delno).", "»Oglas je po mojem mnenju učinkovit.«"),
         ("Dodaj dva razloga iz besedila: jezik, podatki, zgradba, nebesedne prvine.", "»Naslov je kratek in vzbudi pozornost, slika izdelka je velika in v barvah.«"),
         ("Po potrebi omeni pomanjkljivost in kako bi jo popravil.", "»Manjka pa cena, zato bi jo dodal pod sliko.«")]))

IZPIT_POLA2 = sklop(
    "Izpitna pola 2 in ustni izpit", "Kako v 60 minutah napišeš interpretacijo in kako se pripraviš na ustni izpit.",
    """            <p>V IP 2 dobiš <strong>odlomek umetnostnega besedila</strong> (pesem, odlomek iz proze ali drame) in navodila za <strong>vodeno</strong> interpretacijo (vprašanja, na katera odgovoriš v povezanem besedilu) ali <strong>samostojno</strong> interpretacijo. Napišeš eno povezano besedilo, priporočeno vsaj 400 besed.</p>
            <ol>
              <li><strong>Branje (10 min)</strong>: odlomek preberi dvakrat, podčrtaj motive, pesniške podobe, besede o osebah, prostoru in času.</li>
              <li><strong>Načrt (5 min)</strong>: uvod (avtor, delo, zvrst in vrsta, povzetek), jedro (odgovori na naloge po vrsti), sklep (ugotovitve in presoja).</li>
              <li><strong>Pisanje (35 min)</strong>: vsak del odgovora utemelji s citatom iz odlomka (v narekovajih) in s primerom iz drugega dela ali iz življenja.</li>
              <li><strong>Pregled (10 min)</strong>: štetje besed, vejice, velika začetnica pri naslovih del in imenih, odstavki.</li>
            </ol>
            <h4>Ustni izpit</h4>
            <p>Na ustnem izpitu izvlečeš listek z odlomkom literarnega ali polliterarnega besedila in vprašanji. Imaš 15 minut priprave, nato do 20 minut izpita:</p>
            <ul>
              <li><strong>Glasno branje</strong>: med pripravo odlomek preberi polglasno, označi premore (|) in poudarke; pazi na knjižni izgovor (npr. <em>bil</em> [biu̯], <em>lev</em> [leu̯]).</li>
              <li><strong>Interpretacija</strong>: avtor in obdobje, zvrst in vrsta, umestitev odlomka v delo, tema, motivi, osebe, jezik in slog.</li>
              <li><strong>Jezikovna tema ali aktualizacija</strong>: npr. jezik v besedilu (narečje, arhaizmi), položaj slovenščine, pomen dela danes.</li>
              <li><strong>Kultura dialoga</strong>: vikanje komisije, celi odgovori, knjižni jezik, mirna drža in očesni stik.</li>
            </ul>""",
    tip(1, "Pripravi odgovor za ustni izpit v 15 minutah", "Na listku je odlomek iz Cankarjevih <em>Hlapcev</em> (Jermanov pogovor z župnikom). Pripravi se na odgovor.",
        "ustni listek z odlomkom in vprašanji.", ["ustni izpit", "listek"],
        [("Preberi vprašanja na listku in odlomek; označi premore in poudarke za glasno branje.", "Jermanove repilke z odločnim, zadnje povedi s počasnejšim tempom."),
         ("Na listič zapiši ključne besede za vsako vprašanje (ne celih povedi).", "Cankar, moderna; drama v 5 dejanjih; Jerman proti župniku: svoboda misli proti hlapčevstvu; kratke repilke."),
         ("Pripravi en primer aktualizacije in eno povezavo z jezikom.", "Hlapčevstvo danes: prilagajanje mnenja oblasti zaradi službe; jezik: knjižni jezik z nekaj arhaizmi.")]))

RAZCLEMBA_MERILA = sklop(
    "Vrste besedil, pomensko razmerje in razvijanje teme", "Kako določiš vrsto besedila po različnih merilih in kako je tema razvita.",
    """            <p>Katalog zahteva, da izhodiščno besedilo <strong>razvrstiš po različnih merilih</strong>, določiš <strong>prevladujoče pomensko razmerje</strong> in <strong>prevladujoči način razvijanja teme</strong>.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Merilo</th><th>Vrste besedil</th></tr></thead>
                <tbody>
                  <tr><td>število sporočevalcev</td><td>enogovorno (članek, prošnja) in dvogovorno (intervju, pogovor)</td></tr>
                  <tr><td>prenosnik</td><td>govorjeno in zapisano</td></tr>
                  <tr><td>odnos do naslovnika</td><td>zasebno, javno, uradno, neuradno</td></tr>
                  <tr><td>namen</td><td>neobjektivno (prepričevalno, pozivno) in objektivno (obveščevalno)</td></tr>
                  <tr><td>področje</td><td>publicistično, strokovno, uradno, praktičnosporazumevalno</td></tr>
                  <tr><td>način razvijanja teme</td><td>pripovedovalno, opisovalno, razlagalno, utemeljevalno</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Načini razvijanja teme</h4>
            <ul>
              <li><strong>Pripovedovanje</strong>: dogodki v časovnem zaporedju (novica, poročilo, življenjepis); glagoli v pretekliku, prislovi časa (<em>najprej, nato</em>).</li>
              <li><strong>Opisovanje</strong>: lastnosti predmeta, osebe, kraja ali postopka (opis naprave, predstavitev kraja); pridevniki, sedanjik.</li>
              <li><strong>Razlaganje</strong>: kaj je nekaj in zakaj tako (poljudnoznanstveni članek); definicije, vzroki in posledice.</li>
              <li><strong>Utemeljevanje</strong>: trditev in razlogi zanjo (komentar, ocena, oglas); <em>ker, zato, menim</em>.</li>
            </ul>
            <h4>Pomenska razmerja med povedmi</h4>
            <p>Določiš jih po veznikih in členkih med povedmi: <strong>vezalno</strong> (<em>in, tudi, poleg tega</em>), <strong>stopnjevalno</strong> (<em>ne le … ampak tudi</em>), <strong>ločno</strong> (<em>ali</em>), <strong>protivno</strong> (<em>toda, vendar, a</em>), <strong>vzročno</strong> (<em>ker, saj</em>), <strong>posledično</strong> (<em>zato, torej</em>), <strong>pojasnjevalno</strong> (<em>namreč, to je</em>), <strong>časovno</strong> (<em>nato, potem</em>). Prevladujoče razmerje je tisto, ki se v besedilu najpogosteje ponovi.</p>""",
    tip(1, "Določi vrsto besedila po merilih", "Izhodiščno besedilo je intervju s kuharjem v reviji. Določi ga po številu sporočevalcev, namenu in načinu razvijanja teme.",
        "»določi vrsto besedila«, »glede na«, »utemelji«.", ["vrsta besedila", "glede na"],
        [("Za vsako merilo izberi vrsto iz razpredelnice.", "Dvogovorno, neobjektivno (predstavlja osebo in mnenja), pripovedovalno-opisovalno."),
         ("Vsako trditev utemelji z dokazom iz besedila.", "Dvogovorno, ker se izmenjujeta novinarka in sogovornik (vprašanja in odgovori).")]) +
    tip(2, "Določi pomensko razmerje in način razvijanja teme", "Med povedma »Muzej bo zaprt do junija. Prenavljajo namreč razstavne prostore.« določi pomensko razmerje.",
        "»pomensko razmerje«, »kako je razvita tema«.", ["pomensko razmerje", "razvijanje teme"],
        [("Poišči povezovalno besedo med povedma.", "»namreč«"),
         ("Iz povezovalne besede določi razmerje.", "Pojasnjevalno (oziroma vzročno): druga poved pojasni razlog za prvo.")]))

JAVNA = sklop(
    "Javna besedila, življenjepis in zapisnik", "Obvestilo, vabilo, oglas in propaganda; življenjepis, zapisnik, zahvala in opravičilo.",
    """            <p><strong>Javna besedila</strong> so namenjena neznanim, številnim naslovnikom. <strong>Obveščevalna</strong> (obvestilo, javno vabilo) posredujejo podatke, <strong>pozivna</strong> (oglas, propagandno besedilo) naslovnika pozivajo k dejanju.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Besedilna vrsta</th><th>Bistveni podatki</th><th>Jezik</th></tr></thead>
                <tbody>
                  <tr><td>obvestilo</td><td>kdo obvešča, kaj, kdaj, kje, za koga, kaj naj naslovnik stori</td><td>kratke povedi, brezosebne oblike, podatki v točkah</td></tr>
                  <tr><td>javno vabilo</td><td>kdo vabi, na kaj, kdaj, kje, program, vstopnina, prijava</td><td>vljudni izrazi, nagovor bralca</td></tr>
                  <tr><td>oglas (ekonomska propaganda)</td><td>izdelek ali storitev, prednosti, cena, kje dobiti</td><td>slogan, velelnik, presežniki, zvočne figure, slika</td></tr>
                  <tr><td>politična propaganda</td><td>stranka ali kandidat, obljuba, poziv k volitvam</td><td>čustveno nabite besede, »mi« in »vi«, poziv</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Uradna besedila iz kataloga</h4>
            <ul>
              <li><strong>Zahvala</strong>: komu in za kaj se zahvaljujemo, kakšen je bil učinek pomoči; vljudni zaključek.</li>
              <li><strong>Opravičilo</strong>: kaj se je zgodilo, razlog, obžalovanje, ponudba za popravo.</li>
              <li><strong>Prijava</strong> (na delovno mesto, tečaj, tekmovanje): na kaj se prijavljam, podatki o sebi, zakaj sem primeren, priloge.</li>
              <li><strong>Življenjepis</strong>: osebni podatki, izobrazba, delovne izkušnje, znanja (jeziki, računalnik, vozniško dovoljenje), interesi; pri tabelaričnem (Europass) obratni časovni red.</li>
              <li><strong>Zapisnik</strong>: naslov (Zapisnik … seje), kraj, datum, čas, navzoči in odsotni, dnevni red, potek in <strong>sklepi</strong> po točkah, zapisnikar, predsedujoči, podpisa.</li>
            </ul>
            <h4>Nebesedni spremljevalci pisanja</h4>
            <p>Naslov in podnaslovi, odstavki, krepki tisk, alineje, preglednice, slike, logotip, barve. Na izpitu jih moraš prepoznati, določiti njihovo <strong>vlogo</strong> (pritegnejo pozornost, pregledno uredijo podatke, ponazorijo) in jih <strong>ovrednotiti</strong>.</p>""",
    tip(1, "Napiši obvestilo ali javno vabilo", "Dijaška skupnost organizira krvodajalsko akcijo. Napiši obvestilo za oglasno desko (60–80 besed).",
        "»obvestilo«, »vabilo«, »za oglasno desko«.", ["obvestilo", "vabilo"],
        [("Naslovje: kdo obvešča in naslov.", "Dijaška skupnost Srednje šole Celje. OBVESTILO: KRVODAJALSKA AKCIJA"),
         ("Jedro: kaj, kdaj, kje, kdo lahko sodeluje, kaj prinesti.", "V sredo, 12. 3. 2026, od 8.00 do 12.00 bo v šolski telovadnici krvodajalska akcija. Sodelujejo lahko polnoletni dijaki, ki se prijavijo do 5. 3. pri razredniku. Prinesite osebni dokument."),
         ("Zaključek: poziv in podpis, kraj in datum.", "Pridružite se in rešite življenje! Celje, 20. 2. 2026, predsednik dijaške skupnosti Jan Kos")]) +
    tip(2, "Določi vlogo nebesednih prvin", "Kakšno vlogo imata v oglasu velika fotografija izdelka in krepko natisnjena cena?",
        "»nebesedni spremljevalci«, »vloga slike«, »oblikovanje«.", ["nebesedni", "vloga"],
        [("Poimenuj prvino.", "Fotografija, krepki tisk."),
         ("Zapiši vlogo in učinek na naslovnika.", "Fotografija pritegne pozornost in pokaže izdelek, krepka cena poudari ugodnost in bralca prepriča k nakupu.")]))

TVORBA_POSTOPEK = sklop(
    "Kako napišeš krajše neumetnostno besedilo", "Faze sporočanja, merila besedilnosti in ocenjevanje tvorbe v IP 1.",
    """            <p>Zadnja naloga IP 1 je <strong>tvorba krajšega besedila</strong> dane besedilne vrste: publicističnega (poročilo, novica, predstavitev osebe, intervju, komentar), strokovnega (predstavitev predmeta, postopka, navodilo), uradnega dopisa (zahvala, opravičilo, vabilo, prošnja, prijava, pritožba) ali javnega besedila (obvestilo, vabilo). Navodilo navadno določi <strong>naslovnika, okoliščine, vsebinske točke in obseg</strong>.</p>
            <h4>Faze sporočanja</h4>
            <ol>
              <li><strong>Načrtovanje</strong>: kdo piše, komu, zakaj, katera besedilna vrsta; obkroži vse vsebinske zahteve v navodilu.</li>
              <li><strong>Zbiranje in urejanje podatkov</strong>: kratek načrt v ključnih besedah, razporejen v uvod, jedro, zaključek.</li>
              <li><strong>Ubesedovanje</strong>: pišeš v knjižnem zbornem jeziku, ustrezno vrsti (vikanje, nagovor, strokovni izrazi).</li>
              <li><strong>Pregled in popravljanje</strong>: vsebinske točke, obseg, pravopis.</li>
            </ol>
            <h4>Merila besedilnosti</h4>
            <ul>
              <li><strong>Smiselnost</strong>: vse povedi se nanašajo na temo, ni protislovij.</li>
              <li><strong>Sovisnost</strong>: povedi so povezane z vezniki, navezniki (<em>ta, to, tam</em>) in ponavljanjem ključnih besed brez nepotrebnih ponovitev.</li>
              <li><strong>Zaokroženost</strong>: besedilo ima naslovje, uvod, jedro in zaključek, nič bistvenega ne manjka.</li>
            </ul>
            <h4>Kako se tvorba ocenjuje</h4>
            <p>Ocenjevalci gledajo <strong>upoštevanje navodila in besedilne vrste</strong> (vse zahtevane točke), <strong>zgradbo</strong> (notranja in zunanja členjenost, naslovje, odstavki), <strong>jezikovno pravilnost</strong> (pravopis, slovnica) in <strong>slogovno ustreznost</strong> (zvrst, vikanje, ni pogovornih besed). Vsaka manjkajoča vsebinska točka stane točke, zato jih pred oddajo odkljukaj.</p>
            <div class="pazi"><strong>Pogost spodrsljaj:</strong> naloga zahteva <em>opravičilo</em>, kandidat pa napiše <em>prošnjo</em> (ali obratno). Prvi stavek jedra mora jasno izraziti namen: »Opravičujem se, ker …«, »Prosim vas, da …«, »Zahvaljujem se vam za …«.</div>""",
    tip(1, "Napiši uradni dopis (zahvala, opravičilo, prijava)", "Na praktičnem usposabljanju v podjetju Mehanika, d. o. o., ti je mentor veliko pomagal. Napiši zahvalo (80–100 besed), v kateri navedeš, kaj si se naučil in kako ti bo to koristilo.",
        "»napiši zahvalo / opravičilo / prijavo«, »uradni dopis«, obseg v besedah.", ["zahvala", "opravičilo", "prijava"],
        [("Naslovje: sporočevalec, kraj in datum, naslovnik, zadeva.", "Tina Zupan, Cesta 4, 4000 Kranj; Kranj, 15. 5. 2026; Mehanika, d. o. o., g. Marko Bizjak, Industrijska 10, 4000 Kranj; Zadeva: Zahvala za mentorstvo"),
         ("Nagovor in jedro: za kaj se zahvaljuješ, kaj si se naučil (vsaj dve stvari), kako ti bo koristilo.", "Spoštovani gospod Bizjak, iskreno se vam zahvaljujem za mentorstvo med praktičnim usposabljanjem. Naučila sem se varno uporabljati stružnico in brati tehnične risbe. To znanje mi bo koristilo pri zaključnem izdelku in pri iskanju zaposlitve."),
         ("Zaključek, pozdrav in podpis; preštej besede.", "Še enkrat hvala za potrpežljivost in zaupanje. Lep pozdrav, Tina Zupan")]) +
    tip(2, "Napiši poročilo ali novico", "Za šolsko spletno stran napiši poročilo (100–120 besed) o športnem dnevu.",
        "»poročilo«, »novica«, »za spletno stran / časopis«.", ["poročilo", "novica"],
        [("Naslov in odgovori na vprašanja kdo, kaj, kdaj, kje (v prvem odstavku).", "Pohod na Šmarno goro. V petek, 23. 9. 2026, so se dijaki Srednje šole Domžale odpravili na športni dan na Šmarno goro."),
         ("Jedro: potek po časovnem zaporedju, zanimivi podatki, izjava.", "Pot so začeli ob 8.00 v Tacnu … Profesor športne vzgoje je povedal: »Na vrh je prišlo vseh 320 dijakov.«"),
         ("Zaključek in podpis; pretekli čas, 3. oseba, brez osebnih mnenj.", "Dijaki so se domov vrnili utrujeni, a zadovoljni. Zapisala: Eva Kos, 3. a")]) +
    tip(3, "Napiši navodilo ali predstavitev postopka", "Napiši navodilo (80–100 besed), kako zamenjamo pnevmatiko na kolesu.",
        "»navodilo«, »predstavi postopek«, »opiši, kako«.", ["navodilo", "postopek"],
        [("Naslov in seznam pripomočkov.", "Zamenjava zračnice na kolesu. Potrebujete: nove zračnice, dve plastični žlici za pnevmatike, tlačilko."),
         ("Koraki v časovnem zaporedju, oštevilčeni, z velelnikom ali 1. osebo množine.", "1. Snemite kolo z okvirja. 2. Z žlico privzdignite rob pnevmatike … 5. Napolnite zračnico do predpisanega tlaka."),
         ("Opozorilo in strokovni izrazi brez pogovornih besed.", "Pozor: pred vožnjo preverite, ali je zavora pravilno pritrjena (ne: »šlauf«, ampak <em>zračnica</em>).")]))

TVORBA_PRIMERI = sklop(
    "Vzorčna besedila in kontrolni seznam", "Kratki zgledi besedilnih vrst, ki se najpogosteje pojavljajo v IP 1.",
    """            <h4>Prošnja (uradni dopis)</h4>
            <div class="info-card"><p>Luka Horvat<br>Prešernova 8<br>9000 Murska Sobota</p>
            <p>Murska Sobota, 3. 4. 2026</p>
            <p>Srednja poklicna in tehniška šola Murska Sobota<br>ga. ravnateljica<br>Šolsko naselje 12<br>9000 Murska Sobota</p>
            <p><strong>Zadeva: Prošnja za opravičeno odsotnost</strong></p>
            <p>Spoštovana gospa ravnateljica,</p>
            <p>prosim vas za opravičeno odsotnost od pouka od 14. do 16. aprila 2026. V tem času bom kot član državne reprezentance sodeloval na evropskem prvenstvu v kickboksu na Dunaju. Snov bom nadoknadil po dogovoru z učitelji. Prilagam vabilo Kickboks zveze Slovenije.</p>
            <p>Za razumevanje se vam vnaprej zahvaljujem.</p>
            <p>Lep pozdrav,<br>Luka Horvat</p>
            <p>Priloga: vabilo Kickboks zveze Slovenije</p></div>
            <h4>Predstavitev osebe (publicistično besedilo)</h4>
            <div class="info-card"><p><strong>Mlada kuharica z zvezdo v očeh</strong></p><p>Nina Kralj (19) iz Kopra je letos na državnem tekmovanju dijakov gostinstva osvojila prvo mesto. Kuhati se je naučila pri babici, nato se je vpisala na srednjo gostinsko šolo. »Najraje pripravljam ribe, ker so lahko vsakič drugačne,« pravi. Po maturi bo nadaljevala študij na višji šoli in se zaposlila v hotelu v Piranu. V prostem času igra odbojko in piše blog z recepti.</p></div>
            <h4>Kontrolni seznam za vsako tvorbo</h4>
            <ul>
              <li>Ustrezna besedilna vrsta in vse vsebinske točke iz navodila.</li>
              <li>Naslovje (pri dopisu) ali naslov (pri publicističnem besedilu).</li>
              <li>Odstavki: uvod, jedro, zaključek.</li>
              <li>Knjižni zborni jezik, vikanje uradnih naslovnikov, ni pogovornih in slengovskih besed.</li>
              <li>Obseg v predpisanih mejah.</li>
              <li>Pravopis: vejica pred <em>ki, ker, da, ko, če</em>; velika začetnica v imenih ustanov in krajev; pika za vrstilnim števnikom (<em>3. 4. 2026</em>).</li>
            </ul>""")

JEZIK_DRUZBA = sklop(
    "Slovenščina v državi, zamejstvu, Evropi in jezikovne družine", "Položaj slovenščine, narodnostno mešana območja, jezikovne družine v Evropi.",
    """            <p>Slovenščina je <strong>uradni jezik Republike Slovenije</strong> (Ustava, 11. člen) in eden od <strong>uradnih jezikov Evropske unije</strong> (od leta 2004). Za vsakega govorca je <strong>materni (prvi) jezik</strong> temelj osebne in narodne identitete, v njem najbolj natančno izraža misli in čustva.</p>
            <ul>
              <li><strong>Narodnostno mešana območja</strong>: na območju občin, kjer živita italijanska in madžarska narodna skupnost (slovenska Istra, Prekmurje), sta uradna jezika tudi <strong>italijanščina</strong> in <strong>madžarščina</strong>: dvojezični napisi, dvojezične šole, pravica do rabe jezika v uradih.</li>
              <li><strong>Zamejstvo</strong>: Slovenci v Italiji (Trst, Gorica, Benečija, Rezija, Kanalska dolina), Avstriji (Koroška, Štajerska), na Madžarskem (Porabje) in na Hrvaškem; slovenščina je jezik manjšine, ohranjajo jo šole, društva, mediji.</li>
              <li><strong>Izseljenstvo</strong>: Slovenci v Argentini, ZDA, Kanadi, Avstraliji, Nemčiji …; jezik ohranjajo dopolnilni pouk, društva in mediji.</li>
              <li><strong>Evropska unija</strong>: dokumenti EU so prevedeni v slovenščino, slovenski poslanci govorijo slovensko, državljani se lahko na ustanove EU obrnejo v slovenščini.</li>
            </ul>
            <h4>Jezikovne družine v Evropi</h4>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Družina (veja)</th><th>Predstavniki</th></tr></thead>
                <tbody>
                  <tr><td>indoevropska: <strong>slovanska</strong> (južna, zahodna, vzhodna)</td><td>južni: <strong>slovenščina</strong>, hrvaščina, srbščina, makedonščina, bolgarščina; zahodni: češčina, slovaščina, poljščina; vzhodni: ruščina, ukrajinščina, beloruščina</td></tr>
                  <tr><td>indoevropska: germanska</td><td>nemščina, angleščina, nizozemščina, švedščina, norveščina, danščina</td></tr>
                  <tr><td>indoevropska: romanska</td><td>italijanščina, francoščina, španščina, portugalščina, romunščina</td></tr>
                  <tr><td>indoevropska: drugi</td><td>grščina, albanščina, baltski (litovščina, latvijščina), keltski (irščina)</td></tr>
                  <tr><td>ugrofinska (uralska)</td><td>madžarščina, finščina, estonščina</td></tr>
                  <tr><td>drugi</td><td>turščina (altajska), baskovščina (osamljen jezik), malteščina (semitska)</td></tr>
                </tbody>
              </table>
            </div>
            <p>Slovenščina je torej <strong>indoevropski, slovanski, južnoslovanski</strong> jezik.</p>""",
    tip(1, "Utemelji pomen in položaj slovenščine", "Pojasni, kakšen je položaj slovenščine v Evropski uniji in na narodnostno mešanem območju slovenske Istre.",
        "»položaj slovenščine«, »zamejstvo«, »EU«, »narodnostno mešano območje«.", ["položaj slovenščine", "EU", "zamejstvo"],
        [("Navedi pravno podlago in status.", "Slovenščina je uradni jezik RS in eden od 24 uradnih jezikov EU."),
         ("Navedi konkretne posledice statusa.", "V EU so dokumenti prevedeni v slovenščino; v slovenski Istri je uradni jezik tudi italijanščina, zato so napisi dvojezični in obstajajo šole z italijanskim učnim jezikom."),
         ("Zaključi z vrednotenjem.", "Status uradnega jezika omogoča, da slovenščino uporabljamo na vseh področjih javnega življenja.")]) +
    tip(2, "Uvrsti jezik v jezikovno družino", "V katero jezikovno družino in skupino spadajo slovenščina, madžarščina in italijanščina?",
        "»jezikovna družina«, »uvrsti«, »sorodni jeziki«.", ["jezikovna družina", "slovanski"],
        [("Za vsak jezik določi družino.", "Slovenščina in italijanščina: indoevropska; madžarščina: ugrofinska."),
         ("Določi vejo in podskupino.", "Slovenščina: slovanska, južnoslovanska; italijanščina: romanska.")]))

INTERPRETACIJA = sklop(
    "Interpretacija na izpitni poli 2", "Zgradba interpretacije, elementi ocenjevanja in vzorčna interpretacija.",
    """            <p>Interpretacija je <strong>povezano besedilo</strong> (ne odgovori po točkah), v katerem pokažeš, da besedilo <strong>doživiš, razumeš in ovrednotiš</strong>. Pri vodeni interpretaciji odgovoriš na vsa vprašanja iz navodila, pri samostojni pa sam izbereš prvine, ki so za odlomek najpomembnejše.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Del</th><th>Kaj napišeš</th><th>Element ocenjevanja</th></tr></thead>
                <tbody>
                  <tr><td>Uvod (1 odstavek)</td><td>avtor, naslov dela, zvrst in vrsta, kratek povzetek odlomka in umestitev v delo</td><td>ZR</td></tr>
                  <tr><td>Jedro (3–4 odstavki)</td><td>tema in motivi, osebe in odnosi, dogajanje, prostor in čas, pripovedovalec ali lirski subjekt, jezik in slog; vsaka trditev s citatom</td><td>RR, PDS</td></tr>
                  <tr><td>Povezava</td><td>primerjava z drugim delom ali primer iz življenja</td><td>PDS</td></tr>
                  <tr><td>Sklep (1 odstavek)</td><td>povzetek ugotovitev, presoja problema v besedilu in danes (aktualizacija), osebno mnenje</td><td>SV</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Kako navajaš iz besedila</h4>
            <p>Krajši navedek vključiš v poved in ga postaviš v narekovaje: <em>Lirski subjekt domovino primerja z »vrtom, kjer cvete trpljenje«, kar kaže …</em> Navedka ne pustiš samega, vedno ga pojasniš (kaj pomeni, kaj pokaže).</p>
            <h4>Vzorčni odstavek interpretacije</h4>
            <div class="info-card"><p>Odlomek iz Jurčičevega <em>Desetega brata</em> je del prvega slovenskega romana, ki združuje romantične in realistične prvine. Pripovedovalec Martinka predstavi kot skrivnostnega popotnika: »Bil je čudna prikazen, ki je ni bilo mogoče pozabiti.« Opis zunanjosti in govora takoj vzbudi bralčevo radovednost, zato je Martinek tipična romantična oseba, odtujena od družbe. Nasprotno pa je kmečko okolje opisano realistično, z natančnimi podrobnostmi vsakdanjega dela. Podobno odtujenega junaka poznamo iz Puškinovega <em>Jevgenija Onjegina</em>, danes pa podobno usodo doživljajo ljudje, ki jih družba odrine na rob zaradi izvora.</p></div>
            <div class="pazi"><strong>Najpogostejše napake:</strong> obnavljanje celotne zgodbe namesto razčlembe odlomka, trditve brez citatov, manjkajoča aktualizacija, premajhen obseg (pod 400 besed), pogovorni izrazi (<em>fajn, glih, zakon</em>).</div>""",
    tip(1, "Napiši vodeno interpretacijo odlomka", "Interpretirajte odlomek iz Prežihovih <em>Samorastnikov</em> (Meta pred Hudabivškimi). V interpretaciji odgovorite: kdo sta osebi, kako se kaže družbena razslojenost, kakšen je pomen naslova, kako bi Meta ravnala danes.",
        "»interpretirajte«, vprašanja za vodeno interpretacijo, »vsaj 400 besed«.", ["interpretirajte", "vodena interpretacija"],
        [("Uvod: avtor, delo, socialni realizem, novela, umestitev odlomka.", "»Samorastniki so socialnorealistična novela Prežihovega Voranca iz zbirke Samorastniki (1940). Odlomek opisuje Metin obisk pri Hudabivških …«"),
         ("Jedro: na vsako vprašanje odgovori v svojem odstavku s citatom.", "»Bogati Hudabivški jo zavrnejo z besedami …, kar pokaže prepad med kmečkimi gospodarji in deklami.«"),
         ("Povezava: drugo delo ali življenje.", "»Podobno usodo ima Francka v Cankarjevem romanu Na klancu.«"),
         ("Sklep: pomen naslova in aktualizacija; preštej besede.", "»Samorastniki so otroci, ki rastejo brez pomoči, a so trdni. Tudi danes so ljudje, ki uspejo kljub revščini …«")]))

# Predlagana besedila za ustni izpit (P-SLM-2025, 4.2) s pojmi za interpretacijo
def seznam(naslov, vrstice):
    tr = "".join(f"\n                  <tr><td>{d}</td><td>{p}</td></tr>" for d, p in vrstice)
    return sklop(f"Na ustnem izpitu: {naslov}", "Predlagana besedila iz izpitnega kataloga in pojmi, ki jih moraš znati razložiti ob odlomku.",
                 f"""            <p>Izpitne listke sestavijo učitelji iz besedil, ki jih predlaga državna predmetna komisija. Pri »ali« izbere učitelj eno od besedil. Ob odlomku glasno bereš, nato besedilo interpretiraš s spodnjimi pojmi.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Avtor in besedilo</th><th>Pojmi in prvine za interpretacijo</th></tr></thead>
                <tbody>{tr}
                </tbody>
              </table>
            </div>""")


SEZ_DO_RAZSV = seznam("od Orienta do razsvetljenstva", [
    ("Biblija: <em>Prilika o izgubljenem sinu</em>", "nastanek, sestava ter kulturni in literarni pomen Biblije; prilika kot vrsta pripovedi, njene značilnosti in namen"),
    ("Homer: <em>Odiseja</em> ali <em>Iliada</em>", "epika, junaški ep, mitološka podlaga, epska širina pripovedovanja in opisovanja"),
    ("Sofoklej: <em>Kralj Ojdip</em> ali <em>Antigona</em>", "dramatika, mitološka podlaga, dramska dogajalna zgradba, tragedija, tragičnost in njeni vzroki, antično gledališče"),
    ("<em>Pridiga o grehu in pokori</em> (II. Brižinski spomenik)", "vsebina in pomen Brižinskih spomenikov, pridiga kot polliterarna vrsta"),
    ("<em>Rošlin in Verjanko</em>, <em>Od lepe Vide</em> ali <em>Zeleni Jurij</em>", "epska oziroma lirska ljudska pesem, motivi, jezik in slog"),
    ("<em>Kralj Matjaž</em>, <em>Zlatorog</em> ali <em>Kurent</em>", "ljudska pripoved, motivi, jezik in slog, pomen ljudske tradicije"),
    ("Shakespeare: <em>Romeo in Julija</em> ali <em>Hamlet</em>", "renesančna tragedija in vzroki tragičnosti, dramska dogajalna zgradba, renesančno gledališče"),
    ("Trubar: <em>Proti zidavi cerkva</em>", "protestantske ideje, jezik in slog"),
    ("Svetokriški: <em>Na noviga lejta dan</em>", "pridiga kot polliterarna vrsta, baročni slog"),
    ("Vodnik: <em>Zadovolni Krajnc</em> ali <em>Dramilo</em>", "razsvetljenska in prerodna miselnost, jezik in slog"),
    ("Linhart: <em>Ta veseli dan ali Matiček se ženi</em>", "začetki slovenskega gledališča, komedija, vrste komičnosti, razsvetljenska miselnost"),
])
SEZ_ROM_REAL = seznam("romantika in realizem", [
    ("Goethe: <em>Majska pesem</em>, Lermontov: <em>Jadro</em> ali Heine: <em>Lorelaj</em>", "romantični lirski subjekt, motivi, jezik in slog"),
    ("Puškin: <em>Jevgenij Onjegin</em>", "romantična književna oseba in njen pogled na življenje, roman v verzih"),
    ("Prešeren: <em>Sonetni venec</em> (1., 7., 8. in 15. sonet) ali <em>Krst pri Savici</em>", "sonet, zgradba cikla oziroma pesnitve, teme, motivi, pesniške podobe, epske in lirske prvine, romantične značilnosti"),
    ("Prešeren: <em>Zdravljica</em>", "zgradba in oblikovanost pesmi, nacionalna in politična ideja"),
    ("Flaubert: <em>Gospa Bovary</em>", "realistični roman, motivacija za ravnanje osebe, vloga družbenih okoliščin"),
    ("Dostojevski: <em>Zločin in kazen</em>", "psihološki realistični roman, miselnost in ravnanje glavne osebe"),
    ("Zola: <em>Beznica</em>", "naturalizem, vpliv dednosti, časa in okolja na življenje oseb"),
    ("Ibsen: <em>Nora</em> ali <em>Strahovi</em>", "realistično-naturalistična tezna meščanska drama, analitična dramska tehnika"),
    ("Jenko: <em>Obrazi</em> (uvodni, 5., 7. in 10.)", "obraz kot pesniška vrsta, zgradba cikla, realistične in romantične prvine"),
    ("Gregorčič: <em>Njega ni</em> ali <em>Veseli pastir</em>", "ponarodela lirsko-epska pesem, navezava na ljudsko pesem"),
    ("Jurčič: <em>Deseti brat</em>", "začetki slovenskega romana, pripovedovalec, romantične in realistične prvine"),
    ("Jenko: <em>Tilka</em> ali Jurčič: <em>Telečja pečenka</em>", "začetki slovenske novele, značajevka, humorne prvine"),
    ("Kersnik: <em>Jara gospoda</em> ali <em>V zemljiški knjigi</em>", "realistična povest, okvirna pripoved, slika, odnos pripovedovalca do resničnosti"),
    ("Tavčar: <em>Visoška kronika</em> ali <em>Cvetje v jeseni</em>", "zgodovinski roman ali povest, oseba kot pripovedovalec, okvirna pripoved, vpliv usode in družbe"),
    ("Aškerc: <em>Mejnik</em>", "balada, realistični slog, epske in dramatske prvine"),
])
SEZ_MODERNA = seznam("moderna", [
    ("Wilde: <em>Saloma</em>", "obdelava biblijske snovi, dekadenčne in simbolistične prvine, poetična drama, pesniške podobe"),
    ("Kette: <em>Na trgu</em>", "podoknica, impresionistične prvine in simboli, zvočni učinki"),
    ("Murn: <em>Sneg</em> ali <em>Ko dobrave se mrače</em>", "razpoloženjska, miselna lirika, bivanjska tema, impresionistične in simbolistične prvine"),
    ("Župančič: <em>Duma</em> ali <em>Z vlakom</em>", "domovinska tema in motivi, pesniške podobe, zgradba pesnitve in dvodelnost"),
    ("Cankar: <em>Martin Kačur</em> ali <em>Na klancu</em>", "književna oseba in njen položaj v družbi, simetrična ali ciklična zgradba, vodilni motiv, realistične in simbolistične prvine"),
    ("Cankar: <em>Kostanj posebne sorte</em> ali <em>Gospod stotnik</em>", "črtica, tema in motivi, subjektivno pripovedovanje, simboli"),
    ("Cankar: <em>Hlapci</em> ali <em>Za narodov blagor</em>", "zunanja in dogajalna zgradba drame, miselnost oseb, satiričnost, aktualnost"),
])
SEZ_PRVA = seznam("prva polovica 20. stoletja", [
    ("Kafka: <em>Preobrazba</em>", "motiv preobrazbe, novela, pripovedna groteska, modernistične prvine"),
    ("Kosovel: <em>Slutnja</em>", "pesniške podobe in občutje, impresionistične prvine, nominalni slog"),
    ("Kosovel: <em>Ekstaza smrti</em>", "ekspresionistične značilnosti, vizionarska pesem"),
    ("Kosovel: <em>Kons. 5</em> ali <em>Pesem št. X</em>", "konstruktivistična pesem, motivi, ideja, jezik in slog"),
    ("Pregelj: <em>Matkova Tina</em>", "novela, položaj osebe v zgodovinskem trenutku, ekspresionistične in baročne prvine"),
    ("Grum: <em>Dogodek v mestu Gogi</em>", "simultano gledališče, dramska tehnika, grotesknost"),
    ("Prežihov Voranc: <em>Samorastniki</em> ali <em>Boj na požiralniku</em>", "socialnorealistična novela, družbena razslojenost, mali ljudje, simbolika, jezik in slog"),
    ("Kranjec: <em>Režonja na svojem</em>", "socialnorealistična novela, vpliv zgodovinskega dogajanja na male ljudi, epske in lirske prvine"),
    ("Kajuh: <em>Bosa pojdiva, dekle, obsorej</em>", "prepletanje osebne in vojne teme, motivi in pesniške podobe"),
])
SEZ_DRUGA = seznam("druga polovica 20. stoletja in sodobnost", [
    ("Ionesco: <em>Plešasta pevka</em>, Beckett: <em>Čakajoč Godota</em> ali Sartre: <em>Zaprta vrata</em>", "dramatika absurda, eksistencialistične ideje, grotesknost"),
    ("Menart: <em>Croquis</em> ali <em>Nežnost v mraku</em>", "intimistična pesem, tema, motivi, jezik in slog"),
    ("Pavček: <em>Pesem o zvezdah</em>, Krakar: <em>Med iskalci biserov</em> ali Zlobec: <em>Sveta mesta tvojega telesa</em>", "intimistična pesem, pogled na življenje, vrednote ali ljubezen, pesniške podobe"),
    ("Kovič: <em>Južni otok</em>", "pesem kot prispodoba, metafore, zgradba"),
    ("Zajc: <em>Črni deček</em> ali <em>Veliki črni bik</em>", "simboli in njihov pomen, svobodni verz in ritem"),
    ("Strniša: <em>Večerna pravljica</em>", "pravljičnost in resničnost, grotesknost, glasovno ujemanje"),
    ("Makarovič: <em>Odštevanka</em>", "navezava na ljudsko pesništvo"),
    ("Šalamun: <em>Gobice</em> ali <em>Himna svetovne odgovornosti</em>", "modernistične prvine, besedne igre in ludizem"),
    ("Šteger: <em>10 prošenj za lahko noč</em>", "tema, motivi, jezik in slog"),
    ("Kosmač: <em>Tantadruj</em>", "novela, pripovedovalčev odnos do oseb, eksistencialistične, simbolistične in fantastične prvine"),
    ("Zupan: <em>Menuet za kitaro</em>", "vojni in avtobiografski roman, eksistencialistični položaj, modernistične prvine"),
    ("Tomšič: <em>Vruja</em>; Blatnik: <em>Električna kitara</em>", "novela in kratka proza, tema, motivi, jezik in slog"),
    ("Skubic: <em>Fužinski bluz</em> ali Lainšček: <em>Namesto koga roža cveti</em>", "sodobni roman, družbena problematika, pripovedovalci, jezik in slog"),
    ("Glavan: <em>Anton</em>", "kratka proza, pripovedovalca in njun bivanjski položaj"),
    ("Smole: <em>Antigona</em>", "navezava na Sofokleja, aktualizacija, poetična drama z eksistencialističnimi prvinami"),
    ("Jančar: <em>Veliki briljantni valček</em>", "moderna groteskna drama, prvine absurda, tragičnost in ironija"),
    ("M. Zupančič: <em>Vladimir</em>", "sodobna drama, bivanjski položaj dramskih oseb, jezik in slog"),
])

# ------------------------------------------------------------------ poglavja

L = "@"
rm.POGLAVJA = {
    "izpit_pm_slovenscina": dict(
        uvod="Izpit iz slovenščine je obvezni prvi predmet poklicne mature. Tu je pregled vseh treh delov izpita, točkovanja in tega, kako se lotiš vsakega dela.",
        sklopi=[(L, IZPIT_ZGRADBA), (L, IZPIT_POLA1), (L, IZPIT_POLA2), ("jezik_sporazumevanje", 5)],
        cilji=["v izpitni poli 1 usmerjeno razčleni izhodiščno neumetnostno besedilo in tvori krajše neumetnostno besedilo",
               "v izpitni poli 2 napiše vodeno ali samostojno interpretacijo (odlomka) umetnostnega besedila",
               "na ustnem izpitu glasno bere, interpretira literarno ali polliterarno besedilo in ga poveže z jezikovnimi temami",
               "uresničuje načela govornega nastopanja in kulturnega uradnega pogovarjanja"],
        izpit="Pisni del traja 120 minut (dve poli po 60 minut, 70 % ocene), ustni izpit do 20 minut s 15 minutami priprave (30 % ocene).",
        napake=["V IP 1 preskočiš tvorbo, ker ti zmanjka časa; zanjo si rezerviraj zadnjih 15–20 minut.",
                "V IP 2 napišeš manj kot 400 besed in izgubiš točke za zgradbo.",
                "Na ustnem izpitu govoriš v pogovornem jeziku ali tikaš komisijo.",
                "Navodila ne prebereš dobesedno (»izpiši« in »s svojimi besedami« nista isto)."]),
    "razclemba_besedila": dict(
        uvod="Razčlemba izhodiščnega neumetnostnega besedila je jedro izpitne pole 1. Določiš okoliščine nastanka, temo in podteme, namen tvorca, vrsto besedila, pomensko razmerje in način razvijanja teme.",
        sklopi=[("besedilo", 1), (L, RAZCLEMBA_MERILA), ("jezik_sporazumevanje", 3), ("jezik_sporazumevanje", 4), ("besedilo", 5)],
        cilji=["določi okoliščine nastanka besedila, temo in podteme ter prepozna bistvene podatke",
               "določi namen tvorca besedila",
               "določi vrsto besedila po različnih merilih in besedilno vrsto ter prepozna njene značilnosti",
               "določi prevladujoče pomensko razmerje in prevladujoči način razvijanja teme",
               "vrednoti učinkovitost, ustreznost, razumljivost in jezikovno pravilnost besedila ter utemelji mnenje"],
        izpit="Prve naloge izpitne pole 1 sprašujejo po okoliščinah, temi, namenu in vrsti besedila; zadnje po vrednotenju. Vsako trditev utemelji s podatkom iz besedila.",
        napake=["Temo zapišeš kot naslov ali celo poved z mnenjem; tema je kratka samostalniška zveza (npr. <em>odprtje nove knjižnice</em>).",
                "Namen zapišeš z vsebino (»govori o …«) namesto z glagolom (obvestiti, prepričati, pozvati).",
                "Zamenjaš sporočevalca (avtor besedila) in sogovornika v intervjuju.",
                "Vrednotiš brez utemeljitve (»besedilo je dobro«)."]),
    "publicisticna_strokovna": dict(
        uvod="Izhodiščno besedilo izpitne pole 1 je pogosto publicistično (novica, poročilo, intervju, predstavitev osebe, ocena, komentar) ali strokovno (poljudnoznanstveni članek, predstavitev postopka, opis naprave). Spoznaj značilnosti vsake vrste.",
        sklopi=[("besedilo", 3), ("besedilo", 4), ("jezikovne_zvrsti", 4)],
        cilji=["prepozna publicistično ali strokovno besedilno vrsto in njene značilnosti",
               "loči dejstva od mnenj in prepozna namen besedila",
               "prepozna jezikovno zvrst in presodi njeno ustreznost",
               "tvori publicistično (poročilo, novico, predstavitev osebe, intervju, komentar) ali strokovno besedilo (predstavitev predmeta, postopka, navodilo)"],
        izpit="Pogosta vprašanja: katera besedilna vrsta je to in zakaj, kaj je dejstvo in kaj mnenje, katere strokovne izraze vsebuje besedilo in kako bi jih razložil laiku.",
        napake=["Novico zamenjaš s poročilom: novica je kratka in odgovori na kdo, kaj, kdaj, kje; poročilo opiše potek po zaporedju.",
                "V komentarju ne zavzameš jasnega stališča.",
                "Pri opisu postopka pomešaš vrstni red korakov.",
                "Strokovne izraze zamenjaš s pogovornimi (<em>štekati</em> namesto <em>razumeti</em>)."]),
    "uradna_javna_besedila": dict(
        uvod="Uradni dopisi (prošnja, zahvala, opravičilo, vabilo, prijava, pritožba) in javna besedila (obvestilo, vabilo, oglas, propaganda) so pogosto izhodiščno besedilo in skoraj vedno tudi naloga za tvorbo.",
        sklopi=[("besedilo", 2), (L, JAVNA)],
        cilji=["prepozna uradni dopis ali javno pozivno oziroma obveščevalno besedilo in njegove dele",
               "v besedilu opazuje nebesedne spremljevalce, prepozna njihovo vlogo ter vrednoti ustreznost in učinkovitost",
               "tvori uradni dopis (zahvalo, opravičilo, vabilo, prošnjo, prijavo, pritožbo) ali javno besedilo (obvestilo, vabilo)"],
        izpit="Naloge preverjajo dele uradnega dopisa (naslovje, zadeva, nagovor), jezik (vikanje, ustaljeni izrazi) in vlogo nebesednih prvin. Tvorba je pogosto prošnja, opravičilo ali vabilo z 80–120 besedami.",
        napake=["Za nagovorom z vejico nadaljuješ z veliko začetnico (prav: <em>Spoštovani, <br>obračam se …</em>).",
                "Manjka zadeva ali podpis.",
                "Pišeš v tikanju ali s pogovornimi besedami.",
                "Pri oglasu ne ločiš besednih in nebesednih prvin."]),
    "tvorba_besedila": dict(
        uvod="Zadnja naloga izpitne pole 1 je tvorba krajšega neumetnostnega besedila dane besedilne vrste. Tu so faze sporočanja, merila besedilnosti, postopki za najpogostejše vrste in vzorčna besedila.",
        sklopi=[(L, TVORBA_POSTOPEK), (L, TVORBA_PRIMERI)],
        cilji=["izkaže poznavanje značilnosti besedilne vrste ter jezikovno in slogovno zmožnost",
               "upošteva faze sporočanja, merila besedilnosti ter notranjo in zunanjo členjenost besedila",
               "opremi besedilo z naslovjem in ustreznimi nebesednimi dopolnili",
               "tvori razumljivo, učinkovito, slogovno in zgradbeno ustrezno ter jezikovno pravilno besedilo"],
        izpit="Tvorba je vredna največ točk v izpitni poli 1 (III. taksonomska stopnja). Navodilo določi vrsto, naslovnika, vsebinske točke in obseg.",
        napake=["Napišeš drugo besedilno vrsto, kot jo zahteva navodilo.",
                "Izpustiš eno od vsebinskih točk iz navodila.",
                "Besedilo ni členjeno na odstavke.",
                "Prekoračiš ali ne dosežeš predpisanega obsega."]),
    "besedje_pm": dict(
        uvod="Poimenovalna zmožnost: knjižne besede namesto pogovornih, sopomenke in protipomenke, nadpomenke in podpomenke, besedne družine, tvorjenke, prevzete besede, frazemi, blizuzvočnice in podatki iz slovarjev.",
        sklopi=[("besedje", 1), ("besedje", 2), ("besedje", 3), ("besedje", 4), ("besedje", 5)],
        cilji=["poimenuje prvine stvarnosti s knjižnimi besedami in v besedilu ne ponavlja besed",
               "besedam poišče sopomenko, protipomenko, nadpomenko ali podpomenko ter besede iz iste besedne družine",
               "predstavi pomen blizuzvočnic in jih uporabi v povedih",
               "zamenja opisno besedno zvezo s tvorjenko in obratno, prevzete besede z domačimi ustreznicami",
               "zamenja proste besedne zveze s frazemi in obratno ter iz slovarskega sestavka razbere podatke"],
        izpit="Kratke naloge ob izhodiščnem besedilu: »Poiščite sopomenko besede …«, »Zamenjajte prevzeto besedo z domačo«, »Razložite frazem«, »Kaj pomeni oznaka <em>pog.</em> v SSKJ?«.",
        napake=["Sopomenka ni v isti besedni vrsti ali obliki kot izhodiščna beseda.",
                "Zamenjaš nadpomenko in podpomenko.",
                "Frazem razložiš dobesedno.",
                "Zamenjaš blizuzvočnici (<em>izvor / izvir</em>, <em>predpostavka / predpostavljeni</em>)."]),
    "skladnja_pm": dict(
        uvod="Skladenjska zmožnost: besedne vrste kot gradivo povedi, stavčni členi, priredno in podredno zložene povedi, odvisniki, pretvorbe (tvorno in trpno, premi in odvisni govor) in povezanost povedi z navezniki.",
        sklopi=[("oblikoslovje", 1), ("skladnja", 1), ("skladnja", 2), ("skladnja", 3), ("skladnja", 4), ("skladnja", 5)],
        cilji=["določi stavčne člene in stavčno sestavo povedi (osnovni in dopolnjevalni stavek, vrsta priredja, vrsta odvisnika)",
               "pretvarja povedi v skladenjsko preprostejše ali zahtevnejše in sprašuje po delih povedi",
               "izrazi isto dejanje v tvornem in trpnem stavku ter premi govor pretvori v odvisnega",
               "v zvezi povedi določi naveznik in nanašalnico ter odpravi neustrezno ponavljanje",
               "prepozna skladenjske napake, jih odpravi in utemelji popravke"],
        izpit="Tipične naloge: »Pretvorite poved v trpno obliko«, »Združite povedi v podredno zloženo poved z vzročnim odvisnikom«, »Določite vrsto odvisnika«, »Poiščite nanašalnico zaimka <em>ta</em>«.",
        napake=["Pozabiš vejico pred odvisnikom ali pri vrinjenem stavku.",
                "Pri pretvorbi v odvisni govor ne spremeniš osebe in časa.",
                "Zamenjaš osebek in predmet v trpnem stavku.",
                "Priredje in podredje ločiš po vezniku <em>in</em>, ne po odnosu med stavkoma."]),
    "pravopis_slog_pm": dict(
        uvod="Pravopisna, pravorečna in slogovna zmožnost: velika in mala začetnica, pisanje skupaj in narazen, prevzete besede, krajšave in ločila; knjižni izgovor in naglas.",
        sklopi=[("pravopis", 1), ("pravopis", 2), ("pravopis", 3), ("pravopis", 4), ("pravopis", 5), ("glasoslovje_pravorecje", 3), ("glasoslovje_pravorecje", 4)],
        cilji=["prepozna pravopisne napake, jih odpravi in utemelji popravke ter tvori pravopisno pravilne odgovore",
               "primerja knjižni in neknjižni izgovor in z ustreznimi simboli zapiše pravilni knjižni izgovor",
               "prepozna slogovno zaznamovane besede, jih zamenja z nezaznamovanimi in vrednoti okoliščine rabe",
               "priredi isto besedilo za različne naslovnike in pojasni priredbo"],
        izpit="V izhodiščno besedilo ali posebne povedi so vstavljene napake, ki jih poiščeš in popraviš s kratko utemeljitvijo (»vejica pred odvisnikom«, »ime ustanove z veliko začetnico«).",
        napake=["Mala začetnica v imenih ustanov in praznikov ali velika v občnih imenih.",
                "Manjka vejica pred <em>ki, ker, da, ko, če</em>.",
                "Zapišeš <em>s</em> pred zvenečim soglasnikom (prav: <em>z bratom</em>, <em>s sestro</em>).",
                "Pri pravorečju zapišeš črko <em>l</em> namesto [u̯] (<em>bil</em> [biu̯])."]),
    "jezik_v_druzbi": dict(
        uvod="Jezikovne teme za ustni izpit in za razčlembo: vloge jezika, jezikovne zvrsti, položaj slovenščine v državi, zamejstvu, izseljenstvu in EU, jezikovne družine ter nastanek in razvoj slovenskega knjižnega jezika.",
        sklopi=[("jezik_sporazumevanje", 1), ("jezik_sporazumevanje", 2), ("jezikovne_zvrsti", 1), ("jezikovne_zvrsti", 2), ("jezikovne_zvrsti", 3), (L, JEZIK_DRUZBA), ("jezikovne_zvrsti", 5)],
        cilji=["predstavi vloge jezika in vlogo slovenščine kot maternega jezika",
               "predstavi vlogo in položaj slovenščine v RS, zamejstvu, izseljenstvu in EU",
               "predstavi položaj italijanščine in madžarščine na narodnostno mešanih območjih",
               "našteje jezikovne družine v Evropi in uvrsti slovenščino",
               "predstavi nastanek in razvoj slovenskega knjižnega jezika ter prepozna jezikovno zvrst"],
        izpit="Jezikovne teme se pojavijo predvsem na ustnem izpitu (povezava z literarnim besedilom), v izpitni poli 1 pa kot naloge o jezikovnih zvrsteh in o rabi knjižnega jezika.",
        napake=["Slovenščino uvrstiš med zahodnoslovanske jezike.",
                "Madžarščino uvrstiš med indoevropske jezike.",
                "Zamenjaš zborni in pogovorni knjižni jezik.",
                "Trubarja in Kopitarja postaviš v napačno stoletje."]),
    "interpretacija_pm": dict(
        uvod="Osnove književne teorije, ki jih potrebuješ za izpitno polo 2 in ustni izpit: zvrsti in vrste, notranja zgradba, pripovedovalec, verz in kitica, slogovna sredstva, dramatika in zgradba interpretacije.",
        sklopi=[("uvod_knjizevnost", 1), ("uvod_knjizevnost", 2), ("uvod_knjizevnost", 3), ("uvod_knjizevnost", 4), ("uvod_knjizevnost", 5), ("uvod_knjizevnost", 6), (L, INTERPRETACIJA)],
        cilji=["vodeno ali samostojno interpretira in vrednoti prvine umetnostnega besedila: zvrst, temo, motiv, idejo, osebe, dogajanje, prostor in čas",
               "ustrezno strokovno poimenuje literarne pojave",
               "tvori koherentno, razumljivo, jezikovno pravilno in slogovno ustrezno besedilo"],
        izpit="Izpitna pola 2 ima en odlomek in navodila za interpretacijo (30 točk po petih elementih). Priporočeni obseg je vsaj 400 besed.",
        napake=["Obnoviš celo delo, odlomka pa ne razčleniš.",
                "Zamenjaš avtorja in pripovedovalca ali lirski subjekt.",
                "Slogovno sredstvo poimenuješ, ne pojasniš pa njegovega učinka.",
                "Manjka aktualizacija in osebno vrednotenje v sklepu."]),
    "knjizevnost_do_razsvetljenstva": dict(
        uvod="Besedila za ustni izpit od Biblije do razsvetljenstva: Prilika o izgubljenem sinu, Homer, Sofoklej, Brižinski spomeniki, ljudsko slovstvo, Shakespeare, Trubar, Svetokriški, Vodnik in Linhart.",
        sklopi=[(L, SEZ_DO_RAZSV), ("orient", 1), ("orient", 3), ("antika", 1), ("antika", 2), ("antika", 3), ("srednji_vek", 1), ("srednji_vek", 4), ("ljudsko_slovstvo", 1),
                ("renesansa", 1), ("renesansa", 5), ("reformacija_barok", 1), ("reformacija_barok", 2), ("reformacija_barok", 4), ("reformacija_barok", 5),
                ("razsvetljenstvo", 1), ("razsvetljenstvo", 2), ("razsvetljenstvo", 3)],
        cilji=["predstavi obdobje in njegov pomen ter uvrsti besedilo vanj",
               "razloži značilnosti prilike, epa, tragedije, pridige, ljudske pesmi in pripovedi ter komedije",
               "interpretira odlomek: tema, motivi, osebe, tragičnost ali komičnost, jezik in slog"],
        izpit="Na ustnem izpitu dobiš odlomek enega od predlaganih besedil (npr. Prilika o izgubljenem sinu, Kralj Ojdip ali Antigona, Romeo in Julija ali Hamlet, Matiček se ženi). Odlomek glasno prebereš in ga interpretiraš.",
        napake=["Zamenjaš Iliado in Odisejo.",
                "Vzroke tragičnosti razložiš samo z usodo, ne pa tudi z značajem osebe.",
                "Brižinske spomenike postaviš v 16. stoletje (nastali so okoli leta 1000).",
                "Linhartovo komedijo zamenjaš z Vodnikovo pesmijo."]),
    "romantika_realizem_pm": dict(
        uvod="Romantika v Evropi in na Slovenskem s Prešernom, evropski realizem in naturalizem ter slovenska književnost med romantiko in realizmom: Jenko, Gregorčič, Jurčič, Kersnik, Tavčar in Aškerc.",
        sklopi=[(L, SEZ_ROM_REAL), ("evropska_romantika", 1), ("evropska_romantika", 3), ("evropska_romantika", 5), ("preseren", 1), ("preseren", 5), ("preseren", 6), ("preseren", 8),
                ("realizem", 1), ("realizem", 3), ("realizem", 5), ("realizem", 6), ("realizem", 8),
                ("med_romantiko_realizmom", 1), ("med_romantiko_realizmom", 2), ("med_romantiko_realizmom", 3), ("med_romantiko_realizmom", 5),
                ("med_romantiko_realizmom", 7), ("med_romantiko_realizmom", 6), ("med_romantiko_realizmom", 8), ("med_romantiko_realizmom", 4)],
        cilji=["predstavi romantiko in realizem ter njune značilnosti",
               "interpretira Prešernov Sonetni venec, Krst pri Savici in Zdravljico",
               "razloži realistični, psihološki in naturalistični roman ter tezno dramo",
               "interpretira dela Jenka, Gregorčiča, Jurčiča, Kersnika, Tavčarja in Aškerca ter v njih poišče romantične in realistične prvine"],
        izpit="Na ustnem izpitu so pogosti Prešeren (sonet in Zdravljica), Gospa Bovary, Zločin in kazen, Nora ali Strahovi, Deseti brat, Jara gospoda in Cvetje v jeseni.",
        napake=["Sonetni venec ima 15 sonetov, ne 14; magistrale je 15. sonet.",
                "Romantično in realistično prvino v istem delu ne ločiš (Deseti brat ima obe).",
                "Zamenjaš naturalizem (dednost, okolje) in psihološki realizem (notranje doživljanje).",
                "Ibsenovo analitično tehniko razložiš kot kronološko dogajanje."]),
    "moderna_pm": dict(
        uvod="Evropska moderna in njene smeri (dekadenca, simbolizem, impresionizem) z Wildovo Salomo ter slovenska moderna: Kette, Murn, Župančič in Cankar.",
        sklopi=[(L, SEZ_MODERNA), ("evropska_moderna", 1), ("evropska_moderna", 4), ("slovenska_moderna", 1), ("slovenska_moderna", 2), ("slovenska_moderna", 3), ("slovenska_moderna", 4),
                ("slovenska_moderna", 5), ("slovenska_moderna", 6), ("slovenska_moderna", 7), ("slovenska_moderna", 8), ("slovenska_moderna", 9), ("slovenska_moderna", 10)],
        cilji=["predstavi obdobje moderne in literarne smeri",
               "interpretira pesmi Ketteja, Murna in Župančiča (impresionistične in simbolistične prvine, zvočni učinki)",
               "interpretira Cankarjev roman, črtico in dramo (Martin Kačur ali Na klancu, Kostanj posebne sorte ali Gospod stotnik, Hlapci ali Za narodov blagor)"],
        izpit="Cankar je skoraj vedno na izpitnih listkih: vedi, kako so zgrajeni Martin Kačur (simetrija) in Na klancu (ciklična zgradba), kdo je Jerman in kaj je hlapčevstvo.",
        napake=["Murnovo in Kettejevo pesem zamenjaš (Kette: Na trgu, Murn: Sneg).",
                "Martina Kačurja razložiš samo kot zgodbo o ljubezni, brez boja idealista z okoljem.",
                "Črtico zamenjaš s kratko zgodbo (črtica je kratka, subjektivna, s simboli).",
                "Dumo razložiš le kot domoljubno pesem; je dvodelna, idealizirane podobe domovine se soočijo z resnico o izseljevanju."]),
    "knjizevnost_prva_polovica": dict(
        uvod="Evropska književnost v prvi polovici 20. stoletja s Kafkovo Preobrazbo ter slovenska književnost med vojnama: Kosovel, Pregelj, Grum, Prežihov Voranc, Kranjec in Kajuh.",
        sklopi=[(L, SEZ_PRVA), ("svet_prva_polovica_20", 1), ("svet_prva_polovica_20", 3), ("slovenska_prva_polovica_20", 1), ("slovenska_prva_polovica_20", 2),
                ("slovenska_prva_polovica_20", 3), ("slovenska_prva_polovica_20", 4), ("slovenska_prva_polovica_20", 6)],
        cilji=["predstavi obdobje in literarne smeri (ekspresionizem, avantgarda, socialni realizem)",
               "interpretira Kafkovo Preobrazbo in Kosovelove pesmi (impresionistične, ekspresionistične, konstruktivistične)",
               "interpretira novele Pregelja, Prežihovega Voranca in Kranjca ter Grumovo dramo in Kajuhovo pesem"],
        izpit="Na ustnem izpitu so pogosti Kosovel (Slutnja, Ekstaza smrti, Kons. 5), Samorastniki ali Boj na požiralniku in Preobrazba.",
        napake=["Kosovelove konse razložiš kot klasične pesmi; so konstruktivistične, z nenavadno grafično podobo.",
                "Samorastnike razložiš brez družbene razslojenosti.",
                "Preobrazbo razložiš le dobesedno, brez simbolnega pomena.",
                "Zamenjaš ekspresionizem in impresionizem."]),
    "knjizevnost_druga_polovica": dict(
        uvod="Evropska književnost po letu 1945 z dramo absurda ter slovenska poezija, proza in dramatika druge polovice 20. stoletja in sodobnosti.",
        sklopi=[(L, SEZ_DRUGA), ("svet_druga_polovica_20", 1), ("svet_druga_polovica_20", 5), ("svet_druga_polovica_20", 6), ("slovensko_pesnistvo_20", 1), ("slovensko_pesnistvo_20", 2),
                ("slovensko_pesnistvo_20", 3), ("slovensko_pripovednistvo_20", 1), ("slovensko_pripovednistvo_20", 2), ("slovensko_pripovednistvo_20", 3),
                ("slovensko_pripovednistvo_20", 4), ("slovenska_dramatika_20", 1), ("slovenska_dramatika_20", 2)],
        cilji=["predstavi obdobje in pomen dramatike absurda ter eksistencializma",
               "interpretira intimistično, modernistično in sodobno slovensko poezijo (Menart, Pavček, Kovič, Zajc, Strniša, Makarovičeva, Šalamun, Šteger)",
               "interpretira prozo (Kosmač, Zupan, Tomšič, Blatnik, Skubic ali Lainšček, Glavanova) in dramatiko (Smole, Jančar, M. Zupančič)"],
        izpit="Na ustnem izpitu dobiš pesem ali odlomek; pri sodobnih besedilih se pogosto sprašuje po družbeni problematiki, jeziku (sleng, narečje) in aktualizaciji.",
        napake=["Smoletovo Antigono zamenjaš s Sofoklejevo (pri Smoletu Antigona ne nastopi).",
                "Absurd razložiš kot smešno, ne kot nesmiselnost bivanja.",
                "Intimizem zamenjaš z modernizmom.",
                "Pri Fužinskem bluzu prezreš več pripovedovalcev in rabo pogovornega jezika."]),
}

if __name__ == "__main__":
    from snovi import SNOVI
    for i, (_, slug, naslov, opis) in enumerate(SNOVI["poklicna_slovenscina"], 1):
        s, t = rm.zgradi(slug, f"4.{i}", naslov, opis)
        videi_pm.vstavi(os.path.join(rm.IZHOD, slug, f"{slug}_razlaga.html"), f"poklicna_slovenscina/{slug}")
        print(f"4.{i} {slug}: {s} sklopov, {t} tipov")
