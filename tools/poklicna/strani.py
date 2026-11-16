# python3 tools/poklicna/strani.py
# Zgradi okvir predmetov poklicne mature (public/views/poklicna_<predmet>/):
#   <slug>.html                     stran predmeta
#   snov/snov.html                  pregled snovi po sklopih
#   naloge/naloge.html              naloge za vajo
#   matura/matura.html              o izpitu, povezave na pole in naloge po snovi
#   matura/pole/pole.html, leto.html, matura/po_snovi/po_snovi.html, naloge.html
# ter skupine poklicne mature v meniju (components/sidebar.html, med oznakama
# POKLICNA MATURA) in predmete poklicne mature na naslovnici (index.html).
# Strani z razlago (snov/<slug>/<slug>_razlaga.html) naredi razlage.py.
import html, json, os, re

KOREN = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
PUBLIC = os.path.join(KOREN, "public")

from snovi import SNOVI  # noqa: E402

PREDMETI = {
    "poklicna_matematika": {
        "ime": "Matematika",
        "rod": "matematike",
        "opis": "Snov za poklicno maturo iz matematike po predmetnem izpitnem katalogu 2026: števila, geometrija, funkcije, zaporedja, statistika, odvod, kombinatorika in verjetnost.",
        "sklopi": {
            1: ("Številske množice", "Računanje s števili in izrazi, deljivost, ulomki, odstotki in koreni."),
            2: ("Geometrija", "Liki in telesa, koti, trikotniki, obsegi, ploščine, površine in prostornine."),
            3: ("Algebrske funkcije in enačbe", "Linearna, kvadratna, potenčna, polinomska in racionalna funkcija."),
            4: ("Transcendentne funkcije in enačbe", "Eksponentna, logaritemska in kotne funkcije."),
            5: ("Zaporedja in obdelava podatkov", "Aritmetično in geometrijsko zaporedje, obrestni račun in statistika."),
            6: ("Odvod, kombinatorika in verjetnost", "Diferencialni račun, štetje možnosti in verjetnost dogodkov."),
        },
        "meta": [("1", "Izpitna pola"), ("120", "Minut"), ("70 + 30", "Točk (pisno + ustno)"), ("1", "Raven")],
        "izpit": [
            "Izpit iz matematike je <strong>tretji predmet</strong> poklicne mature (namesto tujega jezika). Ima pisni in ustni del. Pisni del je <strong>ena izpitna pola</strong>: <strong>120 minut</strong>, <strong>70 točk</strong>, 70 % ocene.",
            "<strong>1. del</strong> pole ima 11 krajših nalog (50 točk: 7 nalog po 4 točke, 2 po 5 in 2 po 6). <strong>2. del</strong> ima 3 sestavljene naloge po 10 točk, od katerih izbereš in rešiš <strong>2</strong>. Dovoljeni so računalo (brez grafov in simbolnega računanja) in geometrijsko orodje. Formule so priložene poli.",
            "<strong>Ustni izpit</strong> traja do 20 minut (30 točk, 30 % ocene): dobiš situacijo iz stroke ali vsakdanjega življenja s tremi sklopi vprašanj po 10 točk, pred tem imaš 15 minut za pripravo. Na ustnem izpitu smeš uporabljati formule iz kataloga in tehnološki pripomoček.",
        ],
        "pole_opis": "Vadbene pole v zgradbi pole poklicne mature: 1. del z 11 krajšimi nalogami in 2. del s tremi sestavljenimi nalogami, od katerih izbereš dve.",
        "katalog": ("Predmetni izpitni katalog za poklicno maturo, matematika 2026", "https://www.ric.si/poklicna-matura/predmeti/tretji-predmet/matematika/"),
    },
    "poklicna_slovenscina": {
        "ime": "Slovenščina",
        "rod": "slovenščine",
        "opis": "Snov za poklicno maturo iz slovenščine po predmetnem izpitnem katalogu: razčlemba neumetnostnega besedila, tvorba krajšega besedila, jezik, interpretacija in literarnozgodovinski sklopi za ustni izpit.",
        "sklopi": {
            1: ("Neumetnostna besedila (izpitna pola 1)", "Razčlemba izhodiščnega besedila, besedilne vrste in tvorba krajšega besedila."),
            2: ("Jezik", "Besedje, skladnja, pravopis, pravorečje, slog in slovenščina v družbi."),
            3: ("Književnost (izpitna pola 2 in ustni izpit)", "Interpretacija odlomka in besedila literarnozgodovinskih sklopov."),
        },
        "meta": [("2", "Izpitni poli"), ("120", "Minut"), ("70 + 30", "Odstotkov (pisno + ustno)"), ("Obvezen", "Predmet")],
        "izpit": [
            "Slovenščina je <strong>prvi, obvezni predmet</strong> poklicne mature. Pisni del traja <strong>120 minut</strong> in ima dve izpitni poli po 60 minut (70 % ocene). Dovoljeno je samo nalivno pero ali kemični svinčnik.",
            "<strong>Izpitna pola 1</strong> (40 %): razčlemba izhodiščnega neumetnostnega besedila (publicističnega, strokovnega, uradnega ali javnega) z nalogami zaprtega in polodprtega tipa ter <strong>tvorba krajšega neumetnostnega besedila</strong> dane vrste. Pola ima 60 točk, ki se delijo z 1,5. <strong>Izpitna pola 2</strong> (30 %): vodena ali samostojna <strong>interpretacija odlomka</strong> umetnostnega besedila (30 točk).",
            "<strong>Ustni izpit</strong> traja do 20 minut (30 %): glasno branje odlomka, vodena interpretacija in povezava z jezikovno temo, s 15 minutami priprave. Besedila so iz literarnozgodovinskih sklopov kataloga.",
        ],
        "pole_opis": "Vadbene pole v zgradbi poklicne mature: izpitna pola 1 z izhodiščnim neumetnostnim besedilom, nalogami in tvorbo krajšega besedila ter izpitna pola 2 z interpretacijo odlomka.",
        "katalog": ("Predmetni izpitni katalog za poklicno maturo, slovenščina 2025", "https://www.ric.si/poklicna-matura/predmeti/prvi-predmet/slovenscina/"),
    },
    "poklicna_kemija": {
        "ime": "Kemija",
        "rod": "kemije",
        "opis": "Kemija kot drugi (strokovni) predmet poklicne mature za kemijske tehnike po katalogu 2026: splošna in anorganska kemija, kemijsko računstvo, fizikalna in organska kemija.",
        "sklopi": {
            1: ("Splošna in anorganska kemija", "Zgradba snovi, vezi, nomenklatura, zrak in voda, nekovine in kovine."),
            2: ("Kemijsko računstvo", "Množina, stehiometrija, raztopine in plini v računih."),
            3: ("Fizikalna kemija", "Agregatna stanja, raztopine, energija, hitrost, ravnotežje, pH in elektrokemija."),
            4: ("Organska kemija", "Ogljikovodiki, kisikove in dušikove spojine, biomolekule in polimeri."),
        },
        "meta": [("1", "Izpitna pola"), ("120", "Minut"), ("70 + 30", "Točk (pisno + ustno)"), ("2.", "Predmet PM")],
        "izpit": [
            "Kemija je <strong>drugi predmet</strong> poklicne mature v programu <strong>kemijski tehnik</strong> (tudi DV). Izpit ima pisni in ustni del in se opravlja na eni ravni.",
            "Pisni izpit je <strong>ena izpitna pola</strong>, <strong>120 minut</strong>, <strong>70 točk</strong>. <strong>1. del</strong> (20 točk) ima naloge zaprtega in polodprtega tipa, <strong>2. del</strong> (50 točk) strukturirane naloge s podvprašanji: računi, enačbe, formule in reakcijske sheme. Dovoljeno je numerično žepno računalo brez grafičnega zaslona.",
            "<strong>Ustni izpit</strong> (30 točk): izpitni listek s tremi nalogami oziroma vprašanji po 10 točk.",
        ],
        "pole_opis": "Vadbene pole v zgradbi poklicne mature: 1. del z nalogami zaprtega in polodprtega tipa (20 točk) in 2. del s strukturiranimi nalogami (50 točk).",
        "katalog": ("Predmetni izpitni katalog za drugi predmet poklicne mature, kemija (kemijski tehnik) 2026", "https://www.ric.si/poklicna-matura/predmeti/drugi-predmet/"),
    },
}

