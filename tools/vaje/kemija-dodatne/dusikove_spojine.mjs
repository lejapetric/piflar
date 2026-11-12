const x = String.raw;
export default [
  { t: 4, b: x`Koliko različnih tripeptidov lahko sestavimo iz glicina, alanina in serina, če vsaka aminokislina nastopi natanko enkrat?`, v: 6,
    rez: x`\(6\)`, post: x`<p>Zaporedje aminokislin je pomembno (N- in C-konec sta različna): \(3! = 6\).</p>` },
  { t: 4, b: x`V kakšni obliki je glicin pretežno v raztopini s pH \(1\)?`, p: x`\(\mathrm{H_3N^+CH_2COOH}\)`, n: [x`\(\mathrm{H_2NCH_2COO^-}\)`, x`\(\mathrm{H_3N^+CH_2COO^-}\)`, x`\(\mathrm{H_2NCH_2COOH}\)`],
    post: x`<p>V močno kislem sta protonirani amino in karboksilna skupina, ion ima naboj \(+1\). Pri pH blizu 6 je zwitterion, v bazičnem anion.</p>` },
  { t: 4, b: x`Katera spojina je najmočnejša baza?`, p: "dietilamin", n: ["amoniak", "anilin (fenilamin)", "etanamid"],
    post: x`<p>Alkilne skupine povečajo gostoto elektronov na dušiku. Pri anilinu se prosti par delokalizira v obroč, pri amidu pa v karbonilno skupino, zato sta šibki bazi.</p>` },
  { t: 4, b: x`Katera vez stabilizira sekundarno strukturo beljakovin (vijačnico α in ploskev β)?`, p: "vodikove vezi med skupinami C=O in N–H peptidne verige", n: ["disulfidni mostički", "peptidne vezi", "ionske vezi med stranskimi verigami"],
    post: x`<p>Sekundarno strukturo določajo vodikove vezi v ogrodju verige. Disulfidni mostički in ionske vezi stranskih verig so del terciarne strukture.</p>` },
];
