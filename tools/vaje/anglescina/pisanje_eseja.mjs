// Naloge za esej korak za korakom (stran public/views/anglescina/snov/pisanje_eseja/).
import { izbira } from "../lib.mjs";
import { vrzeli } from "../jezik-lib.mjs";

const DELI = [
  ["Over the past decade, social media have become an inseparable part of teenagers' lives.", "uvod: ozadje teme"],
  ["I firmly believe that their disadvantages outweigh their benefits.", "uvod: teza"],
  ["In my view, tourism brings more advantages than disadvantages, provided that it is carefully managed.", "uvod: teza"],
  ["The most serious problem is the impact on mental health.", "jedro: topic sentence"],
  ["Another problem is stress.", "jedro: topic sentence"],
  ["On the other hand, mass tourism can damage the very places that attract visitors.", "jedro: topic sentence"],
  ["Several studies have linked heavy use of social media with anxiety and low self-esteem.", "jedro: primer ali dejstvo"],
  ["Photos posted at the age of fifteen can be seen by future employers.", "jedro: primer ali dejstvo"],
  ["To sum up, the damage social media cause to mental health, concentration and privacy is far greater.", "zaključek"],
  ["All things considered, its economic and cultural benefits are greater.", "zaključek"],
  ["Written exams have been the main way of assessing students for generations.", "uvod: ozadje teme"],
  ["Last but not least, written exams cannot measure many essential skills, such as teamwork.", "jedro: topic sentence"],
];
const IMENA = ["uvod: ozadje teme", "uvod: teza", "jedro: topic sentence", "jedro: primer ali dejstvo", "zaključek"];

const FORMALNO = [
  ["A lot of teenagers don't sleep enough.", "Many teenagers do not get enough sleep.", ["Lots of teens don't sleep enough.", "Loads of kids don't sleep enough.", "A lot of teens can't sleep enough, right?"]],
  ["Kids spend loads of time on their phones.", "Young people spend a great deal of time on their phones.", ["Kids spend tons of time on phones.", "Children spend a lot of time on their phones, you know.", "Kids are always on their phones!"]],
  ["Things are getting worse in big cities.", "The situation in large cities is deteriorating.", ["Stuff is getting worse in big cities.", "Big cities are getting really bad.", "Things in big cities aren't great."]],
  ["You can see that tourism is good for the economy.", "It is clear that tourism benefits the economy.", ["You can see tourism is good for money.", "Tourism is really good for the economy, isn't it?", "Tourism is super good for the economy."]],
  ["So, exams are kind of stressful.", "Therefore, exams can be extremely stressful.", ["So, exams are pretty stressful.", "Exams are, like, stressful.", "So exams are stressful, I guess."]],
  ["Isn't it terrible that people throw rubbish everywhere?!", "Littering is a serious problem.", ["People throw rubbish everywhere, it's terrible!", "Throwing rubbish everywhere is awful, right?", "It's so terrible that people litter."]],
  ["I think that I think social media are bad.", "It could be argued that social media are harmful.", ["I think social media are bad, I think.", "Social media are bad, I reckon.", "In my opinion I think social media are bad."]],
  ["It's not OK to use animals for testing make-up.", "Testing cosmetics on animals is unacceptable.", ["It's not OK to test make-up on animals.", "Testing make-up on animals isn't cool.", "Using animals for make-up is so wrong!"]],
  ["Lots of people can't find a job.", "A large number of people are unable to find employment.", ["Loads of people can't get a job.", "Lots of people have no job, sadly.", "Tons of people can't find work."]],
  ["Recycling gets better if people help.", "Recycling improves when people cooperate.", ["Recycling gets way better if people help.", "Recycling is better when people help out.", "People should help recycling get better, OK?"]],
];

const PRAVILA = [
  ["Koliko besed ima esej na osnovni ravni (pola 3B OR)?", "220–250", ["120–150", "150–180", "250–300"], 1],
  ["Koliko besed ima esej na temo iz književnosti (pola 3B VR)?", "250–300", ["220–250", "150–180", "300–350"], 1],
  ["Kje mora biti teza argumentativnega eseja?", "v uvodu", ["v zaključku", "v prvem odstavku jedra", "kjerkoli, da je le jasna"], 1],
  ["Koliko odstavkov mora imeti esej najmanj?", "tri (uvod, jedro, zaključek)", ["dva", "pet", "en, če je dovolj dolg"], 1],
  ["Kaj se zgodi, če je esej predolg?", "točk zaradi dolžine ne izgubiš, a se oceni celotno besedilo", ["izgubiš točko za vsakih 10 besed", "ocenijo samo prvih 250 besed", "esej je ocenjen z 0 točkami"], 2],
  ["Kaj se zgodi, če je esej prekratek?", "izgubiš točke pri vsebini in posledično pri drugih merilih", ["ne izgubiš točk, če je dober", "izgubiš točke samo pri besedišču", "esej ni ocenjen"], 2],
  ["Česa zaključek ne sme vsebovati?", "nove ideje ali vidika, ki ga v jedru ni bilo", ["povezovalca", "ponovljene teze", "povzetka argumentov"], 2],
  ["Kaj je pri eseju iz književnosti nesprejemljivo?", "obnova vsebine, podatki o avtorju in osebne izkušnje", ["kratki navedki iz dela", "interpretacija likov", "uporaba present simple"], 3, "visja"],
  ["Kaj mora vsebovati vsak odstavek jedra?", "topic sentence, ki jo razvije in podpre", ["vprašanje bralcu", "osebno zgodbo", "ponovitev uvoda"], 2],
  ["Ali smeš v argumentativnem eseju predstaviti le eno stran?", "da, a moraš jasno zavzeti stališče", ["ne, vedno obe strani", "ne, vedno samo svojo", "samo na višji ravni"], 2],
  ["Kakšen naj bo slog eseja?", "formalen ali nevtralen", ["pogovoren", "pesniški", "kakršenkoli, da je pravilen"], 1],
  ["Kaj pomeni »dejstva pred mnenjem«?", "mnenje izpelješ iz dejstev, ki si jih prej predstavil", ["dejstev ne smeš navajati", "mnenje napišeš v uvodu, dejstva v zaključku", "mnenja v eseju ne sme biti"], 3],
  ["Kateri čas uporabljaš za dogajanje v književnem delu?", "present simple", ["past perfect", "present continuous", "future simple"], 3, "visja"],
  ["Kaj v uvodu eseja iz književnosti zahtevajo navodila?", "jasno zastavljene parametre, ki jih razvije jedro", ["kratek življenjepis avtorja", "povzetek cele zgodbe", "osebno izkušnjo"], 3, "visja"],
];

