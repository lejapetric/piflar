import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  serija("funkcija", 16, (r) => {
    const [f, odg] = r.izberi([["In the foreground there is a woman holding an umbrella.", "opisovanje slike"], ["In my opinion, school uniforms are a good idea.", "izražanje mnenja"], ["I see your point, but I'm not sure I agree.", "vljudno nestrinjanje"], ["Could you repeat the question, please?", "prošnja za ponovitev"], ["It looks as if they are celebrating something.", "ugibanje"], ["On the one hand…, on the other hand…", "tehtanje prednosti in slabosti"], ["To sum up, I believe that…", "zaključevanje"], ["What I mean is…", "pojasnjevanje"], ["I totally agree with you.", "strinjanje"], ["In the background you can see some mountains.", "opisovanje slike"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj izraža fraza: <em>${f}</em>`, pravilna: odg, napacne: r.premesaj(["opisovanje slike", "izražanje mnenja", "vljudno nestrinjanje", "prošnja za ponovitev", "ugibanje", "tehtanje prednosti in slabosti", "zaključevanje", "pojasnjevanje", "strinjanje"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  vrzeli(serija, "fraze", [
    ["In the ___ of the picture there is a table.", "middle", ["midst", "medium", "half"], "In the middle of the picture.", 1],
    ["The man on the ___ is wearing a hat.", "left", ["leftside", "lefter", "lefts"], "On the left / on the right.", 1],
    ["They ___ to be enjoying themselves.", "seem", ["look like", "seems", "appear like"], "Seem to + infinitive za vtis.", 2],
    ["She looks ___ she is tired.", "as if", ["like as", "such as", "as"], "Look as if + stavek.", 3],
    ["As ___ as I'm concerned, it's a good idea.", "far", ["long", "much", "well"], "As far as I'm concerned = kar se mene tiče.", 3],
    ["I'm ___ two minds about this.", "in", ["of", "on", "at"], "Be in two minds = biti neodločen.", 4, "visja"],
    ["That's a good point, ___ I think we should consider the costs.", "but", ["because", "so", "although"], "But za vljudno nasprotovanje.", 1],
    ["___ my point of view, social media are useful.", "From", ["In", "On", "By"], "From my point of view.", 2],
    ["To be ___, I've never thought about it.", "honest", ["honestly", "honesty", "honoured"], "To be honest.", 2],
    ["It's ___ to say that technology has changed our lives.", "fair", ["right", "true of", "correct to"], "It's fair to say …", 4, "visja"],
    ["The picture ___ me of my last holiday.", "reminds", ["remembers", "recalls me", "memorises"], "Remind somebody of something.", 3],
    ["Let me ___ it another way.", "put", ["say", "tell", "speak"], "Let me put it another way.", 3],
  ]);
  pomeni(serija, "pomeni", [["in the foreground", "v ospredju"], ["in the background", "v ozadju"], ["it seems to me", "zdi se mi"], ["I'd rather", "raje bi"], ["by the way", "mimogrede"], ["for instance", "na primer"], ["it depends on", "odvisno je od"], ["I'm not sure", "nisem prepričan"], ["the main advantage", "glavna prednost"], ["the main drawback", "glavna slabost"]], { n: 16 });
}
