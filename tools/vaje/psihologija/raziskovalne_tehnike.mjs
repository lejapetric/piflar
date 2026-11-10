export default function ({ pojmi, vprasanja }) {
  pojmi([
    ["intervju", "Raziskovalna tehnika, pri kateri podatke zbiramo z ustnim spraševanjem iz oči v oči."],
    ["strukturiran intervju", "Intervju z vnaprej določenimi vprašanji v stalnem vrstnem redu."],
    ["nestrukturiran intervju", "Prost pogovor, pri katerem spraševalec vprašanja prilagaja odgovorom."],
    ["vprašalnik", "Pisni seznam vprašanj, na katera odgovarja več ljudi hkrati."],
    ["odprto vprašanje", "Vprašanje, na katero vprašani odgovori s svojimi besedami."],
    ["zaprto vprašanje", "Vprašanje z vnaprej ponujenimi odgovori, med katerimi vprašani izbira."],
    ["ocenjevalna lestvica", "Lestvica, na kateri vprašani oceni stopnjo strinjanja ali izraženosti lastnosti, npr. od 1 do 5."],
    ["psihološki test", "Standardiziran pripomoček za merjenje psiholoških lastnosti ali sposobnosti."],
    ["veljavnost", "Merska značilnost testa: test meri tisto, kar naj bi meril."],
    ["zanesljivost", "Merska značilnost testa: test ob ponovnem merjenju daje enake rezultate."],
    ["objektivnost", "Merska značilnost testa: rezultat ni odvisen od tega, kdo test izvede in točkuje."],
    ["občutljivost", "Merska značilnost testa: test razlikuje med ljudmi z majhnimi razlikami v lastnosti."],
    ["standardizacija", "Enotni pogoji izvajanja testa in norme, s katerimi primerjamo dosežke."],
    ["socialno zaželeni odgovori", "Odgovori, s katerimi se vprašani prikaže v boljši luči, namesto da bi odgovoril iskreno."],
  ]);
  vprasanja([
    [2, "Katera je prednost vprašalnika pred intervjujem?", "v kratkem času zajamemo veliko ljudi", ["lahko postavljamo podvprašanja", "vidimo nebesedne odzive", "je vedno bolj iskren"], "Vprašalnik je ekonomičen, intervju pa prilagodljiv."],
    [3, "Test inteligentnosti da pri istem dijaku teden dni zapored zelo različne rezultate. Katera merska značilnost je slaba?", "zanesljivost", ["veljavnost", "objektivnost", "občutljivost"], "Zanesljiv test daje pri ponovitvi podobne rezultate."],
    [3, "Test naj bi meril inteligentnost, v resnici pa meri predvsem hitrost branja. Katera merska značilnost je slaba?", "veljavnost", ["zanesljivost", "objektivnost", "standardizacija"], "Veljavnost: test meri tisto, kar naj bi meril."],
    [4, "Ali je lahko test zanesljiv, a neveljaven?", "da, lahko dosledno meri napačno lastnost", ["ne, zanesljiv test je vedno veljaven", "ne, neveljaven test ni nikoli zanesljiv", "da, a le pri otrocih"], "Zanesljivost je pogoj za veljavnost, ne pa tudi zagotovilo zanjo.", "visja"],
    [4, "Kaj je narobe z vprašanjem »Ali se strinjate, da je nasilje v igricah škodljivo in bi ga morali prepovedati?«", "sugestivno in dvojno vprašanje", ["je odprto vprašanje", "je prekratko", "nima ocenjevalne lestvice"], "Nakazuje zaželeni odgovor in sprašuje o dveh stvareh hkrati.", "visja"],
    [4, "Zakaj v vprašalnik vključimo tudi trditve, obrnjene v nasprotno smer?", "da zmanjšamo vpliv nagnjenja k pritrjevanju", ["da je vprašalnik daljši", "da zmedemo vprašane", "da povečamo občutljivost lestvice"], "Nekateri ljudje se z vsemi trditvami strinjajo ne glede na vsebino.", "visja"],
  ]);
}
