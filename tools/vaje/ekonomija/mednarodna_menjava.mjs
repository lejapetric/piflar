import { kolicina, izbira, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("prednost", 16, (r, i) => {
    const a1 = r.int(2, 9), b1 = r.int(2, 9), a2 = r.int(2, 9), b2 = r.int(2, 9);
    if (a1 / b1 === a2 / b2) return null;
    const pA = a1 / b1 < a2 / b2 ? "država A" : "država B";
    const opis = `Država A za enoto sira potrebuje ${a1} ur dela, za enoto vina ${b1} ur. Država B za enoto sira potrebuje ${a2} ur, za enoto vina ${b2} ur.`;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: a1 / b1, tol: 0.01, enota: "enot vina", besedilo: `${opis} Kolikšen je oportunitetni strošek enote sira v državi A (v enotah vina)?`, rezultat: T(a1 / b1, 2), postopek: `<p>\\(\\frac{${a1}}{${b1}} = ${T(a1 / b1, 2)}\\)</p>` });
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `${opis} Katera država ima primerjalno prednost pri siru?`, pravilna: pA, napacne: [pA === "država A" ? "država B" : "država A", "nobena"], postopek: `<p>Oportunitetni strošek sira: A \\(${T(a1 / b1, 2)}\\), B \\(${T(a2 / b2, 2)}\\) enot vina. Primerjalno prednost ima država z nižjim: ${pA}.</p>` });
  });
  serija("tecaj", 18, (r, i) => {
    const t = r.int(95, 125) / 100, e = r.int(10, 500) * 10, kaj = i % 3;
    if (kaj === 0) return kolicina({ tezavnost: 2, vrednost: e * t, tol: 0.01, enota: "USD", besedilo: `Tečaj je 1 EUR = ${T(t, 2)} USD. Koliko dolarjev dobimo za ${e} €?`, rezultat: `${T(e * t, 2)} USD`, postopek: `<p>\\(${e} \\cdot ${T(t, 2)} = ${T(e * t, 2)}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 2, vrednost: e / t, tol: 0.01, enota: "€", besedilo: `Tečaj je 1 EUR = ${T(t, 2)} USD. Koliko evrov stane izdelek, ki stane ${e} USD?`, rezultat: `${T(e / t, 2)} €`, postopek: `<p>\\(\\frac{${e}}{${T(t, 2)}} = ${T(e / t, 2)}\\)</p>` });
    const t2 = t + r.izberi([-0.08, -0.05, 0.05, 0.08]);
    const odg = t2 > t ? "evro se je okrepil (apreciacija); evropski izvoz se podraži" : "evro je oslabel (depreciacija); evropski izvoz se poceni";
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Tečaj se spremeni z 1 EUR = ${T(t, 2)} USD na 1 EUR = ${T(t2, 2)} USD. Kaj velja?`, pravilna: odg, napacne: [t2 > t ? "evro je oslabel (depreciacija); evropski izvoz se poceni" : "evro se je okrepil (apreciacija); evropski izvoz se podraži", "tečaj ne vpliva na izvoz", "dolar se je okrepil; uvoz v EU se poceni"], postopek: `<p>${odg}.</p>` });
  });
  pojmi([
    ["absolutna prednost", "Država proizvede dobrino z manj viri kot druga."],
    ["primerjalna prednost", "Država proizvede dobrino z nižjim oportunitetnim stroškom kot druga."],
    ["plačilna bilanca", "Sistematičen pregled vseh ekonomskih transakcij države s tujino."],
    ["tekoči račun", "Del plačilne bilance z menjavo blaga, storitev in dohodki."],
    ["trgovinska bilanca", "Razlika med izvozom in uvozom blaga."],
    ["devizni tečaj", "Cena ene valute, izražena v drugi."],
    ["protekcionizem", "Zaščita domače proizvodnje pred tujo konkurenco."],
    ["carina", "Davek na uvoženo blago."],
    ["uvozna kvota", "Količinska omejitev uvoza."],
    ["Svetovna trgovinska organizacija", "Mednarodna organizacija, ki ureja pravila mednarodne trgovine."],
  ]);
  vprasanja([
    [3, "Kdo je utemeljil teorijo primerjalnih prednosti?", "David Ricardo", ["Adam Smith", "John Maynard Keynes", "Karl Marx"], "Načela politične ekonomije (1817)."],
    [4, "Zakaj se lahko menjava splača tudi državi, ki ima absolutno prednost pri obeh dobrinah?", "ker se lahko specializira za dobrino z nižjim oportunitetnim stroškom in obe državi pridobita", ["ker se ji ne splača", "ker carine izginejo", "ker mora izvažati vse"], "Odloča primerjalna, ne absolutna prednost.", "visja"],
  ]);
}
