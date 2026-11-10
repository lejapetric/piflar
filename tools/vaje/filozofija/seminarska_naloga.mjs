import { izbira } from "../lib.mjs";
const SES = [["Povzetek", "50–80 besed: problem, pot rešitve in sklep"], ["Ključne besede", "ključni pojmi, obravnavani v nalogi"], ["Uvod", "predstavitev problema in poteka naloge"], ["Jedro", "izpeljava v logično urejenih odstavkih"], ["Sklep", "odgovor na problem in lastno stališče"], ["Literatura", "abecedni seznam uporabljene literature"], ["Naslovnica", "matura in letnica, naslov, ime kandidata, število besed, šola, mentor, kraj in datum"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("sestavina", 14, (r, i) => {
    const [s, v] = SES[i % 7];
    if (i < 7) return izbira({ r, tezavnost: 2, besedilo: `Kaj vsebuje sestavina seminarske naloge »${s}«?`, pravilna: v, napacne: r.premesaj(SES.filter(([x]) => x !== s).map(([, y]) => y)).slice(0, 3), postopek: `<p>${s}: ${v}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera sestavina seminarske naloge vsebuje: ${v}?`, pravilna: s, napacne: r.premesaj(SES.filter(([x]) => x !== s).map(([x]) => x)).slice(0, 3), postopek: `<p>${s}.</p>` });
  });
  pojmi([
    ["seminarska naloga", "Notranji del izpita: samostojna raziskava filozofskega problema v obliki eseja ali dialoga."],
    ["plagiat", "Uporaba tujih misli brez navedbe vira."],
    ["navajanje virov", "Označevanje tujih misli v opombi ali besedilu."],
    ["povzetek", "Kratek prikaz problema, poti rešitve in sklepa na začetku naloge."],
    ["ključne besede", "Seznam osrednjih pojmov naloge."],
    ["mentor", "Učitelj, ki kandidata vodi pri pisanju seminarske naloge."],
    ["struktura naloge", "Kazalo z naslovi poglavij in kratkim opisom vsakega."],
    ["dialog", "Možna oblika seminarske naloge, v kateri sogovorniki razvijajo argumente."],
    ["literatura", "Abecedni seznam vseh uporabljenih virov."],
    ["raziskovalno vprašanje", "Jasno zastavljen problem, na katerega naloga odgovarja."],
  ]);
  vprasanja([
    [1, "Kolikšen delež ocene je seminarska naloga?", "20 %", ["35 %", "45 %", "10 %"], "Notranji del: 20 %."],
    [2, "Koliko besed mora imeti seminarska naloga (brez povzetka)?", "od 2800 do 3500", ["od 600 do 1000", "od 1500 do 2000", "od 5000 do 6000"], "Obseg: 2800–3500 besed brez povzetka."],
    [2, "Iz koliko korakov je po navodilih sestavljena izdelava seminarske naloge?", { vpis: ["9", "devet"] }, [], "Devet korakov od izbire problema do oddaje."],
    [3, "Ali je seminarska naloga lahko tudi o temi, ki je ne obravnavaš pri pouku?", "da, npr. o estetiki ali vzhodni filozofiji", ["ne, le o izbranem besedilu", "ne, le o izbrani temi", "da, a samo o logiki"], "Dobro je, če hkrati poglobi tudi tvoje besedilo ali temo."],
    [4, "Kaj od naštetega je najboljši naslov seminarske naloge?", "Kako upravičiti kaznovanje?", ["Filozofija", "Moja naloga", "Vse o etiki"], "Naslov mora jasno napovedati problem.", "visja"],
    [4, "Kdo oceni seminarsko nalogo?", "učitelj (notranje ocenjevanje)", ["zunanji ocenjevalec RIC", "sošolci", "ravnatelj"], "Seminarsko nalogo oceni učitelj.", "visja"],
  ]);
}
