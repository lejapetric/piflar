import { izbira } from "../lib.mjs";

const SZ = [["prijateljem", "s"], ["kolesom", "s"], ["torbo", "s"], ["sestro", "s"], ["čopičem", "s"], ["fotoaparatom", "s"], ["helikopterjem", "s"], ["tabo", "s"], ["bratom", "z"], ["mamo", "z"], ["avtom", "z"], ["ladjo", "z"], ["vlakom", "z"], ["učiteljem", "z"], ["golobom", "z"], ["dedkom", "z"], ["Janezom", "z"], ["rokami", "z"]];
const KH = [["mami", "k"], ["sestri", "k"], ["zdravniku", "k"], ["babici", "k"], ["kosilu", "h"], ["gospe", "h"], ["Gregorju", "h"], ["kolegu", "h"], ["prijatelju", "k"], ["očetu", "k"], ["hiši", "k"], ["gori", "h"], ["koncu", "h"], ["vratom", "k"]];
const ZAC = [["Slovenci", "slovenci"], ["slovenski jezik", "Slovenski jezik"], ["Ljubljana", "ljubljana"], ["ljubljanski grad", "Ljubljanski Grad"], ["ponedeljek", "Ponedeljek"], ["Republika Slovenija", "republika Slovenija"], ["Blejsko jezero", "blejsko jezero"], ["Triglavski narodni park", "Triglavski Narodni Park"], ["angleščina", "Angleščina"], ["Prešernova nagrada", "prešernova nagrada"], ["dr. Novak", "Dr. Novak"], ["Ljubljančan", "ljubljančan"], ["Organizacija združenih narodov", "organizacija Združenih Narodov"], ["Sredozemsko morje", "sredozemsko morje"], ["božič", "Božič"]];
const SK = [["ne vem", "nevem"], ["na primer", "naprimer"], ["nemogoče", "ne mogoče"], ["vsakdo", "vsak do"], ["obenem", "ob enem"], ["naprej", "na prej"], ["ne morem", "nemorem"], ["pred kratkim", "predkratkim"], ["nihče", "ni hče"], ["zato ker", "zatoker"], ["kljub temu", "kljubtemu"]];
const VEJ = [["Vem, da prideš.", "Vem da prideš."], ["Kupil sem kruh in mleko.", "Kupil sem kruh, in mleko."], ["Knjiga, ki jo bereš, je moja.", "Knjiga ki jo bereš je moja."], ["Ko je zazvonilo, smo odšli.", "Ko je zazvonilo smo odšli."], ["Ostal je doma, ker je bil bolan.", "Ostal je doma ker je bil bolan."], ["Rad bi šel, a nimam časa.", "Rad bi šel a nimam časa."], ["Pridi jutri ali pa v petek.", "Pridi jutri, ali pa v petek."], ["Mojca, pridi sem!", "Mojca pridi sem!"], ["Na izletu smo videli srne, jelene in lisico.", "Na izletu smo videli srne, jelene, in lisico."], ["Ne vem, kdo je to rekel.", "Ne vem kdo je to rekel."]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("s-z", 12, (r) => {
    const [b, p] = r.izberi(SZ);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri predlog je pravilen: ___ ${b}?`, pravilna: `${p} ${b}`, napacne: [`${p === "s" ? "z" : "s"} ${b}`], postopek: `<p>Predlog <em>s</em> pišemo pred nezvenečimi nezvočniki (p, t, k, s, š, c, č, f, h), sicer <em>z</em>: ${p} ${b}.</p>` });
  });
  serija("k-h", 10, (r) => {
    const [b, p] = r.izberi(KH);
    return izbira({ r, tezavnost: 1, besedilo: `Kateri predlog je pravilen: ___ ${b}?`, pravilna: `${p} ${b}`, napacne: [`${p === "k" ? "h" : "k"} ${b}`], postopek: `<p>Predlog <em>h</em> pišemo pred <em>k</em> in <em>g</em>, sicer <em>k</em>: ${p} ${b}.</p>` });
  });
  serija("zacetnica", 12, (r) => {
    const [p, n] = r.izberi(ZAC);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri zapis je pravilen sredi povedi: »${p}« ali »${n}«?`, pravilna: p, napacne: [n], postopek: `<p>Pravilno: ${p}.</p>` });
  });
  serija("skupaj", 10, (r) => {
    const [p, n] = r.izberi(SK);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri zapis je pravilen: »${p}« ali »${n}«?`, pravilna: p, napacne: [n], postopek: `<p>Pravilno pišemo: ${p}.</p>` });
  });
  serija("vejica", 10, (r) => {
    const [p, n] = r.izberi(VEJ);
    return izbira({ r, tezavnost: 3, besedilo: "Katera poved ima pravilno postavljene vejice?", pravilna: p, napacne: [n], postopek: `<p>Pravilno: ${p} Vejica loči odvisnik od glavnega stavka, ogovor in priredno zvezo brez veznika; pred <em>in</em>, <em>ali</em> pri naštevanju je ne pišemo.</p>` });
  });
  pojmi([
    ["pravopis", "Pravila za zapisovanje besed in ločil."],
    ["velika začetnica", "Velika črka na začetku povedi ali lastnega imena."],
    ["lastno ime", "Ime, ki poimenuje posamezno osebo, kraj, ustanovo ipd."],
    ["občno ime", "Ime za vse predmete ali bitja iste vrste."],
    ["ločilo", "Znak, ki v zapisu ločuje dele besedila."],
    ["vejica", "Ločilo, ki loči stavke ali dele stavka."],
    ["pomišljaj", "Ločilo, ki nakazuje premor ali vrinjeni del."],
    ["vezaj", "Kratka črtica brez presledkov, npr. v zvezi »slovensko-angleški«."],
    ["krajšava", "Skrajšan zapis besede s piko, npr. »npr.«."],
    ["kratica", "Beseda iz začetnic, npr. »OŠ«."],
    ["deljenje besed", "Prenašanje dela besede v naslednjo vrstico po zlogih."],
    ["narekovaj", "Ločilo za premi govor in navedke."],
    ["premi govor", "Dobesedno navedene besede osebe."],
  ]);
  vprasanja([
    [2, "Katero ločilo pišemo za ogovorom na začetku povedi (npr. Ana, pridi.)?", "vejico", ["piko", "dvopičje", "pomišljaj"], "Ogovor ločimo z vejico."],
    [3, "Kako pravilno zapišemo premi govor?", "»Pridi jutri,« je rekla mama.", ["»Pridi jutri« je rekla mama.", "»Pridi jutri.« je rekla mama.", "Pridi jutri, je rekla mama."], "Za premim govorom pred spremnim stavkom pišemo vejico znotraj narekovajev."],
    [4, "Kako zapišemo pridevnik iz imena Gregor (svojilni) v zvezi »… knjiga«?", "Gregorjeva knjiga", ["gregorjeva knjiga", "Gregorova knjiga", "gregorova knjiga"], "Svojilni pridevniki iz osebnih imen imajo veliko začetnico.", "visja"],
    [4, "Zakaj pišemo »Slovenec« z veliko, »slovenski« pa z malo začetnico?", "prebivalsko ime je lastno ime, vrstni pridevnik pa ne", ["ker je pridevnik daljši", "ker je samostalnik na začetku", "zaradi naglasa"], "Imena prebivalcev pišemo z veliko začetnico.", "visja"],
  ]);
}
