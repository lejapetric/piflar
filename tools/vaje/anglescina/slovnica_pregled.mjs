// Mešane naloge iz vse slovnice (stran public/views/anglescina/snov/slovnica_pregled/).
import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

const PREOBLIKUJ = [
  ["I had never seen such a beautiful place. (Never …)", "Never had I seen such a beautiful place.", ["Never I had seen such a beautiful place.", "Never have I see such a beautiful place.", "Never did I had seen such a beautiful place."], "Never + had + osebek + 3. oblika."],
  ["It saves money and it also protects nature. (Not only …)", "Not only does it save money, but it also protects nature.", ["Not only it saves money, but it also protects nature.", "Not only saves it money, but also it protects nature.", "Not only it does save money, but protects nature."], "Not only + does + osebek + osnovna oblika."],
  ["The noise annoyed me most. (What …)", "What annoyed me most was the noise.", ["What the noise annoyed me most.", "What annoyed me most it was the noise.", "That annoyed me most was the noise."], "What + stavek + was + poudarjeni del."],
  ["Ana called, not Maja. (It was …)", "It was Ana who called.", ["It was Ana what called.", "It was Ana which she called.", "It were Ana who called."], "It was + oseba + who."],
  ["After she had read the letter, she cried. (Having …)", "Having read the letter, she cried.", ["Having she read the letter, she cried.", "Having reading the letter, she cried.", "Having been read the letter, she cried."], "Having + 3. oblika za prej končano dejanje."],
  ["Because he felt tired, he went to bed. (Feeling …)", "Feeling tired, he went to bed.", ["Feeling tired, the bed was ready.", "Felt tired, he went to bed.", "Feeling tired, he goes to bed yesterday."], "-ing za vzrok, isti osebek."],
  ["We sat down and immediately the phone rang. (No sooner …)", "No sooner had we sat down than the phone rang.", ["No sooner we had sat down than the phone rang.", "No sooner had we sat down when the phone rang.", "No sooner did we sat down than the phone rang."], "No sooner had … than."],
  ["You should not open the door in any situation. (Under no circumstances …)", "Under no circumstances should you open the door.", ["Under no circumstances you should open the door.", "Under no circumstances should you not open the door.", "Under no circumstances do you should open the door."], "Under no circumstances + should + osebek."],
  ["I appreciated my parents only when I left home. (Only when …)", "Only when I left home did I appreciate my parents.", ["Only when did I leave home I appreciated my parents.", "Only when I left home I appreciated my parents.", "Only when I left home I did appreciate my parents."], "Inverzija v glavnem stavku: did I appreciate."],
  ["People believe that she is the best. (She is …)", "She is believed to be the best.", ["She is believed that she is the best.", "She is believing to be the best.", "She believed to be the best."], "Brezosebni trpnik: be believed to + nedoločnik."],
];

