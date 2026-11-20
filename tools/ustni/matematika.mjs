// tools/ustni/matematika.mjs
// Vprašanja za ustni del mature iz matematike, po snoveh (slug iz api/data/snovi.json).
// Vprašanja in odgovori so naši, v slogu vprašanj z izpitnih listkov: definiraj, navedi,
// izpelji, pokaži na primeru. Odgovor je HTML z LaTeX-om med \( … \) in \[ … \].
//
// Vsako vprašanje je [vprašanje, odgovor] ali [vprašanje, odgovor, "visja"].
// Novo vprašanje dodaj NA KONEC seznama snovi: id je zaporedna številka v snovi
// (mat-u-<slug>-<n>), zato se id-ji obstoječih vprašanj (in napredek uporabnikov) ne spremenijo.
const R = String.raw;

export default {
  osnove_logike: [
    [
      "Kaj je izjava? Navedi primer izjave in primer povedi, ki ni izjava.",
      R`<p>Izjava je poved, ki je bodisi resnična bodisi neresnična (ima natanko eno logično vrednost: \(1\) ali \(0\)).</p>
<p>Izjava: »Število 7 je praštevilo.« (resnična), »\(2 + 2 = 5\)« (neresnična). Ni izjava: »Koliko je ura?«, »Zapri okno!« ali »\(x > 3\)« (resničnost je odvisna od \(x\); to je izjavna forma).</p>`,
    ],
    [
      "Definiraj negacijo, konjunkcijo in disjunkcijo izjav. Kdaj je posamezna resnična?",
      R`<ul><li><strong>Negacija</strong> \(\neg A\) (»ni res, da A«) je resnična natanko takrat, ko je \(A\) neresnična.</li>
<li><strong>Konjunkcija</strong> \(A \wedge B\) (»A in B«) je resnična samo, kadar sta resnični obe izjavi.</li>
<li><strong>Disjunkcija</strong> \(A \vee B\) (»A ali B«) je neresnična samo, kadar sta neresnični obe izjavi; sicer je resnična.</li></ul>`,
    ],
    [
      "Kaj je implikacija? Kdaj je neresnična? Pojasni pojma potreben in zadosten pogoj.",
      R`<p>Implikacija \(A \Rightarrow B\) (»če A, potem B«) je neresnična samo v primeru, ko je \(A\) resnična in \(B\) neresnična. Iz neresnične predpostavke sledi karkoli.</p>
<p>\(A\) je <strong>zadosten</strong> pogoj za \(B\), \(B\) je <strong>potreben</strong> pogoj za \(A\). Primer: »Če je število deljivo s 4, je sodo.« Deljivost s 4 je zadostna za sodost, sodost je potrebna za deljivost s 4.</p>`,
    ],
    [
      "Kaj je ekvivalenca izjav in kdaj je resnična?",
      R`<p>Ekvivalenca \(A \Leftrightarrow B\) (»A natanko tedaj, ko B«) je resnična, kadar imata \(A\) in \(B\) enako logično vrednost (obe resnični ali obe neresnični).</p>
<p>Velja \((A \Leftrightarrow B) \equiv (A \Rightarrow B) \wedge (B \Rightarrow A)\): vsak pogoj je potreben in zadosten za drugega.</p>`,
    ],
    [
      "Kaj je tavtologija? Navedi dva primera.",
      R`<p>Tavtologija je sestavljena izjava, ki je resnična pri vseh logičnih vrednostih izjav, iz katerih je sestavljena. Preverimo jo s pravilnostno tabelo.</p>
<p>Primera: \(A \vee \neg A\) (zakon izključene tretje možnosti), \(\neg(A \wedge \neg A)\) (zakon o neprotislovnosti), tudi \((A \Rightarrow B) \Leftrightarrow (\neg B \Rightarrow \neg A)\).</p>`,
    ],
    [
      "Zapiši De Morganova zakona za izjave in enega preveri s pravilnostno tabelo.",
      R`<p>\[\neg(A \wedge B) \equiv \neg A \vee \neg B, \qquad \neg(A \vee B) \equiv \neg A \wedge \neg B.\]</p>
<p>Tabela za prvi zakon: pri \((A,B) = (1,1)\) sta obe strani \(0\), pri \((1,0)\), \((0,1)\) in \((0,0)\) sta obe strani \(1\). Ker se stolpca ujemata v vseh vrsticah, sta izjavi enakovredni.</p>`,
    ],
    [
      "Kaj sta univerzalni in eksistenčni kvantifikator? Kako zanikamo izjavo s kvantifikatorjem?",
      R`<p>\(\forall x : P(x)\) pomeni »za vsak \(x\) velja \(P(x)\)«, \(\exists x : P(x)\) pa »obstaja (vsaj en) \(x\), za katerega velja \(P(x)\)«.</p>
<p>Pri zanikanju se kvantifikator zamenja, lastnost pa zaniká: \(\neg(\forall x : P(x)) \equiv \exists x : \neg P(x)\) in \(\neg(\exists x : P(x)) \equiv \forall x : \neg P(x)\). Primer: negacija »vsa števila so pozitivna« je »obstaja število, ki ni pozitivno«.</p>`,
    ],
    [
      "Kaj sta obrat in kontrapozicija implikacije? Katera je enakovredna prvotni implikaciji?",
      R`<p>Za implikacijo \(A \Rightarrow B\) je obrat \(B \Rightarrow A\), kontrapozicija pa \(\neg B \Rightarrow \neg A\).</p>
<p>Kontrapozicija je vedno enakovredna implikaciji, obrat pa ne. Primer: »če je število deljivo s 6, je sodo« je resnična, obrat »če je število sodo, je deljivo s 6« ni (protiprimer 4).</p>`,
    ],
    [
      "Opiši direktni dokaz, dokaz s protislovjem in ovržbo s protiprimerom.",
      R`<ul><li><strong>Direktni dokaz:</strong> iz predpostavke s sklepi pridemo do trditve.</li>
<li><strong>Dokaz s protislovjem (posredni):</strong> predpostavimo, da trditev ne velja, in pridemo do protislovja; torej trditev velja. Primer: \(\sqrt{2}\) ni racionalno število.</li>
<li><strong>Protiprimer:</strong> trditev oblike »za vse \(x\) velja …« ovržemo z enim samim primerom, za katerega ne velja.</li></ul>`,
    ],
  ],

  mnozice: [
    [
      "Kaj je množica? Na katere načine jo lahko podamo? Kaj je prazna množica?",
      R`<p>Množica je skupina različnih objektov (elementov). Da je \(a\) element množice \(A\), zapišemo \(a \in A\).</p>
<p>Podamo jo z <strong>naštevanjem</strong> elementov, npr. \(A = \{1, 2, 3\}\), ali z <strong>lastnostjo</strong>, npr. \(A = \{x \in \mathbb{N};\ x &lt; 4\}\). Prazna množica \(\emptyset = \{\}\) nima nobenega elementa in je podmnožica vsake množice.</p>`,
    ],
    [
      "Kdaj je množica A podmnožica množice B? Kdaj sta množici enaki?",
      R`<p>\(A \subseteq B\), če je vsak element množice \(A\) tudi element množice \(B\). Prava podmnožica \(A \subset B\): \(A \subseteq B\) in \(A \neq B\).</p>
<p>Množici sta enaki, ko imata iste elemente: \(A = B \iff A \subseteq B \wedge B \subseteq A\). Vrstni red in ponavljanje elementov nista pomembna.</p>`,
    ],
    [
      "Definiraj unijo, presek in razliko množic in jih prikaži z Vennovim diagramom.",
      R`<ul><li>\(A \cup B = \{x;\ x \in A \vee x \in B\}\): elementi, ki so vsaj v eni od množic.</li>
<li>\(A \cap B = \{x;\ x \in A \wedge x \in B\}\): elementi, ki so v obeh.</li>
<li>\(A \setminus B = \{x;\ x \in A \wedge x \notin B\}\): elementi iz \(A\), ki niso v \(B\).</li></ul>
<p>V Vennovem diagramu sta dva prekrivajoča se kroga: unija je celoten osenčen del, presek skupni del, razlika del kroga \(A\) zunaj kroga \(B\). Množici sta disjunktni, če je \(A \cap B = \emptyset\).</p>`,
    ],
    [
      "Kaj je komplement množice? Zapiši De Morganova zakona za množice.",
      R`<p>Komplement \(A^c\) (tudi \(A'\)) glede na univerzalno množico \(U\) so vsi elementi iz \(U\), ki niso v \(A\): \(A^c = U \setminus A\).</p>
<p>\[(A \cup B)^c = A^c \cap B^c, \qquad (A \cap B)^c = A^c \cup B^c.\]</p>`,
    ],
    [
      "Kaj je potenčna množica? Koliko elementov ima, če ima A n elementov?",
      R`<p>Potenčna množica \(\mathcal{P}(A)\) je množica vseh podmnožic množice \(A\) (vključno z \(\emptyset\) in \(A\)).</p>
<p>Če je \(m(A) = n\), je \(m(\mathcal{P}(A)) = 2^n\), ker za vsak element izberemo, ali je v podmnožici ali ne. Primer: \(\mathcal{P}(\{a, b\}) = \{\emptyset, \{a\}, \{b\}, \{a, b\}\}\).</p>`,
    ],
    [
      "Kaj je kartezični produkt množic? Koliko elementov ima?",
      R`<p>\(A \times B = \{(a, b);\ a \in A,\ b \in B\}\) je množica vseh urejenih parov. Vrstni red je pomemben, zato v splošnem \(A \times B \neq B \times A\).</p>
<p>\(m(A \times B) = m(A) \cdot m(B)\). Primer: \(\{1, 2\} \times \{a\} = \{(1, a), (2, a)\}\). Kartezični produkt \(\mathbb{R} \times \mathbb{R}\) predstavimo s točkami koordinatne ravnine.</p>`,
    ],
    [
      "Kako izračunaš moč unije dveh (in treh) končnih množic?",
      R`<p>\[m(A \cup B) = m(A) + m(B) - m(A \cap B),\]
elemente preseka smo namreč šteli dvakrat. Za tri množice:</p>
<p>\[m(A \cup B \cup C) = m(A) + m(B) + m(C) - m(A \cap B) - m(A \cap C) - m(B \cap C) + m(A \cap B \cap C).\]</p>`,
    ],
    [
      "Naštej zakone za računanje z unijo in presekom.",
      R`<ul><li>komutativnost: \(A \cup B = B \cup A\), \(A \cap B = B \cap A\),</li>
<li>asociativnost: \((A \cup B) \cup C = A \cup (B \cup C)\), enako za presek,</li>
<li>distributivnost: \(A \cap (B \cup C) = (A \cap B) \cup (A \cap C)\) in \(A \cup (B \cap C) = (A \cup B) \cap (A \cup C)\),</li>
<li>\(A \cup \emptyset = A\), \(A \cap \emptyset = \emptyset\), \(A \cup A = A \cap A = A\).</li></ul>`,
    ],
  ],

  stevilske_mnozice: [
    [
      "Opiši množico naravnih števil. Kaj so praštevila in kaj pove osnovni izrek aritmetike?",
      R`<p>\(\mathbb{N} = \{1, 2, 3, \dots\}\). Vsota in produkt naravnih števil sta naravni števili, razlika in količnik nista nujno.</p>
<p>Praštevilo je naravno število, večje od 1, ki ima natanko dva delitelja: 1 in samega sebe (2, 3, 5, 7, 11 …). Število 1 ni praštevilo. <strong>Osnovni izrek aritmetike:</strong> vsako naravno število, večje od 1, lahko enolično (do vrstnega reda) zapišemo kot produkt praštevil, npr. \(60 = 2^2 \cdot 3 \cdot 5\).</p>`,
    ],
    [
      "Kdaj število a deli število b? Navedi pravila za deljivost z 2, 3, 4, 5, 9 in 10.",
      R`<p>\(a \mid b\), če obstaja celo število \(k\), da je \(b = k \cdot a\).</p>
<ul><li>z 2: zadnja števka je soda; s 5: zadnja števka je 0 ali 5; z 10: zadnja števka je 0,</li>
<li>s 4: število iz zadnjih dveh števk je deljivo s 4,</li>
<li>s 3 (z 9): vsota števk je deljiva s 3 (z 9).</li></ul>
<p>Število je deljivo s 6, če je deljivo z 2 in s 3 (tuji si števili).</p>`,
    ],
    [
      "Kaj sta največji skupni delitelj in najmanjši skupni večkratnik? Kakšna je zveza med njima?",
      R`<p>\(D(a, b)\) je največje naravno število, ki deli obe števili, \(v(a, b)\) najmanjše naravno število, ki je deljivo z obema. Izračunamo ju iz razcepa na prafaktorje: za \(D\) vzamemo skupne prafaktorje z najmanjšimi, za \(v\) vse prafaktorje z največjimi eksponenti.</p>
<p>\[D(a, b) \cdot v(a, b) = a \cdot b.\] Števili sta <strong>tuji</strong>, če je \(D(a, b) = 1\).</p>`,
    ],
    [
      "Opiši Evklidov algoritem in ga uporabi na primeru.",
      R`<p>Pri deljenju z ostankom \(a = k \cdot b + r\) velja \(D(a, b) = D(b, r)\). Zato večje število delimo z manjšim, nato delitelja z ostankom … dokler ostanek ni 0. Zadnji neničelni ostanek je \(D(a, b)\).</p>
<p>Primer: \(84 = 1 \cdot 60 + 24\), \(60 = 2 \cdot 24 + 12\), \(24 = 2 \cdot 12 + 0\), torej \(D(84, 60) = 12\).</p>`,
    ],
    [
      "Kaj je absolutna vrednost realnega števila? Naštej njene lastnosti.",
      R`<p>\[|a| = \begin{cases} a, & a \ge 0 \\ -a, & a &lt; 0 \end{cases}\] Geometrijsko je to razdalja števila od 0 na številski premici, \(|a - b|\) pa razdalja med \(a\) in \(b\).</p>
<p>Lastnosti: \(|a| \ge 0\), \(|-a| = |a|\), \(|a b| = |a| |b|\), \(\left|\frac{a}{b}\right| = \frac{|a|}{|b|}\), trikotniška neenakost \(|a + b| \le |a| + |b|\).</p>`,
    ],
    [
      "Kaj so racionalna števila? Kakšen je njihov decimalni zapis? Kako periodično decimalno število zapišeš z ulomkom?",
      R`<p>\(\mathbb{Q} = \left\{\frac{m}{n};\ m \in \mathbb{Z},\ n \in \mathbb{N}\right\}\). Decimalni zapis racionalnega števila je končen ali neskončen periodičen.</p>
<p>Primer: \(x = 0{,}\overline{36}\). Pomnožimo s \(100\): \(100x = 36{,}\overline{36}\). Odštejemo: \(99x = 36\), torej \(x = \frac{36}{99} = \frac{4}{11}\).</p>`,
    ],
    [
      "Kaj so iracionalna števila? Dokaži, da \\(\\sqrt{2}\\) ni racionalno število.",
      R`<p>Iracionalna števila so realna števila, ki jih ne moremo zapisati kot ulomek; decimalni zapis je neskončen in neperiodičen (\(\sqrt{2}\), \(\pi\), \(e\)).</p>
<p>Dokaz s protislovjem: recimo \(\sqrt{2} = \frac{m}{n}\), ulomek okrajšan. Potem \(m^2 = 2n^2\), zato je \(m^2\) sodo in tudi \(m\) sodo, \(m = 2k\). Sledi \(4k^2 = 2n^2\), \(n^2 = 2k^2\), torej je tudi \(n\) sodo. To nasprotuje temu, da je ulomek okrajšan.</p>`,
    ],
    [
      "Opiši množico realnih števil in vrste intervalov.",
      R`<p>\(\mathbb{R}\) so racionalna in iracionalna števila skupaj: \(\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}\). Realna števila ustrezajo točkam številske premice (vsaki točki natanko eno število).</p>
<p>Intervali: zaprti \([a, b] = \{x;\ a \le x \le b\}\), odprti \((a, b)\), polodprta \([a, b)\) in \((a, b]\), neomejeni npr. \([a, \infty)\), \((-\infty, b)\). Pri neskončnosti je oklepaj vedno okrogel.</p>`,
    ],
    [
      "Kaj so kompleksna števila? Pojasni algebrsko obliko, konjugirano število in absolutno vrednost.",
      R`<p>Imaginarna enota \(i\) je število z \(i^2 = -1\). Kompleksno število \(z = a + bi\), \(a, b \in \mathbb{R}\): \(a = \operatorname{Re} z\) je realni, \(b = \operatorname{Im} z\) imaginarni del. Predstavimo ga s točko \((a, b)\) v kompleksni ravnini.</p>
<p>Konjugirano število \(\bar z = a - bi\) (zrcaljenje čez realno os). Absolutna vrednost \(|z| = \sqrt{a^2 + b^2}\) je razdalja od izhodišča; velja \(z \bar z = |z|^2\).</p>`,
    ],
    [
      "Kako računamo s kompleksnimi števili? Kako deliš dve kompleksni števili? Koliko je \\(i^n\\)?",
      R`<p>Seštevamo in množimo kot dvočlenike in upoštevamo \(i^2 = -1\): \((a + bi)(c + di) = (ac - bd) + (ad + bc)i\).</p>
<p>Pri deljenju ulomek razširimo s konjugirano vrednostjo imenovalca: \(\frac{z}{w} = \frac{z \bar w}{|w|^2}\). Potence \(i\) se ponavljajo s periodo 4: \(i^1 = i\), \(i^2 = -1\), \(i^3 = -i\), \(i^4 = 1\); \(i^n\) je odvisna od ostanka \(n\) pri deljenju s 4.</p>`,
    ],
    [
      "Opiši načelo popolne (matematične) indukcije in ga pokaži na primeru.",
      R`<p>Trditev \(P(n)\) velja za vsa naravna števila, če (1) velja za \(n = 1\) (baza) in (2) iz predpostavke, da velja za \(n\), sledi, da velja za \(n + 1\) (indukcijski korak).</p>
<p>Primer: \(1 + 2 + \dots + n = \frac{n(n + 1)}{2}\). Za \(n = 1\): \(1 = 1\). Korak: \(\frac{n(n + 1)}{2} + (n + 1) = \frac{(n + 1)(n + 2)}{2}\).</p>`,
      "visja",
    ],
  ],

  algebrski_izrazi_enacbe_neenacbe: [
    [
      "Zapiši formule za kvadrat in kub dvočlenika, razliko kvadratov ter vsoto in razliko kubov.",
      R`<p>\[(a \pm b)^2 = a^2 \pm 2ab + b^2, \quad (a \pm b)^3 = a^3 \pm 3a^2 b + 3ab^2 \pm b^3,\]
\[a^2 - b^2 = (a - b)(a + b), \quad a^3 \pm b^3 = (a \pm b)(a^2 \mp ab + b^2).\]</p>
<p>Vsota kvadratov \(a^2 + b^2\) se v realnih številih ne razstavi.</p>`,
    ],
    [
      "Naštej načine razstavljanja izrazov in vsakega pokaži na primeru.",
      R`<ul><li>izpostavljanje skupnega faktorja: \(6x^2 - 9x = 3x(2x - 3)\),</li>
<li>formule: \(x^2 - 25 = (x - 5)(x + 5)\), \(x^2 + 6x + 9 = (x + 3)^2\),</li>
<li>Vietovo pravilo: \(x^2 + bx + c = (x - x_1)(x - x_2)\), kjer \(x_1 + x_2 = -b\), \(x_1 x_2 = c\); npr. \(x^2 - 5x + 6 = (x - 2)(x - 3)\),</li>
<li>združevanje členov: \(ax + ay + bx + by = (a + b)(x + y)\).</li></ul>`,
    ],
    [
      "Kaj je enačba in kaj njena rešitev? Katere so ekvivalentne transformacije enačbe?",
      R`<p>Enačba je izjavna forma z enačajem; rešitev je vrednost neznanke, pri kateri dobimo resnično izjavo. Enačbi sta ekvivalentni, če imata iste rešitve.</p>
<p>Ekvivalentne transformacije: na obeh straneh prištejemo isti izraz, obe strani pomnožimo ali delimo z istim neničelnim številom. Kvadriranje ali množenje z izrazom, ki je lahko 0, ni ekvivalentno, zato je potreben preizkus.</p>`,
    ],
    [
      "Koliko rešitev ima linearna enačba \\(ax = b\\)? Obravnavaj vse primere.",
      R`<ul><li>\(a \neq 0\): ena rešitev \(x = \frac{b}{a}\),</li>
<li>\(a = 0,\ b \neq 0\): ni rešitve (\(0 = b\) ni res),</li>
<li>\(a = 0,\ b = 0\): vsak \(x \in \mathbb{R}\) je rešitev (identiteta).</li></ul>`,
    ],
    [
      "Kako rešujemo sistem dveh linearnih enačb z dvema neznankama? Koliko rešitev ima lahko in kaj to pomeni geometrijsko?",
      R`<p>Metode: zamenjalni način (izrazimo eno neznanko in vstavimo), način nasprotnih koeficientov, grafični način, Cramerjevo pravilo z determinantami.</p>
<p>Vsaka enačba je premica v ravnini. Sistem ima <strong>eno rešitev</strong> (premici se sekata), <strong>nobene</strong> (vzporedni, različni premici) ali <strong>neskončno</strong> rešitev (premici sovpadata).</p>`,
    ],
    [
      "Kako rešujemo linearne neenačbe? Na kaj moraš paziti?",
      R`<p>Z ekvivalentnimi transformacijami neznanko osamimo, rešitev zapišemo kot interval in jo narišemo na številski premici.</p>
<p>Ko neenačbo pomnožimo ali delimo z <strong>negativnim</strong> številom, se znak neenakosti obrne: \(-2x &lt; 6 \iff x &gt; -3\).</p>`,
    ],
    [
      "Kako rešujemo enačbe in neenačbe z absolutno vrednostjo?",
      R`<p>Uporabimo definicijo: obravnavamo primera, ko je izraz v absolutni vrednosti nenegativen ali negativen, in preverimo, ali rešitev leži na ustreznem območju.</p>
<p>Za \(r &gt; 0\): \(|x - a| = r \iff x = a \pm r\), \(|x - a| &lt; r \iff a - r &lt; x &lt; a + r\), \(|x - a| &gt; r \iff x &lt; a - r \vee x &gt; a + r\) (razdalja od \(a\) manjša ali večja od \(r\)).</p>`,
    ],
    [
      "Zapiši rešitveno formulo kvadratne enačbe. Kaj pove diskriminanta? Zapiši Vietovi formuli.",
      R`<p>Za \(ax^2 + bx + c = 0\), \(a \neq 0\): \[x_{1,2} = \frac{-b \pm \sqrt{D}}{2a}, \quad D = b^2 - 4ac.\]</p>
<p>\(D &gt; 0\): dve različni realni rešitvi, \(D = 0\): ena (dvojna), \(D &lt; 0\): ni realnih rešitev (dve konjugirano kompleksni). Vietovi formuli: \(x_1 + x_2 = -\frac{b}{a}\), \(x_1 x_2 = \frac{c}{a}\).</p>`,
    ],
    [
      "Kako rešiš kvadratno neenačbo?",
      R`<p>Neenačbo preoblikujemo v \(ax^2 + bx + c &gt; 0\) (ali \(&lt;, \le, \ge\)), poiščemo ničle in skiciramo parabolo.</p>
<p>Za \(a &gt; 0\) je parabola odprta navzgor: izraz je pozitiven zunaj ničel in negativen med njima. Primer: \(x^2 - 4 &lt; 0 \iff x \in (-2, 2)\). Če ničel ni, je izraz povsod istega predznaka kot \(a\).</p>`,
    ],
    [
      "Kako rešujemo racionalne enačbe in neenačbe? Na kaj moraš paziti?",
      R`<p>Najprej določimo definicijsko območje (imenovalci \(\neq 0\)). Pri enačbi pomnožimo s skupnim imenovalcem in rešitve primerjamo z definicijskim območjem.</p>
<p>Neenačbe ne smemo množiti z imenovalcem, ker ne poznamo njegovega predznaka. Vse prenesemo na eno stran, zapišemo kot en ulomek, razstavimo in predznak določimo s tabelo predznakov (ničle števca in imenovalca).</p>`,
    ],
    [
      "Kako rešiš iracionalno enačbo (enačbo s koreni)? Zakaj je potreben preizkus?",
      R`<p>Koren osamimo na eni strani in enačbo kvadriramo (po potrebi večkrat). Kvadriranje ni ekvivalentna transformacija: iz \(a = b\) sledi \(a^2 = b^2\), obratno pa ne, zato lahko dobimo navidezne rešitve.</p>
<p>Primer: \(\sqrt{x + 2} = x\) da \(x^2 - x - 2 = 0\), \(x \in \{2, -1\}\); preizkus pokaže, da je rešitev samo \(x = 2\).</p>`,
    ],
  ],

  potence_koreni: [
    [
      "Definiraj potenco z naravnim eksponentom in naštej pravila za računanje s potencami.",
      R`<p>\(a^n = a \cdot a \cdots a\) (\(n\) faktorjev); \(a\) je osnova, \(n\) eksponent.</p>
<p>\[a^m a^n = a^{m+n}, \quad \frac{a^m}{a^n} = a^{m-n}, \quad (a^m)^n = a^{mn}, \quad (ab)^n = a^n b^n, \quad \left(\frac{a}{b}\right)^n = \frac{a^n}{b^n}.\]</p>`,
    ],
    [
      "Kako definiramo potenco z eksponentom 0 in z negativnim celim eksponentom? Zakaj tako?",
      R`<p>Za \(a \neq 0\): \(a^0 = 1\) in \(a^{-n} = \frac{1}{a^n}\). Definicija je izbrana tako, da pravilo \(\frac{a^m}{a^n} = a^{m-n}\) velja tudi za \(m \le n\): \(\frac{a^n}{a^n} = 1 = a^0\).</p>
<p>Izraz \(0^0\) ni definiran, \(0^{-n}\) tudi ne.</p>`,
    ],
    [
      "Kaj je n-ti koren? V čem se razlikujeta sodi in lihi koren? Koliko je \\(\\sqrt{a^2}\\)?",
      R`<p>\(\sqrt[n]{a}\) je število, katerega \(n\)-ta potenca je \(a\). Za sod \(n\) je definiran za \(a \ge 0\) in je nenegativen; za lih \(n\) za vsak realen \(a\) (npr. \(\sqrt[3]{-8} = -2\)).</p>
<p>\(\sqrt{a^2} = |a|\), na primer \(\sqrt{(-3)^2} = 3\). V splošnem \(\sqrt[n]{a^n} = |a|\) za sod in \(= a\) za lih \(n\).</p>`,
    ],
    [
      "Naštej pravila za računanje s koreni.",
      R`<p>Za \(a, b \ge 0\): \[\sqrt[n]{ab} = \sqrt[n]{a}\sqrt[n]{b}, \quad \sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}, \quad \left(\sqrt[n]{a}\right)^m = \sqrt[n]{a^m}, \quad \sqrt[m]{\sqrt[n]{a}} = \sqrt[mn]{a}, \quad \sqrt[nk]{a^{mk}} = \sqrt[n]{a^m}.\]</p>
<p>Korenov ne seštevamo: \(\sqrt{a + b} \neq \sqrt{a} + \sqrt{b}\). Seštejemo lahko samo istovrstne korene, npr. \(2\sqrt{3} + 5\sqrt{3} = 7\sqrt{3}\).</p>`,
    ],
    [
      "Kako definiramo potenco z racionalnim eksponentom?",
      R`<p>Za \(a &gt; 0\), \(m \in \mathbb{Z}\), \(n \in \mathbb{N}\): \[a^{\frac{m}{n}} = \sqrt[n]{a^m}.\] Primer: \(8^{\frac{2}{3}} = \sqrt[3]{64} = 4\), \(4^{-\frac{1}{2}} = \frac{1}{2}\).</p>
<p>Za take potence veljajo ista pravila kot za potence s celim eksponentom, zato korene pogosto računamo kot potence.</p>`,
    ],
    [
      "Kaj pomeni racionalizirati imenovalec? Pokaži na dveh primerih.",
      R`<p>Ulomek razširimo tako, da v imenovalcu ni več korena.</p>
<p>\(\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}\). Pri dvočleniku razširimo z »nasprotnim« dvočlenikom in uporabimo razliko kvadratov: \(\frac{1}{\sqrt{5} - 2} = \frac{\sqrt{5} + 2}{5 - 4} = \sqrt{5} + 2\).</p>`,
    ],
    [
      "Kaj je znanstveni zapis števila? Kako v njem množimo in delimo?",
      R`<p>Število zapišemo kot \(a \cdot 10^n\), kjer je \(1 \le |a| &lt; 10\) in \(n \in \mathbb{Z}\). Primer: \(0{,}00072 = 7{,}2 \cdot 10^{-4}\), \(384\,000 = 3{,}84 \cdot 10^5\).</p>
<p>Pri množenju zmnožimo mantise in seštejemo eksponente: \((2 \cdot 10^3)(6 \cdot 10^{-5}) = 12 \cdot 10^{-2} = 1{,}2 \cdot 10^{-1}\). Pri deljenju eksponente odštejemo.</p>`,
    ],
    [
      "Kako primerjamo potence z isto osnovo ali z istim eksponentom?",
      R`<p>Z isto osnovo: za \(a &gt; 1\) velja \(a^x &lt; a^y \iff x &lt; y\), za \(0 &lt; a &lt; 1\) pa \(a^x &lt; a^y \iff x &gt; y\).</p>
<p>Z istim pozitivnim eksponentom: za \(0 &lt; a &lt; b\) je \(a^n &lt; b^n\). Korene primerjamo tako, da jih zapišemo z istim korenskim eksponentom: \(\sqrt{2} = \sqrt[6]{8}\), \(\sqrt[3]{3} = \sqrt[6]{9}\), zato \(\sqrt{2} &lt; \sqrt[3]{3}\).</p>`,
    ],
  ],

  geometrija_ravnina_prostor: [
    [
      "Kakšna je lahko medsebojna lega dveh premic v ravnini in v prostoru?",
      R`<p>V ravnini se premici sekata (v eni točki), sta vzporedni ali sovpadata. V prostoru sta lahko še <strong>mimobežni</strong>: nista vzporedni in se ne sekata, zato ne ležita v isti ravnini.</p>
<p>Premica in ravnina se sekata, sta vzporedni, ali premica leži v ravnini. Dve ravnini se sekata v premici ali sta vzporedni.</p>`,
    ],
    [
      "Kaj je kot? Naštej vrste kotov ter pojasni sokota, sovršna kota in kota z vzporednimi kraki.",
      R`<p>Kot je del ravnine, ki ga omejujeta poltraka s skupnim izhodiščem (vrhom). Glede na velikost: ničelni, ostri (\(&lt; 90^\circ\)), pravi, topi, iztegnjeni (\(180^\circ\)), udrti, polni (\(360^\circ\)).</p>
<p><strong>Sokota</strong> imata skupen krak, druga kraka sta nasprotna; vsota je \(180^\circ\). <strong>Sovršna kota</strong> nastaneta pri presečišču premic nasproti in sta enaka. Kota s paroma vzporednimi kraki sta enaka ali suplementarna.</p>`,
    ],
    [
      "Koliko je vsota notranjih kotov trikotnika? Dokaži. Kaj velja za zunanji kot?",
      R`<p>\(\alpha + \beta + \gamma = 180^\circ\). Dokaz: skozi oglišče \(C\) narišemo vzporednico stranici \(AB\). Ob \(C\) nastaneta kota, ki sta zaradi vzporednih krakov enaka \(\alpha\) in \(\beta\), skupaj z \(\gamma\) tvorita iztegnjeni kot.</p>
<p>Zunanji kot je enak vsoti notranjih kotov ob drugih dveh ogliščih: \(\alpha' = \beta + \gamma\). Vsota zunanjih kotov je \(360^\circ\).</p>`,
    ],
    [
      "Kaj pove trikotniška neenakost? Kakšna je zveza med stranicami in koti trikotnika?",
      R`<p>Vsaka stranica je krajša od vsote drugih dveh: \(a &lt; b + c\), \(b &lt; a + c\), \(c &lt; a + b\) (in daljša od njune razlike). Le tedaj iz treh daljic sestavimo trikotnik.</p>
<p>Nasproti daljše stranice leži večji kot in obratno; nasproti enakih stranic ležita enaka kota (enakokraki trikotnik).</p>`,
    ],
    [
      "Naštej značilne točke trikotnika in kako jih dobimo.",
      R`<ul><li><strong>Središče očrtane krožnice:</strong> presečišče simetral stranic (enako oddaljeno od oglišč).</li>
<li><strong>Središče včrtane krožnice:</strong> presečišče simetral notranjih kotov (enako oddaljeno od stranic).</li>
<li><strong>Težišče:</strong> presečišče težiščnic; vsako deli v razmerju \(2 : 1\) od oglišča.</li>
<li><strong>Višinska točka:</strong> presečišče nosilk višin.</li></ul>
<p>Pri pravokotnem trikotniku je središče očrtane krožnice razpolovišče hipotenuze.</p>`,
    ],
    [
      "Kdaj sta trikotnika skladna? Naštej izreke o skladnosti.",
      R`<p>Skladna sta, če ju lahko s togim premikom (premik, vrtenje, zrcaljenje) prekrijemo. Zadošča, da se ujemata v:</p>
<ul><li>vseh treh stranicah (SSS),</li><li>dveh stranicah in kotu med njima (SKS),</li><li>stranici in obeh priležnih kotih (KSK),</li><li>dveh stranicah in kotu nasproti daljše od njiju (SSK).</li></ul>`,
    ],
    [
      "Kdaj sta trikotnika podobna? Kako se spremenijo obseg in ploščina pri podobnosti s faktorjem k?",
      R`<p>Podobna sta, če imata enake kote (zadoščata dva) ali sorazmerne stranice, ali dve sorazmerni stranici in enak kot med njima.</p>
<p>Če je razmerje podobnosti \(k\), se vse dolžine (tudi obseg, višine) pomnožijo s \(k\), ploščina s \(k^2\) (pri telesih prostornina s \(k^3\)).</p>`,
    ],
    [
      "Zapiši Pitagorov, Evklidov in višinski izrek za pravokotni trikotnik.",
      R`<p>Za katete \(a, b\), hipotenuzo \(c\), višino \(v_c\) in pravokotni projekciji katet \(a_1, b_1\) na hipotenuzo:</p>
<p>\[a^2 + b^2 = c^2, \qquad a^2 = c \cdot a_1,\ b^2 = c \cdot b_1, \qquad v_c^2 = a_1 \cdot b_1.\]</p>
<p>Velja tudi obrat Pitagorovega izreka: če \(a^2 + b^2 = c^2\), je trikotnik pravokoten.</p>`,
    ],
    [
      "Definiraj kotne funkcije ostrega kota v pravokotnem trikotniku. Navedi vrednosti za 30°, 45° in 60°.",
      R`<p>\(\sin\alpha = \frac{a}{c}\) (nasprotna kateta / hipotenuza), \(\cos\alpha = \frac{b}{c}\) (priležna / hipotenuza), \(\tan\alpha = \frac{a}{b}\), \(\cot\alpha = \frac{b}{a}\).</p>
<p>\(\sin 30^\circ = \cos 60^\circ = \frac{1}{2}\), \(\sin 45^\circ = \cos 45^\circ = \frac{\sqrt{2}}{2}\), \(\sin 60^\circ = \cos 30^\circ = \frac{\sqrt{3}}{2}\), \(\tan 30^\circ = \frac{\sqrt{3}}{3}\), \(\tan 45^\circ = 1\), \(\tan 60^\circ = \sqrt{3}\). Izpeljemo jih iz polovice kvadrata in polovice enakostraničnega trikotnika.</p>`,
    ],
    [
      "Zapiši sinusni izrek. Kdaj ga uporabimo?",
      R`<p>\[\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = \frac{c}{\sin\gamma} = 2R,\] kjer je \(R\) polmer trikotniku očrtane krožnice.</p>
<p>Uporabimo ga, ko poznamo stranico in dva kota, ali dve stranici in kot nasproti ene od njiju (takrat sta lahko dve rešitvi, ker \(\sin\alpha = \sin(180^\circ - \alpha)\)).</p>`,
    ],
    [
      "Zapiši kosinusni izrek. Kdaj ga uporabimo in kako je povezan s Pitagorovim izrekom?",
      R`<p>\[c^2 = a^2 + b^2 - 2ab\cos\gamma\] (in podobno za \(a\), \(b\)).</p>
<p>Uporabimo ga, ko poznamo dve stranici in kot med njima (izračunamo tretjo stranico), ali vse tri stranice (izračunamo kote). Za \(\gamma = 90^\circ\) je \(\cos\gamma = 0\) in dobimo Pitagorov izrek.</p>`,
    ],
    [
      "Kaj sta središčni in obodni kot? Kakšna je zveza med njima? Kaj pove Talesov izrek?",
      R`<p>Središčni kot ima vrh v središču krožnice, obodni kot na krožnici; oba oklepata isti lok. Obodni kot je pol središčnega nad istim lokom, zato so vsi obodni koti nad istim lokom enaki.</p>
<p><strong>Talesov izrek:</strong> obodni kot nad premerom je pravi kot. Tangenta na krožnico je pravokotna na polmer v dotikališču.</p>`,
    ],
  ],

  geometrijski_liki_telesa: [
    [
      "Naštej formule za ploščino trikotnika.",
      R`<p>\[S = \frac{a \cdot v_a}{2} = \frac{ab\sin\gamma}{2} = \sqrt{s(s - a)(s - b)(s - c)} = r s = \frac{abc}{4R},\]
kjer je \(s = \frac{a + b + c}{2}\) polovični obseg (Heronova formula), \(r\) polmer včrtane in \(R\) polmer očrtane krožnice.</p>
<p>Enakostranični trikotnik: \(S = \frac{a^2\sqrt{3}}{4}\), \(v = \frac{a\sqrt{3}}{2}\).</p>`,
    ],
    [
      "Opiši štirikotnike (paralelogram, romb, pravokotnik, kvadrat, trapez, deltoid) in njihove ploščine.",
      R`<ul><li><strong>Paralelogram:</strong> nasprotni stranici vzporedni in enaki, diagonali se razpolavljata; \(S = a v_a = ab\sin\alpha\).</li>
<li><strong>Romb:</strong> paralelogram z enakimi stranicami, diagonali pravokotni; \(S = \frac{ef}{2}\).</li>
<li><strong>Pravokotnik:</strong> paralelogram s pravimi koti, diagonali enaki; \(S = ab\). <strong>Kvadrat:</strong> \(S = a^2 = \frac{d^2}{2}\), \(d = a\sqrt{2}\).</li>
<li><strong>Trapez:</strong> en par vzporednih stranic; \(S = \frac{a + c}{2} v\), srednjica \(\frac{a + c}{2}\).</li>
<li><strong>Deltoid:</strong> dva para enakih sosednjih stranic, diagonali pravokotni; \(S = \frac{ef}{2}\).</li></ul>
<p>Vsota notranjih kotov štirikotnika je \(360^\circ\).</p>`,
    ],
    [
      "Kolikšna je vsota notranjih kotov n-kotnika in koliko diagonal ima? Kaj je pravilni n-kotnik?",
      R`<p>Vsota notranjih kotov je \((n - 2) \cdot 180^\circ\) (n-kotnik razdelimo z diagonalami iz enega oglišča na \(n - 2\) trikotnikov). Število diagonal je \(\frac{n(n - 3)}{2}\).</p>
<p>Pravilni n-kotnik ima enake stranice in enake kote: notranji kot \(\frac{(n - 2) 180^\circ}{n}\). Ima očrtano in včrtano krožnico, razdelimo ga na \(n\) enakokrakih trikotnikov s središčnim kotom \(\frac{360^\circ}{n}\).</p>`,
    ],
    [
      "Zapiši formule za obseg in ploščino kroga, dolžino krožnega loka in ploščino krožnega izseka.",
      R`<p>\(o = 2\pi r\), \(S = \pi r^2\). Za središčni kot \(\alpha\) v stopinjah: \[l = \frac{\pi r \alpha}{180^\circ}, \qquad S_i = \frac{\pi r^2 \alpha}{360^\circ} = \frac{l r}{2}.\]</p>
<p>V radianih: \(l = r\varphi\), \(S_i = \frac{r^2 \varphi}{2}\). Krožni odsek dobimo, ko izseku odštejemo trikotnik: \(S_o = \frac{r^2}{2}(\varphi - \sin\varphi)\).</p>`,
    ],
    [
      "Kako izračunamo površino in prostornino prizme? Kolikšna je telesna diagonala kvadra?",
      R`<p>\(P = 2O + S_{pl}\), kjer je \(O\) ploščina osnovne ploskve, plašč pa je sestavljen iz pravokotnikov (pokončna prizma: \(S_{pl} = o \cdot v\)). \(V = O \cdot v\).</p>
<p>Kvader: \(P = 2(ab + bc + ac)\), \(V = abc\), \(D = \sqrt{a^2 + b^2 + c^2}\). Kocka: \(P = 6a^2\), \(V = a^3\), \(D = a\sqrt{3}\).</p>`,
    ],
    [
      "Kako izračunamo površino in prostornino piramide? Kaj je stranska višina pravilne piramide?",
      R`<p>\(P = O + S_{pl}\), \(V = \frac{O \cdot v}{3}\). Piramida ima tretjino prostornine prizme z isto osnovno ploskvijo in višino.</p>
<p>Pri pravilni piramidi (osnovna ploskev pravilni n-kotnik, vrh nad središčem) je plašč sestavljen iz enakokrakih trikotnikov; njihova višina je stranska višina \(v_s\), npr. pri štiristrani \(v_s^2 = v^2 + \left(\frac{a}{2}\right)^2\), \(S_{pl} = 2 a v_s\).</p>`,
    ],
    [
      "Zapiši formule za površino in prostornino valja in stožca. Kaj je osni presek?",
      R`<p>Valj: \(P = 2\pi r^2 + 2\pi r v = 2\pi r (r + v)\), \(V = \pi r^2 v\); plašč je pravokotnik \(2\pi r \times v\).</p>
<p>Stožec: \(P = \pi r^2 + \pi r s = \pi r (r + s)\), \(V = \frac{\pi r^2 v}{3}\), \(s^2 = r^2 + v^2\); plašč je krožni izsek s polmerom \(s\).</p>
<p>Osni presek je presek z ravnino skozi os: pri valju pravokotnik \(2r \times v\), pri stožcu enakokraki trikotnik. Enakostranični valj ima \(v = 2r\), enakostranični stožec \(s = 2r\).</p>`,
    ],
    [
      "Zapiši formuli za površino in prostornino krogle.",
      R`<p>\[P = 4\pi r^2, \qquad V = \frac{4\pi r^3}{3}.\]</p>
<p>Presek krogle z ravnino je krog; če je ravnina od središča oddaljena za \(d\), je njegov polmer \(\rho = \sqrt{r^2 - d^2}\).</p>`,
    ],
    [
      "Kako se spremenijo obseg, ploščina in prostornina, če vse dolžine povečamo s faktorjem k?",
      R`<p>Dolžine (obseg, višine, diagonale) se povečajo \(k\)-krat, ploščine (tudi površina telesa) \(k^2\)-krat, prostornina \(k^3\)-krat.</p>
<p>Primer: kocka z dvakrat daljšim robom ima 4-krat večjo površino in 8-krat večjo prostornino.</p>`,
    ],
  ],

  vektorji_ravnina_prostor: [
    [
      "Kaj je vektor? Kdaj sta vektorja enaka? Kaj sta ničelni in nasprotni vektor?",
      R`<p>Vektor je usmerjena daljica; določajo ga dolžina, smer in usmerjenost. Usmerjeni daljici, ki se z vzporednim premikom prekrijeta, predstavljata isti vektor.</p>
<p>Vektorja sta enaka, če imata enako dolžino, smer in usmerjenost. Ničelni vektor \(\vec 0\) ima dolžino 0. Nasprotni vektor \(-\vec a\) ima enako dolžino in smer, a nasprotno usmerjenost: \(\overrightarrow{BA} = -\overrightarrow{AB}\).</p>`,
    ],
    [
      "Kako seštevamo in odštevamo vektorje? Naštej lastnosti seštevanja.",
      R`<p><strong>Trikotniško pravilo:</strong> začetek \(\vec b\) postavimo v konec \(\vec a\); vsota gre od začetka \(\vec a\) do konca \(\vec b\): \(\overrightarrow{AB} + \overrightarrow{BC} = \overrightarrow{AC}\). <strong>Paralelogramsko pravilo:</strong> vsota je diagonala paralelograma.</p>
<p>\(\vec a - \vec b = \vec a + (-\vec b)\). Seštevanje je komutativno in asociativno, \(\vec a + \vec 0 = \vec a\), \(\vec a + (-\vec a) = \vec 0\).</p>`,
    ],
    [
      "Kako množimo vektor s skalarjem? Kdaj sta vektorja kolinearna?",
      R`<p>\(k\vec a\) ima dolžino \(|k| |\vec a|\) in isto smer kot \(\vec a\); za \(k &gt; 0\) isto, za \(k &lt; 0\) nasprotno usmerjenost.</p>
<p>Vektorja sta kolinearna (vzporedna), če ležita na vzporednih premicah, to je \(\vec b = k \vec a\) za neki \(k\). Točke \(A, B, C\) so kolinearne natanko tedaj, ko je \(\overrightarrow{AC} = k \overrightarrow{AB}\).</p>`,
    ],
    [
      "Kaj je linearna kombinacija vektorjev? Kdaj so vektorji linearno neodvisni? Kaj je baza?",
      R`<p>Linearna kombinacija je \(\alpha \vec a + \beta \vec b + \dots\). Vektorji so linearno neodvisni, če je \(\alpha \vec a + \beta \vec b + \gamma \vec c = \vec 0\) samo pri \(\alpha = \beta = \gamma = 0\).</p>
<p>V ravnini sta neodvisna vsaka dva nekolinearna vektorja, v prostoru vsaki trije nekomplanarni. Baza ravnine sta dva, baza prostora trije neodvisni vektorji; vsak vektor lahko enolično zapišemo kot njihovo linearno kombinacijo.</p>`,
    ],
    [
      "Kako zapišemo vektor v pravokotnem koordinatnem sistemu? Kako izračunamo dolžino vektorja in vektor med dvema točkama?",
      R`<p>Z ortonormirano bazo \(\vec i, \vec j, \vec k\): \(\vec a = a_1\vec i + a_2\vec j + a_3\vec k = (a_1, a_2, a_3)\). Krajevni vektor točke \(T(x, y, z)\) je \(\vec r_T = (x, y, z)\).</p>
<p>\(\overrightarrow{AB} = \vec r_B - \vec r_A = (x_B - x_A,\ y_B - y_A,\ z_B - z_A)\), \(|\vec a| = \sqrt{a_1^2 + a_2^2 + a_3^2}\). Seštevamo in množimo s skalarjem po komponentah. Enotski vektor: \(\vec e = \frac{\vec a}{|\vec a|}\).</p>`,
    ],
    [
      "Definiraj skalarni produkt in naštej njegove lastnosti. Kdaj sta vektorja pravokotna?",
      R`<p>\[\vec a \cdot \vec b = |\vec a| |\vec b| \cos\varphi,\] kjer je \(\varphi\) kot med vektorjema. Rezultat je število.</p>
<p>Lastnosti: \(\vec a \cdot \vec b = \vec b \cdot \vec a\), \(\vec a \cdot (\vec b + \vec c) = \vec a \cdot \vec b + \vec a \cdot \vec c\), \((k\vec a) \cdot \vec b = k(\vec a \cdot \vec b)\), \(\vec a \cdot \vec a = |\vec a|^2\). Neničelna vektorja sta pravokotna natanko tedaj, ko je \(\vec a \cdot \vec b = 0\).</p>`,
    ],
    [
      "Kako izračunamo skalarni produkt v komponentah in kot med vektorjema?",
      R`<p>\(\vec a \cdot \vec b = a_1 b_1 + a_2 b_2 + a_3 b_3\) (ker so bazni vektorji enotski in paroma pravokotni).</p>
<p>\[\cos\varphi = \frac{\vec a \cdot \vec b}{|\vec a| |\vec b|}.\] Če je skalarni produkt pozitiven, je kot oster, če negativen, top.</p>`,
    ],
    [
      "Kako z vektorji zapišemo razpolovišče daljice in težišče trikotnika?",
      R`<p>Razpolovišče daljice \(AB\): \(\vec r_S = \frac{\vec r_A + \vec r_B}{2}\). Težišče trikotnika \(ABC\): \(\vec r_T = \frac{\vec r_A + \vec r_B + \vec r_C}{3}\).</p>
<p>V koordinatah: \(S\left(\frac{x_A + x_B}{2}, \frac{y_A + y_B}{2}\right)\), \(T\left(\frac{x_A + x_B + x_C}{3}, \frac{y_A + y_B + y_C}{3}\right)\).</p>`,
    ],
    [
      "Kaj je pravokotna projekcija vektorja na drug vektor? Kako jo izračunamo?",
      R`<p>Pravokotna projekcija \(\vec a\) na \(\vec b\) je vektor v smeri \(\vec b\), ki ga dobimo, ko iz konca \(\vec a\) spustimo pravokotnico na nosilko \(\vec b\):</p>
<p>\[\vec a_{\vec b} = \frac{\vec a \cdot \vec b}{|\vec b|^2} \vec b, \qquad |\vec a_{\vec b}| = \frac{|\vec a \cdot \vec b|}{|\vec b|}.\] Uporabimo jo npr. za višino trikotnika ali razdaljo točke od premice.</p>`,
      "visja",
    ],
  ],

  pravokotni_koordinatni_sistem_ravnina: [
    [
      "Kako izračunamo razdaljo med dvema točkama in koordinate razpolovišča daljice?",
      R`<p>\[d(A, B) = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2},\] izpeljemo jo iz Pitagorovega izreka (razlike koordinat sta kateti).</p>
<p>Razpolovišče: \(S\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)\).</p>`,
    ],
    [
      "Kako izračunamo ploščino trikotnika, če poznamo koordinate oglišč?",
      R`<p>\[S = \frac{1}{2} \left| (x_2 - x_1)(y_3 - y_1) - (x_3 - x_1)(y_2 - y_1) \right|.\]</p>
<p>Če je izraz v absolutni vrednosti 0, so točke kolinearne (ležijo na isti premici).</p>`,
    ],
    [
      "Naštej oblike enačbe premice. Kaj pomenita smerni koeficient in začetna vrednost?",
      R`<ul><li>eksplicitna: \(y = kx + n\); \(k\) je smerni koeficient (sprememba \(y\), ko se \(x\) poveča za 1), \(n\) presečišče z osjo \(y\),</li>
<li>implicitna: \(ax + by + c = 0\) (zajame tudi navpične premice \(x = x_0\)),</li>
<li>odsekovna: \(\frac{x}{m} + \frac{y}{n} = 1\), kjer sta \(m\) in \(n\) odseka na oseh.</li></ul>`,
    ],
    [
      "Kako dobimo enačbo premice skozi dano točko z danim smernim koeficientom in skozi dve točki?",
      R`<p>Skozi \(T(x_0, y_0)\) s smernim koeficientom \(k\): \(y - y_0 = k(x - x_0)\).</p>
<p>Skozi dve točki: \(k = \frac{y_2 - y_1}{x_2 - x_1}\) (za \(x_1 \neq x_2\)), nato uporabimo prejšnjo formulo. Če je \(x_1 = x_2\), je premica navpična: \(x = x_1\).</p>`,
    ],
    [
      "Kaj je naklonski kot premice? Kako izračunamo kot med dvema premicama?",
      R`<p>Naklonski kot \(\varphi\) je kot med pozitivnim delom osi \(x\) in premico: \(k = \tan\varphi\), \(\varphi \in [0^\circ, 180^\circ)\).</p>
<p>Kot med premicama s smernima koeficientoma \(k_1, k_2\): \[\tan\delta = \left| \frac{k_2 - k_1}{1 + k_1 k_2} \right|.\]</p>`,
    ],
    [
      "Kdaj sta dve premici vzporedni in kdaj pravokotni?",
      R`<p>Vzporedni: \(k_1 = k_2\) (v implicitni obliki sta normali vzporedni). Pravokotni: \(k_1 \cdot k_2 = -1\), torej \(k_2 = -\frac{1}{k_1}\).</p>
<p>Primer: premici, pravokotni na \(y = 2x + 1\), imata \(k = -\frac{1}{2}\).</p>`,
    ],
    [
      "Kako izračunamo razdaljo točke od premice?",
      R`<p>Za premico \(ax + by + c = 0\) in točko \(T(x_0, y_0)\): \[d(T, p) = \frac{|a x_0 + b y_0 + c|}{\sqrt{a^2 + b^2}}.\]</p>
<p>To je dolžina pravokotnice iz \(T\) na premico. Razdaljo med vzporednima premicama dobimo kot razdaljo poljubne točke ene premice od druge.</p>`,
    ],
    [
      "Kako ugotovimo medsebojno lego dveh premic in poiščemo presečišče?",
      R`<p>Rešimo sistem enačb obeh premic. Ena rešitev pomeni, da se sekata (rešitev je presečišče), nobene, da sta vzporedni, neskončno, da sovpadata.</p>
<p>Brez reševanja: različna smerna koeficienta pomenita presečišče, enaka \(k\) in različna \(n\) vzporednost, enaka \(k\) in \(n\) sovpadanje.</p>`,
    ],
  ],

  funkcije: [
    [
      "Kaj je funkcija? Kaj sta definicijsko območje in zaloga vrednosti? Kaj je graf funkcije?",
      R`<p>Funkcija \(f: A \to B\) je predpis, ki vsakemu elementu iz \(A\) priredi <strong>natanko en</strong> element iz \(B\). \(D_f\) so vsi \(x\), pri katerih je predpis definiran, \(Z_f = \{f(x);\ x \in D_f\}\) so vse vrednosti.</p>
<p>Graf je množica točk \((x, f(x))\) v ravnini. Vsaka navpična premica seka graf funkcije največ enkrat.</p>`,
    ],
    [
      "Kdaj je funkcija injektivna, surjektivna in bijektivna? Kaj je inverzna funkcija in kakšen je njen graf?",
      R`<p><strong>Injektivna:</strong> različnim \(x\) priredi različne vrednosti (\(x_1 \neq x_2 \Rightarrow f(x_1) \neq f(x_2)\)); vsaka vodoravna premica seka graf največ enkrat. <strong>Surjektivna:</strong> \(Z_f = B\). <strong>Bijektivna:</strong> oboje.</p>
<p>Bijektivna funkcija ima inverzno \(f^{-1}\), za katero \(f^{-1}(f(x)) = x\). Dobimo jo tako, da zamenjamo \(x\) in \(y\) ter izrazimo \(y\). Graf \(f^{-1}\) je zrcalna slika grafa \(f\) čez premico \(y = x\).</p>`,
    ],
    [
      "Kdaj je funkcija naraščajoča, padajoča, soda, liha, omejena? Kaj je ničla funkcije?",
      R`<ul><li><strong>Naraščajoča</strong> na intervalu: \(x_1 &lt; x_2 \Rightarrow f(x_1) &lt; f(x_2)\); padajoča: \(f(x_1) &gt; f(x_2)\).</li>
<li><strong>Soda:</strong> \(f(-x) = f(x)\), graf simetričen glede na os \(y\); <strong>liha:</strong> \(f(-x) = -f(x)\), graf simetričen glede na izhodišče.</li>
<li><strong>Omejena:</strong> obstajata \(m, M\), da je \(m \le f(x) \le M\).</li>
<li><strong>Ničla:</strong> \(x_0\), pri katerem je \(f(x_0) = 0\) (presečišče grafa z osjo \(x\)).</li></ul>`,
    ],
    [
      "Opiši linearno funkcijo in njen graf. Kaj vpliva na naraščanje?",
      R`<p>\(f(x) = kx + n\); graf je premica s smernim koeficientom \(k\) in začetno vrednostjo \(n = f(0)\). Za \(k &gt; 0\) narašča, za \(k &lt; 0\) pada, za \(k = 0\) je konstantna.</p>
<p>Ničla je \(x_0 = -\frac{n}{k}\) (za \(k \neq 0\)). \(D_f = \mathbb{R}\), za \(k \neq 0\) je \(Z_f = \mathbb{R}\) in funkcija je bijektivna.</p>`,
    ],
    [
      "Zapiši tri oblike kvadratne funkcije. Kako izračunamo teme? Kako diskriminanta vpliva na graf?",
      R`<p>Splošna: \(f(x) = ax^2 + bx + c\); temenska: \(f(x) = a(x - p)^2 + q\); ničelna: \(f(x) = a(x - x_1)(x - x_2)\).</p>
<p>Teme \(T(p, q)\): \(p = -\frac{b}{2a}\), \(q = -\frac{D}{4a}\). Graf je parabola, za \(a &gt; 0\) odprta navzgor (\(q\) je minimum). \(D &gt; 0\): dve ničli, \(D = 0\): parabola se osi \(x\) dotika v temenu, \(D &lt; 0\): ničel ni. Os simetrije je \(x = p\).</p>`,
    ],
    [
      "Opiši potenčne funkcije \\(f(x) = x^n\\) za naravni in negativni celi eksponent.",
      R`<p>Za \(n \in \mathbb{N}\): sod \(n\) da sodo funkcijo (graf podoben paraboli, \(Z_f = [0, \infty)\)), lih \(n\) liho funkcijo, ki narašča (\(Z_f = \mathbb{R}\)). Vsi grafi gredo skozi \((1, 1)\) in \((0, 0)\).</p>
<p>Za \(n = -m &lt; 0\): \(f(x) = \frac{1}{x^m}\), \(D_f = \mathbb{R} \setminus \{0\}\); graf je hiperbola z navpično asimptoto \(x = 0\) in vodoravno \(y = 0\); sod \(m\) da sodo, lih \(m\) liho funkcijo.</p>`,
    ],
    [
      "Opiši eksponentno funkcijo in njene lastnosti. Kako rešujemo eksponentne enačbe?",
      R`<p>\(f(x) = a^x\), \(a &gt; 0\), \(a \neq 1\). \(D_f = \mathbb{R}\), \(Z_f = (0, \infty)\), graf gre skozi \((0, 1)\), os \(x\) je vodoravna asimptota, ničel ni. Za \(a &gt; 1\) narašča, za \(0 &lt; a &lt; 1\) pada. Funkcija je injektivna.</p>
<p>Enačbe: obe strani zapišemo kot potenci z isto osnovo in izenačimo eksponenta (\(2^{x+1} = 8 \Rightarrow x + 1 = 3\)), ali logaritmiramo, ali uvedemo novo neznanko (\(t = 2^x\)).</p>`,
    ],
    [
      "Definiraj logaritem in naštej pravila za računanje z logaritmi.",
      R`<p>\(\log_a x = y \iff a^y = x\) (\(a &gt; 0\), \(a \neq 1\), \(x &gt; 0\)). Posebej \(\log_a 1 = 0\), \(\log_a a = 1\), \(\ln = \log_e\), \(\log = \log_{10}\).</p>
<p>\[\log_a(xy) = \log_a x + \log_a y, \quad \log_a \frac{x}{y} = \log_a x - \log_a y, \quad \log_a x^r = r\log_a x, \quad \log_a x = \frac{\log_b x}{\log_b a}.\]</p>`,
    ],
    [
      "Opiši logaritemsko funkcijo in njeno zvezo z eksponentno.",
      R`<p>\(f(x) = \log_a x\) je inverzna funkcija eksponentne \(a^x\), graf je zrcalen čez \(y = x\). \(D_f = (0, \infty)\), \(Z_f = \mathbb{R}\), ničla \(x = 1\), os \(y\) je navpična asimptota.</p>
<p>Za \(a &gt; 1\) narašča, za \(0 &lt; a &lt; 1\) pada. Pri logaritemskih enačbah najprej določimo definicijsko območje (argumenti \(&gt; 0\)) in na koncu preverimo rešitve.</p>`,
    ],
    [
      "Kako definiramo kotne funkcije poljubnega kota na enotski krožnici? Kaj je radian?",
      R`<p>Krak kota \(\varphi\) seka enotsko krožnico v točki \(T(x, y)\): \(\cos\varphi = x\), \(\sin\varphi = y\), \(\tan\varphi = \frac{y}{x}\). Predznaki so odvisni od kvadranta.</p>
<p>Radian je središčni kot, ki pripada loku z dolžino polmera: \(\pi\ \text{rad} = 180^\circ\). Sinus in kosinus imata periodo \(2\pi\), tangens \(\pi\). Velja \(\sin^2\varphi + \cos^2\varphi = 1\).</p>`,
    ],
    [
      "Zapiši adicijske izreke in formule za kotne funkcije dvojnega kota.",
      R`<p>\[\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta, \quad \cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta,\]
\[\tan(\alpha \pm \beta) = \frac{\tan\alpha \pm \tan\beta}{1 \mp \tan\alpha\tan\beta}.\]</p>
<p>\(\sin 2\alpha = 2\sin\alpha\cos\alpha\), \(\cos 2\alpha = \cos^2\alpha - \sin^2\alpha = 1 - 2\sin^2\alpha\), \(\tan 2\alpha = \frac{2\tan\alpha}{1 - \tan^2\alpha}\).</p>`,
    ],
    [
      "Opiši grafe kotnih funkcij. Kaj pomenijo parametri v \\(f(x) = A\\sin(bx + c) + d\\)?",
      R`<p>\(\sin\) in \(\cos\): \(D = \mathbb{R}\), \(Z = [-1, 1]\), perioda \(2\pi\); sinus je lih, kosinus sod. \(\tan x\): perioda \(\pi\), navpične asimptote pri \(x = \frac{\pi}{2} + k\pi\), \(Z = \mathbb{R}\).</p>
<p>\(|A|\) je amplituda (razteg v smeri \(y\)), perioda je \(\frac{2\pi}{|b|}\), graf je premaknjen za \(-\frac{c}{b}\) v smeri \(x\) in za \(d\) v smeri \(y\).</p>`,
    ],
    [
      "Kaj je polinom? Kaj povedo osnovni izrek algebre, izrek o deljenju in Hornerjev algoritem?",
      R`<p>\(p(x) = a_n x^n + \dots + a_1 x + a_0\), \(a_n \neq 0\), je polinom stopnje \(n\). Polinom stopnje \(n\) ima natanko \(n\) kompleksnih ničel (štetih z večkratnostjo), torej največ \(n\) realnih.</p>
<p>Deljenje: \(p(x) = k(x) q(x) + r(x)\), stopnja ostanka je manjša od stopnje delitelja. Ostanek pri deljenju z \(x - a\) je \(p(a)\), zato je \(a\) ničla natanko tedaj, ko \((x - a) \mid p(x)\). Hornerjev algoritem hitro izračuna \(p(a)\) in količnik. Cele ničle so delitelji \(a_0\).</p>`,
    ],
    [
      "Kako se obnaša graf polinoma okoli ničle in v neskončnosti?",
      R`<p>V ničli lihe stopnje (enkratna, trojna …) graf seka os \(x\) in predznak se spremeni; v ničli sode stopnje se je dotakne, predznak ostane.</p>
<p>Za velike \(|x|\) prevlada vodilni člen \(a_n x^n\): pri sodem \(n\) gre graf na obeh straneh v isto smer (za \(a_n &gt; 0\) navzgor), pri lihem v nasprotni smeri. Presečišče z osjo \(y\) je \(a_0\).</p>`,
    ],
    [
      "Kaj je racionalna funkcija? Kako določimo ničle, pole in asimptoto?",
      R`<p>\(f(x) = \frac{p(x)}{q(x)}\), kjer sta \(p\) in \(q\) polinoma (okrajšana). Ničle so ničle števca, poli ničle imenovalca (tam je navpična asimptota; pri polu lihe stopnje se predznak spremeni).</p>
<p>Vodoravna ali poševna asimptota: če je stopnja števca manjša, je \(y = 0\); če sta stopnji enaki, je \(y = \frac{a_n}{b_n}\); če je števec za 1 večje stopnje, je asimptota poševna premica (količnik pri deljenju).</p>`,
    ],
    [
      "Kako se spremeni graf funkcije \\(f\\) pri transformacijah \\(f(x - a)\\), \\(f(x) + b\\), \\(-f(x)\\), \\(f(-x)\\) in \\(k f(x)\\)?",
      R`<ul><li>\(f(x - a)\): premik za \(a\) v desno (za \(a &gt; 0\)),</li>
<li>\(f(x) + b\): premik za \(b\) navzgor,</li>
<li>\(-f(x)\): zrcaljenje čez os \(x\); \(f(-x)\): zrcaljenje čez os \(y\),</li>
<li>\(k f(x)\): razteg v smeri osi \(y\) s faktorjem \(k\); \(f(kx)\): skrčitev v smeri osi \(x\) s faktorjem \(k\),</li>
<li>\(|f(x)|\): deli pod osjo \(x\) se prezrcalijo navzgor.</li></ul>`,
    ],
    [
      "Kaj je kompozitum funkcij? Pokaži na primeru, da \\(f \\circ g \\neq g \\circ f\\).",
      R`<p>\((f \circ g)(x) = f(g(x))\): najprej uporabimo \(g\), nato \(f\). Definiran je za \(x \in D_g\), za katere je \(g(x) \in D_f\).</p>
<p>Primer: \(f(x) = x^2\), \(g(x) = x + 1\): \((f \circ g)(x) = (x + 1)^2\), \((g \circ f)(x) = x^2 + 1\). Velja \(f \circ f^{-1} = \mathrm{id}\).</p>`,
    ],
  ],

  stoznice: [
    [
      "Kaj so stožnice in zakaj se tako imenujejo?",
      R`<p>Stožnice so krivulje, ki nastanejo pri preseku plašča (dvojnega) stožca z ravnino, ki ne gre skozi vrh: krožnica (ravnina pravokotna na os), elipsa, parabola (ravnina vzporedna s stranico stožca) in hiperbola (seka oba dela stožca).</p>
<p>V ravnini jih opišemo z enačbo druge stopnje v \(x\) in \(y\).</p>`,
    ],
    [
      "Definiraj krožnico in zapiši njeno enačbo. Kako iz splošne enačbe dobiš središče in polmer?",
      R`<p>Krožnica je množica točk ravnine, ki so od središča \(S(p, q)\) oddaljene za \(r\): \[(x - p)^2 + (y - q)^2 = r^2.\]</p>
<p>Iz \(x^2 + y^2 + ax + by + c = 0\) z dopolnjevanjem do popolnih kvadratov: \(S\left(-\frac{a}{2}, -\frac{b}{2}\right)\), \(r^2 = \frac{a^2 + b^2}{4} - c\). Če je \(r^2 \le 0\), to ni krožnica (točka ali prazna množica).</p>`,
    ],
    [
      "Kakšna je lahko lega premice glede na krožnico? Kako to ugotoviš? Kaj velja za tangento?",
      R`<p>Premica je sekanta (dve skupni točki), tangenta (ena) ali mimobežnica (nobene). Ugotovimo z razdaljo središča od premice (\(d &lt; r\), \(d = r\), \(d &gt; r\)) ali z diskriminanto kvadratne enačbe, ki jo dobimo, ko enačbo premice vstavimo v enačbo krožnice.</p>
<p>Tangenta je pravokotna na polmer v dotikališču; tangenta na \(x^2 + y^2 = r^2\) v točki \((x_0, y_0)\) je \(x_0 x + y_0 y = r^2\).</p>`,
    ],
    [
      "Definiraj elipso. Zapiši njeno enačbo in zvezo med a, b in e. Kaj je ekscentričnost?",
      R`<p>Elipsa je množica točk, ki imajo konstantno vsoto razdalj od dveh gorišč: \(d(T, F_1) + d(T, F_2) = 2a\).</p>
<p>Središče v izhodišču, gorišči na osi \(x\): \[\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1, \qquad e^2 = a^2 - b^2,\] gorišči \(F_{1,2}(\pm e, 0)\), temena \((\pm a, 0)\), \((0, \pm b)\). Numerična ekscentričnost \(\varepsilon = \frac{e}{a} \in [0, 1)\) pove, kako »sploščena« je elipsa (za \(\varepsilon = 0\) je krožnica).</p>`,
    ],
    [
      "Definiraj hiperbolo. Zapiši njeno enačbo, zvezo med a, b in e ter enačbi asimptot.",
      R`<p>Hiperbola je množica točk, ki imajo konstantno absolutno razliko razdalj od dveh gorišč: \(|d(T, F_1) - d(T, F_2)| = 2a\).</p>
<p>\[\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1, \qquad e^2 = a^2 + b^2,\] gorišči \((\pm e, 0)\), temeni \((\pm a, 0)\), asimptoti \(y = \pm\frac{b}{a}x\). Pri \(-\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) sta temeni na osi \(y\). Enakoosna hiperbola ima \(a = b\).</p>`,
    ],
    [
      "Definiraj parabolo. Zapiši njeno temensko enačbo, gorišče in vodnico.",
      R`<p>Parabola je množica točk, ki so enako oddaljene od gorišča \(F\) in vodnice \(v\).</p>
<p>\(y^2 = 2px\): gorišče \(F\left(\frac{p}{2}, 0\right)\), vodnica \(x = -\frac{p}{2}\), teme v izhodišču, os \(x\) je os simetrije. Za \(x^2 = 2py\) je \(F\left(0, \frac{p}{2}\right)\), vodnica \(y = -\frac{p}{2}\); to je graf kvadratne funkcije \(y = \frac{x^2}{2p}\).</p>`,
    ],
    [
      "Kako iz enačbe druge stopnje ugotoviš, za katero stožnico gre? Kaj pomeni premik stožnice?",
      R`<p>Za \(Ax^2 + By^2 + Cx + Dy + E = 0\) (brez člena \(xy\)) z dopolnjevanjem do popolnih kvadratov dobimo premaknjeno obliko, npr. \(\frac{(x - p)^2}{a^2} + \frac{(y - q)^2}{b^2} = 1\) (središče v \((p, q)\)).</p>
<p>Okvirno: \(A = B\): krožnica; \(A, B\) istega predznaka: elipsa; različnih predznakov: hiperbola; eden od njiju je 0: parabola (lahko tudi izrojeni primeri).</p>`,
    ],
    [
      "Kako izračunaš presečišča stožnice s premico ali z drugo stožnico?",
      R`<p>Rešimo sistem enačb. Pri premici izrazimo eno neznanko iz enačbe premice in jo vstavimo v enačbo stožnice; dobimo kvadratno enačbo. Njena diskriminanta pove, ali sta presečišči dve (\(D &gt; 0\)), ali je premica tangenta (\(D = 0\)), ali presečišča ni (\(D &lt; 0\)).</p>
<p>Pri dveh stožnicah pogosto enačbi odštejemo ali seštejemo, da se en kvadratni člen izloči.</p>`,
    ],
  ],

  zaporedja_vrste: [
    [
      "Kaj je zaporedje? Kako ga lahko podamo? Navedi primer.",
      R`<p>Zaporedje je funkcija \(a: \mathbb{N} \to \mathbb{R}\); vrednosti \(a_1, a_2, a_3, \dots\) so členi. Graf so posamezne točke \((n, a_n)\).</p>
<p>Podamo ga s <strong>splošnim členom</strong>, npr. \(a_n = \frac{1}{n}\), ali <strong>rekurzivno</strong> z začetnim členom in pravilom, npr. \(a_1 = 1\), \(a_{n+1} = 2a_n + 1\), ali z naštevanjem nekaj členov, ko je pravilo očitno.</p>`,
    ],
    [
      "Kdaj je zaporedje naraščajoče, padajoče, omejeno? Kako to preveriš?",
      R`<p>Naraščajoče: \(a_{n+1} &gt; a_n\) za vse \(n\) (preverimo predznak \(a_{n+1} - a_n\) ali, za pozitivne člene, \(\frac{a_{n+1}}{a_n} &gt; 1\)); padajoče obratno.</p>
<p>Navzgor omejeno: obstaja \(M\), da je \(a_n \le M\) za vse \(n\); navzdol omejeno z \(m\); omejeno, če je oboje. Primer: \(a_n = \frac{n}{n + 1}\) narašča in je omejeno (\(\frac{1}{2} \le a_n &lt; 1\)).</p>`,
    ],
    [
      "Definiraj aritmetično zaporedje. Zapiši splošni člen in izpelji formulo za vsoto prvih n členov.",
      R`<p>Razlika zaporednih členov je stalna: \(a_{n+1} - a_n = d\). Splošni člen \(a_n = a_1 + (n - 1)d\).</p>
<p>Vsoto \(s_n\) zapišemo naprej in nazaj ter seštejemo: vsak par da \(a_1 + a_n\), parov je \(n\), torej \(2s_n = n(a_1 + a_n)\) in \[s_n = \frac{n}{2}(a_1 + a_n) = \frac{n}{2}\left(2a_1 + (n - 1)d\right).\]</p>`,
    ],
    [
      "Definiraj geometrijsko zaporedje. Zapiši splošni člen in vsoto prvih n členov.",
      R`<p>Količnik zaporednih členov je stalen: \(\frac{a_{n+1}}{a_n} = q\), \(a_1 \neq 0\), \(q \neq 0\). Splošni člen \(a_n = a_1 q^{n-1}\).</p>
<p>\[s_n = a_1 \frac{q^n - 1}{q - 1} \quad (q \neq 1), \qquad s_n = n a_1 \quad (q = 1).\] Izpeljava: od \(q s_n\) odštejemo \(s_n\), skoraj vsi členi se odštejejo.</p>`,
    ],
    [
      "Kaj sta aritmetična in geometrijska sredina? Kako sta povezani z zaporedji?",
      R`<p>Aritmetična sredina števil \(a, b\) je \(\frac{a + b}{2}\), geometrijska (za \(a, b &gt; 0\)) \(\sqrt{ab}\). Velja \(\sqrt{ab} \le \frac{a + b}{2}\).</p>
<p>V aritmetičnem zaporedju je vsak člen aritmetična sredina sosedov: \(a_n = \frac{a_{n-1} + a_{n+1}}{2}\); v geometrijskem s pozitivnimi členi geometrijska: \(a_n^2 = a_{n-1} a_{n+1}\). Tako preverimo, ali so trije členi zaporedni.</p>`,
    ],
    [
      "Kaj je limita zaporedja? Kdaj je zaporedje konvergentno in kdaj divergentno?",
      R`<p>Število \(L\) je limita zaporedja, če so za vsak \(\varepsilon &gt; 0\) od nekega člena naprej vsi členi v okolici \((L - \varepsilon, L + \varepsilon)\). Pišemo \(\lim_{n \to \infty} a_n = L\); zaporedje je konvergentno.</p>
<p>Zaporedje brez limite je divergentno (npr. \(a_n = n\) ali \(a_n = (-1)^n\)). Primeri: \(\lim \frac{1}{n} = 0\), \(\lim q^n = 0\) za \(|q| &lt; 1\). Monotono in omejeno zaporedje je konvergentno.</p>`,
    ],
    [
      "Kaj je geometrijska vrsta? Kdaj konvergira in kolikšna je njena vsota?",
      R`<p>Geometrijska vrsta je \(a_1 + a_1 q + a_1 q^2 + \dots\); njena vsota je limita delnih vsot \(s_n\).</p>
<p>Konvergira natanko tedaj, ko je \(|q| &lt; 1\) (takrat \(q^n \to 0\)): \[s = \frac{a_1}{1 - q}.\] Primer: \(1 + \frac{1}{2} + \frac{1}{4} + \dots = 2\); tudi \(0{,}\overline{3} = \frac{3}{10} + \frac{3}{100} + \dots = \frac{1}{3}\).</p>`,
    ],
    [
      "Pojasni navadno in obrestno obrestovanje. Kako sta povezana z zaporedji?",
      R`<p>Pri <strong>navadnem</strong> obrestovanju se obresti računajo vedno od začetne glavnice: \(G_n = G_0\left(1 + \frac{np}{100}\right)\) (aritmetično zaporedje).</p>
<p>Pri <strong>obrestnem</strong> se obresti pripišejo glavnici in se naprej obrestujejo: \(G_n = G_0 r^n\), \(r = 1 + \frac{p}{100}\) (geometrijsko zaporedje). Pri rednih vplačilih vsoto izračunamo s formulo za vsoto geometrijskega zaporedja.</p>`,
    ],
    [
      "Kako je definirano število e?",
      R`<p>\[e = \lim_{n \to \infty}\left(1 + \frac{1}{n}\right)^n \approx 2{,}718.\] Zaporedje \(\left(1 + \frac{1}{n}\right)^n\) je naraščajoče in navzgor omejeno, zato konvergira.</p>
<p>\(e\) je iracionalno število in osnova naravnega logaritma; funkcija \(e^x\) je edina eksponentna funkcija, ki je enaka svojemu odvodu.</p>`,
      "visja",
    ],
  ],

  diferencialni_racun: [
    [
      "Kaj je limita funkcije v točki? Kdaj je funkcija zvezna?",
      R`<p>\(\lim_{x \to a} f(x) = L\), če so vrednosti \(f(x)\) poljubno blizu \(L\), ko je \(x\) dovolj blizu \(a\) (\(x \neq a\)). Pomembni limiti: \(\lim_{x \to 0}\frac{\sin x}{x} = 1\), \(\lim_{x \to \infty}\left(1 + \frac{1}{x}\right)^x = e\).</p>
<p>Funkcija je zvezna v \(a\), če je \(\lim_{x \to a} f(x) = f(a)\) (graf se tam ne pretrga). Elementarne funkcije so zvezne na svojem definicijskem območju. Zvezna funkcija na \([a, b]\) zavzame vse vrednosti med \(f(a)\) in \(f(b)\).</p>`,
    ],
    [
      "Definiraj odvod funkcije v točki. Kakšen je njegov geometrijski pomen?",
      R`<p>\[f'(x_0) = \lim_{h \to 0}\frac{f(x_0 + h) - f(x_0)}{h},\] to je limita diferenčnega kvocienta (smernega koeficienta sekante skozi \((x_0, f(x_0))\) in \((x_0 + h, f(x_0 + h))\)).</p>
<p>Geometrijsko je \(f'(x_0)\) smerni koeficient tangente na graf v točki \((x_0, f(x_0))\), torej hitrost spreminjanja funkcije. Funkcija, ki je odvedljiva, je zvezna (obratno ne velja: \(|x|\) v 0).</p>`,
    ],
    [
      "Zapiši odvode elementarnih funkcij.",
      R`<p>\[(c)' = 0, \quad (x^n)' = n x^{n-1}, \quad (e^x)' = e^x, \quad (a^x)' = a^x \ln a, \quad (\ln x)' = \frac{1}{x}, \quad (\log_a x)' = \frac{1}{x \ln a},\]
\[(\sin x)' = \cos x, \quad (\cos x)' = -\sin x, \quad (\tan x)' = \frac{1}{\cos^2 x}, \quad (\sqrt{x})' = \frac{1}{2\sqrt{x}}.\]</p>`,
    ],
    [
      "Zapiši pravila za odvajanje vsote, produkta, kvocienta in sestavljene funkcije.",
      R`<p>\[(f \pm g)' = f' \pm g', \quad (cf)' = c f', \quad (fg)' = f'g + fg', \quad \left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2},\]
\[\left(f(g(x))\right)' = f'(g(x)) \cdot g'(x) \quad \text{(verižno pravilo).}\]</p>
<p>Primer: \(\left(\sin(3x^2)\right)' = \cos(3x^2) \cdot 6x\).</p>`,
    ],
    [
      "Kako zapišemo enačbo tangente na graf funkcije? Kako izračunamo kot med krivuljama?",
      R`<p>Tangenta v točki \((x_0, f(x_0))\): \(y - f(x_0) = f'(x_0)(x - x_0)\). Normala je pravokotna na tangento: \(k_n = -\frac{1}{f'(x_0)}\).</p>
<p>Kot med krivuljama v presečišču je kot med njunima tangentama: \(\tan\varphi = \left|\frac{k_2 - k_1}{1 + k_1 k_2}\right|\), kjer sta \(k_1 = f'(x_0)\), \(k_2 = g'(x_0)\).</p>`,
    ],
    [
      "Kakšna je zveza med predznakom odvoda in naraščanjem funkcije? Kaj so stacionarne točke?",
      R`<p>Če je \(f'(x) &gt; 0\) na intervalu, funkcija tam narašča; če je \(f'(x) &lt; 0\), pada.</p>
<p>Stacionarne točke so točke, kjer je \(f'(x_0) = 0\) (tangenta je vodoravna). V njih je lahko lokalni ekstrem ali pa ne (npr. \(x^3\) v 0, kjer je vodoravni prevoj).</p>`,
    ],
    [
      "Kaj so lokalni ekstremi? Kako jih poiščemo in kako ugotovimo njihovo vrsto?",
      R`<p>\(f\) ima v \(x_0\) lokalni maksimum (minimum), če je \(f(x_0)\) največja (najmanjša) vrednost v neki okolici \(x_0\). Če je \(f\) odvedljiva, je ekstrem v stacionarni točki: \(f'(x_0) = 0\).</p>
<p>Vrsta: če \(f'\) pri prehodu čez \(x_0\) spremeni predznak iz \(+\) v \(-\), je maksimum, iz \(-\) v \(+\) minimum; brez spremembe ekstrema ni. Ali z drugim odvodom: \(f''(x_0) &lt; 0\) maksimum, \(f''(x_0) &gt; 0\) minimum. Globalni ekstrem na \([a, b]\) iščemo še v krajiščih.</p>`,
    ],
    [
      "Kaj pove drugi odvod? Kdaj je funkcija konveksna oziroma konkavna in kaj je prevoj?",
      R`<p>Če je \(f''(x) &gt; 0\), je funkcija konveksna (graf je »odprt navzgor«, tangente so pod grafom); če je \(f''(x) &lt; 0\), je konkavna.</p>
<p>Prevoj je točka, v kateri se konveksnost spremeni v konkavnost ali obratno; tam je \(f''(x_0) = 0\) in \(f''\) spremeni predznak. Primer: \(f(x) = x^3\) ima prevoj v 0.</p>`,
    ],
    [
      "Opiši postopek, s katerim analiziraš funkcijo in narišeš njen graf.",
      R`<ol><li>definicijsko območje, sodost/lihost, periodičnost,</li>
<li>ničle in presečišče z osjo \(y\), predznak,</li>
<li>poli, asimptote, obnašanje na robu definicijskega območja,</li>
<li>prvi odvod: stacionarne točke, intervali naraščanja in padanja, ekstremi,</li>
<li>po potrebi drugi odvod: konveksnost, prevoji,</li>
<li>tabela vrednosti in skica grafa.</li></ol>`,
    ],
    [
      "Kako rešujemo ekstremalne (optimizacijske) probleme?",
      R`<p>Količino, ki jo želimo maksimirati ali minimirati, zapišemo kot funkcijo ene spremenljivke (z danimi pogoji izločimo ostale) in določimo smiselni interval spremenljivke.</p>
<p>Funkcijo odvajamo, poiščemo stacionarne točke in preverimo, da gre res za maksimum oziroma minimum (tudi primerjava s krajišči). Primer: med pravokotniki z obsegom \(o\) ima največjo ploščino kvadrat.</p>`,
    ],
    [
      "Kakšen je fizikalni pomen odvoda?",
      R`<p>Odvod je trenutna hitrost spreminjanja količine. Če je \(s(t)\) pot v odvisnosti od časa, je \(v(t) = s'(t)\) trenutna hitrost in \(a(t) = v'(t) = s''(t)\) pospešek.</p>
<p>Podobno je npr. jakost toka odvod naboja po času. Povprečna hitrost na intervalu je diferenčni kvocient, trenutna je njegova limita.</p>`,
    ],
  ],

  integralski_racun: [
    [
      "Kaj je nedoločeni integral? Kaj je primitivna funkcija?",
      R`<p>\(F\) je primitivna funkcija funkcije \(f\), če je \(F'(x) = f(x)\). Dve primitivni funkciji se razlikujeta za konstanto.</p>
<p>Nedoločeni integral je množica vseh primitivnih funkcij: \(\int f(x)\,dx = F(x) + C\). Integriranje je obratna operacija odvajanja; rezultat preverimo z odvajanjem.</p>`,
    ],
    [
      "Zapiši osnovne integrale in lastnosti nedoločenega integrala.",
      R`<p>\[\int x^n\,dx = \frac{x^{n+1}}{n + 1} + C\ (n \neq -1), \quad \int\frac{dx}{x} = \ln|x| + C, \quad \int e^x\,dx = e^x + C, \quad \int a^x\,dx = \frac{a^x}{\ln a} + C,\]
\[\int\sin x\,dx = -\cos x + C, \quad \int\cos x\,dx = \sin x + C, \quad \int\frac{dx}{\cos^2 x} = \tan x + C.\]</p>
<p>Linearnost: \(\int(af + bg)\,dx = a\int f\,dx + b\int g\,dx\). Integral produkta ni produkt integralov.</p>`,
    ],
    [
      "Opiši integracijo z uvedbo nove spremenljivke in jo pokaži na primeru.",
      R`<p>Če je v integralu sestavljena funkcija in odvod notranje funkcije, uvedemo \(t = g(x)\), \(dt = g'(x)\,dx\): \(\int f(g(x)) g'(x)\,dx = \int f(t)\,dt\). Na koncu se vrnemo k \(x\).</p>
<p>Primer: \(\int 2x\cos(x^2)\,dx\), \(t = x^2\), \(dt = 2x\,dx\): \(\int\cos t\,dt = \sin t + C = \sin(x^2) + C\). Pri določenem integralu spremenimo tudi meje.</p>`,
    ],
    [
      "Opiši integracijo po delih (per partes) in jo pokaži na primeru.",
      R`<p>Iz pravila za odvod produkta sledi \[\int u\,dv = uv - \int v\,du.\] Za \(u\) izberemo del, ki se z odvajanjem poenostavi, \(dv\) pa znamo integrirati.</p>
<p>Primer: \(\int x e^x\,dx\): \(u = x\), \(dv = e^x\,dx\), \(du = dx\), \(v = e^x\). Dobimo \(x e^x - \int e^x\,dx = (x - 1)e^x + C\).</p>`,
      "visja",
    ],
    [
      "Kaj je določeni integral? Kakšen je njegov geometrijski pomen?",
      R`<p>Interval \([a, b]\) razdelimo na majhne dele, na vsakem izberemo točko \(\xi_i\) in tvorimo vsoto \(\sum f(\xi_i)\Delta x_i\). Določeni integral \(\int_a^b f(x)\,dx\) je limita teh vsot, ko gredo dolžine delov proti 0.</p>
<p>Za \(f \ge 0\) je to ploščina lika med grafom, osjo \(x\) in premicama \(x = a\), \(x = b\). Deli pod osjo \(x\) prispevajo negativno.</p>`,
    ],
    [
      "Zapiši Newton-Leibnizovo formulo in naštej lastnosti določenega integrala.",
      R`<p>Če je \(F\) primitivna funkcija zvezne funkcije \(f\): \[\int_a^b f(x)\,dx = F(b) - F(a).\]</p>
<p>Lastnosti: \(\int_a^a f\,dx = 0\), \(\int_a^b f\,dx = -\int_b^a f\,dx\), \(\int_a^b f\,dx + \int_b^c f\,dx = \int_a^c f\,dx\), linearnost; za liho funkcijo \(\int_{-a}^a f\,dx = 0\).</p>`,
    ],
    [
      "Kako izračunamo ploščino lika pod osjo x in ploščino med dvema krivuljama?",
      R`<p>Če je \(f \le 0\) na \([a, b]\), je ploščina \(S = \left|\int_a^b f(x)\,dx\right|\). Če funkcija menja predznak, integral razdelimo pri ničlah in seštejemo absolutne vrednosti.</p>
<p>Med krivuljama, kjer je \(f(x) \ge g(x)\) na \([a, b]\): \[S = \int_a^b \left(f(x) - g(x)\right)dx.\] Meje so pogosto abscise presečišč krivulj.</p>`,
    ],
    [
      "Kako izračunamo prostornino vrtenine?",
      R`<p>Pri vrtenju grafa \(y = f(x)\), \(x \in [a, b]\), okoli osi \(x\) nastane vrtenina s prostornino \[V = \pi\int_a^b f(x)^2\,dx,\] saj je prečni prerez krog s polmerom \(f(x)\).</p>
<p>Primer: vrtenje \(y = \sqrt{r^2 - x^2}\) na \([-r, r]\) da kroglo: \(V = \pi\int_{-r}^{r}(r^2 - x^2)\,dx = \frac{4\pi r^3}{3}\).</p>`,
      "visja",
    ],
  ],

  kombinatorika: [
    [
      "Zapiši osnovni izrek kombinatorike (pravilo produkta) in pravilo vsote.",
      R`<p><strong>Pravilo produkta:</strong> če izbiro opravimo v \(k\) zaporednih korakih in imamo v \(i\)-tem koraku \(n_i\) možnosti (neodvisno od prejšnjih izbir), je vseh izidov \(n_1 \cdot n_2 \cdots n_k\). Ponazorimo ga s kombinatoričnim drevesom.</p>
<p><strong>Pravilo vsote:</strong> če se izbira razdeli na disjunktne primere z \(m\) in \(n\) možnostmi, je vseh \(m + n\).</p>`,
    ],
    [
      "Kaj so permutacije brez ponavljanja? Koliko jih je? Koliko je 0!?",
      R`<p>Permutacija je razvrstitev \(n\) različnih elementov v vrsto (vrstni red je pomemben, uporabimo vse). Število: \(P_n = n! = n(n - 1)\cdots 2 \cdot 1\).</p>
<p>Po dogovoru \(0! = 1\). Primer: 5 ljudi se lahko postavi v vrsto na \(5! = 120\) načinov; za okroglo mizo je razporedov \((n - 1)!\).</p>`,
    ],
    [
      "Kaj so permutacije s ponavljanjem? Koliko jih je?",
      R`<p>Razvrščamo \(n\) elementov, med katerimi so nekateri enaki: \(k_1\) enakih prve vrste, \(k_2\) druge … (\(k_1 + k_2 + \dots = n\)):</p>
<p>\[P_n^{k_1, k_2, \dots} = \frac{n!}{k_1!\,k_2!\cdots}.\] Primer: besedo MAMA lahko premešamo na \(\frac{4!}{2!\,2!} = 6\) načinov.</p>`,
    ],
    [
      "Kaj so variacije brez ponavljanja in s ponavljanjem? Koliko jih je?",
      R`<p>Variacija \(r\)-tega reda je urejena izbira \(r\) elementov iz \(n\) (vrstni red je pomemben).</p>
<p>Brez ponavljanja: \(V_n^r = n(n - 1)\cdots(n - r + 1) = \frac{n!}{(n - r)!}\) (npr. prva tri mesta med 10 tekmovalci: \(720\)). S ponavljanjem: \({}^{(p)}V_n^r = n^r\) (npr. štirimestna PIN koda: \(10^4\)).</p>`,
    ],
    [
      "Kaj so kombinacije? Kaj je binomski simbol in katere so njegove lastnosti?",
      R`<p>Kombinacija \(r\)-tega reda je izbira \(r\) elementov iz \(n\), pri kateri vrstni red ni pomemben (podmnožica): \[C_n^r = \binom{n}{r} = \frac{n!}{r!\,(n - r)!} = \frac{V_n^r}{r!}.\]</p>
<p>Lastnosti: \(\binom{n}{0} = \binom{n}{n} = 1\), \(\binom{n}{r} = \binom{n}{n - r}\), \(\binom{n}{r} + \binom{n}{r + 1} = \binom{n + 1}{r + 1}\), \(\sum_r \binom{n}{r} = 2^n\).</p>`,
    ],
    [
      "Opiši Pascalov trikotnik in zapiši binomski izrek.",
      R`<p>V Pascalovem trikotniku so na robovih enice, vsako notranje število je vsota dveh nad njim; \(n\)-ta vrstica vsebuje \(\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n}\).</p>
<p>\[(a + b)^n = \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k.\] Primer: \((a + b)^4 = a^4 + 4a^3 b + 6a^2 b^2 + 4ab^3 + b^4\). Splošni (\(k + 1\)-vi) člen je \(\binom{n}{k}a^{n-k}b^k\).</p>`,
    ],
    [
      "Kako pri nalogi ugotoviš, ali gre za permutacije, variacije ali kombinacije?",
      R`<ul><li>Ali uporabimo <strong>vse</strong> elemente? Da: permutacije (z enakimi elementi s ponavljanjem).</li>
<li>Izberemo le del: ali je <strong>vrstni red pomemben</strong>? Da: variacije, ne: kombinacije.</li>
<li>Ali se element lahko <strong>ponovi</strong>? Da: variacije s ponavljanjem (\(n^r\)).</li></ul>
<p>Primer: odbor treh iz razreda (kombinacije), predsednik, tajnik in blagajnik (variacije).</p>`,
    ],
  ],

  verjetnostni_racun: [
    [
      "Pojasni pojme poskus, izid, dogodek. Kaj so gotov, nemogoč, nasprotni in nezdružljivi dogodki?",
      R`<p>Poskus je dejanje, ki ga lahko ponavljamo pod enakimi pogoji, a izida ne moremo napovedati. Izidi tvorijo vzorčni prostor; dogodek je podmnožica izidov.</p>
<p>Gotov dogodek \(G\) se zgodi vedno, nemogoč \(N\) nikoli. Nasprotni dogodek \(\bar A\) se zgodi, ko se \(A\) ne zgodi. Dogodka sta nezdružljiva, če se ne moreta zgoditi hkrati (\(AB = N\)). Vsota \(A + B\): zgodi se vsaj eden; produkt \(AB\): zgodita se oba.</p>`,
    ],
    [
      "Zapiši klasično definicijo verjetnosti. Kdaj jo lahko uporabimo?",
      R`<p>\[P(A) = \frac{\text{število ugodnih izidov}}{\text{število vseh izidov}}.\]</p>
<p>Uporabimo jo, ko je izidov končno mnogo in so vsi <strong>enako verjetni</strong> (pošten kovanec, kocka, naključno izbiranje). Velja \(0 \le P(A) \le 1\), \(P(G) = 1\), \(P(N) = 0\).</p>`,
    ],
    [
      "Kaj je statistična definicija verjetnosti?",
      R`<p>Poskus ponovimo \(n\)-krat in štejemo, kolikokrat se zgodi \(A\) (frekvenca \(f\)). Relativna frekvenca \(\frac{f}{n}\) se pri velikem številu ponovitev ustali okoli števila, ki ga imenujemo verjetnost dogodka \(A\).</p>
<p>Uporabimo jo, ko izidi niso enako verjetni ali jih ne znamo prešteti (npr. verjetnost, da žebljiček pade na glavico).</p>`,
    ],
    [
      "Kako izračunamo verjetnost vsote dogodkov in verjetnost nasprotnega dogodka?",
      R`<p>\[P(A + B) = P(A) + P(B) - P(AB).\] Za nezdružljiva dogodka \(P(A + B) = P(A) + P(B)\).</p>
<p>\(P(\bar A) = 1 - P(A)\). To je uporabno pri »vsaj eden«: verjetnost, da pri treh metih kocke vsaj enkrat pade šestica, je \(1 - \left(\frac{5}{6}\right)^3\).</p>`,
    ],
    [
      "Kaj je pogojna verjetnost?",
      R`<p>Verjetnost dogodka \(A\), če vemo, da se je zgodil \(B\) (\(P(B) &gt; 0\)): \[P(A \mid B) = \frac{P(AB)}{P(B)}.\]</p>
<p>Iz tega sledi \(P(AB) = P(B) \cdot P(A \mid B)\), kar uporabljamo pri zaporednih poskusih in v verjetnostnem drevesu (verjetnosti vzdolž veje množimo).</p>`,
    ],
    [
      "Kdaj sta dogodka neodvisna? Navedi primer.",
      R`<p>\(A\) in \(B\) sta neodvisna, če uresničitev enega ne vpliva na verjetnost drugega: \(P(A \mid B) = P(A)\), enakovredno \[P(AB) = P(A) \cdot P(B).\]</p>
<p>Primer: zaporedna meta kovanca. Izbiranje kroglic brez vračanja da odvisne dogodke, z vračanjem neodvisne. Nezdružljiva dogodka s pozitivno verjetnostjo nista neodvisna.</p>`,
    ],
    [
      "Kaj je Bernoullijevo zaporedje poskusov? Zapiši formulo.",
      R`<p>Poskus \(n\)-krat neodvisno ponovimo; vsakič se dogodek \(A\) zgodi z isto verjetnostjo \(p\). Verjetnost, da se zgodi natanko \(k\)-krat: \[P_n(k) = \binom{n}{k}p^k(1 - p)^{n - k}.\]</p>
<p>\(\binom{n}{k}\) šteje, na katerih \(k\) mestih se \(A\) zgodi. Primer: verjetnost natanko dveh šestic v petih metih je \(\binom{5}{2}\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^3\).</p>`,
    ],
    [
      "Kaj pove formula o popolni verjetnosti?",
      R`<p>Če so dogodki \(H_1, \dots, H_n\) (hipoteze) paroma nezdružljivi in skupaj tvorijo gotov dogodek, je \[P(A) = \sum_{i=1}^{n} P(H_i)\,P(A \mid H_i).\]</p>
<p>V verjetnostnem drevesu to pomeni: seštejemo verjetnosti vseh vej, ki se končajo z \(A\). Primer: izdelke izdelujeta dva stroja z različnim deležem napak; verjetnost, da je naključni izdelek pokvarjen.</p>`,
      "visja",
    ],
  ],

  statistika: [
    [
      "Pojasni pojme populacija, vzorec, statistična enota in statistična spremenljivka.",
      R`<p>Populacija je množica vseh enot, ki jih proučujemo; vzorec je izbrana podmnožica populacije (naj bo reprezentativen, izbran naključno). Statistična enota je posamezni element (npr. dijak).</p>
<p>Statistična spremenljivka je lastnost, ki jo merimo: <strong>številska</strong> (višina, ocena; diskretna ali zvezna) ali <strong>opisna</strong> (barva oči, kraj; urejena ali neurejena).</p>`,
    ],
    [
      "Kaj so frekvenca, relativna frekvenca in kumulativna frekvenca? Kako uredimo podatke v razrede?",
      R`<p>Frekvenca \(f_i\) pove, kolikokrat se vrednost pojavi; relativna frekvenca \(f_i' = \frac{f_i}{n}\) (pogosto v %); vsota relativnih frekvenc je 1. Kumulativna frekvenca je vsota frekvenc do vključno te vrednosti.</p>
<p>Pri veliko različnih vrednostih podatke združimo v razrede enake širine (npr. \([150, 160)\)); predstavnik razreda je njegova sredina.</p>`,
    ],
    [
      "Naštej grafične prikaze podatkov. Kdaj uporabimo katerega?",
      R`<ul><li><strong>Stolpčni</strong> (stolpčni diagram): primerjava frekvenc kategorij ali diskretnih vrednosti.</li>
<li><strong>Histogram:</strong> zvezni podatki v razredih; stolpci se stikajo.</li>
<li><strong>Tortni (strukturni krog):</strong> deleži celote; središčni kot \(\alpha_i = f_i' \cdot 360^\circ\).</li>
<li><strong>Linijski diagram:</strong> spreminjanje skozi čas.</li>
<li><strong>Škatla z brki:</strong> razpršenost in kvartili.</li></ul>`,
    ],
    [
      "Definiraj aritmetično sredino, mediano in modus.",
      R`<p><strong>Aritmetična sredina</strong> \(\bar x = \frac{x_1 + \dots + x_n}{n}\); pri frekvenčni tabeli \(\bar x = \frac{\sum f_i x_i}{n}\).</p>
<p><strong>Mediana</strong> je srednja vrednost urejenih podatkov (pri sodem \(n\) povprečje srednjih dveh); nanjo osamelci ne vplivajo. <strong>Modus</strong> je najpogostejša vrednost (lahko jih je več); uporaben tudi pri opisnih spremenljivkah.</p>`,
    ],
    [
      "Katere mere razpršenosti poznaš? Definiraj standardni odklon.",
      R`<p>Variacijski razmik \(x_{max} - x_{min}\), medkvartilni razmik \(Q_3 - Q_1\), varianca in standardni odklon.</p>
<p>\[\sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar x)^2, \qquad \sigma = \sqrt{\sigma^2}.\] Standardni odklon pove, koliko podatki v povprečju odstopajo od aritmetične sredine; ima isto enoto kot podatki.</p>`,
    ],
    [
      "Kaj so kvartili? Kako narišemo škatlo z brki in kaj iz nje razberemo?",
      R`<p>Kvartili razdelijo urejene podatke na četrtine: \(Q_1\) (spodnji kvartil), \(Q_2\) (mediana), \(Q_3\) (zgornji kvartil).</p>
<p>Škatla z brki: škatla od \(Q_1\) do \(Q_3\) s črto pri mediani, brka segata do najmanjše in največje vrednosti. V škatli je srednjih 50 % podatkov; dolžina škatle (medkvartilni razmik) pove razpršenost, položaj mediane pa simetričnost.</p>`,
    ],
    [
      "Kako se spremenita aritmetična sredina in standardni odklon, če vsem podatkom prištejemo isto število ali jih pomnožimo z istim številom?",
      R`<p>Če vsem podatkom prištejemo \(c\): \(\bar x\) se poveča za \(c\), \(\sigma\) se ne spremeni (razpršenost ostane ista).</p>
<p>Če vse podatke pomnožimo s \(k\): \(\bar x\) se pomnoži s \(k\), \(\sigma\) z \(|k|\) (varianca s \(k^2\)).</p>`,
    ],
    [
      "Kdaj je za opis podatkov primernejša mediana kot aritmetična sredina?",
      R`<p>Ko so med podatki osamelci (izrazito velike ali majhne vrednosti) ali je porazdelitev močno nesimetrična, npr. plače: nekaj zelo visokih plač dvigne povprečje, mediana pa ostane blizu »tipične« vrednosti.</p>
<p>Pri simetrični porazdelitvi sta mediana in aritmetična sredina približno enaki.</p>`,
    ],
  ],
};