GLAVA = """<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{naslov} | Učilnica.com</title>
  <meta name="description" content="{opis}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap">
  <link rel="stylesheet" href="/style/style.css">
  <script src="/components/tema.js"></script>{css}
</head>
<body>
  <div id="header"></div>

  <div id="sidebar"></div>

  <div id="mainContent" class="main-content">
    <div class="view-container">
      <div class="view">

"""
NOGA = """
      </div>
    </div>
  </div>

  <div id="footer"></div>

  <script src="/components/components.js"></script>{js}
</body>
</html>
"""


def stran(pot, naslov, opis, telo, css=False, js=""):
    pot = os.path.join(PUBLIC, pot)
    os.makedirs(os.path.dirname(pot), exist_ok=True)
    vsebina = (GLAVA.format(naslov=naslov, opis=html.escape(opis, quote=True),
                            css='\n  <link rel="stylesheet" href="/style/snov.css">' if css else "")
               + telo + NOGA.format(js=f'\n  <script src="/components/{js}" defer></script>' if js else ""))
    with open(pot, "w", encoding="utf-8") as f:
        f.write(vsebina)


def glava(eyebrow, h1, p, meta=()):
    m = ""
    if meta:
        m = '\n          <div class="page-meta">' + "".join(
            f'\n            <div class="page-meta-item"><strong>{a}</strong><span>{b}</span></div>' for a, b in meta) + "\n          </div>"
    return f"""        <header class="page-header">
          <span class="page-eyebrow">{eyebrow}</span>
          <h1>{h1}</h1>
          <p>{p}</p>{m}
        </header>
"""


