import { izbira, kolicina, besedilo, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("bin-dec", 8, (r) => {
    const n = r.int(5, 255), b = n.toString(2);
    return kolicina({ tezavnost: 1, vrednost: n, enota: "", besedilo: `Pretvori dvojiško število ${b}<sub>2</sub> v desetiško.`, rezultat: `${n}`, postopek: `<p>${[...b].map((c, i) => (c === "1" ? `2^${b.length - 1 - i}` : null)).filter(Boolean).map((x) => `\\(${x}\\)`).join(" + ")} = ${n}</p>` });
  });
  serija("dec-bin", 8, (r) => {
    const n = r.int(5, 255), b = n.toString(2);
    return besedilo({ tezavnost: 2, sprejemljivi: [b, b.padStart(8, "0")], besedilo: `Pretvori desetiško število ${n} v dvojiški zapis.`, rezultat: `${b}<sub>2</sub>`, postopek: `<p>Zaporedno delimo z 2 in beremo ostanke od spodaj navzgor: ${b}.</p>` });
  });
  serija("hex", 8, (r, i) => {
    const n = r.int(16, 4095), h = n.toString(16).toUpperCase();
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: n, enota: "", besedilo: `Pretvori šestnajstiško število ${h}<sub>16</sub> v desetiško.`, rezultat: `${n}`, postopek: `<p>${[...h].map((c, k) => `${parseInt(c, 16)} \\cdot 16^{${h.length - 1 - k}}`).map((x) => `\\(${x}\\)`).join(" + ")} = ${n}</p>` });
    return besedilo({ tezavnost: 3, sprejemljivi: [h, h.toLowerCase()], besedilo: `Pretvori desetiško število ${n} v šestnajstiški zapis.`, rezultat: `${h}<sub>16</sub>`, postopek: `<p>Zaporedno delimo s 16 (A = 10, …, F = 15): ${h}.</p>` });
  });
  serija("bin-hex", 6, (r) => {
    const n = r.int(16, 255), b = n.toString(2).padStart(8, "0"), h = n.toString(16).toUpperCase();
    return besedilo({ tezavnost: 2, sprejemljivi: [h, h.toLowerCase(), h.padStart(2, "0")], besedilo: `Pretvori dvojiško število ${b}<sub>2</sub> v šestnajstiški zapis.`, rezultat: `${h}<sub>16</sub>`, postopek: `<p>Razdelimo na četvorke: ${b.slice(0, 4)} | ${b.slice(4)} → ${parseInt(b.slice(0, 4), 2).toString(16).toUpperCase()} | ${parseInt(b.slice(4), 2).toString(16).toUpperCase()}</p>` });
  });
  serija("sestevanje", 6, (r) => {
    const a = r.int(5, 120), b = r.int(5, 120), s = (a + b).toString(2);
    return besedilo({ tezavnost: 3, sprejemljivi: [s], besedilo: `Seštej dvojiški števili ${a.toString(2)} + ${b.toString(2)}. Rezultat zapiši dvojiško.`, rezultat: `${s}<sub>2</sub>`, postopek: `<p>\\(${a} + ${b} = ${a + b}\\), dvojiško ${s}.</p>` });
  });
  serija("dvojiski-komplement", 6, (r) => {
    const n = -r.int(1, 128), b = ((n + 256) & 255).toString(2).padStart(8, "0");
    return besedilo({ tezavnost: 4, raven: "visja", sprejemljivi: [b], besedilo: `Zapiši število ${n} v 8-bitnem dvojiškem komplementu.`, rezultat: b, postopek: `<p>\\(${-n}\\) = ${(-n).toString(2).padStart(8, "0")}; obrnemo bite in prištejemo 1 (ali \\(256 - ${-n} = ${256 + n}\\)): ${b}.</p>` });
  });
  serija("slika", 8, (r, i) => {
    const [w, h] = r.izberi([[640, 480], [800, 600], [1024, 768], [1280, 720], [1920, 1080], [320, 240]]), bpp = r.izberi([1, 8, 16, 24, 32]);
    const B = (w * h * bpp) / 8;
    if (i % 3 === 2) return kolicina({ tezavnost: 2, vrednost: 2 ** bpp, enota: "", besedilo: `Koliko različnih barv lahko prikažemo, če za vsako točko uporabimo ${bpp} ${bpp === 1 ? "bit" : "bitov"}?`, rezultat: `${2 ** bpp}`, postopek: `<p>\\(2^{${bpp}} = ${2 ** bpp}\\)</p>` });
    return kolicina({ tezavnost: 2, vrednost: B / 1024, tol: 0.01, enota: "KiB", besedilo: `Kolikšna je velikost nestisnjene rastrske slike ${w} × ${h} točk z barvno globino ${bpp} ${bpp === 1 ? "bit" : "bitov"} v KiB (1 KiB = 1024 B)?`, rezultat: `${T(B / 1024, 1)} KiB`, postopek: `<p>\\(${w} \\cdot ${h} \\cdot ${bpp}\\ \\text{bit} = ${L(w * h * bpp, 0)}\\ \\text{bit} = ${L(B, 0)}\\ \\text{B}\\)</p><p>\\(\\frac{${L(B, 0)}}{1024} \\approx ${L(B / 1024, 1)}\\ \\text{KiB}\\)</p>` });
  });
  serija("zvok", 7, (r) => {
    const fs = r.izberi([8000, 22050, 44100, 48000]), b = r.izberi([8, 16, 24]), k = r.izberi([1, 2]), t = r.int(5, 240), B = (fs * b * k * t) / 8;
    return kolicina({ tezavnost: 3, vrednost: B / 1e6, tol: 0.01, enota: "MB", besedilo: `Koliko MB (1 MB = 10<sup>6</sup> B) zasede nestisnjen zvočni posnetek dolžine ${t} s, s frekvenco vzorčenja ${fs} Hz, ločljivostjo ${b} bitov in ${k === 1 ? "enim kanalom (mono)" : "dvema kanaloma (stereo)"}?`, rezultat: `${T(B / 1e6, 2)} MB`, postopek: `<p>\\(${fs} \\cdot ${b} \\cdot ${k} \\cdot ${t} / 8 = ${L(B, 0)}\\ \\text{B} \\approx ${L(B / 1e6, 2)}\\ \\text{MB}\\)</p>` });
  });
  serija("video", 4, (r) => {
    const [w, h] = r.izberi([[640, 480], [1280, 720], [1920, 1080]]), fps = r.izberi([24, 25, 30, 60]), t = r.int(1, 10), B = (w * h * 3 * fps * t);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: B / 1e9, tol: 0.01, enota: "GB", besedilo: `Koliko GB (10<sup>9</sup> B) zasede ${t} s nestisnjenega videa ${w} × ${h} točk, 24-bitne barve in ${fps} sličic na sekundo (brez zvoka)?`, rezultat: `${T(B / 1e9, 3)} GB`, postopek: `<p>Ena sličica: \\(${w} \\cdot ${h} \\cdot 3\\ \\text{B} = ${L(w * h * 3, 0)}\\ \\text{B}\\)</p><p>\\(\\cdot ${fps} \\cdot ${t} = ${L(B, 0)}\\ \\text{B} \\approx ${L(B / 1e9, 3)}\\ \\text{GB}\\)</p>` });
  });
  serija("stiskanje", 5, (r) => {
    const a = r.int(2, 50) * 10, k = r.izberi([2, 4, 5, 8, 10]);
    return kolicina({ tezavnost: 2, vrednost: a / k, tol: 0.01, enota: "MB", besedilo: `Datoteko velikosti ${a} MB stisnemo z razmerjem stiskanja ${k} : 1. Kolikšna je velikost stisnjene datoteke?`, rezultat: `${T(a / k, 1)} MB`, postopek: `<p>\\(\\frac{${a}}{${k}} = ${L(a / k, 1)}\\ \\text{MB}\\)</p>` });
  });
  serija("format", 6, (r) => {
    const [f, odg] = r.izberi([["JPEG", "stisnjena rastrska slika z izgubami"], ["PNG", "rastrska slika, stisnjena brez izgub"], ["SVG", "vektorska slika"], ["MP3", "stisnjen zvok z izgubami"], ["WAV", "nestisnjen zvok"], ["MP4", "video posnetek"], ["HTML", "spletna stran"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kaj navadno vsebuje datoteka formata ${f}?`, pravilna: odg, napacne: r.premesaj(["stisnjena rastrska slika z izgubami", "rastrska slika, stisnjena brez izgub", "vektorska slika", "stisnjen zvok z izgubami", "nestisnjen zvok", "video posnetek", "spletna stran"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${f}: ${odg}.</p>` });
  });
  pojmi([
    ["rastrska slika", "Slika, sestavljena iz mreže slikovnih točk (pikslov)."],
    ["vektorska slika", "Slika, opisana z geometrijskimi liki, ki jo lahko povečamo brez izgube kakovosti."],
    ["barvna globina", "Število bitov za zapis barve ene slikovne točke."],
    ["ločljivost", "Število slikovnih točk v vodoravni in navpični smeri."],
    ["RGB", "Barvni model, ki barve sestavlja iz rdeče, zelene in modre svetlobe."],
    ["CMYK", "Barvni model za tisk iz cijan, magenta, rumene in črne."],
    ["frekvenca vzorčenja", "Število vzorcev zvočnega signala v sekundi."],
    ["stiskanje z izgubami", "Stiskanje, pri katerem del podatkov trajno izgubimo."],
    ["stiskanje brez izgub", "Stiskanje, pri katerem lahko izvorne podatke popolnoma obnovimo."],
    ["HTML", "Označevalni jezik za zgradbo spletnih strani."],
    ["CSS", "Jezik za določanje videza spletnih strani."],
    ["dvojiški komplement", "Način zapisa negativnih celih števil v računalniku."],
    ["plavajoča vejica", "Zapis realnih števil z mantiso in eksponentom."],
  ]);
  vprasanja([
    [3, "Koliko bajtov je 1 KiB?", { vpis: ["1024"] }, [], "1 KiB = 2<sup>10</sup> B = 1024 B."],
    [3, "Kateri je največji nepredznačeni celoštevilski zapis z 8 biti?", { vpis: ["255"] }, [], "2<sup>8</sup> − 1 = 255."],
    [4, "Kateri je obseg števil v 8-bitnem dvojiškem komplementu?", "od −128 do 127", ["od 0 do 255", "od −127 do 127", "od −256 do 255"], "Z n biti: od −2<sup>n−1</sup> do 2<sup>n−1</sup> − 1.", "visja"],
    [4, "Zakaj seštevek 0,1 + 0,2 v računalniku ni točno 0,3?", "ker 0,1 v dvojiškem zapisu nima končnega zapisa", ["ker procesor napačno sešteva", "ker se vejica izgubi", "ker je 0,3 iracionalno število"], "Dvojiški ulomki zapišejo le vsote potenc 1/2.", "visja"],
    [4, "Kakšen je Nyquistov pogoj za vzorčenje zvoka?", "frekvenca vzorčenja mora biti vsaj dvakrat večja od najvišje frekvence signala", ["frekvenca vzorčenja mora biti enaka frekvenci signala", "vzorčimo enkrat na sekundo", "ločljivost mora biti 16 bitov"], "Zato CD uporablja 44,1 kHz za zvok do ≈ 20 kHz.", "visja"],
  ]);
}
