import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`V Ljubljani je ponedeljek ob 14.00 (srednjeevropski čas, UTC+1). Koliko je ura v Tokiu (UTC+9)?`, p: "ponedeljek ob 22.00", n: ["ponedeljek ob 6.00", "torek ob 5.00", "ponedeljek ob 23.00"],
    post: x`<p>Razlika je \(8\) ur vzhodno: \(14 + 8 = 22\).</p>` },
  { t: 4, b: x`Država ima \(30\) milijonov prebivalcev in letni naravni prirastek \(2{,}3\,\%\). V približno koliko letih se bo prebivalstvo podvojilo? (pravilo 70)`, v: 70 / 2.3, enota: "let",
    rez: x`\(\approx ${T(70 / 2.3, 0)}\) let`, post: x`<p>Čas podvojitve \(\approx \frac{70}{2{,}3} \approx 30\) let</p>` },
  { t: 4, b: x`Zakaj je v monsunski Aziji največ padavin poleti?`, p: "kopno se poleti močno segreje, nastane nizek tlak in vlažen zrak z oceana priteka na kopno", n: ["ker pozimi pihajo vetrovi z oceana", "ker so poleti cikloni iz Sibirije", "ker poleti vlada visok zračni tlak nad Indijo"],
    post: x`<p>Poleti je nad kopnim nizek tlak, monsun piha z Indijskega oceana in prinaša dež. Pozimi je nad Azijo visok tlak in suh zimski monsun piha s kopnega.</p>` },
  { t: 4, b: x`Katera značilnost je tipična za države v 2. fazi demografskega prehoda?`, p: "visoka rodnost in hitro padajoča smrtnost, zato hitra rast prebivalstva", n: ["nizka rodnost in nizka smrtnost", "visoka rodnost in visoka smrtnost", "smrtnost večja od rodnosti"],
    post: x`<p>Boljša higiena, zdravstvo in prehrana znižajo smrtnost, rodnost pa ostane še nekaj časa visoka.</p>` },
  { t: 4, b: x`Zakaj ima puščava Atacama tako malo padavin, čeprav leži ob oceanu?`, p: "ob obali teče hladni Humboldtov tok, ki ohlaja zrak, in leži v območju subtropskega visokega tlaka in v padavinski senci Andov", n: ["ker je na ekvatorju", "ker leži v monsunskem pasu", "ker nad njo vlada nizek zračni tlak"],
    post: x`<p>Hladen morski tok stabilizira zrak (ni dvigovanja, le megla), anticiklon prepreči nastanek oblakov, Andi pa zadržijo vlago z vzhoda.</p>` },
  { t: 4, b: x`Kateri kazalnik bolje opisuje razvitost države kot sam BDP na prebivalca?`, p: "indeks človekovega razvoja (HDI), ki združuje dohodek, izobrazbo in pričakovano trajanje življenja", n: ["skupni BDP države", "površina države", "število prebivalcev"],
    post: x`<p>HDI upošteva tudi zdravje in izobrazbo, ne le dohodek.</p>` },
  { t: 4, b: x`Kraj leži na \(30^\circ\) zahodne zemljepisne dolžine. Kolikšna je časovna razlika glede na ničelni poldnevnik (po krajevnem času)?`, p: "2 uri manj", n: ["2 uri več", "30 minut manj", "3 ure manj"],
    post: x`<p>Zemlja se zavrti za \(15^\circ\) na uro. \(30^\circ\) zahodno je \(2\) uri prej (manj).</p>` },
  { t: 4, b: x`Zakaj je v Avstraliji večina prebivalstva na jugovzhodni obali?`, p: "notranjost je suha (puščave), jugovzhod ima zmerno podnebje in dovolj padavin", n: ["ker je notranjost poraščena z deževnim gozdom", "ker je na jugovzhodu največ rudnin", "ker je na severu prehladno"],
    post: x`<p>Notranjost leži v pasu subtropskega visokega tlaka in v padavinski senci Velikega razvodnega gorovja.</p>` },
];
