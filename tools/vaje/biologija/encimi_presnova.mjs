import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("encim-substrat", 8, (r) => {
    const E = [["amilaza", "škrob"], ["pepsin", "beljakovine"], ["lipaza", "maščobe"], ["laktaza", "laktoza"], ["saharaza", "saharoza"], ["katalaza", "vodikov peroksid"], ["DNA-polimeraza", "nukleotidi (sinteza DNA)"], ["tripsin", "beljakovine (v tankem črevesu)"]];
    const [e, s] = r.izberi(E);
    return izbira({ r, tezavnost: 1, besedilo: `Na kateri substrat deluje encim ${e}?`, pravilna: s, napacne: r.premesaj(E.filter(([x, y]) => x !== e && !y.startsWith(s.split(" ")[0])).map(([, y]) => y)).slice(0, 3), postopek: `<p>${e.charAt(0).toUpperCase() + e.slice(1)} deluje na: ${s}.</p>` });
  });
  serija("dejavnik", 8, (r) => {
    const [d, odg, raz] = r.izberi([
      ["temperaturo povišamo z 20 °C na 30 °C (pod optimumom)", "hitrost se poveča", "Delci se hitreje gibljejo, več je trkov encim–substrat."],
      ["temperaturo povišamo na 70 °C (človeški encim)", "encim se denaturira, hitrost pade", "Visoka temperatura poruši terciarno strukturo in aktivno mesto."],
      ["pepsin prenesemo iz pH 2 v pH 8", "hitrost pade", "Pepsinov optimum je v kislem."],
      ["povečamo koncentracijo substrata, ko so vsa aktivna mesta zasedena", "hitrost se ne spremeni", "Encim je nasičen; omejitveni dejavnik je količina encima."],
      ["dodamo kompetitivni inhibitor", "hitrost pade, a jo lahko povečamo z več substrata", "Inhibitor tekmuje s substratom za aktivno mesto."],
      ["podvojimo količino encima ob presežku substrata", "hitrost se poveča", "Več je aktivnih mest."],
      ["encim ohladimo na 4 °C", "hitrost pade, encim pa ni trajno poškodovan", "Nizka temperatura upočasni gibanje, ne poruši zgradbe."],
    ]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj se zgodi s hitrostjo encimske reakcije, če ${d}?`, pravilna: odg, napacne: r.premesaj(["hitrost se poveča", "encim se denaturira, hitrost pade", "hitrost pade", "hitrost se ne spremeni", "hitrost pade, a jo lahko povečamo z več substrata", "hitrost pade, encim pa ni trajno poškodovan"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  serija("hitrost", 7, (r, i) => {
    const m = r.int(2, 40), t = r.int(1, 10);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: m / t, tol: 0.01, enota: "mg/min", besedilo: `Encim v ${t} minutah razgradi ${m} mg substrata. Kolikšna je povprečna hitrost reakcije?`, rezultat: `${T(m / t, 2)} mg/min`, postopek: `<p>\\(v = \\frac{${m}\\ \\text{mg}}{${t}\\ \\text{min}} \\approx ${L(m / t, 2)}\\ \\text{mg/min}\\)</p>` });
    const Q = r.izberi([2, 3]), dT = r.izberi([10, 20, 30]), k = Q ** (dT / 10);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: k, tol: 0.01, enota: "", besedilo: `Temperaturni koeficient reakcije je Q<sub>10</sub> = ${Q}. Kolikokrat se poveča hitrost, če temperaturo (pod optimumom) povišamo za ${dT} °C?`, rezultat: `${k}-krat`, postopek: `<p>\\(Q_{10}^{\\Delta T/10} = ${Q}^{${dT / 10}} = ${k}\\)</p>` });
  });
  serija("km", 5, (r) => {
    const Vmax = r.int(10, 100), Km = r.int(1, 20), S = r.int(1, 40), v = (Vmax * S) / (Km + S);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: v, tol: 0.01, enota: "µmol/min", besedilo: `Encim ima \\(V_{max} = ${Vmax}\\) µmol/min in \\(K_M = ${Km}\\) mmol/L. Kolikšna je hitrost pri koncentraciji substrata ${S} mmol/L? (Michaelis-Menten)`, rezultat: `${T(v, 1)} µmol/min`, postopek: `<p>\\(v = \\frac{V_{max} [S]}{K_M + [S]} = \\frac{${Vmax} \\cdot ${S}}{${Km} + ${S}} \\approx ${L(v, 1)}\\)</p>` });
  });
  serija("anabolizem", 6, (r) => {
    const [p, odg] = r.izberi([["fotosinteza", "anabolni"], ["celično dihanje", "katabolni"], ["sinteza beljakovin", "anabolni"], ["prebava škroba", "katabolni"], ["podvojevanje DNA", "anabolni"], ["glikoliza", "katabolni"], ["sinteza glikogena v jetrih", "anabolni"], ["razgradnja maščob v mitohondriju", "katabolni"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Ali je proces »${p}« anabolni ali katabolni?`, pravilna: odg, napacne: [odg === "anabolni" ? "katabolni" : "anabolni"], postopek: `<p>Anabolni procesi gradijo večje molekule (porabijo energijo), katabolni jih razgrajujejo (sproščajo energijo). ${p.charAt(0).toUpperCase() + p.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["encim", "Biološki katalizator, večinoma beljakovina, ki pospeši reakcijo."],
    ["aktivno mesto", "Del encima, na katerega se veže substrat."],
    ["substrat", "Snov, na katero deluje encim."],
    ["aktivacijska energija", "Energija, potrebna, da reakcija steče; encim jo zniža."],
    ["denaturacija", "Nepovratna sprememba prostorske zgradbe beljakovine."],
    ["koencim", "Neproteinska organska molekula, ki jo encim potrebuje za delovanje."],
    ["kompetitivni inhibitor", "Snov, ki se veže na aktivno mesto in tekmuje s substratom."],
    ["alosterična regulacija", "Uravnavanje encima z vezavo snovi na mesto zunaj aktivnega mesta."],
    ["povratna inhibicija", "Končni produkt presnovne poti zavira encim na začetku poti."],
    ["ATP", "Molekula, ki v celici prenaša in shranjuje energijo."],
    ["anabolizem", "Presnovni procesi, pri katerih iz manjših nastajajo večje molekule."],
    ["katabolizem", "Presnovni procesi razgradnje večjih molekul v manjše."],
    ["model ključ-ključavnica", "Model, po katerem se substrat natančno prilega aktivnemu mestu.", { brezVpisa: true }],
  ]);
  vprasanja([
    [3, "Zakaj encim deluje le na določen substrat?", "ker se mu prilega le substrat ustrezne oblike v aktivnem mestu", ["ker je encim lipid", "ker se encim pri reakciji porabi", "ker substrat spremeni encim v ATP"], "Specifičnost izhaja iz oblike in kemijskih lastnosti aktivnega mesta."],
    [4, "Kako se razlikuje nekompetitivni inhibitor od kompetitivnega?", "veže se zunaj aktivnega mesta, zato ga več substrata ne izpodrine", ["veže se v aktivno mesto", "pospeši reakcijo", "razgradi substrat"], "Nekompetitivni inhibitor spremeni obliko encima; Vmax se zmanjša.", "visja"],
    [4, "Kaj pomeni nizka vrednost K<sub>M</sub> encima?", "veliko afiniteto encima do substrata", ["majhno afiniteto do substrata", "veliko največjo hitrost", "da je encim denaturiran"], "K<sub>M</sub> je koncentracija substrata pri polovični največji hitrosti.", "visja"],
    [4, "Zakaj se encim pri reakciji ne porabi?", "ker se po reakciji sprosti nespremenjen in lahko ponovno deluje", ["ker se sproti sintetizira", "ker ne sodeluje pri reakciji", "ker se pretvori v produkt"], "Katalizator spremeni pot reakcije, ne pa sebe.", "visja"],
    [2, "Kateri organ izloča največ prebavnih encimov?", "trebušna slinavka", ["žolčnik", "požiralnik", "debelo črevo"], "Trebušna slinavka izloča amilazo, lipazo in proteaze."],
  ]);
}
