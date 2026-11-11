import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Martin Krpan z Vrha", "Fran Levstik", "povest"], ["Popotovanje iz Litije do Čateža", "Fran Levstik", "potopis"], ["Deseti brat", "Josip Jurčič", "roman"], ["Jurij Kozjak, slovenski janičar", "Josip Jurčič", "povest"], ["Obrazi", "Simon Jenko", "pesemski cikel"], ["Tilka", "Simon Jenko", "povest"], ["Soči", "Simon Gregorčič", "pesem"], ["Človeka nikar!", "Simon Gregorčič", "pesem"], ["Jara gospoda", "Janko Kersnik", "roman"], ["Mačkova očeta", "Janko Kersnik", "črtica"], ["Zorin", "Josip Stritar", "roman"], ["Balade in romance", "Anton Aškerc", "pesniška zbirka"]],
    osebe: [["Fran Levstik", "je v Popotovanju zapisal program za slovensko prozo"], ["Josip Jurčič", "je napisal prvi slovenski roman"], ["Simon Jenko", "je pesnik narave in avtor Naprej zastave slave"], ["Simon Gregorčič", "je »goriški slavček«"], ["Josip Stritar", "je v Dunajskih sonetih ostro kritiziral slovenske razmere"], ["Anton Aškerc", "je bil duhovnik in pisal epske balade"]],
  });
  pojmi([
    ["literarni program", "Zapis načel, kako naj se razvija književnost."],
    ["staroslovenci", "Konservativna politična skupina okoli Bleiweisa."],
    ["mladoslovenci", "Liberalna mlajša generacija, ki je zahtevala več narodnih pravic."],
    ["tabori", "Množična narodna zborovanja na prostem."],
    ["čitalnice", "Društva za branje, kulturo in narodno zavest."],
    ["Ljubljanski zvon", "Literarna revija, ki je začela izhajati leta 1881."],
    ["povest", "Daljša pripoved z bolj enostavno zgradbo od romana."],
    ["črtica", "Kratka pripoved o drobnem dogodku ali razpoloženju."],
    ["kmečka povest", "Povest z dogajanjem na podeželju."],
    ["idealizacija", "Prikaz oseb ali razmer lepših, kot so v resnici."],
    ["Dunajski soneti", "Stritarjev satirični cikel sonetov."],
  ]);
  vprasanja([
    [2, "Kaj Krpan prinese cesarju poleg glave Brdavsa?", "prosi za dovoljenje, da prenaša sol", ["zlato", "cesarjevo hčer", "konja"], "Cesar mu da pisan list za prenašanje soli."],
    [3, "Kdo je Martinek Spak v Desetem bratu?", "deseti brat, ki se potika po svetu", ["graščak", "učitelj Lovro Kvas", "Manica"], "Po ljudskem verovanju mora deseti brat od doma."],
    [4, "Zakaj je Levstikovo Popotovanje iz Litije do Čateža pomembno?", "ker zahteva, naj se slovenska proza zgleduje po ljudski in prikazuje domače ljudi", ["ker je prvi slovenski roman", "ker je prva slovenska drama", "ker je napisano v nemščini"], "Jurčič je program uresničil z Desetim bratom.", "visja"],
    [4, "Kakšno vprašanje odpira Gregorčičeva pesem Človeka nikar!?", "smisel trpljenja in pravica do sreče na zemlji", ["vojna slava", "lepota Soče", "ljubezen do Boga brez dvoma"], "Pesem je sprožila spor z Mahničem.", "visja"],
  ]);
}
