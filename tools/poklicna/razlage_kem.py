# python3 tools/poklicna/razlage_kem.py
# Strani z razlago za poklicno maturo iz kemije (2. predmet, kemijski tehnik), po predmetnem
# izpitnem katalogu PIK 2 Kemija 2026: štirje strokovni moduli (splošna in anorganska kemija,
# kemijsko računstvo, fizikalna kemija, organska kemija). Stran je sestavljena iz sklopov razlag
# splošne mature in iz lastnih sklopov za vsebine, ki jih ima samo katalog poklicne mature
# (zmesi in ločevanje, fazni diagram in plinski zakoni, koligativne lastnosti, redčenje in mešanje
# raztopin, zrak in voda, zemljoalkalijske kovine in železo).
import os

from razlage_slo import sklop, tip  # pomožni funkciji za lastne sklope
import razlage_mat as rm

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
rm.SM = os.path.join(KOREN, "public", "views", "kemija", "snov")
rm.IZHOD = os.path.join(KOREN, "public", "views", "poklicna_kemija", "snov")
rm.PREDMET, rm.SLUG, rm.IZ = "Kemija", "poklicna_kemija", "iz kemije"
rm.DODATEK = " Na izpitu sta dovoljena periodni sistem in žepno računalo brez grafičnega zaslona."

SM_SLUGI = ["alkalijske_kovine_halogeni", "delci_snovi", "dusikove_spojine", "elementi_spojine_tehnologije", "halogenirani_ogljikovodiki",
            "hitrost_reakcij", "kemijska_reakcija", "kemijske_vezi", "kemijsko_ravnotezje", "kisikove_spojine", "mnozina_snovi", "ogljikovodiki",
            "oksidacija_redukcija", "organske_reakcije", "organske_spojine_zgradba", "periodni_sistem_elementov", "polimeri",
            "ravnotezja_v_vodnih_raztopinah", "raztopine", "varno_eksperimentalno_delo"]
rm.VIRI = {s: f"{s}/{s}" for s in SM_SLUGI}

# ------------------------------------------------------------------ lastni sklopi

ZMESI = sklop(
    "Čiste snovi, zmesi in ločevanje", "Elementi in spojine, homogene in heterogene zmesi, disperzni sistemi in postopki ločevanja.",
    """            <p><strong>Čista snov</strong> ima stalno sestavo in stalne fizikalne lastnosti (tališče, vrelišče, gostoto). Je <strong>element</strong> (ena vrsta atomov, npr. Fe, O<sub>2</sub>) ali <strong>spojina</strong> (dve ali več vrst atomov v stalnem razmerju, npr. H<sub>2</sub>O, NaCl). <strong>Zmes</strong> sestavlja več čistih snovi v poljubnem razmerju; sestavine ohranijo svoje lastnosti.</p>
            <ul>
              <li><strong>Homogena zmes</strong>: sestavin ne ločimo niti z mikroskopom (raztopina soli, zrak, zlitina).</li>
              <li><strong>Heterogena zmes</strong>: sestavine so vidne (pesek in voda, granit, mleko pod mikroskopom).</li>
            </ul>
            <h4>Disperzni sistemi</h4>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Sistem</th><th>Velikost delcev</th><th>Lastnosti</th><th>Primer</th></tr></thead>
                <tbody>
                  <tr><td>prava raztopina</td><td>manj kot 1 nm</td><td>prozorna, ne posedanja, gre skozi filter papir</td><td>sladkor v vodi</td></tr>
                  <tr><td>koloidni sistem</td><td>1 nm–1 µm</td><td>Tyndallov pojav (snop svetlobe je viden), ne posedanja</td><td>mleko, megla, želatina</td></tr>
                  <tr><td>suspenzija / emulzija</td><td>več kot 1 µm</td><td>motna, delci se posedajo ali ločijo</td><td>blato v vodi / olje v vodi</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Ločevanje zmesi</h4>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Postopek</th><th>Na kateri lastnosti temelji</th><th>Primer</th></tr></thead>
                <tbody>
                  <tr><td>filtracija, dekantiranje, centrifugiranje</td><td>velikost delcev, gostota</td><td>pesek iz vode</td></tr>
                  <tr><td>destilacija (frakcionirna)</td><td>različno vrelišče</td><td>etanol iz vina, nafta</td></tr>
                  <tr><td>kristalizacija, izparevanje</td><td>topnost, hlapnost topila</td><td>sol iz morske vode</td></tr>
                  <tr><td>ekstrakcija</td><td>različna topnost v dveh topilih</td><td>jod iz vode s heksanom</td></tr>
                  <tr><td>kromatografija</td><td>različna adsorpcija na nosilec</td><td>barvila v flomastru</td></tr>
                  <tr><td>sublimacija</td><td>prehod trdno → plin</td><td>jod iz zmesi s soljo</td></tr>
                  <tr><td>magnetno ločevanje, lij ločnik</td><td>magnetnost, nemešanje tekočin</td><td>železo iz žvepla; olje in voda</td></tr>
                </tbody>
              </table>
            </div>""",
    tip(1, "Izberi postopek ločevanja", "Kako bi iz zmesi kuhinjske soli, peska in železnih opilkov pridobil vse tri snovi?",
        "»loči zmes«, »kako bi pridobil«, »izberi postopek«.", ["ločevanje", "zmes"],
        [("Za vsako sestavino poišči lastnost, po kateri se razlikuje od drugih.", "Železo je magnetno, sol je topna v vodi, pesek ni."),
         ("Razvrsti postopke v smiselno zaporedje.", "1. magnet (železo), 2. raztapljanje v vodi in filtracija (pesek ostane na filtru), 3. izparevanje filtrata (sol)."),
         ("Za vsak postopek navedi pribor.", "Magnet; čaša, lij, filtrirni papir; izparilnica, gorilnik.")]) +
    tip(2, "Razvrsti disperzni sistem", "Pri osvetlitvi z laserjem je pot svetlobe skozi tekočino jasno vidna, delci se ne posedajo. Kakšen sistem je to?",
        "»Tyndallov pojav«, »velikost delcev«, »raztopina, koloid ali suspenzija«.", ["disperzni sistem", "Tyndall"],
        [("Poišči odločilni podatek.", "Viden snop svetlobe = Tyndallov pojav."),
         ("Določi sistem in velikost delcev.", "Koloidni sistem, delci 1 nm–1 µm.")]))

