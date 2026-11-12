import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Zmešamo \(50\ \mathrm{mL}\) raztopine HCl s koncentracijo \(0{,}10\ \mathrm{mol/L}\) in \(30\ \mathrm{mL}\) raztopine NaOH s koncentracijo \(0{,}10\ \mathrm{mol/L}\). Kolikšen je pH nastale raztopine?`, v: -Math.log10(0.002 / 0.08), tol: 0.02,
    rez: x`\(\mathrm{pH} \approx ${T(-Math.log10(0.002 / 0.08), 2)}\)`, post: x`<p>\(n(\mathrm{HCl}) = 5\ \mathrm{mmol}\), \(n(\mathrm{NaOH}) = 3\ \mathrm{mmol}\). Ostane \(2\ \mathrm{mmol}\) \(\mathrm{H_3O^+}\) v \(80\ \mathrm{mL}\).</p><p>\([\mathrm{H_3O^+}] = 0{,}025\ \mathrm{mol/L}\), \(\mathrm{pH} = -\log 0{,}025 \approx 1{,}60\)</p>` },
  { t: 4, raven: "visja", b: x`Kolikšen je pH raztopine ocetne kisline s koncentracijo \(0{,}10\ \mathrm{mol/L}\)? (\(K_a = 1{,}8 \cdot 10^{-5}\))`, v: -Math.log10(Math.sqrt(1.8e-6)), tol: 0.02,
    rez: x`\(\mathrm{pH} \approx ${T(-Math.log10(Math.sqrt(1.8e-6)), 2)}\)`, post: x`<p>Šibka kislina: \([\mathrm{H_3O^+}] \approx \sqrt{K_a c} = \sqrt{1{,}8 \cdot 10^{-6}} \approx 1{,}34 \cdot 10^{-3}\ \mathrm{mol/L}\).</p><p>\(\mathrm{pH} \approx 2{,}87\)</p>` },
];
