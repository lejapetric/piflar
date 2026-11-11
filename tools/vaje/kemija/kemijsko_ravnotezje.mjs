import { kolicina, izbira, T, L, sci, zaokrozi } from "../lib.mjs";
import { F } from "../kemija-lib.mjs";

const RAV = [
  // [enačba, reaktanti [[k, f]], produkti [[k,f]], ΔH znak, plini levo, plini desno]
  [[[1, "N2"], [3, "H2"]], [[2, "NH3"]], -1, 4, 2],
  [[[2, "SO2"], [1, "O2"]], [[2, "SO3"]], -1, 3, 2],
  [[[1, "H2"], [1, "I2"]], [[2, "HI"]], 1, 2, 2],
  [[[1, "N2O4"]], [[2, "NO2"]], 1, 1, 2],
  [[[1, "CO"], [1, "H2O"]], [[1, "CO2"], [1, "H2"]], -1, 2, 2],
  [[[1, "PCl5"]], [[1, "PCl3"], [1, "Cl2"]], 1, 1, 2],
  [[[2, "NO"], [1, "O2"]], [[2, "NO2"]], -1, 3, 2],
];
const zap = (s) => s.map(([k, f]) => `${k > 1 ? k + " " : ""}${F(f)}`).join(" + ");
const en = (e) => `${zap(e[0])} ⇌ ${zap(e[1])}`;
const izraz = (e) => `\\(K_c = \\frac{${e[1].map(([k, f]) => `[\\text{${f}}]${k > 1 ? `^{${k}}` : ""}`).join("")}}{${e[0].map(([k, f]) => `[\\text{${f}}]${k > 1 ? `^{${k}}` : ""}`).join("")}}\\)`;

