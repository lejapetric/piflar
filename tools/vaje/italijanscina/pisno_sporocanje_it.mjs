import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const REG = [["Ciao Marco!", "neformalno"], ["Gentile Signora,", "formalno"], ["Un bacione!", "neformalno"], ["Distinti saluti", "formalno"], ["A presto!", "neformalno"], ["Le scrivo per …", "formalno"], ["Un abbraccio", "neformalno"], ["In attesa di una Sua risposta …", "formalno"], ["Ehi, come va?", "neformalno"], ["In allegato trova …", "formalno"], ["Ti va di venire?", "neformalno"], ["Le sarei grato se …", "formalno"], ["Baci", "neformalno"], ["Cordiali saluti", "formalno"], ["Tranquillo!", "neformalno"], ["Egregio Direttore,", "formalno"]];

export default function ({ serija, pojmi }) {
  serija("register", 16, (r, i) => {
    const [f, odg] = REG[i];
    return izbira({ r, tezavnost: 1, besedilo: `Ali je izraz <em>${f}</em> primeren za formalno ali neformalno pismo?`, pravilna: odg, napacne: ["formalno", "neformalno"].filter((x) => x !== odg), postopek: `<p>${odg === "formalno" ? "Uradni slog: vikanje (Lei), ustaljene vljudnostne formule." : "Osebni slog: tikanje, pogovorni izrazi."}</p>` });
  });
  vrzeli(serija, "fraze", [
    ["La ___ per la Sua lettera.", "ringrazio", ["ringrazi", "grazie", "ringraziare"], "La ringrazio = zahvaljujem se Vam.", 2],
    ["Le scrivo in ___ al Vostro annuncio.", "merito", ["riguardo", "proposito", "base"], "In merito a = v zvezi z.", 3],
    ["___ iscrivermi al corso di italiano.", "Vorrei", ["Voglio", "Volevo", "Vorrò"], "Pogojnik (vorrei) je vljuden.", 2],
    ["Potrebbe ___ mandare maggiori informazioni?", "mandarmi", ["mi mandare", "mandami", "mandarlo"], "Potrebbe + nedoločnik z zaimkom: mandarmi.", 4, "visja"],
    ["Mi dispiace ___ non poter venire.", "di", ["a", "per", "che"], "Mi dispiace di + nedoločnik.", 3],
    ["Grazie ___ l'invito!", "per", ["a", "di la", "da"], "Grazie per + samostalnik.", 2],
    ["Non vedo l'ora ___ rivederti!", "di", ["a", "per", "che"], "Non vedo l'ora di + nedoločnik.", 3],
    ["Le sarei grato se potesse ___.", "rispondermi", ["rispondimi", "mi rispondere", "risponderle"], "Potesse + nedoločnik z zaimkom.", 4, "visja"],
    ["Da un ___ …, dall'altro … (po eni strani)", "lato", ["parte", "canto", "punto"], "Da un lato … dall'altro.", 3],
    ["A mio ___, la televisione è utile.", "parere", ["opinione", "avviso", "pensiero"], "A mio parere = po mojem mnenju (tudi secondo me).", 2],
    ["È vero che …, ___ bisogna anche dire che …", "ma", ["quindi", "perché", "cioè"], "Popuščanje in nasprotje.", 2],
    ["In ___, direi che …", "conclusione", ["fine", "finale", "chiusura"], "In conclusione = za zaključek.", 2],
    ["Benché ___ difficile, ce l'ho fatta.", "fosse", ["era", "è", "sarà"], "Benché + congiuntivo.", 4, "visja"],
    ["Le scrivo per ___ del servizio.", "lamentarmi", ["lamentare", "lamentandomi", "lamentato"], "Lamentarsi di = pritožiti se.", 4, "visja"],
  ]);
  pomeni(serija, "povezave", [["innanzitutto", "najprej"], ["inoltre", "poleg tega"], ["di conseguenza", "posledično"], ["infatti", "namreč"], ["comunque", "vsekakor"], ["per esempio", "na primer"], ["per concludere", "za konec"], ["d'altra parte", "po drugi strani"]], { tez: 2, n: 12 });
  pojmi([
    ["formalno pismo", "Uradno pismo z vikanjem (Lei) in ustaljenimi formulami (Gentile …, Distinti saluti)."],
    ["neformalno pismo", "Osebno pismo prijatelju s tikanjem in pogovornimi izrazi (Ciao, Un abbraccio)."],
    ["nagovor", "Uvodni pozdrav naslovniku, npr. Caro Paolo, ali Gentile Signora,."],
    ["zaključna formula", "Ustaljen pozdrav na koncu pisma, npr. Cordiali saluti."],
    ["vezniki", "Besede, ki povezujejo misli: innanzitutto, poi, tuttavia, quindi."],
    ["argumentativni spis", "Besedilo, v katerem zagovarjamo stališče z argumenti in primeri."],
    ["odstavek", "Vsebinsko zaokrožen del besedila z eno glavno mislijo."],
    ["register", "Raven jezika glede na okoliščine: knjižni, pogovorni, uradni."],
  ]);
}
