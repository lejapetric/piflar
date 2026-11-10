import { kolicina, izbira, T } from "../lib.mjs";
const PD = [["delavec v tovarni", "delo"], ["stroj za pakiranje", "kapital"], ["njiva", "zemlja (naravni viri)"], ["nafta v tleh", "zemlja (naravni viri)"], ["ustanoviteljica novega podjetja", "podjetništvo"], ["računalnik v pisarni", "kapital"], ["programer", "delo"], ["gozd", "zemlja (naravni viri)"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("dejavnik", 8, (r, i) => izbira({ r, tezavnost: 1, besedilo: `Kateri produkcijski dejavnik je ${PD[i][0]}?`, pravilna: PD[i][1], napacne: ["delo", "kapital", "zemlja (naravni viri)", "podjetništvo"].filter((x) => x !== PD[i][1]), postopek: `<p>${PD[i][0]}: ${PD[i][1]}.</p>` }));
  serija("oportunitetni", 14, (r, i) => {
    const a = r.int(2, 9) * 10, b = r.int(2, 9) * 10, A = r.izberi(["žita", "avtomobilov", "računalnikov"]), B = r.izberi(["tekstila", "pohištva", "koles"]);
    if (A === B) return null;
    const k = b / a;
    if (i % 2) return kolicina({ tezavnost: 4, raven: "visja", vrednost: a / b, tol: 0.01, enota: "", besedilo: `Gospodarstvo lahko proizvede največ ${a} enot ${A} ali največ ${b} enot ${B} (linearna KPM). Kolikšen je oportunitetni strošek ene enote ${B}, izražen v enotah ${A}?`, rezultat: T(a / b, 2), postopek: `<p>Za ${b} enot ${B} se odpovemo ${a} enotam ${A}: \\(\\frac{${a}}{${b}} = ${T(a / b, 2)}\\).</p>` });
    return kolicina({ tezavnost: 3, vrednost: k, tol: 0.01, enota: "", besedilo: `Gospodarstvo lahko proizvede največ ${a} enot ${A} ali največ ${b} enot ${B} (linearna KPM). Kolikšen je oportunitetni strošek ene enote ${A}, izražen v enotah ${B}?`, rezultat: T(k, 2), postopek: `<p>Za ${a} enot ${A} se odpovemo ${b} enotam ${B}: \\(\\frac{${b}}{${a}} = ${T(k, 2)}\\).</p>` });
  });
  pojmi([
    ["potreba", "Občutek pomanjkanja, ki ga želimo odpraviti."],
    ["dobrina", "Sredstvo, ki zadovoljuje človekove potrebe."],
    ["prosta dobrina", "Dobrina, ki je je dovolj za vse in nima cene, npr. zrak."],
    ["ekonomska dobrina", "Redka dobrina, ki jo je treba proizvesti in ima ceno."],
    ["redkost", "Temeljni ekonomski problem: potrebe so neomejene, viri pa omejeni."],
    ["oportunitetni strošek", "Vrednost najboljše alternative, ki se ji odpovemo z izbiro."],
    ["krivulja proizvodnih možnosti", "Prikaz največjih kombinacij dveh dobrin, ki jih gospodarstvo lahko proizvede z danimi viri."],
    ["produkcijski dejavniki", "Viri za proizvodnjo: delo, kapital, zemlja in podjetništvo."],
    ["tržno gospodarstvo", "Gospodarstvo, v katerem o proizvodnji odločajo trg in cene."],
    ["plansko gospodarstvo", "Gospodarstvo, v katerem o proizvodnji odloča država z načrtom."],
    ["mešano gospodarstvo", "Gospodarstvo, ki združuje trg in državno usmerjanje."],
    ["mikroekonomija", "Del ekonomije, ki proučuje odločitve gospodinjstev, podjetij in posameznih trgov."],
    ["makroekonomija", "Del ekonomije, ki proučuje gospodarstvo kot celoto."],
    ["delitev dela", "Specializacija delavcev na posamezne delovne naloge."],
  ]);
  vprasanja([
    [3, "Kaj pomeni točka znotraj krivulje proizvodnih možnosti?", "neizkoriščene ali neučinkovito uporabljene vire", ["nedosegljivo proizvodnjo", "najučinkovitejšo proizvodnjo", "gospodarsko rast"], "Točke na krivulji so učinkovite, zunaj nje nedosegljive."],
    [4, "Kaj povzroči premik celotne krivulje proizvodnih možnosti navzven?", "gospodarska rast, npr. več kapitala ali boljša tehnologija", ["višja cena dobrin", "brezposelnost", "premik vzdolž krivulje"], "Večje zmogljivosti gospodarstva.", "visja"],
    [4, "Zakaj je krivulja proizvodnih možnosti običajno konkavna (izbočena navzven)?", "ker viri niso enako primerni za obe dobrini, zato oportunitetni strošek narašča", ["ker so viri neomejeni", "ker cene padajo", "ker je oportunitetni strošek stalen"], "Zakon naraščajočih oportunitetnih stroškov.", "visja"],
  ]);
}
