# Piflar.si

Spletna stran z razlagami snovi za pripravo na maturo iz predmetov splošne gimnazije: matematika, fizika, kemija, biologija, informatika, geografija, zgodovina, slovenščina, angleščina, nemščina, francoščina, italijanščina, španščina, psihologija, sociologija, filozofija, ekonomija, glasba in umetnostna zgodovina.

## Zagon

```bash
npm install
npm run dev     # razvoj (samodejni ponovni zagon)
npm start       # produkcija
```

Stran teče na <http://localhost:3000>. Nastavitve so v `.env` (glej `.env.example`):
`PORT`, `MONGODB_URI` (npr. brezplačni MongoDB Atlas), `JWT_SECRET` ter za e-pošto
`RESEND_API_KEY` in `EPOSTA_POSILJATELJ` (brez ključa se povezava za potrditev izpiše v konzolo).
Brez `MONGODB_URI` stran deluje, le prijava ni na voljo.
Zaklep rešitev starejših pol je začasno izklopljen (vsi vidijo vse); vklopiš ga z `ZAKLEP=1` v `.env`.

`npm test` zažene teste (preverjanje odgovorov, pravila dostopa, prijava).

## Struktura

```
server.js                  zažene strežnik (poveže bazo, posluša na PORT)
app.js                     Express: statične strani iz public/, API pod /api, 404
api/
  routes/api.js            seznam API poti
  controllers/             snovi, naloge, matura, avtentikacija
  models/uporabnik.js      uporabnik v MongoDB (profil, nastavitve, paket, geslo kot bcrypt hash)
  utils/eposta.js          pošiljanje e-pošte (Resend), sporočilo za potrditev e-naslova
  models/napredek.js       napredek pri nalogah (en zapis na uporabnika in nalogo)
  data/                    snovi.json, naloge.json, matura.json (+ index.js, ki jih prebere ob zagonu)
  middleware/              prijavljen uporabnik, obravnava napak
  utils/dostop.js          pravila, kdo sme videti kaj
  utils/iskanje.js         indeks besedila strani snovi za iskalnik
test/                      testi (node --test)
public/
  index.html               naslovnica
  404.html                 stran ne obstaja / še v pripravi
  iskanje.html             vsi zadetki iskanja (components/iskanje.js)
  components/              header, sidebar, footer + components.js (naloži jih na vsaki strani)
                           tema.js v <head> nastavi temni/svetli način pred izrisom
                           in na straneh /views/<predmet>/ naloži videz predmeta
  style/
    style.css              globalni stil
    snov.css               skupni stil vseh strani z razlago snovi
    predmeti/              videz po predmetih: osnova.css + <predmet>.css (barve, pisave,
                           motiv za svetli in temni način; ozadje enobarvno, karirasto
                           le pri matematiki in fiziki); naslovnica
                           in ostale splošne strani ostanejo v osnovnem slogu
  views/<predmet>/snov/<poglavje>/<poglavje>_razlaga.html
```

## Nova stran z razlago

1. Ustvari `public/views/<predmet>/snov/<poglavje>/<poglavje>_razlaga.html` (kopiraj obstoječo).
2. V `<head>` naj bodo `/style/style.css`, `/style/snov.css` in `<script src="/components/tema.js">`; dodaten CSS samo, če ga stran res potrebuje.
3. Dodaj poglavje v `api/data/snovi.json` in povezavo v `public/components/sidebar.html`.

Strani matematike so razdeljene po podpoglavjih maturitetnega kataloga (`<section class="sklop" id="sklop-N">`).
Vsak sklop ima glavo, razlago (`sklop-teorija`) in tipe nalog (`sklop-naloge` z `tip-naloge`:
naslov tipa, naloga, kako prepoznaš, univerzalni postopek z rešitvijo naloge po korakih, primeri nalog). Vsebine višje ravni
imajo `sklop--visja` in oznako `badge-vr`. Grafi, vektorji in liki so inline SVG v `<figure class="slika">`
(razredi `s-os`, `s-k1` … so v `snov.css`). Na vrhu strani je kazalo, na dnu ključ za prepoznavanje tipov.

Na vsaki strani `…/snov/<poglavje>/<…>_razlaga.html` `components.js` samodejno doda lepljivo kazalo na desnem robu
(na ožjem zaslonu gumb »Kazalo« spodaj desno). Sestavi ga iz naslovov `h2` (poglavja) ter `h3`/`h4` (podpoglavja;
`h4` pod »Razlaga« so podpoglavja, `h4` pod »Tipi nalog« so tipi). Naslovom brez `id` ga doda samo; ročno urejanje ni potrebno.

