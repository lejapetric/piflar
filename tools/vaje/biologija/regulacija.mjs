import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("hormon", 10, (r) => {
    const H = [["inzulin", "trebušna slinavka", "znižuje koncentracijo glukoze v krvi"], ["glukagon", "trebušna slinavka", "zvišuje koncentracijo glukoze v krvi"], ["adrenalin", "sredica nadledvične žleze", "pripravi telo na boj ali beg"], ["tiroksin", "ščitnica", "pospešuje presnovo"], ["rastni hormon", "hipofiza", "spodbuja rast"], ["ADH", "hipofiza (zadnji reženj)", "poveča vračanje vode v ledvicah"], ["testosteron", "moda", "razvoj moških spolnih znakov"], ["estrogen", "jajčniki", "razvoj ženskih spolnih znakov"], ["melatonin", "češarika", "uravnava dnevni ritem"], ["kortizol", "skorja nadledvične žleze", "odziv na dolgotrajni stres"]];
    const [h, z, f] = r.izberi(H), kaj = r.izberi(["zleza", "funkcija"]);
    if (kaj === "zleza") return izbira({ r, tezavnost: 1, besedilo: `Katera žleza izloča hormon ${h}?`, pravilna: z, napacne: r.premesaj([...new Set(H.map(([, x]) => x))].filter((x) => x !== z)).slice(0, 3), postopek: `<p>${h}: ${z}; ${f}.</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `Kaj je glavni učinek hormona ${h}?`, pravilna: f, napacne: r.premesaj(H.filter(([x]) => x !== h).map(([, , y]) => y)).slice(0, 3), postopek: `<p>${h}: ${f}.</p>` });
  });
  serija("zivcevje", 8, (r) => {
    const [d, odg] = r.izberi([["zenice se razširijo, srce bije hitreje", "simpatično živčevje"], ["pospeši se prebava, srčni utrip se upočasni", "parasimpatično živčevje"], ["usklajuje ravnotežje in gibe", "mali možgani"], ["uravnava dihanje in srčni utrip", "podaljšana hrbtenjača"], ["uravnava telesno temperaturo in žejo", "hipotalamus"], ["zavestno mišljenje in govor", "veliki možgani (skorja)"], ["izvede refleks umika roke", "hrbtenjača"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri del živčevja: ${d}?`, pravilna: odg, napacne: r.premesaj(["simpatično živčevje", "parasimpatično živčevje", "mali možgani", "podaljšana hrbtenjača", "hipotalamus", "veliki možgani (skorja)", "hrbtenjača"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("impulz", 7, (r, i) => {
    const v = r.izberi([1, 2, 10, 50, 100, 120]), d = r.int(5, 200) / 100;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (d / v) * 1000, tol: 0.01, enota: "ms", besedilo: `Živčni impulz potuje s hitrostjo ${v} m/s. Koliko ms potrebuje za razdaljo ${T(d, 2)} m?`, rezultat: `${T((d / v) * 1000, 1)} ms`, postopek: `<p>\\(t = \\frac{s}{v} = \\frac{${L(d, 2)}}{${v}}\\ \\text{s} \\approx ${L((d / v) * 1000, 1)}\\ \\text{ms}\\)</p>` });
    const t = r.int(5, 40);
    return kolicina({ tezavnost: 3, vrednost: d / (t / 1000), tol: 0.01, enota: "m/s", besedilo: `Impulz prepotuje ${T(d, 2)} m dolgo živčno vlakno v ${t} ms. Kolikšna je hitrost prevajanja?`, rezultat: `${T(d / (t / 1000), 1)} m/s`, postopek: `<p>\\(v = \\frac{${L(d, 2)}\\ \\text{m}}{${L(t / 1000, 3)}\\ \\text{s}} \\approx ${L(d / (t / 1000), 1)}\\ \\text{m/s}\\)</p>` });
  });
  serija("potencial", 5, (r) => {
    const [faza, odg] = r.izberi([["depolarizacija", "Na⁺ vdirajo v celico"], ["repolarizacija", "K⁺ izhajajo iz celice"], ["mirovni potencial", "Na⁺/K⁺-črpalka vzdržuje razliko koncentracij"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kaj je glavni vzrok za fazo »${faza}« na membrani nevrona?`, pravilna: odg, napacne: ["Na⁺ vdirajo v celico", "K⁺ izhajajo iz celice", "Na⁺/K⁺-črpalka vzdržuje razliko koncentracij", "Cl⁻ izhajajo iz celice"].filter((x) => x !== odg), postopek: `<p>${faza.charAt(0).toUpperCase() + faza.slice(1)}: ${odg}.</p>` });
  });
  serija("cutila", 5, (r) => {
    const [c, odg] = r.izberi([["čepki", "barvni vid"], ["paličice", "vid pri šibki svetlobi"], ["Cortijev organ", "sluh"], ["polkrožni kanali", "zaznavanje vrtenja (ravnotežje)"], ["okušalne brbončice", "okus"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj omogočajo ${c}?`, pravilna: odg, napacne: ["barvni vid", "vid pri šibki svetlobi", "sluh", "zaznavanje vrtenja (ravnotežje)", "okus"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${c.charAt(0).toUpperCase() + c.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["nevron", "Živčna celica, ki sprejema in prevaja impulze."],
    ["sinapsa", "Stik med nevronom in drugo celico, kjer se prenese signal."],
    ["nevrotransmiter", "Kemični prenašalec signala v sinapsi."],
    ["mielinska ovojnica", "Izolacijska ovojnica aksona, ki pospeši prevajanje impulza."],
    ["refleks", "Hiter, nezavedni odziv na dražljaj."],
    ["akcijski potencial", "Hitra sprememba napetosti na membrani nevrona."],
    ["hormon", "Signalna snov, ki jo izloča žleza z notranjim izločanjem v kri."],
    ["negativna povratna zanka", "Uravnavanje, pri katerem učinek zavira svoj vzrok."],
    ["hipofiza", "Žleza pod možgani, ki uravnava delovanje drugih žlez."],
    ["receptor", "Celica ali molekula, ki zazna dražljaj ali signal."],
    ["homeostaza", "Vzdrževanje stalnega notranjega okolja."],
    ["sladkorna bolezen", "Bolezen, pri kateri je zaradi pomanjkanja ali neučinkovitosti inzulina glukoza v krvi previsoka."],
    ["refleksni lok", "Pot impulza od receptorja do efektorja pri refleksu."],
  ]);
  vprasanja([
    [3, "Zakaj je prevajanje po mieliniziranih vlaknih hitrejše?", "ker impulz preskakuje med Ranvierjevimi zažemki", ["ker so vlakna krajša", "ker ni sinaps", "ker vlakna nimajo membrane"], "Saltatorno prevajanje."],
    [4, "Kako tiroksin zavira lastno izločanje?", "z negativno povratno zanko na hipotalamus in hipofizo (TRH, TSH)", ["s pozitivno povratno zanko", "z uničenjem ščitnice", "z vezavo na inzulin"], "Visok tiroksin zmanjša izločanje TRH in TSH.", "visja"],
    [4, "Kaj se zgodi v sinapsi, če zavremo encim acetilholinesterazo?", "acetilholin ostane v reži in podaljša vzdraženost", ["prenos signala se popolnoma ustavi takoj", "nevron izgubi mielin", "nastaja več Na⁺"], "Tako delujejo nekateri insekticidi in živčni strupi.", "visja"],
    [4, "Zakaj pri sladkorni bolezni tipa 1 zdravimo z inzulinom, pri tipu 2 pa sprva pogosto ne?", "pri tipu 1 inzulina ni, pri tipu 2 so celice nanj manj odzivne", ["tip 2 je virusna bolezen", "pri tipu 1 je inzulina preveč", "tip 2 nastane zaradi pomanjkanja glukagona"], "Tip 1 je avtoimunsko uničenje celic beta.", "visja"],
    [2, "Kateri hormon zviša krvni sladkor med obroki?", "glukagon", ["inzulin", "melatonin", "ADH"], "Glukagon spodbudi razgradnjo glikogena v jetrih."],
  ]);
}
