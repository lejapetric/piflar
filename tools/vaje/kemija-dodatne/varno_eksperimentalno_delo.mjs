import { T } from "../lib.mjs";
const x = String.raw;
export default [
  { t: 4, b: x`Snov ima \(\mathrm{LD_{50}} = 200\ \mathrm{mg/kg}\) (podgana, oralno). Pri kolikšni masi zaužite snovi bi za \(70\)-kilogramskega človeka (ob enaki občutljivosti) obstajala \(50\)-odstotna verjetnost smrti? (v g)`, v: 14, enota: "g",
    rez: x`\(14\ \mathrm g\)`, post: x`<p>\(200\ \mathrm{mg/kg} \cdot 70\ \mathrm{kg} = 14\,000\ \mathrm{mg} = 14\ \mathrm g\)</p>` },
  { t: 4, b: x`Katero metodo izberemo za ločevanje zmesi dveh mešljivih tekočin z vreliščema \(78\ ^\circ\mathrm C\) in \(100\ ^\circ\mathrm C\)?`, p: "frakcionirno destilacijo", n: ["filtracijo", "lij ločnik", "kristalizacijo"],
    post: x`<p>Tekočini se mešata, zato lij ločnik ne pride v poštev. Vrelišči sta si dovolj blizu, da je za dobro ločbo potrebna frakcionirna kolona.</p>` },
  { t: 4, b: x`Pri raziskavi vpliva temperature na hitrost raztapljanja sladkorja je katera spremenljivka odvisna?`, p: "čas raztapljanja (hitrost)", n: ["temperatura", "masa sladkorja", "prostornina vode"],
    post: x`<p>Neodvisna je temperatura (jo spreminjamo), odvisna je hitrost raztapljanja (jo merimo), masa in prostornina sta kontrolirani.</p>` },
  { t: 4, b: x`Kako ločimo zmes kuhinjske soli, peska in joda?`, p: "sublimacija joda, raztapljanje soli v vodi, filtracija peska, uparevanje filtrata", n: ["samo filtracija", "destilacija celotne zmesi", "lij ločnik in nato filtracija"],
    post: x`<p>Jod pri segrevanju sublimira. Preostanku dodamo vodo: sol se raztopi, pesek odfiltriramo, iz filtrata z uparevanjem dobimo sol.</p>` },
  { t: 4, b: x`Katera dva piktograma nevarnosti sta na steklenici koncentrirane dušikove(V) kisline?`, p: "jedko in oksidativno", n: ["vnetljivo in strupeno", "eksplozivno in vnetljivo", "nevarno za okolje in plin pod tlakom"],
    post: x`<p>Koncentrirana \(\mathrm{HNO_3}\) razjeda kožo in kovine (jedko, GHS05) ter je močan oksidant, ki lahko vžge organske snovi (plamen nad krogom, GHS03).</p>` },
];
