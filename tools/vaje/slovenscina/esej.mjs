import { izbira } from "../lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  serija("del", 12, (r) => {
    const [d, odg] = r.izberi([["predstavitev teme in teze", "uvod"], ["utemeljevanje z argumenti in primeri iz besedil", "jedro"], ["povzetek ugotovitev in sklep", "zaključek"], ["navezava na izhodiščno vprašanje", "uvod"], ["primerjava dveh književnih oseb", "jedro"], ["odgovor na izhodiščno tezo in sklepna misel", "zaključek"]]);
    return izbira({ r, tezavnost: 1, besedilo: `V kateri del eseja spada: ${d}?`, pravilna: odg, napacne: ["uvod", "jedro", "zaključek"].filter((x) => x !== odg), postopek: `<p>${d.charAt(0).toUpperCase() + d.slice(1)}: ${odg}.</p>` });
  });
  serija("argument", 12, (r) => {
    const [d, odg] = r.izberi([["Navedemo verze iz pesmi.", "navedek (citat)"], ["Opišemo prizor iz romana, ki potrdi trditev.", "primer iz besedila"], ["Primerjamo ravnanje dveh oseb.", "primerjava"], ["Sklicujemo se na mnenje literarnega zgodovinarja.", "argument avtoritete"], ["Povežemo dogajanje z zgodovinskimi okoliščinami.", "umestitev v kontekst"], ["Iz več primerov izpeljemo splošno ugotovitev.", "posploševanje (indukcija)"]]);
    return izbira({ r, tezavnost: 2, besedilo: `Kakšen način utemeljevanja je: »${d}«`, pravilna: odg, napacne: r.premesaj(["navedek (citat)", "primer iz besedila", "primerjava", "argument avtoritete", "umestitev v kontekst", "posploševanje (indukcija)"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  serija("napaka", 12, (r) => {
    const [d, odg] = r.izberi([["Dijak obnovi celotno zgodbo, ne odgovori pa na vprašanje.", "obnova namesto interpretacije"], ["Dijak piše »ful dobro« in »ziher«.", "neknjižni jezik"], ["Dijak trdi nekaj, kar v besedilu ne piše.", "neutemeljena trditev"], ["Dijak piše o drugem delu kot zahteva naslov.", "zgrešena tema"], ["Odstavki niso povezani in si sledijo brez reda.", "nepovezanost (slaba zgradba)"], ["Dijak zamenja imena oseb.", "vsebinska napaka"]]);
    return izbira({ r, tezavnost: 3, besedilo: `Katera napaka je v eseju: ${d}`, pravilna: odg, napacne: r.premesaj(["obnova namesto interpretacije", "neknjižni jezik", "neutemeljena trditev", "zgrešena tema", "nepovezanost (slaba zgradba)", "vsebinska napaka"].filter((x) => x !== odg)).slice(0, 3), postopek: `<p>${odg.charAt(0).toUpperCase() + odg.slice(1)}.</p>` });
  });
  pojmi([
    ["esej", "Razpravljalno besedilo, v katerem pisec utemeljuje svoje razmišljanje."],
    ["teza", "Osrednja trditev, ki jo pisec utemeljuje."],
    ["argument", "Razlog ali dokaz, ki podpre trditev."],
    ["interpretacija", "Razlaga pomena besedila."],
    ["navedek", "Dobesedno navedeno besedilo v narekovajih."],
    ["obnova", "Pripoved vsebine brez razlage."],
    ["razpravljalni esej", "Esej, v katerem pisec razpravlja o problemu na podlagi besedil."],
    ["primerjalni esej", "Esej, ki primerja dve deli ali osebi."],
    ["miselni vzorec", "Grafični načrt idej pred pisanjem."],
    ["sovisnost", "Povezanost povedi in odstavkov v celoto."],
    ["odstavek", "Vsebinska enota besedila z eno glavno mislijo."],
  ]);
  vprasanja([
    [2, "Koliko časa je na maturi na voljo za pisanje eseja?", "120 minut", ["60 minut", "90 minut", "180 minut"], "Esej je del prve pole."],
    [3, "Kaj je bistvo dobrega maturitetnega eseja?", "utemeljeno odgovarjanje na izhodiščna vprašanja z navezavo na besedili", ["čim daljša obnova", "čim več tujk", "pisanje o svojih počitnicah"], "Ocenjujejo se vsebina, zgradba in jezik."],
    [4, "Kako preprečimo, da bi esej postal obnova?", "vsak opis dogodka povežemo s trditvijo in razlago", ["izpustimo vse primere", "pišemo le v prvi osebi", "uporabimo samo navedke"], "Primer + razlaga + povezava s tezo.", "visja"],
    [4, "Zakaj je v zaključku eseja dobro odgovoriti na izhodiščno tezo?", "ker zaokroži razmišljanje in pokaže, da je pisec odgovoril na vprašanje", ["ker mora biti zaključek najdaljši", "ker tam navedemo nove argumente", "ker se tam obnovi zgodba"], "Zaključek povzema, ne odpira novih tem.", "visja"],
  ]);
}
