import { kolicina, izbira, T } from "../lib.mjs";
const NV = [["celinka", 4], ["polovinka", 2], ["četrtinka", 1], ["osminka", 0.5], ["šestnajstinka", 0.25], ["polovinka s piko", 3], ["četrtinka s piko", 1.5], ["osminka s piko", 0.75]];
const TEMPO = [["largo", "zelo počasi, široko"], ["adagio", "počasi"], ["andante", "zmerno počasi, v hoji"], ["moderato", "zmerno"], ["allegro", "hitro"], ["presto", "zelo hitro"], ["accelerando", "pospešujoče"], ["ritardando", "upočasnjujoče"]];
const DIN = [["pp", "pianissimo, zelo tiho"], ["p", "piano, tiho"], ["mp", "mezzopiano, srednje tiho"], ["mf", "mezzoforte, srednje glasno"], ["f", "forte, glasno"], ["ff", "fortissimo, zelo glasno"], ["crescendo", "postopno glasneje"], ["decrescendo", "postopno tiše"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("trajanje", 24, (r, i) => {
    if (i % 3 === 2) {
      const k = r.int(2, 4), sk = Array.from({ length: k }, () => r.izberi(NV)), s = sk.reduce((a, [, v]) => a + v, 0);
      return kolicina({ tezavnost: 3, vrednost: s, tol: 0.001, enota: "dob", besedilo: `Koliko četrtinskih dob skupaj trajajo: ${sk.map(([n]) => n).join(" + ")}?`, rezultat: T(s, 2), postopek: `<p>${sk.map(([n, v]) => `${n} = ${T(v, 2)}`).join(", ")}; skupaj ${T(s, 2)}.</p>` });
    }
    const [n, v] = r.izberi(NV), [m, mv] = r.izberi(NV.filter(([x]) => x !== n && !x.includes("pika")));
    if (i % 3 === 1) return kolicina({ tezavnost: 2, vrednost: v / mv, tol: 0.001, enota: "", besedilo: `Koliko not z vrednostjo <em>${m}</em> traja enako kot ena <em>${n}</em>?`, rezultat: T(v / mv, 2), postopek: `<p>${n} = ${T(v, 2)} dobe, ${m} = ${T(mv, 2)} dobe; \\(${T(v, 2)} : ${T(mv, 2)} = ${T(v / mv, 2)}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: v, tol: 0.001, enota: "dob", besedilo: `Koliko četrtinskih dob traja <em>${n}</em>?`, rezultat: T(v, 2), postopek: `<p>${n} = ${T(v, 2)} četrtinske dobe. Pika podaljša noto za polovico njene vrednosti.</p>` });
  });
  serija("takt", 10, (r, i) => {
    const [t, d] = r.izberi([["2/4", 2], ["3/4", 3], ["4/4", 4], ["6/8", 3], ["3/8", 1.5]]), [n, v] = r.izberi(NV.filter(([, x]) => x <= d));
    return kolicina({ tezavnost: 3, vrednost: d / v, tol: 0.001, enota: "", besedilo: `Koliko not z vrednostjo <em>${n}</em> zapolni en takt v taktovskem načinu ${t}?`, rezultat: T(d / v, 2), postopek: `<p>Takt ${t} traja ${T(d, 2)} četrtinske dobe; \\(${T(d, 2)} : ${T(v, 2)} = ${T(d / v, 2)}\\)</p>` });
  });
  serija("tempo", 8, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Kaj pomeni tempovna oznaka <em>${TEMPO[i][0]}</em>?`, pravilna: TEMPO[i][1], napacne: r.premesaj(TEMPO.filter((_, j) => j !== i).map(([, y]) => y)).slice(0, 3), postopek: `<p>${TEMPO[i][0]}: ${TEMPO[i][1]}.</p>` }));
  serija("dinamika", 8, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Kaj pomeni dinamična oznaka <em>${DIN[i][0]}</em>?`, pravilna: DIN[i][1], napacne: r.premesaj(DIN.filter((_, j) => j !== i).map(([, y]) => y)).slice(0, 3), postopek: `<p>${DIN[i][0]}: ${DIN[i][1]}.</p>` }));
  pojmi([
    ["ritem", "Zaporedje različno dolgih tonov in poudarkov v času."],
    ["metrum", "Enakomerno ponavljanje poudarjenih in nepoudarjenih dob."],
    ["takt", "Glasbena enota med dvema taktnicama z ustaljenim številom dob."],
    ["tempo", "Hitrost izvajanja glasbe."],
    ["dinamika", "Jakost oziroma glasnost izvajanja."],
    ["melodija", "Smiselno zaporedje tonov različnih višin in trajanj."],
    ["violinski ključ", "Ključ G, ki določa ton g1 na drugi črti notnega črtovja."],
    ["basovski ključ", "Ključ F, ki določa ton f na četrti črti notnega črtovja."],
    ["višaj", "Predznak, ki zviša ton za pol tona."],
    ["nižaj", "Predznak, ki zniža ton za pol tona."],
    ["razvezaj", "Predznak, ki prekliče višaj ali nižaj."],
    ["sinkopa", "Premik poudarka z naglašene na nenaglašeno dobo."],
  ]);
  vprasanja([
    [4, "Kakšna je razlika med taktovskima načinoma 3/4 in 6/8, če oba trajata enako dolgo?", "3/4 ima tri četrtinske dobe, 6/8 pa dve dobi, vsaka je četrtinka s piko (dve skupini po tri osminke)", ["med njima ni razlike", "6/8 je vedno hitrejši", "3/4 ima šest dob"], "Različna notranja delitev: tridelni proti sestavljenemu dvodelnemu.", "visja"],
  ]);
}
