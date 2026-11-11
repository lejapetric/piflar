import { kolicina, izbira, besedilo, T, L } from "../lib.mjs";
import { F, KOREN, alkan, alken, alkin, molska, Vm } from "../kemija-lib.mjs";
const pis = (f) => F(f.replace(/^C1H/, "CH"));
const ime = (n, kon, pol = "") => `${KOREN[n - 1]}${pol}${kon}`;

export default function ({ serija, pojmi, vprasanja }) {
  serija("ime-alkana", 8, (r, i) => {
    const n = r.int(1, 10);
    if (i % 2) return izbira({ r, tezavnost: 1, besedilo: `Katera je molekulska formula alkana ${ime(n, "an")}?`, pravilna: pis(alkan(n)), napacne: [pis(alken(n + 1)), pis(alkan(n + 1)), pis(`C${n}H${2 * n + 4}`)].filter((x) => x !== pis(alkan(n))), postopek: `<p>Alkani imajo splošno formulo C<sub>n</sub>H<sub>2n+2</sub>; ${ime(n, "an")} ima ${n} C-atom${n === 1 ? "" : n === 2 ? "a" : n < 5 ? "e" : "ov"}: ${pis(alkan(n))}.</p>` });
    return besedilo({ tezavnost: 1, sprejemljivi: [ime(n, "an")], besedilo: `Kako se imenuje nerazvejan alkan s formulo ${pis(alkan(n))}?`, rezultat: ime(n, "an"), postopek: `<p>Koren imena pove število C-atomov (${n}: ${KOREN[n - 1]}-), končnica -an pomeni alkan.</p>` });
  });
  serija("homologni", 6, (r) => {
    const n = r.int(2, 9), vrsta = r.izberi(["alken", "alkin", "alkan"]);
    const f = { alkan, alken, alkin }[vrsta](n), H = { alkan: 2 * n + 2, alken: 2 * n, alkin: 2 * n - 2 }[vrsta];
    return kolicina({ tezavnost: 1, vrednost: H, enota: "", besedilo: `Koliko atomov vodika ima ${vrsta} z ${n} atomi ogljika (z eno ${vrsta === "alkan" ? "" : vrsta === "alken" ? "dvojno vezjo" : "trojno vezjo"})?`.replace(" z eno )", ")").replace("(z eno )", ""), rezultat: `${H} (${pis(f)})`, postopek: `<p>Splošna formula: ${{ alkan: "C<sub>n</sub>H<sub>2n+2</sub>", alken: "C<sub>n</sub>H<sub>2n</sub>", alkin: "C<sub>n</sub>H<sub>2n−2</sub>" }[vrsta]}; za n = ${n}: ${H}.</p>` });
  });
  serija("molska", 5, (r) => {
    const n = r.int(1, 10), f = alkan(n);
    return kolicina({ tezavnost: 1, vrednost: molska(f.replace(/^CH/, "C1H").replace("C1H", "CH")), tol: 0.003, enota: "g/mol", besedilo: `Izračunaj molsko maso ${ime(n, "ana")} (${pis(f)}).`, rezultat: `${T(molska(f), 2)} g/mol`, postopek: `<p>\\(M = ${n} \\cdot 12{,}01 + ${2 * n + 2} \\cdot 1{,}008 \\approx ${L(molska(f), 2)}\\ \\text{g/mol}\\)</p>` });
  });
  serija("gorenje-kisik", 6, (r) => {
    const n = r.int(1, 8), O = (3 * n + 1) / 2;
    return kolicina({ tezavnost: 2, vrednost: O, enota: "", besedilo: `Koliko molov kisika potrebujemo za popolno gorenje 1 mol ${ime(n, "ana")} (${pis(alkan(n))})?`, rezultat: `${T(O, 1)} mol`, postopek: `<p>${pis(alkan(n))} + ${T(O, 1)} O<sub>2</sub> → ${n} CO<sub>2</sub> + ${n + 1} H<sub>2</sub>O</p><p>Kisik štejemo iz produktov: \\(2 \\cdot ${n} + ${n + 1} = ${3 * n + 1}\\) atomov, to je \\(${L(O, 1)}\\) mol O<sub>2</sub>.</p>` });
  });
  serija("gorenje-co2", 6, (r) => {
    const n = r.int(1, 8), m = r.int(1, 100), f = alkan(n), M = molska(f), V = (m / M) * n * Vm;
    return kolicina({ tezavnost: 3, vrednost: V, tol: 0.01, enota: "L", besedilo: `Koliko litrov CO<sub>2</sub> (pri normalnih pogojih) nastane pri popolnem gorenju ${m} g ${ime(n, "ana")}?`, rezultat: `${T(V, 2)} L`, postopek: `<p>\\(n(\\text{${f}}) = \\frac{${m}}{${L(M, 2)}} \\approx ${L(m / M, 4)}\\ \\text{mol}\\); iz vsake molekule nastane ${n} CO<sub>2</sub>.</p><p>\\(V = ${n} \\cdot ${L(m / M, 4)} \\cdot 22{,}4 \\approx ${L(V, 2)}\\ \\text{L}\\)</p>` });
  });
  serija("izomeri", 5, (r) => {
    const [n, k] = r.izberi([[4, 2], [5, 3], [6, 5], [7, 9]]);
    return kolicina({ tezavnost: 3, vrednost: k, enota: "", besedilo: `Koliko konstitucijskih izomerov ima alkan ${pis(alkan(n))}?`, rezultat: `${k}`, postopek: `<p>Izomere dobimo z različnim razvejanjem ogljikove verige; za ${pis(alkan(n))} jih je ${k}.</p>` });
  });
  serija("ime-alkena", 5, (r) => {
    const n = r.int(2, 6), p = n > 3 ? r.int(1, Math.floor(n / 2)) : 0;
    const im = n <= 3 ? ime(n, "en") : `${KOREN[n - 1]}-${p}-en`;
    return izbira({ r, tezavnost: 2, besedilo: `Kako se imenuje nerazvejan alken s ${n} C-atomi in dvojno vezjo ${p ? `za ${p}. C-atomom` : ""}?`.replace(" ?", "?"), pravilna: im, napacne: [ime(n, "an"), ime(n, "in"), n > 3 ? `${KOREN[n - 1]}-${n - p}-en` : ime(n + 1, "en")].filter((x) => x !== im), postopek: `<p>Alkeni imajo končnico -en, položaj dvojne vezi označimo z najnižjo možno številko.</p>` });
  });
  serija("nasicenost", 5, (r) => {
    const [f, odg] = r.izberi([["C3H8", "nasičen (alkan)"], ["C4H8", "nenasičen (alken ali cikloalkan)"], ["C2H2", "nenasičen (alkin)"], ["C6H14", "nasičen (alkan)"], ["C5H10", "nenasičen (alken ali cikloalkan)"], ["C3H4", "nenasičen (alkin ali dien)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšen ogljikovodik je ${F(f)}?`, pravilna: odg, napacne: ["nasičen (alkan)", "nenasičen (alken ali cikloalkan)", "nenasičen (alkin)", "nenasičen (alkin ali dien)", "aromatski"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>Primerjamo s formulo alkana C<sub>n</sub>H<sub>2n+2</sub>; vsaka dvojna vez ali obroč zmanjša število H za 2.</p>` });
  });
  serija("visja-formula", 4, (r) => {
    const n = r.int(2, 8), M = molska(alkan(n));
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: n, enota: "", besedilo: `Alkan ima molsko maso ${L(M, 1).replace("{,}", ",")} g/mol. Koliko atomov ogljika ima?`, rezultat: `${n} (${pis(alkan(n))})`, postopek: `<p>\\(M = 12{,}01n + 1{,}008(2n + 2) = 14{,}03n + 2{,}02\\)</p><p>\\(n = \\frac{${L(M, 1)} - 2{,}02}{14{,}03} \\approx ${n}\\)</p>` });
  });
  serija("visja-zmes", 3, (r) => {
    const V = r.int(1, 10), x = r.int(1, 9) / 10; // metan in propan
    const O2 = V * (x * 2 + (1 - x) * 5);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: O2, tol: 0.01, enota: "L", besedilo: `${V} L zmesi metana in propana vsebuje ${L(x * 100, 0)} % metana (prostorninsko). Koliko litrov kisika potrebujemo za popolno gorenje (pri enakih pogojih)?`, rezultat: `${T(O2, 2)} L`, postopek: `<p>CH<sub>4</sub> + 2 O<sub>2</sub>, C<sub>3</sub>H<sub>8</sub> + 5 O<sub>2</sub>. Prostornine plinov so v razmerju množin.</p><p>\\(V(\\text{O}_2) = ${L(V * x, 1)} \\cdot 2 + ${L(V * (1 - x), 1)} \\cdot 5 = ${L(O2, 2)}\\ \\text{L}\\)</p>` });
  });
  pojmi([
    ["alkani", "Nasičeni ogljikovodiki s samimi enojnimi vezmi med C-atomi."],
    ["alkeni", "Ogljikovodiki z eno dvojno vezjo med C-atomi."],
    ["alkini", "Ogljikovodiki s trojno vezjo med C-atomi."],
    ["aromatski ogljikovodiki", "Ogljikovodiki z benzenovim obročem."],
    ["homologna vrsta", "Niz spojin, ki se med seboj razlikujejo za skupino CH<sub>2</sub>."],
    ["cikloalkani", "Nasičeni ogljikovodiki z verigo, sklenjeno v obroč."],
    ["frakcionirna destilacija", "Ločevanje nafte na frakcije glede na različna vrelišča."],
    ["kreking", "Cepljenje dolgih ogljikovodikov na krajše pri visoki temperaturi."],
  ]);
}
