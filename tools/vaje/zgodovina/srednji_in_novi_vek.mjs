import { zgodovinskeSerije } from "../zgodovina-lib.mjs";
import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  zgodovinskeSerije(serija, {
    dogodki: [
      ["je bil Karel Veliki okronan za cesarja", 800], ["je prišlo do razkola med vzhodno in zahodno cerkvijo", 1054], ["je bila bitka pri Hastingsu", 1066], ["se je začela prva križarska vojna", 1096],
      ["je bila izdana Magna Carta", 1215], ["je Evropo prizadela epidemija kuge (črna smrt)", 1348], ["so Osmani osvojili Konstantinopel", 1453], ["je Kolumb prispel v Ameriko", 1492],
      ["je Luther objavil 95 tez", 1517], ["je bil vseslovenski kmečki upor", 1515], ["sta izšli prvi slovenski knjigi (Trubar)", 1550], ["je izšel Dalmatinov prevod Biblije", 1584],
      ["je bil hrvaško-slovenski kmečki upor", 1573], ["je bila bitka pri Sisku", 1593], ["je bil sklenjen vestfalski mir", 1648], ["je Marija Terezija uvedla splošno šolsko obveznost", 1774],
      ["so ZDA razglasile neodvisnost", 1776], ["se je začela francoska revolucija", 1789], ["je Jožef II. izdal tolerančni patent", 1781], ["je bila ustanovljena Akademija operozov v Ljubljani", 1693],
    ],
    osebe: [["Karel Veliki", "je bil frankovski vladar, okronan za cesarja leta 800"], ["Primož Trubar", "je avtor prvih slovenskih knjig"], ["Jurij Dalmatin", "je prevedel Biblijo v slovenščino"], ["Adam Bohorič", "je napisal prvo slovnico slovenskega jezika"], ["Martin Luther", "je sprožil reformacijo"], ["Krištof Kolumb", "je leta 1492 priplul do Amerike"], ["Janez Vajkard Valvasor", "je napisal Slavo vojvodine Kranjske"], ["Marija Terezija", "je uvedla splošno šolsko obveznost"], ["Jožef II.", "je odpravil osebno odvisnost kmetov in izdal tolerančni patent"], ["Johannes Gutenberg", "je izumil tisk s premičnimi črkami"], ["Matija Gubec", "je vodil hrvaško-slovenski kmečki upor"], ["Ferdinand Magellan", "je vodil prvo plovbo okoli sveta"], ["Napoleon Bonaparte", "je ustanovil Ilirske province"]],
  });
  serija("karantanija", 6, (r) => {
    const [d, odg] = r.izberi([["knežji kamen in ustoličevanje karantanskih knezov", "Karantanija"], ["najstarejši ohranjeni zapis v slovenskem jeziku", "Brižinski spomini"], ["Samo, ki je združil Slovane proti Obrom", "Samova plemenska zveza"], ["vključitev Karantanije v frankovsko državo", "pokristjanjevanje in fevdalizacija"]]);
    return izbira({ r, tezavnost: 2, besedilo: `S čim povezujemo: ${d}?`, pravilna: odg, napacne: ["Karantanija", "Brižinski spomini", "Samova plemenska zveza", "pokristjanjevanje in fevdalizacija"].filter((x) => x !== odg), postopek: `<p>${odg}.</p>` });
  });
  serija("slog", 6, (r) => {
    const [d, odg] = r.izberi([["polkrožni loki, debeli zidovi, majhna okna", "romanika"], ["šilasti loki, rebrasti oboki, visoka okna z vitraži", "gotika"], ["simetrija, antični vzori, kupole", "renesansa"], ["razkošje, gibanje, iluzionistične poslikave", "barok"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Za kateri umetnostni slog so značilni: ${d}?`, pravilna: odg, napacne: ["romanika", "gotika", "renesansa", "barok"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["fevdalizem", "Družbeni red, v katerem fevdalec podeli zemljo v zameno za zvestobo in službo."],
    ["fevd", "Zemljišče, ki ga vazal dobi od fevdalnega gospoda."],
    ["tlaka", "Obvezno brezplačno delo podložnika za zemljiškega gospoda."],
    ["desetina", "Davek cerkvi v višini desetine pridelka."],
    ["križarske vojne", "Vojaški pohodi zahodnih kristjanov v Sveto deželo."],
    ["humanizem", "Gibanje, ki je v središče postavilo človeka in obujalo antično izobrazbo."],
    ["reformacija", "Versko gibanje 16. stoletja, ki je privedlo do protestantskih cerkva."],
    ["protireformacija", "Prizadevanje katoliške cerkve za obnovo in zatrtje protestantizma."],
    ["absolutizem", "Oblika vladavine, v kateri ima vladar neomejeno oblast."],
    ["razsvetljenstvo", "Gibanje 18. stoletja, ki je poudarjalo razum, znanost in svobodo."],
    ["merkantilizem", "Gospodarska politika, ki spodbuja izvoz in kopičenje plemenitih kovin."],
    ["turški vpadi", "Plenilski pohodi osmanske vojske na slovensko ozemlje v 15. in 16. stoletju."],
    ["kolonializem", "Osvajanje in izkoriščanje ozemelj zunaj Evrope."],
  ]);
  vprasanja([
    [3, "Zakaj je za Slovence pomembna reformacija?", "ker so izšle prve slovenske knjige in je bil oblikovan knjižni jezik", ["ker so Slovenci postali samostojni", "ker so odpravili tlako", "ker so dobili univerzo"], "Trubar, Dalmatin in Bohorič so postavili temelje knjižne slovenščine."],
    [4, "Kateri so bili glavni vzroki kmečkih uporov v 15. in 16. stoletju?", "povečane dajatve, turški vpadi in kršitve stare pravde", ["uvedba šolske obveznosti", "francoska revolucija", "industrializacija"], "Kmetje so zahtevali »staro pravdo«.", "visja"],
    [4, "Kaj je bil pomen vestfalskega miru?", "končal je tridesetletno vojno in uveljavil načelo suverenosti držav", ["ustanovil je Sveto rimsko cesarstvo", "končal je stoletno vojno", "združil je Nemčijo"], "Velja za začetek sodobnega sistema držav.", "visja"],
    [4, "Zakaj so bila geografska odkritja povezana z razvojem trgovine?", "Evropejci so iskali novo pot do Indije po osmanski zapori kopenskih poti", ["zaradi kuge", "zaradi križarskih vojn", "zaradi industrijske revolucije"], "Iskali so začimbe, zlato in nova tržišča.", "visja"],
  ]);
}
