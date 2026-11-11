import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Pogreb v Ornansu", "Gustave Courbet"], ["Zajtrk na travi", "Édouard Manet"], ["Impresija, sončni vzhod", "Claude Monet"], ["Lokvanji", "Claude Monet"], ["Ples v Moulin de la Galette", "Pierre-Auguste Renoir"], ["Plesalke", "Edgar Degas"], ["Zvezdna noč", "Vincent van Gogh"], ["Gora Sainte-Victoire", "Paul Cézanne"], ["Nedeljsko popoldne na otoku Grande Jatte", "Georges Seurat"], ["Sejalec", "Ivan Grohar"], ["Sončni breg", "Rihard Jakopič"], ["Kofetarica", "Ivana Kobilca"], ["Mislec", "Auguste Rodin"]],
    osebe: [["Gustave Courbet", "utemeljitelj realizma, ki je slikal vsakdanje ljudi"], ["Claude Monet", "impresionist, ki je slikal isti motiv ob različni svetlobi"], ["Edgar Degas", "impresionist baletnih plesalk in nenavadnih izrezov"], ["Vincent van Gogh", "postimpresionist izrazitih barv in vrtinčastih potez"], ["Paul Cézanne", "postimpresionist, ki je naravo poenostavljal v geometrijske oblike"], ["Georges Seurat", "utemeljitelj poentilizma"], ["Ivan Grohar", "slovenski impresionist, avtor Sejalca"], ["Rihard Jakopič", "vodja slovenskih impresionistov, ki je zgradil paviljon v Ljubljani"]],
  });
  pojmi([
    ["realizem", "Smer, ki upodablja vsakdanje življenje in ljudi brez idealizacije."],
    ["impresionizem", "Smer, ki z drobnimi potezami čiste barve ujame trenutni vtis svetlobe."],
    ["plein air", "Slikanje na prostem."],
    ["postimpresionizem", "Smeri po impresionizmu, ki iščejo trdnejšo obliko ali izraz."],
    ["poentilizem", "Slikanje s pikami čistih barv, ki se mešajo v očesu."],
    ["slovenski impresionisti", "Jakopič, Grohar, Jama in Sternen, ki so razstavljali kot skupina Sava."],
    ["japonizem", "Vpliv japonskih lesorezov na evropsko umetnost."],
  ]);
  vprasanja([
    [3, "Od kod izvira ime impresionizem?", "po Monetovi sliki Impresija, sončni vzhod in posmehljivi kritiki", ["po knjigi Baudelaira", "po skupini kiparjev", "po pariški ulici"], "Prva razstava 1874."],
    [4, "Zakaj so impresionisti slikali na prostem?", "da bi ujeli spreminjajočo se svetlobo in barvne sence v naravi", ["ker niso imeli ateljejev", "ker so bile barve prepovedane v zaprtih prostorih", "zaradi naročnikov"], "Pomagale so jim tube z barvami.", "visja"],
    [4, "Kako so imenovali skupino slovenskih impresionistov na dunajski razstavi leta 1904?", "Sava", ["Vesna", "Oho", "Irwin"], "Razstava pri Miethkeju na Dunaju.", "visja"],
  ]);
}
