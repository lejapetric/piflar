import { vrzeli } from "../jezik-lib.mjs";

export default function ({ serija }) {
  vrzeli(serija, "vezniki", [
    ["Ich bleibe zu Hause, ___ ich krank bin.", "weil", ["obwohl", "dass", "ob"], "Weil za vzrok.", 1],
    ["Er sagt, ___ er keine Zeit hat.", "dass", ["ob", "wenn", "weil"], "Dass uvaja predmetni odvisnik.", 1],
    ["Ich weiß nicht, ___ sie morgen kommt.", "ob", ["dass", "wenn", "als"], "Ob za da/ne vprašanje v odvisniku."],
    ["___ ich klein war, wohnte ich in Graz.", "Als", ["Wenn", "Ob", "Wann"], "Als za enkratno dogajanje v preteklosti."],
    ["___ es regnet, nehme ich einen Schirm.", "Wenn", ["Als", "Ob", "Dass"], "Wenn za pogoj ali ponavljanje."],
    ["___ er viel gelernt hat, hat er die Prüfung nicht bestanden.", "Obwohl", ["Weil", "Damit", "Dass"], "Obwohl za dopustni odvisnik.", 3],
    ["Ich spare Geld, ___ ich ein Auto kaufen kann.", "damit", ["obwohl", "weil", "ob"], "Damit za namen.", 3],
    ["___ wir gegessen hatten, gingen wir spazieren.", "Nachdem", ["Bevor", "Während", "Seit"], "Nachdem + Plusquamperfekt.", 4, "visja"],
    ["___ du gehst, mach bitte das Licht aus.", "Bevor", ["Nachdem", "Seitdem", "Als"], "Bevor = preden.", 3],
    ["___ ich koche, hört er Musik.", "Während", ["Bevor", "Nachdem", "Ob"], "Während = medtem ko.", 3],
    ["Er lernt Deutsch, ___ er in Wien studieren will.", "weil", ["obwohl", "ob", "als"], "Weil za vzrok.", 1],
    ["Ich frage mich, ___ er so spät kommt.", "warum", ["dass", "weil", "ob"], "Odvisno vprašanje z vprašalnico.", 2],
    ["Je mehr du übst, ___ besser spielst du.", "desto", ["als", "so", "dann"], "Je … desto …", 4, "visja"],
    ["___ ich es gewusst hätte, wäre ich gekommen.", "Wenn", ["Als", "Ob", "Dass"], "Irrealni pogojni odvisnik.", 4, "visja"],
  ]);
  vrzeli(serija, "oziralni", [
    ["Der Mann, ___ dort steht, ist mein Vater.", "der", ["den", "dem", "dessen"], "Oziralni zaimek v imenovalniku (m).", 2],
    ["Die Frau, ___ ich gestern gesehen habe, ist Ärztin.", "die", ["der", "den", "deren"], "Tožilnik ženskega spola: die.", 3],
    ["Das Kind, ___ ich geholfen habe, ist nett.", "dem", ["das", "den", "dessen"], "Helfen + dajalnik: dem.", 3],
    ["Der Freund, ___ Auto kaputt ist, kommt zu Fuß.", "dessen", ["deren", "dem", "der"], "Rodilnik moškega spola: dessen.", 4, "visja"],
    ["Die Kinder, ___ Eltern arbeiten, essen in der Schule.", "deren", ["dessen", "denen", "die"], "Rodilnik množine: deren.", 4, "visja"],
    ["Die Leute, mit ___ ich arbeite, sind freundlich.", "denen", ["den", "die", "deren"], "Dajalnik množine: denen.", 4, "visja"],
    ["Der Film, ___ wir gesehen haben, war spannend.", "den", ["der", "dem", "das"], "Tožilnik moškega spola: den.", 3],
    ["Das Buch, ___ auf dem Tisch liegt, gehört mir.", "das", ["dem", "den", "der"], "Imenovalnik srednjega spola.", 2],
    ["Das ist alles, ___ ich weiß.", "was", ["das", "dass", "welches"], "Po alles, nichts, etwas → was.", 4, "visja"],
    ["Die Stadt, in ___ ich wohne, ist klein.", "der", ["die", "den", "dem"], "In + dajalnik ženskega spola: der.", 3],
    ["Der Lehrer, ___ wir oft fragen, ist geduldig.", "den", ["der", "dem", "dessen"], "Fragen + tožilnik: den.", 3],
    ["Die Freundin, ___ ich ein Geschenk gebe, hat Geburtstag.", "der", ["die", "denen", "deren"], "Geben + dajalnik ženskega spola: der.", 4, "visja"],
  ]);
}