export default function ({ serija, pojmi, vprasanja }) {
  serija("izraz", 7, (r) => {
    const e = r.izberi(RAV), prav = izraz(e);
    const obrni = `\\(K_c = \\frac{${e[0].map(([k, f]) => `[\\text{${f}}]${k > 1 ? `^{${k}}` : ""}`).join("")}}{${e[1].map(([k, f]) => `[\\text{${f}}]${k > 1 ? `^{${k}}` : ""}`).join("")}}\\)`;
    const brez = `\\(K_c = \\frac{${e[1].map(([, f]) => `[\\text{${f}}]`).join("")}}{${e[0].map(([, f]) => `[\\text{${f}}]`).join("")}}\\)`;
    const vsota = `\\(K_c = \\frac{${e[1].map(([k, f]) => `${k > 1 ? k : ""}[\\text{${f}}]`).join(" + ")}}{${e[0].map(([k, f]) => `${k > 1 ? k : ""}[\\text{${f}}]`).join(" + ")}}\\)`;
    const nap = [...new Set([obrni, brez, vsota])].filter((x) => x !== prav);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri je izraz za konstanto ravnotežja reakcije ${en(e)}?`, pravilna: prav, napacne: nap, postopek: `<p>Produkti v števcu, reaktanti v imenovalcu, koncentracije potenciramo s stehiometrijskimi koeficienti.</p>` });
  });
  serija("izracun-K", 8, (r) => {
    const e = r.izberi(RAV), konc = {};
    for (const [, f] of [...e[0], ...e[1]]) konc[f] = r.int(1, 30) / 10;
    const K = e[1].reduce((s, [k, f]) => s * konc[f] ** k, 1) / e[0].reduce((s, [k, f]) => s * konc[f] ** k, 1);
    return kolicina({ tezavnost: 2, vrednost: K, tol: 0.01, enota: "", besedilo: `V ravnotežju reakcije ${en(e)} so koncentracije: ${Object.entries(konc).map(([f, c]) => `[${F(f)}] = ${T(c, 1)} mol/L`).join(", ")}. Izračunaj \\(K_c\\).`, rezultat: `${T(K, 3)}`, postopek: `<p>${izraz(e)}</p><p>\\(K_c = \\frac{${e[1].map(([k, f]) => `${L(konc[f], 1)}${k > 1 ? `^{${k}}` : ""}`).join(" \\cdot ")}}{${e[0].map(([k, f]) => `${L(konc[f], 1)}${k > 1 ? `^{${k}}` : ""}`).join(" \\cdot ")}} \\approx ${L(K, 3)}\\)</p>` });
  });
  serija("chatelier", 10, (r) => {
    const e = r.izberi(RAV), kaj = r.izberi(["T+", "T-", "p+", "p-", "R+", "P-", "kat"]);
    let odg, raz;
    if (kaj === "kat") { odg = "ne premakne se"; raz = "Katalizator ne vpliva na lego ravnotežja."; }
    else if (kaj === "R+") { odg = "v desno (proti produktom)"; raz = "Sistem porablja dodani reaktant."; }
    else if (kaj === "P-") { odg = "v desno (proti produktom)"; raz = "Sistem nadomešča odvzeti produkt."; }
    else if (kaj[0] === "T") {
      const desno = (kaj === "T+") === (e[2] > 0);
      odg = desno ? "v desno (proti produktom)" : "v levo (proti reaktantom)";
      raz = `Reakcija v desno je ${e[2] > 0 ? "endotermna" : "eksotermna"}; ${kaj === "T+" ? "pri segrevanju se ravnotežje premakne v endotermno smer" : "pri ohlajanju se premakne v eksotermno smer"}.`;
    } else {
      if (e[3] === e[4]) { odg = "ne premakne se"; raz = "Na obeh straneh je enako število molov plinov."; }
      else { const desno = (kaj === "p+") === (e[4] < e[3]); odg = desno ? "v desno (proti produktom)" : "v levo (proti reaktantom)"; raz = `${kaj === "p+" ? "Pri večjem tlaku se ravnotežje premakne na stran z manj" : "Pri manjšem tlaku se premakne na stran z več"} moli plinov (levo ${e[3]}, desno ${e[4]}).`; }
    }
    const opis = { "T+": "zvišamo temperaturo", "T-": "znižamo temperaturo", "p+": "povečamo tlak (zmanjšamo prostornino)", "p-": "zmanjšamo tlak", "R+": `dodamo ${F(e[0][0][1])}`, "P-": `odvzemamo ${F(e[1][0][1])}`, kat: "dodamo katalizator" }[kaj];
    return izbira({ r, tezavnost: kaj[0] === "T" || kaj[0] === "p" ? 3 : 2, besedilo: `Za ravnotežje ${en(e)} velja \\(\\Delta H ${e[2] > 0 ? "> 0" : "< 0"}\\). Kam se premakne ravnotežje, če ${opis}?`, pravilna: odg, napacne: ["v desno (proti produktom)", "v levo (proti reaktantom)", "ne premakne se"].filter((x) => x !== odg), postopek: `<p>Le Chatelierjevo načelo: sistem se odzove tako, da zmanjša učinek motnje. ${raz}</p>` });
  });
  serija("ravnotezne-konc", 5, (r) => {
    // A + B ⇌ C, začetne a, b, nastane x
    const a = r.int(5, 30) / 10, b = r.int(5, 30) / 10, x = r.int(1, Math.min(a, b) * 10 - 1) / 10;
    const K = x / ((a - x) * (b - x));
    return kolicina({ tezavnost: 3, vrednost: K, tol: 0.01, enota: "", besedilo: `Za reakcijo A + B ⇌ C sta začetni koncentraciji [A] = ${T(a, 1)} mol/L in [B] = ${T(b, 1)} mol/L, C ni. V ravnotežju je [C] = ${T(x, 1)} mol/L. Izračunaj \\(K_c\\).`, rezultat: `${T(K, 3)}`, postopek: `<p>V ravnotežju: [A] = ${T(a - x, 1)}, [B] = ${T(b - x, 1)}, [C] = ${T(x, 1)} mol/L.</p><p>\\(K_c = \\frac{${L(x, 1)}}{${L(a - x, 1)} \\cdot ${L(b - x, 1)}} \\approx ${L(K, 3)}\\)</p>` });
  });
  serija("Q-primerjava", 5, (r) => {
    const K = r.int(1, 100) / 10, Q = r.int(1, 100) / 10;
    if (Q === K) return null;
    const odg = Q < K ? "v desno (nastaja več produktov)" : "v levo (nastaja več reaktantov)";
    return izbira({ r, tezavnost: 3, besedilo: `Konstanta ravnotežja je \\(K_c = ${L(K, 1)}\\), trenutni reakcijski kvocient pa \\(Q = ${L(Q, 1)}\\). V katero smer poteka reakcija?`, pravilna: odg, napacne: ["v desno (nastaja več produktov)", "v levo (nastaja več reaktantov)", "sistem je v ravnotežju"].filter((x) => x !== odg), postopek: `<p>${Q < K ? "Q < K: produktov je premalo" : "Q > K: produktov je preveč"}, zato reakcija poteka ${odg}.</p>` });
  });
  serija("obrnjena", 4, (r, i) => {
    const K = r.int(2, 200) / 10;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: K * K, tol: 0.01, enota: "", besedilo: `Konstanta ravnotežja reakcije je \\(K = ${L(K, 1)}\\). Kolikšna je konstanta, če vse koeficiente v enačbi podvojimo?`, rezultat: `${T(K * K, 2)}`, postopek: `<p>Pri podvojitvi koeficientov se eksponenti podvojijo: \\(K' = K^2 = ${L(K * K, 2)}\\).</p>` });
    return kolicina({ tezavnost: 3, vrednost: 1 / K, tol: 0.01, enota: "", besedilo: `Konstanta ravnotežja reakcije v desno je \\(K = ${L(K, 1)}\\). Kolikšna je konstanta obratne reakcije?`, rezultat: `${T(1 / K, 4)}`, postopek: `<p>\\(K_{obr} = \\frac{1}{K} = \\frac{1}{${L(K, 1)}} \\approx ${L(1 / K, 4)}\\)</p>` });
  });
  serija("visja-x", 4, (r) => {
    // H2 + I2 ⇌ 2HI, začetno c obeh, K → 2x/(c-x) = sqrt K
    const c = r.int(1, 10) / 10, K = r.izberi([4, 9, 16, 25, 36, 49, 64]), s = Math.sqrt(K), x = (s * c) / (2 + s);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: 2 * x, tol: 0.01, enota: "mol/L", besedilo: `Za reakcijo ${F("H2")} + ${F("I2")} ⇌ 2 HI je \\(K_c = ${K}\\). Začetni koncentraciji vodika in joda sta ${T(c, 1)} mol/L. Kolikšna je ravnotežna koncentracija HI?`, rezultat: `${T(2 * x, 3)} mol/L`, postopek: `<p>\\(K_c = \\frac{(2x)^2}{(${L(c, 1)} - x)^2}\\), korenimo: \\(\\frac{2x}{${L(c, 1)} - x} = ${s}\\).</p><p>\\(x = \\frac{${s} \\cdot ${L(c, 1)}}{2 + ${s}} \\approx ${L(x, 4)}\\), \\([\\text{HI}] = 2x \\approx ${L(2 * x, 3)}\\ \\text{mol/L}\\)</p>` });
  });
  pojmi([
    ["kemijsko ravnotežje", "Stanje, ko sta hitrosti reakcije v obe smeri enaki in se koncentracije ne spreminjajo."],
    ["dinamično ravnotežje", "Ravnotežje, v katerem reakciji v obe smeri še vedno potekata."],
    ["konstanta ravnotežja", "Razmerje produkta ravnotežnih koncentracij produktov in reaktantov, potenciranih s koeficienti."],
    ["Le Chatelierjevo načelo", "Sistem v ravnotežju se na motnjo odzove tako, da njen učinek zmanjša.", { brezVpisa: true }],
    ["reakcijski kvocient", "Izraz enake oblike kot konstanta ravnotežja, a s trenutnimi koncentracijami."],
    ["reverzibilna reakcija", "Reakcija, ki lahko poteka v obe smeri."],
  ]);
  vprasanja([
    [3, "Kako vpliva povečanje temperature na konstanto ravnotežja eksotermne reakcije?", "zmanjša se", ["poveča se", "ostane enaka", "postane nič"], "Pri segrevanju se ravnotežje premakne v endotermno smer, proti reaktantom."],
    [2, "Ali je pri \\(K \\gg 1\\) v ravnotežju več produktov ali reaktantov?", "več produktov", ["več reaktantov", "enako", "ni mogoče reči"], "Velika konstanta pomeni, da so v števcu velike koncentracije."],
  ]);
}
