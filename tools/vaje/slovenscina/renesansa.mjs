import { literarneSerije } from "../slovenscina-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Dekameron", "Giovanni Boccaccio", "novela"], ["Canzoniere (Soneti Lauri)", "Francesco Petrarca", "sonet"], ["Romeo in Julija", "William Shakespeare", "tragedija"], ["Hamlet", "William Shakespeare", "tragedija"], ["Sen kresne noči", "William Shakespeare", "komedija"], ["Don Kihot", "Miguel de Cervantes", "roman"], ["Gargantua in Pantagruel", "François Rabelais", "roman"], ["Kralj Lear", "William Shakespeare", "tragedija"], ["Beneški trgovec", "William Shakespeare", "komedija"], ["Macbeth", "William Shakespeare", "tragedija"]],
    osebe: [["Francesco Petrarca", "je opeval Lauro v sonetih"], ["Giovanni Boccaccio", "je napisal sto novel, ki jih pripoveduje deset mladih"], ["William Shakespeare", "je angleški dramatik iz Stratforda"], ["Miguel de Cervantes", "je napisal parodijo viteških romanov"], ["François Rabelais", "je napisal satiričen roman o velikanih"]],
  });
  serija("osebe-del", 8, (r) => {
    const [o, d] = r.izberi([["Ofelija", "Hamlet"], ["Polonij", "Hamlet"], ["Sancho Panza", "Don Kihot"], ["Dulcineja", "Don Kihot"], ["Shylock", "Beneški trgovec"], ["Merkucio", "Romeo in Julija"], ["Puck", "Sen kresne noči"], ["Lady Macbeth", "Macbeth"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katerem delu nastopa oseba ${o}?`, pravilna: `<em>${d}</em>`, napacne: ["Hamlet", "Don Kihot", "Beneški trgovec", "Romeo in Julija", "Sen kresne noči", "Macbeth"].filter((x) => x !== d).slice(0, 3).map((x) => `<em>${x}</em>`), postopek: `<p>${o}: <em>${d}</em>.</p>` });
  });
  pojmi([
    ["renesansa", "Obdobje »prerojenja« antike v 14.–16. stoletju."],
    ["humanizem", "Gibanje, ki je v središče postavilo človeka in antično izobrazbo."],
    ["novela", "Krajša pripoved z enim dogodkom in nepričakovanim preobratom."],
    ["sonet", "Pesem iz 14 verzov: dveh kvartin in dveh tercin."],
    ["petrarkizem", "Posnemanje Petrarcove ljubezenske lirike."],
    ["okvirna zgodba", "Zgodba, ki povezuje vložene pripovedi."],
    ["monolog", "Daljši govor ene osebe v drami."],
    ["blankverz", "Nerimani petstopični jamb, značilen za Shakespeara."],
    ["parodija", "Posnemanje dela ali sloga z namenom smešenja."],
    ["elizabetinsko gledališče", "Angleško gledališče v času kraljice Elizabete I."],
    ["tragični junak", "Junak, ki propade zaradi svoje napake in okoliščin."],
  ]);
  vprasanja([
    [2, "Kateri znani verz izreče Hamlet v monologu?", "Biti ali ne biti, to je vprašanje.", ["Pridi, videl sem, zmagal sem.", "Mislim, torej sem.", "Vse teče."], "Monolog v 3. dejanju."],
    [3, "Zakaj Don Kihot napada mline na veter?", "ker v njih vidi velikane", ["ker so mu ukradli žito", "ker želi zaslužiti", "ker ga je k temu prisilil Sancho"], "Prikaz razkoraka med domišljijo in resničnostjo."],
    [4, "Kaj je osrednji konflikt v Romeu in Juliji?", "ljubezen mladih nasproti sovraštvu dveh družin", ["boj za prestol", "spor med očetom in sinom", "vojna med državama"], "Montegi in Capuleti.", "visja"],
    [4, "Zakaj Hamlet odlaša z maščevanjem?", "ker dvomi, razmišlja in želi dokaz o stričevi krivdi", ["ker ne ve, kdo je umrl", "ker je bolan", "ker se mora poročiti"], "Hamlet kot razmišljujoči junak; mišolovka.", "visja"],
  ]);
}