Formule pišeš v LaTeX-u med `\( … \)` (v vrstici) ali `\[ … \]` (samostojno). MathJax se naloži samo na straneh s formulami.

Nova stran se sama pojavi v iskalniku: strežnik prebere vse neprazne strani v `public/views/`
(besedilo znotraj `.view`, brez formul, SVG in kazala). Zadetek vodi na najbližji element z `id`
(`sklop-N`, `tip-N`), zato naj imajo sklopi in tipi nalog `id`. Poglavje se prebere iz `page-eyebrow`
in `<h1>`. V razvoju se indeks osveži vsakih 5 s, v produkciji ob zagonu.

## Predmeti v pripravi

Angleščina, nemščina, francoščina, italijanščina, španščina, ekonomija,
glasba in umetnostna zgodovina imajo zaenkrat stran predmeta (`<predmet>.html`), pregled snovi (`snov/snov.html`)
s seznamom vseh tem in po eno stran z razlago. Teme brez strani so v `snov.html` označene z
`link-item link-item--pripravi` (»V pripravi«) in niso povezave; v meniju so le teme s stranjo.
Ko dodaš novo razlago, temo v `snov.html` in `<predmet>.html` spremeni v povezavo (`<a class="link-item">`)
in jo dodaj v meni. Vse teme so že v `snovi.json`.

Filozofija je v celoti napisana po katalogu M-FIL-2024 (13 strani): uvod s temeljnimi pojmi, štiri besedila
za komentar (Platon, Aristotel, Descartes, Nietzsche), pet tem za esej in strani za komentar, esej in seminarsko nalogo.
Strani besedil imajo sklope po glavnih problemih iz kataloga, strani tem po vsebinah in pojmovnik vseh pojmov iz kataloga.

Sociologija ima vseh 14 poglavij predmetnega izpitnega kataloga RIC (4.1 do 4.14), vsako na svoji strani.
Razdelki s posebnim znanjem za seminarsko nalogo imajo `sklop--visja` in oznako `badge-vr` z besedilom »Seminarska«.

## Temni način in iskanje

- Stikalo z luno/soncem v glavi preklaplja `data-theme` na `<html>`; izbira se shrani v `localStorage`,
  sicer velja nastavitev sistema. Barve so spremenljivke v `:root` (`style.css`), temne vrednosti so v
  razdelku TEMNI NAČIN v `style.css` in `snov.css` (tam so tudi barve slik in barve, zapisane v SVG).
- Iskalnik v glavi med tipkanjem pokaže predloge z odlomkom in poglavjem. Klik odpre stran na izbranem
  mestu (`?isci=…&k=…#sidro`, beseda je obarvana), Enter odpre `/iskanje.html?q=…` z vsemi zadetki.
  Iskanje ne loči velikih črk in strešic (`krozn` najde `krožnica`).

## Tuji jeziki

Angleščina (M-ANG-2018), nemščina (M-NEM-2024), španščina (M-SPA-2023) in italijanščina (M-ITT-2026)
imajo vso snov po predmetnih izpitnih katalogih RIC. Vsak jezik ima stran o zgradbi izpita in merilih,
teme za jezikovne strukture (pola 1B, pisanje in govor) ter teme za spretnosti (branje in poslušanje,
pisni sestavki, ustni izpit). Strani imajo isto zgradbo kot druge razlage: »Kar moraš znati«, sklope
z razlago in tipi nalog, ključ in pogoste napake. Snov za višjo raven je označena z `sklop--visja`.
Španščina šteje teme od 0 (zgradba izpita), da se zadnja vrstica v `snovi.json` ni spremenila.

## Interaktivne naloge

Naloge so v `api/data/naloge.json`. Pravilni odgovor in postopek ostaneta na strežniku,
zato ju dijak ne vidi v izvorni kodi strani.

```json
{
  "id": "mnozice-2",
  "poglavje": "mnozice",
  "raven": "osnovna",
  "besedilo": "Izračunaj \\(m(A \\cup B)\\) …",
  "namig": "neobvezno, prikaže se pod poljem za odgovor",
  "odgovor": { "tip": "stevilo", "vrednost": 7 },
  "rezultat": "\\(m(A \\cup B) = 7\\)",
  "postopek": "<p>Postopek v HTML z LaTeX formulami …</p>",
  "povezave": [{ "naslov": "Tip 5: Moč unije", "url": "/views/matematika/snov/mnozice/mnozice_razlaga.html#tip-5" }]
}
```

