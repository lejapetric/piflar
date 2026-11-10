import { skladateljiSerije } from "../glasba-lib.mjs";
export default function ({ serija, pojmi, vprasanja }) {
  skladateljiSerije(serija, {
    kdo: ["umetnik", "umetnika"],
    dela: [["Zamaknjenje sv. Terezije", "Gian Lorenzo Bernini"], ["kolonada na Trgu sv. Petra", "Gian Lorenzo Bernini"], ["San Carlo alle Quattro Fontane", "Francesco Borromini"], ["Poklicanje sv. Mateja", "Caravaggio"], ["Snemanje s križa (Antwerpen)", "Peter Paul Rubens"], ["Nočna straža", "Rembrandt van Rijn"], ["Dvorne dame (Las Meninas)", "Diego Velázquez"], ["Dekle z biserom", "Johannes Vermeer"], ["Robbov vodnjak (Vodnjak treh kranjskih rek)", "Francesco Robba"], ["poslikava stropa ljubljanske stolnice", "Giulio Quaglio"], ["stolnica sv. Nikolaja v Ljubljani", "Andrea Pozzo"]],
    osebe: [["Gian Lorenzo Bernini", "kipar in arhitekt rimskega baroka"], ["Francesco Borromini", "arhitekt valovitih fasad in zapletenih tlorisov"], ["Caravaggio", "slikar ostrih kontrastov svetlobe in teme (tenebrizem)"], ["Peter Paul Rubens", "flamski slikar razgibanih, polnih figur"], ["Rembrandt van Rijn", "nizozemski mojster svetlobe in avtoportretov"], ["Francesco Robba", "beneški kipar, ki je deloval v Ljubljani"], ["Giulio Quaglio", "freskant, ki je poslikal ljubljansko stolnico"], ["Diego Velázquez", "dvorni slikar španskega kralja Filipa IV."]],
  });
  pojmi([
    ["barok", "Slog 17. in 18. stoletja z gibanjem, kontrasti in čustveno močjo."],
    ["tenebrizem", "Slikanje z ostrimi kontrasti svetlobe na temnem ozadju."],
    ["iluzionizem", "Poslikava, ki ustvarja vtis resničnega prostora, npr. odprtega neba na stropu."],
    ["kvadratura", "Iluzionistično naslikana arhitektura na stropu ali steni."],
    ["valovita fasada", "Fasada z izmenično izbočenimi in vbočenimi deli."],
    ["rokoko", "Pozni, lahkotnejši in okrasnejši odvod baroka v 18. stoletju."],
    ["protireformacija", "Katoliška obnova po tridentinskem koncilu, ki je spodbujala barok."],
    ["Academia operosorum", "Ljubljansko društvo izobražencev (1693), ki je spodbujalo barok v Ljubljani."],
    ["tihožitje", "Slika nepremičnih predmetov, npr. sadja, cvetja, posode."],
    ["vanitas", "Tihožitje z motivi minljivosti, npr. lobanjo in svečo."],
  ]);
  vprasanja([
    [4, "Kako se barok razlikuje od renesanse?", "namesto ravnovesja in miru prinaša gibanje, diagonale in dramatične kontraste", ["vrača se k gotskim šilastim lokom", "zavrača svetlobne učinke", "uporablja le pravokotne tlorise"], "Wölfflin: linearno proti slikovitemu, zaprto proti odprtemu.", "visja"],
    [4, "Zakaj je Ljubljana okoli leta 1700 dobila baročno podobo?", "pobuda Academie operosorum je pripeljala italijanske umetnike (Pozzo, Quaglio, Robba)", ["zaradi potresa leta 1895", "zaradi Napoleona", "zaradi Plečnika"], "Stolnica, Uršulinska cerkev, Robbov vodnjak.", "visja"],
  ]);
}
