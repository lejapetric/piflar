import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("ventilacija", 8, (r, i) => {
    const f = r.int(10, 30), V = r.int(4, 8) * 100 + r.int(0, 9) * 10;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (f * V) / 1000, tol: 0.01, enota: "L/min", besedilo: `Frekvenca dihanja je ${f}/min, dihalni volumen ${V} mL. Kolikšna je minutna ventilacija?`, rezultat: `${T((f * V) / 1000, 2)} L/min`, postopek: `<p>\\(${f} \\cdot ${V}\\ \\text{mL} = ${f * V}\\ \\text{mL/min} \\approx ${L((f * V) / 1000, 2)}\\ \\text{L/min}\\)</p>` });
    const mrtvi = 150, a = (f * (V - mrtvi)) / 1000;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: a, tol: 0.01, enota: "L/min", besedilo: `Frekvenca dihanja je ${f}/min, dihalni volumen ${V} mL, mrtvi prostor 150 mL. Kolikšna je alveolarna ventilacija?`, rezultat: `${T(a, 2)} L/min`, postopek: `<p>\\(f \\cdot (V_D - V_{mrtvi}) = ${f} \\cdot (${V} - 150) = ${f * (V - mrtvi)}\\ \\text{mL/min}\\)</p>` });
  });
  serija("vitalna", 5, (r) => {
    const dv = r.int(4, 6) * 100, irv = r.int(20, 33) * 100, erv = r.int(9, 13) * 100, VK = dv + irv + erv;
    return kolicina({ tezavnost: 3, vrednost: VK, enota: "mL", besedilo: `Dihalni volumen je ${dv} mL, inspiratorni rezervni volumen ${irv} mL in ekspiratorni rezervni volumen ${erv} mL. Kolikšna je vitalna kapaciteta?`, rezultat: `${VK} mL`, postopek: `<p>\\(VK = ${dv} + ${irv} + ${erv} = ${VK}\\) mL</p>` });
  });
  serija("organ", 10, (r) => {
    const [o, f] = r.izberi([["želodec", "razgradnja beljakovin s pepsinom v kislem okolju"], ["tanko črevo", "končna prebava in vsrkavanje hranil"], ["debelo črevo", "vsrkavanje vode"], ["jetra", "izdelava žolča"], ["trebušna slinavka", "izločanje prebavnih encimov in hormonov"], ["ustna votlina", "začetek prebave škroba z amilazo"], ["ledvica", "filtracija krvi in nastanek seča"], ["pljučni mehurčki (alveole)", "izmenjava plinov"], ["Henlejeva zanka", "koncentriranje seča"], ["glomerul", "filtracija krvne plazme"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri organ ali del organa ima nalogo: ${f}?`, pravilna: o, napacne: r.premesaj(["želodec", "tanko črevo", "debelo črevo", "jetra", "trebušna slinavka", "ustna votlina", "ledvica", "pljučni mehurčki (alveole)", "Henlejeva zanka", "glomerul"].filter((x) => x !== o)).slice(0, 3), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${f}.</p>` });
  });
  serija("hranila", 6, (r) => {
    const [h, odg] = r.izberi([["škrob", "glukoza"], ["beljakovine", "aminokisline"], ["maščobe", "glicerol in maščobne kisline"], ["saharoza", "glukoza in fruktoza"], ["laktoza", "glukoza in galaktoza"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V kaj se pri prebavi razgradijo ${h}?`, pravilna: odg, napacne: ["glukoza", "aminokisline", "glicerol in maščobne kisline", "glukoza in fruktoza", "glukoza in galaktoza"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${h.charAt(0).toUpperCase() + h.slice(1)} → ${odg}.</p>` });
  });
  serija("filtracija", 5, (r) => {
    const gfr = r.int(100, 130), dni = r.int(1, 7), Lf = (gfr * 60 * 24 * dni) / 1000;
    return kolicina({ tezavnost: 3, vrednost: Lf, tol: 0.01, enota: "L", besedilo: `Hitrost glomerulne filtracije je ${gfr} mL/min. Koliko litrov primarnega seča nastane v ${dni} ${dni === 1 ? "dnevu" : "dneh"}?`, rezultat: `${T(Lf, 0)} L`, postopek: `<p>\\(${gfr}\\ \\text{mL/min} \\cdot 1440\\ \\text{min} \\cdot ${dni} \\approx ${L(Lf, 0)}\\ \\text{L}\\)</p><p>Večina (≈ 99 %) se vrne v kri.</p>` });
  });
  pojmi([
    ["alveola", "Pljučni mešiček, kjer poteka izmenjava plinov."],
    ["prepona", "Mišica, ki loči prsno in trebušno votlino in sodeluje pri vdihu."],
    ["vitalna kapaciteta", "Največja prostornina zraka, ki jo izdihnemo po največjem vdihu."],
    ["peristaltika", "Valovito krčenje mišic prebavne cevi, ki potiska hrano."],
    ["črevesne resice", "Izrastki sluznice tankega črevesa, ki povečajo površino vsrkavanja."],
    ["žolč", "Izloček jeter, ki emulgira maščobe."],
    ["nefron", "Osnovna enota ledvice, ki filtrira kri."],
    ["primarni seč", "Filtrat krvne plazme v Bowmanovi ovojnici."],
    ["sečnina", "Dušikov odpadni produkt razgradnje aminokislin pri sesalcih."],
    ["ADH (antidiuretični hormon)", "Hormon, ki poveča vračanje vode v ledvicah.", { brezVpisa: true }],
    ["dializa", "Umetno čiščenje krvi pri odpovedi ledvic."],
    ["emulgacija", "Razbijanje maščob v drobne kapljice."],
    ["osmoregulacija", "Uravnavanje vode in soli v telesu."],
  ]);
  vprasanja([
    [3, "Zakaj kisik prehaja iz alveol v kri?", "ker je parcialni tlak kisika v alveolah višji kot v krvi", ["ker ga črpa srce", "zaradi aktivnega transporta", "ker je kri bolj kisla"], "Plini prehajajo z difuzijo po gradientu parcialnega tlaka."],
    [4, "Zakaj ima sladkorni bolnik z visoko glukozo glukozo v seču?", "ker presežena prenašalna zmogljivost tubulov ne vrne vse glukoze", ["ker glomerul ne filtrira glukoze", "ker jetra izločajo glukozo v seč", "ker inzulin razgrajuje ledvice"], "Nad ledvičnim pragom (≈ 10 mmol/L) se glukoza ne vrne v celoti.", "visja"],
    [4, "Kateri dejavnik najmočneje spodbuja dihalni center?", "povišana koncentracija CO₂ v krvi", ["znižana koncentracija CO₂", "povišan krvni tlak", "nizka telesna temperatura"], "CO₂ zniža pH, kar zaznajo kemoreceptorji.", "visja"],
    [4, "Zakaj puščavske živali izločajo zelo koncentriran seč?", "ker imajo zelo dolge Henlejeve zanke", ["ker nimajo ledvic", "ker ne izločajo sečnine", "ker pijejo morsko vodo"], "Daljša zanka ustvari večji osmotski gradient v sredici.", "visja"],
    [2, "Kje se vsrka največ hranil?", "v tankem črevesu", ["v želodcu", "v debelem črevesu", "v požiralniku"], "Resice in mikroresice močno povečajo površino."],
  ]);
}
