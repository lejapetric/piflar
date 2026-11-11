export default function ({ pojmi, vprasanja }) {
  pojmi([
    ["občutenje", "Sprejem dražljajev s čutili in pretvorba v živčne impulze."],
    ["zaznavanje", "Organizacija in razlaga občutkov v smiselno celoto."],
    ["absolutni prag", "Najmanjša jakost dražljaja, ki jo še zaznamo v polovici primerov."],
    ["diferencialni prag", "Najmanjša razlika med dražljajema, ki jo še opazimo."],
    ["Webrov zakon", "Diferencialni prag je stalen delež jakosti izhodiščnega dražljaja."],
    ["čutna adaptacija", "Zmanjšanje občutljivosti čutil ob dolgotrajnem nespremenljivem dražljaju."],
    ["figura in ozadje", "Geštalt načelo: zaznano ločimo na izstopajoči lik in podlago."],
    ["načelo bližine", "Geštalt načelo: bližnje dražljaje zaznavamo kot celoto."],
    ["načelo podobnosti", "Geštalt načelo: podobne dražljaje združujemo v skupine."],
    ["načelo zaprtosti", "Geštalt načelo: nepopolne like dopolnimo v zaključene celote."],
    ["zaznavna stalnost", "Predmete zaznavamo kot nespremenjene kljub spremembam na mrežnici."],
    ["iluzija", "Napačna zaznava dejansko obstoječega dražljaja."],
    ["selektivna pozornost", "Usmerjanje zavesti na nekatere dražljaje ob zanemarjanju drugih."],
    ["zaznavna pripravljenost", "Pričakovanje, ki vpliva na to, kaj in kako zaznamo."],
  ]);
  vprasanja([
    [2, "Po nekaj minutah v sobi ne vonjamo več parfuma. Kateri pojav je to?", "čutna adaptacija", ["iluzija", "zaznavna stalnost", "selektivna pozornost"], "Čutila se prilagodijo na stalen dražljaj."],
    [3, "Na hrupni zabavi slišimo, ko nekdo izgovori naše ime. Kako imenujemo ta pojav?", "učinek koktajl zabave", ["Müller-Lyerjeva iluzija", "čutna adaptacija", "absolutni prag"], "Pomembni dražljaji pritegnejo pozornost tudi, ko jih ne spremljamo."],
    [4, "Za ločevanje uteži 100 g potrebujemo razliko 2 g. Kolikšno razliko po Webrovem zakonu potrebujemo pri uteži 500 g?", { vpis: ["10", "10 g", "10g"] }, [], "Razmerje je stalno: 2/100 = 0,02; 0,02 · 500 g = 10 g.", "visja"],
    [4, "Kaj je razlika med iluzijo in halucinacijo?", "iluzija je napačna zaznava obstoječega dražljaja, halucinacija pa zaznava brez dražljaja", ["med njima ni razlike", "halucinacija je vedno vidna, iluzija slušna", "iluzija nastane le pri bolnih ljudeh"], "Halucinacija nima zunanjega dražljaja.", "visja"],
    [4, "Kateri globinski znak deluje le z obema očesoma?", "binokularna nesorazmernost", ["linearna perspektiva", "relativna velikost", "prekrivanje"], "Vsako oko vidi nekoliko drugačno sliko.", "visja"],
  ]);
}
