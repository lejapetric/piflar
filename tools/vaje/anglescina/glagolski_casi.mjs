import { vrzeli } from "../jezik-lib.mjs";
import { besedilo, izbira } from "../lib.mjs";

const NEP = [["go", "went", "gone"], ["see", "saw", "seen"], ["take", "took", "taken"], ["write", "wrote", "written"], ["eat", "ate", "eaten"], ["begin", "began", "begun"], ["bring", "brought", "brought"], ["buy", "bought", "bought"], ["think", "thought", "thought"], ["teach", "taught", "taught"], ["catch", "caught", "caught"], ["drink", "drank", "drunk"], ["swim", "swam", "swum"], ["choose", "chose", "chosen"], ["fly", "flew", "flown"], ["forget", "forgot", "forgotten"], ["give", "gave", "given"], ["know", "knew", "known"], ["leave", "left", "left"], ["speak", "spoke", "spoken"], ["steal", "stole", "stolen"], ["throw", "threw", "thrown"], ["wear", "wore", "worn"], ["understand", "understood", "understood"], ["build", "built", "built"], ["feel", "felt", "felt"], ["lose", "lost", "lost"], ["ride", "rode", "ridden"], ["sing", "sang", "sung"], ["break", "broke", "broken"]];

export default function ({ serija }) {
  serija("nepravilni", 30, (r, i) => {
    const [inf, ps, pp] = r.izberi(NEP), part = i % 2 === 1;
    return besedilo({ tezavnost: part ? 3 : 2, sprejemljivi: [part ? pp : ps], besedilo: `Zapiši ${part ? "past participle (3. obliko)" : "past simple (2. obliko)"} nepravilnega glagola <em>${inf}</em>.`, rezultat: `${inf} – ${ps} – ${pp}`, postopek: `<p>${inf} – ${ps} – ${pp}</p>` });
  });
  vrzeli(serija, "casi", [
    ["She usually ___ (go) to school by bus.", "goes", ["go", "is going", "went"], "Present simple za navade; 3. oseba ednine dobi -s.", 1],
    ["Look! It ___ (rain).", "is raining", ["rains", "rained", "has rained"], "Present continuous za dejanje, ki poteka zdaj.", 1],
    ["I ___ (visit) London last summer.", "visited", ["have visited", "visit", "was visiting"], "Past simple z določenim časom v preteklosti (last summer).", 1],
    ["We ___ (live) here since 2015.", "have lived", ["live", "lived", "are living"], "Present perfect s since/for za stanje, ki traja do zdaj."],
    ["When I arrived, they ___ (have) dinner.", "were having", ["had", "have had", "are having"], "Past continuous za dejanje, ki je potekalo, ko se je zgodilo drugo."],
    ["By the time we got to the cinema, the film ___ (start).", "had started", ["started", "has started", "was starting"], "Past perfect za dejanje pred drugim preteklim dejanjem."],
    ["I ___ (never / be) to Japan.", "have never been", ["never was", "had never been", "was never"], "Present perfect za izkušnje brez časovne opredelitve."],
    ["This time tomorrow I ___ (fly) to Paris.", "will be flying", ["will fly", "fly", "am flying"], "Future continuous za dejanje, ki bo potekalo ob določenem času v prihodnosti.", 3],
    ["By 2030 they ___ (finish) the new bridge.", "will have finished", ["will finish", "finish", "have finished"], "Future perfect za dejanje, končano do točke v prihodnosti.", 4, "visja"],
    ["She ___ (work) here for ten years by next June.", "will have been working", ["will work", "has worked", "is working"], "Future perfect continuous poudari trajanje do točke v prihodnosti.", 4, "visja"],
    ["I'm tired because I ___ (run).", "have been running", ["run", "ran", "am running"], "Present perfect continuous za nedavno, trajajoče dejanje z vidno posledico.", 3],
    ["The train ___ (leave) at 6.30 tomorrow morning.", "leaves", ["is leaving", "will be leaving", "left"], "Present simple za vozne rede in urnike.", 3],
    ["Water ___ (boil) at 100 °C.", "boils", ["is boiling", "boiled", "has boiled"], "Present simple za splošne resnice.", 1],
    ["I ___ (meet) my friends tonight – we've already booked a table.", "am meeting", ["meet", "will meet", "met"], "Present continuous za dogovorjene načrte."],
    ["Look at those clouds! It ___ (rain).", "is going to rain", ["will rain", "rains", "is raining"], "Going to za napoved na podlagi vidnih znakov."],
    ["I think he ___ (pass) the exam.", "will pass", ["is passing", "passes", "passed"], "Will za mnenje ali napoved."],
    ["She ___ (study) when the phone rang.", "was studying", ["studied", "has studied", "is studying"], "Past continuous je prekinilo kratko dejanje v past simple."],
    ["How long ___ you ___ (know) each other?", "have known", ["did know", "are knowing", "do know"], "Stative verb know ne gre v continuous; present perfect za trajanje.", 3],
    ["He ___ (lose) his keys, so he can't get in.", "has lost", ["lost", "had lost", "loses"], "Present perfect za preteklo dejanje s posledico v sedanjosti."],
    ["When I was a child, I ___ (play) football every day.", "used to play", ["use to play", "am used to playing", "was used to play"], "Used to za pretekle navade."],
    ["They ___ (wait) for two hours before the bus finally came.", "had been waiting", ["waited", "have been waiting", "were waiting"], "Past perfect continuous za trajanje pred preteklim dogodkom.", 4, "visja"],
    ["I ___ (not see) him yet.", "haven't seen", ["didn't see", "don't see", "hadn't seen"], "Yet v nikalnih stavkih s present perfect."],
    ["___ you ___ (finish) your homework already?", ["Have / finished", "have finished", "have, finished"], ["Did / finish", "Do / finish", "Are / finishing"], "Already/yet → present perfect."],
    ["Shakespeare ___ (write) many plays.", "wrote", ["has written", "had written", "writes"], "Past simple za pokojne osebe in zaključena obdobja.", 3],
    ["As soon as I ___ (get) home, I'll call you.", "get", ["will get", "got", "am getting"], "V časovnih odvisnikih (as soon as, when) za prihodnost uporabimo present simple.", 3],
    ["I ___ (just / finish) my essay.", "have just finished", ["just finished", "had just finished", "just finish"], "Just s present perfect za pravkar končano dejanje."],
  ]);
}
