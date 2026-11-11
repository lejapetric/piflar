import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "passiv", [
    ["Das Haus ___ 1900 gebaut.", "wurde", ["wird", "ist", "hat"], "Präteritum Passiv: wurde + Partizip II.", 2],
    ["Hier ___ Deutsch gesprochen.", "wird", ["wurde", "ist", "werden"], "Präsens Passiv: wird + Partizip II.", 1],
    ["Die Briefe ___ gestern geschickt.", "wurden", ["wurde", "werden", "sind"], "Množina: wurden.", 2],
    ["Das Auto muss repariert ___.", "werden", ["wird", "worden", "wurde"], "Modalni glagol + Partizip II + werden.", 3],
    ["Das Museum ist 2010 eröffnet ___.", "worden", ["geworden", "werden", "wurde"], "Perfekt Passiv: ist + Partizip II + worden.", 4, "visja"],
    ["Der Täter ___ von der Polizei gefasst.", "wurde", ["hat", "war", "ist"], "Vršilec z von + dajalnik.", 2],
    ["Die Tür ___ geöffnet. (stanje)", "ist", ["wird", "wurde", "worden"], "Zustandspassiv: sein + Partizip II.", 4, "visja"],
    ["Das Essen ___ gerade gekocht.", "wird", ["ist", "wurde", "worden"], "Vorgangspassiv v sedanjiku.", 2],
    ["Die Aufgabe ___ bis morgen erledigt werden.", "muss", ["müssen", "musste", "wird"], "Modal + Passiv.", 3],
    ["Durch den Sturm ___ viele Bäume zerstört.", "wurden", ["wurde", "haben", "sind"], "Durch + tožilnik za vzrok v trpniku.", 3],
    ["Das Gebäude war schon vorher renoviert ___.", "worden", ["geworden", "werden", "wurde"], "Plusquamperfekt Passiv.", 4, "visja"],
    ["Der Brief wird von meinem Bruder ___. (schreiben)", "geschrieben", ["schreiben", "schrieb", "geschreibt"], "Partizip II: geschrieben.", 2],
    ["Die Kinder ___ jeden Morgen zur Schule gebracht.", "werden", ["wird", "wurde", "sind"], "Množina v sedanjiku: werden.", 2],
    ["Das Fenster darf nicht geöffnet ___.", "werden", ["worden", "wird", "sein"], "Modal + Partizip II + werden.", 3],
    ["Im Jahr 1989 ___ die Mauer geöffnet.", "wurde", ["wird", "ist", "hat"], "Präteritum Passiv.", 2],
    ["Die Rechnung ___ schon bezahlt. (stanje)", "ist", ["wird", "wurde", "worden"], "Zustandspassiv: rezultat dejanja.", 4, "visja"],
    ["Von wem ___ das Bild gemalt?", "wurde", ["hat", "ist", "war"], "Vprašanje po vršilcu v trpniku.", 2],
    ["Die Prüfung ___ morgen geschrieben.", "wird", ["wurde", "ist", "worden"], "Präsens Passiv za prihodnost.", 2],
    ["Das Problem konnte nicht gelöst ___.", "werden", ["worden", "wird", "sein"], "Modal v pretekliku + Passiv.", 3],
    ["In Österreich ___ viel Ski gefahren.", "wird", ["werden", "ist", "hat"], "Brezosebni trpnik.", 3],
  ]);
  vrzeli(serija, "aktiv-passiv", [
    ["Man baut hier ein Hotel. → Hier ___ ein Hotel gebaut.", "wird", ["wurde", "ist", "werden"], "Man + aktiv → Passiv v istem času.", 3],
    ["Man schrieb den Brief. → Der Brief ___ geschrieben.", "wurde", ["wird", "ist", "war"], "Präteritum.", 3],
    ["Man hat das Problem gelöst. → Das Problem ist gelöst ___.", "worden", ["werden", "geworden", "wurde"], "Perfekt Passiv: worden.", 4, "visja"],
    ["Man muss den Text lesen. → Der Text muss gelesen ___.", "werden", ["worden", "wird", "sein"], "Modal + Passiv.", 3],
    ["Die Firma stellt neue Mitarbeiter ein. → Neue Mitarbeiter ___ eingestellt.", "werden", ["wird", "wurden", "sind"], "Množina v Präsens Passiv.", 3],
  ]);
}
