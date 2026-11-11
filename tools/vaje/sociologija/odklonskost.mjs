import { izbira } from "../lib.mjs";
const MER = [["Študentka se pridno uči, da bi dobila dobro službo.", "konformnost"], ["Poslovnež želi biti bogat, a utaji davke.", "inovacija"], ["Uradnik natančno upošteva pravila, čeprav več ne verjame v napredovanje.", "ritualizem"], ["Brezdomec, odvisen od alkohola, je opustil cilje in sredstva.", "umik"], ["Aktivist zavrača potrošniške cilje in se bori za novo družbeno ureditev.", "upor"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("merton", 5, (r, i) => izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kateri Mertonov način prilagajanja opisuje primer: ${MER[i][0]}`, pravilna: MER[i][1], napacne: r.premesaj(["konformnost", "inovacija", "ritualizem", "umik", "upor"].filter((x) => x !== MER[i][1])).slice(0, 3), postopek: `<p>${MER[i][1]}. Merton: konformnost (cilji + sredstva), inovacija (cilji, nelegitimna sredstva), ritualizem (sredstva brez ciljev), umik (nič), upor (novi cilji in sredstva).</p>` }));
  pojmi([
    ["odklonskost", "Vedenje, ki krši družbene norme."],
    ["kriminaliteta", "Vedenje, ki krši kazenski zakon."],
    ["konformnost", "Vedenje v skladu z družbenimi normami."],
    ["družbeni nadzor", "Načini, s katerimi družba zagotavlja upoštevanje norm."],
    ["formalni nadzor", "Nadzor, ki ga izvajajo uradne ustanove, npr. policija in sodišča."],
    ["neformalni nadzor", "Nadzor z odobravanjem in neodobravanjem v družini, med vrstniki."],
    ["etiketiranje", "Pripisovanje oznake odklonskosti, ki lahko vodi v sekundarno odklonskost."],
    ["sekundarna odklonskost", "Odklonsko vedenje, ki je posledica sprejetja pripisane etikete."],
    ["teorija napetosti", "Mertonova razlaga, da odklonskost nastane, ko ljudje ne morejo legitimno doseči družbeno priznanih ciljev."],
    ["kriminaliteta belih ovratnikov", "Kazniva dejanja premožnih in uglednih oseb v okviru poklica."],
    ["temno polje kriminalitete", "Kazniva dejanja, ki niso prijavljena ali odkrita."],
    ["panoptikon", "Benthamova zamisel zapora, s katero je Foucault ponazoril nenehni nadzor v moderni družbi."],
    ["recidivizem", "Ponovno storjeno kaznivo dejanje po prestani kazni."],
    ["mladoletniško prestopništvo", "Kazniva dejanja, ki jih storijo mladoletniki."],
  ]);
  vprasanja([
    [3, "Zakaj je odklonskost relativna?", "ker je odvisna od kraja, časa in skupine, ki norme postavlja", ["ker je vedno enaka", "ker je biološko določena", "ker je ni mogoče opredeliti"], "Isto vedenje je lahko v eni družbi sprejemljivo, v drugi ne."],
    [4, "Katera Durkheimova misel o kriminalu je presenetljiva?", "zmerna stopnja kriminala je normalna in ima funkcije, npr. krepi meje dovoljenega", ["kriminal je vedno bolezen", "kriminala v družbi ni", "kriminal je dedno pogojen"], "Odziv na kršitev krepi skupne vrednote.", "visja"],
    [4, "Kaj trdi Foucault o razvoju kaznovanja?", "od javnega telesnega kaznovanja smo prešli k discipliniranju in nadzoru duše", ["kaznovanje postaja vedno bolj krvavo", "kaznovanje je izginilo", "kaznovanje je enako kot v srednjem veku"], "Nadzorovati in kaznovati (1975).", "visja"],
    [4, "Kateri argument proti smrtni kazni temelji na empiričnih podatkih?", "ni dokazov, da zmanjšuje stopnjo umorov, obstaja pa nevarnost usmrtitve nedolžnih", ["je predraga za državo", "storilci jo želijo", "je prepovedana v vseh državah"], "Primerjave držav ne kažejo odvračilnega učinka.", "visja"],
  ]);
}
