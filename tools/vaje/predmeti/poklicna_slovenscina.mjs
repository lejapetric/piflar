// Poklicna matura, slovenščina: naloge za vajo po snoveh poklicne mature.
// Jezikovni del vzame naloge splošne mature iz poglavij, ki jih katalog poklicne mature zajema;
// pri književnosti obdrži le naloge o besedilih in avtorjih s seznama za ustni izpit (P-SLM-2025).
// Za zgradbo izpita je lasten pojmovnik. Vse naloge so na eni ravni (brez višje ravni).
// Zgradi najprej api/data/vaje/slovenscina.json (node tools/vaje/gradi.mjs slovenscina).
import { readFileSync } from "node:fs";
import { pojmovnik } from "../lib.mjs";

const SM = JSON.parse(readFileSync(new URL("../../../api/data/vaje/slovenscina.json", import.meta.url)));

// Avtorji in dela s seznama za ustni izpit poklicne mature
const ORIENT_RAZSV = /Biblij|Prilik|izgubljen|Homer|Odisej|Iliad|Sofoklej|Ojdip|Antigon|antičn|tragedij|ep\b|Brižin|pridig|ljudsk|Rošlin|Vid[ae]|Zelen|Matjaž|Zlatorog|Kurent|Shakespeare|Romeo|Hamlet|renesans|Trubar|reformacij|protestant|Svetokrišk|barok|Vodnik|Linhart|Matiček|razsvetljen|komedij/i;
const ROM_REAL = /Goethe|Lermontov|Heine|Puškin|Onjegin|romanti|Prešer|sonet|Krst pri Savici|Zdravljic|Flaubert|Bovary|Dostojevsk|Zločin|Zola|Beznic|naturaliz|realiz|Ibsen|Nora|Strahov|Jenk|Obraz|Gregorčič|Jurčič|Deseti brat|Telečj|Tilk|Kersnik|Jara gospoda|zemljišk|Tavčar|Visošk|Cvetje v jeseni|Aškerc|Mejnik|balad/i;
const MODERNA = /Wilde|Salom|modern|dekaden|simboliz|impresioniz|Kette|Murn|Župančič|Duma|Z vlakom|Cankar|Kačur|Na klancu|črtic|Kostanj|stotnik|Hlapc|Jerman|narodov blagor/i;
const PRVA = /Kafk|Preobrazb|Kosovel|Slutnj|Ekstaz|kons|konstruktiv|ekspresioniz|avantgard|Pregelj|Matkova|Grum|Gog[ia]|Prežih|Samorastnik|požiralnik|socialn|Kranjec|Režonj|Kajuh/i;
const DRUGA = /Ionesco|Plešast|Beckett|Godot|Sartre|Zaprta vrata|absurd|eksistencial|Menart|Pavček|Krakar|Zlobec|intimiz|Kovič|Zajc|Strniš|Makarovi|Šalamun|ludiz|Šteger|Kosmač|Tantadruj|Zupan|Menuet|Tomšič|Blatnik|Skubic|Fužinsk|Lainšček|Glavan|Smole|Jančar|valček|Zupančič|Vladimir|modernizem|postmodern/i;

