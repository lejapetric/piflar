import { izbira } from "../lib.mjs";
import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Božanska komedija", "Dante Alighieri", "ep"], ["Parzival", "Wolfram von Eschenbach", "ep"], ["Veliki testament", "François Villon", "lirska pesem"], ["Canterburyjske zgodbe", "Geoffrey Chaucer", "zbirka zgodb"], ["Lancelot", "Chrétien de Troyes", "viteški roman"], ["Nova doba (Vita nuova)", "Dante Alighieri", "lirska pesem"]],
    osebe: [["Dante Alighieri", "je na poti skozi pekel, vice in raj spremljal Vergil"], ["François Villon", "je bil pesnik potepuh in večkrat obsojen"], ["Geoffrey Chaucer", "je napisal zgodbe romarjev na poti v Canterbury"], ["Walther von der Vogelweide", "je najslavnejši nemški minnesänger"]],
  });
  serija("junaski-ep", 8, (r) => {
    const [e, n] = r.izberi([["Pesem o Rolandu", "francoski"], ["Pesem o Nibelungih", "nemški"], ["Pesem o Cidu", "španski"], ["Beowulf", "staroangleški"], ["Pesem o Igorjevem pohodu", "staroruski"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri narodni junaški ep je <em>${e}</em>?`, pravilna: n, napacne: ["francoski", "nemški", "španski", "staroangleški", "staroruski"].filter((x) => x !== n).slice(0, 3), postopek: `<p><em>${e}</em>: ${n} junaški ep.</p>` });
  });
  serija("spomeniki", 8, (r) => {
    const [s, odg] = r.izberi([["Brižinski spomini", "najstarejši ohranjeni zapis v slovenskem jeziku (okoli leta 1000)"], ["Celovški (Rateški) rokopis", "zapis molitev iz 14. stoletja"], ["Stiški rokopis", "rokopis z velikonočno pesmijo iz 15. stoletja"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kaj je ${s}?`, pravilna: odg, napacne: ["najstarejši ohranjeni zapis v slovenskem jeziku (okoli leta 1000)", "zapis molitev iz 14. stoletja", "rokopis z velikonočno pesmijo iz 15. stoletja", "prva tiskana slovenska knjiga"].filter((x) => x !== odg), postopek: `<p>${s}: ${odg}.</p>` });
  });
  serija("bozanska", 6, (r) => {
    const [v, odg, nap] = r.izberi([["Kdo vodi Danteja skozi pekel in vice?", "Vergil", ["Beatrice", "Homer", "sv. Peter"]], ["Kdo vodi Danteja skozi raj?", "Beatrice", ["Vergil", "Laura", "Ovid"]], ["Koliko spevov ima Božanska komedija?", "100", ["33", "50", "14"]], ["V kakšni kitici je napisana Božanska komedija?", "v tercinah", ["v stancah", "v kvartinah", "v sonetih"]]]);
    return izbira({ r, tezavnost: 3, besedilo: v, pravilna: odg, napacne: nap, postopek: `<p>${odg}.</p>` });
  });
  pojmi([
    ["viteški roman", "Pripoved o pustolovščinah vitezov in dvorni ljubezni."],
    ["junaški ep", "Pesnitev o narodnih junakih in bojih."],
    ["trubadur", "Provansalski pesnik, ki je opeval dvorno ljubezen."],
    ["minnesang", "Nemška srednjeveška ljubezenska lirika."],
    ["dvorna ljubezen", "Čaščenje nedosegljive gospe v srednjeveški liriki."],
    ["legenda", "Pripoved o življenju svetnika."],
    ["alegorija", "Prikaz abstraktnega pojma s konkretno podobo."],
    ["tercina", "Tristišje s prepletajočo se rimo aba bcb."],
    ["skriptorij", "Prostor v samostanu, kjer so prepisovali rokopise."],
    ["vagant", "Potujoči študent, pesnik posvetnih pesmi."],
    ["latinica", "Pisava, v kateri so zapisani Brižinski spomini."],
  ]);
  vprasanja([
    [3, "Zakaj se Božanska komedija imenuje »komedija«?", "ker se začne žalostno in konča srečno (v raju)", ["ker je smešna", "ker je napisana za gledališče", "ker jo je napisal komediograf"], "Pridevek »božanska« je dodal Boccaccio."],
    [4, "Kaj simbolizira Dantejeva pot skozi onstranstvo?", "pot človeške duše od greha k odrešenju", ["potovanje po Italiji", "vojaški pohod", "iskanje zaklada"], "Alegorija odrešenja.", "visja"],
    [4, "Zakaj so Brižinski spomini pomembni?", "so najstarejši ohranjeni zapis v slovenskem jeziku in v latinici", ["so prva tiskana slovenska knjiga", "so napisani v cirilici", "so prvi slovenski roman"], "Nastali so okoli leta 1000, hranijo jih v Münchnu.", "visja"],
  ]);
}
