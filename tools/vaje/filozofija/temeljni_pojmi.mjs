import { izbira } from "../lib.mjs";
const SK = [["Vsi ljudje so smrtni. Sokrat je človek. Torej je Sokrat smrten.", "deduktivno sklepanje"], ["Vsi labodi, ki sem jih videl, so beli. Torej so vsi labodi beli.", "induktivno sklepanje"], ["Država je kot duša: ima tri dele, zato ima tudi duša tri dele.", "sklepanje po analogiji"], ["Tega ne moreš trditi, saj si še najstnik.", "argument ad hominem"], ["Ker nihče ni dokazal, da duhovi ne obstajajo, obstajajo.", "argument iz nevednosti"], ["Če dovolimo telefone v razredu, bodo kmalu dijaki ves pouk igrali igrice in nihče ne bo več maturiral.", "zmota spolzkega pobočja"], ["To je res, ker tako pravi znani igralec.", "napačno sklicevanje na avtoriteto"], ["Ali boš z nami ali proti nam; tretje možnosti ni.", "lažna dilema"]];
const SKN = [...new Set(SK.map(([, s]) => s))];
const DIS = [["ontologija (metafizika)", "nauk o biti in temeljih stvarnosti"], ["epistemologija", "teorija spoznanja"], ["etika", "filozofija morale in dobrega življenja"], ["logika", "nauk o pravilnem sklepanju"], ["estetika", "filozofija lepega in umetnosti"], ["politična filozofija", "filozofija države, oblasti in pravičnosti"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("sklepanje", 8, (r, i) => izbira({ r, tezavnost: i < 3 ? 2 : 4, ...(i < 3 ? {} : { raven: "visja" }), besedilo: `Kaj ponazarja primer: »${SK[i][0]}«`, pravilna: SK[i][1], napacne: r.premesaj(SKN.filter((x) => x !== SK[i][1])).slice(0, 3), postopek: `<p>${SK[i][1]}.</p>` }));
  serija("disciplina", 6, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Katera filozofska disciplina je ${DIS[i][1]}?`, pravilna: DIS[i][0], napacne: r.premesaj(DIS.filter((_, j) => j !== i).map(([d]) => d)).slice(0, 3), postopek: `<p>${DIS[i][0]}: ${DIS[i][1]}.</p>` }));
  pojmi([
    ["argument", "Niz trditev, v katerem premise podpirajo sklep."],
    ["premisa", "Trditev, iz katere v argumentu izpeljemo sklep."],
    ["sklep", "Trditev, ki jo argument utemeljuje."],
    ["veljaven argument", "Argument, pri katerem iz resničnih premis nujno sledi resničen sklep."],
    ["dedukcija", "Sklepanje od splošnega k posameznemu, pri katerem sklep nujno sledi."],
    ["indukcija", "Sklepanje od posameznih primerov k splošnemu, pri katerem je sklep le verjeten."],
    ["a priori", "Spoznanje, ki je neodvisno od izkustva."],
    ["a posteriori", "Spoznanje, ki temelji na izkustvu."],
    ["protiprimer", "Primer, ki ovrže splošno trditev."],
  ]);
  vprasanja([
    [1, "Koliko časa traja izpitna pola 1 (komentar besedila)?", "90 minut", ["60 minut", "120 minut", "45 minut"], "Pola 1: 90 minut, 35 % ocene."],
    [1, "Koliko časa traja izpitna pola 2 (esej)?", "120 minut", ["90 minut", "60 minut", "180 minut"], "Pola 2: 120 minut, 45 % ocene."],
    [2, "Kolikšen delež ocene prinese seminarska naloga?", "20 %", ["35 %", "45 %", "10 %"], "Pola 1: 35 %, pola 2: 45 %, seminarska naloga: 20 %."],
    [2, "Koliko besed morata imeti komentar in esej najmanj?", { vpis: ["600"] }, [], "Obe pisni nalogi morata imeti vsaj 600 besed."],
    [3, "Koliko točk je največ pri vsakem od treh delov (komentar, esej, seminarska naloga)?", { vpis: ["22"] }, [], "Vsak del se ocenjuje z 22 točkami."],
    [4, "Argument: »Če dežuje, so ulice mokre. Ulice so mokre. Torej dežuje.« Kaj je narobe?", "potrjevanje posledka: ulice so lahko mokre tudi iz drugega razloga", ["nič, argument je veljaven", "premisi sta neresnični", "gre za indukcijo"], "Iz »če p, potem q« in q ne sledi p.", "visja"],
  ]);
}