TEKOCINE_PLINI = sklop(
    "Tekočine, fazni diagram vode in plinski zakoni", "Parni tlak in vrelišče, fazni diagram, idealni in realni plin, Boylov, Charlesov in Gay-Lussacov zakon.",
    """            <p><strong>Ravnotežni parni tlak</strong> je tlak pare nad tekočino v zaprti posodi, ko je hitrost izparevanja enaka hitrosti kondenzacije. Narašča s temperaturo. Tekočina <strong>vre</strong>, ko je njen parni tlak enak zunanjemu tlaku: v gorah (nižji tlak) voda vre pri nižji temperaturi, v ekonom loncu (višji tlak) pri višji. Močnejše medmolekulske sile pomenijo nižji parni tlak in višje vrelišče.</p>
            <h4>Fazni diagram vode</h4>
            <p>Na faznem diagramu (tlak glede na temperaturo) črte ločijo področja trdnega, tekočega in plinastega stanja. Na črtah sta dve fazi v ravnotežju.</p>
            <ul>
              <li><strong>Trojna točka</strong> (0,01 °C, 611 Pa): v ravnotežju so led, voda in vodna para.</li>
              <li><strong>Kritična točka</strong> (374 °C, 22,1 MPa): nad njo para in tekočina nista več ločeni.</li>
              <li>Črta taljenja vode je <strong>nagnjena v levo</strong>: z višjim tlakom se tališče ledu zniža, ker ima led manjšo gostoto kot voda (drsanje, ledeniki).</li>
            </ul>
            <h4>Plini</h4>
            <p><strong>Idealni plin</strong>: delci nimajo lastne prostornine in se ne privlačijo. <strong>Realni plini</strong> se idealnemu približajo pri nizkem tlaku in visoki temperaturi.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Zakon</th><th>Kaj je stalno</th><th>Zapis</th></tr></thead>
                <tbody>
                  <tr><td>Boylov</td><td>T in n</td><td>p<sub>1</sub>V<sub>1</sub> = p<sub>2</sub>V<sub>2</sub></td></tr>
                  <tr><td>Charlesov (Gay-Lussacov za prostornino)</td><td>p in n</td><td>V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub></td></tr>
                  <tr><td>Gay-Lussacov (za tlak)</td><td>V in n</td><td>p<sub>1</sub>/T<sub>1</sub> = p<sub>2</sub>/T<sub>2</sub></td></tr>
                  <tr><td>splošna plinska enačba</td><td>–</td><td>pV = nRT, R = 8,314 J mol<sup>−1</sup> K<sup>−1</sup></td></tr>
                </tbody>
              </table>
            </div>
            <div class="pazi"><strong>Enote:</strong> temperaturo vedno pretvori v kelvine (T = t + 273), tlak v Pa in prostornino v m<sup>3</sup> (1 L = 10<sup>−3</sup> m<sup>3</sup>), če računaš z R = 8,314.</div>""",
    tip(1, "Uporabi plinski zakon", "Jeklenka s prostornino 20 L vsebuje plin pri 20 °C in tlaku 150 bar. Kolikšen je tlak, če se jeklenka na soncu segreje na 50 °C?",
        "»segrejemo«, »stisnemo«, »pri stalni prostornini / tlaku«.", ["plinski zakon", "tlak", "temperatura"],
        [("Ugotovi, kaj je stalno, in izberi zakon.", "Prostornina in množina sta stalni → p<sub>1</sub>/T<sub>1</sub> = p<sub>2</sub>/T<sub>2</sub>."),
         ("Temperaturi pretvori v kelvine.", "T<sub>1</sub> = 293 K, T<sub>2</sub> = 323 K."),
         ("Izrazi in izračunaj.", "p<sub>2</sub> = p<sub>1</sub> · T<sub>2</sub>/T<sub>1</sub> = 150 bar · 323/293 = 165 bar.")]) +
    tip(2, "Izračunaj s splošno plinsko enačbo", "Kolikšna je masa kisika v 5,0 L posodi pri 25 °C in 200 kPa?",
        "»izračunaj množino / maso / prostornino plina«, podani p, V, T.", ["pV = nRT"],
        [("Pretvori v osnovne enote.", "V = 5,0 · 10<sup>−3</sup> m<sup>3</sup>, T = 298 K, p = 2,00 · 10<sup>5</sup> Pa."),
         ("Izračunaj množino.", "n = pV/RT = (2,00 · 10<sup>5</sup> · 5,0 · 10<sup>−3</sup>)/(8,314 · 298) = 0,404 mol."),
         ("Izračunaj maso.", "m = n · M = 0,404 mol · 32,0 g/mol = 12,9 g.")]) +
    tip(3, "Razloži fazni diagram vode", "Kaj se zgodi z ledom pri −2 °C, če povečamo tlak? Pojasni s faznim diagramom.",
        "»fazni diagram«, »trojna točka«, »kaj se zgodi pri tlaku«.", ["fazni diagram", "trojna točka"],
        [("Poišči točko na diagramu in smer spremembe.", "Točka v področju ledu, blizu črte taljenja; tlak narašča (navpično navzgor)."),
         ("Ugotovi, ali prečkaš črto.", "Ker je črta nagnjena v levo, pri dovolj velikem tlaku preideš v področje tekočine: led se stali."),
         ("Utemelji z zgradbo.", "Led ima manjšo gostoto od vode, zato višji tlak podpira nastanek tekoče vode.")]))

