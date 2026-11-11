import { izbira } from "../lib.mjs";
const T = [["Prav je dejanje, ki prinese največ sreče največjemu številu ljudi.", "utilitarizem"], ["Ravnaj le po tistem maksimu, za katerega lahko hočeš, da postane splošni zakon.", "deontologija (Kant)"], ["Moralno je, kar bi storil kreposten človek; pomembna je vzgoja značaja.", "etika vrlin"], ["Kar je moralno, je odvisno od kulture; ni splošno veljavnih načel.", "moralni relativizem"], ["Moralna načela izhajajo iz dogovora med ljudmi v korist vseh.", "kontraktualizem"], ["Dobro je, kar je v skladu z Božjo voljo.", "teorija Božjih zapovedi"]];
const TN = T.map(([, t]) => t);
export default function ({ serija, pojmi, vprasanja }) {
  serija("teorija", 12, (r, i) => {
    const [t, n] = T[i % 6];
    if (i < 6) return izbira({ r, tezavnost: 2, besedilo: `Katero etično teorijo izraža: »${t}«`, pravilna: n, napacne: r.premesaj(TN.filter((x) => x !== n)).slice(0, 3), postopek: `<p>${n}.</p>` });
    const prim = [["Zdravnik žrtvuje enega zdravega pacienta, da bi z organi rešil pet drugih.", "utilitarizem bi to lahko dopustil, deontologija pa zavrnila"], ["Lažeš morilcu, ki vpraša, kje se skriva tvoj prijatelj.", "Kant bi laž zavrnil tudi v tem primeru"], ["Ali je prav pomagati neznancu v stiski?", "vse glavne teorije bi odgovorile pritrdilno, a z različnimi utemeljitvami"]];
    const k = i % 3;
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `${prim[k][0]} Kaj velja?`, pravilna: prim[k][1], napacne: prim.filter((_, j) => j !== k).map(([, y]) => y).concat(["etika ne more ničesar reči o tem"]), postopek: `<p>${prim[k][1]}.</p>` });
  });
  pojmi([
    ["etika", "Filozofska disciplina, ki raziskuje moralo, dobro in pravilno ravnanje."],
    ["morala", "Celota norm in vrednot, ki usmerjajo ravnanje ljudi."],
    ["kategorični imperativ", "Kantovo brezpogojno moralno načelo, ki velja za vsa umna bitja."],
    ["hipotetični imperativ", "Pogojna zapoved: če hočeš cilj, stori sredstvo."],
    ["dobra volja", "Po Kantu edino brezpogojno dobro: volja, ki ravna iz dolžnosti."],
    ["utilitarizem", "Teorija, ki vrednost dejanja presoja po njegovih posledicah za srečo vseh."],
    ["hedonizem", "Nauk, da je ugodje najvišje dobro."],
    ["moralni relativizem", "Nauk, da so moralne sodbe odvisne od kulture ali posameznika."],
    ["moralni univerzalizem", "Nauk, da obstajajo moralna načela, ki veljajo za vse."],
    ["odgovornost", "Dolžnost odgovarjati za svoja dejanja in njihove posledice."],
    ["avtonomija", "Samozakonodajnost volje, ki si sama daje moralni zakon."],
  ]);
  vprasanja([
    [3, "Kaj je glavni ugovor proti moralnemu relativizmu?", "ne more pojasniti moralnega napredka in obsoditi krivic v drugih kulturah", ["je prezapleten", "zahteva vero v Boga", "temelji na matematiki"], "Če je vse relativno, odprave suženjstva ne bi mogli imeti za napredek."],
    [4, "Kaj zahteva druga formulacija kategoričnega imperativa?", "človeštvo v sebi in drugih vedno obravnavaj tudi kot cilj, nikoli zgolj kot sredstvo", ["deluj tako, da boš najsrečnejši", "ubogaj zakone države", "ravnaj kot večina"], "Dostojanstvo osebe.", "visja"],
  ]);
}
