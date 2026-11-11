import { izbira, besedilo } from "../lib.mjs";

const besede = (p) => p.replace(/[.,?]/g, "").split(" ").map((w, i) => (i === 0 && !/^(Ich|Er|Sie|Es|Wir|Ihr|Du)$/.test(w) && w !== "Weil" ? w : w)).sort((a, b) => a.localeCompare(b, "de")).join(" / ");

const P = [
  ["Heute gehe ich ins Kino.", ["Heute ich gehe ins Kino.", "Heute ich ins Kino gehe.", "Gehe heute ich ins Kino."], "Glagol je na drugem mestu; po prislovnem določilu sledi osebek (inverzija).", 2],
  ["Ich weiß, dass du recht hast.", ["Ich weiß, dass du hast recht.", "Ich weiß, dass hast du recht.", "Ich weiß, du dass recht hast."], "V odvisniku je osebna glagolska oblika na koncu.", 2],
  ["Ich stehe jeden Tag um 7 Uhr auf.", ["Ich aufstehe jeden Tag um 7 Uhr.", "Ich stehe auf jeden Tag um 7 Uhr.", "Ich jeden Tag um 7 Uhr aufstehe."], "Ločljiva predpona gre na konec stavka.", 2],
  ["Ich kann heute nicht kommen.", ["Ich kann nicht kommen heute.", "Ich kommen kann heute nicht.", "Ich kann heute kommen nicht."], "Modalni glagol na 2. mestu, nedoločnik na koncu.", 2],
  ["Gestern habe ich einen Film gesehen.", ["Gestern ich habe einen Film gesehen.", "Gestern habe ich gesehen einen Film.", "Gestern ich einen Film gesehen habe."], "Pomožni glagol na 2. mestu, Partizip II na koncu.", 2],
  ["Weil es regnet, bleibe ich zu Hause.", ["Weil es regnet, ich bleibe zu Hause.", "Weil regnet es, bleibe ich zu Hause.", "Weil es regnet, zu Hause ich bleibe."], "Odvisnik na začetku zasede 1. mesto; nato glagol, nato osebek.", 3],
  ["Kommst du morgen?", ["Du kommst morgen?", "Morgen du kommst?", "Kommst morgen du?"], "V da/ne vprašanju je glagol na prvem mestu.", 1],
  ["Wann fährt der Zug ab?", ["Wann der Zug fährt ab?", "Wann fährt ab der Zug?", "Wann der Zug abfährt?"], "Vprašalnica, glagol, osebek; predpona na koncu.", 2],
  ["Ich gebe ihm das Buch.", ["Ich gebe das Buch ihm.", "Ich ihm gebe das Buch.", "Ihm ich gebe das Buch."], "Zaimek v dajalniku pred samostalnikom v tožilniku.", 3],
  ["Ich gebe es ihm.", ["Ich gebe ihm es.", "Ich es gebe ihm.", "Es ich gebe ihm."], "Dva zaimka: tožilnik pred dajalnikom.", 4],
  ["Er sagt, dass er morgen kommen will.", ["Er sagt, dass er will morgen kommen.", "Er sagt, dass er morgen will kommen.", "Er sagt, dass will er morgen kommen."], "V odvisniku z modalnim glagolom je osebna oblika čisto na koncu.", 4],
  ["Ich glaube, dass er schon angekommen ist.", ["Ich glaube, dass er ist schon angekommen.", "Ich glaube, dass er schon ist angekommen.", "Ich glaube, dass ist er schon angekommen."], "Pomožni glagol na koncu odvisnika.", 3],
  ["Morgen muss ich früh aufstehen.", ["Morgen ich muss früh aufstehen.", "Morgen muss ich aufstehen früh.", "Morgen muss früh ich aufstehen."], "Inverzija in nedoločnik na koncu.", 2],
  ["Ich weiß nicht, ob er kommt.", ["Ich weiß nicht, ob kommt er.", "Ich weiß nicht, er ob kommt.", "Ich weiß nicht, ob er kommen."], "Ob uvaja odvisnik; glagol na koncu.", 2],
  ["Er hat gestern wegen des Regens zu Hause gelernt.", ["Er hat zu Hause wegen des Regens gestern gelernt.", "Er hat gestern zu Hause wegen des Regens gelernt.", "Er hat wegen des Regens zu Hause gestern gelernt."], "Pravilo TeKaMoLo: čas – vzrok – način – kraj.", 4],
  ["Ich habe ihn nicht gesehen.", ["Ich habe nicht ihn gesehen.", "Ich nicht habe ihn gesehen.", "Ich habe ihn gesehen nicht."], "Nicht navadno stoji pred Partizip II in za zaimenskim predmetom.", 3],
  ["Am Wochenende besuche ich meine Oma.", ["Am Wochenende ich besuche meine Oma.", "Am Wochenende besuche meine Oma ich.", "Ich am Wochenende besuche meine Oma."], "Časovno določilo na začetku → glagol, nato osebek.", 1],
  ["Sie ruft ihre Freundin an.", ["Sie anruft ihre Freundin.", "Sie ruft an ihre Freundin.", "Sie ihre Freundin anruft."], "Ločljivi glagol anrufen: predpona na koncu.", 2],
  ["Wir möchten nach Italien fahren.", ["Wir möchten fahren nach Italien.", "Wir fahren möchten nach Italien.", "Wir nach Italien möchten fahren."], "Modalni glagol + nedoločnik na koncu.", 1],
  ["Wenn ich Zeit habe, lese ich gern.", ["Wenn ich habe Zeit, lese ich gern.", "Wenn ich Zeit habe, ich lese gern.", "Wenn habe ich Zeit, ich lese gern."], "Glagol na koncu odvisnika; nato inverzija v glavnem stavku.", 3],
  ["Er hat keine Zeit, weil er arbeiten muss.", ["Er hat keine Zeit, weil er muss arbeiten.", "Er hat keine Zeit, weil muss er arbeiten.", "Er hat keine Zeit, weil arbeiten er muss."], "Modalni glagol na koncu odvisnika.", 3],
  ["Das ist der Mann, der hier wohnt.", ["Das ist der Mann, der wohnt hier.", "Das ist der Mann, wohnt der hier.", "Das ist der Mann, hier der wohnt."], "V oziralnem odvisniku je glagol na koncu.", 3],
  ["Warum hast du nicht angerufen?", ["Warum du hast nicht angerufen?", "Warum hast du angerufen nicht?", "Warum nicht du hast angerufen?"], "Vprašalnica – glagol – osebek – … – Partizip II.", 2],
  ["Nach der Schule spielen wir Fußball.", ["Nach der Schule wir spielen Fußball.", "Nach der Schule spielen Fußball wir.", "Wir nach der Schule spielen Fußball."], "Inverzija po prislovnem določilu.", 1],
  ["Ich freue mich, dass du gekommen bist.", ["Ich freue mich, dass du bist gekommen.", "Ich freue mich, dass bist du gekommen.", "Ich mich freue, dass du gekommen bist."], "Pomožni glagol na koncu odvisnika.", 3],
  ["Obwohl er müde war, ging er joggen.", ["Obwohl er war müde, ging er joggen.", "Obwohl er müde war, er ging joggen.", "Obwohl müde er war, ging er joggen."], "Odvisnik na začetku, nato glagol glavnega stavka.", 4],
];

export default function ({ serija }) {
  serija("red", P.length, (r, i) => {
    const [p, nap, raz, tez] = P[i];
    return izbira({ r, tezavnost: tez, ...(tez === 4 ? { raven: "visja" } : {}), besedilo: `Katera poved iz besed »${besede(p)}« ima pravilen besedni red?`, pravilna: p, napacne: nap, postopek: `<p>${p}</p><p>${raz}</p>` });
  });
  serija("sestavi", P.length, (r, i) => {
    const [p, , raz, tez] = P[i], t = Math.min(4, tez + 1);
    return besedilo({ tezavnost: t, ...(t === 4 ? { raven: "visja" } : {}), sprejemljivi: [p, p.replace(/,/g, "")], besedilo: `Iz besed sestavi poved s pravilnim besednim redom: <em>${besede(p)}</em> (končno ločilo: ${p.slice(-1)})`, rezultat: p, postopek: `<p>${raz}</p>` });
  });
}
