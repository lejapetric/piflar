import { skladateljiSerije } from "../glasba-lib.mjs";
import { izbira } from "../lib.mjs";
const SM = [["Spontani, gestualni nanos barve na velika platna; npr. kapljanje barve.", "abstraktni ekspresionizem"], ["Podobe iz potrošniške kulture, reklam in stripov.", "pop art"], ["Ideja je pomembnejša od izdelka.", "konceptualna umetnost"], ["Umetnik s telesom izvede dogodek pred občinstvom.", "performans"], ["Delo, ki preoblikuje prostor in ga obiskovalec doživi z vstopom vanj.", "instalacija"], ["Posegi v naravno okolje, pogosto v velikem merilu.", "land art"], ["Preproste geometrijske oblike, industrijski materiali, zmanjšanje izraza.", "minimalizem"], ["Uporaba videa kot umetniškega medija.", "videoumetnost"]];
const SN = SM.map(([, s]) => s);
export default function ({ serija, pojmi, vprasanja }) {
  serija("smer", 8, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Katera smer ali oblika sodobne umetnosti je opisana? ${SM[i][0]}`, pravilna: SM[i][1], napacne: r.premesaj(SN.filter((x) => x !== SM[i][1])).slice(0, 3), postopek: `<p>${SM[i][1]}.</p>` }));
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["kapljane slike (dripping)", "Jackson Pollock"], ["Campbellove juhe", "Andy Warhol"], ["Marilyn Diptih", "Andy Warhol"], ["Spiralni pomol", "Robert Smithson"], ["Umetnica je navzoča", "Marina Abramović"], ["Ena in trije stoli", "Joseph Kosuth"], ["Whaam!", "Roy Lichtenstein"], ["Fizična nemogočnost smrti v umu živega (morski pes)", "Damien Hirst"]],
    osebe: [["Jackson Pollock", "ameriški abstraktni ekspresionist"], ["Andy Warhol", "ikona pop arta, ki je uporabljal sitotisk"], ["Marina Abramović", "umetnica performansa"], ["Joseph Beuys", "nemški umetnik akcij in socialne plastike"], ["OHO", "slovenska neoavantgardna skupina konceptualne umetnosti (1966–1971)"], ["Irwin", "slikarska skupina v okviru gibanja NSK"], ["Zoran Mušič", "slovenski slikar ciklusa Nismo poslednji"], ["Marjetica Potrč", "slovenska umetnica, ki raziskuje bivalne rešitve in arhitekturo"]],
  });
  pojmi([
    ["neoavantgarda", "Avantgardna gibanja po drugi svetovni vojni."],
    ["happening", "Neponovljiv umetniški dogodek z udeležbo občinstva."],
    ["NSK", "Neue Slowenische Kunst, gibanje skupin Laibach, Irwin in Gledališče sester Scipion Nasice."],
    ["sitotisk", "Grafična tehnika tiska skozi napeto mrežico."],
    ["postmodernizem", "Smer, ki z ironijo in citati meša sloge."],
  ]);
  vprasanja([
    [4, "Kaj je bilo značilno za skupino OHO?", "konceptualni in procesni projekti, ki so presegali klasično sliko in kip", ["impresionistično slikarstvo krajine", "baročni oltarji", "gotske freske"], "Člani med drugim Marko Pogačnik, Iztok Geister, Andraž Šalamun.", "visja"],
    [4, "Zakaj Warhol uporablja ponavljanje istega motiva?", "da pokaže množično proizvodnjo in potrošniško kulturo", ["ker ni znal slikati drugače", "ker je posnemal renesanso", "ker je zavračal barve"], "Umetnost kot blago.", "visja"],
  ]);
}
