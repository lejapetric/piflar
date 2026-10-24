# Piflar.si

Spletna stran z razlagami matematike in fizike za pripravo na maturo.

## Zagon

```bash
npm install
npm run dev     # razvoj (samodejni ponovni zagon)
npm start       # produkcija
```

Stran teče na <http://localhost:3000> (vrata nastaviš s `PORT` v `.env`).

## Struktura

```
server.js                  Express: statične strani iz public/, API pod /api, 404
api/
  routes/api.js            seznam API poti
  controllers/             snovi.js, matura.js
  data/                    snovi.json, matura.json (+ index.js, ki ju prebere ob zagonu)
  middleware/              obravnava napak
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

## API

| Pot | Opis |
| --- | --- |
| `GET /api/snovi?predmet=matematika` | seznam poglavij |
| `GET /api/snovi/:slug` | eno poglavje |
| `GET /api/matura?raven=osnovna&tip=naloge` | seznam maturitetnih pol |
| `GET /api/matura/:id` | ena pola |
| `GET /api/matura/:id/naloge?status=resene` | naloge pole |
| `GET /api/matura/:id/naloge/:nalogaId` | ena naloga |
