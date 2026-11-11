import { izbira, besedilo } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

// [ednina, množina, pravilo, težavnost]
const MN = [["ragazzo", "ragazzi", "-o → -i", 1], ["ragazza", "ragazze", "-a (ž) → -e", 1], ["fiore", "fiori", "-e → -i", 1], ["chiave", "chiavi", "-e → -i", 1],
  ["amico", "amici", "-co → -ci (izjema pri naglasu)", 3], ["lago", "laghi", "-go → -ghi", 2], ["amica", "amiche", "-ca → -che", 2], ["banca", "banche", "-ca → -che", 2],
  ["medico", "medici", "-co → -ci (naglas na tretjem zlogu od zadaj)", 3], ["città", "città", "končni naglas: nespremenljivo", 2], ["caffè", "caffè", "končni naglas: nespremenljivo", 2], ["bar", "bar", "na soglasnik: nespremenljivo", 2],
  ["foto", "foto", "skrajšanka: nespremenljivo", 3], ["problema", "problemi", "moški na -a → -i", 3], ["uomo", "uomini", "nepravilno", 4], ["uovo", "uova", "nepravilno (ženski spol v množini)", 4],
  ["mano", "mani", "ženski spol na -o", 4], ["dito", "dita", "nepravilno", 4], ["crisi", "crisi", "na -i: nespremenljivo", 3], ["farmacia", "farmacie", "-ia → -ie", 2],
  ["camicia", "camicie", "-cia (naglas ni na i) → -cie", 4], ["arancia", "arance", "-cia → -ce", 4], ["figlio", "figli", "-io → -i", 2], ["zio", "zii", "-ìo (naglašen i) → -ii", 4]];

export default function ({ serija }) {
  serija("mnozina", 32, (r, i) => {
    const [ed, mn, pr, t] = r.izberi(MN);
    const rav = t === 4 ? { raven: "visja" } : {};
    if (i % 2) return besedilo({ tezavnost: t, ...rav, sprejemljivi: [mn], besedilo: `Zapiši množino samostalnika <em>${ed}</em>.`, rezultat: mn, postopek: `<p>${ed} → ${mn} (${pr})</p>` });
    const nap = [...new Set([ed.replace(/[aeio]$/, "i"), ed.replace(/[aeio]$/, "e"), ed + "s", ed.replace(/o$/, "a"), ed])].filter((x) => x !== mn).slice(0, 3);
    return izbira({ r, tezavnost: Math.max(1, t - 1), ...rav, besedilo: `Kakšna je množina samostalnika <em>${ed}</em>?`, pravilna: mn, napacne: nap, postopek: `<p>${ed} → ${mn} (${pr})</p>` });
  });
  vrzeli(serija, "pridevnik", [
    ["Le ragazze sono ___ (simpatico).", "simpatiche", ["simpatici", "simpatica", "simpaticie"], "Ženski spol množine: -che.", 3],
    ["I ragazzi sono ___ (simpatico).", "simpatici", ["simpatichi", "simpatiche", "simpatico"], "Moški spol množine: simpatici.", 3],
    ["Ho comprato una macchina ___ (rosso).", "rossa", ["rosso", "rosse", "rossi"], "Ujemanje: ženski spol ednine.", 1],
    ["Le case sono ___ (grande).", "grandi", ["grande", "grandie", "grando"], "Pridevniki na -e imajo v množini -i v obeh spolih.", 2],
    ["Ho visto un ___ film. (bello)", "bel", ["bello", "bell'", "bei"], "Bello pred soglasnikom se obnaša kot člen: un bel film.", 4, "visja"],
    ["Che ___ occhi! (bello)", "begli", ["bei", "belli", "bell'"], "Bello pred samoglasnikom v množini: begli.", 4, "visja"],
    ["È un ___ amico. (buono)", "buon", ["buono", "buon'", "buona"], "Buono pred moškim samostalnikom: buon.", 3],
    ["È una ___ amica. (buono)", ["buona", "buon'"], ["buon", "buono", "buoni"], "Ženski spol: buona (pred samoglasnikom tudi buon').", 2],
    ["Roma è ___ grande di Lubiana.", "più", ["molto", "tanto", "meno di"], "Primernik: più … di.", 2],
    ["Marco è alto ___ suo fratello.", "come", ["che", "di", "più"], "Enakost: (tanto) … come.", 2],
    ["È più facile parlare ___ scrivere.", "che", ["di", "come", "da"], "Primerjava dveh glagolov: che.", 4, "visja"],
    ["Questo è il libro ___ interessante di tutti.", "più", ["il più", "molto", "tanto"], "Presežnik: il libro più interessante.", 3],
    ["Il gelato è ___ (buono → presežnik, absolutno).", ["ottimo", "buonissimo"], ["migliore", "il migliore", "meglio"], "Absolutni presežnik: ottimo ali buonissimo.", 4, "visja"],
    ["Questa pizza è ___ di quella. (buono, primernik)", "migliore", ["ottima", "meglio", "la migliore"], "Nepravilni primernik: migliore.", 4, "visja"],
  ]);
}
