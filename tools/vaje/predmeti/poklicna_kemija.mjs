// Poklicna matura, kemija (2. predmet, kemijski tehnik): naloge za vajo po snoveh poklicne mature.
// Naloge splošne mature razporedi med snovi poklicne mature po pravilih spodaj (vsaka naloga gre
// v prvo snov, katere pravilo ustreza). Za vsebine, ki jih ima samo katalog poklicne mature
// (zmesi, plinski zakoni in fazni diagram, koligativne lastnosti, zrak in voda, zemljoalkalijske
// kovine), so lastni pojmovniki. Vse naloge so na eni ravni.
// Zgradi najprej api/data/vaje/kemija.json (node tools/vaje/gradi.mjs kemija).
import { readFileSync } from "node:fs";
import { pojmovnik, izbira, kolicina, rng, T } from "../lib.mjs";

const SM = JSON.parse(readFileSync(new URL("../../../api/data/vaje/kemija.json", import.meta.url)));

const IME = /poimenuj|imenuj|ime spojine|ime ion|zapiši ime|imenu|Stock|grškimi števniki|formulo spojine|formula spojine/i;
const STEH = /množinsk\w* razmerj|prebit|izkoristek|koliko gramov|izračunaj maso|izračunaj množino|nastane .* g |potrebujemo .* g|teoretičn/i;
const ORG_BIO = /sahar|glukoz|fruktoz|saharoz|laktoz|maltoz|škrob|celuloz|glikogen|lipid|maščob|milo|umilj|olj|fotosintez|ogljikov\w* hidrat|glikozid|Fischer|vosk|fosfolipid|steroid|holesterol/i;

