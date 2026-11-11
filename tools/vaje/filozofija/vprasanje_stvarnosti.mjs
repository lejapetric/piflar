import { izbira } from "../lib.mjs";
const AV = [["Vse teče (panta rhei); temelj je sprememba in logos.", "Heraklit"], ["Bit je, nebiti ni; spreminjanje je navidezno.", "Parmenid"], ["Vse je iz nedeljivih atomov in praznine.", "Demokrit"], ["Biti pomeni biti zaznan (esse est percipi).", "Berkeley"], ["Bog ali narava: obstaja ena sama substanca.", "Spinoza"], ["Eksistenca je pred esenco; človek je obsojen na svobodo.", "Sartre"], ["Edino resno filozofsko vprašanje je samomor; svet je absurden.", "Camus"], ["Svet je sestavljen iz monad, ki nimajo oken.", "Leibniz"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("avtor", 16, (r, i) => {
    const [t, a] = AV[i % 8];
    if (i < 8) return izbira({ r, tezavnost: 2, besedilo: `Kateri filozof je zagovarjal: »${t}«`, pravilna: a, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([, x]) => x)).slice(0, 3), postopek: `<p>${a}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera trditev o stvarnosti pripada filozofu ${a}?`, pravilna: t, napacne: r.premesaj(AV.filter(([, x]) => x !== a).map(([x]) => x)).slice(0, 3), postopek: `<p>${a}: ${t}</p>` });
  });
  pojmi([
    ["metafizika", "Filozofska disciplina, ki raziskuje temelje in bistvo stvarnosti."],
    ["substanca", "Tisto, kar obstaja samo po sebi in je nosilec lastnosti."],
    ["materializem", "Nauk, da je vse, kar obstaja, materialno."],
    ["idealizem", "Nauk, da je temelj stvarnosti duhovno ali ideje."],
    ["monizem", "Nauk, da obstaja ena sama vrsta substance."],
    ["determinizem", "Nauk, da je vse, kar se zgodi, nujno določeno s predhodnimi vzroki."],
    ["indeterminizem", "Nauk, da vsi dogodki niso vnaprej določeni."],
    ["kompatibilizem", "Nauk, da sta determinizem in svobodna volja združljiva."],
    ["eksistencializem", "Smer, ki poudarja svobodo, odgovornost in iskanje smisla posameznika."],
    ["avtentičnost", "Življenje v skladu z lastnimi izbirami namesto po pričakovanjih drugih."],
    ["absurd", "Po Camusu nasprotje med človekovo potrebo po smislu in molkom sveta."],
  ]);
  vprasanja([
    [4, "Kaj je problem svobodne volje ob determinizmu?", "če je vse vnaprej določeno, se zdi, da za dejanja nismo odgovorni", ["če je vse naključno, smo popolnoma svobodni", "determinizem dokazuje svobodo", "svobodna volja nima povezave z odgovornostjo"], "Kompatibilisti svobodo opredelijo kot delovanje brez zunanje prisile.", "visja"],
    [4, "Kaj Sartre misli s trditvijo, da je »eksistenca pred esenco«?", "človek najprej obstaja, nato pa s svojimi dejanji ustvari, kaj je", ["človekovo bistvo je določeno pred rojstvom", "esenca ne obstaja", "eksistenca je iluzija"], "Ni vnaprej dane človeške narave.", "visja"],
    [4, "Kako Camus odgovori na absurd v Mitu o Sizifu?", "z uporom: sprejeti absurd in kljub temu živeti, »Sizifa si moramo predstavljati srečnega«", ["s samomorom", "z vero v posmrtno življenje", "z zanikanjem absurda"], "Upor, svoboda in strast.", "visja"],
  ]);
}
