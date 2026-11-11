import { kolicina, izbira, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("cenovna", 20, (r, i) => {
    const dp = r.izberi([5, 10, 20, -5, -10, -20]), e = r.izberi([0.2, 0.5, 0.8, 1, 1.5, 2, 3]), dq = -e * dp;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: dq, tol: 0.01, enota: "%", besedilo: `Cenovna elastičnost povpraševanja je ${T(-e, 1)}. Za koliko odstotkov se spremeni povpraševana količina, če se cena spremeni za ${dp} %? (Vpiši s predznakom.)`, rezultat: `${T(dq, 1)} %`, postopek: `<p>\\(\\%\\Delta Q = E \\cdot \\%\\Delta P = ${T(-e, 1)} \\cdot ${dp} = ${T(dq, 1)}\\,\\%\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: -e, tol: 0.01, enota: "", besedilo: `Cena se spremeni za ${dp} %, povpraševana količina pa za ${T(dq, 1)} %. Izračunaj cenovno elastičnost povpraševanja.`, rezultat: T(-e, 1), postopek: `<p>\\(E = \\frac{\\%\\Delta Q}{\\%\\Delta P} = \\frac{${T(dq, 1)}}{${dp}} = ${T(-e, 1)}\\)</p>` });
  });
  serija("vrsta", 10, (r, i) => {
    const e = [0.3, 0.6, 1, 1.4, 2.5, 0, 0.9, 1.2, 4, 0.1][i];
    const odg = e === 0 ? "popolnoma neelastično" : e < 1 ? "neelastično" : e === 1 ? "enotsko elastično" : "elastično";
    return izbira({ r, tezavnost: 2, besedilo: `Absolutna vrednost cenovne elastičnosti povpraševanja je ${T(e, 1)}. Kakšno je povpraševanje?`, pravilna: odg, napacne: ["elastično", "neelastično", "enotsko elastično", "popolnoma neelastično"].filter((x) => x !== odg), postopek: `<p>|E| > 1 elastično, |E| < 1 neelastično, |E| = 1 enotsko, |E| = 0 popolnoma neelastično.</p>` });
  });
  serija("prihodek", 8, (r, i) => {
    const el = i % 2 === 0, gor = i % 4 < 2;
    const odg = el ? (gor ? "se zmanjša" : "se poveča") : (gor ? "se poveča" : "se zmanjša");
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Povpraševanje po dobrini je ${el ? "elastično" : "neelastično"}. Podjetje cene ${gor ? "zviša" : "zniža"}. Kaj se zgodi s celotnim prihodkom? (primer ${i + 1})`, pravilna: odg, napacne: [odg === "se poveča" ? "se zmanjša" : "se poveča", "ostane enak"], postopek: `<p>Pri ${el ? "elastičnem" : "neelastičnem"} povpraševanju se količina spremeni ${el ? "bolj" : "manj"} kot cena, zato prihodek ${odg}.</p>` });
  });
  pojmi([
    ["cenovna elastičnost povpraševanja", "Odstotna sprememba povpraševane količine ob enoodstotni spremembi cene."],
    ["dohodkovna elastičnost", "Odzivnost povpraševanja na spremembo dohodka."],
    ["križna elastičnost", "Odzivnost povpraševanja po eni dobrini na spremembo cene druge."],
    ["elastično povpraševanje", "Povpraševanje, pri katerem se količina odstotno spremeni bolj kot cena."],
    ["neelastično povpraševanje", "Povpraševanje, pri katerem se količina odstotno spremeni manj kot cena."],
    ["luksuzna dobrina", "Dobrina z dohodkovno elastičnostjo večjo od 1."],
  ]);
  vprasanja([
    [3, "Križna elastičnost med dobrinama je pozitivna. Kakšni sta dobrini?", "nadomestni", ["dopolnilni", "neodvisni", "inferiorni"], "Višja cena ene poveča povpraševanje po drugi."],
    [4, "Zakaj je povpraševanje po insulinu zelo neelastično?", "ker je nujen in nima nadomestkov", ["ker je poceni", "ker je luksuzna dobrina", "ker ga je veliko"], "Nujnost in pomanjkanje nadomestkov zmanjšata elastičnost.", "visja"],
    [4, "Dohodkovna elastičnost dobrine je −0,4. Kakšna je dobrina?", "inferiorna", ["luksuzna", "normalna nujna", "nadomestna"], "Negativna dohodkovna elastičnost: z rastjo dohodka povpraševanje upade.", "visja"],
  ]);
}
