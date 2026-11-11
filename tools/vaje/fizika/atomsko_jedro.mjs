import { kolicina, izbira, besedilo, T, L, sci, zaokrozi } from "../lib.mjs";
const NUK = [["C", 6, 14], ["U", 92, 238], ["U", 92, 235], ["Ra", 88, 226], ["Po", 84, 210], ["Co", 27, 60], ["I", 53, 131], ["K", 19, 40], ["Pb", 82, 206], ["Rn", 86, 222], ["Th", 90, 232], ["Sr", 38, 90], ["Cs", 55, 137]];
const SIMB = { 2: "He", 6: "C", 7: "N", 19: "K", 20: "Ca", 27: "Co", 28: "Ni", 38: "Sr", 39: "Y", 53: "I", 54: "Xe", 55: "Cs", 56: "Ba", 82: "Pb", 83: "Bi", 84: "Po", 86: "Rn", 88: "Ra", 90: "Th", 91: "Pa", 92: "U", 18: "Ar", 26: "Fe", 25: "Mn", 81: "Tl", 51: "Sb", 52: "Te", 37: "Rb", 36: "Kr", 89: "Ac", 87: "Fr", 85: "At", 5: "B" };
const nuk = (s, Z, A) => `\\(^{${A}}_{${Z}}\\text{${s}}\\)`;

