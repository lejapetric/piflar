import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "trpnik", [
    ["English ___ (speak) all over the world.", "is spoken", ["speaks", "was spoken", "has spoken"], "Passive present simple: is/are + past participle.", 1],
    ["The Mona Lisa ___ (paint) by Leonardo da Vinci.", "was painted", ["painted", "is painted", "has been painted"], "Passive past simple: was/were + past participle.", 1],
    ["The new hospital ___ (build) next year.", "will be built", ["will build", "is built", "builds"], "Passive future: will be + past participle."],
    ["My car ___ (repair) at the moment.", "is being repaired", ["is repaired", "repairs", "has repaired"], "Passive present continuous: is being + past participle.", 3],
    ["The letters ___ already ___ (send).", ["have / been sent", "have been sent"], ["have / sent", "are / sent", "were / sending"], "Passive present perfect: have been + past participle.", 3],
    ["The thief ___ (arrest) yesterday.", "was arrested", ["arrested", "has been arrested", "is arrested"], "Past simple passive."],
    ["The room must ___ (clean) before the guests arrive.", "be cleaned", ["clean", "cleaned", "been cleaned"], "Modal + be + past participle."],
    ["When we arrived, the house ___ (paint).", "was being painted", ["was painting", "painted", "is painted"], "Passive past continuous.", 3],
    ["He is said ___ (be) very rich.", "to be", ["being", "be", "to have been"], "Impersonal passive: He is said to + infinitive.", 4, "visja"],
    ["She is believed ___ (leave) the country last week.", "to have left", ["to leave", "leaving", "left"], "Perfect infinitive za preteklost pri impersonal passive.", 4, "visja"],
    ["I had my hair ___ (cut) yesterday.", "cut", ["cutting", "to cut", "cuts"], "Causative have something done.", 3],
    ["We need to get the roof ___ (repair).", "repaired", ["repair", "repairing", "to repair"], "Causative get something done.", 4, "visja"],
    ["The results ___ (announce) tomorrow.", "will be announced", ["will announce", "announce", "are announcing"], "Passive future."],
    ["This bridge ___ (build) in 1901.", "was built", ["built", "is built", "has built"], "Past simple passive."],
  ]);
  vrzeli(serija, "porocani", [
    ["\"I am tired,\" she said. → She said that she ___ tired.", "was", ["is", "has been", "were"], "Pri poročanem govoru se čas pomakne nazaj: am → was."],
    ["\"I will help you,\" he said. → He said that he ___ help me.", "would", ["will", "can", "shall"], "Will → would."],
    ["\"I saw the film,\" Tom said. → Tom said that he ___ the film.", "had seen", ["saw", "has seen", "sees"], "Past simple → past perfect.", 3],
    ["\"I have finished,\" Ana said. → Ana said that she ___.", "had finished", ["has finished", "finished", "finishes"], "Present perfect → past perfect.", 3],
    ["\"Where do you live?\" he asked. → He asked me where I ___.", "lived", ["live", "do I live", "did I live"], "V poročanih vprašanjih ni inverzije; čas se pomakne.", 3],
    ["\"Are you hungry?\" she asked. → She asked if I ___ hungry.", "was", ["am", "were I", "is"], "Da/ne vprašanja: if/whether + trdilni besedni red."],
    ["\"Close the door!\" the teacher said. → The teacher told us ___ the door.", "to close", ["close", "closing", "that we close"], "Ukazi: tell somebody to + infinitive."],
    ["\"Don't be late,\" Mum said. → Mum told me ___ late.", "not to be", ["don't be", "to not being", "not be"], "Nikalni ukazi: tell somebody not to + infinitive.", 3],
    ["\"I can swim,\" he said. → He said he ___ swim.", "could", ["can", "would", "was able"], "Can → could."],
    ["\"We are leaving tomorrow,\" they said. → They said they were leaving ___.", "the next day", ["tomorrow", "yesterday", "the day before"], "Tomorrow → the next day / the following day.", 4, "visja"],
    ["\"I bought this here,\" she said. → She said she had bought that ___.", "there", ["here", "this", "now"], "Here → there.", 4, "visja"],
    ["\"Let's go to the cinema,\" he said. → He ___ going to the cinema.", "suggested", ["told", "said", "asked"], "Let's → suggest + -ing.", 4, "visja"],
    ["\"I'm sorry I'm late,\" she said. → She ___ for being late.", "apologised", ["said", "told", "suggested"], "Reporting verb apologise for + -ing.", 4, "visja"],
  ]);
}
