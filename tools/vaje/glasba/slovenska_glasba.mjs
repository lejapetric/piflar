import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Opus musicum", "Jakob Petelin Gallus"], ["Gorenjski slavček", "Anton Foerster"], ["Belin (prva opera v slovenskem jeziku)", "Jakob Zupan"], ["Naprej zastava slave", "Davorin Jenko"], ["Ekvinokcij", "Marjan Kozina"], ["Simfonija z delom Bela krajina", "Marjan Kozina"], ["Padlim", "Marjan Kozina"], ["Na Golici", "Slavko Avsenik"], ["napev Zdravljice (slovenska himna)", "Stanko Premrl"], ["Italijanska pesmarica", "Hugo Wolf"]],
    osebe: [["Jakob Petelin Gallus", "renesančni skladatelj, avtor zbirke Opus musicum"], ["Anton Foerster", "skladatelj prve slovenske narodne opere Gorenjski slavček"], ["Davorin Jenko", "avtor koračnice Naprej zastava slave"], ["Marjan Kozina", "avtor opere Ekvinokcij in simfonije s stavkom Bela krajina"], ["Lucijan Marija Škerjanc", "skladatelj in pedagog, avtor petih simfonij"], ["Hugo Wolf", "mojster samospeva, rojen v Slovenj Gradcu"], ["Stanko Premrl", "skladatelj in duhovnik, avtor napeva Zdravljice"], ["Slavko Avsenik", "ustanovitelj narodnozabavnega ansambla z melodijo Na Golici"], ["Vinko Globokar", "sodobni skladatelj in pozavnist, predstavnik avantgarde"]],
  });
  pojmi([
    ["ljudska pesem", "Pesem neznanega avtorja, ki se prenaša ustno iz roda v rod."],
    ["Glasbena matica", "Društvo, ustanovljeno 1872 v Ljubljani, ki je skrbelo za slovensko glasbo."],
    ["Philharmonische Gesellschaft", "Filharmonična družba, ustanovljena leta 1794 v Ljubljani."],
    ["Academia philharmonicorum", "Glasbena ustanova, ustanovljena leta 1701 v Ljubljani."],
    ["narodnozabavna glasba", "Zvrst, ki združuje ljudske prvine in zabavno glasbo, z harmoniko."],
    ["Slovenska filharmonija", "Osrednji slovenski orkester s sedežem v Ljubljani."],
  ]);
  vprasanja([
    [3, "V katerem letu je bila ustanovljena Academia philharmonicorum v Ljubljani?", { vpis: ["1701"] }, [], "Ena najstarejših glasbenih ustanov v Evropi."],
    [4, "Zakaj je Gorenjski slavček pomemben za slovensko glasbo?", "velja za prvo slovensko narodno opero, ki uporablja slovenske ljudske prvine", ["je prva slovenska simfonija", "je Gallusova maša", "je ljudska pesem"], "Krstno uprizorjena leta 1872.", "visja"],
  ]);
}