def povezava(href, naslov, opis):
    return f"""            <a class="link-item" href="{href}">
              <span class="link-item-text">
                <strong>{naslov}</strong>
                <small>{opis}</small>
              </span>
              <span class="arrow">→</span>
            </a>
"""


def sekcija(h2, p, vsebina):
    return f"""
        <section class="subsection">
          <div class="subsection-head">
            <h2>{h2}</h2>
            <p>{p}</p>
          </div>
{vsebina}        </section>
"""


def url_snovi(slug, s):
    return f"/views/{slug}/snov/{s}/{s}_razlaga.html"


def poglavja(slug):
    return [dict(sklop=sk, slug=s, naslov=n, opis=o, stevilka=f"4.{i}") for i, (sk, s, n, o) in enumerate(SNOVI[slug], 1)]


def obstaja_razlaga(slug, s):
    return os.path.exists(os.path.join(PUBLIC, url_snovi(slug, s).lstrip("/")))


def seznam_poglavij(slug):
    out = '          <div class="link-list">\n'
    for p in poglavja(slug):
        out += povezava(url_snovi(slug, p["slug"]), f'{p["stevilka"]} {p["naslov"]}', p["opis"])
    return out + "          </div>\n"


def kartice_sklopov(slug, cfg):
    out = '          <div class="two-col">\n'
    for st, (ime, opis) in cfg["sklopi"].items():
        li = "".join(f'\n                <li><a href="{url_snovi(slug, p["slug"])}">{p["stevilka"]} {p["naslov"]}</a></li>'
                     for p in poglavja(slug) if p["sklop"] == st)
        out += f"""            <div class="info-card">
              <h3>{st}. {ime}</h3>
              <p>{opis}</p>
              <ul>{li}
              </ul>
            </div>
"""
    return out + "          </div>\n"


