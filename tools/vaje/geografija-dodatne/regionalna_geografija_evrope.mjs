import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Zakaj ima zahodna Norveška (npr. Bergen) mile zime, čeprav leži na isti geografski širini kot zaledeneli deli Sibirije?`, p: "Severnoatlantski tok in zahodni vetrovi prinašajo topel, vlažen zrak", n: ["zaradi vulkanske dejavnosti", "ker je bližje ekvatorju", "zaradi visokih gora, ki zadržujejo toploto"],
    post: x`<p>Topli morski tok (nadaljevanje Zalivskega toka) ogreva obalo, zahodni vetrovi pa ta vpliv prenašajo na kopno.</p>` },
  { t: 4, b: x`Na katero smer v Evropi se zmanjšuje vpliv oceanskega podnebja in povečuje letni temperaturni razpon?`, p: "od zahoda proti vzhodu", n: ["od vzhoda proti zahodu", "od severa proti jugu", "od juga proti severu"],
    post: x`<p>Z oddaljenostjo od Atlantika se manjša blažilni vpliv oceana: poletja so toplejša, zime hladnejše, padavin je manj.</p>` },
  { t: 4, b: x`Katera regija je tipičen primer starega industrijskega območja, ki se je preusmerilo v storitve?`, p: "Porurje v Nemčiji", n: ["Pariški bazen", "Andaluzija", "Toskana"],
    post: x`<p>Porurje je temeljilo na premogu in jeklu. Po zatonu težke industrije se je razvilo v središče storitev, logistike in visokega šolstva.</p>` },
  { t: 4, b: x`Zakaj imajo Nizozemci veliko poldrjev?`, p: "velik del države leži pod morsko gladino, zemljo so pridobili z izsuševanjem in nasipi", n: ["ker je država gorata", "ker je podnebje sušno", "ker so tam vulkani"],
    post: x`<p>Poldri so z nasipi zaščitena, izsušena nekdanja morska ali jezerska dna, kjer vodo stalno črpajo.</p>` },
  { t: 4, b: x`Kateri dejavnik je najbolj vplival na priseljevanje v države EU po letu 2015?`, p: "begunci iz vojnih območij Bližnjega vzhoda in Afrike", n: ["povratek izseljencev iz ZDA", "ugodna klima v severni Evropi", "visoke cene zemljišč v Afriki"],
    post: x`<p>Vojna v Siriji in nestabilnost v delih Afrike in Azije sta povzročili velik val prosilcev za azil.</p>` },
  { t: 4, b: x`Katero od naštetih gorstev je nastalo v alpidski orogenezi (mlado nagubano gorstvo)?`, p: "Pireneji", n: ["Ural", "Skandinavsko gorovje", "Škotsko višavje"],
    post: x`<p>Pireneji, Alpe, Karpati in Dinarsko gorstvo so mlada nagubana gorstva. Ural in Skandinavsko gorovje sta stara, zaobljena.</p>` },
  { t: 4, b: x`Država ima BDP \(500\) milijard € in \(10\) milijonov prebivalcev, povprečje EU pa je \(37\,000\ €\) na prebivalca. Koliko odstotkov povprečja EU dosega? (Na eno decimalko.)`, v: (50000 / 37000) * 100, enota: "%", tol: 0.06,
    rez: x`\(\approx ${T((50000 / 37000) * 100, 1)}\,\%\)`, post: x`<p>BDP na prebivalca: \(\frac{500 \cdot 10^9}{10^7} = 50\,000\ €\). \(\frac{50\,000}{37\,000} \approx 135{,}1\,\%\)</p>` },
  { t: 4, b: x`Zakaj je na jugu Evrope (Sredozemlje) poletje suho?`, p: "poleti se proti severu premakne območje subtropskega visokega zračnega tlaka (Azorski anticiklon)", n: ["ker pozimi pihajo vetrovi z Afrike", "ker je Sredozemsko morje hladno", "ker je v Sredozemlju veliko gora"],
    post: x`<p>Poleti se tlačni pasovi pomaknejo proti severu; anticiklon prinaša stabilno, suho vreme. Pozimi prevladujejo cikloni z zahoda, zato je takrat največ padavin.</p>` },
];
