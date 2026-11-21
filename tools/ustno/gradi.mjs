// tools/ustno/gradi.mjs — zgradi stran »Opis slike in pogovor po temah« iz tools/ustno/anglescina.mjs.
//   node tools/ustno/gradi.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import teme from "./anglescina.mjs";

const ST = 17;
const koren = new URL("../../", import.meta.url);
const E = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const en = (s) => `<em lang="en">${E(s)}</em>`;
const BES = "/views/anglescina/snov/besedisce/besedisce_razlaga.html";

// Splošni del: metoda in fraze.
const FRAZE = [
  ["Kje na sliki", ["In the foreground / background there is…", "On the left / right (of the picture)…", "In the middle / centre…", "In the top left-hand corner…", "Next to / behind / in front of the…"]],
  ["Kdo in kaj dela", ["The picture shows…", "A young woman is holding / carrying…", "They are wearing…", "Some people are -ing, while others…", "It looks like a… (+ samostalnik)"]],
  ["Ugibanje (vedno ugibaj!)", ["They seem to be… / She appears to be…", "It looks as if they have just…", "He might / could be… · They must be… (prepričan)", "Judging by the…, it's probably…", "I guess / I suppose / I'd say that…"]],
  ["Povezava s temo", ["The picture is connected to / is about…", "It makes me think about… / It reminds me of…", "This raises the question of whether…", "This is a typical situation in many…"]],
  ["Mnenje in tehtanje", ["In my opinion / As far as I'm concerned…", "I (partly) agree / disagree with the statement, because…", "On the one hand…, on the other hand…", "It's true that…, but…", "So, all in all, I'd say that…"]],
];
const POMOC = [
  ["Ko potrebuješ čas", ["That's an interesting question. Let me think…", "Well, I've never really thought about it, but…", "It's hard to say, but I suppose…"]],
  ["Ko ne razumeš vprašanja", ["Sorry, could you repeat the question, please?", "Do you mean…?", "Sorry, I'm not sure I understand. Could you rephrase that?"]],
  ["Ko ne poznaš besede (opiši jo!)", ["It's a kind of… / It's something you use for…", "It's the person who… / the place where…", "I don't know the exact word, but it's like a…"]],
  ["Ko se ne strinjaš z izpraševalcem", ["I see your point, but…", "I'm not sure I agree. In my experience…", "That may be true for some people, but…"]],
  ["Ko podaljšaš odgovor", ["For example, … / For instance, last summer…", "What I mean is…", "Another reason is that…", "That's why I think…"]],
];
const seznam = (xs) => `<ul>${xs.map((x) => `<li>${en(x)}</li>`).join("")}</ul>`;
const tabelaFraz = (sk) => `<div class="tabela-wrap"><table class="tabela"><thead><tr><th>Namen</th><th>Fraze</th></tr></thead><tbody>
${sk.map(([k, f]) => `              <tr><td>${k}</td><td>${f.map(en).join("<br>")}</td></tr>`).join("\n")}
            </tbody></table></div>`;

