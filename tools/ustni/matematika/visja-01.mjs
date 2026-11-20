// Višja raven, listki 1–25 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, vr, q, ref } from "./lib.mjs";

const tabela = (glava, vrstice) =>
  `<table class="ustni-tabela"><tr>${glava.map((g) => `<th>${g}</th>`).join("")}</tr>${vrstice
    .map((v) => `<tr>${v.map((c) => `<td>${c}</td>`).join("")}</tr>`)
    .join("")}</table>`;

export default [
  vr(1, [
    ref(1, 1),
    ref(1, 2),
    q(1, "Kaj je konjunkcija izjav?",
      R`<p>Konjunkcija \(A \wedge B\) (»A in B«) je izjava, ki je resnična samo, kadar sta resnični obe izjavi \(A\) in \(B\); v vseh drugih primerih je neresnična.</p>`),
    q(3, "Kaj je disjunkcija izjav? Dokažite, da je izjava \\(\\neg(A \\wedge B)\\) enakovredna izjavi \\((\\neg A) \\vee (\\neg B)\\) za poljubni izjavi A in B.",
      R`<p>Disjunkcija \(A \vee B\) (»A ali B«) je resnična, kadar je resnična vsaj ena od izjav, in neresnična samo, ko sta obe neresnični.</p>
<p>Dokaz s pravilnostno tabelo (stolpca \(\neg(A \wedge B)\) in \((\neg A) \vee (\neg B)\) se ujemata v vseh vrsticah):</p>
${tabela([R`\(A\)`, R`\(B\)`, R`\(A \wedge B\)`, R`\(\neg(A \wedge B)\)`, R`\(\neg A\)`, R`\(\neg B\)`, R`\(\neg A \vee \neg B\)`],
  [[1, 1, 1, 0, 0, 0, 0], [1, 0, 0, 1, 0, 1, 1], [0, 1, 0, 1, 1, 0, 1], [0, 0, 0, 1, 1, 1, 1]])}`,
      R`<p>To je <b>De Morganov zakon</b>. Dve sestavljeni izjavi sta enakovredni, če imata pri vsaki izbiri vrednosti \(A\) in \(B\) enako vrednost. Ker imamo dve izjavi, so možne le 4 kombinacije, zato jih pregledamo vse.</p>
<p>Brez tabele: \(\neg(A \wedge B)\) je resnična natanko tedaj, ko \(A \wedge B\) ni resnična, torej ko vsaj ena od \(A\), \(B\) ni resnična, to pa pomeni, da je resnična vsaj ena od \(\neg A\), \(\neg B\), kar je ravno \(\neg A \vee \neg B\).</p>`),
  ]),
  vr(2, [
    ref(2, 1),
    q(3, "Kaj je implikacija? Dokažite, da je izjava \\(A \\Rightarrow B\\) enakovredna izjavi \\((\\neg B) \\Rightarrow (\\neg A)\\) za poljubni izjavi A in B.",
      R`<p>Implikacija \(A \Rightarrow B\) (»če A, potem B«) je neresnična samo, kadar je \(A\) resnična in \(B\) neresnična.</p>
${tabela([R`\(A\)`, R`\(B\)`, R`\(A \Rightarrow B\)`, R`\(\neg B\)`, R`\(\neg A\)`, R`\(\neg B \Rightarrow \neg A\)`],
  [[1, 1, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0], [0, 1, 1, 0, 1, 1], [0, 0, 1, 1, 1, 1]])}
<p>Stolpca 3 in 6 sta enaka, zato sta izjavi enakovredni.</p>`,
      R`<p>Izjavi \(\neg B \Rightarrow \neg A\) rečemo <b>obrat s kontrapozicijo</b> (kontrapozicija). Na njej temelji dokaz s kontrapozicijo: namesto »če A, potem B« dokažemo »če ni B, potem ni A«.</p>
<p>Primer: »Če je \(n^2\) sod, je \(n\) sod« dokažemo tako, da pokažemo »če je \(n\) lih, je \(n^2\) lih«.</p>
<p>Pozor: \(B \Rightarrow A\) (obrat) ni enakovredna \(A \Rightarrow B\) (v drugi vrstici tabele je \(B \Rightarrow A\) resnična, \(A \Rightarrow B\) pa ne).</p>`),
    q(2, "Kaj je ekvivalenca? Predstavite primer ekvivalence, ki je pravilna (resnična).",
      R`<p>Ekvivalenca \(A \Leftrightarrow B\) (»A natanko tedaj, ko B«) je resnična, kadar imata \(A\) in \(B\) enako pravilnostno vrednost. Enakovredna je \((A \Rightarrow B) \wedge (B \Rightarrow A)\).</p>
<p>Primer: »Naravno število je deljivo s 6« \(\Leftrightarrow\) »naravno število je deljivo z 2 in s 3«. Pa tudi: »\(2 + 2 = 5\)« \(\Leftrightarrow\) »\(3\) je sodo« je resnična, ker sta obe neresnični.</p>`),
  ]),
  vr(3, [
    q(1, "Kaj je prazna množica in kaj je univerzalna množica? Kaj je moč množice?",
      R`<p>Prazna množica \(\emptyset\) nima elementov. Univerzalna množica \(U\) vsebuje vse elemente, o katerih govorimo. Moč \(m(A)\) končne množice je število njenih elementov.</p>`),
    ref(3, 2),
    q(3, "Kaj je potenčna množica dane množice? Kolikšna je moč potenčne množice? Utemeljite.",
      R`<p>Potenčna množica \(\mathcal{P}(A)\) je množica vseh podmnožic množice \(A\) (vključno z \(\emptyset\) in \(A\)). Če je \(m(A) = n\), je \(m(\mathcal{P}(A)) = 2^n\).</p>
<p>Utemeljitev: podmnožico sestavimo tako, da se za vsak od \(n\) elementov odločimo, ali ga vzamemo ali ne. Za vsak element imamo 2 možnosti, odločitve so neodvisne, zato je po pravilu produkta vseh podmnožic \(2 \cdot 2 \cdots 2 = 2^n\).</p>`,
      R`<p>Primer \(A = \{a, b\}\): odločitve (vzamem \(a\)?, vzamem \(b\)?) dajo 4 kombinacije: \(\emptyset, \{a\}, \{b\}, \{a, b\}\).</p>
<p>Drugače z indukcijo: dodamo nov element \(x\). Vsaka stara podmnožica ostane, poleg nje pa dobimo še njo z dodanim \(x\), zato se število podmnožic podvoji: \(2^n \to 2^{n+1}\).</p>
<p>Ali s kombinacijami: \(\binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = (1 + 1)^n = 2^n\) (število podmnožic z 0, 1, …, \(n\) elementi).</p>`),
  ]),
  vr(4, [
    q(1, "Kdaj je množica A podmnožica množice B? Kdaj sta dve množici enaki?",
      R`<p>\(A \subseteq B\), če je vsak element \(A\) tudi element \(B\). \(A = B\), če imata iste elemente, tj. \(A \subseteq B\) in \(B \subseteq A\).</p>`),
    q(2, "Kaj je presek dveh množic? Kaj je unija dveh množic?",
      R`<p>Presek \(A \cap B = \{x;\ x \in A \wedge x \in B\}\) so skupni elementi. Unija \(A \cup B = \{x;\ x \in A \vee x \in B\}\) so elementi, ki so vsaj v eni od množic.</p>`),
    q(3, "Za množici A in B velja: \\(m(A) = n\\), \\(m(B) = m\\). Ocenite, kolikšna je lahko moč množic \\(A \\cup B\\) in \\(A \\cap B\\). Kolikšna je moč kartezičnega produkta množic A in B?",
      R`<p>Ker je \(m(A \cup B) = m(A) + m(B) - m(A \cap B)\), velja:</p>
<ul><li>\(0 \le m(A \cap B) \le \min(n, m)\) (presek je prazen, če sta disjunktni, in največji, če je manjša množica vsebovana v večji),</li>
<li>\(\max(n, m) \le m(A \cup B) \le n + m\) (najmanjša, ko je manjša v večji, največja, ko sta disjunktni).</li></ul>
<p>\(m(A \times B) = n \cdot m\), ker vsak od \(n\) elementov iz \(A\) tvori par z vsakim od \(m\) elementov iz \(B\).</p>`),
  ]),
  vr(5, [
    ref(5, 1),
    q(2, "Napišite vseh pet osnovnih računskih zakonov o seštevanju in množenju v množicah \\(\\mathbb{N}\\) in \\(\\mathbb{Z}\\).",
      R`<ul><li>komutativnost (zamenjava): \(a + b = b + a\), \(ab = ba\),</li>
<li>asociativnost (združevanje): \((a + b) + c = a + (b + c)\), \((ab)c = a(bc)\),</li>
<li>distributivnost (razčlenjevanje): \((a + b)c = ac + bc\).</li></ul>`),
    q(3, "Kaj je matematična (popolna) indukcija? Razložite na primeru.",
      R`<p>Matematična indukcija je način dokazovanja trditev, ki veljajo za vsa naravna števila \(n\). Dokaz ima dva koraka:</p>
<ol><li><b>baza:</b> trditev velja za \(n = 1\),</li>
<li><b>indukcijski korak:</b> če trditev velja za neki \(n\) (indukcijska predpostavka), velja tudi za \(n + 1\).</li></ol>
<p>Potem trditev velja za vse \(n \in \mathbb{N}\).</p>
<p>Primer: \(1 + 2 + \dots + n = \frac{n(n+1)}{2}\). Baza: \(1 = \frac{1 \cdot 2}{2}\). Korak: \(1 + \dots + n + (n+1) = \frac{n(n+1)}{2} + (n + 1) = \frac{(n+1)(n+2)}{2}\), kar je formula za \(n + 1\).</p>`,
      R`<p>Indukcijo si predstavljamo kot domine: baza podre prvo domino, indukcijski korak zagotovi, da vsaka podrta domina podre naslednjo. Torej padejo vse.</p>
<p>Pri koraku vedno najprej zapišemo, kaj predpostavimo (trditev za \(n\)) in kaj želimo dokazati (trditev za \(n + 1\)). Nato izraz za \(n + 1\) preoblikujemo tako, da v njem nastopi izraz za \(n\), in uporabimo predpostavko.</p>
<p>Še en primer: \(6 \mid 7^n - 1\). Baza: \(7 - 1 = 6\). Korak: \(7^{n+1} - 1 = 7(7^n - 1) + 6\); prvi člen je po predpostavki deljiv s 6, drugi tudi.</p>`),
  ]),
  vr(6, [
    ref(6, 1, 1),
    ref(6, 2, 1),
    ref(6, 3),
    q(2, "Pokažite, da je vsota dveh zaporednih lihih števil deljiva s 4.",
      R`<p>Zaporedni lihi števili sta \(2k - 1\) in \(2k + 1\), \(k \in \mathbb{Z}\). Vsota je \((2k - 1) + (2k + 1) = 4k\), kar je deljivo s 4.</p>`),
  ]),
  vr(7, [
    q(2, "Definirajte praštevilo in sestavljeno število. Zapišite množico praštevil, ki so manjša od 20. Naštejte vsa sestavljena števila med 30 in 40.",
      R`<p>Praštevilo je naravno število, večje od 1, ki ima natanko dva delitelja (1 in samega sebe). Sestavljeno število je naravno število, večje od 1, ki ima več kot dva delitelja. (1 ni ne praštevilo ne sestavljeno.)</p>
<p>Praštevila, manjša od 20: \(\{2, 3, 5, 7, 11, 13, 17, 19\}\).</p>
<p>Sestavljena števila med 30 in 40: 32, 33, 34, 35, 36, 38, 39 (31 in 37 sta praštevili).</p>`),
    q(2, "Kaj je razcep naravnega števila na prafaktorje? Ali je razcep na prafaktorje enoličen?",
      R`<p>Razcep na prafaktorje je zapis števila kot produkta praštevil, npr. \(360 = 2^3 \cdot 3^2 \cdot 5\). Po <b>osnovnem izreku aritmetike</b> ima vsako naravno število \(n > 1\) tak razcep in ta je enoličen (do vrstnega reda faktorjev natančno).</p>`),
    q(2, "Dokažite, da je praštevil neskončno mnogo.",
      R`<p>Dokaz s protislovjem (Evklid). Recimo, da je praštevil končno mnogo: \(p_1, p_2, \dots, p_k\). Tvorimo \(N = p_1 p_2 \cdots p_k + 1\). \(N > 1\), zato ima vsaj en prafaktor \(p\), ki je eden od \(p_i\). Ta \(p\) deli produkt \(p_1 \cdots p_k\) in deli \(N\), zato deli tudi razliko \(N - p_1 \cdots p_k = 1\). To ni mogoče, zato je praštevil neskončno mnogo.</p>`,
      R`<p>Ideja dokaza s protislovjem: predpostavimo nasprotno od tega, kar želimo dokazati, in pridemo do nesmisla. Torej je bila predpostavka napačna.</p>
<p>Pomembno: \(N\) sam ni nujno praštevilo! Npr. \(2 \cdot 3 \cdot 5 \cdot 7 \cdot 11 \cdot 13 + 1 = 30031 = 59 \cdot 509\). Pomembno je le, da \(N\) ni deljiv z nobenim od naštetih praštevil (pri deljenju z vsakim da ostanek 1), zato ima prafaktor, ki ga na seznamu ni.</p>`),
  ]),
  vr(8, [
    ref(8, 1),
    ref(8, 2),
    ref(8, 3),
    q(1, "Dokažite trditev: Če število a deli števili b in c, potem deli tudi vsoto njunih večkratnikov.",
      R`<p>Ker \(a \mid b\) in \(a \mid c\), obstajata celi števili \(k, l\), da je \(b = ka\) in \(c = la\). Za poljubni celi števili \(x, y\) je \(xb + yc = xka + yla = (xk + yl)a\), zato \(a \mid xb + yc\).</p>`),
  ]),
  vr(9, [
    q(2, "Definirajte največji skupni delitelj in najmanjši skupni večkratnik dveh naravnih števil. Razložite metodo za izračun najmanjšega skupnega večkratnika dveh naravnih števil.",
      R`<p>\(D(a, b)\) je največje naravno število, ki deli \(a\) in \(b\). \(v(a, b)\) je najmanjše naravno število, ki je večkratnik \(a\) in \(b\).</p>
<p>Metoda: obe števili razcepimo na prafaktorje; \(v(a, b)\) je produkt vseh prafaktorjev, ki nastopajo v vsaj enem razcepu, vsak z <b>največjo</b> potenco. Npr. \(12 = 2^2 \cdot 3\), \(18 = 2 \cdot 3^2\): \(v = 2^2 \cdot 3^2 = 36\) (pri \(D\) vzamemo skupne prafaktorje z najmanjšo potenco: \(D = 2 \cdot 3 = 6\)).</p>`),
    q(1, "Povejte zvezo med a, b, \\(v(a, b)\\) in \\(D(a, b)\\).",
      R`<p>\[D(a, b) \cdot v(a, b) = a \cdot b.\] Npr. \(6 \cdot 36 = 12 \cdot 18 = 216\).</p>`),
    q(1, "Kdaj sta si dve naravni števili tuji?",
      R`<p>Kadar je \(D(a, b) = 1\), tj. nimata skupnega delitelja razen 1 (npr. 8 in 15). Takrat je \(v(a, b) = ab\).</p>`),
    q(2, "Na primeru razložite Evklidov algoritem.",
      R`<p>Evklidov algoritem računa \(D(a, b)\) z zaporednim deljenjem z ostankom: večje število delimo z manjšim, nato delitelja delimo z ostankom in tako naprej. Zadnji od 0 različni ostanek je \(D(a, b)\). Deluje, ker je \(D(a, b) = D(b, r)\), kjer je \(r\) ostanek pri deljenju \(a\) z \(b\).</p>
<p>Primer \(D(252, 198)\):<br>\(252 = 1 \cdot 198 + 54\)<br>\(198 = 3 \cdot 54 + 36\)<br>\(54 = 1 \cdot 36 + 18\)<br>\(36 = 2 \cdot 18 + 0\), torej \(D(252, 198) = 18\).</p>`,
      R`<p>Zakaj \(D(a, b) = D(b, r)\)? Iz \(a = kb + r\) sledi: vsak skupni delitelj \(a\) in \(b\) deli tudi \(r = a - kb\), in vsak skupni delitelj \(b\) in \(r\) deli tudi \(a = kb + r\). Pari \((a, b)\) in \((b, r)\) imajo torej iste skupne delitelje, zato tudi isti največji.</p>
<p>Ker ostanki strogo padajo, se postopek vedno konča z ostankom 0.</p>`),
  ]),
  vr(10, [
    ref(10, 1, 1),
    q(1, "Zapišite množico vseh ostankov pri deljenju z naravnim številom m.",
      R`<p>\(\{0, 1, 2, \dots, m - 1\}\), ker za ostanek \(r\) velja \(0 \le r &lt; m\).</p>`),
    q(2, "Na primeru opišite, kako naravno število, ki je zapisano v desetiškem sestavu, zapišemo v številskem sestavu z osnovo 2.",
      R`<p>Število zaporedoma delimo z 2 in si zapisujemo ostanke, dokler ne dobimo količnika 0. Ostanke preberemo od zadnjega proti prvemu.</p>
<p>\(45 : 2 = 22\), ost. 1; \(22 : 2 = 11\), ost. 0; \(11 : 2 = 5\), ost. 1; \(5 : 2 = 2\), ost. 1; \(2 : 2 = 1\), ost. 0; \(1 : 2 = 0\), ost. 1.<br>Torej \(45 = (101101)_2\).</p>`),
    q(2, "Na primeru opišite, kako število, ki je zapisano v številskem sestavu z osnovo 2, zapišemo v desetiškem sestavu.",
      R`<p>Vsako števko pomnožimo s potenco števila 2, ki ustreza njenemu mestu (od desne: \(2^0, 2^1, 2^2, \dots\)), in seštejemo:</p>
<p>\((101101)_2 = 1 \cdot 2^5 + 0 \cdot 2^4 + 1 \cdot 2^3 + 1 \cdot 2^2 + 0 \cdot 2 + 1 = 32 + 8 + 4 + 1 = 45\).</p>`),
  ]),
  vr(11, [
    q(2, "Za vsako število \\(k \\in \\{2, 3, 4, 5, 6, 8, 9, 10\\}\\) navedite kriterij deljivosti s številom k.",
      R`<ul><li>2: zadnja števka je soda,</li><li>3: vsota števk je deljiva s 3,</li><li>4: število iz zadnjih dveh števk je deljivo s 4,</li>
<li>5: zadnja števka je 0 ali 5,</li><li>6: število je deljivo z 2 in s 3,</li><li>8: število iz zadnjih treh števk je deljivo z 8,</li>
<li>9: vsota števk je deljiva z 9,</li><li>10: zadnja števka je 0.</li></ul>`),
    q(2, "Izpeljite kriterij deljivosti s številom 2.",
      R`<p>Število z zadnjo števko \(a_0\) zapišemo kot \(n = 10 \cdot m + a_0\), kjer je \(m\) število brez zadnje števke. Ker \(2 \mid 10m\), je \(n\) deljiv z 2 natanko tedaj, ko je \(a_0\) deljiv z 2, torej ko je zadnja števka soda (0, 2, 4, 6, 8).</p>`),
    q(2, "Za trimestno število \\(\\overline{abc}\\) utemeljite kriterij deljivosti s številom 3.",
      R`<p>\(\overline{abc} = 100a + 10b + c = (99a + 9b) + (a + b + c) = 3(33a + 3b) + (a + b + c)\).</p>
<p>Prvi del je vedno deljiv s 3, zato je \(\overline{abc}\) deljivo s 3 natanko tedaj, ko je s 3 deljiva vsota števk \(a + b + c\).</p>`,
      R`<p>Ključ je, da da vsaka potenca števila 10 pri deljenju s 3 ostanek 1: \(10 = 9 + 1\), \(100 = 99 + 1\). Zato ima število pri deljenju s 3 enak ostanek kot vsota njegovih števk.</p>
<p>Isti razmislek (z 9 namesto 3) da kriterij deljivosti z 9. Primer: \(471\): \(4 + 7 + 1 = 12\), \(3 \mid 12\), zato \(3 \mid 471\) (\(471 = 3 \cdot 157\)).</p>`),
  ]),
  vr(12, [
    ref(12, 1),
    q(2, "Kako je definirana relacija \\(\\le\\) v množici \\(\\mathbb{Q}\\)? Opišite dve lastnosti te relacije.",
      R`<p>Za racionalni števili velja \(p \le q\) natanko tedaj, ko je \(q - p \ge 0\) (razlika je nenegativna). Za ulomka s pozitivnima imenovalcema: \(\frac{a}{b} \le \frac{c}{d} \iff ad \le bc\).</p>
<p>Lastnosti (dve zadoščata):</p>
<ul><li>refleksivnost: \(p \le p\),</li><li>antisimetričnost: iz \(p \le q\) in \(q \le p\) sledi \(p = q\),</li>
<li>tranzitivnost: iz \(p \le q\) in \(q \le r\) sledi \(p \le r\),</li><li>sovisnost: za poljubna \(p, q\) velja \(p \le q\) ali \(q \le p\).</li></ul>`),
    q(2, "Pokažite, da za poljubni racionalni števili p in q, kjer je \\(p &lt; q\\), obstaja tako racionalno število r, da je \\(p &lt; r &lt; q\\).",
      R`<p>Vzamemo aritmetično sredino \(r = \frac{p + q}{2}\). Je racionalna (vsota in količnik racionalnih števil). Iz \(p &lt; q\) sledi \(2p &lt; p + q &lt; 2q\), po deljenju z 2 pa \(p &lt; r &lt; q\).</p>
<p>Posledica: med poljubnima različnima racionalnima številoma je neskončno mnogo racionalnih števil (\(\mathbb{Q}\) je povsod gosta).</p>`),
  ]),
  vr(13, [
    ref(13, 1),
    ref(13, 2),
    q(2, "Povejte primer racionalnega števila s periodičnim decimalnim zapisom (z dolžino periode tri) in ga zapišite kot ulomek.",
      R`<p>\(x = 0.\overline{123} = 0.123123\ldots\)<br>\(1000x = 123.123123\ldots\)<br>Odštejemo: \(999x = 123\), \(x = \frac{123}{999} = \frac{41}{333}\).</p>`),
  ]),
  vr(14, [
    ref(14, 1),
    q(2, "Naštejte tri primere racionalnih števil in tri primere iracionalnih števil.",
      R`<p>Racionalna: \(-3\), \(\frac{2}{7}\), \(0.25\). Iracionalna: \(\sqrt{2}\), \(\pi\), \(e\) (tudi \(\sqrt{3} + 1\), \(\log_2 3\)).</p>`),
    q(2, "Dokažite, da \\(\\sqrt{2}\\) ni racionalno število.",
      R`<p>Dokaz s protislovjem. Recimo, da je \(\sqrt{2} = \frac{a}{b}\), kjer je ulomek okrajšan (\(a, b \in \mathbb{N}\), \(D(a, b) = 1\)). Kvadriramo: \(a^2 = 2b^2\), torej je \(a^2\) sod, zato je sod tudi \(a\): \(a = 2k\). Vstavimo: \(4k^2 = 2b^2\), \(b^2 = 2k^2\), zato je sod tudi \(b\). Torej sta \(a\) in \(b\) oba soda, kar nasprotuje okrajšanosti. Zato \(\sqrt{2}\) ni racionalno.</p>`,
      R`<p>Zakaj iz »\(a^2\) je sod« sledi »\(a\) je sod«? Če bi bil \(a\) lih, \(a = 2m + 1\), bi bil \(a^2 = 4m^2 + 4m + 1\) lih. (To je dokaz s kontrapozicijo.)</p>
<p>Zakaj smemo predpostaviti, da je ulomek okrajšan? Vsak ulomek lahko okrajšamo, zato bi tak zapis obstajal, če bi bil \(\sqrt{2}\) racionalen. Protislovje pokaže, da ga ni.</p>
<p>Enak dokaz deluje za \(\sqrt{p}\), kjer je \(p\) poljubno praštevilo.</p>`),
  ]),
  vr(15, [
    q(2, "Definirajte absolutno vrednost realnega števila in razložite njen geometrijski pomen.",
      R`<p>\[|x| = \begin{cases} x, & x \ge 0, \\ -x, & x &lt; 0. \end{cases}\] Geometrijsko je \(|x|\) razdalja točke \(x\) od izhodišča 0 na številski premici, zato je vedno \(|x| \ge 0\).</p>`),
    q(1, "Pojasnite pomen števila \\(|b - a|\\), kjer sta a in b realni števili.",
      R`<p>\(|b - a|\) je razdalja med točkama \(a\) in \(b\) na številski premici (dolžina daljice med njima). Velja \(|b - a| = |a - b|\).</p>`),
    q(1, "Rešite enačbo \\(|x - a| = b\\), kjer je b pozitivno realno število.",
      R`<p>Iščemo točke, ki so od \(a\) oddaljene za \(b\): \(x - a = b\) ali \(x - a = -b\), torej \(x_1 = a + b\), \(x_2 = a - b\).</p>`),
    q(2, "Dokažite, da za poljubni realni števili x in y velja \\(|x + y| \\le |x| + |y|\\).",
      R`<p>Za vsako realno število velja \(-|x| \le x \le |x|\) in \(-|y| \le y \le |y|\). Seštejemo: \[-(|x| + |y|) \le x + y \le |x| + |y|.\] To pomeni, da je \(x + y\) od 0 oddaljen največ \(|x| + |y|\), torej \(|x + y| \le |x| + |y|\).</p>`,
      R`<p>To je <b>trikotniška neenakost</b>. Zadnji korak uporablja, da za \(c \ge 0\) velja: \(|t| \le c \iff -c \le t \le c\).</p>
<p>Drug dokaz: obe strani sta nenegativni, zato ju smemo kvadrirati: \((x + y)^2 = x^2 + 2xy + y^2 \le x^2 + 2|x||y| + y^2 = (|x| + |y|)^2\), ker je \(xy \le |xy|\).</p>
<p>Enakost velja natanko tedaj, ko imata \(x\) in \(y\) enak predznak (ali je eden 0).</p>`),
  ]),
  vr(16, [
    q(1, "Definirajte množico kompleksnih števil.",
      R`<p>\(\mathbb{C} = \{a + bi;\ a, b \in \mathbb{R}\}\), kjer je \(i\) imaginarna enota z lastnostjo \(i^2 = -1\). \(a = \operatorname{Re}(z)\) je realni, \(b = \operatorname{Im}(z)\) imaginarni del.</p>`),
    q(1, "Kako grafično upodobimo (predstavimo) kompleksna števila?",
      R`<p>V kompleksni (Gaussovi) ravnini: številu \(z = a + bi\) priredimo točko \((a, b)\); na vodoravni osi je realni, na navpični imaginarni del.</p>`),
    q(1, "Definirajte seštevanje kompleksnih števil.",
      R`<p>Seštevamo realna in imaginarna dela posebej: \((a + bi) + (c + di) = (a + c) + (b + d)i\).</p>`),
    q(1, "Kakšen geometrijski pomen ima seštevanje kompleksnih števil?",
      R`<p>Seštevanje ustreza seštevanju vektorjev (krajevnih vektorjev točk): vsota \(z + w\) je četrto oglišče paralelograma z oglišči \(0\), \(z\) in \(w\). Prištevanje \(w\) pomeni vzporedni premik (translacijo) za vektor \(w\).</p>`),
    q(2, "V kompleksni ravnini predstavite podmnožici kompleksnih števil \\(A = \\{z \\in \\mathbb{C};\\ (\\operatorname{Re}(z) \\le 2) \\wedge (\\operatorname{Im}(z) = -1)\\}\\) in \\(B = \\{z \\in \\mathbb{C};\\ 2\\operatorname{Re}(z) - \\operatorname{Im}(z) = 3\\}\\).",
      R`<p>Pišemo \(z = x + yi\).</p>
<ul><li>\(A\): \(y = -1\) in \(x \le 2\) je <b>poltrak</b> na vodoravni premici \(y = -1\), ki se začne v točki \(2 - i\) in gre v levo (krajišče vključeno).</li>
<li>\(B\): \(2x - y = 3\), tj. \(y = 2x - 3\), je <b>premica</b> z naklonom 2, ki seka realno os v \(\frac{3}{2}\) in imaginarno os v \(-3i\).</li></ul>
<p>Premica \(B\) seka poltrak \(A\) v točki \(1 - i\) (\(y = -1 \Rightarrow x = 1 \le 2\)).</p>`),
  ]),
  vr(17, [
    q(1, "Definirajte operacijo množenja v množici \\(\\mathbb{C}\\).",
      R`<p>\((a + bi)(c + di) = (ac - bd) + (ad + bc)i\) (množimo kot dvočlenika in upoštevamo \(i^2 = -1\)).</p>`),
    q(2, "Opišite geometrijski pomen množenja kompleksnega števila s številom −1 in geometrijski pomen množenja kompleksnega števila z realnim številom.",
      R`<p>Množenje z \(-1\): \(-z\) je zrcalna slika \(z\) čez izhodišče (vrtež za \(180^\circ\) okoli 0).</p>
<p>Množenje z realnim \(k\): razteg (\(|k| > 1\)) ali skrčitev (\(|k| &lt; 1\)) s središčem v izhodišču za faktor \(|k|\); točka ostane na isti premici skozi 0. Pri \(k &lt; 0\) se še prezrcali čez izhodišče.</p>`),
    ref(17, 3),
    q(2, "Izberite kompleksno število \\(z = a + bi\\), kjer sta a in b od nič različni realni števili, in opišite lego števila \\(i \\cdot z\\) v kompleksni ravnini.",
      R`<p>Npr. \(z = 2 + i\): \(iz = 2i + i^2 = -1 + 2i\). V splošnem \(i(a + bi) = -b + ai\).</p>
<p>Točka \((a, b)\) preide v \((-b, a)\): \(iz\) dobimo z <b>vrtežem \(z\) za \(90^\circ\) v pozitivni smeri</b> (nasproti urnemu kazalcu) okoli izhodišča. Absolutna vrednost se ne spremeni.</p>`),
  ]),
  vr(18, [
    q(2, "Definirajte absolutno vrednost kompleksnega števila in predstavite njen geometrijski pomen.",
      R`<p>Za \(z = a + bi\) je \(|z| = \sqrt{a^2 + b^2} = \sqrt{z \bar{z}}\). Geometrijsko je to razdalja točke \(z\) od izhodišča (po Pitagorovem izreku). \(|z - w|\) je razdalja med \(z\) in \(w\).</p>`),
    q(2, "Dokažite, da je \\(|z \\cdot w| = |z| \\cdot |w|\\), kjer sta z in w kompleksni števili.",
      R`<p>Uporabimo \(|z|^2 = z\bar{z}\) in \(\overline{zw} = \bar{z}\,\bar{w}\):</p>
<p>\[|zw|^2 = zw\,\overline{zw} = z\bar{z}\,w\bar{w} = |z|^2 |w|^2.\] Ker so absolutne vrednosti nenegativne, sledi \(|zw| = |z||w|\).</p>`,
      R`<p>Dokaz s komponentami: za \(z = a + bi\), \(w = c + di\) je \(zw = (ac - bd) + (ad + bc)i\) in</p>
<p>\[(ac - bd)^2 + (ad + bc)^2 = a^2c^2 + b^2d^2 + a^2d^2 + b^2c^2 = (a^2 + b^2)(c^2 + d^2),\] ker se mešana člena \(\mp 2abcd\) odštejeta. Korenimo in dobimo \(|zw| = |z||w|\).</p>`),
    q(2, "V kompleksni ravnini predstavite množico točk \\(K = \\{z \\in \\mathbb{C};\\ |z - 1 + i| = 3\\}\\).",
      R`<p>\(|z - 1 + i| = |z - (1 - i)|\) je razdalja točke \(z\) od točke \(1 - i\). Množica \(K\) je torej <b>krožnica</b> s središčem v \(1 - i\) (točka \((1, -1)\)) in polmerom 3. V koordinatah: \((x - 1)^2 + (y + 1)^2 = 9\).</p>`),
  ]),
  vr(19, [
    ref(19, 1),
    q(2, "Naj bo \\(z = a + bi\\), \\(a \\cdot b \\ne 0\\). Število \\(z^{-1}\\) zapišite v obliki \\(c + di\\), kjer sta \\(c, d \\in \\mathbb{R}\\).",
      R`<p>Ulomek razširimo s konjugirano vrednostjo imenovalca:</p>
<p>\[z^{-1} = \frac{1}{a + bi} = \frac{a - bi}{(a + bi)(a - bi)} = \frac{a - bi}{a^2 + b^2} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2}\,i.\]</p>`),
    q(2, "Dokažite, da je konjugirana vrednost produkta dveh kompleksnih števil enaka produktu njunih konjugiranih vrednosti.",
      R`<p>Naj bo \(z = a + bi\), \(w = c + di\).</p>
<p>\(zw = (ac - bd) + (ad + bc)i\), zato \(\overline{zw} = (ac - bd) - (ad + bc)i\).</p>
<p>\(\bar{z}\,\bar{w} = (a - bi)(c - di) = ac - adi - bci + bdi^2 = (ac - bd) - (ad + bc)i\).</p>
<p>Izraza sta enaka, torej \(\overline{zw} = \bar{z}\,\bar{w}\).</p>`),
  ]),
  vr(20, [
    ref(20, 1),
    ref(20, 2),
    q(2, "Kako rešimo sistem treh linearnih enačb s tremi neznankami? Zapišite primer takega sistema.",
      R`<p>Z metodo zamenjave (izrazimo eno neznanko in vstavimo) ali z <b>Gaussovo eliminacijo</b> (nasprotni koeficienti): iz dveh parov enačb izločimo isto neznanko, dobimo sistem dveh enačb z dvema neznankama, ga rešimo in vrnemo vrednosti v eno od prvotnih enačb.</p>
<p>Primer: \(x + y + z = 6\), \(x - y + z = 2\), \(2x + y - z = 1\).<br>1. − 2.: \(2y = 4\), \(y = 2\). 1. + 3.: \(3x + 2y = 7\), \(x = 1\). Iz 1.: \(z = 3\). Rešitev \((1, 2, 3)\).</p>
<p>Sistem ima lahko eno rešitev, nobene ali neskončno mnogo rešitev.</p>`),
  ]),
  vr(21, [
    ref(21, 1),
    ref(21, 2),
    q(2, "Dokažite dve izmed zgornjih pravil.",
      R`<p>Za naravna eksponenta:</p>
<p>\(a^m \cdot a^n = \underbrace{a \cdots a}_{m} \cdot \underbrace{a \cdots a}_{n} = a^{m+n}\) (skupaj \(m + n\) faktorjev).</p>
<p>\((a^m)^n = \underbrace{a^m \cdots a^m}_{n} = a^{m + m + \dots + m} = a^{mn}\).</p>
<p>Za cele eksponente pravila sledijo iz definicije \(a^{-n} = \frac{1}{a^n}\), npr. \(a^m \cdot a^{-n} = \frac{a^m}{a^n} = a^{m-n}\) (pri \(m > n\) se \(n\) faktorjev okrajša).</p>`,
      R`<p>Pri dokazu za cele eksponente obravnavamo primere predznakov. Npr. \((ab)^{-n} = \frac{1}{(ab)^n} = \frac{1}{a^n b^n} = a^{-n} b^{-n}\) in \((a^{-m})^{-n} = \frac{1}{(a^{-m})^n} = \frac{1}{a^{-mn}} = a^{mn}\).</p>
<p>Definicija \(a^0 = 1\) in \(a^{-n} = \frac{1}{a^n}\) je izbrana ravno tako, da pravilo \(a^m : a^n = a^{m-n}\) velja tudi pri \(m \le n\).</p>`),
  ]),
  vr(22, [
    q(2, "Za poljubno naravno število n in za poljubno realno število x definirajte n-ti koren števila x.",
      R`<ul><li>Če je \(n\) sod in \(x \ge 0\): \(\sqrt[n]{x}\) je tisto <b>nenegativno</b> število \(y\), za katero je \(y^n = x\). Za \(x &lt; 0\) sod koren ni definiran (v \(\mathbb{R}\)).</li>
<li>Če je \(n\) lih: \(\sqrt[n]{x}\) je tisto realno število \(y\), za katero je \(y^n = x\) (obstaja za vsak \(x\), npr. \(\sqrt[3]{-8} = -2\)).</li></ul>`),
    q(1, "Kako množimo korena z enakima in kako z različnima korenskima stopnjama? Zadnje pravilo dokažite.",
      R`<p>Enaki stopnji: \(\sqrt[n]{a} \cdot \sqrt[n]{b} = \sqrt[n]{ab}\). Različni stopnji: korena razširimo na skupno stopnjo, \(\sqrt[n]{a} \cdot \sqrt[m]{b} = \sqrt[nm]{a^m b^n}\).</p>
<p>Dokaz (\(a, b \ge 0\)): \(\left(\sqrt[n]{a}\,\sqrt[m]{b}\right)^{nm} = \left(\sqrt[n]{a}\right)^{nm} \left(\sqrt[m]{b}\right)^{nm} = a^m b^n\), in ker je \(\sqrt[n]{a}\,\sqrt[m]{b} \ge 0\), je to \(\sqrt[nm]{a^m b^n}\).</p>`),
    ref(22, 3),
    q(2, "Racionalizirajte imenovalec ulomka \\(\\dfrac{\\sqrt{b}}{\\sqrt{a} + \\sqrt{b}}\\).",
      R`<p>Razširimo z \(\sqrt{a} - \sqrt{b}\) (velja \(a \ne b\)):</p>
<p>\[\frac{\sqrt{b}}{\sqrt{a} + \sqrt{b}} \cdot \frac{\sqrt{a} - \sqrt{b}}{\sqrt{a} - \sqrt{b}} = \frac{\sqrt{ab} - b}{a - b}.\]</p>`),
  ]),
  vr(23, [
    ref(23, 1),
    ref(23, 2),
    q(2, "Dokažite eno izmed zgornjih pravil.",
      R`<p>Dokažimo \(a^r \cdot a^s = a^{r+s}\) za \(r = \frac{m}{n}\), \(s = \frac{p}{q}\) (\(a > 0\)). Ulomka zapišemo s skupnim imenovalcem: \(r = \frac{mq}{nq}\), \(s = \frac{np}{nq}\). Potem</p>
<p>\[a^r a^s = \sqrt[nq]{a^{mq}}\,\sqrt[nq]{a^{np}} = \sqrt[nq]{a^{mq + np}} = a^{\frac{mq + np}{nq}} = a^{r+s}.\]</p>`,
      R`<p>Dokaz uporablja tri stvari: definicijo \(a^{\frac{m}{n}} = \sqrt[n]{a^m}\), pravilo za množenje korenov z enako stopnjo in pravilo za potence z naravnimi (celimi) eksponenti \(a^{mq} a^{np} = a^{mq+np}\).</p>
<p>Lažje je še pravilo \((ab)^r = a^r b^r\): \((ab)^{\frac{m}{n}} = \sqrt[n]{(ab)^m} = \sqrt[n]{a^m b^m} = \sqrt[n]{a^m}\,\sqrt[n]{b^m} = a^{\frac{m}{n}} b^{\frac{m}{n}}\).</p>`),
  ]),
  vr(24, [
    q(1, "Definirajte vzporednost premic v ravnini in vzporednost premic v prostoru.",
      R`<p>V ravnini: premici sta vzporedni, če se ne sekata ali če sovpadata. V prostoru: premici sta vzporedni, če ležita v isti ravnini in se ne sekata (ali sovpadata).</p>`),
    q(2, "Naštejte vse možne medsebojne lege dveh premic v prostoru.",
      R`<ul><li>premici sovpadata (sta enaki),</li><li>sta vzporedni (in različni),</li><li>se sekata v eni točki,</li>
<li>sta mimobežni (ne ležita v isti ravnini, se ne sekata in nista vzporedni).</li></ul>`),
    q(2, "Naštejte dve lastnosti relacije vzporednosti premic v prostoru.",
      R`<ul><li>refleksivnost: \(p \parallel p\),</li><li>simetričnost: iz \(p \parallel q\) sledi \(q \parallel p\),</li>
<li>tranzitivnost: iz \(p \parallel q\) in \(q \parallel r\) sledi \(p \parallel r\).</li></ul>
<p>Vzporednost je torej ekvivalenčna relacija; razred vzporednih premic določa smer.</p>`),
    ref(24, 4),
  ]),
  vr(25, [
    ref(25, 1),
    q(2, "Pojasnite pojma sosedna kota in sokota.",
      R`<p>Sosednja kota imata skupni vrh in skupen en krak, drugi kraki pa ležita na različnih straneh skupnega kraka. Sokota sta sosednja kota, katerih neskupna kraka ležita na isti premici (tvorita iztegnjen kot), zato je njuna vsota \(180^\circ\).</p>`),
    q(2, "Kdaj je kot oster in kdaj top? Največ koliko notranjih kotov poljubnega štirikotnika je lahko topih?",
      R`<p>Oster kot je manjši od \(90^\circ\), top kot je večji od \(90^\circ\) in manjši od \(180^\circ\).</p>
<p>Vsota notranjih kotov štirikotnika je \(360^\circ\). Štirje topi koti bi dali več kot \(360^\circ\), zato so lahko topi največ <b>trije</b> (npr. \(100^\circ, 100^\circ, 100^\circ, 60^\circ\); pri nekonveksnem štirikotniku je eden lahko celo večji od \(180^\circ\)).</p>`),
    ref(25, 4),
  ]),
];
