import { kolicina, izbira, T } from "../lib.mjs";
const PREM = [["Dohodki potrošnikov se povečajo (normalna dobrina).", "povpraševanje se poveča (krivulja D v desno)"], ["Cena nadomestne dobrine se zviša.", "povpraševanje se poveča (krivulja D v desno)"], ["Cena dopolnilne dobrine se zviša.", "povpraševanje se zmanjša (krivulja D v levo)"], ["Proizvodni stroški se zvišajo.", "ponudba se zmanjša (krivulja S v levo)"], ["Uvede se nova, cenejša tehnologija.", "ponudba se poveča (krivulja S v desno)"], ["Dobrina postane manj modna.", "povpraševanje se zmanjša (krivulja D v levo)"], ["Država uvede subvencijo za proizvajalce.", "ponudba se poveča (krivulja S v desno)"], ["Država uvede trošarino na proizvod.", "ponudba se zmanjša (krivulja S v levo)"], ["Cena dobrine se zviša.", "premik vzdolž krivulje povpraševanja (manjša količina)"]];
const PN = [...new Set(PREM.map(([, p]) => p))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("premik", 9, (r, i) => izbira({ r, tezavnost: i === 8 ? 3 : 2, besedilo: `Kaj se zgodi na trgu dobrine? ${PREM[i][0]}`, pravilna: PREM[i][1], napacne: r.premesaj(PN.filter((x) => x !== PREM[i][1])).slice(0, 3), postopek: `<p>${PREM[i][1]}.</p>` }));
  serija("ravnovesje", 24, (r, i) => {
    const a = r.int(80, 200), b = r.int(1, 5), c = r.int(-20, 30), d = r.int(1, 5);
    const P = (a - c) / (b + d), Q = a - b * P;
    if (Q <= 0) return null;
    const kaj = i % 3;
    const opis = `Povpraševanje: \\(Q_D = ${a} - ${b}P\\), ponudba: \\(Q_S = ${c < 0 ? `${d}P - ${-c}` : `${c} + ${d}P`}\\).`;
    if (kaj === 0) return kolicina({ tezavnost: 2, vrednost: P, tol: 0.01, enota: "€", besedilo: `${opis} Izračunaj ravnovesno ceno.`, rezultat: `${T(P, 2)} €`, postopek: `<p>\\(${a} - ${b}P = ${c} + ${d}P \\Rightarrow P = \\frac{${a - c}}{${b + d}} = ${T(P, 2)}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 3, vrednost: Q, tol: 0.01, enota: "enot", besedilo: `${opis} Izračunaj ravnovesno količino.`, rezultat: `${T(Q, 2)}`, postopek: `<p>\\(P^* = ${T(P, 2)}\\), \\(Q^* = ${a} - ${b} \\cdot ${T(P, 2)} = ${T(Q, 2)}\\)</p>` });
    const Pm = Math.max(1, Math.floor(P) - r.int(2, 6)), pr = (a - b * Pm) - (c + d * Pm);
    if (c + d * Pm < 0 || Pm >= P) return null;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: pr, tol: 0.01, enota: "enot", besedilo: `${opis} Država določi najvišjo ceno ${Pm} €. Kolikšen je primanjkljaj na trgu?`, rezultat: `${T(pr, 0)} enot`, postopek: `<p>\\(Q_D = ${a - b * Pm}\\), \\(Q_S = ${c + d * Pm}\\), primanjkljaj \\(= ${T(pr, 0)}\\).</p>` });
  });
  pojmi([
    ["povpraševanje", "Količina dobrine, ki jo kupci želijo in zmorejo kupiti pri različnih cenah."],
    ["ponudba", "Količina dobrine, ki jo prodajalci želijo prodati pri različnih cenah."],
    ["zakon povpraševanja", "Ob višji ceni je povpraševana količina manjša, ceteris paribus."],
    ["zakon ponudbe", "Ob višji ceni je ponujena količina večja, ceteris paribus."],
    ["ravnovesna cena", "Cena, pri kateri sta povpraševana in ponujena količina enaki."],
    ["tržni presežek", "Stanje, ko je ponujena količina večja od povpraševane."],
    ["tržni primanjkljaj", "Stanje, ko je povpraševana količina večja od ponujene."],
    ["nadomestne dobrine", "Dobrine, ki jih lahko uporabimo namesto druge, npr. čaj in kava."],
    ["dopolnilne dobrine", "Dobrine, ki jih uporabljamo skupaj, npr. avto in bencin."],
    ["normalna dobrina", "Dobrina, katere povpraševanje se z rastjo dohodka poveča."],
    ["inferiorna dobrina", "Dobrina, katere povpraševanje se z rastjo dohodka zmanjša."],
    ["ceteris paribus", "Predpostavka, da se drugi dejavniki ne spremenijo."],
    ["najvišja cena", "Cena, ki jo predpiše država pod ravnovesjem; povzroči primanjkljaj."],
    ["najnižja cena", "Cena, ki jo predpiše država nad ravnovesjem; povzroči presežek."],
  ]);
}
