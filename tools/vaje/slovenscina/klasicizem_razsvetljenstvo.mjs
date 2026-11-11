import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Tartuffe", "Molière", "komedija"], ["Skopuh", "Molière", "komedija"], ["Namišljeni bolnik", "Molière", "komedija"], ["Fedra", "Jean Racine", "tragedija"], ["Cid", "Pierre Corneille", "tragedija"], ["Kandid", "Voltaire", "filozofska povest"], ["Robinson Crusoe", "Daniel Defoe", "roman"], ["Gulliverjeva potovanja", "Jonathan Swift", "roman"], ["Kneginja Klevska", "Madame de La Fayette", "roman"], ["Emil", "Jean-Jacques Rousseau", "roman"]],
    osebe: [["Molière", "je igralec in avtor komedij, ki je umrl po predstavi"], ["Jean Racine", "je avtor tragedij po antičnih vzorih"], ["Voltaire", "je razsvetljenec, ki je smešil optimizem"], ["Jean-Jacques Rousseau", "je zagovarjal vrnitev k naravi"], ["Denis Diderot", "je urednik Enciklopedije"], ["Nicolas Boileau", "je v Pesniški umetnosti postavil pravila klasicizma"]],
  });
  pojmi([
    ["klasicizem", "Smer 17. stoletja, ki posnema antiko in spoštuje pravila."],
    ["tri enotnosti", "Pravilo enotnosti kraja, časa in dejanja v klasicistični drami."],
    ["aleksandrinec", "Dvanajsterec z zarezo, verz francoske klasicistične drame."],
    ["razsvetljenstvo", "Gibanje 18. stoletja, ki je poudarjalo razum in izobrazbo."],
    ["enciklopedija", "Delo, ki zbira vse tedanje znanje."],
    ["karakterna komedija", "Komedija, ki smeši značajsko napako osebe."],
    ["satira", "Besedilo, ki z ironijo in posmehom kritizira napake."],
    ["racionalizem", "Prepričanje, da je razum vir spoznanja."],
    ["vzgojni roman", "Roman o razvoju in vzgoji mladega človeka."],
    ["strast in dolžnost", "Osrednje nasprotje v klasicistični tragediji."],
    ["robinzonada", "Zgodba o preživetju na samotnem kraju."],
  ]);
  vprasanja([
    [2, "Katero napako smeši Molièrov Tartuffe?", "hinavščino", ["skopost", "namišljeno bolezen", "nevednost"], "Tartuffe se pretvarja, da je pobožen."],
    [3, "V koga je zaljubljena Fedra?", "v pastorka Hipolita", ["v Tezeja", "v Ojdipa", "v Ahila"], "Strast, ki je ne sme izraziti, jo pogubi."],
    [4, "Kateri nauk zaključi Voltairov Kandid?", "»Treba je obdelovati svoj vrt.«", ["»Vse je najboljše v najboljšem svetu.«", "»Mislim, torej sem.«", "»Spoznaj samega sebe.«"], "Zavrnitev Panglossovega optimizma.", "visja"],
    [4, "Zakaj Racine spoštuje tri enotnosti?", "ker sledi klasicističnim pravilom po Aristotelovi Poetiki", ["ker je pisal romane", "ker je bil razsvetljenec", "zaradi cenzure"], "Boileau je pravila uzakonil v Pesniški umetnosti.", "visja"],
  ]);
}
