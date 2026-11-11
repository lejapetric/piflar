import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "modalni", [
    ["You ___ wear a seatbelt in the car. It's the law.", "must", ["might", "could", "needn't"], "Must za obveznost (pravilo, zakon).", 1],
    ["You ___ smoke here. It's forbidden.", "mustn't", ["don't have to", "needn't", "might not"], "Mustn't = prepoved.", 1],
    ["You ___ come if you don't want to.", "don't have to", ["mustn't", "can't", "shouldn't"], "Don't have to = ni potrebno."],
    ["___ I open the window? It's hot in here.", "Shall", ["Must", "Will", "Need"], "Shall I…? za ponudbo."],
    ["You ___ see a doctor about that cough.", "should", ["must not", "can't", "might"], "Should za nasvet.", 1],
    ["She ___ speak four languages when she was ten.", "could", ["can", "must", "should"], "Could za sposobnost v preteklosti.", 1],
    ["He's not answering. He ___ be asleep.", "might", ["must not", "should", "can't"], "Might za možnost."],
    ["That ___ be John – he's in London today.", "can't", ["mustn't", "might", "should"], "Can't za logično gotovost, da nekaj ni res.", 3],
    ["The lights are on. They ___ be at home.", "must", ["can't", "should", "need"], "Must za logični sklep.", 3],
    ["You ___ have told me! I would have helped.", "should", ["must", "can", "would"], "Should have + past participle = očitek za preteklost.", 4, "visja"],
    ["She ___ have taken the bus – her car is still here.", "must", ["can't", "should", "needn't"], "Must have = logični sklep o preteklosti.", 4, "visja"],
    ["He ___ have stolen the money; he was with me all day.", "can't", ["must", "should", "might"], "Can't have = nemogoče v preteklosti.", 4, "visja"],
    ["You ___ have brought food – there was plenty.", "needn't", ["mustn't", "couldn't", "shouldn't"], "Needn't have = naredil si, a ni bilo treba.", 4, "visja"],
    ["After the accident, he ___ walk for months.", "couldn't", ["can't", "mustn't", "needn't"], "Couldn't = nesposobnost v preteklosti."],
    ["I ___ go to the dentist tomorrow – I have an appointment.", "have to", ["must not", "can", "might"], "Have to za zunanjo obveznost."],
    ["___ you pass me the salt, please?", "Could", ["Must", "Should", "Need"], "Could za vljudno prošnjo.", 1],
    ["We ___ to leave early yesterday because of the storm.", "had", ["must", "should", "could"], "Had to = preteklik od must/have to."],
    ["You ___ better hurry or you'll miss the train.", "had", ["would", "should", "must"], "Had better = bolje bi bilo.", 3],
    ["Students ___ use calculators in the exam; it's allowed.", "may", ["mustn't", "need", "ought"], "May za dovoljenje (formalno)."],
    ["You ought ___ apologise.", "to", ["for", "that", "–"], "Ought to + infinitive.", 3],
    ["I ___ swim when I was five, but I learnt at seven.", "couldn't", ["can't", "mustn't", "needn't"], "Couldn't za preteklo nesposobnost."],
    ["It ___ rain later, so take an umbrella.", "may", ["must", "can't", "should not"], "May za možnost v prihodnosti."],
    ["She ___ be over 70 – she looks so young!", "can't", ["must", "should", "might"], "Can't za nemogoč sklep.", 3],
    ["You ___ eat so much sugar; it's bad for your teeth.", "shouldn't", ["needn't", "don't have to", "couldn't"], "Shouldn't za odsvetovanje.", 1],
    ["I'm not sure, but she ___ be at the library.", "could", ["must", "can't", "has to"], "Could za negotovo možnost."],
    ["Will you ___ to come to the party?", "be able", ["can", "could", "able"], "Can nima prihodnjika: will be able to.", 3],
  ]);
}
