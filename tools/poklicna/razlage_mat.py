# python3 tools/poklicna/razlage_mat.py
# Strani z razlago za poklicno maturo iz matematike (public/views/poklicna_matematika/snov/<slug>/).
# Vsebina poklicne mature je podmnožica osnovne ravni splošne mature, zato je vsaka stran
# sestavljena iz sklopov obstoječih razlag (razlaga, tipi nalog s postopki, primeri, slike in
# video razlage) v vrstnem redu predmetnega izpitnega kataloga za poklicno maturo 2026.
# Dodano je, kaj preverja katalog, kako se snov pojavi na izpitu, ključ tipov in pogoste napake.
# Sklopi se ob vsaki gradnji znova preberejo iz razlag splošne mature, zato popravek
# razlage splošne mature velja tudi za poklicno (po ponovni gradnji).
import os, re

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
SM = os.path.join(KOREN, "public", "views", "matematika", "snov")
IZHOD = os.path.join(KOREN, "public", "views", "poklicna_matematika", "snov")

from snovi import SNOVI  # noqa: E402

VIRI = {
    "SM": "stevilske_mnozice/stevilske_mnozice", "A": "algebrski_izrazi_enacbe_neenacbe/algebrski_izrazi_enacbe_neenacbe",
    "PK": "potence_koreni/potence_koreni", "G": "geometrija_ravnina_prostor/geometrija_ravnina_prostor",
    "GT": "geometrijski_liki_telesa/geometrijski_liki_telesa", "KS": "pravokotni_koordinatni_sistem_ravnina/pravokotni_koordinatni_sistem_ravnina",
    "L": "funkcije/linearna", "Q": "funkcije/kvadratna", "PT": "funkcije/potencna", "P": "funkcije/polinomska",
    "R": "funkcije/racionalna", "E": "funkcije/eksponentna", "LG": "funkcije/logaritemska", "K": "funkcije/kotne",
    "Z": "zaporedja_vrste/zaporedja_vrste", "ST": "statistika/statistika", "D": "diferencialni_racun/diferencialni_racun",
    "KB": "kombinatorika/kombinatorika", "V": "verjetnostni_racun/verjetnostni_racun",
}

