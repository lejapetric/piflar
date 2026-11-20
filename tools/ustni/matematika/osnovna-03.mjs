// Osnovna raven, listki 43–64
import { R, listek, q, graf } from "./lib.mjs";

const sqrt3 = (x) => Math.cbrt(x);

export default [
  listek(43, "Vektorji", "vektorji_ravnina_prostor", [
    q(1, "Kaj je vektor?",
      R`<p>Vektor je množica vseh usmerjenih daljic, ki imajo enako dolžino, smer in usmerjenost. Predstavimo ga z eno od njih, npr. \(\overrightarrow{AB}\) (\(A\) je začetna, \(B\) končna točka).</p>`),
    q(1, "Definirajte seštevanje vektorjev.",
      R`<p>Vektor \(\vec b\) premaknemo tako, da njegov začetek sovpada s koncem vektorja \(\vec a\). Vsota \(\vec a + \vec b\) je vektor od začetka \(\vec a\) do konca \(\vec b\) (trikotniško pravilo): \(\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}\). Enako dobimo z diagonalo paralelograma.</p>`),
    q(1, "Definirajte ničelni vektor in nasprotni vektor danega vektorja.",
      R`<p>Ničelni vektor \(\vec 0\) ima začetno in končno točko enaki (dolžina 0). Nasprotni vektor \(-\vec a\) ima enako dolžino in smer kot \(\vec a\), a nasprotno usmerjenost: \(\vec a + (-\vec a) = \vec 0\), \(-\overrightarrow{AB} = \overrightarrow{BA}\).</p>`),
    q(1, "Definirajte odštevanje vektorjev.",
      R`<p>\(\vec a - \vec b = \vec a + (-\vec b)\). Če imata \(\vec a\) in \(\vec b\) skupni začetek, kaže razlika od konca \(\vec b\) do konca \(\vec a\).</p>`),
    q(2, "Povejte dve lastnosti seštevanja vektorjev.",
      R`<p>Komutativnost \(\vec a + \vec b = \vec b + \vec a\) in asociativnost \((\vec a + \vec b) + \vec c = \vec a + (\vec b + \vec c)\). Velja še \(\vec a + \vec 0 = \vec a\) in \(\vec a + (-\vec a) = \vec 0\).</p>`),
  ]),
  listek(44, "Vektorji", "vektorji_ravnina_prostor", [
    q(1, "Definirajte množenje vektorja s skalarjem.",
      R`<p>\(k\vec a\) (\(k \in \mathbb{R}\)) je vektor z dolžino \(|k| \cdot |\vec a|\), ki ima isto smer kot \(\vec a\); za \(k &gt; 0\) isto, za \(k &lt; 0\) nasprotno usmerjenost. Za \(k = 0\) je \(k\vec a = \vec 0\).</p>`),
    q(1, "Kaj je enotski vektor?",
      R`<p>Vektor z dolžino 1. Enotski vektor v smeri \(\vec a \neq \vec 0\) je \(\vec e = \frac{\vec a}{|\vec a|}\).</p>`),
    q(1, "Kakšna zveza velja med dvema neničelnima vzporednima vektorjema \\(\\vec a\\) in \\(\\vec b\\)?",
      R`<p>En vektor je večkratnik drugega: obstaja \(k \in \mathbb{R}\), \(k \neq 0\), da je \(\vec b = k\vec a\).</p>`),
    q(1, "V pravilnem šestkotniku ABCDEF s S označimo presečišče najdaljših diagonal. Med vektorji \\(\\overrightarrow{AB}\\), \\(\\overrightarrow{AD}\\), \\(\\overrightarrow{EF}\\), \\(\\overrightarrow{BC}\\) in \\(\\overrightarrow{SE}\\) poiščite par vzporednih vektorjev.",
      R`<p>\(\overrightarrow{BC}\) in \(\overrightarrow{AD}\): stranica \(BC\) je vzporedna z diagonalo \(AD\), velja \(\overrightarrow{AD} = 2\overrightarrow{BC}\). Vzporedna sta tudi \(\overrightarrow{EF}\) in \(\overrightarrow{BC}\) (nasprotni stranici).</p>`),
    q(1, "Med istimi vektorji poiščite par nasprotnih vektorjev.",
      R`<p>\(\overrightarrow{EF} = -\overrightarrow{BC}\): nasprotni stranici pravilnega šestkotnika sta enako dolgi in vzporedni, obhodimo ju v nasprotni smeri.</p>`),
    q(1, "Med istimi vektorji poiščite par nekolinearnih vektorjev.",
      R`<p>\(\overrightarrow{AB}\) in \(\overrightarrow{AD}\): ležita na premicah, ki se sekata pod kotom \(60^\circ\), zato nista vzporedna.</p>`),
  ]),
  listek(45, "Vektorji", "vektorji_ravnina_prostor", [
    q(1, "Opišite pravokotni koordinatni sistem v prostoru \\(\\mathbb{R}^3\\).",
      R`<p>Tri paroma pravokotne številske osi \(x\), \(y\), \(z\) s skupnim izhodiščem \(O\) in enako enoto (desnosučni sistem). Vsaki točki priredimo urejeno trojico koordinat \(T(x, y, z)\).</p>`),
    q(1, "Definirajte standardno ortonormirano bazo v prostoru \\(\\mathbb{R}^3\\).",
      R`<p>Vektorji \(\vec i = (1, 0, 0)\), \(\vec j = (0, 1, 0)\), \(\vec k = (0, 0, 1)\): enotski, paroma pravokotni, usmerjeni v smeri koordinatnih osi.</p>`),
    q(1, "Definirajte krajevni vektor dane točke v prostoru \\(\\mathbb{R}^3\\).",
      R`<p>Krajevni vektor točke \(T\) je vektor \(\vec r_T = \overrightarrow{OT}\) od izhodišča do točke \(T\); njegove komponente so koordinate točke.</p>`),
    q(1, "Izrazite krajevni vektor \\(\\vec r_A\\) točke \\(A(a_1, a_2, a_3)\\) kot linearno kombinacijo vektorjev standardne ortonormirane baze prostora \\(\\mathbb{R}^3\\).",
      R`<p>\(\vec r_A = a_1\vec i + a_2\vec j + a_3\vec k\).</p>`),
    q(2, "Naj bosta A in B točki v prostoru \\(\\mathbb{R}^3\\). Izrazite vektor \\(\\overrightarrow{AB}\\) s koordinatami točk A in B in odgovor utemeljite.",
      R`<p>\(\overrightarrow{AB} = (b_1 - a_1,\ b_2 - a_2,\ b_3 - a_3)\).</p>
<p>Utemeljitev: \(\overrightarrow{OA} + \overrightarrow{AB} = \overrightarrow{OB}\), zato \(\overrightarrow{AB} = \vec r_B - \vec r_A\); krajevna vektorja odštejemo po komponentah.</p>`),
  ]),
  listek(46, "Skalarni produkt", "vektorji_ravnina_prostor", [
    q(1, "Kako izračunamo skalarni produkt dveh vektorjev, če poznamo njuni dolžini in kot med njima?",
      R`<p>\(\vec a \cdot \vec b = |\vec a| \, |\vec b| \cos\varphi\).</p>`),
    q(2, "Naštejte dve lastnosti skalarnega produkta.",
      R`<p>Komutativnost: \(\vec a \cdot \vec b = \vec b \cdot \vec a\). Distributivnost: \(\vec a \cdot (\vec b + \vec c) = \vec a \cdot \vec b + \vec a \cdot \vec c\). Še homogenost: \((k\vec a) \cdot \vec b = k(\vec a \cdot \vec b)\).</p>`),
    q(2, "Kako s skalarnim produktom ugotovimo, ali sta dana vektorja pravokotna? Pokažite s primerom.",
      R`<p>Neničelna vektorja sta pravokotna natanko tedaj, ko je \(\vec a \cdot \vec b = 0\) (ker \(\cos 90^\circ = 0\)). Primer: \((2, 1, 3) \cdot (1, 1, -1) = 2 + 1 - 3 = 0\), vektorja sta pravokotna.</p>`),
    q(1, "Izračunajte \\(\\vec a \\cdot \\vec a\\) in razložite dobljeno zvezo.",
      R`<p>\(\vec a \cdot \vec a = |\vec a|^2 \cos 0^\circ = |\vec a|^2\). Iz tega računamo dolžino vektorja: \(|\vec a| = \sqrt{\vec a \cdot \vec a}\).</p>`),
  ]),
  listek(47, "Skalarni produkt v standardni ortonormirani bazi", "vektorji_ravnina_prostor", [
    q(1, "Kako izračunamo skalarni produkt dveh vektorjev v standardni ortonormirani bazi?",
      R`<p>\(\vec a \cdot \vec b = a_1 b_1 + a_2 b_2 + a_3 b_3\) (vsota produktov istoležnih komponent).</p>`),
    q(1, "Kako izračunamo dolžino vektorja v standardni ortonormirani bazi?",
      R`<p>\(|\vec a| = \sqrt{a_1^2 + a_2^2 + a_3^2}\).</p>`),
    q(1, "Kako izračunamo kot med vektorjema v standardni ortonormirani bazi?",
      R`<p>\[\cos\varphi = \frac{\vec a \cdot \vec b}{|\vec a| \, |\vec b|} = \frac{a_1 b_1 + a_2 b_2 + a_3 b_3}{\sqrt{a_1^2 + a_2^2 + a_3^2}\sqrt{b_1^2 + b_2^2 + b_3^2}}.\]</p>`),
    q(3, "Ponazorite izračun kota med vektorjema s primerom.",
      R`<p>\(\vec a = (1, 0, 1)\), \(\vec b = (0, 1, 1)\): \(\vec a \cdot \vec b = 1\), \(|\vec a| = |\vec b| = \sqrt{2}\). \(\cos\varphi = \frac{1}{2}\), torej \(\varphi = 60^\circ\).</p>`),
  ]),
  listek(48, "Koordinatni sistem v ravnini", "pravokotni_koordinatni_sistem_ravnina", [
    q(1, "Opišite pravokotni koordinatni sistem v ravnini \\(\\mathbb{R}^2\\).",
      R`<p>Dve pravokotni številski osi (abscisna \(x\) in ordinatna \(y\)) s skupnim izhodiščem in enako enoto. Vsaki točki ravnine pripada urejen par \((x, y)\). Osi razdelita ravnino na štiri kvadrante.</p>`),
    q(2, "Izpeljite formulo za računanje razdalje med dvema točkama.",
      R`<p>\[d(A, B) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}.\]</p>`,
      R`<p>Skozi \(A(x_1, y_1)\) narišemo vzporednico z osjo \(x\), skozi \(B(x_2, y_2)\) vzporednico z osjo \(y\). Sekata se v \(C(x_2, y_1)\). Trikotnik \(ABC\) je pravokoten s katetama \(|x_2 - x_1|\) in \(|y_2 - y_1|\), daljica \(AB\) je hipotenuza. Po Pitagorovem izreku \(d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2\).</p>`),
    q(1, "Povejte koordinati razpolovišča daljice z danima krajiščema.",
      R`<p>\(S\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)\).</p>`),
    q(1, "Točko T(x, y) prezrcalite čez koordinatno izhodišče. Povejte koordinati tako dobljene točke.",
      R`<p>\(T'(-x, -y)\).</p>`),
    q(1, "Točko T(x, y) prezrcalite čez ordinatno os. Povejte koordinati tako dobljene točke.",
      R`<p>\(T'(-x, y)\).</p>`),
  ]),
  listek(49, "Funkcije", "funkcije", [
    q(1, "Definirajte pojem funkcije (preslikave) iz množice A v množico B.",
      R`<p>Funkcija \(f: A \to B\) je predpis, ki vsakemu elementu \(x \in A\) priredi natanko en element \(f(x) \in B\).</p>`),
    q(3, "Definirajte pojme definicijsko območje, zaloga vrednosti in graf funkcije.",
      R`<p><strong>Definicijsko območje</strong> \(D_f\) je množica vseh \(x\), za katere je \(f(x)\) definiran. <strong>Zaloga vrednosti</strong> \(Z_f = \{f(x);\ x \in D_f\}\) je množica vseh vrednosti funkcije. <strong>Graf</strong> je množica točk \(\{(x, f(x));\ x \in D_f\}\) v koordinatni ravnini.</p>`),
    q(1, "Kaj je ničla realne funkcije?",
      R`<p>Število \(x_0 \in D_f\), za katero je \(f(x_0) = 0\); v ničli graf seka (ali se dotika) abscisne osi.</p>`),
    q(1, "Narišite graf ali povejte predpis funkcije g, ki ima definicijsko območje \\(D_g = (2, \\infty)\\).",
      R`<p>Na primer \(g(x) = \log(x - 2)\) ali \(g(x) = \frac{1}{\sqrt{x - 2}}\).</p>`),
  ]),
  listek(50, "Lastnosti funkcij", "funkcije", [
    q(2, "Kdaj je funkcija na intervalu naraščajoča in kdaj padajoča?",
      R`<p>Naraščajoča je, če za vsaka \(x_1 &lt; x_2\) z intervala velja \(f(x_1) &lt; f(x_2)\); padajoča, če velja \(f(x_1) &gt; f(x_2)\). (Z \(\le\) oz. \(\ge\) govorimo o nepadajoči oz. nenaraščajoči funkciji.)</p>`),
    q(1, "Narišite graf ali povejte predpis funkcije, ki ni niti naraščajoča niti padajoča.",
      R`<p>\(f(x) = x^2\): na \((-\infty, 0]\) pada, na \([0, \infty)\) narašča, na celem \(\mathbb{R}\) pa ni ne naraščajoča ne padajoča.</p>`),
    q(2, "Kdaj je funkcija f omejena?",
      R`<p>Navzgor omejena je, če obstaja \(M\), da je \(f(x) \le M\) za vse \(x \in D_f\); navzdol omejena, če obstaja \(m\), da je \(f(x) \ge m\). Omejena je, če je omejena navzgor in navzdol (graf leži v vodoravnem pasu).</p>`),
    q(1, "Narišite graf ali povejte predpis padajoče funkcije, ki je navzgor omejena, navzdol pa neomejena.",
      R`<p>\(f(x) = -e^x\) (ali \(f(x) = 1 - 2^x\)): pada, vrednosti so manjše od 0 (oz. 1), navzdol neomejena.</p>`),
  ]),
  listek(51, "Lastnosti funkcij", "funkcije", [
    q(2, "Kdaj je funkcija f liha in kdaj soda?",
      R`<p>Za simetrično definicijsko območje: \(f\) je soda, če \(f(-x) = f(x)\), in liha, če \(f(-x) = -f(x)\) za vse \(x \in D_f\). Primera: \(x^2\), \(\cos x\) sta sodi, \(x^3\), \(\sin x\) lihi.</p>`),
    q(2, "Kako iz grafa funkcije f vidimo, ali je funkcija f soda oziroma liha?",
      R`<p>Graf sode funkcije je simetričen glede na ordinatno os, graf lihe funkcije je simetričen glede na koordinatno izhodišče (središčno simetričen).</p>`),
    q(1, "Naj bo funkcija f bijektivna. Kako poiščemo predpis inverzne funkcije \\(f^{-1}\\)?",
      R`<p>V \(y = f(x)\) zamenjamo \(x\) in \(y\) in iz \(x = f(y)\) izrazimo \(y\). Primer: \(y = 2x + 1 \Rightarrow x = 2y + 1 \Rightarrow f^{-1}(x) = \frac{x - 1}{2}\).</p>`),
    q(1, "Kaj velja za grafa funkcij f in \\(f^{-1}\\)?",
      R`<p>Grafa sta simetrična glede na premico \(y = x\) (simetralo lihih kvadrantov).</p>`),
  ]),
  listek(52, "Linearna funkcija", "funkcije", [
    q(2, "Definirajte linearno funkcijo in povejte, kaj je njen graf.",
      R`<p>\(f(x) = kx + n\), \(k, n \in \mathbb{R}\). Graf je premica; \(k\) je smerni koeficient, \(n\) začetna vrednost (presečišče z ordinatno osjo v \((0, n)\)).</p>`),
    q(2, "V odvisnosti od smernega koeficienta k preučite naraščanje in padanje linearne funkcije f.",
      R`<p>Za \(k &gt; 0\) funkcija narašča, za \(k &lt; 0\) pada, za \(k = 0\) je konstantna. Razlog: \(f(x_2) - f(x_1) = k(x_2 - x_1)\) ima pri \(x_2 &gt; x_1\) predznak števila \(k\).</p>`),
    q(1, "Za koliko se spremeni vrednost funkcije f, če vrednost neodvisne spremenljivke povečamo za 2?",
      R`<p>Za \(2k\): \(f(x + 2) - f(x) = k(x + 2) + n - kx - n = 2k\).</p>`),
    q(1, "Kaj velja za grafa linearnih funkcij z enakima smernima koeficientoma?",
      R`<p>Grafa sta vzporedni premici (ali sovpadata, če je tudi \(n\) enak).</p>`),
  ]),
  listek(53, "Enačba premice", "pravokotni_koordinatni_sistem_ravnina", [
    q(2, "Zapišite eksplicitno obliko enačbe premice. Enačbe katerih premic lahko zapišemo v tej obliki?",
      R`<p>\(y = kx + n\). Tako lahko zapišemo vse premice, ki niso vzporedne z ordinatno osjo (navpične premice \(x = c\) nimajo smernega koeficienta).</p>`),
    q(2, "Zapišite implicitno obliko enačbe premice. Enačbe katerih premic lahko zapišemo v tej obliki?",
      R`<p>\(ax + by + c = 0\), kjer \(a\) in \(b\) nista hkrati 0. Tako lahko zapišemo vse premice v ravnini.</p>`),
    q(2, "Zapišite odsekovno obliko enačbe premice. Enačbe katerih premic lahko zapišemo v tej obliki?",
      R`<p>\(\frac{x}{m} + \frac{y}{n} = 1\), kjer sta \(m\) in \(n\) odseka na abscisni in ordinatni osi. Tako lahko zapišemo premice, ki niso vzporedne nobeni osi in ne gredo skozi izhodišče.</p>`),
  ]),
  listek(54, "Premice v ravnini", "pravokotni_koordinatni_sistem_ravnina", [
    q(2, "Definirajte naklonski kot premice v ravnini ter razložite zvezo med naklonskim kotom in smernim koeficientom dane premice (če ta obstaja).",
      R`<p>Naklonski kot \(\varphi \in [0^\circ, 180^\circ)\) je kot, za katerega moramo pozitivni del abscisne osi zavrteti v pozitivni smeri, da se ujema s premico. Velja \(k = \tan\varphi\) (za \(\varphi \neq 90^\circ\)), ker je \(k\) razmerje med spremembo \(y\) in spremembo \(x\).</p>`),
    q(1, "Kako izračunamo kot med premicama, če poznamo njuna smerna koeficienta?",
      R`<p>\[\tan\delta = \left|\frac{k_2 - k_1}{1 + k_1 k_2}\right|\] (za \(k_1 k_2 \neq -1\); pri \(k_1 k_2 = -1\) sta premici pravokotni).</p>`),
    q(1, "Povejte zvezo med smernima koeficientoma vzporednih premic.",
      R`<p>\(k_1 = k_2\).</p>`),
    q(1, "Povejte zvezo med smernima koeficientoma pravokotnih premic.",
      R`<p>\(k_1 \cdot k_2 = -1\), torej \(k_2 = -\frac{1}{k_1}\).</p>`),
    q(1, "Kolikšen je smerni koeficient premice, ki je pravokotna na simetralo lihih kvadrantov?",
      R`<p>Simetrala lihih kvadrantov \(y = x\) ima \(k = 1\), pravokotnica ima \(k = -1\).</p>`),
  ]),
  listek(55, "Linearne neenačbe", "algebrski_izrazi_enacbe_neenacbe", [
    q(1, "Kaj je linearna neenačba z eno neznanko?",
      R`<p>Neenačba, ki jo lahko zapišemo v obliki \(ax + b &gt; 0\) (ali z \(&lt;, \ge, \le\)), \(a, b \in \mathbb{R}\).</p>`),
    q(2, "Na primeru opišite reševanje linearnih neenačb z eno neznanko.",
      R`<p>\(3x + 6 &gt; 7x - 2\). Člene z neznanko prenesemo na eno stran: \(-4x &gt; -8\). Delimo z \(-4\) in obrnemo znak: \(x &lt; 2\). Rešitev: \(x \in (-\infty, 2)\).</p>
<p>Pri množenju ali deljenju z negativnim številom se znak neenakosti obrne.</p>`),
    q(3, "Kaj je rešitev linearne neenačbe? Navedite vse možnosti.",
      R`<p>Rešitev je vsako število, ki neenačbo spremeni v pravilno neenakost; množica rešitev je:</p>
<ul><li>za \(a \neq 0\) neomejen interval, npr. \(ax + b &gt; 0\), \(a &gt; 0\): \(x \in \left(-\frac{b}{a}, \infty\right)\), za \(a &lt; 0\): \(\left(-\infty, -\frac{b}{a}\right)\),</li>
<li>za \(a = 0\) množica \(\mathbb{R}\) (če neenakost \(b &gt; 0\) velja, npr. \(0x &gt; -1\)) ali prazna množica (npr. \(0x &gt; 3\)).</li></ul>`),
  ]),
  listek(56, "Potenčna funkcija", "funkcije", [
    q(1, "Definirajte potenčno funkcijo z naravnim eksponentom.",
      R`<p>\(f(x) = x^n\), \(n \in \mathbb{N}\), \(D_f = \mathbb{R}\).</p>`),
    q(2, "Narišite grafa potenčnih funkcij, ki imata eksponenta 2 in 3.",
      R`<p>\(x^2\) je parabola s temenom v izhodišču, simetrična glede na ordinatno os; \(x^3\) je kubična parabola, ki narašča in je simetrična glede na izhodišče. Obe gresta skozi \((0, 0)\) in \((1, 1)\).</p>
${graf({ x: [-2.5, 2.5], y: [-3, 4], f: [[(x) => x ** 2, "s-k1"], [(x) => x ** 3, "s-k2"]], napis: "modro \\(y = x^2\\), rdeče \\(y = x^3\\)" })}`),
    q(1, "Navedite dve lastnosti potenčnih funkcij.",
      R`<p>Grafi vseh gredo skozi točki \((0, 0)\) in \((1, 1)\); definicijsko območje je \(\mathbb{R}\); na \([0, \infty)\) naraščajo.</p>`),
    q(2, "Navedite osnovne razlike v lastnostih med potenčnimi funkcijami s sodim in potenčnimi funkcijami z lihim naravnim eksponentom.",
      R`<ul><li>sod \(n\): funkcija je soda (graf simetričen glede na os \(y\)), \(Z_f = [0, \infty)\), navzdol omejena, ni injektivna, na \((-\infty, 0]\) pada; graf gre skozi \((-1, 1)\),</li>
<li>lih \(n\): funkcija je liha (simetrična glede na izhodišče), \(Z_f = \mathbb{R}\), neomejena, povsod narašča (bijektivna); graf gre skozi \((-1, -1)\).</li></ul>`),
  ]),
  listek(57, "Korenska funkcija", "funkcije", [
    q(2, "Definirajte korenski funkciji \\(f(x) = \\sqrt{x}\\) in \\(g(x) = \\sqrt[3]{x}\\).",
      R`<p>\(f(x) = \sqrt{x}\) je definirana za \(x \ge 0\) in je inverzna funkcija funkcije \(x^2\) na \([0, \infty)\). \(g(x) = \sqrt[3]{x}\) je definirana za vse \(x \in \mathbb{R}\) in je inverzna funkcija funkcije \(x^3\).</p>`),
    q(2, "Narišite njuna grafa.",
      R`${graf({ x: [-4.5, 4.5], y: [-2.2, 2.6], f: [[(x) => Math.sqrt(x), "s-k1", 0, 4.5], [sqrt3, "s-k2"]], napis: "modro \\(y = \\sqrt{x}\\), rdeče \\(y = \\sqrt[3]{x}\\)" })}
<p>Oba grafa gresta skozi \((0, 0)\) in \((1, 1)\); graf \(\sqrt{x}\) je polovica parabole, ki leži na boku, graf \(\sqrt[3]{x}\) je simetričen glede na izhodišče.</p>`),
    q(2, "Navedite dve lastnosti funkcij f in g.",
      R`<p>Obe naraščata in sta injektivni. \(f\): \(D_f = Z_f = [0, \infty)\), navzdol omejena, ničla \(x = 0\). \(g\): \(D_g = Z_g = \mathbb{R}\), liha, neomejena.</p>`),
  ]),
  listek(58, "Kvadratna funkcija", "funkcije", [
    q(1, "Definirajte kvadratno funkcijo.",
      R`<p>\(f(x) = ax^2 + bx + c\), \(a, b, c \in \mathbb{R}\), \(a \neq 0\). Graf je parabola.</p>`),
    q(4, "Naštejte štiri lastnosti kvadratne funkcije in jih razložite.",
      R`<ul><li>\(D_f = \mathbb{R}\); graf je parabola, simetrična glede na navpično premico skozi teme \(x = p\).</li>
<li>Za \(a &gt; 0\) je navzdol omejena (\(Z_f = [q, \infty)\), teme je minimum), za \(a &lt; 0\) navzgor omejena (\(Z_f = (-\infty, q]\)).</li>
<li>Za \(a &gt; 0\) na \((-\infty, p]\) pada in na \([p, \infty)\) narašča (za \(a &lt; 0\) obratno).</li>
<li>Ima 0, 1 ali 2 realni ničli, odvisno od diskriminante; graf seka os \(y\) v \((0, c)\).</li></ul>`),
    q(1, "Povejte primer navzgor omejene kvadratne funkcije, katere graf seka ordinatno os v točki N(0, 3).",
      R`<p>\(f(x) = -x^2 + 3\): \(a &lt; 0\) (navzgor omejena), \(f(0) = 3\).</p>`),
  ]),
  listek(59, "Teme grafa kvadratne funkcije", "funkcije", [
    q(2, "Kaj je teme grafa kvadratne funkcije? Kako ga izračunamo?",
      R`<p>Teme je točka parabole na osi simetrije; v njej funkcija doseže najmanjšo (\(a &gt; 0\)) ali največjo (\(a &lt; 0\)) vrednost. \(T(p, q)\), \(p = -\frac{b}{2a}\), \(q = f(p) = -\frac{D}{4a}\), \(D = b^2 - 4ac\).</p>`),
    q(3, "Povejte temensko obliko predpisa kvadratne funkcije. Kako je njen graf odvisen od vodilnega koeficienta ter koordinat temena?",
      R`<p>\(f(x) = a(x - p)^2 + q\). Graf dobimo iz grafa \(y = ax^2\) s premikom za \(p\) v smeri osi \(x\) in za \(q\) v smeri osi \(y\). Predznak \(a\) pove, ali je parabola odprta navzgor (\(a &gt; 0\)) ali navzdol, \(|a|\) pa, kako ozka je (večji \(|a|\), ožja parabola).</p>`),
    q(1, "Povejte primer navzgor omejene kvadratne funkcije, katere graf ima teme v prvem kvadrantu.",
      R`<p>\(f(x) = -(x - 1)^2 + 2\), teme \(T(1, 2)\).</p>`),
  ]),
  listek(60, "Ničle kvadratne funkcije", "funkcije", [
    q(1, "Povejte ničelno (faktorizirano) obliko predpisa kvadratne funkcije.",
      R`<p>\(f(x) = a(x - x_1)(x - x_2)\), kjer sta \(x_1\) in \(x_2\) ničli.</p>`),
    q(1, "Kaj je diskriminanta kvadratne funkcije?",
      R`<p>\(D = b^2 - 4ac\) za \(f(x) = ax^2 + bx + c\).</p>`),
    q(3, "Razložite pomen diskriminante kvadratne funkcije pri iskanju njenih ničel.",
      R`<p>Ničle so \(x_{1,2} = \frac{-b \pm \sqrt{D}}{2a}\).</p>
<ul><li>\(D &gt; 0\): dve različni realni ničli (parabola seka os \(x\)),</li>
<li>\(D = 0\): ena dvojna ničla \(x = -\frac{b}{2a}\) (teme leži na osi \(x\)),</li>
<li>\(D &lt; 0\): ni realnih ničel (parabola ne seka osi \(x\)); ničli sta konjugirano kompleksni.</li></ul>`),
    q(1, "Zapišite ničelno obliko predpisa kvadratne funkcije, ki ima dve različni ničli in je navzgor omejena.",
      R`<p>\(f(x) = -(x - 1)(x - 3)\): ničli 1 in 3, \(a = -1 &lt; 0\).</p>`),
  ]),
  listek(61, "Kvadratna enačba", "algebrski_izrazi_enacbe_neenacbe", [
    q(1, "Kaj je kvadratna enačba?",
      R`<p>Enačba oblike \(ax^2 + bx + c = 0\), \(a \neq 0\).</p>`),
    q(1, "Kako izračunamo rešitve kvadratne enačbe?",
      R`<p>Z rešitveno formulo \(x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\), z razcepom (npr. Vietovo pravilo) ali z dopolnjevanjem do popolnega kvadrata.</p>`),
    q(2, "Kako je z rešljivostjo kvadratne enačbe v množici realnih števil in kako v množici kompleksnih števil?",
      R`<p>V \(\mathbb{R}\) ima dve rešitvi (\(D &gt; 0\)), eno dvojno (\(D = 0\)) ali nobene (\(D &lt; 0\)). V \(\mathbb{C}\) je vedno rešljiva: pri \(D &lt; 0\) ima dve konjugirano kompleksni rešitvi \(x_{1,2} = \frac{-b \pm i\sqrt{-D}}{2a}\).</p>`),
    q(2, "Povejte in rešite primer kvadratne enačbe, ki ima dve konjugirano kompleksni rešitvi.",
      R`<p>\(x^2 - 4x + 5 = 0\): \(D = 16 - 20 = -4\), \(x_{1,2} = \frac{4 \pm 2i}{2} = 2 \pm i\).</p>`),
  ]),
  listek(62, "Kvadratna neenačba", "algebrski_izrazi_enacbe_neenacbe", [
    q(1, "Kaj je kvadratna neenačba?",
      R`<p>Neenačba oblike \(ax^2 + bx + c &gt; 0\) (ali \(&lt;, \ge, \le\)), \(a \neq 0\).</p>`),
    q(1, "Kako rešujemo kvadratno neenačbo?",
      R`<p>Izračunamo ničle kvadratne funkcije \(f(x) = ax^2 + bx + c\), skiciramo parabolo in odčitamo, kje je graf nad (oz. pod) osjo \(x\).</p>`),
    q(3, "Kaj je množica rešitev poljubne kvadratne neenačbe? Povejte vse možnosti.",
      R`<p>Glede na znak \(a\), diskriminanto in vrsto neenakosti je množica rešitev:</p>
<ul><li>omejen interval med ničlama (npr. \(x^2 - 1 &lt; 0\): \((-1, 1)\)),</li>
<li>unija dveh neomejenih intervalov (\(x^2 - 1 &gt; 0\): \((-\infty, -1) \cup (1, \infty)\)),</li>
<li>vsa realna števila (\(x^2 + 1 &gt; 0\)), ali \(\mathbb{R}\) brez ene točke (\(x^2 &gt; 0\)),</li>
<li>ena sama točka (\(x^2 \le 0\): \(\{0\}\)) ali prazna množica (\(x^2 + 1 &lt; 0\)).</li></ul>`),
    q(1, "Povejte primer kvadratne neenačbe, katere množica rešitev je interval [1, 2].",
      R`<p>\((x - 1)(x - 2) \le 0\), to je \(x^2 - 3x + 2 \le 0\).</p>`),
  ]),
  listek(63, "Eksponentna funkcija", "funkcije", [
    q(1, "Naj bo \\(a > 1\\). Narišite graf funkcije s predpisom \\(f(x) = a^x\\).",
      R`${graf({ x: [-3, 3], y: [-0.5, 5], f: [[(x) => 2 ** x, "s-k1"]], asim: [{ y: 0 }], tocke: [[0, 1]], napis: "\\(y = 2^x\\)" })}
<p>Graf narašča, gre skozi \((0, 1)\) in \((1, a)\), na levi se približuje osi \(x\).</p>`),
    q(1, "Naj bo \\(0 &lt; a &lt; 1\\). Narišite graf funkcije s predpisom \\(f(x) = a^x\\).",
      R`${graf({ x: [-3, 3], y: [-0.5, 5], f: [[(x) => 0.5 ** x, "s-k2"]], asim: [{ y: 0 }], tocke: [[0, 1]], napis: "\\(y = \\left(\\frac{1}{2}\\right)^x\\)" })}
<p>Graf pada, gre skozi \((0, 1)\), na desni se približuje osi \(x\).</p>`),
    q(4, "Povejte štiri lastnosti eksponentne funkcije.",
      R`<ul><li>\(D_f = \mathbb{R}\), \(Z_f = (0, \infty)\): vrednosti so vedno pozitivne, ničel ni,</li>
<li>graf gre skozi \((0, 1)\), os \(x\) je vodoravna asimptota,</li>
<li>za \(a &gt; 1\) narašča, za \(0 &lt; a &lt; 1\) pada,</li>
<li>je injektivna (bijekcija \(\mathbb{R} \to (0, \infty)\)), navzdol omejena.</li></ul>`),
  ]),
  listek(64, "Logaritemska funkcija", "funkcije", [
    q(1, "Naj bo a pozitivno realno število, \\(a \\neq 1\\). Definirajte logaritemsko funkcijo z osnovo a.",
      R`<p>\(f(x) = \log_a x\), \(x &gt; 0\), je inverzna funkcija eksponentne funkcije \(a^x\): \(y = \log_a x \iff a^y = x\).</p>`),
    q(1, "Naj bo \\(a > 1\\). Narišite graf logaritemske funkcije z osnovo a.",
      R`${graf({ x: [-0.5, 5], y: [-3, 3], f: [[(x) => Math.log2(x), "s-k1", 0.001, 5]], asim: [{ x: 0 }], tocke: [[1, 0]], napis: "\\(y = \\log_2 x\\)" })}
<p>Graf narašča, gre skozi \((1, 0)\) in \((a, 1)\), os \(y\) je navpična asimptota.</p>`),
    q(1, "Naj bo \\(0 &lt; a &lt; 1\\). Narišite graf logaritemske funkcije z osnovo a.",
      R`${graf({ x: [-0.5, 5], y: [-3, 3], f: [[(x) => -Math.log2(x), "s-k2", 0.001, 5]], asim: [{ x: 0 }], tocke: [[1, 0]], napis: "\\(y = \\log_{1/2} x\\)" })}
<p>Graf pada, gre skozi \((1, 0)\), os \(y\) je navpična asimptota.</p>`),
    q(3, "Povejte tri lastnosti logaritemske funkcije.",
      R`<ul><li>\(D_f = (0, \infty)\), \(Z_f = \mathbb{R}\),</li><li>edina ničla je \(x = 1\), os \(y\) je navpična asimptota,</li>
<li>za \(a &gt; 1\) narašča, za \(0 &lt; a &lt; 1\) pada; je injektivna in neomejena.</li></ul>`),
  ]),
];