KOLIGATIVNE = sklop(
    "Koligativne lastnosti raztopin", "Znižanje parnega tlaka in zmrzišča, zvišanje vrelišča in osmozni tlak.",
    """            <p><strong>Koligativne lastnosti</strong> so odvisne samo od <strong>števila raztopljenih delcev</strong>, ne od njihove vrste. Raztopljeni delci zmanjšajo delež molekul topila na površini, zato je parni tlak raztopine nižji kot pri čistem topilu.</p>
            <ul>
              <li><strong>Znižanje parnega tlaka</strong> topila nad raztopino.</li>
              <li><strong>Zvišanje vrelišča</strong>: ΔT<sub>v</sub> = K<sub>e</sub> · b · i (za vodo K<sub>e</sub> = 0,512 K kg mol<sup>−1</sup>).</li>
              <li><strong>Znižanje zmrzišča</strong>: ΔT<sub>z</sub> = K<sub>k</sub> · b · i (za vodo K<sub>k</sub> = 1,86 K kg mol<sup>−1</sup>); zato posipamo ceste s soljo in v hladilnike dodajamo glikol.</li>
              <li><strong>Osmozni tlak</strong>: π = i · c · R · T; voda skozi polprepustno membrano prehaja v bolj koncentrirano raztopino (rdeče krvničke v destilirani vodi nabreknejo, v slani se skrčijo).</li>
            </ul>
            <p><strong>b</strong> je molalnost (mol topljenca na kg topila), <strong>i</strong> pa število delcev, ki nastanejo iz ene formulske enote: sladkor i = 1, NaCl i = 2, CaCl<sub>2</sub> i = 3.</p>""",
    tip(1, "Izračunaj znižanje zmrzišča", "Za koliko se zniža zmrzišče vode, če v 500 g vode raztopimo 29,25 g NaCl?",
        "»zmrzišče«, »vrelišče«, »molalnost«, »posip ceste«.", ["zmrzišče", "vrelišče", "koligativne"],
        [("Izračunaj množino topljenca in molalnost.", "n(NaCl) = 29,25 g / 58,5 g/mol = 0,500 mol; b = 0,500 mol / 0,500 kg = 1,00 mol/kg."),
         ("Določi i.", "NaCl → Na<sup>+</sup> + Cl<sup>−</sup>, i = 2."),
         ("Izračunaj ΔT in novo zmrzišče.", "ΔT = 1,86 · 1,00 · 2 = 3,72 K; zmrzišče je −3,7 °C.")]) +
    tip(2, "Razvrsti raztopine po koligativnem učinku", "Razvrsti 0,1 M raztopine glukoze, NaCl in CaCl<sub>2</sub> po naraščajočem vrelišču.",
        "»razvrsti po vrelišču / zmrzišču / osmoznem tlaku«.", ["razvrsti", "število delcev"],
        [("Za vsako snov določi število delcev i.", "Glukoza 1, NaCl 2, CaCl<sub>2</sub> 3."),
         ("Več delcev, večje zvišanje vrelišča.", "glukoza &lt; NaCl &lt; CaCl<sub>2</sub>.")]))

REDCENJE = sklop(
    "Redčenje, mešanje in priprava raztopin", "Kako izračunaš količine za pripravo razredčene ali koncentrirane raztopine.",
    """            <p>Pri <strong>redčenju</strong> se množina (ali masa) topljenca ne spremeni, spremeni se le količina topila:</p>
            <ul>
              <li>množinska koncentracija: <strong>c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub></strong>;</li>
              <li>masni delež: <strong>m<sub>1</sub>w<sub>1</sub> = m<sub>2</sub>w<sub>2</sub></strong>.</li>
            </ul>
            <p>Pri <strong>mešanju</strong> dveh raztopin istega topljenca se mase in mase topljenca seštejejo: m<sub>1</sub>w<sub>1</sub> + m<sub>2</sub>w<sub>2</sub> = (m<sub>1</sub> + m<sub>2</sub>) w<sub>3</sub>. Pri raztopinah z danima gostoto in masnim deležem izračunamo množinsko koncentracijo s c = (w · ρ)/M.</p>
            <h4>Priprava raztopine v laboratoriju</h4>
            <ol>
              <li>Izračunaj maso trdne snovi (m = c · V · M) ali prostornino koncentrirane raztopine.</li>
              <li>Natehtaj snov na tehtnici oziroma odmeri prostornino s pipeto ali merilnim valjem.</li>
              <li>Raztopi v manjši količini vode, prenesi v <strong>merilno bučko</strong> in dopolni z vodo do oznake.</li>
              <li>Pri redčenju kislin vedno dodajaš <strong>kislino v vodo</strong>, nikoli obratno.</li>
            </ol>""",
    tip(1, "Izračunaj prostornino za redčenje", "Koliko mL 2,0 M HCl potrebujemo za pripravo 250 mL 0,40 M HCl?",
        "»pripravi razredčeno raztopino«, »koliko mL koncentrirane«.", ["redčenje", "c1V1 = c2V2"],
        [("Zapiši, da je množina topljenca enaka.", "c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub>."),
         ("Izrazi in izračunaj.", "V<sub>1</sub> = 0,40 · 250 mL / 2,0 = 50 mL."),
         ("Opiši postopek.", "50 mL 2,0 M HCl odmerimo s pipeto v 250 mL merilno bučko z vodo in dopolnimo do oznake.")]) +
    tip(2, "Izračunaj masni delež po mešanju", "Zmešamo 200 g 10 % in 300 g 25 % raztopine NaOH. Kolikšen je masni delež NaOH v nastali raztopini?",
        "»zmešamo dve raztopini«, »masni delež po mešanju«.", ["mešanje", "masni delež"],
        [("Izračunaj maso topljenca v vsaki raztopini.", "20 g in 75 g NaOH."),
         ("Seštej mase topljenca in raztopin.", "95 g NaOH v 500 g raztopine."),
         ("Izračunaj delež.", "w = 95 g / 500 g = 0,19 = 19 %.")]) +
    tip(3, "Pretvori masni delež v množinsko koncentracijo", "Koncentrirana žveplova(VI) kislina ima w = 96 % in ρ = 1,84 g/mL. Izračunaj njeno množinsko koncentracijo.",
        "podana gostota in masni delež, iščeš c.", ["gostota", "pretvori koncentracijo"],
        [("Vzemi 1 L raztopine in izračunaj njeno maso.", "m = 1000 mL · 1,84 g/mL = 1840 g."),
         ("Izračunaj maso in množino kisline.", "m(H<sub>2</sub>SO<sub>4</sub>) = 0,96 · 1840 g = 1766 g; n = 1766 g / 98,1 g/mol = 18,0 mol."),
         ("Zapiši koncentracijo.", "c = 18,0 mol/L.")]))

