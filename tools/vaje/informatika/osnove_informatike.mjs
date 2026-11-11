import { izbira, kolicina, besedilo, T, L } from "../lib.mjs";

const bitov = (n) => Math.ceil(Math.log2(n));

export default function ({ serija, pojmi, vprasanja }) {
  serija("bitov-za-znake", 10, (r) => {
    const [kaj, n] = r.izberi([["črk slovenske abecede (25)", 25], ["števk 0–9", 10], ["dni v tednu", 7], ["mesecev v letu", 12], ["različnih stanj semaforja (3)", 3], ["igralnih kart (52)", 52], ["dijakov v razredu (30)", 30], [`različnih simbolov (${r.int(33, 1000)})`, 0]]);
    const N = n || Number(kaj.match(/\d+/)[0]), b = bitov(N);
    return kolicina({ tezavnost: 2, vrednost: b, enota: "bit", besedilo: `Koliko bitov najmanj potrebujemo za enolično kodiranje ${kaj}, če ima vsaka koda enako dolžino?`, rezultat: `${b} bitov`, postopek: `<p>Iščemo najmanjši \\(n\\), za katerega je \\(2^n \\ge ${N}\\): \\(2^{${b - 1}} = ${2 ** (b - 1)} < ${N} \\le 2^{${b}} = ${2 ** b}\\), torej \\(n = ${b}\\).</p>` });
  });
  serija("koliko-kod", 6, (r) => {
    const n = r.int(2, 16);
    return kolicina({ tezavnost: 1, vrednost: 2 ** n, enota: "", besedilo: `Koliko različnih kod lahko zapišemo z ${n} biti?`, rezultat: `${2 ** n}`, postopek: `<p>\\(2^{${n}} = ${2 ** n}\\)</p>` });
  });
  serija("hamming", 8, (r) => {
    const a = Array.from({ length: 8 }, () => r.int(0, 1)), b = a.map((x) => (r.int(0, 3) === 0 ? 1 - x : x)), d = a.filter((x, i) => x !== b[i]).length;
    return kolicina({ tezavnost: 2, vrednost: d, enota: "", besedilo: `Kolikšna je Hammingova razdalja med kodama ${a.join("")} in ${b.join("")}?`, rezultat: `${d}`, postopek: `<p>Preštejemo mesta, kjer se kodi razlikujeta: ${d}.</p>` });
  });
  serija("pariteta", 8, (r, i) => {
    const a = Array.from({ length: 7 }, () => r.int(0, 1)), en = a.filter((x) => x).length, sod = i % 2 === 0;
    const p = sod ? en % 2 : 1 - (en % 2);
    return besedilo({ tezavnost: 2, sprejemljivi: [String(p)], besedilo: `Podatku ${a.join("")} dodamo paritetni bit za ${sod ? "sodo" : "liho"} pariteto. Kateri bit (0 ali 1) dodamo?`, rezultat: `${p}`, postopek: `<p>Število enic: ${en}. Pri ${sod ? "sodi" : "lihi"} pariteti mora biti skupno število enic ${sod ? "sodo" : "liho"}, zato dodamo ${p}.</p>` });
  });
  serija("ascii", 8, (r, i) => {
    const veliko = r.izberi([true, false]), k = r.int(0, 25), c = String.fromCharCode((veliko ? 65 : 97) + k);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: c.charCodeAt(0), enota: "", besedilo: `Koda ASCII črke »A« je 65, črke »a« pa 97. Kolikšna je koda ASCII znaka »${c}«?`, rezultat: `${c.charCodeAt(0)}`, postopek: `<p>Črke si sledijo po abecedi: \\(${veliko ? 65 : 97} + ${k} = ${c.charCodeAt(0)}\\).</p>` });
    return besedilo({ tezavnost: 3, sprejemljivi: [c], besedilo: `Kateri znak ima kodo ASCII ${c.charCodeAt(0)}? (»A« = 65, »a« = 97)`, rezultat: c, postopek: `<p>\\(${c.charCodeAt(0)} - ${veliko ? 65 : 97} = ${k}\\), torej ${k + 1}. ${veliko ? "velika" : "mala"} črka angleške abecede: ${c}.</p>` });
  });
  serija("informacija", 6, (r) => {
    const n = r.izberi([2, 4, 8, 16, 32, 64, 128, 256]), b = Math.log2(n);
    return kolicina({ tezavnost: 3, vrednost: b, enota: "bit", besedilo: `Koliko informacije (v bitih) dobimo, ko izvemo izid enako verjetnega dogodka z ${n} možnimi izidi?`, rezultat: `${b} bitov`, postopek: `<p>\\(I = \\log_2 ${n} = ${b}\\) bitov</p>` });
  });
  serija("entropija", 5, (r) => {
    const p = r.izberi([[0.5, 0.25, 0.25], [0.5, 0.5], [0.25, 0.25, 0.25, 0.25], [0.5, 0.25, 0.125, 0.125], [0.75, 0.25]]);
    const H = -p.reduce((a, x) => a + x * Math.log2(x), 0);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: H, tol: 0.01, enota: "bit", besedilo: `Vir oddaja znake z verjetnostmi ${p.map((x) => T(x, 3)).join(", ")}. Kolikšna je entropija vira (v bitih na znak)?`, rezultat: `${T(H, 3)} bita`, postopek: `<p>\\(H = -\\sum p_i \\log_2 p_i = ${L(H, 3)}\\)</p>` });
  });
  serija("prenos", 6, (r) => {
    const MB = r.int(5, 500), Mbit = r.izberi([10, 20, 50, 100]), t = (MB * 8) / Mbit;
    return kolicina({ tezavnost: 3, vrednost: t, tol: 0.01, enota: "s", besedilo: `Koliko sekund traja prenos datoteke velikosti ${MB} MB po povezavi s hitrostjo ${Mbit} Mbit/s (1 MB = 8 Mbit)?`, rezultat: `${T(t, 1)} s`, postopek: `<p>\\(t = \\frac{${MB} \\cdot 8}{${Mbit}} = ${L(t, 1)}\\ \\text{s}\\)</p>` });
  });
  pojmi([
    ["podatek", "Zapis dejstva brez pomena oziroma interpretacije."],
    ["informacija", "Podatek, ki mu prejemnik pripiše pomen in zmanjša njegovo negotovost."],
    ["znanje", "Povezane informacije, ki jih znamo uporabiti."],
    ["bit", "Najmanjša enota informacije, ki ima vrednost 0 ali 1."],
    ["koda", "Dogovorjen zapis znaka ali sporočila z znaki kodne abecede."],
    ["kodiranje", "Pretvorba sporočila v zapis z dogovorjeno kodo."],
    ["redundanca", "Dodani odvečni podatki, ki omogočajo odkrivanje ali popravljanje napak."],
    ["paritetni bit", "Dodatni bit, ki dopolni število enic do sodega ali lihega števila."],
    ["Hammingova razdalja", "Število mest, na katerih se dve enako dolgi kodi razlikujeta."],
    ["komunikacijski kanal", "Pot, po kateri sporočilo potuje od oddajnika do sprejemnika."],
    ["šum", "Motnje v kanalu, ki popačijo sporočilo."],
    ["ASCII", "7-bitna standardna koda za zapis znakov angleške abecede in ločil."],
    ["Unicode", "Standard za enoten zapis znakov vseh pisav sveta."],
    ["digitalni razkorak", "Razlika med ljudmi glede dostopa do sodobne tehnologije in znanja."],
  ]);
  vprasanja([
    [3, "Koliko napak lahko zagotovo odkrijemo s kodo z najmanjšo Hammingovo razdaljo 3?", { vpis: ["2"] }, [], "Odkrijemo d − 1 = 2 napaki, popravimo pa (d − 1)/2 = 1."],
    [4, "Koliko napak lahko popravimo s kodo, katere najmanjša Hammingova razdalja je 5?", { vpis: ["2"] }, [], "Popravimo ⌊(d − 1)/2⌋ = 2 napaki.", "visja"],
    [4, "Zakaj paritetni bit ne odkrije dveh napak v istem bloku?", "ker dve napaki ohranita sodost števila enic", ["ker paritetni bit popravi obe", "ker se bit ne prenaša", "ker odkrije le napake v prvem bitu"], "Dva obrnjena bita ne spremenita paritete.", "visja"],
    [4, "Zakaj kodiranje s spremenljivo dolžino (npr. Huffman) skrajša sporočilo?", "pogostejši znaki dobijo krajše kode", ["vsi znaki dobijo enako dolge kode", "izpusti redke znake", "uporablja desetiški sistem"], "Povprečna dolžina kode se zmanjša proti entropiji vira.", "visja"],
    [2, "Kaj je avtorska pravica?", "pravica avtorja do odločanja o uporabi svojega dela", ["pravica vsakogar do kopiranja", "pravica do brezplačnega interneta", "pravica do zasebnosti"], "Licence (npr. Creative Commons) določajo pogoje uporabe."],
  ]);
}
