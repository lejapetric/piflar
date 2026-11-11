import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Popoldne favna", "Claude Debussy"], ["Bolero", "Maurice Ravel"], ["Posvetitev pomladi", "Igor Stravinski"], ["Pierrot lunaire", "Arnold Schönberg"], ["Wozzeck", "Alban Berg"], ["Peter in volk", "Sergej Prokofjev"], ["4'33''", "John Cage"], ["Rhapsody in Blue", "George Gershwin"], ["Carmina Burana", "Carl Orff"], ["Music for 18 Musicians", "Steve Reich"], ["Leningrajska simfonija (št. 7)", "Dmitrij Šostakovič"], ["West Side Story", "Leonard Bernstein"]],
    osebe: [["Claude Debussy", "glavni predstavnik glasbenega impresionizma"], ["Arnold Schönberg", "utemeljitelj dodekafonije in vodja druge dunajske šole"], ["Igor Stravinski", "ruski skladatelj, katerega balet je leta 1913 povzročil škandal v Parizu"], ["John Cage", "ameriški avantgardist, ki je uvedel naključje in preparirani klavir"], ["Béla Bartók", "madžarski skladatelj in raziskovalec ljudske glasbe"], ["Philip Glass", "predstavnik minimalizma, avtor opere Einstein na plaži"], ["Louis Armstrong", "jazzovski trobentač in pevec iz New Orleansa"], ["Olivier Messiaen", "francoski skladatelj, ki je v glasbo vnašal ptičje petje"]],
  });
  pojmi([
    ["impresionizem", "Smer z barvitimi harmonijami, celotonsko lestvico in zabrisanimi obrisi."],
    ["ekspresionizem", "Smer, ki z disonancami izraža skrajna notranja stanja."],
    ["atonalnost", "Glasba brez tonalnega središča."],
    ["dodekafonija", "Tehnika komponiranja z vrsto vseh dvanajstih tonov."],
    ["neoklasicizem", "Smer, ki se vrača k oblikam baroka in klasicizma."],
    ["minimalizem", "Smer s ponavljanjem kratkih vzorcev in počasnimi spremembami."],
    ["aleatorika", "Glasba, v kateri ima vlogo naključje."],
    ["elektroakustična glasba", "Glasba, ustvarjena z elektronskimi napravami in posnetki."],
    ["jazz", "Afroameriška glasba z improvizacijo in sinkopiranim ritmom."],
    ["blues", "Afroameriška vokalna oblika z 12-taktno shemo."],
  ]);
  vprasanja([
    [4, "Koliko tonov vsebuje dodekafonska vrsta in kako se uporablja?", "vseh 12 tonov kromatične lestvice, vsak enkrat, preden se vrsta ponovi", ["7 tonov durove lestvice", "5 tonov pentatonike", "poljubno število tonov"], "Vrsto lahko obrnemo, beremo nazaj ali transponiramo.", "visja"],
    [4, "Kaj je bil namen Cageove skladbe 4'33''?", "opozoriti, da so glasba tudi zvoki okolja med »tišino«", ["prikazati virtuoznost pianista", "uglasiti klavir", "posneti ptičje petje"], "Izvajalec ne zaigra nobenega tona.", "visja"],
  ]);
}
