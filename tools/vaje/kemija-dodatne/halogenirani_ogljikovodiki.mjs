const x = String.raw;
export default [
  { t: 4, b: x`Koliko različnih monokloro derivatov lahko nastane pri radikalskem kloriranju 2-metilbutana?`, v: 4,
    rez: x`\(4\)`, post: x`<p>2-metilbutan ima štiri vrste neenakovrednih ogljikovih atomov z vodiki: obe metilni skupini na C-2 (enakovredni), C-2, C-3 in C-4. Nastanejo 1-kloro-2-metilbutan, 2-kloro-2-metilbutan, 2-kloro-3-metilbutan in 1-kloro-3-metilbutan.</p>` },
  { t: 4, b: x`Kateri halogenoalkan najhitreje reagira po mehanizmu \(\mathrm{S_N1}\)?`, p: "2-bromo-2-metilpropan", n: ["bromometan", "1-bromobutan", "2-bromobutan"],
    post: x`<p>\(\mathrm{S_N1}\) poteka prek karbokationa. Terciarni karbokation je najstabilnejši, zato terciarni halogenoalkan reagira najhitreje.</p>` },
  { t: 4, b: x`Zakaj freoni škodijo ozonski plasti, čeprav so pri tleh zelo nereaktivni?`, p: "v stratosferi UV svetloba odcepi atome klora, ki verižno razkrajajo ozon", n: ["ker reagirajo z ozonom že pri tleh", "ker so težji od zraka", "ker vsebujejo fluor, ki veže kisik"],
    post: x`<p>Freoni pridejo nespremenjeni do stratosfere. Tam UV svetloba cepi vez C–Cl, radikal \(\mathrm{Cl\cdot}\) pa katalitično razkraja ozon: \(\mathrm{Cl + O_3 \to ClO + O_2}\), \(\mathrm{ClO + O \to Cl + O_2}\). En atom klora razgradi na tisoče molekul ozona.</p>` },
  { t: 4, b: x`Kateri halogenoalkan ima najvišje vrelišče?`, p: "1-jodobutan", n: ["1-klorobutan", "1-bromobutan", "2-kloro-2-metilpropan"],
    post: x`<p>Največja molska masa in največji, najlažje polarizabilen atom halogena pomenita najmočnejše disperzijske sile. Razvejan izomer ima manjši stik med molekulami in nižje vrelišče.</p>` },
  { t: 4, b: x`Kaj nastane pri reakciji bromoetana z vodno raztopino NaOH (substitucija)?`, p: "etanol in natrijev bromid", n: ["eten, voda in NaBr", "etan in NaBr", "dibromoetan"],
    post: x`<p>Hidroksidni ion zamenja brom: \(\mathrm{CH_3CH_2Br + OH^- \to CH_3CH_2OH + Br^-}\). V etanolni raztopini pri segrevanju bi prevladala eliminacija (eten).</p>` },
  { t: 4, b: x`Koliko strukturnih izomer ima \(\mathrm{C_3H_6Cl_2}\)?`, v: 4,
    rez: x`\(4\)`, post: x`<p>1,1-dikloropropan, 1,2-dikloropropan, 1,3-dikloropropan in 2,2-dikloropropan.</p>` },
  { t: 4, b: x`Katero zaporedje pravilno opisuje jakost vezi C–X?`, p: "C–F > C–Cl > C–Br > C–I", n: ["C–I > C–Br > C–Cl > C–F", "vse so enako močne", "C–Cl > C–F > C–Br > C–I"],
    post: x`<p>Večji atom halogena tvori daljšo in šibkejšo vez. Zato je fluoroalkane najtežje razcepiti, jodoalkani pa najlažje vstopajo v substitucije.</p>` },
];
