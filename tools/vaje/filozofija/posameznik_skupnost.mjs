import { izbira } from "../lib.mjs";
const AV = [["V naravnem stanju je življenje »osamljeno, revno, grdo, živalsko in kratko«; potrebujemo absolutnega suverena.", "Hobbes"], ["Ljudje imajo naravne pravice do življenja, svobode in lastnine; vlada jih mora varovati.", "Locke"], ["Splošna volja izraža skupno dobro; človek je rojen svoboden, a povsod v okovih.", "Rousseau"], ["Človek je po naravi politično bitje (zoon politikon).", "Aristotel"], ["Pravična so načela, ki bi jih izbrali za tančico nevednosti.", "Rawls"], ["Država sme omejiti svobodo posameznika le, da prepreči škodo drugim.", "Mill"], ["Zgodovina vseh dosedanjih družb je zgodovina razrednih bojev.", "Marx"], ["Vladar mora biti pripravljen ravnati nemoralno, če to ohranja državo.", "Machiavelli"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("avtor", 16, (r, i) => {
    const [t, a] = AV[i % 8];
    if (i < 8) return izbira({ r, tezavnost: 2, besedilo: `Kateri filozof je zagovarjal: »${t}«`, pravilna: a, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([, x]) => x)).slice(0, 3), postopek: `<p>${a}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera misel o državi in družbi pripada filozofu ${a}?`, pravilna: t, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([x]) => x)).slice(0, 3), postopek: `<p>${a}: ${t}</p>` });
  });
  pojmi([
    ["družbena pogodba", "Dogovor, s katerim posamezniki ustanovijo državo in se podredijo oblasti."],
    ["naravno stanje", "Domnevno stanje ljudi pred nastankom države."],
    ["suverenost", "Najvišja oblast v državi."],
    ["splošna volja", "Po Rousseauju volja skupnosti, usmerjena k skupnemu dobremu."],
    ["naravne pravice", "Pravice, ki jih ima človek po naravi, neodvisno od države."],
    ["liberalizem", "Politična filozofija, ki poudarja svobodo in pravice posameznika."],
    ["komunitarizem", "Smer, ki poudarja pomen skupnosti in skupnih vrednot za posameznika."],
    ["načelo škode", "Millovo načelo, da je svoboda omejena le s škodo drugim."],
    ["tančica nevednosti", "Rawlsov miselni poskus: izbiramo načela, ne da bi poznali svoj položaj v družbi."],
    ["utopija", "Zamisel idealne družbe, ki je ni nikjer."],
    ["retributivna teorija kazni", "Teorija, da je kazen upravičena kot zasluženo povračilo za dejanje."],
    ["preventivna teorija kazni", "Teorija, da je kazen upravičena, ker odvrača od prihodnjih kaznivih dejanj."],
    ["državljanska nepokorščina", "Javno, nenasilno kršenje zakona v imenu pravičnosti."],
  ]);
  vprasanja([
    [4, "Katero načelo razlike izbere Rawls za tančico nevednosti?", "neenakosti so dopustne le, če koristijo najslabše stoječim", ["vsi morajo imeti enako premoženje", "neenakosti so vedno pravične", "trg sam določi pravičnost"], "Racionalni ljudje se zavarujejo za najslabši možni položaj.", "visja"],
    [4, "Zakaj je Thoreau zagovarjal državljansko nepokorščino?", "ker posameznik ne sme sodelovati pri krivicah države (suženjstvo, vojna)", ["ker je zavračal vse zakone", "ker je hotel postati vladar", "ker je bil proti davkom nasploh"], "Odklonil je plačilo davka in sprejel zapor.", "visja"],
  ]);
}
