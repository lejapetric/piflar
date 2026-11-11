import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  serija("spol", 14, (r) => {
    const [w, g, raz] = r.izberi([["Freiheit", "die", "-heit → die"], ["Möglichkeit", "die", "-keit → die"], ["Zeitung", "die", "-ung → die"], ["Mädchen", "das", "-chen → das"], ["Häuschen", "das", "-chen → das"], ["Freundschaft", "die", "-schaft → die"], ["Lehrer", "der", "-er (oseba) → der"], ["Reichtum", "der", "-tum → der (izjema: das Eigentum)"], ["Haustür", "die", "Zloženka dobi spol zadnjega dela (die Tür)."], ["Türschlüssel", "der", "Zloženka: der Schlüssel."], ["Information", "die", "-ion → die"], ["Fräulein", "das", "-lein → das"], ["Kindergarten", "der", "Zloženka: der Garten."], ["Bahnhof", "der", "Zloženka: der Hof."]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri člen ima samostalnik <em>${w}</em>?`, pravilna: g, napacne: ["der", "die", "das"].filter((x) => x !== g), postopek: `<p>${g} ${w}: ${raz}</p>` });
  });
  vrzeli(serija, "tvorba", [
    ["frei → die ___", "Freiheit", ["Freikeit", "Freiung", "Freischaft"], "-heit.", 1],
    ["möglich → die ___", "Möglichkeit", ["Möglichheit", "Möglichung", "Möglichtum"], "-keit po -lich.", 2],
    ["bilden → die ___", "Bildung", ["Bildheit", "Bildkeit", "Bildnis"], "-ung iz glagola.", 1],
    ["lehren → der ___", "Lehrer", ["Lehrung", "Lehrling", "Lehrheit"], "-er za vršilca.", 1],
    ["der Lehrer → die ___", "Lehrerin", ["Lehrerinne", "Lehrere", "Lehrerung"], "-in za ženski spol.", 1],
    ["glücklich → ___ (nasprotje)", "unglücklich", ["misglücklich", "nichtglücklich", "abglücklich"], "Predpona un-.", 1],
    ["die Arbeit → ohne Arbeit: ___", "arbeitslos", ["arbeitlos", "unarbeit", "arbeitsfrei"], "-los z vezivnim -s-.", 3],
    ["der Freund → ___ (pridevnik)", "freundlich", ["freundig", "freundbar", "freundsam"], "-lich.", 2],
    ["essen → so, dass man es essen kann: ___", "essbar", ["esslich", "essig", "essend"], "-bar = mogoče.", 3],
    ["das Haus + die Tür → die ___", "Haustür", ["Haustüre", "Haustor", "Häusertür"], "Zloženka.", 2],
    ["verstehen → das ___ (sposobnost)", "Verständnis", ["Verstehung", "Verstehen", "Verständheit"], "-nis.", 4, "visja"],
    ["schön → die ___", "Schönheit", ["Schönkeit", "Schönung", "Schönschaft"], "-heit.", 1],
    ["entscheiden → die ___", "Entscheidung", ["Entscheid", "Entscheidheit", "Entscheidnis"], "-ung.", 2],
    ["gesund → die ___", "Gesundheit", ["Gesundkeit", "Gesundung", "Gesundschaft"], "-heit.", 2],
    ["freundlich → die ___", "Freundlichkeit", ["Freundlichheit", "Freundlichung", "Freundschaft"], "Po -lich → -keit.", 3],
    ["der Tag → ___ (vsak dan)", "täglich", ["tagig", "taglich", "tagbar"], "-lich s preglasom.", 4, "visja"],
    ["lesen → ___ (ki se da brati)", "lesbar", ["leslich", "lesig", "lesend"], "-bar.", 3],
    ["die Kindheit ← das ___", "Kind", ["Kinder", "Kindlich", "Kindheit"], "-heit iz samostalnika.", 2],
  ]);
}
