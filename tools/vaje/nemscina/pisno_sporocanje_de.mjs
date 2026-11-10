import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

const F = [["Sehr geehrte Damen und Herren,", "formell"], ["Liebe Anna,", "informell"], ["Mit freundlichen Grüßen", "formell"], ["Viele Grüße", "informell"], ["Ich schreibe Ihnen, weil …", "formell"], ["Wie geht's dir?", "informell"], ["Ich würde mich über eine Antwort freuen.", "formell"], ["Bis bald!", "informell"], ["Ich bitte Sie um weitere Informationen.", "formell"], ["Hallo Max!", "informell"], ["Ich beziehe mich auf Ihre Anzeige.", "formell"], ["Schreib mir bald!", "informell"]];

export default function ({ serija, pojmi }) {
  serija("register", 14, (r) => {
    const [f, reg] = r.izberi(F);
    return izbira({ r, tezavnost: 1, besedilo: `Ali je izraz <em>${f}</em> formalen (formell) ali neformalen (informell)?`, pravilna: reg, napacne: [reg === "formell" ? "informell" : "formell"], postopek: `<p><em>${f}</em> – ${reg}.</p>` });
  });
  vrzeli(serija, "briefe", [
    ["Sehr ___ Frau Müller,", "geehrte", ["geehrter", "geehrten", "liebe"], "Sehr geehrte Frau …, sehr geehrter Herr …", 2],
    ["Sehr ___ Herr Schmidt,", "geehrter", ["geehrte", "geehrten", "lieber"], "Moški spol: geehrter.", 3],
    ["Mit ___ Grüßen", "freundlichen", ["freundliche", "freundlicher", "freundlich"], "Mit freundlichen Grüßen (dajalnik množine).", 3],
    ["Ich interessiere mich ___ die Stelle als Kellner.", "für", ["an", "auf", "über"], "Sich interessieren für.", 2],
    ["Ich ___ mich um einen Ferienjob.", "bewerbe", ["bewirbe", "beworben", "bewerben"], "Sich bewerben um: ich bewerbe mich.", 4, "visja"],
    ["Vielen Dank ___ deine E-Mail!", "für", ["über", "an", "von"], "Danke für.", 1],
    ["Ich freue mich ___ deine Antwort.", "auf", ["über", "für", "an"], "Sich freuen auf (prihodnost).", 3],
    ["Leider muss ich mich ___ den Lärm beschweren.", "über", ["auf", "für", "von"], "Sich beschweren über.", 4, "visja"],
    ["Könnten Sie mir bitte mitteilen, ___ der Kurs beginnt?", "wann", ["dass", "ob", "wenn"], "Odvisno vprašanje.", 3],
    ["Zum ___ möchte ich sagen, dass …", "Schluss", ["Ende von", "Fertig", "Letzt"], "Zum Schluss = za konec.", 2],
    ["Einerseits ist das Internet nützlich, ___ ist es gefährlich.", "andererseits", ["anderseitig", "zweitens", "trotzdem"], "Einerseits … andererseits.", 4, "visja"],
    ["___ meiner Meinung nach ist Sport wichtig.", "–", ["In", "Nach", "Bei"], "»Meiner Meinung nach« – brez predloga na začetku.", 4, "visja"],
  ]);
  pojmi([
    ["formelles Schreiben", "Pisanje ustanovi ali neznani osebi z ustaljenimi vljudnostnimi izrazi."],
    ["informelles Schreiben", "Sproščeno pisanje prijatelju."],
    ["Anrede", "Nagovor na začetku pisma."],
    ["Grußformel", "Pozdrav na koncu pisma."],
    ["Betreff", "Zadeva v formalnem pismu ali e-sporočilu."],
    ["Lebenslauf", "Življenjepis."],
  ], { uvod: "izraz" });
}
