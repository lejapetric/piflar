import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

export default function ({ serija }) {
  serija("funkcija", 14, (r) => {
    const [f, odg] = r.izberi([["Auf dem Bild sehe ich zwei Kinder.", "opisovanje slike"], ["Meiner Meinung nach ist das gut.", "izražanje mnenja"], ["Da bin ich anderer Meinung.", "nestrinjanje"], ["Könnten Sie die Frage bitte wiederholen?", "prošnja za ponovitev"], ["Es sieht so aus, als ob sie feiern.", "ugibanje"], ["Einerseits …, andererseits …", "tehtanje prednosti in slabosti"], ["Zusammenfassend kann man sagen, …", "zaključevanje"], ["Da hast du völlig recht.", "strinjanje"], ["Im Hintergrund sieht man Berge.", "opisovanje slike"], ["Ich bin nicht sicher, aber …", "izražanje negotovosti"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj izraža stavek: <em>${f}</em>`, pravilna: odg, napacne: r.premesaj(["opisovanje slike", "izražanje mnenja", "nestrinjanje", "prošnja za ponovitev", "ugibanje", "tehtanje prednosti in slabosti", "zaključevanje", "strinjanje", "izražanje negotovosti"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  vrzeli(serija, "redemittel", [
    ["Im ___ des Bildes steht ein Tisch.", "Vordergrund", ["Vorgrund", "Vorderseite", "Vorne"], "Im Vordergrund = v ospredju.", 2],
    ["Im ___ sieht man ein Haus.", "Hintergrund", ["Hinterseite", "Hinten", "Untergrund"], "Im Hintergrund = v ozadju.", 2],
    ["Links ___ Bild steht ein Mann.", "auf dem", ["in das", "an den", "auf das"], "Auf dem Bild (Dativ).", 3],
    ["Ich ___, dass Schuluniformen sinnvoll sind.", "finde", ["finden", "gefunden", "fand"], "Ich finde, dass …", 1],
    ["Ich bin der ___, dass wir mehr Sport brauchen.", "Meinung", ["Meinen", "Gemeint", "Meine"], "Ich bin der Meinung, dass …", 2],
    ["Das ___ davon ab, ob man Zeit hat.", "hängt", ["hängen", "hing ab", "hängte"], "Es hängt davon ab = odvisno je od.", 4, "visja"],
    ["Ich stimme dir ___.", "zu", ["an", "bei", "mit"], "Zustimmen = strinjati se.", 3],
    ["Es kommt ___ an, wie man es sieht.", "darauf", ["daran", "davon", "dafür"], "Es kommt darauf an = odvisno je.", 4, "visja"],
    ["Ein Vorteil ___, dass man flexibel ist.", "ist", ["sind", "hat", "wird"], "Ein Vorteil ist, dass …", 1],
    ["Zum ___ möchte ich noch sagen, …", "Schluss", ["Ende", "Fertig", "Letzten"], "Zum Schluss.", 2],
    ["Auf dem Foto ___ man einen See.", "sieht", ["sehen", "siehst", "gesehen"], "Man + 3. oseba ednine.", 1],
    ["Ich ___ mir vorstellen, dass sie Urlaub machen.", "kann", ["könne", "können", "konnte mir"], "Ich kann mir vorstellen, …", 3],
  ]);
  pomeni(serija, "ausdruecke", [["Meiner Meinung nach", "po mojem mnenju"], ["Ich glaube schon.", "Mislim, da ja."], ["Das stimmt nicht.", "To ne drži."], ["zum Beispiel", "na primer"], ["Ich habe den Eindruck, …", "Imam občutek, …"], ["Ehrlich gesagt", "iskreno povedano"], ["im Gegensatz zu", "v nasprotju z"], ["Das ist mir egal.", "Vseeno mi je."], ["Ich bin dagegen.", "Sem proti."], ["Ich bin dafür.", "Sem za."]], { n: 18 });
}
