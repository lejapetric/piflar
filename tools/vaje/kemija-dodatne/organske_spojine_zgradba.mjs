const x = String.raw;
export default [
  { t: 4, b: x`Koliko strukturnih izomer ima heksan \(\mathrm{C_6H_{14}}\)?`, v: 5,
    rez: x`\(5\)`, post: x`<p>Heksan, 2-metilpentan, 3-metilpentan, 2,2-dimetilbutan in 2,3-dimetilbutan.</p>` },
  { t: 4, b: x`Koliko kiralnih (asimetričnih) ogljikovih atomov ima 2,3-dibromobutan?`, v: 2,
    rez: x`\(2\)`, post: x`<p>C-2 in C-3 imata vsak štiri različne substituente (H, Br, CH\(_3\) in preostanek molekule). (Spojina ima zaradi simetrije le 3 stereoizomere, eden je mezo oblika.)</p>` },
  { t: 4, b: x`Katera hibridizacija ogljika je v nitrilni skupini \(-\mathrm{C{\equiv}N}\)?`, p: x`\(\mathrm{sp}\)`, n: [x`\(\mathrm{sp^2}\)`, x`\(\mathrm{sp^3}\)`, x`\(\mathrm{sp^3d}\)`],
    post: x`<p>Ogljik s trojno vezjo ima dve skupini elektronov (linearna razporeditev), zato hibridizacijo sp.</p>` },
  { t: 4, b: x`Koliko je izomer s formulo \(\mathrm{C_4H_8}\) (vključno s cis-trans izomeri in cikličnimi)?`, v: 6,
    rez: x`\(6\)`, post: x`<p>But-1-en, cis-but-2-en, trans-but-2-en, 2-metilpropen, ciklobutan, metilciklopropan.</p>` },
];
