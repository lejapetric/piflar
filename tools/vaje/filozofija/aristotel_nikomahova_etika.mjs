import { izbira } from "../lib.mjs";
const SR = [["pogum", "strahopetnost", "predrznost"], ["zmernost", "neobčutljivost", "razuzdanost"], ["radodarnost", "skopost", "zapravljivost"], ["krotkost", "brezbrižnost (nejeznost)", "jeznost"], ["resnicoljubnost", "hlinjena skromnost", "bahavost"], ["prijaznost", "prepirljivost", "prilizovanje"], ["velikodušnost", "malodušnost", "nadutost"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("sredina", 14, (r, i) => {
    const [v, m, p] = SR[i % 7];
    if (i < 7) return izbira({ r, tezavnost: 2, besedilo: `Katera vrlina je sredina med <em>${m}</em> (pomanjkanje) in <em>${p}</em> (presežek)?`, pravilna: v, napacne: r.premesaj(SR.filter(([x]) => x !== v).map(([x]) => x)).slice(0, 3), postopek: `<p>${m} – <strong>${v}</strong> – ${p}</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Katera skrajnost je presežek pri vrlini <em>${v}</em>?`, pravilna: p, napacne: [m, ...r.premesaj(SR.filter(([x]) => x !== v).map(([, , y]) => y)).slice(0, 2)], postopek: `<p>${m} (pomanjkanje) – ${v} – ${p} (presežek)</p>` });
  });
  pojmi([
    ["sreča", "Najvišje dobro, ki ga hočemo zaradi njega samega; dejavnost duše v skladu z vrlino (eudajmonija)."],
    ["najvišje dobro", "Cilj, ki ga hočemo zaradi njega samega in zaradi katerega hočemo vse drugo."],
    ["vrlina", "Pridobljena drža, ki človeka naredi dobrega in mu omogoča dobro delovanje."],
    ["etična vrlina", "Vrlina značaja, pridobljena z navado, kot sredina med dvema skrajnostma."],
    ["dianoetična vrlina", "Razumska vrlina, pridobljena s poukom, npr. modrost in pametnost."],
    ["pametnost", "Praktična modrost: sposobnost pravilne presoje, kako ravnati v konkretnih okoliščinah."],
    ["modrost", "Najvišja teoretična vrlina, spoznanje prvih načel in najvišjih stvari."],
    ["hotena dejanja", "Dejanja, katerih izvor je v delujočem, ki pozna okoliščine."],
    ["odločitev", "Premišljena izbira sredstev za dosego cilja."],
    ["teoretično življenje", "Življenje v umskem motrenju, po Aristotelu najvišja oblika sreče."],
    ["distributivna pravičnost", "Pravičnost pri delitvi dobrin glede na zasluge."],
    ["korektivna pravičnost", "Pravičnost, ki izravna krivico v medsebojnih razmerjih."],
  ]);
  vprasanja([
    [2, "Katere tri oblike življenja razlikuje Aristotel?", "uživaško, politično in teoretično življenje", ["kmečko, vojaško in duhovniško", "otroško, odraslo in starostno", "sebično, nesebično in pravično"], "Najvišje je teoretično (motrilno) življenje."],
    [3, "Zakaj čast ne more biti najvišje dobro?", "ker je odvisna od drugih, ki jo podeljujejo, najvišje dobro pa mora biti lastno", ["ker je nemoralna", "ker je ni mogoče doseči", "ker jo imajo vsi"], "Najvišje dobro mora biti samozadostno."],
    [4, "Zakaj vrlina kot sredina ni aritmetična sredina?", "ker je sredina glede na nas in okoliščine, ki jo določi pametnost", ["ker je vedno točno na polovici", "ker je enaka za vse ljudi", "ker je ni mogoče določiti"], "Npr. prava količina hrane je za rokoborca drugačna kot za začetnika.", "visja"],
    [4, "Kako Aristotel obravnava dejanja iz nevednosti?", "so nehotena, če jih delujoči ob spoznanju obžaluje", ["so vedno hotena", "so vedno kazniva", "niso dejanja"], "Nehotena so dejanja pod prisilo ali iz nevednosti glede okoliščin.", "visja"],
    [4, "Kakšna je vloga zunanjih dobrin pri sreči?", "so potrebne kot sredstva, a ne zadoščajo za srečo", ["sreča je le v bogastvu", "nimajo nobene vloge", "so pomembnejše od vrline"], "Težko je delovati lepo brez sredstev, prijateljev ali zdravja.", "visja"],
  ]);
}
