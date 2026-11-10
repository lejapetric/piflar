import { izbira, kolicina, besedilo } from "../lib.mjs";

const BESEDE = ["miza", "knjiga", "učitelj", "računalnik", "šola", "prijateljica", "avtomobil", "domovina", "matematika", "okno", "telefon", "pomaranča", "jabolko", "dežnik", "kolo", "televizija", "slovenščina", "stol", "nebotičnik", "univerza"];
const zlogi = (b) => (b.match(/[aeiou]/g) || []).length;
const VRSTE = { a: "samoglasnik", e: "samoglasnik", i: "samoglasnik", o: "samoglasnik", u: "samoglasnik", m: "zvočnik", n: "zvočnik", r: "zvočnik", l: "zvočnik", j: "zvočnik", v: "zvočnik", b: "nezvočnik", p: "nezvočnik", d: "nezvočnik", t: "nezvočnik", g: "nezvočnik", k: "nezvočnik", z: "nezvočnik", s: "nezvočnik", ž: "nezvočnik", š: "nezvočnik", c: "nezvočnik", č: "nezvočnik", f: "nezvočnik", h: "nezvočnik" };
const PARI = [["b", "p"], ["d", "t"], ["g", "k"], ["z", "s"], ["ž", "š"]];

export default function ({ serija, pojmi, vprasanja }) {
  serija("zlogi", 12, (r) => {
    const b = r.izberi(BESEDE), n = zlogi(b);
    return kolicina({ tezavnost: 1, vrednost: n, enota: "", besedilo: `Koliko zlogov ima beseda »${b}«?`, rezultat: `${n}`, postopek: `<p>Število zlogov je enako številu samoglasnikov: ${n}.</p>` });
  });
  serija("vrsta-glasu", 12, (r) => {
    const c = r.izberi(Object.keys(VRSTE)), odg = VRSTE[c];
    return izbira({ r, tezavnost: 2, besedilo: `V katero skupino glasov spada glas /${c}/?`, pravilna: odg, napacne: ["samoglasnik", "zvočnik", "nezvočnik"].filter((x) => x !== odg), postopek: `<p>Samoglasniki: a, e, i, o, u; zvočniki: m, n, r, l, j, v; ostali so nezvočniki. /${c}/: ${odg}.</p>` });
  });
  serija("par", 8, (r) => {
    const [zv, nz] = r.izberi(PARI), obrni = r.izberi([true, false]);
    const [g, odg] = obrni ? [nz, zv] : [zv, nz];
    return besedilo({ tezavnost: 2, sprejemljivi: [odg], besedilo: `Kateri je ${obrni ? "zveneči" : "nezveneči"} par glasu /${g}/?`, rezultat: `/${odg}/`, postopek: `<p>Zveneči/nezveneči pari: ${PARI.map(([a, b]) => `${a}–${b}`).join(", ")}.</p>` });
  });
  serija("konec", 10, (r) => {
    const [b, g] = r.izberi([["grad", "t"], ["led", "t"], ["zob", "p"], ["mraz", "s"], ["nož", "š"], ["sneg", "k"], ["hrib", "p"], ["voz", "s"], ["bog", "k"], ["sad", "t"], ["vrabec", "c"], ["glad", "t"]]);
    return besedilo({ tezavnost: 3, sprejemljivi: [g], besedilo: `Kateri glas izgovorimo na koncu besede »${b}«? (Vpiši eno črko.)`, rezultat: `/${g}/`, postopek: `<p>Na koncu besede pred premorom se zveneči nezvočniki izgovorijo nezveneče (razzvenečenje): ${b} → [${b.slice(0, -1)}${g}].</p>` });
  });
  serija("v-izgovor", 6, (r) => {
    const [b, odg] = r.izberi([["pravda", "[u̯] (dvoustnični)"], ["volk", "[v] (ustničnozobni)"], ["voda", "[v] (ustničnozobni)"], ["lev", "[u̯] (dvoustnični)"], ["vino", "[v] (ustničnozobni)"], ["sinov", "[u̯] (dvoustnični)"]]);
    return izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kako izgovorimo črko v v besedi »${b}«?`, pravilna: odg, napacne: ["[u̯] (dvoustnični)", "[v] (ustničnozobni)", "[f]"].filter((x) => x !== odg), postopek: `<p>Pred samoglasnikom izgovorimo [v], pred soglasnikom in na koncu besede [u̯]. ${b}: ${odg}.</p>` });
  });
  pojmi([
    ["glas", "Najmanjša slišna enota govora."],
    ["črka", "Pisni znak za glas."],
    ["fonem", "Najmanjša enota, ki razlikuje pomen besed."],
    ["zlog", "Del besede, ki se izgovori z enim izdihom in ima samoglasniško jedro."],
    ["naglas", "Poudarjenost zloga v besedi."],
    ["samoglasnik", "Glas, pri katerem zrak prosto teče skozi usta."],
    ["zvočnik", "Soglasnik, pri katerem je slišen predvsem glas (m, n, r, l, j, v)."],
    ["nezvočnik", "Soglasnik, pri katerem je slišen predvsem šum."],
    ["razzvenečenje", "Izgovor zvenečega nezvočnika kot nezvenečega."],
    ["polglasnik", "Nenaglašeni kratki samoglasnik, npr. v besedi »pes«."],
    ["intonacija", "Spreminjanje tonske višine v povedi."],
    ["pravorečje", "Pravila knjižnega izgovora."],
    ["abeceda", "Urejen niz črk pisave."],
  ]);
  vprasanja([
    [1, "Koliko črk ima slovenska abeceda?", { vpis: ["25"] }, [], "a, b, c, č, d, e, f, g, h, i, j, k, l, m, n, o, p, r, s, š, t, u, v, z, ž."],
    [3, "Kako izgovorimo besedo »vrabec« pred besedo »je« (vrabec je)?", "[vrabec je]", ["[vrabez je]", "[urabec je]", "[vrapec je]"], "Pred zvočnikom se c ne spremeni."],
    [4, "Zakaj izgovorimo »od tega« kot [ot tega]?", "ker se zveneči d pred nezvenečim t prilagodi (premena po zvenečnosti)", ["ker je d na koncu besede", "zaradi naglasa", "zaradi narečja"], "Nezvočniki se prilagajajo naslednjemu nezvočniku.", "visja"],
    [4, "Koliko samoglasniških fonemov ima knjižna slovenščina v naglašenih zlogih?", "osem", ["pet", "šest", "deset"], "a, ẹ, ê, i, ọ, ô, u in polglasnik.", "visja"],
  ]);
}
