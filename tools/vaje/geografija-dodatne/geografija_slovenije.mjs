import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`V Ljubljani (\(295\ \mathrm m\)) je \(12\ ^\circ\mathrm C\). Kolikšna je pričakovana temperatura na vrhu Triglava (\(2864\ \mathrm m\)), če temperatura z višino pada za \(0{,}6\ ^\circ\mathrm C\) na \(100\ \mathrm m\)? (Na eno decimalko.)`, v: 12 - 0.006 * (2864 - 295), enota: "°C", tol: 0.06,
    rez: x`\(\approx ${T(12 - 0.006 * (2864 - 295), 1)}\ ^\circ\mathrm C\)`, post: x`<p>Višinska razlika \(2569\ \mathrm m\), ohladitev \(25{,}69 \cdot 0{,}6 \approx 15{,}4\ ^\circ\mathrm C\).</p><p>\(12 - 15{,}4 \approx -3{,}4\ ^\circ\mathrm C\)</p>` },
  { t: 4, b: x`Zakaj ima Bovec bistveno več padavin kot Murska Sobota?`, p: "vlažne zračne mase z Jadrana se dvigajo ob Julijskih Alpah (orografske padavine), na vzhodu pa vpliva celinsko podnebje", n: ["ker je Bovec bližje ekvatorju", "ker ima Murska Sobota višjo nadmorsko višino", "ker na vzhodu prevladujejo vlažni zahodni vetrovi"],
    post: x`<p>Prve gorske pregrade na poti vlažnega zraka z jugozahoda dobijo največ padavin (več kot \(3000\ \mathrm{mm}\) letno). Proti vzhodu se količina zmanjšuje.</p>` },
  { t: 4, b: x`Zakaj so v Sloveniji kraški izviri in ponikalnice pogosti na jugozahodu in jugu države?`, p: "tam prevladujejo karbonatne kamnine (apnenec), ki jih voda raztaplja", n: ["ker je tam največ gozda", "ker tam ni padavin", "ker so tam vulkanske kamnine"],
    post: x`<p>Dinarski kras je zgrajen pretežno iz apnenca in dolomita. Voda z raztopljenim \(\mathrm{CO_2}\) raztaplja kamnino, zato se voda pretaka podzemno.</p>` },
  { t: 4, b: x`Občina ima \(20\,000\) prebivalcev, letno \(180\) rojstev, \(240\) smrti, \(300\) priseljenih in \(150\) odseljenih. Kolikšen je skupni prirastek v promilih?`, v: ((180 - 240 + 300 - 150) / 20000) * 1000, enota: "‰",
    rez: x`\(4{,}5\,‰\)`, post: x`<p>Naravni prirastek \(-60\), selitveni \(+150\), skupni \(+90\).</p><p>\(\frac{90}{20\,000} \cdot 1000 = 4{,}5\,‰\)</p>` },
  { t: 4, b: x`Katera trditev o staranju prebivalstva Slovenije drži?`, p: "zaradi nizke rodnosti in daljšega življenja raste delež starejših od 65 let", n: ["delež mladih se povečuje zaradi visoke rodnosti", "povprečna starost pada", "starostna piramida ima široko osnovo"],
    post: x`<p>Rodnost je pod ravnjo obnavljanja, pričakovano trajanje življenja pa narašča, zato ima piramida ožjo osnovo in širši vrh.</p>` },
  { t: 4, b: x`Na zemljevidu v merilu \(1 : 50\,000\) je razdalja \(7{,}4\ \mathrm{cm}\). Koliko kilometrov je v naravi?`, v: 3.7, enota: "km",
    rez: x`\(3{,}7\ \mathrm{km}\)`, post: x`<p>\(7{,}4 \cdot 50\,000 = 370\,000\ \mathrm{cm} = 3{,}7\ \mathrm{km}\)</p>` },
  { t: 4, b: x`Zakaj je v kotlinah (npr. Ljubljanska kotlina) pozimi pogosta megla in temperaturni obrat?`, p: "hladen, težji zrak se ponoči steka na dno kotline in tam zastaja", n: ["ker je v kotlinah toplejše morje", "ker topel zrak pada na dno", "ker v kotlinah piha burja"],
    post: x`<p>Ob jasnih, mirnih nočeh se tla ohladijo, hladen zrak se steka po pobočjih na dno. Nad njim je toplejši zrak (obrat), zato je na dnu hladneje in nastaja megla, onesnaženje pa se kopiči.</p>` },
  { t: 4, b: x`Kateri dejavnik najbolj pojasni, zakaj je Slovenija med najbolj gozdnatimi državami EU?`, p: "razgiban relief in opuščanje kmetijske rabe na odročnih, strmih zemljiščih", n: ["ravninski svet z rodovitno prstjo", "suho podnebje", "velika gostota prebivalstva v hribovju"],
    post: x`<p>Gozd pokriva skoraj 60 % površja. Na strmih, odročnih zemljiščih se kmetijstvo ne izplača, zato se zaraščajo.</p>` },
];
