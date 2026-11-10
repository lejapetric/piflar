import { vrzeli } from "../jezik-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija }) {
  serija("tip", 10, (r) => {
    const [p, t] = r.izberi([["If you heat ice, it melts.", "zero conditional"], ["If it rains, we will stay at home.", "first conditional"], ["If I had more money, I would buy a car.", "second conditional"], ["If she had studied, she would have passed.", "third conditional"], ["If I had taken the job, I would be rich now.", "mixed conditional"], ["If you press this button, the machine stops.", "zero conditional"], ["If he calls, I'll tell him.", "first conditional"], ["If I were you, I would apologise.", "second conditional"], ["If we had left earlier, we wouldn't have missed the train.", "third conditional"]]);
    return izbira({ r, tezavnost: t === "mixed conditional" ? 4 : 2, ...(t === "mixed conditional" ? { raven: "visja" } : {}), besedilo: `Kateri pogojnik je v povedi: <em>${p}</em>`, pravilna: t, napacne: ["zero conditional", "first conditional", "second conditional", "third conditional", "mixed conditional"].filter((x) => x !== t).slice(0, 3), postopek: `<p>${t}.</p>` });
  });
  vrzeli(serija, "pogojniki", [
    ["If you ___ (mix) red and white, you get pink.", "mix", ["will mix", "mixed", "would mix"], "Zero conditional: if + present simple, present simple.", 1],
    ["If it ___ (be) sunny tomorrow, we'll go to the beach.", "is", ["will be", "was", "would be"], "First conditional: if + present simple, will + glagol.", 1],
    ["If I ___ (have) a dog, I would walk it every day.", "had", ["have", "would have", "will have"], "Second conditional: if + past simple, would + glagol."],
    ["If I ___ (be) you, I would take the offer.", ["were", "was"], ["am", "would be", "will be"], "If I were you – nasvet; »were« za vse osebe je bolj formalno."],
    ["If she ___ (know) the answer, she would have told us.", "had known", ["knew", "would know", "has known"], "Third conditional: if + past perfect, would have + past participle.", 3],
    ["We ___ (miss) the bus if we don't hurry.", "will miss", ["would miss", "miss", "missed"], "First conditional – realna možnost v prihodnosti."],
    ["If he had trained harder, he ___ (win) the race.", "would have won", ["would win", "will win", "won"], "Third conditional – neuresničena preteklost.", 3],
    ["If I won the lottery, I ___ (travel) around the world.", "would travel", ["will travel", "travel", "would have travelled"], "Second conditional – malo verjetna sedanjost/prihodnost."],
    ["Unless you ___ (study), you will fail.", "study", ["don't study", "will study", "studied"], "Unless = if not; za njim ne uporabimo nikalnice.", 3],
    ["If I had saved more money, I ___ (be) able to buy a car now.", "would be", ["would have been", "will be", "am"], "Mixed conditional: preteklo dejanje s posledico v sedanjosti.", 4, "visja"],
    ["If she weren't so shy, she ___ (speak) to him at the party yesterday.", "would have spoken", ["would speak", "spoke", "will speak"], "Mixed conditional: trajna lastnost s posledico v preteklosti.", 4, "visja"],
    ["I wish I ___ (have) more free time.", "had", ["have", "would have", "had had"], "Wish + past simple za želje o sedanjosti.", 3],
    ["I wish I ___ (not say) that yesterday.", "hadn't said", ["didn't say", "wouldn't say", "haven't said"], "Wish + past perfect za obžalovanje preteklosti.", 4, "visja"],
    ["___ you need help, call me.", "Should", ["Would", "Had", "Were"], "Inverzija: Should you need = If you need (formalno).", 4, "visja"],
    ["___ I known, I would have come.", "Had", ["If", "Would", "Should"], "Inverzija v third conditional: Had I known = If I had known.", 4, "visja"],
    ["You can borrow my car as long as you ___ (drive) carefully.", "drive", ["will drive", "would drive", "drove"], "As long as = pod pogojem, da; sledi present simple.", 3],
    ["If the weather ___ (be) nicer, we would eat outside.", ["were", "was"], ["is", "will be", "would be"], "Second conditional."],
    ["What would you do if you ___ (find) a wallet in the street?", "found", ["find", "would find", "had found"], "Second conditional – hipotetična situacija."],
    ["If you ___ (not water) plants, they die.", "don't water", ["won't water", "didn't water", "wouldn't water"], "Zero conditional – splošna resnica.", 1],
    ["It's time we ___ (go) home.", "went", ["go", "will go", "had gone"], "It's time + past simple.", 4, "visja"],
    ["I'd rather you ___ (not tell) anyone.", "didn't tell", ["don't tell", "won't tell", "not tell"], "Would rather + oseba + past simple.", 4, "visja"],
    ["If they ___ (invite) me, I would have gone.", "had invited", ["invited", "would invite", "have invited"], "Third conditional.", 3],
    ["Provided that it ___ (not rain), the match will take place.", "doesn't rain", ["won't rain", "didn't rain", "wouldn't rain"], "Provided that kot if; present simple za prihodnost.", 3],
    ["If I ___ (be) taller, I could play basketball.", ["were", "was"], ["am", "would be", "had been"], "Second conditional s could."],
  ]);
}