ZRAK_VODA = sklop(
    "Zrak in voda", "Sestava zraka, kisik in vodik, trdota vode, onesnaževanje, topla greda in kisli dež.",
    """            <p><strong>Suh zrak</strong> vsebuje po prostornini približno 78 % dušika, 21 % kisika, 0,9 % argona in 0,04 % ogljikovega dioksida ter sledove drugih žlahtnih plinov. Kisik, dušik in žlahtne pline industrijsko pridobivajo s <strong>frakcionirno destilacijo utekočinjenega zraka</strong>.</p>
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th></th><th>Kisik</th><th>Vodik</th></tr></thead>
                <tbody>
                  <tr><td>lastnosti</td><td>brezbarven plin brez vonja, podpira gorenje, malo topen v vodi</td><td>najlažji plin, gori z modrikastim plamenom, z zrakom tvori pokalni plin</td></tr>
                  <tr><td>laboratorij</td><td>2 H<sub>2</sub>O<sub>2</sub> → 2 H<sub>2</sub>O + O<sub>2</sub> (katalizator MnO<sub>2</sub>)</td><td>Zn + 2 HCl → ZnCl<sub>2</sub> + H<sub>2</sub></td></tr>
                  <tr><td>industrija</td><td>destilacija utekočinjenega zraka</td><td>CH<sub>4</sub> + H<sub>2</sub>O → CO + 3 H<sub>2</sub> (parni reforming), elektroliza vode</td></tr>
                  <tr><td>dokaz</td><td>tleča trska se vžge</td><td>pok ob približanju plamena</td></tr>
                </tbody>
              </table>
            </div>
            <h4>Voda</h4>
            <p>Molekula vode je kotna (kot okoli 104,5°) in polarna; med molekulami so <strong>vodikove vezi</strong>, zato ima voda visoko vrelišče, veliko specifično toploto in led z manjšo gostoto od vode.</p>
            <p><strong>Trdota vode</strong> je posledica raztopljenih ionov Ca<sup>2+</sup> in Mg<sup>2+</sup>. <strong>Začasno trdoto</strong> povzročajo hidrogenkarbonati in jo odstranimo s kuhanjem: Ca(HCO<sub>3</sub>)<sub>2</sub> → CaCO<sub>3</sub> + H<sub>2</sub>O + CO<sub>2</sub> (vodni kamen). <strong>Stalno trdoto</strong> povzročajo sulfati in kloridi; vodo mehčamo z ionskimi izmenjevalci ali z dodatkom Na<sub>2</sub>CO<sub>3</sub>.</p>
            <h4>Onesnaževanje</h4>
            <ul>
              <li><strong>Kisli dež</strong>: SO<sub>2</sub> (premog) in dušikovi oksidi (promet) z vodo tvorijo kisline; škoduje gozdovom, jezerom in stavbam.</li>
              <li><strong>Učinek tople grede</strong>: CO<sub>2</sub>, CH<sub>4</sub> in vodna para zadržujejo toplotno sevanje Zemlje; več CO<sub>2</sub> iz fosilnih goriv pomeni segrevanje podnebja.</li>
              <li><strong>Onesnaževanje voda</strong>: gnojila (nitrati, fosfati, evtrofikacija), težke kovine, olja; ukrepi so čistilne naprave, manj gnojil in varčna raba.</li>
            </ul>""",
    tip(1, "Razloži trdoto vode z enačbo", "Zakaj se v grelniku vode nabira vodni kamen? Zapiši enačbo.",
        "»vodni kamen«, »trda voda«, »mehčanje«.", ["trdota vode", "vodni kamen"],
        [("Poimenuj ione, ki povzročajo trdoto.", "Ca<sup>2+</sup> in HCO<sub>3</sub><sup>−</sup> (začasna trdota)."),
         ("Zapiši enačbo razpada pri segrevanju.", "Ca(HCO<sub>3</sub>)<sub>2</sub> → CaCO<sub>3</sub>(s) + H<sub>2</sub>O + CO<sub>2</sub>(g)."),
         ("Poveži z opažanjem.", "Netopni CaCO<sub>3</sub> se izloči na grelcu kot vodni kamen.")]) +
    tip(2, "Pojasni nastanek kislega dežja", "Z enačbami pokaži, kako žveplov dioksid iz termoelektrarne povzroči kisli dež.",
        "»kisli dež«, »onesnaževalci«, »topla greda«.", ["kisli dež", "onesnaževanje"],
        [("Izvor onesnaževala.", "S + O<sub>2</sub> → SO<sub>2</sub> (gorenje premoga z žveplom)."),
         ("Reakcija z vodo v ozračju.", "SO<sub>2</sub> + H<sub>2</sub>O → H<sub>2</sub>SO<sub>3</sub>; ob oksidaciji nastane H<sub>2</sub>SO<sub>4</sub>."),
         ("Ukrep.", "Razžveplanje dimnih plinov, manj premoga, obnovljivi viri.")]))

KOVINE_ZEM = sklop(
    "Zemljoalkalijske kovine, kras in železo", "Spojine kalcija, kraški pojavi, pridobivanje železa in jekla, kovine z vodo.",
    """            <p><strong>Zemljoalkalijske kovine</strong> (2. skupina: Be, Mg, Ca, Sr, Ba) imajo dva valenčna elektrona in tvorijo ione M<sup>2+</sup>. So manj reaktivne od alkalijskih kovin; reaktivnost narašča navzdol po skupini.</p>
            <h4>Kalcijeve spojine</h4>
            <ul>
              <li>Žganje apnenca: CaCO<sub>3</sub> → CaO + CO<sub>2</sub> (žgano apno).</li>
              <li>Gašenje apna: CaO + H<sub>2</sub>O → Ca(OH)<sub>2</sub> (gašeno apno, malta).</li>
              <li>Strjevanje malte: Ca(OH)<sub>2</sub> + CO<sub>2</sub> → CaCO<sub>3</sub> + H<sub>2</sub>O.</li>
            </ul>
            <h4>Kraški pojavi</h4>
            <p>Deževnica z raztopljenim CO<sub>2</sub> raztaplja apnenec: CaCO<sub>3</sub> + CO<sub>2</sub> + H<sub>2</sub>O ⇌ Ca(HCO<sub>3</sub>)<sub>2</sub>. Tako nastanejo jame in brezna. V jamah se CO<sub>2</sub> izloča, ravnotežje se pomakne v levo in iz kapljic se izloča CaCO<sub>3</sub>: nastajajo kapniki (stalaktiti in stalagmiti).</p>
            <h4>Železo in jeklo</h4>
            <p>Železo pridobivajo v <strong>plavžu</strong> z redukcijo železove rude z ogljikovim oksidom: Fe<sub>2</sub>O<sub>3</sub> + 3 CO → 2 Fe + 3 CO<sub>2</sub>. Grodelj vsebuje okoli 4 % ogljika in je krhek; <strong>jeklo</strong> ima manj kot 2 % ogljika in je kovno. Legirana jekla (s Cr, Ni, Mn …) so trdna in odporna proti koroziji (nerjavno jeklo).</p>
            <h4>Kovine in njihovi oksidi z vodo</h4>
            <p>Alkalijske in zemljoalkalijske kovine z vodo tvorijo hidrokside in vodik (2 Na + 2 H<sub>2</sub>O → 2 NaOH + H<sub>2</sub>), kovinski oksidi pa hidrokside (Na<sub>2</sub>O + H<sub>2</sub>O → 2 NaOH). Raztopine so bazične (pH &gt; 7).</p>""",
    tip(1, "Zapiši enačbe pridobivanja in uporabe kalcijevih spojin", "Zapiši enačbe žganja apnenca, gašenja apna in strjevanja malte.",
        "»apnenec«, »žgano apno«, »gašeno apno«, »malta«.", ["apno", "apnenec"],
        [("Žganje: razpad karbonata pri segrevanju.", "CaCO<sub>3</sub> → CaO + CO<sub>2</sub>"),
         ("Gašenje: oksid z vodo.", "CaO + H<sub>2</sub>O → Ca(OH)<sub>2</sub>"),
         ("Strjevanje: hidroksid s CO<sub>2</sub> iz zraka.", "Ca(OH)<sub>2</sub> + CO<sub>2</sub> → CaCO<sub>3</sub> + H<sub>2</sub>O")]) +
    tip(2, "Razloži nastanek kapnikov", "Z enačbo pojasni, zakaj v kraških jamah nastajajo kapniki.",
        "»kras«, »kapniki«, »raztapljanje apnenca«.", ["kras", "kapniki"],
        [("Zapiši ravnotežno enačbo.", "CaCO<sub>3</sub> + CO<sub>2</sub> + H<sub>2</sub>O ⇌ Ca(HCO<sub>3</sub>)<sub>2</sub>"),
         ("Pojasni smer v jami.", "V jami CO<sub>2</sub> uhaja iz kapljice, ravnotežje se po Le Chatelierju pomakne v levo."),
         ("Poveži z opažanjem.", "Izloča se CaCO<sub>3</sub>, ki počasi gradi kapnike.")]))

