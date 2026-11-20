// Osnovna raven, listki 1–20 (vprašanja: RIC, Vprašanja za ustni izpit iz matematike 2026; odgovori in razlage: Učilnica.com)
import { R, listek, q } from "./lib.mjs";

export default [
  listek(1, "Izjavni račun", "osnove_logike", [
    q(1, "Kaj je izjava?",
      R`<p>Izjava je smiselna trditev (poved), za katero lahko nedvoumno povemo, ali je resnična (pravilna) ali neresnična (nepravilna). Primer: »5 je praštevilo.« Vprašanja, ukazi in povedi s spremenljivko (npr. \(x > 3\)) niso izjave.</p>`),
    q(1, "Kaj je negacija dane izjave? Kdaj je negacija pravilna (resnična) in kdaj nepravilna (neresnična)?",
      R`<p>Negacija izjave \(A\) je izjava \(\neg A\) (»ni res, da A«). Negacija je resnična, kadar je \(A\) neresnična, in neresnična, kadar je \(A\) resnična.</p>`),
    q(2, "Kaj je konjunkcija izjav? Napišite pravilnostno (resničnostno) tabelo za konjunkcijo.",
      R`<p>Konjunkcija \(A \wedge B\) (»A in B«) je resnična samo, kadar sta resnični obe izjavi.</p>
<table class="ustni-tabela"><tr><th>\(A\)</th><th>\(B\)</th><th>\(A \wedge B\)</th></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>0</td></tr></table>`),
    q(2, "Kaj je disjunkcija izjav? Napišite pravilnostno (resničnostno) tabelo za disjunkcijo.",
      R`<p>Disjunkcija \(A \vee B\) (»A ali B«) je resnična, kadar je resnična vsaj ena od izjav; neresnična je samo, ko sta obe neresnični.</p>
<table class="ustni-tabela"><tr><th>\(A\)</th><th>\(B\)</th><th>\(A \vee B\)</th></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>1</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>0</td><td>0</td></tr></table>`),
  ]),
  listek(2, "Izjavni račun", "osnove_logike", [
    q(1, "Kaj je tavtologija?",
      R`<p>Tavtologija je sestavljena izjava, ki je resnična ne glede na resničnost izjav, iz katerih je sestavljena (v pravilnostni tabeli ima v vseh vrsticah 1). Primer: \(A \vee \neg A\).</p>`),
    q(2, "Kaj je implikacija izjav? Napišite pravilnostno (resničnostno) tabelo za implikacijo.",
      R`<p>Implikacija \(A \Rightarrow B\) (»če A, potem B«) je neresnična samo, kadar je \(A\) resnična in \(B\) neresnična. \(A\) je pogoj (predpostavka), \(B\) posledica (sklep).</p>
<table class="ustni-tabela"><tr><th>\(A\)</th><th>\(B\)</th><th>\(A \Rightarrow B\)</th></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td></tr><tr><td>0</td><td>0</td><td>1</td></tr></table>`,
      R`<p>Zakaj je implikacija z neresničnim pogojem vedno resnična? Implikacija je obljuba: »Če bo jutri sončno, gremo na izlet.« Obljubo prelomimo samo, če je sončno in ne gremo. Če ni sončno, obljube ne moremo prelomiti, karkoli naredimo, zato je implikacija takrat resnična.</p>`),
    q(2, "Kaj je ekvivalenca izjav? Napišite pravilnostno (resničnostno) tabelo za ekvivalenco.",
      R`<p>Ekvivalenca \(A \Leftrightarrow B\) (»A natanko tedaj, ko B«) je resnična, kadar imata izjavi enako vrednost.</p>
<table class="ustni-tabela"><tr><th>\(A\)</th><th>\(B\)</th><th>\(A \Leftrightarrow B\)</th></tr><tr><td>1</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>0</td><td>0</td><td>1</td></tr></table>`),
    q(1, "Povejte primer dveh izjav in ugotovite pravilnost (resničnost) njune ekvivalence.",
      R`<p>\(A\): »4 je sodo število« (resnična), \(B\): »4 je praštevilo« (neresnična). Izjavi imata različni vrednosti, zato je \(A \Leftrightarrow B\) neresnična. Če vzamemo še \(C\): »\(2 + 2 = 4\)« (resnična), je \(A \Leftrightarrow C\) resnična.</p>`),
  ]),
  listek(3, "Množice", "mnozice", [
    q(2, "Kaj je prazna množica in kaj univerzalna množica? Kaj je moč množice?",
      R`<p>Prazna množica \(\emptyset = \{\}\) nima nobenega elementa. Univerzalna množica \(U\) vsebuje vse elemente, o katerih v danem primeru govorimo; vse ostale množice so njene podmnožice.</p>
<p>Moč končne množice \(m(A)\) je število njenih elementov, npr. \(m(\{a, b, c\}) = 3\), \(m(\emptyset) = 0\).</p>`),
    q(2, "Kaj je razlika dveh množic? Kaj je komplement množice?",
      R`<p>Razlika \(A \setminus B = \{x;\ x \in A \text{ in } x \notin B\}\) so elementi iz \(A\), ki niso v \(B\). Komplement \(A^c = U \setminus A\) so vsi elementi univerzalne množice, ki niso v \(A\).</p>`),
    q(2, "Kaj je potenčna množica dane množice? Izberite množico z močjo 3 in zapišite njeno potenčno množico.",
      R`<p>Potenčna množica \(\mathcal{P}(A)\) je množica vseh podmnožic množice \(A\). Za \(A = \{1, 2, 3\}\):</p>
<p>\[\mathcal{P}(A) = \{\emptyset, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\}\},\] ki ima \(2^3 = 8\) elementov.</p>`),
  ]),
  listek(4, "Množice", "mnozice", [
    q(1, "Kdaj je množica A podmnožica množice B? Kdaj sta množici enaki?",
      R`<p>\(A \subseteq B\), če je vsak element množice \(A\) tudi element množice \(B\). Množici sta enaki, kadar imata iste elemente, torej \(A \subseteq B\) in \(B \subseteq A\).</p>`),
    q(2, "Kaj je presek dveh množic? Kdaj sta množici disjunktni?",
      R`<p>Presek \(A \cap B = \{x;\ x \in A \text{ in } x \in B\}\) so elementi, ki so v obeh množicah. Množici sta disjunktni, če nimata skupnih elementov: \(A \cap B = \emptyset\).</p>`),
    q(2, "Kaj je unija dveh množic? Kako izračunamo moč unije dveh množic?",
      R`<p>Unija \(A \cup B = \{x;\ x \in A \text{ ali } x \in B\}\) so elementi, ki so vsaj v eni od množic.</p>
<p>\[m(A \cup B) = m(A) + m(B) - m(A \cap B),\] ker elemente preseka v \(m(A) + m(B)\) štejemo dvakrat. Za disjunktni množici je \(m(A \cup B) = m(A) + m(B)\).</p>`),
    q(1, "Izberite taki množici A in B, da je \\(m(A) = 3\\) in \\(m(B) = 2\\). Zapišite njun kartezični produkt.",
      R`<p>\(A = \{1, 2, 3\}\), \(B = \{a, b\}\): \[A \times B = \{(1, a), (1, b), (2, a), (2, b), (3, a), (3, b)\},\] kar je \(3 \cdot 2 = 6\) urejenih parov.</p>`),
  ]),
  listek(5, "Naravna in cela števila", "stevilske_mnozice", [
    q(1, "Opišite množici \\(\\mathbb{N}\\) in \\(\\mathbb{Z}\\) in ju predstavite na številski premici.",
      R`<p>\(\mathbb{N} = \{1, 2, 3, \dots\}\) so naravna števila, \(\mathbb{Z} = \{\dots, -2, -1, 0, 1, 2, \dots\}\) cela števila (naravna, 0 in nasprotna naravnim). Na številski premici so to izolirane točke na enakih razmikih: naravna desno od 0, cela na obeh straneh.</p>`),
    q(1, "Naštejte računske operacije v množici \\(\\mathbb{N}\\).",
      R`<p>V \(\mathbb{N}\) sta (vedno izvedljivi) seštevanje in množenje: vsota in produkt naravnih števil sta naravni števili. Odštevanje in deljenje v \(\mathbb{N}\) nista vedno izvedljivi (npr. \(3 - 5\), \(3 : 5\)).</p>`),
    q(1, "Definirajte odštevanje v množici \\(\\mathbb{Z}\\).",
      R`<p>Odštevanje je prištevanje nasprotnega števila: \(a - b = a + (-b)\). Razlika \(a - b\) je tisto število \(x\), za katero je \(b + x = a\). V \(\mathbb{Z}\) je odštevanje vedno izvedljivo.</p>`),
    q(3, "Napišite vseh pet osnovnih računskih zakonov o seštevanju in množenju v množicah \\(\\mathbb{N}\\) in \\(\\mathbb{Z}\\).",
      R`<ul><li>zakon o zamenjavi (komutativnost): \(a + b = b + a\), \(a \cdot b = b \cdot a\),</li>
<li>zakon o združevanju (asociativnost): \((a + b) + c = a + (b + c)\), \((a \cdot b) \cdot c = a \cdot (b \cdot c)\),</li>
<li>zakon o razčlenjevanju (distributivnost): \((a + b) \cdot c = a \cdot c + b \cdot c\).</li></ul>`),
  ]),
  listek(6, "Liha in soda števila", "stevilske_mnozice", [
    q(2, "Definirajte soda in liha števila.",
      R`<p>Število je sodo, če je deljivo z 2: \(a = 2k\), \(k \in \mathbb{Z}\). Število je liho, če pri deljenju z 2 da ostanek 1: \(a = 2k + 1\), \(k \in \mathbb{Z}\).</p>`),
    q(2, "Pokažite, da je vsota dveh lihih števil sodo število.",
      R`<p>\(a = 2k + 1\), \(b = 2m + 1\): \[a + b = 2k + 2m + 2 = 2(k + m + 1),\] kar je večkratnik števila 2, torej sodo število.</p>`),
    q(2, "Pokažite, da je kvadrat lihega števila liho število.",
      R`<p>\(a = 2k + 1\): \[a^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,\] kar je oblike \(2m + 1\), torej liho število.</p>`),
  ]),
  listek(7, "Praštevila", "stevilske_mnozice", [
    q(2, "Definirajte praštevila in sestavljena števila. Zapišite množico vseh praštevil, ki so manjša od 20.",
      R`<p>Praštevilo je naravno število, večje od 1, ki ima natanko dva delitelja: 1 in samega sebe. Sestavljeno število je naravno število, večje od 1, ki ima več kot dva delitelja. Število 1 ni ne praštevilo ne sestavljeno.</p>
<p>\(\{2, 3, 5, 7, 11, 13, 17, 19\}\).</p>`),
    q(3, "Kaj je razcep naravnega števila na prafaktorje? Ali je razcep na prafaktorje enoličen? Koliko je praštevil?",
      R`<p>Razcep na prafaktorje je zapis števila kot produkta praštevil, npr. \(360 = 2^3 \cdot 3^2 \cdot 5\). Po osnovnem izreku aritmetike je vsako naravno število, večje od 1, mogoče razcepiti na prafaktorje in razcep je enoličen (do vrstnega reda faktorjev). Praštevil je neskončno mnogo.</p>`,
      R`<p><strong>Zakaj je praštevil neskončno (Evklidov dokaz):</strong> recimo, da jih je končno mnogo: \(p_1, p_2, \dots, p_n\). Število \(N = p_1 p_2 \cdots p_n + 1\) pri deljenju z vsakim od njih da ostanek 1, zato ga nobeno ne deli. Njegov razcep na prafaktorje pa mora vsebovati neko praštevilo, ki torej ni na seznamu. Protislovje.</p>`),
    q(1, "Opišite enega izmed postopkov za preverjanje, ali je dano število praštevilo.",
      R`<p>Število \(n\) delimo z vsemi praštevili, ki so manjša ali enaka \(\sqrt{n}\). Če ga nobeno ne deli, je \(n\) praštevilo. (Če bi bil \(n = ab\), bi bil vsaj eden od faktorjev \(\le \sqrt{n}\).) Drug postopek je Eratostenovo sito.</p>`),
  ]),
  listek(8, "Deljivost", "stevilske_mnozice", [
    q(1, "Kdaj je naravno število a večkratnik naravnega števila b?",
      R`<p>Kadar obstaja naravno število \(k\), da je \(a = k \cdot b\). Primer: 12 je večkratnik števila 4, ker je \(12 = 3 \cdot 4\).</p>`),
    q(1, "Definirajte relacijo deljivosti v množici \\(\\mathbb{N}\\).",
      R`<p>Število \(b\) deli število \(a\) (\(b \mid a\)), če obstaja \(k \in \mathbb{N}\), da je \(a = k \cdot b\). Pravimo, da je \(b\) delitelj, \(a\) pa večkratnik.</p>`),
    q(3, "Opišite tri lastnosti relacije deljivosti.",
      R`<ul><li><strong>refleksivnost:</strong> \(a \mid a\) za vsak \(a\),</li>
<li><strong>antisimetričnost:</strong> če \(a \mid b\) in \(b \mid a\), je \(a = b\),</li>
<li><strong>tranzitivnost:</strong> če \(a \mid b\) in \(b \mid c\), potem \(a \mid c\).</li></ul>
<p>Velja še: če \(a \mid b\) in \(a \mid c\), potem \(a \mid (b + c)\).</p>`),
    q(1, "Zapišite tri naravna števila a, b in c, večja od 10, da bo veljalo: a deli b in b ne deli c.",
      R`<p>\(a = 12\), \(b = 24\), \(c = 30\): \(24 = 2 \cdot 12\), 30 pa ni večkratnik števila 24.</p>`),
  ]),
  listek(9, "Večkratniki in delitelji", "stevilske_mnozice", [
    q(3, "Definirajte največji skupni delitelj dveh naravnih števil. Razložite metodo za izračun največjega skupnega delitelja dveh naravnih števil. Kdaj sta si dve naravni števili tuji?",
      R`<p>\(D(a, b)\) je največje naravno število, ki deli \(a\) in \(b\). Izračunamo ga iz razcepa na prafaktorje: zmnožimo skupne prafaktorje z manjšim od obeh eksponentov (ali z Evklidovim algoritmom). Števili sta si tuji, če je \(D(a, b) = 1\).</p>`,
      R`<p>Primer: \(84 = 2^2 \cdot 3 \cdot 7\), \(90 = 2 \cdot 3^2 \cdot 5\). Skupna prafaktorja sta 2 in 3, vsak z manjšim eksponentom: \(D(84, 90) = 2 \cdot 3 = 6\).</p>
<p>Evklidov algoritem: \(90 = 1 \cdot 84 + 6\), \(84 = 14 \cdot 6 + 0\); zadnji neničelni ostanek je \(6\).</p>`),
    q(2, "Definirajte najmanjši skupni večkratnik dveh naravnih števil. Razložite metodo za izračun najmanjšega skupnega večkratnika dveh naravnih števil.",
      R`<p>\(v(a, b)\) je najmanjše naravno število, ki je deljivo z \(a\) in z \(b\). Izračunamo ga iz razcepa na prafaktorje: zmnožimo vse prafaktorje, ki nastopajo v vsaj enem razcepu, vsakega z večjim eksponentom. Velja tudi \(v(a, b) = \frac{a \cdot b}{D(a, b)}\).</p>`),
    q(1, "Izberite različni naravni števili med 20 in 50. Določite njun največji skupni delitelj in najmanjši skupni večkratnik.",
      R`<p>\(24 = 2^3 \cdot 3\), \(36 = 2^2 \cdot 3^2\): \(D(24, 36) = 2^2 \cdot 3 = 12\), \(v(24, 36) = 2^3 \cdot 3^2 = 72\). Preverimo: \(12 \cdot 72 = 864 = 24 \cdot 36\).</p>`),
  ]),
  listek(10, "Deljenje naravnih števil", "stevilske_mnozice", [
    q(2, "Povejte osnovni izrek o deljenju naravnih števil.",
      R`<p>Za poljubni naravni števili \(a\) in \(m\) obstajata enolično določeni celi števili \(k \ge 0\) (količnik) in \(r\) (ostanek), da je \[a = k \cdot m + r, \qquad 0 \le r &lt; m.\]</p>`),
    q(1, "Zapišite množico vseh ostankov pri deljenju z naravnim številom m.",
      R`<p>\(\{0, 1, 2, \dots, m - 1\}\).</p>`),
    q(3, "Zapišite količnik in ostanek, ki ju dobimo pri deljenju letošnje letnice s številom 55.",
      R`<p>Za leto 2026: \(2026 = 36 \cdot 55 + 46\) (\(36 \cdot 55 = 1980\)), torej količnik 36 in ostanek 46.</p>
<p>Za leto 2027: \(2027 = 36 \cdot 55 + 47\). Velja \(0 \le r &lt; 55\).</p>`),
  ]),
  listek(11, "Kriteriji deljivosti", "stevilske_mnozice", [
    q(3, "Za vsako izmed števil 2, 4 in 8 navedite kriterij deljivosti s tem številom.",
      R`<ul><li>z 2: zadnja števka je soda (0, 2, 4, 6, 8),</li>
<li>s 4: število iz zadnjih dveh števk je deljivo s 4,</li>
<li>z 8: število iz zadnjih treh števk je deljivo z 8.</li></ul>`,
      R`<p>Zakaj: \(100\) je deljivo s 4 in \(1000\) z 8. Število zapišemo kot \(n = 100 \cdot a + \overline{bc}\); prvi del je vedno deljiv s 4, zato je \(n\) deljivo s 4 natanko tedaj, ko je deljivo zadnje dvomestno število \(\overline{bc}\). Pri 8 enako s tisočicami.</p>`),
    q(1, "Navedite kriterij deljivosti s številom 3.",
      R`<p>Število je deljivo s 3, če je vsota njegovih števk deljiva s 3. Primer: \(7254\): \(7 + 2 + 5 + 4 = 18\), torej je deljivo s 3.</p>`),
    q(1, "Navedite kriterij deljivosti s številom 6.",
      R`<p>Število je deljivo s 6, če je deljivo z 2 in s 3 (sodo z vsoto števk, deljivo s 3), ker sta 2 in 3 tuji števili in \(6 = 2 \cdot 3\).</p>`),
    q(1, "Poiščite primer štirimestnega naravnega števila, ki je deljivo z 9.",
      R`<p>\(4518\): vsota števk \(4 + 5 + 1 + 8 = 18\) je deljiva z 9, zato je število deljivo z 9 (\(4518 = 9 \cdot 502\)).</p>`),
  ]),
  listek(12, "Ulomki in racionalna števila", "stevilske_mnozice", [
    q(2, "Kaj je ulomek? Kdaj dva ulomka predstavljata isto racionalno število?",
      R`<p>Ulomek \(\frac{a}{b}\), \(a \in \mathbb{Z}\), \(b \in \mathbb{N}\), je zapis količnika \(a : b\); \(a\) je števec, \(b\) imenovalec. Ulomka \(\frac{a}{b}\) in \(\frac{c}{d}\) predstavljata isto racionalno število, kadar je \(a \cdot d = b \cdot c\), to je, kadar enega dobimo iz drugega z razširjanjem ali krajšanjem.</p>`),
    q(4, "Pojasnite, kako ulomke seštevamo, odštevamo, množimo in delimo.",
      R`<p>Seštevamo in odštevamo tako, da ulomka razširimo na skupni imenovalec in seštejemo (odštejemo) števca: \[\frac{a}{b} \pm \frac{c}{d} = \frac{ad \pm bc}{bd}.\]</p>
<p>Množimo števec s števcem in imenovalec z imenovalcem, delimo tako, da pomnožimo z obratno vrednostjo: \[\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd}, \qquad \frac{a}{b} : \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc} \ (c \neq 0).\]</p>`),
  ]),
  listek(13, "Ulomki in decimalni zapis", "stevilske_mnozice", [
    q(2, "Kako iz decimalnega zapisa števila prepoznamo, da lahko to število zapišemo z ulomkom? Kako poljubnemu ulomku priredimo njegov decimalni zapis?",
      R`<p>Število lahko zapišemo z ulomkom (je racionalno), če je njegov decimalni zapis končen ali neskončen periodičen. Decimalni zapis ulomka \(\frac{a}{b}\) dobimo z deljenjem števca z imenovalcem (pisno deljenje).</p>`),
    q(2, "Kateri ulomki imajo končen decimalni zapis? Povejte primer ulomka, ki nima končnega decimalnega zapisa.",
      R`<p>Okrajšan ulomek ima končen decimalni zapis natanko tedaj, ko ima imenovalec v razcepu le prafaktorja 2 in 5 (npr. \(\frac{3}{8} = 0{,}375\), \(\frac{7}{20} = 0{,}35\)). Primer neskončnega: \(\frac{1}{3} = 0{,}\overline{3}\).</p>`,
      R`<p>Zakaj: končno decimalno število je ulomek z imenovalcem \(10^n = 2^n 5^n\). Če ima okrajšan imenovalec kakšen drug prafaktor (npr. 3 ali 7), ga ne moremo razširiti na potenco števila 10.</p>`),
    q(2, "Povejte primer racionalnega števila s periodičnim decimalnim zapisom (z dolžino periode vsaj dva) in ga zapišite kot ulomek.",
      R`<p>\(x = 0{,}\overline{27}\). Pomnožimo s 100: \(100x = 27{,}\overline{27}\). Odštejemo: \(99x = 27\), torej \(x = \frac{27}{99} = \frac{3}{11}\).</p>`),
  ]),
  listek(14, "Realna števila", "stevilske_mnozice", [
    q(2, "Kdaj je realno število racionalno in kdaj iracionalno? Kako se razlikujeta njuna decimalna zapisa?",
      R`<p>Realno število je racionalno, če ga lahko zapišemo kot ulomek \(\frac{m}{n}\) (\(m \in \mathbb{Z}\), \(n \in \mathbb{N}\)), sicer je iracionalno. Racionalno število ima končen ali neskončen periodičen decimalni zapis, iracionalno pa neskončen neperiodičen.</p>`),
    q(2, "Povejte primer racionalnega števila in dva primera iracionalnih števil.",
      R`<p>Racionalno: \(-\frac{3}{4} = -0{,}75\). Iracionalni: \(\sqrt{2} = 1{,}41421\dots\) in \(\pi = 3{,}14159\dots\)</p>`),
    q(2, "Opišite konstrukcijo točke na številski premici, ki predstavlja vrednost ulomka \\(\\frac{m}{n}\\), \\(m &lt; n\\), kjer sta m in n naravni števili in je \\(n > 2\\).",
      R`<p>Daljico od 0 do 1 razdelimo na \(n\) enakih delov s pomočjo vzporednic (Talesov izrek) in od 0 odmerimo \(m\) takih delov.</p>`,
      R`<ol><li>Iz točke 0 narišemo pomožni poltrak pod poljubnim kotom glede na številsko premico.</li>
<li>Na poltrak s šestilom od 0 nanesemo \(n\) enakih daljic poljubne dolžine; dobimo točke \(T_1, \dots, T_n\).</li>
<li>Točko \(T_n\) povežemo s točko 1 na premici.</li>
<li>Skozi \(T_m\) narišemo vzporednico daljici \(T_n 1\). Kjer seka številsko premico, je točka \(\frac{m}{n}\).</li></ol>
<p>Po Talesovem izreku vzporednice sorazmerno delijo kraka kota, zato je razdalja od 0 do presečišča enaka \(\frac{m}{n}\) dolžine od 0 do 1.</p>`),
  ]),
  listek(15, "Absolutna vrednost", "stevilske_mnozice", [
    q(2, "Definirajte absolutno vrednost realnega števila in pojasnite njen geometrijski pomen.",
      R`<p>\[|a| = \begin{cases} a, & a \ge 0, \\ -a, & a &lt; 0. \end{cases}\] Geometrijsko je \(|a|\) razdalja točke \(a\) od 0 na številski premici, zato \(|a| \ge 0\).</p>`),
    q(1, "Naj bosta a in b realni števili. Kaj predstavlja število \\(|b - a|\\)?",
      R`<p>\(|b - a|\) je razdalja med točkama \(a\) in \(b\) na številski premici.</p>`),
    q(1, "Na številski premici pojasnite rešitev enačbe \\(|x| = a\\), kjer je a pozitivno realno število. Odgovor ponazorite s primerom.",
      R`<p>Iščemo točke, ki so od 0 oddaljene za \(a\); taki sta dve: \(x = a\) in \(x = -a\). Primer: \(|x| = 3\) ima rešitvi \(x_1 = 3\) in \(x_2 = -3\).</p>`),
    q(2, "Naj bosta a in b realni števili. Primerjajte izraza \\(|a + b|\\) ter \\(|a| + |b|\\). Odgovor ponazorite s primeri.",
      R`<p>Velja trikotniška neenakost \(|a + b| \le |a| + |b|\). Enakost velja, kadar imata \(a\) in \(b\) enak predznak (ali je eno od njiju 0), sicer je leva stran manjša.</p>
<p>Primera: \(a = 2\), \(b = 5\): \(|7| = 7 = 2 + 5\). \(a = 2\), \(b = -5\): \(|-3| = 3 &lt; 2 + 5 = 7\).</p>`),
  ]),
  listek(16, "Kompleksna števila", "stevilske_mnozice", [
    q(2, "Definirajte množico kompleksnih števil. Kako grafično upodobimo (predstavimo) kompleksna števila?",
      R`<p>\(\mathbb{C} = \{a + bi;\ a, b \in \mathbb{R}\}\), kjer je \(i\) imaginarna enota, \(i^2 = -1\). \(a = \operatorname{Re} z\) je realni, \(b = \operatorname{Im} z\) imaginarni del.</p>
<p>Število \(z = a + bi\) predstavimo s točko \((a, b)\) v kompleksni ravnini: vodoravna os je realna, navpična imaginarna.</p>`),
    q(2, "Definirajte operacijo seštevanja v množici \\(\\mathbb{C}\\). Opišite geometrijski pomen seštevanja kompleksnih števil.",
      R`<p>\((a + bi) + (c + di) = (a + c) + (b + d)i\): seštejemo realna in imaginarna dela posebej.</p>
<p>Geometrijsko seštevamo kot vektorje: vsota je četrto oglišče paralelograma, ki ga napenjata točki \(0\), \(z_1\) in \(z_2\) (prištevanje \(w\) premakne točko za vektor \(w\)).</p>`),
    q(2, "V kompleksni ravnini predstavite podmnožici kompleksnih števil \\(A = \\{z \\in \\mathbb{C};\\ \\operatorname{Im}(z) = 2\\}\\) in \\(B = \\{z \\in \\mathbb{C};\\ \\operatorname{Im}(z) = \\operatorname{Re}(z)\\}\\).",
      R`<p>\(A\) je vodoravna premica \(y = 2\) (vsa števila \(a + 2i\)). \(B\) je premica \(y = x\), simetrala prvega in tretjega kvadranta (števila \(a + ai\)). Premici se sekata v točki \(2 + 2i\).</p>`),
  ]),
  listek(17, "Množenje kompleksnih števil", "stevilske_mnozice", [
    q(2, "Definirajte operacijo množenja v množici \\(\\mathbb{C}\\). Zapišite primer.",
      R`<p>Množimo kot dvočlenika in upoštevamo \(i^2 = -1\): \[(a + bi)(c + di) = (ac - bd) + (ad + bc)i.\] Primer: \((2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 5 + i\).</p>`),
    q(2, "Opišite geometrijski pomen množenja kompleksnega števila s številom −1 in geometrijski pomen množenja kompleksnega števila s pozitivnim realnim številom.",
      R`<p>Množenje z \(-1\) je zrcaljenje čez izhodišče (vrtenje za \(180^\circ\)): \(a + bi \mapsto -a - bi\).</p>
<p>Množenje s pozitivnim realnim številom \(k\) je razteg (ali skrčitev) iz izhodišča s faktorjem \(k\): točka ostane na istem poltraku iz 0, njena razdalja od 0 se pomnoži s \(k\).</p>`),
    q(1, "Izračunajte \\(i^n\\), kjer je n letošnja letnica.",
      R`<p>Potence \(i\) se ponavljajo s periodo 4 (\(i, -1, -i, 1\)), zato je odločilen ostanek pri deljenju \(n\) s 4. Za \(n = 2026\): \(2026 = 4 \cdot 506 + 2\), zato \(i^{2026} = i^2 = -1\). (Za 2027: ostanek 3, \(i^{2027} = -i\).)</p>`),
    q(1, "Izberite kompleksno število \\(z = a + bi\\), kjer sta a in b od nič različni realni števili, in izračunajte \\(z^2\\).",
      R`<p>\(z = 2 + 3i\): \(z^2 = 4 + 12i + 9i^2 = -5 + 12i\). V splošnem \((a + bi)^2 = a^2 - b^2 + 2abi\).</p>`),
  ]),
  listek(18, "Absolutna vrednost kompleksnega števila", "stevilske_mnozice", [
    q(2, "Definirajte absolutno vrednost kompleksnega števila. Na primeru pokažite izračun absolutne vrednosti kompleksnega števila.",
      R`<p>Za \(z = a + bi\) je \(|z| = \sqrt{a^2 + b^2}\), razdalja točke \(z\) od izhodišča kompleksne ravnine. Primer: \(|3 - 4i| = \sqrt{9 + 16} = 5\).</p>`),
    q(2, "Na primeru izbranega kompleksnega števila \\(z = a + bi\\), kjer je \\(a \\neq 0\\) in \\(b \\neq 0\\), pokažite, da je \\(|2z| = 2|z|\\).",
      R`<p>\(z = 1 + 2i\): \(|z| = \sqrt{5}\). \(2z = 2 + 4i\), \(|2z| = \sqrt{4 + 16} = \sqrt{20} = 2\sqrt{5} = 2|z|\).</p>`),
    q(2, "V kompleksni ravnini predstavite množico točk \\(\\{z \\in \\mathbb{C};\\ |z| \\le 3\\}\\). Zapišite primer kompleksnega števila \\(z = a + bi\\) iz te množice, kjer je a pozitivno, b pa negativno realno število.",
      R`<p>To je zaprt krog s središčem v 0 in polmerom 3 (točke krožnice in notranjosti). Primer: \(z = 1 - 2i\), \(|z| = \sqrt{5} \le 3\).</p>`),
  ]),
  listek(19, "Konjugirana vrednost kompleksnega števila", "stevilske_mnozice", [
    q(2, "Definirajte konjugirano vrednost kompleksnega števila in razložite njen geometrijski pomen.",
      R`<p>Za \(z = a + bi\) je \(\bar z = a - bi\) (imaginarni del spremeni predznak). Geometrijsko je \(\bar z\) zrcalna slika točke \(z\) čez realno os.</p>`),
    q(2, "Dokažite, da je konjugirana vrednost vsote dveh kompleksnih števil enaka vsoti njunih konjugiranih vrednosti.",
      R`<p>\(z = a + bi\), \(w = c + di\): \[\overline{z + w} = \overline{(a + c) + (b + d)i} = (a + c) - (b + d)i = (a - bi) + (c - di) = \bar z + \bar w.\]</p>`),
    q(2, "Izberite kompleksno število \\(z = a + bi\\), kjer sta a in b od nič različni realni števili, in izračunajte \\(z^{-1}\\).",
      R`<p>\(z = 3 + 4i\): \[z^{-1} = \frac{1}{3 + 4i} = \frac{3 - 4i}{(3 + 4i)(3 - 4i)} = \frac{3 - 4i}{25} = \frac{3}{25} - \frac{4}{25}i.\] V splošnem \(z^{-1} = \frac{\bar z}{|z|^2}\).</p>`),
  ]),
  listek(20, "Enačbe", "algebrski_izrazi_enacbe_neenacbe", [
    q(2, "Kaj je enačba in kaj je rešitev enačbe? Kdaj sta dve enačbi ekvivalentni (enakovredni)?",
      R`<p>Enačba je zapis enakosti dveh izrazov z neznanko, npr. \(2x + 1 = 7\). Rešitev je vrednost neznanke, pri kateri enakost velja (\(x = 3\)). Enačbi sta ekvivalentni, če imata isto množico rešitev.</p>`),
    q(2, "Opišite postopke, ki dano enačbo prevedejo v ekvivalentno enačbo.",
      R`<ul><li>na obeh straneh prištejemo ali odštejemo isto število ali izraz (ki je definiran),</li>
<li>obe strani pomnožimo ali delimo z istim od 0 različnim številom,</li>
<li>preoblikujemo izraz na eni strani (poenostavimo, razstavimo).</li></ul>
<p>Kvadriranje ali množenje z izrazom, ki je lahko 0, ni ekvivalentno preoblikovanje, zato je potreben preizkus.</p>`),
    q(2, "Kako rešimo sistem dveh linearnih enačb z dvema neznankama? Zapišite primer takega sistema in ga rešite.",
      R`<p>Z zamenjalnim načinom (iz ene enačbe izrazimo neznanko in jo vstavimo v drugo), z načinom nasprotnih koeficientov ali grafično (presečišče premic).</p>
<p>Primer: \(x + y = 5\), \(x - y = 1\). Seštejemo: \(2x = 6\), \(x = 3\), nato \(y = 2\). Rešitev je par \((3, 2)\).</p>`),
  ]),
];
