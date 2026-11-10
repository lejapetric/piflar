import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  const POS = [
    ["Kako temperatura vpliva na hitrost delovanja amilaze?", "temperatura", "hitrost razgradnje škroba", "pH, količina encima in škroba"],
    ["Kako jakost svetlobe vpliva na fotosintezo vodne kuge?", "jakost svetlobe", "število mehurčkov kisika na minuto", "temperatura vode, koncentracija CO₂"],
    ["Kako koncentracija soli vpliva na maso krompirjevih kock?", "koncentracija soli", "sprememba mase kock", "velikost kock, čas, temperatura"],
    ["Kako telesna aktivnost vpliva na srčni utrip?", "telesna aktivnost", "srčni utrip", "starost, čas merjenja"],
    ["Kako pH vpliva na kalitev semen?", "pH", "odstotek kaljenih semen", "vrsta semen, temperatura, voda"],
    ["Kako temperatura vpliva na hitrost dihanja kvasovk?", "temperatura", "prostornina nastalega CO₂", "koncentracija sladkorja, količina kvasovk"],
  ];
  serija("neodvisna", 8, (r) => {
    const [v, n, o] = r.izberi(POS);
    return izbira({ r, tezavnost: 1, besedilo: `Raziskovalno vprašanje: »${v}« Katera je neodvisna spremenljivka?`, pravilna: n, napacne: [o.split(",")[0], POS.find(([x]) => x !== v)[2], "čas opazovanja"].filter((x) => x !== n), postopek: `<p>Neodvisna spremenljivka je tista, ki jo namerno spreminjamo: ${n}.</p>` });
  });
  serija("odvisna", 8, (r) => {
    const [v, n, o] = r.izberi(POS), d = r.izberi(POS.filter(([x]) => x !== v));
    return izbira({ r, tezavnost: 2, besedilo: `Raziskovalno vprašanje: »${v}« Katera je odvisna spremenljivka?`, pravilna: o, napacne: [n, d[2], "število ponovitev"], postopek: `<p>Odvisna spremenljivka je tista, ki jo merimo: ${o}.</p>` });
  });
  serija("kontrolirane", 6, (r) => {
    const [v, n, o, k] = r.izberi(POS);
    return izbira({ r, tezavnost: 2, besedilo: `Raziskovalno vprašanje: »${v}« Katere spremenljivke moramo ohranjati stalne?`, pravilna: k, napacne: [n, o, "vse spremenljivke spreminjamo hkrati"], postopek: `<p>Kontrolirane spremenljivke: ${k}.</p>` });
  });
  serija("povprecje", 10, (r, i) => {
    const n = r.int(3, 6), x = Array.from({ length: n }, () => r.int(5, 60)), s = x.reduce((a, b) => a + b, 0), p = s / n;
    if (i % 2) {
      const m = r.int(3, 30) * 10, k = r.int(1, m - 1), d = (k / m) * 100;
      return kolicina({ tezavnost: 2, vrednost: d, tol: 0.01, enota: "%", besedilo: `Od ${m} posejanih semen jih je vzklilo ${k}. Kolikšen je delež kaljivosti?`, rezultat: `${T(d, 1)} %`, postopek: `<p>\\(\\frac{${k}}{${m}} \\cdot 100\\,\\% \\approx ${L(d, 1)}\\,\\%\\)</p>` });
    }
    return kolicina({ tezavnost: 1, vrednost: p, tol: 0.01, enota: "", besedilo: `V ${n} ponovitvah poskusa smo prešteli ${x.join(", ")} mehurčkov kisika na minuto. Kolikšno je povprečje?`, rezultat: `${T(p, 1)}`, postopek: `<p>\\(\\bar{x} = \\frac{${x.join(" + ")}}{${n}} = \\frac{${s}}{${n}} \\approx ${L(p, 1)}\\)</p>` });
  });
  serija("sprememba", 6, (r) => {
    const a = r.int(20, 80), b = r.int(20, 80), d = ((b - a) / a) * 100;
    if (a === b) return null;
    return kolicina({ tezavnost: 3, vrednost: d, tol: 0.01, enota: "%", besedilo: `Krompirjeva kocka je imela maso ${T(a / 10, 1)} g, po 30 minutah v raztopini pa ${T(b / 10, 1)} g. Za koliko odstotkov se je spremenila masa (izgubo zapiši z minusom)?`, rezultat: `${T(d, 1)} %`, postopek: `<p>\\(\\frac{${L(b / 10, 1)} - ${L(a / 10, 1)}}{${L(a / 10, 1)}} \\cdot 100\\,\\% \\approx ${L(d, 1)}\\,\\%\\)</p><p>${d > 0 ? "Masa se je povečala – raztopina je bila hipotonična." : "Masa se je zmanjšala – raztopina je bila hipertonična."}</p>` });
  });
  serija("sd", 4, (r) => {
    const x = Array.from({ length: 4 }, () => r.int(10, 30)), m = x.reduce((a, b) => a + b, 0) / 4, sd = Math.sqrt(x.reduce((a, b) => a + (b - m) ** 2, 0) / 3);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: sd, tol: 0.02, enota: "", besedilo: `Izračunaj vzorčni standardni odklon meritev ${x.join(", ")}.`, rezultat: `${T(sd, 2)}`, postopek: `<p>\\(\\bar{x} = ${L(m, 2)}\\)</p><p>\\(s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}} \\approx ${L(sd, 2)}\\)</p>` });
  });
  pojmi([
    ["hipoteza", "Preverljiva domneva o odgovoru na raziskovalno vprašanje."],
    ["neodvisna spremenljivka", "Spremenljivka, ki jo raziskovalec namerno spreminja."],
    ["odvisna spremenljivka", "Spremenljivka, ki jo merimo kot odziv."],
    ["kontrolirana spremenljivka", "Spremenljivka, ki jo ohranjamo stalno."],
    ["kontrolni poskus", "Poskus brez vpliva preučevanega dejavnika, s katerim primerjamo rezultate."],
    ["ponovitev", "Večkratna izvedba poskusa za zanesljivejši rezultat."],
    ["zanesljivost", "Ujemanje rezultatov pri ponovitvah poskusa."],
    ["veljavnost", "Ali poskus res meri tisto, kar želimo preveriti."],
    ["napaka meritve", "Odstopanje izmerjene od prave vrednosti."],
    ["vzorec", "Izbrani del populacije, ki ga preučujemo."],
    ["placebo", "Neaktivna snov, ki jo dobi kontrolna skupina."],
    ["dvojno slepi poskus", "Poskus, pri katerem ne preiskovanci ne raziskovalci ne vedo, kdo dobi kaj."],
    ["teorija", "Široko preverjena razlaga naravnih pojavov."],
  ]);
  vprasanja([
    [2, "Kateri graf je najprimernejši za prikaz spreminjanja hitrosti fotosinteze z jakostjo svetlobe?", "črtni graf (ali razsevni diagram)", ["tortni diagram", "slikovni prikaz", "tabela brez grafa"], "Za zvezne spremenljivke uporabimo črtni graf ali razsevni diagram."],
    [3, "Zakaj poskus večkrat ponovimo?", "da zmanjšamo vpliv naključnih napak in povečamo zanesljivost", ["da dobimo želen rezultat", "da spremenimo hipotezo", "da poskus traja dlje"], "Iz ponovitev izračunamo povprečje in razpršenost."],
    [4, "Kaj pomeni, da se standardna odklona dveh skupin močno prekrivata?", "razlika med povprečjema verjetno ni statistično značilna", ["razlika je zagotovo značilna", "meritve so napačne", "hipoteza je potrjena"], "Za presojo uporabimo statistični test, npr. t-test.", "visja"],
    [4, "Raziskovalec ugotovi, da je hipoteza ovržena. Kaj je pravilno?", "rezultat je enako veljaven, hipoteza se zavrne ali spremeni", ["poskus je bil neuspešen in ga zavržemo", "podatke popravimo", "hipotezo kljub temu potrdimo"], "Znanost napreduje tudi z zavračanjem hipotez.", "visja"],
    [4, "Zakaj v poskusu z zdravilom uporabimo placebo?", "da ločimo učinek zdravila od psihološkega učinka pričakovanja", ["da je poskus cenejši", "da kontrolna skupina ozdravi", "da povečamo vzorec"], "Placebo učinek je lahko velik.", "visja"],
  ]);
}
