// Višja raven, listki 26–47 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, vr, q, ref } from "./lib.mjs";

const AB = R`\overrightarrow{AB}`, AD = R`\overrightarrow{AD}`, EF = R`\overrightarrow{EF}`, BC = R`\overrightarrow{BC}`, SE = R`\overrightarrow{SE}`;

export default [
  vr(26, [
    ref(26, 1),
    ref(26, 2),
    q(2, "Opišite zvezo med stopinjami in radiani. Koliko stopinj meri en radian?",
      R`<p>Iztegnjeni kot meri \(180^\circ = \pi\) rad, zato je \[\alpha_{\text{rad}} = \frac{\pi}{180^\circ}\,\alpha^\circ, \qquad \alpha^\circ = \frac{180^\circ}{\pi}\,\alpha_{\text{rad}}.\] En radian meri \(\frac{180^\circ}{\pi} \approx 57.3^\circ \approx 57^\circ 18'\).</p>`),
    q(1, "Koliko radianov merijo koti 30°, 45°, 60° in 90°?",
      R`<p>\(30^\circ = \frac{\pi}{6}\), \(45^\circ = \frac{\pi}{4}\), \(60^\circ = \frac{\pi}{3}\), \(90^\circ = \frac{\pi}{2}\).</p>`),
    ref(26, 6),
  ]),
  vr(27, [
    ref(27, 1),
    ref(27, 2),
    q(1, "Kolikšna je vsota notranjih kotov trikotnika?",
      R`<p>\(\alpha + \beta + \gamma = 180^\circ\).</p>`),
    q(2, "Kolikšna je vsota zunanjih kotov trikotnika? Trditev dokažite.",
      R`<p>\(\alpha' + \beta' + \gamma' = 360^\circ\).</p>
<p>Dokaz: zunanji in pripadajoči notranji kot sta sokota, zato \(\alpha' = 180^\circ - \alpha\) in podobno. Seštejemo: \(\alpha' + \beta' + \gamma' = 540^\circ - (\alpha + \beta + \gamma) = 540^\circ - 180^\circ = 360^\circ\).</p>`),
  ]),
  vr(28, [
    ref(28, 1),
    q(3, "Kako poiščemo središče trikotniku očrtane krožnice, središče trikotniku včrtane krožnice in višinsko točko?",
      R`<ul><li><b>Središče očrtane krožnice</b> je presečišče simetral stranic (vsaka točka simetrale je enako oddaljena od krajišč stranice, zato je presečišče enako oddaljeno od vseh treh oglišč).</li>
<li><b>Središče včrtane krožnice</b> je presečišče simetral notranjih kotov (točke simetrale kota so enako oddaljene od obeh krakov, zato je presečišče enako oddaljeno od vseh treh stranic).</li>
<li><b>Višinska točka</b> je presečišče nosilk višin (pravokotnic iz oglišč na nosilke nasprotnih stranic).</li></ul>
<p>V vseh primerih zadošča narisati dve premici; tretja gre skozi isto točko.</p>`),
    q(1, "V kakšnem razmerju težišče deli težiščnice?",
      R`<p>V razmerju \(2 : 1\), merjeno od oglišča: razdalja od oglišča do težišča je \(\frac{2}{3}\) težiščnice.</p>`),
  ]),
  vr(29, [
    ref(29, 1),
    ref(29, 2),
    q(1, "V paralelogramu narišemo eno diagonalo. Dokažite, da sta tako dobljena trikotnika skladna.",
      R`<p>Paralelogram \(ABCD\) z diagonalo \(AC\) razpade na \(\triangle ABC\) in \(\triangle CDA\). Velja \(AB = CD\) in \(BC = DA\) (nasprotni stranici paralelograma sta enaki), \(AC\) je skupna stranica. Po izreku SSS sta trikotnika skladna.</p>`),
  ]),
  vr(30, [
    ref(30, 1),
    ref(30, 2),
    q(2, "V pravokotnem trikotniku narišemo višino na hipotenuzo. Koliko podobnih trikotnikov nastane? Dokažite Evklidov ali višinski izrek.",
      R`<p>Višina \(v_c\) razdeli \(\triangle ABC\) (pravi kot pri \(C\)) na \(\triangle ADC\) in \(\triangle CDB\) (\(D\) je nožišče). Vsi <b>trije</b> trikotniki so si podobni (izrek KK: vsak ima pravi kot, \(\triangle ADC\) in \(\triangle ABC\) imata skupen kot \(\alpha\), \(\triangle CDB\) in \(\triangle ABC\) skupen kot \(\beta\)).</p>
<p>Hipotenuzo razdeli \(D\) na odseka \(a_1 = DB\) in \(b_1 = AD\).</p>
<p><b>Evklidov izrek:</b> iz \(\triangle CDB \sim \triangle ABC\) je \(\frac{a_1}{a} = \frac{a}{c}\), torej \(a^2 = c\,a_1\) (in podobno \(b^2 = c\,b_1\)).</p>
<p><b>Višinski izrek:</b> iz \(\triangle ADC \sim \triangle CDB\) je \(\frac{v_c}{b_1} = \frac{a_1}{v_c}\), torej \(v_c^2 = a_1 b_1\).</p>`,
      R`<p>Pri podobnosti je ključno pravilno ujemanje oglišč. V \(\triangle CDB\) je kot pri \(B\) enak \(\beta\), pravi kot je pri \(D\), kot pri \(C\) pa \(90^\circ - \beta = \alpha\). V \(\triangle ADC\) je pri \(A\) kot \(\alpha\), pri \(D\) pravi kot, pri \(C\) kot \(\beta\).</p>
<p>Za Evklidov izrek primerjamo \(\triangle CDB\) z \(\triangle ACB\): kateta ob \(\beta\) proti hipotenuzi: \(\frac{DB}{CB} = \frac{CB}{AB}\), tj. \(\frac{a_1}{a} = \frac{a}{c}\).</p>
<p>Za višinski izrek primerjamo \(\triangle ADC\) in \(\triangle CDB\): kateta nasproti kota \(\alpha\) proti kateti ob njem: \(\frac{CD}{AD} = \frac{DB}{CD}\).</p>
<p>Iz Evklidovega izreka sledi Pitagorov: \(a^2 + b^2 = c(a_1 + b_1) = c^2\).</p>`),
  ]),
  vr(31, [
    ref(31, 1),
    ref(31, 2),
    ref(31, 3, 1),
    q(2, "Dokažite, da se diagonali v rombu sekata pod pravim kotom.",
      R`<p>V rombu \(ABCD\) so vse stranice enake. Oglišči \(B\) in \(D\) sta enako oddaljeni od \(A\) in od \(C\) (\(AB = AD\), \(CB = CD\)), zato obe ležita na simetrali daljice \(AC\). Diagonala \(BD\) je torej simetrala daljice \(AC\), zato je pravokotna nanjo.</p>`,
      R`<p>Drug dokaz z vektorji: naj bo \(\vec a = \overrightarrow{AB}\), \(\vec b = \overrightarrow{AD}\), \(|\vec a| = |\vec b|\). Diagonali sta \(\vec a + \vec b\) in \(\vec b - \vec a\), njun skalarni produkt pa \((\vec a + \vec b) \cdot (\vec b - \vec a) = |\vec b|^2 - |\vec a|^2 = 0\).</p>
<p>Lahko tudi s skladnostjo: diagonali se v paralelogramu razpolavljata v točki \(S\); trikotnika \(ABS\) in \(ADS\) sta skladna (SSS), zato sta kota pri \(S\) enaka, hkrati pa sokota, torej \(90^\circ\).</p>`),
  ]),
  vr(32, [
    ref(32, 1),
    ref(32, 2),
    ref(32, 3),
    ref(32, 4),
    q(2, "Kako v trapezu z znanimi stranicami izračunamo njegovo višino?",
      R`<p>Trapez \(ABCD\) z osnovnicama \(a > c\) in krakoma \(b, d\). Skozi \(C\) narišemo vzporednico kraku \(d\). Odreže trikotnik s stranicami \(a - c\), \(b\), \(d\), ki ima isto višino \(v\) kot trapez.</p>
<p>Ploščino tega trikotnika izračunamo s Heronovo formulo (\(s = \frac{a - c + b + d}{2}\)), višina pa je \[v = \frac{2S}{a - c}.\]</p>`,
      R`<p>Primer: \(a = 10\), \(c = 4\), \(b = 5\), \(d = 5\). Trikotnik ima stranice \(6, 5, 5\), \(s = 8\), \(S = \sqrt{8 \cdot 2 \cdot 3 \cdot 3} = 12\), \(v = \frac{24}{6} = 4\).</p>
<p>Drugače: nožišči višin iz \(C\) in \(D\) razdelita \(a\) na odseke \(x\), \(c\), \(a - c - x\). Iz Pitagore \(d^2 - x^2 = v^2 = b^2 - (a - c - x)^2\) izračunamo \(x\) in nato \(v\). Pri enakokrakem trapezu je \(x = \frac{a - c}{2}\).</p>`),
  ]),
  vr(33, [
    ref(33, 1),
    q(3, "Opišite konstrukcijo tangente na krožnico skozi dano točko zunaj krožnice.",
      R`<p>Dana je krožnica \(k(S, r)\) in točka \(T\) zunaj nje.</p>
<ol><li>Narišemo daljico \(ST\) in poiščemo njeno razpolovišče \(P\) (s simetralo).</li>
<li>Narišemo Talesovo krožnico s središčem \(P\) in polmerom \(PS\).</li>
<li>Ta seka krožnico \(k\) v dotikališčih \(D_1\) in \(D_2\).</li>
<li>Premici \(TD_1\) in \(TD_2\) sta iskani tangenti.</li></ol>`,
      R`<p>Zakaj deluje? Tangenta je pravokotna na polmer v dotikališču, torej mora biti kot \(\angle SDT = 90^\circ\). Po Talesovem izreku so vse točke, iz katerih vidimo daljico \(ST\) pod pravim kotom, na krožnici nad premerom \(ST\). Dotikališče mora ležati na obeh krožnicah, zato je presečišče.</p>
<p>Iz točke zunaj krožnice vedno obstajata dve tangenti in odseka \(TD_1 = TD_2\) sta enako dolga (\(= \sqrt{|ST|^2 - r^2}\)).</p>`),
  ]),
  vr(34, [
    ref(34, 1),
    q(1, "V kakšni zvezi sta, če ležita nad istim lokom v krogu?",
      R`<p>Središčni kot je dvakrat večji od obodnega: \(\alpha = 2\beta\). Vsi obodni koti nad istim lokom so enaki.</p>`),
    ref(34, 3),
    q(1, "Kako uporabimo Talesov izrek pri konstrukciji pravokotnega trikotnika s podano hipotenuzo in višino na hipotenuzo?",
      R`<p>Narišemo hipotenuzo \(AB = c\) in nad njo Talesovo krožnico (središče v razpolovišču, polmer \(\frac{c}{2}\)). Na razdalji \(v_c\) narišemo vzporednico \(AB\). Presečišče vzporednice s Talesovo krožnico je oglišče \(C\) (pravi kot je zagotovljen s Talesovim izrekom). Rešitev obstaja, če je \(v_c \le \frac{c}{2}\).</p>`),
  ]),
  vr(35, [
    ref(35, 1),
    ref(35, 2),
    q(2, "Dokažite enega izmed zgornjih izrekov.",
      R`<p><b>Sinusni izrek</b> \(\frac{a}{\sin\alpha} = \frac{b}{\sin\beta}\): višina \(v_c\) iz oglišča \(C\) je kateta v dveh pravokotnih trikotnikih, zato \(v_c = b\sin\alpha\) in \(v_c = a\sin\beta\). Sledi \(b\sin\alpha = a\sin\beta\), torej \(\frac{a}{\sin\alpha} = \frac{b}{\sin\beta}\). Enako z drugo višino dobimo še \(\frac{c}{\sin\gamma}\).</p>`,
      R`<p>Pri topem kotu \(\alpha\) leži nožišče višine zunaj trikotnika; tedaj je \(v_c = b\sin(180^\circ - \alpha) = b\sin\alpha\), zato dokaz velja tudi tam.</p>
<p><b>Kosinusni izrek</b> \(c^2 = a^2 + b^2 - 2ab\cos\gamma\) najlepše dokažemo z vektorji: \(\vec c = \vec a - \vec b\) (stranici iz oglišča \(C\)), zato \[c^2 = (\vec a - \vec b)^2 = a^2 - 2\vec a \cdot \vec b + b^2 = a^2 + b^2 - 2ab\cos\gamma.\]</p>`),
  ]),
  vr(36, [
    q(1, "Navedite formulo za izračun ploščine trikotnika, če poznamo vse tri njegove stranice.",
      R`<p>Heronova formula: \(S = \sqrt{s(s - a)(s - b)(s - c)}\), kjer je \(s = \frac{a + b + c}{2}\) polovični obseg.</p>`),
    q(1, "Navedite formulo za izračun ploščine paralelograma, če poznamo njegovi stranici in kot med njima.",
      R`<p>\(S = ab\sin\alpha\).</p>`),
    q(2, "Navedite formulo za izračun ploščine deltoida in jo dokažite.",
      R`<p>\(S = \frac{ef}{2}\), kjer sta \(e\) in \(f\) diagonali.</p>
<p>Dokaz: diagonali deltoida sta pravokotni. Simetrijska diagonala \(e\) razdeli deltoid na dva skladna trikotnika z osnovnico \(e\) in višino \(\frac{f}{2}\). Torej \(S = 2 \cdot \frac{e \cdot \frac{f}{2}}{2} = \frac{ef}{2}\).</p>`),
    q(2, "Navedite formulo za izračun ploščine trapeza in jo dokažite.",
      R`<p>\(S = \frac{a + c}{2}\,v\).</p>
<p>Dokaz: diagonala \(AC\) razdeli trapez na trikotnika \(ABC\) (osnovnica \(a\)) in \(ACD\) (osnovnica \(c\)), ki imata oba višino \(v\) (razdaljo med vzporednima osnovnicama). \(S = \frac{av}{2} + \frac{cv}{2} = \frac{a + c}{2}\,v\).</p>`),
  ]),
  vr(37, [
    q(2, "Navedite formulo za izračun ploščine romba in jo dokažite.",
      R`<p>\(S = av = a^2\sin\alpha = \frac{ef}{2}\).</p>
<p>Dokaz \(\frac{ef}{2}\): diagonali romba sta pravokotni in se razpolavljata. Diagonala \(e\) razdeli romb na dva skladna trikotnika z osnovnico \(e\) in višino \(\frac{f}{2}\): \(S = 2 \cdot \frac{e \cdot \frac{f}{2}}{2} = \frac{ef}{2}\). (\(S = av\) velja, ker je romb paralelogram.)</p>`),
    q(1, "Izpeljite formulo za izračun višine enakostraničnega trikotnika.",
      R`<p>Višina razpolovi stranico. Po Pitagori: \(v^2 + \left(\frac{a}{2}\right)^2 = a^2\), \(v^2 = \frac{3a^2}{4}\), \(v = \frac{a\sqrt{3}}{2}\).</p>`),
    q(1, "Navedite formulo za izračun ploščine enakostraničnega trikotnika.",
      R`<p>\(S = \frac{a \cdot v}{2} = \frac{a^2\sqrt{3}}{4}\).</p>`),
    q(2, "Zapišite in utemeljite formulo za ploščino pravilnega n-kotnika, ki je včrtan krogu s polmerom R.",
      R`<p>\[S = \frac{n R^2}{2}\sin\frac{2\pi}{n} = \frac{n R^2}{2}\sin\frac{360^\circ}{n}.\]</p>
<p>Utemeljitev: zveznice središča z oglišči razdelijo \(n\)-kotnik na \(n\) skladnih enakokrakih trikotnikov s krakoma \(R\) in kotom med njima \(\frac{360^\circ}{n}\). Ploščina enega je \(\frac{1}{2}R^2\sin\frac{360^\circ}{n}\), pomnožimo z \(n\).</p>`,
      R`<p>Preverimo za kvadrat (\(n = 4\)): \(S = 2R^2\sin 90^\circ = 2R^2\), kar se ujema, ker je diagonala kvadrata \(2R\) in \(S = \frac{(2R)^2}{2}\).</p>
<p>Za šestkotnik (\(n = 6\)): \(S = 3R^2\sin 60^\circ = \frac{3\sqrt{3}}{2}R^2\) (šest enakostraničnih trikotnikov s stranico \(R\)).</p>
<p>Ko \(n\) narašča, gre \(S\) proti ploščini kroga \(\pi R^2\).</p>`),
  ]),
  vr(38, [
    ref(38, 1, 1),
    q(1, "Izpeljite formulo za izračun dolžine krožnega loka.",
      R`<p>Dolžina loka je sorazmerna s središčnim kotom. Celemu kotu \(360^\circ\) pripada obseg \(2\pi r\), zato kotu \(\alpha\): \[l = \frac{2\pi r\,\alpha}{360^\circ} = \frac{\pi r \alpha}{180^\circ},\] v radianih \(l = r\alpha\).</p>`),
    q(2, "Kaj je krožni odsek? Opišite postopek za izračun njegove ploščine.",
      R`<p>Krožni odsek je del kroga med tetivo in pripadajočim lokom.</p>
<p>Ploščina = ploščina krožnega izseka − ploščina enakokrakega trikotnika s krakoma \(r\) in vrhom v središču: \[S = \frac{\pi r^2 \alpha}{360^\circ} - \frac{r^2\sin\alpha}{2}.\] (Za odsek nad lokom, večjim od polkroga, trikotnik prištejemo.)</p>`),
    q(2, "Izpeljite formulo za izračun ploščine krožnega izseka.",
      R`<p>Ploščina izseka je sorazmerna s središčnim kotom. Celemu krogu (\(360^\circ\)) pripada \(\pi r^2\), zato \[S = \frac{\pi r^2 \alpha}{360^\circ} = \frac{r^2\alpha}{2}\ (\alpha \text{ v radianih}) = \frac{l\,r}{2}.\]</p>`),
  ]),
  vr(39, [
    ref(39, 1),
    ref(39, 2),
    q(1, "Navedite formuli za izračun prostornine in površine pokončne prizme.",
      R`<p>\(V = O \cdot v\), \(P = 2O + pl\), kjer je \(O\) ploščina osnovne ploskve, \(v\) višina, plašč \(pl = o \cdot v\) (\(o\) je obseg osnovne ploskve).</p>`),
    q(1, "Izpeljite formulo za izračun prostornine pravilne enakorobe šeststrane prizme.",
      R`<p>Osnovna ploskev je pravilni šestkotnik s stranico \(a\), sestavljen iz šestih enakostraničnih trikotnikov: \(O = 6 \cdot \frac{a^2\sqrt{3}}{4} = \frac{3a^2\sqrt{3}}{2}\). Enakoroba: \(v = a\). \[V = O v = \frac{3\sqrt{3}}{2}a^3.\]</p>`),
  ]),
  vr(40, [
    q(2, "Opišite pokončni valj. Narišite njegovo mrežo.",
      R`<p>Pokončni valj je geometrijsko telo, ki ga omejujeta dva skladna vzporedna kroga (osnovni ploskvi) in plašč; os (zveznica središč osnovnih ploskev) je pravokotna na osnovni ploskvi. Nastane z vrtenjem pravokotnika okoli ene stranice.</p>
<p>Mreža: pravokotnik s stranicama \(2\pi r\) in \(v\) (razgrnjen plašč) in dva kroga s polmerom \(r\), ki se pravokotnika dotikata na nasprotnih straneh.</p>`),
    ref(40, 3),
    q(2, "Izpeljite formulo za izračun površine valja.",
      R`<p>Površina je vsota dveh osnovnih ploskev in plašča. Osnovna ploskev je krog: \(O = \pi r^2\). Razgrnjen plašč je pravokotnik, katerega ena stranica je obseg osnovne ploskve \(2\pi r\), druga višina \(v\): \(pl = 2\pi r v\). \[P = 2\pi r^2 + 2\pi r v = 2\pi r(r + v).\]</p>`),
    ref(40, 5),
  ]),
  vr(41, [
    ref(41, 1),
    ref(41, 2),
    ref(41, 3),
    ref(41, 4),
    q(1, "Izrazite površino pravilne 6-strane piramide z osnovnim robom a in višino piramide v.",
      R`<p>Osnovna ploskev: \(O = \frac{3a^2\sqrt{3}}{2}\). Višina stranske ploskve: razdalja od središča šestkotnika do stranice je \(\frac{a\sqrt{3}}{2}\), zato \(v_a = \sqrt{v^2 + \frac{3a^2}{4}}\).</p>
<p>\[P = \frac{3a^2\sqrt{3}}{2} + 6 \cdot \frac{a v_a}{2} = \frac{3a^2\sqrt{3}}{2} + 3a\sqrt{v^2 + \frac{3a^2}{4}}.\]</p>`),
  ]),
  vr(42, [
    ref(42, 1),
    ref(42, 2),
    ref(42, 3),
    q(2, "Povejte in utemeljite formulo za površino plašča.",
      R`<p>\(pl = \pi r s\), kjer je \(s\) stranica (izvodnica) stožca.</p>
<p>Utemeljitev: razgrnjen plašč je krožni izsek s polmerom \(s\), katerega lok je enak obsegu osnovne ploskve \(l = 2\pi r\). Ploščina izseka je \(\frac{l \cdot s}{2} = \frac{2\pi r \cdot s}{2} = \pi r s\).</p>`),
    q(1, "Izrazite prostornino enakostraničnega stožca s polmerom osnovne ploskve r.",
      R`<p>Osni presek je enakostranični trikotnik s stranico \(2r\), zato \(s = 2r\) in \(v = \frac{2r\sqrt{3}}{2} = r\sqrt{3}\). \[V = \frac{\pi r^2 v}{3} = \frac{\pi r^3\sqrt{3}}{3}.\]</p>`),
  ]),
  vr(43, [
    ref(43, 1),
    ref(43, 2),
    ref(43, 3),
    q(3, "Povejte dve lastnosti seštevanja vektorjev in eno izmed njiju dokažite.",
      R`<ul><li>komutativnost: \(\vec a + \vec b = \vec b + \vec a\),</li><li>asociativnost: \((\vec a + \vec b) + \vec c = \vec a + (\vec b + \vec c)\),</li>
<li>\(\vec a + \vec 0 = \vec a\), \(\vec a + (-\vec a) = \vec 0\).</li></ul>
<p>Dokaz komutativnosti: \(\vec a\) in \(\vec b\) nanesemo iz iste točke \(A\) in dopolnimo do paralelograma \(ABCD\), \(\vec a = \overrightarrow{AB} = \overrightarrow{DC}\), \(\vec b = \overrightarrow{AD} = \overrightarrow{BC}\). Potem je \(\vec a + \vec b = \overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}\) in \(\vec b + \vec a = \overrightarrow{AD} + \overrightarrow{DC} = \overrightarrow{AC}\).</p>`,
      R`<p>Dokaz temelji na pravilu trikotnika (vektorja seštejemo tako, da začetek drugega postavimo v konec prvega) in na tem, da sta nasprotni stranici paralelograma enaki in vzporedni, torej predstavljata isti vektor.</p>
<p>Asociativnost: \(\vec a = \overrightarrow{AB}\), \(\vec b = \overrightarrow{BC}\), \(\vec c = \overrightarrow{CD}\). Potem \((\vec a + \vec b) + \vec c = \overrightarrow{AC} + \overrightarrow{CD} = \overrightarrow{AD}\) in \(\vec a + (\vec b + \vec c) = \overrightarrow{AB} + \overrightarrow{BD} = \overrightarrow{AD}\).</p>`),
  ]),
  vr(44, [
    ref(44, 1),
    q(1, "Kako zapišemo enotski vektor v smeri vektorja \\(\\vec a\\)?",
      R`<p>\(\vec e_a = \frac{\vec a}{|\vec a|}\) (za \(\vec a \ne \vec 0\)): ima isto smer in usmerjenost kot \(\vec a\) in dolžino 1.</p>`),
    q(1, "Kaj je linearna kombinacija vektorjev?",
      R`<p>Linearna kombinacija vektorjev \(\vec a_1, \dots, \vec a_n\) je vektor \(\alpha_1\vec a_1 + \alpha_2\vec a_2 + \dots + \alpha_n\vec a_n\), kjer so \(\alpha_i\) realna števila (skalarji). Primer: \(2\vec a - 3\vec b\).</p>`),
    ref(44, 4),
    q(1, `Med istimi vektorji (${AB}, ${AD}, ${EF}, ${BC}, ${SE}) poiščite par linearno neodvisnih vektorjev.`,
      R`<p>Linearno neodvisna sta vektorja, ki nista vzporedna, npr. ${AB} in ${BC} (ali ${AB} in ${EF}).</p>`),
    q(1, `Vektor ${SE} zapišite kot linearno kombinacijo vektorjev ${EF} in ${AB}.`,
      R`<p>\(${SE} = -${EF} - ${AB}\).</p>
<p>Utemeljitev: \(${SE} = \overrightarrow{SD} + \overrightarrow{DE}\). Stranica \(DE\) je vzporedna in enako dolga kot \(AB\), a obrnjena: \(\overrightarrow{DE} = -${AB}\). Ker je \(SDEF\) romb (trikotnika \(SDE\) in \(SEF\) sta enakostranična), je \(\overrightarrow{SD} = \overrightarrow{FE} = -${EF}\).</p>`),
  ]),
  vr(45, [
    ref(45, 2),
    ref(45, 5),
    q(3, "Izrazite koordinate razpolovišča S daljice AB s koordinatami krajišč točk A in B. Formulo izpeljite.",
      R`<p>\[S\left(\frac{a_1 + b_1}{2}, \frac{a_2 + b_2}{2}, \frac{a_3 + b_3}{2}\right).\]</p>
<p>Izpeljava: \(\vec r_S = \vec r_A + \overrightarrow{AS} = \vec r_A + \frac{1}{2}\overrightarrow{AB} = \vec r_A + \frac{1}{2}(\vec r_B - \vec r_A) = \frac{1}{2}(\vec r_A + \vec r_B)\). Koordinate točke so komponente njenega krajevnega vektorja.</p>`),
  ]),
  vr(46, [
    ref(46, 1),
    q(3, "Naštejte dve lastnosti skalarnega produkta in eno izmed njiju dokažite.",
      R`<ul><li>komutativnost: \(\vec a \cdot \vec b = \vec b \cdot \vec a\),</li><li>homogenost: \((k\vec a) \cdot \vec b = k(\vec a \cdot \vec b)\),</li>
<li>distributivnost: \(\vec a \cdot (\vec b + \vec c) = \vec a \cdot \vec b + \vec a \cdot \vec c\),</li><li>\(\vec a \cdot \vec a = |\vec a|^2 \ge 0\).</li></ul>
<p>Dokaz komutativnosti: \(\vec a \cdot \vec b = |\vec a||\vec b|\cos\varphi\), kjer je \(\varphi\) kot med vektorjema. Kot med \(\vec b\) in \(\vec a\) je isti, zato \(\vec b \cdot \vec a = |\vec b||\vec a|\cos\varphi = \vec a \cdot \vec b\).</p>`,
      R`<p>Homogenost za \(k > 0\): \(k\vec a\) ima dolžino \(k|\vec a|\) in isto smer, kot \(\varphi\) ostane, zato \((k\vec a)\cdot\vec b = k|\vec a||\vec b|\cos\varphi\). Za \(k &lt; 0\) je dolžina \(|k||\vec a|\), kot pa \(180^\circ - \varphi\), \(\cos(180^\circ - \varphi) = -\cos\varphi\), zato spet dobimo \(k|\vec a||\vec b|\cos\varphi\).</p>
<p>Lastnost \(\vec a \cdot \vec a = |\vec a|^2\) sledi iz \(\cos 0 = 1\).</p>`),
    q(1, "Kako s skalarnim produktom ugotovimo, ali sta dana vektorja pravokotna?",
      R`<p>Neničelna vektorja sta pravokotna natanko tedaj, ko je \(\vec a \cdot \vec b = 0\) (ker je \(\cos 90^\circ = 0\)).</p>`),
    q(1, "Kako s skalarnim produktom ugotovimo, ali sta dana vektorja vzporedna?",
      R`<p>Neničelna vektorja sta vzporedna natanko tedaj, ko je \(|\vec a \cdot \vec b| = |\vec a||\vec b|\), tj. \(\cos\varphi = \pm 1\) (kot \(0^\circ\) ali \(180^\circ\)).</p>`),
  ]),
  vr(47, [
    q(2, "Kako izračunamo skalarni produkt dveh vektorjev v standardni ortonormirani bazi? Odgovor utemeljite.",
      R`<p>\(\vec a \cdot \vec b = a_1 b_1 + a_2 b_2 + a_3 b_3\).</p>
<p>Utemeljitev: \(\vec a = a_1\vec i + a_2\vec j + a_3\vec k\), \(\vec b = b_1\vec i + b_2\vec j + b_3\vec k\). Zmnožimo z distributivnostjo. Ker je baza ortonormirana, je \(\vec i \cdot \vec i = \vec j \cdot \vec j = \vec k \cdot \vec k = 1\) in \(\vec i \cdot \vec j = \vec j \cdot \vec k = \vec i \cdot \vec k = 0\), zato ostanejo samo členi \(a_1 b_1 + a_2 b_2 + a_3 b_3\).</p>`),
    q(2, "Kako izračunamo dolžino vektorja v standardni ortonormirani bazi? Odgovor utemeljite.",
      R`<p>\(|\vec a| = \sqrt{a_1^2 + a_2^2 + a_3^2}\).</p>
<p>Utemeljitev: \(|\vec a|^2 = \vec a \cdot \vec a = a_1^2 + a_2^2 + a_3^2\) (po prejšnji formuli); korenimo. (Geometrijsko: dvakrat uporabljen Pitagorov izrek v kvadru z robovi \(|a_1|, |a_2|, |a_3|\).)</p>`),
    ref(47, 3),
    ref(47, 4, 1),
  ]),
];