const t0 = teme[0];
const sklop1 = `        <!-- SKLOP 1 -->
        <section class="sklop" id="sklop-1">
          <header class="sklop-header">
            <span class="sklop-num">${ST} · 1</span>
            <h2>Kako opišeš sliko</h2>
            <p>Štirje koraki, ki jih uporabiš pri vsaki sliki.</p>
          </header>
          <div class="sklop-teorija">
            <h3>Razlaga</h3>
            <p>Pri prvi nalogi ustnega izpita dobiš fotografijo in kratko poved ali vprašanje. Slika je le izhodišče za pogovor: komisija ne ocenjuje, kako natančno našteješ predmete, ampak ali znaš o prizoru govoriti, ugibati, ga povezati s temo in povedati svoje mnenje. Opis naj traja približno eno minuto (8 do 12 povedi), potem sledijo vprašanja.</p>
            <ol>
              <li><strong>Opiši</strong> (2–3 povedi): kje je prizor, kdo je na sliki in kaj počne. Uporabljaj <em>present continuous</em>: ${en("A girl is drawing.")}</li>
              <li><strong>Ugibaj</strong> (2 povedi): kaj se je zgodilo prej, kako se ljudje počutijo, kdo so. Uporabi ${en("seem, might, must, looks as if")}. To loči oceno 3 od ocene 5.</li>
              <li><strong>Poveži s temo</strong> (1 poved): ${en("The picture is about…")} Tako preideš od slike k iztočnici.</li>
              <li><strong>Mnenje</strong> (3–4 povedi): odgovori na iztočnico, navedi razlog in primer iz svojega življenja, lahko tudi drugo plat.</li>
            </ol>
            <div class="pazi"><strong>Pazi:</strong> ne naštevaj (<em>There is a tree. There is a dog. There is a car.</em>). Izberi tri ali štiri stvari, ki so pomembne za temo, in jih poveži v povedi z <em>and, while, so, because</em>.</div>
            <h4>Fraze po korakih</h4>
            ${tabelaFraz(FRAZE)}
            <p>Besede za posamezna področja so na strani <a href="${BES}">Besedišče za maturo</a>; v vsaki temi spodaj je povezava na pravi sklop.</p>
          </div>
          <div class="sklop-naloge">
            <h3>Tipi nalog v tem sklopu</h3>

            <div class="tip-naloge" id="tip-1">
              <h4>Tip 1: Slikovna iztočnica</h4>
              <div class="tip-naloga"><span class="tip-naloga-oznaka">Naloga</span><p>${en("Look at the photograph. You will be expected to make some comments. It will also serve as a basis for discussion with the examiner.")}</p><p>Na sliki: ${E(t0.slika)} Ob sliki piše: ${en(t0.iztocnica)}</p></div>
              <div class="prepoznaj"><p><strong>Kako prepoznaš:</strong> na listku je fotografija in ena poved ali vprašanje. Poved je pogosto trditev, s katero se lahko strinjaš ali ne.</p><ul class="kljucne"><li>„Look at the photograph“</li><li>„make some comments“</li><li>„basis for discussion“</li></ul></div>
              <h5>Univerzalni postopek</h5><ol class="postopek">
              <li><p class="korak">Med pripravo (15 minut za ves listek) si zapiši 5 do 8 ključnih besed za sliko in eno stališče do iztočnice. Ne piši celih povedi.</p><div class="na-nalogi"><p>${en("park, guitar, sketchbook, phone; relaxed, friends after school; screens vs hobbies → both")}</p></div></li>
              <li><p class="korak">Opiši: kraj, ljudje, dejanja.</p><div class="na-nalogi"><p>${en("The picture shows a group of teenagers sitting on the grass in a park. In the foreground two boys are playing the guitar…")}</p></div></li>
              <li><p class="korak">Ugibaj o tem, česar na sliki ne vidiš.</p><div class="na-nalogi"><p>${en("It looks like a warm summer afternoon… I think they might be friends who got together after school.")}</p></div></li>
              <li><p class="korak">Poveži s temo in odgovori na iztočnico z razlogom in primerom.</p><div class="na-nalogi"><p>${en("In my opinion, most teenagers enjoy both: we use phones to keep in touch, but we also need hobbies…")}</p></div></li>
              </ol>
              <h5>Še nekaj primerov</h5>
              <div class="primer"><p><strong>Primer 1:</strong> Slaba začetna poved: ${en("There are people. There is grass. There is a guitar.")}</p><p>Boljša: ${en("A group of friends is relaxing on the grass, and two of them are playing the guitar.")} Ena poved, trije podatki, glagol v <em>present continuous</em>.</p></div>
              <div class="primer"><p><strong>Primer 2:</strong> Ugibanje brez modalnih glagolov: ${en("They are friends.")}</p><p>Z ugibanjem: ${en("They must be good friends, because they look very relaxed together.")}</p></div>
            </div>
          </div>
        </section>`;

