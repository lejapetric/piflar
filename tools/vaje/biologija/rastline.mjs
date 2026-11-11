import { izbira, kolicina, T, L } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("tkivo", 8, (r) => {
    const [t, f] = r.izberi([["ksilem", "prevajanje vode in mineralnih snovi"], ["floem", "prevajanje organskih snovi (sladkorjev)"], ["meristem", "delitev celic in rast"], ["povrhnjica (epidermis)", "zaščita"], ["palisadno tkivo", "fotosinteza"], ["kambij", "debelinska rast"], ["listne reže", "izmenjava plinov in transpiracija"], ["koreninski laski", "sprejem vode"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kakšna je naloga dela rastline: ${t}?`, pravilna: f, napacne: r.premesaj(["prevajanje vode in mineralnih snovi", "prevajanje organskih snovi (sladkorjev)", "delitev celic in rast", "zaščita", "fotosinteza", "debelinska rast", "izmenjava plinov in transpiracija", "sprejem vode"].filter((x) => x !== f)).slice(0, 3), postopek: `<p>${t.charAt(0).toUpperCase() + t.slice(1)}: ${f}.</p>` });
  });
  serija("hormon", 6, (r) => {
    const [h, f] = r.izberi([["avksin", "podaljševanje celic in fototropizem"], ["giberelin", "rast stebla in kalitev semen"], ["citokinin", "delitev celic"], ["abscizinska kislina", "zapiranje listnih rež ob suši"], ["etilen", "zorenje plodov"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri rastlinski hormon je povezan z: ${f}?`, pravilna: h, napacne: ["avksin", "giberelin", "citokinin", "abscizinska kislina", "etilen"].filter((x) => x !== h).slice(0, 3), postopek: `<p>${h.charAt(0).toUpperCase() + h.slice(1)}: ${f}.</p>` });
  });
  serija("tropizem", 6, (r) => {
    const [d, odg] = r.izberi([["steblo se upogne proti svetlobi", "pozitivni fototropizem"], ["korenina raste navzdol", "pozitivni gravitropizem"], ["steblo raste navzgor", "negativni gravitropizem"], ["vitica se ovije okoli opore", "tigmotropizem"], ["korenina raste proti vodi", "hidrotropizem"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kako imenujemo odziv: ${d}?`, pravilna: odg, napacne: ["pozitivni fototropizem", "pozitivni gravitropizem", "negativni gravitropizem", "tigmotropizem", "hidrotropizem"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("transpiracija", 7, (r, i) => {
    const m0 = r.int(200, 500), dm = r.int(5, 60), t = r.int(1, 8);
    if (i % 2) return kolicina({ tezavnost: 2, vrednost: dm / t, tol: 0.01, enota: "g/h", besedilo: `Lonček z rastlino je imel maso ${m0} g, po ${t} h pa ${m0 - dm} g. Kolikšna je povprečna hitrost transpiracije?`, rezultat: `${T(dm / t, 2)} g/h`, postopek: `<p>\\(\\frac{${dm}\\ \\text{g}}{${t}\\ \\text{h}} \\approx ${L(dm / t, 2)}\\ \\text{g/h}\\)</p>` });
    const P = r.int(2, 20) * 10, v = (dm / t / P) * 100;
    return kolicina({ tezavnost: 3, vrednost: v, tol: 0.01, enota: "g/(h·dm²)", besedilo: `Rastlina z listno površino ${P} cm² v ${t} h izgubi ${dm} g vode. Kolikšna je transpiracija na dm² listne površine na uro?`, rezultat: `${T(v, 2)} g/(h·dm²)`, postopek: `<p>\\(${P}\\ \\text{cm}^2 = ${L(P / 100, 2)}\\ \\text{dm}^2\\)</p><p>\\(\\frac{${dm}}{${t} \\cdot ${L(P / 100, 2)}} \\approx ${L(v, 2)}\\)</p>` });
  });
  serija("dejavnik-transpiracije", 5, (r) => {
    const [d, odg] = r.izberi([["povišamo temperaturo", "se poveča"], ["povečamo vlažnost zraka", "se zmanjša"], ["rastlino izpostavimo vetru", "se poveča"], ["rastlina zapre listne reže", "se zmanjša"], ["povečamo jakost svetlobe", "se poveča"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Kaj se zgodi s transpiracijo, če ${d}?`, pravilna: odg, napacne: [odg === "se poveča" ? "se zmanjša" : "se poveča", "se ne spremeni"], postopek: `<p>Transpiracija ${odg}: odvisna je od razlike vlažnosti, temperature, vetra in odprtosti rež.</p>` });
  });
  pojmi([
    ["transpiracija", "Izhlapevanje vode iz rastline, predvsem skozi listne reže."],
    ["koreninski pritisk", "Tlak, ki potiska vodo iz korenine v steblo."],
    ["kohezija", "Privlak med molekulami vode, ki omogoča neprekinjen vodni stolpec v ksilemu."],
    ["listna reža", "Odprtina v povrhnjici lista, ki jo obdajata celici zapiralki."],
    ["fototropizem", "Rast rastline glede na smer svetlobe."],
    ["opraševanje", "Prenos peloda na brazdo pestiča."],
    ["dvojna oploditev", "Oploditev jajčne celice in centralne celice pri kritosemenkah."],
    ["endosperm", "Hranilno tkivo v semenu, ki nastane z dvojno oploditvijo."],
    ["kalitev", "Začetek rasti zarodka iz semena."],
    ["meristem", "Tkivo iz celic, ki se neprestano delijo."],
    ["vegetativno razmnoževanje", "Nespolno razmnoževanje rastlin z deli rastline."],
    ["menjava generacij", "Izmenjevanje spolne (gametofit) in nespolne (sporofit) generacije."],
    ["avksin", "Rastlinski hormon, ki spodbuja podaljševanje celic."],
  ]);
  vprasanja([
    [3, "Zakaj se ob suši listne reže zaprejo?", "da rastlina zmanjša izgubo vode", ["da poveča fotosintezo", "da sprejme več CO₂", "da izloči kisik"], "Abscizinska kislina sproži zapiranje rež."],
    [4, "Zakaj se steblo upogne proti svetlobi?", "ker se avksin kopiči na senčni strani, kjer se celice bolj podaljšajo", ["ker se avksin kopiči na osvetljeni strani", "ker svetloba uniči celice", "ker klorofil vleče steblo"], "Neenakomerna razporeditev avksina povzroči upogib.", "visja"],
    [4, "Kateri mehanizem najbolj prispeva k dviganju vode v visokih drevesih?", "transpiracijski vlek s kohezijo vode", ["koreninski pritisk", "aktivni transport v ksilemu", "gravitacija"], "Izhlapevanje ustvari podtlak, ki vleče vodni stolpec navzgor.", "visja"],
    [4, "Kaj nastane iz plodnice po oploditvi?", "plod", ["seme", "pelod", "cvet"], "Iz semenske zasnove nastane seme, iz plodnice plod.", "visja"],
    [2, "Katera rastlinska skupina ima najbolj izraženo generacijo gametofita?", "mahovi", ["praprotnice", "golosemenke", "kritosemenke"], "Pri mahovih je zelena rastlinica gametofit."],
  ]);
}
