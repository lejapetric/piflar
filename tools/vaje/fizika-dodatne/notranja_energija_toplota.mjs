import { T } from "../lib.mjs";
const x = String.raw;
const mLed = 0.2, mV = 0.5;
const Qtali = mLed * 336e3, Qvode = mV * 4200 * 30;
export default [
  { t: 4, b: x`V \(0{,}5\ \mathrm{kg}\) vode s temperaturo \(30\ ^\circ\mathrm{C}\) vržemo \(200\ \mathrm{g}\) ledu s temperaturo \(0\ ^\circ\mathrm{C}\). Kolikšna je končna temperatura? (\(c_v = 4200\ \mathrm{J/(kg\,K)}\), \(q_t = 336\ \mathrm{kJ/kg}\); izgub ni.)`, v: 0, enota: "°C", tol: 0.05,
    rez: x`\(0\ ^\circ\mathrm{C}\)`, post: x`<p>Za taljenje ledu je potrebno \(0{,}2 \cdot 336\,000 = 67\,200\ \mathrm{J}\), voda pa pri ohladitvi na \(0\ ^\circ\mathrm{C}\) odda \(0{,}5 \cdot 4200 \cdot 30 = 63\,000\ \mathrm{J}\).</p><p>To ni dovolj, da bi se ves led stalil, zato je končna temperatura \(0\ ^\circ\mathrm{C}\) (ostane nekaj ledu).</p>` },
  { t: 4, b: x`V \(0{,}5\ \mathrm{kg}\) vode s temperaturo \(30\ ^\circ\mathrm{C}\) vržemo \(200\ \mathrm{g}\) ledu s temperaturo \(0\ ^\circ\mathrm{C}\). Koliko gramov ledu se ne stali? (\(c_v = 4200\ \mathrm{J/(kg\,K)}\), \(q_t = 336\ \mathrm{kJ/kg}\); izgub ni.)`, v: (Qtali - Qvode) / 336, enota: "g", tol: 0.5,
    rez: x`\(\approx ${T((Qtali - Qvode) / 336, 1)}\ \mathrm{g}\)`, post: x`<p>Voda lahko odda \(63\,000\ \mathrm{J}\), kar stali \(\frac{63\,000}{336\,000} = 0{,}1875\ \mathrm{kg}\) ledu.</p><p>Ostane \(200 - 187{,}5 = 12{,}5\ \mathrm{g}\) ledu pri \(0\ ^\circ\mathrm{C}\).</p>` },
  { t: 4, raven: "visja", b: x`Plin pri stalnem tlaku \(200\ \mathrm{kPa}\) razpne s \(3\ \mathrm{L}\) na \(8\ \mathrm{L}\) in pri tem prejme \(2{,}5\ \mathrm{kJ}\) toplote. Za koliko se spremeni njegova notranja energija? (v J)`, v: 2500 - 200e3 * 0.005, enota: "J",
    rez: x`\(\Delta W_n = 1500\ \mathrm{J}\)`, post: x`<p>Delo plina: \(A = p\Delta V = 200\,000 \cdot 0{,}005 = 1000\ \mathrm{J}\).</p><p>Prvi zakon: \(\Delta W_n = Q - A = 2500 - 1000 = 1500\ \mathrm{J}\)</p>` },
];
