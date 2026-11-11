import { izbira } from "../lib.mjs";
const DEL = [["Uvod", "~100–120 besed", "problem iz naslova, analiza ključnih pojmov, napoved poti in morda teza"], ["Prvi pogled", "~200 besed", "stališče, avtorji, utemeljitev in konkreten primer"], ["Drugi pogled", "~200 besed", "nasprotno stališče z avtorji, utemeljitvijo, primerom in odgovorom prvemu"], ["Premislek", "~150 besed", "izhodišča in posledice obeh pogledov, morebitni tretji pogled"], ["Sklep", "~80–100 besed", "lastno utemeljeno stališče in odprto vprašanje"]];
const NAS = [["Ali je človek po naravi sebičen?", "vprašanje stvarnosti ali morale"], ["Ali lahko kaj zagotovo vemo?", "vprašanje spoznanja"], ["Ali je moralno, kar koristi večini?", "vprašanje morale"], ["Ali sme država omejiti svobodo posameznika?", "posameznik in skupnost"], ["Ali je vera v Boga razumna?", "filozofija religije"], ["Ali smo svobodni ali je vse vnaprej določeno?", "vprašanje stvarnosti"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("zgradba", 10, (r, i) => {
    const [d, b, v] = DEL[i % 5];
    if (i < 5) return izbira({ r, tezavnost: 2, besedilo: `Kaj zapišeš v del eseja »${d}«?`, pravilna: v, napacne: r.premesaj(DEL.filter(([x]) => x !== d).map(([, , y]) => y)).slice(0, 3), postopek: `<p>${d} (${b}): ${v}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kateremu delu eseja ustreza vsebina: ${v}?`, pravilna: d, napacne: r.premesaj(DEL.filter(([x]) => x !== d).map(([x]) => x)).slice(0, 3), postopek: `<p>${d} (${b}).</p>` });
  });
  serija("tema", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `H kateri temi najbolj sodi naslov eseja »${NAS[i][0]}«?`, pravilna: NAS[i][1], napacne: r.premesaj([...new Set(NAS.map(([, t]) => t))].filter((x) => x !== NAS[i][1])).slice(0, 3), postopek: `<p>${NAS[i][1]}.</p>` }));
  pojmi([
    ["filozofski esej", "Argumentativno besedilo, ki problem iz naslova razčleni z vsaj dvema pogledoma."],
    ["analiza pojmov", "Razčlenitev pomenov ključnih besed naslova."],
    ["teza", "Osrednja trditev, ki jo esej zagovarja."],
    ["protiteza", "Nasprotna trditev, ki jo esej obravnava."],
    ["argument", "Utemeljitev trditve z razlogi."],
    ["primer", "Konkretna ponazoritev, ki podpre ali preveri trditev."],
    ["skrajna trditev", "Trditev z besedami »vedno«, »nujno«, »samo«, ki jo je treba razčleniti."],
    ["vsakdanji pomen", "Navadno razumevanje besede, ki ga primerjamo s filozofskim."],
    ["lastno stališče", "Utemeljen sklep pisca, izpeljan iz jedra eseja."],
    ["pojmovno razlikovanje", "Ločitev dveh pomenov pojma, ki pogosto razreši navidezno protislovje."],
  ]);
  vprasanja([
    [1, "Koliko časa traja izpitna pola 2 (esej)?", "120 minut", ["90 minut", "60 minut", "150 minut"], "Pola 2: 120 minut, 45 %."],
    [2, "Najmanj koliko pogledov mora predstaviti esej?", { vpis: ["2", "dva"] }, [], "Esej mora vsebovati vsaj dva pogleda."],
    [3, "Koliko naslovov je na voljo za vsako temo?", { vpis: ["3", "tri"] }, [], "Po trije naslovi za vsako temo (vsaj 15 skupaj)."],
    [4, "Naslov se glasi »Človek je vedno odgovoren za svoja dejanja«. Kaj je dober prvi korak?", "opozoriti na skrajno besedo »vedno« in razčleniti, kdaj odgovornost velja in kdaj ne", ["takoj se strinjati in navesti primer", "opisati življenje Kanta", "zapisati definicijo iz slovarja in končati"], "Skrajne trditve zahtevajo razlikovanje primerov.", "visja"],
    [4, "Kaj ocenjevalci pričakujejo pri najvišji oceni eseja?", "problem razčleni, trditve podpre z argumenti, odgovori na ugovore in vidi stvari »z očmi drugega«", ["obnovo učbenika", "čim več imen filozofov brez razlage", "zgolj lastno mnenje brez utemeljitve"], "Ključna sta analiza in argumentacija.", "visja"],
  ]);
}
