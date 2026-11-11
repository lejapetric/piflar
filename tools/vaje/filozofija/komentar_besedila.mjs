import { izbira } from "../lib.mjs";
const DEL = [["Uvod", "~80–100 besed", "avtor, delo, mesto odlomka v delu, osrednji problem in napoved poteka"], ["Jedro 1", "~150 besed", "prvo podvprašanje z avtorjevimi pojmi, ki jih opredeliš"], ["Jedro 2", "~150 besed", "drugo podvprašanje, povezano s prvim"], ["Jedro 3", "~150 besed", "tretje podvprašanje, navadno povezava z drugim delom besedila"], ["Umestitev in kritika", "~100 besed", "pomen odlomka za celo delo, ugovor in lastno stališče s primerom"], ["Sklep", "~60 besed", "povzetek odgovora na osrednji problem, odprto vprašanje ali aktualnost"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("zgradba", 12, (r, i) => {
    const [d, b, v] = DEL[i % 6];
    if (i < 6) return izbira({ r, tezavnost: 2, besedilo: `Kaj zapišeš v del komentarja »${d}«?`, pravilna: v, napacne: r.premesaj(DEL.filter(([x]) => x !== d).map(([, , y]) => y)).slice(0, 3), postopek: `<p>${d} (${b}): ${v}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kateremu delu komentarja ustreza vsebina: ${v}?`, pravilna: d, napacne: r.premesaj(DEL.filter(([x]) => x !== d).map(([x]) => x)).slice(0, 3), postopek: `<p>${d} (${b}).</p>` });
  });
  pojmi([
    ["komentar besedila", "Enovit razlagalni esej, ki razloži probleme odlomka in ga umesti v celoto dela."],
    ["razlagalni esej", "Esej, ki pojme in probleme razloži, ne le obnovi."],
    ["parafraza", "Obnova z drugimi besedami, ki je v komentarju ne zadošča."],
    ["podvprašanja", "Vprašanja v navodilu, na katera mora komentar odgovoriti."],
    ["umestitev odlomka", "Pojasnilo, kje v delu je odlomek in kaj pomeni za celoto."],
    ["pojmovna mreža", "Povezani ključni pojmi avtorja, ki jih v komentarju opredelimo."],
    ["miselni zemljevid", "Kratek načrt s problemom, podvprašanji, pojmi, primerom in ugovorom."],
    ["ugovor", "Nasprotni argument, s katerim preverimo avtorjevo stališče."],
    ["navedek", "Dobesedno navedene besede iz odlomka, ki jih takoj razložimo."],
    ["prehodni stavek", "Stavek, ki poveže en odstavek z naslednjim."],
  ]);
  vprasanja([
    [1, "Koliko časa imaš za komentar besedila na maturi?", "90 minut", ["120 minut", "60 minut", "45 minut"], "Izpitna pola 1 traja 90 minut."],
    [1, "Kolikšen delež ocene je komentar besedila?", "35 %", ["45 %", "20 %", "50 %"], "Pola 1: 35 %."],
    [2, "Katera štiri besedila lahko izbereš za komentar?", "Platon: Država, Aristotel: Nikomahova etika, Descartes: Meditacije, Nietzsche: H genealogiji morale", ["Kant, Hegel, Marx, Sartre", "Platon, Kant, Hume, Mill", "Aristotel, Avguštin, Tomaž, Descartes"], "Izbereš eno od štirih besedil."],
    [3, "Zakaj komentarja ne pišeš kot oštevilčenih odgovorov »1. …, 2. …«?", "ker mora biti enovit esej, v katerem se odstavki povezujejo", ["ker je prepovedano pisati številke", "ker je tako krajši", "ker ocenjevalec ne bere številk"], "Vsak odstavek odgovori na eno podvprašanje in se naveže na prejšnjega."],
    [4, "Kaj loči komentar, ocenjen z 20–22 točkami, od zadostnega?", "analiza pojmov, pregled nad celim delom, dialog z avtorjem in lastno utemeljeno stališče", ["dolžina nad 1500 besed", "čim več dobesednih navedkov", "natančna obnova odlomka"], "Najboljši kandidati vstopijo v dialog z avtorjem.", "visja"],
    [4, "Koliko časa priporočamo za branje in načrt (miselni zemljevid) na začetku?", "približno 15 minut", ["nič, takoj pišeš", "45 minut", "60 minut"], "Prvih 15 minut odloča o vsem.", "visja"],
  ]);
}