# Za vsako poglavje: uvod, sklopi (vir, številka sklopa), cilji iz kataloga, izpit, pogoste napake
POGLAVJA = {
    "stevila_deljivost": dict(
        uvod="Računanje z naravnimi in celimi števili je osnova vseh drugih nalog. Na poklicni maturi se pojavi kot kratka naloga v 1. delu pole: razcep na prafaktorje, največji skupni delitelj in najmanjši skupni večkratnik, pravila deljivosti in osnovni izrek o deljenju.",
        sklopi=[("SM", 1), ("SM", 2), ("SM", 4), ("SM", 5), ("SM", 6), ("SM", 7), ("SM", 8), ("SM", 10)],
        cilji=["računa z naravnimi, celimi, racionalnimi in realnimi števili ter uporablja zakonitosti računskih operacij",
               "pozna odnos deljivosti in urejenosti ter ugotovi, ali je število deljivo z 2, 3, 5, 9 in 10",
               "pozna praštevila in sestavljena števila ter dano število razcepi v produkt praštevil",
               "zapiše večkratnike in delitelje ter izračuna največji skupni delitelj in najmanjši skupni večkratnik",
               "pozna in uporablja osnovni izrek o deljenju"],
        izpit="Tipična naloga za 4 točke: razcepi dve števili, izračunaj D in v ter odgovori na vprašanje iz življenja (npr. po koliko minutah avtobusa spet odpeljeta hkrati).",
        napake=["Pri D vzameš prafaktorje z najvišjo potenco (to je v), pri v pa z najnižjo.",
                "Število 1 šteješ med praštevila.",
                "Pri pravilu za deljivost s 3 in 9 gledaš zadnjo števko namesto vsote števk.",
                "Pri osnovnem izreku o deljenju dobiš ostanek, ki je večji od delitelja ali negativen."]),
    "izrazi_potence": dict(
        uvod="Potence in algebrski izrazi so orodje za skoraj vsako nalogo na izpitu. Katalog zahteva računanje s potencami s celimi eksponenti, kvadriranje dvočlenika, razcep razlike kvadratov, Vietovo pravilo ter računanje z algebrskimi ulomki.",
        sklopi=[("PK", 1), ("PK", 2), ("A", 1), ("A", 2), ("A", 3), ("Q", 4), ("A", 4)],
        cilji=["računa s potencami z naravnimi in celimi eksponenti ter uporablja pravila za računanje z njimi",
               "računa z algebrskimi izrazi: potencira dvočlenik, razcepi razliko kvadratov, uporablja Vietovo pravilo",
               "računa s številskimi in algebrskimi ulomki"],
        izpit="Kratka naloga 1. dela: poenostavi izraz s potencami, razstavi izraz ali okrajšaj algebrski ulomek. Razcep pogosto potrebuješ tudi pri enačbah in neenačbah v drugih nalogah.",
        napake=["\\((a + b)^2\\) zapišeš kot \\(a^2 + b^2\\) in pozabiš na \\(2ab\\).",
                "Pri negativnem eksponentu potenco obrneš, predznak pa spremeniš: \\(2^{-3} \\neq -8\\).",
                "Ulomek krajšaš s seštevanci namesto s faktorji.",
                "Pred krajšanjem ne razstaviš števca in imenovalca."]),
    "ulomki_odstotki": dict(
        uvod="Ulomki, decimalni zapis, razmerja in odstotki so najbolj »življenjski« del izpita. V nalogah se skrivajo v cenah, popustih, receptih in tehničnih podatkih iz stroke.",
        sklopi=[("SM", 12), ("SM", 13), ("SM", 14), ("SM", 15)],
        cilji=["zapiše racionalno število z decimalno številko in periodično decimalno številko kot okrajšani ulomek",
               "računa z odstotki ter izračuna delež, osnovo in relativni delež",
               "uporablja sklepni račun (premo in obratno sorazmerje)"],
        izpit="Kratka naloga za 4 ali 5 točk: podražitev in pocenitev, razmerje mešanja, periodična decimalka v ulomek ali sklepni račun. Rezultat zapiši z enoto in odgovorom.",
        napake=["Po podražitvi za 20 % in pocenitvi za 20 % misliš, da je cena enaka kot na začetku.",
                "Odstotek računaš od nove vrednosti namesto od osnove.",
                "Pri obratnem sorazmerju (več delavcev, manj dni) uporabiš premo sorazmerje.",
                "Pri periodični decimalki odšteješ napačno število števk."]),
    "realna_stevila_koreni": dict(
        uvod="Realna števila prikažemo na številski premici in z intervali. Katalog zahteva zaokroževanje in ocenjevanje rezultata, računanje s kvadratnimi in kubičnimi koreni, delno korenjenje, racionalizacijo imenovalca, potence z racionalnimi eksponenti ter preproste enačbe in neenačbe z absolutno vrednostjo.",
        sklopi=[("SM", 16), ("SM", 17), ("SM", 18), ("SM", 19), ("SM", 20), ("SM", 21), ("PK", 3), ("PK", 4)],
        cilji=["predstavi realna števila kot točke in kot interval na številski premici",
               "zaokrožuje in oceni rezultat",
               "računa s kvadratnimi in kubičnimi koreni, delno koreni in racionalizira imenovalec",
               "reši preproste enačbe in neenačbe z absolutno vrednostjo",
               "računa s potencami z racionalnimi eksponenti in s koreni"],
        izpit="Naloga zahteva poenostavitev izraza s koreni ali racionalizacijo, zapis množice z intervalom ali enačbo z absolutno vrednostjo. Ne pozabi, da ima \\(|x| = a\\) pri \\(a > 0\\) dve rešitvi.",
        napake=["\\(\\sqrt{a + b}\\) razstaviš na \\(\\sqrt{a} + \\sqrt{b}\\).",
                "Pri enačbi z absolutno vrednostjo upoštevaš le pozitivno možnost.",
                "Pri intervalu zamenjaš oklepaj in oglati oklepaj (vključeno ali ne).",
                "Pri racionalizaciji pomnožiš le imenovalec, števca pa ne."]),
    "geometrija_ravnine": dict(
        uvod="Osnove ravninske geometrije: točke, premice, koti, trikotniki in štirikotniki, skladnost in podobnost ter koti v krogu. Na izpitu so pogosto konstrukcijske naloge, kjer moraš uporabljati geometrijsko orodje.",
        sklopi=[("G", 1), ("G", 2), ("G", 3), ("G", 4), ("G", 5), ("G", 6), ("G", 9), ("G", 10), ("G", 11), ("G", 13), ("G", 14)],
        cilji=["nariše premico, poltrak, daljico, simetralo, kot, krog in krožnico, lok, tetivo, tangento",
               "loči vrste trikotnikov in vrste kotov ter računa s koti, pretvarja stopinje v radiane",
               "uporablja skladnost in podobnost trikotnikov",
               "v nalogah uporablja lastnosti trikotnika, paralelograma in trapeza",
               "načrtuje like, trikotniku očrta in včrta krog, načrtuje tangento na krog",
               "pozna in uporablja lastnosti središčnega in obodnega kota"],
        izpit="Konstrukcijska naloga zahteva šestilo in geotrikotnik ter kratek opis postopka. Računske naloge zahtevajo vsoto kotov v trikotniku in mnogokotniku, podobnost ali obodni kot.",
        napake=["Pri konstrukciji ne uporabiš šestila in risbo samo »prerišeš«.",
                "Obodni kot je pol središčnega nad istim lokom, ne enak.",
                "Pri podobnosti primerjaš stranice, ki si ne ustrezajo.",
                "Pozabiš, da je vsota notranjih kotov n-kotnika \\((n - 2) \\cdot 180^\\circ\\)."]),
    "trikotnik_kotne": dict(
        uvod="Pravokotni trikotnik je najpogostejši lik na izpitu: Pitagorov izrek in kotne funkcije ostrih kotov rešita večino nalog. Za poljubni trikotnik uporabiš sinusni in kosinusni izrek.",
        sklopi=[("G", 12), ("K", 1), ("G", 15)],
        cilji=["uporablja Pitagorov izrek",
               "pozna kotne funkcije ostrih kotov v pravokotnem trikotniku in jih zna uporabljati",
               "uporablja sinusni in kosinusni izrek"],
        izpit="Naloga iz stroke: višina strehe, dolžina klančine, razdalja med točkama. Nariši skico, označi znane podatke in izberi pravo zvezo. Računalo naj bo v stopinjah.",
        napake=["Računalo je nastavljeno na radiane (RAD) namesto stopinj (DEG).",
                "Pitagorov izrek uporabiš v trikotniku, ki ni pravokoten.",
                "Pri sinusnem izreku pri iskanju kota spregledaš drugo možno rešitev (topi kot).",
                "Zamenjaš priležno in nasprotno kateto."]),
    "obsegi_ploscine": dict(
        uvod="Obseg in ploščina likov: paralelogram, trikotnik, trapez, deltoid, pravilni večkotnik, krog, krožni izsek in lok. Formule so priložene poli, pomembno pa je, da veš, kateri podatek je katera črka.",
        sklopi=[("GT", 1), ("GT", 2)],
        cilji=["pozna in računa obsege likov ter dolžino krožnega loka",
               "pozna enote za merjenje ploščine in pretvarja med njimi",
               "iz ustreznih podatkov izračuna ploščino, stranico, kot, obseg, višino, polmer očrtanega in včrtanega kroga"],
        izpit="Kratka naloga ali del sestavljene naloge: ploščina sestavljenega lika (npr. pravokotnik s polkrogom) ali obratna naloga (iz ploščine izračunaj stranico).",
        napake=["Pri pretvarjanju ploščine deliš s 100 namesto s 100 za vsak korak enote (\\(1\\,\\text{m}^2 = 10\\,000\\,\\text{cm}^2\\)).",
                "Pri ploščini trikotnika pozabiš na \\(\\frac{1}{2}\\).",
                "Za krožni izsek uporabiš premer namesto polmera.",
                "Pri trapezu vzameš krak namesto višine."]),
    "povrsine_prostornine": dict(
        uvod="Telesa iz kataloga so pokončna prizma, valj, piramida, stožec in krogla. Izračunaš površino in prostornino, pa tudi višino, stranski rob, telesno diagonalo, osni presek in kote v telesu.",
        sklopi=[("GT", 3), ("GT", 4), ("GT", 8)],
        cilji=["pozna enote za merjenje prostornine in pretvarja med njimi (tudi litre)",
               "pozna in uporablja lastnosti pokončnih teles in krogle",
               "izračuna višino telesa, stranski rob, osnovni rob, telesno diagonalo, plašč, ploščino osnega preseka, površino in prostornino",
               "izračuna kote, ki jih oklepajo robovi oziroma ploskve telesa"],
        izpit="Pogosta sestavljena naloga v 2. delu: rezervoar, posoda ali embalaža. Iz prostornine izračunaj višino, pretvori v litre in odgovori na vprašanje o polnjenju.",
        napake=["Pri piramidi in stožcu pozabiš na \\(\\frac{1}{3}\\).",
                "Višino stranske ploskve zamenjaš z višino telesa.",
                "\\(1\\,\\text{dm}^3 = 1\\,\\text{L}\\), \\(1\\,\\text{m}^3 = 1000\\,\\text{L}\\): pri pretvorbi se zmotiš za faktor 1000.",
                "Pri valju računaš plašč s polmerom namesto z obsegom osnovne ploskve."]),
    "linearna_funkcija": dict(
        uvod="Linearna funkcija \\(f(x) = kx + n\\) in premica sta najpogostejši funkciji na izpitu. Dodani so koordinatni sistem, razdalja med točkama, linearne enačbe in neenačbe, sistemi enačb in besedilne naloge.",
        sklopi=[("KS", 1), ("KS", 2), ("L", 1), ("L", 2), ("L", 4), ("L", 5), ("L", 6), ("L", 9)],
        cilji=["ponazori preproste množice točk in izračuna razdaljo med točkama v ravnini",
               "nariše graf linearne funkcije, pozna pomen koeficientov, zapiše ničlo in začetno vrednost",
               "zapiše enačbo premice v eksplicitni, implicitni in segmentni obliki ter pretvarja med njimi",
               "reši linearne enačbe in neenačbe ter sistem dveh in treh linearnih enačb",
               "reši besedilno nalogo z linearno enačbo ali sistemom dveh enačb"],
        izpit="Kratka naloga: enačba premice skozi dve točki, ničla in začetna vrednost, graf. Sestavljena naloga: besedilni problem s sistemom dveh enačb (npr. cena dveh izdelkov).",
        napake=["Pri neenačbi pozabiš obrniti znak, ko deliš z negativnim številom.",
                "Smerni koeficient izračunaš kot \\(\\frac{x_2 - x_1}{y_2 - y_1}\\) (obrnjeno).",
                "Pri segmentni obliki zamenjaš \\(m\\) in \\(n\\) (presečišči z osema).",
                "Pri sistemu enačb rešiš le eno neznanko in ne zapišeš rešitve kot para."]),
    "kvadratna_funkcija": dict(
        uvod="Kvadratna funkcija ima tri oblike zapisa: splošno, temensko in obliko za ničle. Iz vsake preberemo nekaj drugega. Katalog zahteva graf, kvadratno enačbo in neenačbo, presečišča in besedilne naloge.",
        sklopi=[("Q", 1), ("Q", 2), ("Q", 5), ("Q", 6), ("Q", 7), ("Q", 8)],
        cilji=["zapiše kvadratno funkcijo pri različnih podatkih",
               "izračuna ničli, teme in presečišče grafa z ordinatno osjo ter nariše graf",
               "pretvarja med temensko, splošno obliko in obliko za ničle",
               "reši kvadratno enačbo in besedilno nalogo s kvadratno enačbo",
               "izračuna presečišče parabole in premice ter dveh parabol",
               "reši kvadratno neenačbo"],
        izpit="Skoraj vsako leto je med sestavljenimi nalogami: zapiši funkcijo, izračunaj ničle in teme, nariši graf, reši neenačbo ali poišči presečišče s premico.",
        napake=["Pri temenu izračunaš \\(p = \\frac{b}{2a}\\) brez minusa.",
                "Pri diskriminanti \\(D < 0\\) zapišeš ničle, ki ne obstajajo.",
                "Pri neenačbi ne pogledaš, ali je parabola odprta navzgor ali navzdol.",
                "Graf narišeš brez označenih ničel, temena in začetne vrednosti."]),
    "polinomi_racionalna": dict(
        uvod="Potenčna funkcija, polinomi in racionalne funkcije. Pri polinomih je ključen Hornerjev algoritem za ničle, pri racionalnih funkcijah ničle, poli in vodoravna asimptota.",
        sklopi=[("PT", 1), ("PT", 2), ("P", 1), ("P", 2), ("P", 4), ("P", 6), ("P", 7), ("P", 8), ("P", 9), ("R", 1), ("R", 2), ("R", 3), ("R", 4)],
        cilji=["nariše graf potenčne funkcije z naravnim in negativnim celim eksponentom",
               "razcepi polinom, izračuna ničle in uporablja Hornerjev algoritem",
               "nariše graf polinoma in zapiše funkcijsko enačbo polinoma ob ustreznih podatkih",
               "reši polinomske neenačbe",
               "zapiše ničle, pole in vodoravne asimptote, nariše graf racionalne funkcije",
               "reši racionalne enačbe in neenačbe"],
        izpit="Sestavljena naloga: s Hornerjevim algoritmom poišči ničle polinoma, nariši graf in reši neenačbo. Pri racionalni funkciji izračunaj ničle, pole in asimptoto ter nariši graf.",
        napake=["Kandidate za cele ničle iščeš med delitelji vodilnega koeficienta namesto prostega člena.",
                "Pri Hornerju izpustiš potenco z ničelnim koeficientom.",
                "Pri sodi stopnji ničle graf »prebodeš« os namesto da se je dotakne.",
                "Pol zamenjaš z ničlo (pol je ničla imenovalca)."]),
    "eksponentna_logaritemska": dict(
        uvod="Eksponentna in logaritemska funkcija sta si inverzni. Katalog zahteva grafa, preproste eksponentne enačbe (skupna osnova, izpostavljanje), definicijo logaritma, pravila, prehod k novi osnovi in logaritemske enačbe.",
        sklopi=[("E", 1), ("E", 2), ("E", 4), ("LG", 1), ("LG", 2), ("LG", 3), ("LG", 4), ("LG", 5)],
        cilji=["nariše graf eksponentne in logaritemske funkcije",
               "reši preproste eksponentne enačbe (skupna osnova, izpostavljanje skupnega faktorja)",
               "pozna in uporablja definicijo logaritma in pravila za računanje z logaritmi",
               "reši preproste logaritemske enačbe (tudi z žepnim računalom)",
               "pozna desetiški in naravni logaritem"],
        izpit="Kratka naloga: reši eksponentno enačbo s skupno osnovo ali logaritemsko enačbo. Pri logaritemski enačbi preveri, ali rešitev ustreza definicijskemu območju.",
        napake=["\\(\\log(a + b)\\) razstaviš na \\(\\log a + \\log b\\).",
                "Pri logaritemski enačbi ne preveriš rešitve (logaritem negativnega števila ne obstaja).",
                "Pri grafu eksponentne funkcije narišeš ničlo; vodoravna asimptota je \\(y = 0\\).",
                "Ne zapišeš \\(2^{x+1}\\) kot \\(2 \\cdot 2^x\\), ko izpostavljaš."]),
    "kotne_funkcije_pm": dict(
        uvod="Kotne funkcije sinus, kosinus in tangens poljubnega kota, njihovi grafi, zveze med njimi in adicijski izreki. Kot med premicama izračunaš iz smernih koeficientov.",
        sklopi=[("K", 2), ("K", 3), ("K", 8), ("K", 5), ("L", 3)],
        cilji=["nariše grafe funkcij sinus, kosinus in tangens ter zapiše ničle in abscise ekstremov",
               "uporablja zveze med kotnimi funkcijami istega kota",
               "uporablja periodičnost, lihost in sodost ter adicijske izreke",
               "izračuna kot med premicama"],
        izpit="Kratka naloga: iz \\(\\sin \\alpha\\) izračunaj ostale kotne funkcije, poenostavi izraz z adicijskim izrekom ali izračunaj kot med premicama.",
        napake=["Pri \\(\\cos \\alpha\\) iz \\(\\sin \\alpha\\) ne preveriš predznaka v kvadrantu.",
                "\\(\\sin(\\alpha + \\beta)\\) zapišeš kot \\(\\sin \\alpha + \\sin \\beta\\).",
                "Ničle sinusa in kosinusa zamenjaš.",
                "Kot med premicama izračunaš kot topi kot (vzemi ostrega)."]),
    "zaporedja_pm": dict(
        uvod="Zaporedje je funkcija na naravnih številih. Katalog zahteva lastnosti in graf zaporedja, aritmetično in geometrijsko zaporedje, vsoto prvih n členov ter modeliranje z geometrijskim zaporedjem (eksponentna rast, obrestno-obrestni račun).",
        sklopi=[("Z", 1), ("Z", 2), ("Z", 3), ("Z", 4), ("Z", 5), ("Z", 9)],
        cilji=["opiše lastnosti zaporedja (naraščanje, padanje, omejenost) in nariše graf",
               "uporablja definicijo aritmetičnega in geometrijskega zaporedja",
               "izračuna vsoto n členov aritmetičnega in geometrijskega zaporedja",
               "uporablja geometrijsko zaporedje pri modeliranju (eksponentna rast, obrestno-obrestni račun)"],
        izpit="Pogosta naloga: iz dveh podatkov izračunaj prvi člen in diferenco ali količnik, nato določen člen ali vsoto. V 2. delu je pogosto obrestovanje ali rast.",
        napake=["Splošni člen \\(a_n = a_1 + nd\\) namesto \\(a_1 + (n - 1)d\\).",
                "Pri obrestovanju vzameš \\(q = p\\) namesto \\(q = 1 + \\frac{p}{100}\\).",
                "Vsoto geometrijskega zaporedja računaš s formulo za aritmetično.",
                "Pri omejenosti zaporedja navedeš le eno mejo."]),
    "statistika_pm": dict(
        uvod="Obdelava podatkov: populacija, vzorec in statistična spremenljivka, urejanje podatkov, frekvence, diagrami (krožni, stolpčni, linijski, histogram, škatla z brki) ter srednje vrednosti.",
        sklopi=[("ST", 1), ("ST", 2), ("ST", 4), ("ST", 5), ("ST", 6)],
        cilji=["uporablja osnovne statistične pojme (populacija, enota, vzorec, spremenljivka)",
               "uredi podatke ter uporablja absolutno in relativno frekvenco",
               "grafično prikaže podatke (krožni, stolpčni in linijski diagram, histogram, škatla z brki)",
               "zapiše srednje vrednosti (modus, mediana, aritmetična sredina)"],
        izpit="Naloga s preglednico podatkov: izračunaj relativne frekvence, nariši diagram, določi modus, mediano in povprečje ter jih primerjaj.",
        napake=["Mediano izračunaš iz neurejenih podatkov.",
                "Pri sodem številu podatkov vzameš le eno srednjo vrednost namesto povprečja dveh.",
                "Pri krožnem diagramu kot izračunaš iz absolutne frekvence brez deleža (\\(360^\\circ \\cdot f\\)).",
                "Modus zamenjaš z največjo vrednostjo namesto z najpogostejšo."]),
    "odvod_pm": dict(
        uvod="Odvod pove, kako hitro se funkcija spreminja. Katalog zahteva pravila za odvajanje osnovnih in sestavljenih funkcij, tangento v točki, naraščanje, padanje in ekstreme ter preproste ekstremalne probleme.",
        sklopi=[("D", 1), ("D", 2), ("D", 3), ("D", 4), ("D", 8)],
        cilji=["uporabi pravila za odvajanje osnovnih in sestavljenih funkcij",
               "z uporabo odvoda raziskuje lastnosti funkcij (naraščanje, padanje, ekstremi)",
               "zapiše enačbo tangente na graf funkcije v dani točki",
               "reši preproste ekstremalne probleme"],
        izpit="Kratka naloga: odvajaj funkcijo ali zapiši tangento. Sestavljena naloga: stacionarne točke polinoma, naraščanje in padanje, graf, ali ekstremalni problem (največja ploščina, najmanjši obseg).",
        napake=["Pri odvodu produkta odvajaš vsak faktor posebej in ju zmnožiš.",
                "Tangenta: smerni koeficient je \\(f'(x_0)\\), ne \\(f(x_0)\\).",
                "Stacionarno točko razglasiš za ekstrem, ne da bi preveril spremembo predznaka odvoda.",
                "Pri ekstremalnem problemu ne zapišeš funkcije ene spremenljivke."]),
    "kombinatorika_verjetnost": dict(
        uvod="Kombinatorika šteje možnosti, verjetnost pa iz njih izračuna, kako verjeten je dogodek. Katalog zahteva osnovni izrek kombinatorike, pravilo vsote, drevo, permutacije, variacije in kombinacije brez ponavljanja, variacije s ponavljanjem ter verjetnost slučajnega dogodka.",
        sklopi=[("KB", 1), ("KB", 2), ("KB", 3), ("KB", 5), ("KB", 6), ("KB", 7), ("V", 1), ("V", 2), ("V", 3), ("V", 4)],
        cilji=["pozna in uporablja osnovni izrek kombinatorike in pravilo vsote ter kombinatorično drevo",
               "pozna permutacije, kombinacije in variacije brez ponavljanja ter variacije s ponavljanjem in izračuna njihovo število",
               "izračuna verjetnost slučajnega dogodka"],
        izpit="Kratka naloga: koliko kod, ekip ali razporeditev je mogočih in kolikšna je verjetnost, da izberemo določeno. Najprej ugotovi, ali je vrstni red pomemben in ali se elementi ponavljajo.",
        napake=["Uporabiš variacije, ko vrstni red ni pomemben (izbira ekipe).",
                "Pri številih pozabiš, da prva števka ne sme biti 0.",
                "Verjetnost je večja od 1 ali negativna (preveri rezultat).",
                "Pri »vsaj eden« ne uporabiš nasprotnega dogodka."]),
}

