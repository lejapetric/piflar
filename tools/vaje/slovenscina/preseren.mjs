import { izbira, besedilo } from "../lib.mjs";

const PES = [["Sonetni venec", "sonetni venec"], ["Krst pri Savici", "epska pesnitev (povest v verzih)"], ["Povodni mož", "romanca"], ["Zdravljica", "napitnica"], ["Gazele", "gazela"], ["Soneti nesreče", "sonet"], ["Turjaška Rozamunda", "romanca"], ["Glosa", "glosa"], ["Nezakonska mati", "lirska pesem (izpoved)"], ["Pevcu", "sonet"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("vrsta", 14, (r) => {
    const [p, v] = r.izberi(PES);
    return izbira({ r, tezavnost: 2, besedilo: `Katera pesniška oblika ali vrsta je Prešernovo delo <em>${p}</em>?`, pravilna: v, napacne: r.premesaj([...new Set(PES.map(([, x]) => x))].filter((x) => x !== v)).slice(0, 3), postopek: `<p><em>${p}</em>: ${v}.</p>` });
  });
  serija("dejstvo", 14, (r, i) => {
    const D = [["Kje se je rodil France Prešeren?", "v Vrbi na Gorenjskem", ["v Kranju", "v Ljubljani", "na Bledu"]], ["Kje je umrl Prešeren?", "v Kranju", ["v Vrbi", "v Ljubljani", "na Dunaju"]], ["Komu je Prešeren posvetil Krst pri Savici?", "Matiji Čopu", ["Juliji Primic", "Andreju Smoletu", "Ani Jelovšek"]], ["Kdo je Črtomir?", "poganski junak Krsta pri Savici, ki se pokristjani", ["krščanski duhovnik", "Prešernov prijatelj", "povodni mož"]], ["Katera Zdravljičina kitica je slovenska himna?", "sedma", ["prva", "tretja", "zadnja"]], ["Kakšno obliko ima vsaka kitica Zdravljice?", "obliko čaše", ["obliko srca", "obliko križa", "obliko kroga"]], ["Kateri akrostih skrivajo začetne črke magistrale Sonetnega venca?", "PRIMICOVI JULJI", ["FRANCETU PREŠERNU", "MATIJI ČOPU", "LJUBI DOMOVINI"]], ["V katerem almanahu je Prešeren objavljal pesmi?", "v Kranjski čbelici", ["v Pisanicah", "v Zori", "v Ljubljanskem zvonu"]], ["Kdaj je izšla zbirka Poezije?", "decembra 1846 (z letnico 1847)", ["1830", "1849", "1866"]], ["Na kateri dan praznujemo slovenski kulturni praznik?", "8. februarja", ["3. decembra", "25. junija", "31. oktobra"]], ["Kdo je Bogomila?", "Črtomirova ljubljena, ki postane kristjanka", ["Prešernova sestra", "junakinja Povodnega moža", "Julija Primic"]], ["Katera pesem je Prešernova izpoved zavrnjene ljubezni do Julije in obenem narodni program?", "Sonetni venec", ["Zdravljica", "Povodni mož", "Glosa"]]];
    const [v, odg, nap] = r.izberi(D);
    return izbira({ r, tezavnost: 2, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("vpis", 6, (r) => {
    const [v, a] = r.izberi([["Koliko sonetov ima Sonetni venec?", ["15", "petnajst"]], ["Katerega leta se je rodil France Prešeren?", ["1800"]], ["Katerega leta je umrl France Prešeren?", ["1849"]], ["Kako se imenuje Prešernova velika ljubezen? (ime in priimek)", ["Julija Primic", "Primic"]]]);
    return besedilo({ tezavnost: 3, sprejemljivi: a, besedilo: v, rezultat: a[0], postopek: `<p>${a[0]}.</p>` });
  });
  pojmi([
    ["Kranjska čbelica", "Almanah, v katerem je Prešeren objavljal pesmi."],
    ["Matija Čop", "Prešernov prijatelj in literarni teoretik, ki je utonil v Savi."],
    ["magistrale", "Petnajsti sonet Sonetnega venca iz začetnih verzov ostalih sonetov."],
    ["gazela", "Orientalska pesniška oblika z enotno rimo."],
    ["glosa", "Pesem, ki razvija misel iz uvodne kitice (motta)."],
    ["napitnica", "Pesem, ki se poje ob nazdravljanju."],
    ["romantična ironija", "Prešernovo distanciranje od lastnih čustev."],
    ["abecedna vojna", "Spor o pisavi, v katerem sta Čop in Prešeren nasprotovala Metelkovi pisavi."],
    ["krščanska resignacija", "Vdanost v usodo, ki jo sprejme Črtomir."],
    ["Uvod (Krst pri Savici)", "Del pesnitve o bojih zadnjih poganov pod Črtomirom.", { brezVpisa: true }],
    ["Poezije", "Edina Prešernova pesniška zbirka."],
    ["sonetni venec", "Cikel 15 sonetov, povezanih z zadnjim in prvim verzom."],
  ]);
  vprasanja([
    [4, "Zakaj je Zdravljica dolgo ni smela iziti?", "zaradi cenzure, ker je kazala na narodne in svobodoljubne ideje", ["ker je bila predolga", "ker je bila napisana v nemščini", "ker je Prešeren ni dokončal"], "Izšla je šele leta 1848.", "visja"],
    [4, "Kaj izraža zaključek Krsta pri Savici?", "Črtomirovo vdanost v usodo in odpoved osebni sreči", ["zmago poganov", "poroko Črtomira in Bogomile", "Črtomirovo maščevanje"], "Bogomila in Črtomir se ločita; ljubezen se izpolni v onstranstvu.", "visja"],
    [4, "Kako je Prešeren v Sonetnem vencu povezal ljubezen in narod?", "Julija bi kot muza lahko navdihnila poezijo, ki bi prebudila narod", ["Julija je simbol tujine", "narod je ovira za ljubezen", "povezave ni"], "Ljubezenska in narodna tema se prepletata.", "visja"],
  ]);
}
