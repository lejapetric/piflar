import { kolicina, izbira, T, L, sci } from "../lib.mjs";
import { F, molska } from "../kemija-lib.mjs";
const POL = [["polieten (PE)", "eten", "C2H4"], ["polipropen (PP)", "propen", "C3H6"], ["polivinil klorid (PVC)", "vinil klorid (kloroeten)", "C2H3Cl"], ["polistiren (PS)", "stiren", "C8H8"], ["politetrafluoroeten (teflon)", "tetrafluoroeten", "C2F4"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("monomer", 6, (r) => {
    const [p, m] = r.izberi(POL);
    return izbira({ r, tezavnost: 1, besedilo: `Iz katerega monomera nastane ${p}?`, pravilna: m, napacne: POL.filter(([pp]) => pp !== p).slice(0, 3).map(([, mm]) => mm), postopek: `<p>${p.charAt(0).toUpperCase() + p.slice(1)} nastane z adicijsko polimerizacijo monomera ${m}.</p>` });
  });
  serija("stopnja", 8, (r, i) => {
    const [p, m, f] = r.izberi(POL), M0 = molska(f), n = r.int(100, 5000) * 10, M = n * M0;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: n, tol: 0.01, enota: "", besedilo: `Molska masa molekule polimera ${p} je \\(${sci(M)}\\) g/mol. Koliko monomernih enot vsebuje (stopnja polimerizacije)?`, rezultat: `${n}`, postopek: `<p>\\(M(\\text{${f}}) = ${L(M0, 2)}\\ \\text{g/mol}\\)</p><p>\\(n = \\frac{${sci(M)}}{${L(M0, 2)}} \\approx ${n}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: M, tol: 0.01, enota: "g/mol", besedilo: `Molekula polimera ${p} vsebuje ${n} monomernih enot. Kolikšna je njena molska masa? (vpiši npr. 2,8e5)`, rezultat: `\\(${sci(M)}\\) g/mol`, postopek: `<p>\\(M = n \\cdot M(\\text{${f}}) = ${n} \\cdot ${L(M0, 2)} \\approx ${sci(M)}\\ \\text{g/mol}\\)</p>` });
  });
  serija("vrsta", 6, (r) => {
    const [p, odg] = r.izberi([["polieten", "adicijska polimerizacija"], ["najlon", "kondenzacijska polimerizacija"], ["poliester (PET)", "kondenzacijska polimerizacija"], ["PVC", "adicijska polimerizacija"], ["polistiren", "adicijska polimerizacija"], ["beljakovine", "kondenzacijska polimerizacija"], ["škrob", "kondenzacijska polimerizacija"]]);
    return izbira({ r, tezavnost: 2, besedilo: `S katero vrsto polimerizacije nastane ${p}?`, pravilna: odg, napacne: ["adicijska polimerizacija", "kondenzacijska polimerizacija"].filter((x) => x !== odg), postopek: `<p>Pri adicijski polimerizaciji se monomeri z dvojno vezjo povežejo brez stranskih produktov; pri kondenzacijski se ob vsaki vezi odcepi majhna molekula (npr. voda).</p>` });
  });
  serija("naravni", 5, (r) => {
    const [p, m] = r.izberi([["škrob", "glukoza"], ["celuloza", "glukoza"], ["beljakovine", "aminokisline"], ["DNA", "nukleotidi"], ["naravni kavčuk", "izopren"], ["glikogen", "glukoza"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri so monomeri naravnega polimera ${p}?`, pravilna: m, napacne: ["glukoza", "aminokisline", "nukleotidi", "izopren", "maščobne kisline"].filter((x) => x !== m).slice(0, 3), postopek: `<p>${p.charAt(0).toUpperCase() + p.slice(1)} je zgrajen iz enot: ${m}.</p>` });
  });
  serija("visja-masa", 3, (r) => {
    const t = r.int(1, 50), n = (t * 1e6) / molska("C2H4");
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: n * 22.4 / 1000, tol: 0.01, enota: "m³", besedilo: `Koliko m³ etena (normalni pogoji) potrebujemo za ${t} t polietena (predpostavimo 100-odstotni izkoristek)?`, rezultat: `${T((n * 22.4) / 1000, 0)} m³`, postopek: `<p>Masa se ohrani: \\(n(\\text{C}_2\\text{H}_4) = \\frac{${t} \\cdot 10^6\\ \\text{g}}{28{,}05} \\approx ${sci(n)}\\ \\text{mol}\\).</p><p>\\(V = n \\cdot 22{,}4\\ \\text{L} \\approx ${L((n * 22.4) / 1000, 0)}\\ \\text{m}^3\\)</p>` });
  });
  pojmi([
    ["polimer", "Makromolekula, zgrajena iz velikega števila ponavljajočih se enot."],
    ["monomer", "Majhna molekula, iz katere s povezovanjem nastane polimer."],
    ["stopnja polimerizacije", "Število monomernih enot v molekuli polimera."],
    ["termoplast", "Polimer, ki se pri segrevanju zmehča in ga lahko večkrat preoblikujemo."],
    ["duroplast", "Polimer, ki se pri segrevanju ne zmehča, ker ima zamrežene verige."],
    ["elastomer", "Prožen polimer, ki se po raztegu vrne v prvotno obliko, npr. guma."],
    ["vulkanizacija", "Zamreženje kavčuka z žveplom, ki ga naredi trdnejšega in prožnejšega."],
    ["kopolimer", "Polimer iz dveh ali več različnih monomerov."],
    ["mikroplastika", "Drobni delci plastike, manjši od 5 mm, ki onesnažujejo okolje."],
    ["biorazgradljiva plastika", "Plastika, ki jo mikroorganizmi razgradijo v naravne snovi."],
  ]);
  vprasanja([
    [3, "Zakaj je polieten slabo biorazgradljiv?", "ker ima stabilne vezi C–C in C–H, ki jih mikroorganizmi težko razgradijo", ["ker je strupen", "ker vsebuje klor", "ker je ionska snov"], "Nepolarna nasičena veriga je kemijsko inertna."],
    [4, "Kateri stranski produkt nastaja pri sintezi najlona iz diamina in dikarboksilne kisline?", "voda", ["vodik", "ogljikov dioksid", "amoniak"], "Kondenzacija: pri vsaki amidni vezi se odcepi molekula vode.", "visja"],
  ]);
}
