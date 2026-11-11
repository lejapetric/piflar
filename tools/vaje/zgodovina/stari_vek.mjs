import { zgodovinskeSerije } from "../zgodovina-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  zgodovinskeSerije(serija, {
    dogodki: [
      ["so po izročilu ustanovili Rim", -753], ["so bile po izročilu prve olimpijske igre", -776], ["je bila bitka pri Maratonu", -490], ["je bila pomorska bitka pri Salamini", -480],
      ["se je začela peloponeška vojna", -431], ["je umrl Aleksander Veliki", -323], ["je bil umorjen Gaj Julij Cezar", -44], ["je Oktavijan dobil naziv Avgust", -27],
      ["je cesar Konstantin izdal milanski edikt", 313], ["je bil Konstantinopel razglašen za prestolnico", 330], ["se je rimsko cesarstvo dokončno razdelilo na vzhodno in zahodno", 395],
      ["je propadlo Zahodno rimsko cesarstvo", 476], ["so Rimljani porušili Kartagino", -146], ["je izbruhnil Vezuv in zasul Pompeje", 79], ["so bile izvedene Solonove reforme v Atenah", -594],
      ["so Kleistenove reforme vpeljale demokracijo v Atenah", -508], ["je Hanibal prečkal Alpe", -218], ["je bil v Rimu sprejet zakonik dvanajstih plošč", -450],
    ],
    osebe: [["Hamurabi", "je dal zapisati enega najstarejših zakonikov"], ["Perikles", "je vodil Atene v času največjega razcveta"], ["Solon", "je odpravil dolžniško suženjstvo v Atenah"], ["Aleksander Veliki", "je ustvaril imperij od Grčije do Indije"], ["Hanibal", "je kartažanski vojskovodja, ki je prečkal Alpe s sloni"], ["Spartak", "je vodil upor sužnjev v Italiji"], ["Gaj Julij Cezar", "je osvojil Galijo in postal dosmrtni diktator"], ["Oktavijan Avgust", "je bil prvi rimski cesar"], ["Konstantin Veliki", "je s toleranco omogočil širjenje krščanstva"], ["Teodozij I.", "je krščanstvo razglasil za državno vero"], ["Herodot", "je »oče zgodovinopisja«"], ["Sokrat", "je atenski filozof, obsojen na smrt s strupom"]],
  });
  serija("civilizacija", 8, (r) => {
    const [d, odg] = r.izberi([["piramide, hieroglifi, faraon", "stari Egipt"], ["klinopis, zigurati, Babilon", "Mezopotamija"], ["polis, demokracija, olimpijske igre", "stara Grčija"], ["republika, konzula, senat", "stari Rim"], ["Mohendžo Daro in Harapa", "Induska civilizacija"], ["palača v Knososu", "minojska (kretska) kultura"], ["veliki zid in dinastija Qin", "stara Kitajska"], ["purpur in črkovna pisava", "Feničani"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Na katero civilizacijo se nanaša: ${d}?`, pravilna: odg, napacne: r.premesaj(["stari Egipt", "Mezopotamija", "stara Grčija", "stari Rim", "Induska civilizacija", "minojska (kretska) kultura", "stara Kitajska", "Feničani"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${odg}.</p>` });
  });
  serija("slovenija", 5, (r) => {
    const [d, odg] = r.izberi([["Emona", "Ljubljana"], ["Celeia", "Celje"], ["Poetovio", "Ptuj"], ["Neviodunum", "Drnovo pri Krškem"], ["Nauportus", "Vrhnika"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katero današnje naselje leži na mestu rimskega ${d}?`, pravilna: odg, napacne: ["Ljubljana", "Celje", "Ptuj", "Drnovo pri Krškem", "Vrhnika"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${d}: ${odg}.</p>` });
  });
  pojmi([
    ["polis", "Grška mestna država."],
    ["demokracija", "Oblast ljudstva; v Atenah so odločali svobodni moški državljani."],
    ["tiranija", "Oblast posameznika, ki si jo je prisvojil mimo zakonov."],
    ["helenizem", "Obdobje širjenja grške kulture po osvajanjih Aleksandra Velikega."],
    ["republika", "Država, v kateri oblast izvajajo izvoljeni uradniki, ne kralj."],
    ["patriciji", "Rimsko plemstvo."],
    ["plebejci", "Svobodni rimski državljani, ki niso bili plemiči."],
    ["provinca", "Osvojeno ozemlje pod rimsko upravo zunaj Italije."],
    ["romanizacija", "Prevzemanje rimskega jezika, prava in načina življenja."],
    ["limes", "Utrjena meja rimskega cesarstva."],
    ["klinopis", "Mezopotamska pisava z vtisnjenimi klinastimi znaki."],
    ["hieroglifi", "Slikovna pisava starih Egipčanov."],
    ["preseljevanje ljudstev", "Množični premiki ljudstev ob koncu antike."],
  ]);
  vprasanja([
    [3, "Kdo je imel v atenski demokraciji volilno pravico?", "polnoletni svobodni moški državljani", ["vsi prebivalci", "tudi sužnji in tujci", "le plemiči"], "Ženske, sužnji in meteki niso volili."],
    [4, "Zakaj je propadlo Zahodno rimsko cesarstvo?", "zaradi gospodarske krize, notranjih sporov in pritiska germanskih ljudstev", ["zaradi izbruha Vezuva", "zaradi arabskih osvajanj", "zaradi kuge leta 1348"], "Leta 476 je Odoaker odstavil zadnjega cesarja.", "visja"],
    [4, "Zakaj je bila rimska cesta Akvileja–Emona pomembna?", "povezovala je Italijo s Panonijo in Podonavjem", ["vodila je v Egipt", "bila je del svilene ceste", "povezovala je Grčijo s Kartagino"], "Ozemlje današnje Slovenije je bilo prehodno.", "visja"],
    [4, "Kakšna je razlika med rimsko republiko in principatom?", "v principatu je dejansko oblast imel cesar, republikanske ustanove pa so ostale formalno", ["v principatu ni bilo senata", "republika je imela kralja", "razlike ni"], "Avgust je ohranil videz republike.", "visja"],
  ]);
}
