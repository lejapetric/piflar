// Višja raven, listki 69–87 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, vr, q, ref, graf } from "./lib.mjs";

const PI = Math.PI;

export default [
  vr(69, [
    q(3, "Naj ima racionalna funkcija f vse ničle in pole na intervalu \\((a, b)\\). Razložite obnašanje racionalne funkcije f izven intervala \\((a, b)\\). Navedite vse možnosti.",
      R`<p>Zunaj \((a, b)\) funkcija nima ničel in polov, zato tam ne spremeni predznaka in je zvezna; za \(|x| \to \infty\) se graf približuje asimptoti. Za \(f(x) = \frac{p(x)}{q(x)}\), \(\operatorname{st} p = m\), \(\operatorname{st} q = n\):</p>
<ul><li>\(m &lt; n\): vodoravna asimptota \(y = 0\),</li><li>\(m = n\): vodoravna asimptota \(y = \frac{a_m}{b_n}\) (količnik vodilnih koeficientov),</li>
<li>\(m = n + 1\): poševna asimptota \(y = kx + n\),</li><li>\(m > n + 1\): asimptota je graf polinoma stopnje \(m - n\) (krivulja), funkcija gre proti \(\pm\infty\).</li></ul>`,
      R`<p>Ključna ideja: racionalno funkcijo z deljenjem polinomov zapišemo kot \(f(x) = k(x) + \frac{r(x)}{q(x)}\), kjer je \(\operatorname{st} r &lt; \operatorname{st} q\). Za velike \(|x|\) gre \(\frac{r(x)}{q(x)} \to 0\), zato se \(f\) obnaša kot polinom \(k(x)\): to je asimptota.</p>
<p>Predznak \(f\) desno od \(b\) je predznak količnika vodilnih koeficientov; levo od \(a\) ga dobimo tako, da upoštevamo, kolikokrat (z lihimi stopnjami) se predznak spremeni na \((a, b)\).</p>`),
    q(2, "Kdaj ima graf racionalne funkcije poševno asimptoto? Kako izračunamo enačbo poševne asimptote, če obstaja?",
      R`<p>Kadar je stopnja števca za natanko 1 večja od stopnje imenovalca. Števec delimo z imenovalcem: \(f(x) = kx + n + \frac{r(x)}{q(x)}\); asimptota je količnik \(y = kx + n\) (ostanek zanemarimo, ker gre proti 0).</p>
<p>Primer: \(\frac{x^2 + 1}{x} = x + \frac{1}{x}\), asimptota \(y = x\).</p>`),
    q(1, "Povejte primer racionalne funkcije, katere graf ima asimptoto z enačbo \\(y = 2x\\).",
      R`<p>\(f(x) = 2x + \frac{1}{x} = \frac{2x^2 + 1}{x}\).</p>`),
  ]),
  vr(70, [
    ref(70, 1),
    ref(70, 2),
    ref(70, 3),
    q(2, "Za katere \\(a \\in \\mathbb{R}\\) premica z enačbo \\(y = a\\) seka graf funkcije sinus? V primerih, ko imata dana premica in graf funkcije sinus neprazen presek, povejte vsa njuna presečišča.",
      R`<p>Za \(-1 \le a \le 1\) (zaloga vrednosti sinusa je \([-1, 1]\)). Presečišča so \((x, a)\), kjer je</p>
<p>\[x = \arcsin a + 2k\pi \quad \text{ali} \quad x = \pi - \arcsin a + 2k\pi, \quad k \in \mathbb{Z}.\]</p>
<p>Za \(a = \pm 1\) se obe družini ujemata: \(x = \pm\frac{\pi}{2} + 2k\pi\).</p>`),
  ]),
  vr(71, [
    ref(71, 1),
    ref(71, 2),
    ref(71, 3),
    q(2, "Za katere \\(a \\in \\mathbb{R}\\) premica z enačbo \\(y = a\\) seka graf funkcije kosinus? V primerih, ko imata dana premica in graf funkcije kosinus neprazen presek, povejte vsa njuna presečišča.",
      R`<p>Za \(-1 \le a \le 1\). Presečišča so \((x, a)\), kjer je \[x = \pm\arccos a + 2k\pi, \quad k \in \mathbb{Z}.\] Za \(a = 1\) je \(x = 2k\pi\), za \(a = -1\) je \(x = \pi + 2k\pi\).</p>`),
  ]),
  vr(72, [
    ref(72, 1),
    ref(72, 2, 1),
    q(1, "Koliko je osnovna perioda funkcije tangens?",
      R`<p>\(\pi\): \(\tan(x + \pi) = \tan x\).</p>`),
    q(1, "Povejte vse ničle funkcije tangens.",
      R`<p>\(x = k\pi\), \(k \in \mathbb{Z}\) (ničle sinusa).</p>`),
    q(2, "Poiščite vsa presečišča grafa funkcije tangens in premice z enačbo \\(y = a\\), kjer je \\(a \\in \\mathbb{R}\\).",
      R`<p>Zaloga vrednosti tangensa je \(\mathbb{R}\), zato premica seka graf za vsak \(a\). Presečišča: \((\arctan a + k\pi,\ a)\), \(k \in \mathbb{Z}\) (na vsaki veji natanko eno).</p>`),
  ]),
  vr(73, [
    q(1, "Za kotne funkcije sinus, kosinus in tangens povejte, ali je funkcija soda oziroma liha.",
      R`<p>Sinus in tangens sta lihi, kosinus je sod: \(\sin(-x) = -\sin x\), \(\cos(-x) = \cos x\), \(\tan(-x) = -\tan x\).</p>`),
    ref(73, 2),
    q(2, "Zapišite zvezo med \\(\\sin(\\pi - x)\\) in \\(\\sin(x)\\) ter zvezo med \\(\\cos(\\pi + x)\\) in \\(\\cos(x)\\).",
      R`<p>\(\sin(\pi - x) = \sin x\), \(\cos(\pi + x) = -\cos x\).</p>
<p>(Na enotski krožnici: točka za \(\pi - x\) je zrcalna slika čez ordinatno os, točka za \(\pi + x\) pa čez izhodišče.)</p>`),
    q(1, "Dokažite, da je \\(\\sin\\left(\\frac{\\pi}{2} - x\\right) = \\cos x\\) za vsako realno število x.",
      R`<p>Po adicijskem izreku: \(\sin\left(\frac{\pi}{2} - x\right) = \sin\frac{\pi}{2}\cos x - \cos\frac{\pi}{2}\sin x = 1 \cdot \cos x - 0 \cdot \sin x = \cos x\).</p>`),
  ]),
  vr(74, [
    ref(74, 1),
    ref(74, 2),
    q(2, "Povejte še štiri zveze med kotnimi funkcijami v pravokotnem trikotniku in eno med njimi dokažite.",
      R`<ul><li>\(\tan\alpha = \frac{\sin\alpha}{\cos\alpha}\), \(\cot\alpha = \frac{\cos\alpha}{\sin\alpha}\),</li><li>\(\tan\alpha \cdot \cot\alpha = 1\),</li>
<li>\(1 + \tan^2\alpha = \frac{1}{\cos^2\alpha}\),</li><li>\(\sin(90^\circ - \alpha) = \cos\alpha\), \(\tan(90^\circ - \alpha) = \cot\alpha\) (funkcije komplementarnih kotov).</li></ul>
<p>Dokaz \(\tan\alpha = \frac{\sin\alpha}{\cos\alpha}\): \(\frac{\sin\alpha}{\cos\alpha} = \frac{a/c}{b/c} = \frac{a}{b} = \tan\alpha\) (\(a\) kateta nasproti \(\alpha\), \(b\) priležna, \(c\) hipotenuza).</p>`),
  ]),
  vr(75, [
    ref(75, 1),
    q(2, "Izrazite \\(\\sin(2x)\\) in \\(\\cos(2x)\\) s \\(\\sin x\\) in \\(\\cos x\\). Eno od formul dokažite.",
      R`<p>\(\sin 2x = 2\sin x\cos x\), \(\cos 2x = \cos^2 x - \sin^2 x\).</p>
<p>Dokaz: v adicijski izrek vstavimo \(y = x\): \(\sin(x + x) = \sin x\cos x + \cos x\sin x = 2\sin x\cos x\).</p>`),
    q(2, "Izrazite \\(\\tan(2x)\\) s \\(\\tan x\\). Dokažite.",
      R`<p>\[\tan 2x = \frac{2\tan x}{1 - \tan^2 x}.\]</p>
<p>Dokaz: \(\tan 2x = \frac{\sin 2x}{\cos 2x} = \frac{2\sin x\cos x}{\cos^2 x - \sin^2 x}\). Števec in imenovalec delimo s \(\cos^2 x\): \(\frac{2\tan x}{1 - \tan^2 x}\). (Velja, kjer so vsi izrazi definirani: \(\cos x \ne 0\), \(\tan^2 x \ne 1\).)</p>`),
  ]),
  vr(76, [
    q(1, "Definirajte funkcijo arkus sinus.",
      R`<p>\(\arcsin: [-1, 1] \to \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\) je inverzna funkcija sinusa, zoženega na \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\): \(y = \arcsin x \iff \sin y = x\) in \(-\frac{\pi}{2} \le y \le \frac{\pi}{2}\).</p>`),
    q(1, "Narišite graf funkcije arkus sinus.",
      R`${graf({ x: [-1.6, 1.6], y: [-1.8, 1.8], f: [[Math.asin, "s-k1", -1, 1]], tocke: [[1, PI / 2], [-1, -PI / 2]], yOznake: [[PI / 2, "π/2"], [-PI / 2, "−π/2"]], enota: 60, napis: "\\(y = \\arcsin x\\)" })}
<p>Graf je zrcalna slika dela sinusoide na \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\) čez premico \(y = x\); gre od \(\left(-1, -\frac{\pi}{2}\right)\) do \(\left(1, \frac{\pi}{2}\right)\) skozi izhodišče.</p>`),
    q(1, "Definirajte funkcijo arkus tangens.",
      R`<p>\(\arctan: \mathbb{R} \to \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)\) je inverzna funkcija tangensa, zoženega na \(\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)\): \(y = \arctan x \iff \tan y = x\) in \(-\frac{\pi}{2} &lt; y &lt; \frac{\pi}{2}\).</p>`),
    q(1, "Narišite graf funkcije arkus tangens.",
      R`${graf({ x: [-6, 6], y: [-2, 2], f: [[Math.atan, "s-k1"]], asim: [{ y: PI / 2 }, { y: -PI / 2 }], yOznake: [[PI / 2, "π/2"], [-PI / 2, "−π/2"]], enota: 30, napis: "\\(y = \\arctan x\\), asimptoti \\(y = \\pm\\frac{\\pi}{2}\\)" })}`),
    q(2, "Opišite dve lastnosti funkcije arkus tangens.",
      R`<ul><li>\(D = \mathbb{R}\), \(Z = \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)\), omejena, vodoravni asimptoti \(y = \pm\frac{\pi}{2}\),</li>
<li>povsod narašča (injektivna), edina ničla \(x = 0\),</li><li>je liha: \(\arctan(-x) = -\arctan x\),</li><li>odvod \(\frac{1}{1 + x^2}\).</li></ul>`),
  ], "Krožne funkcije"),
  vr(77, [
    q(3, "Povejte geometrijsko definicijo krožnice in izpeljite enačbo krožnice s polmerom r in s središčem v točki \\(S(p, q)\\).",
      R`<p>Krožnica je množica točk v ravnini, ki so od dane točke \(S\) (središča) oddaljene za dano razdaljo \(r > 0\) (polmer).</p>
<p>Izpeljava: točka \(T(x, y)\) leži na krožnici natanko tedaj, ko \(d(T, S) = r\). Po formuli za razdaljo \(\sqrt{(x - p)^2 + (y - q)^2} = r\); obe strani sta pozitivni, kvadriramo: \[(x - p)^2 + (y - q)^2 = r^2.\]</p>`),
    q(3, "Naj bosta a in b poljubni realni števili, c pa pozitivno realno število. Katere množice točk v ravnini lahko predstavlja enačba \\(x^2 + y^2 + 2ax + 2by + c = 0\\)?",
      R`<p>Dopolnimo do popolnih kvadratov: \[(x + a)^2 + (y + b)^2 = a^2 + b^2 - c.\]</p>
<ul><li>\(a^2 + b^2 > c\): krožnica s središčem \(S(-a, -b)\) in polmerom \(\sqrt{a^2 + b^2 - c}\),</li>
<li>\(a^2 + b^2 = c\): ena sama točka \((-a, -b)\),</li>
<li>\(a^2 + b^2 &lt; c\): prazna množica (vsota kvadratov ne more biti negativna).</li></ul>`,
      R`<p>Dopolnjevanje: \(x^2 + 2ax = (x + a)^2 - a^2\) in \(y^2 + 2by = (y + b)^2 - b^2\). Enačba postane \((x + a)^2 - a^2 + (y + b)^2 - b^2 + c = 0\).</p>
<p>Primer: \(x^2 + y^2 - 4x + 6y + 4 = 0\): \(a = -2\), \(b = 3\), \((x - 2)^2 + (y + 3)^2 = 4 + 9 - 4 = 9\), krožnica s središčem \((2, -3)\) in polmerom 3.</p>
<p>Ker je \(c > 0\), krožnica nikoli ne gre skozi izhodišče (točka \((0, 0)\) bi dala \(c = 0\)).</p>`),
  ]),
  vr(78, [
    ref(78, 1),
    q(2, "Povejte enačbo elipse s središčem v koordinatnem izhodišču in enačbo elipse s središčem v točki \\(S(p, q)\\). V obeh primerih naj bosta osi elipse vzporedni koordinatnima osema.",
      R`<p>\[\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \qquad \frac{(x - p)^2}{a^2} + \frac{(y - q)^2}{b^2} = 1,\] kjer sta \(a\) in \(b\) polosi (vodoravna in navpična). Pri \(a > b\) sta gorišči na vodoravni osi, \(e = \sqrt{a^2 - b^2}\).</p>`),
    q(2, "Naj bodo A, C, D, E in F realna števila in naj bo \\(A \\cdot C > 0\\). Katere množice točk v ravnini lahko predstavlja enačba \\(Ax^2 + Cy^2 + Dx + Ey + F = 0\\)?",
      R`<p>Dopolnimo do popolnih kvadratov: \(A(x - p)^2 + C(y - q)^2 = K\), kjer je \(p = -\frac{D}{2A}\), \(q = -\frac{E}{2C}\). Ker imata \(A\) in \(C\) enak predznak, smemo predpostaviti \(A, C > 0\) (sicer enačbo pomnožimo z \(-1\)).</p>
<ul><li>\(K > 0\): elipsa s središčem \((p, q)\) (krožnica, če \(A = C\)),</li><li>\(K = 0\): ena točka \((p, q)\),</li><li>\(K &lt; 0\): prazna množica.</li></ul>`),
  ]),
  vr(79, [
    ref(79, 1),
    q(2, "Povejte enačbo hiperbole s središčem v koordinatnem izhodišču in enačbo hiperbole s središčem v točki \\(S(p, q)\\). V obeh primerih naj bosta osi hiperbole vzporedni koordinatnima osema.",
      R`<p>Z goriščema na vodoravni osi: \[\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \qquad \frac{(x - p)^2}{a^2} - \frac{(y - q)^2}{b^2} = 1.\] Z goriščema na navpični osi je na desni \(-1\). Asimptoti: \(y - q = \pm\frac{b}{a}(x - p)\), \(e = \sqrt{a^2 + b^2}\).</p>`),
    q(2, "Naj bodo A, C, D, E in F realna števila in naj bo \\(A \\cdot C &lt; 0\\). Katere množice točk v ravnini lahko predstavlja enačba \\(Ax^2 + Cy^2 + Dx + Ey + F = 0\\)?",
      R`<p>Dopolnimo do popolnih kvadratov: \(A(x - p)^2 + C(y - q)^2 = K\), \(A\) in \(C\) imata nasprotna predznaka.</p>
<ul><li>\(K \ne 0\): hiperbola s središčem \((p, q)\) in osema, vzporednima koordinatnima osema (glavna os vodoravna ali navpična, odvisno od predznaka \(K\)),</li>
<li>\(K = 0\): par premic, ki se sekata v \((p, q)\) (asimptoti): \(y - q = \pm\sqrt{-\frac{A}{C}}\,(x - p)\).</li></ul>`),
  ]),
  vr(80, [
    ref(80, 1, 1),
    q(3, "Povejte enačbo parabole, ki ima teme v točki \\(T(r, d)\\), njena os simetrije pa je vzporedna abscisni osi. Izračunajte gorišče in enačbo premice vodnice te parabole.",
      R`<p>\[(y - d)^2 = 2p(x - r), \quad p \ne 0.\] Gorišče \(G\left(r + \frac{p}{2}, d\right)\), vodnica \(x = r - \frac{p}{2}\). Pri \(p > 0\) je parabola odprta v desno, pri \(p &lt; 0\) v levo.</p>`,
      R`<p>Izhajamo iz parabole s temenom v izhodišču \(y^2 = 2px\). Njeno gorišče je \(\left(\frac{p}{2}, 0\right)\), vodnica \(x = -\frac{p}{2}\) (preverimo: razdalja \(T(x, y)\) do gorišča je \(\sqrt{(x - \frac{p}{2})^2 + y^2}\), do vodnice \(x + \frac{p}{2}\); kvadriramo in izenačimo, dobimo \(y^2 = 2px\)).</p>
<p>Ko parabolo vzporedno premaknemo za \(r\) v smeri \(x\) in za \(d\) v smeri \(y\), \(x\) zamenjamo z \(x - r\) in \(y\) z \(y - d\); za enako premaknemo tudi gorišče in vodnico.</p>`),
    q(2, "Naj bodo A, C, D, E in F realna števila in naj bo \\(A = 0\\) in \\(C \\ne 0\\) ali \\(C = 0\\) in \\(A \\ne 0\\). Katere množice točk v ravnini lahko predstavlja enačba \\(Ax^2 + Cy^2 + Dx + Ey + F = 0\\)?",
      R`<p>Vzemimo \(A = 0\), \(C \ne 0\) (drugi primer je simetričen): \(Cy^2 + Ey + Dx + F = 0\).</p>
<ul><li>\(D \ne 0\): parabola z osjo, vzporedno abscisni osi (\(x\) izrazimo kot kvadratno funkcijo \(y\)),</li>
<li>\(D = 0\): kvadratna enačba samo za \(y\): dve vzporedni premici \(y = y_1\), \(y = y_2\) (diskriminanta \(> 0\)), ena premica (\(= 0\)) ali prazna množica (\(&lt; 0\)).</li></ul>
<p>Pri \(C = 0\), \(A \ne 0\): parabola z osjo, vzporedno ordinatni osi, ali navpične premice.</p>`),
  ]),
  vr(81, [
    ref(81, 1),
    q(2, "Kdaj je zaporedje monotono in kdaj omejeno?",
      R`<p>Monotono je, če je naraščajoče (\(a_{n+1} \ge a_n\) za vse \(n\)) ali padajoče (\(a_{n+1} \le a_n\)). Omejeno je, če obstajata \(m\) in \(M\), da je \(m \le a_n \le M\) za vse \(n\) (navzdol in navzgor omejeno).</p>`),
    q(1, "Kdaj je zaporedje konvergentno in kdaj divergentno?",
      R`<p>Konvergentno je, če ima limito: obstaja \(L\), da za vsak \(\varepsilon > 0\) obstaja \(n_0\), da je \(|a_n - L| &lt; \varepsilon\) za vse \(n > n_0\) (v vsaki okolici \(L\) so skoraj vsi členi). Sicer je divergentno.</p>`),
    q(1, "Povejte primer konvergentnega in primer divergentnega zaporedja.",
      R`<p>Konvergentno: \(a_n = \frac{1}{n}\) (limita 0). Divergentno: \(a_n = n\) ali \(a_n = (-1)^n\).</p>`),
  ]),
  vr(82, [
    ref(82, 1, 1),
    q(1, "Podajte primer padajočega aritmetičnega zaporedja.",
      R`<p>\(10, 7, 4, 1, -2, \dots\) (\(a_1 = 10\), \(d = -3\)); padajoče je natanko pri \(d &lt; 0\).</p>`),
    q(2, "Kako izračunamo vsoto prvih n členov aritmetičnega zaporedja, če poznamo prvi člen in diferenco? Trditev dokažite.",
      R`<p>\[s_n = \frac{n}{2}\left(2a_1 + (n - 1)d\right) = \frac{n}{2}(a_1 + a_n).\]</p>
<p>Dokaz: vsoto zapišemo naprej in nazaj: \(s_n = a_1 + a_2 + \dots + a_n\) in \(s_n = a_n + a_{n-1} + \dots + a_1\). Seštejemo po parih: vsak par ima vsoto \(a_1 + a_n\) (ko gremo za en člen naprej, se prvi poveča za \(d\), drugi zmanjša za \(d\)). Parov je \(n\), torej \(2s_n = n(a_1 + a_n)\).</p>`),
    q(2, "Dokažite, da je zaporedje \\((a_k)\\) aritmetično natanko tedaj, ko je za poljubno naravno število n aritmetična sredina členov \\(a_n\\) in \\(a_{n+2}\\) enaka \\(a_{n+1}\\).",
      R`<p>(\(\Rightarrow\)) Če je zaporedje aritmetično z diferenco \(d\): \(\frac{a_n + a_{n+2}}{2} = \frac{a_{n+1} - d + a_{n+1} + d}{2} = a_{n+1}\).</p>
<p>(\(\Leftarrow\)) Iz \(\frac{a_n + a_{n+2}}{2} = a_{n+1}\) sledi \(a_{n+2} - a_{n+1} = a_{n+1} - a_n\) za vsak \(n\). Razlike zaporednih členov so torej vse enake \(a_2 - a_1 = d\), zato je zaporedje aritmetično.</p>`,
      R`<p>»Natanko tedaj« pomeni ekvivalenco, zato dokazujemo dve smeri: iz aritmetičnosti sledi lastnost sredine in iz lastnosti sredine sledi aritmetičnost.</p>
<p>V drugi smeri formalno uporabimo indukcijo: \(a_2 - a_1 = d\); če je \(a_{n+1} - a_n = d\), je po lastnosti tudi \(a_{n+2} - a_{n+1} = d\).</p>
<p>Od tod ime »aritmetično« zaporedje: vsak člen je aritmetična sredina sosedov.</p>`),
  ]),
  vr(83, [
    ref(83, 1),
    q(3, "Kako izračunamo vsoto prvih n členov geometrijskega zaporedja, če poznamo prvi člen in količnik? Kako izračunamo to vsoto, če je količnik enak 1? Trditvi dokažite.",
      R`<p>Za \(k \ne 1\): \(s_n = a_1\frac{k^n - 1}{k - 1}\). Za \(k = 1\): \(s_n = n a_1\).</p>
<p>Dokaz: \(s_n = a_1 + a_1 k + \dots + a_1 k^{n-1}\), pomnožimo s \(k\): \(k s_n = a_1 k + a_1 k^2 + \dots + a_1 k^n\). Odštejemo (vsi vmesni členi se odštejejo): \(k s_n - s_n = a_1 k^n - a_1\), torej \(s_n(k - 1) = a_1(k^n - 1)\) in pri \(k \ne 1\) delimo s \(k - 1\).</p>
<p>Za \(k = 1\) so vsi členi enaki \(a_1\), zato je vsota \(n a_1\).</p>`,
      R`<p>Trik »pomnoži in odštej« deluje, ker se vsota s \(k\) samo zamakne za en člen. Primer: \(1 + 2 + 4 + \dots + 2^9 = \frac{2^{10} - 1}{2 - 1} = 1023\).</p>
<p>Formula je enakovredna razcepu \(k^n - 1 = (k - 1)(k^{n-1} + \dots + k + 1)\).</p>`),
    q(2, "Naj bo \\((a_k)\\) zaporedje s pozitivnimi členi. Dokažite, da je \\((a_k)\\) geometrijsko zaporedje natanko tedaj, ko je za poljubno naravno število n geometrijska sredina členov \\(a_n\\) in \\(a_{n+2}\\) enaka \\(a_{n+1}\\).",
      R`<p>(\(\Rightarrow\)) Geometrijsko s količnikom \(k > 0\): \(\sqrt{a_n a_{n+2}} = \sqrt{\frac{a_{n+1}}{k}\cdot a_{n+1}k} = \sqrt{a_{n+1}^2} = a_{n+1}\) (ker \(a_{n+1} > 0\)).</p>
<p>(\(\Leftarrow\)) Iz \(\sqrt{a_n a_{n+2}} = a_{n+1}\) sledi \(a_n a_{n+2} = a_{n+1}^2\), torej \(\frac{a_{n+2}}{a_{n+1}} = \frac{a_{n+1}}{a_n}\) za vsak \(n\). Količniki zaporednih členov so vsi enaki \(\frac{a_2}{a_1} = k\), zato je zaporedje geometrijsko.</p>`),
  ]),
  vr(84, [
    q(3, "Kaj je vrsta? Kdaj je vrsta konvergentna in kdaj divergentna? Kaj je vsota konvergentne vrste?",
      R`<p>Vrsta je neskončna vsota členov zaporedja \(a_1 + a_2 + a_3 + \dots = \sum_{n=1}^{\infty} a_n\). Tvorimo zaporedje delnih vsot \(s_n = a_1 + \dots + a_n\).</p>
<p>Vrsta je konvergentna, če je zaporedje delnih vsot konvergentno, sicer je divergentna. Vsota konvergentne vrste je limita delnih vsot: \(s = \lim_{n \to \infty} s_n\).</p>
<p>Primer: \(\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots = 1\) konvergira; \(1 + 1 + 1 + \dots\) divergira.</p>`),
    q(1, "Definirajte geometrijsko vrsto. Kdaj je geometrijska vrsta konvergentna?",
      R`<p>Geometrijska vrsta je \(a_1 + a_1 k + a_1 k^2 + \dots\) (vsota členov geometrijskega zaporedja). Za \(a_1 \ne 0\) je konvergentna natanko tedaj, ko je \(|k| &lt; 1\).</p>`),
    q(2, "Kako izračunamo vsoto konvergentne geometrijske vrste, če poznamo prvi člen in količnik? Trditev dokažite.",
      R`<p>\[s = \frac{a_1}{1 - k}, \quad |k| &lt; 1.\]</p>
<p>Dokaz: delna vsota je \(s_n = a_1\frac{1 - k^n}{1 - k}\). Pri \(|k| &lt; 1\) gre \(k^n \to 0\), zato \(s = \lim_{n\to\infty} s_n = \frac{a_1}{1 - k}\).</p>`,
      R`<p>Zakaj \(k^n \to 0\) pri \(|k| &lt; 1\)? Vsako množenje s \(k\) zmanjša absolutno vrednost za faktor \(|k|\), npr. \(0.5^{10} \approx 0.001\). Pri \(|k| \ge 1\) pa \(k^n\) ne gre proti 0, zato delne vsote nimajo limite (vrsta divergira).</p>
<p>Uporaba: \(0.\overline{3} = \frac{3}{10} + \frac{3}{100} + \dots = \frac{3/10}{1 - 1/10} = \frac{1}{3}\).</p>`),
  ]),
  vr(85, [
    ref(85, 1, 2),
    ref(85, 2),
    q(2, "Opišite primer obročnega odplačevanja posojila na banki, ki uporablja obrestno obrestovanje z letnim pripisom obresti. Posojilo vrnemo v n enakih letnih obrokih, prvi obrok po enem letu od najema posojila. Letna obrestna mera je p %. Kako izračunamo višino obroka?",
      R`<p>Naj bo \(G\) posojilo, \(r = 1 + \frac{p}{100}\) obrestovalni faktor, \(a\) obrok. Na koncu \(n\)-tega leta mora biti dolg poplačan: vrednost posojila na koncu je enaka vsoti vrednosti obrokov ob tem času:</p>
<p>\[G r^n = a r^{n-1} + a r^{n-2} + \dots + a = a\,\frac{r^n - 1}{r - 1} \quad\Rightarrow\quad a = \frac{G r^n (r - 1)}{r^n - 1}.\]</p>
<p>Primer: \(G = 10\,000\) €, \(p = 5\), \(n = 3\): \(a = \frac{10\,000 \cdot 1.05^3 \cdot 0.05}{1.05^3 - 1} \approx 3672\) €.</p>`,
      R`<p>Prvi obrok plačamo po enem letu, zato se do konca obrestuje še \(n - 1\) let (\(a r^{n-1}\)), zadnji obrok pa se ne obrestuje več (\(a\)). Vsota je geometrijska z \(n\) členi in količnikom \(r\).</p>
<p>Enako lahko razmišljamo leto za letom: dolg po prvem letu je \(Gr - a\), po drugem \((Gr - a)r - a\), …, po \(n\)-tem \(Gr^n - a(r^{n-1} + \dots + 1)\), kar mora biti 0.</p>`),
  ]),
  vr(86, [
    ref(86, 1),
    q(2, "Podajte primer funkcije in točke, v kateri je funkcija odvedljiva, in po definiciji odvoda izračunajte njen odvod v izbrani točki.",
      R`<p>\(f(x) = x^2\), \(x_0 = 3\):</p>
<p>\[f'(3) = \lim_{h \to 0}\frac{(3 + h)^2 - 9}{h} = \lim_{h \to 0}\frac{6h + h^2}{h} = \lim_{h \to 0}(6 + h) = 6.\]</p>`),
    q(1, "Naj bo funkcija f odvedljiva v točki \\(x_0\\). Kako izračunamo enačbo tangente na graf funkcije f v točki \\(x_0\\)?",
      R`<p>\(y - f(x_0) = f'(x_0)(x - x_0)\): premica skozi \(T(x_0, f(x_0))\) s smernim koeficientom \(f'(x_0)\).</p>`),
    q(1, "Naj bo funkcija f odvedljiva v točki \\(x_0\\) in naj bo \\(f'(x_0) \\ne 0\\). Kako izračunamo enačbo normale na graf funkcije f v točki \\(x_0\\)?",
      R`<p>Normala je pravokotna na tangento: \(y - f(x_0) = -\frac{1}{f'(x_0)}(x - x_0)\).</p>`),
  ]),
  vr(87, [
    ref(87, 1),
    q(2, "Naj bo \\(f: \\mathbb{R} \\to \\mathbb{R}\\) odvedljiva funkcija. Kako s pomočjo prvega odvoda ugotovimo, ali ima funkcija f v točki \\(x_0\\) lokalni ekstrem?",
      R`<p>Potreben pogoj: \(f'(x_0) = 0\) (stacionarna točka). Zadosten: odvod v \(x_0\) spremeni predznak:</p>
<ul><li>iz \(+\) v \(-\) (funkcija preide iz naraščanja v padanje): lokalni maksimum,</li><li>iz \(-\) v \(+\): lokalni minimum,</li>
<li>ne spremeni predznaka: ni ekstrema (npr. \(x^3\) v 0).</li></ul>`),
    q(2, "Naj bo \\(f: \\mathbb{R} \\to \\mathbb{R}\\) dvakrat odvedljiva funkcija. Kako s pomočjo drugega odvoda ugotovimo, ali ima funkcija f v stacionarni točki lokalni ekstrem?",
      R`<p>V stacionarni točki \(x_0\) (\(f'(x_0) = 0\)):</p>
<ul><li>\(f''(x_0) > 0\): lokalni minimum (graf je tam konveksen),</li><li>\(f''(x_0) &lt; 0\): lokalni maksimum (konkaven),</li>
<li>\(f''(x_0) = 0\): s tem kriterijem ne moremo odločiti (npr. \(x^3\) nima ekstrema, \(x^4\) ima minimum); uporabimo predznak prvega odvoda.</li></ul>`),
  ]),
];