Tipi odgovora: `stevilo` (`vrednost`, neobvezno `toleranca`; sprejme `3,5` in `1/2`),
`mnozica` (`elementi`, vrstni red ni pomemben) in `besedilo` (`sprejemljivi`).
Vsak tip na strani z razlago ima sidro `#tip-N`, zato lahko naloga kaže točno na pravi del razlage.

Stran z nalogami potrebuje samo `<div id="naloge" data-poglavje="…" data-math></div>`
in `<script src="/components/naloge.js" defer></script>` (glej `mnozice_naloge.html`).
`npm test` preveri preverjanje odgovorov in veljavnost `naloge.json`.

### Naloge za vajo po snoveh

Vsaka snov vsakega predmeta ima vsaj 50 izvirnih nalog za vajo (skupaj okoli 19.000),
od lahkih do zelo težkih. Naloge niso prepisane iz maturitetnih pol.

- Težavnost 1–4 (lahka, srednja, težka, zelo težka) je izpisana v kotu naloge,
  naloge z `"raven": "visja"` imajo oznako Višja raven.
- Tip `izbira` (`moznosti` + `pravilna` kot črka A, B, C …) ali vpis (`stevilo`, `besedilo`).
- Vsaka naloga ima `rezultat` in `postopek` (gumba Prikaži rezultat in Prikaži postopek).

Naloge nastanejo iz generatorjev v `tools/vaje/<predmet>/<slug>.mjs` (ena datoteka na snov).
Vsaka datoteka izvozi `default({ serija, pojmi, vprasanja })`:

- `serija(ime, n, (r, i) => naloga)` naredi `n` nalog z naključnimi, a ponovljivimi podatki;
  enaka besedila se izločijo,
- `pojmi([[pojem, opis], …])` iz pojmovnika naredi naloge »kaj pomeni«, »kateri pojem«, »ali drži« in vpis,
- `vprasanja([[težavnost, vprašanje, pravilno | { vpis: [...] }, [napačne], razlaga, "visja"?], …])`.

Skupne predloge so v `tools/vaje/lib.mjs` (`kolicina`, `izbira`, `besedilo`), `jezik-lib.mjs`
(vrzeli, spregatve, bralni odlomki za tuje jezike), `zgodovina-lib.mjs`, `slovenscina-lib.mjs`,
`glasba-lib.mjs`, `kemija-lib.mjs` ter spregatve v `fr-glagoli.mjs`, `it-glagoli.mjs` in `es-glagoli.mjs`.

```bash
node tools/vaje/gradi.mjs biologija   # zapiše api/data/vaje/biologija.json in izpiše število nalog po snoveh
node tools/vaje/strani.mjs            # naredi <slug>_naloge.html za vsako snov z nalogami
```

Snovi, ki še nimajo razlage, imajo na seznamu snovi in v stranskem meniju povezavo na naloge.

Predmeti imajo lahko poleg nalog iz predlog še ročno napisane dodatne naloge v `tools/vaje/<predmet>-dodatne/<slug>.mjs`
(zapis je opisan v `tools/vaje/matematika-dodatne/README.md`). Pri matematiki so to
čisto osnovne in zelo težke sestavljene naloge v več korakih (vsaka snov ima vsaj 14 zelo težkih), pri fiziki, kemiji, biologiji, geografiji, informatiki, nemščini, glasbi, angleščini, ekonomiji, umetnostni zgodovini, slovenščini, filozofiji in psihologiji
zelo težke naloge (vsaka snov ima vsaj 10). Dodajo se za nalogami iz `tools/vaje/<predmet>/`, zato se id-ji obstoječih nalog (in s tem napredek uporabnikov) ne spremenijo.

### Razdelek Naloge

Poleg Snovi in Mature ima predmet razdelek Naloge (`public/views/<predmet>/naloge/naloge.html`, zaenkrat matematika):
vse naloge za vajo predmeta na eni strani s spustnima seznamoma za snov in težavnost (izbereš lahko več možnosti, privzeto je izbrano vse), stikalom za
višjo raven in vrstnim redom (od lažjih do težjih ali premešano). Naloge se prikazujejo po 20, z gumbom Pokaži več.
Stran potrebuje samo `<div id="naloge" data-predmet="matematika" data-math></div>` brez `data-poglavje`
in `naloge.js`. Izbira se zapiše v naslov strani (`?snov=funkcije,stoznice&tezavnost=3,4&visja=0&vrstni=nakljucno`),
zato povezave v stranskem meniju vodijo naravnost na naloge posamezne snovi. Za nov predmet kopiraj stran,
spremeni `data-predmet` in dodaj razdelek v `sidebar.html` ter povezavo na stran predmeta.
`test/vaje.test.js` preveri shemo nalog, da je pravilni odgovor sprejet in da ima vsaka snov vsaj 50 nalog.

