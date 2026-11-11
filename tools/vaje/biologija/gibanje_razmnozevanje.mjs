import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("misice", 7, (r) => {
    const [d, odg] = r.izberi([["mišica srca, se krči neutrudno in nehoteno", "srčna mišičnina"], ["mišica v steni črevesa", "gladka mišičnina"], ["mišica, ki premika kosti in jo zavestno krčimo", "skeletna (progasta) mišičnina"], ["mišica v steni žil", "gladka mišičnina"], ["mišica s številnimi jedri v vsakem vlaknu", "skeletna (progasta) mišičnina"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Katera vrsta mišičnine: ${d}?`, pravilna: odg, napacne: ["srčna mišičnina", "gladka mišičnina", "skeletna (progasta) mišičnina"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("krcenje", 5, (r) => {
    const [d, odg] = r.izberi([["Ca²⁺ se sprostijo iz sarkoplazemskega retikuluma", "omogočijo vezavo miozina na aktin"], ["ATP se veže na miozinsko glavo", "miozin se odcepi od aktina"], ["miozinska glava razgradi ATP", "glava se napne za nov zamah"], ["po smrti zmanjka ATP", "mišice otrdijo (mrtvaška okorelost)"]]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kaj je posledica tega dogodka pri krčenju mišice: ${d}?`, pravilna: odg, napacne: ["omogočijo vezavo miozina na aktin", "miozin se odcepi od aktina", "glava se napne za nov zamah", "mišice otrdijo (mrtvaška okorelost)"].filter((x) => x !== odg), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${odg}.</p>` });
  });
  serija("cikel", 8, (r, i) => {
    const d = r.int(24, 35), ov = d - 14;
    if (i % 2) return kolicina({ tezavnost: 3, vrednost: ov, enota: "dan", besedilo: `Menstrualni cikel ženske traja ${d} dni. Kateri dan cikla približno pride do ovulacije (lutealna faza traja 14 dni)?`, rezultat: `${ov}. dan`, postopek: `<p>\\(${d} - 14 = ${ov}\\)</p>` });
    const [h, odg] = r.izberi([["LH", "sproži ovulacijo"], ["FSH", "spodbuja zorenje folikla"], ["progesteron", "vzdržuje maternično sluznico"], ["estrogen", "obnavlja maternično sluznico"], ["hCG", "vzdržuje rumeno telesce v nosečnosti"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšna je vloga hormona ${h} v menstrualnem ciklu?`, pravilna: odg, napacne: ["sproži ovulacijo", "spodbuja zorenje folikla", "vzdržuje maternično sluznico", "obnavlja maternično sluznico", "vzdržuje rumeno telesce v nosečnosti"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${h}: ${odg}.</p>` });
  });
  serija("gametogeneza", 6, (r) => {
    const n = r.int(2, 50), sp = r.izberi([true, false]);
    return kolicina({ tezavnost: 3, vrednost: sp ? 4 * n : n, enota: "", besedilo: `Koliko ${sp ? "semenčic" : "jajčnih celic"} nastane z mejozo iz ${n} ${sp ? "primarnih spermatocit" : "primarnih oocit"}?`, rezultat: `${sp ? 4 * n : n}`, postopek: `<p>${sp ? "Iz vsake primarne spermatocite nastanejo 4 semenčice" : "Iz vsake primarne oocite nastane 1 jajčna celica in polarna telesca"}: ${sp ? 4 * n : n}.</p>` });
  });
  serija("kost", 6, (r) => {
    const [k, odg] = r.izberi([["stegnenica", "spodnja okončina"], ["lopatica", "ramenski obroč"], ["koželjnica", "zgornja okončina"], ["vretence", "hrbtenica"], ["golenica", "spodnja okončina"], ["ključnica", "ramenski obroč"], ["čelnica", "lobanja"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kateremu delu okostja pripada kost ${k}?`, pravilna: odg, napacne: ["spodnja okončina", "ramenski obroč", "zgornja okončina", "hrbtenica", "lobanja"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${k.charAt(0).toUpperCase() + k.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["sarkomera", "Osnovna krčljiva enota mišičnega vlakna med dvema Z-linijama."],
    ["aktin", "Tanek beljakovinski filament v mišičnih vlaknih."],
    ["miozin", "Debel beljakovinski filament z glavami, ki vlečejo aktin."],
    ["kita", "Vezivo, ki povezuje mišico s kostjo."],
    ["sklep", "Gibljiva povezava med kostmi."],
    ["antagonistični mišici", "Mišici, ki delujeta nasprotno, npr. dvoglava in troglava."],
    ["oploditev", "Zlitje jajčne celice in semenčice."],
    ["ovulacija", "Sprostitev jajčne celice iz jajčnika."],
    ["posteljica", "Organ, prek katerega se zarodek prehranjuje in izmenjuje snovi z materjo."],
    ["zigota", "Diploidna celica, ki nastane z oploditvijo."],
    ["rumeno telesce", "Ostanek folikla, ki izloča progesteron."],
    ["nespolno razmnoževanje", "Razmnoževanje brez gamet, potomci so genetsko enaki staršu."],
    ["blastocista", "Zgodnji zarodek v obliki votle krogle, ki se ugnezdi v maternico."],
  ]);
  vprasanja([
    [3, "Zakaj nastanejo pri ženski iz ene primarne oocite le ena jajčna celica in polarna telesca?", "da jajčna celica obdrži večino citoplazme in hranil", ["ker se oocita ne deli", "ker so polarna telesca semenčice", "ker je mejoza nepopolna"], "Neenakomerna delitev citoplazme."],
    [4, "Zakaj ostane v nosečnosti maternična sluznica ohranjena?", "ker hCG vzdržuje rumeno telesce, ki izloča progesteron", ["ker se poveča FSH", "ker preneha izločanje estrogena", "ker LH sproži novo ovulacijo"], "Brez progesterona bi se sluznica luščila.", "visja"],
    [4, "Kaj se zgodi z dolžino sarkomere pri krčenju?", "skrajša se, filamenta aktina in miozina pa ostaneta enako dolga", ["podaljša se", "aktin se skrajša", "miozin se razgradi"], "Teorija drsečih filamentov.", "visja"],
    [4, "Zakaj nastajajo enojajčni dvojčki genetsko enaki?", "ker nastanejo iz ene zigote, ki se razdeli na dva zarodka", ["ker ju oplodi ista semenčica dvakrat", "ker nastaneta iz dveh jajčec", "ker imata enake starše"], "Dvojajčni dvojčki nastanejo iz dveh jajčnih celic.", "visja"],
    [2, "Kje navadno poteka oploditev pri človeku?", "v jajcevodu", ["v maternici", "v jajčniku", "v nožnici"], "Zigota nato potuje v maternico in se ugnezdi."],
  ]);
}
