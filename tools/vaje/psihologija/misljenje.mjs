import { izbira } from "../lib.mjs";
const PIA = [["Otrok spoznava svet z gibanjem in čutili; pridobi stalnost predmeta.", "senzomotorična stopnja (0–2 leti)"], ["Otrok uporablja simbole in jezik, a je egocentričen in ne razume ohranitve količine.", "predoperativna stopnja (2–7 let)"], ["Otrok razume ohranitev količine in logično razmišlja o konkretnih predmetih.", "stopnja konkretnih operacij (7–11 let)"], ["Mladostnik razmišlja abstraktno in preverja hipoteze.", "stopnja formalnih operacij (od 11 let)"], ["Otrok misli, da ima kozarec z višjo gladino več vode, čeprav sta prostornini enaki.", "predoperativna stopnja (2–7 let)"], ["Otrok išče igračo, ki jo pokrijemo z odejo, ker ve, da še obstaja.", "senzomotorična stopnja (0–2 leti)"], ["Najstnik razpravlja o pravičnosti in o tem, kaj bi bilo, če ljudje ne bi potrebovali spanja.", "stopnja formalnih operacij (od 11 let)"], ["Otrok zna razvrstiti palčke po dolžini in razume, da je 3 + 4 enako 4 + 3.", "stopnja konkretnih operacij (7–11 let)"]];
const ST = [...new Set(PIA.map(([, s]) => s))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("piaget", 8, (r, i) => izbira({ r, tezavnost: i < 4 ? 2 : 3, besedilo: `Katero Piagetovo stopnjo opisuje primer: ${PIA[i][0]}`, pravilna: PIA[i][1], napacne: ST.filter((x) => x !== PIA[i][1]), postopek: `<p>${PIA[i][1]}.</p>` }));
  pojmi([
    ["mišljenje", "Duševni proces, s katerim predelujemo informacije, sklepamo in rešujemo probleme."],
    ["pojem", "Miselna predstava, ki združuje skupne lastnosti skupine predmetov ali pojavov."],
    ["konvergentno mišljenje", "Mišljenje, ki vodi k eni sami pravilni rešitvi."],
    ["divergentno mišljenje", "Mišljenje, ki išče več različnih, izvirnih rešitev."],
    ["algoritem", "Strategija reševanja problema po korakih, ki zagotovo vodi do rešitve."],
    ["hevristika", "Miselna bližnjica, ki hitro vodi do rešitve, a ne vedno pravilne."],
    ["vpogled", "Nenadno razumevanje rešitve problema (aha doživetje)."],
    ["poskusi in napake", "Reševanje problema s preizkušanjem različnih možnosti."],
    ["funkcionalna fiksacija", "Ovira pri reševanju: predmet vidimo le v njegovi običajni uporabi."],
    ["miselna naravnanost", "Ovira: vztrajanje pri načinu reševanja, ki je deloval prej."],
    ["ustvarjalnost", "Sposobnost ustvarjanja novih, izvirnih in uporabnih zamisli."],
    ["stalnost predmeta", "Spoznanje, da predmet obstaja, tudi ko ga ne vidimo."],
    ["egocentrizem", "Nezmožnost otroka, da bi stvari videl z vidika drugega."],
    ["ohranitev količine", "Razumevanje, da se količina ne spremeni, če spremenimo obliko."],
  ]);
  vprasanja([
    [2, "Katere so faze ustvarjalnega procesa po Wallasu?", "priprava, inkubacija, razsvetlitev, preverjanje", ["opazovanje, merjenje, sklep, poročilo", "zaznava, ocena, odziv, učenje", "ideja, načrt, izdelek, prodaja"], "Med inkubacijo problem »zori« v ozadju."],
    [4, "Köhlerjev šimpanz Sultan je po premoru zložil dve palici in dosegel banano. Kaj ta poskus kaže?", "učenje z vpogledom", ["učenje s poskusi in napakami", "klasično pogojevanje", "modelno učenje"], "Rešitev se je pojavila nenadoma, kot celota.", "visja"],
    [4, "Katera hevristika vodi do sklepa, da je letenje nevarnejše od vožnje z avtom, ker se spomnimo letalskih nesreč?", "hevristika razpoložljivosti", ["hevristika reprezentativnosti", "algoritem", "funkcionalna fiksacija"], "Pogostost ocenjujemo po tem, kako hitro se spomnimo primerov.", "visja"],
    [4, "Kaj je potrditvena pristranost?", "iskanje in upoštevanje predvsem informacij, ki potrjujejo naše prepričanje", ["zavračanje vseh informacij", "pozabljanje neprijetnih spominov", "zaupanje avtoriteti"], "Zato hipoteze preverjamo tudi z iskanjem nasprotnih dokazov.", "visja"],
  ]);
}
