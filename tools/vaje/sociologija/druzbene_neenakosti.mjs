import { izbira } from "../lib.mjs";
const ST = [["spol", "pripisani"], ["poklic zdravnika", "pridobljeni"], ["plemiški naziv po rojstvu", "pripisani"], ["univerzitetna izobrazba", "pridobljeni"], ["starost", "pripisani"], ["naslov olimpijskega prvaka", "pridobljeni"], ["etnična pripadnost", "pripisani"], ["položaj župana", "pridobljeni"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("status", 8, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Ali je ${ST[i][0]} pripisani ali pridobljeni status?`, pravilna: ST[i][1], napacne: [ST[i][1] === "pripisani" ? "pridobljeni" : "pripisani"], postopek: `<p>Pripisani status dobimo z rojstvom, pridobljenega z lastnim prizadevanjem.</p>` }));
  pojmi([
    ["družbena stratifikacija", "Razslojenost družbe na hierarhično urejene skupine z neenakim dostopom do dobrin."],
    ["pripisani status", "Položaj, ki ga posameznik dobi ob rojstvu, ne glede na svoje zasluge."],
    ["pridobljeni status", "Položaj, ki ga posameznik doseže z lastnim prizadevanjem."],
    ["kastni sistem", "Zaprt sistem stratifikacije, v katerem je položaj določen z rojstvom in prehod ni mogoč."],
    ["stanovski sistem", "Fevdalni sistem plemstva, duhovščine in podložnikov, utemeljen z zakonom in običaji."],
    ["razredni sistem", "Odprt sistem stratifikacije, temelječ predvsem na ekonomskem položaju."],
    ["družbena mobilnost", "Gibanje posameznikov ali skupin med položaji v družbeni hierarhiji."],
    ["medgeneracijska mobilnost", "Sprememba položaja otrok v primerjavi s položajem staršev."],
    ["kulturni kapital", "Po Bourdieuju znanje, okus in navade, ki prinašajo prednosti, npr. v šoli."],
    ["družbeni spol", "Družbeno oblikovana pričakovanja in vloge, povezane z moškostjo in ženskostjo."],
    ["absolutna revščina", "Pomanjkanje sredstev za zadovoljevanje osnovnih življenjskih potreb."],
    ["relativna revščina", "Revščina v primerjavi s prevladujočim življenjskim standardom družbe."],
    ["socialna izključenost", "Odrinjenost posameznikov ali skupin od polnega sodelovanja v družbi."],
    ["meritokracija", "Sistem, v katerem položaj temelji na sposobnostih in zaslugah."],
  ]);
  vprasanja([
    [3, "Na čem po Marxu temelji delitev na razrede?", "na lastništvu produkcijskih sredstev", ["na izobrazbi", "na ugledu", "na religiji"], "Buržoazija ima produkcijska sredstva, proletariat prodaja delovno silo."],
    [4, "Katere tri razsežnosti stratifikacije loči Weber?", "razred, status (ugled) in stranka (moč)", ["kasta, stan, razred", "kapital, delo, zemlja", "spol, starost, etnija"], "Weber je Marxovo ekonomsko razlago dopolnil.", "visja"],
    [4, "Kako funkcionalisti (Davis in Moore) upravičujejo neenakost?", "visoke nagrade privabijo najsposobnejše na najpomembnejše položaje", ["neenakost je posledica izkoriščanja", "neenakost je naključna", "neenakost ne obstaja"], "Kritiki opozarjajo, da dedovanje in privilegiji izkrivljajo tekmovanje.", "visja"],
    [4, "Kaj pomeni feminizacija revščine?", "naraščajoč delež žensk med revnimi", ["izginjanje revščine pri ženskah", "večje plače žensk", "revščina samo v ženskih poklicih"], "Vzroki: nižje plače, enostarševske družine, skrbstveno delo.", "visja"],
  ]);
}
