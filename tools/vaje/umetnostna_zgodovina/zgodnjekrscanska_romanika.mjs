import { izbira } from "../lib.mjs";
const SP = [["Hagija Sofija", "bizantinska cerkev s kupolo v Carigradu (Istanbulu)"], ["San Vitale v Raveni", "osmerokotna cerkev z mozaiki Justinijana in Teodore"], ["Sant'Apollinare in Classe", "zgodnjekrščanska bazilika pri Raveni z mozaiki"], ["katedrala v Pisi s poševnim stolpom", "romanski kompleks v Toskani"], ["opatija Cluny", "romanski samostan, središče benediktinske reforme"], ["tapiserija iz Bayeuxa", "vezenina s prizori normanskega osvajanja Anglije"], ["Stična", "najstarejši še delujoči samostan na Slovenskem, cistercijanski"], ["katakombe", "podzemna pokopališča zgodnjih kristjanov v Rimu"], ["stara bazilika sv. Petra", "zgodnjekrščanska bazilika, ki jo je dal zgraditi Konstantin"], ["Speyerska stolnica", "velika romanska cesarska stolnica v Nemčiji"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("spomenik", 20, (r, i) => {
    const [d, op] = SP[i % 10];
    if (i < 10) return izbira({ r, tezavnost: 2, besedilo: `Kaj je <em>${d}</em>?`, pravilna: op, napacne: r.premesaj(SP.filter(([x]) => x !== d).map(([, y]) => y)).slice(0, 3), postopek: `<p>${d}: ${op}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kateri spomenik je ${op}?`, pravilna: d, napacne: r.premesaj(SP.filter(([x]) => x !== d).map(([x]) => x)).slice(0, 3), postopek: `<p>${op}: ${d}.</p>` });
  });
  pojmi([
    ["bazilika", "Vzdolžna cerkev z višjo srednjo ladjo in nižjima stranskima ladjama."],
    ["apsida", "Polkrožni zaključek prezbiterija."],
    ["atrij", "Odprto dvorišče s stebriščem pred zgodnjekrščansko baziliko."],
    ["mozaik", "Podoba iz drobnih kamenčkov ali steklenih kock."],
    ["ikona", "Bizantinska podoba svetnika, naslikana na lesu po strogih pravilih."],
    ["centralna stavba", "Stavba s tlorisom okrog središča, npr. krog ali osmerokotnik."],
    ["kripta", "Podzemni prostor pod prezbiterijem, pogosto za relikvije."],
    ["timpanon", "Polkrožna ploskev nad portalom, pogosto z reliefom."],
    ["polkrožni lok", "Značilen lok romanske arhitekture."],
    ["banjasti obok", "Polkrožen obok v obliki prerezanega valja."],
    ["križni obok", "Obok, ki nastane s prekrižanjem dveh banjastih obokov."],
    ["bifora", "Okno, razdeljeno s stebričem na dva dela."],
  ]);
  vprasanja([
    [3, "Po čem prepoznamo romansko cerkev?", "debeli zidovi, majhna okna, polkrožni loki in masivni stebri", ["šilasti loki in veliki vitraži", "kupola na tamburju in fasada z volutami", "jeklena konstrukcija"], "Romanika deluje masivno in trdno."],
    [4, "Zakaj so bila romanska okna majhna?", "ker so debeli zidovi nosili težo kamnitih obokov in velike odprtine bi jih oslabile", ["ker steklo ni bilo znano", "zaradi mraza", "zaradi verske prepovedi"], "Gotika je težo preusmerila na opornike.", "visja"],
    [4, "Katere so značilnosti bizantinskih mozaikov v Raveni?", "zlato ozadje, frontalne, vitke figure brez prostorske globine", ["realistična perspektiva in senčenje", "prizori iz vsakdanjega življenja kmetov", "abstraktni geometrijski vzorci brez figur"], "Zlato ozadje ponazarja nebeško, nadčasovno sfero.", "visja"],
  ]);
}
