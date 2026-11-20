import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "vprasanja", [
    ["Where ___ you live?", "do", ["are", "does", "did you"], "Present simple: do + osebek + osnovna oblika.", 1],
    ["What time ___ the film start?", "does", ["do", "is", "did it"], "Tretja oseba ednine (the film): does.", 1],
    ["___ you go to the party last night?", "Did", ["Do", "Were", "Have"], "Past simple: did + osnovna oblika.", 1],
    ["How long ___ you lived in Maribor?", "have", ["did", "are", "do"], "Present perfect: have + osebek + V3."],
    ["Who ___ (break) the window? – Tom did.", "broke", ["did break", "breaks", "did broke"], "Vprašanje po osebku nima did.", 3],
    ["Who ___ you meet at the station? – I met Ana.", "did", ["was", "do", "have"], "Vprašanje po predmetu: did + osebek.", 3],
    ["What ___ (happen) to your car? It's damaged.", "happened", ["did happen", "happens", "was happen"], "What happened? – vprašanje po osebku, brez did.", 3],
    ["What is your new teacher ___? – She's strict but fair.", "like", ["likes", "as", "how"], "What … like? sprašuje po značaju ali opisu."],
    ["___ phone is this? – It's mine.", "Whose", ["Who's", "Who", "Which"], "Whose = čigav; who's = who is."],
    ["___ often do you go to the gym?", "How", ["What", "Which", "When"], "How often = kako pogosto.", 1],
    ["Who are you talking ___?", "to", ["with to", "at", "for"], "Predlog ostane na koncu vprašanja: talk to somebody."],
    ["How ___ money did you spend?", "much", ["many", "lot", "more"], "money je neštevni: how much."],
  ]);
  vrzeli(serija, "dodatki", [
    ["She's from Ljubljana, ___?", "isn't she", ["is she", "doesn't she", "wasn't she"], "Trdilna poved z is → nikalni dodatek isn't she.", 1],
    ["You don't like coffee, ___?", "do you", ["don't you", "are you", "did you"], "Nikalna poved → trdilni dodatek.", 1],
    ["He plays the guitar, ___?", "doesn't he", ["isn't he", "does he", "didn't he"], "Present simple 3. oseba: doesn't he."],
    ["They missed the train, ___?", "didn't they", ["don't they", "haven't they", "weren't they"], "Past simple: didn't."],
    ["You've finished, ___?", "haven't you", ["didn't you", "have you", "aren't you"], "'ve = have: haven't you."],
    ["I'm late again, ___?", ["aren't I", "am I not"], ["amn't I", "isn't I", "am I"], "I am → aren't I.", 3],
    ["Let's go for a walk, ___?", "shall we", ["will we", "don't we", "let we"], "Let's … → shall we?", 3],
    ["Close the door, ___?", ["will you", "would you", "can you", "could you"], ["do you", "don't you", "shall you"], "Ukaz → will you? (tudi would/can/could you).", 3],
    ["Nobody called while I was out, ___?", "did they", ["didn't they", "did nobody", "didn't he"], "nobody je nikalni → trdilni dodatek; zaimek they.", 3],
    ["He has never been to London, ___?", "has he", ["hasn't he", "did he", "is he"], "never → poved je nikalna → trdilni dodatek.", 3],
    ["There's a bus at six, ___?", "isn't there", ["isn't it", "is there", "doesn't it"], "there ostane v dodatku.", 3],
    ["She'd already left, ___?", "hadn't she", ["wouldn't she", "didn't she", "had she"], "'d + V3 = had → hadn't she.", 4, "visja"],
    ["Everyone enjoyed the concert, ___?", "didn't they", ["didn't he", "did they", "doesn't everyone"], "everyone → they; trdilna → nikalni dodatek.", 4, "visja"],
  ]);
  vrzeli(serija, "posredna", [
    ["Could you tell me where the station ___ (be)?", "is", ["is it", "does", "are"], "Posredno vprašanje: osebek + glagol (where the station is)."],
    ["Do you know what time the shop ___ (open)?", "opens", ["does open", "open", "does it open"], "Brez does; čas preide na glavni glagol: opens."],
    ["I wonder why she ___ (leave) the party so early.", "left", ["did leave", "did she leave", "leaves"], "Brez did; past simple: left.", 3],
    ["Can you tell me ___ breakfast is included?", ["if", "whether"], ["that", "does", "is"], "Da/ne vprašanje → if ali whether.", 3],
    ["I'd like to know how much the tickets ___ (cost) last year.", "cost", ["do cost", "did cost", "costs did"], "Posredno vprašanje brez did; cost v pretekliku je cost.", 4, "visja"],
    ["Could you tell me ___? (are, the toilets, where)", "where the toilets are", ["where are the toilets", "where do the toilets are", "where the toilets do are"], "Besedni red trdilne povedi.", 3],
  ]);
  vrzeli(serija, "zaimki", [
    ["Be careful with that knife or you'll cut ___.", "yourself", ["you", "yourselves", "your"], "Povratni zaimek za you (ednina).", 1],
    ["The two sisters never talk to ___.", ["each other", "one another"], ["themselves", "theirselves", "them"], "Vzajemno dejanje: each other.", 3],
    ["Nobody helped us; we built the treehouse ___.", "ourselves", ["ourself", "us", "each other"], "Poudarjalni zaimek: sami."],
    ["He lives by ___ in a small flat.", "himself", ["hisself", "him", "his own"], "by + povratni zaimek = sam."],
    ["Enjoy ___, children!", "yourselves", ["yourself", "you", "themselves"], "you v množini → yourselves.", 1],
    ["The cat was licking ___.", "itself", ["it's self", "its", "himself"], "it → itself."],
    ["The children are old enough to dress ___.", "themselves", ["theirselves", "them", "each other"], "they → themselves.", 3],
    ["You can invite ___ you like.", ["whoever", "anyone", "anybody"], ["whatever", "wherever", "somebody"], "whoever = kogarkoli.", 3],
    ["___ hard I try, I can't remember his name.", "However", ["Whatever", "Whenever", "Although"], "however + pridevnik/prislov = še tako.", 4, "visja"],
    ["Is there ___ in the kitchen? I heard a noise.", ["anybody", "anyone", "somebody", "someone"], ["nobody", "everybody", "nothing"], "V vprašanjih anybody (somebody, če pričakujemo da)."],
  ]);
}