GLAVA = """<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{naslov} — razlaga za poklicno maturo | Učilnica.com</title>
  <meta name="description" content="{opis}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>
  <link rel="stylesheet" href="/style/snov.css">
</head>
<body>
  <div id="header"></div>

  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">
"""
NOGA = """
      </div>
    </div>
  </div>

  <div id="footer"></div>

  <script src="/components/components.js"></script>
</body>
</html>
"""

_cache = {}


def vir(kljuc):
    if kljuc not in _cache:
        pot = os.path.join(SM, VIRI[kljuc] + "_razlaga.html")
        _cache[kljuc] = open(pot, encoding="utf-8").read()
    return _cache[kljuc]


def sklop_html(kljuc, st):
    s = vir(kljuc)
    m = re.search(rf'<section class="sklop[^"]*" id="sklop-{st}">', s)
    if not m:
        raise KeyError(f"{kljuc}: sklop {st} ne obstaja")
    konec = s.index("</section>", m.end())
    telo = s[m.start():konec + len("</section>")]
    assert "<section" not in telo[1:], (kljuc, st)
    return telo


def kljuc_vrstice(kljuc):
    """{številka tipa: opis iz ključa strani splošne mature}"""
    return {int(n): t for t, n in re.findall(r'<tr><td>(.*?)</td><td><a href="#tip-(\d+)">', vir(kljuc))}


