import { izbira } from "../lib.mjs";
const GS = [["dobro – slabo (gut – schlecht)", "gosposka morala"], ["dobro – zlo (gut – böse)", "suženjska morala"], ["vrednote izhajajo iz samopotrditve močnih", "gosposka morala"], ["vrednote nastanejo kot odziv na sovražni zunanji svet (ressentiment)", "suženjska morala"], ["ponižnost, usmiljenje in potrpežljivost kot vrline", "suženjska morala"], ["moč, ponos in zdravje kot dobro", "gosposka morala"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("morala", 6, (r, i) => izbira({ r, tezavnost: 3, besedilo: `Kateri morali pripada: ${GS[i][0]}?`, pravilna: GS[i][1], napacne: [GS[i][1] === "gosposka morala" ? "suženjska morala" : "gosposka morala"], postopek: `<p>${GS[i][1]}.</p>` }));
  pojmi([
    ["genealogija", "Metoda, ki raziskuje zgodovinski izvor in razvoj moralnih pojmov in vrednot."],
    ["gosposka morala", "Morala močnih, ki iz samopotrditve vrednotijo sebe kot dobre, druge pa kot slabe."],
    ["suženjska morala", "Morala šibkih, ki iz ressentimenta močne razglasijo za zle, sebe za dobre."],
    ["ressentiment", "Zamerljivost nemočnih, ki postane ustvarjalna in rodi nove vrednote."],
    ["upor sužnjev v morali", "Prevrednotenje, s katerim je suženjska morala zamenjala gosposko."],
    ["slaba vest", "Navznoter obrnjeni nagoni, ki jih družba ne dovoli sprostiti navzven."],
    ["dolg", "Ekonomsko razmerje upnika in dolžnika, iz katerega izvira pojem krivde."],
    ["krivda", "Moralni pojem, ki izhaja iz materialnega pojma dolga (Schuld)."],
    ["asketski ideal", "Ideal odpovedi in zanikanja življenja, ki mu da smisel trpljenja."],
    ["asketski duhovnik", "Lik, ki trpljenje usmerja in ga razlaga kot krivdo."],
    ["volja do moči", "Temeljna težnja vsega živega po rasti, uveljavitvi in premagovanju."],
    ["nihilizem", "Razvrednotenje najvišjih vrednot; stanje, ko izgubijo smisel."],
    ["nadčlovek", "Človek, ki ustvarja nove vrednote in pritrjuje življenju."],
    ["prevrednotenje vseh vrednot", "Nietzschejev projekt kritike in preseganja obstoječih moralnih vrednot."],
  ]);
  vprasanja([
    [3, "Na katero filološko ugotovitev se opira Nietzsche v prvi razpravi?", "da beseda »dober« prvotno pomeni plemenit, odličen", ["da je beseda »dober« prvotno pomenila ubog", "da moralnih besed ni mogoče raziskovati", "da vsi jeziki uporabljajo enake besede"], "Dobro je bilo prvotno lastno vrednotenje plemenitih."],
    [4, "S katero prispodobo Nietzsche ponazori suženjsko moralo?", "jagnjeta, ki imajo ujede za zle, sebe pa za dobre", ["sonce in sence v votlini", "vosek, ki se stali", "ladja brez krmarja"], "Jagnjeta ne morejo zameriti ujedam njihove narave, a jih moralno obsodijo.", "visja"],
    [4, "Zakaj človek po Nietzscheju raje hoče nič kot da ne bi hotel?", "ker volja potrebuje cilj in asketski ideal ji ga da, čeprav zanikajočega", ["ker je len", "ker ne pozna volje", "ker se boji smrti"], "To je sklep tretje razprave.", "visja"],
    [4, "Kako po Nietzscheju nastane slaba vest?", "ko človek, zaprt v družbo in mir, svoje nagone obrne proti sebi", ["s pogodbo med upnikom in dolžnikom", "z Božjim razodetjem", "z razumskim premislekom"], "Ponotranjenje človeka; druga razprava.", "visja"],
  ]);
}
