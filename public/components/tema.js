// public/components/tema.js
// Naloži se v <head> pred izrisom: nastavi temo, videz predmeta in maturo na <html>,
// da stran ne utripne, in takoj začne nalagati glavo, meni in nogo.
// Stikala v glavi upravlja components.js.
(function () {
  var html = document.documentElement;
  var pot = location.pathname;

  function preberi(kljuc) {
    try {
      return localStorage.getItem(kljuc);
    } catch (e) {
      return null; // zasebno okno
    }
  }
  function shrani(kljuc, vrednost) {
    try {
      localStorage.setItem(kljuc, vrednost);
    } catch (e) {
      /* zasebno okno */
    }
  }

  // Glava, meni in noga: zahteve se začnejo že zdaj, vzporedno z branjem strani,
  // components.js pa jih le vstavi (prej so se začele šele po koncu strani).
  window.piflarKomponente = {};
  ["header", "sidebar", "footer"].forEach(function (ime) {
    window.piflarKomponente[ime] = fetch("/components/" + ime + ".html").then(function (res) {
      if (!res.ok) throw new Error("/components/" + ime + ".html → " + res.status);
      return res.text();
    });
    // napako obravnava components.js; tu le preprečimo opozorilo o neobravnavani napaki
    window.piflarKomponente[ime].catch(function () {});
  });

  // Temni ali svetli način: shranjena izbira, sicer nastavitev sistema
  var tema = preberi("piflar-tema");
  if (tema !== "dark" && tema !== "light") {
    tema = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  html.dataset.theme = tema;

  // Videz po predmetih: na straneh pod /views/<predmet>/ doda slog predmeta
  // (style/predmeti/). Naslovnica in ostale splošne strani ostanejo osnovne.
  // document.write, da se slog naloži pred izrisom (brez utripa).
  function slogPredmeta(predmet) {
    html.dataset.predmet = predmet;
    document.write(
      '<link rel="stylesheet" href="/style/predmeti/osnova.css">' +
        '<link rel="stylesheet" href="/style/predmeti/' + predmet + '.css">'
    );
  }
  var m = pot.match(
    /^\/views\/(biologija|fizika|geografija|informatika|kemija|matematika|slovenscina|zgodovina|anglescina|nemscina|francoscina|italijanscina|spanscina|psihologija|sociologija|filozofija|ekonomija|glasba|umetnostna_zgodovina)\//
  );
  if (m) slogPredmeta(m[1]);

  // Splošna ali poklicna matura: na straneh predmeta velja matura predmeta
  // (poklicna_<predmet>), drugje zadnja izbira (stikalo v meniju, glavi in na
  // naslovnici), privzeto splošna. Predmeti poklicne mature imajo videz
  // osnovnega predmeta (data-predmet), pot pa je /views/poklicna_<predmet>/
  // (data-slug).
  var pm = pot.match(/^\/views\/poklicna_([a-z_]+)\//);
  var matura = null;
  if (pm) {
    matura = "poklicna";
    html.dataset.slug = "poklicna_" + pm[1];
    if (!html.dataset.predmet) slogPredmeta(pm[1]);
  } else if (/^\/views\/[a-z_]+\//.test(pot)) {
    matura = "splosna";
  }
  if (matura) shrani("ucilnica-matura", matura);
  else matura = preberi("ucilnica-matura");
  html.dataset.matura = matura === "poklicna" ? "poklicna" : "splosna";

  // Videz »Tabla in polica« (preizkus): privzeto vklopljen. Primerjava s
  // starim videzom: ?videz=osnovni (izbira se zapomni), nazaj z ?videz=tabla.
  var q = null;
  try {
    q = new URLSearchParams(location.search).get("videz");
  } catch (e) {
    /* star brskalnik */
  }
  if (q === "osnovni" || q === "tabla") shrani("piflar-videz", q);
  var videz = preberi("piflar-videz") === "osnovni" ? "osnovni" : "tabla";
  html.dataset.videz = videz;
  if (videz !== "tabla") return;
  document.write(
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Gaegu:wght@400;700&family=Barlow+Condensed:wght@600;700;800&display=swap">' +
      '<link rel="stylesheet" href="/style/tabla.css">' +
      '<script src="/components/polica.js" defer></scr' + 'ipt>'
  );
})();
