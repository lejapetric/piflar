import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Tantadruj", "Ciril Kosmač", "novela"], ["Pomladni dan", "Ciril Kosmač", "roman"], ["Strah in pogum", "Edvard Kocbek", "zbirka novel"], ["Menuet za kitaro", "Vitomil Zupan", "roman"], ["Triptih Agate Schwarzkobler", "Rudi Šeligo", "roman"], ["Prišleki", "Lojze Kovačič", "roman"], ["Galjot", "Drago Jančar", "roman"], ["Severni sij", "Drago Jančar", "roman"], ["Nekropola", "Boris Pahor", "roman"], ["Ljubezen", "Marjan Rožanc", "roman"], ["Solzice", "Prežihov Voranc", "zbirka črtic"]],
    osebe: [["Ciril Kosmač", "je Tolminec, ki je pisal o domačih ljudeh in vojni"], ["Vitomil Zupan", "je bil zaprt v povojnih procesih in pisal o vojni brez idealizacije"], ["Boris Pahor", "je tržaški pisatelj, preživel nacistična taborišča"], ["Drago Jančar", "je avtor zgodovinskih romanov o posamezniku nasproti sistemu"], ["Lojze Kovačič", "je pisal avtobiografsko prozo o priseljencu v Ljubljani"]],
  });
  pojmi([
    ["socialistični realizem", "Smer po letu 1945, ki je poveličevala partizanstvo in socializem."],
    ["modernizem", "Smer, ki razbija klasično zgradbo pripovedi."],
    ["reizem", "Opisovanje predmetov in dejanj brez psihologije (Šeligo)."],
    ["postmodernizem", "Pripoved, ki se igra z žanri in zgodovino."],
    ["vojni roman", "Roman o izkušnji vojne."],
    ["taboriščna literatura", "Literatura o izkušnji koncentracijskih taborišč."],
    ["avtobiografska proza", "Pripoved, ki izhaja iz avtorjevega življenja."],
    ["novela", "Krajša pripoved z enim osrednjim dogodkom in preobratom."],
    ["tok zavesti", "Tehnika, ki posnema neurejen tok misli."],
    ["Primorska", "Pokrajina, ki je osrednji prostor mnogih del (Kosmač, Pahor)."],
    ["dvojna perspektiva", "Pripoved, ki prepleta sedanjost in preteklost."],
  ]);
  vprasanja([
    [2, "Kaj išče Tantadruj?", "»sveto smrt«, ki bi ga odrešila", ["zaklad", "izgubljenega sina", "delo v mestu"], "Vaški posebnež."],
    [3, "Kakšna je pripovedna perspektiva v Menuetu za kitaro?", "prepleta se vojna preteklost in sedanjost po vojni", ["vsevedni pripovedovalec v srednjem veku", "pripoved v pismih", "dnevnik otroka"], "Berk se spominja partizanske izkušnje."],
    [4, "O čem pripoveduje Nekropola?", "o pisateljevem obisku nekdanjega nacističnega taborišča in spominih", ["o antičnem mestu", "o vojni v Galiciji", "o grofih Celjskih"], "Natzweiler-Struthof.", "visja"],
    [4, "Kaj je značilno za Jančarjev Galjot?", "posameznik v brezizhodnem spopadu z oblastjo in usodo v 17. stoletju", ["humorna kmečka povest", "znanstvena fantastika", "ljubezenski roman v pismih"], "Johannes Ott.", "visja"],
  ]);
}
