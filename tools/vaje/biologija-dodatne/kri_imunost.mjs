const x = String.raw;
export default [
  { t: 4, b: x`Mati ima krvno skupino A (heterozigotna), oče B (heterozigoten). Kolikšna je verjetnost, da ima otrok krvno skupino 0? (Vpiši ulomek.)`, v: 0.25, tol: 1e-6, namig: "Ulomek vpiši kot 1/2.",
    rez: x`\(\frac14\)`, post: x`<p>\(I^Ai \times I^Bi\): otroci \(I^AI^B, I^Ai, I^Bi, ii\), vsak s \(\frac14\). Skupina 0 je \(ii\).</p>` },
  { t: 4, b: x`Rh-negativna mati nosi drugega Rh-pozitivnega otroka. Zakaj je otrok lahko ogrožen, prvi pa ni bil?`, p: "mati je ob prvem porodu tvorila protitelesa anti-D, ki zdaj prehajajo skozi posteljico", n: ["ker otrok tvori protitelesa proti materi", "ker ima drugi otrok drugo krvno skupino AB0", "ker se Rh dejavnik spremeni med nosečnostjo"],
    post: x`<p>Ob porodu prvega otroka pridejo njegove krvničke v materin krvni obtok. Mati tvori spominske celice in protitelesa IgG, ki pri naslednji nosečnosti prehajajo posteljico in razgrajujejo krvničke ploda. Zato se po porodu daje anti-D imunoglobulin.</p>` },
  { t: 4, b: x`Zakaj virus HIV sčasoma povzroči odpoved imunskega sistema?`, p: "okuži in uničuje celice T pomagalke, ki usklajujejo celični in humoralni odziv", n: ["ker uničuje rdeče krvničke", "ker neposredno razgrajuje protitelesa", "ker okuži le celice B"],
    post: x`<p>HIV se veže na receptor CD4 na celicah T pomagalkah. Ko jih je premalo, ne aktivirajo več celic B in citotoksičnih celic T, zato telo podleže oportunističnim okužbam (AIDS).</p>` },
  { t: 4, b: x`Kaj se zgodi s krivuljo vezave kisika na hemoglobin, ko se v mišici med naporom zviša koncentracija \(\mathrm{CO_2}\) in pade pH?`, p: "premakne se v desno, hemoglobin lažje odda kisik", n: ["premakne se v levo, hemoglobin močneje veže kisik", "ostane enaka", "hemoglobin preneha vezati kisik"],
    post: x`<p>Bohrov učinek: kislejše okolje zmanjša afiniteto hemoglobina za kisik, zato ga v delujočih tkivih odda več.</p>` },
  { t: 4, b: x`Srce ima utripni volumen \(70\ \mathrm{mL}\) in frekvenco \(72\) utripov na minuto. Kolikšen je minutni volumen srca (v L/min)?`, v: (70 * 72) / 1000, enota: "L/min",
    rez: x`\(\approx 5{,}04\ \mathrm{L/min}\)`, post: x`<p>\(70\ \mathrm{mL} \cdot 72 = 5040\ \mathrm{mL/min}\)</p>` },
  { t: 4, b: x`Katera trditev o pasivni imunosti velja?`, p: "telo dobi že izdelana protitelesa, zaščita je takojšnja, a kratkotrajna", n: ["telo tvori spominske celice", "zaščita traja vse življenje", "nastane po cepljenju z oslabljenim virusom"],
    post: x`<p>Pri pasivni imunosti (materina protitelesa, serum) telo ne tvori lastnih protiteles ali spominskih celic, zato zaščita mine, ko se protitelesa razgradijo.</p>` },
];
