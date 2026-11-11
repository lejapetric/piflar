import { izbira } from "../lib.mjs";
const MED = [["metodični dvom in dvom o čutih, sanje, zli duh", "I. meditacija"], ["cogito: mislim, torej sem; duh je bolje znan kot telo (primer voska)", "II. meditacija"], ["pravilo jasnega in razločnega ter dokaz za Boga iz ideje neskončnega", "III. meditacija"], ["izvor zmote v neskladju med neomejeno voljo in omejenim razumom", "IV. meditacija"], ["ontološki dokaz za obstoj Boga", "V. meditacija"], ["razlikovanje duha in telesa ter obstoj zunanjega sveta", "VI. meditacija"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("meditacija", 12, (r, i) => {
    const [vs, m] = MED[i % 6];
    if (i < 6) return izbira({ r, tezavnost: 3, besedilo: `V kateri meditaciji Descartes obravnava: ${vs}?`, pravilna: m, napacne: r.premesaj(MED.filter(([, x]) => x !== m).map(([, x]) => x)).slice(0, 3), postopek: `<p>${m}: ${vs}.</p>` });
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kaj je osrednja vsebina, ki jo Descartes razvije v ${m.replace("meditacija", "meditaciji")}?`, pravilna: vs, napacne: r.premesaj(MED.filter(([, x]) => x !== m).map(([x]) => x)).slice(0, 3), postopek: `<p>${m}: ${vs}.</p>` });
  });
  pojmi([
    ["metodični dvom", "Načrtno dvomljenje o vsem, kar ni povsem gotovo, da bi našli trden temelj spoznanja."],
    ["cogito", "Spoznanje »mislim, torej sem«, ki je gotovo tudi ob največjem dvomu."],
    ["zli duh", "Domneva o mogočnem prevarantu, ki nas vara tudi v najočitnejših stvareh."],
    ["jasno in razločno", "Merilo resnice: kar spoznamo jasno in razločno, je resnično."],
    ["misleča substanca", "Duh, katerega bistvo je mišljenje (res cogitans)."],
    ["razsežna substanca", "Telo, katerega bistvo je razsežnost (res extensa)."],
    ["dualizem", "Nauk, da sta duh in telo dve različni substanci."],
    ["prirojene ideje", "Ideje, ki jih ne dobimo iz izkustva, npr. ideja Boga."],
    ["ontološki dokaz", "Dokaz, da Bog obstaja, ker obstoj spada k bistvu popolnega bitja."],
    ["primer voska", "Prikaz, da bistvo telesa spoznamo z razumom, ne s čutili."],
    ["racionalizem", "Nauk, da je razum glavni vir zanesljivega spoznanja."],
  ]);
  vprasanja([
    [3, "Zakaj je cogito gotov tudi ob domnevi zlega duha?", "ker tudi če me vara, moram obstajati, da bi me lahko varal", ["ker zli duh ne obstaja", "ker čuti ne varajo", "ker tako uči Cerkev"], "Dvom je sam oblika mišljenja."],
    [4, "Kaj je kartezijanski krog?", "Descartes z jasnim in razločnim dokazuje Boga, z Bogom pa jamči za jasno in razločno", ["dokaz, da je svet okrogel", "zaporedje šestih meditacij", "povezava duha in telesa v češariki"], "Ugovor Arnaulda in drugih kritikov.", "visja"],
    [4, "Kako Descartes pojasni, zakaj se motimo, čeprav nas je ustvaril popoln Bog?", "zmota nastane, ker volja presoja tudi tisto, česar razum ne spozna jasno", ["ker nas Bog namerno vara", "ker so čuti popolni", "ker zmote ni"], "Volja je neomejena, razum omejen; rešitev je zadržati sodbo.", "visja"],
    [4, "Kateri problem dualizma je izpostavila princesa Elizabeta Češka?", "kako lahko nerazsežen duh vpliva na razsežno telo", ["kako dokazati Boga", "zakaj sanjamo", "kako je nastal vosek"], "Problem interakcije duha in telesa.", "visja"],
  ]);
}
