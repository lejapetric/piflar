import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija, pojmi }) {
  serija("vezniki", 16, (r) => {
    const [v, f] = r.izberi([["Furthermore", "dodajanje"], ["Moreover", "dodajanje"], ["However", "nasprotje"], ["Nevertheless", "nasprotje"], ["Therefore", "posledica"], ["Consequently", "posledica"], ["For instance", "primer"], ["To sum up", "zaključek"], ["Firstly", "naštevanje"], ["Whereas", "primerjava (nasprotje)"], ["In addition", "dodajanje"], ["On the other hand", "nasprotje"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšno vlogo ima povezovalni izraz <em>${v}</em>?`, pravilna: f, napacne: r.premesaj(["dodajanje", "nasprotje", "posledica", "primer", "zaključek", "naštevanje", "primerjava (nasprotje)"].filter((x) => x !== f)).slice(0, 3), postopek: `<p><em>${v}</em> – ${f}.</p>` });
  });
  serija("zgradba", 8, (r) => {
    const [d, odg] = r.izberi([["predstavimo temo in tezo", "uvod (introduction)"], ["vsak odstavek razvije en argument s primerom", "jedro (body paragraphs)"], ["povzamemo argumente in izrazimo stališče", "zaključek (conclusion)"], ["prvi stavek odstavka napove njegovo glavno misel", "topic sentence"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katerem delu sestavka ali s katerim elementom: ${d}?`, pravilna: odg, napacne: ["uvod (introduction)", "jedro (body paragraphs)", "zaključek (conclusion)", "topic sentence"].filter((x) => x !== odg), postopek: `<p>${odg}.</p>` });
  });
  vrzeli(serija, "povezovanje", [
    ["Many people enjoy social media. ___, others find it stressful.", "However", ["Moreover", "Therefore", "For example"], "However za nasprotje.", 1],
    ["Exercise is good for your health. ___, it can improve your mood.", "Moreover", ["However", "Although", "Otherwise"], "Moreover za dodatni argument.", 2],
    ["The city is crowded. ___, many people move to the countryside.", "Consequently", ["Nevertheless", "Whereas", "Unless"], "Consequently za posledico.", 3],
    ["___ some students prefer online lessons, others like classrooms.", "While", ["However", "Despite", "Moreover"], "While (= whereas) povezuje dva stavka v nasprotju.", 3],
    ["___ the high price, the concert was sold out.", "Despite", ["Although", "However", "Because"], "Despite + samostalnik.", 3],
    ["There are several reasons for this. ___, …", "Firstly", ["Lastly", "Finally", "In conclusion"], "Firstly začne naštevanje.", 1],
    ["___, I believe the advantages outweigh the disadvantages.", "All things considered", ["For instance", "Moreover", "Firstly"], "All things considered = upoštevajoč vse.", 4, "visja"],
    ["Many jobs, ___ nursing, are poorly paid.", "such as", ["for", "like as", "as such"], "Such as za primer.", 2],
    ["It is often argued ___ young people read less than before.", "that", ["what", "which", "if"], "It is argued that…", 4, "visja"],
    ["___ to popular belief, reading on screens is not always worse.", "Contrary", ["Opposite", "Against", "Unlike"], "Contrary to popular belief.", 4, "visja"],
    ["The town is small, ___ it has excellent schools.", "yet", ["so", "because", "unless"], "Yet = vendar.", 3],
    ["Not only is the plan expensive, ___ it is also unrealistic.", "but", ["and", "so", "however"], "Not only … but also.", 4, "visja"],
    ["___ conclusion, both options have their merits.", "In", ["On", "At", "For"], "In conclusion.", 1],
  ]);
  pojmi([
    ["argumentativni sestavek", "Sestavek, v katerem pisec zagovarja stališče z argumenti."],
    ["pripovedni sestavek", "Sestavek, ki pripoveduje zgodbo v časovnem zaporedju."],
    ["opisni sestavek", "Sestavek, ki opisuje osebo, kraj ali dogodek."],
    ["topic sentence", "Uvodna poved odstavka, ki napove njegovo glavno misel."],
    ["teza", "Osrednja trditev, ki jo pisec zagovarja."],
    ["protiargument", "Argument nasprotne strani, ki ga pisec omeni in ovrže."],
  ]);
}
