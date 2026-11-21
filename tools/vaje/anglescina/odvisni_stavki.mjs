import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "casovni", [
    ["I'll call you when I ___ (get) home.", "get", ["will get", "got", "would get"], "Za when o prihodnosti: present simple, ne will.", 1],
    ["As soon as the results ___ (come) out, I'll let you know.", "come", ["will come", "came", "are coming out"], "as soon as + present simple za prihodnost."],
    ["We won't start until everyone ___ (be) here.", "is", ["will be", "was", "be"], "until + present simple."],
    ["You can go out after you ___ (finish) your homework.", ["have finished", "finish"], ["will finish", "will have finished", "finished"], "after + present perfect poudari, da bo prej končano.", 3],
    ["By the time we arrived, the film ___ (start).", "had started", ["started", "has started", "was starting"], "by the time + past simple, glavni stavek past perfect.", 3],
    ["While I ___ (cook), the phone rang.", "was cooking", ["cooked", "am cooking", "had cooked"], "while + past continuous za ozadje."],
    ["When he ___ (see) me, he waved.", "saw", ["was seeing", "has seen", "sees"], "Zaporedni dejanji v preteklosti: when + past simple.", 1],
    ["I have known her since we ___ (be) children.", "were", ["have been", "are", "had been"], "since + past simple (točka v preteklosti).", 3],
    ["Send me the report ___ Friday at the latest.", "by", ["until", "till", "since"], "by = najkasneje do (rok).", 3],
    ["The shop is open ___ 8 p.m.", ["until", "till"], ["by", "since", "for"], "until = do (trajanje).", 3],
    ["Before you ___ (leave), turn off the lights.", "leave", ["will leave", "left", "are going to leave"], "before + present simple.", 1],
    ["Once you ___ (learn) the rules, the game is easy.", ["have learnt", "have learned", "learn"], ["will learn", "learnt", "had learnt"], "once + present perfect/present simple.", 3],
  ]);
  vrzeli(serija, "namen", [
    ["She went to London ___ improve her English.", "to", ["for", "for to", "so"], "Namen z istim osebkom: to + glagol.", 1],
    ["I set two alarms ___ I wouldn't oversleep.", "so that", ["in case", "because of", "in order to"], "so that + osebek + would/could.", 3],
    ["Take a jacket ___ it gets cold.", "in case", ["so that", "unless", "despite"], "in case = za vsak primer.", 3],
    ["He left early ___ as not to miss the bus.", "so", ["such", "in order", "for"], "so as not to = da ne bi.", 3],
    ["We went out ___ a walk.", "for", ["to", "so that", "in order to"], "for + samostalnik za namen."],
    ["I lent him my notes so that he ___ study for the test.", "could", ["can to", "would to", "for"], "so that + could v preteklosti.", 3],
    ["She spoke slowly ___ order to be understood.", "in", ["so", "for", "as"], "in order to + glagol."],
    ["It was raining, ___ we stayed in.", "so", ["such", "because", "although"], "so = zato (posledica).", 1],
    ["The test was ___ difficult that nobody finished it.", "so", ["such", "too", "very"], "so + pridevnik + that."],
    ["It was ___ a difficult test that nobody finished it.", "such", ["so", "too", "very"], "such a + pridevnik + samostalnik + that."],
    ["Prices rose sharply. As a ___, sales fell.", "result", ["consequence of", "reason", "cause"], "As a result = posledično (nova poved).", 3],
    ["The match was cancelled ___ the storm.", ["because of", "due to", "owing to"], ["because", "so that", "although"], "Pred samostalnikom: because of / due to.", 3],
    ["He didn't study. ___, he failed the exam.", ["Therefore", "Consequently", "As a result"], ["However", "Although", "Despite"], "Therefore = zato, formalno, nova poved.", 4, "visja"],
  ]);
  vrzeli(serija, "dopustnost", [
    ["___ it was late, we went for a walk.", ["Although", "Even though", "Though"], ["Despite", "However", "In spite of"], "although + stavek.", 1],
    ["___ the rain, we went out.", ["Despite", "In spite of"], ["Although", "Even though", "However"], "despite + samostalnik.", 1],
    ["In spite ___ feeling ill, she came to school.", "of", ["from", "that", "by"], "in spite of + -ing."],
    ["Despite ___ tired, he kept working.", "being", ["he was", "of being", "be"], "despite + -ing.", 3],
    ["The hotel was cheap. ___, it was very clean.", ["However", "Nevertheless"], ["Although", "Despite", "Even though"], "However na začetku nove povedi, za njim vejica.", 3],
    ["My sister loves sport, ___ I prefer reading.", ["whereas", "while"], ["despite", "however", "in spite of"], "whereas primerja dve nasprotji.", 3],
    ["Despite the fact ___ he was tired, he finished the essay.", "that", ["of", "which", "what"], "despite the fact that + stavek.", 3],
    ["___ he had a headache, he went to work.", ["Although", "Even though", "Though"], ["Despite", "In spite", "However"], "although + stavek z osebkom in glagolom."],
    ["Tired ___ she was, she finished the essay.", ["as", "though"], ["although", "despite", "so"], "Pridevnik + as/though + osebek + glagol = čeprav.", 4, "visja"],
    ["It was expensive, ___ it was worth it.", ["but", "yet"], ["although", "despite", "however"], "but povezuje dva glavna stavka.", 1],
  ]);
}
