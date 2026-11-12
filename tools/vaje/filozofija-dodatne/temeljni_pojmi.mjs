export default [
  { t: 4, b: "Kakšna je razlika med deduktivnim in induktivnim sklepanjem?", p: "deduktivni sklep iz resničnih premis nujno vodi do resničnega sklepa; induktivni le verjetno posploši iz posameznih primerov", n: ["deduktivni gre od posameznega k splošnemu, induktivni obratno, oba nujno", "oba sta enako gotova", "induktivni sklep je vedno napačen"],
    post: "<p>Humov problem indukcije: iz preteklih opazovanj ne moremo nujno sklepati o prihodnjih.</p>" },
  { t: 4, b: "Kaj je a priori spoznanje?", p: "spoznanje, ki je veljavno neodvisno od izkustva (npr. matematične resnice)", n: ["spoznanje, pridobljeno s čutnim zaznavanjem", "spoznanje, ki je vedno napačno", "spoznanje iz zgodovinskih virov"],
    post: "<p>A posteriori spoznanje izhaja iz izkustva. Kant uvede še sintetične sodbe a priori.</p>" },
  { t: 4, b: "Kateri sklep je logično neveljaven? <em>Vsi ljudje so smrtni. Sokrat je smrten. Torej je Sokrat človek.</em>", p: "ta, ker je napaka potrjevanja posledice: smrtnost ne zadošča za človeškost", n: ["sklep je veljaven", "sklep je veljaven, a premisa je napačna", "sklep je induktiven in zato veljaven"],
    post: "<p>Iz »vsi A so B« in »x je B« ne sledi »x je A«. Tudi pes je smrten, a ni človek.</p>" },
  { t: 4, b: "Kaj pomeni, da je trditev analitična?", p: "njena resničnost izhaja iz pomena pojmov (npr. »Vsak samec je neporočen«)", n: ["resnična je le na podlagi izkušnje", "je vedno napačna", "nanaša se na zgodovinske dogodke"],
    post: "<p>Analitične sodbe ne razširjajo spoznanja; sintetične (npr. »Ta miza je rjava«) povedo kaj novega o predmetu.</p>" },
];
