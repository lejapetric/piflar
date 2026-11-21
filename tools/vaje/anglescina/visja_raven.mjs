// Naloge za temo Višja raven: vse zahteve (stran public/views/anglescina/snov/visja_raven/).
import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const V = "visja";
const DEJSTVA = [
  ["Koliko besed ima krajši pisni sestavek (3A) na višji ravni?", "150–180", ["120–150", "220–250", "250–300"]],
  ["Koliko točk prinese esej iz književnosti (3B VR)?", "25", ["20", "30", "10"]],
  ["Koliko od 25 točk eseja iz književnosti prinese vsebina?", "10", ["5", "15", "20"]],
  ["Kaj se zgodi, če ima esej iz književnosti manj kot 190 besed?", "vsebina največ 6 točk, druga merila največ 3", ["esej ni ocenjen", "odbijejo 1 točko", "nič, če je vsebina dobra"]],
  ["Pod koliko besedami dobi krajši sestavek (3A VR) največ 3 točke na merilo?", "120", ["100", "150", "60"]],
  ["Katera naloga pri bralnem razumevanju je samo na višji ravni?", "gapped text (manjkajo cele povedi)", ["gapped sentences (manjkajo deli povedi)", "true/false", "short answers"]],
  ["Kje se poezija preverja samo na višji ravni?", "pri ustnem izpitu (3. naloga)", ["v poli 1A", "v poli 3A", "nikjer"]],
  ["Kaj velja za okrajšave pri odprtih vrzelih (one word)?", "štejejo za dve besedi, razen can't", ["štejejo za eno besedo", "niso dovoljene nikoli", "štejejo za dve besedi, razen don't"]],
  ["Kaj sme naslov eseja iz književnosti zahtevati?", "obravnavo enega dela ali primerjavo obeh predpisanih del", ["samo življenjepis avtorja", "samo obnovo dela", "osebno izkušnjo, povezano z delom"]],
  ["Katero točkovno oceno poleg 1–5 določijo na višji ravni?", "1–8", ["1–10", "1–20", "1–4"]],
  ["Kaj na višji ravni pri slušnem razumevanju ostane enako kot na osnovni?", "besedili", ["vse naloge", "nič", "trajanje je daljše"]],
  ["Katerega od teh vsebin ne smeš vključiti v esej iz književnosti?", "podatke o avtorjevem življenju", ["kratke navedke iz dela", "interpretacijo simbolov", "primerjavo dveh likov"]],
  ["Katero vprašanje je značilno za višjo raven pri ustnem izpitu?", "What can you deduce about Percy's character?", ["Where does the conversation take place?", "How old is John?", "What is the title of the story?"]],
];

export default function ({ serija }) {
  serija("dejstva", DEJSTVA.length, (r, i) => {
    const [v, o, n] = DEJSTVA[i];
    return izbira({ r, tezavnost: 2, raven: V, besedilo: v, pravilna: o, napacne: n, postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}.</p>` });
  });
  pomeni(serija, "izrazi", [
    ["narrator", "pripovedovalec"], ["point of view", "pripovedno gledišče"], ["protagonist", "glavni junak"], ["setting", "prostor in čas dogajanja"],
    ["climax", "vrh dogajanja"], ["motif", "motiv, ki se ponavlja"], ["symbol", "simbol"], ["characterisation", "prikaz lika"], ["irony", "ironija"],
    ["mood", "razpoloženje"], ["foreshadowing", "napovedovanje"], ["imagery", "podobje"], ["simile", "primera (z like, as)"], ["personification", "poosebljanje"],
    ["speaker", "lirski subjekt"], ["stanza", "kitica"], ["alliteration", "aliteracija"], ["resolution", "razplet"],
  ], { tez: 3, n: 30 });
  vrzeli(serija, "odprte", [
    ["The giant panda may ___ doing much better than previously thought.", "be", ["is", "being", "been"], "Med modalnim glagolom in -ing: be.", 3, V],
    ["A study has provided new evidence ___ there may be twice as many pandas.", "that", ["which", "what", "who"], "evidence that + stavek.", 3, V],
    ["There may be nearly twice as many bears ___ scientists have calculated.", "as", ["than", "like", "so"], "twice as many … as.", 3, V],
    ["Almost everyone who has been ___ holiday to India has a story.", "on", ["in", "at", "for"], "be on holiday.", 3, V],
    ["___ is said that the castle was built in the 12th century.", "It", ["There", "This", "One"], "Brezosebni trpnik: It is said that…", 3, V],
    ["He gave ___ smoking after his illness.", "up", ["out", "off", "in"], "give up = opustiti.", 3, V],
    ["___ number of tourists has risen sharply.", "The", ["A", "Some", "Any"], "The number of + ednina glagola.", 3, V],
    ["Not only ___ tourism create jobs, but it also preserves heritage.", "does", ["do", "is", "it"], "Inverzija po not only: does + osebek.", 4, V],
    ["Never ___ I seen such a crowd.", "have", ["had", "did", "am"], "Inverzija po never: have + osebek + 3. oblika.", 4, V],
    ["Hardly ___ we arrived when it started to rain.", "had", ["have", "did", "were"], "Hardly had … when.", 4, V],
    ["___ worries me most is the cost.", "What", ["That", "Which", "It"], "Cleft sentence: What … is …", 4, V],
    ["It was the ending ___ surprised me.", ["that", "which"], ["what", "who", "whose"], "It was … that …", 4, V],
    ["___ I known, I would have helped.", "Had", ["Have", "If", "Did"], "Inverzija v 3. pogojniku: Had I known.", 4, V],
    ["If I had studied harder, I ___ be at university now.", "would", ["will", "had", "should have"], "Mešani pogojnik: preteklost → sedanjost.", 4, V],
    ["I wish I ___ listened to your advice.", "had", ["have", "would", "did"], "wish + past perfect za obžalovanje preteklosti.", 4, V],
    ["She must ___ forgotten about the meeting.", "have", ["has", "had", "be"], "must have + 3. oblika: ugibanje o preteklosti.", 4, V],
    ["It's high time we ___ our habits.", "changed", ["change", "will change", "have changed"], "It's time + past simple.", 4, V],
    ["I'd rather you ___ tell anyone.", "didn't", ["don't", "won't", "not"], "would rather + osebek + past simple.", 4, V],
    ["She knew she ___ never return.", "would", ["will", "shall", "is going"], "Prihodnost v preteklosti: would.", 4, V],
    ["___ through the window, the animals saw the pigs playing cards.", "Looking", ["Looked", "To look", "Look"], "Deležijski stavek z istim osebkom.", 4, V],
    ["Tourism can ___ a serious threat to nature.", "pose", ["make", "do", "put"], "Kolokacija: pose a threat.", 4, V],
    ["By and ___, the plan was a success.", "large", ["big", "great", "wide"], "Binomial: by and large = v glavnem.", 4, V],
    ["The new law will ___ thousands of families.", "affect", ["effect", "afect", "effort"], "affect = glagol, effect = samostalnik.", 4, V],
  ]);
}
