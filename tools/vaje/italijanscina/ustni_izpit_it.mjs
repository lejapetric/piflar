import { izbira } from "../lib.mjs";
import { vrzeli, pomeni } from "../jezik-lib.mjs";

const FUN = [["Sono d'accordo con te.", "strinjanje"], ["Non sono per niente d'accordo.", "nestrinjanje"], ["Secondo me, …", "izražanje mnenja"], ["Può ripetere, per favore?", "prošnja za ponovitev"], ["Mi scusi.", "opravičilo"], ["Dovresti riposarti.", "nasvet"], ["Perché non andiamo al cinema?", "predlog"], ["Complimenti!", "čestitka"], ["Per me è uguale.", "brezbrižnost"], ["Preferisco il tè al caffè.", "izražanje preference"], ["Che ne pensi?", "spraševanje po mnenju"], ["Scusi se La disturbo …", "vljuden začetek pogovora"], ["Non mi piace per niente.", "izražanje nezadovoljstva"], ["Volentieri!", "sprejem povabila"], ["Che peccato!", "obžalovanje"], ["Come si dice … in italiano?", "spraševanje po besedi"], ["Non ne sono sicuro.", "dvom"], ["Buona fortuna!", "voščilo"]];
const F = [...new Set(FUN.map(([, f]) => f))];

export default function ({ serija }) {
  serija("funkcije", 18, (r, i) => {
    const [iz, f] = FUN[i];
    return izbira({ r, tezavnost: 2, besedilo: `Katero sporazumevalno funkcijo izraža <em>${iz}</em>?`, pravilna: f, napacne: r.premesaj(F.filter((x) => x !== f)).slice(0, 3), postopek: `<p><em>${iz}</em> → ${f}.</p>` });
  });
  vrzeli(serija, "pogovor", [
    ["___ chiamo Ana e ho diciotto anni.", "Mi", ["Si", "Me", "Io"], "Chiamarsi: mi chiamo.", 1],
    ["Abito ___ Slovenia, a Capodistria.", "in", ["a", "nella", "da"], "Države: in.", 1],
    ["Nel tempo libero ___ sport.", "faccio", ["gioco", "pratico a", "faccio lo"], "Fare sport.", 2],
    ["Suono la chitarra ___ cinque anni.", "da", ["per", "fa", "tra"], "Da = že (trajanje do zdaj).", 3],
    ["Dopo la maturità vorrei ___ medicina.", "studiare", ["studio", "studiato", "studiando"], "Vorrei + nedoločnik.", 2],
    ["Se avessi più tempo, ___ di più.", "viaggerei", ["viaggerò", "viaggio", "viaggiavo"], "Se + congiuntivo imperfetto → condizionale.", 4, "visja"],
    ["In questa foto ___ due persone.", "si vedono", ["si vede", "vedono", "vede"], "Si vedono + množina.", 3],
    ["In primo ___ c'è un cane.", "piano", ["luogo", "fondo", "posto"], "In primo piano = v ospredju.", 3],
    ["Sullo ___ si vedono delle montagne.", "sfondo", ["piano", "fondo", "dietro"], "Sullo sfondo = v ozadju.", 4, "visja"],
    ["Sembra che ___ inverno.", "sia", ["è", "fosse", "sarà"], "Sembra che + congiuntivo.", 4, "visja"],
    ["Vi parlerò ___ problema dell'inquinamento.", "del", ["di", "il", "al"], "Parlare di + il = del.", 2],
    ["Per ___, direi che è importante.", "riassumere", ["riassumo", "riassunto", "riassumendo"], "Per + nedoločnik.", 3],
  ]);
  pomeni(serija, "izrazi", [["avere bisogno di", "potrebovati"], ["avere voglia di", "imeti voljo"], ["fare la fila", "čakati v vrsti"], ["prendere una decisione", "sprejeti odločitev"], ["cavarsela", "znajti se"], ["avere paura", "bati se"], ["fare una domanda", "postaviti vprašanje"], ["tenere conto di", "upoštevati"]], { tez: 2, n: 12 });
}
