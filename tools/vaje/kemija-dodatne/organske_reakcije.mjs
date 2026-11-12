const x = String.raw;
export default [
  { t: 4, b: x`Kateri produkt prevladuje pri adiciji HBr na propen (brez peroksidov)?`, p: "2-bromopropan", n: ["1-bromopropan", "1,2-dibromopropan", "propan"],
    post: x`<p>Markovnikovo pravilo: vodik se veže na ogljik z več vodiki, brom na srednjega. Vmesni sekundarni karbokation je stabilnejši od primarnega.</p>` },
  { t: 4, b: x`Kateri reagent oksidira propan-2-ol v propanon?`, p: x`kalijev dikromat v kislem`, n: [x`natrijev hidroksid`, x`vodik s katalizatorjem`, x`brom v tetraklorometanu`],
    post: x`<p>Sekundarni alkohol se oksidira v keton, npr. z \(\mathrm{K_2Cr_2O_7/H^+}\) (oranžna barva preide v zeleno).</p>` },
  { t: 4, b: x`Iz 2-bromo-2-metilpropana z močno bazo v etanolu pri segrevanju nastane predvsem:`, p: "2-metilpropen (eliminacija)", n: ["2-metilpropan-2-ol (substitucija)", "butan", "2-metilpropan"],
    post: x`<p>Terciarni halogenoalkan z močno bazo pri višji temperaturi preferira eliminacijo, nastane alken.</p>` },
];
