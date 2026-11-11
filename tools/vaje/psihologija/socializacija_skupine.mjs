import { izbira } from "../lib.mjs";
const STIL = [["Starši postavljajo jasna pravila, jih pojasnijo in so topli ter odzivni.", "avtoritativni (demokratični) stil"], ["Starši zahtevajo brezpogojno ubogljivost in pravil ne pojasnjujejo.", "avtoritarni stil"], ["Starši so topli, a ne postavljajo meja in otroku dovolijo skoraj vse.", "permisivni stil"], ["Starši se za otroka ne zanimajo in mu ne dajejo ne topline ne meja.", "zanemarjajoči stil"]];
export default function ({ serija, pojmi, vprasanja }) {
  const TN = { "avtoritativni (demokratični) stil": "visoka toplina, visok nadzor", "avtoritarni stil": "nizka toplina, visok nadzor", "permisivni stil": "visoka toplina, nizek nadzor", "zanemarjajoči stil": "nizka toplina, nizek nadzor" };
  serija("stil", 8, (r, i) => {
    const [op, st] = STIL[i % 4];
    if (i < 4) return izbira({ r, tezavnost: 2, besedilo: `Kateri vzgojni stil opisuje: ${op}`, pravilna: st, napacne: STIL.filter(([, s]) => s !== st).map(([, s]) => s), postopek: `<p>${st}: ${TN[st]}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kako je ${st} opredeljen glede na toplino in nadzor (Baumrind)?`, pravilna: TN[st], napacne: Object.values(TN).filter((x) => x !== TN[st]), postopek: `<p>${st}: ${TN[st]}. Najugodnejši razvoj otrok povezujemo z avtoritativnim stilom.</p>` });
  });
  pojmi([
    ["socializacija", "Proces, v katerem posameznik ponotranji norme, vrednote in vedenje svoje družbe."],
    ["primarna socializacija", "Socializacija v zgodnjem otroštvu, predvsem v družini."],
    ["sekundarna socializacija", "Socializacija v šoli, med vrstniki, v službi in prek medijev."],
    ["socialna skupina", "Dva ali več ljudi, ki so v medsebojni interakciji in imajo skupne cilje."],
    ["primarna skupina", "Majhna skupina z neposrednimi, čustvenimi odnosi, npr. družina, prijatelji."],
    ["sekundarna skupina", "Večja skupina z bolj formalnimi, ciljno usmerjenimi odnosi, npr. podjetje."],
    ["socialna vloga", "Pričakovano vedenje, povezano z določenim položajem v skupini."],
    ["socialni status", "Položaj posameznika v skupini ali družbi."],
    ["norma", "Nepisano ali pisano pravilo vedenja v skupini."],
    ["konformnost", "Prilagajanje mnenja ali vedenja pritisku skupine."],
    ["socialna facilitacija", "Izboljšanje uspešnosti pri preprostih nalogah v navzočnosti drugih."],
    ["socialno lenarjenje", "Manjši trud posameznika pri skupinski nalogi, ko njegov prispevek ni prepoznaven."],
    ["skupinsko mišljenje", "Težnja kohezivne skupine k soglasju, ki zanemari kritično presojo."],
    ["atribucija", "Pripisovanje vzrokov lastnemu in tujemu vedenju."],
  ]);
  vprasanja([
    [3, "Kaj je pokazal Aschev poskus s črtami?", "veliko ljudi se je strinjalo z očitno napačnim mnenjem skupine", ["ljudje vedno zaupajo svoji presoji", "skupina ne vpliva na posameznika", "ljudje ubogajo avtoriteto"], "Konformnost pod pritiskom skupine."],
    [4, "Kaj je pokazal Zimbardov stanfordski zaporniški poskus?", "dodeljene vloge lahko močno spremenijo vedenje običajnih ljudi", ["zaporniki so vedno nasilni", "pazniki so ostali prijazni", "vloge ne vplivajo na vedenje"], "Poskus so zaradi zlorab prekinili po šestih dneh.", "visja"],
    [4, "Kaj je temeljna atribucijska napaka?", "vedenje drugih pripisujemo osebnosti in podcenjujemo vpliv okoliščin", ["vedenje drugih pripisujemo okoliščinam", "lastne uspehe pripisujemo sreči", "vsem pripisujemo enake vzroke"], "Pri sebi pogosteje vidimo vpliv okoliščin.", "visja"],
    [4, "Kaj je halo učinek pri socialnem zaznavanju?", "ena opazna pozitivna lastnost vpliva na oceno drugih lastnosti", ["prvi vtis ni pomemben", "negativne lastnosti prevladajo", "ljudi ocenjujemo povsem objektivno"], "Npr. privlačnim ljudem pripisujemo več inteligentnosti.", "visja"],
  ]);
}