const sklop2 = `        <!-- SKLOP 2 -->
        <section class="sklop" id="sklop-2">
          <header class="sklop-header">
            <span class="sklop-num">${ST} · 2</span>
            <h2>Kako odgovarjaš izpraševalcu</h2>
            <p>Pogovor po opisu slike in vodeni pogovor o temi.</p>
          </header>
          <div class="sklop-teorija">
            <h3>Razlaga</h3>
            <p>Po opisu izpraševalec postavi tri do pet vprašanj, ki gredo od slike k tvojemu življenju in nato k splošni temi. Pri merilu <strong>sodelovanje v pogovoru</strong> dobiš točke, če odgovarjaš razvito in sam vodiš pogovor naprej. Odgovor z enim stavkom (<em>Yes, I do.</em>) prinese malo točk, tudi če je pravilen.</p>
            <h4>Pravilo O-R-P: odgovor, razlog, primer</h4>
            <p>Vsak odgovor naj ima tri dele: <strong>odgovor</strong> (${en("Yes, definitely.")}), <strong>razlog</strong> (${en("because it helps me relax")}) in <strong>primer</strong> ali osebno izkušnjo (${en("Last summer, for example…")}). Dve do štiri povedi so dovolj; nato počakaj na naslednje vprašanje.</p>
            <h4>Fraze, ki te rešijo</h4>
            ${tabelaFraz(POMOC)}
            <div class="pazi"><strong>Pazi:</strong> če ne poznaš besede, ne preklopi v slovenščino in ne utihni. Opiši jo (${en("the thing you use to…")}). Opisovanje je jezikovna spretnost, ki jo komisija ceni.</div>
            <h4>Kako se merila poznajo v odgovoru</h4>
            <div class="tabela-wrap"><table class="tabela"><thead><tr><th>Merilo</th><th>Kaj naredi odgovor za 5 točk</th></tr></thead><tbody>
              <tr><td>Sodelovanje v pogovoru</td><td>odgovori razvito, sam doda razlog in primer, se odzove na mnenje izpraševalca</td></tr>
              <tr><td>Besedišče</td><td>uporablja besede teme (${en("peer pressure, carbon footprint")}), ne le ${en("good, bad, nice")}</td></tr>
              <tr><td>Jezikovna pravilnost</td><td>pravilni časi in zgradbe; nekaj napak je dovoljenih, če ne motijo razumevanja</td></tr>
              <tr><td>Gladkost in izgovarjava</td><td>govori tekoče, s kratkimi premori, popravi se sam (${en("sorry, I mean…")})</td></tr>
            </tbody></table></div>
          </div>
          <div class="sklop-naloge">
            <h3>Tipi nalog v tem sklopu</h3>

            <div class="tip-naloge" id="tip-2">
              <h4>Tip 2: Vprašanje izpraševalca</h4>
              <div class="tip-naloga"><span class="tip-naloga-oznaka">Naloga</span><p>${en(t0.vprasanja[1][0])}</p></div>
              <div class="prepoznaj"><p><strong>Kako prepoznaš:</strong> izpraševalec vpraša po tvojih izkušnjah, mnenju ali o splošni temi. Vprašanja z ${en("Do you…? Is it…?")} niso vprašanja z da ali ne, ampak povabilo k razlagi.</p><ul class="kljucne"><li>„What do you think…?“</li><li>„Why…?“</li><li>„Should…?“</li></ul></div>
              <h5>Univerzalni postopek</h5><ol class="postopek">
              <li><p class="korak">Odgovori neposredno v prvi povedi.</p><div class="na-nalogi"><p>${en("Yes, definitely.")}</p></div></li>
              <li><p class="korak">Dodaj razlog z <em>because</em>.</p><div class="na-nalogi"><p>${en("A hobby gives you something to look forward to and teaches you skills that school doesn't…")}</p></div></li>
              <li><p class="korak">Dodaj primer ali osebno izkušnjo.</p><div class="na-nalogi"><p>${en("…for example patience if you play an instrument.")}</p></div></li>
              </ol>
              <h5>Še nekaj primerov</h5>
              <div class="primer"><p><strong>Primer 1:</strong> ${en("Do you like reading?")} Slabo: ${en("Yes.")}</p><p>Dobro: ${en("Yes, I do, especially fantasy, because it takes me to another world. The last book I read was…")}</p></div>
              <div class="primer"><p><strong>Primer 2:</strong> ${en("Should schools ban phones?")} Ne veš, kaj misliš? ${en("It's hard to say. On the one hand…, on the other hand…, so maybe phones should be allowed only during breaks.")}</p></div>
            </div>

            <div class="tip-naloge" id="tip-3">
              <h4>Tip 3: Besedilna iztočnica</h4>
              <div class="tip-naloga"><span class="tip-naloga-oznaka">Naloga</span><p>${en("Read the text. You will not be asked to retell it; it will only serve as a basis for discussion.")}</p><p>Besedilo je kratko pismo bralca, oglas ali odlomek članka, npr. pismo dijaka, ki se pritožuje, da šola prepoveduje telefone.</p></div>
              <div class="prepoznaj"><p><strong>Kako prepoznaš:</strong> namesto slike je na listku kratko besedilo. Navodilo izrecno pove, da ga ne obnavljaš.</p><ul class="kljucne"><li>„Read the text“</li><li>„not be asked to retell it“</li></ul></div>
              <h5>Univerzalni postopek</h5><ol class="postopek">
              <li><p class="korak">Ugotovi, kdo piše, o čem in s kakšnim stališčem.</p><div class="na-nalogi"><p>${en("The writer is a student who thinks the phone ban is unfair.")}</p></div></li>
              <li><p class="korak">V eni povedi povej problem s svojimi besedami (ne beri iz besedila).</p><div class="na-nalogi"><p>${en("The text is about whether schools should ban mobile phones.")}</p></div></li>
              <li><p class="korak">Povej svoje stališče in ga utemelji kot pri sliki.</p><div class="na-nalogi"><p>${en("I partly agree with the writer, because… However…")}</p></div></li>
              </ol>
            </div>
          </div>
        </section>`;

