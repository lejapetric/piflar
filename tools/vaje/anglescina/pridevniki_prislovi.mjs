import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "primerjava", [
    ["Mount Everest is ___ (high) mountain in the world.", "the highest", ["higher", "the most high", "highest"], "Presežnik enozložnega pridevnika: the + -est; signal »in the world«.", 1],
    ["My brother is two years ___ (old) than me.", "older", ["elder", "oldest", "more old"], "Primernik + than; elder samo pred samostalnikom (my elder brother).", 1],
    ["This exercise is ___ (easy) than the last one.", "easier", ["more easy", "easyer", "the easiest"], "Dvozložni pridevnik na -y: y → i + -er.", 1],
    ["Today is ___ (hot) day of the year so far.", "the hottest", ["the hotest", "hotter", "the most hot"], "Soglasnik–samoglasnik–soglasnik: podvojiš t; presežnik s the.", 1],
    ["Flying is ___ (expensive) than taking the train.", "more expensive", ["expensiver", "most expensive", "the more expensive"], "Večzložni pridevnik: more + pridevnik."],
    ["This is ___ (bad) film I have ever seen.", "the worst", ["the baddest", "worse", "the most bad"], "Nepravilni: bad – worse – the worst; signal »ever«."],
    ["Her English is much ___ (good) than mine.", "better", ["more good", "best", "gooder"], "Nepravilni: good – better – best; much okrepi primernik."],
    ["Could you speak a bit ___ (slowly), please?", "more slowly", ["slowlier", "slowly", "most slowly"], "Prislov na -ly: more + prislov."],
    ["The new phone isn't as ___ (light) as the old one.", "light", ["lighter", "the lightest", "more light"], "V zvezi as … as je pridevnik v osnovni obliki."],
    ["The ___ (much) you practise, the better you get.", "more", ["most", "much", "many"], "The + primernik …, the + primernik = čim bolj …, tem bolj.", 3],
    ["Prices are getting higher and ___ (high).", "higher", ["more high", "highest", "high"], "Primernik + and + primernik = vedno bolj.", 3],
    ["Ljubljana is ___ (far) from the sea than Koper.", ["farther", "further"], ["more far", "farest", "the furthest"], "far – farther/further; za razdaljo sta pravilna oba.", 3],
    ["We need ___ (far) information before we decide.", "further", ["farther", "more far", "furthest"], "further = dodaten; farther samo za razdaljo.", 3],
    ["There are ___ (few) cars in the town centre now than ten years ago.", "fewer", ["less", "fewest", "lesser"], "Števni samostalnik v množini: fewer; neštevni: less.", 3],
    ["This flat is twice as ___ (big) as ours.", "big", ["bigger", "the biggest", "biggest"], "twice as + osnovna oblika + as.", 3],
    ["She is ___ (talented) student in our class.", "the most talented", ["the talentedest", "more talented", "most talented of"], "Večzložni presežnik: the most + pridevnik; signal »in our class«."],
    ["He drove ___ (carefully) than his brother.", "more carefully", ["carefullier", "most carefully", "carefuller"], "Prislov na -ly: more carefully."],
    ["Of all the runners, Ana ran ___ (fast).", "the fastest", ["the most fast", "faster", "fastly"], "fast je pridevnik in prislov: fast – faster – the fastest."],
  ]);
  vrzeli(serija, "pridevnik-prislov", [
    ["She speaks English very ___ (good).", "well", ["good", "goodly", "better"], "Prislov od good je well.", 1],
    ["The soup smells ___ (delicious).", "delicious", ["deliciously", "more deliciously", "delicious-ly"], "Za glagoli zaznavanja (smell, taste, look, sound) stoji pridevnik.", 1],
    ["Please drive ___ (careful). The roads are icy.", "carefully", ["careful", "carefuly", "care"], "Glagol drive opisuje prislov: careful → carefully.", 1],
    ["You look ___ (tired). Did you sleep at all?", "tired", ["tiredly", "tiring", "tire"], "look = izgledati, sledi pridevnik."],
    ["He works very ___ (hard) – he's always the last to leave.", "hard", ["hardly", "hardy", "harder than"], "hard je tudi prislov; hardly pomeni komaj.", 3],
    ["I can ___ hear you. Can you speak up?", "hardly", ["hard", "hardy", "harder"], "hardly = komaj.", 3],
    ["Have you seen any good films ___?", "lately", ["late", "later", "latest"], "lately = v zadnjem času; late = pozno.", 3],
    ["The team played ___ (bad) and lost 3:0.", "badly", ["bad", "worse", "badder"], "Prislov od bad je badly."],
    ["She smiled at me in a ___ (friend) way.", "friendly", ["friendlily", "friend", "friendship"], "friendly je pridevnik in nima prislova; uporabimo in a friendly way.", 3],
    ["The situation changed ___ (dramatic) after the election.", "dramatically", ["dramaticly", "dramatic", "dramaticaly"], "-ic → -ically.", 3],
    ["I feel ___ (bad) about what I said.", "bad", ["badly", "worse", "baddly"], "feel kot občutek: sledi pridevnik.", 3],
    ["She has a ___ (lovely) old wooden house.", "lovely", ["lovelily", "love", "loving"], "Mnenje (lovely) je prvo v vrsti pridevnikov."],
    ["He bought ___ jacket. (black, leather, old)", "an old black leather", ["a black old leather", "a leather black old", "an old leather black"], "Vrstni red: starost – barva – snov (OSASCOMP).", 3],
    ["They live in ___ house. (old, beautiful, big)", "a beautiful big old", ["a big beautiful old", "an old big beautiful", "a beautiful old big"], "Vrstni red: mnenje – velikost – starost.", 4, "visja"],
    ["She ___ for school. (late, never, is)", "is never late", ["never is late", "is late never", "late is never"], "Prislov pogostnosti stoji za be: She is never late.", 3],
  ]);
  vrzeli(serija, "too-enough", [
    ["The box is ___ heavy for me to carry.", "too", ["enough", "so", "such"], "too + pridevnik + to = preveč, da bi.", 1],
    ["She isn't old ___ to vote.", "enough", ["too", "so", "such"], "pridevnik + enough.", 1],
    ["There were ___ many people that we couldn't get in.", "so", ["such", "too", "enough"], "so many + samostalnik + that."],
    ["It was ___ a nice day that we went to the beach.", "such", ["so", "too", "very"], "such a + pridevnik + samostalnik + that."],
    ["We haven't got ___ chairs for everyone.", "enough", ["too", "so", "such"], "enough stoji pred samostalnikom."],
    ["The film was ___ boring that I fell asleep.", "so", ["such", "too", "enough"], "so + pridevnik + that."],
    ["They are ___ nice people – you'll like them.", "such", ["so", "such a", "too"], "such + pridevnik + množina (brez a).", 3],
    ["There is ___ much sugar in this cake. I can't eat it.", "too", ["so", "enough", "such"], "too much + neštevni samostalnik = preveč."],
    ["He didn't run fast ___ to catch the bus.", "enough", ["too", "so", "such"], "prislov + enough + to.", 3],
    ["The lake is too cold ___ (swim) in.", "to swim", ["swimming", "for swim", "that we swim"], "too + pridevnik + to + glagol; predmeta (it) ne ponovimo.", 3],
  ]);
}
