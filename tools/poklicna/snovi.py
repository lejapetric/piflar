# Poglavja (snovi) poklicne mature. python3 tools/poklicna/snovi.py jih zapiše na konec api/data/snovi.json
# (obstoječe vrstice poklicne mature zamenja). Slugi morajo biti edinstveni v celotni datoteki.
import json, os

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")

SNOVI = {
  "poklicna_matematika": [
    (1, "stevila_deljivost", "Naravna in cela števila, deljivost", "Računske operacije, deljivost, praštevila, D in v, osnovni izrek o deljenju."),
    (1, "izrazi_potence", "Potence in algebrski izrazi", "Potence s celimi eksponenti, kvadrat dvočlenika, razlika kvadratov, Vietovo pravilo, algebrski ulomki."),
    (1, "ulomki_odstotki", "Ulomki, razmerja in odstotki", "Racionalna števila, periodične decimalke, razmerja, sklepni račun, odstotki."),
    (1, "realna_stevila_koreni", "Realna števila, koreni in absolutna vrednost", "Intervali, zaokroževanje, koreni, racionalizacija, absolutna vrednost, racionalni eksponenti."),
    (2, "geometrija_ravnine", "Osnove geometrije v ravnini", "Koti, trikotniki, skladnost, podobnost, središčni in obodni kot, konstrukcije."),
    (2, "trikotnik_kotne", "Pravokotni trikotnik, sinusni in kosinusni izrek", "Pitagorov izrek, kotne funkcije ostrih kotov, sinusni in kosinusni izrek."),
    (2, "obsegi_ploscine", "Obsegi in ploščine likov", "Paralelogram, trikotnik, trapez, deltoid, pravilni večkotnik, krog in njegovi deli."),
    (2, "povrsine_prostornine", "Površine in prostornine teles", "Prizma, valj, piramida, stožec in krogla; osni presek, diagonale, koti v telesu."),
    (3, "linearna_funkcija", "Linearna funkcija in linearne enačbe", "Koordinatni sistem, razdalja, premica, linearne enačbe, neenačbe in sistemi."),
    (3, "kvadratna_funkcija", "Kvadratna funkcija in kvadratna enačba", "Ničli, teme, tri oblike zapisa, graf, kvadratna enačba in neenačba, presečišča."),
    (3, "polinomi_racionalna", "Potenčna funkcija, polinomi in racionalna funkcija", "Potenčna funkcija, Hornerjev algoritem, ničle in graf polinoma, racionalna funkcija."),
    (4, "eksponentna_logaritemska", "Eksponentna in logaritemska funkcija", "Grafa, eksponentne enačbe, logaritem in pravila, logaritemske enačbe."),
    (4, "kotne_funkcije_pm", "Kotne funkcije", "Grafi sinusa, kosinusa in tangensa, zveze med kotnimi funkcijami, adicijski izreki."),
    (5, "zaporedja_pm", "Zaporedja", "Lastnosti in graf zaporedja, aritmetično in geometrijsko zaporedje, obrestni račun."),
    (5, "statistika_pm", "Obdelava podatkov", "Statistični pojmi, frekvence, diagrami, škatla z brki, modus, mediana in povprečje."),
    (6, "odvod_pm", "Diferencialni račun", "Pravila za odvajanje, tangenta, naraščanje, ekstremi in ekstremalni problemi."),
    (6, "kombinatorika_verjetnost", "Kombinatorika in verjetnost", "Osnovni izrek, drevo, permutacije, variacije, kombinacije, verjetnost dogodka."),
  ],
  "poklicna_slovenscina": [
    (1, "izpit_pm_slovenscina", "Izpit iz slovenščine na poklicni maturi", "Zgradba izpita, točkovanje izpitnih pol in ustnega izpita, priprava."),
    (1, "razclemba_besedila", "Razčlemba neumetnostnega besedila", "Okoliščine nastanka, tema, namen, vrsta besedila, pomensko razmerje, razvijanje teme."),
    (1, "publicisticna_strokovna", "Publicistična in strokovna besedila", "Novica, poročilo, intervju, ocena, komentar, članek, opis postopka in naprave."),
    (1, "uradna_javna_besedila", "Uradni dopisi in javna besedila", "Prošnja, vabilo, zahvala, opravičilo, pritožba, prijava, življenjepis, zapisnik, obvestilo."),
    (1, "tvorba_besedila", "Tvorba krajšega neumetnostnega besedila", "Naloga odprtega tipa v izpitni poli 1: načrt, zgradba, naslovje, merila."),
    (2, "besedje_pm", "Besedje in poimenovalna zmožnost", "Sopomenke, nadpomenke, frazemi, prevzete besede, tvorjenke, blizuzvočnice, slovarji."),
    (2, "skladnja_pm", "Skladnja in povedi", "Stavčni členi, priredje in podredje, odvisniki, tvorni in trpni stavek, premi govor."),
    (2, "pravopis_slog_pm", "Pravopis, pravorečje in slog", "Velika začetnica, ločila, pisanje skupaj in narazen, knjižni izgovor, jezikovne zvrsti."),
    (2, "jezik_v_druzbi", "Slovenščina v družbi in skozi čas", "Vloge jezika, položaj slovenščine, jezikovne družine, razvoj knjižnega jezika."),
    (3, "interpretacija_pm", "Interpretacija umetnostnega besedila", "Izpitna pola 2: zgradba interpretacije, elementi in merila, primer interpretacije."),
    (3, "knjizevnost_do_razsvetljenstva", "Od starega Orienta do razsvetljenstva", "Biblija, antika, srednji vek, ljudsko slovstvo, renesansa, reformacija, barok, razsvetljenstvo."),
    (3, "romantika_realizem_pm", "Romantika in realizem", "Evropska in slovenska romantika, Prešeren, realizem in naturalizem, Jenko, Jurčič, Kersnik, Tavčar."),
    (3, "moderna_pm", "Moderna", "Evropska moderna in slovenska moderna: Kette, Murn, Župančič, Cankar."),
    (3, "knjizevnost_prva_polovica", "Prva polovica 20. stoletja", "Kafka, Kosovel, Pregelj, Grum, Prežihov Voranc, Kranjec, Kajuh."),
    (3, "knjizevnost_druga_polovica", "Druga polovica 20. stoletja in sodobnost", "Gledališče absurda, sodobna slovenska poezija, proza in dramatika."),
  ],
  "poklicna_kemija": [
    (1, "zmesi_laboratorij", "Snovi, zmesi in laboratorijsko delo", "Čiste snovi in zmesi, disperzni sistemi, ločevanje, laboratorijski inventar, piktogrami."),
    (1, "atom_periodni_sistem", "Zgradba atoma in periodni sistem", "Protoni, nevtroni, elektroni, izotopi, radioaktivnost, elektronska ovojnica, periodičnost."),
    (1, "vezi_zgradba_molekul", "Kemijske vezi in zgradba molekul", "Ionska, kovalentna in kovinska vez, oblika in polarnost molekul, medmolekulske sile."),
    (3, "agregatna_stanja", "Trdne snovi, tekočine in plini", "Kristali, fazni diagram vode, parni tlak, plinski zakoni in splošna plinska enačba."),
    (3, "raztopine_pm", "Raztopine", "Topilo in topljenec, topnost, raztapljanje, koligativne lastnosti raztopin."),
    (1, "anorganska_nomenklatura", "Oksidacijska števila in anorganska nomenklatura", "Oksidacijska števila, imena oksidov, kislin, hidroksidov in soli."),
    (3, "reakcije_energija", "Kemijska reakcija in energija", "Vrste reakcij, urejanje enačb, entalpija, energijski diagram, 1. zakon termodinamike."),
    (3, "hitrost_ravnotezje", "Hitrost reakcije in kemijsko ravnotežje", "Hitrost in dejavniki, konstanta ravnotežja, Le Chatelierovo načelo."),
    (3, "kisline_baze_pm", "Kisline, baze in pH", "Protolitske reakcije, močni in šibki elektroliti, pH in pOH, stopnja protolize, soli."),
    (3, "redoks_elektrokemija", "Redoks reakcije in elektrokemija", "Oksidacija in redukcija, urejanje, redoks vrsta, galvanski člen, elektroliza."),
    (2, "mnozina_stehiometrija", "Množina snovi in stehiometrija", "Množina, masa, število delcev, masni delež, prebitek, izkoristek."),
    (2, "racunanje_raztopine", "Računanje z raztopinami in plini", "Sestava raztopin, preračunavanje koncentracij, redčenje, plinski zakoni v računih."),
    (1, "zrak_voda_nekovine", "Zrak, voda in nekovine", "Kisik, vodik, trdota vode, onesnaževanje, halogeni, žveplo, dušik, ogljik, silikati."),
    (1, "kovine_pm", "Kovine", "Alkalijske in zemljoalkalijske kovine, natrijeve in kalcijeve spojine, železo, aluminij."),
    (4, "ogljikovodiki_pm", "Organske spojine in ogljikovodiki", "Formule, nomenklatura, izomerija, alkani, alkeni, alkini, aromati, organske reakcije."),
    (4, "halogenirani_kisikove", "Halogenirani ogljikovodiki in kisikove spojine", "Halogenoalkani, alkoholi, aldehidi, ketoni, karboksilne kisline in derivati."),
    (4, "biomolekule_pm", "Ogljikovi hidrati, lipidi in dušikove spojine", "Monosaharidi, disaharidi, polisaharidi, maščobe, milo, amini, aminokisline, beljakovine."),
    (4, "polimeri_pm", "Polimeri", "Monomer in polimer, adicijska in kondenzacijska polimerizacija, uporaba in okolje."),
  ],
}

if __name__ == "__main__":
    pot = os.path.join(KOREN, "api", "data", "snovi.json")
    snovi = [s for s in json.load(open(pot, encoding="utf-8")) if not s["predmet"].startswith("poklicna_")]
    obstojeci = {s["slug"] for s in snovi}
    for predmet, seznam in SNOVI.items():
        for i, (sklop, slug, naslov, opis) in enumerate(seznam, 1):
            assert slug not in obstojeci, f"slug {slug} že obstaja"
            obstojeci.add(slug)
            snovi.append({"predmet": predmet, "stevilka": f"4.{i}", "slug": slug, "sklop": sklop, "naslov": naslov, "opis": opis})
    with open(pot, "w", encoding="utf-8") as f:
        f.write("[\n" + ",\n".join("  { " + json.dumps(s, ensure_ascii=False)[1:-1] + " }" for s in snovi) + "\n]\n")
    print(len(snovi), "snovi")
