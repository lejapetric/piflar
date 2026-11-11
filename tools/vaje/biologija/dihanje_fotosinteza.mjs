import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("atp-glukoza", 7, (r) => {
    const n = r.int(2, 50), [proc, k] = r.izberi([["aerobnim celičnim dihanjem (≈ 30 ATP na glukozo)", 30], ["mlečnokislinskim vrenjem", 2], ["alkoholnim vrenjem", 2], ["samo glikolizo (neto)", 2], ["aerobnim celičnim dihanjem (≈ 38 ATP na glukozo, po starejšem izračunu)", 38]]);
    return kolicina({ tezavnost: 2, vrednost: n * k, enota: "", besedilo: `Koliko molekul ATP nastane iz ${n} molekul glukoze z ${proc}?`, rezultat: `${n * k}`, postopek: `<p>\\(${n} \\cdot ${k} = ${n * k}\\)</p>` });
  });
  serija("razmerje", 4, (r) => {
    const a = r.izberi([30, 32, 36, 38]);
    return kolicina({ tezavnost: 3, vrednost: a / 2, enota: "", besedilo: `Kolikokrat več ATP nastane pri aerobnem dihanju (${a} ATP/glukozo) kot pri vrenju (2 ATP/glukozo)?`, rezultat: `${a / 2}-krat`, postopek: `<p>\\(\\frac{${a}}{2} = ${a / 2}\\)</p>` });
  });
  serija("stehiometrija", 8, (r, i) => {
    const n = r.int(1, 20);
    const [kaj, k, enacba] = r.izberi([["CO₂ se porabi", 6, "fotosintezo"], ["O₂ se sprosti", 6, "fotosintezo"], ["H₂O se porabi", 6, "fotosintezo"], ["O₂ se porabi", 6, "celično dihanje"], ["CO₂ nastane", 6, "celično dihanje"]]);
    return kolicina({ tezavnost: 2, vrednost: n * k, enota: "mol", besedilo: `Koliko molov ${kaj.split(" ")[0]} ${kaj.split(" ").slice(1).join(" ")} pri ${enacba === "fotosintezo" ? "fotosintezi" : "celičnem dihanju"} ${n} mol glukoze?`, rezultat: `${n * k} mol`, postopek: `<p>\\(\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2 \\rightleftarrows 6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O}\\); razmerje 1 : 6, torej \\(${n} \\cdot 6 = ${n * k}\\) mol.</p>` });
  });
  serija("masa", 5, (r) => {
    const m = r.int(1, 50) * 10, nCO2 = (m / 180.16) * 6, mCO2 = nCO2 * 44.01;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: mCO2, tol: 0.01, enota: "g", besedilo: `Koliko gramov CO₂ nastane pri popolni oksidaciji ${m} g glukoze (M = 180,16 g/mol; M(CO₂) = 44,01 g/mol)?`, rezultat: `${T(mCO2, 1)} g`, postopek: `<p>\\(n(\\text{gl}) = \\frac{${m}}{180{,}16} \\approx ${L(m / 180.16, 3)}\\) mol, \\(n(\\text{CO}_2) = 6n \\approx ${L(nCO2, 3)}\\) mol</p><p>\\(m = ${L(nCO2, 3)} \\cdot 44{,}01 \\approx ${L(mCO2, 1)}\\) g</p>` });
  });
  serija("mesto", 8, (r) => {
    const [p, odg] = r.izberi([["glikoliza", "citoplazma"], ["Krebsov cikel", "matriks mitohondrija"], ["dihalna veriga (oksidativna fosforilacija)", "notranja membrana mitohondrija"], ["svetlobne reakcije fotosinteze", "tilakoidne membrane kloroplasta"], ["Calvinov cikel", "stroma kloroplasta"], ["oksidativna dekarboksilacija piruvata", "matriks mitohondrija"], ["alkoholno vrenje", "citoplazma"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kje v celici poteka ${p}?`, pravilna: odg, napacne: r.premesaj(["citoplazma", "matriks mitohondrija", "notranja membrana mitohondrija", "tilakoidne membrane kloroplasta", "stroma kloroplasta"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${p.charAt(0).toUpperCase() + p.slice(1)}: ${odg}.</p>` });
  });
  serija("dejavnik", 6, (r) => {
    const [d, odg] = r.izberi([["povečamo jakost svetlobe pri nizki jakosti", "fotosinteza se pospeši"], ["povečamo jakost svetlobe nad točko nasičenja", "hitrost se ne spremeni (omejuje drug dejavnik)"], ["povečamo koncentracijo CO₂ pri močni svetlobi", "fotosinteza se pospeši"], ["temperaturo dvignemo na 50 °C", "fotosinteza se upočasni (denaturacija encimov)"], ["rastlino postavimo v temo", "fotosinteza se ustavi, dihanje poteka naprej"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kaj se zgodi s fotosintezo, če ${d}?`, pravilna: odg, napacne: r.premesaj(["fotosinteza se pospeši", "hitrost se ne spremeni (omejuje drug dejavnik)", "fotosinteza se upočasni (denaturacija encimov)", "fotosinteza se ustavi, dihanje poteka naprej"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}. Velja zakon omejitvenega dejavnika.</p>` });
  });
  pojmi([
    ["celično dihanje", "Razgradnja organskih snovi s kisikom, pri kateri se sprosti energija za nastanek ATP."],
    ["glikoliza", "Razgradnja glukoze v dve molekuli piruvata v citoplazmi."],
    ["Krebsov cikel", "Ciklična razgradnja acetil-CoA v matriksu mitohondrija, pri kateri nastaja CO₂."],
    ["dihalna veriga", "Zaporedje prenašalcev elektronov na notranji mitohondrijski membrani."],
    ["kemiosmoza", "Nastanek ATP s pretokom protonov skozi ATP-sintazo."],
    ["vrenje", "Anaerobna razgradnja glukoze z majhnim izkupičkom ATP."],
    ["fotosinteza", "Nastanek glukoze iz CO₂ in vode s pomočjo svetlobne energije."],
    ["klorofil", "Zeleno barvilo, ki absorbira svetlobo za fotosintezo."],
    ["fotoliza vode", "Razcep vode na svetlobi, pri katerem se sprosti kisik."],
    ["Calvinov cikel", "Vezava CO₂ in nastanek sladkorja v stromi kloroplasta."],
    ["NADPH", "Prenašalec elektronov in vodika, ki nastane v svetlobnih reakcijah."],
    ["kompenzacijska točka", "Jakost svetlobe, pri kateri sta fotosinteza in dihanje enako hitra."],
    ["rubisko", "Encim, ki v Calvinovem ciklu veže CO₂."],
  ]);
  vprasanja([
    [3, "Od kod izhaja kisik, ki se sprosti pri fotosintezi?", "iz vode", ["iz CO₂", "iz glukoze", "iz klorofila"], "Poskusi z izotopom ¹⁸O so pokazali, da kisik izvira iz vode."],
    [3, "Kaj je končni prejemnik elektronov v dihalni verigi?", "kisik", ["NAD⁺", "glukoza", "CO₂"], "Kisik sprejme elektrone in protone ter nastane voda."],
    [4, "Zakaj ob pomanjkanju kisika glikoliza poteka naprej le z vrenjem?", "ker vrenje obnavlja NAD⁺, ki ga glikoliza potrebuje", ["ker vrenje proizvede več ATP", "ker vrenje porablja CO₂", "ker vrenje poteka v mitohondriju"], "Brez regeneracije NAD⁺ bi se glikoliza ustavila.", "visja"],
    [4, "Kaj bi se zgodilo z nastankom ATP, če bi postala notranja mitohondrijska membrana prepustna za protone?", "nastanek ATP bi močno upadel", ["ATP bi nastajalo več", "ne bi se spremenilo nič", "nastajalo bi več glukoze"], "Brez protonskega gradienta ATP-sintaza ne deluje (razklopitev).", "visja"],
    [4, "Zakaj rastline C4 v vročem podnebju fotosintetizirajo učinkoviteje?", "ker CO₂ najprej vežejo z encimom, ki ne veže O₂, in zmanjšajo fotorespiracijo", ["ker nimajo klorofila", "ker ne potrebujejo vode", "ker fotosintetizirajo ponoči brez svetlobe"], "PEP-karboksilaza koncentrira CO₂ pri rubisku.", "visja"],
    [4, "Katera svetloba je za fotosintezo najmanj učinkovita?", "zelena", ["rdeča", "modra", "vijolična"], "Klorofil zeleno svetlobo večinoma odbija.", "visja"],
  ]);
}
