import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { F, molska } from "../kemija-lib.mjs";
const lg = Math.log10;

export default function ({ serija, pojmi, vprasanja }) {
  serija("pH-mocna-kislina", 7, (r, i) => {
    const e = r.int(1, 6), m = r.izberi([1, 2, 5]), c = m * 10 ** -e, pH = -lg(c);
    const [k, ime] = r.izberi([["HCl", "klorovodikove kisline"], ["HNO3", "dušikove(V) kisline"]]);
    return kolicina({ tezavnost: 1, vrednost: zaokrozi(pH, 4), tol: 0.02, enota: "", besedilo: `Kolikšen je pH raztopine ${ime} s koncentracijo \\(${sci(c)}\\) mol/L?`, rezultat: `pH = ${T(pH, 2)}`, postopek: `<p>Močna kislina popolnoma protolizira: \\([\\text{H}_3\\text{O}^+] = ${sci(c)}\\ \\text{mol/L}\\).</p><p>\\(\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] \\approx ${L(pH, 2)}\\)</p>` });
  });
  serija("pH-mocna-baza", 6, (r, i) => {
    const e = r.int(1, 5), m = r.izberi([1, 2, 5]), c = m * 10 ** -e, z = i % 3 === 2 ? 2 : 1, pOH = -lg(c * z), pH = 14 - pOH;
    const [b, ime] = z === 2 ? ["Ba(OH)2", "barijevega hidroksida"] : r.izberi([["NaOH", "natrijevega hidroksida"], ["KOH", "kalijevega hidroksida"]]);
    return kolicina({ tezavnost: z === 2 ? 3 : 2, vrednost: zaokrozi(pH, 4), tol: 0.02, enota: "", besedilo: `Kolikšen je pH raztopine ${ime} (${F(b)}) s koncentracijo \\(${sci(c)}\\) mol/L?`, rezultat: `pH = ${T(pH, 2)}`, postopek: `<p>\\([\\text{OH}^-] = ${z === 2 ? "2 \\cdot " : ""}${sci(c)} = ${sci(c * z)}\\ \\text{mol/L}\\), \\(\\text{pOH} \\approx ${L(pOH, 2)}\\)</p><p>\\(\\text{pH} = 14 - \\text{pOH} \\approx ${L(pH, 2)}\\)</p>` });
  });
  serija("konc-iz-pH", 6, (r, i) => {
    const pH = r.int(10, 130) / 10;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: 10 ** -(14 - pH), tol: 0.02, enota: "mol/L", besedilo: `pH raztopine je ${T(pH, 1)}. Kolikšna je koncentracija hidroksidnih ionov? (vpiši npr. 3,2e-5)`, rezultat: `\\(${sci(10 ** -(14 - pH))}\\) mol/L`, postopek: `<p>\\(\\text{pOH} = 14 - ${L(pH, 1)} = ${L(14 - pH, 1)}\\), \\([\\text{OH}^-] = 10^{-${L(14 - pH, 1)}} \\approx ${sci(10 ** -(14 - pH))}\\ \\text{mol/L}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: 10 ** -pH, tol: 0.02, enota: "mol/L", besedilo: `pH raztopine je ${T(pH, 1)}. Kolikšna je koncentracija oksonijevih ionov? (vpiši npr. 3,2e-5)`, rezultat: `\\(${sci(10 ** -pH)}\\) mol/L`, postopek: `<p>\\([\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}} = 10^{-${L(pH, 1)}} \\approx ${sci(10 ** -pH)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("sibka-kislina", 6, (r, i) => {
    const [ime, Ka] = r.izberi([["ocetna kislina", 1.8e-5], ["mravljinčna kislina", 1.8e-4], ["fluorovodikova kislina", 6.8e-4], ["cianovodikova kislina", 6.2e-10], ["benzojska kislina", 6.3e-5]]);
    const c = r.izberi([0.01, 0.05, 0.1, 0.2, 0.5, 1]), x = Math.sqrt(Ka * c), pH = -lg(x);
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: (x / c) * 100, tol: 0.03, enota: "%", besedilo: `Kolikšna je stopnja protolize ${ime === "ocetna kislina" ? "ocetne kisline" : ime.replace("na kislina", "ne kisline")} (\\(K_a = ${sci(Ka)}\\)) s koncentracijo ${T(c, 2)} mol/L?`, rezultat: `${T((x / c) * 100, 2)} %`, postopek: `<p>\\([\\text{H}_3\\text{O}^+] \\approx \\sqrt{K_ac} = ${sci(x)}\\ \\text{mol/L}\\)</p><p>\\(\\alpha = \\frac{${sci(x)}}{${L(c, 2)}} \\approx ${L((x / c) * 100, 2)}\\,\\%\\)</p>` });
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(pH, 4), tol: 0.02, enota: "", besedilo: `Kolikšen je pH raztopine šibke kisline (${ime}, \\(K_a = ${sci(Ka)}\\)) s koncentracijo ${T(c, 2)} mol/L?`, rezultat: `pH = ${T(pH, 2)}`, postopek: `<p>Za šibko kislino: \\([\\text{H}_3\\text{O}^+] \\approx \\sqrt{K_a c} = \\sqrt{${sci(Ka)} \\cdot ${L(c, 2)}} \\approx ${sci(x)}\\)</p><p>\\(\\text{pH} \\approx ${L(pH, 2)}\\)</p>` });
  });
  serija("pufer", 5, (r) => {
    const [ime, Ka] = r.izberi([["ocetna kislina / acetat", 1.8e-5], ["amonijev ion / amoniak", 5.6e-10], ["dihidrogenfosfat / hidrogenfosfat", 6.2e-8]]);
    const ca = r.int(1, 10) / 10, cb = r.int(1, 10) / 10, pH = -lg(Ka) + lg(cb / ca);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(pH, 4), tol: 0.02, enota: "", besedilo: `Pufer (${ime}) vsebuje kislino s koncentracijo ${T(ca, 1)} mol/L in konjugirano bazo s koncentracijo ${T(cb, 1)} mol/L. \\(K_a = ${sci(Ka)}\\). Kolikšen je pH?`, rezultat: `pH = ${T(pH, 2)}`, postopek: `<p>Henderson-Hasselbalchova enačba: \\(\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{baza}]}{[\\text{kislina}]}\\)</p><p>\\(\\text{pH} = ${L(-lg(Ka), 2)} + \\log\\frac{${L(cb, 1)}}{${L(ca, 1)}} \\approx ${L(pH, 2)}\\)</p>` });
  });
  serija("Ksp", 5, (r, i) => {
    const [f, ime, Ksp, a, b] = r.izberi([["AgCl", "srebrov klorid", 1.8e-10, 1, 1], ["BaSO4", "barijev sulfat", 1.1e-10, 1, 1], ["CaF2", "kalcijev fluorid", 3.9e-11, 1, 2], ["PbI2", "svinčev(II) jodid", 7.1e-9, 1, 2], ["AgBr", "srebrov bromid", 5.0e-13, 1, 1]]);
    const s = a === 1 && b === 1 ? Math.sqrt(Ksp) : Math.cbrt(Ksp / 4);
    return kolicina({ tezavnost: b === 2 ? 4 : 3, raven: b === 2 ? "visja" : "osnovna", vrednost: s, tol: 0.02, enota: "mol/L", besedilo: `Topnostni produkt snovi ${F(f)} (${ime}) je \\(${sci(Ksp)}\\). Kolikšna je njena molska topnost v vodi?`, rezultat: `\\(${sci(s)}\\) mol/L`, postopek: b === 2 ? `<p>\\(K_{sp} = s \\cdot (2s)^2 = 4s^3\\), \\(s = \\sqrt[3]{\\frac{${sci(Ksp)}}{4}} \\approx ${sci(s)}\\ \\text{mol/L}\\)</p>` : `<p>\\(K_{sp} = s^2\\), \\(s = \\sqrt{${sci(Ksp)}} \\approx ${sci(s)}\\ \\text{mol/L}\\)</p>` });
  });
  serija("nevtralizacija", 5, (r) => {
    const ca = r.int(1, 10) / 10, Va = r.int(10, 50), cb = r.int(1, 10) / 10;
    const Vb = (ca * Va) / cb;
    return kolicina({ tezavnost: 2, vrednost: Vb, tol: 0.01, enota: "mL", besedilo: `Koliko mL raztopine NaOH s koncentracijo ${T(cb, 1)} mol/L potrebujemo za nevtralizacijo ${Va} mL HCl s koncentracijo ${T(ca, 1)} mol/L?`, rezultat: `${T(Vb, 1)} mL`, postopek: `<p>\\(n(\\text{HCl}) = n(\\text{NaOH})\\), \\(V_b = \\frac{c_aV_a}{c_b} = \\frac{${L(ca, 1)} \\cdot ${Va}}{${L(cb, 1)}} = ${L(Vb, 1)}\\ \\text{mL}\\)</p>` });
  });
  serija("presezek", 4, (r) => {
    const ca = 0.1, Va = r.int(10, 40), cb = 0.1, Vb = r.int(5, 60);
    if (Va === Vb) return null;
    const n = Math.abs(ca * Va - cb * Vb) / 1000, c = n / ((Va + Vb) / 1000), pH = Va > Vb ? -lg(c) : 14 + lg(c);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(pH, 4), tol: 0.02, enota: "", besedilo: `Zmešamo ${Va} mL HCl in ${Vb} mL NaOH, obe s koncentracijo 0,1 mol/L. Kolikšen je pH dobljene raztopine?`, rezultat: `pH = ${T(pH, 2)}`, postopek: `<p>V presežku je ${Va > Vb ? "kislina" : "baza"}: \\(n = |${Va} - ${Vb}| \\cdot 10^{-4} = ${sci(n)}\\ \\text{mol}\\) v \\(${Va + Vb}\\) mL.</p><p>\\(c = ${sci(c)}\\ \\text{mol/L}\\), pH \\(\\approx ${L(pH, 2)}\\)</p>` });
  });
  serija("konjugirani", 5, (r) => {
    const [k, b] = r.izberi([["HCl", "Cl^-"], ["H2O", "OH^-"], ["NH4^+", "NH3"], ["H2SO4", "HSO4^-"], ["HSO4^-", "SO4^2-"], ["H3O^+", "H2O"], ["CH3COOH", "CH3COO^-"], ["H2CO3", "HCO3^-"]]);
    const vse = ["Cl^-", "OH^-", "NH3", "HSO4^-", "SO4^2-", "H2O", "CH3COO^-", "HCO3^-", "O^2-", "H3O^+"].filter((x) => x !== b);
    return izbira({ r, tezavnost: 2, besedilo: `Katera je konjugirana baza kisline ${F(k)}?`, pravilna: F(b), napacne: r.premesaj(vse).slice(0, 3).map(F), postopek: `<p>Konjugirana baza nastane, ko kislina odda proton: ${F(k)} → ${F(b)} + H<sup>+</sup>.</p>` });
  });
  serija("hidroliza", 4, (r) => {
    const [s, odg, raz] = r.izberi([["NaCl", "nevtralna", "sol močne kisline in močne baze"], ["CH3COONa", "bazična", "acetatni ion je šibka baza"], ["NH4Cl", "kisla", "amonijev ion je šibka kislina"], ["Na2CO3", "bazična", "karbonatni ion je baza"], ["KNO3", "nevtralna", "sol močne kisline in močne baze"], ["AlCl3", "kisla", "hidratiziran Al³⁺ je kislina"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kakšna je vodna raztopina soli ${F(s)}?`, pravilna: odg, napacne: ["kisla", "bazična", "nevtralna"].filter((x) => x !== odg), postopek: `<p>${raz.charAt(0).toUpperCase() + raz.slice(1)}, zato je raztopina ${odg}.</p>` });
  });
  pojmi([
    ["kislina po Brønstedu", "Delec, ki odda proton.", { brezVpisa: true }],
    ["baza po Brønstedu", "Delec, ki sprejme proton.", { brezVpisa: true }],
    ["amfoterna snov", "Snov, ki lahko deluje kot kislina ali kot baza, npr. voda."],
    ["pufer", "Raztopina, ki ob dodatku malo kisline ali baze ohranja skoraj enak pH."],
    ["ionski produkt vode", "Produkt koncentracij oksonijevih in hidroksidnih ionov, pri 25 °C \\(10^{-14}\\).", { brezVpisa: true }],
    ["topnostni produkt", "Konstanta ravnotežja med trdno slabo topno snovjo in njenimi ioni v nasičeni raztopini."],
    ["indikator", "Snov, ki spremeni barvo v odvisnosti od pH."],
    ["protoliza", "Reakcija, pri kateri se prenese proton s kisline na bazo."],
  ]);
}
