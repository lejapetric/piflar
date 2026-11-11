import { izbira, besedilo } from "../lib.mjs";

const PARI = [["kuhna", "kuhinja"], ["gvant", "obleka"], ["šraufciger", "izvijač"], ["glih", "ravno"], ["štuk", "kos"], ["flaša", "steklenica"], ["cajt", "čas"], ["luft", "zrak"], ["fertik", "gotov"], ["žnora", "vrvica"], ["cuker", "sladkor"], ["fajn", "lep"], ["špegel", "ogledalo"], ["firbec", "radovednost"], ["žlica", "žlica"]].filter(([a, b]) => a !== b);

export default function ({ serija, pojmi, vprasanja }) {
  serija("knjizno", 12, (r, i) => {
    const [n, k] = r.izberi(PARI);
    if (i % 3 === 2) return besedilo({ tezavnost: 3, sprejemljivi: [k], besedilo: `Zapiši knjižno ustreznico neknjižne besede »${n}«.`, rezultat: k, postopek: `<p>${n} → ${k}</p>` });
    return izbira({ r, tezavnost: 1, besedilo: `Katera je knjižna ustreznica neknjižne besede »${n}«?`, pravilna: k, napacne: r.premesaj(PARI.filter(([, x]) => x !== k).map(([, x]) => x)).slice(0, 3), postopek: `<p>${n} → ${k}</p>` });
  });
  serija("zvrst", 10, (r) => {
    const [p, odg] = r.izberi([["Jst ne vem, kva bo jutri.", "pogovorni jezik"], ["Spoštovani, vljudno vas vabimo na podelitev spričeval.", "knjižni jezik (zborni)"], ["Ta film je bil ful dober, brutalno!", "sleng"], ["Moramo zamenjati ležaj na kardanu.", "žargon (strokovni pogovorni)"], ["Postopek se začne z vložitvijo zahteve na upravni enoti.", "knjižni jezik (zborni)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V kateri jezikovni zvrsti je zapisano: »${p}«`, pravilna: odg, napacne: ["pogovorni jezik", "knjižni jezik (zborni)", "sleng", "žargon (strokovni pogovorni)"].filter((x) => x !== odg), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("funkcijska", 8, (r) => {
    const [p, odg] = r.izberi([["recept za palačinke", "praktičnosporazumevalna zvrst"], ["članek v znanstveni reviji", "strokovna (znanstvena) zvrst"], ["novica v dnevnem časopisu", "publicistična zvrst"], ["pesem v pesniški zbirki", "umetnostna zvrst"], ["vabilo na rojstnodnevno zabavo", "praktičnosporazumevalna zvrst"], ["učbenik za fiziko", "strokovna (znanstvena) zvrst"], ["televizijski komentar politike", "publicistična zvrst"], ["roman", "umetnostna zvrst"]]);
    return izbira({ r, tezavnost: 2, besedilo: `V katero funkcijsko zvrst spada: ${p}?`, pravilna: odg, napacne: ["praktičnosporazumevalna zvrst", "strokovna (znanstvena) zvrst", "publicistična zvrst", "umetnostna zvrst"].filter((x) => x !== odg), postopek: `<p>${p.charAt(0).toUpperCase() + p.slice(1)}: ${odg}.</p>` });
  });
  serija("narecje", 8, (r) => {
    const [k, odg] = r.izberi([["Murska Sobota", "panonska"], ["Ravne na Koroškem", "koroška"], ["Kobarid", "primorska"], ["Koper", "primorska"], ["Idrija", "rovtarska"], ["Cerkno", "rovtarska"], ["Kranj", "gorenjska"], ["Novo mesto", "dolenjska"], ["Celje", "štajerska"], ["Maribor", "štajerska"]]);
    return izbira({ r, tezavnost: 3, besedilo: `V katero narečno skupino spada govor okolice kraja ${k}?`, pravilna: odg, napacne: r.premesaj(["panonska", "koroška", "primorska", "rovtarska", "gorenjska", "dolenjska", "štajerska"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${k}: ${odg} narečna skupina.</p>` });
  });
  pojmi([
    ["knjižni jezik", "Nadnarečna, normirana zvrst jezika za javno sporazumevanje."],
    ["zborni jezik", "Najvišja različica knjižnega jezika za javne in uradne položaje."],
    ["knjižni pogovorni jezik", "Sproščena različica knjižnega jezika za manj uradne govorne položaje."],
    ["narečje", "Krajevna zvrst jezika, omejena na določeno območje."],
    ["pokrajinski pogovorni jezik", "Pogovorni jezik širšega območja s prvinami narečij."],
    ["sleng", "Interesna zvrst jezika, značilna za mlade ali zaključene skupine."],
    ["žargon", "Pogovorni jezik določene stroke ali poklica."],
    ["argo", "Skrivni jezik zaprte družbene skupine."],
    ["funkcijska zvrst", "Zvrst jezika glede na namen in področje rabe."],
    ["praktičnosporazumevalna zvrst", "Zvrst za vsakdanje sporazumevanje."],
    ["publicistična zvrst", "Zvrst jezika v sredstvih javnega obveščanja."],
    ["umetnostna zvrst", "Zvrst jezika v literarnih besedilih."],
    ["prevzeta beseda", "Beseda, ki je prišla v jezik iz drugega jezika."],
  ]);
  vprasanja([
    [2, "Koliko narečnih skupin ima slovenščina?", "sedem", ["tri", "štiri", "dvanajst"], "Koroška, primorska, rovtarska, gorenjska, dolenjska, štajerska in panonska (ter mešani kočevski govori)."],
    [3, "Kateri jezikovni priročnik določa knjižno normo zapisa?", "Slovenski pravopis", ["Slovar slovenskega knjižnega jezika", "Slovenska slovnica", "Etimološki slovar"], "Pravopis določa zapis in izgovor."],
    [4, "Zakaj v govornem nastopu pred razredom uporabljamo knjižni jezik?", "ker je položaj javen in naslovniki iz različnih krajev", ["ker je narečje prepovedano", "ker je knjižni jezik krajši", "ker je sleng nerazumljiv vsem"], "Izbira zvrsti je odvisna od govornega položaja.", "visja"],
    [4, "Zakaj je narečna raznolikost slovenščine tako velika?", "zaradi razgibanega reliefa, zgodovinske razdrobljenosti in stikov s sosednjimi jeziki", ["zaradi velikega števila govorcev", "zaradi poznega nastanka jezika", "zaradi knjižne norme"], "Na majhnem ozemlju je več kot 40 narečij.", "visja"],
  ]);
}