export default function ({ serija }) {
  serija("preoblikuj", PREOBLIKUJ.length, (r, i) => {
    const [p, o, n, raz] = PREOBLIKUJ[i];
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Katera poved pomeni isto in se začne z danimi besedami? <em>${p}</em>`, pravilna: o, napacne: n, postopek: `<p><em>${o}</em></p><p>${raz}</p>` });
  });
  vrzeli(serija, "mesano", [
    ["Water ___ (boil) at 100 degrees.", "boils", ["is boiling", "boil", "has boiled"], "Dejstvo: present simple.", 1],
    ["Look! The baby ___ (sleep).", "is sleeping", ["sleeps", "slept", "has slept"], "Zdaj: present continuous.", 1],
    ["I ___ (not know) the answer.", "don't know", ["am not knowing", "not know", "haven't known"], "know je glagol stanja.", 2],
    ["We ___ (live) here since 2015.", ["have lived", "have been living"], ["live", "lived", "are living"], "since + present perfect.", 2],
    ["When we got to the cinema, the film ___ (already start).", "had already started", ["already started", "has already started", "was already starting"], "Prej v preteklosti: past perfect.", 3],
    ["This time next week we ___ (lie) on the beach.", "will be lying", ["will lie", "are lying", "lie"], "Future continuous: dejanje v teku ob času v prihodnosti.", 4, "visja"],
    ["By 2030 they ___ (finish) the new motorway.", "will have finished", ["will finish", "finish", "have finished"], "By + čas v prihodnosti: future perfect.", 4, "visja"],
    ["When I was a child, I ___ climb trees every day.", ["used to", "would"], ["use to", "was used to", "am used to"], "Pretekla navada: used to / would.", 2],
    ["She isn't used to ___ (drive) on the left.", "driving", ["drive", "drove", "be driving"], "be used to + -ing.", 3],
    ["If I ___ (be) you, I would apologise.", "were", ["am", "will be", "had been"], "Drugi pogojnik: If I were you.", 2],
    ["If they had left earlier, they ___ (not miss) the train.", "wouldn't have missed", ["didn't miss", "won't miss", "wouldn't miss"], "Tretji pogojnik.", 3],
    ["We'll go for a walk unless it ___ (rain).", "rains", ["will rain", "doesn't rain", "rained"], "unless = if not + present.", 3],
    ["I wish I ___ (have) more free time.", "had", ["have", "will have", "would have had"], "wish + past za sedanjost.", 3],
    ["The museum ___ (visit) by thousands of tourists every year.", "is visited", ["visits", "is visiting", "has visit"], "Trpnik, present simple.", 2],
    ["The new school ___ (build) at the moment.", "is being built", ["is built", "builds", "has been build"], "Trpnik, present continuous.", 3],
    ["I need to have my car ___ (repair).", "repaired", ["repair", "repairing", "to repair"], "have something done.", 3],
    ["She said she ___ (be) tired.", "was", ["is", "has been", "will be"], "Poročani govor: premik časa.", 2],
    ["He asked me where I ___ (live).", "lived", ["did live", "do live", "was I living"], "Poročano vprašanje: brez inverzije.", 3],
    ["You ___ wear a uniform; it's optional.", "don't have to", ["mustn't", "can't", "shouldn't to"], "don't have to = ni treba.", 2],
    ["He ___ be at home: the lights are on.", "must", ["can't", "mustn't", "has"], "Prepričano sklepanje: must.", 2],
    ["I can't find my keys. I ___ left them at school.", ["might have", "may have", "must have"], ["might", "should", "can have"], "Ugibanje o preteklosti: might have + 3. oblika.", 4, "visja"],
    ["I'll never forget ___ (meet) you for the first time.", "meeting", ["to meet", "meet", "met"], "forget + -ing = spomin na preteklost.", 3],
    ["They let us ___ (leave) early.", "leave", ["to leave", "leaving", "left"], "let + nedoločnik brez to.", 2],
    ["___ Netherlands is famous for its tulips.", "The", ["A", "–", "An"], "Ime države v množini: the.", 2],
    ["There were only ___ people at the party, so it was boring.", "a few", ["a little", "much", "few of"], "a few + števni samostalnik; tu tudi few, a s poudarkom na malo.", 3],
    ["This is ___ interesting book I've ever read.", "the most", ["more", "the more", "most"], "Presežnik: the most.", 1],
    ["The ___ you practise, the better you get.", "more", ["most", "much", "many"], "the + primernik …, the + primernik.", 3],
    ["She sings ___.", "well", ["good", "goodly", "better than"], "Prislov od good: well.", 1],
    ["It was ___ a good film that we watched it twice.", "such", ["so", "too", "very"], "such a + pridevnik + samostalnik.", 2],
    ["You live near here, ___?", "don't you", ["do you", "aren't you", "isn't it"], "Trdilna poved → nikalni dodatek.", 2],
    ["Could you tell me where the station ___?", "is", ["is it", "it is", "does"], "Posredno vprašanje: osebek pred glagolom.", 3],
    ["The girl ___ bike was stolen called the police.", "whose", ["who", "which", "who's"], "whose = čigar.", 3],
    ["I'll text you as soon as I ___ (arrive).", "arrive", ["will arrive", "arrived", "am arriving"], "as soon as + present za prihodnost.", 2],
    ["___ the bad weather, the match went ahead.", ["Despite", "In spite of"], ["Although", "However", "Even"], "Despite + samostalnik.", 2],
    ["It depends ___ the weather.", "on", ["of", "from", "at"], "depend on.", 1],
    ["The film was very ___ (disappoint).", "disappointing", ["disappointed", "disappointment", "disappoint"], "-ing pridevnik opisuje stvar.", 2],
  ]);
}
