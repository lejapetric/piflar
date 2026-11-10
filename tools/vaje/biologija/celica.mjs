import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("organel", 10, (r) => {
    const O = [["mitohondrij", "celično dihanje in nastanek ATP"], ["kloroplast", "fotosinteza"], ["ribosom", "sinteza beljakovin"], ["Golgijev aparat", "dodelava in pakiranje beljakovin"], ["lizosom", "razgradnja snovi z encimi"], ["gladki ER", "sinteza lipidov"], ["zrnati ER", "sinteza beljakovin za izločanje in membrane"], ["jedro", "shranjevanje DNA in uravnavanje celice"], ["vakuola", "shranjevanje vode in snovi, turgor"], ["celična membrana", "uravnavanje prehoda snovi"], ["celična stena", "oporna zunanja ovojnica rastlinske celice"]];
    const [o, f] = r.izberi(O), obrni = r.izberi([true, false]);
    if (obrni) return izbira({ r, tezavnost: 1, besedilo: `Kateri del celice ima nalogo: ${f}?`, pravilna: o, napacne: r.premesaj(O.filter(([x]) => x !== o).map(([x]) => x)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${f}.</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Kakšna je glavna naloga organela ${o}?`, pravilna: f, napacne: r.premesaj(O.filter(([x]) => x !== o).map(([, y]) => y)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${f}.</p>` });
  });
  serija("tip", 8, (r) => {
    const [d, odg] = r.izberi([["celična stena iz celuloze", "rastlinska celica"], ["centriola", "živalska celica"], ["krožna DNA brez jedrne ovojnice", "bakterijska celica"], ["velika osrednja vakuola", "rastlinska celica"], ["kloroplasti", "rastlinska celica"], ["celična stena iz peptidoglikana (mureina)", "bakterijska celica"], ["celična stena iz hitina", "glivna celica"], ["nima celične stene", "živalska celica"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Za kateri tip celice je značilno: ${d}?`, pravilna: odg, napacne: ["rastlinska celica", "živalska celica", "bakterijska celica", "glivna celica"].filter((x) => x !== odg), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${odg}.</p>` });
  });
  serija("povecava", 8, (r, i) => {
    const ok = r.izberi([5, 10, 15]), obj = r.izberi([4, 10, 40, 100]);
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: ok * obj, enota: "×", besedilo: `Okular mikroskopa povečuje ${ok}-krat, objektiv ${obj}-krat. Kolikšna je skupna povečava?`, rezultat: `${ok * obj}-krat`, postopek: `<p>\\(P = P_{ok} \\cdot P_{obj} = ${ok} \\cdot ${obj} = ${ok * obj}\\)</p>` });
    const slika = r.int(5, 60), v = (slika * 1000) / (ok * obj);
    return kolicina({ tezavnost: 3, vrednost: v, tol: 0.01, enota: "µm", besedilo: `Celica je pri povečavi ${ok * obj}× na sliki velika ${slika} mm. Kolikšna je njena dejanska velikost v µm?`, rezultat: `${T(v, 1)} µm`, postopek: `<p>\\(d = \\frac{${slika}\\ \\text{mm}}{${ok * obj}} = \\frac{${slika * 1000}\\ \\mu\\text{m}}{${ok * obj}} \\approx ${L(v, 1)}\\ \\mu\\text{m}\\)</p>` });
  });
  serija("povrsina", 5, (r) => {
    const a = r.int(1, 10), PV = 6 / a;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: PV, tol: 0.01, enota: "µm⁻¹", besedilo: `Celico ponazorimo s kocko z robom ${a} µm. Kolikšno je razmerje površina : prostornina (v µm⁻¹)?`, rezultat: `${T(PV, 2)} µm⁻¹`, postopek: `<p>\\(\\frac{P}{V} = \\frac{6a^2}{a^3} = \\frac{6}{a} = \\frac{6}{${a}} \\approx ${L(PV, 2)}\\)</p><p>Manjše celice imajo večje razmerje in zato hitrejšo izmenjavo snovi.</p>` });
  });
  serija("transport", 6, (r) => {
    const [d, odg] = r.izberi([["voda prehaja skozi akvaporine po koncentracijskem gradientu", "osmoza"], ["ioni Na⁺ se črpajo iz celice ob porabi ATP", "aktivni transport"], ["O₂ prehaja skozi lipidni dvosloj", "difuzija"], ["glukoza prehaja skozi prenašalno beljakovino brez porabe ATP", "olajšana difuzija"], ["celica zajame bakterijo z ugrezanjem membrane", "endocitoza (fagocitoza)"], ["celica izloči hormon z zlitjem vezikla z membrano", "eksocitoza"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kateri način prehoda snovi opisuje: ${d}?`, pravilna: odg, napacne: r.premesaj(["osmoza", "aktivni transport", "difuzija", "olajšana difuzija", "endocitoza (fagocitoza)", "eksocitoza"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("osmoza", 5, (r) => {
    const [razt, odg, raz] = r.izberi([["hipertonično raztopino", "celica se skrči (voda izteka)", "Zunaj je več topljenca, voda izteka iz celice."], ["hipotonično raztopino", "celica nabrekne in lahko poči", "Zunaj je manj topljenca, voda vteka v celico."], ["izotonično raztopino", "velikost celice se ne spremeni", "Koncentraciji sta enaki, neto pretoka vode ni."]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kaj se zgodi z rdečo krvničko, ki jo damo v ${razt}?`, pravilna: odg, napacne: ["celica se skrči (voda izteka)", "celica nabrekne in lahko poči", "velikost celice se ne spremeni"].filter((x) => x !== odg), postopek: `<p>${raz}</p>` });
  });
  pojmi([
    ["celična teorija", "Vsa živa bitja so zgrajena iz celic, celica nastane le iz celice.", { brezVpisa: true }],
    ["fosfolipidni dvosloj", "Osnovna zgradba membrane iz dveh plasti fosfolipidov s hidrofobnimi repi navznoter."],
    ["model tekočega mozaika", "Model membrane, v kateri se beljakovine gibljejo v tekočem lipidnem dvosloju."],
    ["citoskelet", "Mreža beljakovinskih vlaken, ki daje celici obliko in omogoča gibanje."],
    ["citoplazma", "Vsebina celice med membrano in jedrom."],
    ["plazmoliza", "Odstop protoplasta od celične stene zaradi izgube vode."],
    ["turgor", "Tlak vsebine celice na celično steno."],
    ["difuzija", "Gibanje delcev iz območja z višjo v območje z nižjo koncentracijo."],
    ["osmoza", "Difuzija vode skozi polprepustno membrano."],
    ["aktivni transport", "Prenos snovi proti koncentracijskemu gradientu ob porabi ATP."],
    ["jedrce", "Del jedra, v katerem nastajajo ribosomske podenote."],
    ["plazmid", "Majhna krožna molekula DNA v bakterijah."],
    ["biček", "Dolg nitast izrastek celice za gibanje."],
  ]);
  vprasanja([
    [3, "Zakaj imajo celice trebušne slinavke veliko zrnatega ER?", "ker izdelujejo veliko beljakovin za izločanje (encimov)", ["ker skladiščijo maščobe", "ker izvajajo fotosintezo", "ker razgrajujejo strupe"], "Ribosomi na zrnatem ER sintetizirajo beljakovine za izločanje."],
    [4, "Zakaj imajo mišične celice veliko mitohondrijev?", "ker potrebujejo veliko ATP za krčenje", ["ker izdelujejo hormone", "ker shranjujejo kalcij", "ker se hitro delijo"], "Mitohondriji so mesto aerobnega dihanja.", "visja"],
    [4, "Kaj se zgodi s pH v lizosomu, če se poškoduje protonska črpalka v njegovi membrani?", "pH naraste in encimi slabše delujejo", ["pH pade", "encimi postanejo aktivnejši", "lizosom se razdeli"], "Lizosomski encimi delujejo optimalno v kislem (pH ≈ 5).", "visja"],
    [4, "Zakaj se s povečevanjem celice zmanjša učinkovitost izmenjave snovi?", "ker prostornina raste hitreje kot površina", ["ker membrana postane debelejša", "ker se zmanjša število organelov", "ker celica izgubi jedro"], "Prostornina raste s kubom, površina s kvadratom velikosti.", "visja"],
    [2, "Kateri organel imajo vse celice, tudi bakterijske?", "ribosom", ["mitohondrij", "jedro", "Golgijev aparat"], "Ribosomi so v prokariontih (70S) in evkariontih (80S)."],
  ]);
}
