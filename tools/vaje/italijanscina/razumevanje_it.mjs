import { odlomki, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  odlomki(serija, "odlomki", [
    { besedilo: "Ogni estate Giulia passa due settimane dai nonni in Puglia. La loro casa si trova vicino al mare. La mattina aiuta la nonna nell'orto, il pomeriggio va in bicicletta con il cugino Matteo. Quest'anno però ha fatto molto caldo, così sono andati quasi ogni giorno in spiaggia.", vprasanja: [
      ["Kje živijo Giulijini stari starši?", "v Apuliji, blizu morja", ["v Rimu", "v Alpah", "na Siciliji"], 1],
      ["Kaj Giulia počne zjutraj?", "pomaga babici na vrtu", ["kolesari", "plava", "bere"], 1],
      ["Zakaj so letos skoraj vsak dan šli na plažo?", "ker je bilo zelo vroče", ["ker je deževalo", "ker je Matteo bolan", "ker so imeli novo hišo"], 2],
      ["Kdo je Matteo?", "Giulijin bratranec", ["Giulijin brat", "sosed", "sošolec"], 2],
    ] },
    { besedilo: "Secondo un recente sondaggio, i giovani italiani trascorrono in media quattro ore al giorno sui social network. Gli psicologi sono preoccupati soprattutto per il sonno: un ragazzo su tre ammette di usare il telefono dopo mezzanotte. Alcune scuole hanno quindi vietato i cellulari in classe, una scelta che divide i genitori.", vprasanja: [
      ["Koliko časa na dan mladi v povprečju preživijo na družbenih omrežjih?", "štiri ure", ["dve uri", "šest ur", "eno uro"], 2],
      ["Kaj najbolj skrbi psihologe?", "spanje", ["ocene", "stroški", "vid"], 2],
      ["Kolikšen delež mladih uporablja telefon po polnoči?", "tretjina", ["polovica", "četrtina", "skoraj vsi"], 3],
      ["Kako starši sprejemajo prepoved telefonov?", "mnenja so deljena", ["vsi jo podpirajo", "vsi so proti", "zanjo ne vedo"], 4, "visja"],
    ] },
    { besedilo: "Gentile Direttore, Le scrivo in merito all'annuncio pubblicato sul Vostro sito. Sono una studentessa di economia e vorrei svolgere uno stage presso la Vostra azienda nei mesi di luglio e agosto. Parlo correntemente l'inglese e ho una buona conoscenza del tedesco. In allegato trova il mio curriculum. In attesa di un Suo cortese riscontro, porgo distinti saluti.", vprasanja: [
      ["Kakšno besedilo je to?", "prošnja za prakso", ["pritožba", "vabilo", "pismo prijateljici"], 2],
      ["Kaj študira piska?", "ekonomijo", ["turizem", "jezike", "pravo"], 1],
      ["Katere jezike obvlada?", "tekoče angleško, dobro nemško", ["tekoče nemško, malo angleško", "samo italijansko", "francosko in angleško"], 3],
      ["Kaj pomeni »in allegato«?", "v prilogi", ["spodaj", "takoj", "skupaj"], 4, "visja"],
    ] },
    { besedilo: "Il Giro d'Italia, nato nel 1909, è una delle corse ciclistiche più famose al mondo. Si svolge in maggio e dura circa tre settimane. Il ciclista primo in classifica indossa la maglia rosa, colore della carta del giornale che organizzò la prima edizione.", vprasanja: [
      ["Kdaj je nastal Giro d'Italia?", "leta 1909", ["leta 1903", "leta 1990", "leta 1919"], 1],
      ["V katerem mesecu poteka?", "maja", ["julija", "junija", "aprila"], 2],
      ["Kakšne barve majico nosi vodilni?", "rožnate", ["rumene", "zelene", "modre"], 1],
      ["Zakaj je majica take barve?", "takšne barve je bil papir časopisa, ki je organiziral prvo dirko", ["to je barva Rima", "to je barva zastave", "izbrali so jo navijači"], 4, "visja"],
    ] },
    { besedilo: "Ieri sera Luca doveva incontrare Sara davanti al cinema alle otto. Ma il suo autobus è rimasto bloccato nel traffico per un'ora. Siccome il cellulare era scarico, non ha potuto avvisarla. Quando finalmente è arrivato, Sara era già tornata a casa. Il giorno dopo le ha portato un mazzo di fiori per scusarsi.", vprasanja: [
      ["Zakaj je Luca zamudil?", "avtobus je obtičal v prometu", ["zaspal je", "pozabil je", "izgubil se je"], 2],
      ["Zakaj ni obvestil Sare?", "telefon je bil prazen", ["ni imel številke", "ni hotel", "ni imel denarja"], 2],
      ["Kaj je naredila Sara?", "odšla je domov", ["sama je šla v kino", "čakala ga je", "poklicala ga je"], 3],
      ["Kako se je Luca opravičil?", "prinesel ji je šopek rož", ["napisal ji je pismo", "povabil jo je na večerjo", "takoj jo je poklical"], 3],
    ] },
    { besedilo: "Sempre più italiani scelgono di trasferirsi nei piccoli borghi. Grazie allo smart working, molti lavoratori lasciano le grandi città, dove gli affitti sono cari. Tuttavia i nuovi abitanti si lamentano spesso della mancanza di trasporti pubblici e di servizi sanitari.", vprasanja: [
      ["Kaj omogoča selitev v majhne kraje?", "delo na daljavo", ["višje plače", "nove ceste", "državne subvencije"], 2],
      ["Zakaj ljudje zapuščajo velika mesta?", "ker so najemnine drage", ["zaradi hrupa", "zaradi kriminala", "zaradi vremena"], 3],
      ["Česa novim prebivalcem primanjkuje?", "javnega prevoza in zdravstvenih storitev", ["trgovin in šol", "interneta", "delovnih mest"], 3],
      ["Kaj izraža »tuttavia«?", "nasprotje (vendar)", ["vzrok (ker)", "posledico (zato)", "čas (medtem)"], 4, "visja"],
    ] },
  ]);
  pomeni(serija, "povezovalci", [["tuttavia", "vendar"], ["quindi", "torej"], ["perché", "ker, zakaj"], ["eppure", "pa vendar"], ["prima di tutto", "najprej"], ["poi", "nato"], ["infine", "končno"], ["mentre", "medtem ko"], ["grazie a", "zahvaljujoč"], ["a causa di", "zaradi"], ["invece", "pa, namesto"], ["cioè", "to je"], ["secondo", "po (mnenju)"], ["nonostante", "kljub"]], { tez: 2, n: 26 });
}
