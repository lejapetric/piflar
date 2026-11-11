import { kolicina, izbira, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("srednje", 24, (r, i) => {
    const n = r.izberi([5, 6, 7, 8]), x = Array.from({ length: n }, () => r.int(1, 20));
    const s = [...x].sort((a, b) => a - b), as = x.reduce((a, b) => a + b, 0) / n;
    const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    const kaj = i % 3;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: as, tol: 0.01, enota: "", besedilo: `Dijaki so na testu dosegli točke: ${x.join(", ")}. Izračunaj aritmetično sredino.`, rezultat: T(as, 2), postopek: `<p>\\(\\bar{x} = \\frac{${x.join(" + ")}}{${n}} = ${T(as, 2)}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 2, vrednost: med, enota: "", besedilo: `Podatki: ${x.join(", ")}. Določi mediano.`, rezultat: T(med, 1), postopek: `<p>Urejeno: ${s.join(", ")}. ${n % 2 ? "Srednji podatek" : "Povprečje srednjih dveh"}: ${T(med, 1)}.</p>` });
    return kolicina({ tezavnost: 1, vrednost: s[n - 1] - s[0], enota: "", besedilo: `Podatki: ${x.join(", ")}. Izračunaj variacijski razmik.`, rezultat: `${s[n - 1] - s[0]}`, postopek: `<p>\\(VR = x_{max} - x_{min} = ${s[n - 1]} - ${s[0]} = ${s[n - 1] - s[0]}\\)</p>` });
  });
  serija("normalna", 10, (r, i) => {
    const M = r.izberi([100, 50, 20]), SD = M === 100 ? 15 : M === 50 ? 10 : 4;
    const [k, d, opis] = r.izberi([[1, 68, "med M − 1 SD in M + 1 SD"], [2, 95, "med M − 2 SD in M + 2 SD"], [3, 99.7, "med M − 3 SD in M + 3 SD"]]);
    return kolicina({ tezavnost: 3, vrednost: d, tol: 0.02, enota: "%", besedilo: `Rezultati testa so normalno porazdeljeni z M = ${M} in SD = ${SD}. Približno koliko odstotkov ljudi ima rezultat med ${M - k * SD} in ${M + k * SD}?`, rezultat: `približno ${T(d, 1)} %`, postopek: `<p>Pri normalni porazdelitvi je ${opis} približno ${T(d, 1)} % podatkov.</p>` });
  });
  serija("korelacija", 8, (r, i) => {
    const [rr, opis] = [[0.85, "močna pozitivna"], [-0.8, "močna negativna"], [0.05, "ni povezanosti"], [0.4, "šibka do zmerna pozitivna"], [-0.35, "šibka do zmerna negativna"], [-0.95, "zelo močna negativna"], [0.97, "zelo močna pozitivna"], [-0.02, "ni povezanosti"]][i];
    return izbira({ r, tezavnost: rr * rr > 0.5 ? 2 : 3, besedilo: `Korelacijski koeficient med spremenljivkama je r = ${T(rr, 2)}. Kakšna je povezanost?`, pravilna: opis, napacne: ["močna pozitivna", "močna negativna", "ni povezanosti", "šibka do zmerna pozitivna", "zelo močna negativna"].filter((x) => x !== opis).slice(0, 3), postopek: `<p>Predznak pove smer, absolutna vrednost moč povezanosti (bližje 1 pomeni močnejšo).</p>` });
  });
  pojmi([
    ["populacija", "Vsi posamezniki, na katere želimo posplošiti ugotovitve raziskave."],
    ["vzorec", "Del populacije, ki ga dejansko proučujemo."],
    ["reprezentativni vzorec", "Vzorec, ki po pomembnih lastnostih ustreza populaciji."],
    ["aritmetična sredina", "Vsota vseh podatkov, deljena s številom podatkov."],
    ["mediana", "Vrednost, ki urejene podatke razdeli na dve enako veliki polovici."],
    ["modus", "Vrednost, ki se med podatki pojavi najpogosteje."],
    ["standardni odklon", "Mera razpršenosti, ki pove povprečno oddaljenost podatkov od aritmetične sredine."],
    ["histogram", "Grafični prikaz frekvenčne porazdelitve s stolpci."],
    ["korelacija", "Povezanost med dvema spremenljivkama, izražena s koeficientom od −1 do 1."],
  ]);
  vprasanja([
    [3, "Pri katerih podatkih je mediana boljša mera od aritmetične sredine?", "kadar so med podatki skrajne vrednosti", ["kadar so podatki normalno porazdeljeni", "kadar je podatkov malo in so vsi enaki", "nikoli"], "Mediana je odporna na skrajne vrednosti (npr. plače)."],
    [4, "Porazdelitev je asimetrična v desno (desni rep je daljši). Kaj velja?", "aritmetična sredina je večja od mediane", ["mediana je večja od aritmetične sredine", "vse tri srednje vrednosti so enake", "modus je največji"], "Skrajne visoke vrednosti potegnejo povprečje navzgor.", "visja"],
    [4, "Korelacija med številom gasilcev na požarišču in škodo je pozitivna. Kaj je najverjetnejša razlaga?", "obe spremenljivki sta odvisni od velikosti požara", ["gasilci povzročajo škodo", "škoda pokliče gasilce", "povezava je naključna"], "Tretja spremenljivka lahko povzroča korelacijo.", "visja"],
  ]);
}
