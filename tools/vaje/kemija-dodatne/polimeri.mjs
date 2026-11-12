import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Povprečna molska masa polietena je \(28\,000\ \mathrm{g/mol}\). Kolikšna je povprečna stopnja polimerizacije? (\(M(\mathrm{C_2H_4}) = 28\ \mathrm{g/mol}\))`, v: 1000,
    rez: x`\(1000\)`, post: x`<p>\(n = \frac{28\,000}{28} = 1000\) ponavljajočih se enot</p>` },
  { t: 4, b: x`Kateri par monomerov da s kondenzacijsko polimerizacijo poliamid (najlon)?`, p: "heksan-1,6-diamin in heksandiojska kislina", n: ["eten in propen", "etan-1,2-diol in eten", "vinil klorid in stiren"],
    post: x`<p>Amino skupine in karboksilne skupine tvorijo amidne vezi, pri čemer se odcepi voda.</p>` },
  { t: 4, b: x`Zakaj se termoplasti pri segrevanju zmehčajo, duroplasti pa ne?`, p: "pri duroplastih so verige prečno povezane s kovalentnimi vezmi", n: ["ker so duroplasti iz anorganskih snovi", "ker imajo termoplasti višje tališče", "ker so verige duroplastov krajše"],
    post: x`<p>Verige termoplastov drži skupaj le medmolekulske sile, ki jih toplota premaga. Pri duroplastih tvorijo prečne kovalentne vezi tridimenzionalno mrežo, ki pri segrevanju razpade (polimer zogleni).</p>` },
  { t: 4, b: x`Kolikšna je masa \(1\ \mathrm{mol}\) ponavljajočih se enot PVC (\(\mathrm{-CH_2-CHCl-}\))? (\(A_r\): C 12, H 1, Cl 35,5; v g.)`, v: 62.5, enota: "g",
    rez: x`\(62{,}5\ \mathrm g\)`, post: x`<p>\(\mathrm{C_2H_3Cl}\): \(24 + 3 + 35{,}5 = 62{,}5\ \mathrm{g/mol}\)</p>` },
  { t: 4, b: x`Kateri polimer nastane z adicijsko polimerizacijo?`, p: "polistiren", n: ["poliester PET", "najlon", "celuloza"],
    post: x`<p>Stiren ima dvojno vez C=C, ki se pri polimerizaciji odpre. PET in najlon nastaneta s kondenzacijo, celuloza je naravni polisaharid.</p>` },
  { t: 4, raven: "visja", b: x`Polimer PET nastane iz tereftalne kisline (\(M = 166\)) in etan-1,2-diola (\(M = 62\)). Kolikšna je molska masa ponavljajoče se enote? (v g/mol)`, v: 166 + 62 - 36, enota: "g/mol",
    rez: x`\(192\ \mathrm{g/mol}\)`, post: x`<p>Pri nastanku ene ponavljajoče se enote (dveh estrskih vezi) se odcepita dve molekuli vode: \(166 + 62 - 2 \cdot 18 = 192\)</p>` },
];
