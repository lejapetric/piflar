import { izbira } from "../lib.mjs";
const ER = [["zaupanje proti nezaupanju", "dojenček (0–1 leto)"], ["avtonomija proti sramu in dvomu", "malček (1–3 leta)"], ["iniciativnost proti krivdi", "predšolski otrok (3–6 let)"], ["delavnost proti manjvrednosti", "šolski otrok (6–12 let)"], ["identiteta proti zmedenosti vlog", "mladostnik (12–18 let)"], ["intimnost proti izolaciji", "zgodnja odraslost"], ["generativnost proti stagnaciji", "srednja odraslost"], ["integriteta proti obupu", "pozna odraslost"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("erikson", 16, (r, i) => {
    const [kriza, obd] = ER[i % 8];
    if (i < 8) return izbira({ r, tezavnost: 3, besedilo: `V katerem obdobju po Eriksonu poteka razvojna kriza <em>${kriza}</em>?`, pravilna: obd, napacne: r.premesaj(ER.filter(([k]) => k !== kriza).map(([, o]) => o)).slice(0, 3), postopek: `<p>${kriza}: ${obd}.</p>` });
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Katero razvojno krizo po Eriksonu rešuje ${obd}?`, pravilna: kriza, napacne: r.premesaj(ER.filter(([k]) => k !== kriza).map(([k]) => k)).slice(0, 3), postopek: `<p>${obd}: ${kriza}.</p>` });
  });
  pojmi([
    ["dednost", "Prenos lastnosti s staršev na potomce z geni."],
    ["okolje", "Vsi zunanji vplivi na razvoj, od prenatalnega okolja do vzgoje in kulture."],
    ["zorenje", "Biološko pogojene razvojne spremembe, ki potekajo po notranjem programu."],
    ["kritično obdobje", "Čas, v katerem je organizem posebej dovzeten za določene vplive."],
    ["identiteta", "Doživljanje sebe kot enkratne in v času trajne osebe."],
    ["samopodoba", "Celota predstav, ki jih ima posameznik o sebi."],
    ["samospoštovanje", "Vrednotenje samega sebe, čustveni del samopodobe."],
    ["puberteta", "Obdobje telesnega in spolnega dozorevanja."],
    ["mladostništvo", "Prehodno obdobje med otroštvom in odraslostjo."],
    ["navezanost", "Čustvena vez med otrokom in skrbnikom."],
    ["moratorij", "Status identitete: mladostnik raziskuje možnosti, a se še ni dokončno odločil."],
  ]);
  vprasanja([
    [4, "Kaj je pokazal Harlowov poskus z opičjimi mladiči?", "mladiči so iskali bližino mehke krpene matere, ne le hrane", ["mladiči so izbrali žičnato mater s hrano", "navezanost je odvisna le od hranjenja", "mladiči ne potrebujejo matere"], "Za navezanost je pomembno udobje dotika.", "visja"],
    [4, "Mladostnik je prevzel poklic, ki so mu ga izbrali starši, ne da bi razmišljal o drugih možnostih. Kateri status identitete je to po Marcii?", "zaprta identiteta", ["dosežena identiteta", "moratorij", "razpršena identiteta"], "Odločitev brez lastnega raziskovanja.", "visja"],
  ]);
}
