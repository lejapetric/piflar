import { kolicina, izbira, T } from "../lib.mjs";
const SK = [["nakup novega stroja v podjetju", "investicije (I)"], ["nakup kruha v gospodinjstvu", "osebna potrošnja (C)"], ["plača učitelja v javni šoli", "državna potrošnja (G)"], ["prodaja avtomobilov v tujino", "izvoz (X)"], ["gradnja nove avtoceste, ki jo plača država", "državna potrošnja (G)"], ["nakup novega stanovanja", "investicije (I)"], ["obisk frizerja", "osebna potrošnja (C)"]];
const NI = [["nakup rabljenega avtomobila", "ne, ker ni nova proizvodnja"], ["nakup delnic", "ne, ker je finančna transakcija"], ["izplačilo pokojnine", "ne, ker je transferno plačilo"], ["gospodinjsko delo za lastno družino", "ne, ker ni tržna dejavnost"], ["proizvodnja novega kolesa", "da"], ["storitev zobozdravnika", "da"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("sestavina", 7, (r, i) => izbira({ r, tezavnost: 2, besedilo: `V katero sestavino BDP (izdatkovna metoda) spada ${SK[i][0]}?`, pravilna: SK[i][1], napacne: ["osebna potrošnja (C)", "investicije (I)", "državna potrošnja (G)", "izvoz (X)"].filter((x) => x !== SK[i][1]), postopek: `<p>BDP = C + I + G + (X − M). ${SK[i][0]}: ${SK[i][1]}.</p>` }));
  serija("vstej", 6, (r, i) => izbira({ r, tezavnost: 3, besedilo: `Ali se ${NI[i][0]} šteje v BDP?`, pravilna: NI[i][1], napacne: [...new Set(["da", "ne, ker ni nova proizvodnja", "ne, ker je transferno plačilo", "ne, ker je finančna transakcija"])].filter((x) => x !== NI[i][1]).slice(0, 3), postopek: `<p>${NI[i][1]}.</p>` }));
  serija("racun", 30, (r, i) => {
    const C = r.int(20, 60), I = r.int(5, 20), G = r.int(8, 25), X = r.int(15, 50), M = r.int(15, 50), kaj = i % 5;
    const B = C + I + G + X - M;
    if (kaj === 0) return kolicina({ tezavnost: 2, vrednost: B, tol: 0.001, enota: "mrd €", besedilo: `Osebna potrošnja je ${C} mrd €, investicije ${I} mrd €, državna potrošnja ${G} mrd €, izvoz ${X} mrd € in uvoz ${M} mrd €. Izračunaj BDP.`, rezultat: `${B} mrd €`, postopek: `<p>\\(BDP = C + I + G + X - M = ${C} + ${I} + ${G} + ${X} - ${M} = ${B}\\)</p>` });
    const b0 = r.int(40, 60), b1 = b0 + r.int(-3, 5), d = r.izberi([2, 3, 4, 5, 8]);
    const nom = ((b1 - b0) / b0) * 100;
    if (kaj === 1) return kolicina({ tezavnost: 2, vrednost: nom, tol: 0.01, enota: "%", besedilo: `Nominalni BDP je bil lani ${b0} mrd €, letos ${b1} mrd €. Za koliko odstotkov se je spremenil?`, rezultat: `${T(nom, 2)} %`, postopek: `<p>\\(\\frac{${b1} - ${b0}}{${b0}} \\cdot 100 = ${T(nom, 2)}\\,\\%\\)</p>` });
    if (kaj === 2) return kolicina({ tezavnost: 3, vrednost: nom - d, tol: 0.02, enota: "%", besedilo: `Nominalni BDP se je povečal za ${T(nom, 1)} %, inflacija je bila ${d} %. Približno kolikšna je bila realna rast BDP?`, rezultat: `približno ${T(nom - d, 1)} %`, postopek: `<p>Realna rast ≈ nominalna rast − inflacija = ${T(nom, 1)} − ${d} = ${T(nom - d, 1)} %.</p>` });
    const pop = r.int(15, 85) / 10, bdp = r.int(30, 80);
    if (kaj === 3) return kolicina({ tezavnost: 2, vrednost: (bdp * 1e9) / (pop * 1e6), tol: 0.01, enota: "€", besedilo: `BDP države je ${bdp} mrd €, prebivalcev je ${T(pop, 1)} milijona. Kolikšen je BDP na prebivalca?`, rezultat: `${T((bdp * 1e3) / pop, 0)} €`, postopek: `<p>\\(\\frac{${bdp} \\cdot 10^9}{${T(pop, 1)} \\cdot 10^6} \\approx ${T((bdp * 1e3) / pop, 0)}\\) €</p>` });
    const def = r.int(102, 125), real = (b1 / def) * 100;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: real, tol: 0.01, enota: "mrd €", besedilo: `Nominalni BDP je ${b1} mrd €, deflator BDP je ${def} (bazno leto = 100). Kolikšen je realni BDP?`, rezultat: `${T(real, 2)} mrd €`, postopek: `<p>\\(BDP_{real} = \\frac{${b1}}{${def}} \\cdot 100 = ${T(real, 2)}\\)</p>` });
  });
  pojmi([
    ["bruto domači proizvod", "Tržna vrednost vseh končnih dobrin in storitev, proizvedenih v državi v enem letu."],
    ["nominalni BDP", "BDP, izračunan v tekočih cenah."],
    ["realni BDP", "BDP, izračunan v stalnih cenah, brez vpliva inflacije."],
    ["BDP na prebivalca", "BDP, deljen s številom prebivalcev; groba mera blaginje."],
    ["gospodarska rast", "Povečanje realnega BDP v določenem obdobju."],
    ["konjunkturni cikel", "Ponavljajoče se nihanje gospodarske aktivnosti okoli dolgoročnega trenda."],
    ["recesija", "Upadanje realnega BDP vsaj dve zaporedni četrtletji."],
    ["vmesna potrošnja", "Dobrine, porabljene v proizvodnji drugih dobrin, ki jih v BDP ne štejemo posebej."],
    ["dodana vrednost", "Vrednost proizvodnje, zmanjšana za vmesno potrošnjo."],
    ["siva ekonomija", "Neprijavljena gospodarska dejavnost, ki se izogiba davkom."],
  ]);
  vprasanja([
    [3, "Katere so faze konjunkturnega cikla?", "ekspanzija, vrh, recesija, dno", ["inflacija, deflacija, stagflacija, rast", "proizvodnja, menjava, delitev, potrošnja", "začetek, sredina, konec, ponovitev"], "Za dnom spet sledi oživljanje."],
    [4, "Zakaj BDP na prebivalca ni popolna mera blaginje?", "ne upošteva porazdelitve dohodka, prostega časa, okolja in netržnih dejavnosti", ["ker ga ni mogoče izračunati", "ker vključuje inflacijo", "ker je vedno previsok"], "Zato uporabljamo tudi indeks človekovega razvoja (HDI).", "visja"],
    [4, "Zakaj v BDP ne štejemo vmesne potrošnje?", "da se izognemo dvojnemu štetju", ["ker je ni mogoče izmeriti", "ker je prepovedana", "ker je v tujini"], "Vrednost moke je že vključena v ceno kruha.", "visja"],
  ]);
}
