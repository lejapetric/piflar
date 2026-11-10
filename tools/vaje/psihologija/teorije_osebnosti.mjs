import { izbira } from "../lib.mjs";
const AV = [["id, ego in superego", "Freud"], ["dimenziji ekstravertnost–introvertnost in nevroticizem", "Eysenck"], ["osebnost kot skupek naučenih vedenj, oblikovanih z okrepitvami", "Skinner"], ["hierarhija potreb in samoaktualizacija", "Maslow"], ["osebnostni konstrukti, s katerimi razlagamo svet", "Kelly"], ["mesto nadzora (notranje ali zunanje)", "Rotter"], ["samoučinkovitost in modelno učenje", "Bandura"], ["kolektivno nezavedno in arhetipi", "Jung"], ["brezpogojno sprejemanje in skladnost jaza", "Rogers"], ["občutek manjvrednosti in težnja po moči", "Adler"]];
const OBR = [["Dijak, ki ni bil sprejet v ekipo, reče, da tako ali tako ni hotel igrati.", "racionalizacija"], ["Delavec, ki ga je okaral šef, doma kriči na psa.", "premestitev"], ["Človek, ki sovraži sodelavca, verjame, da sodelavec sovraži njega.", "projekcija"], ["Odrasel človek ob stresu začne sesati palec.", "regresija"], ["Oseba ne verjame diagnozi resne bolezni.", "zanikanje"], ["Mladostnik agresivnost usmeri v boks.", "sublimacija"], ["Človek se ne spomni travmatičnega dogodka iz otroštva.", "potlačitev"], ["Oseba, ki čuti nesprejemljivo sovraštvo, je do te osebe pretirano prijazna.", "reakcijska tvorba"]];
const OBRI = [...new Set(OBR.map(([, o]) => o))];
export default function ({ serija, pojmi, vprasanja }) {
  serija("avtor", 20, (r, i) => {
    const [poj, av] = AV[i % 10];
    if (i < 10) return izbira({ r, tezavnost: 2, besedilo: `Kateri avtor je povezan s pojmom: ${poj}?`, pravilna: av, napacne: r.premesaj(AV.filter(([, a]) => a !== av).map(([, a]) => a)).slice(0, 3), postopek: `<p>${av}: ${poj}.</p>` });
    return izbira({ r, tezavnost: 3, besedilo: `S čim je v teoriji osebnosti povezan ${av}?`, pravilna: poj, napacne: r.premesaj(AV.filter(([, a]) => a !== av).map(([p]) => p)).slice(0, 3), postopek: `<p>${av}: ${poj}.</p>` });
  });
  serija("obramba", 8, (r, i) => izbira({ r, tezavnost: 4, raven: "visja", besedilo: `Kateri obrambni mehanizem opisuje primer: ${OBR[i][0]}`, pravilna: OBR[i][1], napacne: r.premesaj(OBRI.filter((x) => x !== OBR[i][1])).slice(0, 3), postopek: `<p>${OBR[i][1]}.</p>` }));
  pojmi([
    ["id", "Po Freudu nezavedni del osebnosti, ki deluje po načelu ugodja."],
    ["ego", "Po Freudu del osebnosti, ki deluje po načelu realnosti in usklajuje zahteve."],
    ["superego", "Po Freudu ponotranjene moralne norme, vest."],
    ["nezavedno", "Duševne vsebine, ki se jih ne zavedamo, a vplivajo na vedenje."],
    ["libido", "Po Freudu življenjska, spolna energija."],
    ["Ojdipov kompleks", "Po Freudu v falični fazi otrokova navezanost na starša nasprotnega spola."],
    ["mesto nadzora", "Prepričanje, ali izid dogodkov nadzorujemo sami ali zunanje sile."],
    ["samoučinkovitost", "Prepričanje, da lahko uspešno opravimo določeno nalogo."],
  ]);
  vprasanja([
    [3, "Kakšen je vrstni red psihoseksualnih faz po Freudu?", "oralna, analna, falična, latentna, genitalna", ["analna, oralna, genitalna, falična, latentna", "oralna, falična, analna, genitalna, latentna", "latentna, oralna, analna, falična, genitalna"], "Faze so poimenovane po delih telesa, na katere je usmerjen libido."],
    [4, "Kaj je glavna kritika Freudove teorije?", "težko jo je empirično preveriti ali ovreči", ["preveč temelji na eksperimentih", "zanemarja otroštvo", "je preveč optimistična"], "Pojmi, kot je nezavedno, niso neposredno merljivi.", "visja"],
  ]);
}