## Matura

Poglavje Matura (`public/views/matematika/matura/`) ima dve podpoglavji:

- **Maturitetne pole** (`pole/pole.html`): seznam let, stran leta je `pole/leto.html?leto=2026`
  (najprej spomladanski, nato jesenski rok; raven izbereš z gumboma na vrhu).
- **Maturitetne naloge po snovi** (`po_snovi/po_snovi.html`): poglavja po sklopih (`sklop` v `snovi.json`),
  stran poglavja je `po_snovi/naloge.html?poglavje=diferencialni_racun`, stran sklopa `?sklop=4`.

Strani izriše `components/matura.js`. Na vrhu sta gumba Pokaži vse rešitve in Pokaži vse postopke,
pri vsaki nalogi pa Rešitev in Postopek. PDF brez rešitev / z rešitvami odpre tisk brskalnika
(Shrani kot PDF) v svetli temi brez menija; povezava s `?tisk=brez` ali `?tisk=resitve` odpre tisk sama.
Rešitve pridejo s strežnika samo, če je pola odklenjena (glej Dostop), zato veljajo tudi v PDF-ju.

Pole so v `api/data/matura.json`. Vsaka naloga ima `poglavje` (slug iz `snovi.json`, lahko seznam),
zato se sama pojavi na strani poglavja:

```json
{
  "id": "matematika-osnovna-2026-spomladanski",
  "predmet": "matematika", "raven": "osnovna", "leto": 2026, "rok": "spomladanski",
  "pdf": "https://www.ric.si/…/pola.pdf",
  "vir": "Pole izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.",
  "naloge": [
    { "id": "2", "poglavje": "diferencialni_racun", "tocke": 3,
      "besedilo": "neobvezno; brez besedila stran pokaže povezavo na uradno polo",
      "rezultat": "\\(f'(1) = -1\\)", "razlaga": "<p>Postopek …</p>" }
  ]
}
```

Na vsaki strani z razlago (`…/snov/<slug>/<slug>_razlaga.html`) `components.js` pod glavo doda povezavo
»Maturitetne naloge iz te snovi« na `po_snovi/naloge.html?poglavje=<slug>`, če ima snov vsaj eno nalogo
(število vrne `GET /api/matura/stevilo?predmet=…`). Naloge na strani snovi se ne prepisujejo: berejo se iz istih pol,
vsaka ima povezavo »Odpri v poli«, ki odpre polo na strani leta in skoči na nalogo (`#<id pole>-<id naloge>`).

Na straneh nalog po snovi dijak odgovor tudi odda (`POST /api/matura/odgovor`, `api/utils/matura-odgovor.js`).
Pravilni odgovor se ne vpisuje posebej, prebere se iz `rezultat`:

- **izbirna naloga** (`<ol class="pola-izbire">`, rezultat je črka ali npr. »B in D«): dijak klikne odgovor, strežnik ga preveri;
- **ostale naloge**: rezultat se razdeli na dele (2.1., 2.2. …), za vsak del je polje. Del, ki je eno samo število
  (»h ≈ 10 m«, »\(x = \dfrac{7}{2}\)«), preveri strežnik (toleranca je zaokroževanje zadnje števke, pri fiziki in kemiji vsaj 1 %;
  enota je napisana ob polju). Pri besedilnih delih in delih z več vrednostmi dijak po oddaji vidi rešitev tega dela in jo primerja s svojo;
- **esej** nima polja.

Gumba pri vsaki nalogi sta Prikaži rezultat in Prikaži postopek. Odgovor lahko preveri samo, kdor sme videti rešitve pole.

Besedila nalog RIC so avtorsko zaščitena: brez dovoljenja RIC pusti `besedilo` prazno in v `pdf`
povezavo na uradno polo na ric.si. Novo leto dodaš v `matura.json` in kot povezavo v `sidebar.html`.

## Račun

- **Registracija** (`/prijava.html#registracija`): ime, priimek, starost (neobvezno), e-naslov, geslo in potrditev
  gesla. Geslo: vsaj 8 znakov, 1 velika tiskana črka in 1 številka (preveri tudi strežnik).