def zgradi(slug, cfg):
    ime, rod = cfg["ime"], cfg["rod"]
    n = len(SNOVI[slug])
    eyebrow = f"Poklicna matura · {ime}"
    izpit = "".join(f"\n          <p>{p}</p>" for p in cfg["izpit"])
    katalog = f'<a href="{cfg["katalog"][1]}" target="_blank" rel="noopener">{cfg["katalog"][0]}</a>'

    # stran predmeta
    telo = glava("Poklicna matura", f"{ime} na poklicni maturi", cfg["opis"], [(str(n), "Poglavij")] + cfg["meta"][:3])
    telo += f"""
        <div class="intro-card">
          <h3>Kako poteka izpit?</h3>{izpit}
        </div>
"""
    telo += sekcija("Kje začeti", "Snov, naloge za vajo in matura.", '          <div class="two-col">\n'
                    + povezava(f"/views/{slug}/snov/snov.html", "Snov", f"{n} poglavij z razlagami, tipi nalog in primeri")
                    + povezava(f"/views/{slug}/naloge/naloge.html", "Naloge", "Naloge za vajo po snovi in težavnosti")
                    + povezava(f"/views/{slug}/matura/matura.html", "Matura", "Pole z rešitvami in maturitetne naloge po snovi")
                    + "          </div>\n")
    telo += sekcija("Poglavja", f"{n} poglavij po predmetnem izpitnem katalogu za poklicno maturo.", seznam_poglavij(slug))
    telo += f"""
        <div class="note-band">
          <p>
            <strong>Splošna ali poklicna?</strong> To je snov za <strong>poklicno maturo</strong> po katalogu: {katalog}.
            Če opravljaš splošno maturo, preklopi stikalo v meniju na Splošna matura.
          </p>
        </div>
"""
    stran(f"views/{slug}/{slug}.html", f"{ime} (poklicna matura)", cfg["opis"], telo)

    # pregled snovi
    telo = glava(f"{eyebrow} · Snov", "Pregled snovi", f"Vseh {n} poglavij za poklicno maturo iz {rod}, razdeljenih po sklopih izpitnega kataloga. Vsako poglavje ima razlago, tipe nalog z univerzalnim postopkom in primere.",
                 [(str(n), "Poglavij"), (str(len(cfg["sklopi"])), "Sklopov")])
    telo += sekcija("Sklopi", "Poglavja, razvrščena po vsebinskih sklopih kataloga.", kartice_sklopov(slug, cfg))
    telo += sekcija("Vsa poglavja", "Po vrsti, kot si sledijo v katalogu.", seznam_poglavij(slug))
    stran(f"views/{slug}/snov/snov.html", f"{ime}: pregled snovi (poklicna matura)", cfg["opis"], telo)

    # naloge za vajo
    telo = glava(f"{eyebrow} · Naloge", "Naloge za vajo",
                 "Lastne naloge iz vse snovi za poklicno maturo, od čisto osnovnih do zelo zahtevnih. Izberi snov in težavnost (privzeto so izbrane vse), nato izberi odgovor ali vpiši rezultat in ga preveri. Če se zatakne, si oglej rezultat ali celoten postopek.")
    telo += f"""
        <div id="naloge" class="naloge" data-predmet="{slug}" data-math>
          <p>Nalagam naloge …</p>
        </div>

        <div class="note-band">
          <p>
            <strong>Nasvet:</strong> Začni z lahkimi nalogami snovi, ki jo ravno ponavljaš, in nadaljuj k težjim.
            Cele pole najdeš v razdelku <a href="/views/{slug}/matura/matura.html">Matura</a>.
          </p>
        </div>
"""
    stran(f"views/{slug}/naloge/naloge.html", f"{ime}: naloge za vajo (poklicna matura)", f"Naloge za vajo iz {rod} za poklicno maturo z rešitvami in postopki.", telo, css=True, js="naloge.js")

    # matura
    telo = glava(f"Poklicna matura · {ime} · Matura", f"Poklicna matura iz {rod}",
                 "Vse za pripravo na izpit: kako je sestavljen, pole po letih in rokih ter maturitetne naloge, razvrščene po snovi.", cfg["meta"])
    telo += f"""
        <div class="intro-card">
          <h3>Zgradba izpita</h3>{izpit}
        </div>
"""
    telo += sekcija("Podpoglavja", "Vadi na celih polah ali po posameznih poglavjih snovi.", f"""          <div class="two-col">
            <div class="info-card">
              <h3>Maturitetne pole</h3>
              <p>{cfg["pole_opis"]} Vsako leto ima spomladanski, jesenski in zimski rok, pri vsaki nalogi odpreš rešitev ali postopek.</p>
              <ul>
                <li><a href="/views/{slug}/matura/pole/pole.html">Vse pole po letih</a></li>
              </ul>
            </div>
            <div class="info-card">
              <h3>Maturitetne naloge po snovi</h3>
              <p>Naloge iz vseh pol, razvrščene po poglavjih snovi. Vsako poglavje in vsak sklop lahko preneseš v PDF.</p>
              <ul>
                <li><a href="/views/{slug}/matura/po_snovi/po_snovi.html">Naloge po snovi</a></li>
              </ul>
            </div>
          </div>
""")
    telo += f"""
        <div class="note-band">
          <p>
            <strong>Uradne pole:</strong> Pole poklicne mature izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice.
            Uradne pole in navodila za ocenjevanje so na <a href="{cfg["katalog"][1]}" target="_blank" rel="noopener">ric.si</a>.
            Pole na Učilnica.com so vadbene: zgradba, vrsta nalog in točkovanje sledijo uradnim polam, besedila in rešitve so naši.
          </p>
        </div>
"""
    stran(f"views/{slug}/matura/matura.html", f"Poklicna matura iz {rod}", f"Poklicna matura iz {rod}: zgradba izpita, pole z rešitvami in naloge po snovi.", telo)

    # pole po letih
    telo = glava(f"{eyebrow} · Matura", "Maturitetne pole",
                 "Vadbene pole po letih. V vsakem letu so spomladanski, jesenski in zimski rok. Pri vsaki nalogi lahko odpreš rešitev ali celoten postopek.")
    telo += f"""
        <section class="subsection">
          <div class="subsection-head">
            <h2>Pole po letih</h2>
            <p>Izberi leto.</p>
          </div>
          <div id="matura" data-nacin="leta" data-predmet="{slug}">
            <p>Nalagam pole …</p>
          </div>
        </section>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Prenesi vse pole</h2>
            <p>Vse pole v enem PDF-ju. V oknu za tisk izberi Shrani kot PDF.</p>
          </div>
          <div class="matura-prenosi">
            <a class="btn btn-secondary" href="/views/{slug}/matura/pole/leto.html?tisk=brez" target="_blank">PDF brez rešitev</a>
            <a class="btn btn-secondary" href="/views/{slug}/matura/pole/leto.html?tisk=resitve" target="_blank">PDF z rešitvami</a>
          </div>
        </section>

        <div class="note-band">
          <p>
            <strong>Avtorstvo:</strong> Uradne pole poklicne mature izdaja Državni izpitni center (RIC), ki ima nanje vse avtorske pravice
            (<a href="{cfg["katalog"][1]}" target="_blank" rel="noopener">ric.si</a>). Vadbene pole, rešitve in postopki na tej strani so delo Učilnica.com.
          </p>
        </div>
"""
    stran(f"views/{slug}/matura/pole/pole.html", f"{ime}: maturitetne pole (poklicna matura)", f"Vadbene pole za poklicno maturo iz {rod} z rešitvami in postopki.", telo, css=True, js="matura.js")

    telo = glava(f"{eyebrow} · Matura · Maturitetne pole", "Vse maturitetne pole",
                 "Spomladanski, jesenski in zimski rok. Klikni na polo, da se odpre, ali jo prenesi kot PDF brez rešitev ali z rešitvami. Pri vsaki nalogi lahko prikažeš samo rešitev ali celoten postopek.")
    telo += f"""
        <div id="matura" data-nacin="pole" data-predmet="{slug}" data-math>
          <p>Nalagam pole …</p>
        </div>

        <div class="note-band">
          <p>
            <strong>Nasvet:</strong> Polo najprej reši sam in s štoparico (120 minut), nato preveri rešitve.
            Kjer se zatakne, si oglej postopek in poglavje v
            <a href="/views/{slug}/matura/po_snovi/po_snovi.html">maturitetnih nalogah po snovi</a>.
          </p>
        </div>
"""
    stran(f"views/{slug}/matura/pole/leto.html", f"{ime}: maturitetne pole (poklicna matura)", f"Vadbena pola za poklicno maturo iz {rod}: naloge z rešitvami in postopki.", telo, css=True, js="matura.js")

    # po snovi
    telo = glava(f"{eyebrow} · Matura", "Maturitetne naloge po snovi",
                 "Naloge iz vseh pol, razvrščene po poglavjih snovi. Vsako poglavje ima svojo stran z vsemi nalogami iz te snovi.")
    telo += f"""
        <div class="intro-card">
          <h3>Kaj najdeš na straneh poglavij?</h3>
          <p>
            Pri vsaki nalogi piše, iz katerega leta in roka je. Odpreš lahko samo rešitev ali celoten postopek,
            z gumboma na vrhu pa vse rešitve ali vse postopke naenkrat. Odgovor lahko tudi vpišeš in preveriš.
          </p>
        </div>

        <section class="subsection">
          <div class="subsection-head">
            <h2>Poglavja po sklopih</h2>
            <p>Število ob poglavju pove, koliko maturitetnih nalog je v njem.</p>
          </div>
          <div id="matura" data-nacin="sklopi" data-predmet="{slug}">
            <p>Nalagam poglavja …</p>
          </div>
        </section>
"""
    stran(f"views/{slug}/matura/po_snovi/po_snovi.html", f"{ime}: maturitetne naloge po snovi (poklicna matura)", f"Naloge iz pol poklicne mature iz {rod}, razvrščene po snovi.", telo, css=True, js="matura.js")

    telo = glava(f"{eyebrow} · Matura · Naloge po snovi", "Maturitetne naloge", "Naloge iz pol poklicne mature, zbrane po snovi.")
    telo += f"""
        <div id="matura" data-nacin="snov" data-predmet="{slug}" data-math>
          <p>Nalagam naloge …</p>
        </div>

        <div class="note-band">
          <p>
            <strong>Nasvet:</strong> Naloge iz istega poglavja se na maturi pogosto ponavljajo v podobni obliki.
            Vsa poglavja najdeš v <a href="/views/{slug}/matura/po_snovi/po_snovi.html">pregledu po sklopih</a>.
          </p>
        </div>
"""
    stran(f"views/{slug}/matura/po_snovi/naloge.html", f"{ime}: maturitetne naloge (poklicna matura)", f"Naloge iz pol poklicne mature iz {rod}, zbrane po snovi.", telo, css=True, js="matura.js")


