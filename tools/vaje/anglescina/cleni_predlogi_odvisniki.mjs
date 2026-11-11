import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "cleni", [
    ["I saw ___ elephant at the zoo.", "an", ["a", "the", "–"], "An pred samoglasniškim glasom.", 1],
    ["She is ___ university student.", "a", ["an", "the", "–"], "University se začne z glasom /j/, zato a.", 3],
    ["We waited for ___ hour.", "an", ["a", "the", "–"], "Hour se začne z nemim h: an hour.", 3],
    ["___ sun rises in the east.", "The", ["A", "An", "–"], "The pri edinstvenih stvareh.", 1],
    ["I love ___ music.", "–", ["the", "a", "an"], "Brez člena pri splošnih neštevnih samostalnikih.", 2],
    ["He plays ___ guitar very well.", "the", ["a", "–", "an"], "The pri glasbilih.", 2],
    ["They play ___ tennis on Sundays.", "–", ["the", "a", "an"], "Brez člena pri športih.", 2],
    ["Mount Everest is the highest mountain in ___ world.", "the", ["a", "–", "an"], "The world.", 1],
    ["She lives in ___ United States.", "the", ["–", "a", "an"], "The pri imenih držav v množini ali z besedo states/kingdom.", 3],
    ["___ Lake Bled is beautiful.", "–", ["The", "A", "An"], "Brez člena pri imenih posameznih jezer.", 3],
  ]);
  vrzeli(serija, "predlogi", [
    ["I was born ___ 2007.", "in", ["on", "at", "by"], "In pri letih, mesecih, letnih časih.", 1],
    ["The meeting is ___ Monday.", "on", ["in", "at", "by"], "On pri dnevih in datumih.", 1],
    ["See you ___ 7 o'clock.", "at", ["in", "on", "by"], "At pri urah.", 1],
    ["She is good ___ maths.", "at", ["in", "on", "for"], "Good at.", 2],
    ["I'm interested ___ history.", "in", ["on", "at", "for"], "Interested in.", 2],
    ["It depends ___ the weather.", "on", ["of", "from", "in"], "Depend on.", 2],
    ["He apologised ___ being late.", "for", ["of", "about", "to"], "Apologise for.", 3],
    ["I'm looking forward ___ seeing you.", "to", ["for", "at", "on"], "Look forward to + -ing.", 3],
    ["She's afraid ___ spiders.", "of", ["from", "for", "about"], "Afraid of.", 2],
    ["We arrived ___ the airport late.", "at", ["to", "in", "on"], "Arrive at (stavba, točka), arrive in (mesto, država).", 3],
    ["The book was written ___ Orwell.", "by", ["from", "of", "with"], "Trpnik: by + vršilec.", 2],
    ["I've known her ___ ten years.", "for", ["since", "during", "from"], "For + časovno obdobje.", 2],
    ["I've lived here ___ 2019.", "since", ["for", "from", "in"], "Since + časovna točka.", 2],
    ["He insisted ___ paying the bill.", "on", ["to", "for", "in"], "Insist on + -ing.", 4, "visja"],
  ]);
  vrzeli(serija, "odvisniki", [
    ["The woman ___ lives next door is a doctor.", "who", ["which", "whose", "where"], "Who za osebe v oziralnem odvisniku.", 1],
    ["This is the house ___ I was born.", "where", ["which", "who", "when"], "Where za kraj.", 2],
    ["The book ___ I'm reading is great.", ["which", "that"], ["who", "whose", "where"], "Which/that za stvari.", 1],
    ["That's the man ___ car was stolen.", "whose", ["who", "which", "whom"], "Whose za svojino.", 2],
    ["I remember the day ___ we met.", "when", ["where", "which", "who"], "When za čas.", 2],
    ["___ it was raining, we went for a walk.", "Although", ["Because", "Despite", "So"], "Although + stavek (dopustni odvisnik).", 3],
    ["___ the rain, we went for a walk.", "Despite", ["Although", "Because", "However"], "Despite + samostalnik.", 3],
    ["He stayed at home ___ he was ill.", "because", ["although", "so that", "unless"], "Because za vzrok.", 1],
    ["She saved money ___ she could buy a car.", "so that", ["because", "although", "unless"], "So that za namen.", 3],
    ["Paris, ___ is the capital of France, is beautiful.", "which", ["that", "who", "what"], "V nedoločujočem odvisniku (z vejicami) ne uporabimo that.", 4, "visja"],
    ["The person to ___ I spoke was very helpful.", "whom", ["who", "which", "whose"], "Za predlogom uporabimo whom (formalno).", 4, "visja"],
    ["___ I understand, the meeting has been cancelled.", "As far as", ["As long as", "As soon as", "So far as that"], "As far as I understand = kolikor razumem.", 4, "visja"],
  ]);
}
