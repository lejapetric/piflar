export default function ({ pojmi, vprasanja }) {
  pojmi([
    ["psihologija", "Znanost o doživljanju in vedenju ljudi ter o duševnih procesih."],
    ["duševni procesi", "Notranje dejavnosti, kot so zaznavanje, mišljenje, pomnjenje in čustvovanje."],
    ["vedenje", "Navzven opazno delovanje organizma, ki ga lahko neposredno opazujemo."],
    ["psihoanaliza", "Smer, ki poudarja vpliv nezavednih vsebin in zgodnjih izkušenj na osebnost; utemeljil jo je S. Freud."],
    ["behaviorizem", "Smer, ki proučuje le opazno vedenje in ga razlaga z učenjem na podlagi dražljajev in odzivov."],
    ["humanistična psihologija", "Smer, ki poudarja svobodno voljo, osebno rast in samouresničevanje človeka."],
    ["kognitivna psihologija", "Smer, ki proučuje, kako človek sprejema, predeluje in shranjuje informacije."],
    ["strukturalizem", "Prva smer psihologije, ki je z introspekcijo razčlenjevala zavest na osnovne prvine."],
    ["Wilhelm Wundt", "Utemeljitelj znanstvene psihologije, ki je leta 1879 v Leipzigu odprl prvi psihološki laboratorij.", { vpis: ["Wundt"] }],
    ["klinična psihologija", "Panoga, ki se ukvarja z diagnosticiranjem in zdravljenjem duševnih motenj."],
    ["razvojna psihologija", "Panoga, ki proučuje spremembe doživljanja in vedenja skozi življenje."],
    ["šolska psihologija", "Panoga, ki pomaga pri učenju, vzgoji in poklicnem usmerjanju v šoli."],
    ["socialna psihologija", "Panoga, ki proučuje vpliv drugih ljudi na posameznikovo doživljanje in vedenje."],
    ["psihiatrija", "Medicinska veda o duševnih motnjah, ki pri zdravljenju lahko predpisuje zdravila."],
  ]);
  vprasanja([
    [2, "Kateri so štirje cilji psihologije kot znanosti?", "opisati, pojasniti, napovedati in uravnavati vedenje", ["opazovati, meriti, šteti in zapisati", "zdraviti, predpisovati, operirati in svetovati", "verjeti, domnevati, zavrniti in pozabiti"], "Psihologija vedenje opisuje, pojasnjuje, napoveduje in nanj vpliva."],
    [3, "Katera smer bi pojasnila strah pred psi s tem, da je otroka nekoč ugriznil pes in se je strahu naučil?", "behaviorizem", ["psihoanaliza", "humanistična psihologija", "strukturalizem"], "Behaviorizem razlaga vedenje z učenjem (pogojevanjem)."],
    [3, "Katera smer bi isti strah pojasnila z nezavednim konfliktom iz zgodnjega otroštva?", "psihoanaliza", ["behaviorizem", "kognitivna psihologija", "humanistična psihologija"], "Psihoanaliza išče vzroke v nezavednem."],
    [4, "Zakaj so behavioristi zavrnili introspekcijo kot znanstveno metodo?", "ker je subjektivna in je drugi raziskovalci ne morejo preveriti", ["ker je predraga", "ker je prepovedana", "ker zahteva laboratorij"], "Znanstveni podatki morajo biti javno preverljivi; doživljanje opazuje le posameznik sam.", "visja"],
    [4, "Kateri pristop k psihologiji danes povezuje biološke, psihološke in družbene dejavnike?", "biopsihosocialni pristop", ["strukturalizem", "introspekcionizem", "frenologija"], "Sodobna psihologija vedenje pojasnjuje z več ravni hkrati.", "visja"],
    [2, "V katerem letu je Wundt ustanovil prvi psihološki laboratorij?", { vpis: ["1879"] }, [], "Leta 1879 v Leipzigu, kar štejemo za začetek znanstvene psihologije."],
  ]);
}
