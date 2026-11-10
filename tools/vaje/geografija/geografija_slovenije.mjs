import { izbira, kolicina, besedilo, T, L } from "../lib.mjs";

const REKE = [["Sava", "Črno morje (prek Donave)"], ["Drava", "Črno morje (prek Donave)"], ["Mura", "Črno morje (prek Donave)"], ["Krka", "Črno morje (prek Donave)"], ["Savinja", "Črno morje (prek Donave)"], ["Kolpa", "Črno morje (prek Donave)"], ["Soča", "Jadransko morje"], ["Vipava", "Jadransko morje"], ["Dragonja", "Jadransko morje"], ["Rižana", "Jadransko morje"]];
const MESTA = [["Ljubljana", "Ljubljanica"], ["Maribor", "Drava"], ["Celje", "Savinja"], ["Kranj", "Sava"], ["Novo mesto", "Krka"], ["Murska Sobota", "Mura (bližina)"], ["Ptuj", "Drava"], ["Nova Gorica", "Soča (bližina)"], ["Škofja Loka", "Sora"], ["Velenje", "Paka"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("povodje", 10, (r) => {
    const [rk, m] = r.izberi(REKE);
    return izbira({ r, tezavnost: 2, besedilo: `V katero povodje spada reka ${rk}?`, pravilna: m, napacne: [m === "Jadransko morje" ? "Črno morje (prek Donave)" : "Jadransko morje", "Severno morje"], postopek: `<p>${rk}: ${m}. Približno 80 % ozemlja Slovenije spada v črnomorsko povodje.</p>` });
  });
  serija("mesto-reka", 8, (r) => {
    const [m, rk] = r.izberi(MESTA);
    return izbira({ r, tezavnost: 1, besedilo: `Ob kateri reki leži ${m}?`, pravilna: rk, napacne: r.premesaj([...new Set(MESTA.map(([, y]) => y))].filter((x) => x !== rk)).slice(0, 3), postopek: `<p>${m}: ${rk}.</p>` });
  });
  serija("gostota", 6, (r) => {
    const [o, P, N] = r.izberi([["Slovenija", 20271, 2120000], ["Mestna občina Ljubljana", 275, 295000], ["Mestna občina Maribor", 148, 113000], ["Občina Kranjska Gora", 256, 5300], ["Občina Kočevje", 555, 15700]]);
    const g = N / P;
    return kolicina({ tezavnost: 2, vrednost: g, tol: 0.02, enota: "preb./km²", besedilo: `Območje ${o} ima približno ${N.toLocaleString("sl-SI")} prebivalcev in površino ${P.toLocaleString("sl-SI")} km². Kolikšna je gostota poselitve?`, rezultat: `približno ${T(g, 0)} preb./km²`, postopek: `<p>\\(\\frac{${N}}{${P}} \\approx ${L(g, 0)}\\)</p>` });
  });
  serija("meja", 6, (r) => {
    const [d, km] = r.izberi([["Hrvaško", 670], ["Avstrijo", 330], ["Italijo", 232], ["Madžarsko", 102]]);
    const vse = 1334, del = (km / vse) * 100;
    return kolicina({ tezavnost: 3, vrednost: del, tol: 0.03, enota: "%", besedilo: `Kopenska meja Slovenije je dolga približno ${vse} km, od tega z državo ${d} približno ${km} km. Kolikšen delež meje je to?`, rezultat: `približno ${T(del, 0)} %`, postopek: `<p>\\(\\frac{${km}}{${vse}} \\cdot 100\\,\\% \\approx ${L(del, 0)}\\,\\%\\)</p>` });
  });
  serija("visina", 6, (r) => {
    const [a, ha, b, hb] = r.izberi([["Triglav", 2864, "Ljubljana", 295], ["Triglav", 2864, "Koper", 0], ["Snežnik", 1796, "Postojna", 555], ["Pohorje (Črni vrh)", 1543, "Maribor", 275], ["Grintovec", 2558, "Kranj", 385]]);
    const t0 = r.int(10, 30), t = t0 - ((ha - hb) / 100) * 0.6;
    return kolicina({ tezavnost: 3, vrednost: t, tol: 0.001, enota: "°C", besedilo: `V kraju ${b} (${hb} m) je ${t0} °C. Približno kolikšna je temperatura na vrhu ${a} (${ha} m), če se zniža za 0,6 °C na 100 m?`, rezultat: `${T(t, 1)} °C`, postopek: `<p>\\(${t0} - \\frac{${ha - hb}}{100} \\cdot 0{,}6 \\approx ${L(t, 1)}\\ °\\text{C}\\)</p>` });
  });
  serija("dejstvo", 8, (r) => {
    const [v, odg, nap] = r.izberi([
      ["Katera je najvišja gora Slovenije?", "Triglav", ["Grintovec", "Stol", "Snežnik"]],
      ["Katera je najdaljša reka v Sloveniji?", "Sava", ["Drava", "Krka", "Soča"]],
      ["Katero je največje naravno jezero v Sloveniji?", "Bohinjsko jezero", ["Blejsko jezero", "Cerkniško jezero", "Ptujsko jezero"]],
      ["Katero presihajoče jezero je znano v Sloveniji?", "Cerkniško jezero", ["Bohinjsko jezero", "Blejsko jezero", "Velenjsko jezero"]],
      ["Približno koliko kilometrov je dolga slovenska obala?", "47 km", ["12 km", "120 km", "250 km"]],
      ["Kateri je edini slovenski narodni park?", "Triglavski narodni park", ["Park Škocjanske jame", "Kozjanski park", "Notranjski regijski park"]],
      ["Katera jama je na Unescovem seznamu svetovne dediščine?", "Škocjanske jame", ["Postojnska jama", "Križna jama", "Vilenica"]],
      ["Katera je najnižja točka Slovenije?", "morska gladina (Jadransko morje)", ["Prekmurje", "Ljubljansko barje", "Krška kotlina"]],
    ]);
    return izbira({ r, tezavnost: 1, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg}.</p>` });
  });
  serija("podnebje", 6, (r) => {
    const [k, odg] = r.izberi([["Koper", "submediteransko (sredozemsko)"], ["Murska Sobota", "subpanonsko (zmernocelinsko)"], ["Kredarica", "gorsko (alpsko)"], ["Ljubljana", "zmernocelinsko (osrednje Slovenije)"], ["Nova Gorica", "submediteransko (sredozemsko)"], ["Rateče", "gorsko (alpsko)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšno podnebje ima ${k}?`, pravilna: odg, napacne: ["submediteransko (sredozemsko)", "subpanonsko (zmernocelinsko)", "gorsko (alpsko)", "zmernocelinsko (osrednje Slovenije)"].filter((x) => x !== odg), postopek: `<p>${k}: ${odg}.</p>` });
  });
  pojmi([
    ["kras", "Površje na apnencu z vrtačami, jamami in ponikalnicami."],
    ["vrtača", "Kraška kotanjasta vdolbina."],
    ["polje (kraško)", "Velika kraška uravnava z ravnim dnom, ki jo občasno poplavlja.", { brezVpisa: true }],
    ["ponikalnica", "Reka, ki ponikne v podzemlje in se pozneje ponovno pojavi."],
    ["burja", "Sunkovit hladen veter, ki piha s kopnega proti morju."],
    ["temperaturni obrat", "Pojav, ko je v kotlini hladneje kot na pobočjih."],
    ["suburbanizacija", "Selitev prebivalstva iz mest v obmestja."],
    ["dnevna migracija", "Vsakodnevno potovanje na delo ali v šolo v drug kraj."],
    ["zaraščanje", "Širjenje gozda na opuščena kmetijska zemljišča."],
    ["Natura 2000", "Evropsko omrežje zavarovanih območij."],
    ["statistična regija", "Ena od 12 enot, na katere je razdeljena Slovenija za statistiko."],
    ["obmejno območje", "Območje ob državni meji z značilnimi razvojnimi težavami."],
  ]);
  vprasanja([
    [2, "Na stiku katerih štirih velikih naravnih enot leži Slovenija?", "Alp, Dinarskega gorstva, Panonske nižine in Sredozemlja", ["Alp, Karpatov, Panonske nižine in Sredozemlja", "Alp, Pirenejev, Dinarskega gorstva in Sredozemlja", "Karpatov, Dinarskega gorstva, Balkana in Sredozemlja"], "Zato je Slovenija naravnogeografsko zelo raznolika."],
    [3, "Približno koliko prebivalcev ima Slovenija?", "2,1 milijona", ["1,1 milijona", "3,5 milijona", "5 milijonov"], "Po podatkih SURS približno 2,1 milijona (2024)."],
    [4, "Zakaj je v Ljubljanski kotlini pozimi pogosto megla in onesnažen zrak?", "zaradi temperaturnega obrata, ko hladen zrak obleži v kotlini", ["zaradi burje", "zaradi bližine morja", "zaradi visokih padavin"], "Ob inverziji se onesnaženje ne razredči.", "visja"],
    [4, "Zakaj se v Sloveniji gozd širi?", "zaradi opuščanja kmetovanja na težje obdelovalnih zemljiščih", ["zaradi pogozdovanja v mestih", "zaradi podnebnih sprememb, ki uničujejo travnike", "zaradi gradnje avtocest"], "Gozd pokriva skoraj 60 % površja.", "visja"],
    [4, "Zakaj so dinarskokraške pokrajine razmeroma redko poseljene?", "zaradi pomanjkanja površinske vode, kamnitih tal in reliefa", ["zaradi poplav", "zaradi vulkanov", "zaradi permafrosta"], "Kras ima prepustna tla in malo rodovitne prsti.", "visja"],
  ]);
}