const temaSklop = (t, i) => {
  const n = i + 3;
  return `        <!-- SKLOP ${n} -->
        <section class="sklop" id="sklop-${n}">
          <header class="sklop-header">
            <span class="sklop-num">${ST} · ${n}</span>
            <h2>${E(t.naslov)}</h2>
            <p>Na sliki: ${E(t.slika)}</p>
          </header>
          <div class="sklop-teorija">
            <div class="tip-naloga"><span class="tip-naloga-oznaka">Iztočnica</span><p>${en(t.iztocnica)}</p></div>
            <h4>Ključne besede</h4>
            <div class="tabela-wrap"><table class="tabela"><thead><tr><th>Angleško</th><th>Slovensko</th></tr></thead><tbody>
${t.kljucne.map(([a, b]) => `              <tr><td lang="en"><strong>${E(a)}</strong></td><td>${E(b)}</td></tr>`).join("\n")}
            </tbody></table></div>
            <p>Več besed: <a href="${BES}#sklop-${t.besedisce}">Besedišče, ${E(t.naslov)}</a>.</p>
            <h4>Uporabne povedi za to sliko</h4>
            ${seznam(t.fraze)}
            <h4>Vzorčni opis (približno 1 minuta)</h4>
            <div class="primer"><p lang="en">${E(t.monolog)}</p></div>
            <h4>Vprašanja izpraševalca in vzorčni odgovori</h4>
            <ol>
${t.vprasanja.map(([q, a]) => `              <li><p><strong lang="en">${E(q)}</strong></p><p lang="en">${E(a)}</p></li>`).join("\n")}
            </ol>
            <div class="info-card"><p><span class="badge-vr">Višja raven</span> Tako zveni odgovor ravni C1:</p><p lang="en"><em>${E(t.vr)}</em></p></div>
          </div>
        </section>`;
};

