import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

// [ednina, množina, člen ed., člen mn., pomen]
const S = [["libro", "libri", "il", "i", "knjiga"], ["studente", "studenti", "lo", "gli", "študent"], ["amico", "amici", "l'", "gli", "prijatelj"], ["zaino", "zaini", "lo", "gli", "nahrbtnik"],
  ["casa", "case", "la", "le", "hiša"], ["amica", "amiche", "l'", "le", "prijateljica"], ["psicologo", "psicologi", "lo", "gli", "psiholog"], ["giorno", "giorni", "il", "i", "dan"],
  ["albero", "alberi", "l'", "gli", "drevo"], ["scuola", "scuole", "la", "le", "šola"], ["specchio", "specchi", "lo", "gli", "ogledalo"], ["isola", "isole", "l'", "le", "otok"],
  ["treno", "treni", "il", "i", "vlak"], ["gnomo", "gnomi", "lo", "gli", "škrat"], ["ospedale", "ospedali", "l'", "gli", "bolnišnica"], ["città", "città", "la", "le", "mesto"],
  ["sport", "sport", "lo", "gli", "šport"], ["cinema", "cinema", "il", "i", "kino"], ["stazione", "stazioni", "la", "le", "postaja"], ["zio", "zii", "lo", "gli", "stric"]];
const PRED = { di: { il: "del", lo: "dello", "l'": "dell'", la: "della", i: "dei", gli: "degli", le: "delle" }, a: { il: "al", lo: "allo", "l'": "all'", la: "alla", i: "ai", gli: "agli", le: "alle" }, da: { il: "dal", lo: "dallo", "l'": "dall'", la: "dalla", i: "dai", gli: "dagli", le: "dalle" }, in: { il: "nel", lo: "nello", "l'": "nell'", la: "nella", i: "nei", gli: "negli", le: "nelle" }, su: { il: "sul", lo: "sullo", "l'": "sull'", la: "sulla", i: "sui", gli: "sugli", le: "sulle" } };
const RAZ = { il: "moški spol pred soglasnikom", lo: "moški spol pred s + soglasnik, z, gn, ps, y", "l'": "pred samoglasnikom", la: "ženski spol pred soglasnikom", i: "množina od il", gli: "množina od lo in l' (moški spol)", le: "ženski spol množine" };

export default function ({ serija }) {
  serija("dolocni", 26, (r, i) => {
    const s = r.izberi(S), mn = i % 4 >= 2, sam = mn ? s[1] : s[0], prav = mn ? s[3] : s[2];
    const opcije = mn ? ["i", "gli", "le"] : ["il", "lo", "l'", "la"];
    if (i % 2) return besedilo({ tezavnost: mn ? 3 : 2, sprejemljivi: [prav], besedilo: `Vpiši določni člen: ___ <em>${sam}</em> (${s[4]}${mn ? ", množina" : ""})`, rezultat: `${prav}${prav.endsWith("'") ? "" : " "}${sam}`, postopek: `<p>${RAZ[prav]} → ${prav}</p>` });
    return izbira({ r, tezavnost: mn ? 2 : 1, besedilo: `Kateri določni člen sodi pred <em>${sam}</em>${mn ? " (množina)" : ""}?`, pravilna: prav, napacne: opcije.filter((x) => x !== prav), postopek: `<p>${RAZ[prav]} → ${prav}</p>` });
  });
  serija("zlozeni", 30, (r, i) => {
    const s = r.izberi(S), p = r.izberi(Object.keys(PRED)), mn = i % 3 === 2, c = mn ? s[3] : s[2], sam = mn ? s[1] : s[0], prav = PRED[p][c];
    const raz = `${p} + ${c} = ${prav}`;
    if (i % 2) return besedilo({ tezavnost: mn || c === "lo" || c === "gli" ? 4 : 3, ...(mn || c === "lo" || c === "gli" ? { raven: "visja" } : {}), sprejemljivi: [prav], besedilo: `Združi predlog in člen: <em>${p} + ${c} ${sam}</em> → ___ ${sam}`, rezultat: `${prav}${prav.endsWith("'") ? "" : " "}${sam}`, postopek: `<p>${raz}</p>` });
    return izbira({ r, tezavnost: 2, besedilo: `Kako se združita <em>${p} + ${c}</em> (${sam})?`, pravilna: prav, napacne: r.premesaj(Object.values(PRED[p]).filter((x) => x !== prav)).slice(0, 3), postopek: `<p>${raz}</p>` });
  });
  vrzeli(serija, "predlogi", [
    ["Vado ___ Roma.", "a", ["in", "da", "di"], "Mesta: a.", 1],
    ["Vado ___ Italia.", "in", ["a", "da", "nel"], "Države: in.", 1],
    ["Vado ___ medico.", "dal", ["al", "dal'", "nel"], "K osebi: da (da + il = dal).", 3],
    ["Sono ___ Lubiana.", "di", ["da", "a", "in"], "Izvor (rojstni kraj): sono di.", 2],
    ["Abito qui ___ tre anni.", "da", ["per", "fa", "tra"], "Da = že (trajanje do zdaj).", 3],
    ["Parto ___ due giorni.", "tra", ["da", "fa", "per"], "Tra/fra = čez (v prihodnosti).", 3],
    ["Sono arrivato due ore ___.", "fa", ["da", "tra", "prima"], "Fa = pred (časovno).", 3],
    ["Vado ___ piedi.", "a", ["in", "con", "da"], "A piedi = peš.", 2],
    ["Vado ___ macchina.", "in", ["con", "a", "da"], "In macchina, in treno, in bici.", 2],
    ["Questo è il libro ___ Marco.", "di", ["da", "a", "del"], "Svojina: di.", 1],
    ["Una tazza ___ tè.", "da", ["di", "per", "a"], "Namen: tazza da tè (skodelica za čaj).", 4, "visja"],
    ["Una tazza ___ tè, per favore. (vsebina)", "di", ["da", "per", "con"], "Vsebina: tazza di tè (skodelica čaja).", 4, "visja"],
  ]);
}
