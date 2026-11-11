import { izbira } from "../lib.mjs";
const KL = [["mehanska in organska solidarnost, anomija, študija samomora", "Émile Durkheim"], ["razredni boj, lastništvo produkcijskih sredstev, odtujitev", "Karl Marx"], ["protestantska etika in duh kapitalizma, birokracija, idealni tipi", "Max Weber"], ["pozitivizem, izraz »sociologija«", "Auguste Comte"], ["sociološka imaginacija", "C. Wright Mills"], ["dramaturški pristop, vsakdanje življenje kot predstava", "Erving Goffman"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("klasiki", 12, (r, i) => {
    const [poj, av] = KL[i % 6];
    if (i < 6) return izbira({ r, tezavnost: 2, besedilo: `S katerim sociologom povezujemo: ${poj}?`, pravilna: av, napacne: r.premesaj(KL.filter(([, a]) => a !== av).map(([, a]) => a)).slice(0, 3), postopek: `<p>${av}: ${poj}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kateri pojmi so značilni za sociologa ${av}?`, pravilna: poj, napacne: r.premesaj(KL.filter(([, a]) => a !== av).map(([p]) => p)).slice(0, 3), postopek: `<p>${av}: ${poj}.</p>` });
  });
  pojmi([
    ["sociologija", "Znanost, ki proučuje družbo, družbene odnose, skupine in ustanove."],
    ["sociološka imaginacija", "Sposobnost povezovanja osebnih izkušenj s širšimi družbenimi procesi."],
    ["funkcionalizem", "Perspektiva, ki družbo vidi kot sistem medsebojno odvisnih delov, ki prispevajo k stabilnosti."],
    ["konfliktna perspektiva", "Perspektiva, ki poudarja neenakost, moč in nasprotja interesov med skupinami."],
    ["interakcionizem", "Perspektiva, ki proučuje pomene, ki jih ljudje ustvarjajo v vsakdanjih interakcijah."],
    ["družbena struktura", "Razmeroma trajni vzorci odnosov in ustanov v družbi."],
    ["družbeno delovanje", "Ravnanje posameznikov, ki mu pripisujejo pomen in je usmerjeno k drugim."],
    ["predmoderna družba", "Tradicionalna, pretežno kmečka družba z močno vlogo religije in običajev."],
    ["moderna družba", "Industrijska, urbana družba z racionalizacijo, delitvijo dela in demokracijo."],
    ["industrijska revolucija", "Prehod na strojno proizvodnjo v 18. in 19. stoletju, ki je spodbudil nastanek sociologije."],
    ["anomija", "Stanje brezpravilnosti, ko norme oslabijo in ne usmerjajo več vedenja."],
    ["racionalizacija", "Po Webru širjenje učinkovitosti, preračunljivosti in pravil v vse dele življenja."],
    ["mehanska solidarnost", "Povezanost v tradicionalnih družbah na podlagi podobnosti ljudi."],
    ["organska solidarnost", "Povezanost v modernih družbah na podlagi delitve dela in soodvisnosti."],
  ]);
  vprasanja([
    [3, "Kako bi funkcionalist razložil vlogo šole?", "šola socializira in razvršča ljudi na položaje, ki jih družba potrebuje", ["šola ohranja privilegije vladajočega razreda", "šola je prostor pogajanja o pomenih", "šola nima družbene vloge"], "Funkcionalizem išče prispevek ustanove k stabilnosti."],
    [4, "Kako bi isto vlogo šole razložila konfliktna perspektiva?", "šola reproducira družbene neenakosti v korist vladajočih skupin", ["šola zagotavlja enake možnosti vsem", "šola je nevtralna", "šola razvija le osebnost"], "Konfliktni teoretiki poudarjajo moč in neenakost.", "visja"],
    [4, "Mills razlikuje med osebnimi težavami in javnimi vprašanji. Kaj je brezposelnost 20 % ljudi v mestu?", "javno vprašanje, ki ga povzročajo družbeni procesi", ["osebna težava vsakega posameznika", "naravni pojav", "posledica lenobe"], "Ko je prizadetih veliko ljudi, vzrok iščemo v strukturi družbe.", "visja"],
    [4, "Zakaj je sociologija nastala ravno v 19. stoletju?", "zaradi hitrih sprememb ob industrializaciji, urbanizaciji in političnih revolucijah", ["ker je bila prej prepovedana", "zaradi izuma tiska", "zaradi odkritja Amerike"], "Novi družbeni problemi so zahtevali znanstveno razlago.", "visja"],
  ]);
}
