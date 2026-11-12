import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Proizvajalci v ekosistemu vežejo \(50\,000\ \mathrm{kJ/m^2}\) letno. Koliko energije (v kJ/m²) pride do plenilcev drugega reda (3. trofični nivo nad proizvajalci), če se na vsakem prehodu ohrani \(10\,\%\)?`, v: 50, enota: "kJ/m²",
    rez: x`\(50\ \mathrm{kJ/m^2}\)`, post: x`<p>Rastlinojedci: \(5000\), plenilci 1. reda: \(500\), plenilci 2. reda: \(50\ \mathrm{kJ/m^2}\)</p>` },
  { t: 4, b: x`Zakaj lahko piramida biomase v morju izgleda obrnjena (manj fitoplanktona kot zooplanktona)?`, p: "fitoplankton se zelo hitro razmnožuje, zato majhna biomasa proizvede veliko hrane", n: ["ker zooplankton opravlja fotosintezo", "ker se energija med nivoji povečuje", "ker fitoplankton živi le pozimi"],
    post: x`<p>Piramida biomase prikazuje trenutno stanje. Fitoplankton ima kratko življenjsko dobo in hitro obnovo, zato je njegova letna produkcija velika, čeprav je biomasa v danem trenutku majhna. Piramida energije ni nikoli obrnjena.</p>` },
];
