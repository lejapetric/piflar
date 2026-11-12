const x = String.raw;
export default [
  { t: 4, b: x`Kakšna je oblika molekule \(\mathrm{SF_4}\)?`, p: "gugalnica (deformiran tetraeder)", n: ["tetraeder", "kvadrat", "trigonalna piramida"],
    post: x`<p>Okoli S je 5 elektronskih parov (4 vezni + 1 nevezni): trigonalna bipiramida, nevezni par je v ekvatorialni legi. Oblika atomov je gugalnica.</p>` },
  { t: 4, b: x`Katera od molekul je nepolarna, čeprav ima polarne vezi?`, p: x`\(\mathrm{BF_3}\)`, n: [x`\(\mathrm{NH_3}\)`, x`\(\mathrm{H_2O}\)`, x`\(\mathrm{CH_3Cl}\)`],
    post: x`<p>\(\mathrm{BF_3}\) je trikotna in simetrična, dipoli vezi se izničijo. \(\mathrm{NH_3}\) in \(\mathrm{H_2O}\) imata nevezne pare in nesimetrično obliko.</p>` },
  { t: 4, b: x`Zakaj ima \(\mathrm{H_2O}\) (\(M = 18\)) višje vrelišče kot \(\mathrm{H_2S}\) (\(M = 34\))?`, p: "med molekulami vode so vodikove vezi", n: ["ker je molekula vode večja", "ker so v vodi ionske vezi", "ker ima žveplo manjšo elektronegativnost kot vodik"],
    post: x`<p>Kisik je majhen in zelo elektronegativen, zato med molekulami vode nastanejo vodikove vezi, ki so precej močnejše od disperzijskih in dipolnih sil med \(\mathrm{H_2S}\).</p>` },
  { t: 4, b: x`Koliko veznih elektronskih parov σ in π ima molekula \(\mathrm{HC{\equiv}C{-}CH{=}CH_2}\)? (Vpiši število vezi π.)`, v: 3,
    rez: x`\(3\) vezi π (in \(7\) vezi σ)`, post: x`<p>Trojna vez: 1 σ + 2 π, dvojna: 1 σ + 1 π. Vezi π: \(3\). Vezi σ: 3 C–C + 4 C–H = 7.</p>` },
  { t: 4, b: x`Kateri kot med vezmi je največji?`, p: x`O–C–O v \(\mathrm{CO_2}\)`, n: [x`H–C–H v \(\mathrm{CH_4}\)`, x`H–N–H v \(\mathrm{NH_3}\)`, x`F–B–F v \(\mathrm{BF_3}\)`],
    post: x`<p>\(\mathrm{CO_2}\) je linearna (\(180^\circ\)), \(\mathrm{BF_3}\) \(120^\circ\), \(\mathrm{CH_4}\) \(109{,}5^\circ\), \(\mathrm{NH_3}\) približno \(107^\circ\).</p>` },
];
