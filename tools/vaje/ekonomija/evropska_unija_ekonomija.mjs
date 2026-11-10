import { izbira } from "../lib.mjs";
const SV = [["Slovenski elektrikar lahko brez dovoljenja dela v Avstriji.", "prost pretok oseb"], ["Slovensko podjetje proda izdelke v Italijo brez carine.", "prost pretok blaga"], ["Slovenski arhitekt ponuja projektiranje stranki na Hrvaškem.", "prost pretok storitev"], ["Državljan Slovenije kupi delnice nemškega podjetja.", "prost pretok kapitala"], ["Študentka iz Ljubljane se zaposli v Parizu.", "prost pretok oseb"], ["Avstrijska banka odobri posojilo slovenskemu podjetju.", "prost pretok kapitala"]];
const LET = [["Slovenija vstopi v EU", "2004"], ["Slovenija uvede evro", "2007"], ["Slovenija vstopi v schengensko območje", "2007"], ["evro kot gotovina v 12 državah", "2002"], ["podpis Maastrichtske pogodbe", "1992"], ["Rimski pogodbi (EGS)", "1957"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("svobodscina", 6, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Katero od štirih svoboščin skupnega trga ponazarja primer: ${SV[i][0]}`, pravilna: SV[i][1], napacne: ["prost pretok blaga", "prost pretok storitev", "prost pretok oseb", "prost pretok kapitala"].filter((x) => x !== SV[i][1]), postopek: `<p>${SV[i][1]}.</p>` }));
  serija("letnica", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `V katerem letu: ${LET[i][0]}?`, pravilna: LET[i][1], napacne: r.premesaj(["1957", "1992", "2002", "2004", "2007", "2013", "1993"].filter((x) => x !== LET[i][1])).slice(0, 3), postopek: `<p>${LET[i][0]}: ${LET[i][1]}.</p>` }));
  pojmi([
    ["skupni trg", "Območje brez notranjih ovir za blago, storitve, osebe in kapital."],
    ["carinska unija", "Območje brez notranjih carin s skupno carinsko tarifo do tretjih držav."],
    ["ekonomska in monetarna unija", "Usklajevanje ekonomskih politik ter skupna valuta in centralna banka."],
    ["evrsko območje", "Države EU, ki uporabljajo evro."],
    ["maastrichtska merila", "Konvergenčni pogoji za uvedbo evra: inflacija, primanjkljaj, dolg, obresti, tečaj."],
    ["kohezijska politika", "Politika EU za zmanjševanje razlik v razvitosti regij."],
    ["skupna kmetijska politika", "Politika EU, ki podpira kmetijstvo in podeželje."],
    ["strukturni skladi", "Skladi EU za financiranje razvojnih projektov v manj razvitih regijah."],
    ["neto plačnica", "Država, ki v proračun EU vplača več, kot iz njega prejme."],
    ["Evropska komisija", "Izvršilni organ EU, ki predlaga zakonodajo in skrbi za izvajanje pogodb."],
  ]);
  vprasanja([
    [3, "Katere so prednosti skupne valute za Slovenijo?", "ni stroškov menjave in tečajnega tveganja v evrskem območju, cene so primerljive", ["lastna denarna politika", "možnost devalvacije", "višje carine"], "Evro olajša trgovino in potovanja."],
    [4, "Katera je glavna slabost skupne valute za posamezno državo?", "izgubi samostojno denarno politiko in možnost devalvacije", ["mora uvesti carine", "ne sme izvažati", "mora imeti enake plače kot Nemčija"], "Ob asimetričnih šokih ostane le fiskalna politika.", "visja"],
    [4, "Kdo določa ključne obrestne mere za Slovenijo?", "Svet ECB", ["Banka Slovenije samostojno", "Vlada RS", "Evropski parlament"], "Guverner Banke Slovenije je član Sveta ECB.", "visja"],
  ]);
}
