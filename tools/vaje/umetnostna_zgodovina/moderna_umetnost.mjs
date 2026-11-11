import { skladateljiSerije } from "../glasba-lib.mjs";
import { izbira } from "../lib.mjs";
const SM = [["Čiste, žareče barve, nanesene ploskovito in neodvisno od resničnosti.", "fovizem"], ["Predmet razstavljen na geometrijske ploskve in prikazan z več zornih kotov.", "kubizem"], ["Poveličevanje hitrosti, strojev in dinamike moderne dobe.", "futurizem"], ["Deformacija oblik in barv za izražanje notranjih stisk.", "ekspresionizem"], ["Sanjske, iracionalne podobe iz podzavesti.", "nadrealizem"], ["Okrasne, valovite rastlinske linije v arhitekturi in oblikovanju okoli 1900.", "secesija"], ["Zavračanje umetniških norm, provokacija in absurd po prvi svetovni vojni.", "dadaizem"], ["Slike brez predmetnega motiva, le barve in oblike.", "abstraktna umetnost"]];
const SN = SM.map(([, s]) => s);
export default function ({ serija, pojmi, vprasanja }) {
  serija("smer", 8, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Katera smer je opisana? ${SM[i][0]}`, pravilna: SM[i][1], napacne: r.premesaj(SN.filter((x) => x !== SM[i][1])).slice(0, 3), postopek: `<p>${SM[i][1]}.</p>` }));
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Gospodične iz Avignona", "Pablo Picasso"], ["Guernica", "Pablo Picasso"], ["Ples", "Henri Matisse"], ["Krik", "Edvard Munch"], ["Poljub", "Gustav Klimt"], ["Vztrajnost spomina", "Salvador Dalí"], ["Fontana", "Marcel Duchamp"], ["Kompozicija z rdečo, modro in rumeno", "Piet Mondrian"], ["Črni kvadrat", "Kazimir Malevič"], ["Edinstvene oblike kontinuitete v prostoru", "Umberto Boccioni"], ["Narodna in univerzitetna knjižnica v Ljubljani", "Jože Plečnik"], ["Tromostovje", "Jože Plečnik"]],
    osebe: [["Pablo Picasso", "soutemeljitelj kubizma"], ["Henri Matisse", "vodilni fovist"], ["Vasilij Kandinski", "pionir abstraktnega slikarstva"], ["Salvador Dalí", "španski nadrealist"], ["Gustav Klimt", "vodja dunajske secesije z zlatimi ornamenti"], ["Jože Plečnik", "slovenski arhitekt, ki je preoblikoval Ljubljano, Dunaj in Prago"], ["Max Fabiani", "arhitekt, ki je po potresu 1895 načrtoval obnovo Ljubljane"], ["Marcel Duchamp", "avtor readymadov"]],
  });
  pojmi([
    ["avantgarda", "Umetniška gibanja, ki radikalno prelamljajo s tradicijo."],
    ["readymade", "Industrijski predmet, ki ga umetnik razglasi za umetnino."],
    ["kolaž", "Tehnika lepljenja različnih materialov na podlago."],
    ["Bauhaus", "Nemška šola za oblikovanje in arhitekturo (1919–1933)."],
    ["funkcionalizem", "Arhitekturno načelo, da oblika sledi namenu."],
    ["dunajska secesija", "Gibanje umetnikov, ki se je leta 1897 odcepilo od akademske umetnosti."],
  ]);
  vprasanja([
    [4, "Kakšna je razlika med analitičnim in sintetičnim kubizmom?", "analitični predmet razstavlja v ploskve v umirjenih barvah, sintetični gradi iz večjih ploskev in kolaža", ["med njima ni razlike", "sintetični je starejši", "analitični uporablja le čiste barve"], "Picasso in Braque.", "visja"],
    [4, "Zakaj je Duchampova Fontana prelomna?", "postavila je vprašanje, kaj je umetnost: odloča umetnikova izbira in kontekst, ne izdelava", ["ker je najlepši kip", "ker je iz marmorja", "ker jo je naročila Cerkev"], "Readymade, 1917.", "visja"],
  ]);
}
