// Naloge za opis slike: podatki o temah so v tools/ustno/anglescina.mjs (isti kot na strani).
import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";
import teme from "../../ustno/anglescina.mjs";

const KORAKI = [
  ["In the foreground there are two boys playing the guitar.", "opis"],
  ["On the left you can see a factory with a chimney.", "opis"],
  ["A young man in an apron is serving soup.", "opis"],
  ["They seem to be exchange students.", "ugibanje"],
  ["The father must have just come back from a run.", "ugibanje"],
  ["It looks as if they are celebrating a birthday.", "ugibanje"],
  ["Judging by the ring light, she takes it quite seriously.", "ugibanje"],
  ["The picture is connected to how young people spend their free time.", "povezava s temo"],
  ["This raises the question of who is responsible for the environment.", "povezava s temo"],
  ["The photo makes me think about the role of social media.", "povezava s temo"],
  ["I partly agree with the statement, because tickets are expensive.", "mnenje"],
  ["As far as I'm concerned, robots will change jobs rather than replace them.", "mnenje"],
  ["So, all in all, I'd say it depends on how we use technology.", "mnenje"],
];
const IMENA = ["opis", "ugibanje", "povezava s temo", "mnenje"];

export default function ({ serija }) {
  serija("korak", KORAKI.length, (r, i) => {
    const [p, k] = KORAKI[i];
    return izbira({ r, tezavnost: 2, besedilo: `Kateri korak opisa slike je ta poved? <em>${p}</em>`, pravilna: k, napacne: IMENA.filter((x) => x !== k), postopek: `<p>Koraki: opiši, ugibaj, poveži s temo, mnenje. Ta poved je ${k}.</p>` });
  });
  serija("tema", teme.length, (r, i) => {
    const t = teme[i];
    return izbira({ r, tezavnost: 1, besedilo: `Na listku piše: <em>${t.iztocnica}</em> Na katero tematsko področje se nanaša?`, pravilna: t.naslov, napacne: r.premesaj(teme.filter((x) => x !== t)).slice(0, 3).map((x) => x.naslov), postopek: `<p>${t.naslov}. Ključne besede: ${t.kljucne.slice(0, 4).map(([a]) => `<em>${a}</em>`).join(", ")}.</p>` });
  });
  serija("odgovor", teme.length, (r, i) => {
    const t = teme[i], [q, a] = t.vprasanja[i % 4];
    const kratki = ["Yes, I do.", "I don't know.", "No, not really.", "Maybe.", "It depends."];
    return izbira({ r, tezavnost: 1, besedilo: `Izpraševalec vpraša: <em>${q}</em> Kateri odgovor prinese največ točk pri merilu sodelovanje v pogovoru?`, pravilna: a, napacne: r.premesaj(kratki).slice(0, 3), postopek: `<p>Razvit odgovor ima odgovor, razlog in primer.</p>` });
  });
  pomeni(serija, "kljucne", teme.flatMap((t) => t.kljucne), { tez: 1, n: 40 });
  vrzeli(serija, "slika", [
    ["___ the foreground there is a woman with an umbrella.", "In", ["On", "At", "By"], "In the foreground / in the background.", 1],
    ["The girl ___ a picture in her sketchbook.", "is drawing", ["draws", "drawn", "has draw"], "Za dogajanje na sliki: present continuous.", 1],
    ["She looks ___.", "happy", ["like happy", "happily", "as happy"], "look + pridevnik; look like + samostalnik.", 2],
    ["They look ___ a family on holiday.", "like", ["as", "as if", "such"], "look like + samostalnik.", 2],
    ["It looks ___ they have just arrived.", ["as if", "as though"], ["like as", "such as", "so"], "look as if + stavek.", 3],
    ["They ___ be friends, but I'm not sure.", ["might", "could", "may"], ["must", "should", "would"], "Negotovo ugibanje: might / could.", 2],
    ["He's wearing sports clothes, so he ___ have just been for a run.", "must", ["can", "should", "would"], "Prepričano ugibanje o preteklosti: must have + 3. oblika.", 3],
    ["___ by the flags, they come from different countries.", "Judging", ["Judge", "Judged", "To judge of"], "Judging by … = sodeč po …", 3],
    ["The picture ___ me of my grandparents' house.", "reminds", ["remembers", "recalls", "memorises"], "remind somebody of something.", 2],
    ["The photo ___ the question of who is responsible.", "raises", ["rises", "arises", "rose"], "raise a question = sprožiti vprašanje.", 3],
    ["In the top left-hand ___ there is a clock.", "corner", ["angle", "edge", "side"], "In the top left-hand corner.", 2],
    ["They ___ to be enjoying the concert.", ["seem", "appear"], ["look", "are seeming", "seems"], "seem to be + -ing.", 2],
    ["I don't know the exact word, but it's a ___ of small boat.", "kind", ["type of a", "sorts", "similar"], "It's a kind of … za opisovanje neznane besede.", 2],
    ["It's something you use ___ cutting paper.", "for", ["to", "by", "with"], "something you use for + -ing.", 2],
    ["Could you ___ the question, please?", "repeat", ["say again", "tell", "return"], "Could you repeat the question?", 1],
    ["I see your ___, but I don't agree.", "point", ["view", "opinion", "idea of"], "I see your point, but …", 2],
    ["Far from ___ glued to their screens, they are playing music.", "being", ["be", "to be", "been"], "Far from + -ing = daleč od tega, da …", 4, "visja"],
    ["Tourism is a double-___ sword.", "edged", ["edge", "sided", "faced"], "a double-edged sword = dvorezen meč.", 4, "visja"],
  ]);
}
