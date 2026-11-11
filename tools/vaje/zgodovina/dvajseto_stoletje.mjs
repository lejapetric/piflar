import { zgodovinskeSerije } from "../zgodovina-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  zgodovinskeSerije(serija, {
    dogodki: [
      ["je bil sarajevski atentat", 1914], ["je bila sprejeta majniška deklaracija", 1917], ["se je končala prva svetovna vojna", 1918], ["je bila podpisana rapalska pogodba", 1920],
      ["je bil koroški plebiscit", 1920], ["se je začela velika gospodarska kriza", 1929], ["je Hitler prišel na oblast", 1933], ["se je začela druga svetovna vojna", 1939],
      ["so sile osi napadle Jugoslavijo in ustanovljena je bila OF", 1941], ["so ZDA odvrgle atomsko bombo na Hirošimo", 1945], ["so ustanovili Organizacijo združenih narodov", 1945], ["je prišlo do spora Tito–Stalin (resolucija Informbiroja)", 1948],
      ["je bil podpisan londonski memorandum", 1954], ["je bil postavljen berlinski zid", 1961], ["je bila kubanska raketna kriza", 1962], ["je bila podpisana osimska pogodba", 1975],
      ["je umrl Josip Broz Tito", 1980], ["je padel berlinski zid", 1989], ["je bil plebiscit o samostojni Sloveniji", 1990], ["je bila razglašena samostojna Slovenija", 1991],
    ],
    osebe: [["Anton Korošec", "je prebral majniško deklaracijo"], ["Rudolf Maister", "je s prostovoljci zavaroval Maribor za slovensko stran"], ["Vladimir Iljič Lenin", "je vodil oktobrsko revolucijo"], ["Adolf Hitler", "je bil vodja nacistične Nemčije"], ["Benito Mussolini", "je ustanovil fašizem v Italiji"], ["Josip Broz Tito", "je vodil partizane in socialistično Jugoslavijo"], ["Winston Churchill", "je vodil Združeno kraljestvo med drugo svetovno vojno"], ["Franklin D. Roosevelt", "je uvedel New Deal"], ["Mihail Gorbačov", "je uvedel perestrojko in glasnost"], ["Edvard Kardelj", "je bil glavni ideolog samoupravljanja"], ["Milan Kučan", "je bil prvi predsednik samostojne Slovenije"], ["Lojze Peterle", "je bil prvi predsednik demokratično izvoljene slovenske vlade"]],
  });
  serija("blok", 6, (r) => {
    const [d, odg] = r.izberi([["NATO", "zahodni blok"], ["Varšavski pakt", "vzhodni blok"], ["Marshallov načrt", "zahodni blok"], ["SEV", "vzhodni blok"], ["gibanje neuvrščenih", "neuvrščene države"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kam v hladni vojni uvrščamo: ${d}?`, pravilna: odg, napacne: ["zahodni blok", "vzhodni blok", "neuvrščene države"].filter((x) => x !== odg), postopek: `<p>${d}: ${odg}.</p>` });
  });
  serija("okupator", 5, (r) => {
    const [d, odg] = r.izberi([["Gorenjska in Štajerska", "Nemčija"], ["Ljubljanska pokrajina", "Italija"], ["Prekmurje", "Madžarska"], ["Krško in Brežice (del Posavja)", "Nemčija"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri okupator je leta 1941 zasedel ozemlje: ${d}?`, pravilna: odg, napacne: ["Nemčija", "Italija", "Madžarska", "Neodvisna država Hrvaška"].filter((x) => x !== odg), postopek: `<p>${d}: ${odg}.</p>` });
  });
  pojmi([
    ["totalitarizem", "Sistem, v katerem država nadzoruje vsa področja življenja."],
    ["fašizem", "Skrajno nacionalistična totalitarna ideologija, nastala v Italiji."],
    ["nacizem", "Nemška različica fašizma z rasizmom in antisemitizmom."],
    ["holokavst", "Načrtno pobijanje Judov in drugih skupin v nacistični Nemčiji."],
    ["Osvobodilna fronta", "Organizacija slovenskega odporniškega gibanja med drugo svetovno vojno."],
    ["kolaboracija", "Sodelovanje z okupatorjem."],
    ["hladna vojna", "Napeto razmerje med ZDA in ZSSR po drugi svetovni vojni brez neposrednega spopada."],
    ["dekolonizacija", "Proces osamosvajanja kolonij po drugi svetovni vojni."],
    ["samoupravljanje", "Jugoslovanski sistem, v katerem naj bi o podjetjih odločali delavci."],
    ["Jugoslovanska ljudska armada", "Vojska socialistične Jugoslavije."],
    ["osamosvojitev", "Proces nastanka samostojne države."],
    ["plebiscit", "Ljudsko glasovanje o pomembnem državnem vprašanju."],
    ["demokratizacija", "Uvajanje večstrankarskega sistema in političnih svoboščin."],
  ]);
  vprasanja([
    [2, "Kateri dan praznujemo dan državnosti?", "25. junija", ["26. decembra", "8. februarja", "27. aprila"], "25. junija 1991 je skupščina sprejela osamosvojitvene akte."],
    [3, "Kateri dan praznujemo dan upora proti okupatorju?", "27. aprila", ["25. junija", "1. maja", "26. decembra"], "Spomin na ustanovitev OF 26. aprila 1941 (praznuje se 27. aprila)."],
    [4, "Kako je rapalska pogodba vplivala na Slovence?", "Primorska in del Notranjske sta pripadli Italiji", ["Koroška je pripadla Jugoslaviji", "Prekmurje je pripadlo Avstriji", "Trst je postal svobodno mesto"], "Okoli četrtina Slovencev je ostala pod Italijo.", "visja"],
    [4, "Kaj je bil pomen procesa proti četverici (JBTZ) leta 1988?", "sprožil je množično gibanje za človekove pravice in demokratizacijo", ["končal je drugo svetovno vojno", "Slovenija je vstopila v EU", "uvedel je samoupravljanje"], "Ustanovljen je bil Odbor za varstvo človekovih pravic.", "visja"],
    [4, "Zakaj je bila osimska pogodba pomembna?", "dokončno je določila mejo med Jugoslavijo in Italijo", ["končala je prvo svetovno vojno", "ustanovila je Jugoslavijo", "priključila je Trst Jugoslaviji"], "Potrdila je razmejitev cone A in B.", "visja"],
  ]);
}
