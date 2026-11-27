// Naloge za temo Književna dela za esej (stran public/views/anglescina/snov/knjizevna_dela/).
// [težavnost, vprašanje, pravilni odgovor, [napačni …], razlaga, "visja"]
const V = "visja";
const Q = [
  // An Ideal Husband
  [1, "Kdo je napisal <em>An Ideal Husband</em>?", "Oscar Wilde", ["George Orwell", "William Golding", "Nick Hornby"], "Oscar Wilde, družbena komedija iz leta 1895."],
  [2, "S čim Mrs Cheveley izsiljuje Sira Roberta Chilterna?", "s pismom, ki dokazuje, da je prodal državno skrivnost", ["z ljubezenskim pismom njegove žene", "z dolgom pri kartah", "z lažnim testamentom"], "Kot mlad tajnik je baronu Arnheimu prodal skrivnost o Sueškem prekopu."],
  [2, "Kaj Mrs Cheveley zahteva od Roberta?", "da v parlamentu podpre goljufivi argentinski prekop", ["da se loči od Gertrude", "da ji plača veliko vsoto", "da odstopi iz vlade"], "Argentinska shema je goljufija, v katero je vložila denar."],
  [3, "S katerim predmetom Lord Goring premaga Mrs Cheveley?", "z zapestnico (broško), ki jo je pred leti ukradla", ["z Robertovim pismom", "z rožo v gumbnici", "s Gertrudinim pismom"], "Zapestnica dokazuje krajo, zato mu mora vrniti pismo."],
  [3, "Zakaj je Gertrudino pismo Goringu nevarno?", "ker nima naslovnika in je videti kot ljubezensko pismo", ["ker razkrije Robertovo skrivnost", "ker je v njem ukaz za odstop", "ker je napisano v tujem jeziku"], "»I want you. I trust you. I am coming to you.« Robert ga na koncu razume kot pismo sebi."],
  [3, "Kaj se Gertrude nauči ob koncu igre?", "da ljubezen pomeni odpustiti nepopolnemu človeku", ["da mora moža zapustiti", "da je politika pomembnejša od zakona", "da Goring laže"], "Goring jo prepriča, da ljubezen potrebujejo nepopolni."],
  [4, "Zakaj je naslov <em>An Ideal Husband</em> ironičen?", "ker idealnega moža ni, Robert je nepopoln človek", ["ker je Goring slab mož", "ker se nihče ne poroči", "ker je Robert brezhiben"], "Igra pokaže, da je ideal neresničen in da je treba ljubiti resničnega človeka."],
  [4, "Katera oseba je moralno središče igre, čeprav deluje lahkomiselno?", "Lord Goring", ["Lord Caversham", "Mrs Cheveley", "Sir Robert Chiltern"], "Dandy, ki reši Roberta in Gertrude nauči odpuščanja."],
  // Animal Farm
  [1, "Kdo je napisal <em>Animal Farm</em>?", "George Orwell", ["Oscar Wilde", "Kazuo Ishiguro", "Claire Keegan"], "George Orwell, 1945."],
  [2, "Kdo v <em>Animal Farm</em> pove sanje o svetu brez ljudi?", "Old Major", ["Napoleon", "Benjamin", "Moses"], "Old Major zbere živali, nauči jih »Beasts of England« in kmalu umre."],
  [2, "Kateri prašič je propagandist, ki spreminja resnico z besedami?", "Squealer", ["Snowball", "Old Major", "Boxer"], "Squealer upraviči privilegije in prepisuje zgodovino."],
  [2, "Kako Napoleon prežene Snowballa?", "z vzgojenimi psi", ["z volitvami", "z lažnim pismom", "z zastrupitvijo"], "Pse je skrivaj vzgojil kot lastno silo."],
  [2, "Kateri sta Boxerjevi gesli?", "»I will work harder« in »Napoleon is always right«", ["»Four legs good, two legs bad« in »Beasts of England«", "»All animals are equal« in »No animal shall kill«", "»Long live Snowball« in »Down with Jones«"], "Gesli kažeta zvestobo brez razmisleka."],
  [3, "Kaj se zgodi z Boxerjem, ko omaga?", "prašiči ga prodajo konjedercu", ["pošljejo ga v pokoj na travnik", "pobegne s kmetije", "postane vodja"], "Squealer laže, da je umrl v bolnišnici."],
  [3, "Kako se glasi zadnja zapoved na skednju?", "All animals are equal, but some animals are more equal than others.", ["Four legs good, two legs bad.", "No animal shall sleep in a bed.", "Whatever goes upon two legs is an enemy."], "Ena zapoved nadomesti vseh sedem in pokaže konec ideala."],
  [3, "Kako se spremeni zapoved o spanju v posteljah?", "doda se »with sheets«", ["izbriše se", "doda se »on Sundays«", "doda se »except pigs«"], "Prašiči spijo v postelji, zapoved pa skrivaj dopolnijo."],
  [3, "Kaj simbolizira mlin na veter?", "obljubo boljšega jutri, ki zahteva žrtve živali in koristi prašičem", ["svobodo živali", "Jonesovo vrnitev", "vero v Sugarcandy Mountain"], "Živali ga večkrat gradijo, korist imajo le vodje."],
  [4, "Kaj pokaže zadnji prizor <em>Animal Farm</em>?", "da živali ne ločijo več prašičev od ljudi", ["da prašiči izgubijo oblast", "da se Snowball vrne", "da Jones znova prevzame kmetijo"], "Oblast je prašiče spremenila v to, proti čemur so se borili."],
  [4, "Zakaj prašiči lahko prepisujejo zapovedi, ne da bi to živali opazile?", "ker večina živali ne zna brati ali si ne zaupa spomina", ["ker so zapovedi skrite", "ker so živali zadovoljne", "ker jih je napisal Jones"], "Nevednost in pasivnost omogočata manipulacijo z jezikom."],
  // Lord of the Flies
  [1, "Kdo je napisal <em>Lord of the Flies</em>?", "William Golding", ["George Orwell", "Nick Hornby", "Kazuo Ishiguro"], "William Golding, 1954."],
  [2, "Kaj v <em>Lord of the Flies</em> simbolizira školjka (conch)?", "red, demokracijo in pravico do besede", ["lov in moč", "strah pred zverjo", "povezavo z odraslimi"], "Kdor drži školjko, sme govoriti."],
  [2, "Čemu služijo Piggyjeva očala?", "z njimi zakurijo ogenj", ["z njimi vidijo ladjo", "z njimi lovijo ribe", "z njimi berejo zemljevid"], "Očala so razum in tehnologija; ko jih ukradejo, ogenj preide k Jacku."],
  [2, "Kdo je bil pred nesrečo vodja zbora in postane vodja lovcev?", "Jack", ["Ralph", "Simon", "Roger"], "Jack Merridew."],
  [3, "Kaj Simon spozna ob prašičji glavi na palici?", "da je zver v dečkih samih", ["da zver živi na hribu", "da ladja ne bo prišla", "da je Piggy izdajalec"], "Lord of the Flies je strah in zlo v človeku."],
  [3, "Kaj je »zver« na hribu v resnici?", "mrtev padalec", ["divji prašič", "Simon", "senca skale"], "Simon to odkrije, a ga ubijejo, preden lahko pove."],
  [3, "Kdo ubije Piggyja?", "Roger, ki spusti skalo", ["Jack s sulico", "Ralph po nesreči", "častnik"], "Skala razbije tudi školjko."],
  [3, "Zakaj Jack zanemari signalni ogenj?", "ker gre z lovci na lov, prav ko mimo pelje ladja", ["ker ga ugasne dež", "ker mu Ralph to ukaže", "ker ni drv"], "Lov in užitek so mu pomembnejši od rešitve."],
  [4, "Kako Jack uporabi strah pred zverjo?", "obljublja zaščito in z njim upraviči svojo oblast", ["ga zanika in pomiri littlune", "ga prepusti Ralphu", "ga odpravi s pravili"], "Strah mu prinese podporo dečkov in upraviči nasilje."],
  [4, "Zakaj je rešitev z mornariškim častnikom ironična?", "ker dečke reši odrasli sredi vojne, torej enakega nasilja", ["ker častnik ne pride", "ker reši le Jacka", "ker je častnik otrok"], "Svet odraslih ni boljši od otoka."],
  [4, "Kaj pomeni otok kot prostor dogajanja?", "raj brez pravil, ki postane pekel in razkrije človeško naravo", ["varno zatočišče do konca", "simbol šole", "prostor brez nevarnosti"], "Brez odraslih in kazni se pokaže, kakšni so ljudje."],
  // Never Let Me Go
  [1, "Kdo je napisal <em>Never Let Me Go</em>?", "Kazuo Ishiguro", ["Claire Keegan", "William Golding", "Oscar Wilde"], "Kazuo Ishiguro, 2005."],
  [2, "Kdo pripoveduje <em>Never Let Me Go</em>?", "Kathy H.", ["Ruth", "Tommy", "Miss Emily"], "Kathy, 31-letna negovalka (carer), se spominja Hailshama."],
  [2, "Kaj so učenci Hailshama?", "kloni, vzgojeni za darovanje organov", ["sirote iz vojne", "otroci bogatih staršev", "bodoči učitelji"], "Resnico izvejo postopoma, »told and not told«."],
  [2, "Kdo učencem odkrito pove resnico o njihovi prihodnosti?", "Miss Lucy", ["Madame", "Miss Emily", "Ruth"], "Zaradi tega mora oditi iz Hailshama."],
  [3, "Kaj pomeni »deferral« v romanu?", "govorico o odlogu darovanj za zaljubljen par", ["prvo darovanje", "pobeg iz Cottages", "poklic negovalca"], "Madame in Miss Emily povesta, da odloga nikoli ni bilo."],
  [3, "Čemu je služila Madamina Galerija?", "dokazati, da imajo kloni dušo", ["prodaji slik za denar", "kaznovanju slabih učencev", "izbiri negovalcev"], "Umetnost naj bi pokazala notranje življenje učencev."],
  [3, "Kaj Ruth naredi, preden konča?", "se opraviči Kathy in Tommyju in jima da Madamin naslov", ["pobegne v Norfolk", "razkrije, da ni klon", "odpove darovanje"], "Prijateljstvo kot odpuščanje."],
  [3, "Zakaj je Norfolk pomemben?", "»lost corner«, kraj, kjer se najde izgubljeno (kaseta)", ["tam je Hailsham", "tam živi Madame", "tam se začnejo darovanja"], "Kathy in Tommy tam najdeta izgubljeno kaseto."],
  [4, "Kaj je najbolj srhljivo pri temi sprejemanja v romanu?", "da nihče ne poskuša pobegniti in usodo sprejmejo kot dolžnost", ["da učenci pobegnejo", "da guardians pomagajo pri begu", "da se Kathy upre z nasiljem"], "Vzgoja jih je naučila poslušnosti."],
  [4, "Zakaj je spomin osrednja tema romana?", "ker je pripoved sestavljena iz Kathynih spominov, s katerimi ohranja izgubljene", ["ker Kathy izgubi spomin", "ker so kloni brez spomina", "ker je roman dnevnik"], "Spomin je edino, česar ji ne morejo vzeti."],
  // About a Boy
  [1, "Kdo je napisal <em>About a Boy</em>?", "Nick Hornby", ["Kazuo Ishiguro", "Claire Keegan", "George Orwell"], "Nick Hornby, 1998."],
  [2, "Od česa živi Will Freeman?", "od avtorskih pravic za očetovo božično pesem", ["od dela v banki", "od dediščine po materi", "od pisanja romanov"], "»Santa's Super Sleigh«."],
  [2, "Zakaj se Will pridruži skupini SPAT?", "da bi spoznal ženske, zato si izmisli sina", ["ker ima sina Neda", "ker ga pošlje Marcus", "ker išče službo"], "Izmišljeni sin Ned je laž za zabavo."],
  [2, "Kaj se zgodi na »Dead Duck Day«?", "Marcus ubije raco s hlebcem kruha, Fiona poskusi samomor", ["Will izgubi službo", "Ellie razbije izložbo", "Marcusov oče pride v London"], "Isti dan za Marcusa pomeni obe nesreči."],
  [3, "Kaj pomeni misel »No man is an island« v romanu?", "Will misli, da je otok, a spozna, da potrebuje ljudi", ["Will živi na otoku", "Marcus se preseli na otok", "ljudje so vedno sami"], "Misel Johna Donna: na koncu imata oba mrežo ljudi."],
  [3, "Kako se Will spremeni do konca romana?", "sprejme odgovornost za druge in se odpre čustvom", ["postane še bolj samotarski", "se poroči s Fiono", "zapusti London za vedno"], "Od otoka do človeka, ki skrbi."],
  [3, "Kaj Marcusu pomeni Ellie?", "odpre mu svet vrstnikov in ga nauči biti manj čuden", ["je njegova sestra", "ga ustrahuje", "je njegova učiteljica"], "Starejša sošolka, oboževalka Kurta Cobaina."],
  [4, "Kako je osamljenost prikazana pri Willu in Marcusu?", "Will jo je izbral, Marcus jo trpi", ["oba sta srečna sama", "samo Fiona je osamljena", "osamljenosti v romanu ni"], "Oba sta osamljena na drugačen način in ju reši povezava."],
  // Foster
  [1, "Kdo je napisal <em>Foster</em>?", "Claire Keegan", ["Nick Hornby", "Oscar Wilde", "Kazuo Ishiguro"], "Claire Keegan, 2010."],
  [2, "Kam oče odpelje deklico v <em>Foster</em>?", "k sorodnikom Kinsellovim za poletje", ["v internat", "k babici v mesto", "v rejniško družino v Dublin"], "Mama pričakuje še enega otroka."],
  [3, "Kaj deklica izve na bedenju?", "da so Kinsellovi izgubili sina in da nosi njegova oblačila", ["da je posvojena", "da se oče ne bo vrnil", "da Kinsellovi odhajajo v Ameriko"], "Skrivnost ji pove soseda Mildred."],
  [3, "Kako se pri Johnu Kinselli kaže molk?", "kot modrost in nežnost, ne kot hlad", ["kot jeza", "kot zanemarjanje", "kot strah pred deklico"], "Nasprotje molka deklicinega očeta."],
  [4, "Kako je v <em>Foster</em> prikazan dom?", "pripadnost nastane iz skrbi, ne iz krvi", ["pravi dom je vedno dom staršev", "dom je le kraj, ne odnos", "dekle se doma počuti najbolje"], "Kinsellovi ji v poletju dajo, česar doma nima."],
  [4, "Kaj je skupno <em>About a Boy</em> in <em>Foster</em> pri temi doma in pripadnosti?", "mlada oseba najde pripadnost pri ljudeh, ki se odločijo zanjo skrbeti", ["oba se končata na otoku", "v obeh je glavni junak sirota", "v obeh se starši ločijo"], "Razlika: Hornby s humorjem in srečnim koncem, Keegan s tišino in odprtim koncem."],
  // pisanje
  [2, "Kateri čas uporabljaš, ko pišeš o dogajanju v delu?", "present simple", ["past simple", "past perfect", "future simple"], "<em>Jack paints his face.</em>"],
  [3, "Kako zgradiš jedro primerjalnega eseja o dveh delih?", "vsak odstavek primerja obe deli po enem vidiku", ["najprej celoten esej o prvem, nato o drugem delu", "samo o delu, ki ga bolje poznaš", "obnova obeh zgodb"], "Povezuj z <em>both, whereas, unlike, similarly</em>."],
];

export default function ({ vprasanja }) {
  vprasanja(Q.map((q) => [...q, V]));
}
