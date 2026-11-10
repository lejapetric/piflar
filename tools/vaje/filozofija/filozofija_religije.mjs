import { izbira } from "../lib.mjs";
const DOK = [["Vse v svetu ima vzrok; veriga vzrokov se ne more nadaljevati v neskončnost, zato obstaja prvi vzrok.", "kozmološki dokaz"], ["Bog je bitje, nad katerim ni mogoče misliti večjega; tako bitje mora obstajati tudi v resnici.", "ontološki dokaz"], ["Svet je urejen in smotern kot ura, zato mora imeti umnega oblikovalca.", "teleološki dokaz"], ["Moralni zakon v nas zahteva najvišje dobro, ki ga lahko zagotovi le Bog.", "moralni dokaz"], ["Bolje je verjeti v Boga: če obstaja, veliko pridobimo, če ne, malo izgubimo.", "Pascalova stava"]];
const DN = DOK.map(([, d]) => d);
const AV = [["Religija je projekcija človekovih lastnosti v Boga.", "Feuerbach"], ["Religija je opij ljudstva.", "Marx"], ["Religija je kolektivna nevroza, izpolnitev želje po zaščitniškem očetu.", "Freud"], ["Bog je mrtev.", "Nietzsche"], ["Verujem, da bi razumel.", "Anzelm Canterburyjski"], ["Pet poti za dokaz Božjega obstoja.", "Tomaž Akvinski"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("dokaz", 5, (r, i) => izbira({ r, tezavnost: 3, besedilo: `Kateri dokaz za obstoj Boga je to: »${DOK[i][0]}«`, pravilna: DOK[i][1], napacne: r.premesaj(DN.filter((x) => x !== DOK[i][1])).slice(0, 3), postopek: `<p>${DOK[i][1]}.</p>` }));
  serija("avtor", 12, (r, i) => {
    const [t, a] = AV[i % 6];
    if (i < 6) return izbira({ r, tezavnost: 2, besedilo: `Kdo je avtor misli: »${t}«`, pravilna: a, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([, x]) => x)).slice(0, 3), postopek: `<p>${a}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera misel o religiji pripada avtorju ${a}?`, pravilna: t, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([x]) => x)).slice(0, 3), postopek: `<p>${a}: ${t}</p>` });
  });
  pojmi([
    ["teizem", "Vera v osebnega Boga, ki je ustvaril svet in vanj posega."],
    ["deizem", "Vera, da je Bog ustvaril svet, vanj pa ne posega."],
    ["panteizem", "Nauk, da je Bog istoveten z naravo oziroma vsem, kar obstaja."],
    ["ateizem", "Zanikanje obstoja Boga."],
    ["agnosticizem", "Stališče, da obstoja Boga ni mogoče spoznati."],
    ["fideizem", "Nauk, da je vera neodvisna od razuma ali nad njim."],
    ["teodiceja", "Poskus opravičiti Boga glede obstoja zla v svetu."],
    ["problem zla", "Vprašanje, kako je zlo združljivo z vsemogočnim in dobrim Bogom."],
    ["negativna teologija", "Govor o Bogu z zanikanjem: povemo lahko le, kaj Bog ni."],
    ["analogija", "Govor o Bogu s pomočjo podobnosti s končnimi stvarmi."],
    ["Evtifronova dilema", "Vprašanje, ali je nekaj dobro, ker to hoče Bog, ali Bog to hoče, ker je dobro."],
  ]);
  vprasanja([
    [4, "Kako se glasi argument svobodne volje v teodiceji?", "zlo je posledica človekove svobode, ki je večja vrednota kot svet brez zla", ["zla ni", "Bog ni dober", "zlo je iluzija čutov"], "Ne pojasni pa naravnega zla (potresov, bolezni).", "visja"],
    [4, "Kako je Kant kritiziral ontološki dokaz?", "obstoj ni realni predikat, ki bi pojmu nekaj dodal", ["Bog je le ideja čutov", "dokaz je predolg", "dokaz uporablja indukcijo"], "Sto mislenih tolarjev ni nič manj kot sto resničnih.", "visja"],
    [4, "Kakšna je Humova kritika teleološkega dokaza?", "analogija med svetom in strojem je šibka in ne dokazuje enega, dobrega Boga", ["svet ni urejen", "ure ne obstajajo", "dokaz je ontološki"], "Svet bi lahko bil tudi delo več bogov ali neizkušenega oblikovalca.", "visja"],
  ]);
}