const stran = `<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angleščina: opis slike in pogovor po temah | Učilnica.com</title>
  <meta name="description" content="Ustni izpit iz angleščine: kako opišeš sliko v štirih korakih, fraze za ugibanje in mnenje, pravilo odgovor-razlog-primer ter ${teme.length} tem s ključnimi besedami, vzorčnim opisom in vprašanji izpraševalca.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>
  <link rel="stylesheet" href="/style/snov.css">
</head>
<body>

  <div id="header"></div>

  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">

        <header class="page-header">
          <span class="page-eyebrow">Angleščina · Snov · ${ST}</span>
          <h1>Opis slike in pogovor po temah</h1>
          <p>Pri prvi nalogi ustnega izpita dobiš sliko in eno poved, nato moraš prosto govoriti. Tu je postopek, ki deluje pri vsaki sliki, fraze, ki te rešijo, ko se zatakne, in ${teme.length} tem iz kataloga s ključnimi besedami, vzorčnim opisom in vprašanji, ki jih lahko pričakuješ.</p>
          <div class="page-meta">
            <div class="page-meta-item"><strong>${teme.length}</strong><span>Tem s sliko</span></div>
            <div class="page-meta-item"><strong>${teme.length * 4}</strong><span>Vprašanj z odgovori</span></div>
            <div class="page-meta-item"><strong>~25 min</strong><span>Branja</span></div>
          </div>
        </header>

        <div class="matura-formule">
          <h3>Kar moraš znati</h3>
          <div class="matura-levo">
            <ul>
              <li>opis slike v štirih korakih: opiši, ugibaj, poveži s temo, mnenje</li>
              <li>${en("in the foreground / background, on the left / right")}</li>
              <li>ugibanje: ${en("seem to, might be, must be, it looks as if")}</li>
              <li>vsak odgovor: odgovor + razlog + primer</li>
              <li>ko ne poznaš besede, jo opiši: ${en("it's a kind of…, it's something you use for…")}</li>
              <li>za vsako temo vsaj 8 ključnih besed (glej <a href="${BES}">Besedišče</a>)</li>
            </ul>
          </div>
        </div>

        <nav class="kazalo" aria-label="Podpoglavja">
          <h2>Podpoglavja</h2>
          <ol>
            <li><a href="#sklop-1"><span class="kazalo-st">1</span> Kako opišeš sliko</a></li>
            <li><a href="#sklop-2"><span class="kazalo-st">2</span> Kako odgovarjaš izpraševalcu</a></li>
${teme.map((t, i) => `            <li><a href="#sklop-${i + 3}"><span class="kazalo-st">${i + 3}</span> ${E(t.naslov)}</a></li>`).join("\n")}
            <li><a href="#kljuc"><span class="kazalo-st">?</span> Ključ: kateri tip naloge je to?</a></li>
          </ol>
        </nav>

${sklop1}

${sklop2}

${teme.map(temaSklop).join("\n\n")}

        <section class="subsection" id="kljuc">
          <div class="subsection-head">
            <h2>Ključ: kateri tip naloge je to?</h2>
            <p>Kaj je na listku in kateri postopek uporabiš.</p>
          </div>
          <div class="info-card">
            <div class="tabela-wrap">
              <table class="tabela">
                <thead><tr><th>Na listku ali v pogovoru …</th><th>Tip</th></tr></thead>
                <tbody>
                  <tr><td>fotografija in ena poved, „Look at the photograph“</td><td><a href="#tip-1">Tip 1</a> · Slikovna iztočnica</td></tr>
                  <tr><td>izpraševalec vpraša „What do you think…?“, „Why…?“, „Do you…?“</td><td><a href="#tip-2">Tip 2</a> · Vprašanje izpraševalca</td></tr>
                  <tr><td>kratko besedilo, „You will not be asked to retell it“</td><td><a href="#tip-3">Tip 3</a> · Besedilna iztočnica</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Pogoste napake</h2>
          </div>
          <div class="info-card">
            <ul>
              <li>Naštevanje predmetov z ${en("There is… There is…")} namesto povezanih povedi.</li>
              <li><em>present simple</em> za to, kar se dogaja na sliki: ${en("A girl draws")} → ${en("A girl is drawing")}.</li>
              <li>${en("In the picture I see…")} je pravilno, a ${en("On the picture")} ni: slika je ${en("in the picture")}.</li>
              <li>${en("She looks like happy")} → ${en("She looks happy")} (${en("look like")} + samostalnik).</li>
              <li>Odgovor z eno besedo, nato tišina.</li>
              <li>Učenje celih monologov na pamet: komisija to hitro opazi, ker se ne ujemajo s sliko.</li>
              <li>Prehod v slovenščino, ko zmanjka besede, namesto opisovanja.</li>
            </ul>
          </div>
        </section>

        <div class="note-band">
          <p>
            <strong>Vaja:</strong> Fraze in besede utrdiš z
            <a href="/views/anglescina/snov/opis_slike/opis_slike_naloge.html">nalogami za vajo</a>.
            Celoten potek ustnega izpita, tudi interpretacija književnega besedila, je v temi
            <a href="/views/anglescina/snov/ustni_izpit/ustni_izpit_razlaga.html">Ustni izpit</a>.
          </p>
        </div>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Vse teme</h2>
          </div>
          <div class="link-list">
            <a class="link-item" href="/views/anglescina/snov/snov.html">
              <span class="link-item-text"><strong>Pregled snovi: angleščina</strong><small>Vse teme predmeta na enem mestu.</small></span>
              <span class="arrow">→</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  </div>

  <div id="footer"></div>

  <script src="/components/components.js"></script>
</body>
</html>
`;

const mapa = new URL("public/views/anglescina/snov/opis_slike/", koren);
mkdirSync(mapa, { recursive: true });
writeFileSync(new URL("opis_slike_razlaga.html", mapa), stran);
console.log(`opis_slike_razlaga.html: ${teme.length} tem`);
