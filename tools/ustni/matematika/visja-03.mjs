// Višja raven, listki 48–68 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, vr, q, ref, graf } from "./lib.mjs";

export default [
  vr(48, [
    q(1, "Definirajte pravokotni koordinatni sistem v ravnini \\(\\mathbb{R}^2\\).",
      R`<p>Sestavljata ga dve pravokotni številski premici (abscisna os \(x\) in ordinatna os \(y\)) s skupnim izhodiščem \(O\) in enako enoto. Vsaki točki ravnine priredimo urejen par \((x, y)\): pravokotni projekciji točke na osi.</p>`),
    ref(48, 2),
    q(2, "Povejte koordinati razpolovišča daljice z danima krajiščema. Odgovor utemeljite.",
      R`<p>Za \(A(x_1, y_1)\), \(B(x_2, y_2)\) je \(S\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)\).</p>
<p>Utemeljitev: \(\vec r_S = \vec r_A + \frac{1}{2}\overrightarrow{AB} = \vec r_A + \frac{1}{2}(\vec r_B - \vec r_A) = \frac{\vec r_A + \vec r_B}{2}\). (Ali: projekcije razpolovišča na osi so razpolovišča projekcij, po Talesovem izreku o vzporednicah.)</p>`),
    q(1, "Točko \\(T(x, y)\\) prezrcalite čez premico z enačbo \\(y = x\\). Povejte koordinati tako dobljene točke.",
      R`<p>\(T'(y, x)\): koordinati se zamenjata.</p>`),
  ]),
  vr(49, [
    ref(49, 1),
    q(3, "Kdaj je funkcija injektivna, kdaj surjektivna in kdaj bijektivna?",
      R`<ul><li><b>injektivna:</b> različnim elementom priredi različne slike: \(x_1 \ne x_2 \Rightarrow f(x_1) \ne f(x_2)\) (vsaka vodoravnica seka graf največ enkrat),</li>
<li><b>surjektivna:</b> vsak element \(B\) je slika vsaj enega elementa \(A\), tj. \(Z_f = B\),</li>
<li><b>bijektivna:</b> injektivna in surjektivna hkrati; vsak element \(B\) je slika natanko enega elementa \(A\). Samo bijektivna funkcija ima inverzno funkcijo.</li></ul>`),
    q(1, "Narišite graf ali povejte predpis funkcije, ki ni surjektivna.",
      R`<p>\(f: \mathbb{R} \to \mathbb{R}\), \(f(x) = x^2\): negativna števila niso slike nobenega \(x\) (\(Z_f = [0, \infty) \ne \mathbb{R}\)).</p>`),
    q(1, "Narišite graf ali povejte predpis funkcije, ki ni injektivna.",
      R`<p>\(f(x) = x^2\): \(f(-2) = f(2) = 4\) (vodoravnica \(y = 4\) seka graf dvakrat). Tudi \(\sin x\) ni injektivna.</p>`),
  ]),
  vr(50, [
    ref(50, 1),
    ref(50, 2),
    ref(50, 3),
    q(1, "Definirajte natančno zgornjo mejo in natančno spodnjo mejo omejene funkcije f.",
      R`<p>Natančna zgornja meja (supremum) je najmanjša od vseh zgornjih mej funkcije, tj. najmanjše število \(M\), za katero je \(f(x) \le M\) za vse \(x \in D_f\). Natančna spodnja meja (infimum) je največja od vseh spodnjih mej. Če funkcija mejo doseže, je to njen maksimum (minimum).</p>
<p>Primer: \(f(x) = \frac{1}{1 + x^2}\) ima supremum 1 (dosežen pri \(x = 0\)) in infimum 0 (ni dosežen).</p>`),
  ]),
  vr(51, [
    ref(51, 1),
    ref(51, 2, 1),
    q(2, "Povejte pogoj za obstoj inverzne funkcije. Kako poiščemo predpis inverzne funkcije?",
      R`<p>Funkcija \(f: A \to B\) ima inverzno funkcijo natanko tedaj, ko je bijektivna (realna funkcija na svojo zalogo vrednosti: ko je injektivna).</p>
<p>Predpis: v \(y = f(x)\) zamenjamo \(x\) in \(y\) ter izrazimo \(y\). Primer: \(y = 2x + 3 \to x = 2y + 3 \to f^{-1}(x) = \frac{x - 3}{2}\). Velja \(D_{f^{-1}} = Z_f\) in \(Z_{f^{-1}} = D_f\).</p>`),
    ref(51, 4),
  ]),
  vr(52, [
    ref(52, 1),
    ref(52, 2),
    q(1, "Za koliko se spremeni vrednost funkcije f, če vrednost neodvisne spremenljivke povečamo za a?",
      R`<p>\(f(x + a) - f(x) = k(x + a) + n - (kx + n) = ka\): vrednost se spremeni za \(ka\) (ne glede na \(x\)).</p>`),
    q(1, "Naj bo f strogo naraščajoča linearna funkcija s pozitivno začetno vrednostjo. Kakšen je predznak ničle funkcije f?",
      R`<p>\(k > 0\), \(n > 0\), ničla \(x_0 = -\frac{n}{k} &lt; 0\): ničla je <b>negativna</b>.</p>`),
  ]),
  vr(53, [
    ref(53, 1),
    ref(53, 2),
    q(2, "Naj ima premica v ravnini enačbo \\(ax + by + c = 0\\). Kaj mora veljati za realna števila a, b in c, da lahko enačbo premice zapišemo v odsekovni obliki?",
      R`<p>Odsekovna oblika je \(\frac{x}{m} + \frac{y}{n} = 1\). Velja mora \(a \ne 0\), \(b \ne 0\) in \(c \ne 0\): premica ne sme biti vzporedna z nobeno osjo in ne sme iti skozi izhodišče. Tedaj \(\frac{x}{-c/a} + \frac{y}{-c/b} = 1\), \(m = -\frac{c}{a}\), \(n = -\frac{c}{b}\).</p>`),
  ]),
  vr(54, [
    q(2, "Definirajte naklonski kot premice in razložite zvezo med naklonskim kotom in smernim koeficientom dane premice (če ta obstaja).",
      R`<p>Naklonski kot \(\varphi\) je kot, ki ga premica oklepa s pozitivnim delom abscisne osi (merjen v pozitivni smeri), \(0^\circ \le \varphi &lt; 180^\circ\). Velja \(k = \tan\varphi\). Za navpične premice (\(\varphi = 90^\circ\)) smerni koeficient ne obstaja.</p>
<p>\(k > 0\): \(\varphi\) oster (premica narašča), \(k &lt; 0\): \(\varphi\) top, \(k = 0\): vodoravna premica.</p>`),
    ref(54, 3),
    ref(54, 4),
    q(2, "Izpeljite formulo za kot med premicama s smernima koeficientoma \\(k_1\\) in \\(k_2\\).",
      R`<p>\[\tan\delta = \left|\frac{k_2 - k_1}{1 + k_1 k_2}\right|.\]</p>
<p>Izpeljava: \(k_1 = \tan\varphi_1\), \(k_2 = \tan\varphi_2\). Kot med premicama je \(\delta = |\varphi_2 - \varphi_1|\) (oz. njegov suplement, če je top). Po adicijskem izreku \(\tan(\varphi_2 - \varphi_1) = \frac{\tan\varphi_2 - \tan\varphi_1}{1 + \tan\varphi_1\tan\varphi_2} = \frac{k_2 - k_1}{1 + k_1 k_2}\). Absolutna vrednost da ostri kot.</p>`,
      R`<p>Zakaj je \(\delta\) razlika naklonskih kotov? Premici in abscisna os tvorijo trikotnik; zunanji kot \(\varphi_2\) je enak vsoti notranjih nepriležnih kotov \(\varphi_1 + \delta\).</p>
<p>Formula ne deluje pri \(1 + k_1 k_2 = 0\): to je ravno pogoj pravokotnosti \(k_2 = -\frac{1}{k_1}\) (\(\tan 90^\circ\) ne obstaja). Pri \(k_1 = k_2\) dobimo \(\tan\delta = 0\), premici sta vzporedni.</p>
<p>Primer: \(k_1 = 1\), \(k_2 = 3\): \(\tan\delta = \frac{2}{4} = \frac{1}{2}\), \(\delta \approx 26.6^\circ\).</p>`),
  ]),
  vr(55, [
    ref(55, 2),
    q(2, "Naj bosta a in b realni števili. Obravnavajte linearno neenačbo \\(ax + b &lt; 0\\).",
      R`<ul><li>\(a > 0\): \(x &lt; -\frac{b}{a}\), rešitev \(\left(-\infty, -\frac{b}{a}\right)\),</li>
<li>\(a &lt; 0\): pri deljenju z negativnim številom se neenačaj obrne: \(x > -\frac{b}{a}\), rešitev \(\left(-\frac{b}{a}, \infty\right)\),</li>
<li>\(a = 0\): neenačba \(b &lt; 0\) ne vsebuje \(x\); če je \(b &lt; 0\), so rešitve vsa realna števila, sicer ni rešitev.</li></ul>`),
    q(2, "Za vsako od množic \\([2, \\infty)\\) in \\(\\mathbb{R}\\) povejte primer linearne neenačbe z eno neznanko, katere množica rešitev je dana množica.",
      R`<p>\([2, \infty)\): \(x - 2 \ge 0\) (ali \(3x \ge 6\)). \(\mathbb{R}\): \(0 \cdot x + 1 > 0\), npr. \(x + 1 > x\).</p>`),
  ]),
  vr(56, [
    q(1, "Definirajte potenčno funkcijo z negativnim celim eksponentom.",
      R`<p>\(f(x) = x^{-n} = \frac{1}{x^n}\), \(n \in \mathbb{N}\), \(D_f = \mathbb{R} \setminus \{0\}\).</p>`),
    q(2, "Narišite grafa potenčnih funkcij, ki imata eksponenta –1 in –2.",
      R`${graf({ x: [-4, 4], y: [-3.5, 3.5], f: [[(x) => 1 / x, "s-k1"], [(x) => 1 / (x * x), "s-k2"]], asim: [{ x: 0 }, { y: 0 }], tocke: [[1, 1]], napis: "modro \\(y = x^{-1}\\) (hiperbola), rdeče \\(y = x^{-2}\\)" })}
<p>Oba grafa imata navpično asimptoto \(x = 0\) (pol) in vodoravno asimptoto \(y = 0\) ter gresta skozi \((1, 1)\). \(x^{-1}\) gre še skozi \((-1, -1)\), \(x^{-2}\) skozi \((-1, 1)\).</p>`),
    q(3, "Primerjajte lastnosti potenčnih funkcij s sodim in potenčnih funkcij z lihim negativnim celim eksponentom.",
      R`<p>Skupno: \(D_f = \mathbb{R} \setminus \{0\}\), pol v \(x = 0\), vodoravna asimptota \(y = 0\), ni ničel, na \((0, \infty)\) padajo, graf gre skozi \((1, 1)\).</p>
<ul><li>sod eksponent (\(x^{-2}, x^{-4}, \dots\)): funkcija je soda, \(Z_f = (0, \infty)\), navzdol omejena, na \((-\infty, 0)\) narašča, pol sode stopnje (na obeh straneh gre proti \(+\infty\)), graf skozi \((-1, 1)\);</li>
<li>lih eksponent (\(x^{-1}, x^{-3}, \dots\)): funkcija je liha, \(Z_f = \mathbb{R} \setminus \{0\}\), neomejena, injektivna, padajoča na \((-\infty, 0)\) in na \((0, \infty)\), pol lihe stopnje (spremeni predznak), graf skozi \((-1, -1)\).</li></ul>`),
  ]),
  vr(57, [
    q(2, "Za poljubno naravno število n definirajte korensko funkcijo f s predpisom \\(f(x) = \\sqrt[n]{x}\\).",
      R`<p>Korenska funkcija je inverzna funkcija potenčne funkcije \(x^n\).</p>
<ul><li>\(n\) sod: \(D_f = Z_f = [0, \infty)\), \(f(x)\) je nenegativno število, katerega \(n\)-ta potenca je \(x\) (inverz \(x^n\) zožene na \([0, \infty)\)),</li>
<li>\(n\) lih: \(D_f = Z_f = \mathbb{R}\).</li></ul>`),
    q(2, "V isti koordinatni sistem narišite grafe korenskih funkcij za n = 2, n = 3 in n = 4.",
      R`${graf({ x: [-4.5, 5], y: [-2, 2.6], f: [[(x) => Math.sqrt(x), "s-k1", 0, 5], [Math.cbrt, "s-k2"], [(x) => Math.sqrt(Math.sqrt(x)), "s-k3", 0, 5]], tocke: [[1, 1]], napis: "modro \\(\\sqrt{x}\\), rdeče \\(\\sqrt[3]{x}\\), zeleno \\(\\sqrt[4]{x}\\)" })}
<p>Vsi gredo skozi \((0, 0)\) in \((1, 1)\). Na \((0, 1)\) je večji koren višje stopnje, na \((1, \infty)\) pa koren nižje stopnje.</p>`),
    q(2, "Opišite štiri lastnosti korenskih funkcij.",
      R`<ul><li>so naraščajoče in injektivne na celem definicijskem območju,</li><li>imajo edino ničlo \(x = 0\), graf gre skozi \((0, 0)\) in \((1, 1)\),</li>
<li>pri sodem \(n\): \(D_f = Z_f = [0, \infty)\), navzdol omejene z minimumom 0; pri lihem \(n\): \(D_f = Z_f = \mathbb{R}\), lihe, neomejene,</li>
<li>v izhodišču ima graf navpično tangento, nimajo asimptot, so konkavne na \((0, \infty)\).</li></ul>`),
  ]),
  vr(58, [
    ref(58, 1),
    q(2, "Naštejte štiri lastnosti kvadratne funkcije.",
      R`<ul><li>graf je parabola s temenom \(T(p, q)\), \(p = -\frac{b}{2a}\), \(q = -\frac{D}{4a}\), simetrična glede na premico \(x = p\),</li>
<li>\(D_f = \mathbb{R}\); za \(a > 0\) je \(Z_f = [q, \infty)\), za \(a &lt; 0\) je \(Z_f = (-\infty, q]\),</li>
<li>\(a > 0\): na \((-\infty, p]\) pada, na \([p, \infty)\) narašča, minimum \(q\) (navzdol omejena, konveksna); \(a &lt; 0\) obratno,</li>
<li>ima 2, 1 ali 0 realnih ničel glede na predznak diskriminante \(D = b^2 - 4ac\); začetna vrednost je \(f(0) = c\).</li></ul>`),
    q(2, "Ali obstaja kvadratna funkcija, ki je liha? Poiščite vse sode kvadratne funkcije.",
      R`<p>Liha ne obstaja: lihost zahteva \(f(-x) = -f(x)\), tj. \(ax^2 - bx + c = -ax^2 - bx - c\) za vse \(x\), kar da \(a = 0\) in \(c = 0\), takrat pa funkcija ni kvadratna.</p>
<p>Sodost \(f(-x) = f(x)\): \(ax^2 - bx + c = ax^2 + bx + c\) za vse \(x\) \(\iff b = 0\). Sode kvadratne funkcije so torej \(f(x) = ax^2 + c\), \(a \ne 0\).</p>`),
    q(1, "Povejte primer navzdol omejene sode kvadratne funkcije.",
      R`<p>\(f(x) = x^2 + 1\) (\(a > 0\), \(b = 0\)); spodnja meja je 1.</p>`),
  ]),
  vr(59, [
    ref(59, 1),
    q(3, "Izpeljite temensko obliko predpisa kvadratne funkcije.",
      R`<p>Dopolnimo do popolnega kvadrata:</p>
<p>\[ax^2 + bx + c = a\left(x^2 + \frac{b}{a}x\right) + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a} + c = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2 - 4ac}{4a}.\]</p>
<p>Z \(p = -\frac{b}{2a}\) in \(q = -\frac{D}{4a}\): \(f(x) = a(x - p)^2 + q\), teme \(T(p, q)\).</p>`,
      R`<p>Dopolnjevanje do popolnega kvadrata: \(x^2 + \frac{b}{a}x\) je začetek kvadrata \(\left(x + \frac{b}{2a}\right)^2 = x^2 + \frac{b}{a}x + \frac{b^2}{4a^2}\). Dodani člen \(\frac{b^2}{4a^2}\) moramo zato odšteti, pomnožen z \(a\) pa je to \(\frac{b^2}{4a}\).</p>
<p>Iz temenske oblike vidimo vse: \((x - p)^2 \ge 0\), zato je pri \(a > 0\) najmanjša vrednost \(q\) pri \(x = p\), graf pa je vzporedni premik grafa \(ax^2\) za \(p\) v smeri \(x\) in za \(q\) v smeri \(y\).</p>
<p>Primer: \(2x^2 - 8x + 5 = 2(x^2 - 4x) + 5 = 2(x - 2)^2 - 8 + 5 = 2(x - 2)^2 - 3\), \(T(2, -3)\).</p>`),
    ref(59, 3),
  ]),
  vr(60, [
    q(1, "Definirajte ničlo funkcije in povejte ničelno (faktorizirano) obliko predpisa kvadratne funkcije.",
      R`<p>Ničla funkcije je število \(x_0 \in D_f\), za katero je \(f(x_0) = 0\) (graf seka ali se dotika abscisne osi). Ničelna oblika: \(f(x) = a(x - x_1)(x - x_2)\), kjer sta \(x_1, x_2\) ničli.</p>`),
    ref(60, 2),
    ref(60, 3),
    q(1, "Razložite zvezo med ničlami kvadratne funkcije in absciso temena njenega grafa.",
      R`<p>Parabola je simetrična glede na navpičnico skozi teme, zato teme leži na sredini med ničlama: \(p = \frac{x_1 + x_2}{2}\) (po Vieti \(= -\frac{b}{2a}\)). Pri dvojni ničli je \(p = x_1\).</p>`),
  ]),
  vr(61, [
    q(1, "Kaj je kvadratna enačba? Kako jo rešimo?",
      R`<p>Enačba oblike \(ax^2 + bx + c = 0\), \(a \ne 0\). Rešimo jo z razcepom (npr. Vietovo pravilo) ali s formulo \[x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}.\]</p>`),
    ref(61, 3),
    q(1, "Povejte Vietovi formuli za kvadratno enačbo.",
      R`<p>\(x_1 + x_2 = -\frac{b}{a}\), \(x_1 x_2 = \frac{c}{a}\).</p>`),
    q(2, "Dokažite Vietovi formuli za kvadratno enačbo.",
      R`<p>Kvadratni polinom zapišemo v ničelni obliki in zmnožimo: \[a(x - x_1)(x - x_2) = ax^2 - a(x_1 + x_2)x + a x_1 x_2.\] Primerjamo koeficiente z \(ax^2 + bx + c\): \(b = -a(x_1 + x_2)\) in \(c = a x_1 x_2\), torej \(x_1 + x_2 = -\frac{b}{a}\), \(x_1 x_2 = \frac{c}{a}\).</p>`,
      R`<p>Drug dokaz neposredno iz formule za rešitve: \(x_1 + x_2 = \frac{-b + \sqrt{D}}{2a} + \frac{-b - \sqrt{D}}{2a} = \frac{-2b}{2a} = -\frac{b}{a}\) in \(x_1 x_2 = \frac{b^2 - D}{4a^2} = \frac{4ac}{4a^2} = \frac{c}{a}\) (razlika kvadratov).</p>
<p>Formuli veljata tudi za kompleksni rešitvi (\(D &lt; 0\)). Primer: \(x^2 - 5x + 6 = 0\): vsota 5, produkt 6, zato \(x_1 = 2\), \(x_2 = 3\).</p>`),
  ]),
  vr(62, [
    ref(62, 1),
    q(3, "Obravnavajte množico rešitev kvadratne neenačbe \\(f(x) &lt; 0\\) glede na vodilni koeficient in diskriminanto.",
      R`<p>Rešitve so tisti \(x\), kjer je parabola pod abscisno osjo (\(x_1 &lt; x_2\) sta ničli).</p>
<ul><li>\(a > 0\), \(D > 0\): \((x_1, x_2)\) (med ničlama),</li><li>\(a > 0\), \(D \le 0\): ni rešitev (\(\emptyset\)), parabola nikjer ni pod osjo,</li>
<li>\(a &lt; 0\), \(D > 0\): \((-\infty, x_1) \cup (x_2, \infty)\),</li><li>\(a &lt; 0\), \(D = 0\): \(\mathbb{R} \setminus \{x_1\}\),</li>
<li>\(a &lt; 0\), \(D &lt; 0\): \(\mathbb{R}\) (vse realne vrednosti).</li></ul>`),
    q(1, "Povejte primer kvadratne neenačbe, katere množica rešitev je množica vseh realnih števil.",
      R`<p>\(x^2 + 1 > 0\) (ali \(-x^2 - 1 &lt; 0\)).</p>`),
    q(1, "Povejte primer kvadratne neenačbe, katere množica rešitev je množica {7}.",
      R`<p>\((x - 7)^2 \le 0\), tj. \(x^2 - 14x + 49 \le 0\): izraz je nenegativen, \(\le 0\) je le pri \(x = 7\).</p>`),
  ]),
  vr(63, [
    ref(63, 1),
    ref(63, 2),
    ref(63, 3, 2),
    q(2, "V odvisnosti od realnega parametra c obravnavajte enačbo \\(f(x) = c\\), kjer je f eksponentna funkcija.",
      R`<p>Enačba \(a^x = c\) (\(a > 0\), \(a \ne 1\)):</p>
<ul><li>\(c > 0\): natanko ena rešitev \(x = \log_a c\) (eksponentna funkcija je injektivna z \(Z_f = (0, \infty)\)),</li>
<li>\(c \le 0\): ni rešitev, ker je \(a^x > 0\) za vse \(x\) (vodoravnica \(y = c\) grafa ne seka).</li></ul>`),
  ]),
  vr(64, [
    q(1, "Naj bo a pozitivno realno število. Definirajte logaritemsko funkcijo z osnovo a.",
      R`<p>Za \(a > 0\), \(a \ne 1\): \(f(x) = \log_a x\), \(D_f = (0, \infty)\), kjer je \(\log_a x = y \iff a^y = x\). Je inverzna funkcija eksponentne funkcije \(a^x\).</p>`),
    ref(64, 2),
    ref(64, 3),
    q(2, "Povejte štiri lastnosti logaritemske funkcije.",
      R`<ul><li>\(D_f = (0, \infty)\), \(Z_f = \mathbb{R}\),</li><li>edina ničla \(x = 1\), graf gre skozi \((1, 0)\) in \((a, 1)\),</li>
<li>navpična asimptota \(x = 0\),</li><li>za \(a > 1\) narašča, za \(0 &lt; a &lt; 1\) pada; je injektivna in neomejena.</li></ul>`),
    q(1, "Naj bo a pozitivno realno število, \\(a \\ne 1\\). Razložite zvezo med funkcijama s predpisoma \\(f(x) = \\log_a x\\) in \\(g(x) = \\log_{1/a} x\\).",
      R`<p>\(g(x) = \log_{1/a} x = \frac{\log_a x}{\log_a \frac{1}{a}} = \frac{\log_a x}{-1} = -f(x)\). Grafa sta zrcalna glede na abscisno os.</p>`),
  ]),
  vr(65, [
    q(2, "Dokažite, da za poljubni pozitivni realni števili a in b, \\(a \\ne 1\\) in \\(b \\ne 1\\), in za poljubni pozitivni realni števili x in y velja: \\(\\log_a x + \\log_a y = \\log_a(x \\cdot y)\\).",
      R`<p>Označimo \(u = \log_a x\), \(v = \log_a y\), torej \(x = a^u\), \(y = a^v\). Potem \(xy = a^u a^v = a^{u+v}\), zato po definiciji logaritma \(\log_a(xy) = u + v = \log_a x + \log_a y\).</p>`,
      R`<p>Logaritem je eksponent: \(\log_a x\) je tisti eksponent, na katerega moramo potencirati \(a\), da dobimo \(x\). Pravila za logaritme so zato prevod pravil za potence: produkt potenc z isto osnovo \(\to\) vsota eksponentov.</p>
<p>Primer: \(\log_2 8 + \log_2 4 = 3 + 2 = 5 = \log_2 32\).</p>`),
    q(2, "Dokažite še: \\(\\log_a x = \\dfrac{\\log_b x}{\\log_b a}\\).",
      R`<p>Naj bo \(u = \log_a x\), torej \(a^u = x\). Enakost logaritmiramo z osnovo \(b\): \(\log_b(a^u) = \log_b x\), \(u\log_b a = \log_b x\). Ker je \(a \ne 1\), je \(\log_b a \ne 0\), zato \(u = \frac{\log_b x}{\log_b a}\).</p>`,
      R`<p>Uporabili smo pravilo \(\log_b(a^u) = u\log_b a\) (dokaz: \(a = b^{\log_b a}\), zato \(a^u = b^{u\log_b a}\)).</p>
<p>Formula za prehod k novi osnovi omogoča, da logaritem s poljubno osnovo izračunamo s kalkulatorjem: \(\log_2 10 = \frac{\log 10}{\log 2} = \frac{1}{\log 2} \approx 3.32\).</p>`),
    q(2, "Povejte še dve pravili za računanje z logaritmi.",
      R`<ul><li>\(\log_a \frac{x}{y} = \log_a x - \log_a y\),</li><li>\(\log_a x^r = r\log_a x\),</li>
<li>\(\log_a 1 = 0\), \(\log_a a = 1\), \(a^{\log_a x} = x\).</li></ul>`),
  ]),
  vr(66, [
    ref(66, 1),
    q(2, "Kako seštevamo polinome? Kakšna je stopnja vsote dveh polinomov?",
      R`<p>Seštejemo koeficiente pri istih potencah: \((a_n x^n + \dots + a_0) + (b_n x^n + \dots + b_0) = (a_n + b_n)x^n + \dots + (a_0 + b_0)\).</p>
<p>\(\operatorname{st}(p + q) \le \max(\operatorname{st} p, \operatorname{st} q)\). Če sta stopnji različni, je enaka večji; če sta enaki, je lahko manjša (vodilna koeficienta se odštejeta, npr. \((x^2 + 1) + (-x^2 + x) = x + 1\)).</p>`),
    ref(66, 3, 1),
    q(1, "Razložite deljenje poljubnega polinoma p s polinomom \\(q(x) = x - c\\), kjer je c poljubno realno število.",
      R`<p>\(p(x) = (x - c)\,k(x) + r\), kjer je ostanek \(r\) konstanta (stopnja ostanka je manjša od 1). Vstavimo \(x = c\): \(r = p(c)\). Ostanek je torej vrednost polinoma v \(c\); računamo s <b>Hornerjevim algoritmom</b>, ki da hkrati koeficiente količnika \(k\) in ostanek. Če je \(p(c) = 0\), je \(c\) ničla in \(x - c\) deli \(p\).</p>`),
  ]),
  vr(67, [
    q(1, "Največ koliko realnih ničel ima lahko poljuben polinom stopnje n?",
      R`<p>Največ \(n\) (neničelni polinom stopnje \(n\)).</p>`),
    ref(67, 2),
    q(2, "Koliko realnih ničel ima lahko polinom tretje in koliko polinom četrte stopnje? Navedite vse možnosti.",
      R`<p>Kompleksne ničle polinoma z realnimi koeficienti nastopajo v konjugiranih parih, zato se število realnih ničel (šteto z večkratnostjo) od stopnje razlikuje za sodo število.</p>
<ul><li>3. stopnja: 1 ali 3 realne ničle (šteto z večkratnostjo); različnih je lahko 1, 2 ali 3 (npr. \(x^3\); \(x^2(x - 1)\); \(x(x - 1)(x + 1)\)). Vsaj eno vedno ima.</li>
<li>4. stopnja: 0, 2 ali 4 (šteto z večkratnostjo); različnih je lahko 0, 1, 2, 3 ali 4 (npr. \(x^4 + 1\); \(x^4\); \((x^2 - 1)(x^2 + 1)\); \(x^2(x^2 - 1)\); \((x^2 - 1)(x^2 - 4)\)).</li></ul>`),
    q(2, "Opišite metodo bisekcije za iskanje ničel polinomov.",
      R`<p>Poiščemo interval \([a, b]\), na katerem polinom spremeni predznak (\(p(a)\,p(b) &lt; 0\)); ker je polinom zvezen, ima na njem ničlo. Izračunamo vrednost v razpolovišču \(s = \frac{a + b}{2}\) in obdržimo tisto polovico, na kateri se predznak spremeni. Postopek ponavljamo, dokler interval ni dovolj majhen (vsak korak ga razpolovi).</p>`,
      R`<p>Primer: \(p(x) = x^3 - 2\) na \([1, 2]\): \(p(1) = -1\), \(p(2) = 6\). \(p(1.5) = 1.375 > 0\) \(\to [1, 1.5]\); \(p(1.25) \approx -0.05 &lt; 0\) \(\to [1.25, 1.5]\); … ničla \(\sqrt[3]{2} \approx 1.26\).</p>
<p>Po \(n\) korakih je interval dolg \(\frac{b - a}{2^n}\), za natančnost na 3 decimalke iz intervala dolžine 1 torej potrebujemo okoli 10 korakov.</p>
<p>Pozor: metoda ne najde ničel sode stopnje (tam se predznak ne spremeni).</p>`),
  ]),
  vr(68, [
    ref(68, 2),
    ref(68, 3),
    q(2, "Opišite, kako rešujemo racionalno neenačbo.",
      R`<p>Neenačbo preoblikujemo v obliko \(\frac{p(x)}{q(x)} > 0\) (ali \(&lt;, \ge, \le\)): vse prenesemo na eno stran in damo na skupni imenovalec (ne množimo z imenovalcem, ker ne poznamo njegovega predznaka). Nato:</p>
<ol><li>poiščemo ničle števca in pole (ničle imenovalca) ter njihove stopnje,</li>
<li>jih nanesemo na številsko premico in določimo predznak na posameznih intervalih (predznak se spremeni pri ničlah in polih lihe stopnje),</li>
<li>preberemo intervale, kjer je izraz ustreznega predznaka; poli nikoli niso rešitve, ničle pa so rešitve le pri \(\ge, \le\).</li></ol>
<p>Primer: \(\frac{x - 1}{x + 2} \le 0\): ničla 1, pol \(-2\), rešitev \((-2, 1]\).</p>`),
  ]),
];
