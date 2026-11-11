import { izbira, besedilo } from "../lib.mjs";

const SIN = [["hiter", "uren"], ["pogumen", "hraber"], ["lep", "čeden"], ["žalosten", "otožen"], ["govoriti", "pripovedovati"], ["zdravnik", "doktor"], ["prijatelj", "drug"], ["pot", "steza"], ["hiša", "dom"], ["začetek", "pričetek"], ["velik", "ogromen"], ["jezen", "besen"]];
const ANT = [["hiter", "počasen"], ["pogumen", "strahopeten"], ["visok", "nizek"], ["vesel", "žalosten"], ["začetek", "konec"], ["dan", "noč"], ["star", "mlad"], ["bogat", "reven"], ["vroč", "mrzel"], ["dobiti", "izgubiti"], ["prijatelj", "sovražnik"], ["glasen", "tih"], ["svetel", "temen"], ["poln", "prazen"]];
const FRAZ = [["imeti maslo na glavi", "biti kriv"], ["biti na trnih", "biti nestrpen, v skrbeh"], ["metati pesek v oči", "zavajati"], ["obesiti na veliki zvon", "razglasiti vsem"], ["imeti dolge prste", "krasti"], ["kupiti mačka v žaklju", "kupiti nekaj brez preverjanja"], ["pasti v vodo", "propasti (o načrtu)"], ["počutiti se kot riba v vodi", "počutiti se zelo dobro"], ["držati jezik za zobmi", "molčati"], ["imeti srce na pravem mestu", "biti dober, pošten"], ["delati iz muhe slona", "pretiravati"], ["iti komu na živce", "jeziti koga"]];
const TVOR = [["učitelj", "izpeljava"], ["mizar", "izpeljava"], ["kavarna", "izpeljava"], ["lepota", "izpeljava"], ["pekarna", "izpeljava"], ["ribič", "izpeljava"], ["vodovod", "zlaganje"], ["nogomet", "zlaganje"], ["zemljevid", "zlaganje"], ["pravopis", "zlaganje"], ["NUK", "krajšanje"], ["EU", "krajšanje"], ["OŠ", "krajšanje"], ["RTV", "krajšanje"]];
const PREV = [["kompjuter", "računalnik"], ["šofer", "voznik"], ["kompromis", "sporazum"], ["informacija", "podatek"], ["problem", "težava"], ["fotografija", "slika"], ["vikend", "konec tedna"], ["rezultat", "izid"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("sopomenka", 10, (r) => {
    const [a, b] = r.izberi(SIN);
    return izbira({ r, tezavnost: 1, besedilo: `Katera beseda je sopomenka (sinonim) besede »${a}«?`, pravilna: b, napacne: r.premesaj(ANT.map(([, y]) => y).filter((y) => y !== a && y !== b)).slice(0, 3), postopek: `<p>${a} – ${b}: besedi z enakim ali podobnim pomenom.</p>` });
  });
  serija("protipomenka", 12, (r, i) => {
    const [a, b] = r.izberi(ANT);
    if (i % 3 === 2) return besedilo({ tezavnost: 2, sprejemljivi: [b], besedilo: `Zapiši protipomenko (antonim) besede »${a}«.`, rezultat: b, postopek: `<p>${a} ↔ ${b}</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Katera beseda je protipomenka (antonim) besede »${a}«?`, pravilna: b, napacne: r.premesaj(ANT.filter(([x]) => x !== a).map(([, y]) => y)).slice(0, 3), postopek: `<p>${a} ↔ ${b}</p>` });
  });
  serija("frazem", 12, (r) => {
    const [f, p] = r.izberi(FRAZ);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj pomeni frazem »${f}«?`, pravilna: p, napacne: r.premesaj(FRAZ.filter(([x]) => x !== f).map(([, y]) => y)).slice(0, 3), postopek: `<p>${f}: ${p}.</p>` });
  });
  serija("tvorba", 10, (r) => {
    const [b, n] = r.izberi(TVOR);
    return izbira({ r, tezavnost: 3, besedilo: `S katerim besedotvornim načinom je nastala beseda »${b}«?`, pravilna: n, napacne: ["izpeljava", "zlaganje", "krajšanje", "sklapljanje"].filter((x) => x !== n), postopek: `<p>${b}: ${n}.</p>` });
  });
  serija("prevzete", 8, (r) => {
    const [t, d] = r.izberi(PREV);
    return izbira({ r, tezavnost: 2, besedilo: `Katera domača beseda lahko nadomesti prevzeto besedo »${t}«?`, pravilna: d, napacne: r.premesaj(PREV.filter(([x]) => x !== t).map(([, y]) => y)).slice(0, 3), postopek: `<p>${t} → ${d}</p>` });
  });
  pojmi([
    ["besedje", "Vse besede nekega jezika."],
    ["sopomenka", "Beseda z enakim ali podobnim pomenom kot druga beseda."],
    ["protipomenka", "Beseda z nasprotnim pomenom."],
    ["enakozvočnica", "Beseda, ki se enako glasi kot druga, a ima drug pomen, npr. »klop«."],
    ["nadpomenka", "Beseda s širšim pomenom, ki zajema več podpomenk."],
    ["podpomenka", "Beseda z ožjim pomenom, ki spada pod nadpomenko."],
    ["frazem", "Ustaljena besedna zveza s prenesenim pomenom."],
    ["neologizem", "Novo nastala beseda."],
    ["arhaizem", "Zastarela beseda."],
    ["izpeljanka", "Beseda, tvorjena iz podstave in obrazila."],
    ["zloženka", "Beseda iz dveh podstav, povezanih z medpono."],
    ["evfemizem", "Olepšani izraz za neprijetno stvar."],
    ["metafora", "Raba besede v prenesenem pomenu na podlagi podobnosti."],
  ]);
  vprasanja([
    [2, "Katera beseda je nadpomenka besedam jabolko, hruška, sliva?", "sadje", ["zelenjava", "drevo", "hrana iz trgovine"], "Sadje je širši pojem."],
    [3, "Kateri priročnik razlaga pomen besed?", "Slovar slovenskega knjižnega jezika", ["Slovenski pravopis", "Slovenska slovnica", "atlas"], "SSKJ je razlagalni slovar."],
    [4, "Katera beseda je evfemizem za »umreti«?", "preminiti", ["crkniti", "roditi se", "zboleti"], "Evfemizem omili neprijeten izraz.", "visja"],
    [4, "Kaj je medpona v zloženki »vodovod«?", "-o-", ["vod-", "-vod", "voda"], "Zloženka: vod + o + vod.", "visja"],
  ]);
}
