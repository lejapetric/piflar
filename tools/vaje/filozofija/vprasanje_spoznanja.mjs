import { izbira } from "../lib.mjs";
const AV = [["Spoznanje izvira iz izkustva; um je ob rojstvu nepopisana tabla.", "Locke"], ["Vzročnost je le navada, ki izhaja iz ponavljanja.", "Hume"], ["Pojmi brez nazorov so prazni, nazori brez pojmov slepi.", "Kant"], ["Teorije so znanstvene, če jih je mogoče ovreči (falsificirati).", "Popper"], ["Znanost napreduje z zamenjavo paradigem.", "Kuhn"], ["Vem, da nič ne vem.", "Sokrat"], ["O čemer ne moremo govoriti, o tem moramo molčati.", "Wittgenstein"], ["Vednost je utemeljeno resnično prepričanje, a to ne zadošča (protiprimeri).", "Gettier"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("avtor", 16, (r, i) => {
    const [t, a] = AV[i % 8];
    if (i < 8) return izbira({ r, tezavnost: 2, besedilo: `Kateri filozof je zagovarjal: »${t}«`, pravilna: a, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([, x]) => x)).slice(0, 3), postopek: `<p>${a}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera misel o spoznanju pripada filozofu ${a}?`, pravilna: t, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([x]) => x)).slice(0, 3), postopek: `<p>${a}: ${t}</p>` });
  });
  pojmi([
    ["epistemologija", "Filozofska disciplina o naravi, virih in mejah spoznanja."],
    ["skepticizem", "Stališče, ki dvomi o možnosti gotovega spoznanja."],
    ["empirizem", "Nauk, da je izkustvo glavni vir spoznanja."],
    ["racionalizem", "Nauk, da je razum glavni vir spoznanja."],
    ["vednost", "Upravičeno resnično prepričanje."],
    ["korespondenčna teorija resnice", "Teorija, da je trditev resnična, če se ujema z dejstvi."],
    ["koherenčna teorija resnice", "Teorija, da je trditev resnična, če se sklada s sistemom drugih trditev."],
    ["pragmatična teorija resnice", "Teorija, da je resnično tisto, kar se v praksi obnese."],
    ["fundacionalizem", "Nauk, da spoznanje temelji na osnovnih prepričanjih, ki ne potrebujejo utemeljitve."],
    ["falsifikacija", "Ovržba teorije s primerom, ki ji nasprotuje."],
    ["problem indukcije", "Vprašanje, kako upravičiti sklepanje iz preteklih primerov na prihodnje."],
  ]);
  vprasanja([
    [4, "Kaj je Gettierjev problem?", "nekdo ima upravičeno resnično prepričanje, ki je resnično le po naključju, zato ni vednost", ["vednost ni mogoča", "prepričanja niso nikoli upravičena", "resnica ne obstaja"], "Klasična opredelitev vednosti ne zadošča.", "visja"],
    [4, "Zakaj je po Popperju astrologija psevdoznanost?", "ker so njene napovedi tako ohlapne, da jih ni mogoče ovreči", ["ker je stara", "ker uporablja matematiko", "ker jo ljudje berejo"], "Merilo razmejitve je falsifikabilnost.", "visja"],
    [4, "Kako je Kant združil racionalizem in empirizem?", "spoznanje se začne z izkustvom, a ga oblikujejo apriorne forme uma", ["zavrnil je obe smeri", "izkustvo je vse, razum nič", "razum je vse, izkustvo nič"], "Kopernikanski obrat: predmeti se ravnajo po našem spoznanju.", "visja"],
  ]);
}