- Po registraciji dobi uporabnik e-pošto z gumbom **Potrdi e-naslov** (povezava `/potrdi.html?zeton=…`, velja 24 ur).
  Klik potrdi e-naslov, ga prijavi in odpre naslovnico. Do potrditve prijava vrne 403 in ponudi novo povezavo.
  Računi, ustvarjeni pred to spremembo, veljajo za potrjene.
- **Glava**: prijavljen uporabnik vidi krogec z inicialkami (ali profilno sliko). Klik odpre meni s podatki,
  plačanim paketom (če ga ima), Uredi podatke, Nastavitve, gumbom Naročnina in Odjava.
- **Uredi podatke** (`/profil.html`): slika (v brskalniku obrezana na 256 × 256 px), ime, priimek, starost,
  vrsta šole (gimnazija; srednja strokovna je pripravljena za kasneje), ime šole, letnik, leto mature, raven matematike.
- **Nastavitve** (`/nastavitve.html`): tema (svetla, temna, kot sistem), jezik, e-obvestila, sprememba gesla, izbris računa.

## Dostop

| Paket | Kaj vidi |
| --- | --- |
| gost ali `brezplacno` | snov, interaktivne naloge, vse nerešene pole in zadnjo rešeno polo za vsak predmet in raven |
| `osnovni` | vse za matematiko, angleščino in slovenščino (`PAKET_OSNOVNI`) |
| `premium` | vse za vse predmete |

Pravila so v `api/utils/dostop.js`.

## Plačila (Stripe)

Na `/narocnina.html` dijak izbere paket in obdobje: **mesečno** ali **letno** (naročnina,
Stripe jo obnavlja sam) ali **šolsko leto** (enkratno plačilo za 10 mesecev). Cene in popuste
nastaviš v Stripe nadzorni plošči, v `.env` pa vpišeš id-je cen (`STRIPE_CENA_<PAKET>_<OBDOBJE>`).

Stripe po plačilu pokliče `/api/placila/webhook` (dogodka `checkout.session.completed` in
`invoice.paid`), ki nastavi `paket` in `paketVelja`. Preklic in menjavo kartice dijak opravi v
Stripe portalu (gumb „Upravljaj naročnino“; portal vklopiš v Stripe → Settings → Billing → Customer portal).

Lokalno preizkusiš webhook s Stripe CLI: `stripe listen --forward-to localhost:3000/api/placila/webhook`.
Prijava se hrani v piškotku `httpOnly` (7 dni), zato je JavaScript na strani ne more ukrasti.

## API

| Pot | Opis |
| --- | --- |
| `GET /api/snovi?predmet=matematika` | seznam poglavij |
| `GET /api/snovi/:slug` | eno poglavje |
| `GET /api/iskanje?q=elipsa&predlogi=1&omejitev=8` | zadetki v snovi (odlomek, poglavje, razdelek, povezava) |
| `GET /api/naloge?poglavje=mnozice` | naloge brez odgovorov |
| `POST /api/naloge/:id/odgovor` | preveri odgovor `{ "odgovor": "7" }` → `{ "pravilno": true }` |
| `GET /api/naloge/:id/postopek` | postopek in rezultat |
| `GET /api/napredek?poglavje=mnozice` | napredek prijavljenega (poskusi, rešeno, ogledan postopek) |
| `GET /api/matura?predmet=matematika&raven=osnovna&leto=2026` | seznam pol (`resena`, `odklenjena`), z `&naloge=1` tudi naloge |
| `GET /api/matura/naloge?predmet=matematika&poglavje=diferencialni_racun` | naloge iz vseh pol za poglavja (več ločiš z vejico) |
| `GET /api/matura/:id` | pola z nalogami; rešitve samo, če je `odklenjena` |
| `POST /api/registracija` | `{ ime, priimek, starost?, email, geslo }` → pošlje e-pošto za potrditev |
| `POST /api/potrdi-email` | `{ zeton }` → potrdi e-naslov in prijavi |
| `POST /api/potrdi-email/ponovno` | `{ email }` → nova povezava za potrditev |
| `POST /api/prijava` | `{ email, geslo }` |
| `POST /api/odjava` | odjava |
| `GET /api/jaz` | prijavljen uporabnik |
| `PATCH /api/jaz` | uredi profil in nastavitve |
| `POST /api/jaz/geslo` | `{ staro, novo }` |
| `DELETE /api/jaz` | `{ geslo }` → izbriše račun in napredek |
| `GET /api/placila/cenik` | cene paketov iz Stripe |
| `POST /api/placila/checkout` | `{ paket, obdobje }` → `{ url }` za plačilo |
| `POST /api/placila/portal` | `{ url }` za upravljanje naročnine |
