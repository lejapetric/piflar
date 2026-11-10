import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Rdeče in črno", "Stendhal", "roman"], ["Oče Goriot", "Honoré de Balzac", "roman"], ["Gospa Bovary", "Gustave Flaubert", "roman"], ["Zločin in kazen", "Fjodor Mihajlovič Dostojevski", "roman"], ["Ana Karenina", "Lev Nikolajevič Tolstoj", "roman"], ["Vojna in mir", "Lev Nikolajevič Tolstoj", "roman"], ["Revizor", "Nikolaj Vasiljevič Gogolj", "komedija"], ["Plašč", "Nikolaj Vasiljevič Gogolj", "novela"], ["Češnjev vrt", "Anton Pavlovič Čehov", "drama"], ["Strahovi", "Henrik Ibsen", "drama"], ["Nora (Hiša lutk)", "Henrik Ibsen", "drama"], ["Beznica", "Émile Zola", "roman"], ["Očetje in sinovi", "Ivan Sergejevič Turgenjev", "roman"]],
    osebe: [["Stendhal", "je realizem primerjal z ogledalom ob cesti"], ["Honoré de Balzac", "je dela povezal v Človeško komedijo"], ["Gustave Flaubert", "je zapisal »Gospa Bovary, to sem jaz«"], ["Émile Zola", "je utemeljil naturalizem in eksperimentalni roman"], ["Henrik Ibsen", "je mojster analitične drame"], ["Fjodor Mihajlovič Dostojevski", "je bil obsojen na smrt, nato pomiloščen in poslan v Sibirijo"]],
  });
  pojmi([
    ["realizem", "Smer druge polovice 19. stoletja, ki verjetno prikazuje vsakdanjo resničnost."],
    ["naturalizem", "Smer, ki prikazuje človeka kot določenega z dednostjo in okoljem."],
    ["determinizem", "Prepričanje, da je človekovo ravnanje vnaprej določeno z okoliščinami."],
    ["tipizacija", "Prikaz značilnih oseb in okoliščin."],
    ["psihološki roman", "Roman, ki v ospredje postavlja notranje doživljanje oseb."],
    ["analitična drama", "Drama, v kateri se postopoma razkriva preteklost."],
    ["bovarizem", "Beg v sanjarjenje zaradi nezadovoljstva z resničnostjo."],
    ["pozitivizem", "Filozofija, ki priznava le preverljiva dejstva."],
    ["družbeni roman", "Roman, ki prikazuje več družbenih slojev in njihove odnose."],
    ["objektivnost", "Pripovedovalčeva nepristranskost."],
    ["mali človek", "Literarni tip ponižanega uradnika (Gogolj)."],
  ]);
  vprasanja([
    [2, "Kdo je Raskolnikov?", "študent, ki ubije oderuško starko", ["kmet iz Sibirije", "carjev častnik", "pisatelj"], "Zločin in kazen."],
    [3, "Kakšne so posledice Raskolnikovega zločina?", "notranje trpljenje in na koncu priznanje", ["slava in bogastvo", "pobeg v tujino brez posledic", "poroka s starko"], "Sonja ga vodi k spokoritvi."],
    [4, "Zakaj se Julien Sorel v Rdečem in črnem povzpne in nato propade?", "zaradi ambicij v razredni družbi in strasti, ki ga pripelje do zločina", ["zaradi bolezni", "zaradi vojne", "ker je izgubil dediščino"], "Rdeča = vojska, črna = duhovščina (pot vzpona).", "visja"],
    [4, "V čem je pomen konca Ibsenove Nore?", "Nora zapusti moža in otroke, da bi postala samostojna oseba", ["Nora umre", "Nora se pomiri z možem", "Nora postane igralka"], "Kritika meščanskega zakona.", "visja"],
  ]);
}
