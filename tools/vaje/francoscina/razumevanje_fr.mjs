import { odlomki, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  odlomki(serija, "odlomki", [
    { besedilo: "Chaque été, Léa passe deux semaines chez ses grands-parents en Bretagne. Leur maison se trouve près de la mer. Le matin, elle aide sa grand-mère au jardin et l'après-midi, elle fait du vélo avec son cousin Hugo. Cette année, il a beaucoup plu, alors ils ont surtout joué aux cartes.", vprasanja: [
      ["Kje živijo Léini stari starši?", "v Bretanji, blizu morja", ["v Parizu", "v gorah", "na Korziki"], 1],
      ["Kaj Léa počne zjutraj?", "pomaga babici na vrtu", ["kolesari", "plava", "igra karte"], 1],
      ["Zakaj sta letos predvsem igrala karte?", "ker je veliko deževalo", ["ker je bilo prevroče", "ker je Hugo bolan", "ker nimata koles"], 2],
      ["Kdo je Hugo?", "Léin bratranec", ["Léin brat", "Léin prijatelj iz šole", "sosed"], 2],
    ] },
    { besedilo: "Selon une enquête récente, les jeunes Français passent en moyenne trois heures par jour sur leur téléphone. Les chercheurs s'inquiètent surtout de l'impact sur le sommeil : un adolescent sur deux déclare consulter son portable après minuit. Certains lycées ont donc décidé d'interdire les téléphones pendant les cours, une mesure qui divise les parents.", vprasanja: [
      ["Koliko časa na dan mladi v povprečju preživijo na telefonu?", "tri ure", ["dve uri", "pet ur", "eno uro"], 2],
      ["Kaj najbolj skrbi raziskovalce?", "vpliv na spanje", ["vpliv na ocene", "stroški", "vpliv na vid"], 2],
      ["Kolikšen delež najstnikov gleda telefon po polnoči?", "polovica", ["tretjina", "četrtina", "skoraj vsi"], 3],
      ["Kako starši sprejemajo prepoved telefonov?", "mnenja so deljena", ["vsi jo podpirajo", "vsi so proti", "zanjo ne vedo"], 4, "visja"],
    ] },
    { besedilo: "Madame, Monsieur, je me permets de vous écrire au sujet de l'annonce parue sur votre site. Je suis étudiant en tourisme et je souhaiterais effectuer un stage dans votre agence de juillet à août. Je parle couramment anglais et j'ai des notions d'espagnol. Vous trouverez ci-joint mon CV. Dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées.", vprasanja: [
      ["Kakšno besedilo je to?", "prošnja za počitniško prakso", ["pritožba", "vabilo", "osebno pismo prijatelju"], 2],
      ["Kaj študira pisec?", "turizem", ["jezike", "ekonomijo", "pravo"], 1],
      ["Katere jezike obvlada pisec?", "tekoče angleško, nekaj španščine", ["tekoče špansko, nekaj angleščine", "samo francosko", "nemško in angleško"], 3],
      ["Kaj pomeni »ci-joint«?", "v prilogi", ["spodaj podpisan", "takoj", "skupaj z vami"], 4, "visja"],
    ] },
    { besedilo: "Le Tour de France, créé en 1903, est l'une des courses cyclistes les plus célèbres du monde. Pendant trois semaines en juillet, les coureurs parcourent environ 3 500 kilomètres. Le leader du classement général porte le maillot jaune. L'arrivée a traditionnellement lieu sur les Champs-Élysées à Paris.", vprasanja: [
      ["Kdaj je bil Tour de France ustanovljen?", "leta 1903", ["leta 1930", "leta 1803", "leta 1913"], 1],
      ["Koliko časa traja dirka?", "tri tedne", ["en teden", "en mesec", "dva tedna"], 1],
      ["Kaj nosi vodilni v skupnem seštevku?", "rumeno majico", ["zeleno majico", "pikčasto majico", "belo majico"], 2],
      ["Kje je tradicionalno cilj?", "na Elizejskih poljanah v Parizu", ["v Lyonu", "v Alpah", "v Marseillu"], 2],
    ] },
    { besedilo: "Hier soir, Thomas devait retrouver Julie devant le cinéma à 20 heures. Mais son train a eu une heure de retard. Comme la batterie de son téléphone était vide, il n'a pas pu la prévenir. Quand il est enfin arrivé, Julie était déjà rentrée chez elle. Le lendemain, il lui a envoyé des fleurs pour s'excuser.", vprasanja: [
      ["Zakaj je Thomas zamudil?", "vlak je imel uro zamude", ["zaspal je", "pozabil je na sestanek", "izgubil se je"], 2],
      ["Zakaj ni obvestil Julie?", "imel je prazno baterijo", ["ni imel njene številke", "ni imel denarja", "ni želel"], 2],
      ["Kaj je Julie storila?", "odšla je domov", ["sama je šla v kino", "čakala ga je", "poklicala ga je"], 3],
      ["Kako se je Thomas opravičil?", "naslednji dan ji je poslal rože", ["napisal ji je pismo", "povabil jo je na večerjo", "takoj jo je poklical"], 3],
    ] },
    { besedilo: "De plus en plus de Français choisissent de vivre à la campagne. Depuis la pandémie, le télétravail permet à beaucoup de salariés de quitter les grandes villes, où les loyers sont élevés. Cependant, les nouveaux habitants se plaignent souvent du manque de transports publics et de médecins.", vprasanja: [
      ["Kaj omogoča selitev na podeželje?", "delo na daljavo", ["višje plače", "nove železnice", "državne subvencije"], 2],
      ["Zakaj ljudje zapuščajo velika mesta?", "ker so najemnine visoke", ["zaradi hrupa", "zaradi kriminala", "zaradi vremena"], 3],
      ["Česa novim prebivalcem primanjkuje?", "javnega prevoza in zdravnikov", ["trgovin in šol", "interneta", "delovnih mest"], 3],
      ["Kaj izraža »cependant« v besedilu?", "nasprotje (vendar)", ["vzrok (ker)", "posledico (zato)", "čas (medtem)"], 4, "visja"],
    ] },
  ]);
  pomeni(serija, "povezovalci", [["cependant", "vendar"], ["donc", "torej"], ["parce que", "ker"], ["pourtant", "kljub temu"], ["d'abord", "najprej"], ["ensuite", "nato"], ["enfin", "končno"], ["alors que", "medtem ko (nasprotje)"], ["grâce à", "zahvaljujoč"], ["à cause de", "zaradi (negativno)"], ["en revanche", "po drugi strani"], ["c'est-à-dire", "to je"], ["selon", "po (mnenju)"], ["malgré", "kljub"]], { tez: 2, n: 26 });
}
