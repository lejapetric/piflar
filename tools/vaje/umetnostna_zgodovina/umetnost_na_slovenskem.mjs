import { skladateljiSerije } from "../glasba-lib.mjs";
import { izbira } from "../lib.mjs";
const OB = [["Vaška situla", "prazgodovina"], ["Emona", "antika"], ["Stiški samostan", "romanika"], ["Mrtvaški ples v Hrastovljah", "gotika"], ["Ptujska Gora", "gotika"], ["ljubljanska stolnica", "barok"], ["Robbov vodnjak", "barok"], ["Narodni dom v Ljubljani", "historizem"], ["Sejalec", "impresionizem"], ["NUK", "moderna"], ["Nebotičnik v Ljubljani", "moderna"], ["Cankarjev dom", "povojna moderna arhitektura"]];
const OBN = [...new Set(OB.map(([, o]) => o))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("obdobje", 12, (r, i) => izbira({ r, tezavnost: 2, besedilo: `V katero obdobje oziroma slog uvrščamo <em>${OB[i][0]}</em>?`, pravilna: OB[i][1], napacne: r.premesaj(OBN.filter((x) => x !== OB[i][1])).slice(0, 3), postopek: `<p>${OB[i][0]}: ${OB[i][1]}.</p>` }));
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Mrtvaški ples v Hrastovljah", "Janez iz Kastva"], ["Robbov vodnjak", "Francesco Robba"], ["Sejalec", "Ivan Grohar"], ["Kofetarica", "Ivana Kobilca"], ["Tromostovje", "Jože Plečnik"], ["Nebotičnik", "Vladimir Šubic"], ["Cankarjev dom", "Edvard Ravnikar"], ["Trg republike", "Edvard Ravnikar"], ["Nismo poslednji", "Zoran Mušič"], ["portreti meščanov v bidermajerju", "Mihael Stroj"]],
    osebe: [["Ivana Kobilca", "najpomembnejša slovenska slikarka realizma"], ["Jože Plečnik", "arhitekt, ki je oblikoval Ljubljano med vojnama"], ["Edvard Ravnikar", "Plečnikov učenec in vodilni arhitekt povojne moderne"], ["Rihard Jakopič", "vodja slovenskih impresionistov"], ["Francesco Robba", "baročni kipar v Ljubljani"], ["Janez iz Kastva", "avtor mrtvaškega plesa v Hrastovljah"], ["Zoran Mušič", "slikar, ki je preživel Dachau"], ["Vladimir Šubic", "arhitekt Nebotičnika (1933)"]],
  });
  pojmi([
    ["Emona", "Rimska kolonija na mestu današnje Ljubljane."],
    ["kranjska gotika", "Poznogotske cerkve na Kranjskem z bogatimi oboki."],
    ["Academia operosorum", "Ljubljansko društvo, ki je spodbudilo baročno prenovo mesta."],
    ["Narodna galerija", "Osrednji slovenski muzej starejše umetnosti v Ljubljani."],
    ["Moderna galerija", "Muzej moderne in sodobne umetnosti v Ljubljani."],
  ]);
  vprasanja([
    [4, "Kako je potres leta 1895 vplival na podobo Ljubljane?", "sprožil je obnovo v historističnem in secesijskem slogu (npr. Fabiani)", ["mesto so opustili", "zgradili so gotske katedrale", "nastal je Robbov vodnjak"], "Secesijske hiše na Miklošičevi cesti.", "visja"],
    [4, "Zakaj je Plečnikova Ljubljana na Unescovem seznamu svetovne dediščine?", "ker je izjemen primer arhitekture po meri človeka, ki povezuje antično izročilo z modernim mestom", ["ker je baročna", "ker je najstarejša v Evropi", "ker je zgrajena iz lesa"], "Vpis 2021.", "visja"],
  ]);
}
