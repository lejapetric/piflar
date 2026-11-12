import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Dihalni volumen je \(500\ \mathrm{mL}\), mrtvi prostor \(150\ \mathrm{mL}\), frekvenca dihanja \(12\) vdihov na minuto. Koliko litrov zraka na minuto pride do pljučnih mešičkov?`, v: (500 - 150) * 12 / 1000, enota: "L",
    rez: x`\(4{,}2\ \mathrm{L/min}\)`, post: x`<p>Alveolarna ventilacija: \((500 - 150) \cdot 12 = 4200\ \mathrm{mL/min}\)</p>` },
  { t: 4, b: x`Zakaj je pri sladkorni bolezni v urinu glukoza?`, p: "koncentracija glukoze v filtratu preseže zmogljivost prenašalcev za njeno ponovno vsrkavanje", n: ["glomerul prepusti glukozo samo pri sladkornih bolnikih", "ADH preprečuje vsrkavanje glukoze", "glukoza se izloča v Henlejevi zanki"],
    post: x`<p>Glukoza se pri vseh filtrira v glomerulu in v proksimalnem zavitem kanalčku aktivno vrne v kri. Prenašalcev je omejeno; nad pragom (okoli \(10\ \mathrm{mmol/L}\)) ostane del glukoze v urinu.</p>` },
  { t: 4, b: x`Kaj se zgodi z izločanjem ADH in prostornino urina po pitju velike količine vode?`, p: "izločanje ADH se zmanjša, urina je več in je bolj razredčen", n: ["izločanje ADH se poveča, urina je manj", "ADH se ne spremeni, urina je več", "izločanje ADH se zmanjša, urina je manj"],
    post: x`<p>Nižja osmolarnost krvi zavre izločanje ADH. Zbiralca postaneta manj prepustna za vodo, zato se izloči več razredčenega urina.</p>` },
];
