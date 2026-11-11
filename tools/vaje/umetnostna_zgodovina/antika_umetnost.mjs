import { skladateljiSerije } from "../glasba-lib.mjs";
import { izbira } from "../lib.mjs";
const RED = [["kapitel z volutama (polžema)", "jonski red"], ["preprost blazinast kapitel brez baze", "dorski red"], ["kapitel z listi akanta", "korintski red"], ["vitek steber z bazo in kanelurami ter friz z neprekinjenim reliefom", "jonski red"], ["masiven steber brez baze, friz s triglifi in metopami", "dorski red"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("red", 5, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Kateri stebrni red ima: ${RED[i][0]}?`, pravilna: RED[i][1], napacne: ["dorski red", "jonski red", "korintski red"].filter((x) => x !== RED[i][1]), postopek: `<p>${RED[i][1]}.</p>` }));
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Metalec diska (Diskobol)", "Miron"], ["Kopjenosec (Dorifor)", "Poliklet"], ["Atena Partenos", "Fidija"], ["Afrodita Knidska", "Praksitel"], ["Apoksiomen (strgač)", "Lizip"], ["Partenon", "Iktin in Kalikrat"]],
    osebe: [["Miron", "kipar zgodnje klasike, ki je upodobil trenutek pred metom"], ["Poliklet", "kipar, ki je v spisu Kanon določil idealna razmerja telesa"], ["Fidija", "kipar, ki je vodil okrasitev Partenona"], ["Praksitel", "kipar pozne klasike, prvi upodobil golo boginjo"], ["Lizip", "dvorni kipar Aleksandra Velikega z vitkejšim kanonom"]],
  });
  pojmi([
    ["kontrapost", "Drža, pri kateri telo nosi ena noga, druga je sproščena, kar ustvari protigibanje."],
    ["kuros", "Arhaični kip golega mladeniča v togi frontalni drži."],
    ["kora", "Arhaični kip oblečene mladenke."],
    ["arhaični nasmeh", "Rahel nasmeh na obrazih arhaičnih kipov."],
    ["helenizem", "Obdobje po Aleksandru Velikem z dramatičnim gibanjem in čustvi."],
    ["peripteros", "Tempelj, ki ga z vseh strani obdaja vrsta stebrov."],
    ["akropola", "Utrjen grad na vzpetini, v Atenah svetišče."],
    ["forum", "Osrednji trg rimskega mesta."],
    ["bazilika", "Rimska pravosodna in tržna dvorana, pozneje oblika cerkve."],
    ["amfiteater", "Rimsko eliptično prizorišče za igre, npr. Kolosej."],
    ["slavolok", "Rimski slavnostni lok v čast zmagi."],
    ["rimski portret", "Realistična upodobitev posameznika z značilnimi potezami."],
  ]);
  vprasanja([
    [3, "Kateri rimski gradbeni dosežek je omogočil kupolo Panteona?", "rimski beton in obok", ["gotski oporniki", "železni nosilci", "lesene grede"], "Kupola s premerom približno 43 m."],
    [4, "Po čem prepoznamo helenistični kip, npr. Laokoontovo skupino?", "dramatično gibanje, napetost in izrazito trpljenje", ["toga frontalna drža", "arhaični nasmeh", "popolno mirovanje in idealna lepota"], "Helenizem poudarja čustva in gibanje.", "visja"],
    [4, "Kateri antični ostanki so ohranjeni v Ljubljani?", "ostanki rimske Emone (obzidje, hiše, grobišča)", ["grška akropola", "egipčanski obelisk", "etruščanski tempelj"], "Emona je bila rimska kolonija.", "visja"],
  ]);
}
