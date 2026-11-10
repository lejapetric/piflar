import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("tok", 5, (r, i) => {
    const I = r.int(1, 50) / 10, t = r.int(1, 120);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (I * t) / 1.6e-19, tol: 0.02, enota: "", besedilo: `Skozi žico teče tok ${L(I, 1)} A. Koliko elektronov preteče skozi presek v ${t} s? (\\(e = 1{,}6 \\cdot 10^{-19}\\) C; vpiši npr. 3,1e20.)`, rezultat: `\\(${sci((I * t) / 1.6e-19)}\\)`, postopek: `<p>\\(e = It = ${L(I * t, 1)}\\ \\text{C}\\), \\(N = \\frac{It}{e_0} \\approx ${sci((I * t) / 1.6e-19)}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: I * t, enota: "C", besedilo: `Skozi žarnico teče tok ${L(I, 1)} A. Koliko naboja preteče v ${t} s?`, rezultat: `${T(I * t, 1)} C`, postopek: `<p>\\(e = It = ${L(I, 1)} \\cdot ${t} = ${L(I * t, 1)}\\ \\text{C}\\)</p>` });
  });
  serija("ohm", 7, (r, i) => {
    const R = r.int(2, 500), I = r.int(1, 100) / 100, U = R * I;
    const kaj = i % 3;
    if (kaj === 0) return kolicina({ tezavnost: 1, vrednost: U, enota: "V", besedilo: `Skozi upornik z uporom ${R} Ω teče tok ${L(I, 2)} A. Kolikšna je napetost na njem?`, rezultat: `${T(U, 2)} V`, postopek: `<p>\\(U = RI = ${R} \\cdot ${L(I, 2)} = ${L(U, 2)}\\ \\text{V}\\)</p>` });
    if (kaj === 1) return kolicina({ tezavnost: 1, vrednost: I, enota: "A", besedilo: `Na upornik z uporom ${R} Ω priključimo napetost ${L(U, 2)} V. Kolikšen tok teče?`, rezultat: `${T(I, 2)} A`, postopek: `<p>\\(I = \\frac{U}{R} = \\frac{${L(U, 2)}}{${R}} = ${L(I, 2)}\\ \\text{A}\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: R, enota: "Ω", besedilo: `Pri napetosti ${L(U, 2)} V teče skozi porabnik tok ${L(I, 2)} A. Kolikšen je njegov upor?`, rezultat: `${R} Ω`, postopek: `<p>\\(R = \\frac{U}{I} = ${R}\\ \\Omega\\)</p>` });
  });
  serija("upor-zice", 4, (r) => {
    const [ime, z] = r.izberi([["baker", 1.7e-8], ["aluminij", 2.8e-8], ["železo", 1.0e-7], ["konstantan", 4.9e-7]]), l = r.int(1, 200), S = r.int(1, 40) / 10;
    const R = (z * l) / (S * 1e-6);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(R, 6), tol: 0.02, enota: "Ω", besedilo: `Kolikšen je upor ${l} m dolge žice (${ime}, \\(\\zeta = ${sci(z)}\\ \\Omega\\text{m}\\)) s presekom ${L(S, 1)} mm²?`, rezultat: `${T(R, 3)} Ω`, postopek: `<p>\\(R = \\zeta\\frac{l}{S} = ${sci(z)} \\cdot \\frac{${l}}{${L(S, 1)} \\cdot 10^{-6}} \\approx ${L(R, 3)}\\ \\Omega\\)</p>` });
  });
  serija("zaporedna", 5, (r) => {
    const R = Array.from({ length: r.int(2, 3) }, () => r.int(5, 200)), U = r.int(3, 230);
    const Rs = R.reduce((a, b) => a + b), I = U / Rs;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(I, 5), enota: "A", besedilo: `Upornike ${R.join(" Ω, ")} Ω vežemo zaporedno na napetost ${U} V. Kolikšen tok teče?`, rezultat: `${T(I, 3)} A`, postopek: `<p>\\(R = ${R.join(" + ")} = ${Rs}\\ \\Omega\\)</p><p>\\(I = \\frac{U}{R} = \\frac{${U}}{${Rs}} \\approx ${L(I, 3)}\\ \\text{A}\\)</p>` });
  });
  serija("vzporedna", 5, (r) => {
    const R1 = r.int(2, 100), R2 = r.int(2, 100), Rv = (R1 * R2) / (R1 + R2);
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(Rv, 5), enota: "Ω", besedilo: `Kolikšen je nadomestni upor upornikov ${R1} Ω in ${R2} Ω, vezanih vzporedno?`, rezultat: `${T(Rv, 2)} Ω`, postopek: `<p>\\(\\frac1R = \\frac1{${R1}} + \\frac1{${R2}}\\), \\(R = \\frac{${R1} \\cdot ${R2}}{${R1} + ${R2}} \\approx ${L(Rv, 2)}\\ \\Omega\\)</p>` });
  });
  serija("kombinirana", 4, (r) => {
    const R1 = r.int(2, 50), R2 = r.int(5, 100), R3 = r.int(5, 100), U = r.int(6, 48);
    const R = R1 + (R2 * R3) / (R2 + R3), I = U / R;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(I, 5), enota: "A", besedilo: `Upornik ${R1} Ω je vezan zaporedno z vzporedno vezavo upornikov ${R2} Ω in ${R3} Ω. Vezje priključimo na ${U} V. Kolikšen tok teče iz vira?`, rezultat: `${T(I, 3)} A`, postopek: `<p>Vzporedni del: \\(\\frac{${R2} \\cdot ${R3}}{${R2 + R3}} \\approx ${L((R2 * R3) / (R2 + R3), 3)}\\ \\Omega\\); skupaj \\(R \\approx ${L(R, 3)}\\ \\Omega\\).</p><p>\\(I = \\frac{${U}}{${L(R, 3)}} \\approx ${L(I, 3)}\\ \\text{A}\\)</p>` });
  });
  serija("moc", 6, (r, i) => {
    const P = r.izberi([5, 10, 40, 60, 100, 1000, 2000]), U = r.izberi([12, 230]);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: (U * U) / P, enota: "Ω", besedilo: `Žarnica ima oznako ${U} V / ${P} W. Kolikšen je njen upor med delovanjem?`, rezultat: `${T((U * U) / P, 1)} Ω`, postopek: `<p>\\(P = \\frac{U^2}{R}\\), \\(R = \\frac{U^2}{P} = \\frac{${U * U}}{${P}} \\approx ${L((U * U) / P, 1)}\\ \\Omega\\)</p>` });
    return kolicina({ tezavnost: 1, vrednost: P / U, enota: "A", besedilo: `Kolikšen tok teče skozi porabnik z oznako ${U} V / ${P} W?`, rezultat: `${T(P / U, 3)} A`, postopek: `<p>\\(I = \\frac{P}{U} = \\frac{${P}}{${U}} \\approx ${L(P / U, 3)}\\ \\text{A}\\)</p>` });
  });
  serija("energija", 5, (r) => {
    const P = r.int(1, 30) * 100, h = r.int(1, 10), c = r.int(10, 25) / 100;
    const E = (P / 1000) * h;
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(E * c, 4), enota: "€", besedilo: `Grelnik z močjo ${P} W deluje ${h} h. Koliko stane porabljena energija, če je cena ${L(c, 2)} € za kWh?`, rezultat: `${T(E * c, 2)} € (${T(E, 1)} kWh)`, postopek: `<p>\\(W = Pt = ${L(P / 1000, 1)}\\ \\text{kW} \\cdot ${h}\\ \\text{h} = ${L(E, 1)}\\ \\text{kWh}\\)</p><p>Cena: \\(${L(E, 1)} \\cdot ${L(c, 2)} \\approx ${L(E * c, 2)}\\) €</p>` });
  });
  serija("notranji-upor", 4, (r) => {
    const Ug = r.izberi([1.5, 4.5, 9, 12]), Rn = r.int(1, 20) / 10, R = r.int(1, 50);
    const I = Ug / (R + Rn), U = I * R;
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(U, 4), enota: "V", besedilo: `Baterija z gonilno napetostjo ${L(Ug, 1)} V in notranjim uporom ${L(Rn, 1)} Ω je priključena na upornik ${R} Ω. Kolikšna je napetost na sponkah?`, rezultat: `${T(U, 3)} V`, postopek: `<p>\\(I = \\frac{U_g}{R + R_n} = \\frac{${L(Ug, 1)}}{${L(R + Rn, 1)}} \\approx ${L(I, 4)}\\ \\text{A}\\)</p><p>\\(U = IR \\approx ${L(U, 3)}\\ \\text{V}\\)</p>` });
  });
  serija("kratki-stik", 3, (r) => {
    const Ug = r.izberi([1.5, 4.5, 9, 12]), Rn = r.int(1, 20) / 10;
    return kolicina({ tezavnost: 3, vrednost: Ug / Rn, enota: "A", besedilo: `Kolikšen je tok kratkega stika baterije z gonilno napetostjo ${L(Ug, 1)} V in notranjim uporom ${L(Rn, 1)} Ω?`, rezultat: `${T(Ug / Rn, 2)} A`, postopek: `<p>Pri kratkem stiku je zunanji upor 0: \\(I = \\frac{U_g}{R_n} = ${L(Ug / Rn, 2)}\\ \\text{A}\\)</p>` });
  });
  serija("najvecja-moc", 3, (r) => {
    const Ug = r.izberi([6, 9, 12, 24]), Rn = r.int(1, 10);
    const P = (Ug * Ug) / (4 * Rn);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: P, enota: "W", besedilo: `Vir ima gonilno napetost ${Ug} V in notranji upor ${Rn} Ω. Kolikšno največjo moč lahko odda zunanjemu uporniku?`, rezultat: `${T(P, 2)} W (pri \\(R = ${Rn}\\ \\Omega\\))`, postopek: `<p>Moč na zunanjem uporu \\(P = \\frac{U_g^2R}{(R + R_n)^2}\\) je največja pri \\(R = R_n\\).</p><p>\\(P = \\frac{U_g^2}{4R_n} = \\frac{${Ug * Ug}}{${4 * Rn}} = ${L(P, 2)}\\ \\text{W}\\)</p>` });
  });
  serija("delilnik", 3, (r) => {
    const R1 = r.int(1, 100), R2 = r.int(1, 100), U = r.int(5, 30);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi((U * R2) / (R1 + R2), 5), enota: "V", besedilo: `Napetostni delilnik iz upornikov ${R1} Ω in ${R2} Ω je priključen na ${U} V. Kolikšna napetost je na uporniku ${R2} Ω?`, rezultat: `${T((U * R2) / (R1 + R2), 2)} V`, postopek: `<p>\\(U_2 = U\\frac{R_2}{R_1 + R_2} = ${U} \\cdot \\frac{${R2}}{${R1 + R2}} \\approx ${L((U * R2) / (R1 + R2), 2)}\\ \\text{V}\\)</p>` });
  });
  pojmi([
    ["električni tok", "Naboj, ki v časovni enoti preteče skozi presek vodnika."],
    ["upor", "Razmerje med napetostjo na porabniku in tokom skozenj."],
    ["specifični upor", "Snovna lastnost, ki pove upor vodnika z dolžino 1 m in presekom 1 m²."],
    ["gonilna napetost", "Napetost vira, ko iz njega ne teče tok."],
    ["ampermeter", "Merilnik toka, ki ga vežemo zaporedno in ima majhen upor."],
    ["voltmeter", "Merilnik napetosti, ki ga vežemo vzporedno in ima velik upor."],
  ]);
  vprasanja([
    [2, "Kaj velja za tok pri zaporedni vezavi upornikov?", "skozi vse teče enak tok", ["na vseh je enaka napetost", "tok se razdeli", "skozi večji upor teče večji tok"], "Pri zaporedni vezavi ni razvejišč."],
    [2, "Kaj velja za napetost pri vzporedni vezavi?", "na vseh vejah je enaka napetost", ["skozi vse teče enak tok", "napetosti se seštejejo", "na večjem uporu je večja napetost"], "Vse veje so priključene na isti točki."],
  ]);
}