def predelaj(slug, stevilka, i, kljuc, st, tip_od):
    """Sklop iz razlage splošne mature prestavi na stran poklicne mature: nove številke sklopa
    in tipov, edinstveni id-ji slik, brez oznak višje ravni."""
    h = sklop_html(kljuc, st)
    stari = [int(n) for n in re.findall(r'class="tip-naloge" id="tip-(\d+)"', h)]
    preslikava = {n: tip_od + j for j, n in enumerate(stari)}
    h = re.sub(r'<section class="sklop[^"]*" id="sklop-\d+">', f'<section class="sklop" id="sklop-{i}">', h, count=1)
    h = re.sub(r'<span class="sklop-num">[^<]*</span>', f'<span class="sklop-num">{stevilka} · {i}</span>', h, count=1)
    h = re.sub(r'\s*<span class="badge-vr">[^<]*</span>', "", h)
    h = h.replace("sklop--visja", "sklop")

    def tip(m):
        n = int(m.group(1))
        return m.group(0).replace(str(n), str(preslikava.get(n, n)), 1) if n in preslikava else m.group(0)
    h = re.sub(r'id="tip-(\d+)"', tip, h)
    h = re.sub(r'href="#tip-(\d+)"', tip, h)
    h = re.sub(r'<h4>Tip (\d+):', lambda m: f"<h4>Tip {preslikava.get(int(m.group(1)), m.group(1))}:", h)
    # id-ji slik (markerji, gradienti) naj bodo edinstveni na strani
    for ident in set(re.findall(r'\bid="([^"]+)"', h)):
        if re.fullmatch(r"(sklop|tip)-\d+", ident):
            continue
        novi = f"{kljuc.lower()}{st}-{ident}"
        h = re.sub(rf'(\bid=")({re.escape(ident)})(")', rf"\g<1>{novi}\3", h)
        h = h.replace(f"url(#{ident})", f"url(#{novi})").replace(f'href="#{ident}"', f'href="#{novi}"')
    # povezave na druge sklope in strani splošne mature ostanejo veljavne (absolutne poti)
    h = re.sub(r'href="#sklop-\d+"', 'href="#kazalo"', h)
    return h, [(n, preslikava[n]) for n in stari]


