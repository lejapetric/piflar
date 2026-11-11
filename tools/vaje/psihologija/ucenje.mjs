import { izbira } from "../lib.mjs";
const PAV = [
  ["Pes ob zvoku zvonca, ki mu je večkrat sledila hrana, začne sliniti.", ["hrana", "slinjenje ob hrani", "zvonec", "slinjenje ob zvoncu"]],
  ["Otroka je pri zobozdravniku bolelo; zdaj ga je strah že vonja ordinacije.", ["bolečina", "strah ob bolečini", "vonj ordinacije", "strah ob vonju"]],
  ["Ob pesmi, ki se je vrtela ob prvem poljubu, se dekle vedno razveseli.", ["poljub", "veselje ob poljubu", "pesem", "veselje ob pesmi"]],
  ["Mačka priteče, ko zasliši odpiranje konzerve.", ["hrana", "vznemirjenje ob hrani", "zvok odpiranja konzerve", "vznemirjenje ob zvoku konzerve"]],
  ["Po zastrupitvi s školjkami se človeku obrača želodec že ob pogledu nanje.", ["zastrupitev", "slabost ob zastrupitvi", "pogled na školjke", "slabost ob pogledu na školjke"]],
];
const IME = ["brezpogojni dražljaj", "brezpogojni odziv", "pogojni dražljaj", "pogojni odziv"];
const OP = [["Dijak dobi pohvalo za domačo nalogo in jo odtlej redno dela.", "pozitivna okrepitev"], ["Voznik si pripne pas, da preneha piskanje.", "negativna okrepitev"], ["Otrok zaradi kričanja dobi dodatno nalogo.", "pozitivna kazen"], ["Najstniku zaradi zamude vzamejo telefon.", "negativna kazen"], ["Pes dobi priboljšek, ko sede.", "pozitivna okrepitev"], ["Vzamemo tableto, ker ta odpravi glavobol.", "negativna okrepitev"], ["Igralcu zaradi grobe igre prepovedo igrati naslednjo tekmo.", "negativna kazen"], ["Za prehitro vožnjo dobi voznik globo.", "pozitivna kazen"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("pavlov", 20, (r, i) => {
    const [opis, el] = PAV[i % 5], k = Math.floor(i / 5);
    return izbira({ r, tezavnost: 3, besedilo: `${opis} Kaj je v tem primeru <strong>${IME[k]}</strong>?`, pravilna: el[k], napacne: el.filter((_, j) => j !== k), postopek: `<p>${IME.map((n, j) => `${n}: ${el[j]}`).join("; ")}.</p>` });
  });
  serija("operantno", 8, (r, i) => {
    const [opis, odg] = OP[i];
    return izbira({ r, tezavnost: 3, besedilo: `${opis} Kaj je to?`, pravilna: odg, napacne: ["pozitivna okrepitev", "negativna okrepitev", "pozitivna kazen", "negativna kazen"].filter((x) => x !== odg), postopek: `<p>Okrepitev vedenje poveča, kazen zmanjša. Pozitivna = nekaj dodamo, negativna = nekaj odvzamemo.</p>` });
  });
  pojmi([
    ["učenje", "Relativno trajna sprememba vedenja ali znanja na podlagi izkušenj."],
    ["klasično pogojevanje", "Učenje, pri katerem nevtralni dražljaj zaradi povezovanja z brezpogojnim začne sprožati odziv."],
    ["operantno pogojevanje", "Učenje, pri katerem posledice vedenja vplivajo na pogostost tega vedenja."],
    ["modelno učenje", "Učenje z opazovanjem in posnemanjem drugih."],
    ["ugašanje", "Postopno izginjanje naučenega odziva, ko okrepitev izostane."],
    ["senzorni spomin", "Spominski sistem, ki za delček sekunde ohrani čutne vtise."],
    ["kratkoročni spomin", "Spominski sistem z omejeno zmogljivostjo približno 7 ± 2 enot in kratkim trajanjem."],
    ["dolgoročni spomin", "Spominski sistem z velikim obsegom, ki informacije hrani trajno."],
    ["krivulja pozabljanja", "Ebbinghausova ugotovitev, da največ pozabimo kmalu po učenju."],
  ]);
  vprasanja([
    [4, "Katera vrsta okrepitve najbolj odporno ohranja vedenje (npr. igralni avtomati)?", "spremenljivo razmerje", ["stalno razmerje", "stalni interval", "stalna okrepitev"], "Nepredvidljiva okrepitev je najbolj odporna proti ugašanju.", "visja"],
    [4, "Kaj je Bartlett ugotovil s pripovedovanjem zgodbe »Vojna duhov«?", "spomin je rekonstruktiven: zgodbo prilagodimo svojim shemam", ["spomin je popolnoma natančen", "pozabljanje je linearno", "spomin je omejen na 7 enot"], "Udeleženci so zgodbo krajšali in prilagajali svoji kulturi.", "visja"],
    [4, "Novo naučeno snov težje prikličemo, ker jo moti prej naučena. Kako imenujemo pojav?", "proaktivna interferenca", ["retroaktivna interferenca", "ugašanje", "posplošitev"], "Pro = naprej: staro moti novo.", "visja"],
  ]);
}