// [snov poklicne mature, poglavje splošne mature, pravilo ali null za vse preostale]
const PRAVILA = [
  ["zmesi_laboratorij", "varno_eksperimentalno_delo", null],
  ["kovine_pm", "periodni_sistem_elementov", /prehodn|koordinac|kompleks|ligand|železo|baker|krom|mangan/i],
  ["atom_periodni_sistem", "delci_snovi", null],
  ["atom_periodni_sistem", "periodni_sistem_elementov", null],
  ["anorganska_nomenklatura", "kemijske_vezi", IME],
  ["vezi_zgradba_molekul", "kemijske_vezi", null],
  ["anorganska_nomenklatura", "oksidacija_redukcija", /oksidacijsk\w* štev/i],
  ["anorganska_nomenklatura", "ravnotezja_v_vodnih_raztopinah", IME],
  ["agregatna_stanja", "mnozina_snovi", /plin|molsk\w* prostornin|pV|tlak|kelvin/i],
  ["mnozina_stehiometrija", "mnozina_snovi", null],
  ["racunanje_raztopine", "raztopine", /koncentracij|masni delež|redč|mol\/L|g\/L|pripravi|ppm|razred|zmešamo|w\(/i],
  ["raztopine_pm", "raztopine", null],
  ["mnozina_stehiometrija", "kemijska_reakcija", STEH],
  ["reakcije_energija", "kemijska_reakcija", null],
  ["hitrost_ravnotezje", "hitrost_reakcij", null],
  ["hitrost_ravnotezje", "kemijsko_ravnotezje", null],
  ["kisline_baze_pm", "ravnotezja_v_vodnih_raztopinah", null],
  ["kovine_pm", "oksidacija_redukcija", /pridobivanj|plavž|rud[ae]|redukcij\w* kovin|kovino pridob/i],
  ["redoks_elektrokemija", "oksidacija_redukcija", null],
  ["zrak_voda_nekovine", "alkalijske_kovine_halogeni", /halogen|klor|fluor|brom|jod|astat/i],
  ["kovine_pm", "alkalijske_kovine_halogeni", null],
  ["kovine_pm", "elementi_spojine_tehnologije", /alumin|boksit|amfoter/i],
  ["zrak_voda_nekovine", "elementi_spojine_tehnologije", null],
  ["ogljikovodiki_pm", "organske_spojine_zgradba", null],
  ["ogljikovodiki_pm", "ogljikovodiki", null],
  ["ogljikovodiki_pm", "organske_reakcije", null],
  ["halogenirani_kisikove", "halogenirani_ogljikovodiki", null],
  ["biomolekule_pm", "kisikove_spojine", ORG_BIO],
  ["halogenirani_kisikove", "kisikove_spojine", null],
  ["biomolekule_pm", "dusikove_spojine", /aminokislin|peptid|beljakovin|protein|encim|denatur|zwitter|amfoter/i],
  ["halogenirani_kisikove", "dusikove_spojine", null],
  ["polimeri_pm", "polimeri", null],
];

const POJMI = {
  zmesi_laboratorij: [
    ["čista snov", "Snov s stalno sestavo in stalnimi fizikalnimi lastnostmi, na primer element ali spojina"],
    ["homogena zmes", "Zmes, v kateri sestavin ne ločimo niti z mikroskopom, na primer raztopina soli"],
    ["heterogena zmes", "Zmes z vidnimi sestavinami, na primer pesek v vodi"],
    ["koloidni sistem", "Disperzni sistem z delci velikosti 1 nm do 1 µm, ki kaže Tyndallov pojav"],
    ["suspenzija", "Heterogena zmes trdnih delcev v tekočini, ki se posedajo"],
    ["emulzija", "Zmes dveh tekočin, ki se ne mešata, na primer olje v vodi"],
    ["Tyndallov pojav", "Vidna pot svetlobnega snopa skozi koloidni sistem"],
    ["destilacija", "Ločevanje tekočin na osnovi različnih vrelišč"],
    ["ekstrakcija", "Ločevanje na osnovi različne topnosti snovi v dveh topilih, ki se ne mešata"],
    ["kromatografija", "Ločevanje na osnovi različne adsorpcije sestavin na nosilec"],
    ["sublimacija", "Prehod snovi iz trdnega neposredno v plinasto stanje"],
    ["dekantiranje", "Previdno odlivanje tekočine nad usedlino"],
  ],
  agregatna_stanja: [
    ["parni tlak", "Tlak pare nad tekočino v zaprti posodi, ko sta izparevanje in kondenzacija v ravnotežju"],
    ["vrelišče", "Temperatura, pri kateri je parni tlak tekočine enak zunanjemu tlaku"],
    ["trojna točka", "Stanje, v katerem so trdna, tekoča in plinasta faza snovi v ravnotežju"],
    ["kritična točka", "Stanje, nad katerim tekočine in pare ne moremo več ločiti"],
    ["idealni plin", "Model plina, v katerem delci nimajo lastne prostornine in se ne privlačijo"],
    ["Boylov zakon", "Pri stalni temperaturi je produkt tlaka in prostornine plina stalen"],
    ["Charlesov zakon", "Pri stalnem tlaku je prostornina plina sorazmerna absolutni temperaturi"],
    ["splošna plinska enačba", "Zveza pV = nRT med tlakom, prostornino, množino in temperaturo plina"],
    ["amorfna snov", "Trdna snov brez urejene kristalne zgradbe, na primer steklo"],
    ["fazni diagram", "Diagram tlaka v odvisnosti od temperature, ki kaže področja agregatnih stanj"],
  ],
  raztopine_pm: [
    ["koligativna lastnost", "Lastnost raztopine, ki je odvisna samo od števila raztopljenih delcev"],
    ["znižanje zmrzišča", "Raztopina zmrzne pri nižji temperaturi kot čisto topilo"],
    ["zvišanje vrelišča", "Raztopina vre pri višji temperaturi kot čisto topilo"],
    ["osmoza", "Prehajanje topila skozi polprepustno membrano v bolj koncentrirano raztopino"],
    ["osmozni tlak", "Tlak, ki prepreči prehajanje topila skozi polprepustno membrano"],
    ["molalnost", "Množina topljenca na kilogram topila"],
    ["polprepustna membrana", "Pregrada, ki prepušča molekule topila, ne pa delcev topljenca"],
    ["nasičena raztopina", "Raztopina, v kateri se pri dani temperaturi ne raztopi več topljenca"],
  ],
  zrak_voda_nekovine: [
    ["frakcionirna destilacija zraka", "Industrijski postopek pridobivanja kisika, dušika in žlahtnih plinov iz utekočinjenega zraka"],
    ["začasna trdota vode", "Trdota zaradi hidrogenkarbonatov, ki jo odstranimo s kuhanjem"],
    ["stalna trdota vode", "Trdota zaradi sulfatov in kloridov kalcija in magnezija"],
    ["ionski izmenjevalec", "Snov, ki ione kalcija in magnezija v vodi zamenja z natrijevimi ali vodikovimi ioni"],
    ["kisli dež", "Padavine s kislinami, ki nastanejo iz žveplovega dioksida in dušikovih oksidov"],
    ["učinek tople grede", "Zadrževanje toplotnega sevanja Zemlje zaradi ogljikovega dioksida, metana in vodne pare"],
    ["evtrofikacija", "Čezmerna rast alg v vodi zaradi nitratov in fosfatov iz gnojil"],
    ["parni reforming", "Industrijsko pridobivanje vodika iz metana in vodne pare"],
    ["alotropija", "Pojav, ko element obstaja v več oblikah z različno zgradbo, na primer diamant in grafit"],
  ],
  kovine_pm: [
    ["žgano apno", "Kalcijev oksid, ki nastane pri žganju apnenca"],
    ["gašeno apno", "Kalcijev hidroksid, ki nastane iz kalcijevega oksida in vode"],
    ["plavž", "Peč, v kateri železovo rudo reduciramo z ogljikovim oksidom"],
    ["grodelj", "Železo iz plavža z okoli 4 % ogljika, ki je trdo in krhko"],
    ["jeklo", "Zlitina železa z manj kot 2 % ogljika, ki je trdna in kovna"],
    ["kapnik", "Tvorba iz kalcijevega karbonata, ki se izloča iz vode v kraških jamah"],
    ["zemljoalkalijske kovine", "Elementi 2. skupine periodnega sistema z dvema valenčnima elektronoma"],
    ["amfoternost", "Lastnost snovi, da reagira s kislinami in z bazami"],
  ],
};

POJMI.biomolekule_pm = [
  ["monosaharid", "Najenostavnejši ogljikov hidrat, ki ga ne moremo razgraditi v manjše saharide, na primer glukoza"],
  ["disaharid", "Ogljikov hidrat iz dveh monosaharidnih enot, povezanih z glikozidno vezjo"],
  ["polisaharid", "Ogljikov hidrat iz velikega števila monosaharidnih enot, na primer škrob ali celuloza"],
  ["glikozidna vez", "Vez med monosaharidnima enotama prek kisikovega atoma"],
  ["aldoza", "Monosaharid z aldehidno skupino, na primer glukoza"],
  ["ketoza", "Monosaharid s keto skupino, na primer fruktoza"],
  ["umiljenje", "Bazična hidroliza maščobe, pri kateri nastaneta glicerol in milo"],
  ["peptidna vez", "Amidna vez med karboksilno skupino ene in amino skupino druge aminokisline"],
  ["denaturacija", "Porušenje prostorske zgradbe beljakovine zaradi toplote, kislin ali težkih kovin"],
  ["jodovica", "Reagent, ki se ob škrobu obarva temno modro"],
  ["esencialna aminokislina", "Aminokislina, ki je telo ne more sintetizirati in jo moramo dobiti s hrano"],
  ["neumiljivi lipidi", "Lipidi, ki ne vsebujejo estrske vezi in jih ne moremo umiliti, na primer steroidi"],
];

// Anorganska nomenklatura: [formula, ime]
const SPOJINE = [
  ["NaCl", "natrijev klorid"], ["CaCO<sub>3</sub>", "kalcijev karbonat"], ["KNO<sub>3</sub>", "kalijev nitrat"], ["Na<sub>2</sub>SO<sub>4</sub>", "natrijev sulfat"],
  ["Na<sub>2</sub>SO<sub>3</sub>", "natrijev sulfit"], ["KNO<sub>2</sub>", "kalijev nitrit"], ["NH<sub>4</sub>Cl", "amonijev klorid"], ["NaHCO<sub>3</sub>", "natrijev hidrogenkarbonat"],
  ["Ca(OH)<sub>2</sub>", "kalcijev hidroksid"], ["Al<sub>2</sub>O<sub>3</sub>", "aluminijev oksid"], ["FeCl<sub>3</sub>", "železov(III) klorid"], ["FeSO<sub>4</sub>", "železov(II) sulfat"],
  ["CuO", "bakrov(II) oksid"], ["Cu<sub>2</sub>O", "bakrov(I) oksid"], ["SO<sub>2</sub>", "žveplov dioksid"], ["SO<sub>3</sub>", "žveplov trioksid"],
  ["N<sub>2</sub>O<sub>5</sub>", "didušikov pentoksid"], ["P<sub>4</sub>O<sub>10</sub>", "tetrafosforjev dekaoksid"], ["CO", "ogljikov oksid"], ["CCl<sub>4</sub>", "ogljikov tetraklorid"],
  ["H<sub>2</sub>SO<sub>4</sub>", "žveplova(VI) kislina"], ["HNO<sub>3</sub>", "dušikova(V) kislina"], ["H<sub>3</sub>PO<sub>4</sub>", "fosforjeva(V) kislina"], ["HClO<sub>4</sub>", "klorova(VII) kislina"],
  ["KMnO<sub>4</sub>", "kalijev manganat(VII)"], ["K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>", "kalijev dikromat(VI)"], ["Mg<sub>3</sub>N<sub>2</sub>", "magnezijev nitrid"], ["Na<sub>3</sub>PO<sub>4</sub>", "natrijev fosfat"],
  ["CaSO<sub>4</sub>", "kalcijev sulfat"], ["PbI<sub>2</sub>", "svinčev(II) jodid"], ["MnO<sub>2</sub>", "manganov(IV) oksid"], ["NaClO", "natrijev klorat(I)"],
];
// [delec, element, oksidacijsko število]
const OKS = [
  ["SO<sub>4</sub><sup>2−</sup>", "S", 6], ["NO<sub>3</sub><sup>−</sup>", "N", 5], ["NH<sub>4</sub><sup>+</sup>", "N", -3], ["Cr<sub>2</sub>O<sub>7</sub><sup>2−</sup>", "Cr", 6],
  ["MnO<sub>4</sub><sup>−</sup>", "Mn", 7], ["H<sub>2</sub>O<sub>2</sub>", "O", -1], ["ClO<sub>3</sub><sup>−</sup>", "Cl", 5], ["PO<sub>4</sub><sup>3−</sup>", "P", 5],
  ["Fe<sub>2</sub>O<sub>3</sub>", "Fe", 3], ["SO<sub>3</sub><sup>2−</sup>", "S", 4], ["NO<sub>2</sub><sup>−</sup>", "N", 3], ["CO<sub>3</sub><sup>2−</sup>", "C", 4],
];

function nomenklatura(z) {
  const r = rng("poklicna_kemija-nomenklatura");
  const drugi = (i, k) => r.premesaj(SPOJINE.map((_, j) => j).filter((j) => j !== i)).slice(0, k);
  SPOJINE.forEach(([f, ime], i) => {
    z.dodaj("anorganska_nomenklatura", izbira({ r, tezavnost: 1, besedilo: `Kako se imenuje spojina ${f}?`, pravilna: ime, napacne: drugi(i, 3).map((j) => SPOJINE[j][1]), postopek: `<p>${f} je <strong>${ime}</strong>.</p>` }));
    z.dodaj("anorganska_nomenklatura", izbira({ r, tezavnost: 2, besedilo: `Katera formula pripada spojini <strong>${ime}</strong>?`, pravilna: f, napacne: drugi(i, 3).map((j) => SPOJINE[j][0]), postopek: `<p>${ime}: ${f}.</p>` }));
  });
  for (const [d, el, ox] of OKS)
    z.dodaj("anorganska_nomenklatura", kolicina({ tezavnost: 2, besedilo: `Določi oksidacijsko število elementa ${el} v delcu ${d}. Vpiši celo število (s predznakom, če je negativno).`, vrednost: ox, tol: 0,
      rezultat: `${ox > 0 ? "+" : ""}${T(ox)}`, postopek: `<p>Vsota oksidacijskih števil je enaka naboju delca (kisik −2, vodik +1, razen v peroksidih). Za ${el} v ${d} dobimo <strong>${ox > 0 ? "+" : ""}${T(ox)}</strong>.</p>` }));
}

// Računanje z raztopinami: redčenje, mešanje, priprava, pretvorba w in ρ v c
const SNOVI_M = [["NaCl", 58.5], ["NaOH", 40.0], ["KNO<sub>3</sub>", 101.1], ["CuSO<sub>4</sub>", 159.6], ["glukoze (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>)", 180.2], ["KCl", 74.6]];
function raztopine(z) {
  const r = rng("poklicna_kemija-raztopine");
  for (let i = 0; i < 6; i++) {
    const c1 = r.izberi([1.0, 2.0, 2.5, 5.0, 6.0]), c2 = r.izberi([0.10, 0.20, 0.25, 0.50]), V2 = r.izberi([100, 250, 500, 1000]);
    const V1 = (c2 * V2) / c1;
    z.dodaj("racunanje_raztopine", kolicina({ tezavnost: 2, enota: "mL", vrednost: V1,
      besedilo: `Koliko mL raztopine HCl s koncentracijo ${T(c1)} mol/L potrebujemo za pripravo ${V2} mL raztopine s koncentracijo ${T(c2)} mol/L?`,
      rezultat: `${T(V1)} mL`, postopek: `<p>Pri redčenju se množina HCl ne spremeni: c<sub>1</sub>V<sub>1</sub> = c<sub>2</sub>V<sub>2</sub>.</p><p>V<sub>1</sub> = ${T(c2)} · ${V2} mL / ${T(c1)} = <strong>${T(V1)} mL</strong>.</p>` }));
  }
  for (let i = 0; i < 6; i++) {
    const [s, M] = SNOVI_M[i], c = r.izberi([0.10, 0.20, 0.25, 0.50, 1.0]), V = r.izberi([100, 250, 500]);
    const m = c * (V / 1000) * M;
    z.dodaj("racunanje_raztopine", kolicina({ tezavnost: 2, enota: "g", vrednost: m,
      besedilo: `Koliko gramov ${s} potrebujemo za pripravo ${V} mL raztopine s koncentracijo ${T(c)} mol/L? (M = ${T(M)} g/mol)`,
      rezultat: `${T(m, 2)} g`, postopek: `<p>n = c · V = ${T(c)} mol/L · ${T(V / 1000)} L = ${T(c * V / 1000, 4)} mol</p><p>m = n · M = ${T(c * V / 1000, 4)} mol · ${T(M)} g/mol = <strong>${T(m, 2)} g</strong></p><p>Snov natehtamo, raztopimo in v merilni bučki dopolnimo z vodo do oznake.</p>` }));
  }
  for (let i = 0; i < 6; i++) {
    const m1 = r.izberi([100, 150, 200, 250]), w1 = r.izberi([5, 10, 15]), m2 = r.izberi([100, 200, 300]), w2 = r.izberi([20, 25, 30, 40]);
    const w = ((m1 * w1 + m2 * w2) / (m1 + m2));
    z.dodaj("racunanje_raztopine", kolicina({ tezavnost: 3, enota: "%", vrednost: w,
      besedilo: `Zmešamo ${m1} g ${w1}-odstotne in ${m2} g ${w2}-odstotne raztopine NaOH. Kolikšen je masni delež NaOH v nastali raztopini (v %)?`,
      rezultat: `${T(w, 1)} %`, postopek: `<p>m(NaOH) = ${m1} · ${T(w1 / 100)} + ${m2} · ${T(w2 / 100)} = ${T((m1 * w1 + m2 * w2) / 100)} g; m(raztopine) = ${m1 + m2} g.</p><p>w = ${T((m1 * w1 + m2 * w2) / 100)} g / ${m1 + m2} g = <strong>${T(w, 1)} %</strong></p>` }));
  }
  const KONC = [["H<sub>2</sub>SO<sub>4</sub>", 96, 1.84, 98.1], ["HCl", 37, 1.19, 36.5], ["HNO<sub>3</sub>", 65, 1.40, 63.0], ["NH<sub>3</sub>", 25, 0.91, 17.0], ["H<sub>3</sub>PO<sub>4</sub>", 85, 1.69, 98.0], ["CH<sub>3</sub>COOH", 99, 1.05, 60.1]];
  for (const [s, w, rho, M] of KONC) {
    const c = (w / 100) * rho * 1000 / M;
    z.dodaj("racunanje_raztopine", kolicina({ tezavnost: 3, enota: "mol/L", vrednost: c,
      besedilo: `Koncentrirana raztopina ${s} ima masni delež ${w} % in gostoto ${T(rho)} g/mL. Izračunaj njeno množinsko koncentracijo. (M = ${T(M)} g/mol)`,
      rezultat: `${T(c, 1)} mol/L`, postopek: `<p>Vzamemo 1 L: m(raztopine) = 1000 mL · ${T(rho)} g/mL = ${T(rho * 1000)} g; m(${s}) = ${T(w / 100)} · ${T(rho * 1000)} g = ${T(w / 100 * rho * 1000, 1)} g.</p><p>c = n/V = ${T(w / 100 * rho * 1000, 1)} g / ${T(M)} g/mol / 1 L = <strong>${T(c, 1)} mol/L</strong></p>` }));
  }
}

export default async function (z) {
  nomenklatura(z);
  raztopine(z);
  for (const [slug, seznam] of Object.entries(POJMI)) pojmovnik(z, slug, seznam, { uvod: "pojem" });
  const uporabljene = new Set();
  const besedila = new Map();
  for (const [slug, poglavje, pravilo] of PRAVILA) {
    for (const n of SM) {
      if (n.poglavje !== poglavje || uporabljene.has(n.id)) continue;
      if (pravilo && !pravilo.test(`${n.besedilo} ${n.rezultat}`)) continue;
      uporabljene.add(n.id);
      const videne = besedila.get(slug) ?? new Set();
      besedila.set(slug, videne);
      if (videne.has(n.besedilo)) continue;
      videne.add(n.besedilo);
      const { id, predmet, poglavje: _p, raven, ...ostalo } = n;
      z.dodaj(slug, { ...ostalo, raven: "osnovna" });
    }
  }
}
