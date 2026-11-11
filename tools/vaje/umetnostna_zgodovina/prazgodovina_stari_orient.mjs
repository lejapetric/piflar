import { izbira } from "../lib.mjs";
const DL = [["Lascaux", "jamske poslikave v Franciji"], ["Altamira", "jamske poslikave v Španiji"], ["Willendorfska Venera", "paleolitski kipec plodnosti"], ["Stonehenge", "megalitski kromleh v Angliji"], ["Vaška situla", "železnodobna situla z reliefnimi prizori iz Slovenije"], ["Keopsova piramida", "največja piramida v Gizi"], ["Ištarina vrata", "glazirana opečna vrata v Babilonu"], ["zigurat v Uru", "stopničasti tempeljski stolp v Mezopotamiji"], ["Nefertitin doprsni kip", "egipčanski portret kraljice iz Amarne"], ["Hamurabijev zakonik", "stela z zakoni in reliefom kralja pred bogom Šamašem"], ["Tutankamonova maska", "zlata pogrebna maska faraona"], ["Narmerjeva paleta", "zgodnja egipčanska reliefna paleta"]];
const OB = [["Vaška situla", "Slovenija"], ["Lascaux", "Francija"], ["Stonehenge", "Anglija"], ["Ištarina vrata", "Mezopotamija (Babilon)"], ["Keopsova piramida", "Egipt"], ["Willendorfska Venera", "Avstrija"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("delo", 24, (r, i) => {
    const [d, op] = DL[i % 12];
    if (i < 12) return izbira({ r, tezavnost: 2, besedilo: `Kaj je <em>${d}</em>?`, pravilna: op, napacne: r.premesaj(DL.filter(([x]) => x !== d).map(([, y]) => y)).slice(0, 3), postopek: `<p>${d}: ${op}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katero delo je ${op}?`, pravilna: d, napacne: r.premesaj(DL.filter(([x]) => x !== d).map(([x]) => x)).slice(0, 3), postopek: `<p>${op}: ${d}.</p>` });
  });
  serija("kje", 6, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Kje je nastalo oziroma bilo najdeno delo <em>${OB[i][0]}</em>?`, pravilna: OB[i][1], napacne: r.premesaj(OB.filter((_, j) => j !== i).map(([, y]) => y)).slice(0, 3), postopek: `<p>${OB[i][0]}: ${OB[i][1]}.</p>` }));
  pojmi([
    ["megalit", "Velik kamniti blok, postavljen kot spomenik ali grob."],
    ["menhir", "Pokončno postavljen samostojni megalit."],
    ["dolmen", "Megalitski grob iz pokončnih kamnov in krovne plošče."],
    ["kromleh", "Megaliti, postavljeni v krog."],
    ["situla", "Vedrasta kovinska posoda, pogosto z reliefnimi prizori."],
    ["piramida", "Egipčanski kraljevi grob v obliki piramide."],
    ["mastaba", "Egipčanski grob v obliki prisekane piramide s pravokotno osnovo."],
    ["zigurat", "Mezopotamski stopničasti tempeljski stolp."],
    ["hieroglifi", "Egipčanska slikovna pisava."],
    ["kanon", "Sistem razmerij, ki določa upodobitev človeškega telesa."],
  ]);
  vprasanja([
    [3, "Kako so Egipčani upodabljali človeško telo na reliefih in slikah?", "glava in noge v profilu, oko in ramena od spredaj", ["vse v profilu", "vse od spredaj", "v linearni perspektivi"], "Vsak del je prikazan v najznačilnejšem pogledu."],
    [4, "Zakaj so egipčanski kipi togi in frontalni?", "ker so bili namenjeni večnemu bivanju duše, ne posnemanju trenutka", ["ker Egipčani niso znali klesati", "ker so bili iz lesa", "ker so jih postavljali v vodo"], "Večnost in red sta bila pomembnejša od gibanja.", "visja"],
    [4, "Zakaj je Vaška situla pomembna za slovensko umetnostno dediščino?", "je vrhunski primer situlske umetnosti iz starejše železne dobe s prizori pojedine in tekmovanj", ["je rimski mozaik", "je gotska freska", "je baročni oltar"], "Najdena na Vačah, okoli 500 pr. n. št.", "visja"],
  ]);
}
