import { kolicina, izbira, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("gostota", 6, (r) => {
    const N = r.int(20, 2000), P = r.int(2, 200);
    return kolicina({ tezavnost: 1, vrednost: N / P, tol: 0.01, enota: "osebkov/ha", besedilo: `Na površini ${P} ha živi ${N} srn. Kolikšna je gostota populacije?`, rezultat: `${T(N / P, 2)} osebkov/ha`, postopek: `<p>\\(G = \\frac{N}{P} = \\frac{${N}}{${P}} \\approx ${L(N / P, 2)}\\)</p>` });
  });
  serija("lincoln", 7, (r) => {
    const M = r.int(20, 200), n = r.int(20, 200), m = r.int(2, Math.min(M, n) - 1);
    const N = (M * n) / m;
    return kolicina({ tezavnost: 3, vrednost: N, tol: 0.01, enota: "osebkov", besedilo: `Ujamemo in označimo ${M} rib ter jih izpustimo. Pozneje ujamemo ${n} rib, ${m} med njimi je označenih. Ocenite velikost populacije.`, rezultat: `približno ${T(N, 0)}`, postopek: `<p>Lincoln-Petersenova metoda: \\(N = \\frac{M \\cdot n}{m} = \\frac{${M} \\cdot ${n}}{${m}} \\approx ${L(N, 0)}\\)</p>` });
  });
  serija("rast", 7, (r, i) => {
    const N0 = r.int(10, 1000), b = r.int(10, 60), d = r.int(5, 40), t = r.int(1, 5);
    const rr = (b - d) / 1000;
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: b - d, enota: "‰", besedilo: `Rodnost populacije je ${b} ‰, smrtnost ${d} ‰ na leto. Kolikšna je naravna rast (v promilih)?`, rezultat: `${b - d} ‰`, postopek: `<p>\\(r = b - d = ${b} - ${d} = ${b - d}\\,‰\\)</p>` });
    const Nt = N0 * (1 + rr) ** t;
    return kolicina({ tezavnost: 3, vrednost: Nt, tol: 0.01, enota: "osebkov", besedilo: `Populacija ima ${N0} osebkov, letna rodnost je ${b} ‰, smrtnost ${d} ‰ (brez selitev). Koliko osebkov bo po ${t} letih?`, rezultat: `približno ${T(Nt, 0)}`, postopek: `<p>Letni faktor rasti: \\(1 + \\frac{${b - d}}{1000} = ${L(1 + rr, 3)}\\)</p><p>\\(N = ${N0} \\cdot ${L(1 + rr, 3)}^{${t}} \\approx ${L(Nt, 0)}\\)</p>` });
  });
  serija("podvojitev", 5, (r) => {
    const t = r.int(10, 60), n = r.int(2, 10), N0 = r.int(1, 100);
    return kolicina({ tezavnost: 2, vrednost: N0 * 2 ** n, enota: "", besedilo: `Bakterije se delijo vsakih ${t} minut. Koliko jih je po ${n * t} minutah, če jih je bilo na začetku ${N0}?`, rezultat: `${N0 * 2 ** n}`, postopek: `<p>Število delitev: \\(\\frac{${n * t}}{${t}} = ${n}\\). \\(N = ${N0} \\cdot 2^{${n}} = ${N0 * 2 ** n}\\)</p>` });
  });
  serija("logisticna", 4, (r) => {
    const K = r.int(5, 50) * 100, rr = r.int(1, 5) / 10, N = r.int(1, K / 100 - 1) * 100;
    const dN = rr * N * (1 - N / K);
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: dN, tol: 0.01, enota: "osebkov/leto", besedilo: `Populacija raste logistično: \\(\\frac{dN}{dt} = rN\\left(1 - \\frac{N}{K}\\right)\\), \\(r = ${L(rr, 1)}\\) na leto, \\(K = ${K}\\). Kolikšna je hitrost rasti pri \\(N = ${N}\\)?`, rezultat: `${T(dN, 1)} osebkov/leto`, postopek: `<p>\\(${L(rr, 1)} \\cdot ${N} \\cdot \\left(1 - \\frac{${N}}{${K}}\\right) \\approx ${L(dN, 1)}\\)</p>` });
  });
  serija("max-rast", 3, (r) => {
    const K = r.int(5, 100) * 100;
    return kolicina({ tezavnost: 4, raven: "visja", vrednost: K / 2, enota: "osebkov", besedilo: `Pri kateri velikosti populacije je logistična rast najhitrejša, če je nosilna zmogljivost okolja ${K} osebkov?`, rezultat: `${K / 2}`, postopek: `<p>Funkcija \\(rN(1 - N/K)\\) je parabola z vrhom pri \\(N = K/2 = ${K / 2}\\).</p>` });
  });
  serija("krivulja", 4, (r) => {
    const [opis, odg] = r.izberi([["neomejeni viri, ni tekmovanja", "eksponentna (J-krivulja)"], ["omejeni viri, rast se upočasni pri nosilni zmogljivosti", "logistična (S-krivulja)"], ["večina osebkov umre mlada, preživijo redki (npr. ribe)", "preživetvena krivulja tipa III"], ["večina osebkov doživi visoko starost (npr. človek)", "preživetvena krivulja tipa I"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katero krivuljo opisuje: ${opis}?`, pravilna: odg, napacne: ["eksponentna (J-krivulja)", "logistična (S-krivulja)", "preživetvena krivulja tipa III", "preživetvena krivulja tipa I"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["populacija", "Skupina osebkov iste vrste, ki živijo na istem območju in se med seboj razmnožujejo."],
    ["gostota populacije", "Število osebkov na enoto površine ali prostornine."],
    ["nosilna zmogljivost okolja", "Največje število osebkov, ki jih okolje lahko trajno vzdržuje."],
    ["rodnost", "Število rojenih osebkov v časovni enoti glede na velikost populacije."],
    ["smrtnost", "Število umrlih osebkov v časovni enoti glede na velikost populacije."],
    ["starostna piramida", "Grafični prikaz deležev starostnih skupin v populaciji."],
    ["r-strategi", "Vrste z veliko potomci, ki jim starši ne namenjajo veliko skrbi."],
    ["K-strategi", "Vrste z malo potomci in veliko starševske skrbi."],
    ["omejitveni dejavnik", "Dejavnik okolja, ki je v najmanjši količini in omejuje rast populacije."],
    ["znotrajvrstno tekmovanje", "Tekmovanje med osebki iste vrste za vire."],
    ["emigracija", "Odseljevanje osebkov iz populacije."],
    ["imigracija", "Priseljevanje osebkov v populacijo."],
  ]);
}