const SNOVI = {
  izpit_pm_slovenscina: [["jezik_sporazumevanje", /nastop|nebesed|govorn|poslušal|glasn/i]],
  razclemba_besedila: [["besedilo", /merila|povezan|navez|sovisn|smiseln|zaokrožen|okolišč|namen|tema|razčlemb|izhodišč|dejstv|mnenj/i], ["jezik_sporazumevanje", /sporočeval|naslovnik|okolišč|faz|načel|sporazumev|namen|tema/i]],
  publicisticna_strokovna: [["besedilo", /publicist|novic|poročil|intervju|komentar|ocen|kritik|članek|strokovn|predstavit|postop|navodil|oglas/i], ["jezikovne_zvrsti", /funkcijsk|publicist|strokovn|znanstven|uradn|praktičn|umetnostn/i]],
  uradna_javna_besedila: [["besedilo", /uradn|prošnj|pritožb|opravičil|vabil|zapisnik|življenjepis|dopis|zahval|obvestil|oglas|zadeva|nagovor/i], ["jezik_sporazumevanje", /nebesed|pisanj/i], ["jezikovne_zvrsti", /uradn/i]],
  tvorba_besedila: [["besedilo", /tvor|napiš|merila|zgradb|odstav|naslov|obseg|zaokrož|sovisn|smiseln/i], ["jezik_sporazumevanje", /faz|načel|načrt|ubesed|pregled/i]],
  besedje_pm: [["besedje", null]],
  skladnja_pm: [["skladnja", null], ["oblikoslovje", /besedn[ae] vrst|samostalnik|glagol|pridevnik|zaimek|prislov|veznik|predlog|členek/i]],
  pravopis_slog_pm: [["pravopis", null], ["glasoslovje_pravorecje", /izgovor|naglas|knjižn|premen|pravorečj|u̯|zven/i]],
  jezik_v_druzbi: [["jezikovne_zvrsti", null], ["jezik_sporazumevanje", /vlog|znamen|sistem|jezik/i]],
  interpretacija_pm: [["uvod_knjizevnost", null]],
  knjizevnost_do_razsvetljenstva: ["orient", "antika", "srednji_vek", "ljudsko_slovstvo", "renesansa", "reformacija_barok", "razsvetljenstvo"].map((p) => [p, ORIENT_RAZSV]),
  romantika_realizem_pm: ["evropska_romantika", "preseren", "realizem", "med_romantiko_realizmom"].map((p) => [p, ROM_REAL]),
  moderna_pm: [["evropska_moderna", MODERNA], ["slovenska_moderna", MODERNA]],
  knjizevnost_prva_polovica: [["svet_prva_polovica_20", PRVA], ["slovenska_prva_polovica_20", PRVA]],
  knjizevnost_druga_polovica: ["svet_druga_polovica_20", "slovensko_pesnistvo_20", "slovensko_pripovednistvo_20", "slovenska_dramatika_20"].map((p) => [p, DRUGA]),
};

const IZPIT = [
  ["izpitna pola 1", "Razčlemba neumetnostnega besedila in tvorba krajšega neumetnostnega besedila (60 minut, 40 % ocene)"],
  ["izpitna pola 2", "Vodena ali samostojna interpretacija (odlomka) umetnostnega besedila (60 minut, 30 % ocene)"],
  ["ustni izpit", "Glasno branje, vodena interpretacija in povezava z jezikovnimi temami (do 20 minut, 30 % ocene)"],
  ["izhodiščno besedilo", "Neumetnostno besedilo, ki ga v izpitni poli 1 razčlenjuješ"],
  ["tvorba", "Naloga odprtega tipa v izpitni poli 1, kjer napišeš krajše besedilo dane besedilne vrste"],
  ["vodena interpretacija", "Interpretacija, pri kateri v povezanem besedilu odgovoriš na vprašanja iz navodila"],
  ["aktualizacija", "Povezava problema iz besedila s sedanjostjo in lastnim življenjem"],
  ["priprava", "15 minut pred ustnim izpitom, ko prebereš odlomek in vprašanja z izpitnega listka"],
  ["izpitni listek", "Listek z odlomkom literarnega besedila in vprašanji, ki ga pripravijo učitelji na šoli"],
  ["taksonomska stopnja", "Raven zahtevnosti naloge: poznavanje, razumevanje in uporaba, vrednotenje"],
  ["JPSU", "Jezikovna pravilnost in slogovna ustreznost: 6 točk v izpitni poli 2"],
  ["ZR", "Znanje in razumevanje: opredelitev zvrsti in vrste ter povzetek besedila v interpretaciji"],
  ["SV", "Sinteza in vrednotenje: povzetek ugotovitev in presoja problema v interpretaciji"],
  ["400 besed", "Najmanjši obseg interpretacije, pod katerim dobiš za zgradbo največ 1 točko"],
  ["kultura dialoga", "Vikanje, celi odgovori v knjižnem jeziku in upoštevanje sogovornika na ustnem izpitu"],
];

