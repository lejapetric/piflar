import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Pri popolnem sežigu \(0{,}1\ \mathrm{mol}\) ogljikovodika nastane \(17{,}6\ \mathrm g\) \(\mathrm{CO_2}\) in \(9{,}0\ \mathrm g\) vode. Koliko vodikovih atomov ima molekula? (\(M\): CO\(_2\) 44, H\(_2\)O 18 g/mol)`, v: 10,
    rez: x`\(\mathrm{C_4H_{10}}\): \(10\)`, post: x`<p>\(n(\mathrm{CO_2}) = 0{,}4\ \mathrm{mol}\): 4 atomi C na molekulo. \(n(\mathrm{H_2O}) = 0{,}5\ \mathrm{mol}\): 1 mol H atomov, torej 10 na molekulo.</p>` },
  { t: 4, b: x`Koliko molov vodika se lahko adira na en mol penta-1,3-diena?`, v: 2,
    rez: x`\(2\ \mathrm{mol}\)`, post: x`<p>Dve dvojni vezi, vsaka sprejme en \(\mathrm{H_2}\). Nastane pentan.</p>` },
  { t: 4, b: x`Zakaj benzen raje vstopa v reakcije substitucije kot adicije?`, p: "s substitucijo se ohrani stabilen aromatski sistem", n: ["ker benzen nima dvojnih vezi", "ker je benzen nasičen ogljikovodik", "ker adicija na benzen sploh ni mogoča"],
    post: x`<p>Delokalizirani elektroni π dajejo benzenu posebno stabilnost. Pri substituciji se aromatski obroč ohrani, pri adiciji bi se ta stabilnost izgubila.</p>` },
];
