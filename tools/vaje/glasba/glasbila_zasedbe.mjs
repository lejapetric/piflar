import { izbira } from "../lib.mjs";
const GL = [["violina", "godala"], ["viola", "godala"], ["violončelo", "godala"], ["kontrabas", "godala"], ["flavta", "pihala"], ["oboa", "pihala"], ["klarinet", "pihala"], ["fagot", "pihala"], ["saksofon", "pihala"], ["trobenta", "trobila"], ["rog", "trobila"], ["pozavna", "trobila"], ["tuba", "trobila"], ["timpani", "tolkala"], ["ksilofon", "tolkala"], ["činele", "tolkala"], ["klavir", "glasbila s tipkami"], ["orgle", "glasbila s tipkami"], ["čembalo", "glasbila s tipkami"], ["harfa", "brenkala"], ["kitara", "brenkala"]];
const SK = ["godala", "pihala", "trobila", "tolkala", "glasbila s tipkami", "brenkala"];
const ZAS = [["2", "duo"], ["3", "trio"], ["4", "kvartet"], ["5", "kvintet"], ["6", "sekstet"], ["7", "septet"], ["8", "oktet"], ["9", "nonet"]];
const ZB = [["sopran", "visok ženski glas"], ["alt", "nizek ženski glas"], ["tenor", "visok moški glas"], ["bas", "nizek moški glas"], ["mezzosopran", "srednji ženski glas"], ["bariton", "srednji moški glas"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("skupina", 21, (r, i) => izbira({ r, tezavnost: GL[i][0] === "saksofon" || GL[i][0] === "rog" ? 3 : 1, besedilo: `V katero skupino glasbil spada <em>${GL[i][0]}</em>?`, pravilna: GL[i][1], napacne: r.premesaj(SK.filter((x) => x !== GL[i][1])).slice(0, 3), postopek: `<p>${GL[i][0]}: ${GL[i][1]}${GL[i][0] === "saksofon" ? " (čeprav je iz kovine, ima jeziček kot klarinet)" : ""}.</p>` }));
  serija("zasedba", 8, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Kako imenujemo komorno zasedbo s ${ZAS[i][0]} izvajalci?`, pravilna: ZAS[i][1], napacne: r.premesaj(ZAS.filter((_, j) => j !== i).map(([, y]) => y)).slice(0, 3), postopek: `<p>${ZAS[i][0]} izvajalcev: ${ZAS[i][1]}.</p>` }));
  serija("glas", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Kateri pevski glas je ${ZB[i][1]}?`, pravilna: ZB[i][0], napacne: r.premesaj(ZB.filter((_, j) => j !== i).map(([x]) => x)).slice(0, 3), postopek: `<p>${ZB[i][0]}: ${ZB[i][1]}.</p>` }));
  pojmi([
    ["simfonični orkester", "Velik orkester z godali, pihali, trobili in tolkali."],
    ["godalni kvartet", "Zasedba dveh violin, viole in violončela."],
    ["komorna glasba", "Glasba za manjšo zasedbo, v kateri ima vsak izvajalec svoj part."],
    ["mešani zbor", "Zbor ženskih in moških glasov (sopran, alt, tenor, bas)."],
    ["dirigent", "Vodja orkestra ali zbora, ki usklajuje izvedbo."],
    ["partitura", "Notni zapis vseh glasov skladbe, pregledno drug pod drugim."],
    ["aerofoni", "Glasbila, pri katerih zveni zračni steber."],
    ["kordofoni", "Glasbila, pri katerih zvenijo strune."],
    ["membranofoni", "Glasbila, pri katerih zveni napeta opna."],
    ["idiofoni", "Glasbila, pri katerih zveni telo glasbila samo."],
  ]);
  vprasanja([
    [4, "Zakaj flavto uvrščamo med lesena pihala, čeprav je danes iz kovine?", "ker način tvorbe tona in zgodovinski izvor sodita med lesena pihala, ne trobila", ["ker je bila vedno lesena", "ker ima jeziček", "ker se igra z ustnicami kot trobenta"], "Trobila tvorijo ton z brenčanjem ustnic v ustniku.", "visja"],
    [4, "Katera skupina glasbil je v simfoničnem orkestru najštevilčnejša?", "godala", ["trobila", "tolkala", "pihala"], "Godala so jedro orkestra.", "visja"],
  ]);
}
