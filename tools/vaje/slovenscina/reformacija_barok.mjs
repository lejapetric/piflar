import { izbira } from "../lib.mjs";
import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Katekizem", "Primož Trubar", "verski priročnik"], ["Abecednik", "Primož Trubar", "učbenik"], ["Biblija (1584)", "Jurij Dalmatin", "prevod Svetega pisma"], ["Zimske urice (Arcticae horulae)", "Adam Bohorič", "slovnica"], ["Sveti priročnik (Sacrum promptuarium)", "Janez Svetokriški", "zbirka pridig"], ["Škofjeloški pasijon", "oče Romuald", "pasijonska igra"], ["Slava vojvodine Kranjske", "Janez Vajkard Valvasor", "zgodovinsko-topografsko delo"], ["Proti zidavi romarskih cerkva", "Primož Trubar", "pridiga (polemika)"]],
    osebe: [["Primož Trubar", "je oče slovenske knjige, rojen na Rašici"], ["Jurij Dalmatin", "je prevedel celotno Sveto pismo"], ["Adam Bohorič", "je napisal prvo slovnico slovenskega jezika"], ["Janez Svetokriški", "je bil kapucinski pridigar"], ["Janez Vajkard Valvasor", "je bil polihistor in član Kraljeve družbe v Londonu"], ["Sebastijan Krelj", "je uvedel pisavo, ki jo je pozneje izpopolnil Bohorič"]],
  });
  serija("letnica", 8, (r) => {
    const [d, l] = r.izberi([["izid prvih slovenskih knjig", "1550"], ["izid Dalmatinove Biblije", "1584"], ["izid Bohoričeve slovnice", "1584"], ["izid Valvasorjeve Slave vojvodine Kranjske", "1689"], ["nastanek Škofjeloškega pasijona", "1721"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katerega leta: ${d}?`, pravilna: l, napacne: ["1550", "1584", "1689", "1721", "1600"].filter((x) => x !== l).slice(0, 3), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${l}.</p>` });
  });
  pojmi([
    ["reformacija", "Versko gibanje 16. stoletja, ki je zahtevalo prenovo cerkve."],
    ["protestantizem", "Krščanske veroizpovedi, nastale z reformacijo."],
    ["protireformacija", "Obnova katoliške cerkve in zatiranje protestantizma."],
    ["bohoričica", "Pisava slovenskih protestantov, ki se je uporabljala do 19. stoletja."],
    ["barok", "Umetnostno obdobje 17. in 18. stoletja z razkošjem in nasprotji."],
    ["pridiga", "Govor duhovnika z verskim in moralnim naukom."],
    ["pasijon", "Igra o Kristusovem trpljenju."],
    ["katekizem", "Priročnik z osnovami krščanskega nauka."],
    ["polemika", "Besedilo, ki ostro nasprotuje drugemu mnenju."],
    ["kontrast", "Barokno nasprotje, npr. med življenjem in smrtjo."],
    ["memento mori", "Opomin, da je človek umrljiv."],
  ]);
  vprasanja([
    [2, "Zakaj so protestanti pisali v jeziku ljudstva?", "da bi vsak vernik sam bral Sveto pismo", ["da bi ugajali cesarju", "ker niso znali latinsko", "zaradi trgovine"], "Načelo: Sveto pismo v materinščini."],
    [3, "Katera je prva slovenska knjiga?", "Trubarjev Katekizem (skupaj z Abecednikom)", ["Dalmatinova Biblija", "Bohoričeva slovnica", "Brižinski spomini"], "Izšli sta leta 1550 v Tübingenu."],
    [4, "Kakšen je pomen reformacije za razvoj slovenskega naroda?", "postavila je temelje knjižnega jezika in narodne zavesti", ["Slovenci so dobili državo", "uvedla je cirilico", "ukinila je fevdalizem"], "Trubar je prvi nagovoril »Slovence«.", "visja"],
    [4, "Zakaj je bila reformacija na Slovenskem kratkotrajna?", "zaradi protireformacije in izgona protestantov", ["ker ni bilo knjig", "zaradi turških vpadov", "ker so protestanti emigrirali v Ameriko"], "Verska komisija je knjige sežigala.", "visja"],
  ]);
}
