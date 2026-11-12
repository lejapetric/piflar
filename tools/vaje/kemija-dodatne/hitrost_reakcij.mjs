import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Hitrost reakcije se poveča \(2\)-krat ob vsakem dvigu temperature za \(10\ ^\circ\mathrm{C}\). Kolikokrat hitreje poteka reakcija pri \(60\ ^\circ\mathrm{C}\) kot pri \(20\ ^\circ\mathrm{C}\)?`, v: 16,
    rez: x`\(16\)-krat`, post: x`<p>Štirje koraki po \(10\ ^\circ\mathrm{C}\): \(2^4 = 16\)</p>` },
  { t: 4, raven: "visja", b: x`Za reakcijo \(\mathrm{2\,NO + O_2 \to 2\,NO_2}\) velja \(v = k[\mathrm{NO}]^2[\mathrm{O_2}]\). Kolikokrat se poveča hitrost, če koncentracijo NO potrojimo, koncentracijo kisika pa razpolovimo?`, v: 4.5, tol: 1e-6,
    rez: x`\(4{,}5\)-krat`, post: x`<p>\(\frac{v_2}{v_1} = 3^2 \cdot \frac12 = 4{,}5\)</p>` },
];
