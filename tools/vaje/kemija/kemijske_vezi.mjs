import { kolicina, izbira, T, L } from "../lib.mjs";
import { E, F } from "../kemija-lib.mjs";

const PARI = [["Na", "Cl"], ["H", "Cl"], ["H", "H"], ["C", "H"], ["O", "H"], ["Mg", "O"], ["C", "O"], ["N", "H"], ["K", "F"], ["Cl", "Cl"], ["Ca", "O"], ["S", "O"], ["H", "F"], ["C", "Cl"], ["Li", "F"], ["Al", "Cl"], ["Na", "O"], ["P", "Cl"]];
const vrsta = (d) => (d >= 1.8 ? "ionska" : d >= 0.5 ? "polarna kovalentna" : "nepolarna kovalentna");
const GEO = [["CH4", "tetraedrična", 109.5, "nepolarna"], ["NH3", "trigonalno piramidalna", 107, "polarna"], ["H2O", "kotna (lomljena)", 104.5, "polarna"], ["CO2", "linearna", 180, "nepolarna"], ["BF3", "trigonalno planarna", 120, "nepolarna"], ["CCl4", "tetraedrična", 109.5, "nepolarna"], ["HCl", "linearna", 180, "polarna"], ["SO2", "kotna (lomljena)", 119, "polarna"], ["BeCl2", "linearna", 180, "nepolarna"], ["CH2O", "trigonalno planarna", 120, "polarna"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("razlika-en", 8, (r) => {
    const [a, b] = r.izberi(PARI), d = Math.abs(E[a].en - E[b].en);
    return kolicina({ tezavnost: 1, vrednost: Math.round(d * 10) / 10, tol: 0.001, enota: "", besedilo: `Kolikšna je razlika elektronegativnosti med ${a} (${L(E[a].en, 1).replace("{,}", ",")}) in ${b} (${L(E[b].en, 1).replace("{,}", ",")})?`, rezultat: `${T(d, 1)}`, postopek: `<p>\\(\\Delta EN = |${L(E[a].en, 1)} - ${L(E[b].en, 1)}| = ${L(d, 1)}\\)</p>` });
  });
  serija("vrsta-vezi", 10, (r) => {
    const [a, b] = r.izberi(PARI), d = Math.abs(E[a].en - E[b].en), odg = vrsta(d);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšna vez nastane med ${a} in ${b}? (\\(EN(${a}) = ${L(E[a].en, 1)}\\), \\(EN(${b}) = ${L(E[b].en, 1)}\\))`, pravilna: odg, napacne: ["ionska", "polarna kovalentna", "nepolarna kovalentna", "kovinska"].filter((x) => x !== odg), postopek: `<p>\\(\\Delta EN = ${L(d, 1)}\\). Približno: pod 0,5 nepolarna kovalentna, od 0,5 do 1,8 polarna kovalentna, nad 1,8 pretežno ionska.</p>` });
  });
  serija("oblika", 8, (r) => {
    const [f, g] = r.izberi(GEO);
    return izbira({ r, tezavnost: 3, besedilo: `Kakšna je oblika molekule ${F(f)}?`, pravilna: g, napacne: ["tetraedrična", "trigonalno piramidalna", "kotna (lomljena)", "linearna", "trigonalno planarna"].filter((x) => x !== g).slice(0, 3), postopek: `<p>Po teoriji VSEPR se elektronski pari okoli osrednjega atoma razporedijo čim dlje drug od drugega; nevezni pari obliko še dodatno spremenijo. ${F(f)}: ${g}.</p>` });
  });
  serija("kot", 4, (r) => {
    const [f, g, k] = r.izberi(GEO);
    return kolicina({ tezavnost: 3, vrednost: k, tol: 0.02, enota: "°", besedilo: `Približno kolikšen je vezni kot v molekuli ${F(f)} (${g})?`, rezultat: `približno ${T(k, 1)}°`, postopek: `<p>Oblika ${g} ima vezni kot približno ${T(k, 1)}°.</p>` });
  });
  serija("polarnost", 6, (r) => {
    const [f, , , p] = r.izberi(GEO);
    return izbira({ r, tezavnost: 3, besedilo: `Ali je molekula ${F(f)} polarna?`, pravilna: p === "polarna" ? "Da" : "Ne", napacne: [p === "polarna" ? "Ne" : "Da"], postopek: `<p>Molekula je polarna, če se dipoli vezi zaradi oblike ne izničijo. ${F(f)} je ${p}.</p>` });
  });
  serija("vezni-pari", 6, (r) => {
    const [f, v, n] = r.izberi([["H2O", 2, 2], ["NH3", 3, 1], ["CH4", 4, 0], ["CO2", 4, 4], ["HCl", 1, 3], ["N2", 3, 2], ["O2", 2, 4], ["HF", 1, 3], ["Cl2", 1, 6]]);
    const kaj = r.izberi(["vezni", "nevezni"]);
    return kolicina({ tezavnost: 3, vrednost: kaj === "vezni" ? v : n, enota: "", besedilo: `Koliko ${kaj === "vezni" ? "veznih" : "neveznih (prostih)"} elektronskih parov je v molekuli ${F(f)}?`, rezultat: `${kaj === "vezni" ? v : n}`, postopek: `<p>Iz Lewisove strukture: ${v} ${v === 1 ? "vezni par" : "vezni pari"} in ${n} nevezni pari (v celi molekuli).</p>` });
  });
  serija("medmolekulske", 6, (r) => {
    const [opis, odg] = r.izberi([["med molekulami vode", "vodikove vezi"], ["med molekulami metana", "disperzijske (Londonove) sile"], ["med molekulami HCl", "dipol-dipol"], ["med molekulami amoniaka", "vodikove vezi"], ["med atomi argona v tekočem argonu", "disperzijske (Londonove) sile"], ["med molekulami etanola", "vodikove vezi"], ["med molekulami joda", "disperzijske (Londonove) sile"], ["med molekulami SO₂", "dipol-dipol"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katere so najmočnejše medmolekulske vezi ${opis}?`, pravilna: odg, napacne: ["vodikove vezi", "disperzijske (Londonove) sile", "dipol-dipol", "ionske vezi"].filter((x) => x !== odg), postopek: `<p>Vodikove vezi nastanejo, ko je H vezan na N, O ali F; polarne molekule brez tega imajo dipol-dipol; nepolarne le disperzijske sile.</p>` });
  });
  serija("vrelisce", 4, (r) => {
    const [a, b, odg, raz] = r.izberi([["H2O", "H2S", "H2O", "vodikove vezi"], ["CH4", "C4H10", "C4H10", "večja molekula, močnejše disperzijske sile"], ["HF", "HCl", "HF", "vodikove vezi"], ["C2H5OH", "CH3OCH3", "C2H5OH", "vodikove vezi med molekulami etanola"], ["Cl2", "I2", "I2", "večje molekule, močnejše disperzijske sile"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Katera snov ima višje vrelišče: ${F(a)} ali ${F(b)}?`, pravilna: F(odg), napacne: [F(odg === a ? b : a)], postopek: `<p>${F(odg)} ima višje vrelišče: ${raz}.</p>` });
  });
  pojmi([
    ["kovalentna vez", "Vez, pri kateri si atoma delita skupni elektronski par."],
    ["ionska vez", "Privlak med nasprotno nabitimi ioni."],
    ["kovinska vez", "Vez med kationi kovine in prosto gibljivimi elektroni."],
    ["elektronegativnost", "Sposobnost atoma, da v vezi k sebi privlači vezne elektrone."],
    ["vodikova vez", "Privlak med vodikom, vezanim na N, O ali F, in prostim parom drugega takega atoma."],
    ["dipol", "Molekula z ločenima delnima pozitivnim in negativnim nabojem."],
    ["ionski kristal", "Trdna snov iz pravilno razporejenih kationov in anionov."],
    ["vezna energija", "Energija, potrebna za prekinitev vezi v enem molu molekul."],
  ]);
  vprasanja([
    [4, "Zakaj ima voda nenavadno visoko vrelišče v primerjavi s H<sub>2</sub>S?", "ker med molekulami vode nastajajo vodikove vezi", ["ker je molekula vode večja", "ker je vez O–H ionska", "ker je voda nepolarna"], "Vodikove vezi so precej močnejše od disperzijskih sil in dipol-dipol interakcij v H<sub>2</sub>S.", "visja"],
    [4, "Koliko σ- in π-vezi je v molekuli N<sub>2</sub>?", "ena σ in dve π", ["tri σ", "dve σ in ena π", "ena σ in ena π"], "Trojna vez je sestavljena iz ene σ- in dveh π-vezi.", "visja"],
    [4, "Kakšna je hibridizacija ogljika v molekuli CO<sub>2</sub>?", "sp", ["sp<sup>2</sup>", "sp<sup>3</sup>", "brez hibridizacije"], "Linearna razporeditev dveh elektronskih območij ustreza hibridizaciji sp.", "visja"],
    [4, "Kakšna je hibridizacija ogljika v metanu?", "sp<sup>3</sup>", ["sp", "sp<sup>2</sup>", "dsp<sup>3</sup>"], "Štiri enakovredne vezi v tetraedru: sp<sup>3</sup>.", "visja"],
    [4, "Zakaj je NaCl v trdnem stanju neprevoden, talina pa prevaja tok?", "v talini so ioni prosto gibljivi", ["v talini nastanejo prosti elektroni", "pri taljenju nastanejo molekule NaCl", "trdni NaCl nima ionov"], "V kristalu so ioni vezani na mesta v mreži, v talini se lahko gibljejo.", "visja"],
  ]);
}
