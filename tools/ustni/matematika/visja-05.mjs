// Višja raven, listki 88–105 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, vr, q, ref, graf } from "./lib.mjs";

export default [
  vr(88, [
    q(1, "Naj bodo a, b, c, d, k in r poljubna realna števila. Izračunajte odvod funkcije \\(f(x) = x^r\\).",
      R`<p>\(f'(x) = r x^{r-1}\).</p>`),
    q(1, "Izračunajte odvod funkcije \\(g(x) = ax^2 + bx + c + dx^{-1}\\).",
      R`<p>\(g'(x) = 2ax + b - dx^{-2} = 2ax + b - \frac{d}{x^2}\).</p>`),
    ref(88, 3),
    ref(88, 4),
    ref(88, 5),
    q(1, "Izračunajte odvod funkcije \\(u(x) = x \\cdot \\ln(\\pi x + \\pi^2)\\).",
      R`<p>Pravilo za produkt in verižno pravilo: \[u'(x) = \ln(\pi x + \pi^2) + x \cdot \frac{\pi}{\pi x + \pi^2} = \ln(\pi x + \pi^2) + \frac{x}{x + \pi}.\]</p>`),
  ]),
  vr(89, [
    q(2, "Naj graf odvedljive funkcije f seka abscisno os v točki \\(T(x_0, 0)\\). Povejte definicijo kota α med grafom funkcije f in abscisno osjo v točki T. Kako izračunamo kot α, če poznamo \\(f'(x_0)\\)?",
      R`<p>Kot med grafom in abscisno osjo je ostri (ali pravi) kot med tangento na graf v \(T\) in abscisno osjo. Ker je naklon tangente \(f'(x_0)\): \[\tan\alpha = |f'(x_0)|.\]</p>`),
    q(2, "Naj graf odvedljive funkcije f seka ordinatno os v točki \\(T(0, y_0)\\). Povejte definicijo kota β med grafom funkcije f in ordinatno osjo v točki T. Kako izračunamo kot β, če poznamo \\(f'(0)\\)?",
      R`<p>\(\beta\) je ostri (ali pravi) kot med tangento v \(T\) in ordinatno osjo. Tangenta z abscisno osjo oklepa kot \(\alpha\), \(\tan\alpha = |f'(0)|\), ordinatna os pa je pravokotna na abscisno, zato \[\beta = 90^\circ - \alpha, \quad \tan\beta = \frac{1}{|f'(0)|}\ \ (f'(0) \ne 0).\] Pri \(f'(0) = 0\) je \(\beta = 90^\circ\).</p>`),
    q(2, "Naj se grafa odvedljivih funkcij f in g sekata v točki \\(T(x_0, y_0)\\). Povejte definicijo kota φ med grafoma funkcij f in g v točki T. Kako izračunamo kot φ, če poznamo \\(f'(x_0)\\) in \\(g'(x_0)\\) (pri tem upoštevajte vse možne situacije)?",
      R`<p>\(\varphi\) je kot med tangentama na grafa v \(T\) (ostri ali pravi). Naj bo \(k_1 = f'(x_0)\), \(k_2 = g'(x_0)\).</p>
<ul><li>\(k_1 = k_2\): tangenti sovpadata, \(\varphi = 0\) (grafa se dotikata),</li>
<li>\(k_1 k_2 = -1\): tangenti sta pravokotni, \(\varphi = 90^\circ\),</li>
<li>sicer: \(\tan\varphi = \left|\frac{k_2 - k_1}{1 + k_1 k_2}\right|\).</li></ul>`,
      R`<p>Formula je ista kot za kot med premicama s smernima koeficientoma \(k_1, k_2\), ker kot med krivuljama definiramo prek tangent. Izpeljava: \(\varphi = |\varphi_2 - \varphi_1|\), kjer sta \(\varphi_i\) naklonska kota, in \(\tan(\varphi_2 - \varphi_1) = \frac{\tan\varphi_2 - \tan\varphi_1}{1 + \tan\varphi_1\tan\varphi_2}\).</p>
<p>Primer: \(f(x) = x^2\), \(g(x) = x\) se sekata v \((1, 1)\); \(k_1 = 2\), \(k_2 = 1\), \(\tan\varphi = \frac{1}{3}\), \(\varphi \approx 18.4^\circ\).</p>`),
  ]),
  vr(90, [
    ref(90, 1),
    ref(90, 2),
    q(2, "Na primeru opišite metodo uvedbe nove integracijske spremenljivke pri računanju nedoločenega integrala.",
      R`<p>Del integranda označimo z novo spremenljivko \(t = g(x)\), izračunamo \(dt = g'(x)\,dx\) in integral zapišemo samo s \(t\). Ko ga izračunamo, se vrnemo k \(x\).</p>
<p>\[\int 2x\cos(x^2)\,dx \;\Big|\; t = x^2,\ dt = 2x\,dx \;\Big|\; = \int \cos t\,dt = \sin t + C = \sin(x^2) + C.\]</p>`,
      R`<p>Metoda je obrat verižnega pravila: \(\left(F(g(x))\right)' = F'(g(x))\,g'(x)\). Zato iščemo v integrandu sestavljeno funkcijo, poleg katere stoji (do konstante natančno) odvod notranje funkcije.</p>
<p>Še en primer: \(\int \frac{x}{x^2 + 1}\,dx\), \(t = x^2 + 1\), \(dt = 2x\,dx\): \(\frac{1}{2}\int\frac{dt}{t} = \frac{1}{2}\ln(x^2 + 1) + C\).</p>
<p>Rezultat vedno lahko preverimo z odvajanjem.</p>`),
  ]),
  vr(91, [
    q(2, "Naj bo a poljubno pozitivno realno število in naj bo r poljubno realno število. Izračunajte \\(\\int x^r\\,dx\\) (tako za \\(r \\ne -1\\) kot za \\(r = -1\\)).",
      R`<p>\(r \ne -1\): \(\int x^r\,dx = \frac{x^{r+1}}{r + 1} + C\). \(r = -1\): \(\int \frac{dx}{x} = \ln|x| + C\).</p>`),
    q(1, "Izračunajte \\(\\int a^x\\,dx\\).",
      R`<p>\(\int a^x\,dx = \frac{a^x}{\ln a} + C\) (\(a \ne 1\)); za \(a = 1\) je \(x + C\).</p>`),
    q(1, "Povejte formulo za integracijo z metodo integracije po delih (per partes).",
      R`<p>\(\int u\,dv = uv - \int v\,du\).</p>`),
    q(2, "Metodo integracije po delih razložite na primeru.",
      R`<p>\(\int x e^x\,dx\): izberemo \(u = x\), \(dv = e^x\,dx\), torej \(du = dx\), \(v = e^x\).</p>
<p>\[\int x e^x\,dx = x e^x - \int e^x\,dx = x e^x - e^x + C = e^x(x - 1) + C.\]</p>`,
      R`<p>Formula izhaja iz pravila za odvod produkta: \((uv)' = u'v + uv'\); integriramo in dobimo \(uv = \int v\,du + \int u\,dv\).</p>
<p>Za \(u\) izberemo tisti faktor, ki se z odvajanjem poenostavi (polinom, \(\ln x\)), za \(dv\) pa tistega, ki ga znamo integrirati. Npr. \(\int \ln x\,dx\): \(u = \ln x\), \(dv = dx\): \(x\ln x - \int x \cdot \frac{1}{x}\,dx = x\ln x - x + C\).</p>`),
  ]),
  vr(92, [
    q(2, "Skicirajte lik, ki ga na intervalu [a, b] omejujejo graf zvezne pozitivne funkcije f, abscisna os ter premici x = a in x = b. Kako izračunamo ploščino tega krivočrtnega lika?",
      R`${graf({ x: [-0.5, 5], y: [-0.5, 3.5], f: [[(x) => 1 + 0.5 * Math.sin(x) + 0.25 * x, "s-k1"], [(x) => 0, "s-k2", 1, 4]], asim: [{ x: 1 }, { x: 4 }], xOznake: [[1, "a"], [4, "b"]], yOznake: [], napis: "lik pod grafom \\(f\\) med \\(x = a\\) in \\(x = b\\)" })}
<p>\[S = \int_a^b f(x)\,dx = F(b) - F(a),\] kjer je \(F\) nedoločeni integral (primitivna funkcija) funkcije \(f\).</p>`),
    q(2, "Naj bo \\(f: \\mathbb{R} \\to \\mathbb{R}\\) liha zvezna funkcija in a pozitivno realno število. Koliko je \\(\\int_{-a}^{a} f(x)\\,dx\\)? Utemeljite odgovor.",
      R`<p>\(\int_{-a}^{a} f(x)\,dx = 0\).</p>
<p>Utemeljitev: graf lihe funkcije je simetričen glede na izhodišče, zato je lik na \([-a, 0]\) zrcalna slika lika na \([0, a]\) na drugi strani abscisne osi: ploščini sta enaki, integrala pa nasprotnega predznaka in se odštejeta. Računsko z \(t = -x\): \(\int_{-a}^{0} f(x)\,dx = \int_{a}^{0} f(-t)(-dt) = \int_0^a f(-t)\,dt = -\int_0^a f(t)\,dt\).</p>`),
    q(2, "Krivočrtni lik, ki ga z abscisno osjo na intervalu [a, b] določa graf zvezne pozitivne funkcije f, zavrtimo okoli abscisne osi za 360°. Narišite skico. Povejte formulo za prostornino nastalega rotacijskega telesa.",
      R`<p>Skica: lik pod grafom \(f\) na \([a, b]\) in njegova zrcalna slika čez abscisno os; prečni prerezi telesa so krogi s polmerom \(f(x)\).</p>
<p>\[V = \pi\int_a^b f(x)^2\,dx.\]</p>
<p>(Telo razrežemo na tanke rezine; vsaka je valj s polmerom \(f(x)\) in debelino \(dx\), prostornine \(\pi f(x)^2\,dx\).)</p>`),
  ]),
  vr(93, [
    q(1, "Naj bo \\(f: [a, b] \\to \\mathbb{R}\\) zvezna funkcija. Pojasnite geometrijski pomen določenega integrala funkcije f na intervalu [a, b].",
      R`<p>\(\int_a^b f(x)\,dx\) je ploščina lika med grafom in abscisno osjo na \([a, b]\), pri čemer deli nad osjo štejejo pozitivno, deli pod osjo pa negativno (orientirana ploščina).</p>`),
    q(2, "Povejte zvezo med določenim in nedoločenim integralom (Newton-Leibnizeva formula). Navedite primer.",
      R`<p>Če je \(F\) primitivna funkcija zvezne funkcije \(f\) (\(F' = f\)), je \[\int_a^b f(x)\,dx = F(b) - F(a).\] Primer: \(\int_0^2 x^2\,dx = \frac{x^3}{3}\Big|_0^2 = \frac{8}{3}\).</p>`),
    q(3, "Na primeru razložite metodo uvedbe nove spremenljivke pri računanju določenega integrala.",
      R`<p>Uvedemo \(t = g(x)\), \(dt = g'(x)\,dx\) in <b>spremenimo tudi meje</b>: \(x = a \to t = g(a)\), \(x = b \to t = g(b)\). Potem se ni treba vračati k \(x\).</p>
<p>\[\int_0^{1} 2x\,e^{x^2}\,dx \;\Big|\; t = x^2,\ dt = 2x\,dx,\ x = 0 \to t = 0,\ x = 1 \to t = 1 \;\Big|\; = \int_0^1 e^t\,dt = e^t\Big|_0^1 = e - 1.\]</p>`,
      R`<p>Pogosta napaka: uvedemo novo spremenljivko, meje pa pustimo stare. Meje se nanašajo na integracijsko spremenljivko, zato jih moramo pretvoriti z isto zvezo \(t = g(x)\).</p>
<p>Druga možnost: najprej izračunamo nedoločeni integral (z vrnitvijo k \(x\)), nato vstavimo stare meje: \(\int 2x e^{x^2}dx = e^{x^2} + C\), \(e^1 - e^0 = e - 1\). Rezultat je enak.</p>
<p>Še primer: \(\int_0^{\pi/2}\sin x\cos x\,dx\), \(t = \sin x\): meje \(0 \to 0\), \(\frac{\pi}{2} \to 1\): \(\int_0^1 t\,dt = \frac{1}{2}\).</p>`),
  ]),
  vr(94, [
    ref(94, 1),
    ref(94, 2),
    ref(94, 3),
    ref(94, 4),
    q(1, "Povejte pravilo vključitev in izključitev za dve množici ter ga razložite na primeru.",
      R`<p>\(m(A \cup B) = m(A) + m(B) - m(A \cap B)\).</p>
<p>Primer: v razredu 15 dijakov trenira nogomet, 10 košarko, 4 oboje. Vsaj en šport trenira \(15 + 10 - 4 = 21\) dijakov (tisti 4 so šteti dvakrat).</p>`),
    q(1, "Povejte pravilo vključitev in izključitev za tri množice.",
      R`<p>\[m(A \cup B \cup C) = m(A) + m(B) + m(C) - m(A \cap B) - m(A \cap C) - m(B \cap C) + m(A \cap B \cap C).\]</p>`),
  ]),
  vr(95, [
    q(1, "Koliko je vseh bijektivnih funkcij iz končne množice A nase?",
      R`<p>Če je \(m(A) = n\), jih je \(n!\) (to so ravno permutacije elementov \(A\)): za sliko prvega elementa imamo \(n\) možnosti, za drugega \(n - 1\), …</p>`),
    q(1, "Povejte primer končne množice A in bijektivne funkcije iz A v A.",
      R`<p>\(A = \{1, 2, 3\}\), \(f(1) = 2\), \(f(2) = 3\), \(f(3) = 1\).</p>`),
    ref(95, 1, 1),
    ref(95, 2),
    ref(95, 3, 1),
    ref(95, 4),
  ]),
  vr(96, [
    q(2, "Naj ima množica A moč r, naj ima množica B moč n in naj bo \\(r &lt; n\\). Koliko je vseh injektivnih funkcij iz množice A v množico B?",
      R`<p>\[n(n - 1)(n - 2)\cdots(n - r + 1) = \frac{n!}{(n - r)!} = V_n^r.\] Prvi element lahko preslikamo v katerega koli od \(n\) elementov, drugi v enega od preostalih \(n - 1\) (slike morajo biti različne) in tako naprej do \(r\)-tega.</p>`),
    q(2, "Naj bosta A in B končni množici. Koliko je vseh funkcij iz množice A v množico B?",
      R`<p>Če je \(m(A) = r\) in \(m(B) = n\), je funkcij \(n^r\) (variacije s ponavljanjem): vsak od \(r\) elementov iz \(A\) neodvisno preslikamo v enega od \(n\) elementov iz \(B\).</p>`),
    ref(96, 1, 1),
    ref(96, 3, 1),
  ]),
  vr(97, [
    ref(97, 1),
    ref(97, 2),
    ref(97, 3),
    q(1, "Za nenegativni celi števili n in r, kjer je \\(r \\le n\\), opišite zvezo med številoma \\(V_n^r\\) in \\(C_n^r\\).",
      R`<p>\(V_n^r = r! \cdot C_n^r\). Vsako kombinacijo (izbiro \(r\) elementov brez vrstnega reda) lahko uredimo na \(r!\) načinov, kar da vse variacije.</p>`),
  ]),
  vr(98, [
    q(1, "Povejte binomski izrek.",
      R`<p>\[(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k = \binom{n}{0}a^n + \binom{n}{1}a^{n-1}b + \dots + \binom{n}{n}b^n.\]</p>`),
    q(2, "Moč množice A je n. Koliko je moč potenčne množice množice A? Dokažite.",
      R`<p>\(m(\mathcal{P}(A)) = 2^n\).</p>
<p>Dokaz z binomskim izrekom: podmnožic s \(k\) elementi je \(\binom{n}{k}\), \(k = 0, 1, \dots, n\). Vseh je \[\binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = (1 + 1)^n = 2^n\] (binomski izrek za \(a = b = 1\)).</p>`,
      R`<p>Drugače s pravilom produkta: za vsak element se odločimo, ali je v podmnožici ali ne (2 možnosti), odločitev je \(n\), zato \(2^n\) podmnožic.</p>
<p>Primer \(n = 3\): \(1 + 3 + 3 + 1 = 8 = 2^3\) (prazna, tri enoelementne, tri dvoelementne, cela množica), kar je ravno 3. vrstica Pascalovega trikotnika.</p>`),
    ref(98, 3),
    ref(98, 4),
  ]),
  vr(99, [
    q(2, "Pojasnite osnovne pojme verjetnostnega računa: poskus in dogodek (slučajni dogodki, nemogoči in gotovi dogodki, elementarni dogodki, sestavljeni dogodki).",
      R`<ul><li><b>poskus:</b> dejanje, ki ga lahko poljubnokrat ponovimo pod enakimi pogoji in ima več možnih izidov (met kocke),</li>
<li><b>dogodek:</b> izid ali množica izidov poskusa; <b>slučajni</b> dogodek se lahko zgodi ali ne,</li>
<li><b>nemogoči</b> dogodek \(N\) se ne zgodi nikoli, <b>gotovi</b> \(G\) vedno,</li>
<li><b>elementarni</b> dogodek je posamezen izid (ga ne moremo razstaviti), <b>sestavljeni</b> pa je vsota več elementarnih.</li></ul>`),
    q(1, "Pojasnite pojem vzorčni prostor.",
      R`<p>Vzorčni prostor \(\Omega\) je množica vseh elementarnih dogodkov (izidov) poskusa; pri metu kocke \(\Omega = \{1, 2, 3, 4, 5, 6\}\).</p>`),
    q(1, "Pojasnite pojem popolni sistem dogodkov poskusa.",
      R`<p>Dogodki \(A_1, \dots, A_n\) tvorijo popoln sistem, če so paroma nezdružljivi (\(A_i A_j = N\)) in je njihova vsota gotov dogodek (\(A_1 + \dots + A_n = G\)): pri vsaki izvedbi se zgodi natanko eden. Primer: »sodo«, »liho« pri metu kocke.</p>`),
    q(2, "Povejte primer poskusa in opišite nekaj dogodkov v tem poskusu. Izrazite jih z elementarnimi dogodki vzorčnega prostora. Kateri med njimi so nemogoči, gotovi, elementarni in kateri sestavljeni dogodki?",
      R`<p>Met kocke, \(\Omega = \{1, 2, 3, 4, 5, 6\}\):</p>
<ul><li>»pade 4« \(= \{4\}\): elementarni,</li><li>»pade sodo število« \(= \{2, 4, 6\}\): sestavljeni,</li>
<li>»pade manj kot 7« \(= \Omega\): gotovi,</li><li>»pade 7« \(= \emptyset\): nemogoči.</li></ul>`),
  ]),
  vr(100, [
    ref(100, 1, 1),
    ref(100, 2),
    q(2, "Kdaj sta dva dogodka odvisna in kdaj neodvisna? Kako izračunamo verjetnost produkta dveh odvisnih dogodkov?",
      R`<p>Dogodka sta neodvisna, če uresničitev enega ne vpliva na verjetnost drugega: \(P(B \mid A) = P(B)\), ekvivalentno \(P(AB) = P(A)P(B)\). Sicer sta odvisna.</p>
<p>Za odvisna dogodka: \(P(AB) = P(A) \cdot P(B \mid A)\).</p>
<p>Primer: iz škatle s 3 rdečimi in 2 modrima kroglicama dvakrat vlečemo brez vračanja; \(P(\text{obe rdeči}) = \frac{3}{5}\cdot\frac{2}{4} = \frac{3}{10}\).</p>`),
    q(1, "Povejte primer dveh neodvisnih dogodkov in izračunajte verjetnost produkta teh dveh dogodkov.",
      R`<p>Vržemo kovanec in kocko. \(A\): »pade grb«, \(B\): »pade 6«. \(P(AB) = \frac{1}{2}\cdot\frac{1}{6} = \frac{1}{12}\).</p>`),
  ]),
  vr(101, [
    q(2, "Kaj je relativna frekvenca danega dogodka? Definirajte empirično (statistično) verjetnost.",
      R`<p>Če poskus ponovimo \(n\)-krat in se dogodek \(A\) zgodi \(k\)-krat, je relativna frekvenca \(f(A) = \frac{k}{n}\).</p>
<p>Empirična (statistična) verjetnost je število, okoli katerega se ustali relativna frekvenca, ko število ponovitev narašča: \(P(A) \approx \frac{k}{n}\) za velike \(n\).</p>`),
    q(1, "Povejte klasično (matematično) definicijo verjetnosti.",
      R`<p>Če ima poskus \(n\) enako verjetnih izidov in je dogodku \(A\) ugodnih \(k\) od njih, je \(P(A) = \frac{k}{n}\).</p>`),
    q(1, "Definirajte pogojno verjetnost.",
      R`<p>Verjetnost dogodka \(B\) pri pogoju, da se je zgodil \(A\) (\(P(A) > 0\)): \[P(B \mid A) = \frac{P(AB)}{P(A)}.\]</p>`),
    q(2, "Definirajte Bernoullijevo zaporedje neodvisnih poskusov. Kako izračunamo verjetnost, da se v n ponovitvah poskusa dani dogodek zgodi natanko k-krat?",
      R`<p>Bernoullijevo zaporedje je \(n\)-kratna ponovitev istega poskusa, pri čemer so ponovitve neodvisne in ima dogodek \(A\) pri vsaki ponovitvi isto verjetnost \(p\).</p>
<p>\[P_n(k) = \binom{n}{k}p^k(1 - p)^{n-k}.\]</p>
<p>Primer: verjetnost, da v 5 metih kocke trikrat pade 6: \(\binom{5}{3}\left(\frac{1}{6}\right)^3\left(\frac{5}{6}\right)^2 \approx 0.032\).</p>`,
      R`<p>Zakaj ta formula? Eno konkretno zaporedje z \(k\) uspehi in \(n - k\) neuspehi (npr. UUUNN) ima zaradi neodvisnosti verjetnost \(p^k(1 - p)^{n-k}\). Takih zaporedij je toliko, kolikor je načinov, da izberemo \(k\) mest za uspehe izmed \(n\): \(\binom{n}{k}\). Ta zaporedja so nezdružljiva, zato verjetnosti seštejemo.</p>`),
  ]),
  vr(102, [
    q(1, "Opišite osnovne statistične pojme: populacija in vzorec (reprezentativen, slučajen).",
      R`<p><b>Populacija</b> je množica vseh enot, ki jih proučujemo. <b>Vzorec</b> je podmnožica populacije, ki jo dejansko izmerimo. Vzorec je <b>reprezentativen</b>, če dobro predstavlja populacijo (lastnosti so podobno zastopane), in <b>slučajen</b>, če ima vsaka enota populacije enako možnost, da je izbrana.</p>`),
    ref(102, 2),
    ref(102, 3),
    q(1, "Povejte primer statistične naloge in na njem razložite osnovne statistične pojme.",
      R`<p>Zanima nas povprečna višina slovenskih dijakov 4. letnika. Populacija: vsi dijaki 4. letnika v Sloveniji; vzorec: 300 naključno izbranih dijakov; statistična enota: posamezen dijak; spremenljivka: višina (številska, zvezna); parameter: povprečna višina.</p>`),
    q(2, "Na primeru razložite razliko med številsko in opisno statistično spremenljivko ter razliko med zvezno in diskretno statistično spremenljivko.",
      R`<ul><li><b>številska</b> (kvantitativna) spremenljivka ima številske vrednosti (višina, število bratov), <b>opisna</b> (kvalitativna, atributivna) opisne (barva oči, spol),</li>
<li>številska je <b>diskretna</b>, če ima posamezne (izolirane, štete) vrednosti, npr. število bratov \(0, 1, 2, \dots\), in <b>zvezna</b>, če lahko zavzame katerokoli vrednost iz intervala (merjena), npr. višina ali masa.</li></ul>`),
  ]),
  vr(103, [
    q(3, "Definirajte frekvenco, relativno frekvenco in kumulativno frekvenco statistične spremenljivke (znaka).",
      R`<ul><li><b>frekvenca</b> \(f_i\) vrednosti (razreda) je število enot s to vrednostjo,</li>
<li><b>relativna frekvenca</b> \(f_i' = \frac{f_i}{n}\) je delež enot s to vrednostjo (\(n\) je število vseh enot), pogosto v odstotkih; vsota je 1,</li>
<li><b>kumulativna frekvenca</b> \(F_i = f_1 + \dots + f_i\) je število enot z vrednostjo, manjšo ali enako dani (pri urejenih vrednostih).</li></ul>`),
    q(2, "Kako izračunamo aritmetično sredino (povprečje) posamičnih podatkov in kako grupiranih podatkov?",
      R`<p>Posamični podatki: \(\bar x = \frac{x_1 + x_2 + \dots + x_n}{n}\).</p>
<p>Grupirani podatki (vrednosti ali sredine razredov \(x_i\) s frekvencami \(f_i\)): \(\bar x = \frac{f_1 x_1 + f_2 x_2 + \dots + f_k x_k}{f_1 + \dots + f_k}\) (pri razredih je to približek).</p>`),
    ref(103, 3),
  ]),
  vr(104, [
    ref(104, 1),
    ref(104, 2),
    ref(104, 3),
  ]),
  vr(105, [
    ref(105, 1),
    ref(105, 2),
    ref(105, 3),
    ref(105, 4),
  ]),
];
