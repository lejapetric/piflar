import { kolicina, izbira, besedilo, T, L } from "../lib.mjs";
import { ELEMENTI, E, F } from "../kemija-lib.mjs";

const IONI = [["Na", 1], ["Mg", 2], ["Al", 3], ["Cl", -1], ["O", -2], ["S", -2], ["K", 1], ["Ca", 2], ["F", -1], ["N", -3], ["Fe", 3], ["Fe", 2], ["Cu", 2], ["Br", -1], ["Li", 1]];
const IZOTOPI = [["C", 12], ["C", 14], ["O", 16], ["O", 18], ["Cl", 35], ["Cl", 37], ["U", 235], ["U", 238], ["H", 2], ["H", 3], ["Na", 23], ["Fe", 56], ["K", 40], ["Ca", 40]];
const ZU = { U: 92 };
const konf = (Z) => { const l = [2, 8, 8, 2]; const o = []; let z = Z; for (const k of l) { if (z <= 0) break; o.push(Math.min(k, z)); z -= k; } return o; };

export default function ({ serija, pojmi, vprasanja }) {
  serija("izotop", 10, (r, i) => {
    const [s, A] = r.izberi(IZOTOPI), Z = E[s]?.Z ?? ZU[s], kaj = ["protonov", "nevtronov", "elektronov"][i % 3];
    const v = kaj === "nevtronov" ? A - Z : Z;
    return kolicina({ tezavnost: 1, vrednost: v, enota: "", besedilo: `Koliko ${kaj} ima atom \\(^{${A}}_{${Z}}\\text{${s}}\\)?`, rezultat: `${v}`, postopek: `<p>Vrstno število \\(Z = ${Z}\\) je število protonov (in elektronov v nevtralnem atomu). Masno število \\(A = ${A}\\); nevtronov je \\(A - Z = ${A - Z}\\).</p>` });
  });
  serija("ion", 8, (r) => {
    const [s, q] = r.izberi(IONI), Z = E[s].Z, e = Z - q;
    const ionF = `${s}${q === 1 ? "^+" : q === -1 ? "^-" : `^${Math.abs(q)}${q > 0 ? "+" : "-"}`}`;
    return kolicina({ tezavnost: 2, vrednost: e, enota: "", besedilo: `Koliko elektronov ima ion ${F(ionF)}?`, rezultat: `${e}`, postopek: `<p>Atom ${s} ima ${Z} elektronov. ${q > 0 ? `Kation z nabojem ${q}+ je oddal ${q}` : `Anion z nabojem ${-q}− je sprejel ${-q}`} ${Math.abs(q) === 1 ? "elektron" : "elektrona"}: \\(${Z} ${q > 0 ? "-" : "+"} ${Math.abs(q)} = ${e}\\).</p>` });
  });
  serija("valencni", 8, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI.filter(([, , z]) => z <= 20)), k = konf(Z), v = k.at(-1);
    return kolicina({ tezavnost: 2, vrednost: v, enota: "", besedilo: `Koliko valenčnih elektronov ima atom elementa ${ime} (${s}, \\(Z = ${Z}\\))?`, rezultat: `${v}`, postopek: `<p>Razporeditev elektronov po lupinah: ${k.join(", ")}. Na zunanji lupini so ${v} elektroni.</p>` });
  });
  serija("lupine", 6, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI.filter(([, , z]) => z <= 20)), k = konf(Z);
    const prav = k.join(", "), nap = new Set([[...k.slice(0, -1), k.at(-1) + 1].join(", "), [Z].join(", "), konf(Z + 1).join(", "), konf(Math.max(1, Z - 1)).join(", "), [2, Z - 2].join(", ")]);
    nap.delete(prav);
    return izbira({ r, tezavnost: 2, besedilo: `Kako so razporejeni elektroni po lupinah v atomu ${ime} (${s}, \\(Z = ${Z}\\))?`, pravilna: prav, napacne: [...nap].slice(0, 3), postopek: `<p>Lupine zapolnjujemo od notranje navzven: K (2), L (8), M (8 do kalcija), N … Za \\(Z = ${Z}\\): ${prav}.</p>` });
  });
  serija("konfiguracija", 6, (r) => {
    const [s, ime, Z] = r.izberi(ELEMENTI.filter(([, , z]) => z >= 3 && z <= 20));
    const or = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2]];
    let z = Z; const del = [];
    for (const [o, k] of or) { if (z <= 0) break; del.push(`${o}<sup>${Math.min(k, z)}</sup>`); z -= k; }
    return besedilo({ tezavnost: 3, sprejemljivi: [del.join("").replace(/<\/?sup>/g, ""), del.join(" ").replace(/<\/?sup>/g, "")], besedilo: `Zapiši elektronsko konfiguracijo atoma ${ime} (${s}, \\(Z = ${Z}\\)). (Zapis brez nadpisanih številk, npr. 1s2 2s2 2p3.)`, rezultat: del.join(" "), postopek: `<p>Orbitale zapolnjujemo po vrsti 1s, 2s, 2p, 3s, 3p, 4s …: ${del.join(" ")}.</p>` });
  });
  serija("povprecna-masa", 4, (r) => {
    const [s, a1, a2, p1] = r.izberi([["Cl", 35, 37, 75.8], ["Cu", 63, 65, 69.2], ["B", 10, 11, 19.9], ["Br", 79, 81, 50.7], ["Li", 6, 7, 7.6], ["Ga", 69, 71, 60.1]]);
    const Ar = (a1 * p1 + a2 * (100 - p1)) / 100;
    return kolicina({ tezavnost: 3, vrednost: Ar, tol: 0.002, enota: "", besedilo: `Element ${s} ima izotopa z masnima številoma ${a1} (${L(p1, 1).replace("{,}", ",")} %) in ${a2} (${L(100 - p1, 1).replace("{,}", ",")} %). Izračunaj približno povprečno relativno atomsko maso.`, rezultat: `${T(Ar, 2)}`, postopek: `<p>\\(A_r = ${a1} \\cdot ${L(p1 / 100, 3)} + ${a2} \\cdot ${L(1 - p1 / 100, 3)} \\approx ${L(Ar, 2)}\\)</p>` });
  });
  serija("visja-delez", 3, (r) => {
    const [s, a1, a2, Ar] = r.izberi([["Cl", 35, 37, 35.45], ["Cu", 63, 65, 63.55], ["B", 10, 11, 10.81], ["Ga", 69, 71, 69.72]]);
    const x = (a2 - Ar) / (a2 - a1);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: x * 100, tol: 0.01, enota: "%", besedilo: `Element ${s} ima izotopa z masnima številoma ${a1} in ${a2}, povprečna relativna atomska masa je ${L(Ar, 2).replace("{,}", ",")}. Kolikšen je delež lažjega izotopa?`, rezultat: `${T(x * 100, 1)} %`, postopek: `<p>\\(${a1}x + ${a2}(1 - x) = ${L(Ar, 2)}\\), \\(x = \\frac{${a2} - ${L(Ar, 2)}}{${a2 - a1}} \\approx ${L(x, 3)}\\)</p>` });
  });
  pojmi([
    ["atom", "Najmanjši delec elementa, ki ohrani njegove kemijske lastnosti."],
    ["proton", "Pozitivno nabit delec v atomskem jedru."],
    ["nevtron", "Električno nevtralen delec v atomskem jedru."],
    ["elektron", "Negativno nabit delec v elektronski ovojnici."],
    ["vrstno število", "Število protonov v jedru, ki določa element."],
    ["masno število", "Vsota protonov in nevtronov v jedru."],
    ["izotopi", "Atomi istega elementa z različnim številom nevtronov."],
    ["orbitala", "Območje okoli jedra, kjer je verjetnost, da najdemo elektron, velika."],
    ["kation", "Pozitivno nabit ion, ki nastane z oddajo elektronov."],
    ["anion", "Negativno nabit ion, ki nastane s sprejemom elektronov."],
    ["molekula", "Skupina atomov, povezanih s kovalentnimi vezmi."],
  ]);
}
