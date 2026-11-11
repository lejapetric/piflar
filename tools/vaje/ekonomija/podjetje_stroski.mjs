import { kolicina, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("stroski", 36, (r, i) => {
    const FC = r.int(5, 50) * 100, v = r.int(2, 30), Q = r.int(10, 200) * 10, P = v + r.int(3, 40);
    const TC = FC + v * Q, kaj = i % 5;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: TC, tol: 0.001, enota: "€", besedilo: `Stalni stroški podjetja so ${FC} €, spremenljivi stroški na enoto ${v} €. Kolikšni so celotni stroški pri proizvodnji ${Q} enot?`, rezultat: `${TC} €`, postopek: `<p>\\(CS = SS + SpS = ${FC} + ${v} \\cdot ${Q} = ${TC}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 2, vrednost: TC / Q, tol: 0.01, enota: "€", besedilo: `Stalni stroški so ${FC} €, spremenljivi stroški na enoto ${v} €, proizvodnja ${Q} enot. Kolikšni so povprečni celotni stroški?`, rezultat: `${T(TC / Q, 2)} €`, postopek: `<p>\\(PCS = \\frac{${FC} + ${v} \\cdot ${Q}}{${Q}} = ${T(TC / Q, 2)}\\)</p>` });
    if (kaj === 2) return kolicina({ tezavnost: 2, vrednost: P * Q - TC, tol: 0.001, enota: "€", besedilo: `Podjetje proda ${Q} enot po ${P} €. Stalni stroški so ${FC} €, spremenljivi na enoto ${v} €. Kolikšen je dobiček? (Izguba z minusom.)`, rezultat: `${P * Q - TC} €`, postopek: `<p>\\(CP = ${P} \\cdot ${Q} = ${P * Q}\\), \\(CS = ${TC}\\), dobiček \\(= ${P * Q - TC}\\)</p>` });
    if (kaj === 3) return kolicina({ tezavnost: 3, vrednost: FC / (P - v), tol: 0.01, enota: "enot", besedilo: `Cena izdelka je ${P} €, spremenljivi stroški na enoto ${v} €, stalni stroški ${FC} €. Pri kateri količini doseže podjetje prag rentabilnosti?`, rezultat: `${T(FC / (P - v), 1)} enot`, postopek: `<p>\\(Q = \\frac{SS}{P - SpS_{enota}} = \\frac{${FC}}{${P} - ${v}} = ${T(FC / (P - v), 1)}\\)</p>` });
    if (kaj === 4) { const Q2 = Q + 10, v2 = v + r.int(1, 4), d = FC + v * Q + 10 * v2 - TC; return kolicina({ tezavnost: 4, raven: "visja", vrednost: d / 10, tol: 0.01, enota: "€", besedilo: `Pri ${Q} enotah so celotni stroški ${TC} €, pri ${Q2} enotah pa ${TC + d} €. Koliko znašajo mejni stroški?`, rezultat: `${T(d / 10, 2)} €`, postopek: `<p>\\(MS = \\frac{\\Delta CS}{\\Delta Q} = \\frac{${d}}{10} = ${T(d / 10, 2)}\\)</p>` }); }
  });
  serija("ciljni", 8, (r) => {
    const FC = r.int(5, 50) * 100, v = r.int(2, 30), P = v + r.int(5, 40), D = r.int(1, 20) * 100;
  });
  pojmi([
    ["stalni stroški", "Stroški, ki se ne spreminjajo s količino proizvodnje, npr. najemnina."],
    ["spremenljivi stroški", "Stroški, ki se spreminjajo s količino proizvodnje, npr. material."],
    ["celotni stroški", "Vsota stalnih in spremenljivih stroškov."],
    ["povprečni stroški", "Celotni stroški, deljeni s količino proizvodnje."],
    ["mejni stroški", "Povečanje celotnih stroškov ob proizvodnji dodatne enote."],
    ["celotni prihodek", "Cena, pomnožena s prodano količino."],
    ["dobiček", "Razlika med celotnim prihodkom in celotnimi stroški."],
    ["prag rentabilnosti", "Količina, pri kateri so prihodki enaki stroškom in je dobiček nič."],
    ["zakon padajočih donosov", "Dodajanje enot spremenljivega dejavnika stalnemu sčasoma prinaša vse manjši prirast proizvodnje."],
    ["ekonomija obsega", "Upadanje povprečnih stroškov ob večanju obsega proizvodnje."],
  ]);
  vprasanja([
    [4, "Pri kateri količini podjetje maksimira dobiček?", "kjer so mejni prihodki enaki mejnim stroškom", ["kjer so povprečni stroški najnižji", "kjer je prihodek največji", "kjer so stalni stroški nič"], "Pravilo MR = MC.", "visja"],
  ]);
}