def naslov_sklopa(h):
    m = re.search(r"<h2>(.*?)</h2>", h, re.S)
    return re.sub(r"<[^>]+>", "", m.group(1)).strip()


def zgradi(slug, stevilka, naslov, opis):
    p = POGLAVJA[slug]
    sklopi, kljuci, tip_od = [], [], 1
    for i, (kljuc, st) in enumerate(p["sklopi"], 1):
        h, tipi = predelaj(slug, stevilka, i, kljuc, st, tip_od)
        vrstice = kljuc_vrstice(kljuc)
        for star, nov in tipi:
            kljuci.append((vrstice.get(star) or naslov_tipa(h, nov), nov))
        tip_od += len(tipi)
        sklopi.append(h)
    n_tipov = tip_od - 1
    kazalo = "".join(f'\n            <li><a href="#sklop-{i}"><span class="kazalo-st">{i}</span> {naslov_sklopa(h)}</a></li>' for i, h in enumerate(sklopi, 1))
    cilji = "".join(f"\n              <li>{c}</li>" for c in p["cilji"])
    napake = "".join(f"\n              <li>{n}</li>" for n in p["napake"])
    vrstice = "".join(f'\n                  <tr><td>{t}</td><td><a href="#tip-{n}">Tip {n}</a></td></tr>' for t, n in kljuci)
    telo = f"""
        <header class="page-header">
          <span class="page-eyebrow">Poklicna matura · Matematika · Snov · {stevilka}</span>
          <h1>{naslov}</h1>
          <p>{p["uvod"]} Pod razlago vsakega podpoglavja so vsi tipi nalog z univerzalnim postopkom in primeri.</p>
          <div class="page-meta">
            <div class="page-meta-item"><strong>{len(sklopi)}</strong><span>Podpoglavij</span></div>
            <div class="page-meta-item"><strong>{n_tipov}</strong><span>Tipov nalog</span></div>
            <div class="page-meta-item"><strong>~{max(10, 5 * len(sklopi))} min</strong><span>Branja</span></div>
          </div>
        </header>

        <div class="matura-formule">
          <h3>Kaj preverja izpitni katalog</h3>
          <p>Po predmetnem izpitnem katalogu za poklicno maturo kandidat:</p>
          <ul>{cilji}
          </ul>
          <p><strong>Na izpitu:</strong> {p["izpit"]} Formule iz kataloga so priložene izpitni poli.</p>
        </div>

        <nav class="kazalo" id="kazalo" aria-label="Podpoglavja">
          <h2>Podpoglavja</h2>
          <ol>{kazalo}
            <li><a href="#kljuc"><span class="kazalo-st">?</span> Ključ: kateri tip naloge je to?</a></li>
          </ol>
        </nav>

""" + "\n\n".join(f"        <!-- SKLOP {i} -->\n        " + h for i, h in enumerate(sklopi, 1)) + f"""

        <section class="subsection" id="kljuc">
          <div class="subsection-head">
            <h2>Ključ: kateri tip naloge je to?</h2>
            <p>Poišči besedo iz navodila naloge in skoči na pravi postopek.</p>
          </div>
          <div class="info-card">
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>V besedilu naloge piše …</th><th>Tip</th></tr></thead>
                <tbody>{vrstice}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Pogoste napake</h2>
          </div>
          <div class="info-card">
            <ul>{napake}
            </ul>
          </div>
        </section>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Vadi naprej</h2>
            <p>Ko predelaš razlago, preveri znanje z nalogami.</p>
          </div>
          <div class="link-list">
            <a class="link-item" href="/views/poklicna_matematika/naloge/naloge.html?snov={slug}">
              <span class="link-item-text">
                <strong>Naloge za vajo</strong>
                <small>Naloge iz tega poglavja z rešitvami in postopki</small>
              </span>
              <span class="arrow">→</span>
            </a>
            <a class="link-item" href="/views/poklicna_matematika/matura/po_snovi/naloge.html?poglavje={slug}">
              <span class="link-item-text">
                <strong>Maturitetne naloge iz te snovi</strong>
                <small>Naloge iz pol poklicne mature</small>
              </span>
              <span class="arrow">→</span>
            </a>
          </div>
        </section>
"""
    pot = os.path.join(IZHOD, slug, f"{slug}_razlaga.html")
    os.makedirs(os.path.dirname(pot), exist_ok=True)
    with open(pot, "w", encoding="utf-8") as f:
        f.write(GLAVA.format(naslov=naslov, opis=f"{naslov} za poklicno maturo iz matematike: {opis}") + telo + NOGA)
    return len(sklopi), n_tipov


def naslov_tipa(h, n):
    m = re.search(rf'id="tip-{n}">\s*<h4>Tip {n}: (.*?)</h4>', h, re.S)
    return m.group(1) if m else f"Tip {n}"


if __name__ == "__main__":
    for i, (sklop, slug, naslov, opis) in enumerate(SNOVI["poklicna_matematika"], 1):
        s, t = zgradi(slug, f"4.{i}", naslov, opis)
        print(f"4.{i} {slug}: {s} sklopov, {t} tipov")
