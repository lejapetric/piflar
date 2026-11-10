import { kolicina, izbira, T, L } from "../lib.mjs";
import { F, molska, Vm } from "../kemija-lib.mjs";
const AK = [["Li", "litij"], ["Na", "natrij"], ["K", "kalij"]];
const HAL = [["F", "fluor"], ["Cl", "klor"], ["Br", "brom"], ["I", "jod"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("voda", 6, (r, i) => {
    const [s, ime] = r.izberi(AK), m = r.int(1, 50) / 10, M = molska(s), V = (m / M / 2) * Vm;
    if (i % 2) return izbira({ r, tezavnost: 1, besedilo: `Kateri produkti nastanejo pri reakciji ${ime === "kalij" ? "kalija" : ime === "natrij" ? "natrija" : "litija"} z vodo?`, pravilna: `${s}OH in H<sub>2</sub>`, napacne: [`${s}<sub>2</sub>O in H<sub>2</sub>`, `${s}OH in O<sub>2</sub>`, `${s}H in O<sub>2</sub>`], postopek: `<p>2 ${s} + 2 H<sub>2</sub>O → 2 ${s}OH + H<sub>2</sub>. Nastane hidroksid (bazična raztopina) in vodik.</p>` });
    return kolicina({ tezavnost: 3, vrednost: V, tol: 0.01, enota: "L", besedilo: `Koliko litrov vodika (pri normalnih pogojih) nastane, ko ${T(m, 1)} g ${ime === "kalij" ? "kalija" : ime === "natrij" ? "natrija" : "litija"} zreagira z vodo?`, rezultat: `${T(V, 3)} L`, postopek: `<p>2 ${s} + 2 H<sub>2</sub>O → 2 ${s}OH + H<sub>2</sub></p><p>\\(n(\\text{${s}}) = \\frac{${L(m, 1)}}{${L(M, 2)}}\\), \\(n(\\text{H}_2) = \\frac{n}{2}\\), \\(V = n \\cdot 22{,}4 \\approx ${L(V, 3)}\\ \\text{L}\\)</p>` });
  });
  serija("izpodrivanje", 6, (r) => {
    const a = r.int(0, 3), b = r.int(0, 3);
    if (a === b) return null;
    const odg = a < b ? "Da" : "Ne";
    return izbira({ r, tezavnost: 2, besedilo: `Ali ${HAL[a][1]} izpodrine ${HAL[b][1]} iz raztopine njegove natrijeve soli (Na${HAL[b][0]})?`, pravilna: odg, napacne: [odg === "Da" ? "Ne" : "Da"], postopek: `<p>Reaktivnost halogenov pada v skupini navzdol (F > Cl > Br > I). Bolj reaktiven halogen izpodrine manj reaktivnega: ${odg === "Da" ? `${HAL[a][0]}<sub>2</sub> + 2 Na${HAL[b][0]} → 2 Na${HAL[a][0]} + ${HAL[b][0]}<sub>2</sub>` : "reakcija ne poteče"}.</p>` });
  });
  serija("halogenid", 6, (r) => {
    const [ak, aime] = r.izberi(AK.concat([["Mg", "magnezij"], ["Ca", "kalcij"], ["Al", "aluminij"]])), [h, hime] = r.izberi(HAL);
    const n = { Mg: 2, Ca: 2, Al: 3 }[ak] ?? 1, f = `${ak}${h}${n > 1 ? n : ""}`;
    return izbira({ r, tezavnost: 2, besedilo: `Katera je formula spojine, ki nastane iz ${aime === "magnezij" ? "magnezija" : aime === "kalcij" ? "kalcija" : aime === "aluminij" ? "aluminija" : aime === "kalij" ? "kalija" : aime === "natrij" ? "natrija" : "litija"} in ${hime === "jod" ? "joda" : hime === "brom" ? "broma" : hime === "klor" ? "klora" : "fluora"}?`, pravilna: F(f), napacne: [F(`${ak}${h}`), F(`${ak}2${h}`), F(`${ak}${h}${n + 1}`), F(`${ak}${h}2`)].filter((x, i, a) => x !== F(f) && a.indexOf(x) === i).slice(0, 3), postopek: `<p>${ak} tvori ion z nabojem ${n}+, halogen ion z nabojem 1−: ${F(f)}.</p>` });
  });
  serija("plamen", 5, (r) => {
    const [s, b] = r.izberi([["Li", "škrlatno rdeča"], ["Na", "rumena"], ["K", "vijolična"], ["Ca", "opečnato rdeča"], ["Cu", "zelena"], ["Sr", "rdeča"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kako obarvajo plamen spojine elementa ${s}?`, pravilna: b, napacne: ["škrlatno rdeča", "rumena", "vijolična", "zelena", "opečnato rdeča"].filter((x) => x !== b).slice(0, 3), postopek: `<p>Plamenska reakcija: ${s} → ${b}.</p>` });
  });
  serija("elektroliza-NaCl", 4, (r) => {
    const m = r.int(1, 50) * 100, n = m / molska("NaCl"), V = (n / 2) * Vm;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: V, tol: 0.01, enota: "L", besedilo: `Pri elektrolizi raztopine NaCl porabimo ${m} g NaCl. Koliko litrov klora (normalni pogoji) nastane?`, rezultat: `${T(V, 1)} L`, postopek: `<p>2 NaCl + 2 H<sub>2</sub>O → 2 NaOH + H<sub>2</sub> + Cl<sub>2</sub></p><p>\\(n(\\text{Cl}_2) = \\frac{${m}}{58{,}44 \\cdot 2} \\approx ${L(n / 2, 3)}\\ \\text{mol}\\), \\(V \\approx ${L(V, 1)}\\ \\text{L}\\)</p>` });
  });
  pojmi([
    ["alkalijske kovine", "Elementi 1. skupine, mehke in zelo reaktivne kovine z enim valenčnim elektronom."],
    ["halogeni", "Elementi 17. skupine, reaktivne nekovine s sedmimi valenčnimi elektroni."],
    ["halogenid", "Spojina halogena z manj elektronegativnim elementom, npr. natrijev klorid."],
    ["hidroksid", "Spojina s hidroksidnim ionom, ki v vodi deluje bazično."],
    ["plamenska reakcija", "Določanje elementov po značilni barvi, s katero obarvajo plamen."],
    ["klorovodikova kislina", "Vodna raztopina vodikovega klorida."],
    ["natrijev klorid", "Kuhinjska sol, ionska spojina natrija in klora."],
  ]);
  vprasanja([
    [1, "Zakaj alkalijske kovine hranimo pod petrolejem?", "ker burno reagirajo s kisikom in vlago iz zraka", ["ker so strupene", "ker so tekoče", "da se ne raztopijo"], "Petrolej prepreči stik z zrakom in vodo."],
    [2, "Kako se spreminja reaktivnost alkalijskih kovin po skupini navzdol?", "narašča", ["pada", "se ne spreminja", "najprej narašča, nato pada"], "Valenčni elektron je dlje od jedra in ga atom laže odda."],
    [2, "Kako se spreminja reaktivnost halogenov po skupini navzdol?", "pada", ["narašča", "se ne spreminja", "je pri vseh enaka"], "Atomi so večji in elektron težje sprejmejo."],
    [2, "V kakšnem agregatnem stanju je brom pri sobni temperaturi?", "tekoč", ["trden", "plinast", "v obliki plazme"], "Brom je rdečerjava tekočina."],
    [2, "Katere barve je klor pri sobni temperaturi?", "rumenozelen plin", ["brezbarven plin", "rdečerjava tekočina", "vijoličasti kristali"], "Klor je strupen rumenozelen plin."],
    [2, "Kateri halogen pri segrevanju sublimira v vijolične pare?", "jod", ["brom", "klor", "fluor"], "Jod je trden, pri segrevanju neposredno preide v plin."],
    [3, "Kaj nastane pri gorenju natrija na zraku?", "natrijev peroksid (Na<sub>2</sub>O<sub>2</sub>)", ["natrijev hidroksid", "natrijev klorid", "natrijev karbonat"], "Natrij na zraku gori z rumenim plamenom in tvori pretežno peroksid."],
    [3, "Kakšna je raztopina, ki nastane pri reakciji kalija z vodo?", "bazična", ["kisla", "nevtralna", "ni raztopina"], "Nastane KOH."],
    [3, "Zakaj je fluor najbolj reaktiven halogen?", "ker je najmanjši in ima največjo elektronegativnost", ["ker ima največ elektronov", "ker je plin", "ker ima največjo atomsko maso"], "Majhen atom močno privlači dodatni elektron."],
    [4, "Kakšno je oksidacijsko število klora v natrijevem hipokloritu (NaClO)?", "+1", ["−1", "+3", "+5"], "Na +1, O −2, torej Cl +1.", "visja"],
    [4, "Kaj nastane, ko klor uvajamo v hladno raztopino NaOH?", "NaCl, NaClO in voda", ["NaCl in H<sub>2</sub>", "NaClO<sub>3</sub> in O<sub>2</sub>", "HCl in Na"], "Disproporcionacija: Cl<sub>2</sub> + 2 NaOH → NaCl + NaClO + H<sub>2</sub>O.", "visja"],
    [4, "Zakaj je vrelišče HF višje od vrelišča HCl?", "ker med molekulami HF nastajajo vodikove vezi", ["ker je HF večja molekula", "ker je vez H–F šibkejša", "ker je HF ionska spojina"], "Fluor je dovolj elektronegativen za vodikove vezi.", "visja"],
  ]);
}
