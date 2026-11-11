import { izbira } from "../lib.mjs";
const MET = [["Raziskovalec pol leta živi s skupino brezdomcev in beleži njihovo vsakdanje življenje.", "udeleženo opazovanje"], ["Raziskovalka pošlje vprašalnik 1000 naključno izbranim polnoletnim prebivalcem.", "anketa"], ["Sociolog analizira, kako časopisi v zadnjih 20 letih prikazujejo migrante.", "analiza vsebine dokumentov"], ["Raziskovalec uporabi podatke Statističnega urada o porokah in razvezah.", "analiza sekundarnih virov"], ["Raziskovalka z vsakim od 15 učiteljev opravi poglobljen pogovor.", "intervju"], ["Raziskovalec v razredu spremeni sedežni red in primerja vedenje učencev pred in po spremembi.", "eksperiment"]];
const MN = [...new Set(MET.map(([, m]) => m))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("metoda", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Katero raziskovalno metodo opisuje primer: ${MET[i][0]}`, pravilna: MET[i][1], napacne: r.premesaj(MN.filter((x) => x !== MET[i][1])).slice(0, 3), postopek: `<p>${MET[i][1]}.</p>` }));
  pojmi([
    ["kvantitativno raziskovanje", "Raziskovanje, ki zbira številčne podatke in jih statistično obdeluje."],
    ["kvalitativno raziskovanje", "Raziskovanje, ki poglobljeno proučuje pomene, izkušnje in doživljanje."],
    ["hipoteza", "Preverljiva trditev o odnosu med spremenljivkami."],
    ["spremenljivka", "Lastnost, ki ima pri različnih enotah različne vrednosti."],
    ["udeleženo opazovanje", "Metoda, pri kateri raziskovalec sodeluje v življenju skupine, ki jo proučuje."],
    ["anketa", "Metoda zbiranja podatkov z enakimi vprašanji pri velikem številu ljudi."],
    ["primarni viri", "Podatki, ki jih raziskovalec zbere sam."],
    ["sekundarni viri", "Podatki, ki so jih zbrali drugi, npr. uradna statistika."],
    ["veljavnost", "Značilnost raziskave, da meri tisto, kar naj bi merila."],
    ["zanesljivost", "Značilnost raziskave, da pri ponovitvi daje enake rezultate."],
    ["vrednotna nevtralnost", "Weberjeva zahteva, da raziskovalec v raziskavo ne vnaša osebnih vrednot."],
    ["informirano soglasje", "Privolitev udeleženca v raziskavo po tem, ko je seznanjen z njenim namenom."],
    ["naključni vzorec", "Vzorec, v katerem ima vsaka enota populacije enako možnost izbora."],
    ["kvotni vzorec", "Vzorec, sestavljen tako, da deleži skupin ustrezajo deležem v populaciji."],
  ]);
  vprasanja([
    [3, "Kakšen je pravilen vrstni red delov seminarske naloge?", "uvod in hipoteze, teoretični del, metodologija, rezultati, sklep, viri", ["sklep, uvod, rezultati, viri, hipoteze", "viri, rezultati, uvod, sklep", "rezultati, hipoteze, uvod, viri, sklep"], "Najprej problem in hipoteze, nato teorija in empirični del."],
    [4, "Kaj je Hawthornski učinek?", "udeleženci spremenijo vedenje, ker vedo, da jih opazujejo", ["raziskovalec vpliva na rezultate s pričakovanji", "vzorec ni reprezentativen", "vprašanja so sugestivna"], "Ugotovljen v tovarni Hawthorne v 1920-ih.", "visja"],
    [4, "Zakaj so uradne statistike kriminala problematične kot vir?", "zajemajo le prijavljena in odkrita kazniva dejanja (temno polje)", ["ker so vedno izmišljene", "ker so prestare", "ker jih ni mogoče dobiti"], "Na statistiko vplivajo tudi odločitve policije in prijaviteljev.", "visja"],
    [4, "Kaj je triangulacija v raziskovanju?", "uporaba več metod ali virov za preverjanje istega vprašanja", ["izbira treh udeležencev", "trikratna ponovitev ankete", "izračun treh srednjih vrednosti"], "Kombinacija metod poveča veljavnost.", "visja"],
  ]);
}