# ---------------- meni ----------------
PUSCICA = {14: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
           12: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
           16: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>'}


def leta_pol(slug):
    pot = os.path.join(KOREN, "api", "data", f"matura-{slug}.json")
    if not os.path.exists(pot):
        return []
    return sorted({p["leto"] for p in json.load(open(pot, encoding="utf-8"))}, reverse=True)


def meni(slug, cfg):
    ime = cfg["ime"]
    snov = "".join(f'\n          <a href="{url_snovi(slug, p["slug"])}">{p["naslov"]}</a>' for p in poglavja(slug))
    naloge = "".join(f'\n          <a href="/views/{slug}/naloge/naloge.html?snov={p["slug"]}">{p["naslov"]}</a>' for p in poglavja(slug))
    leta = "".join(f'\n              <a href="/views/{slug}/matura/pole/leto.html?leto={l}">Matura {l}</a>' for l in leta_pol(slug))
    po_snovi = "".join(f'\n              <a href="/views/{slug}/matura/po_snovi/naloge.html?poglavje={p["slug"]}">{p["naslov"]}</a>' for p in poglavja(slug))
    return f"""
  <div class="nav-group">
    <div class="nav-group-header">
      <a href="/views/{slug}/{slug}.html" class="nav-group-title">
        <span class="label">{ime}</span>
      </a>
      <button class="dropdown-toggle" data-target="{slug}-sub" aria-label="Razširi: {ime.lower()}">
        {PUSCICA[16]}
      </button>
    </div>

    <div class="nav-sub" id="{slug}-sub">
      <div class="nav-sub-group">
        <div class="nav-sub-header">
          <a href="/views/{slug}/snov/snov.html" class="label">Snov</a>
          <button class="dropdown-toggle" data-target="{slug}-snov" aria-label="Razširi snov">{PUSCICA[14]}</button>
        </div>
        <div class="nav-sub-list" id="{slug}-snov">{snov}
        </div>
      </div>

      <div class="nav-sub-group">
        <div class="nav-sub-header">
          <a href="/views/{slug}/naloge/naloge.html" class="label">Naloge</a>
          <button class="dropdown-toggle" data-target="{slug}-naloge" aria-label="Razširi naloge">{PUSCICA[14]}</button>
        </div>
        <div class="nav-sub-list" id="{slug}-naloge">{naloge}
        </div>
      </div>

      <div class="nav-sub-group">
        <div class="nav-sub-header">
          <a href="/views/{slug}/matura/matura.html" class="label">Matura</a>
          <button class="dropdown-toggle" data-target="{slug}-matura" aria-label="Razširi maturo">{PUSCICA[14]}</button>
        </div>
        <div class="nav-sub" id="{slug}-matura">
          <div class="nav-sub-sub-group">
            <div class="nav-sub-sub-header">
              <a href="/views/{slug}/matura/pole/pole.html" class="label">Maturitetne pole</a>
              <button class="dropdown-toggle" data-target="{slug}-matura-pole" aria-label="Razširi maturitetne pole">{PUSCICA[12]}</button>
            </div>
            <div class="nav-sub-sub-list" id="{slug}-matura-pole">{leta}
            </div>
          </div>
          <div class="nav-sub-sub-group">
            <div class="nav-sub-sub-header">
              <a href="/views/{slug}/matura/po_snovi/po_snovi.html" class="label">Maturitetne naloge po snovi</a>
              <button class="dropdown-toggle" data-target="{slug}-matura-snov" aria-label="Razširi maturitetne naloge po snovi">{PUSCICA[12]}</button>
            </div>
            <div class="nav-sub-sub-list" id="{slug}-matura-snov">{po_snovi}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
"""


def zamenjaj_med(pot, zacetek, konec, vsebina):
    s = open(pot, encoding="utf-8").read()
    i, j = s.index(zacetek) + len(zacetek), s.index(konec)
    with open(pot, "w", encoding="utf-8") as f:
        f.write(s[:i] + vsebina + s[j:])


# vrstni red: obvezni predmet, tretji predmet, drugi (strokovni) predmet
VRSTNI_RED = ["poklicna_slovenscina", "poklicna_matematika", "poklicna_kemija"]

KARTICE = {
    "poklicna_slovenscina": "Razčlemba neumetnostnega besedila, tvorba krajšega besedila, jezik, interpretacija in literarnozgodovinski sklopi.",
    "poklicna_matematika": "Števila, geometrija, funkcije, zaporedja, statistika, odvod, kombinatorika in verjetnost po katalogu 2026.",
    "poklicna_kemija": "Drugi predmet za kemijske tehnike: splošna, anorganska, fizikalna in organska kemija ter kemijsko računstvo.",
}


def naslovnica():
    kartice = ""
    for slug in VRSTNI_RED:
        n = len(SNOVI[slug])
        kartice += f"""                    <a href="/views/{slug}/{slug}.html" class="chapter-card">
                        <span class="chapter-num">{n} poglavij</span>
                        <h3>{PREDMETI[slug]["ime"]}</h3>
                        <p>{KARTICE[slug]}</p>
                        <div class="chapter-meta"><span>Snov, naloge, matura</span><span class="arrow">→</span></div>
                    </a>
"""
    zamenjaj_med(os.path.join(PUBLIC, "index.html"), "<!-- POKLICNA MATURA: PREDMETI -->\n", "                    <!-- /POKLICNA MATURA: PREDMETI -->", kartice)


if __name__ == "__main__":
    for slug, cfg in PREDMETI.items():
        zgradi(slug, cfg)
    zamenjaj_med(os.path.join(PUBLIC, "components", "sidebar.html"), "<!-- POKLICNA MATURA -->\n", "  <!-- /POKLICNA MATURA -->",
                 "".join(meni(s, PREDMETI[s]) for s in VRSTNI_RED) + "\n")
    naslovnica()
    print("ok")
