import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("dokaz", 7, (r) => {
    const [d, odg] = r.izberi([["okončine človeka, kita in netopirja imajo enako zgradbo kosti", "homologni organi"], ["krila ptic in žuželk imajo enako nalogo, a različen izvor", "analogni organi"], ["slepič pri človeku", "zakrneli (rudimentarni) organi"], ["podobnost zaporedij DNA pri šimpanzu in človeku", "molekularni dokazi"], ["Archaeopteryx z znaki plazilcev in ptic", "fosilne prehodne oblike"], ["zarodki vretenčarjev imajo škržne loke", "primerjalna embriologija"]]);
    const vse = ["homologni organi", "analogni organi", "zakrneli (rudimentarni) organi", "molekularni dokazi", "fosilne prehodne oblike", "primerjalna embriologija"];
    return izbira({ r, tezavnost: 2, besedilo: `Kateri dokaz evolucije ponazarja primer: ${d}?`, pravilna: odg, napacne: r.premesaj(vse.filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("selekcija", 6, (r) => {
    const [d, odg] = r.izberi([["v populaciji preživijo osebki s povprečno porodno težo", "stabilizacijska selekcija"], ["zaradi lova na velike ribe se povprečna velikost rib zmanjšuje", "usmerjena selekcija"], ["preživijo ptiči z zelo velikimi in zelo majhnimi kljuni, srednji ne", "disruptivna selekcija"], ["samice izbirajo samce z daljšim repom", "spolna selekcija"], ["bakterije postanejo odporne proti antibiotiku", "usmerjena selekcija"], ["ljudje vzgajajo krave z večjo mlečnostjo", "umetna selekcija"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Katero vrsto selekcije opisuje primer: ${d}?`, pravilna: odg, napacne: r.premesaj(["stabilizacijska selekcija", "usmerjena selekcija", "disruptivna selekcija", "spolna selekcija", "umetna selekcija"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("hw", 8, (r, i) => {
    const p = r.int(1, 9) / 10, q = 1 - p, kaj = r.izberi(["p2", "2pq", "q2"]);
    const v = { p2: p * p, "2pq": 2 * p * q, q2: q * q }[kaj], ime = { p2: "dominantnih homozigotov", "2pq": "heterozigotov", q2: "recesivnih homozigotov" }[kaj];
    return kolicina({ tezavnost: 3, vrednost: v * 100, tol: 0.005, enota: "%", besedilo: `V populaciji v Hardy-Weinbergovem ravnotežju je frekvenca dominantnega alela p = ${T(p, 1)}. Kolikšen odstotek osebkov je ${ime}?`, rezultat: `${T(v * 100, 0)} %`, postopek: `<p>\\(q = 1 - p = ${L(q, 1)}\\)</p><p>\\(${{ p2: "p^2", "2pq": "2pq", q2: "q^2" }[kaj]} = ${L(v, 2)}\\), torej ${T(v * 100, 0)} %.</p>` });
  });
  serija("hw-alel", 6, (r) => {
    const N = r.int(2, 20) * 100, q2 = r.izberi([0.01, 0.04, 0.09, 0.16, 0.25, 0.36, 0.49]), rec = Math.round(N * q2), q = Math.sqrt(q2);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: q, tol: 0.01, enota: "", besedilo: `V populaciji ${N} osebkov (Hardy-Weinbergovo ravnotežje) jih ima ${rec} recesivni fenotip. Kolikšna je frekvenca recesivnega alela q?`, rezultat: `${T(q, 2)}`, postopek: `<p>\\(q^2 = \\frac{${rec}}{${N}} = ${L(q2, 2)}\\), \\(q = \\sqrt{${L(q2, 2)}} = ${L(q, 2)}\\)</p>` });
  });
  serija("hw-alelno-stetje", 5, (r) => {
    const AA = r.int(10, 200), Aa = r.int(10, 200), aa = r.int(10, 200), N = AA + Aa + aa, p = (2 * AA + Aa) / (2 * N);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: p, tol: 0.01, enota: "", besedilo: `V populaciji je ${AA} osebkov AA, ${Aa} Aa in ${aa} aa. Kolikšna je frekvenca alela A?`, rezultat: `${T(p, 3)}`, postopek: `<p>Vseh alelov: \\(2 \\cdot ${N} = ${2 * N}\\). Alelov A: \\(2 \\cdot ${AA} + ${Aa} = ${2 * AA + Aa}\\).</p><p>\\(p = \\frac{${2 * AA + Aa}}{${2 * N}} \\approx ${L(p, 3)}\\)</p>` });
  });
  serija("avtor", 5, (r) => {
    const [d, odg] = r.izberi([["teorija naravnega izbora", "Charles Darwin"], ["dedovanje pridobljenih lastnosti", "Jean-Baptiste Lamarck"], ["sočasno z Darwinom zasnoval naravni izbor", "Alfred Russel Wallace"], ["binomsko poimenovanje vrst", "Carl Linné"], ["zakonitosti dedovanja pri grahu", "Gregor Mendel"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kdo je povezan s pojmom: ${d}?`, pravilna: odg, napacne: ["Charles Darwin", "Jean-Baptiste Lamarck", "Alfred Russel Wallace", "Carl Linné", "Gregor Mendel"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg}: ${d}.</p>` });
  });
  pojmi([
    ["evolucija", "Postopno spreminjanje dednih lastnosti populacij skozi generacije."],
    ["naravni izbor", "Večje preživetje in razmnoževanje osebkov, ki so bolje prilagojeni okolju."],
    ["prilagoditev", "Dedna lastnost, ki osebku poveča možnost preživetja in razmnoževanja."],
    ["genski sklad", "Vsi aleli vseh osebkov v populaciji."],
    ["genski zdrs", "Naključno spreminjanje frekvenc alelov, izrazito v majhnih populacijah."],
    ["učinek ustanovitelja", "Genski zdrs, ko novo populacijo osnuje majhno število osebkov."],
    ["ozko grlo", "Močno zmanjšanje populacije, ki zmanjša genetsko raznolikost."],
    ["speciacija", "Nastanek nove vrste."],
    ["alopatrična speciacija", "Nastanek vrst zaradi geografske ločitve populacij."],
    ["reproduktivna izolacija", "Ovire, ki preprečujejo križanje med vrstami."],
    ["konvergentna evolucija", "Nastanek podobnih lastnosti pri nesorodnih vrstah zaradi podobnega okolja."],
    ["adaptivna radiacija", "Hitro nastajanje številnih vrst iz skupnega prednika."],
    ["homologni organi", "Organi skupnega izvora, ki imajo lahko različne naloge."],
  ]);
  vprasanja([
    [3, "Kateri pogoj NI potreben za Hardy-Weinbergovo ravnotežje?", "naravni izbor", ["velika populacija", "naključno parjenje", "brez mutacij"], "Ravnotežje velja le, če ni selekcije, mutacij, migracij in zdrsa."],
    [4, "Zakaj je genski zdrs pomembnejši v majhnih populacijah?", "ker naključni dogodki močneje spremenijo frekvence alelov", ["ker je v njih več mutacij", "ker je naravni izbor močnejši", "ker se osebki ne razmnožujejo"], "Pri majhnem vzorcu so naključna odstopanja večja.", "visja"],
    [4, "Kako je Darwin razložil dolg vrat žirafe drugače kot Lamarck?", "osebki z daljšim vratom so imeli več potomcev", ["žirafe so vrat raztegovale in to prenesle na potomce", "vrat se je podaljšal zaradi mutacij v enem življenju", "dolg vrat je posledica prehrane"], "Darwin: naravni izbor obstoječe variabilnosti; Lamarck: dedovanje pridobljenih lastnosti.", "visja"],
    [4, "Zakaj so mule neplodne?", "ker imajo neparno število kromosomov in mejoza ne poteka pravilno", ["ker nimajo spolnih organov", "ker so haploidne", "ker so klonirane"], "Konj (64) × osel (62): mula ima 63 kromosomov.", "visja"],
    [2, "Kaj je vir nove genetske variabilnosti?", "mutacije", ["naravni izbor", "genski zdrs", "izumrtje"], "Mutacije ustvarjajo nove alele, prekrižanje jih kombinira."],
  ]);
}
