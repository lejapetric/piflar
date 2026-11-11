import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Integrali", "Srečko Kosovel", "pesniška zbirka"], ["Ekstaza smrti", "Srečko Kosovel", "pesem"], ["Kons 5", "Srečko Kosovel", "pesem"], ["Eros – Tanatos", "Alojz Gradnik", "pesniška zbirka"], ["Kaplan Martin Čedermac", "France Bevk", "roman"], ["Samorastniki", "Prežihov Voranc", "zbirka novel"], ["Jamnica", "Prežihov Voranc", "roman"], ["Doberdob", "Prežihov Voranc", "roman"], ["Zemlja", "Edvard Kocbek", "pesniška zbirka"], ["Alamut", "Vladimir Bartol", "roman"], ["Dogodek v mestu Gogi", "Slavko Grum", "drama"], ["Povest o dobrih ljudeh", "Miško Kranjec", "roman"]],
    osebe: [["Srečko Kosovel", "je pesnik Krasa in konstruktivizma, umrl pri 22 letih"], ["Prežihov Voranc", "je psevdonim Lovra Kuharja"], ["France Bevk", "je pisal o Primorcih pod italijansko oblastjo"], ["Vladimir Bartol", "je napisal roman o asasinih in Hasanu ibn Sabahu"], ["Edvard Kocbek", "je bil krščanski socialist in pesnik"], ["Miško Kranjec", "je pisatelj Prekmurja"]],
  });
  pojmi([
    ["ekspresionizem", "Smer, ki silovito izraža notranje stiske in vizije."],
    ["konstruktivizem", "Avantgardna smer s kolažnimi, geometrijskimi pesmimi (Kosovel)."],
    ["socialni realizem", "Smer, ki prikazuje socialne razmere in boj zatiranih."],
    ["kons", "Kosovelova oznaka za konstruktivistično pesem."],
    ["Kras", "Pokrajina, ki je osrednji motiv Kosovelove poezije."],
    ["samorastnik", "Človek, ki raste brez opore in se kljub vsemu uveljavi."],
    ["fašizem na Primorskem", "Raznarodovalna politika Italije do Slovencev med vojnama."],
    ["vojni roman", "Roman o izkušnji vojne (npr. Doberdob)."],
    ["nadrealistična drama", "Drama z elementi sanj in podzavesti (Grum)."],
    ["partizanska poezija", "Poezija, nastala v narodnoosvobodilnem boju."],
    ["Dom in svet", "Katoliška literarna revija."],
  ]);
  vprasanja([
    [2, "Zakaj kaplan Čedermac pridiga v slovenščini?", "ker italijanska oblast prepove slovenščino v cerkvi, on pa brani pravico ljudi do materinščine", ["ker ne zna italijansko", "ker je tako ukazal škof", "ker je to zahtevala vojska"], "Beneška Slovenija pod fašizmom."],
    [3, "Kaj je glavni motiv Kosovelovih pesmi o Krasu?", "ljubezen do domače pokrajine in slutnja smrti", ["morje in ladje", "planine", "mestno življenje"], "Kras kot simbol doma."],
    [4, "Kako je zgrajena Kosovelova pesem Kons 5?", "iz razbitih, kolažnih verzov, številk in napisov", ["kot klasičen sonet", "kot ljudska pesem s kiticami", "kot dramski dialog"], "Konstruktivistična tehnika.", "visja"],
    [4, "Kakšen je nauk Alamuta?", "»Nič ni resnično, vse je dovoljeno« – manipulacija s človekovo vero", ["zmaga ljubezni", "kritika kmečkega življenja", "slavljenje vojne"], "Hasan ustvari umetni raj, da obvlada fedaije.", "visja"],
  ]);
}
