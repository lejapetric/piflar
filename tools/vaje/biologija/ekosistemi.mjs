import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("energija", 10, (r, i) => {
    const E0 = r.int(1, 100) * 1000, n = r.int(1, 3), p = r.izberi([10, 10, 10, 5, 20]);
    const E = E0 * (p / 100) ** n, rav = ["primarnih potrošnikov", "sekundarnih potrošnikov", "terciarnih potrošnikov"][n - 1];
    return kolicina({ tezavnost: n === 1 ? 2 : 3, vrednost: E, tol: 0.01, enota: "kJ", besedilo: `Proizvajalci vežejo ${E0} kJ energije. Koliko energije doseže raven ${rav}, če se na vsako višjo raven prenese ${p} %?`, rezultat: `${T(E, 1)} kJ`, postopek: `<p>\\(E = ${E0} \\cdot ${L(p / 100, 2)}^{${n}} = ${L(E, 1)}\\ \\text{kJ}\\)</p>` });
  });
  serija("ucinkovitost", 6, (r) => {
    const a = r.int(10, 200) * 100, b = r.int(2, 30) * 10, u = (b / a) * 100;
    if (b >= a) return null;
    return kolicina({ tezavnost: 3, vrednost: u, tol: 0.01, enota: "%", besedilo: `Trava vsebuje ${a} kJ energije, zajci, ki jo pojedo, pa v svojem telesu vežejo ${b} kJ. Kolikšna je ekološka učinkovitost prenosa?`, rezultat: `${T(u, 2)} %`, postopek: `<p>\\(\\frac{${b}}{${a}} \\cdot 100\\,\\% \\approx ${L(u, 2)}\\,\\%\\)</p>` });
  });
  serija("bioakumulacija", 5, (r) => {
    const c0 = r.int(1, 9) / 1000, f = r.izberi([5, 10, 20]), n = r.int(2, 4), c = c0 * f ** n;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: c, tol: 0.01, enota: "ppm", besedilo: `Koncentracija pesticida v planktonu je ${T(c0, 3)} ppm. Na vsaki višji prehranjevalni ravni se poveča ${f}-krat. Kolikšna je koncentracija ${n} ravni višje?`, rezultat: `${T(c, 2)} ppm`, postopek: `<p>\\(c = ${L(c0, 3)} \\cdot ${f}^{${n}} = ${L(c, 2)}\\ \\text{ppm}\\)</p>` });
  });
  serija("vloga", 8, (r) => {
    const [o, odg] = r.izberi([["hrast", "proizvajalec"], ["srna", "primarni potrošnik"], ["volk", "sekundarni (ali višji) potrošnik"], ["deževnik", "razkrojevalec (detritivor)"], ["plesen na odpadlem listju", "razkrojevalec"], ["fitoplankton", "proizvajalec"], ["kobilica", "primarni potrošnik"], ["sova, ki lovi miši", "sekundarni (ali višji) potrošnik"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kakšna je vloga organizma »${o}« v ekosistemu?`, pravilna: odg, napacne: ["proizvajalec", "primarni potrošnik", "sekundarni (ali višji) potrošnik", "razkrojevalec", "razkrojevalec (detritivor)"].filter((x) => x !== odg && !(odg.startsWith("razkrojevalec") && x.startsWith("razkrojevalec"))), postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}: ${odg}.</p>` });
  });
  serija("odnos", 8, (r) => {
    const [d, odg] = r.izberi([["čebela in cvet", "mutualizem"], ["lišaj (gliva in alga)", "mutualizem"], ["klop in srna", "parazitizem"], ["lisica in zajec", "plenilstvo"], ["morski rak samotar in vetrnica", "mutualizem"], ["epifitska orhideja na drevesu", "komenzalizem"], ["dve vrsti ptic tekmujeta za ista gnezdišča", "medvrstno tekmovanje"], ["trakulja v črevesu", "parazitizem"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri odnos med organizmi ponazarja primer: ${d}?`, pravilna: odg, napacne: r.premesaj(["mutualizem", "parazitizem", "plenilstvo", "komenzalizem", "medvrstno tekmovanje"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("kroženje", 6, (r) => {
    const [d, odg] = r.izberi([["bakterije pretvarjajo amonijak v nitrat", "nitrifikacija"], ["bakterije pretvarjajo nitrat v plinasti dušik", "denitrifikacija"], ["bakterije vežejo N₂ iz zraka", "vezava dušika"], ["razkrojevalci iz beljakovin sproščajo amonijak", "amonifikacija"], ["rastline vežejo CO₂ iz zraka", "fotosinteza"], ["gorenje fosilnih goriv", "sproščanje CO₂"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kako imenujemo proces v kroženju snovi: ${d}?`, pravilna: odg, napacne: r.premesaj(["nitrifikacija", "denitrifikacija", "vezava dušika", "amonifikacija", "fotosinteza", "sproščanje CO₂"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["ekosistem", "Združba organizmov skupaj z neživim okoljem in njunimi odnosi."],
    ["biotop", "Življenjski prostor združbe."],
    ["združba (biocenoza)", "Vse populacije, ki živijo na istem območju.", { brezVpisa: true }],
    ["ekološka niša", "Vloga in položaj vrste v ekosistemu, vključno z viri, ki jih rabi."],
    ["prehranjevalna veriga", "Zaporedje organizmov, pri katerem vsak služi kot hrana naslednjemu."],
    ["prehranjevalni splet", "Prepletene prehranjevalne verige v ekosistemu."],
    ["primarna produkcija", "Količina organske snovi, ki jo izdelajo proizvajalci."],
    ["razkrojevalci", "Organizmi, ki razgrajujejo odmrlo organsko snov v anorganske snovi."],
    ["sukcesija", "Postopno zaporedno spreminjanje združbe na nekem območju."],
    ["biotska pestrost", "Raznolikost genov, vrst in ekosistemov."],
    ["evtrofikacija", "Prekomerno obogatenje vode s hranili, ki povzroči cvetenje alg."],
    ["učinek tople grede", "Segrevanje ozračja zaradi plinov, ki zadržujejo toplotno sevanje."],
    ["bioakumulacija", "Kopičenje strupenih snovi v organizmih višjih prehranjevalnih ravni."],
  ]);
  vprasanja([
    [3, "Zakaj so prehranjevalne verige navadno kratke (4–5 členov)?", "ker se na vsaki ravni izgubi večina energije", ["ker ni dovolj vrst", "ker plenilci ne jedo plenilcev", "ker se snovi ne krožijo"], "Le okoli 10 % energije preide na naslednjo raven."],
    [4, "Zakaj evtrofikacija povzroči pomor rib?", "razkroj odmrlih alg porabi kisik v vodi", ["alge izločajo strup za vse ribe", "voda postane preslana", "ribe pojedo preveč alg"], "Bakterije razkrojevalke porabijo raztopljeni kisik.", "visja"],
    [4, "Zakaj so plenilci na vrhu prehranjevalne verige najbolj ogroženi zaradi DDT?", "ker se DDT kopiči v maščobah in koncentracija raste z vsako ravnijo", ["ker DDT razkrajajo bakterije", "ker se DDT izloča s sečem", "ker DDT deluje le na ptice"], "Biomagnifikacija.", "visja"],
    [4, "Po čem se primarna sukcesija razlikuje od sekundarne?", "primarna poteka na golih tleh brez prsti, sekundarna po motnji na obstoječih tleh", ["primarna je hitrejša", "sekundarna poteka le v vodi", "razlike ni"], "Pionirski organizmi (lišaji) pri primarni sukcesiji tvorijo prst.", "visja"],
    [2, "Kateri plin je glavni toplogredni plin, ki ga izpušča človek?", "ogljikov dioksid", ["kisik", "dušik", "argon"], "Izgorevanje fosilnih goriv povečuje koncentracijo CO₂."],
  ]);
}
