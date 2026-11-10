import { izbira } from "../lib.mjs";
const DAL = [["podobe (sence, odsevi)", "domneva (eikasia)"], ["čutne stvari", "vera (pistis)"], ["matematični predmeti", "razumsko mišljenje (dianoia)"], ["ideje", "umsko spoznanje (noesis)"]];
const DUSA = [["razumni del duše", "vladarji (filozofi)", "modrost"], ["srčni (pogumni) del duše", "varuhi (vojaki)", "pogum"], ["poželjivi del duše", "pridobitniki (obrtniki, kmetje)", "zmernost"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("daljica", 8, (r, i) => {
    const [p, s] = DAL[i % 4];
    if (i < 4) return izbira({ r, tezavnost: 3, besedilo: `Kateri spoznavni način v prispodobi o daljici ustreza predmetom: ${p}?`, pravilna: s, napacne: DAL.filter(([x]) => x !== p).map(([, y]) => y), postopek: `<p>${p} → ${s}.</p>` });
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kateri predmeti v prispodobi o daljici ustrezajo spoznavnemu načinu ${s}?`, pravilna: p, napacne: DAL.filter(([x]) => x !== p).map(([x]) => x), postopek: `<p>${s} → ${p}. Prva dva dela sta mnenje (doxa), druga dva vednost (episteme).</p>` });
  });
  serija("dusa", 6, (r, i) => {
    const [d, s, v] = DUSA[i % 3];
    if (i < 3) return izbira({ r, tezavnost: 2, besedilo: `Kateri stan v idealni državi ustreza delu duše: ${d}?`, pravilna: s, napacne: DUSA.filter(([x]) => x !== d).map(([, y]) => y), postopek: `<p>${d} ↔ ${s}; vrlina: ${v}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera vrlina pripada delu duše: ${d}?`, pravilna: v, napacne: [...DUSA.filter(([x]) => x !== d).map(([, , y]) => y), "pravičnost"], postopek: `<p>${d}: ${v}. Pravičnost je, ko vsak del opravlja svojo nalogo.</p>` });
  });
  pojmi([
    ["ideja", "Večna, nespremenljiva, umsko spoznavna podstat stvari, npr. ideja lepega."],
    ["ideja Dobrega", "Najvišja ideja, ki daje drugim idejam bit in spoznavnost, kot sonce daje svetlobo."],
    ["svet idej", "Umsko spoznavni svet resnične, večne biti."],
    ["čutni svet", "Svet spremenljivih stvari, ki so le odsevi idej."],
    ["mnenje", "Spoznanje čutnega sveta, ki ni trdno utemeljeno (doxa)."],
    ["vednost", "Utemeljeno spoznanje idej (episteme)."],
    ["filozof vladar", "Vladar, ki pozna ideje in ideje Dobrega ter zato zna pravično voditi državo."],
    ["prispodoba o votlini", "Prispodoba o ujetnikih, ki gledajo sence in ob osvoboditvi spoznajo resnico."],
    ["prispodoba o soncu", "Prispodoba, ki ideji Dobrega pripiše vlogo sonca v čutnem svetu."],
    ["prispodoba o ladji", "Prispodoba, ki kaže, da državo vodijo nevedni, pravi krmar (filozof) pa je zasmehovan."],
    ["pravičnost", "Stanje, ko vsak del duše in vsak stan v državi opravlja svojo nalogo."],
    ["varuhi", "Stan vojakov, ki državo branijo in so deležni posebne vzgoje."],
  ]);
  vprasanja([
    [3, "Kaj v prispodobi o votlini predstavljajo sence na steni?", "čutne podobe, ki jih ljudje imajo za resničnost", ["ideje", "ideja Dobrega", "filozofe"], "Ujetniki poznajo le sence in jih imajo za edino stvarnost."],
    [4, "Zakaj se osvobojeni ujetnik vrne v votlino, čeprav ga tam zasmehujejo?", "ker ima filozof dolžnost voditi druge k spoznanju in vladati državi", ["ker mu je zunaj dolgčas", "ker ne prenese sonca", "ker pozabi, kaj je videl"], "Filozof mora služiti skupnosti, ne le lastni sreči.", "visja"],
    [4, "Zakaj Platon v Državi kritizira demokracijo?", "ker oblast dobijo nevedni, ki jih vodijo mnenja in želje množice", ["ker je predraga", "ker so v njej filozofi na oblasti", "ker ne pozna zakonov"], "Primer: prispodoba o ladji.", "visja"],
    [4, "Kakšno ureditev predvideva Platon za varuhe?", "skupno lastnino in skupne žene ter otroke, da bi jih vodilo le skupno dobro", ["zasebno bogastvo", "dedne položaje", "volitve vodje"], "Odprava zasebnega preprečuje sebične interese.", "visja"],
  ]);
}
