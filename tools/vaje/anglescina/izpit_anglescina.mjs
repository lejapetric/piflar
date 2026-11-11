import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija, vprasanja }) {
  serija("shema", 12, (r) => {
    const [v, odg, nap] = r.izberi([
      ["Koliko časa traja pola 1A (bralno razumevanje)?", "35 minut", ["25 minut", "20 minut", "60 minut"]],
      ["Koliko časa traja pola 1B (poznavanje in raba jezika)?", "25 minut", ["35 minut", "30 minut", "60 minut"]],
      ["Koliko časa traja krajši pisni sestavek (3A)?", "30 minut", ["60 minut", "20 minut", "45 minut"]],
      ["Koliko časa traja daljši pisni sestavek (3B)?", "60 minut", ["30 minut", "90 minut", "45 minut"]],
      ["Koliko besed naj ima krajši pisni sestavek na osnovni ravni?", "120–150", ["150–180", "220–250", "250–300"]],
      ["Koliko besed naj ima krajši pisni sestavek na višji ravni?", "150–180", ["120–150", "220–250", "250–300"]],
      ["Koliko besed naj ima daljši sestavek na osnovni ravni?", "220–250", ["120–150", "250–300", "150–180"]],
      ["Koliko besed naj ima esej na višji ravni?", "250–300", ["220–250", "150–180", "400–500"]],
      ["Kaj piše kandidat višje ravni v poli 3B?", "esej o predpisanem književnem delu", ["pismo prijatelju", "poročilo", "opis slike"]],
      ["Koliko točk največ dobi krajši pisni sestavek?", "20", ["25", "30", "16"]],
      ["Koliko meril se ocenjuje pri krajšem pisnem sestavku?", "4 (vsebina, sporočilnost, besedišče in register, jezikovna pravilnost)", ["2", "3", "6"]],
      ["Koliko odmora je po poli 2?", "30 minut", ["10 minut", "5 minut", "ni odmora"]],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg}.</p>` });
  });
  vrzeli(serija, "mesano", [
    ["I'm really looking forward ___ the holidays.", "to", ["for", "on", "at"], "Look forward to."],
    ["She has been working here ___ 2020.", "since", ["for", "from", "during"], "Since + časovna točka."],
    ["If I ___ more time, I would learn Chinese.", "had", ["have", "would have", "will have"], "Second conditional."],
    ["The castle ___ in the 12th century.", "was built", ["built", "is built", "has built"], "Trpnik v preteklosti."],
    ["He suggested ___ a taxi.", "taking", ["to take", "take", "taken"], "Suggest + -ing.", 3],
    ["I'm not used to ___ up so early.", "getting", ["get", "got", "to get"], "Be used to + -ing.", 3],
    ["Hardly ___ arrived when it started to rain.", "had we", ["we had", "we have", "have we"], "Inverzija po hardly.", 4, "visja"],
    ["Not only ___ late, but he also forgot the tickets.", "was he", ["he was", "he is", "is he"], "Inverzija po not only.", 4, "visja"],
    ["She made me ___ the whole story again.", "tell", ["to tell", "telling", "told"], "Make somebody do something.", 3],
    ["The more you practise, ___ you get.", "the better", ["better", "the best", "more better"], "The more …, the better …", 3],
    ["I'd like ___ to the concert.", "to go", ["going", "go", "gone"], "Would like + to-infinitive."],
    ["She avoided ___ him.", "meeting", ["to meet", "meet", "met"], "Avoid + -ing.", 3],
    ["There isn't ___ milk left.", "any", ["some", "many", "few"], "Any v nikalnih stavkih."],
    ["How ___ people came to the party?", "many", ["much", "lot", "few of"], "Many s števnimi samostalniki.", 1],
    ["He's the ___ student in the class.", "best", ["better", "goodest", "most good"], "Presežnik od good.", 1],
    ["This is ___ interesting book I have ever read.", "the most", ["the more", "most", "more"], "Presežnik daljših pridevnikov."],
    ["Neither Tom ___ Ann came.", "nor", ["or", "and", "neither"], "Neither … nor.", 3],
    ["I wish I ___ speak French.", "could", ["can", "will", "would"], "Wish + could za sposobnost.", 3],
    ["By the time she arrives, we ___ dinner.", "will have finished", ["will finish", "finish", "have finished"], "Future perfect.", 4, "visja"],
    ["It's no use ___ about it now.", "complaining", ["to complain", "complain", "complained"], "It's no use + -ing.", 4, "visja"],
    ["You'd better ___ now.", "leave", ["to leave", "leaving", "left"], "Had better + infinitive brez to.", 3],
    ["I haven't seen him ___ ages.", "for", ["since", "during", "from"], "For ages."],
  ]);
}
