import { kolicina, izbira, T } from "../lib.mjs";
const FN = [["Ceno kosila izrazimo v evrih.", "merilo vrednosti"], ["S kartico plačamo nakup v trgovini.", "menjalno (plačilno) sredstvo"], ["Del plače prihranimo za poletje.", "hranilec vrednosti"], ["Posojilo vrnemo v obrokih v prihodnjih letih.", "sredstvo za odložena plačila"], ["Primerjamo cene dveh telefonov.", "merilo vrednosti"], ["Za frizerja plačamo z gotovino.", "menjalno (plačilno) sredstvo"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("funkcija", 6, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Katero funkcijo denarja ponazarja primer: ${FN[i][0]}`, pravilna: FN[i][1], napacne: ["merilo vrednosti", "menjalno (plačilno) sredstvo", "hranilec vrednosti", "sredstvo za odložena plačila"].filter((x) => x !== FN[i][1]), postopek: `<p>${FN[i][1]}.</p>` }));
  serija("obresti", 30, (r, i) => {
    const G = r.int(1, 50) * 100, p = r.int(1, 8), n = r.int(2, 10), kaj = i % 5;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: (G * p) / 100, tol: 0.001, enota: "€", besedilo: `Koliko obresti dobimo v enem letu za vlogo ${G} € pri letni obrestni meri ${p} %?`, rezultat: `${T((G * p) / 100, 2)} €`, postopek: `<p>\\(o = \\frac{G \\cdot p}{100} = \\frac{${G} \\cdot ${p}}{100} = ${T((G * p) / 100, 2)}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 2, vrednost: G * (1 + (p * n) / 100), tol: 0.001, enota: "€", besedilo: `Vložimo ${G} € za ${n} let po ${p} % letno z navadnim (enostavnim) obrestovanjem. Koliko imamo na koncu?`, rezultat: `${T(G * (1 + (p * n) / 100), 2)} €`, postopek: `<p>\\(G_n = ${G}\\left(1 + \\frac{${p} \\cdot ${n}}{100}\\right) = ${T(G * (1 + (p * n) / 100), 2)}\\)</p>` });
    if (kaj === 2) return kolicina({ tezavnost: 3, vrednost: G * (1 + p / 100) ** n, tol: 0.001, enota: "€", besedilo: `Vložimo ${G} € za ${n} let po ${p} % letno z obrestnim obrestovanjem. Koliko imamo na koncu?`, rezultat: `${T(G * (1 + p / 100) ** n, 2)} €`, postopek: `<p>\\(G_n = ${G} \\cdot ${T(1 + p / 100, 2)}^{${n}} = ${T(G * (1 + p / 100) ** n, 2)}\\)</p>` });
    if (kaj === 3) { const rr = r.izberi([5, 8, 10, 20]), dep = r.int(1, 10) * 1000, m = 100 / rr; return kolicina({ tezavnost: 4, raven: "visja", vrednost: dep * m, tol: 0.001, enota: "€", besedilo: `Obvezna rezerva je ${rr} %. Največ koliko depozitnega denarja lahko bančni sistem ustvari iz nove vloge ${dep} € (vključno z njo)?`, rezultat: `${T(dep * m, 0)} €`, postopek: `<p>Denarni multiplikator \\(m = \\frac{1}{${T(rr / 100, 2)}} = ${T(m, 0)}\\); \\(${dep} \\cdot ${T(m, 0)} = ${T(dep * m, 0)}\\)</p>` }); }
    const s = r.int(2, 6), k = r.int(3, 9); return kolicina({ tezavnost: 2, vrednost: k - s, tol: 0.001, enota: "odstotne točke", besedilo: `Banka daje za vloge ${s} % obresti, za posojila zaračuna ${k} %. Kolikšna je obrestna marža?`, rezultat: `${k - s} odstotne točke`, postopek: `<p>${k} − ${s} = ${k - s}.</p>` });
  });
  pojmi([
    ["denar", "Splošno sprejeto plačilno sredstvo, ki opravlja funkcije merila vrednosti, menjalnega sredstva in hranilca vrednosti."],
    ["gotovina", "Bankovci in kovanci v obtoku."],
    ["depozitni denar", "Denar na bančnih računih, s katerim plačujemo brezgotovinsko."],
    ["poslovna banka", "Finančna ustanova, ki sprejema vloge in daje posojila."],
    ["centralna banka", "Ustanova, ki izvaja denarno politiko in nadzira banke."],
    ["Evropska centralna banka", "Centralna banka evrskega območja s sedežem v Frankfurtu."],
    ["obvezna rezerva", "Delež vlog, ki ga mora banka hraniti pri centralni banki."],
    ["obrestna mera", "Cena izposojenega denarja, izražena v odstotkih na leto."],
    ["obrestna marža", "Razlika med obrestno mero za posojila in za vloge."],
    ["likvidnost", "Sposobnost poravnavanja obveznosti ob zapadlosti."],
    ["kriptovaluta", "Digitalno sredstvo brez centralnega izdajatelja, ki temelji na verigi blokov."],
  ]);
  vprasanja([
    [2, "Kateri je glavni cilj ECB?", "cenovna stabilnost, inflacija okoli 2 % srednjeročno", ["čim nižja brezposelnost", "čim višji BDP", "ničelna inflacija"], "Cilj je simetričen, 2 % srednjeročno."],
    [4, "Kaj se praviloma zgodi, ko ECB zviša ključne obrestne mere?", "posojila se podražijo, potrošnja in investicije upadejo, inflacija se umiri", ["posojila se pocenijo", "inflacija naraste", "evro oslabi in BDP takoj zraste"], "Restriktivna denarna politika.", "visja"],
  ]);
}
