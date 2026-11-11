import { izbira } from "../lib.mjs";
const PR = [["veliko majhnih kmetov prodaja enako pšenico", "popolna konkurenca"], ["edini ponudnik vode v mestu", "monopol"], ["trije veliki mobilni operaterji", "oligopol"], ["veliko frizerskih salonov z različnimi storitvami", "monopolistična konkurenca"], ["lokalna železnica brez konkurence", "monopol"], ["nekaj velikih proizvajalcev letal", "oligopol"], ["veliko restavracij v mestu", "monopolistična konkurenca"], ["borzni trg delnic velikega podjetja", "popolna konkurenca"]];
const ZN = [["veliko ponudnikov, homogena dobrina, prost vstop", "popolna konkurenca"], ["en ponudnik, ni bližnjih nadomestkov, ovire za vstop", "monopol"], ["malo velikih ponudnikov, medsebojna odvisnost", "oligopol"], ["veliko ponudnikov, diferencirani izdelki, prost vstop", "monopolistična konkurenca"]];
const S = ["popolna konkurenca", "monopol", "oligopol", "monopolistična konkurenca"];
export default function ({ serija, pojmi, vprasanja }) {
  serija("primer", 8, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Katera tržna struktura je: ${PR[i][0]}?`, pravilna: PR[i][1], napacne: S.filter((x) => x !== PR[i][1]), postopek: `<p>${PR[i][1]}.</p>` }));
  serija("znacilnosti", 4, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Katera tržna struktura ima značilnosti: ${ZN[i][0]}?`, pravilna: ZN[i][1], napacne: S.filter((x) => x !== ZN[i][1]), postopek: `<p>${ZN[i][1]}.</p>` }));
  pojmi([
    ["popolna konkurenca", "Tržna struktura z mnogo ponudniki homogene dobrine, ki ne vplivajo na ceno."],
    ["monopol", "Tržna struktura z enim ponudnikom brez bližnjih nadomestkov."],
    ["oligopol", "Tržna struktura z nekaj velikimi, medsebojno odvisnimi ponudniki."],
    ["monopolistična konkurenca", "Tržna struktura z mnogo ponudniki diferenciranih izdelkov."],
    ["kartel", "Dogovor podjetij o cenah ali količinah, ki omejuje konkurenco."],
    ["ovire za vstop", "Okoliščine, ki novim podjetjem otežujejo vstop na trg."],
    ["naravni monopol", "Monopol, ko en ponudnik zaradi ekonomije obsega oskrbi trg najceneje."],
    ["prevzemnik cene", "Podjetje, ki ceno sprejme od trga, ker nanjo ne more vplivati."],
    ["diferenciacija izdelkov", "Razlikovanje izdelkov po kakovosti, blagovni znamki ali storitvah."],
    ["varstvo konkurence", "Ukrepi države proti omejevanju konkurence in zlorabi prevladujočega položaja."],
    ["patent", "Zakonska pravica izumitelja do izključne uporabe izuma za določen čas."],
    ["prevladujoči položaj", "Tržni položaj, v katerem podjetje lahko deluje neodvisno od konkurentov."],
    ["cenovni vodja", "Podjetje v oligopolu, čigar spremembi cene sledijo drugi."],
    ["tržni delež", "Delež prodaje podjetja v celotni prodaji na trgu."],
  ]);
  vprasanja([
    [3, "Zakaj je v popolni konkurenci dolgoročni ekonomski dobiček nič?", "ker visoki dobički privabijo nova podjetja, dokler cena ne pade na povprečne stroške", ["ker država pobere dobiček", "ker so stroški nič", "ker podjetja ne prodajajo"], "Prost vstop odpravi nadnormalne dobičke."],
    [4, "Zakaj monopol običajno proizvaja manj in prodaja dražje kot popolna konkurenca?", "ker z omejitvijo količine dvigne ceno nad mejne stroške in poveča dobiček", ["ker ima višje stroške", "ker ga država sili", "ker ne pozna povpraševanja"], "Posledica je izguba blaginje (mrtva izguba).", "visja"],
    [4, "Kaj ponazarja zapornikova dilema v oligopolu?", "podjetja bi skupaj zaslužila več s sodelovanjem, a vsako ima spodbudo, da dogovor prelomi", ["podjetja vedno sodelujejo", "država določa cene", "oligopol je enak monopolu"], "Teorija iger.", "visja"],
    [4, "Katera slovenska institucija skrbi za varstvo konkurence?", "Javna agencija RS za varstvo konkurence", ["Banka Slovenije", "Statistični urad RS", "Računsko sodišče"], "AVK nadzoruje kartele in koncentracije.", "visja"],
  ]);
}
