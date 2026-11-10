import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("naklon-povedi", 10, (r) => {
    const [p, odg] = r.izberi([["Danes je lep dan.", "pripovedna poved"], ["Ali greš jutri z nami?", "vprašalna poved"], ["Zapri vrata!", "velelna poved"], ["Ko bi le bil že petek!", "želelna poved"], ["Kje si bil včeraj?", "vprašalna poved"], ["Prinesi mi zvezek.", "velelna poved"], ["Naj bo jutri sončno!", "želelna poved"], ["Vlak odpelje ob sedmih.", "pripovedna poved"], ["Pospravi sobo, prosim.", "velelna poved"], ["Kdaj se začne predstava?", "vprašalna poved"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Katera vrsta povedi je: »${p}«`, pravilna: odg, napacne: ["pripovedna poved", "vprašalna poved", "velelna poved", "želelna poved"].filter((x) => x !== odg), postopek: `<p>»${p}« je ${odg}.</p>` });
  });
  serija("namen", 10, (r) => {
    const [p, odg] = r.izberi([["Ali mi lahko posodiš svinčnik?", "prošnja"], ["Opravičujem se za zamudo.", "opravičilo"], ["Jutri bo pouk odpadel.", "obvestilo"], ["Lepo, da si prišel!", "izražanje čustev (zadovoljstva)"], ["Takoj zapusti učilnico!", "ukaz"], ["Hvala za pomoč.", "zahvala"], ["Dober dan, gospa Novak.", "pozdrav"], ["Predlagam, da gremo v kino.", "predlog"], ["Kaj misliš o tem filmu?", "spraševanje po mnenju"]]);
    const vse = ["prošnja", "opravičilo", "obvestilo", "izražanje čustev (zadovoljstva)", "ukaz", "zahvala", "pozdrav", "predlog", "spraševanje po mnenju"];
    return izbira({ r, tezavnost: 2, besedilo: `Kaj je sporočevalčev namen v povedi: »${p}«`, pravilna: odg, napacne: r.premesaj(vse.filter((x) => x !== odg)).slice(0, 3), postopek: `<p>Namen: ${odg}.</p>` });
  });
  serija("vloga", 8, (r) => {
    const [s, k, odg] = r.izberi([["Učitelj razlaga snov dijakom.", "dijaki", "naslovnik"], ["Učitelj razlaga snov dijakom.", "učitelj", "sporočevalec"], ["Mama pošlje hčeri SMS.", "SMS (telefon)", "prenosnik"], ["Mama pošlje hčeri SMS.", "mama", "sporočevalec"], ["Novinar po radiu poroča poslušalcem.", "radio", "prenosnik"], ["Novinar po radiu poroča poslušalcem.", "poslušalci", "naslovnik"], ["Dijakinja napiše pismo babici.", "babica", "naslovnik"], ["Dijakinja napiše pismo babici.", "dijakinja", "sporočevalec"]]);
    return izbira({ r, tezavnost: 1, besedilo: `Kakšno vlogo ima »${k}« v sporazumevalnem položaju: ${s}`, pravilna: odg, napacne: ["sporočevalec", "naslovnik", "prenosnik", "sporočilo"].filter((x) => x !== odg), postopek: `<p>${k.charAt(0).toUpperCase() + k.slice(1)}: ${odg}.</p>` });
  });
  serija("neubeseden", 6, (r) => {
    const [p, odg] = r.izberi([["kimanje z glavo", "kretnja (gib glave)"], ["nasmeh", "mimika"], ["glasen in hiter govor", "spremljevalni glasovni znaki"], ["oddaljenost med sogovorcema", "prostorska razdalja (proksemika)"], ["prometni znak", "neubesedeni znak (simbol)"], ["oblačila", "videz"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katero skupino neubesedenih sporočil spada: ${p}?`, pravilna: odg, napacne: r.premesaj(["kretnja (gib glave)", "mimika", "spremljevalni glasovni znaki", "prostorska razdalja (proksemika)", "neubesedeni znak (simbol)", "videz"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${p.charAt(0).toUpperCase() + p.slice(1)}: ${odg}.</p>` });
  });
  pojmi([
    ["jezik", "Sistem znakov in pravil za njihovo povezovanje, ki omogoča sporazumevanje."],
    ["sporazumevanje", "Izmenjava sporočil med sporočevalcem in naslovnikom."],
    ["sporočevalec", "Kdor sporočilo tvori in posreduje."],
    ["naslovnik", "Kdor sporočilo sprejema."],
    ["prenosnik", "Sredstvo ali pot, po kateri sporočilo potuje."],
    ["govorni položaj", "Okoliščine, v katerih poteka sporazumevanje."],
    ["jezikovni znak", "Beseda kot povezava izraza (oblike) in pomena."],
    ["neubesedeno sporazumevanje", "Sporazumevanje brez besed, npr. s kretnjami in mimiko."],
    ["sporazumevalna zmožnost", "Zmožnost tvorjenja in razumevanja besedil v različnih položajih."],
    ["dvogovor", "Sporazumevanje, pri katerem se vlogi sporočevalca in naslovnika izmenjujeta."],
    ["enogovor", "Sporazumevanje, pri katerem govori le en sporočevalec."],
    ["materinščina", "Jezik, ki ga človek najprej usvoji v otroštvu."],
    ["uradni jezik", "Jezik, ki ga država uporablja v javnem življenju."],
  ]);
  vprasanja([
    [2, "Kateri jezik je v Sloveniji poleg slovenščine uradni na narodnostno mešanih območjih?", "italijanščina in madžarščina", ["nemščina in hrvaščina", "angleščina", "srbščina"], "Ustava zagotavlja pravice italijanski in madžarski narodni skupnosti."],
    [3, "Kakšen je jezikovni znak glede na povezavo med obliko in pomenom?", "dogovorjen (arbitraren)", ["naraven", "vedno slikovit", "nespremenljiv"], "Med glasovi besede in predmetom ni naravne povezave."],
    [4, "Kaj pomeni, da je sporazumevanje uspešno?", "naslovnik je sporočilo razumel tako, kot ga je sporočevalec nameraval", ["sporočevalec je govoril glasno", "uporabljena je bila knjižna zvrst", "sporočilo je bilo dolgo"], "Uspešnost presojamo po namenu in razumevanju.", "visja"],
    [4, "Zakaj je slovenščina v Italiji, Avstriji in na Madžarskem manjšinski jezik?", "ker tam živijo avtohtone slovenske narodne skupnosti", ["ker je tam uradni državni jezik", "ker se je tam uči večina", "ker je to jezik EU"], "Zamejski Slovenci.", "visja"],
  ]);
}
