import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("pretok", 6, (r, i) => {
    const B = r.int(1, 100) / 100, S = r.int(1, 500) / 10000, k = i < 3 ? 0 : r.izberi([30, 45, 60]);
    const Phi = B * S * Math.cos((k * Math.PI) / 180);
    return kolicina({ tezavnost: k ? 2 : 1, vrednost: Phi, tol: 0.01, enota: "Vs", besedilo: `Kolikšen magnetni pretok gre skozi zanko s ploščino ${L(S * 10000, 0)} cm² v polju ${L(B, 2)} T${k ? `, če normala zanke oklepa s silnicami kot ${k}°` : ", pravokotno na ravnino zanke"}?`, rezultat: `\\(${sci(Phi)}\\) Vs`, postopek: `<p>\\(\\Phi = BS${k ? "\\cos\\varphi" : ""} = ${L(B, 2)} \\cdot ${sci(S)}${k ? ` \\cdot \\cos ${k}°` : ""} \\approx ${sci(Phi)}\\ \\text{Vs}\\)</p>` });
  });
  serija("faraday", 7, (r, i) => {
    const N = r.int(1, 500), dB = r.int(1, 100) / 100, S = r.int(1, 200) / 10000, t = r.int(1, 50) / 100;
    const U = (N * dB * S) / t;
    return kolicina({ tezavnost: i < 3 ? 2 : 3, vrednost: U, tol: 0.01, enota: "V", besedilo: `Tuljava z ${N} ovoji in ploščino ${L(S * 10000, 0)} cm² je v magnetnem polju, katerega gostota se v ${L(t, 2)} s enakomerno spremeni za ${L(dB, 2)} T. Kolikšna napetost se inducira?`, rezultat: `${T(U, 3)} V`, postopek: `<p>\\(U_i = N\\frac{\\Delta\\Phi}{\\Delta t} = N\\frac{S\\Delta B}{\\Delta t} = ${N} \\cdot \\frac{${sci(S)} \\cdot ${L(dB, 2)}}{${L(t, 2)}} \\approx ${L(U, 3)}\\ \\text{V}\\)</p>` });
  });
  serija("palica", 6, (r, i) => {
    const B = r.int(1, 100) / 100, l = r.int(10, 100) / 100, v = r.int(1, 20);
    const U = B * l * v;
    if (i % 2) {
      const R = r.int(1, 20);
      return kolicina({ tezavnost: 3, vrednost: zaokrozi(U / R, 6), enota: "A", besedilo: `Kovinska palica dolžine ${L(l * 100, 0)} cm drsi s hitrostjo ${v} m/s po tračnicah, pravokotno na polje ${L(B, 2)} T. Tračnici sta povezani z upornikom ${R} Ω. Kolikšen tok teče?`, rezultat: `${T(U / R, 3)} A`, postopek: `<p>\\(U_i = Blv = ${L(U, 3)}\\ \\text{V}\\), \\(I = \\frac{U_i}{R} \\approx ${L(U / R, 3)}\\ \\text{A}\\)</p>` });
    }
    return kolicina({ tezavnost: 2, vrednost: zaokrozi(U, 6), enota: "V", besedilo: `Palica dolžine ${L(l * 100, 0)} cm se giblje s hitrostjo ${v} m/s pravokotno na magnetno polje ${L(B, 2)} T. Kolikšna napetost se inducira med njenima koncema?`, rezultat: `${T(U, 3)} V`, postopek: `<p>\\(U_i = Blv = ${L(B, 2)} \\cdot ${L(l, 2)} \\cdot ${v} = ${L(U, 3)}\\ \\text{V}\\)</p>` });
  });
  serija("generator", 4, (r) => {
    const N = r.int(10, 500), S = r.int(10, 400) / 10000, B = r.int(1, 50) / 100, nu = r.izberi([10, 25, 50]);
    const U0 = N * S * B * 2 * Math.PI * nu;
    return kolicina({ tezavnost: 3, vrednost: U0, tol: 0.01, enota: "V", besedilo: `Tuljava generatorja (${N} ovojev, ploščina ${L(S * 10000, 0)} cm²) se vrti s frekvenco ${nu} Hz v polju ${L(B, 2)} T. Kolikšna je amplituda inducirane napetosti?`, rezultat: `${T(U0, 1)} V`, postopek: `<p>\\(U_0 = NSB\\omega = ${N} \\cdot ${sci(S)} \\cdot ${L(B, 2)} \\cdot 2\\pi \\cdot ${nu} \\approx ${L(U0, 1)}\\ \\text{V}\\)</p>` });
  });
  serija("transformator", 7, (r, i) => {
    const N1 = r.int(1, 40) * 50, N2 = r.int(1, 40) * 10, U1 = r.izberi([230, 400, 12, 1000]);
    const U2 = (U1 * N2) / N1;
    if (i % 2) {
      const I2 = r.int(1, 50) / 10;
      return kolicina({ tezavnost: 2, vrednost: zaokrozi((I2 * N2) / N1, 6), enota: "A", besedilo: `Idealni transformator ima ${N1} primarnih in ${N2} sekundarnih ovojev. V sekundarnem krogu teče tok ${L(I2, 1)} A. Kolikšen tok teče v primarnem?`, rezultat: `${T((I2 * N2) / N1, 3)} A`, postopek: `<p>Pri idealnem transformatorju \\(U_1I_1 = U_2I_2\\), torej \\(\\frac{I_1}{I_2} = \\frac{N_2}{N_1}\\).</p><p>\\(I_1 = ${L(I2, 1)} \\cdot \\frac{${N2}}{${N1}} \\approx ${L((I2 * N2) / N1, 3)}\\ \\text{A}\\)</p>` });
    }
    return kolicina({ tezavnost: 1, vrednost: zaokrozi(U2, 6), enota: "V", besedilo: `Transformator ima ${N1} ovojev na primarni in ${N2} na sekundarni strani. Primarna napetost je ${U1} V. Kolikšna je sekundarna?`, rezultat: `${T(U2, 2)} V`, postopek: `<p>\\(\\frac{U_2}{U_1} = \\frac{N_2}{N_1}\\), \\(U_2 = ${U1} \\cdot \\frac{${N2}}{${N1}} \\approx ${L(U2, 2)}\\ \\text{V}\\)</p>` });
  });
  serija("efektivna", 5, (r, i) => {
    const U0 = r.int(10, 500);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: U0 * Math.SQRT2, enota: "V", besedilo: `Efektivna vrednost izmenične napetosti je ${U0} V. Kolikšna je amplituda?`, rezultat: `${T(U0 * Math.SQRT2, 1)} V`, postopek: `<p>\\(U_0 = \\sqrt2 U_{ef} = \\sqrt2 \\cdot ${U0} \\approx ${L(U0 * Math.SQRT2, 1)}\\ \\text{V}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: U0 / Math.SQRT2, enota: "V", besedilo: `Amplituda izmenične napetosti je ${U0} V. Kolikšna je efektivna vrednost?`, rezultat: `${T(U0 / Math.SQRT2, 1)} V`, postopek: `<p>\\(U_{ef} = \\frac{U_0}{\\sqrt2} \\approx ${L(U0 / Math.SQRT2, 1)}\\ \\text{V}\\)</p>` });
  });
  serija("induktivnost", 4, (r) => {
    const Lh = r.int(1, 500) / 1000, dI = r.int(1, 20), t = r.int(1, 100) / 1000;
    return kolicina({ tezavnost: 3, vrednost: (Lh * dI) / t, enota: "V", besedilo: `Skozi tuljavo z induktivnostjo ${L(Lh * 1000, 0)} mH se tok v ${L(t * 1000, 0)} ms enakomerno spremeni za ${dI} A. Kolikšna je samoinducirana napetost?`, rezultat: `${T((Lh * dI) / t, 2)} V`, postopek: `<p>\\(U_i = L\\frac{\\Delta I}{\\Delta t} = ${L(Lh, 3)} \\cdot \\frac{${dI}}{${L(t, 3)}} \\approx ${L((Lh * dI) / t, 2)}\\ \\text{V}\\)</p>` });
  });
  serija("energija-tuljave", 3, (r) => {
    const Lh = r.int(1, 500) / 1000, I = r.int(1, 20);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: 0.5 * Lh * I * I, enota: "J", besedilo: `Koliko energije je shranjene v magnetnem polju tuljave z induktivnostjo ${L(Lh * 1000, 0)} mH, po kateri teče tok ${I} A?`, rezultat: `${T(0.5 * Lh * I * I, 3)} J`, postopek: `<p>\\(W = \\frac{LI^2}{2} = \\frac{${L(Lh, 3)} \\cdot ${I * I}}{2} = ${L(0.5 * Lh * I * I, 3)}\\ \\text{J}\\)</p>` });
  });
  serija("daljnovod", 3, (r) => {
    const P = r.int(1, 50) * 1e5, R = r.int(1, 20), U1 = r.izberi([10e3, 20e3]), U2 = r.izberi([110e3, 220e3, 400e3]);
    const P1 = (P / U1) ** 2 * R, P2 = (P / U2) ** 2 * R;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(P1 / P2, 4), enota: "", besedilo: `Po daljnovodu z uporom ${R} Ω prenašamo moč \\(${sci(P)}\\) W. Kolikokrat manjše so izgube, če namesto pri ${U1 / 1000} kV prenašamo pri ${U2 / 1000} kV?`, rezultat: `${T(P1 / P2, 1)}-krat`, postopek: `<p>\\(I = \\frac{P}{U}\\), izgube \\(P_{izg} = I^2R \\propto \\frac{1}{U^2}\\).</p><p>Razmerje: \\(\\left(\\frac{${U2 / 1000}}{${U1 / 1000}}\\right)^2 \\approx ${L(P1 / P2, 1)}\\)</p>` });
  });
  serija("lenz", 4, (r) => {
    const [opis, odg, nap] = r.izberi([
      ["Severni pol magneta približujemo zanki. Kakšen pol nastane na strani zanke, ki je obrnjena proti magnetu?", "severni (zanka magnet odbija)", ["južni (zanka magnet privlači)", "noben, tok ne teče", "odvisno od hitrosti"]],
      ["Severni pol magneta oddaljujemo od zanke. Kakšen pol nastane na bližnji strani zanke?", "južni (zanka magnet privlači)", ["severni (zanka magnet odbija)", "noben, tok ne teče", "odvisno od hitrosti"]],
      ["Magnet miruje v zanki. Ali teče induciran tok?", "ne, ker se pretok ne spreminja", ["da, dokler je magnet v zanki", "da, a le kratek čas", "odvisno od moči magneta"]],
      ["Kaj pravi Lenzovo pravilo?", "induciran tok nasprotuje spremembi, ki ga je povzročila", ["induciran tok je vedno v smeri urinega kazalca", "induciran tok podpira spremembo pretoka", "induciran tok je neodvisen od spremembe pretoka"]],
    ]);
    return izbira({ r, tezavnost: 3, besedilo: opis, pravilna: odg, napacne: nap, postopek: `<p>Lenzovo pravilo: induciran tok ima tako smer, da njegovo magnetno polje nasprotuje spremembi pretoka. ${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["magnetni pretok", "Produkt gostote magnetnega polja in ploščine, ki jo silnice prebadajo pravokotno."],
    ["elektromagnetna indukcija", "Nastanek napetosti v zanki, skozi katero se spreminja magnetni pretok."],
    ["samoindukcija", "Indukcija napetosti v tuljavi zaradi spremembe toka v isti tuljavi."],
    ["induktivnost", "Razmerje med magnetnim pretokom skozi tuljavo in tokom, ki ga povzroča."],
    ["transformator", "Naprava, ki z indukcijo spreminja izmenično napetost."],
    ["vrtinčni tokovi", "Inducirani tokovi v masivnih kovinskih delih, ki jih segrevajo in zavirajo gibanje."],
  ]);
}
