import { kolicina, izbira, besedilo, T } from "../lib.mjs";

const KOMP = { A: "T", T: "A", G: "C", C: "G" }, RKOMP = { A: "U", T: "A", G: "C", C: "G" };
const KOD = { AUG: "Met", UUU: "Phe", UUC: "Phe", GGC: "Gly", GGA: "Gly", GCU: "Ala", GCC: "Ala", AAA: "Lys", AAG: "Lys", UGG: "Trp", CAU: "His", CAC: "His", GAA: "Glu", GAU: "Asp", UCU: "Ser", CCC: "Pro", ACU: "Thr", GUU: "Val", CUG: "Leu", UAU: "Tyr", UGU: "Cys", CGU: "Arg", AAU: "Asn", CAA: "Gln", AUU: "Ile" };
const STOP = ["UAA", "UAG", "UGA"];
const KODONI = Object.keys(KOD);

export default function ({ serija, pojmi, vprasanja }) {
  serija("komplementarna", 8, (r, i) => {
    const s = Array.from({ length: r.int(6, 10) }, () => r.izberi("ATGC".split(""))).join("");
    const k = [...s].map((c) => KOMP[c]).join("");
    return besedilo({ tezavnost: 1, sprejemljivi: [k], besedilo: `Zapiši komplementarno verigo DNA k verigi 5'-${s}-3' (v smeri 3' → 5', samo črke).`, rezultat: `3'-${k}-5'`, postopek: `<p>Pari baz: A–T, G–C. ${s} → ${k}.</p>` });
  });
  serija("mrna", 8, (r) => {
    const s = Array.from({ length: r.int(6, 12) }, () => r.izberi("ATGC".split(""))).join("");
    const m = [...s].map((c) => RKOMP[c]).join("");
    return besedilo({ tezavnost: 2, sprejemljivi: [m], besedilo: `Matrična veriga DNA je 3'-${s}-5'. Zapiši mRNA, ki nastane s prepisovanjem (5' → 3', samo črke).`, rezultat: `5'-${m}-3'`, postopek: `<p>Pri prepisovanju se nasproti A vgradi U, nasproti T A, nasproti G C in nasproti C G: ${m}.</p>` });
  });
  serija("chargaff", 6, (r, i) => {
    const a = r.int(10, 40), g = 50 - a, kaj = r.izberi(["T", "G", "C"]);
    const v = kaj === "T" ? a : g;
    return kolicina({ tezavnost: 2, vrednost: v, enota: "%", besedilo: `V dvoverižni DNA je ${a} % adenina. Koliko odstotkov je ${{ T: "timina", G: "gvanina", C: "citozina" }[kaj]}?`, rezultat: `${v} %`, postopek: `<p>Chargaffovo pravilo: A = T in G = C. A + T = ${2 * a} %, G + C = ${100 - 2 * a} %, torej G = C = ${g} %.</p>` });
  });
  serija("prevajanje", 8, (r) => {
    const n = r.int(2, 4), kod = Array.from({ length: n }, () => r.izberi(KODONI));
    const m = "AUG" + kod.join("") + r.izberi(STOP);
    const ak = ["Met", ...kod.map((k) => KOD[k])].join("–");
    return besedilo({ tezavnost: 3, sprejemljivi: [ak, ak.replace(/–/g, "-"), ak.replace(/–/g, " "), ak.replace(/–/g, ", ")], besedilo: `Prevedi mRNA 5'-${m}-3' v zaporedje aminokislin. (Kodoni: ${[...new Set(["AUG", ...kod])].map((k) => `${k} = ${KOD[k]}`).join(", ")}; ${STOP.join(", ")} = stop.) Zapiši okrajšave, ločene s pomišljajem.`, rezultat: ak, postopek: `<p>Beremo po tri baze od začetnega kodona AUG do stop kodona: ${["AUG", ...kod].join(" | ")} | stop.</p><p>${ak}</p>` });
  });
  serija("stevilo", 6, (r, i) => {
    const n = r.int(50, 600);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: 3 * n + 3, enota: "", besedilo: `Beljakovina ima ${n} aminokislin. Koliko nukleotidov ima najmanj zapis v mRNA (s stop kodonom, brez neprevedenih regij)?`, rezultat: `${3 * n + 3}`, postopek: `<p>Vsako aminokislino določa kodon iz 3 nukleotidov, dodamo stop kodon: \\(3 \\cdot ${n} + 3 = ${3 * n + 3}\\).</p>` });
    return kolicina({ tezavnost: 2, vrednost: n, enota: "", besedilo: `Kodirajoči del mRNA (od AUG do stop kodona, vključno z njim) ima ${3 * n + 3} nukleotidov. Koliko aminokislin ima nastali polipeptid?`, rezultat: `${n}`, postopek: `<p>\\(\\frac{${3 * n + 3}}{3} = ${n + 1}\\) kodonov, eden je stop: ${n} aminokislin.</p>` });
  });
  serija("antikodon", 5, (r) => {
    const k = r.izberi(KODONI), ak = [...k].map((c) => ({ A: "U", U: "A", G: "C", C: "G" }[c])).join("");
    return besedilo({ tezavnost: 3, sprejemljivi: [ak], besedilo: `Kateri antikodon tRNA se pari s kodonom ${k} na mRNA? (Samo črke, v smeri 3' → 5'.)`, rezultat: ak, postopek: `<p>Antikodon je komplementaren kodonu: ${k} ↔ ${ak}.</p>` });
  });
  serija("mutacija", 4, (r) => {
    const [opis, odg] = r.izberi([["kodon UGG se spremeni v UGA", "nesmiselna mutacija (prezgodnji stop)"], ["kodon GAA se spremeni v GAU", "missense mutacija (druga aminokislina)"], ["kodon GGC se spremeni v GGA", "tiha mutacija (ista aminokislina)"], ["v gen se vstavi en nukleotid", "premik bralnega okvirja"]]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kakšna mutacija je, če ${opis}?`, pravilna: odg, napacne: ["nesmiselna mutacija (prezgodnji stop)", "missense mutacija (druga aminokislina)", "tiha mutacija (ista aminokislina)", "premik bralnega okvirja"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}. (GGC in GGA kodirata Gly; GAA Glu, GAU Asp; UGA je stop.)</p>` });
  });
  pojmi([
    ["DNA", "Deoksiribonukleinska kislina, dvoverižna molekula, ki nosi dedni zapis."],
    ["RNA", "Ribonukleinska kislina, običajno enoverižna, z ribozo in uracilom."],
    ["nukleotid", "Gradnik nukleinskih kislin iz sladkorja, fosfatne skupine in dušikove baze."],
    ["podvojevanje DNA", "Semikonservativno nastajanje dveh enakih molekul DNA iz ene.", { brezVpisa: true }],
    ["prepisovanje", "Sinteza mRNA po zapisu na DNA (transkripcija)."],
    ["prevajanje", "Sinteza beljakovine po zapisu na mRNA na ribosomu (translacija)."],
    ["kodon", "Zaporedje treh nukleotidov na mRNA, ki določa aminokislino ali stop."],
    ["genetski kod", "Pravila, po katerih zaporedje kodonov določa zaporedje aminokislin."],
    ["intron", "Nekodirajoči odsek gena, ki se iz pre-mRNA izreže."],
    ["ekson", "Odsek gena, ki ostane v zreli mRNA in se prevede."],
    ["DNA-polimeraza", "Encim, ki pri podvojevanju dodaja nukleotide novi verigi."],
    ["ribosom", "Celični organel, na katerem poteka sinteza beljakovin."],
  ]);
}
