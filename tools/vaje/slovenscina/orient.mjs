import { izbira } from "../lib.mjs";
import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Šakuntala", "Kalidasa", "drama"], ["Rubaije", "Omar Hajam", "lirska pesem"], ["Šahname", "Ferdousi", "ep"], ["Ramajana", "Valmiki", "ep"], ["Mahabharata", "Vjasa", "ep"], ["Misli v tihi noči", "Li Bai", "lirska pesem"]],
  });
  serija("kultura", 14, (r) => {
    const [d, k] = r.izberi([["Ep o Gilgamešu", "mezopotamska"], ["Visoka pesem", "hebrejska (Biblija)"], ["Mahabharata", "indijska"], ["Ramajana", "indijska"], ["Šakuntala", "indijska"], ["Tisoč in ena noč", "arabsko-perzijska"], ["Rubaije", "perzijska"], ["Šahname", "perzijska"], ["Knjiga mrtvih", "egipčanska"], ["Knjiga pesmi (Šidžing)", "kitajska"], ["Koran", "arabska"], ["Psalmi", "hebrejska (Biblija)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Iz katere kulture izhaja delo <em>${d}</em>?`, pravilna: k, napacne: r.premesaj(["mezopotamska", "hebrejska (Biblija)", "indijska", "arabsko-perzijska", "perzijska", "egipčanska", "kitajska", "arabska"].filter((x) => x !== k)).slice(0, 3), postopek: `<p><em>${d}</em>: ${k} književnost.</p>` });
  });
  serija("svetopisemske", 8, (r) => {
    const [z, odg] = r.izberi([["Kain in Abel", "Stara zaveza"], ["izgubljeni sin", "Nova zaveza"], ["Mojzes in deset zapovedi", "Stara zaveza"], ["David in Goljat", "Stara zaveza"], ["usmiljeni Samarijan", "Nova zaveza"], ["Noetova barka", "Stara zaveza"], ["Jezusov govor na gori", "Nova zaveza"], ["Jona v ribjem trebuhu", "Stara zaveza"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katerem delu Svetega pisma je zgodba ali prilika »${z}«?`, pravilna: odg, napacne: [odg === "Stara zaveza" ? "Nova zaveza" : "Stara zaveza"], postopek: `<p>${z.charAt(0).toUpperCase() + z.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["klinopis", "Mezopotamska pisava, v kateri je zapisan Ep o Gilgamešu."],
    ["Stara zaveza", "Del Svetega pisma pred Kristusovim rojstvom."],
    ["Nova zaveza", "Del Svetega pisma o Jezusu in apostolih."],
    ["prilika", "Kratka zgodba s prenesenim moralnim ali verskim naukom."],
    ["psalm", "Svetopisemska pesem, molitev ali hvalnica."],
    ["rubaija", "Perzijska štirivrstična pesem z rimo aaba."],
    ["okvirna pripoved", "Zgodba, v katero so vložene druge zgodbe."],
    ["Vede", "Najstarejša indijska sveta besedila."],
    ["Gilgameš", "Kralj Uruka, ki išče nesmrtnost."],
    ["Šeherezada", "Pripovedovalka zgodb v zbirki Tisoč in ena noč."],
    ["apokalipsa", "Razodetje o koncu sveta."],
  ]);
  vprasanja([
    [2, "Kaj išče Gilgameš po Enkidujevi smrti?", "nesmrtnost", ["zlato", "izgubljeno kraljestvo", "ženo"], "Spozna, da je človek umrljiv."],
    [3, "Zakaj Šeherezada vsak večer pripoveduje zgodbe?", "da bi odložila svojo usmrtitev", ["da bi zabavala otroke", "da bi postala pesnica", "ker je izgubila stavo"], "Kralj Šahrijar jo zaradi napetih zgodb pusti živeti."],
    [4, "Katera tema povezuje zgodbo o vesoljnem potopu v Epu o Gilgamešu in v Svetem pismu?", "bogovi ali Bog kaznujejo človeštvo s potopom, en pravični preživi", ["ustanovitev mest", "vojna med brati", "iskanje zaklada"], "Utnapištim in Noe.", "visja"],
  ]);
}
