import { izbira, kolicina } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("znacilnost", 8, (r) => {
    const [opis, odg] = r.izberi([["rastlina se obrne proti svetlobi", "odzivanje na dražljaje"], ["iz semena zraste drevo", "rast in razvoj"], ["celica pretvarja glukozo v ATP", "presnova"], ["mačka skoti mladiče", "razmnoževanje"], ["telesna temperatura sesalca ostaja okoli 37 °C", "homeostaza"], ["bakterije postanejo odporne proti antibiotiku", "prilagajanje (evolucija)"], ["vsa telesa so zgrajena iz celic", "celična zgradba"]]);
    const vse = ["odzivanje na dražljaje", "rast in razvoj", "presnova", "razmnoževanje", "homeostaza", "prilagajanje (evolucija)", "celična zgradba"];
    return izbira({ r, tezavnost: 1, besedilo: `Katero značilnost živih bitij ponazarja primer: ${opis}?`, pravilna: odg, napacne: r.premesaj(vse.filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${opis.charAt(0).toUpperCase() + opis.slice(1)} – ${odg}.</p>` });
  });
  serija("organizacija", 6, (r) => {
    const ravni = ["molekula", "organel", "celica", "tkivo", "organ", "organski sistem", "organizem", "populacija", "združba", "ekosistem", "biosfera"];
    const i = r.int(0, ravni.length - 2), gor = r.izberi([true, false]);
    if (!gor && i === 0) return null;
    const odg = gor ? ravni[i + 1] : ravni[i - 1];
    return izbira({ r, tezavnost: 2, besedilo: `Katera raven organizacije življenja je ${gor ? "neposredno nad" : "neposredno pod"} ravnijo »${ravni[i]}«?`, pravilna: odg, napacne: r.premesaj(ravni.filter((x) => x !== odg && x !== ravni[i])).slice(0, 3), postopek: `<p>Zaporedje: ${ravni.join(" → ")}.</p>` });
  });
  serija("starost", 6, (r) => {
    const [dog, v] = r.izberi([["nastanek Zemlje", 4.6], ["prvi znani fosili prokariontov", 3.5], ["pojav prvih evkariontov", 2.0], ["kambrijska eksplozija", 0.54], ["izumrtje dinozavrov", 0.066]]);
    return kolicina({ tezavnost: 3, vrednost: v * 1000, tol: 0.05, enota: "milijonov let", besedilo: `Pred približno koliko milijoni let se je zgodil dogodek: ${dog}?`, rezultat: `približno ${String(v * 1000).replace(".", ",")} milijonov let`, postopek: `<p>${dog.charAt(0).toUpperCase() + dog.slice(1)}: pred približno ${String(v).replace(".", ",")} milijarde let.</p>` });
  });
  pojmi([
    ["abiogeneza", "Nastanek življenja iz nežive snovi."],
    ["praokolje (praatmosfera)", "Zgodnja Zemljina atmosfera brez kisika, bogata z vodno paro, CO₂, N₂ in metanom.", { brezVpisa: true }],
    ["Millerjev poskus", "Poskus, v katerem so iz preprostih plinov z električnimi razelektritvami nastale aminokisline.", { brezVpisa: true }],
    ["koacervat", "Kapljica organskih molekul, obdana z vodnim ovojem, kot model praceličnih struktur."],
    ["svet RNA", "Domneva, da je bila prva samopodvojevalna molekula RNA, ki je hkrati nosila zapis in katalizirala reakcije."],
    ["endosimbioza", "Nastanek mitohondrijev in kloroplastov iz prokariontov, ki jih je zajela večja celica."],
    ["stromatolit", "Plastovita kamnina, ki so jo ustvarile cianobakterije."],
    ["homeostaza", "Vzdrževanje stalnih razmer v notranjem okolju organizma."],
    ["presnova", "Vse kemijske reakcije v organizmu."],
    ["prokariont", "Organizem brez celičnega jedra in membranskih organelov."],
    ["evkariont", "Organizem s celicami, ki imajo jedro in membranske organele."],
    ["fosil", "Ohranjeni ostanek ali sled organizma iz preteklosti."],
    ["avtotrof", "Organizem, ki iz anorganskih snovi sam izdeluje organske snovi."],
    ["heterotrof", "Organizem, ki organske snovi pridobi s hrano."],
  ]);
  vprasanja([
    [2, "Kateri plin je v praatmosferi skoraj manjkal?", "kisik", ["vodna para", "ogljikov dioksid", "dušik"], "Kisik se je v ozračju začel kopičiti šele s fotosintezo cianobakterij."],
    [3, "Kateri organizmi so prvi sproščali kisik v ozračje?", "cianobakterije", ["glive", "praživali", "praprotnice"], "Cianobakterije izvajajo fotosintezo s cepitvijo vode."],
    [4, "Kateri dokaz podpira endosimbiotsko teorijo?", "mitohondriji imajo lastno krožno DNA in ribosome tipa 70S", ["mitohondriji nimajo membrane", "kloroplasti so v vseh živalskih celicah", "jedro ima dvojno membrano"], "Lastna krožna DNA, 70S ribosomi in dvojna membrana kažejo na bakterijski izvor.", "visja"],
    [4, "Zakaj je RNA verjetnejša prva dedna molekula kot DNA?", "ker lahko hkrati nosi informacijo in deluje kot katalizator (ribozim)", ["ker je dvoverižna", "ker je stabilnejša od DNA", "ker ne vsebuje fosfata"], "Ribozimi kažejo, da RNA lahko katalizira reakcije.", "visja"],
    [4, "Zakaj je nastanek ozonske plasti omogočil življenje na kopnem?", "ozon zadrži večino UV-sevanja", ["ozon je hrana za rastline", "ozon segreva ozračje", "ozon veže CO₂"], "Brez ozonske plasti bi UV-sevanje poškodovalo DNA kopenskih organizmov.", "visja"],
    [3, "Kaj je dokazal Pasteurjev poskus z bučko z labodjim vratom?", "življenje ne nastaja spontano iz nežive snovi", ["mikrobi nastajajo iz zraka", "kisik je nujen za življenje", "virusi so živi"], "V prevreti juhi brez dostopa mikrobov se ni nič razvilo."],
  ]);
}
