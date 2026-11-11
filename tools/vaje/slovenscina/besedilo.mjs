import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("vrsta", 14, (r) => {
    const [d, odg] = r.izberi([["Pisec naslovniku sporoči, kje in kdaj bo prireditev, ter ga povabi nanjo.", "vabilo"], ["Pisec se zaradi neprimernega ravnanja opraviči.", "opravičilo"], ["Pisec ustanovo vljudno zaprosi za potrdilo.", "prošnja"], ["Pisec po kronološkem zaporedju predstavi svojo izobrazbo in delovne izkušnje.", "življenjepis"], ["Novinar na kratko poroča o aktualnem dogodku (kdo, kaj, kje, kdaj).", "novica"], ["Novinar postavlja vprašanja znani osebi in zapiše odgovore.", "intervju"], ["Pisec predstavi svoje stališče in ga utemeljuje.", "mnenje (komentar)"], ["Pisec po korakih navede, kako kaj naredimo.", "navodilo"], ["Pisec izrazi nezadovoljstvo s kupljenim izdelkom in zahteva popravilo.", "reklamacija"], ["Pisec oceni knjigo ali film in utemelji oceno.", "ocena (recenzija)"], ["Kratek zapis, ki naslovnike obvesti o spremembi urnika.", "obvestilo"]]);
    const vse = ["vabilo", "opravičilo", "prošnja", "življenjepis", "novica", "intervju", "mnenje (komentar)", "navodilo", "reklamacija", "ocena (recenzija)", "obvestilo"];
    return izbira({ r, tezavnost: 1, besedilo: `Katero besedilno vrsto opisuje: ${d}`, pravilna: odg, napacne: r.premesaj(vse.filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("razvijanje", 10, (r) => {
    const [d, odg] = r.izberi([["Zjutraj sem vstal, se umil in odšel v šolo.", "pripovedovanje"], ["Hiša ima rdečo streho, dva balkona in velik vrt.", "opisovanje"], ["Mavrica nastane, ker se svetloba v kapljicah lomi in odbija.", "razlaganje"], ["Menim, da bi morali šolo začeti pozneje, saj so dijaki zjutraj utrujeni.", "utemeljevanje (argumentiranje)"], ["Najprej segrej pečico, nato vmešaj moko.", "opisovanje postopka"], ["Kit je sesalec, ki živi v morju in diha s pljuči.", "razlaganje"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kateri način razvijanja teme prevladuje: »${d}«`, pravilna: odg, napacne: ["pripovedovanje", "opisovanje", "razlaganje", "utemeljevanje (argumentiranje)", "opisovanje postopka"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("uradni", 8, (r) => {
    const [d, odg] = r.izberi([["Kaj pišemo v uradnem dopisu levo zgoraj?", "naslov pošiljatelja"], ["Kako začnemo uradno pismo neznanemu naslovniku?", "Spoštovani,"], ["Kaj napišemo pred podpisom v uradnem dopisu?", "Lep pozdrav"], ["Kam v uradnem dopisu zapišemo zadevo?", "pred nagovorom"]]);
    return izbira({ r, tezavnost: 2, besedilo: d, pravilna: odg, napacne: ["naslov pošiljatelja", "Spoštovani,", "Lep pozdrav", "pred nagovorom", "Živijo,"].filter((x) => x !== odg).slice(0, 3), postopek: `<p>${odg}.</p>` });
  });
  serija("povezovalnost", 6, (r) => {
    const [d, odg] = r.izberi([["Kupil sem kolo. To kolo je zeleno.", "ponovitev"], ["Kupil sem kolo. Bicikel je zelen.", "sopomenka"], ["Kupil sem kolo. Je zeleno.", "zaimek ali izpust"], ["Kupil sem jabolka in hruške. Sadje je bilo sveže.", "nadpomenka"]]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kako je v besedilu »${d}« izraženo ponovljeno (že znano)?`, pravilna: odg, napacne: ["ponovitev", "sopomenka", "zaimek ali izpust", "nadpomenka"].filter((x) => x !== odg), postopek: `<p>Navezovanje: ${odg}.</p>` });
  });
  pojmi([
    ["besedilo", "Sporočilo, ki je pomensko in slovnično povezano ter zaokroženo."],
    ["besedilna vrsta", "Skupina besedil z enakim namenom in zgradbo, npr. prošnja."],
    ["sovisnost", "Pomenska in slovnična povezanost delov besedila."],
    ["zgradba besedila", "Razporeditev uvoda, jedra in zaključka."],
    ["tema", "Kar je v besedilu ali povedi že znano."],
    ["rema", "Kar je v povedi novo."],
    ["neumetnostno besedilo", "Besedilo, ki sporoča o resničnem svetu."],
    ["umetnostno besedilo", "Besedilo, ki ustvarja domišljijski svet."],
    ["uradno besedilo", "Besedilo za javne ali poslovne položaje z ustaljeno obliko."],
    ["subjektivno besedilo", "Besedilo, v katerem sporočevalec izraža svoj odnos."],
    ["povzetek", "Krajše besedilo, ki zajame bistvo izhodiščnega besedila."],
    ["argument", "Razlog, s katerim podpremo trditev."],
    ["javno besedilo", "Besedilo, namenjeno širši javnosti."],
  ]);
  vprasanja([
    [2, "Kateri del besedila vsebuje najpomembnejše podatke pri novici?", "začetek (vodilo)", ["konec", "naslov ni pomemben", "zadnji odstavek"], "Novica je zgrajena po načelu obrnjene piramide."],
    [3, "Katera trditev velja za povzetek?", "zajema bistvene podatke izhodiščnega besedila brez osebnega mnenja", ["vsebuje svoje mnenje", "je daljši od izhodiščnega besedila", "dobesedno prepiše vse povedi"], "Povzetek je objektiven in jedrnat."],
    [4, "Kako se razlikujeta trditev in argument?", "argument podpira trditev z razlogom ali dokazom", ["argument je vedno daljši", "trditev je vedno vprašanje", "razlike ni"], "Trditev je stališče, argument jo utemeljuje.", "visja"],
    [4, "Zakaj je v uradnem besedilu pomembna jezikovna doslednost?", "ker zagotavlja nedvoumnost in verodostojnost", ["ker je besedilo krajše", "ker je obvezna raba slenga", "zaradi rime"], "Uradno besedilo mora biti jasno in natančno.", "visja"],
  ]);
}