export default function ({ serija, pojmi, vprasanja }) {
  serija("sestava", 8, (r, i) => {
    const [s, Z, A] = r.izberi(NUK), kaj = ["protonov", "nevtronov", "nukleonov"][i % 3];
    const v = kaj === "protonov" ? Z : kaj === "nevtronov" ? A - Z : A;
    return kolicina({ tezavnost: 1, vrednost: v, enota: "", besedilo: `Koliko ${kaj} ima jedro ${nuk(s, Z, A)}?`, rezultat: `${v}`, postopek: `<p>Spodnje število je vrstno (protonsko) število \\(Z = ${Z}\\), zgornje masno (nukleonsko) \\(A = ${A}\\); nevtronov je \\(N = A - Z = ${A - Z}\\).</p>` });
  });
  serija("alfa", 5, (r) => {
    const [s, Z, A] = r.izberi(NUK.filter(([, z]) => z > 80));
    const Zn = Z - 2, An = A - 4;
    return izbira({ r, tezavnost: 2, besedilo: `Kateri nuklid nastane pri razpadu alfa jedra ${nuk(s, Z, A)}?`, pravilna: nuk(SIMB[Zn] ?? "X", Zn, An), napacne: [nuk(SIMB[Z - 1] ?? "X", Z - 1, A), nuk(SIMB[Z + 1] ?? "X", Z + 1, A), nuk(SIMB[Z - 2] ?? "X", Z - 2, A - 2)], postopek: `<p>Pri razpadu alfa jedro odda \\(^4_2\\text{He}\\): \\(Z\\) se zmanjša za 2, \\(A\\) za 4.</p><p>${nuk(s, Z, A)} \\(\\to\\) ${nuk(SIMB[Zn] ?? "X", Zn, An)} + \\(^4_2\\text{He}\\)</p>` });
  });
  serija("beta", 5, (r) => {
    const [s, Z, A] = r.izberi(NUK.filter(([, z]) => SIMB[z + 1]));
    return izbira({ r, tezavnost: 2, besedilo: `Kateri nuklid nastane pri razpadu beta minus jedra ${nuk(s, Z, A)}?`, pravilna: nuk(SIMB[Z + 1], Z + 1, A), napacne: [nuk(SIMB[Z - 1] ?? "X", Z - 1, A), nuk(SIMB[Z - 2] ?? "X", Z - 2, A - 4), nuk(s, Z, A - 1)], postopek: `<p>Pri razpadu \\(\\beta^-\\) se nevtron pretvori v proton, elektron in antinevtrino: \\(Z\\) se poveča za 1, \\(A\\) ostane.</p>` });
  });
  serija("razpolovni", 8, (r, i) => {
    const t12 = r.int(1, 30), n = r.int(1, 6), N0 = r.int(1, 64) * 100;
    if (i % 3 === 0) return kolicina({ tezavnost: 2, vrednost: N0 / 2 ** n, enota: "", besedilo: `Vzorec vsebuje ${N0} radioaktivnih jeder z razpolovnim časom ${t12} dni. Koliko jih ostane po ${n * t12} dneh?`, rezultat: `${T(N0 / 2 ** n, 2)}`, postopek: `<p>Pretečejo ${n} razpolovni časi: \\(N = N_0 \\cdot 2^{-${n}} = \\frac{${N0}}{${2 ** n}} = ${L(N0 / 2 ** n, 2)}\\)</p>` });
    if (i % 3 === 1) return kolicina({ tezavnost: 2, vrednost: 100 / 2 ** n, enota: "%", besedilo: `Kolikšen odstotek radioaktivnih jeder ostane po ${n} razpolovnih časih?`, rezultat: `${T(100 / 2 ** n, 3)} %`, postopek: `<p>\\(\\frac{N}{N_0} = 2^{-${n}} = ${L(1 / 2 ** n, 5)}\\)</p>` });
    const t = r.int(1, 100), N = N0 * 2 ** (-t / t12);
    return kolicina({ tezavnost: 3, vrednost: zaokrozi(N, 3), tol: 0.01, enota: "", besedilo: `Vzorec vsebuje ${N0} radioaktivnih jeder z razpolovnim časom ${t12} dni. Koliko jih ostane po ${t} dneh?`, rezultat: `${T(N, 1)}`, postopek: `<p>\\(N = N_0 \\cdot 2^{-t/t_{1/2}} = ${N0} \\cdot 2^{-${t}/${t12}} \\approx ${L(N, 1)}\\)</p>` });
  });
  serija("aktivnost", 4, (r) => {
    const t12 = r.int(1, 30) * 86400, N = r.int(1, 100) * 1e15, lam = Math.LN2 / t12, A = lam * N;
    return kolicina({ tezavnost: 3, vrednost: A, tol: 0.01, enota: "Bq", besedilo: `Vzorec vsebuje \\(${sci(N)}\\) jeder z razpolovnim časom ${t12 / 86400} dni. Kolikšna je njegova aktivnost? (vpiši npr. 4,2e10)`, rezultat: `\\(${sci(A)}\\) Bq`, postopek: `<p>\\(\\lambda = \\frac{\\ln 2}{t_{1/2}} = \\frac{0{,}693}{${t12}\\ \\text{s}} \\approx ${sci(lam)}\\ \\text{s}^{-1}\\)</p><p>\\(A = \\lambda N \\approx ${sci(A)}\\ \\text{Bq}\\)</p>` });
  });
  serija("datacija", 4, (r) => {
    const f = r.izberi([50, 25, 12.5, 40, 70, 80, 30]), t = 5730 * Math.log2(100 / f);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(t, 0), tol: 0.01, enota: "let", besedilo: `V lesenem predmetu je še ${L(f, 1)} % prvotne količine \\(^{14}\\text{C}\\) (\\(t_{1/2} = 5730\\) let). Koliko je star?`, rezultat: `${T(t, 0)} let`, postopek: `<p>\\(\\frac{N}{N_0} = 2^{-t/t_{1/2}}\\), \\(t = t_{1/2}\\log_2\\frac{N_0}{N} = 5730 \\cdot \\log_2 \\frac{100}{${L(f, 1)}} \\approx ${L(t, 0)}\\) let</p>` });
  });
  serija("einstein", 5, (r, i) => {
    const dm = r.int(1, 100) / 1000, E = dm * 1.66e-27 * 9e16;
    if (i % 2) {
      const m = r.int(1, 100) / 1000;
      return kolicina({ tezavnost: 2, vrednost: m * 9e16, tol: 0.01, enota: "J", besedilo: `Koliko energije ustreza masi ${L(m * 1000, 0)} g? (\\(c = 3 \\cdot 10^8\\) m/s; vpiši npr. 9e13)`, rezultat: `\\(${sci(m * 9e16)}\\) J`, postopek: `<p>\\(E = mc^2 = ${sci(m)} \\cdot 9 \\cdot 10^{16} = ${sci(m * 9e16)}\\ \\text{J}\\)</p>` });
    }
    return kolicina({ tezavnost: 3, vrednost: E / 1.6e-13, tol: 0.01, enota: "MeV", besedilo: `Pri jedrski reakciji se masa zmanjša za ${L(dm, 3)} u. Koliko energije se sprosti v MeV? (\\(1\\ \\text{u} = 1{,}66 \\cdot 10^{-27}\\) kg)`, rezultat: `${T(E / 1.6e-13, 2)} MeV`, postopek: `<p>\\(E = \\Delta mc^2 = ${L(dm, 3)} \\cdot 1{,}66 \\cdot 10^{-27} \\cdot 9 \\cdot 10^{16} \\approx ${sci(E)}\\ \\text{J} = ${L(E / 1.6e-13, 2)}\\ \\text{MeV}\\)</p><p>(Ali krajše: \\(1\\ \\text{u} \\cdot c^2 \\approx 931\\ \\text{MeV}\\).)</p>` });
  });
  serija("vezavna", 3, (r) => {
    const [s, Z, A, m] = r.izberi([["He", 2, 4, 4.002603], ["C", 6, 12, 12.0], ["O", 8, 16, 15.994915], ["Fe", 26, 56, 55.934937]]);
    const dm = Z * 1.007825 + (A - Z) * 1.008665 - m, E = dm * 931.5;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: zaokrozi(E / A, 4), tol: 0.01, enota: "MeV", besedilo: `Izračunaj vezavno energijo na nukleon za ${nuk(s, Z, A)} (masa atoma ${L(m, 6)} u, \\(m_H = 1{,}007825\\) u, \\(m_n = 1{,}008665\\) u, \\(1\\ \\text{u}c^2 = 931{,}5\\) MeV).`, rezultat: `${T(E / A, 2)} MeV/nukleon`, postopek: `<p>\\(\\Delta m = ${Z} \\cdot 1{,}007825 + ${A - Z} \\cdot 1{,}008665 - ${L(m, 6)} \\approx ${L(dm, 6)}\\ \\text{u}\\)</p><p>\\(W_v = ${L(dm, 6)} \\cdot 931{,}5 \\approx ${L(E, 1)}\\ \\text{MeV}\\), na nukleon \\(${L(E / A, 2)}\\ \\text{MeV}\\)</p>` });
  });
  serija("reakcija", 4, (r) => {
    const [zac, del, odg, raz] = r.izberi([
      ["\\(^{14}_{7}\\text{N} + {}^4_2\\text{He} \\to {}^{17}_{8}\\text{O} + \\, ?\\)", "?", "\\(^1_1\\text{p}\\)", "Masno število: 14 + 4 = 17 + 1; vrstno: 7 + 2 = 8 + 1."],
      ["\\(^{9}_{4}\\text{Be} + {}^4_2\\text{He} \\to {}^{12}_{6}\\text{C} + \\, ?\\)", "?", "\\(^1_0\\text{n}\\)", "13 = 12 + 1, 6 = 6 + 0: nevtron."],
      ["\\(^{235}_{92}\\text{U} + {}^1_0\\text{n} \\to {}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + \\, ?\\)", "?", "\\(3\\,^1_0\\text{n}\\)", "236 = 141 + 92 + 3; 92 = 56 + 36: trije nevtroni."],
      ["\\(^{2}_{1}\\text{H} + {}^3_1\\text{H} \\to {}^{4}_{2}\\text{He} + \\, ?\\)", "?", "\\(^1_0\\text{n}\\)", "5 = 4 + 1, 2 = 2 + 0: nevtron."],
    ]);
    return izbira({ r, tezavnost: 3, besedilo: `Kateri delec manjka v reakciji ${zac}?`, pravilna: odg, napacne: ["\\(^1_1\\text{p}\\)", "\\(^1_0\\text{n}\\)", "\\(3\\,^1_0\\text{n}\\)", "\\(^0_{-1}\\text{e}\\)", "\\(^4_2\\text{He}\\)"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>Ohranjata se masno in vrstno število. ${raz}</p>` });
  });
  pojmi([
    ["izotop", "Atom istega elementa z drugačnim številom nevtronov."],
    ["razpolovni čas", "Čas, v katerem razpade polovica radioaktivnih jeder."],
    ["žarki alfa", "Jedra helija, ki jih ustavi že list papirja."],
    ["žarki gama", "Visokoenergijski fotoni, ki jih izseva vzbujeno jedro."],
    ["jedrska cepitev", "Razpad težkega jedra na dve lažji ob sprostitvi energije in nevtronov."],
    ["jedrsko zlivanje", "Združevanje lahkih jeder v težja, vir energije zvezd."],
    ["masni defekt", "Razlika med vsoto mas prostih nukleonov in maso jedra."],
    ["aktivnost", "Število razpadov v sekundi; merimo jo v becquerelih."],
  ]);
}