export default function ({ serija }) {
  serija("del", DELI.length, (r, i) => {
    const [p, k] = DELI[i];
    return izbira({ r, tezavnost: 2, besedilo: `Kateri del eseja je ta poved? <em>${p}</em>`, pravilna: k, napacne: r.premesaj(IMENA.filter((x) => x !== k)).slice(0, 3), postopek: `<p>${k.charAt(0).toUpperCase() + k.slice(1)}.</p>` });
  });
  serija("formalno", FORMALNO.length, (r, i) => {
    const [ne, da, nap] = FORMALNO[i];
    return izbira({ r, tezavnost: 2, besedilo: `Katera poved je v formalnem slogu, primernem za esej? (Izhodišče: <em>${ne}</em>)`, pravilna: da, napacne: nap, postopek: `<p><em>${da}</em></p><p>Brez okrajšav, pogovornih besed (<em>a lot of, kids, stuff</em>), nagovora bralca in klicajev.</p>` });
  });
  serija("pravila", PRAVILA.length, (r, i) => {
    const [v, o, n, t, rav] = PRAVILA[i];
    return izbira({ r, tezavnost: rav ? 4 : t, ...(rav ? { raven: "visja" } : {}), besedilo: v, pravilna: o, napacne: n, postopek: `<p>${o.charAt(0).toUpperCase() + o.slice(1)}.</p>` });
  });
  vrzeli(serija, "povezovalci", [
    ["Tourists spend money in hotels. ___, they help to preserve heritage.", ["In addition", "Moreover", "Furthermore"], ["However", "Although", "Despite"], "Dodajanje nove prednosti: In addition / Moreover.", 2],
    ["Exams are objective. ___, they mainly test memory.", ["Nevertheless", "However"], ["Moreover", "Therefore", "Because"], "Nasprotje na začetku povedi: Nevertheless / However.", 2],
    ["It is ___ that exams are objective, but they ignore many skills.", "true", ["right", "sure", "real"], "Priznanje: It is true that…", 2],
    ["Students check their phones while studying. As a ___, they remember less.", "result", ["consequence of", "reason", "cause"], "As a result = posledično.", 2],
    ["___ sum up, social media do more harm than good.", "To", ["For", "In", "At"], "To sum up = če povzamem.", 1],
    ["All things ___, tourism is more of a blessing than a curse.", "considered", ["considering", "consider", "thought"], "All things considered = vse skupaj gledano.", 3],
    ["___ being objective, written exams are not the best way of measuring knowledge.", ["Despite", "In spite of"], ["Although", "However", "Even though"], "Despite + -ing.", 3],
    ["Many skills, ___ teamwork and creativity, cannot be tested on paper.", "such as", ["for example of", "like as", "as such"], "such as pred primeri.", 2],
    ["___ but not least, exams cannot measure creativity.", "Last", ["Least", "Lastly", "At last"], "Last but not least = nazadnje, a ne najmanj pomembno.", 2],
    ["Tourism brings benefits, ___ it is carefully managed.", ["provided that", "as long as"], ["unless", "despite", "in case"], "provided that / as long as = pod pogojem, da.", 3],
    ["My sister prefers written tests, ___ I prefer projects.", ["whereas", "while"], ["despite", "however", "because of"], "whereas primerja dve nasprotji.", 3],
    ["The milk is reserved for the pigs, and Squealer ___ that they need it.", "explains", ["explained to", "is explaining that", "explain"], "Za dogajanje v književnem delu: present simple.", 4, "visja"],
    ["The final commandment ___ that the original ideal has been betrayed.", "reveals", ["revealed", "is revealing", "reveal"], "Glagoli interpretacije: reveals, suggests, shows.", 4, "visja"],
    ["Through the transformation of the pigs, Orwell ___ that power corrupts.", "suggests", ["suggested to", "is suggesting", "suggest"], "Avtor v delu nekaj sugerira: present simple.", 4, "visja"],
  ]);
}
