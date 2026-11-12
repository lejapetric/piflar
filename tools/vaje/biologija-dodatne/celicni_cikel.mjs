const x = String.raw;
export default [
  { t: 4, b: x`Celica ima v fazi \(\mathrm{G_1}\) \(2n = 46\) kromosomov. Koliko kromatid je v eni celici v metafazi mejoze II?`, v: 46,
    rez: x`\(46\)`, post: x`<p>Po mejozi I ima celica \(23\) kromosomov, vsak iz dveh sestrskih kromatid. V metafazi II je torej \(23 \cdot 2 = 46\) kromatid.</p>` },
  { t: 4, b: x`Koliko različnih kombinacij kromosomov (brez prekrižanja) lahko nastane v gametah človeka zaradi neodvisne razporeditve homolognih parov?`, p: x`\(2^{23} \approx 8{,}4\) milijona`, n: [x`\(23^2 = 529\)`, x`\(2 \cdot 23 = 46\)`, x`\(46!\)`],
    post: x`<p>Vsak od 23 parov se v metafazi I usmeri neodvisno, z dvema možnostma: \(2^{23}\).</p>` },
  { t: 4, b: x`Celica v \(\mathrm{G_1}\) vsebuje \(10\ \mathrm{pg}\) DNA. Koliko DNA (v pg) vsebuje celica v profazi mitoze?`, v: 20, enota: "pg",
    rez: x`\(20\ \mathrm{pg}\)`, post: x`<p>V fazi S se DNA podvoji, zato ima celica v \(\mathrm{G_2}\) in profazi dvakratno količino.</p>` },
  { t: 4, b: x`Pri bakteriji je laktoza v gojišču, glukoze pa ni. Kaj velja za lac operon?`, p: "represor je vezan na laktozo (alolaktozo) in se odcepi od operatorja; geni se prepisujejo", n: ["represor je vezan na operator; geni se ne prepisujejo", "laktoza se veže na promotor in zavre prepisovanje", "operon se prepisuje le ob prisotnosti glukoze"],
    post: x`<p>Alolaktoza spremeni obliko represorja, ki se ne more vezati na operator. RNA-polimeraza prepiše gene za razgradnjo laktoze; ob odsotnosti glukoze je prepisovanje še dodatno spodbujeno.</p>` },
  { t: 4, b: x`Zakaj je mutacija, ki onesposobi gen p53, nevarna?`, p: "celica s poškodovano DNA se ne ustavi v ciklu in ne sproži apoptoze", n: ["celica se preneha deliti", "celica ne more podvojiti DNA", "povzroči takojšnjo smrt celice"],
    post: x`<p>p53 je supresor tumorjev: ob poškodbah DNA ustavi cikel za popravilo ali sproži programirano smrt. Brez njega se mutacije kopičijo, kar vodi v raka.</p>` },
  { t: 4, b: x`Ob nerazdvojitvi enega para kromosomov v mejozi I, koliko od štirih nastalih gamet ima nepravilno število kromosomov?`, v: 4,
    rez: x`vse \(4\)`, post: x`<p>Če se homologna kromosoma ne ločita v mejozi I, dobi ena hčerinska celica oba, druga nobenega. Vse štiri gamete imajo zato \(n + 1\) ali \(n - 1\). (Pri nerazdvojitvi v mejozi II sta nepravilni le dve.)</p>` },
];
