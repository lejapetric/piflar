# Piflar.si

Spletna stran z razlagami matematike in fizike za pripravo na maturo.

## Zagon

```bash
npm install
npm run dev     # razvoj (samodejni ponovni zagon)
npm start       # produkcija
```

Stran teče na <http://localhost:3000>. Nastavitve so v `.env` (glej `.env.example`):
`PORT`, `MONGODB_URI` (npr. brezplačni MongoDB Atlas) in `JWT_SECRET`.
Brez `MONGODB_URI` stran deluje, le prijava ni na voljo.

`npm test` zažene teste (preverjanje odgovorov, pravila dostopa, prijava).

## Struktura

```
server.js                  zažene strežnik (poveže bazo, posluša na PORT)
app.js                     Express: statične strani iz public/, API pod /api, 404
api/
  routes/api.js            seznam API poti
  controllers/             snovi, naloge, matura, avtentikacija
  models/uporabnik.js      uporabnik v MongoDB (paket, predmeti, geslo kot bcrypt hash)
  data/                    snovi.json, naloge.json, matura.json (+ index.js, ki jih prebere ob zagonu)
  middleware/              prijavljen uporabnik, obravnava napak
  utils/dostop.js          pravila, kdo sme videti kaj
test/                      testi (node --test)
public/
  index.html               naslovnica
  404.html                 stran ne obstaja / še v pripravi
  components/              header, sidebar, footer + components.js (naloži jih na vsaki strani)
  style/
    style.css              globalni stil
    snov.css               skupni stil vseh strani z razlago snovi
  views/<predmet>/snov/<poglavje>/<poglavje>_razlaga.html
```

## Nova stran z razlago

1. Ustvari `public/views/<predmet>/snov/<poglavje>/<poglavje>_razlaga.html` (kopiraj obstoječo).
2. V `<head>` naj bosta `/style/style.css` in `/style/snov.css`; dodaten CSS samo, če ga stran res potrebuje.
3. Dodaj poglavje v `api/data/snovi.json` in povezavo v `public/components/sidebar.html`.

Formule pišeš v LaTeX-u med `\( … \)` (v vrstici) ali `\[ … \]` (samostojno). MathJax se naloži samo na straneh s formulami.

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

## Dostop

| Paket | Kaj vidi |
| --- | --- |
| gost ali `brezplacno` | vse nerešene pole in zadnjo rešeno polo za vsak predmet in raven |
| `osnovni` | vse za predmete v `predmeti` (največ 3) |
| `premium` | vse za vse predmete |

Paket in `paketVelja` bo nastavljal plačilni sistem. Pravila so v `api/utils/dostop.js`.
Prijava se hrani v piškotku `httpOnly` (7 dni), zato je JavaScript na strani ne more ukrasti.

## API

| Pot | Opis |
| --- | --- |
| `GET /api/snovi?predmet=matematika` | seznam poglavij |
| `GET /api/snovi/:slug` | eno poglavje |
| `GET /api/naloge?poglavje=mnozice` | naloge brez odgovorov |
| `POST /api/naloge/:id/odgovor` | preveri odgovor `{ "odgovor": "7" }` → `{ "pravilno": true }` |
| `GET /api/naloge/:id/postopek` | postopek in rezultat |
| `GET /api/matura?predmet=matematika&raven=osnovna` | seznam pol (`resena`, `odklenjena`) |
| `GET /api/matura/:id` | pola z nalogami; rešitve samo, če je `odklenjena` |
| `POST /api/registracija` | `{ ime, email, geslo }` |
| `POST /api/prijava` | `{ email, geslo }` |
| `POST /api/odjava` | odjava |
| `GET /api/jaz` | prijavljen uporabnik |
