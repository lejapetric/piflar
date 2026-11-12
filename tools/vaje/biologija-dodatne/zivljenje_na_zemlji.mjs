import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Kocki celic s stranicama \(1\ \mathrm{mm}\) in \(3\ \mathrm{mm}\): kolikokrat večje je razmerje površina/prostornina manjše kocke?`, v: 3,
    rez: x`\(3\)-krat`, post: x`<p>Razmerje za kocko je \(\frac{6a^2}{a^3} = \frac{6}{a}\): \(6\ \mathrm{mm^{-1}}\) proti \(2\ \mathrm{mm^{-1}}\).</p>` },
  { t: 4, b: x`Katera razlaga dolgega vratu žirafe je Lamarckova?`, p: "žirafe so stegovale vratove, pridobljena lastnost se je prenesla na potomce", n: ["žirafe z daljšimi vratovi so imele več potomcev", "dolgi vratovi so nastali z naključnimi mutacijami in naravnim izborom", "dolg vrat je nastal z genskim zdrsom"],
    post: x`<p>Lamarck: raba in nerabe organov ter dedovanje pridobljenih lastnosti. Darwin: naravna variabilnost in naravni izbor.</p>` },
  { t: 4, b: x`Katera od naštetih lastnosti ne zadošča za opredelitev živega bitja, saj jo imajo tudi neživi sistemi?`, p: "rast (tudi kristali rastejo)", n: ["presnova", "razmnoževanje z dedno snovjo", "celična zgradba"],
    post: x`<p>Nobena lastnost sama ne zadošča, živa bitja imajo vse hkrati. Rast je značilna tudi za kristale in ogenj.</p>` },
  { t: 4, b: x`Zakaj so virusi na meji živega?`, p: "imajo dedno snov, a nimajo lastne presnove in se razmnožujejo le v gostiteljski celici", n: ["ker nimajo dedne snovi", "ker so večji od bakterij", "ker imajo celično steno"],
    post: x`<p>Virusi nimajo celične zgradbe, ribosomov in presnove. Zunaj celice so neaktivni delci.</p>` },
  { t: 4, b: x`Katera organizacijska raven je v pravilnem zaporedju od manjše k večji?`, p: "celica, tkivo, organ, organski sistem, organizem, populacija, združba, ekosistem", n: ["celica, organ, tkivo, organizem, populacija, ekosistem, združba", "tkivo, celica, organ, organizem, združba, populacija", "organizem, populacija, ekosistem, združba, biosfera"],
    post: x`<p>Vsaka raven vključuje prejšnjo: od celice do biosfere.</p>` },
  { t: 4, b: x`Slon ima veliko manjše razmerje površina/prostornina kot miš. Katera posledica sledi?`, p: "slon na enoto mase izgubi manj toplote, zato ima počasnejšo presnovo na kilogram", n: ["slon hitreje izgublja toploto", "miš potrebuje manj hrane na kilogram mase", "obe imata enako hitro presnovo na kilogram"],
    post: x`<p>Toplota se izgublja skozi površino. Majhne živali imajo veliko površino glede na prostornino, zato morajo za vzdrževanje temperature pojesti relativno več.</p>` },
  { t: 4, b: x`Na katerem koraku znanstvene metode je Darwin postavil hipotezo o naravnem izboru?`, p: "po opazovanju variabilnosti in boja za obstanek, preden je zbral dodatne dokaze", n: ["po poskusu v laboratoriju", "pred kakršnim koli opazovanjem", "po objavi rezultatov"],
    post: x`<p>Opazovanje (raznolikost vrst, Galapaško otočje) → vprašanje → hipoteza (naravni izbor) → zbiranje dokazov in napovedi → sklep.</p>` },
];
