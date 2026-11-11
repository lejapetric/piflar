import { izbira } from "../lib.mjs";
const KOMP = [["Glavni motiv je postavljen v središče, levo in desno sta zrcalno podobni skupini.", "simetrična kompozicija"], ["Figure so razporejene v obliki trikotnika, vrh je glava osrednje osebe.", "piramidalna kompozicija"], ["Glavne linije potekajo poševno čez sliko in ustvarjajo gibanje.", "diagonalna kompozicija"], ["Motivi so razporejeni v vodoravnih pasovih drug nad drugim.", "pasovna (frizna) kompozicija"], ["Prizor je odrezan na robu, kot bi bil naključen izsek.", "odprta kompozicija"], ["Vsi elementi so zaključeni znotraj okvirja in vodijo pogled k središču.", "zaprta kompozicija"]];
const KN = KOMP.map(([, k]) => k);
const PR = [["Vzporedne črte se stikajo v eni točki na obzorju.", "linearna (središčna) perspektiva"], ["Oddaljeni predmeti so bolj modrikasti in zabrisani.", "zračna (atmosferska) perspektiva"], ["Pomembnejše osebe so upodobljene večje od drugih.", "pomenska perspektiva"], ["Predmet je prikazan hkrati z več zornih kotov.", "kubistični prikaz prostora (simultanost)"], ["Ostri prehodi med svetlobo in temo dramatično poudarijo figure.", "chiaroscuro (tenebrizem)"], ["Mehki, zabrisani prehodi med barvami brez ostrih obrisov.", "sfumato"]];
const PN = PR.map(([, k]) => k);
export default function ({ serija, pojmi, vprasanja }) {
  serija("kompozicija", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Kakšna je kompozicija? ${KOMP[i][0]}`, pravilna: KOMP[i][1], napacne: r.premesaj(KN.filter((x) => x !== KOMP[i][1])).slice(0, 3), postopek: `<p>${KOMP[i][1]}.</p>` }));
  serija("prostor", 6, (r, i) => izbira({ r, tezavnost: 3, besedilo: `Kateri način prikaza prostora ali svetlobe je opisan? ${PR[i][0]}`, pravilna: PR[i][1], napacne: r.premesaj(PN.filter((x) => x !== PR[i][1])).slice(0, 3), postopek: `<p>${PR[i][1]}.</p>` }));
  pojmi([
    ["likovne prvine", "Osnovni gradniki likovnega dela: točka, linija, barva, svetlost, ploskev, prostor."],
    ["kompozicija", "Razporeditev likovnih prvin in motivov v celoto."],
    ["kolorit", "Celota barv in barvnih odnosov v sliki."],
    ["tople barve", "Barve, ki delujejo bližje in topleje: rdeča, oranžna, rumena."],
    ["hladne barve", "Barve, ki delujejo oddaljeno in hladno: modra, zelena, vijolična."],
    ["komplementarni barvi", "Barvi, ki ležita na barvnem krogu nasproti in se poudarjata."],
    ["modelacija", "Prikaz plastičnosti s svetlobo in senco."],
    ["ikonografija", "Veda o pomenu motivov, simbolov in atributov v umetnosti."],
    ["atribut", "Predmet, po katerem prepoznamo upodobljeno osebo."],
    ["relief", "Kiparsko delo, ki izstopa iz ploskve."],
    ["polna plastika", "Kip, ki ga lahko obhodimo z vseh strani."],
    ["tloris", "Prikaz stavbe v vodoravnem prerezu."],
  ]);
  vprasanja([
    [2, "V kakšnem vrstnem redu poteka analiza umetnine?", "opis, analiza, interpretacija, slogovna umestitev", ["interpretacija, opis, umestitev, analiza", "umestitev, interpretacija, opis", "analiza, opis, ocena cene"], "Najprej opišemo, kaj vidimo, nato razčlenimo in razložimo."],
    [4, "Po katerem atributu prepoznamo sv. Petra?", "po ključih", ["po kolesu", "po puščicah", "po levu"], "Kolo: sv. Katarina; puščice: sv. Boštjan; lev: sv. Marko ali Hieronim.", "visja"],
    [4, "Kaj pomeni slogovna umestitev umetnine?", "določitev obdobja, sloga in morebiti avtorja na podlagi značilnosti dela", ["opis barv", "določitev cene", "izmera dimenzij"], "Primerjamo s tipičnimi deli obdobja.", "visja"],
  ]);
}
