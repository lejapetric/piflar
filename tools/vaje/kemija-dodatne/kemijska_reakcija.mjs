import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`\(10\ \mathrm{g}\) vodika in \(64\ \mathrm{g}\) kisika zreagirata v vodo. Koliko gramov vode nastane? (\(M\): H\(_2\) 2, O\(_2\) 32, H\(_2\)O 18 g/mol)`, v: 72, enota: "g",
    rez: x`\(72\ \mathrm{g}\) (vodik je v prebitku)`, post: x`<p>\(\mathrm{2\,H_2 + O_2 \to 2\,H_2O}\). \(n(\mathrm{H_2}) = 5\ \mathrm{mol}\), \(n(\mathrm{O_2}) = 2\ \mathrm{mol}\). Za 2 mol kisika potrebujemo le 4 mol vodika, zato kisik omejuje.</p><p>\(n(\mathrm{H_2O}) = 4\ \mathrm{mol}\), \(m = 72\ \mathrm{g}\)</p>` },
  { t: 4, b: x`Koliko molov elektronov sprejme železo na en mol nastalega Fe pri reakciji \(\mathrm{Fe_2O_3 + 3\,CO \to 2\,Fe + 3\,CO_2}\)?`, v: 3,
    rez: x`\(3\) mol elektronov sprejme na mol Fe`, post: x`<p>Oksidacijsko število železa se spremeni s \(+\mathrm{III}\) na \(0\): vsak atom sprejme \(3\) elektrone. Na mol Fe je to \(3\ \mathrm{mol}\) elektronov (ogljik jih odda: \(+\mathrm{II} \to +\mathrm{IV}\)).</p>` },
  { t: 4, b: x`Pri žganju \(50\ \mathrm{g}\) apnenca (\(\mathrm{CaCO_3}\)) nastane \(22{,}4\ \mathrm{g}\) žganega apna (\(\mathrm{CaO}\)). Kolikšen je izkoristek reakcije? (\(M\): CaCO\(_3\) 100, CaO 56 g/mol; v odstotkih.)`, v: 80, enota: "%",
    rez: x`\(80\,\%\)`, post: x`<p>\(\mathrm{CaCO_3 \to CaO + CO_2}\). Teoretično: \(0{,}5\ \mathrm{mol}\) CaO, to je \(28\ \mathrm{g}\).</p><p>Izkoristek \(\frac{22{,}4}{28} = 80\,\%\)</p>` },
  { t: 4, raven: "visja", b: x`Iz standardnih tvorbenih entalpij izračunaj reakcijsko entalpijo sežiga metana: \(\mathrm{CH_4 + 2\,O_2 \to CO_2 + 2\,H_2O(l)}\). (\(\Delta H_f\): CH\(_4\) \(-75\), CO\(_2\) \(-394\), H\(_2\)O(l) \(-286\) kJ/mol; v kJ/mol.)`, v: -394 - 2 * 286 + 75, enota: "kJ/mol",
    rez: x`\(\Delta H = -891\ \mathrm{kJ/mol}\)`, post: x`<p>\(\Delta H = \sum \Delta H_f(\text{produkti}) - \sum \Delta H_f(\text{reaktanti}) = (-394 - 572) - (-75) = -891\ \mathrm{kJ/mol}\)</p>` },
  { t: 4, b: x`Kolikšen je stehiometrijski koeficient pred \(\mathrm{O_2}\) v urejeni enačbi \(\mathrm{C_8H_{18} + \_\,O_2 \to \_\,CO_2 + \_\,H_2O}\), če so vsi koeficienti najmanjša cela števila?`, v: 25,
    rez: x`\(\mathrm{2\,C_8H_{18} + 25\,O_2 \to 16\,CO_2 + 18\,H_2O}\)`, post: x`<p>Za en oktan: \(8\,\mathrm{CO_2}\) in \(9\,\mathrm{H_2O}\), kisikovih atomov \(16 + 9 = 25\), torej \(12{,}5\,\mathrm{O_2}\). Množimo z 2.</p>` },
];