# ------------------------------------------------------------------ poglavja

L = "@"
rm.POGLAVJA = {
    "zmesi_laboratorij": dict(
        uvod="Laboratorijsko delo je osnova poklica kemijskega tehnika. Poglavje obsega čiste snovi in zmesi, disperzne sisteme, postopke ločevanja, laboratorijski inventar in varno delo s piktogrami.",
        sklopi=[(L, ZMESI), ("varno_eksperimentalno_delo", 1), ("varno_eksperimentalno_delo", 3)],
        cilji=["razlikuje disperzne sisteme glede na njihove značilnosti in fizikalne lastnosti",
               "izbere način ločevanja glede na sestavine zmesi",
               "poimenuje laboratorijski inventar in pojasni njegovo uporabo",
               "pozna piktograme in pojasni njihov pomen"],
        izpit="V 1. delu pole so naloge izbirnega tipa o priboru, piktogramih in disperznih sistemih; v 2. delu pa postopek ločevanja ali priprave snovi kot del strukturirane naloge.",
        napake=["Zmes zamenjaš s spojino (zrak je zmes, voda je spojina).",
                "Koloid zamenjaš s pravo raztopino; odloči Tyndallov pojav.",
                "Za ločevanje dveh tekočin z različnim vreliščem izbereš filtracijo namesto destilacije.",
                "Piktogram jedkosti zamenjaš s piktogramom za strupenost."]),
    "atom_periodni_sistem": dict(
        uvod="Zgradba atoma, izotopi, radioaktivnost, razporeditev elektronov in periodičnost lastnosti so osnova za razumevanje vezi in reaktivnosti.",
        sklopi=[("delci_snovi", 1), ("delci_snovi", 2), ("delci_snovi", 3), ("delci_snovi", 4), ("periodni_sistem_elementov", 1)],
        cilji=["določi število protonov, elektronov in nevtronov ter masno in vrstno število",
               "razloži nastanek iona, izotope in radioaktivnost",
               "razčleni zgradbo elektronske ovojnice atomov in ionov reprezentativnih elementov",
               "razloži spreminjanje atomskega radija, ionizacijske energije in elektronegativnosti v periodnem sistemu"],
        izpit="Kratke naloge 1. dela: število delcev v atomu ali ionu, elektronska konfiguracija, razvrščanje po radiju ali elektronegativnosti.",
        napake=["Pri ionu spremeniš število protonov namesto elektronov.",
                "Masno število zamenjaš z relativno atomsko maso.",
                "Atomski radij po periodi narašča v desno (v resnici se manjša).",
                "Kation ima večji radij kot atom (v resnici manjšega)."]),
    "vezi_zgradba_molekul": dict(
        uvod="Vrsta vezi določa lastnosti snovi. Primerjaš ionsko, kovalentno in kovinsko vez, sklepaš na obliko in polarnost molekul po teoriji odboja elektronskih parov in razložiš medmolekulske sile ter vrste kristalov.",
        sklopi=[("kemijske_vezi", 1), ("kemijske_vezi", 2), ("kemijske_vezi", 3), ("kemijske_vezi", 6), ("kemijske_vezi", 5)],
        cilji=["primerja ionsko, kovalentno in kovinsko vez in sklepa na lastnosti spojin",
               "sklepa na obliko in polarnost enostavnih molekul (H<sub>2</sub>O, NH<sub>3</sub>, CH<sub>4</sub>, CO<sub>2</sub>, PCl<sub>5</sub>, SF<sub>6</sub> …) in določi kote med vezmi",
               "predvidi medmolekulske vezi in razloži njihov vpliv na fizikalne lastnosti, posebej vodikovo vez",
               "opredeli vrsto kristala glede na gradnike in vez ter sklepa na njegove lastnosti"],
        izpit="Pogosta naloga: nariši Lewisovo formulo, določi obliko, kot in polarnost molekule ter razloži, zakaj ima snov visoko ali nizko vrelišče.",
        napake=["Molekula CO<sub>2</sub> ima polarne vezi, zato misliš, da je polarna (je linearna in nepolarna).",
                "Pri obliki ne upoštevaš neveznih elektronskih parov (NH<sub>3</sub> je piramidalna, ne trikotna).",
                "Vodikovo vez zamenjaš s kovalentno vezjo O–H.",
                "Ionskemu kristalu pripišeš električno prevodnost v trdnem stanju."]),
    "agregatna_stanja": dict(
        uvod="Fizikalna kemija agregatnih stanj: vrste kristalov, tekočine in parni tlak, fazni diagram vode ter plini z osnovnimi plinskimi zakoni in splošno plinsko enačbo.",
        sklopi=[(L, TEKOCINE_PLINI), ("mnozina_snovi", 3)],
        cilji=["razlikuje med amorfno in kristalizirano snovjo ter prepozna vrsto kristala",
               "nariše in razloži fazni diagram za vodo ter pojasni ravnotežni parni tlak in vrelišče",
               "razlikuje med idealnim in realnim plinom in razčleni osnovne plinske zakone",
               "zapiše splošno plinsko enačbo in pojasni oznake količin in enot"],
        izpit="V 2. delu je pogost račun s plinsko enačbo (pazi na enote), v 1. delu pa vprašanje o faznem diagramu ali vrelišču pri nižjem tlaku.",
        napake=["Računaš s temperaturo v °C namesto v K.",
                "Prostornino v litrih vstaviš v enačbo z R = 8,314 brez pretvorbe v m<sup>3</sup>.",
                "Trojno in kritično točko zamenjaš.",
                "Misliš, da voda vedno vre pri 100 °C, ne glede na tlak."]),
    "raztopine_pm": dict(
        uvod="Raztopine: topilo in topljenec, topnost in dejavniki, ki nanjo vplivajo, raztapljanje ionskih in molekulskih kristalov ter koligativne lastnosti.",
        sklopi=[("raztopine", 1), ("raztopine", 3), (L, KOLIGATIVNE)],
        cilji=["razlikuje pojme topilo, topljenec, raztopina in navede vplive na topnost",
               "sklepa na sposobnost raztapljanja snovi v različnih topilih na osnovi zgradbe",
               "pojasni raztapljanje ionskega in molekulskega kristala",
               "pojasni fizikalne in koligativne lastnosti raztopin"],
        izpit="Naloge o topnosti iz diagrama topnosti, o hidrataciji ionov in o zmrzišču ali vrelišču raztopin.",
        napake=["Nepolarno snov poskušaš raztopiti v vodi (podobno se topi v podobnem).",
                "Pri koligativnih lastnostih pozabiš na število delcev i pri ionskih snoveh.",
                "Topnost plinov po tvoje s temperaturo narašča (v resnici pada).",
                "Molalnost zamenjaš z množinsko koncentracijo."]),
    "anorganska_nomenklatura": dict(
        uvod="Oksidacijska števila in imena anorganskih spojin: oksidov, kislin, hidroksidov in soli z grškimi števniki, po Stockovem sistemu in po IUPAC.",
        sklopi=[("oksidacija_redukcija", 1), ("kemijske_vezi", 4), ("ravnotezja_v_vodnih_raztopinah", 1)],
        cilji=["določa oksidacijska števila elementov v spojinah in ionih",
               "poimenuje anorganske spojine z grškimi števniki in po Stockovem sistemu oziroma po nomenklaturi IUPAC",
               "iz imena zapiše formulo spojine"],
        izpit="Skoraj v vsaki poli: dopolni preglednico z imeni in formulami ali določi oksidacijsko število elementa v ionu.",
        napake=["Vsota oksidacijskih števil v ionu ni enaka naboju iona.",
                "Pri Stockovem imenu pozabiš rimsko številko (železov(III) oksid).",
                "Zamenjaš sulfat in sulfit ali nitrat in nitrit.",
                "Pri formuli soli ne izenačiš nabojev ionov."]),
    "reakcije_energija": dict(
        uvod="Kemijska reakcija kot snovna in energijska sprememba: vrste reakcij, urejanje enačb, energija pri prekinitvi in nastanku vezi, entalpija, energijski diagrami in Hessov zakon.",
        sklopi=[("kemijska_reakcija", 1), ("kemijska_reakcija", 3), ("kemijska_reakcija", 4)],
        cilji=["primerja vrste reakcij in zapiše urejeno enačbo z agregatnimi stanji",
               "pojasni energijske spremembe pri prekinitvi in nastanku vezi ter nariše energijski diagram",
               "razloži prvi zakon termodinamike in opredeli entalpijo ter vrste entalpij",
               "izračuna entalpije izbranih procesov"],
        izpit="Račun reakcijske entalpije iz tvorbenih entalpij ali veznih energij in skica energijskega diagrama sta pogosti nalogi 2. dela.",
        napake=["Pri ΔH = Σ ΔH<sub>tv</sub>(produkti) − Σ ΔH<sub>tv</sub>(reaktanti) zamenjaš vrstni red.",
                "Pozabiš pomnožiti entalpijo s koeficientom v enačbi.",
                "Eksotermni reakciji pripišeš pozitivno ΔH.",
                "Elementom v osnovnem stanju pripišeš tvorbeno entalpijo, različno od 0."]),
    "hitrost_ravnotezje": dict(
        uvod="Hitrost kemijske reakcije in dejavniki, ki nanjo vplivajo, ter kemijsko ravnotežje s konstanto ravnotežja in Le Chatelierovim načelom.",
        sklopi=[("hitrost_reakcij", 1), ("hitrost_reakcij", 2), ("hitrost_reakcij", 3), ("kemijsko_ravnotezje", 1), ("kemijsko_ravnotezje", 2), ("kemijsko_ravnotezje", 3)],
        cilji=["pojasni hitrost reakcije, jo izračuna v časovnem intervalu in odčita iz diagrama ali tabele",
               "pojasni vpliv temperature, koncentracije, površine in katalizatorja",
               "napiše izraz za konstanto ravnotežja, izračuna ravnotežne količine in oceni položaj ravnotežja",
               "uporabi Le Chatelierovo načelo"],
        izpit="Tipična strukturirana naloga: izraz za K<sub>c</sub>, izračun iz začetnih in ravnotežnih količin ter vpliv spremembe tlaka ali temperature.",
        napake=["V izraz za K<sub>c</sub> vstaviš trdne snovi ali vodo kot topilo.",
                "Pozabiš, da so koeficienti v izrazu eksponenti.",
                "Misliš, da katalizator premakne ravnotežje (le hitreje ga doseže).",
                "Pri izračunu ravnotežja ne upoštevaš stehiometrijskega razmerja spremembe."]),
    "kisline_baze_pm": dict(
        uvod="Protolitske reakcije po Brønstedu, močni in šibki elektroliti, ionski produkt vode, pH in pOH, titracije, ionske reakcije, protoliza soli in pufri.",
        sklopi=[("ravnotezja_v_vodnih_raztopinah", 2), ("ravnotezja_v_vodnih_raztopinah", 3), ("ravnotezja_v_vodnih_raztopinah", 7), ("ravnotezja_v_vodnih_raztopinah", 4),
                ("ravnotezja_v_vodnih_raztopinah", 5), ("ravnotezja_v_vodnih_raztopinah", 6), ("ravnotezja_v_vodnih_raztopinah", 8)],
        cilji=["opredeli kisline in baze po Brønstedu in zapiše protolitske reakcije",
               "napiše izraz za konstanto kislin in baz ter oceni jakost",
               "oceni in računa pH in pOH raztopin močnih in šibkih elektrolitov ter stopnjo protolize",
               "opiše nevtralizacijske titracije, izbere indikator in razloži titracijsko krivuljo",
               "oceni pH raztopin soli in zapiše ionske enačbe"],
        izpit="Račun pH šibke kisline in titracijski račun sta skoraj vedno v 2. delu; v 1. delu je izbira indikatorja ali določanje konjugiranega para.",
        napake=["pH šibke kisline računaš kot pri močni kislini.",
                "Zamenjaš kislino in konjugirano bazo v paru.",
                "Pri titraciji pozabiš na razmerje v enačbi (H<sub>2</sub>SO<sub>4</sub> z NaOH 1 : 2).",
                "Raztopini NH<sub>4</sub>Cl pripišeš nevtralen pH."]),
    "redoks_elektrokemija": dict(
        uvod="Redoks reakcije in elektrokemija: urejanje enačb, redoks vrsta, galvanski člen z zapisom in napetostjo, elektroliza talin in raztopin ter Faradayev zakon.",
        sklopi=[("oksidacija_redukcija", 2), ("oksidacija_redukcija", 3), ("oksidacija_redukcija", 4)],
        cilji=["opredeli oksidacijo, redukcijo, oksidant in reducent ter uredi redoks enačbo",
               "uporabi redoks vrsto za določanje smeri reakcije",
               "opiše galvanski člen, zapiše reakciji na elektrodah, simbolni zapis in izračuna napetost",
               "zapiše enačbe elektrolize talin in raztopine NaCl ter izračuna količino izločene snovi"],
        izpit="Pogosta strukturirana naloga: galvanski člen (anoda, katoda, enačbe, napetost) ali elektroliza z računom po Faradayevem zakonu.",
        napake=["Pri galvanskem členu zamenjaš anodo in katodo (anoda je oksidacija, negativni pol).",
                "Pri elektrolizi je anoda pozitivna, kar zamenjaš z galvanskim členom.",
                "Pri Faradayevem zakonu pozabiš na število izmenjanih elektronov z.",
                "Redoks enačbe ne uravnotežiš po naboju."]),
    "mnozina_stehiometrija": dict(
        uvod="Kemijsko računstvo: množina, masa, število delcev in masni delež, množinska razmerja iz enačbe, prebitni reaktant in izkoristek ter molska prostornina plinov.",
        sklopi=[("mnozina_snovi", 1), ("mnozina_snovi", 2), ("kemijska_reakcija", 2)],
        cilji=["s pomočjo definicijskih enačb izračuna množino, maso, število delcev, volumen in masni delež",
               "razbere množinska razmerja in izračuna potrebne količine reaktantov in produktov",
               "izračuna prebitek reaktantov in izkoristek kemijske reakcije"],
        izpit="Stehiometrijski račun je del skoraj vsake strukturirane naloge v 2. delu. Zapiši enačbo, razmerje in enote.",
        napake=["Računaš z masami namesto z množinami v razmerju iz enačbe.",
                "Ne ugotoviš, kateri reaktant je v prebitku.",
                "Izkoristek računaš kot teoretično/dejansko namesto dejansko/teoretično.",
                "Rezultat zaokrožiš na preveč ali premalo značilnih mest."]),
    "racunanje_raztopine": dict(
        uvod="Računanje z raztopinami: masni delež, množinska in masna koncentracija, preračunavanje koncentracij, redčenje in mešanje ter priprava raztopin.",
        sklopi=[("raztopine", 2), (L, REDCENJE)],
        cilji=["izračuna sestavo raztopine",
               "preračuna koncentracije iz ene v drugo",
               "izračuna potrebne količine za pripravo razredčenih in koncentriranih raztopin"],
        izpit="Račun priprave raztopine (masa trdne snovi ali prostornina koncentrirane raztopine) je skoraj v vsaki poli, pogosto skupaj z opisom pribora.",
        napake=["Masi raztopine prišteješ maso topljenca dvakrat.",
                "Pri redčenju vzameš prostornino dodane vode namesto končne prostornine.",
                "Gostoto zamenjaš z masno koncentracijo.",
                "Vodo dodajaš v koncentrirano kislino (nevarno)."]),
    "zrak_voda_nekovine": dict(
        uvod="Anorganska kemija nekovin: zrak in voda, kisik in vodik, trdota vode, onesnaževanje, halogeni, žveplo, dušik, fosfor in ogljik ter silikati.",
        sklopi=[(L, ZRAK_VODA), ("alkalijske_kovine_halogeni", 2), ("elementi_spojine_tehnologije", 2), ("elementi_spojine_tehnologije", 3), ("elementi_spojine_tehnologije", 4)],
        cilji=["pojasni sestavo zraka in pridobivanje kisika, dušika, žlahtnih plinov in vodika",
               "razloži trdoto vode in mehčanje ter oceni onesnaževalce zraka in vode",
               "navede značilnosti klora, žvepla in žveplove(VI) kisline, dušika, amonijaka, dušikove(V) kisline, ogljika in karbonatov",
               "pojasni alotropijo in zgradbo silikatov ter zapiše enačbe nekovinskih oksidov z vodo"],
        izpit="Naloge zahtevajo enačbe pridobivanja (kisik, vodik, amoniak, žveplova kislina), dokaz plina in razlago okoljskih problemov.",
        napake=["Pri reakciji nekovinskega oksida z vodo napišeš bazo namesto kisline.",
                "Alotropne modifikacije zamenjaš z izotopi.",
                "Začasno in stalno trdoto vode zamenjaš.",
                "Ozonsko luknjo zamenjaš z učinkom tople grede."]),
    "kovine_pm": dict(
        uvod="Kovine: alkalijske in zemljoalkalijske kovine, spojine natrija in kalcija, kraški pojavi, prehodni elementi, pridobivanje železa in aluminija ter amfoternost.",
        sklopi=[("alkalijske_kovine_halogeni", 1), (L, KOVINE_ZEM), ("elementi_spojine_tehnologije", 1), ("periodni_sistem_elementov", 2), ("oksidacija_redukcija", 5)],
        cilji=["na osnovi položaja v periodnem sistemu sklepa na lastnosti kovin",
               "pojasni pridobivanje in uporabo natrija in njegovih spojin ter spojin kalcija",
               "razloži kraške pojave s kemijskimi enačbami",
               "pojasni pridobivanje železa in aluminija ter amfoternost aluminija",
               "opiše lastnosti prehodnih elementov"],
        izpit="Pogoste so enačbe (kovina z vodo, žganje apnenca, plavž, elektroliza aluminijevega oksida) in razlaga amfoternosti.",
        napake=["Natriju v spojinah pripišeš oksidacijsko število +2.",
                "Pri amfoternosti zapišeš le reakcijo s kislino.",
                "Grodelj zamenjaš z jeklom.",
                "Pri krasu zapišeš enačbo le v eno smer brez ravnotežja."]),
    "ogljikovodiki_pm": dict(
        uvod="Osnove organske kemije in ogljikovodiki: zgradba in formule organskih spojin, nomenklatura in izomerija, alkani, alkeni, alkini in areni ter vrste organskih reakcij.",
        sklopi=[("organske_spojine_zgradba", 1), ("organske_spojine_zgradba", 2), ("organske_spojine_zgradba", 3), ("organske_spojine_zgradba", 4),
                ("ogljikovodiki", 1), ("ogljikovodiki", 2), ("ogljikovodiki", 3), ("ogljikovodiki", 4), ("organske_reakcije", 1), ("organske_reakcije", 2)],
        cilji=["zapiše organske spojine z različnimi formulami in jih poimenuje po IUPAC",
               "zapiše ali poimenuje izomere (verižne, položajne, funkcionalne, optične in geometrijske)",
               "prepozna alkane, alkene, alkine in aromate, tip hibridizacije in obliko molekul",
               "razloži vpliv dolžine in razvejanosti verige na vrelišče ter netopnost v vodi",
               "prepozna substrat, reagent, produkt in vrsto reakcije (substitucija, adicija, eliminacija)"],
        izpit="Naloge zahtevajo ime ali formulo spojine, izomere, reakcijsko shemo in vrsto reakcije. Pazi na skeletne formule.",
        napake=["Pri imenovanju ne izbereš najdaljše verige.",
                "Pri številčenju ne daš dvojni vezi najnižjega števila.",
                "Benzen obravnavaš kot alken, ki rad adira (v resnici substituira).",
                "Zamenjaš elektrofil in nukleofil."]),
    "halogenirani_kisikove": dict(
        uvod="Halogenirani ogljikovodiki ter kisikove in dušikove organske spojine: alkoholi, fenoli, etri, aldehidi, ketoni, karboksilne kisline in derivati ter amini, z lastnostmi in reakcijami.",
        sklopi=[("halogenirani_ogljikovodiki", 1), ("halogenirani_ogljikovodiki", 2), ("halogenirani_ogljikovodiki", 3), ("kisikove_spojine", 1), ("kisikove_spojine", 2),
                ("kisikove_spojine", 3), ("dusikove_spojine", 1)],
        cilji=["prepozna primarne, sekundarne in terciarne halogenirane ogljikovodike in alkohole",
               "zapiše funkcionalne skupine in splošne formule kisikovih in dušikovih spojin",
               "razvršča spojine po vreliščih in topnosti v vodi",
               "pojasni razliko med aldehidi in ketoni (Tollens, Fehling)",
               "zapiše reakcijske sheme in prepozna tip reakcije (nukleofilna substitucija, eliminacija, oksidacija, estrenje)"],
        izpit="Pogosta strukturirana naloga je reakcijska shema s pretvorbami (alkohol → aldehid → karboksilna kislina → ester) in razvrščanje po vreliščih.",
        napake=["Terciarni alkohol oksidiraš do ketona (ne oksidira se).",
                "Pri estrenju zamenjaš, iz katere spojine izvira kisik.",
                "Etru pripišeš vodikove vezi med molekulami.",
                "Freone povežeš s toplo gredo namesto z ozonsko luknjo."]),
    "biomolekule_pm": dict(
        uvod="Biološko pomembne spojine: ogljikovi hidrati, lipidi in milo ter aminokisline, peptidi in beljakovine.",
        sklopi=[("kisikove_spojine", 4), ("kisikove_spojine", 5), ("dusikove_spojine", 2), ("dusikove_spojine", 3)],
        cilji=["opredeli zgradbo ogljikovih hidratov in zapiše enačbo fotosinteze",
               "zapiše Fischerjevi formuli D-glukoze in D-fruktoze ter prepozna glikozidno vez",
               "predstavi polisaharide in dokaz škroba z jodovico",
               "opredeli umiljive in neumiljive lipide ter zapiše umiljenje",
               "opiše aminokisline, peptidno vez in zgradbo beljakovin"],
        izpit="Naloge zahtevajo Fischerjevo formulo, prepoznavo glikozidne ali peptidne vezi, enačbo umiljenja in dokazne reakcije.",
        napake=["Glukozo zamenjaš s fruktozo (aldoza in ketoza).",
                "Peptidno vez narišeš med dvema amino skupinama.",
                "Milo zamenjaš z maščobo.",
                "Škrob dokazuješ s Fehlingovim reagentom namesto z jodovico."]),
    "polimeri_pm": dict(
        uvod="Polimeri: monomer in polimer, adicijska in kondenzacijska polimerizacija, naravni in sintezni polimeri ter njihov vpliv na okolje.",
        sklopi=[("polimeri", 1), ("polimeri", 2)],
        cilji=["loči adicijsko in kondenzacijsko polimerizacijo ter zapiše ponavljajočo se enoto",
               "iz formule polimera določi monomer in obratno",
               "navede naravne in sintezne polimere ter njihovo uporabo",
               "ovrednoti vpliv plastike na okolje in možnosti recikliranja"],
        izpit="Kratka naloga: iz monomera zapiši del verige polimera ali obratno in določi vrsto polimerizacije.",
        napake=["Pri adicijski polimerizaciji v verigi ohraniš dvojno vez.",
                "Pri kondenzacijski polimerizaciji pozabiš na izločeno vodo.",
                "Poliester zamenjaš s poliamidom.",
                "Termoplaste zamenjaš z duromeri."]),
}

if __name__ == "__main__":
    from snovi import SNOVI
    for i, (_, slug, naslov, opis) in enumerate(SNOVI["poklicna_kemija"], 1):
        s, t = rm.zgradi(slug, f"4.{i}", naslov, opis)
        print(f"4.{i} {slug}: {s} sklopov, {t} tipov")
