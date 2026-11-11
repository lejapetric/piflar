import { izbira, kolicina, T, L } from "../lib.mjs";

const SK = ["A", "B", "AB", "0"];
const sprejme = (pr, da) => da === "0" || pr === "AB" || pr === da;

export default function ({ serija, pojmi, vprasanja }) {
  serija("transfuzija", 10, (r) => {
    const pr = r.izberi(SK), da = r.izberi(SK), ok = sprejme(pr, da);
    return izbira({ r, tezavnost: 2, besedilo: `Ali lahko prejemnik s krvno skupino ${pr} prejme rdeče krvničke darovalca s skupino ${da} (Rh ni pomemben)?`, pravilna: ok ? "Da" : "Ne", napacne: [ok ? "Ne" : "Da"], postopek: `<p>Prejemnik ${pr} ima protitelesa ${{ A: "anti-B", B: "anti-A", AB: "nobena", 0: "anti-A in anti-B" }[pr]}; darovalec ${da} ima antigene ${{ A: "A", B: "B", AB: "A in B", 0: "nobenih" }[da]}. ${ok ? "Transfuzija je mogoča." : "Pride do zlepljanja (aglutinacije)."}</p>` });
  });
  serija("protitelesa", 6, (r) => {
    const s = r.izberi(SK), odg = { A: "anti-B", B: "anti-A", AB: "nobenih", 0: "anti-A in anti-B" }[s];
    return izbira({ r, tezavnost: 2, besedilo: `Katera protitelesa sistema AB0 ima v plazmi človek s krvno skupino ${s}?`, pravilna: odg, napacne: ["anti-B", "anti-A", "nobenih", "anti-A in anti-B"].filter((x) => x !== odg), postopek: `<p>V plazmi so protitelesa proti antigenom, ki jih na krvničkah ni: ${odg}.</p>` });
  });
  serija("celice", 8, (r) => {
    const [c, f] = r.izberi([["eritrociti", "prenos kisika"], ["trombociti", "strjevanje krvi"], ["limfociti B", "izdelava protiteles"], ["citotoksični limfociti T", "uničevanje okuženih celic"], ["makrofagi", "fagocitoza in predstavljanje antigenov"], ["celice pomagalke T", "aktivacija limfocitov B in T"], ["spominske celice", "hiter odziv ob ponovni okužbi"], ["plazmatke", "izločanje velikih količin protiteles"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katere celice imajo nalogo: ${f}?`, pravilna: c, napacne: r.premesaj(["eritrociti", "trombociti", "limfociti B", "citotoksični limfociti T", "makrofagi", "celice pomagalke T", "spominske celice", "plazmatke"].filter((x) => x !== c)).slice(0, 3), postopek: `<p>${c.charAt(0).toUpperCase() + c.slice(1)}: ${f}.</p>` });
  });
  serija("srce", 7, (r, i) => {
    const f = r.int(50, 100), V = r.int(55, 90);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (f * V) / 1000, tol: 0.01, enota: "L/min", besedilo: `Srčna frekvenca je ${f} utripov/min, utripni volumen ${V} mL. Kolikšen je minutni volumen srca?`, rezultat: `${T((f * V) / 1000, 2)} L/min`, postopek: `<p>\\(MV = f \\cdot V_u = ${f} \\cdot ${V}\\ \\text{mL} = ${f * V}\\ \\text{mL} \\approx ${L((f * V) / 1000, 2)}\\ \\text{L/min}\\)</p>` });
    const ure = r.int(1, 24), n = f * 60 * ure;
    return kolicina({ tezavnost: 1, vrednost: n, enota: "", besedilo: `Kolikokrat udari srce v ${ure} h pri frekvenci ${f} utripov na minuto?`, rezultat: `${n}`, postopek: `<p>\\(${f} \\cdot 60 \\cdot ${ure} = ${n}\\)</p>` });
  });
  serija("hematokrit", 4, (r) => {
    const V = r.int(4, 6) * 1000 + r.int(0, 9) * 100, h = r.int(38, 52), Ve = (V * h) / 100;
    return kolicina({ tezavnost: 3, vrednost: Ve, tol: 0.01, enota: "mL", besedilo: `Človek ima ${V} mL krvi in hematokrit ${h} %. Koliko mL krvi predstavljajo krvne celice?`, rezultat: `${T(Ve, 0)} mL`, postopek: `<p>\\(${V} \\cdot ${L(h / 100, 2)} = ${L(Ve, 0)}\\) mL</p>` });
  });
  serija("rh", 4, (r) => {
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: "Rh-negativna mati nosi drugega Rh-pozitivnega otroka; pri prvem porodu ni prejela anti-D zaščite. Kaj grozi drugemu otroku?", pravilna: "materina protitelesa anti-D prehajajo skozi posteljico in razgrajujejo otrokove eritrocite", napacne: ["otrok bo Rh-negativen", "mati bo zbolela za anemijo", "nevarnosti ni, ker je mati Rh-negativna"], postopek: "<p>Pri prvem porodu se mati senzibilizira, pri drugem njena protitelesa IgG prehajajo skozi posteljico (fetalna eritroblastoza).</p>" });
  });
  pojmi([
    ["antigen", "Snov, ki sproži nastanek protiteles."],
    ["protitelo", "Beljakovina, ki jo izdelajo limfociti B in se specifično veže na antigen."],
    ["aktivna imunizacija", "Pridobitev imunosti po okužbi ali cepljenju, ko telo samo izdela protitelesa."],
    ["pasivna imunizacija", "Pridobitev že izdelanih protiteles, npr. z materinim mlekom ali serumom."],
    ["cepivo", "Pripravek oslabljenih ali delov povzročiteljev, ki sproži imunski odziv."],
    ["fagocitoza", "Požiranje delcev ali mikrobov z belimi krvničkami."],
    ["vnetje", "Nespecifični obrambni odziv z rdečino, otekanjem, toploto in bolečino."],
    ["alergija", "Pretiran imunski odziv na neškodljivo snov."],
    ["avtoimunska bolezen", "Bolezen, pri kateri imunski sistem napada lastne celice."],
    ["hemoglobin", "Beljakovina z železom v eritrocitih, ki veže kisik."],
    ["krvna plazma", "Tekoči del krvi."],
    ["limfa", "Tekočina v limfnih žilah, ki se vrača v kri."],
    ["fibrin", "Beljakovinska vlakna, ki ob strjevanju tvorijo strdek."],
  ]);
  vprasanja([
    [3, "Zakaj je krvna skupina 0 Rh− »univerzalni darovalec«?", "ker eritrociti nimajo antigenov A, B in D", ["ker ima plazma vsa protitelesa", "ker ima največ hemoglobina", "ker je najpogostejša"], "Brez antigenov ne pride do aglutinacije pri prejemniku."],
    [4, "Zakaj je drugi imunski odziv na isti antigen hitrejši in močnejši?", "zaradi spominskih limfocitov", ["ker se antigen spremeni", "ker je več eritrocitov", "ker se poveča število trombocitov"], "Spominske celice B in T ob ponovni okužbi hitro sprožijo odziv.", "visja"],
    [4, "Zakaj okužba s HIV oslabi celoten pridobljeni imunski odziv?", "ker virus uničuje celice pomagalke T (CD4)", ["ker uničuje eritrocite", "ker uniči kostni mozeg", "ker okuži le makrofage"], "Brez celic pomagalk se limfociti B in T slabo aktivirajo.", "visja"],
    [4, "Zakaj so protitelesa specifična?", "zaradi variabilnega dela, ki se prilega določenemu epitopu", ["ker so iz ogljikovih hidratov", "ker vsa vežejo vse antigene", "ker jih izdelujejo eritrociti"], "Variabilni del lahkih in težkih verig tvori vezavno mesto.", "visja"],
    [2, "Kje nastajajo krvne celice pri odraslem človeku?", "v rdečem kostnem mozgu", ["v jetrih", "v vranici", "v srcu"], "Hematopoeza poteka v rdečem kostnem mozgu ploščatih kosti."],
  ]);
}