const URADNA = [
  ["zadeva", "Kratka navedba, o čem govori uradni dopis, zapisana nad nagovorom"],
  ["naslovje", "Podatki o sporočevalcu, kraju in datumu ter naslovniku na začetku dopisa"],
  ["nagovor", "Vljuden ogovor naslovnika z vejico, za katerim nadaljujemo z malo začetnico"],
  ["prošnja", "Uradni dopis, s katerim želimo nekaj pridobiti in to utemeljimo"],
  ["pritožba", "Uradni dopis, v katerem opišemo težavo z izdelkom ali storitvijo in zahtevamo rešitev"],
  ["opravičilo", "Uradni dopis, v katerem priznamo napako ali odsotnost, navedemo razlog in ponudimo popravo"],
  ["zahvala", "Uradni dopis, v katerem se za pomoč ali storitev zahvalimo in navedemo njen učinek"],
  ["zapisnik", "Uradno besedilo, ki navaja navzoče, dnevni red in sklepe seje"],
  ["obvestilo", "Javno obveščevalno besedilo s podatki, kaj, kdaj in kje se bo zgodilo"],
  ["oglas", "Javno pozivno besedilo, ki naslovnika prepričuje k nakupu izdelka ali storitve"],
  ["politična propaganda", "Pozivno besedilo, ki naslovnika prepričuje, naj podpre stranko ali kandidata"],
  ["priloga", "Dokument, ki ga pošljemo skupaj z dopisom in ga navedemo pod podpisom"],
];
const TVORBA = [
  ["smiselnost", "Merilo besedilnosti: vse povedi se nanašajo na temo in si ne nasprotujejo"],
  ["sovisnost", "Merilo besedilnosti: povedi so povezane z vezniki, navezniki in ponavljanjem ključnih besed"],
  ["zaokroženost", "Merilo besedilnosti: besedilo ima uvod, jedro in zaključek in nič bistvenega ne manjka"],
  ["načrtovanje", "Faza sporočanja, v kateri določiš naslovnika, namen in besedilno vrsto"],
  ["ubesedovanje", "Faza sporočanja, v kateri načrt zapišeš v povedih"],
  ["notranja členjenost", "Razdelitev besedila na uvod, jedro in zaključek po vsebini"],
  ["zunanja členjenost", "Vidna razdelitev besedila na odstavke, naslove in alineje"],
  ["navodilo", "Strokovno besedilo, ki po korakih opiše, kako nekaj naredimo"],
  ["novica", "Kratko publicistično besedilo, ki odgovori na vprašanja kdo, kaj, kdaj in kje"],
  ["komentar", "Publicistično besedilo, v katerem avtor zavzame stališče do dogodka in ga utemelji"],
];

export default async function (z) {
  pojmovnik(z, "izpit_pm_slovenscina", IZPIT, { uvod: "izraz" });
  pojmovnik(z, "uradna_javna_besedila", URADNA, { uvod: "izraz" });
  pojmovnik(z, "tvorba_besedila", TVORBA, { uvod: "izraz" });
  for (const [slug, viri] of Object.entries(SNOVI)) {
    const videne = new Set();
    for (const [poglavje, filter] of viri) {
      for (const n of SM) {
        if (n.poglavje !== poglavje || n.raven === "visja") continue;
        const besedilo = `${n.besedilo} ${n.rezultat} ${n.postopek}`;
        if (filter && !filter.test(besedilo)) continue;
        if (videne.has(n.besedilo)) continue;
        videne.add(n.besedilo);
        const { id, predmet, poglavje: _p, raven, ...ostalo } = n;
        z.dodaj(slug, { ...ostalo, raven: "osnovna" });
      }
    }
  }
}
