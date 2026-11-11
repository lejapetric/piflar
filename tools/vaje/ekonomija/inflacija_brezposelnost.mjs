import { kolicina, izbira, T } from "../lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  serija("racun", 36, (r, i) => {
    const kaj = i % 6;
    if (kaj === 0) { const a = r.int(100, 130), b = a + r.int(-2, 10), inf = ((b - a) / a) * 100; return kolicina({ tezavnost: 2, vrednost: inf, tol: 0.01, enota: "%", besedilo: `Indeks cen življenjskih potrebščin je bil lani ${a}, letos ${b}. Kolikšna je stopnja inflacije?`, rezultat: `${T(inf, 2)} %`, postopek: `<p>\\(\\frac{${b} - ${a}}{${a}} \\cdot 100 = ${T(inf, 2)}\\,\\%\\)</p>` }); }
    if (kaj === 1) { const k = r.int(20, 60) * 10, s = r.int(10, 200) / 10; return kolicina({ tezavnost: 2, vrednost: k * (1 + s / 100), tol: 0.01, enota: "€", besedilo: `Košarica dobrin stane ${k} €. Inflacija je ${T(s, 1)} %. Koliko bo košarica stala čez eno leto?`, rezultat: `${T(k * (1 + s / 100), 2)} €`, postopek: `<p>\\(${k} \\cdot ${T(1 + s / 100, 3)} = ${T(k * (1 + s / 100), 2)}\\)</p>` }); }
    if (kaj === 2) { const z = r.int(800, 1000), b = r.int(30, 120); return kolicina({ tezavnost: 2, vrednost: (b / (z + b)) * 100, tol: 0.01, enota: "%", besedilo: `V državi je ${z} tisoč zaposlenih in ${b} tisoč brezposelnih. Kolikšna je anketna stopnja brezposelnosti?`, rezultat: `${T((b / (z + b)) * 100, 2)} %`, postopek: `<p>Aktivno prebivalstvo = ${z} + ${b} = ${z + b} tisoč. \\(\\frac{${b}}{${z + b}} \\cdot 100 = ${T((b / (z + b)) * 100, 2)}\\,\\%\\)</p>` }); }
    if (kaj === 3) { const n = r.int(2, 6), inf = r.int(1, 8); const re = n - inf; return kolicina({ tezavnost: 3, vrednost: re, tol: 0.001, enota: "%", besedilo: `Nominalna obrestna mera za varčevanje je ${n} %, inflacija ${inf} %. Približno kolikšna je realna obrestna mera? (Vpiši s predznakom.)`, rezultat: `${re} %`, postopek: `<p>Realna ≈ nominalna − inflacija = ${n} − ${inf} = ${re} %.</p>` }); }
    if (kaj === 4) { const p = r.int(1500, 2500), inf = r.int(2, 12), rp = r.int(0, 6); const real = ((1 + rp / 100) / (1 + inf / 100) - 1) * 100; return kolicina({ tezavnost: 4, raven: "visja", vrednost: real, tol: 0.02, enota: "%", besedilo: `Nominalna plača se je s ${p} € zvišala za ${rp} %, inflacija je bila ${inf} %. Za koliko odstotkov se je spremenila realna plača? (Natančni izračun, s predznakom.)`, rezultat: `${T(real, 2)} %`, postopek: `<p>\\(\\left(\\frac{1 + ${T(rp / 100, 2)}}{1 + ${T(inf / 100, 2)}} - 1\\right) \\cdot 100 = ${T(real, 2)}\\,\\%\\)</p>` }); }
    const ak = r.int(900, 1100), b = r.int(40, 120), sk = r.int(1500, 1800); return kolicina({ tezavnost: 3, vrednost: (ak / sk) * 100, tol: 0.01, enota: "%", besedilo: `Delovno sposobnih prebivalcev je ${sk} tisoč, aktivnih (zaposleni + brezposelni) ${ak} tisoč, od tega ${b} tisoč brezposelnih. Kolikšna je stopnja aktivnosti?`, rezultat: `${T((ak / sk) * 100, 2)} %`, postopek: `<p>\\(\\frac{${ak}}{${sk}} \\cdot 100 = ${T((ak / sk) * 100, 2)}\\,\\%\\)</p>` });
  });
  serija("vrsta", 6, (r, i) => {
    const P = [["Delavec je zapustil službo in išče boljšo.", "frikcijska brezposelnost"], ["Rudarji izgubijo delo, ker zaprejo premogovnik, nova delovna mesta pa zahtevajo drugačna znanja.", "strukturna brezposelnost"], ["Med recesijo podjetja odpuščajo delavce.", "ciklična brezposelnost"], ["Natakarji na obali so pozimi brez dela.", "sezonska brezposelnost"], ["Diplomantka je štiri mesece iskala prvo zaposlitev.", "frikcijska brezposelnost"], ["Blagajničarke zamenjajo samopostrežne blagajne.", "strukturna brezposelnost"]][i];
    return izbira({ r, tezavnost: 2, besedilo: `Katera vrsta brezposelnosti je to? ${P[0]}`, pravilna: P[1], napacne: ["frikcijska brezposelnost", "strukturna brezposelnost", "ciklična brezposelnost", "sezonska brezposelnost"].filter((x) => x !== P[1]), postopek: `<p>${P[1]}.</p>` });
  });
  pojmi([
    ["inflacija", "Splošno in trajno naraščanje ravni cen."],
    ["deflacija", "Splošno upadanje ravni cen."],
    ["stagflacija", "Hkratna inflacija in stagnacija gospodarstva z visoko brezposelnostjo."],
    ["indeks cen življenjskih potrebščin", "Kazalnik spremembe cen košarice dobrin, ki jih kupujejo gospodinjstva."],
    ["inflacija povpraševanja", "Inflacija zaradi agregatnega povpraševanja, ki presega ponudbo."],
    ["stroškovna inflacija", "Inflacija zaradi naraščanja proizvodnih stroškov, npr. cen energije."],
    ["hiperinflacija", "Izjemno visoka inflacija, ko cene rastejo za več deset odstotkov na mesec."],
    ["brezposelna oseba", "Oseba brez dela, ki aktivno išče zaposlitev in je takoj pripravljena delati."],
    ["aktivno prebivalstvo", "Zaposleni in brezposelni skupaj."],
    ["registrirana brezposelnost", "Brezposelnost po podatkih zavoda za zaposlovanje."],
  ]);
  vprasanja([
    [3, "Kdo izgubi zaradi nepričakovane inflacije?", "upniki in prejemniki stalnih dohodkov", ["dolžniki", "lastniki nepremičnin", "država kot dolžnik"], "Vrednost vrnjenega denarja je manjša."],
    [4, "Kaj kaže Phillipsova krivulja (kratkoročno)?", "obratno povezanost med inflacijo in brezposelnostjo", ["pozitivno povezanost med BDP in uvozom", "povezanost med obrestmi in davki", "da inflacija ne vpliva na brezposelnost"], "Dolgoročno je povezava šibka (stagflacija v 70-ih).", "visja"],
    [4, "Zakaj je anketna stopnja brezposelnosti običajno nižja od registrirane?", "ker vsi registrirani ne iščejo aktivno dela ali delajo na črno, anketa pa uporablja mednarodna merila", ["ker anketa šteje le moške", "ker je registrirana napačna", "ker anketa izključuje mlade"], "Merila ILO: aktivno iskanje in razpoložljivost.", "visja"],
  ]);
}
