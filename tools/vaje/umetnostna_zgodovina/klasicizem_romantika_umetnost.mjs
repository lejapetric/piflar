import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Prisega Horacijev", "Jacques-Louis David"], ["Maratova smrt", "Jacques-Louis David"], ["Amor in Psiha", "Antonio Canova"], ["Svoboda vodi ljudstvo", "Eugène Delacroix"], ["Splav Meduze", "Théodore Géricault"], ["Popotnik nad meglenim morjem", "Caspar David Friedrich"], ["3. maj 1808", "Francisco Goya"], ["Saturn žre svojega sina", "Francisco Goya"], ["Dež, para in hitrost", "William Turner"], ["Velika odaliska", "Jean-Auguste-Dominique Ingres"]],
    osebe: [["Jacques-Louis David", "vodilni slikar francoskega klasicizma in revolucije"], ["Antonio Canova", "največji kipar klasicizma"], ["Eugène Delacroix", "francoski romantik bujnih barv in gibanja"], ["Caspar David Friedrich", "nemški romantik, slikar vzvišene, skrivnostne pokrajine"], ["Francisco Goya", "španski slikar, ki je upodobil grozote vojne"], ["William Turner", "angleški slikar svetlobe in viharnega ozračja"], ["Jean-Auguste-Dominique Ingres", "klasicist, ki je poudarjal risbo in čisto linijo"], ["Théodore Géricault", "francoski romantik dramatičnih prizorov nesreče"]],
  });
  pojmi([
    ["klasicizem", "Slog ob koncu 18. stoletja, ki posnema antiko, red in razum."],
    ["romantika", "Smer prve polovice 19. stoletja, ki poudarja čustva, domišljijo in naravo."],
    ["historizem", "Arhitektura 19. stoletja, ki posnema pretekle sloge (neogotika, neorenesansa)."],
    ["vzvišeno", "Estetski pojem za veličastno in strah vzbujajoče, npr. viharji in gore."],
    ["neogotika", "Historistični slog, ki posnema gotiko."],
    ["bidermajer", "Meščanski slog srednje Evrope med 1815 in 1848, intimen in skromen."],
    ["orientalizem", "Upodabljanje Bližnjega vzhoda in severne Afrike kot eksotičnega."],
  ]);
  vprasanja([
    [4, "Kako se v slikarstvu razlikujeta klasicizem in romantika?", "klasicizem poudarja risbo, red in razum; romantika barvo, gibanje in čustva", ["oba poudarjata le barvo", "klasicizem slika samo pokrajine", "romantika posnema antične kipe"], "Ingres (linija) proti Delacroixu (barva).", "visja"],
    [4, "Kateri slovenski slikar velja za predstavnika bidermajerskega portreta?", "Mihael Stroj", ["Ivan Grohar", "Rihard Jakopič", "Zoran Mušič"], "Portretiral je ljubljansko meščanstvo.", "visja"],
  ]);
}
