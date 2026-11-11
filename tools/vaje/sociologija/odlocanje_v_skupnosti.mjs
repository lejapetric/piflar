import { izbira } from "../lib.mjs";
const OB = [["Ljudje ubogajo kralja, ker je tako že stoletja.", "tradicionalna oblast"], ["Ljudje sledijo voditelju zaradi njegovih izjemnih osebnih lastnosti.", "karizmatična oblast"], ["Ljudje spoštujejo predsednika vlade, ker je bil izvoljen po zakonu.", "legalno-racionalna oblast"], ["Verniki sledijo preroku, ker verjamejo v njegovo poslanstvo.", "karizmatična oblast"], ["Uradnik izvaja odločbo, ker jo predpisuje zakon.", "legalno-racionalna oblast"], ["Plemiški naslov in pravice podedujejo potomci.", "tradicionalna oblast"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("weber", 6, (r, i) => izbira({ r, tezavnost: 3, besedilo: `Kateri Webrov tip legitimne oblasti opisuje primer: ${OB[i][0]}`, pravilna: OB[i][1], napacne: ["tradicionalna oblast", "karizmatična oblast", "legalno-racionalna oblast"].filter((x) => x !== OB[i][1]), postopek: `<p>${OB[i][1]}.</p>` }));
  pojmi([
    ["moč", "Zmožnost uveljaviti svojo voljo tudi proti odporu drugih."],
    ["oblast", "Moč, ki jo podrejeni sprejemajo kot upravičeno."],
    ["legitimnost", "Splošno prepričanje, da je oblast upravičena."],
    ["legalnost", "Skladnost delovanja oblasti s pravnimi pravili."],
    ["država", "Politična organizacija z monopolom nad legitimno uporabo sile na določenem ozemlju."],
    ["demokracija", "Oblika vladavine, v kateri oblast izhaja iz ljudstva."],
    ["socialna država", "Država, ki z davki in prerazdelitvijo zagotavlja socialno varnost."],
    ["politična participacija", "Sodelovanje državljanov pri političnem odločanju."],
    ["civilna družba", "Prostovoljna združenja med državo in posameznikom."],
    ["birokracija", "Organizacija s hierarhijo, pisnimi pravili in strokovnimi uradniki."],
    ["totalna ustanova", "Ustanova, ki nadzoruje celotno življenje članov, npr. zapor ali vojašnica."],
    ["volilna abstinenca", "Neudeležba na volitvah."],
    ["lobiranje", "Vplivanje interesnih skupin na odločitve oblasti."],
    ["populizem", "Politični slog, ki postavlja »ljudstvo« proti »elitam«."],
  ]);
  vprasanja([
    [3, "Kdo je avtor pojma totalna ustanova?", "Erving Goffman", ["Max Weber", "Karl Marx", "Émile Durkheim"], "Goffman je proučeval psihiatrične bolnišnice."],
    [4, "Kaj je Michelsov »železni zakon oligarhije«?", "vsaka velika organizacija se sčasoma podredi vladavini majhne elite", ["demokracija vedno zmaga", "države propadajo", "birokracija izgine"], "Tudi demokratične stranke razvijejo vodstveno elito.", "visja"],
    [4, "Kateri so negativni učinki birokracije po kritikih (npr. Merton)?", "togost, sledenje pravilom zaradi pravil in razosebljenost", ["prevelika ustvarjalnost", "pomanjkanje pravil", "preveč demokracije"], "Pravila lahko postanejo sama sebi namen.", "visja"],
    [4, "Zakaj nekateri sociologi EU opisujejo z izrazom demokratični primanjkljaj?", "ker so odločitve oddaljene od državljanov in je nadzor nad njimi šibek", ["ker EU nima parlamenta", "ker v EU ni volitev", "ker EU nima zakonov"], "Kritika se nanaša na preglednost in odgovornost ustanov.", "visja"],
  ]);
}
