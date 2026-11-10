import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("vrsta", 14, (r) => {
    const [d, odg] = r.izberi([["Kdor drugemu jamo koplje, sam vanjo pade.", "pregovor"], ["Zjutraj hodi po štirih, opoldne po dveh, zvečer po treh. Kaj je to?", "uganka"], ["Živela je kraljična, ki jo je zlobna mačeha uročila ...", "pravljica"], ["Lisica in grozdje: lisica grozdja ne doseže in reče, da je kislo.", "basen"], ["Kralj Matjaž spi s svojo vojsko pod goro Peco.", "pripovedka (bajka)"], ["Lepa Vida odide z zamorcem čez morje in toži po domu.", "balada (romanca)"], ["Pegam in Lambergar se spopadeta pred cesarjem.", "junaška pesem"], ["Jaz sem mali muzikant, igram na ...", "otroška (rajalna) pesem"], ["Rana ura, zlata ura.", "pregovor"], ["Kaj ima zobe, pa ne grize? (glavnik)", "uganka"], ["Pripoved o povodnem možu, ki odpelje dekle v vodo.", "pripovedka (bajka)"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Katera ljudska vrsta je: »${d}«`, pravilna: odg, napacne: r.premesaj(["pregovor", "uganka", "pravljica", "basen", "pripovedka (bajka)", "balada (romanca)", "junaška pesem", "otroška (rajalna) pesem"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("znacilnost", 10, (r) => {
    const [d, odg] = r.izberi([["avtor ni znan", "anonimnost"], ["se je prenašalo iz roda v rod ustno", "ustnost"], ["obstaja v več različicah", "variantnost"], ["ponavljajo se stalni pridevki in števila (tri, sedem)", "stalne prvine (ponavljanje)"], ["dobro na koncu zmaga", "zmaga dobrega nad zlim"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Katero značilnost ljudskega slovstva opisuje: ${d}?`, pravilna: odg, napacne: ["anonimnost", "ustnost", "variantnost", "stalne prvine (ponavljanje)", "zmaga dobrega nad zlim"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("zbiralec", 8, (r) => {
    const [o, d] = r.izberi([["Karel Štrekelj", "je izdal zbirko Slovenske narodne pesmi"], ["brata Grimm", "sta zbrala nemške pravljice"], ["Emil Korytko", "je zbiral slovenske ljudske pesmi v 1830-ih letih"], ["Stanko Vraz", "je zbiral ljudske pesmi na Štajerskem"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kdo ${d}?`, pravilna: o, napacne: ["Karel Štrekelj", "brata Grimm", "Emil Korytko", "Stanko Vraz"].filter((x) => x !== o), postopek: `<p>${o} ${d}.</p>` });
  });
  pojmi([
    ["ljudsko slovstvo", "Besedila, ki jih je ustvarilo ljudstvo in so se prenašala ustno."],
    ["slovstvena folklora", "Strokovni izraz za ljudsko slovstvo."],
    ["balada", "Pripovedna pesem z žalostnim, pogosto tragičnim koncem."],
    ["romanca", "Pripovedna pesem z vedrejšim koncem."],
    ["pravljica", "Pripoved z nadnaravnimi bitji in srečnim koncem."],
    ["pripovedka", "Ljudska pripoved, povezana s krajem ali zgodovino."],
    ["basen", "Kratka zgodba z živalmi in naukom."],
    ["pregovor", "Kratek ustaljen izrek z življenjsko modrostjo."],
    ["uganka", "Besedilo, ki opiše stvar posredno in zahteva rešitev."],
    ["variantnost", "Obstoj več različic istega ljudskega besedila."],
    ["anonimnost", "Neznano avtorstvo."],
    ["ustno izročilo", "Prenašanje besedil iz roda v rod z govorjenjem."],
  ]);
  vprasanja([
    [2, "Zakaj Lepa Vida zapusti dom?", "zamorec jo zvabi z obljubo zdravila za bolnega otroka", ["ker jo je izgnal mož", "zaradi vojne", "ker je postala kraljica"], "Motiv hrepenenja po boljšem življenju."],
    [3, "Kaj simbolizira kralj Matjaž v ljudskem izročilu?", "upanje na pravičnega vladarja in rešitelja", ["krutega osvajalca", "turškega sultana", "vodo"], "Spi pod goro in se bo prebudil, ko bo najhuje."],
    [4, "Zakaj ima ljudska pesem več različic?", "ker se je prenašala ustno in se prilagajala pevcem in krajem", ["ker jo je pisalo več avtorjev hkrati", "ker so jo prevajali", "ker je bila cenzurirana"], "Variantnost je posledica ustnosti.", "visja"],
    [4, "Kateri motiv povezuje Lepo Vido z mnogimi deli slovenske književnosti?", "hrepenenje po nedosegljivem", ["vojna slava", "bogastvo", "maščevanje"], "Motiv Lepe Vide so obravnavali Prešeren, Cankar, Rudolf in drugi.", "visja"],
  ]);
}
