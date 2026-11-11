import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    dela: [["Štirje letni časi", "Antonio Vivaldi"], ["Brandenburški koncerti", "Johann Sebastian Bach"], ["Matejev pasijon", "Johann Sebastian Bach"], ["Dobro uglašeni klavir", "Johann Sebastian Bach"], ["Mesija", "Georg Friedrich Händel"], ["Glasba na vodi", "Georg Friedrich Händel"], ["Orfej", "Claudio Monteverdi"], ["Dido in Enej", "Henry Purcell"], ["Kanon v D-duru", "Johann Pachelbel"], ["Te Deum v D-duru", "Marc-Antoine Charpentier"]],
    osebe: [["Antonio Vivaldi", "beneški »rdeči duhovnik«, avtor več kot 500 koncertov"], ["Johann Sebastian Bach", "tomaški kantor v Leipzigu, mojster fuge in kantat"], ["Georg Friedrich Händel", "nemški skladatelj, ki je večino kariere deloval v Londonu in pisal oratorije"], ["Claudio Monteverdi", "avtor zgodnje opere Orfej (1607)"], ["Henry Purcell", "največji angleški baročni skladatelj"], ["Arcangelo Corelli", "utemeljitelj concerta grossa in triosonate"], ["Jean-Baptiste Lully", "dvorni skladatelj Ludvika XIV., utemeljitelj francoske opere"], ["Domenico Scarlatti", "avtor več kot 500 enostavčnih sonat za čembalo"]],
  });
  pojmi([
    ["generalbas", "Basovska linija s številkami, nad katero izvajalec improvizira akorde."],
    ["concerto grosso", "Koncert, v katerem se skupina solistov (concertino) izmenjuje z orkestrom (ripieno)."],
    ["solistični koncert", "Koncert za enega solista in orkester."],
    ["oratorij", "Obsežna vokalno-inštrumentalna skladba z versko vsebino brez scenske izvedbe."],
    ["kantata", "Vokalno-inštrumentalna skladba iz arij, recitativov in zborov."],
    ["pasijon", "Uglasbitev trpljenja Kristusa po evangelijih."],
    ["fuga", "Večglasna imitacijska skladba z eno temo."],
    ["terasasta dinamika", "Nenadne spremembe glasnosti brez postopnih prehodov."],
    ["čembalo", "Glasbilo s tipkami, pri katerem strune trgajo peresca."],
    ["afektni nauk", "Baročno prepričanje, da glasba izraža in vzbuja določena čustva."],
  ]);
  vprasanja([
    [2, "Katero leto velja za konec baroka v glasbi (smrt J. S. Bacha)?", { vpis: ["1750"] }, [], "Barok približno 1600–1750."],
    [4, "Zakaj se ciklus Štirje letni časi šteje za programsko glasbo pred romantiko?", "koncerti spremljajo sonete in slikajo naravne pojave, npr. ptičje petje in nevihto", ["ker nimajo melodije", "ker so napisani za zbor", "ker so brez naslova"], "Vivaldi je k vsakemu koncertu dodal sonet.", "visja"],
  ]);
}
