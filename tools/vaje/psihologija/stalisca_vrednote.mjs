import { izbira } from "../lib.mjs";
const KOH = [["Ne kradem, ker bi me kaznovali.", "predkonvencionalna raven"], ["Pomagam ti, če boš ti pomagal meni.", "predkonvencionalna raven"], ["Ne goljufam, ker hočem, da me imajo drugi za dobrega človeka.", "konvencionalna raven"], ["Zakone je treba spoštovati, ker brez njih družba ne bi delovala.", "konvencionalna raven"], ["Zakon je treba spremeniti, če krši temeljne človekove pravice.", "postkonvencionalna raven"], ["Ravnam po načelih pravičnosti, tudi če nasprotujejo večini.", "postkonvencionalna raven"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("kohlberg", 6, (r, i) => izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Na kateri Kohlbergovi ravni moralnega presojanja je utemeljitev: »${KOH[i][0]}«`, pravilna: KOH[i][1], napacne: ["predkonvencionalna raven", "konvencionalna raven", "postkonvencionalna raven"].filter((x) => x !== KOH[i][1]), postopek: `<p>Predkonvencionalna: kazen in korist; konvencionalna: odobravanje drugih in red; postkonvencionalna: družbena pogodba in univerzalna načela.</p>` }));
  pojmi([
    ["stališče", "Razmeroma trajna naravnanost do predmeta, osebe ali pojava."],
    ["spoznavna komponenta", "Del stališča, ki zajema prepričanja in znanje o predmetu."],
    ["čustvena komponenta", "Del stališča, ki zajema čustva do predmeta."],
    ["vedenjska komponenta", "Del stališča, ki zajema težnjo k vedenju do predmeta."],
    ["stereotip", "Posplošena, poenostavljena predstava o članih skupine."],
    ["predsodek", "Neutemeljeno, običajno negativno stališče do članov skupine."],
    ["diskriminacija", "Neenako, krivično ravnanje z ljudmi zaradi pripadnosti skupini."],
    ["kognitivna disonanca", "Neprijetna napetost, ko so naša stališča in vedenje neskladna."],
    ["vrednota", "Trajno prepričanje o tem, kaj je pomembno in zaželeno v življenju."],
    ["moralni razvoj", "Razvoj presojanja o tem, kaj je prav in kaj narobe."],
    ["prepričevanje", "Namerno spreminjanje stališč drugih s sporočili."],
    ["grešni kozel", "Skupina, na katero ljudje preusmerijo krivdo za svoje težave."],
  ]);
  vprasanja([
    [3, "Kaj je pokazal Sherifov poskus v poletnem taboru (Robbers Cave)?", "tekmovanje poveča sovražnost med skupinama, skupni cilji pa jo zmanjšajo", ["skupini sta takoj postali prijateljski", "predsodki so prirojeni", "stik vedno odpravi predsodke"], "Nadrejeni cilji so zmanjšali napetosti."],
    [4, "Kadilec ve, da kajenje škodi, in si reče »Saj imam le eno življenje«. Kaj zmanjšuje?", "kognitivno disonanco", ["konformnost", "predsodek", "frustracijo"], "Neskladje med vedenjem in vedenjem o posledicah zmanjša s spremembo prepričanja.", "visja"],
    [4, "Kateri pristop najučinkoviteje zmanjšuje predsodke po hipotezi stika?", "enakovreden stik in sodelovanje pri skupnem cilju ob podpori okolja", ["vsakršen stik ne glede na okoliščine", "ločevanje skupin", "kaznovanje predsodkov"], "Allport je naštel pogoje za uspešen stik.", "visja"],
  ]);
}
