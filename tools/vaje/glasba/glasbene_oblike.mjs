import { izbira } from "../lib.mjs";
const OB = [["A B A", "tridelna pesemska oblika"], ["A B A C A", "rondo"], ["A A1 A2 A3", "variacije"], ["ekspozicija, izpeljava, repriza", "sonatna oblika"], ["A B", "dvodelna pesemska oblika"], ["A B A C A B A", "rondo"]];
const ZV = [["Večstavčna skladba za orkester, navadno v štirih stavkih.", "simfonija"], ["Skladba za solista in orkester, navadno v treh stavkih.", "koncert"], ["Večglasna imitacijska skladba, v kateri tema prehaja med glasovi.", "fuga"], ["Zaporedje stiliziranih plesov.", "suita"], ["Glasbeno-scensko delo s petjem, igro in orkestrom.", "opera"], ["Obsežna vokalno-inštrumentalna skladba z versko vsebino brez scenske izvedbe.", "oratorij"], ["Skladba za en ali dva inštrumenta v več stavkih, navadno v sonatni obliki.", "sonata"], ["Pesem za glas in klavir na umetniško besedilo.", "samospev"], ["Glasbeno-scensko delo s plesom brez petja.", "balet"], ["Uvodna orkestrska skladba k operi.", "uvertura"]];
export default function ({ serija, pojmi, vprasanja }) {
  serija("shema", 6, (r, i) => izbira({ r, tezavnost: 2, besedilo: `Katera oblika ima zgradbo <em>${OB[i][0]}</em>?`, pravilna: OB[i][1], napacne: r.premesaj([...new Set(OB.map(([, o]) => o))].filter((x) => x !== OB[i][1])).slice(0, 3), postopek: `<p>${OB[i][0]}: ${OB[i][1]}.</p>` }));
  serija("zvrst", 20, (r, i) => {
    const [op, z] = ZV[i % 10];
    if (i < 10) return izbira({ r, tezavnost: 2, besedilo: `Katero glasbeno zvrst opisuje: ${op}`, pravilna: z, napacne: r.premesaj(ZV.filter(([, x]) => x !== z).map(([, x]) => x)).slice(0, 3), postopek: `<p>${z}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `Kaj je značilno za zvrst <em>${z}</em>?`, pravilna: op, napacne: r.premesaj(ZV.filter(([, x]) => x !== z).map(([x]) => x)).slice(0, 3), postopek: `<p>${z}: ${op}</p>` });
  });
  pojmi([
    ["motiv", "Najmanjša prepoznavna glasbena misel."],
    ["fraza", "Glasbena misel, primerljiva z delom povedi."],
    ["perioda", "Zaključena glasbena misel iz dveh stavkov, navadno po osem taktov."],
    ["tema", "Osrednja glasbena misel skladbe, ki se razvija."],
    ["ekspozicija", "Prvi del sonatne oblike, v katerem se predstavita temi."],
    ["izpeljava", "Osrednji del sonatne oblike, v katerem se temi razvijata."],
    ["repriza", "Ponovitev ekspozicije v sonatni obliki, obe temi v osnovnem tonovskem načinu."],
    ["koda", "Sklepni del skladbe ali stavka."],
    ["refren", "Ponavljajoči se del v rondoju ali pesmi."],
    ["arija", "Spevna samospevna točka v operi ali oratoriju."],
    ["recitativ", "Govorno petje, ki poganja dejanje v operi."],
    ["libreto", "Besedilo opere."],
  ]);
  vprasanja([
    [4, "Kakšno je tipično zaporedje stavkov klasične simfonije?", "hiter – počasen – menuet (scherzo) – hiter", ["počasen – hiter – počasen – hiter", "hiter – hiter – hiter – počasen", "menuet – hiter – počasen – fuga"], "Beethoven je menuet nadomestil s scherzom.", "visja"],
    [4, "Kaj sta dux in comes v fugi?", "nastop teme in njen odgovor v drugem glasu, navadno na kvinti", ["dva stavka sonate", "solist in orkester", "arija in recitativ"], "Dux (vodja), comes (spremljevalec).", "visja"],
  ]);
}
