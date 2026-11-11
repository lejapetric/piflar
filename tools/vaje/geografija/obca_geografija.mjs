import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("merilo", 10, (r, i) => {
    const M = r.izberi([10000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000]), cm = r.int(2, 30) / 2, km = (cm * M) / 100000;
    if (i % 2) return kolicina({ tezavnost: 1, vrednost: km, tol: 0.001, enota: "km", besedilo: `Na zemljevidu v merilu 1 : ${M.toLocaleString("sl-SI")} je razdalja ${T(cm, 1)} cm. Kolikšna je dejanska razdalja v km?`, rezultat: `${T(km, 3)} km`, postopek: `<p>\\(${L(cm, 1)}\\ \\text{cm} \\cdot ${M} = ${L(cm * M, 0)}\\ \\text{cm} = ${L(km, 3)}\\ \\text{km}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: cm, tol: 0.001, enota: "cm", besedilo: `Dejanska razdalja med krajema je ${T(km, 3)} km. Koliko cm je to na zemljevidu v merilu 1 : ${M.toLocaleString("sl-SI")}?`, rezultat: `${T(cm, 1)} cm`, postopek: `<p>\\(${L(km, 3)}\\ \\text{km} = ${L(km * 100000, 0)}\\ \\text{cm}\\); \\(\\frac{${L(km * 100000, 0)}}{${M}} = ${L(cm, 1)}\\ \\text{cm}\\)</p>` });
  });
  serija("ploscina-merilo", 4, (r) => {
    const M = r.izberi([10000, 25000, 50000]), cm2 = r.int(1, 20), km2 = (cm2 * M * M) / 1e10;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: km2, tol: 0.001, enota: "km²", besedilo: `Gozd na zemljevidu v merilu 1 : ${M.toLocaleString("sl-SI")} pokriva ${cm2} cm². Kolikšna je njegova dejanska površina v km²?`, rezultat: `${T(km2, 4)} km²`, postopek: `<p>Ploščine se pretvarjajo s kvadratom merila: \\(${cm2} \\cdot ${M}^2\\ \\text{cm}^2 = ${L(km2, 4)}\\ \\text{km}^2\\) (1 km² = 10<sup>10</sup> cm²).</p>` });
  });
  serija("cas", 10, (r, i) => {
    const d1 = r.int(-12, 12) * 15, d2 = r.int(-12, 12) * 15, h = r.int(0, 23);
    if (d1 === d2) return null;
    const raz = (d2 - d1) / 15, h2 = (((h + raz) % 24) + 24) % 24;
    const st = (d) => (d === 0 ? "0°" : `${Math.abs(d)}° ${d > 0 ? "v. g. d." : "z. g. d."}`);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: Math.abs(raz), enota: "h", besedilo: `Kolikšna je razlika v krajevnem (sončnem) času med poldnevnikoma ${st(d1)} in ${st(d2)}?`, rezultat: `${Math.abs(raz)} h`, postopek: `<p>Razlika ${Math.abs(d2 - d1)}°; 15° = 1 h, torej ${Math.abs(raz)} h.</p>` });
    return kolicina({ tezavnost: 3, vrednost: h2, enota: "h", besedilo: `Na poldnevniku ${st(d1)} je ura ${h}.00 (krajevni čas). Koliko je ura na poldnevniku ${st(d2)}? (Vpiši uro od 0 do 23.)`, rezultat: `${h2}.00`, postopek: `<p>Razlika: \\(\\frac{${d2 - d1}°}{15°} = ${raz}\\) h (proti vzhodu je čas kasnejši). \\(${h} ${raz >= 0 ? "+" : "−"} ${Math.abs(raz)} = ${h2}\\) (po modulu 24).</p>` });
  });
  serija("temperatura", 8, (r, i) => {
    const T0 = r.int(5, 30), h0 = r.int(0, 10) * 100, h1 = h0 + r.int(5, 30) * 100, t = T0 - ((h1 - h0) / 100) * 0.6;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: t, tol: 0.001, enota: "°C", besedilo: `V dolini na ${h0} m n. m. je ${T0} °C. Kolikšna je temperatura na vrhu na ${h1} m n. m., če se temperatura zniža za 0,6 °C na 100 m?`, rezultat: `${T(t, 1)} °C`, postopek: `<p>\\(${T0} - \\frac{${h1 - h0}}{100} \\cdot 0{,}6 = ${L(t, 1)}\\ °\\text{C}\\)</p>` });
    const t2 = T0 - ((h1 - h0) / 100) * 1;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: t2, tol: 0.001, enota: "°C", besedilo: `Suh zrak s temperaturo ${T0} °C se dviga ob pobočju z ${h0} m na ${h1} m (suhoadiabatno, 1 °C na 100 m). Kolikšna je njegova temperatura na vrhu?`, rezultat: `${T(t2, 1)} °C`, postopek: `<p>\\(${T0} - \\frac{${h1 - h0}}{100} \\cdot 1 = ${L(t2, 1)}\\ °\\text{C}\\)</p>` });
  });
  serija("gostota", 6, (r) => {
    const P = r.int(1, 500) * 100, N = r.int(1, 300) * 10000, g = N / P;
    return kolicina({ tezavnost: 2, vrednost: g, tol: 0.01, enota: "preb./km²", besedilo: `Država s površino ${P.toLocaleString("sl-SI")} km² ima ${N.toLocaleString("sl-SI")} prebivalcev. Kolikšna je gostota poselitve?`, rezultat: `${T(g, 1)} preb./km²`, postopek: `<p>\\(\\frac{${N}}{${P}} \\approx ${L(g, 1)}\\)</p>` });
  });
  serija("prirastek", 6, (r) => {
    const n = r.int(8, 40), m = r.int(5, 20), sel = r.int(-5, 5), s = n - m + sel;
    return kolicina({ tezavnost: 3, vrednost: s, enota: "‰", besedilo: `Rodnost je ${n} ‰, smrtnost ${m} ‰, selitveni prirastek ${sel} ‰. Kolikšen je skupni prirastek?`, rezultat: `${s} ‰`, postopek: `<p>Naravni prirastek \\(${n} - ${m} = ${n - m}\\) ‰, skupni \\(${n - m} ${sel >= 0 ? "+" : "−"} ${Math.abs(sel)} = ${s}\\) ‰.</p>` });
  });
  serija("vlaga", 5, (r) => {
    const [Tz, nas] = r.izberi([[10, 9.4], [20, 17.3], [30, 30.4], [0, 4.8], [25, 23.0]]), dej = r.int(2, Math.floor(nas)), rel = (dej / nas) * 100;
    return kolicina({ tezavnost: 3, vrednost: rel, tol: 0.01, enota: "%", besedilo: `Pri ${Tz} °C zrak največ vsebuje ${T(nas, 1)} g vodne pare na m³. Dejansko jo vsebuje ${dej} g/m³. Kolikšna je relativna vlažnost?`, rezultat: `${T(rel, 0)} %`, postopek: `<p>\\(\\frac{${dej}}{${L(nas, 1)}} \\cdot 100\\,\\% \\approx ${L(rel, 0)}\\,\\%\\)</p>` });
  });
  serija("relief", 6, (r) => {
    const [d, odg] = r.izberi([["nastanek Alp in Himalaje", "trčenje litosferskih plošč (gubanje)"], ["Islandija in Srednjeatlantski hrbet", "razmikanje plošč"], ["potresi v Kaliforniji ob prelomu San Andreas", "zmično drsenje plošč"], ["Andi in Tihomorski ognjeni obroč", "podrivanje oceanske plošče pod celinsko"], ["vulkani na Havajih", "vroča točka"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kateri proces je povzročil: ${d}?`, pravilna: odg, napacne: ["trčenje litosferskih plošč (gubanje)", "razmikanje plošč", "zmično drsenje plošč", "podrivanje oceanske plošče pod celinsko", "vroča točka"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["poldnevnik", "Namišljena črta, ki povezuje oba tečaja."],
    ["vzporednik", "Namišljena krožnica, vzporedna z ekvatorjem."],
    ["geografska širina", "Kotna oddaljenost kraja od ekvatorja proti severu ali jugu."],
    ["geografska dolžina", "Kotna oddaljenost kraja od začetnega poldnevnika proti vzhodu ali zahodu."],
    ["merilo zemljevida", "Razmerje med razdaljo na zemljevidu in v naravi."],
    ["izohipsa", "Črta, ki povezuje točke z enako nadmorsko višino."],
    ["podnebje", "Povprečno vreme na nekem območju v daljšem obdobju."],
    ["vreme", "Trenutno stanje ozračja."],
    ["erozija", "Odnašanje in razjedanje površja z vodo, vetrom ali ledom."],
    ["kras", "Površje na topnih kamninah s kraškimi pojavi, kot so vrtače in jame."],
    ["urbanizacija", "Širjenje mest in mestnega načina življenja."],
    ["migracija", "Selitev prebivalstva."],
    ["globalizacija", "Povezovanje sveta v gospodarstvu, kulturi in politiki."],
    ["trajnostni razvoj", "Razvoj, ki zadovolji današnje potrebe, ne da bi ogrozil prihodnje generacije."],
  ]);
  vprasanja([
    [2, "Zakaj je na ekvatorju vse leto toplo?", "ker sončni žarki vpadajo skoraj navpično", ["ker je najbližje Soncu", "ker je tam največ oceanov", "ker ni oblakov"], "Večji vpadni kot pomeni več energije na enoto površine."],
    [3, "Kateri dan ima severna polobla najdaljši dan?", "21. junija", ["21. marca", "23. septembra", "21. decembra"], "Ob poletnem solsticiju je Sonce v zenitu nad severnim povratnikom."],
    [4, "Zakaj je zahodna obala Evrope toplejša pozimi kot vzhodna obala Severne Amerike na isti širini?", "zaradi toplega Severnoatlantskega toka in zahodnih vetrov", ["zaradi bližine ekvatorja", "zaradi gorovij", "zaradi vulkanov"], "Topli tok in prevladujoči zahodni vetrovi omilijo zime.", "visja"],
    [4, "Zakaj je privetrna stran gorovja bolj namočena?", "zrak se dviga, ohlaja in vodna para kondenzira", ["ker je bližje morju", "ker je tam več gozda", "zaradi fena na privetrni strani"], "Na zavetrni strani se zrak spušča, segreva in suši (fen).", "visja"],
    [4, "Kaj kaže starostna piramida z ozko osnovo in širokim vrhom?", "staranje prebivalstva in nizko rodnost", ["visoko rodnost", "visoko umrljivost dojenčkov", "mlado prebivalstvo"], "Značilno za razvite države.", "visja"],
  ]);
}
