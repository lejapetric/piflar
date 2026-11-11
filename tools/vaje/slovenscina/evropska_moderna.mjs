import { literarneSerije } from "../slovenscina-lib.mjs";

export default function ({ serija, pojmi, vprasanja }) {
  literarneSerije(serija, {
    dela: [["Rože zla", "Charles Baudelaire", "pesniška zbirka"], ["Pijani čoln", "Arthur Rimbaud", "pesem"], ["Jesenska pesem", "Paul Verlaine", "pesem"], ["Slika Doriana Graya", "Oscar Wilde", "roman"], ["Galeb", "Anton Pavlovič Čehov", "drama"], ["Gospodična Julija", "August Strindberg", "drama"], ["Modra ptica", "Maurice Maeterlinck", "drama"], ["Lakota", "Knut Hamsun", "roman"], ["Samoglasniki", "Arthur Rimbaud", "pesem"], ["Korespondence", "Charles Baudelaire", "pesem"]],
    osebe: [["Charles Baudelaire", "je začetnik moderne poezije in »prekleti pesnik«"], ["Arthur Rimbaud", "je kot najstnik napisal vse svoje pesmi"], ["Paul Verlaine", "je zahteval »glasbo pred vsem drugim«"], ["Oscar Wilde", "je bil dandy in zagovornik larpurlartizma"], ["August Strindberg", "je švedski dramatik ekspresionističnih iger"]],
  });
  pojmi([
    ["moderna", "Obdobje ob koncu 19. in začetku 20. stoletja, ki se odmika od realizma."],
    ["simbolizem", "Smer, ki z namigi in simboli izraža skrite resničnosti."],
    ["dekadenca", "Smer, ki izraža občutek propadanja in utrujenosti."],
    ["impresionizem", "Smer, ki zapisuje trenutne vtise in razpoloženja."],
    ["larpurlartizem", "Načelo »umetnost zaradi umetnosti«."],
    ["sinestezija", "Prepletanje čutnih zaznav, npr. »zvonka barva«."],
    ["prekleti pesniki", "Francoski pesniki, ki so se upirali meščanski družbi."],
    ["nova romantika", "Smer, ki obuja romantično čustvenost in hrepenenje."],
    ["prosti verz", "Verz brez stalne mere in rime."],
    ["esteticizem", "Postavljanje lepote nad moralo."],
    ["dandy", "Eleganten, prefinjen moški, ki ceni slog nad vsem."],
  ]);
  vprasanja([
    [3, "Kaj se dogaja s portretom Doriana Graya?", "portret se stara in kaže njegove grehe, Dorian pa ostaja mlad", ["portret izgine", "Dorian se spremeni v portret", "portret oživi in ga ubije takoj"], "Simbol razkola med videzom in moralo."],
    [4, "Kaj izraža Baudelairova pesem Korespondence?", "povezanost čutnih vtisov in skritih pomenov narave (sinestezija)", ["ljubezen do Pariza", "politični upor", "nostalgijo po otroštvu"], "Narava je »tempelj« simbolov.", "visja"],
    [4, "Kako je moderna odgovorila na realizem?", "namesto objektivnega prikaza je poudarila subjektivno doživljanje in simbole", ["poudarila je znanstveni opis", "vrnila se je k antičnim pravilom", "odpravila je poezijo"], "Notranji svet, razpoloženje, simbol.", "visja"],
  ]);
}
