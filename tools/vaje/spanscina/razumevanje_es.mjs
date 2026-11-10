import { odlomki, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  odlomki(serija, "odlomki", [
    { besedilo: "Todos los veranos, Lucía pasa dos semanas en casa de sus abuelos en Galicia. Su casa está cerca del mar. Por la mañana ayuda a su abuela en el huerto y por la tarde monta en bici con su primo Diego. Este año ha llovido mucho, así que han jugado sobre todo a las cartas.", vprasanja: [
      ["Kje živijo Lucíini stari starši?", "v Galiciji, blizu morja", ["v Madridu", "v gorah", "na Kanarskih otokih"], 1],
      ["Kaj Lucía počne zjutraj?", "pomaga babici na vrtu", ["kolesari", "plava", "igra karte"], 1],
      ["Zakaj sta letos predvsem igrala karte?", "ker je veliko deževalo", ["ker je bilo prevroče", "ker je Diego bolan", "ker nimata koles"], 2],
      ["Kdo je Diego?", "Lucíin bratranec", ["Lucíin brat", "sosed", "sošolec"], 2],
    ] },
    { besedilo: "Según una encuesta reciente, los jóvenes españoles pasan una media de tres horas y media al día en las redes sociales. A los expertos les preocupa sobre todo el sueño: uno de cada dos adolescentes reconoce mirar el móvil después de medianoche. Por eso, varios institutos han prohibido los móviles en clase, una medida que divide a los padres.", vprasanja: [
      ["Koliko časa na dan mladi v povprečju preživijo na omrežjih?", "tri ure in pol", ["dve uri", "pet ur", "eno uro"], 2],
      ["Kaj strokovnjake najbolj skrbi?", "spanje", ["ocene", "stroški", "vid"], 2],
      ["Kolikšen delež najstnikov gleda telefon po polnoči?", "polovica", ["tretjina", "četrtina", "skoraj vsi"], 3],
      ["Kako starši sprejemajo prepoved telefonov?", "mnenja so deljena", ["vsi jo podpirajo", "vsi so proti", "zanjo ne vedo"], 4, "visja"],
    ] },
    { besedilo: "Estimados señores: Me dirijo a ustedes en relación con el anuncio publicado en su página web. Soy estudiante de turismo y me gustaría realizar unas prácticas en su agencia durante los meses de julio y agosto. Hablo inglés con fluidez y tengo conocimientos básicos de francés. Les adjunto mi currículum. A la espera de su respuesta, les saluda atentamente, Pablo Ruiz.", vprasanja: [
      ["Kakšno besedilo je to?", "prošnja za prakso", ["pritožba", "vabilo", "osebno pismo prijatelju"], 2],
      ["Kaj študira Pablo?", "turizem", ["jezike", "ekonomijo", "pravo"], 1],
      ["Katere jezike obvlada?", "tekoče angleško, osnove francoščine", ["tekoče francosko, malo angleško", "samo špansko", "nemško in angleško"], 3],
      ["Kaj pomeni »les adjunto«?", "pošiljam vam v prilogi", ["podpisujem", "odgovarjam vam", "vabim vas"], 4, "visja"],
    ] },
    { besedilo: "La Tomatina se celebra cada año el último miércoles de agosto en Buñol, un pequeño pueblo de Valencia. Durante una hora, miles de personas se lanzan tomates maduros por las calles. La fiesta empezó en 1945 y hoy atrae a visitantes de todo el mundo. Desde 2013 hay que comprar una entrada para participar.", vprasanja: [
      ["Kdaj poteka La Tomatina?", "zadnjo sredo v avgustu", ["prvo nedeljo v juliju", "vsak dan v avgustu", "spomladi"], 2],
      ["Koliko časa traja metanje paradižnikov?", "eno uro", ["ves dan", "deset minut", "tri ure"], 1],
      ["Kdaj se je praznik začel?", "leta 1945", ["leta 2013", "leta 1495", "leta 1954"], 2],
      ["Kaj velja od leta 2013?", "za udeležbo je treba kupiti vstopnico", ["praznik je prepovedan", "poteka v Valencii", "udeležijo se lahko samo domačini"], 3],
    ] },
    { besedilo: "Ayer por la tarde, Carlos había quedado con Elena delante del cine a las ocho. Pero su autobús se quedó parado en un atasco durante una hora. Como tenía el móvil sin batería, no pudo avisarla. Cuando por fin llegó, Elena ya se había ido a casa. Al día siguiente le llevó un ramo de flores para pedirle perdón.", vprasanja: [
      ["Zakaj je Carlos zamudil?", "avtobus je obtičal v zastoju", ["zaspal je", "pozabil je", "izgubil se je"], 2],
      ["Zakaj ni obvestil Elene?", "telefon je imel prazno baterijo", ["ni imel njene številke", "ni hotel", "ni imel denarja"], 2],
      ["Kaj je storila Elena?", "odšla je domov", ["sama je šla v kino", "čakala ga je", "poklicala ga je"], 3],
      ["Kako se je Carlos opravičil?", "prinesel ji je šopek rož", ["napisal ji je pismo", "povabil jo je na večerjo", "takoj jo je poklical"], 3],
    ] },
    { besedilo: "Cada vez más españoles deciden mudarse a pueblos pequeños. Gracias al teletrabajo, muchos trabajadores dejan las grandes ciudades, donde los alquileres son muy caros. Sin embargo, los nuevos vecinos se quejan a menudo de la falta de transporte público y de médicos.", vprasanja: [
      ["Kaj omogoča selitev v majhne vasi?", "delo na daljavo", ["višje plače", "nove ceste", "državne subvencije"], 2],
      ["Zakaj ljudje zapuščajo velika mesta?", "ker so najemnine zelo drage", ["zaradi hrupa", "zaradi kriminala", "zaradi vremena"], 3],
      ["Česa novim prebivalcem primanjkuje?", "javnega prevoza in zdravnikov", ["trgovin in šol", "interneta", "delovnih mest"], 3],
      ["Kaj izraža »sin embargo«?", "nasprotje (vendar)", ["vzrok (ker)", "posledico (zato)", "čas (medtem)"], 4, "visja"],
    ] },
  ]);
  pomeni(serija, "povezovalci", [["sin embargo", "vendar"], ["por lo tanto", "torej"], ["porque", "ker"], ["aun así", "kljub temu"], ["en primer lugar", "najprej"], ["después", "nato"], ["por último", "nazadnje"], ["mientras que", "medtem ko (nasprotje)"], ["gracias a", "zahvaljujoč"], ["a causa de", "zaradi"], ["en cambio", "po drugi strani"], ["es decir", "to je"], ["según", "po (mnenju)"], ["a pesar de", "kljub"]], { tez: 2, n: 26 });
}
