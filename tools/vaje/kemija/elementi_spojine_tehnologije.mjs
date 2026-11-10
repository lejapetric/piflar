import { kolicina, izbira, T, L } from "../lib.mjs";
import { F, molska, Vm } from "../kemija-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("amoniak", 5, (r) => {
    const m = r.int(1, 100) * 10, n = m / molska("NH3"), V = (n / 2) * Vm;
    return kolicina({ tezavnost: 3, vrednost: V, tol: 0.01, enota: "L", besedilo: `Koliko litrov dušika (normalni pogoji) potrebujemo za sintezo ${m} g amoniaka po Haber-Boschevem postopku?`, rezultat: `${T(V, 1)} L`, postopek: `<p>N<sub>2</sub> + 3 H<sub>2</sub> ⇌ 2 NH<sub>3</sub></p><p>\\(n(\\text{NH}_3) = \\frac{${m}}{17{,}03}\\), \\(n(\\text{N}_2) = \\frac{n}{2}\\), \\(V \\approx ${L(V, 1)}\\ \\text{L}\\)</p>` });
  });
  serija("apnenec", 5, (r) => {
    const m = r.int(1, 50) * 100, mc = (m / molska("CaCO3")) * molska("CaO");
    return kolicina({ tezavnost: 3, vrednost: mc, tol: 0.01, enota: "g", besedilo: `Koliko gramov žganega apna (CaO) dobimo s termičnim razkrojem ${m} g apnenca?`, rezultat: `${T(mc, 1)} g`, postopek: `<p>CaCO<sub>3</sub> → CaO + CO<sub>2</sub></p><p>\\(m(\\text{CaO}) = \\frac{${m}}{100{,}09} \\cdot 56{,}08 \\approx ${L(mc, 1)}\\ \\text{g}\\)</p>` });
  });
  serija("zelezo", 4, (r) => {
    const t = r.int(1, 20), mFe = ((t * 1000) / molska("Fe2O3")) * 2 * molska("Fe");
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: mFe / 1000, tol: 0.01, enota: "t", besedilo: `Koliko ton železa lahko največ dobimo iz ${t} t hematita (Fe<sub>2</sub>O<sub>3</sub>)?`, rezultat: `${T(mFe / 1000, 2)} t`, postopek: `<p>Masni delež Fe v Fe<sub>2</sub>O<sub>3</sub>: \\(\\frac{2 \\cdot 55{,}85}{159{,}7} \\approx 0{,}699\\).</p><p>\\(${t} \\cdot 0{,}699 \\approx ${L(mFe / 1000, 2)}\\ \\text{t}\\)</p>` });
  });
  pojmi([
    ["Haber-Boschev postopek", "Industrijska sinteza amoniaka iz dušika in vodika ob katalizatorju.", { brezVpisa: true }],
    ["Ostwaldov postopek", "Industrijska proizvodnja dušikove(V) kisline z oksidacijo amoniaka.", { brezVpisa: true }],
    ["kontaktni postopek", "Industrijska proizvodnja žveplove(VI) kisline prek SO<sub>3</sub>.", { brezVpisa: true }],
    ["plavž", "Visoka peč za pridobivanje surovega železa z redukcijo rude s koksom."],
    ["jeklo", "Zlitina železa z manj kot 2 % ogljika in drugimi elementi."],
    ["zlitina", "Kovinska snov iz dveh ali več elementov, vsaj eden je kovina."],
    ["žgano apno", "Kalcijev oksid, ki nastane z žganjem apnenca."],
    ["gašeno apno", "Kalcijev hidroksid, ki nastane iz žganega apna in vode."],
    ["alotropija", "Pojav, da element obstaja v več oblikah z različno zgradbo, npr. diamant in grafit."],
    ["ozon", "Alotropska modifikacija kisika s tremi atomi v molekuli."],
    ["kisli dež", "Padavine z nizkim pH zaradi raztopljenih žveplovih in dušikovih oksidov."],
    ["umetna gnojila", "Spojine dušika, fosforja in kalija, ki rastlinam dodajajo hranila."],
    ["elektroliza aluminijevega oksida", "Postopek pridobivanja aluminija iz taline glinice in kriolita.", { brezVpisa: true }],
  ]);
  vprasanja([
    [2, "Kateri element je v naravi v obliki diamanta in grafita?", "ogljik", ["silicij", "žveplo", "fosfor"], "Diamant in grafit sta alotropski modifikaciji ogljika."],
    [2, "Zakaj grafit prevaja električni tok, diamant pa ne?", "v grafitu so delokalizirani elektroni med plastmi", ["grafit je kovina", "diamant nima elektronov", "grafit ima ionsko vez"], "Vsak C v grafitu je vezan na tri sosede, četrti elektron je delokaliziran."],
    [2, "Katero rudo uporabljamo za pridobivanje aluminija?", "boksit", ["hematit", "galenit", "magnetit"], "Iz boksita pridobimo glinico (Al<sub>2</sub>O<sub>3</sub>)."],
    [2, "Kateri plin povzroča največ toplogrednega učinka zaradi človekovih dejavnosti?", "ogljikov dioksid", ["kisik", "dušik", "argon"], "CO<sub>2</sub> iz fosilnih goriv."],
    [3, "Kaj je reducent v plavžu?", "ogljikov monoksid", ["kisik", "apnenec", "železov oksid"], "CO reducira železove okside do železa."],
    [3, "Zakaj aluminij kljub veliki reaktivnosti ne korodira hitro?", "ker ga prekrije tanka zaščitna plast oksida", ["ker ne reagira s kisikom", "ker je žlahtna kovina", "ker je prevlečen s cinkom"], "Pasivacija: plast Al<sub>2</sub>O<sub>3</sub> ščiti kovino."],
    [3, "Kaj je pocinkano železo?", "železo, prevlečeno s plastjo cinka za zaščito pred korozijo", ["zlitina železa in kositra", "železo z veliko ogljika", "železov oksid"], "Cink je manj žlahten in se korodira namesto železa."],
    [4, "Zakaj pri Haber-Boschevem postopku uporabljajo visok tlak?", "ker se ravnotežje premakne proti amoniaku (manj molov plina)", ["ker se reakcija sicer ne začne", "ker zviša aktivacijsko energijo", "ker je reakcija endotermna"], "Na levi so 4 moli plinov, na desni 2.", "visja"],
    [4, "Zakaj pri sintezi amoniaka temperatura ni zelo nizka, čeprav je reakcija eksotermna?", "ker bi bila reakcija prepočasna", ["ker bi se ravnotežje premaknilo v levo", "ker katalizator deluje le pri nizki temperaturi", "ker amoniak pri nizki temperaturi razpade"], "Kompromis med hitrostjo in lego ravnotežja.", "visja"],
    [4, "Kateri oksid nastane pri gorenju žvepla in je vzrok za kisli dež?", "SO<sub>2</sub>", ["SO<sub>3</sub>", "H<sub>2</sub>S", "S<sub>2</sub>O"], "Žveplo gori v SO<sub>2</sub>, ki se v ozračju oksidira in raztopi v vodi.", "visja"],
  ]);
}
